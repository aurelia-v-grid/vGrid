'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-cell-helper', './v-grid-observables', './v-grid-config', './v-grid-resizable', './v-grid-selection'], function (_export, _context) {
  var ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources, VGridGenerator, VGridFilter, VGridSort, VGridSortable, VGridCellHelper, VGridObservables, VGridConfig, VGridResizable, VGridSelection, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _class2, _temp, VGrid;

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
      ObserverLocator = _aureliaFramework.ObserverLocator;
      bindable = _aureliaFramework.bindable;
      ViewCompiler = _aureliaFramework.ViewCompiler;
      ViewSlot = _aureliaFramework.ViewSlot;
      Container = _aureliaFramework.Container;
      ViewResources = _aureliaFramework.ViewResources;
    }, function (_vGridGenerator) {
      VGridGenerator = _vGridGenerator.VGridGenerator;
    }, function (_vGridFilter) {
      VGridFilter = _vGridFilter.VGridFilter;
    }, function (_vGridSort) {
      VGridSort = _vGridSort.VGridSort;
    }, function (_vGridSortable) {
      VGridSortable = _vGridSortable.VGridSortable;
    }, function (_vGridCellHelper) {
      VGridCellHelper = _vGridCellHelper.VGridCellHelper;
    }, function (_vGridObservables) {
      VGridObservables = _vGridObservables.VGridObservables;
    }, function (_vGridConfig) {
      VGridConfig = _vGridConfig.VGridConfig;
    }, function (_vGridResizable) {
      VGridResizable = _vGridResizable.VGridResizable;
    }, function (_vGridSelection) {
      VGridSelection = _vGridSelection.VGridSelection;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = bindable({ attribute: "v-grid-context" }), _dec2 = bindable({ attribute: "v-collection" }), _dec3 = bindable({ attribute: "v-current-entity" }), (_class = (_temp = _class2 = function () {
        function VGrid(element, observerLocator, viewCompiler, viewSlot, container, viewResources) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'vGridContextObj', _descriptor, this);

          _initDefineProp(this, 'vGridCollection', _descriptor2, this);

          _initDefineProp(this, 'vGridCurrentEntity', _descriptor3, this);

          this.element = element;

          this.viewCompiler = viewCompiler;
          this.viewSlot = viewSlot;
          this.container = container;
          this.viewResources = viewResources;

          this.vGridCurrentEntityRef = null;

          this.vGridCurrentRow = -1;

          this.vGridRowKey = "__vGridKey";

          this.vGridCollectionFiltered = [];

          this.vGridSkipNextUpdateProperty = [];

          this.vGridFilter = new VGridFilter();
          this.vGridSort = new VGridSort();
          this.vGridConfig = new VGridConfig(this);
          this.vGridSelection = new VGridSelection(null, this);
          this.vGridCellHelper = new VGridCellHelper(this);
          this.vGridSortable = new VGridSortable(this);
          this.vGridResizable = new VGridResizable(this);
          this.vGridObservables = new VGridObservables(this, observerLocator);
          this.vGridGenerator = new VGridGenerator(this);

          this.key = 0;
        }

        VGrid.prototype.checkKeys = function checkKeys() {
          var _this = this;

          this.vGridCollection.forEach(function (row) {
            if (!row[_this.vGridRowKey] && row !== undefined && row !== null) {
              row[_this.vGridRowKey] = _this.key;
              _this.key++;
            }
          });
        };

        VGrid.prototype.checkKey = function checkKey(row) {
          if (!row[this.vGridRowKey] && row !== undefined && row !== null) {
            row[this.vGridRowKey] = this.key;
            this.key++;
          }
        };

        VGrid.prototype.vGridGetRowKey = function vGridGetRowKey(key) {
          var _this2 = this;

          var rowFound = null;
          this.vGridCollection.forEach(function (row, index) {
            if (!row[_this2.vGridRowKey] === key) {
              rowFound = index;
            }
          });
          return rowFound;
        };

        VGrid.prototype.bind = function bind(parent) {
          this.$parent = parent;

          if (!this.vGridContextObj) {
            this.vGridContextObj = {};
          }

          this.vGridContextObj.ctx = this.vGridGenerator;

          if (this.vGridCollection === undefined || this.vGridCurrentEntity === undefined) {
            if (this.vGridCollection === undefined && this.vGridCurrentEntity === undefined) {
              console.warn("currentEntity & collection not set/binded in config attribute");
            } else {
              if (this.vGridCurrentEntity === undefined) {
                console.warn("currentEntity not set/binded in config attribute");
              }
              if (this.vGridCollection === undefined) {
                console.warn("collection not set/binded in config attribute");
              }
            }
          } else {
            this.vGridCollectionFiltered = this.vGridCollection.slice(0);

            this.checkKeys();
          }
        };

        VGrid.prototype.attached = function attached() {
          this.vGridObservables.enableObservablesCollection();
          this.vGridObservables.enableObservablesArray();
          this.vGridObservables.enableObservablesAttributes();

          this.vGridGenerator.init(false);
        };

        VGrid.prototype.detached = function detached() {
          this.vGridObservables.disableObservablesAttributes();
          this.vGridObservables.disableObservablesCollection();
          this.vGridObservables.disableObservablesArray();
        };

        return VGrid;
      }(), _class2.inject = [Element, ObserverLocator, ViewCompiler, ViewSlot, Container, ViewResources], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'vGridContextObj', [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'vGridCollection', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'vGridCurrentEntity', [_dec3], {
        enumerable: true,
        initializer: null
      })), _class)));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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VyxJQUFYLENBRGE7QUFFakIsZUFBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLFVBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZ0I7QUFDM0MsZ0JBQUcsQ0FBQyxJQUFJLE9BQUssV0FBTCxDQUFMLEtBQTJCLEdBQTNCLEVBQStCO0FBQ2hDLHlCQUFXLEtBQVgsQ0FEZ0M7YUFBbEM7V0FEMkIsQ0FBN0IsQ0FGaUI7QUFPakIsaUJBQU8sUUFBUCxDQVBpQjs7O0FBdEVSLHdCQXNGWCxxQkFBSyxRQUFRO0FBSVgsZUFBSyxPQUFMLEdBQWUsTUFBZixDQUpXOztBQVFYLGNBQUksQ0FBQyxLQUFLLGVBQUwsRUFBc0I7QUFDekIsaUJBQUssZUFBTCxHQUF1QixFQUF2QixDQUR5QjtXQUEzQjs7QUFLQSxlQUFLLGVBQUwsQ0FBcUIsR0FBckIsR0FBMkIsS0FBSyxjQUFMLENBYmhCOztBQWlCWCxjQUFJLEtBQUssZUFBTCxLQUF5QixTQUF6QixJQUFzQyxLQUFLLGtCQUFMLEtBQTRCLFNBQTVCLEVBQXVDO0FBQy9FLGdCQUFJLEtBQUssZUFBTCxLQUF5QixTQUF6QixJQUFzQyxLQUFLLGtCQUFMLEtBQTRCLFNBQTVCLEVBQXVDO0FBQy9FLHNCQUFRLElBQVIsQ0FBYSwrREFBYixFQUQrRTthQUFqRixNQUVPO0FBQ0wsa0JBQUksS0FBSyxrQkFBTCxLQUE0QixTQUE1QixFQUF1QztBQUN6Qyx3QkFBUSxJQUFSLENBQWEsa0RBQWIsRUFEeUM7ZUFBM0M7QUFHQSxrQkFBSSxLQUFLLGVBQUwsS0FBeUIsU0FBekIsRUFBb0M7QUFDdEMsd0JBQVEsSUFBUixDQUFhLCtDQUFiLEVBRHNDO2VBQXhDO2FBTkY7V0FERixNQVdPO0FBRUwsaUJBQUssdUJBQUwsR0FBK0IsS0FBSyxlQUFMLENBQXFCLEtBQXJCLENBQTJCLENBQTNCLENBQS9CLENBRks7O0FBSUwsaUJBQUssU0FBTCxHQUpLO1dBWFA7OztBQXZHUyx3QkE4SFgsK0JBQVc7QUFHVCxlQUFLLGdCQUFMLENBQXNCLDJCQUF0QixHQUhTO0FBSVQsZUFBSyxnQkFBTCxDQUFzQixzQkFBdEIsR0FKUztBQUtULGVBQUssZ0JBQUwsQ0FBc0IsMkJBQXRCLEdBTFM7O0FBU1QsZUFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEtBQXpCLEVBVFM7OztBQTlIQSx3QkFpSlgsK0JBQVc7QUFDVCxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QixHQURTO0FBRVQsZUFBSyxnQkFBTCxDQUFzQiw0QkFBdEIsR0FGUztBQUdULGVBQUssZ0JBQUwsQ0FBc0IsdUJBQXRCLEdBSFM7OztlQWpKQTttQkFDSixTQUFTLENBQUMsT0FBRCxFQUFVLGVBQVYsRUFBMkIsWUFBM0IsRUFBeUMsUUFBekMsRUFBbUQsU0FBbkQsRUFBOEQsYUFBOUQiLCJmaWxlIjoidkdyaWQvdi1ncmlkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
