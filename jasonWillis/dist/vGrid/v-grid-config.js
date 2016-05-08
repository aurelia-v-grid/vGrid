"use strict";

System.register([], function (_export, _context) {
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

            if (filterObj.length !== 0 || _this.vGridCollectionFiltered.length !== _this.vGridCollection.length) {

              var curKey = -1;
              if (_this.vGridCurrentEntityRef) {
                curKey = _this.vGridCurrentEntityRef[_this.vGridRowKey];
              }
              if (filterObj.length === 0 && _this.vGridCollectionFiltered.length !== _this.vGridCollection.length) {
                _this.vGridCollectionFiltered = _this.vGridCollection.slice(0);
              } else {

                _this.vGridCollectionFiltered = _this.vGridFilter.run(_this.vGridCollection, filterObj);
                _this.vGridSort.run(_this.vGridCollectionFiltered);
              }

              var newRowNo = -1;
              if (curKey) {
                _this.vGridCollectionFiltered.forEach(function (x, index) {
                  if (curKey === x[_this.vGridRowKey]) {
                    newRowNo = index;
                  }
                });
              }

              if (newRowNo > -1) {
                _this.vGridCurrentEntityRef = _this.vGridCollectionFiltered[newRowNo];
                _this.vGridCurrentEntity[_this.vGridRowKey] = _this.vGridCurrentEntityRef[_this.vGridRowKey];
                _this.vGridCurrentRow = newRowNo;
              } else {
                _this.vGridCurrentRow = newRowNo;
              }

              _this.vGridGenerator.collectionChange(true);
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

          this.eventOnRowDraw = null;
          this.eventOnRowClick = null;
          this.eventOnRowDblClick = null;

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
          return this.vGridFilter.getNameOfFilter(name);
        };

        VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, callback) {
          if (this.vGridCollectionFiltered !== undefined) {
            if (this.eventOnRowDraw) {
              var data = this.getNewObject(this.vGridCollectionFiltered[row]);
              this.eventOnRowDraw(data, this.vGridCollectionFiltered[row]);
              callback(data);
            } else {
              callback(this.vGridCollectionFiltered[row]);
            }
          }
        };

        VGridConfig.prototype.onOrderBy = function onOrderBy(event, setheaders) {
          var _this2 = this;

          var attribute = event.target.getAttribute(this.atts.dataAttribute);
          if (attribute === null) {
            attribute = event.target.offsetParent.getAttribute(this.atts.dataAttribute);
          }
          var checked = true;
          if (this.sortNotOnHeader.indexOf(attribute) !== -1) {
            checked = false;
          }

          if (this.vGridCollectionFiltered.length > 0 && attribute && checked) {
            this.vGridSort.setFilter({
              attribute: attribute,
              asc: true
            }, event.shiftKey);

            setheaders(this.vGridSort.getFilter());

            this.vGridSort.run(this.vGridCollectionFiltered);

            this.vGridCollectionFiltered.forEach(function (x, index) {
              if (_this2.vGridCurrentEntityRef) {
                if (_this2.vGridCurrentEntityRef[_this2.vGridRowKey] === x[_this2.vGridRowKey]) {
                  _this2.vGridCurrentRow = index;
                }
              }
            });

            this.vGridGenerator.collectionChange();
          }
        };

        VGridConfig.prototype.getCollectionLength = function getCollectionLength() {
          if (this.addFilter) {
            return this.vGridCollectionFiltered.length;
          } else {
            return this.vGridCollection.length;
          }
        };

        VGridConfig.prototype.clickHandler = function clickHandler(event, row) {
          this.vGridCurrentRow = row;

          this.vGridCurrentEntityRef = this.vGridCollectionFiltered[row];

          var data = this.vGridCurrentEntityRef;
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              if (this.vGridCurrentEntity[k] !== data[k]) {
                this.vGridCurrentEntity[k] = data[k];
                this.vGridSkipNextUpdateProperty.push(k);
              }
            }
          }

          if (this.vGridCurrentEntityRef) {
            this.vGridCellHelper.editCellhelper(row, event);
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
          key: "vGridCellHelper",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCellHelper;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridFilter",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridFilter;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridSort",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSort;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridGenerator",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridGenerator;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridCollectionFiltered",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCollectionFiltered;
            } else {
              return null;
            }
          },
          set: function set(x) {
            return this.vGrid.vGridCollectionFiltered = x;
          }
        }, {
          key: "vGridCollection",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCollection;
            } else {
              return null;
            }
          },
          set: function set(x) {
            return this.vGrid.vGridCollection = x;
          }
        }, {
          key: "vGridCurrentEntityRef",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCurrentEntityRef;
            } else {
              return null;
            }
          },
          set: function set(x) {
            return this.vGrid.vGridCurrentEntityRef = x;
          }
        }, {
          key: "vGridCurrentRow",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCurrentRow;
            } else {
              return null;
            }
          },
          set: function set(x) {
            return this.vGrid.vGridCurrentRow = x;
          }
        }, {
          key: "vGridCurrentEntity",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCurrentEntity;
            } else {
              return null;
            }
          },
          set: function set(x) {
            return this.vGrid.vGridCurrentEntity = x;
          }
        }, {
          key: "vGridSkipNextUpdateProperty",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSkipNextUpdateProperty;
            } else {
              return null;
            }
          },
          set: function set(x) {
            return this.vGrid.vGridSkipNextUpdateProperty = x;
          }
        }, {
          key: "vGridRowKey",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridRowKey;
            } else {
              return null;
            }
          },
          set: function set(x) {
            return this.vGrid.vGridRowKey = x;
          }
        }]);

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFoQixNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7OzRCQU9xQixHQUFHO0FBQ3hCLG1CQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFYLEdBQWdDLENBQWhDLENBRGlCOzs7OzhCQUtRO0FBQ2hDLGdCQUFJLEtBQUssS0FBTCxFQUFZO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsMkJBQVgsQ0FETzthQUFoQixNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7OzRCQU84QixHQUFHO0FBQ2pDLG1CQUFPLEtBQUssS0FBTCxDQUFXLDJCQUFYLEdBQXlDLENBQXpDLENBRDBCOzs7OzhCQU1qQjtBQUNoQixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FETzthQUFoQixNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7OzRCQU9jLEdBQUc7QUFDakIsbUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixDQUF6QixDQURVOzs7O2VBeGNSIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
