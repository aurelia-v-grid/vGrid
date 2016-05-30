'use strict';

System.register(['aurelia-framework', './v-grid', './v-grid-contextmenu'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, Contextmenu, _dec, _dec2, _class, _dec3, _dec4, _class3, VGridHeaderMenu, ContextRowMenu;

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
      Optional = _aureliaFramework.Optional;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }, function (_vGridContextmenu) {
      Contextmenu = _vGridContextmenu.Contextmenu;
    }],
    execute: function () {
      _export('VGridHeaderMenu', VGridHeaderMenu = (_dec = customAttribute('v-grid-header-menu'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function (_Contextmenu) {
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
            value: "Clear cell",
            isHeader: false
          }, {
            action: "clear-all",
            value: "Clear All Cells",
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

        VGridHeaderMenu.prototype.menuHtmlSetFilter = function menuHtmlSetFilter() {
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
          switch (value) {
            case "set-filter-1":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-2":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "<="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-3":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: ">="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-4":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "<"
              });
              this.toggleMenuOff();
              break;
            case "set-filter-5":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: ">"
              });
              this.toggleMenuOff();
              break;
            case "set-filter-6":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "*"
              });
              this.toggleMenuOff();
              break;
            case "set-filter-7":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "!="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-8":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "!*"
              });
              this.toggleMenuOff();
              break;
            case "set-filter-9":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "*="
              });
              this.toggleMenuOff();
              break;
            case "set-filter-10":
              this.triggerEvent("filterUpdate", {
                attribute: this.value,
                operator: "*="
              });
              this.toggleMenuOff();
              break;
            default:
              this.toggleMenuOff();
          }

          this.altMenuLogic = null;
        };

        return VGridHeaderMenu;
      }(Contextmenu)) || _class) || _class));

      _export('VGridHeaderMenu', VGridHeaderMenu);

      _export('ContextRowMenu', ContextRowMenu = (_dec3 = customAttribute('v-grid-row-menu'), _dec4 = inject(Element, VGrid), _dec3(_class3 = _dec4(_class3 = function (_Contextmenu2) {
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
                this.vGrid.vGridGenerator.fillDataInRows();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWNvbnRleHRtZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFRLFkscUJBQUEsTTtBQUFRLHFCLHFCQUFBLGU7QUFBaUIsYyxxQkFBQSxROztBQUN6QixXLFVBQUEsSzs7QUFDQSxpQixxQkFBQSxXOzs7aUNBVUssZSxXQUZaLGdCQUFnQixvQkFBaEIsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixDOzs7Ozs7Ozs7Ozs7c0pBRUMsYSxHQUFnQixtQixRQUNoQixZLEdBQWUsSTs7O2tDQUlmLGdCLDZCQUFpQixJLEVBQU07QUFDckIsY0FBSSxRQUFRLEtBQUssWUFBTCxDQUFrQixhQUFsQixDQUFaOztBQUVBLGNBQUksS0FBSyxZQUFULEVBQXVCO0FBQ3JCLGlCQUFLLGVBQUwsQ0FBcUIsS0FBckI7QUFDRCxXQUZELE1BRU87QUFDTCxpQkFBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0Q7QUFFRixTOztrQ0FHRCxPLG9CQUFRLEMsRUFBRztBQUNQLGlCQUFPLElBQVA7QUFDSCxTOztrQ0FJRCxZLDJCQUFlO0FBQ2IsaUJBQU8sS0FBSyxjQUFMLENBQW9CLENBQ3pCO0FBQ0Usb0JBQVEsRUFEVjtBQUVFLG1CQUFPLFNBRlQ7QUFHRSxzQkFBVTtBQUhaLFdBRHlCLEVBS3RCO0FBQ0Qsb0JBQVEsWUFEUDtBQUVELG1CQUFPLFlBRk47QUFHRCxzQkFBVTtBQUhULFdBTHNCLEVBU3RCO0FBQ0Qsb0JBQVEsV0FEUDtBQUVELG1CQUFPLGlCQUZOO0FBR0Qsc0JBQVU7QUFIVCxXQVRzQixFQWF2QjtBQUNBLG9CQUFRLFVBRFI7QUFFQSxtQkFBTyw2QkFGUDtBQUdBLHNCQUFVO0FBSFYsV0FidUIsRUFpQnRCO0FBQ0Qsb0JBQVEsWUFEUDtBQUVELG1CQUFPLFlBRk47QUFHRCxzQkFBVTtBQUhULFdBakJzQixDQUFwQixDQUFQO0FBdUJELFM7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QUFFaEMsMEJBQVM7QUFGdUIsZUFBbEM7QUFJQSxtQkFBSyxhQUFMO0FBQ0E7QUFDRjtBQUNFLG1CQUFLLGFBQUw7QUF4RUo7O0FBMkVBLGVBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNELFM7OztRQTNOa0MsVzs7OztnQ0F3T3hCLGMsWUFGWixnQkFBZ0IsaUJBQWhCLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsQzs7Ozs7Ozs7Ozs7OzZKQUVDLGEsR0FBZ0IsZ0IsU0FDaEIsWSxHQUFlLEk7OztpQ0FJZixnQiw2QkFBaUIsSSxFQUFNO0FBQ3JCLGNBQUksUUFBUSxLQUFLLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBWjtBQUNBLGNBQUksS0FBSyxZQUFULEVBQXVCO0FBQ3JCLGlCQUFLLGVBQUwsQ0FBcUIsS0FBckI7QUFDRCxXQUZELE1BRU87QUFDTCxpQkFBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0Q7QUFDRixTOztpQ0FHRCxPLG9CQUFRLEMsRUFBRztBQUNULGlCQUFPLElBQVA7QUFDRCxTOztpQ0FJRCxZLDJCQUFlO0FBQ2IsaUJBQU8sS0FBSyxjQUFMLENBQW9CLENBQ3pCO0FBQ0Usb0JBQVEsRUFEVjtBQUVFLG1CQUFPLFNBRlQ7QUFHRSxzQkFBVTtBQUhaLFdBRHlCLEVBS3RCO0FBQ0Qsb0JBQVEsV0FEUDtBQUVELG1CQUFPLGlCQUZOO0FBR0Qsc0JBQVU7QUFIVCxXQUxzQixFQVN0QjtBQUNELG9CQUFRLFlBRFA7QUFFRCxtQkFBTywrQkFGTjtBQUdELHNCQUFVO0FBSFQsV0FUc0IsQ0FBcEIsQ0FBUDtBQWVELFM7O2lDQUlELFcsd0JBQVksSyxFQUFPO0FBQUE7O0FBQ2pCLGtCQUFRLEtBQVI7QUFDRSxpQkFBSyxXQUFMO0FBQ0UsbUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsR0FBbUMsS0FBSyxjQUFMLENBQW9CLE1BQXBCLENBQTJCLEtBQUssS0FBaEMsQ0FBbkM7QUFDQSxtQkFBSyxhQUFMO0FBQ0E7QUFDRixpQkFBSyxZQUFMO0FBQ0Usa0JBQUksS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixLQUFxQyxJQUF6QyxFQUErQztBQUMzQyxvQkFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZUFBMUIsRUFBWDtBQUNBLHFCQUFLLE9BQUwsQ0FBYSxVQUFDLENBQUQsRUFBTTtBQUNqQix5QkFBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsQ0FBbkMsRUFBc0MsT0FBSyxLQUEzQyxJQUFvRCxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQTNFO0FBQ0QsaUJBRkQ7QUFHQSxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixjQUExQjtBQUNIO0FBQ0QsbUJBQUssYUFBTDtBQUNBO0FBQ0Y7QUFDRSxtQkFBSyxhQUFMO0FBaEJKO0FBa0JELFM7OztRQTdEaUMsVyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtYXR0cmlidXRlcy1jb250ZXh0bWVudS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
