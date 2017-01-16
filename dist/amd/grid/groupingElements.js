define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    var GroupContext = (function () {
        function GroupContext(name, field, groupingElements) {
            this.name = name;
            this.field = field;
            this.groupingElements = groupingElements;
        }
        GroupContext.prototype.remove = function () {
            this.groupingElements.removeGroup(this.field);
            this.groupingElements.removeFromGrouping(this.field);
        };
        return GroupContext;
    }());
    var GroupingElements = (function () {
        function GroupingElements(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
            this.element = element;
            this.htmlCache = htmlCache;
            this.viewSlots = viewSlots;
            this.viewCompiler = viewCompiler;
            this.container = container;
            this.viewResources = viewResources;
            this.columnBindingContext = columnBindingContext;
            this.groupContext = {};
            this.lastAdded = null;
        }
        GroupingElements.prototype.getGroups = function () {
            var x = [];
            for (var i in this.groupContext) {
                if (i) {
                    x.push(i);
                }
            }
            return x;
        };
        GroupingElements.prototype.init = function (controller, colGroupElement) {
            this.controller = controller;
            this.avgTopPanel = this.htmlCache.avg_top_panel;
            this.colGroupElement = colGroupElement;
        };
        GroupingElements.prototype.addGroup = function (name, field) {
            if (!this.groupContext[field]) {
                this.lastAdded = field;
                this.groupContext[field] = new GroupContext(name, field, this);
                var viewMarkup = this.colGroupElement ||
                    "<div class=\"avg-grouping\">  \n          <p class=\"avg-grouping-element\" v-sort=\"field.bind:field\">" + name + " \n            <i><svg click.delegate=\"remove()\" class=\"icon iconhidden\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n              <path d=\"M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z\"/>\n            </svg></i>\n          </p>\n         </div>";
                var viewFactory = this.viewCompiler.compile("<template>" + viewMarkup + "</template>", this.viewResources);
                var view = viewFactory.create(this.container);
                var viewSlot = new aurelia_framework_1.ViewSlot(this.avgTopPanel, true);
                viewSlot.add(view);
                this.groupContext[field].viewSlot = viewSlot;
                this.viewSlots.groupingViewSlots.push(this.groupContext[field]);
            }
            this.groupContext[field].viewSlot.bind(this.groupContext[field]);
            this.groupContext[field].viewSlot.attached();
        };
        GroupingElements.prototype.removeGroup = function (field) {
            if (field) {
                if (this.groupContext[field] !== null) {
                    this.groupContext[field].viewSlot.unbind();
                    this.groupContext[field].viewSlot.detached();
                    this.groupContext[field].viewSlot.removeAll();
                    this.groupContext[field] = null;
                }
            }
            else {
                if (this.lastAdded) {
                    if (this.groupContext[this.lastAdded] !== null) {
                        this.groupContext[this.lastAdded].viewSlot.unbind();
                        this.groupContext[this.lastAdded].viewSlot.detached();
                        this.groupContext[this.lastAdded].viewSlot.removeAll();
                        this.groupContext[this.lastAdded] = null;
                        this.lastAdded = null;
                    }
                }
            }
        };
        GroupingElements.prototype.addToGrouping = function () {
            if (this.lastAdded) {
                var toAddField = this.groupContext[this.lastAdded].field;
                var toAddTitle = this.groupContext[this.lastAdded].name;
                this.controller.addToGrouping({ field: toAddField, title: toAddTitle });
                this.lastAdded = null;
            }
        };
        GroupingElements.prototype.removeFromGrouping = function (field) {
            this.controller.removeFromGrouping(field);
        };
        return GroupingElements;
    }());
    exports.GroupingElements = GroupingElements;
});

//# sourceMappingURL=groupingElements.js.map
