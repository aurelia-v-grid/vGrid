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
          this.filter = false;
          this.scrollChecked = false;

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
              node = node.parentNode;
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
          if (element.parentNode) {
            elementX = element.parentNode;
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

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.vGrid.vGridGenerator.setScrollTop(currentscrolltop - containerHeight);
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

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.vGrid.vGridGenerator.setScrollTop(currentscrolltop + containerHeight);
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
          if (this.scrollChecked === false) {
            this.scrollChecked === true;
            if (this.curElement) {
              if (this.curElement.parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellFocus) || this.curElement.parentNode.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
                this.removeEditCssClasses(this.curElement);
              }
            }
          }
        };

        VGridCellEdit.prototype.setBackFocus = function setBackFocus(filter) {
          this.filter = filter;
          this.scrollChecked = false;
          if (this.curElement) {
            var rowNo = this.vGrid.filterRow;
            var rowheight = this.vGrid.vGridConfig.rowHeight;
            this.setCellsFromTopValue(rowNo * rowheight);
            if (this.cells.length > 0) {
              this.curElement = this.cells[this.index];

              if (!this.cells[this.index].parentNode.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
                this.cells[this.index].parentNode.classList.add(this.vGrid.vGridConfig.css.editCell);
              }

              if (!this.cells[this.index].parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
                this.cells[this.index].parentNode.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
              }

              if (this.editMode) {
                if (this.readOnly === false) {
                  if (this.cells[this.index].parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
                    this.cells[this.index].parentNode.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
                  }
                  this.cells[this.index].removeAttribute("readonly");
                  if (this.attributeType !== "image" && this.vGrid.collectionFiltered[this.row]) {
                    this.beforeCellEdit({
                      attribute: this.attribute,
                      value: this.curElement.value,
                      oldValue: this.vGrid.collectionFiltered[this.row][this.attribute],
                      element: this.curElement
                    });
                  }
                  if (this.filter) {
                    this.filter = false;
                    this.beforeCellEdit({
                      attribute: this.attribute,
                      value: this.curElement.value,
                      oldValue: this.vGrid.collectionFiltered[rowNo][this.attribute],
                      element: this.curElement
                    });
                  }
                } else {
                  this.cells[this.index].parentNode.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
                }
              } else {
                this.cells[this.index].parentNode.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
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

          if (this.attributeType !== "image" && this.editMode && !this.updated) {
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

          this.scrollChecked = false;

          if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {
            if (this.curElement) {
              if (this.curElement) {
                this.removeEditCssClasses(this.curElement);
              }

              if (this.row !== row) {
                this.updateBeforeNext(this.callbackObject());

                this.updateLastRow(this.row);
              } else {
                if (this.curElement !== this.newTarget && this.updated === false) {
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

            if (!this.newTarget.parentNode.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
              this.newTarget.parentNode.classList.add(this.vGrid.vGridConfig.css.editCell);
            }

            if (!this.newTarget.parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
              this.newTarget.parentNode.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
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

                if (this.newTarget.parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
                  this.newTarget.parentNode.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
                }
                e.target.removeAttribute("readonly");
              } else {
                  this.newTarget.parentNode.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
                }

              this.editMode = true;
            } else {
              this.newTarget.parentNode.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
            }

            this.updated = false;
            this.row = row;
            this.curElement = this.newTarget;
            this.oldValue = this.curElement.value;
            this.cells = this.curElement.parentNode.parentNode.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);

            if (this.curElement.parentNode.offsetLeft > this.vGrid.vGridGenerator.htmlCache.content.clientWidth) {
              this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.parentNode.offsetLeft;
            }
            if (this.vGrid.vGridGenerator.htmlCache.content.scrollLeft > 0 && this.vGrid.vGridGenerator.htmlCache.content.clientWidth > this.curElement.parentNode.offsetLeft) {
              this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.parentNode.offsetLeft;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBT2E7QUFVWCxpQkFWVyxhQVVYLENBQVksS0FBWixFQUFtQjtnQ0FWUixlQVVROztlQVBuQixRQUFRLENBQUMsQ0FBRCxDQU9XO2VBTm5CLE9BQU8sQ0FBQyxDQUFELENBTVk7ZUFMbkIsV0FBVyxNQUtRO2VBSm5CLFNBQVMsS0FJVTtlQUhuQixTQUFTLE1BR1U7ZUFGbkIsZ0JBQWdCLE1BRUc7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7QUFFakIsZUFBSyxpQkFBTCxHQUZpQjtTQUFuQjs7QUFWVyxnQ0FtQlgsbURBQW9CLEdBQUcsV0FBVztBQUNoQyxjQUFJLE9BQUosQ0FEZ0M7QUFFaEMsY0FBSSxPQUFKLENBRmdDO0FBR2hDLGNBQUksSUFBSSxFQUFKLENBSDRCO0FBSWhDLGNBQUksT0FBTyxDQUFQLENBSjRCO0FBS2hDLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUNGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixHQUEzQixDQUE1QixFQUE2RDtBQUMzRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBTixDQUR1RDtBQUUzRCxxQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxNQUE5QyxFQUFzRCxHQUExRSxFQUErRTtBQUM3RSxzQkFBSSxRQUFRLFNBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxDQUE5QyxFQUFpRCxHQUFqRCxHQUF1RCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLENBQXpFLEVBQTZHO0FBQy9HLDhCQUFVLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsU0FBcEMsQ0FBOEMsSUFBSSxTQUFKLENBQTlDLENBQTZELEdBQTdELENBRHFHO0FBRS9HLDhCQUFVLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsU0FBcEMsQ0FBOEMsSUFBSSxTQUFKLENBQTlDLENBQTZELEdBQTdELENBRnFHO21CQUFqSDtpQkFERjtlQUZGO0FBU0EscUJBQU8sS0FBSyxVQUFMLENBVkw7YUFBSixDQVdFLE9BQU8sQ0FBUCxFQUFVLEVBQVY7V0FaSjtBQWVBLGNBQUksT0FBSixFQUFhO0FBQ1gsaUJBQUssS0FBTCxHQUFhLFFBQVEsZ0JBQVIsQ0FBeUIsTUFBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFdBQTNCLENBQTVDLENBRFc7V0FBYjtBQUdBLGlCQUFPLE9BQVAsQ0F2QmdDOzs7QUFuQnZCLGdDQWtEWCxxREFBcUIsS0FBSztBQUN4QixjQUFJLFVBQVUsQ0FBVixDQURvQjtBQUV4QixlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLFNBQXBDLENBQThDLE1BQTlDLEVBQXNELEdBQTFFLEVBQStFO0FBQzdFLGdCQUFJLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsU0FBcEMsQ0FBOEMsQ0FBOUMsRUFBaUQsR0FBakQsS0FBeUQsR0FBekQsRUFBOEQ7QUFDaEUsd0JBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxDQUE5QyxFQUFpRCxHQUFqRCxDQURzRDthQUFsRTtXQURGO0FBS0EsY0FBSSxPQUFKLEVBQWE7QUFDWCxpQkFBSyxLQUFMLEdBQWEsUUFBUSxnQkFBUixDQUF5QixNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsV0FBM0IsQ0FBNUMsQ0FEVztXQUFiOzs7QUF6RFMsZ0NBbUVYLHFEQUFxQixTQUFTO0FBQzVCLGtCQUFRLFlBQVIsQ0FBcUIsVUFBckIsRUFBaUMsT0FBakMsRUFENEI7QUFFNUIsY0FBSSxpQkFBSixDQUY0QjtBQUc1QixjQUFJLFFBQVEsVUFBUixFQUFvQjtBQUN0Qix1QkFBVyxRQUFRLFVBQVIsQ0FEVztXQUF4QixNQUVPO0FBQ0wsdUJBQVcsUUFBUSxVQUFSLENBRE47V0FGUDtBQUtBLG1CQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixRQUEzQixDQUExQixDQVI0QjtBQVM1QixtQkFBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsYUFBM0IsQ0FBMUIsQ0FUNEI7QUFVNUIsbUJBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQTFCLENBVjRCOzs7QUFuRW5CLGdDQXNGWCwrQ0FBa0IsT0FBTztBQUN2QixjQUFJLElBQUksU0FBUyxXQUFULENBQXFCLE9BQXJCLENBQUosQ0FEbUI7QUFFdkIsWUFBRSxTQUFGLENBQVksU0FBWixFQUF1QixJQUF2QixFQUE2QixJQUE3QixFQUZ1Qjs7QUFJdkIsY0FBSSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQUosRUFBdUI7QUFDckIsaUJBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsYUFBbEIsQ0FBZ0MsQ0FBaEMsRUFEcUI7V0FBdkI7OztBQTFGUyxnQ0FxR1gscUNBQWEsVUFBVTs7O0FBQ3JCLGNBQUksQ0FBQyxLQUFLLEtBQUwsRUFBWTtBQUNmLGlCQUFLLEtBQUwsR0FBYSxXQUFXLFlBQUs7QUFDM0Isb0JBQUssS0FBTCxHQUFhLElBQWIsQ0FEMkI7QUFFM0IseUJBRjJCO2FBQUwsRUFHckIsR0FIVSxDQUFiLENBRGU7V0FBakI7OztBQXRHUyxnQ0FtSFgsaURBQW9COztBQUVsQixlQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLFNBQW5CLEdBQStCLFVBQVUsQ0FBVixFQUFhOzs7QUFJMUMsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxFQUFrQjtBQUNwQixnQkFBRSxjQUFGLEdBRG9CO0FBRXBCLG1CQUFLLGdCQUFMLENBQXNCLEtBQUssY0FBTCxFQUF0QixFQUZvQjtBQUdwQixtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBRW5CLHNCQUFJLG1CQUFtQixPQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFlBQTFCLEVBQW5CLENBRmU7O0FBS25CLHNCQUFJLFlBQVksT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUxHO0FBTW5CLHNCQUFJLGtCQUFrQixPQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFlBQTVDLENBTkg7QUFPbkIsc0JBQUksZ0JBQWdCLFNBQVMsa0JBQWtCLFNBQWxCLEVBQTZCLEVBQXRDLENBQWhCLENBUGU7O0FBV25CLHlCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQVhtQjtBQVluQix5QkFBSyxHQUFMLEdBQVcsT0FBSyxtQkFBTCxDQUF5QixPQUFLLFVBQUwsRUFBaUIsQ0FBMUMsQ0FBWCxDQVptQjtBQWFuQix5QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixZQUExQixDQUF1QyxtQkFBb0IsZUFBcEIsQ0FBdkMsQ0FibUI7QUFjbkIsc0JBQUksU0FBUyxPQUFLLEdBQUwsR0FBWSxnQkFBZ0IsU0FBaEIsQ0FkTjtBQWVuQixzQkFBSSxNQUFDLEdBQVMsU0FBVCxJQUF1QixDQUF4QixFQUEyQjtBQUM3Qiw2QkFBUyxDQUFULENBRDZCO21CQUEvQjtBQUdBLDZCQUFXLFlBQUs7QUFFZCwyQkFBSyxvQkFBTCxDQUEwQixNQUExQixFQUZjO0FBR2QsMkJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUFMLENBQXZCLENBSGM7bUJBQUwsRUFJUixHQUpILEVBbEJtQjtpQkFBckI7ZUFEZ0IsQ0FBbEIsQ0FIb0I7YUFBdEI7O0FBaUNBLGdCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWQsRUFBa0I7QUFDcEIsZ0JBQUUsY0FBRixHQURvQjtBQUVwQixtQkFBSyxnQkFBTCxDQUFzQixLQUFLLGNBQUwsRUFBdEIsRUFGb0I7QUFHcEIsbUJBQUssWUFBTCxDQUFrQixZQUFNO0FBQ3RCLG9CQUFJLE9BQUssVUFBTCxFQUFpQjtBQUVuQixzQkFBSSxtQkFBbUIsT0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixZQUExQixFQUFuQixDQUZlOztBQUtuQixzQkFBSSxZQUFZLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsQ0FMRztBQU1uQixzQkFBSSxrQkFBa0IsT0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxZQUE1QyxDQU5IO0FBT25CLHNCQUFJLGdCQUFnQixTQUFTLGtCQUFrQixTQUFsQixFQUE2QixFQUF0QyxDQUFoQixDQVBlOztBQVVuQix5QkFBSyxvQkFBTCxDQUEwQixPQUFLLFVBQUwsQ0FBMUIsQ0FWbUI7QUFXbkIseUJBQUssR0FBTCxHQUFXLE9BQUssbUJBQUwsQ0FBeUIsT0FBSyxVQUFMLEVBQWlCLENBQTFDLENBQVgsQ0FYbUI7QUFZbkIseUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsWUFBMUIsQ0FBdUMsbUJBQW9CLGVBQXBCLENBQXZDLENBWm1CO0FBYW5CLHNCQUFJLFNBQVMsT0FBSyxHQUFMLEdBQVksZ0JBQWdCLFNBQWhCLENBYk47QUFjbkIsc0JBQUksTUFBQyxHQUFTLFNBQVQsSUFBdUIsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixtQkFBdkIsRUFBeEIsRUFBc0U7QUFDeEUsNkJBQVMsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixtQkFBdkIsS0FBK0MsU0FBL0MsQ0FEK0Q7QUFFeEUsNkJBQVMsU0FBUyxTQUFULENBRitEO21CQUExRTtBQUlBLDZCQUFXLFlBQUs7QUFFZCwyQkFBSyxvQkFBTCxDQUEwQixNQUExQixFQUZjO0FBR2QsMkJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUFMLENBQXZCLENBSGM7bUJBQUwsRUFLUixHQUxILEVBbEJtQjtpQkFBckI7ZUFEZ0IsQ0FBbEIsQ0FIb0I7YUFBdEI7O0FBaUNBLGdCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWQsRUFBa0I7QUFDcEIsZ0JBQUUsY0FBRixHQURvQjtBQUVwQixtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBQ25CLHlCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQURtQjtBQUVuQix5QkFBSyxHQUFMLEdBQVcsT0FBSyxtQkFBTCxDQUF5QixPQUFLLFVBQUwsRUFBaUIsQ0FBQyxDQUFELENBQXJELENBRm1CO0FBR25CLHlCQUFLLGlCQUFMLENBQXVCLE9BQUssS0FBTCxDQUF2QixDQUhtQjtpQkFBckI7ZUFEZ0IsQ0FBbEIsQ0FGb0I7YUFBdEI7O0FBZ0JBLGdCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWQsSUFBb0IsQ0FBQyxLQUFLLFFBQUwsRUFBZTtBQUN0QyxnQkFBRSxjQUFGLEdBRHNDO0FBRXRDLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFDbkIsc0JBQUksQ0FBQyxPQUFLLElBQUwsRUFBVztBQUNkLDJCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQURjO0FBRWQsMkJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUFMLEdBQWEsQ0FBYixDQUF2QixDQUZjO21CQUFoQjtpQkFERjtlQURnQixDQUFsQixDQUZzQzthQUF4Qzs7QUFjQSxnQkFBSSxFQUFFLE9BQUYsS0FBYyxFQUFkLElBQW9CLENBQUMsS0FBSyxRQUFMLEVBQWU7QUFDdEMsZ0JBQUUsY0FBRixHQURzQztBQUV0QyxtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBQ25CLHNCQUFJLENBQUMsT0FBSyxLQUFMLEVBQVk7QUFDZiwyQkFBSyxvQkFBTCxDQUEwQixPQUFLLFVBQUwsQ0FBMUIsQ0FEZTtBQUVmLDJCQUFLLGlCQUFMLENBQXVCLE9BQUssS0FBTCxHQUFhLENBQWIsQ0FBdkIsQ0FGZTttQkFBakI7aUJBREY7ZUFEZ0IsQ0FBbEIsQ0FGc0M7YUFBeEM7O0FBZUEsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxFQUFrQjtBQUNwQixnQkFBRSxjQUFGLEdBRG9CO0FBRXBCLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFDbkIseUJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBRG1CO0FBRW5CLHlCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUFDLENBQUQsQ0FBckQsQ0FGbUI7QUFHbkIseUJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUFMLENBQXZCLENBSG1CO2lCQUFyQjtlQURnQixDQUFsQixDQUZvQjthQUF0Qjs7QUFlQSxnQkFBSSxFQUFFLE9BQUYsS0FBYyxDQUFkLElBQW1CLEVBQUUsUUFBRixLQUFlLElBQWYsRUFBcUI7QUFDMUMsZ0JBQUUsY0FBRixHQUQwQztBQUUxQyxtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBQ25CLHlCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQURtQjtBQUVuQix5QkFBSyxLQUFMLEdBQWEsT0FBSyxLQUFMLEdBQWEsQ0FBYixDQUZNO0FBR25CLHNCQUFJLE9BQUssS0FBTCxFQUFZO0FBQ2QsMkJBQUssS0FBTCxHQUFhLE9BQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsQ0FBcEIsQ0FEQztBQUVkLDJCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUFDLENBQUQsQ0FBckQsQ0FGYzttQkFBaEI7QUFJQSx5QkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FQbUI7aUJBQXJCO2VBRGdCLENBQWxCLENBRjBDO2FBQTVDOztBQWtCQSxnQkFBSSxFQUFFLE9BQUYsS0FBYyxDQUFkLElBQW1CLEVBQUUsUUFBRixLQUFlLEtBQWYsRUFBc0I7QUFDM0MsZ0JBQUUsY0FBRixHQUQyQztBQUUzQyxtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBQ25CLHlCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQURtQjtBQUVuQix5QkFBSyxLQUFMLEdBQWEsT0FBSyxLQUFMLEdBQWEsQ0FBYixDQUZNO0FBR25CLHNCQUFJLE9BQUssSUFBTCxFQUFXO0FBQ2IsMkJBQUssS0FBTCxHQUFhLENBQWIsQ0FEYTtBQUViLDJCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUExQyxDQUFYLENBRmE7bUJBQWY7QUFJQSx5QkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FQbUI7aUJBQXJCO2VBRGdCLENBQWxCLENBRjJDO2FBQTdDO1dBcEo2QixDQWtLN0IsSUFsSzZCLENBa0t4QixJQWxLd0IsQ0FBL0IsQ0FGa0I7OztBQW5IVCxnQ0E4UlgscUNBQWM7QUFDWixlQUFLLG9CQUFMLENBQTBCLEtBQUssVUFBTCxDQUExQixDQURZO0FBRVosZUFBSyxHQUFMLEdBQVcsS0FBSyxtQkFBTCxDQUF5QixLQUFLLFVBQUwsRUFBaUIsQ0FBMUMsQ0FBWCxDQUZZO0FBR1osZUFBSyxpQkFBTCxDQUF1QixLQUFLLGNBQUwsRUFBdkIsRUFIWTtBQUlaLGVBQUssUUFBTCxHQUFnQixLQUFoQixDQUpZO0FBS1osZUFBSyxvQkFBTCxDQUEwQixLQUFLLEdBQUwsQ0FBMUIsQ0FMWTtBQU1aLGVBQUssaUJBQUwsQ0FBdUIsS0FBSyxLQUFMLENBQXZCLENBTlk7OztBQTlSSCxnQ0E2U1gsMkNBQWlCOzs7QUFDZixlQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsR0FBNEIsVUFBQyxDQUFELEVBQU87QUFDakMsZ0JBQUksRUFBRSxPQUFGLElBQWEsRUFBYixFQUFpQjtBQUNuQixxQkFBSyxXQUFMLEdBRG1CO0FBRW5CLHFCQUFPLEtBQVAsQ0FGbUI7YUFBckI7QUFJQSxnQkFBSSxPQUFLLFFBQUwsS0FBa0IsSUFBbEIsSUFBMEIsRUFBRSxPQUFGLEtBQWMsQ0FBZCxFQUFpQjtBQUM3QyxxQkFBTyxLQUFQLENBRDZDO2FBQS9DLE1BRU87QUFDTCxxQkFBTyxJQUFQLENBREs7YUFGUDtXQUwwQixDQURiOzs7QUE3U04sZ0NBaVVYLHVDQUFjLE1BQU0sS0FBSzs7QUFJdkIsa0JBQVEsSUFBUjtBQUNFLGlCQUFLLFlBQUw7QUFDRSxrQkFBSSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGtCQUF2QixFQUEyQztBQUM3Qyx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsa0JBQXZCLENBQW5CLENBQThELElBQTlELEVBQW9FLEdBQXBFLENBQVAsQ0FENkM7ZUFBL0MsTUFFTztBQUNMLHVCQUFPLEdBQVAsQ0FESztlQUZQO0FBS0Esb0JBTkY7QUFERixpQkFRTyxXQUFMO0FBQ0Usa0JBQUksS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixrQkFBdkIsRUFBMkM7QUFDN0MsdUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGtCQUF2QixDQUFuQixDQUE4RCxJQUE5RCxFQUFvRTtBQUN6RSw2QkFBVyxLQUFLLFNBQUw7QUFDWCx5QkFBTyxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEI7QUFDUCw0QkFBVSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixLQUFLLEdBQUwsQ0FBOUIsQ0FBd0MsS0FBSyxTQUFMLENBQWxEO0FBQ0EsMkJBQVMsS0FBSyxVQUFMO2lCQUpKLENBQVAsQ0FENkM7ZUFBL0MsTUFPTztBQUNMLHVCQUFPLEdBQVAsQ0FESztlQVBQO0FBVUEsb0JBWEY7QUFSRjtBQXFCSSxxQkFBTyxHQUFQLENBREY7QUFwQkYsV0FKdUI7OztBQWpVZCxnQ0FxV1gsMkNBQWlCOztBQUVmLGlCQUFPO0FBQ0wsdUJBQVcsS0FBSyxTQUFMO0FBQ1gsbUJBQU8sS0FBSyxVQUFMLENBQWdCLEtBQWhCO0FBQ1Asc0JBQVUsS0FBSyxRQUFMO0FBQ1YscUJBQVMsS0FBSyxVQUFMO1dBSlgsQ0FGZTs7O0FBcldOLGdDQXFYWCwrQkFBVztBQUNULGNBQUksS0FBSyxPQUFMLEtBQWlCLEtBQWpCLEVBQXdCO0FBQzFCLGlCQUFLLFlBQUwsQ0FBa0IsS0FBSyxjQUFMLEVBQWxCLEVBRDBCO1dBQTVCO0FBR0EsY0FBRyxLQUFLLGFBQUwsS0FBdUIsS0FBdkIsRUFBOEI7QUFDL0IsaUJBQUssYUFBTCxLQUF1QixJQUF2QixDQUQrQjtBQUUvQixnQkFBRyxLQUFLLFVBQUwsRUFBZ0I7QUFDakIsa0JBQUksS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFNBQTNCLENBQXFDLFFBQXJDLENBQThDLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsYUFBM0IsQ0FBOUMsSUFBMkYsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFNBQTNCLENBQXFDLFFBQXJDLENBQThDLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsUUFBM0IsQ0FBekksRUFBK0s7QUFDakwscUJBQUssb0JBQUwsQ0FBMEIsS0FBSyxVQUFMLENBQTFCLENBRGlMO2VBQW5MO2FBREY7V0FGRjs7O0FBelhTLGdDQXdZWCxxQ0FBYSxRQUFRO0FBQ25CLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEbUI7QUFFbkIsZUFBSyxhQUFMLEdBQXFCLEtBQXJCLENBRm1CO0FBR25CLGNBQUksS0FBSyxVQUFMLEVBQWlCO0FBQ25CLGdCQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsU0FBWCxDQURPO0FBRW5CLGdCQUFJLFlBQVksS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUZHO0FBR25CLGlCQUFLLG9CQUFMLENBQTBCLFFBQVEsU0FBUixDQUExQixDQUhtQjtBQUluQixnQkFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLENBQXBCLEVBQXVCO0FBQ3pCLG1CQUFLLFVBQUwsR0FBa0IsS0FBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQTdCLENBRHlCOztBQUd6QixrQkFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFYLENBQXVCLFVBQXZCLENBQWtDLFNBQWxDLENBQTRDLFFBQTVDLENBQXFELEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsUUFBM0IsQ0FBdEQsRUFBNEY7QUFDOUYscUJBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFYLENBQXVCLFVBQXZCLENBQWtDLFNBQWxDLENBQTRDLEdBQTVDLENBQWdELEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsUUFBM0IsQ0FBaEQsQ0FEOEY7ZUFBaEc7O0FBSUEsa0JBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxRQUE1QyxDQUFxRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQXRELEVBQWlHO0FBQ25HLHFCQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxHQUE1QyxDQUFnRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQWhELENBRG1HO2VBQXJHOztBQUlBLGtCQUFJLEtBQUssUUFBTCxFQUFlO0FBQ2pCLG9CQUFJLEtBQUssUUFBTCxLQUFrQixLQUFsQixFQUF5QjtBQUMzQixzQkFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxRQUE1QyxDQUFxRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQXpELEVBQW9HO0FBQ2xHLHlCQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxNQUE1QyxDQUFtRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQW5ELENBRGtHO21CQUFwRztBQUdBLHVCQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixlQUF2QixDQUF1QyxVQUF2QyxFQUoyQjtBQUszQixzQkFBSSxLQUFLLGFBQUwsS0FBdUIsT0FBdkIsSUFBa0MsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsS0FBSyxHQUFMLENBQWhFLEVBQTJFO0FBQzdFLHlCQUFLLGNBQUwsQ0FBb0I7QUFDbEIsaUNBQVcsS0FBSyxTQUFMO0FBQ1gsNkJBQU8sS0FBSyxVQUFMLENBQWdCLEtBQWhCO0FBQ1AsZ0NBQVUsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsS0FBSyxHQUFMLENBQTlCLENBQXdDLEtBQUssU0FBTCxDQUFsRDtBQUNBLCtCQUFTLEtBQUssVUFBTDtxQkFKWCxFQUQ2RTttQkFBL0U7QUFRQSxzQkFBRyxLQUFLLE1BQUwsRUFBWTtBQUNiLHlCQUFLLE1BQUwsR0FBYyxLQUFkLENBRGE7QUFFYix5QkFBSyxjQUFMLENBQW9CO0FBQ2xCLGlDQUFXLEtBQUssU0FBTDtBQUNYLDZCQUFPLEtBQUssVUFBTCxDQUFnQixLQUFoQjtBQUNQLGdDQUFVLEtBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLEtBQTlCLEVBQXFDLEtBQUssU0FBTCxDQUEvQztBQUNBLCtCQUFTLEtBQUssVUFBTDtxQkFKWCxFQUZhO21CQUFmO2lCQWJGLE1BdUJPO0FBQ0wsdUJBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFYLENBQXVCLFVBQXZCLENBQWtDLFNBQWxDLENBQTRDLEdBQTVDLENBQWdELEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsYUFBM0IsQ0FBaEQsQ0FESztpQkF2QlA7ZUFERixNQTJCTztBQUNMLHFCQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxHQUE1QyxDQUFnRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQWhELENBREs7ZUEzQlA7YUFYRjtXQUpGOzs7QUEzWVMsZ0NBa2NYLCtDQUFrQixLQUFLOztBQUVyQixjQUFJLEtBQUssYUFBTCxLQUF1QixPQUF2QixJQUFrQyxLQUFLLFFBQUwsRUFBZTtBQUNuRCxrQkFBTSxLQUFLLGFBQUwsQ0FBbUIsV0FBbkIsRUFBZ0MsR0FBaEMsQ0FBTixDQURtRDtBQUVuRCxpQkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsSUFBbEMsQ0FBdUMsSUFBSSxTQUFKLENBQXZDLENBRm1EO0FBR25ELGlCQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixJQUFJLFNBQUosQ0FBNUIsR0FBNkMsSUFBSSxLQUFKLENBSE07QUFJbkQsaUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsSUFBSSxTQUFKLENBQXpCLEdBQTBDLElBQUksS0FBSixDQUpTO0FBS25ELGlCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFBc0IsSUFBMUQsRUFMbUQ7V0FBckQ7QUFPQSxlQUFLLE9BQUwsR0FBZSxJQUFmLENBVHFCOzs7QUFsY1osZ0NBb2RYLDZDQUFpQixLQUFLOztBQUVwQixjQUFJLEtBQUssYUFBTCxLQUF1QixPQUF2QixJQUFrQyxLQUFLLFFBQUwsSUFBaUIsQ0FBQyxLQUFLLE9BQUwsRUFBYztBQUNwRSxrQkFBTSxLQUFLLGFBQUwsQ0FBbUIsV0FBbkIsRUFBZ0MsR0FBaEMsQ0FBTixDQURvRTtBQUVwRSxpQkFBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsS0FBSyxHQUFMLENBQTlCLENBQXdDLElBQUksU0FBSixDQUF4QyxHQUF5RCxJQUFJLEtBQUosQ0FGVztXQUF0RTtBQUlBLGVBQUssT0FBTCxHQUFlLElBQWYsQ0FOb0I7OztBQXBkWCxnQ0FrZVgsdUNBQWMsS0FBSztBQUNqQixlQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLEdBQXBDLEVBQXlDLElBQXpDLEVBRGlCOzs7QUFsZVIsZ0NBMmVYLHFDQUFhLEtBQUs7O0FBRWhCLGNBQUksSUFBSSxRQUFKLEtBQWlCLElBQUksS0FBSixJQUFhLEtBQUssYUFBTCxLQUF1QixPQUF2QixJQUFrQyxLQUFLLFFBQUwsRUFBZTtBQUNqRixrQkFBTSxLQUFLLGFBQUwsQ0FBbUIsV0FBbkIsRUFBZ0MsR0FBaEMsQ0FBTixDQURpRjtBQUVqRixpQkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsSUFBbEMsQ0FBdUMsSUFBSSxTQUFKLENBQXZDLENBRmlGOztBQUtqRixpQkFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsSUFBSSxTQUFKLENBQTVCLEdBQTZDLElBQUksS0FBSixDQUxvQztBQU1qRixpQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixJQUFJLFNBQUosQ0FBekIsR0FBMEMsSUFBSSxLQUFKLENBTnVDO1dBQW5GO0FBUUEsZUFBSyxPQUFMLEdBQWUsSUFBZixDQVZnQjs7O0FBM2VQLGdDQTJmWCx5Q0FBZSxLQUFLOztBQUdsQixnQkFBTSxLQUFLLGFBQUwsQ0FBbUIsWUFBbkIsRUFBaUMsR0FBakMsQ0FBTixDQUhrQjtBQUlsQixjQUFJLElBQUksUUFBSixFQUFjO0FBQ2hCLGdCQUFJLE9BQUosQ0FBWSxLQUFaLEdBQW9CLElBQUksUUFBSixDQURKO1dBQWxCOzs7QUEvZlMsZ0NBeWdCWCx5Q0FBZSxLQUFLLEdBQUcsVUFBVTs7O0FBRS9CLGVBQUssU0FBTCxHQUFpQixFQUFFLE1BQUYsQ0FGYztBQUcvQixjQUFJLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsUUFBekIsQ0FBa0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixPQUEzQixDQUF0QyxFQUEyRTtBQUN6RSxnQkFBSSxFQUFFLE1BQUYsQ0FBUyxRQUFULENBQWtCLE1BQWxCLEdBQTJCLENBQTNCLEVBQThCO0FBQ2hDLG1CQUFLLFNBQUwsR0FBaUIsRUFBRSxNQUFGLENBQVMsVUFBVCxDQURlO2FBQWxDO1dBREY7O0FBTUEsZUFBSyxhQUFMLEdBQXFCLEtBQXJCLENBVCtCOztBQVcvQixjQUFJLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsUUFBekIsQ0FBa0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixXQUEzQixDQUF0QyxFQUErRTtBQUc3RSxnQkFBSSxLQUFLLFVBQUwsRUFBaUI7QUFDbkIsa0JBQUksS0FBSyxVQUFMLEVBQWlCO0FBQ25CLHFCQUFLLG9CQUFMLENBQTBCLEtBQUssVUFBTCxDQUExQixDQURtQjtlQUFyQjs7QUFJQSxrQkFBSSxLQUFLLEdBQUwsS0FBYSxHQUFiLEVBQWtCO0FBRXBCLHFCQUFLLGdCQUFMLENBQXNCLEtBQUssY0FBTCxFQUF0QixFQUZvQjs7QUFJcEIscUJBQUssYUFBTCxDQUFtQixLQUFLLEdBQUwsQ0FBbkIsQ0FKb0I7ZUFBdEIsTUFLTztBQUNMLG9CQUFJLEtBQUssVUFBTCxLQUFvQixLQUFLLFNBQUwsSUFBa0IsS0FBSyxPQUFMLEtBQWlCLEtBQWpCLEVBQXdCO0FBQ2hFLHNCQUFJLEtBQUssVUFBTCxFQUFpQjtBQUNuQix5QkFBSyxZQUFMLENBQWtCLEtBQUssY0FBTCxFQUFsQixFQURtQjttQkFBckI7aUJBREY7ZUFORjthQUxGOztBQW9CQSxpQkFBSyxTQUFMLEdBQWlCLEtBQUssU0FBTCxDQUFlLFlBQWYsQ0FBNEIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixJQUF2QixDQUE0QixhQUE1QixDQUE3QyxDQXZCNkU7QUF3QjdFLGlCQUFLLGFBQUwsR0FBcUIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixZQUF2QixDQUFvQyxLQUFLLEtBQUwsQ0FBekQsQ0F4QjZFO0FBeUI3RSxpQkFBSyxTQUFMLENBQWUsWUFBZixDQUE0QixVQUE1QixFQUF3QyxDQUF4QyxFQXpCNkU7O0FBNkI3RSxpQkFBSyxRQUFMLEdBQWdCLFFBQWhCLENBN0I2RTtBQThCN0UsaUJBQUssS0FBTCxHQUFhLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsQ0FBc0MsT0FBdEMsQ0FBOEMsS0FBSyxTQUFMLENBQTNELENBOUI2RTtBQStCN0UsaUJBQUssSUFBTCxHQUFZLEVBQUUsSUFBRixDQS9CaUU7O0FBb0M3RSxnQkFBSSxDQUFDLEtBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsU0FBMUIsQ0FBb0MsUUFBcEMsQ0FBNkMsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixRQUEzQixDQUE5QyxFQUFvRjtBQUN0RixtQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixTQUExQixDQUFvQyxHQUFwQyxDQUF3QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFFBQTNCLENBQXhDLENBRHNGO2FBQXhGOztBQUtBLGdCQUFJLENBQUMsS0FBSyxTQUFMLENBQWUsVUFBZixDQUEwQixTQUExQixDQUFvQyxRQUFwQyxDQUE2QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQTlDLEVBQXlGO0FBQzNGLG1CQUFLLFNBQUwsQ0FBZSxVQUFmLENBQTBCLFNBQTFCLENBQW9DLEdBQXBDLENBQXdDLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsYUFBM0IsQ0FBeEMsQ0FEMkY7YUFBN0Y7O0FBTUEsZ0JBQUksS0FBSyxJQUFMLEtBQWMsVUFBZCxJQUE0QixLQUFLLFFBQUwsRUFBZTtBQUM3QyxrQkFBSSxLQUFLLFFBQUwsS0FBa0IsS0FBbEIsSUFBMkIsS0FBSyxhQUFMLEtBQXVCLE9BQXZCLEVBQWdDO0FBQzdELG9CQUFJLEtBQUssVUFBTCxLQUFvQixLQUFLLFNBQUwsSUFBa0IsS0FBSyxRQUFMLEtBQWtCLEtBQWxCLEVBQXlCO0FBQ2pFLHNCQUFJLEtBQUssYUFBTCxLQUF1QixPQUF2QixFQUFnQztBQUNsQyx5QkFBSyxjQUFMLENBQW9CO0FBQ2xCLGlDQUFXLEtBQUssU0FBTDtBQUNYLDZCQUFPLEtBQUssU0FBTCxDQUFlLEtBQWY7QUFDUCxnQ0FBVSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixHQUE5QixFQUFtQyxLQUFLLFNBQUwsQ0FBN0M7QUFDQSwrQkFBUyxLQUFLLFNBQUw7cUJBSlgsRUFEa0M7bUJBQXBDO2lCQURGOztBQVdBLG9CQUFJLEtBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsU0FBMUIsQ0FBb0MsUUFBcEMsQ0FBNkMsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUFqRCxFQUE0RjtBQUMxRix1QkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixTQUExQixDQUFvQyxNQUFwQyxDQUEyQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQTNDLENBRDBGO2lCQUE1RjtBQUdBLGtCQUFFLE1BQUYsQ0FBUyxlQUFULENBQXlCLFVBQXpCLEVBZjZEO2VBQS9ELE1BaUJPO0FBQ0wsdUJBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsU0FBMUIsQ0FBb0MsR0FBcEMsQ0FBd0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUF4QyxDQURLO2lCQWpCUDs7QUFxQkEsbUJBQUssUUFBTCxHQUFnQixJQUFoQixDQXRCNkM7YUFBL0MsTUF1Qk87QUFDTCxtQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixTQUExQixDQUFvQyxHQUFwQyxDQUF3QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQXhDLENBREs7YUF2QlA7O0FBNkJBLGlCQUFLLE9BQUwsR0FBZSxLQUFmLENBNUU2RTtBQTZFN0UsaUJBQUssR0FBTCxHQUFXLEdBQVgsQ0E3RTZFO0FBOEU3RSxpQkFBSyxVQUFMLEdBQWtCLEtBQUssU0FBTCxDQTlFMkQ7QUErRTdFLGlCQUFLLFFBQUwsR0FBZ0IsS0FBSyxVQUFMLENBQWdCLEtBQWhCLENBL0U2RDtBQWdGN0UsaUJBQUssS0FBTCxHQUFhLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixDQUFzQyxnQkFBdEMsQ0FBdUQsTUFBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFdBQTNCLENBQTFFLENBaEY2RTs7QUFvRjdFLGdCQUFJLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixHQUF3QyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFdBQTVDLEVBQXlEO0FBQ25HLG1CQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFVBQTVDLEdBQXlELEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixDQUQwQzthQUFyRztBQUdBLGdCQUFJLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsR0FBeUQsQ0FBekQsSUFBOEQsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxXQUE1QyxHQUEwRCxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBMkIsVUFBM0IsRUFBdUM7QUFDakssbUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsR0FBeUQsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFVBQTNCLENBRHdHO2FBQW5LOztBQVFBLHVCQUFXLFlBQUs7QUFDZCxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxNQUFwQyxDQUEyQyxVQUEzQyxHQUF3RCxPQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFVBQTVDLENBRDFDO2FBQUwsRUFFUixFQUZILEVBL0Y2RTs7QUFvRzdFLGdCQUFJLEtBQUssS0FBTCxLQUFlLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsQ0FBcEIsRUFBdUI7QUFDeEMsbUJBQUssSUFBTCxHQUFZLElBQVosQ0FEd0M7YUFBMUMsTUFFTztBQUNMLG1CQUFLLElBQUwsR0FBWSxLQUFaLENBREs7YUFGUDtBQUtBLGdCQUFJLEtBQUssS0FBTCxLQUFlLENBQWYsRUFBa0I7QUFDcEIsbUJBQUssS0FBTCxHQUFhLElBQWIsQ0FEb0I7YUFBdEIsTUFFTztBQUNMLG1CQUFLLEtBQUwsR0FBYSxLQUFiLENBREs7YUFGUDs7QUFVQSxpQkFBSyxVQUFMLENBQWdCLEtBQWhCLEdBbkg2RTtBQW9IN0UsZ0JBQUksS0FBSyxRQUFMLEVBQWU7QUFDakIsbUJBQUssY0FBTCxHQURpQjtBQUVqQixrQkFBSSxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBd0I7QUFDMUIsb0JBQUcsS0FBSyxJQUFMLEtBQWMsVUFBZCxFQUF5QjtBQUMxQix1QkFBSyxVQUFMLENBQWdCLE1BQWhCLEdBRDBCO2lCQUE1QjtlQURGO2FBRkY7V0FwSEY7OztlQXBoQlMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtZWRpdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
