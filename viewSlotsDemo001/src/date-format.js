/**
 * Created by vegar on 5/1/2016.
 */
import moment from 'moment';

export class DateFormatValueConverter {
  toView(value) {
    if(value){
      return moment(value).format('DD.MM.YYYY');
    } else {
      return value;
    }

  }
  fromView(value) {
    if(value){
      return new Date(moment(value,'DD.MM.YYYY')._d);
    } else {
      return value;
    }
  }
}

