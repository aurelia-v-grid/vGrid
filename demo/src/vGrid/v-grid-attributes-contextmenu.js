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
@customAttribute('v-grid-header-menu')
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
        isHeader: false
      }, {
        action: "clear-all",
        value: "Clear All Cells",
        isHeader: false
      },{
        action: "show-all",
        value: "Show all (keep filter text)",
        isHeader: false
      }, {
        action: "set-filter",
        value: "Set Filter",
        isHeader: false
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
        value: "equals",
        isHeader: false
      }, {
        action: "set-filter-2",
        value: "less than or eq",
        isHeader: false
      }, {
        action: "set-filter-3",
        value: "greater than or eq",
        isHeader: false
      }, {
        action: "set-filter-4",
        value: "less than",
        isHeader: false
      }, {
        action: "set-filter-5",
        value: "greater than",
        isHeader: false
      }, {
        action: "set-filter-6",
        value: "contains",
        isHeader: false
      }, {
        action: "set-filter-7",
        value: "not equal to",
        isHeader: false
      }, {
        action: "set-filter-8",
        value: "does not contain",
        isHeader: false
      }, {
        action: "set-filter-9",
        value: "begins with",
        isHeader: false
      }, {
        action: "set-filter-10",
        value: "ends with",
        isHeader: false
      }
    ]);
  }


  defaultMenu(value) {
    switch (value) {
      case "clear-cell" :
        this.triggerEvent("filterClearCell", {
          attribute:this.value
        });
        this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        this.toggleMenuOff();
        break;
      case "clear-all" :
        this.triggerEvent("filterClearAll", {
          attribute:this.value
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


  triggerEvent(name, data){
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.vGrid.element.dispatchEvent(event);
  }


  filterMenuLogic(value) {
    switch (value) {
      case "set-filter-1":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:"="
        });
        this.toggleMenuOff();
        break;
      case "set-filter-2":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:"<="
        });
        this.toggleMenuOff();
        break;
      case "set-filter-3":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:">="
        });
        this.toggleMenuOff();
        break;
      case "set-filter-4":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:"<"
        });
        this.toggleMenuOff();
        break;
      case "set-filter-5":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:">"
        });
        this.toggleMenuOff();
        break;
      case "set-filter-6":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:"*"
        });
        this.toggleMenuOff();
        break;
      case "set-filter-7":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:"!="
        });
        this.toggleMenuOff();
        break;
      case "set-filter-8":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:"!*"
        });
        this.toggleMenuOff();
        break;
      case "set-filter-9":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:"*="
        });
        this.toggleMenuOff();
        break;
      case "set-filter-10":
        this.triggerEvent("filterUpdate", {
          attribute:this.value,
          operator:"*="
        });
        this.toggleMenuOff();
        break;
      default:
        this.toggleMenuOff();
    }

    this.altMenuLogic = null; //reset to main menu again
  }


}



/*****************************************************
 *  main context menu for row cells
 ******************************************************/

@customAttribute('v-grid-row-menu')
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
            this.vGrid.vGridGenerator.fillDataInRows();
        } 
        this.toggleMenuOff();
        break;
      default:
        this.toggleMenuOff();
    }
  }

}
