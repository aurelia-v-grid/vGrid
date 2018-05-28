import { Controller, ColumBindingContextObjectInterface } from '../interfaces';
export declare class ColumnBindingContext {
    setupleft: ColumBindingContextObjectInterface[];
    setupmain: ColumBindingContextObjectInterface[];
    setupright: ColumBindingContextObjectInterface[];
    setupgroup: ColumBindingContextObjectInterface[];
    setupgrouping: number;
    changeGrouping: Function;
    private controller;
    [key: string]: any;
    constructor(controller: Controller);
    clear(): void;
}
