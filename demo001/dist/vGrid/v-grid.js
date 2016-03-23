System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable'], function (_export) {
  'use strict';

  var noView, processContent, ObserverLocator, customAttribute, bindable, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate, VGridSortable, VGrid;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

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
      VGrid = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(VGrid, [{
          key: 'gridContext',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'collection',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'currentEntity',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], [{
          key: 'inject',
          value: [Element, ObserverLocator, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate],
          enumerable: true
        }], _instanceInitializers);

        function VGrid(element, observerLocator, vGridGenerator, vGridFilter, vGridSort, vGridInterpolate) {
          _classCallCheck(this, _VGrid);

          _defineDecoratedPropertyDescriptor(this, 'gridContext', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'collection', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'currentEntity', _instanceInitializers);

          this.vGridGenerator = vGridGenerator;
          this.vGridFilter = vGridFilter;
          this.vGridSort = vGridSort;
          this.vGridInterpolate = vGridInterpolate;
          this.observerLocator = observerLocator;
          this.element = element;
          this.currentRow = -1;
          this.currentRowEntity = null;
          this.filterRow = -1;
          this.__sgKey = 0;
          this.gridContextMissing = false;
          this.subscriptionsAttributes = [];
          this.collectionSubscription = null;
          this.collectionFiltered = [];
          this.subscriptionsArray = [];
          this.rowEditMode = false;
          this.rowData = this.element.getElementsByTagName("V-GRID-ROW")[0];
          this.columns = this.rowData.getElementsByTagName("V-GRID-COL");
        }

        _createDecoratedClass(VGrid, [{
          key: 'enableObservablesCollection',
          value: function enableObservablesCollection() {

            var collectionSubscription = this.__observers__.collection.subscribe(this, function (x, y) {
              this.disableObservablesArray();

              this.collectionFiltered = this.collection.slice(0);
              this.__sgKey = 0;
              this.collection.forEach((function (row) {
                row.__sgKey = this.__sgKey;
                this.__sgKey++;
              }).bind(this));

              this.vGridSort.reset();
              this.gridContext.clearHeaderFilter();
              this.gridContext.selection.reset();
              this.gridContext.collectionChange();

              this.rowEditMode = true;
              for (var k in this.currentEntity) {
                if (this.currentEntity.hasOwnProperty(k)) {
                  this.currentEntity[k] = undefined;
                }
              }
              setTimeout((function () {
                this.rowEditMode = false;
              }).bind(this), 2000);
              this.currentRow = -1;

              this.enableObservablesArray();
            });
            this.collectionSubscription = collectionSubscription;
          }
        }, {
          key: 'getSelectionKeys',
          value: function getSelectionKeys() {
            var curSel = this.gridContext.selection.getSelectedRows();
            var selKeys = [];
            var collectionFiltered = this.collectionFiltered;
            curSel.forEach(function (x) {
              selKeys.push(collectionFiltered[x].__sgKey);
            });
            return selKeys;
          }
        }, {
          key: 'setSelectionFromkeys',
          value: function setSelectionFromkeys(selKeys) {
            var newSelection = [];
            var count = 0;
            this.collectionFiltered.forEach(function (x) {
              if (selKeys.indexOf(x.__sgKey) !== -1) {
                newSelection.push(count);
              }
              count++;
            });
            this.gridContext.selection.setSelectedRows(newSelection);
          }
        }, {
          key: 'enableObservablesArray',
          value: function enableObservablesArray() {

            var arrayObserver = this.observerLocator.getArrayObserver(this.collection);
            arrayObserver.subscribe((function (changes) {

              var result = changes[0];
              var colFiltered = this.collectionFiltered;
              var col = this.collection;
              var grid = this.gridContext;

              var selKeys = this.getSelectionKeys();

              if (result) {
                try {
                  if (result.addedCount > 0) {
                    col.forEach((function (x) {
                      if (x.__sgKey === undefined) {
                        colFiltered.push(x);
                      }
                    }).bind(this));
                  }

                  if (result.removed.length > 0) {
                    var toRemove = [];
                    result.removed.forEach(function (x) {
                      toRemove.push(x.__sgKey);
                    });

                    colFiltered.forEach(function (x, index, object) {
                      if (toRemove.indexOf(x.__sgKey) !== -1) {
                        object.splice(index, 1);
                        var selKey = selKeys.indexOf(x.__sgKey);

                        if (selKeys.indexOf(x.__sgKey) !== -1) {
                          selKeys.splice(selKey, 1);
                        }
                      }
                    });
                  }

                  this.setSelectionFromkeys(selKeys);

                  this.__sgKey = 0;
                  col.forEach((function (row) {
                    row.__sgKey = this.__sgKey;
                    this.__sgKey++;
                  }).bind(this));

                  grid.collectionChange(true);
                } catch (e) {}
              }
            }).bind(this));
            this.subscriptionsArray = arrayObserver;
          }
        }, {
          key: 'enableObservablesAttributes',
          value: function enableObservablesAttributes() {

            this.gridOptions.attributeArray.forEach((function (property) {
              var propertyObserver = this.observerLocator.getObserver(this.currentEntity, property);
              propertyObserver.subscribe((function (newValue, oldValue) {
                if (newValue !== oldValue) {
                  if (!this.rowEditMode) {
                    this.currentRowEntity[property] = newValue;

                    this.gridContext.updateRow(this.filterRow);
                  }
                }
              }).bind(this));
              this.subscriptionsAttributes.push(propertyObserver);
            }).bind(this));
          }
        }, {
          key: 'bind',
          value: function bind(parent) {
            this.$parent = parent;

            if (!this.gridContext) {
              this.gridContext = {};
              this.gridContextMissing = true;
            }

            this.collectionFiltered = this.collection.slice(0);
            this.__sgKey = 0;
            this.collection.forEach((function (row) {
              row.__sgKey = this.__sgKey;
              this.__sgKey++;
            }).bind(this));
          }
        }, {
          key: 'disableObservablesCollection',
          value: function disableObservablesCollection() {
            this.collectionSubscription.unsubscribe();
            this.collectionSubscription = null;
          }
        }, {
          key: 'disableObservablesArray',
          value: function disableObservablesArray() {
            this.subscriptionsArray.unsubscribe();
            this.subscriptionsArray = null;
          }
        }, {
          key: 'disableObservablesAttributes',
          value: function disableObservablesAttributes() {
            for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
              try {
                this.subscriptionsAttributes[i].unsubscribe();
              } catch (e) {}
            }
            this.subscriptionsAttributes = [];
          }
        }, {
          key: 'attached',
          value: function attached() {
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

            var setHelperFunction = (function (gridFN, userCtxFn, internalFn, externalFN) {
              if (externalFN) {
                if (this.$parent[externalFN]) {
                  gridOptions[gridFN] = this.$parent[externalFN].bind(this.$parent);
                } else {
                  console.warn(externalFN + ", function is not found while setting up: " + gridFN);
                  externalFN = false;
                }
              }

              if (userCtxFn && !externalFN) {
                gridOptions[gridFN] = FN.bind(this.$parent);
              }

              if (!userCtxFn && !externalFN) {
                gridOptions[gridFN] = internalFn.bind(this.$parent);
              }
            }).bind(this);

            if (this.columns.length === 0) {
              gridOptions.columnWidthArrayOverride = true;

              gridOptions.onRowMarkupCreate = (function () {
                return this.rowData.innerHTML;
              }).bind(this);

              gridOptions.attributeArray = this.element.getAttribute("attibutes-used").split(",");
            } else {
              gridOptions.attributeArray = [];
              gridOptions.columnWidthArray = [];
              gridOptions.headerArray = [];
              gridOptions.filterArray = [];
              gridOptions.readOnlyArray = [];

              for (var i = 0; i < this.columns.length; i++) {
                gridOptions.attributeArray.push(this.columns[i].getAttribute("attribute"));
                gridOptions.columnWidthArray.push(this.columns[i].getAttribute("col-width"));
                gridOptions.headerArray.push(this.columns[i].getAttribute("header") || "");
                gridOptions.filterArray.push(this.columns[i].getAttribute("default-filter") || "?");
                gridOptions.readOnlyArray.push(this.columns[i].getAttribute("read-only") === "true" ? this.columns[i].getAttribute("attribute") : false);
              }
            }

            gridOptions.rowHeight = this.gridContext.rowHeight || parseInt(this.element.getAttribute("row-height"));
            gridOptions.headerHeight = this.gridContext.headerHeight || parseInt(this.element.getAttribute("header-height"));
            gridOptions.footerHeight = this.gridContext.footerHeight || parseInt(this.element.getAttribute("footer-height"));
            gridOptions.isResizableHeaders = this.gridContext.isResizableHeaders || type[this.element.getAttribute("resizable-headers")];
            gridOptions.isMultiSelect = this.gridContext.isMultiSelect || type[this.element.getAttribute("multi-select")];
            gridOptions.isSortableHeader = this.gridContext.isSortableHeader || type[this.element.getAttribute("sortable-headers")];
            gridOptions.requestAnimationFrame = this.gridContext.requestAnimationFrame || type[this.element.getAttribute("request-animation-frame")];
            gridOptions.resizableHeadersAndRows = this.gridContext.resizableHeadersAndRows || type[this.element.getAttribute("resize-also-rows")];
            gridOptions.renderOnScrollbarScroll = this.gridContext.renderOnScrollbarScroll || type[this.element.getAttribute("render-on-scrollbar-scroll")];
            gridOptions.lockedColumns = this.gridContext.lockedColumns || parseInt(this.element.getAttribute("locked-columns"));
            gridOptions.addFilter = this.gridContext.addFilter || type[this.element.getAttribute("header-filter")];
            gridOptions.filterOnAtTop = this.gridContext.filterOnAtTop || type[this.element.getAttribute("header-filter-top")];
            gridOptions.filterOnKey = this.gridContext.filterOnKey || type[this.element.getAttribute("header-filter-onkeydown")];
            gridOptions.sortOnHeaderClick = this.gridContext.sortOnHeaderClick || type[this.element.getAttribute("sort-on-header-click")];

            if (this.element.getAttribute("header-filter-not-to")) {
              gridOptions.doNotAddFilterTo = this.gridContext.rowHeight || this.element.getAttribute("header-filter-not-to").split(",");
            } else {
              gridOptions.doNotAddFilterTo = this.gridContext.rowHeight || [];
            }

            if (gridOptions.addFilter) {
              setHelperFunction("onFilterRun", this.gridContext.onFilterRun, (function (filterObj) {
                var selKeys = this.getSelectionKeys();

                this.collectionFiltered = this.vGridFilter.run(this.collection, filterObj);
                this.vGridSort.run(this.collectionFiltered);

                this.setSelectionFromkeys(selKeys);
                this.gridContext.collectionChange(true);
                this.rowEditMode = true;
                for (var k in this.currentEntity) {
                  if (this.currentEntity.hasOwnProperty(k)) {
                    this.currentEntity[k] = undefined;
                  }
                }
                setTimeout((function () {
                  this.rowEditMode = false;
                }).bind(this), 500);
              }).bind(this), this.element.getAttribute("on-row-filter"));
            }

            setHelperFunction("getFilterName", this.gridContext.getFilterName, (function (name) {
              return this.vGridFilter.getNameOfFilter(name);
            }).bind(this), this.element.getAttribute("get-filter-name"));

            setHelperFunction("getDataElement", this.gridContext.onRowClick, (function (row, isDown, isLargeScroll, callback) {
              callback(this.collectionFiltered[row]);
            }).bind(this), this.element.getAttribute("on-row-draw-callback"));

            setHelperFunction("onOrderBy", this.gridContext.onOrderBy, (function (event, setheaders) {
              var attribute = event.target.getAttribute("v-grid-data-attribute");

              if (this.collectionFiltered.length > 0 && attribute) {
                this.vGridSort.setFilter({ attribute: attribute, asc: true }, event.shiftKey);

                setheaders(this.vGridSort.getFilter());

                var selKeys = this.getSelectionKeys();

                this.vGridSort.run(this.collectionFiltered);

                this.setSelectionFromkeys(selKeys);
                this.gridContext.collectionChange();
                this.gridContext.collectionChange();

                this.rowEditMode = true;
                for (var k in this.currentEntity) {
                  if (this.currentEntity.hasOwnProperty(k)) {
                    this.currentEntity[k] = undefined;
                  }
                }
                setTimeout((function () {
                  this.rowEditMode = false;
                }).bind(this), 500);
              }
            }).bind(this), this.element.getAttribute("on-order-by"));

            setHelperFunction("clickHandler", this.gridContext.onRowClick, (function (event, row, cellEditHelper) {

              var isDoubleClick = event.type === "dblclick";
              var attribute = event.target.getAttribute("v-grid-data-attribute");
              var readonly = this.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

              this.filterRow = row;

              this.currentRowEntity = this.collectionFiltered[row];

              this.rowEditMode = true;

              var data = this.currentRowEntity;
              for (var k in data) {
                if (data.hasOwnProperty(k)) {
                  this.currentEntity[k] = data[k];
                }
              }

              if (isDoubleClick) {
                cellEditHelper(event, readonly, (function (obj) {
                  this.rowEditMode = false;

                  this.currentRowEntity[obj.attribute] = obj.value;
                  this.currentEntity[obj.attribute] = obj.value;
                }).bind(this));
              } else {
                setTimeout((function () {
                  this.rowEditMode = false;
                }).bind(this), 500);
              }
            }).bind(this), this.element.getAttribute("on-row-click"));

            setHelperFunction("getSourceLength", this.gridContext.getSourceLength, (function () {
              if (gridOptions.addFilter) {
                return this.collectionFiltered.length;
              } else {
                return this.collection.length;
              }
            }).bind(this), this.element.getAttribute("get-source-length"));

            this.gridOptions = gridOptions;

            this.enableObservablesCollection();
            this.enableObservablesArray();

            this.enableObservablesAttributes();

            this.gridContext = new this.vGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, VGridSortable);
          }
        }, {
          key: 'detached',
          value: function detached() {
            disableObservablesAttributes();
            disableObservablesCollection();
            disableObservablesArray();
          }
        }], null, _instanceInitializers);

        var _VGrid = VGrid;
        VGrid = customAttribute("config")(VGrid) || VGrid;
        VGrid = processContent(false)(VGrid) || VGrid;
        VGrid = noView(VGrid) || VGrid;
        return VGrid;
      })();

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUUsQ0FBQzs7QUFPbkMsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1dBRzNIOzs7aUJBTU8sb0JBQUc7QUFDVCx3Q0FBNEIsRUFBRSxDQUFDO0FBQy9CLHdDQUE0QixFQUFFLENBQUM7QUFDL0IsbUNBQXVCLEVBQUUsQ0FBQztXQUMzQjs7O3FCQTVvQlUsS0FBSztBQUFMLGFBQUssR0FEakIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUNiLEtBQUssS0FBTCxLQUFLO0FBQUwsYUFBSyxHQUZqQixjQUFjLENBQUMsS0FBSyxDQUFDLENBRVQsS0FBSyxLQUFMLEtBQUs7QUFBTCxhQUFLLEdBSGpCLE1BQU0sQ0FHTSxLQUFLLEtBQUwsS0FBSztlQUFMLEtBQUsiLCJmaWxlIjoidkdyaWQvdi1ncmlkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
