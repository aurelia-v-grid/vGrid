// this is just for connecting the modified aurleia-v-grid to the datasource
import {Controller} from '../interfaces';

export class WakGridConnector {
    public datasource: any;
    public errorHandler: any;
    public eventListenerID: any;
    public filterOperatorNames: any;
    public controller: any;
    public createGrid: any;


    constructor(datasource?: any) {
        // depending on source you can add on creation if datasource is there, else use set datasource
        this.datasource = datasource;

    }

    public getSelection(): Selection {
        return this.datasource.selection;
    }

    public getCurrentOrderBy(): Array<any> {
        return this.datasource.getCurrentOrderBy();
    }

    public getFilterOperatorName(name: string) {
        return this.datasource.getFilterOperatorName(name);
    }

    public getDatasourceLength() {
        if (this.datasource) {
            return this.datasource.length();
        } else {
            return 0;
        }
    }

    public connect(controller: Controller, create: Function): void {
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






    public setDatasource(datasource: any, errorHandler: any, setHeight: any, setSort: any) {
        //fix later, do this to get ts to stop complaining
        setHeight =  null;
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



    /************************************************************
     *   All function below is called by the grid
     */




    public length() {
        let length = 0;
        if (this.datasource) {
            length = this.datasource.collection.length;
        }
        return length;
    }




    public select(row: any) {
        if (this.datasource) {
            this.datasource.select(row);
        }
    }



    public getElement(options: { row: number, isDown: boolean, callback: Function }) {
        // send back emty object so we clear cell.

        let rowContext = {
            row: options.row,
            selection: this.datasource.selection,
            rowRef: {},
            tempRef: {} //this.getRowProperties(rowData)
        };

        if (this.datasource) {
            options.callback(rowContext);

            // is the row within the collection length =
            if (this.datasource.collection.length > options.row && options.row >= 0) {
                this.datasource.getElement(options.row)
                    .then((data: any) => {
                        /* if (options.row === options.div.top / options.rowHeight) {
                             options.callback(rowContext);
                         }*/
                        rowContext.tempRef = this.getRowProperties(data);
                        rowContext.rowRef = data;
                        options.callback(rowContext);
                    }).catch((err: any) => {
                        options.callback();
                        this.errorHandler('getElement', err);
                    });
            }
        } else {
            options.callback(rowContext);
        }
    }




    public filter(e: any) {
        e.activateLoadingScreen();
        let filter = this.createQueryString(e.filter);
        let sort = this.createOrderByString(e.sort);
        this.datasource.query(filter, {
            orderby: sort,
            releaseEntitySet: true // null = false...
        })
            .then(() => {
                e.callback();
            }).catch((err: any) => {
                e.callback();
                this.errorHandler('filter', err);
            });
    }




    public sort(e: any) {
        e.activateLoadingScreen();
        // let filter = this.createQueryString(e.filter);
        let sort = this.createOrderByString(e.sort);
        this.datasource.orderby(sort, true)
            .then(() => {
                e.callback();
            }).catch((err: any) => {
                e.callback();
                this.errorHandler('sort', err);
            });
    }




    public setValueToRow(attribute: any, value: any, row: any) {
        if (this.datasource) {
            this.datasource.collection.setValueToRow(attribute, value, row);
        }
    }


    public eventHandler(event: string): void {
        switch (event) {
            case 'collectionChange':
            case 'collection_grouped':
            case 'collection_collapsed_all':
            case 'collection_expanded_all':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(0);
                //this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_collapsed':
            case 'collection_expanded':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(null);
                //this.controller.updateHeaderGrouping(this.datasource.getGrouping());
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
                this.controller.triggerScroll(null);
                this.controller.setLoadingScreen(false);
                break;

            default:
                console.log('unknown event');
                console.log(event);

        }

    }


    public raiseEvent(name: string, data = {}): void {
        let event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        if (this.controller) {
            this.controller.element.dispatchEvent(event);
        }
    }

    public getRowProperties(obj: { [key: string]: any }): {} {
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


    public createOrderByString(orderByArray: any) {
        let sortArray: Array<any> = [];
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




    public createQueryString(queryArray: any) {
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

}
