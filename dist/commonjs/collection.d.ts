import { DataSource, Entity } from './interfaces';
export declare class Collection {
    length: number;
    private displayedEntities;
    private keys;
    private key;
    private count;
    private datasource;
    private ungroupedArray;
    constructor(datasource: DataSource);
    setData(array: Entity[], ungroupedArray?: Entity[]): void;
    getEntities(): Entity[];
    getCurrentEntities(): Entity[];
    getRowKey(row: number): string;
    getRowKeys(): any[];
    getRow(row: number): Entity;
    getRowFromEntity(entity: Entity): number;
}
