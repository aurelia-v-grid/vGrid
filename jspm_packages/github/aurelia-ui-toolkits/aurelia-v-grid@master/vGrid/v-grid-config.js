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
      this.attHidePagerInfo = false;
      this.attCustomPager = null;
      this.attLanguage = {};

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
  }();
});