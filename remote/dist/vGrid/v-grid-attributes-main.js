'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, Optional, VGrid, _dec, _dec2, _class, _dec3, _dec4, _class3, _dec5, _dec6, _class5, _dec7, _dec8, _class7, _dec9, _dec10, _class9, _dec11, _dec12, _class11, _dec13, _dec14, _class13, _dec15, _dec16, _class15, _dec17, _dec18, _class17, _dec19, _dec20, _class19, _dec21, _dec22, _class20, _dec23, _dec24, _class21, VGridAttibutesMain, vGridRowHeight, vGridHeaderHeight, vGridFooterHeight, vGridIsResizableHeaders, vGridAttibutesObserve, vGridIsMultiSelect, vGridManualSelection, vGridIsSortableHeader, vGridLoadingThreshold, vGridRemoteIndex, vGridEventOnRowDraw, vGridEventOnRemoteCall;

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
      VGridAttibutesMain = function () {
        function VGridAttibutesMain(element, vGrid) {
          _classCallCheck(this, VGridAttibutesMain);

          this.vGrid = vGrid;
          this.element = element;
          this.checkIfVgrid(vGrid);
        }

        VGridAttibutesMain.prototype.checkIfVgrid = function checkIfVgrid(vGrid) {
          if (this.vGrid === null || this.vGrid === undefined) {
            throw new Error('Invalid Element. Must use v-grid.');
          }
        };

        VGridAttibutesMain.prototype.setValue = function setValue(htmlAttributeValue, defaultValue) {
          var value = defaultValue;
          if (htmlAttributeValue !== undefined && htmlAttributeValue !== null && !isNaN(htmlAttributeValue)) {
            value = htmlAttributeValue;
          }
          return value;
        };

        VGridAttibutesMain.prototype.setBindValueInt = function setBindValueInt() {
          this.vGrid.vGridConfig[this.attribute] = this.setValue(parseInt(this.value), this.attDefault);
        };

        VGridAttibutesMain.prototype.setBindValueString = function setBindValueString() {
          if (typeof this.value === "string" && this.value !== '' && this.value !== undefined && this.value !== null) {
            this.vGrid.vGridConfig[this.attribute] = this.value;
          }
        };

        VGridAttibutesMain.prototype.setBindValueBool = function setBindValueBool() {
          var type = {
            "true": true,
            "false": false
          };
          this.vGrid.vGridConfig[this.attribute] = this.setValue(type[this.value], this.attDefault);
        };

        VGridAttibutesMain.prototype.setBindValueArray = function setBindValueArray() {
          if (this.value !== undefined && this.value !== null) {
            var tempArray = this.value.split(",");
            tempArray.forEach(function (prop) {
              prop = prop.trim();
            });
            this.vGrid.vGridConfig[this.attribute] = tempArray;
          }
        };

        VGridAttibutesMain.prototype.setBindValue = function setBindValue() {
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

        VGridAttibutesMain.prototype.getDefaultvalue = function getDefaultvalue() {
          this.attDefault = this.vGrid.vGridConfig[this.attribute];
        };

        VGridAttibutesMain.prototype.bind = function bind(bindingContext, overrideContext) {
          this.getDefaultvalue();
          this.setBindValue();
        };

        return VGridAttibutesMain;
      }();

      _export('vGridRowHeight', vGridRowHeight = (_dec = customAttribute('v-row-height'), _dec2 = inject(Element, Optional.of(VGrid)), _dec(_class = _dec2(_class = function (_VGridAttibutesMain) {
        _inherits(vGridRowHeight, _VGridAttibutesMain);

        function vGridRowHeight() {
          var _temp, _this, _ret;

          _classCallCheck(this, vGridRowHeight);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _VGridAttibutesMain.call.apply(_VGridAttibutesMain, [this].concat(args))), _this), _this.attribute = "rowHeight", _this.type = "int", _temp), _possibleConstructorReturn(_this, _ret);
        }

        return vGridRowHeight;
      }(VGridAttibutesMain)) || _class) || _class));

      _export('vGridRowHeight', vGridRowHeight);

      _export('vGridHeaderHeight', vGridHeaderHeight = (_dec3 = customAttribute('v-header-height'), _dec4 = inject(Element, Optional.of(VGrid)), _dec3(_class3 = _dec4(_class3 = function (_VGridAttibutesMain2) {
        _inherits(vGridHeaderHeight, _VGridAttibutesMain2);

        function vGridHeaderHeight() {
          var _temp2, _this2, _ret2;

          _classCallCheck(this, vGridHeaderHeight);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _VGridAttibutesMain2.call.apply(_VGridAttibutesMain2, [this].concat(args))), _this2), _this2.attribute = "headerHeight", _this2.type = "int", _temp2), _possibleConstructorReturn(_this2, _ret2);
        }

        return vGridHeaderHeight;
      }(VGridAttibutesMain)) || _class3) || _class3));

      _export('vGridHeaderHeight', vGridHeaderHeight);

      _export('vGridFooterHeight', vGridFooterHeight = (_dec5 = customAttribute('v-footer-height'), _dec6 = inject(Element, Optional.of(VGrid)), _dec5(_class5 = _dec6(_class5 = function (_VGridAttibutesMain3) {
        _inherits(vGridFooterHeight, _VGridAttibutesMain3);

        function vGridFooterHeight() {
          var _temp3, _this3, _ret3;

          _classCallCheck(this, vGridFooterHeight);

          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, _VGridAttibutesMain3.call.apply(_VGridAttibutesMain3, [this].concat(args))), _this3), _this3.attribute = "footerHeight", _this3.type = "int", _temp3), _possibleConstructorReturn(_this3, _ret3);
        }

        return vGridFooterHeight;
      }(VGridAttibutesMain)) || _class5) || _class5));

      _export('vGridFooterHeight', vGridFooterHeight);

      _export('vGridIsResizableHeaders', vGridIsResizableHeaders = (_dec7 = customAttribute('v-resizable-headers'), _dec8 = inject(Element, Optional.of(VGrid)), _dec7(_class7 = _dec8(_class7 = function (_VGridAttibutesMain4) {
        _inherits(vGridIsResizableHeaders, _VGridAttibutesMain4);

        function vGridIsResizableHeaders() {
          var _temp4, _this4, _ret4;

          _classCallCheck(this, vGridIsResizableHeaders);

          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _ret4 = (_temp4 = (_this4 = _possibleConstructorReturn(this, _VGridAttibutesMain4.call.apply(_VGridAttibutesMain4, [this].concat(args))), _this4), _this4.attribute = "isResizableHeaders", _this4.type = "bool", _temp4), _possibleConstructorReturn(_this4, _ret4);
        }

        return vGridIsResizableHeaders;
      }(VGridAttibutesMain)) || _class7) || _class7));

      _export('vGridIsResizableHeaders', vGridIsResizableHeaders);

      _export('vGridAttibutesObserve', vGridAttibutesObserve = (_dec9 = customAttribute('v-attibutes-observe'), _dec10 = inject(Element, Optional.of(VGrid)), _dec9(_class9 = _dec10(_class9 = function (_VGridAttibutesMain5) {
        _inherits(vGridAttibutesObserve, _VGridAttibutesMain5);

        function vGridAttibutesObserve() {
          var _temp5, _this5, _ret5;

          _classCallCheck(this, vGridAttibutesObserve);

          for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          return _ret5 = (_temp5 = (_this5 = _possibleConstructorReturn(this, _VGridAttibutesMain5.call.apply(_VGridAttibutesMain5, [this].concat(args))), _this5), _this5.attribute = "attributeObserve", _this5.type = "array", _temp5), _possibleConstructorReturn(_this5, _ret5);
        }

        return vGridAttibutesObserve;
      }(VGridAttibutesMain)) || _class9) || _class9));

      _export('vGridAttibutesObserve', vGridAttibutesObserve);

      _export('vGridIsMultiSelect', vGridIsMultiSelect = (_dec11 = customAttribute('v-multi-select'), _dec12 = inject(Element, Optional.of(VGrid)), _dec11(_class11 = _dec12(_class11 = function (_VGridAttibutesMain6) {
        _inherits(vGridIsMultiSelect, _VGridAttibutesMain6);

        function vGridIsMultiSelect() {
          var _temp6, _this6, _ret6;

          _classCallCheck(this, vGridIsMultiSelect);

          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          return _ret6 = (_temp6 = (_this6 = _possibleConstructorReturn(this, _VGridAttibutesMain6.call.apply(_VGridAttibutesMain6, [this].concat(args))), _this6), _this6.attribute = "isMultiSelect", _this6.type = "bool", _temp6), _possibleConstructorReturn(_this6, _ret6);
        }

        return vGridIsMultiSelect;
      }(VGridAttibutesMain)) || _class11) || _class11));

      _export('vGridIsMultiSelect', vGridIsMultiSelect);

      _export('vGridManualSelection', vGridManualSelection = (_dec13 = customAttribute('v-manual-sel'), _dec14 = inject(Element, Optional.of(VGrid)), _dec13(_class13 = _dec14(_class13 = function (_VGridAttibutesMain7) {
        _inherits(vGridManualSelection, _VGridAttibutesMain7);

        function vGridManualSelection() {
          var _temp7, _this7, _ret7;

          _classCallCheck(this, vGridManualSelection);

          for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }

          return _ret7 = (_temp7 = (_this7 = _possibleConstructorReturn(this, _VGridAttibutesMain7.call.apply(_VGridAttibutesMain7, [this].concat(args))), _this7), _this7.attribute = "manualSelection", _this7.type = "bool", _temp7), _possibleConstructorReturn(_this7, _ret7);
        }

        return vGridManualSelection;
      }(VGridAttibutesMain)) || _class13) || _class13));

      _export('vGridManualSelection', vGridManualSelection);

      _export('vGridIsSortableHeader', vGridIsSortableHeader = (_dec15 = customAttribute('v-sortable-headers'), _dec16 = inject(Element, Optional.of(VGrid)), _dec15(_class15 = _dec16(_class15 = function (_VGridAttibutesMain8) {
        _inherits(vGridIsSortableHeader, _VGridAttibutesMain8);

        function vGridIsSortableHeader() {
          var _temp8, _this8, _ret8;

          _classCallCheck(this, vGridIsSortableHeader);

          for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
          }

          return _ret8 = (_temp8 = (_this8 = _possibleConstructorReturn(this, _VGridAttibutesMain8.call.apply(_VGridAttibutesMain8, [this].concat(args))), _this8), _this8.attribute = "isSortableHeader", _this8.type = "bool", _temp8), _possibleConstructorReturn(_this8, _ret8);
        }

        return vGridIsSortableHeader;
      }(VGridAttibutesMain)) || _class15) || _class15));

      _export('vGridIsSortableHeader', vGridIsSortableHeader);

      _export('vGridLoadingThreshold', vGridLoadingThreshold = (_dec17 = customAttribute('v-loading-threshold'), _dec18 = inject(Element, Optional.of(VGrid)), _dec17(_class17 = _dec18(_class17 = function (_VGridAttibutesMain9) {
        _inherits(vGridLoadingThreshold, _VGridAttibutesMain9);

        function vGridLoadingThreshold() {
          var _temp9, _this9, _ret9;

          _classCallCheck(this, vGridLoadingThreshold);

          for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
          }

          return _ret9 = (_temp9 = (_this9 = _possibleConstructorReturn(this, _VGridAttibutesMain9.call.apply(_VGridAttibutesMain9, [this].concat(args))), _this9), _this9.attribute = "loadingThreshold", _this9.type = "int", _temp9), _possibleConstructorReturn(_this9, _ret9);
        }

        return vGridLoadingThreshold;
      }(VGridAttibutesMain)) || _class17) || _class17));

      _export('vGridLoadingThreshold', vGridLoadingThreshold);

      _export('vGridRemoteIndex', vGridRemoteIndex = (_dec19 = customAttribute('v-remote-index'), _dec20 = inject(Optional.of(VGrid)), _dec19(_class19 = _dec20(_class19 = function () {
        function vGridRemoteIndex(vGrid) {
          _classCallCheck(this, vGridRemoteIndex);

          this.vGrid = vGrid;
        }

        vGridRemoteIndex.prototype.bind = function bind() {
          if (this.value !== "") {
            this.vGrid.vGridConfig.isRemoteIndex = true;
            this.vGrid.vGridRowKey = this.value;
          }
        };

        return vGridRemoteIndex;
      }()) || _class19) || _class19));

      _export('vGridRemoteIndex', vGridRemoteIndex);

      _export('vGridEventOnRowDraw', vGridEventOnRowDraw = (_dec21 = customAttribute('v-row-on-draw'), _dec22 = inject(Optional.of(VGrid)), _dec21(_class20 = _dec22(_class20 = function () {
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
      }()) || _class20) || _class20));

      _export('vGridEventOnRowDraw', vGridEventOnRowDraw);

      _export('vGridEventOnRemoteCall', vGridEventOnRemoteCall = (_dec23 = customAttribute('v-event-onremote'), _dec24 = inject(Optional.of(VGrid)), _dec23(_class21 = _dec24(_class21 = function () {
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
      }()) || _class21) || _class21));

      _export('vGridEventOnRemoteCall', vGridEventOnRemoteCall);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLW1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1EsWSxxQkFBQSxNO0FBQVEscUIscUJBQUEsZTtBQUFpQixjLHFCQUFBLFE7O0FBSXpCLFcsVUFBQSxLOzs7QUFHSix3QjtBQUVGLG9DQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7QUFBQTs7QUFDMUIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGVBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFLLFlBQUwsQ0FBa0IsS0FBbEI7QUFDRDs7cUNBR0QsWSx5QkFBYSxLLEVBQU87QUFDbEIsY0FBSSxLQUFLLEtBQUwsS0FBZSxJQUFmLElBQXVCLEtBQUssS0FBTCxLQUFlLFNBQTFDLEVBQXFEO0FBQ25ELGtCQUFNLElBQUksS0FBSixDQUFVLG1DQUFWLENBQU47QUFDRDtBQUNGLFM7O3FDQUdELFEscUJBQVMsa0IsRUFBb0IsWSxFQUFjO0FBQ3pDLGNBQUksUUFBUSxZQUFaO0FBQ0EsY0FBSSx1QkFBdUIsU0FBdkIsSUFBb0MsdUJBQXVCLElBQTNELElBQW1FLENBQUMsTUFBTSxrQkFBTixDQUF4RSxFQUFtRztBQUNqRyxvQkFBUSxrQkFBUjtBQUNEO0FBQ0QsaUJBQU8sS0FBUDtBQUNELFM7O3FDQUdELGUsOEJBQWtCO0FBQ2hCLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxTQUE1QixJQUF5QyxLQUFLLFFBQUwsQ0FBYyxTQUFTLEtBQUssS0FBZCxDQUFkLEVBQW9DLEtBQUssVUFBekMsQ0FBekM7QUFDRCxTOztxQ0FHRCxrQixpQ0FBcUI7QUFDbkIsY0FBSSxPQUFPLEtBQUssS0FBWixLQUF1QixRQUF2QixJQUFtQyxLQUFLLEtBQUwsS0FBZSxFQUFsRCxJQUF3RCxLQUFLLEtBQUwsS0FBZSxTQUF2RSxJQUFvRixLQUFLLEtBQUwsS0FBZSxJQUF2RyxFQUE2RztB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RUFBVCxDQUFZLEtBQVosQ0FBaEIsQzs7Ozs7Ozs7Ozs7OzJLQUVDLFMsR0FBWSxpQixTQUNaLEksR0FBTyxNOzs7O1FBRmlDLGtCOzs7O3VDQVE3QixxQixhQUZaLGdCQUFnQixvQkFBaEIsQyxXQUNBLE9BQU8sT0FBUCxFQUFnQixTQUFTLEVBQVQsQ0FBWSxLQUFaLENBQWhCLEM7Ozs7Ozs7Ozs7OzsyS0FFQyxTLEdBQVksa0IsU0FDWixJLEdBQU8sTTs7OztRQUZrQyxrQjs7Ozt1Q0FROUIscUIsYUFGWixnQkFBZ0IscUJBQWhCLEMsV0FDQSxPQUFPLE9BQVAsRUFBZ0IsU0FBUyxFQUFULENBQVksS0FBWixDQUFoQixDOzs7Ozs7Ozs7Ozs7MktBRUMsUyxHQUFZLGtCLFNBQ1osSSxHQUFPLEs7Ozs7UUFGa0Msa0I7Ozs7a0NBVTlCLGdCLGFBRlosZ0JBQWdCLGdCQUFoQixDLFdBQ0EsT0FBTyxTQUFTLEVBQVQsQ0FBWSxLQUFaLENBQVAsQztBQUdDLGtDQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNEOzttQ0FFRCxJLG1CQUFPO0FBQ0wsY0FBSSxLQUFLLEtBQUwsS0FBZSxFQUFuQixFQUF1QjtBQUNyQixpQkFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixhQUF2QixHQUF1QyxJQUF2QztBQUNBLGlCQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXlCLEtBQUssS0FBOUI7QUFDRDtBQUNGLFM7Ozs7Ozs7cUNBU1UsbUIsYUFGWixnQkFBZ0IsZUFBaEIsQyxXQUNBLE9BQU8sU0FBUyxFQUFULENBQVksS0FBWixDQUFQLEM7QUFHQyxxQ0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7c0NBRUQsSSxtQkFBTztBQUNMLGNBQUksT0FBTyxLQUFLLEtBQVosS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsR0FBd0MsS0FBSyxLQUE3QztBQUNEO0FBQ0YsUzs7Ozs7Ozt3Q0FTVSxzQixhQUZaLGdCQUFnQixrQkFBaEIsQyxXQUNBLE9BQU8sU0FBUyxFQUFULENBQVksS0FBWixDQUFQLEM7QUFHQyx3Q0FBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDRDs7eUNBRUQsSSxtQkFBTztBQUNMLGNBQUksT0FBTyxLQUFLLEtBQVosS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsaUJBQXZCLEdBQTJDLEtBQUssS0FBaEQ7QUFDRDtBQUNGLFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWF0dHJpYnV0ZXMtbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
