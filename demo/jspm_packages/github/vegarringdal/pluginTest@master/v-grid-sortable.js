/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridSortable = exports.VGridSortable = function () {
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

      x = this.vGrid.vGridConfig.colCustomArray[oldIndex];
      this.vGrid.vGridConfig.colCustomArray.splice(oldIndex, 1);
      this.vGrid.vGridConfig.colCustomArray.splice(newIndex, 0, x);

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
  }();
});