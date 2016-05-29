'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, VGridCellRowHeader;

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
      _export('VGridCellRowHeader', VGridCellRowHeader = (_dec = customElement('v-grid-header-col'), _dec2 = processContent(false), _dec3 = inject(Element, VGrid, Container), noView(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridCellRowHeader(element, vGrid, container) {
          _classCallCheck(this, VGridCellRowHeader);

          _initDefineProp(this, 'columnNo', _descriptor, this);

          this.element = element;
          this.vGrid = vGrid;
          this.container = container;
          this.vGridConfig = vGrid.vGridConfig;
        }

        VGridCellRowHeader.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
        };

        VGridCellRowHeader.prototype.created = function created() {};

        VGridCellRowHeader.prototype.attached = function attached() {
          this.setStandardClassesAndStyles();

          var tempHtml = this.vGridConfig.colHeaderTemplateArray[this.columnNo];
          var viewFactory = this.vGrid.viewCompiler.compile('<template>' + tempHtml + '</template>', this.vGrid.viewResources);

          var view = viewFactory.create(this.container);
          this.viewSlot = new ViewSlot(this.element, true);
          this.viewSlot.add(view);
          this.viewSlot.bind(this);
          this.viewSlot.attached();
        };

        VGridCellRowHeader.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
          this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
          this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
          this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
          this.element.style.height = '100%';
          this.element.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + 'px';
        };

        return VGridCellRowHeader;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCellRowHeader', VGridCellRowHeader);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1lbGVtZW50LWNvbC1oZWFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxvQixxQkFBQSxjO0FBQWdCLGUscUJBQUEsUztBQUFXLGMscUJBQUEsUTtBQUFVLGMscUJBQUEsUTs7QUFJcEUsVyxVQUFBLEs7OztvQ0FPSyxrQixXQUhaLGNBQWMsbUJBQWQsQyxVQUNBLGVBQWUsS0FBZixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEVBQXVCLFNBQXZCLEMsRUFIQSxNO0FBV0Msb0NBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztBQUFBOztBQUFBOztBQUNyQyxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQXpCO0FBQ0Q7O3FDQU1ELEksaUJBQUssYyxFQUFnQjtBQUNuQixlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDRCxTOztxQ0FNRCxPLHNCQUFVLENBRVQsQzs7cUNBTUQsUSx1QkFBVztBQUNULGVBQUssMkJBQUw7O0FBRUEsY0FBSSxXQUFXLEtBQUssV0FBTCxDQUFpQixzQkFBakIsQ0FBd0MsS0FBSyxRQUE3QyxDQUFmO0FBQ0EsY0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsT0FBeEIsZ0JBQTZDLFFBQTdDLGtCQUFvRSxLQUFLLEtBQUwsQ0FBVyxhQUEvRSxDQUFsQjs7QUFFQSxjQUFJLE9BQU8sWUFBWSxNQUFaLENBQW1CLEtBQUssU0FBeEIsQ0FBWDtBQUNBLGVBQUssUUFBTCxHQUFnQixJQUFJLFFBQUosQ0FBYSxLQUFLLE9BQWxCLEVBQTJCLElBQTNCLENBQWhCO0FBQ0EsZUFBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixJQUFsQjtBQUNBLGVBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkI7QUFDQSxlQUFLLFFBQUwsQ0FBYyxRQUFkO0FBRUQsUzs7cUNBSUQsMkIsMENBQThCO0FBQzVCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGFBQWhEO0FBQ0EsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsZUFBckIsR0FBdUMsS0FBSyxRQUF2RTtBQUNBLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFVBQXJCLEdBQWtDLEtBQUssUUFBbEU7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixLQUFuQixHQUEyQixLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLEtBQUssUUFBdkMsSUFBbUQsSUFBOUU7QUFDRCxTOzs7b0ZBdkRBLFEiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWVsZW1lbnQtY29sLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
