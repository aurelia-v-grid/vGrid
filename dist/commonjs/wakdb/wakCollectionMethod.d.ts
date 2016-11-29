import { WakDataSource } from './wakInterfaces';
export declare class WakCollectionMethod {
    source: WakDataSource;
    name: string;
    constructor(source: WakDataSource, name: string);
    execute(params: any, options: any): Promise<{}>;
}
