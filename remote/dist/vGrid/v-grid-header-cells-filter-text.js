'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, _typeof, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridHeaderFilterText;

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
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('VGridHeaderFilterText', VGridHeaderFilterText = (_dec = customElement('v-grid-filter-text'), _dec2 = inject(Element), _dec(_class = _dec2(_class = (_class2 = function () {
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
          this.content.type = "text";

          this.content.onkeyup = function (e) {
            if (_this.vGridConfig.filterOnKeyArray[_this.parent.columnNo] || e.keyCode === 13) {
              if (_this.filterValue !== _this.content.value) {
                _this.filterValue = _this.content.value;
              } else {
                if (e.keyCode === 13) {
                  _this.parent.onChangeEventOnFilter({ keyKode: 13 });
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
      })), _class2)) || _class) || _class));

      _export('VGridHeaderFilterText', VGridHeaderFilterText);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7Ozs7Ozs7Ozt1Q0FTbEIscUIsV0FGWixjQUFjLG9CQUFkLEMsVUFDQSxPQUFPLE9BQVAsQztBQVNDLHVDQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFBQTs7QUFDbkIsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOzt3Q0FNRCxrQiwrQkFBbUIsUSxFQUFVLFEsRUFBVTtBQUNyQyxjQUFJLFFBQU8sUUFBUCx5Q0FBTyxRQUFQLE9BQXFCLFFBQXpCLEVBQW1DO0FBQ2pDLHVCQUFXLEVBQVg7QUFDRDtBQUNELGVBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsUUFBckI7QUFDQSxlQUFLLE1BQUwsQ0FBWSxxQkFBWixDQUFrQyxFQUFDLFNBQVMsRUFBVixFQUFsQztBQUNELFM7O3dDQU1ELEksaUJBQUssTSxFQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGVBQUssS0FBTCxHQUFhLE9BQU8sS0FBcEI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsT0FBTyxLQUFQLENBQWEsV0FBaEM7QUFDRCxTOzt3Q0FNRCxRLHVCQUFXO0FBQUE7O0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmO0FBQ0EsZUFBSyxRQUFMLENBQWMsS0FBSyxPQUFuQjtBQUNBLGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsTUFBcEI7O0FBR0EsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixVQUFDLENBQUQsRUFBTTtBQUUzQixnQkFBSSxNQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLE1BQUssTUFBTCxDQUFZLFFBQTlDLEtBQTJELEVBQUUsT0FBRixLQUFjLEVBQTdFLEVBQWlGO0FBQy9FLGtCQUFHLE1BQUssV0FBTCxLQUFxQixNQUFLLE9BQUwsQ0FBYSxLQUFyQyxFQUEyQztBQUN6QyxzQkFBSyxXQUFMLEdBQW1CLE1BQUssT0FBTCxDQUFhLEtBQWhDO0FBQ0QsZUFGRCxNQUVPO0FBQ0wsb0JBQUcsRUFBRSxPQUFGLEtBQWMsRUFBakIsRUFBb0I7QUFHaEIsd0JBQUssTUFBTCxDQUFZLHFCQUFaLENBQWtDLEVBQUMsU0FBUyxFQUFWLEVBQWxDO0FBRUg7QUFDRjtBQUVGO0FBRUYsV0FoQkQ7O0FBbUJBLGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsWUFBSztBQUMzQixrQkFBSyxXQUFMLEdBQW1CLE1BQUssT0FBTCxDQUFhLEtBQWhDO0FBQ0QsV0FGRDs7QUFLQSxlQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixhQUFoRCxFQUErRCxLQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQS9EO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFLLFdBQUwsR0FBbUIsS0FBSyxXQUF4QixHQUFzQyxFQUEzRDs7QUFHQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLEtBQTVCO0FBQ0EsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixTQUE1QjtBQUVELFM7O3dDQU1ELFEscUJBQVMsTyxFQUFTOztBQUVoQixjQUFJLFdBQVcsU0FBWCxRQUFXLENBQUMsSUFBRCxFQUFTO0FBQ3RCLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsSUFBdEI7QUFDRCxXQUZEOztBQUlBLGNBQUksY0FBYyxTQUFkLFdBQWMsQ0FBQyxHQUFELEVBQU0sS0FBTixFQUFlO0FBQy9CLG9CQUFRLEtBQVIsQ0FBYyxHQUFkLElBQXFCLEtBQXJCO0FBQ0QsV0FGRDs7QUFLQSxrQkFBUSxLQUFLLElBQWI7QUFDRSxpQkFBSyxXQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQTlCO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQTlCO0FBQ0EsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBOUQ7QUFDQTtBQUNGLGlCQUFLLGNBQUw7QUFDRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBOUI7QUFDQSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQTlCO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQTlCO0FBQ0EsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBOUQ7QUFDQTtBQUNGO0FBQ0U7QUFkSjtBQWtCRCxTOzs7Z0ZBN0dBLFE7OztzRkFDQSxRIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXRleHQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
