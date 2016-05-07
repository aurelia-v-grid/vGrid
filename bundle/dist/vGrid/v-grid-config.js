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
//# sourceMappingURL=data:application/json;base64,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LEtBQUssS0FBTCxDQUFXLHVCQUFYLEdBQXFDLENBQTVDO0FBQ0Q7Ozs4QkFFcUI7QUFDcEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsZUFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRixXOzRCQUVtQixDLEVBQUc7QUFDckIsbUJBQU8sS0FBSyxLQUFMLENBQVcsZUFBWCxHQUE2QixDQUFwQztBQUNEOzs7OEJBRTJCO0FBQzFCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLHFCQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGLFc7NEJBRXlCLEMsRUFBRztBQUMzQixtQkFBTyxLQUFLLEtBQUwsQ0FBVyxxQkFBWCxHQUFtQyxDQUExQztBQUNEOzs7OEJBR3FCO0FBQ3BCLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGVBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0YsVzs0QkFFbUIsQyxFQUFHO0FBQ3JCLG1CQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsQ0FBcEM7QUFDRDs7OzhCQUV3QjtBQUN2QixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxrQkFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRixXOzRCQUVzQixDLEVBQUc7QUFDeEIsbUJBQU8sS0FBSyxLQUFMLENBQVcsa0JBQVgsR0FBZ0MsQ0FBdkM7QUFDRDs7OzhCQUdpQztBQUNoQyxnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVywyQkFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRixXOzRCQUUrQixDLEVBQUc7QUFDakMsbUJBQU8sS0FBSyxLQUFMLENBQVcsMkJBQVgsR0FBeUMsQ0FBaEQ7QUFDRDs7OzhCQUlpQjtBQUNoQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGLFc7NEJBRWUsQyxFQUFHO0FBQ2pCLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsR0FBeUIsQ0FBaEM7QUFDRCIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
