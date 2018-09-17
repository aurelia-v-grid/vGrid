import { bindable, customElement } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { VGrid } from './v-grid';
import {
  ColConfigInterface,
  BindingContextInterface,
  OverrideContextInterface
} from '../interfaces';



/**
 * Custom element <v-grid-col>
 * This is used for creating the simple html columns
 *
 */
@customElement('v-grid-col')
@inject(Element, VGrid)
export class VGridElementColConfig {
  private vGrid: VGrid;
  private element: Element;
  private colRowTemplate: string;
  private colHeaderTemplate: string;
  private colCss: string;
  private bindingContext: BindingContextInterface;
  private overrideContext: OverrideContextInterface;

  @bindable({ attribute: 'col-width' }) private colWidth: number;
  @bindable({ attribute: 'col-field' }) private colField: string;
  @bindable({ attribute: 'col-header-name' }) private colHeaderName: string;
  @bindable({ attribute: 'col-sort' }) private colSort: string;
  @bindable({ attribute: 'col-pin-left' }) private colPinLeft: boolean;
  @bindable({ attribute: 'col-pin-right' }) private colPinRight: boolean;
  @bindable({ attribute: 'col-filter' }) private colFilter: string;
  @bindable({ attribute: 'col-filter-top' }) private colFilterTop: boolean;
  @bindable({ attribute: 'col-add-label-attributes' }) private colAddLabelAttributes: string;
  @bindable({ attribute: 'col-add-filter-attributes' }) private colAddFilterAttributes: string;
  @bindable({ attribute: 'col-add-row-attributes' }) private colAddRowAttributes: string;
  @bindable({ attribute: 'col-type' }) private colType: string;
  @bindable({ attribute: 'col-filter-menu' }) private colFilterMenu: string;
  @bindable({ attribute: 'col-label-menu' }) private colLabelMenu: string;
  @bindable({ attribute: 'col-row-menu' }) private colRowMenu: string;
  @bindable({ attribute: 'col-hidden' }) private colHidden: boolean;
  @bindable({ attribute: 'col-drag-drop' }) private colDragDrop: string;
  @bindable({ attribute: 'col-resizeable' }) private colResizeable: string;
  @bindable({ attribute: 'col-display-edit' }) private colDisplayEdit: string;



  constructor(element: Element, vGrid: VGrid) {
    this.vGrid = vGrid;
    this.element = element;

    let headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
    let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
    if (headerTemplateHtml !== '') {
      this.colHeaderTemplate = headerTemplateHtml;
    }

    // check if any row template is added, if so add to instruction for use
    let rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
    let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
    if (rowTemplateHtml !== '') {
      this.colRowTemplate = rowTemplateHtml;
    }

    // clear the innerhtml, not needed, and we dont want it there messing up stuff
    element.innerHTML = '';

    // we want to get this css attribute and use if later
    let css = element.getAttribute('col-css');
    if (css) {
      this.colCss = css;
    }
  }



  /**
   * When bind runs we get the bindable attributes & template markup if any from <v-grid-col>
   * We add this to the vGrid class colConfig to use later when grid is generated
   *
   */
  public bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    if (this.vGrid.newGrid) {
      this.vGrid.colConfig.push(({
        colWidth: this.colWidth ? this.colWidth * 1 : 100,
        colRowTemplate: this.colRowTemplate,
        colHeaderTemplate: this.colHeaderTemplate,
        colField: this.colField,
        colPinLeft: this.checkBool(this.colPinLeft),
        colPinRight: this.checkBool(this.colPinRight),
        colHeaderName: this.colHeaderName,
        colFilterMenu: this.colFilterMenu,
        colLabelMenu: this.colLabelMenu,
        colRowMenu: this.colRowMenu,
        colHidden: this.checkBool(this.colHidden),
        colDragDrop: this.colDragDrop,
        colResizeable: this.colResizeable,
        colAddLabelAttributes: this.colAddLabelAttributes,
        colAddFilterAttributes: this.colAddFilterAttributes,
        colAddRowAttributes: this.colAddRowAttributes,
        colSort: this.colSort,
        colDisplayEdit: this.colDisplayEdit,
        colFilter: this.colFilter,
        colFilterTop: this.checkBool(this.colFilterTop),
        colCss: this.colCss,
        colType: this.colType || 'text'
      } as ColConfigInterface));
    }
  }


  /**
   * Checks bool value and return real boolean
   *
   */
  private checkBool(value: string | boolean): boolean {
    if (typeof value === 'string') {
      value = value.toLowerCase();
    }

    switch (true) {
      case value === 'true':
      case value === true:
        value = true;
        break;
      case value === 'false':
      case value === false:
        value = false;
        break;
      default:
        value = false;
        break;
    }
    return value;
  }

}
