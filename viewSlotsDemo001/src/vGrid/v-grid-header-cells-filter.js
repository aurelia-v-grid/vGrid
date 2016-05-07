import {inject, customElement, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'


@customElement('v-grid-filter')
@inject(Element, VGrid)
export class VGridHeaderFilter {
  @bindable type;
  @bindable filterValue;


  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.vGridConfig = vGrid.vGridConfig;
  }

  filterValueChanged(newValue, oldValue) {
    this.content.value = newValue;
    this.content.onchange({keyKode: 13})
  }


  bind(parent) {
    this.parent = parent;
  }


  attached() {
    this.content = this.element.children[0];
    this.setStyle();
    this.content.onkeyup = this.parent.onKeyUpEventOnFilter.bind(this.parent);
    this.content.onchange = this.parent.onChangeEventOnFilter.bind(this.parent);
    this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
    this.content.value = this.filterValue ? this.filterValue : "";
  }


  setStyle() {

    var addClass = (name)=> {
      this.content.classList.add(name)
    };

    var setStyleTag = (tag, value)=> {
      this.content.style[tag] = value;
    };

    var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";

    switch (this.type) {
      case "filterTop":
        addClass(this.vGridConfig.css.cellContent);
        addClass(this.vGridConfig.css.filterInputTop);
        addClass(this.vGridConfig.css.filterHandle);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      case "filterBottom":
        addClass(this.vGridConfig.css.cellContent);
        addClass(this.vGridConfig.css.filterInputBottom);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      default:
        break;
    }
  }


}
