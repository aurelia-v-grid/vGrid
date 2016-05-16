'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellSelection;

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
      _export('VGridRowCellSelection', VGridRowCellSelection = (_dec = customElement('v-grid-selection'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridRowCellSelection(element, vGrid) {
          _classCallCheck(this, VGridRowCellSelection);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'customStyle', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
        }

        VGridRowCellSelection.prototype.valueChanged = function valueChanged(value, old) {
          if (value === undefined || value === null || value === "") {
            this.content.style.display = "none";
            this.content.checked = false;
          } else {
            this.content.style.display = "block";
            this.content.checked = this.vGrid.vGridSelection.isSelected(this.parent.getRow());
          }
          if (this.parent.getRow() > this.vGrid.vGridCollectionFiltered.length - 1) {
            this.content.style.display = "none";
            this.content.checked = false;
          }
        };

        VGridRowCellSelection.prototype.customStyleChanged = function customStyleChanged(value, old) {};

        VGridRowCellSelection.prototype.bind = function bind(parent) {
          this.parent = parent;
        };

        VGridRowCellSelection.prototype.attached = function attached() {
          this.content = this.element.children[0];
          this.content.type = "checkbox";
          this.content.onclick = function (e) {
            if (this.content.checked) {
              this.vGrid.vGridSelection.select(this.parent.getRow(), true);
            } else {
              this.vGrid.vGridSelection.deSelect(this.parent.getRow());
            }
            this.vGrid.vGridGenerator.fillDataInRows();
          }.bind(this);
          this.content.checked = this.vGrid.vGridSelection.isSelected(this.parent.getRow());
          this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
          this.content.style.height = "100%";
          this.content.style.margin = "auto";
          this.content.style.position = "initial";
          this.content.style.display = "block";
          this.content.style.opacity = "initial";
          this.element.appendChild(this.content);
          this.valueChanged(false);

          this.content.onchange = function () {};

          this.content.columnNo = parseInt(this.parent.columnNo);

          this.content.addEventListener("cellFocus", function (e) {
            this.content.focus();
          }.bind(this));
        };

        return VGridRowCellSelection;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'customStyle', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridRowCellSelection', VGridRowCellSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVE7QUFBUTtBQUFlOztBQUN2Qjs7O3VDQUtLLGdDQUZaLGNBQWMsa0JBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFNQyxpQkFMVyxxQkFLWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBTGpCLHVCQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtTQUE1Qjs7QUFMVyx3Q0FXWCxxQ0FBYSxPQUFPLEtBQUs7QUFDdkIsY0FBSSxVQUFVLFNBQVYsSUFBdUIsVUFBVSxJQUFWLElBQWtCLFVBQVUsRUFBVixFQUFjO0FBQ3pELGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCLENBRHlEO0FBRXpELGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCLENBRnlEO1dBQTNELE1BR087QUFDTCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQURLO0FBRUwsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixVQUExQixDQUFxQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQXJDLENBQXZCLENBRks7V0FIUDtBQU9BLGNBQUksS0FBSyxNQUFMLENBQVksTUFBWixLQUF1QixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxNQUFuQyxHQUE0QyxDQUE1QyxFQUErQztBQUN4RSxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QixDQUR3RTtBQUV4RSxpQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUF2QixDQUZ3RTtXQUExRTs7O0FBbkJTLHdDQTBCWCxpREFBbUIsT0FBTyxLQUFLOztBQTFCcEIsd0NBK0JYLHFCQUFLLFFBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkLENBRFc7OztBQS9CRix3Q0FxQ1gsK0JBQVc7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWYsQ0FEUztBQUVULGVBQUssT0FBTCxDQUFhLElBQWIsR0FBb0IsVUFBcEIsQ0FGUztBQUdULGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBVSxDQUFWLEVBQWE7QUFDbEMsZ0JBQUksS0FBSyxPQUFMLENBQWEsT0FBYixFQUFzQjtBQUN4QixtQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixNQUExQixDQUFpQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQWpDLEVBQXVELElBQXZELEVBRHdCO2FBQTFCLE1BRU87QUFDTCxtQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixRQUExQixDQUFtQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQW5DLEVBREs7YUFGUDtBQUtBLGlCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGNBQTFCLEdBTmtDO1dBQWIsQ0FPckIsSUFQcUIsQ0FPaEIsSUFQZ0IsQ0FBdkIsQ0FIUztBQVdULGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixVQUExQixDQUFxQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQXJDLENBQXZCLENBWFM7QUFZVCxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsV0FBbEIsQ0FBOEIsR0FBOUIsQ0FBa0MsV0FBbEMsQ0FBM0IsQ0FaUztBQWFULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0FiUztBQWNULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0FkUztBQWVULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsUUFBbkIsR0FBOEIsU0FBOUIsQ0FmUztBQWdCVCxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCLENBaEJTO0FBaUJULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsU0FBN0IsQ0FqQlM7QUFrQlQsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLE9BQUwsQ0FBekIsQ0FsQlM7QUFtQlQsZUFBSyxZQUFMLENBQWtCLEtBQWxCLEVBbkJTOztBQXFCVCxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFlBQUssRUFBTCxDQXJCZjs7QUEwQlQsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixTQUFTLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBakMsQ0ExQlM7O0FBNkJULGVBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLFdBQTlCLEVBQTJDLFVBQVUsQ0FBVixFQUFhO0FBQ3RELGlCQUFLLE9BQUwsQ0FBYSxLQUFiLEdBRHNEO1dBQWIsQ0FFekMsSUFGeUMsQ0FFcEMsSUFGb0MsQ0FBM0MsRUE3QlM7OztlQXJDQTtpRkFDVjs7O3NGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtc2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
