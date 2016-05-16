import {dummyDataGenerator} from 'data/dummyDataGenerator'


export class sample01 {
  static inject = [Element, dummyDataGenerator];


  /********************************************************************
   *  grid bindleable/functions
   ********************************************************************/

  myCollection = [];
  myCurrentEntity = {};
  myGrid = {};


  onRowDraw (data, collectionData) {
    if (data) {
      if(data.number>100){
        data.numberColor = "green";
        data.numberFont = "normal";
      } else {
        data.numberColor = "red";
        data.numberFont = "bold";
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


  /********************************************************************
   * attached
   ********************************************************************/
  attached(){
    this.getMaxRows = this.myGrid.ctx.getMaxRows();
  }



  /********************************************************************
   *  edit mode
   ********************************************************************/

  lockStatus = "locked";
  lockColor = "red";

  editMode(){

    if(this.lockStatus ==="locked" ){
      this.lockStatus = "unlocked";
      this.lockColor = "green";
      this.myGrid.ctx.setEditMode(true)
    }else {
      this.lockStatus = "locked";
      this.lockColor = "red";
      this.myGrid.ctx.setEditMode(false)
    }

  }



  /********************************************************************
   *  COLLECTION MOD BUTTONS
   ********************************************************************/

  replaceBtn(x) {
    //generate and add
    this.dummyDataGenerator.reset();
    this.dummyDataGenerator.generateData(x, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    })
  }

  addBtn(x, scrollBottom) {
    //generate and add
    this.dummyDataGenerator.generateData(x, (data) => {
      data.forEach((x) => {
        this.myCollection.push(x)
      })
      if(scrollBottom){
        this.myGrid.ctx.scrollBottomNext();
      }

      this.collectionLength = this.myCollection.length;
    })
  }


  insertOneBtn(){
    try {
      this.dummyDataGenerator.generateData(1, (data) => {
        this.myCollection.splice(2, 0, data[0])
      });
    } catch (e){
      console.log(e)
    }
  }

  insertFiveBtn(){
    try {
      for(var i = 0; i < 5; i++){
        this.dummyDataGenerator.generateData(1, (data) => {
          this.myCollection.splice(2, 0, data[0])
        });
      }
    } catch (e){
      console.log(e)
    }
  }


  removeFirstBtn() {
    this.myCollection.splice(0, 1);
    this.collectionLength = this.myCollection.length;
  }

  removeLastBtn() {
    this.myCollection.pop();
    this.collectionLength = this.myCollection.length;
  }

  removeFirstxBtn(x) {
    this.myCollection.splice(0, x);
    this.collectionLength = this.myCollection.length;

  }


  removeLastxBtn(x) {
    this.myCollection.splice(this.myCollection.length - x, x);
    this.collectionLength = this.myCollection.length;

  }

  miscBtn(){
    this.myCollection.pop();

    this.myCollection.splice(2, 2);

    this.myCollection.splice(4, 2);

    this.dummyDataGenerator.generateData(2, (data) => {
      this.myCollection.push(data[0]);
      this.myCollection.push(data[1]);
    });

  }


  /********************************************************************
   *  save/load state & report btn
   ********************************************************************/

  oldState= null;

  saveStateBtn(){
    this.oldState = this.myGrid.ctx.getColumns(this.oldState);
  }

  loadStateBtn(){
    if(this.oldState){
      this.myGrid.ctx.setColumns(this.oldState);
      this.myGrid.ctx.rebuildColumns();
    }

  }

  switchNameBtn(){
    let oldState = this.myGrid.ctx.getColumns(this.oldState);
    let oldIndex= oldState.colAttrArray.indexOf("name");
    let newIndex= oldState.colAttrArray.indexOf("color");


    oldState.colAttrArray[oldIndex] = "color";
    oldState.colAttrArray[newIndex] = "name";

    oldState.colHeaderArray[oldIndex] = "Color";
    oldState.colHeaderArray[newIndex] = "Name";


    this.myGrid.ctx.setColumns(oldState);
    this.myGrid.ctx.rebuildColumns();

  }


  report(){
    this.myGrid.ctx.createReport()
  }




}
