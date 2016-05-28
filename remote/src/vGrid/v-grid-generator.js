/*****************************************************************************************************************
 *    vGridGenerator
 *    This generates all html and handles the scrolling, row clicks etc
 *    Created by vegar ringdal
 *    26-03-2016- started to test if I could just write it as a pure es6 class - this is not in use
 *
 ****************************************************************************************************************/
import {ViewSlot} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {ViewSlot} from 'aurelia-templating';


export class VGridGenerator {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }

  /***************************************************************************************
   * getters/setters to make it easier
   ***************************************************************************************/

  get vGridSelection() {
    if (this.vGrid) {
      return this.vGrid.vGridSelection;
    } else {
      return null;
    }
  }

  get vGridConfig() {
    if (this.vGrid) {
      return this.vGrid.vGridConfig;
    } else {
      return null;
    }
  }

  get vGridCellHelper() {
    if (this.vGrid) {
      return this.vGrid.vGridCellHelper;
    } else {
      return null;
    }
  }

  get vGridElement() {
    if (this.vGrid) {
      return this.vGrid.element;
    } else {
      return null;
    }
  }

  get vGridSortable() {
    if (this.vGrid) {
      return this.vGrid.vGridSortable;
    } else {
      return null;
    }
  }

  get vGridResizable() {
    if (this.vGrid) {
      return this.vGrid.vGridResizable;
    } else {
      return null;
    }
  }


  /*************************************************************************************
   * internal vars
   *************************************************************************************/

  contentHeight = 0;          //internal
  gridHeight = 0;             //internal
  gridWidth = 0;              //internal
  scrollBodyHeight = 0;
  scrollBottomOnNext = false;   // internal var to know if user wants to scroll to bottom next time array abserver gets called move to vgridconfig?

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
    lastScrollLeft: 0,    //used for stopping weird scrolling to left
    isScrollBarScrolling: false,          //used for knowing if we can update when doing scrolling, used with time var under
    timer: null,          //timer for stopping updating, "getDataScrollDelay" is the timeout for this
    scrollCallbackTimer: null
  };


  /****************************************************************************************************************************
   * fills data into rows (all)
   ****************************************************************************************************************************/
  fillDataInRows() {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
      var row = this.htmlCache.rowsArray[i];
      this.insertRowMarkup(currentRow, row, true, true);
    }
  };


  /****************************************************************************************************************************
   * fills data into row, 1 row!
   ****************************************************************************************************************************/
  fillDataIntoRow(rowno) {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.htmlCache.rowsArray[i].top / this.vGridConfig.rowHeight;
      if (rowno === currentRow) {
        var row = this.htmlCache.rowsArray[i];
        this.insertRowMarkup(currentRow, row, true, true);
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
  getHeaderTemplate() {
    var rowTemplate = "";
    for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
      rowTemplate = rowTemplate + `<v-grid-header-col v-grid-context-menu-header column-no="${i}"></v-grid-header-col>`;
    }
    return rowTemplate;
  };


  /****************************************************************************************************************************
   * returns rowTemplate
   ****************************************************************************************************************************/
  getRowTemplate() {
    var rowTemplate = "";
    if (this.htmlCache.rowTemplate !== null) {
      rowTemplate = this.htmlCache.rowTemplate;
    } else {
      if (this.vGrid.vGridConfig.repeater) {
        if (this.vGrid.vGridConfig.repeatTemplate.indexOf("template") === -1) {
          return '<template>' + this.vGrid.vGridConfig.repeatTemplate + '</template>'
        } else {
          return this.vGrid.vGridConfig.repeatTemplate;
        }

      } else {
        rowTemplate = '<template>';
        for (var i = 0; i < this.vGridConfig.attributeArray.length; i++) {
          rowTemplate = rowTemplate + `<v-grid-row-col v-grid-context-menu-cell column-no=${i}></v-grid-row-col>`;
        }
      }
    }
    return rowTemplate + '</template>';
  };


  /****************************************************************************************************************************
   * HTML cache.... no idea if this helps really, but lets use it...
   ****************************************************************************************************************************/
  cacheRowTemplate(template) {
    this.htmlCache.rowTemplate = null;
    this.htmlCache.rowTemplate = template || this.getRowTemplate();
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
   * returns row with data from template
   ****************************************************************************************************************************/
  createRowMarkup(entity, attributeNames) {
    var tempColumns = document.createElement("DIV");
    tempColumns.innerHTML = this.getRowTemplate(attributeNames);
    return tempColumns.innerHTML;
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

    var row = document.createElement("DIV");
    row.className = this.vGridConfig.css.row + " " + this.vGridConfig.css.rowHeader;
    //row.style.top = top + "px";
    row.style.height = this.vGridConfig.headerHeight + "px";
    row.style.width = this.getTotalColumnWidth() + "px";
    this.htmlCache.header.appendChild(row);

    var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.viewResources);
    var view = viewFactory.create(this.vGrid.container);
    this.headerViewSlot = new ViewSlot(this.htmlCache.header.firstChild, true);
    this.headerViewSlot.add(view);
    let bindingContext = {};
    this.headerViewSlot.bind(bindingContext, {
      bindingContext: bindingContext,
      parentOverrideContext: this.vGrid.overrideContext
    });
    this.headerViewSlot.attached();


  };


  /****************************************************************************************************************************
   * rebuild header div, needed if user sets new columns or something
   ****************************************************************************************************************************/
  rebuildGridHeaderHtml() {
    //get current scrollleft, so we can set it again after.
    var getScrollLeft = this.htmlCache.header.firstChild.style.left;
    this.htmlCache.header.removeChild(this.htmlCache.header.firstChild);

    var row = document.createElement("DIV");
    row.className = this.vGridConfig.css.row + " " + this.vGridConfig.css.rowHeader;
    row.style.height = this.vGridConfig.headerHeight + "px";
    row.style.width = this.getTotalColumnWidth() + "px";
    this.htmlCache.header.appendChild(row);

    var viewFactory = this.vGrid.viewCompiler.compile('<template>' + this.getHeaderTemplate() + '</template>', this.vGrid.viewResources);
    var view = viewFactory.create(this.vGrid.container);
    this.headerViewSlot.unbind();
    this.headerViewSlot.detached();
    this.headerViewSlot.removeAll();
    this.headerViewSlot = null;
    this.headerViewSlot = new ViewSlot(this.htmlCache.header.firstChild, true);
    this.headerViewSlot.add(view);
    let bindingContext = {};
    this.headerViewSlot.bind(bindingContext, {
      bindingContext: bindingContext,
      parentOverrideContext: this.vGrid.overrideContext
    });
    this.headerViewSlot.attached();

    this.addResizableAndSortableEvent();

    //get back last scrollleft
    this.htmlCache.header.firstChild.style.left = getScrollLeft;
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

    if (this.vGridConfig.eventOnRemoteCall) {
      var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-pager></v-grid-pager></template>', this.vGrid.viewResources);
      var view = viewFactory.create(this.vGrid.container);
      this.footerViewSlot = new ViewSlot(this.htmlCache.footer, true);
      this.footerViewSlot.add(view);

      this.footerViewSlot.bind(this, {
        bindingContext: this,
        parentOverrideContext: this.vGrid.overrideContext
      });
      this.footerViewSlot.attached();
    }

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
    this.htmlCache.header.firstChild.style.width = this.getTotalColumnWidth() + "px";
  };


  /****************************************************************************************************************************
   *
   ****************************************************************************************************************************/
  correctHeaderAndScrollbodyWidth() {
    this.htmlCache.scrollBody.style.width = this.getTotalColumnWidth() + "px";
    this.htmlCache.header.firstChild.style.width = this.getTotalColumnWidth() + "px";
  };


  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  createGridHtmlRowWrapper() {
    //rows we need to fill up visible container
    var minimumRowsNeeded = (parseInt(this.contentHeight / this.vGridConfig.rowHeight, 10));

    if (this.vGridConfig.largeBuffer) {
      minimumRowsNeeded = minimumRowsNeeded * 3;
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
      row.innerHTML = ""; //? why Im I doing this? todo test... why

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

    }//end for loop


  };


  /****************************************************************************************************************************
   * calls user for element, user haveto use callback here, might also need to fetch data first..
   ****************************************************************************************************************************/
  insertRowMarkup(rowNo, row, isDownScroll, isLargeScroll) {
    //called when drawing row
    //lets ask for our data, and insert it into row
    this.vGridConfig.getDataElement(rowNo, isDownScroll, isLargeScroll,
      (entity) => {

        row.div.setAttribute("row", rowNo);


        if (entity === "") {
          let bindingContext = {};
          row.viewSlot.bind(bindingContext, {
            bindingContext: bindingContext,
            parentOverrideContext: this.vGrid.overrideContext
          });
        }


        if (entity !== "" && row.viewSlot !== null) {
          let bindingContext = {};
          for (var k in entity) {
            if (entity.hasOwnProperty(k)) {
              if (bindingContext[k] !== entity[k]) {
                bindingContext[k] = entity[k];
              }
            }
          }
          bindingContext.currentEntityRef = this.vGrid.vGridCollectionFiltered[rowNo];
          row.viewSlot.bind(bindingContext, {
            bindingContext: bindingContext,
            parentOverrideContext: this.vGrid.overrideContext
          });


        }

        if (entity === undefined || entity === "") {
          row.div.style.display = "none";
        } else {
          row.div.style.display = "block";
        }


        //add alt/even css
        if (rowNo % 2 === 1) {
          if (row.div.classList.contains(this.vGridConfig.css.rowEven)) {
            row.div.classList.remove(this.vGridConfig.css.rowEven);
            row.div.classList.add(this.vGridConfig.css.rowAlt);
          }

        } else {
          if (row.div.classList.contains(this.vGridConfig.css.rowAlt)) {
            row.div.classList.remove(this.vGridConfig.css.rowAlt);
            row.div.classList.add(this.vGridConfig.css.rowEven);
          }
        }

        //set highlight
        if (this.vGridSelection.isSelected(rowNo)) {
          row.div.classList.add(this.vGridConfig.css.rowSelected)
        } else {
          row.div.classList.remove(this.vGridConfig.css.rowSelected)
        }


      });
  };


  /****************************************************************************************************************************
   * option to scrollbars scrolling where we update all the time and dont use timeout
   ****************************************************************************************************************************/
  onNormalScrollingLarge() {

    this.scrollVars.lastScrollTop = this.htmlCache.content.scrollTop;

    if (this.vGridConfig.getCollectionLength() <= this.htmlCache.rowsArray.length) {
      this.scrollVars.lastScrollTop = 0;
    }


    //vars
    var rowHeight = this.vGridConfig.rowHeight;
    var bodyHeight = this.htmlCache.content.clientHeight;
    var currentRow = parseInt(this.scrollVars.lastScrollTop / rowHeight, 10);
    var firstRow = parseInt(this.htmlCache.content.scrollTop / rowHeight, 10);
    var currentRowTop = rowHeight * currentRow;
    var firstRowTop = rowHeight * firstRow;
    var collectionLength = this.vGridConfig.getCollectionLength();


    //for setting after
    var setAfter = (cacheRowNumber) => {
      var row = this.htmlCache.rowsArray[cacheRowNumber];
      this.setRowTopValue([row], 0, currentRowTop);
      currentRowTop = currentRowTop + rowHeight;
    };


    //for setting before (when hitting bottom)
    var setBefore = (cacheRowNumber) => {
      var row = this.htmlCache.rowsArray[cacheRowNumber];
      firstRowTop = firstRowTop - rowHeight;
      this.setRowTopValue([row], 0, firstRowTop);
    };


    //for setting before (when hitting bottom)
    var setHiddenFromView = (cacheRowNumber) => {
      var row = this.htmlCache.rowsArray[cacheRowNumber];
      this.setRowTopValue([row], 0, -(currentRowTop + (this.vGridConfig.rowHeight * 50)));
    };

    //loop row html cache
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var moved = false;
      switch (true) {
        case currentRow >= 0 && currentRow <= collectionLength - 1:
          setAfter(i);
          moved = true;
          break;
        case currentRow >= collectionLength && (collectionLength * rowHeight) >= bodyHeight:
          setBefore(i);
          moved = true;
          break;
      }
      if (!moved) {
        if (currentRow >= collectionLength && (currentRowTop - rowHeight) >= bodyHeight) {
          setHiddenFromView(i);
        } else {
          //if this triggers the collection have been removed, so really just need to place out the rows
          if (currentRow >= collectionLength) {
            setAfter(i);
          }
        }
      }

      currentRow++;
    }


    //I now sort the array again.
    this.htmlCache.rowsArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });

    //update row data
    this.fillDataInRows();
  };


  /****************************************************************************************************************************
   * add the rows to scroll div (for normal scrolling when not using scrollbars)
   ****************************************************************************************************************************/
  onNormalScrolling(isDownScroll, currentScrollTop) {

    //check is user have preformed big scroll
    var currentScrollTop = this.htmlCache.content.scrollTop;
    if (this.scrollVars.isScrollBarScrolling === false) {
      var newTopValue;
      var currentRow = parseInt((this.scrollVars.lastScrollTop / this.vGridConfig.rowHeight), 10);
      var collectionHeight = this.vGridConfig.rowHeight * this.getRowCacheLength();
      var rowHeight = this.vGridConfig.rowHeight;

      //loop our row html cache
      for (var i = 0; i < this.getRowCacheLength(); i++) {

        var row = this.htmlCache.rowsArray[i];
        var rowTop = parseInt(row.top, 10);
        var update = false;


        if (isDownScroll) {
          this.lastScrollType = "down";
          if (rowTop < (currentScrollTop - rowHeight)) {
            update = true;
            newTopValue = rowTop + collectionHeight;
            currentRow = (rowTop + collectionHeight) / rowHeight;
          }

          //if for some reason the new rowtop is higher then collection, and content height (for cases where very small collection)
          if (rowTop > ((this.vGridConfig.getCollectionLength() - 1) * rowHeight) && rowTop > parseInt(this.htmlCache.content.style.height)) {
            update = false;
            this.setRowTopValue([row], 0, -((rowHeight * i) + (rowHeight * 50)));
          }

        } else {
          this.lastScrollType = "up";
          if (rowTop > ((currentScrollTop + this.contentHeight))) {
            update = true;
            newTopValue = rowTop - collectionHeight;
            currentRow = (rowTop - collectionHeight) / rowHeight;
          }

        }

        //update data
        if (update === true && currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
          this.setRowTopValue([row], 0, newTopValue);
          this.insertRowMarkup(currentRow, row, isDownScroll, false);
        }

      }

      //sort the cache array so we loop in correct order
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
    //this.scrollVars.firstTop = currentRow * this.vGridConfig.rowHeight;
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
   * option to scrollbars scrolling where we dont update all the time and use timeout (
   * plan was to use this with virtual scrolling with datasource using chaching to fetch data, you dont want to try and get 500 k rows in 5 sec
   ****************************************************************************************************************************/
  onScrollbarScrolling() {
    //set halt var to true, so small scroll will be stopped, will be laggy else
    this.scrollVars.isScrollBarScrolling = true;

    //delay before doing update
    var timeout = this.vGridConfig.dataScrollDelay;

    //clear scroll timeout
    clearTimeout(this.scrollVars.timer);

    //set timeout, incase user is still scrolling
    this.scrollVars.timer = setTimeout(() => {
      this.onNormalScrollingLarge();
      this.scrollVars.isScrollBarScrolling = false;
    }, timeout);


  };


  /****************************************************************************************************************************
   * fixes scrolling / top of divs
   ****************************************************************************************************************************/
  onScroll() {


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
   * add the events  , info his is called everytime I rebuild headers, easier to rebuild then to have any logic
   ****************************************************************************************************************************/
  addResizableAndSortableEvent() {

    //header click
    if (this.vGridConfig.sortOnHeaderClick) {
      var orderByClick = (event) => {
        this.vGridConfig.onOrderBy(event, () => {
          this.rebuildGridHeaderHtml();
        });
      };

      //get inputs
      var orderBy = this.vGridElement.querySelectorAll("." + this.vGridConfig.css.orderHandle);
      for (var i = 0; i < orderBy.length; i++) {
        orderBy[i].addEventListener("click", orderByClick.bind(this), false);
      }
    }

    //resize headers
    if (this.vGridConfig.isResizableHeaders) {
      this.vGridResizable.init();
    }

    //sortable columns
    if (this.vGridConfig.isSortableHeader) {
      this.vGridSortable.init()
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

    var handleTabbing = (e) => {
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
      this.vGridConfig.largeScrollLimit = this.contentHeight * 1.5;
    }
  };


  /****************************************************************************************************************************
   * add the html
   ****************************************************************************************************************************/
  addHtml() {

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
   * creates the row viewslots
   ****************************************************************************************************************************/
  createViewSlots() {

    var rows = this.htmlCache.rowsArray;
    for (var i = 0; i < rows.length; i++) {

      var viewFactory = this.vGrid.viewCompiler.compile(this.getRowTemplate(), this.vGrid.viewResources);
      var view = viewFactory.create(this.vGrid.container);
      rows[i].viewSlot = new ViewSlot(rows[i].div, true);
      rows[i].viewSlot.add(view);
      let bindingContext = {};
      rows[i].viewSlot.bind(bindingContext, {
        bindingContext: bindingContext,
        parentOverrideContext: this.vGrid.overrideContext
      });
      rows[i].viewSlot.attached();

    }
  }


  /****************************************************************************************************************************
   * recreate the row view slots
   ****************************************************************************************************************************/
  recreateViewSlots() {
    var rows = this.htmlCache.rowsArray;
    for (var i = 0; i < rows.length; i++) {
      rows[i].viewSlot.unbind();
      rows[i].viewSlot.detached();
      rows[i].viewSlot.removeAll();
      rows[i].viewSlot = null;
      rows[i].div.innerHTML = "";
      this.htmlCache.rowTemplate = null;
      var viewFactory = this.vGrid.viewCompiler.compile(this.getRowTemplate(), this.vGrid.viewResources);
      var view = viewFactory.create(this.vGrid.container);
      rows[i].viewSlot = new ViewSlot(rows[i].div, true);
      rows[i].viewSlot.add(view);
      let bindingContext = {};
      rows[i].viewSlot.bind(bindingContext, {
        bindingContext: bindingContext,
        parentOverrideContext: this.vGrid.overrideContext
      });
      rows[i].viewSlot.attached();
    }
  }


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
    this.createViewSlots();
    this.fillDataInRows(); //fillDataInRows
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
  };


  /****************************************************************************************************************************
   * rebuilds columns incl header row, used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  rebuildColumns() {
    this.correctColumnsWidthArray();
    this.rebuildGridHeaderHtml();
    this.recreateViewSlots();
    this.fillDataInRows();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.updateGridScrollbars();
    this.fixHeaderWithBody();
  };


  /****************************************************************************************************************************
   * rebuilds columns (not header), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  rebuildColumnsRows() {
    this.recreateViewSlots();
    this.fillDataInRows();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody()
  };


  /****************************************************************************************************************************
   * rebuilds columns and trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  columnChangeAndCollection(resetScrollToTop) {
    this.correctColumnsWidthArray();
    this.rebuildGridHeaderHtml();
    this.recreateViewSlots();
    this.fillDataInRows();
    this.updateSelectionOnAllRows();
    this.collectionChange(resetScrollToTop);
  };


  /****************************************************************************************************************************
   * trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  collectionChange(resetScrollToTop, scrollBottom) {


    if (this.scrollBottomOnNext) {
      //if overriden
      scrollBottom = true;
      this.scrollBottomOnNext = false;
    }

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

    //reset scroll to bottom next.

    this.updateGridScrollbars();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody();
    this.onNormalScrollingLarge();
    this.fillDataInRows();
    if (scrollBottom) {
      this.htmlCache.content.scrollTop = this.htmlCache.content.scrollTop + this.vGridConfig.rowHeight;
    }

    //if I dont do this, chrome fails...
    this.htmlCache.scrollBody.style.height = this.scrollBodyHeight - 1 + "px";
    this.htmlCache.scrollBody.style.height = this.scrollBodyHeight + 1 + "px";


  };


  setColumns(paramObj) {
    //todo: this needs a big update
    this.vGridConfig.attributeArray = paramObj.colAttrArray;
    this.vGridConfig.columnWidthArray = paramObj.colWidthArray;
    this.vGridConfig.headerArray = paramObj.colHeaderArray;
    this.vGridConfig.filterArray = paramObj.colFilterArray;
    this.vGridConfig.filterOnKeyArray = paramObj.colFilterOnKeyArray;
    this.vGridConfig.colCustomArray = paramObj.colCustomArray;
  };


  getColumns() {
    //todo: this needs a big update
    return {
      "colAttrArray": this.vGridConfig.attributeArray.slice(),
      "colWidthArray": this.vGridConfig.columnWidthArray.slice(),
      "colHeaderArray": this.vGridConfig.headerArray.slice(),
      "colFilterArray": this.vGridConfig.filterArray.slice(),
      "colFilterOnKeyArray": this.vGridConfig.filterOnKeyArray.slice(),
      "colCustomArray": this.vGridConfig.colCustomArray.slice()
    }
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


  scrollBottomNext() {
    this.scrollBottomOnNext = true;
  };


  getScrollTop() {
    return this.htmlCache.content.scrollTop;
  };


  updateRow(no) {
    this.fillDataIntoRow(no)
  };

  setEditMode(value) {
    this.vGridConfig.editMode = value ? true : false;
    this.fillDataInRows();
  };

  clearHeaderSortFilter() {
    this.vGrid.vGridSort.reset();
    this.rebuildGridHeaderHtml();
  };

  setHeaderSortFilter() {
    this.rebuildGridHeaderHtml();
  };


  //access to gridSelection
  selection = this.vGridSelection;


  //simple csv report from whats shown in the grid/filtered


} //end widget
