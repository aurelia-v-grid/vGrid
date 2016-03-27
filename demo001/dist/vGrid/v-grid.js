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

                grid.collectionChange(true);
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

          gridOptions.rowHeight = this.gridContext.rowHeight || parseInt(this.element.getAttribute("row-height"));
          gridOptions.headerHeight = this.gridContext.headerHeight || parseInt(this.element.getAttribute("header-height"));
          gridOptions.footerHeight = this.gridContext.footerHeight || parseInt(this.element.getAttribute("footer-height"));
          gridOptions.isResizableHeaders = this.gridContext.resizableHeaders || type[this.element.getAttribute("resizable-headers")];
          gridOptions.isMultiSelect = this.gridContext.multiSelect || type[this.element.getAttribute("multi-select")];
          gridOptions.isSortableHeader = this.gridContext.sortableHeader || type[this.element.getAttribute("sortable-headers")];
          gridOptions.requestAnimationFrame = this.gridContext.requestAnimationFrame || type[this.element.getAttribute("request-animation-frame")];
          gridOptions.resizableHeadersAndRows = this.gridContext.resizeAlsoRows || type[this.element.getAttribute("resize-also-rows")];
          gridOptions.renderOnScrollbarScroll = this.gridContext.renderOnScrollbarScroll || type[this.element.getAttribute("render-on-scrollbar-scroll")];
          gridOptions.lockedColumns = this.gridContext.lockedColumns || parseInt(this.element.getAttribute("locked-columns"));
          gridOptions.addFilter = this.gridContext.headerFilter || type[this.element.getAttribute("header-filter")];
          gridOptions.filterOnAtTop = this.gridContext.headerFilterTop || type[this.element.getAttribute("header-filter-top")];
          gridOptions.filterOnKey = this.gridContext.headerFilterOnkeydown || type[this.element.getAttribute("header-filter-onkeydown")];
          gridOptions.sortOnHeaderClick = this.gridContext.sortOnHeaderClick || type[this.element.getAttribute("sort-on-header-click")];

          if (this.element.getAttribute("header-filter-not-to")) {
            gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo || this.element.getAttribute("header-filter-not-to").split(",");
          } else {
            gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo || [];
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
