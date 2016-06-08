/*****************************************************************************************************************
 *    Drag drop columns for the grid
 *    can not be used with row-repeat... yet
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customAttribute('v-drag-drop-col')
@inject(Element, VGrid)
export class vGridDragDropCol {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
    this.drophelper = [];
    this.dragEl;
    this.nextEl;
    this.oldIndex;
    this.newIndex;
    this.timer = null;
    this.canMove = false;
    this.sortable = false;
  }



  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }

  attached(){
    this.setDragHandles();

    //need to be better, will change when I rebuild header into custom element
    this.rootEl = this.vGrid.vGridGenerator.headerScrollElement; //this is BAD!

    //add eventlistnes for dragable
    this.mainCol.addEventListener('dragstart', this.onDragStart.bind(this), false);

    //event listner for when starting to drag
    this.vGrid.element.addEventListener("vGridDragStart",(x)=>{
      this.drophelper.style["z-index"] = "100";
    });

    //event listner when stopped dragging
    this.vGrid.element.addEventListener("vGridDragStop",(x)=>{
      this.drophelper.style["z-index"] = "-100";
    });



  }



  setDragHandles() {

      this.element.classList.add("vGrid-vGridDragHandle");
      let mainCol = this.element;
      while(mainCol.nodeName !== 'V-GRID-HEADER-COL'){
        mainCol = mainCol.offsetParent;
      }

      this.mainCol = mainCol;

      //simple drophelper
      var drophelper = document.createElement("v-grid-drop");
      drophelper.style.width = "30px";
      drophelper.style.bottom  = 0;
      drophelper.style.top = 0;
      drophelper.style.left = "50%";
      //drophelper.style["background-color"] = "blue"; enable to see them
      drophelper.style["z-index"] = "-100";
      drophelper.style.position = "absolute";
      mainCol.appendChild(drophelper);
      this.drophelper = drophelper;

      this.element.onmouseenter = () => {
        this.canMove = true;
        //add draggable to elements
        this.setDraggable(true);
      };
      this.element.onmouseleave = () => {
        this.canMove = false;
        //remove draggable to elements
        this.setDraggable(false);
      };


  }


  init(rootEl, onUpdate, onStart, onCancel, canMove) {
    //add drag/can move event to label
    this.setDragHandles();

    //need to be better, will change when I rebuild header into custom element
    this.rootEl = this.vGrid.vGridGenerator.headerScrollElement; //this is BAD!

    //add eventlistnes for dragable
    this.mainCol.addEventListener('dragstart', this.onDragStart.bind(this), false);

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
    var children = this.vGrid.vGridGenerator.headerScrollElement.children;

    var x;

    x = this.vGrid.vGridConfig.colConfig[oldIndex];
    this.vGrid.vGridConfig.colConfig.splice(oldIndex, 1);
    this.vGrid.vGridConfig.colConfig.splice(newIndex, 0, x);


    var that = this;
    this.vGrid.vGridGenerator.rowTemplate = null; //reset template and fill data

    var dragHandles = this.vGrid.vGridGenerator.gridElement.getElementsByTagName('v-grid-header-col');
    [].slice.call(dragHandles).forEach((itemEl, index) => {
      //todo,need to improve this part a lot, need to traverse until I get to V-GRID-ROW-COl
      itemEl.setAttribute("column-no", index);
    });
    this.vGrid.vGridGenerator.rebuildColumnsRows();


  }


  //sets the elements draggable attribute
  setDraggable(newStatus) {
      this.mainCol.draggable = newStatus;
  }


  //triggered on drag start
  onDragStart(evt) {
    this.dragEl = evt.target;

    //get column index
    this.oldIndex = evt.target.getAttribute("column-no");

    let event = new CustomEvent("vGridDragStart", {
      detail: "",
      bubbles: true
    });

    //dispatch event so all sortable column put the zindex up
    this.vGrid.element.dispatchEvent(event);


    if (this.isDragHandle()) {
      this.onStart();
      this.nextEl = this.dragEl.nextSibling;

      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('Text', '');

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

        var target = evt.target.offsetParent;
        try {
          var targetNode = evt.target.nodeName === 'V-GRID-DROP';
        } catch (e) {
        }

        if (target && target !== this.dragEl && targetNode) {

          //get out new index
          this.newIndex = target.getAttribute("column-no");

          //get the rect of what we are moving to
          var rect = target.getBoundingClientRect();
          var width = rect.right - rect.left;
          var height = rect.bottom - rect.top;

          var isLong = (target.offsetHeight > this.dragEl.offsetHeight);
          var halfway = ((evt.clientX - rect.left) / width) > 0.5;

          this.nextSibling = target.nextElementSibling;
          var after = (this.nextSibling !== this.dragEl) && !isLong || halfway && isLong;


          if (this.oldIndex !== this.newIndex) {
            this.rootEl.insertBefore(this.dragEl, after ? target.nextSibling : target);
            setTimeout(()=> {
              this.onUpdateAlt(parseInt(this.oldIndex), parseInt(this.newIndex));
              this.oldIndex = this.newIndex * 1
            }, 1);

          }
        }
        this.timer = null;
      }, 30)
    }


  }


  //on drag end
  onDragEnd(evt) {

    evt.preventDefault();
    //trigger
    let event = new CustomEvent("vGridDragStop", {
      detail: "",
      bubbles: true
    });
    this.vGrid.element.dispatchEvent(event);

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
