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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLWNoZWNrYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFlOztBQUN2Qjs7Ozs7Ozs7O21DQUtLLDRCQUZaLGNBQWMsd0JBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFTQyxpQkFSVyxpQkFRWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBUmpCLG1CQVFpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtBQUcxQixlQUFLLFdBQUwsR0FBbUIsTUFBTSxXQUFOLENBSE87U0FBNUI7O0FBUlcsb0NBa0JYLGlEQUFtQixVQUFVLFVBQVU7O0FBRXJDLGNBQUksUUFBTywyREFBUCxLQUFxQixRQUFyQixFQUErQjtBQUNqQyx1QkFBVyxFQUFYLENBRGlDO1dBQW5DO0FBR0EsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixRQUFyQixDQUxxQzs7QUFRckMsY0FBSSxhQUFhLEVBQWIsRUFBaUI7QUFDbkIsaUJBQUssS0FBTCxHQUFhLENBQWIsQ0FEbUI7QUFFbkIsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsR0FBN0IsQ0FGbUI7QUFHbkIsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBdkIsQ0FIbUI7V0FBckI7QUFLQSxlQUFLLE1BQUwsQ0FBWSxxQkFBWixDQUFrQyxFQUFDLFNBQVMsRUFBVCxFQUFuQyxFQWJxQzs7O0FBbEI1QixvQ0F1Q1gscUJBQUssUUFBUTtBQUNYLGVBQUssTUFBTCxHQUFjLE1BQWQsQ0FEVzs7O0FBdkNGLG9DQStDWCwrQkFBVzs7O0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmLENBRFM7O0FBSVQsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLE9BQUwsQ0FBekIsQ0FKUzs7QUFPVCxjQUFJLFlBQVksU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVosQ0FQSztBQVFULGVBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFSUzs7QUFXVCxlQUFLLFFBQUwsQ0FBYyxTQUFkLEVBWFM7O0FBZVQsZUFBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWYsQ0FmUztBQWdCVCxvQkFBVSxXQUFWLENBQXNCLEtBQUssT0FBTCxDQUF0QixDQWhCUzs7QUFtQlQsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBdEIsRUFBcUMsS0FBSyxNQUFMLENBQVksU0FBWixFQUEvRCxFQW5CUztBQW9CVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLEtBQUssV0FBTCxHQUFtQixLQUFLLFdBQUwsR0FBbUIsRUFBdEMsQ0FwQlo7O0FBdUJULGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsVUFBcEIsQ0F2QlM7QUF3QlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQXhCUztBQXlCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCLENBekJTO0FBMEJULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0ExQlM7QUEyQlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixHQUE4QixTQUE5QixDQTNCUztBQTRCVCxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUFyQixDQUEzQixDQTVCUzs7QUE4QlQsY0FBSSxRQUFRLEtBQUssV0FBTCxHQUFtQixLQUFLLFdBQUwsR0FBbUIsRUFBdEMsQ0E5Qkg7QUErQlQsa0JBQVEsS0FBUjtBQUNFLGlCQUFLLFFBQVEsTUFBUjtBQUNILG1CQUFLLEtBQUwsR0FBYSxDQUFiLENBREY7QUFFRSxtQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixDQUE3QixDQUZGO0FBR0UsbUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsSUFBdkIsQ0FIRjtBQUlFLG9CQUpGO0FBREYsaUJBTU8sU0FBUyxPQUFUO0FBQ0gsbUJBQUssS0FBTCxHQUFhLENBQWIsQ0FERjtBQUVFLG1CQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLENBQTdCLENBRkY7QUFHRSxvQkFIRjtBQU5GO0FBV0ksbUJBQUssS0FBTCxHQUFhLENBQWIsQ0FERjtBQUVFLG1CQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLEdBQTdCLENBRkY7QUFWRixXQS9CUzs7QUErQ1QsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixZQUFLO0FBQzFCLGdCQUFJLE1BQUssT0FBTCxDQUFhLE9BQWIsRUFBc0I7QUFDeEIsa0JBQUksTUFBSyxLQUFMLEtBQWUsQ0FBZixFQUFrQjtBQUNwQixzQkFBSyxLQUFMLEdBQWEsQ0FBYixDQURvQjtBQUVwQixzQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixHQUE3QixDQUZvQjtBQUdwQixzQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUF2QixDQUhvQjtBQUlwQixzQkFBSyxXQUFMLEdBQW1CLEVBQW5CLENBSm9CO2VBQXRCLE1BS087QUFDTCxzQkFBSyxLQUFMLEdBQWEsQ0FBYixDQURLO0FBRUwsc0JBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsQ0FBN0IsQ0FGSztBQUdMLHNCQUFLLFdBQUwsR0FBbUIsTUFBbkIsQ0FISztlQUxQO2FBREYsTUFXTztBQUNMLG9CQUFLLEtBQUwsR0FBYSxDQUFiLENBREs7QUFFTCxvQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixDQUE3QixDQUZLO0FBR0wsb0JBQUssV0FBTCxHQUFtQixPQUFuQixDQUhLO2FBWFA7V0FEcUIsQ0EvQ2Q7OztBQS9DQSxvQ0F3SFgsNkJBQVMsU0FBUzs7QUFFaEIsY0FBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLElBQUQsRUFBUztBQUN0QixvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLElBQXRCLEVBRHNCO1dBQVQsQ0FGQzs7QUFNaEIsY0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDL0Isb0JBQVEsS0FBUixDQUFjLEdBQWQsSUFBcUIsS0FBckIsQ0FEK0I7V0FBZixDQU5GOztBQVdoQixrQkFBUSxLQUFLLElBQUw7QUFDTixpQkFBSyxXQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixDQUFULENBRkY7QUFHRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FBVCxDQUhGO0FBSUUsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBaEMsT0FBOUIsRUFKRjtBQUtFLG9CQUxGO0FBREYsaUJBT08sY0FBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBREY7QUFFRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQXJCLENBQVQsQ0FGRjtBQUdFLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQWhDLE9BQTlCLEVBSEY7QUFJRSxvQkFKRjtBQVBGO0FBYUksb0JBREY7QUFaRixXQVhnQjs7O2VBeEhQO2dGQUNWOzs7c0ZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jZWxscy1maWx0ZXItY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
