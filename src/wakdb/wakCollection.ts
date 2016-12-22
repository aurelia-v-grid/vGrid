import { WakEntity } from './wakEntity';

export class WakCollection {
    public baseUrl: string;
    public attributes: any;
    public rowno: number[];
    public keys: any[];
    public created: Date[];
    public data: any[];
    public length: number;
    public pages: number[];
    public addToSet: any[];
    public currentPage: number;
    public entityset: any;
    public options: any;
    public pagesFetching: any[];
    public entityModel: any;

    constructor(attributes: any[], baseUrl: string) {
        this.baseUrl = baseUrl;
        this.attributes = attributes;
        this.setDefaults();
    }

    public setDefaults() {
        this.rowno = [];
        this.keys = [];
        this.created = [];
        this.data = [];
        this.length = 0;
        this.pages = [];
        this.addToSet = [];
        this.currentPage = null;
        this.options = null;
        this.entityset = null;
        this.pagesFetching = [];

    }

    public clearCache() {
        return new Promise((resolve: any) => {
            let unsaved = this.getUnsaved();
            unsaved.forEach((unsavedEntity) => {
                let index = this.data.indexOf(unsavedEntity);
                this.rowno.splice(index, 1);
                this.created.splice(index, 1);
                this.data.splice(index, 1);
                this.keys.splice(index, 1);
                this.length--;
            });
            this.rowno = [];
            this.keys = [];
            this.created = [];
            this.data = [];
            this.pages = [];
            unsaved.forEach((unsavedEntity) => {
                this.rowno.push(this.length);
                this.created.push(new Date());
                this.data.push(unsavedEntity);
                this.keys.push(null);
                this.length++;
            });
            resolve();
        });
    }

    public getUnsaved() {
        let unsaved: any[] = [];
        this.data.forEach((entity) => {
            if (entity.__isNew) {
                unsaved.push(entity);
            }
        });
        return unsaved;
    }

    public replace(data: any) {
        data = data ? data : {};
        let unsaved = this.getUnsaved();
        this.setDefaults();
        this.length = data.__COUNT || 0;
        this.currentPage = data.__FIRST || 0;
        this.pages.push(data.__FIRST || 0);
        this.entityset = data.__ENTITYSET;
        this.entityModel = data.__entityModel;
        this.insertData(data);
        unsaved.forEach((unsavedEntity) => {
            this.rowno.push(this.length);
            this.created.push(new Date());
            this.data.push(unsavedEntity);
            this.keys.push(null);
            this.length++;
        });

    }

    public getRow(row: number) {
        let index;
        index = this.rowno.indexOf(row);
        let result = null;
        if (index !== -1) {
            result = this.data[index];
        }
        return result;
    }

    public getKey(key: any) {
        this.getRow(key);
    }

    public getRowFromKey(key: any) {
        let index = this.keys.indexOf(key);
        return this.rowno[index];
    }

    public getRowFromEntity(entity: any) {
        let index = this.data.indexOf(entity);
        return this.rowno[index];
    }

    public getModified() {
        let modified: any[] = [];
        this.data.forEach((row) => {
            if (row.__isModified) {
                modified.push(row);
            }
        });
        return modified;
    }

    public addRow() {
        return new Promise((resolve: any) => {
            this.rowno.push(this.length);
            this.created.push(new Date());
            this.data.push(new WakEntity({
                __isNew: true
            }, this.attributes, this.baseUrl));
            this.keys.push(null);
            let ent = this.data[this.length];
            this.length++;
            resolve(ent);
        });
    }

    public removeUnsavedRow(row: number) {
        let index = this.rowno.indexOf(row);
        this.rowno.splice(index, 1);
        this.created.splice(index, 1);
        this.data.splice(index, 1);
        this.keys.splice(index, 1);
        this.rowno.forEach((rowNo, index) => {
            if (rowNo > row) {
                this.rowno[index] = this.rowno[index] - 1;
            }
        });
        this.length--;
    }

    public getClosestPage(row: number, pageSize: number) {
        // we do not want weird requests, lets stick within page size all the time
        // else we will just get holes in cache
        let page = Math.floor(row / pageSize);
        return page * pageSize;
    }

    public add(data: any) {
        let index = this.pages.indexOf(data.__FIRST);
        if (index === -1) {
            this.pages.push(data.__FIRST);
        }
        this.insertData(data);
    }

    public setValueToRow(attribute: string, value: any, row: number) {
        let index = this.rowno.indexOf(row);
        if (index !== -1) {
            this.data[index][attribute] = value;
        }
    }

    public insertData(data: any) {
        // this.length = data.__COUNT;
        let unsaved = this.getUnsaved();
        unsaved.forEach((unsavedEntity) => {
            let index = this.data.indexOf(unsavedEntity);
            this.rowno.splice(index, 1);
            this.created.splice(index, 1);
            this.data.splice(index, 1);
            this.keys.splice(index, 1);
            this.length--;
        });

        this.currentPage = data.__FIRST;
        let count = -1;
        for (let i = data.__FIRST; i < data.__FIRST + data.__SENT; i++) {
            count++;
            let index = this.rowno.indexOf(i);
            if (index === -1) {
                this.rowno.push(i);
                this.created.push(new Date());
                this.data.push(new WakEntity(data.__ENTITIES[count], this.attributes, this.baseUrl));
                this.keys.push(data.__ENTITIES[count].__KEY);
            } else {
                this.rowno[index] = i;
                this.created[index] = new Date();
                this.data[index] = new WakEntity(data.__ENTITIES[count], this.attributes, this.baseUrl);
                this.keys[index] = data.__ENTITIES[count].__KEY;
            }
        }
        unsaved.forEach((unsavedEntity) => {
            this.rowno.push(this.length);
            this.created.push(new Date());
            this.data.push(unsavedEntity);
            this.keys.push(null);
            this.length++;
        });
    }

}
