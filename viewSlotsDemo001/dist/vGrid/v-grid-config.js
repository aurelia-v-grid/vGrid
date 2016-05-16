"use strict";

System.register([], function (_export, _context) {
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
            this.vGrid.vGridSort.setFilter({
              attribute: attribute,
              asc: true
            }, event.shiftKey);

            setheaders(this.vGrid.vGridSort.getFilter());

            this.vGrid.vGridSort.run(this.vGrid.vGridCollectionFiltered);

            if (this.vGrid.vGridCurrentEntityRef) {
              this.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                if (_this2.vGrid.vGridCurrentEntityRef[_this2.vGrid.vGridRowKey] === x[_this2.vGrid.vGridRowKey]) {
                  _this2.vGrid.vGridCurrentRow = index;
                }
              });
            }

            this.vGrid.vGridGenerator.collectionChange();
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
