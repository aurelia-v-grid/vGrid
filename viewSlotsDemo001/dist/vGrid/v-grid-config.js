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
