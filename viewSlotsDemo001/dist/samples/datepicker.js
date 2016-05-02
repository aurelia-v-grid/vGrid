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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvZGF0ZXBpY2tlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQXdCQSxXQUFTLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkI7QUFDekIsUUFBSSxRQUFRLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFSLENBRHFCO0FBRXpCLFVBQU0sU0FBTixDQUFnQixJQUFoQixFQUFzQixJQUF0QixFQUE0QixJQUE1QixFQUZ5QjtBQUd6QixXQUFPLEtBQVAsQ0FIeUI7R0FBM0I7O0FBTUEsV0FBUyxTQUFULENBQW1CLE9BQW5CLEVBQTRCLElBQTVCLEVBQWtDO0FBQ2hDLFFBQUksUUFBUSxZQUFZLElBQVosQ0FBUixDQUQ0QjtBQUVoQyxZQUFRLGFBQVIsQ0FBc0IsS0FBdEIsRUFGZ0M7R0FBbEM7OztBQTNCUTtBQUFROztBQUNUOzs7NEJBSU0scUJBRlosZ0JBQWdCLGFBQWhCLFdBQ0EsT0FBTyxPQUFQO0FBRUMsaUJBRFcsVUFDWCxDQUFZLE9BQVosRUFBcUI7Z0NBRFYsWUFDVTs7QUFDbkIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQURtQjtTQUFyQjs7QUFEVyw2QkFLWCwrQkFBVztBQUVULGNBQUksU0FBUyxJQUFJLE9BQUosQ0FBWSxFQUFFLE9BQU8sS0FBSyxPQUFMLEVBQXJCLENBQVQsQ0FGSztBQUdULFlBQUUsS0FBSyxPQUFMLENBQUYsQ0FBZ0IsRUFBaEIsQ0FBbUIsUUFBbkIsRUFBNkI7bUJBQUssVUFBVSxFQUFFLE1BQUYsRUFBVSxPQUFwQjtXQUFMLENBQTdCLENBSFM7OztBQUxBLDZCQVdYLCtCQUFXO0FBQ1QsWUFBRSxLQUFLLE9BQUwsQ0FBRixDQUFnQixHQUFoQixDQUFvQixRQUFwQixFQURTOzs7ZUFYQSIsImZpbGUiOiJzYW1wbGVzL2RhdGVwaWNrZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
