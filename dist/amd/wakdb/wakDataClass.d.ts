export declare class WakDataClass {
    name: any;
    restApi: any;
    collectionName: any;
    dataURI: any;
    scope: any;
    key: any;
    attributes: any;
    entityCollectionMethods: any;
    entityMethods: any;
    dataClassMethods: any;
    [key: string]: any;
    constructor(dataClass: any, restApi: any);
    query(queryString: any, options: any): Promise<{}>;
    save(data: any, options: any): Promise<{}>;
}
