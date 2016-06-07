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
            if (toProperty === "attRemoteIndex") {
              this[toProperty] = true;
              this.vGrid.vGridRowKey = value;
            } else {
              this[toProperty] = value;
            }
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
//# sourceMappingURL=data:application/json;base64,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QUFMLENBQVMsT0FBbEM7QUFDQSxvQkFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixPQUFLLEdBQUwsQ0FBUyxNQUEvQjtBQUNEO0FBRUYsYUFORCxNQU1PO0FBQ0wsa0JBQUksSUFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixRQUFsQixDQUEyQixPQUFLLEdBQUwsQ0FBUyxNQUFwQyxDQUFKLEVBQWlEO0FBQy9DLG9CQUFJLEdBQUosQ0FBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLE9BQUssR0FBTCxDQUFTLE1BQWxDO0FBQ0Esb0JBQUksR0FBSixDQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsT0FBSyxHQUFMLENBQVMsT0FBL0I7QUFDRDtBQUNGOztBQUVELGdCQUFJLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsVUFBMUIsQ0FBcUMsS0FBckMsQ0FBSixFQUFpRDtBQUMvQyxrQkFBSSxHQUFKLENBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixPQUFLLEdBQUwsQ0FBUyxXQUEvQjtBQUNELGFBRkQsTUFFTztBQUNMLGtCQUFJLEdBQUosQ0FBUSxTQUFSLENBQWtCLE1BQWxCLENBQXlCLE9BQUssR0FBTCxDQUFTLFdBQWxDO0FBQ0Q7QUFDRixXQTNESDtBQTRERCxTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
