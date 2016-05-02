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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVNDLGlCQUxXLFlBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixjQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLE1BQUwsR0FBYyxLQUFkLENBSDBCO0FBSTFCLGVBQUssZUFBTCxHQUF1QixLQUF2QixDQUowQjtTQUE1Qjs7QUFMVywrQkFhWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGNBQUksS0FBSyxjQUFMLElBQXVCLEtBQUssV0FBTCxFQUFrQjtBQUMzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FEMkM7QUFFM0MsaUJBQUssUUFBTCxDQUFjLEVBQWQsRUFGMkM7QUFHM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBSDJDO0FBSTNDLGdCQUFJLEtBQUssS0FBTCxDQUFXLGVBQVgsS0FBK0IsU0FBUyxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLENBQVQsQ0FBL0IsRUFBc0Y7QUFDeEYsa0JBQUksU0FBUyxLQUFLLFFBQUwsQ0FBVCxLQUE0QixLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLEtBQTNCLEVBQWtDO0FBQ2hFLG9CQUFJLENBQUMsS0FBSyxr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S0FBSyxPQUFMLENBQTVCLEVBQTJDO0FBQ3pDLGlCQUFLLGdCQUFMLENBQXNCLEtBQUssT0FBTCxDQUF0QixDQUR5QztXQUEzQzs7O0FBbFdTLCtCQXdXWCwrQ0FBbUI7QUFDakIsY0FBSSxLQUFLLGtCQUFMLENBQXdCLEtBQUssbUJBQUwsRUFBeEIsQ0FBSixFQUF5RDtBQUN2RCxpQkFBSyxnQkFBTCxDQUFzQixLQUFLLG1CQUFMLEVBQXRCLEVBRHVEO1dBQXpEO0FBR0EsY0FBSSxLQUFLLGtCQUFMLENBQXdCLEtBQUssbUJBQUwsRUFBeEIsQ0FBSixFQUF5RDtBQUN2RCxpQkFBSyxnQkFBTCxDQUFzQixLQUFLLG1CQUFMLEVBQXRCLEVBRHVEO1dBQXpEOzs7QUE1V1MsK0JBa1hYLDJCQUFTO0FBQ1AsY0FBSSxDQUFDLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxPQUFMLENBQXpCLEVBQXdDO0FBQzFDLGlCQUFLLGFBQUwsQ0FBbUIsS0FBSyxPQUFMLENBQW5CLENBRDBDO0FBRTFDLGlCQUFLLGdCQUFMLEdBRjBDO0FBRzFDLGlCQUFLLG1CQUFMLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQUgwQztXQUE1Qzs7QUFNQSxjQUFJLEtBQUssUUFBTCxNQUFtQixDQUFDLEtBQUssUUFBTCxFQUFELEVBQWtCO0FBQ3ZDLGdCQUFJLENBQUMsS0FBSyxrQkFBTCxDQUF3QixLQUFLLE9BQUwsQ0FBekIsRUFBd0M7QUFDMUMsbUJBQUssZ0JBQUwsQ0FBc0IsS0FBSyxPQUFMLENBQXRCLENBRDBDO0FBRTFDLG1CQUFLLGFBQUwsQ0FBbUIsS0FBSyxPQUFMLENBQW5CLENBRjBDO2FBQTVDO1dBREY7OztBQXpYUywrQkFpWVgscUVBQThCO0FBQzVCLGNBQUksTUFBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBRGtCO0FBRTVCLGNBQUksdUJBQXFCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLEtBQUssUUFBTCxRQUE3RCxDQUZ3QjtBQUc1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksT0FBSixDQUEzQixDQUg0QjtBQUk1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksU0FBSixHQUFnQixLQUFLLFFBQUwsQ0FBM0MsQ0FKNEI7QUFLNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLFVBQUosR0FBaUIsS0FBSyxRQUFMLENBQTVDLENBTDRCO0FBTTVCLGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsT0FBMUIsRUFBbUMsU0FBbkMsRUFONEI7OztxQkFqWW5COzs4QkE4UFM7QUFDbEIsbUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxRQUFMLENBQS9DLENBRGtCOzs7O2VBOVBUO29GQUNWOzs7MEZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtcm93LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
