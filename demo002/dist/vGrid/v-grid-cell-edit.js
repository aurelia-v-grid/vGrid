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
          this.editMode = false;
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
                    thisTop = this._private.htmlCache.rowsArray[y + direction].top;
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

          return thisTop;
        };

        VGridCellEdit.prototype.getElement = function getElement(top) {

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

        VGridCellEdit.prototype.mainKeyDown = function mainKeyDown() {

          this.element.onkeydown = function (e) {
            var _this = this;

            console.log(e.keyCode);

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

                    _this.top = _this.getRow(_this.curElement, +1);

                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    _this.setAsSingleClick = true;
                    _this.cells[_this.index].dispatchEvent(event);
                  }
                }, 150);
              }
            }

            if (e.keyCode === 39 && !this.editMode) {
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

                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    if (!_this.last) {
                      _this.setAsSingleClick = true;
                      _this.cells[_this.index + 1].dispatchEvent(event);
                    }
                  }
                }, 150);
              }
            }

            if (e.keyCode === 37 && !this.editMode) {
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

                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    if (!_this.first) {
                      _this.setAsSingleClick = true;
                      _this.cells[_this.index - 1].dispatchEvent(event);
                    }
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

                    _this.top = _this.getRow(_this.curElement, -1);

                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    _this.setAsSingleClick = true;
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
                      _this.top = _this.getRow(_this.curElement, -1);
                    }
                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    _this.setAsSingleClick = true;
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
                      _this.top = _this.getRow(_this.curElement, 1);
                    }
                    var event = new MouseEvent('dblclick', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    _this.setAsSingleClick = true;
                    _this.cells[_this.index].dispatchEvent(event);
                  }
                }, 150);
              }
            }
          }.bind(this);
        };

        VGridCellEdit.prototype.elementBlur = function elementBlur() {
          this.curElement.setAttribute("readonly", "false");
          this.curElement.classList.remove("vGrid-editCell");
          this.curElement.classList.remove("vGrid-editCell-write");
          this.curElement.classList.remove("vGrid-editCell-focus");
          this.top = this.getRow(this.curElement, 0);
          this.callbackDone(this.callbackObject());
          this.editMode = false;
          this.getElement(this.top);
          var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
          this.cells[this.index].dispatchEvent(event);
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

          console.log("clickcell");
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

            console.log(e.type);
            if (this.setAsSingleClick) {
              this.setAsSingleClick = false;
              this.type = "click";
            }

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

            if (this.type === "dblclick" || this.editMode) {
              this.editMode = true;
              if (e.target.classList.contains("vGrid-editCell-focus")) {
                e.target.classList.remove("vGrid-editCell-focus");
              }

              e.target.removeAttribute("readonly");
              e.target.classList.add("vGrid-editCell");
              e.target.classList.add("vGrid-editCell-write");
            } else {
              e.target.classList.add("vGrid-editCell");
              e.target.classList.add("vGrid-editCell-write");
              e.target.classList.add("vGrid-editCell-focus");
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
//# sourceMappingURL=data:application/json;base64,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RSxNQUFGLENBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixzQkFBdkIsRUFGSztBQUdILGdCQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLHNCQUF2QixFQUhHO2FBVlA7O0FBa0JBLGlCQUFLLFlBQUwsR0ExRDhEO0FBMkQ5RCxpQkFBSyxjQUFMLEdBM0Q4RDtBQTREOUQsaUJBQUssVUFBTCxDQUFnQixNQUFoQixHQUF1QixVQUFDLENBQUQsRUFBSztBQUMxQixnQkFBRSxNQUFGLENBQVMsWUFBVCxDQUFzQixVQUF0QixFQUFpQyxPQUFqQyxFQUQwQjtBQUUxQixnQkFBRSxNQUFGLENBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixnQkFBMUIsRUFGMEI7QUFHMUIsZ0JBQUUsTUFBRixDQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsc0JBQTFCLEVBSDBCO0FBSTFCLGdCQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLHNCQUExQixFQUowQjthQUFMLENBNUR1QztBQW9FOUQsaUJBQUssVUFBTCxDQUFnQixLQUFoQixHQXBFOEQ7V0FBaEU7OztlQXpVUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC1lZGl0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
