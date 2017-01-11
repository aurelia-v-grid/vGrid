import { SelectionInterface } from './wakInterfaces';
export declare class WakSelection implements SelectionInterface {
    private mode;
    private selectedRows;
    private selection;
    private source;
    constructor(mode: any, source: any);
    getMode(): string;
    isSelected(row: number): boolean;
    deSelect(row: number): void;
    deSelectAll(): void;
    select(row: number, addToSelection?: boolean): void;
    selectRange(start: number, end: number): void;
    getSelectedRows(): number[];
    setSelectedRows(newRows: number[]): void;
    getmode(): string;
    reset(): void;
    trigger(): void;
    toggle(): void;
    prepareToSend(): any;
    setSelectionFromServer(selection: any): void;
}
