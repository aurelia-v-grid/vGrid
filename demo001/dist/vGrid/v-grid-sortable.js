System.register([], function (_export) {
  'use strict';

  var VGridSortable;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      VGridSortable = (function () {
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

        _createClass(VGridSortable, [{
          key: 'setDraggable',
          value: function setDraggable(newStatus) {

            [].slice.call(this.rootEl.children).forEach(function (itemEl) {
              itemEl.draggable = newStatus;
            });
          }
        }, {
          key: 'onDragStart',
          value: function onDragStart(evt) {

            this.dragEl = evt.target;
            this.oldIndex = evt.target.getAttribute("column-no");
            this.onStart();
            this.nextEl = this.dragEl.nextSibling;

            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('Text', this.dragEl.textContent);

            this.rootEl.addEventListener('dragover', this.onDragOver.bind(this), false);
            this.rootEl.addEventListener('dragend', this.onDragEnd.bind(this), false);

            setTimeout((function () {
              this.dragEl.classList.add('ghost');
            }).bind(this), 0);
          }
        }, {
          key: 'option',
          value: function option(type, disabled) {
            if (disabled) {
              this.setDraggable(false);
            } else {
              this.setDraggable(true);
            }
          }
        }, {
          key: 'onDragOver',
          value: function onDragOver(evt) {

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
          }
        }, {
          key: 'onDragEnd',
          value: function onDragEnd(evt) {

            evt.preventDefault();

            this.dragEl.classList.remove('ghost');
            this.rootEl.removeEventListener('dragover)', this.onDragOver, false);
            this.rootEl.removeEventListener('dragend', this.onDragEnd, false);

            if (this.nextEl !== this.dragEl.nextSibling) {
              this.onUpdate(parseInt(this.oldIndex), parseInt(this.newIndex));
            } else {
              this.onCancel();
            }
          }
        }]);

        return VGridSortable;
      })();

      _export('VGridSortable', VGridSortable);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zb3J0YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFRYSxhQUFhOzs7Ozs7Ozs7QUFBYixtQkFBYTtBQUdiLGlCQUhBLGFBQWEsQ0FHWixNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7Z0NBSHRDLGFBQWE7O0FBSXRCLGNBQUksQ0FBQyxlQUFlLENBQUM7QUFDckIsY0FBSSxDQUFDLE1BQU0sQ0FBQztBQUNaLGNBQUksQ0FBQyxNQUFNLENBQUM7QUFDWixjQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2QsY0FBSSxDQUFDLFFBQVEsQ0FBQztBQUNkLGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztBQUd6QixjQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUd4QixjQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUUvRTs7cUJBcEJVLGFBQWE7O2lCQTJCWixzQkFBQyxTQUFTLEVBQUU7O0FBRXRCLGNBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsTUFBTSxFQUFFO0FBQzVELG9CQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzthQUM5QixDQUFDLENBQUM7V0FFSjs7O2lCQU9VLHFCQUFDLEdBQUcsRUFBRTs7QUFFZixnQkFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3pCLGdCQUFJLENBQUMsUUFBUSxHQUFHLEdB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LENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7YUFDNUU7V0FDRjs7O2lCQU9RLG1CQUFDLEdBQUcsRUFBRTs7QUFFYixlQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRXJCLGdCQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEMsZ0JBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckUsZ0JBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRWxFLGdCQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDM0Msa0JBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDakUsTUFBSztBQUNKLGtCQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakI7V0FDRjs7O2VBdkhVLGFBQWEiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXNvcnRhYmxlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
