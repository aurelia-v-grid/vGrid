'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, VGridHeaderLabel;

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
      _export('VGridHeaderLabel', VGridHeaderLabel = (_dec = customElement('v-grid-label'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridHeaderLabel(element, vGrid) {
          _classCallCheck(this, VGridHeaderLabel);

          _initDefineProp(this, 'type', _descriptor, this);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridConfig = vGrid.vGridConfig;
        }

        VGridHeaderLabel.prototype.bind = function bind(parent) {
          this.parent = parent;
        };

        VGridHeaderLabel.prototype.attached = function attached() {
          this.content = this.element.children[0];
          this.setStyle();
          this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
        };

        VGridHeaderLabel.prototype.setStyle = function setStyle() {
          var _this = this;

          var addClass = function addClass(name) {
            _this.content.classList.add(name);
          };

          var setStyleTag = function setStyleTag(tag, value) {
            _this.content.style[tag] = value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtbGFiZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsYyxxQkFBQSxROztBQUN2QixXLFVBQUEsSzs7O2tDQUtLLGdCLFdBRlosY0FBYyxjQUFkLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsQztBQUtDLGtDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7QUFBQTs7QUFBQTs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsTUFBTSxXQUF6QjtBQUNEOzttQ0FHRCxJLGlCQUFLLE0sRUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQ7QUFDRCxTOzttQ0FHRCxRLHVCQUFXO0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmO0FBQ0EsZUFBSyxRQUFMO0FBQ0EsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBaEQsRUFBK0QsS0FBSyxNQUFMLENBQVksU0FBWixFQUEvRDtBQUdELFM7O21DQUVELFEsdUJBQVc7QUFBQTs7QUFFVCxjQUFJLFdBQVcsU0FBWCxRQUFXLENBQUMsSUFBRCxFQUFTO0FBQ3RCLGtCQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLElBQTNCO0FBQ0QsV0FGRDs7QUFJQSxjQUFJLGNBQWMsU0FBZCxXQUFjLENBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZTtBQUMvQixrQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixHQUFuQixJQUEwQixLQUExQjtBQUNELFdBRkQ7O0FBSUEsY0FBSSxhQUFhLEtBQUssV0FBTCxDQUFpQixnQkFBakIsR0FBb0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFVBQXpELEdBQXNFLEVBQXZGOztBQUVBLGtCQUFRLEtBQUssSUFBYjtBQUNFLGlCQUFLLFVBQUw7QUFDRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBOUI7QUFDQSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBOUI7QUFDQSwyQkFBYSxTQUFTLFVBQVQsQ0FBYixHQUFvQyxFQUFwQztBQUNBLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUE5QjtBQUNBLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQTlEO0FBQ0E7QUFDRixpQkFBSyxhQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGlCQUE5QjtBQUNBLDJCQUFhLFNBQVMsVUFBVCxDQUFiLEdBQW9DLEVBQXBDO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0EsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBOUQ7QUFDQTtBQUNGLGlCQUFLLFlBQUw7QUFDRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBOUI7QUFDQSxrQkFBSSxLQUFLLFdBQUwsQ0FBaUIsYUFBckIsRUFBb0M7QUFDbEMseUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGlCQUE5QjtBQUNELGVBRkQsTUFFTztBQUNMLHlCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUE5QjtBQUNEO0FBQ0QsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0E7QUFDRixpQkFBSyxRQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0EsMkJBQWEsU0FBUyxVQUFULENBQWIsR0FBb0MsRUFBcEM7QUFDQSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBOUI7QUFDQSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUEvQztBQUNBO0FBQ0Y7QUFDRTtBQS9CSjtBQW1DRCxTOzs7Z0ZBdEVBLFEiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jZWxscy1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
