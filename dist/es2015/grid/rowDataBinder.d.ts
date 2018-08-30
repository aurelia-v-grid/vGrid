import { Controller } from '../interfaces';
export declare class RowDataBinder {
    private element;
    private controller;
    private rebindRowBinded;
    private rebindAllRowsBinded;
    constructor(element: Element, controller: Controller);
    init(): void;
    rebindRowNo(row: number): void;
    private addEventListener;
    private rebindRow;
    private rebindAllRows;
}
