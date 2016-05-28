"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var VGridSortable;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridSortable", VGridSortable = function () {
        function VGridSortable(vGrid) {
          _classCallCheck(this, VGridSortable);

          this.timer = null;
          this.canMove = false;
          this.sortable = false;

          this.vGrid = vGrid;
        }

        VGridSortable.prototype.setDragHandles = function setDragHandles() {
          var _this = this;

          var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
          [].slice.call(dragHandles).forEach(function (itemEl) {
            itemEl.onmouseenter = function () {
              _this.canMove = true;

              _this.setDraggable(true);
            };
            itemEl.onmouseleave = function () {
              _this.canMove = false;

              _this.setDraggable(false);
            };
          });
        };

        VGridSortable.prototype.init = function init(rootEl, onUpdate, onStart, onCancel, canMove) {
          this.setDragHandles();

          this.rootEl = this.vGrid.vGridGenerator.htmlCache.header.firstChild;
          this.rootEl.addEventListener('dragstart', this.onDragStart.bind(this), false);
        };

        VGridSortable.prototype.onStart = function onStart() {
          this.sortable = true;
        };

        VGridSortable.prototype.onCancel = function onCancel() {
          this.sortable = false;
        };

        VGridSortable.prototype.isDragHandle = function isDragHandle() {
          return this.canMove;
        };

        VGridSortable.prototype.onUpdateAlt = function onUpdateAlt(oldIndex, newIndex) {
          var children = this.vGrid.vGridGenerator.htmlCache.header.firstChild.children;

          var x;

          x = this.vGrid.vGridConfig.columnWidthArray[oldIndex];
          this.vGrid.vGridConfig.columnWidthArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.columnWidthArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.colHeaderTemplateArray[oldIndex];
          this.vGrid.vGridConfig.colHeaderTemplateArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.colHeaderTemplateArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.colRowTemplateArray[oldIndex];
          this.vGrid.vGridConfig.colRowTemplateArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.colRowTemplateArray.splice(newIndex, 0, x);

          var that = this;
          this.vGrid.vGridGenerator.htmlCache.rowTemplate = null;
          var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
          [].slice.call(dragHandles).forEach(function (itemEl, index) {
            itemEl.parentNode.parentNode.setAttribute("column-no", index);

            itemEl.parentNode.parentNode.au["v-grid-header-col"].viewModel.columnNo = index + "";
          });
          this.vGrid.vGridGenerator.rebuildColumnsRows();
        };

        VGridSortable.prototype.setDraggable = function setDraggable(newStatus) {
          [].slice.call(this.rootEl.children).forEach(function (itemEl) {
            itemEl.draggable = newStatus;
          });
        };

        VGridSortable.prototype.onDragStart = function onDragStart(evt) {
          var _this2 = this;

          this.dragEl = evt.target;
          this.oldIndex = evt.target.getAttribute("column-no");

          if (this.isDragHandle()) {
            this.onStart();
            this.nextEl = this.dragEl.nextSibling;

            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('Text', this.vGrid.vGridConfig.attributeArray[this.oldIndex]);

            this.rootEl.addEventListener('dragover', this.onDragOver.bind(this), false);
            this.rootEl.addEventListener('dragend', this.onDragEnd.bind(this), false);

            setTimeout(function () {
              _this2.dragEl.classList.add('ghost');
            }, 0);
          } else {
            evt.preventDefault();
          }
        };

        VGridSortable.prototype.option = function option(type, disabled) {
          if (disabled) {
            this.setDraggable(false);
          } else {
            this.setDraggable(true);
          }
        };

        VGridSortable.prototype.onDragOver = function onDragOver(evt) {
          var _this3 = this;

          if (!this.timer) {
            this.timer = setTimeout(function () {
              if (evt.preventDefault !== void 0) {
                evt.preventDefault();
                evt.stopPropagation();
              }


              var target = evt.target.offsetParent;
              try {
                var targetNode = target.nodeName === 'DIV' || target.nodeName === 'V-GRID-HEADER-COL';
              } catch (e) {}

              if (target && target !== _this3.dragEl && targetNode && target.getAttribute("draggable") === "true") {
                _this3.newIndex = target.getAttribute("column-no");
                var rect = target.getBoundingClientRect();
                var width = rect.right - rect.left;
                var height = rect.bottom - rect.top;
                var isWide = target.offsetWidth > _this3.dragEl.offsetWidth;
                var isLong = target.offsetHeight > _this3.dragEl.offsetHeight;
                var halfway = (evt.clientX - rect.left) / width > 0.5;
                _this3.nextSibling = target.nextElementSibling;
                var after = _this3.nextSibling !== _this3.dragEl && !isLong || halfway && isLong;
                _this3.rootEl.insertBefore(_this3.dragEl, after ? target.nextSibling : target);
                if (_this3.oldIndex !== _this3.newIndex) {
                  _this3.onUpdateAlt(parseInt(_this3.oldIndex), parseInt(_this3.newIndex));
                  _this3.oldIndex = _this3.newIndex * 1;
                }
              }
              _this3.timer = null;
            }, 150);
          }
        };

        VGridSortable.prototype.onDragEnd = function onDragEnd(evt) {

          evt.preventDefault();

          this.dragEl.classList.remove('ghost');
          this.rootEl.removeEventListener('dragover)', this.onDragOver, false);
          this.rootEl.removeEventListener('dragend', this.onDragEnd, false);

          if (this.nextEl !== this.dragEl.nextSibling) {
            this.nextSibling = null;
          } else {
            this.onCancel();
          }
        };

        return VGridSortable;
      }());

      _export("VGridSortable", VGridSortable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OytCQVNhLGE7QUFXWCwrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFMbkIsS0FLbUIsR0FMWCxJQUtXO0FBQUEsZUFKbkIsT0FJbUIsR0FKVCxLQUlTO0FBQUEsZUFIbkIsUUFHbUIsR0FIUixLQUdROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2dDQUdELGMsNkJBQWlCO0FBQUE7O0FBRWYsY0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsSUFBcEMsQ0FBeUMsZ0JBQXpDLENBQTBELE1BQU0sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixVQUEzRixDQUFsQjtBQUNBLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxvQkFBSyxZQUFMLENBQWtCLElBQWxCO0FBQ0QsYUFKRDtBQUtBLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsS0FBZjs7QUFFQSxvQkFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0QsYUFKRDtBQU1ELFdBWkQ7QUFhRCxTOztnQ0FHRCxJLGlCQUFLLE0sRUFBUSxRLEVBQVUsTyxFQUFTLFEsRUFBVSxPLEVBQVM7QUFFakQsZUFBSyxjQUFMOztBQUdBLGVBQUssTUFBTCxHQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsTUFBcEMsQ0FBMkMsVUFBekQ7QUFHQSxlQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBMUMsRUFBdUUs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QkFBbEU7QUFDRCxlQUZELENBRUUsT0FBTyxDQUFQLEVBQVUsQ0FDWDs7QUFHRCxrQkFBSSxVQUFVLFdBQVcsT0FBSyxNQUExQixJQUFvQyxVQUFwQyxJQUFrRCxPQUFPLFlBQVAsQ0FBb0IsV0FBcEIsTUFBcUMsTUFBM0YsRUFBbUc7QUFDakcsdUJBQUssUUFBTCxHQUFnQixPQUFPLFlBQVAsQ0FBb0IsV0FBcEIsQ0FBaEI7QUFDQSxvQkFBSSxPQUFPLE9BQU8scUJBQVAsRUFBWDtBQUNBLG9CQUFJLFFBQVEsS0FBSyxLQUFMLEdBQWEsS0FBSyxJQUE5QjtBQUNBLG9CQUFJLFNBQVMsS0FBSyxNQUFMLEdBQWMsS0FBSyxHQUFoQztBQUNBLG9CQUFJLFNBQVUsT0FBTyxXQUFQLEdBQXFCLE9BQUssTUFBTCxDQUFZLFdBQS9DO0FBQ0Esb0JBQUksU0FBVSxPQUFPLFlBQVAsR0FBc0IsT0FBSyxNQUFMLENBQVksWUFBaEQ7QUFDQSxvQkFBSSxVQUFXLENBQUMsSUFBSSxPQUFKLEdBQWMsS0FBSyxJQUFwQixJQUE0QixLQUE3QixHQUFzQyxHQUFwRDtBQUNBLHVCQUFLLFdBQUwsR0FBbUIsT0FBTyxrQkFBMUI7QUFDQSxvQkFBSSxRQUFTLE9BQUssV0FBTCxLQUFxQixPQUFLLE1BQTNCLElBQXNDLENBQUMsTUFBdkMsSUFBaUQsV0FBVyxNQUF4RTtBQUNBLHVCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLE9BQUssTUFBOUIsRUFBc0MsUUFBUSxPQUFPLFdBQWYsR0FBNkIsTUFBbkU7QUFDQSxvQkFBSSxPQUFLLFFBQUwsS0FBa0IsT0FBSyxRQUEzQixFQUFxQztBQUVuQyx5QkFBSyxXQUFMLENBQWlCLFNBQVMsT0FBSyxRQUFkLENBQWpCLEVBQTBDLFNBQVMsT0FBSyxRQUFkLENBQTFDO0FBQ0EseUJBQUssUUFBTCxHQUFnQixPQUFLLFFBQUwsR0FBZ0IsQ0FBaEM7QUFDRDtBQUNGO0FBQ0QscUJBQUssS0FBTCxHQUFhLElBQWI7QUFDRCxhQWhDWSxFQWdDVixHQWhDVSxDQUFiO0FBaUNEO0FBR0YsUzs7Z0NBSUQsUyxzQkFBVSxHLEVBQUs7O0FBRWIsY0FBSSxjQUFKOztBQUVBLGVBQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsT0FBN0I7QUFDQSxlQUFLLE1BQUwsQ0FBWSxtQkFBWixDQUFnQyxXQUFoQyxFQUE2QyxLQUFLLFVBQWxELEVBQThELEtBQTlEO0FBQ0EsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsU0FBaEMsRUFBMkMsS0FBSyxTQUFoRCxFQUEyRCxLQUEzRDs7QUFFQSxjQUFJLEtBQUssTUFBTCxLQUFnQixLQUFLLE1BQUwsQ0FBWSxXQUFoQyxFQUE2QztBQUMzQyxpQkFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUssUUFBTDtBQUNEO0FBQ0YsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc29ydGFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
