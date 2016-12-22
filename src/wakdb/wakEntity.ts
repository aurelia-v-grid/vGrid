import { WakDataSource } from './wakDataSource';

export class WakEntity {
    public __attributes: any;
    public baseUrl: string;
    public modifiedAttributes: any;
    public __modified: any;
    public __isModified: boolean;
    public __original: any;
    public __valuesOriginal: any;
    public __isNew: any;
    public __values: any;
    public __KEY: any;
    public __STAMP: number;
    public __isEntity: boolean;

    constructor(data: any, attributes: any, baseUrl: string) {
        data = data === undefined || data === null ? {} : data;
        this.baseUrl = baseUrl;
        attributes = attributes === undefined || attributes === null ? {} : attributes;
        this.__attributes = attributes;
        this.__setDefaults(data);
        this.__setGetterSetters();

    }

    public __setGetterSetters() {
        let attributeArray = [];
        for (let k in this.__attributes) {
            if (this.__attributes.hasOwnProperty(k)) {
                attributeArray.push(k);
            }
        }
        attributeArray.forEach((attributeName) => {
            Object.defineProperty(this, attributeName, {
                set: (value: any) => {
                    let save = true;
                    let type = this.__attributes[attributeName].type;
                    let kind = this.__attributes[attributeName].kind;
                    // let readOnly = this.__attributes[attributeName].readOnly;
                    let newValue;
                    let oldValue;
                    let index;
                    // I need to check compared to storage type here
                    try {
                        if (kind !== 'alias') {
                            switch (type) {
                                case 'long':
                                case 'long64':
                                case 'number':
                                case 'word':
                                case 'byte':

                                    index = this.modifiedAttributes.indexOf(attributeName);
                                    newValue = value !== '' ? value * 1 : 0;
                                    if (newValue !== this.__valuesOriginal[attributeName]) {
                                        this.__isModified = true;
                                        this.__modified[attributeName] = value;
                                        if (index === -1) {
                                            this.modifiedAttributes.push(attributeName);
                                        }
                                    } else {
                                        if (index !== -1) {
                                            this.modifiedAttributes.splice(index, 1);
                                        }
                                        this.__isModified = this.modifiedAttributes.length > 0 || this.__isNew;
                                        this.__modified[attributeName] = undefined;
                                    }

                                    break;
                                case 'bool':
                                    index = this.modifiedAttributes.indexOf(attributeName);
                                    oldValue = this.__checkBool(this.__original[attributeName]);
                                    newValue = this.__checkBool(value);

                                    if (oldValue.toString() !== newValue.toString()) {
                                        this.__isModified = true;
                                        this.__modified[attributeName] = value ? 'true' : 'false';
                                        if (index === -1) {
                                            this.modifiedAttributes.push(attributeName);
                                        }
                                    } else {
                                        if (index !== -1) {
                                            this.modifiedAttributes.splice(index, 1);
                                        }
                                        this.__isModified = this.modifiedAttributes.length > 0 || this.__isNew;
                                        this.__modified[attributeName] = undefined;
                                    }

                                    break;

                                case 'date':
                                    index = this.modifiedAttributes.indexOf(attributeName);

                                    if (value === 'Invalid date' || value === '') {

                                        if (value.toString() !== this.__valuesOriginal[attributeName].toString()) {
                                            this.__isModified = true;
                                            this.__modified[attributeName] = null;
                                            if (index === -1) {
                                                this.modifiedAttributes.push(attributeName);
                                            }
                                        } else {
                                            if (index !== -1) {
                                                this.modifiedAttributes.splice(index, 1);
                                            }
                                            this.__isModified = this.modifiedAttributes.length > 0 || this.__isNew;
                                            this.__modified[attributeName] = undefined;
                                        }

                                    } else {
                                        try {
                                            let isDate = value instanceof Date && !isNaN(value.valueOf());
                                            let testDate = isDate ? value.toISOString() : new Date(value);
                                            // tslint:disable-next-line:max-line-length
                                            if (testDate.toString() !==  this.__valuesOriginal[attributeName].toString()) {
                                                this.__isModified = true;
                                                if (this.__attributes[attributeName].simpleDate) {
                                                    let tempDate = new Date(value);
                                                    let day = tempDate.getDate();
                                                    let month = tempDate.getMonth() + 1;
                                                    let year = tempDate.getFullYear();
                                                    this.__modified[attributeName] = day + '!' + month + '!' + year;
                                                } else {
                                                    this.__modified[attributeName] = new Date(value).toISOString();
                                                }
                                                if (index === -1) {
                                                    this.modifiedAttributes.push(attributeName);
                                                }
                                            } else {
                                                if (index !== -1) {
                                                    this.modifiedAttributes.splice(index, 1);
                                                }
                                                this.__isModified = this.modifiedAttributes.length > 0 || this.__isNew;
                                                this.__modified[attributeName] = undefined;
                                            }
                                        } catch (e) {
                                            // debugger;
                                        }
                                    }
                                    break;
                                case 'image':
                                    //
                                    // todo : need to check more what we get
                                    //
                                    break;
                                case 'uuid':
                                case 'string':
                                    index = this.modifiedAttributes.indexOf(attributeName);

                                    if (value !== this.__valuesOriginal[attributeName]) {
                                        this.__isModified = true;
                                        this.__modified[attributeName] = value;
                                        if (index === -1) {
                                            this.modifiedAttributes.push(attributeName);
                                        }
                                    } else {
                                        if (index !== -1) {
                                            this.modifiedAttributes.splice(index, 1);
                                        }
                                        this.__isModified = this.modifiedAttributes.length > 0 || this.__isNew;
                                        this.__modified[attributeName] = undefined;
                                    }
                                    break;
                                case 'object':
                                    if (JSON.stringify(value) !== JSON.stringify(this.__original[attributeName])) {
                                        this.__isModified = true;
                                        this.__modified[attributeName] = value;
                                    }
                                    break;
                                case 'blob':
                                    //
                                    // todo : need to check more what we get
                                    //
                                    break;
                                case 'duration':
                                    //
                                    // todo : need to check more what we get
                                    //
                                    break;
                                default:
                                    //
                                    // todo, can I check better if they go back ?
                                    //
                                    save = false;
                                    index = this.modifiedAttributes.indexOf(attributeName);

                                    if (kind === 'relatedEntity') {
                                        if (value instanceof WakDataSource) {
                                            if (type === value.classname) {
                                                if (value.entity) {
                                                    if (value.entity.__KEY) {
                                                        this.__modified[attributeName] = {
                                                            __KEY: value.entity.__KEY
                                                        };
                                                        this.__isModified = true;
                                                        if (index === -1) {
                                                            this.modifiedAttributes.push(attributeName);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            if (value === null) {
                                                this.__isModified = true;
                                                this.__modified[attributeName] = value;
                                                if (index === -1) {
                                                    this.modifiedAttributes.push(attributeName);
                                                }
                                            } else {
                                                if (value.__KEY) {
                                                    this.__modified[attributeName] = {
                                                        __KEY: value.__KEY
                                                    };
                                                    this.__isModified = true;
                                                    if (index === -1) {
                                                        this.modifiedAttributes.push(attributeName);
                                                    }
                                                }

                                            }
                                        }
                                    }
                            }
                        }
                        if (save) {
                            this.__values[attributeName] = value;
                        }
                    } catch (err) {
                        console.warn('catch setter entity');
                    }
                },
                get: () => {
                    return this.__values[attributeName];
                }
            });
        });
    }

    public bindWithKey(attributeName: string, key: any) {
        // now it should be possible to just set a object to it as long as it contains __KEY
        // this will be deleted...
        if (key) {
            this.__modified[attributeName] = {
                __KEY: key
            };
            this.__isModified = true;
            let index = this.modifiedAttributes.indexOf(attributeName);
            if (index === -1) {
                this.modifiedAttributes.push(attributeName);
            }
        }
    }

    public __checkBool(value: any) {
        if (value == null || value === undefined) {
            value = false;
        } else {
            if (typeof (value) === 'boolean') {
                value = value;
            } else {
                if (typeof (value) === 'string') {
                    if (value.toUpperCase() === 'TRUE') {
                        value = true;
                    } else {
                        value = false;
                    }
                }
            }
        }
        return value;
    }

    public __convert(attributeName: string, value: any) {
        let returnValue = value;
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
                            let args = returnValue.split('!');
                            returnValue = new Date(
                                parseInt(args[2], 10),
                                parseInt(args[1], 10) - 1,
                                parseInt(args[0], 10));

                        } else {
                            returnValue = new Date(returnValue);
                        }
                    }
                    break;
                case 'image':
                    // quick fix for now
                    returnValue = returnValue ? this.baseUrl + returnValue.__deferred.uri : '';
                    //
                    break;
                case 'uuid':
                case 'string':
                    returnValue = returnValue ? returnValue : '';

                    break;
                case 'object':
                    returnValue = returnValue ? returnValue : {};

                    break;
                case 'blob':
                    //
                    // todo : need to check more what we get
                    //
                    break;
                case 'duration':
                    //
                    // todo : need to check more what we get
                    //
                    break;
                default:
                // console.warn("storage type missing")
            }
            return returnValue;
        } catch (err) {
            console.warn('catch setter entity');
        }
    }

    public __setDefaults(data: any) {

        this.__KEY = data.__KEY;
        this.__STAMP = data.__STAMP;

        this.__isNew = data.__isNew ? true : false;
        this.__isModified = false;
        if (!this.__KEY) {
            this.__isModified = true;
            this.__KEY = -1;
        }

        if (!this.__isEntity) { // if exist from before
            this.__original = {};
            this.__values = {};
            this.__valuesOriginal = {};
        }

        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                this.__original[k] = data[k];
            }
        }

        this.__modified = {};
        for (let k in this.__attributes) {
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

    }

    public __getUnsaved(returnKey: any) {
        let changeObject: any = {};

        if (this.__isModified) {
            if (!this.__isNew) {
                changeObject.__KEY = this.__KEY;
                changeObject.__STAMP = this.__STAMP;
            }

            for (let k in this.__attributes) {
                if (this.__modified[k] !== undefined) {
                    changeObject[k] = this.__modified[k];
                }
            }
        }
        if (returnKey) {
            changeObject.__KEY = this.__KEY;
        }

        return changeObject;
    }

    public __update(data: any) {
        this.__setDefaults(data);
        // if no key, then this does not exist on server side any more
        if (!data.__KEY) {
            this.__original = {};
            this.__values = {};
            this.__valuesOriginal = {};
            this.__modified = {};
            this.__isNew = false;
            this.__isModified = false;
            this.__isEntity = false;
        }
    }

    public __refreshOnly(data: any) {
        this.__KEY = data.__KEY;
        this.__STAMP = data.__STAMP;
        for (let k in this.__attributes) {
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
    }
}
