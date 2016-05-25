'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, _dec, _dec2, _class, VGridHeaderFilterSelection;

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
    }],
    execute: function () {
      _export('VGridHeaderFilterSelection', VGridHeaderFilterSelection = (_dec = customElement('v-grid-filter-selection'), _dec2 = inject(Element), _dec(_class = _dec2(_class = function () {
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
      }()) || _class) || _class));

      _export('VGridHeaderFilterSelection', VGridHeaderFilterSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsYyxxQkFBQSxROzs7NENBU2xCLDBCLFdBRlosY0FBYyx5QkFBZCxDLFVBQ0EsT0FBTyxPQUFQLEM7QUFPQyw0Q0FBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDRDs7NkNBTUQsSSxpQkFBSyxNLEVBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsZUFBSyxLQUFMLEdBQWEsT0FBTyxLQUFwQjtBQUNBLGVBQUssV0FBTCxHQUFtQixPQUFPLEtBQVAsQ0FBYSxXQUFoQztBQUNELFM7OzZDQU1ELFEsdUJBQVc7QUFBQTs7QUFFVCxjQUFJLFlBQVksU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0EsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixTQUF6QjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUI7O0FBRUEsY0FBSSxhQUFhLEtBQUssV0FBTCxDQUFpQixnQkFBakIsR0FBb0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFVBQXpELEdBQXNFLEVBQXZGO0FBQ0EsY0FBSSxVQUFKLEVBQWdCO0FBQ2Qsc0JBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixVQUF4QjtBQUNEOztBQUdELGVBQUssUUFBTCxDQUFjLFNBQWQ7O0FBR0Esb0JBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBaEQ7QUFDQSxvQkFBVSxLQUFWLENBQWdCLE1BQWhCLEdBQXlCLE1BQXpCOztBQUdBLGVBQUssT0FBTCxHQUFlLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFmO0FBQ0Esb0JBQVUsV0FBVixDQUFzQixLQUFLLE9BQTNCOztBQUdBLGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLGFBQWhELEVBQStELEtBQUssTUFBTCxDQUFZLFNBQVosRUFBL0Q7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLEtBQUssV0FBTCxHQUFtQixLQUFLLFdBQXhCLEdBQXNDLEVBQTNEOztBQUdBLGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsVUFBcEI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEdBQThCLFNBQTlCO0FBQ0EsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBaEQ7O0FBRUEsZUFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsQ0FBN0I7O0FBR0EsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixZQUFLO0FBQzFCLGdCQUFJLE1BQUssT0FBTCxDQUFhLE9BQWpCLEVBQTBCO0FBQ3hCLG9CQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsb0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsV0FBMUI7QUFDRDtBQUNELGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGtCQUExQjtBQUNELFdBUEQ7QUFVRCxTOzs2Q0FNRCxRLHFCQUFTLE8sRUFBUztBQUNoQixjQUFJLFdBQVcsU0FBWCxRQUFXLENBQUMsSUFBRCxFQUFTO0FBQ3RCLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsSUFBdEI7QUFDRCxXQUZEOztBQUlBLGNBQUksY0FBYyxTQUFkLFdBQWMsQ0FBQyxHQUFELEVBQU0sS0FBTixFQUFlO0FBQy9CLG9CQUFRLEtBQVIsQ0FBYyxHQUFkLElBQXFCLEtBQXJCO0FBQ0QsV0FGRDs7QUFJQSxtQkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBOUI7QUFDQSxtQkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBOUI7QUFDQSxtQkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBOUI7QUFDQSxzQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUE5RDtBQUNELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jZWxscy1maWx0ZXItc2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
