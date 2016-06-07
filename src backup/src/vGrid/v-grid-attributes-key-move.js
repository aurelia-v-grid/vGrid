/*****************************************************************************************************************
 *    Attributes for tabbing, keyup/down and page up/down
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customAttribute('v-key-move')
@inject(Element, VGrid)
export class vGridAttributesKeyMove {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
    this.classname = "v-grid-key-move";
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }


  attached() {
    this.element.classList.add(this.classname);
    this.addGridKeyListner();

    this.element.addEventListener('tabbing', (e)=> {
      this.element.focus();

      let ev = document.createEvent('Event');
      ev.initEvent("click", true, true);
      this.element.offsetParent.dispatchEvent(ev);

    });


    this.element.addEventListener('focus', (e)=> {

      if (this.vGrid.vGridCurrentEntityRef === null) {
        let ev = document.createEvent('Event');
        ev.initEvent("click", true, true);
        this.element.offsetParent.dispatchEvent(ev);
      }

    });

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
   * sets "the cells" from  to direction asked for, so tabbing jumps to next row
   ***************************************************************************************/
  setCellsFromElement(node, direction) {
    var thisTop;
    var element;
    for (var i = 0; i < 10; i++) {
      try {
        if (node.classList.contains(this.vGrid.vGridConfig.css.row)) {
          var row = parseInt(node.getAttribute("row"));
          for (var y = 0; y < this.vGrid.vGridGenerator.rowElementArray.length; y++) {
            if (row === parseInt((this.vGrid.vGridGenerator.rowElementArray[y].top / this.vGrid.vGridConfig.attRowHeight))) {
              this.row = row;
              thisTop = this.vGrid.vGridGenerator.rowElementArray[y + direction].top;
              element = this.vGrid.vGridGenerator.rowElementArray[y + direction].div;
            }
          }
        }
        node = node.parentNode;
      } catch (err) {
        //nothing for now
      }
    }
    if (element) {
      this.cells = element.querySelectorAll("." + this.classname);
    }
    return thisTop;
  };


  /***************************************************************************************
   * sets "the cells" from a top value, used for page up/down
   ***************************************************************************************/
  setCellsFromTopValue(top) {
    var element = 0;
    for (var i = 0; i < this.vGrid.vGridGenerator.rowElementArray.length; i++) {
      if (this.vGrid.vGridGenerator.rowElementArray[i].top === top) {
        element = this.vGrid.vGridGenerator.rowElementArray[i].div;
      }
    }
    if (element) {
      this.cells = element.querySelectorAll("." + this.classname);
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
   * get the index
   ***************************************************************************************/
  getIndex() {
    for (var i = 0; i < this.cells.length; i++) {
      if (this.element === this.cells[i]) {
        this.index = i;
        if (i === 0) {
          this.first = true;
          this.last = false;
        }
        if (i === this.cells.length - 1) {
          this.first = false;
          this.last = true;
        }
      }
    }
  }


  /***************************************************************************************
   * adds main keys, like arrow keys, tab, and page up/down
   ***************************************************************************************/
  addGridKeyListner() {


    this.element.onkeydown = (e) => {


      this.setCellsFromElement(this.element, 0);
      this.getIndex();


      //page up
      if (e.keyCode === 33) {
        e.preventDefault();
        this.keyDownDelay(() => {


          //get scrolltop
          var currentscrolltop = this.vGrid.vGridClientCtx.getScrollTop();

          //get content height/rows
          var rowHeight = this.vGrid.vGridConfig.attRowHeight;
          var containerHeight = this.vGrid.vGridGenerator.contentElement.clientHeight;
          var containerRows = parseInt(containerHeight / rowHeight, 10);
          this.top = this.setCellsFromElement(this.element, 0);

          var newTop = this.top - (containerRows * rowHeight);
          if ((newTop / rowHeight) <= 0) {
            newTop = 0;
          }


          //if last scroll was up then we need to reverse the buffer
          if (this.vGrid.vGridScrollEvents.lastScrollType === "down") {
            this.vGrid.vGridScrollEvents.onSmallScroll(false);
          }

          this.setCellsFromTopValue(newTop);
          this.dispatchCellClick(this.index);

          var setTop = newTop - parseInt((containerRows * rowHeight) / 2);
          this.vGrid.vGridClientCtx.setScrollTop(setTop);


        });
      }


      //page down
      if (e.keyCode === 34) {
        e.preventDefault();
        this.keyDownDelay(() => {


          //get scrolltop
          var currentscrolltop = this.vGrid.vGridClientCtx.getScrollTop();

          //get content height/rows
          var rowHeight = this.vGrid.vGridConfig.attRowHeight;
          var containerHeight = this.vGrid.vGridGenerator.contentElement.clientHeight;
          var containerRows = parseInt(containerHeight / rowHeight, 10);
          this.top = this.setCellsFromElement(this.element, 0);

          var newTop = this.top + (containerRows * rowHeight);
          if ((newTop / rowHeight) >= this.vGrid.vGridConfig.getCollectionLength()) {
            newTop = this.vGrid.vGridConfig.getCollectionLength() * rowHeight;
            newTop = newTop - rowHeight
          }

          //if last scroll was up then we need to reverse the buffer
          if (this.vGrid.vGridScrollEvents.lastScrollType === "up") {
            this.vGrid.vGridScrollEvents.onSmallScroll(true);
          }

          this.setCellsFromTopValue(newTop);
          this.dispatchCellClick(this.index);

          var setTop = newTop - parseInt((containerRows * rowHeight) / 2);
          this.vGrid.vGridClientCtx.setScrollTop(setTop);
        });
      }

      //arrow down
      if (e.keyCode === 40) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.vGrid.vGridScrollEvents.lastScrollType === "up") {
            this.vGrid.vGridScrollEvents.onSmallScroll(true);
          }
          this.top = this.setCellsFromElement(this.element, +1);
          this.dispatchCellClick(this.index)
        });
      }


      //arrow up
      if (e.keyCode === 38) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.vGrid.vGridScrollEvents.lastScrollType === "down") {
            this.vGrid.vGridScrollEvents.onSmallScroll(false);
          }
          this.top = this.setCellsFromElement(this.element, -1);
          this.dispatchCellClick(this.index)
        });
      }


      //tab and shift key for tabing in other direction
      if (e.keyCode === 9 && e.shiftKey === true) {
        if (this.row !== 0 && this.first) {
          e.preventDefault();
          this.keyDownDelay(() => {
            this.index = this.index - 1;
            if (this.first) {
              if (this.vGrid.vGridScrollEvents.lastScrollType === "down") {
                this.vGrid.vGridScrollEvents.onSmallScroll(false);
              }
              this.index = this.cells.length - 1;
              this.top = this.setCellsFromElement(this.element, -1)
            }
            this.dispatchCellClick(this.index)

          });
        }
      }


      //normal tabbing
      if (e.keyCode === 9 && e.shiftKey === false) {


        e.preventDefault();
        this.keyDownDelay(() => {
          this.index = this.index + 1;
          if (this.last) {
            if (this.vGrid.vGridScrollEvents.lastScrollType === "up") {
              this.vGrid.vGridScrollEvents.onSmallScroll(true);
            }
            this.index = 0;
            this.top = this.setCellsFromElement(this.element, 1)
          }
          this.dispatchCellClick(this.index)
        });

      }

    }
  }


}
