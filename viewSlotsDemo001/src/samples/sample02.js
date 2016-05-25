import {dummyDataGenerator} from 'data/dummyDataGenerator'


export class sample01 {
  static inject = [Element, dummyDataGenerator];



  myCollection = [];
  myCurrentEntity = {};
  myGrid = {};




  editClickBtn(e){
    e.editable = true;
  }
  
  saveClickBtn(e){
    e.editable = false;
    e.currentEntityRef.name = e.name;
    e.currentEntityRef.country = e.country;
    
  }
  cancelClickBtn(e){
    e.editable = false;
    e.name = e.currentEntityRef.name;
    e.country = e.currentEntityRef.country;
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

  sortBy(x){

    this.myGrid.ctx.setSorting({
      attribute: x,
      asc: true
    }, false);

    //run filter
    this.myGrid.ctx.runSorting();

    //update grid
    this.myGrid.ctx.collectionChange();
  }


  filter(x){
    if(x== "all") {
      this.myGrid.ctx.runFilter([]);
    }
    if(x== "germany") {
      this.myGrid.ctx.runFilter([{attribute:"country", value:"germany", operator:"*"}]);
    }
    if(x== "norway") {
      this.myGrid.ctx.runFilter([{attribute:"country", value:"norway", operator:"*"}]);
    }
  }



}
