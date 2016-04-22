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
          this.eventOnHeaderInputClick = this.vGrid.element.getAttribute("header-input-click");

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

        VGridConfig.prototype.filterCellClick = function filterCellClick(event) {
          var attribute = event.target.getAttribute(this.atts.dataAttribute);
          if (this.vGrid.$parent[this.eventOnHeaderInputClick]) {

            this.vGrid.$parent[this.eventOnHeaderInputClick](null, attribute, event);
          }
        };

        VGridConfig.prototype.clickHandler = function clickHandler(event, row) {
          var _this3 = this;

          var attribute = event.target.getAttribute(this.atts.dataAttribute);
          var readonly = this.readOnlyArray.indexOf(attribute) === -1 ? false : true;

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
//# sourceMappingURL=data:application/json;base64,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QUFhLFlBQWIsQ0FBMEIsS0FBSyxJQUFMLENBQVUsYUFBVixDQUF0QyxDQURnQjtBQUVwQixjQUFJLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBSyx1QkFBTCxDQUF2QixFQUFzRDs7QUFHcEQsaUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBSyx1QkFBTCxDQUFuQixDQUFpRCxJQUFqRCxFQUF1RCxTQUF2RCxFQUFrRSxLQUFsRSxFQUhvRDtXQUF0RDs7O0FBL1lTLDhCQTRaWCxxQ0FBYSxPQUFPLEtBQUs7OztBQUd2QixjQUFJLFlBQVksTUFBTSxNQUFOLENBQWEsWUFBYixDQUEwQixLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXRDLENBSG1CO0FBSXZCLGNBQUksV0FBVyxLQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsU0FBM0IsTUFBMEMsQ0FBQyxDQUFELEdBQUssS0FBL0MsR0FBdUQsSUFBdkQsQ0FKUTs7QUFPdkIsZUFBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixHQUF2QixDQVB1Qjs7QUFVdkIsZUFBSyxLQUFMLENBQVcsZ0JBQVgsR0FBOEIsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsR0FBOUIsQ0FBOUIsQ0FWdUI7O0FBYXZCLGNBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQWJZO0FBY3ZCLGVBQUssSUFBSSxDQUFKLElBQVMsSUFBZCxFQUFvQjtBQUNsQixnQkFBSSxLQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBSixFQUE0QjtBQUMxQixrQkFBSSxLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLENBQXpCLE1BQWdDLEtBQUssQ0FBTCxDQUFoQyxFQUF5QztBQUMzQyxxQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixDQUF6QixJQUE4QixLQUFLLENBQUwsQ0FBOUIsQ0FEMkM7QUFFM0MscUJBQUssS0FBTCxDQUFXLHNCQUFYLENBQWtDLElBQWxDLENBQXVDLENBQXZDLEVBRjJDO2VBQTdDO2FBREY7V0FERjs7QUFXQSxjQUFJLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBSyxlQUFMLENBQW5CLElBQTRDLE1BQU0sSUFBTixLQUFlLFVBQWYsRUFBMkI7QUFDekUsdUJBQVcsWUFBSztBQUNkLHFCQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE9BQUssZUFBTCxDQUFuQixDQUF5QyxPQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixPQUFLLEtBQUwsQ0FBVyxLQUFYLENBQXJFLEVBQXdGLFNBQXhGLEVBQW1HLEtBQW5HLEVBRGM7YUFBTCxFQUVSLEVBRkgsRUFEeUU7V0FBM0U7O0FBUUEsZUFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixjQUF6QixDQUF3QyxHQUF4QyxFQUE2QyxLQUE3QyxFQUFvRCxRQUFwRCxFQWpDdUI7OztlQTVaZCIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
