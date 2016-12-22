import { SelectionInterface } from './wakInterfaces';

export class WakSelection implements SelectionInterface {
    private mode: string;
    private selectedRows: number;
    private selection: Set<number>;
    private source: any;

    constructor(mode: any, source: any) {
        this.source = source;
        this.mode = mode;
        this.selectedRows = 0;
        if (mode === false) {
            this.mode = 'single';
        }
        if (mode === true) {
            this.mode = 'multiple';
        }
        this.selection = new Set([]);
    }

    public getMode(): string {
        return this.mode;
    }

    public isSelected(row: number): boolean {
        let result = false;
        if (this.selectedRows > 0) {
            result = this.selection.has(row);
        }
        return result;
    }

    public deSelect(row: number): void {
        this.selection.delete(row);
        this.selectedRows = this.selection.size;
    }

    public deSelectAll(): void {
        this.selection.clear();
        this.selectedRows = this.selection.size;
    }

    public select(row: number, addToSelection?: boolean): void {
        switch (this.mode) {
            case 'none':
            case null:
            case undefined:
                break;
            case 'single':
                this.selection.clear();
                this.selection.add(row);
                this.selectedRows = this.selection.size;
                break;
            case 'multiple':
                if (!addToSelection) {
                    this.selection.clear();
                }
                this.selection.add(row);
                break;
            default:
        }
        this.selectedRows = this.selection.size;
    }

    public selectRange(start: number, end: number): void {
        if (this.mode === 'multiple') {
            this.selection.clear();
            for (let i = start; i < end + 1; i++) {
                this.selection.add(i);
            }
            this.selectedRows = this.selection.size;
        }
    }

    public getSelectedRows(): number[] {
        let array: number[] = [];
        if (this.selectedRows > 0) {
            this.selection.forEach((value: any) => {
                array.push(value);
            });
        }
        return array;
    }

    public setSelectedRows(newRows: number[]): void {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < newRows.length; i++) {
            this.selection.add(newRows[i]);
        }
        this.selectedRows = this.selection.size;
    }

    public getmode(): string {
        return this.mode;
    }

    public reset(): void {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        // this.lastRowSelected = -1;
        // this.lastKeyKodeUsed = 'none';
        this.selectedRows = this.selection.size;
    }

    public trigger(): void {
        this.source.__triggerEvent('selection_changed');
    }

    public toggle(): void {
        let length = this.source.collection.length;
        let sel = this.getSelectedRows();
        this.reset();
        for (let i = 0; i < length; i++) {
            if (sel.indexOf(i) === -1) {
                this.selection.add(i);
            }
        }
        this.selectedRows = this.selection.size;
        this.trigger();
    }

    public prepareToSend(): any {
        interface ResultSet {
            _mode: any;
            _rows: any[];
            _ranges: any[];
            _butRows: any[];
        }
        // haveto stick within wakanda rest api...
        let result: ResultSet = {
            _mode: this.mode === 'single' ? 'single' : 'multiple',
            _rows: [],
            _ranges: [], // this.ranges, {"start":218995,"end":218996}
            _butRows: [],
        };

        let sel = this.getSelectedRows();
        sel.sort();

        let workingOnRange = false;
        let start: any = null;
        let lastRow = 0;
        sel.forEach((row: any, index: any) => {
            lastRow = row;
            if (sel[index + 1] === row + 1) {
                if (workingOnRange === false) {
                    workingOnRange = true;
                    start = row;
                }
            } else {
                if (workingOnRange) {
                    result._ranges.push({
                        // tslint:disable-next-line:object-literal-shorthand
                        start: start,
                        end: row
                    });
                    start = null;
                    workingOnRange = false;
                } else {
                    result._rows.push(row);
                }
            }

        });

        return result;
    }

    public setSelectionFromServer(selection: any) {
        this.selection.clear();

        selection.rows.forEach((row: any) => {
            this.selection.add(row);
        });

        selection.ranges.forEach((range: any) => {
            for (let i = range.start; i < range.end + 1; i++) {
                this.selection.add(i);
            }
        });

        selection.butRows.forEach((row: any) => {
            this.selection.delete(row);
        });
    }

}
