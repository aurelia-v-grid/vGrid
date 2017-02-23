import { DataSource, EntityInterface } from './interfaces'; // todo,create interface when datasource is stable

export class Collection {
  public length: number;
  public groupHeight: number;
  public rowHeight: number;
  private displayedEntities: EntityInterface[];
  private keys: string[];
  private key: string;
  private count: number;
  private datasource: DataSource;
  private ungroupedArray: EntityInterface[];
  private rowHeightArray: any[];
  private rowTopArray: any[];
  private rowHeightTotal: number;



  /**
   * Creates an instance of Collection.
   *
   */
  constructor(datasource: DataSource) {
    this.datasource = datasource;
    this.key = datasource.getKey();

    // get rowHeight if any
    this.rowHeight = datasource.rowHeight || 25;

    // get groupHeight if any
    this.groupHeight = datasource.groupHeight || 25;

    // some defaults

    // this contains the displayed including groups
    this.displayedEntities = [];

    // all keys in displayed
    this.keys = [];

    // count for setting unique keys, using numbers since I use it do keep entities sorted in inserted order
    this.count = 0;

    // total length of displayed
    this.length = 0;

    // this is the ungrouped array (all entities of displayed except the groups)
    // this is used when grouping the displayed
    this.ungroupedArray = [];

    // next 3 is variable for setting the correct top etc when using variable row height
    this.rowHeightArray = [];
    this.rowTopArray = [];
    this.rowHeightTotal = 0;
  }



  /**
   * Sets data to the collection
   *
   */
  public setData(array: EntityInterface[], ungroupedArray?: EntityInterface[]): void {

    // clear defaults so they can be set correctly again
    this.displayedEntities = [];
    this.keys = [];
    this.rowHeightArray = [];
    this.rowHeightTotal = 0;
    this.rowTopArray = [];


    // need a ungrouped collection, so we can use that forward when needing to sort, regroup etc
    this.ungroupedArray = ungroupedArray || array;

    // get length;
    this.length = array.length;

    // create entities
    array.forEach((rowData) => {

      // if entity does not have key we add one, need this for selection
      if (!rowData[this.key]) {
        this.count++;
        rowData[this.key] = this.count;
      }

      // if entity is not group we set the keys to our internal key array, if not we set null
      if (!rowData.__group) {

        // for vairble row height we need to set some defaults the grid can use when scrolling
        this.rowHeightArray.push(this.rowHeight);
        this.rowTopArray.push(this.rowHeightTotal);
        this.rowHeightTotal = this.rowHeightTotal + this.rowHeight;

        // push the key we need for selection
        this.keys.push(rowData[this.key]);

      } else {

        // for vairble row height we need to set some defaults the grid can use when scrolling
        this.rowHeightArray.push(this.groupHeight);
        this.rowTopArray.push(this.rowHeightTotal);
        this.rowHeightTotal = this.rowHeightTotal + this.groupHeight;

        // set null on groups, we dont want that in selection
        this.keys.push(null);

      }

      // we now set the entity data into our displayed entities
      this.displayedEntities.push(rowData);
    });
  }


  /**
   * Returns rowheigth state, will be needed by the grid code when using varaible row height
   *
   */
  public getRowHeightState(): any {
    return {
      total: this.rowHeightTotal,
      rows: this.rowHeightArray,
      top: this.rowTopArray
    };
  }

  /**
   * Returns the ungrouped array of displayed collection
   *
   */
  public getEntities(): EntityInterface[] {
    return this.ungroupedArray;
  }



  /**
   * Returns array displayed in collection, including groups
   *
   */
  public getCurrentEntities(): EntityInterface[] {
    return this.displayedEntities;
  }



  /**
   * Returns key of row number passed in
   *
   */
  public getRowKey(row: number): string {
    return this.keys[row];
  }



  /**
   * Returns all keys in displayed collection
   *
   */
  public getRowKeys(): any[] {
    return this.keys;
  }



  /**
   * Returns entity of rows in displayed collection
   *
   */
  public getRow(row: number): EntityInterface {
    return this.displayedEntities[row];
  }



  /**
   * Return row number of entity passed in as param
   *
   */
  public getRowFromEntity(entity: EntityInterface): number {
    return this.displayedEntities.indexOf(entity);
  }

}
