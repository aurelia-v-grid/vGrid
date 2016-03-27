'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable'], function (_export, _context) {
  var noView, processContent, ObserverLocator, customAttribute, bindable, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate, VGridSortable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, VGrid;

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
      noView = _aureliaFramework.noView;
      processContent = _aureliaFramework.processContent;
      ObserverLocator = _aureliaFramework.ObserverLocator;
      customAttribute = _aureliaFramework.customAttribute;
      bindable = _aureliaFramework.bindable;
    }, function (_vGridGenerator) {
      VGridGenerator = _vGridGenerator.VGridGenerator;
    }, function (_vGridFilter) {
      VGridFilter = _vGridFilter.VGridFilter;
    }, function (_vGridSort) {
      VGridSort = _vGridSort.VGridSort;
    }, function (_vGridInterpolate) {
      VGridInterpolate = _vGridInterpolate.VGridInterpolate;
    }, function (_vGridSortable) {
      VGridSortable = _vGridSortable.VGridSortable;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = processContent(false), _dec2 = customAttribute("config"), noView(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
        function VGrid(element, observerLocator, vGridGenerator, vGridFilter, vGridSort, vGridInterpolate) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          this.vGridGenerator = vGridGenerator;
          this.vGridFilter = vGridFilter;
          this.vGridSort = vGridSort;
          this.vGridInterpolate = vGridInterpolate;
          this.observerLocator = observerLocator;
          this.element = element;
          this.currentRow = -1;
          this.currentRowEntity = null;
          this.filterRow = -1;
          this.sgkey = "sgKey" + Math.random() * 100;
          this.gridContextMissing = false;
          this.subscriptionsAttributes = [];
          this.collectionSubscription = null;
          this.collectionFiltered = [];
          this.subscriptionsArray = [];
          this.rowEditMode = false;
          this.rowData = this.element.getElementsByTagName("V-GRID-ROW")[0];
          this.columns = this.rowData.getElementsByTagName("V-GRID-COL");
        }

        VGrid.prototype.enableObservablesCollection = function enableObservablesCollection() {

          var collectionSubscription = this.__observers__.collection.subscribe(this, function (x, y) {
            var _this = this;

            this.disableObservablesArray();

            this.collectionFiltered = this.collection.slice(0);
            this.resetKeys();

            this.vGridSort.reset();
            this.gridContext.ctx.clearHeaderSortFilter();
            this.gridContext.ctx.selection.reset();
            this.gridContext.ctx.collectionChange();

            this.rowEditMode = true;
            for (var k in this.currentEntity) {
              if (this.currentEntity.hasOwnProperty(k)) {
                this.currentEntity[k] = undefined;
              }
            }
            setTimeout(function () {
              _this.rowEditMode = false;
            }, 2000);
            this.currentRow = -1;

            this.enableObservablesArray();
          });
          this.collectionSubscription = this.__observers__.collection;
        };

        VGrid.prototype.resetKeys = function resetKeys() {
          var _this2 = this;

          var key = 0;
          this.collection.forEach(function (row) {
            row[_this2.sgkey] = key;
            key++;
          });
        };

        VGrid.prototype.getSelectionKeys = function getSelectionKeys() {
          var _this3 = this;

          var curSel = this.gridContext.ctx.selection.getSelectedRows();
          var selKeys = [];
          var collectionFiltered = this.collectionFiltered;
          curSel.forEach(function (x) {
            selKeys.push(collectionFiltered[x][_this3.sgkey]);
          });
          return selKeys;
        };

        VGrid.prototype.setSelectionFromKeys = function setSelectionFromKeys(selKeys) {
          var _this4 = this;

          var newSelection = [];
          var count = 0;
          this.collectionFiltered.forEach(function (x) {
            if (selKeys.indexOf(x[_this4.sgkey]) !== -1) {
              newSelection.push(count);
            }
            count++;
          });
          this.gridContext.ctx.selection.setSelectedRows(newSelection);
        };

        VGrid.prototype.enableObservablesArray = function enableObservablesArray() {
          var _this5 = this;

          var arrayObserver = this.observerLocator.getArrayObserver(this.collection);
          arrayObserver.subscribe(function (changes) {

            var result = changes[0];
            var colFiltered = _this5.collectionFiltered;
            var col = _this5.collection;
            var grid = _this5.gridContext.ctx;

            var selKeys = _this5.getSelectionKeys();

            if (result) {
              try {
                if (result.addedCount > 0) {
                  col.forEach(function (x) {
                    if (x[_this5.sgkey] === undefined) {
                      colFiltered.push(x);
                    }
                  });
                }

                if (result.removed.length > 0) {
                  var toRemove = [];
                  result.removed.forEach(function (x) {
                    toRemove.push(x[_this5.sgkey]);
                  });

                  var i = colFiltered.length - 1;
                  while (i !== -1) {
                    if (toRemove.indexOf(colFiltered[i][_this5.sgkey]) !== -1) {
                      var x = colFiltered.splice(i, 1);
                      var selKey = selKeys.indexOf(x[0][_this5.sgkey]);

                      if (selKey !== -1) {
                        selKeys.splice(selKey, 1);
                      }
                    }
                    i--;
                  }
                }

                _this5.setSelectionFromKeys(selKeys);

                _this5.resetKeys();

                grid.collectionChange(true);
              } catch (e) {
                console.error("error, should not happend anymore");
              }
            }
          });
          this.subscriptionsArray = arrayObserver;
        };

        VGrid.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
          var _this6 = this;

          this.gridOptions.attributeArray.forEach(function (property) {
            var propertyObserver = _this6.observerLocator.getObserver(_this6.currentEntity, property);
            propertyObserver.subscribe(function (newValue, oldValue) {
              if (newValue !== oldValue) {
                if (!_this6.rowEditMode) {
                  _this6.currentRowEntity[property] = newValue;
                  _this6.gridContext.ctx.updateRow(_this6.filterRow);
                }
              }
            });
            _this6.subscriptionsAttributes.push(propertyObserver);
          });
        };

        VGrid.prototype.bind = function bind(parent) {
          this.$parent = parent;

          if (!this.gridContext) {
            this.gridContext = {};
            this.gridContextMissing = true;
          }

          this.collectionFiltered = this.collection.slice(0);

          this.resetKeys();
        };

        VGrid.prototype.disableObservablesCollection = function disableObservablesCollection() {
          this.collectionSubscription.unsubscribe();
          this.collectionSubscription = null;
        };

        VGrid.prototype.disableObservablesArray = function disableObservablesArray() {
          this.subscriptionsArray.unsubscribe();
          this.subscriptionsArray = null;
        };

        VGrid.prototype.disableObservablesAttributes = function disableObservablesAttributes() {
          for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
            try {
              this.subscriptionsAttributes[i].unsubscribe();
            } catch (e) {}
          }
          this.subscriptionsAttributes = [];
        };

        VGrid.prototype.attached = function attached() {
          var _this7 = this;

          var gridOptions = {};

          if (!this.rowData) {
            throw "error, you need to add the row for the grid to work atm";
          }
          if (this.gridContextMissing && !this.rowData) {
            throw "grid needs context under config attributes, or row element";
          }

          this.rowData.style.display = "none";

          var type = {
            "true": true,
            "false": false
          };

          if (this.columns.length === 0) {
            gridOptions.columnWidthArrayOverride = true;

            gridOptions.onRowMarkupCreate = function () {
              return _this7.rowData.innerHTML;
            };

            gridOptions.attributeArray = this.element.getAttribute("attibutes-used").split(",");
          } else {
            gridOptions.attributeArray = [];
            gridOptions.columnWidthArray = [];
            gridOptions.headerArray = [];
            gridOptions.filterArray = [];
            gridOptions.readOnlyArray = [];
            gridOptions.colStyleArray = [];

            for (var i = 0; i < this.columns.length; i++) {
              gridOptions.attributeArray.push(this.columns[i].getAttribute("attribute"));
              gridOptions.columnWidthArray.push(this.columns[i].getAttribute("col-width"));
              gridOptions.headerArray.push(this.columns[i].getAttribute("header") || "");
              gridOptions.colStyleArray.push(this.columns[i].getAttribute("col-css") || "");
              gridOptions.filterArray.push(this.columns[i].getAttribute("default-filter") || "?");
              gridOptions.readOnlyArray.push(this.columns[i].getAttribute("read-only") === "true" ? this.columns[i].getAttribute("attribute") : false);
            }

            gridOptions.attributeArray = this.gridContext.attributeArray || gridOptions.attributeArray;
            gridOptions.columnWidthArray = this.gridContext.columnWidthArray || gridOptions.columnWidthArray;
            gridOptions.headerArray = this.gridContext.headerArray || gridOptions.headerArray;
            gridOptions.filterArray = this.gridContext.filterArray || gridOptions.filterArray;
            gridOptions.readOnlyArray = this.gridContext.readOnlyArray || gridOptions.readOnlyArray;
            gridOptions.colStyleArray = this.gridContext.colStyleArray || gridOptions.colStyleArray;
          }

          gridOptions.rowHeight = this.gridContext.rowHeight || parseInt(this.element.getAttribute("row-height"));
          gridOptions.headerHeight = this.gridContext.headerHeight || parseInt(this.element.getAttribute("header-height"));
          gridOptions.footerHeight = this.gridContext.footerHeight || parseInt(this.element.getAttribute("footer-height"));
          gridOptions.isResizableHeaders = this.gridContext.resizableHeaders || type[this.element.getAttribute("resizable-headers")];
          gridOptions.isMultiSelect = this.gridContext.multiSelect || type[this.element.getAttribute("multi-select")];
          gridOptions.isSortableHeader = this.gridContext.sortableHeader || type[this.element.getAttribute("sortable-headers")];
          gridOptions.requestAnimationFrame = this.gridContext.requestAnimationFrame || type[this.element.getAttribute("request-animation-frame")];
          gridOptions.resizableHeadersAndRows = this.gridContext.resizeAlsoRows || type[this.element.getAttribute("resize-also-rows")];
          gridOptions.renderOnScrollbarScroll = this.gridContext.renderOnScrollbarScroll || type[this.element.getAttribute("render-on-scrollbar-scroll")];
          gridOptions.lockedColumns = this.gridContext.lockedColumns || parseInt(this.element.getAttribute("locked-columns"));
          gridOptions.addFilter = this.gridContext.headerFilter || type[this.element.getAttribute("header-filter")];
          gridOptions.filterOnAtTop = this.gridContext.headerFilterTop || type[this.element.getAttribute("header-filter-top")];
          gridOptions.filterOnKey = this.gridContext.headerFilterOnkeydown || type[this.element.getAttribute("header-filter-onkeydown")];
          gridOptions.sortOnHeaderClick = this.gridContext.sortOnHeaderClick || type[this.element.getAttribute("sort-on-header-click")];

          if (this.element.getAttribute("header-filter-not-to")) {
            gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo || this.element.getAttribute("header-filter-not-to").split(",");
          } else {
            gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo || [];
          }

          if (gridOptions.addFilter) {
            gridOptions.onFilterRun = function (filterObj) {
              var selKeys = _this7.getSelectionKeys();

              _this7.collectionFiltered = _this7.vGridFilter.run(_this7.collection, filterObj);
              _this7.vGridSort.run(_this7.collectionFiltered);

              _this7.setSelectionFromKeys(selKeys);
              _this7.gridContext.ctx.collectionChange(true);
              _this7.rowEditMode = true;
              for (var k in _this7.currentEntity) {
                if (_this7.currentEntity.hasOwnProperty(k)) {
                  _this7.currentEntity[k] = undefined;
                }
              }
              setTimeout(function () {
                _this7.rowEditMode = false;
              }, 500);
            };
          }

          gridOptions.getFilterName = function (name) {
            return _this7.vGridFilter.getNameOfFilter(name);
          };

          gridOptions.getDataElement = function (row, isDown, isLargeScroll, callback) {
            if (_this7.gridContext.onRowDraw) {
              _this7.gridContext.onRowDraw(_this7.collectionFiltered[row]);
              callback(_this7.collectionFiltered[row]);
            } else {
              callback(_this7.collectionFiltered[row]);
            }
          };

          gridOptions.onOrderBy = function (event, setheaders) {
            var attribute = event.target.getAttribute("v-grid-data-attribute");
            if (attribute === null) {
              attribute = event.target.offsetParent.getAttribute("v-grid-data-attribute");
            }

            if (_this7.collectionFiltered.length > 0 && attribute) {
              _this7.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this7.vGridSort.getFilter());

              var selKeys = _this7.getSelectionKeys();

              _this7.vGridSort.run(_this7.collectionFiltered);

              _this7.setSelectionFromKeys(selKeys);
              _this7.gridContext.ctx.collectionChange();
              _this7.gridContext.ctx.collectionChange();

              _this7.rowEditMode = true;
              for (var k in _this7.currentEntity) {
                if (_this7.currentEntity.hasOwnProperty(k)) {
                  _this7.currentEntity[k] = undefined;
                }
              }
              setTimeout(function () {
                _this7.rowEditMode = false;
              }, 500);
            }
          };

          gridOptions.clickHandler = function (event, row, cellEditHelper) {

            var isDoubleClick = event.type === "dblclick";
            var attribute = event.target.getAttribute("v-grid-data-attribute");
            var readonly = _this7.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

            _this7.filterRow = row;

            _this7.currentRowEntity = _this7.collectionFiltered[row];

            _this7.rowEditMode = true;

            var data = _this7.currentRowEntity;
            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                _this7.currentEntity[k] = data[k];
              }
            }

            if (isDoubleClick) {
              cellEditHelper(event, readonly, function (obj) {
                this.rowEditMode = false;

                this.currentRowEntity[obj.attribute] = obj.value;
                this.currentEntity[obj.attribute] = obj.value;
              }.bind(_this7));
            } else {
              setTimeout(function () {
                this.rowEditMode = false;
              }.bind(_this7), 500);
            }
          };

          gridOptions.getSourceLength = function () {
            if (gridOptions.addFilter) {
              return _this7.collectionFiltered.length;
            } else {
              return _this7.collection.length;
            }
          };

          this.gridOptions = gridOptions;

          this.enableObservablesCollection();
          this.enableObservablesArray();
          this.enableObservablesAttributes();

          this.gridContext.ctx = new this.vGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);

          this.gridContext.ctx.getSelectionKeys = function () {
            return this.getSelectionKeys();
          }.bind(this.$parent);

          this.gridContext.ctx.setSelectionFromKeys = function (x) {
            this.setSelectionFromKeys(x);
          }.bind(this.$parent);
        };

        VGrid.prototype.detached = function detached() {
          this.disableObservablesAttributes();
          this.disableObservablesCollection();
          this.disableObservablesArray();
        };

        return VGrid;
      }(), _class3.inject = [Element, ObserverLocator, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'gridContext', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'collection', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'currentEntity', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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R0FBb0MsSUFBSSxLQUFKLENBUFM7ZUFBZixDQVM5QixJQVQ4QixRQUFoQyxFQUhpQjthQUFuQixNQWNPO0FBR0wseUJBQVcsWUFBWTtBQUNyQixxQkFBSyxXQUFMLEdBQW1CLEtBQW5CLENBRHFCO2VBQVosQ0FFVCxJQUZTLFFBQVgsRUFFYyxHQUZkLEVBSEs7YUFkUDtXQXZCMEIsQ0EzTm5COztBQWtSVCxzQkFBWSxlQUFaLEdBQStCLFlBQU87QUFDcEMsZ0JBQUksWUFBWSxTQUFaLEVBQXVCO0FBQ3pCLHFCQUFPLE9BQUssa0JBQUwsQ0FBd0IsTUFBeEIsQ0FEa0I7YUFBM0IsTUFFTztBQUNMLHFCQUFPLE9BQUssVUFBTCxDQUFnQixNQUFoQixDQURGO2FBRlA7V0FENkIsQ0FsUnRCOztBQWdTVCxlQUFLLFdBQUwsR0FBbUIsV0FBbkIsQ0FoU1M7O0FBbVNULGVBQUssMkJBQUwsR0FuU1M7QUFvU1QsZUFBSyxzQkFBTCxHQXBTUztBQXFTVCxlQUFLLDJCQUFMLEdBclNTOztBQTRTVCxlQUFLLFdBQUwsQ0FBaUIsR0FBakIsR0FBdUIsSUFBSSxLQUFLLGNBQUwsQ0FBb0IsV0FBeEIsRUFBcUMsS0FBSyxnQkFBTCxFQUF1QixLQUFLLE9BQUwsRUFBYyxLQUFLLE9BQUwsRUFBYyxhQUF4RixDQUF2QixDQTVTUzs7QUErU1QsZUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGdCQUFyQixHQUF3QyxZQUFZO0FBRWxELG1CQUFPLEtBQUssZ0JBQUwsRUFBUCxDQUZrRDtXQUFaLENBR3RDLElBSHNDLENBR2pDLEtBQUssT0FBTCxDQUhQLENBL1NTOztBQXFUVCxlQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsb0JBQXJCLEdBQTRDLFVBQVMsQ0FBVCxFQUFXO0FBRXJELGlCQUFLLG9CQUFMLENBQTBCLENBQTFCLEVBRnFEO1dBQVgsQ0FHMUMsSUFIMEMsQ0FHckMsS0FBSyxPQUFMLENBSFAsQ0FyVFM7OztBQXhTQSx3QkEwbUJYLCtCQUFXO0FBQ1QsZUFBSyw0QkFBTCxHQURTO0FBRVQsZUFBSyw0QkFBTCxHQUZTO0FBR1QsZUFBSyx1QkFBTCxHQUhTOzs7ZUExbUJBO21CQUNKLFNBQVMsQ0FBQyxPQUFELEVBQVUsZUFBVixFQUEyQixjQUEzQixFQUEyQyxXQUEzQyxFQUF3RCxTQUF4RCxFQUFtRSxnQkFBbkUsdUZBQ2Y7OztxRkFDQTs7O3dGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
