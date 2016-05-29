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

  // collectionChange(resetScrollToTop, scrollBottom) {
  //   this.vGridGenerator.collectionChange(resetScrollToTop, scrollBottom)
  // }


  // setSorting(x, add) {
  //   this.vGridSort.setFilter(x, add)
  // }
  //
  keepFilterOnCollectionChange() {
    this.vGridConfig.keepFilterOnCollectionChange = true;
  }
  //
  //
  // //todo adjust, will not work with remote atm
  // runSorting(x) {
  //   if (this.vGridCollection.length > this.vGridConfig.loadingThreshold) {
  //     this.vGrid.loading = true;
  //   }
  //   setTimeout(()=> {
  //     this.vGridSort.run(this.vGrid.vGridCollectionFiltered);
  //     this.vGrid.loading = false;
  //   }, 10);
  //
  // }
  //
  // runFilter(filterObj) {
  //   this.vGridConfig.addFilter = true;
  //   this.vGridConfig.onFilterRun(filterObj)
  // }
  //


  rebuildColumns() {
    this.vGridGenerator.rebuildColumns();
  }


  scrollBottom() {
    this.vGridGenerator.scrollBottom();
  }
  


  scrollTop() {
    this.vGridGenerator.scrollTop();
  }
  


  setScrollTop(newTop) {
    this.vGridGenerator.setScrollTop(newTop);
  }
  


  rebuildColumnsRows() {
    this.vGridGenerator.rebuildColumnsRows();
  }
  


  columnChangeAndCollection(resetScrollToTop) {
    this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
  }
  


  redrawGrid() {
    this.vGridGenerator.redrawGrid();
  }
  


  setColumns(paramObj) {
    return this.vGridGenerator.setColumns(paramObj);
  }
  


  getColumns() {
    return this.vGridGenerator.getColumns();
  }
  

 //todo, I should test this with the browsers to verify that its correct now
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
    return (supportedHeight / this.vGridConfig.rowHeight) + ", error margin:" + (10000 / this.vGridConfig.rowHeight);
  }


  scrollBottomNext() {
    this.vGridGenerator.scrollBottomNext();
  }
  


  setLoadingOverlay(value) {
    this.vGrid.loading = value === true ? true : false;
  }


 




  //todo, this should use put text in blob or something it will fail with large collection
  createReport(skipArray) {

    //dont thouch this;
    if (skipArray === undefined) {
      skipArray = [];
    }
    var content = '';
    var rows = this.vGrid.vGridCollectionFiltered;
    var attributes = this.vGridConfig.attributeObserve;

    //sets data to our content
    var setData = (arr) => {
      content = content + arr.join(';') + '\n';
    };

    //set headers
    setData(attributes);

    //loop rows/columns
    rows.forEach((row)=> {
      let tempArr = [];
      attributes.forEach((att)=> {
        if (skipArray.indexOf(att) === -1) {
          tempArr.push(row[att]);
        }
      });
      setData(tempArr);
    });


    //download
    var dummyElement = document.createElement('a');
    dummyElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    dummyElement.setAttribute('download', 'contacts.csv');
    dummyElement.style.display = 'none';
    document.body.appendChild(dummyElement);
    dummyElement.click();
    document.body.removeChild(dummyElement);
  }

}
