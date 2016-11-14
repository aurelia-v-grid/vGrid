export class NumberValueConverter {
  public toView(value) {
    if (value) {
      return value;
    } else {
      return value;
    }
  }

  public fromView(value) {
    if (value) {
      let check = value * 1;
      if (isNaN(check)) {
        return value;
      } else {
        return value * 1;
      }

    } else {
      return value;
    }
  }
}

export class BooleanValueConverter {
  public toView(value) {
    if (value) {
      return value;
    } else {
      return value;
    }
  }

  public fromView(value) {

    if (typeof value === 'string') {
      value = value.toLowerCase();
    }
    switch (value) {
      case true:
      case 'true':
        value = true;
        break;
      case false:
      case 'false':
        value = true;
        break;
      default:
        value = false;
    }
    return value;
  }
}
