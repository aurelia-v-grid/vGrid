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
  timer = null;
  canMove = false;
  sortable = false;


  constructor(vGrid) {
    this.vGrid = vGrid;
  }


  setDragHandles() {
    //we haveto control dragging only to headers with draghandle
    var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
    [].slice.call(dragHandles).forEach((itemEl) => {
      itemEl.onmouseenter = () => {
        this.canMove = true;
        //add draggable to elements
        this.setDraggable(true);
      };
      itemEl.onmouseleave = () => {
        this.canMove = false;
        //remove draggable to elements
        this.setDraggable(false);
      }

    });
  }


  init(rootEl, onUpdate, onStart, onCancel, canMove) {
    //add drag/can move event to label
    this.setDragHandles();

    //need to be better, will change when I rebuild header into custom element
    this.rootEl = this.vGrid.vGridGenerator.htmlCache.header.firstChild; //this is BAD!

    //add eventlistnes for dragable
    this.rootEl.addEventListener('dragstart', this.onDragStart.bind(this), false);

  }

  onStart() {
    this.sortable = true
  };

  onCancel() {
    this.sortable = false
  };

  isDragHandle() {
    return this.canMove
  };


  onUpdateAlt(oldIndex, newIndex) {
    var children = this.vGrid.vGridGenerator.htmlCache.header.firstChild.children;

    // var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
    // [].slice.call(dragHandles).forEach((itemEl, index) => {
    //   if (parseInt(itemEl.parentNode.getAttribute("column-no")) === oldIndex) {
    //    // newIndex = index;
    //    // console.log(index)
    //   }
    // });


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
    this.vGrid.vGridGenerator.htmlCache.rowTemplate = null; //reset template and fill data
    var dragHandles = this.vGrid.vGridGenerator.htmlCache.grid.querySelectorAll("." + this.vGrid.vGridConfig.css.dragHandle);
    [].slice.call(dragHandles).forEach((itemEl, index) => {
      itemEl.parentNode.parentNode.setAttribute("column-no", index);
      //update viewmodel, is needed since I dont redraw headers anymore
      itemEl.parentNode.parentNode.au["v-grid-header-col"].viewModel.columnNo = index + ""
    });
    this.vGrid.vGridGenerator.rebuildColumnsRows();


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
      evt.dataTransfer.setData('Text', this.vGrid.vGridConfig.attributeArray[this.oldIndex]);

      this.rootEl.addEventListener('dragover', this.onDragOver.bind(this), false);
      this.rootEl.addEventListener('dragend', this.onDragEnd.bind(this), false);

      setTimeout(()=> {
        this.dragEl.classList.add('ghost');
      }, 0);
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
    if (!this.timer) {
      this.timer = setTimeout(()=> {
        if (evt.preventDefault !== void 0) {
          evt.preventDefault();
          evt.stopPropagation();
        }
        //evt.dataTransfer.dropEffect = 'move'; //this faile in IE

        var target = evt.target.offsetParent;
        try {
          var targetNode = target.nodeName === 'DIV' || target.nodeName === 'V-GRID-HEADER-COL';
        } catch (e) {
        }


        if (target && target !== this.dragEl && targetNode && target.getAttribute("draggable") === "true") {
          this.newIndex = target.getAttribute("column-no");
          var rect = target.getBoundingClientRect();
          var width = rect.right - rect.left;
          var height = rect.bottom - rect.top;
          var isWide = (target.offsetWidth > this.dragEl.offsetWidth);
          var isLong = (target.offsetHeight > this.dragEl.offsetHeight);
          var halfway = ((evt.clientX - rect.left) / width) > 0.5;
          this.nextSibling = target.nextElementSibling;
          var after = (this.nextSibling !== this.dragEl) && !isLong || halfway && isLong;
          this.rootEl.insertBefore(this.dragEl, after ? target.nextSibling : target);
          if (this.oldIndex !== this.newIndex) {
            //console.log("move, old:"+this.oldIndex+"new"+this.newIndex)
            this.onUpdateAlt(parseInt(this.oldIndex), parseInt(this.newIndex));
            this.oldIndex = this.newIndex * 1
          }
        }
        this.timer = null;
      }, 150)
    }


  }


  //on drag end
  onDragEnd(evt) {

    evt.preventDefault();

    this.dragEl.classList.remove('ghost');
    this.rootEl.removeEventListener('dragover)', this.onDragOver, false);
    this.rootEl.removeEventListener('dragend', this.onDragEnd, false);

    if (this.nextEl !== this.dragEl.nextSibling) {
      this.nextSibling = null;
    } else {
      this.onCancel();
    }
  }


}


