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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWE7QUFRWCxpQkFSVyxjQVFYLENBQVksS0FBWixFQUFtQjtnQ0FSUixnQkFRUTs7ZUFMbkIsWUFBWSxNQUtPOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRGlCO0FBRWpCLGVBQUssU0FBTCxHQUFpQixLQUFqQixDQUZpQjtTQUFuQjs7QUFSVyxpQ0FjWCx1QkFBTzs7O0FBQ0wsZUFBSyxXQUFMLEdBQW1CLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FEZDtBQUVMLGVBQUssY0FBTCxHQUFzQixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBRmpCO0FBR0wsZUFBSyxhQUFMLEdBQXFCLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FIaEI7O0FBS0wsY0FBSSxjQUFjLEtBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixDQUFxQyxnQkFBckMsQ0FBc0QsTUFBTSxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsYUFBckIsQ0FBMUUsQ0FMQztBQU1MLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFlBQVksTUFBWixFQUFvQixHQUF4QyxFQUE2Qzs7QUFFM0MsZ0JBQUksZUFBZSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZixDQUZ1QztBQUczQyx5QkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixzQkFBckIsQ0FBM0IsQ0FIMkM7O0FBSzNDLHlCQUFhLFdBQWIsR0FBMkIsVUFBQyxDQUFELEVBQU87QUFDaEMsb0JBQUssV0FBTCxDQUFpQixDQUFqQixFQURnQzthQUFQLENBTGdCOztBQVMzQyx3QkFBWSxDQUFaLEVBQWUsV0FBZixDQUEyQixZQUEzQixFQVQyQztXQUE3Qzs7O0FBcEJTLGlDQWtDWCxpQ0FBWTs7O0FBQ1YscUJBQVcsWUFBTTtBQUNmLG1CQUFLLFNBQUwsR0FB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QUFsQixDQUF3QixLQUF4QixHQUFnQyxRQUFoQyxDQURrRDthQUFwRDs7QUFJQSxpQkFBSyxjQUFMLENBQW9CLDRCQUFwQixHQVA0QztBQVE1QyxpQkFBSyxjQUFMLENBQW9CLG9CQUFwQixHQVI0QztXQUE5Qzs7O0FBcEZTLGlDQWtHWCxtQ0FBWSxHQUFHOzs7QUFFYixlQUFLLFNBQUwsR0FBaUIsSUFBakIsQ0FGYTs7QUFLYixjQUFJLEtBQUssV0FBTCxDQUFpQixnQkFBakIsRUFBbUM7QUFDckMsaUJBQUssYUFBTCxDQUFtQixNQUFuQixDQUEwQixVQUExQixFQUFzQyxLQUFLLFNBQUwsQ0FBdEMsQ0FEcUM7V0FBdkM7QUFHQSxlQUFLLE9BQUwsR0FBZSxFQUFFLE9BQUYsQ0FSRjtBQVNiLGVBQUssUUFBTCxHQUFnQixFQUFFLE1BQUYsQ0FUSDtBQVViLGVBQUssYUFBTCxHQUFxQixLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCLENBQWlDLEtBQWpDLENBVlI7QUFXYixlQUFLLEtBQUwsR0FBYSxLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLFlBQTNCLENBQXdDLFdBQXhDLENBQWIsQ0FYYTs7QUFhYixlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsV0FBckMsR0FBbUQsVUFBQyxDQUFELEVBQU87QUFDeEQsbUJBQUssV0FBTCxDQUFpQixDQUFqQixFQUR3RDtXQUFQLENBYnRDOzs7ZUFsR0oiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXJlc2l6YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
