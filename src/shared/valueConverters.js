/**
 * Created by vegar on 6/8/2016.
 */

import moment from 'moment';
export class DateFormatValueConverter {
  toView(value) {
    if(value){
      var x = moment(value).format('DD.MM.YYYY');
      return x;
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


import numeral from 'numeral';
export class NumberFormatValueConverter {
  toView(value) {
    if (value) {
      return numeral(value).format('($0,0.00)');
    } else {
      return value;
    }
  }

  fromView(value) {
    if (value) {
      return numeral().unformat(value);
    } else {
      return value;
    }
  }
}
