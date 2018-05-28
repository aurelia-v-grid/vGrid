import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection } from 'aurelia-v-grid';
import { DummyDataGenerator } from '../utils/dummyDataGenerator';

@autoinject(Router)
export class Page2 {
    public title: string;
    public ds: DataSource;
    public gridConnector: GridConnector;
    private dsEventID: number;
    private testString: string;
    private myCollection: any;
    private columns: any;
    private showgrid: any;

    constructor(public router: Router, public dummyDataGenerator: DummyDataGenerator) {
        this.dummyDataGenerator.generateData(300, (data: any) => {
            this.myCollection = data;
        });

        this.showgrid = true;

        this.ds = new DataSource(new Selection('multiple'), {

        });


        this.gridConnector = new GridConnector(this.ds);
        this.gridConnector.setInitTop(this.dummyDataGenerator.rowTop);
        this.ds.setArray(this.myCollection);
    }

    public canActivate(_a: any, b: any, _c: any) {
        this.title = b.title;
    }

}
