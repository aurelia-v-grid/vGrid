/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vGridDragDropCol = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var vGridDragDropCol = exports.vGridDragDropCol = (_dec = (0, _aureliaFramework.customAttribute)('v-drag-drop-col'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec(_class = _dec2(_class = function () {
    function vGridDragDropCol(element, vGrid) {
      _classCallCheck(this, vGridDragDropCol);

      this.vGrid = vGrid;
      this.element = element;
      this.dragEl;
      this.canMove = false;
      this.sortable = false;
      this.onDragOverX = this.onDragOver.bind(this);
      this.onDragEndX = this.onDragEnd.bind(this);
    }

    vGridDragDropCol.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
    };

    vGridDragDropCol.prototype.attached = function attached() {
      var _this = this;

      this.setDragHandles();

      this.rootEl = this.vGrid.vGridGenerator.headerScrollElement;
      this.mainCol.addEventListener('dragstart', this.onDragStart.bind(this), false);

      this.vGrid.element.addEventListener("vGridDragStart", function () {
        _this.drophelper.style["z-index"] = "100";
      });

      this.vGrid.element.addEventListener("vGridDragStop", function () {
        _this.drophelper.style["z-index"] = "-100";
      });
    };

    vGridDragDropCol.prototype.setDragHandles = function setDragHandles() {
      var _this2 = this;

      this.element.classList.add("vGrid-vGridDragHandle");

      var mainCol = this.element;
      while (mainCol.nodeName !== 'V-GRID-HEADER-COL') {
        mainCol = mainCol.parentNode;
      }
      this.mainCol = mainCol;

      var drophelper = document.createElement("v-grid-drop");
      drophelper.style.width = "30px";
      drophelper.style.bottom = 0;
      drophelper.style.top = 0;
      drophelper.style.left = parseInt(this.mainCol.clientWidth / 2) - 15 + "px";

      drophelper.style["z-index"] = "-100";
      drophelper.style.position = "absolute";
      this.mainCol.appendChild(drophelper);
      this.drophelper = drophelper;

      this.element.onmouseenter = function () {
        _this2.canMove = true;

        _this2.setDraggable(true);
      };

      this.element.onmouseleave = function () {
        _this2.canMove = false;

        _this2.setDraggable(false);
      };
    };

    vGridDragDropCol.prototype.setDraggable = function setDraggable(newStatus) {
      this.mainCol.draggable = newStatus;
    };

    vGridDragDropCol.prototype.updateColumns = function updateColumns() {
      var _this3 = this;

      var tempArr = [];
      var vGridConfig = [];

      var dragHandles = this.vGrid.vGridGenerator.gridElement.getElementsByTagName('v-grid-header-col');
      [].slice.call(dragHandles).forEach(function (itemEl, index) {
        tempArr.push(parseInt(itemEl.getAttribute("column-no")));
        vGridConfig.push(null);
        itemEl.setAttribute("column-no", index);
      });

      tempArr.forEach(function (oldI, newI) {
        vGridConfig[newI] = _this3.vGrid.vGridConfig.colConfig[oldI];
      });

      this.vGrid.vGridConfig.colConfig = vGridConfig;

      this.vGrid.vGridGenerator.rowTemplate = null;

      this.vGrid.vGridGenerator.rebuildColumnsRows();
    };

    vGridDragDropCol.prototype.onDragStart = function onDragStart(evt) {
      var _this4 = this;

      if (this.canMove) {
        this.dragEl = evt.target;

        this.colNo = parseInt(this.dragEl.getAttribute("column-no"));

        var event = new CustomEvent("vGridDragStart", {
          detail: "",
          bubbles: true
        });
        this.vGrid.element.dispatchEvent(event);

        this.sortable = true;

        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', '');

        this.rootEl.addEventListener('dragover', this.onDragOverX, false);
        this.rootEl.addEventListener('dragend', this.onDragEndX, false);

        setTimeout(function () {
          _this4.dragEl.classList.add('ghost');
        }, 0);
      } else {
        evt.preventDefault();
      }
    };

    vGridDragDropCol.prototype.onDragOver = function onDragOver(evt) {
      if (evt.preventDefault !== void 0) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      var colNo = -1;

      var target = evt.target;
      if (target) {
        while (target.nodeName !== 'V-GRID-HEADER-COL') {
          target = target.offsetParent;
        }

        colNo = parseInt(target.getAttribute("column-no"));
        var targetNode = evt.target.nodeName === 'V-GRID-DROP';

        if (colNo !== this.colNo && targetNode && colNo > -1) {
          var after = colNo + 1 !== this.colNo;
          this.colNo = colNo;

          this.rootEl.insertBefore(this.dragEl, after ? target.nextElementSibling : target);

          this.updateColumns();
        }
      }
    };

    vGridDragDropCol.prototype.onDragEnd = function onDragEnd(evt) {

      evt.preventDefault();

      var event = new CustomEvent("vGridDragStop", {
        detail: "",
        bubbles: true
      });
      this.vGrid.element.dispatchEvent(event);

      this.dragEl.classList.remove('ghost');
      this.rootEl.removeEventListener('dragover', this.onDragOverX, false);
      this.rootEl.removeEventListener('dragend', this.onDragEndX, false);
      this.sortable = false;
    };

    return vGridDragDropCol;
  }()) || _class) || _class);
});