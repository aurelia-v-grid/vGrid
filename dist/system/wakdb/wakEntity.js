System.register(["./wakDataSource"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var wakDataSource_1, WakEntity;
    return {
        setters: [
            function (wakDataSource_1_1) {
                wakDataSource_1 = wakDataSource_1_1;
            }
        ],
        execute: function () {
            WakEntity = (function () {
                function WakEntity(data, attributes, baseUrl) {
                    data = data === undefined || data === null ? {} : data;
                    this.baseUrl = baseUrl;
                    attributes = attributes === undefined || attributes === null ? {} : attributes;
                    this.__attributes = attributes;
                    this.__setDefaults(data);
                    this.__setGetterSetters();
                }
                WakEntity.prototype.__setGetterSetters = function () {
                    var _this = this;
                    var attributeArray = [];
                    for (var k in this.__attributes) {
                        if (this.__attributes.hasOwnProperty(k)) {
                            attributeArray.push(k);
                        }
                    }
                    attributeArray.forEach(function (attributeName) {
                        Object.defineProperty(_this, attributeName, {
                            set: function (value) {
                                var save = true;
                                var type = _this.__attributes[attributeName].type;
                                var kind = _this.__attributes[attributeName].kind;
                                var newValue;
                                var oldValue;
                                var index;
                                try {
                                    if (kind !== 'alias') {
                                        switch (type) {
                                            case 'long':
                                            case 'long64':
                                            case 'number':
                                            case 'word':
                                            case 'byte':
                                                index = _this.modifiedAttributes.indexOf(attributeName);
                                                newValue = value !== '' ? value * 1 : 0;
                                                if (newValue !== _this.__valuesOriginal[attributeName]) {
                                                    _this.__isModified = true;
                                                    _this.__modified[attributeName] = value;
                                                    if (index === -1) {
                                                        _this.modifiedAttributes.push(attributeName);
                                                    }
                                                }
                                                else {
                                                    if (index !== -1) {
                                                        _this.modifiedAttributes.splice(index, 1);
                                                    }
                                                    _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;
                                                    _this.__modified[attributeName] = undefined;
                                                }
                                                break;
                                            case 'bool':
                                                index = _this.modifiedAttributes.indexOf(attributeName);
                                                oldValue = _this.__checkBool(_this.__original[attributeName]);
                                                newValue = _this.__checkBool(value);
                                                if (oldValue.toString() !== newValue.toString()) {
                                                    _this.__isModified = true;
                                                    _this.__modified[attributeName] = value ? 'true' : 'false';
                                                    if (index === -1) {
                                                        _this.modifiedAttributes.push(attributeName);
                                                    }
                                                }
                                                else {
                                                    if (index !== -1) {
                                                        _this.modifiedAttributes.splice(index, 1);
                                                    }
                                                    _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;
                                                    _this.__modified[attributeName] = undefined;
                                                }
                                                break;
                                            case 'date':
                                                index = _this.modifiedAttributes.indexOf(attributeName);
                                                if (value === 'Invalid date' || value === '') {
                                                    if (value.toString() !== _this.__valuesOriginal[attributeName].toString()) {
                                                        _this.__isModified = true;
                                                        _this.__modified[attributeName] = null;
                                                        if (index === -1) {
                                                            _this.modifiedAttributes.push(attributeName);
                                                        }
                                                    }
                                                    else {
                                                        if (index !== -1) {
                                                            _this.modifiedAttributes.splice(index, 1);
                                                        }
                                                        _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;
                                                        _this.__modified[attributeName] = undefined;
                                                    }
                                                }
                                                else {
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
                                                                _this.__modified[attributeName] = day + '!' + month + '!' + year;
                                                            }
                                                            else {
                                                                _this.__modified[attributeName] = new Date(value).toISOString();
                                                            }
                                                            if (index === -1) {
                                                                _this.modifiedAttributes.push(attributeName);
                                                            }
                                                        }
                                                        else {
                                                            if (index !== -1) {
                                                                _this.modifiedAttributes.splice(index, 1);
                                                            }
                                                            _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;
                                                            _this.__modified[attributeName] = undefined;
                                                        }
                                                    }
                                                    catch (e) {
                                                    }
                                                }
                                                break;
                                            case 'image':
                                                break;
                                            case 'uuid':
                                            case 'string':
                                                index = _this.modifiedAttributes.indexOf(attributeName);
                                                if (value !== _this.__valuesOriginal[attributeName]) {
                                                    _this.__isModified = true;
                                                    _this.__modified[attributeName] = value;
                                                    if (index === -1) {
                                                        _this.modifiedAttributes.push(attributeName);
                                                    }
                                                }
                                                else {
                                                    if (index !== -1) {
                                                        _this.modifiedAttributes.splice(index, 1);
                                                    }
                                                    _this.__isModified = _this.modifiedAttributes.length > 0 || _this.__isNew;
                                                    _this.__modified[attributeName] = undefined;
                                                }
                                                break;
                                            case 'object':
                                                if (JSON.stringify(value) !== JSON.stringify(_this.__original[attributeName])) {
                                                    _this.__isModified = true;
                                                    _this.__modified[attributeName] = value;
                                                }
                                                break;
                                            case 'blob':
                                                break;
                                            case 'duration':
                                                break;
                                            default:
                                                save = false;
                                                index = _this.modifiedAttributes.indexOf(attributeName);
                                                if (kind === 'relatedEntity') {
                                                    if (value instanceof wakDataSource_1.WakDataSource) {
                                                        if (type === value.classname) {
                                                            if (value.entity) {
                                                                if (value.entity.__KEY) {
                                                                    _this.__modified[attributeName] = {
                                                                        __KEY: value.entity.__KEY
                                                                    };
                                                                    _this.__isModified = true;
                                                                    if (index === -1) {
                                                                        _this.modifiedAttributes.push(attributeName);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (value === null) {
                                                            _this.__isModified = true;
                                                            _this.__modified[attributeName] = value;
                                                            if (index === -1) {
                                                                _this.modifiedAttributes.push(attributeName);
                                                            }
                                                        }
                                                        else {
                                                            if (value.__KEY) {
                                                                _this.__modified[attributeName] = {
                                                                    __KEY: value.__KEY
                                                                };
                                                                _this.__isModified = true;
                                                                if (index === -1) {
                                                                    _this.modifiedAttributes.push(attributeName);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                        }
                                    }
                                    if (save) {
                                        _this.__values[attributeName] = value;
                                    }
                                }
                                catch (err) {
                                    console.warn('catch setter entity');
                                }
                            },
                            get: function () {
                                return _this.__values[attributeName];
                            }
                        });
                    });
                };
                WakEntity.prototype.bindWithKey = function (attributeName, key) {
                    if (key) {
                        this.__modified[attributeName] = {
                            __KEY: key
                        };
                        this.__isModified = true;
                        var index = this.modifiedAttributes.indexOf(attributeName);
                        if (index === -1) {
                            this.modifiedAttributes.push(attributeName);
                        }
                    }
                };
                WakEntity.prototype.__checkBool = function (value) {
                    if (value == null || value === undefined) {
                        value = false;
                    }
                    else {
                        if (typeof (value) === 'boolean') {
                            value = value;
                        }
                        else {
                            if (typeof (value) === 'string') {
                                if (value.toUpperCase() === 'TRUE') {
                                    value = true;
                                }
                                else {
                                    value = false;
                                }
                            }
                        }
                    }
                    return value;
                };
                WakEntity.prototype.__convert = function (attributeName, value) {
                    var returnValue = value;
                    try {
                        switch (this.__attributes[attributeName].type) {
                            case 'long':
                            case 'long64':
                            case 'number':
                            case 'word':
                            case 'byte':
                                returnValue = returnValue ? returnValue * 1 : 0;
                                break;
                            case 'bool':
                                returnValue = this.__checkBool(returnValue);
                                break;
                            case 'date':
                                if (returnValue !== null && returnValue !== undefined) {
                                    if (this.__attributes[attributeName].simpleDate) {
                                        var args = returnValue.split('!');
                                        returnValue = new Date(parseInt(args[2], 10), parseInt(args[1], 10) - 1, parseInt(args[0], 10));
                                    }
                                    else {
                                        returnValue = new Date(returnValue);
                                    }
                                }
                                break;
                            case 'image':
                                returnValue = returnValue ? this.baseUrl + returnValue.__deferred.uri : '';
                                break;
                            case 'uuid':
                            case 'string':
                                returnValue = returnValue ? returnValue : '';
                                break;
                            case 'object':
                                returnValue = returnValue ? returnValue : {};
                                break;
                            case 'blob':
                                break;
                            case 'duration':
                                break;
                            default:
                        }
                        return returnValue;
                    }
                    catch (err) {
                        console.warn('catch setter entity');
                    }
                };
                WakEntity.prototype.__setDefaults = function (data) {
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
                        if (data.hasOwnProperty(k)) {
                            this.__original[k] = data[k];
                        }
                    }
                    this.__modified = {};
                    for (var k in this.__attributes) {
                        if (data[k]) {
                            this.__values[k] = this.__convert(k, data[k]);
                            this.__valuesOriginal[k] = this.__convert(k, data[k]);
                        }
                        else {
                            this.__valuesOriginal[k] = this.__convert(k, null);
                        }
                    }
                    if (this.__KEY === -1 && !this.__isNew) {
                        this.__isEntity = false;
                    }
                    else {
                        this.__isEntity = true;
                    }
                    this.modifiedAttributes = [];
                };
                WakEntity.prototype.__getUnsaved = function (returnKey) {
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
                WakEntity.prototype.__update = function (data) {
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
                WakEntity.prototype.__refreshOnly = function (data) {
                    this.__KEY = data.__KEY;
                    this.__STAMP = data.__STAMP;
                    for (var k in this.__attributes) {
                        if (data[k]) {
                            this.__values[k] = this.__convert(k, data[k]);
                            this.__valuesOriginal = this.__convert(k, data[k]);
                        }
                        else {
                            this.__values[k] = null;
                        }
                    }
                    if (this.__KEY === -1 && !this.__isNew) {
                        this.__isEntity = false;
                    }
                    else {
                        this.__isEntity = true;
                    }
                };
                return WakEntity;
            }());
            exports_1("WakEntity", WakEntity);
        }
    };
});

//# sourceMappingURL=wakEntity.js.map
