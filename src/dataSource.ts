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
  private selectionEventID: number;



  /**
   * Creates an instance of DataSource.
   * 
   */
  constructor(selection: Selection, config?: DatasourceConfig) {

    // Set selection or create new if none is passed in
    this.selection = selection || new Selection('single');
    this.selectionEventID = this.selection.addEventListener(this.selectionEventCallback.bind(this));

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



  /**
   * Returns the current selection class
   * 
   */
  public getSelection(): Selection {
    return this.selection;
  }



  /**
   * Returns keys name used for selection/added to each entity
   * 
   */
  public getKey(): string {
    return this.key;
  }



  /**
   * returns the numbers of rows in displayed view (inludes groupings etc)
   * 
   */
  public length(): number {
    return this.collection.length;
  }



  /**
   * Sends event string to all listeners
   * 
   */
  public triggerEvent(event: string): void {
    // call all event listeners
    this.eventCallBacks.forEach((FN, i) => {
      if (FN !== null) {
        let alive = FN(event);
        if (!alive) {
          // todo: remove these after
          this.eventCallBacks[i] = null;
        }
      }
    });
  }



  /**
   * Adds functions to callback array, this will be called when collection/selection event happens
   * 
   */
  public addEventListener(callback: Function): number {

    // add key
    this.eventIdCount++;

    // add to callback queue
    this.eventCallBacks.push(callback);

    // return ID, so they can remove listnener
    return this.eventIdCount;
  }



  /**
   * removes event listener
   * 
   */
  public removeEventListener(id: number): void {
    // remove listtener from id
    this.eventCallBacks.splice(id, 1);
  }



  /**
   * Replaces internal collection and clear internal selection/sorting and grouping
   * 
   */
  public setArray(array: Entity[]): void {
    // new collection
    this.collection = new Collection(this);

    // clear stuff set in ArrayUtils
    this.selection.reset();
    this.arrayUtils.resetGrouping();

    // use the default key as sort
    // this way first query returns result in same order as put into the datasource
    this.arrayUtils.resetSort(this.key);

    // reset current entity
    this.entity = null;

    // set data to collection
    this.collection.setData(array);

    // set our main collection, we will use this for later
    this.mainArray = this.collection.getEntities();
    this.triggerEvent('collection_changed');

  }



  /**
   * Adds to internal/displayed collection and reruns sort and grouping
   * 
   */
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

      // trigger grid so it updated view
      this.triggerEvent('collection_updated');
    }
  }



  /**
   * Replace collection if array is passed in and rerun sort and groupings
   * If no data is added it just reruns sorting and grouping
   * TODO: do we want to also rerun filter if any?
   * 
   */
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
      let unGroupedArray = this.collection.getEntities();
      let groupedArray = this.arrayUtils.group(unGroupedArray, grouping, true);
      this.collection.setData(groupedArray, unGroupedArray);
    }

    // trigger grid so it updates view
    this.triggerEvent('collection_updated');
  }



  /**
   * Sets row passed in as current entity
   * 
   */
  public select(row: number): void {
    // get row and set as current entity "entity" of datasource
    this.entity = this.collection.getRow(row);
  }



  /**
   * Queries all entities with paramas passed in
   * 
   */
  public query(options: FilterObject[]): void {

    if (options) {
      // query data (using main here, so we query all data set)
      let newArray = this.arrayUtils.query(this.mainArray, options);

      // set data to our collection
      this.collection.setData(newArray);

    } else {
      // no query passed in we display all
      this.collection.setData(this.mainArray);
    }

    // run orderby (that will fix grouping if set)
    this.orderBy(null, true);

    // trigger event so grid updates
    this.triggerEvent('collection_filtered');
  }



  /**
   * Sorts the array with params passed in
   * 
   */
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



  /**
   * returns current orderBy used
   * 
   */
  public getCurrentOrderBy(): SortObject[] {
    return this.arrayUtils.getOrderBy();
  }



  /**
   * Returns current filter used
   * 
   */
  public getCurrentFilter(): FilterObject[] {
    return this.arrayUtils.getCurrentFilter();
  }



  /**
   * Returns current enlement of row passed in
   * 
   */
  public getElement(row: number): Entity {
    if (row === undefined || row === null) {
      throw new Error('row missing');
    } else {
      return this.collection.getRow(row);
    }
  }



  /**
   * Groups the collection with params passed in
   * 
   */
  public group(grouping: string[], keepExpanded?: boolean): void {

    // resets current sortclass
    this.arrayUtils.resetSort();

    // set new sort by grouping
    grouping.forEach((groupName: string) => {
      this.arrayUtils.setOrderBy(groupName, true);
    });

    // run sort on displayedCollection
    this.arrayUtils.runOrderbyOn(this.collection.getEntities());

    // get ungrouped collection
    let ungroupedArray = this.collection.getEntities();

    // group array
    let groupedArray = this.arrayUtils.group(ungroupedArray, grouping, keepExpanded);

    // set grouped array to collection
    this.collection.setData(groupedArray, ungroupedArray);

    // trigger grid to updated view
    this.triggerEvent('collection_grouped');
  }



  /**
   * Collapses all groups or just ID passes in
   * 
   */
  public groupCollapse(id: string): void {
    let groupedArray = this.arrayUtils.groupCollapse(id);
    let ungroupedArray = this.collection.getEntities();
    this.collection.setData(groupedArray, ungroupedArray);
    if (id) {
      this.triggerEvent('collection_collapsed');
    } else {
      this.triggerEvent('collection_collapsed_all');
    }
  }



  /**
   * Expands all groups or just ID passed in
   * 
   */
  public groupExpand(id: string): void {
    let groupedArray = this.arrayUtils.groupExpand(id);
    let ungroupedArray = this.collection.getEntities();
    this.collection.setData(groupedArray, ungroupedArray);
    if (id) {
      this.triggerEvent('collection_expanded');
    } else {
      this.triggerEvent('collection_expanded_all');
    }
  }



  /**
   * Returns grouping used
   * 
   */
  public getGrouping(): string[] {
    return this.arrayUtils.getGrouping();
  }



  /**
   * Adds blank row to top of diaplayed colelction and updates grid
   * Todo: custom key will prb break this... need more testing
   * 
   */
  public addBlankRow(): void {

    // create empty object
    let newElement = ({} as Entity);

    // add to our main array
    this.mainArray.unshift(newElement);

    // get the ungrouped array in collection
    let collectionUngrouped = this.collection.getEntities();

    // get displayed collection
    let displayedCollection = this.collection.getCurrentEntities();

    // if it does not exsist in old array we skip, else we add
    let index = collectionUngrouped.indexOf(newElement);
    if (index === -1) {
      collectionUngrouped.unshift(newElement);
    }

    // add to displayed collection
    displayedCollection.unshift(newElement);

    // set back data to collection
    this.collection.setData(displayedCollection, collectionUngrouped);

    // set blank as current entity
    this.entity = newElement;

    // trigger grid to update
    this.triggerEvent('collection_filtered');
  }



  /**
   * Added new enity to top of grid, no sorting or grouping after
   * 
   */
  public unshift(data: any): void {
    if (data) {

      // add to main array
      this.mainArray.unshift(data);

      // get the ungrouped array in collection
      let displayedCollection = this.collection.getEntities();

      // get displayed collection
      let ungroupedCollection = this.collection.getCurrentEntities();

      // if it does not exsist in old array we skip, else we add
      let index = displayedCollection.indexOf(data);
      if (index === -1) {
        displayedCollection.unshift(data);
      }

      // add to displayed collection
      ungroupedCollection.unshift(data);

      // set back data to collection
      this.collection.setData(ungroupedCollection, displayedCollection);

      // set as current entity
      this.entity = data;

      // trigger grid update
      this.triggerEvent('collection_filtered');
    }
  }



  /**
   * Removed rows from displayed collection and returns removed
   * 
   */
  public remove(rows?: any[]): any[] {
    let keysToDelete = new Set();
    let returnArray = [];
    if (Array.isArray(rows)) {
      rows.forEach((row) => {
        keysToDelete.add(this.getRowKey(row));
      });
    } else {
      if (this.entity && Number.isInteger(rows)) {
        keysToDelete.add(this.getRowKey(rows));
      }
    }

    if (keysToDelete.size > 0) {
      let oldArray = this.collection.getEntities();
      for (let i = 0; i < oldArray.length; i++) {
        if (keysToDelete.has(oldArray[i][this.key]) === true) {
          returnArray.push(oldArray.splice(i, 1)[0]);
          i--;
        }
      }
      this.collection.setData(oldArray);
      this.refresh();
    }

    return returnArray;
  }



  /**
   * Returns status(lengths) of collection/selection 
   * 
   */
  public getCollectionStatus(): any {
    let status: any = {};
    status.collectionLength = this.mainArray ? this.mainArray.length : 0;
    status.filteredCollectionLength = this.collection.getEntities().length;
    status.selectionLength = this.selection.getLength();
    return status;
  }


  /**
   * Sets local compare options to use with sorting
   * http://stackoverflow.com/questions/3191664/list-of-all-locales-and-their-short-codes
   * 
   */
  public setLocaleCompare(code: string, options?: any): void {
    this.arrayUtils.setLocaleCompare(code, options);
  }


  /**
   * Returns key of row passed in from displayedCollection
   * 
   */
  private getRowKey(row: number): string {
    // if collection, then get row key
    if (this.collection) {
      return this.collection.getRowKey(row);
    } else {
      return null;
    }
  }



  /**
   * Returns all keys of collection
   * 
   */
  private getRowKeys(): any[] {
    // if collection then get the keys
    if (this.collection) {
      return this.collection.getRowKeys();
    } else {
      return [];
    }
  }



  /**
   * Calls the triggere event with event from selection
   * 
   */
  private selectionEventCallback(e: any): boolean {
    this.triggerEvent(e);
    return true;
  }
}
