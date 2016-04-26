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

          if (this.attributeType = "checkbox") {}

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
                return this.vGrid.vGridConfig.eventFormatHandler(type, obj);
              } else {
                return obj;
              }
              break;
            case "afterEdit":
              if (this.vGrid.vGridConfig.eventFormatHandler) {
                return this.vGrid.vGridConfig.eventFormatHandler(type, {
                  attribute: this.attribute,
                  value: this.getValue(this.curElement),
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
            value: this.getValue(this.curElement),
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
                      value: this.getValue(this.curElement),
                      oldValue: this.vGrid.collectionFiltered[this.row][this.attribute],
                      element: this.curElement
                    });
                  }
                  if (this.filter) {
                    this.filter = false;
                    this.beforeCellEdit({
                      attribute: this.attribute,
                      value: this.getValue(this.curElement),
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

            if (this.attributeType === "checkbox") {
              obj.element.checked = obj.newValue;
            } else {
              obj.element.value = obj.newValue;
            }
          }
        };

        VGridCellEdit.prototype.getValue = function getValue(element) {

          var attribute = this.newTarget.getAttribute(this.vGrid.vGridConfig.atts.dataAttribute);
          var index = this.vGrid.vGridConfig.attributeArray.indexOf(attribute);
          var attributeType = this.vGrid.vGridConfig.colTypeArray[index];

          if (attributeType !== "image") {
            if (attributeType === "checkbox") {
              return element.checked;
            } else {
              return element.value;
            }
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
            this.index = this.vGrid.vGridConfig.attributeArray.indexOf(this.attribute);
            this.attributeType = this.vGrid.vGridConfig.colTypeArray[this.index];
            this.newTarget.setAttribute("tabindex", "0");

            this.readOnly = readOnly;
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
                      value: this.getValue(this.newTarget),
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
            this.oldValue = this.getValue(this.curElement);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBT2E7QUFVWCxpQkFWVyxhQVVYLENBQVksS0FBWixFQUFtQjtnQ0FWUixlQVVROztlQVBuQixRQUFRLENBQUMsQ0FBRCxDQU9XO2VBTm5CLE9BQU8sQ0FBQyxDQUFELENBTVk7ZUFMbkIsV0FBVyxNQUtRO2VBSm5CLFNBQVMsS0FJVTtlQUhuQixTQUFTLE1BR1U7ZUFGbkIsZ0JBQWdCLE1BRUc7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7QUFFakIsZUFBSyxpQkFBTCxHQUZpQjtTQUFuQjs7QUFWVyxnQ0FtQlgsbURBQW9CLEdBQUcsV0FBVztBQUNoQyxjQUFJLE9BQUosQ0FEZ0M7QUFFaEMsY0FBSSxPQUFKLENBRmdDO0FBR2hDLGNBQUksSUFBSSxFQUFKLENBSDRCO0FBSWhDLGNBQUksT0FBTyxDQUFQLENBSjRCO0FBS2hDLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUMxQixnQkFBSTtBQUNGLGtCQUFJLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixHQUEzQixDQUE1QixFQUE2RDtBQUMzRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBTixDQUR1RDtBQUUzRCxxQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxNQUE5QyxFQUFzRCxHQUExRSxFQUErRTtBQUM3RSxzQkFBSSxRQUFRLFNBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxDQUE5QyxFQUFpRCxHQUFqRCxHQUF1RCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENB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b0MsT0FBcEMsQ0FBNEMsVUFBNUMsR0FBeUQsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFVBQTNCLENBRDBDO2FBQXJHO0FBR0EsZ0JBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUE1QyxHQUF5RCxDQUF6RCxJQUE4RCxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFdBQTVDLEdBQTBELEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixFQUF1QztBQUNqSyxtQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxVQUE1QyxHQUF5RCxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBMkIsVUFBM0IsQ0FEd0c7YUFBbks7O0FBS0EsdUJBQVcsWUFBSztBQUNkLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE1BQXBDLENBQTJDLFVBQTNDLEdBQXdELE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsQ0FEMUM7YUFBTCxFQUVSLEVBRkgsRUE1RjZFOztBQWlHN0UsZ0JBQUksS0FBSyxLQUFMLEtBQWUsS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixDQUFwQixFQUF1QjtBQUN4QyxtQkFBSyxJQUFMLEdBQVksSUFBWixDQUR3QzthQUExQyxNQUVPO0FBQ0wsbUJBQUssSUFBTCxHQUFZLEtBQVosQ0FESzthQUZQO0FBS0EsZ0JBQUksS0FBSyxLQUFMLEtBQWUsQ0FBZixFQUFrQjtBQUNwQixtQkFBSyxLQUFMLEdBQWEsSUFBYixDQURvQjthQUF0QixNQUVPO0FBQ0wsbUJBQUssS0FBTCxHQUFhLEtBQWIsQ0FESzthQUZQOztBQVFBLGlCQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsR0E5RzZFOztBQWtIN0UsZ0JBQUksS0FBSyxRQUFMLEVBQWU7QUFDakIsbUJBQUssY0FBTCxHQURpQjtBQUVqQixrQkFBSSxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBd0I7QUFDMUIsb0JBQUksS0FBSyxJQUFMLEtBQWMsVUFBZCxFQUEwQjtBQUM1Qix1QkFBSyxVQUFMLENBQWdCLE1BQWhCLEdBRDRCO2lCQUE5QjtlQURGO2FBRkY7V0FsSEY7OztlQXpoQlMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwtZWRpdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
