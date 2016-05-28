"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, VGridConfig;

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

      _export("VGridConfig", VGridConfig = function () {
        function VGridConfig(vGrid) {
          var _this = this;

          _classCallCheck(this, VGridConfig);

          this.css = {
            wrapper: "vGrid",
            row: "vGrid-row",
            mainHeader: "vGrid-header",
            mainContent: "vGrid-body",
            mainFooter: "vGrid-footer",
            scrollBody: "vGrid-body-scroll",
            rowCell: "vGrid-row-cell",
            rowColumn: "vGrid-row-column",
            rowHeaderCell: "vGrid-row-cell-header",
            rowHeaderColumn: "vGrid-row-column-header",
            gridColumn: "vGrid-column",
            rowHeader: "vGrid-row-header",
            rowSelected: "vGrid-row-selected",
            rowContainer: "vGrid-row-container",
            rowAlt: "vGrid-row-alt",
            rowEven: "vGrid-row-even",
            editCell: "vGrid-editCell",
            editCellWrite: "vGrid-editCell-write",
            editCellFocus: "vGrid-editCell-focus",
            filterLabelTop: "vGrid-filterLabelAtTop",
            filterLabelBottom: "vGrid-filterLabelAtBottom",
            filterInputTop: "vGrid-filterInputAtTop",
            filterInputBottom: "vGrid-filterInputAtBottom",
            cellContent: "vGrid-content",
            dragHandle: "vGrid-vGridDragHandle",
            filterHandle: "vGrid-queryField",
            orderHandle: "v-grid-header-orderBy",
            resizeHeaderDragHandle: "vGrid-draggable-handler",
            sortIcon: "vGrid-glyphicon",
            sortIconSort: "vGrid-glyphicon-sort",
            sortIconAsc: "vGrid-glyphicon-sort-asc",
            sortIconDesc: "vGrid-glyphicon-sort-desc",
            sortIconNo: "vGrid-glyphicon-",
            noData: "vGrid-row-no-data"
          };
          this.atts = {
            dataAttribute: "v-grid-data-attribute",
            dataAttributeFilter: "v-grid-data-attribute-filter"
          };
          this.isRemoteIndex = false;
          this.attributes = [];

          this.onFilterRun = function (filterObj) {

            if (filterObj.length !== 0 || _this.vGrid.vGridCollectionFiltered.length !== _this.vGrid.vGridCollection.length || _this.eventOnRemoteCall) {
              if (_this.vGrid.vGridCollection.length > _this.loadingThreshold) {
                _this.vGrid.loading = true;
              }

              setTimeout(function () {
                var curKey = -1;
                if (_this.vGrid.vGridCurrentEntityRef) {
                  curKey = _this.vGrid.vGridCurrentEntityRef[_this.vGrid.vGridRowKey];
                }

                if (_this.eventOnRemoteCall) {
                  _this.vGrid.vGridFilter.lastFilter = filterObj;

                  _this.remoteOffset = 0;

                  _this.remoteCall();
                } else {
                  _this.vGrid.vGridCollectionFiltered = _this.vGrid.vGridFilter.run(_this.vGrid.vGridCollection, filterObj);

                  _this.vGrid.vGridSort.run(_this.vGrid.vGridCollectionFiltered);

                  var newRowNo = -1;
                  if (curKey) {
                    _this.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                      if (curKey === x[_this.vGrid.vGridRowKey]) {
                        newRowNo = index;
                      }
                    });
                  }

                  if (newRowNo > -1) {
                    _this.vGrid.vGridCurrentEntityRef = _this.vGrid.vGridCollectionFiltered[newRowNo];
                    _this.vGrid.vGridCurrentEntity[_this.vGrid.vGridRowKey] = _this.vGrid.vGridCurrentEntityRef[_this.vGrid.vGridRowKey];
                    _this.vGrid.vGridCurrentRow = newRowNo;
                  } else {
                    _this.vGrid.vGridCurrentRow = newRowNo;
                  }

                  _this.vGrid.vGridGenerator.collectionChange(true);
                  _this.vGrid.loading = false;
                }
              }, 50);
            }
          };

          this.vGrid = vGrid;

          this.attributeArray = [];

          this.columnWidthArray = [];
          this.colRowTemplateArray = [];
          this.colHeaderTemplateArray = [];

          this.columns = 0;
          this.rowHeight = 50;
          this.headerHeight = 0;
          this.footerHeight = 0;
          this.isResizableHeaders = false;
          this.isMultiSelect = undefined;
          this.isSortableHeader = false;
          this.requestAnimationFrame = true;
          this.resizableHeadersAndRows = false;
          this.renderOnScrollbarScroll = true;
          this.addFilter = false;
          this.filterOnAtTop = false;
          this.sortOnHeaderClick = false;
          this.largeBuffer = false;
          this.activeSorting = false;
          this.contextmenu = true;
          this.loadingThreshold = -1;
          this.tabbingEnabled = true;

          this.eventOnRowDraw = null;
          this.eventOnRowClick = null;
          this.eventOnRowDblClick = null;
          this.eventOnRemoteCall = null;

          this.doNotAddFilterTo = [];
          this.sortNotOnHeader = [];

          this.dataScrollDelay = 200;

          this.keepFilterOnCollectionChange = false;
          this.remoteLimit = 40;
          this.remoteLength = 0;
          this.remoteOffset = 0;
          this.updatePager = null;
        }

        VGridConfig.prototype.getNewObject = function getNewObject(obj) {
          if (obj) {
            var x = {};
            for (var k in obj) {
              if (obj.hasOwnProperty(k)) {
                if (x[k] !== obj[k]) {
                  x[k] = obj[k];
                }
              }
            }
            return x;
          } else {
            return "";
          }
        };

        VGridConfig.prototype.remoteCall = function remoteCall(data) {
          var _this2 = this;

          data = data ? data : {};
          this.eventOnRemoteCall({
            filter: data.filter || this.vGrid.vGridFilter.lastFilter,
            sort: data.sort || this.vGrid.vGridSort.getFilter(),
            limit: data.limit || this.remoteLimit,
            offset: data.offset || this.remoteOffset
          }).then(function (data) {

            _this2.vGrid.vGridObservables.disableObservablesArray();
            _this2.vGrid.vGridObservables.disableObservablesCollection();
            _this2.vGrid.vGridCollection = data.col;
            _this2.remoteLimit = data.limit;
            _this2.remoteLength = data.length;
            _this2.vGrid.vGridCollectionFiltered = _this2.vGrid.vGridCollection.slice(0);
            _this2.vGrid.checkKeys();
            _this2.vGrid.vGridCurrentRow = -1;
            if (!_this2.isRemoteIndex) {
              _this2.vGrid.vGridSelection.reset();
            }
            _this2.vGrid.vGridGenerator.collectionChange();
            _this2.vGrid.loading = false;
            _this2.vGrid.vGridPager.updatePager({
              limit: _this2.remoteLimit,
              offset: _this2.remoteOffset,
              length: _this2.remoteLength
            });
            setTimeout(function () {
              _this2.vGrid.vGridObservables.enableObservablesArray();
              _this2.vGrid.vGridObservables.enableObservablesCollection();
            }, 200);
          });
        };

        VGridConfig.prototype.getFilterName = function getFilterName(name) {
          return this.vGrid.vGridFilter.getNameOfFilter(name);
        };

        VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, callback) {
          if (this.vGrid.vGridCollectionFiltered !== undefined) {
            if (this.eventOnRowDraw) {
              var data = this.getNewObject(this.vGrid.vGridCollectionFiltered[row]);
              this.eventOnRowDraw({
                tempRef: data || null,
                rowRef: this.vGrid.vGridCollectionFiltered[row] || null
              });
              callback(data);
            } else {
              callback(this.vGrid.vGridCollectionFiltered[row]);
            }
          }
        };

        VGridConfig.prototype.onOrderBy = function onOrderBy(attribute, add) {
          var _this3 = this;

          if (this.vGrid.vGridCollectionFiltered.length > 0) {
            if (this.vGrid.vGridCollection.length > this.loadingThreshold) {
              this.vGrid.loading = true;
            }

            setTimeout(function () {
              _this3.vGrid.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, add);

              var event = new CustomEvent("sortIconUpdate", {
                detail: "",
                bubbles: true
              });
              _this3.vGrid.element.dispatchEvent(event);

              if (_this3.eventOnRemoteCall) {
                _this3.remoteCall();
              } else {
                _this3.vGrid.vGridSort.run(_this3.vGrid.vGridCollectionFiltered);

                if (_this3.vGrid.vGridCurrentEntityRef) {
                  _this3.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                    if (_this3.vGrid.vGridCurrentEntityRef[_this3.vGrid.vGridRowKey] === x[_this3.vGrid.vGridRowKey]) {
                      _this3.vGrid.vGridCurrentRow = index;
                    }
                  });
                }

                _this3.vGrid.vGridGenerator.collectionChange();
                _this3.vGrid.loading = false;
              }
            }, 50);
          }
        };

        VGridConfig.prototype.getCollectionLength = function getCollectionLength() {
          if (this.addFilter) {
            return this.vGrid.vGridCollectionFiltered.length;
          } else {
            return this.vGrid.vGridCollection.length;
          }
        };

        VGridConfig.prototype.clickHandler = function clickHandler(event, row) {
          this.vGrid.vGridCurrentRow = row;

          this.vGrid.vGridCurrentEntityRef = this.vGrid.vGridCollectionFiltered[row];

          var data = this.vGrid.vGridCurrentEntityRef;
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              if (this.vGrid.vGridCurrentEntity[k] !== data[k]) {
                this.vGrid.vGridCurrentEntity[k] = data[k];
              }
            }
          }

          if (event.type === "click") {
            var newEvent = document.createEvent('Event');
            newEvent.initEvent("eventOnRowClick", true, true);
            event.target.dispatchEvent(newEvent);
          }

          if (event.type === "dblclick") {
            var newEvent = document.createEvent('Event');
            newEvent.initEvent("eventOnRowDblClick", true, true);
            event.target.dispatchEvent(newEvent);
          }
        };

        _createClass(VGridConfig, [{
          key: "remoteIndex",
          set: function set(value) {
            this.isRemoteIndex = true;
            this.vGrid.vGridRowKey = value;
          },
          get: function get() {
            return this.vGrid.vGridRowKey;
          }
        }]);

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
