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

        if (filterObj.length !== 0 || _this.attDataBinder) {
          setTimeout(function () {
            _this.vGrid.vGridFilter.lastFilter = filterObj;
            _this.attDataBinder.filter({
              type: "filter",
              filter: _this.vGrid.vGridFilter.lastFilter,
              sort: _this.vGrid.vGridSort.getFilter(),
              activateLoadingScreen: function activateLoadingScreen() {
                _this.vGrid.loading = true;
              },
              callback: function callback() {
                _this.vGrid.loading = false;
              }
            });
          }, 50);
        }
      };

      this.vGrid = vGrid;

      this.colConfig = [];

      this.columnLength = 0;

      this.attRowHeight = 50;
      this.attHeaderHeight = 0;
      this.attFooterHeight = 0;
      this.attResizableHeaders = false;
      this.attMultiSelect = undefined;
      this.attSortableHeader = false;
      this.attLoadingThreshold = -1;

      this.attManualSelection = false;
      this.eventOnRowDraw = null;
      this.eventOnRowClick = null;
      this.attDataBinder = null;
      this.eventOnRowDblClick = null;
      this.attCustomFooter = null;
      this.attLanguage = {};
      this.attOnlyCustom = false;
      this.repeater = false;
      this.repeatRowTemplate = null;

      this.attDataScrollDelay = 200;
      this.attRequestAnimationFrame = true;
      this.attResizableHeadersAndRows = true;
      this.attRenderOnScrollbarScroll = false;

      this.keepFilterOnCollectionChange = false;
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
        this[toProperty] = value;
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

    VGridConfig.prototype.setDataBinder = function setDataBinder(value, toProperty) {
      this[toProperty] = value;
      this[toProperty].vGrid = this.vGrid;
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

    VGridConfig.prototype.getFilterName = function getFilterName(name) {
      return this.vGrid.vGridFilter.getNameOfFilter(name);
    };

    VGridConfig.prototype.getDataElement = function getDataElement(row, isDown, isLargeScroll, div, callback) {
      var _this2 = this;

      this.attDataBinder.getElement({
        type: "getData",
        filter: this.vGrid.vGridFilter.lastFilter,
        sort: this.vGrid.vGridSort.getFilter(),
        row: row,
        div: div,
        rowHeight: this.attRowHeight,
        isDown: isDown,
        isLargeScroll: isLargeScroll,
        callback: callback.bind(this),
        activateLoadingScreen: function activateLoadingScreen() {
          _this2.vGrid.loading = true;
        },
        deActivateLoadingScreen: function deActivateLoadingScreen() {
          _this2.vGrid.loading = false;
        }
      });
    };

    VGridConfig.prototype.onOrderBy = function onOrderBy(attribute, add) {
      var _this3 = this;

      this.vGrid.vGridSort.setFilter({
        attribute: attribute,
        asc: true
      }, add);

      var event = new CustomEvent("sortIconUpdate", {
        detail: "",
        bubbles: true
      });

      this.vGrid.element.dispatchEvent(event);

      this.attDataBinder.sort({
        type: "sort",
        filter: this.vGrid.vGridFilter.lastFilter,
        sort: this.vGrid.vGridSort.getFilter(),
        activateLoadingScreen: function activateLoadingScreen() {
          _this3.vGrid.loading = true;
        },
        callback: function callback() {
          _this3.vGrid.loading = false;
        }
      });
    };

    VGridConfig.prototype.getCollectionLength = function getCollectionLength() {
      return this.attDataBinder.length({
        type: "length"
      });
    };

    VGridConfig.prototype.clickHandler = function clickHandler(event, row) {

      this.attDataBinder.rowClick({
        type: "rowClick",
        row: row
      });

      this.vGrid.vGridCurrentRow = row;

      if (event.type === "click") {
        this.vGrid.raiseEvent("v-row-onclick", {
          evt: event,
          data: null,
          row: row
        });
      }

      if (event.type === "dblclick") {
        this.vGrid.raiseEvent("v-row-ondblclick", {
          evt: event,
          data: null,
          row: row
        });
      }
    };

    VGridConfig.prototype.updateRowBinding = function updateRowBinding(rowNo, row, isDownScroll, isLargeScroll) {
      var _this4 = this;

      this.getDataElement(rowNo, isDownScroll, isLargeScroll, row, function (entity) {

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
          _bindingContext.rowRef = entity;

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