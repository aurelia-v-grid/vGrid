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

          _initDefineProp(this, 'colWidth', _descriptor, this);

          _initDefineProp(this, 'attribute', _descriptor2, this);

          _initDefineProp(this, 'header', _descriptor3, this);

          _initDefineProp(this, 'defaultFilter', _descriptor4, this);

          _initDefineProp(this, 'readOnly', _descriptor5, this);

          _initDefineProp(this, 'colCss', _descriptor6, this);

          _initDefineProp(this, 'colType', _descriptor7, this);

          this.vGrid = vGrid;
          this.element = element;
        }

        VGridCol.prototype.bind = function bind(bindingContext, overrideContext) {
          this.vGrid.vGridConfig.attributeArray.push(this.attribute);
          this.vGrid.vGridConfig.columnWidthArray.push(this.colWidth);
          this.vGrid.vGridConfig.headerArray.push(this.header || "");
          this.vGrid.vGridConfig.filterArray.push(this.defaultFilter || "?");
          this.vGrid.vGridConfig.readOnlyArray.push(this.readonly === "true" ? this.attribute : false);
          this.vGrid.vGridConfig.colStyleArray.push(this.colCss);
          this.vGrid.vGridConfig.colTypeArray.push(this.colType);
        };

        return VGridCol;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'colWidth', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'attribute', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'header', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'defaultFilter', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'readOnly', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'colCss', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'colType', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridCol', VGridCol);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHUTtBQUFRO0FBQVU7QUFBZTs7QUFDakM7OzswQkFJSyxtQkFGWixjQUFjLFlBQWQsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEI7QUFXQyxpQkFWVyxRQVVYLENBQVksT0FBWixFQUFxQixLQUFyQixFQUEyQjtnQ0FWaEIsVUFVZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDekIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQUR5QjtBQUV6QixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRnlCO1NBQTNCOztBQVZXLDJCQWlCWCxxQkFBSyxnQkFBZ0IsaUJBQWdCO0FBQ25DLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsQ0FBc0MsSUFBdEMsQ0FBMkMsS0FBSyxTQUFMLENBQTNDLENBRG1DO0FBRW5DLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZ0JBQXZCLENBQXdDLElBQXhDLENBQTZDLEtBQUssUUFBTCxDQUE3QyxDQUZtQztBQUduQyxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFdBQXZCLENBQW1DLElBQW5DLENBQXdDLEtBQUssTUFBTCxJQUFlLEVBQWYsQ0FBeEMsQ0FIbUM7QUFJbkMsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFtQyxJQUFuQyxDQUF3QyxLQUFLLGFBQUwsSUFBc0IsR0FBdEIsQ0FBeEMsQ0FKbUM7QUFLbkMsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixhQUF2QixDQUFxQyxJQUFyQyxDQUEwQyxLQUFLLFFBQUwsS0FBa0IsTUFBbEIsR0FBMkIsS0FBSyxTQUFMLEdBQWlCLEtBQTVDLENBQTFDLENBTG1DO0FBTW5DLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsYUFBdkIsQ0FBcUMsSUFBckMsQ0FBMEMsS0FBSyxNQUFMLENBQTFDLENBTm1DO0FBT25DLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsWUFBdkIsQ0FBb0MsSUFBcEMsQ0FBeUMsS0FBSyxPQUFMLENBQXpDLENBUG1DOzs7ZUFqQjFCO29GQUNWOzs7b0ZBQ0E7OztpRkFDQTs7O3dGQUNBOzs7bUZBQ0E7OztpRkFDQTs7O2tGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb2wuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
