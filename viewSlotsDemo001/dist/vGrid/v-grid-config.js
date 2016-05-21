"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var VGridConfig;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
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
          this.attributes = [];

          this.onFilterRun = function (filterObj) {

            if (filterObj.length !== 0 || _this.vGrid.vGridCollectionFiltered.length !== _this.vGrid.vGridCollection.length) {
              if (_this.vGrid.vGridCollection.length > _this.loadingThreshold) {
                _this.vGrid.loading = true;
              }

              setTimeout(function () {
                var curKey = -1;
                if (_this.vGrid.vGridCurrentEntityRef) {
                  curKey = _this.vGrid.vGridCurrentEntityRef[_this.vGrid.vGridRowKey];
                }

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
              }, 50);
            }
          };

          this.vGrid = vGrid;

          this.attributeArray = [];
          this.columnWidthArray = [];
          this.headerArray = [];
          this.filterArray = [];
          this.readOnlyArray = [];
          this.colStyleArray = [];
          this.colTypeArray = [];
          this.colFormaterArray = [];
          this.colEditRawArray = [];
          this.filterOnKeyArray = [];

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

          this.doNotAddFilterTo = [];
          this.sortNotOnHeader = [];

          this.dataScrollDelay = 200;
        }

        VGridConfig.prototype.getNewObject = function getNewObject(obj) {
          if (obj) {
            var x = {};
            this.attributes.forEach(function (prop) {
              x[prop] = obj[prop];
            });
            return x;
          } else {
            return "";
          }
        };

        VGridConfig.prototype.init = function init() {

          this.attributeArray = this.vGrid.vGridContextObj.colAttrArray ? this.vGrid.vGridContextObj.colAttrArray : this.attributeArray;
          this.columnWidthArray = this.vGrid.vGridContextObj.colWidthArray ? this.vGrid.vGridContextObj.colWidthArray : this.columnWidthArray;
          this.headerArray = this.vGrid.vGridContextObj.colHeaderArray ? this.vGrid.vGridContextObj.colHeaderArray : this.headerArray;
          this.filterArray = this.vGrid.vGridContextObj.colFilterArray ? this.vGrid.vGridContextObj.colFilterArray : this.filterArray;
          this.readOnlyArray = this.vGrid.vGridContextObj.colReadonlyArray ? this.vGrid.vGridContextObj.colReadonlyArray : this.readOnlyArray;
          this.colStyleArray = this.vGrid.vGridContextObj.colStyleArray ? this.vGrid.vGridContextObj.colStyleArray : this.colStyleArray;
          this.colTypeArray = this.vGrid.vGridContextObj.colTypeArray ? this.vGrid.vGridContextObj.colTypeArray : this.colTypeArray;
          this.colFormaterArray = this.vGrid.vGridContextObj.colFormaterArray ? this.vGrid.vGridContextObj.colFormaterArray : this.colFormaterArray;
          this.colEditRawArray = this.vGrid.vGridContextObj.colEditRawArray ? this.vGrid.vGridContextObj.colEditRawArray : this.colEditRawArray;
          this.filterOnKeyArray = this.vGrid.vGridContextObj.colFilterOnKeyArray ? this.vGrid.vGridContextObj.colFilterOnKeyArray : this.filterOnKeyArray;
        };

        VGridConfig.prototype.getFilterName = function getFilterName(name) {
          return this.vGrid.vGridFilter.getNameOfFilter(name);
        };

        VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, callback) {
          if (this.vGrid.vGridCollectionFiltered !== undefined) {
            if (this.eventOnRowDraw) {
              var data = this.getNewObject(this.vGrid.vGridCollectionFiltered[row]);
              this.eventOnRowDraw(data, this.vGrid.vGridCollectionFiltered[row]);
              callback(data);
            } else {
              callback(this.vGrid.vGridCollectionFiltered[row]);
            }
          }
        };

        VGridConfig.prototype.onOrderBy = function onOrderBy(event, setheaders) {
          var _this2 = this;

          var attribute = event.target.getAttribute(this.atts.dataAttribute);
          if (attribute === null) {
            attribute = event.target.offsetParent.getAttribute(this.atts.dataAttribute);
          }

          var canSortThisAttribute = true;
          if (this.sortNotOnHeader.indexOf(attribute) !== -1) {
            canSortThisAttribute = false;
          }

          if (this.vGrid.vGridCollectionFiltered.length > 0 && attribute && canSortThisAttribute) {
            if (this.vGrid.vGridCollection.length > this.loadingThreshold) {
              this.vGrid.loading = true;
            }

            setTimeout(function () {
              _this2.vGrid.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this2.vGrid.vGridSort.getFilter());

              _this2.vGrid.vGridSort.run(_this2.vGrid.vGridCollectionFiltered);

              if (_this2.vGrid.vGridCurrentEntityRef) {
                _this2.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                  if (_this2.vGrid.vGridCurrentEntityRef[_this2.vGrid.vGridRowKey] === x[_this2.vGrid.vGridRowKey]) {
                    _this2.vGrid.vGridCurrentRow = index;
                  }
                });
              }

              _this2.vGrid.vGridGenerator.collectionChange();
              _this2.vGrid.loading = false;
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
                this.vGrid.vGridSkipNextUpdateProperty.push(k);
              }
            }
          }

          if (this.vGrid.vGridCurrentEntityRef) {
            this.vGrid.vGridCellHelper.editCellhelper(row, event);
          }

          if (event.type === "click" && this.eventOnRowClick) {
            var newEvent = document.createEvent('Event');
            newEvent.initEvent("eventOnRowClick", true, true);
            event.target.dispatchEvent(newEvent);
          }

          if (event.type === "dblclick" && this.eventOnRowDblClick) {
            var newEvent = document.createEvent('Event');
            newEvent.initEvent("eventOnRowDblClick", true, true);
            event.target.dispatchEvent(newEvent);
          }
        };

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
