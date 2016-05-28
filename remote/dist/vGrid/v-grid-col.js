'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, Optional, noView, customElement, bindable, processContent, TargetInstruction, VGrid, _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, VGridCol;

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
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      processContent = _aureliaFramework.processContent;
      TargetInstruction = _aureliaFramework.TargetInstruction;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridCol', VGridCol = (_dec = noView(), _dec2 = processContent(function (compiler, resources, element, instruction) {

        var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
          instruction.headerTemplate = headerTemplateHtml;
        } else {}

        var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
          instruction.rowTemplate = rowTemplateHtml;
        } else {}

        element.innerHTML = '';
      }), _dec3 = customElement('v-grid-col'), _dec4 = inject(Element, VGrid, TargetInstruction), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = function () {
        function VGridCol(element, vGrid, targetInstruction) {
          _classCallCheck(this, VGridCol);

          _initDefineProp(this, 'vColWidth', _descriptor, this);

          this.vGrid = vGrid;
          this.element = element;
          this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
          this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
        }

        VGridCol.prototype.bind = function bind(bindingContext, overrideContext) {
          this.vGrid.vGridConfig.columns++;
          this.vGrid.vGridConfig.columnWidthArray.push(this.vColWidth);
          this.vGrid.vGridConfig.colRowTemplateArray.push(this.rowTemplate);
          this.vGrid.vGridConfig.colHeaderTemplateArray.push(this.headerTemplate);
        };

        return VGridCol;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'vColWidth', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridCol', VGridCol);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9RLFkscUJBQUEsTTtBQUFRLGMscUJBQUEsUTtBQUFVLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7QUFBVSxvQixxQkFBQSxjO0FBQWdCLHVCLHFCQUFBLGlCOztBQUluRSxXLFVBQUEsSzs7OzBCQTBCSyxRLFdBeEJaLFEsVUFDQSxlQUFlLFVBQUMsUUFBRCxFQUFXLFNBQVgsRUFBc0IsT0FBdEIsRUFBK0IsV0FBL0IsRUFBK0M7O0FBRTdELFlBQUksd0JBQXdCLFFBQVEsb0JBQVIsQ0FBNkIsbUJBQTdCLEVBQWtELENBQWxELENBQTVCO0FBQ0EsWUFBSSxxQkFBcUIsd0JBQXdCLHNCQUFzQixTQUE5QyxHQUF3RCxJQUFqRjtBQUNBLFlBQUksdUJBQXVCLEVBQTNCLEVBQStCO0FBQzdCLHNCQUFZLGNBQVosR0FBNkIsa0JBQTdCO0FBQ0QsU0FGRCxNQUVPLENBRU47O0FBRUQsWUFBSSxxQkFBcUIsUUFBUSxvQkFBUixDQUE2QixnQkFBN0IsRUFBK0MsQ0FBL0MsQ0FBekI7QUFDQSxZQUFJLGtCQUFrQixxQkFBcUIsbUJBQW1CLFNBQXhDLEdBQWtELElBQXhFO0FBQ0EsWUFBSSxvQkFBb0IsRUFBeEIsRUFBNEI7QUFDMUIsc0JBQVksV0FBWixHQUEwQixlQUExQjtBQUNELFNBRkQsTUFFTyxDQUVOOztBQUVELGdCQUFRLFNBQVIsR0FBb0IsRUFBcEI7QUFFRCxPQXBCQSxDLFVBcUJBLGNBQWMsWUFBZCxDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEVBQXVCLGlCQUF2QixDO0FBUUMsMEJBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QixpQkFBNUIsRUFBK0M7QUFBQTs7QUFBQTs7QUFDN0MsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLFdBQUwsR0FBbUIsa0JBQWtCLGtCQUFsQixDQUFxQyxXQUF4RDtBQUNBLGVBQUssY0FBTCxHQUFzQixrQkFBa0Isa0JBQWxCLENBQXFDLGNBQTNEO0FBQ0Q7OzJCQU1ELEksaUJBQUssYyxFQUFnQixlLEVBQWlCO0FBQ3BDLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsT0FBdkI7QUFDQSxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGdCQUF2QixDQUF3QyxJQUF4QyxDQUE2QyxLQUFLLFNBQWxEO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixtQkFBdkIsQ0FBMkMsSUFBM0MsQ0FBZ0QsS0FBSyxXQUFyRDtBQUNBLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsc0JBQXZCLENBQThDLElBQTlDLENBQW1ELEtBQUssY0FBeEQ7QUFDRCxTOzs7cUZBdEJBLFEiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
