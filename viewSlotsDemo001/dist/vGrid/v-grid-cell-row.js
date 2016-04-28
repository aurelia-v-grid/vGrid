'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, VGrid, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCellRow;

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
      _export('VGridCellRow', VGridCellRow = (_dec = customElement('v-grid-cell-row'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCellRow(element, vGrid) {
          _classCallCheck(this, VGridCellRow);

          _initDefineProp(this, 'colNo', _descriptor, this);

          this.element = element;
          this.vGrid = vGrid;
          this.hidden = false;
        }

        VGridCellRow.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          if (this.bindingContext && this.cellContent) {
            this.rawValue = this.bindingContext[this.attribute()];
            this.setValue(this.rawValue);

            if (this.vGrid.filterRow === parseInt(this.element.parentNode.getAttribute("row"))) {
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
                  this.setEditMode(false);
                  if (this.containsWriteClass(this.element)) {
                    this.removeWriteClass(this.element);
                  }
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
          }

          this.cellContent.ondblclick = function (e) {

            this.setEditMode(true);
            this.cellContent.select();
          }.bind(this);

          this.cellContent.addEventListener("cellFocus", function (e) {
            this.setCss();
            this.cellContent.focus();
          }.bind(this));

          this.cellContent.onblur = function (e) {
            this.vGrid.vGridCellHelper.updateActual({
              attribute: this.attribute(),
              value: this.getValue()
            });
          }.bind(this);

          this.cellContent.onchange = function (e) {}.bind(this);

          this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.attribute());
          this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);
          this.cellContent.style.opacity = 1;
          this.cellContent.style.border = 0;
          this.cellContent.style.transition = "0ms";
          this.cellContent.setAttribute("tabindex", "0");

          if (this.bindingContext) {
            this.setValue(this.bindingContext[this.attribute()]);
          }
          this.element.appendChild(this.cellContent);
        };

        VGridCellRow.prototype.setValue = function setValue(value) {
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
              this.cellContent.value = value;
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
              return this.cellContent.value;
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

          if (this.editMode()) {
            if (!this.containsWriteClass(this.element)) {
              this.addWriteClass(this.element);
            }
          }
        };

        return VGridCellRow;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'colNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellRow', VGridCellRow);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7OzhCQVNLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVFDLGlCQUpXLFlBSVgsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUpqQixjQUlpQjs7OztBQUMxQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRDBCO0FBRTFCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGMEI7QUFHMUIsZUFBSyxNQUFMLEdBQWMsS0FBZCxDQUgwQjtTQUE1Qjs7QUFKVywrQkFXWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGNBQUksS0FBSyxjQUFMLElBQXVCLEtBQUssV0FBTCxFQUFrQjtBQUMzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FEMkM7QUFFM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBRjJDOztBQUkzQyxnQkFBRyxLQUFLLEtBQUwsQ0FBVyxTQUFYLEtBQXlCLFNBQVMsS0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixZQUF4QixDQUFxQyxLQUFyQyxDQUFULENBQXpCLEVBQStFO0FBQ2hGLGtCQUFHLFNBQVMsS0FBSyxLQUFMLENBQVQsS0FBeUIsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixLQUEzQixFQUFpQztBQUMzRCxvQkFBSSxDQUFDLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxPQUFMLENBQXpCLEVBQXdDO0FBQzFDLHVCQUFLLG1CQUFMLENBQXlCLElBQXpCLEVBRDBDO0FBRTFDLHVCQUFLLE1BQUws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
