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

          this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, VGridSortable);

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
