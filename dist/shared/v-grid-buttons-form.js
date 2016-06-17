'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, bindable, customElement, _dec, _class, _desc, _value, _class2, _descriptor, vGridButtonsFrom;

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
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      customElement = _aureliaFramework.customElement;
    }],
    execute: function () {
      _export('vGridButtonsFrom', vGridButtonsFrom = (_dec = customElement('v-grid-buttons-form'), _dec(_class = (_class2 = function () {
        function vGridButtonsFrom() {
          _classCallCheck(this, vGridButtonsFrom);

          _initDefineProp(this, 'context', _descriptor, this);
        }

        vGridButtonsFrom.prototype.attached = function attached() {
          this.dummyDataGenerator = this.context.dummyDataGenerator;
          this.myGrid = this.context.myGrid;
          this.getMaxRows = this.context.myGrid.ctx.getMaxRows();
          this.collectionLength = this.context.myCollection.length;
        };

        vGridButtonsFrom.prototype.replaceBtn = function replaceBtn(x) {
          var _this = this;

          if (x > 1000) this.myGrid.ctx.setLoadingOverlay(true);
          this.dummyDataGenerator.reset();
          setTimeout(function () {
            _this.dummyDataGenerator.generateData(x, function (data) {
              _this.context.myCollection = data;
              _this.collectionLength = _this.context.myCollection.length;
              _this.myGrid.ctx.setLoadingOverlay(false);
            });
          }, 100);
        };

        vGridButtonsFrom.prototype.addBtn = function addBtn(x, scrollBottom) {
          var _this2 = this;

          if (x > 1000) this.myGrid.ctx.setLoadingOverlay(true);
          setTimeout(function () {
            _this2.dummyDataGenerator.generateData(x, function (data) {
              data.forEach(function (x) {
                _this2.context.myCollection.push(x);
              });
              if (scrollBottom) {
                _this2.myGrid.ctx.scrollBottomNext();
              }
              _this2.myGrid.ctx.setLoadingOverlay(false);
              _this2.collectionLength = _this2.context.myCollection.length;
            });
          }, 100);
        };

        vGridButtonsFrom.prototype.insertOneBtn = function insertOneBtn() {
          var _this3 = this;

          try {
            this.dummyDataGenerator.generateData(1, function (data) {
              _this3.context.myCollection.splice(2, 0, data[0]);
            });
          } catch (e) {
            console.log(e);
          }
        };

        vGridButtonsFrom.prototype.insertFiveBtn = function insertFiveBtn() {
          var _this4 = this;

          try {
            for (var i = 0; i < 5; i++) {
              this.dummyDataGenerator.generateData(1, function (data) {
                _this4.context.myCollection.splice(2, 0, data[0]);
              });
            }
          } catch (e) {
            console.log(e);
          }
        };

        vGridButtonsFrom.prototype.removeFirstBtn = function removeFirstBtn() {
          this.context.myCollection.splice(0, 1);
          this.collectionLength = this.context.myCollection.length;
        };

        vGridButtonsFrom.prototype.removeLastBtn = function removeLastBtn() {
          this.context.myCollection.pop();
          this.collectionLength = this.context.myCollection.length;
        };

        vGridButtonsFrom.prototype.removeFirstxBtn = function removeFirstxBtn(x) {
          this.context.myCollection.splice(0, x);
          this.collectionLength = this.context.myCollection.length;
        };

        vGridButtonsFrom.prototype.removeLastxBtn = function removeLastxBtn(x) {
          this.context.myCollection.splice(this.context.myCollection.length - x, x);
          this.collectionLength = this.context.myCollection.length;
        };

        vGridButtonsFrom.prototype.miscBtn = function miscBtn() {
          var _this5 = this;

          this.context.myCollection.pop();

          this.context.myCollection.splice(2, 2);

          this.context.myCollection.splice(4, 2);

          this.dummyDataGenerator.generateData(2, function (data) {
            _this5.context.myCollection.push(data[0]);
            _this5.context.myCollection.push(data[1]);
          });
        };

        return vGridButtonsFrom;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'context', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class));

      _export('vGridButtonsFrom', vGridButtonsFrom);
    }
  };
});
//# sourceMappingURL=v-grid-buttons-form.js.map
