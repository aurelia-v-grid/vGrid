export declare class WakEntity {
    __attributes: any;
    baseUrl: string;
    modifiedAttributes: any;
    __modified: any;
    __isModified: boolean;
    __original: any;
    __valuesOriginal: any;
    __isNew: any;
    __values: any;
    __KEY: any;
    __STAMP: number;
    __isEntity: boolean;
    constructor(data: any, attributes: any, baseUrl: string);
    __setGetterSetters(): void;
    bindWithKey(attributeName: string, key: any): void;
    __checkBool(value: any): any;
    __convert(attributeName: string, value: any): any;
    __setDefaults(data: any): void;
    __getUnsaved(returnKey: any): any;
    __update(data: any): void;
    __refreshOnly(data: any): void;
}
