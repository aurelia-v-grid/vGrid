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
              if (_this2.vGridCurrentEntityRef[_this2.vGridRowKey] === x[_this2.vGridRowKey]) {
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
