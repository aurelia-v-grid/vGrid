'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFlOztBQUN2Qjs7OzRDQUtLLHFDQUZaLGNBQWMseUJBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFPQyxpQkFOVywwQkFNWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBTmpCLDRCQU1pQjs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO0FBRzFCLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQU4sQ0FITztTQUE1Qjs7QUFOVyw2Q0FnQlgscUJBQUssUUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEVzs7O0FBaEJGLDZDQXdCWCwrQkFBVzs7O0FBRVQsY0FBSSxZQUFZLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaLENBRks7QUFHVCxlQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLFNBQXpCLEVBSFM7QUFJVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBSlM7O0FBTVQsY0FBSSxhQUFhLEtBQUssV0FBTCxDQUFpQixnQkFBakIsR0FBb0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFVBQXJCLEdBQWtDLEVBQXRFLENBTlI7QUFPVCxjQUFJLFVBQUosRUFBZ0I7QUFDZCxzQkFBVSxTQUFWLENBQW9CLEdBQXBCLENBQXdCLFVBQXhCLEVBRGM7V0FBaEI7O0FBS0EsZUFBSyxRQUFMLENBQWMsU0FBZCxFQVpTOztBQWVULG9CQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQXJCLENBQTNCLENBZlM7QUFnQlQsb0JBQVUsS0FBVixDQUFnQixNQUFoQixHQUF5QixNQUF6QixDQWhCUzs7QUFtQlQsZUFBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWYsQ0FuQlM7QUFvQlQsb0JBQVUsV0FBVixDQUFzQixLQUFLLE9BQUwsQ0FBdEIsQ0FwQlM7O0FBdUJULGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLGFBQXRCLEVBQXFDLEtBQUssTUFBTCxDQUFZLFNBQVosRUFBL0QsRUF2QlM7QUF3QlQsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFLLFdBQUwsR0FBbUIsS0FBSyxXQUFMLEdBQW1CLEVBQXRDLENBeEJaOztBQTJCVCxlQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLFVBQXBCLENBM0JTO0FBNEJULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0E1QlM7QUE2QlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQTdCUztBQThCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBOUJTO0FBK0JULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsR0FBOEIsU0FBOUIsQ0EvQlM7QUFnQ1QsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FBM0IsQ0FoQ1M7O0FBa0NULGVBQUssS0FBTCxHQUFhLENBQWIsQ0FsQ1M7QUFtQ1QsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixDQUE3QixDQW5DUzs7QUFzQ1QsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixZQUFLO0FBQzFCLGdCQUFJLE1BQUssT0FBTCxDQUFhLE9BQWIsRUFBc0I7QUFDeEIsb0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsR0FEd0I7YUFBMUIsTUFFTztBQUNMLG9CQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFdBQTFCLEdBREs7YUFGUDtBQUtBLGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGtCQUExQixHQU4wQjtXQUFMLENBdENkOzs7QUF4QkEsNkNBOEVYLDZCQUFTLFNBQVM7QUFDaEIsY0FBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLElBQUQsRUFBUztBQUN0QixvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLElBQXRCLEVBRHNCO1dBQVQsQ0FEQzs7QUFLaEIsY0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDL0Isb0JBQVEsS0FBUixDQUFjLEdBQWQsSUFBcUIsS0FBckIsQ0FEK0I7V0FBZixDQUxGOztBQVNoQixtQkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FBVCxDQVRnQjtBQVVoQixtQkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBckIsQ0FBVCxDQVZnQjtBQVdoQixtQkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FBVCxDQVhnQjtBQVloQixzQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUFoQyxPQUE5QixFQVpnQjs7O2VBOUVQIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
