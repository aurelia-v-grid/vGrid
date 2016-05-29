"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, VGridConfig;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

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
          this.isRemoteIndex = false;
          this.attributes = [];

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

          this.columns = 0;
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
          this.sortOnHeaderClick = false;
          this.largeBuffer = false;
          this.activeSorting = false;
          this.contextmenu = true;
          this.loadingThreshold = -1;
          this.tabbingEnabled = true;

          this.eventOnRowDraw = null;
          this.eventOnRowClick = null;
          this.eventOnRowDblClick = null;
          this.eventOnRemoteCall = null;

          this.doNotAddFilterTo = [];
          this.sortNotOnHeader = [];

          this.dataScrollDelay = 200;

          this.keepFilterOnCollectionChange = false;
          this.remoteLimit = 40;
          this.remoteLength = 0;
          this.remoteOffset = 0;
          this.updatePager = null;
        }

        VGridConfig.prototype.getNewObject = function getNewObject(obj) {
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
              var data = this.getNewObject(this.vGrid.vGridCollectionFiltered[row]);
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
            var newEvent = document.createEvent('Event');
            newEvent.initEvent("eventOnRowClick", true, true);
            event.target.dispatchEvent(newEvent);
          }

          if (event.type === "dblclick") {
            var newEvent = document.createEvent('Event');
            newEvent.initEvent("eventOnRowDblClick", true, true);
            event.target.dispatchEvent(newEvent);
          }
        };

        _createClass(VGridConfig, [{
          key: "remoteIndex",
          set: function set(value) {
            this.isRemoteIndex = true;
            this.vGrid.vGridRowKey = value;
          },
          get: function get() {
            return this.vGrid.vGridRowKey;
          }
        }]);

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jbGFzcy1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFPYSxXO0FBaURYLDZCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFBQSxlQTNDbkIsR0EyQ21CLEdBM0NiO0FBQ0oscUJBQVMsT0FETDtBQUVKLGlCQUFLLFdBRkQ7QUFHSix3QkFBWSxjQUhSO0FBSUoseUJBQWEsWUFKVDtBQUtKLHdCQUFZLGNBTFI7QUFNSix3QkFBWSxtQkFOUjtBQU9KLHFCQUFTLGdCQVBMO0FBUUosdUJBQVcsa0JBUlA7QUFTSiwyQkFBZSx1QkFUWDtBQVVKLDZCQUFpQix5QkFWYjtBQVdKLHdCQUFZLGNBWFI7QUFZSix1QkFBVyxrQkFaUDtBQWFKLHlCQUFhLG9CQWJUO0FBY0osMEJBQWMscUJBZFY7QUFlSixvQkFBUSxlQWZKO0FBZ0JKLHFCQUFTLGdCQWhCTDtBQWlCSix5QkFBYSxlQWpCVDtBQWtCSix3QkFBWSx1QkFsQlI7QUFtQkosMEJBQWMsa0JBbkJWO0FBb0JKLHlCQUFhLHVCQXBCVDtBQXFCSixvQ0FBd0IseUJBckJwQjtBQXNCSixzQkFBVSxpQkF0Qk47QUF1QkosMEJBQWMsc0JBdkJWO0FBd0JKLHlCQUFhLDBCQXhCVDtBQXlCSiwwQkFBYywyQkF6QlY7QUEwQkosd0JBQVksa0JBMUJSO0FBMkJKLG9CQUFRO0FBM0JKLFdBMkNhO0FBQUEsZUFUbkIsSUFTbUIsR0FUWjtBQUNMLDJCQUFlLHVCQURWO0FBRUwsaUNBQXFCO0FBRmhCLFdBU1k7QUFBQSxlQXFEbkIsYUFyRG1CLEdBcURILEtBckRHO0FBQUEsZUFrRW5CLFVBbEVtQixHQWtFTixFQWxFTTs7QUFBQSxlQWlJbkIsV0FqSW1CLEdBaUlMLFVBQUMsU0FBRCxFQUFlOztBQUUzQixnQkFBSSxVQUFVLE1BQVYsS0FBcUIsQ0FBckIsSUFBMEIsTUFBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsTUFB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
