'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, ContextMenu, ContextMenuHeader;

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
      ContextMenu = function () {
        function ContextMenu(element, vGrid) {
          _classCallCheck(this, ContextMenu);

          this.element = element;
          this.parent = vGrid;

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
          if (this.vGrid.vGridConfig.contextmenu) {
            this.addListener();
          }
        };

        ContextMenu.prototype.detached = function detached() {
          if (this.vGrid.vGridConfig.contextmenu) {
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

      _export('ContextMenuHeader', ContextMenuHeader = (_dec = customAttribute('v-grid-context-menu-header'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function (_ContextMenu) {
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
          return true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWNvbnRleHRtZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFRLFkscUJBQUEsTTtBQUFRLHFCLHFCQUFBLGU7QUFBaUIsYyxxQkFBQSxROztBQUl6QixXLFVBQUEsSzs7O0FBT0osaUI7QUFFRiw2QkFBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLE1BQUwsR0FBYyxLQUFkOztBQUdBLGVBQUssb0JBQUwsR0FBNEIscUJBQTVCO0FBQ0EsZUFBSyx3QkFBTCxHQUFnQywyQkFBaEM7QUFDQSxlQUFLLHdCQUFMLEdBQWdDLDJCQUFoQztBQUNBLGVBQUsseUJBQUwsR0FBaUMsNEJBQWpDOztBQUdBLGVBQUssaUJBQUw7O0FBRUEsZUFBSyxXQUFMO0FBQ0EsZUFBSyxZQUFMO0FBQ0EsZUFBSyxZQUFMOztBQUdBLGVBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNBLGVBQUssU0FBTDtBQUNBLGVBQUssVUFBTDtBQUNBLGVBQUssWUFBTDtBQUNBLGVBQUssYUFBTDtBQUNBLGVBQUssYUFBTDs7QUFFQSxlQUFLLFdBQUw7QUFDQSxlQUFLLFlBQUw7QUFHRDs7OEJBR0QsUSx1QkFBVztBQUNULGNBQUcsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixXQUExQixFQUFzQztBQUNwQyxpQkFBSyxXQUFMO0FBQ0Q7QUFDRixTOzs4QkFHRCxRLHVCQUFXO0FBQ1QsY0FBRyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQTFCLEVBQXVDO0FBQ3JDLGlCQUFLLGNBQUw7QUFDRDtBQUNGLFM7OzhCQUdELE8sc0JBQVU7QUFDUixpQkFBTyxJQUFQO0FBQ0QsUzs7OEJBR0QsVywwQkFBYztBQUNaLGVBQUsscUJBQUwsR0FBNkIsS0FBSyxlQUFMLENBQXFCLElBQXJCLENBQTBCLElB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QztBQUNBO0FBQ0YsaUJBQUssY0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQWhELElBQTRELEdBQTVEO0FBQ0EsbUJBQUssYUFBTDtBQUNBLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDO0FBQ0E7QUFDRixpQkFBSyxjQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsV0FBeEIsQ0FBb0MsS0FBSyxNQUFMLENBQVksUUFBaEQsSUFBNEQsR0FBNUQ7QUFDQSxtQkFBSyxhQUFMO0FBQ0EsbUJBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsY0FBbEIsQ0FBaUMsY0FBakM7QUFDQTtBQUNGLGlCQUFLLGNBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixXQUF4QixDQUFvQyxLQUFLLE1BQUwsQ0FBWSxRQUFoRCxJQUE0RCxJQUE1RDtBQUNBLG1CQUFLLGFBQUw7QUFDQSxtQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixjQUFsQixDQUFpQyxjQUFqQztBQUNBO0FBQ0YsaUJBQUssY0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFdBQXhCLENBQW9DLEtBQUssTUFBTCxDQUFZLFFBQWhELElBQTRELElBQTVEO0FBQ0EsbUJBQUssYUFBTDtBQUNBLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLGNBQWxCLENBQWlDLGNBQWpDO0FBQ0E7QUFDRixpQkFBSyxjQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsV0FBeEIsQ0FBb0MsS0FBSyxNQUFMLENBQVksUUFBaEQsSUFBNEQsSUFBNUQ7QUFDQSxtQkFBSyxhQUFMO0FBQ0EsbUJBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsY0FBbEIsQ0FBaUMsY0FBakM7QUFDQTtBQUNGLGlCQUFLLGVBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksV0FBWixDQUF3QixXQUF4QixDQUFvQyxLQUFLLE1BQUwsQ0FBWSxRQUFoRCxJQUE0RCxJQUE1RDtBQUNBLG1CQUFLLGFBQUw7QUFDQSxtQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixjQUFsQixDQUFpQyxjQUFqQztBQUNBO0FBQ0Y7QUFDRSxzQkFBUSxHQUFSLENBQVksS0FBWjtBQUNBLG1CQUFLLGFBQUw7QUFyREo7O0FBd0RBLGVBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNELFM7OztRQXZMb0MsVyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtYXR0cmlidXRlcy1jb250ZXh0bWVudS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
