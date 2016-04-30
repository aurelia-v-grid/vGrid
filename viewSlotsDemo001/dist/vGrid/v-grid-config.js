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
              if (_this.vGrid.vGridCellHelper.curElement && _this.vGrid.vGridCellHelper.updated === false) {
                _this.vGrid.vGridCellHelper.updateActual(_this.vGrid.vGridCellHelper.callbackObject());
              }

              var curKey = -1;
              if (_this.vGrid.currentRowEntity) {
                curKey = _this.vGrid.currentRowEntity[_this.vGrid.sgkey];
              }
              if (filterObj.length === 0 && _this.vGrid.collectionFiltered.length !== _this.vGrid.collection.length) {
                _this.vGrid.collectionFiltered = _this.vGrid.collection.slice(0);
              } else {

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

              if (newRowNo > -1) {
                _this.vGrid.currentRowEntity = _this.vGrid.collectionFiltered[newRowNo];
                _this.vGrid.currentEntity[_this.vGrid.sgkey] = _this.vGrid.currentRowEntity[_this.vGrid.sgkey];
                _this.vGrid.filterRow = newRowNo;
              }

              _this.vGrid.vGridGenerator.collectionChange(true);
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
          this.addFilter = false;
          this.filterOnAtTop = false;
          this.filterOnKey = false;
          this.sortOnHeaderClick = false;
          this.largeBuffer = false;
          this.activeSorting = false;

          this.eventOnRowDraw = null;

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

          if (this.vGrid.vGridCellHelper.curElement && this.vGrid.vGridCellHelper.updated === false) {
            this.vGrid.vGridCellHelper.updateActual(this.vGrid.vGridCellHelper.callbackObject());
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

            this.vGrid.collectionFiltered.forEach(function (x, index) {
              if (_this2.vGrid.currentEntity[_this2.vGrid.sgkey] === x[_this2.vGrid.sgkey]) {
                _this2.vGrid.filterRow = index;
              }
            });

            this.vGrid.vGridGenerator.collectionChange();
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

          if (this.vGrid.currentRowEntity) {
            this.vGrid.vGridCellHelper.editCellhelper(row, event);
          }
        };

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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Q0FBYSxPQUFPLEtBQUs7QUFJdkIsZUFBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixHQUF2QixDQUp1Qjs7QUFPdkIsZUFBSyxLQUFMLENBQVcsZ0JBQVgsR0FBOEIsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsR0FBOUIsQ0FBOUIsQ0FQdUI7O0FBVXZCLGNBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQVZZO0FBV3ZCLGVBQUssSUFBSSxDQUFKLElBQVMsSUFBZCxFQUFvQjtBQUNsQixnQkFBSSxLQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBSixFQUE0QjtBQUMxQixrQkFBSSxLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLENBQXpCLE1BQWdDLEtBQUssQ0FBTCxDQUFoQyxFQUF5QztBQUMzQyxxQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixDQUF6QixJQUE4QixLQUFLLENBQUwsQ0FBOUIsQ0FEMkM7QUFFM0MscUJBQUssS0FBTCxDQUFXLHNCQUFYLENBQWtDLElBQWxDLENBQXVDLENBQXZDLEVBRjJDO2VBQTdDO2FBREY7V0FERjs7QUFXRCxjQUFHLEtBQUssS0FBTCxDQUFXLGdCQUFYLEVBQTRCO0FBQzdCLGlCQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLGNBQTNCLENBQTBDLEdBQTFDLEVBQStDLEtBQS9DLEVBRDZCO1dBQS9COzs7ZUF0U1UiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
