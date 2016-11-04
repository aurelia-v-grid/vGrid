"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _typeof, ArrayGrouping;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            _export("ArrayGrouping", ArrayGrouping = function () {
                function ArrayGrouping() {
                    _classCallCheck(this, ArrayGrouping);

                    this.gID = 0;
                    this.grouping = [];
                    this.expanded = new Set([]);
                }

                ArrayGrouping.prototype.group = function group(arrayToGroup, grouping, keepExpanded) {
                    var _this = this;

                    if (grouping.length > 0) {
                        var _ret = function () {
                            if (!keepExpanded) {
                                _this.expanded = new Set([]);
                            }

                            var groups = [];

                            grouping.forEach(function (groupBy, groupNo) {

                                if (groupNo === 0) {
                                    var mainGroup = _this.groupMain(arrayToGroup, groupBy, groupNo);
                                    groups.push(mainGroup);
                                } else {
                                    var childGroupArray = groups[groups.length - 1];
                                    var newSubGroup = _this.groupChildren(childGroupArray, groupBy, groupNo);
                                    groups.push(newSubGroup);
                                }
                            });

                            _this.groups = groups;
                            _this.grouping = grouping;
                            if (!keepExpanded) {
                                return {
                                    v: groups[0]
                                };
                            } else {
                                return {
                                    v: _this.expand(null, _this.expanded)
                                };
                            }
                        }();

                        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                    } else {
                        arrayToGroup.forEach(function (row) {
                            row.__groupLvl = 0;
                        });
                        this.grouping = [];
                        return arrayToGroup;
                    }
                };

                ArrayGrouping.prototype.groupMain = function groupMain(array, groupBy, groupNo) {
                    var _this2 = this;

                    var tempGroupArray = [];
                    var curGroup = {};
                    var tempValue = null;

                    array.forEach(function (element, i) {
                        _this2.gID++;
                        if (element[groupBy] !== tempValue) {
                            curGroup = {
                                __groupName: element[groupBy] || "blank",
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
                        } else {
                            element.__groupLvl = groupNo + 1;
                            curGroup.__groupChildren.push(element);
                            curGroup.__groupTotal++;
                        }
                    });

                    return tempGroupArray;
                };

                ArrayGrouping.prototype.groupChildren = function groupChildren(childGroupArray, groupBy, groupNo) {
                    var _this3 = this;

                    var tempGroupArray = [];

                    var curGroup = {};

                    childGroupArray.forEach(function (element, i) {
                        var tempValue = null;

                        var rebuiltChildrenArray = [];
                        element.__groupChildren.forEach(function (child) {
                            _this3.gID++;
                            if (child[groupBy] !== tempValue) {
                                var gidm = child[groupBy] || "blank";
                                var gidc = element.__groupID || "blank";
                                curGroup = {
                                    __groupName: child[groupBy],
                                    __groupID: gidm + "-" + gidc,
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
                            } else {
                                child.__groupLvl = groupNo + 1;
                                curGroup.__groupChildren.push(child);
                                curGroup.__groupTotal++;
                            }
                        });

                        element.__groupChildren = rebuiltChildrenArray;
                    });

                    return tempGroupArray;
                };

                ArrayGrouping.prototype.getGrouping = function getGrouping() {
                    return this.grouping;
                };

                ArrayGrouping.prototype.expand = function expand(id, array) {
                    var _this4 = this;

                    var all = id ? false : true;
                    if (!id) {
                        if (array) {
                            all = false;
                        }
                    }

                    if (!array) {
                        array = new Set([]);
                    }
                    var _subGroup = void 0;
                    var collection = [];
                    var mainGroups = this.groups[0];

                    _subGroup = function subGroup(g) {
                        g.__groupChildren.forEach(function (sg) {
                            collection.push(sg);
                            switch (true) {
                                case all:
                                case sg.__groupID === id:
                                case array.has(sg.__groupID):
                                case sg.__groupID !== id && sg.__groupExpanded:
                                    if (sg.__groupChildren) {
                                        sg.__groupExpanded = true;
                                        _this4.expanded.add(sg.__groupID);
                                        _subGroup(sg);
                                    }
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
                                _this4.expanded.add(g.__groupID);
                                if (g.__groupChildren) {
                                    _subGroup(g);
                                }
                                break;
                        }
                    });

                    return collection;
                };

                ArrayGrouping.prototype.collapse = function collapse(id) {
                    var _this5 = this;

                    var all = id ? false : true;
                    id = id === undefined ? null : id;
                    var _subGroup2 = void 0;
                    var collection = [];
                    var mainGroups = this.groups[0];

                    _subGroup2 = function subGroup(g) {
                        g.__groupChildren.forEach(function (sg) {

                            switch (true) {
                                case all:
                                    if (sg.__groupChildren) {
                                        sg.__groupExpanded = false;
                                        _this5.expanded.delete(sg.__groupID);
                                        _subGroup2(sg);
                                    }
                                    break;
                                case sg.__groupID === id:
                                    collection.push(sg);
                                    _this5.expanded.delete(sg.__groupID);
                                    sg.__groupExpanded = false;
                                    break;
                                default:
                                    collection.push(sg);
                                    if (sg.__groupChildren && sg.__groupExpanded) {
                                        _subGroup2(sg);
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
                                _this5.expanded.delete(g.__groupID);
                                if (g.__groupChildren) {
                                    _subGroup2(g);
                                }
                                break;
                            case g.__groupID === id:
                                g.__groupExpanded = false;
                                _this5.expanded.delete(g.__groupID);
                                break;
                            default:
                                if (g.__groupChildren && g.__groupExpanded) {
                                    _subGroup2(g);
                                }
                                break;
                        }
                    });

                    return collection;
                };

                return ArrayGrouping;
            }());

            _export("ArrayGrouping", ArrayGrouping);
        }
    };
});
//# sourceMappingURL=arrayGrouping.js.map
