'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, VGrid, _createClass, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridCellRow;

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
      bindable = _aureliaFramework.bindable;
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

      _export('VGridCellRow', VGridCellRow = (_dec = customElement('v-grid-cell-row'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCellRow(element, vGrid) {
          _classCallCheck(this, VGridCellRow);

          _initDefineProp(this, 'columnNo', _descriptor, this);

          _initDefineProp(this, 'configAttribute', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
          this.hidden = false;
          this.displayRawValue = false;
        }

        VGridCellRow.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          if (this.bindingContext && this.cellContent) {
            this.rawValue = this.bindingContext[this.attribute()];
            this.setValue("");
            this.setValue(this.rawValue);
            if (this.vGrid.vGridCurrentRow === parseInt(this.element.parentNode.getAttribute("row"))) {
              if (parseInt(this.columnNo) === this.vGrid.vGridCellHelper.index) {
                if (!this.containsFocusClass(this.element)) {
                  this.setLastFocusElement(null);
                  this.setCss();
                }
              }
            } else {
                if (this.containsFocusClass(this.element)) {
                  console.log("no");
                }
              }
          }
        };

        VGridCellRow.prototype.created = function created() {};

        VGridCellRow.prototype.attached = function attached() {

          this.setStandardClassesAndStyles();

          var that = this;

          switch (this.colType()) {
            case "image":
              this.cellContent = document.createElement("img");
              break;
            case "checkbox":
              this.cellContent = document.createElement("input");
              this.cellContent.type = "checkbox";
              this.cellContent.onclick = function (e) {
                if (this.readOnly() === true && e.keyCode !== 9) {
                  return false;
                } else {
                  if (!this.editMode()) {
                    return false;
                  } else {
                    return true;
                  }
                }
              }.bind(this);
              break;
            default:
              this.cellContent = document.createElement("input");

          }

          this.cellContent.onkeydown = function (e) {
            if (e.keyCode == 13) {
              if (this.containsWriteClass(this.element)) {
                this.removeWriteClass(this.element);
              }
              this.cellContent.onblur();
              this.setEditMode(false);
              this.removeWriteClass(this.element);
              this.addFocusClass(this.element);
              return false;
            }
            if (this.readOnly() === true && e.keyCode !== 9) {
              return false;
            } else {
              if (!this.editMode()) {
                return false;
              } else {
                return true;
              }
            }
          }.bind(this);

          this.cellContent.ondblclick = function (e) {
            this.setEditMode(true);
            if (this.cellContent.select) {
              this.cellContent.select();
            }
          }.bind(this);

          this.cellContent.addEventListener("cellFocus", function (e) {
            if (this.editMode()) {
              if (this.editRaw()) {
                if (!this.displayRawValue) {
                  this.setValue(null, true);
                }
              }
            }
            this.setCss();
            this.cellContent.focus();
          }.bind(this));

          this.cellContent.onblur = function (e) {
            if (this.editMode()) {
              if (this.editRaw()) {
                this.vGrid.vGridCellHelper.updateActual({
                  attribute: this.attribute(),
                  value: this.cellContent.value
                });
                this.rawValue = this.cellContent.value;
                this.setValue(this.cellContent.value);
                this.setCss();
              } else {
                this.vGrid.vGridCellHelper.updateActual({
                  attribute: this.attribute(),
                  value: this.getValue()
                });
                this.rawValue = this.getValue();
              }
            } else {}
          }.bind(this);

          this.cellContent.onchange = function (e) {}.bind(this);

          this.cellContent.onClick = function (e) {}.bind(this);

          this.cellContent.style.opacity = "initial";
          this.cellContent.style.border = "initial";
          this.cellContent.style.transition = "initial";

          this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.attribute());
          this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.columnNo]);
          this.cellContent.setAttribute("readonly", "true");

          if (this.colType() === "checkbox") {
            this.cellContent.style.heigth = "initial";
            this.cellContent.style.width = "initial";
            this.cellContent.style.margin = "auto";
          }

          this.cellContent.setAttribute("tabindex", "0");

          if (this.bindingContext) {
            this.setValue(this.bindingContext[this.attribute()]);
          }
          this.element.appendChild(this.cellContent);
        };

        VGridCellRow.prototype.setValue = function setValue(value, setRawValue) {
          this.removeCssCell();
          switch (this.colType()) {
            case "image":
              this.hideIfUndefined(value);
              if (value !== undefined && value !== null) {
                this.cellContent.src = value;
              }
              break;
            case "checkbox":
              this.hideIfUndefined(value);
              this.cellContent.checked = value === "true" || value === true ? true : false;
              break;
            default:
              this.hideIfUndefined(value);
              if (setRawValue) {
                this.cellContent.value = this.rawValue;
                this.displayRawValue = true;
              } else {
                this.cellContent.value = this.valueFormater ? this.valueFormater.toView(value) : value;
                this.displayRawValue = false;
              }
          }
        };

        VGridCellRow.prototype.getValue = function getValue() {
          switch (this.colType()) {
            case "image":
              return this.cellContent.src;
              break;
            case "checkbox":
              return this.cellContent.checked;
              break;
            default:
              return this.valueFormater ? this.valueFormater.fromView(this.cellContent.value) : this.cellContent.value;
          }
        };

        VGridCellRow.prototype.hideIfUndefined = function hideIfUndefined(value) {
          if (value === undefined) {
            this.hidden = true;
            this.cellContent.style.display = "none";
            this.removeCssOldCell();
          } else {
            if (this.cellContent.style.display === "none") {
              this.hidden = false;
              this.cellContent.style.display = "block";
            }
            this.cellContent.src = value;
          }
        };

        VGridCellRow.prototype.editMode = function editMode() {
          return this.vGrid.vGridCellHelper.editMode;
        };

        VGridCellRow.prototype.setEditMode = function setEditMode(value) {
          this.vGrid.vGridCellHelper.editMode = value;
        };

        VGridCellRow.prototype.editRaw = function editRaw() {
          return this.vGrid.vGridConfig.colEditRawArray[this.columnNo];
        };

        VGridCellRow.prototype.attribute = function attribute() {
          return this.vGrid.vGridConfig.attributeArray[this.columnNo];
        };

        VGridCellRow.prototype.readOnly = function readOnly() {
          return this.vGrid.vGridConfig.readOnlyArray[this.columnNo];
        };

        VGridCellRow.prototype.colType = function colType() {
          return this.vGrid.vGridConfig.colTypeArray[this.columnNo];
        };

        VGridCellRow.prototype.getLastFocusElement = function getLastFocusElement() {
          return this.vGrid.vGridCellHelper.lastElement;
        };

        VGridCellRow.prototype.setLastFocusElement = function setLastFocusElement(element) {
          this.vGrid.vGridCellHelper.lastElement = element;
          if (this.editMode()) {
            this.lastEdit = true;
          } else {
            this.lastEdit = false;
          }
        };

        VGridCellRow.prototype.containsFocusClass = function containsFocusClass(element) {
          if (element) {
            return element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellRow.prototype.addFocusClass = function addFocusClass(element) {
          if (element) {
            this.cellContent.setAttribute("readonly", "true");
            element.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellRow.prototype.removeFocusClass = function removeFocusClass(element) {
          if (element) {
            element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellRow.prototype.containsWriteClass = function containsWriteClass(element) {
          if (element) {
            return element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellRow.prototype.addWriteClass = function addWriteClass(element) {
          if (element) {
            this.cellContent.removeAttribute("readonly");
            element.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellRow.prototype.removeWriteClass = function removeWriteClass(element) {
          if (element) {

            element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellRow.prototype.removeCssCell = function removeCssCell() {
          if (this.containsWriteClass(this.element)) {
            this.removeWriteClass(this.element);
          }
          if (this.containsFocusClass(this.element)) {
            this.removeFocusClass(this.element);
          }
        };

        VGridCellRow.prototype.removeCssOldCell = function removeCssOldCell() {
          if (this.containsWriteClass(this.getLastFocusElement())) {
            this.removeWriteClass(this.getLastFocusElement());
          }
          if (this.containsFocusClass(this.getLastFocusElement())) {
            this.removeFocusClass(this.getLastFocusElement());
          }
        };

        VGridCellRow.prototype.setCss = function setCss() {
          if (!this.containsFocusClass(this.element)) {
            this.addFocusClass(this.element);
            this.removeCssOldCell();
            this.setLastFocusElement(this.element);
          }

          if (this.editMode() && !this.readOnly()) {
            if (!this.containsWriteClass(this.element)) {
              this.removeFocusClass(this.element);
              this.addWriteClass(this.element);
            }
          }
        };

        VGridCellRow.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
          var css = this.vGrid.vGridConfig.css;
          var cellStyle = 'width:' + this.vGrid.vGridConfig.columnWidthArray[this.columnNo] + 'px';
          this.element.classList.add(css.rowCell);
          this.element.classList.add(css.rowColumn + this.columnNo);
          this.element.classList.add(css.gridColumn + this.columnNo);
          this.element.setAttribute("style", cellStyle);
        };

        _createClass(VGridCellRow, [{
          key: 'valueFormater',
          get: function get() {
            return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
          }
        }]);

        return VGridCellRow;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'configAttribute', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellRow', VGridCellRow);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVNDLGlCQUxXLFlBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixjQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLE1BQUwsR0FBYyxLQUFkLENBSDBCO0FBSTFCLGVBQUssZUFBTCxHQUF1QixLQUF2QixDQUowQjtTQUE1Qjs7QUFMVywrQkFhWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGNBQUksS0FBSyxjQUFMLElBQXVCLEtBQUssV0FBTCxFQUFrQjtBQUMzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FEMkM7QUFFM0MsaUJBQUssUUFBTCxDQUFjLEVBQWQsRUFGMkM7QUFHM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBSDJDO0FBSTNDLGdCQUFJLEtBQUssS0FBTCxDQUFXLGVBQVgsS0FBK0IsU0FBUyxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLENBQVQsQ0FBL0IsRUFBc0Y7QUFDeEYsa0JBQUksU0FBUyxLQUFLLFFBQUwsQ0FBVCxLQUE0QixLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEtBQTNCLEVBQWtDO0FBQ2hFLG9CQUFJLENBQUMsS0FBSyxr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QixjQUFJLHVCQUFxQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxLQUFLLFFBQUwsUUFBN0QsQ0FGd0I7QUFHNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLE9BQUosQ0FBM0IsQ0FINEI7QUFJNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLFNBQUosR0FBZ0IsS0FBSyxRQUFMLENBQTNDLENBSjRCO0FBSzVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxVQUFKLEdBQWlCLEtBQUssUUFBTCxDQUE1QyxDQUw0QjtBQU01QixlQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLE9BQTFCLEVBQW1DLFNBQW5DLEVBTjRCOzs7cUJBdFluQjs7OEJBbVFTO0FBQ2xCLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLEtBQUssUUFBTCxDQUEvQyxDQURrQjs7OztlQW5RVDtvRkFDVjs7OzBGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
