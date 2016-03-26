import {dummyDataGenerator} from 'data/dummyDataGenerator'
import hljs from 'highlight.js';
import 'highlight.js/styles/ir-black.css!';

export class sample01 {
  static inject = [Element, dummyDataGenerator];


  myCollection = [];
  myCurrentEntity = {};
  myGrid = {
};


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
    });

  }



  /********************************************************************
   * attribute buttons
   ********************************************************************/

  rowHeightBtn(x) {
    this.myGrid.ctx.setRowHeight(x)
  }



  headerHeightBtn(x) {
    this.myGrid.ctx.setHeaderHeight(x)
  }



  footerHeightBtn(x) {
    this.myGrid.ctx.setFooterHeight(x)
  }




  selectionBtn(x){
    switch(x){
      case 0:
        this.myGrid.ctx.selection.reset();
        this.myGrid.ctx.disableSelection(x);
        break;
      case 1:
        this.myGrid.ctx.selection.reset();
        this.myGrid.ctx.setSingleSelection(x);
        break;
      case 2:
        this.myGrid.ctx.selection.reset();
        this.myGrid.ctx.setMultiSelection(x);
        break;
    }
  }

  sortableBtn(x){
    switch(x){
      case 0:
        this.headerHeightBtn(50)
        this.myGrid.ctx.disableSortableColumns()
        break;
      case 1:
        this.headerHeightBtn(50)
        this.myGrid.ctx.enableSortableColumns()
        break;
    
    }
  }











  /********************************************************************
   * attached
   ********************************************************************/
  attached() {

    let html =
      `- This is really a test for me to test internal function you can access in in the grid-context, 
  this way I know that redraw etc works also
- In the button  <row-height="25"> I call: this.myGrid.ctx.setRowHeight(50) etc etc
- there will be a lot of weird stuff on this sample page

<v-grid

  style="position:absolute;top:25px;bottom:25px;right: 25px;left:25px"
  config="current-entity.bind:myCurrentEntity; collection.bind:myCollection; grid-context.bind:myGrid">

  <v-grid-row>
    <v-grid-col attribute="index" header="Index"></v-grid-col>
    <v-grid-col attribute="name" header="Name"></v-grid-col>
    <v-grid-col attribute="country" header="Country"></v-grid-col>
    <v-grid-col attribute="email" header="Email"></v-grid-col>
    <v-grid-col attribute="phone" header="Phone"></v-grid-col>
    <v-grid-col attribute="color" header="Color"></v-grid-col>
  </v-grid-row>
  
</v-grid>
`

    //create dummy html text area to encode html
    var txtArea = document.createElement("TEXTAREA");
    txtArea.innerHTML = html;

    //get code block and add text
    var myCodeBlock = this.element.getElementsByTagName("PRE")[0]
    myCodeBlock.innerHTML = txtArea.innerHTML//encode..
    //highlight it
    hljs.highlightBlock(myCodeBlock);
  }




}
