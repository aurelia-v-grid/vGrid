import { WakDataSource } from './wakInterfaces';
export declare class WakClassMethod {
    private source;
    private name;
    constructor(source: WakDataSource, name: string);
    execute(params: any, options: any): Promise<{}>;
}
