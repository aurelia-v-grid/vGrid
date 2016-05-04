/**
 * Created by vegar on 5/1/2016.
 */


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
