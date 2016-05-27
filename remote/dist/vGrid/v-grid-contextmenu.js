'use strict';

System.register(['aurelia-framework', './v-grid-header-col', './v-grid-row-col'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGridCellRowHeader, VGridCellContainer, _dec, _dec2, _class, ContextMenu, ContextMenuHeader;

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
    }, function (_vGridHeaderCol) {
      VGridCellRowHeader = _vGridHeaderCol.VGridCellRowHeader;
    }, function (_vGridRowCol) {
      VGridCellContainer = _vGridRowCol.VGridCellContainer;
    }],
    execute: function () {
      ContextMenu = function () {
        function ContextMenu(element, parent) {
          _classCallCheck(this, ContextMenu);

          this.element = element;
          this.parent = parent;

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

        ContextMenu.prototype.attached = function attached() {
          if (this.parent.vGrid.vGridConfig.contextmenu) {
            this.addListener();
          }
        };

        ContextMenu.prototype.detached = function detached() {
          if (this.parent.vGrid.vGridConfig.contextmenu) {
            this.removeListener();
          }
        };

        ContextMenu.prototype.canOpen = function canOpen() {
          return true;
        };

        ContextMenu.prototype.addListener = function addListener() {
          this.contextListenerBinded = this.contextListener.bind(this);
          this.element.addEventListener("contextmenu", this.contextListenerBinded);
        };

        ContextMenu.prototype.removeListener = function removeListener() {
          this.element.removeEventListener("contextmenu", this.contextListenerBinded);
        };

        ContextMenu.prototype.contextListener = function contextListener(e) {
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

        ContextMenu.prototype.addMenuClickListner = function addMenuClickListner() {
          this.clickListenerBinded = this.clickListener.bind(this);
          document.addEventListener("click", this.clickListenerBinded);
        };

        ContextMenu.prototype.removeMenuClickListner = function removeMenuClickListner() {
          document.removeEventListener("click", this.clickListenerBinded);
        };

        ContextMenu.prototype.clickListener = function clickListener(e) {
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

        ContextMenu.prototype.clickInsideElement = function clickInsideElement(e, className) {
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

        ContextMenu.prototype.createMenu = function createMenu() {
          this.menu = document.createElement("nav");
          this.menu.classList.add(this.contextMenuClassName);
          this.menu.innerHTML = this.menuHtmlMain();
          document.body.appendChild(this.menu);
          this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
        };

        ContextMenu.prototype.replaceMenu = function replaceMenu(html) {
          this.menu.innerHTML = html;
          this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
        };

        ContextMenu.prototype.removeMenu = function removeMenu() {
          document.body.removeChild(this.menu);
          this.menu = null;
          this.menuItems = null;
        };

        ContextMenu.prototype.toggleMenuOn = function toggleMenuOn() {
          if (this.menuState !== 1) {
            this.menuState = 1;
            this.createMenu();
            this.addMenuClickListner();
          }
        };

        ContextMenu.prototype.toggleMenuOff = function toggleMenuOff() {
          if (this.menuState !== 0) {
            this.menuState = 0;
            this.removeMenuClickListner();
            this.removeMenu();
          }
        };

        ContextMenu.prototype.positionMenu = function positionMenu(e) {
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

        ContextMenu.prototype.getPosition = function getPosition(e) {
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

        ContextMenu.prototype.createMenuHTML = function createMenuHTML(menuArray) {
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

        return ContextMenu;
      }();

      _export('ContextMenuHeader', ContextMenuHeader = (_dec = customAttribute('v-grid-context-menu-header'), _dec2 = inject(Element, Optional.of(VGridCellRowHeader)), _dec(_class = _dec2(_class = function (_ContextMenu) {
        _inherits(ContextMenuHeader, _ContextMenu);

        function ContextMenuHeader() {
          var _temp, _this2, _ret;

          _classCallCheck(this, ContextMenuHeader);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _ContextMenu.call.apply(_ContextMenu, [this].concat(args))), _this2), _this2.classToOpenOn = "vGrid-queryField", _this2.altMenuLogic = null, _temp), _possibleConstructorReturn(_this2, _ret);
        }

        ContextMenuHeader.prototype.menuItemListener = function menuItemListener(link) {
          var value = link.getAttribute("data-action");

          if (this.altMenuLogic) {
            this.filterMenuLogic(value);
          } else {
            this.defaultMenu(value);
          }
        };

        ContextMenuHeader.prototype.canOpen = function canOpen(e) {
          if (this.parent.colType === "selection") {
            return false;
          } else {
            return true;
          }
        };

        ContextMenuHeader.prototype.menuHtmlMain = function menuHtmlMain() {
          return this.createMenuHTML([{
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
          }]);
        };

        ContextMenuHeader.prototype.menuHtmlSetFilter = function menuHtmlSetFilter() {
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

        ContextMenuHeader.prototype.defaultMenu = function defaultMenu(value) {
          switch (value) {
            case "clear-cell":
              var x = {};
              this.parent.queryString = "";
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
        };

        ContextMenuHeader.prototype.filterMenuLogic = function filterMenuLogic(value) {
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

          this.altMenuLogic = null;
        };

        return ContextMenuHeader;
      }(ContextMenu)) || _class) || _class));

      _export('ContextMenuHeader', ContextMenuHeader);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFJekIsd0IsbUJBQUEsa0I7O0FBQ0Esd0IsZ0JBQUEsa0I7OztBQU9KLGlCO0FBRUYsNkJBQVksT0FBWixFQUFxQixNQUFyQixFQUE2QjtBQUFBOztBQUMzQixlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFHQSxlQUFLLG9CQUFMLEdBQTRCLHFCQUE1QjtBQUNBLGVBQUssd0JBQUwsR0FBZ0MsMkJBQWhDO0FBQ0EsZUFBSyx3QkFBTCxHQUFnQywyQkFBaEM7QUFDQSxlQUFLLHlCQUFMLEdBQWlDLDRCQUFqQzs7QUFHQSxlQUFLLGlCQUFMOztBQUVBLGVBQUssV0FBTDtBQUNBLGVBQUssWUFBTDtBQUNBLGVBQUssWUFBTDs7QUFHQSxlQUFLLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxlQUFLLFNBQUw7QUFDQSxlQUFLLFVBQUw7QUFDQSxlQUFLLFlBQUw7QUFDQSxlQUFLLGFBQUw7QUFDQSxlQUFLLGFBQUw7O0FBRUEsZUFBSyxXQUFMO0FBQ0EsZUFBSyxZQUFMO0FBR0Q7OzhCQUdELFEsdUJBQVc7QUFDVCxjQUFHLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsV0FBbEIsQ0FBOEIsV0FBakMsRUFBNkM7QUFDM0MsaUJBQUssV0FBTDtBQUNEO0FBQ0YsUzs7OEJBR0QsUSx1QkFBVztBQUNULGNBQUcsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixXQUFqQyxFQUE4QztBQUM1QyxpQkFBSyxjQUFMO0FBQ0Q7QUFDRixTOzs4QkFHRCxPLHNCQUFVO0FBQ1IsaUJBQU8sSUFBUDtBQUNELFM7OzhCQUdELFcsMEJBQWM7QUFDWixlQUFLLHFCQUFMLEdB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QUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQWhELElBQTRELEdBQTVEO0FBQ0EsbUJBQUssYUFBTDtBQUNBLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDO0FBQ0E7QUFDRixpQkFBSyxjQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsV0FBeEIsQ0FBb0MsS0FBSyxNQUFMLENBQVksUUFBaEQsSUFBNEQsR0FBNUQ7QUFDQSxtQkFBSyxhQUFMO0FBQ0EsbUJBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsY0FBbEIsQ0FBaUMsY0FBakM7QUFDQTtBQUNGLGlCQUFLLGNBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixXQUF4QixDQUFvQyxLQUFLLE1BQUwsQ0FBWSxRQUFoRCxJQUE0RCxHQUE1RDtBQUNBLG1CQUFLLGFBQUw7QUFDQSxtQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixjQUFsQixDQUFpQyxjQUFqQztBQUNBO0FBQ0YsaUJBQUssY0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQWhELElBQTRELElBQTVEO0FBQ0EsbUJBQUssYUFBTDtBQUNBLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDO0FBQ0E7QUFDRixpQkFBSyxjQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsV0FBeEIsQ0FBb0MsS0FBSyxNQUFMLENBQVksUUFBaEQsSUFBNEQsSUFBNUQ7QUFDQSxtQkFBSyxhQUFMO0FBQ0EsbUJBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsY0FBbEIsQ0FBaUMsY0FBakM7QUFDQTtBQUNGLGlCQUFLLGNBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixXQUF4QixDQUFvQyxLQUFLLE1BQUwsQ0FBWSxRQUFoRCxJQUE0RCxJQUE1RDtBQUNBLG1CQUFLLGFBQUw7QUFDQSxtQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixjQUFsQixDQUFpQyxjQUFqQztBQUNBO0FBQ0YsaUJBQUssZUFBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQWhELElBQTRELElBQTVEO0FBQ0EsbUJBQUssYUFBTDtBQUNBLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDO0FBQ0E7QUFDRjtBQUNFLHNCQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsbUJBQUssYUFBTDtBQXJESjs7QUF3REEsZUFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0QsUzs7O1FBdkxvQyxXIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
