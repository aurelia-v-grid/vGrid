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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztnQ0FNYSxjO0FBUVgsZ0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGVBTG5CLFNBS21CLEdBTFAsS0FLTzs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNEOztpQ0FNRCxJLG1CQUFPO0FBQUE7O0FBQ0wsZUFBSyxXQUFMLEdBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLEtBQUssS0FBTCxDQUFXLGNBQWpDO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssS0FBTCxDQUFXLGFBQWhDOztBQUVBLGNBQUksY0FBYyxLQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsZ0JBQXJDLENBQXNELE1BQU0sS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGFBQWpGLENBQWxCO0FBQ0EsZUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFlBQVksTUFBaEMsRUFBd0MsR0FBeEMsRUFBNkM7O0FBRTNDLGdCQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EseUJBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsc0JBQWhEOztBQUVBLHlCQUFhLFdBQWIsR0FBMkIsVUFBQyxDQUFELEVBQU87QUFDaEMsb0JBQUssV0FBTCxDQUFpQixDQUFqQjtBQUNELGFBRkQ7O0FBSUEsd0JBQVksQ0FBWixFQUFlLFdBQWYsQ0FBMkIsWUFBM0I7QUFDRDtBQUNGLFM7O2lDQU1ELFMsd0JBQVk7QUFBQTs7QUFHVixxQkFBVyxZQUFNO0FBQ2YsbUJBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNBLGdCQUFJLE9BQUssV0FBTCxDQUFpQixnQkFBckIsRUFBdUM7QUFDckMscUJBQUssYUFBTCxDQUFtQixNQUFuQixDQUEwQixVQUExQixFQUFzQyxPQUFLLFNBQTNDO0FBQ0Q7QUFDRixXQUxELEVBS0csRUFMSDs7QUFTQSxlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsWUFBckMsR0FBb0QsRUFBcEQ7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsV0FBckMsR0FBbUQsRUFBbkQ7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsU0FBckMsR0FBaUQsRUFBakQ7O0FBSUEsZUFBSyxXQUFMLENBQWlCLGdCQUFqQixDQUFrQyxLQUFLLEtBQXZDLElBQWdELFNBQVMsS0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQixDQUFpQyxLQUExQyxDQUFoRDs7QUFJQSxlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsV0FBOUIsR0FBNEMsSUFBNUM7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsNEJBQXBCO0FBQ0EsZUFBSyxjQUFMLENBQW9CLGlCQUFwQjtBQUNBLGVBQUssY0FBTCxDQUFvQixvQkFBcEI7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkM7QUFFRCxTOztpQ0FNRCxXLHdCQUFZLEMsRUFBRztBQUFBOztBQUliLGVBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixDQUFxQyxTQUFyQyxHQUFpRCxZQUFNO0FBQ3JELG1CQUFLLFNBQUw7QUFDRCxXQUZEOztBQUtBLGVBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixDQUFxQyxZQUFyQyxHQUFvRCxVQUFDLENBQUQsRUFBTztBQUN6RCxtQkFBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFNBQXJDLENBQStDLENBQS9DO0FBQ0QsV0FGRDs7QUFNQSxjQUFJLEtBQUssU0FBVCxFQUFvQjtBQUNsQixpQkFBSyxZQUFMLENBQWtCLENBQWxCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUssY0FBTCxDQUFvQiwrQkFBcEI7QUFDRDtBQUNGLFM7O2lDQU1ELFkseUJBQWEsQyxFQUFHO0FBSWQsY0FBSSxXQUFXLFNBQVMsS0FBSyxhQUFkLEtBQWlDLEtBQUssT0FBTCxHQUFlLEVBQUUsT0FBbEQsSUFBOEQsSUFBN0U7QUFDQSxlQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLEtBQUssS0FBdkMsSUFBZ0QsU0FBUyxRQUFULENBQWhEO0FBQ0EsZUFBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQixDQUFpQyxLQUFqQyxHQUF5QyxTQUFTLEtBQUssYUFBZCxLQUFpQyxLQUFLLE9BQUwsR0FBZSxFQUFFLE9BQWxELElBQThELElBQXZHO0FBQ0EsZUFBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQixDQUFpQyxLQUFqQyxHQUF5QyxTQUFTLEtBQUssYUFBZCxLQUFpQyxLQUFLLE9BQUwsR0FBZSxFQUFFLE9BQWxELElBQThELElBQXZHOztBQUlBLGNBQUksS0FBSyxXQUFMLENBQWlCLHVCQUFyQixFQUE4QztBQUM1QyxnQkFBSSxlQUFlLEtBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixPQUE5QixDQUFzQyxVQUF0QyxDQUFpRCxnQkFBakQsQ0FBa0UsTUFBTSxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsU0FBM0IsR0FBdUMsS0FBSyxLQUE5RyxDQUFuQjs7QUFFQSxpQkFBSyxJQUFJLE1BQU0sQ0FBZixFQUFrQixNQUFNLGFBQWEsTUFBckMsRUFBNkMsS0FBN0MsRUFBb0Q7QUFDbEQsMkJBQWEsR0FBYixFQUFrQixLQUFsQixDQUF3QixLQUF4QixHQUFnQyxRQUFoQztBQUNEOztBQUVELGlCQUFLLGNBQUwsQ0FBb0IsNEJBQXBCO0FBQ0EsaUJBQUssY0FBTCxDQUFvQixvQkFBcEI7QUFFRDtBQUVGLFM7O2lDQU1ELFcsd0JBQVksQyxFQUFHO0FBQUE7O0FBSWIsZUFBSyxTQUFMLEdBQWlCLElBQWpCOztBQUlBLGNBQUksS0FBSyxXQUFMLENBQWlCLGdCQUFyQixFQUF1QztBQUNyQyxpQkFBSyxhQUFMLENBQW1CLE1BQW5CLENBQTBCLFVBQTFCLEVBQXNDLEtBQUssU0FBM0M7QUFDRDs7QUFJRCxlQUFLLE9BQUwsR0FBZSxFQUFFLE9BQWpCO0FBQ0EsZUFBSyxRQUFMLEdBQWdCLEVBQUUsTUFBbEI7QUFDQSxlQUFLLGFBQUwsR0FBcUIsS0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQixDQUFpQyxLQUF0RDtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsWUFBM0IsQ0FBd0MsV0FBeEMsQ0FBYjs7QUFJQSxlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsV0FBckMsR0FBbUQsVUFBQyxDQUFELEVBQU87QUFDeEQsbUJBQUssV0FBTCxDQUFpQixDQUFqQjtBQUNELFdBRkQ7QUFLRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
