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
            if (value) {
              return value.charAt(0).toUpperCase() + value.slice(1);
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
            col.filterOperator = col.filterOperator || "=";
            col.filterTop = col.filterTop || false;
            col.header = col.header || _this.capitalize(col.attribute);
            col.width = col.width || 100;
            col.tempRef = col.tempRef || false;
            col.css = col.css || '';

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
          });
        };

        VGridMarkupGenerator.prototype.addToObserverArray = function addToObserverArray(attribute) {
          var attAttributeObserve = this.vGrid.vGridConfig.attAttributeObserve;

          if (attAttributeObserve.indexOf(attribute) === -1 && attribute) {
            attAttributeObserve.push(attribute);
          }
        };

        VGridMarkupGenerator.prototype.createImageRowMarkup = function createImageRowMarkup(col) {
          var classNames = 'class="vgrid-image-round"';
          var contextmenu = col.contextmenuRow ? "v-header-menu=" + col.attribute + "" : "";
          var attribute = col.tempRef ? 'tempRef.' + col.attribute : 'rowRef.' + col.attribute;
          var css = col.css ? 'css="' + col.css + '"' : '';

          col.rowTemplate = '<image ' + css + ' ' + classNames + ' v-image-fix ' + contextmenu + ' src.bind="' + attribute + '">';
        };

        VGridMarkupGenerator.prototype.createInputRowMarkup = function createInputRowMarkup(col) {
          var classNames = 'class="' + (col.type === "checkbox" ? 'vgrid-row-checkbox-100' : 'vgrid-row-input') + '"';
          var type = 'type="' + col.type + '"';
          var colRef = col.tempRef ? 'tempRef.' + col.attribute : 'rowRef.' + col.attribute;
          var attribute = '' + colRef + (col.valueFormater ? "|" + col.valueFormater + "& updateTrigger:'blur':'paste'" : "");
          var contextmenu = col.contextmenuRow ? 'v-grid-row-menu="' + col.attribute + '""' : '';
          var css = col.css ? 'css="' + col.css + '"' : '';

          if (col.type === "checkbox") {
            col.rowTemplate = '<input ' + css + ' ' + classNames + ' ' + type + ' ' + contextmenu + '  checked.bind="' + attribute + '">';
          } else {
            col.rowTemplate = '<input ' + css + ' ' + classNames + ' ' + type + ' ' + contextmenu + '  value.bind="' + attribute + '">';
          }
        };

        VGridMarkupGenerator.prototype.createInputHeaderMarkup = function createInputHeaderMarkup(col) {
          var classNames = '';
          var contextmenu = col.contextmenuHeader ? "v-header-menu=" + col.attribute + "" : "";
          var type = 'type="' + col.type + '"';
          var colRef = col.tempRef ? 'tempRef.' + col.attribute : '"rowRef.' + col.attribute;
          var attribute = '' + colRef + col.attribute + (col.valueFormater ? "|" + col.valueFormater : '');
          var filter = 'v-filter="' + col.attribute + '"';

          if (col.type === "checkbox") {
            classNames = 'class="' + (col.filterTop ? "vgrid-row-checkbox-50" : "vgrid-row-checkbox-50") + '"';
          } else {
            classNames = 'class="' + (col.filterTop ? "vgrid-header-input-top" : "vgrid-header-input-bottom") + '"';
          }

          var markup = void 0;
          if (col.filter) {
            markup = '<input ' + classNames + ' ' + contextmenu + ' ' + type + ' ' + filter + '">';
          } else {
            markup = '';
          }

          return markup;
        };

        VGridMarkupGenerator.prototype.createLabelMarkup = function createLabelMarkup(col) {
          var classname = col.filter ? 'class="' + (col.filterTop ? "vgrid-label-bottom" : "vgrid-label-top") + '"' : 'class="vgrid-label-full"';
          var sort = '' + (col.sort ? "v-sort=" + col.attribute : "");
          var markup = '<p ' + classname + ' ' + sort + '>' + col.header + '</p>';

          return markup;
        };

        return VGridMarkupGenerator;
      }());

      _export('VGridMarkupGenerator', VGridMarkupGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1tYXJrdXAtZ2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBTWEsb0I7QUFFWCxzQ0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUF3Rm5CLFVBeEZtQixHQXdGTixVQUFVLEtBQVYsRUFBaUI7QUFDNUIsZ0JBQUksS0FBSixFQUFXO0FBQ1QscUJBQU8sTUFBTSxNQUFOLENBQWEsQ0FBYixFQUFnQixXQUFoQixLQUFnQyxNQUFNLEtBQU4sQ0FBWSxDQUFaLENBQXZDO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sVUFBUDtBQUNEO0FBQ0YsV0E5RmtCOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O3VDQUdELFEsdUJBQVc7QUFDVCxjQUFJLGVBQWUsRUFBbkI7QUFDQSxjQUFJLE9BQU8sSUFBWDs7QUFFQSxjQUFJLEtBQUssS0FBTCxDQUFXLFlBQVgsSUFBMkIsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixNQUF4QixHQUFpQyxDQUFoRSxFQUFtRTtBQUNqRSwyQkFBZSxLQUFLLEtBQUwsQ0FBVyxZQUExQjtBQUNBLG1CQUFPLFdBQVA7QUFDRDs7QUFFRCxjQUFJLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsSUFBb0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUFpQyxNQUFqQyxHQUEwQyxDQUFsRixFQUFxRjtBQUNuRiwyQkFBZSxLQUFLLFNBQXBCO0FBQ0EsbUJBQU8sVUFBUDtBQUNEOztBQUVELGNBQUksQ0FBQyxJQUFMLEVBQVc7QUFDVCxrQkFBTSxJQUFJLEtBQUosQ0FBVSxzQkFBVixDQUFOO0FBQ0Q7O0FBRUQsY0FBSSxTQUFTLFdBQWIsRUFBMEI7QUFDeEIsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsR0FBbUMsS0FBSyxLQUFMLENBQVcsWUFBOUM7QUFDQSxpQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixZ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Q0FBdUIsSUFBSSxTQUFKLEdBQWdCLHVCQUFoQixHQUEwQyx1QkFBakU7QUFDRCxXQUZELE1BRU87QUFDTCxzQ0FBdUIsSUFBSSxTQUFKLEdBQWdCLHdCQUFoQixHQUEyQywyQkFBbEU7QUFDRDs7QUFHRCxjQUFJLGVBQUo7QUFDQSxjQUFJLElBQUksTUFBUixFQUFnQjtBQUNkLGlDQUFtQixVQUFuQixTQUFpQyxXQUFqQyxTQUFnRCxJQUFoRCxTQUF3RCxNQUF4RDtBQUNELFdBRkQsTUFFTztBQUNMLHFCQUFTLEVBQVQ7QUFDRDs7QUFFRCxpQkFBTyxNQUFQO0FBRUQsUzs7dUNBR0QsaUIsOEJBQWtCLEcsRUFBSztBQUVyQixjQUFJLFlBQVksSUFBSSxNQUFKLGdCQUF1QixJQUFJLFNBQUosR0FBZ0Isb0JBQWhCLEdBQXVDLGlCQUE5RCxVQUFxRiwwQkFBckc7QUFDQSxjQUFJLGFBQVUsSUFBSSxJQUFKLEdBQVcsWUFBWSxJQUFJLFNBQTNCLEdBQXVDLEVBQWpELENBQUo7QUFDQSxjQUFJLGlCQUFlLFNBQWYsU0FBNEIsSUFBNUIsU0FBb0MsSUFBSSxNQUF4QyxTQUFKOztBQUVBLGlCQUFPLE1BQVA7QUFDRCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1tYXJrdXAtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
