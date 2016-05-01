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

          _initDefineProp(this, 'colNo', _descriptor, this);

          _initDefineProp(this, 'configAttribute', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
          this.hidden = false;
          this.editLock = false;
        }

        VGridCellRow.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          if (this.bindingContext && this.cellContent) {
            this.rawValue = this.bindingContext[this.attribute()];
            this.setValue(this.rawValue);


            if (this.vGrid.vGridCurrentRow === parseInt(this.element.parentNode.getAttribute("row"))) {
              if (parseInt(this.colNo) === this.vGrid.vGridCellHelper.index) {
                if (!this.containsFocusClass(this.element)) {
                  this.setLastFocusElement(null);
                  this.setCss();
                }
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

                if (e.keyCode == 13) {
                  this.cellContent.onblur();
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
              break;
            default:
              this.cellContent = document.createElement("input");
              this.cellContent.onkeydown = function (e) {

                if (e.keyCode == 13) {
                  if (this.containsWriteClass(this.element)) {
                    this.removeWriteClass(this.element);
                  }
                  this.cellContent.onblur();
                  this.setEditMode(false);
                  this.setCss();

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

          }

          this.cellContent.ondblclick = function (e) {
            this.setEditMode(true);
            this.cellContent.select();
          }.bind(this);

          this.cellContent.addEventListener("cellFocus", function (e) {

            if (this.editMode()) {
              if (this.editRaw()) {
                this.setValue(null, true);
              }
            } else {}
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
          this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);

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

          if (this.datePicker()) {
            this.datePicker()(this.cellContent, this);
          }
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
              } else {
                  this.cellContent.value = this.valueFormater ? this.valueFormater.toView(value) : value;
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
          return this.vGrid.vGridConfig.colEditRawArray[this.colNo];
        };

        VGridCellRow.prototype.datePicker = function datePicker() {
          return this.vGrid.vGridConfig.colDatePickerArray[this.colNo];
        };

        VGridCellRow.prototype.attribute = function attribute() {
          return this.vGrid.vGridConfig.attributeArray[this.colNo];
        };

        VGridCellRow.prototype.readOnly = function readOnly() {
          return this.vGrid.vGridConfig.readOnlyArray[this.colNo];
        };

        VGridCellRow.prototype.colType = function colType() {
          return this.vGrid.vGridConfig.colTypeArray[this.colNo];
        };

        VGridCellRow.prototype.getLastFocusElement = function getLastFocusElement() {
          return this.vGrid.vGridCellHelper.lastElement;
        };

        VGridCellRow.prototype.setLastFocusElement = function setLastFocusElement(element) {
          this.vGrid.vGridCellHelper.lastElement = element;
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
            element.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCellRow.prototype.removeFocusClass = function removeFocusClass(element) {
          if (element) {
            return element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
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
            element.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCellRow.prototype.removeWriteClass = function removeWriteClass(element) {
          if (element) {
            return element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
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
              this.addWriteClass(this.element);
            }
          } else {
            if (this.containsWriteClass(this.element)) {
              this.removeCssOldCell();
              this.addFocusClass(this.element);
            }
            if (!this.containsFocusClass(this.element)) {
              this.addFocusClass(this.element);
            }
          }
        };

        VGridCellRow.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
          var css = this.vGrid.vGridConfig.css;
          var cellStyle = 'width:' + this.vGrid.vGridConfig.columnWidthArray[this.colNo] + 'px';
          this.element.classList.add(css.rowCell);
          this.element.classList.add(css.rowColumn + this.colNo);
          this.element.classList.add(css.gridColumn + this.colNo);
          this.element.setAttribute("style", cellStyle);
        };

        _createClass(VGridCellRow, [{
          key: 'valueFormater',
          get: function get() {
            return this.vGrid.vGridConfig.colFormaterArray[this.colNo];
          }
        }]);

        return VGridCellRow;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'colNo', [bindable], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVNDLGlCQUxXLFlBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixjQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLE1BQUwsR0FBYyxLQUFkLENBSDBCO0FBSTFCLGVBQUssUUFBTCxHQUFnQixLQUFoQixDQUowQjtTQUE1Qjs7QUFMVywrQkFhWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGNBQUksS0FBSyxjQUFMLElBQXVCLEtBQUssV0FBTCxFQUFrQjtBQUMzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FEMkM7QUFFM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBRjJDOzs7QUFLM0MsZ0JBQUksS0FBSyxLQUFMLENBQVcsZUFBWCxLQUErQixTQUFTLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsWUFBeEIsQ0FBcUMsS0FBckMsQ0FBVCxDQUEvQixFQUFzRjtBQUN4RixrQkFBSSxTQUFTLEtBQUssS0FBTCxDQUFULEtBQXlCLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsS0FBM0IsRUFBa0M7QUFDN0Qsb0JBQUksQ0FBQyxLQUFLLGtCQUFMLENBQXdCLEtBQUssT0FBTCxDQUF6QixFQUF3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QUFKLEVBQXlEO0FBQ3ZELGlCQUFLLGdCQUFMLENBQXNCLEtBQUssbUJBQUwsRUFBdEIsRUFEdUQ7V0FBekQ7OztBQXZYUywrQkE2WFgsMkJBQVM7QUFDUCxjQUFJLENBQUMsS0FBSyxrQkFBTCxDQUF3QixLQUFLLE9BQUwsQ0FBekIsRUFBd0M7QUFFMUMsaUJBQUssYUFBTCxDQUFtQixLQUFLLE9BQUwsQ0FBbkIsQ0FGMEM7QUFHMUMsaUJBQUssZ0JBQUwsR0FIMEM7QUFJMUMsaUJBQUssbUJBQUwsQ0FBeUIsS0FBSyxPQUFMLENBQXpCLENBSjBDO1dBQTVDOztBQU9BLGNBQUksS0FBSyxRQUFMLE1BQW1CLENBQUMsS0FBSyxRQUFMLEVBQUQsRUFBa0I7QUFDdkMsZ0JBQUksQ0FBQyxLQUFLLGtCQUFMLENBQXdCLEtBQUssT0FBTCxDQUF6QixFQUF3QztBQUMxQyxtQkFBSyxhQUFMLENBQW1CLEtBQUssT0FBTCxDQUFuQixDQUQwQzthQUE1QztXQURGLE1BSU87QUFFTCxnQkFBRyxLQUFLLGtCQUFMLENBQXdCLEtBQUssT0FBTCxDQUEzQixFQUF5QztBQUN2QyxtQkFBSyxnQkFBTCxHQUR1QztBQUV2QyxtQkFBSyxhQUFMLENBQW1CLEtBQUssT0FBTCxDQUFuQixDQUZ1QzthQUF6QztBQUlBLGdCQUFJLENBQUMsS0FBSyxrQkFBTCxDQUF3QixLQUFLLE9BQUwsQ0FBekIsRUFBd0M7QUFFMUMsbUJBQUssYUFBTCxDQUFtQixLQUFLLE9BQUwsQ0FBbkIsQ0FGMEM7YUFBNUM7V0FWRjs7O0FBcllTLCtCQXNaWCxxRUFBOEI7QUFDNUIsY0FBSSxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FEa0I7QUFFNUIsY0FBSSx1QkFBcUIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxLQUFMLFFBQTdELENBRndCO0FBRzVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxPQUFKLENBQTNCLENBSDRCO0FBSTVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxTQUFKLEdBQWdCLEtBQUssS0FBTCxDQUEzQyxDQUo0QjtBQUs1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksVUFBSixHQUFpQixLQUFLLEtBQUwsQ0FBNUMsQ0FMNEI7QUFNNUIsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixPQUExQixFQUFtQyxTQUFuQyxFQU40Qjs7O3FCQXRabkI7OzhCQW1SUztBQUNsQixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxLQUFLLEtBQUwsQ0FBL0MsQ0FEa0I7Ozs7ZUFuUlQ7aUZBQ1Y7OzswRkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC1yb3cuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
