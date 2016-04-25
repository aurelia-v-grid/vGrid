/*****************************************************************************************************************
 *    vGridInterpolate
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
  //TODO just remove this, afetr viewslots it isnt really needed that much, just move the attibute over to vGridConfig
export class VGridInterpolate {
  constructor() {
  }
  attributes = [];

  // interpolate(str) {
  //   return function interpolate(o) {
  //     return str.replace(/{{([^{}]*)}}/g, function (a, b) {
  //       var r = o[b];
  //       return r;
  //     });
  //   }
  // }
  getNewObject(obj){
    if(obj){
    var x = {};
    this.attributes.forEach((prop)=>{
      x[prop] = obj[prop];
    });
    return x;
  } else {
    return "";
  }

  }
  render(string, object) {
    return this.interpolate(string)(object);
  }
}
