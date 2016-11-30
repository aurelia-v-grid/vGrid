import { WakRestApi } from './wakInterfaces';

export class WakDataClass {
    public name: any;
    public restApi: WakRestApi;
    public collectionName: string;
    public dataURI: string;
    public scope: string;
    public key: string;
    public attributes: any;
    public entityCollectionMethods: any;
    public entityMethods: any;
    public dataClassMethods: any;
    [key: string]: any;

    constructor(dataClass: any, restApi: WakRestApi) {
        let c = dataClass;
        let attributes = c.attributes;
        let methods = c.methods;

        // set restAPI
        this.restApi = restApi;

        // get main properties
        this.name = c.name;
        this.collectionName = c.collectionName;
        this.dataURI = c.dataURI;
        this.scope = c.scope;
        this.key = c.key[0].name;

        // get attributes
        this.attributes = {};
        if (attributes) {
            attributes.forEach((attribute: any) => {
                this.attributes[attribute.name] = {};
                for (let k in attribute) {
                    if (attribute.hasOwnProperty(k)) {
                        this.attributes[attribute.name][k] = attribute[k];
                    }
                }
            });
        }

        // get methods
        this.entityCollectionMethods = {};
        this.entityMethods = {};
        this.dataClassMethods = {};
        if (methods) {
            methods.forEach((method: any) => {
                this[method.applyTo + 'Methods'][method.name] = {};
                for (let k in method) {
                    if (method.hasOwnProperty(k)) {
                        this[method.applyTo + 'Methods'][method.name][k] = method[k];
                    }
                }
            });
        }

    }

    public query(queryString: string, options: any) {
        return new Promise((resolve, reject) => {

            options = options === undefined ? {} : options;

            let restString = this.restApi.generateRestString(this.dataURI, {
                top: options.pageSize || 40,
                filter: queryString,
                orderby: options.orderByArray || null,
                asArray: options.asArray || null,
                autoExpand: options.autoExpand || null,
                timeout: options.timeout || null,
                filterAttributes: options.filterAttributes || null,
                method: options.method || null
            });

            this.restApi.callServer(restString).then((data: any) => {

                resolve(data);
            }).catch((err: any) => {
                // done();
                reject({
                    error: err
                });
            });
        });
    }

    public save(data: any, options: any) {
        return new Promise((resolve, reject) => {
            options = options === undefined ? {} : options;

            let restString = this.restApi.generateRestString(this.dataURI, {
                method: 'update'
            });

            let requestOptions = {
                body: data,
                method: 'post'
            };

            this.restApi.callServer(restString, requestOptions).then((result: any) => {
                resolve(result);
            }).catch((err: any) => {
                reject({
                    error: err
                });
            });
        });
    }

}
