/* */ 
define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridSortable = exports.VGridSortable = function () {
    function VGridSortable(rootEl, onUpdate, onStart, onCancel) {
      _classCallCheck(this, VGridSortable);

      this.internalTimeout;
      this.dragEl;
      this.nextEl;
      this.oldIndex;
      this.newIndex;
      this.rootEl = rootEl;
      this.onUpdate = onUpdate;
      this.onStart = onStart;
      this.onCancel = onCancel;

      this.setDraggable(true);

      this.rootEl.addEventListener('dragstart', this.onDragStart.bind(this), false);
    }

    VGridSortable.prototype.setDraggable = function setDraggable(newStatus) {

      [].slice.call(this.rootEl.children).forEach(function (itemEl) {
        itemEl.draggable = newStatus;
      });
    };

    VGridSortable.prototype.onDragStart = function onDragStart(evt) {

      this.dragEl = evt.target;
      this.oldIndex = evt.target.getAttribute("column-no");
      this.onStart();
      this.nextEl = this.dragEl.nextSibling;

      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('Text', this.dragEl.textContent);

      this.rootEl.addEventListener('dragover', this.onDragOver.bind(this), false);
      this.rootEl.addEventListener('dragend', this.onDragEnd.bind(this), false);

      setTimeout(function () {
        this.dragEl.classList.add('ghost');
      }.bind(this), 0);
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
  }();
});