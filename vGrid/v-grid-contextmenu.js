/*****************************************************************************************************************
 *    Contextmenu
 *    Main class for attributes "context menu"
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

export class Contextmenu {

  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;

    //main classes, should I just add these to the v-grid-config?
    this.contextMenuClassName = "v-grid-context-menu";
    this.contextMenuItemClassName = "v-grid-context-menu__item";
    this.contextMenuLinkClassName = "v-grid-context-menu__link";
    this.contextMenuSplitClassName = "v-grid-context-menu__split";


    this.taskItemInContext = null;

    this.clickCoords = null;
    this.clickCoordsX = null;
    this.clickCoordsY = null;


    this.menuState = 0;
    this.menuWidth = null;
    this.menuHeight = null;
    this.menuPosition = null;
    this.menuPositionX = null;
    this.menuPositionY = null;

    this.windowWidth = null;
    this.windowHeight = null;


  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }


  attached() {
      this.element.classList.contains(this.classToOpenOn)? null:this.element.classList.add(this.classToOpenOn);
      this.addListener();
  }


  detached() {
      this.removeListener();
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
    document.addEventListener("click", this.clickListenerBinded);
  }


  removeMenuClickListner() {
    document.removeEventListener("click", this.clickListenerBinded);
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


}
