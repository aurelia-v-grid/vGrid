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
          this.colType = this.vGrid.vGridConfig.colTypeArray[this.columnNo];
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

          if (this.colType === "selection") {
            type = "selection";
          }

          this.type = type;

          switch (type) {
            case "selection":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-filter-' + this.colType + '></v-grid-filter-' + this.colType + '>              \n          </template>\n          ', this.vGrid.resources);
              break;
            case "single":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n          \n            <v-grid-label type="single">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n            \n          </template>\n          ', this.vGrid.resources);
              break;
            case "filterTop":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n          \n            <v-grid-filter-' + this.colType + ' filter-value.two-way="queryString" type="filterTop">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-' + this.colType + '>\n          \n            <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n            \n          </template>\n          ', this.vGrid.resources);
              break;
            case "filterBottom":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n          \n            <v-grid-label type="labelTop">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n            \n             <v-grid-filter-' + this.colType + ' filter-value..two-way="queryString" type="filterBottom">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-' + this.colType + '>\n            \n          </template>\n          ', this.vGrid.resources);
              break;
            case "noFilterTop":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n          \n            <v-grid-label type="blankLabel">\n              <div></div>\n            </v-grid-label>\n            \n             <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n            \n          </template>\n          ', this.vGrid.resources);
              break;
            case "noFilterBottom":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n          \n             <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n            \n            <v-grid-label type="blankLabel">\n              <div></div>\n            </v-grid-label>\n            \n          </template>\n          ', this.vGrid.resources);
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
              var coltype = this.vGridConfig.colTypeArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
              var value = valueFormater ? valueFormater.fromView(queryInputs[i].value) : queryInputs[i].value;

              if (coltype === "checkbox" && value !== "true" && value !== "false") {
                value = "";
              }

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

        return VGridCellRowHeader;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellRowHeader', VGridCellRowHeader);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVztBQUFVOztBQUNwRTs7O29DQVFLLDZCQUhaLGNBQWMsbUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsR0FIQTtBQU9DLGlCQUhXLGtCQUdYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztnQ0FINUIsb0JBRzRCOzs7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEcUM7QUFFckMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUZxQztBQUdyQyxlQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FIcUM7QUFJckMsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBTixDQUprQjtBQUtyQyxlQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FMcUM7U0FBdkM7O0FBSFcscUNBV1gscUJBQUssZ0JBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QixDQURtQjs7O0FBWFYscUNBZ0JYLDZCQUFVOztBQWhCQyxxQ0FxQlgsK0JBQVc7QUFDVCxlQUFLLDJCQUFMLEdBRFM7O0FBSVQsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUpSO0FBS1QsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxDQUEzQyxDQUxTO0FBTVQsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxDQUEzQyxDQU5TO0FBT1QsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFpQixhQUFqQixDQVBSO0FBUVQsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFp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
