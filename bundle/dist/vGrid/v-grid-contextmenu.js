'use strict';

System.register(['aurelia-framework', './v-grid-header-col', './v-grid-row-col'], function (_export, _context) {
  var inject, customAttribute, Optional, VGridCellRowHeader, VGridCellContainer, _dec, _dec2, _class, _dec3, _dec4, _class3, ContextMenu, ContextMenuHeader, ContextMenuCell;

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

        ContextMenu.prototype.attached = function attached() {
          this.addListener();
        };

        ContextMenu.prototype.detached = function detached() {
          this.removeListener();
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
          this.menu.classList.add("v-grid-context-menu");
          this.menu.innerHTML = this.menuHtmlMain();
          document.body.appendChild(this.menu);
          this.menuItems = this.menu.querySelectorAll(".v-grid-context-menu__item");
        };

        ContextMenu.prototype.replaceMenu = function replaceMenu(html) {
          this.menu.innerHTML = html;
          this.menuItems = this.menu.querySelectorAll(".v-grid-context-menu__item");
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

          var tempHtml = document.createElement("ul");

          menuArray.forEach(function (row) {
            var li = document.createElement("li");
            li.classList.add("v-grid-context-menu__item");
            var a = document.createElement("a");
            if (row.isHeader) {
              a.classList.add("v-grid-context-menu__split");
            } else {
              a.classList.add("v-grid-context-menu__link");
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
          var _temp, _this, _ret;

          _classCallCheck(this, ContextMenuHeader);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _ContextMenu.call.apply(_ContextMenu, [this].concat(args))), _this), _this.classToOpenOn = "vGrid-queryField", _this.altMenuLogic = null, _temp), _possibleConstructorReturn(_this, _ret);
        }

        ContextMenuHeader.prototype.menuItemListener = function menuItemListener(link) {
          var value = link.getAttribute("data-action");

          if (this.altMenuLogic) {
            this.filterMenuLogic(value);
          } else {
            this.defaultMenu(value);
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

      _export('ContextMenuCell', ContextMenuCell = (_dec3 = customAttribute('v-grid-context-menu-cell'), _dec4 = inject(Element, Optional.of(VGridCellContainer)), _dec3(_class3 = _dec4(_class3 = function (_ContextMenu2) {
        _inherits(ContextMenuCell, _ContextMenu2);

        function ContextMenuCell() {
          var _temp2, _this2, _ret2;

          _classCallCheck(this, ContextMenuCell);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _ContextMenu2.call.apply(_ContextMenu2, [this].concat(args))), _this2), _this2.classToOpenOn = "vGrid-row-cell", _this2.altMenuLogic = null, _temp2), _possibleConstructorReturn(_this2, _ret2);
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

          if (e.target === this.parent.vGrid.vGridCellHelper.curElement || e.target.firstChild === this.parent.vGrid.vGridCellHelper.curElement) {
            if (this.parent.editMode()) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
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
          var _this3 = this;

          switch (value) {
            case "copy-cell":
              this.parent.vGrid.vGridCellHelper.cellValue = this.parent.vGrid.vGridCurrentEntityRef[this.parent.attribute()];
              this.toggleMenuOff();
              this.parent.vGrid.vGridCellHelper.refocus();
              break;
            case "paste-cell":
              if (this.parent.vGrid.vGridCellHelper.cellValue !== null) {
                var rows = this.parent.vGrid.vGridSelection.getSelectedRows();
                rows.forEach(function (x) {
                  _this3.parent.vGrid.vGridCollectionFiltered[x][_this3.parent.attribute()] = _this3.parent.vGrid.vGridCellHelper.cellValue;
                });
                this.parent.vGrid.vGridGenerator.fillDataInRows();
                this.parent.vGrid.vGridCellHelper.refocus();
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
      }(ContextMenu)) || _class3) || _class3));

      _export('ContextMenuCell', ContextMenuCell);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR1EsWSxxQkFBQSxNO0FBQVEscUIscUJBQUEsZTtBQUFpQixjLHFCQUFBLFE7O0FBQ3pCLHdCLG1CQUFBLGtCOztBQUNBLHdCLGdCQUFBLGtCOzs7QUFHSixpQjtBQUVGLDZCQUFZLE9BQVosRUFBcUIsTUFBckIsRUFBNkI7QUFBQTs7QUFDM0IsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxlQUFLLG9CQUFMLEdBQTRCLHFCQUE1QjtBQUNBLGVBQUssd0JBQUwsR0FBZ0MsMkJBQWhDO0FBQ0EsZUFBSyx3QkFBTCxHQUFnQywyQkFBaEM7QUFDQSxlQUFLLGlCQUFMLEdBQXlCLDZCQUF6Qjs7QUFHQSxlQUFLLGlCQUFMOztBQUVBLGVBQUssV0FBTDtBQUNBLGVBQUssWUFBTDtBQUNBLGVBQUssWUFBTDs7QUFHQSxlQUFLLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxlQUFLLFNBQUw7QUFDQSxlQUFLLFVBQUw7QUFDQSxlQUFLLFlBQUw7QUFDQSxlQUFLLGFBQUw7QUFDQSxlQUFLLGFBQUw7O0FBRUEsZUFBSyxXQUFMO0FBQ0EsZUFBSyxZQUFMO0FBR0Q7OzhCQUdELFEsdUJBQVc7QUFDVCxlQUFLLFdBQUw7QUFFRCxTOzs4QkFHRCxRLHVCQUFXO0FBQ1QsZUFBSyxjQUFMO0FBQ0QsUzs7OEJBRUQsTyxzQkFBVTtBQUNSLGlCQUFPLElBQVA7QUFDRCxTOzs4QkFFRCxXLDBCQUFjO0FBQ1osZUFBSyxxQkFBTCxHQUE2QixLQUFLLGVBQUwsQ0FBcUIsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBN0I7QUFDQSxlQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixhQUE5QixFQUE2QyxLQUFLLHFCQUFsRDtBQUNELFM7OzhCQUdELGMsNkJBQWlCO0FBQ2YsZUFBSyxPQUFM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
