/*****************************************************************************************************************
 *    vGridSortable
 *    replacement code for sortable.js just made for the headers, if you need sortable use sortable.js, see link below
 *    Created by vegar ringdal witt the help of sortablejs and https://github.com/RubaXa/Sortable/wiki/Sorting-with-the-help-of-HTML5-Drag'n'Drop-API
 *    Big thanks to Lebedev Konstantin RubaXa and his awsome sortable.js
 *
 ****************************************************************************************************************/

export class VGridSortable {


  constructor(rootEl, onUpdate, onStart, onCancel) {
    this.internalTimeout;
    this.dragEl;
    this.nextEl;
    this.rootEl = rootEl;
    this.onUpdate = onUpdate;
    this.onStart = onStart;
    this.onCancel = onCancel;

    //add draggable to elements
    this.setDraggable(true);

    //add eventlistnes for dragable
    this.rootEl.addEventListener('dragstart', this.onDragStart.bind(this), false);

  }





  //sets the elements draggable attribute
  setDraggable(newStatus) {

    [].slice.call(this.rootEl.children).forEach(function (itemEl) {
      itemEl.draggable = newStatus;
    });

  }





  //triggered on drag start
  onDragStart(evt) {

    this.dragEl = evt.target;
    this.onStart();
    this.nextEl = this.dragEl.nextSibling;


    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('Text', this.dragEl.textContent);

    this.rootEl.addEventListener('dragover', this.onDragOver.bind(this), false);
    this.rootEl.addEventListener('dragend', this.onDragEnd.bind(this), false);

    setTimeout(function () {
      this.dragEl.classList.add('ghost');
    }.bind(this), 0)

  }





  //sortable.js used this, so Ill just use it like this while I do testing
  option(type, disabled) {
    if (disabled) {
      this.setDraggable(false);
    } else {
      this.setDraggable(true);
    }
  }




  //on drag over event(moving)
  onDragOver(evt) {

    if (evt.preventDefault !== void 0) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    evt.dataTransfer.dropEffect = 'move';

    var target = evt.target.offsetParent;

    if (target && target !== this.dragEl && target.nodeName == 'DIV' && target.classList.contains("simpleGrid-row-cell-header")) {

      var rect = target.getBoundingClientRect();
      var width = rect.right - rect.left;
      var height = rect.bottom - rect.top;
      var isWide = (target.offsetWidth > this.dragEl.offsetWidth);
      var isLong = (target.offsetHeight > this.dragEl.offsetHeight);
      var halfway = ((evt.clientX - rect.left) / width) > 0.5;
      var nextSibling = target.nextElementSibling;
      var after = (nextSibling !== this.dragEl) && !isLong || halfway && isLong;
      this.rootEl.insertBefore(this.dragEl, after ? target.nextSibling : target);
    }
  }





  //on drag end
  onDragEnd(evt) {

    evt.preventDefault();

    this.dragEl.classList.remove('ghost');
    this.rootEl.removeEventListener('dragover)', this.onDragOver, false);
    this.rootEl.removeEventListener('dragend', this.onDragEnd, false);

    if (this.nextEl !== this.dragEl.nextSibling) {
      this.onUpdate(this.dragEl);
    } else{
      this.onCancel();
    }
  }


}


