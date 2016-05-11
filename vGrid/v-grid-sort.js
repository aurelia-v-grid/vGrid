/*****************************************************************************************************************
 *    vGridInterpolate
 *    This just does the sorting with the data the grid gives it
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridSort {


  /***************************************************************************************
   * constsructor
   ***************************************************************************************/
  constructor(vGrid) {
    this.vGrid = vGrid;
  }


  //what they say...
  lastSort = [];
  curSort = [];


  /***************************************************************************************
   * resets sort
   ***************************************************************************************/
  reset() {
    this.lastSort = [];
    this.curSort = [];
  }


  /***************************************************************************************
   * set the filter
   ***************************************************************************************/
  setFilter(sort, add) {

    //do we add or is it the first one
    if (add && this.lastSort.length > 0) {


      //its adding, so lets get last one
      this.curSort = this.lastSort;
      var exist = false;


      //loop to se if it exist from before
      this.curSort.forEach(function (x) {
        if (x.attribute === sort.attribute) {
          exist = true;
          x.asc = x.asc === true ? false : true;

        }
      });


      //if it dont exist we add it, else there isnt anythin else to do for now
      if (!exist) {
        this.curSort.push(sort);
        this.curSort[this.curSort.length - 1].no = this.curSort.length;
      }


    } else {

      //if not adding, just set it
      this.curSort = [sort];
      this.curSort[0].no = 1;
      if (this.lastSort[0]) {
        if (this.lastSort[0].attribute === this.curSort[0].attribute) {
          if (this.lastSort[0].asc === this.curSort[0].asc) {
            this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
          }
        }
      }


    }


  }


  /***************************************************************************************
   * returns the filter
   ***************************************************************************************/
  getFilter() {
    return this.curSort;
  }


  /***************************************************************************************
   * run the sort
   ***************************************************************************************/
  run(array) {


    //super simple for now.. atleast I have som form for sort
    var thisSort = this.getFilter();

    //this is mix from different sources... from what I can tell it works now
    array.sort(function (obj1, obj2, i) {
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

    this.lastSort = this.getFilter().slice(0);


  }

}
