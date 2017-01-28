var RowScrollEvents = (function () {
    function RowScrollEvents(element, htmlCache, controller) {
        this.htmlCache = htmlCache;
        this.element = element;
        this.controller = controller;
        this.timer = null;
        this.largeScroll = false;
        this.collectionLength = 0;
        this.largeScrollUpdateDelay = 0;
    }
    RowScrollEvents.prototype.init = function (rowHeight, attDataDelay, attVariableRowHeight) {
        this.rowCache = this.htmlCache.rowCache;
        this.largeScrollUpdateDelay = attDataDelay;
        this.rowHeight = rowHeight;
        this.updateInternalHtmlCache();
        this.createRowCache();
        if (attVariableRowHeight) {
            this.scrollNormal = this.scrollNormalVariableRowHeight.bind(this);
            this.scrollScrollBar = this.scrollScrollBarVariableRowHeight.bind(this);
        }
        this.addEventListener();
    };
    RowScrollEvents.prototype.setCollectionLength = function (length) {
        this.collectionLength = length;
    };
    RowScrollEvents.prototype.createRowCache = function () {
        for (var i = 0; i < this.cacheLength; i++) {
            this.rowCache.push({
                left: this.leftRows[i],
                main: this.mainRows[i],
                right: this.rightRows[i],
                group: this.groupRows[i],
                top: this.rowHeight * i,
                row: i
            });
        }
    };
    RowScrollEvents.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left_scroll;
        this.main = this.htmlCache.avg_content_main_scroll;
        this.right = this.htmlCache.avg_content_right_scroll;
        this.scroller = this.htmlCache.avg_content_right_scroll;
        this.leftRows = this.htmlCache.avg_left_rows;
        this.mainRows = this.htmlCache.avg_main_rows;
        this.rightRows = this.htmlCache.avg_right_rows;
        this.groupRows = this.htmlCache.avg_group_rows;
        this.cacheLength = this.leftRows.length;
    };
    Object.defineProperty(RowScrollEvents.prototype, "contentHeight", {
        get: function () {
            return this.htmlCache.avg_content_main.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    RowScrollEvents.prototype.onScroll = function (event) {
        var _this = this;
        var isDown = event.detail.isDown;
        var isScrollBarScrolling = event.detail.isScrollBarScrolling;
        var newTopPosition = event.detail.newTopPosition;
        if (this.largeScroll || isScrollBarScrolling) {
            if (this.largeScrollUpdateDelay) {
                clearTimeout(this.timer);
                this.largeScroll = true;
                this.timer = setTimeout(function () {
                    _this.largeScroll = false;
                    _this.scrollScrollBar(newTopPosition, isDown);
                }, this.largeScrollUpdateDelay);
            }
            else {
                this.scrollScrollBar(newTopPosition, isDown);
            }
        }
        else {
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
    };
    RowScrollEvents.prototype.setRowTopValue = function (cache, top) {
        cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.top = top;
        cache.row = Math.floor(top / this.rowHeight);
    };
    RowScrollEvents.prototype.setRowTopValueVariableRowHeight = function (cache, top) {
        cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.top = top;
        var rowHeightState = this.controller.getRowHeightState();
        cache.row = rowHeightState.top.indexOf(top);
    };
    RowScrollEvents.prototype.scrollNormal = function (newTopPosition, downScroll) {
        var rowHeight = this.rowHeight;
        var currentRow = Math.floor(newTopPosition / rowHeight);
        var cacheHeight = rowHeight * this.cacheLength;
        for (var i = 0; i < this.cacheLength; i++) {
            var cache = this.rowCache[i];
            var top_1 = this.rowCache[i].top;
            var update = false;
            var newTop = void 0;
            if (!downScroll) {
                if (top_1 > (newTopPosition + this.contentHeight)) {
                    update = true;
                    newTop = top_1 - cacheHeight;
                    currentRow = (top_1 - cacheHeight) / rowHeight;
                }
            }
            else {
                if (top_1 < (newTopPosition - rowHeight)) {
                    update = true;
                    newTop = top_1 + cacheHeight;
                    currentRow = (top_1 + cacheHeight) / rowHeight;
                }
            }
            if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
                this.setRowTopValue(cache, newTop);
                this.triggerRebindRowEvent(currentRow, cache, downScroll);
            }
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
    };
    RowScrollEvents.prototype.scrollScrollBar = function (newTopPosition, downScroll) {
        var _this = this;
        if (this.collectionLength <= this.cacheLength) {
            newTopPosition = 0;
        }
        var rowHeight = this.rowHeight;
        var bodyHeight = this.contentHeight;
        var currentRow = Math.floor(newTopPosition / rowHeight);
        var firstRow = Math.floor(newTopPosition / rowHeight);
        var currentRowTop = rowHeight * currentRow;
        var firstRowTop = rowHeight * firstRow;
        var collectionLength = this.collectionLength;
        var setAfter = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValue(row, currentRowTop);
            currentRowTop = currentRowTop + rowHeight;
        };
        var setBefore = function (no) {
            var row = _this.rowCache[no];
            firstRowTop = firstRowTop - rowHeight;
            _this.setRowTopValue(row, firstRowTop);
        };
        var setHiddenFromView = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValue(row, -(currentRowTop + (rowHeight * 50)));
        };
        for (var i = 0; i < this.cacheLength; i++) {
            var moved = false;
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
                }
                else {
                    if (currentRow >= collectionLength) {
                        setHiddenFromView(i);
                    }
                }
            }
            currentRow++;
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
        this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
    };
    RowScrollEvents.prototype.setRowHeight = function (rowElement, rowNo) {
        var rowHeightState = this.controller.getRowHeightState();
        rowElement.left.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.main.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.right.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.group.style.height = rowHeightState.rows[rowNo] + 'px';
    };
    RowScrollEvents.prototype.scrollNormalVariableRowHeight = function (newTopPosition, downScroll) {
        var rowHeightState = this.controller.getRowHeightState();
        for (var i = 0; i < this.cacheLength; i++) {
            var cache = this.rowCache[i];
            var top_2 = this.rowCache[i].top;
            var currentRow = rowHeightState.top.indexOf(top_2);
            this.setRowHeight(this.rowCache[i], currentRow);
            var update = false;
            var newTop = void 0;
            if (!downScroll) {
                if (top_2 > (newTopPosition + this.contentHeight)) {
                    currentRow = currentRow - this.cacheLength;
                    if (currentRow > -1) {
                        update = true;
                        newTop = rowHeightState.top[currentRow];
                    }
                }
            }
            else {
                if (top_2 < (newTopPosition - rowHeightState.rows[currentRow])) {
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
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
    };
    RowScrollEvents.prototype.scrollScrollBarVariableRowHeight = function (newTopPosition, downScroll) {
        var _this = this;
        if (this.collectionLength <= this.cacheLength) {
            newTopPosition = 0;
        }
        var rowHeightState = this.controller.getRowHeightState();
        var x = 1000;
        var currentRow = 0;
        var currentRowTop = 0;
        var firstRow = 0;
        var i = 0;
        var run = true;
        if (newTopPosition !== 0) {
            while (i < rowHeightState.top.length) {
                var checkValue = Math.abs(newTopPosition - (rowHeightState.top[i]));
                if (checkValue === x) {
                    currentRow = i - 1;
                    firstRow = i - 1;
                    run = false;
                }
                else {
                    if (checkValue < x) {
                        currentRow = i - 1;
                        firstRow = i - 1;
                        x = checkValue;
                    }
                }
                i++;
            }
        }
        var bodyHeight = this.contentHeight;
        currentRowTop = rowHeightState.top[currentRow];
        var firstRowTop = currentRowTop * 1;
        var collectionLength = this.collectionLength;
        var setAfter = function (no) {
            var row = _this.rowCache[no];
            _this.setRowHeight(row, currentRow);
            _this.setRowTopValueVariableRowHeight(row, currentRowTop);
            row.row = currentRow;
            currentRowTop = currentRowTop + rowHeightState.rows[currentRow];
        };
        var setBefore = function (no) {
            var row = _this.rowCache[no];
            _this.setRowHeight(row, currentRow);
            firstRowTop = firstRowTop - rowHeightState.rows[currentRow];
            _this.setRowTopValueVariableRowHeight(row, firstRowTop);
        };
        var setHiddenFromView = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValueVariableRowHeight(row, -(currentRowTop + (rowHeightState.rows[currentRow] * 50)));
        };
        for (var i_1 = 0; i_1 < this.cacheLength; i_1++) {
            var moved = false;
            switch (true) {
                case currentRow >= 0 && currentRow <= collectionLength - 1:
                    setAfter(i_1);
                    moved = true;
                    break;
                case currentRow >= collectionLength && (rowHeightState.total) >= bodyHeight:
                    setBefore(i_1);
                    moved = true;
                    break;
                default:
            }
            if (!moved) {
                if (currentRow >= collectionLength && (currentRowTop - rowHeightState.rows[currentRow]) >= bodyHeight) {
                    setHiddenFromView(i_1);
                }
                else {
                    if (currentRow >= collectionLength) {
                        setHiddenFromView(i_1);
                    }
                }
            }
            currentRow++;
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
        this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
    };
    RowScrollEvents.prototype.addEventListener = function () {
        this.onScrollBinded = this.onScroll.bind(this);
        this.element.addEventListener('avg-scroll', this.onScrollBinded);
    };
    RowScrollEvents.prototype.triggerRebindRowEvent = function (curRow, curRowCache, isDownScroll) {
        var event = new CustomEvent('avg-rebind-row', {
            detail: {
                currentRow: curRow,
                rowCache: curRowCache,
                downScroll: isDownScroll
            },
            bubbles: false
        });
        this.element.dispatchEvent(event);
    };
    RowScrollEvents.prototype.triggerRebindAllRowsEvent = function (isDownScroll, curRowCache) {
        var event = new CustomEvent('avg-rebind-all-rows', {
            detail: {
                downScroll: isDownScroll,
                rowCache: curRowCache
            },
            bubbles: false
        });
        this.element.dispatchEvent(event);
    };
    return RowScrollEvents;
}());
exports.RowScrollEvents = RowScrollEvents;

//# sourceMappingURL=rowScrollEvents.js.map
