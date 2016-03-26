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
        function VGrid(element, observerLocator, vGridGenerator, vGridFilter, vGridSort, vGridInterpolate) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          this.vGridGenerator = vGridGenerator;
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
            this.gridContext.ctx.clearHeaderFilter();
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
          this.collectionSubscription = collectionSubscription;
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

                  colFiltered.forEach(function (x, index, object) {
                    if (toRemove.indexOf(x[_this5.sgkey]) !== -1) {
                      object.splice(index, 1);
                      var selKey = selKeys.indexOf(x[_this5.sgkey]);

                      if (selKeys.indexOf(x[_this5.sgkey]) !== -1) {
                        selKeys.splice(selKey, 1);
                      }
                    }
                  });
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

          this.gridContext.ctx = new this.vGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);

          this.gridContext.ctx.getSelectionKeys = function () {
            return this.getSelectionKeys();
          }.bind(this.$parent);

          this.gridContext.ctx.setSelectionFromKeys = function (x) {
            this.setSelectionFromKeys(x);
          }.bind(this.$parent);
        };

        VGrid.prototype.detached = function detached() {
          disableObservablesAttributes();
          disableObservablesCollection();
          disableObservablesArray();
        };

        return VGrid;
      }(), _class3.inject = [Element, ObserverLocator, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'gridContext', [bindable], {
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
