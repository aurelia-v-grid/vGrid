/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vGridAttributesObserveField = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var vGridAttributesObserveField = exports.vGridAttributesObserveField = (_dec = (0, _aureliaFramework.customAttribute)('v-observe-field'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid, _aureliaFramework.BindingEngine), _dec(_class = _dec2(_class = function () {
    function vGridAttributesObserveField(element, vGrid, bindingEngine) {
      _classCallCheck(this, vGridAttributesObserveField);

      this.vGrid = vGrid;
      this.element = element;
      this.timer = null;
      this.bindingEngine = bindingEngine;
    }

    vGridAttributesObserveField.prototype.bind = function bind(bindingContext, overrideContext) {
      var _this = this;

      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;

      if (this.propertyObserver) {
        this.propertyObserver.dispose();
        this.propertyObserver = null;
      }

      var attribute = this.value;

      if (attribute && this.bindingContext.rowRef) {
        this.vGrid.vGridObservables.disableObservablesAttributes();

        var attAttributeObserve = this.vGrid.vGridConfig.attAttributeObserve;
        var _attribute = this.value;

        if (attAttributeObserve.indexOf(_attribute) === -1 && _attribute) {
          attAttributeObserve.push(_attribute);
        }

        this.vGrid.vGridObservables.enableObservablesAttributes();

        this.propertyObserver = this.bindingEngine.propertyObserver(this.bindingContext.rowRef, this.value).subscribe(function (newValue, oldValue) {
          var newValueCheck = newValue !== undefined && newValue !== null ? newValue.toString() : newValue;
          var oldValueCheck = oldValue !== undefined && oldValue !== null ? oldValue.toString() : oldValue;

          if (newValueCheck !== oldValueCheck && _this.vGrid.vGridCurrentEntityRef) {
            _this.vGrid.vGridCurrentEntity[_this.value] = newValue;
          }
        });
      }
    };

    vGridAttributesObserveField.prototype.unbind = function unbind() {
      if (this.propertyObserver) {
        this.propertyObserver.dispose();
        this.propertyObserver = null;
      }
    };

    return vGridAttributesObserveField;
  }()) || _class) || _class);
});