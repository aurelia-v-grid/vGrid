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
                if (!this.parent.readOnly()) {
                  var rows = this.parent.vGrid.vGridSelection.getSelectedRows();
                  rows.forEach(function (x) {
                    _this3.parent.vGrid.vGridCollectionFiltered[x][_this3.parent.attribute()] = _this3.parent.vGrid.vGridCellHelper.cellValue;
                  });
                  this.parent.vGrid.vGridGenerator.fillDataInRows();
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR1E7QUFBUTtBQUFpQjs7QUFDekI7O0FBQ0E7OztBQUdKO0FBRUYsaUJBRkUsV0FFRixDQUFZLE9BQVosRUFBcUIsTUFBckIsRUFBNkI7Z0NBRjNCLGFBRTJCOztBQUMzQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRDJCO0FBRTNCLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FGMkI7QUFHM0IsZUFBSyxvQkFBTCxHQUE0QixxQkFBNUIsQ0FIMkI7QUFJM0IsZUFBSyx3QkFBTCxHQUFnQywyQkFBaEMsQ0FKMkI7QUFLM0IsZUFBSyx3QkFBTCxHQUFnQywyQkFBaEMsQ0FMMkI7QUFNM0IsZUFBSyxpQkFBTCxHQUF5Qiw2QkFBekIsQ0FOMkI7O0FBUzNCLGVBQUssaUJBQUwsQ0FUMkI7O0FBVzNCLGVBQUssV0FBTCxDQVgyQjtBQVkzQixlQUFLLFlBQUwsQ0FaMkI7QUFhM0IsZUFBSyxZQUFMLENBYjJCOztBQWdCM0IsZUFBSyxTQUFMLEdBQWlCLENBQWpCLENBaEIyQjtBQWlCM0IsZUFBSyxTQUFMLENBakIyQjtBQWtCM0IsZUFBSyxVQUFMLENBbEIyQjtBQW1CM0IsZUFBSyxZQUFMLENBbkIyQjtBQW9CM0IsZUFBSyxhQUFMLENBcEIyQjtBQXFCM0IsZUFBSyxhQUFMLENBckIyQjs7QUF1QjNCLGVBQUssV0FBTCxDQXZCMkI7QUF3QjNCLGVBQUssWUFBTCxDQXhCMkI7U0FBN0I7O0FBRkUsOEJBZ0NGLCtCQUFXO0FBQ1QsZUFBSyxXQUFMLEdBRFM7OztBQWhDVCw4QkFzQ0YsK0JBQVc7QUFDVCxlQUFLLGNBQUwsR0FEUzs7O0FBdENULDhCQTBDRiw2QkFBVTtBQUNSLGlCQUFPLElBQVAsQ0FEUTs7O0FBMUNSLDhCQThDRixxQ0FBYztBQUNaLGVBQUsscUJBQUwsR0FBNkIsS0FBSyxlQUFMLENBQXFC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O0FBQ0Qsb0JBQVEsWUFBUjtBQUNBLG1CQUFPLCtCQUFQO0FBQ0Esc0JBQVUsS0FBVjtXQVp1QixDQUFwQixDQUFQLENBRGE7OztBQTdCSixrQ0ErQ1gsbUNBQVksT0FBTzs7O0FBQ2pCLGtCQUFRLEtBQVI7QUFDRSxpQkFBSyxXQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsZUFBbEIsQ0FBa0MsU0FBbEMsR0FBOEMsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixxQkFBbEIsQ0FBd0MsS0FBSyxNQUFMLENBQVksU0FBWixFQUF4QyxDQUE5QyxDQURGO0FBRUUsbUJBQUssYUFBTCxHQUZGO0FBR0UsbUJBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsZUFBbEIsQ0FBa0MsT0FBbEMsR0FIRjtBQUlFLG9CQUpGO0FBREYsaUJBTU8sWUFBTDtBQUNFLGtCQUFJLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsZUFBbEIsQ0FBa0MsU0FBbEMsS0FBZ0QsSUFBaEQsRUFBc0Q7QUFDeEQsb0JBQUcsQ0FBQyxLQUFLLE1BQUwsQ0FBWSxRQUFaLEVBQUQsRUFBd0I7QUFDekIsc0JBQUksT0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGVBQWpDLEVBQVAsQ0FEcUI7QUFFekIsdUJBQUssT0FBTCxDQUFhLFVBQUMsQ0FBRCxFQUFNO0FBQ2pCLDJCQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLHVCQUFsQixDQUEwQyxDQUExQyxFQUE2QyxPQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQTdDLElBQXdFLE9BQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsZUFBbEIsQ0FBa0MsU0FBbEMsQ0FEdkQ7bUJBQU4sQ0FBYixDQUZ5QjtBQUt6Qix1QkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixjQUFsQixDQUFpQyxjQUFqQyxHQUx5QjtpQkFBM0I7QUFPQSxxQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixlQUFsQixDQUFrQyxPQUFsQyxHQVJ3RDtlQUExRCxNQVNPO0FBQ0wsd0JBQVEsR0FBUixDQUFZLFVBQVosRUFESztlQVRQO0FBWUEsbUJBQUssYUFBTCxHQWJGO0FBY0Usb0JBZEY7QUFORjtBQXNCSSxzQkFBUSxHQUFSLENBQVksS0FBWixFQURGO0FBRUUsbUJBQUssYUFBTCxHQUZGOztBQXJCRixXQURpQjs7O2VBL0NSO1FBQXdCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
