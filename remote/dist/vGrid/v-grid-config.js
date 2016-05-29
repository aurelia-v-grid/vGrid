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

          this.columnLenght = 0;

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
//# sourceMappingURL=data:application/json;base64,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LEtBQUwsQ0FBVyxjQUFYLENBQTBCLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEtBQUssS0FBTCxDQUFXLGVBQTlDLEVBQStELEtBQUssS0FBTCxDQUFXLFdBQTFFLENBQTFCO0FBSGdDLGFBQXZDO0FBS0Q7O0FBSUQsY0FBSSxNQUFNLElBQU4sS0FBZSxVQUFuQixFQUErQjtBQUM3QixpQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixrQkFBdEIsRUFBMEM7QUFDeEMsbUJBQUssS0FEbUM7QUFFeEMsb0JBQU0sS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsS0FBSyxLQUFMLENBQVcsZUFBOUMsQ0FGa0M7QUFHeEMsbUJBQUssS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFLLEtBQUwsQ0FBVyxlQUE5QyxFQUErRCxLQUFLLEtBQUwsQ0FBVyxXQUExRSxDQUExQjtBQUhtQyxhQUExQztBQUtEO0FBS0YsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
