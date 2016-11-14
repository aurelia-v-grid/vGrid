import { Controller } from '../controller';
export declare class vMenu {
    element: any;
    controller: Controller;
    raiseEvent: any;
    openBinded: any;
    checkBinded: any;
    callbackBinded: any;
    filter: any;
    sort: any;
    pinned: any;
    copypaste: any;
    constructor(element: any, vGrid: any);
    unbind(): void;
    check(e: any): void;
    callback(type: any, option: any, event: any): boolean;
    open(e: any): void;
    attached(): void;
    getPosition(e: any): {
        x: number;
        y: number;
    };
}
