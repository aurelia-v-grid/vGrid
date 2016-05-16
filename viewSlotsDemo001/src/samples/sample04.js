import {dummyDataGenerator} from 'data/dummyDataGenerator'


export class sample01 {
  static inject = [Element, dummyDataGenerator];



  myCollection = [{name:"person1", age:20},{name:"person4", age:19},{name:"person3", age:25}];
  myCurrentEntity = {};   //current entity you link to inputs etc
  myGrid = {};



}
