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
      _export('VGridCellRowHeader', VGridCellRowHeader = (_dec = customElement('v-grid-header-col'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVTs7QUFDekQ7OztvQ0FRSyw2QkFIWixjQUFjLG1CQUFkLFdBQ0EsZUFBZSxLQUFmLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEdBSEE7QUFPQyxpQkFIVyxrQkFHWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7OztnQ0FIakIsb0JBR2lCOzs7O2VBMEg1QixzQkFBc0IsVUFBQyxZQUFELEVBQWUsVUFBZixFQUEyQixTQUEzQixFQUF5Qzs7QUFFN0QsZ0JBQUksYUFBYSxNQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEdBQW9DLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixVQUFyQixHQUFrQyxFQUF0RSxDQUY0Qzs7QUFJN0QsZ0JBQUksUUFBSixFQUFjLFFBQWQsQ0FKNkQ7QUFLN0QsZ0JBQUksTUFBSyxXQUFMLENBQWlCLGFBQWpCLEVBQWdDO0FBQ2xDLHlCQUFjLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixTQUFvQyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQXJCLFNBQTBDLG1CQUFjLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUR4RTtBQUVsQyx5QkFBYyxNQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsU0FBb0MsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQXJCLFNBQXVDLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUFyQixDQUZ2RDthQUFwQyxNQUdPO0FBQ0wseUJBQWMsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLFNBQW9DLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixT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
