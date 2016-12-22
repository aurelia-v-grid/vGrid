import {HtmlCache, RowCache} from '../interfaces';

export class RowScrollEvents {
  private htmlCache: HtmlCache;
  private element: Element;
  private timer: any;
  private largeScroll: boolean;
  private collectionLength: number;
  private largeScrollUpdateDelay: number;
  private rowCache: RowCache[];
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

  constructor(element: Element, htmlCache: HtmlCache) {
    this.htmlCache = htmlCache;
    this.element = element;
    this.timer = null;
    this.largeScroll = false;
    this.collectionLength = 0;
    this.largeScrollUpdateDelay = 0;
  }

  public init(rowHeight: number, attDataDelay: number): void {
    this.rowCache = this.htmlCache.rowCache;
    this.largeScrollUpdateDelay = attDataDelay;
    this.rowHeight = rowHeight;
    this.updateInternalHtmlCache();
    this.createRowCache();
    this.addEventListener();
  }

  public setCollectionLength(length: number): void {
    this.collectionLength = length;
  }

  private createRowCache(): void {
    for (let i = 0; i < this.cacheLength; i++) {
      this.rowCache.push(({
        left: this.leftRows[i],
        main: this.mainRows[i],
        right: this.rightRows[i],
        group: this.groupRows[i],
        top: this.rowHeight * i,
        row: i
      } as RowCache));
    }
  }

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

  get contentHeight(): number {
    return (this.htmlCache.avg_content_main as HTMLElement).offsetHeight;
  }

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

  private setRowTopValue(cache: RowCache, top: number) {
    cache.left.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.main.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.right.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.group.style.transform = `translate3d(0px,${top}px, 0px)`;
    cache.top = top;
    cache.row = Math.floor(top / this.rowHeight);
  }

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
        return a.top - b.top;
      });
  }

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
            setAfter(i);
          }
        }
      }

      currentRow++;
    }

    // I now sort the array again.
    this.rowCache.sort(
      (a, b) => {
        return a.top - b.top;
      });

    // update row data
    this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
  }

  private addEventListener(): void {
    this.onScrollBinded = this.onScroll.bind(this);
    this.element.addEventListener('avg-scroll', this.onScrollBinded);
  }

  private triggerRebindRowEvent(curRow: number, curRowCache: RowCache, isDownScroll: boolean): void {
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

  private triggerRebindAllRowsEvent(isDownScroll: boolean, curRowCache: RowCache[]): void {
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
