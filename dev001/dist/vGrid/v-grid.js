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
