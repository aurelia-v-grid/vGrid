'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, _dec, _dec2, _class, vGridAttributesImageFix;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWltYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUtRLFkscUJBQUEsTTtBQUFRLHFCLHFCQUFBLGU7O0FBQ1IsVyxVQUFBLEs7Ozt5Q0FLSyx1QixXQUZaLGdCQUFnQixhQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFHQyx5Q0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7OzBDQUdELEksaUJBQUssYyxFQUFnQixlLEVBQWlCO0FBQ3BDLGVBQUssY0FBTCxHQUFzQixjQUF0QjtBQUNBLGVBQUssZUFBTCxHQUF1QixlQUF2Qjs7QUFFQSxjQUFJLElBQUksS0FBSyxPQUFMLENBQWEsR0FBckI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxHQUFiLEdBQW1CLEVBQW5CO0FBQ0EsZUFBSyxPQUFMLENBQWEsR0FBYixHQUFtQixDQUFuQjtBQUNELFM7OzBDQUVELFEsdUJBQVcsQ0FFVixDIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWltYWdlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
