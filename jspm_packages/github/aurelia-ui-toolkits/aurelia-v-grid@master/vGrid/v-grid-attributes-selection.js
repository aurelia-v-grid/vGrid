/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vGridAttributesSelection = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var vGridAttributesSelection = exports.vGridAttributesSelection = (_dec = (0, _aureliaFramework.customAttribute)('v-selection'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec(_class = _dec2(_class = function () {
    function vGridAttributesSelection(element, vGrid) {
      _classCallCheck(this, vGridAttributesSelection);

      this.vGrid = vGrid;
      this.element = element;
      this.false = true;
    }

    vGridAttributesSelection.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
      if (this.created) {
        this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
        this.element.checked = this.selected;
      }
    };

    vGridAttributesSelection.prototype.attached = function attached() {
      var _this = this;

      this.created = true;
      this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
      this.element.checked = this.selected;

      this.element.onclick = function () {

        var status = _this.element.checked === "true" || _this.element.checked === true ? true : false;

        if (status) {
          if (_this.value === "header") {
            _this.vGrid.vGridSelection.selectAll();
            _this.vGrid.vGridGenerator.rebindAllRowSlots();
          }
          if (_this.value === "row") {
            _this.vGrid.vGridSelection.select(_this.bindingContext.row, true);
            _this.vGrid.vGridGenerator.rebindRowNumber(_this.bindingContext.row);
          }
        } else {

          if (_this.value === "header") {
            _this.vGrid.vGridSelection.deSelectAll();
            _this.vGrid.vGridGenerator.rebindAllRowSlots();
          }

          if (_this.value === "row") {
            _this.vGrid.vGridSelection.deSelect(_this.bindingContext.row, true);
            _this.vGrid.vGridGenerator.rebindRowNumber(_this.bindingContext.row);
          }
        }
      };
    };

    return vGridAttributesSelection;
  }()) || _class) || _class);
});