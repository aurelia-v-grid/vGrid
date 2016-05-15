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

      _export('ContextMenuCell', ContextMenuCell = (_dec3 = customAttribute('v-grid-context-menu-cell'), _dec4 = inject(Element, Optional.of(VGridCellContainer)), _dec3(_class3 = _dec4(_class3 = function (_ContextMenu2) {
        _inherits(ContextMenuCell, _ContextMenu2);

        function ContextMenuCell() {
          var _temp2, _this3, _ret2;

          _classCallCheck(this, ContextMenuCell);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, _ContextMenu2.call.apply(_ContextMenu2, [this].concat(args))), _this3), _this3.classToOpenOn = "vGrid-row-cell", _this3.altMenuLogic = null, _temp2), _possibleConstructorReturn(_this3, _ret2);
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
          var _this4 = this;

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
                    _this4.parent.vGrid.vGridCollectionFiltered[x][_this4.parent.attribute()] = _this4.parent.vGrid.vGridCellHelper.cellValue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR1E7QUFBUTtBQUFpQjs7QUFDekI7O0FBQ0E7OztBQU9KO0FBRUYsaUJBRkUsV0FFRixDQUFZLE9BQVosRUFBcUIsTUFBckIsRUFBNkI7Z0NBRjNCLGFBRTJCOztBQUMzQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRDJCO0FBRTNCLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FGMkI7O0FBSzNCLGVBQUssb0JBQUwsR0FBNEIscUJBQTVCLENBTDJCO0FBTTNCLGVBQUssd0JBQUwsR0FBZ0MsMkJBQWhDLENBTjJCO0FBTzNCLGVBQUssd0JBQUwsR0FBZ0MsMkJBQWhDLENBUDJCO0FBUTNCLGVBQUsseUJBQUwsR0FBaUMsNEJBQWpDLENBUjJCOztBQVczQixlQUFLLGlCQUFMLENBWDJCOztBQWEzQixlQUFLLFdBQUwsQ0FiMkI7QUFjM0IsZUFBSyxZQUFMLENBZDJCO0FBZTNCLGVBQUssWUFBTCxDQWYyQjs7QUFrQjNCLGVBQUssU0FBTCxHQUFpQixDQUFqQixDQWxCMkI7QUFtQjNCLGVBQUssU0FBTCxDQW5CMkI7QUFvQjNCLGVBQUssVUFBTCxDQXBCMkI7QUFxQjNCLGVBQUssWUFBTCxDQXJCMkI7QUFzQjNCLGVBQUssYUFBTCxDQXRCMkI7QUF1QjNCLGVBQUssYUFBTCxDQXZCMkI7O0FBeUIzQixlQUFLLFdBQUwsQ0F6QjJCO0FBMEIzQixlQUFLLFlBQUwsQ0ExQjJCO1NBQTdCOztBQUZFLDhCQWtDRiwrQkFBVztBQUNULGNBQUcsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixXQUE5QixFQUEwQztBQUMzQyxpQkFBSyxXQUFMLEdBRDJDO1dBQTdDOzs7QUFuQ0EsOEJBeUNGLCtCQUFXO0FBQ1QsY0FBRyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLFdBQWxCLENBQThCLFdB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LG1CQUFPLEtBQVAsQ0FESztXQU5QOzs7QUFqQlMsa0NBOEJYLHVDQUFlO0FBQ2IsaUJBQU8sS0FBSyxjQUFMLENBQW9CLENBQ3pCO0FBQ0Usb0JBQVEsRUFBUjtBQUNBLG1CQUFPLFNBQVA7QUFDQSxzQkFBVSxJQUFWO1dBSnVCLEVBS3RCO0FBQ0Qsb0JBQVEsV0FBUjtBQUNBLG1CQUFPLGlCQUFQO0FBQ0Esc0JBQVUsS0FBVjtXQVJ1QixFQVN0QjtBQUNELG9CQUFRLFlBQVI7QUFDQSxtQkFBTywrQkFBUDtBQUNBLHNCQUFVLEtBQVY7V0FadUIsQ0FBcEIsQ0FBUCxDQURhOzs7QUE5Qkosa0NBa0RYLG1DQUFZLE9BQU87OztBQUNqQixrQkFBUSxLQUFSO0FBQ0UsaUJBQUssV0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGVBQWxCLENBQWtDLFNBQWxDLEdBQThDLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IscUJBQWxCLENBQXdDLEtBQUssTUFBTCxDQUFZLFNBQVosRUFBeEMsQ0FBOUMsQ0FERjtBQUVFLG1CQUFLLGFBQUwsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGVBQWxCLENBQWtDLE9BQWxDLEdBSEY7QUFJRSxvQkFKRjtBQURGLGlCQU1PLFlBQUw7QUFDRSxrQkFBSSxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGVBQWxCLENBQWtDLFNBQWxDLEtBQWdELElBQWhELEVBQXNEO0FBQ3hELG9CQUFHLENBQUMsS0FBSyxNQUFMLENBQVksUUFBWixFQUFELEVBQXdCO0FBQ3pCLHNCQUFJLE9BQU8sS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixjQUFsQixDQUFpQyxlQUFqQyxFQUFQLENBRHFCO0FBRXpCLHVCQUFLLE9BQUwsQ0FBYSxVQUFDLENBQUQsRUFBTTtBQUNqQiwyQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQix1QkFBbEIsQ0FBMEMsQ0FBMUMsRUFBNkMsT0FBSyxNQUFMLENBQVksU0FBWixFQUE3QyxJQUF3RSxPQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGVBQWxCLENBQWtDLFNBQWxDLENBRHZEO21CQUFOLENBQWIsQ0FGeUI7QUFLekIsdUJBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsY0FBbEIsQ0FBaUMsY0FBakMsR0FMeUI7aUJBQTNCO0FBT0EscUJBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsZUFBbEIsQ0FBa0MsT0FBbEMsR0FSd0Q7ZUFBMUQsTUFTTztBQUNMLHdCQUFRLEdBQVIsQ0FBWSxVQUFaLEVBREs7ZUFUUDtBQVlBLG1CQUFLLGFBQUwsR0FiRjtBQWNFLG9CQWRGO0FBTkY7QUFzQkksc0JBQVEsR0FBUixDQUFZLEtBQVosRUFERjtBQUVFLG1CQUFLLGFBQUwsR0FGRjtBQXJCRixXQURpQjs7O2VBbERSO1FBQXdCIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
