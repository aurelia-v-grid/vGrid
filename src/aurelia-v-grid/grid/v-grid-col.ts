import { inject, noView, customElement, bindable, processContent, TargetInstruction } from 'aurelia-framework';
import { VGrid } from './v-grid';
import { ViewCompiler, ViewResources} from '../interfaces';


@noView()
@processContent((
  compiler: ViewCompiler,
  resources: ViewResources,
  element: HTMLElement,
  instruction: TargetInstruction) => {


  let headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
  if (headerTemplateHtml !== '') {
    (instruction as any).colHeaderTemplate = headerTemplateHtml;
  }

  let rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
  if (rowTemplateHtml !== '') {
    (instruction as any).colRowTemplate = rowTemplateHtml;
  }

  element.innerHTML = '';

  // we want to get this css attribute and use if later
  let css = element.getAttribute('col-css');
  if (css) {
    (instruction as any).colCss = css;
  }


})
@customElement('v-grid-col')
@inject(Element, VGrid, TargetInstruction)
export class VGridElementColConfig {
  private vGrid: VGrid;
  private element: Element;
  private colRowTemplate: string;
  private colHeaderTemplate: string;
  private colCss: string;




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


  constructor(element: Element, vGrid: VGrid, targetInstruction: TargetInstruction) {
    this.vGrid = vGrid;
    this.element = element;
    this.colRowTemplate = (targetInstruction.elementInstruction as any).colRowTemplate;
    this.colHeaderTemplate = (targetInstruction.elementInstruction as any).colHeaderTemplate;
    this.colCss = (targetInstruction.elementInstruction as any).colCss;
  }


  public bind(bindingContext: any, overrideContext: any): void {
    this.vGrid.colConfig.push({
      colWidth: this.colWidth ? this.colWidth * 1 : 100,
      colRowTemplate: this.colRowTemplate,
      colHeaderTemplate: this.colHeaderTemplate,
      colField: this.colField,
      colPinLeft: this.checkBool(this.colPinLeft),
      colPinRight: this.checkBool(this.colPinRight),
      colHeaderName: this.colHeaderName,
      colAddLabelAttributes: this.colAddLabelAttributes,
      colAddFilterAttributes: this.colAddFilterAttributes,
      colAddRowAttributes: this.colAddRowAttributes,
      colSort: this.colSort,
      colFilter: this.colFilter,
      colFilterTop: this.checkBool(this.colFilterTop),
      colCss: this.colCss,
      colType: this.colType || 'text'
    });

  }

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
