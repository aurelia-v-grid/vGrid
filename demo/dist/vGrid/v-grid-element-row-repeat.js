'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, noView, customElement, processContent, Container, TargetInstruction, bindable, ViewSlot, VGrid, _dec, _dec2, _dec3, _dec4, _class, VGridElementRowRepeat;

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
      _export('VGridElementRowRepeat', VGridElementRowRepeat = (_dec = noView(), _dec2 = customElement('v-grid-row-repeat'), _dec3 = processContent(function (compiler, resources, element, instruction) {

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
        function VGridElementRowRepeat(element, vGrid, targetInstruction) {
          _classCallCheck(this, VGridElementRowRepeat);

          this.element = element;
          this.vGrid = vGrid;
          this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
        }

        VGridElementRowRepeat.prototype.bind = function bind(bindingContext) {
          this.bindingContext = bindingContext;
          this.vGrid.vGridConfig.repeater = true;
          this.vGrid.vGridConfig.repeatTemplate = this.rowTemplate;
        };

        return VGridElementRowRepeat;
      }()) || _class) || _class) || _class) || _class));

      _export('VGridElementRowRepeat', VGridElementRowRepeat);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1lbGVtZW50LXJvdy1yZXBlYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsWSxxQkFBQSxNO0FBQVEsWSxxQkFBQSxNO0FBQVEsbUIscUJBQUEsYTtBQUFlLG9CLHFCQUFBLGM7QUFBZ0IsZSxxQkFBQSxTO0FBQVcsdUIscUJBQUEsaUI7QUFBa0IsYyxxQkFBQSxRO0FBQVUsYyxxQkFBQSxROztBQUN0RixXLFVBQUEsSzs7O3VDQTRCSyxxQixXQXpCWixRLFVBQ0EsY0FBYyxtQkFBZCxDLFVBQ0EsZUFBZSxVQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQStDOztBQUU3RCxZQUFJLHdCQUF3QixRQUFRLG9CQUFSLENBQTZCLG1CQUE3QixFQUFrRCxDQUFsRCxDQUE1QjtBQUNBLFlBQUkscUJBQXFCLHdCQUF3QixzQkFBc0IsU0FBOUMsR0FBd0QsSUFBakY7QUFDQSxZQUFJLHVCQUF1QixFQUEzQixFQUErQjtBQUM3QixzQkFBWSxjQUFaLEdBQTZCLGtCQUE3QjtBQUNEOztBQUVELFlBQUkscUJBQXFCLFFBQVEsb0JBQVIsQ0FBNkIsZ0JBQTdCLEVBQStDLENBQS9DLENBQXpCO0FBQ0EsWUFBSSxrQkFBa0IscUJBQXFCLG1CQUFtQixTQUF4QyxHQUFrRCxJQUF4RTtBQUNBLFlBQUksb0JBQW9CLEVBQXhCLEVBQTRCO0FBQzFCLHNCQUFZLFdBQVosR0FBMEIsZUFBMUI7QUFDRDs7QUFHRCxZQUFHLENBQUMsZUFBSixFQUFvQjtBQUNsQixzQkFBWSxXQUFaLEdBQTBCLFFBQVEsU0FBbEM7QUFDRDs7QUFFRCxnQkFBUSxTQUFSLEdBQW9CLEVBQXBCO0FBRUQsT0FyQkEsQyxVQXNCQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsRUFBdUIsaUJBQXZCLEM7QUFJQyx1Q0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCLGlCQUE1QixFQUErQztBQUFBOztBQUM3QyxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssV0FBTCxHQUFtQixrQkFBa0Isa0JBQWxCLENBQXFDLFdBQXhEO0FBRUQ7O3dDQUdELEksaUJBQUssYyxFQUFnQjtBQUNuQixlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFFBQXZCLEdBQWtDLElBQWxDO0FBQ0EsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixjQUF2QixHQUF3QyxLQUFLLFdBQTdDO0FBQ0QsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtZWxlbWVudC1yb3ctcmVwZWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
