"use strict";

System.register([], function (_export, _context) {
  "use strict";

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
            rowColumn: "vGrid-row-column",
            rowHeaderColumn: "vGrid-row-column-header",
            rowHeader: "vGrid-row-header",
            rowSelected: "vGrid-row-selected",
            rowContainer: "vGrid-row-container",
            rowAlt: "vGrid-row-alt",
            rowEven: "vGrid-row-even",
            dragHandle: "vGrid-vGridDragHandle",
            resizeHeaderDragHandle: "vGrid-draggable-handler",
            sortIcon: "vGrid-glyphicon",
            sortIconSort: "vGrid-glyphicon-sort",
            sortIconAsc: "vGrid-glyphicon-sort-asc",
            sortIconDesc: "vGrid-glyphicon-sort-desc",
            sortIconNo: "vGrid-glyphicon"
          };
          this.atts = {
            dataAttribute: "v-grid-data-attribute",
            dataAttributeFilter: "v-grid-data-attribute-filter"
          };

          this.onFilterRun = function (filterObj) {

            if (filterObj.length !== 0 || _this.vGrid.vGridCollectionFiltered.length !== _this.vGrid.vGridCollection.length || _this.eventOnRemoteCall) {
              if (_this.vGrid.vGridCollection.length > _this.attLoadingThreshold) {
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

          this.colConfig = [];

          this.columnLength = 0;

          this.attAttributeObserve = [];
          this.attRowHeight = 50;
          this.attHeaderHeight = 0;
          this.attFooterHeight = 0;
          this.attResizableHeaders = false;
          this.attMultiSelect = undefined;
          this.attSortableHeader = false;
          this.attLoadingThreshold = -1;
          this.attRemoteIndex = false;
          this.attManualSelection = false;
          this.eventOnRowDraw = null;
          this.eventOnRowClick = null;
          this.eventOnRowDblClick = null;
          this.eventOnRemoteCall = null;

          this.repeater = false;
          this.repeatRowTemplate = null;

          this.attDataScrollDelay = 200;
          this.attRequestAnimationFrame = true;
          this.attResizableHeadersAndRows = true;
          this.attRenderOnScrollbarScroll = true;

          this.keepFilterOnCollectionChange = false;
          this.remoteLimit = 40;
          this.remoteLength = 0;
          this.remoteOffset = 0;
        }

        VGridConfig.prototype.setValue = function setValue(htmlAttributeValue, defaultValue) {
          var value = defaultValue;
          if (htmlAttributeValue !== undefined && htmlAttributeValue !== null && !isNaN(htmlAttributeValue)) {
            value = htmlAttributeValue;
          }
          return value;
        };

        VGridConfig.prototype.setBindValueArray = function setBindValueArray(value, toProperty) {
          if (value !== undefined && value !== null) {
            var tempArray = value.split(",");
            tempArray.forEach(function (prop) {
              prop = prop.trim();
            });
            this[toProperty] = tempArray;
          }
        };

        VGridConfig.prototype.setBindValueInt = function setBindValueInt(value, toProperty) {
          this[toProperty] = this.setValue(parseInt(value), this[toProperty]);
        };

        VGridConfig.prototype.setBindValueString = function setBindValueString(value, toProperty) {
          if (typeof value === "string" && value !== '' && value !== undefined && value !== null) {
            this[toProperty] = this.setValue(value, this[toProperty]);
          }
        };

        VGridConfig.prototype.setBindValueFunction = function setBindValueFunction(value, toProperty) {
          if (typeof value === "function") {
            this[toProperty] = value;
          }
        };

        VGridConfig.prototype.setBindValueBool = function setBindValueBool(value, toProperty) {
          var type = {
            "true": true,
            "false": false
          };
          this[toProperty] = this.setValue(type[value], this[toProperty]);
        };

        VGridConfig.prototype.getRowProperties = function getRowProperties(obj) {
          if (obj) {
            var x = {};
            for (var k in obj) {
              if (obj.hasOwnProperty(k)) {
                if (x[k] !== obj[k]) {
                  x[k] = obj[k];
                }
              }
            }
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
            if (!_this2.attRemoteIndex) {
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
              var data = this.getRowProperties(this.vGrid.vGridCollectionFiltered[row]);
              this.eventOnRowDraw({
                tempRef: data || null,
                rowRef: this.vGrid.vGridCollectionFiltered[row] || null
              });
              callback(data);
            } else {
              callback(this.vGrid.vGridCollectionFiltered[row]);
            }
          }
        };

        VGridConfig.prototype.onOrderBy = function onOrderBy(attribute, add) {
          var _this3 = this;

          if (this.vGrid.vGridCollectionFiltered.length > 0) {
            if (this.vGrid.vGridCollection.length > this.attLoadingThreshold) {
              this.vGrid.loading = true;
            }

            setTimeout(function () {
              _this3.vGrid.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, add);

              var event = new CustomEvent("sortIconUpdate", {
                detail: "",
                bubbles: true
              });
              _this3.vGrid.element.dispatchEvent(event);

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
          return this.vGrid.vGridCollectionFiltered.length;
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

          if (event.type === "click") {
            this.vGrid.raiseEvent("v-row-onclick", {
              evt: event,
              data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
              row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
            });
          }

          if (event.type === "dblclick") {
            this.vGrid.raiseEvent("v-row-ondblclick", {
              evt: event,
              data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
              row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
            });
          }
        };

        VGridConfig.prototype.updateRowBinding = function updateRowBinding(rowNo, row, isDownScroll, isLargeScroll) {
          var _this4 = this;

          this.getDataElement(rowNo, isDownScroll, isLargeScroll, function (entity) {

            row.div.setAttribute("row", rowNo);

            if (entity === "") {
              var bindingContext = {};
              row.viewSlot.bind(bindingContext, {
                bindingContext: bindingContext,
                parentOverrideContext: _this4.vGrid.overrideContext
              });
            }

            if (entity !== "" && row.viewSlot !== null) {
              var tempRef = {};
              for (var k in entity) {
                if (entity.hasOwnProperty(k)) {
                  if (tempRef[k] !== entity[k]) {
                    tempRef[k] = entity[k];
                  }
                }
              }
              var that = _this4;
              var _bindingContext = {};
              _bindingContext.row = rowNo;
              _bindingContext.ctx = _this4;
              _bindingContext.tempRef = tempRef;
              _bindingContext.rowRef = _this4.vGrid.vGridCollectionFiltered[rowNo];
              row.viewSlot.bind(_bindingContext, {
                bindingContext: _bindingContext,
                parentOverrideContext: _this4.vGrid.overrideContext
              });
            }

            if (entity === undefined || entity === "" || entity === null) {
              row.div.style.display = "none";
            } else {
              row.div.style.display = "block";
            }

            if (rowNo % 2 === 1) {
              if (row.div.classList.contains(_this4.css.rowEven)) {
                row.div.classList.remove(_this4.css.rowEven);
                row.div.classList.add(_this4.css.rowAlt);
              }
            } else {
              if (row.div.classList.contains(_this4.css.rowAlt)) {
                row.div.classList.remove(_this4.css.rowAlt);
                row.div.classList.add(_this4.css.rowEven);
              }
            }

            if (_this4.vGrid.vGridSelection.isSelected(rowNo)) {
              row.div.classList.add(_this4.css.rowSelected);
            } else {
              row.div.classList.remove(_this4.css.rowSelected);
            }
          });
        };

        return VGridConfig;
      }());

      _export("VGridConfig", VGridConfig);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFPYSxXO0FBMENYLDZCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFBQSxlQXBDbkIsR0FvQ21CLEdBcENiO0FBQ0oscUJBQVMsT0FETDtBQUVKLGlCQUFLLFdBRkQ7QUFHSix3QkFBWSxjQUhSO0FBSUoseUJBQWEsWUFKVDtBQUtKLHdCQUFZLGNBTFI7QUFNSix3QkFBWSxtQkFOUjtBQU9KLHVCQUFXLGtCQVBQO0FBUUosNkJBQWlCLHlCQVJiO0FBU0osdUJBQVcsa0JBVFA7QUFVSix5QkFBYSxvQkFWVDtBQVdKLDBCQUFjLHFCQVhWO0FBWUosb0JBQVEsZUFaSjtBQWFKLHFCQUFTLGdCQWJMO0FBY0osd0JBQVksdUJBZFI7QUFlSixvQ0FBd0IseUJBZnBCO0FBZ0JKLHNCQUFVLGlCQWhCTjtBQWlCSiwwQkFBYyxzQkFqQlY7QUFrQkoseUJBQWEsMEJBbEJUO0FBbUJKLDBCQUFjLDJCQW5CVjtBQW9CSix3QkFBWTtBQXBCUixXQW9DYTtBQUFBLGVBVG5CLElBU21CLEdBVFo7QUFDTCwyQkFBZSx1QkFEVjtBQUVMLGlDQUFxQjtBQUZoQixXQVNZOztBQUFBLGVBbUtuQixXQW5LbUIsR0FtS0wsVUFBQyxTQUFELEVBQWU7O0FBRTNCLGdCQUFJLFVBQVUsTUFBVixLQUFxQixDQUFyQixJQUEwQixNQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxNQUFuQyxLQUE4QyxNQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLE1BQW5HLElBQTZHLE1BQUssaUJBQXRILEVBQXlJO0FBR3ZJLGtCQUFJLE1BQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsTUFBM0IsR0FBb0MsTUFBSyxtQkFBN0MsRUFBa0U7QUFDaEUsc0JBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsSUFBckI7QUFDRDs7QUFHRCx5QkFBVyxZQUFLO0FBRWQsb0JBQUksU0FBUyxDQUFDLENBQWQ7QUFDQSxvQkFBSSxNQUFLLEtBQUwsQ0FBVyxxQkFBZixFQUFzQztBQUNwQywyQkFBUyxNQUFLLEtBQUwsQ0FBVyxxQkFBWCxDQUFpQyxNQUFLLEtBQUwsQ0FBVyxXQUE1QyxDQUFUO0FBQ0Q7O0FBSUQsb0JBQUksTUFBSyxpQkFBVCxFQUE0QjtBQUcxQix3QkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixVQUF2QixHQUFvQyxTQUFwQzs7QUFHQSx3QkFBSyxZQUFMLEdBQW9CLENBQXBCOztBQUdBLHdCQUFLLFVBQUw7QUFFRCxpQkFYRCxNQVdPO0FBSUwsd0JBQUssS0FBTCxDQUFXLHVCQUFYLEdBQXFDLE1BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsTUFBSyxLQUFMLENBQVcsZUFBdEMsRUFBdUQsU0FBdkQsQ0FBckM7O0FBSUEsd0JBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsTUFBSyxLQUFMLENBQVcsdUJBQXBDOztBQUlBLHNCQUFJLFdBQVcsQ0FBQyxDQUFoQjtBQUNBLHNCQUFJLE1BQUosRUFBWTtBQUNWLDBCQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxPQUFuQyxDQUEyQyxVQUFDLENBQUQsRUFBSSxLQUFKLEVBQWM7QUFDdkQsMEJBQUksV0FBVyxFQUFFLE1BQUssS0FBTCxDQUFXLFdBQWIsQ0FBZixFQUEwQztBQUN4QyxtQ0FBVyxLQUFYO0FBQ0Q7QUFDRixxQkFKRDtBQUtEOztBQUlELHNCQUFJLFdBQVcsQ0FBQyxDQUFoQixFQUFtQjtBQUNqQiwwQkFBSyxLQUFMLENBQVcscUJBQVgsR0FBbUMsTUFBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsUUFBbkMsQ0FBbkM7QUFDQSwwQkFBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsTUFBSyxLQUFMLENBQVcsV0FBekMsSUFBd0QsTUFBSyxLQUFMLENBQVcscUJBQVgsQ0FBaUMsTUFBSyxLQUFMLENBQVcsV0FBNUMsQ0FBeEQ7QUFDQSwwQkFBSyxLQUFMLENBQVcsZUFBWCxHQUE2QixRQUE3QjtBQUNELG1CQUpELE1BSU87QUFDTCwwQkFBSyxLQUFMLENBQVcsZUFBWCxHQUE2QixRQUE3QjtBQUNEOztBQUlELHdCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGdCQUExQixDQUEyQyxJQUEzQztBQUNBLHdCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLEtBQXJCO0FBQ0Q7QUFFRixlQXpERCxFQXlERyxFQXpESDtBQTJERDtBQUdGLFdBM09rQjs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYjs7QUFHQSxlQUFLLFNBQUwsR0FBaUIsRUFBakI7O0FBR0EsZUFBSyxZQUFMLEdBQW9CLENBQXBCOztBQUdBLGVBQUssbUJBQUwsR0FBMkIsRUFBM0I7QUFDQSxlQUFLLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxlQUFLLG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLFNBQXRCO0FBQ0EsZUFBSyxpQkFBTCxHQUF5QixLQUF6QjtBQUNBLGVBQUssbUJBQUwsR0FBMkIsQ0FBQyxDQUE1QjtBQUNBLGVBQUssY0FBTCxHQUFzQixLQUF0QjtBQUNBLGVBQUssa0JBQUwsR0FBMEIsS0FBMUI7QUFDQSxlQUFLLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxlQUFLLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsZUFBSyxpQkFBTCxHQUF5QixJQUF6Qjs7QUFHQSxlQUFLLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxlQUFLLGlCQUFMLEdBQXlCLElBQXpCOztBQUlBLGVBQUssa0JBQUwsR0FBMEIsR0FBMUI7QUFDQSxlQUFLLHdCQUFMLEdBQWdDLElBQWhDO0FBQ0EsZUFBSywwQkFBTCxHQUFrQyxJQUFsQztBQUNBLGVBQUssMEJBQUwsR0FBa0MsSUFBbEM7O0FBSUEsZUFBSyw0QkFBTCxHQUFvQyxLQUFwQztBQUNBLGVBQUssV0FBTCxHQUFtQixFQUFuQjtBQUNBLGVBQUssWUFBTCxHQUFvQixDQUFwQjtBQUNBLGVBQUssWUFBTCxHQUFvQixDQUFwQjtBQUdEOzs4QkFPRCxRLHFCQUFTLGtCLEVBQW9CLFksRUFBYztBQUN6QyxjQUFJLFFBQVEsWUFBWjtBQUNBLGNBQUksdUJBQXVCLFNBQXZCLElBQW9DLHVCQUF1QixJQUEzRCxJQUFtRSxDQUFDLE1BQU0sa0JBQU4sQ0FBeEUsRUFBbUc7QUFDakcsb0JBQVEsa0JBQVI7QUFDRDtBQUNELGlCQUFPLEtBQVA7QUFDRCxTOzs4QkFHRCxpQiw4QkFBa0IsSyxFQUFPLFUsRUFBWTtBQUNuQyxjQUFJLFVBQVUsU0FBVixJQUF1QixVQUFVLElBQXJDLEVBQTJDO0FBQ3pDLGdCQUFJLFlBQVksTUFBTSxLQUFOLENBQVksR0FBWixDQUFoQjtBQUNBLHNCQUFVLE9BQVYsQ0FBa0IsVUFBQyxJQUFELEVBQVM7QUFDekIscUJBQU8sS0FBSyxJQUFMLEVBQVA7QUFDRCxhQUZEO0FBR0EsaUJBQUssVUFBTCxJQUFtQixTQUFuQjtBQUNEO0FBQ0YsUzs7OEJBR0QsZSw0QkFBZ0IsSyxFQUFPLFUsRUFBWTtBQUNqQyxlQUFLLFVBQUwsSUFBbUIsS0FBSyxRQUFMLENBQWMsU0FBUyxLQUFULENBQWQsRUFBK0IsS0FBSyxVQUFMLENBQS9CLENBQW5CO0FBQ0QsUzs7OEJBR0Qsa0IsK0JBQW1CLEssRUFBTyxVLEVBQVk7QUFDcEMsY0FBSSxPQUFPLEtBQVAsS0FBa0IsUUFBbEIsSUFBOEIsVUFBVSxFQUF4QyxJQUE4QyxVQUFVLFNBQXhELElBQXFFLFVBQVUsSUFBbkYsRUFBeUY7QUFDdkYsaUJBQUssVUFBTCxJQUFtQixLQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLEtBQUssVUFBTCxDQUFyQixDQUFuQjtBQUNEO0FBQ0YsUzs7OEJBR0Qsb0IsaUNBQXFCLEssRUFBTyxVLEVBQVk7QUFDdEMsY0FBSSxPQUFPLEtBQVAsS0FBa0IsVUFBdEIsRUFBa0M7QUFDaEMsaUJBQUssVUFBTCxJQUFtQixLQUFuQjtBQUNEO0FBQ0YsUzs7OEJBR0QsZ0IsNkJBQWlCLEssRUFBTyxVLEVBQVk7QUFDbEMsY0FBSSxPQUFPO0FBQ1Qsb0JBQVEsSUFEQztBQUVULHFCQUFTO0FBRkEsV0FBWDtBQUlBLGVBQUssVUFBTCxJQUFtQixLQUFLLFFBQUwsQ0FBYyxLQUFLLEtBQUwsQ0FBZCxFQUEyQixLQUFLLFVBQUwsQ0FBM0IsQ0FBbkI7QUFDRCxTOzs4QkFNRCxnQiw2QkFBaUIsRyxFQUFLO0FBQ3BCLGNBQUksR0FBSixFQUFTO0FBQ1AsZ0JBQUksSUFBSSxFQUFSO0FBQ0EsaUJBQUssSUFBSSxDQUFULElBQWMsR0FBZCxFQUFtQjtBQUNqQixrQkFBSSxJQUFJLGNBQUosQ0FBbUIsQ0FBbkIsQ0FBSixFQUEyQjtBQUN6QixvQkFBSSxFQUFFLENBQUYsTUFBUyxJQUFJLENBQUosQ0FBYixFQUFxQjtBQUNuQixvQkFBRSxDQUFGLElBQU8sSUFBSSxDQUFKLENBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxtQkFBTyxDQUFQO0FBQ0QsV0FWRCxNQVVPO0FBQ0wsbUJBQU8sRUFBUDtBQUNEO0FBQ0YsUzs7OEJBTUQsVSx1QkFBVyxJLEVBQU07QUFBQTs7QUFDZixpQkFBTyxPQUFPLElBQVAsR0FBYyxFQUFyQjtBQUNBLGVBQUssaUJBQUwsQ0FBdUI7QUFDckIsb0JBQVEsS0FBSyxNQUFMLElBQWUsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixVQUR6QjtBQUVyQixrQkFBTSxLQUFLLElBQUwsSUFBYSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLFNBQXJCLEVBRkU7QUFHckIsbUJBQU8sS0FBSyxLQUFMLElBQWMsS0FBSyxXQUhMO0FBSXJCLG9CQUFRLEtBQUssTUFBTCxJQUFlLEtBQUs7QUFKUCxXQUF2QixFQU1HLElBTkgsQ0FNUSxVQUFDLElBQUQsRUFBUzs7QUFFYixtQkFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsdUJBQTVCO0FBQ0EsbUJBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLDRCQUE1QjtBQUNBLG1CQUFLLEtBQUwsQ0FBVyxlQUFYLEdBQTZCLEtBQUssR0FBbEM7QUFDQSxtQkFBSyxXQUFMLEdBQW1CLEtBQUssS0FBeEI7QUFDQSxtQkFBSyxZQUFMLEdBQW9CLEtBQUssTUFBekI7QUFDQSxtQkFBSyxLQUFMLENBQVcsdUJBQVgsR0FBcUMsT0FBSyxLQUFMLENBQVcsZUFBWCxDQUEyQixLQUEzQixDQUFpQyxDQUFqQyxDQUFyQztBQUNBLG1CQUFLLEtBQUwsQ0FBVyxTQUFYO0FBQ0EsbUJBQUssS0FBTCxDQUFXLGVBQVgsR0FBNkIsQ0FBQyxDQUE5QjtBQUNBLGdCQUFJLENBQUMsT0FBSyxjQUFWLEVBQTBCO0FBQ3hCLHFCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLEtBQTFCO0FBQ0Q7QUFDRCxtQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixnQkFBMUI7QUFDQSxtQkFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixLQUFyQjtBQUNBLG1CQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFdBQXRCLENBQWtDO0FBQ2hDLHFCQUFPLE9BQUssV0FEb0I7QUFFaEMsc0JBQVEsT0FBSyxZQUZtQjtBQUdoQyxzQkFBUSxPQUFLO0FBSG1CLGFBQWxDO0FBS0EsdUJBQVcsWUFBSztBQUNkLHFCQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixzQkFBNUI7QUFDQSxxQkFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsMkJBQTVCO0FBQ0QsYUFIRCxFQUdHLEdBSEg7QUFJRCxXQTlCSDtBQWlDRCxTOzs4QkFvRkQsYSwwQkFBYyxJLEVBQU07QUFDbEIsaUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixlQUF2QixDQUF1QyxJQUF2QyxDQUFQO0FBQ0QsUzs7OEJBT0QsYywyQkFBZSxHLEVBQUssTSxFQUFRLGEsRUFBZSxRLEVBQVU7QUFDbkQsY0FBSSxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxLQUF1QyxTQUEzQyxFQUFzRDtBQUNwRCxnQkFBSSxLQUFLLGNBQVQsRUFBeUI7QUFFdkIsa0JBQUksT0FBTyxLQUFLLGdCQUFMLENBQXNCLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEdBQW5DLENBQXRCLENBQVg7QUFDQSxtQkFBSyxjQUFMLENBQW9CO0FBQ2hCLHlCQUFTLFFBQVEsSUFERDtBQUVoQix3QkFBUSxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxHQUFuQyxLQUEyQztBQUZuQyxlQUFwQjtBQUtBLHVCQUFTLElBQVQ7QUFDRCxhQVRELE1BU087QUFDTCx1QkFBUyxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxHQUFuQyxDQUFUO0FBQ0Q7QUFDRjtBQUNGLFM7OzhCQU9ELFMsc0JBQVUsUyxFQUFXLEcsRUFBSztBQUFBOztBQU14QixjQUFJLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLE1BQW5DLEdBQTRDLENBQWhELEVBQW1EO0FBRWpELGdCQUFJLEtBQUssS0FBTCxDQUFXLGVBQVgsQ0FBMkIsTUFBM0IsR0FBb0MsS0FBSyxtQkFBN0MsRUFBa0U7QUFDaEUsbUJBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsSUFBckI7QUFDRDs7QUFHRCx1QkFBVyxZQUFLO0FBRWQscUJBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsU0FBckIsQ0FBK0I7QUFDN0IsMkJBQVcsU0FEa0I7QUFFN0IscUJBQUs7QUFGd0IsZUFBL0IsRUFHRyxHQUhIOztBQU1BLGtCQUFJLFFBQVEsSUFBSSxXQUFKLENBQWdCLGdCQUFoQixFQUFrQztBQUM1Qyx3QkFBUSxFQURvQztBQUU1Qyx5QkFBUztBQUZtQyxlQUFsQyxDQUFaO0FBSUEscUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsYUFBbkIsQ0FBaUMsS0FBakM7O0FBSUEsa0JBQUksT0FBSyxpQkFBVCxFQUE0QjtBQUcxQix1QkFBSyxVQUFMO0FBRUQsZUFMRCxNQUtPO0FBRUwsdUJBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsT0FBSyxLQUFMLENBQVcsdUJBQXBDOztBQUlBLG9CQUFJLE9BQUssS0FBTCxDQUFXLHFCQUFmLEVBQXNDO0FBQ3BDLHlCQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxPQUFuQyxDQUEyQyxVQUFDLENBQUQsRUFBSSxLQUFKLEVBQWM7QUFDdkQsd0JBQUksT0FBSyxLQUFMLENBQVcscUJBQVgsQ0FBaUMsT0FBSyxLQUFMLENBQVcsV0FBNUMsTUFBNkQsRUFBRSxPQUFLLEtBQUwsQ0FBVyxXQUFiLENBQWpFLEVBQTRGO0FBQzFGLDZCQUFLLEtBQUwsQ0FBVyxlQUFYLEdBQTZCLEtBQTdCO0FBQ0Q7QUFDRixtQkFKRDtBQUtEOztBQUlELHVCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGdCQUExQjtBQUNBLHVCQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLEtBQXJCO0FBQ0Q7QUFFRixhQXpDRCxFQXlDRyxFQXpDSDtBQTBDRDtBQUdGLFM7OzhCQU9ELG1CLGtDQUFzQjtBQUNwQixpQkFBTyxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxNQUExQztBQUNELFM7OzhCQU9ELFkseUJBQWEsSyxFQUFPLEcsRUFBSztBQUl2QixlQUFLLEtBQUwsQ0FBVyxlQUFYLEdBQTZCLEdBQTdCOztBQUlBLGVBQUssS0FBTCxDQUFXLHFCQUFYLEdBQW1DLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEdBQW5DLENBQW5DOztBQUlBLGNBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxxQkFBdEI7QUFDQSxlQUFLLElBQUksQ0FBVCxJQUFjLElBQWQsRUFBb0I7QUFDbEIsZ0JBQUksS0FBSyxjQUFMLENBQW9CLENBQXBCLENBQUosRUFBNEI7QUFDMUIsa0JBQUksS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsQ0FBOUIsTUFBcUMsS0FBSyxDQUFMLENBQXpDLEVBQWtEO0FBQ2hELHFCQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixDQUE5QixJQUFtQyxLQUFLLENBQUwsQ0FBbkM7QUFDRDtBQUNGO0FBQ0Y7O0FBSUQsY0FBSSxNQUFNLElBQU4sS0FBZSxPQUFuQixFQUE0QjtBQUMxQixpQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixlQUF0QixFQUF1QztBQUNyQyxtQkFBSyxLQURnQztBQUVyQyxvQkFBTSxLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFLLEtBQUwsQ0FBVyxlQUE5QyxDQUYrQjtBQUdyQyxtQkFBSyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEtBQUssS0FBTCxDQUFXLGVBQTlDLEVBQStELEtBQUssS0FBTCxDQUFXLFdBQTFFLENBQTFCO0FBSGdDLGFBQXZDO0FBS0Q7O0FBSUQsY0FBSSxNQUFNLElBQU4sS0FBZSxVQUFuQixFQUErQjtBQUM3QixpQkFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixrQkFBdEIsRUFBMEM7QUFDeEMsbUJBQUssS0FEbUM7QUFFeEMsb0JBQU0sS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsS0FBSyxLQUFMLENBQVcsZUFBOUMsQ0FGa0M7QUFHeEMsbUJBQUssS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixLQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFLLEtBQUwsQ0FBVyxlQUE5QyxFQUErRCxLQUFLLEtBQUwsQ0FBVyxXQUExRSxDQUExQjtBQUhtQyxhQUExQztBQUtEO0FBR0YsUzs7OEJBTUQsZ0IsNkJBQWlCLEssRUFBTyxHLEVBQUssWSxFQUFjLGEsRUFBZTtBQUFBOztBQUd4RCxlQUFLLGNBQUwsQ0FBb0IsS0FBcEIsRUFBMkIsWUFBM0IsRUFBeUMsYUFBekMsRUFDRSxVQUFDLE1BQUQsRUFBWTs7QUFFVixnQkFBSSxHQUFKLENBQVEsWUFBUixDQUFxQixLQUFyQixFQUE0QixLQUE1Qjs7QUFFQSxnQkFBSSxXQUFXLEVBQWYsRUFBbUI7QUFDakIsa0JBQUksaUJBQWlCLEVBQXJCO0FBQ0Esa0JBQUksUUFBSixDQUFhLElBQWIsQ0FBa0IsY0FBbEIsRUFBa0M7QUFDaEMsZ0NBQWdCLGNBRGdCO0FBRWhDLHVDQUF1QixPQUFLLEtBQUwsQ0FBVztBQUZGLGVBQWxDO0FBSUQ7O0FBRUQsZ0JBQUksV0FBVyxFQUFYLElBQWlCLElBQUksUUFBSixLQUFpQixJQUF0QyxFQUE0QztBQUMxQyxrQkFBSSxVQUFVLEVBQWQ7QUFDQSxtQkFBSyxJQUFJLENBQVQsSUFBYyxNQUFkLEVBQXNCO0FBQ3BCLG9CQUFJLE9BQU8sY0FBUCxDQUFzQixDQUF0QixDQUFKLEVBQThCO0FBQzVCLHNCQUFJLFFBQVEsQ0FBUixNQUFlLE9BQU8sQ0FBUCxDQUFuQixFQUE4QjtBQUM1Qiw0QkFBUSxDQUFSLElBQWEsT0FBTyxDQUFQLENBQWI7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxrQkFBSSxhQUFKO0FBQ0Esa0JBQUksa0JBQWlCLEVBQXJCO0FBQ0EsOEJBQWUsR0FBZixHQUFxQixLQUFyQjtBQUNBLDhCQUFlLEdBQWY7QUFDQSw4QkFBZSxPQUFmLEdBQXlCLE9BQXpCO0FBQ0EsOEJBQWUsTUFBZixHQUF3QixPQUFLLEtBQUwsQ0FBVyx1QkFBWCxDQUFtQyxLQUFuQyxDQUF4QjtBQUNBLGtCQUFJLFFBQUosQ0FBYSxJQUFiLENBQWtCLGVBQWxCLEVBQWtDO0FBQ2hDLGdDQUFnQixlQURnQjtBQUVoQyx1Q0FBdUIsT0FBSyxLQUFMLENBQVc7QUFGRixlQUFsQztBQUlEOztBQUVELGdCQUFJLFdBQVcsU0FBWCxJQUF3QixXQUFXLEVBQW5DLElBQXlDLFdBQVcsSUFBeEQsRUFBOEQ7QUFDNUQsa0JBQUksR0FBSixDQUFRLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE1BQXhCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsa0JBQUksR0FBSixDQUFRLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQXhCO0FBQ0Q7O0FBR0QsZ0JBQUksUUFBUSxDQUFSLEtBQWMsQ0FBbEIsRUFBcUI7QUFDbkIsa0JBQUksSUFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixRQUFsQixDQUEyQixPQUFLLEdBQUwsQ0FBUyxPQUFwQyxDQUFKLEVBQWtEO0FBQ2hELG9CQUFJLEdBQUosQ0FBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLE9BQUssR0FBTCxDQUFTLE9BQWxDO0FBQ0Esb0JBQUksR0FBSixDQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsT0FBSyxHQUFMLENBQVMsTUFBL0I7QUFDRDtBQUVGLGFBTkQsTUFNTztBQUNMLGtCQUFJLElBQUksR0FBSixDQUFRLFNBQVIsQ0FBa0IsUUFBbEIsQ0FBMkIsT0FBSyxHQUFMLENBQVMsTUFBcEMsQ0FBSixFQUFpRDtBQUMvQyxvQkFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixPQUFLLEdBQUwsQ0FBUyxNQUFsQztBQUNBLG9CQUFJLEdBQUosQ0FBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLE9BQUssR0FBTCxDQUFTLE9BQS9CO0FBQ0Q7QUFDRjs7QUFFRCxnQkFBSSxPQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFVBQTFCLENBQXFDLEtBQXJDLENBQUosRUFBaUQ7QUFDL0Msa0JBQUksR0FBSixDQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsT0FBSyxHQUFMLENBQVMsV0FBL0I7QUFDRCxhQUZELE1BRU87QUFDTCxrQkFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixPQUFLLEdBQUwsQ0FBUyxXQUFsQztBQUNEO0FBQ0YsV0EzREg7QUE0REQsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
