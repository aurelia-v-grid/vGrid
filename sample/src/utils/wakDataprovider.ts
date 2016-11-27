// import the rest api
import { WakRestApi } from 'aurelia-v-grid';

// if you dont want to contact the server to get the catalog you can add a json file
// to import json install the plugin "jspm install json" for cli/webpack I dont know atm
// import * as config from './configuration.json!json';


export class WakDataProvider {
    public person: any;
    private restApi: WakRestApi;

  constructor() {

    // create rest API
    this.restApi = new WakRestApi();

    // configure rest API
    this.restApi.configure({
      name: 'main',
      baseURL: 'http://127.0.0.1:8081',
      pageSize: 40,
      sources: [
        {
          name: 'person',
          dataClass: 'Person',
          multiSelect: true,
          pageSize: 40
        }
      ]
    }).then(() => {

      // datasources are now created
      // here you can now defined the datasources you want to access from everwhere
      this.person = this.restApi.sources.person;


    }).catch((err) => {
      console.log('unable to configure datasource' + err);
    });
  }

}
