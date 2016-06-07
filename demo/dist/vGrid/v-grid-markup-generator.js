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

          this.getAttribute = function (value, capitalize) {
            if (value) {
              value = value.replace('rowRef.', '');
              value = value.replace('tempRef.', '');
              var newValue = "";
              var done = false;
              for (var x = 0; x < value.length; x++) {
                var letter = value.charAt(x);
                if (!done && letter !== " " && letter !== "&" && letter !== "|" && letter !== ":") {
                  newValue = newValue + letter;
                } else {
                  done = true;
                }
              }
              if (capitalize) {
                return newValue.charAt(0).toUpperCase() + newValue.slice(1);
              } else {
                return newValue;
              }
            } else {
              return "missing!";
            }
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
          this.processColumns(this.vGrid.vGridConfig.colConfig);
        };

        VGridMarkupGenerator.prototype.processColumns = function processColumns(array) {
          var _this = this;

          array.forEach(function (col, index) {
            if (!col.attribute && !col.rowTemplate) {
              throw new Error('attribute is not set on column', index);
            }

            _this.addToObserverArray(col.attribute);

            col.type = col.type || "text";
            col.filterTop = col.filterTop || false;
            col.header = col.header || _this.getAttribute(col.attribute, true);
            col.width = col.width || 100;
            col.css = col.css || '';

            if (col.type === "selection") {
              _this.vGrid.vGridConfig.attManualSelection = true;
              var dragDropClass = _this.vGrid.vGridConfig.attSortableHeader ? "vGrid-vGridDragHandle" : "";

              col.headerTemplate = '<input class="vgrid-row-checkbox-100 ' + dragDropClass + '" v-selection="header" type="checkbox">';
              col.rowTemplate = '<input class="vgrid-row-checkbox-100"  v-selection="row" type="checkbox" >';
            } else {
              if (!col.rowTemplate) {
                if (col.type === "image") {
                  _this.createImageRowMarkup(col);
                } else {
                  _this.createInputRowMarkup(col);
                }
              }

              if (!col.headerTemplate) {
                if (col.type === "image") {
                  var inputHeader = "";
                  var labelHeader = _this.createLabelMarkup(col);
                } else {
                  var inputHeader = _this.createInputHeaderMarkup(col);
                  var labelHeader = _this.createLabelMarkup(col);
                }
                if (col.filterTop) {
                  col.headerTemplate = inputHeader + labelHeader;
                } else {
                  col.headerTemplate = labelHeader + inputHeader;
                }
              }
            }
          });
        };

        VGridMarkupGenerator.prototype.addToObserverArray = function addToObserverArray(value) {
          var attAttributeObserve = this.vGrid.vGridConfig.attAttributeObserve;
          var attribute = this.getAttribute(value);

          if (attAttributeObserve.indexOf(attribute) === -1 && attribute) {
            attAttributeObserve.push(attribute);
          }
        };

        VGridMarkupGenerator.prototype.createImageRowMarkup = function createImageRowMarkup(col) {
          var classNames = 'class="vgrid-image-round"';
          var attributeRow = col.attributeRow ? col.attributeRow : '';
          var css = col.css ? 'css="' + col.css + '"' : '';

          col.rowTemplate = '<image ' + css + ' ' + classNames + ' v-image-fix ' + attributeRow + ' src.bind="' + col.attribute + '">';
        };

        VGridMarkupGenerator.prototype.createInputRowMarkup = function createInputRowMarkup(col) {
          var classNames = 'class="' + (col.type === "checkbox" ? 'vgrid-row-checkbox-100' : 'vgrid-row-input') + '"';

          var type = 'type="' + col.type + '"';

          var attributeRow = col.attributeRow ? col.attributeRow : '';

          var css = col.css ? 'css="' + col.css + '"' : '';

          if (col.type === "checkbox") {
            col.rowTemplate = '<input ' + css + ' ' + classNames + ' ' + type + ' ' + attributeRow + '  checked.bind="' + col.attribute + '">';
          } else {
            col.rowTemplate = '<input ' + css + ' ' + classNames + ' ' + type + ' ' + attributeRow + '  value.bind="' + col.attribute + '">';
          }
        };

        VGridMarkupGenerator.prototype.createInputHeaderMarkup = function createInputHeaderMarkup(col) {
          var markup = void 0;
          if (col.filter) {
            var type = 'type="' + col.type + '"';

            var filter = col.filter ? 'v-filter="' + col.filter + '"' : '';

            var attributeFilter = col.attributeFilter ? col.attributeFilter : '';

            var classNames = '';
            if (col.type === "checkbox") {
              classNames = 'class="' + (col.filterTop ? 'vgrid-row-checkbox-50' : 'vgrid-row-checkbox-50') + '"';
            } else {
              classNames = 'class="' + (col.filterTop ? 'vgrid-header-input-top' : 'vgrid-header-input-bottom') + '"';
            }

            markup = '<input ' + classNames + ' ' + attributeFilter + ' ' + type + ' ' + filter + '">';
          } else {
            markup = '';
          }

          return markup;
        };

        VGridMarkupGenerator.prototype.createLabelMarkup = function createLabelMarkup(col) {
          var filterClass = col.filter ? '' + (col.filterTop ? 'vgrid-label-bottom' : 'vgrid-label-top') : 'vgrid-label-full';

          var dragDropClass = this.vGrid.vGridConfig.attSortableHeader ? 'vGrid-vGridDragHandle' : '';

          var classname = 'class="' + dragDropClass + ' ' + filterClass + '"';

          var attributeLabel = col.attributeLabel ? col.attributeLabel : '';

          var sort = col.sort ? 'v-sort="' + col.sort + '"' : '';

          var markup = '<p ' + classname + ' ' + sort + ' ' + attributeLabel + '>' + col.header + '</p>';

          return markup;
        };

        return VGridMarkupGenerator;
      }());

      _export('VGridMarkupGenerator', VGridMarkupGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1tYXJrdXAtZ2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBTWEsb0I7QUFFWCxzQ0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFnR25CLFlBaEdtQixHQWdHSixVQUFVLEtBQVYsRUFBaUIsVUFBakIsRUFBNkI7QUFDMUMsZ0JBQUksS0FBSixFQUFXO0FBQ1Qsc0JBQVEsTUFBTSxPQUFOLENBQWMsU0FBZCxFQUF5QixFQUF6QixDQUFSO0FBQ0Esc0JBQVEsTUFBTSxPQUFOLENBQWMsVUFBZCxFQUEwQixFQUExQixDQUFSO0FBQ0Esa0JBQUksV0FBVyxFQUFmO0FBQ0Esa0JBQUksT0FBTyxLQUFYO0FBQ0EsbUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ3JDLG9CQUFJLFNBQVMsTUFBTSxNQUFOLENBQWEsQ0FBYixDQUFiO0FBQ0Esb0JBQUksQ0FBQyxJQUFELElBQVMsV0FBVyxHQUFwQixJQUEyQixXQUFXLEdBQXRDLElBQTZDLFdBQVcsR0FBeEQsSUFBK0QsV0FBVyxHQUE5RSxFQUFtRjtBQUNqRiw2QkFBVyxXQUFXLE1BQXRCO0FBQ0QsaUJBRkQsTUFFTztBQUNMLHlCQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0Qsa0JBQUksVUFBSixFQUFnQjtBQUNkLHVCQUFPLFNBQVMsTUFBVCxDQUFnQixDQUFoQixFQUFtQixXQUFuQixLQUFtQyxTQUFTLEtBQVQsQ0FBZSxDQUFmLENBQTFDO0FBQ0QsZUFGRCxNQUVPO0FBQ0wsdUJBQU8sUUFBUDtBQUNEO0FBRUYsYUFuQkQsTUFtQk87QUFDTCxxQkFBTyxVQUFQO0FBQ0Q7QUFDRixXQXZIa0I7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7dUNBR0QsUSx1QkFBVztBQUNULGNBQUksZUFBZSxFQUFuQjtBQUNBLGNBQUksT0FBTyxJQUFYOztBQUVBLGNBQUks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QUE1QixTQUFtQyxVQUFuQyxTQUFpRCxJQUFqRCxTQUF5RCxZQUF6RCxzQkFBc0YsSUFBSSxTQUExRjtBQUNEO0FBRUYsUzs7dUNBR0QsdUIsb0NBQXdCLEcsRUFBSztBQUczQixjQUFJLGVBQUo7QUFDQSxjQUFJLElBQUksTUFBUixFQUFnQjtBQUdkLGdCQUFJLGtCQUFnQixJQUFJLElBQXBCLE1BQUo7O0FBR0EsZ0JBQUksU0FBUyxJQUFJLE1BQUosa0JBQTBCLElBQUksTUFBOUIsU0FBMEMsRUFBdkQ7O0FBR0EsZ0JBQUksa0JBQWtCLElBQUksZUFBSixHQUFzQixJQUFJLGVBQTFCLEdBQTRDLEVBQWxFOztBQUdBLGdCQUFJLGFBQWEsRUFBakI7QUFDQSxnQkFBSSxJQUFJLElBQUosS0FBYSxVQUFqQixFQUE2QjtBQUMzQix3Q0FBdUIsSUFBSSxTQUFKLEdBQWdCLHVCQUFoQixHQUEwQyx1QkFBakU7QUFDRCxhQUZELE1BRU87QUFDTCx3Q0FBdUIsSUFBSSxTQUFKLEdBQWdCLHdCQUFoQixHQUEyQywyQkFBbEU7QUFDRDs7QUFHRCxpQ0FBbUIsVUFBbkIsU0FBaUMsZUFBakMsU0FBb0QsSUFBcEQsU0FBNEQsTUFBNUQ7QUFDRCxXQXJCRCxNQXFCTztBQUNMLHFCQUFTLEVBQVQ7QUFDRDs7QUFFRCxpQkFBTyxNQUFQO0FBRUQsUzs7dUNBR0QsaUIsOEJBQWtCLEcsRUFBSztBQUVyQixjQUFJLGNBQWMsSUFBSSxNQUFKLFNBQWdCLElBQUksU0FBSixHQUFnQixvQkFBaEIsR0FBdUMsaUJBQXZELElBQTZFLGtCQUEvRjs7QUFFQSxjQUFJLGdCQUFnQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGlCQUF2QixHQUEyQyx1QkFBM0MsR0FBcUUsRUFBekY7O0FBRUEsY0FBSSx3QkFBc0IsYUFBdEIsU0FBdUMsV0FBdkMsTUFBSjs7QUFFQSxjQUFJLGlCQUFpQixJQUFJLGNBQUosR0FBcUIsSUFBSSxjQUF6QixHQUEwQyxFQUEvRDs7QUFFQSxjQUFJLE9BQU8sSUFBSSxJQUFKLGdCQUFzQixJQUFJLElBQTFCLFNBQW9DLEVBQS9DOztBQUdBLGNBQUksaUJBQWUsU0FBZixTQUE0QixJQUE1QixTQUFvQyxjQUFwQyxTQUFzRCxJQUFJLE1BQTFELFNBQUo7O0FBRUEsaUJBQU8sTUFBUDtBQUNELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLW1hcmt1cC1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
