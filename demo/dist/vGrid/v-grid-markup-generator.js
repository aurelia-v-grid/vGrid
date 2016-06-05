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

          var valueFormater = col.valueFormater ? "|" + col.valueFormater + "& updateTrigger:'blur':'paste'" : "";

          var attribute = '' + colRef + valueFormater;

          var contextmenu = col.contextmenuRow ? 'v-row-menu="' + col.attribute + '""' : '';

          var css = col.css ? 'css="' + col.css + '"' : '';

          if (col.type === "checkbox") {
            col.rowTemplate = '<input ' + css + ' ' + classNames + ' ' + type + ' ' + contextmenu + '  checked.bind="' + attribute + '">';
          } else {
            col.rowTemplate = '<input ' + css + ' ' + classNames + ' ' + type + ' ' + contextmenu + '  value.bind="' + attribute + '">';
          }
        };

        VGridMarkupGenerator.prototype.createInputHeaderMarkup = function createInputHeaderMarkup(col) {
          var contextmenu = col.contextmenuHeader ? 'v-header-menu="' + col.attribute + '"' : '';

          var type = 'type="' + col.type + '"';

          var valueFormater = col.valueFormater ? '|' + col.valueFormater : '';
          var filterOperater = col.filterOperator ? '|' + col.filterOperator : '';
          var filter = 'v-filter="' + col.attribute + valueFormater + filterOperater + '"';

          var classNames = '';
          if (col.type === "checkbox") {
            classNames = 'class="' + (col.filterTop ? 'vgrid-row-checkbox-50' : 'vgrid-row-checkbox-50') + '"';
          } else {
            classNames = 'class="' + (col.filterTop ? 'vgrid-header-input-top' : 'vgrid-header-input-bottom') + '"';
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
          var filterClass = col.filter ? '' + (col.filterTop ? 'vgrid-label-bottom' : 'vgrid-label-top') : 'vgrid-label-full';
          var dragDropClass = this.vGrid.vGridConfig.attSortableHeader ? 'vGrid-vGridDragHandle' : '';
          var classname = 'class="' + dragDropClass + ' ' + filterClass + '"';
          var sort = '' + (col.sort ? "v-sort=" + col.attribute : '');
          var markup = '<p ' + classname + ' ' + sort + '>' + col.header + '</p>';

          return markup;
        };

        return VGridMarkupGenerator;
      }());

      _export('VGridMarkupGenerator', VGridMarkupGenerator);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1tYXJrdXAtZ2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBTWEsb0I7QUFFWCxzQ0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZUFrR25CLFVBbEdtQixHQWtHTixVQUFVLEtBQVYsRUFBaUI7QUFDNUIsZ0JBQUksS0FBSixFQUFXO0FBQ1QscUJBQU8sTUFBTSxNQUFOLENBQWEsQ0FBYixFQUFnQixXQUFoQixLQUFnQyxNQUFNLEtBQU4sQ0FBWSxDQUFaLENBQXZDO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sVUFBUDtBQUNEO0FBQ0YsV0F4R2tCOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O3VDQUdELFEsdUJBQVc7QUFDVCxjQUFJLGVBQWUsRUFBbkI7QUFDQSxjQUFJLE9BQU8sSUFBWDs7QUFFQSxjQUFJLEtBQUssS0FBTCxDQUFXLFlBQVgsSUFBMkIsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixNQUF4QixHQUFpQyxDQUFoRSxFQUFtRTtBQUNqRSwyQkFBZSxLQUFLLEtBQUwsQ0FBVyxZQUExQjtBQUNBLG1CQUFPLFdBQVA7QUFDRDs7QUFFRCxjQUFJLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsSUFBb0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUFpQyxNQUFqQyxHQUEwQyxDQUFsRixFQUFxRjtBQUNuRiwyQkFBZSxLQUFLLFNBQXBCO0FBQ0EsbUJBQU8sVUFBUDtBQUNEOztBQUVELGNBQUksQ0FBQyxJQUFMLEVBQVc7QUFDVCxrQkFBTSxJQUFJLEtBQUosQ0FBVSxzQkFBVixDQUFOO0FBQ0Q7O0FBRUQsY0FBSSxTQUFTLFdBQWIsRUFBMEI7QUFDeEIsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsR0FBbUMsS0FBSyxLQUFMLENBQVcsWUFBOUM7QUFDQSxpQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixZ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
