'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, bindingMode, VGrid, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCellRowHeader;

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
      bindingMode = _aureliaFramework.bindingMode;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridCellRowHeader', VGridCellRowHeader = (_dec = customElement('v-grid-cell-header'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCellRowHeader(element, vGrid) {
          var _this = this;

          _classCallCheck(this, VGridCellRowHeader);

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

        VGridCellRowHeader.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
        };

        VGridCellRowHeader.prototype.created = function created() {};

        VGridCellRowHeader.prototype.attached = function attached() {
          this.setStandardClassesAndStyles();
          this.haveFilter = this.vGridConfig.addFilter;
          this.header = this.vGridConfig.headerArray[this.columnNo];
          this.filter = this.vGridConfig.filterArray[this.columnNo];

          if (!this.haveFilter) {
            this.createSingleRowLabel();
          } else {
            this.createDoubleRowWithFilter();
          }
        };

        VGridCellRowHeader.prototype.attribute = function attribute() {
          return this.vGridConfig.attributeArray[this.columnNo];
        };

        VGridCellRowHeader.prototype.getValue = function getValue(value) {
          return this.valueFormater ? this.valueFormater().fromView(value) : value;
        };

        VGridCellRowHeader.prototype.setValue = function setValue(value) {
          return this.valueFormater ? this.valueFormater().toView(value) : value;
        };

        VGridCellRowHeader.prototype.valueFormater = function valueFormater() {
          return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
        };

        VGridCellRowHeader.prototype.createSingleRowLabel = function createSingleRowLabel() {
          var label = document.createElement('div');

          label.style['line-height'] = this.vGridConfig.headerHeight + "px";
          label.style.height = "100%";
          label.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + "px";

          label.classList.add(this.vGridConfig.css.rowHeaderCell);
          label.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
          label.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
          label.classList.add(this.vGridConfig.css.cellContent);
          label.classList.add(this.vGridConfig.css.orderHandle);

          label.innerHTML = this.header + this.getSortIcon(this.attribute());

          label.setAttribute(this.vGridConfig.atts.dataAttribute, this.attribute());

          var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";
          if (dragHandle !== "") {
            label.classList.add(dragHandle);
          }

          this.element.appendChild(label);
        };

        VGridCellRowHeader.prototype.createDoubleRowWithFilter = function createDoubleRowWithFilter() {
          var value = "";

          if (this.vGrid.vGridGenerator.queryStringCheck[this.attribute()] !== undefined) {
            value = this.vGrid.vGridGenerator.queryStringCheck[this.attribute()];
          }

          this.element.innerHTML = this.getHeaderCellMarkup(this.header, value, this.attribute());

          var cellInputElement = this.element.querySelectorAll("." + this.vGridConfig.css.filterHandle)[0];

          if (cellInputElement) {
            if (this.vGridConfig.filterOnKeyArray[this.columnNo] !== true) {
              cellInputElement.onkeyup = this.onKeyUpEventOnFilter.bind(this);
              cellInputElement.onchange = this.onChangeEventOnFilter.bind(this);
            } else {
              cellInputElement.onkeyup = this.onChangeEventOnFilter.bind(this);
            }
          }

          this.cellInputElement = cellInputElement;
        };

        VGridCellRowHeader.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {

          this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
          this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
          this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
          this.element.style.height = '100%';
          this.element.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + 'px';
        };

        VGridCellRowHeader.prototype.getSortIcon = function getSortIcon(attribute) {
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

        VGridCellRowHeader.prototype.onChangeEventOnFilter = function onChangeEventOnFilter(e) {

          if (e.keyCode !== 9 && e.keyCode !== 39 && e.keyCode !== 37) {
            var queryHtmlInput = this.vGrid.element.querySelectorAll("." + this.vGridConfig.css.filterHandle);

            var queryParams = [];
            for (var i = 0; i < queryHtmlInput.length; i++) {
              var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
              var valueFormater = this.vGridConfig.colFormaterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
              var operator = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
              var value = valueFormater ? valueFormater.fromView(queryHtmlInput[i].value) : queryHtmlInput[i].value;

              if (value !== "" && value !== undefined) {
                queryParams.push({
                  attribute: dataSourceAttribute,
                  value: value,
                  operator: operator
                });

                this.vGrid.vGridGenerator.queryStringCheck[dataSourceAttribute] = valueFormater ? valueFormater.toView(queryHtmlInput[i].value) : queryHtmlInput[i].value;
              } else {

                if (value === "") {
                  var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
                  this.vGrid.vGridGenerator.queryStringCheck[dataSourceAttribute] = valueFormater ? valueFormater.toView(queryHtmlInput[i].value) : queryHtmlInput[i].value;
                }
              }
            }
            this.vGridConfig.onFilterRun(queryParams);
          }
        };

        VGridCellRowHeader.prototype.onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
          if (e.keyCode === 13) {
            e.target.onchange(e);
          }
        };

        return VGridCellRowHeader;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellRowHeader', VGridCellRowHeader);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCO0FBQVU7O0FBQ3pEOzs7b0NBUUssNkJBSFosY0FBYyxvQkFBZCxXQUNBLGVBQWUsS0FBZixXQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixHQUhBO0FBT0MsaUJBSFcsa0JBR1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCOzs7Z0NBSGpCLG9CQUdpQjs7OztlQW1JNUIsc0JBQXNCLFVBQUMsWUFBRCxFQUFlLFVBQWYsRUFBMkIsU0FBM0IsRUFBeUM7O0FBRTdELGdCQUFJLGFBQWEsTUFBSyxXQUFMLENBQWlCLGdCQUFqQixHQUFvQyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsVUFBckIsR0FBa0MsRUFBdEUsQ0FGNEM7O0FBSTdELGdCQUFJLFFBQUosRUFBYyxRQUFkLENBSjZEO0FBSzdELGdCQUFJLE1BQUssV0FBTCxDQUFpQixhQUFqQixFQUFnQztBQUNsQyx5QkFBYyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsU0FBb0MsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGlCQUFyQixTQUEwQyxtQkFBYyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FEeEU7QUFFbEMseUJBQWMsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLFNBQW9DLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixTQUF1QyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FGdkQ7YUFBcEMsTUFHTztBQUNMLHlCQUFjLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixTQUFvQyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBckIs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
