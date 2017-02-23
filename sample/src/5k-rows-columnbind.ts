import { autoinject } from 'aurelia-framework';
import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection, ColConfigInterface } from 'aurelia-v-grid';
import { DummyDataGenerator } from './utils/dummyDataGenerator';

@autoinject()
export class Welcome {

  public ds: DataSource;
  public gridConnector: GridConnector;
  private myCollection: any;
  private myColumns: ColConfigInterface[];
  constructor(public dummyDataGenerator: DummyDataGenerator) {
    this.dummyDataGenerator.generateData(5000, (data) => {
      this.myCollection = data;
    });
    this.ds = new DataSource(new Selection('multiple'));
    this.gridConnector = new GridConnector(this.ds);

    this.ds.setArray(this.myCollection);

    this.myColumns = ([
      {
        colWidth: 100,
        colField: 'name',
        colPinLeft: true
      },
      {
        colWidth: 100,
        colField: 'index'
      }

    ] as ColConfigInterface[]);

  }




}
