'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

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
          var value = this.vGrid.vGridFilter.queryStrings[this.attribute()];
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
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-label type="single">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
              break;

            case "filterTop":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-filter-text filter-value.two-way="queryString" type="filterTop">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-text>\n\n            <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
              break;

            case "filterBottom":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-label type="labelTop">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n             <v-grid-filter-text filter-value.two-way="queryString" type="filterBottom">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-text>\n\n          </template>\n          ', this.vGrid.resources);
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

        VGridCellRowHeader.prototype.colCustomName = function colCustomName() {
          return this.vGrid.vGridConfig.colCustomArray[this.columnNo];
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
              if (this.vGrid.vGridSort.getFilter().length !== 0) {
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

                this.vGrid.vGridFilter.queryStrings[dataSourceAttribute] = queryInputs[i].value;
              } else {
                if (value === "") {
                  this.vGrid.vGridFilter.queryStrings[dataSourceAttribute] = queryInputs[i].value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsb0IscUJBQUEsYztBQUFnQixlLHFCQUFBLFM7QUFBVyxjLHFCQUFBLFE7QUFBVSxjLHFCQUFBLFE7O0FBSXBFLFcsVUFBQSxLOzs7b0NBT0ssa0IsV0FIWixjQUFjLG1CQUFkLEMsVUFDQSxlQUFlLEtBQWYsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixFQUF1QixTQUF2QixDLEVBSEEsTTtBQVdDLG9DQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsU0FBNUIsRUFBdUM7QUFBQTs7QUFBQTs7QUFDckMsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsTUFBTSxXQUF6QjtBQUNBLGVBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNEOztxQ0FNRCxJLGlCQUFLLGMsRUFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0QsUzs7cUNBTUQsTyxzQkFBVSxDQUVULEM7O3FDQU1ELFEsdUJBQVc7QUFDVCxlQUFLLDJCQUFMOztBQUdBLGVBQUssU0FBTCxHQUFpQixLQUFLLFdBQUwsQ0FBaUIsU0FBbEM7QUFDQSxlQUFLLE1BQUwsR0FBYyxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxRQUFsQyxDQUFkO0FBQ0EsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBbEMsQ0FBZDtBQUNBLGVBQUssU0FBTCxHQUFpQixLQUFLLFdBQUwsQ0FBaUIsYUFBbEM7QUFDQSxlQUFLLFNBQUwsR0FBaUIs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QUFkLElBQW1CLEVBQUUsT0FBRixLQUFjLEVBQWpDLElBQXVDLEVBQUUsT0FBRixLQUFjLEVBQXpELEVBQTZEO0FBSTNELGdCQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixnQkFBbkIsQ0FBb0MsTUFBTSxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBL0QsQ0FBbEI7O0FBSUEsZ0JBQUksY0FBYyxFQUFsQjs7QUFHQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFlBQVksTUFBaEMsRUFBd0MsR0FBeEMsRUFBNkM7QUFJM0Msa0JBQUksc0JBQXNCLFlBQVksQ0FBWixFQUFlLFlBQWYsQ0FBNEIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLGFBQWxELENBQTFCO0FBQ0Esa0JBQUksZ0JBQWdCLEtBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsS0FBSyxXQUFMLENBQWlCLGNBQWpCLENBQWdDLE9BQWhDLENBQXdDLG1CQUF4QyxDQUFsQyxDQUFwQjtBQUNBLGtCQUFJLFdBQVcsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxPQUFoQyxDQUF3QyxtQkFBeEMsQ0FBN0IsQ0FBZjtBQUNBLGtCQUFJLFVBQVUsS0FBSyxXQUFMLENBQWlCLFlBQWpCLENBQThCLEtBQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxPQUFoQyxDQUF3QyxtQkFBeEMsQ0FBOUIsQ0FBZDtBQUNBLGtCQUFJLFFBQVEsZ0JBQWdCLGNBQWMsUUFBZCxDQUF1QixZQUFZLENBQVosRUFBZSxLQUF0QyxDQUFoQixHQUErRCxZQUFZLENBQVosRUFBZSxLQUExRjs7QUFJQSxrQkFBSSxZQUFZLFVBQVosSUFBMEIsVUFBVSxNQUFwQyxJQUE4QyxVQUFVLE9BQTVELEVBQXFFO0FBQ25FLHdCQUFRLEVBQVI7QUFDRDs7QUFJRCxrQkFBSSxVQUFVLEVBQVYsSUFBZ0IsVUFBVSxTQUE5QixFQUF5QztBQUl2Qyw0QkFBWSxJQUFaLENBQWlCO0FBQ2YsNkJBQVcsbUJBREk7QUFFZix5QkFBTyxLQUZRO0FBR2YsNEJBQVU7QUFISyxpQkFBakI7O0FBUUEscUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsWUFBdkIsQ0FBb0MsbUJBQXBDLElBQTJELFlBQVksQ0FBWixFQUFlLEtBQTFFO0FBRUQsZUFkRCxNQWNPO0FBR0wsb0JBQUksVUFBVSxFQUFkLEVBQWtCO0FBQ2hCLHVCQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFlBQXZCLENBQW9DLG1CQUFwQyxJQUEyRCxZQUFZLENBQVosRUFBZSxLQUExRTtBQUNEO0FBRUY7QUFHRjtBQUlELGlCQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsV0FBN0I7QUFDRDtBQUdGLFM7OztvRkFuVEEsUSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtaGVhZGVyLWNvbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
