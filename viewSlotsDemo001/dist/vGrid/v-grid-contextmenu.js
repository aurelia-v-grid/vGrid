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
          this.menu.innerHTML = this.menuHtml();
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

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _ContextMenu.call.apply(_ContextMenu, [this].concat(args))), _this), _this.classToOpenOn = "vGrid-queryField", _temp), _possibleConstructorReturn(_this, _ret);
        }

        ContextMenuHeader.prototype.menuHtml = function menuHtml() {
          return '\n    <ul>\n        <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__link" data-action="clear-cell">Clear cell</a>\n        </li>   \n        <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__link" data-action="show-all">Show all (keep filter text)</a>\n        </li> \n        <li class="v-grid-context-menu__item">\n          <a class="v-grid-context-menu__link" data-action="set-filter">Set Filter</a>\n        </li>     \n    </ul>\n    ';
        };

        ContextMenuHeader.prototype.menuHtml2 = function menuHtml2() {
          return '\n    <ul>\n        <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__split" data-action="">Set filter</a>\n        </li>   \n        <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__link" data-action="set-filter-equals">equals</a>\n        </li> \n        <li class="v-grid-context-menu__item">\n          <a class="v-grid-context-menu__link" data-action="set-filter-less than or eq">less than or eq</a>\n        </li>\n         <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__link" data-action="set-filter-greater than or eq">greater than or eq</a>\n        </li>   \n        <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__link" data-action="set-filter-less than">less than</a>\n        </li> \n        <li class="v-grid-context-menu__item">\n          <a class="v-grid-context-menu__link" data-action="set-filter-greater than">greater than</a>\n        </li>\n        <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__link" data-action="set-filter-contains">contains</a>\n        </li> \n        <li class="v-grid-context-menu__item">\n          <a class="v-grid-context-menu__link" data-action="set-filter-not equal to">not equal to</a>\n        </li>\n         <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__link" data-action="set-filter-does not contain">does not contain</a>\n        </li>   \n        <li class="v-grid-context-menu__item">\n          <a  class="v-grid-context-menu__link" data-action="set-filter-begins with">begins with</a>\n        </li> \n        <li class="v-grid-context-menu__item">\n          <a class="v-grid-context-menu__link" data-action="set-filter-ends with">ends with</a>\n        </li>\n    </ul>\n    ';
        };

        ContextMenuHeader.prototype.menuItemListener = function menuItemListener(link) {
          var value = link.getAttribute("data-action");

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
              this.parent.vGridConfig.filterArray[this.parent.columnNo] = "<";
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

        return ContextMenuHeader;
      }(ContextMenu)) || _class) || _class));

      _export('ContextMenuHeader', ContextMenuHeader);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb250ZXh0bWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR1E7QUFBUTtBQUFpQjs7QUFDekI7OztBQUdKO0FBRUYsaUJBRkUsV0FFRixDQUFZLE9BQVosRUFBcUIsa0JBQXJCLEVBQXlDO2dDQUZ2QyxhQUV1Qzs7QUFDdkMsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUR1QztBQUV2QyxlQUFLLE1BQUwsR0FBYyxrQkFBZCxDQUZ1QztBQUd2QyxlQUFLLG9CQUFMLEdBQTRCLHFCQUE1QixDQUh1QztBQUl2QyxlQUFLLHdCQUFMLEdBQWdDLDJCQUFoQyxDQUp1QztBQUt2QyxlQUFLLHdCQUFMLEdBQWdDLDJCQUFoQyxDQUx1QztBQU12QyxlQUFLLGlCQUFMLEdBQXlCLDZCQUF6QixDQU51Qzs7QUFTdkMsZUFBSyxpQkFBTCxDQVR1Qzs7QUFXdkMsZUFBSyxXQUFMLENBWHVDO0FBWXZDLGVBQUssWUFBTCxDQVp1QztBQWF2QyxlQUFLLFlBQUwsQ0FidUM7O0FBZ0J2QyxlQUFLLFNBQUwsR0FBaUIsQ0FBakIsQ0FoQnVDO0FBaUJ2QyxlQUFLLFNBQUwsQ0FqQnVDO0FBa0J2QyxlQUFLLFVBQUwsQ0FsQnVDO0FBbUJ2QyxlQUFLLFlBQUwsQ0FuQnVDO0FBb0J2QyxlQUFLLGFBQUwsQ0FwQnVDO0FBcUJ2QyxlQUFLLGFBQUwsQ0FyQnVDOztBQXVCdkMsZUFBSyxXQUFMLENBdkJ1QztBQXdCdkMsZUFBSyxZQUFMLENBeEJ1QztTQUF6Qzs7QUFGRSw4QkFnQ0YsK0JBQVc7QUFDVCxlQUFLLFdBQUwsR0FEUzs7O0FBaENULDhCQXNDRiwrQkFBVztBQUNULGVBQUssY0FBTCxHQURTOzs7QUF0Q1QsOEJBMkNGLHFDQUFjO0FBQ1osZUFBSyxxQkFBTCxHQUE2QixLQUFLLGVBQUwsQ0FBcUIsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBN0IsQ0FEWTtBQUVaLGVBQUssT0FBTCxD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
