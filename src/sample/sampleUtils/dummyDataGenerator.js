import * as internalDataArray from './dummyData.json!json';

export class DummyDataGenerator {


totalGenerated = 0;

constructor(){
  // transform json object to an array
  this.internalDataArray = Object.keys(internalDataArray).map(function(k) { return internalDataArray[k] });

  this.index = [];
  this.name = [];
  this.first = [];
  this.last = [];
  this.images = [];
  this.expanded = [];
  this.guid = [];
  this.integer = [];
  this.shortText = [];
  this.expanded = [];
  this.date = [];
  this.shortText = [];
  this.mediumText = [];
  this.longText = [];
  this.address = [];
  this.guid = [];
  this.city = [];
  this.state = [];
  this.zip = [];
  this.country = [];
  this.email = [];
  this.phone = [];
  this.color = [];
  this.number = [];
  this.bool = [];


  for(let i = 0; i < this.internalDataArray.length;i++){
    this.index.push(this.internalDataArray[i].index);
    this.name.push(this.internalDataArray[i].name);
    this.first.push(this.internalDataArray[i].first);
    this.last.push(this.internalDataArray[i].last);
    this.images.push(this.internalDataArray[i].image);
    this.expanded.push(this.internalDataArray[i].expanded);
    this.guid.push(this.internalDataArray[i].guid);
    this.integer.push(this.internalDataArray[i].integer);
    this.shortText.push(this.internalDataArray[i].shortText);
    this.expanded.push(this.internalDataArray[i].expanded);
    this.date.push(new Date(this.internalDataArray[i].date));
    this.shortText.push(this.internalDataArray[i].shortText);
    this.mediumText.push(this.internalDataArray[i].mediumText);
    this.longText.push(this.internalDataArray[i].longText);
    this.address.push(this.internalDataArray[i].address);
    this.guid.push(this.internalDataArray[i].guid);
    this.city.push(this.internalDataArray[i].city);
    this.state.push(this.internalDataArray[i].state);
    this.zip.push(this.internalDataArray[i].zip);
    this.country.push(this.internalDataArray[i].country);
    this.email.push(this.internalDataArray[i].email);
    this.phone.push(this.internalDataArray[i].phone);
    this.color.push(this.internalDataArray[i].color);
    this.number.push(1*((Math.floor(Math.random() * 500) + 0) +"."+(Math.floor(Math.random() * 500) + 0)));
  }
}

  reset(){
    this.totalGenerated = 0;
  }


generateData(number, callback){

  let dummyArray = [];
  for(let i = 0; i < number;i++){
    //up count
    this.totalGenerated++;
    let random1 = Math.floor(Math.random() * 500) + 0;
    let random2 = Math.floor(Math.random() * 500) + 0;
    let random3 = Math.floor(Math.random() * 500) + 0;
    let random4 = Math.floor(Math.random() * 500) + 0;
    let random5 = Math.floor(Math.random() * 500) + 0;

    let x = "high"
    if(random2 > 50){
      x = "very low"
    }
    if(random2 > 100){
      x = "low"
    }
    if(random2 > 250){
      x = "normal"
    }
    if(random2 > 400){
      x = "high"
    }

    dummyArray.push({
      "index": 1*this.totalGenerated,
      "name": this.first[random4] +" "+this.last[random3],
      "first": this.first[random4],
      "last": this.last[random3],
      "images": this.images[random4],
      "expanded": this.expanded[random5],
      "guid": this.guid[random1],
      "integer": this.integer[random2],
      "date": this.date[random3],
      "shortText": this.shortText[random4],
      "mediumText": this.mediumText[random5],
      "longText": this.longText[random1],
      "address": this.address[random2],
      "city": this.city[random2],
      "state": this.state[random4],
      "zip": this.zip[random5],
      "country": this.country[random1],
      "email": this.email[random2],
      "phone": this.phone[random3],
      "color": this.color[random4],
      "number": 1*this.number[random4],
      "bool": random1 % 3 ? true : false,
      "gender":random1 % 2 === 0 ? "male" : "female",
      "high":x
    });
  }

  callback(dummyArray);



}



//tok it from a polymer sample resonse data
//https://elements.polymer-project.org/elements/iron-list?view=demo:demo/selection.html&active=iron-list
}
