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
                    this.vGrid = vGrid;

                    this.clickCoords = null;
                    this.clickCoordsX = null;
                    this.clickCoordsY = null;
                    this.menuState = 0;
                    this.menuWidth = null;
                    this.menuHeight = null;
                    this.menuPosition = null;
                    this.menuPositionX = null;
                    this.menuPositionY = null;

                    this.windowWidth = null;
                    this.windowHeight = null;

                    this.openBinded = this.open.bind(this);
                }

                vMenu.prototype.addListener = function addListener() {};

                vMenu.prototype.removeListener = function removeListener() {};

                vMenu.prototype.bind = function bind() {};

                vMenu.prototype.check = function check() {};

                vMenu.prototype.open = function open() {};

                vMenu.prototype.attached = function attached() {
                    this.element.addEventListener("contextmenu", this.openBinded);
                };

                vMenu.prototype.positionMenu = function positionMenu(e) {
                    this.clickCoords = this.getPosition(e);
                    this.clickCoordsX = this.clickCoords.x;
                    this.clickCoordsY = this.clickCoords.y;

                    this.menuWidth = this.menu.offsetWidth + 4;
                    this.menuHeight = this.menu.offsetHeight + 4;

                    this.windowWidth = window.innerWidth;
                    this.windowHeight = window.innerHeight;

                    if (this.windowWidth - this.clickCoordsX < this.menuWidth) {
                        this.menu.style.left = this.windowWidth - this.menuWidth + "px";
                    } else {
                        this.menu.style.left = this.clickCoordsX + "px";
                    }

                    if (this.windowHeight - this.clickCoordsY < this.menuHeight) {
                        this.menu.style.top = this.windowHeight - this.menuHeight + "px";
                    } else {
                        this.menu.style.top = this.clickCoordsY + "px";
                    }
                };

                vMenu.prototype.getPosition = function getPosition(e) {
                    var posx = 0;
                    var posy = 0;

                    if (!e) var e = window.event;

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
