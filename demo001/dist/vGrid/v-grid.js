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

                grid.collectionChange();
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

          this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);

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
