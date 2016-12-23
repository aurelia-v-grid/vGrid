import { HtmlCache } from './htmlCache';

export class MainScrollEvents {
  private element: Element;
  private timerLeft: any;
  private timerMain: any;
  private timerRight: any;
  private timerVhandle: any;
  private timerWheel: any;
  private timerHhandle: any;
  private lastTopPosition: number;
  private htmlCache: HtmlCache;
  private left: Element;
  private main: Element;
  private right: Element;
  private mainHead: Element;
  private vhandle: Element;
  private hhandle: Element;
  private group: Element;
  private touchY: number;
  private touchX: number;
  private isIE11: boolean;
  private wheelEvent: string;

  constructor(element: Element, htmlCache: HtmlCache) {
    this.element = element;
    this.htmlCache = htmlCache;
    this.timerLeft = null;
    this.timerMain = null;
    this.timerRight = null;
    this.timerVhandle = null;
    this.timerHhandle = null;
    this.timerWheel = null;
    this.lastTopPosition = 0;
    this.wheelEvent = 'onwheel';
    this.isIE11 = !!(window as any).MSInputMethodContext && !!(document as any).documentMode;
    if (this.isIE11) {
      this.wheelEvent = 'onmousewheel';
      console.warn('IE11, why!?!?!');
    }
  }

  public init(): void {
    this.updateInternalHtmlCache();
    this.addScrollEvents('all');
  }

  private updateInternalHtmlCache(): void {

    this.left = this.htmlCache.avg_content_left;
    this.main = this.htmlCache.avg_content_main;
    this.right = this.htmlCache.avg_content_right;
    this.mainHead = this.htmlCache.avg_header_main_scroll;
    this.vhandle = this.htmlCache.avg_content_vhandle;
    this.hhandle = this.htmlCache.avg_content_hhandle;
    this.group = this.htmlCache.avg_content_group;
  }

  private onWeel(event: MouseWheelEvent): boolean {

    if (this.vhandle.scrollHeight === (this.vhandle.parentNode as HTMLElement).clientHeight) {
      return false;
    }

    requestAnimationFrame(() => {
      let deltaY = event.deltaY;
      if (event.deltaMode) {
        deltaY = deltaY * 40;
      }
      if (!event.deltaY && !event.deltaMode) {
        if (event.wheelDelta < 0) {
          deltaY = 100;
        } else {
          deltaY = -100;
        }
      }

      this.handleEventWheelScroll(deltaY);
    });
    event.preventDefault();
    return false;
  }

  private addScrollEvents(type: string): void {

    switch (type) {
      case 'all':
        (this.right as HTMLElement)[this.wheelEvent] = this.onWeel.bind(this);
        (this.main as HTMLElement)[this.wheelEvent] = this.onWeel.bind(this);
        (this.left as HTMLElement)[this.wheelEvent] = this.onWeel.bind(this);
        (this.group as HTMLElement)[this.wheelEvent] = this.onWeel.bind(this);
        (this.vhandle as HTMLElement).onscroll = this.handleEventVhandle.bind(this);
        (this.hhandle as HTMLElement).onscroll = this.handleEventHhandle.bind(this);
        this.htmlCache.element.addEventListener('touchmove', this.touchMove.bind(this));
        this.htmlCache.element.addEventListener('touchstart', this.touchStart.bind(this));
        break;
      case 'wheel':
        (this.vhandle as HTMLElement).onscroll = this.handleEventVhandle.bind(this);
        break;
      default:
    }

  }

  private removeScrollEvents(type: string): void {
    switch (type) {
      case 'all':
        (this.vhandle as HTMLElement).onscroll = null;
        break;
      case 'wheel':
        (this.vhandle as HTMLElement).onscroll = null;
        break;
      default:
    }
  }

  private touchStart(e: any) {
    let touchobj = e.changedTouches[0];
    this.touchY = parseInt(touchobj.clientY, 10);
    this.touchX = parseInt(touchobj.clientX, 10);
    e.preventDefault();
  }

  private touchMove(e: any) {
    let touchobj = e.changedTouches[0];
    let dist = parseInt(touchobj.clientY, 10) - this.touchY;
    let distX = parseInt(touchobj.clientX, 10) - this.touchX;
    this.handleEventWheelScroll(-dist, -distX);
    e.preventDefault();
  }

  private handleEventWheelScroll(newTopPosition: number, left?: number): void {
    requestAnimationFrame(() => {
      if (this.timerWheel) {
        clearTimeout(this.timerWheel);
        this.removeScrollEvents('wheel');
      }
      requestAnimationFrame(() => {
        this.main.scrollTop = this.main.scrollTop + newTopPosition;
        this.right.scrollTop = this.right.scrollTop + newTopPosition;
        this.left.scrollTop = this.left.scrollTop + newTopPosition;
        this.vhandle.scrollTop = this.vhandle.scrollTop + newTopPosition;
        this.group.scrollTop = this.group.scrollTop + newTopPosition;
        if (left !== undefined) {
          this.main.scrollLeft = this.main.scrollLeft + left;
          (this.mainHead as HTMLElement).style.left = - this.main.scrollLeft + 'px';
        }
        this.checkScroll(this.main.scrollTop);

        this.timerWheel = setTimeout(() => {
          this.addScrollEvents('wheel');
          this.timerWheel = null;
        }, 30);

      });

    });
  }

  private handleEventVhandle(): void {

    requestAnimationFrame(() => {

      if (this.timerVhandle) {
        clearTimeout(this.timerVhandle);
        this.removeScrollEvents('Vhandle');
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.vhandle.scrollTop;
        this.right.scrollTop = newTopPosition;
        this.main.scrollTop = newTopPosition;
        this.left.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        this.checkScroll(newTopPosition);

        this.timerVhandle = setTimeout(() => {
          this.addScrollEvents('Vhandle');
          this.timerVhandle = null;
        }, 30);
      });

    });

  }

  private handleEventHhandle(): void {

    requestAnimationFrame(() => {

      if (this.timerHhandle) {
        clearTimeout(this.timerHhandle);
        this.removeScrollEvents('Hhandle');
      }

      requestAnimationFrame(() => {
        let newLeftPosition = this.hhandle.scrollLeft;
        this.main.scrollLeft = newLeftPosition;
        (this.mainHead as HTMLElement).style.left = -newLeftPosition + 'px';

        // this.checkScroll(newTopPosition);
        this.timerHhandle = setTimeout(() => {
          this.addScrollEvents('Hhandle');
          this.timerHhandle = null;
        }, 30);

      });

    });

  }

  private checkScroll(newTopPosition: number): void {
    if (this.lastTopPosition !== newTopPosition) {

      // check is scroll bar scrolling
      let offset = Math.abs(this.lastTopPosition - newTopPosition);
      let isScrollBarScrolling = false;
      if (offset > 200) {
        isScrollBarScrolling = true;
      }

      // check is up or down
      let isDown = true;
      if (this.lastTopPosition > newTopPosition) {
        isDown = false;
      }

      // set last position
      this.lastTopPosition = newTopPosition;

      // trigger scroll
      this.triggerGridScrollEvent(isScrollBarScrolling, isDown, newTopPosition);
    }
  }

  private triggerGridScrollEvent(
    scrollbarScrolling: boolean,
    down: boolean,
    topPosition: number): void {

    let event = new CustomEvent('avg-scroll', {
      detail: {
        isScrollBarScrolling: scrollbarScrolling,
        isDown: down,
        newTopPosition: topPosition
      },
      bubbles: false
    });
    this.element.dispatchEvent(event);
  }

}
