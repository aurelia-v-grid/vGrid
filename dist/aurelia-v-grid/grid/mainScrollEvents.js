"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var MainScrollEvents;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("MainScrollEvents", MainScrollEvents = function () {
        function MainScrollEvents(element, htmlCache) {
          _classCallCheck(this, MainScrollEvents);

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

        MainScrollEvents.prototype.init = function init() {

          this.updateInternalHtmlCache();
          this.addScrollEvents("all");
        };

        MainScrollEvents.prototype.updateInternalHtmlCache = function updateInternalHtmlCache() {

          this.left = this.htmlCache.avg_content_left;
          this.main = this.htmlCache.avg_content_main;
          this.right = this.htmlCache.avg_content_right;
          this.mainHead = this.htmlCache.avg_header_main_scroll;
          this.vhandle = this.htmlCache.avg_content_vhandle;
          this.hhandle = this.htmlCache.avg_content_hhandle;
          this.group = this.htmlCache.avg_content_group;
          this.scroll = this.htmlCache.avg_content_scroll;
        };

        MainScrollEvents.prototype.onWeel = function onWeel(event) {
          var _this = this;

          if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            return false;
          }

          requestAnimationFrame(function () {
            var deltaY = event.deltaY;
            if (event.deltaMode) {
              deltaY = deltaY * 40;
            }
            _this.handleEventWheelScroll(deltaY);
          });
          event.preventDefault();
          return false;
        };

        MainScrollEvents.prototype.addScrollEvents = function addScrollEvents(type) {

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
        };

        MainScrollEvents.prototype.removeScrollEvents = function removeScrollEvents(type) {
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
        };

        MainScrollEvents.prototype.handleEventLeftScroll = function handleEventLeftScroll() {
          var _this2 = this;

          if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            return false;
          }

          requestAnimationFrame(function () {

            if (_this2.timerLeft) {
              clearTimeout(_this2.timerLeft);
              _this2.removeScrollEvents("left");
            }

            requestAnimationFrame(function () {
              var newTopPosition = _this2.left.scrollTop;
              _this2.right.scrollTop = newTopPosition;
              _this2.main.scrollTop = newTopPosition;
              _this2.vhandle.scrollTop = newTopPosition;
              _this2.group.scrollTop = newTopPosition;

              _this2.checkScroll(newTopPosition);

              _this2.timerLeft = setTimeout(function () {
                _this2.addScrollEvents("left");
                _this2.timerLeft = null;
              }, 30);
            });
          });
        };

        MainScrollEvents.prototype.handleEventWheelScroll = function handleEventWheelScroll(newTopPosition) {
          var _this3 = this;

          requestAnimationFrame(function () {
            if (_this3.timerWheel) {
              clearTimeout(_this3.timerWheel);
              _this3.removeScrollEvents("wheel");
            }
            requestAnimationFrame(function () {
              _this3.main.scrollTop = _this3.main.scrollTop + newTopPosition;
              _this3.right.scrollTop = _this3.right.scrollTop + newTopPosition;
              _this3.left.scrollTop = _this3.left.scrollTop + newTopPosition;
              _this3.vhandle.scrollTop = _this3.vhandle.scrollTop + newTopPosition;
              _this3.group.scrollTop = _this3.group.scrollTop + newTopPosition;

              _this3.checkScroll(_this3.main.scrollTop);

              _this3.timerWheel = setTimeout(function () {
                _this3.addScrollEvents("wheel");
                _this3.timerWheel = null;
              }, 30);
            });
          });
        };

        MainScrollEvents.prototype.handleEventMainScroll = function handleEventMainScroll() {
          var _this4 = this;

          if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            this.main.scrollTop = 0;
            var newLeftPosition = this.main.scrollLeft;
            this.mainHead.style.left = -newLeftPosition + "px";
            return false;
          }

          requestAnimationFrame(function () {
            if (_this4.timerMain) {
              clearTimeout(_this4.timerMain);
              _this4.removeScrollEvents("main");
            }

            requestAnimationFrame(function () {
              var newTopPosition = _this4.main.scrollTop;
              _this4.right.scrollTop = newTopPosition;
              _this4.left.scrollTop = newTopPosition;
              _this4.vhandle.scrollTop = newTopPosition;
              _this4.group.scrollTop = newTopPosition;

              var newLeftPosition = _this4.main.scrollLeft;
              _this4.mainHead.style.left = -newLeftPosition + "px";

              _this4.checkScroll(newTopPosition);

              _this4.timerMain = setTimeout(function () {
                _this4.addScrollEvents("main");
                _this4.timerMain = null;
              }, 30);
            });
          });
        };

        MainScrollEvents.prototype.handleEventRightScroll = function handleEventRightScroll() {
          var _this5 = this;

          if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            return false;
          }

          requestAnimationFrame(function () {
            if (_this5.timerRight) {
              clearTimeout(_this5.timerRight);
              _this5.removeScrollEvents("right");
            }

            requestAnimationFrame(function () {
              var newTopPosition = _this5.right.scrollTop;
              _this5.left.scrollTop = newTopPosition;
              _this5.main.scrollTop = newTopPosition;
              _this5.vhandle.scrollTop = newTopPosition;
              _this5.group.scrollTop = newTopPosition;

              _this5.checkScroll(newTopPosition);

              _this5.timerRight = setTimeout(function () {
                _this5.addScrollEvents("right");
                _this5.timerRight = null;
              }, 30);
            });
          });
        };

        MainScrollEvents.prototype.handleEventVhandle = function handleEventVhandle() {
          var _this6 = this;

          requestAnimationFrame(function () {

            if (_this6.timerVhandle) {
              clearTimeout(_this6.timerVhandle);
              _this6.removeScrollEvents("Vhandle");
            }

            requestAnimationFrame(function () {
              var newTopPosition = _this6.vhandle.scrollTop;
              _this6.right.scrollTop = newTopPosition;
              _this6.main.scrollTop = newTopPosition;
              _this6.left.scrollTop = newTopPosition;
              _this6.group.scrollTop = newTopPosition;

              _this6.checkScroll(newTopPosition);

              _this6.timerVhandle = setTimeout(function () {
                _this6.addScrollEvents("Vhandle");
                _this6.timerVhandle = null;
              }, 30);
            });
          });
        };

        MainScrollEvents.prototype.handleEventHhandle = function handleEventHhandle() {
          var _this7 = this;

          requestAnimationFrame(function () {

            if (_this7.timerHhandle) {
              clearTimeout(_this7.timerHhandle);
              _this7.removeScrollEvents("Hhandle");
            }

            requestAnimationFrame(function () {
              var newLeftPosition = _this7.hhandle.scrollLeft;
              _this7.main.scrollLeft = newLeftPosition;
              _this7.mainHead.style.left = -newLeftPosition + "px";

              _this7.timerHhandle = setTimeout(function () {
                _this7.addScrollEvents("Hhandle");
                _this7.timerHhandle = null;
              }, 30);
            });
          });
        };

        MainScrollEvents.prototype.checkScroll = function checkScroll(newTopPosition) {
          if (this.lastTopPosition !== newTopPosition) {
            var offset = Math.abs(this.lastTopPosition - newTopPosition);
            var isScrollBarScrolling = false;
            if (offset > 200) {
              isScrollBarScrolling = true;
            }

            var isDown = true;
            if (this.lastTopPosition > newTopPosition) {
              isDown = false;
            }

            this.lastTopPosition = newTopPosition;

            this.triggerGridScrollEvent(isScrollBarScrolling, isDown, newTopPosition);
          }
        };

        MainScrollEvents.prototype.triggerGridScrollEvent = function triggerGridScrollEvent(isScrollBarScrolling, isDown, newTopPosition) {
          var event = new CustomEvent("avg-scroll", {
            detail: {
              isScrollBarScrolling: isScrollBarScrolling,
              isDown: isDown,
              newTopPosition: newTopPosition
            },
            bubbles: false
          });
          this.element.dispatchEvent(event);
        };

        return MainScrollEvents;
      }());

      _export("MainScrollEvents", MainScrollEvents);
    }
  };
});
//# sourceMappingURL=mainScrollEvents.js.map
