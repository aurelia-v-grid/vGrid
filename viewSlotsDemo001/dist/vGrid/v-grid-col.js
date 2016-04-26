'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  var inject, Optional, customElement, bindable, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, VGridCol;

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
      Optional = _aureliaFramework.Optional;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridCol', VGridCol = (_dec = customElement('v-grid-col'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridCol(element, vGrid) {
          _classCallCheck(this, VGridCol);

          _initDefineProp(this, 'vColWidth', _descriptor, this);

          _initDefineProp(this, 'vColAttribute', _descriptor2, this);

          _initDefineProp(this, 'vColHeader', _descriptor3, this);

          _initDefineProp(this, 'vColDefaultFilter', _descriptor4, this);

          _initDefineProp(this, 'vColReadOnly', _descriptor5, this);

          _initDefineProp(this, 'vColCss', _descriptor6, this);

          _initDefineProp(this, 'vColType', _descriptor7, this);

          this.vGrid = vGrid;
          this.element = element;
        }

        VGridCol.prototype.bind = function bind(bindingContext, overrideContext) {
          this.vGrid.vGridConfig.attributeArray.push(this.vColAttribute);
          this.vGrid.vGridConfig.columnWidthArray.push(this.vColWidth);
          this.vGrid.vGridConfig.headerArray.push(this.vColHeader || "");
          this.vGrid.vGridConfig.filterArray.push(this.vColDefaultFilter || "?");
          this.vGrid.vGridConfig.readOnlyArray.push(this.vColReadOnly === "true" ? this.vColAttribute : false);
          this.vGrid.vGridConfig.colStyleArray.push(this.vColCss);
          this.vGrid.vGridConfig.colTypeArray.push(this.vColType);
          this.vGrid.vGridConfig.columns.push(this);
        };

        return VGridCol;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'vColWidth', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'vColAttribute', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'vColHeader', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'vColDefaultFilter', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'vColReadOnly', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'vColCss', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'vColType', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridCol', VGridCol);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHUTtBQUFRO0FBQVU7QUFBZTs7QUFDakM7OzswQkFJSyxtQkFGWixjQUFjLFlBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFXQyxpQkFWVyxRQVVYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtnQ0FWakIsVUFVaUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDMUIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUQwQjtBQUUxQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRjBCO1NBQTVCOztBQVZXLDJCQWlCWCxxQkFBSyxnQkFBZ0IsaUJBQWlCO0FBQ3BDLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsQ0FBc0MsSUFBdEMsQ0FBMkMsS0FBSyxhQUFMLENBQTNDLENBRG9DO0FBRXBDLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLElBQXhDLENBQTZDLEtBQUssU0FBTCxDQUE3QyxDQUZvQztBQUdwQyxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLElBQW5DLENBQXdDLEtBQUssVUFBTCxJQUFtQixFQUFuQixDQUF4QyxDQUhvQztBQUlwQyxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLElBQW5DLENBQXdDLEtBQUssaUJBQUwsSUFBMEIsR0FBMUIsQ0FBeEMsQ0FKb0M7QUFLcEMsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixhQUF2QixDQUFxQyxJQUFyQyxDQUEwQyxLQUFLLFlBQUwsS0FBc0IsTUFBdEIsR0FBK0IsS0FBSyxhQUFMLEdBQXFCLEtBQXBELENBQTFDLENBTG9DO0FBTXBDLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsYUFBdkIsQ0FBcUMsSUFBckMsQ0FBMEMsS0FBSyxPQUFMLENBQTFDLENBTm9DO0FBT3BDLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsWUFBdkIsQ0FBb0MsSUFBcEMsQ0FBeUMsS0FBSyxRQUFMLENBQXpDLENBUG9DO0FBUXBDLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsT0FBdkIsQ0FBK0IsSUFBL0IsQ0FBb0MsSUFBcEMsRUFSb0M7OztlQWpCM0I7cUZBQ1Y7Ozt3RkFDQTs7O3FGQUNBOzs7NEZBQ0E7Ozt1RkFDQTs7O2tGQUNBOzs7bUZBQ0EiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
