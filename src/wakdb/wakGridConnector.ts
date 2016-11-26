// this is just for connecting the modified aurleia-v-grid to the datasource


export class WakGridConnector {
    public datasource: any ;
    public vGrid: any;
    public errorHandler: any;
    public eventListenerID: any;


    constructor(datasource: any) {
        // depending on source you can add on creation if datasource is there, else use set datasource
        this.datasource = datasource;

        // object grid will add its context too
        this.vGrid = {};
    }




    public datasourceEvents(event: any) {

        switch (event) {
            case 'collectionChange':
                this.vGrid.vGridGenerator.collectionChange(true);
                break;
            case 'collectionChange_newAdded':
                this.vGrid.vGridGenerator.collectionChange(false, true);
                break;
            case 'collectionChange_update':
            case 'collectionChange_oneRemoved':
                this.vGrid.vGridGenerator.collectionChange(false);
                break;
            case 'selection_changed':
                this.vGrid.vGridGenerator.updateSelectionOnAllRows();
                break;
            default:
                console.log('unknown event');
                console.log(event);
        }

    }




    public setDatasource(datasource: any, errorHandler: any, setHeight: any, setSort: any) {
        this.datasource = datasource;
        let alt = () => { /*nothing?*/ };
        this.errorHandler = errorHandler || alt;
        this.eventListenerID = this.datasource.addEventListener(this.datasourceEvents.bind(this));

        if (Array.isArray(setSort)) {
            this.vGrid.vGridClientCtx.setSort(setSort);
        }

        let resetScroll = setHeight ? false : true;
        let scrollToBottom = setHeight ? false : false;



        this.vGrid.vGridGenerator.collectionChange(resetScroll, scrollToBottom, setHeight);


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




    public rowClick(e: any) {
        if (this.datasource) {
            this.datasource.select(e.row);
        }
    }




   public getElement(e: any) {
        // send back emty object so we clear cell.

        if (this.datasource) {
            e.callback();

            // is the row within the collection length =
            if (this.datasource.collection.length > e.row && e.row >= 0) {
                this.datasource.getElement(e.row)
                    .then((data: any) => {
                        if (e.row === e.div.top / e.rowHeight) {
                            e.callback(data, e.row);
                        }
                    }).catch((err: any) => {
                        e.callback();
                        this.errorHandler('getElement', err);
                    });
            }
        } else {
            e.callback();
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






    /************************************************************
     *   All function below is called by the grid  (only selection)
     */

    public isRowSelected(row: any) {
        let result = false;
        if (this.datasource) {
            result = this.datasource.selection.isRowSelected(row);
        }
        return result;
    }




    public deSelectRow(row: any) {
        this.datasource.selection.deSelectRow(row);
    }




    public addRowToSelection(row: any, addToSelection: any) {
        this.datasource.selection.addRowToSelection(row, addToSelection);
    }




    public setSelectionRange(start: any, end: any) {
        this.datasource.selection.setSelectionRange(start, end);
    }




    public getSelectedRows() {
        return this.datasource.selection.getSelectedRows();
    }




    public setSelectedRows(newRows: any) {
        this.datasource.selection.setSelectedRows(newRows);
    }




    public getSelectionMode() {
        return 'multiple';
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
