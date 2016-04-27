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

            this.setValue(this.bindingContext[this.attribute()]);

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
              this.cellContent.value = value || "";
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
