'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCellRowHeader;

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
      Container = _aureliaFramework.Container;
      bindable = _aureliaFramework.bindable;
      ViewSlot = _aureliaFramework.ViewSlot;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridCellRowHeader', VGridCellRowHeader = (_dec = customElement('v-grid-header-col'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid, Container), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCellRowHeader(element, vGrid, container) {
          _classCallCheck(this, VGridCellRowHeader);

          _initDefineProp(this, 'columnNo', _descriptor, this);

          this.element = element;
          this.vGrid = vGrid;
          this.container = container;
          this.vGridConfig = vGrid.vGridConfig;
          this.queryString = null;
        }

        VGridCellRowHeader.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
        };

        VGridCellRowHeader.prototype.created = function created() {};

        VGridCellRowHeader.prototype.attached = function attached() {
          this.setStandardClassesAndStyles();

          this.addFilter = this.vGridConfig.addFilter;
          this.header = this.vGridConfig.headerArray[this.columnNo];
          this.filter = this.vGridConfig.filterArray[this.columnNo];
          this.filterTop = this.vGridConfig.filterOnAtTop;
          this.justLabel = this.vGridConfig.doNotAddFilterTo.indexOf(this.attribute());
          this.filterName = this.vGridConfig.getFilterName(this.filter);
          var value = this.vGrid.vGridGenerator.queryStringCheck[this.attribute()];
          if (value) {
            this.queryString = value;
          }

          var sortIcon = this.getSortIconMarkup(this.attribute());

          var type = "single";
          if (this.addFilter) {
            type = "filterTop";
            if (!this.filterTop) {
              type = "filterBottom";
              if (this.justLabel !== -1) {
                type = "noFilterBottom";
              }
            } else {
              if (this.justLabel !== -1) {
                type = "noFilterTop";
              }
            }
          }
          this.type = type;

          switch (type) {
            case "single":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-label type="single">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n          </template>\n          ', this.vGrid.resources);
              break;
            case "filterTop":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-filter filter-value.bind="queryString" type="filterTop">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter>\n            <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n          </template>\n          ', this.vGrid.resources);
              break;
            case "filterBottom":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-label type="labelTop">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n             <v-grid-filter filter-value.bind="queryString" type="filterBottom">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter>\n          </template>\n          ', this.vGrid.resources);
              break;
            case "noFilterTop":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-label type="blankLabel">\n              <div></div>\n            </v-grid-label>\n             <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n          </template>\n          ', this.vGrid.resources);
              break;
            case "noFilterBottom":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n             <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n            <v-grid-label type="blankLabel">\n              <div></div>\n            </v-grid-label>\n          </template>\n          ', this.vGrid.resources);
              break;
            default:
              break;
          }

          var view = viewFactory.create(this.container);
          this.viewSlot = new ViewSlot(this.element, true);
          this.viewSlot.add(view);
          this.viewSlot.bind(this);
          this.viewSlot.attached();
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

        VGridCellRowHeader.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
          this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
          this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
          this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
          this.element.style.height = '100%';
          this.element.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + 'px';
        };

        VGridCellRowHeader.prototype.getSortIconMarkup = function getSortIconMarkup(attribute) {
          var _this = this;

          var markup = "";
          var rows = 1;

          if (this.vGridConfig.addFilter) {
            rows = 2;
          }
          var lineHeigthStyleTag = 'style=line-height:' + this.vGridConfig.headerHeight / rows + 'px;"';
          var isAscHtml = '<span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconAsc + '"></span>';
          var isDescHtml = '<span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconDesc + '"></span>';

          if (this.vGridConfig.sortNotOnHeader.indexOf(attribute) === -1) {
            markup = '<span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconSort + '"></span>';
            if (this.vGridConfig.sortOnHeaderClick) {
              if (this.vGrid.vGridGenerator.sortOrder.length !== 0) {
                this.vGrid.vGridSort.getFilter().forEach(function (x) {
                  if (x.attribute === attribute) {
                    var block = x.asc === true ? isAscHtml : isDescHtml;
                    var main = '<span ' + lineHeigthStyleTag + ' class="' + _this.vGridConfig.css.sortIcon + ' ' + _this.vGridConfig.css.sortIconNo + x.no + '"></span>';
                    markup = main + block;
                  }
                });
              }
            }
          }
          return markup;
        };

        VGridCellRowHeader.prototype.onChangeEventOnFilter = function onChangeEventOnFilter(e) {

          if (e.keyCode !== 9 && e.keyCode !== 39 && e.keyCode !== 37) {
            var queryInputs = this.vGrid.element.querySelectorAll("." + this.vGridConfig.css.filterHandle);

            var queryParams = [];
            for (var i = 0; i < queryInputs.length; i++) {
              var dataSourceAttribute = queryInputs[i].getAttribute(this.vGridConfig.atts.dataAttribute);
              var valueFormater = this.vGridConfig.colFormaterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
              var operator = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
              var value = valueFormater ? valueFormater.fromView(queryInputs[i].value) : queryInputs[i].value;

              if (value !== "" && value !== undefined) {
                queryParams.push({
                  attribute: dataSourceAttribute,
                  value: value,
                  operator: operator
                });

                this.vGrid.vGridGenerator.queryStringCheck[dataSourceAttribute] = queryInputs[i].value;
              } else {
                if (value === "") {
                  this.vGrid.vGridGenerator.queryStringCheck[dataSourceAttribute] = queryInputs[i].value;
                }
              }
            }

            this.vGridConfig.onFilterRun(queryParams);
          }
        };

        VGridCellRowHeader.prototype.onKeyUpEventOnFilter = function onKeyUpEventOnFilter(e) {
          if (this.vGridConfig.filterOnKeyArray[this.columnNo]) {
            e.target.onchange(e);
          } else {
            if (e.keyCode === 13) {
              e.target.onchange(e);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVztBQUFVOztBQUNwRTs7O29DQVFLLDZCQUhaLGNBQWMsbUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsR0FIQTtBQU9DLGlCQUhXLGtCQUdYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztnQ0FINUIsb0JBRzRCOzs7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEcUM7QUFFckMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUZxQztBQUdyQyxlQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FIcUM7QUFJckMsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBTixDQUprQjtBQUtyQyxlQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FMcUM7U0FBdkM7O0FBSFcscUNBV1gscUJBQUssZ0JBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QixDQURtQjs7O0FBWFYscUNBZ0JYLDZCQUFVOztBQWhCQyxxQ0FxQlgsK0JBQVc7QUFDVCxlQUFLLDJCQUFMLEdBRFM7O0FBSVQsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUpSO0FBS1QsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxDQUEzQyxDQUxTO0FBTVQsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxDQUEzQyxDQU5TO0FBT1QsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFpQixhQUFqQixDQVBSO0FBUVQsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFp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QUFDQSx5QkFBTyxLQUFQO0FBQ0EsNEJBQVUsUUFBVjtpQkFIRixFQUh1Qzs7QUFVdkMscUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZ0JBQTFCLENBQTJDLG1CQUEzQyxJQUFrRSxZQUFZLENBQVosRUFBZSxLQUFmLENBVjNCO2VBQXpDLE1BV087QUFFTCxvQkFBSSxVQUFVLEVBQVYsRUFBYztBQUNoQix1QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUIsQ0FBMkMsbUJBQTNDLElBQWtFLFlBQVksQ0FBWixFQUFlLEtBQWYsQ0FEbEQ7aUJBQWxCO2VBYkY7YUFURjs7QUE2QkEsaUJBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixXQUE3QixFQXBDMkQ7V0FBN0Q7OztBQW5NUyxxQ0ErT1gscURBQXFCLEdBQUc7QUFDdEIsY0FBSSxLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLEtBQUssUUFBTCxDQUF0QyxFQUFzRDtBQUNwRCxjQUFFLE1BQUYsQ0FBUyxRQUFULENBQWtCLENBQWxCLEVBRG9EO1dBQXRELE1BRU87QUFDTCxnQkFBSSxFQUFFLE9BQUYsS0FBYyxFQUFkLEVBQWtCO0FBQ3BCLGdCQUFFLE1BQUYsQ0FBUyxRQUFULENBQWtCLENBQWxCLEVBRG9CO2FBQXRCO1dBSEY7OztlQWhQUztvRkFDViIsImZpbGUiOiJ2R3JpZC92LWdyaWQtaGVhZGVyLWNvbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
