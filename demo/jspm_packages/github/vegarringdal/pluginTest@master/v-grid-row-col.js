/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridCellContainer = undefined;

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

  var _createClass = function () {
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

  var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor;

  var VGridCellContainer = exports.VGridCellContainer = (_dec = (0, _aureliaFramework.noView)(), _dec2 = (0, _aureliaFramework.customElement)('v-grid-row-col'), _dec3 = (0, _aureliaFramework.processContent)(false), _dec4 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid, _aureliaFramework.Container), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = function () {
    function VGridCellContainer(element, vGrid, container) {
      _classCallCheck(this, VGridCellContainer);

      _initDefineProp(this, 'columnNo', _descriptor, this);

      this.element = element;
      this.container = container;
      this.vGrid = vGrid;
      this.hidden = false;
      this.value;
      this.customStyle;
    }

    VGridCellContainer.prototype.bind = function bind(bindingContext) {
      this.bindingContext = bindingContext;

      if (this.viewSlot && this.bindingContext) {

        if (this.colType() === "selection") {
          var x = {};
          this.setValue(x);
        } else {
            this.setValue("");
            this.setValue(this.rawValue);
          }

        this.customStyle = this.colStyle();

        if (this.vGrid.vGridCurrentRow === parseInt(this.element.parentNode.getAttribute("row"))) {
          if (parseInt(this.columnNo) === this.vGrid.vGridCellHelper.index) {
            this.setCss();
          }
        }
      }
    };

    VGridCellContainer.prototype.created = function created() {};

    VGridCellContainer.prototype.attached = function attached() {
      this.setStandardClassesAndStyles();

      if (this.colType() === "custom") {
        if (!this.vGrid.viewCompiler.resources.elements['v-grid-' + this.colCustomName()]) {
          this.vGrid.vGridConfig.colTypeArray[this.columnNo] = "text";
        }
      }

      switch (this.colType()) {
        case "custom":
          var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-' + this.colCustomName() + '  value.bind="value"><input css.bind="customStyle"></v-grid-' + this.colCustomName() + '></template>', this.vGrid.resources);
          break;
        case "image":
          var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-image value.bind="value"><img css.bind="customStyle"></v-grid-image></template>', this.vGrid.resources);
          break;
        case "checkbox":
          var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-checkbox value.bind="value"><input css.bind="customStyle"></v-grid-checkbox></template>', this.vGrid.resources);
          break;
        case "selection":
          var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-selection value.bind="value"><input css.bind="customStyle"></v-grid-selection></template>', this.vGrid.resources);
          break;
        default:
          var viewFactory = this.vGrid.viewCompiler.compile('<template><v-grid-input  value.bind="value"><input css.bind="customStyle"></v-grid-input></template>', this.vGrid.resources);
      }

      var view = viewFactory.create(this.container);

      this.viewSlot = new _aureliaFramework.ViewSlot(this.element, true);
      this.viewSlot.add(view);
      this.viewSlot.bind(this);
      this.viewSlot.attached();

      this.element.addEventListener("cellFocus", function (e) {
        this.setCss();
      }.bind(this));

      this.element.addEventListener("focus", function (e) {
        debugger;
      }.bind(this));

      this.element.addEventListener("eventOnRowDblClick", function (e) {
        if (this.vGrid.vGridConfig.eventOnRowDblClick) {
          this.vGrid.vGridConfig.eventOnRowDblClick({
            evt: e,
            data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
            attribute: this.attribute(),
            row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
          });
        }
      }.bind(this));

      this.element.addEventListener("eventOnRowClick", function (e) {
        if (this.vGrid.vGridConfig.eventOnRowClick) {
          this.vGrid.vGridConfig.eventOnRowClick({
            evt: e,
            data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
            attribute: this.attribute(),
            row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
          });
        }
      }.bind(this));
    };

    VGridCellContainer.prototype.updateValue = function updateValue(value) {
      this.vGrid.vGridCellHelper.updateActual({
        attribute: this.attribute(),
        value: this.valueFormater ? this.valueFormater.fromView(value) : value
      });
    };

    VGridCellContainer.prototype.setValue = function setValue(value, setRawValue) {
      this.removeCssCell();
      if (setRawValue || this.editMode() && this.editRaw()) {
        this.value = this.rawValue;
      } else {
        this.value = this.valueFormater ? this.valueFormater.toView(value) : value;
      }
    };

    VGridCellContainer.prototype.getValue = function getValue(value) {
      return this.valueFormater ? this.valueFormater.fromView(value) : value;
    };

    VGridCellContainer.prototype.getRow = function getRow() {
      return parseInt(this.element.parentNode.getAttribute("row"));
    };

    VGridCellContainer.prototype.editMode = function editMode() {
      return this.vGrid.vGridConfig.editMode;
    };

    VGridCellContainer.prototype.setEditMode = function setEditMode(value) {
      this.vGrid.vGridConfig.editMode = value;
    };

    VGridCellContainer.prototype.editRaw = function editRaw() {
      return this.vGrid.vGridConfig.colEditRawArray[this.columnNo];
    };

    VGridCellContainer.prototype.attribute = function attribute() {
      return this.vGrid.vGridConfig.attributeArray[this.columnNo];
    };

    VGridCellContainer.prototype.readOnly = function readOnly() {
      return this.vGrid.vGridConfig.readOnlyArray[this.columnNo];
    };

    VGridCellContainer.prototype.colType = function colType() {
      return this.vGrid.vGridConfig.colTypeArray[this.columnNo];
    };

    VGridCellContainer.prototype.colCustomName = function colCustomName() {
      return this.vGrid.vGridConfig.colCustomArray[this.columnNo];
    };

    VGridCellContainer.prototype.colStyle = function colStyle() {
      if (this.vGrid) {
        if (this.vGrid.vGridConfig.colStyleArray[this.columnNo]) {
          return this.interpolate(this.vGrid.vGridConfig.colStyleArray[this.columnNo])(this.bindingContext);
        }
      }
    };

    VGridCellContainer.prototype.interpolate = function interpolate(str) {
      if (str) {
        return function interpolate(o) {
          return str.replace(/{{([^{}]*)}}/g, function (a, b) {
            var r = o[b];
            return r;
          });
        };
      } else {
        return function () {
          return "";
        };
      }
    };

    VGridCellContainer.prototype.getLastFocusElement = function getLastFocusElement() {
      return this.vGrid.vGridCellHelper.lastElement;
    };

    VGridCellContainer.prototype.setLastFocusElement = function setLastFocusElement(element) {
      this.vGrid.vGridCellHelper.lastElement = element;
    };

    VGridCellContainer.prototype.containsFocusClass = function containsFocusClass(element) {
      if (element) {
        return element.classList.contains(this.vGrid.vGridConfig.css.editCellFocus);
      } else {
        return false;
      }
    };

    VGridCellContainer.prototype.addFocusClass = function addFocusClass(element) {
      if (element) {
        element.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
      } else {
        return false;
      }
    };

    VGridCellContainer.prototype.removeFocusClass = function removeFocusClass(element) {
      if (element) {
        element.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
      } else {
        return false;
      }
    };

    VGridCellContainer.prototype.containsWriteClass = function containsWriteClass(element) {
      if (element) {
        return element.classList.contains(this.vGrid.vGridConfig.css.editCellWrite);
      } else {
        return false;
      }
    };

    VGridCellContainer.prototype.addWriteClass = function addWriteClass(element) {
      if (element) {
        element.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
      } else {
        return false;
      }
    };

    VGridCellContainer.prototype.removeWriteClass = function removeWriteClass(element) {
      if (element) {
        element.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
      } else {
        return false;
      }
    };

    VGridCellContainer.prototype.removeCssCell = function removeCssCell() {
      if (this.containsWriteClass(this.element)) {
        this.removeWriteClass(this.element);
      }
      if (this.containsFocusClass(this.element)) {
        this.removeFocusClass(this.element);
      }
    };

    VGridCellContainer.prototype.removeCssOldCell = function removeCssOldCell() {
      if (this.containsWriteClass(this.getLastFocusElement())) {
        this.removeWriteClass(this.getLastFocusElement());
      }
      if (this.containsFocusClass(this.getLastFocusElement())) {
        this.removeFocusClass(this.getLastFocusElement());
      }
    };

    VGridCellContainer.prototype.setCss = function setCss() {
      if (!this.containsFocusClass(this.element)) {
        this.removeCssOldCell();
        this.addFocusClass(this.element);
        this.setLastFocusElement(this.element);
      }

      if (this.editMode() && !this.readOnly()) {
        if (!this.containsWriteClass(this.element)) {
          this.removeFocusClass(this.element);
          this.addWriteClass(this.element);
        }
      }
    };

    VGridCellContainer.prototype.setStandardClassesAndStyles = function setStandardClassesAndStyles() {
      var css = this.vGrid.vGridConfig.css;
      var cellStyle = 'width:' + this.vGrid.vGridConfig.columnWidthArray[this.columnNo] + 'px';
      this.element.classList.add(css.rowCell);
      this.element.classList.add(css.rowColumn + this.columnNo);
      this.element.classList.add(css.gridColumn + this.columnNo);
      this.element.setAttribute("style", cellStyle);
    };

    _createClass(VGridCellContainer, [{
      key: 'valueFormater',
      get: function get() {
        return this.vGrid.vGridConfig.colFormaterArray[this.columnNo];
      }
    }, {
      key: 'rawValue',
      get: function get() {
        return this.bindingContext[this.attribute()];
      }
    }]);

    return VGridCellContainer;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columnNo', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class) || _class);
});