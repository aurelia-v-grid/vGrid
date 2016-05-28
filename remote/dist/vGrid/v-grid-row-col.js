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

          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.vGrid.vGridConfig.colRowTemplateArray[this.columnNo] + '</template>', this.vGrid.viewResources);
          var view = viewFactory.create(this.container);

          this.viewSlot = new ViewSlot(this.element, true);
          this.viewSlot.add(view);
          this.viewSlot.bind(this.bindingContext, {
            bindingContext: this.bindingContext,
            parentOverrideContext: this.overrideContext
          });
          this.viewSlot.attached();

          this.element.addEventListener("eventOnRowDblClick", function (e) {
            this.vGrid.raiseEvent("v-row-ondblclick", {
              evt: e,
              data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
              row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
            });
          }.bind(this));

          this.element.addEventListener("eventOnRowClick", function (e) {
            this.vGrid.raiseEvent("v-row-onclick", {
              evt: e,
              data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
              row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY29sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsb0IscUJBQUEsYztBQUFnQixlLHFCQUFBLFM7QUFBVyxjLHFCQUFBLFE7QUFBVSxjLHFCQUFBLFE7O0FBR3BFLFcsVUFBQSxLOzs7b0NBT0ssa0IsV0FKWixRLFVBQ0EsY0FBYyxnQkFBZCxDLFVBQ0EsZUFBZSxLQUFmLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsQztBQVFDLG9DQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsU0FBNUIsRUFBdUM7QUFBQTs7QUFBQTs7QUFDckMsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7cUNBTUQsSSxpQkFBSyxjLEVBQWdCLGUsRUFBaUI7QUFDcEMsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCOztBQUdBLGNBQUksS0FBSyxRQUFULEVBQWtCO0FBQ2hCLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQUssY0FBeEIsRUFBd0M7QUFDdEMsOEJBQWdCLEtBQUssY0FEaUI7QUFFdEMscUNBQXVCLEtBQUs7QUFGVSxhQUF4QztBQUlEO0FBRUYsUzs7cUNBTUQsTyxzQkFBVSxDQUVULEM7O3FDQU1ELFEsdUJBQVc7QUFHVCxlQUFLLDJCQUFMOztBQUlBLGNBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLE9BQXhCLGdCQUE2QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLG1CQUF2QixDQUEyQyxLQUFLLFFBQWhELENBQTdDLGtCQUFxSCxLQUFLLEtBQUws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
