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
//# sourceMappingURL=data:application/json;base64,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QixtQkFBTyxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxHQUFxQyxDQUFyQyxDQURzQjs7Ozs4QkFJVDtBQUNwQixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FETzthQUFoQixNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7OzRCQU9rQixHQUFHO0FBQ3JCLG1CQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsQ0FBN0IsQ0FEYzs7Ozs4QkFJSztBQUMxQixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLHFCQUFYLENBRE87YUFBaEIsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs0QkFPd0IsR0FBRztBQUMzQixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxxQkFBWCxHQUFtQyxDQUFuQyxDQURvQjs7Ozs4QkFLUDtBQUNwQixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FETzthQUFoQixNQUVPO0FBQ0wscUJBQU8sSUFBUCxDQURLO2FBRlA7OzRCQU9rQixHQUFHO0FBQ3JCLG1CQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsQ0FBN0IsQ0FEYzs7Ozs4QkFJRTtBQUN2QixnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGtCQUFYLENBRE87YUFBaEIsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs0QkFPcUIsR0FBRztBQUN4QixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxHQUFnQyxDQUFoQyxDQURpQjs7Ozs4QkFLUTtBQUNoQyxnQkFBSSxLQUFLLEtBQUwsRUFBWTtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLDJCQUFYLENBRE87YUFBaEIsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs0QkFPOEIsR0FBRztBQUNqQyxtQkFBTyxLQUFLLEtBQUwsQ0FBVywyQkFBWCxHQUF5QyxDQUF6QyxDQUQwQjs7Ozs4QkFNakI7QUFDaEIsZ0JBQUksS0FBSyxLQUFMLEVBQVk7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBRE87YUFBaEIsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQOzs0QkFPYyxHQUFHO0FBQ2pCLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsR0FBeUIsQ0FBekIsQ0FEVTs7OztlQXRiUiIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
