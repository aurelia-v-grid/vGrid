"use strict";

System.register([], function (_export, _context) {
  var VGridCellEdit;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridCellEdit", VGridCellEdit = function () {
        function VGridCellEdit(vGrid) {
          _classCallCheck(this, VGridCellEdit);

          this.first = -1;
          this.last = -1;
          this.editMode = false;
          this.update = true;
          this.filter = false;

          this.vGrid = vGrid;
          this.addGridKeyListner();
        }

        VGridCellEdit.prototype.setCellsFromElement = function setCellsFromElement(e, direction) {
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

        VGridCellEdit.prototype.setCellsFromTopValue = function setCellsFromTopValue(top) {
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

        VGridCellEdit.prototype.dispatchCellClick = function dispatchCellClick(index) {
          var e = document.createEvent('Event');
          e.initEvent("tabbing", true, true);

          if (this.cells[index]) {
            this.cells[index].dispatchEvent(e);
          }
        };

        VGridCellEdit.prototype.keyDownDelay = function keyDownDelay(callback) {
          var _this = this;

          if (!this.timer) {
            this.timer = setTimeout(function () {
              _this.timer = null;
              callback();
            }, 150);
          }
        };

        VGridCellEdit.prototype.addGridKeyListner = function addGridKeyListner() {

          this.vGrid.element.onmousedown = function (e) {
            if (this.curElement) {
              this.curElement.blur();
            }
          }.bind(this);
          this.vGrid.element.onmousewheel = function (e) {
            if (this.curElement) {
              this.curElement.blur();
            }
          }.bind(this);

          this.vGrid.element.onkeydown = function (e) {
            var _this2 = this;

            if (e.keyCode === 33) {
              e.preventDefault();
              this.blurBeforeNext();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

                  var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
                  var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10) + 1;

                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  if (_this2.vGrid.vGridGenerator.lastScrollType === "down") {
                    _this2.vGrid.vGridGenerator.onNormalScrolling(false);
                  }
                  var newTop = _this2.top - containerRows * rowHeight;
                  if (newTop / rowHeight <= 0) {
                    newTop = 0;
                  }
                  setTimeout(function () {
                    _this2.setCellsFromTopValue(newTop);
                    _this2.dispatchCellClick(_this2.index);
                  }, 100);
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
                  var containerRows = parseInt(containerHeight / rowHeight, 10) + 1;

                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  if (_this2.vGrid.vGridGenerator.lastScrollType === "up") {
                    _this2.vGrid.vGridGenerator.onNormalScrolling(true);
                  }

                  var newTop = _this2.top + containerRows * rowHeight;
                  if (newTop / rowHeight >= _this2.vGrid.vGridConfig.getCollectionLength()) {
                    newTop = _this2.vGrid.vGridConfig.getCollectionLength() * rowHeight;
                    newTop = newTop - rowHeight;
                  }
                  setTimeout(function () {
                    _this2.setCellsFromTopValue(newTop);
                    _this2.dispatchCellClick(_this2.index);
                  }, 100);
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

            if (e.keyCode === 39 && !this.editMode) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  if (!_this2.last) {
                    _this2.dispatchCellClick(_this2.index + 1);
                  }
                }
              });
            }

            if (e.keyCode === 37 && !this.editMode) {
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

        VGridCellEdit.prototype.setBackFocus = function setBackFocus(filter) {
          console.log("delete me");
        };

        VGridCellEdit.prototype.blurBeforeNext = function blurBeforeNext() {
          if (this.curElement) {
            this.curElement.blur();
          }
        };

        VGridCellEdit.prototype.updateActual = function updateActual(obj) {
          this.vGrid.skipNextUpdateProperty.push(obj.attribute);

          this.vGrid.currentRowEntity[obj.attribute] = obj.value;
          this.vGrid.currentEntity[obj.attribute] = obj.value;
        };

        VGridCellEdit.prototype.editCellhelper = function editCellhelper(row, e) {
          var _this3 = this;

          if (e.target.tagName === "V-GRID-CELL") {
            var eventChild = document.createEvent('Event');
            eventChild.initEvent(e.type, true, true);

            if (e.target.firstChild) {
              e.target.firstChild.dispatchEvent(eventChild);
            } else {
              console.log("debug this");
            }
          } else {

            this.curElement = e.target;

            if (this.curElement.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {
              this.cells = this.curElement.parentNode.parentNode.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);

              this.index = parseInt(this.curElement.parentNode.getAttribute("col-no"));
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
                _this3.vGrid.vGridGenerator.htmlCache.header.scrollLeft = _this3.vGrid.vGridGenerator.htmlCache.content.scrollLeft;
              }, 10);

              var newEvent = document.createEvent('Event');
              newEvent.initEvent("cellFocus", true, true);
              this.curElement.dispatchEvent(newEvent);
            }
          }
        };

        return VGridCellEdit;
      }());

      _export("VGridCellEdit", VGridCellEdit);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBT2E7QUFVWCxpQkFWVyxhQVVYLENBQVksS0FBWixFQUFtQjtnQ0FWUixlQVVROztlQVBuQixRQUFRLENBQUMsQ0FBRCxDQU9XO2VBTm5CLE9BQU8sQ0FBQyxDQUFELENBTVk7ZUFMbkIsV0FBVyxNQUtRO2VBSm5CLFNBQVMsS0FJVTtlQUhuQixTQUFTLE1BR1U7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7QUFFakIsZUFBSyxpQkFBTCxHQUZpQjtTQUFuQjs7QUFWVyxnQ0FtQlgsbURBQW9CLEdBQUcsV0FBVztBQUNoQyxjQUFJLE9BQUosQ0FEZ0M7QUFFaEMsY0FBSSxPQUFKLENBRmdDO0FBR2hDLGNBQUksSUFBSSxFQUFKLENBSDRCO0FBSWhDLGNBQUksT0FBTyxDQUFQLENBSjRCO0FBS2hDLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUNGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixHQUEzQixDQUE1QixFQUE2RDtBQUMzRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBTixDQUR1RDtBQUUzRCxxQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxNQUE5QyxFQUFzRCxHQUExRSxFQUErRTtBQUM3RSxzQkFBSSxRQUFRLFNBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxDQUE5QyxFQUFpRCxHQUFqRCxHQUF1RCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLENBQXpFLEVB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
