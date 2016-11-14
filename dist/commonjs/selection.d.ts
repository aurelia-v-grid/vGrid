export declare class Selection {
    private mode;
    private selectedRows;
    private selection;
    private lastRowSelected;
    private lastKeyKodeUsed;
    constructor(mode: any);
    getMode(): string;
    setMode(): void;
    getRowKey(row: any): any;
    getRowFromKey(row: any): any;
    overrideGetRowKey(fn: any): void;
    overrideGetRowFromKey(fn: any): void;
    isSelected(row: any): boolean;
    deSelectAll(): void;
    deSelect(row: any): void;
    select(row: any, add: any): void;
    selectRange(start: any, end: any): void;
    getSelectedRows(): any[];
    setSelectedRows(newRows: any): void;
    reset(): void;
}
