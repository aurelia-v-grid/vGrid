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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzsrQkFTYTtBQVdYLGlCQVhXLGFBV1gsQ0FBWSxLQUFaLEVBQW1CO2dDQVhSLGVBV1E7O2VBTG5CLFFBQVEsS0FLVztlQUpuQixVQUFVLE1BSVM7ZUFIbkIsV0FBVyxNQUdROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRGlCO1NBQW5COztBQVhXLGdDQWdCWCwyQ0FBaUI7OztBQUVmLGNBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLElBQXBDLENBQXlDLGdCQUF6QyxDQUEwRCxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsVUFBM0IsQ0FBOUUsQ0FGVztBQUdmLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsSUFBZixDQUQwQjthQUFOLENBRHVCO0FBSTdDLG1CQUFPLFlBQVAsR0FBc0IsWUFBTTtBQUMxQixvQkFBSyxPQUFMLEdBQWUsS0FBZixDQUQwQjthQUFOLENBSnVCO1dBQVosQ0FBbkMsQ0FIZTs7O0FBaEJOLGdDQStCWCxxQkFBSyxRQUFRLFVBQVUsU0FBUyxVQUFVLFNBQVM7QUFDakQsZUFBSyxjQUFMLEdBRGlEOztBQUlqRCxlQUFLLE1BQUwsR0FBYyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE1BQXBDLENBQTJDLFVBQTNDLENBSm1DO0FBT2pELGVBQUssWUFBTCxDQUFrQixJQUFsQixFQVBpRDs7QUFVakQsZUFBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsV0FBN0IsRUFBMEMsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQTFDLEVBQXVFLEtBQXZFLEVB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a0IsT0FBSyxRQUFMLEVBQWU7QUFFbkMseUJBQUssV0FBTCxDQUFpQixTQUFTLE9BQUssUUFBTCxDQUExQixFQUEwQyxTQUFTLE9BQUssUUFBTCxDQUFuRCxFQUZtQztBQUduQyx5QkFBSyxRQUFMLEdBQWdCLE9BQUssUUFBTCxHQUFnQixDQUFoQixDQUhtQjtpQkFBckM7ZUFYRjtBQWlCQSxxQkFBSyxLQUFMLEdBQWEsSUFBYixDQS9CMkI7YUFBTCxFQWdDckIsR0FoQ1UsQ0FBYixDQURlO1dBQWpCOzs7QUF4S1MsZ0NBaU5YLCtCQUFVLEtBQUs7O0FBRWIsY0FBSSxjQUFKLEdBRmE7O0FBSWIsZUFBSyxNQUFMLENBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixPQUE3QixFQUphO0FBS2IsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsV0FBaEMsRUFBNkMsS0FBSyxVQUFMLEVBQWlCLEtBQTlELEVBTGE7QUFNYixlQUFLLE1BQUwsQ0FBWSxtQkFBWixDQUFnQyxTQUFoQyxFQUEyQyxLQUFLLFNBQUwsRUFBZ0IsS0FBM0QsRUFOYTs7QUFRYixjQUFJLEtBQUssTUFBTCxLQUFnQixLQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCO0FBQzNDLGlCQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FEMkM7V0FBN0MsTUFFTztBQUNMLGlCQUFLLFFBQUwsR0FESztXQUZQOzs7ZUF6TlMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXNvcnRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
