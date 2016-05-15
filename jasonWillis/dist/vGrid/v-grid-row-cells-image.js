'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, VGridRowCellImage;

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
      _export('VGridRowCellImage', VGridRowCellImage = (_dec = customElement('v-grid-image'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW1hZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTUTtBQUFRO0FBQWU7O0FBQ3ZCOzs7bUNBU0ssNEJBRlosY0FBYyxjQUFkLFdBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCO0FBU0MsaUJBUlcsaUJBUVgsQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO2dDQVJqQixtQkFRaUI7Ozs7OztBQUMxQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRDBCO0FBRTFCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FGMEI7U0FBNUI7O0FBUlcsb0NBaUJYLHFDQUFhLE9BQU8sS0FBSztBQUN2QixjQUFJLFVBQVUsU0FBVixFQUFxQjtBQUN2QixpQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixNQUE3QixDQUR1QjtBQUV2QixpQkFBSyxPQUFMLENBQWEsR0FBYixHQUFtQixFQUFuQixDQUZ1QjtXQUF6QixNQUdPO0FBQ0wsaUJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0IsQ0FESztBQUVMLGlCQUFLLE9BQUwsQ0FBYSxHQUFiLEdBQW1CLEVBQW5CLENBRks7QUFHTCxpQkFBSyxPQUFMLENBQWEsR0FBYixHQUFtQixLQUFuQixDQUhLO1dBSFA7OztBQWxCUyxvQ0FnQ1gsaURBQW1CLE9BQU8sS0FBSzs7QUFoQ3BCLG9DQXdDWCxxQkFBSyxRQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZCxDQURXOzs7QUF4Q0Ysb0NBZ0RYLCtCQUFXO0FBQ1QsZUFBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFmLENBRFM7QUFFVCxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsV0FBbEIsQ0FBOEIsR0FBOUIsQ0FBa0MsV0FBbEMsQ0FBM0IsQ0FGUztBQUdULGVBQUssWUFBTCxDQUFrQixLQUFLLEtBQUwsQ0FBbEIsQ0FIUztBQUlULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsR0FBNEIsTUFBNUIsQ0FKUztBQUtULGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsTUFBN0IsQ0FMUztBQU1ULGVBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsS0FBSyxPQUFMLENBQXpCLENBTlM7O0FBU1QsZUFBSyxPQUFMLENBQWEsUUFBYixHQUF3QixTQUFTLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBakMsQ0FUUzs7QUFZVCxlQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixXQUE5QixFQUEyQyxVQUFVLENBQVYsRUFBYTtBQUN0RCxpQkFBSyxPQUFMLENBQWEsS0FBYixHQURzRDtXQUFiLENBRXpDLElBRnlDLENBRXBDLElBRm9DLENBQTNDLEVBWlM7OztlQWhEQTtpRkFDVjs7O3NGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1yb3ctY2VsbHMtaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
