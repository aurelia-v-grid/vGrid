'use strict';

System.register(['aurelia-framework', '../v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, _dec, _dec2, _class, vGridDragDropCol;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vGridDragDropCol', vGridDragDropCol = (_dec = customAttribute('v-drag-drop-col'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridDragDropCol(element, vGrid) {
          _classCallCheck(this, vGridDragDropCol);

          this.vGrid = vGrid;
          this.vGridElement = vGrid.element;
          this.controller = vGrid.controller;
          this.groupingElements = vGrid.groupingElements;

          this.sharedContext = vGrid.dragDropAttributeSharedContext;

          this.element = element;
          this.column = this.element;
          this.entered = null;
          this.curColNo = null;
        }

        vGridDragDropCol.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;

          this.onDragstartBinded = this.onDragstart.bind(this);
          this.onDragenterBinded = this.onDragenter.bind(this);
          this.onDragoverBinded = this.onDragover.bind(this);
          this.onDragendBinded = this.onDragend.bind(this);
          this.onDragOutSideBinded = this.onDragOutSide.bind(this);
        };

        vGridDragDropCol.prototype.unbind = function unbind() {};

        vGridDragDropCol.prototype.attached = function attached() {
          var _this = this;

          var result = this.getTargetData(this.column);

          if (result.ok && !result.panel) {
            this.column = result.target;
            this.colType = this.column.attributes.getNamedItem("avg-type").value;
            this.colNo = this.column.attributes.getNamedItem("avg-config-col").value * 1;
            this.context = this.vGrid.columnBindingContext["setup" + this.colType][this.colNo];
            this.columnsArray = this.vGrid.columnBindingContext["setup" + this.colType];

            this.element.addEventListener("mousedown", this.onDragstartBinded);

            result.target.addEventListener("mouseenter", this.onDragenterBinded);
          }

          if (result.ok && result.target.nodeName == 'AVG-TOP-PANEL') {
            this.isPanel = true;
            this.sharedContext.panel = result.target;

            result.target.onmouseleave = function (event) {
              if (_this.sharedContext.dragging) {
                _this.groupingElements.removeGroup("");
              }
            };

            result.target.onmouseenter = function (event) {
              if (_this.sharedContext.dragging) {
                var name = _this.vGrid.colConfig[_this.sharedContext.colNo].colHeaderName;
                var field = _this.vGrid.colConfig[_this.sharedContext.colNo].colField.replace("rowRef.", "");
                _this.groupingElements.addGroup(name, field);
                _this.sharedContext.lastTarget = result.target;
              }
            };

            result.target.onmouseup = function (event) {
              if (_this.sharedContext.dragging) {
                _this.groupingElements.addToGrouping();
              }
            };
          }
        };

        vGridDragDropCol.prototype.createDragElement = function createDragElement() {
          this.dragColumnBlock = document.createElement("div");
          this.dragColumnBlock.classList.add(this.vGrid.attTheme);
          this.dragColumnBlock.classList.add("avg-drag");
          this.dragColumnBlock.style.top = -1200 + "px";
          this.dragColumnBlock.style.left = -1200 + "px";
          document.body.appendChild(this.dragColumnBlock);

          this.dragColumnBlock.innerHTML = this.vGrid.colConfig[this.colNo].colHeaderName;
        };

        vGridDragDropCol.prototype.onDragstart = function onDragstart(event) {
          var _this2 = this;

          document.addEventListener("mouseup", this.onDragendBinded);
          this.vGridElement.addEventListener("mouseleave", this.onDragOutSideBinded);
          this.createDragElement();

          this.mouseMoveTimer = setTimeout(function () {
            document.addEventListener("mousemove", _this2.onDragoverBinded, false);
          }, 300);

          this.sharedContext.dragging = true;
          this.sharedContext.colType = this.colType;
          this.sharedContext.context = this.context;
          this.sharedContext.colNo = this.colNo;
          this.sharedContext.curColNo = this.colNo;
          this.sharedContext.columnsArray = this.columnsArray;

          this.sharedContext.columnsArraySorted = [];
          this.sharedContext.columnsArray.forEach(function (x) {
            _this2.sharedContext.columnsArraySorted.push(x);
          });
        };

        vGridDragDropCol.prototype.unbind = function unbind() {};

        vGridDragDropCol.prototype.detached = function detached() {};

        vGridDragDropCol.prototype.onDragOutSide = function onDragOutSide(event) {

          if (this.sharedContext.dragging) {

            if (event.layerX < 0) {
              var left = false;

              this.vGrid.columnBindingContext.setupleft.forEach(function (x) {
                if (x.show) {
                  left = true;
                }
              });

              if (!left) {
                this.switchColumns({
                  colType: "left"
                });
              }
            }

            if (event.layerX > this.vGridElement.clientWidth) {
              var right = false;

              this.vGrid.columnBindingContext.setupright.forEach(function (x) {
                if (x.show) {
                  right = true;
                }
              });

              if (!right) {
                this.switchColumns({
                  colType: "right"
                });
              }
            }
          }
        };

        vGridDragDropCol.prototype.onDragenter = function onDragenter(event) {
          var _this3 = this;

          if (this.sharedContext.dragging) {
            var result = this.getTargetData(event.target);

            if (result.target.nodeName === 'AVG-COL' && result.ok && this.sharedContext.lastTarget !== result.target) {
              this.sharedContext.lastTarget = result.target;

              if (result.colNo !== this.sharedContext.colNo && result.colType === this.sharedContext.colType) {
                (function () {
                  var newLeft = _this3.sharedContext.columnsArray[result.colNo].left;
                  var oldLeft = _this3.sharedContext.columnsArray[_this3.sharedContext.colNo].left;

                  if (newLeft < oldLeft) {
                    _this3.sharedContext.columnsArray[_this3.sharedContext.colNo].left = newLeft;
                    _this3.sharedContext.columnsArray[result.colNo].left = newLeft + 1;
                  } else {
                    _this3.sharedContext.columnsArray[_this3.sharedContext.colNo].left = newLeft;
                    _this3.sharedContext.columnsArray[result.colNo].left = newLeft - 1;
                  }

                  _this3.sharedContext.columnsArraySorted.sort(function (a, b) {
                    return a.left - b.left;
                  });

                  var appendValue = 0;
                  _this3.sharedContext.columnsArraySorted.forEach(function (x) {
                    if (x.show) {
                      x.left = appendValue;
                      appendValue = appendValue + x.width;
                    }
                  });
                })();
              }

              if (result.colNo !== this.sharedContext.colNo && result.colType !== this.sharedContext.colType) {
                this.switchColumns(result);
              }
            }
          }
        };

        vGridDragDropCol.prototype.onDragover = function onDragover(event) {
          if (this.dragColumnBlock) {
            this.dragColumnBlock.style.top = event.clientY + "px";
            this.dragColumnBlock.style.left = event.clientX + "px";
          }
        };

        vGridDragDropCol.prototype.onDragend = function onDragend(event) {
          clearTimeout(this.mouseMoveTimer);

          this.sharedContext.dragging = false;

          document.removeEventListener("mouseup", this.onDragendBinded);
          document.removeEventListener("mousemove", this.onDragoverBinded);
          this.vGridElement.removeEventListener("mouseleave", this.onDragOutSideBinded);

          this.sharedContext.lastTarget = null;
          this.sharedContext.group = null;

          if (this.dragColumnBlock) {
            var parent = this.dragColumnBlock.parentNode;
            if (parent) {
              parent.removeChild(this.dragColumnBlock);
              this.dragColumnBlock = null;
            }
          }
        };

        vGridDragDropCol.prototype.switchColumns = function switchColumns(result) {
          var _this4 = this;

          var width = void 0;
          var newColType = result.colType;
          var oldColType = this.sharedContext.colType;
          var heightAndWidths = this.vGrid.htmlHeightWidth;

          (function () {
            switch (true) {
              case newColType === "left" && oldColType === "main":
              case newColType === "main" && oldColType === "left":
              case newColType === "right" && oldColType === "main":
              case newColType === "main" && oldColType === "right":
              case newColType === "left" && oldColType === "right":
              case newColType === "right" && oldColType === "left":
                _this4.sharedContext.columnsArray[_this4.sharedContext.colNo].show = false;

                width = _this4.sharedContext.columnsArray[_this4.sharedContext.colNo].width;

                _this4.sharedContext.columnsArraySorted.sort(function (a, b) {
                  return a.left - b.left;
                });

                var appendValue = 0;
                _this4.sharedContext.columnsArraySorted.forEach(function (x) {
                  if (x.show) {
                    x.left = appendValue;
                    appendValue = appendValue + x.width;
                  }
                });

                _this4.sharedContext.colType = result.colType;
                _this4.sharedContext.columnsArray = _this4.vGrid.columnBindingContext["setup" + result.colType];

                _this4.sharedContext.columnsArray[_this4.sharedContext.colNo].show = true;

                _this4.sharedContext.columnsArraySorted = [];
                _this4.sharedContext.columnsArray.forEach(function (x) {
                  _this4.sharedContext.columnsArraySorted.push(x);
                });

                _this4.sharedContext.columnsArraySorted.sort(function (a, b) {
                  return a.left - b.left;
                });

                appendValue = 0;
                _this4.sharedContext.columnsArraySorted.forEach(function (x) {
                  if (x.show) {
                    x.left = appendValue;
                    appendValue = appendValue + x.width;
                  }
                });

                break;
              default:
                console.log("Todo: Move to :" + newColType + ", from:" + oldColType);
                break;
            }
          })();

          if (newColType === "left" && oldColType === "main") {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;

            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;

            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
          }

          if (newColType === "main" && oldColType === "left") {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;

            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;

            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
          }

          if (newColType === "right" && oldColType === "main") {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;

            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;

            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;
          }

          if (newColType === "main" && oldColType === "right") {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;

            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;

            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;
          }

          if (newColType === "left" && oldColType === "right") {

            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;

            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;

            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;

            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
          }

          if (newColType === "right" && oldColType === "left") {

            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;

            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;

            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;

            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
          }
        };

        vGridDragDropCol.prototype.getTargetData = function getTargetData(target) {
          var draggable = null;
          var count = 0;
          var exit = true;
          var ok = false;

          while (exit) {
            count++;

            if (!target.parentNode) {
              exit = false;
            } else {
              if (target.draggable === true && draggable === null) {
                draggable = target;
              }

              switch (true) {
                case target.nodeName === "AVG-COL":
                case target.nodeName === "AVG-TOP-PANEL":
                  ok = true;
                  exit = false;
                  break;
                default:
                  target = target.parentNode;
                  break;
              }
            }

            if (count > 10) {
              exit = false;
            }
          }

          var colType = null;
          var colNo = null;
          var context = null;
          var columnsArray = null;
          var panel = false;

          if (ok && target.nodeName === "AVG-COL") {
            colType = target.attributes.getNamedItem("avg-type").value;
            colNo = target.attributes.getNamedItem("avg-config-col").value * 1;
            context = this.vGrid.columnBindingContext["setup" + colType][colNo];
            columnsArray = this.vGrid.columnBindingContext["setup" + colType];
          }

          if (ok && target.nodeName === "AVG-TOP-PANEL") {
            panel = true;
          }

          return {
            draggable: draggable,
            ok: ok,
            target: target,
            colType: colType,
            colNo: colNo,
            context: context,
            columnsArray: columnsArray,
            panel: panel
          };
        };

        return vGridDragDropCol;
      }()) || _class) || _class));

      _export('vGridDragDropCol', vGridDragDropCol);
    }
  };
});
//# sourceMappingURL=v-drag-drop-col.js.map
