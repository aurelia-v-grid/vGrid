'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-sortable', './v-grid-cell-edit', './v-grid-observables', './v-grid-config', './v-grid-selection'], function (_export, _context) {
  var ObserverLocator, bindable, ViewCompiler, ViewSlot, Container, ViewResources, VGridGenerator, VGridFilter, VGridSort, VGridSortable, VGridCellEdit, VGridObservables, VGridConfig, VGridSelection, _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _class2, _temp, VGrid;

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
      _export('VGrid', VGrid = (_dec = bindable({ attribute: "v-grid-context" }), _dec2 = bindable({ attribute: "v-collection" }), _dec3 = bindable({ attribute: "v-current-entity" }), (_class = (_temp = _class2 = function () {
        function VGrid(element, observerLocator, vGridFilter, viewCompiler, viewSlot, container, viewResources) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

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

          this.vGridFilter = vGridFilter;
          this.vGridSort = new VGridSort();
          this.vGridConfig = new VGridConfig(this);
          this.vGridSelection = new VGridSelection(null, this);
          this.vGridCellEdit = new VGridCellEdit(this);

          this.viewCompiler = viewCompiler;
          this.viewSlot = viewSlot;
          this.container = container;
          this.viewResources = viewResources;
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

          this.vGridObservables = new VGridObservables(this);

          this.vGridObservables.enableObservablesCollection();
          this.vGridObservables.enableObservablesArray();
          this.vGridObservables.enableObservablesAttributes();

          this.vGridGenerator = new VGridGenerator(this.vGridConfig, this.element, VGridSortable, this.vGridSelection, this.vGridCellEdit, this);

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

          this.vGridGenerator.createReport = function (skipArray) {
            if (skipArray === undefined) {
              skipArray = [];
            }
            var content = '';
            var rows = _this2.vGridGenerator.getGridRows();
            var attributes = _this2.vGridConfig.attributeArray;

            var setData = function setData(arr) {
              content = content + arr.join(';') + '\n';
            };

            setData(attributes);

            rows.forEach(function (row) {
              var tempArr = [];
              attributes.forEach(function (att) {
                if (skipArray.indexOf(att) === -1) {
                  tempArr.push(_this2.collection[row][att]);
                }
              });
              setData(tempArr);
            });

            var dummyElement = document.createElement('a');
            dummyElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
            dummyElement.setAttribute('download', 'contacts.csv');
            dummyElement.style.display = 'none';
            document.body.appendChild(dummyElement);
            dummyElement.click();
            document.body.removeChild(dummyElement);
          };

          this.gridContext.ctx = this.vGridGenerator;
        };

        VGrid.prototype.detached = function detached() {
          this.vGridObservables.disableObservablesAttributes();
          this.vGridObservables.disableObservablesCollection();
          this.vGridObservables.disableObservablesArray();
        };

        return VGrid;
      }(), _class2.inject = [Element, ObserverLocator, VGridFilter, ViewCompiler, ViewSlot, Container, ViewResources], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'gridContext', [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'collection', [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'currentEntity', [_dec3], {
        enumerable: true,
        initializer: null
      })), _class)));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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LHlCQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsTUFBN0IsQ0FsQ2dEO0FBbUNoRCxxQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUExQixFQW5DZ0Q7QUFvQ2hELHlCQUFhLEtBQWIsR0FwQ2dEO0FBcUNoRCxxQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixZQUExQixFQXJDZ0Q7V0FBZixDQWpDMUI7O0FBOEVULGVBQUssV0FBTCxDQUFpQixHQUFqQixHQUF1QixLQUFLLGNBQUwsQ0E5RWQ7OztBQXpIQSx3QkFpTlgsK0JBQVc7QUFDVCxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QixHQURTO0FBRVQsZUFBSyxnQkFBTCxDQUFzQiw0QkFBdEIsR0FGUztBQUdULGVBQUssZ0JBQUwsQ0FBc0IsdUJBQXRCLEdBSFM7OztlQWpOQTttQkFDSixTQUFTLENBQUMsT0FBRCxFQUFVLGVBQVYsRUFBMkIsV0FBM0IsRUFBd0MsWUFBeEMsRUFBcUQsUUFBckQsRUFBOEQsU0FBOUQsRUFBd0UsYUFBeEUiLCJmaWxlIjoidkdyaWQvdi1ncmlkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
