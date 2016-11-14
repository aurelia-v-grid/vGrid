import { DataSource } from './dataSource';
export declare class Collection {
    private entities;
    private keys;
    private key;
    private count;
    length: number;
    private datasource;
    private ungroupedArray;
    constructor(datasource: DataSource);
    setData(array: Array<any>, ungroupedArray?: Array<any>): void;
    getEntities(): any[];
    getCurrentEntities(): any[];
    getRowKey(row: any): any;
    getRowFromKey(key: any): number;
    getRow(row: any): any;
    getRowFromEntity(entity: any): number;
}
