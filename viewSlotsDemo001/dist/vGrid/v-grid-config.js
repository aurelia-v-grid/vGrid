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
          this.attributes = [];

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

          this.columns = [];
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
          this.eventOnHeaderInputClick = null;

          this.doNotAddFilterTo = [];
          this.sortNotOnHeader = [];
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

        VGridConfig.prototype.getFilterName = function getFilterName(name) {
          return this.vGrid.vGridFilter.getNameOfFilter(name);
        };

        VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, callback) {
          if (this.vGrid.collectionFiltered !== undefined) {
            if (this.eventOnRowDraw) {
              var data = this.getNewObject(this.vGrid.collectionFiltered[row]);
              this.eventOnRowDraw(data, this.vGrid.collectionFiltered[row]);
              callback(data);
            } else {
              callback(this.vGrid.collectionFiltered[row]);
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

          if (this.eventOnDblClick && event.type === "dblclick" && this.vGrid.currentRowEntity) {
            setTimeout(function () {
              _this3.eventOnDblClick(_this3.vGrid.currentRowEntity[_this3.vGrid.sgkey], attribute, event);
            }, 15);
          }

          if (this.vGrid.currentRowEntity) {
            this.vGrid.vGridCellEdit.editCellhelper(row, event, readonly);
          }
        };

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QVUsYUFBVixDQUF0QyxDQURpQjtBQUVyQixjQUFJLEtBQUssdUJBQUwsRUFBOEI7O0FBR2hDLGlCQUFLLHVCQUFMLENBQTZCLElBQTdCLEVBQW1DLFNBQW5DLEVBQThDLEtBQTlDLEVBSGdDO1dBQWxDOzs7QUFoU1MsOEJBNlNYLHFDQUFhLE9BQU8sS0FBSzs7O0FBR3ZCLGNBQUksWUFBWSxNQUFNLE1BQU4sQ0FBYSxZQUFiLENBQTBCLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBdEMsQ0FIbUI7QUFJdkIsY0FBSSxXQUFXLEtBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixTQUEzQixNQUEwQyxDQUFDLENBQUQsR0FBSyxLQUEvQyxHQUF1RCxJQUF2RCxDQUpROztBQU92QixlQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLEdBQXZCLENBUHVCOztBQVV2QixlQUFLLEtBQUwsQ0FBVyxnQkFBWCxHQUE4QixLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixHQUE5QixDQUE5QixDQVZ1Qjs7QUFhdkIsY0FBSSxPQUFPLEtBQUssS0FBTCxDQUFXLGdCQUFYLENBYlk7QUFjdkIsZUFBSyxJQUFJLENBQUosSUFBUyxJQUFkLEVBQW9CO0FBQ2xCLGdCQUFJLEtBQUssY0FBTCxDQUFvQixDQUFwQixDQUFKLEVBQTRCO0FBQzFCLGtCQUFJLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsQ0FBekIsTUFBZ0MsS0FBSyxDQUFMLENBQWhDLEVBQXlDO0FBQzNDLHFCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLENBQXpCLElBQThCLEtBQUssQ0FBTCxDQUE5QixDQUQyQztBQUUzQyxxQkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsSUFBbEMsQ0FBdUMsQ0FBdkMsRUFGMkM7ZUFBN0M7YUFERjtXQURGOztBQVdBLGNBQUksS0FBSyxlQUFMLElBQXdCLE1BQU0sSUFBTixLQUFlLFVBQWYsSUFBNkIsS0FBSyxLQUFMLENBQVcsZ0JBQVgsRUFBNkI7QUFDcEYsdUJBQVcsWUFBSztBQUNkLHFCQUFLLGVBQUwsQ0FBcUIsT0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsT0FBSyxLQUFMLENBQVcsS0FBWCxDQUFqRCxFQUFvRSxTQUFwRSxFQUErRSxLQUEvRSxFQURjO2FBQUwsRUFFUixFQUZILEVBRG9GO1dBQXRGOztBQVFBLGNBQUcsS0FBSyxLQUFMLENBQVcsZ0JBQVgsRUFBNEI7QUFDN0IsaUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsY0FBekIsQ0FBd0MsR0FBeEMsRUFBNkMsS0FBN0MsRUFBb0QsUUFBcEQsRUFENkI7V0FBL0I7OztlQTlVUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
