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
          this.displayRawValue = false;
        }

        VGridCellRow.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          if (this.bindingContext && this.cellContent) {
            this.rawValue = this.bindingContext[this.attribute()];
            this.setValue("");
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
          }

          this.cellContent.ondblclick = function (e) {
            this.setEditMode(true);
            this.cellContent.select();
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
          this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVNDLGlCQUxXLFlBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixjQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLE1BQUwsR0FBYyxLQUFkLENBSDBCO0FBSTFCLGVBQUssZUFBTCxHQUF1QixLQUF2QixDQUowQjtTQUE1Qjs7QUFMVywrQkFhWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGNBQUksS0FBSyxjQUFMLElBQXVCLEtBQUssV0FBTCxFQUFrQjtBQUMzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FEMkM7QUFFM0MsaUJBQUssUUFBTCxDQUFjLEVBQWQsRUFGMkM7QUFHM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBSDJDO0FBSTNDLGdCQUFJLEtBQUssS0FBTCxDQUFXLGVBQVgsS0FBK0IsU0FBUyxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLENBQVQsQ0FBL0IsRUFBc0Y7QUFDeEYsa0JBQUksU0FBUyxLQUFLLEtBQUwsQ0FBVCxLQUF5QixLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEtBQTNCLEVBQWtDO0FBQzdELG9CQUFJLENBQUMsS0FBSyxr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WCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxLQUFMLFFBQTdELENBRndCO0FBRzVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxPQUFKLENBQTNCLENBSDRCO0FBSTVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxTQUFKLEdBQWdCLEtBQUssS0FBTCxDQUEzQyxDQUo0QjtBQUs1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksVUFBSixHQUFpQixLQUFLLEtBQUwsQ0FBNUMsQ0FMNEI7QUFNNUIsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixPQUExQixFQUFtQyxTQUFuQyxFQU40Qjs7O3FCQTNZbkI7OzhCQXdRUztBQUNsQixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxLQUFLLEtBQUwsQ0FBL0MsQ0FEa0I7Ozs7ZUF4UVQ7aUZBQ1Y7OzswRkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC1yb3cuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
