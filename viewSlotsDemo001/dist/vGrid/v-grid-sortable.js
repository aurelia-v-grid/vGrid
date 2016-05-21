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
          x = this.vGrid.vGridConfig.attributeArray[oldIndex];
          this.vGrid.vGridConfig.attributeArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.attributeArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.filterArray[oldIndex];
          this.vGrid.vGridConfig.filterArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.filterArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.headerArray[oldIndex];
          this.vGrid.vGridConfig.headerArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.headerArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.columnWidthArray[oldIndex];
          this.vGrid.vGridConfig.columnWidthArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.columnWidthArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.colStyleArray[oldIndex];
          this.vGrid.vGridConfig.colStyleArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.colStyleArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.colTypeArray[oldIndex];
          this.vGrid.vGridConfig.colTypeArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.colTypeArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.readOnlyArray[oldIndex];
          this.vGrid.vGridConfig.readOnlyArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.readOnlyArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.colFormaterArray[oldIndex];
          this.vGrid.vGridConfig.colFormaterArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.colFormaterArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.colEditRawArray[oldIndex];
          this.vGrid.vGridConfig.colEditRawArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.colEditRawArray.splice(newIndex, 0, x);

          x = this.vGrid.vGridConfig.filterOnKeyArray[oldIndex];
          this.vGrid.vGridConfig.filterOnKeyArray.splice(oldIndex, 1);
          this.vGrid.vGridConfig.filterOnKeyArray.splice(newIndex, 0, x);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OytCQVNhLGE7QUFXWCwrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFMbkIsS0FLbUIsR0FMWCxJQUtXO0FBQUEsZUFKbkIsT0FJbUIsR0FKVCxLQUlTO0FBQUEsZUFIbkIsUUFHbUIsR0FIUixLQUdROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2dDQUdELGMsNkJBQWlCO0FBQUE7O0FBRWYsY0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsSUFBcEMsQ0FBeUMsZ0JBQXpDLENBQTBELE1BQU0sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixVQUEzRixDQUFsQjtBQUNBLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxvQkFBSyxZQUFMLENBQWtCLElBQWxCO0FBQ0QsYUFKRDtBQUtBLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsS0FBZjs7QUFFQSxvQkFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0QsYUFKRDtBQU1ELFdBWkQ7QUFhRCxTOztnQ0FHRCxJLGlCQUFLLE0sRUFBUSxRLEVBQVUsTyxFQUFTLFEsRUFBVSxPLEVBQVM7QUFFakQsZUFBSyxjQUFMOztBQUdBLGVBQUssTUFBTCxHQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsTUFBcEMsQ0FBMkMsVUFBekQ7QUFHQSxlQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBMUMsRUFBdUUs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
