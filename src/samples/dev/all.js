import {RemoteData} from 'shared/remoteData'

export class BasicUse {


  //utillity functions
  myGrid = {};
  //current entity, link this to inputs etc
  myCurrentEntity = {};
  //collection to display
  myCollection = [];


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

  singleClick(e) {
    console.log("click")
  }


  singleDblClick(e) {
    console.log("dblClick")
  }



  //helper for dummy data
  constructor(dummyDataGenerator) {
    this.remoteData = new RemoteData('http://vgriddummydata-nodedataapi.rhcloud.com/', 'data/people');
    this.context = this;
  }



  attached(){
    this.loadData();
  }


  remotePagerEvent(e){
    console.log(e)
  }


  myLang={
    menuMainHeaderOptions:"dine valg",
    pagerBtnNext:"neste",
    pagerStringOf:"#"
  };


  loadData() {
    this.myGrid.ctx.setLoadingOverlay(true);
    this.remoteData.setLimit(40);
    this.remoteData.setOffset(0);
    this.remoteData.getData()
      .then((data)=>{
        this.myGrid.ctx.setData(data);
      })
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






}
