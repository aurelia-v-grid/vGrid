import { DataSource } from './dataSource'; // todo,create interface when datasource is stable

export class Collection {
  public length: number;
  private entities: Array<any>;
  private keys: Array<any>;
  private key: any;
  private count: number;
  private datasource: DataSource;
  private ungroupedArray: Array<any>;


  constructor(datasource: DataSource) {
    this.datasource = datasource;
    this.key = datasource.key;
    this.entities = [];
    this.keys = [];
    this.count = 0;
    this.length = 0;
    this.ungroupedArray = [];
  }


  public setData(array: Array<any>, ungroupedArray?: Array<any>): void {
    this.entities = [];
    this.keys = [];

    // need a ungrouped collection, so we can use that forward when needing to sort, regroup etc
    this.ungroupedArray = ungroupedArray || array;

    // get length;
    this.length = array.length;

    // create entities
    array.forEach((rowData, i) => {
      if (!rowData[this.key]) {
        this.count++;
        rowData[this.key] = 'key' + this.count;
      }

      if (!rowData.__group) {
        this.keys.push(rowData[this.key]);
      } else {
        this.keys.push(null);
      }
      this.entities.push(rowData);
    });

  }


  public getEntities(): Array<any> {
    return this.ungroupedArray;
  }

  public getCurrentEntities(): Array<any> {
    return this.entities;
  }

  public getRowKey(row: number): string {
    return this.keys[row];
  }

  public getRowFromKey(key: string): number {
    return this.keys.indexOf(key);
  }

  public getRow(row): number {
    return this.entities[row];
  }


  public getRowFromEntity(entity: any): any {
    return this.entities.indexOf(entity);
  }

}
