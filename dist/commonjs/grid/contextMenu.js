var aurelia_framework_1 = require("aurelia-framework");
var ContextMenu = (function () {
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
    ContextMenu.prototype.updateMenuStrings = function (key, text) {
        if (this.menuStrings[key]) {
            this.menuStrings[key] = text;
        }
    };
    ContextMenu.prototype.showFilterOptions = function () {
        this.filterOptionsMenu = true;
    };
    ContextMenu.prototype.hideFilterOptions = function () {
        this.filterOptionsMenu = false;
    };
    ContextMenu.prototype.menuHtml = function (customMenuTemplates) {
        var menuTop = "<div css=\"top:$au{top}px;left:$au{left}px\" if.bind=\"show\" class=\"avg-default avg-menu\">".replace(/\$(au{)/g, '${');
        var menuClose = customMenuTemplates.close ||
            "<ul if.bind=\"show\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('close','true')\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z\"/>\n                      </svg> $au{menuStrings.close}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuPinned = customMenuTemplates.pinned ||
            "<ul if.bind=\"pinnedMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','left', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> $au{menuStrings.pinLeft}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','right', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> $au{menuStrings.pinRight}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuGroupby = customMenuTemplates.groupby ||
            "<ul if.bind=\"groupbyMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('groupby','groupby', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                     <path d=\"M3 4v1h10V4H3zm3.7 2.4v1H13v-1H6.8zm0 2.4v1H13v-1H6.8zm0 2.3v1H13v-1H6.8z\"/>\n                      </svg> $au{menuStrings.groupBy}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuSort = customMenuTemplates.sort ||
            "<ul if.bind=\"sortMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','asc', $event)\" class=\"avg-menu__link\">\n                       <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z\"/>\n                      </svg> $au{menuStrings.sortAscending}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','desc', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z\"/>\n                    </svg> $au{menuStrings.sortDescending}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuFilter = customMenuTemplates.filter ||
            "<ul if.bind=\"filterMainMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','showall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z\"/>\n                      </svg> $au{menuStrings.showAll}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clear', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M4.8 7.5h6.5v1H4.8z\">\n                      </svg> $au{menuStrings.clearCurrent}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clearall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M4.8 7.5h6.5v1H4.8z\">\n                      </svg> $au{menuStrings.clearAll}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','options', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.3 4v1.2L11 7.5H3v1h8l-3.7 2.2V12L13 8.4v-.8L7.3 4z\"/>\n                      </svg> $au{menuStrings.chooseOperator}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuFilterOptions = customMenuTemplates.filterOptions ||
            "<ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','Back', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M8.7 4v1.2L5 7.5h8v1H5l3.7 2.2V12L3 8.4v-1L8.7 4z\"/>\n                      </svg> $au{menuStrings.back}\n                </p>\n                </li>\n            </ul>\n            <ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 7H3V6h10v1zm0 3H3V9h10v1z\"/>\n                      </svg> $au{menuStrings.equals}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 10.3L3 7.5v-.7L13 4v1L5.3 7 13 9.3v1zm0 1.7H3v-1h10v1z\"/>\n                      </svg> $au{menuStrings.lessThanOrEqual}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 7.4L3 10.2v-1l7.7-2L3 5V4l10 2.7v.7zm0 4.5H3v-1h10v1z\"/>\n                      </svg> $au{menuStrings.greaterThanOrEqual}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M3 8.5L13 12v-1.2L5 8l8-2.7V4L3 7.7v1z\"/>\n                      </svg> $au{menuStrings.lessThan}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M13 8L3 12v-1.4l8-3-8-3.2V3l10 4v1z\"/>\n                      </svg> $au{menuStrings.greaterThan}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 9.7l-.7 1L8.6 9v3H7.4V9l-3.6 1.7-.7-1L7 8 3 6.2l.7-1 3.7 2V4h1.3v3l3.6-1.7.7 1L9 8l4 1.7z\"/>\n                      </svg> $au{menuStrings.contains}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 9.8H7.7l-1 2.2H5.7l1-2.2H2.8v-1h4L7.5 7H3V6h5l1-2H10l-1 2H13v1H9L8 9H13v1z\"/>\n                      </svg> $au{menuStrings.notEqualTo}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M5 4V10H4V4h1zm5.5 0v3l2-1.7.5 1L10.7 8 13 9.8l-.4 1-2-2V12h-1l.2-3-2.2 1.7-.3-1L9.5 8 7.3 6.3l.3-1L9.8 7V4h.7zM5 11v1H4v-1h1z\"/>\n                      </svg> $au{menuStrings.doesNotContain}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M5.2 4v3l-2-1.7-.2 1L5 8 3 9.8l.3 1 2-2V12h.6l-.2-3 2 1.8.2-1L6 8l2-1.8-.3-1-2 2L6 4H5zm3 2v1.2H13v-1H8.3zm0 2.8v1H13v-1H8.3z\"/>\n                      </svg> $au{menuStrings.beginsWith}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M10.8 4v3l2-1.8.2 1L11 8l2 1.7-.3 1-2-2V12h-.6l.2-3.2-2 2-.3-1 2-2-2-1.6.3-1 2 2L10 4h.8zm-3 2v1H3V6h4.7zm0 2.7v1H3v-1h4.7z\"/>\n                      </svg> $au{menuStrings.endsWith}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuBottom = "</div>";
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
exports.ContextMenu = ContextMenu;

//# sourceMappingURL=contextMenu.js.map
