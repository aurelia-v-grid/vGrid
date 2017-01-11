var ArrayGrouping = (function () {
    function ArrayGrouping() {
        this.grouping = [];
        this.expanded = new Set([]);
    }
    ArrayGrouping.prototype.reset = function () {
        this.groups = [];
        this.grouping = [];
        this.expanded = new Set([]);
    };
    ArrayGrouping.prototype.group = function (arrayToGroup, grouping, keepExpanded) {
        var _this = this;
        if (grouping.length > 0) {
            if (!keepExpanded) {
                this.expanded = new Set([]);
            }
            var groups_1 = [];
            grouping.forEach(function (groupBy, groupNo) {
                if (groupNo === 0) {
                    var mainGroup = _this.groupMain(arrayToGroup, groupBy, groupNo);
                    groups_1.push(mainGroup);
                }
                else {
                    var childGroupArray = groups_1[groups_1.length - 1];
                    var newSubGroup = _this.groupChildren(childGroupArray, groupBy, groupNo);
                    groups_1.push(newSubGroup);
                }
            });
            this.groups = groups_1;
            this.grouping = grouping;
            if (!keepExpanded) {
                return groups_1[0];
            }
            else {
                return this.expand(null, this.expanded);
            }
        }
        else {
            arrayToGroup.forEach(function (row) {
                row.__groupLvl = 0;
            });
            this.grouping = [];
            return arrayToGroup;
        }
    };
    ArrayGrouping.prototype.getGrouping = function () {
        return this.grouping;
    };
    ArrayGrouping.prototype.expand = function (id, array) {
        var _this = this;
        var all = id ? false : true;
        if (!id) {
            if (array) {
                all = false;
            }
        }
        if (!array) {
            array = new Set([]);
        }
        var subGroup;
        var collection = [];
        var mainGroups = this.groups[0];
        subGroup = function (g) {
            g.__groupChildren.forEach(function (sg) {
                collection.push(sg);
                switch (true) {
                    case all:
                    case sg.__groupID === id:
                    case array.has(sg.__groupID):
                    case sg.__groupID !== id && sg.__groupExpanded:
                        if (sg.__groupChildren) {
                            sg.__groupExpanded = true;
                            _this.expanded.add(sg.__groupID);
                            subGroup(sg);
                        }
                        break;
                    default:
                        break;
                }
            });
        };
        mainGroups.forEach(function (g) {
            collection.push(g);
            switch (true) {
                case all:
                case g.__groupID === id:
                case array.has(g.__groupID):
                case g.__groupID !== id && g.__groupExpanded:
                    g.__groupExpanded = true;
                    _this.expanded.add(g.__groupID);
                    if (g.__groupChildren) {
                        subGroup(g);
                    }
                    break;
                default:
                    break;
            }
        });
        return collection;
    };
    ArrayGrouping.prototype.collapse = function (id) {
        var _this = this;
        var all = id ? false : true;
        id = id === undefined ? null : id;
        var subGroup;
        var collection = [];
        var mainGroups = this.groups[0];
        subGroup = function (g) {
            g.__groupChildren.forEach(function (sg) {
                switch (true) {
                    case all:
                        if (sg.__groupChildren) {
                            sg.__groupExpanded = false;
                            _this.expanded.delete(sg.__groupID);
                            subGroup(sg);
                        }
                        break;
                    case sg.__groupID === id:
                        collection.push(sg);
                        _this.expanded.delete(sg.__groupID);
                        sg.__groupExpanded = false;
                        break;
                    default:
                        collection.push(sg);
                        if (sg.__groupChildren && sg.__groupExpanded) {
                            subGroup(sg);
                        }
                        break;
                }
            });
        };
        mainGroups.forEach(function (g) {
            collection.push(g);
            switch (true) {
                case all:
                    g.__groupExpanded = false;
                    _this.expanded.delete(g.__groupID);
                    if (g.__groupChildren) {
                        subGroup(g);
                    }
                    break;
                case g.__groupID === id:
                    g.__groupExpanded = false;
                    _this.expanded.delete(g.__groupID);
                    break;
                default:
                    if (g.__groupChildren && g.__groupExpanded) {
                        subGroup(g);
                    }
                    break;
            }
        });
        return collection;
    };
    ArrayGrouping.prototype.groupMain = function (array, groupBy, groupNo) {
        var tempGroupArray = [];
        var curGroup = {};
        var tempValue = null;
        array.forEach(function (element) {
            if (element[groupBy] !== tempValue) {
                curGroup = {
                    __groupName: element[groupBy] || 'blank',
                    __group: true,
                    __groupID: element[groupBy],
                    __groupLvl: groupNo,
                    __groupChildren: [element],
                    __groupTotal: 1,
                    __groupExpanded: false
                };
                element.__groupLvl = groupNo + 1;
                tempValue = element[groupBy];
                tempGroupArray.push(curGroup);
            }
            else {
                element.__groupLvl = groupNo + 1;
                curGroup.__groupChildren.push(element);
                curGroup.__groupTotal++;
            }
        });
        return tempGroupArray;
    };
    ArrayGrouping.prototype.groupChildren = function (childGroupArray, groupBy, groupNo) {
        var tempGroupArray = [];
        var curGroup = {};
        childGroupArray.forEach(function (element) {
            var tempValue = null;
            var rebuiltChildrenArray = [];
            element.__groupChildren.forEach(function (child) {
                if (child[groupBy] !== tempValue) {
                    var gidm = child[groupBy] || 'blank';
                    var gidc = element.__groupID || 'blank';
                    curGroup = {
                        __groupName: child[groupBy],
                        __groupID: gidm + '-' + gidc,
                        __group: true,
                        __groupLvl: groupNo,
                        __groupChildren: [child],
                        __groupTotal: 1,
                        __groupExpanded: false
                    };
                    child.__groupLvl = groupNo + 1;
                    tempValue = child[groupBy];
                    rebuiltChildrenArray.push(curGroup);
                    tempGroupArray.push(curGroup);
                }
                else {
                    child.__groupLvl = groupNo + 1;
                    curGroup.__groupChildren.push(child);
                    curGroup.__groupTotal++;
                }
            });
            element.__groupChildren = rebuiltChildrenArray;
        });
        return tempGroupArray;
    };
    return ArrayGrouping;
}());
exports.ArrayGrouping = ArrayGrouping;

//# sourceMappingURL=arrayGrouping.js.map
