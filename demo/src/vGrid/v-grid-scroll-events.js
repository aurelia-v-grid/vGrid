/*****************************************************************************************************************
 *    VGridScrollEvents
 *    This just have all the scroll functions the vGridGenerator needs
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridScrollEvents {

  constructor(vGrid) {
    this.vGrid = vGrid;
    this.lastScrollTop = 0;
    this.lastScrollLeft = 0;
    this.isScrollBarScrolling = false;
    this.scrollbarScrollingTimer = null;
    this.lastScrollType = null
  }

  get vGridGenerator() {
    if (this.vGrid) {
      return this.vGrid.vGridGenerator;
    } else {
      return null;
    }
  }

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

  /****************************************************************************************************************************
   * option to scrollbars scrolling where we update all the time and dont use timeout
   ****************************************************************************************************************************/
  onLargeScroll() {

    this.lastScrollTop = this.vGridGenerator.contentElement.scrollTop;

    if (this.vGridConfig.getCollectionLength() <= this.vGridGenerator.rowElementArray.length) {
      this.lastScrollTop = 0;
    }


    //vars
    var rowHeight = this.vGridConfig.attRowHeight;
    var bodyHeight = this.vGridGenerator.contentElement.clientHeight;
    var currentRow = parseInt(this.lastScrollTop / rowHeight, 10);
    var firstRow = parseInt(this.vGridGenerator.contentElement.scrollTop / rowHeight, 10);
    var currentRowTop = rowHeight * currentRow;
    var firstRowTop = rowHeight * firstRow;
    var collectionLength = this.vGridConfig.getCollectionLength();


    //for setting after
    var setAfter = (cacheRowNumber) => {
      var row = this.vGridGenerator.rowElementArray[cacheRowNumber];
      this.vGridGenerator.setRowTopValue([row], 0, currentRowTop);
      currentRowTop = currentRowTop + rowHeight;
    };


    //for setting before (when hitting bottom)
    var setBefore = (cacheRowNumber) => {
      var row = this.vGridGenerator.rowElementArray[cacheRowNumber];
      firstRowTop = firstRowTop - rowHeight;
      this.vGridGenerator.setRowTopValue([row], 0, firstRowTop);
    };


    //for setting before (when hitting bottom)
    var setHiddenFromView = (cacheRowNumber) => {
      var row = this.vGridGenerator.rowElementArray[cacheRowNumber];
      this.vGridGenerator.setRowTopValue([row], 0, -(currentRowTop + (this.vGridConfig.attRowHeight * 50)));
    };

    //loop row html cache
    for (var i = 0; i < this.vGridGenerator.getRowCacheLength(); i++) {
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
    this.vGridGenerator.rowElementArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });

    //update row data
    this.vGridGenerator.fillDataInRows();
  };


  /****************************************************************************************************************************
   * add the rows to scroll div (for normal scrolling when not using scrollbars)
   ****************************************************************************************************************************/
  onSmallScroll(isDownScroll, currentScrollTop) {

    //check is user have preformed big scroll
    var currentScrollTop = this.vGridGenerator.contentElement.scrollTop;
    if (this.isScrollBarScrolling === false) {


      var newTopValue;
      var currentRow = parseInt((this.lastScrollTop / this.vGridConfig.attRowHeight), 10);
      var collectionHeight = this.vGridConfig.attRowHeight * this.vGridGenerator.getRowCacheLength();
      var rowHeight = this.vGridConfig.attRowHeight;

      //loop our row html cache
      for (var i = 0; i < this.vGridGenerator.getRowCacheLength(); i++) {

        var row = this.vGridGenerator.rowElementArray[i];
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
          if (rowTop > ((this.vGridConfig.getCollectionLength() - 1) * rowHeight) && rowTop > this.vGridGenerator.contentHeight) {
            update = false;
            this.vGridGenerator.setRowTopValue([row], 0, -((rowHeight * i) + (rowHeight * 50)));
          }

        } else {
          this.lastScrollType = "up";
          if (rowTop > (currentScrollTop + this.vGridGenerator.contentHeight)) {
            update = true;
            newTopValue = rowTop - collectionHeight;
            currentRow = (rowTop - collectionHeight) / rowHeight;
          }

        }

        //update data
        if (update === true && currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
          this.vGridGenerator.setRowTopValue([row], 0, newTopValue);
          this.vGridGenerator.insertRowMarkup(currentRow, row, isDownScroll, false);
        }

      }

      //sort the cache array so we loop in correct order
      this.vGridGenerator.rowElementArray.sort(
        function (a, b) {
          return parseInt(a.top) - parseInt(b.top)
        });

    } else {

      //just in case user scrolls big then small, do not want to update before he stops
      this.onScrollbarScrolling()
    }

  };


  /****************************************************************************************************************************
   * option to scrollbars scrolling where we dont update all the time and use timeout (
   * plan was to use this with virtual scrolling with datasource using chaching to fetch data, you dont want to try and get 500 k rows in 5 sec
   ****************************************************************************************************************************/
  onScrollbarScrolling() {
    //set halt var to true, so small scroll will be stopped, will be laggy else
    this.isScrollBarScrolling = true;

    //delay before doing update
    var timeout = this.vGridConfig.attDataScrollDelay;

    //clear scroll timeout
    clearTimeout(this.scrollbarScrollingTimer);

    //set timeout, incase user is still scrolling
    this.scrollbarScrollingTimer = setTimeout(() => {
      this.onLargeScroll();
      this.isScrollBarScrolling = false;
    }, timeout);


  };


  /****************************************************************************************************************************
   * fixes scrolling / top of divs
   ****************************************************************************************************************************/
  scrollEventHandler() {


    var currentScrollTop = this.vGridGenerator.contentElement.scrollTop;
    var currentScrollLeft = this.vGridGenerator.contentElement.scrollLeft;


    //are we scrolling ?
    if (currentScrollTop !== this.lastScrollTop) {
      //is vert scroll

      //stop left scroll...
      if (currentScrollLeft !== 0) {
        this.vGridGenerator.contentElement.scrollLeft = this.lastScrollLeft;
        this.vGridGenerator.headerElement.scrollLeft = this.lastScrollLeft
      }

      //check if down scroll.
      var isDownScroll = true;
      if (currentScrollTop < this.lastScrollTop) {
        isDownScroll = false;
      }

      //check if big scroll (split m into 2.. simple to read)
      var isLargeScroll;
      switch (true) {
        case currentScrollTop > this.lastScrollTop + this.vGridConfig.largeScrollLimit:
        case currentScrollTop < this.lastScrollTop - this.vGridConfig.largeScrollLimit:
          isLargeScroll = true;
          break;
        default:
          isLargeScroll = false;
      }

      //reset scroll top
      this.lastScrollTop = currentScrollTop;

      //check if big scroll
      if (isLargeScroll) {
        //now user can set this, on very large collections this will drag preformance down
        if (this.vGridConfig.attRenderOnScrollbarScroll) {
          this.onLargeScroll()
        } else {
          this.onScrollbarScrolling();
        }
      } else {
        this.onSmallScroll(isDownScroll, currentScrollTop)
      }
    } else {

      if (this.vGridGenerator.contentElement.style.overflowX === "hidden") {
        //we do not want scrolls left if this is hidden..
        this.vGridGenerator.contentElement.scrollLeft = 0;
        this.lastScrollLeft = 0;
        this.vGridGenerator.headerElement.scrollLeft = 0;
      } else {
        if (this.lastScrollLeft !== currentScrollLeft) {
          currentScrollLeft = this.vGridGenerator.contentElement.scrollLeft;
          this.lastScrollLeft = currentScrollLeft;
          this.vGridGenerator.headerElement.scrollLeft = currentScrollLeft;
        }
      }
    }
  }

}
