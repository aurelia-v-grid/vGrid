"use strict";

System.register([], function (_export, _context) {
  var VGridConfig;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
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
          this.attributes = [];

          this.onFilterRun = function (filterObj) {

            if (filterObj.length !== 0 || _this.vGrid.vGridCollectionFiltered.length !== _this.vGrid.vGridCollection.length) {
              _this.vGrid.loading = true;

              setTimeout(function () {
                var curKey = -1;
                if (_this.vGrid.vGridCurrentEntityRef) {
                  curKey = _this.vGrid.vGridCurrentEntityRef[_this.vGrid.vGridRowKey];
                }

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
              }, 1);
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
          this.contextmenu = true;

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
            this.vGrid.loading = true;

            setTimeout(function () {
              _this2.vGrid.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this2.vGrid.vGridSort.getFilter());

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
            }, 1);
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

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7NkJBT2E7QUF3RFgsaUJBeERXLFdBd0RYLENBQVksS0FBWixFQUFtQjs7O2dDQXhEUixhQXdEUTs7ZUFsRG5CLE1BQU07QUFDSixxQkFBUyxPQUFUO0FBQ0EsaUJBQUssV0FBTDtBQUNBLHdCQUFZLGNBQVo7QUFDQSx5QkFBYSxZQUFiO0FBQ0Esd0JBQVksY0FBWjtBQUNBLHdCQUFZLG1CQUFaO0FBQ0EscUJBQVMsZ0JBQVQ7QUFDQSx1QkFBVyxrQkFBWDtBQUNBLDJCQUFlLHVCQUFmO0FBQ0EsNkJBQWlCLHlCQUFqQjtBQUNBLHdCQUFZLGNBQVo7QUFDQSx1QkFBVyxrQkFBWDtBQUNBLHlCQUFhLG9CQUFiO0FBQ0EsMEJBQWMscUJBQWQ7QUFDQSxvQkFBUSxlQUFSO0FBQ0EscUJBQVMsZ0JBQVQ7QUFDQSxzQkFBVSxnQkFBVjtBQUNBLDJCQUFlLHNCQUFmO0FBQ0EsMkJBQWUsc0JBQWY7QUFDQSw0QkFBZ0Isd0JBQWhCO0FBQ0EsK0JBQW1CLDJCQUFuQjtBQUNBLDRCQUFnQix3QkFBaEI7QUFDQSwrQkFBbUIsMkJBQW5CO0FBQ0EseUJBQWEsZUFBYjtBQUNBLHdCQUFZLHVCQUFaO0FBQ0EsMEJBQWMsa0JBQWQ7QUFDQSx5QkFBYSx1QkFBYjtBQUNBLG9DQUF3Qix5QkFBeEI7QUFDQSxzQkFBVSxpQkFBVjtBQUNBLDBCQUFjLHNCQUFkO0FBQ0EseUJBQWEsMEJBQWI7QUFDQSwwQkFBYywyQkFBZDtBQUNBLHdCQUFZLGtCQUFaO0FBQ0Esb0JBQVEsbUJBQVI7WUFnQmlCO2VBVG5CLE9BQU87QUFDTCwyQkFBZSx1QkFBZjtBQUNBLGlDQUFxQiw4QkFBckI7WUFPaUI7ZUErQ25CLGFBQWEsR0EvQ007O2VBb0ZuQixjQUFjLFVBQUMsU0FBRCxFQUFlOztBQUUzQixnQkFBSSxVQUFVLE1BQVYsS0FBcUIsQ0FBckIsSUFBMEIsTUFBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsTUFBbkMsS0FBOEMsTUFBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixNQUEzQixFQUFtQztBQUc3RyxvQkFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixJQUFyQixDQUg2Rzs7QUFNN0cseUJBQVcsWUFBSztBQUVkLG9CQUFJLFNBQVMsQ0FBQyxDQUFELENBRkM7QUFHZCxvQkFBSSxNQUFLLEtBQUwsQ0FBVyxxQkFBWCxFQUFrQztBQUNwQywyQkFBUyxNQUFLLEtBQUwsQ0FBVyxxQkFBWCxDQUFpQyxNQUFLLEtBQUwsQ0FBVyxXQUFYLENBQTFDLENBRG9DO2lCQUF0Qzs7QUFNQSxzQkFBSyxLQUFMLENBQVcsdUJBQVgsR0FBcUMsTUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixNQUFLLEtBQUwsQ0FBVyxlQUFYLEVBQTRCLFNBQXZELENBQXJDLENBVGM7O0FBYWQsc0JBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsTUFBSyxLQUFMLENBQVcsdUJBQVgsQ0FBekIsQ0FiYzs7QUFpQmQsb0JBQUksV0FBVyxDQUFDLENBQUQsQ0FqQkQ7QUFrQmQsb0JBQUksTUFBSixFQUFZO0FBQ1Ysd0JBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLE9BQW5DLENBQTJDLFVBQUMsQ0FBRCxFQUFJLEtBQUosRUFBYztBQUN2RCx3QkFBSSxXQUFXLEVBQUUsTUFBSyxLQUFMLENBQVcsV0FBWCxDQUFiLEVBQXNDO0FBQ3hDLGlDQUFXLEtBQVgsQ0FEd0M7cUJBQTFDO21CQUR5QyxDQUEzQyxDQURVO2lCQUFaOztBQVVBLG9CQUFJLFdBQVcsQ0FBQyxDQUFELEVBQUk7QUFDakIsd0JBQUssS0FBTCxDQUFXLHFCQUFYLEdBQW1DLE1BQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLFFBQW5DLENBQW5DLENBRGlCO0FBRWpCLHdCQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixNQUFLLEtBQUwsQ0FBVyxXQUFYLENBQTlCLEdBQXdELE1BQUssS0FBTCxDQUFXLHFCQUFYLENBQWlDLE1BQUssS0FBTCxDQUFXLFdBQVgsQ0FBekYsQ0FGaUI7QUFHakIsd0JBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsUUFBN0IsQ0FIaUI7aUJBQW5CLE1BSU87QUFDTCx3QkFBSyxLQUFMLENBQVcsZUFBWCxHQUE2QixRQUE3QixDQURLO2lCQUpQOztBQVVBLHNCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGdCQUExQixDQUEyQyxJQUEzQyxFQXRDYztBQXVDZCxzQkFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixLQUFyQixDQXZDYztlQUFMLEVBeUNSLENBekNILEVBTjZHO2FBQS9HO1dBRlksQ0FwRks7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWIsQ0FEaUI7O0FBSWpCLGVBQUssY0FBTCxHQUFzQixFQUF0QixDQUppQjtBQUtqQixlQUFLLGdCQUFMLEdBQXdCLEVBQXhCLENBTGlCO0FBTWpCLGVBQUssV0FBTCxHQUFtQixFQUFuQixDQU5pQjtBQU9qQixlQUFLLFdBQUwsR0FBbUIsRUFBbkIsQ0FQaUI7QUFRakIsZUFBSyxhQUFMLEdBQXFCLEVBQXJCLENBUmlCO0FBU2pCLGVBQUssYUFBTCxHQUFxQixFQUFyQixDQVRpQjtBQVVqQixlQUFLLFlBQUwsR0FBb0IsRUFBcEIsQ0FWaUI7QUFXakIsZUFBSyxnQkFBTCxHQUF3QixFQUF4QixDQVhpQjtBQVlqQixlQUFLLGVBQUwsR0FBdUIsRUFBdkIsQ0FaaUI7QUFhakIsZUFBSyxnQkFBTCxHQUF3QixFQUF4QixDQWJpQjs7QUFnQmpCLGVBQUssU0FBTCxHQUFpQixFQUFqQixDQWhCaUI7QUFpQmpCLGVBQUssWUFBTCxHQUFvQixDQUFwQixDQWpCaUI7QUFrQmpCLGVBQUssWUFBTCxHQUFvQixDQUFwQixDQWxCaUI7QUFtQmpCLGVBQUssa0JBQUwsR0FBMEIsS0FBMUIsQ0FuQmlCO0FBb0JqQixlQUFLLGFBQUwsR0FBcUIsU0FBckIsQ0FwQmlCO0FBcUJqQixlQUFLLGdCQUFMLEdBQXdCLEtBQXhCLENBckJpQjtBQXNCakIsZUFBSyxxQkFBTCxHQUE2QixJQUE3QixDQXRCaUI7QUF1QmpCLGVBQUssdUJBQUwsR0FBK0IsS0FBL0IsQ0F2QmlCO0FBd0JqQixlQUFLLHVCQUFMLEdBQStCLElBQS9CLENBeEJpQjtBQXlCakIsZUFBSyxTQUFMLEdBQWlCLEtBQWpCLENBekJpQjtBQTBCakIsZUFBSyxhQUFMLEdBQXFCLEtBQXJCLENBMUJpQjtBQTJCakIsZUFBSyxpQkFBTCxHQUF5QixLQUF6QixDQTNCaUI7QUE0QmpCLGVBQUssV0FBTCxHQUFtQixLQUFuQixDQTVCaUI7QUE2QmpCLGVBQUssYUFBTCxHQUFxQixLQUFyQixDQTdCaUI7QUE4QmpCLGVBQUssV0FBTCxHQUFtQixJQUFuQixDQTlCaUI7O0FBZ0NqQixlQUFLLGNBQUwsR0FBc0IsSUFBdEIsQ0FoQ2lCO0FBaUNqQixlQUFLLGVBQUwsR0FBdUIsSUFBdkIsQ0FqQ2lCO0FBa0NqQixlQUFLLGtCQUFMLEdBQTBCLElBQTFCLENBbENpQjs7QUFvQ2pCLGVBQUssZ0JBQUwsR0FBd0IsRUFBeEIsQ0FwQ2lCO0FBcUNqQixlQUFLLGVBQUwsR0FBdUIsRUFBdkIsQ0FyQ2lCOztBQXdDakIsZUFBSyxlQUFMLEdBQXVCLEdBQXZCLENBeENpQjtTQUFuQjs7QUF4RFcsOEJBeUdYLHFDQUFhLEtBQUs7QUFDaEIsY0FBSSxHQUFKLEVBQVM7QUFDUCxnQkFBSSxJQUFJLEVBQUosQ0FERztBQUVQLGlCQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0IsVUFBQyxJQUFELEVBQVM7QUFDL0IsZ0JBQUUsSUFBRixJQUFVLElBQUksSUFBSixDQUFWLENBRCtCO2FBQVQsQ0FBeEIsQ0FGTztBQUtQLG1CQUFPLENBQVAsQ0FMTztXQUFULE1BTU87QUFDTCxtQkFBTyxFQUFQLENBREs7V0FOUDs7O0FBMUdTLDhCQXlIWCx1QkFBTzs7QUFFTCxlQUFLLGNBQUwsR0FBc0IsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixZQUEzQixHQUEwQyxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLFlBQTNCLEdBQTBDLEtBQUssY0FBTCxDQUZyRztBQUdMLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixhQUEzQixHQUEyQyxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLGFBQTNCLEdBQTJDLEtBQUssZ0JBQUwsQ0FIekc7QUFJTCxlQUFLLFdBQUwsR0FBbUIsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixjQUEzQixHQUE0QyxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLGNBQTNCLEdBQTRDLEtBQUssV0FBTCxDQUp0RztBQUtMLGVBQUssV0FBTCxHQUFtQixLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLGNBQTNCLEdBQTRDLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsY0FBM0IsR0FBNEMsS0FBSyxXQUFMLENBTHRHO0FBTUwsZUFBSyxhQUFMLEdBQXFCLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsZ0JBQTNCLEdBQThDLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsZ0JBQTNCLEdBQThDLEtBQUssYUFBTCxDQU41RztBQU9MLGVBQUssYUFBTCxHQUFxQixLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLGFBQTNCLEdBQTJDLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsYUFBM0IsR0FBMkMsS0FBSyxhQUFMLENBUHRHO0FBUUwsZUFBSyxZQUFMLEdBQW9CLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsWUFBM0IsR0FBMEMsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixZQUEzQixHQUEwQyxLQUFLLFlBQUwsQ0FSbkc7QUFTTCxlQUFLLGdCQUFMLEdBQXdCLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsZ0JBQTNCLEdBQThDLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsZ0JBQTNCLEdBQThDLEtBQUssZ0JBQUwsQ0FUL0c7QUFVTCxlQUFLLGVBQUwsR0FBdUIsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixlQUEzQixHQUE2QyxLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLGVBQTNCLEdBQTZDLEtBQUssZUFBTCxDQVY1RztBQVdMLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixtQkFBM0IsR0FBaUQsS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixtQkFBM0IsR0FBaUQsS0FBSyxnQkFBTCxDQVhySDs7O0FBekhJLDhCQXdNWCx1Q0FBYyxNQUFNO0FBQ2xCLGlCQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsZUFBdkIsQ0FBdUMsSUFBdkMsQ0FBUCxDQURrQjs7O0FBeE1ULDhCQWlOWCx5Q0FBZSxLQUFLLFFBQVEsZUFBZSxVQUFVO0FBQ25ELGNBQUksS0FBSyxLQUFMLENBQVcsdUJBQVgsS0FBdUMsU0FBdkMsRUFBa0Q7QUFDcEQsZ0JBQUksS0FBSyxjQUFMLEVBQXFCO0FBRXZCLGtCQUFJLE9BQU8sS0FBSyxZQUFMLENBQWtCLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEdBQW5DLENBQWxCLENBQVAsQ0FGbUI7QUFHdkIsbUJBQUssY0FBTCxDQUFvQixJQUFwQixFQUEwQixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxHQUFuQyxDQUExQixFQUh1QjtBQUl2Qix1QkFBUyxJQUFULEVBSnVCO2FBQXpCLE1BS087QUFDTCx1QkFBUyxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxHQUFuQyxDQUFULEVBREs7YUFMUDtXQURGOzs7QUFsTlMsOEJBbU9YLCtCQUFVLE9BQU8sWUFBWTs7O0FBSTNCLGNBQUksWUFBWSxNQUFNLE1BQU4sQ0FBYSxZQUFiLENBQTBCLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBdEMsQ0FKdUI7QUFLM0IsY0FBSSxjQUFjLElBQWQsRUFBb0I7QUFDdEIsd0JBQVksTUFBTSxNQUFOLENBQWEsWUFBYixDQUEwQixZQUExQixDQUF1QyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQW5ELENBRHNCO1dBQXhCOztBQU1BLGNBQUksdUJBQXVCLElBQXZCLENBWHVCO0FBWTNCLGNBQUksS0FBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLFNBQTdCLE1BQTRDLENBQUMsQ0FBRCxFQUFJO0FBQ2xELG1DQUF1QixLQUF2QixDQURrRDtXQUFwRDs7QUFNQSxjQUFJLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLE1BQW5DLEdBQTRDLENBQTVDLElBQWlELFNBQWpELElBQThELG9CQUE5RCxFQUFvRjtBQUV0RixpQkFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixJQUFyQixDQUZzRjs7QUFLdEYsdUJBQVcsWUFBSztBQUVkLHFCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLFNBQXJCLENBQStCO0FBQzdCLDJCQUFXLFNBQVg7QUFDQSxxQkFBSyxJQUFMO2VBRkYsRUFHRyxNQUFNLFFBQU4sQ0FISCxDQUZjOztBQVNkLHlCQUFXLE9BQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsU0FBckIsRUFBWCxFQVRjOztBQWFkLHFCQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEdBQXJCLENBQXlCLE9BQUssS0FBTCxDQUFXLHVCQUFYLENBQXpCLENBYmM7O0FBaUJkLGtCQUFJLE9BQUssS0FBTCxDQUFXLHFCQUFYLEVBQWtDO0FBQ3BDLHVCQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxPQUFuQyxDQUEyQyxVQUFDLENBQUQsRUFBSSxLQUFKLEVBQWM7QUFDdkQsc0JBQUksT0FBSyxLQUFMLENBQVcscUJBQVgsQ0FBaUMsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUFqQyxLQUE2RCxFQUFFLE9BQUssS0FBTCxDQUFXLFdBQVgsQ0FBL0QsRUFBd0Y7QUFDMUYsMkJBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsS0FBN0IsQ0FEMEY7bUJBQTVGO2lCQUR5QyxDQUEzQyxDQURvQztlQUF0Qzs7QUFVQSxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUIsR0EzQmM7QUE0QmQscUJBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsS0FBckIsQ0E1QmM7YUFBTCxFQThCUixDQTlCSCxFQUxzRjtXQUF4Rjs7O0FBclBTLDhCQW1TWCxxREFBc0I7QUFDcEIsY0FBSSxLQUFLLFNBQUwsRUFBZ0I7QUFDbEIsbUJBQU8sS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsTUFBbkMsQ0FEVztXQUFwQixNQUVPO0FBQ0wsbUJBQU8sS0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixNQUEzQixDQURGO1dBRlA7OztBQXBTUyw4QkFnVFgscUNBQWEsT0FBTyxLQUFLO0FBSXZCLGVBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsR0FBN0IsQ0FKdUI7O0FBUXZCLGVBQUssS0FBTCxDQUFXLHFCQUFYLEdBQW1DLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEdBQW5DLENBQW5DLENBUnVCOztBQVl2QixjQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcscUJBQVgsQ0FaWTtBQWF2QixlQUFLLElBQUksQ0FBSixJQUFTLElBQWQsRUFBb0I7QUFDbEIsZ0JBQUksS0FBSyxjQUFMLENBQW9CLENBQXBCLENBQUosRUFBNEI7QUFDMUIsa0JBQUksS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsQ0FBOUIsTUFBcUMsS0FBSyxDQUFMLENBQXJDLEVBQThDO0FBQ2hELHFCQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixDQUE5QixJQUFtQyxLQUFLLENBQUwsQ0FBbkMsQ0FEZ0Q7QUFFaEQscUJBQUssS0FBTCxDQUFXLDJCQUFYLENBQXVDLElBQXZDLENBQTRDLENBQTVDLEVBRmdEO2VBQWxEO2FBREY7V0FERjs7QUFXQSxjQUFJLEtBQUssS0FBTCxDQUFXLHFCQUFYLEVBQWtDO0FBQ3BDLGlCQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLGNBQTNCLENBQTBDLEdBQTFDLEVBQStDLEtBQS9DLEVBRG9DO1dBQXRDOztBQU1BLGNBQUksTUFBTSxJQUFOLEtBQWUsT0FBZixJQUEwQixLQUFLLGVBQUwsRUFBc0I7QUFDbEQsZ0JBQUksV0FBVyxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsQ0FBWCxDQUQ4QztBQUVsRCxxQkFBUyxTQUFULENBQW1CLGlCQUFuQixFQUFzQyxJQUF0QyxFQUE0QyxJQUE1QyxFQUZrRDtBQUdsRCxrQkFBTSxNQUFOLENBQWEsYUFBYixDQUEyQixRQUEzQixFQUhrRDtXQUFwRDs7QUFRQSxjQUFJLE1BQU0sSUFBTixLQUFlLFVBQWYsSUFBNkIsS0FBSyxrQkFBTCxFQUF5QjtBQUN4RCxnQkFBSSxXQUFXLFNBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFYLENBRG9EO0FBRXhELHFCQUFTLFNBQVQsQ0FBbUIsb0JBQW5CLEVBQXlDLElBQXpDLEVBQStDLElBQS9DLEVBRndEO0FBR3hELGtCQUFNLE1BQU4sQ0FBYSxhQUFiLENBQTJCLFFBQTNCLEVBSHdEO1dBQTFEOzs7ZUF0VlMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
