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
          this.ready = true;

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

        VGridSortable.prototype.onUpdate = function onUpdate(oldIndex, newIndex) {};

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

              if (_this3.ready && target && target !== _this3.dragEl && targetNode && target.getAttribute("draggable") === "true") {
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
          console.log("dragened");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzsrQkFTYTtBQVlYLGlCQVpXLGFBWVgsQ0FBWSxLQUFaLEVBQW1CO2dDQVpSLGVBWVE7O2VBTm5CLFFBQVEsS0FNVztlQUxuQixVQUFVLE1BS1M7ZUFKbkIsV0FBVyxNQUlRO2VBd0xuQixRQUFRLEtBeExXOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRGlCO1NBQW5COztBQVpXLGdDQW9CWCwyQ0FBaUI7OztBQUVmLGNBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLElBQXBDLENBQXlDLGdCQUF6QyxDQUEwRCxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsVUFBM0IsQ0FBOUUsQ0FGVztBQUdmLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsSUFBZixDQUQwQjthQUFOLENBRHVCO0FBSTdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsS0FBZixDQUQwQjthQUFOLENBSnVCO1dBQVosQ0FBbkMsQ0FIZTs7O0FBcEJOLGdDQW1DWCxxQkFBSyxRQUFRLFVBQVUsU0FBUyxVQUFVLFNBQVM7QUFDakQsZUFBSyxjQUFMLEdBRGlEOztBQUlqRCxlQUFLLE1BQUwsR0FBYyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE1BQXBDLENBQTJDLFVBQTNDLENBSm1DO0FBT2pELGVBQUssWUFBTCxDQUFrQixJQUFsQixFQVBpRDs7QUFVakQsZUFBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsV0FBN0IsRUFBMEMsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENB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
