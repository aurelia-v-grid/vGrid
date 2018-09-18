import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection } from 'aurelia-v-grid';
import { customElement } from '@aurelia/runtime';
// @ts-ignore
import view from './app.html';

@customElement({
    name: 'app',
    templateOrNode: view,
    build: {
        required: true,
        compiler: 'default'
    },
    instructions: []
})
export class App {
    // https://vgrid.gitbook.io/docs/about-readme-first
    public ds: DataSource;
    public gridConnector: GridConnector;
    private collection: any;
    public message = 'Hello World! again and again';

    constructor() {

        // dummy data
        this.collection = [{
            name: 'Vegar',
            number: 5425.25,
            country: 'Norway',
            hired: true
        }, {
            name: 'Lars',
            number: 545.45,
            country: 'Sweden',
            hired: false
        }]

        // create datasource (you could just inject this from somewhere else)
        this.ds = new DataSource(new Selection('multiple'));

        // create grid connector
        this.gridConnector = new GridConnector(this.ds);

        // set data to the datasource, you dont need to set data now, you can do it later...
        this.ds.setArray(this.collection);
    }
}
