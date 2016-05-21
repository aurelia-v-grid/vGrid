'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, VGridHeaderFilterSelection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridHeaderFilterSelection', VGridHeaderFilterSelection = (_dec = customElement('v-grid-filter-selection'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function VGridHeaderFilterSelection(element, vGrid) {
          _classCallCheck(this, VGridHeaderFilterSelection);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridConfig = vGrid.vGridConfig;
        }

        VGridHeaderFilterSelection.prototype.bind = function bind(parent) {
          this.parent = parent;
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
      }()) || _class) || _class));

      _export('VGridHeaderFilterSelection', VGridHeaderFilterSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsYyxxQkFBQSxROztBQUd2QixXLFVBQUEsSzs7OzRDQUtLLDBCLFdBRlosY0FBYyx5QkFBZCxDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFPQyw0Q0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBekI7QUFDRDs7NkNBTUQsSSxpQkFBSyxNLEVBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0QsUzs7NkNBTUQsUSx1QkFBVztBQUFBOztBQUVULGNBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLFNBQXpCO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1Qjs7QUFFQSxjQUFJLGFBQWEsS0FBSyxXQUFMLENBQWlCLGdCQUFqQixHQUFvQyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsVUFBekQsR0FBc0UsRUFBdkY7QUFDQSxjQUFJLFVBQUosRUFBZ0I7QUFDZCxzQkFBVSxTQUFWLENBQW9CLEdBQXBCLENBQXdCLFVBQXhCO0FBQ0Q7O0FBR0QsZUFBSyxRQUFMLENBQWMsU0FBZDs7QUFHQSxvQkFBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFoRDtBQUNBLG9CQUFVLEtBQVYsQ0FBZ0IsTUFBaEIsR0FBeUIsTUFBekI7O0FBR0EsZUFBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWY7QUFDQSxvQkFBVSxXQUFWLENBQXNCLEtBQUssT0FBM0I7O0FBR0EsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBaEQsRUFBK0QsS0FBSyxNQUFMLENBQVksU0FBWixFQUEvRDtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBSyxXQUFMLEdBQW1CLEtBQUssV0FBeEIsR0FBc0MsRUFBM0Q7O0FBR0EsZUFBSyxPQUFMLENBQWEsSUFBYixHQUFvQixVQUFwQjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsR0FBOEIsU0FBOUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUFoRDs7QUFFQSxlQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixDQUE3Qjs7QUFHQSxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFlBQUs7QUFDMUIsZ0JBQUksTUFBSyxPQUFMLENBQWEsT0FBakIsRUFBMEI7QUFDeEIsb0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUI7QUFDRCxhQUZELE1BRU87QUFDTCxvQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixXQUExQjtBQUNEO0FBQ0Qsa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsa0JBQTFCO0FBQ0QsV0FQRDtBQVVELFM7OzZDQU1ELFEscUJBQVMsTyxFQUFTO0FBQ2hCLGNBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxJQUFELEVBQVM7QUFDdEIsb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixJQUF0QjtBQUNELFdBRkQ7O0FBSUEsY0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDL0Isb0JBQVEsS0FBUixDQUFjLEdBQWQsSUFBcUIsS0FBckI7QUFDRCxXQUZEOztBQUlBLG1CQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUE5QjtBQUNBLG1CQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUE5QjtBQUNBLG1CQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUE5QjtBQUNBLHNCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQTlEO0FBQ0QsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtaGVhZGVyLWNlbGxzLWZpbHRlci1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
