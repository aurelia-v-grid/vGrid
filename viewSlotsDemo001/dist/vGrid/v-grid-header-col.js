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
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-filter-' + this.colType + '></v-grid-filter-' + this.colType + '>\n          </template>\n          ', this.vGrid.resources);
              break;

            case "single":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-label type="single">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
              break;

            case "filterTop":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-filter-' + this.colType + ' filter-value.two-way="queryString" type="filterTop">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-' + this.colType + '>\n\n            <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
              break;

            case "filterBottom":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-label type="labelTop">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n             <v-grid-filter-' + this.colType + ' filter-value.two-way="queryString" type="filterBottom">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-' + this.colType + '>\n\n          </template>\n          ', this.vGrid.resources);
              break;

            case "noFilterTop":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-label type="blankLabel">\n              <div></div>\n            </v-grid-label>\n\n             <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
              break;

            case "noFilterBottom":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n             <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n            <v-grid-label type="blankLabel">\n              <div></div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
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
            } else {
              markup = "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVztBQUFVOztBQUNwRTs7O29DQVFLLDZCQUhaLGNBQWMsbUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsR0FIQTtBQVdDLGlCQVBXLGtCQU9YLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztnQ0FQNUIsb0JBTzRCOzs7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEcUM7QUFFckMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUZxQztBQUdyQyxlQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FIcUM7QUFJckMsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBTixDQUprQjtBQUtyQyxlQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FMcUM7U0FBdkM7O0FBUFcscUNBbUJYLHFCQUFLLGdCQUFnQjtBQUNuQixlQUFLLGNBQUwsR0FBc0IsY0FBdEIsQ0FEbUI7OztBQW5CVixxQ0EyQlgsNkJBQVU7O0FBM0JDLHFDQW1DWCwrQkFBVztBQUNULGVBQUssMkJBQUwsR0FEUzs7QUFJVCxlQUFLLFNBQUwsR0FBaUIsS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBSlI7QUFLVCxlQUFLLE1BQUwsR0FBYyxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxRQUFMLENBQTNDLENBTFM7QUFNVCxlQUFLLE1BQUwsR0FBYyxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxRQUFMLENBQTNDLENBTlM7QUFPVCxlQUFLLFNBQUwsR0FBaUIsS0FBSyxXQUFMLENBQWlCLGFBQWpCLENBUFI7QUFRVCxlQUFLLFNBQUwsR0FBaUIsS0FBSyxXQUFMLENB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
