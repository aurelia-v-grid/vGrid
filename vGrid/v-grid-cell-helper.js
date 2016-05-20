/*****************************************************************************************************************
 *    VGridCellHelper
 *    This just helper for (v-grid-row-col.js), tabbing/focus etc
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

export class VGridCellHelper {

  //vars;
  first = -1;
  last = -1;
  editMode = false;
  update = true;
  filter = false; //if filter run is might be same element, so wee need to run the before edit


  constructor(vGrid) {
    this.vGrid = vGrid;
    this.addGridKeyListner();
  }


  /***************************************************************************************
   * sets "the cells" from  to direction asked for, so tabbing jumps to next row
   ***************************************************************************************/
  setCellsFromElement(e, direction) {
    var thisTop;
    var element;
    var x = 10;
    var node = e;
    for (var i = 0; i < x; i++) {
      try {
        if (node.classList.contains(this.vGrid.vGridConfig.css.row)) {
          var row = parseInt(node.getAttribute("row"));
          for (var y = 0; y < this.vGrid.vGridGenerator.htmlCache.rowsArray.length; y++) {
            if (row === parseInt((this.vGrid.vGridGenerator.htmlCache.rowsArray[y].top / this.vGrid.vGridConfig.rowHeight))) {
              thisTop = this.vGrid.vGridGenerator.htmlCache.rowsArray[y + direction].top;
              element = this.vGrid.vGridGenerator.htmlCache.rowsArray[y + direction].div;
            }
          }
        }
        node = node.parentNode;
      } catch (x) {
      }
    }
    if (element) {
      this.cells = element.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);
    }
    return thisTop;
  };


  /***************************************************************************************
   * sets "the cells" from a top value, used for page up/down
   ***************************************************************************************/
  setCellsFromTopValue(top) {
    var element = 0;
    for (var i = 0; i < this.vGrid.vGridGenerator.htmlCache.rowsArray.length; i++) {
      if (this.vGrid.vGridGenerator.htmlCache.rowsArray[i].top === top) {
        element = this.vGrid.vGridGenerator.htmlCache.rowsArray[i].div;
      }
    }
    if (element) {
      this.cells = element.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);
    }

  }


  /***************************************************************************************
   * for setting next cell ny similating a mouse click, used for tabbing etc
   ***************************************************************************************/
  dispatchCellClick(index) {
    var e = document.createEvent('Event');
    e.initEvent("tabbing", true, true);

    if (this.cells[index]) {
      this.cells[index].dispatchEvent(e);
    }

  }


  /***************************************************************************************
   * simple delay for the keydown events, like tabbing etc, so I cantrol the speed of it
   ***************************************************************************************/
  keyDownDelay(callback) {
    if (!this.timer) {
      this.timer = setTimeout(()=> {
        this.timer = null;
        callback();
      }, 150)
    }
  }


  /***************************************************************************************
   * adds main keys, like arrow keys, tab, and page up/down
   ***************************************************************************************/
  addGridKeyListner() {


    this.vGrid.element.onmousedown = function (e) {
      if (this.curElement) {
        if (e.target !== this.curElement) {
          this.curElement.blur()
        }
      }
    }.bind(this);
    this.vGrid.element.onmousewheel = function (e) {
      if (this.curElement) {
        this.curElement.blur()
      }
    }.bind(this);


    this.vGrid.element.onkeydown = function (e) {

      var queryField = e.target.classList.contains(this.vGrid.vGridConfig.css.filterHandle);

      //if tabbing is not enabled we stop them all (might need to edit this later)
      if(!this.vGrid.vGridConfig.tabbingEnabled){
        e.preventDefault();
        return false;
      }

      //page up
      if (e.keyCode === 33) {
        e.preventDefault();
        this.blurBeforeNext();
        this.keyDownDelay(() => {
          if (this.curElement) {

            //get scrolltop
            var currentscrolltop = this.vGrid.vGridGenerator.getScrollTop();

            //get content height/rows
            var rowHeight = this.vGrid.vGridConfig.rowHeight;
            var containerHeight = this.vGrid.vGridGenerator.htmlCache.content.clientHeight;
            var containerRows = parseInt(containerHeight / rowHeight, 10);
            this.top = this.setCellsFromElement(this.curElement, 0);

            var newTop = this.top - (containerRows * rowHeight);
            if ((newTop / rowHeight) <= 0) {
              newTop = 0;
            }


            //if last scroll was up then we need to reverse the buffer
            if (this.vGrid.vGridGenerator.lastScrollType === "down") {
              this.vGrid.vGridGenerator.onNormalScrolling(false)
            }

            this.setCellsFromTopValue(newTop);
            this.dispatchCellClick(this.index);

            var setTop = newTop - parseInt((containerRows * rowHeight) / 2);
            this.vGrid.vGridGenerator.setScrollTop(setTop);

          }
        });
      }


      //page down
      if (e.keyCode === 34) {
        e.preventDefault();
        this.blurBeforeNext();
        this.keyDownDelay(() => {
          if (this.curElement) {

            //get scrolltop
            var currentscrolltop = this.vGrid.vGridGenerator.getScrollTop();

            //get content height/rows
            var rowHeight = this.vGrid.vGridConfig.rowHeight;
            var containerHeight = this.vGrid.vGridGenerator.htmlCache.content.clientHeight;
            var containerRows = parseInt(containerHeight / rowHeight, 10);
            this.top = this.setCellsFromElement(this.curElement, 0);

            var newTop = this.top + (containerRows * rowHeight);
            if ((newTop / rowHeight) >= this.vGrid.vGridConfig.getCollectionLength()) {
              newTop = this.vGrid.vGridConfig.getCollectionLength() * rowHeight;
              newTop = newTop - rowHeight
            }

            //if last scroll was up then we need to reverse the buffer
            if (this.vGrid.vGridGenerator.lastScrollType === "up") {
              this.vGrid.vGridGenerator.onNormalScrolling(true);
            }

            this.setCellsFromTopValue(newTop);
            this.dispatchCellClick(this.index);

            var setTop = newTop - parseInt((containerRows * rowHeight) / 2);
            this.vGrid.vGridGenerator.setScrollTop(setTop);

          }
        });
      }

      //arrow down
      if (e.keyCode === 40) {
        e.preventDefault();
        this.blurBeforeNext();
        this.keyDownDelay(() => {
          if (this.curElement) {
            //this.removeEditCssClasses(this.curElement);
            this.top = this.setCellsFromElement(this.curElement, +1);
            this.dispatchCellClick(this.index)
          }
        });
      }


      //arrow right
      if (e.keyCode === 39 && !this.editMode && !queryField) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.curElement) {
            if (!this.last) {
              //this.removeEditCssClasses(this.curElement);
              this.dispatchCellClick(this.index + 1)
            }
          }
        });
      }


      //arrow left
      if (e.keyCode === 37 && !this.editMode && !queryField) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.curElement) {
            if (!this.first) {
              // this.removeEditCssClasses(this.curElement);
              this.dispatchCellClick(this.index - 1)
            }
          }
        });
      }


      //arrow up
      if (e.keyCode === 38) {
        e.preventDefault();
        this.blurBeforeNext();
        this.keyDownDelay(() => {
          if (this.curElement) {
            //this.removeEditCssClasses(this.curElement);
            this.top = this.setCellsFromElement(this.curElement, -1);
            this.dispatchCellClick(this.index)
          }
        });
      }


      //tab and shift key for tabing in other direction
      if (e.keyCode === 9 && e.shiftKey === true) {
        e.preventDefault();
        this.blurBeforeNext();
        this.keyDownDelay(() => {
          if (this.curElement) {
            //this.removeEditCssClasses(this.curElement);
            this.index = this.index - 1;
            if (this.first) {
              this.index = this.cells.length - 1;
              this.top = this.setCellsFromElement(this.curElement, -1)
            }
            this.dispatchCellClick(this.index)
          }
        });
      }


      //normal tabbing
      if (e.keyCode === 9 && e.shiftKey === false) {
        e.preventDefault();
        this.blurBeforeNext();
        this.keyDownDelay(() => {
          if (this.curElement) {
            //this.removeEditCssClasses(this.curElement);
            this.index = this.index + 1;
            if (this.last) {
              this.index = 0;
              this.top = this.setCellsFromElement(this.curElement, 1)
            }
            this.dispatchCellClick(this.index)
          }
        });
      }
    }.bind(this)
  }


  blurBeforeNext() {
    if (this.curElement) {
      this.curElement.blur()
    }
  }


  /***************************************************************************************
   * cupdates current
   ***************************************************************************************/
  updateActual(obj) {

    if (obj.attribute && this.vGrid.vGridCurrentEntityRef) {
      //so we dont create loop
      this.vGrid.vGridSkipNextUpdateProperty.push(obj.attribute);

      //set current entity and and update row data
      this.vGrid.vGridCurrentEntityRef[obj.attribute] = obj.value;
      this.vGrid.vGridCurrentEntity[obj.attribute] = obj.value;
      var row = this.vGrid.vGridCurrentRow;
      setTimeout(()=> {
        this.vGrid.vGridGenerator.fillDataIntoRow(row);
      }, 150)
    }

  }


  /***************************************************************************************
   * main edit function,called from row clicks
   ***************************************************************************************/
  editCellhelper(row, e) {

    if (e.target.tagName === "V-GRID-ROW-COL" || e.target.tagName === "V-GRID-CHECKBOX" || e.target.tagName === "V-GRID-IMAGE" || e.target.tagName === "V-GRID-SELECTION") {
      //if this is clicked then its a image or something smaller then the cell, lets send it to the first child
      if (e.target.children) {
        this.editCellhelper(row, {
            target: e.target.children[0],
            type: e.type
          }
        );
      }

    } else {

      this.curElement = e.target;

      if (this.curElement.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {


        //set internal cells & index (used for tabbing)
        this.cells = this.curElement.parentNode.parentNode.parentNode.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);

        this.index = parseInt(this.curElement.columnNo);
        if (this.index === this.cells.length - 1) {
          this.last = true;
        } else {
          this.last = false;
        }

        if (this.index === 0) {
          this.first = true;
        } else {
          this.first = false;
        }


        //fix focus scroll
        if (this.curElement.parentNode.offsetLeft > this.vGrid.vGridGenerator.htmlCache.content.clientWidth) {
          this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.parentNode.offsetLeft;
        }
        if (this.vGrid.vGridGenerator.htmlCache.content.scrollLeft > 0 && this.vGrid.vGridGenerator.htmlCache.content.clientWidth > this.curElement.parentNode.offsetLeft) {
          this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.parentNode.offsetLeft;
        }
        setTimeout(()=> {
          this.vGrid.vGridGenerator.htmlCache.header.scrollLeft = this.vGrid.vGridGenerator.htmlCache.content.scrollLeft;
        }, 10);


        var newEvent = document.createEvent('Event');
        newEvent.initEvent("cellFocus", true, true);
        this.curElement.dispatchEvent(newEvent)


      }
    }
  };


  refocus() {
    var newEvent = document.createEvent('Event');
    newEvent.initEvent("cellFocus", true, true);
    this.curElement.dispatchEvent(newEvent)
  }

}
