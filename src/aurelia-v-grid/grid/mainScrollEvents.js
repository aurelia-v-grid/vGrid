export class MainScrollEvents {

  constructor(element, htmlCache) {
    this.element = element;
    this.htmlCache = htmlCache;
    this.timerLeft = null;
    this.timerMain = null;
    this.timerRight = null;
    this.timerVhandle = null;
    this.timerHhandle = null;
    this.timerWheel = null;
    this.lastTopPosition = 0;
  }

  init() {

    this.updateInternalHtmlCache();
    this.addScrollEvents("all");

  }

  updateInternalHtmlCache() {

    this.left = this.htmlCache.avg_content_left;
    this.main = this.htmlCache.avg_content_main;
    this.right = this.htmlCache.avg_content_right;
    this.mainHead = this.htmlCache.avg_header_main_scroll;
    this.vhandle = this.htmlCache.avg_content_vhandle;
    this.hhandle = this.htmlCache.avg_content_hhandle;
    this.group = this.htmlCache.avg_content_group;
    this.scroll = this.htmlCache.avg_content_scroll

  }


  onWeel(event) {

    if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
      return false;
    }

    requestAnimationFrame(() => {
      //todo: do I bother to support IE11 for smooth scrolling with synced left/right/group?, if so I need to listen for onmousewheel and other event data...
      let deltaY = event.deltaY;
      if (event.deltaMode) {
        deltaY = deltaY * 40;
      }
      this.handleEventWheelScroll(deltaY);
    });
    event.preventDefault();
    return false;
  }


  addScrollEvents(type) {

    switch (type) {
      case "all":
        this.left.onscroll = this.handleEventLeftScroll.bind(this);
        this.main.onscroll = this.handleEventMainScroll.bind(this);
        this.right.onscroll = this.handleEventRightScroll.bind(this);
        this.right.onwheel = this.onWeel.bind(this);
        this.main.onwheel = this.onWeel.bind(this);
        this.left.onwheel = this.onWeel.bind(this);
        this.group.onwheel = this.onWeel.bind(this);
        this.vhandle.onscroll = this.handleEventVhandle.bind(this);
        this.hhandle.onscroll = this.handleEventHhandle.bind(this);
        break;
      case "left":
        this.main.onscroll = this.handleEventMainScroll.bind(this);
        this.right.onscroll = this.handleEventRightScroll.bind(this);
        this.vhandle.onscroll = this.handleEventVhandle.bind(this);
        break;
      case "main":
        this.left.onscroll = this.handleEventLeftScroll.bind(this);
        this.right.onscroll = this.handleEventRightScroll.bind(this);
        this.vhandle.onscroll = this.handleEventVhandle.bind(this);
        break;
      case "right":
        this.left.onscroll = this.handleEventLeftScroll.bind(this);
        this.main.onscroll = this.handleEventMainScroll.bind(this);
        this.vhandle.onscroll = this.handleEventVhandle.bind(this);
        break;
      case "Vhandle":
        this.left.onscroll = this.handleEventLeftScroll.bind(this);
        this.main.onscroll = this.handleEventMainScroll.bind(this);
        this.right.onscroll = this.handleEventRightScroll.bind(this);
        break;
      case "Hhandle":
        this.main.onscroll = this.handleEventMainScroll.bind(this);
        break;
      case "wheel":
        this.left.onscroll = this.handleEventLeftScroll.bind(this);
        this.main.onscroll = this.handleEventMainScroll.bind(this);
        this.right.onscroll = this.handleEventRightScroll.bind(this);
        this.vhandle.onscroll = this.handleEventVhandle.bind(this);
        break;

    }
  }

  removeScrollEvents(type) {
    switch (type) {
      case "all":
        this.left.onscroll = null;
        this.main.onscroll = null;
        this.right.onscroll = null;
        this.vhandle.onscroll = null;
        this.group.onscroll = null;
        break;
      case "left":
        this.main.onscroll = null;
        this.right.onscroll = null;
        this.vhandle.onscroll = null;
        this.group.onscroll = null;
        break;
      case "main":
        this.left.onscroll = null;
        this.right.onscroll = null;
        this.vhandle.onscroll = null;
        this.group.onscroll = null;
        break;
      case "right":
        this.left.onscroll = null;
        this.main.onscroll = null;
        this.vhandle.onscroll = null;
        this.group.onscroll = null;
        break;
      case "Vhandle":
        this.left.onscroll = null;
        this.main.onscroll = null;
        this.right.onscroll = null;
        this.group.onscroll = null;
        break;
      case "Hhandle":
        this.main.onscroll = null;
        break;
      case "wheel":
        this.left.onscroll = null;
        this.main.onscroll = null;
        this.right.onscroll = null;
        this.vhandle.onscroll = null;
        this.group.onscroll = null;
        break;
    }
  }


  handleEventLeftScroll() {

    if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
      return false;
    }

    requestAnimationFrame(() => {

      if (this.timerLeft) {
        clearTimeout(this.timerLeft);
        this.removeScrollEvents("left");
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.left.scrollTop;
        this.right.scrollTop = newTopPosition;
        this.main.scrollTop = newTopPosition;
        this.vhandle.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        this.checkScroll(newTopPosition);

        this.timerLeft = setTimeout(() => {
          this.addScrollEvents("left");
          this.timerLeft = null;
        }, 30)
      });
    });

  }

  handleEventWheelScroll(newTopPosition) {
    requestAnimationFrame(() => {
      if (this.timerWheel) {
        clearTimeout(this.timerWheel);
        this.removeScrollEvents("wheel");
      }
      requestAnimationFrame(() => {
        this.main.scrollTop = this.main.scrollTop + newTopPosition;
        this.right.scrollTop = this.right.scrollTop + newTopPosition;
        this.left.scrollTop = this.left.scrollTop + newTopPosition;
        this.vhandle.scrollTop = this.vhandle.scrollTop + newTopPosition;
        this.group.scrollTop = this.group.scrollTop + newTopPosition;

        this.checkScroll(this.main.scrollTop);

        this.timerWheel = setTimeout(() => {
          this.addScrollEvents("wheel");
          this.timerWheel = null;
        }, 30)

      });

    });
  }

  handleEventMainScroll() {

    if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
      this.main.scrollTop = 0;
      var newLeftPosition = this.main.scrollLeft;
      this.mainHead.style.left = -newLeftPosition + "px";
      return false;
    }

    requestAnimationFrame(() => {
      if (this.timerMain) {
        clearTimeout(this.timerMain);
        this.removeScrollEvents("main");
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.main.scrollTop;
        this.right.scrollTop = newTopPosition;
        this.left.scrollTop = newTopPosition;
        this.vhandle.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        var newLeftPosition = this.main.scrollLeft;
        this.mainHead.style.left = -newLeftPosition + "px";

        this.checkScroll(newTopPosition);

        this.timerMain = setTimeout(() => {
          this.addScrollEvents("main");
          this.timerMain = null;
        }, 30)
      });

    });

  }

  handleEventRightScroll() {

    if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
      return false;
    }

    requestAnimationFrame(() => {
      if (this.timerRight) {
        clearTimeout(this.timerRight);
        this.removeScrollEvents("right");
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.right.scrollTop;
        this.left.scrollTop = newTopPosition;
        this.main.scrollTop = newTopPosition;
        this.vhandle.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        this.checkScroll(newTopPosition);

        this.timerRight = setTimeout(() => {
          this.addScrollEvents("right");
          this.timerRight = null;
        }, 30)
      });

    });

  }


  handleEventVhandle() {


    requestAnimationFrame(() => {

      if (this.timerVhandle) {
        clearTimeout(this.timerVhandle);
        this.removeScrollEvents("Vhandle");
      }

      requestAnimationFrame(() => {
        let newTopPosition = this.vhandle.scrollTop;
        this.right.scrollTop = newTopPosition;
        this.main.scrollTop = newTopPosition;
        this.left.scrollTop = newTopPosition;
        this.group.scrollTop = newTopPosition;

        this.checkScroll(newTopPosition);

        this.timerVhandle = setTimeout(() => {
          this.addScrollEvents("Vhandle");
          this.timerVhandle = null;
        }, 30)
      });

    });

  }

  handleEventHhandle() {


    requestAnimationFrame(() => {

      if (this.timerHhandle) {
        clearTimeout(this.timerHhandle);
        this.removeScrollEvents("Hhandle");
      }

      requestAnimationFrame(() => {
        let newLeftPosition = this.hhandle.scrollLeft;
        this.main.scrollLeft = newLeftPosition;
        this.mainHead.style.left = -newLeftPosition + "px";

        //this.checkScroll(newTopPosition);
        this.timerHhandle = setTimeout(() => {
          this.addScrollEvents("Hhandle");
          this.timerHhandle = null;
        }, 30)

      });

    });


  }


  checkScroll(newTopPosition) {
    if (this.lastTopPosition !== newTopPosition) {

      //check is scroll bar scrolling
      let offset = Math.abs(this.lastTopPosition - newTopPosition);
      let isScrollBarScrolling = false;
      if (offset > 200) {
        isScrollBarScrolling = true;
      }

      //check is up or down
      let isDown = true;
      if (this.lastTopPosition > newTopPosition) {
        isDown = false;
      }

      //set last position
      this.lastTopPosition = newTopPosition;

      //trigger scroll
      this.triggerGridScrollEvent(isScrollBarScrolling, isDown, newTopPosition);
    }
  }


  triggerGridScrollEvent(isScrollBarScrolling, isDown, newTopPosition) {
    let event = new CustomEvent("avg-scroll", {
      detail: {
        isScrollBarScrolling: isScrollBarScrolling,
        isDown: isDown,
        newTopPosition: newTopPosition
      },
      bubbles: false
    });
    this.element.dispatchEvent(event);
  }


}
