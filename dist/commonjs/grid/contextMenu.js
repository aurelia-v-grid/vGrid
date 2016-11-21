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
            "<ul if.bind=\"show\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('close','true')\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M.95507812 1.0351562l6.00976568 6.984375L.95507812 15.005859H2.9550781l5.0097657-5.8222652 5.0117182 5.8222652h2L8.9648438 8.0195312l6.0117182-6.984375h-2L7.9648438 6.8574219 2.9550781 1.0351562H.95507812z\"/>\n                      </svg> " + this.menuStrings.close + "\n                </p>\n                </li>\n            </ul>";
        var menuPinned = customMenuTemplates.pinned ||
            "<ul if.bind=\"pinnedMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','left', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.pinLeft + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','right', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.pinRight + "\n                </p>\n                </li>\n            </ul>";
        var menuGroupby = customMenuTemplates.groupby ||
            "<ul if.bind=\"groupbyMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('groupby','groupby', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                     <path d=\"M1.0117188 1.0117188v1.53125H15.042969v-1.53125H1.0117188zm5.0625 4v1.53125h8.9687502v-1.53125H6.0742188zm-.03125 4.03125v1.5312502h8.9687502V9.0429688H6.0429688zm.03125 3.9687502v1.53125h8.9687502v-1.53125H6.0742188z\"/>\n                      </svg> " + this.menuStrings.groupBy + "\n                </p>\n                </li>\n            </ul>";
        var menuSort = customMenuTemplates.sort ||
            "<ul if.bind=\"sortMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','asc', $event)\" class=\"avg-menu__link\">\n                       <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.2393106 1.00117874C5.1581979 3.33755754 3.0770851 5.6739366.99597235 8.0103152H3.1866173c1.6024163-1.84237835 3.2048325-3.6847569 4.8072488-5.52713536 1.6024163 1.84237846 3.2048329 3.684757 4.8072489 5.52713537h2.190645c-2.081113-2.3363786-4.162226-4.67275766-6.2433384-7.00913646h-1.509111z\"/>\n                      </svg> " + this.menuStrings.sortAscending + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','desc', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.2393106 15.0272644C5.1581979 12.6908856 3.0770851 10.35450654.99597235 8.01812793H3.1866173c1.6024163 1.84237836 3.2048325 3.6847569 4.8072488 5.52713537 1.6024163-1.84237846 3.2048329-3.684757 4.8072489-5.52713537h2.190645c-2.081113 2.3363786-4.162226 4.67275767-6.2433384 7.00913647h-1.509111z\"/>\n                    </svg> " + this.menuStrings.sortDescending + "\n                </p>\n                </li>\n            </ul>";
        var menuFilter = customMenuTemplates.filter ||
            "<ul if.bind=\"filterMainMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','showall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.2617188 3.5429688v3.671875h-3.75v1.53125h3.75v3.7656252h1.53125V8.7460938h3.6875002v-1.53125H8.7929688v-3.671875h-1.53125z\"/>\n                      </svg> " + this.menuStrings.showAll + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clear', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M3.5117202 7.2148452h8.9687468v1.5312476H3.5117202z\"/>\n                      </svg> " + this.menuStrings.clearCurrent + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clearall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M3.5117202 7.2148452h8.9687468v1.5312476H3.5117202z\"/>\n                      </svg> " + this.menuStrings.clearAll + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','options', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M6.9882812.9296875v2.2070313L12.263672 7.203125H1.046875v1.53125h11.246094l-5.3046878 4.089844v2.208984l7.9687498-6.2929686V7.2207031L6.9882812.9296875z\"/>\n                      </svg> " + this.menuStrings.chooseOperator + "\n                </p>\n                </li>\n            </ul>";
        var menuFilterOptions = customMenuTemplates.filterOptions ||
            "<ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','Back', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M9.0156248.9296875v2.2070313L3.740234 7.203125h11.216797v1.53125H3.710937l5.3046878 4.089844v2.208984L1.046875 8.7402344V7.2207031L9.0156248.9296875z\" style=\"line-height:125%\" font-size=\"18.84490776\"/>\n                      </svg> " + this.menuStrings.back + "\n                </p>\n                </li>\n            </ul>\n            <ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M14.9973165 6.5421674H.9646407V4.7496009H14.9973165v1.7925665zm0 4.7054866H.9646407V9.45508786H14.9973165V11.247654z\" font-size=\"23.57954979\"/>\n                      </svg> " + this.menuStrings.equals + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M15.02449935 11.93794336L1.05910702 7.05546163V5.801988L15.02449935.91950593V2.7693905L4.26606455 6.42872477l10.7584348 3.65933437v1.8498842zm0 3.06292343H1.05910702v-1.61738504h13.96539233v1.61738503z\"/>\n                      </svg> " + this.menuStrings.lessThanOrEqual + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M15.03683443 7.06272192L.99777233 11.92376497v-1.84176123L11.8129595 6.4387371.99777233 2.79547066V.95370897l14.0390621 4.86104323v1.24796972zm0 7.91051773H.99777233v-1.6102834h14.0390621v1.6102834z\"/>\n                      </svg> " + this.menuStrings.greaterThanOrEqual + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M1.00328568 8.72509854l13.99996727 6.23879292v-2.18904982L3.96341745 7.97109242l11.0398355-4.80374893V.97829327l-13.99996727 6.238793v1.50801226z\"/>\n                      </svg> " + this.menuStrings.lessThan + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M15.00325395 8.72509854L1.00328627 14.96389146v-2.18904982L12.0431224 7.97109242 1.00328626 3.1673435V.97829327l13.99996768 6.238793v1.50801226z\"/>\n                      </svg> " + this.menuStrings.greaterThan + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M15.01098445 11.0821795l-.92758197 1.65877977-5.24663558-3.2120009.0869604 5.42873362H7.05406984l.07246776-5.42873363-5.23214206 3.22707996-.94207548-1.65877978 5.5220115-3.121521-5.5220115-3.1215216.94207548-1.65877958 5.2466355 3.2120005L7.0540702.99378352H8.9237277l-.10145434 5.41365333 5.26112912-3.1969206.92758197 1.65877956-5.507518 3.09136185 5.507518 3.12152182z\"/>\n                      </svg> " + this.menuStrings.contains + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M14.9973165 11.247654H7.80349968l-1.23052134 3.75318655H4.7626921L5.9932135 11.247654H.96464068V9.49990202h5.60833765L7.566861 6.49735326H.96464067V4.7496009h7.17015324L9.37714712.9964149h1.81028657L9.94508005 4.7496009h5.05223645v1.74775236H9.36531526l-.98205067 3.00254876h6.61405193V11.247654z\" font-size=\"23.57954979\"/>\n                      </svg> " + this.menuStrings.notEqualTo + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M5.2050778.93164062l-.15625 10.23242138h-.939453L3.9648438.93164062h1.240234zm6.7363282.03125l-.04492 5.48046878 2.615234-3.2519532.470703 1.6796876L12.23047 8.03125l2.751953 3.160156-.470703 1.677735-2.607422-3.2656254.03711 5.4960934h-.931641l.04297-5.4960934-2.6152368 3.2519534-.4628906-1.679688 2.7460934-3.160156-2.7460934-3.1308594.4628906-1.6777344 2.6210938 3.2363282-.04883-5.48046878h.93164zM5.1484378 13.050781v2h-1.128906v-2h1.128906z\"/>\n                      </svg> " + this.menuStrings.doesNotContain + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M4.1621094.99414062l.0449218 5.48046878-2.6152343-3.2519532-.4707031 1.6796876L3.8730469 8.0625l-2.7519531 3.160156.4707031 1.677735 2.6074219-3.2656254-.0371094 5.4960934H5.09375l-.0429688-5.4960934 2.6152344 3.2519534.4628906-1.679688-2.7460937-3.160156 2.7460937-3.1308594-.4628906-1.6777344-2.6210937 3.2363282L5.09375.99414062h-.9316406zM8.4355469 4.75v1.7929688h6.5625001V4.75H8.4355469zm0 4.7050781v1.7929689h6.5625001V9.4550781H8.4355469z\"/>\n                      </svg> " + this.menuStrings.beginsWith + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M11.957031.99414062L11.91211 6.4746094l2.615234-3.2519532.470703 1.6796876L12.246094 8.0625l2.751953 3.160156-.470703 1.677735-2.607422-3.2656254.03711 5.4960934h-.93164l.042968-5.4960934-2.6152348 3.2519534-.4628906-1.679688 2.7460934-3.160156-2.7460934-3.1308594.4628906-1.6777344 2.6210938 3.2363282-.04883-5.48046878h.93164zM7.6835939 4.75v1.7929688H1.1210938V4.75h6.5625001zm0 4.7050781v1.7929689H1.1210938V9.4550781h6.5625001z\"/>\n                      </svg> " + this.menuStrings.endsWith + "\n                </p>\n                </li>\n            </ul>";
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
exports.ContextMenu = ContextMenu;

//# sourceMappingURL=contextMenu.js.map
