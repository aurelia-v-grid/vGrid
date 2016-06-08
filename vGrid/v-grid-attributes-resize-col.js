/*****************************************************************************************************************
 *    Adds resizing to the columns
 *    can not be used with row repeat yet
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customAttribute('v-resize-col')
@inject(Element, VGrid)
export class vGridAttributesResizeCol {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.vGridConfig = this.vGrid.vGridConfig;
    this.vGridGenerator = this.vGrid.vGridGenerator;
    this.element = element;
    this.resizable = false;
    this.screenX;
    this.index;
    this.originalWidth;

  }



  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }


  attached() {

    let mainCol = this.element;
    while(mainCol.nodeName !== 'V-GRID-HEADER-COL'){
      mainCol = mainCol.offsetParent;
    }

    this.mainCol = mainCol;

    var resizeHandle = document.createElement("DIV");
    resizeHandle.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);

    resizeHandle.onmousedown = (e) => {
      this.onmousedown(e)
    };

    this.mainCol.appendChild(resizeHandle)

}

/**************************************************
 *  when mouse button is let go
 **************************************************/
onmouseup() {

  //set state
  this.resizable = true;

  //remove events
  this.vGridGenerator.headerElement.onmouseleave = "";
  this.vGridGenerator.headerElement.onmousemove = "";
  this.vGridGenerator.headerElement.onmouseup = "";

  //update this column width
  this.vGridConfig.colConfig[this.index].width = parseInt(this.mainCol.style.width);

  //reset template and fill data
  this.vGridGenerator.rowTemplate = null;
  this.vGridGenerator.correctRowAndScrollbodyWidth();
  this.vGridGenerator.recreateRowViewSlots();
  this.vGridGenerator.updateGridScrollbars();
  this.vGridGenerator.rebindAllRowSlots(true);

}


/**************************************************
 *  when mouse moving mouse
 **************************************************/
onmousemove(e) {

  //get when user let go of mouse button
  this.vGridGenerator.headerElement.onmouseup = () => {
    this.onmouseup();
  };

  //if mouse leaves header we want to stop, else it just gets buggy
  this.vGridGenerator.headerElement.onmouseleave = (e) => {
    this.vGridGenerator.headerElement.onmouseup(e);
  };

  //update
  if (this.resizable) {
    this.updateHeader(e);
  } else {
    this.vGridGenerator.correctHeaderAndScrollbodyWidth();
  }
}


/**************************************************
 *  updates the actual header/row column width
 **************************************************/
updateHeader(e) {

  //updates
  var newWidth = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";
  if(parseInt(newWidth) > 15){
  this.vGridConfig.colConfig[this.index].width = parseInt(newWidth);
  this.mainCol.style.width = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";
  this.mainCol.style.width = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";

    //if resize also row attribute is set to true, then we also need to update them
    if (this.vGridConfig.attResizableHeadersAndRows) {
      var columnsToFix = this.vGridGenerator.contentElement.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + this.index);

      for (var col = 0; col < columnsToFix.length; col++) {
        columnsToFix[col].style.width = newWidth
      }

      this.vGridGenerator.correctRowAndScrollbodyWidth();
      this.vGridGenerator.updateGridScrollbars();

    }
  }

}


/**************************************************
 *  when mouse down, resizing starts
 **************************************************/
onmousedown(e) {
  //set state
   this.resizable = true;

  //get som vars
  this.screenX = e.screenX;
  this.originalWidth = this.mainCol.style.width;
  this.index = this.mainCol.getAttribute("column-no");
  this.started = false;

  //add mouse move event
  this.vGridGenerator.headerElement.onmousemove = (e) => {
    this.started = true;
    this.onmousemove(e);
  };
  //incase they just release right away
  this.vGridGenerator.headerElement.onmouseup = (e) => {
    if(!this.started) {
      this.vGridGenerator.headerElement.onmousemove ="";
    }
  };

}



}
