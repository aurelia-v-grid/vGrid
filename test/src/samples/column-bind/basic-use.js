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
      attribute: "index"
    }, {
      attribute: "name"
    }, {
      attribute: "number"
    }, {
      attribute: "date"
    }, {
      attribute: "bool"
    }, {
      attribute: "images"
    }

  ]


  //helper for dummy data
  constructor(dummyDataGenerator) {
    //get this element
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(10000, (data) => {
      this.myCollection = data;
    })

  }


}
