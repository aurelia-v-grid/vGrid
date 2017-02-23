import { inject, customAttribute} from 'aurelia-framework';
import { VGrid } from '../v-grid';
import { BindingContextInterface, OverrideContextInterface} from '../../interfaces';

// todo: look at adding option to disable this ?

/**
 * Custom attribute "v-onchange"
 * Only triggers new data update on row when change event happen
 * Used by default by the simple html setup
 * Can be used with custom html
 * 
 */
@customAttribute('v-onchange')
@inject(Element, VGrid)
export class VGridAttributesOnChange {
    private vGrid: VGrid;
    private element: HTMLElement;
    private bindingContext: BindingContextInterface;
    private overrideContext: OverrideContextInterface;



    constructor(element: HTMLElement, vGrid: VGrid) {
        this.element = element;
        this.vGrid = vGrid;
    }



  /**
   * todo description
   * 
   */
    public attached() {
        if (!this.element.onchange) {
            this.element.onchange = this.onChanged.bind(this);
        }
    }



  /**
   * todo description
   * 
   */
    public onChanged() {
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    }



  /**
   * todo description
   * 
   */
    public bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    }
}
