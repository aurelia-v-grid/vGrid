'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _createClass, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCellContainer;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      Container = _aureliaFramework.Container;
      bindable = _aureliaFramework.bindable;
      ViewSlot = _aureliaFramework.ViewSlot;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('VGridCellContainer', VGridCellContainer = (_dec = customElement('v-grid-row-col'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid, Container), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCellContainer(element, vGrid, container) {
          _classCallCheck(this, VGridCellContainer);

          _initDefineProp(this, 'columnNo', _descriptor, this);

          this.element = element;
          this.container = container;
          this.vGrid = vGrid;
          this.hidden = false;
          this.value;
          this.customStyle;
        }

        VGridCellContainer.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;

          if (this.viewSlot && this.bindingContext) {

            if (this.colType() === "selection") {
              var x = {};
              this.setValue(x);
            } else {
              this.setValue("");
              this.setValue(this.rawValue);
            }

            this.customStyle = this.colStyle();

            if (this.vGrid.vGridCurrentRow === parseInt(this.element.parentNode.getAttribute("row"))) {
              if (parseInt(this.columnNo) === this.vGrid.vGridCellHelper.index) {
                this.setCss();
              }
            }
          }
        };

        VGridCellContainer.prototype.created = function created() {};

        VGridCellContainer.prototype.attached = function attached() {
          this.setStandardClassesAndStyles();

          switch (this.colType()) {
            case "image":
              var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-image value.bind="value"><img css.bind="customStyle"></v-grid-image></template>', this.vGrid.resources);
              break;
            case "checkbox":
              var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-checkbox value.bind="value"><input css.bind="customStyle"></v-grid-checkbox></template>', this.vGrid.resources);
              break;
            case "selection":
              var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-selection value.bind="value"><input css.bind="customStyle"></v-grid-selection></template>', this.vGrid.resources);
              break;
            default:
              var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-input  value.bind="value"><input css.bind="customStyle"></v-grid-input></template>', this.vGrid.resources);
          }

          var view = viewFactory.create(this.container);
          this.viewSlot = new ViewSlot(this.element, true);
          this.viewSlot.add(view);
          this.viewSlot.bind(this);
          this.viewSlot.attached();

          this.element.addEventListener("cellFocus", function (e) {
            this.setCss();
          }.bind(this));

          this.element.addEventListener("eventOnRowDblClick", function (e) {
            if (this.vGrid.vGridConfig.eventOnRowDblClick) {
              this.vGrid.vGridConfig.eventOnRowDblClick({
                evt: e,
                data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
                attribute: this.attribute(),
                row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
              });
            }
          }.bind(this));

          this.element.addEventListener("eventOnRowClick", function (e) {
            if (this.vGrid.vGridConfig.eventOnRowClick) {
              this.vGrid.vGridConfig.eventOnRowClick({
                evt: e,
                data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
                attribute: this.attribute(),
                row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
              });
            }
          }.bind(this));
        };

        VGridCellContainer.prototype.updateValue = function updateValue(value) {
          this.vGrid.vGridCellHelper.updateActual({
            attribute: this.attribute(),
            value: this.valueFormater ? this.valueFormater.fromView(value) : value
          });
        };

        VGridCellContainer.prototype.setValue = function setValue(value, setRawValue) {
          this.removeCssCell();
          if (setRawValue || this.editMode() && this.editRaw()) {
            this.value = this.rawValue;
          } else {
            this.value = this.valueFormater ? this.valueFormater.toView(value) : value;
          }
        };

        VGridCellContainer.prototype.getValue = function getValue(value) {
          return this.valueFormater ? this.valueFormater.fromView(value) : value;
        };

        VGridCellContainer.prototype.getRow = function getRow() {
          return parseInt(this.element.parentNode.getAttribute("row"));
        };

        VGridCellContainer.prototype.editMode = function editMode() {
          return this.vGrid.vGridConfig.editMode;
        };

        VGridCellContainer.prototype.setEditMode = function setEditMode(value) {
          this.vGrid.vGridConfig.editMode = value;
        };

        VGridCellContainer.prototype.editRaw = function editRaw() {
          return this.vGrid.vGridConfig.colEditRawArray[this.columnNo];
        };

        VGridCellContainer.prototype.attribute = function attribute() {
          return this.vGrid.vGridConfig.attributeArray[this.columnNo];
        };

        VGridCellContainer.prototype.readOnly = function readOnly() {
          return this.vGrid.vGridConfig.readOnlyArray[this.columnNo];
        };

        VGridCellContainer.prototype.colType = function colType() {
          return this.vGrid.vGridConfig.colTypeArray[this.columnNo];
        };

        VGridCellContainer.prototype.colStyle = function colStyle() {
          if (this.vGrid) {
            if (this.vGrid.vGridConfig.colStyleArray[this.columnNo]) {
              return this.interpolate(this.vGrid.vGridConfig.colStyleArray[this.columnNo])(this.bindingContext);
            }
          }
        };

        VGridCellContainer.prototype.interpolate = function interpolate(str) {
          if (str) {
            return function interpolate(o) {
              return str.replace(/{{([^{}]*)}}/g, function (a, b) {
                var r = o[b];
                return r;
              });
            };
          } else {
            return function () {
              return "";
            };
          }
        };

        VGridCellContainer.prototype.getLastFocusElement = function getLastFocusElement() {
          return this.vGrid.vGridCellHelper.lastElement;
        };

        VGridCellContainer.prototype.setLastFocusElement = function setLastFocusElement(element) {
          this.vGrid.vGridCellHelper.lastElement = element;
        };

        VGridCellContainer.prototype.containsFocusClass = function containsFocusClass(element) {
          if (element) {
            return element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.addFocusClass = function addFocusClass(element) {
          if (element) {
            element.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.removeFocusClass = function removeFocusClass(element) {
          if (element) {
            element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.containsWriteClass = function containsWriteClass(element) {
          if (element) {
            return element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.addWriteClass = function addWriteClass(element) {
          if (element) {
            element.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.removeWriteClass = function removeWriteClass(element) {
          if (element) {

            element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellContainer.prototype.removeCssCell = function removeCssCell() {
          if (this.containsWriteClass(this.element)) {
            this.removeWriteClass(this.element);
          }
          if (this.containsFocusClass(this.element)) {
            this.removeFocusClass(this.element);
          }
        };

        VGridCellContainer.prototype.removeCssOldCell = function removeCssOldCell() {
          if (this.containsWriteClass(this.getLastFocusElement())) {
            this.removeWriteClass(this.getLastFocusElement());
          }
          if (this.containsFocusClass(this.getLastFocusElement())) {
            this.removeFocusClass(this.getLastFocusElement());
          }
        };

        VGridCellContainer.prototype.setCss = function setCss() {
          if (!this.containsFocusClass(this.element)) {
            this.removeCssOldCell();
            this.addFocusClass(this.element);
            this.setLastFocusElement(this.element);
          }

          if (this.editMode() && !this.readOnly()) {
            if (!this.containsWriteClass(this.element)) {
              this.removeFocusClass(this.element);
              this.addWriteClass(this.element);
            }
          }
        };

        VGridCellContainer.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
          var css = this.vGrid.vGridConfig.css;
          var cellStyle = 'width:' + this.vGrid.vGridConfig.columnWidthArray[this.columnNo] + 'px';
          this.element.classList.add(css.rowCell);
          this.element.classList.add(css.rowColumn + this.columnNo);
          this.element.classList.add(css.gridColumn + this.columnNo);
          this.element.setAttribute("style", cellStyle);
        };

        _createClass(VGridCellContainer, [{
          key: 'valueFormater',
          get: function get() {
            return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
          }
        }, {
          key: 'rawValue',
          get: function get() {
            return this.bindingContext[this.attribute()];
          }
        }]);

        return VGridCellContainer;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellContainer', VGridCellContainer);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVztBQUFVOztBQUNwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQVVLLDZCQUhaLGNBQWMsZ0JBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsR0FIQTtBQVFDLGlCQUpXLGtCQUlYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztnQ0FKNUIsb0JBSTRCOzs7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEcUM7QUFFckMsZUFBSyxTQUFMLEdBQWlCLFNBQWpCLENBRnFDO0FBR3JDLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FIcUM7QUFJckMsZUFBSyxNQUFMLEdBQWMsS0FBZCxDQUpxQztBQUtyQyxlQUFLLEtBQUwsQ0FMcUM7QUFNckMsZUFBSyxXQUFMLENBTnFDO1NBQXZDOztBQUpXLHFDQWNYLHFCQUFLLGdCQUFnQjtBQUNuQixlQUFLLGNBQUwsR0FBc0IsY0FBdEIsQ0FEbUI7O0FBR25CLGNBQUksS0FBSyxRQUFMLElBQWlCLEtBQUssY0FBTCxFQUFxQjs7QUFHeEMsZ0JBQUcsS0FBSyxPQUFMLE9BQW1CLFdBQW5CLEVBQStCO0FBQ2hDLGtCQUFJLElBQUksRUFBSixDQUQ0QjtBQUVoQyxtQkFBSyxRQUFMLENBQWMsQ0FBZCxFQUZnQzthQUFsQyxNQUdPO0FBQ0wsbUJBQUssUUFBTCxDQUFjLEVBQWQsRUFESztBQUVMLG1CQUFLLFFBQUwsQ0FBYyxLQUFLLFFBQUwsQ0FBZCxDQUZLO2FBSFA7O0FBUUEsaUJBQUssV0FBTCxHQUFtQixLQUFLLFFBQUwsRUFBbkIsQ0FYd0M7O0FBY3hDLGdCQUFJLEtBQUssS0FBTCxDQUFXLGVBQVgs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V0FBekQ7OztBQTVSUyxxQ0FrU1gsMkJBQVM7QUFDUCxjQUFJLENBQUMsS0FBSyxrQkFBTCxDQUF3QixLQUFLLE9BQUwsQ0FBekIsRUFBd0M7QUFDMUMsaUJBQUssZ0JBQUwsR0FEMEM7QUFFMUMsaUJBQUssYUFBTCxDQUFtQixLQUFLLE9BQUwsQ0FBbkIsQ0FGMEM7QUFHMUMsaUJBQUssbUJBQUwsQ0FBeUIsS0FBSyxPQUFMLENBQXpCLENBSDBDO1dBQTVDOztBQU1BLGNBQUksS0FBSyxRQUFMLE1BQW1CLENBQUMsS0FBSyxRQUFMLEVBQUQsRUFBa0I7QUFDdkMsZ0JBQUksQ0FBQyxLQUFLLGtCQUFMLENBQXdCLEtBQUssT0FBTCxDQUF6QixFQUF3QztBQUMxQyxtQkFBSyxnQkFBTCxDQUFzQixLQUFLLE9BQUwsQ0FBdEIsQ0FEMEM7QUFFMUMsbUJBQUssYUFBTCxDQUFtQixLQUFLLE9BQUwsQ0FBbkIsQ0FGMEM7YUFBNUM7V0FERjs7O0FBelNTLHFDQWlUWCxxRUFBOEI7QUFDNUIsY0FBSSxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FEa0I7QUFFNUIsY0FBSSx1QkFBcUIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxRQUFMLFFBQTdELENBRndCO0FBRzVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxPQUFKLENBQTNCLENBSDRCO0FBSTVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxTQUFKLEdBQWdCLEtBQUssUUFBTCxDQUEzQyxDQUo0QjtBQUs1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksVUFBSixHQUFpQixLQUFLLFFBQUwsQ0FBNUMsQ0FMNEI7QUFNNUIsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixPQUExQixFQUFtQyxTQUFuQyxFQU40Qjs7O3FCQWpUbkI7OzhCQTJKUztBQUNsQixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxLQUFLLFFBQUwsQ0FBL0MsQ0FEa0I7Ozs7OEJBSUw7QUFDYixtQkFBTyxLQUFLLGNBQUwsQ0FBb0IsS0FBSyxTQUFMLEVBQXBCLENBQVAsQ0FEYTs7OztlQS9KSjtvRkFDViIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcm93LWNvbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
