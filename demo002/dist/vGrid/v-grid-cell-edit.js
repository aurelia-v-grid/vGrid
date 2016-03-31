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

        VGridCellEdit.prototype.addGridKeyListner = function addGridKeyListner() {

          this.element.onkeydown = function (e) {
            var _this = this;

            console.log(e.keyCode);

            if (e.keyCode === 40) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.timer = null;
                  if (_this.curElement) {
                    _this.removeEditCssClasses(_this.curElement);
                    _this.top = _this.setCellsFromElement(_this.curElement, +1);
                    _this.dispatchCellClick(_this.index);
                  }
                }, 150);
              }
            }

            if (e.keyCode === 39 && !this.editMode) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.timer = null;
                  if (_this.curElement) {
                    _this.removeEditCssClasses(_this.curElement);
                    if (!_this.last) {
                      _this.dispatchCellClick(_this.index + 1);
                    }
                  }
                }, 150);
              }
            }

            if (e.keyCode === 37 && !this.editMode) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.timer = null;
                  if (_this.curElement) {
                    _this.removeEditCssClasses(_this.curElement);
                    if (!_this.first) {
                      _this.dispatchCellClick(_this.index - 1);
                    }
                  }
                }, 150);
              }
            }

            if (e.keyCode === 38) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.timer = null;
                  if (_this.curElement) {
                    _this.removeEditCssClasses(_this.curElement);
                    _this.top = _this.setCellsFromElement(_this.curElement, -1);
                    _this.dispatchCellClick(_this.index);
                  }
                }, 150);
              }
            }

            if (e.keyCode === 9 && e.shiftKey === true) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.timer = null;
                  if (_this.curElement) {
                    _this.removeEditCssClasses(_this.curElement);
                    _this.index = _this.index - 1;
                    if (_this.first) {
                      _this.index = _this.cells.length - 1;
                      _this.top = _this.setCellsFromElement(_this.curElement, -1);
                    }
                    _this.dispatchCellClick(_this.index);
                  }
                }, 150);
              }
            }

            if (e.keyCode === 9 && e.shiftKey === false) {
              e.preventDefault();
              if (!this.timer) {
                this.timer = setTimeout(function () {
                  _this.timer = null;
                  if (_this.curElement) {
                    _this.removeEditCssClasses(_this.curElement);
                    _this.index = _this.index + 1;
                    if (_this.last) {
                      _this.index = 0;
                      _this.top = _this.setCellsFromElement(_this.curElement, 1);
                    }
                    _this.dispatchCellClick(_this.index);
                  }
                }, 150);
              }
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
              _this4.removeEditCssClasses(e.target);
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
//# sourceMappingURL=data:application/json;base64,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QUFMLEtBQWMsVUFBZCxJQUE0QixLQUFLLFFBQUwsRUFBZTtBQUM3QyxtQkFBSyxRQUFMLEdBQWdCLElBQWhCLENBRDZDO0FBRTdDLGtCQUFJLEVBQUUsTUFBRixDQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsc0JBQTVCLENBQUosRUFBeUQ7QUFDdkQsa0JBQUUsTUFBRixDQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsc0JBQTFCLEVBRHVEO2VBQXpEO0FBR0EsZ0JBQUUsTUFBRixDQUFTLGVBQVQsQ0FBeUIsVUFBekIsRUFMNkM7YUFBL0MsTUFNTztBQUNMLGtCQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLHNCQUF2QixFQURLO2VBTlA7O0FBVUEsaUJBQUssWUFBTCxHQW5EOEQ7QUFvRDlELGlCQUFLLGNBQUwsR0FwRDhEO0FBcUQ5RCxpQkFBSyxVQUFMLENBQWdCLE1BQWhCLEdBQXlCLFVBQUMsQ0FBRCxFQUFNO0FBQzdCLHFCQUFLLG9CQUFMLENBQTBCLEVBQUUsTUFBRixDQUExQixDQUQ2QjthQUFOLENBckRxQzs7QUF5RDlELGlCQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsR0F6RDhEO1dBQWhFOzs7ZUFqUFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtZWRpdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
