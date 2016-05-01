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
            if (this.editMode()) {
              this.vGrid.vGridCellHelper.updateActual({
                attribute: this.attribute(),
                value: this.getValue()
              });
            }
          }.bind(this);

          this.cellContent.onchange = function (e) {}.bind(this);

          this.cellContent.onClick = function (e) {}.bind(this);

          this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.attribute());
          this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);
          this.cellContent.style.opacity = 1;
          this.cellContent.style.border = 0;
          this.cellContent.style.transition = "0ms";

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
              this.cellContent.value = this.valueFormater ? this.valueFormater.toView(value) : value;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVNDLGlCQUxXLFlBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixjQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLE1BQUwsR0FBYyxLQUFkLENBSDBCO0FBSTFCLGVBQUssUUFBTCxHQUFnQixLQUFoQixDQUowQjtTQUE1Qjs7QUFMVywrQkFhWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGNBQUksS0FBSyxjQUFMLElBQXVCLEtBQUssV0FBTCxFQUFrQjtBQUMzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FEMkM7QUFFM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBRjJDOztBQUkzQyxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxlQUFYLEtBQStCLFNBQVMsS0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixZQUF4QixDQUFxQyxLQUFyQyxDQUFULENBQS9CLEVBQXNGO0FBQ3hGLGtCQUFJLFNBQVMsS0FBSyxLQUFMLENBQVQsS0FBeUIsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixLQUEzQixFQUFrQztBQUM3RCxvQkFBSSxDQUFDLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxPQUFMLENBQXpCLEVBQXdD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QUFLLG1CQUFMLEVBQXRCLEVBRHVEO1dBQXpEO0FBR0EsY0FBSSxLQUFLLGtCQUFMLENBQXdCLEtBQUssbUJBQUwsRUFBeEIsQ0FBSixFQUF5RDtBQUN2RCxpQkFBSyxnQkFBTCxDQUFzQixLQUFLLG1CQUFMLEVBQXRCLEVBRHVEO1dBQXpEOzs7QUEvVFMsK0JBcVVYLDJCQUFTO0FBQ1AsY0FBSSxDQUFDLEtBQUssa0JBQUwsQ0FBd0IsS0FBSyxPQUFMLENBQXpCLEVBQXdDO0FBQzFDLGlCQUFLLGFBQUwsQ0FBbUIsS0FBSyxPQUFMLENBQW5CLENBRDBDO0FBRTFDLGlCQUFLLGdCQUFMLEdBRjBDO0FBRzFDLGlCQUFLLG1CQUFMLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQUgwQztXQUE1Qzs7QUFNQSxjQUFJLEtBQUssUUFBTCxNQUFtQixDQUFDLEtBQUssUUFBTCxFQUFELEVBQWtCO0FBQ3ZDLGdCQUFJLENBQUMsS0FBSyxrQkFBTCxDQUF3QixLQUFLLE9BQUwsQ0FBekIsRUFBd0M7QUFDMUMsbUJBQUssYUFBTCxDQUFtQixLQUFLLE9BQUwsQ0FBbkIsQ0FEMEM7YUFBNUM7V0FERjs7O0FBNVVTLCtCQW1WWCxxRUFBOEI7QUFDNUIsY0FBSSxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FEa0I7QUFFNUIsY0FBSSx1QkFBcUIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxLQUFMLFFBQTdELENBRndCO0FBRzVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxPQUFKLENBQTNCLENBSDRCO0FBSTVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxTQUFKLEdBQWdCLEtBQUssS0FBTCxDQUEzQyxDQUo0QjtBQUs1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksVUFBSixHQUFpQixLQUFLLEtBQUwsQ0FBNUMsQ0FMNEI7QUFNNUIsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixPQUExQixFQUFtQyxTQUFuQyxFQU40Qjs7O3FCQW5WbkI7OzhCQTJOUztBQUNsQixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxLQUFLLEtBQUwsQ0FBL0MsQ0FEa0I7Ozs7ZUEzTlQ7aUZBQ1Y7OzswRkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC1yb3cuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
