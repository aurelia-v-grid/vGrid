'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, vGridAttributesSort;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLXNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBS1EsWSxxQkFBQSxNO0FBQVEscUIscUJBQUEsZTtBQUFpQixjLHFCQUFBLFE7O0FBQ3pCLFcsVUFBQSxLOzs7cUNBS0ssbUIsV0FGWixnQkFBZ0IsUUFBaEIsQyxVQUNBLE9BQU8sT0FBUCxFQUFnQixLQUFoQixDO0FBSUMscUNBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtBQUFBOztBQUMxQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOztzQ0FJRCxJLGlCQUFLLGMsRUFBZ0IsZSxFQUFpQjtBQUNwQyxlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7O0FBR0EsY0FBSSxTQUFTLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBLGVBQUssU0FBTCxHQUFpQixPQUFPLENBQVAsQ0FBakI7QUFFRCxTOztzQ0FHRCxRLHVCQUFXO0FBQUE7O0FBQ1QsZUFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFoQjtBQUNBLGVBQUssUUFBTCxDQUFjLFNBQWQsR0FBMEIsS0FBSyxpQkFBTCxDQUF1QixLQUFLLFNBQTVCLENBQTFCO0FBQ0EsZUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixLQUFLLFFBQTlCO0FBQ0EsZUFBSyxPQUFMLENBQWEsT0FBYixHQUF1QixVQUFDLENBQUQsRUFBTTtBQUMzQixrQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUFpQyxNQUFLLFNBQXRDLEVBQWlELEVBQUUsUUFBbkQ7QUFDRCxXQUZEOztBQUlBLGVBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsZ0JBQW5CLENBQW9DLGdCQUFwQyxFQUFzRCxVQUFDLENBQUQsRUFBTTtBQUMxRCxrQkFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixNQUFLLGlCQUFMLENBQXVCLE1BQUssU0FBNUIsQ0FBMUI7QUFDRCxXQUZEO0FBR0QsUzs7c0NBR0QsaUIsOEJBQWtCLFMsRUFBVztBQUFBOztBQUMzQixjQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUFqQzs7QUFFQSxjQUFJLDRCQUEwQixJQUFJLFFBQTlCLFNBQTBDLElBQUksWUFBOUMsY0FBSjtBQUNBLGNBQUksK0JBQTZCLElBQUksUUFBakMsU0FBNkMsSUFBSSxXQUFqRCxjQUFKO0FBQ0EsY0FBSSxnQ0FBOEIsSUFBSSxRQUFsQyxTQUE4QyxJQUFJLFlBQWxELGNBQUo7O0FBR0EsZUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixTQUFyQixHQUFpQyxPQUFqQyxDQUF5QyxVQUFDLENBQUQsRUFBTztBQUM5QyxnQkFBSSxFQUFFLFNBQUYsS0FBZ0IsT0FBSyxTQUF6QixFQUFvQztBQUNsQyxrQkFBSSxRQUFRLEVBQUUsR0FBRixLQUFVLElBQVYsR0FBaUIsU0FBakIsR0FBNkIsVUFBekM7QUFDQSxrQkFBSSwyQkFBeUIsSUFBSSxVQUE3QiwwQkFBNEQsRUFBRSxFQUE5RCxjQUFKO0FBQ0EsdUJBQVMsT0FBTyxLQUFoQjtBQUNEO0FBQ0YsV0FORDs7QUFRQSxpQkFBTyxNQUFQO0FBQ0QsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtYXR0cmlidXRlcy1zb3J0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
