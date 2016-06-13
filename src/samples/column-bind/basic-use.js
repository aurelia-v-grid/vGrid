import {dummyDataGenerator} from 'shared/dummyDataGenerator'

export class BasicUse {
  static inject = [dummyDataGenerator];


  //utillity functions
  myGrid = {};
  //current entity, link this to inputs etc
  myCurrentEntity = {};
  //collection to display
  myCollection = [];


  columnSetup = [
    {
      colField: "index"
    }, {
      colField: "name"
    }, {
      colField: "number"
    }, {
      colField: "date"
    }, {
      colField: "bool"
    }, {
      colField: "images"
    }

  ];


  //helper for dummy data
  constructor(dummyDataGenerator) {
    //get this element
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(10000, (data) => {
      this.myCollection = data;
    })

  }


}
