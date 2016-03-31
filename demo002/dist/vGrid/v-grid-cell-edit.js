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
//# sourceMappingURL=data:application/json;base64,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QixJQUFoQixDQUQ2QztBQUU3QyxrQkFBSSxFQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLFFBQW5CLENBQTRCLHNCQUE1QixDQUFKLEVBQXlEO0FBQ3ZELGtCQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLHNCQUExQixFQUR1RDtlQUF6RDtBQUdBLGdCQUFFLE1BQUYsQ0FBUyxlQUFULENBQXlCLFVBQXpCLEVBTDZDO2FBQS9DLE1BTU87QUFDTCxrQkFBRSxNQUFGLENBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixzQkFBdkIsRUFESztlQU5QOztBQVVBLGlCQUFLLFlBQUwsR0FuRDhEO0FBb0Q5RCxpQkFBSyxjQUFMLEdBcEQ4RDtBQXFEOUQsaUJBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixVQUFDLENBQUQsRUFBTTtBQUM3QixxQkFBSyxvQkFBTCxDQUEwQixFQUFFLE1BQUYsQ0FBMUIsQ0FENkI7YUFBTixDQXJEcUM7O0FBeUQ5RCxpQkFBSyxVQUFMLENBQWdCLEtBQWhCLEdBekQ4RDtXQUFoRTs7O2VBcFVTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
