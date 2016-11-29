import { WakRestApi } from './wakInterfaces';
export declare class WakDataClass {
    name: any;
    restApi: WakRestApi;
    collectionName: string;
    dataURI: string;
    scope: string;
    key: string;
    attributes: any;
    entityCollectionMethods: any;
    entityMethods: any;
    dataClassMethods: any;
    [key: string]: any;
    constructor(dataClass: any, restApi: WakRestApi);
    query(queryString: string, options: any): Promise<{}>;
    save(data: any, options: any): Promise<{}>;
}
