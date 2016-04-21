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
//# sourceMappingURL=data:application/json;base64,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Q0FBVyxhQUFYLENBQXlCLENBQXpCLElBQThCLEtBQUssQ0FBTCxDQUE5QixDQUQyQztBQUUzQyxxQkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsSUFBbEMsQ0FBdUMsQ0FBdkMsRUFGMkM7ZUFBN0M7YUFERjtXQURGOztBQVdBLGNBQUksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFLLGVBQUwsQ0FBbkIsSUFBNEMsTUFBTSxJQUFOLEtBQWUsVUFBZixFQUEyQjtBQUN6RSx1QkFBVyxZQUFLO0FBQ2QscUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsT0FBSyxlQUFMLENBQW5CLENBQXlDLE9BQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE9BQUssS0FBTCxDQUFXLEtBQVgsQ0FBckUsRUFBd0YsU0FBeEYsRUFBbUcsS0FBbkcsRUFEYzthQUFMLEVBRVIsRUFGSCxFQUR5RTtXQUEzRTs7QUFRQSxlQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGNBQXpCLENBQXdDLEdBQXhDLEVBQTZDLEtBQTdDLEVBQW9ELFFBQXBELEVBakN1Qjs7O2VBMVlkIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
