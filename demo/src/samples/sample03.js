import {dummyDataGenerator} from 'data/dummyDataGenerator'


export class sample03 {
  static inject = [Element, dummyDataGenerator];

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




  collectionLength= 0;

  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element, dummyDataGenerator) {
    //get this element
    this.element = element;

    //this if just for giving us some data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(10000, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    });

  }

  attached(){
    this.getMaxRows = this.myGrid.ctx.getMaxRows();

  }




}
