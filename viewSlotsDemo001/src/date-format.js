/**
 * Created by vegar on 5/1/2016.
 */
import moment from 'moment';

export class DateFormatValueConverter {
  toView(value) {
    if(value){
      return moment(value).format('YYYY-MM-DD');
    } else {
      return value;
    }

  }
  fromView(value) {
    if(value){
      return new Date(moment(value,'YYYY-MM-DD')._d);
    } else {
      return value;
    }
  }
}

