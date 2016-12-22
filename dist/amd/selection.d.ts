import { SelectionInterface } from './interfaces';
export declare class Selection implements SelectionInterface {
    private mode;
    private selectedRows;
    private selection;
    constructor(mode: string);
    getMode(): string;
    getRowKey(row: number): number;
    getRowKeys(): any[];
    overrideGetRowKey(fn: (row: number) => number): void;
    overrideGetRowKeys(fn: () => any[]): void;
    isSelected(row: number): boolean;
    deSelectAll(): void;
    deSelect(row: number): void;
    select(row: number, add?: boolean): void;
    selectRange(start: number, end: number): void;
    getSelectedRows(): number[];
    setSelectedRows(newRows: number[]): void;
    reset(): void;
}
