/*****************************************************************************************************************
 *    vGridInterpolate
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridInterpolate {
  constructor() {
  }
  attributes = [];
  parse(string) {
    this.attributes = [];
    string.replace(/{{([^{}]*)}}/g, (a, b) => {
      this.attributes.push(b);
    });
  }
  interpolate(str) {
    return function interpolate(o) {
      return str.replace(/{{([^{}]*)}}/g, function (a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    }
  }
  getNewObject(obj){
    if(obj){
    var x = {};
    this.attributes.forEach((prop)=>{
      x[prop] = obj[prop];
    })
    return x;
  } else {
    return "";
  }

  }
  render(string, object) {
    return this.interpolate(string)(object);
  }
}
