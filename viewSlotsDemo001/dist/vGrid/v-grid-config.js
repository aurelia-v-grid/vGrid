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
              if (_this.vGridCellHelper.curElement && _this.vGridCellHelper.updated === false) {
                _this.vGridCellHelper.updateActual(_this.vGridCellHelper.callbackObject());
              }

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
              }

              _this.vGridGenerator.collectionChange(true);
            }
          };

          this.vGrid = vGrid;

          this.columns = [];
          this.attributeArray = [];
          this.columnWidthArray = [];
          this.headerArray = [];
          this.filterArray = [];
          this.readOnlyArray = [];
          this.colStyleArray = [];
          this.colTypeArray = [];
          this.colFormaterArray = [];
          this.colEditRawArray = [];
          this.colDatePickerArray = [];

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
          this.filterOnKey = false;
          this.sortOnHeaderClick = false;
          this.largeBuffer = false;
          this.activeSorting = false;

          this.eventOnRowDraw = null;

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

          if (this.vGridCellHelper.curElement && this.vGridCellHelper.updated === false) {
            this.vGridCellHelper.updateActual(this.vGridCellHelper.callbackObject());
          }

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
              if (_this2.vGridCurrentEntity[_this2.vGridRowKey] === x[_this2.vGridRowKey]) {
                _this2.vGridCurrentRow = index;
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
//# sourceMappingURL=data:application/json;base64,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
