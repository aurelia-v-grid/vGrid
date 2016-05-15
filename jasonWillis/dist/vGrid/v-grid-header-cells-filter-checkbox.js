'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
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
          this.content.onchange({ keyKode: 13 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLWNoZWNrYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFlOztBQUN2Qjs7Ozs7Ozs7O21DQUtLLDRCQUZaLGNBQWMsd0JBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFTQyxpQkFSVyxpQkFRWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBUmpCLG1CQVFpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLFdBQUwsR0FBbUIsTUFBTSxXQUFOLENBSE87U0FBNUI7O0FBUlcsb0NBa0JYLGlEQUFtQixVQUFVLFVBQVU7O0FBRXJDLGNBQUksUUFBTywyREFBUCxLQUFxQixRQUFyQixFQUErQjtBQUNqQyx1QkFBVyxFQUFYLENBRGlDO1dBQW5DO0FBR0EsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixRQUFyQixDQUxxQzs7QUFRckMsY0FBSSxhQUFhLEVBQWIsRUFBaUI7QUFDbkIsaUJBQUssS0FBTCxHQUFhLENBQWIsQ0FEbUI7QUFFbkIsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsR0FBN0IsQ0FGbUI7QUFHbkIsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBdkIsQ0FIbUI7V0FBckI7QUFLQSxlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEVBQUMsU0FBUyxFQUFULEVBQXZCLEVBYnFDOzs7QUFsQjVCLG9DQXVDWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUF2Q0Ysb0NBK0NYLCtCQUFXOzs7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENB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
