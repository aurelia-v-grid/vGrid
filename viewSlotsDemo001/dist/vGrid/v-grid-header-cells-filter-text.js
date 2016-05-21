'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1oZWFkZXItY2VsbHMtZmlsdGVyLXRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7O0FBR3ZCLFcsVUFBQSxLOzs7Ozs7Ozs7dUNBS0sscUIsV0FGWixjQUFjLG9CQUFkLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsQztBQVNDLHVDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7QUFBQTs7QUFBQTs7QUFBQTs7QUFDMUIsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsTUFBTSxXQUF6QjtBQUNEOzt3Q0FNRCxrQiwrQkFBbUIsUSxFQUFVLFEsRUFBVTtBQUNyQyxjQUFJLFFBQU8sUUFBUCx5Q0FBTyxRQUFQLE9BQXFCLFFBQXpCLEVBQW1DO0FBQ2pDLHVCQUFXLEVBQVg7QUFDRDtBQUNELGVBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsUUFBckI7QUFDQSxlQUFLLE1BQUwsQ0FBWSxxQkFBWixDQUFrQyxFQUFDLFNBQVMsRUFBVixFQUFsQztBQUNELFM7O3dDQU1ELEksaUJBQUssTSxFQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNELFM7O3dDQU1ELFEsdUJBQVc7QUFBQTs7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWY7QUFDQSxlQUFLLFFBQUwsQ0FBYyxLQUFLLE9BQW5CO0FBQ0EsZUFBSyxPQUFMLENBQWEsSUFBYixHQUFvQixNQUFwQjs7QUFHQSxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFVBQUMsQ0FBRCxFQUFNO0FBRTNCLGdCQUFJLE1BQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsTUFBSyxNQUFMLENBQVksUUFBOUMsS0FBMkQsRUFBRSxPQUFGLEtBQWMsRUFBN0UsRUFBaUY7QUFDL0Usa0JBQUcsTUFBSyxXQUFMLEtBQXFCLE1BQUssT0FBTCxDQUFhLEtBQXJDLEVBQTJDO0FBQ3pDLHNCQUFLLFdBQUwsR0FBbUIsTUFBSyxPQUFMLENBQWEsS0FBaEM7QUFDRCxlQUZELE1BRU87QUFDTCxvQkFBRyxFQUFFLE9BQUYsS0FBYyxFQUFqQixFQUFvQjtBQUVsQixzQkFBRyxNQUFLLFdBQUwsS0FBcUIsTUFBSyxPQUFMLENBQWEsS0FBckMsRUFBMkM7QUFDekMsMEJBQUssTUFBTCxDQUFZLHFCQUFaLENBQWtDLEVBQUMsU0FBUyxFQUFWLEVBQWxDO0FBQ0Q7QUFDRjtBQUNGO0FBRUY7QUFFRixXQWhCRDs7QUFtQkEsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixZQUFLO0FBQzNCLGtCQUFLLFdBQUwsR0FBbUIsTUFBSyxPQUFMLENBQWEsS0FBaEM7QUFDRCxXQUZEOztBQUtBLGVBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLGFBQWhELEVBQStELEtBQUssTUFBTCxDQUFZLFNBQVosRUFBL0Q7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLEtBQUssV0FBTCxHQUFtQixLQUFLLFdBQXhCLEdBQXNDLEVBQTNEOztBQUdBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsS0FBNUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEdBQTRCLFNBQTVCO0FBRUQsUzs7d0NBTUQsUSxxQkFBUyxPLEVBQVM7O0FBRWhCLGNBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxJQUFELEVBQVM7QUFDdEIsb0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixJQUF0QjtBQUNELFdBRkQ7O0FBSUEsY0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDL0Isb0JBQVEsS0FBUixDQUFjLEdBQWQsSUFBcUIsS0FBckI7QUFDRCxXQUZEOztBQUtBLGtCQUFRLEtBQUssSUFBYjtBQUNFLGlCQUFLLFdBQUw7QUFDRSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsV0FBOUI7QUFDQSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsY0FBOUI7QUFDQSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBOUI7QUFDQSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUE5RDtBQUNBO0FBQ0YsaUJBQUssY0FBTDtBQUNFLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUE5QjtBQUNBLHVCQUFTLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixpQkFBOUI7QUFDQSx1QkFBUyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUIsWUFBOUI7QUFDQSwwQkFBWSxhQUFaLEVBQThCLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUE5RDtBQUNBO0FBQ0Y7QUFDRTtBQWRKO0FBa0JELFM7OztnRkE3R0EsUTs7O3NGQUNBLFEiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWhlYWRlci1jZWxscy1maWx0ZXItdGV4dC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
