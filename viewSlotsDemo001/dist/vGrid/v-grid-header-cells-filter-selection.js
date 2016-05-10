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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFlOztBQUN2Qjs7OzRDQUtLLHFDQUZaLGNBQWMseUJBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFJQyxpQkFIVywwQkFHWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBSGpCLDRCQUdpQjs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO0FBRzFCLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQU4sQ0FITztTQUE1Qjs7QUFIVyw2Q0FXWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUFYRiw2Q0FnQlgsK0JBQVc7OztBQUVULGNBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWixDQUZLO0FBR1QsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixTQUF6QixFQUhTO0FBSVQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQUpTOztBQU1ULGNBQUksYUFBYSxLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEdBQW9DLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixVQUFyQixHQUFrQyxFQUF0RSxDQU5SO0FBT1QsY0FBSSxVQUFKLEVBQWdCO0FBQ2Qsc0JBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixVQUF4QixFQURjO1dBQWhCOztBQUtBLGVBQUssUUFBTCxDQUFjLFNBQWQsRUFaUzs7QUFlVCxvQkFBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixDQUEzQixDQWZTO0FBZ0JULG9CQUFVLEtBQVYsQ0FBZ0IsTUFBaEIsR0FBeUIsTUFBekIsQ0FoQlM7O0FBbUJULGVBQUssT0FBTCxHQUFlLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFmLENBbkJTO0FBb0JULG9CQUFVLFdBQVYsQ0FBc0IsS0FBSyxPQUFMLENBQXRCLENBcEJTOztBQXVCVCxlQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixhQUF0QixFQUFxQyxLQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQS9ELEVBdkJTO0FBd0JULGVBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBSyxXQUFMLEdBQW1CLEtBQUssV0FBTCxHQUFtQixFQUF0QyxDQXhCWjs7QUEyQlQsZUFBSyxPQUFMLENBQWEsSUFBYixHQUFvQixVQUFwQixDQTNCUztBQTRCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBNUJTO0FBNkJULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0IsQ0E3QlM7QUE4QlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQTlCUztBQStCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLFFBQW5CLEdBQThCLFNBQTlCLENBL0JTO0FBZ0NULGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQXJCLENBQTNCLENBaENTOztBQWtDVCxlQUFLLEtBQUwsR0FBYSxDQUFiLENBbENTO0FBbUNULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsQ0FBN0IsQ0FuQ1M7O0FBc0NULGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsWUFBSztBQUMxQixnQkFBSSxNQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCO0FBQ3hCLG9CQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLEdBRHdCO2FBQTFCLE1BRU87QUFDTCxvQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixXQUExQixHQURLO2FBRlA7QUFLQSxrQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixrQkFBMUIsR0FOMEI7V0FBTCxDQXRDZDs7O0FBaEJBLDZDQW1FWCw2QkFBUyxTQUFTO0FBQ2hCLGNBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxJQUFELEVBQVM7QUFDdEIsb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixJQUF0QixFQURzQjtXQUFULENBREM7O0FBS2hCLGNBQUksY0FBYyxTQUFkLFdBQWMsQ0FBQyxHQUFELEVBQU0sS0FBTixFQUFlO0FBQy9CLG9CQUFRLEtBQVIsQ0FBYyxHQUFkLElBQXFCLEtBQXJCLENBRCtCO1dBQWYsQ0FMRjs7QUFTaEIsbUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FUZ0I7QUFVaEIsbUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQXJCLENBQVQsQ0FWZ0I7QUFXaEIsbUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQXJCLENBQVQsQ0FYZ0I7QUFZaEIsc0JBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBaEMsT0FBOUIsRUFaZ0I7OztlQW5FUCIsImZpbGUiOiJ2R3JpZC92LWdyaWQtaGVhZGVyLWNlbGxzLWZpbHRlci1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
