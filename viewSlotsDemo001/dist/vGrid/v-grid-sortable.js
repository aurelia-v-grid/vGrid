"use strict";

System.register([], function (_export, _context) {
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
            };
            itemEl.onmouseleave = function () {
              _this.canMove = false;
            };
          });
        };

        VGridSortable.prototype.init = function init(rootEl, onUpdate, onStart, onCancel, canMove) {
          this.setDragHandles();

          this.rootEl = this.vGrid.vGridGenerator.htmlCache.header.firstChild;
          this.setDraggable(true);

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

          var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
          [].slice.call(dragHandles).forEach(function (itemEl, index) {
            if (parseInt(itemEl.parentNode.getAttribute("column-no")) === oldIndex) {
              newIndex = index;
            }
          });

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

          this.vGrid.vGridGenerator.htmlCache.rowTemplate = null;
          var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
          [].slice.call(dragHandles).forEach(function (itemEl, index) {
            itemEl.parentNode.setAttribute("column-no", index);
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
                var targetNode = target.nodeName === 'DIV' || target.nodeName === 'V-GRID-CELL-HEADER';
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
            }, 100);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzsrQkFTYTtBQVlYLGlCQVpXLGFBWVgsQ0FBWSxLQUFaLEVBQW1CO2dDQVpSLGVBWVE7O2VBTm5CLFFBQVEsS0FNVztlQUxuQixVQUFVLE1BS1M7ZUFKbkIsV0FBVyxNQUlROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRGlCO1NBQW5COztBQVpXLGdDQWlCWCwyQ0FBaUI7OztBQUVmLGNBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLElBQXBDLENBQXlDLGdCQUF6QyxDQUEwRCxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsVUFBM0IsQ0FBOUUsQ0FGVztBQUdmLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsSUFBZixDQUQwQjthQUFOLENBRHVCO0FBSTdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsS0FBZixDQUQwQjthQUFOLENBSnVCO1dBQVosQ0FBbkMsQ0FIZTs7O0FBakJOLGdDQWdDWCxxQkFBSyxRQUFRLFVBQVUsU0FBUyxVQUFVLFNBQVM7QUFDakQsZUFBSyxjQUFMLEdBRGlEOztBQUlqRCxlQUFLLE1BQUwsR0FBYyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE1BQXBDLENBQTJDLFVBQTNDLENBSm1DO0FBT2pELGVBQUssWUFBTCxDQUFrQixJQUFsQixFQVBpRDs7QUFVakQsZUFBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsV0FBN0IsRUFBMEMsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQTFDLEVBQXVFLEtBQXZFLEVB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
