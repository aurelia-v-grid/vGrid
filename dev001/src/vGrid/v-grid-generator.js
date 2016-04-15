/*****************************************************************************************************************
 *    vGridGenerator
 *    This generates all html and handles the scrolling, row clicks etc
 *    Created by vegar ringdal
 *    26-03-2016- started to test if I could just write it as a pure es6 class - this is not in use
 *
 ****************************************************************************************************************/
export class VGridGenerator {


  constructor(vGridConfig, vGridInterpolate, vGridElement, vGridSortable, vGridSelection, vGridCellEdit) {
    this.vGridSelection = vGridSelection;
    this.vGridConfig = vGridConfig;
    this.vGridCellEdit = vGridCellEdit;
    this.vGridInterpolate = vGridInterpolate;
    this.vGridElement = vGridElement;
    this.vGridSortable = vGridSortable;
    this.init(false);
  }





  /*************************************************************************************
   * internal vars
   *************************************************************************************/

  internalDragDropCount = 10; //internal count for index of header column, this can maybe be deleted after rebuild
  sortOrder = [];           //
  contentHeight = 0;          //internal
  gridHeight = 0;             //internal
  gridWidth = 0;              //internal
  queryStringCheck = {};     //internal //just to remeber old input, helper for ondrag/drop columns
  scrollBodyHeight = 0;

  htmlCache = {
    grid: null,       //internal
    header: null,     //internal
    content: null,    //internal
    footer: null,     //internal
    rowsArray: [],    //internal
    scrollBody: null, //internal
    rowTemplate: null //internal
  };

  scrollVars = {           //internals
    lastScrollTop: 0,     //used in scroll event etc
    firstTop: 0,          //scroll variable
    lastScrollLeft: 0,    //used for stopping weird scrolling to left
    halt: false,          //used for knowing if we can update when doing scrolling, used with time var under
    timer: null,          //timer for stopping updating, "getDataScrollDelay" is the timeout for this
    clickTimersArray: [],  //this is the array of touch events, have it here so I can cancel during scroll
    scrollCallbackTimer: null
  };




  /****************************************************************************************************************************
   * fills data into row
   ****************************************************************************************************************************/
  fillDataInRows(clearAllRows) {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
      var row = this.htmlCache.rowsArray[i];
      if (clearAllRows) {
        if (row.div.firstChild) {
          row.div.removeChild(row.div.firstChild);
        }
      }
      this.insertRowMarkup(currentRow, row.div, true, true);
    }
  };





  /****************************************************************************************************************************
   * builds correct sort icon markup
   ****************************************************************************************************************************/
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
      if (this.sortOrder.length === 0) {
        result = main
      } else {
        this.sortOrder.forEach((x) => {
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





  /****************************************************************************************************************************
   * fills data into row
   ****************************************************************************************************************************/
  fillDataIntoRow(rowno, clearRow) {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
      if (rowno === currentRow) {
        var row = this.htmlCache.rowsArray[i];
        if (clearRow) {
          if (row.div.firstChild) {
            row.div.removeChild(row.div.firstChild);
          }
        }
        this.insertRowMarkup(currentRow, row.div, true, true);
      }
    }
  };





  /****************************************************************************************************************************
   * updates only selection on rows
   ****************************************************************************************************************************/
  updateSelectionOnAllRows() {
    var i;
    for (i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
      if (this.vGridSelection.isSelected(currentRow)) {
        this.htmlCache.rowsArray[i].div.classList.add(this.vGridConfig.css.rowSelected);
      } else {
        this.htmlCache.rowsArray[i].div.classList.remove(this.vGridConfig.css.rowSelected);
      }
    }
  };





  /****************************************************************************************************************************
   * returns header template
   ****************************************************************************************************************************/
  getHeaderTemplate(headerNamesArray, attributeNamesArray) {
    var rowTemplate = "";
    var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";
    var css = `${dragHandle} ${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.orderHandle}`;
    for (var i = 0; i < headerNamesArray.length; i++) {
      var sortIcon = this.getSortIcon(attributeNamesArray[i]);
      rowTemplate = rowTemplate +
        `<div><div class="${css}" ${this.vGridConfig.atts.dataAttribute}="${attributeNamesArray[i]}">${headerNamesArray[i]}${sortIcon}</div></div>`;
    }
    return rowTemplate;
  };





  /****************************************************************************************************************************
   * returns rowTemplate
   ****************************************************************************************************************************/
  getRowTemplate(attributeNamesArray) {
    var rowTemplate = "";
    if (this.htmlCache.rowTemplate !== null) {
      rowTemplate = this.htmlCache.rowTemplate;
    } else {
      //todo: check of option is set and callback instead of creating it.
      if (this.vGridConfig.onRowMarkupCreate) {
        rowTemplate = this.vGridConfig.onRowMarkupCreate(attributeNamesArray);
      } else {
        for (var i = 0; i < attributeNamesArray.length; i++) {
          if (this.vGridConfig.colTypeArray[i] === "image") {
            rowTemplate = rowTemplate +
              `<div><img class="${this.vGridConfig.css.cellContent}" tabindex="0" style="${this.vGridConfig.colStyleArray[i]}" ${this.vGridConfig.atts.dataAttribute}="${attributeNamesArray[i]}" src="{{${attributeNamesArray[i]}}}" ></div>`;

          } else {
            rowTemplate = rowTemplate +
              `<div><input class="${this.vGridConfig.css.cellContent}"  type="text" readonly="true" style="${this.vGridConfig.colStyleArray[i]}" ${this.vGridConfig.atts.dataAttribute}="${attributeNamesArray[i]}" value="{{${attributeNamesArray[i]}}}" ></input></div>`;
          }
        }
      }
    }
    return rowTemplate;
  };





  /****************************************************************************************************************************
   * vGridInterpolate cache.... no idea if this helps really, but lets use it...
   ****************************************************************************************************************************/
  cacheRowTemplate(template) {
    var stringTemplate = template || this.getRowTemplate(this.vGridConfig.attributeArray);
    this.vGridInterpolate.parse(stringTemplate);
    this.htmlCache.rowTemplate = stringTemplate;
  };





  /****************************************************************************************************************************
   * get total column width
   ****************************************************************************************************************************/
  getTotalColumnWidth() {
    var total = 0;
    for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
      total = total + parseInt(this.vGridConfig.columnWidthArray[i], 10);
    }
    return total;
  };





  /****************************************************************************************************************************
   * create header template to header div
   ****************************************************************************************************************************/
  createHeaderMarkup() {
    var tempColumns = document.createElement("DIV");
    tempColumns.innerHTML = this.getHeaderTemplate(this.vGridConfig.headerArray, this.vGridConfig.attributeArray);
    var i;
    for (i = 0; i < tempColumns.children.length; i++) {
      tempColumns.children[i].setAttribute("column-no", i);

      //setting lineheight so it stays in the middle
      //only set lineheight if not filter
      if (!this.vGridConfig.addFilter) {
        tempColumns.children[i].style["line-height"] = this.vGridConfig.headerHeight + "px";
      }

      tempColumns.children[i].style.height = "100%";
      tempColumns.children[i].style.width = this.vGridConfig.columnWidthArray[i] + "px";
      tempColumns.children[i].classList.add(this.vGridConfig.css.rowHeaderCell);
      tempColumns.children[i].classList.add(this.vGridConfig.css.rowHeaderColumn + i);
      tempColumns.children[i].classList.add(this.vGridConfig.css.gridColumn + i);
    }

    //rowCell
    var row = document.createElement("DIV");
    row.className = this.vGridConfig.css.row + " " + this.vGridConfig.css.rowHeader;
    //row.style.top = top + "px";
    row.style.height = this.vGridConfig.headerHeight + "px";
    row.style.width = this.getTotalColumnWidth() + "px";
    row.innerHTML = tempColumns.innerHTML;

    var container = document.createElement("DIV");
    container.className = this.vGridConfig.css.rowContainer;
    container.appendChild(row);

    return container;
  };





  /****************************************************************************************************************************
   * returns row with data from template
   ****************************************************************************************************************************/
  createRowMarkup(entity, attributeNames) {
    var tempColumns = document.createElement("DIV");
    tempColumns.innerHTML = this.vGridInterpolate.render(this.getRowTemplate(attributeNames), entity); //, attributeNames);

    //check if user want to override this TODO: test what this will break
    if (!this.vGridConfig.columnWidthArrayOverride) {
      var i;
      for (i = 0; i < tempColumns.children.length; i++) {
        tempColumns.children[i].style.height = "100%";
        //setting lineheight so it stays in the middle
        tempColumns.children[i].style["line-height"] = (this.vGridConfig.rowHeight - 2) + "px";

        tempColumns.children[i].style.width = this.vGridConfig.columnWidthArray[i] + "px";
        tempColumns.children[i].classList.add(this.vGridConfig.css.rowCell);
        tempColumns.children[i].classList.add(this.vGridConfig.css.rowColumn + i);
        tempColumns.children[i].classList.add(this.vGridConfig.css.gridColumn + i);
        if (this.vGridConfig.lockedColumns > i) {
          tempColumns.children[i].style.left = this.scrollVars.lastScrollLeft + "px";
          tempColumns.children[i].style.zIndex = this.internalDragDropCount;
          tempColumns.children[i].style.position = "relative";
        }
      }
    }
    return tempColumns.innerHTML;
  };





  /****************************************************************************************************************************
   * sets row to empty
   ****************************************************************************************************************************/
  setEmptyTemplate() {
    return "";
  };





  /****************************************************************************************************************************
   * gets the row cache length...
   ****************************************************************************************************************************/
  getRowCacheLength() {
    return this.htmlCache.rowsArray.length;
  };





  /****************************************************************************************************************************
   * set top value, here I could have failback to TOP instead of translate 3d
   ****************************************************************************************************************************/
  setRowTopValue(rowArray, elementNo, topValue) {
    rowArray[elementNo].div.style.transform = `translate3d(0px,${topValue}px, 0px)`;
    rowArray[elementNo].top = topValue;
  };





  /****************************************************************************************************************************
   * gets the main div to create grid in
   ****************************************************************************************************************************/
  createGridHtmlWrapper() {
    var x = document.createElement("DIV"); //create this a container for my 3 rows
    this.vGridElement.appendChild(x);
    this.htmlCache.grid = x;
    //_private.htmlCache.grid =this.vGridElement;
    //do this for I know very little about css, and doing it like this I didnt get those weird side effects
    //todo look at this again, do not like what Ive done here
    this.htmlCache.grid.className = this.vGridConfig.css.wrapper;
    this.htmlCache.grid.style.position = "relative";
    this.htmlCache.grid.style.height = this.vGridElement.style.height || "100%";
    this.htmlCache.grid.style.width = this.vGridElement.style.width || "100%";

    //get default height and width
    this.gridHeight = this.htmlCache.grid.clientHeight;
    this.gridWidght = this.htmlCache.grid.clientWidth;

  };





  /****************************************************************************************************************************
   * add header div
   ****************************************************************************************************************************/
  createGridHtmlHeaderWrapper() {
    //create and append header div
    this.htmlCache.header = document.createElement("DIV");
    this.htmlCache.header.className = this.vGridConfig.css.mainHeader;
    this.htmlCache.header.style.height = this.vGridConfig.headerHeight + "px";
    this.htmlCache.grid.appendChild(this.htmlCache.header);
    //get header template
    var headerDivs = this.createHeaderMarkup(this.htmlCache.header);
    if (this.vGridConfig.addFilter) {
      var headerCells = headerDivs.lastElementChild.children;
      for (var i = 0; i < headerCells.length; i++) {
        this.addFilterToHeaderCell({
          attributeName: this.vGridConfig.attributeArray[i],
          headerName: this.vGridConfig.headerArray[i],
          defaultFilter: this.vGridConfig.filterArray[i],
          div: headerCells[i]
        })
      }
    }
    this.htmlCache.header.appendChild(headerDivs);

  };





  /****************************************************************************************************************************
   * rebuild header div, needed if user sets new columns or something
   ****************************************************************************************************************************/
  rebuildGridHeaderHtml() {
    //get current scrollleft, so we can set it again after.
    var getScrollLeft = this.htmlCache.header.firstChild.firstChild.style.left;
    this.htmlCache.header.removeChild(this.htmlCache.header.firstChild);

    //get header template
    var headerDivs = this.createHeaderMarkup(this.htmlCache.header);
    if (this.vGridConfig.addFilter) {
      var headerCells = headerDivs.lastElementChild.children;
      for (var i = 0; i < headerCells.length; i++) {
        this.addFilterToHeaderCell({
          attributeName: this.vGridConfig.attributeArray[i],
          headerName: this.vGridConfig.headerArray[i],
          defaultFilter: this.vGridConfig.filterArray[i],
          div: headerCells[i]
        })
      }
    }
    this.htmlCache.header.appendChild(headerDivs);
    this.addResizableAndSortableEvent();

    //get back last scrollleft
    this.htmlCache.header.firstChild.firstChild.style.left = getScrollLeft;
  };





  /****************************************************************************************************************************
   * add content div
   ****************************************************************************************************************************/
  createGridHtmlContentWrapper() {
    //calculate content height
    var gridWrapperHeight = this.gridHeight;
    var headerAndFooterHeight = this.vGridConfig.headerHeight + this.vGridConfig.footerHeight;
    this.contentHeight = gridWrapperHeight - headerAndFooterHeight;

    //create and append content div
    this.htmlCache.content = document.createElement("DIV");
    this.htmlCache.content.className = this.vGridConfig.css.mainContent;
    this.htmlCache.content.style.height = this.contentHeight + "px";
    this.htmlCache.grid.appendChild(this.htmlCache.content);
  };





  /****************************************************************************************************************************
   * adds the footer
   ****************************************************************************************************************************/
  createGridHtmlFooterWrapper() {
    //create and append
    this.htmlCache.footer = document.createElement("DIV");
    this.htmlCache.footer.className = this.vGridConfig.css.mainFooter;
    this.htmlCache.footer.style.height = this.vGridConfig.footerHeight + "px";
    this.htmlCache.grid.appendChild(this.htmlCache.footer);
  };





  /****************************************************************************************************************************
   * sets scroll body to interal variable
   ****************************************************************************************************************************/
  setScrollBodyHeightToVar() {
    var collectionLength = this.vGridConfig.getCollectionLength();
    this.scrollBodyHeight = collectionLength * this.vGridConfig.rowHeight;
  };





  /****************************************************************************************************************************
   * add the scroll body
   ****************************************************************************************************************************/
  createGridHtmlScrollBodyWrapper() {
    this.setScrollBodyHeightToVar();
    //create and append
    this.htmlCache.scrollBody = document.createElement("DIV");
    this.htmlCache.scrollBody.className = this.vGridConfig.css.scrollBody;
    this.htmlCache.scrollBody.style.height = this.scrollBodyHeight + "px";
    this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
    this.htmlCache.content.appendChild(this.htmlCache.scrollBody);
  };





  /****************************************************************************************************************************
   * add the scroll body, this is needed when user chnages columns or resize the columns, so main content knows if scrollbars is needed
   ****************************************************************************************************************************/
  correctRowAndScrollbodyWidth() {
    this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
    for (var i = 0; i < this.htmlCache.rowsArray.length; i++) {
      this.htmlCache.rowsArray[i].div.style.width = this.getTotalColumnWidth() + "px";
    }
    this.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
  };





  /****************************************************************************************************************************
   *
   ****************************************************************************************************************************/
  correctHeaderAndScrollbodyWidth() {
    this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
    this.htmlCache.header.firstChild.firstChild.style.width = this.getTotalColumnWidth() + "px";
  };





  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  createGridHtmlRowWrapper() {
    //rows we need to fill up visible container
    var minimumRowsNeeded = (parseInt(this.contentHeight / this.vGridConfig.rowHeight, 10))// *2);// * 2;

    if (this.vGridConfig.largeBuffer) {
      minimumRowsNeeded = minimumRowsNeeded * 5;
    }

    //set extra so we can buffer
    if (minimumRowsNeeded % 2 === 1) {
      minimumRowsNeeded = minimumRowsNeeded + 7;
    } else {
      minimumRowsNeeded = minimumRowsNeeded + 6;
    }

    var top = 0;
    for (var i = 0; i < minimumRowsNeeded; i++) {

      var row = document.createElement("DIV");

      //add row css
      row.className = this.vGridConfig.css.row;

      //add alt/even css
      if (i % 2 === 1) {
        row.classList.add(this.vGridConfig.css.rowAlt);
      } else {
        row.classList.add(this.vGridConfig.css.rowEven);
      }

      row.style.height = this.vGridConfig.rowHeight + "px";

      this.setRowTopValue([{
        div: row,
        top: 0
      }], 0, top);

      row.style.minWidth = this.htmlCache.grid.offsetWidth + "px";
      row.style.width = this.getTotalColumnWidth() + "px";

      //inner magic
      row.innerHTML = this.setEmptyTemplate();

      //add to scroll body
      this.htmlCache.scrollBody.appendChild(row);

      //push into our html cache for later use when scrolling
      //own for top so we get it faster
      this.htmlCache.rowsArray.push({
        div: row,
        top: top
      });
      //set new top for next row
      top = top + this.vGridConfig.rowHeight;
    }
  };





  /****************************************************************************************************************************
   * calls user for element, user haveto use callback here, might also need to fetch data first..
   ****************************************************************************************************************************/
  insertRowMarkup(rowNo, rowHtmlElement, isDownScroll, isLargeScroll) {
    //called when drawing row
    //lets ask for our data, and insert it into row
    this.vGridConfig.getDataElement(rowNo, isDownScroll, isLargeScroll,
      (entity) => {
        //create container
        var container = document.createElement("DIV");
        container.className = this.vGridConfig.css.rowContainer;

        //if they want to override we set row to 100%, also this might break TODO: test more
        if (this.vGridConfig.columnWidthArrayOverride) {
          container.style.width = "100%"
        }

        rowHtmlElement.setAttribute("row", rowNo);

        //create markup
        var innerHtml = "";
        if (entity) {
          innerHtml = this.createRowMarkup(entity, this.vGridConfig.attributeArray)
        }
        if (!entity) {
          rowHtmlElement.classList.add(this.vGridConfig.css.noData)
        } else {
          rowHtmlElement.classList.remove(this.vGridConfig.css.noData)
        }

        //add alt/even css
        if (rowNo % 2 === 1) {
          if (rowHtmlElement.classList.contains(this.vGridConfig.css.rowEven)) {
            rowHtmlElement.classList.remove(this.vGridConfig.css.rowEven);
            rowHtmlElement.classList.add(this.vGridConfig.css.rowAlt);
          }

        } else {
          if (rowHtmlElement.classList.contains(this.vGridConfig.css.rowAlt)) {
            rowHtmlElement.classList.remove(this.vGridConfig.css.rowAlt);
            rowHtmlElement.classList.add(this.vGridConfig.css.rowEven);
          }
        }

        //set highlight

          if (this.vGridSelection.isSelected(rowNo)) {
            rowHtmlElement.classList.add(this.vGridConfig.css.rowSelected)
          } else {
            rowHtmlElement.classList.remove(this.vGridConfig.css.rowSelected)
          }


        //set innerhtml and add to row
        container.innerHTML = innerHtml;
        if (rowHtmlElement.firstChild) {
          if (rowHtmlElement.firstChild.innerHTML !== innerHtml) {
            rowHtmlElement.appendChild(container);
          }
        } else {
          rowHtmlElement.appendChild(container);
        }

        //call celldraw option, if this is set 13/03-2016 removing, complete rowmarkup option will replace
        if (this.vGridConfig.eventOnCellDraw) {
          var rowCells = rowHtmlElement.lastElementChild.children;
          for (var i = 0; i < rowCells.length; i++) {
            this.vGridConfig.cellDrawEvent({
              attributeName: this.vGridConfig.attributeArray[i],
              div: rowCells[i],
              row: rowNo
            })
          }
        }

      });
  };





  /****************************************************************************************************************************
   *    helper to add filter to header
   ****************************************************************************************************************************/
  addFilterToHeaderCell(event) {


    //get attibute
    var attributeName = event.attributeName;
    var headerName = event.headerName;
    var defaultFilter = event.defaultFilter;


    /*------------------------------------------------*/
    //called when chang event fires in filter input
    var onChangeEventOnFilter = (e) => {

      if (e.keyCode !== 9) {

        //get inputs
        var queryHtmlInput = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.filterHandle);


        //loop all the headers
        var queryParams = [];
        for (var i = 0; i < queryHtmlInput.length; i++) {
          //current datasource attribute

          //do value exist and is not blank?
          if (queryHtmlInput[i].value !== "" && queryHtmlInput[i].value !== undefined) {
            var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
            var operator = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];


            //set in & if we are not of first row
            var value = queryHtmlInput[i].value;
            //push into array that we send back after
            queryParams.push({
              attribute: dataSourceAttribute,
              value: value,
              operator: operator
            });
            //This is something I need for later if I add sortable columns.. and callback on each column on build
            this.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value;
          } else {

            if (queryHtmlInput[i].value === "") {
              var dataSourceAttribute = queryHtmlInput[i].getAttribute(this.vGridConfig.atts.dataAttribute);
              this.queryStringCheck[dataSourceAttribute] = queryHtmlInput[i].value = "";
            }

          }


        }
        this.vGridConfig.onFilterRun(queryParams)
      }
    };


    /*------------------------------------------------*/
    //called when users hits key down... just to know if user hits enter, so we know we can run filter
    var onKeyUpEventOnFilter = function (e) {
      if (e.keyCode === 13 && triggerRan === false) {
        e.target.onchange(e);
      }
    };


    /*------------------------------------------------*/
    //this created new div, this could have been a callback function
    var getHeaderCellMarkup = (labelTopCell, valueInput, attribute) => {

      var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";

      var cssLabel = `${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.filterLabelTop} ${dragHandle} ${this.vGridConfig.css.orderHandle}`;
      var cssInput = `${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.filterInputBottom} ${this.vGridConfig.css.filterHandle}`;

      if (this.vGridConfig.filterOnAtTop) {
        cssLabel = `${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.filterLabelBottom} ${dragHandle} ${this.vGridConfig.css.orderHandle}`;
        cssInput = `${this.vGridConfig.css.cellContent} ${this.vGridConfig.css.filterInputTop} ${this.vGridConfig.css.filterHandle}`;
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

    var value = "";

    //21.02.2015:need this because I want it to remeber input if user reorder/sort headers....use order by that I havent made yet
    if (this.queryStringCheck[attributeName] !== undefined) {
      value = this.queryStringCheck[attributeName];
    }

    let onFocus = (e) => {
      var currentScrollLeft = e.target.offsetParent.offsetParent.offsetParent.scrollLeft;
      this.htmlCache.content.scrollLeft = currentScrollLeft;
    };

    //set new div
    event.div.innerHTML = getHeaderCellMarkup(headerName, value, attributeName);
    //set event type to use, onchange is the best one to use...
    var cellInputElement = event.div.querySelectorAll("." + this.vGridConfig.css.filterHandle);
    if (this.vGridConfig.filterOnKey !== true) {
      for (var i = 0; i < cellInputElement.length; i++) {
        cellInputElement[i].onchange = onChangeEventOnFilter;
        cellInputElement[i].onkeyup = onKeyUpEventOnFilter;
        cellInputElement[i].onfocus = onFocus
      }
    } else {
      for (var i = 0; i < cellInputElement.length; i++) {
        cellInputElement[i].onkeyup = onChangeEventOnFilter;
        cellInputElement[i].onfocus = onFocus
      }
    }
  };



  /****************************************************************************************************************************
   * option to scrollbars scrolling where we dont update all the time and use timeout
   ****************************************************************************************************************************/
  onNormalScrollingLarge() {
    //check is user have preformed big scroll, but want it to keep rows inline
    this.scrollVars.lastScrollTop = this.htmlCache.content.scrollTop;
    //fix firefox messing up whn reseting scrolbar to 0, this is not issue in chrome and edge
    if (this.htmlCache.content.scrollTop === 0 && this.scrollVars.lastScrollTop !== this.htmlCache.content.scrollTop) {
      this.scrollVars.lastScrollTop = 0;
    }

    if (this.vGridConfig.getCollectionLength() <= this.htmlCache.rowsArray.length) {
      this.scrollVars.lastScrollTop = 0;
    }

    var currentRow = parseInt(this.scrollVars.lastScrollTop / this.vGridConfig.rowHeight, 10);
    this.scrollVars.firstTop = currentRow * this.vGridConfig.rowHeight; //need this for later
    var currentRowTop = this.vGridConfig.rowHeight * currentRow;
    var bottomHitCount;
    for (var i = 0; i < this.getRowCacheLength(); i++) {


      /*------------------------------------------------*/
      //move row
      var setNewTopOnRow = (cacheRowNumber) => {
        var row = this.htmlCache.rowsArray[cacheRowNumber];
        this.setRowTopValue([row], 0, currentRowTop);
        //remove content when we move/set new height
        if (row.div.firstChild) {
          row.div.removeChild(row.div.firstChild);
        }
        currentRowTop = currentRowTop + this.vGridConfig.rowHeight;
      };

      if (currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
        setNewTopOnRow(i);
      }

      //need to adjust my array, so upward scroll do not get weird ofter hitting bottom
      if (currentRow === this.vGridConfig.getCollectionLength() - 1 && this.getRowCacheLength() < this.vGridConfig.getCollectionLength() - 1) {
        bottomHitCount = i;
      }

      //this helps if all is cleared
      if (currentRow > this.vGridConfig.getCollectionLength() - 1) {
        setNewTopOnRow(i);
      }

      //we want to remove rows that is larger than colletion and visible within normal content box
      if (currentRow >= this.vGridConfig.getCollectionLength() && currentRowTop >= this.htmlCache.content.clientHeight) {
        //fix for when scrolling and removing rows that is larger then actuall length
        var row = this.htmlCache.rowsArray[i];
        this.setRowTopValue([row], 0, currentRowTop - 5000);
        if (row.div.firstChild) {
          row.div.removeChild(row.div.firstChild);
        }
      }

      currentRow++;
    }

    //if I hit bottom, then I need to adjust the rowsArray.... code under fixes this.
    //what it does it take the rows that did not get moved and sets it before the other ones
    if (bottomHitCount) {
      var firstTop = parseInt(this.htmlCache.rowsArray[0].top, 10);
      for (i = this.getRowCacheLength() - 1; i > bottomHitCount; i--) {
        var row = this.htmlCache.rowsArray[i];
        firstTop = firstTop - this.vGridConfig.rowHeight;
        this.setRowTopValue(this.htmlCache.rowsArray, i, firstTop);
        try {
          row.div.removeChild(row.div.firstChild);
        } catch (e) {
          //we might get a issue here where there is not any children..
        }
      }
    }

    //I now sort the array again.
    this.htmlCache.rowsArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });

    this.fillDataInRows(false);
  };





  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  onNormalScrolling(isDownScroll, currentScrollTop) {
    //check is user have preformed big scroll
    var currentScrollTop = this.htmlCache.content.scrollTop;
    if (this.scrollVars.halt === false) {
      var newTopValue;
      var currentRow = parseInt((this.scrollVars.lastScrollTop / this.vGridConfig.rowHeight), 10);
      this.scrollVars.firstTop = currentRow * this.vGridConfig.rowHeight;

      for (var i = 0; i < this.getRowCacheLength(); i++) {

        var row = this.htmlCache.rowsArray[i];
        var rowTop = parseInt(row.top, 10);
        var update = false;

        if (isDownScroll) {

          //scrolling downwards
          //check row position
          if (rowTop < (currentScrollTop - this.vGridConfig.rowHeight)) {
            update = true;
            newTopValue = rowTop + (this.vGridConfig.rowHeight * this.getRowCacheLength());
            currentRow = (rowTop + (this.vGridConfig.rowHeight * this.getRowCacheLength())) / this.vGridConfig.rowHeight;
          }
          if (rowTop > ((this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.rowHeight) && rowTop > parseInt(this.htmlCache.content.style.height)) {
            this.setRowTopValue([row], 0, -5000 + i);
          }

        } else {

          //scrolling upwards
          //check row position
          if (rowTop > ((currentScrollTop + this.contentHeight))) {
            update = true;
            newTopValue = rowTop - (this.vGridConfig.rowHeight * this.getRowCacheLength());
            currentRow = (rowTop - (this.vGridConfig.rowHeight * this.getRowCacheLength())) / this.vGridConfig.rowHeight;
          }

        }

        //update data
        if (update === true && currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
          //should I just get correct top value and draw it all after?
          this.setRowTopValue([row], 0, newTopValue);
          if (row.div.firstChild) {
            row.div.removeChild(row.div.firstChild);
          }
          this.insertRowMarkup(currentRow, row.div, isDownScroll, false);
        }

      }
      this.htmlCache.rowsArray.sort(
        function (a, b) {
          return parseInt(a.top) - parseInt(b.top)
        });
    } else {
      //just in case user scrolls big then small, do not want to update before he stops
      this.onScrollbarScrolling()
    }

  };





  /****************************************************************************************************************************
   * helper, removes rows, se minus height so we cant scroll to empty
   ****************************************************************************************************************************/
  hideRowsThatIsLargerThanCollection() {
    var currentRow = parseInt((this.scrollVars.lastScrollTop / this.vGridConfig.rowHeight), 10);
    this.scrollVars.firstTop = currentRow * this.vGridConfig.rowHeight;
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var row = this.htmlCache.rowsArray[i];
      var rowTop = parseInt(row.top, 10);
      if (rowTop > ((this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.rowHeight) && rowTop > (parseInt(this.htmlCache.content.style.height) - this.vGridConfig.rowHeight)) {
        this.setRowTopValue([row], 0, -5000 + i);
      }
    }

    this.htmlCache.rowsArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });
  };





  /****************************************************************************************************************************
   * on large scroll, or you have modified scroltop or similar, this can be used to correct issues and for just updating data
   ****************************************************************************************************************************/
  onScrollbarScrolling() {
    //set halt var to true, so small scroll will be stopped, will be laggy else
    this.scrollVars.halt = true;

    //delay before doing update
    var timeout = this.vGridConfig.dataScrollDelay;

    //clear scroll timeout
    clearTimeout(this.scrollVars.timer);

    //set timeout, incase user is still scrolling
    this.scrollVars.timer = setTimeout(() => {
      this.onNormalScrollingLarge();
      this.scrollVars.halt = false;
    }, timeout);


  };





  /****************************************************************************************************************************
   * clear touch inputs callback on scroll TODO: do I need this, grid was just a scroller at first... and was just for displaying data on mobile so had to do this..
   ****************************************************************************************************************************/

  onScrollClickCancel() {
    //clear all touch events
    this.scrollVars.clickTimersArray.forEach((xTimer)=> {
      clearTimeout(xTimer);
    });
    //timeout so we get touch end/move also after scroll event
    if (this.scrollVars.clickTimersArray.length > 0) {
      setTimeout(() => {
        this.scrollVars.clickTimersArray.forEach((xTimer) => {
          clearTimeout(xTimer);
        });
      }, 0);
    }
  };





  /****************************************************************************************************************************
   * fixes scrolling / top of divs
   ****************************************************************************************************************************/
  onScroll() {
    this.vGridCellEdit.onScroll();

    var doScroll = () => {
      var currentScrollTop = this.htmlCache.content.scrollTop;
      var currentScrollLeft = this.htmlCache.content.scrollLeft;

      //are we scrolling ?
      if (currentScrollTop !== this.scrollVars.lastScrollTop) {
        //is vert scroll

        //stop left scroll...
        if (currentScrollLeft !== 0) {
          this.htmlCache.content.scrollLeft = this.scrollVars.lastScrollLeft;
          this.htmlCache.header.scrollLeft = this.scrollVars.lastScrollLeft
        }

        //cancel touch event, do not want that triggering while scrolling  only use click in this grid, remove?
        this.onScrollClickCancel();

        //check if down scroll.
        var isDownScroll = true;
        if (currentScrollTop < this.scrollVars.lastScrollTop) {
          isDownScroll = false;
        }

        //check if big scroll (split m into 2.. simple to read)
        var isLargeScroll;

        switch (true) {
          case currentScrollTop > this.scrollVars.lastScrollTop + this.vGridConfig.largeScrollLimit:
          case currentScrollTop < this.scrollVars.lastScrollTop - this.vGridConfig.largeScrollLimit:
            isLargeScroll = true;
            break;

          default:
            isLargeScroll = false;
        }

        //reset scroll top
        this.scrollVars.lastScrollTop = currentScrollTop;

        //check if big scroll
        if (isLargeScroll) {
          //now user can set this, on very large collections this will drag preformance down
          if (this.vGridConfig.renderOnScrollbarScroll) {
            this.onNormalScrollingLarge(isDownScroll, currentScrollTop)
          } else {
            this.onScrollbarScrolling();
          }
        } else {
          this.onNormalScrolling(isDownScroll, currentScrollTop)
        }
      } else {

        if (this.htmlCache.content.style.overflowX === "hidden") {
          //we do not want scrolls left if this is hidden..
          this.htmlCache.content.scrollLeft = 0;
          this.scrollVars.lastScrollLeft = 0;
          this.htmlCache.header.scrollLeft = 0;
        } else {
          if (this.scrollVars.lastScrollLeft !== currentScrollLeft) {
            currentScrollLeft = this.htmlCache.content.scrollLeft;
            this.scrollVars.lastScrollLeft = currentScrollLeft;
            this.htmlCache.header.scrollLeft = currentScrollLeft;
          }
        }

        //is horz scroll
        if (this.vGridConfig.lockedColumns > 0) {
          //this have super bad performance in IE...
          currentScrollLeft = this.htmlCache.content.scrollLeft; //need the updated one...
          for (var lockedColNo = this.vGridConfig.lockedColumns; lockedColNo--;) {


            var fixHeader = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.rowHeaderColumn + lockedColNo); //_private.correctionLockedColumnsArray[lockedColNo]);
            var fixRow = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.rowColumn + lockedColNo);
            //for(var i = 0; i < fix.length; i++){
            for (var i = fixHeader.length; i--;) {
              fixHeader[i].style.left = currentScrollLeft + "px";
              fixHeader[i].style.zIndex = this.internalDragDropCount;
              fixHeader[i].style.position = "relative";
            }
            for (var i = fixRow.length; i--;) {
              fixRow[i].style.left = currentScrollLeft + "px";
              fixRow[i].style.zIndex = this.internalDragDropCount;
              fixRow[i].style.position = "relative";
            }
          }
        }


      }
    };
    clearTimeout(this.scrollVars.scrollCallbackTimer);
    if (this.vGridConfig.requestAnimationFrame) {
      requestAnimationFrame(() => {
        doScroll();
      });
    } else {
      doScroll();
    }
    this.scrollVars.scrollCallbackTimer = setTimeout(()=> {
      this.vGridConfig.onScrolled();
    }, 250)

  }; //end scroll event





  /****************************************************************************************************************************
   * hiding scroll bars when not needed
   ****************************************************************************************************************************/
  updateGridScrollbars() {

    var collectionHeight = this.vGridConfig.getCollectionLength() * this.vGridConfig.rowHeight + (this.vGridConfig.rowHeight / 2);
    var bodyHeight = this.htmlCache.content.offsetHeight;
    //_private.largeScrollLimit = bodyHeight; why was this here... leave it here incase there is something Im missing atm

    if (collectionHeight <= bodyHeight) {
      this.htmlCache.content.scrollTop = 0;
      //_private.htmlCache.content.scrollLeft = 0;
      this.htmlCache.content.style.overflow = "";
      this.htmlCache.content.style.overflowY = "hidden";
      this.htmlCache.content.style.overflowX = "hidden";
      this.htmlCache.header.style.overflowY = "hidden";

    } else {
      // this.htmlCache.content.scrollLeft = 0;
      this.htmlCache.content.style.overflow = "";
      this.htmlCache.content.style.overflowY = "scroll";
      this.htmlCache.content.style.overflowX = "hidden";
      this.htmlCache.header.style.overflowY = "scroll";

    }

    if (this.htmlCache.content.offsetWidth - 5 < this.getTotalColumnWidth()) {
      this.htmlCache.content.style.overflowX = "scroll";
    }

  };





  /****************************************************************************************************************************
   * add the events  (TODO: when cleaning up code I need to splitt the stuff in here into more functions..)
   ****************************************************************************************************************************/
  addResizableAndSortableEvent() {


    /*------------------------------------------------*/
    // adds resizable headers
    var resizable = false;
    var screenX;
    var xElement;
    var sortable = false;

    //todo, need to tell if we want sort on header click, and if we want multisort
    if (this.vGridConfig.sortOnHeaderClick) {
      var orderByClick = (event) => {
        if (!sortable && !resizable) {
          this.vGridConfig.onOrderBy(event, (sortorder) => {
            this.sortOrder = sortorder;
            this.rebuildGridHeaderHtml();
          })
        }
      };



      //get inputs
      var orderBy = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.orderHandle);
      for (var i = 0; i < orderBy.length; i++) {
        orderBy[i].addEventListener("click", orderByClick.bind(this), false);
      }
    }


    if (this.vGridConfig.isResizableHeaders) {
      var x = this.htmlCache.header.querySelectorAll("." + this.vGridConfig.css.rowHeaderCell);
      for (var i = 0; i < x.length; i++) {

        var temp = document.createElement("DIV");
        temp.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);


        temp.onmousedown = (e) => {
          resizable = true;

          //disable sortable when resizing
          if (this.vGridConfig.isSortableHeader) {
            this.sortableCtx.option("disabled", resizable);
          }
          screenX = e.screenX;
          xElement = e.target;
          var originalWidth = xElement.offsetParent.style.width;
          var originalWidthx = xElement.offsetParent.style.width;
          var index = xElement.offsetParent.getAttribute("column-no");
          //var index =this.vGridConfig.attributeArray.indexOf(attribute);


          this.htmlCache.header.onmousemove = (e) => {


            //get when user let go of mouse button
            this.htmlCache.header.onmouseup = () => {
              //small timeout to stop header click
              setTimeout(() => {
                resizable = false;
                if (this.vGridConfig.isSortableHeader) {
                  this.sortableCtx.option("disabled", resizable);
                }
              }, 30);

              this.htmlCache.header.onmouseleave = "";
              this.htmlCache.header.onmousemove = "";
              this.htmlCache.header.onmouseup = "";
              //enable sortable again if its enabled


              this.vGridConfig.columnWidthArray[index] = parseInt(xElement.offsetParent.style.width);

              //reset template and fill data
              this.htmlCache.rowTemplate = null;
              this.correctRowAndScrollbodyWidth();

              this.cacheRowTemplate(null);
              this.updateGridScrollbars();
              this.fillDataInRows(true);
              //onScrollbarScrolling();
            };

            this.htmlCache.header.onmouseleave = (e) => {
              this.htmlCache.header.onmouseup(e);

            };

            if (resizable) {
              var newWidth = parseInt(originalWidth) - ((screenX - e.screenX)) + "px";
              this.vGridConfig.columnWidthArray[index] = parseInt(newWidth);
              xElement.offsetParent.style.width = parseInt(originalWidth) - ((screenX - e.screenX)) + "px";
              xElement.offsetParent.style.width = parseInt(originalWidthx) - ((screenX - e.screenX)) + "px";
              if (this.vGridConfig.resizableHeadersAndRows) {
                var columnsToFix = this.htmlCache.content.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + index);

                for (var col = 0; col < columnsToFix.length; col++) {
                  columnsToFix[col].style.width = newWidth
                }

                this.correctRowAndScrollbodyWidth();
                this.updateGridScrollbars();

              }
            } else {
              this.correctHeaderAndScrollbodyWidth();
            }
          }
        };

        x[i].appendChild(temp)
      }
    }


    /*------------------------------------------------*/
    //adds sortable headers


    //we haveto control dragging only to headers with draghandle
    var canMove = false;
    var dragHandles = this.htmlCache.grid.querySelectorAll("." + this.vGridConfig.css.dragHandle);
    [].slice.call(dragHandles).forEach(function (itemEl) {
      itemEl.onmouseenter = function () {
        canMove = true
      };
      itemEl.onmouseleave = function () {
        canMove = false
      }

    });



    if (this.vGridConfig.isSortableHeader) {
      this.sortableCtx = new this.vGridSortable(this.htmlCache.header.firstChild.firstChild, (oldIndex, newIndex) => {
        var children = this.htmlCache.header.firstChild.firstChild.children;

        var x;
        x = this.vGridConfig.attributeArray[oldIndex];
        this.vGridConfig.attributeArray.splice(oldIndex, 1);
        this.vGridConfig.attributeArray.splice(newIndex, 0, x);

        x = this.vGridConfig.filterArray[oldIndex];
        this.vGridConfig.filterArray.splice(oldIndex, 1);
        this.vGridConfig.filterArray.splice(newIndex, 0, x);

        x = this.vGridConfig.headerArray[oldIndex];
        this.vGridConfig.headerArray.splice(oldIndex, 1);
        this.vGridConfig.headerArray.splice(newIndex, 0, x);

        x = this.vGridConfig.columnWidthArray[oldIndex];
        this.vGridConfig.columnWidthArray.splice(oldIndex, 1);
        this.vGridConfig.columnWidthArray.splice(newIndex, 0, x);

        x = this.vGridConfig.colStyleArray[oldIndex];
        this.vGridConfig.colStyleArray.splice(oldIndex, 1);
        this.vGridConfig.colStyleArray.splice(newIndex, 0, x);

        x = this.vGridConfig.colTypeArray[oldIndex];
        this.vGridConfig.colTypeArray.splice(oldIndex, 1);
        this.vGridConfig.colTypeArray.splice(newIndex, 0, x);


        this.htmlCache.rowTemplate = null; //reset template and fill data
        this.cacheRowTemplate(null);
        this.rebuildColumns();
        sortable = false;

      }, function (n) {
        //on end
        sortable = true;
      }, function (n) {
        //on cancel
        sortable = false;
      }, function () {
        return canMove;
      });
    }
  };



  /****************************************************************************************************************************
   * add the events  (TODO: when cleaning up code I need to splitt the stuff in here into more functions..)
   ****************************************************************************************************************************/
  addEvents() {

    /*------------------------------------------------*/
    //normal click
    var handleClick = (e) => {
      var currentRow = parseInt(e.currentTarget.getAttribute("row"));
      this.vGridConfig.clickHandler(e, currentRow);
      if (this.vGridConfig.isMultiSelect !== undefined) {
        this.vGridSelection.setHightlight(e, currentRow, this);
      }
    };

    var handleTabbing= (e) => {
      var currentRow = parseInt(e.currentTarget.getAttribute("row"));
      this.vGridConfig.clickHandler(e, currentRow);
      if (this.vGridConfig.isMultiSelect !== undefined) {
        this.vGridSelection.setHightlight(e, currentRow, this);
      }
    };


    /*------------------------------------------------*/
    //doubleclick
    var handleDblClick = (e) => {
      var currentRow = parseInt(e.currentTarget.getAttribute("row"));
      this.vGridConfig.clickHandler(e, currentRow);
    };


    /*------------------------------------------------*/
    //right click
    var onMouseDownRow = (e) => {
      //e.preventDefault();
      if (e.button === 2) {
        //nothing atm
      }

    };


    //add all click events to rows
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var div = this.htmlCache.rowsArray[i].div;

      div.addEventListener("dblclick", handleDblClick.bind(this), false); //single and doubleclick... this will end bad.., maybe use other key wih click to edit?
      div.addEventListener("click", handleClick.bind(this), false);
      div.addEventListener("tabbing", handleTabbing.bind(this), false);
      div.addEventListener("contextmenu", onMouseDownRow.bind(this), false);
    }

    //this have to be after clcik since it will cancel if scroll event
    this.htmlCache.content.addEventListener("scroll", this.onScroll.bind(this));

    this.addResizableAndSortableEvent(); //this also includes the orderby click on header event

  };





  /****************************************************************************************************************************
   * correct columns witdth array, incase they have just defined the first 2, or none
   ****************************************************************************************************************************/
  correctColumnsWidthArray() {
    var newColumnWidth = [];
    for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
      var columnWidth = this.vGridConfig.columnWidthArray[i] || 100;
      newColumnWidth.push(columnWidth)
    }
    this.vGridConfig.columnWidthArray = newColumnWidth;
  };





  /****************************************************************************************************************************
   * sett large scroll limit, looks like *3 content height is a better match from lates testing
   ****************************************************************************************************************************/
  setLargeScrollLimit() {
    if (!this.vGridConfig.largeScrollLimit) {
      this.vGridConfig.largeScrollLimit = this.contentHeight * 3.3
      ;
    }
  };





  /****************************************************************************************************************************
   * add the html
   ****************************************************************************************************************************/
  addHtml() {

    //cache row template..
    this.cacheRowTemplate(null);

    //add needed html
    this.createGridHtmlWrapper(); //entire main grid, pretty much just adds a class
    this.createGridHtmlHeaderWrapper(); //adds header
    this.createGridHtmlContentWrapper(); //adds content/viewport we see
    this.createGridHtmlFooterWrapper(); //adds footer
    this.createGridHtmlScrollBodyWrapper(); //adds the scroll height
    this.createGridHtmlRowWrapper(); //adds html rows needed ++

    //update the scrollbars, so they show only if needed
    //pretty much just hides/shows -> left/right scroll
    this.updateGridScrollbars();
  };


  /****************************************************************************************************************************
   * will create the actual grid (cant be constructor since I call this when rebuilding)
   ****************************************************************************************************************************/
  init(isRebuild) {
    this.correctColumnsWidthArray(); //less mess later when doing it this way
    this.addHtml(); //add html
    this.addEvents(); //add events
    if (!isRebuild) {
      //todo: remeber scroll height , devide on rowheight, and set to what ever new is?
      this.vGridSelection.setMode(this.vGridConfig.isMultiSelect);
    }
    //
    if (this.vGridConfig.predefinedScrolltop) {
      this.setScrollTop(this.vGridConfig.predefinedScrolltop);
    }

    this.fillDataInRows(false); //fillDataInRows

    this.setLargeScrollLimit();
  };





  /****************************************************************************************************************************
   * redraws most parts of grid...
   ****************************************************************************************************************************/
  redrawGrid() {
    this.vGridElement.getElementsByClassName(this.vGridConfig.css.wrapper)[0].remove();
    this.htmlCache.rowsArray = [];
    this.htmlCache.header = null;
    this.htmlCache.content = null;
    this.htmlCache.footer = null;
    this.htmlCache.scrollBody = null;
    this.htmlCache.rowTemplate = null;

    this.init(true);
    this.fixHeaderWithBody();
  };





  /****************************************************************************************************************************
   * fixes header body width
   ****************************************************************************************************************************/
  fixHeaderWithBody() {
    var currentScrollLeft = this.htmlCache.content.scrollLeft;
    this.htmlCache.header.scrollLeft = currentScrollLeft;
    if (this.vGridConfig.lockedColumns > 0) { //todo in own function, its used a few places now
      //this have super bad performance in IE...
      currentScrollLeft = this.htmlCache.content.scrollLeft; //need the updated one...
      for (var lockedColNo = this.vGridConfig.lockedColumns; lockedColNo--;) {
        var fix = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.gridColumn + lockedColNo);
        //for(var i = 0; i < fix.length; i++){
        for (var i = fix.length; i--;) {
          fix[i].style.left = currentScrollLeft + "px";
          fix[i].style.zIndex = this.internalDragDropCount;
          fix[i].style.position = "relative";
        }
      }
    }
  };





  /****************************************************************************************************************************
   * rebuilds columns, used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  rebuildColumns() {
    this.correctColumnsWidthArray();
    this.htmlCache.rowTemplate = null;
    this.cacheRowTemplate(null);
    this.rebuildGridHeaderHtml();
    this.fillDataInRows(true);
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.updateGridScrollbars();
    this.fixHeaderWithBody();
  };





  /****************************************************************************************************************************
   * rebuilds columns and trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  columnChangeAndCollection(resetScrollToTop) {
    this.correctColumnsWidthArray();
    this.htmlCache.rowTemplate = null;
    this.cacheRowTemplate(null);
    this.rebuildGridHeaderHtml();
    this.fillDataInRows(true);
    this.updateSelectionOnAllRows();
    this.collectionChange(resetScrollToTop);
  };





  /****************************************************************************************************************************
   * trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  collectionChange(resetScrollToTop, scrollBottom) {

    //adjust scroller before updating, so it created unwanted side effects
    this.setScrollBodyHeightToVar();
    this.htmlCache.scrollBody.style.height = this.scrollBodyHeight + "px";
    var reset = false;
    if (resetScrollToTop === true) {
      this.htmlCache.content.scrollTop = 0;
    }
    if (this.scrollBodyHeight < this.htmlCache.content.scrollTop || scrollBottom) {
      var collectionLength = this.vGridConfig.getCollectionLength();
      var contentRows = parseInt(this.htmlCache.content.offsetHeight / this.vGridConfig.rowHeight);
      var scrollOffsetHeight = contentRows * this.vGridConfig.rowHeight;
      this.htmlCache.content.scrollTop = ((collectionLength * this.vGridConfig.rowHeight) - (scrollOffsetHeight))

    }




    this.updateGridScrollbars();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody();
    this.onNormalScrollingLarge();
    this.fillDataInRows(true);
    if (scrollBottom) {
      this.htmlCache.content.scrollTop = this.htmlCache.content.scrollTop + this.vGridConfig.rowHeight
    }


  };





  /****************************************************************************************************************************
   * helper function to handle change of data..
   * 21.02.2015: TODO: I need to debug these, have not been testing much... need to build better demo first
   ****************************************************************************************************************************/

  //tested
  setRowHeight(newHeight) {
    this.vGridConfig.rowHeight = newHeight;
    this.redrawGrid();
  };

  //tested
  setHeaderHeight(newHeight) {
    this.vGridConfig.headerHeight = newHeight;
    this.redrawGrid();
  };

  //tested
  setFooterHeight(newHeight) {
    this.vGridConfig.footerHeight = newHeight;
    this.redrawGrid();
  };

  //tested
  disableHeaderFilter() {
    this.vGridConfig.addFilter = false;
    this.rebuildGridHeaderHtml();
  };

  //tested
  enableHeaderFilter() {
    this.vGridConfig.addFilter = true;
    this.rebuildGridHeaderHtml();
  };

  //tested
  setHeaderFilterAtBottom() {
    this.vGridConfig.filterOnAtTop = false;
    this.rebuildGridHeaderHtml();
  };

  //tested
  setHeaderFilterAtTop() {
    this.vGridConfig.filterOnAtTop = true;
    this.rebuildGridHeaderHtml();
  };

  //tested todo: this need to be changed now
  setColumns(paramObj) {
    //todo: this needs a big update
    this.vGridConfig.headerArray = paramObj.headerArray;
    this.vGridConfig.attributeArray = paramObj.attributeArray;
    this.vGridConfig.columnWidthArray = paramObj.columnWidthArray;
  };


  getColumns() {
    //todo: this needs a big update
    return {
      "headerArray": this.vGridConfig.headerArray,
      "attributeArray": this.vGridConfig.attributeArray,
      "columnWidthArray": this.vGridConfig.columnWidthArray
    }
  };


  setLockedColumns(numberOfLockedColumns) {
    this.vGridConfig.lockedColumns = numberOfLockedColumns;
    this.rebuildColumns();

  };


  enableResizableColumns(option) {
    this.vGridConfig.isResizableHeaders = true;
    this.vGridConfig.resizableHeadersAndRows = option;
    this.rebuildGridHeaderHtml();
  };


  disableResizableColumns() {
    this.vGridConfig.isResizableHeaders = false;
    this.vGridConfig.resizableHeadersAndRows = false;
    this.rebuildGridHeaderHtml();

  };


  enableSortableColumns() {
    this.vGridConfig.isSortableHeader = true;
    this.rebuildGridHeaderHtml();
  };



  disableSortableColumns() {
    this.vGridConfig.isSortableHeader = false;
    this.rebuildGridHeaderHtml();
  };


  setMultiSelection(keepSelection) {
    this.vGridSelection.setMode("multible");
    if (!keepSelection) {
      this.vGridSelection.reset();
    }
    this.updateSelectionOnAllRows();
  };


  setSingleSelection(keepSelection) {
    this.vGridSelection.setMode("single");
    if (!keepSelection) {
      this.vGridSelection.reset();
    }
    this.updateSelectionOnAllRows();
  };


  disableSelection(keepSelection) {
    this.vGridSelection.setMode(null);
    if (!keepSelection) {
      this.vGridSelection.reset();
    }
    this.updateSelectionOnAllRows();
  };


  getSelectedRows() {
    return this.vGridSelection.getSelectedRows();
  };


  setSelectedRows(sel) {
    this.vGridSelection.setSelectedRows(sel);
    this.updateSelectionOnAllRows();
  };


  scrollBottom() {
    var collectionLength = this.vGridConfig.getCollectionLength();
    this.htmlCache.content.scrollTop = collectionLength * this.vGridConfig.rowHeight;
  };


  scrollTop() {
    this.htmlCache.content.scrollTop = 0;
  };


  setScrollTop(newTop) {
    this.htmlCache.content.scrollTop = newTop;
  };


  getScrollTop() {
    return this.htmlCache.content.scrollTop;
  };


  updateRow(no, clear) {
    this.fillDataIntoRow(no, clear)
  };

  clearHeaderSortFilter() {
    this.sortOrder = [];
    this.rebuildGridHeaderHtml();
  };

  setHeaderSortFilter(sortOrder) {
    this.sortOrder = sortOrder;
    this.rebuildGridHeaderHtml();
  };

  enableHeaderSort() {
    this.vGridConfig.sortOnHeaderClick = true;
    this.rebuildGridHeaderHtml();
  };

  disableHeaderSort(sortOrder) {
    this.vGridConfig.sortOnHeaderClick = false;
    this.rebuildGridHeaderHtml();
  };


} //end widget
