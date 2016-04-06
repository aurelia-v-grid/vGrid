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

          this.onFilterRun = function (filterObj) {

            if (filterObj.length !== 0 || _this.vGrid.collectionFiltered.length !== _this.vGrid.collection.length) {

              var curKey = -1;
              if (_this.vGrid.currentRowEntity) {
                curKey = _this.vGrid.currentRowEntity[_this.vGrid.sgkey];
              }
              if (filterObj.length === 0 && _this.vGrid.collectionFiltered.length !== _this.vGrid.collection.length) {
                _this.vGrid.collectionFiltered = _this.vGrid.collection.slice(0);
              } else {
                if (_this.eventFormatHandler) {
                  if (_this.vGrid.$parent[_this.eventFormatHandler]) {
                    filterObj = _this.vGrid.$parent[_this.eventFormatHandler]("onFilter", filterObj);
                  }
                }

                _this.vGrid.collectionFiltered = _this.vGrid.vGridFilter.run(_this.vGrid.collection, filterObj);
                _this.vGrid.vGridSort.run(_this.vGrid.collectionFiltered);
              }

              var newRowNo = -1;
              if (curKey) {
                _this.vGrid.collectionFiltered.forEach(function (x, index) {
                  if (curKey === x[_this.vGrid.sgkey]) {
                    newRowNo = index;
                  }
                });
              }

              _this.vGrid.filterRowDisplaying = false;
              if (newRowNo > -1) {
                _this.vGrid.currentRowEntity = _this.vGrid.collectionFiltered[newRowNo];
                _this.vGrid.currentEntity[_this.vGrid.sgkey] = _this.vGrid.currentRowEntity[_this.vGrid.sgkey];
                _this.vGrid.filterRow = newRowNo;
                _this.vGrid.filterRowDisplaying = true;
              }

              _this.vGrid.vGridGenerator.collectionChange(true);
              if (_this.vGrid.filterRowDisplaying) {
                _this.vGrid.vGridCellEdit.setBackFocus();
              }
            }
          };

          this.vGrid = vGrid;

          this.rowData = this.vGrid.element.getElementsByTagName("V-GRID-ROW")[0];
          this.columns = this.rowData.getElementsByTagName("V-GRID-COL");

          if (!this.rowData) {
            throw "error, you need to add the row for the grid to work atm";
          }
          if (this.vGrid.gridContextMissing && !this.rowData) {
            throw "grid needs context under config attributes, or row element";
          }

          this.rowData.style.display = "none";

          var type = {
            "true": true,
            "false": false
          };

          var setValue = function setValue(contextValue, htmlAttributeValue, defaultValue) {
            var value = defaultValue;
            if (contextValue !== undefined && contextValue !== null) {
              value = contextValue;
            } else {
              if (htmlAttributeValue !== undefined && htmlAttributeValue !== null && !isNaN(htmlAttributeValue)) {
                value = htmlAttributeValue;
              }
            }
            return value;
          };

          if (this.columns.length === 0) {
            this.columnWidthArrayOverride = true;

            this.onRowMarkupCreate = function () {
              return _this.rowData.innerHTML;
            };

            this.attributeArray = this.vGrid.element.getAttribute("attibutes-used").split(",");
            this.readOnlyArray = [];
          } else {
              this.attributeArray = [];
              this.columnWidthArray = [];
              this.headerArray = [];
              this.filterArray = [];
              this.readOnlyArray = [];
              this.colStyleArray = [];
              this.colTypeArray = [];

              for (var i = 0; i < this.columns.length; i++) {
                this.attributeArray.push(this.columns[i].getAttribute("attribute"));
                this.columnWidthArray.push(this.columns[i].getAttribute("col-width"));
                this.headerArray.push(this.columns[i].getAttribute("header") || "");
                this.colStyleArray.push(this.columns[i].getAttribute("col-css") || "");
                this.colTypeArray.push(this.columns[i].getAttribute("col-type") || "");
                this.filterArray.push(this.columns[i].getAttribute("default-filter") || "?");
                this.readOnlyArray.push(this.columns[i].getAttribute("read-only") === "true" ? this.columns[i].getAttribute("attribute") : false);
              }

              this.attributeArray = this.vGrid.gridContext.attributeArray || this.attributeArray;
              this.columnWidthArray = this.vGrid.gridContext.columnWidthArray || this.columnWidthArray;
              this.headerArray = this.vGrid.gridContext.headerArray || this.headerArray;
              this.filterArray = this.vGrid.gridContext.filterArray || this.filterArray;
              this.readOnlyArray = this.vGrid.gridContext.readOnlyArray || this.readOnlyArray;
              this.colStyleArray = this.vGrid.gridContext.colStyleArray || this.colStyleArray;
              this.colTypeArray = this.vGrid.gridContext.colTypeArray || this.colTypeArray;
            }

          this.rowHeight = setValue(this.vGrid.gridContext.rowHeight, parseInt(this.vGrid.element.getAttribute("row-height")), 50);
          this.headerHeight = setValue(this.vGrid.gridContext.headerHeight, parseInt(this.vGrid.element.getAttribute("header-height")), 0);
          this.footerHeight = setValue(this.vGrid.gridContext.footerHeight, parseInt(this.vGrid.element.getAttribute("footer-height")), 0);
          this.isResizableHeaders = setValue(this.vGrid.gridContext.resizableHeaders, type[this.vGrid.element.getAttribute("resizable-headers")], false);
          this.isMultiSelect = setValue(this.vGrid.gridContext.multiSelect, type[this.vGrid.element.getAttribute("multi-select")], undefined);
          this.isSortableHeader = setValue(this.vGrid.gridContext.sortableHeader, type[this.vGrid.element.getAttribute("sortable-headers")], false);
          this.requestAnimationFrame = setValue(this.vGrid.gridContext.requestAnimationFrame, type[this.vGrid.element.getAttribute("request-animation-frame")], true);
          this.resizableHeadersAndRows = setValue(this.vGrid.gridContext.resizeAlsoRows, type[this.vGrid.element.getAttribute("resize-also-rows")], false);
          this.renderOnScrollbarScroll = setValue(this.vGrid.gridContext.renderOnScrollbarScroll, type[this.vGrid.element.getAttribute("render-on-scrollbar-scroll")], true);
          this.lockedColumns = setValue(this.vGrid.gridContext.lockedColumns, parseInt(this.vGrid.element.getAttribute("locked-columns")), 0);
          this.addFilter = setValue(this.vGrid.gridContext.headerFilter, type[this.vGrid.element.getAttribute("header-filter")], false);
          this.filterOnAtTop = setValue(this.vGrid.gridContext.headerFilterTop, type[this.vGrid.element.getAttribute("header-filter-top")], false);
          this.filterOnKey = setValue(this.vGrid.gridContext.headerFilterOnkeydown, type[this.vGrid.element.getAttribute("header-filter-onkeydown")], false);
          this.sortOnHeaderClick = setValue(this.vGrid.gridContext.sortOnHeaderClick, type[this.vGrid.element.getAttribute("sort-on-header-click")], false);
          this.largeBuffer = setValue(this.vGrid.gridContext.largeBuffer, type[this.vGrid.element.getAttribute("large-buffer")], false);

          this.eventFormatHandler = this.vGrid.element.getAttribute("format-handler");
          this.eventOnDblClick = this.vGrid.element.getAttribute("row-on-dblclick");
          this.eventOnRowDraw = this.vGrid.element.getAttribute("row-on-draw");

          if (this.vGrid.element.getAttribute("header-filter-not-to")) {
            this.doNotAddFilterTo = this.vGrid.element.getAttribute("header-filter-not-to").split(",");
          } else {
            if (this.vGrid.gridContext.headerFilterNotTo) {
              this.doNotAddFilterTo = this.vGrid.gridContext.headerFilterNotTo.split(",");
            } else {
              this.doNotAddFilterTo = [];
            }
          }

          if (this.vGrid.element.getAttribute("sort-not-on-header")) {
            this.sortNotOnHeader = this.vGrid.element.getAttribute("sort-not-on-header").split(",");
          } else {
            if (this.vGrid.gridContext.sortNotOnHeader) {
              this.sortNotOnHeader = this.vGrid.gridContext.sortNotOnHeader.split(",");
            } else {
              this.sortNotOnHeader = [];
            }
          }
        }

        VGridConfig.prototype.getFilterName = function getFilterName(name) {
          return this.vGrid.vGridFilter.getNameOfFilter(name);
        };

        VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, callback) {
          if (this.vGrid.collectionFiltered !== undefined) {
            if (this.vGrid.$parent[this.eventOnRowDraw]) {
              var data = this.vGrid.vGridInterpolate.getNewObject(this.vGrid.collectionFiltered[row]);
              this.vGrid.$parent[this.eventOnRowDraw](data, this.vGrid.collectionFiltered[row]);
              callback(data);
            } else {
              callback(this.vGrid.collectionFiltered[row]);
            }
          }
        };

        VGridConfig.prototype.onOrderBy = function onOrderBy(event, setheaders) {
          var _this2 = this;

          var attribute = event.target.getAttribute(this.atts.dataAttribute);
          if (attribute === null) {
            attribute = event.target.offsetParent.getAttribute(this.atts.dataAttribute);
          }
          var checked = true;
          if (this.sortNotOnHeader.indexOf(attribute) !== -1) {
            checked = false;
          }

          if (this.vGrid.collectionFiltered.length > 0 && attribute && checked) {
            this.vGrid.vGridSort.setFilter({
              attribute: attribute,
              asc: true
            }, event.shiftKey);

            setheaders(this.vGrid.vGridSort.getFilter());

            this.vGrid.vGridSort.run(this.vGrid.collectionFiltered);

            this.vGrid.vGridGenerator.collectionChange();

            this.vGrid.collectionFiltered.forEach(function (x, index) {
              if (_this2.vGrid.currentEntity[_this2.vGrid.sgkey] === x[_this2.vGrid.sgkey]) {
                _this2.filterRow = index;
              }
            });
            this.vGrid.vGridCellEdit.setBackFocus();
          }
        };

        VGridConfig.prototype.onScrolled = function onScrolled() {

          var rowHeight = this.rowHeight;
          var array = this.vGrid.vGridGenerator.htmlCache.rowsArray;
          var arraylength = array.length;
          var firstRow = parseInt(array[0].top / rowHeight, 10);
          var lastRow = parseInt(array[arraylength - 1].top / rowHeight, 10);
          var curRow = this.vGrid.filterRow;
          if (firstRow <= curRow && lastRow >= curRow) {
            this.vGrid.vGridCellEdit.setBackFocus();
          }
        };

        VGridConfig.prototype.getCollectionLength = function getCollectionLength() {
          if (this.addFilter) {
            return this.vGrid.collectionFiltered.length;
          } else {
            return this.vGrid.collection.length;
          }
        };

        VGridConfig.prototype.clickHandler = function clickHandler(event, row) {
          var _this3 = this;

          var attribute = event.target.getAttribute(this.atts.dataAttribute);
          var readonly = this.readOnlyArray.indexOf(attribute) ? false : true;

          this.vGrid.filterRow = row;

          this.vGrid.currentRowEntity = this.vGrid.collectionFiltered[row];

          var data = this.vGrid.currentRowEntity;
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              if (this.vGrid.currentEntity[k] !== data[k]) {
                this.vGrid.currentEntity[k] = data[k];
                this.vGrid.skipNextUpdateProperty.push(k);
              }
            }
          }

          if (this.vGrid.$parent[this.eventOnDblClick] && event.type === "dblclick") {
            setTimeout(function () {
              _this3.vGrid.$parent[_this3.eventOnDblClick](_this3.vGrid.currentRowEntity[_this3.vGrid.sgkey], attribute, event);
            }, 15);
          }

          this.vGrid.vGridCellEdit.editCellhelper(row, event, readonly);
        };

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
