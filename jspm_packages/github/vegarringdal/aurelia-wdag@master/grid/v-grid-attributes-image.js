/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vGridAttributesImageFix = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var vGridAttributesImageFix = exports.vGridAttributesImageFix = (_dec = (0, _aureliaFramework.customAttribute)('v-image-fix'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec(_class = _dec2(_class = function () {
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
  }()) || _class) || _class);
});