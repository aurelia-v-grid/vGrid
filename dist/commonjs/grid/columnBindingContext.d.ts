import { Controller, ColumBindingContextObject } from '../interfaces';
export declare class ColumnBindingContext {
    setupleft: ColumBindingContextObject[];
    setupmain: ColumBindingContextObject[];
    setupright: ColumBindingContextObject[];
    setupgroup: ColumBindingContextObject[];
    setupgrouping: number;
    changeGrouping: Function;
    private controller;
    [key: string]: any;
    constructor(controller: Controller);
    clear(): void;
}
