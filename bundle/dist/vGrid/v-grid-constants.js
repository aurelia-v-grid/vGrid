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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb25zdGFudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR08sZUFBUyxjQUFULEdBQTBCO0FBQy9CLGVBQU8sVUFBVSxNQUFWLEVBQWtCO0FBQ3ZCLGNBQUksU0FBUyxPQUFPLFNBQXBCOztBQUVBLGlCQUFPLGNBQVAsQ0FBc0IsTUFBdEIsRUFBOEIsaUJBQTlCLEVBQWlEO0FBQy9DLGlCQUFLLGVBQVk7QUFDZixrQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFsQjtBQUNELGVBRkQsTUFFTztBQUNMLHVCQUFPLElBQVA7QUFDRDtBQUNGLGFBUDhDO0FBUS9DLDBCQUFjLElBUmlDO0FBUy9DLHdCQUFZO0FBVG1DLFdBQWpEOztBQVlBLGlCQUFPLGNBQVAsQ0FBc0IsTUFBdEIsRUFBOEIsZ0JBQTlCLEVBQWdEO0FBQzlDLGlCQUFLLGVBQVk7QUFDZixrQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxjQUFsQjtBQUNELGVBRkQsTUFFTztBQUNMLHVCQUFPLElBQVA7QUFDRDtBQUNGLGFBUDZDO0FBUTlDLDBCQUFjLElBUmdDO0FBUzlDLHdCQUFZO0FBVGtDLFdBQWhEOztBQVlBLGlCQUFPLGNBQVAsQ0FBc0IsTUFBdEIsRUFBOEIsYUFBOUIsRUFBNkM7QUFDM0MsaUJBQUssZUFBWTtBQUNmLGtCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHVCQUFPLEtBQUssS0FBTCxDQUFXLFdBQWxCO0FBQ0QsZUFGRCxNQUVPO0FBQ0wsdUJBQU8sSUFBUDtBQUNEO0FBQ0YsYUFQMEM7QUFRM0MsMEJBQWMsSUFSNkI7QUFTM0Msd0JBQVk7QUFUK0IsV0FBN0M7O0FBWUEsaUJBQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixjQUE5QixFQUE4QztBQUM1QyxpQkFBSyxlQUFZO0FBQ2Ysa0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBbEI7QUFDRCxlQUZELE1BRU87QUFDTCx1QkFBTyxJQUFQO0FBQ0Q7QUFDRixhQVAyQztBQVE1QywwQkFBYyxJQVI4QjtBQVM1Qyx3QkFBWTtBQVRnQyxXQUE5Qzs7QUFhQSxpQkFBTyxjQUFQLENBQXNCLE1BQXRCLEVBQThCLGFBQTlCLEVBQTZDO0FBQzNDLGlCQUFLLGVBQVk7QUFDZixrQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFsQjtBQUNELGVBRkQsTUFFTztBQUNMLHVCQUFPLElBQVA7QUFDRDtBQUNGLGFBUDBDO0FBUTNDLDBCQUFjLElBUjZCO0FBUzNDLHdCQUFZO0FBVCtCLFdBQTdDOztBQVlBLGlCQUFPLGNBQVAsQ0FBc0IsTUFBdEIsRUFBOEIsV0FBOUIsRUFBMkM7QUFDekMsaUJBQUssZUFBWTtBQUNmLGtCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHVCQUFPLEtBQUssS0FBTCxDQUFXLFNBQWxCO0FBQ0QsZUFGRCxNQUVPO0FBQ0wsdUJBQU8sSUFBUDtBQUNEO0FBQ0YsYUFQd0M7QUFRekMsMEJBQWMsSUFSMkI7QUFTekMsd0JBQVk7QUFUNkIsV0FBM0M7O0FBWUEsaUJBQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixlQUE5QixFQUErQztBQUM3QyxpQkFBSyxlQUFZO0FBQ2Ysa0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBbEI7QUFDRCxlQUZELE1BRU87QUFDTCx1QkFBTyxJQUFQO0FBQ0Q7QUFDRixhQVA0QztBQVE3QywwQkFBYyxJQVIrQjtBQVM3Qyx3QkFBWTtBQVRpQyxXQUEvQzs7QUFZQSxpQkFBTyxjQUFQLENBQXNCLE1BQXRCLEVBQThCLGdCQUE5QixFQUFnRDtBQUM5QyxpQkFBSyxlQUFZO0FBQ2Ysa0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBbEI7QUFDRCxlQUZELE1BRU87QUFDTCx1QkFBTyxJQUFQO0FBQ0Q7QUFDRixhQVA2QztBQVE5QywwQkFBYyxJQVJnQztBQVM5Qyx3QkFBWTtBQVRrQyxXQUFoRDs7QUFZQSxpQkFBTyxjQUFQLENBQXNCLE1BQXRCLEVBQThCLGdCQUE5QixFQUFnRDtBQUM5QyxpQkFBSyxlQUFZO0FBQ2Ysa0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QsdUJBQU8sS0FBSyxLQUFMLENBQVcsY0FBbEI7QUFDRCxlQUZELE1BRU87QUFDTCx1QkFBTyxJQUFQO0FBQ0Q7QUFDRixhQVA2QztBQVE5QywwQkFBYyxJQVJnQztBQVM5Qyx3QkFBWTtBQVRrQyxXQUFoRDs7QUFhQSxpQkFBTyxNQUFQO0FBQ0QsU0FsSEQ7QUFtSEQ7OztBQUFBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb25zdGFudHMuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
