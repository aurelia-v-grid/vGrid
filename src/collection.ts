import { DataSource, Entity } from './interfaces'; // todo,create interface when datasource is stable

export class Collection {
  public length: number;
  private entities: Entity[];
  private keys: string[];
  private key: string;
  private count: number;
  private datasource: DataSource;
  private ungroupedArray: Entity[];

  constructor(datasource: DataSource) {
    this.datasource = datasource;
    this.key = datasource.getKey();
    this.entities = [];
    this.keys = [];
    this.count = 0;
    this.length = 0;
    this.ungroupedArray = [];
  }

  public setData(array: Entity[], ungroupedArray?: Entity[]): void {
    this.entities = [];
    this.keys = [];

    // need a ungrouped collection, so we can use that forward when needing to sort, regroup etc
    this.ungroupedArray = ungroupedArray || array;

    // get length;
    this.length = array.length;

    // create entities
    array.forEach((rowData) => {
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

  public getEntities(): Entity[] {
    return this.ungroupedArray;
  }

  public getCurrentEntities(): Entity[] {
    return this.entities;
  }

  public getRowKey(row: number): string {
    return this.keys[row];
  }

  public getRowKeys(): any[] {
    return this.keys;
  }

  public getRow(row: number): Entity {
    return this.entities[row];
  }

  public getRowFromEntity(entity: Entity): number {
    return this.entities.indexOf(entity);
  }

}
