'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridHeaderFilterSelection;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
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
      _export('VGridHeaderFilterSelection', VGridHeaderFilterSelection = (_dec = customElement('v-grid-filter-selection'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridHeaderFilterSelection(element, vGrid) {
          _classCallCheck(this, VGridHeaderFilterSelection);

          _initDefineProp(this, 'type', _descriptor, this);

          _initDefineProp(this, 'filterValue', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridConfig = vGrid.vGridConfig;
        }

        VGridHeaderFilterSelection.prototype.filterValueChanged = function filterValueChanged(newValue, oldValue) {};

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

          this.content.onkeyup = this.parent.onKeyUpEventOnFilter.bind(this.parent);
          this.content.onchange = this.parent.onChangeEventOnFilter.bind(this.parent);
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

          switch (this.type) {
            case "filterTop":
              addClass(this.vGridConfig.css.cellContent);
              addClass(this.vGridConfig.css.filterInputTop);
              addClass(this.vGridConfig.css.filterHandle);
              setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
              break;
            case "filterBottom":
              addClass(this.vGridConfig.css.cellContent);
              addClass(this.vGridConfig.css.filterInputBottom);
              setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
              break;
            default:
              break;
          }
        };

        return VGridHeaderFilterSelection;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterValue', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridHeaderFilterSelection', VGridHeaderFilterSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBZTs7QUFDdkI7Ozs0Q0FLSyxxQ0FGWixjQUFjLHlCQUFkLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCO0FBTUMsaUJBTFcsMEJBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQiw0QkFLaUI7Ozs7OztBQUMxQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRDBCO0FBRTFCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGMEI7QUFHMUIsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBTixDQUhPO1NBQTVCOztBQUxXLDZDQVdYLGlEQUFtQixVQUFVLFVBQVU7O0FBWDVCLDZDQWlCWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUFqQkYsNkNBc0JYLCtCQUFXOzs7QUFFVCxjQUFJLFlBQVksU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVosQ0FGSztBQUdULGVBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFIUztBQUlULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0FKUzs7QUFNVCxjQUFJLGFBQWEsS0FBSyxXQUFMLENBQWlCLGdCQUFqQixHQUFvQyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsVUFBckIsR0FBa0MsRUFBdEUsQ0FOUjtBQU9ULGNBQUksVUFBSixFQUFnQjtBQUNkLHNCQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IsVUFBeEIsRUFEYztXQUFoQjs7QUFLQSxlQUFLLFFBQUwsQ0FBYyxTQUFkLEVBWlM7O0FBY1Qsb0JBQVUsU0FBVixDQUFvQixNQUFwQixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBckIsQ0FBM0IsQ0FkUztBQWVULG9CQUFVLEtBQVYsQ0FBZ0IsTUFBaEIsR0FBeUIsTUFBekIsQ0FmUzs7QUFrQlQsZUFBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWYsQ0FsQlM7QUFtQlQsb0JBQVUsV0FBVixDQUFzQixLQUFLLE9BQUwsQ0FBdEIsQ0FuQlM7O0FBc0JULGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBSyxNQUFMLENBQVksb0JBQVosQ0FBaUMsSUFBakMsQ0FBc0MsS0FBSyxNQUFMLENBQTdELENBdEJTO0FBdUJULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsS0FBSyxNQUFMLENBQVkscUJBQVosQ0FBa0MsSUFBbEMsQ0FBdUMsS0FBSyxNQUFMLENBQS9ELENBdkJTO0FBd0JULGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLGFBQXRCLEVBQXFDLEtBQUssTUFBTCxDQUFZLFNBQVosRUFBL0QsRUF4QlM7QUF5QlQsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFLLFdBQUwsR0FBbUIsS0FBSyxXQUFMLEdBQW1CLEVBQXRDLENBekJaOztBQTRCVCxlQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLFVBQXBCLENBNUJTO0FBNkJULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0E3QlM7QUE4QlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQTlCUztBQStCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLE1BQTVCLENBL0JTO0FBZ0NULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsR0FBOEIsU0FBOUIsQ0FoQ1M7QUFpQ1QsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FBM0IsQ0FqQ1M7O0FBbUNULGVBQUssS0FBTCxHQUFhLENBQWIsQ0FuQ1M7QUFvQ1QsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixDQUE3QixDQXBDUzs7QUF1Q1QsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixZQUFLO0FBQzFCLGdCQUFJLE1BQUssT0FBTCxDQUFhLE9BQWIsRUFBc0I7QUFDeEIsb0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsR0FEd0I7YUFBMUIsTUFFTztBQUNMLG9CQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFdBQTFCLEdBREs7YUFGUDtBQUtBLGtCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGtCQUExQixHQU4wQjtXQUFMLENBdkNkOzs7QUF0QkEsNkNBMEVYLDZCQUFTLFNBQVM7O0FBRWhCLGNBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxJQUFELEVBQVM7QUFDdEIsb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixJQUF0QixFQURzQjtXQUFULENBRkM7O0FBTWhCLGNBQUksY0FBYyxTQUFkLFdBQWMsQ0FBQyxHQUFELEVBQU0sS0FBTixFQUFlO0FBQy9CLG9CQUFRLEtBQVIsQ0FBYyxHQUFkLElBQXFCLEtBQXJCLENBRCtCO1dBQWYsQ0FORjs7QUFXaEIsa0JBQVEsS0FBSyxJQUFMO0FBQ04saUJBQUssV0FBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBREY7QUFFRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBckIsQ0FBVCxDQUZGO0FBR0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQXJCLENBQVQsQ0FIRjtBQUlFLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQWhDLE9BQTlCLEVBSkY7QUFLRSxvQkFMRjtBQURGLGlCQU9PLGNBQUw7QUFDRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FBVCxDQURGO0FBRUUsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGlCQUFyQixDQUFULENBRkY7QUFHRSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUFoQyxPQUE5QixFQUhGO0FBSUUsb0JBSkY7QUFQRjtBQWFJLG9CQURGO0FBWkYsV0FYZ0I7OztlQTFFUDtnRkFDVjs7O3NGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
