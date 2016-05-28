import {RemoteData} from 'remote/remoteData'

export class sample01 {
  static inject = [Element];

  /********************************************************************
   *  grid bindable/functions
   ********************************************************************/

  myCollection = [];
  myCurrentEntity = {};
  myGrid = {};

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

  onRowDraw (data, collectionData) {
    if (data) {
      if(data.number>100){
        data.numberColor = "green";
        data.numberFont = "normal";
      } else {
        data.numberColor = "red";
        data.numberFont = "bold";
      }
    }

  }

  loadData() {
    this.myGrid.ctx.setLoadingOverlay(true);
    this.remoteData.getData()
      .then((data)=>{
        this.myGrid.ctx.setData(data);
      })
  }


  singleClick(e){
    console.log("click")
  }


  singleDblClick(e){
    console.log("dblClick")
  }





  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element) {
    //get this element
    this.element = element;



    this.remoteData = new RemoteData('http://data-nodedataapi.rhcloud.com/', 'data/people')

  }

  attached(){
    this.getMaxRows = this.myGrid.ctx.getMaxRows();
    this.loadData();
  }



 

  



}
