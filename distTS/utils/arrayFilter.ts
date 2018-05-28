import { FilterObjectInterface, EntityInterface } from '../interfaces'; // todo make a interface


/**
 * filters the array
 *
 */
export class ArrayFilter {
  private lastFilter: FilterObjectInterface[];
  private filterOperators: any = {
    '=': 1,   // equal
    '<=': 2,  // less than or equal to
    '>=': 3,  // greater than or equal to
    '<': 4,   // less than
    '>': 5,   // greater than
    '*': 6,   // contains
    '!=': 7,  // not equal to
    '!*': 8,  // does not contain
    '*=': 9,  // begin with
    '=*': 10  // end with
  };



  constructor() {
    this.lastFilter = [];
  }



  /**
   * gets operator number from class
   *
   */
  public getOperatorNo(val: string): number {
    return this.filterOperators[val];
  }



  /**
   * returns last filter set
   *
   */
  public getLastFilter(): FilterObjectInterface[] {
    return this.lastFilter;
  }



  /**
   * runs query on the array
   *
   */
  public runQueryOn(objArray: EntityInterface[], ObjFilter: FilterObjectInterface[]) {

    this.lastFilter = ObjFilter;

    let resultArray = objArray.filter((data) => {

      // lets have true as default, so all that should not be there we set false..
      let result = true;
      ObjFilter.forEach((x: FilterObjectInterface) => {

        // vars
        let rowValue: any;
        let filterValue: any;
        let filterOperator = this.getOperatorNo(x.operator);
        let newFilterOperator: any;

        // helper for boolean
        let typeBool: { true: boolean, false: boolean, [key: string]: any } = {
          true: true,
          false: false
        };

        // set defult type
        let type: string;
        try {
          if (data[x.attribute] === null || data[x.attribute] === undefined) {
            type = 'string';
          } else {
            type = typeof (data[x.attribute]);
          }
        } catch (e) {
          type = 'string';
        }

        // lets set some defaults
        switch (type) {
          case 'number':
            rowValue = data[x.attribute];
            filterValue = Number(x.value);
            filterOperator = filterOperator || 1;
            if (filterOperator === 6) {
              filterOperator = 1;
            }
            break;
          case 'string':
            if (data[x.attribute] === null || data[x.attribute] === undefined) {
              rowValue = '';
            } else {
              rowValue = data[x.attribute].toLowerCase();
            }
            filterValue = x.value.toLowerCase();
            filterOperator = filterOperator || 9;
            newFilterOperator = filterOperator;

            // todo: add more options here and replace with a switch.., also

            // if filter operator is BEGIN WITH
            if (x.value.charAt(0) === '*' && filterOperator === 9) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(1, filterValue.length);
            }

            // if filter operator is EQUAL TO
            // wildcard first = end with
            if (x.value.charAt(0) === '*' && filterOperator === 1) {
              newFilterOperator = 10;
              filterValue = filterValue.substr(1, filterValue.length);
            }

            // wildcard end and first = contains
            if (x.value.charAt(x.value.length - 1) === '*' && filterOperator === 1 && newFilterOperator === 10) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }

            // begin with since wildcard is in the end
            if (x.value.charAt(x.value.length - 1) === '*'
              && filterOperator === 1
              && newFilterOperator !== 10
              && newFilterOperator !== 6) {
              newFilterOperator = 9;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }

            // set the filteroperator from new if changed
            if (filterOperator !== newFilterOperator) {
              filterOperator = newFilterOperator;
            }
            break;
          case 'boolean':
            rowValue = data[x.attribute];
            filterValue = typeBool[x.value];
            filterOperator = 1;
            break;
          case 'object':
            // todo check if object or date..
            try {
              rowValue = new Date(data[x.attribute].getFullYear(), data[x.attribute].getMonth(), data[x.attribute].getDate()).getTime();
              filterValue = new Date(x.value.getFullYear(), x.value.getMonth(), x.value.getDate()).getTime();
            } catch (e) {
              rowValue = 0;
              filterValue = 1;
            }
            filterOperator = filterOperator || 2;
            break;
          default:
            // todo: take the stuff under equal to and put in a function
            // and also call i from here.. or just make it fail?
            try {
              rowValue = data[x.attribute].toLowerCase();
            } catch (err) {
              rowValue = data[x.attribute];
            }
            try {
              filterValue = x.value.toLowerCase();
            } catch (err) {
              filterValue = x.value;
            }
            filterOperator = filterOperator || 1;
            break;
        }

        // filter from what operator used
        switch (filterOperator) {
          case 1: // equal
            if (rowValue !== filterValue) {
              result = false;
            }
            break;
          case 2: // less or equal
            if (!(rowValue <= filterValue)) {
              result = false;
            }
            break;
          case 3: // greater or equal
            if (!(rowValue >= filterValue)) {
              result = false;
            }
            break;
          case 4: // greate
            if (!(rowValue < filterValue)) {
              result = false;
            }
            break;
          case 5: // greater
            if (!(rowValue > filterValue)) {
              result = false;
            }
            break;
          case 6: // contains
            if (rowValue.indexOf(filterValue) === -1) {
              result = false;
            }
            break;
          case 7: // not equal to
            if (rowValue === filterValue) {
              result = false;
            }
            break;
          case 8: // does not contain
            if (rowValue.indexOf(filterValue) !== -1) {
              result = false;
            }
            break;
          case 9: // begin with
            if (rowValue.substring(0, filterValue.length) !== filterValue) {
              result = false;
            }
            break;
          case 10: // end with
            if (rowValue.substring(rowValue.length - filterValue.length, rowValue.length) !== filterValue) {
              result = false;
            }
            break;
          default:
            if (rowValue !== filterValue) {
              result = false;
            }
        }
        if (type === 'string') {
          if (x.value.charAt(0) === '*' && x.value.length === 1) {
            result = true;
          }
        }

      }); // end foreach obj
      return result;

    });
    return resultArray;
  }
}
