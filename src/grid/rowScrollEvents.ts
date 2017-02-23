import { HtmlCache, RowCacheInterface, Controller } from '../interfaces';

/**
 * This takes care of the row scrolling
 * It sets the correct top values to all columns and groups
 * Columns are pinned left and right, main
 * It does not listen for scroll event on main elements, just internal event "avg-scroll"
 * After it sets correct top value, it triggers event to rebind row/ update data
 * 
 */
export class RowScrollEvents {
  private htmlCache: HtmlCache;
  private element: Element;
  private timer: any;
  private largeScroll: boolean;
  private collectionLength: number;
  private largeScrollUpdateDelay: number;
  private rowCache: RowCacheInterface[];
  private rowHeight: number;
  private cacheLength: number;
  private leftRows: NodeListOf<Element>;
  private mainRows: NodeListOf<Element>;
  private rightRows: NodeListOf<Element>;
  private groupRows: NodeListOf<Element>;
  private onScrollBinded: EventListenerOrEventListenerObject;
  private left: Element;
  private main: Element;
  private right: Element;
  private scroller: Element;
  private controller: Controller;



  constructor(element: Element, htmlCache: HtmlCache, controller: Controller) {
    this.htmlCache = htmlCache;
    this.element = element;
    this.controller = controller;
    this.timer = null;
    this.largeScroll = false;
    this.collectionLength = 0;
    this.largeScrollUpdateDelay = 0;
  }



  /**
   * Called when grid is created to set defaults, add event listners
   * 
   */
  public init(rowHeight: number, attDataDelay: number, attVariableRowHeight: boolean): void {
    this.rowCache = this.htmlCache.rowCache;
    this.largeScrollUpdateDelay = attDataDelay;
    this.rowHeight = rowHeight;
    this.updateInternalHtmlCache();
    this.createRowCache();
    if (attVariableRowHeight) {
      // @override what scroll functions to use
      this.scrollNormal = this.scrollNormalVariableRowHeight.bind(this);
      this.scrollScrollBar = this.scrollScrollBarVariableRowHeight.bind(this);
    }
    this.addEventListener();
  }



  /**
   * Gets called when selection changes, this way it knows the limit of scrolling
   * 
   */
  public setCollectionLength(length: number): void {
    this.collectionLength = length;
  }



  /**
   * Creates a rowcache so its easy to get the bindingcontexts of all columns
   * 
   */
  private createRowCache(): void {
    for (let i = 0; i < this.cacheLength; i++) {
      this.rowCache.push(({
        left: this.leftRows[i],
        main: this.mainRows[i],
        right: this.rightRows[i],
        group: this.groupRows[i],
        top: this.rowHeight * i,
        row: i
      } as RowCacheInterface));
    }
  }



  /**
   * Updates internal html cache so its easy to access
   * 
   */
  private updateInternalHtmlCache(): void {

    this.left = this.htmlCache.avg_content_left_scroll;
    this.main = this.htmlCache.avg_content_main_scroll;
    this.right = this.htmlCache.avg_content_right_scroll;
    this.scroller = this.htmlCache.avg_content_right_scroll;

    this.leftRows = this.htmlCache.avg_left_rows;
    this.mainRows = this.htmlCache.avg_main_rows;
    this.rightRows = this.htmlCache.avg_right_rows;
    this.groupRows = this.htmlCache.avg_group_rows;

    this.cacheLength = this.leftRows.length;

  }



  /**
   * returns the context height of main column (middle one)
   * 
   */
  get contentHeight(): number {
    return (this.htmlCache.avg_content_main as HTMLElement).offsetHeight;
  }



  /**
   * Figues out what type of scrolling is done and calls correct method
   * 
   */
  private onScroll(event: CustomEvent): void {
    let isDown = event.detail.isDown;
    let isScrollBarScrolling = event.detail.isScrollBarScrolling;
    let newTopPosition = event.detail.newTopPosition;
    if (this.largeScroll || isScrollBarScrolling) {
      if (this.largeScrollUpdateDelay) {
        clearTimeout(this.timer);
        this.largeScroll = true;
        this.timer = setTimeout(() => {
          this.largeScroll = false;
          this.scrollScrollBar(newTopPosition, isDown);
        }, this.largeScrollUpdateDelay);
      } else {
        this.scrollScrollBar(newTopPosition, isDown);
      }
    } else {
      switch (true) {
        case isDown && !isScrollBarScrolling:
          this.scrollNormal(newTopPosition, true);
          break;
        case !isDown && !isScrollBarScrolling:
          this.scrollNormal(newTopPosition, false);
          break;
        default:
      }
    }
  }



  /**
   * Sets new top calues to all needed columns (left, main, right, group)
   * 
   */
  private setRowTopValue(cache: RowCacheInterface, top: number) {
    cache.left.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.main.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.right.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.group.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.top = top;
    cache.row = Math.floor(top / this.rowHeight);
  }



  /**
   * Sets new top calues to all needed columns (left, main, right, group)
   * This one is used for the vaiable row height
   * 
   */
  private setRowTopValueVariableRowHeight(cache: RowCacheInterface, top: number) {
    cache.left.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.main.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.right.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.group.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.top = top;
    let rowHeightState: any = this.controller.getRowHeightState();
    cache.row = rowHeightState.top.indexOf(top);
  }



  /**
   * Handles normal scrolling
   * 
   */
  private scrollNormal(newTopPosition: number, downScroll: boolean) {

    let rowHeight = this.rowHeight;
    let currentRow = Math.floor(newTopPosition / rowHeight);
    let cacheHeight = rowHeight * this.cacheLength;

    for (let i = 0; i < this.cacheLength; i++) {

      let cache = this.rowCache[i];
      let top = this.rowCache[i].top;
      let update = false;
      let newTop: number;

      if (!downScroll) {
        if (top > (newTopPosition + this.contentHeight)) {
          update = true;
          newTop = top - cacheHeight;
          currentRow = (top - cacheHeight) / rowHeight;
        }
      } else {

        if (top < (newTopPosition - rowHeight)) {
          update = true;
          newTop = top + cacheHeight;
          currentRow = (top + cacheHeight) / rowHeight;
        }
      }

      if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
        this.setRowTopValue(cache, newTop);
        this.triggerRebindRowEvent(currentRow, cache, downScroll);
      }

    }

    // sort array
    this.rowCache.sort(
      (a, b) => {
        return a.row - b.row;
      });
  }



  /**
   * Handles scrollbars scrolling, or when setting top value by code
   * 
   */
  private scrollScrollBar(newTopPosition: number, downScroll: boolean) {

    if (this.collectionLength <= this.cacheLength) {
      newTopPosition = 0;
    }

    // vars
    let rowHeight = this.rowHeight;
    let bodyHeight = this.contentHeight;
    let currentRow = Math.floor(newTopPosition / rowHeight);
    let firstRow = Math.floor(newTopPosition / rowHeight);
    let currentRowTop = rowHeight * currentRow;
    let firstRowTop = rowHeight * firstRow;
    let collectionLength = this.collectionLength;

    // for setting after
    let setAfter = (no: number) => {
      let row = this.rowCache[no];
      this.setRowTopValue(row, currentRowTop);
      currentRowTop = currentRowTop + rowHeight;
    };

    // for setting before (when hitting bottom)
    let setBefore = (no: number) => {
      let row = this.rowCache[no];
      firstRowTop = firstRowTop - rowHeight;
      this.setRowTopValue(row, firstRowTop);
    };

    // for setting before (when hitting bottom)
    let setHiddenFromView = (no: number) => {
      let row = this.rowCache[no];
      this.setRowTopValue(row, -(currentRowTop + (rowHeight * 50)));
    };

    // loop row html cache
    for (let i = 0; i < this.cacheLength; i++) {
      let moved = false;
      switch (true) {
        case currentRow >= 0 && currentRow <= collectionLength - 1:
          setAfter(i);
          moved = true;
          break;
        case currentRow >= collectionLength && (collectionLength * rowHeight) >= bodyHeight:
          setBefore(i);
          moved = true;
          break;
        default:
      }
      if (!moved) {
        if (currentRow >= collectionLength && (currentRowTop - rowHeight) >= bodyHeight) {
          setHiddenFromView(i);
        } else {
          // if this triggers the collection have been removed, so really just need to place out the rows
          if (currentRow >= collectionLength) {
            //setAfter(i);
            setHiddenFromView(i);
          }
        }
      }

      currentRow++;
    }

    // I now sort the array again.
    this.rowCache.sort(
      (a, b) => {
        return a.row - b.row;
      });

    // update row data
    this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
  }



  /**
   * sets row height (used when using variable row height)
   * 
   */
  private setRowHeight(rowElement: any, rowNo: number): void {
    let rowHeightState: any = this.controller.getRowHeightState();
    rowElement.left.style.height = rowHeightState.rows[rowNo] + 'px';
    rowElement.main.style.height = rowHeightState.rows[rowNo] + 'px';
    rowElement.right.style.height = rowHeightState.rows[rowNo] + 'px';
    rowElement.group.style.height = rowHeightState.rows[rowNo] + 'px';
  }



  /**
   * Handles normal scrolling (used when using variable row height)
   * if varibale row state is set the override the "scrollNormal" method
   * 
   */
  private scrollNormalVariableRowHeight(newTopPosition: number, downScroll: boolean) {

    let rowHeightState: any = this.controller.getRowHeightState();


    for (let i = 0; i < this.cacheLength; i++) {

      let cache = this.rowCache[i];
      let top = this.rowCache[i].top;
      let currentRow = rowHeightState.top.indexOf(top);
      this.setRowHeight(this.rowCache[i], currentRow);
      let update = false;
      let newTop: number;

      if (!downScroll) {
        if (top > (newTopPosition + this.contentHeight)) {
          currentRow = currentRow - this.cacheLength;
          if (currentRow > -1) {
            update = true;
            newTop = rowHeightState.top[currentRow];
          }
        }
      } else {
          if (top < (newTopPosition - rowHeightState.rows[currentRow])) {
          update = true;
          newTop = rowHeightState.top[currentRow + this.cacheLength];
          currentRow = currentRow + this.cacheLength;
        }
      }

      if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
        this.setRowTopValueVariableRowHeight(cache, newTop);
        this.triggerRebindRowEvent(currentRow, cache, downScroll);
      }


    }

    // sort array
    this.rowCache.sort(
      (a, b) => {
        return a.row - b.row;
      });
  }



  /**
   * Handles scrollbars scrolling, or when setting top value by code (used when using variable row height)
   * if varibale row state is set the override the "scrollScrollBar" method
   * 
   */
  private scrollScrollBarVariableRowHeight(newTopPosition: number, downScroll: boolean) {

    if (this.collectionLength <= this.cacheLength) {
      newTopPosition = 0;
    }

    let rowHeightState: any = this.controller.getRowHeightState();
    let x = 1000;
    let currentRow = 0;
    let currentRowTop = 0;
    let firstRow = 0;
    let i = 0;
    let run = true;
    if (newTopPosition !== 0) {
      // need to do some looping here, need to figure out where we are..
      while (i < rowHeightState.top.length) {
        let checkValue = Math.abs(newTopPosition - (rowHeightState.top[i]));
        if  (checkValue === x)  {
            currentRow = i - 1;
            firstRow = i - 1;
            run = false;
          } else {
            if (checkValue < x) {
              currentRow = i - 1;
              firstRow = i - 1;
              x = checkValue;
            }
          }
        i++;
      }
    }



    // vars
    let bodyHeight = this.contentHeight;
    currentRowTop = rowHeightState.top[currentRow];

    let firstRowTop = currentRowTop * 1;
    let collectionLength = this.collectionLength;

    // for setting after
    let setAfter = (no: number) => {
      let row = this.rowCache[no];
      this.setRowHeight(row, currentRow);
      this.setRowTopValueVariableRowHeight(row, currentRowTop);
      row.row = currentRow;
      currentRowTop = currentRowTop + rowHeightState.rows[currentRow];
    };

    // for setting before (when hitting bottom)
    let setBefore = (no: number) => {
      let row = this.rowCache[no];
      this.setRowHeight(row, currentRow);
      firstRowTop = firstRowTop - rowHeightState.rows[currentRow];
      this.setRowTopValueVariableRowHeight(row, firstRowTop);
    };

    // for setting before (when hitting bottom)
    let setHiddenFromView = (no: number) => {
      let row = this.rowCache[no];
      this.setRowTopValueVariableRowHeight(row, -(currentRowTop + (rowHeightState.rows[currentRow] * 50)));
    };

    // loop row html cache
    for (let i = 0; i < this.cacheLength; i++) {
      let moved = false;
      switch (true) {
        case currentRow >= 0 && currentRow <= collectionLength - 1:
          setAfter(i);
          moved = true;
          break;
        case currentRow >= collectionLength && (rowHeightState.total) >= bodyHeight:
          setBefore(i);
          moved = true;
          break;
        default:
      }
      if (!moved) {
        if (currentRow >= collectionLength && (currentRowTop - rowHeightState.rows[currentRow]) >= bodyHeight) {
          setHiddenFromView(i);
        } else {
          // if this triggers the collection have been removed, so really just need to place out the rows
          if (currentRow >= collectionLength) {
            setHiddenFromView(i);
            //setAfter(i);
          }
        }
      }

      currentRow++;
    }

    // I now sort the array again.
    this.rowCache.sort(
      (a, b) => {
        return a.row - b.row;
      });

    // update row data
    this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
  }



  /**
   * Adds event listener from "avg-scroll"
   * This is usually called by the mainScrollEvents class
   * 
   */
  private addEventListener(): void {
    this.onScrollBinded = this.onScroll.bind(this);
    this.element.addEventListener('avg-scroll', this.onScrollBinded);
  }



  /**
   * Triggers event to rebind row
   * 
   */
  private triggerRebindRowEvent(curRow: number, curRowCache: RowCacheInterface, isDownScroll: boolean): void {
    let event = new CustomEvent('avg-rebind-row', {
      detail: {
        currentRow: curRow,
        rowCache: curRowCache,
        downScroll: isDownScroll
      },
      bubbles: false
    });
    this.element.dispatchEvent(event);
  }



  /**
   * Triggers event to rebind all rows
   * 
   */
  private triggerRebindAllRowsEvent(isDownScroll: boolean, curRowCache: RowCacheInterface[]): void {
    let event = new CustomEvent('avg-rebind-all-rows', {
      detail: {
        downScroll: isDownScroll,
        rowCache: curRowCache
      },
      bubbles: false
    });
    this.element.dispatchEvent(event);
  }

}
