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
              if (_this.vGrid.vGridCellEdit.curElement && _this.vGrid.vGridCellEdit.updated === false) {
                _this.vGrid.vGridCellEdit.updateActual(_this.vGrid.vGridCellEdit.callbackObject());
              }

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

          this.attributeArray = [];
          this.columnWidthArray = [];
          this.headerArray = [];
          this.filterArray = [];
          this.readOnlyArray = [];
          this.colStyleArray = [];
          this.colTypeArray = [];

          if (this.columns.length === 0) {
            this.columnWidthArrayOverride = true;

            this.onRowMarkupCreate = function () {
              return _this.rowData.innerHTML;
            };

            this.attributeArray = this.vGrid.element.getAttribute("attibutes-used").split(",");
          } else {

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
          this.eventOnCellDraw = this.vGrid.element.getAttribute("cell-on-draw");

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

        VGridConfig.prototype.cellDrawEvent = function cellDrawEvent(data) {
          if (this.vGrid.collectionFiltered !== undefined) {
            if (this.vGrid.$parent[this.eventOnCellDraw]) {
              var rowdata = this.vGrid.vGridInterpolate.getNewObject(this.vGrid.collectionFiltered[data.row]);
              this.vGrid.$parent[this.eventOnCellDraw]({
                attributeName: data.attributeName,
                div: data.div,
                rowdata: rowdata,
                colData: this.vGrid.collectionFiltered[data.row]
              });
            }
          }
        };

        VGridConfig.prototype.onOrderBy = function onOrderBy(event, setheaders) {
          var _this2 = this;

          if (this.vGrid.vGridCellEdit.curElement && this.vGrid.vGridCellEdit.updated === false) {
            this.vGrid.vGridCellEdit.updateActual(this.vGrid.vGridCellEdit.callbackObject());
          }

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
