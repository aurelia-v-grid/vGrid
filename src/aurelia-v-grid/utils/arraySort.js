export class ArraySort {


  constructor() {
    this.lastSort = [];
    this.curSort = [];
  }


  reset() {
    this.lastSort = [];
    this.curSort = [];
  }

  setLastSort(array) {
    this.lastSort = array;
    this.curSort = array;
  }


  setOrderBy(attribute, add) {
    let sort;
    let useSetValue = false;
    if (attribute.asc === undefined) {
      sort = {
        attribute: attribute,
        asc: true
      };
    } else {
      sort = {
        attribute: attribute.attribute,
        asc: attribute.asc
      };
      useSetValue = true;
    }


    //do we add or is it the first one
    if (add && this.lastSort.length > 0) {


      //its adding, so lets get last one
      this.curSort = this.lastSort;
      var exist = false;


      //loop to se if it exist from before
      this.curSort.forEach(function (x) {
        if (!useSetValue) {
          if (x.attribute === sort.attribute) {
            exist = true;
            x.asc = x.asc === true ? false : true;
          }
        }

      });


      //if it dont exist we add it, else there isnt anythin else to do for now
      if (!exist) {
        this.curSort.push(sort);
        this.curSort[this.curSort.length - 1].no = this.curSort.length;
      }
      this.lastSort = this.curSort;


    } else {

      //if not adding, just set it
      this.curSort = [sort];
      this.curSort[0].no = 1;
      if (this.lastSort[0]) {
        if (this.lastSort[0].attribute === this.curSort[0].attribute) {
          if (this.lastSort[0].asc === this.curSort[0].asc) {
            if (!useSetValue) {
              this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
            }
          }
        }
      }
      this.lastSort = this.curSort;
    }
  }


  getOrderBy() {
    return this.curSort;
  }


  /***************************************************************************************
   * run the sort
   ***************************************************************************************/
  runOrderbyOn(array) {


    //super simple for now.. atleast I have som form for sort
    var thisSort = this.getOrderBy();

    //this is mix from different sources... from what I can tell it works now
    let cool = array.sort(function (obj1, obj2, i) {
      var result = 0;

      for (var i = 0; i < thisSort.length && result == 0; ++i) {
        //loop until all are sorted
        var currentObj = thisSort[i];
        var v1 = obj1[currentObj.attribute];
        var v2 = obj2[currentObj.attribute];

        if (v1 !== v2) {
          if (currentObj.asc) {
            //ASC
            if (v1 < v2)
              result = -1;
            else
              result = 1;
          } else {
            //DESC
            if (v1 < v2)
              result = 1;
            else
              result = -1;

          }
        }
      }
      return result;
    });

    this.lastSort = this.getOrderBy().slice(0);

  }

}
