'use strict';

System.register(['aurelia-framework', '../v-grid'], function (_export, _context) {
  "use strict";

  var bindable, inject, customAttribute, VGrid, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, vMenu;

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
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vMenu', vMenu = (_dec = customAttribute('v-menu'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = (_class2 = function () {
        function vMenu(element, vGrid) {
          _classCallCheck(this, vMenu);

          _initDefineProp(this, 'filter', _descriptor, this);

          _initDefineProp(this, 'sort', _descriptor2, this);

          _initDefineProp(this, 'pinned', _descriptor3, this);

          _initDefineProp(this, 'copypaste', _descriptor4, this);

          this.element = element;
          this.controller = vGrid.controller;
          this.raiseEvent = vGrid.controller.raiseEvent;

          this.openBinded = this.open.bind(this);
          this.checkBinded = this.check.bind(this);
          this.callbackBinded = this.callback.bind(this);
        }

        vMenu.prototype.unbind = function unbind() {
          document.removeEventListener("click", this.checkBinded);
        };

        vMenu.prototype.check = function check(e) {
          var x = e.target.classList.contains("avg-menu__link");
          if (!x) {
            this.controller.contextMenu.setDefaults();
            document.removeEventListener("click", this.checkBinded);
          }
        };

        vMenu.prototype.callback = function callback(type, option, event) {
          console.log(type);
          console.log(option);
          console.log(event);
          if (type === "filter") {
            if (option === "clear") {
              this.raiseEvent("filterClearCell", { attribute: this.filter.replace("rowRef.", "") });
              document.removeEventListener("click", this.checkBinded);
              return true;
            }

            if (option === "clearall") {
              this.raiseEvent("filterClearAll", {});
              document.removeEventListener("click", this.checkBinded);
              return true;
            }

            if (option === "showall") {
              this.controller.attGridConnector.query(null);
              document.removeEventListener("click", this.checkBinded);
              return true;
            }
          }

          if (type === "sort") {

            this.controller.attGridConnector.orderBy({
              attribute: this.sort.replace("rowRef.", ""),
              asc: option === "desc" ? false : true
            }, event.shiftKey);
            document.removeEventListener("click", this.checkBinded);
            return true;
          }

          if (type === "filterOption") {
            this.raiseEvent("filterUpdate", {
              attribute: this.filter.replace("rowRef.", ""),
              operator: option
            });
            document.removeEventListener("click", this.checkBinded);
            return true;
          }
        };

        vMenu.prototype.open = function open(e) {
          this.check(e);
          document.addEventListener("click", this.checkBinded);
          e.preventDefault();
          if (!this.controller.contextMenu.show) {
            var clickCoords = this.getPosition(e);
            this.controller.contextMenu.openMenu({
              top: clickCoords.y,
              left: clickCoords.x,
              filter: this.filter,
              sort: this.sort,
              pinned: this.pinned,
              callback: this.callbackBinded
            });
          }
        };

        vMenu.prototype.attached = function attached() {
          this.element.addEventListener("contextmenu", this.openBinded);
        };

        vMenu.prototype.getPosition = function getPosition(e) {
          var posx = 0;
          var posy = 0;

          if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
          } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }

          return {
            x: posx,
            y: posy
          };
        };

        return vMenu;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'filter', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'sort', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'pinned', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'copypaste', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('vMenu', vMenu);
    }
  };
});
//# sourceMappingURL=v-menu.js.map
