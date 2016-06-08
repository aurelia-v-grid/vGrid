/*****************************************************************************************************************
 *    VGridMarkupGenerator
 *    This generates all htmlstring needed for row/headers templates when needed
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridMarkupGenerator {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }


  generate() {
    let columnsToUse = [];
    let type = null;

    if (this.vGrid.vGridColumns && this.vGrid.vGridColumns.length > 0) {
      columnsToUse = this.vGrid.vGridColumns;
      type = 'typeArray'
    }

    if (this.vGrid.vGridConfig.colConfig && this.vGrid.vGridConfig.colConfig.length > 0) {
      columnsToUse = this.colConfig;
      type = 'typeHtml'
    }

    if (!type) {
      throw new Error('column setup missing');
    }

    if (type === 'typeArray') {
      this.vGrid.vGridConfig.colConfig = this.vGrid.vGridColumns;
      this.vGrid.vGridConfig.columnLength = this.vGrid.vGridColumns.length;
    }
    this.processColumns(this.vGrid.vGridConfig.colConfig);


  }


  processColumns(array) {


    array.forEach((col, index)=> {

      //we need attribute or rowtemplate, else throm error
      if (!col.attribute && !col.rowTemplate) {
        throw new Error('attribute is not set on column', index);
      }


      //we want by default to observe attributes if we can
      this.addToObserverArray(this.getAttribute(col.attribute, false));


      //set default, some can be missing
      col.type = col.type || "text";
      col.filterTop = col.filterTop || false;
      col.header = col.header || this.getAttribute(col.attribute, true);
      col.width = col.width || 100;
      col.css = col.css || '';
      col.attribute = this.checkAttribute(col.attribute);

      //if selection type
      if (col.type === "selection") {
        //override to manual selection
        this.vGrid.vGridConfig.attManualSelection = true;
        let dragDropClass = this.vGrid.vGridConfig.attSortableHeader ? "vGrid-vGridDragHandle" : "";
        //set template
        col.headerTemplate = `<input class="vgrid-row-checkbox-100 ${dragDropClass}" v-selection="header" type="checkbox">`;
        col.rowTemplate = `<input class="vgrid-row-checkbox-100"  v-selection="row" type="checkbox" >`;

      } else {

        //does a rowTemplate exist, if not we create one, else we skip it
        if (!col.rowTemplate) {
          if (col.type === "image") {
            this.createImageRowMarkup(col);
          } else {
            this.createInputRowMarkup(col);
          }
        }

        if (!col.headerTemplate) {
          if (col.type === "image") {
            var inputHeader = "";
            var labelHeader = this.createLabelMarkup(col);
          } else {
            var inputHeader = this.createInputHeaderMarkup(col);
            var labelHeader = this.createLabelMarkup(col);
          }
          if (col.filterTop) {
            col.headerTemplate = inputHeader + labelHeader;
          } else {
            col.headerTemplate = labelHeader + inputHeader;
          }
        }
      }


    });
  }

  //simple way to get get attribute, this can prb be done better...
  getAttribute = function (value, capitalize) {
    if (value) {
      value = value.replace('rowRef.', '');
      value = value.replace('tempRef.', '');
      let newValue = "";
      let done = false;
      for (var x = 0; x < value.length; x++) {
        let letter = value.charAt(x);
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


  checkAttribute(attribute){
    //not the best way... temp fix so they dont haveto write rowRef...
    if(attribute){
      if(attribute.indexOf("rowRef") === -1 && attribute.indexOf("tempRef") === -1){
          return "rowRef."+attribute;
      } else {
        return attribute;
      }
    } else {
      return attribute;
    }

  }


  addToObserverArray(value) {
    //get array
    var attAttributeObserve = this.vGrid.vGridConfig.attAttributeObserve;
    let attribute = this.getAttribute(value);
    //if not allready added, then lets add them
    if (attAttributeObserve.indexOf(attribute) === -1 && attribute) {
      attAttributeObserve.push(attribute);
    }

  }


  createImageRowMarkup(col) {
    //get the values/settings
    let classNames = 'class="vgrid-image-round"';
    let attributeRow = col.attributeRow ? col.attributeRow : '';
    let css = col.css ? `css="${col.css}"` : '';

    //insert the markup
    col.rowTemplate = `<image ${css} ${classNames} v-image-fix ${attributeRow} src.bind="${col.attribute}">`;

  }


  createInputRowMarkup(col) {
    //get the values/settings
    let classNames = `class="${col.type === "checkbox" ? 'vgrid-row-checkbox-100' : 'vgrid-row-input'}"`;

    //type
    let type = `type="${col.type}"`;


    //get attributes row
    let attributeRow = col.attributeRow ? col.attributeRow : '';

    //get css
    let css = col.css ? `css="${col.css}"` : '';

    //is it a checkbox?
    //todo: adding the update part without choice, maybe param for that?
    if (col.type === "checkbox") {
      col.rowTemplate = `<input v-update-current-entity-on="click" ${css} ${classNames} ${type} ${attributeRow}  checked.bind="${col.attribute}">`;
    } else {
      col.rowTemplate = `<input v-update-current-entity-on="keydown" ${css} ${classNames} ${type} ${attributeRow}  value.bind="${col.attribute}">`;
    }

  }


  createInputHeaderMarkup(col) {

    //is it filter ?
    let markup;
    if (col.filter) {

      //type
      let type = `type="${col.type}"`;

      //filter
      let filter = col.filter ? `v-filter="${col.filter}"` : '';

      //get attributes label
      let attributeFilter = col.attributeFilter ? col.attributeFilter : '';

      //is it a checkbox ?
      let classNames = '';
      if (col.type === "checkbox") {
        classNames = `class="${col.filterTop ? 'vgrid-row-checkbox-50' : 'vgrid-row-checkbox-50'}"`;
      } else {
        classNames = `class="${col.filterTop ? 'vgrid-header-input-top' : 'vgrid-header-input-bottom'}"`;
      }

      //apply magic
      markup = `<input  ${classNames} ${attributeFilter} ${type} ${filter}">`;
    } else {
      markup = '';
    }
    //return the markup
    return markup;

  }


  createLabelMarkup(col) {
    //get the values/settings
    let filterClass = col.filter ? `${col.filterTop ? 'vgrid-label-bottom' : 'vgrid-label-top'}` : 'vgrid-label-full';
    
    let dragDropClass = this.vGrid.vGridConfig.attSortableHeader ? 'vGrid-vGridDragHandle' : '';

    let classname = `class="${dragDropClass} ${filterClass}"`;

    let attributeLabel = col.attributeLabel ? col.attributeLabel : '';

    let sort = col.sort ? `v-sort="${col.sort}"` : '';

    //apply magic
    //todo, atm Im adding resize columns and dragdrop columns, should this be a choice?
    let markup = `<p v-drag-drop-col v-resize-col ${classname} ${sort} ${attributeLabel}>${col.header}</p>`;
    //return the markup
    return markup;
  }


}
