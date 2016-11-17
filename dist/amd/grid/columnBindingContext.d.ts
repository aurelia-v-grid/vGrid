import { Controller, ColumBindingContextObject } from '../interfaces';
export declare class ColumnBindingContext {
    setupleft: Array<ColumBindingContextObject>;
    setupmain: Array<ColumBindingContextObject>;
    setupright: Array<ColumBindingContextObject>;
    setupgroup: Array<ColumBindingContextObject>;
    setupgrouping: number;
    changeGrouping: Function;
    private controller;
    [key: string]: any;
    constructor(controller: Controller);
    clear(): void;
}
