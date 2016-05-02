'use strict';

System.register(['aurelia-framework', 'pikaday'], function (_export, _context) {
  var inject, customAttribute, pikaday, _dec, _dec2, _class, DatePicker;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function createEvent(name) {
    var event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
  }

  function fireEvent(element, name) {
    var event = createEvent(name);
    element.dispatchEvent(event);
  }
  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_pikaday) {
      pikaday = _pikaday.default;
    }],
    execute: function () {
      _export('DatePicker', DatePicker = (_dec = customAttribute('date-picker'), _dec2 = inject(Element), _dec(_class = _dec2(_class = function () {
        function DatePicker(element) {
          _classCallCheck(this, DatePicker);

          this.element = element;
        }

        DatePicker.prototype.attached = function attached() {
          var picker = new pikaday({ field: this.element });
          $(this.element).on('change', function (e) {
            return fireEvent(e.target, 'input');
          });
        };

        DatePicker.prototype.detached = function detached() {
          $(this.element).off('change');
        };

        return DatePicker;
      }()) || _class) || _class));

      _export('DatePicker', DatePicker);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL2RhdGVwaWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUF3QkEsV0FBUyxXQUFULENBQXFCLElBQXJCLEVBQTJCO0FBQ3pCLFFBQUksUUFBUSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsQ0FBUixDQURxQjtBQUV6QixVQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFGeUI7QUFHekIsV0FBTyxLQUFQLENBSHlCO0dBQTNCOztBQU1BLFdBQVMsU0FBVCxDQUFtQixPQUFuQixFQUE0QixJQUE1QixFQUFrQztBQUNoQyxRQUFJLFFBQVEsWUFBWSxJQUFaLENBQVIsQ0FENEI7QUFFaEMsWUFBUSxhQUFSLENBQXNCLEtBQXRCLEVBRmdDO0dBQWxDOzs7QUEzQlE7QUFBUTs7QUFDVDs7OzRCQUlNLHFCQUZaLGdCQUFnQixhQUFoQixXQUNBLE9BQU8sT0FBUDtBQUVDLGlCQURXLFVBQ1gsQ0FBWSxPQUFaLEVBQXFCO2dDQURWLFlBQ1U7O0FBQ25CLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEbUI7U0FBckI7O0FBRFcsNkJBS1gsK0JBQVc7QUFFVCxjQUFJLFNBQVMsSUFBSSxPQUFKLENBQVksRUFBRSxPQUFPLEtBQUssT0FBTCxFQUFyQixDQUFULENBRks7QUFHVCxZQUFFLEtBQUssT0FBTCxDQUFGLENBQWdCLEVBQWhCLENBQW1CLFFBQW5CLEVBQTZCO21CQUFLLFVBQVUsRUFBRSxNQUFGLEVBQVUsT0FBcEI7V0FBTCxDQUE3QixDQUhTOzs7QUFMQSw2QkFXWCwrQkFBVztBQUNULFlBQUUsS0FBSyxPQUFMLENBQUYsQ0FBZ0IsR0FBaEIsQ0FBb0IsUUFBcEIsRUFEUzs7O2VBWEEiLCJmaWxlIjoidkdyaWQvZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
