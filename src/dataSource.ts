import { Selection } from './selection';
import { Collection } from './collection';
import { ArrayUtils } from './utils/arrayUtils';
import { Entity, DatasourceConfig, SortObject, FilterObject } from './interfaces';

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
    // reset current entity
    this.entity = null;
    // set data to collection
    this.collection.setData(array);
    // set our main collection, we will use this for later
    this.mainArray = this.collection.getEntities();
    this.triggerEvent('collection_changed');
  }

  public push(array: Entity[]): void {
    if (Array.isArray(array)) {
      // get current grouping and collection
      let grouping = this.arrayUtils.getGrouping();
      let collection = this.collection.getEntities();
      // add to the collection, set that data back so keys get added
      collection = collection.concat(array);
      this.collection.setData(collection);
      //  get main data for later (when filtering etc)
      this.mainArray = this.collection.getEntities();
      // run orderby, and regroup if there is any
      this.arrayUtils.runOrderbyOn(this.collection.getEntities());
      let untouchedgrouped = this.collection.getEntities();
      if (grouping.length > 0) {
        let groupedArray = this.arrayUtils.group(untouchedgrouped, grouping, true);
        this.collection.setData(groupedArray, untouchedgrouped);
      }
      this.triggerEvent('collection_updated');
    }
  }

  public refresh(data?: any) {
    if (data) {
      // if data create new collection and set data to it
      this.collection = new Collection(this);
      this.collection.setData(data);
      //  get main data for later (when filtering etc), then clear current entity
      this.mainArray = this.collection.getEntities();
      this.entity = null;
    }
    // get current grouping, run orderby, if grouping we also run that
    let grouping = this.arrayUtils.getGrouping();
    this.arrayUtils.runOrderbyOn(this.collection.getEntities());
    if (grouping.length > 0) {
      let untouchedgrouped = this.collection.getEntities();
      let groupedArray = this.arrayUtils.group(untouchedgrouped, grouping, true);
      this.collection.setData(groupedArray, untouchedgrouped);
    }
    this.triggerEvent('collection_updated');
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

  public orderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void {
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

  public addBlankRow(): void {
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
    this.entity = newElement;
    this.triggerEvent('collection_filtered');
  }

  public unshift(data: any): void {
    if (data) {
      this.mainArray.unshift(data);
      let oldArray = this.collection.getEntities();
      let oldMaybeGroupedArray = this.collection.getCurrentEntities();
      let index = oldArray.indexOf(data);
      if (index === -1) {
        oldArray.unshift(data);
      }
      oldMaybeGroupedArray.unshift(data);
      this.collection.setData(oldMaybeGroupedArray, oldArray);
      this.entity = data;
      this.triggerEvent('collection_filtered');
    }
  }

  public remove(rows?: any[]): void {
    if (Array.isArray(rows)) {
      // todo
    } else {
      if (this.entity) {
        // todo 
      }
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
