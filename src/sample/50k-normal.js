import {GridConnector} from "aurelia-v-grid";
import {DataSource} from "aurelia-v-grid";
import {Selection} from "aurelia-v-grid";

import {DummyDataGenerator} from "./sampleUtils/dummyDataGenerator";

export class App {
  static inject = [DummyDataGenerator];

  constructor(dummyDataGenerator){
    
    //dummy data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(50000, (data) => {
        this.myCollection = data;
      });

    this.hidden = false;
    this.height = 600;
    //datasource
    this.ds = new DataSource(new Selection("multiple"));

    //grid connector is the one you connect to the grid
    this.gridConnector = new GridConnector(this.ds);

    //set data to our datasource
    this.ds.setArray(this.myCollection);

  }  

  attached(){
    
    
    
  }

  group(){

    console.time("group");
    this.ds.group(["country", "gender", "high"])
    console.timeEnd("group");
  }

  collapse(){
    console.time("fullCollapse");
    this.ds.groupCollapse()
    console.timeEnd("fullCollapse");
  }

  expand(){
    console.time("fullExpand");
    this.ds.groupExpand()
    console.timeEnd("fullExpand");
  }

  clickMe(x){
    console.log(x)
  }
  

 addblank(){
    this.ds.addElement()
  }

  show(){
    this.hidden = false;
  }

  hide(){
    this.hidden = true;
  }

}

