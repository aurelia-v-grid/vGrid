//main idea/source https://github.com/callmenick/Custom-Context-Menu
//just testing atm, not done in any way, will need to do a few chamges, just added some to test more

import {inject, customAttribute, Optional} from 'aurelia-framework';
import {VGridCellRowHeader} from './v-grid-header-col'
import {VGridCellContainer} from './v-grid-row-col'



/*****************************************************
 *  main class, every menu extends this class to make it simpler
******************************************************/
var ContextMenu = class {

  constructor(element, parent) {
    this.element = element;
    this.parent = parent;

    //main classes, should I just add these to the v-grid-config?
    this.contextMenuClassName = "v-grid-context-menu";
    this.contextMenuItemClassName = "v-grid-context-menu__item";
    this.contextMenuLinkClassName = "v-grid-context-menu__link";
    this.contextMenuSplitClassName = "v-grid-context-menu__split";


    this.taskItemInContext;

    this.clickCoords;
    this.clickCoordsX;
    this.clickCoordsY;


    this.menuState = 0;
    this.menuWidth;
    this.menuHeight;
    this.menuPosition;
    this.menuPositionX;
    this.menuPositionY;

    this.windowWidth;
    this.windowHeight;


  }


  attached() {
    if(this.parent.vGrid.vGridConfig.contextmenu){
      this.addListener();
    }
  }


  detached() {
    if(this.parent.vGrid.vGridConfig.contextmenu) {
      this.removeListener();
    }
  }


  canOpen() {
    return true;
  }


  addListener() {
    this.contextListenerBinded = this.contextListener.bind(this);
    this.element.addEventListener("contextmenu", this.contextListenerBinded);
  }


  removeListener() {
    this.element.removeEventListener("contextmenu", this.contextListenerBinded);
  }


  contextListener(e) {
    if (this.canOpen(e)) {

      this.taskItemInContext = this.clickInsideElement(e, this.classToOpenOn);

      if (this.taskItemInContext) {
        e.preventDefault();
        this.toggleMenuOn();
        this.positionMenu(e);
      } else {
        this.taskItemInContext = null;
        this.toggleMenuOff();
      }

    } else {
      this.toggleMenuOff();
    }
  }


  addMenuClickListner() {
    this.clickListenerBinded = this.clickListener.bind(this);
    document.addEventListener("click", this.clickListenerBinded)
  }


  removeMenuClickListner() {
    document.removeEventListener("click", this.clickListenerBinded)
  }


  clickListener(e) {
    var clickeElIsLink = this.clickInsideElement(e, this.contextMenuLinkClassName);

    if (clickeElIsLink && this.taskItemInContext) {
      e.preventDefault();
      this.menuItemListener(clickeElIsLink);
    } else {
      var button = e.which || e.button;
      if (button === 1) {
        this.toggleMenuOff();
      }
    }

  }


  clickInsideElement(e, className) {
    var el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
      return el;
    } else {
      while (el = el.parentNode) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }

    return false;
  }


  createMenu() {
    this.menu = document.createElement("nav");
    this.menu.classList.add(this.contextMenuClassName);
    this.menu.innerHTML = this.menuHtmlMain();
    document.body.appendChild(this.menu);
    this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
  }


  replaceMenu(html) {
    this.menu.innerHTML = html;
    this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
  }


  removeMenu() {
    document.body.removeChild(this.menu);
    this.menu = null;
    this.menuItems = null;
  }


  toggleMenuOn() {
    if (this.menuState !== 1) {
      this.menuState = 1;
      this.createMenu();
      this.addMenuClickListner();
    }
  }


  toggleMenuOff() {
    if (this.menuState !== 0) {
      this.menuState = 0;
      this.removeMenuClickListner();
      this.removeMenu();

    }
  }


  /**
   * Positions the menu properly.
   */
  positionMenu(e) {
    this.clickCoords = this.getPosition(e);
    this.clickCoordsX = this.clickCoords.x;
    this.clickCoordsY = this.clickCoords.y;

    this.menuWidth = this.menu.offsetWidth + 4;
    this.menuHeight = this.menu.offsetHeight + 4;

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    if ((this.windowWidth - this.clickCoordsX) < this.menuWidth) {
      this.menu.style.left = this.windowWidth - this.menuWidth + "px";
    } else {
      this.menu.style.left = this.clickCoordsX + "px";
    }

    if ((this.windowHeight - this.clickCoordsY) < this.menuHeight) {
      this.menu.style.top = this.windowHeight - this.menuHeight + "px";
    } else {
      this.menu.style.top = this.clickCoordsY + "px";
    }
  }


  /**
   * Get's exact position of event.
   */
  getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }


  createMenuHTML(menuArray) {

    var tempHtml = document.createElement("ul");

    menuArray.forEach((row)=> {
      let li = document.createElement("li");
      li.classList.add(this.contextMenuItemClassName);
      let a = document.createElement("a");
      if (row.isHeader) {
        a.classList.add(this.contextMenuSplitClassName)
      } else {
        a.classList.add(this.contextMenuLinkClassName)
      }
      a.setAttribute("data-action", row.action);
      a.innerHTML = row.value;
      tempHtml.appendChild(a);
    });

    return tempHtml.innerHTML;

  }


};


/*****************************************************
 *  context menu for header
******************************************************/
@customAttribute('v-grid-context-menu-header')
@inject(Element, Optional.of(VGridCellRowHeader))
export class ContextMenuHeader extends ContextMenu {
  classToOpenOn = "vGrid-queryField"; //class it opens menu on
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
    if(this.parent.colType === "selection"){
      return false;
    } else {
      return true;
    }
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
        action: "show-all",
        value: "Show all (keep filter text)",
        isHeader: false
      }, {
        action: "set-filter",
        value: "Set Filter",
        isHeader: false
      }
    ]);
  };


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
  };


  defaultMenu(value) {
    switch (value) {
      case "clear-cell" :
        let x = {};
        this.parent.queryString = "";//x;
        this.toggleMenuOff();
        break;
      case "show-all":
        this.parent.vGridConfig.onFilterRun([]);
        this.toggleMenuOff();
        break;
      case "set-filter":
        this.replaceMenu(this.menuHtmlSetFilter());
        this.altMenuLogic = this.filterMenuLogic;
        break;
      default:
        console.log(value);
        this.toggleMenuOff();
    }
  }


  filterMenuLogic(value) {
    switch (value) {
      case "set-filter-1":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-2":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "<=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-3":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = ">=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-4":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "<";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-5":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = ">";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-6":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "*";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-7":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "!=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-8":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "!*";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-9":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "*=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-10":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "=*";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      default:
        console.log(value);
        this.toggleMenuOff();
    }

    this.altMenuLogic = null; //reset to main menu again
  }


}


/*****************************************************
 *  main context menu for row cells
******************************************************/
@customAttribute('v-grid-context-menu-cell')
@inject(Element, Optional.of(VGridCellContainer))
export class ContextMenuCell extends ContextMenu {
  classToOpenOn = "vGrid-row-cell"; //class it opens menu on
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
    if (e.target === this.parent.vGrid.vGridCellHelper.curElement || e.target.firstChild === this.parent.vGrid.vGridCellHelper.curElement) {
      if (this.parent.editMode()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
        this.parent.vGrid.vGridCellHelper.cellValue = this.parent.vGrid.vGridCurrentEntityRef[this.parent.attribute()];
        this.toggleMenuOff();
        this.parent.vGrid.vGridCellHelper.refocus();
        break;
      case "paste-cell":
        if (this.parent.vGrid.vGridCellHelper.cellValue !== null) {
          if(!this.parent.readOnly()){
            var rows = this.parent.vGrid.vGridSelection.getSelectedRows();
            rows.forEach((x)=> {
              this.parent.vGrid.vGridCollectionFiltered[x][this.parent.attribute()] = this.parent.vGrid.vGridCellHelper.cellValue;
            });
            this.parent.vGrid.vGridGenerator.fillDataInRows();
          }
          this.parent.vGrid.vGridCellHelper.refocus();
        } else {
          console.log("no value")
        }
        this.toggleMenuOff();
        break;
      default:
        console.log(value);
        this.toggleMenuOff();
    }
  }

}
