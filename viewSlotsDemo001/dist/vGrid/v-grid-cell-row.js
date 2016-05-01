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
            console.log("setvalue bind" + this.rawValue);

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
                    console.log("checkbox normal");
                    return false;
                  } else {
                    console.log("checkbox edit");
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
                  this.setCss();
                  console.log("enter");
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
              console.log("focus edit");
              if (this.editRaw()) {
                this.setValue(null, true);
              }
            } else {
              console.log("focus normal");
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
              }
              console.log("bluredit");
            } else {
              console.log("blurnormal");
            }
          }.bind(this);

          this.cellContent.onchange = function (e) {}.bind(this);

          this.cellContent.onClick = function (e) {}.bind(this);

          this.cellContent.style.opacity = "initial";
          this.cellContent.style.border = "initial";
          this.cellContent.style.transition = "initial";

          this.cellContent.classList.add(this.vGrid.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.vGrid.vGridConfig.atts.dataAttribute, this.attribute());
          this.cellContent.setAttribute("style", this.vGrid.vGridConfig.colStyleArray[this.colNo]);

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
              console.log("setValue checkbox");
              break;
            default:
              this.hideIfUndefined(value);
              if (setRawValue) {
                this.cellContent.value = this.rawValue;
                console.log("setValue raw");
              } else {
                this.cellContent.value = this.valueFormater ? this.valueFormater.toView(value) : value;
                console.log("setValue normal");
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
          } else {
            if (this.containsWriteClass(this.element)) {
              this.removeCssOldCell();
              this.addFocusClass(this.element);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVVLLHVCQUhaLGNBQWMsaUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQVNDLGlCQUxXLFlBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQixjQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLE1BQUwsR0FBYyxLQUFkLENBSDBCO0FBSTFCLGVBQUssUUFBTCxHQUFnQixLQUFoQixDQUowQjtTQUE1Qjs7QUFMVywrQkFhWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGNBQUksS0FBSyxjQUFMLElBQXVCLEtBQUssV0FBTCxFQUFrQjtBQUMzQyxpQkFBSyxRQUFMLEdBQWdCLEtBQUssY0FBTCxDQUFvQixLQUFLLFNBQUwsRUFBcEIsQ0FBaEIsQ0FEMkM7QUFFM0MsaUJBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFkLENBRjJDO0FBRzNDLG9CQUFRLEdBQVIsQ0FBWSxrQkFBZ0IsS0FBSyxRQUFMLENBQTVCLENBSDJDOztBQUszQyxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxlQUFYLEtBQStCLFNBQVMsS0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixZQUF4QixDQUFxQyxLQUFyQyxDQUFULENBQS9CLEVBQXNGO0FBQ3hGLGtCQUFJLFNBQVMsS0FBSyxLQUFMLENBQVQsS0FBeUIsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixLQUEzQixFQUFrQztBQUM3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QUc1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksT0FBSixDQUEzQixDQUg0QjtBQUk1QixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksU0FBSixHQUFnQixLQUFLLEtBQUwsQ0FBM0MsQ0FKNEI7QUFLNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixJQUFJLFVBQUosR0FBaUIsS0FBSyxLQUFMLENBQTVDLENBTDRCO0FBTTVCLGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsT0FBMUIsRUFBbUMsU0FBbkMsRUFONEI7OztxQkFwWW5COzs4QkF1UVM7QUFDbEIsbUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsS0FBSyxLQUFMLENBQS9DLENBRGtCOzs7O2VBdlFUO2lGQUNWOzs7MEZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtcm93LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
