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
  private dsEventID: any;
  // public translate: any = { equals: 'er lik', greaterThan: 'større enn' };
  private myCollection: any;
  constructor(public dummyDataGenerator: DummyDataGenerator) {
    this.dummyDataGenerator.generateData(5000, (data: any) => {
      this.myCollection = data;
    });
    this.ds = new DataSource(new Selection('multiple'));
    this.dsEventID = this.ds.addEventListener(this.dsEvents.bind(this));
    this.gridConnector = new GridConnector(this.ds);
    console.log(this.dummyDataGenerator.rowTop)
    this.gridConnector.setInitTop(this.dummyDataGenerator.rowTop);
    this.ds.setArray(this.myCollection);
  }

  public dsEvents(e) {
    console.log(e)
    console.log(this.ds.getCollectionStatus());
    return true;
  }

  // this is the i18N translation
  public translateI18n(key: string) {
    return this.testString;
  }

  public singleClick (event) {
    //console.log(event);
  }

  public dblClick(event) {
    //console.log(event);
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

  public filterByCode(){
    this.ds.query([{attribute:"index", operator:">", value:5}, {attribute:"index", operator:"<", value:10}])
    this.gridConnector.raiseEvent("filterUpdateValues")
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



}
