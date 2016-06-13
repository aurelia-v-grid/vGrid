import {dummyDataGenerator} from 'shared/dummyDataGenerator'

export class BasicUse {
  static inject = [dummyDataGenerator];


  //utillity functions
  myGrid = {};
  //current entity, link this to inputs etc
  myCurrentEntity = {};
  //collection to display
  myCollection = [];


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

  singleClick(e) {
    console.log("click")
  }


  singleDblClick(e) {
    console.log("dblClick")
  }

  columnSetup = [
    {
      colField: "index",
      colWidth:80,
      colHeader:"Record",
      colFilter: "index|>=",
      colFilterTop: "index",
      colSort: true,
      colAddFilterAttributes: "v-header-menu='index'",
      colAddRowAttributes : "v-row-menu='index' v-key-move"
    }, {
      colField: "name",
      colWidth:120,
      colHeader:"Full Name",
      colFilterTop: false,
      colFilter: "name|*|onKeyDown",
      colSort: "name",
      colAddFilterAttributes: "v-header-menu='name'",
      colAddRowAttributes: "v-row-menu='name' v-key-move"
    }, {
      colField: "number | numberFormat & updateTrigger:'blur':'paste'",
      colWidth:100,
      colHeader:"Salery",
      colFilter: "number|>=",
      colFilterTop: true,
      colSort: "number",
      colAddFilterAttributes: "v-header-menu='number'",
      colAddRowAttributes: "v-row-menu='number' v-key-move",
      colCss:"color:${tempRef.numberColor};font-weight:${tempRef.numberFont}"
    }, {
      colField: "date | dateFormat & updateTrigger:'blur':'paste'",
      colWidth:100,
      colHeader:"Created",
      colFilter: "date|>|dateFormat",
      colFilterTop: true,
      colSort: "date",
      colAddFilterAttributes: "v-header-menu='date'",
      colAddRowAttributes: "v-row-menu='date' v-key-move"
    }, {
      colField: "bool",
      colWidth:105,
      colHeader:"Booked",
      colFilter: "bool",
      colFilterTop: true,
      colSort: "bool",
      colType: "checkbox",
      colAddFilterAttributes: "v-header-menu='bool'",
      colAddRowAttributes: "v-row-menu='bool' v-key-move"
    }, {
      colField: "images",
      colWidth:107,
      colHeader:"Profil img",
      colType: "image",
      colFilterTop:true,
      colAddFilterAttributes: "v-header-menu='images'",
      colAddRowAttributes: "v-row-menu='images' v-key-move tabindex='0'"
    }

  ];


  //helper for dummy data
  constructor(dummyDataGenerator) {
    //get this element
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(10000, (data) => {
      this.myCollection = data;
    })

  }


}
