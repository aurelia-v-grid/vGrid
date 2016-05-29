'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-observables', './v-grid-config', './v-grid-resizable', './v-grid-selection', './v-grid-ctx'], function (_export, _context) {
  "use strict";

  var TaskQueue, ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources, containerless, VGridGenerator, VGridFilter, VGridSort, VGridSortable, VGridObservables, VGridConfig, VGridResizable, VGridSelection, VGridCtx, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp, VGrid;

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
      TaskQueue = _aureliaFramework.TaskQueue;
      ObserverLocator = _aureliaFramework.ObserverLocator;
      bindable = _aureliaFramework.bindable;
      ViewCompiler = _aureliaFramework.ViewCompiler;
      ViewSlot = _aureliaFramework.ViewSlot;
      Container = _aureliaFramework.Container;
      ViewResources = _aureliaFramework.ViewResources;
      containerless = _aureliaFramework.containerless;
    }, function (_vGridGenerator) {
      VGridGenerator = _vGridGenerator.VGridGenerator;
    }, function (_vGridFilter) {
      VGridFilter = _vGridFilter.VGridFilter;
    }, function (_vGridSort) {
      VGridSort = _vGridSort.VGridSort;
    }, function (_vGridSortable) {
      VGridSortable = _vGridSortable.VGridSortable;
    }, function (_vGridObservables) {
      VGridObservables = _vGridObservables.VGridObservables;
    }, function (_vGridConfig) {
      VGridConfig = _vGridConfig.VGridConfig;
    }, function (_vGridResizable) {
      VGridResizable = _vGridResizable.VGridResizable;
    }, function (_vGridSelection) {
      VGridSelection = _vGridSelection.VGridSelection;
    }, function (_vGridCtx) {
      VGridCtx = _vGridCtx.VGridCtx;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = bindable({ attribute: "v-grid-context" }), _dec2 = bindable({ attribute: "v-collection" }), _dec3 = bindable({ attribute: "v-current-entity" }), (_class = (_temp = _class2 = function () {
        function VGrid(element, observerLocator, viewCompiler, viewSlot, container, viewResources, taskQueue) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'vGridContextObj', _descriptor, this);

          _initDefineProp(this, 'vGridCollection', _descriptor2, this);

          _initDefineProp(this, 'vGridCurrentEntity', _descriptor3, this);

          _initDefineProp(this, 'loadingMessage', _descriptor4, this);

          this.loading = false;

          this.element = element;

          this.viewCompiler = viewCompiler;
          this.viewSlot = viewSlot;
          this.container = container;
          this.viewResources = viewResources;
          this.taskQueue = taskQueue;

          this.vGridCurrentEntityRef = null;

          this.vGridCurrentRow = -1;

          this.vGridRowKey = "__vGridKey";

          this.vGridCollectionFiltered = [];

          this.vGridFilter = new VGridFilter(this);
          this.vGridSort = new VGridSort(this);
          this.vGridConfig = new VGridConfig(this);
          this.vGridSelection = new VGridSelection(null, this);
          this.vGridSortable = new VGridSortable(this);
          this.vGridResizable = new VGridResizable(this);
          this.vGridObservables = new VGridObservables(this, observerLocator);
          this.vGridGenerator = new VGridGenerator(this);
          this.vGridClientCtx = new VGridCtx(this);
          this.vGridPager = null;
        }

        VGrid.prototype.raiseEvent = function raiseEvent(name) {
          var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
          });
          this.element.dispatchEvent(event);

          return event;
        };

        VGrid.prototype.checkKeys = function checkKeys() {
          var _this = this;

          this.vGridCollection.forEach(function (row) {
            if (!row[_this.vGridRowKey] && row !== undefined && row !== null) {
              row[_this.vGridRowKey] = _this.guid();
            }
          });
        };

        VGrid.prototype.checkKey = function checkKey(row) {
          if (!row[this.vGridRowKey] && row !== undefined && row !== null) {
            row[this.vGridRowKey] = this.guid();
          }
        };

        VGrid.prototype.vGridGetRowKey = function vGridGetRowKey(key) {
          var _this2 = this;

          var rowFound = null;
          this.vGridCollection.forEach(function (row, index) {
            if (row[_this2.vGridRowKey] === key) {
              rowFound = index;
            }
          });
          return rowFound;
        };

        VGrid.prototype.guid = function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };

        VGrid.prototype.bind = function bind(parent, overrideContext) {
          this.$parent = parent;
          this.overrideContext = overrideContext;

          if (!this.vGridContextObj) {
            this.vGridContextObj = {};
          }

          this.vGridContextObj.ctx = this.vGridClientCtx;

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
      }(), _class2.inject = [Element, ObserverLocator, ViewCompiler, ViewSlot, Container, ViewResources, TaskQueue], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'vGridContextObj', [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'vGridCollection', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'vGridCurrentEntity', [_dec3], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'loadingMessage', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return "Working please wait";
        }
      })), _class)));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT1EsZSxxQkFBQSxTO0FBQVcscUIscUJBQUEsZTtBQUFpQixjLHFCQUFBLFE7QUFBVSxrQixxQkFBQSxZO0FBQWMsYyxxQkFBQSxRO0FBQVUsZSxxQkFBQSxTO0FBQVcsbUIscUJBQUEsYTtBQUFlLG1CLHFCQUFBLGE7O0FBT3hGLG9CLG1CQUFBLGM7O0FBQ0EsaUIsZ0JBQUEsVzs7QUFDQSxlLGNBQUEsUzs7QUFDQSxtQixrQkFBQSxhOztBQUNBLHNCLHFCQUFBLGdCOztBQUNBLGlCLGdCQUFBLFc7O0FBQ0Esb0IsbUJBQUEsYzs7QUFDQSxvQixtQkFBQSxjOztBQUNBLGMsYUFBQSxROzs7dUJBR0ssSyxXQUVWLFNBQVMsRUFBQyxXQUFXLGdCQUFaLEVBQVQsQyxVQUNBLFNBQVMsRUFBQyxXQUFXLGNBQVosRUFBVCxDLFVBQ0EsU0FBUyxFQUFDLFdBQVcsa0JBQVosRUFBVCxDO0FBTUQsdUJBQVksT0FBWixFQUFxQixlQUFyQixFQUFzQyxZQUF0QyxFQUFvRCxRQUFwRCxFQUE4RCxTQUE5RCxFQUF5RSxhQUF6RSxFQUF3RixTQUF4RixFQUFtRztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLGVBRm5HLE9BRW1HLEdBRnpGLEtBRXlGOztBQUdqRyxlQUFLLE9BQUwsR0FBZSxPQUFmOztBQUlBLGVBQUssWUFBTCxHQUFvQixZQUFwQjtBQUNBLGVBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGVBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGVBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGVBQUssU0FBTCxHQUFpQixTQUFqQjs7QUFHQSxlQUFLLHFCQUFMLEdBQTZCLElBQTdCOztBQUdBLGVBQUssZUFBTCxHQUF1QixDQUFDLENBQXhCOztBQUdBLGVBQUssV0FBTCxHQUFtQixZQUFuQjs7QUFHQSxlQUFLLHVCQUFMLEdBQStCLEVBQS9COztBQUlBLGVBQUssV0FBTCxHQUFtQixJQUFJLFdBQUosQ0FBZ0IsSUFBaEIsQ0FBbkI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsSUFBSSxTQUFKLENBQWMsSUFBZCxDQUFqQjtBQUNBLGVBQUssV0FBTCxHQUFtQixJQUFJLFdBQUosQ0FBZ0IsSUFBaEIsQ0FBbkI7QUFDQSxlQUFLLGNBQUwsR0FBc0IsSUFBSSxjQUFKLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBQXRCO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLElBQUksYUFBSixDQUFrQixJQUFsQixDQUFyQjtBQUNBLGVBQUssY0FBTCxHQUFzQixJQUFJLGNBQUosQ0FBbUIsSUFBbkIsQ0FBdEI7QUFDQSxlQUFLLGdCQUFMLEdBQXdCLElBQUksZ0JBQUosQ0FBcUIsSUFBckIsRUFBMkIsZUFBM0IsQ0FBeEI7QUFDQSxlQUFLLGNBQUwsR0FBc0IsSUFBSSxjQUFKLENBQW1CLElBQW5CLENBQXRCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLElBQUksUUFBSixDQUFhLElBQWIsQ0FBdEI7QUFDQSxlQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFFRDs7d0JBTUQsVSx1QkFBVyxJLEVBQWlCO0FBQUEsY0FBWCxJQUFXLHlEQUFKLEVBQUk7O0FBQzFCLGNBQUksUUFBUSxJQUFJLFdBQUosQ0FBZ0IsSUFBaEIsRUFBc0I7QUFDaEMsb0JBQVEsSUFEd0I7QUFFaEMscUJBQVM7QUFGdUIsV0FBdEIsQ0FBWjtBQUlBLGVBQUssT0FBTCxDQUFhLGFBQWIsQ0FBMkIsS0FBM0I7O0FBRUEsaUJBQU8sS0FBUDtBQUNELFM7O3dCQU9ELFMsd0JBQVk7QUFBQTs7QUFFVixlQUFLLGVBQUwsQ0FBcUIsT0FBckIsQ0FBNkIsVUFBQyxHQUFELEVBQVM7QUFDcEMsZ0JBQUcsQ0FBQyxJQUFJLE1BQUssV0FBVCxDQUFELElBQTBCLFFBQVEsU0FBbEMsSUFBK0MsUUFBUSxJQUExRCxFQUErRDtBQUM3RCxrQkFBSSxNQUFLLFdBQVQsSUFBdUIsTUFBSyxJQUFMLEVBQXZCO0FBQ0Q7QUFDRixXQUpEO0FBS0QsUzs7d0JBRUQsUSxxQkFBUyxHLEVBQUs7QUFDVixjQUFHLENBQUMsSUFBSSxLQUFLLFdBQVQsQ0FBRCxJQUEwQixRQUFRLFNBQWxDLElBQStDLFFBQVEsSUFBMUQsRUFBK0Q7QUFDN0QsZ0JBQUksS0FBSyxXQUFULElBQXVCLEtBQUssSUFBTCxFQUF2QjtBQUNEO0FBQ0osUzs7d0JBRUQsYywyQkFBZSxHLEVBQUk7QUFBQTs7QUFDakIsY0FBSSxXQUFXLElBQWY7QUFDQSxlQUFLLGVBQUwsQ0FBcUIsT0FBckIsQ0FBNkIsVUFBQyxHQUFELEVBQU0sS0FBTixFQUFnQjtBQUMzQyxnQkFBRyxJQUFJLE9BQUssV0FBVCxNQUEwQixHQUE3QixFQUFpQztBQUMvQix5QkFBVyxLQUFYO0FBQ0Q7QUFDRixXQUpEO0FBS0EsaUJBQU8sUUFBUDtBQUNELFM7O3dCQUVELEksbUJBQU87QUFDTCxtQkFBUyxFQUFULEdBQWM7QUFDWixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxDQUFDLElBQUksS0FBSyxNQUFMLEVBQUwsSUFBc0IsT0FBakMsRUFDSixRQURJLENBQ0ssRUFETCxFQUVKLFNBRkksQ0FFTSxDQUZOLENBQVA7QUFHRDtBQUNELGlCQUFPLE9BQU8sSUFBUCxHQUFjLEdBQWQsR0FBb0IsSUFBcEIsR0FBMkIsR0FBM0IsR0FBaUMsSUFBakMsR0FBd0MsR0FBeEMsR0FDTCxJQURLLEdBQ0UsR0FERixHQUNRLElBRFIsR0FDZSxJQURmLEdBQ3NCLElBRDdCO0FBRUQsUzs7d0JBT0QsSSxpQkFBSyxNLEVBQVEsZSxFQUFpQjtBQUk1QixlQUFLLE9BQUwsR0FBZSxNQUFmO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCOztBQUlBLGNBQUksQ0FBQyxLQUFLLGVBQVYsRUFBMkI7QUFDekIsaUJBQUssZUFBTCxHQUF1QixFQUF2QjtBQUNEOztBQUdELGVBQUssZUFBTCxDQUFxQixHQUFyQixHQUEyQixLQUFLLGNBQWhDOztBQUlBLGNBQUksS0FBSyxlQUFMLEtBQXlCLFNBQXpCLElBQXNDLEtBQUssa0JBQUwsS0FBNEIsU0FBdEUsRUFBaUY7QUFDL0UsZ0JBQUksS0FBSyxlQUFMLEtBQXlCLFNBQXpCLElBQXNDLEtBQUssa0JBQUwsS0FBNEIsU0FBdEUsRUFBaUY7QUFDL0Usc0JBQVEsSUFBUixDQUFhLCtEQUFiO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsa0JBQUksS0FBSyxrQkFBTCxLQUE0QixTQUFoQyxFQUEyQztBQUN6Qyx3QkFBUSxJQUFSLENBQWEsa0RBQWI7QUFDRDtBQUNELGtCQUFJLEtBQUssZUFBTCxLQUF5QixTQUE3QixFQUF3QztBQUN0Qyx3QkFBUSxJQUFSLENBQWEsK0NBQWI7QUFDRDtBQUNGO0FBQ0YsV0FYRCxNQVdPO0FBRUwsaUJBQUssdUJBQUwsR0FBK0IsS0FBSyxlQUFMLENBQXFCLEtBQXJCLENBQTJCLENBQTNCLENBQS9COztBQUVBLGlCQUFLLFNBQUw7QUFDRDtBQUNGLFM7O3dCQU1ELFEsdUJBQVc7QUFHVCxlQUFLLGdCQUFMLENBQXNCLDJCQUF0QjtBQUNBLGVBQUssZ0JBQUwsQ0FBc0Isc0JBQXRCO0FBQ0EsZUFBSyxnQkFBTCxDQUFzQiwyQkFBdEI7O0FBR0EsZUFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEtBQXpCO0FBRUQsUzs7d0JBTUQsUSx1QkFBVztBQUNULGVBQUssZ0JBQUwsQ0FBc0IsNEJBQXRCO0FBQ0EsZUFBSyxnQkFBTCxDQUFzQiw0QkFBdEI7QUFDQSxlQUFLLGdCQUFMLENBQXNCLHVCQUF0QjtBQUNELFM7OzttQkF6S00sTSxHQUFTLENBQUMsT0FBRCxFQUFVLGVBQVYsRUFBMkIsWUFBM0IsRUFBeUMsUUFBekMsRUFBbUQsU0FBbkQsRUFBOEQsYUFBOUQsRUFBNkUsU0FBN0UsQzs7Ozs7Ozs7O3dGQU1mLFE7OztpQkFBMEIscUIiLCJmaWxlIjoidkdyaWQvdi1ncmlkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
