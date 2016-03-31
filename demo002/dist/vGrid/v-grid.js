'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable', './v-grid-cell-edit'], function (_export, _context) {
  var noView, processContent, ObserverLocator, customAttribute, bindable, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate, VGridSortable, VGridCellEdit, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, VGrid;

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
    }, function (_vGridCellEdit) {
      VGridCellEdit = _vGridCellEdit.VGridCellEdit;
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
          this.cellEdit = new VGridCellEdit(this);
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

            var curKey = -1;
            if (_this4.currentRowEntity) {
              curKey = _this4.currentRowEntity[_this4.sgkey];
            }
            var curEntityValid = true;

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
                  if (toRemove.indexOf(curKey) !== -1) {
                    curEntityValid = false;
                  }

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

              if (!curEntityValid) {
                for (var k in _this4.currentEntity) {
                  if (_this4.currentEntity.hasOwnProperty(k)) {
                    _this4.currentEntity[k] = undefined;
                    _this4.skipNextUpdateProperty.push(k);
                  }
                }
              } else {
                var newRowNo = -1;
                if (curKey) {
                  _this4.collectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this4.sgkey]) {
                      newRowNo = index;
                    }
                  });
                }
              }

              _this4.setSelectionFromKeys(selKeys);

              _this4.resetKeys();

              if (newRowNo > -1) {
                _this4.currentRowEntity = _this4.collectionFiltered[newRowNo];
                _this4.currentEntity[_this4.sgkey] = _this4.currentRowEntity[_this4.sgkey];
                _this4.filterRow = newRowNo;
              }

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
                  _this5.gridContext.ctx.updateRow(_this5.filterRow, true);
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

              if (filterObj.length !== 0 || _this6.collectionFiltered.length !== _this6.collection.length) {

                if (filterObj.length === 0 && _this6.collectionFiltered.length !== _this6.collection.length) {
                  _this6.collectionFiltered = _this6.collection.slice(0);
                } else {
                  var selKeys = _this6.getSelectionKeys();
                  var curKey = -1;
                  if (_this6.currentRowEntity) {
                    curKey = _this6.currentRowEntity[_this6.sgkey];
                  }

                  _this6.collectionFiltered = _this6.vGridFilter.run(_this6.collection, filterObj);
                  _this6.vGridSort.run(_this6.collectionFiltered);

                  _this6.setSelectionFromKeys(selKeys);

                  var newRowNo = -1;
                  if (curKey) {
                    _this6.collectionFiltered.forEach(function (x, index) {
                      if (curKey === x[_this6.sgkey]) {
                        newRowNo = index;
                      }
                    });
                  }

                  if (newRowNo > -1) {
                    _this6.currentRowEntity = _this6.collectionFiltered[newRowNo];
                    _this6.currentEntity[_this6.sgkey] = _this6.currentRowEntity[_this6.sgkey];
                    _this6.filterRow = newRowNo;
                  }
                }

                _this6.gridContext.ctx.collectionChange(true);
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

              _this6.collectionFiltered.forEach(function (x, index) {
                if (_this6.currentEntity[_this6.sgkey] === x[_this6.sgkey]) {
                  _this6.filterRow = index;
                }
              });
            }
          };

          gridOptions.clickHandler = function (event, row) {

            var isDoubleClick = true;
            var attribute = event.target.getAttribute("v-grid-data-attribute");
            var readonly = _this6.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

            _this6.filterRow = row;

            _this6.currentRowEntity = _this6.collectionFiltered[row];

            var data = _this6.currentRowEntity;
            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                if (_this6.currentEntity[k] !== data[k]) {
                  _this6.currentEntity[k] = data[k];
                  _this6.skipNextUpdateProperty.push(k);
                }
              }
            }

            if (isDoubleClick) {
              _this6.cellEdit.editCellhelper(event, readonly, function (obj) {
                _this6.currentRowEntity[obj.attribute] = obj.value;
                _this6.currentEntity[obj.attribute] = obj.value;
                _this6.gridContext.ctx.updateRow(_this6.filterRow, true);
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
