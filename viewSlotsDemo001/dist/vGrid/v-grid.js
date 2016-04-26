'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable', './v-grid-cell-edit', './v-grid-observables', './v-grid-config', './v-grid-selection'], function (_export, _context) {
  var children, processContent, ObserverLocator, customAttribute, bindable, ViewCompiler, ViewSlot, Container, ViewResources, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate, VGridSortable, VGridCellEdit, VGridObservables, VGridConfig, VGridSelection, _dec, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp, VGrid;

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
      children = _aureliaFramework.children;
      processContent = _aureliaFramework.processContent;
      ObserverLocator = _aureliaFramework.ObserverLocator;
      customAttribute = _aureliaFramework.customAttribute;
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
      _export('VGrid', VGrid = (_dec = children('v-grid-col'), (_class = (_temp = _class2 = function () {
        function VGrid(element, observerLocator, vGridFilter, viewCompiler, viewSlot, container, viewResources) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          _initDefineProp(this, 'columns', _descriptor4, this);

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
            this.vGridConfig = new VGridConfig(this);

            this.resetKeys();
          }
        };

        VGrid.prototype.attached = function attached() {
          var _this2 = this;

          this.vGridObservables = new VGridObservables(this);

          this.vGridObservables.enableObservablesCollection();
          this.vGridObservables.enableObservablesArray();
          this.vGridObservables.enableObservablesAttributes();

          this.vGridGenerator = new VGridGenerator(this.vGridConfig, this.vGridInterpolate, this.element, VGridSortable, this.vGridSelection, this.vGridCellEdit, this);

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
      }(), _class2.inject = [Element, ObserverLocator, VGridFilter, ViewCompiler, ViewSlot, Container, ViewResources], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'gridContext', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'collection', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'currentEntity', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'columns', [_dec], {
        enumerable: true,
        initializer: null
      })), _class)));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QixPQUFuQixHQUE2QixNQUE3QixDQWxDZ0Q7QUFtQ2hELHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLFlBQTFCLEVBbkNnRDtBQW9DaEQseUJBQWEsS0FBYixHQXBDZ0Q7QUFxQ2hELHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLFlBQTFCLEVBckNnRDtXQUFmLENBakMxQjs7QUE4RVQsZUFBSyxXQUFMLENBQWlCLEdBQWpCLEdBQXVCLEtBQUssY0FBTCxDQTlFZDs7O0FBdEdBLHdCQThMWCwrQkFBVztBQUNULGVBQUssZ0JBQUwsQ0FBc0IsNEJBQXRCLEdBRFM7QUFFVCxlQUFLLGdCQUFMLENBQXNCLDRCQUF0QixHQUZTO0FBR1QsZUFBSyxnQkFBTCxDQUFzQix1QkFBdEIsR0FIUzs7O2VBOUxBO21CQUNKLFNBQVMsQ0FBQyxPQUFELEVBQVUsZUFBVixFQUEyQixXQUEzQixFQUF3QyxZQUF4QyxFQUFxRCxRQUFyRCxFQUE4RCxTQUE5RCxFQUF3RSxhQUF4RSxzRkFDZjs7O29GQUNBOzs7dUZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
