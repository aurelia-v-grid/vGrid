import {dummyDataGenerator} from 'shared/dummyDataGenerator'

export class BasicUse {
  static inject = [dummyDataGenerator];


  //utillity functions
  myGrid = {};
  //current entity, link this to inputs etc
  myCurrentEntity = {};
  //collection to display
  myCollection = [];




  //helper for dummy data
  constructor(dummyDataGenerator) {
    //get this element
    for (let i = 0; i < 1000; i++) {
      this.myCollection.push({ id: i, title: `item ${i+1}`, isSelected: false });
    }

    this.context = this;
    this.showOnlySelected = false;

  }


}


export class SelectedValueConverter {
  toView(array, selectedProperty, isActive) {
    if (array) {
      if (isActive) {
        return array.filter(item => {
          return item.isSelected;


        });
      } else {
        return array;
      }
    }
  }
}
