import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from '../v-grid';


@customAttribute('v-drag-drop-col')
@inject(Element, VGrid)
export class vGridDragDropCol {


  constructor(element, vGrid) {
    //get contexts
    this.vGrid = vGrid;
    this.vGridElement = vGrid.element;
    this.controller = vGrid.controller;
    this.groupingElements = vGrid.groupingElements;

    //get our shared context between our dragdrop attributes, holds data of the dragged one
    this.sharedContext = vGrid.dragDropAttributeSharedContext;

    this.element = element;
    this.column = this.element;
    this.entered = null;
    this.curColNo = null;

  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    //set binded context to our functions, wont be able to remove if binded during setting event
    this.onDragstartBinded = this.onDragstart.bind(this);
    this.onDragenterBinded = this.onDragenter.bind(this);
    this.onDragoverBinded = this.onDragover.bind(this);
    this.onDragendBinded = this.onDragend.bind(this);
    this.onDragOutSideBinded = this.onDragOutSide.bind(this);
  }


  unbind() {
    //todo remove event listeners
  }


  attached() {

    //get our target data (this case: this actual column..)
    let result = this.getTargetData(this.column);

    if (result.ok && !result.panel) {
      //get column data
      this.column = result.target;
      this.colType = this.column.attributes.getNamedItem("avg-type").value;
      this.colNo = this.column.attributes.getNamedItem("avg-config-col").value * 1;
      this.context = this.vGrid.columnBindingContext["setup" + this.colType][this.colNo];
      this.columnsArray = this.vGrid.columnBindingContext["setup" + this.colType];

      //when user starts to drag
      this.element.addEventListener("mousedown", this.onDragstartBinded);

      //why target ? bacuse thats the entire column object no mather what user have inside
      result.target.addEventListener("mouseenter", this.onDragenterBinded);


    }


    if (result.ok && result.target.nodeName == 'AVG-TOP-PANEL') {
      //if panel we need to listen and do some stuff differently
      this.isPanel = true;
      this.sharedContext.panel = result.target;

      //if we leave, remve group
      result.target.onmouseleave = (event) => {
        if (this.sharedContext.dragging) {
          this.groupingElements.removeGroup("")
        }
      };

      //if enter and dragging, add grouping
      result.target.onmouseenter = (event) => {
        if (this.sharedContext.dragging) {
          let name = this.vGrid.colConfig[this.sharedContext.colNo].colHeaderName;
          let field = this.vGrid.colConfig[this.sharedContext.colNo].colField.replace("rowRef.", "");
          this.groupingElements.addGroup(name, field);
          this.sharedContext.lastTarget = result.target;
        }
      };

      //if mouse up during dragging we grop, if group ios added
      result.target.onmouseup = (event) => {
        if (this.sharedContext.dragging) {
          this.groupingElements.addToGrouping();
        }
      }


    }


  }


  createDragElement() {

    //just creates the element we drag
    this.dragColumnBlock = document.createElement("div");
    this.dragColumnBlock.classList.add(this.vGrid.attTheme);
    this.dragColumnBlock.classList.add("avg-drag");
    this.dragColumnBlock.style.top = -1200 + "px"; //hide it
    this.dragColumnBlock.style.left = -1200 + "px";
    document.body.appendChild(this.dragColumnBlock);

    this.dragColumnBlock.innerHTML = this.vGrid.colConfig[this.colNo].colHeaderName; //<- need to do something here, use value for custom html?


  }


  onDragstart(event) {

    //register mouseup, so we can exit
    document.addEventListener("mouseup", this.onDragendBinded);
    this.vGridElement.addEventListener("mouseleave", this.onDragOutSideBinded);
    this.createDragElement();


    //want to delay this a little
    this.mouseMoveTimer = setTimeout(() => {
      //create our element we drag with upo
      document.addEventListener("mousemove", this.onDragoverBinded, false);
    }, 300);


    //set our shared resources for all the drag drop so we know them when we enter another
    this.sharedContext.dragging = true;
    this.sharedContext.colType = this.colType;
    this.sharedContext.context = this.context;
    this.sharedContext.colNo = this.colNo;
    this.sharedContext.curColNo = this.colNo;
    this.sharedContext.columnsArray = this.columnsArray;

    //build up new array we will use for setting new left
    this.sharedContext.columnsArraySorted = [];
    this.sharedContext.columnsArray.forEach((x) => {
      this.sharedContext.columnsArraySorted.push(x);
    })


  }

  unbind() {
    // console.log("unbind")
  }

  detached() {
    //  console.log("detached")
  }


  onDragOutSide(event) {

    if (this.sharedContext.dragging) {

      if (event.layerX < 0) {
        let left = false;

        this.vGrid.columnBindingContext.setupleft.forEach((x) => {
          if (x.show) {
            left = true;
          }
        });

        if (!left) {
          this.switchColumns({
            colType: "left"
          })
        }
      }

      if (event.layerX > this.vGridElement.clientWidth) {
        let right = false;

        this.vGrid.columnBindingContext.setupright.forEach((x) => {
          if (x.show) {
            right = true;
          }
        });

        if (!right) {
          this.switchColumns({
            colType: "right"
          })
        }
      }


    }

  }


  onDragenter(event) {

    //event.preventDefault();
    if (this.sharedContext.dragging) {

      //get results
      let result = this.getTargetData(event.target);

      //if ok, and AVG-COL
      if (result.target.nodeName === 'AVG-COL' && result.ok && this.sharedContext.lastTarget !== result.target) {

        //set last target
        this.sharedContext.lastTarget = result.target;

        //if fifferent column, and same type (main/left/right) 
        if (result.colNo !== this.sharedContext.colNo && result.colType === this.sharedContext.colType) {

          //get the left
          let newLeft = this.sharedContext.columnsArray[result.colNo].left;
          let oldLeft = this.sharedContext.columnsArray[this.sharedContext.colNo].left;


          if (newLeft < oldLeft) {
            this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
            this.sharedContext.columnsArray[result.colNo].left = newLeft + 1;
          } else {
            this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
            this.sharedContext.columnsArray[result.colNo].left = newLeft - 1;
          }

          //sort columns
          this.sharedContext.columnsArraySorted.sort(
            function (a, b) {
              return a.left - b.left;
            });


          //loop and set left/right  
          let appendValue = 0;
          this.sharedContext.columnsArraySorted.forEach((x) => {
            if (x.show) {
              x.left = appendValue;
              appendValue = appendValue + x.width;
            }
          })
        }

        //if coltype and colno is diffent
        if (result.colNo !== this.sharedContext.colNo && result.colType !== this.sharedContext.colType) {
          this.switchColumns(result)

        }

      }
    }

  }


  onDragover(event) {

    //setting position of out dragBlock
    if (this.dragColumnBlock) {
      this.dragColumnBlock.style.top = event.clientY + "px";
      this.dragColumnBlock.style.left = event.clientX + "px";
    }

  }


  onDragend(event) {

    //clear mosuemove timer
    clearTimeout(this.mouseMoveTimer);

    //set dragging to false
    this.sharedContext.dragging = false;

    //remove out listneres
    document.removeEventListener("mouseup", this.onDragendBinded);
    document.removeEventListener("mousemove", this.onDragoverBinded);
    this.vGridElement.removeEventListener("mouseleave", this.onDragOutSideBinded);


    //reset blocks
    this.sharedContext.lastTarget = null;
    this.sharedContext.group = null;

    //if drag column then remove
    if (this.dragColumnBlock) {
      let parent = this.dragColumnBlock.parentNode;
      if (parent) {
        parent.removeChild(this.dragColumnBlock);
        this.dragColumnBlock = null;
      }
    }

  }


  switchColumns(result) {

    //get vars 
    let width;
    let newColType = result.colType;
    let oldColType = this.sharedContext.colType;
    let heightAndWidths = this.vGrid.htmlHeightWidth;

    //chack type is one of the ones we handle
    switch (true) {
      case newColType === "left" && oldColType === "main":
      case newColType === "main" && oldColType === "left":
      case newColType === "right" && oldColType === "main":
      case newColType === "main" && oldColType === "right":
      case newColType === "left" && oldColType === "right":
      case newColType === "right" && oldColType === "left":


        //hide column
        this.sharedContext.columnsArray[this.sharedContext.colNo].show = false;

        //get to width of the column we have
        width = this.sharedContext.columnsArray[this.sharedContext.colNo].width;

        //sort array (I prb can remove?)
        this.sharedContext.columnsArraySorted.sort(
          function (a, b) {
            return a.left - b.left;
          });

        //loop and set left/right  
        let appendValue = 0;
        this.sharedContext.columnsArraySorted.forEach((x) => {
          if (x.show) {
            x.left = appendValue;
            appendValue = appendValue + x.width;
          }
        });


        //set new col type
        this.sharedContext.colType = result.colType;
        this.sharedContext.columnsArray = this.vGrid.columnBindingContext["setup" + result.colType];

        //show column
        this.sharedContext.columnsArray[this.sharedContext.colNo].show = true;

        //set new shared column context
        this.sharedContext.columnsArraySorted = [];
        this.sharedContext.columnsArray.forEach((x) => {
          this.sharedContext.columnsArraySorted.push(x);
        });

        //sort array (I prb can remove?)
        this.sharedContext.columnsArraySorted.sort(
          function (a, b) {
            return a.left - b.left;
          });

        //loop and set left/right  
        appendValue = 0;
        this.sharedContext.columnsArraySorted.forEach((x) => {
          if (x.show) {
            x.left = appendValue;
            appendValue = appendValue + x.width;
          }
        });

        break;
      default:
        console.log("Todo: Move to :" + newColType + ", from:" + oldColType);
        break;
    }


    //a lot of repeated code... throw this in htmlHeightWidths class, so I can call it from somewhere else too?
    if (newColType === "left" && oldColType === "main") {
      heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
      heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;

      heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
      heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;

      heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
      heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
      heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
    }


    if (newColType === "main" && oldColType === "left") {
      heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
      heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;

      heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
      heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;

      heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
      heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
      heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
    }


    if (newColType === "right" && oldColType === "main") {
      heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
      heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;

      heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
      heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;

      heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
      heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
      heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;
    }


    if (newColType === "main" && oldColType === "right") {
      heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
      heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;

      heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
      heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;

      heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
      heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
      heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;
    }


    if (newColType === "left" && oldColType === "right") {

      heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
      heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;

      heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
      heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;

      heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
      heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
      heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;

      heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
      heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
      heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
    }


    if (newColType === "right" && oldColType === "left") {

      heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
      heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;

      heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
      heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;

      heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
      heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
      heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;

      heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
      heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
      heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
    }


  }


  getTargetData(target) {

    //set variables
    let draggable = null;
    let count = 0;
    let exit = true;
    let ok = false;


    while (exit) {
      //have count, so we dont end up locking browser if anything goes really bad
      count++;

      //if we dont have any target, fail!
      if (!target.parentNode) {
        exit = false;
      } else {

        //if draggable, and not set, then we set it
        if (target.draggable === true && draggable === null) {
          draggable = target;
        }

        //check if it contains our elements, or continue to next parentNode
        switch (true) {
          case target.nodeName === "AVG-COL":
          case target.nodeName === "AVG-TOP-PANEL":
            ok = true;
            exit = false;
            break;
          default:
            target = target.parentNode;
            break;
        }
      }

      //20 times, we failed!
      if (count > 10) {
        exit = false;
      }

    }

    let colType = null;
    let colNo = null;
    let context = null;
    let columnsArray = null;
    let panel = false;


    //if ok, get variables we need
    if (ok && target.nodeName === "AVG-COL") {
      colType = target.attributes.getNamedItem("avg-type").value;
      colNo = target.attributes.getNamedItem("avg-config-col").value * 1;
      context = this.vGrid.columnBindingContext["setup" + colType][colNo];
      columnsArray = this.vGrid.columnBindingContext["setup" + colType];
    }

    if (ok && target.nodeName === "AVG-TOP-PANEL") {
      panel = true;
    }

    //return super object :-)
    return {
      draggable: draggable,
      ok: ok,
      target: target,
      colType: colType,
      colNo: colNo,
      context: context,
      columnsArray: columnsArray,
      panel: panel
    }

  }


}
