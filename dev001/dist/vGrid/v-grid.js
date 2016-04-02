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

                _this3.cellEdit.setBackFocus();
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

            _this4.cellEdit.editCellhelper(event, readonly, function (obj) {
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

          this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, VGridSortable, this.vGridSelection);

          this.gridContext.ctx.getGridRows = function () {
            var array = [];
            _this4.collectionFiltered.forEach(function (x) {
              array.push(x[sgkey]);
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
