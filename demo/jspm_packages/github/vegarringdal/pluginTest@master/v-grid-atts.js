/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.remoteIndex = exports.eventOnRemoteCall = exports.LoadingThreshold = exports.contextmenu = exports.eventOnRowDblClick = exports.eventOnRowClick = exports.sortNotOnHeader = exports.doNotAddFilterTo = exports.attributeArray = exports.eventOnRowDraw = exports.manualSelection = exports.largeBuffer = exports.sortOnHeaderClick = exports.filterOnAtTop = exports.addFilter = exports.renderOnScrollbarScroll = exports.resizableHeadersAndRows = exports.requestAnimationFrame = exports.isSortableHeader = exports.isMultiSelect = exports.isResizableHeaders = exports.footerHeight = exports.headerHeight = exports.rowHeight = undefined;

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

  var _dec, _dec2, _class, _dec3, _dec4, _class3, _dec5, _dec6, _class5, _dec7, _dec8, _class7, _dec9, _dec10, _class9, _dec11, _dec12, _class11, _dec13, _dec14, _class13, _dec15, _dec16, _class15, _dec17, _dec18, _class17, _dec19, _dec20, _class19, _dec21, _dec22, _class21, _dec23, _dec24, _class23, _dec25, _dec26, _class25, _dec27, _dec28, _class27, _dec29, _dec30, _class29, _dec31, _dec32, _class31, _dec33, _dec34, _class33, _dec35, _dec36, _class35, _dec37, _dec38, _class37, _dec39, _dec40, _class39, _dec41, _dec42, _class41, _dec43, _dec44, _class43, _dec45, _dec46, _class45, _dec47, _dec48, _class47;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var VGridAttibutes = function () {
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
      if (this.vGrid.vGridContextObj[this.alias]) {
        this.vGrid.vGridConfig[this.attribute] = this.setValue(this.vGrid.vGridContextObj[this.alias], this.attDefault);
      } else {
        this.vGrid.vGridConfig[this.attribute] = this.setValue(parseInt(this.value), this.attDefault);
      }
    };

    VGridAttibutes.prototype.setBindValueString = function setBindValueString() {
      if (this.vGrid.vGridContextObj[this.alias]) {
        this.vGrid.vGridConfig[this.attribute] = this.setValue(this.vGrid.vGridContextObj[this.alias], this.attDefault);
      } else {
        if (typeof this.value === "string" && this.value !== '') {
          this.vGrid.vGridConfig[this.attribute] = this.value;
        }
      }
    };

    VGridAttibutes.prototype.setBindValueBool = function setBindValueBool() {
      var type = {
        "true": true,
        "false": false
      };

      if (this.vGrid.vGridContextObj[this.alias]) {
        this.vGrid.vGridConfig[this.attribute] = this.setValue(this.vGrid.vGridContextObj[this.alias], this.attDefault);
      } else {
        this.vGrid.vGridConfig[this.attribute] = this.setValue(type[this.value], this.attDefault);
      }
    };

    VGridAttibutes.prototype.setBindValueFn = function setBindValueFn() {
      if (this.vGrid.vGridContextObj[this.alias]) {
        if (typeof this.vGrid.vGridContextObj[this.alias] === "function") {
          this.vGrid.vGridConfig[this.attribute] = this.vGrid.vGridContextObj[this.alias].bind(this.vGrid.$parent);
        }
      } else {
        if (typeof this.vGrid.$parent[this.value] === "function") {
          this.vGrid.vGridConfig[this.attribute] = this.vGrid.$parent[this.value].bind(this.vGrid.$parent);
        }
      }
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
        case "fn":
          this.setBindValueFn();
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

    VGridAttibutes.prototype.setNewvalue = function setNewvalue(newValue, oldValue) {};

    VGridAttibutes.prototype.bind = function bind(bindingContext, overrideContext) {
      this.getDefaultvalue();
      this.setBindValue();
    };

    VGridAttibutes.prototype.valueChanged = function valueChanged(newValue, oldValue) {
      this.setNewvalue(newValue, oldValue);
    };

    return VGridAttibutes;
  }();

  var rowHeight = exports.rowHeight = (_dec = (0, _aureliaFramework.customAttribute)('v-row-height'), _dec2 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec(_class = _dec2(_class = function (_VGridAttibutes) {
    _inherits(rowHeight, _VGridAttibutes);

    function rowHeight() {
      var _temp, _this, _ret;

      _classCallCheck(this, rowHeight);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _VGridAttibutes.call.apply(_VGridAttibutes, [this].concat(args))), _this), _this.attribute = "rowHeight", _this.alias = "configRowHeight", _this.type = "int", _temp), _possibleConstructorReturn(_this, _ret);
    }

    return rowHeight;
  }(VGridAttibutes)) || _class) || _class);
  var headerHeight = exports.headerHeight = (_dec3 = (0, _aureliaFramework.customAttribute)('v-header-height'), _dec4 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec3(_class3 = _dec4(_class3 = function (_VGridAttibutes2) {
    _inherits(headerHeight, _VGridAttibutes2);

    function headerHeight() {
      var _temp2, _this2, _ret2;

      _classCallCheck(this, headerHeight);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _VGridAttibutes2.call.apply(_VGridAttibutes2, [this].concat(args))), _this2), _this2.attribute = "headerHeight", _this2.alias = "configHeaderHeight", _this2.type = "int", _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    return headerHeight;
  }(VGridAttibutes)) || _class3) || _class3);
  var footerHeight = exports.footerHeight = (_dec5 = (0, _aureliaFramework.customAttribute)('v-footer-height'), _dec6 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec5(_class5 = _dec6(_class5 = function (_VGridAttibutes3) {
    _inherits(footerHeight, _VGridAttibutes3);

    function footerHeight() {
      var _temp3, _this3, _ret3;

      _classCallCheck(this, footerHeight);

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, _VGridAttibutes3.call.apply(_VGridAttibutes3, [this].concat(args))), _this3), _this3.attribute = "footerHeight", _this3.alias = "configFooterHeight", _this3.type = "int", _temp3), _possibleConstructorReturn(_this3, _ret3);
    }

    return footerHeight;
  }(VGridAttibutes)) || _class5) || _class5);
  var isResizableHeaders = exports.isResizableHeaders = (_dec7 = (0, _aureliaFramework.customAttribute)('v-resizable-headers'), _dec8 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec7(_class7 = _dec8(_class7 = function (_VGridAttibutes4) {
    _inherits(isResizableHeaders, _VGridAttibutes4);

    function isResizableHeaders() {
      var _temp4, _this4, _ret4;

      _classCallCheck(this, isResizableHeaders);

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _ret4 = (_temp4 = (_this4 = _possibleConstructorReturn(this, _VGridAttibutes4.call.apply(_VGridAttibutes4, [this].concat(args))), _this4), _this4.attribute = "isResizableHeaders", _this4.alias = "configResizableHeaders", _this4.type = "bool", _temp4), _possibleConstructorReturn(_this4, _ret4);
    }

    return isResizableHeaders;
  }(VGridAttibutes)) || _class7) || _class7);
  var isMultiSelect = exports.isMultiSelect = (_dec9 = (0, _aureliaFramework.customAttribute)('v-multi-select'), _dec10 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec9(_class9 = _dec10(_class9 = function (_VGridAttibutes5) {
    _inherits(isMultiSelect, _VGridAttibutes5);

    function isMultiSelect() {
      var _temp5, _this5, _ret5;

      _classCallCheck(this, isMultiSelect);

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _ret5 = (_temp5 = (_this5 = _possibleConstructorReturn(this, _VGridAttibutes5.call.apply(_VGridAttibutes5, [this].concat(args))), _this5), _this5.attribute = "isMultiSelect", _this5.alias = "configMultiSelect", _this5.type = "bool", _temp5), _possibleConstructorReturn(_this5, _ret5);
    }

    return isMultiSelect;
  }(VGridAttibutes)) || _class9) || _class9);
  var isSortableHeader = exports.isSortableHeader = (_dec11 = (0, _aureliaFramework.customAttribute)('v-sortable-headers'), _dec12 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec11(_class11 = _dec12(_class11 = function (_VGridAttibutes6) {
    _inherits(isSortableHeader, _VGridAttibutes6);

    function isSortableHeader() {
      var _temp6, _this6, _ret6;

      _classCallCheck(this, isSortableHeader);

      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return _ret6 = (_temp6 = (_this6 = _possibleConstructorReturn(this, _VGridAttibutes6.call.apply(_VGridAttibutes6, [this].concat(args))), _this6), _this6.attribute = "isSortableHeader", _this6.alias = "configSortableHeader", _this6.type = "bool", _temp6), _possibleConstructorReturn(_this6, _ret6);
    }

    return isSortableHeader;
  }(VGridAttibutes)) || _class11) || _class11);
  var requestAnimationFrame = exports.requestAnimationFrame = (_dec13 = (0, _aureliaFramework.customAttribute)('v-request-animation-frame'), _dec14 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec13(_class13 = _dec14(_class13 = function (_VGridAttibutes7) {
    _inherits(requestAnimationFrame, _VGridAttibutes7);

    function requestAnimationFrame() {
      var _temp7, _this7, _ret7;

      _classCallCheck(this, requestAnimationFrame);

      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return _ret7 = (_temp7 = (_this7 = _possibleConstructorReturn(this, _VGridAttibutes7.call.apply(_VGridAttibutes7, [this].concat(args))), _this7), _this7.attribute = "requestAnimationFrame", _this7.alias = "configRequestAnimationFrame", _this7.type = "bool", _temp7), _possibleConstructorReturn(_this7, _ret7);
    }

    return requestAnimationFrame;
  }(VGridAttibutes)) || _class13) || _class13);
  var resizableHeadersAndRows = exports.resizableHeadersAndRows = (_dec15 = (0, _aureliaFramework.customAttribute)('v-resize-also-rows'), _dec16 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec15(_class15 = _dec16(_class15 = function (_VGridAttibutes8) {
    _inherits(resizableHeadersAndRows, _VGridAttibutes8);

    function resizableHeadersAndRows() {
      var _temp8, _this8, _ret8;

      _classCallCheck(this, resizableHeadersAndRows);

      for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return _ret8 = (_temp8 = (_this8 = _possibleConstructorReturn(this, _VGridAttibutes8.call.apply(_VGridAttibutes8, [this].concat(args))), _this8), _this8.attribute = "resizableHeadersAndRows", _this8.alias = "configResizableHeadersAndRows", _this8.type = "bool", _temp8), _possibleConstructorReturn(_this8, _ret8);
    }

    return resizableHeadersAndRows;
  }(VGridAttibutes)) || _class15) || _class15);
  var renderOnScrollbarScroll = exports.renderOnScrollbarScroll = (_dec17 = (0, _aureliaFramework.customAttribute)('v-render-on-scrollbar-scroll'), _dec18 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec17(_class17 = _dec18(_class17 = function (_VGridAttibutes9) {
    _inherits(renderOnScrollbarScroll, _VGridAttibutes9);

    function renderOnScrollbarScroll() {
      var _temp9, _this9, _ret9;

      _classCallCheck(this, renderOnScrollbarScroll);

      for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return _ret9 = (_temp9 = (_this9 = _possibleConstructorReturn(this, _VGridAttibutes9.call.apply(_VGridAttibutes9, [this].concat(args))), _this9), _this9.attribute = "renderOnScrollbarScroll", _this9.alias = "configRenderOnScrollbarScroll", _this9.type = "bool", _temp9), _possibleConstructorReturn(_this9, _ret9);
    }

    return renderOnScrollbarScroll;
  }(VGridAttibutes)) || _class17) || _class17);
  var addFilter = exports.addFilter = (_dec19 = (0, _aureliaFramework.customAttribute)('v-header-filter'), _dec20 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec19(_class19 = _dec20(_class19 = function (_VGridAttibutes10) {
    _inherits(addFilter, _VGridAttibutes10);

    function addFilter() {
      var _temp10, _this10, _ret10;

      _classCallCheck(this, addFilter);

      for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return _ret10 = (_temp10 = (_this10 = _possibleConstructorReturn(this, _VGridAttibutes10.call.apply(_VGridAttibutes10, [this].concat(args))), _this10), _this10.attribute = "addFilter", _this10.alias = "configAddFilter", _this10.type = "bool", _temp10), _possibleConstructorReturn(_this10, _ret10);
    }

    return addFilter;
  }(VGridAttibutes)) || _class19) || _class19);
  var filterOnAtTop = exports.filterOnAtTop = (_dec21 = (0, _aureliaFramework.customAttribute)('v-header-filter-top'), _dec22 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec21(_class21 = _dec22(_class21 = function (_VGridAttibutes11) {
    _inherits(filterOnAtTop, _VGridAttibutes11);

    function filterOnAtTop() {
      var _temp11, _this11, _ret11;

      _classCallCheck(this, filterOnAtTop);

      for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      return _ret11 = (_temp11 = (_this11 = _possibleConstructorReturn(this, _VGridAttibutes11.call.apply(_VGridAttibutes11, [this].concat(args))), _this11), _this11.attribute = "filterOnAtTop", _this11.alias = "configFilterOnAtTop", _this11.type = "bool", _temp11), _possibleConstructorReturn(_this11, _ret11);
    }

    return filterOnAtTop;
  }(VGridAttibutes)) || _class21) || _class21);
  var sortOnHeaderClick = exports.sortOnHeaderClick = (_dec23 = (0, _aureliaFramework.customAttribute)('v-sort-on-header-click'), _dec24 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec23(_class23 = _dec24(_class23 = function (_VGridAttibutes12) {
    _inherits(sortOnHeaderClick, _VGridAttibutes12);

    function sortOnHeaderClick() {
      var _temp12, _this12, _ret12;

      _classCallCheck(this, sortOnHeaderClick);

      for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }

      return _ret12 = (_temp12 = (_this12 = _possibleConstructorReturn(this, _VGridAttibutes12.call.apply(_VGridAttibutes12, [this].concat(args))), _this12), _this12.attribute = "sortOnHeaderClick", _this12.alias = "configSortOnHeaderClick", _this12.type = "bool", _temp12), _possibleConstructorReturn(_this12, _ret12);
    }

    return sortOnHeaderClick;
  }(VGridAttibutes)) || _class23) || _class23);
  var largeBuffer = exports.largeBuffer = (_dec25 = (0, _aureliaFramework.customAttribute)('v-large-buffer'), _dec26 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec25(_class25 = _dec26(_class25 = function (_VGridAttibutes13) {
    _inherits(largeBuffer, _VGridAttibutes13);

    function largeBuffer() {
      var _temp13, _this13, _ret13;

      _classCallCheck(this, largeBuffer);

      for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }

      return _ret13 = (_temp13 = (_this13 = _possibleConstructorReturn(this, _VGridAttibutes13.call.apply(_VGridAttibutes13, [this].concat(args))), _this13), _this13.attribute = "largeBuffer", _this13.alias = "configLargeBuffer", _this13.type = "bool", _temp13), _possibleConstructorReturn(_this13, _ret13);
    }

    return largeBuffer;
  }(VGridAttibutes)) || _class25) || _class25);
  var manualSelection = exports.manualSelection = (_dec27 = (0, _aureliaFramework.customAttribute)('v-manual-sel'), _dec28 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec27(_class27 = _dec28(_class27 = function (_VGridAttibutes14) {
    _inherits(manualSelection, _VGridAttibutes14);

    function manualSelection() {
      var _temp14, _this14, _ret14;

      _classCallCheck(this, manualSelection);

      for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }

      return _ret14 = (_temp14 = (_this14 = _possibleConstructorReturn(this, _VGridAttibutes14.call.apply(_VGridAttibutes14, [this].concat(args))), _this14), _this14.attribute = "manualSelection", _this14.alias = "configManualSelection", _this14.type = "bool", _temp14), _possibleConstructorReturn(_this14, _ret14);
    }

    return manualSelection;
  }(VGridAttibutes)) || _class27) || _class27);
  var eventOnRowDraw = exports.eventOnRowDraw = (_dec29 = (0, _aureliaFramework.customAttribute)('v-row-on-draw'), _dec30 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec29(_class29 = _dec30(_class29 = function (_VGridAttibutes15) {
    _inherits(eventOnRowDraw, _VGridAttibutes15);

    function eventOnRowDraw() {
      var _temp15, _this15, _ret15;

      _classCallCheck(this, eventOnRowDraw);

      for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        args[_key15] = arguments[_key15];
      }

      return _ret15 = (_temp15 = (_this15 = _possibleConstructorReturn(this, _VGridAttibutes15.call.apply(_VGridAttibutes15, [this].concat(args))), _this15), _this15.attribute = "eventOnRowDraw", _this15.alias = "configEventOnRowDraw", _this15.type = "fn", _temp15), _possibleConstructorReturn(_this15, _ret15);
    }

    return eventOnRowDraw;
  }(VGridAttibutes)) || _class29) || _class29);
  var attributeArray = exports.attributeArray = (_dec31 = (0, _aureliaFramework.customAttribute)('v-attibutes-used'), _dec32 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec31(_class31 = _dec32(_class31 = function (_VGridAttibutes16) {
    _inherits(attributeArray, _VGridAttibutes16);

    function attributeArray() {
      var _temp16, _this16, _ret16;

      _classCallCheck(this, attributeArray);

      for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      return _ret16 = (_temp16 = (_this16 = _possibleConstructorReturn(this, _VGridAttibutes16.call.apply(_VGridAttibutes16, [this].concat(args))), _this16), _this16.attribute = "attributeArray", _this16.alias = "configAttributeArray", _this16.type = "array", _temp16), _possibleConstructorReturn(_this16, _ret16);
    }

    return attributeArray;
  }(VGridAttibutes)) || _class31) || _class31);
  var doNotAddFilterTo = exports.doNotAddFilterTo = (_dec33 = (0, _aureliaFramework.customAttribute)('v-header-filter-not-to'), _dec34 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec33(_class33 = _dec34(_class33 = function (_VGridAttibutes17) {
    _inherits(doNotAddFilterTo, _VGridAttibutes17);

    function doNotAddFilterTo() {
      var _temp17, _this17, _ret17;

      _classCallCheck(this, doNotAddFilterTo);

      for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }

      return _ret17 = (_temp17 = (_this17 = _possibleConstructorReturn(this, _VGridAttibutes17.call.apply(_VGridAttibutes17, [this].concat(args))), _this17), _this17.attribute = "doNotAddFilterTo", _this17.alias = "configDoNotAddFilterTo", _this17.type = "array", _temp17), _possibleConstructorReturn(_this17, _ret17);
    }

    return doNotAddFilterTo;
  }(VGridAttibutes)) || _class33) || _class33);
  var sortNotOnHeader = exports.sortNotOnHeader = (_dec35 = (0, _aureliaFramework.customAttribute)('v-sort-not-on-header'), _dec36 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec35(_class35 = _dec36(_class35 = function (_VGridAttibutes18) {
    _inherits(sortNotOnHeader, _VGridAttibutes18);

    function sortNotOnHeader() {
      var _temp18, _this18, _ret18;

      _classCallCheck(this, sortNotOnHeader);

      for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
        args[_key18] = arguments[_key18];
      }

      return _ret18 = (_temp18 = (_this18 = _possibleConstructorReturn(this, _VGridAttibutes18.call.apply(_VGridAttibutes18, [this].concat(args))), _this18), _this18.attribute = "sortNotOnHeader", _this18.alias = "configSortNotOnHeader", _this18.type = "array", _temp18), _possibleConstructorReturn(_this18, _ret18);
    }

    return sortNotOnHeader;
  }(VGridAttibutes)) || _class35) || _class35);
  var eventOnRowClick = exports.eventOnRowClick = (_dec37 = (0, _aureliaFramework.customAttribute)('v-row-onclick'), _dec38 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec37(_class37 = _dec38(_class37 = function (_VGridAttibutes19) {
    _inherits(eventOnRowClick, _VGridAttibutes19);

    function eventOnRowClick() {
      var _temp19, _this19, _ret19;

      _classCallCheck(this, eventOnRowClick);

      for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
        args[_key19] = arguments[_key19];
      }

      return _ret19 = (_temp19 = (_this19 = _possibleConstructorReturn(this, _VGridAttibutes19.call.apply(_VGridAttibutes19, [this].concat(args))), _this19), _this19.attribute = "eventOnRowClick", _this19.alias = "configEventOnRowClick", _this19.type = "fn", _temp19), _possibleConstructorReturn(_this19, _ret19);
    }

    return eventOnRowClick;
  }(VGridAttibutes)) || _class37) || _class37);
  var eventOnRowDblClick = exports.eventOnRowDblClick = (_dec39 = (0, _aureliaFramework.customAttribute)('v-row-ondblclick'), _dec40 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec39(_class39 = _dec40(_class39 = function (_VGridAttibutes20) {
    _inherits(eventOnRowDblClick, _VGridAttibutes20);

    function eventOnRowDblClick() {
      var _temp20, _this20, _ret20;

      _classCallCheck(this, eventOnRowDblClick);

      for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
        args[_key20] = arguments[_key20];
      }

      return _ret20 = (_temp20 = (_this20 = _possibleConstructorReturn(this, _VGridAttibutes20.call.apply(_VGridAttibutes20, [this].concat(args))), _this20), _this20.attribute = "eventOnRowDblClick", _this20.alias = "configEventOnRowDblClick", _this20.type = "fn", _temp20), _possibleConstructorReturn(_this20, _ret20);
    }

    return eventOnRowDblClick;
  }(VGridAttibutes)) || _class39) || _class39);
  var contextmenu = exports.contextmenu = (_dec41 = (0, _aureliaFramework.customAttribute)('v-contextmenu'), _dec42 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec41(_class41 = _dec42(_class41 = function (_VGridAttibutes21) {
    _inherits(contextmenu, _VGridAttibutes21);

    function contextmenu() {
      var _temp21, _this21, _ret21;

      _classCallCheck(this, contextmenu);

      for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
        args[_key21] = arguments[_key21];
      }

      return _ret21 = (_temp21 = (_this21 = _possibleConstructorReturn(this, _VGridAttibutes21.call.apply(_VGridAttibutes21, [this].concat(args))), _this21), _this21.attribute = "contextmenu", _this21.alias = "configContextmenu", _this21.type = "bool", _temp21), _possibleConstructorReturn(_this21, _ret21);
    }

    return contextmenu;
  }(VGridAttibutes)) || _class41) || _class41);
  var LoadingThreshold = exports.LoadingThreshold = (_dec43 = (0, _aureliaFramework.customAttribute)('v-loading-threshold'), _dec44 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec43(_class43 = _dec44(_class43 = function (_VGridAttibutes22) {
    _inherits(LoadingThreshold, _VGridAttibutes22);

    function LoadingThreshold() {
      var _temp22, _this22, _ret22;

      _classCallCheck(this, LoadingThreshold);

      for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
        args[_key22] = arguments[_key22];
      }

      return _ret22 = (_temp22 = (_this22 = _possibleConstructorReturn(this, _VGridAttibutes22.call.apply(_VGridAttibutes22, [this].concat(args))), _this22), _this22.attribute = "loadingThreshold", _this22.alias = "configLoadingThreshold", _this22.type = "int", _temp22), _possibleConstructorReturn(_this22, _ret22);
    }

    return LoadingThreshold;
  }(VGridAttibutes)) || _class43) || _class43);
  var eventOnRemoteCall = exports.eventOnRemoteCall = (_dec45 = (0, _aureliaFramework.customAttribute)('v-event-onremotecall'), _dec46 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec45(_class45 = _dec46(_class45 = function (_VGridAttibutes23) {
    _inherits(eventOnRemoteCall, _VGridAttibutes23);

    function eventOnRemoteCall() {
      var _temp23, _this23, _ret23;

      _classCallCheck(this, eventOnRemoteCall);

      for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
        args[_key23] = arguments[_key23];
      }

      return _ret23 = (_temp23 = (_this23 = _possibleConstructorReturn(this, _VGridAttibutes23.call.apply(_VGridAttibutes23, [this].concat(args))), _this23), _this23.attribute = "eventOnRemoteCall", _this23.alias = "configEventOnRemoteCall", _this23.type = "fn", _temp23), _possibleConstructorReturn(_this23, _ret23);
    }

    return eventOnRemoteCall;
  }(VGridAttibutes)) || _class45) || _class45);
  var remoteIndex = exports.remoteIndex = (_dec47 = (0, _aureliaFramework.customAttribute)('v-remote-index'), _dec48 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Optional.of(_vGrid.VGrid)), _dec47(_class47 = _dec48(_class47 = function (_VGridAttibutes24) {
    _inherits(remoteIndex, _VGridAttibutes24);

    function remoteIndex() {
      var _temp24, _this24, _ret24;

      _classCallCheck(this, remoteIndex);

      for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
        args[_key24] = arguments[_key24];
      }

      return _ret24 = (_temp24 = (_this24 = _possibleConstructorReturn(this, _VGridAttibutes24.call.apply(_VGridAttibutes24, [this].concat(args))), _this24), _this24.attribute = "remoteIndex", _this24.alias = "configRemoteIndex", _this24.type = "string", _temp24), _possibleConstructorReturn(_this24, _ret24);
    }

    return remoteIndex;
  }(VGridAttibutes)) || _class47) || _class47);
});