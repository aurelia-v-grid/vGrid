import { inject, customAttribute, bindable } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { BindingContext, OverrideContext } from '../../interfaces';

// todo: look at adding option to disable this ?

/**
 * Custom attribute "v-onchange"
 * Only triggers new data update on row when change event happen
 * Used by default by the simple html setup
 * Can be used with custom html
 * 
 */
@customAttribute('v-data-handler')
@inject(Element, VGrid)
export class VGridAttributesDataHandler {
    @bindable private field: string;
    @bindable private value: string;
    @bindable private display: string;
    @bindable private edit: string;
    private vGrid: VGrid;
    private element: HTMLElement;
    private bindingContext: BindingContext;
    private overrideContext: OverrideContext;
    private displayFormater: { fromView: Function; toView: Function };
    private editFormater: { fromView: Function; toView: Function };
    private tempValue: any;



    constructor(element: HTMLElement, vGrid: VGrid) {
        this.element = element;
        this.vGrid = vGrid;
    }



    /**
     * todo description
     * 
     */
    public attached() {
        this.element.onchange = this.onChanged.bind(this);
        this.element.onfocus = this.onFocus.bind(this);
        this.element.onblur = this.onBlur.bind(this);
    }



    /**
     * value changed handler
     * 
     */
    public valueChanged(newValue: any) {
        (this.element as HTMLInputElement).value = this.displayFormater.toView(newValue);
    }



    /**
     * onfocus event handler
     * 
     */
    public onFocus() {
        (this.element as HTMLInputElement).value = this.editFormater.toView(this.value);
        this.tempValue = (this.element as HTMLInputElement).value;
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    }



    /**
     * onblur event handler
     * 
     */
    public onBlur() {
        if (this.tempValue === (this.element as HTMLInputElement).value) {
                this.onChanged();
        }
    }



    /**
     * onchange event handler
     * 
     */
    public onChanged() {
        this.value = this.editFormater.fromView((this.element as HTMLInputElement).value);
        this.bindingContext.rowRef[this.field] = this.value;
        (this.element as HTMLInputElement).value = this.displayFormater.toView(this.value);
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    }



    /**
     * when attributes binds, get valueconverters and set value
     * 
     */
    public bind(bindingContext: BindingContext, overrideContext: OverrideContext): void {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.displayFormater = this.valueConverters(this.display);
        this.editFormater = this.valueConverters(this.edit);
        (this.element as HTMLInputElement).value = this.displayFormater.toView(this.field);
    }



    /**
     * get valueConverters and bind to grid resources
     * 
     */
    private valueConverters(value: string): { fromView: Function; toView: Function } {
        let valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    }
}
