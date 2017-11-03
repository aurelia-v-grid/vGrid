import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection } from 'aurelia-v-grid';
import { DummyDataGenerator } from '../utils/dummyDataGenerator';

@autoinject
export class Page1 {
    public title: string;
    public ds: DataSource;
    public gridConnector: GridConnector;
    private dsEventID: number;
    private testString: string;
    private myCollection: any;
    private columns: any;
    private showgrid: any;

    constructor(public router: Router, public dummyDataGenerator: DummyDataGenerator) {
        this.dummyDataGenerator.generateData(10, (data: any) => {
            this.myCollection = data;
        });

        this.showgrid = true;

        this.ds = new DataSource(new Selection('multiple'), {
            rowHeight: 50,
            groupHeight: 25,
            /* rowHeightCallback: (x: any) => {
                if (x.index % 3 === 0) {
                    return 35;
                } else {
                    return 50;
                }
            } */
        });


        this.dsEventID = this.ds.addEventListener(this.dsEvents.bind(this));
        this.gridConnector = new GridConnector(this.ds);
        this.gridConnector.setInitTop(this.dummyDataGenerator.rowTop);
        this.ds.setArray(this.myCollection);
    }

    public canActivate(a, b, c) {
        this.title = b.title;
    }


    public dsEvents(e) {
        // console.log(e)
        // console.log(this.ds.getCollectionStatus());
        return true;
    }

    // this is the i18N translation
    public translateI18n(key: string) {
        return this.testString;
    }

    public singleClick(event) {
        // console.log(event);
    }

    public setLocal(code: string): void {
        this.ds.setLocaleCompare(code);
    }

    public dblClick(event) {
        // console.log(event);
    }

    public onRowDraw(data) {

        if (data) {
            if (data.tempRef) {
                if (data.tempRef.number > 100) {
                    data.tempRef.numberColor = 'green';
                    data.tempRef.numberFont = 'normal';
                } else {
                    data.tempRef.numberColor = 'red';
                    data.tempRef.numberFont = 'bold';
                }
            }
        }
    }


    public deactivate() {
        console.log('deactivate');
        this.dummyDataGenerator.rowTop = this.gridConnector.getTopRow() * 25;
    }

    // this is called by my button... not very good
    public translate() {
        if (this.testString === 'cool') {
            this.testString = 'yay';
        } else {
            this.testString = 'cool';
        }
        // this will trigger the grid to ask for every translation key
        this.gridConnector.triggerI18n();
    }

    public replace(x: any) {
        this.dummyDataGenerator.generateData(x, (data: any) => {
            this.myCollection = data;
        });
        this.ds.setArray(this.myCollection);
    }

    public add(x: any) {
        this.dummyDataGenerator.generateData(x, (data: any) => {
            this.ds.push(data);
        });
    }


    public filterByCode() {
        this.ds.query([{ attribute: 'index', operator: '>', value: 5 }, { attribute: 'index', operator: '<', value: 10 }]);
        this.gridConnector.raiseEvent('filterUpdateValues');
    }

    public remove() {
        console.log(this.ds.remove(this.gridConnector.getSelection().getSelectedRows()));
    }

    public addNew(data?: any) {
        if (!data) {
            this.ds.addBlankRow();
        } else {
            this.ds.unshift({ name: 'new' });
        }
    }

    public refresh(addData?: any) {
        if (addData) {
            this.dummyDataGenerator.generateData(addData, (data: any) => {
                this.ds.refresh(data);
            });
        } else {
            this.ds.refresh();
        }

    }

    public hidebtn() {
        this.showgrid = false;
    }

    public showbtn() {
        this.showgrid = true;
    }

    public default() {
        this.gridConnector.setColConfig(null);
    }

    public load() {
        this.gridConnector.setColConfig(this.columns);
    }

    public  save() {
        this.columns = this.gridConnector.getColConfig();
    }
}
