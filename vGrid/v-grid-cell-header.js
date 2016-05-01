/*****************************************************************************************************************
 *    VGridCellRow
 *    Custom element controlling the cell logic
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, noView, customElement, processContent, bindable} from 'aurelia-framework';
import {VGrid} from './v-grid'
//should I make this into a container and have cells under it?


@noView
@customElement('v-grid-cell-header')
@processContent(false)
@inject(Element, VGrid)
export class VGridCellRow {
  @bindable columnNo;

  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;
    this.vGridConfig = vGrid.vGridConfig;
  }

  bind(bindingContext) {
    this.bindingContext = bindingContext;
  }

  created() {
    ///nothing atm
  }


  attached() {
    this.setStandardClassesAndStyles();
    this.haveFilter = this.vGridConfig.addFilter;
    this.attribute = this.vGridConfig.attributeArray[this.columnNo];
    this.header = this.vGridConfig.headerArray[this.columnNo];
    this.filter = this.vGridConfig.filterArray[this.columnNo];

    if (!this.haveFilter) {
      this.createSingleRowLabel();
    } else {
      this.createDoubleRowWithFilter();
    }//end else

  }


  get colType (){
    return this.vGridConfig.colTypeArray[this.columnNo];
  }

  get isCheckBox (){
    return this.vGridConfig.colTypeArray[this.columnNo] === "checkbox";
  }



  createSingleRowLabel() {

    //create element
    var label = document.createElement('div');

    //set styles
    label.style['line-height'] = this.vGridConfig.headerHeight + "px";
    label.style.height = "100%";
    label.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + "px";

    //add classes
    label.classList.add(this.vGridConfig.css.rowHeaderCell);
    label.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
    label.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
    label.classList.add(this.vGridConfig.css.cellContent);
    label.classList.add(this.vGridConfig.css.orderHandle);

    //set inner text/sort icon
    label.innerHTML = this.header + this.getSortIcon(this.attribute);

    //set data attribute
    label.setAttribute(this.vGridConfig.atts.dataAttribute, this.attribute);

    //add resizable handle
    var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";
    if (dragHandle !== "") {
      label.classList.add(dragHandle);
    }

    //add to DOM
    this.element.appendChild(label);
  }

  createDoubleRowWithFilter() {
    var value = "";

    //get old
    if (this.vGrid.vGridGenerator.queryStringCheck[this.attribute] !== undefined) {
      value = this.vGrid.vGridGenerator.queryStringCheck[this.attribute];
    }

    //get html markup
    this.element.innerHTML = this.getHeaderCellMarkup(this.header, value, this.attribute);

    //set event type to use, onchange is the best one to use...
    var cellInputElement = this.element.querySelectorAll("." + this.vGridConfig.css.filterHandle)[0];

    if(cellInputElement){
      if (this.vGridConfig.filterOnKey !== true) {
          cellInputElement.onkeyup = this.onKeyUpEventOnFilter.bind(this);
          cellInputElement.onchange = this.onChangeEventOnFilter.bind(this);
      } else {
        cellInputElement.onkeyup = this.onChangeEventOnFilter.bind(this);
      }
    }
  }


  setStandardClassesAndStyles() {

    this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
    this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo)
    this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo)
    this.element.style.height = '100%';
    this.element.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + 'px';

  }


  getHeaderCellMarkup = (labelTopCell, valueInput, attribute) => {

    var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";

    var cssLabel, cssInput;
    if (this.vGridConfig.filterOnAtTop) {
      cssLabel = `${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.filterLabelBottom} ${dragHandle} ${this.vGridConfig.css.orderHandle}`;
      cssInput = `${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.filterInputTop} ${this.vGridConfig.css.filterHandle}`;
    } else {
      cssLabel = `${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.filterLabelTop} ${dragHandle} ${this.vGridConfig.css.orderHandle}`;
      cssInput = `${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.filterInputBottom} ${this.vGridConfig.css.filterHandle}`;
    }

    //get sort icon
    var sortIcon = this.getSortIcon(attribute);

    //get filter name
    var filter = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(attribute)] || "filter";
    var filterName = this.vGridConfig.getFilterName(filter);

    //setting lineheight so it stays in the middle
    var lineHeigth = `line-height:${this.vGridConfig.headerHeight / 2}px;`;

    //markup--
    var cellLabel = `<div style="${lineHeigth}" class="${cssLabel}" ${this.vGridConfig.atts.dataAttribute}="${attribute}">${labelTopCell} ${sortIcon}</div>`;
    var cellInput = `<input style="${lineHeigth}" placeholder="${filterName}" class="${cssInput}" ${this.vGridConfig.atts.dataAttribute}="${attribute}" value="${valueInput}"/>`;

    //if its in the the array then we want empty block, else it will look like shit if filters are at top
    if (this.vGridConfig.doNotAddFilterTo.indexOf(attribute) !== -1) {
      cellInput = `<div class="${cssLabel}" ${this.vGridConfig.atts.dataAttribute}="${attribute}"></div>`;
    }

    //check where to set the filter..
    var result;
    if (this.vGridConfig.filterOnAtTop) {
      result = cellInput + cellLabel;
    } else {
      result = cellLabel + cellInput;
    }
    return result;

  };


  getSortIcon(attribute) {
    var result;

    //setting lineheight so it stays in the middle
    var lineHeigthStyleTag;

    if (!this.vGridConfig.addFilter) {
      lineHeigthStyleTag = `style=line-height:${this.vGridConfig.headerHeight}px;"`;
    } else {
      lineHeigthStyleTag = `style=line-height:${this.vGridConfig.headerHeight / 2}px;"`;
    }

    if (this.vGridConfig.sortNotOnHeader.indexOf(attribute) !== -1) {
      return "";
    }


    if (this.vGridConfig.sortOnHeaderClick) {
      var main = `<span class=""><span ${lineHeigthStyleTag} class="${this.vGridConfig.css.sortIcon} ${this.vGridConfig.css.sortIconSort}"></span></span>`;
      if (this.vGrid.vGridGenerator.sortOrder.length === 0) {

        result = main

      } else {

        this.vGrid.vGridGenerator.sortOrder.forEach((x) => {

          if (x.attribute === attribute) {
            var isAsc = `<span ${lineHeigthStyleTag} class="${this.vGridConfig.css.sortIcon} ${this.vGridConfig.css.sortIconAsc}"></span>`;
            var isDesc = `<span ${lineHeigthStyleTag} class="${this.vGridConfig.css.sortIcon} ${this.vGridConfig.css.sortIconDesc}"></span>`;

            var asc = x.asc === true ? isAsc : isDesc;
            var main = `<span ${lineHeigthStyleTag} class="${this.vGridConfig.css.sortIcon} ${this.vGridConfig.css.sortIconNo}${x.no}">`;
            var end = '</span>';

            result = main + end + asc;
          }

        });
      }
      if (!result) {
        result = main;
      }
    } else {
      result = "";
    }
    return result
  };

  /*------------------------------------------------*/
  //called when chang event fires in filter input
  onChangeEventOnFilter(e) {

    if (e.keyCode !== 9) {

      //get inputs
      var queryHtmlInput = this.vGrid.element.querySelectorAll("." + this.vGridConfig.css.filterHandle);

      //loop all the headers
      var queryParams = [];
      for (var i = 0; i < queryHtmlInput.length; i++) {

        var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
        var operator = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
        if(dataSourceAttribute === this.attribute){
          var value  =  queryHtmlInput[i].value;
        } else {
          var value  = queryHtmlInput[i].value;
        }



        //do value exist and is not blank?
        if (value !== "" && value !== undefined) {





          //push into array that we send back after
          queryParams.push({
            attribute: dataSourceAttribute,
            value: value,
            operator: operator
          });

          //This is something I need for later if I add sortable columns.. and callback on each column on build
          this.vGrid.vGridGenerator.queryStringCheck[this.attribute] = value;

        } else {

          if (value === "") {
            var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
            this.vGrid.vGridGenerator.queryStringCheck[dataSourceAttribute] = value;
          }

        }

      }
      this.vGridConfig.onFilterRun(queryParams)
    }
  };


  /*------------------------------------------------*/
  //called when users hits key down... just to know if user hits enter, so we know we can run filter
  onKeyUpEventOnFilter(e) {
    if (e.keyCode === 13 && triggerRan === false) {
      e.target.onchange(e);
    }
  };


}//end class
