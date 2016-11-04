/* */ 
define(["exports", "./dataSource"], function (exports, _dataSource) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Entity = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Entity = exports.Entity = function () {
        function Entity(data, attributes) {
            _classCallCheck(this, Entity);

            data = data === undefined || data === null ? {} : data;
            attributes = attributes === undefined || attributes === null ? {} : attributes;
            this.__attributes = attributes;
            this.__setDefaults(data);
            this.__setGetterSetters();
        }

        Entity.prototype.__setGetterSetters = function __setGetterSetters() {
            var _this = this;

            var attributeArray = [];
            for (var k in this.__attributes) {
                attributeArray.push(k);
            }
            attributeArray.forEach(function (attributeName) {
                Object.defineProperty(_this, attributeName, {
                    set: function set(value) {
                        var save = true;
                        var type = _this.__attributes[attributeName].type;
                        var kind = _this.__attributes[attributeName].kind;
                        var readOnly = _this.__attributes[attributeName].readOnly;
                        var newValue = void 0;
                        var oldValue = void 0;
                        var index = void 0;

                        try {
                            if (kind !== "alias") {
                                switch (type) {
                                    case "long":
                                    case "long64":
                                    case "number":
                                    case "word":
                                    case "byte":

                                        index = _this.modifiedAttributes.indexOf(attributeName);
                                        newValue = value !== "" ? value * 1 : 0;
                                        if (newValue !== _this.__valuesOriginal[attributeName]) {
                                            _this.__isModified = true;
                                            _this.__modified[attributeName] = value;
                                            if (index === -1) {
                                                _this.modifiedAttributes.push(attributeName);
                                            }
                                        } else {
                                            if (index !== -1) {
                                                _this.modifiedAttributes.splice(index, 1);
                                            }
                                            _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;;
                                            _this.__modified[attributeName] = undefined;
                                        }

                                        break;
                                    case "bool":
                                        index = _this.modifiedAttributes.indexOf(attributeName);
                                        oldValue = _this.__checkBool(_this.__original[attributeName]);
                                        newValue = _this.__checkBool(value);

                                        if (oldValue.toString() !== newValue.toString()) {
                                            _this.__isModified = true;
                                            _this.__modified[attributeName] = value ? "true" : "false";
                                            if (index === -1) {
                                                _this.modifiedAttributes.push(attributeName);
                                            }
                                        } else {
                                            if (index !== -1) {
                                                _this.modifiedAttributes.splice(index, 1);
                                            }
                                            _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;;
                                            _this.__modified[attributeName] = undefined;
                                        }

                                        break;

                                    case "date":
                                        index = _this.modifiedAttributes.indexOf(attributeName);

                                        if (value === "Invalid date" || value === "") {

                                            if (value.toString() !== _this.__valuesOriginal[attributeName].toString()) {
                                                _this.__isModified = true;
                                                _this.__modified[attributeName] = null;
                                                if (index === -1) {
                                                    _this.modifiedAttributes.push(attributeName);
                                                }
                                            } else {
                                                if (index !== -1) {
                                                    _this.modifiedAttributes.splice(index, 1);
                                                }
                                                _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;;
                                                _this.__modified[attributeName] = undefined;
                                            }
                                        } else {
                                            try {
                                                var isDate = value instanceof Date && !isNaN(value.valueOf());
                                                var testDate = isDate ? value.toISOString() : new Date(value);

                                                if (testDate.toString() !== _this.__valuesOriginal[attributeName].toString()) {
                                                    _this.__isModified = true;
                                                    if (_this.__attributes[attributeName].simpleDate) {
                                                        var tempDate = new Date(value);
                                                        var day = tempDate.getDate();
                                                        var month = tempDate.getMonth() + 1;
                                                        var year = tempDate.getFullYear();
                                                        _this.__modified[attributeName] = day + "!" + month + "!" + year;
                                                    } else {
                                                        _this.__modified[attributeName] = new Date(value).toISOString();
                                                    }
                                                    if (index === -1) {
                                                        _this.modifiedAttributes.push(attributeName);
                                                    }
                                                } else {
                                                    if (index !== -1) {
                                                        _this.modifiedAttributes.splice(index, 1);
                                                    }
                                                    _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;;
                                                    _this.__modified[attributeName] = undefined;
                                                }
                                            } catch (e) {}
                                        }
                                        break;
                                    case "image":
                                        break;
                                    case "uuid":
                                    case "string":
                                        index = _this.modifiedAttributes.indexOf(attributeName);

                                        if (value !== _this.__valuesOriginal[attributeName]) {
                                            _this.__isModified = true;
                                            _this.__modified[attributeName] = value;
                                            if (index === -1) {
                                                _this.modifiedAttributes.push(attributeName);
                                            }
                                        } else {
                                            if (index !== -1) {
                                                _this.modifiedAttributes.splice(index, 1);
                                            }
                                            _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;
                                            _this.__modified[attributeName] = undefined;
                                        }
                                        break;
                                    case "object":
                                        if (JSON.Stringify(value) !== JSON.Stringify(_this.__original[attributeName])) {
                                            _this.__isModified = true;
                                            _this.__modified[attributeName] = value;
                                        }
                                        break;
                                    case "blob":
                                        break;
                                    case "duration":
                                        break;
                                    default:
                                        save = false;
                                        index = _this.modifiedAttributes.indexOf(attributeName);

                                        if (kind === "relatedEntity") {
                                            if (value instanceof _dataSource.DataSource) {
                                                if (type === value.classname) {
                                                    if (value.entity) {
                                                        if (value.entity.__KEY) {
                                                            _this.__modified[attributeName] = {
                                                                __KEY: value.entity.__KEY
                                                            };;
                                                            _this.__isModified = true;
                                                            if (index === -1) {
                                                                _this.modifiedAttributes.push(attributeName);
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (value === null) {
                                                    _this.__isModified = true;
                                                    _this.__modified[attributeName] = value;
                                                    if (index === -1) {
                                                        _this.modifiedAttributes.push(attributeName);
                                                    }
                                                }
                                            }
                                        }
                                }
                            }
                            if (save) {
                                _this.__values[attributeName] = value;
                            }
                        } catch (err) {
                            console.log("catch setter entity");
                        }
                    },
                    get: function get() {
                        return _this.__values[attributeName];
                    }
                });
            });
        };

        Entity.prototype.__checkBool = function __checkBool(value) {
            if (value == null || value === undefined) {
                return false;
            } else {
                if (typeof value === "boolean") {
                    return value;
                } else {
                    if (typeof value === "string") {
                        if (value.toUpperCase() === "TRUE") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        };

        Entity.prototype.__convert = function __convert(attributeName, value) {
            var returnValue = value;
            try {
                switch (this.__attributes[attributeName].type) {
                    case "long":
                    case "long64":
                    case "number":
                    case "word":
                    case "byte":
                        returnValue = returnValue ? returnValue * 1 : 0;
                        break;
                    case "bool":
                        returnValue = this.__checkBool(returnValue);
                        break;
                    case "date":
                        if (returnValue !== null && returnValue !== undefined) {
                            if (this.__attributes[attributeName].simpleDate) {
                                var args = returnValue.split("!");
                                returnValue = new Date(parseInt(args[2]), parseInt(args[1]) - 1, parseInt(args[0]));
                            } else {
                                returnValue = new Date(returnValue);
                            }
                        }
                        break;
                    case "image":
                        break;
                    case "uuid":
                    case "string":
                        returnValue = returnValue ? returnValue : "";

                        break;
                    case "object":
                        returnValue = returnValue ? returnValue : {};

                        break;
                    case "blob":
                        break;
                    case "duration":
                        break;
                    default:
                }
                return returnValue;
            } catch (err) {
                console.log("catch setter entity");
            }
        };

        Entity.prototype.__setDefaults = function __setDefaults(data) {

            this.__KEY = data.__KEY;
            this.__STAMP = data.__STAMP;

            this.__isNew = data.__isNew ? true : false;
            this.__isModified = false;
            if (!this.__KEY) {
                this.__isModified = true;
                this.__KEY = -1;
            }

            if (!this.__isEntity) {
                this.__original = {};
                this.__values = {};
                this.__valuesOriginal = {};
            }

            for (var k in data) {
                this.__original[k] = data[k];
            }

            this.__modified = {};
            for (var k in this.__attributes) {
                if (data[k]) {
                    this.__values[k] = this.__convert(k, data[k]);
                    this.__valuesOriginal[k] = this.__convert(k, data[k]);
                } else {
                    this.__valuesOriginal[k] = this.__convert(k, null);
                }
            }

            if (this.__KEY === -1 && !this.__isNew) {
                this.__isEntity = false;
            } else {
                this.__isEntity = true;
            }
            this.modifiedAttributes = [];
        };

        Entity.prototype.__getUnsaved = function __getUnsaved(returnKey) {
            var changeObject = {};

            if (this.__isModified) {
                if (!this.__isNew) {
                    changeObject.__KEY = this.__KEY;
                    changeObject.__STAMP = this.__STAMP;
                }

                for (var k in this.__attributes) {
                    if (this.__modified[k] !== undefined) {
                        changeObject[k] = this.__modified[k];
                    }
                }
            }
            if (returnKey) {
                changeObject.__KEY = this.__KEY;
            }

            return changeObject;
        };

        Entity.prototype.__update = function __update(data) {

            this.__setDefaults(data);

            if (!data.__KEY) {
                this.__original = {};
                this.__values = {};
                this.__valuesOriginal = {};
                this.__modified = {};
                this.__isNew = false;
                this.__isModified = false;
                this.__isEntity = false;
            }
        };

        Entity.prototype.__refreshOnly = function __refreshOnly(data) {
            this.__KEY = data.__KEY;
            this.__STAMP = data.__STAMP;

            for (var k in this.__attributes) {
                if (data[k]) {
                    this.__values[k] = this.__convert(k, data[k]);
                    this.__valuesOriginal = this.__convert(k, data[k]);
                } else {
                    this.__values[k] = null;
                }
            }

            if (this.__KEY === -1 && !this.__isNew) {
                this.__isEntity = false;
            } else {
                this.__isEntity = true;
            }
        };

        return Entity;
    }();
});