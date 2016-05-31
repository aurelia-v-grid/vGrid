'use strict';

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
      _export('VGridSortable', VGridSortable = function () {
        function VGridSortable(vGrid) {
          _classCallCheck(this, VGridSortable);

          this.timer = null;
          this.canMove = false;
          this.sortable = false;

          this.vGrid = vGrid;
        }

        VGridSortable.prototype.setDragHandles = function setDragHandles() {
          var _this = this;

          var dragHandles = this.vGrid.vGridGenerator.gridElement.getElementsByTagName('v-grid-header-col');
          [].slice.call(dragHandles).forEach(function (itemEl) {
            itemEl.classList.add("vGrid-vGridDragHandle");
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

          this.rootEl = this.vGrid.vGridGenerator.headerScrollElement;
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
          var children = this.vGrid.vGridGenerator.headerScrollElement.children;

          var x;

          x = this.vGrid.vGridConfig.colConfig[oldIndex];
          this.vGrid.vGridConfig.colConfig.splice(oldIndex, 1);
          this.vGrid.vGridConfig.colConfig.splice(newIndex, 0, x);

          var that = this;
          this.vGrid.vGridGenerator.rowTemplate = null;

          var dragHandles = this.vGrid.vGridGenerator.gridElement.getElementsByTagName('v-grid-header-col');
          [].slice.call(dragHandles).forEach(function (itemEl, index) {
            itemEl.setAttribute("column-no", index);

            itemEl.au["v-grid-header-col"].viewModel.columnNo = index + "";
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

      _export('VGridSortable', VGridSortable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OytCQVNhLGE7QUFXWCwrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFMbkIsS0FLbUIsR0FMWCxJQUtXO0FBQUEsZUFKbkIsT0FJbUIsR0FKVCxLQUlTO0FBQUEsZUFIbkIsUUFHbUIsR0FIUixLQUdROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2dDQUdELGMsNkJBQWlCO0FBQUE7O0FBRWYsY0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsV0FBMUIsQ0FBc0Msb0JBQXRDLENBQTJELG1CQUEzRCxDQUFsQjtBQUNBLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsdUJBQXJCO0FBQ0EsbUJBQU8sWUFBUCxHQUFzQixZQUFNO0FBQzFCLG9CQUFLLE9BQUwsR0FBZSxJQUFmOztBQUVBLG9CQUFLLFlBQUwsQ0FBa0IsSUFBbEI7QUFDRCxhQUpEO0FBS0EsbUJBQU8sWUFBUCxHQUFzQixZQUFNO0FBQzFCLG9CQUFLLE9BQUwsR0FBZSxLQUFmOztBQUVBLG9CQUFLLFlBQUwsQ0FBa0IsS0FBbEI7QUFDRCxhQUpEO0FBTUQsV0FiRDtBQWNELFM7O2dDQUdELEksaUJBQUssTSxFQUFRLFEsRUFBVSxPLEVBQVMsUSxFQUFVLE8sRUFBUztBQUVqRCxlQUFLLGNBQUw7O0FBR0EsZUFBSyxNQUFMLEdBQWMsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixtQkFBeEM7QUFHQSxlQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBMUMsRUFBdUUsS0FBdkU7QUFFRCxTOztnQ0FFRCxPLHNCQUFVO0FBQ1IsZUFB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b0JBQUksT0FBSyxRQUFMLEtBQWtCLE9BQUssUUFBM0IsRUFBcUM7QUFDbkMseUJBQUssV0FBTCxDQUFpQixTQUFTLE9BQUssUUFBZCxDQUFqQixFQUEwQyxTQUFTLE9BQUssUUFBZCxDQUExQztBQUNBLHlCQUFLLFFBQUwsR0FBZ0IsT0FBSyxRQUFMLEdBQWdCLENBQWhDO0FBQ0Q7QUFDRjtBQUNELHFCQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0QsYUEvQlksRUErQlYsR0EvQlUsQ0FBYjtBQWdDRDtBQUdGLFM7O2dDQUlELFMsc0JBQVUsRyxFQUFLOztBQUViLGNBQUksY0FBSjs7QUFFQSxlQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLE9BQTdCO0FBQ0EsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsV0FBaEMsRUFBNkMsS0FBSyxVQUFsRCxFQUE4RCxLQUE5RDtBQUNBLGVBQUssTUFBTCxDQUFZLG1CQUFaLENBQWdDLFNBQWhDLEVBQTJDLEtBQUssU0FBaEQsRUFBMkQsS0FBM0Q7O0FBRUEsY0FBSSxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxNQUFMLENBQVksV0FBaEMsRUFBNkM7QUFDM0MsaUJBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLLFFBQUw7QUFDRDtBQUNGLFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXNvcnRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
