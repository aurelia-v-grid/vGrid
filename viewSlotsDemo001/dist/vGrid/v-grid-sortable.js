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
//# sourceMappingURL=data:application/json;base64,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QUF0QyxDQVZpRztBQVdqRyxvQkFBSSxPQUFLLFFBQUwsS0FBa0IsT0FBSyxRQUFMLEVBQWU7QUFFbkMseUJBQUssV0FBTCxDQUFpQixTQUFTLE9BQUssUUFBTCxDQUExQixFQUEwQyxTQUFTLE9BQUssUUFBTCxDQUFuRCxFQUZtQztBQUduQyx5QkFBSyxRQUFMLEdBQWdCLE9BQUssUUFBTCxHQUFnQixDQUFoQixDQUhtQjtpQkFBckM7ZUFYRjtBQWlCQSxxQkFBSyxLQUFMLEdBQWEsSUFBYixDQS9CMkI7YUFBTCxFQWdDckIsR0FoQ1UsQ0FBYixDQURlO1dBQWpCOzs7QUE5S1MsZ0NBdU5YLCtCQUFVLEtBQUs7O0FBRWIsY0FBSSxjQUFKLEdBRmE7O0FBSWIsZUFBSyxNQUFMLENBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixPQUE3QixFQUphO0FBS2IsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsV0FBaEMsRUFBNkMsS0FBSyxVQUFMLEVBQWlCLEtBQTlELEVBTGE7QUFNYixlQUFLLE1BQUwsQ0FBWSxtQkFBWixDQUFnQyxTQUFoQyxFQUEyQyxLQUFLLFNBQUwsRUFBZ0IsS0FBM0QsRUFOYTs7QUFRYixjQUFJLEtBQUssTUFBTCxLQUFnQixLQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCO0FBQzNDLGlCQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FEMkM7V0FBN0MsTUFFTztBQUNMLGlCQUFLLFFBQUwsR0FESztXQUZQOzs7ZUEvTlMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXNvcnRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
