'use strict';

System.register([], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      function VGridConstants() {
        return function (xVgrid) {
          var target = xVgrid.prototype;

          Object.defineProperty(target, 'vGridCellHelper', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.vGridCellHelper;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          Object.defineProperty(target, 'vGridSelection', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.vGridSelection;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          Object.defineProperty(target, 'vGridConfig', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.vGridConfig;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          Object.defineProperty(target, 'vGridElement', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.element;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          Object.defineProperty(target, 'vGridFilter', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.vGridFilter;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          Object.defineProperty(target, 'vGridSort', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.vGridSort;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          Object.defineProperty(target, 'vGridSortable', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.vGridSortable;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          Object.defineProperty(target, 'vGridResizable', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.vGridResizable;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          Object.defineProperty(target, 'vGridGenerator', {
            get: function get() {
              if (this.vGrid) {
                return this.vGrid.vGridGenerator;
              } else {
                return null;
              }
            },
            configurable: true,
            enumerable: true
          });

          return xVgrid;
        };
      }
      _export('VGridConstants', VGridConstants);

      ;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb25zdGFudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR08sZUFBUyxjQUFULEdBQTBCO0FBQy9CLGVBQU8sVUFBVSxNQUFWLEVBQWtCO0FBQ3ZCLGNBQUksU0FBUyxPQUFPLFNBQVAsQ0FEVTs7QUFHdkIsaUJBQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixpQkFBOUIsRUFBaUQ7QUFDL0MsaUJBQUssZUFBWTtBQUNmLGtCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsZUFBWCxDQURPO2VBQWhCLE1BRU87QUFDTCx1QkFBTyxJQUFQLENBREs7ZUFGUDthQURHO0FBT0wsMEJBQWMsSUFBZDtBQUNBLHdCQUFZLElBQVo7V0FURixFQUh1Qjs7QUFldkIsaUJBQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixnQkFBOUIsRUFBZ0Q7QUFDOUMsaUJBQUssZUFBWTtBQUNmLGtCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxDQURPO2VBQWhCLE1BRU87QUFDTCx1QkFBTyxJQUFQLENBREs7ZUFGUDthQURHO0FBT0wsMEJBQWMsSUFBZDtBQUNBLHdCQUFZLElBQVo7V0FURixFQWZ1Qjs7QUEyQnZCLGlCQUFPLGNBQVAsQ0FBc0IsTUFBdEIsRUFBOEIsYUFBOUIsRUFBNkM7QUFDM0MsaUJBQUssZUFBWTtBQUNmLGtCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQURPO2VBQWhCLE1BRU87QUFDTCx1QkFBTyxJQUFQLENBREs7ZUFGUDthQURHO0FBT0wsMEJBQWMsSUFBZDtBQUNBLHdCQUFZLElBQVo7V0FURixFQTNCdUI7O0FBdUN2QixpQkFBTyxjQUFQLENBQXNCLE1BQXRCLEVBQThCLGNBQTlCLEVBQThDO0FBQzVDLGlCQUFLLGVBQVk7QUFDZixrQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHVCQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FETztlQUFoQixNQUVPO0FBQ0wsdUJBQU8sSUFBUCxDQURLO2VBRlA7YUFERztBQU9MLDBCQUFjLElBQWQ7QUFDQSx3QkFBWSxJQUFaO1dBVEYsRUF2Q3VCOztBQW9EdkIsaUJBQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixhQUE5QixFQUE2QztBQUMzQyxpQkFBSyxlQUFZO0FBQ2Ysa0JBQUksS0FBSyxLQUFMLEVBQVk7QUFDZCx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBRE87ZUFBaEIsTUFFTztBQUNMLHVCQUFPLElBQVAsQ0FESztlQUZQO2FBREc7QUFPTCwwQkFBYyxJQUFkO0FBQ0Esd0JBQVksSUFBWjtXQVRGLEVBcER1Qjs7QUFnRXZCLGlCQUFPLGNBQVAsQ0FBc0IsTUFBdEIsRUFBOEIsV0FBOUIsRUFBMkM7QUFDekMsaUJBQUssZUFBWTtBQUNmLGtCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsU0FBWCxDQURPO2VBQWhCLE1BRU87QUFDTCx1QkFBTyxJQUFQLENBREs7ZUFGUDthQURHO0FBT0wsMEJBQWMsSUFBZDtBQUNBLHdCQUFZLElBQVo7V0FURixFQWhFdUI7O0FBNEV2QixpQkFBTyxjQUFQLENBQXNCLE1BQXRCLEVBQThCLGVBQTlCLEVBQStDO0FBQzdDLGlCQUFLLGVBQVk7QUFDZixrQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHVCQUFPLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FETztlQUFoQixNQUVPO0FBQ0wsdUJBQU8sSUFBUCxDQURLO2VBRlA7YUFERztBQU9MLDBCQUFjLElBQWQ7QUFDQSx3QkFBWSxJQUFaO1dBVEYsRUE1RXVCOztBQXdGdkIsaUJBQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixnQkFBOUIsRUFBZ0Q7QUFDOUMsaUJBQUssZUFBWTtBQUNmLGtCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxDQURPO2VBQWhCLE1BRU87QUFDTCx1QkFBTyxJQUFQLENBREs7ZUFGUDthQURHO0FBT0wsMEJBQWMsSUFBZDtBQUNBLHdCQUFZLElBQVo7V0FURixFQXhGdUI7O0FBb0d2QixpQkFBTyxjQUFQLENBQXNCLE1BQXRCLEVBQThCLGdCQUE5QixFQUFnRDtBQUM5QyxpQkFBSyxlQUFZO0FBQ2Ysa0JBQUksS0FBSyxLQUFMLEVBQVk7QUFDZCx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBRE87ZUFBaEIsTUFFTztBQUNMLHVCQUFPLElBQVAsQ0FESztlQUZQO2FBREc7QUFPTCwwQkFBYyxJQUFkO0FBQ0Esd0JBQVksSUFBWjtXQVRGLEVBcEd1Qjs7QUFpSHZCLGlCQUFPLE1BQVAsQ0FqSHVCO1NBQWxCLENBRHdCO09BQTFCOzs7QUFvSE4iLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbnN0YW50cy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
