/*****************************************************************************************************************
 *    VGridCellEdit
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

export class VGridCellEdit {

  //vars;
  first = -1;
  last = -1;
  editMode = false;
  update = true;

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
        node = node.offsetParent;
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
   * removed forcus classes, sets back readonly to input
   ***************************************************************************************/
  removeEditCssClasses(element) {
    element.setAttribute("readonly", "false");
    element.classList.remove(this.vGrid.vGridConfig.css.editCell);
    element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
    element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
  }




  /***************************************************************************************
   * for setting next cell ny similating a mouse click, used for tabbing etc
   ***************************************************************************************/
  dispatchCellClick(index) {
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    this.setAsSingleClick = true;
    if (this.cells[index]) {
      this.cells[index].dispatchEvent(event);
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

    this.vGrid.element.onkeydown = function (e) {


      //page up
      if (e.keyCode === 33) {
        e.preventDefault();
        this.updateBeforeNext(this.callbackObject());
        this.keyDownDelay(() => {
          if (this.curElement) {
            //get scrolltop
            var currentscrolltop = this.vGrid.vGridGenerator.getScrollTop();

            //get content height/rows
            var rowHeight = this.vGrid.vGridConfig.rowHeight;
            var containerHeight = this.vGrid.vGridGenerator.htmlCache.content.clientHeight;
            var containerRows = parseInt(containerHeight / rowHeight, 10);
            var buffer = parseInt(containerHeight / 2, 10);
            if (currentscrolltop !== (this.vGrid.vGridConfig.getCollectionLength() * rowHeight) - containerHeight) {
              //buffer = buffer * 2;
            }

            //get cell with that top
            this.removeEditCssClasses(this.curElement);
            this.top = this.setCellsFromElement(this.curElement, 0);
            this.vGrid.vGridGenerator.setScrollTop(currentscrolltop - (containerHeight - buffer));
            var newTop = this.top - (containerRows * rowHeight);
            if ((newTop / rowHeight) <= 0) {
              newTop = 0;
            }
            setTimeout(()=> {
              //need timeout atm here so I can do it after the grid have updated, Todo improve grid generator code
              this.setCellsFromTopValue(newTop);
              this.dispatchCellClick(this.index);
            }, 100)
          }
        });
      }


      //page down
      if (e.keyCode === 34) {
        e.preventDefault();
        this.updateBeforeNext(this.callbackObject());
        this.keyDownDelay(() => {
          if (this.curElement) {
            //get scrolltop
            var currentscrolltop = this.vGrid.vGridGenerator.getScrollTop();

            //get content height/rows
            var rowHeight = this.vGrid.vGridConfig.rowHeight;
            var containerHeight = this.vGrid.vGridGenerator.htmlCache.content.clientHeight;
            var containerRows = parseInt(containerHeight / rowHeight, 10);
            var buffer = parseInt(containerHeight / 2, 10);
            if (currentscrolltop === 0) {
              //buffer = buffer * 2;
            }

            //get cell with that top
            this.removeEditCssClasses(this.curElement);
            this.top = this.setCellsFromElement(this.curElement, 0);
            this.vGrid.vGridGenerator.setScrollTop(currentscrolltop + (containerHeight - buffer));
            var newTop = this.top + (containerRows * rowHeight);
            if ((newTop / rowHeight) >= this.vGrid.vGridConfig.getCollectionLength()) {
              newTop = this.vGrid.vGridConfig.getCollectionLength() * rowHeight;
              newTop = newTop - rowHeight
            }
            setTimeout(()=> {
              //need timeout atm here so I can do it after the grid have updated, Todo improve grid generator code
              this.setCellsFromTopValue(newTop);
              this.dispatchCellClick(this.index);

            }, 100)
          }
        });
      }

      //arrow down
      if (e.keyCode === 40) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.curElement) {
            this.removeEditCssClasses(this.curElement);
            this.top = this.setCellsFromElement(this.curElement, +1);
            this.dispatchCellClick(this.index)
          }
        });
      }





      //arrow right
      if (e.keyCode === 39 && !this.editMode) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.curElement) {
            if (!this.last) {
              this.removeEditCssClasses(this.curElement);
              this.dispatchCellClick(this.index + 1)
            }
          }
        });
      }


      //arrow left
      if (e.keyCode === 37 && !this.editMode) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.curElement) {
            if (!this.first) {
              this.removeEditCssClasses(this.curElement);
              this.dispatchCellClick(this.index - 1)
            }
          }
        });
      }



      //arrow up
      if (e.keyCode === 38) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.curElement) {
            this.removeEditCssClasses(this.curElement);
            this.top = this.setCellsFromElement(this.curElement, -1);
            this.dispatchCellClick(this.index)
          }
        });
      }




      //tab and shift key for tabing in other direction
      if (e.keyCode === 9 && e.shiftKey === true) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.curElement) {
            this.removeEditCssClasses(this.curElement);
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
        this.keyDownDelay(() => {
          if (this.curElement) {
            this.removeEditCssClasses(this.curElement);
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


  /***************************************************************************************
   * blur event when user hits enter, sets values and focus after back to cell
   ***************************************************************************************/
  elementBlur() {
    this.removeEditCssClasses(this.curElement);
    this.top = this.setCellsFromElement(this.curElement, 0);
    this.updateCurrentDone(this.callbackObject());
    this.editMode = false;
    this.setCellsFromTopValue(this.top);
    this.dispatchCellClick(this.index)
  }




  /***************************************************************************************
   * listen for "enter key"
   ***************************************************************************************/
  elementKeyDown() {
    this.curElement.onkeydown = (e) => {
      if (e.keyCode == 13) {
        this.elementBlur();
        return false;
      }
      if (this.readOnly === true && e.keyCode !== 9) {
        return false;
      } else {
        return true;
      }
    };
  }




  /***************************************************************************************
   * call back if format handler is set
   ***************************************************************************************/
  formatHandler(type, obj) {



    switch(type){
      case "beforeEdit":
        if (this.vGrid.vGridConfig.eventFormatHandler) {
          return this.vGrid.$parent[this.vGrid.vGridConfig.eventFormatHandler](type, obj)
        } else {
          return obj;
        }
      break;
      case "afterEdit":
        if (this.vGrid.vGridConfig.eventFormatHandler) {
          return this.vGrid.$parent[this.vGrid.vGridConfig.eventFormatHandler](type, {
            attribute: this.attribute,
            value: this.curElement.value,
            oldValue: this.vGrid.collectionFiltered[this.row][this.attribute],
            element: this.curElement
          })
        } else {
          return obj;
        }
        break;
      default:
        return obj;
    }


  }



  /***************************************************************************************
   * main callback obj
   ***************************************************************************************/
  callbackObject() {

    return {
      attribute: this.attribute,
      value: this.curElement.value,
      oldValue: this.oldValue,
      element: this.curElement
    };

  }



  /***************************************************************************************
   * called on scrollign, its just for updating cell if it havent been set
   ***************************************************************************************/
  onScroll() {
    if (this.updated === false) {
      this.updateActual(this.callbackObject());
    }
  }



  /***************************************************************************************
   * sets back focus afetr scroll
   ***************************************************************************************/
  setBackFocus() {
    if (this.curElement) {
      var rowNo = this.vGrid.filterRow;
      var rowheight = this.vGrid.vGridConfig.rowHeight;
      this.setCellsFromTopValue(rowNo * rowheight);
      if (this.cells.length > 0) {
        this.curElement = this.cells[this.index];

        if (!this.cells[this.index].classList.contains(this.vGrid.vGridConfig.css.editCell)) {
          this.cells[this.index].classList.add(this.vGrid.vGridConfig.css.editCell)
        }

        if (!this.cells[this.index].classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
          this.cells[this.index].classList.add(this.vGrid.vGridConfig.css.editCellWrite)
        }

        if (this.editMode) {
          if (this.readOnly === false) {
            if (this.cells[this.index].classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
              this.cells[this.index].classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
            }
            this.cells[this.index].removeAttribute("readonly");//if I dont do this, then they cant enter
            if(this.attributeType !== "image"){
              this.beforeCellEdit({
                attribute: this.attribute,
                value: this.curElement.value,
                oldValue: this.vGrid.collectionFiltered[this.row][this.attribute],
                element: this.curElement
              });
            }
          } else {
            this.cells[this.index].classList.add(this.vGrid.vGridConfig.css.editCellFocus);
          }
        } else {
          this.cells[this.index].classList.add(this.vGrid.vGridConfig.css.editCellFocus);
        }
      }

    }
  }



  /***************************************************************************************
   * update to run when hitting enter
   ***************************************************************************************/
  updateCurrentDone(obj) {
    if (this.attributeType !== "image" && this.editMode) {
      obj = this.formatHandler("afterEdit",obj);
      this.vGrid.skipNextUpdateProperty.push(obj.attribute);
      this.vGrid.currentRowEntity[obj.attribute] = obj.value;
      this.vGrid.currentEntity[obj.attribute] = obj.value;
      this.vGrid.vGridGenerator.updateRow(this.vGrid.filterRow, true);
    }
    this.updated = true;
  }




  /***************************************************************************************
   * update data before moring to next row
   ***************************************************************************************/
  updateBeforeNext(obj) {

    if (this.attributeType !== "image" && this.editMode) {
      obj = this.formatHandler("afterEdit",obj);
      this.vGrid.collectionFiltered[this.row][obj.attribute] = obj.value;
    }
    this.updated = true;
  }



  /***************************************************************************************
   * update last row, so user have have other values/cells set
   ***************************************************************************************/
  updateLastRow(row) {
    this.vGrid.vGridGenerator.updateRow(row, true);
  }



  /***************************************************************************************
   * cupdates current
   ***************************************************************************************/
  updateActual(obj) {
    if (obj.oldValue !== obj.value && this.attributeType !== "image" && this.editMode) {
      obj = this.formatHandler("afterEdit", obj);
      this.vGrid.skipNextUpdateProperty.push(obj.attribute);

      //set current entity and and update row data
      this.vGrid.currentRowEntity[obj.attribute] = obj.value;
      this.vGrid.currentEntity[obj.attribute] = obj.value;
    }
    this.updated = true;
  }

  /***************************************************************************************
   * before cell edit
   ***************************************************************************************/
  beforeCellEdit(obj) {
    obj = this.formatHandler("beforeEdit",obj);
    if(obj.newValue){
      obj.element.value = obj.newValue;
    }


  }

  /***************************************************************************************
   * main edit function,called from row clicks
   ***************************************************************************************/
  editCellhelper(row, e, readOnly) {

    this.newTarget = e.target;

    if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {



      //have we had a curElement before?
      if (this.curElement) {

        this.removeEditCssClasses(this.curElement);
        if (this.row !== row) {

          //row, lets update filtered collection row first
          this.updateBeforeNext(this.callbackObject());

          //then lets update last row for logics/colors etc
          this.updateLastRow(this.row);

        } else {

          if (this.curElement !== this.newTarget && this.updated !== false) {
            this.updateActual(this.callbackObject());
          }
          //not new row, we also need to update current entity


        }
      }

      //if image set focus to main cell/column
      this.attribute = this.newTarget.getAttribute(this.vGrid.vGridConfig.atts.dataAttribute);
      if (this.attribute === "image") {
        this.newTarget = this.newTarget.offsetParent;
        this.newTarget.setAttribute("tabindex", 0)
      }

      //get som vars we need
      this.readOnly = readOnly;
      this.index = this.vGrid.vGridConfig.attributeArray.indexOf(this.attribute);
      this.type = e.type;
      this.attributeType = this.vGrid.vGridConfig.colTypeArray[this.index];


      //set css
      if (!this.newTarget.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
        this.newTarget.classList.add(this.vGrid.vGridConfig.css.editCell)
      }

      //set css
      if (!this.newTarget.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
        this.newTarget.classList.add(this.vGrid.vGridConfig.css.editCellWrite)
      }


      //if double click and edit or allready edit more
      if (this.type === "dblclick" || this.editMode) {
        if (this.readOnly === false && this.attributeType !== "image") {
          if (this.curElement !== this.newTarget || this.editMode === false) {
            if(this.attributeType !== "image"){
              this.beforeCellEdit({
                attribute: this.attribute,
                value: this.newTarget.value,
                oldValue: this.vGrid.collectionFiltered[row][this.attribute],
                element: this.newTarget
              });
            }
          }

          if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
            this.newTarget.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
          }
          this.newTarget.removeAttribute("readonly");//if I dont do this, then they cant enter

        } else {
          this.newTarget.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
        }
        //set edit mode
        this.editMode = true;
      } else {
        this.newTarget.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
      }



      this.updated = false;
      this.row = row;
      this.curElement = this.newTarget;
      this.oldValue = this.newTarget.value;
      this.cells = this.curElement.offsetParent.offsetParent.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);
      //this.row = this.vGrid.filterRow;



      //override the double click, just to make it simple to focus on correct cell
      if (this.setAsSingleClick) {
        this.setAsSingleClick = false;
        this.type = "click"
      }


      setTimeout(()=> {
        this.vGrid.vGridGenerator.htmlCache.header.scrollLeft = this.vGrid.vGridGenerator.htmlCache.content.scrollLeft
      }, 10);


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




      if (this.editMode) {
        this.elementKeyDown();
      }
      this.curElement.focus();



    }
  };

}
