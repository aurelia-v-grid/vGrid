export class KeepAsNumberValueConverter {
  toView(value) {
    if (value) {
      return value;
    } else {
      return value;
    }
  }

  fromView(value) {
    if (value) {
      let check = value * 1;
      if(isNaN(check)){
        return value;
      } else {
        return value * 1;
      }
      
    } else {
      return value;
    }
  }
}