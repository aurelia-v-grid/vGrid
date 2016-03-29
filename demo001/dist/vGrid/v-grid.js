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
        function VGrid(element, observerLocator, vGridFilter, vGridSort, vGridInterpolate) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          this.vGridFilter = vGridFilter;
          this.vGridSort = vGridSort;
          this.vGridInterpolate = vGridInterpolate;
          this.observerLocator = observerLocator;
          this.element = element;
          this.currentRowEntity = null;
          this.filterRow = -1;
          this.scrollBottomNext = false;
          this.sgkey = "sgKey" + Math.floor(Math.random() * 1000 + 1);
          this.gridContextMissing = false;
          this.subscriptionsAttributes = [];
          this.collectionSubscription = null;
          this.collectionFiltered = [];
          this.subscriptionsArray = [];
          this.rowEditMode = false;
          this.skipNextUpdateProperty = [];
          this.rowData = this.element.getElementsByTagName("V-GRID-ROW")[0];
          this.columns = this.rowData.getElementsByTagName("V-GRID-COL");
        }

        VGrid.prototype.enableObservablesCollection = function enableObservablesCollection() {

          var collectionSubscription = this.__observers__.collection.subscribe(this, function (x, y) {
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
                this.skipNextUpdateProperty.push(k);
              }
            }

            this.enableObservablesArray();
          });
          this.collectionSubscription = this.__observers__.collection;
        };

        VGrid.prototype.resetKeys = function resetKeys() {
          var _this = this;

          var key = 0;
          this.collection.forEach(function (row) {
            row[_this.sgkey] = key;
            key++;
          });
        };

        VGrid.prototype.getSelectionKeys = function getSelectionKeys() {
          var _this2 = this;

          var curSel = this.gridContext.ctx.selection.getSelectedRows();
          var selKeys = [];
          var collectionFiltered = this.collectionFiltered;
          curSel.forEach(function (x) {
            selKeys.push(collectionFiltered[x][_this2.sgkey]);
          });
          return selKeys;
        };

        VGrid.prototype.setSelectionFromKeys = function setSelectionFromKeys(selKeys) {
          var _this3 = this;

          var newSelection = [];
          var count = 0;
          this.collectionFiltered.forEach(function (x) {
            if (selKeys.indexOf(x[_this3.sgkey]) !== -1) {
              newSelection.push(count);
            }
            count++;
          });
          this.gridContext.ctx.selection.setSelectedRows(newSelection);
        };

        VGrid.prototype.enableObservablesArray = function enableObservablesArray() {
          var _this4 = this;

          var arrayObserver = this.observerLocator.getArrayObserver(this.collection);
          arrayObserver.subscribe(function (changes) {

            var result = changes[0];
            var colFiltered = _this4.collectionFiltered;
            var col = _this4.collection;
            var grid = _this4.gridContext.ctx;

            var selKeys = _this4.getSelectionKeys();

            if (result) {
              if (result.addedCount > 0) {
                col.forEach(function (x) {
                  if (x[_this4.sgkey] === undefined) {
                    colFiltered.push(x);
                  }
                });
              }

              if (result.removed.length > 0) {
                var toRemove = [];
                result.removed.forEach(function (x) {
                  toRemove.push(x[_this4.sgkey]);
                });

                var i = colFiltered.length - 1;
                while (i !== -1) {
                  if (toRemove.indexOf(colFiltered[i][_this4.sgkey]) !== -1) {
                    var x = colFiltered.splice(i, 1);
                    var selKey = selKeys.indexOf(x[0][_this4.sgkey]);

                    if (selKey !== -1) {
                      selKeys.splice(selKey, 1);
                    }
                  }
                  i--;
                }
              }

              _this4.setSelectionFromKeys(selKeys);

              _this4.resetKeys();

              grid.collectionChange(false, _this4.scrollBottomNext);
            }
          });
          this.subscriptionsArray = arrayObserver;
        };

        VGrid.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
          var _this5 = this;

          this.gridOptions.attributeArray.forEach(function (property) {
            var propertyObserver = _this5.observerLocator.getObserver(_this5.currentEntity, property);
            propertyObserver.subscribe(function (newValue, oldValue) {
              if (newValue !== oldValue) {
                if (_this5.skipNextUpdateProperty.indexOf(property) === -1) {
                  _this5.currentRowEntity[property] = newValue;
                  _this5.gridContext.ctx.updateRow(_this5.filterRow, _this5);
                } else {
                  _this5.skipNextUpdateProperty.splice(_this5.skipNextUpdateProperty.indexOf(property), 1);
                }
              }
            });
            _this5.subscriptionsAttributes.push(propertyObserver);
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
          var _this6 = this;

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

          var setValue = function setValue(contextValue, htmlAttributeValue, defaultValue) {
            var value = defaultValue;
            if (contextValue !== undefined && contextValue !== null) {
              value = contextValue;
            } else {
              if (htmlAttributeValue !== undefined && htmlAttributeValue !== null) {
                value = htmlAttributeValue;
              }
            }
            return value;
          };

          if (this.columns.length === 0) {
            gridOptions.columnWidthArrayOverride = true;

            gridOptions.onRowMarkupCreate = function () {
              return _this6.rowData.innerHTML;
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

          gridOptions.rowHeight = setValue(this.gridContext.rowHeight, parseInt(this.element.getAttribute("row-height")), 50);
          gridOptions.headerHeight = setValue(this.gridContext.headerHeight, parseInt(this.element.getAttribute("header-height")), 0);
          gridOptions.footerHeight = setValue(this.gridContext.footerHeight, parseInt(this.element.getAttribute("footer-height")), 0);
          gridOptions.isResizableHeaders = setValue(this.gridContext.resizableHeaders, type[this.element.getAttribute("resizable-headers")], false);
          gridOptions.isMultiSelect = setValue(this.gridContext.multiSelect, type[this.element.getAttribute("multi-select")], undefined);
          gridOptions.isSortableHeader = setValue(this.gridContext.sortableHeader, type[this.element.getAttribute("sortable-headers")], false);
          gridOptions.requestAnimationFrame = setValue(this.gridContext.requestAnimationFrame, type[this.element.getAttribute("request-animation-frame")], true);
          gridOptions.resizableHeadersAndRows = setValue(this.gridContext.resizeAlsoRows, type[this.element.getAttribute("resize-also-rows")], false);
          gridOptions.renderOnScrollbarScroll = setValue(this.gridContext.renderOnScrollbarScroll, type[this.element.getAttribute("render-on-scrollbar-scroll")], true);
          gridOptions.lockedColumns = setValue(this.gridContext.lockedColumns, parseInt(this.element.getAttribute("locked-columns")), 0);
          gridOptions.addFilter = setValue(this.gridContext.headerFilter, type[this.element.getAttribute("header-filter")], false);
          gridOptions.filterOnAtTop = setValue(this.gridContext.headerFilterTop, type[this.element.getAttribute("header-filter-top")], false);
          gridOptions.filterOnKey = setValue(this.gridContext.headerFilterOnkeydown, type[this.element.getAttribute("header-filter-onkeydown")], false);
          gridOptions.sortOnHeaderClick = setValue(this.gridContext.sortOnHeaderClick, type[this.element.getAttribute("sort-on-header-click")], false);

          if (this.element.getAttribute("header-filter-not-to")) {
            gridOptions.doNotAddFilterTo = this.element.getAttribute("header-filter-not-to").split(",");
          } else {
            if (this.gridContext.headerFilterNotTo) {
              gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo.split(",");
            } else {
              gridOptions.doNotAddFilterTo = [];
            }
          }

          if (gridOptions.addFilter) {
            gridOptions.onFilterRun = function (filterObj) {
              var selKeys = _this6.getSelectionKeys();

              _this6.collectionFiltered = _this6.vGridFilter.run(_this6.collection, filterObj);
              _this6.vGridSort.run(_this6.collectionFiltered);

              _this6.setSelectionFromKeys(selKeys);
              _this6.gridContext.ctx.collectionChange(true);

              for (var k in _this6.currentEntity) {
                if (_this6.currentEntity.hasOwnProperty(k)) {
                  _this6.currentEntity[k] = undefined;
                  _this6.skipNextUpdateProperty.push(k);
                }
              }
            };
          }

          gridOptions.getFilterName = function (name) {
            return _this6.vGridFilter.getNameOfFilter(name);
          };

          gridOptions.getDataElement = function (row, isDown, isLargeScroll, callback) {
            if (_this6.gridContext.onRowDraw) {
              _this6.gridContext.onRowDraw(_this6.collectionFiltered[row]);
              callback(_this6.collectionFiltered[row]);
            } else {
              callback(_this6.collectionFiltered[row]);
            }
          };

          gridOptions.onOrderBy = function (event, setheaders) {
            var attribute = event.target.getAttribute("v-grid-data-attribute");
            if (attribute === null) {
              attribute = event.target.offsetParent.getAttribute("v-grid-data-attribute");
            }

            if (_this6.collectionFiltered.length > 0 && attribute) {
              _this6.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this6.vGridSort.getFilter());

              var selKeys = _this6.getSelectionKeys();

              _this6.vGridSort.run(_this6.collectionFiltered);

              _this6.setSelectionFromKeys(selKeys);
              _this6.gridContext.ctx.collectionChange();

              for (var k in _this6.currentEntity) {
                if (_this6.currentEntity.hasOwnProperty(k)) {
                  _this6.currentEntity[k] = undefined;
                  _this6.skipNextUpdateProperty.push(k);
                }
              }
            }
          };

          gridOptions.clickHandler = function (event, row, cellEditHelper) {

            var isDoubleClick = event.type === "dblclick";
            var attribute = event.target.getAttribute("v-grid-data-attribute");
            var readonly = _this6.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

            _this6.filterRow = row;

            _this6.currentRowEntity = _this6.collectionFiltered[row];

            var data = _this6.currentRowEntity;
            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                _this6.currentEntity[k] = data[k];
                _this6.skipNextUpdateProperty.push(k);
              }
            }

            if (isDoubleClick) {
              cellEditHelper(event, readonly, function (obj) {
                _this6.currentRowEntity[obj.attribute] = obj.value;
                _this6.currentEntity[obj.attribute] = obj.value;
              }, function (obj) {
                _this6.skipNextUpdateProperty.push(obj.attribute);

                _this6.currentRowEntity[obj.attribute] = obj.value;
                _this6.currentEntity[obj.attribute] = obj.value;
              });
            }
          };

          gridOptions.getSourceLength = function () {
            if (gridOptions.addFilter) {
              return _this6.collectionFiltered.length;
            } else {
              return _this6.collection.length;
            }
          };

          this.gridOptions = gridOptions;

          this.enableObservablesCollection();
          this.enableObservablesArray();
          this.enableObservablesAttributes();

          this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);

          this.gridContext.ctx.getSelectionKeys = function () {
            return _this6.getSelectionKeys();
          };

          this.gridContext.ctx.setSelectionFromKeys = function (x) {
            _this6.setSelectionFromKeys(x);
          };

          this.gridContext.ctx.scrollBottomNext = function () {
            _this6.scrollBottomNext = true;
          };
        };

        VGrid.prototype.detached = function detached() {
          this.disableObservablesAttributes();
          this.disableObservablesCollection();
          this.disableObservablesArray();
        };

        return VGrid;
      }(), _class3.inject = [Element, ObserverLocator, VGridFilter, VGridSort, VGridInterpolate], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'gridContext', [bindable], {
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
//# sourceMappingURL=data:application/json;base64,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
