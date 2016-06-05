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

          var headerCells = this.vGridGenerator.headerElement.getElementsByTagName("v-grid-header-col");
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

          this.vGridGenerator.headerElement.onmouseleave = "";
          this.vGridGenerator.headerElement.onmousemove = "";
          this.vGridGenerator.headerElement.onmouseup = "";

          this.vGridConfig.colConfig[this.index].width = parseInt(this.xElement.offsetParent.style.width);

          this.vGridGenerator.rowTemplate = null;
          this.vGridGenerator.correctRowAndScrollbodyWidth();
          this.vGridGenerator.recreateRowViewSlots();
          this.vGridGenerator.updateGridScrollbars();
          this.vGridGenerator.rebindAllRowSlots(true);
        };

        VGridResizable.prototype.onmousemove = function onmousemove(e) {
          var _this3 = this;

          this.vGridGenerator.headerElement.onmouseup = function () {
            _this3.onmouseup();
          };

          this.vGridGenerator.headerElement.onmouseleave = function (e) {
            _this3.vGridGenerator.headerElement.onmouseup(e);
          };

          if (this.resizable) {
            this.updateHeader(e);
          } else {
            this.vGridGenerator.correctHeaderAndScrollbodyWidth();
          }
        };

        VGridResizable.prototype.updateHeader = function updateHeader(e) {
          var newWidth = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
          if (parseInt(newWidth) > 15) {
            this.vGridConfig.colConfig[this.index].width = parseInt(newWidth);
            this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
            this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";

            if (this.vGridConfig.attResizableHeadersAndRows) {
              var columnsToFix = this.vGridGenerator.contentElement.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + this.index);

              for (var col = 0; col < columnsToFix.length; col++) {
                columnsToFix[col].style.width = newWidth;
              }

              this.vGridGenerator.correctRowAndScrollbodyWidth();
              this.vGridGenerator.updateGridScrollbars();
            }
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
          this.started = false;

          this.vGridGenerator.headerElement.onmousemove = function (e) {
            _this4.started = true;
            _this4.onmousemove(e);
          };

          this.vGridGenerator.headerElement.onmouseup = function (e) {
            if (!_this4.started) {
              _this4.vGridGenerator.headerElement.onmousemove = "";
            }
          };
        };

        return VGridResizable;
      }());

      _export("VGridResizable", VGridResizable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztnQ0FNYSxjO0FBUVgsZ0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGVBTG5CLFNBS21CLEdBTFAsS0FLTzs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNEOztpQ0FNRCxJLG1CQUFPO0FBQUE7O0FBQ0wsZUFBSyxXQUFMLEdBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLEtBQUssS0FBTCxDQUFXLGNBQWpDO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssS0FBTCxDQUFXLGFBQWhDOztBQUVBLGNBQUksY0FBYyxLQUFLLGNBQUwsQ0FBb0IsYUFBcEIsQ0FBa0Msb0JBQWxDLENBQXVELG1CQUF2RCxDQUFsQjtBQUNBLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxZQUFZLE1BQWhDLEVBQXdDLEdBQXhDLEVBQTZDOztBQUUzQyxnQkFBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLHlCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLHNCQUFoRDs7QUFFQSx5QkFBYSxXQUFiLEdBQTJCLFVBQUMsQ0FBRCxFQUFPO0FBQ2hDLG9CQUFLLFdBQUwsQ0FBaUIsQ0FBakI7QUFDRCxhQUZEOztBQUlBLHdCQUFZLENBQVosRUFBZSxXQUFmLENBQTJCLFlBQTNCO0FBQ0Q7QUFDRixTOztpQ0FNRCxTLHdCQUFZO0FBQUE7O0FBR1YscUJBQVcsWUFBTTtBQUNmLG1CQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxnQkFBSSxPQUFLLFdBQUwsQ0FBaUIsaUJBQXJCLEVBQXdDO0FBQ3RDLHFCQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsVUFBMUIsRUFBc0MsT0FBSyxTQUEz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QUwsR0FBZSxFQUFFLE9BQWpCO0FBQ0EsZUFBSyxRQUFMLEdBQWdCLEVBQUUsTUFBbEI7QUFDQSxlQUFLLGFBQUwsR0FBcUIsS0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQixDQUFpQyxLQUF0RDtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsWUFBM0IsQ0FBd0MsV0FBeEMsQ0FBYjtBQUNBLGVBQUssT0FBTCxHQUFlLEtBQWY7O0FBR0EsZUFBSyxjQUFMLENBQW9CLGFBQXBCLENBQWtDLFdBQWxDLEdBQWdELFVBQUMsQ0FBRCxFQUFPO0FBQ3JELG1CQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsbUJBQUssV0FBTCxDQUFpQixDQUFqQjtBQUNELFdBSEQ7O0FBS0EsZUFBSyxjQUFMLENBQW9CLGFBQXBCLENBQWtDLFNBQWxDLEdBQThDLFVBQUMsQ0FBRCxFQUFPO0FBQ25ELGdCQUFHLENBQUMsT0FBSyxPQUFULEVBQWtCO0FBQ2hCLHFCQUFLLGNBQUwsQ0FBb0IsYUFBcEIsQ0FBa0MsV0FBbEMsR0FBK0MsRUFBL0M7QUFDRDtBQUNGLFdBSkQ7QUFNRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
