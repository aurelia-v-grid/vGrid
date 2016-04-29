'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, bindable, VGrid, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCellRow;

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
      _export('VGridCellRow', VGridCellRow = (_dec = customElement('v-grid-cell-header'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        VGridCellRow.prototype.columnNoChanged = function columnNoChanged(newValue) {
          console.log("changed");
        };

        function VGridCellRow(element, vGrid) {
          _classCallCheck(this, VGridCellRow);

          _initDefineProp(this, 'columnNo', _descriptor, this);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridConfig = vGrid.vGridConfig;
        }

        VGridCellRow.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          console.log("nind");
        };

        VGridCellRow.prototype.created = function created() {
          console.log("created");
        };

        VGridCellRow.prototype.attached = function attached() {
          var _this = this;

          this.setStandardClassesAndStyles();
          this.haveFilter = this.vGrid.vGridConfig.addFilter;
          this.attribute = this.vGrid.vGridConfig.attributeArray[this.columnNo];
          this.header = this.vGridConfig.headerArray[this.columnNo];
          this.filter = this.vGridConfig.filterArray[this.columnNo];
          var sortIcon = this.getSortIcon(this.attribute);
          if (!this.haveFilter) {
            this.label = document.createElement('div');
            this.label.style['line-height'] = this.vGridConfig.headerHeight + "px";
            this.label.style.height = "100%";
            this.label.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + "px";
            this.label.classList.add(this.vGridConfig.css.rowHeaderCell);
            this.label.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
            this.label.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
            this.label.innerHTML = this.header + sortIcon;
            this.label.setAttribute(this.vGridConfig.atts.dataAttribute, this.attribute);
            var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";
            if (dragHandle !== "") {
              this.label.classList.add(dragHandle);
            }
            this.label.classList.add(this.vGridConfig.css.cellContent);
            this.label.classList.add(this.vGridConfig.css.orderHandle);

            this.element.appendChild(this.label);
          } else {
            var getHeaderCellMarkup = function getHeaderCellMarkup(labelTopCell, valueInput, attribute) {

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
                cellInput = '<div class="' + cssLabel + '" ' + _this.vGridConfig.atts.dataAttribute + '="' + attribute + '"></div>';
              }

              var result;
              if (_this.vGridConfig.filterOnAtTop) {
                result = cellInput + cellLabel;
              } else {
                result = cellLabel + cellInput;
              }
              return result;
            };

            var value = "";

            if (this.vGrid.vGridGenerator.queryStringCheck[this.attribute] !== undefined) {
              value = this.vGrid.vGridGenerator.queryStringCheck[this.attribute];
            }

            var onFocus = function onFocus(e) {
              _this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = e.target.offsetParent.offsetParent.offsetParent.scrollLeft;
            };

            this.element.innerHTML = getHeaderCellMarkup(this.header, value, this.attribute);

            var cellInputElement = this.element.querySelectorAll("." + this.vGridConfig.css.filterHandle);
            if (this.vGridConfig.filterOnKey !== true) {
              for (var i = 0; i < cellInputElement.length; i++) {
                cellInputElement[i].onchange = this.onChangeEventOnFilter.bind(this);
                cellInputElement[i].onkeyup = this.onKeyUpEventOnFilter.bind(this);
                cellInputElement[i].onfocus = onFocus.bind(this);
              }
            } else {
              for (var i = 0; i < cellInputElement.length; i++) {
                cellInputElement[i].onkeyup = this.onChangeEventOnFilter.bind(this);
                cellInputElement[i].onfocus = onFocus.bind(this);
              }
            }
          }

          console.log("attached");
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

        VGridCellRow.prototype.onChangeEventOnFilter = function onChangeEventOnFilter(e) {

          if (e.keyCode !== 9) {
            var queryHtmlInput = this.vGrid.element.querySelectorAll("." + this.vGridConfig.css.filterHandle);

            var queryParams = [];
            for (var i = 0; i < queryHtmlInput.length; i++) {
              if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
                var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
                var operator = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];

                var value = queryHtmlInput[i].value;

                queryParams.push({
                  attribute: dataSourceAttribute,
                  value: value,
                  operator: operator
                });

                this.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
              } else {

                if (queryHtmlInput[i].value === "") {
                  var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
                  this.vGrid.vGridGenerator.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
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

        return VGridCellRow;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellRow', VGridCellRow);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBUTtBQUFlO0FBQWdCOztBQUMvQzs7OzhCQVNLLHVCQUhaLGNBQWMsb0JBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsR0FIQTtBQUlZLCtCQUlYLDJDQUFnQixVQUFTO0FBQ3ZCLGtCQUFRLEdBQVIsQ0FBWSxTQUFaLEVBRHVCOzs7QUFJekIsaUJBUlcsWUFRWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBUmpCLGNBUWlCOzs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLFdBQUwsR0FBbUIsTUFBTSxXQUFOLENBSE87U0FBNUI7O0FBUlcsK0JBZVgscUJBQUssZ0JBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QixDQURtQjtBQUVuQixrQkFBUSxHQUFSLENBQVksTUFBWixFQUZtQjs7O0FBZlYsK0JBdUJYLDZCQUFVO0FBQ1Isa0JBQVEsR0FBUixDQUFZLFNBQVosRUFEUTs7O0FBdkJDLCtCQTRCWCwrQkFBVzs7O0FBQ1QsZUFBSywyQkFBTCxHQURTO0FBRVQsZUFBSyxVQUFMLEdBQWtCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsQ0FGVDtBQUdULGVBQUssU0FBTCxHQUFpQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGNBQXZCLENBQXNDLEtBQUssUUFBTCxDQUF2RCxDQUhTO0FBSVQsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxDQUEzQyxDQUpTO0FBS1QsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpC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
