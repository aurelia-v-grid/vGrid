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
            this.setValue(this.rawValue);
            if (this.colType() === "selection") {
              this.value = this.vGrid.vGridSelection.isSelected(this.getRow());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVztBQUFVOztBQUNwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQVVLLDZCQUhaLGNBQWMsZ0JBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsR0FIQTtBQVFDLGlCQUpXLGtCQUlYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztnQ0FKNUIsb0JBSTRCOzs7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEcUM7QUFFckMsZUFBSyxTQUFMLEdBQWlCLFNBQWpCLENBRnFDO0FBR3JDLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FIcUM7QUFJckMsZUFBSyxNQUFMLEdBQWMsS0FBZCxDQUpxQztBQUtyQyxlQUFLLEtBQUwsQ0FMcUM7QUFNckMsZUFBSyxXQUFMLENBTnFDO1NBQXZDOztBQUpXLHFDQWNYLHFCQUFLLGdCQUFnQjtBQUNuQixlQUFLLGNBQUwsR0FBc0IsY0FBdEIsQ0FEbUI7O0FBR25CLGNBQUksS0FBSyxRQUFMLElBQWlCLEtBQUssY0FBTCxFQUFxQjtBQUV4QyxpQkFBSyxRQUFMLENBQWMsS0FBSyxRQUFMLENBQWQsQ0FGd0M7QUFHeEMsZ0JBQUcsS0FBSyxPQUFMLE9BQW1CLFdBQW5CLEVBQStCO0FBQ2hDLG1CQUFLLEtBQUwsR0FBYSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFVBQTFCLENBQXFDLEtBQUssTUFBTCxFQUFyQyxDQUFiLENBRGdDO2FBQWxDOztBQUlBLGlCQUFLLFdBQUwsR0FBbUIsS0FBSyxRQUFMLEVBQW5CLENBUHdDOztBQVV4QyxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxlQUFYLEtBQStCLFNBQVMsS0FB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cUNBOFJYLDJCQUFTO0FBQ1AsY0FBSSxDQUFDLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxPQUFMLENBQXpCLEVBQXdDO0FBQzFDLGlCQUFLLGdCQUFMLEdBRDBDO0FBRTFDLGlCQUFLLGFBQUwsQ0FBbUIsS0FBSyxPQUFMLENBQW5CLENBRjBDO0FBRzFDLGlCQUFLLG1CQUFMLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQUgwQztXQUE1Qzs7QUFNQSxjQUFJLEtBQUssUUFBTCxNQUFtQixDQUFDLEtBQUssUUFBTCxFQUFELEVBQWtCO0FBQ3ZDLGdCQUFJLENBQUMsS0FBSyxrQkFBTCxDQUF3QixLQUFLLE9BQUwsQ0FBekIsRUFBd0M7QUFDMUMsbUJBQUssZ0JBQUwsQ0FBc0IsS0FBSyxPQUFMLENBQXRCLENBRDBDO0FBRTFDLG1CQUFLLGFBQUwsQ0FBbUIsS0FBSyxPQUFMLENBQW5CLENBRjBDO2FBQTVDO1dBREY7OztBQXJTUyxxQ0E2U1gscUVBQThCO0FBQzVCLGNBQUksTUFBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBRGtCO0FBRTVCLGNBQUksdUJBQXFCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLEtBQUssUUFBTCxRQUE3RCxDQUZ3QjtBQUc1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksT0FBSixDQUEzQixDQUg0QjtBQUk1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksU0FBSixHQUFnQixLQUFLLFFBQUwsQ0FBM0MsQ0FKNEI7QUFLNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLFVBQUosR0FBaUIsS0FBSyxRQUFMLENBQTVDLENBTDRCO0FBTTVCLGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsT0FBMUIsRUFBbUMsU0FBbkMsRUFONEI7OztxQkE3U25COzs4QkF1SlM7QUFDbEIsbUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxRQUFMLENBQS9DLENBRGtCOzs7OzhCQUlMO0FBQ2IsbUJBQU8sS0FBSyxjQUFMLENBQW9CLEtBQUssU0FBTCxFQUFwQixDQUFQLENBRGE7Ozs7ZUEzSko7b0ZBQ1YiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXJvdy1jb2wuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
