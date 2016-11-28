export declare class WakDirectory {
    restApi: any;
    username: any;
    constructor(restApi: any);
    getCookie(cname: any): string;
    currentUser(): Promise<{}>;
    currentUserBelongsTo(groups: any): Promise<{}>;
    login(username: any, password: any, duration: any): Promise<{}>;
    logout(): Promise<{}>;
}
