System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var MainScrollEvents;
    return {
        setters: [],
        execute: function () {
            MainScrollEvents = (function () {
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
                    this.wheelEvent = 'onwheel';
                    this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
                    if (this.isIE11) {
                        this.wheelEvent = 'onmousewheel';
                        console.warn('IE11, why!?!?!');
                    }
                }
                MainScrollEvents.prototype.init = function () {
                    this.updateInternalHtmlCache();
                    this.addScrollEvents('all');
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
                        if (!event.deltaY && !event.deltaMode) {
                            if (event.wheelDelta < 0) {
                                deltaY = 100;
                            }
                            else {
                                deltaY = -100;
                            }
                        }
                        _this.handleEventWheelScroll(deltaY);
                    });
                    event.preventDefault();
                    return false;
                };
                MainScrollEvents.prototype.addScrollEvents = function (type) {
                    switch (type) {
                        case 'all':
                            this.right[this.wheelEvent] = this.onWeel.bind(this);
                            this.main[this.wheelEvent] = this.onWeel.bind(this);
                            this.left[this.wheelEvent] = this.onWeel.bind(this);
                            this.group[this.wheelEvent] = this.onWeel.bind(this);
                            this.vhandle.onscroll = this.handleEventVhandle.bind(this);
                            this.hhandle.onscroll = this.handleEventHhandle.bind(this);
                            this.htmlCache.element.addEventListener('touchmove', this.touchMove.bind(this));
                            this.htmlCache.element.addEventListener('touchstart', this.touchStart.bind(this));
                            break;
                        case 'wheel':
                            this.vhandle.onscroll = this.handleEventVhandle.bind(this);
                            break;
                        default:
                    }
                };
                MainScrollEvents.prototype.removeScrollEvents = function (type) {
                    switch (type) {
                        case 'all':
                            this.vhandle.onscroll = null;
                            break;
                        case 'wheel':
                            this.vhandle.onscroll = null;
                            break;
                        default:
                    }
                };
                MainScrollEvents.prototype.touchStart = function (e) {
                    var touchobj = e.changedTouches[0];
                    this.touchY = parseInt(touchobj.clientY, 10);
                    this.touchX = parseInt(touchobj.clientX, 10);
                    e.preventDefault();
                };
                MainScrollEvents.prototype.touchMove = function (e) {
                    var touchobj = e.changedTouches[0];
                    var dist = parseInt(touchobj.clientY, 10) - this.touchY;
                    var distX = parseInt(touchobj.clientX, 10) - this.touchX;
                    this.handleEventWheelScroll(-dist, -distX);
                    e.preventDefault();
                };
                MainScrollEvents.prototype.handleEventWheelScroll = function (newTopPosition, left) {
                    var _this = this;
                    requestAnimationFrame(function () {
                        if (_this.timerWheel) {
                            clearTimeout(_this.timerWheel);
                            _this.removeScrollEvents('wheel');
                        }
                        requestAnimationFrame(function () {
                            _this.main.scrollTop = _this.main.scrollTop + newTopPosition;
                            _this.right.scrollTop = _this.right.scrollTop + newTopPosition;
                            _this.left.scrollTop = _this.left.scrollTop + newTopPosition;
                            _this.vhandle.scrollTop = _this.vhandle.scrollTop + newTopPosition;
                            _this.group.scrollTop = _this.group.scrollTop + newTopPosition;
                            if (left !== undefined) {
                                _this.main.scrollLeft = _this.main.scrollLeft + left;
                                _this.mainHead.style.left = -_this.main.scrollLeft + 'px';
                            }
                            _this.checkScroll(_this.main.scrollTop);
                            _this.timerWheel = setTimeout(function () {
                                _this.addScrollEvents('wheel');
                                _this.timerWheel = null;
                            }, 30);
                        });
                    });
                };
                MainScrollEvents.prototype.handleEventVhandle = function () {
                    var _this = this;
                    requestAnimationFrame(function () {
                        if (_this.timerVhandle) {
                            clearTimeout(_this.timerVhandle);
                            _this.removeScrollEvents('Vhandle');
                        }
                        requestAnimationFrame(function () {
                            var newTopPosition = _this.vhandle.scrollTop;
                            _this.right.scrollTop = newTopPosition;
                            _this.main.scrollTop = newTopPosition;
                            _this.left.scrollTop = newTopPosition;
                            _this.group.scrollTop = newTopPosition;
                            _this.checkScroll(newTopPosition);
                            _this.timerVhandle = setTimeout(function () {
                                _this.addScrollEvents('Vhandle');
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
                            _this.removeScrollEvents('Hhandle');
                        }
                        requestAnimationFrame(function () {
                            var newLeftPosition = _this.hhandle.scrollLeft;
                            _this.main.scrollLeft = newLeftPosition;
                            _this.mainHead.style.left = -newLeftPosition + 'px';
                            _this.timerHhandle = setTimeout(function () {
                                _this.addScrollEvents('Hhandle');
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
                MainScrollEvents.prototype.triggerGridScrollEvent = function (scrollbarScrolling, down, topPosition) {
                    var event = new CustomEvent('avg-scroll', {
                        detail: {
                            isScrollBarScrolling: scrollbarScrolling,
                            isDown: down,
                            newTopPosition: topPosition
                        },
                        bubbles: false
                    });
                    this.element.dispatchEvent(event);
                };
                return MainScrollEvents;
            }());
            exports_1("MainScrollEvents", MainScrollEvents);
        }
    };
});

//# sourceMappingURL=mainScrollEvents.js.map
