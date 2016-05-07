'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridHeaderFilter;

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
      _export('VGridHeaderFilter', VGridHeaderFilter = (_dec = customElement('v-grid-filter'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridHeaderFilter(element, vGrid) {
          _classCallCheck(this, VGridHeaderFilter);

          _initDefineProp(this, 'type', _descriptor, this);

          _initDefineProp(this, 'filterValue', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridConfig = vGrid.vGridConfig;
        }

        VGridHeaderFilter.prototype.filterValueChanged = function filterValueChanged(newValue, oldValue) {
          this.content.value = newValue;
          this.content.onchange({ keyKode: 13 });
        };

        VGridHeaderFilter.prototype.bind = function bind(parent) {
          this.parent = parent;
        };

        VGridHeaderFilter.prototype.attached = function attached() {
          this.content = this.element.children[0];
          this.setStyle();
          this.content.onkeyup = this.parent.onKeyUpEventOnFilter.bind(this.parent);
          this.content.onchange = this.parent.onChangeEventOnFilter.bind(this.parent);
          this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
          this.content.value = this.filterValue ? this.filterValue : "";
        };

        VGridHeaderFilter.prototype.setStyle = function setStyle() {
          var _this = this;

          var addClass = function addClass(name) {
            _this.content.classList.add(name);
          };

          var setStyleTag = function setStyleTag(tag, value) {
            _this.content.style[tag] = value;
          };

          var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";

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

        return VGridHeaderFilter;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterValue', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridHeaderFilter', VGridHeaderFilter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7QUFBUTtBQUFlOztBQUN2Qjs7O21DQUtLLDRCQUZaLGNBQWMsZUFBZCxXQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQjtBQU1DLGlCQUxXLGlCQUtYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtnQ0FMakIsbUJBS2lCOzs7Ozs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO0FBRzFCLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQU4sQ0FITztTQUE1Qjs7QUFMVyxvQ0FXWCxpREFBbUIsVUFBVSxVQUFVO0FBQ3JDLGVBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsUUFBckIsQ0FEcUM7QUFFckMsZUFBSyxPQUFMLENBQWEsUUFBYixDQUFzQixFQUFDLFNBQVMsRUFBVCxFQUF2QixFQUZxQzs7O0FBWDVCLG9DQWlCWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUFqQkYsb0NBc0JYLCtCQUFXO0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmLENBRFM7QUFFVCxlQUFLLFFBQUwsR0FGUztBQUdULGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBSyxNQUFMLENBQVksb0JBQVosQ0FBaUMsSUFBakMsQ0FBc0MsS0FBSyxNQUFMLENBQTdELENBSFM7QUFJVCxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLEtBQUssTUFBTCxDQUFZLHFCQUFaLENBQWtDLElBQWxDLENBQXVDLEtBQUssTUFBTCxDQUEvRCxDQUpTO0FBS1QsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBdEIsRUFBcUMsS0FBSyxNQUFMLENBQVksU0FBWixFQUEvRCxFQUxTO0FBTVQsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFLLFdBQUwsR0FBbUIsS0FBSyxXQUFMLEdBQW1CLEVBQXRDLENBTlo7OztBQXRCQSxvQ0FnQ1gsK0JBQVc7OztBQUVULGNBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxJQUFELEVBQVM7QUFDdEIsa0JBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBM0IsRUFEc0I7V0FBVCxDQUZOOztBQU1ULGNBQUksY0FBYyxTQUFkLFdBQWMsQ0FBQyxHQUFELEVBQU0sS0FBTixFQUFlO0FBQy9CLGtCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLEdBQW5CLElBQTBCLEtBQTFCLENBRCtCO1dBQWYsQ0FOVDs7QUFVVCxjQUFJLGFBQWEsS0FBSyxXQUFMLENBQWlCLGdCQUFqQixHQUFvQyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsVUFBckIsR0FBa0MsRUFBdEUsQ0FWUjs7QUFZVCxrQkFBUSxLQUFLLElBQUw7QUFDTixpQkFBSyxXQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixDQUFULENBRkY7QUFHRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FBVCxDQUhGO0FBSUUsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBaEMsT0FBOUIsRUFKRjtBQUtFLG9CQUxGO0FBREYsaUJBT08sY0FBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBREY7QUFFRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQXJCLENBQVQsQ0FGRjtBQUdFLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQWhDLE9BQTlCLEVBSEY7QUFJRSxvQkFKRjtBQVBGO0FBYUksb0JBREY7QUFaRixXQVpTOzs7ZUFoQ0E7Z0ZBQ1Y7OztzRkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtaGVhZGVyLWNlbGxzLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
