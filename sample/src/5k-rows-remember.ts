import { autoinject } from 'aurelia-framework';
import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection, ColConfig } from 'aurelia-v-grid';
import { DummyDataGenerator } from './utils/dummyDataGenerator';
import { Remember} from './utils/remember';

@autoinject()
export class Welcome {

  public ds: DataSource;
  public gridConnector: GridConnector;
  private myCollection: any;
  private myColumns: Array<ColConfig>;
  constructor(public dummyDataGenerator: DummyDataGenerator, public remember: Remember) {
    this.dummyDataGenerator.generateData(5000, (data) => {
      this.myCollection = data;
    });
    this.ds = new DataSource(new Selection('multiple'));
    this.gridConnector = new GridConnector(this.ds);

    this.ds.setArray(this.myCollection);

    this.myColumns = remember.columns;
  }


  public saveColConfig() {
    this.remember.columns = this.gridConnector.getColConfig();
  }

  public resetToDefault() {
    this.remember.columns = null;
    this.gridConnector.setColConfig(this.remember.columns);
  }

  public useDefault(){
    this.gridConnector.setColConfig(null);
  }

  public setSaved() {
    this.gridConnector.setColConfig(this.remember.columns);
  }

}
