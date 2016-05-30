/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridCellRowHeader = undefined;

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

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor;

  var VGridCellRowHeader = exports.VGridCellRowHeader = (_dec = (0, _aureliaFramework.customElement)('v-grid-header-col'), _dec2 = (0, _aureliaFramework.processContent)(false), _dec3 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid, _aureliaFramework.Container), (0, _aureliaFramework.noView)(_class = _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
    function VGridCellRowHeader(element, vGrid, container) {
      _classCallCheck(this, VGridCellRowHeader);

      _initDefineProp(this, 'columnNo', _descriptor, this);

      this.element = element;
      this.vGrid = vGrid;
      this.container = container;
      this.vGridConfig = vGrid.vGridConfig;
      this.queryString = null;
    }

    VGridCellRowHeader.prototype.bind = function bind(bindingContext) {
      this.bindingContext = bindingContext;
    };

    VGridCellRowHeader.prototype.created = function created() {};

    VGridCellRowHeader.prototype.attached = function attached() {
      this.setStandardClassesAndStyles();

      this.addFilter = this.vGridConfig.addFilter;
      this.header = this.vGridConfig.headerArray[this.columnNo];
      this.filter = this.vGridConfig.filterArray[this.columnNo];
      this.filterTop = this.vGridConfig.filterOnAtTop;
      this.justLabel = this.vGridConfig.doNotAddFilterTo.indexOf(this.attribute());
      this.filterName = this.vGridConfig.getFilterName(this.filter);
      this.colType = this.vGrid.vGridConfig.colTypeArray[this.columnNo];
      var value = this.vGrid.vGridFilter.queryStrings[this.attribute()];
      if (value) {
        this.queryString = value;
      }

      var sortIcon = this.getSortIconMarkup(this.attribute());

      var type = "single";
      if (this.addFilter) {
        type = "filterTop";
        if (!this.filterTop) {
          type = "filterBottom";
          if (this.justLabel !== -1) {
            type = "noFilterBottom";
          }
        } else {
          if (this.justLabel !== -1) {
            type = "noFilterTop";
          }
        }
      }

      if (this.colType === "selection") {
        type = "selection";
      }

      if (this.colType === "custom") {
        if (!this.vGrid.viewCompiler.resources.elements['v-grid-filter-' + this.colCustomName()]) {
          this.colType = "text";
        }
      }

      this.type = type;
      switch (type) {

        case "selection":
          var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-filter-' + this.colType + '></v-grid-filter-' + this.colType + '>\n          </template>\n          ', this.vGrid.resources);
          break;

        case "selection":
          var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n            <v-grid-filter-' + this.colType + '></v-grid-filter-' + this.colType + '>\n          </template>\n          ', this.vGrid.resources);
          break;

        case "single":
          var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-label type="single">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
          break;

        case "filterTop":
          var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-filter-' + this.colType + ' filter-value.two-way="queryString" type="filterTop">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-' + this.colType + '>\n\n            <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
          break;

        case "filterBottom":
          var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-label type="labelTop">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n             <v-grid-filter-' + this.colType + ' filter-value.two-way="queryString" type="filterBottom">\n              <input placeholder="' + this.filterName + '">\n            </v-grid-filter-' + this.colType + '>\n\n          </template>\n          ', this.vGrid.resources);
          break;

        case "noFilterTop":
          var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n            <v-grid-label type="blankLabel">\n              <div></div>\n            </v-grid-label>\n\n             <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
          break;

        case "noFilterBottom":
          var viewFactory = this.vGrid.viewCompiler.compile('\n          <template>\n\n             <v-grid-label type="labelBottom">\n              <div>' + this.header + sortIcon + '</div>\n            </v-grid-label>\n\n            <v-grid-label type="blankLabel">\n              <div></div>\n            </v-grid-label>\n\n          </template>\n          ', this.vGrid.resources);
          break;

        default:
          break;
      }

      var view = viewFactory.create(this.container);
      this.viewSlot = new _aureliaFramework.ViewSlot(this.element, true);
      this.viewSlot.add(view);
      this.viewSlot.bind(this);
      this.viewSlot.attached();
    };

    VGridCellRowHeader.prototype.attribute = function attribute() {
      return this.vGridConfig.attributeArray[this.columnNo];
    };

    VGridCellRowHeader.prototype.getValue = function getValue(value) {
      return this.valueFormater ? this.valueFormater().fromView(value) : value;
    };

    VGridCellRowHeader.prototype.setValue = function setValue(value) {
      return this.valueFormater ? this.valueFormater().toView(value) : value;
    };

    VGridCellRowHeader.prototype.valueFormater = function valueFormater() {
      return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
    };

    VGridCellRowHeader.prototype.colCustomName = function colCustomName() {
      return this.vGrid.vGridConfig.colCustomArray[this.columnNo];
    };

    VGridCellRowHeader.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
      this.element.classList.add(this.vGridConfig.css.rowHeaderCell);
      this.element.classList.add(this.vGridConfig.css.rowHeaderColumn + this.columnNo);
      this.element.classList.add(this.vGridConfig.css.gridColumn + this.columnNo);
      this.element.style.height = '100%';
      this.element.style.width = this.vGridConfig.columnWidthArray[this.columnNo] + 'px';
    };

    VGridCellRowHeader.prototype.getSortIconMarkup = function getSortIconMarkup(attribute) {
      var _this = this;

      var markup = "";
      var rows = 1;

      if (this.vGridConfig.addFilter) {
        rows = 2;
      }
      var lineHeigthStyleTag = 'style=line-height:' + this.vGridConfig.headerHeight / rows + 'px;"';
      var isAscHtml = '<span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconAsc + '"></span>';
      var isDescHtml = '<span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconDesc + '"></span>';

      if (this.vGridConfig.sortNotOnHeader.indexOf(attribute) === -1) {
        markup = '<span ' + lineHeigthStyleTag + ' class="' + this.vGridConfig.css.sortIcon + ' ' + this.vGridConfig.css.sortIconSort + '"></span>';
        if (this.vGridConfig.sortOnHeaderClick) {
          if (this.vGrid.vGridSort.getFilter().length !== 0) {
            this.vGrid.vGridSort.getFilter().forEach(function (x) {
              if (x.attribute === attribute) {
                var block = x.asc === true ? isAscHtml : isDescHtml;
                var main = '<span ' + lineHeigthStyleTag + ' class="' + _this.vGridConfig.css.sortIcon + ' ' + _this.vGridConfig.css.sortIconNo + x.no + '"></span>';
                markup = main + block;
              }
            });
          }
        } else {
          markup = "";
        }
      }
      return markup;
    };

    VGridCellRowHeader.prototype.onChangeEventOnFilter = function onChangeEventOnFilter(e) {

      if (e.keyCode !== 9 && e.keyCode !== 39 && e.keyCode !== 37) {
        var queryInputs = this.vGrid.element.querySelectorAll("." + this.vGridConfig.css.filterHandle);

        var queryParams = [];

        for (var i = 0; i < queryInputs.length; i++) {
          var dataSourceAttribute = queryInputs[i].getAttribute(this.vGridConfig.atts.dataAttribute);
          var valueFormater = this.vGridConfig.colFormaterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
          var operator = this.vGridConfig.filterArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
          var coltype = this.vGridConfig.colTypeArray[this.vGridConfig.attributeArray.indexOf(dataSourceAttribute)];
          var value = valueFormater ? valueFormater.fromView(queryInputs[i].value) : queryInputs[i].value;

          if (coltype === "checkbox" && value !== "true" && value !== "false") {
            value = "";
          }

          if (value !== "" && value !== undefined) {
            queryParams.push({
              attribute: dataSourceAttribute,
              value: value,
              operator: operator
            });

            this.vGrid.vGridFilter.queryStrings[dataSourceAttribute] = queryInputs[i].value;
          } else {
            if (value === "") {
              this.vGrid.vGridFilter.queryStrings[dataSourceAttribute] = queryInputs[i].value;
            }
          }
        }
        this.vGridConfig.onFilterRun(queryParams);
      }
    };

    return VGridCellRowHeader;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class) || _class);
});