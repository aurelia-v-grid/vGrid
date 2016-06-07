import {RemoteData} from 'remote/remoteData'


export class sample04 {
  static inject = [Element];

  /********************************************************************
   *  grid bindable/functions
   ********************************************************************/

  myCollection = [];
  myCurrentEntity = {};
  myGrid = {};

  get filteredRows(){
    if(this.myGrid.ctx){
      return this.myGrid.ctx.vGridCollectionFiltered.length
    } else {
      return 0;
    }
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


  singleClick(e){
    console.log("click")
  }


  singleDblClick(e){
    console.log("dblClick")
  }

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


  collectionLength= 0;

  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element) {
    //get this element
    this.element = element;

    this.remoteData = new RemoteData('http://data-nodedataapi.rhcloud.com/', 'data/people')

    //this if just for giving us some data


  }

  attached(){
    this.getMaxRows = this.myGrid.ctx.getMaxRows();
    this.loadData();
  }




}
