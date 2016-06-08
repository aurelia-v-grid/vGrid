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
      attribute: "index",
      width:80,
      header:"Record",
      filter: "index|>=",
      filterOperator: ">",
      filterTop: "index",
      sort: true,
      attributeFilter: "v-header-menu='index'",
      attributeRow: "v-row-menu='index' v-key-move"
    }, {
      attribute: "name",
      width:120,
      header:"Full Name",
      filterTop: false,
      filter: "name|*|onKeyDown",
      sort: "name",
      attributeFilter: "v-header-menu='name'",
      attributeRow: "v-row-menu='name' v-key-move"
    }, {
      attribute: "number | numberFormat & updateTrigger:'blur':'paste'",
      width:100,
      header:"Salery",
      filter: "number|>=",
      filterTop: true,
      sort: "number",
      attributeFilter: "v-header-menu='number'",
      attributeRow: "v-row-menu='number' v-key-move",
      css:"color:${tempRef.numberColor};font-weight:${tempRef.numberFont}"
    }, {
      attribute: "date | dateFormat & updateTrigger:'blur':'paste'",
      width:100,
      header:"Created",
      filter: "date|>|dateFormat",
      filterTop: true,
      sort: "date",
      attributeFilter: "v-header-menu='date'",
      attributeRow: "v-row-menu='date' v-key-move"
    }, {
      attribute: "bool",
      width:105,
      header:"Booked",
      filter: "bool",
      filterTop: true,
      sort: "bool",
      type: "checkbox",
      attributeFilter: "v-header-menu='bool'",
      attributeRow: "v-row-menu='bool' v-key-move"
    }, {
      attribute: "images",
      width:107,
      header:"Profil img",
      type: "image",
      attributeFilter: "v-header-menu='images'",
      attributeRow: "v-row-menu='images' v-key-move tabindex='0'"
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
