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
            if (_this.vGridConfig.filterOnKeyArray[_this.parent.columnNo]) {
              _this.filterValue = _this.content.value;
            } else {
              if (e.keyCode === 13) {
                _this.filterValue = _this.content.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNUTtBQUFRO0FBQWU7O0FBQ3ZCOzs7Ozs7Ozs7dUNBS0ssZ0NBRlosY0FBYyxvQkFBZCxXQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQjtBQU1DLGlCQUxXLHFCQUtYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtnQ0FMakIsdUJBS2lCOzs7Ozs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZixDQUQwQjtBQUUxQixlQUFLLEtBQUwsR0FBYSxLQUFiLENBRjBCO0FBRzFCLGVBQUssV0FBTCxHQUFtQixNQUFNLFdBQU4sQ0FITztTQUE1Qjs7QUFMVyx3Q0FXWCxpREFBbUIsVUFBVSxVQUFVO0FBQ3JDLGNBQUksUUFBTywyREFBUCxLQUFxQixRQUFyQixFQUErQjtBQUNqQyx1QkFBVyxFQUFYLENBRGlDO1dBQW5DO0FBR0EsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixRQUFyQixDQUpxQztBQUtyQyxlQUFLLE1BQUwsQ0FBWSxxQkFBWixDQUFrQyxFQUFDLFNBQVMsRUFBVCxFQUFuQyxFQUxxQzs7O0FBWDVCLHdDQW9CWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUFwQkYsd0NBeUJYLCtCQUFXOzs7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWYsQ0FEUztBQUVULGVBQUssUUFBTCxDQUFjLEtBQUssT0FBTCxDQUFkLENBRlM7QUFHVCxlQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLE1BQXBCLENBSFM7QUFJVCxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFVBQUMsQ0FBRCxFQUFNO0FBQzNCLGdCQUFJLE1BQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsTUFBSyxNQUFMLENBQVksUUFBWixDQUF0QyxFQUE2RDtBQUMzRCxvQkFBSyxXQUFMLEdBQW1CLE1BQUssT0FBTCxDQUFhLEtBQWIsQ0FEd0M7YUFBN0QsTUFFTztBQUNMLGtCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWQsRUFBa0I7QUFDcEIsc0JBQUssV0FBTCxHQUFtQixNQUFLLE9BQUwsQ0FBYSxLQUFiLENBREM7ZUFBdEI7YUFIRjtXQURxQixDQUpkOztBQWVULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsWUFBSztBQUMzQixrQkFBSyxXQUFMLEdBQW1CLE1BQUssT0FBTCxDQUFhLEtBQWIsQ0FEUTtXQUFMLENBZmY7O0FBbUJULGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLGFBQXRCLEVBQXFDLEtBQUssTUFBTCxDQUFZLFNBQVosRUFBL0QsRUFuQlM7QUFvQlQsZUFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFLLFdBQUwsR0FBbUIsS0FBSyxXQUFMLEdBQW1CLEVBQXRDLENBcEJaOztBQXNCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLEtBQTVCLENBdEJTO0FBdUJULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsU0FBNUIsQ0F2QlM7OztBQXpCQSx3Q0FxRFgsNkJBQVMsU0FBUzs7QUFFaEIsY0FBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLElBQUQsRUFBUztBQUN0QixvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLElBQXRCLEVBRHNCO1dBQVQsQ0FGQzs7QUFNaEIsY0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDL0Isb0JBQVEsS0FBUixDQUFjLEdBQWQsSUFBcUIsS0FBckIsQ0FEK0I7V0FBZixDQU5GOztBQVdoQixrQkFBUSxLQUFLLElBQUw7QUFDTixpQkFBSyxXQUFMO0FBQ0UsdUJBQVMsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFdBQXJCLENBQVQsQ0FERjtBQUVFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixjQUFyQixDQUFULENBRkY7QUFHRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBckIsQ0FBVCxDQUhGO0FBSUUsMEJBQVksYUFBWixFQUE4QixLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsQ0FBaEMsT0FBOUIsRUFKRjtBQUtFLG9CQUxGO0FBREYsaUJBT08sY0FBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixDQUFULENBREY7QUFFRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsaUJBQXJCLENBQVQsQ0FGRjtBQUdFLDBCQUFZLGFBQVosRUFBOEIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQWhDLE9BQTlCLEVBSEY7QUFJRSxvQkFKRjtBQVBGO0FBYUksb0JBREY7QUFaRixXQVhnQjs7O2VBckRQO2dGQUNWOzs7c0ZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jZWxscy1maWx0ZXItdGV4dC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
