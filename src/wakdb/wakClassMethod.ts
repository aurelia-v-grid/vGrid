import { WakDataSource } from './wakInterfaces';

export class WakClassMethod {
    private source: WakDataSource;
    private name: string;

    constructor(source: WakDataSource, name: string) {
        this.source = source;
        this.name = name;
    }

    public execute(params: any, options: any) {
        return new Promise((resolve, reject) => {

            options = options === undefined ? {} : options;
            let asPost = true === options.asPost;
            let dataURI = this.source.dataURI + '/' + this.name;

            let restString = this.source.restApi.generateRestString(dataURI, {
                params: options.asPost ? null : params
            });

            let requestOptions = {
                body: asPost ? params : null,
                method: asPost ? 'post' : 'get'
            };

            this.source.restApi.callServer(restString, requestOptions).then((data: any) => {
                resolve(data);
            }).catch((err: any) => {
                reject(err);
            });

        });
    }

}
