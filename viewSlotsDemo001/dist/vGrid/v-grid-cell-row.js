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
            console.log("focus2");
            this.setCss();
            this.cellContent.focus();
          }.bind(this));

          this.cellContent.onmousedown = function (e) {};

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
