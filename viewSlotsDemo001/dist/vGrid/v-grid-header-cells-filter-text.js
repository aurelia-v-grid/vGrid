'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _typeof, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridHeaderFilterText;

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

      _export('VGridHeaderFilterText', VGridHeaderFilterText = (_dec = customElement('v-grid-filter-text'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridHeaderFilterText(element, vGrid) {
          _classCallCheck(this, VGridHeaderFilterText);

          _initDefineProp(this, 'type', _descriptor, this);

          _initDefineProp(this, 'filterValue', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
          this.vGridConfig = vGrid.vGridConfig;
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
      })), _class2)) || _class) || _class));

      _export('VGridHeaderFilterText', VGridHeaderFilterText);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUTtBQUFRO0FBQWU7O0FBQ3ZCOzs7Ozs7Ozs7dUNBS0ssZ0NBRlosY0FBYyxvQkFBZCxXQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQjtBQVNDLGlCQVJXLHFCQVFYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtnQ0FSakIsdUJBUWlCOzs7Ozs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO0FBRzFCLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQU4sQ0FITztTQUE1Qjs7QUFSVyx3Q0FrQlgsaURBQW1CLFVBQVUsVUFBVTtBQUNyQyxjQUFJLFFBQU8sMkRBQVAsS0FBcUIsUUFBckIsRUFBK0I7QUFDakMsdUJBQVcsRUFBWCxDQURpQztXQUFuQztBQUdBLGVBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsUUFBckIsQ0FKcUM7QUFLckMsZUFBSyxNQUFMLENBQVkscUJBQVosQ0FBa0MsRUFBQyxTQUFTLEVBQVQsRUFBbkMsRUFMcUM7OztBQWxCNUIsd0NBOEJYLHFCQUFLLFFBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkLENBRFc7OztBQTlCRix3Q0FzQ1gsK0JBQVc7OztBQUNULGVBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsQ0FBdEIsQ0FBZixDQURTO0FBRVQsZUFBSyxRQUFMLENBQWMsS0FBSyxPQUFMLENBQWQsQ0FGUztBQUdULGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsTUFBcEIsQ0FIUzs7QUFNVCxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFVBQUMsQ0FBRCxFQUFNO0FBRTNCLGdCQUFJLE1BQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsTUFBSyxNQUFMLENBQVksUUFBWixDQUFsQyxJQUEyRCxFQUFFLE9BQUYsS0FBYyxFQUFkLEVBQWtCO0FBQy9FLGtCQUFHLE1BQUssV0FBTCxLQUFxQixNQUFLLE9BQUwsQ0FBYSxLQUFiLEVBQW1CO0FBQ3pDLHNCQUFLLFdBQUwsR0FBbUIsTUFBSyxPQUFMLENBQWEsS0FBYixDQURzQjtlQUEzQyxNQUVPO0FBQ0wsb0JBQUcsRUFBRSxPQUFGLEtBQWMsRUFBZCxFQUFpQjtBQUVsQixzQkFBRyxNQUFLLFdBQUwsS0FBcUIsTUFBSyxPQUFMLENBQWEsS0FBYixFQUFtQjtBQUN6QywwQkFBSyxNQUFMLENBQVkscUJBQVosQ0FBa0MsRUFBQyxTQUFTLEVBQVQsRUFBbkMsRUFEeUM7bUJBQTNDO2lCQUZGO2VBSEY7YUFERjtXQUZxQixDQU5kOztBQXlCVCxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFlBQUs7QUFDM0Isa0JBQUssV0FBTCxHQUFtQixNQUFLLE9BQUwsQ0FBYSxLQUFiLENBRFE7V0FBTCxDQXpCZjs7QUE4QlQsZUFBSyxPQUFMLENBQWEsWUFBYixDQUEwQixLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsYUFBdEIsRUFBcUMsS0FBSyxNQUFMLENBQVksU0FBWixFQUEvRCxFQTlCUztBQStCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLEtBQUssV0FBTCxHQUFtQixLQUFLLFdBQUwsR0FBbUIsRUFBdEMsQ0EvQlo7O0FBa0NULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsS0FBNUIsQ0FsQ1M7QUFtQ1QsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixTQUE1QixDQW5DUzs7O0FBdENBLHdDQWlGWCw2QkFBUyxTQUFTOztBQUVoQixjQUFJLFdBQVcsU0FBWCxRQUFXLENBQUMsSUFBRCxFQUFTO0FBQ3RCLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsSUFBdEIsRUFEc0I7V0FBVCxDQUZDOztBQU1oQixjQUFJLGNBQWMsU0FBZCxXQUFjLENBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZTtBQUMvQixvQkFBUSxLQUFSLENBQWMsR0FBZCxJQUFxQixLQUFyQixDQUQrQjtXQUFmLENBTkY7O0FBV2hCLGtCQUFRLEtBQUssSUFBTDtBQUNOLGlCQUFLLFdBQUw7QUFDRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBckIsQ0FBVCxDQURGO0FBRUUsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLGNBQXJCLENBQVQsQ0FGRjtBQUdFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixZQUFyQixDQUFULENBSEY7QUFJRSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUFoQyxPQUE5QixFQUpGO0FBS0Usb0JBTEY7QUFERixpQkFPTyxjQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixpQkFBckIsQ0FBVCxDQUZGO0FBR0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFlBQXJCLENBQVQsQ0FIRjtBQUlFLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQWhDLE9BQTlCLEVBSkY7QUFLRSxvQkFMRjtBQVBGO0FBY0ksb0JBREY7QUFiRixXQVhnQjs7O2VBakZQO2dGQUNWOzs7c0ZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jZWxscy1maWx0ZXItdGV4dC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
