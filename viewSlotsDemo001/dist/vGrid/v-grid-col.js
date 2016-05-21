'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, Optional, customElement, bindable, VGrid, _createClass, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, VGridCol;

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
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('VGridCol', VGridCol = (_dec = customElement('v-grid-col'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function VGridCol(element, vGrid, valueConverter) {
          _classCallCheck(this, VGridCol);

          _initDefineProp(this, 'vColWidth', _descriptor, this);

          _initDefineProp(this, 'vColAttribute', _descriptor2, this);

          _initDefineProp(this, 'vColHeader', _descriptor3, this);

          _initDefineProp(this, 'vColDefaultFilter', _descriptor4, this);

          _initDefineProp(this, 'vColReadOnly', _descriptor5, this);

          _initDefineProp(this, 'vColCss', _descriptor6, this);

          _initDefineProp(this, 'vColType', _descriptor7, this);

          _initDefineProp(this, 'vColFormater', _descriptor8, this);

          _initDefineProp(this, 'vColEditRaw', _descriptor9, this);

          _initDefineProp(this, 'vColFilterOnKey', _descriptor10, this);

          this.vGrid = vGrid;
          this.element = element;
        }

        VGridCol.prototype.bind = function bind(bindingContext, overrideContext) {
          this.vGrid.vGridConfig.attributeArray.push(this.vColAttribute);
          this.vGrid.vGridConfig.attributes.push(this.vColAttribute);
          this.vGrid.vGridConfig.columnWidthArray.push(this.vColWidth);
          this.vGrid.vGridConfig.headerArray.push(this.vColHeader || "");
          this.vGrid.vGridConfig.filterArray.push(this.vColDefaultFilter || "=");
          this.vGrid.vGridConfig.readOnlyArray.push(this.vColReadOnly === "true" ? true : false);
          this.vGrid.vGridConfig.colStyleArray.push(this.vColCss);
          this.vGrid.vGridConfig.colTypeArray.push(this.vColType ? this.vColType : "text");
          this.vGrid.vGridConfig.filterOnKeyArray.push(this.vColFilterOnKey === "true" ? true : false);
          this.vGrid.vGridConfig.colEditRawArray.push(this.vColEditRaw === "true" ? true : false);
          this.vGrid.vGridConfig.colFormaterArray.push(this.valueConverters(this.vColFormater));
        };

        _createClass(VGridCol, [{
          key: 'valueConverters',
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.viewResources.lookupFunctions.valueConverters;
            }
          }
        }]);

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
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'vColFormater', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'vColEditRaw', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'vColFilterOnKey', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridCol', VGridCol);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9RLFkscUJBQUEsTTtBQUFRLGMscUJBQUEsUTtBQUFVLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7O0FBR2pDLFcsVUFBQSxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBSUssUSxXQUZaLGNBQWMsWUFBZCxDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFpQkMsMEJBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixjQUE1QixFQUE0QztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUMxQyxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUdEOzsyQkFnQkQsSSxpQkFBSyxjLEVBQWdCLGUsRUFBaUI7QUFDcEMsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixjQUF2QixDQUFzQyxJQUF0QyxDQUEyQyxLQUFLLGFBQWhEO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixVQUF2QixDQUFrQyxJQUFsQyxDQUF1QyxLQUFLLGFBQTVDO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsSUFBeEMsQ0FBNkMsS0FBSyxTQUFsRDtBQUNBLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsV0FBdkIsQ0FBbUMsSUFBbkMsQ0FBd0MsS0FBSyxVQUFMLElBQW1CLEVBQTNEO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFtQyxJQUFuQyxDQUF3QyxLQUFLLGlCQUFMLElBQTBCLEdBQWxFO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixhQUF2QixDQUFxQyxJQUFyQyxDQUEwQyxLQUFLLFlBQUwsS0FBc0IsTUFBdEIsR0FBK0IsSUFBL0IsR0FBc0MsS0FBaEY7QUFDQSxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGFBQXZCLENBQXFDLElBQXJDLENBQTBDLEtBQUssT0FBL0M7QUFDQSxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFlBQXZCLENBQW9DLElBQXBDLENBQXlDLEtBQUssUUFBTCxHQUFnQixLQUFLLFFBQXJCLEdBQWdDLE1BQXpFO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixnQkFBdkIsQ0FBd0MsSUFBeEMsQ0FBNkMsS0FBSyxlQUFMLEtBQXlCLE1BQXpCLEdBQWtDLElBQWxDLEdBQXlDLEtBQXRGO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixlQUF2QixDQUF1QyxJQUF2QyxDQUE0QyxLQUFLLFdBQUwsS0FBcUIsTUFBckIsR0FBOEIsSUFBOUIsR0FBcUMsS0FBakY7QUFDQSxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxJQUF4QyxDQUE2QyxLQUFLLGVBQUwsQ0FBcUIsS0FBSyxZQUExQixDQUE3QztBQUNELFM7Ozs7OEJBdEJxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGVBQXpCLENBQXlDLGVBQWhEO0FBQ0Q7QUFDRjs7OztxRkE5QkEsUTs7O3dGQUNBLFE7OztxRkFDQSxROzs7NEZBQ0EsUTs7O3VGQUNBLFE7OztrRkFDQSxROzs7bUZBQ0EsUTs7O3VGQUNBLFE7OztzRkFDQSxROzs7MkZBQ0EsUSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29sLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
