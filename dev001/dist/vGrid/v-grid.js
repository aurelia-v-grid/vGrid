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

          console.log("attached grid");

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
