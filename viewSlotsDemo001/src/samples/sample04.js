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

  callRemoteServer(filterArray, orderByArray, callback){

    if(filterArray){
      this.remoteData.offset = 0;
    }

    this.remoteData.createOrderByString(orderByArray);
    this.remoteData.createQueryString(filterArray);

    this.remoteData.getData()
      .then((data)=>{
        this.setpager();
        callback(data);
      }).catch((err)=>{
        console.error(err);
        callback([]);
      });
  }



  loadData(){
    this.myGrid.ctx.setLoadingOverlay(true);
    this.remoteData.getData()
    .then((data)=>{
      this.setpager();
      this.myGrid.ctx.keepFilterOnCollectionChange();
      this.myCollection = data;
      this.myGrid.ctx.setLoadingOverlay(false);
    })
  }


  setpager(){
    this.collectionLength = this.remoteData.length;
    this.limit = this.remoteData.limit;
    this.offset = this.remoteData.offset;
    this.page = this.offset ? Math.ceil(this.offset/this.limit)+1:1;
    if(this.page === 1){
      this.statusFirstButton = false;
      this.statusPrevButton = false;
    } else {
      this.statusFirstButton = true;
      this.statusPrevButton = true;
    }

    if(this.offset >= this.collectionLength-this.limit){
      this.statusNextButton = false;
      this.statusLastButton = false;
    } else {
      this.statusNextButton = true;
      this.statusLastButton = true;
    }

  }



  firstBtn(){
    this.remoteData.offset = 0;
    this.loadData();
  }



  nextBtn(){
    this.remoteData.offset = this.remoteData.offset + this.limit;
    this.loadData();
  }



  prevBtn(){
    this.remoteData.offset = this.remoteData.offset - this.limit;
    this.loadData();
  }



  lastBtn(){
    this.remoteData.offset = this.collectionLength-this.limit;
    this.loadData();
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
