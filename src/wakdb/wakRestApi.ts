import { HttpClient } from 'aurelia-fetch-client';
import { WakDataClass } from './wakDataClass';
import { WakDataSource } from './wakDataSource';
import { WakRestUtil } from './wakRestUtil';
import { WakDirectory } from './wakDirectory';

export class WakRestApi {
    public rest: WakRestUtil;
    public ready: boolean;
    public loadFailed: boolean;
    public name: string;
    public baseURL: string;
    public catalogURL: string;
    public httpClient: HttpClient;
    public directory: WakDirectory;
    public pageSize: number;
    public timeout: number;
    public classes: any;
    public sources: any;

    constructor() {
        this.rest = new WakRestUtil();
        this.ready = false;
        this.loadFailed = false;
    }

    public generateRestString(url: string, options: any) {
        return this.rest.generateRestString(url, options);
    }

    public loaded() {
        return new Promise((resolve: any) => {
            let waiting: any;
            waiting = () => {
                // console.log("waiting");
                setTimeout(() => {
                    if (this.ready) {
                        resolve();
                    } else {
                        if (this.loadFailed) {
                            throw 'restApi failed';
                        } else {
                            waiting();
                        }
                    }
                }, 100);

            };
            if (this.ready) {
                resolve();
            } else {
                waiting();
            }

        });
    }

    public callServer(url: string, options?: any) {
        if (!options) {
            options = {};
            options.method = 'get';
            options.body = null;
        } else {
            // options.body = options.body ? json(options.body) : null; will not work with directory
            options.body = options.body ? JSON.stringify(options.body) : null;
            options.method = options.method || 'get';
        }
        return new Promise((resolve, reject) => {
            let responseData: any;
            this.httpClient.fetch(this.baseURL + url, {
                method: options.method,
                body: options.body
            })
                .then((response: any) => {
                    responseData = response;
                    return response.json();
                })
                .then((data: any) => {
                    if (responseData.ok) { // need to check this more
                        resolve(data);
                    } else {
                        reject(data);
                    }

                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    public configure(config: any) {
        return new Promise((resolve, reject) => {
            this.name = config.name;
            this.baseURL = config.baseURL;
            this.catalogURL = '/rest/$catalog/$all';
            this.httpClient = new HttpClient();
            this.directory = new WakDirectory(this);
            this.pageSize = config.pageSize || 40;
            this.timeout = config.timeout || 3600 * 5;
            this.classes = {};
            this.sources = {};
            this.configureHttp();
            if (config.localConfig) {
                return this.localCatalog(config.localConfig)
                    .then(() => {
                        this.createDataSources(config.sources).then(() => {
                            // console.log("ready");
                            this.ready = true;
                        });
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        this.loadFailed = true;
                        reject({ error: err });
                    });
            } else {
                return this.fetchCatalog()
                    .then(() => {
                        this.createDataSources(config.sources).then(() => {
                            // console.log("ready");
                            this.ready = true;
                        });
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        this.loadFailed = true;
                        reject({ error: err });
                    });
            }
        });
    }

    public configureHttp() {
        this.httpClient.configure((config: any) => {
            config
                .withBaseUrl(this.baseURL)
                .withDefaults({
                    credentials: 'include',
                    mode: 'cors'
                });
        });
    }

    public createDataSources(sources: any) {
        return new Promise((resolve) => {
            sources.forEach((source: any) => {
                if (this.classes[source.dataClass]) {
                    this.sources[source.name] = new WakDataSource(this, source);
                } else {
                    throw ('class:' + source.dataClass + ' does not exsist');
                }

            });
            resolve();
        })
            .catch((err) => {
                throw ({ error: err });
            });
    }

    public localCatalog(data: any) {
        return new Promise((resolve, reject) => {
            let restAPI = this;
            let dataClasses = data.dataClasses;
            if (dataClasses.length) {
                dataClasses.forEach((dataClass: any) => {
                    this.classes[dataClass.className] = new WakDataClass(dataClass, restAPI);
                });
                resolve();
            } else {
                reject({ error: 'no dataclasses found in catalog' });
            }
        });
    }

    public fetchCatalog() {
        return new Promise((resolve: Function, reject: any) => {
            this.httpClient.fetch(this.catalogURL)
                .then((response: any) => {
                    return response.json();
                })
                .then((data: any) => {
                    let restAPI = this;
                    let dataClasses = data.dataClasses;
                    if (dataClasses.length) {
                        dataClasses.forEach((dataClass: any) => {
                            this.classes[dataClass.className] = new WakDataClass(dataClass, restAPI);
                        });
                        resolve();
                    } else {
                        reject({ error: 'no dataclasses found in catalog' });
                    }

                })
                .catch((err: any) => {
                    reject({ error: err });
                });
        });
    }

}
