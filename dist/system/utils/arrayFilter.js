System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var ArrayFilter;
    return {
        setters: [],
        execute: function () {
            ArrayFilter = (function () {
                function ArrayFilter() {
                    this.filterOperators = {
                        '=': 1,
                        '<=': 2,
                        '>=': 3,
                        '<': 4,
                        '>': 5,
                        '*': 6,
                        '!=': 7,
                        '!*': 8,
                        '*=': 9,
                        '=*': 10
                    };
                    this.lastFilter = [];
                }
                ArrayFilter.prototype.getOperatorNo = function (val) {
                    return this.filterOperators[val];
                };
                ArrayFilter.prototype.getLastFilter = function () {
                    return this.lastFilter;
                };
                ArrayFilter.prototype.runQueryOn = function (objArray, ObjFilter) {
                    var _this = this;
                    var resultArray = objArray.filter(function (data) {
                        var result = true;
                        ObjFilter.forEach(function (x) {
                            var rowValue;
                            var filterValue;
                            var filterOperator = _this.getOperatorNo(x.operator);
                            var newFilterOperator;
                            var typeBool = {
                                true: true,
                                false: false
                            };
                            var type;
                            try {
                                type = typeof (data[x.attribute]);
                            }
                            catch (e) {
                                type = 'string';
                            }
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
                                    rowValue = data[x.attribute].toLowerCase();
                                    filterValue = x.value.toLowerCase();
                                    filterOperator = filterOperator || 9;
                                    newFilterOperator = filterOperator;
                                    if (x.value.charAt(0) === '*' && filterOperator === 9) {
                                        newFilterOperator = 6;
                                        filterValue = filterValue.substr(1, filterValue.length);
                                    }
                                    if (x.value.charAt(0) === '*' && filterOperator === 1) {
                                        newFilterOperator = 10;
                                        filterValue = filterValue.substr(1, filterValue.length);
                                    }
                                    if (x.value.charAt(x.value.length - 1) === '*' && filterOperator === 1 && newFilterOperator === 10) {
                                        newFilterOperator = 6;
                                        filterValue = filterValue.substr(0, filterValue.length - 1);
                                    }
                                    if (x.value.charAt(x.value.length - 1) === '*'
                                        && filterOperator === 1
                                        && newFilterOperator !== 10
                                        && newFilterOperator !== 6) {
                                        newFilterOperator = 9;
                                        filterValue = filterValue.substr(0, filterValue.length - 1);
                                    }
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
                                    rowValue = data[x.attribute].toISOString();
                                    filterValue = new Date(x.value).toISOString();
                                    filterOperator = filterOperator || 2;
                                    break;
                                default:
                                    try {
                                        rowValue = data[x.attribute].toLowerCase();
                                    }
                                    catch (err) {
                                        rowValue = data[x.attribute];
                                    }
                                    try {
                                        filterValue = x.value.toLowerCase();
                                    }
                                    catch (err) {
                                        filterValue = x.value;
                                    }
                                    filterOperator = filterOperator || 1;
                                    break;
                            }
                            switch (filterOperator) {
                                case 1:
                                    if (rowValue !== filterValue) {
                                        result = false;
                                    }
                                    break;
                                case 2:
                                    if (!(rowValue <= filterValue)) {
                                        result = false;
                                    }
                                    break;
                                case 3:
                                    if (!(rowValue >= filterValue)) {
                                        result = false;
                                    }
                                    break;
                                case 4:
                                    if (!(rowValue < filterValue)) {
                                        result = false;
                                    }
                                    break;
                                case 5:
                                    if (!(rowValue > filterValue)) {
                                        result = false;
                                    }
                                    break;
                                case 6:
                                    if (rowValue.indexOf(filterValue) === -1) {
                                        result = false;
                                    }
                                    break;
                                case 7:
                                    if (rowValue === filterValue) {
                                        result = false;
                                    }
                                    break;
                                case 8:
                                    if (rowValue.indexOf(filterValue) !== -1) {
                                        result = false;
                                    }
                                    break;
                                case 9:
                                    if (rowValue.substring(0, filterValue.length) !== filterValue) {
                                        result = false;
                                    }
                                    break;
                                case 10:
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
                        });
                        return result;
                    });
                    return resultArray;
                };
                return ArrayFilter;
            }());
            exports_1("ArrayFilter", ArrayFilter);
        }
    };
});

//# sourceMappingURL=arrayFilter.js.map
