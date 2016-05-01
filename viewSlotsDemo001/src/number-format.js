/**
 * Created by vegar on 5/1/2016.
 */


import numeral from 'numeral';

export class NumberFormatValueConverter {
  toView(value) {
    return numeral(value).format('($0,0.00)');
  }
  fromView(value) {
    return numeral().unformat(value);
  }
}
