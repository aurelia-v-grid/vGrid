'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, VGridCellContainer;

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
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      Container = _aureliaFramework.Container;
      bindable = _aureliaFramework.bindable;
      ViewSlot = _aureliaFramework.ViewSlot;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridCellContainer', VGridCellContainer = (_dec = noView(), _dec2 = customElement('v-grid-row-col'), _dec3 = processContent(false), _dec4 = inject(Element, VGrid, Container), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = function () {
        function VGridCellContainer(element, vGrid, container) {
          _classCallCheck(this, VGridCellContainer);

          _initDefineProp(this, 'columnNo', _descriptor, this);

          this.element = element;
          this.container = container;
          this.vGrid = vGrid;
        }

        VGridCellContainer.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;

          if (this.viewSlot) {
            this.viewSlot.bind(this.bindingContext, {
              bindingContext: this.bindingContext,
              parentOverrideContext: this.overrideContext
            });
          }
        };

        VGridCellContainer.prototype.created = function created() {};

        VGridCellContainer.prototype.attached = function attached() {
          this.setStandardClassesAndStyles();

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.vGrid.vGridConfig.colCustomArray[this.columnNo] + '</template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.container);

          this.viewSlot = new ViewSlot(this.element, true);
          this.viewSlot.add(view);
          this.viewSlot.bind(this.bindingContext, {
            bindingContext: this.bindingContext,
            parentOverrideContext: this.overrideContext
          });
          this.viewSlot.attached();

          this.element.addEventListener("eventOnRowDblClick", function (e) {
            if (this.vGrid.vGridConfig.eventOnRowDblClick) {
              this.vGrid.vGridConfig.eventOnRowDblClick({
                evt: e,
                data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
                attribute: this.vGrid.vGridConfig.attributeArray[this.columnNo],
                row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
              });
            }
          }.bind(this));

          this.element.addEventListener("eventOnRowClick", function (e) {
            if (this.vGrid.vGridConfig.eventOnRowClick) {
              this.vGrid.vGridConfig.eventOnRowClick({
                evt: e,
                data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
                attribute: this.vGrid.vGridConfig.attributeArray[this.columnNo],
                row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
              });
            }
          }.bind(this));
        };

        VGridCellContainer.prototype.getRow = function getRow() {
          return parseInt(this.element.parentNode.getAttribute("row"));
        };

        VGridCellContainer.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
          var css = this.vGrid.vGridConfig.css;
          var cellStyle = 'width:' + this.vGrid.vGridConfig.columnWidthArray[this.columnNo] + 'px';
          this.element.classList.add(css.rowCell);
          this.element.classList.add(css.rowColumn + this.columnNo);
          this.element.classList.add(css.gridColumn + this.columnNo);
          this.element.setAttribute("style", cellStyle);
        };

        return VGridCellContainer;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellContainer', VGridCellContainer);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsb0IscUJBQUEsYztBQUFnQixlLHFCQUFBLFM7QUFBVyxjLHFCQUFBLFE7QUFBVSxjLHFCQUFBLFE7O0FBR3BFLFcsVUFBQSxLOzs7b0NBT0ssa0IsV0FKWixRLFVBQ0EsY0FBYyxnQkFBZCxDLFVBQ0EsZUFBZSxLQUFmLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsQztBQVFDLG9DQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsU0FBNUIsRUFBdUM7QUFBQTs7QUFBQTs7QUFDckMsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7cUNBTUQsSSxpQkFBSyxjLEVBQWdCLGUsRUFBaUI7QUFDcEMsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCOztBQUdBLGNBQUksS0FBSyxRQUFULEVBQWtCO0FBQ2hCLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQUssY0FBeEIsRUFBd0M7QUFDdEMsOEJBQWdCLEtBQUssY0FEaUI7QUFFdEMscUNBQXVCLEtBQUs7QUFGVSxhQUF4QztBQUlEO0FBRUYsUzs7cUNBTUQsTyxzQkFBVSxDQUVULEM7O3FDQU1ELFEsdUJBQVc7QUFHVCxlQUFLLDJCQUFMOztBQUlBLGNBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLE9BQXhCLGdCQUE2QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGNBQXZCLENBQXNDLEtBQUssUUFBM0MsQ0FBN0Msa0JBQWdILEtBQUssS0FBTCxD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
