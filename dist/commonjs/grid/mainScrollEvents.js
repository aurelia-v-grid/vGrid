"use strict";
var MainScrollEvents = (function () {
    function MainScrollEvents(element, htmlCache) {
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
    MainScrollEvents.prototype.init = function () {
        this.updateInternalHtmlCache();
        this.addScrollEvents("all");
    };
    MainScrollEvents.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left;
        this.main = this.htmlCache.avg_content_main;
        this.right = this.htmlCache.avg_content_right;
        this.mainHead = this.htmlCache.avg_header_main_scroll;
        this.vhandle = this.htmlCache.avg_content_vhandle;
        this.hhandle = this.htmlCache.avg_content_hhandle;
        this.group = this.htmlCache.avg_content_group;
    };
    MainScrollEvents.prototype.onWeel = function (event) {
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
    MainScrollEvents.prototype.addScrollEvents = function (type) {
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
    MainScrollEvents.prototype.removeScrollEvents = function (type) {
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
    MainScrollEvents.prototype.handleEventLeftScroll = function () {
        var _this = this;
        if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            return false;
        }
        requestAnimationFrame(function () {
            if (_this.timerLeft) {
                clearTimeout(_this.timerLeft);
                _this.removeScrollEvents("left");
            }
            requestAnimationFrame(function () {
                var newTopPosition = _this.left.scrollTop;
                _this.right.scrollTop = newTopPosition;
                _this.main.scrollTop = newTopPosition;
                _this.vhandle.scrollTop = newTopPosition;
                _this.group.scrollTop = newTopPosition;
                _this.checkScroll(newTopPosition);
                _this.timerLeft = setTimeout(function () {
                    _this.addScrollEvents("left");
                    _this.timerLeft = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventWheelScroll = function (newTopPosition) {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerWheel) {
                clearTimeout(_this.timerWheel);
                _this.removeScrollEvents("wheel");
            }
            requestAnimationFrame(function () {
                _this.main.scrollTop = _this.main.scrollTop + newTopPosition;
                _this.right.scrollTop = _this.right.scrollTop + newTopPosition;
                _this.left.scrollTop = _this.left.scrollTop + newTopPosition;
                _this.vhandle.scrollTop = _this.vhandle.scrollTop + newTopPosition;
                _this.group.scrollTop = _this.group.scrollTop + newTopPosition;
                _this.checkScroll(_this.main.scrollTop);
                _this.timerWheel = setTimeout(function () {
                    _this.addScrollEvents("wheel");
                    _this.timerWheel = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventMainScroll = function () {
        var _this = this;
        if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            this.main.scrollTop = 0;
            var newLeftPosition = this.main.scrollLeft;
            this.mainHead.style.left = -newLeftPosition + "px";
            return false;
        }
        requestAnimationFrame(function () {
            if (_this.timerMain) {
                clearTimeout(_this.timerMain);
                _this.removeScrollEvents("main");
            }
            requestAnimationFrame(function () {
                var newTopPosition = _this.main.scrollTop;
                _this.right.scrollTop = newTopPosition;
                _this.left.scrollTop = newTopPosition;
                _this.vhandle.scrollTop = newTopPosition;
                _this.group.scrollTop = newTopPosition;
                var newLeftPosition = _this.main.scrollLeft;
                _this.mainHead.style.left = -newLeftPosition + "px";
                _this.checkScroll(newTopPosition);
                _this.timerMain = setTimeout(function () {
                    _this.addScrollEvents("main");
                    _this.timerMain = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventRightScroll = function () {
        var _this = this;
        if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            return false;
        }
        requestAnimationFrame(function () {
            if (_this.timerRight) {
                clearTimeout(_this.timerRight);
                _this.removeScrollEvents("right");
            }
            requestAnimationFrame(function () {
                var newTopPosition = _this.right.scrollTop;
                _this.left.scrollTop = newTopPosition;
                _this.main.scrollTop = newTopPosition;
                _this.vhandle.scrollTop = newTopPosition;
                _this.group.scrollTop = newTopPosition;
                _this.checkScroll(newTopPosition);
                _this.timerRight = setTimeout(function () {
                    _this.addScrollEvents("right");
                    _this.timerRight = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventVhandle = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerVhandle) {
                clearTimeout(_this.timerVhandle);
                _this.removeScrollEvents("Vhandle");
            }
            requestAnimationFrame(function () {
                var newTopPosition = _this.vhandle.scrollTop;
                _this.right.scrollTop = newTopPosition;
                _this.main.scrollTop = newTopPosition;
                _this.left.scrollTop = newTopPosition;
                _this.group.scrollTop = newTopPosition;
                _this.checkScroll(newTopPosition);
                _this.timerVhandle = setTimeout(function () {
                    _this.addScrollEvents("Vhandle");
                    _this.timerVhandle = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventHhandle = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerHhandle) {
                clearTimeout(_this.timerHhandle);
                _this.removeScrollEvents("Hhandle");
            }
            requestAnimationFrame(function () {
                var newLeftPosition = _this.hhandle.scrollLeft;
                _this.main.scrollLeft = newLeftPosition;
                _this.mainHead.style.left = -newLeftPosition + "px";
                _this.timerHhandle = setTimeout(function () {
                    _this.addScrollEvents("Hhandle");
                    _this.timerHhandle = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.checkScroll = function (newTopPosition) {
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
    MainScrollEvents.prototype.triggerGridScrollEvent = function (isScrollBarScrolling, isDown, newTopPosition) {
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
exports.MainScrollEvents = MainScrollEvents;

//# sourceMappingURL=mainScrollEvents.js.map
