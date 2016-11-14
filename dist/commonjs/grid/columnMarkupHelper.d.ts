export declare class ColumnMarkupHelper {
    useCustomOnly: boolean;
    colConfig: Array<any>;
    constructor();
    generate(colConfig: Array<any>): void;
    processColumns(array: any): void;
    createHeaderTemplate(col: any): void;
    createRowTemplate(col: any): void;
    getAttribute: (value: any, capitalize: any) => any;
    checkAttribute(attribute: any): any;
    createImageRowMarkup(col: any): void;
    createInputRowMarkup(col: any): void;
    createInputHeaderMarkup(col: any): any;
    createLabelMarkup(col: any): string;
}
