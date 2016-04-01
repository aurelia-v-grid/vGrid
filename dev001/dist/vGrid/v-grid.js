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

                if (newRowNo > -1) {
                  _this6.currentRowEntity = _this6.collectionFiltered[newRowNo];
                  _this6.currentEntity[_this6.sgkey] = _this6.currentRowEntity[_this6.sgkey];
                  _this6.filterRow = newRowNo;
                }

                _this6.gridContext.ctx.collectionChange(true);
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
