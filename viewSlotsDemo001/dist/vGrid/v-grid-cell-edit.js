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

              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

                  var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
                  var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10) + 1;

                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.vGrid.vGridGenerator.onNormalScrolling(false);
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

              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

                  var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
                  var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10) + 1;

                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.vGrid.vGridGenerator.onNormalScrolling(true);

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
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, -1);
                  _this2.dispatchCellClick(_this2.index);
                }
              });
            }

            if (e.keyCode === 9 && e.shiftKey === true) {
              e.preventDefault();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBT2E7QUFVWCxpQkFWVyxhQVVYLENBQVksS0FBWixFQUFtQjtnQ0FWUixlQVVROztlQVBuQixRQUFRLENBQUMsQ0FBRCxDQU9XO2VBTm5CLE9BQU8sQ0FBQyxDQUFELENBTVk7ZUFMbkIsV0FBVyxNQUtRO2VBSm5CLFNBQVMsS0FJVTtlQUhuQixTQUFTLE1BR1U7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7QUFFakIsZUFBSyxpQkFBTCxHQUZpQjtTQUFuQjs7QUFWVyxnQ0FtQlgsbURBQW9CLEdBQUcsV0FBVztBQUNoQyxjQUFJLE9BQUosQ0FEZ0M7QUFFaEMsY0FBSSxPQUFKLENBRmdDO0FBR2hDLGNBQUksSUFBSSxFQUFKLENBSDRCO0FBSWhDLGNBQUksT0FBTyxDQUFQLENBSjRCO0FBS2hDLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUNGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixHQUEzQixDQUE1QixFQUE2RDtBQUMzRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBTixDQUR1RDtBQUUzRCxxQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxNQUE5QyxFQUFzRCxHQUExRSxFQUErRTtBQUM3RSxzQkFBSSxRQUFRLFNBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxDQUE5QyxFQUFpRCxHQUFqRCxHQUF1RCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLENBQXpFLEVB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QVMsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFlBQTNCLENBQXdDLFFBQXhDLENBQVQsQ0FBYixDQU44RTtBQU85RSxrQkFBSSxLQUFLLEtBQUwsS0FBZSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLENBQXBCLEVBQXVCO0FBQ3hDLHFCQUFLLElBQUwsR0FBWSxJQUFaLENBRHdDO2VBQTFDLE1BRU87QUFDTCxxQkFBSyxJQUFMLEdBQVksS0FBWixDQURLO2VBRlA7QUFLQSxrQkFBSSxLQUFLLEtBQUwsS0FBZSxDQUFmLEVBQWtCO0FBQ3BCLHFCQUFLLEtBQUwsR0FBYSxJQUFiLENBRG9CO2VBQXRCLE1BRU87QUFDTCxxQkFBSyxLQUFMLEdBQWEsS0FBYixDQURLO2VBRlA7O0FBUUEsa0JBQUksS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFVBQTNCLEdBQXdDLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsV0FBNUMsRUFBeUQ7QUFDbkcscUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsR0FBeUQsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFVBQTNCLENBRDBDO2VBQXJHO0FBR0Esa0JBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUE1QyxHQUF5RCxDQUF6RCxJQUE4RCxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFdBQTVDLEdBQTBELEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixFQUF1QztBQUNqSyxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUE1QyxHQUF5RCxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBMkIsVUFBM0IsQ0FEd0c7ZUFBbks7QUFHQSx5QkFBVyxZQUFLO0FBQ2QsdUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsTUFBcEMsQ0FBMkMsVUFBM0MsR0FBd0QsT0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUE1QyxDQUQxQztlQUFMLEVBRVIsRUFGSCxFQTFCOEU7O0FBK0I5RSxrQkFBSSxXQUFXLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFYLENBL0IwRTtBQWdDOUUsdUJBQVMsU0FBVCxDQUFtQixXQUFuQixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxFQWhDOEU7QUFpQzlFLG1CQUFLLFVBQUwsQ0FBZ0IsYUFBaEIsQ0FBOEIsUUFBOUIsRUFqQzhFO2FBQWhGO1dBaEJGOzs7ZUF4U1MiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtZWRpdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
