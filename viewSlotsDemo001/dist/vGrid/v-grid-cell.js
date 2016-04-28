'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, VGrid, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCell;

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
      _export('VGridCell', VGridCell = (_dec = customElement('v-grid-cell'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCell(element, vGrid) {
          _classCallCheck(this, VGridCell);

          _initDefineProp(this, 'colNo', _descriptor, this);

          this.element = element;
          this.vGrid = vGrid;
          this.hidden = false;
        }

        VGridCell.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          if (this.bindingContext && this.cellContent) {
            this.rawValue = this.bindingContext[this.attribute()];
            this.setValue(this.rawValue);

            if (this.vGrid.filterRow === parseInt(this.element.parentNode.getAttribute("row"))) {
              if (parseInt(this.colNo) === this.vGrid.vGridCellEdit.index) {
                if (!this.containsFocusClass(this.element)) {
                  this.setLastFocusElement(null);
                  this.setCss();
                }
              }
            }
          }
        };

        VGridCell.prototype.created = function created() {};

        VGridCell.prototype.attached = function attached() {

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
            this.vGrid.vGridCellEdit.updateActual({
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

        VGridCell.prototype.setValue = function setValue(value) {
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

        VGridCell.prototype.getValue = function getValue() {

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

        VGridCell.prototype.hideIfUndefined = function hideIfUndefined(value) {
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

        VGridCell.prototype.editMode = function editMode() {
          return this.vGrid.vGridCellEdit.editMode;
        };

        VGridCell.prototype.setEditMode = function setEditMode(value) {
          this.vGrid.vGridCellEdit.editMode = value;
        };

        VGridCell.prototype.attribute = function attribute() {
          return this.vGrid.vGridConfig.attributeArray[this.colNo];
        };

        VGridCell.prototype.readOnly = function readOnly() {
          return this.vGrid.vGridConfig.readOnlyArray[this.colNo];
        };

        VGridCell.prototype.colType = function colType() {
          return this.vGrid.vGridConfig.colTypeArray[this.colNo];
        };

        VGridCell.prototype.getLastFocusElement = function getLastFocusElement() {
          return this.vGrid.vGridCellEdit.lastElement;
        };

        VGridCell.prototype.setLastFocusElement = function setLastFocusElement(element) {
          this.vGrid.vGridCellEdit.lastElement = element;
        };

        VGridCell.prototype.containsFocusClass = function containsFocusClass(element) {
          if (element) {
            return element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCell.prototype.addFocusClass = function addFocusClass(element) {
          if (element) {
            element.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCell.prototype.removeFocusClass = function removeFocusClass(element) {
          if (element) {
            return element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
          } else {
            return false;
          }
        };

        VGridCell.prototype.containsWriteClass = function containsWriteClass(element) {
          if (element) {
            return element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCell.prototype.addWriteClass = function addWriteClass(element) {
          if (element) {
            element.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCell.prototype.removeWriteClass = function removeWriteClass(element) {
          if (element) {
            return element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          } else {
            return false;
          }
        };

        VGridCell.prototype.removeCssCell = function removeCssCell() {
          if (this.containsWriteClass(this.element)) {
            this.removeWriteClass(this.element);
          }
          if (this.containsFocusClass(this.element)) {
            this.removeFocusClass(this.element);
          }
        };

        VGridCell.prototype.removeCssOldCell = function removeCssOldCell() {
          if (this.containsWriteClass(this.getLastFocusElement())) {
            this.removeWriteClass(this.getLastFocusElement());
          }
          if (this.containsFocusClass(this.getLastFocusElement())) {
            this.removeFocusClass(this.getLastFocusElement());
          }
        };

        VGridCell.prototype.setCss = function setCss() {
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

        return VGridCell;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'colNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCell', VGridCell);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
