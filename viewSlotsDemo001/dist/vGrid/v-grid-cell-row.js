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
          this.isRealFocus = false;
        }

        VGridCellRow.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          if (this.bindingContext && this.cellContent) {
            this.setStyle();
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

        VGridCellRow.prototype.interpolate = function interpolate(str) {
          if (str) {
            return function interpolate(o) {
              return str.replace(/{{([^{}]*)}}/g, function (a, b) {
                var r = o[b];
                return r;
              });
            };
          } else {
            return function () {
              return "";
            };
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
              this.vGrid.vGridCurrentEntity[this.attribute()] = this.rawValue;
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
                  this.isRealFocus = true;
                }
              }
            }
            this.setCss();
            this.cellContent.focus();
          }.bind(this));

          this.cellContent.onblur = function (e) {
            if (this.editMode()) {
              if (this.editRaw()) {
                var canUpdate = true;
                if (this.isRealFocus) {
                  this.vGrid.vGridCellHelper.updateActual({
                    attribute: this.attribute(),
                    value: this.valueFormater ? this.valueFormater.fromView(this.cellContent.value) : this.cellContent.value
                  });
                  this.rawValue = this.cellContent.value;

                  this.setValue(null, true);
                  this.setCss();
                }
              } else {
                this.vGrid.vGridCellHelper.updateActual({
                  attribute: this.attribute(),
                  value: this.getValue()
                });
                this.rawValue = this.getValue();
              }
            } else {}

            if (this.isRealFocus === false) {
              this.vGrid.vGridCurrentEntity[this.attribute()] = this.rawValue;
            }

            this.isRealFocus = false;
          }.bind(this);

          this.cellContent.onchange = function (e) {
            console.log("changed");
          }.bind(this);

          this.cellContent.onClick = function (e) {}.bind(this);

          this.setStyle();

          if (this.bindingContext) {
            this.setValue(this.bindingContext[this.attribute()]);
          }
          this.element.appendChild(this.cellContent);
        };

        VGridCellRow.prototype.setStyle = function setStyle() {
          this.cellContent.style.opacity = "initial";
          this.cellContent.style.border = "initial";
          this.cellContent.style.transition = "initial";

          this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.attribute());
          this.cellContent.setAttribute("style", this.interpolate(this.vGrid.vGridConfig.colStyleArray[this.columnNo])(this.bindingContext));
          this.cellContent.setAttribute("readonly", "true");

          if (this.colType() === "checkbox") {
            this.cellContent.style.heigth = "initial";
            this.cellContent.style.width = "initial";
            this.cellContent.style.margin = "auto";
            this.cellContent.style.display = "block";
          }

          this.cellContent.setAttribute("tabindex", "0");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVNDLGlCQUxXLFlBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixjQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLE1BQUwsR0FBYyxLQUFkLENBSDBCO0FBSTFCLGVBQUssZUFBTCxHQUF1QixLQUF2QixDQUowQjtBQUsxQixlQUFLLFdBQUwsR0FBbUIsS0FBbkIsQ0FMMEI7U0FBNUI7O0FBTFcsK0JBY1gscUJBQUssZ0JBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QixDQURtQjtBQUVuQixjQUFJLEtBQUssY0FBTCxJQUF1QixLQUFLLFdBQUwsRUFBa0I7QUFDM0MsaUJBQUssUUFBTCxHQUQyQztBQUUzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FGMkM7QUFHM0MsaUJBQUssUUFBTCxDQUFjLEVBQWQsRUFIMkM7QUFJM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBSjJDO0FBSzNDLGdCQUFJLEtBQUssS0FBTCxDQUFXLGVBQVgsS0FBK0IsU0FBUyxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLENBQVQsQ0FBL0IsRUFBc0Y7QUFDeEYsa0JBQUksU0FBUyxLQUFLLFFBQUwsQ0FBVCxLQUE0QixLQUFL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QUwsQ0FBd0IsS0FBSyxPQUFMLENBQTVCLEVBQTJDO0FBQ3pDLGlCQUFLLGdCQUFMLENBQXNCLEtBQUssT0FBTCxDQUF0QixDQUR5QztXQUEzQzs7O0FBM1lTLCtCQWlaWCwrQ0FBbUI7QUFDakIsY0FBSSxLQUFLLGtCQUFMLENBQXdCLEtBQUssbUJBQUwsRUFBeEIsQ0FBSixFQUF5RDtBQUN2RCxpQkFBSyxnQkFBTCxDQUFzQixLQUFLLG1CQUFMLEVBQXRCLEVBRHVEO1dBQXpEO0FBR0EsY0FBSSxLQUFLLGtCQUFMLENBQXdCLEtBQUssbUJBQUwsRUFBeEIsQ0FBSixFQUF5RDtBQUN2RCxpQkFBSyxnQkFBTCxDQUFzQixLQUFLLG1CQUFMLEVBQXRCLEVBRHVEO1dBQXpEOzs7QUFyWlMsK0JBMlpYLDJCQUFTO0FBQ1AsY0FBSSxDQUFDLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxPQUFMLENBQXpCLEVBQXdDO0FBQzFDLGlCQUFLLGFBQUwsQ0FBbUIsS0FBSyxPQUFMLENBQW5CLENBRDBDO0FBRTFDLGlCQUFLLGdCQUFMLEdBRjBDO0FBRzFDLGlCQUFLLG1CQUFMLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQUgwQztXQUE1Qzs7QUFNQSxjQUFJLEtBQUssUUFBTCxNQUFtQixDQUFDLEtBQUssUUFBTCxFQUFELEVBQWtCO0FBQ3ZDLGdCQUFJLENBQUMsS0FBSyxrQkFBTCxDQUF3QixLQUFLLE9BQUwsQ0FBekIsRUFBd0M7QUFDMUMsbUJBQUssZ0JBQUwsQ0FBc0IsS0FBSyxPQUFMLENBQXRCLENBRDBDO0FBRTFDLG1CQUFLLGFBQUwsQ0FBbUIsS0FBSyxPQUFMLENBQW5CLENBRjBDO2FBQTVDO1dBREY7OztBQWxhUywrQkEwYVgscUVBQThCO0FBQzVCLGNBQUksTUFBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBRGtCO0FBRTVCLGNBQUksdUJBQXFCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLEtBQUssUUFBTCxRQUE3RCxDQUZ3QjtBQUc1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksT0FBSixDQUEzQixDQUg0QjtBQUk1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksU0FBSixHQUFnQixLQUFLLFFBQUwsQ0FBM0MsQ0FKNEI7QUFLNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLFVBQUosR0FBaUIsS0FBSyxRQUFMLENBQTVDLENBTDRCO0FBTTVCLGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsT0FBMUIsRUFBbUMsU0FBbkMsRUFONEI7OztxQkExYW5COzs4QkF1U1M7QUFDbEIsbUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxRQUFMLENBQS9DLENBRGtCOzs7O2VBdlNUO29GQUNWOzs7MEZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtcm93LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
