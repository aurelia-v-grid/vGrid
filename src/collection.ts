import { DataSource, Entity } from './interfaces'; // todo,create interface when datasource is stable

export class Collection {
  public length: number;
  private displayedEntities: Entity[];
  private keys: string[];
  private key: string;
  private count: number;
  private datasource: DataSource;
  private ungroupedArray: Entity[];



  /**
   * Creates an instance of Collection.
   * 
   */
  constructor(datasource: DataSource) {
    this.datasource = datasource;
    this.key = datasource.getKey();
    this.displayedEntities = [];
    this.keys = [];
    this.count = 0;
    this.length = 0;
    this.ungroupedArray = [];
  }



  /**
   * Sets data to the collection
   * 
   */
  public setData(array: Entity[], ungroupedArray?: Entity[]): void {
    this.displayedEntities = [];
    this.keys = [];

    // need a ungrouped collection, so we can use that forward when needing to sort, regroup etc
    this.ungroupedArray = ungroupedArray || array;

    // get length;
    this.length = array.length;

    // create entities
    array.forEach((rowData) => {

      // if entity does not have key we add one, need this for selection
      if (!rowData[this.key]) {
        this.count++;
        rowData[this.key] = 'key' + this.count;
      }

      // if entity is not group we set the keys to our internal key array, if not we set null
      if (!rowData.__group) {
        this.keys.push(rowData[this.key]);
      } else {
        this.keys.push(null);
      }

      // we now set the entity data into our displayed entities
      this.displayedEntities.push(rowData);
    });
  }



  /**
   * Returns the ungrouped array of displayed collection
   * 
   */
  public getEntities(): Entity[] {
    return this.ungroupedArray;
  }



  /**
   * Returns array displayed in collection, including groups
   * 
   */
  public getCurrentEntities(): Entity[] {
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
  public getRow(row: number): Entity {
    return this.displayedEntities[row];
  }



  /**
   * Return row number of entity passed in as param
   * 
   */
  public getRowFromEntity(entity: Entity): number {
    return this.displayedEntities.indexOf(entity);
  }

}
