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

          var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.getElementsByTagName('v-grid-header-col');
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

          var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.getElementsByTagName('v-grid-header-col');
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
//# sourceMappingURL=data:application/json;base64,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QUssUUFBTCxHQUFnQixPQUFPLFlBQVAsQ0FBb0IsV0FBcEIsQ0FBaEI7QUFDQSxvQkFBSSxPQUFPLE9BQU8scUJBQVAsRUFBWDtBQUNBLG9CQUFJLFFBQVEsS0FBSyxLQUFMLEdBQWEsS0FBSyxJQUE5QjtBQUNBLG9CQUFJLFNBQVMsS0FBSyxNQUFMLEdBQWMsS0FBSyxHQUFoQztBQUNBLG9CQUFJLFNBQVUsT0FBTyxXQUFQLEdBQXFCLE9BQUssTUFBTCxDQUFZLFdBQS9DO0FBQ0Esb0JBQUksU0FBVSxPQUFPLFlBQVAsR0FBc0IsT0FBSyxNQUFMLENBQVksWUFBaEQ7QUFDQSxvQkFBSSxVQUFXLENBQUMsSUFBSSxPQUFKLEdBQWMsS0FBSyxJQUFwQixJQUE0QixLQUE3QixHQUFzQyxHQUFwRDtBQUNBLHVCQUFLLFdBQUwsR0FBbUIsT0FBTyxrQkFBMUI7QUFDQSxvQkFBSSxRQUFTLE9BQUssV0FBTCxLQUFxQixPQUFLLE1BQTNCLElBQXNDLENBQUMsTUFBdkMsSUFBaUQsV0FBVyxNQUF4RTtBQUNBLHVCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLE9BQUssTUFBOUIsRUFBc0MsUUFBUSxPQUFPLFdBQWYsR0FBNkIsTUFBbkU7QUFDQSxvQkFBSSxPQUFLLFFBQUwsS0FBa0IsT0FBSyxRQUEzQixFQUFxQztBQUVuQyx5QkFBSyxXQUFMLENBQWlCLFNBQVMsT0FBSyxRQUFkLENBQWpCLEVBQTBDLFNBQVMsT0FBSyxRQUFkLENBQTFDO0FBQ0EseUJBQUssUUFBTCxHQUFnQixPQUFLLFFBQUwsR0FBZ0IsQ0FBaEM7QUFDRDtBQUNGO0FBQ0QscUJBQUssS0FBTCxHQUFhLElBQWI7QUFDRCxhQWhDWSxFQWdDVixHQWhDVSxDQUFiO0FBaUNEO0FBR0YsUzs7Z0NBSUQsUyxzQkFBVSxHLEVBQUs7O0FBRWIsY0FBSSxjQUFKOztBQUVBLGVBQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsT0FBN0I7QUFDQSxlQUFLLE1BQUwsQ0FBWSxtQkFBWixDQUFnQyxXQUFoQyxFQUE2QyxLQUFLLFVBQWxELEVBQThELEtBQTlEO0FBQ0EsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsU0FBaEMsRUFBMkMsS0FBSyxTQUFoRCxFQUEyRCxLQUEzRDs7QUFFQSxjQUFJLEtBQUssTUFBTCxLQUFnQixLQUFLLE1BQUwsQ0FBWSxXQUFoQyxFQUE2QztBQUMzQyxpQkFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUssUUFBTDtBQUNEO0FBQ0YsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc29ydGFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
