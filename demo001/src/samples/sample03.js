import {dummyDataGenerator} from 'data/dummyDataGenerator'


export class sample01 {
  static inject = [Element, dummyDataGenerator];


  myCollection = [];
  myCurrentEntity = {};
  myGrid = {};

  onRowDraw(data) {

  }

  onDblClick(row) {

  }

  selectAll (){
    var allRowsArray = this.myGrid.ctx.getGridRows();
    this.myGrid.ctx.selection.selectRange(0, allRowsArray.length-1);
    this.myGrid.ctx.updateSelectionOnAllRows();
  }


  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element, dummyDataGenerator) {
    //get this element
    this.element = element;

    //this if just for giving us some data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(100, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    });


  }


  attached() {
    console.log("attached")
  }
}
