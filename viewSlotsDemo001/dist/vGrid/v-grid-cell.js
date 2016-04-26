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
            this.setValue(this.bindingContext[this.vGrid.vGridConfig.attributeArray[this.colNo]]);
          }
        };

        VGridCell.prototype.created = function created() {};

        VGridCell.prototype.removeCssCell = function removeCssCell() {
          if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
            this.element.classList.remove(this.vGrid.vGridConfig.css.editCell);
          }

          if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
            this.element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          }

          if (this.element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
            this.element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
          }
        };

        VGridCell.prototype.hideIfUndefined = function hideIfUndefined(value) {
          if (value === undefined) {
            this.hidden = true;
            this.cellContent.style.display = "none";
          } else {
            if (this.cellContent.style.display === "none") {
              this.hidden = false;
              this.cellContent.style.display = "block";
            }
            this.cellContent.src = value;
          }
        };

        VGridCell.prototype.setValue = function setValue(value) {
          this.removeCssCell();

          var type = this.vGrid.vGridConfig.colTypeArray[this.colNo];
          switch (type) {
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

        VGridCell.prototype.attached = function attached() {

          var type = this.vGrid.vGridConfig.colTypeArray[this.colNo];
          switch (type) {
            case "image":
              this.cellContent = document.createElement("img");
              break;
            case "checkbox":
              this.cellContent = document.createElement("input");
              this.cellContent.type = "checkbox";
              this.cellContent.onclick = function (e) {
                if (!this.vGrid.vGridCellEdit.editMode) {
                  return false;
                }
              }.bind(this);
              break;
            default:
              this.cellContent = document.createElement("input");
          }

          this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.vGrid.vGridConfig.attributeArray[this.colNo]);
          this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);
          this.cellContent.style.opacity = 1;
          this.cellContent.style.border = 0;
          this.cellContent.style.transition = "0ms";
          this.cellContent.setAttribute("tabindex", "0");

          if (this.bindingContext) {
            this.setValue(this.bindingContext[this.vGrid.vGridConfig.attributeArray[this.colNo]]);
          }
          this.element.appendChild(this.cellContent);
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
