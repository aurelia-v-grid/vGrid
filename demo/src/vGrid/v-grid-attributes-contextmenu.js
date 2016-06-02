/*****************************************************************************************************************
 *    ContextMenu
 *    This is where I create all the <v-grid> attibutes, and set then to vGridConfig
 *    Main idea/source https://github.com/callmenick/Custom-Context-Menu
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

import {inject, customAttribute, Optional} from 'aurelia-framework';
import {VGrid} from './v-grid';
import {Contextmenu} from './v-grid-contextmenu';


/*****************************************************
 *  context menu for header
 ******************************************************/
@customAttribute('v-header-menu')
@inject(Element, VGrid)
export class VGridHeaderMenu extends Contextmenu {
  classToOpenOn = "vGrid-header-menu"; //class it opens menu on
  altMenuLogic = null; //alt menu to open


  //main menu lisntner
  menuItemListener(link) {
    var value = link.getAttribute("data-action");

    if (this.altMenuLogic) {
      this.filterMenuLogic(value);
    } else {
      this.defaultMenu(value)
    }

  };


  canOpen(e) {
    return true;
  }


  //main menu to open
  menuHtmlMain() {
    return this.createMenuHTML([
      {
        action: "",
        value: "Options",
        isHeader: true
      }, {
        action: "clear-cell",
        value: "Clear cell",
      }, {
        action: "clear-all",
        value: "Clear All Cells",
      }, {
        action: "show-all",
        value: "Show all (keep filter text)",
      }, {
        action: "set-filter",
        value: "Set Filter",
      }
    ]);
  }


  //alt menu I manually set
  menuHtmlSetFilter() {
    return this.createMenuHTML([
      {
        action: "",
        value: "Set filter",
        isHeader: true
      }, {
        action: "set-filter-1",
        value: "equals"
      }, {
        action: "set-filter-2",
        value: "less than or eq"
      }, {
        action: "set-filter-3",
        value: "greater than or eq"
      }, {
        action: "set-filter-4",
        value: "less than"
      }, {
        action: "set-filter-5",
        value: "greater than"
      }, {
        action: "set-filter-6",
        value: "contains"
      }, {
        action: "set-filter-7",
        value: "not equal to"
      }, {
        action: "set-filter-8",
        value: "does not contain"
      }, {
        action: "set-filter-9",
        value: "begins with"
      }, {
        action: "set-filter-10",
        value: "ends with"
      }
    ]);
  }


  defaultMenu(value) {

    switch (value) {
      case "clear-cell" :
        this.triggerEvent("filterClearCell", {
          attribute: this.value
        });
        this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        this.toggleMenuOff();
        break;
      case "clear-all" :
        this.triggerEvent("filterClearAll", {
          attribute: this.value
        });
        this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        this.toggleMenuOff();
        break;
      case "show-all":
        this.vGrid.vGridConfig.onFilterRun([]);
        this.toggleMenuOff();
        break;
      case "set-filter":
        this.replaceMenu(this.menuHtmlSetFilter());
        this.altMenuLogic = this.filterMenuLogic;
        break;
      default:
        this.toggleMenuOff();
    }


  }


  triggerEvent(name, data) {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.vGrid.element.dispatchEvent(event);
  }


  filterMenuLogic(value) {
    var newOperator = null;
    switch (value) {
      case "set-filter-1":
        newOperator = "=";
        break;
      case "set-filter-2":
        newOperator = "<=";
        break;
      case "set-filter-3":
        newOperator = ">=";
        break;
      case "set-filter-4":
        newOperator = "<";
        break;
      case "set-filter-5":
        newOperator = ">";
        break;
      case "set-filter-6":
        newOperator = "*";
        break;
      case "set-filter-7":
        newOperator = "!=";
        break;
      case "set-filter-8":
        newOperator = "!*";
        break;
      case "set-filter-9":
        newOperator = "*=";
        break;
      case "set-filter-10":
        newOperator = "=*";
        this.toggleMenuOff();
        break;
      default:
        this.toggleMenuOff();
    }
    if (newOperator) {
      this.triggerEvent("filterUpdate", {
        attribute: this.value,
        operator: newOperator
      });
      this.toggleMenuOff();
    }


    this.altMenuLogic = null; //reset to main menu again
  }


}


/*****************************************************
 *  main context menu for row cells
 ******************************************************/

@customAttribute('v-row-menu')
@inject(Element, VGrid)
export class ContextRowMenu extends Contextmenu {
  classToOpenOn = "vGrid-row-menu"; //class it opens menu on
  altMenuLogic = null; //alt menu to open


  //main menu lisntner
  menuItemListener(link) {
    var value = link.getAttribute("data-action");
    if (this.altMenuLogic) {
      this.filterMenuLogic(value);
    } else {
      this.defaultMenu(value)
    }
  };


  canOpen(e) {
    return true;
  }


  //main menu to open
  menuHtmlMain() {
    return this.createMenuHTML([
      {
        action: "",
        value: "Options",
        isHeader: true
      }, {
        action: "copy-cell",
        value: "Copy cell value",
        isHeader: false
      }, {
        action: "paste-cell",
        value: "Paste into cell/selected rows",
        isHeader: false
      }
    ]);
  };


  defaultMenu(value) {
    switch (value) {
      case "copy-cell":
        this.vGrid.vGridConfig.cellValue = this.bindingContext.rowRef[this.value];
        this.toggleMenuOff();
        break;
      case "paste-cell":
        if (this.vGrid.vGridConfig.cellValue !== null) {
          var rows = this.vGrid.vGridSelection.getSelectedRows();
          rows.forEach((x)=> {
            this.vGrid.vGridCollectionFiltered[x][this.value] = this.vGrid.vGridConfig.cellValue;
          });
          this.vGrid.vGridGenerator.rebindAllRowSlots();
        }
        this.toggleMenuOff();
        break;
      default:
        this.toggleMenuOff();
    }
  }

}
