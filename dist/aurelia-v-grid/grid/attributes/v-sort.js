'use strict';

System.register(['aurelia-framework', '../v-grid'], function (_export, _context) {
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

          this.sortIcon = document.createElement("i");
          this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
          this.element.appendChild(this.sortIcon);
          this.element.onmousedown = function (e) {
            _this.element.onmouseup = function (e) {
              if (e.button === 0) {
                _this.vGrid.attGridConnector.orderBy(_this.attribute, e.shiftKey);
              }
            };
            setTimeout(function () {
              _this.element.onmouseup = null;
            }, 300);
          };

          this.vGrid.element.addEventListener("sortIconUpdate", function () {
            _this.sortIcon.innerHTML = _this.getSortIconMarkup(_this.attribute);
          });
        };

        vGridAttributesSort.prototype.detached = function detached() {
          this.element.removeChild(this.sortIcon);
        };

        vGridAttributesSort.prototype.getSortIconMarkup = function getSortIconMarkup(attribute) {
          var _this2 = this;

          var markup = '&nbsp;<i  class="' + "avg-fa avg-fa-sort" + '"></i>';
          var isAscHtml = '&nbsp;<i  class="' + "avg-fa avg-fa-sort-asc" + '"></i>';
          var isDescHtml = '&nbsp;<i  class="' + "avg-fa avg-fa-sort-desc" + '"></i>';

          var sortNo = this.vGrid.attGridConnector.getCurrentOrderBy();
          this.vGrid.attGridConnector.getCurrentOrderBy().forEach(function (x) {
            if (x.attribute === _this2.attribute) {
              var block = x.asc === true ? isAscHtml : isDescHtml;
              var main = '<i class="' + "avg-fa-sort-number" + '" data-vgridsort="' + x.no + '"></i>';
              markup = block + main;
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
//# sourceMappingURL=v-sort.js.map
