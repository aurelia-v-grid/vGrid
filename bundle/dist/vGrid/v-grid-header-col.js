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
          var markup = '<span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconSort + '"></span>';

          if (this.vGridConfig.sortNotOnHeader.indexOf(attribute) === -1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsWSxxQkFBQSxNO0FBQVEsWSxxQkFBQSxNO0FBQVEsbUIscUJBQUEsYTtBQUFlLG9CLHFCQUFBLGM7QUFBZ0IsZSxxQkFBQSxTO0FBQVcsYyxxQkFBQSxRO0FBQVUsYyxxQkFBQSxROztBQUNwRSxXLFVBQUEsSzs7O29DQVFLLGtCLFdBSFosY0FBYyxtQkFBZCxDLFVBQ0EsZUFBZSxLQUFmLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsQyxFQUhBLE07QUFPQyxvQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCLFNBQTVCLEVBQXVDO0FBQUE7O0FBQUE7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0EsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBekI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDRDs7cUNBRUQsSSxpQkFBSyxjLEVBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QjtBQUNELFM7O3FDQUdELE8sc0JBQVUsQ0FFVCxDOztxQ0FHRCxRLHVCQUFXO0FBQ1QsZUFBSywyQkFBTDs7QUFHQSxlQUFLLFNBQUwsR0FBaUIsS0FBSyxXQUFMLENBQWlCLFNBQWxDO0FBQ0EsZUFBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBbEMsQ0FBZDtBQUNBLGVBQUssTUFBTCxHQUFjLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixLQUFLLFFBQWxDLENBQWQ7QUFDQSxlQUFLLFNBQUwsR0FBaUIsS0FBSyxXQUFMLENBQWlCLGFBQWxDO0FBQ0EsZUFBSyxTQUFMLEdBQWlCLEtB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QW9DLE1BQU0sS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQS9ELENBQWxCOztBQUdBLGdCQUFJLGNBQWMsRUFBbEI7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFlBQVksTUFBaEMsRUFBd0MsR0FBeEMsRUFBNkM7QUFHM0Msa0JBQUksc0JBQXNCLFlBQVksQ0FBWixFQUFlLFlBQWYsQ0FBNEIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLGFBQWxELENBQTFCO0FBQ0Esa0JBQUksZ0JBQWdCLEtBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsS0FBSyxXQUFMLENBQWlCLGNBQWpCLENBQWdDLE9BQWhDLENBQXdDLG1CQUF4QyxDQUFsQyxDQUFwQjtBQUNBLGtCQUFJLFdBQVcsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxPQUFoQyxDQUF3QyxtQkFBeEMsQ0FBN0IsQ0FBZjtBQUNBLGtCQUFJLFFBQVEsZ0JBQWdCLGNBQWMsUUFBZCxDQUF1QixZQUFZLENBQVosRUFBZSxLQUF0QyxDQUFoQixHQUErRCxZQUFZLENBQVosRUFBZSxLQUExRjs7QUFHQSxrQkFBSSxVQUFVLEVBQVYsSUFBZ0IsVUFBVSxTQUE5QixFQUF5QztBQUd2Qyw0QkFBWSxJQUFaLENBQWlCO0FBQ2YsNkJBQVcsbUJBREk7QUFFZix5QkFBTyxLQUZRO0FBR2YsNEJBQVU7QUFISyxpQkFBakI7O0FBT0EscUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZ0JBQTFCLENBQTJDLG1CQUEzQyxJQUFrRSxZQUFZLENBQVosRUFBZSxLQUFqRjtBQUNELGVBWEQsTUFXTztBQUVMLG9CQUFJLFVBQVUsRUFBZCxFQUFrQjtBQUNoQix1QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUIsQ0FBMkMsbUJBQTNDLElBQWtFLFlBQVksQ0FBWixFQUFlLEtBQWpGO0FBQ0Q7QUFFRjtBQUNGOztBQUVELGlCQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsV0FBN0I7QUFDRDtBQUNGLFM7O3FDQU1ELG9CLGlDQUFxQixDLEVBQUc7QUFDdEIsY0FBSSxLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLEtBQUssUUFBdkMsQ0FBSixFQUFzRDtBQUNwRCxjQUFFLE1BQUYsQ0FBUyxRQUFULENBQWtCLENBQWxCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsZ0JBQUUsTUFBRixDQUFTLFFBQVQsQ0FBa0IsQ0FBbEI7QUFDRDtBQUNGO0FBQ0YsUzs7O29GQXJQQSxRIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1oZWFkZXItY29sLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
