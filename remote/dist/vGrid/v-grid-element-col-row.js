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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1lbGVtZW50LWNvbC1yb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxvQixxQkFBQSxjO0FBQWdCLGUscUJBQUEsUztBQUFXLGMscUJBQUEsUTtBQUFVLGMscUJBQUEsUTs7QUFHcEUsVyxVQUFBLEs7OztvQ0FPSyxrQixXQUpaLFEsVUFDQSxjQUFjLGdCQUFkLEMsVUFDQSxlQUFlLEtBQWYsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixFQUF1QixTQUF2QixDO0FBUUMsb0NBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztBQUFBOztBQUFBOztBQUNyQyxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0EsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNEOztxQ0FNRCxJLGlCQUFLLGMsRUFBZ0IsZSxFQUFpQjtBQUNwQyxlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7O0FBR0EsY0FBSSxLQUFLLFFBQVQsRUFBa0I7QUFDaEIsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxjQUF4QixFQUF3QztBQUN0Qyw4QkFBZ0IsS0FBSyxjQURpQjtBQUV0QyxxQ0FBdUIsS0FBSztBQUZVLGFBQXhDO0FBSUQ7QUFFRixTOztxQ0FNRCxPLHNCQUFVLENBRVQsQzs7cUNBTUQsUSx1QkFBVztBQUdULGVBQUssMkJBQUw7O0FBSUEsY0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsT0FBeEIsZ0JBQTZDLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsbUJBQXZCLENBQTJDLEtBQUssUUFBaEQsQ0FBN0Msa0JBQXFILEtBQUssS0FBTCxDQUFXLGFBQWhJLENBQWxCO0FBQ0EsY0FBSSxPQUFPLFlBQVksTUFBWixDQUFtQixLQUFLLFNBQXhCLENBQVg7O0FBR0EsZUFBSyxRQUFMLEdBQWdCLElBQUksUUFBSixDQUFhLEtBQUssT0FBbEIsRUFBMkIsSUFBM0IsQ0FBaEI7QUFDQSxlQUFLLFFBQUwsQ0FBYyxHQUFkLENBQWtCLElBQWxCO0FBQ0EsZUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLGNBQXhCLEVBQXdDO0FBQ3RDLDRCQUFnQixLQUFLLGNBRGlCO0FBRXRDLG1DQUF1QixLQUFLO0FBRlUsV0FBeEM7QUFJQSxlQUFLLFFBQUwsQ0FBYyxRQUFkOztBQUlBLGVBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLG9CQUE5QixFQUFvRCxVQUFVLENBQVYsRUFBYTtBQUMvRCxpQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixrQkFBdEIsRUFBMEM7QUFDeEMsbUJBQUssQ0FEbUM7QUFFeEMsb0JBQU0sS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsS0FBSyxLQUFMLENBQVcsZUFBOUMsQ0FGa0M7QUFHeEMsbUJBQUssS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFLLEtBQUwsQ0FBVyxlQUE5QyxFQUErRCxLQUFLLEtBQUwsQ0FBVyxXQUExRSxDQUExQjtBQUhtQyxhQUExQztBQUtELFdBTm1ELENBTWxELElBTmtELENBTTdDLElBTjZDLENBQXBEOztBQVVBLGVBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLGlCQUE5QixFQUFpRCxVQUFVLENBQVYsRUFBYTtBQUM1RCxpQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixlQUF0QixFQUF1QztBQUNyQyxtQkFBSyxDQURnQztBQUVyQyxvQkFBTSxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFLLEtBQUwsQ0FBVyxlQUE5QyxDQUYrQjtBQUdyQyxtQkFBSyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEtBQUssS0FBTCxDQUFXLGVBQTlDLEVBQStELEtBQUssS0FBTCxDQUFXLFdBQTFFLENBQTFCO0FBSGdDLGFBQXZDO0FBS0QsV0FOZ0QsQ0FNL0MsSUFOK0MsQ0FNMUMsSUFOMEMsQ0FBakQ7QUFRRCxTOztxQ0FTRCxNLHFCQUFTO0FBQ1AsaUJBQU8sU0FBUyxLQUFLLE9BQUwsQ0FBYSxVQUFiLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLENBQVQsQ0FBUDtBQUNELFM7O3FDQUtELDJCLDBDQUE4QjtBQUM1QixjQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUFqQztBQUNBLGNBQUksdUJBQXFCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLEtBQUssUUFBN0MsQ0FBckIsT0FBSjtBQUNBLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxPQUEvQjtBQUNBLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBSSxTQUFKLEdBQWdCLEtBQUssUUFBaEQ7QUFDQSxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQUksVUFBSixHQUFpQixLQUFLLFFBQWpEO0FBQ0EsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixPQUExQixFQUFtQyxTQUFuQztBQUNELFM7OztvRkF4R0EsUSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtZWxlbWVudC1jb2wtcm93LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
