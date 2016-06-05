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
          this.drophelper = [];
        }

        VGridSortable.prototype.setDragHandles = function setDragHandles() {
          var _this = this;

          var dragHandles = this.vGrid.vGridGenerator.gridElement.getElementsByClassName('vGrid-vGridDragHandle');
          [].slice.call(dragHandles).forEach(function (itemEl, index) {

            var mainCol = itemEl;
            while (mainCol.nodeName !== 'V-GRID-HEADER-COL') {
              mainCol = mainCol.offsetParent;
            }

            var drophelper = document.createElement("v-grid-drop");
            drophelper.style.width = "30px";
            drophelper.style.bottom = 0;
            drophelper.style.top = 0;
            drophelper.style.left = "50%";
            drophelper.setAttribute("column-no", index);

            drophelper.style["z-index"] = "-100";
            drophelper.style.position = "absolute";
            mainCol.appendChild(drophelper);
            _this.drophelper.push(drophelper);

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
          console.log(evt);
          this.oldIndex = evt.target.getAttribute("column-no");

          this.drophelper.forEach(function (item) {
            item.style["z-index"] = "100";
          });

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
                var targetNode = evt.target.nodeName === 'V-GRID-DROP';
              } catch (e) {}

              if (target && target !== _this3.dragEl && targetNode) {
                _this3.newIndex = target.getAttribute("column-no");

                var rect = target.getBoundingClientRect();
                var width = rect.right - rect.left;
                var height = rect.bottom - rect.top;

                var isLong = target.offsetHeight > _this3.dragEl.offsetHeight;
                var halfway = (evt.clientX - rect.left) / width > 0.5;

                _this3.nextSibling = target.nextElementSibling;
                var after = _this3.nextSibling !== _this3.dragEl && !isLong || halfway && isLong;

                if (_this3.oldIndex !== _this3.newIndex) {
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
          this.drophelper.forEach(function (item) {
            item.style["z-index"] = "-100";
          });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OytCQVNhLGE7QUFZWCwrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFObkIsS0FNbUIsR0FOWCxJQU1XO0FBQUEsZUFMbkIsT0FLbUIsR0FMVCxLQUtTO0FBQUEsZUFKbkIsUUFJbUIsR0FKUixLQUlROztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0Q7O2dDQUdELGMsNkJBQWlCO0FBQUE7O0FBRWYsY0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsV0FBMUIsQ0FBc0Msc0JBQXRDLENBQTZELHVCQUE3RCxDQUFsQjtBQUNBLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLE9BQTNCLENBQW1DLFVBQUMsTUFBRCxFQUFTLEtBQVQsRUFBbUI7O0FBRXBELGdCQUFJLFVBQVUsTUFBZDtBQUNBLG1CQUFNLFFBQVEsUUFBUixLQUFxQixtQkFBM0IsRUFBK0M7QUFDN0Msd0JBQVUsUUFBUSxZQUFsQjtBQUNEOztBQUdELGdCQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQWpCO0FBQ0EsdUJBQVcsS0FBWCxDQUFpQixLQUFqQixHQUF5QixNQUF6QjtBQUNBLHVCQUFXLEtBQVgsQ0FBaUIsTUFBakIsR0FBMkIsQ0FBM0I7QUFDQSx1QkFBVyxLQUFYLENBQWlCLEdBQWpCLEdBQXVCLENBQXZCO0FBQ0EsdUJBQVcsS0FBWCxDQUFpQixJQUFqQixHQUF3QixLQUF4QjtBQUNBLHVCQUFXLFlBQVgsQ0FBd0IsV0FBeEIsRUFBcUMsS0FBckM7O0FBRUEsdUJBQVcsS0FBWCxDQUFpQixTQUFqQixJQUE4QixNQUE5QjtBQUNBLHVCQUFXLEtBQVgsQ0FBaUIsUUFBakIsR0FBNEIsVUFBNUI7QUFDQSxvQkFBUSxXQUFSLENBQW9CLFVBQXBCO0FBQ0Esa0JB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LG9CQUFJLE9BQU8sT0FBTyxxQkFBUCxFQUFYO0FBQ0Esb0JBQUksUUFBUSxLQUFLLEtBQUwsR0FBYSxLQUFLLElBQTlCO0FBQ0Esb0JBQUksU0FBUyxLQUFLLE1BQUwsR0FBYyxLQUFLLEdBQWhDOztBQUVBLG9CQUFJLFNBQVUsT0FBTyxZQUFQLEdBQXNCLE9BQUssTUFBTCxDQUFZLFlBQWhEO0FBQ0Esb0JBQUksVUFBVyxDQUFDLElBQUksT0FBSixHQUFjLEtBQUssSUFBcEIsSUFBNEIsS0FBN0IsR0FBc0MsR0FBcEQ7O0FBRUEsdUJBQUssV0FBTCxHQUFtQixPQUFPLGtCQUExQjtBQUNBLG9CQUFJLFFBQVMsT0FBSyxXQUFMLEtBQXFCLE9BQUssTUFBM0IsSUFBc0MsQ0FBQyxNQUF2QyxJQUFpRCxXQUFXLE1BQXhFOztBQUdBLG9CQUFJLE9BQUssUUFBTCxLQUFrQixPQUFLLFFBQTNCLEVBQXFDO0FBQ25DLHlCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLE9BQUssTUFBOUIsRUFBc0MsUUFBUSxPQUFPLFdBQWYsR0FBNkIsTUFBbkU7QUFDQSw2QkFBVyxZQUFLO0FBQ2QsMkJBQUssV0FBTCxDQUFpQixTQUFTLE9BQUssUUFBZCxDQUFqQixFQUEwQyxTQUFTLE9BQUssUUFBZCxDQUExQztBQUNBLDJCQUFLLFFBQUwsR0FBZ0IsT0FBSyxRQUFMLEdBQWdCLENBQWhDO0FBQ0QsbUJBSEQsRUFHRyxDQUhIO0FBS0Q7QUFDRjtBQUNELHFCQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0QsYUF2Q1ksRUF1Q1YsRUF2Q1UsQ0FBYjtBQXdDRDtBQUdGLFM7O2dDQUlELFMsc0JBQVUsRyxFQUFLOztBQUViLGNBQUksY0FBSjtBQUNBLGVBQUssVUFBTCxDQUFnQixPQUFoQixDQUF3QixVQUFDLElBQUQsRUFBUTtBQUM5QixpQkFBSyxLQUFMLENBQVcsU0FBWCxJQUF3QixNQUF4QjtBQUNELFdBRkQ7QUFHQSxlQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLE9BQTdCO0FBQ0EsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsV0FBaEMsRUFBNkMsS0FBSyxVQUFsRCxFQUE4RCxLQUE5RDtBQUNBLGVBQUssTUFBTCxDQUFZLG1CQUFaLENBQWdDLFNBQWhDLEVBQTJDLEtBQUssU0FBaEQsRUFBMkQsS0FBM0Q7QUFDQSxjQUFJLEtBQUssTUFBTCxLQUFnQixLQUFLLE1BQUwsQ0FBWSxXQUFoQyxFQUE2QztBQUMzQyxpQkFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUssUUFBTDtBQUNEO0FBQ0YsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc29ydGFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
