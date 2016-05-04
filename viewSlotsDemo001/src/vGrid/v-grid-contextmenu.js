//main idea/source https://github.com/callmenick/Custom-Context-Menu
//just testing atm, not done in any way, will need to do a few chamges, just added some to test more

import {inject, customAttribute, Optional} from 'aurelia-framework';
import {VGridCellRowHeader} from './v-grid-cell-header'


var ContextMenu = class {

  constructor(element, vGridCellRowHeader) {
    this.element = element;
    this.parent = vGridCellRowHeader;
    this.contextMenuClassName = "v-grid-context-menu";
    this.contextMenuItemClassName = "v-grid-context-menu__item";
    this.contextMenuLinkClassName = "v-grid-context-menu__link";
    this.contextMenuActive = "v-grid-context-menu--active";


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
    this.addListener();

  }


  detached() {
    this.removeListener();
  }


  addListener() {
    this.contextListenerBinded = this.contextListener.bind(this);
    this.element.addEventListener("contextmenu", this.contextListenerBinded);
  }


  removeListener() {
    this.element.removeEventListener("contextmenu", this.contextListenerBinded);
  }


  contextListener(e) {
    this.taskItemInContext = this.clickInsideElement(e, this.classToOpenOn);

    if (this.taskItemInContext) {
      e.preventDefault();
      this.toggleMenuOn();
      this.positionMenu(e);
    } else {
      this.taskItemInContext = null;
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
    this.menu.classList.add("v-grid-context-menu");
    this.menu.innerHTML = this.menuHtml();
    document.body.appendChild(this.menu);
    this.menuItems = this.menu.querySelectorAll(".v-grid-context-menu__item");
  }

  replaceMenu(html) {
    this.menu.innerHTML = html;
    this.menuItems = this.menu.querySelectorAll(".v-grid-context-menu__item");
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

};

@customAttribute('v-grid-context-menu-header')
@inject(Element, Optional.of(VGridCellRowHeader))
export class ContextMenuHeader extends ContextMenu {

  menuHtml() {
    return `
    <ul>
        <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__link" data-action="clear-cell">Clear cell</a>
        </li>   
        <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__link" data-action="show-all">Show all (keep filter text)</a>
        </li> 
        <li class="v-grid-context-menu__item">
          <a class="v-grid-context-menu__link" data-action="set-filter">Set Filter</a>
        </li>     
    </ul>
    `
  };

  menuHtml2() {
    return `
    <ul>
        <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__split" data-action="">Set filter</a>
        </li>   
        <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__link" data-action="set-filter-equals">equals</a>
        </li> 
        <li class="v-grid-context-menu__item">
          <a class="v-grid-context-menu__link" data-action="set-filter-less than or eq">less than or eq</a>
        </li>
         <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__link" data-action="set-filter-greater than or eq">greater than or eq</a>
        </li>   
        <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__link" data-action="set-filter-less than">less than</a>
        </li> 
        <li class="v-grid-context-menu__item">
          <a class="v-grid-context-menu__link" data-action="set-filter-greater than">greater than</a>
        </li>
        <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__link" data-action="set-filter-contains">contains</a>
        </li> 
        <li class="v-grid-context-menu__item">
          <a class="v-grid-context-menu__link" data-action="set-filter-not equal to">not equal to</a>
        </li>
         <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__link" data-action="set-filter-does not contain">does not contain</a>
        </li>   
        <li class="v-grid-context-menu__item">
          <a  class="v-grid-context-menu__link" data-action="set-filter-begins with">begins with</a>
        </li> 
        <li class="v-grid-context-menu__item">
          <a class="v-grid-context-menu__link" data-action="set-filter-ends with">ends with</a>
        </li>
    </ul>
    `
  };

  classToOpenOn = "vGrid-queryField";

  menuItemListener(link) {
    var value = link.getAttribute("data-action")

    switch (value) {
      case "clear-cell" :
        this.parent.cellInputElement.value = "";
        if (this.parent.cellInputElement.onkeydown) {
          this.parent.cellInputElement.onkeydown({keyKode: 13});
        } else {
          this.parent.cellInputElement.onchange({keyKode: 13});
        }
        this.toggleMenuOff();
        break;
      case "show-all":
        var queryHtmlInput = this.parent.vGrid.element.querySelectorAll("." + this.parent.vGridConfig.css.filterHandle);
        this.parent.vGridConfig.onFilterRun([]);
        this.toggleMenuOff();
        break;
      case "set-filter":
        this.replaceMenu(this.menuHtml2());
        break;
      case "set-filter-equals":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-less than or eq":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "<=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-greater than or eq":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = ">=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-less than":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "<"
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-greater than":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = ">";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-contains":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "*";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-not equal to":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "!=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-does not contain":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "!*";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "set-filter-begins with":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "*=";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      case "ends with":
        this.parent.vGridConfig.filterArray[this.parent.columnNo] = "=*";
        this.toggleMenuOff();
        this.parent.vGrid.vGridGenerator.rebuildColumns();
        break;
      default:
        console.log(value);
        this.toggleMenuOff();

    }


  };

}

