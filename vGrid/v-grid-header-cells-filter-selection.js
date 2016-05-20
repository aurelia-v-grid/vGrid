/*****************************************************************************************************************
 *    VGridHeaderFilter
 *    Custom element for use in the header/column container (v-grid-header-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {bindable, customElement} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {VGrid} from './v-grid';


@customElement('v-grid-filter-selection')
@inject(Element, VGrid)
export class VGridHeaderFilterSelection {


  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.vGridConfig = vGrid.vGridConfig;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(parent) {
    this.parent = parent;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  attached() {
    //create a container and and add it
    var container = document.createElement("div");
    this.element.appendChild(container);
    this.element.style.height = "100%";

    var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";
    if (dragHandle) {
      container.classList.add(dragHandle)
    }

    //set the standard styles to the container instead of checkbox, (for the white backgorunbd and borders)
    this.setStyle(container);

    //custom for the selection
    container.classList.remove(this.vGridConfig.css.filterInputTop);
    container.style.height = "100%";

    //create new input and append it to container
    this.content = document.createElement("input");
    container.appendChild(this.content);


    this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
    this.content.value = this.filterValue ? this.filterValue : "";


    this.content.type = "checkbox";
    this.content.style.height = "100%";
    this.content.style.display = "block";
    this.content.style.margin = "auto";
    this.content.style.position = "initial";
    this.content.classList.add(this.vGridConfig.css.filterHandle)

    this.state = 3;
    this.content.style.opacity = 1;


    this.content.onclick = ()=> {
      if (this.content.checked) {
        this.vGrid.vGridSelection.selectAll();
      } else {
        this.vGrid.vGridSelection.deSelectAll();
      }
      this.vGrid.vGridGenerator.rebuildColumnsRows()
    }


  }


  /*****************************************************
   *  setting basic styles/classes
   ******************************************************/
  setStyle(element) {
    var addClass = (name)=> {
      element.classList.add(name)
    };

    var setStyleTag = (tag, value)=> {
      element.style[tag] = value;
    };

    addClass(this.vGridConfig.css.cellContent);
    addClass(this.vGridConfig.css.filterInputTop);
    addClass(this.vGridConfig.css.filterHandle);
    setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
  }


}
