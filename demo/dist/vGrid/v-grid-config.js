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
            sortIconNo: "vGrid-glyphicon",
            noData: "vGrid-row-no-data"
          };
          this.atts = {
            dataAttribute: "v-grid-data-attribute",
            dataAttributeFilter: "v-grid-data-attribute-filter"
          };

          this.onFilterRun = function (filterObj) {

            if (filterObj.length !== 0 || _this.vGrid.vGridCollectionFiltered.length !== _this.vGrid.vGridCollection.length || _this.eventOnRemoteCall) {
              if (_this.vGrid.vGridCollection.length > _this.attLoadingThreshold) {
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

          this.colConfig = [];

          this.columnLength = 0;

          this.attAttributeObserve = [];
          this.attRowHeight = 50;
          this.attHeaderHeight = 0;
          this.attFooterHeight = 0;
          this.attResizableHeaders = false;
          this.attMultiSelect = undefined;
          this.attSortableHeader = false;
          this.attLoadingThreshold = -1;
          this.attRemoteIndex = false;
          this.attManualSelection = false;

          this.eventOnRowDraw = null;
          this.eventOnRowClick = null;
          this.eventOnRowDblClick = null;
          this.eventOnRemoteCall = null;

          this.repeater = false;
          this.repeatTemplate = null;

          this.attDataScrollDelay = 200;
          this.attRequestAnimationFrame = true;
          this.attResizableHeadersAndRows = true;
          this.attRenderOnScrollbarScroll = true;

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
            if (!_this2.attRemoteIndex) {
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
            if (this.vGrid.vGridCollection.length > this.attLoadingThreshold) {
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
//# sourceMappingURL=data:application/json;base64,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dUJBQVgsQ0FBbUMsS0FBSyxLQUFMLENBQVcsZUFBOUMsQ0FGK0I7QUFHckMsbUJBQUssS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFLLEtBQUwsQ0FBVyxlQUE5QyxFQUErRCxLQUFLLEtBQUwsQ0FBVyxXQUExRSxDQUExQjtBQUhnQyxhQUF2QztBQUtEOztBQUlELGNBQUksTUFBTSxJQUFOLEtBQWUsVUFBbkIsRUFBK0I7QUFDN0IsaUJBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0Isa0JBQXRCLEVBQTBDO0FBQ3hDLG1CQUFLLEtBRG1DO0FBRXhDLG9CQUFNLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEtBQUssS0FBTCxDQUFXLGVBQTlDLENBRmtDO0FBR3hDLG1CQUFLLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsS0FBSyxLQUFMLENBQVcsZUFBOUMsRUFBK0QsS0FBSyxLQUFMLENBQVcsV0FBMUUsQ0FBMUI7QUFIbUMsYUFBMUM7QUFLRDtBQUtGLFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
