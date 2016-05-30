/* */ 
define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridHeaderFilterSelection = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var VGridHeaderFilterSelection = exports.VGridHeaderFilterSelection = (_dec = (0, _aureliaFramework.customElement)('v-grid-filter-selection'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = function () {
    function VGridHeaderFilterSelection(element) {
      _classCallCheck(this, VGridHeaderFilterSelection);

      this.element = element;
    }

    VGridHeaderFilterSelection.prototype.bind = function bind(parent) {
      this.parent = parent;
      this.vGrid = parent.vGrid;
      this.vGridConfig = parent.vGrid.vGridConfig;
    };

    VGridHeaderFilterSelection.prototype.attached = function attached() {
      var _this = this;

      var container = document.createElement("div");
      this.element.appendChild(container);
      this.element.style.height = "100%";

      var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";
      if (dragHandle) {
        container.classList.add(dragHandle);
      }

      this.setStyle(container);

      container.classList.remove(this.vGridConfig.css.filterInputTop);
      container.style.height = "100%";

      this.content = document.createElement("input");
      container.appendChild(this.content);

      this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
      this.content.value = this.filterValue ? this.filterValue : "";

      this.content.type = "checkbox";
      this.content.style.height = "100%";
      this.content.style.display = "block";
      this.content.style.margin = "auto";
      this.content.style.position = "initial";
      this.content.classList.add(this.vGridConfig.css.filterHandle);

      this.state = 3;
      this.content.style.opacity = 1;

      this.content.onclick = function () {
        if (_this.content.checked) {
          _this.vGrid.vGridSelection.selectAll();
        } else {
          _this.vGrid.vGridSelection.deSelectAll();
        }
        _this.vGrid.vGridGenerator.rebuildColumnsRows();
      };
    };

    VGridHeaderFilterSelection.prototype.setStyle = function setStyle(element) {
      var addClass = function addClass(name) {
        element.classList.add(name);
      };

      var setStyleTag = function setStyleTag(tag, value) {
        element.style[tag] = value;
      };

      addClass(this.vGridConfig.css.cellContent);
      addClass(this.vGridConfig.css.filterInputTop);
      addClass(this.vGridConfig.css.filterHandle);
      setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
    };

    return VGridHeaderFilterSelection;
  }()) || _class) || _class);
});