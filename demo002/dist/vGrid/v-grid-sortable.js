'use strict';

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
      _export('VGridSortable', VGridSortable = function () {
        function VGridSortable(rootEl, onUpdate, onStart, onCancel, canMove) {
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
          this.canMove = canMove;

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

          if (this.canMove()) {
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

      _export('VGridSortable', VGridSortable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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LGNBQUksU0FBUyxJQUFJLE1BQUosQ0FBVyxZQUFYLENBUkM7QUFTZCxjQUFJLFVBQVUsV0FBVyxLQUFLLE1BQUwsSUFBZSxPQUFPLFFBQVAsSUFBbUIsS0FBbkIsSUFBNEIsT0FBTyxZQUFQLENBQW9CLFdBQXBCLE1BQW1DLE1BQW5DLEVBQTJDO0FBQzdHLGlCQUFLLFFBQUwsR0FBZ0IsT0FBTyxZQUFQLENBQW9CLFdBQXBCLENBQWhCLENBRDZHO0FBRTdHLGdCQUFJLE9BQU8sT0FBTyxxQkFBUCxFQUFQLENBRnlHO0FBRzdHLGdCQUFJLFFBQVEsS0FBSyxLQUFMLEdBQWEsS0FBSyxJQUFMLENBSG9GO0FBSTdHLGdCQUFJLFNBQVMsS0FBSyxNQUFMLEdBQWMsS0FBSyxHQUFMLENBSmtGO0FBSzdHLGdCQUFJLFNBQVUsT0FBTyxXQUFQLEdBQXFCLEtBQUssTUFBTCxDQUFZLFdBQVosQ0FMMEU7QUFNN0csZ0JBQUksU0FBVSxPQUFPLFlBQVAsR0FBc0IsS0FBSyxNQUFMLENBQVksWUFBWixDQU55RTtBQU83RyxnQkFBSSxVQUFVLENBQUUsSUFBSSxPQUFKLEdBQWMsS0FBSyxJQUFMLENBQWYsR0FBNEIsS0FBNUIsR0FBcUMsR0FBdEMsQ0FQK0Y7QUFRN0csZ0JBQUksY0FBYyxPQUFPLGtCQUFQLENBUjJGO0FBUzdHLGdCQUFJLFFBQVEsV0FBQyxLQUFnQixLQUFLLE1BQUwsSUFBZ0IsQ0FBQyxNQUFELElBQVcsV0FBVyxNQUFYLENBVHFEO0FBVTdHLGlCQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLEtBQUssTUFBTCxFQUFhLFFBQVEsT0FBTyxXQUFQLEdBQXFCLE1BQTdCLENBQXRDLENBVjZHO1dBQS9HOzs7QUEzRlMsZ0NBOEdYLCtCQUFVLEtBQUs7O0FBRWIsY0FBSSxjQUFKLEdBRmE7O0FBSWIsZUFBSyxNQUFMLENBQVksU0FBWixDQUFzQixNQUF0QixDQUE2QixPQUE3QixFQUphO0FBS2IsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsV0FBaEMsRUFBNkMsS0FBSyxVQUFMLEVBQWlCLEtBQTlELEVBTGE7QUFNYixlQUFLLE1BQUwsQ0FBWSxtQkFBWixDQUFnQyxTQUFoQyxFQUEyQyxLQUFLLFNBQUwsRUFBZ0IsS0FBM0QsRUFOYTs7QUFRYixjQUFJLEtBQUssTUFBTCxLQUFnQixLQUFLLE1BQUwsQ0FBWSxXQUFaLEVBQXlCO0FBQzNDLGlCQUFLLFFBQUwsQ0FBYyxTQUFTLEtBQUssUUFBTCxDQUF2QixFQUF1QyxTQUFTLEtBQUssUUFBTCxDQUFoRCxFQUQyQztXQUE3QyxNQUVNO0FBQ0osaUJBQUssUUFBTCxHQURJO1dBRk47OztlQXRIUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtc29ydGFibGUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9