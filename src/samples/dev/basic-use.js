import {dummyDataGenerator} from 'shared/dummyDataGenerator'

export class BasicUse {
  static inject = [dummyDataGenerator];


  //utillity functions
  myGrid = {};
  //current entity, link this to inputs etc
  myCurrentEntity = {};
  //collection to display
  myCollection = [];


  collectionChange(e){
    console.log(e)
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

  showSelectedBtn(){
    this.myGrid.ctx.showOnlySelected();

  }

  showAll(){
    this.myGrid.ctx.showSelectedAndNotSelected();
  }

  showOnlyNotSelected(){
    this.myGrid.ctx.showOnlyNotSelected();
  }


}
