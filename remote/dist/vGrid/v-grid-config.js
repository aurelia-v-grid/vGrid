"use strict";

System.register([], function (_export, _context) {
  "use strict";

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
            dragHandle: "vGrid-vGridDragHandle",
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

            if (filterObj.length !== 0 || _this.vGrid.vGridCollectionFiltered.length !== _this.vGrid.vGridCollection.length || _this.eventOnRemoteCall) {
              if (_this.vGrid.vGridCollection.length > _this.loadingThreshold) {
                _this.vGrid.loading = true;
              }

              setTimeout(function () {
                var curKey = -1;
                if (_this.vGrid.vGridCurrentEntityRef) {
                  curKey = _this.vGrid.vGridCurrentEntityRef[_this.vGrid.vGridRowKey];
                }

                if (_this.eventOnRemoteCall) {
                  _this.vGrid.vGridFilter.lastFilter = filterObj;

                  _this.remoteOffset = 0;

                  _this.remoteCall();
                } else {
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
                  _this.vGrid.loading = false;
                }
              }, 50);
            }
          };

          this.vGrid = vGrid;

          this.attributeArray = [];

          this.columnWidthArray = [];
          this.colRowTemplateArray = [];
          this.colHeaderTemplateArray = [];
          this.colConfig = [];

          this.columnLenght = 0;
          this.rowHeight = 50;
          this.headerHeight = 0;
          this.footerHeight = 0;
          this.isResizableHeaders = false;
          this.isMultiSelect = undefined;
          this.isSortableHeader = false;
          this.loadingThreshold = -1;
          this.eventOnRowDraw = null;
          this.eventOnRowClick = null;
          this.eventOnRowDblClick = null;
          this.eventOnRemoteCall = null;
          this.isRemoteIndex = false;

          this.dataScrollDelay = 200;
          this.requestAnimationFrame = true;
          this.resizableHeadersAndRows = true;
          this.renderOnScrollbarScroll = true;

          this.keepFilterOnCollectionChange = false;
          this.remoteLimit = 40;
          this.remoteLength = 0;
          this.remoteOffset = 0;
        }

        VGridConfig.prototype.getRowProperties = function getRowProperties(obj) {
          if (obj) {
            var x = {};
            for (var k in obj) {
              if (obj.hasOwnProperty(k)) {
                if (x[k] !== obj[k]) {
                  x[k] = obj[k];
                }
              }
            }
            return x;
          } else {
            return "";
          }
        };

        VGridConfig.prototype.remoteCall = function remoteCall(data) {
          var _this2 = this;

          data = data ? data : {};
          this.eventOnRemoteCall({
            filter: data.filter || this.vGrid.vGridFilter.lastFilter,
            sort: data.sort || this.vGrid.vGridSort.getFilter(),
            limit: data.limit || this.remoteLimit,
            offset: data.offset || this.remoteOffset
          }).then(function (data) {

            _this2.vGrid.vGridObservables.disableObservablesArray();
            _this2.vGrid.vGridObservables.disableObservablesCollection();
            _this2.vGrid.vGridCollection = data.col;
            _this2.remoteLimit = data.limit;
            _this2.remoteLength = data.length;
            _this2.vGrid.vGridCollectionFiltered = _this2.vGrid.vGridCollection.slice(0);
            _this2.vGrid.checkKeys();
            _this2.vGrid.vGridCurrentRow = -1;
            if (!_this2.isRemoteIndex) {
              _this2.vGrid.vGridSelection.reset();
            }
            _this2.vGrid.vGridGenerator.collectionChange();
            _this2.vGrid.loading = false;
            _this2.vGrid.vGridPager.updatePager({
              limit: _this2.remoteLimit,
              offset: _this2.remoteOffset,
              length: _this2.remoteLength
            });
            setTimeout(function () {
              _this2.vGrid.vGridObservables.enableObservablesArray();
              _this2.vGrid.vGridObservables.enableObservablesCollection();
            }, 200);
          });
        };

        VGridConfig.prototype.getFilterName = function getFilterName(name) {
          return this.vGrid.vGridFilter.getNameOfFilter(name);
        };

        VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, callback) {
          if (this.vGrid.vGridCollectionFiltered !== undefined) {
            if (this.eventOnRowDraw) {
              var data = this.getRowProperties(this.vGrid.vGridCollectionFiltered[row]);
              this.eventOnRowDraw({
                tempRef: data || null,
                rowRef: this.vGrid.vGridCollectionFiltered[row] || null
              });
              callback(data);
            } else {
              callback(this.vGrid.vGridCollectionFiltered[row]);
            }
          }
        };

        VGridConfig.prototype.onOrderBy = function onOrderBy(attribute, add) {
          var _this3 = this;

          if (this.vGrid.vGridCollectionFiltered.length > 0) {
            if (this.vGrid.vGridCollection.length > this.loadingThreshold) {
              this.vGrid.loading = true;
            }

            setTimeout(function () {
              _this3.vGrid.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, add);

              var event = new CustomEvent("sortIconUpdate", {
                detail: "",
                bubbles: true
              });
              _this3.vGrid.element.dispatchEvent(event);

              if (_this3.eventOnRemoteCall) {
                _this3.remoteCall();
              } else {
                _this3.vGrid.vGridSort.run(_this3.vGrid.vGridCollectionFiltered);

                if (_this3.vGrid.vGridCurrentEntityRef) {
                  _this3.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                    if (_this3.vGrid.vGridCurrentEntityRef[_this3.vGrid.vGridRowKey] === x[_this3.vGrid.vGridRowKey]) {
                      _this3.vGrid.vGridCurrentRow = index;
                    }
                  });
                }

                _this3.vGrid.vGridGenerator.collectionChange();
                _this3.vGrid.loading = false;
              }
            }, 50);
          }
        };

        VGridConfig.prototype.getCollectionLength = function getCollectionLength() {
          return this.vGrid.vGridCollectionFiltered.length;
        };

        VGridConfig.prototype.clickHandler = function clickHandler(event, row) {
          this.vGrid.vGridCurrentRow = row;

          this.vGrid.vGridCurrentEntityRef = this.vGrid.vGridCollectionFiltered[row];

          var data = this.vGrid.vGridCurrentEntityRef;
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              if (this.vGrid.vGridCurrentEntity[k] !== data[k]) {
                this.vGrid.vGridCurrentEntity[k] = data[k];
              }
            }
          }

          if (event.type === "click") {
            this.vGrid.raiseEvent("v-row-onclick", {
              evt: event,
              data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
              row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
            });
          }

          if (event.type === "dblclick") {
            this.vGrid.raiseEvent("v-row-ondblclick", {
              evt: event,
              data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
              row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
            });
          }
        };

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFYLENBQW1DLEtBQUssS0FBTCxDQUFXLGVBQTlDLENBRitCO0FBR3JDLG1CQUFLLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsS0FBSyxLQUFMLENBQVcsZUFBOUMsRUFBK0QsS0FBSyxLQUFMLENBQVcsV0FBMUUsQ0FBMUI7QUFIZ0MsYUFBdkM7QUFLRDs7QUFJRCxjQUFJLE1BQU0sSUFBTixLQUFlLFVBQW5CLEVBQStCO0FBQzdCLGlCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLGtCQUF0QixFQUEwQztBQUN4QyxtQkFBSyxLQURtQztBQUV4QyxvQkFBTSxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFLLEtBQUwsQ0FBVyxlQUE5QyxDQUZrQztBQUd4QyxtQkFBSyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEtBQUssS0FBTCxDQUFXLGVBQTlDLEVBQStELEtBQUssS0FBTCxDQUFXLFdBQTFFLENBQTFCO0FBSG1DLGFBQTFDO0FBS0Q7QUFLRixTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
