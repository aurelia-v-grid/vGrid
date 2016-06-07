/*****************************************************************************************************************
 *    VGridClientCtx
 *    This will contexin all functions that I expose to client side in gridcontext xxxx.ctx
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

export class VGridCtx {

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

  get vGridResizable() {
    if (this.vGrid) {
      return this.vGrid.vGridResizable;
    } else {
      return null;
    }
  }

  get vGridFilter() {
    if (this.vGrid) {
      return this.vGrid.vGridFilter;
    } else {
      return null;
    }
  }

  get vGridSort() {
    if (this.vGrid) {
      return this.vGrid.vGridSort;
    } else {
      return null;
    }
  }

  get vGridObservables() {
    if (this.vGrid) {
      return this.vGrid.vGridObservables;
    } else {
      return null;
    }
  }

  get vGridGenerator() {
    if (this.vGrid) {
      return this.vGrid.vGridGenerator;
    } else {
      return null;
    }
  }

  get vGridCurrentEntityRef() {
    if (this.vGrid) {
      return this.vGrid.vGridCurrentEntityRef;
    } else {
      return null;
    }
  }

  get vGridRowKey() {
    if (this.vGrid) {
      return this.vGrid.vGridRowKey;
    } else {
      return null;
    }
  }

  get vGridCollectionFiltered() {
    if (this.vGrid) {
      return this.vGrid.vGridCollectionFiltered;
    } else {
      return null;
    }
  }

  get vGridCollection() {
    if (this.vGrid) {
      return this.vGrid.vGridCollection;
    } else {
      return null;
    }
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  setData(data) {
    this.vGridConfig.remoteLimit = data.limit || 40;
    this.vGridConfig.remoteLength = data.length || 0;
    this.vGridConfig.remoteOffset = data.offset || 0;
    this.keepFilterOnCollectionChange();
    this.vGrid.vGridCollection = data.col || [];
    this.setLoadingOverlay(false);
    this.vGrid.vGridPager.updatePager({
      limit : this.vGridConfig.remoteLimit,
      offset : this.vGridConfig.remoteOffset,
      length : this.vGridConfig.remoteLength
    });
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  keepFilterOnCollectionChange() {
    this.vGridConfig.keepFilterOnCollectionChange = true;
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  rebuildColumns() {
    this.vGridGenerator.rebuildColumns();
  }

  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  scrollBottom() {
    var collectionLength = this.vGridConfig.getCollectionLength();
    this.contentElement.scrollTop = collectionLength * this.vGridConfig.attRowHeight;
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  scrollTop() {
    this.vGridGenerator.contentElement.scrollTop = 0;
  };



  setScrollTop(newTop) {
    this.vGridGenerator.contentElement.scrollTop = newTop;
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  rebuildColumnsRows() {
    this.vGridGenerator.rebuildColumnsRows();
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  columnChangeAndCollection(resetScrollToTop) {
    this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  redrawGrid() {
    this.vGridGenerator.redrawGrid();
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  setColumns(paramObj) {
    this.vGridConfig.colConfig = paramObj.colConfig;
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  getColumns() {
    var arr = [];
    this.vGridConfig.colConfig.forEach((obj)=> {
      let x = {};
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (x[k] !== obj[k]) {
            x[k] = obj[k];
          }
        }
      }
      arr.push(x);
    });
    return {
      "colConfig": arr
    }
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  getMaxRows() {
    //https://github.com/mleibman/SlickGrid/blob/bf4705a96c40fea088216034def4d0256a335e65/slick.grid.js
    var supportedHeight = 10000;
    var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 8947840 : 1000000000;
    var div = document.createElement("div");
    //div.style.display = "none";
    document.body.appendChild(div);

    while (true) {
      var test = supportedHeight + 10000;
      div.style.height = test + "px";
      if (test > testUpTo || div.clientHeight !== test) {
        break;
      } else {
        supportedHeight = test;
      }
    }
    document.body.removeChild(div);
    var total = Math.ceil(supportedHeight / this.vGridConfig.attRowHeight); //lol
    return  total + ", error margin:" + Math.ceil(10000 / this.vGridConfig.attRowHeight);
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  scrollBottomNext() {
    this.vGridGenerator.scrollBottomOnNext = true;
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  setLoadingOverlay(value) {
    this.vGrid.loading = value === true ? true : false;
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  getScrollTop() {
    return this.vGridGenerator.contentElement.scrollTop;
  };


}
