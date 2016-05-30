'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, vGridAttributesImageFix;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
      Optional = _aureliaFramework.Optional;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vGridAttributesImageFix', vGridAttributesImageFix = (_dec = customAttribute('v-image-fix'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridAttributesImageFix(element, vGrid) {
          _classCallCheck(this, vGridAttributesImageFix);

          this.vGrid = vGrid;
          this.element = element;
        }

        vGridAttributesImageFix.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;

          var x = this.element.src;
          this.element.src = "";
          this.element.src = x;
        };

        vGridAttributesImageFix.prototype.attached = function attached() {};

        return vGridAttributesImageFix;
      }()) || _class) || _class));

      _export('vGridAttributesImageFix', vGridAttributesImageFix);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWltYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUtRLFkscUJBQUEsTTtBQUFRLHFCLHFCQUFBLGU7QUFBaUIsYyxxQkFBQSxROztBQUN6QixXLFVBQUEsSzs7O3lDQUtLLHVCLFdBRlosZ0JBQWdCLGFBQWhCLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsQztBQUdDLHlDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7QUFBQTs7QUFDMUIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDRDs7MENBR0QsSSxpQkFBSyxjLEVBQWdCLGUsRUFBaUI7QUFDcEMsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCOztBQUVBLGNBQUksSUFBSSxLQUFLLE9BQUwsQ0FBYSxHQUFyQjtBQUNBLGVBQUssT0FBTCxDQUFhLEdBQWIsR0FBbUIsRUFBbkI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxHQUFiLEdBQW1CLENBQW5CO0FBQ0QsUzs7MENBRUQsUSx1QkFBVyxDQUVWLEMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWF0dHJpYnV0ZXMtaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
