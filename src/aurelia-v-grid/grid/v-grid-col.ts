import {inject, noView, customElement, bindable, processContent, TargetInstruction} from 'aurelia-framework';
import {VGrid} from './v-grid';

@noView()
@processContent((compiler, resources, element, instruction) => {


  let headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
  if (headerTemplateHtml !== '') {
    instruction.colHeaderTemplate = headerTemplateHtml;
  }

  let rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
  if (rowTemplateHtml !== '') {
    instruction.colRowTemplate = rowTemplateHtml;
  }

  element.innerHTML = '';

  // we want to get this css attribute and use if later
  let css = element.getAttribute('col-css');
  if (css) {
    instruction.colCss = css;
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




  @bindable({attribute: 'col-width'}) private colWidth;
  @bindable({attribute: 'col-field'}) private colField;
  @bindable({attribute: 'col-header-name'}) private colHeaderName;
  @bindable({attribute: 'col-sort'}) private colSort;
  @bindable({attribute: 'col-pin-left'}) private colPinLeft;
  @bindable({attribute: 'col-pin-right'}) private colPinRight;
  @bindable({attribute: 'col-filter'}) private colFilter;
  @bindable({attribute: 'col-filter-top'}) private colFilterTop;
  @bindable({attribute: 'col-add-label-attributes'}) private colAddLabelAttributes;
  @bindable({attribute: 'col-add-filter-attributes'}) private colAddFilterAttributes;
  @bindable({attribute: 'col-add-row-attributes'}) private colAddRowAttributes;
  @bindable({attribute: 'col-type'}) private colType;


  constructor(element, vGrid, targetInstruction) {
    this.vGrid = vGrid;
    this.element = element;
    this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
    this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
    this.colCss = targetInstruction.elementInstruction.colCss;
  }


  public bind(bindingContext, overrideContext): void {
    this.vGrid.colConfig.push({
      colWidth: this.colWidth ? this.colWidth * 1 : 100,
      colRowTemplate: this.colRowTemplate,
      colHeaderTemplate: this.colHeaderTemplate,
      colField: this.colField,
      colPinLeft: this.colPinLeft === 'true' ? true : false,
      colPinRight: this.colPinRight === 'true' ? true : false,
      colHeaderName: this.colHeaderName,
      colAddLabelAttributes: this.colAddLabelAttributes,
      colAddFilterAttributes: this.colAddFilterAttributes,
      colAddRowAttributes: this.colAddRowAttributes,
      colSort: this.colSort,
      colFilter: this.colFilter,
      colFilterTop: this.colFilterTop === 'true' ? true : false,
      colCss: this.colCss,
      colType: this.colType || 'text'
    });


  }


}
