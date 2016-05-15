'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, noView, customElement, processContent, Container, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _dec4, _class, VGridCellContainer;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      Container = _aureliaFramework.Container;
      bindable = _aureliaFramework.bindable;
      ViewSlot = _aureliaFramework.ViewSlot;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridCellContainer', VGridCellContainer = (_dec = noView(), _dec2 = customElement('v-grid-col-repeat'), _dec3 = processContent(false), _dec4 = inject(Element, VGrid, Container), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
        function VGridCellContainer(element, vGrid, container) {
          _classCallCheck(this, VGridCellContainer);

          this.element = element;
          this.container = container;
          this.vGrid = vGrid;
        }

        VGridCellContainer.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          this.vGrid.vGridConfig.repeater = true;
          this.vGrid.vGridConfig.repeatTemplate = this.element.innerHTML;
        };

        return VGridCellContainer;
      }()) || _class) || _class) || _class) || _class));

      _export('VGridCellContainer', VGridCellContainer);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb2wtcmVwZWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFNUTtBQUFRO0FBQVE7QUFBZTtBQUFnQjtBQUFXO0FBQVU7O0FBQ3BFOzs7b0NBT0ssNkJBSlosa0JBQ0EsY0FBYyxtQkFBZCxXQUNBLGVBQWUsS0FBZixXQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixFQUF1QixTQUF2QjtBQU9DLGlCQU5XLGtCQU1YLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUF1QztnQ0FONUIsb0JBTTRCOztBQUNyQyxlQUFLLE9BQUwsR0FBZSxPQUFmLENBRHFDO0FBRXJDLGVBQUssU0FBTCxHQUFpQixTQUFqQixDQUZxQztBQUdyQyxlQUFLLEtBQUwsR0FBYSxLQUFiLENBSHFDO1NBQXZDOztBQU5XLHFDQWlCWCxxQkFBSyxnQkFBZ0I7QUFDbkIsZUFBSyxjQUFMLEdBQXNCLGNBQXRCLENBRG1CO0FBRW5CLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsUUFBdkIsR0FBa0MsSUFBbEMsQ0FGbUI7QUFHbkIsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixjQUF2QixHQUF3QyxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBSHJCOzs7ZUFqQlYiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbC1yZXBlYXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
