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

          if (e.target.tagName === "V-GRID-ROW-COL" || e.target.tagName === "V-GRID-CHECKBOX" || e.target.tagName === "V-GRID-IMAGE") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWhlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztpQ0FPYSxlO0FBVVgsaUNBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGVBUG5CLEtBT21CLEdBUFgsQ0FBQyxDQU9VO0FBQUEsZUFObkIsSUFNbUIsR0FOWixDQUFDLENBTVc7QUFBQSxlQUxuQixRQUttQixHQUxSLEtBS1E7QUFBQSxlQUpuQixNQUltQixHQUpWLElBSVU7QUFBQSxlQUhuQixNQUdtQixHQUhWLEtBR1U7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLGlCQUFMO0FBQ0Q7O2tDQU1ELG1CLGdDQUFvQixDLEVBQUcsUyxFQUFXO0FBQ2hDLGNBQUksT0FBSjtBQUNBLGNBQUksT0FBSjtBQUNBLGNBQUksSUFBSSxFQUFSO0FBQ0EsY0FBSSxPQUFPLENBQVg7QUFDQSxlQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNEI7QUFDMUIsZ0JBQUk7QUFDRixrQkFBSSxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsR0FBbkQsQ0FBSixFQUE2RDtBQUMzRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBVjtBQUNBLHFCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxNQUFsRSxFQUEwRSxHQUExRSxFQUErRTtBQUM3RSxzQkFBSSxRQUFRLFNBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxDQUE5QyxFQUFpRCxHQUFqRCxHQUF1RCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXhGLENBQVosRUFBaUg7QUFDL0csOEJB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Q0FBMkIsVUFBdkosRUFBbUs7QUFDaksscUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsR0FBeUQsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFVBQXBGO0FBQ0Q7QUFDRCx5QkFBVyxZQUFLO0FBQ2QsdUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsTUFBcEMsQ0FBMkMsVUFBM0MsR0FBd0QsT0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUFwRztBQUNELGVBRkQsRUFFRyxFQUZIOztBQUtBLGtCQUFJLFdBQVcsU0FBUyxXQUFULENBQXFCLE9BQXJCLENBQWY7QUFDQSx1QkFBUyxTQUFULENBQW1CLFdBQW5CLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDO0FBQ0EsbUJBQUssVUFBTCxDQUFnQixhQUFoQixDQUE4QixRQUE5QjtBQUdEO0FBQ0Y7QUFDRixTOztrQ0FHRCxPLHNCQUFVO0FBQ1IsY0FBSSxXQUFXLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFmO0FBQ0EsbUJBQVMsU0FBVCxDQUFtQixXQUFuQixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QztBQUNBLGVBQUssVUFBTCxDQUFnQixhQUFoQixDQUE4QixRQUE5QjtBQUNELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
