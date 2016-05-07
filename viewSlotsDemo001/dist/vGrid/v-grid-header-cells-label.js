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
          this.setStyle(this.content);
          this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtbGFiZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBUTtBQUFRO0FBQWU7O0FBQ3ZCOzs7a0NBS0ssMkJBRlosY0FBYyxjQUFkLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCO0FBS0MsaUJBSlcsZ0JBSVgsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQUpqQixrQkFJaUI7Ozs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO0FBRzFCLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQU4sQ0FITztTQUE1Qjs7QUFKVyxtQ0FXWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUFYRixtQ0FnQlgsK0JBQVc7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWYsQ0FEUztBQUVULGVBQUssUUFBTCxDQUFjLEtBQUssT0FBTCxDQUFkLENBRlM7QUFHVCxlQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixhQUF0QixFQUFxQyxLQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQS9ELEVBSFM7OztBQWhCQSxtQ0F3QlgsNkJBQVMsU0FBUzs7QUFFaEIsY0FBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLElBQUQsRUFBUztBQUN0QixvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLElBQXRCLEVBRHNCO1dBQVQsQ0FGQzs7QUFNaEIsY0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDL0Isb0JBQVEsS0FBUixDQUFjLEdBQWQsSUFBcUIsS0FBckIsQ0FEK0I7V0FBZixDQU5GOztBQVVoQixjQUFJLGFBQWEsS0FBSyxXQUFMLENBQWlCLGdCQUFqQixHQUFvQyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsVUFBckIsR0FBa0MsRUFBdEUsQ0FWRDs7QUFZaEIsa0JBQVEsS0FBSyxJQUFMO0FBQ04saUJBQUssVUFBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBREY7QUFFRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBckIsQ0FBVCxDQUZGO0FBR0UsMkJBQWEsU0FBUyxVQUFULENBQWIsR0FBb0MsRUFBcEMsQ0FIRjtBQUlFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBSkY7QUFLRSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUFoQyxPQUE5QixFQUxGO0FBTUUsb0JBTkY7QUFERixpQkFRTyxhQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixpQkFBckIsQ0FBVCxDQUZGO0FBR0UsMkJBQWEsU0FBUyxVQUFULENBQWIsR0FBb0MsRUFBcEMsQ0FIRjtBQUlFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBSkY7QUFLRSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUFoQyxPQUE5QixFQUxGO0FBTUUsb0JBTkY7QUFSRixpQkFlTyxZQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLGtCQUFJLEtBQUssV0FBTCxDQUFpQixhQUFqQixFQUFnQztBQUNsQyx5QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQXJCLENBQVQsQ0FEa0M7ZUFBcEMsTUFFTztBQUNMLHlCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixDQUFULENBREs7ZUFGUDtBQUtBLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBUEY7QUFRRSxvQkFSRjtBQWZGLGlCQXdCTyxRQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLDJCQUFhLFNBQVMsVUFBVCxDQUFiLEdBQW9DLEVBQXBDLENBRkY7QUFHRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FBVCxDQUhGO0FBSUUsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsT0FBOUIsRUFKRjtBQUtFLG9CQUxGO0FBeEJGO0FBK0JJLG9CQURGO0FBOUJGLFdBWmdCOzs7ZUF4QlA7Z0ZBQ1YiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jZWxscy1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
