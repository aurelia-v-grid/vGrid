/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Contextmenu = exports.Contextmenu = function () {
    function Contextmenu(element, vGrid) {
      _classCallCheck(this, Contextmenu);

      this.element = element;
      this.vGrid = vGrid;

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

    Contextmenu.prototype.getLang = function getLang(value) {
      return this.vGrid.vGridConfig.attLanguage[value];
    };

    Contextmenu.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
    };

    Contextmenu.prototype.attached = function attached() {
      this.element.classList.contains(this.classToOpenOn) ? null : this.element.classList.add(this.classToOpenOn);
      this.addListener();
    };

    Contextmenu.prototype.detached = function detached() {
      this.removeListener();
    };

    Contextmenu.prototype.canOpen = function canOpen() {
      return true;
    };

    Contextmenu.prototype.closeIfOpen = function closeIfOpen() {
      if (this.menuState) {
        this.toggleMenuOff();
      }
    };

    Contextmenu.prototype.addListener = function addListener() {
      this.contextListenerBinded = this.contextListener.bind(this);
      this.closeIfOpenBinded = this.closeIfOpen.bind(this);
      this.element.addEventListener("contextmenu", this.contextListenerBinded);
      this.vGrid.element.addEventListener("vGridCloseContextMenuIfOpen", this.closeIfOpenBinded);
    };

    Contextmenu.prototype.removeListener = function removeListener() {
      this.element.removeEventListener("contextmenu", this.contextListenerBinded);
      this.element.removeEventListener("vGridCloseContextMenuIfOpen", this.closeIfOpenBinded);
    };

    Contextmenu.prototype.contextListener = function contextListener(e) {
      var event = new CustomEvent("vGridCloseContextMenuIfOpen", {
        detail: "",
        bubbles: true
      });
      this.vGrid.element.dispatchEvent(event);

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
    };

    Contextmenu.prototype.addMenuClickListner = function addMenuClickListner() {
      this.clickListenerBinded = this.clickListener.bind(this);
      document.addEventListener("click", this.clickListenerBinded);
    };

    Contextmenu.prototype.removeMenuClickListner = function removeMenuClickListner() {
      document.removeEventListener("click", this.clickListenerBinded);
    };

    Contextmenu.prototype.clickListener = function clickListener(e) {
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
    };

    Contextmenu.prototype.clickInsideElement = function clickInsideElement(e, className) {
      var el = e.srcElement || e.target;

      if (el.classList.contains(className)) {
        return el;
      } else {
        while (el === el.parentNode) {
          if (el.classList && el.classList.contains(className)) {
            return el;
          }
        }
      }

      return false;
    };

    Contextmenu.prototype.createMenu = function createMenu() {
      this.menu = document.createElement("nav");
      this.menu.classList.add(this.contextMenuClassName);
      this.menu.innerHTML = this.menuHtmlMain();
      document.body.appendChild(this.menu);
      this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
    };

    Contextmenu.prototype.replaceMenu = function replaceMenu(html) {
      this.menu.innerHTML = html;
      this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
    };

    Contextmenu.prototype.removeMenu = function removeMenu() {
      document.body.removeChild(this.menu);
      this.menu = null;
      this.menuItems = null;
    };

    Contextmenu.prototype.toggleMenuOn = function toggleMenuOn() {
      if (this.menuState !== 1) {
        this.menuState = 1;
        this.createMenu();
        this.addMenuClickListner();
      }
    };

    Contextmenu.prototype.toggleMenuOff = function toggleMenuOff() {
      if (this.menuState !== 0) {
        this.menuState = 0;
        this.removeMenuClickListner();
        this.removeMenu();
      }
    };

    Contextmenu.prototype.positionMenu = function positionMenu(e) {
      this.clickCoords = this.getPosition(e);
      this.clickCoordsX = this.clickCoords.x;
      this.clickCoordsY = this.clickCoords.y;

      this.menuWidth = this.menu.offsetWidth + 4;
      this.menuHeight = this.menu.offsetHeight + 4;

      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;

      if (this.windowWidth - this.clickCoordsX < this.menuWidth) {
        this.menu.style.left = this.windowWidth - this.menuWidth + "px";
      } else {
        this.menu.style.left = this.clickCoordsX + "px";
      }

      if (this.windowHeight - this.clickCoordsY < this.menuHeight) {
        this.menu.style.top = this.windowHeight - this.menuHeight + "px";
      } else {
        this.menu.style.top = this.clickCoordsY + "px";
      }
    };

    Contextmenu.prototype.getPosition = function getPosition(e) {
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
      };
    };

    Contextmenu.prototype.createMenuHTML = function createMenuHTML(menuArray) {
      var _this = this;

      var tempHtml = document.createElement("ul");

      menuArray.forEach(function (row) {
        var li = document.createElement("li");
        li.classList.add(_this.contextMenuItemClassName);
        var a = document.createElement("a");
        if (row.isHeader) {
          a.classList.add(_this.contextMenuSplitClassName);
        } else {
          a.classList.add(_this.contextMenuLinkClassName);
        }
        a.setAttribute("data-action", row.action);
        a.innerHTML = row.value;
        tempHtml.appendChild(a);
      });

      return tempHtml.innerHTML;
    };

    return Contextmenu;
  }();
});