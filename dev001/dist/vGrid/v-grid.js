'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable', './v-grid-cell-edit', './v-grid-observables', './v-grid-config', './v-grid-selection'], function (_export, _context) {
  var noView, processContent, ObserverLocator, customAttribute, bindable, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate, VGridSortable, VGridCellEdit, VGridObservables, VGridConfig, VGridSelection, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, VGrid;

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
    }, function (_vGridObservables) {
      VGridObservables = _vGridObservables.VGridObservables;
    }, function (_vGridConfig) {
      VGridConfig = _vGridConfig.VGridConfig;
    }, function (_vGridSelection) {
      VGridSelection = _vGridSelection.VGridSelection;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = processContent(false), _dec2 = customAttribute("config"), noView(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
        function VGrid(element, observerLocator, vGridFilter) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          this.vGridFilter = vGridFilter;
          this.vGridSort = new VGridSort();
          this.vGridInterpolate = new VGridInterpolate();
          this.observerLocator = observerLocator;
          this.gridContext = null;
          this.element = element;
          this.currentRowEntity = null;
          this.filterRow = -1;
          this.scrollBottomNext = false;
          this.sgkey = "__vGrid" + Math.floor(Math.random() * 1000 + 1);
          this.gridContextMissing = false;
          this.collectionFiltered = [];
          this.skipNextUpdateProperty = [];
          this.filterRowDisplaying = true;
          this.vGridSelection = new VGridSelection(null, this);
          this.vGridCellEdit = new VGridCellEdit(this);
        }

        VGrid.prototype.resetKeys = function resetKeys() {
          var _this = this;

          var key = 0;
          this.collection.forEach(function (row) {
            row[_this.sgkey] = key;
            key++;
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

        VGrid.prototype.attached = function attached() {
          var _this2 = this;

          this.vGridConfig = new VGridConfig(this);
          this.vGridObservables = new VGridObservables(this);

          this.vGridObservables.enableObservablesCollection();
          this.vGridObservables.enableObservablesArray();
          this.vGridObservables.enableObservablesAttributes();

          this.vGridGenerator = new VGridGenerator(this.vGridConfig, this.vGridInterpolate, this.element, VGridSortable, this.vGridSelection, this.vGridCellEdit);

          this.vGridGenerator.getGridRows = function () {
            var array = [];
            _this2.collectionFiltered.forEach(function (x) {
              array.push(x[_this2.sgkey]);
            });
            return array;
          };

          this.vGridGenerator.scrollBottomNext = function () {
            _this2.scrollBottomNext = true;
          };

          this.vGridGenerator.selection = this.vGridSelection;

          this.gridContext.ctx = this.vGridGenerator;
        };

        VGrid.prototype.detached = function detached() {
          this.vGridObservables.disableObservablesAttributes();
          this.vGridObservables.disableObservablesCollection();
          this.vGridObservables.disableObservablesArray();
        };

        return VGrid;
      }(), _class3.inject = [Element, ObserverLocator, VGridFilter, VGridSort], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'gridContext', [bindable], {
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
