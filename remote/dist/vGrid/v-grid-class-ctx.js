"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, VGridClientCtx;

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

      _export("VGridClientCtx", VGridClientCtx = function () {
        function VGridClientCtx(vGrid) {
          _classCallCheck(this, VGridClientCtx);

          this.vGrid = vGrid;
        }

        VGridClientCtx.prototype.setData = function setData(data) {
          this.vGridConfig.remoteLimit = data.limit || 40;
          this.vGridConfig.remoteLength = data.length || 0;
          this.vGridConfig.remoteOffset = data.offset || 0;
          this.keepFilterOnCollectionChange();
          this.vGrid.vGridCollection = data.col || [];
          this.setLoadingOverlay(false);
          this.vGrid.vGridPager.updatePager({
            limit: this.vGridConfig.remoteLimit,
            offset: this.vGridConfig.remoteOffset,
            length: this.vGridConfig.remoteLength
          });
        };

        VGridClientCtx.prototype.keepFilterOnCollectionChange = function keepFilterOnCollectionChange() {
          this.vGridConfig.keepFilterOnCollectionChange = true;
        };

        VGridClientCtx.prototype.rebuildColumns = function rebuildColumns() {
          this.vGridGenerator.rebuildColumns();
        };

        VGridClientCtx.prototype.scrollBottom = function scrollBottom() {
          this.vGridGenerator.scrollBottom();
        };

        VGridClientCtx.prototype.scrollTop = function scrollTop() {
          this.vGridGenerator.scrollTop();
        };

        VGridClientCtx.prototype.setScrollTop = function setScrollTop(newTop) {
          this.vGridGenerator.setScrollTop(newTop);
        };

        VGridClientCtx.prototype.rebuildColumnsRows = function rebuildColumnsRows() {
          this.vGridGenerator.rebuildColumnsRows();
        };

        VGridClientCtx.prototype.columnChangeAndCollection = function columnChangeAndCollection(resetScrollToTop) {
          this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
        };

        VGridClientCtx.prototype.redrawGrid = function redrawGrid() {
          this.vGridGenerator.redrawGrid();
        };

        VGridClientCtx.prototype.setColumns = function setColumns(paramObj) {
          return this.vGridGenerator.setColumns(paramObj);
        };

        VGridClientCtx.prototype.getColumns = function getColumns() {
          return this.vGridGenerator.getColumns();
        };

        VGridClientCtx.prototype.getMaxRows = function getMaxRows() {
          var supportedHeight = 10000;
          var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 8947840 : 1000000000;
          var div = document.createElement("div");

          document.body.appendChild(div);

          while (true) {
            var test = supportedHeight + 10000;
            div.style.height = test + "px";
            if (test > testUpTo || div.clientHeight !== test) {
              break;
            } else {
              supportedHeight = test;
            }
          }
          document.body.removeChild(div);
          return supportedHeight / this.vGridConfig.rowHeight + ", error margin:" + 10000 / this.vGridConfig.rowHeight;
        };

        VGridClientCtx.prototype.scrollBottomNext = function scrollBottomNext() {
          this.vGridGenerator.scrollBottomNext();
        };

        VGridClientCtx.prototype.setLoadingOverlay = function setLoadingOverlay(value) {
          this.vGrid.loading = value === true ? true : false;
        };

        VGridClientCtx.prototype.createReport = function createReport(skipArray) {
          if (skipArray === undefined) {
            skipArray = [];
          }
          var content = '';
          var rows = this.vGrid.vGridCollectionFiltered;
          var attributes = this.vGridConfig.attributeArray;

          var setData = function setData(arr) {
            content = content + arr.join(';') + '\n';
          };

          setData(attributes);

          rows.forEach(function (row) {
            var tempArr = [];
            attributes.forEach(function (att) {
              if (skipArray.indexOf(att) === -1) {
                tempArr.push(row[att]);
              }
            });
            setData(tempArr);
          });

          var dummyElement = document.createElement('a');
          dummyElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
          dummyElement.setAttribute('download', 'contacts.csv');
          dummyElement.style.display = 'none';
          document.body.appendChild(dummyElement);
          dummyElement.click();
          document.body.removeChild(dummyElement);
        };

        _createClass(VGridClientCtx, [{
          key: "vGridSelection",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSelection;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridConfig",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridConfig;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridCellHelper",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCellHelper;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridElement",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.element;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridSortable",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridSortable;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridResizable",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridResizable;
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
          key: "vGridObservables",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridObservables;
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
          key: "vGridCurrentEntityRef",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCurrentEntityRef;
            } else {
              return null;
            }
          }
        }, {
          key: "vGridRowKey",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridRowKey;
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
          }
        }, {
          key: "vGridCollection",
          get: function get() {
            if (this.vGrid) {
              return this.vGrid.vGridCollection;
            } else {
              return null;
            }
          }
        }]);

        return VGridClientCtx;
      }());

      _export("VGridClientCtx", VGridClientCtx);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jbGFzcy1jdHguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FPYSxjO0FBRVgsZ0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O2lDQStIRCxPLG9CQUFRLEksRUFBTTtBQUNaLGVBQUssV0FBTCxDQUFpQixXQUFqQixHQUErQixLQUFLLEtBQUwsSUFBYyxFQUE3QztBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLE1BQUwsSUFBZSxDQUEvQztBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLE1BQUwsSUFBZSxDQUEvQztBQUNBLGVBQUssNEJBQUw7QUFDQSxlQUFLLEtBQUwsQ0FBVyxlQUFYLEdBQTZCLEtBQUssR0FBTCxJQUFZLEVBQXpDO0FBQ0EsZUFBSyxpQkFBTCxDQUF1QixLQUF2QjtBQUNBLGVBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsV0FBdEIsQ0FBa0M7QUFDaEMsbUJBQVEsS0FBSyxXQUFMLENBQWlCLFdBRE87QUFFaEMsb0JBQVMsS0FBSyxXQUFMLENBQWlCLFlBRk07QUFHaEMsb0JBQVMsS0FBSyxXQUFMLENBQWlCO0FBSE0sV0FBbEM7QUFLRCxTOztpQ0FXRCw0QiwyQ0FBK0I7QUFDN0IsZUFBSyxXQUFMLENBQWlCLDRCQUFqQixHQUFnRCxJQUFoRDtBQUNELFM7O2lDQXNCRCxjLDZCQUFpQjtBQUNmLGVBQUssY0FBTCxDQUFvQixjQUFwQjtBQUNELFM7O2lDQUdELFksMkJBQWU7QUFDYixlQUFLLGNBQUwsQ0FBb0IsWUFBcEI7QUFDRCxTOztpQ0FJRCxTLHdCQUFZO0FBQ1YsZUFBSyxjQUFMLENBQW9CLFNBQXBCO0FBQ0QsUzs7aUNBSUQsWSx5QkFBYSxNLEVBQVE7QUFDbkIsZUFBSyxjQUFMLENBQW9CLFlBQXBCLENBQWlDLE1BQWpDO0FBQ0QsUzs7aUNB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QUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGdCQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGOzs7OEJBRW9CO0FBQ25CLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLHFCQUFPLEtBQUssS0FBTCxDQUFXLGNBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFMkI7QUFDMUIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcscUJBQWxCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sSUFBUDtBQUNEO0FBQ0Y7Ozs4QkFFaUI7QUFDaEIsZ0JBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QscUJBQU8sS0FBSyxLQUFMLENBQVcsV0FBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUU2QjtBQUM1QixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyx1QkFBbEI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzhCQUVxQjtBQUNwQixnQkFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxxQkFBTyxLQUFLLEtBQUwsQ0FBVyxlQUFsQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPLElBQVA7QUFDRDtBQUNGIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1jbGFzcy1jdHguanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
