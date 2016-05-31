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

          var headerCells = this.vGridGenerator.headerElement.querySelectorAll("." + this.vGridConfig.css.rowHeaderCell);
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
          this.vGridGenerator.fillDataInRows(true);
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

          this.vGridGenerator.headerElement.onmousemove = function (e) {
            _this4.onmousemove(e);
          };
        };

        return VGridResizable;
      }());

      _export("VGridResizable", VGridResizable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yZXNpemFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztnQ0FNYSxjO0FBUVgsZ0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGVBTG5CLFNBS21CLEdBTFAsS0FLTzs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNEOztpQ0FNRCxJLG1CQUFPO0FBQUE7O0FBQ0wsZUFBSyxXQUFMLEdBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLEtBQUssS0FBTCxDQUFXLGNBQWpDO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssS0FBTCxDQUFXLGFBQWhDOztBQUVBLGNBQUksY0FBYyxLQUFLLGNBQUwsQ0FBb0IsYUFBcEIsQ0FBa0MsZ0JBQWxDLENBQW1ELE1BQU0sS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGFBQTlFLENBQWxCO0FBQ0EsZUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFlBQVksTUFBaEMsRUFBd0MsR0FBeEMsRUFBNkM7O0FBRTNDLGdCQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EseUJBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsc0JBQWhEOztBQUVBLHlCQUFhLFdBQWIsR0FBMkIsVUFBQyxDQUFELEVBQU87QUFDaEMsb0JBQUssV0FBTCxDQUFpQixDQUFqQjtBQUNELGFBRkQ7O0FBSUEsd0JBQVksQ0FBWixFQUFlLFdBQWYsQ0FBMkIsWUFBM0I7QUFDRDtBQUNGLFM7O2lDQU1ELFMsd0JBQVk7QUFBQTs7QUFHVixxQkFBVyxZQUFNO0FBQ2YsbUJBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNBLGdCQUFJLE9BQUssV0FBTCxDQUFpQixpQkFBckIsRUFBd0M7QUFDdEMscUJBQUssYUFBTCxDQUFtQixNQUFuQixDQUEwQixVQUExQixFQUFzQyxPQUFLLFNBQTNDO0FBQ0Q7QUFDRixXQUxELEVBS0csRUFMSDs7QUFRQSxlQUFLLGNBQUwsQ0FBb0IsYUFBcEIsQ0FBa0MsWUFBbEMsR0FBaUQsRUFBakQ7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsYUFBcEIsQ0FBa0MsV0FBbEMsR0FBZ0QsRUFBaEQ7QUFDQSxlQUFLLGNBQUwsQ0FBb0IsYUFBcEIsQ0FBa0MsU0FBbEMsR0FBOEMsRUFBOUM7O0FBR0EsZUFBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLEtBQUssS0FBaEMsRUFBdUMsS0FBdkMsR0FBK0MsU0FBUyxLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCLENBQWlDLEtBQTFDLENBQS9DOztBQUdBLGVBQUssY0FBTCxDQUFvQixXQUFwQixHQUFrQyxJQUFsQztBQUNBLGVBQUssY0FBTCxDQUFvQiw0QkFBcEI7QUFDQSxlQUFLLGNBQUwsQ0FBb0Isb0JBQXBCO0FBQ0EsZUFBSyxjQUFMLENBQW9CLG9CQUFwQjtBQUNBLGVBQUssY0FBTCxDQUFvQixjQUFwQixDQUFtQyxJQUFuQztBQUVELFM7O2lDQU1ELFcsd0JBQVksQyxFQUFHO0FBQUE7O0FBR2IsZUFBSyxjQUFMLENBQW9CLGFBQXBCLENBQWtDLFNBQWxDLEdBQThDLFlBQU07QUFDbEQsbUJBQUssU0FBTDtBQUNELFdBRkQ7O0FBS0EsZUFBSyxjQUFMLENBQW9CLGFBQXBCLENBQWtDLFlBQWxDLEdBQWlELFVBQUMsQ0FBRCxFQUFPO0FBQ3RELG1CQUFLLGNBQUwsQ0FBb0IsYUFBcEIsQ0FBa0MsU0FBbEMsQ0FBNEMsQ0FBNUM7QUFDRCxXQUZEOztBQUtBLGNBQUksS0FBSyxTQUFULEVBQW9CO0FBQ2xCLGlCQUFLLFlBQUwsQ0FBa0IsQ0FBbEI7QUFDRCxXQUZELE1BRU87QUFDTCxpQkFBSyxjQUFMLENBQW9CLCtCQUFwQjtBQUNEO0FBQ0YsUzs7aUNBTUQsWSx5QkFBYSxDLEVBQUc7QUFHZCxjQUFJLFdBQVcsU0FBUyxLQUFLLGFBQWQsS0FBaUMsS0FBSyxPQUFMLEdBQWUsRUFBRSxPQUFsRCxJQUE4RCxJQUE3RTtBQUNBLGNBQUcsU0FBUyxRQUFULElBQXFCLEVBQXhCLEVBQTJCO0FBQzNCLGlCQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsS0FBSyxLQUFoQyxFQUF1QyxLQUF2QyxHQUErQyxTQUFTLFFBQVQsQ0FBL0M7QUFDQSxpQkFBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQixDQUFpQyxLQUFqQyxHQUF5QyxTQUFTLEtBQUssYUFBZCxLQUFpQyxLQUFLLE9BQUwsR0FBZSxFQUFFLE9BQWxELElBQThELElBQXZHO0FBQ0EsaUJBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsS0FBM0IsQ0FBaUMsS0FBakMsR0FBeUMsU0FBUyxLQUFLLGFBQWQsS0FBaUMsS0FBSyxPQUFMLEdBQWUsRUFBRSxPQUFsRCxJQUE4RCxJQUF2Rzs7QUFHRSxnQkFBSSxLQUFLLFdBQUwsQ0FBaUIsMEJBQXJCLEVBQWlEO0FBQy9DLGtCQUFJLGVBQWUsS0FBSyxjQUFMLENBQW9CLGNBQXBCLENBQW1DLFVBQW5DLENBQThDLGdCQUE5QyxDQUErRCxNQUFNLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixTQUEzQixHQUF1QyxLQUFLLEtBQTNHLENBQW5COztBQUVBLG1CQUFLLElBQUksTUFBTSxDQUFmLEVBQWtCLE1BQU0sYUFBYSxNQUFyQyxFQUE2QyxLQUE3QyxFQUFvRDtBQUNsRCw2QkFBYSxHQUFiLEVBQWtCLEtBQWxCLENBQXdCLEtBQXhCLEdBQWdDLFFBQWhDO0FBQ0Q7O0FBRUQsbUJBQUssY0FBTCxDQUFvQiw0QkFBcEI7QUFDQSxtQkFBSyxjQUFMLENBQW9CLG9CQUFwQjtBQUVEO0FBQ0Y7QUFFRixTOztpQ0FNRCxXLHdCQUFZLEMsRUFBRztBQUFBOztBQUViLGVBQUssU0FBTCxHQUFpQixJQUFqQjs7QUFHQSxjQUFJLEtBQUssV0FBTCxDQUFpQixpQkFBckIsRUFBd0M7QUFDdEMsaUJBQUssYUFBTCxDQUFtQixNQUFuQixDQUEwQixVQUExQixFQUFzQyxLQUFLLFNBQTNDO0FBQ0Q7O0FBR0QsZUFBSyxPQUFMLEdBQWUsRUFBRSxPQUFqQjtBQUNBLGVBQUssUUFBTCxHQUFnQixFQUFFLE1BQWxCO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsS0FBM0IsQ0FBaUMsS0FBdEQ7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLFlBQTNCLENBQXdDLFdBQXhDLENBQWI7O0FBSUEsZUFBSyxjQUFMLENBQW9CLGFBQXBCLENBQWtDLFdBQWxDLEdBQWdELFVBQUMsQ0FBRCxFQUFPO0FBQ3JELG1CQUFLLFdBQUwsQ0FBaUIsQ0FBakI7QUFDRCxXQUZEO0FBSUQsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcmVzaXphYmxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
