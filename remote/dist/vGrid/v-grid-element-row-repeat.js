'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, noView, customElement, processContent, Container, TargetInstruction, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _dec4, _class, VGridRowRepeat;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      Container = _aureliaFramework.Container;
      TargetInstruction = _aureliaFramework.TargetInstruction;
      bindable = _aureliaFramework.bindable;
      ViewSlot = _aureliaFramework.ViewSlot;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('VGridRowRepeat', VGridRowRepeat = (_dec = noView(), _dec2 = customElement('v-grid-row-repeat'), _dec3 = processContent(function (compiler, resources, element, instruction) {

        var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
          instruction.headerTemplate = headerTemplateHtml;
        }

        var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
          instruction.rowTemplate = rowTemplateHtml;
        }

        if (!rowTemplateHtml) {
          instruction.rowTemplate = element.innerHTML;
        }

        element.innerHTML = '';
      }), _dec4 = inject(Element, VGrid, TargetInstruction), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function () {
        function VGridRowRepeat(element, vGrid, targetInstruction) {
          _classCallCheck(this, VGridRowRepeat);

          this.element = element;
          this.vGrid = vGrid;
          this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
        }

        VGridRowRepeat.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          this.vGrid.vGridConfig.repeater = true;
          this.vGrid.vGridConfig.repeatTemplate = this.rowTemplate;
        };

        return VGridRowRepeat;
      }()) || _class) || _class) || _class) || _class));

      _export('VGridRowRepeat', VGridRowRepeat);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1lbGVtZW50LXJvdy1yZXBlYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsWSxxQkFBQSxNO0FBQVEsWSxxQkFBQSxNO0FBQVEsbUIscUJBQUEsYTtBQUFlLG9CLHFCQUFBLGM7QUFBZ0IsZSxxQkFBQSxTO0FBQVcsdUIscUJBQUEsaUI7QUFBa0IsYyxxQkFBQSxRO0FBQVUsYyxxQkFBQSxROztBQUd0RixXLFVBQUEsSzs7O2dDQTRCSyxjLFdBekJaLFEsVUFDQSxjQUFjLG1CQUFkLEMsVUFDQSxlQUFlLFVBQUMsUUFBRCxFQUFXLFNBQVgsRUFBc0IsT0FBdEIsRUFBK0IsV0FBL0IsRUFBK0M7O0FBRTdELFlBQUksd0JBQXdCLFFBQVEsb0JBQVIsQ0FBNkIsbUJBQTdCLEVBQWtELENBQWxELENBQTVCO0FBQ0EsWUFBSSxxQkFBcUIsd0JBQXdCLHNCQUFzQixTQUE5QyxHQUF3RCxJQUFqRjtBQUNBLFlBQUksdUJBQXVCLEVBQTNCLEVBQStCO0FBQzdCLHNCQUFZLGNBQVosR0FBNkIsa0JBQTdCO0FBQ0Q7O0FBRUQsWUFBSSxxQkFBcUIsUUFBUSxvQkFBUixDQUE2QixnQkFBN0IsRUFBK0MsQ0FBL0MsQ0FBekI7QUFDQSxZQUFJLGtCQUFrQixxQkFBcUIsbUJBQW1CLFNBQXhDLEdBQWtELElBQXhFO0FBQ0EsWUFBSSxvQkFBb0IsRUFBeEIsRUFBNEI7QUFDMUIsc0JBQVksV0FBWixHQUEwQixlQUExQjtBQUNEOztBQUdELFlBQUcsQ0FBQyxlQUFKLEVBQW9CO0FBQ2xCLHNCQUFZLFdBQVosR0FBMEIsUUFBUSxTQUFsQztBQUNEOztBQUVELGdCQUFRLFNBQVIsR0FBb0IsRUFBcEI7QUFFRCxPQXJCQSxDLFVBc0JBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixFQUF1QixpQkFBdkIsQztBQU9DLGdDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEIsaUJBQTVCLEVBQStDO0FBQUE7O0FBQzdDLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxXQUFMLEdBQW1CLGtCQUFrQixrQkFBbEIsQ0FBcUMsV0FBeEQ7QUFFRDs7aUNBTUQsSSxpQkFBSyxjLEVBQWdCO0FBQ25CLGVBQUssY0FBTCxHQUFzQixjQUF0QjtBQUNBLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsUUFBdkIsR0FBa0MsSUFBbEM7QUFDQSxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGNBQXZCLEdBQXdDLEtBQUssV0FBN0M7QUFDRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1lbGVtZW50LXJvdy1yZXBlYXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
