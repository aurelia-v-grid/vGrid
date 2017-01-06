import { autoinject } from 'aurelia-framework';
import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection } from 'aurelia-v-grid';
import { DummyDataGenerator } from './utils/dummyDataGenerator';

@autoinject()
export class Welcome {

  public ds: DataSource;
  public gridConnector: GridConnector;
  private testString: string = 'yay';
  // public translate: any = { equals: 'er lik', greaterThan: 'større enn' };
  private myCollection: any;
  constructor(public dummyDataGenerator: DummyDataGenerator) {
    this.dummyDataGenerator.generateData(5000, (data) => {
      this.myCollection = data;
    });
    this.ds = new DataSource(new Selection('multiple'));
    this.gridConnector = new GridConnector(this.ds);

    this.ds.setArray(this.myCollection);
  }

  // this is the i18N translation
  public translateI18n(key: string) {
    return this.testString;
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

  public replace(x) {
    this.dummyDataGenerator.generateData(x, (data) => {
      this.myCollection = data;
    });
    this.ds.setArray(this.myCollection);
  }

  public add(x) {
    this.dummyDataGenerator.generateData(x, (data) => {
      this.myCollection = data;
    });
    this.ds.setArray(this.myCollection);
  }

}
