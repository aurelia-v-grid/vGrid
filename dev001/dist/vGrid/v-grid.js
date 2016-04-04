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
          this.vGridSort = vGridSort;
          this.vGridInterpolate = vGridInterpolate;
          this.observerLocator = observerLocator;
          this.element = element;
          this.currentRowEntity = null;
          this.filterRow = -1;
          this.scrollBottomNext = false;
          this.sgkey = "__vGrid" + Math.floor(Math.random() * 1000 + 1);
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
          this.vGridSelection = new VGridSelection(this, this);
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

        VGrid.prototype.enableObservablesArray = function enableObservablesArray() {
          var _this2 = this;

          var arrayObserver = this.observerLocator.getArrayObserver(this.collection);
          arrayObserver.subscribe(function (changes) {

            var colFiltered = _this2.collectionFiltered;
            var col = _this2.collection;
            var grid = _this2.gridContext.ctx;

            var curKey = -1;
            if (_this2.currentRowEntity) {
              curKey = _this2.currentRowEntity[_this2.sgkey];
            }
            var curEntityValid = true;

            if (changes.length > 0) {

              var added = false;
              var toRemove = [];

              changes.forEach(function (result) {
                if (result.addedCount > 0) {
                  added = true;
                }

                if (result.removed.length > 0) {
                  result.removed.forEach(function (x) {
                    toRemove.push(x[_this2.sgkey]);
                  });
                }
              });

              if (added === true) {
                col.forEach(function (x) {
                  if (x[_this2.sgkey] === undefined) {
                    colFiltered.push(x);
                  }
                });
              }

              var i = colFiltered.length - 1;
              while (i !== -1) {
                if (toRemove.indexOf(curKey) !== -1) {
                  curEntityValid = false;
                }
                if (toRemove.indexOf(colFiltered[i][_this2.sgkey]) !== -1) {
                  var x = colFiltered.splice(i, 1);
                }
                i--;
              }

              var newRowNo = -1;

              if (!curEntityValid) {
                for (var k in _this2.currentEntity) {
                  if (_this2.currentEntity.hasOwnProperty(k)) {
                    _this2.currentEntity[k] = undefined;
                    _this2.skipNextUpdateProperty.push(k);
                  }
                }
              } else {

                if (curKey) {
                  _this2.collectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this2.sgkey]) {
                      newRowNo = index;
                    }
                  });
                }
              }

              _this2.resetKeys();

              _this2.filterRowDisplaying = false;
              if (newRowNo > -1) {
                _this2.currentRowEntity = _this2.collectionFiltered[newRowNo];
                _this2.currentEntity[_this2.sgkey] = _this2.currentRowEntity[_this2.sgkey];
                _this2.filterRow = newRowNo;
                _this2.filterRowDisplaying = true;
              }

              grid.collectionChange(false, _this2.scrollBottomNext);
              if (_this2.filterRowDisplaying) {
                _this2.cellEdit.setBackFocus();
              }
            }
          });
          this.subscriptionsArray = arrayObserver;
        };

        VGrid.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
          var _this3 = this;

          this.gridOptions.attributeArray.forEach(function (property) {
            var propertyObserver = _this3.observerLocator.getObserver(_this3.currentEntity, property);
            propertyObserver.subscribe(function (newValue, oldValue) {
              if (newValue !== oldValue) {
                if (_this3.skipNextUpdateProperty.indexOf(property) === -1) {
                  _this3.currentRowEntity[property] = newValue;
                  _this3.gridContext.ctx.updateRow(_this3.filterRow, true);
                } else {
                  _this3.skipNextUpdateProperty.splice(_this3.skipNextUpdateProperty.indexOf(property), 1);
                }
              }
            });
            _this3.subscriptionsAttributes.push(propertyObserver);
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
          var _this4 = this;

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
              return _this4.rowData.innerHTML;
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

              if (filterObj.length !== 0 || _this4.collectionFiltered.length !== _this4.collection.length) {

                var curKey = -1;
                if (_this4.currentRowEntity) {
                  curKey = _this4.currentRowEntity[_this4.sgkey];
                }
                if (filterObj.length === 0 && _this4.collectionFiltered.length !== _this4.collection.length) {
                  _this4.collectionFiltered = _this4.collection.slice(0);
                } else {

                  _this4.collectionFiltered = _this4.vGridFilter.run(_this4.collection, filterObj);
                  _this4.vGridSort.run(_this4.collectionFiltered);
                }

                var newRowNo = -1;
                if (curKey) {
                  _this4.collectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this4.sgkey]) {
                      newRowNo = index;
                    }
                  });
                }

                _this4.filterRowDisplaying = false;
                if (newRowNo > -1) {
                  _this4.currentRowEntity = _this4.collectionFiltered[newRowNo];
                  _this4.currentEntity[_this4.sgkey] = _this4.currentRowEntity[_this4.sgkey];
                  _this4.filterRow = newRowNo;
                  _this4.filterRowDisplaying = true;
                }

                _this4.gridContext.ctx.collectionChange(true);
                if (_this4.filterRowDisplaying) {
                  _this4.cellEdit.setBackFocus();
                }
              }
            };
          }

          gridOptions.getFilterName = function (name) {
            return _this4.vGridFilter.getNameOfFilter(name);
          };

          gridOptions.getDataElement = function (row, isDown, isLargeScroll, callback) {
            if (_this4.collectionFiltered !== undefined) {
              if (_this4.$parent[_this4.eventOnRowDraw]) {
                _this4.$parent[_this4.eventOnRowDraw](_this4.collectionFiltered[row]);
                callback(_this4.collectionFiltered[row]);
              } else {
                callback(_this4.collectionFiltered[row]);
              }
            }
          };

          gridOptions.onOrderBy = function (event, setheaders) {
            var attribute = event.target.getAttribute(_this4.gridContext.ctx._private.atts.dataAttribute);
            if (attribute === null) {
              attribute = event.target.offsetParent.getAttribute(_this4.gridContext.ctx._private.atts.dataAttribute);
            }

            if (_this4.collectionFiltered.length > 0 && attribute) {
              _this4.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this4.vGridSort.getFilter());

              _this4.vGridSort.run(_this4.collectionFiltered);

              _this4.gridContext.ctx.collectionChange();

              _this4.collectionFiltered.forEach(function (x, index) {
                if (_this4.currentEntity[_this4.sgkey] === x[_this4.sgkey]) {
                  _this4.filterRow = index;
                }
              });
              _this4.cellEdit.setBackFocus();
            }
          };

          gridOptions.onScrolled = function () {

            var rowHeight = _this4.gridContext.ctx._private.rowHeight;
            var array = _this4.gridContext.ctx._private.htmlCache.rowsArray;
            var arraylength = array.length;
            var firstRow = parseInt(array[0].top / rowHeight, 10);
            var lastRow = parseInt(array[arraylength - 1].top / rowHeight, 10);
            var curRow = _this4.filterRow;
            if (firstRow <= curRow && lastRow >= curRow) {
              _this4.cellEdit.setBackFocus();
            }
          };

          gridOptions.clickHandler = function (event, row) {

            var attribute = event.target.getAttribute(_this4.gridContext.ctx._private.atts.dataAttribute);
            var readonly = _this4.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

            _this4.filterRow = row;

            _this4.currentRowEntity = _this4.collectionFiltered[row];

            var data = _this4.currentRowEntity;
            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                if (_this4.currentEntity[k] !== data[k]) {
                  _this4.currentEntity[k] = data[k];
                  _this4.skipNextUpdateProperty.push(k);
                }
              }
            }

            if (_this4.$parent[_this4.eventOnDblClick] && event.type === "dblclick") {
              setTimeout(function () {
                _this4.$parent[_this4.eventOnDblClick](_this4.currentRowEntity[_this4.sgkey]);
              }, 15);
            }

            _this4.cellEdit.editCellhelper(row, event, readonly, function (obj) {
              _this4.currentRowEntity[obj.attribute] = obj.value;
              _this4.currentEntity[obj.attribute] = obj.value;
              _this4.gridContext.ctx.updateRow(_this4.filterRow, true);
            }, function (obj) {
              if (_this4.currentRowEntity[obj.attribute] !== obj.value) {
                _this4.skipNextUpdateProperty.push(obj.attribute);

                _this4.currentRowEntity[obj.attribute] = obj.value;
                _this4.currentEntity[obj.attribute] = obj.value;
              }
            });
          };

          gridOptions.getSourceLength = function () {
            if (gridOptions.addFilter) {
              return _this4.collectionFiltered.length;
            } else {
              return _this4.collection.length;
            }
          };

          this.gridOptions = gridOptions;

          this.enableObservablesCollection();
          this.enableObservablesArray();
          this.enableObservablesAttributes();

          this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, VGridSortable, this.vGridSelection, this.cellEdit);

          this.gridContext.ctx.getGridRows = function () {
            var array = [];
            _this4.collectionFiltered.forEach(function (x) {
              array.push(x[_this4.sgkey]);
            });
            return array;
          };

          this.gridContext.ctx.scrollBottomNext = function () {
            _this4.scrollBottomNext = true;
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
