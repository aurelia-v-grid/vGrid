import { Selection } from './selection';
import { Collection } from './collection';
import { ArrayUtils } from './utils/arrayUtils';
import {Entity, DatasourceConfig, SortObject, FilterObject} from './interfaces';

export class DataSource {
  public entity: Entity;
  private selection: Selection;
  private key: string;
  private arrayUtils: ArrayUtils;
  private mainArray: Entity[];
  private config: DatasourceConfig;
  private eventIdCount: number;
  private eventCallBacks: Function[];
  private collection: Collection;

  constructor(selection: Selection, config?: DatasourceConfig) {
    // selection
    this.selection = selection || new Selection('single');
    // overide selection get row/key from row
    // why not in selection ? because I might need rowbased selection only
    this.selection.overrideGetRowKey(this.getRowKey.bind(this));
    this.selection.overrideGetRowKeys(this.getRowKeys.bind(this));
    // array helper helps with grouping/sorting and filtering
    this.arrayUtils = new ArrayUtils();
    // key if you dont want grid to add
    this.key = null;
    // main array fill contain all the data set to grid
    this.mainArray = null;
    // configuration
    this.config = config;
    if (config) {
      this.key = config.key || '__avgKey';
    } else {
      this.key = '__avgKey';
    }
    // todo, give option to override ArrayUtils, 
    // or and option to set params you pass into array helper to override some of its functionality
    // events, gridConnector will add event lister to datasource set to it
    this.eventIdCount = -1;
    this.eventCallBacks = [];
    // current entity, this is what users need to link inputs etc too
    this.entity = null;
    // create a collection
    this.collection = new Collection(this);

  }

  public getSelection(): Selection {
    return this.selection;
  }

  public getKey(): string {
    return this.key;
  }

  public length(): number {
    return this.collection.length;
  }

  public triggerEvent(event: string): void {
    // call all event listeners
    this.eventCallBacks.forEach((FN) => {
      FN(event);
    });
  }

  public addEventListener(callback: Function): number {
    // add key
    this.eventIdCount++;
    // add to callback queue
    this.eventCallBacks.push(callback);
    // return ID, so they can remove listnener
    return this.eventIdCount;
  }

  public removeEventListener(id: number): void {
    // remove listtener from id
    this.eventCallBacks.splice(id, 1);
  }

  public setArray(array: Entity[]): void {
    // new collection
    this.collection = new Collection(this);
    // clear stuff set in ArrayUtils
    this.selection.reset();
    this.arrayUtils.resetGrouping();
    this.arrayUtils.resetSort();

    // set data to collection
    this.collection.setData(array);
    // set our main collection, we will use this for later
    this.mainArray = this.collection.getEntities();
    this.triggerEvent('collection_changed');
  }

  public select(row: number): void {
    // get row and set as current entity "entity" of datasource
    this.entity = this.collection.getRow(row);
  }

  public query(options: FilterObject[]): void {
    if (options) {
      // query data (using main here, so we query all data set)
      let newArray = this.arrayUtils.query(this.mainArray, options);
      // set data to our collection
      this.collection.setData(newArray);
    } else {
      this.collection.setData(this.mainArray);
    }
    // run orderby (that will fix grouping if set)
    this.orderBy(null, true);
    // trigger event so grid updates
    this.triggerEvent('collection_filtered');
  }

  public orderBy(attribute: string|SortObject, addToCurrentSort?: boolean): void {
    // get collection (cant use main,,, might be filtered)
    let collection = this.collection.getEntities();
    // use array helper to sort (takes care of the grouping if set)
    let result = this.arrayUtils.orderBy(collection, attribute, addToCurrentSort);
    // set data, need both incase we have grouping
    this.collection.setData(result.fixed, result.full);
    // trigger event to update grid
    this.triggerEvent('collection_sorted');
  }

  public getCurrentOrderBy(): SortObject[] {
    return this.arrayUtils.getOrderBy();
  }

  public getCurrentFilter(): FilterObject[] {
    return this.arrayUtils.getCurrentFilter();
  }

  public getElement(row: number): Entity {
    if (row === undefined || row === null) {
      throw new Error('row missing');
    } else {
      return this.collection.getRow(row);
    }
  }

  public group(grouping: string[], keepExpanded?: boolean): void {
    this.arrayUtils.resetSort();
    grouping.forEach((groupName: string) => {
      this.arrayUtils.setOrderBy(groupName, true);
    });
    this.arrayUtils.runOrderbyOn(this.collection.getEntities());
    let untouchedgrouped = this.collection.getEntities();
    let groupedArray = this.arrayUtils.group(untouchedgrouped, grouping, keepExpanded);
    this.collection.setData(groupedArray, untouchedgrouped);
    this.triggerEvent('collection_grouped');
  }

  public groupCollapse(id: string): void {
    let newArray = this.arrayUtils.groupCollapse(id);
    let oldArray = this.collection.getEntities();
    this.collection.setData(newArray, oldArray);
    if (id) {
      this.triggerEvent('collection_collapsed');
    } else {
      this.triggerEvent('collection_collapsed_all');
    }
  }

  public groupExpand(id: string): void {
    let newArray = this.arrayUtils.groupExpand(id);
    let oldArray = this.collection.getEntities();
    this.collection.setData(newArray, oldArray);
    if (id) {
      this.triggerEvent('collection_expanded');
    } else {
      this.triggerEvent('collection_expanded_all');
    }
  }

  public getGrouping(): string[] {
    return this.arrayUtils.getGrouping();
  }

  public addElement(data: Entity): void {
    if (data) {
      // todo
    } else {
      let newElement = ({} as Entity);
      this.mainArray.unshift(newElement);
      let oldArray = this.collection.getEntities();
      let oldMaybeGroupedArray = this.collection.getCurrentEntities();
      let index = oldArray.indexOf(newElement);
      if (index === -1) {
        oldArray.unshift(newElement);
      }
      oldMaybeGroupedArray.unshift(newElement);
      this.collection.setData(oldMaybeGroupedArray, oldArray);
      this.triggerEvent('collection_filtered');
    }
  }

  private getRowKey(row: number): string {
    // if collection, then get row key
    if (this.collection) {
      return this.collection.getRowKey(row);
    } else {
      return null;
    }
  }

  private getRowKeys(): any[] {
    // if collection then get the keys
    if (this.collection) {
      return this.collection.getRowKeys();
    } else {
      return [];
    }
  }
}
