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

          this.vGrid = vGrid;
          this.canMove = false;
          this.sortable = false;
          this.timer = 0;
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

        VGridSortable.prototype.onUpdate = function onUpdate(oldIndex, newIndex) {
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

          this.vGrid.vGridGenerator.rebuildColumns();
          this.sortable = false;
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
          this.vGrid.vGridGenerator.rebuildColumnsAlt();
        };

        VGridSortable.prototype.setDraggable = function setDraggable(newStatus) {

          [].slice.call(this.rootEl.children).forEach(function (itemEl) {
            itemEl.draggable = newStatus;
          });
        };

        VGridSortable.prototype.onDragStart = function onDragStart(evt) {

          this.dragEl = evt.target;
          this.oldIndex = evt.target.getAttribute("column-no");
          this.oldIndexTemp = this.oldIndex * 1;

          if (this.isDragHandle()) {
            this.onStart();
            this.nextEl = this.dragEl.nextSibling;

            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('Text', this.dragEl.textContent);

            this.rootEl.addEventListener('dragover', this.onDragOver.bind(this), false);
            this.rootEl.addEventListener('dragend', this.onDragEnd.bind(this), false);
            var x = this.dragEl;
            setTimeout(function () {
              x.classList.add('ghost');
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
          var _this2 = this;

          if (!this.timer) {
            this.timer = setTimeout(function () {
              if (evt.preventDefault !== void 0) {
                evt.preventDefault();
                evt.stopPropagation();
              }
              evt.dataTransfer.dropEffect = 'move';

              var target = evt.target.offsetParent;
              try {
                var targetNode = target.nodeName === 'DIV' || target.nodeName === 'V-GRID-CELL-HEADER';
              } catch (e) {}

              if (target && target !== _this2.dragEl && targetNode && target.getAttribute("draggable") === "true") {
                _this2.newIndex = target.getAttribute("column-no");
                var rect = target.getBoundingClientRect();
                var width = rect.right - rect.left;
                var height = rect.bottom - rect.top;
                var isWide = target.offsetWidth > _this2.dragEl.offsetWidth;
                var isLong = target.offsetHeight > _this2.dragEl.offsetHeight;
                var halfway = (evt.clientX - rect.left) / width > 0.5;
                var nextSibling = target.nextElementSibling;
                var after = nextSibling !== _this2.dragEl && !isLong || halfway && isLong;
                _this2.rootEl.insertBefore(_this2.dragEl, after ? target.nextSibling : target);
                if (_this2.oldIndexTemp !== _this2.newIndex) {
                  _this2.onUpdateAlt(parseInt(_this2.oldIndexTemp), parseInt(_this2.newIndex));
                  _this2.oldIndexTemp = _this2.newIndex * 1;
                }
              }
              _this2.timer = null;
            }, 150);
          }
        };

        VGridSortable.prototype.onDragEnd = function onDragEnd(evt) {

          evt.preventDefault();

          this.dragEl.classList.remove('ghost');
          this.rootEl.removeEventListener('dragover)', this.onDragOver, false);
          this.rootEl.removeEventListener('dragend', this.onDragEnd, false);

          if (this.nextEl !== this.dragEl.nextSibling) {
            this.onUpdate(parseInt(this.oldIndex), parseInt(this.newIndex));
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
//# sourceMappingURL=data:application/json;base64,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QU8scUJBQVAsRUFBUCxDQUY2RjtBQUdqRyxvQkFBSSxRQUFRLEtBQUssS0FBTCxHQUFhLEtBQUssSUFBTCxDQUh3RTtBQUlqRyxvQkFBSSxTQUFTLEtBQUssTUFBTCxHQUFjLEtBQUssR0FBTCxDQUpzRTtBQUtqRyxvQkFBSSxTQUFVLE9BQU8sV0FBUCxHQUFxQixPQUFLLE1BQUwsQ0FBWSxXQUFaLENBTDhEO0FBTWpHLG9CQUFJLFNBQVUsT0FBTyxZQUFQLEdBQXNCLE9BQUssTUFBTCxDQUFZLFlBQVosQ0FONkQ7QUFPakcsb0JBQUksVUFBVSxDQUFFLElBQUksT0FBSixHQUFjLEtBQUssSUFBTCxDQUFmLEdBQTRCLEtBQTVCLEdBQXFDLEdBQXRDLENBUG1GO0FBUWpHLG9CQUFJLGNBQWMsT0FBTyxrQkFBUCxDQVIrRTtBQVNqRyxvQkFBSSxRQUFRLFdBQUMsS0FBZ0IsT0FBSyxNQUFMLElBQWdCLENBQUMsTUFBRCxJQUFXLFdBQVcsTUFBWCxDQVR5QztBQVVqRyx1QkFBSyxNQUFMLENBQVksWUFBWixDQUF5QixPQUFLLE1BQUwsRUFBYSxRQUFRLE9BQU8sV0FBUCxHQUFxQixNQUE3QixDQUF0QyxDQVZpRztBQVdqRyxvQkFBSSxPQUFLLFlBQUwsS0FBc0IsT0FBSyxRQUFMLEVBQWU7QUFDdkMseUJBQUssV0FBTCxDQUFpQixTQUFTLE9BQUssWUFBTCxDQUExQixFQUE4QyxTQUFTLE9BQUssUUFBTCxDQUF2RCxFQUR1QztBQUV2Qyx5QkFBSyxZQUFMLEdBQW9CLE9BQUssUUFBTCxHQUFnQixDQUFoQixDQUZtQjtpQkFBekM7ZUFYRjtBQWlCQSxxQkFBSyxLQUFMLEdBQWEsSUFBYixDQTlCMkI7YUFBTCxFQStCckIsR0EvQlUsQ0FBYixDQURlO1dBQWpCOzs7QUFuTVMsZ0NBMk9YLCtCQUFVLEtBQUs7O0FBRWIsY0FBSSxjQUFKLEdBRmE7O0FBSWIsZUFBSyxNQUFMLENBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixPQUE3QixFQUphO0FBS2IsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsV0FBaEMsRUFBNkMsS0FBSyxVQUFMLEVBQWlCLEtBQTlELEVBTGE7QUFNYixlQUFLLE1BQUwsQ0FBWSxtQkFBWixDQUFnQyxTQUFoQyxFQUEyQyxLQUFLLFNBQUwsRUFBZ0IsS0FBM0QsRUFOYTs7QUFRYixjQUFJLEtBQUssTUFBTCxLQUFnQixLQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCO0FBQzNDLGlCQUFLLFFBQUwsQ0FBYyxTQUFTLEtBQUssUUFBTCxDQUF2QixFQUF1QyxTQUFTLEtBQUssUUFBTCxDQUFoRCxFQUQyQztXQUE3QyxNQUVPO0FBQ0wsaUJBQUssUUFBTCxHQURLO1dBRlA7OztlQW5QUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc29ydGFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
