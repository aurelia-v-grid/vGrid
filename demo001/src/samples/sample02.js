import {dummyDataGenerator} from 'data/dummyDataGenerator'

export class sample {
  static inject = [dummyDataGenerator];

  constructor(element, dummyDataGenerator) {

    //save dummygenerator
    this.dummyDataGenerator = dummyDataGenerator;

    //add 100 to start with
    this.dummyDataGenerator.generateData(100, (data) => {
      this.myCollection = data;
    });
  }

  replaceBtn(x) {
    //reset internal counter
    this.dummyDataGenerator.reset();
    //generate and add
    this.dummyDataGenerator.generateData(x, (data) => {
      this.myCollection = data;
    })
  }

  addBtn(x) {
    //generate and add
    this.dummyDataGenerator.generateData(x, (data) => {
      data.forEach((x) => {
        this.myCollection.push(x)
      })
    })
  }

}
