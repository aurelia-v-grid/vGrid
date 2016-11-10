export class FilterOperators {
  private filterOperatorsNumbers: any;
  private filterOperatorNames: any;

  constructor() {

    // filter table
    this.filterOperatorsNumbers = {
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


    // filter table
    this.filterOperatorNames = {
      '=': 'equals',              // 1
      '<=': 'less than or eq',    // 2
      '>=': 'greater than or eq', // 3
      '<': 'less than',           // 4
      '>': 'greater than',        // 5
      '*': 'contains',            // 6
      '!=': 'not equal to',       // 7
      '!*': 'does not contain',   // 8
      '*=': 'begins with',        // 9
      '=*': 'ends with'           // 10
    };
  }


  public getFilterNumbers() {
    return this.filterOperatorsNumbers;
  }


  public getName(operator) {
    return this.filterOperatorNames[operator];
  }


  public getOperatorNo(operator) {
    return this.filterOperatorsNumbers[operator];
  }


}
