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
