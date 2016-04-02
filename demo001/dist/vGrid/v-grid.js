'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable', './v-grid-cell-edit', './v-grid-selection'], function (_export, _context) {
  var noView, processContent, ObserverLocator, customAttribute, bindable, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate, VGridSortable, VGridCellEdit, VGridSelection, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, VGrid;

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
    }, function (_vGridSelection) {
      VGridSelection = _vGridSelection.VGridSelection;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = processContent(false), _dec2 = customAttribute("config"), noView(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
        function VGrid(element, observerLocator, vGridFilter, vGridSort, vGridInterpolate) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          this.vGridFilter = vGridFilter;
          this.vGridSelection = new VGridSelection();
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
          this.filterRowDisplaying = true;
        }

        VGrid.prototype.enableObservablesCollection = function enableObservablesCollection() {

          var collectionSubscription = this.__observers__.collection.subscribe(this, function (x, y) {
            this.disableObservablesArray();

            this.collectionFiltered = this.collection.slice(0);
            this.resetKeys();

            this.vGridSort.reset();
            this.gridContext.ctx.clearHeaderSortFilter();
            this.vGridSelection.reset();
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

          var curSel = this.vGridSelection.getSelectedRows();
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
          this.vGridSelection.setSelectedRows(newSelection);
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
              var newRowNo = -1;

              if (!curEntityValid) {
                for (var k in _this4.currentEntity) {
                  if (_this4.currentEntity.hasOwnProperty(k)) {
                    _this4.currentEntity[k] = undefined;
                    _this4.skipNextUpdateProperty.push(k);
                  }
                }
              } else {

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

              _this4.filterRowDisplaying = false;
              if (newRowNo > -1) {
                _this4.currentRowEntity = _this4.collectionFiltered[newRowNo];
                _this4.currentEntity[_this4.sgkey] = _this4.currentRowEntity[_this4.sgkey];
                _this4.filterRow = newRowNo;
                _this4.filterRowDisplaying = true;
              }

              grid.collectionChange(false, _this4.scrollBottomNext);
              if (_this4.filterRowDisplaying) {
                _this4.cellEdit.setBackFocus();
              }
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

                _this5.cellEdit.setBackFocus();
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

          if (this.collection === undefined || this.currentEntity === undefined) {
            if (this.collection === undefined && this.currentEntity === undefined) {
              console.warn("currentEntity & collection not set/binded in config attribute");
            } else {
              if (this.currentEntity === undefined) {
                console.warn("currentEntity not set/binded in config attribute");
              }

              if (this.collection === undefined) {
                console.warn("collection not set/binded in config attribute");
              }
            }
          } else {
            this.collectionFiltered = this.collection.slice(0);

            this.resetKeys();
          }
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
            gridOptions.readOnlyArray = [];
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

          this.eventOnDblClick = this.element.getAttribute("row-on-dblclick");
          this.eventOnRowDraw = this.element.getAttribute("row-on-draw");

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
                var selKeys = _this6.getSelectionKeys();
                var curKey = -1;
                if (_this6.currentRowEntity) {
                  curKey = _this6.currentRowEntity[_this6.sgkey];
                }
                if (filterObj.length === 0 && _this6.collectionFiltered.length !== _this6.collection.length) {
                  _this6.collectionFiltered = _this6.collection.slice(0);
                } else {

                  _this6.collectionFiltered = _this6.vGridFilter.run(_this6.collection, filterObj);
                  _this6.vGridSort.run(_this6.collectionFiltered);
                }

                _this6.setSelectionFromKeys(selKeys);

                var newRowNo = -1;
                if (curKey) {
                  _this6.collectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this6.sgkey]) {
                      newRowNo = index;
                    }
                  });
                }

                _this6.filterRowDisplaying = false;
                if (newRowNo > -1) {
                  _this6.currentRowEntity = _this6.collectionFiltered[newRowNo];
                  _this6.currentEntity[_this6.sgkey] = _this6.currentRowEntity[_this6.sgkey];
                  _this6.filterRow = newRowNo;
                  _this6.filterRowDisplaying = true;
                }

                _this6.gridContext.ctx.collectionChange(true);
                if (_this6.filterRowDisplaying) {
                  _this6.cellEdit.setBackFocus();
                }
              }
            };
          }

          gridOptions.getFilterName = function (name) {
            return _this6.vGridFilter.getNameOfFilter(name);
          };

          gridOptions.getDataElement = function (row, isDown, isLargeScroll, callback) {
            if (_this6.collectionFiltered !== undefined) {
              if (_this6.$parent[_this6.eventOnRowDraw]) {
                _this6.$parent[_this6.eventOnRowDraw](_this6.collectionFiltered[row]);
                callback(_this6.collectionFiltered[row]);
              } else {
                callback(_this6.collectionFiltered[row]);
              }
            }
          };

          gridOptions.onOrderBy = function (event, setheaders) {
            var attribute = event.target.getAttribute(_this6.gridContext.ctx._private.atts.dataAttribute);
            if (attribute === null) {
              attribute = event.target.offsetParent.getAttribute(_this6.gridContext.ctx._private.atts.dataAttribute);
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
              _this6.cellEdit.setBackFocus();
            }
          };

          gridOptions.onScrolled = function () {

            var rowHeight = _this6.gridContext.ctx._private.rowHeight;
            var array = _this6.gridContext.ctx._private.htmlCache.rowsArray;
            var arraylength = array.length;
            var firstRow = parseInt(array[0].top / rowHeight, 10);
            var lastRow = parseInt(array[arraylength - 1].top / rowHeight, 10);
            var curRow = _this6.filterRow;
            if (firstRow <= curRow && lastRow >= curRow) {
              _this6.cellEdit.setBackFocus();
            }
          };

          gridOptions.clickHandler = function (event, row) {

            var attribute = event.target.getAttribute(_this6.gridContext.ctx._private.atts.dataAttribute);
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

            if (_this6.$parent[_this6.eventOnDblClick] && event.type === "dblclick") {
              setTimeout(function () {
                _this6.$parent[_this6.eventOnDblClick](_this6.currentRowEntity[_this6.sgkey]);
              }, 15);
            }

            _this6.cellEdit.editCellhelper(event, readonly, function (obj) {
              _this6.currentRowEntity[obj.attribute] = obj.value;
              _this6.currentEntity[obj.attribute] = obj.value;
              _this6.gridContext.ctx.updateRow(_this6.filterRow, true);
            }, function (obj) {
              if (_this6.currentRowEntity[obj.attribute] !== obj.value) {
                _this6.skipNextUpdateProperty.push(obj.attribute);

                _this6.currentRowEntity[obj.attribute] = obj.value;
                _this6.currentEntity[obj.attribute] = obj.value;
              }
            });
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

          this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, VGridSortable, this.vGridSelection);

          this.gridContext.ctx.getSelectionKeys = function () {
            return _this6.getSelectionKeys();
          };

          this.gridContext.ctx.setSelectionFromKeys = function (x) {
            _this6.setSelectionFromKeys(x);
          };

          this.gridContext.ctx.scrollBottomNext = function () {
            _this6.scrollBottomNext = true;
          };

          this.gridContext.ctx.selection = this.vGridSelection;
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
