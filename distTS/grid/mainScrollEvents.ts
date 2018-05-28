import { HtmlCache } from './htmlCache';
import { Controller } from './controller';

/**
 * This takes care of the scrolling part
 * It listen for mouse wheel, touch scroll and the extra scrollbars we attach to the grid
 * Is also makes sure the left/right and main is same scrollTop, so we dont get that laggy effect on slow browsers
 * It triggers event to update/bind data after its done
 *
 */
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
  private isScrollbar: boolean;
  private passiveSupported: boolean;
  private onWeelBinded: EventListenerObject;
  private handleEventVhandleBinded: EventListenerObject;
  private handleEventHhandleBinded: EventListenerObject;
  private touchMoveBinded: EventListenerObject;
  private touchStartBinded: EventListenerObject;
  private controller: Controller;


  constructor(element: Element, htmlCache: HtmlCache, controller: Controller) {
    this.element = element;
    this.htmlCache = htmlCache;
    this.timerLeft = null;
    this.timerMain = null;
    this.timerRight = null;
    this.timerVhandle = null;
    this.timerHhandle = null;
    this.timerWheel = null;
    this.isScrollbar = false;
    this.lastTopPosition = 0;
    this.wheelEvent = 'wheel';
    this.onWeelBinded = this.onWeel.bind(this);
    this.handleEventVhandleBinded = this.handleEventVhandle.bind(this);
    this.handleEventHhandleBinded = this.handleEventHhandle.bind(this);
    this.touchMoveBinded = this.touchMove.bind(this);
    this.touchStartBinded = this.touchStart.bind(this);
    this.controller = controller;

    // check if IE, need to act on another mousewheel event if so
    this.isIE11 = !!(window as any).MSInputMethodContext && !!(document as any).documentMode;
    if (this.isIE11) {
      this.wheelEvent = 'mousewheel';
      console.warn('IE11, why!?!?!');
    }

    // check if is supported
    this.passiveSupported = false;
  }


  /**
   * Called when grid is created to set defaults, add event listners
   *
   */
  public init(): void {
    this.updateInternalHtmlCache();
    try {
      let options = Object.defineProperty({}, 'passive', {
        get: () => {
          this.passiveSupported = this.controller.attSkipPassive ? false : true;
        }
      });

      window.addEventListener('testavg', null, options);
    } catch (err) { /*nothing*/ }
    this.addScrollEvents('all');
  }



  /**
   * just adds the html elements to class
   *
   */
  private updateInternalHtmlCache(): void {

    this.left = this.htmlCache.avg_content_left;
    this.main = this.htmlCache.avg_content_main;
    this.right = this.htmlCache.avg_content_right;
    this.mainHead = this.htmlCache.avg_header_main_scroll;
    this.vhandle = this.htmlCache.avg_content_vhandle;
    this.hhandle = this.htmlCache.avg_content_hhandle;
    this.group = this.htmlCache.avg_content_group;
  }


  /**
   * called by mouse wheel event listener
   *
   */
  private onWeel(event: MouseWheelEvent): boolean {
    /* console.log("test") */
    if (this.controller.attSkipPassive) {
      event.preventDefault();
    }


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
    // event.preventDefault();
    return false;
  }



  /**
   * Adds scroll events touch, mousewheel and scrolling on vertical scrollbar and horisontal scrollbar
   * we dont use automatic scrollstate browsers can have a overflow y wtc, since it will look horrible on slow browsers
   *
   */
  private addScrollEvents(type: string): void {

    let options: any = this.passiveSupported ? { passive: true } : false;

    switch (type) {

      case 'all':
        this.right.addEventListener(this.wheelEvent, this.onWeelBinded, options);
        this.main.addEventListener(this.wheelEvent, this.onWeelBinded, options);
        this.left.addEventListener(this.wheelEvent, this.onWeelBinded, options);
        this.group.addEventListener(this.wheelEvent, this.onWeelBinded, options);
        this.vhandle.addEventListener('scroll', this.handleEventVhandleBinded, options);
        this.hhandle.addEventListener('scroll', this.handleEventHhandleBinded, options);
        this.htmlCache.element.addEventListener('touchmove', this.touchMoveBinded, options);
        this.htmlCache.element.addEventListener('touchstart', this.touchStartBinded, options);
        break;
      case 'wheel':
        this.vhandle.addEventListener('scroll', this.handleEventVhandleBinded, options);
        break;
      default:
    }

  }


  /**
   * removed the scroll event
   * was more before, main reason this was here, but didnt work well on old browsers
   *
   */
  private removeScrollEvents(type: string): void {
    switch (type) {
      case 'all':
        this.vhandle.removeEventListener('onscroll', this.handleEventVhandleBinded);
        break;
      case 'wheel':
        this.vhandle.removeEventListener('onscroll', this.handleEventVhandleBinded);
        break;
      default:
    }
  }



  /**
   * called by touchStart event listener
   *
   */
  private touchStart(e: any) {
    let touchobj = e.changedTouches[0];
    this.touchY = parseInt(touchobj.clientY, 10);
    this.touchX = parseInt(touchobj.clientX, 10);
  }



  /**
   * called by touchMove event listener
   *
   */
  private touchMove(e: any) {
    if (this.controller.attSkipPassive) {
      event.preventDefault();
    }
    let touchobj = e.changedTouches[0];
    let dist = this.touchY - parseInt(touchobj.clientY, 10);
    let distX = parseInt(touchobj.clientX, 10) - this.touchX;
    this.touchY = parseInt(touchobj.clientY, 10);
    this.touchX = parseInt(touchobj.clientX, 10);
    this.handleEventWheelScroll(dist, -distX);
  }



  /**
   * called by scrollwheel event listener function, the does the actual updating of scrolltop
   *
   */
  private handleEventWheelScroll(newTopPosition: number, left?: number): void {
    requestAnimationFrame(() => {
      if (this.timerWheel) {
        clearTimeout(this.timerWheel);
        this.removeScrollEvents('wheel');
      }
      requestAnimationFrame(() => {
        this.vhandle.scrollTop = this.vhandle.scrollTop + newTopPosition;
        this.main.scrollTop = this.vhandle.scrollTop;
        this.right.scrollTop = this.vhandle.scrollTop;
        this.left.scrollTop = this.vhandle.scrollTop;
        this.group.scrollTop = this.vhandle.scrollTop;
        if (left !== undefined) {
          this.main.scrollLeft = this.main.scrollLeft + left;
          (this.mainHead as HTMLElement).style.left = - this.main.scrollLeft + 'px';
        }
        this.isScrollbar = false;
        this.checkScroll(this.main.scrollTop);
        this.timerWheel = setTimeout(() => {
          this.addScrollEvents('wheel');
          this.timerWheel = null;
        }, 30);

      });

    });
  }



  /**
   * called when vertical scrollabrs is dragged
   *
   */
  private handleEventVhandle(): void {

    requestAnimationFrame(() => {

      if (this.timerVhandle) {
        clearTimeout(this.timerVhandle);
        this.removeScrollEvents('Vhandle');
      }

      // needed this else chrome had weird effect when dragging fast past bottom of a scrollbars
      requestAnimationFrame(() => {
        let newTopPosition = this.vhandle.scrollTop;
        this.right.scrollTop = newTopPosition;
        this.main.scrollTop = newTopPosition;
        this.left.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;
        this.isScrollbar = true;
        this.checkScroll(newTopPosition);

        this.timerVhandle = setTimeout(() => {
          this.addScrollEvents('Vhandle');
          this.timerVhandle = null;
        }, 30);
      });

    });

  }


  /**
   * called when horisontal scrollabrs is dragged
   *
   */
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



  /**
   * check the scrolling and triggers updating of row top values
   *
   */
  private checkScroll(newTopPosition: number): void {
    if (this.lastTopPosition !== newTopPosition) {

      // check is up or down
      let isDown = true;
      if (this.lastTopPosition > newTopPosition) {
        isDown = false;
      }

      // set last position
      this.lastTopPosition = newTopPosition;

      // trigger scroll
      this.triggerGridScrollEvent(this.isScrollbar, isDown, newTopPosition);
    }
  }



  /**
   * trigger event called after checking type of scroll
   *
   */
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
