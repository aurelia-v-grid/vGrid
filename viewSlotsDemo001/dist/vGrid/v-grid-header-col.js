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
          this.colType = this.vGrid.vGridConfig.colTypeArray[this.columnNo];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsb0IscUJBQUEsYztBQUFnQixlLHFCQUFBLFM7QUFBVyxjLHFCQUFBLFE7QUFBVSxjLHFCQUFBLFE7O0FBR3BFLFcsVUFBQSxLOzs7b0NBT0ssa0IsV0FIWixjQUFjLG1CQUFkLEMsVUFDQSxlQUFlLEtBQWYsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixFQUF1QixTQUF2QixDLEVBSEEsTTtBQVdDLG9DQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsU0FBNUIsRUFBdUM7QUFBQTs7QUFBQTs7QUFDckMsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsTUFBTSxXQUF6QjtBQUNBLGVBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNEOztxQ0FNRCxJLGlCQUFLLGMsRUFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0QsUzs7cUNBTUQsTyxzQkFBVSxDQUVULEM7O3FDQU1ELFEsdUJBQVc7QUFDVCxlQUFLLDJCQUFMOztBQUdBLGVBQUssU0FBTCxHQUFpQixLQUFLLFdBQUwsQ0FBaUIsU0FBbEM7QUFDQSxlQUFLLE1BQUwsR0FBYyxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxRQUFsQyxDQUFkO0FBQ0EsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBbEMsQ0FBZDtBQUNBLGVBQUssU0FBTCxHQUFpQixLQUFLLFdBQUwsQ0FBaUIsYUFBbEM7QUFDQSxlQUFLLFNBQUwsR0FBaUIs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QSxrQkFBSSxRQUFRLGdCQUFnQixjQUFjLFFBQWQsQ0FBdUIsWUFBWSxDQUFaLEVBQWUsS0FBdEMsQ0FBaEIsR0FBK0QsWUFBWSxDQUFaLEVBQWUsS0FBMUY7O0FBSUEsa0JBQUksWUFBWSxVQUFaLElBQTBCLFVBQVUsTUFBcEMsSUFBOEMsVUFBVSxPQUE1RCxFQUFxRTtBQUNuRSx3QkFBUSxFQUFSO0FBQ0Q7O0FBSUQsa0JBQUksVUFBVSxFQUFWLElBQWdCLFVBQVUsU0FBOUIsRUFBeUM7QUFJdkMsNEJBQVksSUFBWixDQUFpQjtBQUNmLDZCQUFXLG1CQURJO0FBRWYseUJBQU8sS0FGUTtBQUdmLDRCQUFVO0FBSEssaUJBQWpCOztBQVFBLHFCQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFlBQXZCLENBQW9DLG1CQUFwQyxJQUEyRCxZQUFZLENBQVosRUFBZSxLQUExRTtBQUVELGVBZEQsTUFjTztBQUdMLG9CQUFJLFVBQVUsRUFBZCxFQUFrQjtBQUNoQix1QkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixZQUF2QixDQUFvQyxtQkFBcEMsSUFBMkQsWUFBWSxDQUFaLEVBQWUsS0FBMUU7QUFDRDtBQUVGO0FBR0Y7QUFJRCxpQkFBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLFdBQTdCO0FBQ0Q7QUFHRixTOzs7b0ZBM1RBLFEiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jb2wuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
