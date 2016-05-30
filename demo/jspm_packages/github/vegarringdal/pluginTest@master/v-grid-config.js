/* */ 
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var VGridConfig = exports.VGridConfig = function () {
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

      this.keepFilterOnCollectionChange = false;
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
  }();
});