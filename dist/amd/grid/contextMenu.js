define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
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
                "<ul if.bind=\"show\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('close','true')\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm.9882812.9863282l6.0332032 5.0371094 6.0332036-5.0371094v1.9882812L9.2128906 8.0234375l4.8417974 4.0429685v1.988282L8.0214844 9.015625l-6.0332032 5.039063v-1.988282l4.8417969-4.0429685-4.8417969-4.0449219V1.9902344z\"/>\n                      </svg> " + this.menuStrings.close + "\n                </p>\n                </li>\n            </ul>";
            var menuPinned = customMenuTemplates.pinned ||
                "<ul if.bind=\"pinnedMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','left', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.pinLeft + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','right', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> " + this.menuStrings.pinRight + "\n                </p>\n                </li>\n            </ul>";
            var menuGroupby = customMenuTemplates.groupby ||
                "<ul if.bind=\"groupbyMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('groupby','groupby', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                     <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm.9882812 1.9804688H14.009766v2.0117188H1.9882812V2.984375zm3.0058594 3.0058594h9.0156254v1.9882812H4.9941406V5.9902344zm-.0273437 3.0058594h9.0156251v1.9882812H4.9667969V8.9960938zm.0546875 3.0214842h9.0156246v1.988281H5.0214844v-1.988281z\"/>\n                      </svg> " + this.menuStrings.groupBy + "\n                </p>\n                </li>\n            </ul>";
            var menuSort = customMenuTemplates.sort ||
                "<ul if.bind=\"sortMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','asc', $event)\" class=\"avg-menu__link\">\n                       <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm7.0273438 3.9511719l6.1171872 5.9746099-.039062.039062H2.0683594l5.9589844-6.0136719z\"/>\n                      </svg> " + this.menuStrings.sortAscending + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','desc', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 14.986328V1.0039062h14.009766V14.986328H1zm7.0273438-3.951172l6.1171872-5.9746098-.03906-.039062H2.0683614l5.9589844 6.0136718z\"/>\n                    </svg> " + this.menuStrings.sortDescending + "\n                </p>\n                </li>\n            </ul>";
            var menuFilter = customMenuTemplates.filter ||
                "<ul if.bind=\"filterMainMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','showall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm6.984375.9648438a5.9531245 6.0156245 0 0 1 2.59375.609375L8.375 3.4375 6.03125 5.15625l-.0917969 1.0605469L5.84375 6.15625 4.3867188 4.7519531 5.921875 6.4277344 5.8125 7.6875l-.1308594 2.1152344 1.5175782-1.9785156 3.2558592 3.5566402L9.09375 9.1875 8.8125 7.78125l-1.1328125-.5839844 3.3535155-4.3710937a5.9531245 6.0156245 0 0 1 1.683594 1.515625L11.09375 6.25l-.53125 3.4375-.009766.1621094 2.361328-5.2285156A5.9531245 6.0156245 0 0 1 13.9375 7.984375a5.9531245 6.0156245 0 0 1-2.267578 4.724609l-1.214844-1.328125.169922.275391 1.017578 1.072266A5.9531245 6.0156245 0 0 1 7.984375 14a5.9531245 6.0156245 0 0 1-4.0351562-1.601562L4.5 12.03125l1.15625-1.8125.0253906-.4160156-1.8828125 2.4550776A5.9531245 6.0156245 0 0 1 2.03125 7.984375a5.9531245 6.0156245 0 0 1 1.5351562-4.0214844l.8203126.7890625-.7714844-.8417969A5.9531245 6.0156245 0 0 1 7.984375 1.96875zm2.568359 7.8808594l-.365234.8066406H10.5l.052734-.8066406z\"/>\n                      </svg> " + this.menuStrings.showAll + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clear', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm7.015625.9648438A6.015625 6.03125 0 0 1 14.03125 8a6.015625 6.03125 0 0 1-6.015625 6.03125A6.015625 6.03125 0 0 1 2 8a6.015625 6.03125 0 0 1 6.015625-6.03125z\"/>\n                      </svg> " + this.menuStrings.clearCurrent + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clearall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm7.015625.9648438A6.015625 6.03125 0 0 1 14.03125 8a6.015625 6.03125 0 0 1-6.015625 6.03125A6.015625 6.03125 0 0 1 2 8a6.015625 6.03125 0 0 1 6.015625-6.03125z\"/>\n                      </svg> " + this.menuStrings.clearAll + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','options', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M15.009766 1.0039062V14.986328H1V1.0039062h14.009766zM1.91211 1.9453125v1.9003906l7.4531248 3.1835938H1.955078v1.9433593h7.7207036L1.91211 12.287109V14.1875l12.109375-5.1699219V7.1171875L1.91211 1.9453125z\"/>\n                      </svg> " + this.menuStrings.chooseOperator + "\n                </p>\n                </li>\n            </ul>";
            var menuFilterOptions = customMenuTemplates.filterOptions ||
                "<ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','Back', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm13.097656.9414063v1.9003906L6.6445312 7.0292969h7.4101568v1.9433593H6.3339844l7.7636716 3.3144528V14.1875L1.9882812 9.0175781V7.1171875l12.1093748-5.171875z\"/>\n                      </svg> " + this.menuStrings.back + "\n                </p>\n                </li>\n            </ul>\n            <ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zM2 5h11.96875v2H2V5zm0 4h11.96875v2H2V9z\"/>\n                      </svg> " + this.menuStrings.equals + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm12.970703.9492188v2L5.9121094 5.9921875l8.0585936 2.0371094v2.0000001L2.0019531 7.0019531V4.9804688L13.970703 1.953125zM1.96875 10.96875H13.9375v2H1.96875v-2z\"/>\n                      </svg> " + this.menuStrings.lessThanOrEqual + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M15.009766 1.0039062V14.986328H1V1.0039062h14.009766zM2.039063 1.953125v2l8.058594 2.0390625-8.058594 2.0371094v2.0000001l11.96875-3.0273439V4.9804694L2.039063 1.953125zm12.001953 9.015625H2.072266v2h11.96875v-2z\"/>\n                      </svg> " + this.menuStrings.greaterThanOrEqual + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zm13.103516 2.9375v2L6.0449219 7.9804688l8.0585941 2.0371092v2L2.1347656 8.9902344V6.96875L14.103516 3.9414062z\"/>\n                      </svg> " + this.menuStrings.lessThan + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M15.009766 1.0039062V14.986328H1V1.0039062h14.009766zm-13.103516 2.9375v2l8.0585941 2.0390626L1.90625 10.017578v2L13.875 8.9902344V6.9687508L1.90625 3.9414062z\"/>\n                      </svg> " + this.menuStrings.greaterThan + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zM7.5410156 4.015625H8.71875l-.0644531 3.0859375 3.3125001-1.8222656.583984.9453125-3.4667966 1.7636718 3.4667966 1.7792969-.583984.9453129-3.3027345-1.8320316.0546875 3.0957026H7.5410156l.0449219-3.0957026-3.2929687 1.8398436-.59375-.9453124 3.4765624-1.7792968-3.4765624-1.7792969.59375-.9453125 3.3027343 1.8300781-.0546875-3.0859375z\"/>\n                      </svg> " + this.menuStrings.contains + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zM14 2.09375v2.2324219L13.175781 5h.792969v2h-3.244141L8.2753906 9H13.96875v2H5.8261719L2 14.125v-2.232422L3.09375 11H2V9h3.5429688l2.4492187-2H2V5h8.441406L14 2.09375z\"/>\n                      </svg> " + this.menuStrings.notEqualTo + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zM7.5410156 4.015625H8.71875L8.6699219 6.375H7.5820312l-.0410156-2.359375zM4.2929688 5.2714844L6.2851562 6.375H4.0078125l-.3085937-.1582031.59375-.9453125zm7.6738282.0078125l.583984.9453125-.294922.1503906H9.9746094l1.9921876-1.0957031zM4.2363281 9.5h2.2421875l-2.1855468 1.220703-.59375-.9453124L4.2363281 9.5zm3.3398438 0h1.0996093l.0429688 2.476562H7.5410156L7.5761719 9.5zm2.203125 0h2.2500001l.521484.2675781-.583984.9453129L9.7792969 9.5z\"/>\n                      </svg> " + this.menuStrings.doesNotContain + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M1 1.0039062V14.986328h14.009766V1.0039062H1zM5.4160156 4.015625H6.59375l-.0644531 3.0859375 3.3125-1.8222656.5839841.9453125-3.4667966 1.7636718 3.4667966 1.7792969-.5839841.9453129-3.3027344-1.8320316.0546875 3.0957026H5.4160156l.0449219-3.0957026-3.2929687 1.8398436-.59375-.9453124 3.4765624-1.7792968-3.4765624-1.7792969.59375-.9453125 3.3027343 1.8300781-.0546875-3.0859375zM11.03125 5h2.9375v2h-2.9375V5zm0 4h2.9375v2h-2.9375V9z\"/>\n                      </svg> " + this.menuStrings.beginsWith + "\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M15.009766 1.0039062V14.986328H1V1.0039062h14.009766zM10.59375 4.015625H9.416016l.064453 3.0859375-3.3125-1.8222656-.583984.9453125 3.4667966 1.7636718L5.583985 9.7675781l.5839841.9453129 3.3027344-1.8320316-.0546875 3.0957026h1.177734l-.04492-3.0957026 3.292969 1.8398436.59375-.9453124-3.476564-1.7792968 3.476562-1.7792969-.59375-.9453125-3.302734 1.8300781.054687-3.0859375zM4.978516 5h-2.9375v2h2.9375V5zm0 4h-2.9375v2h2.9375V9z\"/>\n                      </svg> " + this.menuStrings.endsWith + "\n                </p>\n                </li>\n            </ul>";
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
});

//# sourceMappingURL=contextMenu.js.map
