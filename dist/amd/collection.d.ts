import { DataSource, Entity } from './interfaces';
export declare class Collection {
    length: number;
    private entities;
    private keys;
    private key;
    private count;
    private datasource;
    private ungroupedArray;
    constructor(datasource: DataSource);
    setData(array: Array<Entity>, ungroupedArray?: Array<Entity>): void;
    getEntities(): Array<Entity>;
    getCurrentEntities(): Array<Entity>;
    getRowKey(row: number): string;
    getRowFromKey(key: string): number;
    getRow(row: number): Entity;
    getRowFromEntity(entity: Entity): number;
}
