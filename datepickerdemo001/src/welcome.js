//import {computedFrom} from 'aurelia-framework';
import {dummyDataGenerator} from 'data/dummyDataGenerator'

export class Welcome {
  static inject = [dummyDataGenerator];
  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;
  myCurrentEntity = {}
  gridContext = {}
  myCollection = [];


onRowDraw (data, collectionData) {
    if (data) {
      var MyDate = new Date(data.date);
      data.date = ('0' + MyDate.getDate()).slice(-2) + '.' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '.' + MyDate.getFullYear();

    }
  }



myFormatHandler(type, obj){
  if(type === "beforeEdit" && obj.attribute === "date"){
          $(obj.element).pickadate({
            container:document.querySelector(".page-host"),
            format:"dd.mm.yyyy",
            labelMonthNext: 'Next month',
            labelMonthPrev: 'Previous month',
            labelMonthSelect: 'Select a month',
            labelYearSelect: 'Select a year',
            monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
            monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
            weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
            weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
            today: 'Today',
            clear: 'Clear',
            close: 'Close'
          });
      }


   if(type === "afterEdit" && obj.attribute === "date"){
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
   }


  return obj;
}

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  constructor(dummyDataGenerator) {

    //this if just for giving us some data
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(1000, (data) => {
      this.myCollection = data;
      this.collectionLength = this.myCollection.length;
    });

  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
