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
                  var vGridSort = _this.vGrid.vGridSort;
                  vGridSort.lastSort = vGridSort.getFilter().slice(0);
                  _this.vGrid.vGridFilter.lastFilter = filterObj;
                  _this.eventOnRemoteCall(filterObj, vGridSort.getFilter(), function (col) {
                    _this.vGrid.vGridObservables.disableObservablesArray();
                    _this.vGrid.vGridObservables.disableObservablesCollection();
                    _this.vGrid.vGridCollection = col;
                    _this.vGrid.vGridCollectionFiltered = _this.vGrid.vGridCollection.slice(0);
                    _this.vGrid.checkKeys();
                    _this.vGrid.vGridCurrentRow = -1;
                    if (!_this.isRemoteIndex) {
                      _this.vGrid.vGridSelection.reset();
                    }

                    _this.vGrid.vGridGenerator.collectionChange();

                    setTimeout(function () {
                      _this.vGrid.vGridObservables.enableObservablesArray();
                      _this.vGrid.vGridObservables.enableObservablesCollection();
                      _this.vGrid.loading = false;
                    }, 200);
                  });
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

        VGridConfig.prototype.init = function init() {

          this.attributeArray = this.vGrid.vGridContextObj.colAttrArray ? this.vGrid.vGridContextObj.colAttrArray : this.attributeArray;
          this.columnWidthArray = this.vGrid.vGridContextObj.colWidthArray ? this.vGrid.vGridContextObj.colWidthArray : this.columnWidthArray;
          this.headerArray = this.vGrid.vGridContextObj.colHeaderArray ? this.vGrid.vGridContextObj.colHeaderArray : this.headerArray;
          this.filterArray = this.vGrid.vGridContextObj.colFilterArray ? this.vGrid.vGridContextObj.colFilterArray : this.filterArray;
          this.readOnlyArray = this.vGrid.vGridContextObj.colReadonlyArray ? this.vGrid.vGridContextObj.colReadonlyArray : this.readOnlyArray;
          this.colStyleArray = this.vGrid.vGridContextObj.colStyleArray ? this.vGrid.vGridContextObj.colStyleArray : this.colStyleArray;
          this.colTypeArray = this.vGrid.vGridContextObj.colTypeArray ? this.vGrid.vGridContextObj.colTypeArray : this.colTypeArray;
          this.colFormaterArray = this.vGrid.vGridContextObj.colFormaterArray ? this.vGrid.vGridContextObj.colFormaterArray : this.colFormaterArray;
          this.colEditRawArray = this.vGrid.vGridContextObj.colEditRawArray ? this.vGrid.vGridContextObj.colEditRawArray : this.colEditRawArray;
          this.filterOnKeyArray = this.vGrid.vGridContextObj.colFilterOnKeyArray ? this.vGrid.vGridContextObj.colFilterOnKeyArray : this.filterOnKeyArray;
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
          var _this2 = this;

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
              _this2.vGrid.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this2.vGrid.vGridSort.getFilter());

              if (_this2.eventOnRemoteCall) {
                var vGridSort = _this2.vGrid.vGridSort;
                vGridSort.lastSort = vGridSort.getFilter().slice(0);

                _this2.eventOnRemoteCall(_this2.vGrid.vGridFilter.lastFilter, vGridSort.getFilter(), function (col) {
                  _this2.vGrid.vGridObservables.disableObservablesArray();
                  _this2.vGrid.vGridObservables.disableObservablesCollection();
                  _this2.vGrid.vGridCollection = col;
                  _this2.vGrid.vGridCollectionFiltered = _this2.vGrid.vGridCollection.slice(0);
                  _this2.vGrid.checkKeys();
                  _this2.vGrid.vGridCurrentRow = -1;
                  if (!_this2.isRemoteIndex) {
                    _this2.vGrid.vGridSelection.reset();
                  }
                  _this2.vGrid.vGridGenerator.collectionChange();
                  _this2.vGrid.loading = false;
                  setTimeout(function () {
                    _this2.vGrid.vGridObservables.enableObservablesArray();
                    _this2.vGrid.vGridObservables.enableObservablesCollection();
                  }, 200);
                });
              } else {
                _this2.vGrid.vGridSort.run(_this2.vGrid.vGridCollectionFiltered);

                if (_this2.vGrid.vGridCurrentEntityRef) {
                  _this2.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
                    if (_this2.vGrid.vGridCurrentEntityRef[_this2.vGrid.vGridRowKey] === x[_this2.vGrid.vGridRowKey]) {
                      _this2.vGrid.vGridCurrentRow = index;
                    }
                  });
                }

                _this2.vGrid.vGridGenerator.collectionChange();
                _this2.vGrid.loading = false;
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
                this.vGrid.vGridSkipNextUpdateProperty.push(k);
              }
            }
          }

          if (this.vGrid.vGridCurrentEntityRef) {
            this.vGrid.vGridCellHelper.editCellhelper(row, event);
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
//# sourceMappingURL=data:application/json;base64,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
