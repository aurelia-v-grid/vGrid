export declare class WakRestApi {
    rest: any;
    ready: any;
    loadFailed: any;
    name: any;
    baseURL: any;
    catalogURL: any;
    httpClient: any;
    directory: any;
    pageSize: any;
    timeout: any;
    classes: any;
    sources: any;
    constructor();
    generateRestString(url: any, options: any): any;
    loaded(): Promise<{}>;
    callServer(url: any, options: any): Promise<{}>;
    configure(config: any): Promise<{}>;
    configureHttp(): void;
    createDataSources(sources: any): Promise<{}>;
    localCatalog(data: any): Promise<{}>;
    fetchCatalog(): Promise<{}>;
}
