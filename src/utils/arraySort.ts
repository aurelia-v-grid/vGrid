import { SortObject, Entity } from '../interfaces';

/**
 * This does all the sorting on the array passed in
 * Used by default datasource
 * 
 */
export class ArraySort {
  private lastSort: SortObject[];
  private curSort: SortObject[];

  constructor() {
    this.lastSort = [];
    this.curSort = [];
  }



  /**
   * Resets sort
   * if attribute is passed it sets that as default, this way first filter wont be messed up
   * 
   */
  public reset(defaultSortAttribute?: string): void {
    if (defaultSortAttribute) {
      this.lastSort = [{ attribute: defaultSortAttribute, asc: true, no: 0 }];
      this.curSort = [{ attribute: defaultSortAttribute, asc: true, no: 0 }];
    } else {
      this.lastSort = [];
      this.curSort = [];
    }

  }



  /**
   * Sets last sort
   * todo: why do I have this?
   * 
   */
  public setLastSort(array: SortObject[]): void {
    this.lastSort = array;
    this.curSort = array;
  }



  /**
   * Sets the sort order to be used next sort Runs
   * any = string
   * 
   */
  public setOrderBy(param: SortObject | any, add?: boolean): void {
    let sort: any;
    let useSetValue = false;
    if (param.asc === undefined) {
      sort = {
        attribute: param,
        asc: true
      };
    } else {
      sort = {
        attribute: param.attribute,
        asc: param.asc
      };
      useSetValue = true;
    }

    // do we add or is it the first one
    if (add && this.lastSort.length > 0) {

      // its adding, so lets get last one
      this.curSort = this.lastSort;
      let exist = false;

      // loop to se if it exist from before
      this.curSort.forEach((x) => {
        if (!useSetValue) {
          if (x.attribute === sort.attribute) {
            exist = true;
            x.asc = x.asc === true ? false : true;
          }
        }

      });

      // if it dont exist we add it, else there isnt anythin else to do for now
      if (!exist) {
        this.curSort.push(sort);
        this.curSort[this.curSort.length - 1].no = this.curSort.length;
      }
      this.lastSort = this.curSort;

    } else {

      // if not adding, just set it
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


  /**
   * Returns current sort by
   * 
   */
  public getOrderBy(): SortObject[] {
    return this.curSort;
  }



  /**
   * Get value from deeper inside the object, this will need a lot more work, and filter does not support it
   * 
   */
  public getValue(attribute: string, obj: any): any {
    let arr: any[] = attribute.split('.');
    let tempValue: any = Infinity;
    if (arr.length > 1) {
      try {
        tempValue = obj[arr[0]][arr[1]];
      } catch (e) { /* nothing*/ }
    }
    if (arr.length === 1) {
      try {
        tempValue = obj[attribute];
      } catch (e) { /* nothing*/ }
    }
    return tempValue;
  }



  /**
   *  Runs sort on array passed in with params set earlier
   * 
   */
  public runOrderbyOn(array: Entity[]): void {

    // super simple for now.. atleast I have som form for sort
    let thisSort = this.getOrderBy();

    // this is mix from different sources... from what I can tell it works now
    array.sort((obj1: Entity, obj2: Entity) => {
      let result = 0;

      for (let i = 0; i < thisSort.length && result === 0; ++i) {
        // loop until all are sorted
        let currentObj = thisSort[i];
        let v1 = this.getValue(currentObj.attribute, obj1);
        let v2 = this.getValue(currentObj.attribute, obj2);

        // todo figure out how to use :
        // String.prototype.localeCompare()
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
        // special charcters will prb be sorted wrong, 
        // not getting localeCompare() to work with norwegian Ø Æ Å charcters
        if (v1 !== v2) {
          if (currentObj.asc) {
            // ASC
            if (v1 < v2) {
              result = -1;
            } else {
              result = 1;
            }
          } else {
            // DESC
            if (v1 < v2) {
              result = 1;
            } else {
              result = -1;
            }
          }
        }
      }
      return result;
    });

    // set current sort as last sort that was used
    this.lastSort = this.getOrderBy().slice(0);

  }

}
