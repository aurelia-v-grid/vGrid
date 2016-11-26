
export class WakSelection  {
    private mode: string;
    private selectedRows: number;
    private selection: Set<number>;
    private source: any;

    constructor(mode: string, source: any) {
        this.source = source;
        this.mode = mode;
        this.selectedRows = 0;
        /*if (mode === false) {
            this.mode = 'single';
        }*/
       /* if (mode === true) {
            this.mode = 'multiple';
        }*/
        this.selection = new Set([]);
    }


    public getMode(): string {
        return this.mode;
    }


    public isSelected(row: any) {
        let result = false;
        if (this.selectedRows > 0) {
            result = this.selection.has(row);
        }
        return result;
    }


    public deSelect(row: any) {
        this.selection.delete(row);
        this.selectedRows = this.selection.size;
    }


    public deSelectAll() {
        this.selection.clear();
        this.selectedRows = this.selection.size;
    }


    public select(row: any, addToSelection?: any) {
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


    public selectRange(start: any, end: any) {
        if (this.mode === 'multiple') {
            this.selection.clear();
            for (let i = start; i < end + 1; i++) {
                this.selection.add(i);
            }
            this.selectedRows = this.selection.size;
        }
    }


    public getSelectedRows(): any {
        let array: Array<any> = [];
        if (this.selectedRows > 0) {
            this.selection.forEach((value: any) => {
                array.push(value);
            });
        }
        return array;
    }


    public setSelectedRows(newRows: any) {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        for (let i = 0; i < newRows.length; i++) {
            this.selection.add(newRows[i]);
        }
        this.selectedRows = this.selection.size;
    }


    public getmode() {
        return this.mode;
    }


    public reset() {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        // this.lastRowSelected = -1;
        // this.lastKeyKodeUsed = 'none';
        this.selectedRows = this.selection.size;
    }


    public trigger() {
        this.source.__triggerEvent('selection_changed');
    }


    public toggle() {
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
            _rows: Array<any>;
            _ranges: Array<any>;
            _butRows: Array<any>;
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
