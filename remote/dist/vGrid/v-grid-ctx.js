"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, VGridCtx;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
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

      _export("VGridCtx", VGridCtx = function () {
        function VGridCtx(vGrid) {
          _classCallCheck(this, VGridCtx);

          this.vGrid = vGrid;
        }

        VGridCtx.prototype.setData = function setData(data) {
          this.vGridConfig.remoteLimit = data.limit || 40;
          this.vGridConfig.remoteLength = data.length || 0;
          this.vGridConfig.remoteOffset = data.offset || 0;
          this.keepFilterOnCollectionChange();
          this.vGrid.vGridCollection = data.col || [];
          this.setLoadingOverlay(false);
          this.vGrid.vGridPager.updatePager({
            limit: this.vGridConfig.remoteLimit,
            offset: this.vGridConfig.remoteOffset,
            length: this.vGridConfig.remoteLength
          });
        };

        VGridCtx.prototype.keepFilterOnCollectionChange = function keepFilterOnCollectionChange() {
          this.vGridConfig.keepFilterOnCollectionChange = true;
        };

        VGridCtx.prototype.rebuildColumns = function rebuildColumns() {
          this.vGridGenerator.rebuildColumns();
        };

        VGridCtx.prototype.scrollBottom = function scrollBottom() {
          this.vGridGenerator.scrollBottom();
        };

        VGridCtx.prototype.scrollTop = function scrollTop() {
          this.vGridGenerator.scrollTop();
        };

        VGridCtx.prototype.setScrollTop = function setScrollTop(newTop) {
          this.vGridGenerator.setScrollTop(newTop);
        };

        VGridCtx.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
          this.vGridGenerator.rebuildColumnsRows();
        };

        VGridCtx.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
        };

        VGridCtx.prototype.redrawGrid = function redrawGrid() {
          this.vGridGenerator.redrawGrid();
        };

        VGridCtx.prototype.setColumns = function setColumns(paramObj) {
          return this.vGridGenerator.setColumns(paramObj);
        };

        VGridCtx.prototype.getColumns = function getColumns() {
          return this.vGridGenerator.getColumns();
        };

        VGridCtx.prototype.getMaxRows = function getMaxRows() {
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
          return supportedHeight / this.vGridConfig.attRowHeight + ", error margin:" + 10000 / this.vGridConfig.attRowHeight;
        };

        VGridCtx.prototype.scrollBottomNext = function scrollBottomNext() {
          this.vGridGenerator.scrollBottomNext();
        };

        VGridCtx.prototype.setLoadingOverlay = function setLoadingOverlay(value) {
          this.vGrid.loading = value === true ? true : false;
        };

        VGridCtx.prototype.createReport = function createReport(skipArray) {
          if (skipArray === undefined) {
            skipArray = [];
          }
          var content = '';
          var rows = this.vGrid.vGridCollectionFiltered;
          var attributes = this.vGridConfig.attAttributeObserve;

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

        _createClass(VGridCtx, [{
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

        return VGridCtx;
      }());

      _export("VGridCtx", VGridCtx);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
