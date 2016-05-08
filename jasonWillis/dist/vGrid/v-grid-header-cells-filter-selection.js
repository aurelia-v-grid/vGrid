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

        VGridHeaderFilterSelection.prototype.filterValueChanged = function filterValueChanged(newValue, oldValue) {
          this.content.value = newValue;
          this.content.onchange({ keyKode: 13 });

          if (this.vGridConfig.colTypeArray[this.parent.columnNo] === "checkbox") {
            if (newValue === "") {
              this.state = 0;
              this.content.style.opacity = 0.3;
              this.content.checked = false;
            }
          }
        };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RO0FBQVE7QUFBZTs7QUFDdkI7Ozs0Q0FLSyxxQ0FGWixjQUFjLHlCQUFkLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCO0FBTUMsaUJBTFcsMEJBS1gsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUxqQiw0QkFLaUI7Ozs7OztBQUMxQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRDBCO0FBRTFCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGMEI7QUFHMUIsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBTixDQUhPO1NBQTVCOztBQUxXLDZDQVdYLGlEQUFtQixVQUFVLFVBQVU7QUFDckMsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixRQUFyQixDQURxQztBQUVyQyxlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEVBQUMsU0FBUyxFQUFULEVBQXZCLEVBRnFDOztBQUtyQyxjQUFJLEtBQUssV0FBTCxDQUFpQixZQUFqQixDQUE4QixLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQTlCLEtBQXdELFVBQXhELEVBQW9FO0FBQ3RFLGdCQUFJLGFBQWEsRUFBYixFQUFpQjtBQUNuQixtQkFBSyxLQUFMLEdBQWEsQ0FBYixDQURtQjtBQUVuQixtQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixHQUE3QixDQUZtQjtBQUduQixtQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUF2QixDQUhtQjthQUFyQjtXQURGOzs7QUFoQlMsNkNBMkJYLHFCQUFLLFFBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkLENBRFc7OztBQTNCRiw2Q0FnQ1gsK0JBQVc7OztBQUVULGNBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWixDQUZLO0FBR1QsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixTQUF6QixFQUhTO0FBSVQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQUpTOztBQU1ULGNBQUksYUFBYSxLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEdBQW9DLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixVQUFyQixHQUFrQyxFQUF0RSxDQU5SO0FBT1QsY0FBSSxVQUFKLEVBQWdCO0FBQ2Qsc0JBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixVQUF4QixFQURjO1dBQWhCOztBQUtBLGVBQUssUUFBTCxDQUFjLFNBQWQsRUFaUzs7QUFjVCxvQkFBVSxTQUFWLENBQW9CLE1BQXBCLENBQTJCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixDQUEzQixDQWRTO0FBZVQsb0JBQVUsS0FBVixDQUFnQixNQUFoQixHQUF5QixNQUF6QixDQWZTOztBQWtCVCxlQUFLLE9BQUwsR0FBZSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZixDQWxCUztBQW1CVCxvQkFBVSxXQUFWLENBQXNCLEtBQUssT0FBTCxDQUF0QixDQW5CUzs7QUFzQlQsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUFLLE1BQUwsQ0FBWSxvQkFBWixDQUFpQyxJQUFqQyxDQUFzQyxLQUFLLE1BQUwsQ0FBN0QsQ0F0QlM7QUF1QlQsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixLQUFLLE1BQUwsQ0FBWSxxQkFBWixDQUFrQyxJQUFsQyxDQUF1QyxLQUFLLE1BQUwsQ0FBL0QsQ0F2QlM7QUF3QlQsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBdEIsRUFBcUMsS0FBSyxNQUFMLENBQVksU0FBWixFQUEvRCxFQXhCUztBQXlCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLEtBQUssV0FBTCxHQUFtQixLQUFLLFdBQUwsR0FBbUIsRUFBdEMsQ0F6Qlo7O0FBNEJULGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsVUFBcEIsQ0E1QlM7QUE2QlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQTdCUztBQThCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCLENBOUJTO0FBK0JULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0EvQlM7QUFnQ1QsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixHQUE4QixTQUE5QixDQWhDUztBQWlDVCxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUFyQixDQUEzQixDQWpDUzs7QUFtQ1QsZUFBSyxLQUFMLEdBQWEsQ0FBYixDQW5DUztBQW9DVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLENBQTdCLENBcENTOztBQXVDVCxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFlBQUs7QUFDMUIsZ0JBQUksTUFBSyxPQUFMLENBQWEsT0FBYixFQUFzQjtBQUN4QixvQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixHQUR3QjthQUExQixNQUVPO0FBQ0wsb0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsV0FBMUIsR0FESzthQUZQO0FBS0Esa0JBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsa0JBQTFCLEdBTjBCO1dBQUwsQ0F2Q2Q7OztBQWhDQSw2Q0FvRlgsNkJBQVMsU0FBUzs7QUFFaEIsY0FBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLElBQUQsRUFBUztBQUN0QixvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLElBQXRCLEVBRHNCO1dBQVQsQ0FGQzs7QUFNaEIsY0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDL0Isb0JBQVEsS0FBUixDQUFjLEdBQWQsSUFBcUIsS0FBckIsQ0FEK0I7V0FBZixDQU5GOztBQVdoQixrQkFBUSxLQUFLLElBQUw7QUFDTixpQkFBSyxXQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixDQUFULENBRkY7QUFHRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FBVCxDQUhGO0FBSUUsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBaEMsT0FBOUIsRUFKRjtBQUtFLG9CQUxGO0FBREYsaUJBT08sY0FBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBREY7QUFFRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQXJCLENBQVQsQ0FGRjtBQUdFLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQWhDLE9BQTlCLEVBSEY7QUFJRSxvQkFKRjtBQVBGO0FBYUksb0JBREY7QUFaRixXQVhnQjs7O2VBcEZQO2dGQUNWOzs7c0ZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jZWxscy1maWx0ZXItc2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
