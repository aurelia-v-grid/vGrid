System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ContextMenu;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            ContextMenu = (function () {
                function ContextMenu(viewCompiler, container, viewResources, viewSlots) {
                    this.menuStrings = {
                        close: 'Close',
                        pinLeft: 'Pin left',
                        pinRight: 'Pin Right',
                        groupBy: 'Group By',
                        sortAscending: 'Sort Ascending',
                        sortDescending: 'Sort Descending',
                        showAll: 'Show All',
                        clearCurrent: 'Clear Current',
                        clearAll: 'Clear All',
                        chooseOperator: 'Choose Operator',
                        back: 'Back',
                        equals: 'Equals',
                        lessThanOrEqual: 'Less than or equal',
                        greaterThanOrEqual: 'Greater than or equal',
                        lessThan: 'Less than',
                        greaterThan: 'Greater than',
                        contains: 'Contains',
                        notEqualTo: 'Not equal to',
                        doesNotContain: 'Does not contain',
                        beginsWith: 'Begins with',
                        endsWith: 'Ends with'
                    };
                    this.viewCompiler = viewCompiler;
                    this.container = container;
                    this.viewResources = viewResources;
                    this.viewSlots = viewSlots;
                    this.setDefaults();
                }
                ContextMenu.prototype.setDefaults = function () {
                    this.top = 0;
                    this.left = 0;
                    this.show = false;
                    this.pinnedMenu = false;
                    this.sortMenu = false;
                    this.filterMainMenu = false;
                    this.filterOptionsMenu = false;
                };
                ContextMenu.prototype.init = function (customMenuTemplates, overrideContext) {
                    this.overrideContext = overrideContext;
                    var viewFactory = this.viewCompiler.compile("<template>" + this.menuHtml(customMenuTemplates) + "</template>", this.viewResources);
                    var view = viewFactory.create(this.container);
                    var viewSlot = new aurelia_framework_1.ViewSlot(document.body, true);
                    viewSlot.add(view);
                    this.viewSlots.contextMenu = viewSlot;
                    viewSlot.bind(this, { bindingContext: this, parentOverrideContext: this.overrideContext });
                    viewSlot.attached();
                };
                ContextMenu.prototype.openMenu = function (options) {
                    this.left = options.left;
                    this.top = options.top;
                    this.pinnedMenu = options.pinned ? true : false;
                    this.sortMenu = options.sort ? true : false;
                    this.groupbyMenu = options.groupby ? true : false;
                    this.filterMainMenu = options.filter ? true : false;
                    this.show = true;
                    this.callback = options.callback;
                };
                ContextMenu.prototype.menuClick = function (type, option, event) {
                    switch (true) {
                        case type === 'filter' && option === 'options':
                            this.showFilterOptions();
                            break;
                        case type === 'filterOption' && option === 'Back':
                            this.hideFilterOptions();
                            break;
                        case type === 'close' && option === 'true':
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
                ContextMenu.prototype.updateMenuStrings = function (stringObj) {
                    var _this = this;
                    var keys = Object.keys(this.menuStrings);
                    keys.forEach(function (key) {
                        if (stringObj[key]) {
                            _this.menuStrings[key] = stringObj[key];
                        }
                    });
                };
                ContextMenu.prototype.showFilterOptions = function () {
                    this.filterOptionsMenu = true;
                };
                ContextMenu.prototype.hideFilterOptions = function () {
                    this.filterOptionsMenu = false;
                };
                ContextMenu.prototype.menuHtml = function (customMenuTemplates) {
                    var menuTop = "<nav css=\"top:" + '${top}px;left:${left}px' + "\" if.bind=\"show\" class=\"avg-default avg-menu\">";
                    var menuClose = customMenuTemplates.close ||
                        "<ul if.bind=\"show\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('close','true')\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.close + "\n                </p>\n                </li>\n            </ul>";
                    var menuPinned = customMenuTemplates.pinned ||
                        "<ul if.bind=\"pinnedMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','left', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.pinLeft + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','right', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.pinRight + "\n                </p>\n                </li>\n            </ul>";
                    var menuGroupby = customMenuTemplates.groupby ||
                        "<ul if.bind=\"groupbyMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('groupby','groupby', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.groupBy + "\n                </p>\n                </li>\n            </ul>";
                    var menuSort = customMenuTemplates.sort ||
                        "<ul if.bind=\"sortMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','asc', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.sortAscending + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','desc', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.sortDescending + "\n                </p>\n                </li>\n            </ul>";
                    var menuFilter = customMenuTemplates.filter ||
                        "<ul if.bind=\"filterMainMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','showall', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.showAll + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clear', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.clearCurrent + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clearall', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.clearAll + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','options', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.chooseOperator + "\n                </p>\n                </li>\n            </ul>";
                    var menuFilterOptions = customMenuTemplates.filterOptions ||
                        "<ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','Back', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.back + "\n                </p>\n                </li>\n            </ul>\n            <ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.equals + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.lessThanOrEqual + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.greaterThanOrEqual + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.lessThan + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.greaterThan + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.contains + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.notEqualTo + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!*', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.doesNotContain + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*=', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.beginsWith + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=*', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"\"></i> " + this.menuStrings.endsWith + "\n                </p>\n                </li>\n            </ul>";
                    var menuBottom = "</nav>";
                    var menuAll = customMenuTemplates.all || [
                        menuTop,
                        menuClose,
                        menuPinned,
                        menuGroupby,
                        menuSort,
                        menuFilter,
                        menuFilterOptions,
                        menuBottom,
                    ].join('');
                    return menuAll;
                };
                return ContextMenu;
            }());
            exports_1("ContextMenu", ContextMenu);
        }
    };
});

//# sourceMappingURL=contextMenu.js.map
