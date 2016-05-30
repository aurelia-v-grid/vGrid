"use strict";

System.register([], function (_export, _context) {
  "use strict";

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

          var headerCells = this.vGridGenerator.getHeaderContent().querySelectorAll("." + this.vGridConfig.css.rowHeaderCell);
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
            if (_this2.vGridConfig.attSortableHeader) {
              _this2.vGridSortable.option("disabled", _this2.resizable);
            }
          }, 30);

          this.vGridGenerator.getHeaderContent().onmouseleave = "";
          this.vGridGenerator.getHeaderContent().onmousemove = "";
          this.vGridGenerator.getHeaderContent().onmouseup = "";

          this.vGridConfig.colConfig[this.index].width = parseInt(this.xElement.offsetParent.style.width);

          this.vGridGenerator.htmlCache.rowTemplate = null;
          this.vGridGenerator.correctRowAndScrollbodyWidth();
          this.vGridGenerator.recreateRowViewSlots();
          this.vGridGenerator.updateGridScrollbars();
          this.vGridGenerator.fillDataInRows(true);
        };

        VGridResizable.prototype.onmousemove = function onmousemove(e) {
          var _this3 = this;

          this.vGridGenerator.getHeaderContent().onmouseup = function () {
            _this3.onmouseup();
          };

          this.vGridGenerator.getHeaderContent().onmouseleave = function (e) {
            _this3.vGridGenerator.getHeaderContent().onmouseup(e);
          };

          if (this.resizable) {
            this.updateHeader(e);
          } else {
            this.vGridGenerator.correctHeaderAndScrollbodyWidth();
          }
        };

        VGridResizable.prototype.updateHeader = function updateHeader(e) {
          var newWidth = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
          this.vGridConfig.colConfig[this.index].width = parseInt(newWidth);
          this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
          this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";

          if (this.vGridConfig.attResizableHeadersAndRows) {
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

          if (this.vGridConfig.attSortableHeader) {
            this.vGridSortable.option("disabled", this.resizable);
          }

          this.screenX = e.screenX;
          this.xElement = e.target;
          this.originalWidth = this.xElement.offsetParent.style.width;
          this.index = this.xElement.offsetParent.getAttribute("column-no");

          this.vGridGenerator.getHeaderContent().onmousemove = function (e) {
            _this4.onmousemove(e);
          };
        };

        return VGridResizable;
      }());

      _export("VGridResizable", VGridResizable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztnQ0FNYSxjO0FBUVgsZ0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGVBTG5CLFNBS21CLEdBTFAsS0FLTzs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNEOztpQ0FNRCxJLG1CQUFPO0FBQUE7O0FBQ0wsZUFBSyxXQUFMLEdBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLEtBQUssS0FBTCxDQUFXLGNBQWpDO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssS0FBTCxDQUFXLGFBQWhDOztBQUVBLGNBQUksY0FBYyxLQUFLLGNBQUwsQ0FBb0IsZ0JBQXBCLEdBQXVDLGdCQUF2QyxDQUF3RCxNQUFNLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixhQUFuRixDQUFsQjtBQUNBLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxZQUFZLE1BQWhDLEVBQXdDLEdBQXhDLEVBQTZDOztBQUUzQyxnQkFBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLHlCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLHNCQUFoRDs7QUFFQSx5QkFBYSxXQUFiLEdBQTJCLFVBQUMsQ0FBRCxFQUFPO0FBQ2hDLG9CQUFLLFdBQUwsQ0FBaUIsQ0FBakI7QUFDRCxhQUZEOztBQUlBLHdCQUFZLENBQVosRUFBZSxXQUFmLENBQTJCLFlBQTNCO0FBQ0Q7QUFDRixTOztpQ0FNRCxTLHdCQUFZO0FBQUE7O0FBR1YscUJBQVcsWUFBTTtBQUNmLG1CQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxnQkFBSSxPQUFLLFdBQUwsQ0FBaUIsaUJBQXJCLEVBQXdDO0FBQ3RDLHFCQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsVUFBMUIsRUFBc0MsT0FBSyxTQUEzQztBQUNEO0FBQ0YsV0FMRCxFQUtHLEVBTEg7O0FBU0EsZUFBSyxjQUFMLENBQW9CLGdCQUFwQixHQUF1QyxZQUF2QyxHQUFzRCxFQUF0RDtBQUNBLGVBQUssY0FBTCxDQUFvQixnQkFBcEIsR0FBdUMsV0FBdkMsR0FBcUQsRUFBckQ7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsZ0JBQXBCLEdBQXVDLFNBQXZDLEdBQW1ELEVBQW5EOztBQUlBLGVBQUssV0FBTCxDQUFpQixTQUFqQixDQUEyQixLQUFLLEtBQWhDLEVBQXVDLEtBQXZDLEdBQStDLFNBQVMsS0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQixDQUFpQyxLQUExQyxDQUEvQzs7QUFNQSxlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsV0FBOUIsR0FBNEMsSUFBNUM7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsNEJBQXBCO0FBQ0EsZUFBSyxjQUFMLENBQW9CLG9CQUFwQjtBQUNBLGVBQUssY0FBTCxDQUFvQixvQkFBcEI7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkM7QUFFRCxTOztpQ0FNRCxXLHdCQUFZLEMsRUFBRztBQUFBOztBQUliLGVBQUssY0FBTCxDQUFvQixnQkFBcEIsR0FBdUMsU0FBdkMsR0FBbUQsWUFBTTtBQUN2RCxtQkFBSyxTQUFMO0FBQ0QsV0FGRDs7QUFLQSxlQUFLLGNBQUwsQ0FBb0IsZ0JBQXBCLEdBQXVDLFlBQXZDLEdBQXNELFVBQUMsQ0FBRCxFQUFPO0FBQzNELG1CQUFLLGNBQUwsQ0FBb0IsZ0JBQXBCLEdBQXVDLFNBQXZDLENBQWlELENBQWpEO0FBQ0QsV0FGRDs7QUFNQSxjQUFJLEtBQUssU0FBVCxFQUFvQjtBQUNsQixpQkFBSyxZQUFMLENBQWtCLENBQWxCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUssY0FBTCxDQUFvQiwrQkFBcEI7QUFDRDtBQUNGLFM7O2lDQU1ELFkseUJBQWEsQyxFQUFHO0FBSWQsY0FBSSxXQUFXLFNBQVMsS0FBSyxhQUFkLEtBQWlDLEtBQUssT0FBTCxHQUFlLEVBQUUsT0FBbEQsSUFBOEQsSUFBN0U7QUFDQSxlQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsS0FBSyxLQUFoQyxFQUF1QyxLQUF2QyxHQUErQyxTQUFTLFFBQVQsQ0FBL0M7QUFDQSxlQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCLENBQWlDLEtBQWpDLEdBQXlDLFNBQVMsS0FBSyxhQUFkLEtBQWlDLEtBQUssT0FBTCxHQUFlLEVBQUUsT0FBbEQsSUFBOEQsSUFBdkc7QUFDQSxlQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCLENBQWlDLEtBQWpDLEdBQXlDLFNBQVMsS0FBSyxhQUFkLEtBQWlDLEtBQUssT0FBTCxHQUFlLEVBQUUsT0FBbEQsSUFBOEQsSUFBdkc7O0FBTUEsY0FBSSxLQUFLLFdBQUwsQ0FBaUIsMEJBQXJCLEVBQWlEO0FBQy9DLGdCQUFJLGVBQWUsS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLE9BQTlCLENBQXNDLFVBQXRDLENBQWlELGdCQUFqRCxDQUFrRSxNQUFNLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixTQUEzQixHQUF1QyxLQUFLLEtBQTlHLENBQW5COztBQUVBLGlCQUFLLElBQUksTUFBTSxDQUFmLEVBQWtCLE1BQU0sYUFBYSxNQUFyQyxFQUE2QyxLQUE3QyxFQUFvRDtBQUNsRCwyQkFBYSxHQUFiLEVBQWtCLEtBQWxCLENBQXdCLEtBQXhCLEdBQWdDLFFBQWhDO0FBQ0Q7O0FBRUQsaUJBQUssY0FBTCxDQUFvQiw0QkFBcEI7QUFDQSxpQkFBSyxjQUFMLENBQW9CLG9CQUFwQjtBQUVEO0FBRUYsUzs7aUNBTUQsVyx3QkFBWSxDLEVBQUc7QUFBQTs7QUFJYixlQUFLLFNBQUwsR0FBaUIsSUFBakI7O0FBSUEsY0FBSSxLQUFLLFdBQUwsQ0FBaUIsaUJBQXJCLEVBQXdDO0FBQ3RDLGlCQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsVUFBMUIsRUFBc0MsS0FBSyxTQUEzQztBQUNEOztBQUlELGVBQUssT0FBTCxHQUFlLEVBQUUsT0FBakI7QUFDQSxlQUFLLFFBQUwsR0FBZ0IsRUFBRSxNQUFsQjtBQUNBLGVBQUssYUFBTCxHQUFxQixLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCLENBQWlDLEtBQXREO0FBQ0EsZUFBSyxLQUFMLEdBQWEsS0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixZQUEzQixDQUF3QyxXQUF4QyxDQUFiOztBQUlBLGVBQUssY0FBTCxDQUFvQixnQkFBcEIsR0FBdUMsV0FBdkMsR0FBcUQsVUFBQyxDQUFELEVBQU87QUFDMUQsbUJBQUssV0FBTCxDQUFpQixDQUFqQjtBQUNELFdBRkQ7QUFLRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
