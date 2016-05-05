'use strict';

System.register(['aurelia-framework', './v-grid-cell-header'], function (_export, _context) {
  var inject, customAttribute, Optional, VGridCellRowHeader, _dec, _dec2, _class, ContextMenu, ContextMenuHeader;

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
    }, function (_vGridCellHeader) {
      VGridCellRowHeader = _vGridCellHeader.VGridCellRowHeader;
    }],
    execute: function () {
      ContextMenu = function () {
        function ContextMenu(element, vGridCellRowHeader) {
          _classCallCheck(this, ContextMenu);

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

        ContextMenu.prototype.attached = function attached() {
          this.addListener();
        };

        ContextMenu.prototype.detached = function detached() {
          this.removeListener();
        };

        ContextMenu.prototype.addListener = function addListener() {
          this.contextListenerBinded = this.contextListener.bind(this);
          this.element.addEventListener("contextmenu", this.contextListenerBinded);
        };

        ContextMenu.prototype.removeListener = function removeListener() {
          this.element.removeEventListener("contextmenu", this.contextListenerBinded);
        };

        ContextMenu.prototype.contextListener = function contextListener(e) {
          this.taskItemInContext = this.clickInsideElement(e, this.classToOpenOn);

          if (this.taskItemInContext) {
            e.preventDefault();
            this.toggleMenuOn();
            this.positionMenu(e);
          } else {
            this.taskItemInContext = null;
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
              this.parent.cellInputElement.value = "";
              if (this.parent.cellInputElement.onkeydown) {
                this.parent.cellInputElement.onkeydown({ keyKode: 13 });
              } else {
                this.parent.cellInputElement.onchange({ keyKode: 13 });
              }
              this.toggleMenuOff();
              break;
            case "show-all":
              var queryHtmlInput = this.parent.vGrid.element.querySelectorAll("." + this.parent.vGridConfig.css.filterHandle);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR1E7QUFBUTtBQUFpQjs7QUFDekI7OztBQUdKO0FBRUYsaUJBRkUsV0FFRixDQUFZLE9BQVosRUFBcUIsa0JBQXJCLEVBQXlDO2dDQUZ2QyxhQUV1Qzs7QUFDdkMsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUR1QztBQUV2QyxlQUFLLE1BQUwsR0FBYyxrQkFBZCxDQUZ1QztBQUd2QyxlQUFLLG9CQUFMLEdBQTRCLHFCQUE1QixDQUh1QztBQUl2QyxlQUFLLHdCQUFMLEdBQWdDLDJCQUFoQyxDQUp1QztBQUt2QyxlQUFLLHdCQUFMLEdBQWdDLDJCQUFoQyxDQUx1QztBQU12QyxlQUFLLGlCQUFMLEdBQXlCLDZCQUF6QixDQU51Qzs7QUFTdkMsZUFBSyxpQkFBTCxDQVR1Qzs7QUFXdkMsZUFBSyxXQUFMLENBWHVDO0FBWXZDLGVBQUssWUFBTCxDQVp1QztBQWF2QyxlQUFLLFlBQUwsQ0FidUM7O0FBZ0J2QyxlQUFLLFNBQUwsR0FBaUIsQ0FBakIsQ0FoQnVDO0FBaUJ2QyxlQUFLLFNBQUwsQ0FqQnVDO0FBa0J2QyxlQUFLLFVBQUwsQ0FsQnVDO0FBbUJ2QyxlQUFLLFlBQUwsQ0FuQnVDO0FBb0J2QyxlQUFLLGFBQUwsQ0FwQnVDO0FBcUJ2QyxlQUFLLGFBQUwsQ0FyQnVDOztBQXVCdkMsZUFBSyxXQUFMLENBdkJ1QztBQXdCdkMsZUFBSyxZQUFMLENBeEJ1QztTQUF6Qzs7QUFGRSw4QkFnQ0YsK0JBQVc7QUFDVCxlQUFLLFdBQUwsR0FEUzs7O0FBaENULDhCQXNDRiwrQkFBVztBQUNULGVBQUssY0FBTCxHQURTOzs7QUF0Q1QsOEJBMkNGLHFDQUFjO0FBQ1osZUFBSyxxQkFBTCxHQUE2QixLQUFLLGVBQUwsQ0FBcUIsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBN0IsQ0FEWTtBQUVaLGVBQUssT0FBTCxD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Y0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcEMsR0FBNEQsR0FBNUQsQ0FERjtBQUVFLG1CQUFLLGFBQUwsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDLEdBSEY7QUFJRSxvQkFKRjtBQTFCRixpQkErQk8sY0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcEMsR0FBNEQsSUFBNUQsQ0FERjtBQUVFLG1CQUFLLGFBQUwsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDLEdBSEY7QUFJRSxvQkFKRjtBQS9CRixpQkFvQ08sY0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcEMsR0FBNEQsSUFBNUQsQ0FERjtBQUVFLG1CQUFLLGFBQUwsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDLEdBSEY7QUFJRSxvQkFKRjtBQXBDRixpQkF5Q08sY0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcEMsR0FBNEQsSUFBNUQsQ0FERjtBQUVFLG1CQUFLLGFBQUwsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDLEdBSEY7QUFJRSxvQkFKRjtBQXpDRixpQkE4Q08sZUFBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcEMsR0FBNEQsSUFBNUQsQ0FERjtBQUVFLG1CQUFLLGFBQUwsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDLEdBSEY7QUFJRSxvQkFKRjtBQTlDRjtBQW9ESSxzQkFBUSxHQUFSLENBQVksS0FBWixFQURGO0FBRUUsbUJBQUssYUFBTCxHQUZGOztBQW5ERixXQURvQjs7QUEwRHBCLGVBQUssWUFBTCxHQUFvQixJQUFwQixDQTFEb0I7OztlQTFIWDtRQUEwQiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29udGV4dG1lbnUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
