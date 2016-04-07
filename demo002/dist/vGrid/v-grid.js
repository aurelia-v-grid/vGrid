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
        function VGrid(element, observerLocator, vGridFilter, vGridSort, vGridInterpolate) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          this.vGridFilter = vGridFilter;
          this.vGridSort = vGridSort;
          this.vGridInterpolate = vGridInterpolate;
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
//# sourceMappingURL=data:application/json;base64,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QUwsR0FOSztXQVpQOzs7QUF6RVMsd0JBMkdYLCtCQUFXOzs7QUFFVCxlQUFLLFdBQUwsR0FBbUIsSUFBSSxXQUFKLENBQWdCLElBQWhCLENBQW5CLENBRlM7QUFHVCxlQUFLLGdCQUFMLEdBQXdCLElBQUksZ0JBQUosQ0FBcUIsSUFBckIsQ0FBeEIsQ0FIUzs7QUFNVCxlQUFLLGdCQUFMLENBQXNCLDJCQUF0QixHQU5TO0FBT1QsZUFBSyxnQkFBTCxDQUFzQixzQkFBdEIsR0FQUztBQVFULGVBQUssZ0JBQUwsQ0FBc0IsMkJBQXRCLEdBUlM7O0FBWVQsZUFBSyxjQUFMLEdBQXNCLElBQUksY0FBSixDQUFtQixLQUFLLFdBQUwsRUFBa0IsS0FBSyxnQkFBTCxFQUF1QixLQUFLLE9BQUwsRUFBYyxhQUExRSxFQUF5RixLQUFLLGNBQUwsRUFBcUIsS0FBSyxhQUFMLENBQXBJLENBWlM7O0FBaUJULGVBQUssY0FBTCxDQUFvQixXQUFwQixHQUFrQyxZQUFNO0FBQ3RDLGdCQUFJLFFBQVEsRUFBUixDQURrQztBQUV0QyxtQkFBSyxrQkFBTCxDQUF3QixPQUF4QixDQUFnQyxVQUFDLENBQUQsRUFBTTtBQUNwQyxvQkFBTSxJQUFOLENBQVcsRUFBRSxPQUFLLEtBQUwsQ0FBYixFQURvQzthQUFOLENBQWhDLENBRnNDO0FBS3RDLG1CQUFPLEtBQVAsQ0FMc0M7V0FBTixDQWpCekI7O0FBMkJULGVBQUssY0FBTCxDQUFvQixnQkFBcEIsR0FBdUMsWUFBTTtBQUMzQyxtQkFBSyxnQkFBTCxHQUF3QixJQUF4QixDQUQyQztXQUFOLENBM0I5Qjs7QUErQlQsZUFBSyxjQUFMLENBQW9CLFNBQXBCLEdBQWdDLEtBQUssY0FBTCxDQS9CdkI7O0FBa0NULGVBQUssV0FBTCxDQUFpQixHQUFqQixHQUF1QixLQUFLLGNBQUwsQ0FsQ2Q7OztBQTNHQSx3QkF1SlgsK0JBQVc7QUFDVCxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QixHQURTO0FBRVQsZUFBSyxnQkFBTCxDQUFzQiw0QkFBdEIsR0FGUztBQUdULGVBQUssZ0JBQUwsQ0FBc0IsdUJBQXRCLEdBSFM7OztlQXZKQTttQkFDSixTQUFTLENBQUMsT0FBRCxFQUFVLGVBQVYsRUFBMkIsV0FBM0IsRUFBd0MsU0FBeEMsRUFBbUQsZ0JBQW5ELHVGQUNmOzs7cUZBQ0E7Ozt3RkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
