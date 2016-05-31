"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Contextmenu;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("Contextmenu", Contextmenu = function () {
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

        Contextmenu.prototype.addListener = function addListener() {
          this.contextListenerBinded = this.contextListener.bind(this);
          this.element.addEventListener("contextmenu", this.contextListenerBinded);
        };

        Contextmenu.prototype.removeListener = function removeListener() {
          this.element.removeEventListener("contextmenu", this.contextListenerBinded);
        };

        Contextmenu.prototype.contextListener = function contextListener(e) {
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
            while (el = el.parentNode) {
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
      }());

      _export("Contextmenu", Contextmenu);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzZCQU9hLFc7QUFFWCw2QkFBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiOztBQUdBLGVBQUssb0JBQUwsR0FBNEIscUJBQTVCO0FBQ0EsZUFBSyx3QkFBTCxHQUFnQywyQkFBaEM7QUFDQSxlQUFLLHdCQUFMLEdBQWdDLDJCQUFoQztBQUNBLGVBQUsseUJBQUwsR0FBaUMsNEJBQWpDOztBQUdBLGVBQUssaUJBQUwsR0FBeUIsSUFBekI7O0FBRUEsZUFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsZUFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsZUFBSyxZQUFMLEdBQW9CLElBQXBCOztBQUdBLGVBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNBLGVBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLGVBQUssVUFBTCxHQUFrQixJQUFsQjtBQUNBLGVBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNBLGVBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLGVBQUssYUFBTCxHQUFxQixJQUFyQjs7QUFFQSxlQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxlQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFHRDs7OEJBR0QsSSxpQkFBSyxjLEVBQWdCLGUsRUFBaUI7QUFDcEMsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCO0FBQ0QsUzs7OEJBR0QsUSx1QkFBVztBQUNQLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsS0FBSyxhQUFyQyxJQUFxRCxJQUFyRCxHQUEwRCxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssYUFBaEMsQ0FBMUQ7QUFDQSxlQUFLLFdBQUw7QUFDSCxT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Q3hCLGdCQUFJLEtBQUssU0FBUyxhQUFULENBQXVCLElBQXZCLENBQVQ7QUFDQSxlQUFHLFNBQUgsQ0FBYSxHQUFiLENBQWlCLE1BQUssd0JBQXRCO0FBQ0EsZ0JBQUksSUFBSSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBUjtBQUNBLGdCQUFJLElBQUksUUFBUixFQUFrQjtBQUNoQixnQkFBRSxTQUFGLENBQVksR0FBWixDQUFnQixNQUFLLHlCQUFyQjtBQUNELGFBRkQsTUFFTztBQUNMLGdCQUFFLFNBQUYsQ0FBWSxHQUFaLENBQWdCLE1BQUssd0JBQXJCO0FBQ0Q7QUFDRCxjQUFFLFlBQUYsQ0FBZSxhQUFmLEVBQThCLElBQUksTUFBbEM7QUFDQSxjQUFFLFNBQUYsR0FBYyxJQUFJLEtBQWxCO0FBQ0EscUJBQVMsV0FBVCxDQUFxQixDQUFyQjtBQUNELFdBWkQ7O0FBY0EsaUJBQU8sU0FBUyxTQUFoQjtBQUVELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbnRleHRtZW51LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
