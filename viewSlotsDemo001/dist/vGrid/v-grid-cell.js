'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var noView, customElement, processContent, bindable, _dec, _class, _desc, _value, _class2, _descriptor, _class3, _temp, VGridCell;

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
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('VGridCell', VGridCell = (_dec = customElement('v-grid-cell'), noView(_class = _dec(_class = (_class2 = (_temp = _class3 = function () {
        function VGridCell(element) {
          _classCallCheck(this, VGridCell);

          _initDefineProp(this, 'colNo', _descriptor, this);

          this.element = element;
        }

        VGridCell.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          this.ctx = bindingContext.ctx;
          if (this.bindingContext && this.cellContent) {
            this.setValue(this.bindingContext[this.ctx.vGridConfig.attributeArray[this.colNo]]);
          }
        };

        VGridCell.prototype.created = function created() {
          console.log("VGridCol, created");
        };

        VGridCell.prototype.setValue = function setValue(value) {
          if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "image") {
            this.cellContent.src = value;
          } else {
            this.cellContent.value = value;
          }
        };

        VGridCell.prototype.attached = function attached() {

          if (this.ctx.vGridConfig.colTypeArray[this.colNo] === "image") {
            this.cellContent = document.createElement("img");
          } else {
            this.cellContent = document.createElement("input");
          }
          this.cellContent.classList.add(this.ctx.vGridConfig.css.cellContent);
          this.cellContent.setAttribute(this.ctx.vGridConfig.atts.dataAttribute, this.ctx.vGridConfig.attributeArray[this.colNo]);
          this.cellContent.setAttribute("style", this.ctx.vGridConfig.colStyleArray[this.colNo]);
          if (this.bindingContext) {
            this.setValue(this.bindingContext[this.ctx.vGridConfig.attributeArray[this.colNo]]);
          }
          this.element.appendChild(this.cellContent);
        };

        return VGridCell;
      }(), _class3.inject = [Element], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'colNo', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('VGridCell', VGridCell);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVE7QUFBUTtBQUFlO0FBQWdCOzs7MkJBS2xDLG9CQUZaLGNBQWMsYUFBZCxHQURBO0FBT0MsaUJBSlcsU0FJWCxDQUFZLE9BQVosRUFBb0I7Z0NBSlQsV0FJUzs7OztBQUNsQixlQUFLLE9BQUwsR0FBZSxPQUFmLENBRGtCO1NBQXBCOztBQUpXLDRCQVVYLHFCQUFLLGdCQUFlO0FBQ2xCLGVBQUssY0FBTCxHQUFzQixjQUF0QixDQURrQjtBQUVsQixlQUFLLEdBQUwsR0FBVyxlQUFlLEdBQWYsQ0FGTztBQUdsQixjQUFHLEtBQUssY0FBTCxJQUF1QixLQUFLLFdBQUwsRUFBaUI7QUFDekMsaUJBQUssUUFBTCxDQUFjLEtBQUssY0FBTCxDQUFvQixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLGNBQXJCLENBQW9DLEtBQUssS0FBTCxDQUF4RCxDQUFkLEVBRHlDO1dBQTNDOzs7QUFiUyw0QkFtQlgsNkJBQVM7QUFDUCxrQkFBUSxHQUFSLENBQVksbUJBQVosRUFETzs7O0FBbkJFLDRCQXVCWCw2QkFBVSxPQUFNO0FBQ2QsY0FBRyxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLFlBQXJCLENBQWtDLEtBQUssS0FBTCxDQUFsQyxLQUFrRCxPQUFsRCxFQUEwRDtBQUMzRCxpQkFBSyxXQUFMLENBQWlCLEdBQWpCLEdBQXVCLEtBQXZCLENBRDJEO1dBQTdELE1BRU87QUFDTCxpQkFBSyxXQUFMLENBQWlCLEtBQWpCLEdBQXlCLEtBQXpCLENBREs7V0FGUDs7O0FBeEJTLDRCQWdDWCwrQkFBVTs7QUFNUCxjQUFHLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsWUFBckIsQ0FBa0MsS0FBSyxLQUFMLENBQWxDLEtBQWtELE9BQWxELEVBQTBEO0FBQzNELGlCQUFLLFdBQUwsR0FBbUIsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQW5CLENBRDJEO1dBQTdELE1BRU87QUFDTCxpQkFBSyxXQUFMLEdBQW1CLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFuQixDQURLO1dBRlA7QUFLQSxlQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsR0FBM0IsQ0FBK0IsS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixHQUFyQixDQUF5QixXQUF6QixDQUEvQixDQVhPO0FBWVAsZUFBSyxXQUFMLENBQWlCLFlBQWpCLENBQThCLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsSUFBckIsQ0FBMEIsYUFBMUIsRUFBeUMsS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixjQUFyQixDQUFvQyxLQUFLLEtBQUwsQ0FBM0csRUFaTztBQWFQLGVBQUssV0FBTCxDQUFpQixZQUFqQixDQUE4QixPQUE5QixFQUF1QyxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLGFBQXJCLENBQW1DLEtBQUssS0FBTCxDQUExRSxFQWJPO0FBY1AsY0FBRyxLQUFLLGNBQUwsRUFBb0I7QUFDckIsaUJBQUssUUFBTCxDQUFjLEtBQUssY0FBTCxDQUFvQixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLGNBQXJCLENBQW9DLEtBQUssS0FBTCxDQUF4RCxDQUFkLEVBRHFCO1dBQXZCO0FBR0EsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLFdBQUwsQ0FBekIsQ0FqQk87OztlQWhDQzttQkFDSCxTQUFTLENBQUMsT0FBRCxpRkFDaEIiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNlbGwuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
