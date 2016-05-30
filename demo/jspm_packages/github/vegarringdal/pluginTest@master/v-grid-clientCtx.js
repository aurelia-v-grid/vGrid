/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var VGridClientCtx = exports.VGridClientCtx = function () {
    function VGridClientCtx(vGrid) {
      _classCallCheck(this, VGridClientCtx);

      this.vGrid = vGrid;
    }

    VGridClientCtx.prototype.collectionChange = function collectionChange(resetScrollToTop, scrollBottom) {
      this.vGridGenerator.collectionChange(resetScrollToTop, scrollBottom);
    };

    VGridClientCtx.prototype.setSorting = function setSorting(x) {
      this.vGridSort.setFilter(x);
    };

    VGridClientCtx.prototype.keepFilterOnCollectionChange = function keepFilterOnCollectionChange() {
      this.vGridConfig.keepFilterOnCollectionChange = true;
    };

    VGridClientCtx.prototype.runSorting = function runSorting(x) {
      var _this = this;

      if (this.vGridCollection.length > this.vGridConfig.loadingThreshold) {
        this.vGrid.loading = true;
      }
      setTimeout(function () {
        _this.vGridSort.run(_this.vGrid.vGridCollectionFiltered);
        _this.vGrid.loading = false;
      }, 10);
    };

    VGridClientCtx.prototype.runFilter = function runFilter(filterObj) {
      this.vGridConfig.addFilter = true;
      this.vGridConfig.onFilterRun(filterObj);
    };

    VGridClientCtx.prototype.rebuildColumns = function rebuildColumns() {
      this.vGridGenerator.rebuildColumns();
    };

    VGridClientCtx.prototype.scrollBottom = function scrollBottom() {
      this.vGridGenerator.scrollBottom();
    };

    VGridClientCtx.prototype.scrollTop = function scrollTop() {
      this.vGridGenerator.scrollTop();
    };

    VGridClientCtx.prototype.setScrollTop = function setScrollTop(newTop) {
      this.vGridGenerator.setScrollTop(newTop);
    };

    VGridClientCtx.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
      this.vGridGenerator.rebuildColumnsRows();
    };

    VGridClientCtx.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
      this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
    };

    VGridClientCtx.prototype.redrawGrid = function redrawGrid() {
      this.vGridGenerator.redrawGrid();
    };

    VGridClientCtx.prototype.setColumns = function setColumns(paramObj) {
      return this.vGridGenerator.setColumns(paramObj);
    };

    VGridClientCtx.prototype.getColumns = function getColumns() {
      return this.vGridGenerator.getColumns();
    };

    VGridClientCtx.prototype.getMaxRows = function getMaxRows() {
      var supportedHeight = 10000;
      var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 8947840 : 1000000000;
      var div = document.createElement("div");

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
      return supportedHeight / this.vGridConfig.rowHeight + ", error margin:" + 10000 / this.vGridConfig.rowHeight;
    };

    VGridClientCtx.prototype.scrollBottomNext = function scrollBottomNext() {
      this.vGridGenerator.scrollBottomNext();
    };

    VGridClientCtx.prototype.setLoadingOverlay = function setLoadingOverlay(value) {
      this.vGrid.loading = value === true ? true : false;
    };

    VGridClientCtx.prototype.setEditMode = function setEditMode(value) {
      this.vGridConfig.editMode = value ? true : false;
      this.vGridGenerator.rebuildColumnsRows();
    };

    VGridClientCtx.prototype.setTabbing = function setTabbing(value) {
      this.vGridConfig.tabbingEnabled = value === true ? true : false;
    };

    VGridClientCtx.prototype.getEditMode = function getEditMode() {
      return this.vGridConfig.editMode;
    };

    VGridClientCtx.prototype.createReport = function createReport(skipArray) {
      if (skipArray === undefined) {
        skipArray = [];
      }
      var content = '';
      var rows = this.vGrid.vGridCollectionFiltered;
      var attributes = this.vGridConfig.attributeArray;

      var setData = function setData(arr) {
        content = content + arr.join(';') + '\n';
      };

      setData(attributes);

      rows.forEach(function (row) {
        var tempArr = [];
        attributes.forEach(function (att) {
          if (skipArray.indexOf(att) === -1) {
            tempArr.push(row[att]);
          }
        });
        setData(tempArr);
      });

      var dummyElement = document.createElement('a');
      dummyElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
      dummyElement.setAttribute('download', 'contacts.csv');
      dummyElement.style.display = 'none';
      document.body.appendChild(dummyElement);
      dummyElement.click();
      document.body.removeChild(dummyElement);
    };

    _createClass(VGridClientCtx, [{
      key: "vGridSelection",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridSelection;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridConfig",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridConfig;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridCellHelper",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridCellHelper;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridElement",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.element;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridSortable",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridSortable;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridResizable",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridResizable;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridFilter",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridFilter;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridSort",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridSort;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridObservables",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridObservables;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridGenerator",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridGenerator;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridCurrentEntityRef",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridCurrentEntityRef;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridRowKey",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridRowKey;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridCollectionFiltered",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridCollectionFiltered;
        } else {
          return null;
        }
      }
    }, {
      key: "vGridCollection",
      get: function get() {
        if (this.vGrid) {
          return this.vGrid.vGridCollection;
        } else {
          return null;
        }
      }
    }]);

    return VGridClientCtx;
  }();
});