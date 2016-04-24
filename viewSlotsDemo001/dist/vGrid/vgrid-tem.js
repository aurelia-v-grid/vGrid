'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var BoundViewFactory, ViewSlot, customAttribute, templateController, inject, _dec, _dec2, _class, VgridTemp;

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
      _export('VgridTemp', VgridTemp = (_dec = customAttribute('vgrid-temp'), _dec2 = inject(BoundViewFactory, ViewSlot), _dec(_class = templateController(_class = _dec2(_class = function () {
        function VgridTemp(viewFactory, viewSlot) {
          _classCallCheck(this, VgridTemp);

          this.viewFactory = viewFactory;
          this.viewSlot = viewSlot;
        }

        VgridTemp.prototype.valueChanged = function valueChanged(newValue) {
          if (newValue) {
            debugger;
          } else {
              debugger;
            }
        };

        return VgridTemp;
      }()) || _class) || _class) || _class));

      _export('VgridTemp', VgridTemp);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3ZncmlkLXRlbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR1E7QUFBa0I7QUFBVTtBQUFpQjtBQUFvQjs7OzJCQUs1RCxvQkFIWixnQkFBZ0IsWUFBaEIsV0FFQSxPQUFPLGdCQUFQLEVBQXlCLFFBQXpCLGlCQURBO0FBR0MsaUJBRFcsU0FDWCxDQUFZLFdBQVosRUFBeUIsUUFBekIsRUFBbUM7Z0NBRHhCLFdBQ3dCOztBQUNqQyxlQUFLLFdBQUwsR0FBbUIsV0FBbkIsQ0FEaUM7QUFFakMsZUFBSyxRQUFMLEdBQWdCLFFBQWhCLENBRmlDO1NBQW5DOztBQURXLDRCQU1YLHFDQUFhLFVBQVU7QUFDckIsY0FBSSxRQUFKLEVBQWM7QUFDWixxQkFEWTtXQUFkLE1BSU87QUFDTCx1QkFESzthQUpQOzs7ZUFQUyIsImZpbGUiOiJ2R3JpZC92Z3JpZC10ZW0uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
