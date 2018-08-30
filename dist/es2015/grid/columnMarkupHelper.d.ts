import { ColConfigInterface } from '../interfaces';
export declare class ColumnMarkupHelper {
    generate(colConfig: ColConfigInterface[]): void;
    private processColumns;
    private createHeaderTemplate;
    private createRowTemplate;
    private getAttribute;
    private checkAttribute;
    private createImageRowMarkup;
    private createInputRowMarkup;
    private createInputHeaderMarkup;
    private createLabelMarkup;
}
