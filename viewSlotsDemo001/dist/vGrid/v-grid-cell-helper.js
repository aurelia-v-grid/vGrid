"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var VGridCellHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridCellHelper", VGridCellHelper = function () {
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

            var queryField = e.target.classList.contains(this.vGrid.vGridConfig.css.filterHandle);

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
            this.vGrid.vGridSkipNextUpdateProperty.push(obj.attribute);

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
      }());

      _export("VGridCellHelper", VGridCellHelper);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWhlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2lDQU9hLGU7QUFVWCxpQ0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFQbkIsS0FPbUIsR0FQWCxDQUFDLENBT1U7QUFBQSxlQU5uQixJQU1tQixHQU5aLENBQUMsQ0FNVztBQUFBLGVBTG5CLFFBS21CLEdBTFIsS0FLUTtBQUFBLGVBSm5CLE1BSW1CLEdBSlYsSUFJVTtBQUFBLGVBSG5CLE1BR21CLEdBSFYsS0FHVTs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssaUJBQUw7QUFDRDs7a0NBTUQsbUIsZ0NBQW9CLEMsRUFBRyxTLEVBQVc7QUFDaEMsY0FBSSxPQUFKO0FBQ0EsY0FBSSxPQUFKO0FBQ0EsY0FBSSxJQUFJLEVBQVI7QUFDQSxjQUFJLE9BQU8sQ0FBWDtBQUNBLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUNGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixHQUFuRCxDQUFKLEVBQTZEO0FBQzNELG9CQUFJLE1BQU0sU0FBUyxLQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBVCxDQUFWO0FBQ0EscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLFNBQXBDLENBQThDLE1BQWxFLEVBQTBFLEdBQTFFLEVBQStFO0FBQzdFLHNCQUFJLFFBQVEsU0FBVSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLFNBQXBDLENBQThDLENBQTlDLEVBQWlELEdBQWpELEdBQXVELEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBeEYsQ0FBWixFQUFpSDtBQUMvRyw4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
