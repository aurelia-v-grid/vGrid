import {dummyDataGenerator} from 'shared/dummyDataGenerator'

export class BasicUse {
  static inject = [dummyDataGenerator];


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
    //get this element
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(10000, (data) => {
      this.myCollection = data;
    });

    this.context = this;
    this.showOnlySelected = false;

  }


}
