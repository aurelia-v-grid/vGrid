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
            rowCell: "vGrid-row-col",
            rowColumn: "vGrid-row-column",
            rowHeaderCell: "vGrid-row-col-header",
            rowHeaderColumn: "vGrid-row-column-header",
            gridColumn: "",
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
          this.repeatRowTemplate = null;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFPYSxXO0FBK0NYLDZCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFBQSxlQXpDbkIsR0F5Q21CLEdBekNiO0FBQ0oscUJBQVMsT0FETDtBQUVKLGlCQUFLLFdBRkQ7QUFHSix3QkFBWSxjQUhSO0FBSUoseUJBQWEsWUFKVDtBQUtKLHdCQUFZLGNBTFI7QUFNSix3QkFBWSxtQkFOUjtBQU9KLHFCQUFTLGVBUEw7QUFRSix1QkFBVyxrQkFSUDtBQVNKLDJCQUFlLHNCQVRYO0FBVUosNkJBQWlCLHlCQVZiO0FBV0osd0JBQVksRUFYUjtBQVlKLHVCQUFXLGtCQVpQO0FBYUoseUJBQWEsb0JBYlQ7QUFjSiwwQkFBYyxxQkFkVjtBQWVKLG9CQUFRLGVBZko7QUFnQkoscUJBQVMsZ0JBaEJMO0FBaUJKLHdCQUFZLHVCQWpCUjtBQWtCSix5QkFBYSx1QkFsQlQ7QUFtQkosb0NBQXdCLHlCQW5CcEI7QUFvQkosc0JBQVUsaUJBcEJOO0FBcUJKLDBCQUFjLHNCQXJCVjtBQXNCSix5QkFBYSwwQkF0QlQ7QUF1QkosMEJBQWMsMkJBdkJWO0FBd0JKLHdCQUFZLGlCQXhCUjtBQXlCSixvQkFBUTtBQXpCSixXQXlDYTtBQUFBLGVBVG5CLElBU21CLEdBVFo7QUFDTCwyQkFBZSx1QkFEVjtBQUVMLGlDQUFxQjtBQUZoQixXQVNZOztBQUFBLGVBaUhuQixXQWpIbUIsR0FpSEwsVUFBQyxTQUFELEVBQWU7O0FBRTNCLGdCQUFJLFVBQVUsTUFBVixLQUFxQixDQUFyQixJQUEwQixNQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxNQUFuQyxLQUE4QyxNQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLE1BQW5HLElBQTZHLE1BQUssaUJBQXRILEVBQXlJO0FBR3ZJLGtCQUFJLE1BQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsTUFBM0IsR0FBb0MsTUFBSyxtQkFB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dUJBQVgsQ0FBbUMsS0FBSyxLQUFMLENBQVcsZUFBOUMsQ0FGK0I7QUFHckMsbUJBQUssS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFLLEtBQUwsQ0FBVyxlQUE5QyxFQUErRCxLQUFLLEtBQUwsQ0FBVyxXQUExRSxDQUExQjtBQUhnQyxhQUF2QztBQUtEOztBQUlELGNBQUksTUFBTSxJQUFOLEtBQWUsVUFBbkIsRUFBK0I7QUFDN0IsaUJBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0Isa0JBQXRCLEVBQTBDO0FBQ3hDLG1CQUFLLEtBRG1DO0FBRXhDLG9CQUFNLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEtBQUssS0FBTCxDQUFXLGVBQTlDLENBRmtDO0FBR3hDLG1CQUFLLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsS0FBSyxLQUFMLENBQVcsZUFBOUMsRUFBK0QsS0FBSyxLQUFMLENBQVcsV0FBMUUsQ0FBMUI7QUFIbUMsYUFBMUM7QUFLRDtBQUtGLFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
