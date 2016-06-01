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
      this.addToObserverArray(col.attribute);


      //set default, some can be missing
      col.type = col.type || "text";
      col.filterOperator = col.filterOperator || "=";
      col.filterTop = col.filterTop || false;
      col.header = col.header || this.capitalize(col.attribute);
      col.width = col.width || 100;
      col.tempRef = col.tempRef || false;


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
        }else{
            var inputHeader = this.createInputHeaderMarkup(col);
            var labelHeader = this.createLabelMarkup(col);
        }
        if (col.filterTop) {
          col.headerTemplate = inputHeader + labelHeader;
        } else {
          col.headerTemplate = labelHeader + inputHeader;
        }
      }


    });
  }


  capitalize = function (value) {
    if(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      return "missing!";
    }
  };


  addToObserverArray(attribute){
    //get array
    var attAttributeObserve = this.vGrid.vGridConfig.attAttributeObserve;

    //if not allready added, then lets add them
    if(attAttributeObserve.indexOf(attribute) === -1 && attribute){
      attAttributeObserve.push(attribute);
    }

  }


  createImageRowMarkup(col){
    //get the values/settings
    let classNames = 'class="vgrid-image-round"';
    let contextmenu = col.contextmenuRow ? "v-header-menu=" + col.attribute + "" : "";
    let attribute = col.tempRef ? `tempRef.${col.attribute}`:`rowRef.${col.attribute}`;

    //insert the markup
    col.rowTemplate = `<image ${classNames} v-image-fix ${contextmenu} src.bind="${attribute}">`;

  }


  createInputRowMarkup(col){
    //get the values/settings
    let classNames = `class="${col.type === "checkbox" ? 'vgrid-row-checkbox-100' : 'vgrid-row-input'}"`;
    let type = `type="${col.type}"`;
    let colRef = col.tempRef ? `tempRef.${col.attribute}`:`rowRef.${col.attribute}`;
    let attribute = `${colRef}${col.valueFormater ? "|" + col.valueFormater +"& updateTrigger:'blur':'paste'" : ""}`;
    let contextmenu = col.contextmenuRow ? 'v-grid-row-menu="' + col.attribute+'""' : '';

    //is it a checkbox?
    if(col.type==="checkbox"){
      col.rowTemplate = `<input ${classNames} ${type} ${contextmenu}  checked.bind="${attribute}">`;
    } else {
      col.rowTemplate = `<input ${classNames} ${type} ${contextmenu}  value.bind="${attribute}">`;
    }

  }


  createInputHeaderMarkup(col){
    //get the values/settings
    let classNames = '';
    let contextmenu = col.contextmenuHeader ? "v-header-menu=" + col.attribute + "" : "";
    let type = `type="${col.type}"`;
    let colRef = col.tempRef ? `tempRef.${col.attribute}`:`"rowRef.${col.attribute}`;
    let attribute = `${colRef}${col.attribute}${col.valueFormater ? "|" + col.valueFormater : ''}`;
    let filter = `v-filter="${col.attribute}"`;

    //is it a checkbox ?
    if(col.type==="checkbox"){
      classNames = `class="${col.filterTop ? "vgrid-row-checkbox-50" : "vgrid-row-checkbox-50"}"`;
    } else {
      classNames = `class="${col.filterTop ? "vgrid-header-input-top" : "vgrid-header-input-bottom"}"`;
    }

    //is it filter ?
    let markup;
    if(col.filter){
      markup = `<input ${classNames} ${contextmenu} ${type} ${filter}">`;
    } else {
      markup = '';
    }
    //return the markup
    return markup;

  }


  createLabelMarkup(col){
    //get the values/settings
    let classname =  col.filter ? `class="${col.filterTop ? "vgrid-label-bottom" : "vgrid-label-top"}"`:'class="vgrid-label-full"';
    let sort = `${col.sort ? "v-sort=" + col.attribute : ""}`;
    let markup = `<p ${classname} ${sort}>${col.header}</p>`;
    //return the markup
    return markup;
  }



}
