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
            if (_this2.vGridConfig.attSortableHeader) {
              _this2.vGridSortable.option("disabled", _this2.resizable);
            }
          }, 30);

          this.vGridGenerator.htmlCache.header.onmouseleave = "";
          this.vGridGenerator.htmlCache.header.onmousemove = "";
          this.vGridGenerator.htmlCache.header.onmouseup = "";

          this.vGridConfig.colConfig[this.index].width = parseInt(this.xElement.offsetParent.style.width);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztnQ0FNYSxjO0FBUVgsZ0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGVBTG5CLFNBS21CLEdBTFAsS0FLTzs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNEOztpQ0FNRCxJLG1CQUFPO0FBQUE7O0FBQ0wsZUFBSyxXQUFMLEdBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLEtBQUssS0FBTCxDQUFXLGNBQWpDO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssS0FBTCxDQUFXLGFBQWhDOztBQUVBLGNBQUksY0FBYyxLQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBOUIsQ0FBcUMsZ0JBQXJDLENBQXNELE1BQU0sS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGFBQWpGLENBQWxCO0FBQ0EsZUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFlBQVksTUFBaEMsRUFBd0MsR0FBeEMsRUFBNkM7O0FBRTNDLGdCQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EseUJBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsc0JBQWhEOztBQUVBLHlCQUFhLFdBQWIsR0FBMkIsVUFBQyxDQUFELEVBQU87QUFDaEMsb0JBQUssV0FBTCxDQUFpQixDQUFqQjtBQUNELGFBRkQ7O0FBSUEsd0JBQVksQ0FBWixFQUFlLFdBQWYsQ0FBMkIsWUFBM0I7QUFDRDtBQUNGLFM7O2lDQU1ELFMsd0JBQVk7QUFBQTs7QUFHVixxQkFBVyxZQUFNO0FBQ2YsbUJBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNBLGdCQUFJLE9BQUssV0FBTCxDQUFpQixpQkFBckIsRUFBd0M7QUFDdEMscUJBQUss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QixpQkFBckIsRUFBd0M7QUFDdEMsaUJBQUssYUFBTCxDQUFtQixNQUFuQixDQUEwQixVQUExQixFQUFzQyxLQUFLLFNBQTNDO0FBQ0Q7O0FBSUQsZUFBSyxPQUFMLEdBQWUsRUFBRSxPQUFqQjtBQUNBLGVBQUssUUFBTCxHQUFnQixFQUFFLE1BQWxCO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsS0FBM0IsQ0FBaUMsS0FBdEQ7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLFlBQTNCLENBQXdDLFdBQXhDLENBQWI7O0FBSUEsZUFBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLENBQXFDLFdBQXJDLEdBQW1ELFVBQUMsQ0FBRCxFQUFPO0FBQ3hELG1CQUFLLFdBQUwsQ0FBaUIsQ0FBakI7QUFDRCxXQUZEO0FBS0QsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcmVzaXphYmxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
