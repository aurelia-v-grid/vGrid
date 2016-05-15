'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _dec4, _class, VGridCellContainer;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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
      _export('VGridCellContainer', VGridCellContainer = (_dec = noView(), _dec2 = customElement('v-grid-col-repeat'), _dec3 = processContent(false), _dec4 = inject(Element, VGrid, Container), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
        function VGridCellContainer(element, vGrid, container) {
          _classCallCheck(this, VGridCellContainer);

          this.element = element;
          this.container = container;
          this.vGrid = vGrid;
        }

        VGridCellContainer.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          this.vGrid.vGridConfig.repeater = true;
          this.vGrid.vGridConfig.repeatTemplate = this.element.innerHTML;
        };

        return VGridCellContainer;
      }()) || _class) || _class) || _class) || _class));

      _export('VGridCellContainer', VGridCellContainer);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY29sLXJlcGVhdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFRO0FBQWU7QUFBZ0I7QUFBVztBQUFVOztBQUNwRTs7O29DQU9LLDZCQUpaLGtCQUNBLGNBQWMsbUJBQWQsV0FDQSxlQUFlLEtBQWYsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkI7QUFPQyxpQkFOVyxrQkFNWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsU0FBNUIsRUFBdUM7Z0NBTjVCLG9CQU00Qjs7QUFDckMsZUFBSyxPQUFMLEdBQWUsT0FBZixDQURxQztBQUVyQyxlQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FGcUM7QUFHckMsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUhxQztTQUF2Qzs7QUFOVyxxQ0FpQlgscUJBQUssZ0JBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QixDQURtQjtBQUVuQixlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFFBQXZCLEdBQWtDLElBQWxDLENBRm1CO0FBR25CLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsR0FBd0MsS0FBSyxPQUFMLENBQWEsU0FBYixDQUhyQjs7O2VBakJWIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yb3ctY29sLXJlcGVhdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
