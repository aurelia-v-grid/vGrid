import { WakRestApi, RequestOptions } from './wakInterfaces';

export class WakDirectory {
    public restApi: WakRestApi;
    public username: any;

    constructor(restApi: WakRestApi) {
        this.restApi = restApi;
        this.username = this.getCookie('username');
    }

    public getCookie(cname: any) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    public currentUser() {
        return new Promise((resolve, reject) => {

            let dataURI = '/rest/$directory/currentUser';

            let requestOptions: RequestOptions = {
                body: null,
                method: 'get'
            };

            this.restApi.callServer(dataURI, requestOptions).then((data: any) => {
                resolve(data);
            }).catch((err: any) => {
                reject({ error: err });
            });

        });
    }

    public currentUserBelongsTo(groups: string[]) {
        return new Promise((resolve, reject) => {

            let dataURI = '/rest/$directory/currentUserBelongsTo';

            let requestOptions = {
                body: groups,
                method: 'post'
            };

            this.restApi.callServer(dataURI, requestOptions).then((data: any) => {
                resolve(data);
            }).catch((err: any) => {
                reject({ error: err });
            });

        });
    }

    public login(username: string, password: string, duration: number) {
        return new Promise((resolve, reject) => {

            let dataURI = '/rest/$directory/login';

            let requestOptions = {
                body: [username, password, duration || 3600],
                method: 'post'
            };

            this.restApi.callServer(dataURI, requestOptions).then((data: any) => {
                document.cookie = 'username=' + username;
                this.username = username;
                resolve(data);
            }).catch((err: any) => {
                reject({ error: err });
            });

        });
    }

    public logout() {
        return new Promise((resolve, reject) => {

            let dataURI = '/rest/$directory/logout';

            let requestOptions: RequestOptions = {
                body: null,
                method: 'get'
            };

            this.restApi.callServer(dataURI, requestOptions).then((data: any) => {
                document.cookie = 'username=';
                this.username = '';
                resolve(data);
            }).catch((err: any) => {
                reject({ error: err });
            });

        });
    }
}
