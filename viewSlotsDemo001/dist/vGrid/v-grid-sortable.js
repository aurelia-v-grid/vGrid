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

          this.rootEl = this.vGrid.vGridGenerator.htmlCache.header.firstChild.firstChild;
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
          var children = this.vGrid.vGridGenerator.htmlCache.header.firstChild.firstChild.children;

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

        VGridSortable.prototype.setDraggable = function setDraggable(newStatus) {

          [].slice.call(this.rootEl.children).forEach(function (itemEl) {
            itemEl.draggable = newStatus;
          });
        };

        VGridSortable.prototype.onDragStart = function onDragStart(evt) {

          this.dragEl = evt.target;
          this.oldIndex = evt.target.getAttribute("column-no");

          if (this.isDragHandle()) {
            this.onStart();
            this.nextEl = this.dragEl.nextSibling;

            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('Text', this.dragEl.textContent);

            this.rootEl.addEventListener('dragover', this.onDragOver.bind(this), false);
            this.rootEl.addEventListener('dragend', this.onDragEnd.bind(this), false);

            setTimeout(function () {
              this.dragEl.classList.add('ghost');
            }.bind(this), 0);
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

          if (evt.preventDefault !== void 0) {
            evt.preventDefault();
            evt.stopPropagation();
          }
          evt.dataTransfer.dropEffect = 'move';

          var target = evt.target.offsetParent;
          if (target && target !== this.dragEl && target.nodeName == 'DIV' && target.getAttribute("draggable") === "true") {
            this.newIndex = target.getAttribute("column-no");
            var rect = target.getBoundingClientRect();
            var width = rect.right - rect.left;
            var height = rect.bottom - rect.top;
            var isWide = target.offsetWidth > this.dragEl.offsetWidth;
            var isLong = target.offsetHeight > this.dragEl.offsetHeight;
            var halfway = (evt.clientX - rect.left) / width > 0.5;
            var nextSibling = target.nextElementSibling;
            var after = nextSibling !== this.dragEl && !isLong || halfway && isLong;
            this.rootEl.insertBefore(this.dragEl, after ? target.nextSibling : target);
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
//# sourceMappingURL=data:application/json;base64,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
