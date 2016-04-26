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
                  filterObj = _this.eventFormatHandler("onFilter", filterObj);
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

          this.columns = this.vGrid.element.getElementsByTagName("V-GRID-COL");
          this.attributeArray = [];
          this.columnWidthArray = [];
          this.headerArray = [];
          this.filterArray = [];
          this.readOnlyArray = [];
          this.colStyleArray = [];
          this.colTypeArray = [];

          this.rowHeight = 50;
          this.headerHeight = 0;
          this.footerHeight = 0;
          this.isResizableHeaders = false;
          this.isMultiSelect = undefined;
          this.isSortableHeader = false;
          this.requestAnimationFrame = true;
          this.resizableHeadersAndRows = false;
          this.renderOnScrollbarScroll = true;
          this.lockedColumns = 0;
          this.addFilter = false;
          this.filterOnAtTop = false;
          this.filterOnKey = false;
          this.sortOnHeaderClick = false;
          this.largeBuffer = false;

          this.eventFormatHandler = null;
          this.eventOnDblClick = null;
          this.eventOnRowDraw = null;
          this.eventOnCellDraw = null;
          this.eventOnHeaderInputClick = null;

          this.doNotAddFilterTo = [];
          this.sortNotOnHeader = [];
        }

        VGridConfig.prototype.getFilterName = function getFilterName(name) {
          return this.vGrid.vGridFilter.getNameOfFilter(name);
        };

        VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, callback) {
          if (this.vGrid.collectionFiltered !== undefined) {
            if (this.eventOnRowDraw) {
              var data = this.vGrid.vGridInterpolate.getNewObject(this.vGrid.collectionFiltered[row]);
              this.eventOnRowDraw(data, this.vGrid.collectionFiltered[row]);
              callback(data);
            } else {
              callback(this.vGrid.collectionFiltered[row]);
            }
          }
        };

        VGridConfig.prototype.cellDrawEvent = function cellDrawEvent(data) {
          if (this.vGrid.collectionFiltered !== undefined) {
            if (this.eventOnCellDraw) {
              var rowdata = this.vGrid.vGridInterpolate.getNewObject(this.vGrid.collectionFiltered[data.row]);
              this.eventOnCellDraw({
                attributeName: data.attributeName,
                div: data.div,
                rowdata: rowdata,
                colData: this.vGrid.collectionFiltered[data.row]
              }).bind(this.vGrid.$parent);
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
          if (this.eventOnHeaderInputClick) {

            this.eventOnHeaderInputClick(null, attribute, event);
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

          if (this.eventOnDblClick && event.type === "dblclick") {
            setTimeout(function () {
              _this3.eventOnDblClick(_this3.vGrid.currentRowEntity[_this3.vGrid.sgkey], attribute, event);
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
//# sourceMappingURL=data:application/json;base64,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M0MscUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsQ0FBekIsSUFBOEIsS0FBSyxDQUFMLENBQTlCLENBRDJDO0FBRTNDLHFCQUFLLEtBQUwsQ0FBVyxzQkFBWCxDQUFrQyxJQUFsQyxDQUF1QyxDQUF2QyxFQUYyQztlQUE3QzthQURGO1dBREY7O0FBV0EsY0FBSSxLQUFLLGVBQUwsSUFBd0IsTUFBTSxJQUFOLEtBQWUsVUFBZixFQUEyQjtBQUNyRCx1QkFBVyxZQUFLO0FBQ2QscUJBQUssZUFBTCxDQUFxQixPQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixPQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWpELEVBQW9FLFNBQXBFLEVBQStFLEtBQS9FLEVBRGM7YUFBTCxFQUVSLEVBRkgsRUFEcUQ7V0FBdkQ7O0FBUUEsZUFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixjQUF6QixDQUF3QyxHQUF4QyxFQUE2QyxLQUE3QyxFQUFvRCxRQUFwRCxFQWpDdUI7OztlQTlUZCIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
