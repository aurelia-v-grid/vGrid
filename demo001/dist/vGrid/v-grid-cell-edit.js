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
          if (this.cells[index]) {
            this.cells[index].dispatchEvent(event);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBT2E7QUFTWCxpQkFUVyxhQVNYLENBQVksTUFBWixFQUFvQjtnQ0FUVCxlQVNTOztlQU5wQixRQUFRLENBQUMsQ0FBRCxDQU1ZO2VBTHBCLE9BQU8sQ0FBQyxDQUFELENBS2E7ZUFKcEIsV0FBVyxNQUlTO2VBSHBCLFNBQVMsS0FHVztlQUZwQixVQUFVLEtBRVU7O0FBQ2xCLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEa0I7QUFFbEIsZUFBSyxPQUFMLEdBQWUsT0FBTyxPQUFQLENBRkc7QUFHbEIsZUFBSyxpQkFBTCxHQUhrQjtTQUFwQjs7QUFUVyxnQ0FpQlgsbURBQW9CLEdBQUcsV0FBVztBQUNoQyxjQUFJLE9BQUosQ0FEZ0M7QUFFaEMsY0FBSSxPQUFKLENBRmdDO0FBR2hDLGNBQUksSUFBSSxFQUFKLENBSDRCO0FBSWhDLGNBQUksT0FBTyxDQUFQLENBSjRCO0FBS2hDLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUNGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixHQUFsQixDQUE1QixFQUFvRDtBQUNsRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBTixDQUQ4QztBQUVsRCxxQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixTQUF4QixDQUFrQyxNQUFsQyxFQUEwQyxHQUE5RCxFQUFtRTtBQUNqRSxzQkFBSSxRQUFTLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsQ0FBbEMsRUFBcUMsR0FBckMsR0FBeUMsS0FBSyxRQUFMLENBQWMsU0FBZCxFQUEwQjtBQUM5RSw4QkFBVSxLQUFLLFFB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
