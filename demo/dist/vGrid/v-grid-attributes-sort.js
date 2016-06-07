'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, _dec, _dec2, _class, vGridAttributesSort;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vGridAttributesSort', vGridAttributesSort = (_dec = customAttribute('v-sort'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridAttributesSort(element, vGrid) {
          _classCallCheck(this, vGridAttributesSort);

          this.vGrid = vGrid;
          this.element = element;
        }

        vGridAttributesSort.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;

          var values = this.value.split("|");
          this.attribute = values[0];
        };

        vGridAttributesSort.prototype.attached = function attached() {
          var _this = this;

          this.sortIcon = document.createElement("SPAN");
          this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
          this.element.appendChild(this.sortIcon);
          this.element.onclick = function (e) {
            _this.vGrid.vGridConfig.onOrderBy(_this.attribute, e.shiftKey);
          };

          this.vGrid.element.addEventListener("sortIconUpdate", function (e) {
            _this.sortIcon.innerHTML = _this.getSortIconMarkup(_this.attribute);
          });
        };

        vGridAttributesSort.prototype.getSortIconMarkup = function getSortIconMarkup(attribute) {
          var _this2 = this;

          var css = this.vGrid.vGridConfig.css;

          var markup = '<span  class="' + css.sortIcon + ' ' + css.sortIconSort + '"></span>';
          var isAscHtml = '<span  class="' + css.sortIcon + ' ' + css.sortIconAsc + '"></span>';
          var isDescHtml = '<span  class="' + css.sortIcon + ' ' + css.sortIconDesc + '"></span>';

          this.vGrid.vGridSort.getFilter().forEach(function (x) {
            if (x.attribute === _this2.attribute) {
              var block = x.asc === true ? isAscHtml : isDescHtml;
              var main = '<span $ class="' + css.sortIconNo + '" data-vgridsort="' + x.no + '"></span>';
              markup = main + block;
            }
          });

          return markup;
        };

        return vGridAttributesSort;
      }()) || _class) || _class));

      _export('vGridAttributesSort', vGridAttributesSort);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBS1EsWSxxQkFBQSxNO0FBQVEscUIscUJBQUEsZTs7QUFDUixXLFVBQUEsSzs7O3FDQUtLLG1CLFdBRlosZ0JBQWdCLFFBQWhCLEMsVUFDQSxPQUFPLE9BQVAsRUFBZ0IsS0FBaEIsQztBQUlDLHFDQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7QUFBQTs7QUFDMUIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDRDs7c0NBSUQsSSxpQkFBSyxjLEVBQWdCLGUsRUFBaUI7QUFDcEMsZUFBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLGVBQXZCOztBQUdBLGNBQUksU0FBUyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLENBQWI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsT0FBTyxDQUFQLENBQWpCO0FBRUQsUzs7c0NBR0QsUSx1QkFBVztBQUFBOztBQUNULGVBQUssUUFBTCxHQUFnQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBaEI7QUFDQSxlQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLEtBQUssaUJBQUwsQ0FBdUIsS0FBSyxTQUE1QixDQUExQjtBQUNBLGVBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsS0FBSyxRQUE5QjtBQUNBLGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBQyxDQUFELEVBQU07QUFDM0Isa0JBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsQ0FBaUMsTUFBSyxTQUF0QyxFQUFpRCxFQUFFLFFBQW5EO0FBQ0QsV0FGRDs7QUFJQSxlQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLGdCQUFuQixDQUFvQyxnQkFBcEMsRUFBc0QsVUFBQyxDQUFELEVBQU07QUFDMUQsa0JBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsTUFBSyxpQkFBTCxDQUF1QixNQUFLLFNBQTVCLENBQTFCO0FBQ0QsV0FGRDtBQUdELFM7O3NDQUdELGlCLDhCQUFrQixTLEVBQVc7QUFBQTs7QUFDM0IsY0FBSSxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBakM7O0FBRUEsY0FBSSw0QkFBMEIsSUFBSSxRQUE5QixTQUEwQyxJQUFJLFlBQTlDLGNBQUo7QUFDQSxjQUFJLCtCQUE2QixJQUFJLFFBQWpDLFNBQTZDLElBQUksV0FBakQsY0FBSjtBQUNBLGNBQUksZ0NBQThCLElBQUksUUFBbEMsU0FBOEMsSUFBSSxZQUFsRCxjQUFKOztBQUdBLGVBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsU0FBckIsR0FBaUMsT0FBakMsQ0FBeUMsVUFBQyxDQUFELEVBQU87QUFDOUMsZ0JBQUksRUFBRSxTQUFGLEtBQWdCLE9BQUssU0FBekIsRUFBb0M7QUFDbEMsa0JBQUksUUFBUSxFQUFFLEdBQUYsS0FBVSxJQUFWLEdBQWlCLFNBQWpCLEdBQTZCLFVBQXpDO0FBQ0Esa0JBQUksMkJBQXlCLElBQUksVUFBN0IsMEJBQTRELEVBQUUsRUFBOUQsY0FBSjtBQUNBLHVCQUFTLE9BQU8sS0FBaEI7QUFDRDtBQUNGLFdBTkQ7O0FBUUEsaUJBQU8sTUFBUDtBQUNELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWF0dHJpYnV0ZXMtc29ydC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
