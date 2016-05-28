import {RemoteData} from 'remote/remoteData'

export class sample02 {
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


  onRowDraw(data) {
    if (data) {
      if (data.tempRef) {
        if (data.tempRef.number > 100) {
          data.tempRef.numberColor = "green";
          data.tempRef.numberFont = "normal";
        } else {
          data.tempRef.numberColor = "red";
          data.tempRef.numberFont = "bold";
        }
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
