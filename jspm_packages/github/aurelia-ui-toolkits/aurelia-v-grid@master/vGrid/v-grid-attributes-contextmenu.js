/* */ 
define(['exports', 'aurelia-framework', './v-grid', './v-grid-contextmenu'], function (exports, _aureliaFramework, _vGrid, _vGridContextmenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContextRowMenu = exports.VGridHeaderMenu = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  var VGridHeaderMenu = exports.VGridHeaderMenu = (_dec = (0, _aureliaFramework.customAttribute)('v-header-menu'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec(_class = _dec2(_class = function (_Contextmenu) {
    _inherits(VGridHeaderMenu, _Contextmenu);

    function VGridHeaderMenu() {
      var _temp, _this, _ret;

      _classCallCheck(this, VGridHeaderMenu);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Contextmenu.call.apply(_Contextmenu, [this].concat(args))), _this), _this.classToOpenOn = "vGrid-header-menu", _this.altMenuLogic = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    VGridHeaderMenu.prototype.menuItemListener = function menuItemListener(link) {
      var value = link.getAttribute("data-action");

      if (this.altMenuLogic) {
        this.filterMenuLogic(value);
      } else {
        this.defaultMenu(value);
      }
    };

    VGridHeaderMenu.prototype.canOpen = function canOpen(e) {
      return true;
    };

    VGridHeaderMenu.prototype.menuHtmlMain = function menuHtmlMain() {
      return this.createMenuHTML([{
        action: "",
        value: "Options",
        isHeader: true
      }, {
        action: "clear-cell",
        value: "Clear cell"
      }, {
        action: "clear-all",
        value: "Clear All Cells"
      }, {
        action: "show-all",
        value: "Show all (keep filter text)"
      }, {
        action: "set-filter",
        value: "Set Filter"
      }]);
    };

    VGridHeaderMenu.prototype.menuHtmlSetFilter = function menuHtmlSetFilter() {
      return this.createMenuHTML([{
        action: "",
        value: "Set filter",
        isHeader: true
      }, {
        action: "set-filter-1",
        value: "equals"
      }, {
        action: "set-filter-2",
        value: "less than or eq"
      }, {
        action: "set-filter-3",
        value: "greater than or eq"
      }, {
        action: "set-filter-4",
        value: "less than"
      }, {
        action: "set-filter-5",
        value: "greater than"
      }, {
        action: "set-filter-6",
        value: "contains"
      }, {
        action: "set-filter-7",
        value: "not equal to"
      }, {
        action: "set-filter-8",
        value: "does not contain"
      }, {
        action: "set-filter-9",
        value: "begins with"
      }, {
        action: "set-filter-10",
        value: "ends with"
      }]);
    };

    VGridHeaderMenu.prototype.defaultMenu = function defaultMenu(value) {

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
          this.toggleMenuOff();
      }
    };

    VGridHeaderMenu.prototype.triggerEvent = function triggerEvent(name, data) {
      var event = new CustomEvent(name, {
        detail: data,
        bubbles: true
      });
      this.vGrid.element.dispatchEvent(event);
    };

    VGridHeaderMenu.prototype.filterMenuLogic = function filterMenuLogic(value) {
      var newOperator = null;
      switch (value) {
        case "set-filter-1":
          newOperator = "=";
          break;
        case "set-filter-2":
          newOperator = "<=";
          break;
        case "set-filter-3":
          newOperator = ">=";
          break;
        case "set-filter-4":
          newOperator = "<";
          break;
        case "set-filter-5":
          newOperator = ">";
          break;
        case "set-filter-6":
          newOperator = "*";
          break;
        case "set-filter-7":
          newOperator = "!=";
          break;
        case "set-filter-8":
          newOperator = "!*";
          break;
        case "set-filter-9":
          newOperator = "*=";
          break;
        case "set-filter-10":
          newOperator = "=*";
          this.toggleMenuOff();
          break;
        default:
          this.toggleMenuOff();
      }
      if (newOperator) {
        this.triggerEvent("filterUpdate", {
          attribute: this.value,
          operator: newOperator
        });
        this.toggleMenuOff();
      }

      this.altMenuLogic = null;
    };

    return VGridHeaderMenu;
  }(_vGridContextmenu.Contextmenu)) || _class) || _class);
  var ContextRowMenu = exports.ContextRowMenu = (_dec3 = (0, _aureliaFramework.customAttribute)('v-row-menu'), _dec4 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec3(_class3 = _dec4(_class3 = function (_Contextmenu2) {
    _inherits(ContextRowMenu, _Contextmenu2);

    function ContextRowMenu() {
      var _temp2, _this2, _ret2;

      _classCallCheck(this, ContextRowMenu);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _Contextmenu2.call.apply(_Contextmenu2, [this].concat(args))), _this2), _this2.classToOpenOn = "vGrid-row-menu", _this2.altMenuLogic = null, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    ContextRowMenu.prototype.menuItemListener = function menuItemListener(link) {
      var value = link.getAttribute("data-action");
      if (this.altMenuLogic) {
        this.filterMenuLogic(value);
      } else {
        this.defaultMenu(value);
      }
    };

    ContextRowMenu.prototype.canOpen = function canOpen(e) {
      return true;
    };

    ContextRowMenu.prototype.menuHtmlMain = function menuHtmlMain() {
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

    ContextRowMenu.prototype.defaultMenu = function defaultMenu(value) {
      var _this3 = this;

      switch (value) {
        case "copy-cell":
          this.vGrid.vGridConfig.cellValue = this.bindingContext.rowRef[this.value];
          this.toggleMenuOff();
          break;
        case "paste-cell":
          if (this.vGrid.vGridConfig.cellValue !== null) {
            var rows = this.vGrid.vGridSelection.getSelectedRows();
            rows.forEach(function (x) {
              _this3.vGrid.vGridCollectionFiltered[x][_this3.value] = _this3.vGrid.vGridConfig.cellValue;
            });
            this.vGrid.vGridGenerator.rebindAllRowSlots();
          }
          this.toggleMenuOff();
          break;
        default:
          this.toggleMenuOff();
      }
    };

    return ContextRowMenu;
  }(_vGridContextmenu.Contextmenu)) || _class3) || _class3);
});