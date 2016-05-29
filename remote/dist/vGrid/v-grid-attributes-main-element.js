'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, _dec3, _dec4, _class3, _dec5, _dec6, _class5, _dec7, _dec8, _class7, _dec9, _dec10, _class9, _dec11, _dec12, _class11, _dec13, _dec14, _class13, _dec15, _dec16, _class15, _dec17, _dec18, _class17, _dec19, _dec20, _class19, _dec21, _dec22, _class21, _dec23, _dec24, _class23, _dec25, _dec26, _class25, _dec27, _dec28, _class27, _dec29, _dec30, _class28, VGridAttibutes, vGridRowHeight, vGridHeaderHeight, vGridFooterHeight, vGridIsResizableHeaders, vGridAttibutesObserve, vGridIsMultiSelect, vGridIsSortableHeader, vGridRequestAnimationFrame, vGridResizableHeadersAndRows, vGridRenderOnScrollbarScroll, vGridContextmenu, vGridLoadingThreshold, vGridRemoteIndex, vGridEventOnRowDraw, vGridEventOnRemoteCall;

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
          if (typeof this.value === "string" && this.value !== '' && this.value !== undefined && this.value !== null) {
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
            tempArray.forEach(function (prop) {
              prop = prop.trim();
            });
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
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLW1haW4tZWxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLUSxZLHFCQUFBLE07QUFBUSxxQixxQkFBQSxlO0FBQWlCLGMscUJBQUEsUTs7QUFJekIsVyxVQUFBLEs7OztBQUdKLG9CO0FBRUYsZ0NBQVksT0FBWixFQUFxQixLQUFyQixFQUE0QjtBQUFBOztBQUMxQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGVBQUssWUFBTCxDQUFrQixLQUFsQjtBQUNEOztpQ0FHRCxZLHlCQUFhLEssRUFBTztBQUNsQixjQUFJLEtBQUssS0FBTCxLQUFlLElBQWYsSUFBdUIsS0FBSyxLQUFMLEtBQWUsU0FBMUMsRUFBcUQ7QUFDbkQsa0JBQU0sSUFBSSxLQUFKLENBQVUsbUNBQVYsQ0FBTjtBQUNEO0FBQ0YsUzs7aUNBR0QsUSxxQkFBUyxrQixFQUFvQixZLEVBQWM7QUFDekMsY0FBSSxRQUFRLFlBQVo7QUFDQSxjQUFJLHVCQUF1QixTQUF2QixJQUFvQyx1QkFBdUIsSUFBM0QsSUFBbUUsQ0FBQyxNQUFNLGtCQUFOLENBQXhFLEVBQW1HO0FBQ2pHLG9CQUFRLGtCQUFSO0FBQ0Q7QUFDRCxpQkFBTyxLQUFQO0FBQ0QsUzs7aUNBR0QsZSw4QkFBa0I7QUFDaEIsZUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixLQUFLLFNBQTVCLElBQXlDLEtBQUssUUFBTCxDQUFjLFNBQVMsS0FBSyxLQUFkLENBQWQsRUFBb0MsS0FBSyxVQUF6QyxDQUF6QztBQUNELFM7O2lDQUdELGtCLGlDQUFxQjtBQUNuQixjQUFJLE9BQU8sS0FBSyxLQUFaLEtBQXVCLFFBQXZCLElBQW1DLEtBQUssS0FBTCxLQUFlLEVBQWxELElBQXdELEtBQUssS0FBTCxLQUFlLFNBQXZFLElBQW9GLEtBQUssS0FBTCxLQUFlLElBQXZH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RlosZ0JBQWdCLGVBQWhCLEMsV0FDQSxPQUFPLFNBQVMsRUFBVCxDQUFZLEtBQVosQ0FBUCxDO0FBR0MscUNBQVksS0FBWixFQUFtQjtBQUFBOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O3NDQUVELEksbUJBQU87QUFDTCxjQUFJLE9BQU8sS0FBSyxLQUFaLEtBQXVCLFVBQTNCLEVBQXVDO0FBQ3JDLGlCQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGNBQXZCLEdBQXdDLEtBQUssS0FBN0M7QUFDRDtBQUNGLFM7Ozs7Ozs7d0NBT1Usc0IsYUFGWixnQkFBZ0Isa0JBQWhCLEMsV0FDQSxPQUFPLFNBQVMsRUFBVCxDQUFZLEtBQVosQ0FBUCxDO0FBR0Msd0NBQVksS0FBWixFQUFtQjtBQUFBOztBQUNqQixlQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7O3lDQUdELEksbUJBQU87QUFDTCxjQUFJLE9BQU8sS0FBSyxLQUFaLEtBQXVCLFVBQTNCLEVBQXVDO0FBQ3JDLGlCQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGlCQUF2QixHQUEyQyxLQUFLLEtBQWhEO0FBQ0Q7QUFDRixTIiwiZmlsZSI6InZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLW1haW4tZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
