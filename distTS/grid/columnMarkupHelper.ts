import { ColConfigInterface } from '../interfaces';

/**
 * Generate the simple html columns markup from settings fetched from the attrubites
 *
 */
export class ColumnMarkupHelper {



  /**
   * todo description
   *
   */
  public generate(colConfig: ColConfigInterface[]): void {
    let type: string = null;
    if (colConfig && colConfig.length > 0) {
      type = 'typeHtml';
    }
    if (!type) {
      throw new Error('column setup missing');
    }
    this.processColumns(colConfig);
  }



  /**
   * todo description
   *
   */
  private processColumns(array: ColConfigInterface[]): void {
    array.forEach((col, index) => {
      // we need attribute or rowtemplate, else throm error
      if (!col.colField && !col.colRowTemplate) {
        if (col.colType !== 'selection') {
          throw new Error('colField is not set on column' + index);
        }
      }
      // set default, some can be missing
      col.colType = col.colType || 'text';
      col.colFilterTop = col.colFilterTop || false;
      col.colHeaderName = col.colHeaderName || this.getAttribute(col.colField, true);
      col.colWidth = col.colWidth || 100;
      col.colCss = col.colCss || '';
      col.colField = this.checkAttribute(col.colField);
      // create row and header templates
      this.createHeaderTemplate(col);
      this.createRowTemplate(col);
      if (col.colRowTemplate) {
        col.__colRowTemplateGenerated = col.colRowTemplate;
      }
      if (col.colHeaderTemplate) {
        col.__colHeaderTemplateGenerated = col.colHeaderTemplate;
      }

    });
  }



  /**
   * todo description
   *
   */
  private createHeaderTemplate(col: any): void {
    // if header template does not exist then lets create it
    if (!col.colHeaderTemplate) {
      let inputHeader: string;
      let labelHeader: string;
      switch (col.colType) {
        case 'selection':
          // set template
          labelHeader = '';
          inputHeader = `<input
            class="avg-row-checkbox-100"
            v-selection="type:header;selected.bind:selected"
            type="checkbox">`;
          break;
        case 'image':
          inputHeader = '<p class="avg-label-top"></p>';
          if (!col.colFilterTop) {
            col.colFilter = 'x';
          }
          labelHeader = this.createLabelMarkup(col);
          break;
        default: // text
          inputHeader = this.createInputHeaderMarkup(col);
          labelHeader = this.createLabelMarkup(col);
          break;
      }
      // set correctly to where is is suppoed to be
      if (col.colFilterTop) {
        col.__colHeaderTemplateGenerated = inputHeader + labelHeader;
      } else {
        col.__colHeaderTemplateGenerated = labelHeader + inputHeader;
      }
    }
  }



  /**
   * todo description
   *
   */
  private createRowTemplate(col: any): void {
    // if row template does not exist, then lets create it
    if (!col.colRowTemplate) {
      switch (col.colType) {
        case 'selection':
          // set template
          col.colRowTemplate = `<input
            v-key-move
            class="avg-row-checkbox-100"
            v-selection="type:row;selected.bind:selected"
            type="checkbox" >`;
          break;
        case 'image':
          this.createImageRowMarkup(col);
          break;

        default: // text
          this.createInputRowMarkup(col);
          break;
      }
    }
  }



  /**
   * todo description
   *
   */
  private getAttribute(value: string, capitalize: boolean): string {
    let returnValue = value || 'missing!';
    if (value) {
      // remove rowRef/tempRef
      value = value.replace('rowRef.', '');
      value = value.replace('tempRef.', '');
      // loop it until we have the attribute
      let newValue = '';
      let done = false;
      for (let x = 0; x < value.length; x++) {
        let letter = value.charAt(x);
        // if we hit & or | or space we are at the end
        if (!done && letter !== ' ' && letter !== '&' && letter !== '|' && letter !== ':') {
          newValue = newValue + letter;
        } else {
          done = true;
        }
      }
      // capilize first letter
      if (capitalize) {
        returnValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
      } else {
        returnValue = newValue;
      }
    }
    return returnValue;
  }



  /**
   * todo description
   *
   */
  private checkAttribute(attribute: string): string {
    let value = attribute;
    if (attribute) {
      if (attribute.indexOf('rowRef') === -1 && attribute.indexOf('tempRef') === -1) {
        value = 'rowRef.' + attribute;
      }
    }
    return value;
  }



  /**
   * todo description
   *
   */
  private createImageRowMarkup(col: ColConfigInterface): void {
    // get the values/settings
    let classNames = 'class="avg-image-round"';
    let attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
    let css = col.colCss ? `css="${col.colCss}"` : '';
    let imageFix = `v-image-fix.bind="${col.colField}"`;
    // insert the markup
    col.__colRowTemplateGenerated = `<image ${css} ${classNames} ${imageFix} ${attributeRow}>`;
  }



  /**
   * todo description
   *
   */
  private createInputRowMarkup(col: ColConfigInterface): void {

    // get the values/settings
    let colClass = `class="${col.colType === 'checkbox' ? 'avg-row-checkbox-100' : 'avg-row-input'}"`;
    // type
    let colType = `type="${col.colType}"`;
    // get attributes row
    let colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';
    // menu ?
    let colRowMenu = col.colRowMenu ? `v-menu="${col.colRowMenu}"` : '';
    // get css
    let colCss = col.colCss ? `css="${col.colCss}"` : '';
    // is it a checkbox?
    // todo: adding the observer part without choice, maybe param for that?
    if (col.colType === 'checkbox') {
      col.__colRowTemplateGenerated = `<input
        ${colCss}
        ${colClass}
        ${colType}
        ${colAddRowAttributes}
        ${colRowMenu}
        checked.bind="${col.colField}">`;
    } else {

      let binding = `value.bind="${col.colField}"`;

      if (col.colDisplayEdit) {
        binding = `v-data-handler="value.bind:${col.colField};${col.colDisplayEdit}"`;
      }

      col.__colRowTemplateGenerated = `<input
        ${colCss}
        ${colClass}
        ${colType}
        ${colRowMenu}
        ${colAddRowAttributes}
        ${binding}>`;
    }
  }



  /**
   * todo description
   *
   */
  private createInputHeaderMarkup(col: ColConfigInterface): string {

    // is it filter ?
    let markup: string;
    if (col.colFilter) {

      // type
      let type = `type="${col.colType}"`;

      // filter
      let filter = col.colFilter ? `v-filter="${col.colFilter}"` : '';

      // get attributes label
      let colAddFilterAttributes = col.colAddFilterAttributes ? col.colAddFilterAttributes : '';

      // is it a checkbox ?
      let classNames = '';
      if (col.colType === 'checkbox') {
        classNames = `class="${col.colFilterTop ? 'avg-row-checkbox-50' : 'avg-row-checkbox-50'}"`;
      } else {
        classNames = `class="${col.colFilterTop ? 'avg-header-input-top' : 'avg-header-input-bottom'}"`;
      }

      let colRowMenu = col.colFilterMenu ? `v-menu="${col.colFilterMenu}"` : '';

      markup = `<input ${colRowMenu} ${classNames} ${colAddFilterAttributes} ${type} ${filter}">`;
    } else {
      markup = '';
    }

    // return the markup
    return markup;

  }



  /**
   * todo description
   *
   */
  private createLabelMarkup(col: ColConfigInterface): string {
    // get the values/settings
    let filterClass = col.colFilter ? `${col.colFilterTop ? 'avg-label-bottom' : 'avg-label-top'}` : 'avg-label-full';
    let dragDropClass = col.colDragDrop !== 'false' ? 'avg-vGridDragHandle' : '';
    let classname = `class="${dragDropClass} ${filterClass}"`;
    let colAddLabelAttributes = col.colAddLabelAttributes ? col.colAddLabelAttributes : '';
    let sort = col.colSort ? `v-sort="${col.colSort}"` : '';
    let colLabelMenu = col.colLabelMenu ? `v-menu="${col.colLabelMenu}"` : '';
    let colDragDrop = col.colDragDrop !== 'false' ? `v-drag-drop-col="${col.colDragDrop}"` : '';
    let colResizeable = col.colResizeable !== 'false' ? `v-resize-col` : '';
    let extraAttributes = `${colDragDrop} ${colResizeable} ${colLabelMenu}`;

    // apply magic
    // todo, atm Im adding resize columns and dragdrop columns, should this be a choice?
    return `<p
      ${extraAttributes}
      ${classname}
      ${sort}
      ${colAddLabelAttributes}>
      ${col.colHeaderName}
      </p>`;
  }

}
