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

          if (this.vGridConfig.colTypeArray[this.parent.columnNo] === "checkbox") {
            if (newValue === "") {
              this.state = 0;
              this.content.style.opacity = 0.3;
              this.content.checked = false;
            }
          }
        };

        VGridHeaderFilter.prototype.bind = function bind(parent) {
          this.parent = parent;
        };

        VGridHeaderFilter.prototype.attached = function attached() {
          var _this = this;

          this.content = this.element.children[0];
          this.setStyle(this.content);
          this.content.onkeyup = this.parent.onKeyUpEventOnFilter.bind(this.parent);
          this.content.onchange = this.parent.onChangeEventOnFilter.bind(this.parent);
          this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
          this.content.value = this.filterValue ? this.filterValue : "";

          if (this.vGridConfig.colTypeArray[this.parent.columnNo] === "checkbox") {
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
            this.content.classList.add(this.vGridConfig.css.filterHandle);

            var value = this.filterValue ? this.filterValue : "";
            switch (value) {
              case true || "true":
                this.state = 2;
                this.content.style.opacity = "1 !important";
                this.content.checked = true;
                break;
              case false || "false":
                this.state = 3;
                this.content.style.opacity = "1 !important";
                break;
              default:
                this.state = 0;
                this.content.style.opacity = "0.3 !important";
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
          }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7QUFBUTtBQUFlOztBQUN2Qjs7O21DQUtLLDRCQUZaLGNBQWMsZUFBZCxXQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQjtBQU1DLGlCQUxXLGlCQUtYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtnQ0FMakIsbUJBS2lCOzs7Ozs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO0FBRzFCLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQU4sQ0FITztTQUE1Qjs7QUFMVyxvQ0FXWCxpREFBbUIsVUFBVSxVQUFVO0FBQ3JDLGVBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsUUFBckIsQ0FEcUM7QUFFckMsZUFBSyxPQUFMLENBQWEsUUFBYixDQUFzQixFQUFDLFNBQVMsRUFBVCxFQUF2QixFQUZxQzs7QUFLckMsY0FBRyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsQ0FBOEIsS0FBSyxNQUFMLENBQVksUUFBWixDQUE5QixLQUF3RCxVQUF4RCxFQUFtRTtBQUNwRSxnQkFBRyxhQUFhLEVBQWIsRUFBZ0I7QUFDakIsbUJBQUssS0FBTCxHQUFhLENBQWIsQ0FEaUI7QUFFakIsbUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsR0FBN0IsQ0FGaUI7QUFHakIsbUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBdkIsQ0FIaUI7YUFBbkI7V0FERjs7O0FBaEJTLG9DQTJCWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUEzQkYsb0NBZ0NYLCtCQUFXOzs7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNC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QUMvQixvQkFBUSxLQUFSLENBQWMsR0FBZCxJQUFxQixLQUFyQixDQUQrQjtXQUFmLENBTkY7O0FBV2hCLGtCQUFRLEtBQUssSUFBTDtBQUNOLGlCQUFLLFdBQUw7QUFDRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FBVCxDQURGO0FBRUUsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQXJCLENBQVQsQ0FGRjtBQUdFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUFyQixDQUFULENBSEY7QUFJRSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUFoQyxPQUE5QixFQUpGO0FBS0Usb0JBTEY7QUFERixpQkFPTyxjQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixpQkFBckIsQ0FBVCxDQUZGO0FBR0UsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBaEMsT0FBOUIsRUFIRjtBQUlFLG9CQUpGO0FBUEY7QUFhSSxvQkFERjtBQVpGLFdBWGdCOzs7ZUFoSFA7Z0ZBQ1Y7OztzRkFDQSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtaGVhZGVyLWNlbGxzLWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
