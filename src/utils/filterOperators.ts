
interface Operators {
  [key: string]: any;
}



export class FilterOperators {
  private filterOperatorsNumbers: Operators;

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

  }

  public getOperatorNo(operator: string): number {
    return this.filterOperatorsNumbers[operator];
  }


}
