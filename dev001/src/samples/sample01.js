import {dummyDataGenerator} from 'data/dummyDataGenerator'
import {inject, noView, ViewCompiler, ViewSlot, Container, ViewResources} from 'aurelia-framework';
import 'jquery';
import { datepicker } from 'jquery-ui';
@inject(Element, dummyDataGenerator, ViewCompiler, Container, ViewResources)
export class sample01 {



  myCollection = [];
  myCurrentEntity = {};
  myGrid = {

  };

  onRowDraw (data, collectionData) {
    if (data) {
      if (data.country === "Angola") {
        data.myCustomColor = "rgba(150,72,230, 0.3)"
      }
      data.date = this.formatDate(data.date)
      data.number = Math.round(data.number)
    }
  }

  selectedDate = new Date();

  onCellDraw (data) {
    if (data) {

      //single click on a image, or another cell..
      if (data.attributeName === "date") {








      }
    }
  }



  onDblClick (row) {
    console.log("dblclick row:"+row)
  }

  formatDate (date){
    var lengthCheck = (x) =>{
      if(x.toString().length === 1){
        return "0"+x;
      } else {
        return x;
      }
    };

    var dateObj = new Date(date);
    var newDate =[];
    newDate[0] = lengthCheck(dateObj.getDate());
    newDate[1] = lengthCheck(dateObj.getMonth()+1);
    newDate[2] = lengthCheck(dateObj.getFullYear());
    return newDate.join(".")
  };

  myFormatHandler(type, obj){

    //very silly, but more to show the callback
    if(type === "afterEdit"){
      console.log("afterEdit")
      if(obj.attribute === "date"){
        var date = new Date(obj.oldValue);
        if(obj.value.length === 10){
          var newdate = obj.value.split(".");
          date.setDate(newdate[0]);
          date.setMonth(newdate[1]-1);
          date.setYear(newdate[2]);
          try{
            obj.value = date.toISOString();
          } catch(e){
            obj.value = obj.oldValue
          }
        } else {
          obj.value = obj.oldValue
        }
      }


      return obj;
    }

    if(type === "onFilter"){

      obj.forEach((x) => {
        if(x.attribute === "date"){
          //if date
          if(x.value.length === 10){
            //if it have full length I know I need to be sure I can convert it into date
            var tempdate = new Date();
            var newdate = x.value.split(".");
            tempdate.setDate(newdate[0]);
            tempdate.setMonth(newdate[1]-1);
            tempdate.setYear(newdate[2]);
            tempdate.setHours(0);
            tempdate.setMinutes(0);
            tempdate.setSeconds(0);
            tempdate.setMilliseconds(0);
            x.value = tempdate.toISOString();
          } else {
            x.value ="";
          }
        }
      });

      return obj;
    }



    if(type === "beforeEdit"){
      console.log("beforeEdit")
      if(obj.attribute === "number"){
        obj.newValue = obj.oldValue;
      }
      //if adding checkbox
       if(obj.attribute === "date"){
         obj.element.disabled = false;
         obj.element.style.position = "relative"
         obj.element.style["z-index"] = "9000"
         $(obj.element).datepicker()
         $(obj.element).datepicker("show")

       }
      return obj;
    }
  }


  collectionLength= 0;

  /********************************************************************
   * Constructor
   ********************************************************************/
  constructor(element, dummyDataGenerator, vc, vs, container, resources) {
    //get this element
    this.element = element;
    this.viewCompiler = vc;
    this.viewSlot = vs;
    this.container = container;
    this.resources = resources;

    //this if just for giving us some data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(100, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    });

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
   * GRID-CONTEXT BUTTONS
   ********************************************************************/

  status = {
    header50: "lightgrey",
    row50: "lightgrey",
    footer0:"lightgrey",
    sortable1:"lightgrey",
    resize1 : "lightgrey",
    multiSelect: "lightgrey",
    locked0: "lightgrey",
    filter1: "lightgrey",
    filterAt1: "lightgrey",
    sort1:"lightgrey"



  };

  rowHeightBtn(x) {

    this.myGrid.ctx.setRowHeight(x);
    this.status.row25 = "";
    this.status.row50 = "";
    this.status.row75 = "";
    this.status.row100 = "";

    switch(x){
      case 25:
        this.status.row25 = "lightgrey";
        break;
      case 50:
        this.status.row50 = "lightgrey";
        break;
      case 75:
        this.status.row75 = "lightgrey";
        break;
      case 100:
        this.status.row100 = "lightgrey";
        break;
    }
  }



  headerHeightBtn(x) {
    this.myGrid.ctx.setHeaderHeight(x)
    this.status.header0 = "";
    this.status.header25 = "";
    this.status.header50 = "";
    this.status.header75 = "";

    switch(x){
      case 0:
        this.status.header0 = "lightgrey";
        break;
      case 25:
        this.status.header25 = "lightgrey";
        break;
      case 50:
        this.status.header50 = "lightgrey";
        break;
      case 75:
        this.status.header75 = "lightgrey";
        break;
    }
  }



  footerHeightBtn(x) {
    this.myGrid.ctx.setFooterHeight(x)
    this.status.footer0 = "";
    this.status.footer25 = "";
    this.status.footer50 = "";
    this.status.footer75 = "";

    switch(x){
      case 0:
        this.status.footer0 = "lightgrey";
        break;
      case 25:
        this.status.footer25 = "lightgrey";
        break;
      case 50:
        this.status.footer50 = "lightgrey";
        break;
      case 75:
        this.status.footer75 = "lightgrey";
        break;
    }
  }




  selectionBtn(x){

    this.status.noSelect = "";
    this.status.singleSelect = "";
    this.status.multiSelect = "";

    switch(x){
      case 0:
        this.myGrid.ctx.selection.reset();
        this.myGrid.ctx.disableSelection();
        this.status.noSelect = "lightgrey";
        break;
      case 1:
        this.myGrid.ctx.selection.reset();
        this.myGrid.ctx.setSingleSelection();
        this.status.singleSelect = "lightgrey";
        break;
      case 2:
        this.myGrid.ctx.selection.reset();
        this.myGrid.ctx.setMultiSelection();
        this.status.multiSelect = "lightgrey";
        break;
    }
  }

  sortableBtn(x){

    this.status.sortable0 = "";
    this.status.sortable1 = "";
    switch(x){
      case 0:
        this.headerHeightBtn(50);
        this.myGrid.ctx.disableSortableColumns();
        this.status.sortable0 = "lightgrey";
        break;
      case 1:
        this.headerHeightBtn(50);
        this.myGrid.ctx.enableSortableColumns();
        this.status.sortable1 = "lightgrey";
        break;

    }
  }

  resizeBtn(x){
    this.status.resize0 = "";
    this.status.resize1 = "";
    this.status.resize2 = "";
    switch(x){
      case 0:
        this.headerHeightBtn(50);
        this.myGrid.ctx.enableResizableColumns();
        this.status.resize0 = "lightgrey";
        break;
      case 1:
        this.headerHeightBtn(50);
        this.myGrid.ctx.enableResizableColumns(true);
        this.status.resize1 = "lightgrey";
        break;
      case 2:
        this.headerHeightBtn(50);
        this.myGrid.ctx.disableResizableColumns();
        this.status.resize2 = "lightgrey";
        break;

    }
  }

  lockedBtn(x){
    this.status.locked0 = "";
    this.status.locked1 = "";
    this.status.locked2 = "";
    this.status.locked3 = "";
    switch(x){
      case 0:
        this.myGrid.ctx.setLockedColumns(0);
        this.status.locked0 = "lightgrey";
        break;
      case 1:
        this.myGrid.ctx.setLockedColumns(1);
        this.status.locked1 = "lightgrey";
        break;
      case 2:
        this.myGrid.ctx.setLockedColumns(2);
        this.status.locked2 = "lightgrey";
        break;
      case 3:
        this.myGrid.ctx.setLockedColumns(3);
        this.status.locked3 = "lightgrey";
        break;

    }
  }

  setFilterBtn(x){

  this.status.filter0 = "";
  this.status.filter1 = "";
  switch(x){
    case 0:
      this.headerHeightBtn(50);
      this.myGrid.ctx.disableHeaderFilter();
      this.status.filter0 = "lightgrey";
      break;
    case 1:
      this.headerHeightBtn(50);
      this.myGrid.ctx.enableHeaderFilter();
      this.status.filter1 = "lightgrey";
      break;
  }
}
  setFilterAtBtn(x){

    this.status.filterAt0 = "";
    this.status.filterAt1 = "";
    switch(x){
      case 0:
        this.myGrid.ctx.setHeaderFilterAtBottom();
        this.status.filterAt0 = "lightgrey";
        break;
      case 1:
        this.myGrid.ctx.setHeaderFilterAtTop();
        this.status.filterAt1 = "lightgrey";
        break;
    }
  }

  setSortBtn(x){

    this.status.sort0 = "";
    this.status.sort1 = "";
    switch(x){
      case 0:
        this.myGrid.ctx.disableHeaderSort();
        this.status.sort0 = "lightgrey";
        break;
      case 1:
        this.myGrid.ctx.enableHeaderSort();
        this.status.sort1 = "lightgrey";
        break;
    }
  }






}
