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

                    var event = new MouseEvent('click', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
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

                    var event = new MouseEvent('click', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    if (!_this.last) {
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

                    var event = new MouseEvent('click', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': true
                    });
                    if (!_this.first) {
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

                    var event = new MouseEvent('click', {
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
                      _this.top = _this.getRow(_this.curElement, -1);
                    }
                    var event = new MouseEvent('click', {
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
                      _this.top = _this.getRow(_this.curElement, 1);
                    }
                    var event = new MouseEvent('click', {
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

            if (e.type === "dblclick" || this.editMode) {
              this.editMode = true;
              if (e.target.classList.contains("vGrid-editCell-focus")) {
                e.target.classList.remove("vGrid-editCell-focus");
              }

              e.target.removeAttribute("readonly");
              e.target.classList.add("vGrid-editCell");
              e.target.classList.add("vGrid-editCell-write");
            } else {
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
//# sourceMappingURL=data:application/json;base64,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
