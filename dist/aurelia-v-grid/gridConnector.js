"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var GridConnector;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("GridConnector", GridConnector = function () {
        function GridConnector(datasource, selection, errorHandler) {
          _classCallCheck(this, GridConnector);

          this.controller = null;
          this.datasource = datasource;
          this.key = datasource.key;
          this.selection = datasource.selection;
          this.errorhandler = errorHandler || null;
        }

        GridConnector.prototype.gridCreated = function gridCreated(controller) {
          this.controller = controller;
          this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));

          this.raiseEvent("sortIconUpdate");
          this.controller.updateHeights();
          this.controller.triggerScroll(0);
          this.controller.updateHeaderGrouping(this.datasource.getGrouping());
        };

        GridConnector.prototype.eventHandler = function eventHandler(event) {
          switch (event) {
            case "collection_changed":
            case "collection_grouped":
            case "collection_collapsed_all":
            case "collection_expanded_all":
              this.raiseEvent("sortIconUpdate");
              this.controller.updateHeights();
              this.controller.triggerScroll(0);
              this.controller.updateHeaderGrouping(this.datasource.getGrouping());
              this.controller.setLoadingScreen(false);
              break;
            case "collection_collapsed":
            case "collection_expanded":
              this.raiseEvent("sortIconUpdate");
              this.controller.updateHeights();
              this.controller.triggerScroll(null);
              this.controller.updateHeaderGrouping(this.datasource.getGrouping());
              this.controller.setLoadingScreen(false);
              break;
            case "collection_sorted":
              this.raiseEvent("sortIconUpdate");
              this.controller.rebindAllRows();
              this.controller.setLoadingScreen(false);
              break;
            case "collection_filtered":
              this.raiseEvent("sortIconUpdate");
              this.controller.updateHeights();
              this.controller.triggerScroll();
              this.controller.setLoadingScreen(false);
              break;

            default:
              console.log("unknown event");
              console.log(event);

          }
        };

        GridConnector.prototype.raiseEvent = function raiseEvent(name) {
          var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
          });
          if (this.controller) {
            this.controller.element.dispatchEvent(event);
          }

          return event;
        };

        GridConnector.prototype.select = function select(row) {
          this.datasource.select(row);
        };

        GridConnector.prototype.length = function length() {
          return this.datasource.collection.length;
        };

        GridConnector.prototype.getGrouping = function getGrouping() {
          return this.datasource.getGrouping();
        };

        GridConnector.prototype.group = function group(grouping, keepExpanded) {
          var _this = this;

          this.controller.setLoadingScreen(true, null, this.length()).then(function () {
            _this.datasource.group(grouping, keepExpanded);
          });
        };

        GridConnector.prototype.getElement = function getElement(options) {
          var row = options.row;
          var isDown = options.isDown;
          var callback = options.callback;
          var rowContext = {
            row: row,
            selection: this.selection,
            rowRef: this.datasource.getElement(row)
          };

          callback(rowContext);
        };

        GridConnector.prototype.query = function query(a) {
          var _this2 = this;

          this.controller.setLoadingScreen(true, null, this.length()).then(function () {
            _this2.datasource.query(a);
          });
        };

        GridConnector.prototype.orderBy = function orderBy(attribute, addToCurrentSort) {
          var _this3 = this;

          this.controller.setLoadingScreen(true, null, this.length()).then(function () {
            _this3.datasource.orderBy(attribute, addToCurrentSort);
          });
        };

        GridConnector.prototype.destroy = function destroy() {
          this.datasource.removeEventlistener(this.eventID);
        };

        GridConnector.prototype.getCurrentOrderBy = function getCurrentOrderBy() {
          return this.datasource.getCurrentOrderBy();
        };

        GridConnector.prototype.getCurrentFilter = function getCurrentFilter() {
          return this.datasource.getCurrentFilter();
        };

        GridConnector.prototype.getFilterOperatorName = function getFilterOperatorName(operator) {
          return this.datasource.getFilterOperatorName(operator);
        };

        GridConnector.prototype.expandGroup = function expandGroup(id) {
          var _this4 = this;

          this.controller.setLoadingScreen(true, null, this.length()).then(function () {
            _this4.datasource.groupExpand(id);
          });
        };

        GridConnector.prototype.collapseGroup = function collapseGroup(id) {
          var _this5 = this;

          this.controller.setLoadingScreen(true, null, this.length()).then(function () {
            _this5.datasource.groupCollapse(id);
          });
        };

        return GridConnector;
      }());

      _export("GridConnector", GridConnector);
    }
  };
});
//# sourceMappingURL=gridConnector.js.map
