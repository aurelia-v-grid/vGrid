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
          this.mainKeyDown();
          this.overrideClick = false;
          this.count = 0;
        }

        VGridCellEdit.prototype.getRow = function getRow(e, direction) {
          var thisTop;
          var element;
          var x = 10;
          var node = e;
          for (var i = 0; i < x; i++) {
            try {
              if (node.classList.contains(this._private.css.row)) {
                for (var y = 0; y < this._private.htmlCache.rowsArray.length; y++) {
                  if (node.style.transform === this._private.htmlCache.rowsArray[y].div.style.transform) {
                    thisTop = this._private.htmlCache.rowsArray[y].top;
                    element = this._private.htmlCache.rowsArray[y + direction].div;
                  }
                }
              }
              node = node.offsetParent;
            } catch (x) {}
          }

          var rowHeight = this._private.rowHeight;
          var currentRow = Math.round(thisTop / rowHeight);
          if (element) {
            this.cells = element.querySelectorAll("." + this._private.css.cellContent);
          }
        };

        VGridCellEdit.prototype.mainKeyDown = function mainKeyDown() {

          this.element.onkeydown = function (e) {
            var _this = this;

            if (e.keyCode === 40) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.count = 0;
                  _this.timer = null;

                  if (_this.curElement) {
                    _this.oldElement = _this.curElement;
                    _this.curElement.setAttribute("readonly", "false");
                    _this.curElement.classList.remove("vGrid-editCell");
                    _this.curElement.classList.remove("vGrid-editCell-write");

                    _this.getRow(_this.curElement, +1);

                    if (_this.type === "dblclick") {} else {
                      _this.overrideClick = true;
                    }
                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    _this.cells[_this.index].dispatchEvent(event);
                  }
                }, 150);
              }
            }

            if (e.keyCode === 38) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.count = 0;
                  _this.timer = null;

                  if (_this.curElement) {
                    _this.oldElement = _this.curElement;
                    _this.curElement.setAttribute("readonly", "false");
                    _this.curElement.classList.remove("vGrid-editCell");
                    _this.curElement.classList.remove("vGrid-editCell-write");

                    _this.getRow(_this.curElement, -1);

                    if (_this.type === "dblclick") {} else {
                      _this.overrideClick = true;
                    }
                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    _this.cells[_this.index].dispatchEvent(event);
                  }
                }, 150);
              }
            }

            if (e.keyCode === 9 && e.shiftKey === true) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.count = 0;
                  _this.timer = null;

                  if (_this.curElement) {
                    _this.oldElement = _this.curElement;
                    _this.curElement.setAttribute("readonly", "false");
                    _this.curElement.classList.remove("vGrid-editCell");
                    _this.curElement.classList.remove("vGrid-editCell-write");
                    _this.index = _this.index - 1;
                    if (_this.first) {
                      _this.index = _this.cells.length - 1;
                      _this.getRow(_this.curElement, -1);
                    }

                    if (_this.type === "dblclick") {} else {
                      _this.overrideClick = true;
                    }
                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    _this.cells[_this.index].dispatchEvent(event);
                  }
                }, 150);
              }
            }

            if (e.keyCode === 9 && e.shiftKey === false) {
              e.preventDefault();

              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.count = 0;
                  _this.timer = null;

                  if (_this.curElement) {
                    _this.oldElement = _this.curElement;
                    _this.curElement.setAttribute("readonly", "false");
                    _this.curElement.classList.remove("vGrid-editCell");
                    _this.curElement.classList.remove("vGrid-editCell-write");
                    _this.curElement.classList.remove("vGrid-editCell-focus");
                    _this.index = _this.index + 1;
                    if (_this.last) {
                      _this.index = 0;
                      _this.getRow(_this.curElement, 1);
                    }

                    if (_this.type === "dblclick") {} else {
                      _this.overrideClick = true;
                    }
                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    _this.cells[_this.index].dispatchEvent(event);
                  }
                }, 150);
              }
            }
          }.bind(this);
        };

        VGridCellEdit.prototype.elementBlur = function elementBlur() {

          this.curElement.classList.remove("vGrid-editCell");
          this.callbackDone(this.callbackObject());
        };

        VGridCellEdit.prototype.elementKeyDown = function elementKeyDown() {
          var _this2 = this;

          this.curElement.onkeydown = function (e) {
            if (e.keyCode == 13) {
              _this2.elementBlur();
              return false;
            }
            if (_this2.readOnly === true && e.keyCode !== 9) {
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
          var _this3 = this;

          this.curElement.onkeyup = function (ex) {
            _this3.callbackKey(_this3.callbackObject());
          };
        };

        VGridCellEdit.prototype.editCellhelper = function editCellhelper(e, readOnly, callbackDone, callbackKey) {
          var _this4 = this;

          if (!this._private) {
            this._private = this.parent.gridContext.ctx._private;
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

            setTimeout(function () {
              _this4._private.htmlCache.header.scrollLeft = _this4._private.htmlCache.content.scrollLeft;
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

            if (e.type === "dblclick" && !this.overrideClick) {
              if (e.target.classList.contains("vGrid-editCell-focus")) {
                e.target.classList.remove("vGrid-editCell-focus");
              }

              e.target.removeAttribute("readonly");
              e.target.classList.add("vGrid-editCell");
              e.target.classList.add("vGrid-editCell-write");
            } else {
              if (!this.overrideClick) {
                e.target.classList.add("vGrid-editCell-focus");
              }
              if (this.overrideClick && e.type === "dblclick") {
                e.target.classList.add("vGrid-editCell-focus");
              }
            }

            if (this.overrideClick) {
              this.overrideClick = false;
              this.type = "click";
              e.target.classList.add("vGrid-editCell");
            }

            this.elementKeyUp();
            this.elementKeyDown();
            this.curElement.onblur = function (e) {
              e.target.setAttribute("readonly", "false");
              e.target.classList.remove("vGrid-editCell");
              e.target.classList.remove("vGrid-editCell-write");
              e.target.classList.remove("vGrid-editCell-focus");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBR2E7QUFHWCxpQkFIVyxhQUdYLENBQVksTUFBWixFQUFtQjtnQ0FIUixlQUdROztBQUNqQixlQUFLLE1BQUwsR0FBYSxNQUFiLENBRGlCO0FBRWpCLGVBQUssT0FBTCxHQUFlLE9BQU8sT0FBUCxDQUZFO0FBR2pCLGVBQUssV0FBTCxHQUhpQjtBQUlqQixlQUFLLGFBQUwsR0FBcUIsS0FBckIsQ0FKaUI7QUFLakIsZUFBSyxLQUFMLEdBQWEsQ0FBYixDQUxpQjtTQUFuQjs7QUFIVyxnQ0FpQlgseUJBQU8sR0FBRyxXQUFXO0FBQ25CLGNBQUksT0FBSixDQURtQjtBQUVuQixjQUFJLE9BQUosQ0FGbUI7QUFHbkIsY0FBSSxJQUFJLEVBQUosQ0FIZTtBQUluQixjQUFJLE9BQU8sQ0FBUCxDQUplO0FBS25CLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUVGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixHQUFsQixDQUE1QixFQUFvRDtBQUNsRCxxQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixTQUF4QixDQUFrQyxNQUFsQyxFQUEwQyxHQUE5RCxFQUFtRTtBQUNqRSxzQkFBSSxLQUFLLEtBQUwsQ0FBVyxTQUFYLEtBQXlCLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsQ0FBbEMsRUFBcUMsR0FBckMsQ0FBeUMsS0FBekMsQ0FBK0MsU0FBL0MsRUFBMEQ7QUFDckYsOEJBQVUsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixTQUF4QixDQUFrQyxDQUFsQyxFQUFxQyxHQUFyQyxDQUQyRTtBQUVyRiw4QkFBVSxLQUFLLFFBQUwsQ0FB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
