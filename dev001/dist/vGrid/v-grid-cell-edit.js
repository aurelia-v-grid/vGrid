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

          this.first = -1;
          this.last = -1;
          this.editMode = false;
          this.parent = null;
          this.element = null;

          this.parent = parent;
          this.element = parent.element;
          this.addGridKeyListner();
        }

        VGridCellEdit.prototype.setCellsFromElement = function setCellsFromElement(e, direction) {
          var thisTop;
          var element;
          var x = 10;
          var node = e;
          for (var i = 0; i < x; i++) {
            try {
              if (node.classList.contains(this._private.css.row)) {
                var row = parseInt(node.getAttribute("row"));
                for (var y = 0; y < this._private.htmlCache.rowsArray.length; y++) {
                  if (row === this._private.htmlCache.rowsArray[y].top / this._private.rowHeight) {
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
          element.classList.remove(this._private.css.editCell);
          element.classList.remove(this._private.css.editCellWrite);
          element.classList.remove(this._private.css.editCellFocus);
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

            if (e.keyCode === 33) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.gridCtx.getScrollTop();

                  var rowHeight = _this2._private.rowHeight;
                  var containerHeight = _this2._private.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);
                  var buffer = parseInt(containerHeight / 2, 10);
                  if (currentscrolltop !== _this2._private.configFunctions.getCollectionLength() * rowHeight - containerHeight) {
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
                  if (!_this2.last) {
                    _this2.removeEditCssClasses(_this2.curElement);
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
                    _this2.removeEditCssClasses(_this2.curElement);
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

          this.curElement.onkeyup = function () {
            _this4.callbackKey(_this4.callbackObject());
          };
        };

        VGridCellEdit.prototype.setBackFocus = function setBackFocus() {
          if (this.curElement) {
            var rowNo = this.parent.filterRow;
            var rowheight = this._private.rowHeight;
            this.setCellsFromTopValue(rowNo * rowheight);
            if (this.cells.length > 0) {
              this.curElement = this.cells[this.index];

              if (!this.cells[this.index].classList.contains(this._private.css.editCell)) {
                this.cells[this.index].classList.add(this._private.css.editCell);
              }

              if (!this.cells[this.index].classList.contains(this._private.css.editCellWrite)) {
                this.cells[this.index].classList.add(this._private.css.editCellWrite);
              }

              if (this.editMode) {
                if (this.readOnly === false) {
                  if (this.cells[this.index].classList.contains(this._private.css.editCellFocus)) {
                    this.cells[this.index].classList.remove(this._private.css.editCellFocus);
                  }
                  this.cells[this.index].removeAttribute("readonly");
                } else {
                    this.cells[this.index].classList.add(this._private.css.editCellFocus);
                  }
              } else {
                this.cells[this.index].classList.add(this._private.css.editCellFocus);
              }
            }
          }
        };

        VGridCellEdit.prototype.editCellhelper = function editCellhelper(e, readOnly, callbackDone, callbackKey) {
          var _this5 = this;

          if (!this._private) {
            this._private = this.parent.gridContext.ctx._private;
            this.gridCtx = this.parent.gridContext.ctx;
          }

          if (e.target.classList.contains(this._private.css.cellContent)) {

            if (this.curElement) {
              this.removeEditCssClasses(this.curElement);
            }

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

            if (!e.target.classList.contains(this._private.css.editCell)) {
              e.target.classList.add(this._private.css.editCell);
            }

            if (!e.target.classList.contains(this._private.css.editCellWrite)) {
              e.target.classList.add(this._private.css.editCellWrite);
            }

            if (this.type === "dblclick" || this.editMode) {
              this.editMode = true;
              if (this.readOnly === false) {
                if (e.target.classList.contains(this._private.css.editCellFocus)) {
                  e.target.classList.remove(this._private.css.editCellFocus);
                }
                e.target.removeAttribute("readonly");
              } else {
                  e.target.classList.add(this._private.css.editCellFocus);
                }
            } else {
              e.target.classList.add(this._private.css.editCellFocus);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBT2E7QUFTWCxpQkFUVyxhQVNYLENBQVksTUFBWixFQUFvQjtnQ0FUVCxlQVNTOztlQU5wQixRQUFRLENBQUMsQ0FBRCxDQU1ZO2VBTHBCLE9BQU8sQ0FBQyxDQUFELENBS2E7ZUFKcEIsV0FBVyxNQUlTO2VBSHBCLFNBQVMsS0FHVztlQUZwQixVQUFVLEtBRVU7O0FBQ2xCLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEa0I7QUFFbEIsZUFBSyxPQUFMLEdBQWUsT0FBTyxPQUFQLENBRkc7QUFHbEIsZUFBSyxpQkFBTCxHQUhrQjtTQUFwQjs7QUFUVyxnQ0FpQlgsbURBQW9CLEdBQUcsV0FBVztBQUNoQyxjQUFJLE9BQUosQ0FEZ0M7QUFFaEMsY0FBSSxPQUFKLENBRmdDO0FBR2hDLGNBQUksSUFBSSxFQUFKLENBSDRCO0FBSWhDLGNBQUksT0FBTyxDQUFQLENBSjRCO0FBS2hDLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUVGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixHQUFsQixDQUE1QixFQUFvRDtBQUNsRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBTixDQUQ4QztBQUVsRCxxQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixTQUF4QixDQUFrQyxNQUFsQyxFQUEwQyxHQUE5RCxFQUFtRTtBQUNqRSxzQkFBSSxRQUFTLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsQ0FBbEMsRUFBcUMsR0FBckMsR0FBeUMsS0FBSyxRQUFMLENBQWMsU0FBZCxFQUEwQjtBQUM5RSw4QkFBVSxLQUFLLFFB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
