/* */ 
define(['exports', 'aurelia-framework', './v-grid-header-col', './v-grid-row-col'], function (exports, _aureliaFramework, _vGridHeaderCol, _vGridRowCol) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContextMenuCell = exports.ContextMenuHeader = undefined;

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

  var _dec, _dec2, _class, _dec3, _dec4, _class3;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ContextMenu = function () {
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

  var ContextMenuHeader = exports.ContextMenuHeader = (_dec = (0, _aureliaFramework.customAttribute)('v-grid-context-menu-header'), _dec2 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGridHeaderCol.VGridCellRowHeader)), _dec(_class = _dec2(_class = function (_ContextMenu) {
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
  }(ContextMenu)) || _class) || _class);
  var ContextMenuCell = exports.ContextMenuCell = (_dec3 = (0, _aureliaFramework.customAttribute)('v-grid-context-menu-cell'), _dec4 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGridRowCol.VGridCellContainer)), _dec3(_class3 = _dec4(_class3 = function (_ContextMenu2) {
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
  }(ContextMenu)) || _class3) || _class3);
});