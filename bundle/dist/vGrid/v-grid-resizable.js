"use strict";

System.register([], function (_export, _context) {
  var VGridResizable;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridResizable", VGridResizable = function () {
        function VGridResizable(vGrid) {
          _classCallCheck(this, VGridResizable);

          this.resizable = false;

          this.vGrid = vGrid;
          this.resizable = false;
        }

        VGridResizable.prototype.init = function init() {
          var _this = this;

          this.vGridConfig = this.vGrid.vGridConfig;
          this.vGridGenerator = this.vGrid.vGridGenerator;
          this.vGridSortable = this.vGrid.vGridSortable;

          var headerCells = this.vGridGenerator.htmlCache.header.querySelectorAll("." + this.vGridConfig.css.rowHeaderCell);
          for (var i = 0; i < headerCells.length; i++) {

            var resizeHandle = document.createElement("DIV");
            resizeHandle.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);

            resizeHandle.onmousedown = function (e) {
              _this.onmousedown(e);
            };

            headerCells[i].appendChild(resizeHandle);
          }
        };

        VGridResizable.prototype.onmouseup = function onmouseup() {
          var _this2 = this;

          setTimeout(function () {
            _this2.resizable = false;
            if (_this2.vGridConfig.isSortableHeader) {
              _this2.vGridSortable.option("disabled", _this2.resizable);
            }
          }, 30);

          this.vGridGenerator.htmlCache.header.onmouseleave = "";
          this.vGridGenerator.htmlCache.header.onmousemove = "";
          this.vGridGenerator.htmlCache.header.onmouseup = "";

          this.vGridConfig.columnWidthArray[this.index] = parseInt(this.xElement.offsetParent.style.width);

          this.vGridGenerator.htmlCache.rowTemplate = null;
          this.vGridGenerator.correctRowAndScrollbodyWidth();
          this.vGridGenerator.recreateViewSlots();
          this.vGridGenerator.updateGridScrollbars();
          this.vGridGenerator.fillDataInRows(true);
        };

        VGridResizable.prototype.onmousemove = function onmousemove(e) {
          var _this3 = this;

          this.vGridGenerator.htmlCache.header.onmouseup = function () {
            _this3.onmouseup();
          };

          this.vGridGenerator.htmlCache.header.onmouseleave = function (e) {
            _this3.vGridGenerator.htmlCache.header.onmouseup(e);
          };

          if (this.resizable) {
            this.updateHeader(e);
          } else {
            this.vGridGenerator.correctHeaderAndScrollbodyWidth();
          }
        };

        VGridResizable.prototype.updateHeader = function updateHeader(e) {
          var newWidth = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
          this.vGridConfig.columnWidthArray[this.index] = parseInt(newWidth);
          this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
          this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
          if (this.vGridConfig.resizableHeadersAndRows) {
            var columnsToFix = this.vGridGenerator.htmlCache.content.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + this.index);

            for (var col = 0; col < columnsToFix.length; col++) {
              columnsToFix[col].style.width = newWidth;
            }

            this.vGridGenerator.correctRowAndScrollbodyWidth();
            this.vGridGenerator.updateGridScrollbars();
          }
        };

        VGridResizable.prototype.onmousedown = function onmousedown(e) {
          var _this4 = this;

          this.resizable = true;

          if (this.vGridConfig.isSortableHeader) {
            this.vGridSortable.option("disabled", this.resizable);
          }
          this.screenX = e.screenX;
          this.xElement = e.target;
          this.originalWidth = this.xElement.offsetParent.style.width;
          this.index = this.xElement.offsetParent.getAttribute("column-no");

          this.vGridGenerator.htmlCache.header.onmousemove = function (e) {
            _this4.onmousemove(e);
          };
        };

        return VGridResizable;
      }());

      _export("VGridResizable", VGridResizable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWEsYztBQVFYLGdDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxlQUxuQixTQUttQixHQUxQLEtBS087O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDRDs7aUNBR0QsSSxtQkFBTztBQUFBOztBQUNMLGVBQUssV0FBTCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxXQUE5QjtBQUNBLGVBQUssY0FBTCxHQUFzQixLQUFLLEtBQUwsQ0FBVyxjQUFqQztBQUNBLGVBQUssYUFBTCxHQUFxQixLQUFLLEtBQUwsQ0FBVyxhQUFoQzs7QUFFQSxjQUFJLGNBQWMsS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLGdCQUFyQyxDQUFzRCxNQUFNLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixhQUFqRixDQUFsQjtBQUNBLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxZQUFZLE1BQWhDLEVBQXdDLEdBQXhDLEVBQTZDOztBQUUzQyxnQkFBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLHlCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLHNCQUFoRDs7QUFFQSx5QkFBYSxXQUFiLEdBQTJCLFVBQUMsQ0FBRCxFQUFPO0FBQ2hDLG9CQUFLLFdBQUwsQ0FBaUIsQ0FBakI7QUFDRCxhQUZEOztBQUlBLHdCQUFZLENBQVosRUFBZSxXQUFmLENBQTJCLFlBQTNCO0FBQ0Q7QUFDRixTOztpQ0FHRCxTLHdCQUFZO0FBQUE7O0FBQ1YscUJBQVcsWUFBTTtBQUNmLG1CQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxnQkFBSSxPQUFLLFdBQUwsQ0FBaUIsZ0JBQXJCLEVBQXVDO0FBQ3JDLHFCQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsVUFBMUIsRUFBc0MsT0FBSyxTQUEzQztBQUNEO0FBQ0YsV0FMRCxFQUtHLEVBTEg7O0FBT0EsZUFBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFlBQXJDLEdBQW9ELEVBQXBEO0FBQ0EsZUFBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFdBQXJDLEdBQW1ELEVBQW5EO0FBQ0EsZUFBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFNBQXJDLEdBQWlELEVBQWpEOztBQUVBLGVBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsS0FBSyxLQUF2QyxJQUFnRCxTQUFTLEtBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsS0FBM0IsQ0FBaUMsS0FBMUMsQ0FBaEQ7O0FBR0EsZUFBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLFdBQTlCLEdBQTRDLElBQTVDO0FBQ0EsZUFBSyxjQUFMLENBQW9CLDRCQUFwQjtBQUNBLGVBQUssY0FBTCxDQUFvQixpQkFBcEI7QUFDQSxlQUFLLGNBQUwsQ0FBb0Isb0JBQXBCO0FBQ0EsZUFBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLElBQW5DO0FBRUQsUzs7aUNBR0QsVyx3QkFBWSxDLEVBQUc7QUFBQTs7QUFHYixlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsU0FBckMsR0FBaUQsWUFBTTtBQUVyRCxtQkFBSyxTQUFMO0FBQ0QsV0FIRDs7QUFLQSxlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsWUFBckMsR0FBb0QsVUFBQyxDQUFELEVBQU87QUFDekQsbUJBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixDQUFxQyxTQUFyQyxDQUErQyxDQUEvQztBQUVELFdBSEQ7O0FBS0EsY0FBSSxLQUFLLFNBQVQsRUFBb0I7QUFDbEIsaUJBQUssWUFBTCxDQUFrQixDQUFsQjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLLGNBQUwsQ0FBb0IsK0JBQXBCO0FBQ0Q7QUFDRixTOztpQ0FHRCxZLHlCQUFhLEMsRUFBRztBQUNkLGNBQUksV0FBVyxTQUFTLEtBQUssYUFBZCxLQUFpQyxLQUFLLE9BQUwsR0FBZSxFQUFFLE9BQWxELElBQThELElBQTdFO0FBQ0EsZUFBSyxXQUFMLENBQWlCLGdCQUFqQixDQUFrQyxLQUFLLEtBQXZDLElBQWdELFNBQVMsUUFBVCxDQUFoRDtBQUNBLGVBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsS0FBM0IsQ0FBaUMsS0FBakMsR0FBeUMsU0FBUyxLQUFLLGFBQWQsS0FBaUMsS0FBSyxPQUFMLEdBQWUsRUFBRSxPQUFsRCxJQUE4RCxJQUF2RztBQUNBLGVBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsS0FBM0IsQ0FBaUMsS0FBakMsR0FBeUMsU0FBUyxLQUFLLGFBQWQsS0FBaUMsS0FBSyxPQUFMLEdBQWUsRUFBRSxPQUFsRCxJQUE4RCxJQUF2RztBQUNBLGNBQUksS0FBSyxXQUFMLENBQWlCLHVCQUFyQixFQUE4QztBQUM1QyxnQkFBSSxlQUFlLEtBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixPQUE5QixDQUFzQyxVQUF0QyxDQUFpRCxnQkFBakQsQ0FBa0UsTUFBTSxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsU0FBM0IsR0FBdUMsS0FBSyxLQUE5RyxDQUFuQjs7QUFFQSxpQkFBSyxJQUFJLE1BQU0sQ0FBZixFQUFrQixNQUFNLGFBQWEsTUFBckMsRUFBNkMsS0FBN0MsRUFBb0Q7QUFDbEQsMkJBQWEsR0FBYixFQUFrQixLQUFsQixDQUF3QixLQUF4QixHQUFnQyxRQUFoQztBQUNEOztBQUVELGlCQUFLLGNBQUwsQ0FBb0IsNEJBQXBCO0FBQ0EsaUJBQUssY0FBTCxDQUFvQixvQkFBcEI7QUFFRDtBQUNGLFM7O2lDQUdELFcsd0JBQVksQyxFQUFHO0FBQUE7O0FBRWIsZUFBSyxTQUFMLEdBQWlCLElBQWpCOztBQUdBLGNBQUksS0FBSyxXQUFMLENBQWlCLGdCQUFyQixFQUF1QztBQUNyQyxpQkFBSyxhQUFMLENBQW1CLE1BQW5CLENBQTBCLFVBQTFCLEVBQXNDLEtBQUssU0FBM0M7QUFDRDtBQUNELGVBQUssT0FBTCxHQUFlLEVBQUUsT0FBakI7QUFDQSxlQUFLLFFBQUwsR0FBZ0IsRUFBRSxNQUFsQjtBQUNBLGVBQUssYUFBTCxHQUFxQixLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCLENBQWlDLEtBQXREO0FBQ0EsZUFBSyxLQUFMLEdBQWEsS0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixZQUEzQixDQUF3QyxXQUF4QyxDQUFiOztBQUVBLGVBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixDQUFxQyxXQUFyQyxHQUFtRCxVQUFDLENBQUQsRUFBTztBQUN4RCxtQkFBSyxXQUFMLENBQWlCLENBQWpCO0FBQ0QsV0FGRDtBQUdELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXJlc2l6YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
