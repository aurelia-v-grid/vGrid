/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vGridAttributesResizeCol = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var vGridAttributesResizeCol = exports.vGridAttributesResizeCol = (_dec = (0, _aureliaFramework.customAttribute)('v-resize-col'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec(_class = _dec2(_class = function () {
    function vGridAttributesResizeCol(element, vGrid) {
      _classCallCheck(this, vGridAttributesResizeCol);

      this.vGrid = vGrid;
      this.vGridConfig = this.vGrid.vGridConfig;
      this.vGridGenerator = this.vGrid.vGridGenerator;
      this.element = element;
      this.resizable = false;
      this.screenX;
      this.index;
      this.originalWidth;
    }

    vGridAttributesResizeCol.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
    };

    vGridAttributesResizeCol.prototype.attached = function attached() {
      var _this = this;

      var mainCol = this.element;
      while (mainCol.nodeName !== 'V-GRID-HEADER-COL') {
        mainCol = mainCol.parentNode;
      }
      this.mainCol = mainCol;

      var resizeHandle = document.createElement("DIV");
      resizeHandle.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);

      resizeHandle.onmousedown = function (e) {
        _this.onmousedown(e);
      };

      this.mainCol.appendChild(resizeHandle);
    };

    vGridAttributesResizeCol.prototype.onmouseup = function onmouseup() {
      this.resizable = true;

      this.vGridGenerator.headerElement.onmouseleave = "";
      this.vGridGenerator.headerElement.onmousemove = "";
      this.vGridGenerator.headerElement.onmouseup = "";

      this.vGridConfig.colConfig[this.index].colWidth = parseInt(this.mainCol.style.width);

      this.vGridGenerator.rowTemplate = null;
      this.vGridGenerator.correctRowAndScrollbodyWidth();
      this.vGridGenerator.recreateRowViewSlots();
      this.vGridGenerator.updateGridScrollbars();
      this.vGridGenerator.rebindAllRowSlots(true);
    };

    vGridAttributesResizeCol.prototype.onmousemove = function onmousemove(e) {
      var _this2 = this;

      this.vGridGenerator.headerElement.onmouseup = function () {
        _this2.onmouseup();
      };

      this.vGridGenerator.headerElement.onmouseleave = function (e) {
        _this2.vGridGenerator.headerElement.onmouseup(e);
      };

      if (this.resizable) {
        this.updateHeader(e);
      } else {
        this.vGridGenerator.correctHeaderAndScrollbodyWidth();
      }
    };

    vGridAttributesResizeCol.prototype.updateHeader = function updateHeader(e) {
      var newWidth = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
      if (parseInt(newWidth) > 15) {
        this.vGridConfig.colConfig[this.index].colWidth = parseInt(newWidth);
        this.mainCol.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
        this.mainCol.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";

        if (this.vGridConfig.attResizableHeadersAndRows) {
          var columnsToFix = this.vGridGenerator.contentElement.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + this.index);

          for (var col = 0; col < columnsToFix.length; col++) {
            columnsToFix[col].style.width = newWidth;
          }

          this.vGridGenerator.correctRowAndScrollbodyWidth();
          this.vGridGenerator.updateGridScrollbars();
        }
      }
    };

    vGridAttributesResizeCol.prototype.onmousedown = function onmousedown(e) {
      var _this3 = this;

      this.resizable = true;

      this.screenX = e.screenX;
      this.originalWidth = this.mainCol.style.width;
      this.index = this.mainCol.getAttribute("column-no");
      this.started = false;

      this.vGridGenerator.headerElement.onmousemove = function (e) {
        _this3.started = true;
        _this3.onmousemove(e);
      };

      this.vGridGenerator.headerElement.onmouseup = function (e) {
        if (!_this3.started) {
          _this3.vGridGenerator.headerElement.onmousemove = "";
        }
      };
    };

    return vGridAttributesResizeCol;
  }()) || _class) || _class);
});