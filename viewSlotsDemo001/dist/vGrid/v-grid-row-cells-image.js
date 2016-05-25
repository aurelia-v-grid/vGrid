'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellImage;

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
    }],
    execute: function () {
      _export('VGridRowCellImage', VGridRowCellImage = (_dec = customElement('v-grid-image'), _dec2 = inject(Element), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridRowCellImage(element, vGrid) {
          _classCallCheck(this, VGridRowCellImage);

          _initDefineProp(this, 'value', _descriptor, this);

          _initDefineProp(this, 'customStyle', _descriptor2, this);

          this.element = element;
          this.vGrid = vGrid;
        }

        VGridRowCellImage.prototype.valueChanged = function valueChanged(value, old) {
          if (value === undefined) {
            this.content.style.display = "none";
            this.content.src = "";
          } else {
            this.content.style.display = "block";
            this.content.src = "";
            this.content.src = value;
          }
        };

        VGridRowCellImage.prototype.customStyleChanged = function customStyleChanged(value, old) {};

        VGridRowCellImage.prototype.bind = function bind(parent) {
          this.parent = parent;
          this.vGrid = parent.vGrid;
        };

        VGridRowCellImage.prototype.attached = function attached() {
          this.content = this.element.children[0];
          this.content.classList.add(this.parent.vGrid.vGridConfig.css.cellContent);
          this.valueChanged(this.value);
          this.content.style.margin = "auto";
          this.content.style.display = "none";
          this.element.appendChild(this.content);

          this.content.columnNo = parseInt(this.parent.columnNo);

          this.content.addEventListener("cellFocus", function (e) {
            this.content.focus();
          }.bind(this));
        };

        return VGridRowCellImage;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'customStyle', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridRowCellImage', VGridRowCellImage);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW1hZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1RLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7OzttQ0FhbEIsaUIsV0FGWixjQUFjLGNBQWQsQyxVQUNBLE9BQU8sT0FBUCxDO0FBU0MsbUNBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtBQUFBOztBQUFBOztBQUFBOztBQUMxQixlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNEOztvQ0FNRCxZLHlCQUFhLEssRUFBTyxHLEVBQUs7QUFDdkIsY0FBSSxVQUFVLFNBQWQsRUFBeUI7QUFDdkIsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsTUFBN0I7QUFDQSxpQkFBSyxPQUFMLENBQWEsR0FBYixHQUFtQixFQUFuQjtBQUNELFdBSEQsTUFHTztBQUNMLGlCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLEdBQWIsR0FBbUIsRUFBbkI7QUFDQSxpQkFBSyxPQUFMLENBQWEsR0FBYixHQUFtQixLQUFuQjtBQUNEO0FBQ0YsUzs7b0NBTUQsa0IsK0JBQW1CLEssRUFBTyxHLEVBQUssQ0FFOUIsQzs7b0NBTUQsSSxpQkFBSyxNLEVBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsZUFBSyxLQUFMLEdBQWEsT0FBTyxLQUFwQjtBQUNELFM7O29DQU1ELFEsdUJBQVc7QUFDVCxlQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLENBQXRCLENBQWY7QUFDQSxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsV0FBbEIsQ0FBOEIsR0FBOUIsQ0FBa0MsV0FBN0Q7QUFDQSxlQUFLLFlBQUwsQ0FBa0IsS0FBSyxLQUF2QjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0EsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLE9BQTlCOztBQUdBLGVBQUssT0FBTCxDQUFhLFFBQWIsR0FBd0IsU0FBUyxLQUFLLE1BQUwsQ0FBWSxRQUFyQixDQUF4Qjs7QUFHQSxlQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixXQUE5QixFQUEyQyxVQUFVLENBQVYsRUFBYTtBQUN0RCxpQkFBSyxPQUFMLENBQWEsS0FBYjtBQUNELFdBRjBDLENBRXpDLElBRnlDLENBRXBDLElBRm9DLENBQTNDO0FBSUQsUzs7O2lGQWhFQSxROzs7c0ZBQ0EsUSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtcm93LWNlbGxzLWltYWdlLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
