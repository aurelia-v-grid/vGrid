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
          var elementX = void 0;
          if (element.offsetParent) {
            elementX = element.offsetParent;
          } else {
            elementX = element.parentNode;
          }
          elementX.classList.remove(this.vGrid.vGridConfig.css.editCell);
          elementX.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          elementX.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
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
                  if (currentscrolltop !== _this2.vGrid.vGridConfig.getCollectionLength() * rowHeight - containerHeight) {
                    buffer = buffer;
                  }

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
                  if (currentscrolltop !== 0) {
                    buffer = buffer * 2;
                  }

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

              if (!this.cells[this.index].offsetParent.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
                this.cells[this.index].offsetParent.classList.add(this.vGrid.vGridConfig.css.editCell);
              }

              if (!this.cells[this.index].offsetParent.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
                this.cells[this.index].offsetParent.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
              }

              if (this.editMode) {
                if (this.readOnly === false) {
                  if (this.cells[this.index].offsetParent.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
                    this.cells[this.index].offsetParent.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
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
                  this.cells[this.index].offsetParent.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
                }
              } else {
                this.cells[this.index].offsetParent.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
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
          if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.rowCell)) {
            if (e.target.children.length > 0) {
              this.newTarget = e.target.firstChild;
            }
          }

          if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {
            if (this.curElement) {
              if (this.curElement) {
                this.removeEditCssClasses(this.curElement);
              }

              if (this.row !== row) {
                this.updateBeforeNext(this.callbackObject());

                this.updateLastRow(this.row);
              } else {
                if (this.curElement !== this.newTarget && this.updated !== false) {
                  if (this.curElement) {
                    this.updateActual(this.callbackObject());
                  }
                }
              }
            }

            this.attribute = this.newTarget.getAttribute(this.vGrid.vGridConfig.atts.dataAttribute);
            this.attributeType = this.vGrid.vGridConfig.colTypeArray[this.index];
            this.newTarget.setAttribute("tabindex", 0);

            this.readOnly = readOnly;
            this.index = this.vGrid.vGridConfig.attributeArray.indexOf(this.attribute);
            this.type = e.type;

            if (!this.newTarget.offsetParent.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
              this.newTarget.offsetParent.classList.add(this.vGrid.vGridConfig.css.editCell);
            }

            if (!this.newTarget.offsetParent.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
              this.newTarget.offsetParent.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
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

                if (this.newTarget.offsetParent.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
                  this.newTarget.offsetParent.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
                }
                e.target.removeAttribute("readonly");
              } else {
                  this.newTarget.offsetParent.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
                }
              if (this.attributeType === "checkbox") {
                this.newTarget.disabled = false;
              }

              this.editMode = true;
            } else {
              if (this.attributeType === "checkbox") {
                this.newTarget.disabled = true;
              }

              this.newTarget.offsetParent.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
            }

            this.updated = false;
            this.row = row;
            this.curElement = this.newTarget;
            this.oldValue = this.curElement.value;
            this.cells = this.curElement.offsetParent.offsetParent.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);

            if (this.curElement.offsetParent.offsetLeft > this.vGrid.vGridGenerator.htmlCache.content.clientWidth) {
              this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.offsetParent.offsetLeft;
            }
            if (this.vGrid.vGridGenerator.htmlCache.content.scrollLeft > 0 && this.vGrid.vGridGenerator.htmlCache.content.clientWidth > this.curElement.offsetParent.offsetLeft) {
              this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.offsetParent.offsetLeft;
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
              if (this.curElement.select) {
                if (this.type === "dblclick") {
                  this.curElement.select();
                }
              }
            }
          }
        };

        return VGridCellEdit;
      }());

      _export("VGridCellEdit", VGridCellEdit);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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U0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsR0FBeUQsS0FBSyxVQUFMLENBQWdCLFlBQWhCLENBQTZCLFVBQTdCLENBRDRDO2FBQXZHO0FBR0EsZ0JBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUE1QyxHQUF5RCxDQUF6RCxJQUE4RCxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFdBQTVDLEdBQTBELEtBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixVQUE3QixFQUF5QztBQUNuSyxtQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUE1QyxHQUF5RCxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsVUFBN0IsQ0FEMEc7YUFBcks7O0FBUUEsdUJBQVcsWUFBSztBQUNkLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE1BQXBDLENBQTJDLFVBQTNDLEdBQXdELE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsQ0FEMUM7YUFBTCxFQUVSLEVBRkgsRUF0RzZFOztBQTJHN0UsZ0JBQUksS0FBSyxLQUFMLEtBQWUsS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixDQUFwQixFQUF1QjtBQUN4QyxtQkFBSyxJQUFMLEdBQVksSUFBWixDQUR3QzthQUExQyxNQUVPO0FBQ0wsbUJBQUssSUFBTCxHQUFZLEtBQVosQ0FESzthQUZQO0FBS0EsZ0JBQUksS0FBSyxLQUFMLEtBQWUsQ0FBZixFQUFrQjtBQUNwQixtQkFBSyxLQUFMLEdBQWEsSUFBYixDQURvQjthQUF0QixNQUVPO0FBQ0wsbUJBQUssS0FBTCxHQUFhLEtBQWIsQ0FESzthQUZQOztBQVVBLGlCQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsR0ExSDZFO0FBMkg3RSxnQkFBSSxLQUFLLFFBQUwsRUFBZTtBQUNqQixtQkFBSyxjQUFMLEdBRGlCO0FBRWpCLGtCQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixFQUF3QjtBQUMxQixvQkFBRyxLQUFLLElBQUwsS0FBYyxVQUFkLEVBQXlCO0FBQzFCLHVCQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FEMEI7aUJBQTVCO2VBREY7YUFGRjtXQTNIRjs7O2VBcmdCUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC1lZGl0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
