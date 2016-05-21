'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _dec4, _class, VGridRowRepeat;

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
      _export('VGridRowRepeat', VGridRowRepeat = (_dec = noView(), _dec2 = customElement('v-grid-row-repeat'), _dec3 = processContent(false), _dec4 = inject(Element, VGrid, Container), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
        function VGridRowRepeat(element, vGrid, container) {
          _classCallCheck(this, VGridRowRepeat);

          this.element = element;
          this.container = container;
          this.vGrid = vGrid;
        }

        VGridRowRepeat.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          this.vGrid.vGridConfig.repeater = true;
          this.vGrid.vGridConfig.repeatTemplate = this.element.innerHTML;
        };

        return VGridRowRepeat;
      }()) || _class) || _class) || _class) || _class));

      _export('VGridRowRepeat', VGridRowRepeat);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctcmVwZWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxvQixxQkFBQSxjO0FBQWdCLGUscUJBQUEsUztBQUFXLGMscUJBQUEsUTtBQUFVLGMscUJBQUEsUTs7QUFHcEUsVyxVQUFBLEs7OztnQ0FPSyxjLFdBSlosUSxVQUNBLGNBQWMsbUJBQWQsQyxVQUNBLGVBQWUsS0FBZixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEVBQXVCLFNBQXZCLEM7QUFPQyxnQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCLFNBQTVCLEVBQXVDO0FBQUE7O0FBQ3JDLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBRUQ7O2lDQU1ELEksaUJBQUssYyxFQUFnQjtBQUNuQixlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFFBQXZCLEdBQWtDLElBQWxDO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixjQUF2QixHQUF3QyxLQUFLLE9BQUwsQ0FBYSxTQUFyRDtBQUNELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXJvdy1yZXBlYXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
