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
          this.content.value = newValue;
          this.content.onchange({ keyKode: 13 });

          if (newValue === "") {
            this.state = 0;
            this.content.style.opacity = 0.3;
            this.content.checked = false;
          }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLWNoZWNrYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFlOztBQUN2Qjs7O21DQUtLLDRCQUZaLGNBQWMsd0JBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFNQyxpQkFMVyxpQkFLWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBTGpCLG1CQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLFdBQUwsR0FBbUIsTUFBTSxXQUFOLENBSE87U0FBNUI7O0FBTFcsb0NBV1gsaURBQW1CLFVBQVUsVUFBVTtBQUNyQyxlQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLFFBQXJCLENBRHFDO0FBRXJDLGVBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsRUFBQyxTQUFTLEVBQVQsRUFBdkIsRUFGcUM7O0FBSXJDLGNBQUksYUFBYSxFQUFiLEVBQWlCO0FBQ25CLGlCQUFLLEtBQUwsR0FBYSxDQUFiLENBRG1CO0FBRW5CLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLEdBQTdCLENBRm1CO0FBR25CLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCLENBSG1CO1dBQXJCOzs7QUFmUyxvQ0F5QlgscUJBQUssUUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEVzs7O0FBekJGLG9DQThCWCwrQkFBVzs7O0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmLENBRFM7O0FBR1QsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLE9BQUwsQ0FBekIsQ0FIUzs7QUFNVCxjQUFJ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
