/* */ 
define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridMarkupGenerator = exports.VGridMarkupGenerator = function () {
    function VGridMarkupGenerator(vGrid) {
      _classCallCheck(this, VGridMarkupGenerator);

      this.getAttribute = function (value, capitalize) {

        var returnValue = value || "missing!";

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
            returnValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
          } else {
            returnValue = newValue;
          }
        }

        return returnValue;
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
        if (!col.colField && !col.colRowTemplate) {
          if (col.colType !== "selection") {
            throw new Error('colField is not set on column', index);
          }
        }

        col.colType = col.colType || "text";
        col.colFilterTop = col.colFilterTop || false;
        col.colHeaderName = col.colHeaderName || _this.getAttribute(col.colField, true);
        col.colWidth = col.colWidth || 100;
        col.colCss = col.colCss || '';
        col.colField = _this.checkAttribute(col.colField);

        _this.createHeaderTemplate(col);
        _this.createRowTemplate(col);
      });
    };

    VGridMarkupGenerator.prototype.createHeaderTemplate = function createHeaderTemplate(col) {
      if (!col.colHeaderTemplate) {
        var inputHeader = void 0;
        var labelHeader = void 0;
        switch (col.colType) {

          case "selection":
            this.vGrid.vGridConfig.attManualSelection = true;

            labelHeader = '';
            inputHeader = '<input class="vgrid-row-checkbox-100" v-selection="header" type="checkbox">';
            break;

          case "image":
            inputHeader = '<p class="vgrid-label-top"></p>';
            if (!col.colFilterTop) {
              col.colFilter = "x";
            }
            labelHeader = this.createLabelMarkup(col);
            break;

          default:
            inputHeader = this.createInputHeaderMarkup(col);
            labelHeader = this.createLabelMarkup(col);
            break;

        }

        if (col.colFilterTop) {
          col.colHeaderTemplate = inputHeader + labelHeader;
        } else {
          col.colHeaderTemplate = labelHeader + inputHeader;
        }
      }
    };

    VGridMarkupGenerator.prototype.createRowTemplate = function createRowTemplate(col) {
      if (!col.colRowTemplate) {

        switch (col.colType) {

          case "selection":
            this.vGrid.vGridConfig.attManualSelection = true;

            col.colRowTemplate = '<input v-key-move class="vgrid-row-checkbox-100"  v-selection="row" type="checkbox" >';
            break;

          case "image":
            this.createImageRowMarkup(col);
            break;

          default:
            this.createInputRowMarkup(col);
            break;

        }
      }
    };

    VGridMarkupGenerator.prototype.checkAttribute = function checkAttribute(attribute) {
      var value = attribute;
      if (attribute) {
        if (attribute.indexOf("rowRef") === -1 && attribute.indexOf("tempRef") === -1) {
          value = "rowRef." + attribute;
        }
      }
      return value;
    };

    VGridMarkupGenerator.prototype.createImageRowMarkup = function createImageRowMarkup(col) {
      var classNames = 'class="vgrid-image-round"';
      var attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
      var css = col.colCss ? 'css="' + col.colCss + '"' : '';

      col.colRowTemplate = '<image ' + css + ' ' + classNames + ' v-image-fix ' + attributeRow + ' src.bind="' + col.colField + '">';
    };

    VGridMarkupGenerator.prototype.createInputRowMarkup = function createInputRowMarkup(col) {
      var colClass = 'class="' + (col.colType === "checkbox" ? 'vgrid-row-checkbox-100' : 'vgrid-row-input') + '"';

      var colType = 'type="' + col.colType + '"';

      var colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';

      var colCss = col.colCss ? 'css="' + col.colCss + '"' : '';

      var attributeObserver = 'v-observe-field="' + this.getAttribute(col.colField) + '"';

      if (col.colType === "checkbox") {
        col.colRowTemplate = '<input ' + attributeObserver + ' ' + colCss + ' ' + colClass + ' ' + colType + ' ' + colAddRowAttributes + '  checked.bind="' + col.colField + '">';
      } else {
        col.colRowTemplate = '<input ' + attributeObserver + ' ' + colCss + ' ' + colClass + ' ' + colType + ' ' + colAddRowAttributes + '  value.bind="' + col.colField + '">';
      }
    };

    VGridMarkupGenerator.prototype.createInputHeaderMarkup = function createInputHeaderMarkup(col) {
      var markup = void 0;
      if (col.colFilter) {
        var type = 'type="' + col.colType + '"';

        var filter = col.colFilter ? 'v-filter="' + col.colFilter + '"' : '';

        var colAddFilterAttributes = col.colAddFilterAttributes ? col.colAddFilterAttributes : '';

        var classNames = '';
        if (col.colType === "checkbox") {
          classNames = 'class="' + (col.colFilterTop ? 'vgrid-row-checkbox-50' : 'vgrid-row-checkbox-50') + '"';
        } else {
          classNames = 'class="' + (col.colFilterTop ? 'vgrid-header-input-top' : 'vgrid-header-input-bottom') + '"';
        }

        markup = '<input  ' + classNames + ' ' + colAddFilterAttributes + ' ' + type + ' ' + filter + '">';
      } else {
        markup = '';
      }

      return markup;
    };

    VGridMarkupGenerator.prototype.createLabelMarkup = function createLabelMarkup(col) {
      var filterClass = col.colFilter ? '' + (col.colFilterTop ? 'vgrid-label-bottom' : 'vgrid-label-top') : 'vgrid-label-full';

      var dragDropClass = this.vGrid.vGridConfig.attSortableHeader ? 'vGrid-vGridDragHandle' : '';

      var classname = 'class="' + dragDropClass + ' ' + filterClass + '"';

      var colAddLabelAttributes = col.colAddLabelAttributes ? col.colAddLabelAttributes : '';

      var sort = col.colSort ? 'v-sort="' + col.colSort + '"' : '';

      var markup = '<p v-drag-drop-col v-resize-col ' + classname + ' ' + sort + ' ' + colAddLabelAttributes + '>' + col.colHeaderName + '</p>';

      return markup;
    };

    return VGridMarkupGenerator;
  }();
});