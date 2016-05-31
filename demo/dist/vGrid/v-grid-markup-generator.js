'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var VGridMarkupGenerator;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('VGridMarkupGenerator', VGridMarkupGenerator = function () {
        function VGridMarkupGenerator(vGrid) {
          _classCallCheck(this, VGridMarkupGenerator);

          this.capitalize = function (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
          };

          this.vGrid = vGrid;
        }

        VGridMarkupGenerator.prototype.generate = function generate() {
          var columnsToUse = [];
          var type = null;

          if (this.vGrid.vGridColumns && this.vGrid.vGridColumns.length > 0) {
            columnsToUse = this.vGrid.vGridColumns;
            type = 'typeArray';
          }

          if (this.vGrid.vGridConfig.colConfig && this.vGrid.vGridConfig.colConfig.length > 0) {
            columnsToUse = this.colConfig;
            type = 'typeHtml';
          }

          if (!type) {
            throw new Error('column setup missing');
          }

          if (type === 'typeArray') {
            this.vGrid.vGridConfig.colConfig = this.vGrid.vGridColumns;
            this.vGrid.vGridConfig.columnLength = this.vGrid.vGridColumns.length;
          }
          this.generateMarkup(this.vGrid.vGridConfig.colConfig);
        };

        VGridMarkupGenerator.prototype.generateMarkup = function generateMarkup(array) {
          var _this = this;

          array.forEach(function (col, index) {
            if (!col.attribute && !col.rowTemplate) {
              throw new Error('attribute is not set on column', index);
            }

            if (_this.vGrid.vGridConfig.attAttributeObserve.indexOf(_this.attribute) === -1 && _this.attribute) {
              _this.vGrid.vGridConfig.attAttributeObserve.push(_this.attribute);
            }

            col.type = col.type || "text";
            col.filterOperator = col.filterOperator || "=";
            col.filterTop = col.filterTop || false;
            col.header = col.header || _this.capitalize(col.attribute);
            col.width = col.width || 100;

            if (!col.rowTemplate) {
              if (col.type !== "image") {
                col.rowTemplate = '\n            <input \n            type="' + col.type + '" \n            ' + (col.contextmenuRow ? "v-grid-row-menu=" + col.attribute : "") + ' \n            class="' + (col.type === "checkbox" ? "vgrid-checkbox-center" : "vgrid-row-input") + '" \n            value.bind="rowRef.' + col.attribute + (col.valueFormater ? " |" + col.valueFormater + "& updateTrigger:'blur':'paste'" : "") + '"\n            >';
              } else {
                col.rowTemplate = '\n            <image \n            class="vgrid-image-round" \n            v-image-fix \n            ' + (col.contextmenuRow ? "v-grid-row-menu=" + col.attribute : "") + ' \n            src.bind="rowRef.' + col.attribute + '"\n            >';
              }
            }

            if (!col.headerTemplate) {
              var headerTemplate = null;
              if (col.filter) {
                var inputHeader = '\n            <input \n              ' + (col.contextmenuRow ? "v-grid-header-menu=" + col.attribute + "" : "") + '\n              class="' + (col.filterTop ? "vgrid-header-input-top" : "vgrid-header-input-bottom") + '" \n              v-filter="' + col.attribute + '|' + col.filterOperator + (col.valueFormater ? " |" + col.valueFormater : "") + '"  \n              value.bind="rowRef.' + col.attribute + '"\n            >';

                var labelHeader = '\n            <p \n            class="' + (col.filterTop ? "vgrid-label-bottom" : "vgrid-label-top") + '"\n            ' + (col.sort ? "v-sort=" + col.attribute : "") + '\n            >\n            ' + col.header + '\n            </p>';
              } else {
                var inputHeader = "";
                var labelHeader = '\n            <p \n            class="vgrid-label-full"\n            ' + (col.sort ? "v-sort=" + col.attribute : "") + '\n            >\n            ' + col.header + '\n            </p>';
              }

              if (col.filterTop) {
                col.headerTemplate = inputHeader + labelHeader;
              } else {
                col.headerTemplate = labelHeader + inputHeader;
              }
            }
          });
        };

        return VGridMarkupGenerator;
      }());

      _export('VGridMarkupGenerator', VGridMarkupGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1tYXJrdXAtZ2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBV2Esb0I7QUFFWCxzQ0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFpQ25CLFVBakNtQixHQWlDTixVQUFVLEtBQVYsRUFBaUI7QUFDNUIsbUJBQU8sTUFBTSxNQUFOLENBQWEsQ0FBYixFQUFnQixXQUFoQixLQUFnQyxNQUFNLEtBQU4sQ0FBWSxDQUFaLENBQXZDO0FBQ0QsV0FuQ2tCOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O3VDQUdELFEsdUJBQVc7QUFDVCxjQUFJLGVBQWUsRUFBbkI7QUFDQSxjQUFJLE9BQU8sSUFBWDs7QUFFQSxjQUFJLEtBQUssS0FBTCxDQUFXLFlBQVgsSUFBMkIsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixNQUF4QixHQUFpQyxDQUFoRSxFQUFtRTtBQUNqRSwyQkFBZSxLQUFLLEtBQUwsQ0FBVyxZQUExQjtBQUNBLG1CQUFPLFdBQVA7QUFDRDs7QUFFRCxjQUFJLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsSUFBb0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUFpQyxNQUFqQyxHQUEwQyxDQUFsRixFQUFxRjtBQUNuRiwyQkFBZSxLQUFLLFNBQXBCO0FBQ0EsbUJBQU8sVUFBUDtBQUNEOztBQUVELGNBQUksQ0FBQyxJQUFMLEVBQVc7QUFDVCxrQkFBTSxJQUFJLEtBQUosQ0FBVSxzQkFBVixDQUFOO0FBQ0Q7O0FBRUQsY0FBSSxTQUFTLFdBQWIsRUFBMEI7QUFDeEIsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsR0FBbUMsS0FBSyxLQUFMLENBQVcsWUFBOUM7QUFDQSxpQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixZQUF2QixHQUFzQyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLE1BQTlEO0FBQ0Q7QUFDRCxlQUFLLGNBQUwsQ0FBb0IsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUEzQztBQUdELFM7O3VDQVFELGMsMkJBQWUsSyxFQUFPO0FBQUE7O0FBR3BCLGdCQUFNLE9BQU4sQ0FBYyxVQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWU7QUFDM0IsZ0JBQUksQ0FBQyxJQUFJLFNBQUwsSUFBa0IsQ0FBQyxJQUFJLFdBQTNCLEVBQXdDO0FBQ3RDLG9CQUFNLElBQUksS0FBSixDQUFVLGdDQUFWLEVBQTRDLEtBQTVDLENBQU47QUFDRDs7QUFHRCxnQkFBRyxNQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLG1CQUF2QixDQUEyQyxPQUEzQyxDQUFtRCxNQUFLLFNBQXhELE1BQXVFLENBQUMsQ0FBeEUsSUFBNkUsTUFBSyxTQUFyRixFQUErRjtBQUM3RixvQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixtQkFBdkIsQ0FBMkMsSUFBM0MsQ0FBZ0QsTUFBSyxTQUFyRDtBQUNEOztBQUVELGdCQUFJLElBQUosR0FBVyxJQUFJLElBQUosSUFBWSxNQUF2QjtBQUNBLGdCQUFJLGNBQUosR0FBcUIsSUFBSSxjQUFKLElBQXNCLEdBQTNDO0FBQ0EsZ0JBQUksU0FBSixHQUFnQixJQUFJLFNBQUosSUFBaUIsS0FBakM7QUFDQSxnQkFBSSxNQUFKLEdBQWEsSUFBSSxNQUFKLElBQWMsTUFBSyxVQUFMLENBQWdCLElBQUksU0FBcEIsQ0FBM0I7QUFDQSxnQkFBSSxLQUFKLEdBQVksSUFBSSxLQUFKLElBQWEsR0FBekI7O0FBRUEsZ0JBQUksQ0FBQyxJQUFJLFdBQVQsRUFBc0I7QUFDcEIsa0JBQUksSUFBSSxJQUFKLEtBQWEsT0FBakIsRUFBMEI7QUFDeEIsb0JBQUksV0FBSixpREFFVSxJQUFJLElBRmQseUJBR0ksSUFBSSxjQUFKLEdBQXFCLHFCQUFxQixJQUFJLFNBQTlDLEdBQTBELEVBSDlELGdDQUlXLElBQUksSUFBSixLQUFhLFVBQWIsR0FBMEIsdUJBQTFCLEdBQW9ELGlCQUovRCw0Q0FLdUIsSUFBSSxTQUwzQixJQUt1QyxJQUFJLGFBQUosR0FBb0IsT0FBTyxJQUFJLGFBQVgsR0FBMEIsZ0NBQTlDLEdBQWlGLEVBTHhIO0FBT0QsZUFSRCxNQVFPO0FBQ0wsb0JBQUksV0FBSiw4R0FJSSxJQUFJLGNBQUosR0FBcUIscUJBQXFCLElBQUksU0FBOUMsR0FBMEQsRUFKOUQseUNBS3FCLElBQUksU0FMekI7QUFPRDtBQUNGOztBQUVELGdCQUFJLENBQUMsSUFBSSxjQUFULEVBQXlCO0FBQ3ZCLGtCQUFJLGlCQUFpQixJQUFyQjtBQUNBLGtCQUFJLElBQUksTUFBUixFQUFnQjtBQUNkLG9CQUFJLHlEQUVFLElBQUksY0FBSixHQUFxQix3QkFBd0IsSUFBSSxTQUE1QixHQUF3QyxFQUE3RCxHQUFrRSxFQUZwRSxpQ0FHUyxJQUFJLFNBQUosR0FBZ0Isd0JBQWhCLEdBQTJDLDJCQUhwRCxxQ0FJWSxJQUFJLFNBSmhCLFNBSTZCLElBQUksY0FKakMsSUFJa0QsSUFBSSxhQUFKLEdBQW9CLE9BQU8sSUFBSSxhQUEvQixHQUErQyxFQUpqRywrQ0FLcUIsSUFBSSxTQUx6QixxQkFBSjs7QUFRQSxvQkFBSSwwREFFTyxJQUFJLFNBQUosR0FBZ0Isb0JBQWhCLEdBQXVDLGlCQUY5Qyx5QkFHQSxJQUFJLElBQUosR0FBVyxZQUFZLElBQUksU0FBM0IsR0FBdUMsRUFIdkMsc0NBS0EsSUFBSSxNQUxKLHVCQUFKO0FBT0QsZUFoQkQsTUFnQk07QUFDSixvQkFBSSxjQUFjLEVBQWxCO0FBQ0Esb0JBQUkseUZBR0EsSUFBSSxJQUFKLEdBQVcsWUFBWSxJQUFJLFNBQTNCLEdBQXVDLEVBSHZDLHNDQUtBLElBQUksTUFMSix1QkFBSjtBQU9EOztBQUVELGtCQUFJLElBQUksU0FBUixFQUFtQjtBQUNqQixvQkFBSSxjQUFKLEdBQXFCLGNBQWMsV0FBbkM7QUFDRCxlQUZELE1BRU87QUFDTCxvQkFBSSxjQUFKLEdBQXFCLGNBQWMsV0FBbkM7QUFDRDtBQUdGO0FBR0YsV0EzRUQ7QUE0RUQsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtbWFya3VwLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
