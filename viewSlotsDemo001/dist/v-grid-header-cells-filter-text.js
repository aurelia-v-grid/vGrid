'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, noView, _typeof, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridHeaderFilterText;

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
      noView = _aureliaFramework.noView;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('VGridHeaderFilterText', VGridHeaderFilterText = (_dec = noView(), _dec2 = customElement('v-grid-filter-customx'), _dec3 = inject(Element), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
        function VGridHeaderFilterText(element) {
          _classCallCheck(this, VGridHeaderFilterText);

          _initDefineProp(this, 'type', _descriptor, this);

          _initDefineProp(this, 'filterValue', _descriptor2, this);

          this.element = element;
        }

        VGridHeaderFilterText.prototype.filterValueChanged = function filterValueChanged(newValue, oldValue) {
          if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === "object") {
            newValue = "";
          }
          this.content.value = newValue;
          this.parent.onChangeEventOnFilter({ keyKode: 13 });
        };

        VGridHeaderFilterText.prototype.bind = function bind(parent) {
          this.parent = parent;
          this.vGrid = parent.vGrid;
          this.vGridConfig = parent.vGrid.vGridConfig;
        };

        VGridHeaderFilterText.prototype.attached = function attached() {
          var _this = this;

          this.content = this.element.children[0];
          this.setStyle(this.content);
          this.content.type = "button";

          this.content.onkeyup = function (e) {
            if (_this.vGridConfig.filterOnKeyArray[_this.parent.columnNo] || e.keyCode === 13) {
              if (_this.filterValue !== _this.content.value) {
                _this.filterValue = _this.content.value;
              } else {
                if (e.keyCode === 13) {
                  if (_this.filterValue !== _this.content.value) {
                    _this.parent.onChangeEventOnFilter({ keyKode: 13 });
                  }
                }
              }
            }
          };

          this.content.onchange = function () {
            _this.filterValue = _this.content.value;
          };

          this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
          this.content.value = this.filterValue ? this.filterValue : "";

          this.content.style.height = "50%";
          this.content.style.margin = "initial";
        };

        VGridHeaderFilterText.prototype.setStyle = function setStyle(element) {

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
              addClass(this.vGridConfig.css.filterHandle);
              setStyleTag("line-height", this.vGridConfig.headerHeight / 2 + 'px');
              break;
            default:
              break;
          }
        };

        return VGridHeaderFilterText;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'filterValue', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class));

      _export('VGridHeaderFilterText', VGridHeaderFilterText);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInYtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7QUFBVSxZLHFCQUFBLE07Ozs7Ozs7Ozt1Q0FTNUIscUIsV0FIWixRLFVBQ0EsY0FBYyx1QkFBZCxDLFVBQ0EsT0FBTyxPQUFQLEM7QUFTQyx1Q0FBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQUE7O0FBQ25CLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDRDs7d0NBTUQsa0IsK0JBQW1CLFEsRUFBVSxRLEVBQVU7QUFDckMsY0FBSSxRQUFPLFFBQVAseUNBQU8sUUFBUCxPQUFxQixRQUF6QixFQUFtQztBQUNqQyx1QkFBVyxFQUFYO0FBQ0Q7QUFDRCxlQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLFFBQXJCO0FBQ0EsZUFBSyxNQUFMLENBQVkscUJBQVosQ0FBa0MsRUFBQyxTQUFTLEVBQVYsRUFBbEM7QUFDRCxTOzt3Q0FNRCxJLGlCQUFLLE0sRUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxlQUFLLEtBQUwsR0FBYSxPQUFPLEtBQXBCO0FBQ0EsZUFBSyxXQUFMLEdBQW1CLE9BQU8sS0FBUCxDQUFhLFdBQWhDO0FBQ0QsUzs7d0NBTUQsUSx1QkFBVztBQUFBOztBQUNULGVBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsQ0FBdEIsQ0FBZjtBQUNBLGVBQUssUUFBTCxDQUFjLEtBQUssT0FBbkI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLFFBQXBCOztBQUdBLGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBQyxDQUFELEVBQU07QUFFM0IsZ0JBQUksTUFBSyxXQUFMLENBQWlCLGdCQUFqQixDQUFrQyxNQUFLLE1BQUwsQ0FBWSxRQUE5QyxLQUEyRCxFQUFFLE9BQUYsS0FBYyxFQUE3RSxFQUFpRjtBQUMvRSxrQkFBRyxNQUFLLFdBQUwsS0FBcUIsTUFBSyxPQUFMLENBQWEsS0FBckMsRUFBMkM7QUFDekMsc0JBQUssV0FBTCxHQUFtQixNQUFLLE9BQUwsQ0FBYSxLQUFoQztBQUNELGVBRkQsTUFFTztBQUNMLG9CQUFHLEVBQUUsT0FBRixLQUFjLEVBQWpCLEVBQW9CO0FBRWxCLHNCQUFHLE1BQUssV0FBTCxLQUFxQixNQUFLLE9BQUwsQ0FBYSxLQUFyQyxFQUEyQztBQUN6QywwQkFBSyxNQUFMLENBQVkscUJBQVosQ0FBa0MsRUFBQyxTQUFTLEVBQVYsRUFBbEM7QUFDRDtBQUNGO0FBQ0Y7QUFFRjtBQUVGLFdBaEJEOztBQW1CQSxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFlBQUs7QUFDM0Isa0JBQUssV0FBTCxHQUFtQixNQUFLLE9BQUwsQ0FBYSxLQUFoQztBQUNELFdBRkQ7O0FBS0EsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBaEQsRUFBK0QsS0FBSyxNQUFMLENBQVksU0FBWixFQUEvRDtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBSyxXQUFMLEdBQW1CLEtBQUssV0FBeEIsR0FBc0MsRUFBM0Q7O0FBR0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixLQUE1QjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsU0FBNUI7QUFFRCxTOzt3Q0FNRCxRLHFCQUFTLE8sRUFBUzs7QUFFaEIsY0FBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLElBQUQsRUFBUztBQUN0QixvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLElBQXRCO0FBQ0QsV0FGRDs7QUFJQSxjQUFJLGNBQWMsU0FBZCxXQUFjLENBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZTtBQUMvQixvQkFBUSxLQUFSLENBQWMsR0FBZCxJQUFxQixLQUFyQjtBQUNELFdBRkQ7O0FBS0Esa0JBQVEsS0FBSyxJQUFiO0FBQ0UsaUJBQUssV0FBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUE5QjtBQUNBLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUE5QjtBQUNBLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUE5QjtBQUNBLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQTlEO0FBQ0E7QUFDRixpQkFBSyxjQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGlCQUE5QjtBQUNBLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUE5QjtBQUNBLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQTlEO0FBQ0E7QUFDRjtBQUNFO0FBZEo7QUFrQkQsUzs7O2dGQTdHQSxROzs7c0ZBQ0EsUSIsImZpbGUiOiJ2LWdyaWQtaGVhZGVyLWNlbGxzLWZpbHRlci10ZXh0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
