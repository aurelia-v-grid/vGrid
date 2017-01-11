import { HttpClient } from 'aurelia-fetch-client';
import { WakRestUtil } from './wakRestUtil';
import { WakDirectory } from './wakDirectory';
export declare class WakRestApi {
    rest: WakRestUtil;
    ready: boolean;
    loadFailed: boolean;
    name: string;
    baseURL: string;
    catalogURL: string;
    httpClient: HttpClient;
    directory: WakDirectory;
    pageSize: number;
    timeout: number;
    classes: any;
    sources: any;
    constructor();
    generateRestString(url: string, options: any): any;
    loaded(): Promise<{}>;
    callServer(url: string, options?: any): Promise<{}>;
    configure(config: any): Promise<{}>;
    configureHttp(): void;
    createDataSources(sources: any): Promise<{}>;
    localCatalog(data: any): Promise<{}>;
    fetchCatalog(): Promise<{}>;
}
