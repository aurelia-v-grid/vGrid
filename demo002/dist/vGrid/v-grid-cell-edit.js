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
              node = node.offsetParent;
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

        VGridCellEdit.prototype.removeEditCssClasses = function removeEditCssClasses(element) {
          element.setAttribute("readonly", "false");
          element.classList.remove(this.vGrid.vGridConfig.css.editCell);
          element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
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

          this.vGrid.element.onkeydown = function (e) {
            var _this2 = this;

            if (e.keyCode === 33) {
              e.preventDefault();
              this.updateBeforeNext(this.callbackObject());
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

                  var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
                  var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);
                  var buffer = parseInt(containerHeight / 2, 10);
                  if (currentscrolltop !== _this2.vGrid.vGridConfig.getCollectionLength() * rowHeight - containerHeight) {}

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.vGrid.vGridGenerator.setScrollTop(currentscrolltop - (containerHeight - buffer));
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
              this.updateBeforeNext(this.callbackObject());
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

                  var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
                  var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);
                  var buffer = parseInt(containerHeight / 2, 10);
                  if (currentscrolltop === 0) {}

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.vGrid.vGridGenerator.setScrollTop(currentscrolltop + (containerHeight - buffer));
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
          this.updateCurrentDone(this.callbackObject());
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

        VGridCellEdit.prototype.formatHandler = function formatHandler(type, obj) {

          switch (type) {
            case "beforeEdit":
              if (this.vGrid.vGridConfig.eventFormatHandler) {
                return this.vGrid.$parent[this.vGrid.vGridConfig.eventFormatHandler](type, obj);
              } else {
                return obj;
              }
              break;
            case "afterEdit":
              if (this.vGrid.vGridConfig.eventFormatHandler) {
                return this.vGrid.$parent[this.vGrid.vGridConfig.eventFormatHandler](type, {
                  attribute: this.attribute,
                  value: this.curElement.value,
                  oldValue: this.vGrid.collectionFiltered[this.row][this.attribute],
                  element: this.curElement
                });
              } else {
                return obj;
              }
              break;
            default:
              return obj;
          }
        };

        VGridCellEdit.prototype.callbackObject = function callbackObject() {

          return {
            attribute: this.attribute,
            value: this.curElement.value,
            oldValue: this.oldValue,
            element: this.curElement
          };
        };

        VGridCellEdit.prototype.onScroll = function onScroll() {
          if (this.updated === false) {
            this.updateActual(this.callbackObject());
          }
        };

        VGridCellEdit.prototype.setBackFocus = function setBackFocus() {
          if (this.curElement) {
            var rowNo = this.vGrid.filterRow;
            var rowheight = this.vGrid.vGridConfig.rowHeight;
            this.setCellsFromTopValue(rowNo * rowheight);
            if (this.cells.length > 0) {
              this.curElement = this.cells[this.index];

              if (!this.cells[this.index].classList.contains(this.vGrid.vGridConfig.css.editCell)) {
                this.cells[this.index].classList.add(this.vGrid.vGridConfig.css.editCell);
              }

              if (!this.cells[this.index].classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
                this.cells[this.index].classList.add(this.vGrid.vGridConfig.css.editCellWrite);
              }

              if (this.editMode) {
                if (this.readOnly === false) {
                  if (this.cells[this.index].classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
                    this.cells[this.index].classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
                  }
                  this.cells[this.index].removeAttribute("readonly");
                  if (this.attributeType !== "image") {
                    this.beforeCellEdit({
                      attribute: this.attribute,
                      value: this.curElement.value,
                      oldValue: this.vGrid.collectionFiltered[this.row][this.attribute],
                      element: this.curElement
                    });
                  }
                } else {
                  this.cells[this.index].classList.add(this.vGrid.vGridConfig.css.editCellFocus);
                }
              } else {
                this.cells[this.index].classList.add(this.vGrid.vGridConfig.css.editCellFocus);
              }
            }
          }
        };

        VGridCellEdit.prototype.updateCurrentDone = function updateCurrentDone(obj) {
          if (this.attributeType !== "image" && this.editMode) {
            obj = this.formatHandler("afterEdit", obj);
            this.vGrid.skipNextUpdateProperty.push(obj.attribute);
            this.vGrid.currentRowEntity[obj.attribute] = obj.value;
            this.vGrid.currentEntity[obj.attribute] = obj.value;
            this.vGrid.vGridGenerator.updateRow(this.vGrid.filterRow, true);
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.updateBeforeNext = function updateBeforeNext(obj) {

          if (this.attributeType !== "image" && this.editMode) {
            obj = this.formatHandler("afterEdit", obj);
            this.vGrid.collectionFiltered[this.row][obj.attribute] = obj.value;
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.updateLastRow = function updateLastRow(row) {
          this.vGrid.vGridGenerator.updateRow(row, true);
        };

        VGridCellEdit.prototype.updateActual = function updateActual(obj) {
          if (obj.oldValue !== obj.value && this.attributeType !== "image" && this.editMode) {
            obj = this.formatHandler("afterEdit", obj);
            this.vGrid.skipNextUpdateProperty.push(obj.attribute);

            this.vGrid.currentRowEntity[obj.attribute] = obj.value;
            this.vGrid.currentEntity[obj.attribute] = obj.value;
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.beforeCellEdit = function beforeCellEdit(obj) {
          obj = this.formatHandler("beforeEdit", obj);
          if (obj.newValue) {
            obj.element.value = obj.newValue;
          }
        };

        VGridCellEdit.prototype.editCellhelper = function editCellhelper(row, e, readOnly) {
          var _this4 = this;

          this.newTarget = e.target;

          if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {
            if (this.curElement) {
              this.removeEditCssClasses(this.curElement);
              if (this.row !== row) {
                this.updateBeforeNext(this.callbackObject());

                this.updateLastRow(this.row);
              } else {
                if (this.curElement !== this.newTarget && this.updated !== false) {
                  this.updateActual(this.callbackObject());
                }
              }
            }

            this.attribute = this.newTarget.getAttribute(this.vGrid.vGridConfig.atts.dataAttribute);
            if (this.attribute === "image") {
              this.newTarget = this.newTarget.offsetParent;
              this.newTarget.setAttribute("tabindex", 0);
            }

            this.readOnly = readOnly;
            this.index = this.vGrid.vGridConfig.attributeArray.indexOf(this.attribute);
            this.type = e.type;
            this.attributeType = this.vGrid.vGridConfig.colTypeArray[this.index];

            if (!this.newTarget.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
              this.newTarget.classList.add(this.vGrid.vGridConfig.css.editCell);
            }

            if (!this.newTarget.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
              this.newTarget.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
            }

            if (this.type === "dblclick" || this.editMode) {
              if (this.readOnly === false && this.attributeType !== "image") {
                if (this.curElement !== this.newTarget || this.editMode === false) {
                  if (this.attributeType !== "image") {
                    this.beforeCellEdit({
                      attribute: this.attribute,
                      value: this.newTarget.value,
                      oldValue: this.vGrid.collectionFiltered[row][this.attribute],
                      element: this.newTarget
                    });
                  }
                }

                if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
                  this.newTarget.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
                }
                this.newTarget.removeAttribute("readonly");
              } else {
                  this.newTarget.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
                }

              this.editMode = true;
            } else {
              this.newTarget.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
            }

            this.updated = false;
            this.row = row;
            this.curElement = this.newTarget;
            this.oldValue = this.newTarget.value;
            this.cells = this.curElement.offsetParent.offsetParent.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);

            if (this.setAsSingleClick) {
              this.setAsSingleClick = false;
              this.type = "click";
            }

            setTimeout(function () {
              _this4.vGrid.vGridGenerator.htmlCache.header.scrollLeft = _this4.vGrid.vGridGenerator.htmlCache.content.scrollLeft;
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

            this.curElement.focus();
            if (this.editMode) {
              this.elementKeyDown();
              this.curElement.select();
            }
          }
        };

        return VGridCellEdit;
      }());

      _export("VGridCellEdit", VGridCellEdit);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
