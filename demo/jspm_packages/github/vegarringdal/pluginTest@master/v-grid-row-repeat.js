/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridRowRepeat = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _dec3, _dec4, _class;

  var VGridRowRepeat = exports.VGridRowRepeat = (_dec = (0, _aureliaFramework.noView)(), _dec2 = (0, _aureliaFramework.customElement)('v-grid-row-repeat'), _dec3 = (0, _aureliaFramework.processContent)(false), _dec4 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid, _aureliaFramework.Container), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
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
  }()) || _class) || _class) || _class) || _class);
});