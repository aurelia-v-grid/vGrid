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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVNDLGlCQUxXLFlBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixjQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLE1BQUwsR0FBYyxLQUFkLENBSDBCO0FBSTFCLGVBQUssUUFBTCxHQUFnQixLQUFoQixDQUowQjtTQUE1Qjs7QUFMVywrQkFhWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGNBQUksS0FBSyxjQUFMLElBQXVCLEtBQUssV0FBTCxFQUFrQjtBQUMzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FEMkM7QUFFM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBRjJDOzs7QUFLM0MsZ0JBQUksS0FBSyxLQUFMLENBQVcsZUFBWCxLQUErQixTQUFTLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsWUFBeEIsQ0FBcUMsS0FBckMsQ0FBVCxDQUEvQixFQUFzRjtBQUN4RixrQkFBSSxTQUFTLEtBQUssS0FBTCxDQUFULEtBQXlCLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsS0FBM0IsRUFBa0M7QUFDN0Qsb0JBQUksQ0FBQyxLQUFLLGtCQUFMLENBQXdCLEtBQUssT0FBTCxDQUF6QixFQUF3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
