import { Controller } from './controller';
export declare class ColumnBindingContext {
    controller: Controller;
    setupleft: Array<any>;
    setupmain: Array<any>;
    setupright: Array<any>;
    setupgroup: Array<any>;
    setupgrouping: number;
    changeGrouping: Function;
    constructor(controller: Controller);
}
