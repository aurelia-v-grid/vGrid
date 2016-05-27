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
          this.headerArray = [];
          this.filterArray = [];
          this.readOnlyArray = [];
          this.colStyleArray = [];
          this.colTypeArray = [];
          this.colFormaterArray = [];
          this.colEditRawArray = [];
          this.filterOnKeyArray = [];
          this.colCustomArray = [];

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
            this.attributes.forEach(function (prop) {
              x[prop] = obj[prop];
            });
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
              this.eventOnRowDraw(data, this.vGrid.vGridCollectionFiltered[row]);
              callback(data);
            } else {
              callback(this.vGrid.vGridCollectionFiltered[row]);
            }
          }
        };

        VGridConfig.prototype.onOrderBy = function onOrderBy(event, setheaders) {
          var _this3 = this;

          var attribute = event.target.getAttribute(this.atts.dataAttribute);
          if (attribute === null) {
            attribute = event.target.offsetParent.getAttribute(this.atts.dataAttribute);
          }

          var canSortThisAttribute = true;
          if (this.sortNotOnHeader.indexOf(attribute) !== -1) {
            canSortThisAttribute = false;
          }

          if (this.vGrid.vGridCollectionFiltered.length > 0 && attribute && canSortThisAttribute) {
            if (this.vGrid.vGridCollection.length > this.loadingThreshold) {
              this.vGrid.loading = true;
            }

            setTimeout(function () {
              _this3.vGrid.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this3.vGrid.vGridSort.getFilter());

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
          if (this.addFilter) {
            return this.vGrid.vGridCollectionFiltered.length;
          } else {
            return this.vGrid.vGridCollection.length;
          }
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

          if (event.type === "click" && this.eventOnRowClick) {
            var newEvent = document.createEvent('Event');
            newEvent.initEvent("eventOnRowClick", true, true);
            event.target.dispatchEvent(newEvent);
          }

          if (event.type === "dblclick" && this.eventOnRowDblClick) {
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
//# sourceMappingURL=data:application/json;base64,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QUNGLG1CQUpEO0FBS0Q7O0FBSUQsdUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZ0JBQTFCO0FBQ0EsdUJBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsS0FBckI7QUFDRDtBQUVGLGFBdENELEVBc0NHLEVBdENIO0FBdUNEO0FBR0YsUzs7OEJBT0QsbUIsa0NBQXNCO0FBQ3BCLGNBQUksS0FBSyxTQUFULEVBQW9CO0FBQ2xCLG1CQUFPLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLE1BQTFDO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU8sS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixNQUFsQztBQUNEO0FBQ0YsUzs7OEJBT0QsWSx5QkFBYSxLLEVBQU8sRyxFQUFLO0FBSXZCLGVBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsR0FBN0I7O0FBSUEsZUFBSyxLQUFMLENBQVcscUJBQVgsR0FBbUMsS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsR0FBbkMsQ0FBbkM7O0FBSUEsY0FBSSxPQUFPLEtBQUssS0FBTCxDQUFXLHFCQUF0QjtBQUNBLGVBQUssSUFBSSxDQUFULElBQWMsSUFBZCxFQUFvQjtBQUNsQixnQkFBSSxLQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBSixFQUE0QjtBQUMxQixrQkFBSSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixDQUE5QixNQUFxQyxLQUFLLENBQUwsQ0FBekMsRUFBa0Q7QUFDaEQscUJBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLENBQTlCLElBQW1DLEtBQUssQ0FBTCxDQUFuQztBQUNEO0FBQ0Y7QUFDRjs7QUFJRCxjQUFJLE1BQU0sSUFBTixLQUFlLE9BQWYsSUFBMEIsS0FBSyxlQUFuQyxFQUFvRDtBQUNsRCxnQkFBSSxXQUFXLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFmO0FBQ0EscUJBQVMsU0FBVCxDQUFtQixpQkFBbkIsRUFBc0MsSUFBdEMsRUFBNEMsSUFBNUM7QUFDQSxrQkFBTSxNQUFOLENBQWEsYUFBYixDQUEyQixRQUEzQjtBQUNEOztBQUlELGNBQUksTUFBTSxJQUFOLEtBQWUsVUFBZixJQUE2QixLQUFLLGtCQUF0QyxFQUEwRDtBQUN4RCxnQkFBSSxXQUFXLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFmO0FBQ0EscUJBQVMsU0FBVCxDQUFtQixvQkFBbkIsRUFBeUMsSUFBekMsRUFBK0MsSUFBL0M7QUFDQSxrQkFBTSxNQUFOLENBQWEsYUFBYixDQUEyQixRQUEzQjtBQUNEO0FBR0YsUzs7Ozs0QkE5U2UsSyxFQUFPO0FBQ3JCLGlCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxpQkFBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixLQUF6QjtBQUNELFc7OEJBRWlCO0FBQ2hCLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQWxCO0FBQ0QiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
