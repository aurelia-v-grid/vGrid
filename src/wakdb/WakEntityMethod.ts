import { WakDataSource } from './wakInterfaces';

export class WakEntityMethod {
    public source: WakDataSource;
    public name: string;

    constructor(source: WakDataSource, name: string) {
        this.source = source;
        this.name = name;
    }

    public execute(params: any, options: any) {
        return new Promise((resolve, reject) => {
            this.source.__queueRequest((done: any) => {
                let entity = this.source.entity;
                if (entity) {
                    entity = this.source.entity[this.source.key];
                }

                if (entity) {

                    options = options === undefined ? {} : options;
                    let asPost = true === options.asPost;
                    let dataURI =
                        this.source.dataURI +
                        '(' + this.source.entity[this.source.key] + ')' + '/' +
                        this.name;

                    let restString = this.source.restApi.generateRestString(dataURI, {
                        params: asPost ? null : params
                    });

                    let requestOptions = {
                        body: asPost ? params : null,
                        method: asPost ? 'post' : 'get'
                    };

                    this.source.restApi.callServer(restString, requestOptions).then((data: any) => {
                        done();
                        resolve(data);
                    }).catch((err: any) => {
                        done();
                        reject(err);
                    });

                } else {
                    done();
                    reject({ message: 'no currentEntity' });
                }
            });
        });
    }

}
