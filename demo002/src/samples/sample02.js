import {dummyDataGenerator} from 'data/dummyDataGenerator'
import hljs from 'highlight.js';
import 'highlight.js/styles/ir-black.css!';

export class sample01 {
  static inject = [Element, dummyDataGenerator];


  myCollection = [];
  myCurrentEntity = {};
  myGrid = {
    onRowDraw:function(data){
      if(data){
        if(data.country === "Angola"){
          data.myCustomColor = "rgba(150,72,230, 0.3)"
        }
      }
    }
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
   *  buttons
   ********************************************************************/

  replaceBtn(x) {
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

  removeFirstBtn(){
    this.myCollection.splice(0, 1);
  }

  removeLastBtn(){
    this.myCollection.pop();
  }

  removeFirst100Btn(){
    this.myCollection.splice(0, 100);

  }


  removeLast100Btn(){
    this.myCollection.splice(this.myCollection.length-100, 100);

  }




  /********************************************************************
   * attached
   ********************************************************************/
  attached() {

    let javascript =
          `
myCollection = [];
myCurrentEntity = {};
myGrid = {
  onRowDraw:function(data){
    if(data){
      if(data.country === "Angola"){
          data.myCustomColor = "rgba(150,72,230, 0.3)"
      }
    }
  }
};
    `


    let html =`
<v-grid
  style="position:absolute;top:50px;bottom:0px;right: 25px;left:25px"
  row-height="25"
  header-height="50"
  resizable-headers="true"
  sortable-headers="true"
  sort-on-header-click="true"
  header-filter="true"
  header-filter-onkeydown="true"
  header-filter-not-to="phone"
  header-filter-top="true"
  multi-select="true"
  locked-columns="1"
  config="current-entity.bind:myCurrentEntity; collection.bind:myCollection ">
  <v-grid-row>
    <v-grid-col col-width="160" attribute="index"   header="Index"    default-filter=">=" read-only="true"                                    ></v-grid-col>
    <v-grid-col col-width="150" attribute="name"    header="Name"     default-filter="*="                  col-css="color: {{myCustomColor}}" ></v-grid-col>
    <v-grid-col col-width="160" attribute="country" header="Country"  default-filter="="                                                      ></v-grid-col>
    <v-grid-col col-width="180" attribute="email"   header="Email"    default-filter="*"                                                      ></v-grid-col>
    <v-grid-col col-width="160" attribute="color"   header="Color"    default-filter="=*"                  col-css="color: {{color}}"         ></v-grid-col>
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
    
    
    //create dummy html text area to encode html

    txtArea.innerHTML = javascript;

    //get code block and add text
    var myCodeBlock = this.element.getElementsByTagName("PRE")[1]
    myCodeBlock.innerHTML = txtArea.innerHTML//encode..
    //highlight it
    hljs.highlightBlock(myCodeBlock);
  }




}
