import { WakRestApi } from './wakInterfaces';
export declare class WakDirectory {
    restApi: WakRestApi;
    username: any;
    constructor(restApi: WakRestApi);
    getCookie(cname: any): string;
    currentUser(): Promise<{}>;
    currentUserBelongsTo(groups: string[]): Promise<{}>;
    login(username: string, password: string, duration: number): Promise<{}>;
    logout(): Promise<{}>;
}
