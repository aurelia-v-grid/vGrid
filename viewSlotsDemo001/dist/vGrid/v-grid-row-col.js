'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsb0IscUJBQUEsYztBQUFnQixlLHFCQUFBLFM7QUFBVyxjLHFCQUFBLFE7QUFBVSxjLHFCQUFBLFE7O0FBR3BFLFcsVUFBQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBT0ssa0IsV0FKWixRLFVBQ0EsY0FBYyxnQkFBZCxDLFVBQ0EsZUFBZSxLQUFmLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsQztBQVFDLG9DQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsU0FBNUIsRUFBdUM7QUFBQTs7QUFBQTs7QUFDckMsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0EsZUFBSyxLQUFMO0FBQ0EsZUFBSyxXQUFMO0FBQ0Q7O3FDQU1ELEksaUJBQUssYyxFQUFnQjtBQUNuQixlQUFLLGNBQUwsR0FBc0IsY0FBdEI7O0FBRUEsY0FBSSxLQUFLLFFBQUwsSUFBaUIsS0FBSyxjQUExQixFQUEwQzs7QUFHeEMsZ0JBQUksS0FBSyxPQUFMLE9BQW1CLFdBQXZCLEVBQW9DO0FBQ2xDLGtCQUFJLElBQUksRUFBUjtBQUNBLG1CQUFLLFFBQUwsQ0FBYyxDQUFkO0FBQ0QsYUFIRCxNQUdPO0FBQ0wscUJBQUssUUFBTCxDQUFjLEVBQWQ7QUFDQSxxQkFBSyxRQUFMLENBQWMsS0FBSyxRQUFuQjtBQUNEOztBQUVELGlCQUFLLFdBQUwsR0FBbUIsS0FBSyxRQUFMLEVBQW5COztBQUdBLGdCQUFJLEtBQUssS0FBTCxDQUFXLGVBQVgsS0FB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
