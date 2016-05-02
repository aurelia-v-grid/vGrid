'use strict';

System.register(['aurelia-framework', 'pikaday'], function (_export, _context) {
  var inject, customAttribute, pikaday, _createClass, _dec, _dec2, _class, DatePicker;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_pikaday) {
      pikaday = _pikaday.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('DatePicker', DatePicker = (_dec = customAttribute('v-grid-datepicker'), _dec2 = inject(Element), _dec(_class = _dec2(_class = function () {
        function DatePicker(element) {
          _classCallCheck(this, DatePicker);

          this.element = element;
        }

        DatePicker.prototype.attached = function attached() {
          var _this = this;

          var vm = this.VM;
          if (vm.attribute() === "date") {
            this.picker = new pikaday({
              field: this.element,
              onOpen: function onOpen(e) {
                if (!vm.editMode()) {
                  this.hide();
                }
              }
            });
          }

          $(this.element).on('change', function (e) {
            if (vm.editMode()) {
              {
                vm.setValue(e.target.value);
                if (vm.cellContent) {
                  vm.cellContent.onblur();
                  vm.setCss();
                }
              }
            } else {
              _this.picker.hide();
            }
          });
        };

        DatePicker.prototype.detached = function detached() {
          $(this.element).off('change');
        };

        _createClass(DatePicker, [{
          key: 'VM',
          get: function get() {
            var value = null;
            if (this.element) {
              if (this.element.au['v-grid-cell-row']) {
                value = this.element.au['v-grid-cell-row'].viewModel;
              } else {
                if (this.element.au['v-grid-cell-header']) {
                  value = this.element.au['v-grid-cell-header'].viewModel;
                }
              }
              return value;
            }
          }
        }, {
          key: 'isRow',
          get: function get() {
            var value = false;
            if (this.element) {
              if (this.element.au['v-grid-cell-row']) {
                value = true;
              }
              return value;
            }
          }
        }]);

        return DatePicker;
      }()) || _class) || _class));

      _export('DatePicker', DatePicker);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdRO0FBQVE7O0FBQ1Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFLTSxxQkFGWixnQkFBZ0IsbUJBQWhCLFdBQ0EsT0FBTyxPQUFQO0FBRUMsaUJBRFcsVUFDWCxDQUFZLE9BQVosRUFBcUI7Z0NBRFYsWUFDVTs7QUFDbkIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQURtQjtTQUFyQjs7QUFEVyw2QkFNWCwrQkFBVzs7O0FBRVQsY0FBSSxLQUFLLEtBQUssRUFBTCxDQUZBO0FBR1QsY0FBSSxHQUFHLFNBQUgsT0FBbUIsTUFBbkIsRUFBMkI7QUFDN0IsaUJBQUssTUFBTCxHQUFjLElBQUksT0FBSixDQUFZO0FBQ3hCLHFCQUFPLEtBQUssT0FBTDtBQUNQLHNCQUFRLGdCQUFVLENBQVYsRUFBYTtBQUNuQixvQkFBSSxDQUFDLEdBQUcsUUFBSCxFQUFELEVBQWdCO0FBQ2xCLHVCQUFLLElBQUwsR0FEa0I7aUJBQXBCO2VBRE07YUFGSSxDQUFkLENBRDZCO1dBQS9COztBQVdBLFlBQUUsS0FBSyxPQUFMLENBQUYsQ0FBZ0IsRUFBaEIsQ0FBbUIsUUFBbkIsRUFDRSxVQUFDLENBQUQsRUFBTztBQUNMLGdCQUFJLEdBQUcsUUFBSCxFQUFKLEVBQW1CO0FBQ2pCO0FBQ0UsbUJBQUcsUUFBSCxDQUFZLEVBQUUsTUFBRixDQUFTLEtBQVQsQ0FBWixDQURGO0FBRUUsb0JBQUcsR0FBRyxXQUFILEVBQWU7QUFDaEIscUJBQUcsV0FBSCxDQUFlLE1BQWYsR0FEZ0I7QUFFaEIscUJBQUcsTUFBSCxHQUZnQjtpQkFBbEI7ZUFIZTthQUFuQixNQVFPO0FBQ0wsb0JBQUssTUFBTCxDQUFZLElBQVosR0FESzthQVJQO1dBREYsQ0FERixDQWRTOzs7QUFOQSw2QkE4RFgsK0JBQVc7QUFDVCxZQUFFLEtBQUssT0FBTCxDQUFGLENBQWdCLEdBQWhCLENBQW9CLFFBQXBCLEVBRFM7OztxQkE5REE7OzhCQXNDRjtBQUNQLGdCQUFJLFFBQVEsSUFBUixDQURHO0FBRVAsZ0JBQUksS0FBSyxPQUFMLEVBQWM7QUFDaEIsa0JBQUksS0FBSyxPQUFMLENBQWEsRUFBYixDQUFnQixpQkFBaEIsQ0FBSixFQUF3QztBQUN0Qyx3QkFBUSxLQUFLLE9BQUwsQ0FBYSxFQUFiLENBQWdCLGlCQUFoQixFQUFtQyxTQUFuQyxDQUQ4QjtlQUF4QyxNQUVPO0FBQ0wsb0JBQUksS0FBSyxPQUFMLENBQWEsRUFBYixDQUFnQixvQkFBaEIsQ0FBSixFQUEyQztBQUN6QywwQkFBUSxLQUFLLE9BQUwsQ0FBYSxFQUFiLENBQWdCLG9CQUFoQixFQUFzQyxTQUF0QyxDQURpQztpQkFBM0M7ZUFIRjtBQU9BLHFCQUFPLEtBQVAsQ0FSZ0I7YUFBbEI7Ozs7OEJBWVU7QUFDVixnQkFBSSxRQUFRLEtBQVIsQ0FETTtBQUVWLGdCQUFJLEtBQUssT0FBTCxFQUFjO0FBQ2hCLGtCQUFJLEtBQUssT0FBTCxDQUFhLEVBQWIsQ0FBZ0IsaUJBQWhCLENBQUosRUFBd0M7QUFDdEMsd0JBQVEsSUFBUixDQURzQztlQUF4QztBQUdBLHFCQUFPLEtBQVAsQ0FKZ0I7YUFBbEI7Ozs7ZUF0RFMiLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
