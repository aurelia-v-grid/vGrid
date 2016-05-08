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

        VGridRowCellSelection.prototype.customStyleChanged = function customStyleChanged(value, old) {
          console.log("wow");
        };

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
            this.vGrid.vGridGenerator.updateSelectionOnAllRows();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU1E7QUFBUTtBQUFlOztBQUN2Qjs7O3VDQVVLLGdDQUZaLGNBQWMsa0JBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFNQyxpQkFMVyxxQkFLWCxDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7Z0NBTGpCLHVCQUtpQjs7Ozs7O0FBQzFCLGVBQUssT0FBTCxHQUFlLE9BQWYsQ0FEMEI7QUFFMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUYwQjtTQUE1Qjs7QUFMVyx3Q0FXWCxxQ0FBYSxPQUFPLEtBQUs7QUFDdkIsY0FBSSxVQUFVLFNBQVYsSUFBdUIsVUFBVSxJQUFWLElBQWtCLFVBQVUsRUFBVixFQUFjO0FBQ3pELGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCLENBRHlEO0FBRXpELGlCQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLEtBQXZCLENBRnlEO1dBQTNELE1BR087QUFDTCxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QixDQURLO0FBRUwsaUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixVQUExQixDQUFxQyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQXJDLENBQXZCLENBRks7V0FIUDtBQU9BLGNBQUcsS0FBSyxNQUFMLENBQVksTUFBWixLQUF1QixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxNQUFuQyxHQUEwQyxDQUExQyxFQUE0QztBQUNwRSxpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QixDQURvRTtBQUVwRSxpQkFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUF2QixDQUZvRTtXQUF0RTs7O0FBbkJTLHdDQXlCWCxpREFBbUIsT0FBTyxLQUFLO0FBQzdCLGtCQUFRLEdBQVIsQ0FBWSxLQUFaLEVBRDZCOzs7QUF6QnBCLHdDQThCWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUE5QkYsd0NBb0NYLCtCQUFXO0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmLENBRFM7QUFFVCxlQUFLLE9BQUwsQ0FBYSxJQUFiLEdBQW9CLFVBQXBCLENBRlM7QUFHVCxlQUFLLE9BQUwsQ0FBYSxPQUFiLEdBQXVCLFVBQVUsQ0FBVixFQUFhO0FBQ2xDLGdCQUFHLEtBQUssT0FBTCxDQUFhLE9BQWIsRUFBcUI7QUFDdEIsbUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsTUFBMUIsQ0FBaUMsS0FBSyxNQUFMLENBQVksTUFBWixFQUFqQyxFQUF1RCxJQUF2RCxFQURzQjthQUF4QixNQUVPO0FBQ0wsbUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsUUFBMUIsQ0FBbUMsS0FBSyxNQUFMLENBQVksTUFBWixFQUFuQyxFQURLO2FBRlA7QUFLQSxpQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQix3QkFBMUIsR0FOa0M7V0FBYixDQU9yQixJQVBxQixDQU9oQixJQVBnQixDQUF2QixDQUhTO0FBV1QsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFVBQTFCLENBQXFDLEtBQUssTUFBTCxDQUFZLE1BQVosRUFBckMsQ0FBdkIsQ0FYUztBQVlULGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsS0FBSyxNQUFMLENBQVksS0FBWixDQUFrQixXQUFsQixDQUE4QixHQUE5QixDQUFrQyxXQUFsQyxDQUEzQixDQVpTO0FBYVQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQWJTO0FBY1QsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QixDQWRTO0FBZVQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixRQUFuQixHQUE4QixTQUE5QixDQWZTO0FBZ0JULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0IsQ0FoQlM7QUFpQlQsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixTQUE3QixDQWpCUztBQWtCVCxlQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLEtBQUssT0FBTCxDQUF6QixDQWxCUztBQW1CVCxlQUFLLFlBQUwsQ0FBa0IsS0FBbEIsRUFuQlM7O0FBcUJULGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsWUFBSyxFQUFMLENBckJmOztBQTBCVCxlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLFNBQVMsS0FBSyxNQUFMLENBQVksUUFBWixDQUFqQyxDQTFCUzs7QUE2QlQsZUFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkMsVUFBVSxDQUFWLEVBQWE7QUFDdEQsaUJBQUssT0FBTCxDQUFhLEtBQWIsR0FEc0Q7V0FBYixDQUV6QyxJQUZ5QyxDQUVwQyxJQUZvQyxDQUEzQyxFQTdCUzs7O2VBcENBO2lGQUNWOzs7c0ZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLXJvdy1jZWxscy1zZWxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
