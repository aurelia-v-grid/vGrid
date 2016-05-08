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
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-filter-' + this.colType + ' filter-value.bind="queryString" type="filterTop">\n            \n            </v-grid-filter-' + this.colType + '>\n          </template>\n          ', this.vGrid.resources);
              break;
            case "single":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-label type="single">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n          </template>\n          ', this.vGrid.resources);
              break;
            case "filterTop":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-filter-' + this.colType + ' filter-value.bind="queryString" type="filterTop">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-' + this.colType + '>\n            <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n          </template>\n          ', this.vGrid.resources);
              break;
            case "filterBottom":
              var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-label type="labelTop">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n             <v-grid-filter-' + this.colType + ' filter-value.bind="queryString" type="filterBottom">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-' + this.colType + '>\n          </template>\n          ', this.vGrid.resources);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVztBQUFVOztBQUNwRTs7O29DQVFLLDZCQUhaLGNBQWMsbUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsR0FIQTtBQU9DLGlCQUhXLGtCQUdYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztnQ0FINUIsb0JBRzRCOzs7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEcUM7QUFFckMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUZxQztBQUdyQyxlQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FIcUM7QUFJckMsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBTixDQUprQjtBQUtyQyxlQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FMcUM7U0FBdkM7O0FBSFcscUNBV1gscUJBQUssZ0JBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QixDQURtQjs7O0FBWFYscUNBZ0JYLDZCQUFVOztBQWhCQyxxQ0FxQlgsK0JBQVc7QUFDVCxlQUFLLDJCQUFMLEdBRFM7O0FBSVQsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQUpSO0FBS1QsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxDQUEzQyxDQUxTO0FBTVQsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxDQUEzQyxDQU5TO0FBT1QsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFpQixhQUFqQixDQVBSO0FBUVQsZUFBSyxTQUFMLEdBQWlCLEtBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsT0FBbEMsQ0FBMEMsS0FBSyxTQUFMLEVBQTFDLENBQWpCLENBUlM7QUFTVCxlQUFLLFVBQUwsR0FBa0IsS0FBSyxXQUFMLENBQWlCLGFBQWpCLENBQStCLEtBQUssTUFBTCxDQUFqRCxDQVRTO0FBVVQsZUFBSyxPQUFMLEdBQWUsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixZQUF2QixDQUFvQyxLQUFLLFFBQUwsQ0FBbkQsQ0FWUztBQVdULGNBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGdCQUExQixDQUEyQyxLQUFLLFNBQUwsRUFBM0MsQ0FBUixDQVhLO0FBWVQsY0FBSSxLQUFKLEVBQVc7QUFDVCxpQkFBSyxXQUFMLEdBQW1CLEtBQW5CLENBRFM7V0FBWDs7QUFLQSxjQUFJLFdBQVcsS0FBSyxpQkFBTCxDQUF1QixLQUFLLFNBQUwsRUFBdkIsQ0FBWCxDQWpCSzs7QUFtQlQsY0FBSSxPQUFPLFFBQVAsQ0FuQks7QUFvQlQsY0FBSSxLQUFLLFNBQUwsRUFBZ0I7QUFDbEIsbUJBQU8sV0FBUCxDQURrQjtBQUVsQixnQkFBSSxDQUFDLEtBQUssU0FBTCxFQUFnQjtBQUNuQixxQkFBTyxjQUFQLENBRG1CO0FBRW5CLGtCQUFJLEtBQUssU0FBTCxLQUFtQixDQUFDLENBQUQsRUFBSTtBQUN6Qix1QkFBTyxnQkFBUCxDQUR5QjtlQUEzQjthQUZGLE1BS087QUFDTCxrQkFBSSxLQUFLLFNBQUwsS0FBbUIsQ0FBQyxDQUFELEVBQUk7QUFDekIsdUJBQU8sYUFBUCxDQUR5QjtlQUEzQjthQU5GO1dBRkY7O0FBY0EsY0FBRyxLQUFLLE9BQUwsS0FBaUIsV0FBakIsRUFBNkI7QUFDOUIsbUJBQU8sV0FBUCxDQUQ4QjtXQUFoQzs7QUFJQSxlQUFLLElBQUwsR0FBWSxJQUFaLENBdENTOztBQXlDVCxrQkFBUSxJQUFSO0FBQ0UsaUJBQUssV0FBTDtBQUNFLGtCQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixPQUF4Qix5REFFRyxLQUFLLE9BQUwsc0dBRUMsS0FBSyxPQUFMLHlDQUpKLEVBTWIsS0FBSyxLQUFMLENBQVcsU0FBWCxDQU5ELENBRE47QUFRRSxvQkFSRjtBQURGLGlCQVVPLFFBQUw7QUFDRSxrQkFBSSxjQUFjLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsT0FBeEIsMkZBR0wsS0FBSyxNQUFMLEdBQWMsbUZBSFQsRUFNYixLQUFLLEtBQUwsQ0FBVyxTQUFYLENBTkQsQ0FETjtBQVFFLG9CQVJGO0FBVkYsaUJBbUJPLFdBQUw7QUFDRSxrQkFBSSxjQUFjLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsT0FBeEIseURBRUcsS0FBSyxPQUFMLDhGQUNPLEtBQUssVUFBTCx3Q0FDTixLQUFLLE9BQUwsNkVBRVQsS0FBSyxNQUFMLEdBQWMsbUZBTlQsRUFTYixLQUFLLEtBQUwsQ0FBVyxTQUFYLENBVEQsQ0FETjtBQVdFLG9CQVhGO0FBbkJGLGlCQStCTyxjQUFMO0FBQ0Usa0JBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLE9BQXhCLDZGQUdMLEtBQUssTUFBTCxHQUFjLGlGQUVMLEtBQUssT0FBTCxpR0FDTSxLQUFLLFVBQUwsd0NBQ04sS0FBSyxPQUFMLHlDQVBKLEVBU2IsS0FBSyxLQUFMLENBQVcsU0FBWCxDQVRELENBRE47QUFXRSxvQkFYRjtBQS9CRixpQkEyQ08sYUFBTDtBQUNFLGtCQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixPQUF4Qix1TUFNTCxLQUFLLE1BQUwsR0FBYyxtRkFOVCxFQVNiLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FURCxDQUROO0FBV0Usb0JBWEY7QUEzQ0YsaUJBdURPLGdCQUFMO0FBQ0Usa0JBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLE9BQXhCLGlHQUdMLEtBQUssTUFBTCxHQUFjLHlMQUhULEVBU2IsS0FBSyxLQUFMLENBQVcsU0FBWCxDQVRELENBRE47QUFXRSxvQkFYRjtBQXZERjtBQW9FSSxvQkFERjtBQW5FRixXQXpDUzs7QUFnSFQsY0FBSSxPQUFPLFlBQVksTUFBWixDQUFtQixLQUFLLFNBQUwsQ0FBMUIsQ0FoSEs7QUFpSFQsZUFBSyxRQUFMLEdBQWdCLElBQUksUUFBSixDQUFhLEtBQUssT0FBTCxFQUFjLElBQTNCLENBQWhCLENBakhTO0FBa0hULGVBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsSUFBbEIsRUFsSFM7QUFtSFQsZUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixFQW5IUztBQW9IVCxlQUFLLFFBQUwsQ0FBYyxRQUFkLEdBcEhTOzs7QUFyQkEscUNBK0lYLGlDQUFZO0FBQ1YsaUJBQU8sS0FBSyxXQUFMLENBQWlCLGNBQWpCLENBQWdDLEtBQUssUUFBTCxDQUF2QyxDQURVOzs7QUEvSUQscUNBbUpYLDZCQUFTLE9BQU87QUFFZCxpQkFBTyxLQUFLLGFBQUwsR0FBcUIsS0FBSyxhQUFMLEdBQXFCLFFBQXJCLENBQThCLEtBQTlCLENBQXJCLEdBQTRELEtBQTVELENBRk87OztBQW5KTCxxQ0F3SlgsNkJBQVMsT0FBTztBQUVkLGlCQUFPLEtBQUssYUFBTCxHQUFxQixLQUFLLGFBQUwsR0FBcUIsTUFBckIsQ0FBNEIsS0FBNUIsQ0FBckIsR0FBMEQsS0FBMUQsQ0FGTzs7O0FBeEpMLHFDQTZKWCx5Q0FBZ0I7QUFFZCxpQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxLQUFLLFFBQUwsQ0FBL0MsQ0FGYzs7O0FBN0pMLHFDQW1LWCxxRUFBOEI7QUFDNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsYUFBckIsQ0FBM0IsQ0FENEI7QUFFNUIsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsZUFBckIsR0FBdUMsS0FBSyxRQUFMLENBQWxFLENBRjRCO0FBRzVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFVBQXJCLEdBQWtDLEtBQUssUUFBTCxDQUE3RCxDQUg0QjtBQUk1QixlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBSjRCO0FBSzVCLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsS0FBbkIsR0FBMkIsS0FBSyxXQUFMLENBQWlCLGdCQUFqQixDQUFrQyxLQUFLLFFBQUwsQ0FBbEMsR0FBbUQsSUFBbkQsQ0FMQzs7O0FBbktuQixxQ0E0S1gsK0NBQWtCLFdBQVc7OztBQUMzQixjQUFJLFNBQVMsRUFBVCxDQUR1QjtBQUUzQixjQUFJLE9BQU8sQ0FBUCxDQUZ1Qjs7QUFLM0IsY0FBSSxLQUFLLFdBQUwsQ0FBaUIsU0FBakIsRUFBNEI7QUFDOUIsbUJBQU8sQ0FBUCxDQUQ4QjtXQUFoQztBQUdBLGNBQUksNENBQTBDLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxJQUFoQyxTQUExQyxDQVJ1QjtBQVMzQixjQUFJLHVCQUFxQixrQ0FBNkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFFBQXJCLFNBQWlDLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixjQUFuRixDQVR1QjtBQVUzQixjQUFJLHdCQUFzQixrQ0FBNkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFFBQXJCLFNBQWlDLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUFyQixjQUFwRixDQVZ1Qjs7QUFhM0IsY0FBSSxLQUFLLFdBQUwsQ0FBaUIsZUFBakIsQ0FBaUMsT0FBakMsQ0FBeUMsU0FBekMsTUFBd0QsQ0FBQyxDQUFELEVBQUk7QUFDOUQsZ0NBQWtCLGtDQUE2QixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsUUFBckIsU0FBaUMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQXJCLGNBQWhGLENBRDhEO0FBRTlELGdCQUFJLEtBQUssV0FBTCxDQUFpQixpQkFBakIsRUFBb0M7QUFDdEMsa0JBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxNQUFwQyxLQUErQyxDQUEvQyxFQUFrRDtBQUNwRCxxQkFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixTQUFyQixHQUFpQyxPQUFqQyxDQUF5QyxVQUFDLENBQUQsRUFBTztBQUM5QyxzQkFBSSxFQUFFLFNBQUYsS0FBZ0IsU0FBaEIsRUFBMkI7QUFDN0Isd0JBQUksUUFBUSxFQUFFLEdBQUYsS0FBVSxJQUFWLEdBQWlCLFNBQWpCLEdBQTZCLFVBQTdCLENBRGlCO0FBRTdCLHdCQUFJLGtCQUFnQixrQ0FBNkIsTUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFFBQXJCLFNBQWlDLE1BQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixVQUFyQixHQUFrQyxFQUFFLEVBQUYsY0FBaEgsQ0FGeUI7QUFHN0IsNkJBQVMsT0FBTyxLQUFQLENBSG9CO21CQUEvQjtpQkFEdUMsQ0FBekMsQ0FEb0Q7ZUFBdEQ7YUFERjtXQUZGO0FBY0EsaUJBQU8sTUFBUCxDQTNCMkI7OztBQTVLbEIscUNBOE1YLHVEQUFzQixHQUFHOztBQUV2QixjQUFJLEVBQUUsT0FBRixLQUFjLENBQWQsSUFBbUIsRUFBRSxPQUFGLEtBQWMsRUFBZCxJQUFvQixFQUFFLE9BQUYsS0FBYyxFQUFkLEVBQWtCO0FBRzNELGdCQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixnQkFBbkIsQ0FBb0MsTUFBTSxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FBeEQsQ0FIdUQ7O0FBTTNELGdCQUFJLGNBQWMsRUFBZCxDQU51RDtBQU8zRCxpQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksWUFBWSxNQUFaLEVBQW9CLEdBQXhDLEVBQTZDO0FBRzNDLGtCQUFJLHNCQUFzQixZQUFZLENBQVosRUFBZSxZQUFmLENBQTRCLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixhQUF0QixDQUFsRCxDQUh1QztBQUkzQyxrQkFBSSxnQkFBZ0IsS0FBSyxXQUFMLENBQWlCLGdCQUFqQixDQUFrQyxLQUFLLFdBQUwsQ0FBaUIsY0FBakIsQ0FBZ0MsT0FBaEMsQ0FBd0MsbUJBQXhDLENBQWxDLENBQWhCLENBSnVDO0FBSzNDLGtCQUFJLFdBQVcsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxPQUFoQyxDQUF3QyxtQkFBeEMsQ0FBN0IsQ0FBWCxDQUx1QztBQU0zQyxrQkFBSSxRQUFRLGdCQUFnQixjQUFjLFFBQWQsQ0FBdUIsWUFBWSxDQUFaLEVBQWUsS0FBZixDQUF2QyxHQUErRCxZQUFZLENBQVosRUFBZSxLQUFmLENBTmhDOztBQVMzQyxrQkFBSSxVQUFVLEVBQVYsSUFBZ0IsVUFBVSxTQUFWLEVBQXFCO0FBR3ZDLDRCQUFZLElBQVosQ0FBaUI7QUFDZiw2QkFBVyxtQkFBWDtBQUNBLHlCQUFPLEtBQVA7QUFDQSw0QkFBVSxRQUFWO2lCQUhGLEVBSHVDOztBQVV2QyxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUIsQ0FBMkMsbUJBQTNDLElBQWtFLFlBQVksQ0FBWixFQUFlLEtBQWYsQ0FWM0I7ZUFBekMsTUFXTztBQUVMLG9CQUFJLFVBQVUsRUFBVixFQUFjO0FBQ2hCLHVCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGdCQUExQixDQUEyQyxtQkFBM0MsSUFBa0UsWUFBWSxDQUFaLEVBQWUsS0FBZixDQURsRDtpQkFBbEI7ZUFiRjthQVRGOztBQTZCQSxpQkFBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLFdBQTdCLEVBcEMyRDtXQUE3RDs7O0FBaE5TLHFDQTRQWCxxREFBcUIsR0FBRztBQUN0QixjQUFJLEtBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsS0FBSyxRQUFMLENBQXRDLEVBQXNEO0FBQ3BELGNBQUUsTUFBRixDQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFEb0Q7V0FBdEQsTUFFTztBQUNMLGdCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWQsRUFBa0I7QUFDcEIsZ0JBQUUsTUFBRixDQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFEb0I7YUFBdEI7V0FIRjs7O2VBN1BTO29GQUNWIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
