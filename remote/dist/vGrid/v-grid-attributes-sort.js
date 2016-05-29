'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, vGridHeaderSortIcon;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
      Optional = _aureliaFramework.Optional;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vGridHeaderSortIcon', vGridHeaderSortIcon = (_dec = customAttribute('v-sort'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridHeaderSortIcon(element, vGrid) {
          _classCallCheck(this, vGridHeaderSortIcon);

          this.vGrid = vGrid;
          this.element = element;
        }

        vGridHeaderSortIcon.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;

          var values = this.value.split("|");
          this.attribute = values[0];
          this.icon = values[1] ? true : false;
          this.filterOperator = values[2] || "=";
        };

        vGridHeaderSortIcon.prototype.attached = function attached() {
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

        vGridHeaderSortIcon.prototype.getSortIconMarkup = function getSortIconMarkup(attribute) {
          var _this2 = this;

          var css = this.vGrid.vGridConfig.css;

          var markup = '<span  class="' + css.sortIcon + ' ' + css.sortIconSort + '"></span>';

          var isAscHtml = '<span  class="' + css.sortIcon + ' ' + css.sortIconAsc + '"></span>';
          var isDescHtml = '<span  class="' + css.sortIcon + ' ' + css.sortIconDesc + '"></span>';

          this.vGrid.vGridSort.getFilter().forEach(function (x) {
            if (x.attribute === _this2.attribute) {
              var block = x.asc === true ? isAscHtml : isDescHtml;
              var main = '<span $ class="' + css.sortIcon + ' ' + css.sortIconNo + x.no + '"></span>';
              markup = main + block;
            }
          });

          return markup;
        };

        return vGridHeaderSortIcon;
      }()) || _class) || _class));

      _export('vGridHeaderSortIcon', vGridHeaderSortIcon);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBS1EsWSxxQkFBQSxNO0FBQVEscUIscUJBQUEsZTtBQUFpQixjLHFCQUFBLFE7O0FBSXpCLFcsVUFBQSxLOzs7cUNBS0ssbUIsV0FGWixnQkFBZ0IsUUFBaEIsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixDO0FBR0MscUNBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtBQUFBOztBQUMxQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOztzQ0FHRCxJLGlCQUFLLGMsRUFBZ0IsZSxFQUFpQjtBQUNwQyxlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7O0FBR0EsY0FBSSxTQUFTLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBLGVBQUssU0FBTCxHQUFpQixPQUFPLENBQVAsQ0FBakI7QUFDQSxlQUFLLElBQUwsR0FBWSxPQUFPLENBQVAsSUFBWSxJQUFaLEdBQW1CLEtBQS9CO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLE9BQU8sQ0FBUCxLQUFhLEdBQW5DO0FBRUQsUzs7c0NBRUQsUSx1QkFBVztBQUFBOztBQUNULGVBQUssUUFBTCxHQUFnQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBaEI7QUFDQSxlQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLEtBQUssaUJBQUwsQ0FBdUIsS0FBSyxTQUE1QixDQUExQjtBQUNBLGVBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsS0FBSyxRQUE5QjtBQUNBLGVBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsVUFBQyxDQUFELEVBQU07QUFDM0Isa0JBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsQ0FBaUMsTUFBSyxTQUF0QyxFQUFpRCxFQUFFLFFBQW5EO0FBQ0QsV0FGRDs7QUFJQSxlQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLGdCQUFuQixDQUFvQyxnQkFBcEMsRUFBc0QsVUFBQyxDQUFELEVBQU07QUFDMUQsa0JBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsTUFBSyxpQkFBTCxDQUF1QixNQUFLLFNBQTVCLENBQTFCO0FBQ0QsV0FGRDtBQUtELFM7O3NDQUdELGlCLDhCQUFrQixTLEVBQVc7QUFBQTs7QUFDM0IsY0FBSSxNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBakM7O0FBRUEsY0FBSSw0QkFBMEIsSUFBSSxRQUE5QixTQUEwQyxJQUFJLFlBQTlDLGNBQUo7O0FBRUEsY0FBSSwrQkFBNkIsSUFBSSxRQUFqQyxTQUE2QyxJQUFJLFdBQWpELGNBQUo7QUFDQSxjQUFJLGdDQUE4QixJQUFJLFFBQWxDLFNBQThDLElBQUksWUFBbEQsY0FBSjs7QUFHQSxlQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLFNBQXJCLEdBQWlDLE9BQWpDLENBQXlDLFVBQUMsQ0FBRCxFQUFPO0FBQzlDLGdCQUFJLEVBQUUsU0FBRixLQUFnQixPQUFLLFNBQXpCLEVBQW9DO0FBQ2xDLGtCQUFJLFFBQVEsRUFBRSxHQUFGLEtBQVUsSUFBVixHQUFpQixTQUFqQixHQUE2QixVQUF6QztBQUNBLGtCQUFJLDJCQUF5QixJQUFJLFFBQTdCLFNBQXlDLElBQUksVUFBN0MsR0FBMEQsRUFBRSxFQUE1RCxjQUFKO0FBQ0EsdUJBQVMsT0FBTyxLQUFoQjtBQUNEO0FBQ0YsV0FORDs7QUFTQSxpQkFBTyxNQUFQO0FBQ0QsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtYXR0cmlidXRlcy1zb3J0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
