'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, _dec3, _dec4, _class3, Contextmenu, VGridContextmenu, ContextMenuCell;

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
      Optional = _aureliaFramework.Optional;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      Contextmenu = function () {
        function Contextmenu(element, vGrid) {
          _classCallCheck(this, Contextmenu);

          this.element = element;
          this.vGrid = vGrid;

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
      }();

      _export('VGridContextmenu', VGridContextmenu = (_dec = customAttribute('v-grid-header-menu'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function (_Contextmenu) {
        _inherits(VGridContextmenu, _Contextmenu);

        function VGridContextmenu() {
          var _temp, _this2, _ret;

          _classCallCheck(this, VGridContextmenu);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _Contextmenu.call.apply(_Contextmenu, [this].concat(args))), _this2), _this2.classToOpenOn = "vGrid-header-menu", _this2.altMenuLogic = null, _temp), _possibleConstructorReturn(_this2, _ret);
        }

        VGridContextmenu.prototype.menuItemListener = function menuItemListener(link) {
          var value = link.getAttribute("data-action");

          if (this.altMenuLogic) {
            this.filterMenuLogic(value);
          } else {
            this.defaultMenu(value);
          }
        };

        VGridContextmenu.prototype.canOpen = function canOpen(e) {
          return true;
        };

        VGridContextmenu.prototype.menuHtmlMain = function menuHtmlMain() {
          return this.createMenuHTML([{
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
          }, {
            action: "show-all",
            value: "Show all (keep filter text)",
            isHeader: false
          }, {
            action: "set-filter",
            value: "Set Filter",
            isHeader: false
          }]);
        };

        VGridContextmenu.prototype.menuHtmlSetFilter = function menuHtmlSetFilter() {
          return this.createMenuHTML([{
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
          }]);
        };

        VGridContextmenu.prototype.defaultMenu = function defaultMenu(value) {
          switch (value) {
            case "clear-cell":
              this.triggerEvent("filterClearCell", {
                attribute: this.value
              });
              this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
              this.toggleMenuOff();
              break;
            case "clear-all":
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
              console.log(value);
              this.toggleMenuOff();
          }
        };

        VGridContextmenu.prototype.triggerEvent = function triggerEvent(name, data) {
          var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
          });
          this.vGrid.element.dispatchEvent(event);
        };

        VGridContextmenu.prototype.filterMenuLogic = function filterMenuLogic(value) {
          switch (value) {
            case "set-filter-1":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-2":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "<="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-3":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: ">="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-4":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "<"
              });
              this.toggleMenuOff();
              break;
            case "set-filter-5":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: ">"
              });
              this.toggleMenuOff();
              break;
            case "set-filter-6":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "*"
              });
              this.toggleMenuOff();
              break;
            case "set-filter-7":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "!="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-8":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "!*"
              });
              this.toggleMenuOff();
              break;
            case "set-filter-9":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "*="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-10":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "*="
              });
              this.toggleMenuOff();
              break;
            default:
              console.log(value);
              this.toggleMenuOff();
          }

          this.altMenuLogic = null;
        };

        return VGridContextmenu;
      }(Contextmenu)) || _class) || _class));

      _export('VGridContextmenu', VGridContextmenu);

      _export('ContextMenuCell', ContextMenuCell = (_dec3 = customAttribute('v-grid-row-menu'), _dec4 = inject(Element, VGrid), _dec3(_class3 = _dec4(_class3 = function (_Contextmenu2) {
        _inherits(ContextMenuCell, _Contextmenu2);

        function ContextMenuCell() {
          var _temp2, _this3, _ret2;

          _classCallCheck(this, ContextMenuCell);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, _Contextmenu2.call.apply(_Contextmenu2, [this].concat(args))), _this3), _this3.classToOpenOn = "vGrid-row-menu", _this3.altMenuLogic = null, _temp2), _possibleConstructorReturn(_this3, _ret2);
        }

        ContextMenuCell.prototype.menuItemListener = function menuItemListener(link) {
          var value = link.getAttribute("data-action");
          if (this.altMenuLogic) {
            this.filterMenuLogic(value);
          } else {
            this.defaultMenu(value);
          }
        };

        ContextMenuCell.prototype.canOpen = function canOpen(e) {
          return true;
        };

        ContextMenuCell.prototype.menuHtmlMain = function menuHtmlMain() {
          return this.createMenuHTML([{
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
          }]);
        };

        ContextMenuCell.prototype.defaultMenu = function defaultMenu(value) {
          var _this4 = this;

          switch (value) {
            case "copy-cell":
              this.vGrid.vGridConfig.cellValue = this.bindingContext.rowRef[this.value];
              this.toggleMenuOff();
              break;
            case "paste-cell":
              if (this.vGrid.vGridConfig.cellValue !== null) {
                var rows = this.vGrid.vGridSelection.getSelectedRows();
                rows.forEach(function (x) {
                  _this4.vGrid.vGridCollectionFiltered[x][_this4.value] = _this4.vGrid.vGridConfig.cellValue;
                });
                this.vGrid.vGridGenerator.fillDataInRows();
              } else {
                console.log("no value");
              }
              this.toggleMenuOff();
              break;
            default:
              console.log(value);
              this.toggleMenuOff();
          }
        };

        return ContextMenuCell;
      }(Contextmenu)) || _class3) || _class3));

      _export('ContextMenuCell', ContextMenuCell);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWNvbnRleHRtZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9RLFkscUJBQUEsTTtBQUFRLHFCLHFCQUFBLGU7QUFBaUIsYyxxQkFBQSxROztBQUl6QixXLFVBQUEsSzs7O0FBT0osaUI7QUFFRiw2QkFBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiOztBQUdBLGVBQUssb0JBQUwsR0FBNEIscUJBQTVCO0FBQ0EsZUFBSyx3QkFBTCxHQUFnQywyQkFBaEM7QUFDQSxlQUFLLHdCQUFMLEdBQWdDLDJCQUFoQztBQUNBLGVBQUsseUJBQUwsR0FBaUMsNEJBQWpDOztBQUdBLGVBQUssaUJBQUw7O0FBRUEsZUFBSyxXQUFMO0FBQ0EsZUFBSyxZQUFMO0FBQ0EsZUFBSyxZQUFMOztBQUdBLGVBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNBLGVBQUssU0FBTDtBQUNBLGVBQUssVUFBTDtBQUNBLGVBQUssWUFBTDtBQUNBLGVBQUssYUFBTDtBQUNBLGVBQUssYUFBTDs7QUFFQSxlQUFLLFdBQUw7QUFDQSxlQUFLLFlBQUw7QUFHRDs7OEJBR0QsSSxpQkFBSyxjLEVBQWdCLGUsRUFBaUI7QUFDcEMsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCO0FBQ0QsUzs7OEJBR0QsUSx1QkFBVztBQUNQLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsS0FBSyxhQUFyQyxJQUFxRCxJQUFyRCxHQUEwRCxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssYUFBaEMsQ0FBMUQ7QUFDQSxlQUFLLFdBQUw7QUFDSCxTOzs4QkFHRCxRLHVCQUFXO0FBQ1AsZUFBSyxjQUFMO0FB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UDtBQWVELFM7O2tDQUlELFcsd0JBQVksSyxFQUFPO0FBQUE7O0FBQ2pCLGtCQUFRLEtBQVI7QUFDRSxpQkFBSyxXQUFMO0FBQ0UsbUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsR0FBbUMsS0FBSyxjQUFMLENBQW9CLE1BQXBCLENBQTJCLEtBQUssS0FBaEMsQ0FBbkM7QUFDQSxtQkFBSyxhQUFMO0FBQ0E7QUFDRixpQkFBSyxZQUFMO0FBQ0Usa0JBQUksS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixLQUFxQyxJQUF6QyxFQUErQztBQUMzQyxvQkFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZUFBMUIsRUFBWDtBQUNBLHFCQUFLLE9BQUwsQ0FBYSxVQUFDLENBQUQsRUFBTTtBQUNqQix5QkFBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsQ0FBbkMsRUFBc0MsT0FBSyxLQUEzQyxJQUFvRCxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQTNFO0FBQ0QsaUJBRkQ7QUFHQSxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixjQUExQjtBQUNILGVBTkQsTUFNTztBQUNMLHdCQUFRLEdBQVIsQ0FBWSxVQUFaO0FBQ0Q7QUFDRCxtQkFBSyxhQUFMO0FBQ0E7QUFDRjtBQUNFLHNCQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsbUJBQUssYUFBTDtBQW5CSjtBQXFCRCxTOzs7UUFoRWtDLFciLCJmaWxlIjoidkdyaWQvdi1ncmlkLWF0dHJpYnV0ZXMtY29udGV4dG1lbnUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
