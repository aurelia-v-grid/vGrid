import { DataSource, EntityInterface } from './interfaces';
export declare class Collection {
    length: number;
    groupHeight: number;
    rowHeight: number;
    private displayedEntities;
    private keys;
    private key;
    private count;
    private datasource;
    private ungroupedArray;
    private rowHeightArray;
    private rowTopArray;
    private rowHeightTotal;
    private rowHeightCallback;
    constructor(datasource: DataSource);
    setData(array: EntityInterface[], ungroupedArray?: EntityInterface[]): void;
    getRowHeightState(): any;
    getEntities(): EntityInterface[];
    getCurrentEntities(): EntityInterface[];
    getRowKey(row: number): string;
    getRowKeys(): any[];
    getRow(row: number): EntityInterface;
    getRowFromEntity(entity: EntityInterface): number;
}
