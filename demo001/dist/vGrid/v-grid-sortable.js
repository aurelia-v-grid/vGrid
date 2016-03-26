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
      }());

      _export('VGridSortable', VGridSortable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OzsrQkFRYTtBQUdYLGlCQUhXLGFBR1gsQ0FBWSxNQUFaLEVBQW9CLFFBQXBCLEVBQThCLE9BQTlCLEVBQXVDLFFBQXZDLEVBQWlEO2dDQUh0QyxlQUdzQzs7QUFDL0MsZUFBSyxlQUFMLENBRCtDO0FBRS9DLGVBQUssTUFBTCxDQUYrQztBQUcvQyxlQUFLLE1BQUwsQ0FIK0M7QUFJL0MsZUFBSyxRQUFMLENBSitDO0FBSy9DLGVBQUssUUFBTCxDQUwrQztBQU0vQyxlQUFLLE1BQUwsR0FBYyxNQUFkLENBTitDO0FBTy9DLGVBQUssUUFBTCxHQUFnQixRQUFoQixDQVArQztBQVEvQyxlQUFLLE9BQUwsR0FBZSxPQUFmLENBUitDO0FBUy9DLGVBQUssUUFBTCxHQUFnQixRQUFoQixDQVQrQzs7QUFZL0MsZUFBSyxZQUFMLENBQWtCLElBQWxCLEVBWitDOztBQWUvQyxlQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBMUMsRUFBdUUsS0FBdkUsRUFmK0M7U0FBakQ7O0FBSFcsZ0NBMkJYLHFDQUFhLFdBQVc7O0FBRXRCLGFBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQWQsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBVSxNQUFWLEVBQWtCO0FBQzVELG1CQUFPLFNBQVAsR0FBbUIsU0FBbkIsQ0FENEQ7V0FBbEIsQ0FBNUMsQ0FGc0I7OztBQTNCYixnQ0F3Q1gsbUNBQVksS0FBSzs7QUFFZixlQUFLLE1BQUwsR0FBYyxJQUFJLE1BQUosQ0FGQztBQUdmLGVBQUssUUFBTCxHQUFnQixJQUFJLE1BQUosQ0FBVyxZQUFYLENBQXdCLFdBQXhCLENBQWhCLENBSGU7QUFJZixlQUFLLE9BQUwsR0FKZTtBQUtmLGVBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLFdBQVosQ0FMQzs7QUFRZixjQUFJLFlBQUosQ0FBaUIsYUFBakIsR0FBaUMsTUFBakMsQ0FSZTtBQVNmLGNBQUksWUFBSixDQUFpQixPQUFqQixDQUF5QixNQUF6QixFQUFpQyxLQUFLLE1BQUwsQ0FBWSxXQUFaLENBQWpDLENBVGU7O0FBV2YsZUFBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsVUFBN0IsRUFBeUMsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQXpDLEVBQXFFLEtBQXJFLEVBWGU7QUFZZixlQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixTQUE3QixFQUF3QyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBQXhDLEVBQW1FLEtBQW5FLEVBWmU7O0FBY2YscUJBQVcsWUFBWTtBQUNyQixpQkFBSyxNQUFMLENBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixPQUExQixFQURxQjtXQUFaLENBRVQsSUFGUyxDQUVKLElBRkksQ0FBWCxFQUVjLENBRmQsRUFkZTs7O0FBeENOLGdDQWlFWCx5QkFBTyxNQUFNLFVBQVU7QUFDckIsY0FBSSxRQUFKLEVBQWM7QUFDWixpQkFBSyxZQUFMLENBQWtCLEtBQWxCLEVBRFk7V0FBZCxNQUVPO0FBQ0wsaUJBQUssWUFBTCxDQUFrQixJQUFsQixFQURLO1dBRlA7OztBQWxFUyxnQ0E2RVgsaUNBQVcsS0FBSzs7QUFFZCxjQUFJLElBQUksY0FBSixLQUF1QixLQUFLLENBQUwsRUFBUTtBQUNqQyxnQkFBSSxjQUFKLEdBRGlDO0FBRWpDLGdCQUFJLGVBQUosR0FGaUM7V0FBbkM7QUFJQSxjQUFJLFlBQUosQ0FBaUIsVUFBakIsR0FBOEIsTUFBOUIsQ0FOYzs7QUFRZCxjQUFJLFNBQVMsSUFBSSxNQUFKLENBQVcsWUFBWCxDQVJDO0FBU2QsY0FBSSxVQUFVLFdBQVcsS0FBSyxNQUFMLElBQWUsT0FBTyxRQUFQLElBQW1CLEtBQW5CLElBQTRCLE9BQU8sWUFBUCxDQUFvQixXQUFwQixNQUFtQyxNQUFuQyxFQUEyQztBQUM3RyxpQkFBSyxRQUFMLEdBQWdCLE9BQU8sWUFBUCxDQUFvQixXQUFwQixDQUFoQixDQUQ2RztBQUU3RyxnQkFBSSxPQUFPLE9BQU8scUJBQVAsRUFBUCxDQUZ5RztBQUc3RyxnQkFBSSxRQUFRLEtBQUssS0FBTCxHQUFhLEtBQUssSUFBTCxDQUhvRjtBQUk3RyxnQkFBSSxTQUFTLEtBQUssTUFBTCxHQUFjLEtBQUssR0FBTCxDQUprRjtBQUs3RyxnQkFBSSxTQUFVLE9BQU8sV0FBUCxHQUFxQixLQUFLLE1BQUwsQ0FBWSxXQUFaLENBTDBFO0FBTTdHLGdCQUFJLFNBQVUsT0FBTyxZQUFQLEdBQXNCLEtBQUssTUFBTCxDQUFZLFlBQVosQ0FOeUU7QUFPN0csZ0JBQUksVUFBVSxDQUFFLElBQUksT0FBSixHQUFjLEtBQUssSUFBTCxDQUFmLEdBQTRCLEtBQTVCLEdBQXFDLEdBQXRDLENBUCtGO0FBUTdHLGdCQUFJLGNBQWMsT0FBTyxrQkFBUCxDQVIyRjtBQVM3RyxnQkFBSSxRQUFRLFdBQUMsS0FBZ0IsS0FBSyxNQUFMLElBQWdCLENBQUMsTUFBRCxJQUFXLFdBQVcsTUFBWCxDQVRxRDtBQVU3RyxpQkFBSyxNQUFMLENBQVksWUFBWixDQUF5QixLQUFLLE1BQUwsRUFBYSxRQUFRLE9BQU8sV0FBUCxHQUFxQixNQUE3QixDQUF0QyxDQVY2RztXQUEvRzs7O0FBdEZTLGdDQXlHWCwrQkFBVSxLQUFLOztBQUViLGNBQUksY0FBSixHQUZhOztBQUliLGVBQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsT0FBN0IsRUFKYTtBQUtiLGVBQUssTUFBTCxDQUFZLG1CQUFaLENBQWdDLFdBQWhDLEVBQTZDLEtBQUssVUFBTCxFQUFpQixLQUE5RCxFQUxhO0FBTWIsZUFBSyxNQUFMLENBQVksbUJBQVosQ0FBZ0MsU0FBaEMsRUFBMkMsS0FBSyxTQUFMLEVBQWdCLEtBQTNELEVBTmE7O0FBUWIsY0FBSSxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxNQUFMLENBQVksV0FBWixFQUF5QjtBQUMzQyxpQkFBSyxRQUFMLENBQWMsU0FBUyxLQUFLLFFBQUwsQ0FBdkIsRUFBdUMsU0FBUyxLQUFLLFFBQUwsQ0FBaEQsRUFEMkM7V0FBN0MsTUFFTTtBQUNKLGlCQUFLLFFBQUwsR0FESTtXQUZOOzs7ZUFqSFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXNvcnRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
