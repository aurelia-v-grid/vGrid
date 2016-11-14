import { Controller } from './controller';
export declare class RowDataBinder {
    element: Element;
    controller: Controller;
    rebindRowBinded: any;
    rebindAllRowsBinded: any;
    constructor(element: Element, controller: Controller);
    init(): void;
    addEventListener(): void;
    removeEventListener(): void;
    rebindRow(event: any): void;
    rebindAllRows(event: any): void;
}
