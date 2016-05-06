"use strict";

System.register([], function (_export, _context) {
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

          if (e.target.tagName === "V-GRID-CELL-ROW") {
            if (e.target.firstChild) {
              this.editCellhelper(row, {
                target: e.target.firstChild,
                type: e.type });
            }
          } else {

            this.curElement = e.target;

            if (this.curElement.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {
              this.cells = this.curElement.parentNode.parentNode.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);

              this.index = parseInt(this.curElement.parentNode.getAttribute("column-no"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWhlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztpQ0FPYTtBQVVYLGlCQVZXLGVBVVgsQ0FBWSxLQUFaLEVBQW1CO2dDQVZSLGlCQVVROztlQVBuQixRQUFRLENBQUMsQ0FBRCxDQU9XO2VBTm5CLE9BQU8sQ0FBQyxDQUFELENBTVk7ZUFMbkIsV0FBVyxNQUtRO2VBSm5CLFNBQVMsS0FJVTtlQUhuQixTQUFTLE1BR1U7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7QUFFakIsZUFBSyxpQkFBTCxHQUZpQjtTQUFuQjs7QUFWVyxrQ0FvQlgsbURBQW9CLEdBQUcsV0FBVztBQUNoQyxjQUFJLE9BQUosQ0FEZ0M7QUFFaEMsY0FBSSxPQUFKLENBRmdDO0FBR2hDLGNBQUksSUFBSSxFQUFKLENBSDRCO0FBSWhDLGNBQUksT0FBTyxDQUFQLENBSjRCO0FBS2hDLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUNGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixHQUEzQixDQUE1QixFQUE2RDtBQUMzRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBTixDQUR1RDtBQUUzRCxxQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxNQUE5QyxFQUFzRCxHQUExRSxFQUErRTtBQUM3RSxzQkFBSSxRQUFRLFNBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxDQUE5QyxFQUFpRCxHQUFqRCxHQUF1RCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLENBQXpF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eEMscUJBQUssSUFBTCxHQUFZLElBQVosQ0FEd0M7ZUFBMUMsTUFFTztBQUNMLHFCQUFLLElBQUwsR0FBWSxLQUFaLENBREs7ZUFGUDtBQUtBLGtCQUFJLEtBQUssS0FBTCxLQUFlLENBQWYsRUFBa0I7QUFDcEIscUJBQUssS0FBTCxHQUFhLElBQWIsQ0FEb0I7ZUFBdEIsTUFFTztBQUNMLHFCQUFLLEtBQUwsR0FBYSxLQUFiLENBREs7ZUFGUDs7QUFRQSxrQkFBSSxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBMkIsVUFBM0IsR0FBd0MsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxXQUE1QyxFQUF5RDtBQUNuRyxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUE1QyxHQUF5RCxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBMkIsVUFBM0IsQ0FEMEM7ZUFBckc7QUFHQSxrQkFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFVBQTVDLEdBQXlELENBQXpELElBQThELEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsV0FBNUMsR0FBMEQsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFVBQTNCLEVBQXVDO0FBQ2pLLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFVBQTVDLEdBQXlELEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixDQUR3RztlQUFuSztBQUdBLHlCQUFXLFlBQUs7QUFDZCx1QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxNQUFwQyxDQUEyQyxVQUEzQyxHQUF3RCxPQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFVBQTVDLENBRDFDO2VBQUwsRUFFUixFQUZILEVBMUI4RTs7QUErQjlFLGtCQUFJLFdBQVcsU0FBUyxXQUFULENBQXFCLE9BQXJCLENBQVgsQ0EvQjBFO0FBZ0M5RSx1QkFBUyxTQUFULENBQW1CLFdBQW5CLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDLEVBaEM4RTtBQWlDOUUsbUJBQUssVUFBTCxDQUFnQixhQUFoQixDQUE4QixRQUE5QixFQWpDOEU7YUFBaEY7V0FiRjs7O0FBL1RTLGtDQXFYWCw2QkFBUztBQUNQLGNBQUksV0FBVyxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsQ0FBWCxDQURHO0FBRVAsbUJBQVMsU0FBVCxDQUFtQixXQUFuQixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxFQUZPO0FBR1AsZUFBSyxVQUFMLENBQWdCLGFBQWhCLENBQThCLFFBQTlCLEVBSE87OztlQXJYRSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
