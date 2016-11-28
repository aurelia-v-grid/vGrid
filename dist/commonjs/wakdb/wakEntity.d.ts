export declare class WakEntity {
    __attributes: any;
    baseUrl: any;
    modifiedAttributes: any;
    __modified: any;
    __isModified: any;
    __original: any;
    __valuesOriginal: any;
    __isNew: any;
    __values: any;
    __KEY: any;
    __STAMP: any;
    __isEntity: any;
    constructor(data: any, attributes: any, baseUrl: any);
    __setGetterSetters(): void;
    bindWithKey(attributeName: any, key: any): void;
    __checkBool(value: any): any;
    __convert(attributeName: any, value: any): any;
    __setDefaults(data: any): void;
    __getUnsaved(returnKey: any): any;
    __update(data: any): void;
    __refreshOnly(data: any): void;
}
