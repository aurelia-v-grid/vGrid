/**
 * Created by vegar on 5/1/2016.
 */
import moment from 'moment';

export class DateFormatValueConverter {
  toView(value) {
    return moment(value).format('DD.MM.YYYY');
  }
  fromView(value) {
    return moment(value,'DD.MM.YYYY');
  }
}

