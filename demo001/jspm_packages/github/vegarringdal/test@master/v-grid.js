/* */ 
define(['exports', 'aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable'], function (exports, _aureliaFramework, _vGridGenerator, _vGridFilter, _vGridSort, _vGridInterpolate, _vGridSortable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGrid = undefined;

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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

  var VGrid = exports.VGrid = (_dec = (0, _aureliaFramework.processContent)(false), _dec2 = (0, _aureliaFramework.customAttribute)("config"), (0, _aureliaFramework.noView)(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
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

    VGrid.prototype.enableObservablesCollection = function enableObservablesCollection() {

      var collectionSubscription = this.__observers__.collection.subscribe(this, function (x, y) {
        this.disableObservablesArray();

        this.collectionFiltered = this.collection.slice(0);
        this.__sgKey = 0;
        this.collection.forEach(function (row) {
          row.__sgKey = this.__sgKey;
          this.__sgKey++;
        }.bind(this));

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
          this.rowEditMode = false;
        }.bind(this), 2000);
        this.currentRow = -1;

        this.enableObservablesArray();
      });
      this.collectionSubscription = collectionSubscription;
    };

    VGrid.prototype.getSelectionKeys = function getSelectionKeys() {
      var curSel = this.gridContext.ctx.selection.getSelectedRows();
      var selKeys = [];
      var collectionFiltered = this.collectionFiltered;
      curSel.forEach(function (x) {
        selKeys.push(collectionFiltered[x].__sgKey);
      });
      return selKeys;
    };

    VGrid.prototype.setSelectionFromKeys = function setSelectionFromKeys(selKeys) {
      var newSelection = [];
      var count = 0;
      this.collectionFiltered.forEach(function (x) {
        if (selKeys.indexOf(x.__sgKey) !== -1) {
          newSelection.push(count);
        }
        count++;
      });
      this.gridContext.ctx.selection.setSelectedRows(newSelection);
    };

    VGrid.prototype.enableObservablesArray = function enableObservablesArray() {

      var arrayObserver = this.observerLocator.getArrayObserver(this.collection);
      arrayObserver.subscribe(function (changes) {

        var result = changes[0];
        var colFiltered = this.collectionFiltered;
        var col = this.collection;
        var grid = this.gridContext.ctx;

        var selKeys = this.getSelectionKeys();

        if (result) {
          try {
            if (result.addedCount > 0) {
              col.forEach(function (x) {
                if (x.__sgKey === undefined) {
                  colFiltered.push(x);
                }
              }.bind(this));
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

            this.setSelectionFromKeys(selKeys);

            this.__sgKey = 0;
            col.forEach(function (row) {
              row.__sgKey = this.__sgKey;
              this.__sgKey++;
            }.bind(this));

            grid.collectionChange(true);
          } catch (e) {}
        }
      }.bind(this));
      this.subscriptionsArray = arrayObserver;
    };

    VGrid.prototype.enableObservablesAttributes = function enableObservablesAttributes() {

      this.gridOptions.attributeArray.forEach(function (property) {
        var propertyObserver = this.observerLocator.getObserver(this.currentEntity, property);
        propertyObserver.subscribe(function (newValue, oldValue) {
          if (newValue !== oldValue) {
            if (!this.rowEditMode) {
              this.currentRowEntity[property] = newValue;

              this.gridContext.ctx.updateRow(this.filterRow);
            }
          }
        }.bind(this));
        this.subscriptionsAttributes.push(propertyObserver);
      }.bind(this));
    };

    VGrid.prototype.bind = function bind(parent) {
      this.$parent = parent;

      if (!this.gridContext) {
        this.gridContext = {};
        this.gridContextMissing = true;
      }

      this.collectionFiltered = this.collection.slice(0);
      this.__sgKey = 0;
      this.collection.forEach(function (row) {
        row.__sgKey = this.__sgKey;
        this.__sgKey++;
      }.bind(this));
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
          return this.rowData.innerHTML;
        }.bind(this);

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
          var selKeys = this.getSelectionKeys();

          this.collectionFiltered = this.vGridFilter.run(this.collection, filterObj);
          this.vGridSort.run(this.collectionFiltered);

          this.setSelectionFromKeys(selKeys);
          this.gridContext.ctx.collectionChange(true);
          this.rowEditMode = true;
          for (var k in this.currentEntity) {
            if (this.currentEntity.hasOwnProperty(k)) {
              this.currentEntity[k] = undefined;
            }
          }
          setTimeout(function () {
            this.rowEditMode = false;
          }.bind(this), 500);
        }.bind(this);
      }

      gridOptions.getFilterName = function (name) {
        return this.vGridFilter.getNameOfFilter(name);
      }.bind(this);

      gridOptions.getDataElement = function (row, isDown, isLargeScroll, callback) {
        if (this.gridContext.onRowDraw) {
          this.gridContext.onRowDraw(this.collectionFiltered[row]);
          callback(this.collectionFiltered[row]);
        } else {
          callback(this.collectionFiltered[row]);
        }
      }.bind(this);

      gridOptions.onOrderBy = function (event, setheaders) {
        var attribute = event.target.getAttribute("v-grid-data-attribute");

        if (this.collectionFiltered.length > 0 && attribute) {
          this.vGridSort.setFilter({
            attribute: attribute,
            asc: true
          }, event.shiftKey);

          setheaders(this.vGridSort.getFilter());

          var selKeys = this.getSelectionKeys();

          this.vGridSort.run(this.collectionFiltered);

          this.setSelectionFromKeys(selKeys);
          this.gridContext.ctx.collectionChange();
          this.gridContext.ctx.collectionChange();

          this.rowEditMode = true;
          for (var k in this.currentEntity) {
            if (this.currentEntity.hasOwnProperty(k)) {
              this.currentEntity[k] = undefined;
            }
          }
          setTimeout(function () {
            this.rowEditMode = false;
          }.bind(this), 500);
        }
      }.bind(this);

      gridOptions.onRowClick = function (event, row, cellEditHelper) {

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
          cellEditHelper(event, readonly, function (obj) {
            this.rowEditMode = false;

            this.currentRowEntity[obj.attribute] = obj.value;
            this.currentEntity[obj.attribute] = obj.value;
          }.bind(this));
        } else {
          setTimeout(function () {
            this.rowEditMode = false;
          }.bind(this), 500);
        }
      }.bind(this);

      gridOptions.getSourceLength = function () {
        if (gridOptions.addFilter) {
          return this.collectionFiltered.length;
        } else {
          return this.collection.length;
        }
      }.bind(this);

      this.gridOptions = gridOptions;

      this.enableObservablesCollection();
      this.enableObservablesArray();

      this.enableObservablesAttributes();

      this.gridContext.ctx = new this.vGridGenerator(gridOptions, this.vGridInterpolate, this.element, this.$parent, _vGridSortable.VGridSortable);

      this.gridContext.ctx.getSelectionKeys = function () {
        return this.getSelectionKeys();
      }.bind(this);

      this.gridContext.ctx.setSelectionFromKeys = function (x) {
        this.setSelectionFromKeys(x);
      }.bind(this);
    };

    VGrid.prototype.detached = function detached() {
      disableObservablesAttributes();
      disableObservablesCollection();
      disableObservablesArray();
    };

    return VGrid;
  }(), _class3.inject = [Element, _aureliaFramework.ObserverLocator, _vGridGenerator.VGridGenerator, _vGridFilter.VGridFilter, _vGridSort.VGridSort, _vGridInterpolate.VGridInterpolate], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'gridContext', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'collection', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'currentEntity', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);
});