import { Controller } from '../interfaces';
export declare class RowDataBinder {
    private element;
    private controller;
    private rebindRowBinded;
    private rebindAllRowsBinded;
    constructor(element: Element, controller: Controller);
    init(): void;
    private addEventListener();
    private rebindRow(event);
    private rebindAllRows(event);
}
