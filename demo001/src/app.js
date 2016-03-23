import {inject} from 'aurelia-framework';
import {dummyDataGenerator} from 'data/dummyDataGenerator';

@inject(dummyDataGenerator)
export class App {



  /*******************************************************************
   Grid is made to be controlled by developer, simple as possible atm
   ********************************************************************/
  myCollection = [];
  myCurrentEntity = {};

  rowHeight= 50

  /*******************************************************************
   Constructor
   ********************************************************************/
  constructor(dummyDataGenerator, vc, container, resources) {
    //get my data generator, so its easy to add more
    this.dummyDataGenerator = dummyDataGenerator;

  }
 


  /*******************************************************************
   Test buttons so I can debug, test features
   I have a lot to do here, also need to improve the array aboserver, its kinda simple
   But i these under if you dont mix them in same call until I get more test/and fix it
   ********************************************************************/
  replaceBtn(x) {
    //generate and add
    this.dummyDataGenerator.generateData(x, function (data) {
      this.myCollection = data;
    }.bind(this))
  }

  removeAllBtn() {
    this.myCollection = [];
  }

  addBtn(x) {
    //generate and add
    this.dummyDataGenerator.generateData(x, function (data) {
      data.forEach(function (x) {
        this.myCollection.push(x)
      }.bind(this))
    }.bind(this))
  }

  addOneBtn() {
    this.dummyDataGenerator.generateData(1, function (data) {
      this.myCollection.push(data[0]);
    }.bind(this))
  }

  removeLastBtn() {
    this.myCollection.pop();
  };

  removeFirstBtn() {
    this.myCollection.splice(0, 1);
  };

  removeSecondBtn() {
    this.myCollection.splice(1, 1);
  };

}

