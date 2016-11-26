

interface RequestOptions {
    body: any;
    method: any;
}

export class WakDirectory {
    public restApi: any;
    public username: any;

    constructor(restApi: any) {
        this.restApi = restApi;
        this.username = this.getCookie('username');
    }


    public getCookie(cname: any) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
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




    public currentUserBelongsTo(groups: any) {
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





    public login(username: any, password: any, duration: any) {
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



    /*public loginByKey(name: any, key: any) {
        /// todo
    }

    public loginByPassword(name: any, key: any) {
        /// todo
    }*/



}