'use strict';

System.register(['aurelia-framework', './v-grid-generator', './v-grid-filter', './v-grid-sort', './v-grid-interpolate', './v-grid-sortable', './v-grid-cell-edit', './v-grid-selection'], function (_export, _context) {
  var noView, processContent, ObserverLocator, customAttribute, bindable, VGridGenerator, VGridFilter, VGridSort, VGridInterpolate, VGridSortable, VGridCellEdit, VGridSelection, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp, VGrid;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      noView = _aureliaFramework.noView;
      processContent = _aureliaFramework.processContent;
      ObserverLocator = _aureliaFramework.ObserverLocator;
      customAttribute = _aureliaFramework.customAttribute;
      bindable = _aureliaFramework.bindable;
    }, function (_vGridGenerator) {
      VGridGenerator = _vGridGenerator.VGridGenerator;
    }, function (_vGridFilter) {
      VGridFilter = _vGridFilter.VGridFilter;
    }, function (_vGridSort) {
      VGridSort = _vGridSort.VGridSort;
    }, function (_vGridInterpolate) {
      VGridInterpolate = _vGridInterpolate.VGridInterpolate;
    }, function (_vGridSortable) {
      VGridSortable = _vGridSortable.VGridSortable;
    }, function (_vGridCellEdit) {
      VGridCellEdit = _vGridCellEdit.VGridCellEdit;
    }, function (_vGridSelection) {
      VGridSelection = _vGridSelection.VGridSelection;
    }],
    execute: function () {
      _export('VGrid', VGrid = (_dec = processContent(false), _dec2 = customAttribute("config"), noView(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
        function VGrid(element, observerLocator, vGridFilter, vGridSort, vGridInterpolate) {
          _classCallCheck(this, VGrid);

          _initDefineProp(this, 'gridContext', _descriptor, this);

          _initDefineProp(this, 'collection', _descriptor2, this);

          _initDefineProp(this, 'currentEntity', _descriptor3, this);

          this.vGridFilter = vGridFilter;
          this.vGridSort = vGridSort;
          this.vGridInterpolate = vGridInterpolate;
          this.observerLocator = observerLocator;
          this.element = element;
          this.currentRowEntity = null;
          this.filterRow = -1;
          this.scrollBottomNext = false;
          this.sgkey = "__vGrid" + Math.floor(Math.random() * 1000 + 1);
          this.gridContextMissing = false;
          this.subscriptionsAttributes = [];
          this.collectionSubscription = null;
          this.collectionFiltered = [];
          this.subscriptionsArray = [];
          this.skipNextUpdateProperty = [];
          this.rowData = this.element.getElementsByTagName("V-GRID-ROW")[0];
          this.columns = this.rowData.getElementsByTagName("V-GRID-COL");
          this.vGridCellEdit = new VGridCellEdit(this);
          this.filterRowDisplaying = true;
          this.vGridSelection = new VGridSelection(this, this);
        }

        VGrid.prototype.enableObservablesCollection = function enableObservablesCollection() {

          var collectionSubscription = this.__observers__.collection.subscribe(this, function (x, y) {
            this.disableObservablesArray();

            this.collectionFiltered = this.collection.slice(0);
            this.resetKeys();

            this.vGridSort.reset();
            this.gridContext.ctx.clearHeaderSortFilter();
            this.vGridSelection.reset();
            this.gridContext.ctx.collectionChange();

            for (var k in this.currentEntity) {
              if (this.currentEntity.hasOwnProperty(k)) {
                this.currentEntity[k] = undefined;
                this.skipNextUpdateProperty.push(k);
              }
            }

            this.enableObservablesArray();
          });
          this.collectionSubscription = this.__observers__.collection;
        };

        VGrid.prototype.resetKeys = function resetKeys() {
          var _this = this;

          var key = 0;
          this.collection.forEach(function (row) {
            row[_this.sgkey] = key;
            key++;
          });
        };

        VGrid.prototype.enableObservablesArray = function enableObservablesArray() {
          var _this2 = this;

          var arrayObserver = this.observerLocator.getArrayObserver(this.collection);
          arrayObserver.subscribe(function (changes) {

            var colFiltered = _this2.collectionFiltered;
            var col = _this2.collection;
            var grid = _this2.gridContext.ctx;

            var curKey = -1;
            if (_this2.currentRowEntity) {
              curKey = _this2.currentRowEntity[_this2.sgkey];
            }
            var curEntityValid = true;

            if (changes.length > 0) {

              var added = false;
              var toRemove = [];

              changes.forEach(function (result) {
                if (result.addedCount > 0) {
                  added = true;
                }

                if (result.removed.length > 0) {
                  result.removed.forEach(function (x) {
                    toRemove.push(x[_this2.sgkey]);
                  });
                }
              });

              if (added === true) {
                col.forEach(function (x) {
                  if (x[_this2.sgkey] === undefined) {
                    colFiltered.push(x);
                  }
                });
              }

              var i = colFiltered.length - 1;
              while (i !== -1) {
                if (toRemove.indexOf(curKey) !== -1) {
                  curEntityValid = false;
                }
                if (toRemove.indexOf(colFiltered[i][_this2.sgkey]) !== -1) {
                  var x = colFiltered.splice(i, 1);
                }
                i--;
              }

              var newRowNo = -1;

              if (!curEntityValid) {
                for (var k in _this2.currentEntity) {
                  if (_this2.currentEntity.hasOwnProperty(k)) {
                    _this2.currentEntity[k] = undefined;
                    _this2.skipNextUpdateProperty.push(k);
                  }
                }
              } else {

                if (curKey) {
                  _this2.collectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this2.sgkey]) {
                      newRowNo = index;
                    }
                  });
                }
              }

              _this2.resetKeys();

              _this2.filterRowDisplaying = false;
              if (newRowNo > -1) {
                _this2.currentRowEntity = _this2.collectionFiltered[newRowNo];
                _this2.currentEntity[_this2.sgkey] = _this2.currentRowEntity[_this2.sgkey];
                _this2.filterRow = newRowNo;
                _this2.filterRowDisplaying = true;
              }

              grid.collectionChange(false, _this2.scrollBottomNext);
              if (_this2.filterRowDisplaying) {
                _this2.vGridCellEdit.setBackFocus();
              }
            }
          });
          this.subscriptionsArray = arrayObserver;
        };

        VGrid.prototype.enableObservablesAttributes = function enableObservablesAttributes() {
          var _this3 = this;

          this.gridOptions.attributeArray.forEach(function (property) {
            var propertyObserver = _this3.observerLocator.getObserver(_this3.currentEntity, property);
            propertyObserver.subscribe(function (newValue, oldValue) {
              if (newValue !== oldValue) {
                if (_this3.skipNextUpdateProperty.indexOf(property) === -1) {
                  _this3.currentRowEntity[property] = newValue;
                  _this3.gridContext.ctx.updateRow(_this3.filterRow, true);
                } else {
                  _this3.skipNextUpdateProperty.splice(_this3.skipNextUpdateProperty.indexOf(property), 1);
                }
              }
            });
            _this3.subscriptionsAttributes.push(propertyObserver);
          });
        };

        VGrid.prototype.bind = function bind(parent) {
          this.$parent = parent;

          if (!this.gridContext) {
            this.gridContext = {};
            this.gridContextMissing = true;
          }

          if (this.collection === undefined || this.currentEntity === undefined) {
            if (this.collection === undefined && this.currentEntity === undefined) {
              console.warn("currentEntity & collection not set/binded in config attribute");
            } else {
              if (this.currentEntity === undefined) {
                console.warn("currentEntity not set/binded in config attribute");
              }

              if (this.collection === undefined) {
                console.warn("collection not set/binded in config attribute");
              }
            }
          } else {
            this.collectionFiltered = this.collection.slice(0);

            this.resetKeys();
          }
        };

        VGrid.prototype.disableObservablesCollection = function disableObservablesCollection() {
          this.collectionSubscription.unsubscribe();
          this.collectionSubscription = null;
        };

        VGrid.prototype.disableObservablesArray = function disableObservablesArray() {
          this.subscriptionsArray.unsubscribe();
          this.subscriptionsArray = null;
        };

        VGrid.prototype.disableObservablesAttributes = function disableObservablesAttributes() {
          for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
            try {
              this.subscriptionsAttributes[i].unsubscribe();
            } catch (e) {}
          }
          this.subscriptionsAttributes = [];
        };

        VGrid.prototype.attached = function attached() {
          var _this4 = this;

          var gridOptions = {};

          if (!this.rowData) {
            throw "error, you need to add the row for the grid to work atm";
          }
          if (this.gridContextMissing && !this.rowData) {
            throw "grid needs context under config attributes, or row element";
          }

          this.rowData.style.display = "none";

          var type = {
            "true": true,
            "false": false
          };

          var setValue = function setValue(contextValue, htmlAttributeValue, defaultValue) {
            var value = defaultValue;
            if (contextValue !== undefined && contextValue !== null) {
              value = contextValue;
            } else {
              if (htmlAttributeValue !== undefined && htmlAttributeValue !== null) {
                value = htmlAttributeValue;
              }
            }
            return value;
          };

          if (this.columns.length === 0) {
            gridOptions.columnWidthArrayOverride = true;

            gridOptions.onRowMarkupCreate = function () {
              return _this4.rowData.innerHTML;
            };

            gridOptions.attributeArray = this.element.getAttribute("attibutes-used").split(",");
            gridOptions.readOnlyArray = [];
          } else {
              gridOptions.attributeArray = [];
              gridOptions.columnWidthArray = [];
              gridOptions.headerArray = [];
              gridOptions.filterArray = [];
              gridOptions.readOnlyArray = [];
              gridOptions.colStyleArray = [];
              gridOptions.colTypeArray = [];

              for (var i = 0; i < this.columns.length; i++) {
                gridOptions.attributeArray.push(this.columns[i].getAttribute("attribute"));
                gridOptions.columnWidthArray.push(this.columns[i].getAttribute("col-width"));
                gridOptions.headerArray.push(this.columns[i].getAttribute("header") || "");
                gridOptions.colStyleArray.push(this.columns[i].getAttribute("col-css") || "");
                gridOptions.colTypeArray.push(this.columns[i].getAttribute("col-type") || "");
                gridOptions.filterArray.push(this.columns[i].getAttribute("default-filter") || "?");
                gridOptions.readOnlyArray.push(this.columns[i].getAttribute("read-only") === "true" ? this.columns[i].getAttribute("attribute") : false);
              }

              gridOptions.attributeArray = this.gridContext.attributeArray || gridOptions.attributeArray;
              gridOptions.columnWidthArray = this.gridContext.columnWidthArray || gridOptions.columnWidthArray;
              gridOptions.headerArray = this.gridContext.headerArray || gridOptions.headerArray;
              gridOptions.filterArray = this.gridContext.filterArray || gridOptions.filterArray;
              gridOptions.readOnlyArray = this.gridContext.readOnlyArray || gridOptions.readOnlyArray;
              gridOptions.colStyleArray = this.gridContext.colStyleArray || gridOptions.colStyleArray;
              gridOptions.colTypeArray = this.gridContext.colTypeArray || gridOptions.colTypeArray;
            }

          gridOptions.rowHeight = setValue(this.gridContext.rowHeight, parseInt(this.element.getAttribute("row-height")), 50);
          gridOptions.headerHeight = setValue(this.gridContext.headerHeight, parseInt(this.element.getAttribute("header-height")), 0);
          gridOptions.footerHeight = setValue(this.gridContext.footerHeight, parseInt(this.element.getAttribute("footer-height")), 0);
          gridOptions.isResizableHeaders = setValue(this.gridContext.resizableHeaders, type[this.element.getAttribute("resizable-headers")], false);
          gridOptions.isMultiSelect = setValue(this.gridContext.multiSelect, type[this.element.getAttribute("multi-select")], undefined);
          gridOptions.isSortableHeader = setValue(this.gridContext.sortableHeader, type[this.element.getAttribute("sortable-headers")], false);
          gridOptions.requestAnimationFrame = setValue(this.gridContext.requestAnimationFrame, type[this.element.getAttribute("request-animation-frame")], true);
          gridOptions.resizableHeadersAndRows = setValue(this.gridContext.resizeAlsoRows, type[this.element.getAttribute("resize-also-rows")], false);
          gridOptions.renderOnScrollbarScroll = setValue(this.gridContext.renderOnScrollbarScroll, type[this.element.getAttribute("render-on-scrollbar-scroll")], true);
          gridOptions.lockedColumns = setValue(this.gridContext.lockedColumns, parseInt(this.element.getAttribute("locked-columns")), 0);
          gridOptions.addFilter = setValue(this.gridContext.headerFilter, type[this.element.getAttribute("header-filter")], false);
          gridOptions.filterOnAtTop = setValue(this.gridContext.headerFilterTop, type[this.element.getAttribute("header-filter-top")], false);
          gridOptions.filterOnKey = setValue(this.gridContext.headerFilterOnkeydown, type[this.element.getAttribute("header-filter-onkeydown")], false);
          gridOptions.sortOnHeaderClick = setValue(this.gridContext.sortOnHeaderClick, type[this.element.getAttribute("sort-on-header-click")], false);

          this.eventEditHandler = this.element.getAttribute("edit-handler");
          this.eventOnDblClick = this.element.getAttribute("row-on-dblclick");
          this.eventOnRowDraw = this.element.getAttribute("row-on-draw");

          if (this.element.getAttribute("header-filter-not-to")) {
            gridOptions.doNotAddFilterTo = this.element.getAttribute("header-filter-not-to").split(",");
          } else {
            if (this.gridContext.headerFilterNotTo) {
              gridOptions.doNotAddFilterTo = this.gridContext.headerFilterNotTo.split(",");
            } else {
              gridOptions.doNotAddFilterTo = [];
            }
          }

          if (this.element.getAttribute("sort-not-on-header")) {
            gridOptions.sortNotOnHeader = this.element.getAttribute("sort-not-on-header").split(",");
          } else {
            if (this.gridContext.sortNotOnHeader) {
              gridOptions.sortNotOnHeader = this.gridContext.sortNotOnHeader.split(",");
            } else {
              gridOptions.sortNotOnHeader = [];
            }
          }

          if (gridOptions.addFilter) {
            gridOptions.onFilterRun = function (filterObj) {

              if (filterObj.length !== 0 || _this4.collectionFiltered.length !== _this4.collection.length) {

                var curKey = -1;
                if (_this4.currentRowEntity) {
                  curKey = _this4.currentRowEntity[_this4.sgkey];
                }
                if (filterObj.length === 0 && _this4.collectionFiltered.length !== _this4.collection.length) {
                  _this4.collectionFiltered = _this4.collection.slice(0);
                } else {

                  _this4.collectionFiltered = _this4.vGridFilter.run(_this4.collection, filterObj);
                  _this4.vGridSort.run(_this4.collectionFiltered);
                }

                var newRowNo = -1;
                if (curKey) {
                  _this4.collectionFiltered.forEach(function (x, index) {
                    if (curKey === x[_this4.sgkey]) {
                      newRowNo = index;
                    }
                  });
                }

                _this4.filterRowDisplaying = false;
                if (newRowNo > -1) {
                  _this4.currentRowEntity = _this4.collectionFiltered[newRowNo];
                  _this4.currentEntity[_this4.sgkey] = _this4.currentRowEntity[_this4.sgkey];
                  _this4.filterRow = newRowNo;
                  _this4.filterRowDisplaying = true;
                }

                _this4.gridContext.ctx.collectionChange(true);
                if (_this4.filterRowDisplaying) {
                  _this4.vGridCellEdit.setBackFocus();
                }
              }
            };
          }

          gridOptions.getFilterName = function (name) {
            return _this4.vGridFilter.getNameOfFilter(name);
          };

          gridOptions.getDataElement = function (row, isDown, isLargeScroll, callback) {
            if (_this4.collectionFiltered !== undefined) {
              if (_this4.$parent[_this4.eventOnRowDraw]) {
                var data = _this4.vGridInterpolate.getNewObject(_this4.collectionFiltered[row]);
                _this4.$parent[_this4.eventOnRowDraw](data, _this4.collectionFiltered[row]);
                callback(data);
              } else {
                callback(_this4.collectionFiltered[row]);
              }
            }
          };

          gridOptions.onOrderBy = function (event, setheaders) {
            var attribute = event.target.getAttribute(_this4.gridContext.ctx._private.atts.dataAttribute);
            if (attribute === null) {
              attribute = event.target.offsetParent.getAttribute(_this4.gridContext.ctx._private.atts.dataAttribute);
            }
            var checked = true;
            if (_this4.gridOptions.sortNotOnHeader.indexOf(attribute) !== -1) {
              checked = false;
            }

            if (_this4.collectionFiltered.length > 0 && attribute && checked) {
              _this4.vGridSort.setFilter({
                attribute: attribute,
                asc: true
              }, event.shiftKey);

              setheaders(_this4.vGridSort.getFilter());

              _this4.vGridSort.run(_this4.collectionFiltered);

              _this4.gridContext.ctx.collectionChange();

              _this4.collectionFiltered.forEach(function (x, index) {
                if (_this4.currentEntity[_this4.sgkey] === x[_this4.sgkey]) {
                  _this4.filterRow = index;
                }
              });
              _this4.vGridCellEdit.setBackFocus();
            }
          };

          gridOptions.onScrolled = function () {

            var rowHeight = _this4.gridContext.ctx._private.rowHeight;
            var array = _this4.gridContext.ctx._private.htmlCache.rowsArray;
            var arraylength = array.length;
            var firstRow = parseInt(array[0].top / rowHeight, 10);
            var lastRow = parseInt(array[arraylength - 1].top / rowHeight, 10);
            var curRow = _this4.filterRow;
            if (firstRow <= curRow && lastRow >= curRow) {
              _this4.vGridCellEdit.setBackFocus();
            }
          };

          gridOptions.clickHandler = function (event, row) {

            var attribute = event.target.getAttribute(_this4.gridContext.ctx._private.atts.dataAttribute);
            var readonly = _this4.gridOptions.readOnlyArray.indexOf(attribute) ? false : true;

            _this4.filterRow = row;

            _this4.currentRowEntity = _this4.collectionFiltered[row];

            var data = _this4.currentRowEntity;
            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                if (_this4.currentEntity[k] !== data[k]) {
                  _this4.currentEntity[k] = data[k];
                  _this4.skipNextUpdateProperty.push(k);
                }
              }
            }

            if (_this4.$parent[_this4.eventOnDblClick] && event.type === "dblclick") {
              setTimeout(function () {
                _this4.$parent[_this4.eventOnDblClick](_this4.currentRowEntity[_this4.sgkey], attribute, event);
              }, 15);
            }

            _this4.vGridCellEdit.editCellhelper(row, event, readonly);
          };

          gridOptions.getSourceLength = function () {
            if (gridOptions.addFilter) {
              return _this4.collectionFiltered.length;
            } else {
              return _this4.collection.length;
            }
          };

          this.gridOptions = gridOptions;

          this.enableObservablesCollection();
          this.enableObservablesArray();
          this.enableObservablesAttributes();

          this.gridContext.ctx = new VGridGenerator(gridOptions, this.vGridInterpolate, this.element, VGridSortable, this.vGridSelection, this.vGridCellEdit);

          this.gridContext.ctx.getGridRows = function () {
            var array = [];
            _this4.collectionFiltered.forEach(function (x) {
              array.push(x[_this4.sgkey]);
            });
            return array;
          };

          this.gridContext.ctx.scrollBottomNext = function () {
            _this4.scrollBottomNext = true;
          };

          this.gridContext.ctx.selection = this.vGridSelection;
        };

        VGrid.prototype.detached = function detached() {
          this.disableObservablesAttributes();
          this.disableObservablesCollection();
          this.disableObservablesArray();
        };

        return VGrid;
      }(), _class3.inject = [Element, ObserverLocator, VGridFilter, VGridSort, VGridInterpolate], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'gridContext', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'collection', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'currentEntity', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class));

      _export('VGrid', VGrid);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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SztBQUNkLHVCQUFLLE9BQUwsQ0FBYSxPQUFLLGVBQUwsQ0FBYixDQUFtQyxPQUFLLGdCQUFMLENBQXNCLE9BQUssS0FBTCxDQUF6RCxFQUFzRSxTQUF0RSxFQUFpRixLQUFqRixFQURjO2VBQUwsRUFFUixFQUZILEVBRG1FO2FBQXJFOztBQVFBLG1CQUFLLGFBQUwsQ0FBbUIsY0FBbkIsQ0FBa0MsR0FBbEMsRUFBdUMsS0FBdkMsRUFBOEMsUUFBOUMsRUFqQ3lDO1dBQWhCLENBdlNsQjs7QUFvVlQsc0JBQVksZUFBWixHQUE4QixZQUFNO0FBQ2xDLGdCQUFJLFlBQVksU0FBWixFQUF1QjtBQUN6QixxQkFBTyxPQUFLLGtCQUFMLENBQXdCLE1BQXhCLENBRGtCO2FBQTNCLE1BRU87QUFDTCxxQkFBTyxPQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FERjthQUZQO1dBRDRCLENBcFZyQjs7QUFnV1QsZUFBSyxXQUFMLEdBQW1CLFdBQW5CLENBaFdTOztBQW1XVCxlQUFLLDJCQUFMLEdBbldTO0FBb1dULGVBQUssc0JBQUwsR0FwV1M7QUFxV1QsZUFBSywyQkFBTCxHQXJXUzs7QUE0V1QsZUFBSyxXQUFMLENBQWlCLEdBQWpCLEdBQXVCLElBQUksY0FBSixDQUFtQixXQUFuQixFQUFnQyxLQUFLLGdCQUFMLEVBQXVCLEtBQUssT0FBTCxFQUFjLGFBQXJFLEVBQW9GLEtBQUssY0FBTCxFQUFxQixLQUFLLGFBQUwsQ0FBaEksQ0E1V1M7O0FBK1dULGVBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixXQUFyQixHQUFtQyxZQUFNO0FBQ3ZDLGdCQUFJLFFBQVEsRUFBUixDQURtQztBQUV2QyxtQkFBSyxrQkFBTCxDQUF3QixPQUF4QixDQUFnQyxVQUFDLENBQUQsRUFBTTtBQUNwQyxvQkFBTSxJQUFOLENBQVcsRUFBRSxPQUFLLEtBQUwsQ0FBYixFQURvQzthQUFOLENBQWhDLENBRnVDO0FBS3ZDLG1CQUFPLEtBQVAsQ0FMdUM7V0FBTixDQS9XMUI7O0FBeVhULGVBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixnQkFBckIsR0FBd0MsWUFBTTtBQUM1QyxtQkFBSyxnQkFBTCxHQUF3QixJQUF4QixDQUQ0QztXQUFOLENBelgvQjs7QUE2WFQsZUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCLFNBQXJCLEdBQWlDLEtBQUssY0FBTCxDQTdYeEI7OztBQTVVQSx3QkFvdEJYLCtCQUFXO0FBQ1QsZUFBSyw0QkFBTCxHQURTO0FBRVQsZUFBSyw0QkFBTCxHQUZTO0FBR1QsZUFBSyx1QkFBTCxHQUhTOzs7ZUFwdEJBO21CQUNKLFNBQVMsQ0FBQyxPQUFELEVBQVUsZUFBVixFQUEyQixXQUEzQixFQUF3QyxTQUF4QyxFQUFtRCxnQkFBbkQsdUZBQ2Y7OztxRkFDQTs7O3dGQUNBIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
