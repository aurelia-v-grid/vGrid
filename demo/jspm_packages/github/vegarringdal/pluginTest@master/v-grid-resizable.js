/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridResizable = exports.VGridResizable = function () {
    function VGridResizable(vGrid) {
      _classCallCheck(this, VGridResizable);

      this.resizable = false;

      this.vGrid = vGrid;
      this.resizable = false;
    }

    VGridResizable.prototype.init = function init() {
      var _this = this;

      this.vGridConfig = this.vGrid.vGridConfig;
      this.vGridGenerator = this.vGrid.vGridGenerator;
      this.vGridSortable = this.vGrid.vGridSortable;

      var headerCells = this.vGridGenerator.htmlCache.header.querySelectorAll("." + this.vGridConfig.css.rowHeaderCell);
      for (var i = 0; i < headerCells.length; i++) {

        var resizeHandle = document.createElement("DIV");
        resizeHandle.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);

        resizeHandle.onmousedown = function (e) {
          _this.onmousedown(e);
        };

        headerCells[i].appendChild(resizeHandle);
      }
    };

    VGridResizable.prototype.onmouseup = function onmouseup() {
      var _this2 = this;

      setTimeout(function () {
        _this2.resizable = false;
        if (_this2.vGridConfig.isSortableHeader) {
          _this2.vGridSortable.option("disabled", _this2.resizable);
        }
      }, 30);

      this.vGridGenerator.htmlCache.header.onmouseleave = "";
      this.vGridGenerator.htmlCache.header.onmousemove = "";
      this.vGridGenerator.htmlCache.header.onmouseup = "";

      this.vGridConfig.columnWidthArray[this.index] = parseInt(this.xElement.offsetParent.style.width);

      this.vGridGenerator.htmlCache.rowTemplate = null;
      this.vGridGenerator.correctRowAndScrollbodyWidth();
      this.vGridGenerator.recreateViewSlots();
      this.vGridGenerator.updateGridScrollbars();
      this.vGridGenerator.fillDataInRows(true);
    };

    VGridResizable.prototype.onmousemove = function onmousemove(e) {
      var _this3 = this;

      this.vGridGenerator.htmlCache.header.onmouseup = function () {
        _this3.onmouseup();
      };

      this.vGridGenerator.htmlCache.header.onmouseleave = function (e) {
        _this3.vGridGenerator.htmlCache.header.onmouseup(e);
      };

      if (this.resizable) {
        this.updateHeader(e);
      } else {
        this.vGridGenerator.correctHeaderAndScrollbodyWidth();
      }
    };

    VGridResizable.prototype.updateHeader = function updateHeader(e) {
      var newWidth = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
      this.vGridConfig.columnWidthArray[this.index] = parseInt(newWidth);
      this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";
      this.xElement.offsetParent.style.width = parseInt(this.originalWidth) - (this.screenX - e.screenX) + "px";

      if (this.vGridConfig.resizableHeadersAndRows) {
        var columnsToFix = this.vGridGenerator.htmlCache.content.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + this.index);

        for (var col = 0; col < columnsToFix.length; col++) {
          columnsToFix[col].style.width = newWidth;
        }

        this.vGridGenerator.correctRowAndScrollbodyWidth();
        this.vGridGenerator.updateGridScrollbars();
      }
    };

    VGridResizable.prototype.onmousedown = function onmousedown(e) {
      var _this4 = this;

      this.resizable = true;

      if (this.vGridConfig.isSortableHeader) {
        this.vGridSortable.option("disabled", this.resizable);
      }

      this.screenX = e.screenX;
      this.xElement = e.target;
      this.originalWidth = this.xElement.offsetParent.style.width;
      this.index = this.xElement.offsetParent.getAttribute("column-no");

      this.vGridGenerator.htmlCache.header.onmousemove = function (e) {
        _this4.onmousemove(e);
      };
    };

    return VGridResizable;
  }();
});