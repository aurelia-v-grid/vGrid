/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridCellHelper = exports.VGridCellHelper = function () {
    function VGridCellHelper(vGrid) {
      _classCallCheck(this, VGridCellHelper);

      this.first = -1;
      this.last = -1;
      this.editMode = false;
      this.update = true;
      this.filter = false;

      this.vGrid = vGrid;
      this.addGridKeyListner();
    }

    VGridCellHelper.prototype.setCellsFromElement = function setCellsFromElement(e, direction) {
      var thisTop;
      var element;
      var x = 10;
      var node = e;
      for (var i = 0; i < x; i++) {
        try {
          if (node.classList.contains(this.vGrid.vGridConfig.css.row)) {
            var row = parseInt(node.getAttribute("row"));
            for (var y = 0; y < this.vGrid.vGridGenerator.htmlCache.rowsArray.length; y++) {
              if (row === parseInt(this.vGrid.vGridGenerator.htmlCache.rowsArray[y].top / this.vGrid.vGridConfig.rowHeight)) {
                thisTop = this.vGrid.vGridGenerator.htmlCache.rowsArray[y + direction].top;
                element = this.vGrid.vGridGenerator.htmlCache.rowsArray[y + direction].div;
              }
            }
          }
          node = node.parentNode;
        } catch (x) {}
      }
      if (element) {
        this.cells = element.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);
      }
      return thisTop;
    };

    VGridCellHelper.prototype.setCellsFromTopValue = function setCellsFromTopValue(top) {
      var element = 0;
      for (var i = 0; i < this.vGrid.vGridGenerator.htmlCache.rowsArray.length; i++) {
        if (this.vGrid.vGridGenerator.htmlCache.rowsArray[i].top === top) {
          element = this.vGrid.vGridGenerator.htmlCache.rowsArray[i].div;
        }
      }
      if (element) {
        this.cells = element.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);
      }
    };

    VGridCellHelper.prototype.dispatchCellClick = function dispatchCellClick(index) {
      var e = document.createEvent('Event');
      e.initEvent("tabbing", true, true);

      if (this.cells[index]) {
        this.cells[index].dispatchEvent(e);
      }
    };

    VGridCellHelper.prototype.keyDownDelay = function keyDownDelay(callback) {
      var _this = this;

      if (!this.timer) {
        this.timer = setTimeout(function () {
          _this.timer = null;
          callback();
        }, 150);
      }
    };

    VGridCellHelper.prototype.addGridKeyListner = function addGridKeyListner() {

      this.vGrid.element.onmousedown = function (e) {
        if (this.curElement) {
          if (e.target !== this.curElement) {
            this.curElement.blur();
          }
        }
      }.bind(this);
      this.vGrid.element.onmousewheel = function (e) {
        if (this.curElement) {
          this.curElement.blur();
        }
      }.bind(this);

      this.vGrid.element.onkeydown = function (e) {
        var _this2 = this;

        var isQueryField = e.target.classList.contains(this.vGrid.vGridConfig.css.filterHandle);
        if (isQueryField) {
          return true;
        }

        if (e.keyCode === 33) {
          e.preventDefault();
          this.blurBeforeNext();
          this.keyDownDelay(function () {
            if (_this2.curElement) {
              var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

              var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
              var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
              var containerRows = parseInt(containerHeight / rowHeight, 10);
              _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);

              var newTop = _this2.top - containerRows * rowHeight;
              if (newTop / rowHeight <= 0) {
                newTop = 0;
              }

              if (_this2.vGrid.vGridGenerator.lastScrollType === "down") {
                _this2.vGrid.vGridGenerator.onNormalScrolling(false);
              }

              _this2.setCellsFromTopValue(newTop);
              _this2.dispatchCellClick(_this2.index);

              var setTop = newTop - parseInt(containerRows * rowHeight / 2);
              _this2.vGrid.vGridGenerator.setScrollTop(setTop);
            }
          });
        }

        if (e.keyCode === 34) {
          e.preventDefault();
          this.blurBeforeNext();
          this.keyDownDelay(function () {
            if (_this2.curElement) {
              var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

              var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
              var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
              var containerRows = parseInt(containerHeight / rowHeight, 10);
              _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);

              var newTop = _this2.top + containerRows * rowHeight;
              if (newTop / rowHeight >= _this2.vGrid.vGridConfig.getCollectionLength()) {
                newTop = _this2.vGrid.vGridConfig.getCollectionLength() * rowHeight;
                newTop = newTop - rowHeight;
              }

              if (_this2.vGrid.vGridGenerator.lastScrollType === "up") {
                _this2.vGrid.vGridGenerator.onNormalScrolling(true);
              }

              _this2.setCellsFromTopValue(newTop);
              _this2.dispatchCellClick(_this2.index);

              var setTop = newTop - parseInt(containerRows * rowHeight / 2);
              _this2.vGrid.vGridGenerator.setScrollTop(setTop);
            }
          });
        }

        if (e.keyCode === 40) {
          e.preventDefault();
          this.blurBeforeNext();
          this.keyDownDelay(function () {
            if (_this2.curElement) {
              _this2.top = _this2.setCellsFromElement(_this2.curElement, +1);
              _this2.dispatchCellClick(_this2.index);
            }
          });
        }

        if (e.keyCode === 39 && !this.editMode && !queryField) {
          e.preventDefault();
          this.keyDownDelay(function () {
            if (_this2.curElement) {
              if (!_this2.last) {
                _this2.dispatchCellClick(_this2.index + 1);
              }
            }
          });
        }

        if (e.keyCode === 37 && !this.editMode && !queryField) {
          e.preventDefault();
          this.keyDownDelay(function () {
            if (_this2.curElement) {
              if (!_this2.first) {
                _this2.dispatchCellClick(_this2.index - 1);
              }
            }
          });
        }

        if (e.keyCode === 38) {
          e.preventDefault();
          this.blurBeforeNext();
          this.keyDownDelay(function () {
            if (_this2.curElement) {
              _this2.top = _this2.setCellsFromElement(_this2.curElement, -1);
              _this2.dispatchCellClick(_this2.index);
            }
          });
        }

        if (e.keyCode === 9 && e.shiftKey === true) {
          if (!this.vGrid.vGridConfig.tabbingEnabled) {
            e.preventDefault();
            return false;
          }

          e.preventDefault();
          this.blurBeforeNext();
          this.keyDownDelay(function () {
            if (_this2.curElement) {
              _this2.index = _this2.index - 1;
              if (_this2.first) {
                _this2.index = _this2.cells.length - 1;
                _this2.top = _this2.setCellsFromElement(_this2.curElement, -1);
              }
              _this2.dispatchCellClick(_this2.index);
            }
          });
        }

        if (e.keyCode === 9 && e.shiftKey === false) {
          if (!this.vGrid.vGridConfig.tabbingEnabled) {
            e.preventDefault();
            return false;
          }

          e.preventDefault();
          this.blurBeforeNext();
          this.keyDownDelay(function () {
            if (_this2.curElement) {
              _this2.index = _this2.index + 1;
              if (_this2.last) {
                _this2.index = 0;
                _this2.top = _this2.setCellsFromElement(_this2.curElement, 1);
              }
              _this2.dispatchCellClick(_this2.index);
            }
          });
        }
      }.bind(this);
    };

    VGridCellHelper.prototype.blurBeforeNext = function blurBeforeNext() {
      if (this.curElement) {
        this.curElement.blur();
      }
    };

    VGridCellHelper.prototype.updateActual = function updateActual(obj) {
      var _this3 = this;

      if (obj.attribute && this.vGrid.vGridCurrentEntityRef) {
        this.vGrid.vGridCurrentEntityRef[obj.attribute] = obj.value;
        this.vGrid.vGridCurrentEntity[obj.attribute] = obj.value;
        var row = this.vGrid.vGridCurrentRow;
        setTimeout(function () {
          _this3.vGrid.vGridGenerator.fillDataIntoRow(row);
        }, 150);
      }
    };

    VGridCellHelper.prototype.editCellhelper = function editCellhelper(row, e) {
      var _this4 = this;

      if (e.target.tagName === "V-GRID-ROW-COL" || e.target.tagName === "V-GRID-CHECKBOX" || e.target.tagName === "V-GRID-IMAGE" || e.target.tagName === "V-GRID-SELECTION") {
        if (e.target.children) {
          this.editCellhelper(row, {
            target: e.target.children[0],
            type: e.type
          });
        }
      } else {

        this.curElement = e.target;

        if (this.curElement.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {
          this.cells = this.curElement.parentNode.parentNode.parentNode.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);

          this.index = parseInt(this.curElement.columnNo);
          if (this.index === this.cells.length - 1) {
            this.last = true;
          } else {
            this.last = false;
          }

          if (this.index === 0) {
            this.first = true;
          } else {
            this.first = false;
          }

          if (this.curElement.parentNode.offsetLeft > this.vGrid.vGridGenerator.htmlCache.content.clientWidth) {
            this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.parentNode.offsetLeft;
          }
          if (this.vGrid.vGridGenerator.htmlCache.content.scrollLeft > 0 && this.vGrid.vGridGenerator.htmlCache.content.clientWidth > this.curElement.parentNode.offsetLeft) {
            this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.parentNode.offsetLeft;
          }
          setTimeout(function () {
            _this4.vGrid.vGridGenerator.htmlCache.header.scrollLeft = _this4.vGrid.vGridGenerator.htmlCache.content.scrollLeft;
          }, 10);

          var newEvent = document.createEvent('Event');
          newEvent.initEvent("cellFocus", true, true);
          this.curElement.dispatchEvent(newEvent);
        }
      }
    };

    VGridCellHelper.prototype.refocus = function refocus() {
      var newEvent = document.createEvent('Event');
      newEvent.initEvent("cellFocus", true, true);
      this.curElement.dispatchEvent(newEvent);
    };

    return VGridCellHelper;
  }();
});