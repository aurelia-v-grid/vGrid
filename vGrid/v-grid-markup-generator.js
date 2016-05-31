/*****************************************************************************************************************
 *    VGridMarkupGenerator
 *    This generates all htmlstring needed for row/headers templates when needed
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/


  //have just started looking at this, just to see how it works.


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
    this.generateMarkup(this.vGrid.vGridConfig.colConfig);


  }

  capitalize = function (value) {
    if(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      return "missing!"
    }
  };


  generateMarkup(array) {


    array.forEach((col, index)=> {
      if (!col.attribute && !col.rowTemplate) {
        throw new Error('attribute is not set on column', index);
      }


      if(this.vGrid.vGridConfig.attAttributeObserve.indexOf(this.attribute) === -1 && this.attribute){
        this.vGrid.vGridConfig.attAttributeObserve.push(this.attribute);
      }

      col.type = col.type || "text";
      col.filterOperator = col.filterOperator || "=";
      col.filterTop = col.filterTop || false;
      col.header = col.header || this.capitalize(col.attribute);
      col.width = col.width || 100;

      if (!col.rowTemplate) {
        if (col.type !== "image") {
          col.rowTemplate = `
            <input 
            type="${col.type}" 
            ${col.contextmenuRow ? "v-grid-row-menu=" + col.attribute : ""} 
            class="${col.type === "checkbox" ? "vgrid-checkbox-center" : "vgrid-row-input"}" 
            value.bind="rowRef.${col.attribute}${col.valueFormater ? " |" + col.valueFormater +"& updateTrigger:'blur':'paste'" : ""}"
            >`
        } else {
          col.rowTemplate = `
            <image 
            class="vgrid-image-round" 
            v-image-fix 
            ${col.contextmenuRow ? "v-grid-row-menu=" + col.attribute : ""} 
            src.bind="rowRef.${col.attribute}"
            >`
        }
      }

      if (!col.headerTemplate) {
        let headerTemplate = null;
        if (col.filter) {
          var inputHeader = `
            <input 
              ${col.contextmenuRow ? "v-grid-header-menu=" + col.attribute + "" : ""}
              class="${col.filterTop ? "vgrid-header-input-top" : "vgrid-header-input-bottom"}" 
              v-filter="${col.attribute}|${col.filterOperator}${col.valueFormater ? " |" + col.valueFormater : ""}"  
              value.bind="rowRef.${col.attribute}"
            >`;

          var labelHeader = `
            <p 
            class="${col.filterTop ? "vgrid-label-bottom" : "vgrid-label-top"}"
            ${col.sort ? "v-sort=" + col.attribute : ""}
            >
            ${col.header}
            </p>`
        } else{
          var inputHeader = "";
          var labelHeader = `
            <p 
            class="vgrid-label-full"
            ${col.sort ? "v-sort=" + col.attribute : ""}
            >
            ${col.header}
            </p>`
        }

        if (col.filterTop) {
          col.headerTemplate = inputHeader + labelHeader;
        } else {
          col.headerTemplate = labelHeader + inputHeader;
        }


      }


    });
  }


}
