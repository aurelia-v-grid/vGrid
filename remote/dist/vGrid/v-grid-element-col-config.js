'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, noView, customElement, bindable, processContent, TargetInstruction, VGrid, _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, VGridElementColConfig;

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
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      processContent = _aureliaFramework.processContent;
      TargetInstruction = _aureliaFramework.TargetInstruction;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridElementColConfig', VGridElementColConfig = (_dec = noView(), _dec2 = processContent(function (compiler, resources, element, instruction) {

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
        function VGridElementColConfig(element, vGrid, targetInstruction) {
          _classCallCheck(this, VGridElementColConfig);

          _initDefineProp(this, 'vColWidth', _descriptor, this);

          this.vGrid = vGrid;
          this.element = element;
          this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
          this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
        }

        VGridElementColConfig.prototype.bind = function bind(bindingContext, overrideContext) {
          this.vGrid.vGridConfig.columnLenght++;

          this.vGrid.vGridConfig.colConfig.push({
            width: this.vColWidth || 100,
            rowTemplate: this.rowTemplate,
            headerTemplate: this.headerTemplate
          });
        };

        return VGridElementColConfig;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'vColWidth', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('VGridElementColConfig', VGridElementColConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1lbGVtZW50LWNvbC1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9RLFkscUJBQUEsTTtBQUFRLFkscUJBQUEsTTtBQUFRLG1CLHFCQUFBLGE7QUFBZSxjLHFCQUFBLFE7QUFBVSxvQixxQkFBQSxjO0FBQWdCLHVCLHFCQUFBLGlCOztBQUl6RCxXLFVBQUEsSzs7O3VDQTBCSyxxQixXQXhCWixRLFVBQ0EsZUFBZSxVQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQStDOztBQUU3RCxZQUFJLHdCQUF3QixRQUFRLG9CQUFSLENBQTZCLG1CQUE3QixFQUFrRCxDQUFsRCxDQUE1QjtBQUNBLFlBQUkscUJBQXFCLHdCQUF3QixzQkFBc0IsU0FBOUMsR0FBd0QsSUFBakY7QUFDQSxZQUFJLHVCQUF1QixFQUEzQixFQUErQjtBQUM3QixzQkFBWSxjQUFaLEdBQTZCLGtCQUE3QjtBQUNELFNBRkQsTUFFTyxDQUVOOztBQUVELFlBQUkscUJBQXFCLFFBQVEsb0JBQVIsQ0FBNkIsZ0JBQTdCLEVBQStDLENBQS9DLENBQXpCO0FBQ0EsWUFBSSxrQkFBa0IscUJBQXFCLG1CQUFtQixTQUF4QyxHQUFrRCxJQUF4RTtBQUNBLFlBQUksb0JBQW9CLEVBQXhCLEVBQTRCO0FBQzFCLHNCQUFZLFdBQVosR0FBMEIsZUFBMUI7QUFDRCxTQUZELE1BRU8sQ0FFTjs7QUFFRCxnQkFBUSxTQUFSLEdBQW9CLEVBQXBCO0FBRUQsT0FwQkEsQyxVQXFCQSxjQUFjLFlBQWQsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixFQUF1QixpQkFBdkIsQztBQVFDLHVDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsaUJBQTVCLEVBQStDO0FBQUE7O0FBQUE7O0FBQzdDLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxXQUFMLEdBQW1CLGtCQUFrQixrQkFBbEIsQ0FBcUMsV0FBeEQ7QUFDQSxlQUFLLGNBQUwsR0FBc0Isa0JBQWtCLGtCQUFsQixDQUFxQyxjQUEzRDtBQUNEOzt3Q0FNRCxJLGlCQUFLLGMsRUFBZ0IsZSxFQUFpQjtBQUNwQyxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFlBQXZCOztBQUVBLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsQ0FBaUMsSUFBakMsQ0FBc0M7QUFDcEMsbUJBQU0sS0FBSyxTQUFMLElBQWtCLEdBRFk7QUFFcEMseUJBQVksS0FBSyxXQUZtQjtBQUdwQyw0QkFBZSxLQUFLO0FBSGdCLFdBQXRDO0FBT0QsUzs7O3FGQTNCQSxRIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1lbGVtZW50LWNvbC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
