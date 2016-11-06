export class ArrayFilter {

  constructor(filterOperators) {
    this.filterOperators = filterOperators;
    this.lastFilter = [];

  }


  getLastFilter() {
    return this.lastFilter;
  }


  runQueryOn(objArray, ObjFilter) {

    //my operators
    let filterOperatorTable = this.filterOperators.getFilterNumbers();


    var resultArray = objArray.filter(function (data) {


      //lets have true as default, so all that should not be there we set false..
      var result = true;
      ObjFilter.forEach(function (x) {


        //vars
        var rowValue;
        var filterValue;
        var filterOperator = filterOperatorTable[x.operator];
        var newFilterOperator;


        //helper for boolean
        var typeBool = {
          "true": true,
          "false": false
        };


        //set defult type
        var type;
        try {
          type = typeof(data[x.attribute]);
        } catch (e) {
          type = "string";
        }


        //lets set som defaults
        switch (type) {
          case "number":
            rowValue = data[x.attribute];
            filterValue = Number(x.value);
            filterOperator = filterOperator || 1;
            if (filterOperator === 6) {
              filterOperator = 1;
            }

            break;
          case "string":
            rowValue = data[x.attribute].toLowerCase();
            filterValue = x.value.toLowerCase();
            filterOperator = filterOperator || 9;
            newFilterOperator = filterOperator;

            //todo: add more options here and replace with a switch.., also

            //if filter operator is BEGIN WITH
            if (x.value.charAt(0) === "*" && filterOperator === 9) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(1, filterValue.length);
            }


            //if filter operator is EQUAL TO
            //wildcard first = end with
            if (x.value.charAt(0) === "*" && filterOperator === 1) {
              newFilterOperator = 10;
              filterValue = filterValue.substr(1, filterValue.length);
            }


            //wildcard end and first = contains
            if (x.value.charAt(x.value.length - 1) === "*" && filterOperator === 1 && newFilterOperator === 10) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }


            //begin with since wildcard is in the end
            if (x.value.charAt(x.value.length - 1) === "*" && filterOperator === 1 && newFilterOperator !== 10 && newFilterOperator !== 6) {
              newFilterOperator = 9;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }


            //set the filteroperator from new if changed
            if (filterOperator !== newFilterOperator) {
              filterOperator = newFilterOperator;
            }
            break;


          case "boolean":
            rowValue = data[x.attribute];
            filterValue = typeBool[x.value];
            filterOperator = 1;
            break;


          case "object":
            rowValue = data[x.attribute].toISOString();
            filterValue = new Date(x.value).toISOString(); //todo, this needs to be better...
            filterOperator = filterOperator || 2;
            break;


          default :
            //todo: take the stuff under equal to and put in a function and also call i from here.. or just make it fail?
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


        //filter from what operator used
        switch (filterOperator) {
          case 1: //equal
            if (rowValue !== filterValue) {
              result = false;
            }
            break;
          case 2: //less or equal
            if (!(rowValue <= filterValue)) {
              result = false;
            }
            break;
          case 3: //greater or equal
            if (!(rowValue >= filterValue)) {
              result = false;
            }
            break;
          case 4://greate
            if (!(rowValue < filterValue)) {
              result = false;
            }
            break;
          case 5: //greater
            if (!(rowValue > filterValue)) {
              result = false;
            }
            break;
          case 6: //contains
            if (rowValue.indexOf(filterValue) === -1) {
              result = false;
            }
            break;
          case 7: //not equal to
            if (rowValue !== filterValue) {
              result = false;
            }
            break;
          case 8: //does not contain
            if (rowValue.indexOf(filterValue) !== -1) {
              result = false;
            }
            break;
          case 9: //begin with
            if (rowValue.substring(0, filterValue.length) !== filterValue) {
              result = false;
            }
            break;
          case 10: //end with
            if (rowValue.substring(rowValue.length - filterValue.length, rowValue.length) !== filterValue) {
              result = false;
            }
            break;
          default :
            if (rowValue !== filterValue) {
              result = false;
            }
        }
        if (type === "string") {
          if (x.value.charAt(0) === "*" && x.value.length === 1) {
            result = true;
          }
        }


      });//end foreach obj
      return result;

    });
    return resultArray;
  }


}

