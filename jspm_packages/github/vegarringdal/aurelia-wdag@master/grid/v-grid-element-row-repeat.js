/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridElementRowRepeat = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _dec3, _dec4, _class;

  var VGridElementRowRepeat = exports.VGridElementRowRepeat = (_dec = (0, _aureliaFramework.noView)(), _dec2 = (0, _aureliaFramework.customElement)('v-grid-row-repeat'), _dec3 = (0, _aureliaFramework.processContent)(function (compiler, resources, element, instruction) {

    var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
    var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
    if (headerTemplateHtml !== '') {
      instruction.headerTemplate = headerTemplateHtml;
    }

    var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
    var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
    if (rowTemplateHtml !== '') {
      instruction.rowTemplate = rowTemplateHtml;
    }

    if (!rowTemplateHtml) {
      instruction.rowTemplate = element.innerHTML;
    }

    element.innerHTML = '';
  }), _dec4 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid, _aureliaFramework.TargetInstruction), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
    function VGridElementRowRepeat(element, vGrid, targetInstruction) {
      _classCallCheck(this, VGridElementRowRepeat);

      this.element = element;
      this.vGrid = vGrid;
      this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
      this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
    }

    VGridElementRowRepeat.prototype.bind = function bind(bindingContext) {
      this.bindingContext = bindingContext;
      this.vGrid.vGridConfig.repeater = true;
      this.vGrid.vGridConfig.repeatRowTemplate = this.rowTemplate;
      this.vGrid.vGridConfig.repeatRowHeaderTemplate = this.headerTemplate;
    };

    return VGridElementRowRepeat;
  }()) || _class) || _class) || _class) || _class);
});