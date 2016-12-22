import {
    ControllerInterface,
    GridConnectorInterface,
    SelectionInterface,
    ColConfig,
    FilterObject,
    SortObject,
    BindingContext,
    WakDataSource
} from './wakInterfaces';

export class WakGridConnector implements GridConnectorInterface {
    private datasource: WakDataSource;
    private errorHandler: any;
    private eventListenerID: any;
    private controller: ControllerInterface;
    private createGrid: any;
    private lastSort: any[] = [];
    private curSort: any[] = [];
    private lastFilter: any[] = [];

    constructor(datasource?: WakDataSource) {
        // depending on source you can add on creation if datasource is there, else use set datasource
        this.datasource = datasource;
    }

    public getSelection(): SelectionInterface {
        return this.datasource.selection;
    }

    public getCurrentOrderBy(): any[] {
        return this.curSort;
    }

    public getCurrentFilter(): FilterObject[] {
        return this.lastFilter;
    }

    public expandGroup(id: string): void {
        console.warn('not usable in wak datasource');
        // not usable in wak datasource
        id = null;
    }

    public collapseGroup(id: string): void {
        console.warn('not usable in wak datasource');
        // not usable in wak datasource
        id = null;
    }

    public getDatasourceLength() {
        if (this.datasource) {
            return this.datasource.collection.length;
        } else {
            return 0;
        }
    }

    public connect(controller: ControllerInterface, create: Function): void {
        this.controller = controller;
        this.createGrid = create;
        if (this.datasource) {
            this.createGrid();
        }
    }

    public gridCreated(): void {
        if (this.datasource) {
            this.controller.updateHeights();
            this.controller.triggerScroll(0);
            this.eventHandler('collectionChange');
        }
    }

    public setDatasource(datasource: any, errorHandler?: any, setHeight?: any, setSort?: any) {
        // fix later, do this to get ts to stop complaining
        setHeight = null;
        setSort = null;

        this.datasource = datasource;
        let alt = () => { /*nothing?*/ };
        this.errorHandler = errorHandler || alt;
        this.eventListenerID = this.datasource.addEventListener(this.eventHandler.bind(this));

        if (this.createGrid) {
            this.createGrid();
        }

    }

    public destroy() {
        this.datasource.removeEventListener(this.eventListenerID);
    }

    public getColConfig(): ColConfig[] {
        return this.controller.getColumnConfig();
    }

    public setColConfig(colconfig: ColConfig[]): void {
        this.controller.setColumnConfig(colconfig);
    }

    public getGrouping(): string[] {
        // not implemeted in wak datasource
        return []; // this.datasource.getGrouping();
    }

    public group(grouping: string[], keepExpanded?: boolean): void {
        console.warn('not usable in wak datasource');
        // not implemeted in wak datasource
        grouping = null;
        keepExpanded = false;
    }

    public select(row: any) {
        if (this.datasource) {
            this.datasource.select(row);
        }
    }

    public getElement(options: { row: number, isDown: boolean, callback: Function }) {
        // send back emty object so we clear cell.

        let rowContext = ({
            row: options.row,
            selection: this.datasource.selection,
            rowRef: {},
            tempRef: {}
        } as BindingContext);

        if (this.datasource) {
            // is the row within the collection length =
            if (this.datasource.collection.length > options.row && options.row >= 0) {
                options.callback(rowContext);
                this.datasource.getElement(options.row)
                    .then((data: any) => {
                        rowContext.tempRef = this.getRowProperties(data);
                        rowContext.rowRef = data;
                        options.callback(rowContext);
                    }).catch((err: any) => {
                        options.callback();
                        this.errorHandler('getElement', err);
                    });
            } else {
                rowContext.rowRef = null;
                options.callback(rowContext);
            }
        } else {
            options.callback(rowContext);
        }
    }

    public query(filterObj: FilterObject[]): void {

        // set last filter for later usage
        this.lastFilter = filterObj;

        // set loading screen
        this.controller.setLoadingScreen(true, 'Running query, please wait', 100000).then(() => {
            let filter = this.createQueryString(this.lastFilter);
            let sort = this.createOrderByString(this.lastSort);

            // run query
            this.datasource.query(filter, {
                orderby: sort,
                releaseEntitySet: true
            })
                .then(() => {
                    // nothing atm
                }).catch((err: any) => {
                    this.errorHandler('filter', err);
                });
        });
    }

    public orderBy(attribute: string | SortObject, addToCurrentSort?: boolean): void {

        // get last sort
        this.setOrderBy(attribute, addToCurrentSort);

        // set loading screen
        this.controller.setLoadingScreen(true, 'Running sort, please wait', 100000).then(() => {
            let sort = this.createOrderByString(this.lastSort);

            // run sort
            this.datasource.orderby(sort, true)
                .then(() => {
                    // nothing atm
                }).catch((err: any) => {
                    this.errorHandler('sort', err);
                });
        });
    }

    public setValueToRow(attribute: any, value: any, row: any) {
        if (this.datasource) {
            this.datasource.collection.setValueToRow(attribute, value, row);
        }
    }

    private eventHandler(event: string): void {
        switch (event) {
            case 'collectionChange':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(0);
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_sorted':
                this.raiseEvent('sortIconUpdate');
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_filtered':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(0);
                this.controller.setLoadingScreen(false);
                break;
            case 'collectionChange_update':
                this.raiseEvent('sortIconUpdate');
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_update':
                this.controller.updateHeights();
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collectionChange_oneRemoved':
                this.controller.updateHeights();
                this.controller.rebindAllRows();
                this.controller.setLoadingScreen(false);
                break;
            case 'collectionChange_newAdded':
                this.controller.updateHeights();
                setTimeout(() => {
                     this.controller.triggerScroll(1000000000);
                     this.controller.rebindAllRows();
                });
                this.controller.setLoadingScreen(false);
                break;
            default:
                console.warn('unknown event');
                console.warn(event);
        }
    }

    private raiseEvent(name: string, data = {}): void {
        let event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        if (this.controller) {
            this.controller.element.dispatchEvent(event);
        }
    }

    private getRowProperties(obj: { [key: string]: any }): {} {
        let x: { [key: string]: any } = {};
        if (obj) {
            let k: any;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    if (x[k] !== obj[k]) {
                        x[k] = obj[k];
                    }
                }
            }
        }
        return x;
    }

    /************************************************************
     *   Helper function, not called by grid, but use them to convert the query/filter params
     */
    private createOrderByString(orderByArray: any) {
        let sortArray: any[] = [];
        if (orderByArray) {
            orderByArray.forEach((param: any) => {
                sortArray.push(`${param.attribute} ${param.asc ? 'asc' : 'desc'}`);
            });
            if (orderByArray.length === 0) {
                return null;
            }
            return sortArray;
        } else {
            return null;
        }
    }

    private createQueryString(queryArray: any) {
        if (queryArray) {
            let queryString = '';
            queryArray.forEach((param: any, index: any) => {
                if (index === 0) {
                    queryString = '';
                } else {
                    queryString = queryString + ' and ';
                }
                switch (param.operator) {
                    case '=': // "equals"
                        queryString = queryString + `${param.attribute}=${param.value}`;
                        break;
                    case '*': // "contains"
                        queryString = queryString + `${param.attribute}=*${param.value}*`;
                        break;
                    case '!=': // "not equal to"
                        queryString = queryString + `${param.attribute}!=${param.value}`;
                        break;
                    case '<': // "less than"
                        queryString = queryString + `${param.attribute}${param.operator}${param.value}`;
                        break;
                    case '>': // "greater than"
                        queryString = queryString + `${param.attribute}${param.operator}${param.value}`;
                        break;
                    case '<=': // "less than or eq"
                        queryString = queryString + `${param.attribute}${param.operator}${param.value}`;
                        break;
                    case '>=': // "greater than or eq"
                        queryString = queryString + `${param.attribute}${param.operator}${param.value}`;
                        break;
                    case '*=': // "begins with"
                        queryString = queryString + `${param.attribute}=${param.value}*`;
                        break;
                    case '=*': // "ends with"
                        queryString = queryString + `${param.attribute}=*${param.value}`;
                        break;
                    case '!*': // "does not contain"
                        queryString = queryString + `${param.attribute}!=*${param.value}*`;
                        break;
                    default:
                    // todo
                }
            });
            return queryString;
        } else {
            return null;
        }
    }

    private setOrderBy(param: SortObject | any, add?: boolean): void {
        let sort: any;
        let useSetValue = false;
        if (param.asc === undefined) {
            sort = {
                attribute: param,
                asc: true
            };
        } else {
            sort = {
                attribute: param.attribute,
                asc: param.asc
            };
            useSetValue = true;
        }

        // do we add or is it the first one
        if (add && this.lastSort.length > 0) {

            // its adding, so lets get last one
            this.curSort = this.lastSort;
            let exist = false;

            // loop to se if it exist from before
            this.curSort.forEach((x) => {
                if (!useSetValue) {
                    if (x.attribute === sort.attribute) {
                        exist = true;
                        x.asc = x.asc === true ? false : true;
                    }
                }

            });

            // if it dont exist we add it, else there isnt anythin else to do for now
            if (!exist) {
                this.curSort.push(sort);
                this.curSort[this.curSort.length - 1].no = this.curSort.length;
            }
            this.lastSort = this.curSort;
        } else {
            // if not adding, just set it
            this.curSort = [sort];
            this.curSort[0].no = 1;
            if (this.lastSort[0]) {
                if (this.lastSort[0].attribute === this.curSort[0].attribute) {
                    if (this.lastSort[0].asc === this.curSort[0].asc) {
                        if (!useSetValue) {
                            this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
                        }
                    }
                }
            }
            this.lastSort = this.curSort;
        }
    }
}
