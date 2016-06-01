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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWNvbnRleHRtZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFRLFkscUJBQUEsTTtBQUFRLHFCLHFCQUFBLGU7QUFBaUIsYyxxQkFBQSxROztBQUN6QixXLFVBQUEsSzs7QUFDQSxpQixxQkFBQSxXOzs7aUNBUUssZSxXQUZaLGdCQUFnQixlQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7Ozs7Ozs7Ozs7OztzSkFFQyxhLEdBQWdCLG1CLFFBQ2hCLFksR0FBZSxJOzs7a0NBSWYsZ0IsNkJBQWlCLEksRUFBTTtBQUNyQixjQUFJLFFBQVEsS0FBSyxZQUFMLENBQWtCLGFBQWxCLENBQVo7O0FBRUEsY0FBSSxLQUFLLFlBQVQsRUFBdUI7QUFDckIsaUJBQUssZUFBTCxDQUFxQixLQUFyQjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFDRDtBQUVGLFM7O2tDQUdELE8sb0JBQVEsQyxFQUFHO0FBQ1QsaUJBQU8sSUFBUDtBQUNELFM7O2tDQUlELFksMkJBQWU7QUFDYixpQkFBTyxLQUFLLGNBQUwsQ0FBb0IsQ0FDekI7QUFDRSxvQkFBUSxFQURWO0FBRUUsbUJBQU8sU0FGVDtBQUdFLHNCQUFVO0FBSFosV0FEeUIsRUFLdEI7QUFDRCxvQkFBUSxZQURQO0FBRUQsbUJBQU87QUFGTixXQUxzQixFQVF0QjtBQUNELG9CQUFRLFdBRFA7QUFFRCxtQkFBTztBQUZOLFdBUnNCLEVBV3RCO0FBQ0Qsb0JBQVEsVUFEUDtBQUVELG1CQUFPO0FBRk4sV0FYc0IsRUFjdEI7QUFDRCxvQkFBUSxZQURQO0FBRUQsbUJBQU87QUFGTixXQWRzQixDQUFwQixDQUFQO0FBbUJELFM7O2tDQUlELGlCLGdDQUFvQjtBQUNsQixpQkFBTyxLQUFLLGNBQUwsQ0FBb0IsQ0FDekI7QUFDRSxvQkFBUSxFQURWO0FB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QUFMLENBQWtCLGNBQWxCLEVBQWtDO0FBQ2hDLHlCQUFXLEtBQUssS0FEZ0I7QUFFaEMsd0JBQVU7QUFGc0IsYUFBbEM7QUFJQSxpQkFBSyxhQUFMO0FBQ0Q7O0FBR0QsZUFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0QsUzs7O1FBbExrQyxXOzs7O2dDQThMeEIsYyxZQUZaLGdCQUFnQixZQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7Ozs7Ozs7Ozs7Ozs2SkFFQyxhLEdBQWdCLGdCLFNBQ2hCLFksR0FBZSxJOzs7aUNBSWYsZ0IsNkJBQWlCLEksRUFBTTtBQUNyQixjQUFJLFFBQVEsS0FBSyxZQUFMLENBQWtCLGFBQWxCLENBQVo7QUFDQSxjQUFJLEtBQUssWUFBVCxFQUF1QjtBQUNyQixpQkFBSyxlQUFMLENBQXFCLEtBQXJCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNEO0FBQ0YsUzs7aUNBR0QsTyxvQkFBUSxDLEVBQUc7QUFDVCxpQkFBTyxJQUFQO0FBQ0QsUzs7aUNBSUQsWSwyQkFBZTtBQUNiLGlCQUFPLEtBQUssY0FBTCxDQUFvQixDQUN6QjtBQUNFLG9CQUFRLEVBRFY7QUFFRSxtQkFBTyxTQUZUO0FBR0Usc0JBQVU7QUFIWixXQUR5QixFQUt0QjtBQUNELG9CQUFRLFdBRFA7QUFFRCxtQkFBTyxpQkFGTjtBQUdELHNCQUFVO0FBSFQsV0FMc0IsRUFTdEI7QUFDRCxvQkFBUSxZQURQO0FBRUQsbUJBQU8sK0JBRk47QUFHRCxzQkFBVTtBQUhULFdBVHNCLENBQXBCLENBQVA7QUFlRCxTOztpQ0FHRCxXLHdCQUFZLEssRUFBTztBQUFBOztBQUNqQixrQkFBUSxLQUFSO0FBQ0UsaUJBQUssV0FBTDtBQUNFLG1CQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLEdBQW1DLEtBQUssY0FBTCxDQUFvQixNQUFwQixDQUEyQixLQUFLLEtBQWhDLENBQW5DO0FBQ0EsbUJBQUssYUFBTDtBQUNBO0FBQ0YsaUJBQUssWUFBTDtBQUNFLGtCQUFJLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsS0FBcUMsSUFBekMsRUFBK0M7QUFDN0Msb0JBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGVBQTFCLEVBQVg7QUFDQSxxQkFBSyxPQUFMLENBQWEsVUFBQyxDQUFELEVBQU07QUFDakIseUJBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLENBQW5DLEVBQXNDLE9BQUssS0FBM0MsSUFBb0QsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUEzRTtBQUNELGlCQUZEO0FBR0EscUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsY0FBMUI7QUFDRDtBQUNELG1CQUFLLGFBQUw7QUFDQTtBQUNGO0FBQ0UsbUJBQUssYUFBTDtBQWhCSjtBQWtCRCxTOzs7UUE1RGlDLFciLCJmaWxlIjoidkdyaWQvdi1ncmlkLWF0dHJpYnV0ZXMtY29udGV4dG1lbnUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
