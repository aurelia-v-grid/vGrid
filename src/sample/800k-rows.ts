import { autoinject } from 'aurelia-framework';
import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection } from 'aurelia-v-grid';
import { DummyDataGenerator } from './utils/dummyDataGenerator';

@autoinject()
export class Users {

  public ds: DataSource;
  public gridConnector: GridConnector;
  private myCollection: any;
  constructor(public dummyDataGenerator: DummyDataGenerator) {
    this.dummyDataGenerator.generateData(800000, (data) => {
      this.myCollection = data;
    });
    this.ds = new DataSource(new Selection('multiple'));
    this.gridConnector = new GridConnector(this.ds);

    this.ds.setArray(this.myCollection);
  }


}
