/*****************************************************************************************************************
 *    vGridInterpolate
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridInterpolate {
  constructor() {
  }
  parse() {
  }
  interpolate(str) {
    return function interpolate(o) {
      return str.replace(/{{([^{}]*)}}/g, function (a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    }
  }
  render(string, object) {
    return this.interpolate(string)(object);
  }
}
