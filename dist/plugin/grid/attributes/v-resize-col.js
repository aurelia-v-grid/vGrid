'use strict';

System.register(['aurelia-framework', '../v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, _dec, _dec2, _class, vGridAttributesResizeCol;

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
      _export('vGridAttributesResizeCol', vGridAttributesResizeCol = (_dec = customAttribute('v-resize-col'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridAttributesResizeCol(element, vGrid) {
          _classCallCheck(this, vGridAttributesResizeCol);

          this.vGrid = vGrid;
          this.ctx = vGrid.resizeAttributeSharedContext;
          this.element = element;
          this.screenX;
          this.originalWidth;
          this.column = this.element;
          while (this.column.nodeName !== 'AVG-COL') {
            this.column = this.column.parentNode;
          }
          this.colType = this.column.attributes.getNamedItem("avg-type").value;
          this.colNo = this.column.attributes.getNamedItem("avg-config-col").value * 1;
          this.context = vGrid.columnBindingContext["setup" + this.colType][this.colNo];
          this.columnsArray = vGrid.columnBindingContext["setup" + this.colType];
          this.columnBindingContext = vGrid.columnBindingContext;
        }

        vGridAttributesResizeCol.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;
        };

        vGridAttributesResizeCol.prototype.attached = function attached() {
          var _this = this;

          var resizeHandle = document.createElement("DIV");
          resizeHandle.classList.add("avg-draggable-handler");

          this.onmousedownBinded = this.onmousedown.bind(this);
          this.onmousemoveBinded = this.onmousemove.bind(this);
          this.onmouseupBinded = this.onmouseup.bind(this);

          resizeHandle.onmousedown = function (e) {
            _this.ctx.resizing = true;
            _this.onmousedown(e);
          };

          this.column.appendChild(resizeHandle);
        };

        vGridAttributesResizeCol.prototype.onmouseup = function onmouseup() {
          document.removeEventListener("mousemove", this.onmousemoveBinded);
          document.removeEventListener("mouseup", this.onmouseupBinded);
          this.ctx.resizing = false;
        };

        vGridAttributesResizeCol.prototype.onmousemove = function onmousemove(e) {
          this.updateHeader(e);
        };

        vGridAttributesResizeCol.prototype.updateHeader = function updateHeader(e) {
          var _this2 = this;

          var w = Math.abs(this.screenX - e.screenX);

          if (w % 2 === 0) {

            requestAnimationFrame(function () {
              var movementX = parseInt(_this2.originalWidth) - (_this2.screenX - e.screenX) + "px";
              var appendValue = parseInt(_this2.originalWidth) - parseInt(movementX);

              if (_this2.colType === "main") {

                _this2.columnsArray[_this2.colNo].width = parseInt(movementX);
                _this2.vGrid.colConfig[_this2.colNo].colWidth = _this2.columnsArray[_this2.colNo].width;

                for (var i = 0; i < _this2.columnsArray.length; i++) {
                  if (_this2.columnsArray[_this2.colNo].left < _this2.columnsArray[i].left) {
                    _this2.columnsArray[i].left = _this2.originals[i] - appendValue;
                  }
                }
                _this2.vGrid.htmlHeightWidth.avgContentMainScroll_Width = _this2.avgContentMainScroll_Width - appendValue;
                _this2.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width = _this2.avgContentHhandleScroll_Width - appendValue;
              }

              if (_this2.colType === "right") {
                _this2.columnsArray[_this2.colNo].width = parseInt(movementX);
                _this2.vGrid.colConfig[_this2.colNo].colWidth = _this2.columnsArray[_this2.colNo].width;

                for (var i = 0; i < _this2.columnsArray.length; i++) {
                  if (_this2.columnsArray[_this2.colNo].left < _this2.columnsArray[i].left) {
                    _this2.columnsArray[i].left = _this2.originals[i] - appendValue;
                  }
                }
                _this2.vGrid.htmlHeightWidth.avgContentRight_Width = _this2.avgContentRight_Width - appendValue;
                _this2.vGrid.htmlHeightWidth.avgHeaderRight_Width = _this2.avgHeaderRight_Width - appendValue;

                _this2.vGrid.htmlHeightWidth.avgContentMain_Right = _this2.avgContentMain_Right - appendValue;
                _this2.vGrid.htmlHeightWidth.avgHeaderMain_Right = _this2.avgHeaderMain_Right - appendValue;
                _this2.vGrid.htmlHeightWidth.avgContentHhandle_Right = _this2.avgContentHhandle_Right - appendValue;
              }

              if (_this2.colType === "left") {
                _this2.columnsArray[_this2.colNo].width = parseInt(movementX);
                _this2.vGrid.colConfig[_this2.colNo].colWidth = _this2.columnsArray[_this2.colNo].width;

                for (var i = 0; i < _this2.columnsArray.length; i++) {
                  if (_this2.columnsArray[_this2.colNo].left < _this2.columnsArray[i].left) {
                    _this2.columnsArray[i].left = _this2.originals[i] - appendValue;
                  }
                }

                _this2.vGrid.htmlHeightWidth.avgContentLeft_Width = _this2.avgContentLeft_Width - appendValue;
                _this2.vGrid.htmlHeightWidth.avgHeaderLeft_Width = _this2.avgHeaderLeft_Width - appendValue;

                _this2.vGrid.htmlHeightWidth.avgContentMain_Left = _this2.avgContentMain_Left - appendValue;
                _this2.vGrid.htmlHeightWidth.avgHeaderMain_Left = _this2.avgHeaderMain_Left - appendValue;
                _this2.vGrid.htmlHeightWidth.avgContentHhandle_Left = _this2.avgContentHhandle_Left - appendValue;
              }
            });
          }
        };

        vGridAttributesResizeCol.prototype.onmousedown = function onmousedown(e) {
          var _this3 = this;

          this.screenX = e.screenX;

          this.originalWidth = this.context.width;

          this.originals = [];
          for (var i = 0; i < this.columnsArray.length; i++) {
            this.originals.push(this.columnsArray[i].left);
          }

          this.avgContentLeft_Width = this.vGrid.htmlHeightWidth.avgContentLeft_Width;
          this.avgHeaderLeft_Width = this.vGrid.htmlHeightWidth.avgHeaderLeft_Width;
          this.avgContentMainScroll_Width = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width;
          this.avgHeaderMain_Left = this.vGrid.htmlHeightWidth.avgHeaderMain_Left;
          this.avgContentMain_Left = this.vGrid.htmlHeightWidth.avgContentMain_Left;
          this.avgContentMain_Right = this.vGrid.htmlHeightWidth.avgContentMain_Right;
          this.avgHeaderMain_Right = this.vGrid.htmlHeightWidth.avgHeaderMain_Right;
          this.avgContentRight_Width = this.vGrid.htmlHeightWidth.avgContentRight_Width;
          this.avgHeaderRight_Width = this.vGrid.htmlHeightWidth.avgHeaderRight_Width;
          this.avgContentHhandle_Right = this.vGrid.htmlHeightWidth.avgContentHhandle_Right;
          this.avgContentHhandle_Left = this.vGrid.htmlHeightWidth.avgContentHhandle_Left;
          this.avgContentHhandleScroll_Width = this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width;

          this.avgContentMainScrollLeft = this.vGrid.htmlCache.avg_content_main.scrollLeft;

          if (this.colType === "main") {
            this.isLast = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width === this.context.left + this.context.width;
          }
          if (this.colType === "left") {
            this.isLast = this.vGrid.htmlHeightWidth.avgContentLeft_Width === this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth + this.columnBindingContext.setupgrouping * 15;
          }
          if (this.colType === "right") {
            this.isLast = this.vGrid.htmlHeightWidth.avgContentRight_Width === this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth;
          }

          var setupRight = this.vGrid.columnBindingContext.setupright;
          this.rightColNo;
          this.rightColNoWidth;
          setupRight.forEach(function (col, i) {
            if (col.left === 0) {
              _this3.rightColNo = i;
              _this3.rightColNoWidth = col.width;
            }
          });

          document.addEventListener("mousemove", this.onmousemoveBinded);
          document.addEventListener("mouseup", this.onmouseupBinded);
        };

        return vGridAttributesResizeCol;
      }()) || _class) || _class));

      _export('vGridAttributesResizeCol', vGridAttributesResizeCol);
    }
  };
});
//# sourceMappingURL=v-resize-col.js.map
