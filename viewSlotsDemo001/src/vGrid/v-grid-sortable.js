/*****************************************************************************************************************
 *    vGridSortable
 *    replacement code for sortable.js just made for the headers, if you need sortable use sortable.js, see link below
 *    Created by vegar ringdal witt the help of sortablejs and https://github.com/RubaXa/Sortable/wiki/Sorting-with-the-help-of-HTML5-Drag'n'Drop-API
 *    Big thanks to Lebedev Konstantin RubaXa and his awsome sortable.js
 *    TODO clean up
 *
 ****************************************************************************************************************/

export class VGridSortable {

  dragEl;
  nextEl;
  oldIndex;
  newIndex;

  constructor(vGrid) {
    this.vGrid = vGrid;
    this.canMove = false;
    this.sortable = false;

  }

  setDragHandles() {
    //we haveto control dragging only to headers with draghandle
    var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
    [].slice.call(dragHandles).forEach((itemEl) => {
      itemEl.onmouseenter = () => {
        this.canMove = true
      };
      itemEl.onmouseleave = () => {
        this.canMove = false
      }

    });
  }


  init(rootEl, onUpdate, onStart, onCancel, canMove) {
    this.setDragHandles();

    //need to be better, will change when I rebuild header into custom element
    this.rootEl = this.vGrid.vGridGenerator.htmlCache.header.firstChild.firstChild; //this is BAD!

    //add draggable to elements
    this.setDraggable(true);

    //add eventlistnes for dragable
    this.rootEl.addEventListener('dragstart', this.onDragStart.bind(this), false);

  }

  onStart() {this.sortable = true};

  onCancel() {this.sortable = false};

  isDragHandle() {return this.canMove};


  onUpdate(oldIndex, newIndex) {
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


    this.vGrid.vGridGenerator.htmlCache.rowTemplate = null; //reset template and fill data

    this.vGrid.vGridGenerator.rebuildColumns();
    this.sortable = false;

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
      evt.preventDefault()
    }

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
    if (target && target !== this.dragEl && target.nodeName == 'DIV' && target.getAttribute("draggable") === "true") {
      this.newIndex = target.getAttribute("column-no");
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
      this.onUpdate(parseInt(this.oldIndex), parseInt(this.newIndex));
    } else {
      this.onCancel();
    }
  }


}


