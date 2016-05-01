'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, VGrid, _createClass, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCellRow;

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

      _export('VGridCellRow', VGridCellRow = (_dec = customElement('v-grid-cell-header'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCellRow(element, vGrid) {
          var _this = this;

          _classCallCheck(this, VGridCellRow);

          _initDefineProp(this, 'columnNo', _descriptor, this);

          this.getHeaderCellMarkup = function (labelTopCell, valueInput, attribute) {

            var dragHandle = _this.vGridConfig.isSortableHeader ? _this.vGridConfig.css.dragHandle : "";

            var cssLabel, cssInput;
            if (_this.vGridConfig.filterOnAtTop) {
              cssLabel = _this.vGridConfig.css.cellContent + ' ' + _this.vGridConfig.css.filterLabelBottom + ' ' + dragHandle + ' ' + _this.vGridConfig.css.orderHandle;
              cssInput = _this.vGridConfig.css.cellContent + ' ' + _this.vGridConfig.css.filterInputTop + ' ' + _this.vGridConfig.css.filterHandle;
            } else {
              cssLabel = _this.vGridConfig.css.cellContent + ' ' + _this.vGridConfig.css.filterLabelTop + ' ' + dragHandle + ' ' + _this.vGridConfig.css.orderHandle;
              cssInput = _this.vGridConfig.css.cellContent + ' ' + _this.vGridConfig.css.filterInputBottom + ' ' + _this.vGridConfig.css.filterHandle;
            }

            var sortIcon = _this.getSortIcon(attribute);

            var filter = _this.vGridConfig.filterArray[_this.vGridConfig.attributeArray.indexOf(attribute)] || "filter";
            var filterName = _this.vGridConfig.getFilterName(filter);

            var lineHeigth = 'line-height:' + _this.vGridConfig.headerHeight / 2 + 'px;';

            var cellLabel = '<div style="' + lineHeigth + '" class="' + cssLabel + '" ' + _this.vGridConfig.atts.dataAttribute + '="' + attribute + '">' + labelTopCell + ' ' + sortIcon + '</div>';
            var cellInput = '<input style="' + lineHeigth + '" placeholder="' + filterName + '" class="' + cssInput + '" ' + _this.vGridConfig.atts.dataAttribute + '="' + attribute + '" value="' + valueInput + '"/>';

            if (_this.vGridConfig.doNotAddFilterTo.indexOf(attribute) !== -1) {
              var cssLabeltemp = cssLabel.replace(dragHandle, "");
              cellInput = '<div class="' + cssLabeltemp + '" ' + _this.vGridConfig.atts.dataAttribute + '="' + attribute + '"></div>';
            }

            var result;
            if (_this.vGridConfig.filterOnAtTop) {
              result = cellInput + cellLabel;
            } else {
              result = cellLabel + cellInput;
            }
            return result;
          };

          this.element = element;
          this.vGrid = vGrid;
          this.vGridConfig = vGrid.vGridConfig;
        }

        VGridCellRow.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
        };

        VGridCellRow.prototype.created = function created() {};

        VGridCellRow.prototype.attached = function attached() {
          this.setStandardClassesAndStyles();
          this.haveFilter = this.vGridConfig.addFilter;
          this.attribute = this.vGridConfig.attributeArray[this.columnNo];
          this.header = this.vGridConfig.headerArray[this.columnNo];
          this.filter = this.vGridConfig.filterArray[this.columnNo];

          if (!this.haveFilter) {
            this.createSingleRowLabel();
          } else {
            this.createDoubleRowWithFilter();
          }
        };

        VGridCellRow.prototype.createSingleRowLabel = function createSingleRowLabel() {
          var label = document.createElement('div');

          label.style['line-height'] = this.vGridConfig.headerHeight + "px";
          label.style.height = "100%";
          label.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + "px";

          label.classList.add(this.vGridConfig.css.rowHeaderCell);
          label.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
          label.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
          label.classList.add(this.vGridConfig.css.cellContent);
          label.classList.add(this.vGridConfig.css.orderHandle);

          label.innerHTML = this.header + this.getSortIcon(this.attribute);

          label.setAttribute(this.vGridConfig.atts.dataAttribute, this.attribute);

          var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";
          if (dragHandle !== "") {
            label.classList.add(dragHandle);
          }

          this.element.appendChild(label);
        };

        VGridCellRow.prototype.createDoubleRowWithFilter = function createDoubleRowWithFilter() {
          var value = "";

          if (this.vGrid.vGridGenerator.queryStringCheck[this.attribute] !== undefined) {
            value = this.vGrid.vGridGenerator.queryStringCheck[this.attribute];
          }

          this.element.innerHTML = this.getHeaderCellMarkup(this.header, value, this.attribute);

          var cellInputElement = this.element.querySelectorAll("." + this.vGridConfig.css.filterHandle)[0];

          if (cellInputElement) {
            if (this.datePicker()) {
              this.datePicker()(cellInputElement, this);
              this.cellInput = cellInputElement;
              cellInputElement.onkeyup = function () {
                this.onChangeEventOnFilter({ keyCode: "nothing" });
              }.bind(this);
            } else {
              if (this.vGridConfig.filterOnKey !== true) {
                cellInputElement.onkeyup = this.onKeyUpEventOnFilter.bind(this);
                cellInputElement.onchange = this.onChangeEventOnFilter.bind(this);
              } else {
                cellInputElement.onkeyup = this.onChangeEventOnFilter.bind(this);
              }
            }
          }
        };

        VGridCellRow.prototype.setCss = function setCss() {};

        VGridCellRow.prototype.setValue = function setValue(value) {
          this.cellInput.value = this.valueFormater ? this.valueFormater.toView(value) : value;
          this.onChangeEventOnFilter({ keyCode: "nothing" });
        };

        VGridCellRow.prototype.getValue = function getValue(value) {
          return this.valueFormater ? this.valueFormater.fromView(value) : value;
        };

        VGridCellRow.prototype.editMode = function editMode() {
          return true;
        };

        VGridCellRow.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {

          this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
          this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
          this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
          this.element.style.height = '100%';
          this.element.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + 'px';
        };

        VGridCellRow.prototype.getSortIcon = function getSortIcon(attribute) {
          var _this2 = this;

          var result;

          var lineHeigthStyleTag;

          if (!this.vGridConfig.addFilter) {
            lineHeigthStyleTag = 'style=line-height:' + this.vGridConfig.headerHeight + 'px;"';
          } else {
            lineHeigthStyleTag = 'style=line-height:' + this.vGridConfig.headerHeight / 2 + 'px;"';
          }

          if (this.vGridConfig.sortNotOnHeader.indexOf(attribute) !== -1) {
            return "";
          }

          if (this.vGridConfig.sortOnHeaderClick) {
            var main = '<span class=""><span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconSort + '"></span></span>';
            if (this.vGrid.vGridGenerator.sortOrder.length === 0) {

              result = main;
            } else {

              this.vGrid.vGridGenerator.sortOrder.forEach(function (x) {

                if (x.attribute === attribute) {
                  var isAsc = '<span ' + lineHeigthStyleTag + ' class="' + _this2.vGridConfig.css.sortIcon + ' ' + _this2.vGridConfig.css.sortIconAsc + '"></span>';
                  var isDesc = '<span ' + lineHeigthStyleTag + ' class="' + _this2.vGridConfig.css.sortIcon + ' ' + _this2.vGridConfig.css.sortIconDesc + '"></span>';

                  var asc = x.asc === true ? isAsc : isDesc;
                  var main = '<span ' + lineHeigthStyleTag + ' class="' + _this2.vGridConfig.css.sortIcon + ' ' + _this2.vGridConfig.css.sortIconNo + x.no + '">';
                  var end = '</span>';

                  result = main + end + asc;
                }
              });
            }
            if (!result) {
              result = main;
            }
          } else {
            result = "";
          }
          return result;
        };

        VGridCellRow.prototype.datePicker = function datePicker() {
          return this.vGrid.vGridConfig.colDatePickerArray[this.columnNo];
        };

        VGridCellRow.prototype.onChangeEventOnFilter = function onChangeEventOnFilter(e) {

          if (e.keyCode !== 9) {
            var queryHtmlInput = this.vGrid.element.querySelectorAll("." + this.vGridConfig.css.filterHandle);

            var queryParams = [];
            for (var i = 0; i < queryHtmlInput.length; i++) {

              var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
              var operator = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
              if (dataSourceAttribute === this.attribute) {
                var value = queryHtmlInput[i].value;
                if (this.datePicker()) {
                  value = this.getValue(value);
                }
              } else {
                var value = queryHtmlInput[i].value;
              }

              if (value !== "" && value !== undefined) {
                queryParams.push({
                  attribute: dataSourceAttribute,
                  value: value,
                  operator: operator
                });

                this.vGrid.vGridGenerator.queryStringCheck[this.attribute] = value;
              } else {

                if (value === "") {
                  var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
                  this.vGrid.vGridGenerator.queryStringCheck[dataSourceAttribute] = value;
                }
              }
            }
            this.vGridConfig.onFilterRun(queryParams);
          }
        };

        VGridCellRow.prototype.onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
          if (e.keyCode === 13 && triggerRan === false) {
            e.target.onchange(e);
          }
        };

        _createClass(VGridCellRow, [{
          key: 'colType',
          get: function get() {
            return this.vGridConfig.colTypeArray[this.columnNo];
          }
        }, {
          key: 'isCheckBox',
          get: function get() {
            return this.vGridConfig.colTypeArray[this.columnNo] === "checkbox";
          }
        }, {
          key: 'valueFormater',
          get: function get() {
            return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
          }
        }]);

        return VGridCellRow;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellRow', VGridCellRow);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQVFLLHVCQUhaLGNBQWMsb0JBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQU9DLGlCQUhXLFlBR1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCOzs7Z0NBSGpCLGNBR2lCOzs7O2VBNEk1QixzQkFBc0IsVUFBQyxZQUFELEVBQWUsVUFBZixFQUEyQixTQUEzQixFQUF5Qzs7QUFFN0QsZ0JBQUksYUFBYSxNQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEdBQW9DLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixVQUFyQixHQUFrQyxFQUF0RSxDQUY0Qzs7QUFJN0QsZ0JBQUksUUFBSixFQUFjLFFBQWQsQ0FKNkQ7QUFLN0QsZ0JBQUksTUFBSyxXQUFMLENBQWlCLGFBQWpCLEVBQWdDO0FBQ2xDLHlCQUFjLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixTQUFvQyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQXJCLFNBQTBDLG1CQUFjLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUR4RTtBQUVsQyx5QkFBYyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsU0FBb0MsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQXJCLFNBQXVDLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUFyQixDQUZ2RDthQUFwQyxNQUdPO0FBQ0wseUJBQWMsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLFNBQW9DLE1BQUssV0FBTCxDQUFpQixHQUFqQixD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V0FBakIsQ0FBNkIsV0FBN0IsRUFsRG1CO1dBQXJCOzs7QUFyUFMsK0JBOFNYLHFEQUFxQixHQUFHO0FBQ3RCLGNBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxJQUFvQixlQUFlLEtBQWYsRUFBc0I7QUFDNUMsY0FBRSxNQUFGLENBQVMsUUFBVCxDQUFrQixDQUFsQixFQUQ0QztXQUE5Qzs7O3FCQS9TUzs7OEJBa0NHO0FBQ1osbUJBQU8sS0FBSyxXQUFMLENBQWlCLFlBQWpCLENBQThCLEtBQUssUUFBTCxDQUFyQyxDQURZOzs7OzhCQUlHO0FBQ2YsbUJBQU8sS0FBSyxXQUFMLENBQWlCLFlBQWpCLENBQThCLEtBQUssUUFBTCxDQUE5QixLQUFpRCxVQUFqRCxDQURROzs7OzhCQXlGRztBQUNsQixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxLQUFLLFFBQUwsQ0FBL0MsQ0FEa0I7Ozs7ZUEvSFQ7b0ZBQ1YiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
