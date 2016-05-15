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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Z0NBTWE7QUFRWCxpQkFSVyxjQVFYLENBQVksS0FBWixFQUFtQjtnQ0FSUixnQkFRUTs7ZUFMbkIsWUFBWSxNQUtPOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRGlCO0FBRWpCLGVBQUssU0FBTCxHQUFpQixLQUFqQixDQUZpQjtTQUFuQjs7QUFSVyxpQ0FpQlgsdUJBQU87OztBQUNMLGVBQUssV0FBTCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBRGQ7QUFFTCxlQUFLLGNBQUwsR0FBc0IsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUZqQjtBQUdMLGVBQUssYUFBTCxHQUFxQixLQUFLLEtBQUwsQ0FBVyxhQUFYLENBSGhCOztBQUtMLGNBQUksY0FBYyxLQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsZ0JBQXJDLENBQXNELE1BQU0sS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGFBQXJCLENBQTFFLENBTEM7QUFNTCxlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxZQUFZLE1BQVosRUFBb0IsR0FBeEMsRUFBNkM7O0FBRTNDLGdCQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWYsQ0FGdUM7QUFHM0MseUJBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsc0JBQXJCLENBQTNCLENBSDJDOztBQUszQyx5QkFBYSxXQUFiLEdBQTJCLFVBQUMsQ0FBRCxFQUFPO0FBQ2hDLG9CQUFLLFdBQUwsQ0FBaUIsQ0FBakIsRUFEZ0M7YUFBUCxDQUxnQjs7QUFTM0Msd0JBQVksQ0FBWixFQUFlLFdBQWYsQ0FBMkIsWUFBM0IsRUFUMkM7V0FBN0M7OztBQXZCUyxpQ0F3Q1gsaUNBQVk7OztBQUdWLHFCQUFXLFlBQU07QUFDZixtQkFBSyxTQUFMLEdB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QUFrQixLQUFsQixDQUF3QixLQUF4QixHQUFnQyxRQUFoQyxDQURrRDthQUFwRDs7QUFJQSxpQkFBSyxjQUFMLENBQW9CLDRCQUFwQixHQVA0QztBQVE1QyxpQkFBSyxjQUFMLENBQW9CLG9CQUFwQixHQVI0QztXQUE5Qzs7O0FBL0dTLGlDQWlJWCxtQ0FBWSxHQUFHOzs7QUFJYixlQUFLLFNBQUwsR0FBaUIsSUFBakIsQ0FKYTs7QUFRYixjQUFJLEtBQUssV0FBTCxDQUFpQixnQkFBakIsRUFBbUM7QUFDckMsaUJBQUssYUFBTCxDQUFtQixNQUFuQixDQUEwQixVQUExQixFQUFzQyxLQUFLLFNBQUwsQ0FBdEMsQ0FEcUM7V0FBdkM7O0FBTUEsZUFBSyxPQUFMLEdBQWUsRUFBRSxPQUFGLENBZEY7QUFlYixlQUFLLFFBQUwsR0FBZ0IsRUFBRSxNQUFGLENBZkg7QUFnQmIsZUFBSyxhQUFMLEdBQXFCLEtBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsS0FBM0IsQ0FBaUMsS0FBakMsQ0FoQlI7QUFpQmIsZUFBSyxLQUFMLEdBQWEsS0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixZQUEzQixDQUF3QyxXQUF4QyxDQUFiLENBakJhOztBQXFCYixlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsV0FBckMsR0FBbUQsVUFBQyxDQUFELEVBQU87QUFDeEQsbUJBQUssV0FBTCxDQUFpQixDQUFqQixFQUR3RDtXQUFQLENBckJ0Qzs7O2VBaklKIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
