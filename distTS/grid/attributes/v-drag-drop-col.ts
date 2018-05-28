import { inject, customAttribute, bindable } from 'aurelia-framework';
import { VGrid } from '../v-grid';
import {
  ColumBindingContextObjectInterface,
  DragDropShardContextInterface,
  GroupingElements,
  Controller,
  BindingContextInterface,
  OverrideContextInterface,
  TargetDataInterface,
  HtmlHeightWidth
} from '../../interfaces';


/**
 * Custom attribute "v-drag-drop-col"
 * Logic behind dragdrop, & enables grouping
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
@customAttribute('v-drag-drop-col')
@inject(Element, VGrid)
export class VGridDragDropCol {
  private vGrid: VGrid;
  private element: Element;
  private column: Element;
  private vGridElement: Element;
  private controller: Controller;
  private groupingElements: GroupingElements;
  private sharedContext: DragDropShardContextInterface;
  private entered: boolean;
  private curColNo: number;
  private bindingContext: BindingContextInterface;
  private overrideContext: OverrideContextInterface;
  private onDragstartBinded: EventListenerOrEventListenerObject;
  private onDragenterBinded: EventListenerOrEventListenerObject;
  private onDragoverBinded: EventListenerOrEventListenerObject;
  private onDragendBinded: EventListenerOrEventListenerObject;
  private onDragOutSideBinded: EventListenerOrEventListenerObject;
  private onCloseMenuBinded: EventListenerOrEventListenerObject;
  private colType: string;
  private colNo: number;
  private context: ColumBindingContextObjectInterface;
  private columnsArray: ColumBindingContextObjectInterface[];
  private isPanel: boolean;
  private dragColumnBlock: HTMLElement;
  private mouseMoveTimer: any;
  private htmlHeightWidth: HtmlHeightWidth;
  @bindable private title: string;
  @bindable private field: string;



  constructor(element: Element, vGrid: VGrid) {
    // get contexts
    this.vGrid = vGrid;
    this.vGridElement = vGrid.element;
    this.controller = vGrid.controller;
    this.groupingElements = vGrid.groupingElements;
    this.htmlHeightWidth = vGrid.htmlHeightWidth;

    // get our shared context between our dragdrop attributes, holds data of the dragged one
    this.sharedContext = vGrid.dragDropAttributeSharedContext;

    this.element = element;
    this.column = this.element;
    this.entered = null;
    this.curColNo = null;

  }



  /**
   * todo description
   *
   */
  public bind(bindingContext: BindingContextInterface, overrideContext: OverrideContextInterface): void {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    // set binded context to our functions, wont be able to remove if binded during setting event
    this.onDragstartBinded = this.onDragstart.bind(this);
    this.onDragenterBinded = this.onDragenter.bind(this);
    this.onDragoverBinded = this.onDragover.bind(this);
    this.onDragendBinded = this.onDragend.bind(this);
    this.onDragOutSideBinded = this.onDragOutSide.bind(this);
    this.onCloseMenuBinded = this.onCloseMenu.bind(this);
  }



  /**
   * todo description
   *
   */
  public unbind(): void {
    // todo remove event listeners
  }



  /**
   * todo description
   *
   */
  public detached(): void {
    // get our target data (this case: this actual column..)
    let result = this.getTargetData(this.column);

    if (result.ok && !result.panel) {

      // when user starts to drag
      this.element.removeEventListener('mousedown', this.onDragstartBinded);

      // why target ? bacuse thats the entire column object no mather what user have inside
      result.target.removeEventListener('mouseenter', this.onDragenterBinded);

    }


    if (result.ok && result.target.nodeName === 'AVG-DRAG-HELPER') {

      // when user starts to drag
      this.element.removeEventListener('mousedown', this.onDragstartBinded);

      // why target ? bacuse thats the entire column object no mather what user have inside
      result.target.removeEventListener('mouseenter', this.onDragenterBinded);
      result.target.removeEventListener('mousedown', this.onCloseMenuBinded);

    }
  }



  /**
   * todo description
   *
   */
  public attached(): void {


    // get our target data (this case: this actual column..)
    let result = this.getTargetData(this.column);

    if (result.ok && !result.panel) {
      // get column data
      this.column = result.target;
      this.colType = this.column.attributes.getNamedItem('data-avg-type').value;
      this.colNo = parseInt(this.column.attributes.getNamedItem('data-avg-config-col').value, 10);
      this.context = this.vGrid.columnBindingContext['setup' + this.colType][this.colNo];
      this.columnsArray = this.vGrid.columnBindingContext['setup' + this.colType];

      // when user starts to drag
      this.element.addEventListener('mousedown', this.onDragstartBinded);

      // why target ? bacuse thats the entire column object no mather what user have inside
      result.target.addEventListener('mouseenter', this.onDragenterBinded);

    }

    if (result.ok && result.target.nodeName === 'AVG-TOP-PANEL') {
      // if panel we need to listen and do some stuff differently
      this.isPanel = true;
      this.sharedContext.panel = result.target;

      // if we leave, remve group
      result.target.onmouseleave = () => {
        if (this.sharedContext.dragging && this.sharedContext.title && this.sharedContext.field) {
          this.groupingElements.removeGroup('');
        }
      };

      // if enter and dragging, add grouping
      result.target.onmouseenter = () => {
        if (this.sharedContext.dragging && this.sharedContext.title && this.sharedContext.field) {
          this.groupingElements.addGroup(this.sharedContext.title, this.sharedContext.field);
          this.sharedContext.lastTarget = result.target;
        }
      };

      // if mouse up during dragging we grop, if group ios added
      result.target.onmouseup = () => {
        if (this.sharedContext.dragging && this.sharedContext.title && this.sharedContext.field) {
          this.groupingElements.addToGrouping();
        }
      };

    }

    if (result.ok && result.target.nodeName === 'AVG-DRAG-HELPER') {
      // get column data
      this.column = result.target;
      this.colType = this.column.attributes.getNamedItem('data-avg-type').value;
      this.colNo = parseInt(this.column.attributes.getNamedItem('data-avg-config-col').value, 10);
      this.context = this.vGrid.columnBindingContext['setup' + 'main'][this.colNo];
      this.columnsArray = this.vGrid.columnBindingContext['setup' + 'main'];
      this.isPanel = true;

      // when user starts to drag
      this.element.addEventListener('mousedown', this.onDragstartBinded);

      // why target ? bacuse thats the entire column object no mather what user have inside
      result.target.addEventListener('mouseenter', this.onDragenterBinded);
      result.target.addEventListener('mousedown', this.onCloseMenuBinded);

    }

  }



  private onCloseMenu(): void {
    this.vGrid.controller.raiseEvent('avg-close-menu');
  }




  /**
   * todo description
   *
   */
  private createDragElement(event: any): void {

    // just creates the element we drag
    this.dragColumnBlock = document.createElement('div');
    this.dragColumnBlock.classList.add(this.vGrid.attTheme);
    this.dragColumnBlock.classList.add('avg-drag');
    this.dragColumnBlock.style.top = this.isPanel ? event.clientY + 'px' : -1200 + 'px'; // hide it
    this.dragColumnBlock.style.left = this.isPanel ? event.clientX + 'px' : -1200 + 'px';
    document.body.appendChild(this.dragColumnBlock);

    // <- maybe do something here, use value for custom html?
    this.dragColumnBlock.innerHTML = this.title || this.vGrid.colConfig[this.colNo].colHeaderName;
  }



  /**
   * todo description
   *
   */
  private onDragstart(event: any): void {

    // register mouseup, so we can exit
    document.addEventListener('mouseup', this.onDragendBinded);
    this.vGridElement.addEventListener('mouseleave', this.onDragOutSideBinded);
    this.createDragElement(event);

    // want to delay this a little
    if (this.isPanel) {

      document.addEventListener('mousemove', this.onDragoverBinded, false);
    } else {
      this.mouseMoveTimer = setTimeout(() => {
        // create our element we drag with upo
        document.addEventListener('mousemove', this.onDragoverBinded, false);
      }, 300);
    }

    // set our shared resources for all the drag drop so we know them when we enter another
    this.sharedContext.dragging = true;
    this.sharedContext.colType = this.colType;
    this.sharedContext.context = this.context;
    this.sharedContext.colNo = this.colNo;
    this.sharedContext.curColNo = this.colNo;
    this.sharedContext.columnsArray = this.columnsArray;
    this.sharedContext.title = this.title;
    this.sharedContext.field = this.field;
    // this.column.classList.add('avg-dragging')

    // build up new array we will use for setting new left
    this.sharedContext.columnsArraySorted = [];
    this.sharedContext.columnsArray.forEach((x) => {
      this.sharedContext.columnsArraySorted.push(x);
    });
  }



  /**
   * todo description
   *
   */
  private onDragOutSide(event: MouseEvent): void {

    if (this.sharedContext.dragging) {

      if (event.layerX < 0) {
        let left = false;

        this.vGrid.columnBindingContext.setupleft.forEach((x) => {
          if (x.show) {
            left = true;
          }
        });

        if (!left) {
          this.switchColumns(({
            colType: 'left'
          } as TargetDataInterface));
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
          this.switchColumns(({
            colType: 'right'
          } as TargetDataInterface));
        }
      }

    }

  }



  /**
   * todo description
   *
   */
  private onDragenter(event: MouseEvent): void {

    // event.preventDefault();
    if (this.sharedContext.dragging) {

      // get results
      let result = this.getTargetData((event.target as HTMLElement));

      // if ok, and AVG-COL
      if (result.target.nodeName === 'AVG-COL' && result.ok && this.sharedContext.lastTarget !== result.target) {

        // set last target
        this.sharedContext.lastTarget = result.target;

        // if fifferent column, and same type (main/left/right)
        if (result.colNo !== this.sharedContext.colNo && result.colType === this.sharedContext.colType) {

          // get the left
          let newLeft = this.sharedContext.columnsArray[result.colNo].left;
          let oldLeft = this.sharedContext.columnsArray[this.sharedContext.colNo].left;

          if (newLeft < oldLeft) {
            this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
            this.sharedContext.columnsArray[result.colNo].left = newLeft + 1;
          } else {
            this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
            this.sharedContext.columnsArray[result.colNo].left = newLeft - 1;
          }

          // sort columns
          this.sharedContext.columnsArraySorted.sort(
            (a, b) => {
              return a.left - b.left;
            });

          // loop and set left/right
          let appendValue = 0;
          this.sharedContext.columnsArraySorted.forEach((x) => {
            if (x.show) {
              x.left = appendValue;
              appendValue = appendValue + x.width;
            }
          });
        }

        // if coltype and colno is diffent
        if (result.colNo !== this.sharedContext.colNo && result.colType !== this.sharedContext.colType) {
          this.switchColumns(result);

        }

      }
    }


  }



  /**
   * todo description
   *
   */
  private onDragover(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // setting position of out dragBlock
    if (this.dragColumnBlock) {
      this.dragColumnBlock.style.top = event.clientY + 'px';
      this.dragColumnBlock.style.left = event.clientX + 'px';
    }

  }



  /**
   * todo description
   *
   */
  private onDragend(): void {

    // clear mosuemove timer
    clearTimeout(this.mouseMoveTimer);

    // set dragging to false
    this.sharedContext.dragging = false;

    // remove out listneres
    document.removeEventListener('mouseup', this.onDragendBinded);
    document.removeEventListener('mousemove', this.onDragoverBinded);
    this.vGridElement.removeEventListener('mouseleave', this.onDragOutSideBinded);

    // reset blocks
    this.sharedContext.lastTarget = null;
    // this.sharedContext.group = null;

    // if drag column then remove
    if (this.dragColumnBlock) {
      let parent = this.dragColumnBlock.parentNode;
      if (parent) {
        parent.removeChild(this.dragColumnBlock);
        this.dragColumnBlock = null;
      }
    }
  }



  /**
   * todo description
   *
   */
  private switchColumns(result: TargetDataInterface): void {

    // get vars
    let width: number;
    let newColType = result.colType;
    let oldColType = this.sharedContext.colType;
    let moreThenOneMainColumn = true;

    // chack type is one of the ones we handle
    switch (true) {
      case newColType === 'left' && oldColType === 'main':
      case newColType === 'right' && oldColType === 'main':
      case newColType === 'main' && oldColType === 'left':
      case newColType === 'main' && oldColType === 'right':
      case newColType === 'left' && oldColType === 'right':
      case newColType === 'right' && oldColType === 'left':
      case newColType === 'main' && oldColType === 'chooser':
      case newColType === 'left' && oldColType === 'chooser':
      case newColType === 'right' && oldColType === 'chooser':

        // check if more then 1 main column
        // my main dragdrop logi fails if not

        if (oldColType === 'main') {
          let count = -1;
          this.sharedContext.columnsArray.forEach((x) => {
            if (x.show) {
              count++;
            }
          });
          if (!count) {
            moreThenOneMainColumn = false;
          }
        }

        if (moreThenOneMainColumn) {
          // hide column
          this.sharedContext.columnsArray[this.sharedContext.colNo].show = false;

          // get to width of the column we have
          width = this.sharedContext.columnsArray[this.sharedContext.colNo].width;

          // sort array (I prb can remove?)
          this.sharedContext.columnsArraySorted.sort(
            (a, b) => {
              return a.left - b.left;
            });

          // loop and set left/right
          let appendValue = 0;
          this.sharedContext.columnsArraySorted.forEach((x) => {
            if (x.show) {
              x.left = appendValue;
              appendValue = appendValue + x.width;
            }
          });

          // set new col type
          this.sharedContext.colType = result.colType;
          this.sharedContext.columnsArray = this.vGrid.columnBindingContext['setup' + result.colType];

          // show column
          this.sharedContext.columnsArray[this.sharedContext.colNo].show = true;

          // set correct width
          this.sharedContext.columnsArray[this.sharedContext.colNo].width = width;

          // set new shared column context
          this.sharedContext.columnsArraySorted = [];
          this.sharedContext.columnsArray.forEach((x) => {
            this.sharedContext.columnsArraySorted.push(x);
          });

          // sort array (I prb can remove?)
          this.sharedContext.columnsArraySorted.sort(
            (a, b) => {
              return a.left - b.left;
            });

          // loop and set left/right
          appendValue = 0;
          this.sharedContext.columnsArraySorted.forEach((x) => {
            if (x.show) {
              x.left = appendValue;
              appendValue = appendValue + x.width;
            }
          });
        }

        break;
      default:
        // console.log("Todo: Move to :" + newColType + ", from:" + oldColType);
        break;
    }


    // a lot of repeated code... throw this in htmlHeightWidths class, so I can call it from somewhere else too?
    if (newColType === 'left' && oldColType === 'main' && moreThenOneMainColumn) {
      this.htmlHeightWidth.moveWidthFromMainToLeft(width);
    }

    if (newColType === 'main' && oldColType === 'chooser' && moreThenOneMainColumn) {
      this.htmlHeightWidth.addWidthToMain(width);
    }

    if (newColType === 'left' && oldColType === 'chooser' && moreThenOneMainColumn) {
      this.htmlHeightWidth.addWidthToLeft(width);
    }

    if (newColType === 'right' && oldColType === 'chooser' && moreThenOneMainColumn) {
      this.htmlHeightWidth.addWidthToRight(width);
    }

    if (newColType === 'main' && oldColType === 'left' && moreThenOneMainColumn) {
      this.htmlHeightWidth.moveWidthFromLeftToMain(width);
    }

    if (newColType === 'right' && oldColType === 'main' && moreThenOneMainColumn) {
      this.htmlHeightWidth.moveWidthFromMainToRight(width);
    }

    if (newColType === 'main' && oldColType === 'right' && moreThenOneMainColumn) {
      this.htmlHeightWidth.moveWidthFromRightToMain(width);
    }

    if (newColType === 'left' && oldColType === 'right' && moreThenOneMainColumn) {
      this.htmlHeightWidth.moveWidthFromLeftToRight(width);
    }

    if (newColType === 'right' && oldColType === 'left' && moreThenOneMainColumn) {
      this.htmlHeightWidth.moveWidthFromRightToLeft(width);
    }


  }



  /**
   * todo description
   *
   */
  private getTargetData(curTarget: Element): TargetDataInterface {

    // set variables
    let draggableTarget: Element = null;
    let count = 0;
    let exit = true;
    let isOk = false;

    while (exit) {
      // have count, so we dont end up locking browser if anything goes really bad
      count++;

      // if we dont have target, fail!
      if (!curTarget.parentNode) {
        exit = false;
      } else {

        // if draggable, and not set, then we set it
        if ((curTarget as HTMLElement).draggable === true && draggableTarget === null) {
          draggableTarget = curTarget;
        }

        // check if it contains our elements, or continue to next parentNode
        switch (true) {
          case curTarget.nodeName === 'AVG-DRAG-HELPER':
          case curTarget.nodeName === 'AVG-COL':
          case curTarget.nodeName === 'AVG-TOP-PANEL':
            isOk = true;
            exit = false;
            break;
          default:
            curTarget = (curTarget.parentNode as Element);
            break;
        }
      }

      // 20 times, we failed!
      if (count > 10) {
        exit = false;
      }

    }

    let curColType: string = null;
    let curColNo: number = null;
    let curContext: ColumBindingContextObjectInterface = null;
    let curColumnsArray: ColumBindingContextObjectInterface[] = null;
    let isPanel = false;

    // if ok, get variables we need
    if (isOk && curTarget.nodeName === 'AVG-COL') {
      curColType = curTarget.attributes.getNamedItem('data-avg-type').value;
      curColNo = parseInt(curTarget.attributes.getNamedItem('data-avg-config-col').value, 10);
      curContext = this.vGrid.columnBindingContext['setup' + curColType][curColNo];
      curColumnsArray = this.vGrid.columnBindingContext['setup' + curColType];
    }

    if (isOk && curTarget.nodeName === 'AVG-DRAG-HELPER') {
      curColType = curTarget.attributes.getNamedItem('data-avg-type').value;
      curColNo = parseInt(curTarget.attributes.getNamedItem('data-avg-config-col').value, 10);
      curContext = this.vGrid.columnBindingContext['setup' + 'main'][curColNo];
      curColumnsArray = this.vGrid.columnBindingContext['setup' + 'main'];
      isPanel = true;
    }

    if (isOk && curTarget.nodeName === 'AVG-TOP-PANEL') {
      isPanel = true;
    }

    // return super object :-)
    return ({
      draggable: draggableTarget,
      ok: isOk,
      target: curTarget,
      colType: curColType,
      colNo: curColNo,
      context: curContext,
      columnsArray: curColumnsArray,
      panel: isPanel
    } as TargetDataInterface);

  }

}
