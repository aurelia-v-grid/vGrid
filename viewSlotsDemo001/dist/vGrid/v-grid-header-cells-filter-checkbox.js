'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, VGrid, _typeof, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridHeaderFilter;

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
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('VGridHeaderFilter', VGridHeaderFilter = (_dec = customElement('v-grid-filter-checkbox'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridHeaderFilter(element, vGrid) {
          _classCallCheck(this, VGridHeaderFilter);

          _initDefineProp(this, 'type', _descriptor, this);

          _initDefineProp(this, 'filterValue', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridConfig = vGrid.vGridConfig;
        }

        VGridHeaderFilter.prototype.filterValueChanged = function filterValueChanged(newValue, oldValue) {

          if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === "object") {
            newValue = "";
          }
          this.content.value = newValue;

          if (newValue === "") {
            this.state = 0;
            this.content.style.opacity = 0.3;
            this.content.checked = false;
          }
          this.parent.onChangeEventOnFilter({ keyKode: 13 });
        };

        VGridHeaderFilter.prototype.bind = function bind(parent) {
          this.parent = parent;
        };

        VGridHeaderFilter.prototype.attached = function attached() {
          var _this = this;

          this.content = this.element.children[0];

          this.element.removeChild(this.content);

          var container = document.createElement("div");
          this.element.appendChild(container);

          this.setStyle(container);

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

          var value = this.filterValue ? this.filterValue : "";
          switch (value) {
            case true || "true":
              this.state = 2;
              this.content.style.opacity = 1;
              this.content.checked = true;
              break;
            case false || "false":
              this.state = 3;
              this.content.style.opacity = 1;
              break;
            default:
              this.state = 0;
              this.content.style.opacity = 0.3;
          }

          this.content.onclick = function () {
            if (_this.content.checked) {
              if (_this.state === 3) {
                _this.state = 0;
                _this.content.style.opacity = 0.3;
                _this.content.checked = false;
                _this.filterValue = "";
              } else {
                _this.state = 2;
                _this.content.style.opacity = 1;
                _this.filterValue = "true";
              }
            } else {
              _this.state = 3;
              _this.content.style.opacity = 1;
              _this.filterValue = "false";
            }
          };
        };

        VGridHeaderFilter.prototype.setStyle = function setStyle(element) {

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLWNoZWNrYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsYyxxQkFBQSxROztBQUd2QixXLFVBQUEsSzs7Ozs7Ozs7O21DQUtLLGlCLFdBRlosY0FBYyx3QkFBZCxDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFTQyxtQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQUE7O0FBQUE7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxXQUFMLEdBQW1CLE1BQU0sV0FBekI7QUFDRDs7b0NBTUQsa0IsK0JBQW1CLFEsRUFBVSxRLEVBQVU7O0FBRXJDLGNBQUksUUFBTyxRQUFQLHlDQUFPLFFBQVAsT0FBcUIsUUFBekIsRUFBbUM7QUFDakMsdUJBQVcsRUFBWDtBQUNEO0FBQ0QsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixRQUFyQjs7QUFHQSxjQUFJLGFBQWEsRUFBakIsRUFBcUI7QUFDbkIsaUJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixHQUE3QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCO0FBQ0Q7QUFDRCxlQUFLLE1BQUwsQ0FBWSxxQkFBWixDQUFrQyxFQUFDLFNBQVMsRUFBVixFQUFsQztBQUVELFM7O29DQU1ELEksaUJBQUssTSxFQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNELFM7O29DQU1ELFEsdUJBQVc7QUFBQTs7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWY7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O0FBQy9CLG9CQUFRLEtBQVIsQ0FBYyxHQUFkLElBQXFCLEtBQXJCO0FBQ0QsV0FGRDs7QUFLQSxrQkFBUSxLQUFLLElBQWI7QUFDRSxpQkFBSyxXQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQTlCO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQTlCO0FBQ0EsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQTlCO0FBQ0EsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBOUQ7QUFDQTtBQUNGLGlCQUFLLGNBQUw7QUFDRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBOUI7QUFDQSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQTlCO0FBQ0EsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBOUQ7QUFDQTtBQUNGO0FBQ0U7QUFiSjtBQWdCRCxTOzs7Z0ZBbEpBLFE7OztzRkFDQSxRIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
