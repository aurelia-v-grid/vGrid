import { autoinject } from 'aurelia-framework';
import { WakGridConnector } from 'aurelia-v-grid';
import { WakDataProvider } from './utils/wakDataProvider';

@autoinject()
export class Welcome {


  public gridConnector: WakGridConnector;
  public ds: any;

  constructor(public WakDataProvider: WakDataProvider) {
    this.ds = WakDataProvider;
    this.gridConnector = new WakGridConnector();

  }

  public canActivate() {
    return this.ds.restApi.loaded();
  }

  public activate() {
    // in the activate event in a component/page we want to check if the restapi is loaded before we try and query
    // will be very fast if using local configuation json file
    this.ds.restApi.loaded().then(() => {

     /* this.ds.person.all().then((result) => {
          // nothing 
      }).catch((err) => {
        // this.error(err);
      });*/

      // set datasource to to grid connector
      this.gridConnector.setDatasource(this.ds.person);
    });
  }


  public showAll() {
    this.ds.person.all().then(() => {
        // noting atm
      }).catch((err) => {
        // noting atm
      });
  }


  public deleteCurrent() {
    this.ds.person.deleteCurrent().then(() => {
      // noting atm
    }).catch((err) => {
      // noting atm
    });
  }


  public clearCache() {
     this.ds.person.clearCache().then(() => {
      // noting atm
    }).catch((err) => {
      // noting atm
    });
  }


  public refreshCurrent() {
    this.ds.person.refreshCurrent().then(() => {
      // noting atm
    }).catch((err) => {
      // noting atm
    });
  }


  public saveCurrent() {
    this.ds.person.saveCurrent().then(() => {
      // noting atm
    }).catch((err) => {
      // noting atm
    });
  }


  public saveAll() {
    this.ds.person.saveAll().then((data) => {
      // noting atm
    }).catch((err) => {
      // noting atm
    });
  }


  public addNew() {
    this.ds.person.addNewElement();
  }


  public buildFromSelection() {
    this.ds.person.buildFromSelection().then((collection) => {
       this.ds.person.replaceCollection(collection, true);
   }).catch((err) => {
      console.log(err);
    });
  }

}
