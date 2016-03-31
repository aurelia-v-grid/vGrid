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
        function VGridCellEdit(parent) {
          _classCallCheck(this, VGridCellEdit);

          this.parent = parent;
          this.element = parent.element;
          this.addGridKeyListner();
          this.editMode = false;
        }

        VGridCellEdit.prototype.setCellsFromElement = function setCellsFromElement(e, direction) {
          var thisTop;
          var element;
          var x = 10;
          var node = e;
          for (var i = 0; i < x; i++) {
            try {
              if (node.classList.contains(this._private.css.row)) {
                for (var y = 0; y < this._private.htmlCache.rowsArray.length; y++) {
                  if (node.style.transform === this._private.htmlCache.rowsArray[y].div.style.transform) {
                    thisTop = this._private.htmlCache.rowsArray[y + direction].top;
                    element = this._private.htmlCache.rowsArray[y + direction].div;
                  }
                }
              }
              node = node.offsetParent;
            } catch (x) {}
          }

          if (element) {
            this.cells = element.querySelectorAll("." + this._private.css.cellContent);
          }
          return thisTop;
        };

        VGridCellEdit.prototype.setCellsFromTopValue = function setCellsFromTopValue(top) {
          var element = 0;
          for (var i = 0; i < this._private.htmlCache.rowsArray.length; i++) {
            if (this._private.htmlCache.rowsArray[i].top === top) {
              element = this._private.htmlCache.rowsArray[i].div;
            }
          }
          if (element) {
            this.cells = element.querySelectorAll("." + this._private.css.cellContent);
          }
        };

        VGridCellEdit.prototype.removeEditCssClasses = function removeEditCssClasses(element) {
          element.setAttribute("readonly", "false");
          element.classList.remove("vGrid-editCell");
          element.classList.remove("vGrid-editCell-write");
          element.classList.remove("vGrid-editCell-focus");
        };

        VGridCellEdit.prototype.dispatchCellClick = function dispatchCellClick(index) {
          var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
          this.setAsSingleClick = true;
          this.cells[index].dispatchEvent(event);
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

          this.element.onkeydown = function (e) {
            var _this2 = this;

            console.log(e.keyCode);

            if (e.keyCode === 33) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.gridCtx.getScrollTop();

                  var rowHeight = _this2._private.rowHeight;
                  var containerHeight = _this2._private.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);
                  var buffer = parseInt(containerHeight / 2, 10);
                  if (currentscrolltop !== _this2._private.configFunctions.getCollectionLength() * rowHeight) {
                    buffer = buffer * 2;
                  }

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.gridCtx.setScrollTop(currentscrolltop - (containerHeight - buffer));
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
                  var currentscrolltop = _this2.gridCtx.getScrollTop();

                  var rowHeight = _this2._private.rowHeight;
                  var containerHeight = _this2._private.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);
                  var buffer = parseInt(containerHeight / 2, 10);
                  if (currentscrolltop !== 0) {
                    buffer = buffer * 2;
                  }

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.gridCtx.setScrollTop(currentscrolltop + (containerHeight - buffer));
                  var newTop = _this2.top + containerRows * rowHeight;
                  if (newTop / rowHeight >= _this2._private.configFunctions.getCollectionLength()) {
                    newTop = _this2._private.configFunctions.getCollectionLength() * rowHeight;
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
                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, +1);
                  _this2.dispatchCellClick(_this2.index);
                }
              });
            }

            if (e.keyCode === 39 && !this.editMode) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  _this2.removeEditCssClasses(_this2.curElement);
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
                  _this2.removeEditCssClasses(_this2.curElement);
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
                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, -1);
                  _this2.dispatchCellClick(_this2.index);
                }
              });
            }

            if (e.keyCode === 9 && e.shiftKey === true) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  _this2.removeEditCssClasses(_this2.curElement);
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
                  _this2.removeEditCssClasses(_this2.curElement);
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

        VGridCellEdit.prototype.elementBlur = function elementBlur() {
          this.removeEditCssClasses(this.curElement);
          this.top = this.setCellsFromElement(this.curElement, 0);
          this.callbackDone(this.callbackObject());
          this.editMode = false;
          this.setCellsFromTopValue(this.top);
          this.dispatchCellClick(this.index);
        };

        VGridCellEdit.prototype.elementKeyDown = function elementKeyDown() {
          var _this3 = this;

          this.curElement.onkeydown = function (e) {
            if (e.keyCode == 13) {
              _this3.elementBlur();
              return false;
            }
            if (_this3.readOnly === true && e.keyCode !== 9) {
              return false;
            } else {
              return true;
            }
          };
        };

        VGridCellEdit.prototype.callbackObject = function callbackObject() {
          return {
            attribute: this.attribute,
            value: this.curElement.value,
            oldValue: this.oldValue,
            element: this.curElement
          };
        };

        VGridCellEdit.prototype.elementKeyUp = function elementKeyUp() {
          var _this4 = this;

          this.curElement.onkeyup = function (ex) {
            _this4.callbackKey(_this4.callbackObject());
          };
        };

        VGridCellEdit.prototype.editCellhelper = function editCellhelper(e, readOnly, callbackDone, callbackKey) {
          var _this5 = this;

          if (!this._private) {
            this._private = this.parent.gridContext.ctx._private;
            this.gridCtx = this.parent.gridContext.ctx;
          }

          if (e.target.classList.contains(this._private.css.cellContent)) {

            this.curElement = e.target;
            this.readOnly = readOnly;
            this.callbackDone = callbackDone;
            this.callbackKey = callbackKey;
            this.oldValue = e.target.value;
            this.attribute = e.target.getAttribute(this._private.atts.dataAttribute);
            this.index = this._private.attributeArray.indexOf(this.attribute);
            this.type = e.type;
            this.cells = this.curElement.offsetParent.offsetParent.querySelectorAll("." + this._private.css.cellContent);
            this.row = this.parent.filterRow;

            if (this.setAsSingleClick) {
              this.setAsSingleClick = false;
              this.type = "click";
            }

            setTimeout(function () {
              _this5._private.htmlCache.header.scrollLeft = _this5._private.htmlCache.content.scrollLeft;
            }, 10);

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

            e.target.classList.add("vGrid-editCell");
            e.target.classList.add("vGrid-editCell-write");

            if (this.type === "dblclick" || this.editMode) {
              this.editMode = true;
              if (e.target.classList.contains("vGrid-editCell-focus")) {
                e.target.classList.remove("vGrid-editCell-focus");
              }
              e.target.removeAttribute("readonly");
            } else {
                e.target.classList.add("vGrid-editCell-focus");
              }

            this.elementKeyUp();
            this.elementKeyDown();
            this.curElement.onblur = function (e) {
              _this5.removeEditCssClasses(e.target);
            };

            this.curElement.focus();
          }
        };

        return VGridCellEdit;
      }());

      _export("VGridCellEdit", VGridCellEdit);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBRWE7QUFHWCxpQkFIVyxhQUdYLENBQVksTUFBWixFQUFvQjtnQ0FIVCxlQUdTOztBQUNsQixlQUFLLE1BQUwsR0FBYyxNQUFkLENBRGtCO0FBRWxCLGVBQUssT0FBTCxHQUFlLE9BQU8sT0FBUCxDQUZHO0FBR2xCLGVBQUssaUJBQUwsR0FIa0I7QUFJbEIsZUFBSyxRQUFMLEdBQWdCLEtBQWhCLENBSmtCO1NBQXBCOztBQUhXLGdDQWFYLG1EQUFvQixHQUFHLFdBQVc7QUFDaEMsY0FBSSxPQUFKLENBRGdDO0FBRWhDLGNBQUksT0FBSixDQUZnQztBQUdoQyxjQUFJLElBQUksRUFBSixDQUg0QjtBQUloQyxjQUFJLE9BQU8sQ0FBUCxDQUo0QjtBQUtoQyxlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxDQUFKLEVBQU8sR0FBdkIsRUFBNEI7QUFDMUIsZ0JBQUk7QUFFRixrQkFBSSxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsR0FBbEIsQ0FBNUIsRUFBb0Q7QUFDbEQscUJBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsRUFBMEMsR0FBOUQsRUFBbUU7QUFDakUsc0JBQUksS0FBSyxLQUFMLENBQVcsU0FBWCxLQUF5QixLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLFNBQXhCLENBQWtDLENBQWxDLEVBQXFDLEdBQXJDLENBQXlDLEtBQXpDLENBQStDLFNBQS9DLEVBQTBEO0FBQ3JGLDhCQUFVLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsSUFBSSxTQUFKLENBQWxDLENBQWlELEdBQWpELENBRDJFO0FBRXJGLDhCQUFVLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsSUFBSSxTQUFKLENBQWxDLENBQWlELEdBQWpELENBRjJFO21CQUF2RjtpQkFERjtlQURGO0FBUUEscUJBQU8sS0FBSyxZQUFMLENBVkw7YUFBSixDQVdFLE9BQU8sQ0FBUCxFQUFVLEVBQVY7V0FaSjs7QUFpQkEsY0FBSSxPQUFKLEVBQWE7QUFDWCxpQkFBSyxLQUFMLEdBQWEsUUFBUSxnQkFBUixDQUF5QixNQUFNLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsV0FBbEIsQ0FBNUMsQ0FEVztXQUFiO0FBR0EsaUJBQU8sT0FBUCxDQXpCZ0M7OztBQWJ2QixnQ0F5Q1gscURBQXFCLEtBQUs7QUFDeEIsY0FBSSxVQUFVLENBQVYsQ0FEb0I7QUFFeEIsZUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixTQUF4QixDQUFrQyxNQUFsQyxFQUEwQyxHQUE5RCxFQUFtRTtBQUNqRSxnQkFBSSxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLFNBQXhCLENBQWtDLENBQWxDLEVBQXFDLEdBQXJDLEtBQTZDLEdBQTdDLEVBQWtEO0FBQ3BELHdCQUFVLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsQ0FBbEMsRUFBcUMsR0FBckMsQ0FEMEM7YUFBdEQ7V0FERjtBQUtBLGNBQUksT0FBSixFQUFhO0FBQ1gsaUJBQUssS0FBTCxHQUFhLFFBQVEsZ0JBQVIsQ0FBeUIsTUFBTSxLQUFLLFFBQUwsQ0FBYyxHQUFkLENBQWtCLFdBQWxCLENBQTVDLENBRFc7V0FBYjs7O0FBaERTLGdDQXdEWCxxREFBcUIsU0FBUztBQUM1QixrQkFBUSxZQUFSLENBQXFCLFVBQXJCLEVBQWlDLE9BQWpDLEVBRDRCO0FBRTVCLGtCQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsZ0JBQXpCLEVBRjRCO0FBRzVCLGtCQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsc0JBQXpCLEVBSDRCO0FBSTVCLGtCQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsc0JBQXpCLEVBSjRCOzs7QUF4RG5CLGdDQWdFWCwrQ0FBa0IsT0FBTztBQUN2QixjQUFJLFFBQVEsSUFBSSxVQUFKLENBQWUsT0FBZixFQUF3QjtBQUNsQyxvQkFBUSxNQUFSO0FBQ0EsdUJBQVcsSUFBWDtBQUNBLDBCQUFjLElBQWQ7V0FIVSxDQUFSLENBRG1CO0FBTXZCLGVBQUssZ0JBQUwsR0FBd0IsSUFBeEIsQ0FOdUI7QUFPdkIsZUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixhQUFsQixDQUFnQyxLQUFoQyxFQVB1Qjs7O0FBaEVkLGdDQTJFWCxxQ0FBYSxVQUFVOzs7QUFDckIsY0FBSSxDQUFDLEtBQUssS0FBTCxFQUFZO0FBQ2YsaUJBQUssS0FBTCxHQUFhLFdBQVcsWUFBSztBQUMzQixvQkFBSyxLQUFMLEdBQWEsSUFBYixDQUQyQjtBQUUzQix5QkFGMkI7YUFBTCxFQUdyQixHQUhVLENBQWIsQ0FEZTtXQUFqQjs7O0FBNUVTLGdDQXNGWCxpREFBb0I7O0FBRWxCLGVBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsVUFBVSxDQUFWLEVBQWE7OztBQUVwQyxvQkFBUSxHQUFSLENBQVksRUFBRSxPQUFGLENBQVosQ0FGb0M7O0FBT3BDLGdCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWQsRUFBa0I7QUFDcEIsZ0JBQUUsY0FBRixHQURvQjtBQUVwQixtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBRW5CLHNCQUFJLG1CQUFtQixPQUFLLE9BQUwsQ0FBYSxZQUFiLEVBQW5CLENBRmU7O0FBS25CLHNCQUFJLFlBQVksT0FBSyxRQUFMLENBQWMsU0FBZCxDQUxHO0FBTW5CLHNCQUFJLGtCQUFrQixPQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLE9BQXhCLENBQWdDLFlBQWhDLENBTkg7QUFPbkIsc0JBQUksZ0JBQWdCLFNBQVMsa0JBQWtCLFNBQWxCLEVBQTZCLEVBQXRDLENBQWhCLENBUGU7QUFRbkIsc0JBQUksU0FBUyxTQUFTLGtCQUFrQixDQUFsQixFQUFxQixFQUE5QixDQUFULENBUmU7QUFTbkIsc0JBQUcscUJBQXFCLE9BQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsbUJBQTlCLEtBQW9ELFNBQXBELEVBQThEO0FBQ3BGLDZCQUFTLFNBQU8sQ0FBUCxDQUQyRTttQkFBdEY7O0FBS0EseUJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBZG1CO0FBZW5CLHlCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUExQyxDQUFYLENBZm1CO0FBZ0JuQix5QkFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixvQkFBb0Isa0JBQWtCLE1BQWxCLENBQXBCLENBQTFCLENBaEJtQjtBQWlCbkIsc0JBQUksU0FBUyxPQUFLLEdBQUwsR0FBWSxnQkFBZ0IsU0FBaEIsQ0FqQk47QUFrQm5CLHNCQUFJLE1BQUMsR0FBUyxTQUFULElBQXVCLENBQXhCLEVBQTJCO0FBQzdCLDZCQUFTLENBQVQsQ0FENkI7bUJBQS9CO0FBR0EsNkJBQVcsWUFBSTtBQUNYLDJCQUFLLG9CQUFMLENBQTBCLE1BQTFCLEVBRFc7QUFFWCwyQkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FGVzttQkFBSixFQUdULEdBSEYsRUFyQm1CO2lCQUFyQjtlQURnQixDQUFsQixDQUZvQjthQUF0Qjs7QUFvQ0EsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxFQUFrQjtBQUNwQixnQkFBRSxjQUFGLEdBRG9CO0FBRXBCLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFFbkIsc0JBQUksbUJBQW1CLE9BQUssT0FBTCxDQUFhLFlBQWIsRUFBbkIsQ0FGZTs7QUFNbkIsc0JBQUksWUFBWSxPQUFLLFFBQUwsQ0FBYyxTQUFkLENBTkc7QUFPbkIsc0JBQUksa0JBQWtCLE9BQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBZ0MsWUFBaEMsQ0FQSDtBQVFuQixzQkFBSSxnQkFBZ0IsU0FBUyxrQkFBa0IsU0FBbEIsRUFBNkIsRUFBdEMsQ0FBaEIsQ0FSZTtBQVNuQixzQkFBSSxTQUFTLFNBQVMsa0JBQWtCLENBQWxCLEVBQXFCLEVBQTlCLENBQVQsQ0FUZTtBQVVuQixzQkFBRyxxQkFBcUIsQ0FBckIsRUFBdUI7QUFDeEIsNkJBQVMsU0FBTyxDQUFQLENBRGU7bUJBQTFCOztBQUtBLHlCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQWZtQjtBQWdCbkIseUJBQUssR0FBTCxHQUFXLE9BQUssbUJBQUwsQ0FBeUIsT0FBSyxVQUFMLEVBQWlCLENBQTFDLENBQVgsQ0FoQm1CO0FBaUJuQix5QkFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixvQkFBb0Isa0JBQWtCLE1BQWxCLENBQXBCLENBQTFCLENBakJtQjtBQWtCbkIsc0JBQUksU0FBUyxPQUFLLEdBQUwsR0FBWSxnQkFBZ0IsU0FBaEIsQ0FsQk47QUFtQm5CLHNCQUFJLE1BQUMsR0FBUyxTQUFULElBQXVCLE9BQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsbUJBQTlCLEVBQXhCLEVBQTZFO0FBQy9FLDZCQUFTLE9BQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsbUJBQTlCLEtBQXNELFNBQXRELENBRHNFO0FBRS9FLDZCQUFTLFNBQVMsU0FBVCxDQUZzRTttQkFBakY7QUFJQSw2QkFBVyxZQUFJOztBQUVYLDJCQUFLLG9CQUFMLENBQTBCLE1BQTFCLEVBRlc7QUFHWCwyQkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FIVzttQkFBSixFQUtULEdBTEYsRUF2Qm1CO2lCQUFyQjtlQURnQixDQUFsQixDQUZvQjthQUF0Qjs7QUFxQ0EsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxFQUFrQjtBQUNwQixnQkFBRSxjQUFGLEdBRG9CO0FBRXBCLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFDbkIseUJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBRG1CO0FBRW5CLHlCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUFDLENBQUQsQ0FBckQsQ0FGbUI7QUFHbkIseUJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUFMLENBQXZCLENBSG1CO2lCQUFyQjtlQURnQixDQUFsQixDQUZvQjthQUF0Qjs7QUFnQkEsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxJQUFvQixDQUFDLEtBQUssUUFBTCxFQUFlO0FBQ3RDLGdCQUFFLGNBQUYsR0FEc0M7QUFFdEMsbUJBQUssWUFBTCxDQUFrQixZQUFNO0FBQ3RCLG9CQUFJLE9BQUssVUFBTCxFQUFpQjtBQUNuQix5QkFBSyxvQkFBTCxDQUEwQixPQUFLLFVBQUwsQ0FBMUIsQ0FEbUI7QUFFbkIsc0JBQUksQ0FBQyxPQUFLLElBQUwsRUFBVztBQUNkLDJCQUFLLGlCQUFMLENBQXVCLE9BQUssS0FBTCxHQUFhLENBQWIsQ0FBdkIsQ0FEYzttQkFBaEI7aUJBRkY7ZUFEZ0IsQ0FBbEIsQ0FGc0M7YUFBeEM7O0FBY0EsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxJQUFvQixDQUFDLEtBQUssUUFBTCxFQUFlO0FBQ3RDLGdCQUFFLGNBQUYsR0FEc0M7QUFFdEMsbUJBQUssWUFBTCxDQUFrQixZQUFNO0FBQ3RCLG9CQUFJLE9BQUssVUFBTCxFQUFpQjtBQUNuQix5QkFBSyxvQkFBTCxDQUEwQixPQUFLLFVBQUwsQ0FBMUIsQ0FEbUI7QUFFbkIsc0JBQUksQ0FBQyxPQUFLLEtBQUwsRUFBWTtBQUNmLDJCQUFLLGlCQUFMLENBQXVCLE9BQUssS0FBTCxHQUFhLENBQWIsQ0FBdkIsQ0FEZTttQkFBakI7aUJBRkY7ZUFEZ0IsQ0FBbEIsQ0FGc0M7YUFBeEM7O0FBZUEsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxFQUFrQjtBQUNwQixnQkFBRSxjQUFGLEdBRG9CO0FBRXBCLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFDbkIseUJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBRG1CO0FBRW5CLHlCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUFDLENBQUQsQ0FBckQsQ0FGbUI7QUFHbkIseUJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUFMLENBQXZCLENBSG1CO2lCQUFyQjtlQURnQixDQUFsQixDQUZvQjthQUF0Qjs7QUFlQSxnQkFBSSxFQUFFLE9BQUYsS0FBYyxDQUFkLElBQW1CLEVBQUUsUUFBRixLQUFlLElBQWYsRUFBcUI7QUFDMUMsZ0JBQUUsY0FBRixHQUQwQztBQUUxQyxtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBQ25CLHlCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQURtQjtBQUVuQix5QkFBSyxLQUFMLEdBQWEsT0FBSyxLQUFMLEdBQWEsQ0FBYixDQUZNO0FBR25CLHNCQUFJLE9BQUssS0FBTCxFQUFZO0FBQ2QsMkJBQUssS0FBTCxHQUFhLE9BQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsQ0FBcEIsQ0FEQztBQUVkLDJCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUFDLENBQUQsQ0FBckQsQ0FGYzttQkFBaEI7QUFJQSx5QkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FQbUI7aUJBQXJCO2VBRGdCLENBQWxCLENBRjBDO2FBQTVDOztBQWtCQSxnQkFBSSxFQUFFLE9BQUYsS0FBYyxDQUFkLElBQW1CLEVBQUUsUUFBRixLQUFlLEtBQWYsRUFBc0I7QUFDM0MsZ0JBQUUsY0FBRixHQUQyQztBQUUzQyxtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBQ25CLHlCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQURtQjtBQUVuQix5QkFBSyxLQUFMLEdBQWEsT0FBSyxLQUFMLEdBQWEsQ0FBYixDQUZNO0FBR25CLHNCQUFJLE9BQUssSUFBTCxFQUFXO0FBQ2IsMkJBQUssS0FBTCxHQUFhLENBQWIsQ0FEYTtBQUViLDJCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUExQyxDQUFYLENBRmE7bUJBQWY7QUFJQSx5QkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FQbUI7aUJBQXJCO2VBRGdCLENBQWxCLENBRjJDO2FBQTdDO1dBOUp1QixDQStLdkIsSUEvS3VCLENBK0tsQixJQS9La0IsQ0FBekIsQ0FGa0I7OztBQXRGVCxnQ0E0UVgscUNBQWM7QUFDWixlQUFLLG9CQUFMLENBQTBCLEtBQUssVUFBTCxDQUExQixDQURZO0FBRVosZUFBSyxHQUFMLEdBQVcsS0FBSyxtQkFBTCxDQUF5QixLQUFLLFVBQUwsRUFBaUIsQ0FBMUMsQ0FBWCxDQUZZO0FBR1osZUFBSyxZQUFMLENBQWtCLEtBQUssY0FBTCxFQUFsQixFQUhZO0FBSVosZUFBSyxRQUFMLEdBQWdCLEtBQWhCLENBSlk7QUFLWixlQUFLLG9CQUFMLENBQTBCLEtBQUssR0FBTCxDQUExQixDQUxZO0FBTVosZUFBSyxpQkFBTCxDQUF1QixLQUFLLEtBQUwsQ0FBdkIsQ0FOWTs7O0FBNVFILGdDQXVSWCwyQ0FBaUI7OztBQUNmLGVBQUssVUFBTCxDQUFnQixTQUFoQixHQUE0QixVQUFDLENBQUQsRUFBTztBQUNqQyxnQkFBSSxFQUFFLE9BQUYsSUFBYSxFQUFiLEVBQWlCO0FBQ25CLHFCQUFLLFdBQUwsR0FEbUI7QUFFbkIscUJBQU8sS0FBUCxDQUZtQjthQUFyQjtBQUlBLGdCQUFJLE9BQUssUUFBTCxLQUFrQixJQUFsQixJQUEwQixFQUFFLE9BQUYsS0FBYyxDQUFkLEVBQWlCO0FBQzdDLHFCQUFPLEtBQVAsQ0FENkM7YUFBL0MsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQO1dBTDBCLENBRGI7OztBQXZSTixnQ0F3U1gsMkNBQWlCO0FBQ2YsaUJBQU87QUFDTCx1QkFBVyxLQUFLLFNBQUw7QUFDWCxtQkFBTyxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEI7QUFDUCxzQkFBVSxLQUFLLFFBQUw7QUFDVixxQkFBUyxLQUFLLFVBQUw7V0FKWCxDQURlOzs7QUF4U04sZ0NBb1RYLHVDQUFlOzs7QUFDYixlQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsR0FBMEIsVUFBQyxFQUFELEVBQVE7QUFDaEMsbUJBQUssV0FBTCxDQUFpQixPQUFLLGNBQUwsRUFBakIsRUFEZ0M7V0FBUixDQURiOzs7QUFwVEosZ0NBNlRYLHlDQUFlLEdBQUcsVUFBVSxjQUFjLGFBQWE7OztBQUVyRCxjQUFJLENBQUMsS0FBSyxRQUFMLEVBQWU7QUFDbEIsaUJBQUssUUFBTCxHQUFnQixLQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLEdBQXhCLENBQTRCLFFBQTVCLENBREU7QUFFbEIsaUJBQUssT0FBTCxHQUFlLEtBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsR0FBeEIsQ0FGRztXQUFwQjs7QUFLQSxjQUFJLEVBQUUsTUFBRixDQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixXQUFsQixDQUFoQyxFQUFnRTs7QUFFOUQsaUJBQUssVUFBTCxHQUFrQixFQUFFLE1BQUYsQ0FGNEM7QUFHOUQsaUJBQUssUUFBTCxHQUFnQixRQUFoQixDQUg4RDtBQUk5RCxpQkFBSyxZQUFMLEdBQW9CLFlBQXBCLENBSjhEO0FBSzlELGlCQUFLLFdBQUwsR0FBbUIsV0FBbkIsQ0FMOEQ7QUFNOUQsaUJBQUssUUFBTCxHQUFnQixFQUFFLE1BQUYsQ0FBUyxLQUFULENBTjhDO0FBTzlELGlCQUFLLFNBQUwsR0FBaUIsRUFBRSxNQUFGLENBQVMsWUFBVCxDQUFzQixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLGFBQW5CLENBQXZDLENBUDhEO0FBUTlELGlCQUFLLEtBQUwsR0FBYSxLQUFLLFFBQUwsQ0FBYyxjQUFkLENBQTZCLE9BQTdCLENBQXFDLEtBQUssU0FBTCxDQUFsRCxDQVI4RDtBQVM5RCxpQkFBSyxJQUFMLEdBQVksRUFBRSxJQUFGLENBVGtEO0FBVTlELGlCQUFLLEtBQUwsR0FBYSxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsWUFBN0IsQ0FBMEMsZ0JBQTFDLENBQTJELE1BQU0sS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixXQUFsQixDQUE5RSxDQVY4RDtBQVc5RCxpQkFBSyxHQUFMLEdBQVcsS0FBSyxNQUFMLENBQVksU0FBWixDQVhtRDs7QUFjOUQsZ0JBQUksS0FBSyxnQkFBTCxFQUF1QjtBQUN6QixtQkFBSyxnQkFBTCxHQUF3QixLQUF4QixDQUR5QjtBQUV6QixtQkFBSyxJQUFMLEdBQVksT0FBWixDQUZ5QjthQUEzQjs7QUFNQSx1QkFBVyxZQUFLO0FBQ2QscUJBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsTUFBeEIsQ0FBK0IsVUFBL0IsR0FBNEMsT0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxVQUFoQyxDQUQ5QjthQUFMLEVBRVIsRUFGSCxFQXBCOEQ7O0FBeUI5RCxnQkFBSSxLQUFLLEtBQUwsS0FBZSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLENBQXBCLEVBQXVCO0FBQ3hDLG1CQUFLLElBQUwsR0FBWSxJQUFaLENBRHdDO2FBQTFDLE1BRU87QUFDTCxtQkFBSyxJQUFMLEdBQVksS0FBWixDQURLO2FBRlA7QUFLQSxnQkFBSSxLQUFLLEtBQUwsS0FBZSxDQUFmLEVBQWtCO0FBQ3BCLG1CQUFLLEtBQUwsR0FBYSxJQUFiLENBRG9CO2FBQXRCLE1BRU87QUFDTCxtQkFBSyxLQUFMLEdBQWEsS0FBYixDQURLO2FBRlA7O0FBT0EsY0FBRSxNQUFGLENBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixnQkFBdkIsRUFyQzhEO0FBc0M5RCxjQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLHNCQUF2QixFQXRDOEQ7O0FBeUM5RCxnQkFBSSxLQUFLLElBQUwsS0FBYyxVQUFkLElBQTRCLEtBQUssUUFBTCxFQUFlO0FBQzdDLG1CQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FENkM7QUFFN0Msa0JBQUksRUFBRSxNQUFGLENBQVMsU0FBVCxDQUFtQixRQUFuQixDQUE0QixzQkFBNUIsQ0FBSixFQUF5RDtBQUN2RCxrQkFBRSxNQUFGLENBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixzQkFBMUIsRUFEdUQ7ZUFBekQ7QUFHQSxnQkFBRSxNQUFGLENBQVMsZUFBVCxDQUF5QixVQUF6QixFQUw2QzthQUEvQyxNQU1PO0FBQ0wsa0JBQUUsTUFBRixDQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsc0JBQXZCLEVBREs7ZUFOUDs7QUFVQSxpQkFBSyxZQUFMLEdBbkQ4RDtBQW9EOUQsaUJBQUssY0FBTCxHQXBEOEQ7QUFxRDlELGlCQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsVUFBQyxDQUFELEVBQU07QUFDN0IscUJBQUssb0JBQUwsQ0FBMEIsRUFBRSxNQUFGLENBQTFCLENBRDZCO2FBQU4sQ0FyRHFDOztBQXlEOUQsaUJBQUssVUFBTCxDQUFnQixLQUFoQixHQXpEOEQ7V0FBaEU7OztlQXBVUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC1lZGl0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
