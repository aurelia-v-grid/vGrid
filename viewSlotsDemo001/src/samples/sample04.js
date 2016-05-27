import {HttpClient, json} from 'aurelia-fetch-client';
import {RemoteData} from 'remote/remoteData'


export class sample01 {
  static inject = [Element, HttpClient];


  /********************************************************************
   *  grid bindleable/functions
   ********************************************************************/

  myCollection = [];
  myCurrentEntity = {};
  myGrid = {};

  collectionLength = 0;

  callRemoteServer(param){//filterArray, orderByArray, callback) {

    this.remoteData.createOrderByString(param.sort);
    this.remoteData.createQueryString(param.filter);
    this.remoteData.setLimit(param.limit);
    this.remoteData.setOffset(param.offset);

    return this.remoteData.getData()
      .then((data)=> {
        return data;
      }).catch((err)=> {
      console.error(err);
        //param.callback([]);
    });
  }


  loadData() {
    this.myGrid.ctx.setLoadingOverlay(true);
    this.remoteData.getData()
    .then((data)=>{
      this.myGrid.ctx.setData(data);
    })
  }




  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element, http) {
    //get this element
    this.element = element;

    //set up data api
    http.configure(config => {
      config
        .withBaseUrl('http://data-nodedataapi.rhcloud.com/')
        .withDefaults({
          credentials: 'same-origin'
        });
    });
    this.http = http;


    this.remoteData = new RemoteData('http://data-nodedataapi.rhcloud.com/', 'data/people')
    this.remoteData.limit = 20;


  }


  /********************************************************************
   * attached
   ********************************************************************/
  attached() {
    this.getMaxRows = this.myGrid.ctx.getMaxRows();
    this.loadData();


  }


}
