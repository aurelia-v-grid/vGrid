'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var BoundViewFactory, ViewSlot, customAttribute, templateController, inject, _dec, _dec2, _class, VGridTemp;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      BoundViewFactory = _aureliaFramework.BoundViewFactory;
      ViewSlot = _aureliaFramework.ViewSlot;
      customAttribute = _aureliaFramework.customAttribute;
      templateController = _aureliaFramework.templateController;
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('VGridTemp', VGridTemp = (_dec = customAttribute('v-grid-temp'), _dec2 = inject(BoundViewFactory, ViewSlot), _dec(_class = templateController(_class = _dec2(_class = function () {
        function VGridTemp(viewFactory, viewSlot) {
          _classCallCheck(this, VGridTemp);

          this.viewFactory = viewFactory;
          this.viewSlot = viewSlot;
        }

        VGridTemp.prototype.created = function created(x, y) {};

        VGridTemp.prototype.attached = function attached(x, y) {};

        VGridTemp.prototype.bind = function bind(x, y, t) {
          debugger;
          x.myGrid.rowViewFactory = this.viewFactory;
        };

        VGridTemp.prototype.valueChanged = function valueChanged(newValue) {
          if (newValue) {
            debugger;
            var view = this.viewFactory.create();
            this.viewSlot.add(view);
          } else {
            debugger;
            this.viewSlot.removeAll();
          }
        };

        return VGridTemp;
      }()) || _class) || _class) || _class));

      _export('VGridTemp', VGridTemp);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC10ZW1wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHUTtBQUFrQjtBQUFVO0FBQWlCO0FBQW9COzs7MkJBSzVELG9CQUhaLGdCQUFnQixhQUFoQixXQUVBLE9BQU8sZ0JBQVAsRUFBeUIsUUFBekIsaUJBREE7QUFHQyxpQkFEVyxTQUNYLENBQVksV0FBWixFQUF5QixRQUF6QixFQUFtQztnQ0FEeEIsV0FDd0I7O0FBQ2pDLGVBQUssV0FBTCxHQUFtQixXQUFuQixDQURpQztBQUVqQyxlQUFLLFFBQUwsR0FBZ0IsUUFBaEIsQ0FGaUM7U0FBbkM7O0FBRFcsNEJBTVgsMkJBQVEsR0FBRyxHQUFFOztBQU5GLDRCQVVYLDZCQUFTLEdBQUcsR0FBRTs7QUFWSCw0QkFjWCxxQkFBSyxHQUFHLEdBQUcsR0FBRTtBQUNYLG1CQURXO0FBRVgsWUFBRSxNQUFGLENBQVMsY0FBVCxHQUEwQixLQUFLLFdBQUwsQ0FGZjs7O0FBZEYsNEJBbUJYLHFDQUFhLFVBQVU7QUFDckIsY0FBSSxRQUFKLEVBQWM7QUFDWixxQkFEWTtBQUVaLGdCQUFJLE9BQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLEVBQVAsQ0FGUTtBQUdaLGlCQUFLLFFBQUwsQ0FBYyxHQUFkLENBQWtCLElBQWxCLEVBSFk7V0FBZCxNQUlPO0FBQ0wscUJBREs7QUFFTCxpQkFBSyxRQUFMLENBQWMsU0FBZCxHQUZLO1dBSlA7OztlQXBCUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtdGVtcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
