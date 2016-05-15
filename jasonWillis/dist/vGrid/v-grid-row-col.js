'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _createClass, _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, VGridCellContainer;

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

      _export('VGridCellContainer', VGridCellContainer = (_dec = noView(), _dec2 = customElement('v-grid-row-col'), _dec3 = processContent(false), _dec4 = inject(Element, VGrid, Container), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVztBQUFVOztBQUNwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQU9LLDZCQUpaLGtCQUNBLGNBQWMsZ0JBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkI7QUFRQyxpQkFQVyxrQkFPWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsU0FBNUIsRUFBdUM7Z0NBUDVCLG9CQU80Qjs7OztBQUNyQyxlQUFLLE9BQUwsR0FBZSxPQUFmLENBRHFDO0FBRXJDLGVBQUssU0FBTCxHQUFpQixTQUFqQixDQUZxQztBQUdyQyxlQUFLLEtBQUwsR0FBYSxLQUFiLENBSHFDO0FBSXJDLGVBQUssTUFBTCxHQUFjLEtBQWQsQ0FKcUM7QUFLckMsZUFBSyxLQUFMLENBTHFDO0FBTXJDLGVBQUssV0FBTCxDQU5xQztTQUF2Qzs7QUFQVyxxQ0FvQlgscUJBQUssZ0JBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QixDQURtQjs7QUFHbkIsY0FBSSxLQUFLLFFBQUwsSUFBaUIsS0FBSyxjQUFMLEVBQXFCOztBQUd4QyxnQkFBSSxLQUFLLE9BQUwsT0FBbUIsV0FBbkIsRUFBZ0M7QUFDbEMsa0JBQUksSUFBSSxFQUFKLENBRDhCO0FBRWxDLG1CQUFLLFFBQUwsQ0FBYyxDQUFkLEVBRmtDO2FBQXBDLE1BR087QUFDTCxxQkFBSyxRQUFMLENBQWMsRUFBZCxFQURLO0FBRUwscUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBRks7ZUFIUDs7QUFRQSxpQkFBSyxXQUFMLEdBQW1CLEtBQUssUUFBTCxFQUFuQixDQVh3Qzs7QUFjeEMsZ0JBQUksS0FBSyxLQUFMLENBQVcsZUFB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RDtXQUF6RDs7O0FBNVRTLHFDQWtVWCwyQkFBUztBQUNQLGNBQUksQ0FBQyxLQUFLLGtCQUFMLENBQXdCLEtBQUssT0FBTCxDQUF6QixFQUF3QztBQUMxQyxpQkFBSyxnQkFBTCxHQUQwQztBQUUxQyxpQkFBSyxhQUFMLENBQW1CLEtBQUssT0FBTCxDQUFuQixDQUYwQztBQUcxQyxpQkFBSyxtQkFBTCxDQUF5QixLQUFLLE9BQUwsQ0FBekIsQ0FIMEM7V0FBNUM7O0FBTUEsY0FBSSxLQUFLLFFBQUwsTUFBbUIsQ0FBQyxLQUFLLFFBQUwsRUFBRCxFQUFrQjtBQUN2QyxnQkFBSSxDQUFDLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxPQUFMLENBQXpCLEVBQXdDO0FBQzFDLG1CQUFLLGdCQUFMLENBQXNCLEtBQUssT0FBTCxDQUF0QixDQUQwQztBQUUxQyxtQkFBSyxhQUFMLENBQW1CLEtBQUssT0FBTCxDQUFuQixDQUYwQzthQUE1QztXQURGOzs7QUF6VVMscUNBa1ZYLHFFQUE4QjtBQUM1QixjQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQURrQjtBQUU1QixjQUFJLHVCQUFxQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxLQUFLLFFBQUwsUUFBN0QsQ0FGd0I7QUFHNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLE9BQUosQ0FBM0IsQ0FINEI7QUFJNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLFNBQUosR0FBZ0IsS0FBSyxRQUFMLENBQTNDLENBSjRCO0FBSzVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxVQUFKLEdBQWlCLEtBQUssUUFBTCxDQUE1QyxDQUw0QjtBQU01QixlQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLE9BQTFCLEVBQW1DLFNBQW5DLEVBTjRCOzs7cUJBbFZuQjs7OEJBeUxTO0FBQ2xCLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLEtBQUssUUFBTCxDQUEvQyxDQURrQjs7Ozs4QkFLTDtBQUNiLG1CQUFPLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBUCxDQURhOzs7O2VBOUxKO29GQUNWIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yb3ctY29sLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
