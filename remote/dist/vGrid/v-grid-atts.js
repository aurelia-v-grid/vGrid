'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, _dec3, _dec4, _class3, _dec5, _dec6, _class5, _dec7, _dec8, _class7, _dec9, _dec10, _class9, _dec11, _dec12, _class11, _dec13, _dec14, _class13, _dec15, _dec16, _class15, _dec17, _dec18, _class17, _dec19, _dec20, _class19, _dec21, _dec22, _class21, _dec23, _dec24, _class23, _dec25, _dec26, _class25, _dec27, _dec28, _class27, _dec29, _dec30, _class28, _dec31, _dec32, _class29, _dec33, _dec34, _class30, VGridAttibutes, vGridRowHeight, vGridHeaderHeight, vGridFooterHeight, vGridIsResizableHeaders, vGridAttibutesObserve, vGridIsMultiSelect, vGridIsSortableHeader, vGridRequestAnimationFrame, vGridResizableHeadersAndRows, vGridRenderOnScrollbarScroll, vGridContextmenu, vGridLoadingThreshold, vGridRemoteIndex, vGridEventOnRowDraw, vGridEventOnRemoteCall, vGridHeaderFilterOn, vGridHeaderSortIcon;

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
      Optional = _aureliaFramework.Optional;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      VGridAttibutes = function () {
        function VGridAttibutes(element, vGrid) {
          _classCallCheck(this, VGridAttibutes);

          this.vGrid = vGrid;
          this.element = element;
          this.checkIfVgrid(vGrid);
        }

        VGridAttibutes.prototype.checkIfVgrid = function checkIfVgrid(vGrid) {
          if (this.vGrid === null || this.vGrid === undefined) {
            throw new Error('Invalid Element. Must use v-grid.');
          }
        };

        VGridAttibutes.prototype.setValue = function setValue(htmlAttributeValue, defaultValue) {
          var value = defaultValue;
          if (htmlAttributeValue !== undefined && htmlAttributeValue !== null && !isNaN(htmlAttributeValue)) {
            value = htmlAttributeValue;
          }
          return value;
        };

        VGridAttibutes.prototype.setBindValueInt = function setBindValueInt() {
          this.vGrid.vGridConfig[this.attribute] = this.setValue(parseInt(this.value), this.attDefault);
        };

        VGridAttibutes.prototype.setBindValueString = function setBindValueString() {
          if (typeof this.value === "string" && this.value !== '') {
            this.vGrid.vGridConfig[this.attribute] = this.value;
          }
        };

        VGridAttibutes.prototype.setBindValueBool = function setBindValueBool() {
          var type = {
            "true": true,
            "false": false
          };
          this.vGrid.vGridConfig[this.attribute] = this.setValue(type[this.value], this.attDefault);
        };

        VGridAttibutes.prototype.setBindValueArray = function setBindValueArray() {
          if (this.value !== undefined && this.value !== null) {
            var tempArray = this.value.split(",");
            this.vGrid.vGridConfig[this.attribute] = tempArray;
          }
        };

        VGridAttibutes.prototype.setBindValue = function setBindValue() {
          switch (this.type) {
            case "bool":
              this.setBindValueBool();
              break;
            case "string":
              this.setBindValueString();
              break;
            case "int":
              this.setBindValueInt();
              break;
            case "array":
              this.setBindValueArray();
              break;
            default:
              throw new Error('Attribute missing type.');
          }
        };

        VGridAttibutes.prototype.getDefaultvalue = function getDefaultvalue() {
          this.attDefault = this.vGrid.vGridConfig[this.attribute];
        };

        VGridAttibutes.prototype.bind = function bind(bindingContext, overrideContext) {
          this.getDefaultvalue();
          this.setBindValue();
        };

        return VGridAttibutes;
      }();

      _export('vGridRowHeight', vGridRowHeight = (_dec = customAttribute('v-row-height'), _dec2 = inject(Element, Optional.of(VGrid)), _dec(_class = _dec2(_class = function (_VGridAttibutes) {
        _inherits(vGridRowHeight, _VGridAttibutes);

        function vGridRowHeight() {
          var _temp, _this, _ret;

          _classCallCheck(this, vGridRowHeight);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _VGridAttibutes.call.apply(_VGridAttibutes, [this].concat(args))), _this), _this.attribute = "rowHeight", _this.type = "int", _temp), _possibleConstructorReturn(_this, _ret);
        }

        return vGridRowHeight;
      }(VGridAttibutes)) || _class) || _class));

      _export('vGridRowHeight', vGridRowHeight);

      _export('vGridHeaderHeight', vGridHeaderHeight = (_dec3 = customAttribute('v-header-height'), _dec4 = inject(Element, Optional.of(VGrid)), _dec3(_class3 = _dec4(_class3 = function (_VGridAttibutes2) {
        _inherits(vGridHeaderHeight, _VGridAttibutes2);

        function vGridHeaderHeight() {
          var _temp2, _this2, _ret2;

          _classCallCheck(this, vGridHeaderHeight);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _VGridAttibutes2.call.apply(_VGridAttibutes2, [this].concat(args))), _this2), _this2.attribute = "headerHeight", _this2.type = "int", _temp2), _possibleConstructorReturn(_this2, _ret2);
        }

        return vGridHeaderHeight;
      }(VGridAttibutes)) || _class3) || _class3));

      _export('vGridHeaderHeight', vGridHeaderHeight);

      _export('vGridFooterHeight', vGridFooterHeight = (_dec5 = customAttribute('v-footer-height'), _dec6 = inject(Element, Optional.of(VGrid)), _dec5(_class5 = _dec6(_class5 = function (_VGridAttibutes3) {
        _inherits(vGridFooterHeight, _VGridAttibutes3);

        function vGridFooterHeight() {
          var _temp3, _this3, _ret3;

          _classCallCheck(this, vGridFooterHeight);

          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, _VGridAttibutes3.call.apply(_VGridAttibutes3, [this].concat(args))), _this3), _this3.attribute = "footerHeight", _this3.type = "int", _temp3), _possibleConstructorReturn(_this3, _ret3);
        }

        return vGridFooterHeight;
      }(VGridAttibutes)) || _class5) || _class5));

      _export('vGridFooterHeight', vGridFooterHeight);

      _export('vGridIsResizableHeaders', vGridIsResizableHeaders = (_dec7 = customAttribute('v-resizable-headers'), _dec8 = inject(Element, Optional.of(VGrid)), _dec7(_class7 = _dec8(_class7 = function (_VGridAttibutes4) {
        _inherits(vGridIsResizableHeaders, _VGridAttibutes4);

        function vGridIsResizableHeaders() {
          var _temp4, _this4, _ret4;

          _classCallCheck(this, vGridIsResizableHeaders);

          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _ret4 = (_temp4 = (_this4 = _possibleConstructorReturn(this, _VGridAttibutes4.call.apply(_VGridAttibutes4, [this].concat(args))), _this4), _this4.attribute = "isResizableHeaders", _this4.type = "bool", _temp4), _possibleConstructorReturn(_this4, _ret4);
        }

        return vGridIsResizableHeaders;
      }(VGridAttibutes)) || _class7) || _class7));

      _export('vGridIsResizableHeaders', vGridIsResizableHeaders);

      _export('vGridAttibutesObserve', vGridAttibutesObserve = (_dec9 = customAttribute('v-attibutes-observe'), _dec10 = inject(Element, Optional.of(VGrid)), _dec9(_class9 = _dec10(_class9 = function (_VGridAttibutes5) {
        _inherits(vGridAttibutesObserve, _VGridAttibutes5);

        function vGridAttibutesObserve() {
          var _temp5, _this5, _ret5;

          _classCallCheck(this, vGridAttibutesObserve);

          for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          return _ret5 = (_temp5 = (_this5 = _possibleConstructorReturn(this, _VGridAttibutes5.call.apply(_VGridAttibutes5, [this].concat(args))), _this5), _this5.attribute = "attributeArray", _this5.type = "array", _temp5), _possibleConstructorReturn(_this5, _ret5);
        }

        return vGridAttibutesObserve;
      }(VGridAttibutes)) || _class9) || _class9));

      _export('vGridAttibutesObserve', vGridAttibutesObserve);

      _export('vGridIsMultiSelect', vGridIsMultiSelect = (_dec11 = customAttribute('v-multi-select'), _dec12 = inject(Element, Optional.of(VGrid)), _dec11(_class11 = _dec12(_class11 = function (_VGridAttibutes6) {
        _inherits(vGridIsMultiSelect, _VGridAttibutes6);

        function vGridIsMultiSelect() {
          var _temp6, _this6, _ret6;

          _classCallCheck(this, vGridIsMultiSelect);

          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          return _ret6 = (_temp6 = (_this6 = _possibleConstructorReturn(this, _VGridAttibutes6.call.apply(_VGridAttibutes6, [this].concat(args))), _this6), _this6.attribute = "isMultiSelect", _this6.type = "bool", _temp6), _possibleConstructorReturn(_this6, _ret6);
        }

        return vGridIsMultiSelect;
      }(VGridAttibutes)) || _class11) || _class11));

      _export('vGridIsMultiSelect', vGridIsMultiSelect);

      _export('vGridIsSortableHeader', vGridIsSortableHeader = (_dec13 = customAttribute('v-sortable-headers'), _dec14 = inject(Element, Optional.of(VGrid)), _dec13(_class13 = _dec14(_class13 = function (_VGridAttibutes7) {
        _inherits(vGridIsSortableHeader, _VGridAttibutes7);

        function vGridIsSortableHeader() {
          var _temp7, _this7, _ret7;

          _classCallCheck(this, vGridIsSortableHeader);

          for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }

          return _ret7 = (_temp7 = (_this7 = _possibleConstructorReturn(this, _VGridAttibutes7.call.apply(_VGridAttibutes7, [this].concat(args))), _this7), _this7.attribute = "isSortableHeader", _this7.type = "bool", _temp7), _possibleConstructorReturn(_this7, _ret7);
        }

        return vGridIsSortableHeader;
      }(VGridAttibutes)) || _class13) || _class13));

      _export('vGridIsSortableHeader', vGridIsSortableHeader);

      _export('vGridRequestAnimationFrame', vGridRequestAnimationFrame = (_dec15 = customAttribute('v-request-animation-frame'), _dec16 = inject(Element, Optional.of(VGrid)), _dec15(_class15 = _dec16(_class15 = function (_VGridAttibutes8) {
        _inherits(vGridRequestAnimationFrame, _VGridAttibutes8);

        function vGridRequestAnimationFrame() {
          var _temp8, _this8, _ret8;

          _classCallCheck(this, vGridRequestAnimationFrame);

          for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
          }

          return _ret8 = (_temp8 = (_this8 = _possibleConstructorReturn(this, _VGridAttibutes8.call.apply(_VGridAttibutes8, [this].concat(args))), _this8), _this8.attribute = "requestAnimationFrame", _this8.type = "bool", _temp8), _possibleConstructorReturn(_this8, _ret8);
        }

        return vGridRequestAnimationFrame;
      }(VGridAttibutes)) || _class15) || _class15));

      _export('vGridRequestAnimationFrame', vGridRequestAnimationFrame);

      _export('vGridResizableHeadersAndRows', vGridResizableHeadersAndRows = (_dec17 = customAttribute('v-resize-also-rows'), _dec18 = inject(Element, Optional.of(VGrid)), _dec17(_class17 = _dec18(_class17 = function (_VGridAttibutes9) {
        _inherits(vGridResizableHeadersAndRows, _VGridAttibutes9);

        function vGridResizableHeadersAndRows() {
          var _temp9, _this9, _ret9;

          _classCallCheck(this, vGridResizableHeadersAndRows);

          for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
          }

          return _ret9 = (_temp9 = (_this9 = _possibleConstructorReturn(this, _VGridAttibutes9.call.apply(_VGridAttibutes9, [this].concat(args))), _this9), _this9.attribute = "resizableHeadersAndRows", _this9.type = "bool", _temp9), _possibleConstructorReturn(_this9, _ret9);
        }

        return vGridResizableHeadersAndRows;
      }(VGridAttibutes)) || _class17) || _class17));

      _export('vGridResizableHeadersAndRows', vGridResizableHeadersAndRows);

      _export('vGridRenderOnScrollbarScroll', vGridRenderOnScrollbarScroll = (_dec19 = customAttribute('v-render-on-scrollbar-scroll'), _dec20 = inject(Element, Optional.of(VGrid)), _dec19(_class19 = _dec20(_class19 = function (_VGridAttibutes10) {
        _inherits(vGridRenderOnScrollbarScroll, _VGridAttibutes10);

        function vGridRenderOnScrollbarScroll() {
          var _temp10, _this10, _ret10;

          _classCallCheck(this, vGridRenderOnScrollbarScroll);

          for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
            args[_key10] = arguments[_key10];
          }

          return _ret10 = (_temp10 = (_this10 = _possibleConstructorReturn(this, _VGridAttibutes10.call.apply(_VGridAttibutes10, [this].concat(args))), _this10), _this10.attribute = "renderOnScrollbarScroll", _this10.type = "bool", _temp10), _possibleConstructorReturn(_this10, _ret10);
        }

        return vGridRenderOnScrollbarScroll;
      }(VGridAttibutes)) || _class19) || _class19));

      _export('vGridRenderOnScrollbarScroll', vGridRenderOnScrollbarScroll);

      _export('vGridContextmenu', vGridContextmenu = (_dec21 = customAttribute('v-contextmenu'), _dec22 = inject(Element, Optional.of(VGrid)), _dec21(_class21 = _dec22(_class21 = function (_VGridAttibutes11) {
        _inherits(vGridContextmenu, _VGridAttibutes11);

        function vGridContextmenu() {
          var _temp11, _this11, _ret11;

          _classCallCheck(this, vGridContextmenu);

          for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
            args[_key11] = arguments[_key11];
          }

          return _ret11 = (_temp11 = (_this11 = _possibleConstructorReturn(this, _VGridAttibutes11.call.apply(_VGridAttibutes11, [this].concat(args))), _this11), _this11.attribute = "contextmenu", _this11.type = "bool", _temp11), _possibleConstructorReturn(_this11, _ret11);
        }

        return vGridContextmenu;
      }(VGridAttibutes)) || _class21) || _class21));

      _export('vGridContextmenu', vGridContextmenu);

      _export('vGridLoadingThreshold', vGridLoadingThreshold = (_dec23 = customAttribute('v-loading-threshold'), _dec24 = inject(Element, Optional.of(VGrid)), _dec23(_class23 = _dec24(_class23 = function (_VGridAttibutes12) {
        _inherits(vGridLoadingThreshold, _VGridAttibutes12);

        function vGridLoadingThreshold() {
          var _temp12, _this12, _ret12;

          _classCallCheck(this, vGridLoadingThreshold);

          for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
            args[_key12] = arguments[_key12];
          }

          return _ret12 = (_temp12 = (_this12 = _possibleConstructorReturn(this, _VGridAttibutes12.call.apply(_VGridAttibutes12, [this].concat(args))), _this12), _this12.attribute = "loadingThreshold", _this12.type = "int", _temp12), _possibleConstructorReturn(_this12, _ret12);
        }

        return vGridLoadingThreshold;
      }(VGridAttibutes)) || _class23) || _class23));

      _export('vGridLoadingThreshold', vGridLoadingThreshold);

      _export('vGridRemoteIndex', vGridRemoteIndex = (_dec25 = customAttribute('v-remote-index'), _dec26 = inject(Element, Optional.of(VGrid)), _dec25(_class25 = _dec26(_class25 = function (_VGridAttibutes13) {
        _inherits(vGridRemoteIndex, _VGridAttibutes13);

        function vGridRemoteIndex() {
          var _temp13, _this13, _ret13;

          _classCallCheck(this, vGridRemoteIndex);

          for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
            args[_key13] = arguments[_key13];
          }

          return _ret13 = (_temp13 = (_this13 = _possibleConstructorReturn(this, _VGridAttibutes13.call.apply(_VGridAttibutes13, [this].concat(args))), _this13), _this13.attribute = "remoteIndex", _this13.type = "string", _temp13), _possibleConstructorReturn(_this13, _ret13);
        }

        return vGridRemoteIndex;
      }(VGridAttibutes)) || _class25) || _class25));

      _export('vGridRemoteIndex', vGridRemoteIndex);

      _export('vGridEventOnRowDraw', vGridEventOnRowDraw = (_dec27 = customAttribute('v-row-on-draw'), _dec28 = inject(Optional.of(VGrid)), _dec27(_class27 = _dec28(_class27 = function () {
        function vGridEventOnRowDraw(vGrid) {
          _classCallCheck(this, vGridEventOnRowDraw);

          this.vGrid = vGrid;
        }

        vGridEventOnRowDraw.prototype.bind = function bind() {
          if (typeof this.value === "function") {
            this.vGrid.vGridConfig.eventOnRowDraw = this.value;
          }
        };

        return vGridEventOnRowDraw;
      }()) || _class27) || _class27));

      _export('vGridEventOnRowDraw', vGridEventOnRowDraw);

      _export('vGridEventOnRemoteCall', vGridEventOnRemoteCall = (_dec29 = customAttribute('v-event-onremote'), _dec30 = inject(Optional.of(VGrid)), _dec29(_class28 = _dec30(_class28 = function () {
        function vGridEventOnRemoteCall(vGrid) {
          _classCallCheck(this, vGridEventOnRemoteCall);

          this.vGrid = vGrid;
        }

        vGridEventOnRemoteCall.prototype.bind = function bind() {
          if (typeof this.value === "function") {
            this.vGrid.vGridConfig.eventOnRemoteCall = this.value;
          }
        };

        return vGridEventOnRemoteCall;
      }()) || _class28) || _class28));

      _export('vGridEventOnRemoteCall', vGridEventOnRemoteCall);

      _export('vGridHeaderFilterOn', vGridHeaderFilterOn = (_dec31 = customAttribute('v-filter'), _dec32 = inject(Element, VGrid), _dec31(_class29 = _dec32(_class29 = function () {
        function vGridHeaderFilterOn(element, vGrid) {
          _classCallCheck(this, vGridHeaderFilterOn);

          this.vGrid = vGrid;
          this.element = element;
        }

        vGridHeaderFilterOn.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;
          var values = this.value.split("|");
          this.attribute = values[0];
          this.filterOn = values[1];
          this.filterOperator = values[2];
        };

        vGridHeaderFilterOn.prototype.updateFilter = function updateFilter(curFilter) {
          var _this14 = this;

          var filterIndex;

          curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this14.attribute) {
              filterIndex = index;
            }
          });

          if (filterIndex) {
            if (this.element.value === "") {
              curFilter.splice(filterIndex, 1);
            } else {
              curFilter[filterIndex].value = this.element.value;
            }
          } else {
            if (this.element.value !== "") {
              curFilter.push({
                attribute: this.attribute,
                operator: this.filterOperator,
                value: this.element.value
              });
            }
          }
        };

        vGridHeaderFilterOn.prototype.attached = function attached() {
          var _this15 = this;

          if (this.filterOn === "enter") {
            this.element.onkeydown = function (e) {
              if (e.keyCode === 13) {
                var curFilter = _this15.vGrid.vGridFilter.lastFilter;
                _this15.updateFilter(curFilter);
                _this15.vGrid.vGridConfig.onFilterRun(curFilter);
              } else {
                var curFilter = _this15.vGrid.vGridFilter.lastFilter;
                _this15.updateFilter(curFilter);
              }
            };
          }

          if (this.filterOn === "keyDown") {}
        };

        return vGridHeaderFilterOn;
      }()) || _class29) || _class29));

      _export('vGridHeaderFilterOn', vGridHeaderFilterOn);

      _export('vGridHeaderSortIcon', vGridHeaderSortIcon = (_dec33 = customAttribute('v-sort'), _dec34 = inject(Element, VGrid), _dec33(_class30 = _dec34(_class30 = function () {
        function vGridHeaderSortIcon(element, vGrid) {
          _classCallCheck(this, vGridHeaderSortIcon);

          this.vGrid = vGrid;
          this.element = element;
        }

        vGridHeaderSortIcon.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;
          var values = this.value.split("|");
          this.attribute = values[0];
          this.icon = values[1] ? true : false;
          this.filterOperator = values[2];
        };

        vGridHeaderSortIcon.prototype.attached = function attached() {
          var _this16 = this;

          this.sortIcon = document.createElement("SPAN");
          this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
          this.element.appendChild(this.sortIcon);
          this.element.onclick = function (e) {
            _this16.vGrid.vGridConfig.onOrderBy(_this16.attribute, e.shiftKey);
          };

          this.vGrid.element.addEventListener("sortIconUpdate", function (e) {
            _this16.sortIcon.innerHTML = _this16.getSortIconMarkup(_this16.attribute);
          });
        };

        vGridHeaderSortIcon.prototype.getSortIconMarkup = function getSortIconMarkup(attribute) {
          var _this17 = this;

          var css = this.vGrid.vGridConfig.css;
          var lineHeigthStyleTag = "100%";
          var isAscHtml = '<span ' + lineHeigthStyleTag + ' class="' + css.sortIcon + ' ' + css.sortIconAsc + '"></span>';
          var isDescHtml = '<span ' + lineHeigthStyleTag + ' class="' + css.sortIcon + ' ' + css.sortIconDesc + '"></span>';
          var markup = '<span ' + lineHeigthStyleTag + ' class="' + css.sortIcon + ' ' + css.sortIconSort + '"></span>';

          if (this.vGrid.vGridSort.getFilter().length !== 0) {
            this.vGrid.vGridSort.getFilter().forEach(function (x) {
              if (x.attribute === _this17.attribute) {
                var block = x.asc === true ? isAscHtml : isDescHtml;
                var main = '<span ' + lineHeigthStyleTag + ' class="' + css.sortIcon + ' ' + css.sortIconNo + x.no + '"></span>';
                markup = main + block;
              }
            });
          }

          return markup;
        };

        return vGridHeaderSortIcon;
      }()) || _class30) || _class30));

      _export('vGridHeaderSortIcon', vGridHeaderSortIcon);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
