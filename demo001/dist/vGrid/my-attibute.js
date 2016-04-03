'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var inject, customAttribute, DOM, noView, _dec, _dec2, _class, myAttribute;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
      DOM = _aureliaFramework.DOM;
      noView = _aureliaFramework.noView;
    }],
    execute: function () {
      _export('myAttribute', myAttribute = (_dec = customAttribute('my-attribute'), _dec2 = inject(DOM.Element), noView(_class = _dec(_class = _dec2(_class = function () {
        function myAttribute(element) {
          _classCallCheck(this, myAttribute);

          this.element = element;
          console.log("used");
        }

        myAttribute.prototype.attached = function attached() {
          console.log(this.value);
          console.log("attached");
        };

        myAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {
          debugger;
        };

        return myAttribute;
      }()) || _class) || _class) || _class));

      _export('myAttribute', myAttribute);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL215LWF0dGlidXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUTtBQUFRO0FBQWlCO0FBQUs7Ozs2QkFLekIsc0JBRlosZ0JBQWdCLGNBQWhCLFdBQ0EsT0FBTyxJQUFJLE9BQUosR0FGUDtBQUlDLGlCQURXLFdBQ1gsQ0FBWSxPQUFaLEVBQXFCO2dDQURWLGFBQ1U7O0FBQ25CLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEbUI7QUFFbkIsa0JBQVEsR0FBUixDQUFZLE1BQVosRUFGbUI7U0FBckI7O0FBRFcsOEJBTVgsK0JBQVU7QUFDUixrQkFBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVosQ0FEUTtBQUVSLGtCQUFRLEdBQVIsQ0FBWSxVQUFaLEVBRlE7OztBQU5DLDhCQVdYLHFDQUFhLFVBQVUsVUFBVTtBQUMvQixtQkFEK0I7OztlQVh0QiIsImZpbGUiOiJ2R3JpZC9teS1hdHRpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
