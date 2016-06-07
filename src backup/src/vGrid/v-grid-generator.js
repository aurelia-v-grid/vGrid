/*****************************************************************************************************************
 *    vGridGenerator
 *    This generates all html and adds the main events
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {ViewSlot} from 'aurelia-framework';

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


  get vGridScrollEvents() {
    if (this.vGrid) {
      return this.vGrid.vGridScrollEvents;
    } else {
      return null;
    }
  }


  /*************************************************************************************
   * internal vars
   *************************************************************************************/

  contentHeight = 0;
  gridHeight = 0;
  gridWidth = 0;
  scrollBodyHeight = 0;
  scrollBottomOnNext = false;

  //cache
  gridElement = null;
  headerElement = null;
  headerScrollElement = null;
  contentElement = null;
  footerElement = null;
  rowElementArray = []; //this contains top, viewslots and "div" is the html element
  contentScrollBodyElement = null;

  //viewPorts
  rowViewFactory = null;
  loadingScreenViewSlot = null;
  headerViewSlot = null;
  footerViewSlot = null;


  /****************************************************************************************************************************
   * will create the actual grid (cant be constructor since I call this when rebuilding)
   ****************************************************************************************************************************/
  init(isRebuild) {
    this.addHtml();
    this.addEvents();
    if (!isRebuild) {
      this.vGridSelection.setMode(this.vGridConfig.attMultiSelect);
    }
    this.updateGridScrollbars();
    this.rebindAllRowSlots();
    this.setLargeScrollLimit();
  }


  /****************************************************************************************************************************
   * add the html
   ****************************************************************************************************************************/
  addHtml() {
    //hetml elements
    this.createGridElement();
    this.createGridHeaderElement();
    this.createGridContentElement();
    this.createGridFooterElement();
    this.createGridScrollBodyElement();
    this.createGridRowElements();

    //loadingscreen viewslot
    this.createLoadingScreenViewSlot();
    this.createHeaderViewSlot();
    this.createRowViewSlots();
    if (this.vGridConfig.eventOnRemoteCall) {
      this.createFooterViewSlot()
    }
  }


  /****************************************************************************************************************************
   * add the events  (this is called during rebuild etc
   ****************************************************************************************************************************/
  addEvents() {
    //add all click events to rows
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var rowElement = this.rowElementArray[i].div;

      rowElement.addEventListener("dblclick", (e) => {
        var currentRow = parseInt(e.currentTarget.getAttribute("row"));
        this.vGridConfig.clickHandler(e, currentRow);
      }, false);

      rowElement.addEventListener("click", (e) => {
        var currentRow = parseInt(e.currentTarget.getAttribute("row"));
        this.vGridConfig.clickHandler(e, currentRow);
        if (this.vGridConfig.attMultiSelect !== undefined) {
          this.vGridSelection.setHightlight(e, currentRow, this);
        }
      }, false);

    }

    //this have to be after clcik since it will cancel if scroll event
    this.contentElement.addEventListener("scroll", (e)=> {
      if (this.vGridConfig.attRequestAnimationFrame) {
        requestAnimationFrame(() => {
          this.vGridScrollEvents.scrollEventHandler();
        });
      } else {
        this.vGridScrollEvents.scrollEventHandler();
      }
    });

    //fix bug when tabbing headers, and header is larger then content width
    this.headerElement.addEventListener("scroll", (e)=> {
      this.contentElement.scrollLeft = this.headerElement.scrollLeft;
      this.vGridScrollEvents.lastScrollLeft = this.headerElement.scrollLeft;

    });
    //this also includes the orderby click on header event
    this.addResizableAndSortableEvent();
  }


  /****************************************************************************************************************************
   * gets the main div to create grid in
   ****************************************************************************************************************************/
  createGridElement() {

    var x = document.createElement("DIV"); //create this a container for my 3 rows
    this.vGridElement.appendChild(x);
    this.vGridElement.style.display = "block"; //this was the issue for all my problems
    this.gridElement = x;

    //do this for I know very little about css, and doing it like this I didnt get those weird side effects
    //todo look at this again, do not like what Ive done here
    this.gridElement.classList.add(this.vGridConfig.css.wrapper);
    this.gridElement.style.position = "relative";
    this.gridElement.style.height = '100%';
    this.gridElement.style.width = "100%";

    //get default height and width
    this.gridHeight = this.gridElement.clientHeight;
    this.gridWidght = this.gridElement.clientWidth;

  }


  /****************************************************************************************************************************
   * add header div
   ****************************************************************************************************************************/
  createGridHeaderElement() {
    //create and append header div
    var header = document.createElement("DIV");
    header.classList.add(this.vGridConfig.css.mainHeader);
    header.style.height = this.vGridConfig.attHeaderHeight + "px";
    if (!this.headerElement) {
      this.gridElement.appendChild(header);
      this.headerElement = header;
    } else {
      this.headerElement.innerHTML = header.innerHTML;
    }
    this.headerScrollElement = document.createElement("DIV");
    this.headerScrollElement.classList.add(this.vGridConfig.css.row);
    this.headerScrollElement.classList.add(this.vGridConfig.css.rowHeader);
    this.headerScrollElement.style.height = this.vGridConfig.attHeaderHeight + "px";
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.headerElement.appendChild(this.headerScrollElement);
  }


  /****************************************************************************************************************************
   * add content div
   ****************************************************************************************************************************/
  createGridContentElement() {

    //calculate content height
    var gridWrapperHeight = this.gridHeight;
    var headerAndFooterHeight = this.vGridConfig.attHeaderHeight + this.vGridConfig.attFooterHeight;
    this.contentHeight = gridWrapperHeight - headerAndFooterHeight;

    //create and append content div
    this.contentElement = document.createElement("DIV");
    this.contentElement.classList.add(this.vGridConfig.css.mainContent);
    this.contentElement.style.height = this.contentHeight + "px";
    this.gridElement.appendChild(this.contentElement);

  }


  /****************************************************************************************************************************
   * adds the footer
   ****************************************************************************************************************************/
  createGridFooterElement() {
    //create and append
    this.footerElement = document.createElement("DIV");
    this.footerElement.classList.add(this.vGridConfig.css.mainFooter);
    this.footerElement.style.height = this.vGridConfig.attFooterHeight + "px";
    this.gridElement.appendChild(this.footerElement);
  }


  /****************************************************************************************************************************
   * add the scroll body
   ****************************************************************************************************************************/
  createGridScrollBodyElement() {
    this.setScrollBodyHeightToVar();
    //create and append
    this.contentScrollBodyElement = document.createElement("DIV");
    this.contentScrollBodyElement.classList.add(this.vGridConfig.css.scrollBody);
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.contentElement.appendChild(this.contentScrollBodyElement);
  }


  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  createGridRowElements() {
    //rows we need to fill up visible container
    var minimumRowsNeeded = parseInt(this.contentHeight / this.vGridConfig.attRowHeight, 10);

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
      row.classList.add(this.vGridConfig.css.row);
      //add alt/even css
      if (i % 2 === 1) {
        row.classList.add(this.vGridConfig.css.rowAlt);
      } else {
        row.classList.add(this.vGridConfig.css.rowEven);
      }

      row.style.height = this.vGridConfig.attRowHeight + "px";

      this.setRowTopValue([{
        div: row,
        top: 0
      }], 0, top);

      row.style.minWidth = this.gridElement.offsetWidth + "px";
      row.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";

      //inner magic
      row.innerHTML = ""; //? why Im I doing this? todo test... why

      //add to scroll body
      this.contentScrollBodyElement.appendChild(row);

      //push into our html cache for later use when scrolling
      //own for top so we get it faster
      this.rowElementArray.push({
        div: row,
        top: top
      });

      //set new top for next row
      top = top + this.vGridConfig.attRowHeight;

    }//end for loop
  }


  /****************************************************************************************************************************
   * creates loading screen
   ****************************************************************************************************************************/
  createLoadingScreenViewSlot() {

    var loadingScreentHtml = [
      '<div class="v-grid-overlay" if.bind="loading">',
      '</div>',
      '<div if.two-way="loading" class="v-grid-progress-indicator">',
      '<div class="v-grid-progress-bar" role="progressbar" style="width:100%">',
      '<span>${ loadingMessage }</span>',
      '</div>',
      '</div>'
    ];
    var viewFactory = this.vGrid.viewCompiler.compile('<template>' + loadingScreentHtml.join("") + '</template>', this.vGrid.viewResources);
    var view = viewFactory.create(this.vGrid.container);
    this.loadingScreenViewSlot = new ViewSlot(this.gridElement, true);
    this.loadingScreenViewSlot.add(view);
    //bind
    this.loadingScreenViewSlot.bind(this.vGrid, {
      bindingContext: this.vGrid,
      parentOverrideContext: this.vGrid.overrideContext
    });
    this.loadingScreenViewSlot.attached();
  }


  /****************************************************************************************************************************
   * creates the header viewslot
   ****************************************************************************************************************************/
  createHeaderViewSlot() {
    var viewFactory = this.getHeaderViewFactory();
    var view = viewFactory.create(this.vGrid.container);
    this.headerViewSlot = new ViewSlot(this.headerScrollElement, true);
    this.headerViewSlot.add(view);
    //bind
    let bindingContext = {};
    this.headerViewSlot.bind(bindingContext, {
      bindingContext: bindingContext,
      parentOverrideContext: this.vGrid.overrideContext
    });
    this.headerViewSlot.attached();
  }


  /****************************************************************************************************************************
   * creates the row viewslots
   ****************************************************************************************************************************/
  createRowViewSlots() {
    var rows = this.rowElementArray;
    for (var i = 0; i < rows.length; i++) {
      var viewFactory = this.getRowViewFactory();
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
   * creates the footer viewslots
   ****************************************************************************************************************************/
  createFooterViewSlot() {
    var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-pager></v-grid-pager></template>', this.vGrid.viewResources);
    var view = viewFactory.create(this.vGrid.container);

    this.footerViewSlot = new ViewSlot(this.footerElement, true);
    this.footerViewSlot.add(view);

    this.footerViewSlot.bind(this, {
      bindingContext: this,
      parentOverrideContext: this.vGrid.overrideContext
    });

    this.footerViewSlot.attached();
  }


  /****************************************************************************************************************************
   * fills data into rows (all)
   ****************************************************************************************************************************/
  rebindAllRowSlots() {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      var row = this.rowElementArray[i];
      this.vGridConfig.updateRowBinding(currentRow, row, true, true);
    }
  };


  /****************************************************************************************************************************
   * fills data into row, 1 row!
   ****************************************************************************************************************************/
  rebindRowNumber(rowno) {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      if (rowno === currentRow) {
        var row = this.rowElementArray[i];
        this.vGridConfig.updateRowBinding(currentRow, row, true, true);
      }
    }
  };


  /****************************************************************************************************************************
   * updates only selection on rows
   ****************************************************************************************************************************/
  updateSelectionOnAllRows() {
    var i;
    for (i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      if (this.vGridSelection.isSelected(currentRow)) {
        this.rowElementArray[i].div.classList.add(this.vGridConfig.css.rowSelected);
      } else {
        this.rowElementArray[i].div.classList.remove(this.vGridConfig.css.rowSelected);
      }
    }
  };


  /****************************************************************************************************************************
   * returns header template
   ****************************************************************************************************************************/
  getHeaderViewFactory() {
    var rowTemplate = "";
    if (this.vGrid.vGridConfig.repeater) {
      rowTemplate = this.vGrid.vGridConfig.repeatRowHeaderTemplate;
    } else {
      for (var i = 0; i < this.vGridConfig.columnLength; i++) {

        var style = `style="width:${this.vGridConfig.colConfig[i].width}px"`;
        var elementClass = `class="${this.vGridConfig.css.rowHeaderColumn + i}"`;
        var template = this.vGridConfig.colConfig[i].headerTemplate;

        rowTemplate = rowTemplate + `<v-grid-header-col ${style} ${elementClass} column-no="${i}">${template}</v-grid-header-col>`;
      }
    }
    var viewFactory = this.vGrid.viewCompiler.compile(`<template>${rowTemplate}</template>`, this.vGrid.viewResources);
    return viewFactory;
  };


  /****************************************************************************************************************************
   * returns row viewFactory, if it does not exist it creates it
   ****************************************************************************************************************************/
  getRowViewFactory() {
    var viewFactory;

    if (this.rowViewFactory !== null) {
      viewFactory = this.rowViewFactory;
    } else {
      var rowTemplate = "";
      if (this.vGrid.vGridConfig.repeater) {
        rowTemplate = '<template>' + this.vGridConfig.repeatRowTemplate + '</template>'
      } else {
        rowTemplate = '<template>';
        for (var i = 0; i < this.vGridConfig.columnLength; i++) {

          var style = `style="width:${this.vGridConfig.colConfig[i].width}px"`;
          var elementClass = `class="${this.vGridConfig.css.rowColumn + i}"`;
          var template = this.vGridConfig.colConfig[i].rowTemplate;

          rowTemplate = rowTemplate + `<v-grid-row-col ${style} ${elementClass} column-no=${i}>${template}</v-grid-row-col>`;
        }
        rowTemplate + '</template>';
      }
      viewFactory = this.vGrid.viewCompiler.compile(rowTemplate, this.vGrid.viewResources);
    }

    //cache template
    this.rowViewFactory = viewFactory;

    //return cache;
    return this.rowViewFactory

  };


  /****************************************************************************************************************************
   * get total column width
   ****************************************************************************************************************************/
  getTotalColumnWidth() {
    var total = 0;
    for (var i = 0; i < this.vGridConfig.columnLength; i++) {
      total = total + parseInt(this.vGridConfig.colConfig[i].width, 10);
    }
    return total;
  };


  /****************************************************************************************************************************
   * gets the row cache length...
   ****************************************************************************************************************************/
  getRowCacheLength() {
    return this.rowElementArray.length;
  };


  /****************************************************************************************************************************
   * set top value, here I could have failback to TOP instead of translate 3d
   ****************************************************************************************************************************/
  setRowTopValue(rowArray, elementNo, topValue) {
    rowArray[elementNo].div.style.transform = `translate3d(0px,${topValue}px, 0px)`;
    rowArray[elementNo].top = topValue;
  };


  /****************************************************************************************************************************
   * rebuild header div, needed if user sets new columns or something
   ****************************************************************************************************************************/
  rebuildGridHeaderHtmlAndViewSlot() {
    this.unbindDetachHeaderViewSlots();
    this.headerElement.removeChild(this.headerScrollElement);
    this.createGridHeaderElement();
    this.createHeaderViewSlot();
    this.addResizableAndSortableEvent();
  };


  /****************************************************************************************************************************
   * sets scroll body to interal variable
   ****************************************************************************************************************************/
  setScrollBodyHeightToVar() {
    var collectionLength = this.vGridConfig.getCollectionLength();
    this.scrollBodyHeight = collectionLength * this.vGridConfig.attRowHeight;
  };


  /****************************************************************************************************************************
   * add the scroll body, this is needed when user chnages columns or resize the columns, so main content knows if scrollbars is needed
   ****************************************************************************************************************************/
  correctRowAndScrollbodyWidth() {
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    for (var i = 0; i < this.rowElementArray.length; i++) {
      this.rowElementArray[i].div.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    }
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
  };


  /****************************************************************************************************************************
   *
   ****************************************************************************************************************************/
  correctHeaderAndScrollbodyWidth() {
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
  };


  /****************************************************************************************************************************
   * helper, removes rows, se minus height so we cant scroll to empty
   ****************************************************************************************************************************/
  hideRowsThatIsLargerThanCollection() {
    var currentRow = parseInt((this.vGridScrollEvents.lastScrollTop / this.vGridConfig.attRowHeight), 10);
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var row = this.rowElementArray[i];
      var rowTop = parseInt(row.top, 10);
      if (rowTop > ((this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.attRowHeight) && rowTop > (parseInt(this.contentElement.style.height) - this.vGridConfig.attRowHeight)) {
        this.setRowTopValue([row], 0, -5000 + i);
      }
    }
    //resort array
    this.rowElementArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });
  };


  /****************************************************************************************************************************
   * hiding scroll bars when not needed
   ****************************************************************************************************************************/
  updateGridScrollbars() {
    var collectionHeight = this.vGridConfig.getCollectionLength() * this.vGridConfig.attRowHeight + (this.vGridConfig.attRowHeight / 2);
    var bodyHeight = this.contentElement.offsetHeight;
    if (collectionHeight <= bodyHeight) {
      this.contentElement.scrollTop = 0;
      this.contentElement.style.overflow = "";
      this.contentElement.style.overflowY = "hidden";
      this.contentElement.style.overflowX = "hidden";
      this.headerElement.style.overflowY = "hidden";
    } else {
      this.contentElement.style.overflow = "";
      this.contentElement.style.overflowY = "scroll";
      this.contentElement.style.overflowX = "hidden";
      this.headerElement.style.overflowY = "scroll";
    }

    //todo, what to do when its a repeater ?
    if (this.contentElement.offsetWidth - 5 < this.getTotalColumnWidth()) {
      this.contentElement.style.overflowX = "scroll";
    }


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
   * unbind & detach the  row view slots
   ****************************************************************************************************************************/
  unbindDetachRowViewSlots() {
    var rows = this.rowElementArray;
    for (var i = 0; i < rows.length; i++) {
      rows[i].viewSlot.unbind();
      rows[i].viewSlot.detached();
      rows[i].viewSlot.removeAll();
      rows[i].viewSlot = null;
      rows[i].div.innerHTML = "";
      this.rowViewFactory = null;
    }
  }


  /****************************************************************************************************************************
   * unbind & detach the  header view slot
   ****************************************************************************************************************************/
  unbindDetachHeaderViewSlots() {
    this.headerViewSlot.unbind();
    this.headerViewSlot.detached();
    this.headerViewSlot.removeAll();
    this.headerViewSlot = null;
  }


  /****************************************************************************************************************************
   * unbind & detach the  header view slot
   ****************************************************************************************************************************/
  unbindDetachFooterViewSlots() {
    if (this.footerViewSlot) {
      this.footerViewSlot.unbind();
      this.footerViewSlot.detached();
      this.footerViewSlot.removeAll();
      this.footerViewSlot = null;
    }
  }


  /****************************************************************************************************************************
   * unbind & detach the  header view slot
   ****************************************************************************************************************************/
  unbindDetachLoadingScreenViewSlots() {
    if (this.loadingScreenViewSlot) {
      this.loadingScreenViewSlot.unbind();
      this.loadingScreenViewSlot.detached();
      this.loadingScreenViewSlot.removeAll();
      this.loadingScreenViewSlot = null;
    }
  }


  /****************************************************************************************************************************
   * unbind & detach all view slots
   ****************************************************************************************************************************/
  unbindDetachViewSlots() {
    this.unbindDetachRowViewSlots();
    this.unbindDetachHeaderViewSlots();
    this.unbindDetachFooterViewSlots();
    this.unbindDetachLoadingScreenViewSlots();
  }


  /****************************************************************************************************************************
   * recreate the row view slots
   ****************************************************************************************************************************/
  recreateRowViewSlots() {
    this.unbindDetachRowViewSlots();
    this.createRowViewSlots();
  }


  /****************************************************************************************************************************
   * redraws most parts of grid...
   ****************************************************************************************************************************/
  redrawGrid() {
    this.unbindDetachViewSlots();
    this.vGridElement.getElementsByClassName(this.vGridConfig.css.wrapper)[0].remove();
    this.rowElementArray = null;
    this.rowElementArray = [];
    this.headerElement = null;
    this.contentElement = null;
    this.footerElement = null;
    this.contentScrollBodyElement = null;
    this.rowViewFactory = null;
    this.init(true);
    this.fixHeaderWithBody();
  };


  /****************************************************************************************************************************
   * fixes header body width
   ****************************************************************************************************************************/
  fixHeaderWithBody() {
    var currentScrollLeft = this.contentElement.scrollLeft;
    this.headerElement.scrollLeft = currentScrollLeft;
  };


  /****************************************************************************************************************************
   * rebuilds columns incl header row, used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  rebuildColumns() {
    this.rebuildGridHeaderHtmlAndViewSlot();
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.updateGridScrollbars();
    this.fixHeaderWithBody();
  };


  /****************************************************************************************************************************
   * rebuilds columns (not header), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  rebuildColumnsRows() {
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody()
  };


  /****************************************************************************************************************************
   * rebuilds columns and trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  columnChangeAndCollection(resetScrollToTop) {
    this.rebuildGridHeaderHtmlAndViewSlot();
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
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
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
    var reset = false;
    if (resetScrollToTop === true) {
      this.contentElement.scrollTop = 0;
    }
    if (this.scrollBodyHeight < this.contentElement.scrollTop || scrollBottom) {
      var collectionLength = this.vGridConfig.getCollectionLength();
      var contentRows = parseInt(this.contentElement.offsetHeight / this.vGridConfig.attRowHeight);
      var scrollOffsetHeight = contentRows * this.vGridConfig.attRowHeight;
      this.contentElement.scrollTop = ((collectionLength * this.vGridConfig.attRowHeight) - (scrollOffsetHeight))

    }
    //reset scroll to bottom next.
    this.updateGridScrollbars();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody();
    this.vGridScrollEvents.onLargeScroll();
    this.rebindAllRowSlots();
    if (scrollBottom) {
      this.contentElement.scrollTop = this.contentElement.scrollTop + this.vGridConfig.attRowHeight;
    }
    //if I dont do this, chrome fails...
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight - 1 + "px";
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + 1 + "px";
  };


  /****************************************************************************************************************************
   * add the events  , info his is called everytime I rebuild headers, easier to rebuild then to have any logic
   ****************************************************************************************************************************/
  addResizableAndSortableEvent() {
    //resize headers
    if (this.vGridConfig.attResizableHeaders) {
      this.vGridResizable.init();
    }
    //sortable columns
    if (this.vGridConfig.attSortableHeader) {
      this.vGridSortable.init()
    }
  };


}
