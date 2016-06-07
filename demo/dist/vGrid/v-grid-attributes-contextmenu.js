'use strict';

System.register(['aurelia-framework', './v-grid', './v-grid-contextmenu'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, Contextmenu, _dec, _dec2, _class, _dec3, _dec4, _class3, VGridHeaderMenu, ContextRowMenu;

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

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }, function (_vGridContextmenu) {
      Contextmenu = _vGridContextmenu.Contextmenu;
    }],
    execute: function () {
      _export('VGridHeaderMenu', VGridHeaderMenu = (_dec = customAttribute('v-header-menu'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function (_Contextmenu) {
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
      }(Contextmenu)) || _class) || _class));

      _export('VGridHeaderMenu', VGridHeaderMenu);

      _export('ContextRowMenu', ContextRowMenu = (_dec3 = customAttribute('v-row-menu'), _dec4 = inject(Element, VGrid), _dec3(_class3 = _dec4(_class3 = function (_Contextmenu2) {
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
      }(Contextmenu)) || _class3) || _class3));

      _export('ContextRowMenu', ContextRowMenu);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWNvbnRleHRtZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFRLFkscUJBQUEsTTtBQUFRLHFCLHFCQUFBLGU7O0FBQ1IsVyxVQUFBLEs7O0FBQ0EsaUIscUJBQUEsVzs7O2lDQVFLLGUsV0FGWixnQkFBZ0IsZUFBaEIsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixDOzs7Ozs7Ozs7Ozs7c0pBRUMsYSxHQUFnQixtQixRQUNoQixZLEdBQWUsSTs7O2tDQUlmLGdCLDZCQUFpQixJLEVBQU07QUFDckIsY0FBSSxRQUFRLEtBQUssWUFBTCxDQUFrQixhQUFsQixDQUFaOztBQUVBLGNBQUksS0FBSyxZQUFULEVBQXVCO0FBQ3JCLGlCQUFLLGVBQUwsQ0FBcUIsS0FBckI7QUFDRCxXQUZELE1BRU87QUFDTCxpQkFBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0Q7QUFDRixTOztrQ0FHRCxPLG9CQUFRLEMsRUFBRztBQUNULGlCQUFPLElBQVA7QUFDRCxTOztrQ0FJRCxZLDJCQUFlO0FBQ2IsaUJBQU8sS0FBSyxjQUFMLENBQW9CLENBQ3pCO0FBQ0Usb0JBQVEsRUFEVjtBQUVFLG1CQUFPLFNBRlQ7QUFHRSxzQkFBVTtBQUhaLFdBRHlCLEVBS3RCO0FBQ0Qsb0JBQVEsWUFEUDtBQUVELG1CQUFPO0FBRk4sV0FMc0IsRUFRdEI7QUFDRCxvQkFBUSxXQURQO0FBRUQsbUJBQU87QUFGTixXQVJzQixFQVd0QjtBQUNELG9CQUFRLFVBRFA7QUFFRCxtQkFBTztBQUZOLFdBWHNCLEVBY3RCO0FBQ0Qsb0JBQVEsWUFEUDtBQUVELG1CQUFPO0FBRk4sV0Fkc0IsQ0FBcEIsQ0FBUDtBQW1CRCxTOztrQ0FJRCxpQixnQ0FBb0I7QUFDbEIsaUJBQU8sS0FBSyxjQUFMLENBQW9CLENBQ3pCO0FBQ0Usb0JBQVEsRUFEVjtBQUVFLG1CQUFPLFlBRlQ7QUFH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QUFrQztBQUNoQyx5QkFBVyxLQUFLLEtBRGdCO0FBRWhDLHdCQUFVO0FBRnNCLGFBQWxDO0FBSUEsaUJBQUssYUFBTDtBQUNEOztBQUdELGVBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNELFM7OztRQWhMa0MsVzs7OztnQ0E0THhCLGMsWUFGWixnQkFBZ0IsWUFBaEIsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixDOzs7Ozs7Ozs7Ozs7NkpBRUMsYSxHQUFnQixnQixTQUNoQixZLEdBQWUsSTs7O2lDQUlmLGdCLDZCQUFpQixJLEVBQU07QUFDckIsY0FBSSxRQUFRLEtBQUssWUFBTCxDQUFrQixhQUFsQixDQUFaO0FBQ0EsY0FBSSxLQUFLLFlBQVQsRUFBdUI7QUFDckIsaUJBQUssZUFBTCxDQUFxQixLQUFyQjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFDRDtBQUNGLFM7O2lDQUdELE8sb0JBQVEsQyxFQUFHO0FBQ1QsaUJBQU8sSUFBUDtBQUNELFM7O2lDQUlELFksMkJBQWU7QUFDYixpQkFBTyxLQUFLLGNBQUwsQ0FBb0IsQ0FDekI7QUFDRSxvQkFBUSxFQURWO0FBRUUsbUJBQU8sU0FGVDtBQUdFLHNCQUFVO0FBSFosV0FEeUIsRUFLdEI7QUFDRCxvQkFBUSxXQURQO0FBRUQsbUJBQU8saUJBRk47QUFHRCxzQkFBVTtBQUhULFdBTHNCLEVBU3RCO0FBQ0Qsb0JBQVEsWUFEUDtBQUVELG1CQUFPLCtCQUZOO0FBR0Qsc0JBQVU7QUFIVCxXQVRzQixDQUFwQixDQUFQO0FBZUQsUzs7aUNBR0QsVyx3QkFBWSxLLEVBQU87QUFBQTs7QUFDakIsa0JBQVEsS0FBUjtBQUNFLGlCQUFLLFdBQUw7QUFDRSxtQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixHQUFtQyxLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBMkIsS0FBSyxLQUFoQyxDQUFuQztBQUNBLG1CQUFLLGFBQUw7QUFDQTtBQUNGLGlCQUFLLFlBQUw7QUFDRSxrQkFBSSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLEtBQXFDLElBQXpDLEVBQStDO0FBQzdDLG9CQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixlQUExQixFQUFYO0FBQ0EscUJBQUssT0FBTCxDQUFhLFVBQUMsQ0FBRCxFQUFNO0FBQ2pCLHlCQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxDQUFuQyxFQUFzQyxPQUFLLEtBQTNDLElBQW9ELE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBM0U7QUFDRCxpQkFGRDtBQUdBLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGlCQUExQjtBQUNEO0FBQ0QsbUJBQUssYUFBTDtBQUNBO0FBQ0Y7QUFDRSxtQkFBSyxhQUFMO0FBaEJKO0FBa0JELFM7OztRQTVEaUMsVyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtYXR0cmlidXRlcy1jb250ZXh0bWVudS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
