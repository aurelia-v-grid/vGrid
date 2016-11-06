"use strict";

System.register(["aurelia-framework"], function (_export, _context) {
    "use strict";

    var ViewSlot, ContextMenu;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            ViewSlot = _aureliaFramework.ViewSlot;
        }],
        execute: function () {
            _export("ContextMenu", ContextMenu = function () {
                function ContextMenu(viewCompiler, container, viewResources, viewSlots) {
                    _classCallCheck(this, ContextMenu);

                    this.menuHtml = "\n        <nav css=\"top:" + '${top}px;left:${left}px' + "\" if.bind=\"show\" class=\"avg-default avg-menu\">\n            <ul if.bind=\"show\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('close','true')\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-times-circle-o\"></i> Close\n                </p>\n                </li>\n            </ul>\n\n            <ul if.bind=\"pinnedMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','left', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-thumb-tack\"></i> Pin left\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','right', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-thumb-tack\"></i> Pin Right\n                </p>\n                </li>\n            </ul>\n\n            <ul if.bind=\"sortMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','asc', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-sort\"></i> Sort Ascending\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','desc', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-sort\"></i> Sort Descending\n                </p>\n                </li>\n            </ul>\n\n            <ul if.bind=\"filterMainMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','showall', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Show All\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clear', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Clear current\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clearall', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Clear all\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','options', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Choose operator\n                </p>\n                </li>\n            </ul>\n\n\n            <ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','Back', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-arrow-left\"></i> Back\n                </p>\n                </li>\n            </ul>\n\n            <ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Equals\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Less than or equal\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Greater than or equal\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Less than\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Greater than\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Contains\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Not equal to\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!*', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Does not contain\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Begins with\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=*', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-fa-filter\"></i> Ends with\n                </p>\n                </li>\n            </ul>\n\n        </nav>";

                    this.viewCompiler = viewCompiler;
                    this.container = container;
                    this.viewResources = viewResources;
                    this.viewSlots = viewSlots;
                    this.setDefaults();
                }

                ContextMenu.prototype.setDefaults = function setDefaults() {
                    this.top = 0;
                    this.left = 0;
                    this.show = false;
                    this.pinnedMenu = false;
                    this.sortMenu = false;
                    this.filterMainMenu = false;
                    this.filterOptionsMenu = false;
                };

                ContextMenu.prototype.init = function init() {
                    var viewFactory = this.viewCompiler.compile("<template>" + this.menuHtml + "</template>", this.viewResources);
                    var view = viewFactory.create(this.container);
                    var viewSlot = new ViewSlot(document.body, true);
                    viewSlot.add(view);
                    this.viewSlots.ContextMenu = viewSlot;
                    viewSlot.bind(this);
                    viewSlot.attached();
                };

                ContextMenu.prototype.showFilterOptions = function showFilterOptions() {
                    this.filterOptionsMenu = true;
                };

                ContextMenu.prototype.hideFilterOptions = function hideFilterOptions() {
                    this.filterOptionsMenu = false;
                };

                ContextMenu.prototype.openMenu = function openMenu(options) {
                    this.left = options.left;
                    this.top = options.top;
                    this.pinnedMenu = options.pinned ? true : false;
                    this.sortMenu = options.sort ? true : false;
                    this.filterMainMenu = options.filter ? true : false;
                    this.show = true;
                    this.callback = options.callback;
                };

                ContextMenu.prototype.menuClick = function menuClick(type, option, event) {
                    switch (true) {
                        case type === "filter" && option === "options":
                            this.showFilterOptions();
                            break;
                        case type === "filterOption" && option === "Back":
                            this.hideFilterOptions();
                            break;
                        case type === "close" && option === "true":
                            this.show = false;
                            break;
                        default:
                            var result = this.callback(type, option, event);
                            if (result) {
                                this.show = false;
                                this.pinnedMenu = false;
                                this.sortMenu = false;
                                this.filterMainMenu = false;
                                this.filterOptionsMenu = false;
                            }
                    }
                };

                ContextMenu.prototype.positionMenu = function positionMenu(x, y) {
                    this.clickCoordsX = this.left;
                    this.clickCoordsY = this.top;

                    this.menuWidth = this.menu.offsetWidth + 4;
                    this.menuHeight = this.menu.offsetHeight + 4;

                    this.windowWidth = window.innerWidth;
                    this.windowHeight = window.innerHeight;

                    if (this.windowWidth - this.clickCoordsX < this.menuWidth) {
                        this.left = this.windowWidth - this.menuWidth + "px";
                    } else {
                        this.left = this.clickCoordsX + "px";
                    }

                    if (this.windowHeight - this.clickCoordsY < this.menuHeight) {
                        this.top = this.windowHeight - this.menuHeight + "px";
                    } else {
                        this.top = this.clickCoordsY + "px";
                    }
                };

                return ContextMenu;
            }());

            _export("ContextMenu", ContextMenu);
        }
    };
});
//# sourceMappingURL=contextMenu.js.map
