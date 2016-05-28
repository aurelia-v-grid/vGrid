'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, VGridHeaderLabel;

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
    }],
    execute: function () {
      _export('VGridHeaderLabel', VGridHeaderLabel = (_dec = customElement('v-grid-label'), _dec2 = inject(Element), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridHeaderLabel(element) {
          _classCallCheck(this, VGridHeaderLabel);

          _initDefineProp(this, 'type', _descriptor, this);

          this.element = element;
        }

        VGridHeaderLabel.prototype.bind = function bind(parent) {
          this.parent = parent;
          this.vGrid = parent.vGrid;
          this.vGridConfig = parent.vGrid.vGridConfig;
        };

        VGridHeaderLabel.prototype.attached = function attached() {
          this.content = this.element.children[0];
          this.setStyle(this.content);
          this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
          this.content.style.height = "initial";
        };

        VGridHeaderLabel.prototype.setStyle = function setStyle(element) {

          var addClass = function addClass(name) {
            element.classList.add(name);
          };

          var setStyleTag = function setStyleTag(tag, value) {
            element.style[tag] = value;
          };

          var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";

          switch (this.type) {
            case "labelTop":
              addClass(this.vGridConfig.css.cellContent);
              addClass(this.vGridConfig.css.filterLabelTop);
              dragHandle ? addClass(dragHandle) : "";
              addClass(this.vGridConfig.css.orderHandle);
              setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
              break;
            case "labelBottom":
              addClass(this.vGridConfig.css.cellContent);
              addClass(this.vGridConfig.css.filterLabelBottom);
              dragHandle ? addClass(dragHandle) : "";
              addClass(this.vGridConfig.css.orderHandle);
              setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
              break;
            case "blankLabel":
              addClass(this.vGridConfig.css.cellContent);
              if (this.vGridConfig.filterOnAtTop) {
                addClass(this.vGridConfig.css.filterLabelBottom);
              } else {
                addClass(this.vGridConfig.css.filterLabelTop);
              }
              addClass(this.vGridConfig.css.orderHandle);
              break;
            case "single":
              addClass(this.vGridConfig.css.cellContent);
              dragHandle ? addClass(dragHandle) : "";
              addClass(this.vGridConfig.css.orderHandle);
              setStyleTag("line-height", this.vGridConfig.headerHeight + 'px');
              break;
            default:
              break;
          }
        };

        return VGridHeaderLabel;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridHeaderLabel', VGridHeaderLabel);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtbGFiZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7OztrQ0FTbEIsZ0IsV0FGWixjQUFjLGNBQWQsQyxVQUNBLE9BQU8sT0FBUCxDO0FBT0Msa0NBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBOztBQUNuQixlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7O21DQU1ELEksaUJBQUssTSxFQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGVBQUssS0FBTCxHQUFhLE9BQU8sS0FBcEI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsT0FBTyxLQUFQLENBQWEsV0FBaEM7QUFDRCxTOzttQ0FNRCxRLHVCQUFXO0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmO0FBQ0EsZUFBSyxRQUFMLENBQWMsS0FBSyxPQUFuQjtBQUNBLGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLGFBQWhELEVBQStELEtBQUssTUFBTCxDQUFZLFNBQVosRUFBL0Q7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLFNBQTVCO0FBR0QsUzs7bUNBRUQsUSxxQkFBUyxPLEVBQVM7O0FBRWhCLGNBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxJQUFELEVBQVM7QUFDdEIsb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixJQUF0QjtBQUNELFdBRkQ7O0FBSUEsY0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDL0Isb0JBQVEsS0FBUixDQUFjLEdBQWQsSUFBcUIsS0FBckI7QUFDRCxXQUZEOztBQUlBLGNBQUksYUFBYSxLQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLEdBQW9DLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixVQUF6RCxHQUFzRSxFQUF2Rjs7QUFHQSxrQkFBUSxLQUFLLElBQWI7QUFDRSxpQkFBSyxVQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQTlCO0FBQ0EsMkJBQWEsU0FBUyxVQUFULENBQWIsR0FBb0MsRUFBcEM7QUFDQSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBOUI7QUFDQSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUE5RDtBQUNBO0FBQ0YsaUJBQUssYUFBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUE5QjtBQUNBLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixpQkFBOUI7QUFDQSwyQkFBYSxTQUFTLFVBQVQsQ0FBYixHQUFvQyxFQUFwQztBQUNBLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUE5QjtBQUNBLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQTlEO0FBQ0E7QUFDRixpQkFBSyxZQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0Esa0JBQUksS0FBSyxXQUFMLENBQWlCLGFBQXJCLEVBQW9DO0FBQ2xDLHlCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixpQkFBOUI7QUFDRCxlQUZELE1BRU87QUFDTCx5QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBOUI7QUFDRDtBQUNELHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUE5QjtBQUNBO0FBQ0YsaUJBQUssUUFBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUE5QjtBQUNBLDJCQUFhLFNBQVMsVUFBVCxDQUFiLEdBQW9DLEVBQXBDO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0EsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBL0M7QUFDQTtBQUNGO0FBQ0U7QUEvQko7QUFtQ0QsUzs7O2dGQWhGQSxRIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtbGFiZWwuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
