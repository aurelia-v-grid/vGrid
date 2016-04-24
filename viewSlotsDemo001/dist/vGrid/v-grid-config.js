"use strict";

System.register(["aurelia-framework"], function (_export, _context) {
  var bindable, VGridConfig;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export("VGridConfig", VGridConfig = function () {
        VGridConfig.prototype.bind = function bind() {
          debugger;
        };

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
                _this.vGrid.vGridCellEdit.setBackFocus(true);
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
//# sourceMappingURL=data:application/json;base64,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QWlaWCwyQ0FBZ0IsT0FBTTtBQUNwQixjQUFJLFlBQVksTUFBTSxNQUFOLENBQWEsWUFBYixDQUEwQixLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXRDLENBRGdCO0FBRXBCLGNBQUksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFLLHVCQUFMLENBQXZCLEVBQXNEOztBQUdwRCxpQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFLLHVCQUFMLENBQW5CLENBQWlELElBQWpELEVBQXVELFNBQXZELEVBQWtFLEtBQWxFLEVBSG9EO1dBQXREOzs7QUFuWlMsOEJBZ2FYLHFDQUFhLE9BQU8sS0FBSzs7O0FBR3ZCLGNBQUksWUFBWSxNQUFNLE1BQU4sQ0FBYSxZQUFiLENBQTBCLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBdEMsQ0FIbUI7QUFJdkIsY0FBSSxXQUFXLEtBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixTQUEzQixNQUEwQyxDQUFDLENBQUQsR0FBSyxLQUEvQyxHQUF1RCxJQUF2RCxDQUpROztBQU92QixlQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLEdBQXZCLENBUHVCOztBQVV2QixlQUFLLEtBQUwsQ0FBVyxnQkFBWCxHQUE4QixLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixHQUE5QixDQUE5QixDQVZ1Qjs7QUFhdkIsY0FBSSxPQUFPLEtBQUssS0FBTCxDQUFXLGdCQUFYLENBYlk7QUFjdkIsZUFBSyxJQUFJLENBQUosSUFBUyxJQUFkLEVBQW9CO0FBQ2xCLGdCQUFJLEtBQUssY0FBTCxDQUFvQixDQUFwQixDQUFKLEVBQTRCO0FBQzFCLGtCQUFJLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsQ0FBekIsTUFBZ0MsS0FBSyxDQUFMLENBQWhDLEVBQXlDO0FBQzNDLHFCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLENBQXpCLElBQThCLEtBQUssQ0FBTCxDQUE5QixDQUQyQztBQUUzQyxxQkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsSUFBbEMsQ0FBdUMsQ0FBdkMsRUFGMkM7ZUFBN0M7YUFERjtXQURGOztBQVdBLGNBQUksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFLLGVBQUwsQ0FBbkIsSUFBNEMsTUFBTSxJQUFOLEtBQWUsVUFBZixFQUEyQjtBQUN6RSx1QkFBVyxZQUFLO0FBQ2QscUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsT0FBSyxlQUFMLENBQW5CLENBQXlDLE9BQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE9BQUssS0FBTCxDQUFXLEtBQVgsQ0FBckUsRUFBd0YsU0FBeEYsRUFBbUcsS0FBbkcsRUFEYzthQUFMLEVBRVIsRUFGSCxFQUR5RTtXQUEzRTs7QUFRQSxlQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLGNBQXpCLENBQXdDLEdBQXhDLEVBQTZDLEtBQTdDLEVBQW9ELFFBQXBELEVBakN1Qjs7O2VBaGFkIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
