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
            console.log("focus");
            this.setCss();
            this.cellContent.focus();
          }.bind(this));

          this.cellContent.onblur = function (e) {
            console.log("blur");
            this.vGrid.vGridCellEdit.updateActual({
              attribute: this.attribute(),
              value: this.getValue()
            });
          }.bind(this);

          this.cellContent.onchange = function (e) {
            console.log("change");
          }.bind(this);

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
