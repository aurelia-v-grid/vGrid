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

            var rect = this.dragEl.getBoundingClientRect();
            this.offsetHandleX = evt.clientX - rect.left;

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
                var targetNode = target.nodeName === 'V-GRID-HEADER-COL';
              } catch (e) {
                var targetNode = null;
              }

              if (target && target !== _this3.dragEl && targetNode) {

                _this3.newIndex = target.getAttribute("column-no");

                var rect = target.getBoundingClientRect();
                var width = rect.right - rect.left;
                var height = rect.bottom - rect.top;

                var isWide = target.offsetWidth > _this3.dragEl.offsetWidth;
                var isLong = target.offsetHeight > _this3.dragEl.offsetHeight;
                var halfway = (evt.clientX - rect.left) / width > 0.5;

                _this3.nextSibling = target.nextElementSibling;
                var after = _this3.nextSibling !== _this3.dragEl && !isLong || halfway && isLong;

                if (after) {
                  if (_this3.nextSibling && isWide) {
                    var halfway = evt.clientX - _this3.offsetHandleX + _this3.dragEl.offsetWidth / 2 > rect.right - _this3.dragEl.offsetWidth / 2;
                  } else {
                      halfway = true;
                    }
                }

                if (_this3.oldIndex !== _this3.newIndex && halfway) {
                  _this3.rootEl.insertBefore(_this3.dragEl, after ? target.nextSibling : target);
                  setTimeout(function () {
                    _this3.onUpdateAlt(parseInt(_this3.oldIndex), parseInt(_this3.newIndex));
                    _this3.oldIndex = _this3.newIndex * 1;
                  }, 1);
                }
              }
              _this3.timer = null;
            }, 30);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OytCQVNhLGE7QUFXWCwrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFMbkIsS0FLbUIsR0FMWCxJQUtXO0FBQUEsZUFKbkIsT0FJbUIsR0FKVCxLQUlTO0FBQUEsZUFIbkIsUUFHbUIsR0FIUixLQUdROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2dDQUdELGMsNkJBQWlCO0FBQUE7O0FBRWYsY0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsV0FBMUIsQ0FBc0Msb0JBQXRDLENBQTJELG1CQUEzRCxDQUFsQjtBQUNBLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFZO0FBQzdDLG1CQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsdUJBQXJCO0FBQ0EsbUJBQU8sWUFBUCxHQUFzQixZQUFNO0FBQzFCLG9CQUFLLE9BQUwsR0FBZSxJQUFmOztBQUVBLG9CQUFLLFlBQUwsQ0FBa0IsSUFBbEI7QUFDRCxhQUpEO0FBS0EsbUJBQU8sWUFBUCxHQUFzQixZQUFNO0FBQzFCLG9CQUFLLE9BQUwsR0FBZSxLQUFmOztBQUVBLG9CQUFLLFlBQUwsQ0FBa0IsS0FBbEI7QUFDRCxhQUpEO0FBTUQsV0FiRDtBQWNELFM7O2dDQUdELEksaUJBQUssTSxFQUFRLFEsRUFBVSxPLEVBQVMsUSxFQUFVLE8sRUFBUztBQUVqRCxlQUFLLGNBQUw7O0FBR0EsZUFBSyxNQUFMLEdBQWMsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixtQkFBeEM7QUFHQSxlQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBMUMsRUFBdUUsS0FBdkU7QUFFRCxTOztnQ0FFRCxPLHNCQUFVO0FBQ1IsZUFB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
