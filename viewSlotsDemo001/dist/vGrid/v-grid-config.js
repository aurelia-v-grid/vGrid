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
          this.lockedColumns = 0;
          this.addFilter = false;
          this.filterOnAtTop = false;
          this.filterOnKey = false;
          this.sortOnHeaderClick = false;
          this.largeBuffer = false;

          this.eventOnRowDraw = null;

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
            this.vGrid.vGridCellEdit.editCellhelper(row, event);
          }
        };

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFYLEdBQXVCLEdBQXZCLENBSnVCOztBQU92QixlQUFLLEtBQUwsQ0FBVyxnQkFBWCxHQUE4QixLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixHQUE5QixDQUE5QixDQVB1Qjs7QUFVdkIsY0FBSSxPQUFPLEtBQUssS0FBTCxDQUFXLGdCQUFYLENBVlk7QUFXdkIsZUFBSyxJQUFJLENBQUosSUFBUyxJQUFkLEVBQW9CO0FBQ2xCLGdCQUFJLEtBQUssY0FBTCxDQUFvQixDQUFwQixDQUFKLEVBQTRCO0FBQzFCLGtCQUFJLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsQ0FBekIsTUFBZ0MsS0FBSyxDQUFMLENBQWhDLEVBQXlDO0FBQzNDLHFCQUFLLEtBQUwsQ0FBVyxhQUFYLENBQXlCLENBQXpCLElBQThCLEtBQUssQ0FBTCxDQUE5QixDQUQyQztBQUUzQyxxQkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsSUFBbEMsQ0FBdUMsQ0FBdkMsRUFGMkM7ZUFBN0M7YUFERjtXQURGOztBQVdELGNBQUcsS0FBSyxLQUFMLENBQVcsZ0JBQVgsRUFBNEI7QUFDN0IsaUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsY0FBekIsQ0FBd0MsR0FBeEMsRUFBNkMsS0FBN0MsRUFENkI7V0FBL0I7OztlQW5TVSIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
