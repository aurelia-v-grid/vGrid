'use strict';

System.register(['aurelia-framework', '../v-grid'], function (_export, _context) {
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

        vGridAttributesImageFix.prototype.valueChanged = function valueChanged(newValue, oldValue) {
          this.element.src = "";
          this.element.src = this.value || newValue;
        };

        vGridAttributesImageFix.prototype.bind = function bind(bindingContext, overrideContext) {
          this.element.src = "";
          this.element.src = this.value || "";
        };

        return vGridAttributesImageFix;
      }()) || _class) || _class));

      _export('vGridAttributesImageFix', vGridAttributesImageFix);
    }
  };
});
//# sourceMappingURL=v-image.js.map
