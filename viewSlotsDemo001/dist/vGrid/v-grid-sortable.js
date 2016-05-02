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

          var that = this;
          this.vGrid.vGridGenerator.htmlCache.rowTemplate = null;
          var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
          [].slice.call(dragHandles).forEach(function (itemEl, index) {
            itemEl.parentNode.setAttribute("column-no", index);

            itemEl.parentNode.au["v-grid-cell-header"].viewModel.columnNo = index + "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzsrQkFTYTtBQVlYLGlCQVpXLGFBWVgsQ0FBWSxLQUFaLEVBQW1CO2dDQVpSLGVBWVE7O2VBTm5CLFFBQVEsS0FNVztlQUxuQixVQUFVLE1BS1M7ZUFKbkIsV0FBVyxNQUlROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRGlCO1NBQW5COztBQVpXLGdDQWlCWCwyQ0FBaUI7OztBQUVmLGNBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLElBQXBDLENBQXlDLGdCQUF6QyxDQUEwRCxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsVUFBM0IsQ0FBOUUsQ0FGVztBQUdmLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsSUFBZixDQUQwQjthQUFOLENBRHVCO0FBSTdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsS0FBZixDQUQwQjthQUFOLENBSnVCO1dBQVosQ0FBbkMsQ0FIZTs7O0FBakJOLGdDQWdDWCxxQkFBSyxRQUFRLFVBQVUsU0FBUyxVQUFVLFNBQVM7QUFDakQsZUFBSyxjQUFMLEdBRGlEOztBQUlqRCxlQUFLLE1BQUwsR0FBYyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE1BQXBDLENBQTJDLFVBQTNDLENBSm1DO0FBT2pELGVBQUssWUFBTCxDQUFrQixJQUFsQixFQVBpRDs7QUFVakQsZUFBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsV0FBN0IsRUFBMEMsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQTFDLEVBQXVFLEtBQXZFLEVB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QUNqRyx1QkFBSyxRQUFMLEdBQWdCLE9BQU8sWUFBUCxDQUFvQixXQUFwQixDQUFoQixDQURpRztBQUVqRyxvQkFBSSxPQUFPLE9BQU8scUJBQVAsRUFBUCxDQUY2RjtBQUdqRyxvQkFBSSxRQUFRLEtBQUssS0FBTCxHQUFhLEtBQUssSUFBTCxDQUh3RTtBQUlqRyxvQkFBSSxTQUFTLEtBQUssTUFBTCxHQUFjLEtBQUssR0FBTCxDQUpzRTtBQUtqRyxvQkFBSSxTQUFVLE9BQU8sV0FBUCxHQUFxQixPQUFLLE1BQUwsQ0FBWSxXQUFaLENBTDhEO0FBTWpHLG9CQUFJLFNBQVUsT0FBTyxZQUFQLEdBQXNCLE9BQUssTUFBTCxDQUFZLFlBQVosQ0FONkQ7QUFPakcsb0JBQUksVUFBVSxDQUFFLElBQUksT0FBSixHQUFjLEtBQUssSUFBTCxDQUFmLEdBQTRCLEtBQTVCLEdBQXFDLEdBQXRDLENBUG1GO0FBUWpHLHVCQUFLLFdBQUwsR0FBbUIsT0FBTyxrQkFBUCxDQVI4RTtBQVNqRyxvQkFBSSxRQUFRLE1BQUMsQ0FBSyxXQUFMLEtBQXFCLE9BQUssTUFBTCxJQUFnQixDQUFDLE1BQUQsSUFBVyxXQUFXLE1BQVgsQ0FUb0M7QUFVakcsdUJBQUssTUFBTCxDQUFZLFlBQVosQ0FBeUIsT0FBSyxNQUFMLEVBQWEsUUFBUSxPQUFPLFdBQVAsR0FBcUIsTUFBN0IsQ0FBdEMsQ0FWaUc7QUFXakcsb0JBQUksT0FBSyxRQUFMLEtBQWtCLE9BQUssUUFBTCxFQUFlO0FBRW5DLHlCQUFLLFdBQUwsQ0FBaUIsU0FBUyxPQUFLLFFBQUwsQ0FBMUIsRUFBMEMsU0FBUyxPQUFLLFFBQUwsQ0FBbkQsRUFGbUM7QUFHbkMseUJBQUssUUFBTCxHQUFnQixPQUFLLFFBQUwsR0FBZ0IsQ0FBaEIsQ0FIbUI7aUJBQXJDO2VBWEY7QUFpQkEscUJBQUssS0FBTCxHQUFhLElBQWIsQ0FoQzJCO2FBQUwsRUFpQ3JCLEdBakNVLENBQWIsQ0FEZTtXQUFqQjs7O0FBeEtTLGdDQWtOWCwrQkFBVSxLQUFLOztBQUViLGNBQUksY0FBSixHQUZhOztBQUliLGVBQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsT0FBN0IsRUFKYTtBQUtiLGVBQUssTUFBTCxDQUFZLG1CQUFaLENBQWdDLFdBQWhDLEVBQTZDLEtBQUssVUFBTCxFQUFpQixLQUE5RCxFQUxhO0FBTWIsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsU0FBaEMsRUFBMkMsS0FBSyxTQUFMLEVBQWdCLEtBQTNELEVBTmE7O0FBUWIsY0FBSSxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxNQUFMLENBQVksV0FBWixFQUF5QjtBQUczQyxpQkFBSyxXQUFMLEdBQW1CLElBQW5CLENBSDJDO1dBQTdDLE1BSU87QUFDTCxpQkFBSyxRQUFMLEdBREs7V0FKUDs7O2VBMU5TIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
