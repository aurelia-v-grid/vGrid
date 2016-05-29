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
            itemEl.parentNode.setAttribute("column-no", index);

            itemEl.parentNode.au["v-grid-header-col"].viewModel.columnNo = index + "";
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
            evt.dataTransfer.setData('Text', '');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jbGFzcy1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OytCQVNhLGE7QUFXWCwrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFMbkIsS0FLbUIsR0FMWCxJQUtXO0FBQUEsZUFKbkIsT0FJbUIsR0FKVCxLQUlTO0FBQUEsZUFIbkIsUUFHbUIsR0FIUixLQUdROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2dDQUdELGMsNkJBQWlCO0FBQUE7O0FBRWYsY0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsSUFBcEMsQ0FBeUMsZ0JBQXpDLENBQTBELE1BQU0sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixVQUEzRixDQUFsQjtBQUNBLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxvQkFBSyxZQUFMLENBQWtCLElBQWxCO0FBQ0QsYUFKRDtBQUtBLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsS0FBZjs7QUFFQSxvQkFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0QsYUFKRDtBQU1ELFdBWkQ7QUFhRCxTOztnQ0FHRCxJLGlCQUFLLE0sRUFBUSxRLEVBQVUsTyxFQUFTLFEsRUFBVSxPLEVBQVM7QUFFakQsZUFBSyxjQUFMOztBQUdBLGVBQUssTUFBTCxHQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsTUFBcEMsQ0FBMkMsVUFBekQ7QUFHQSxlQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBMUMs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LE1BQTFCLElBQW9DLFVBQXBDLElBQWtELE9BQU8sWUFBUCxDQUFvQixXQUFwQixNQUFxQyxNQUEzRixFQUFtRztBQUNqRyx1QkFBSyxRQUFMLEdBQWdCLE9BQU8sWUFBUCxDQUFvQixXQUFwQixDQUFoQjtBQUNBLG9CQUFJLE9BQU8sT0FBTyxxQkFBUCxFQUFYO0FBQ0Esb0JBQUksUUFBUSxLQUFLLEtBQUwsR0FBYSxLQUFLLElBQTlCO0FBQ0Esb0JBQUksU0FBUyxLQUFLLE1BQUwsR0FBYyxLQUFLLEdBQWhDO0FBQ0Esb0JBQUksU0FBVSxPQUFPLFdBQVAsR0FBcUIsT0FBSyxNQUFMLENBQVksV0FBL0M7QUFDQSxvQkFBSSxTQUFVLE9BQU8sWUFBUCxHQUFzQixPQUFLLE1BQUwsQ0FBWSxZQUFoRDtBQUNBLG9CQUFJLFVBQVcsQ0FBQyxJQUFJLE9BQUosR0FBYyxLQUFLLElBQXBCLElBQTRCLEtBQTdCLEdBQXNDLEdBQXBEO0FBQ0EsdUJBQUssV0FBTCxHQUFtQixPQUFPLGtCQUExQjtBQUNBLG9CQUFJLFFBQVMsT0FBSyxXQUFMLEtBQXFCLE9BQUssTUFBM0IsSUFBc0MsQ0FBQyxNQUF2QyxJQUFpRCxXQUFXLE1BQXhFO0FBQ0EsdUJBQUssTUFBTCxDQUFZLFlBQVosQ0FBeUIsT0FBSyxNQUE5QixFQUFzQyxRQUFRLE9BQU8sV0FBZixHQUE2QixNQUFuRTtBQUNBLG9CQUFJLE9BQUssUUFBTCxLQUFrQixPQUFLLFFBQTNCLEVBQXFDO0FBRW5DLHlCQUFLLFdBQUwsQ0FBaUIsU0FBUyxPQUFLLFFBQWQsQ0FBakIsRUFBMEMsU0FBUyxPQUFLLFFBQWQsQ0FBMUM7QUFDQSx5QkFBSyxRQUFMLEdBQWdCLE9BQUssUUFBTCxHQUFnQixDQUFoQztBQUNEO0FBQ0Y7QUFDRCxxQkFBSyxLQUFMLEdBQWEsSUFBYjtBQUNELGFBaENZLEVBZ0NWLEdBaENVLENBQWI7QUFpQ0Q7QUFHRixTOztnQ0FJRCxTLHNCQUFVLEcsRUFBSzs7QUFFYixjQUFJLGNBQUo7O0FBRUEsZUFBSyxNQUFMLENBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixPQUE3QjtBQUNBLGVBQUssTUFBTCxDQUFZLG1CQUFaLENBQWdDLFdBQWhDLEVBQTZDLEtBQUssVUFBbEQsRUFBOEQsS0FBOUQ7QUFDQSxlQUFLLE1BQUwsQ0FBWSxtQkFBWixDQUFnQyxTQUFoQyxFQUEyQyxLQUFLLFNBQWhELEVBQTJELEtBQTNEOztBQUVBLGNBQUksS0FBSyxNQUFMLEtBQWdCLEtBQUssTUFBTCxDQUFZLFdBQWhDLEVBQTZDO0FBQzNDLGlCQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDRCxXQUZELE1BRU87QUFDTCxpQkFBSyxRQUFMO0FBQ0Q7QUFDRixTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jbGFzcy1zb3J0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
