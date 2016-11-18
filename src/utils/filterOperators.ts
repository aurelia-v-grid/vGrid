
interface Operators {
  [key: string]: any;
}



export class FilterOperators {
  private filterOperatorsNumbers: Operators;
  private filterOperatorNames: Operators;

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


  public getName(operator: string): string {
    return this.filterOperatorNames[operator];
  }

  public setName(key: string, name: string) {
    switch (true) {
      case key === 'equals':
        this.filterOperatorNames['='] = name;
        break;
      case key === 'lessThanOrEqual':
        this.filterOperatorNames['<='] = name;
        break;
      case key === 'greaterThanOrEqual':
        this.filterOperatorNames['>='] = name;
        break;
      case key === 'lessThan':
        this.filterOperatorNames['<'] = name;
        break;
      case key === 'greaterThan':
        this.filterOperatorNames['>'] = name;
        break;
      case key === 'contains':
        this.filterOperatorNames['*'] = name;
        break;
      case key === 'notEqualTo':
        this.filterOperatorNames['!='] = name;
        break;
      case key === 'doesNotContain':
        this.filterOperatorNames['!*'] = name;
        break;
      case key === 'beginsWith':
        this.filterOperatorNames['*='] = name;
        break;
      case key === 'endsWith':
        this.filterOperatorNames['=*'] = name;
        break;
      default:
    }
  }


  public getOperatorNo(operator: string): number {
    return this.filterOperatorsNumbers[operator];
  }


}
