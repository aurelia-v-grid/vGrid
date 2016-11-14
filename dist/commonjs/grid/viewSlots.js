"use strict";
var ViewSlots = (function () {
    function ViewSlots() {
        this.leftRowViewSlots = [];
        this.mainRowViewSlots = [];
        this.rightRowViewSlots = [];
        this.groupRowViewSlots = [];
        this.leftHeaderViewSlot;
        this.mainHeaderViewSlot;
        this.rightHeaderViewSlot;
        this.mainViewSlot;
        this.loadingScreenViewSlot;
        this.groupingViewSlots = [];
        this.contextMenu;
    }
    ViewSlots.prototype.bindAndAttachColumns = function (overrideContext, columnBindingContext) {
        var context = {};
        var parentOverrideContext = {
            bindingContext: columnBindingContext,
            parentOverrideContext: overrideContext
        };
        for (var i = 0; i < this.groupRowViewSlots.length; i++) {
            context = {};
            this.leftRowViewSlots[i].bind(context, {
                bindingContext: context,
                parentOverrideContext: parentOverrideContext
            });
            this.leftRowViewSlots[i].attached();
            this.mainRowViewSlots[i].bind(context, {
                bindingContext: context,
                parentOverrideContext: parentOverrideContext
            });
            this.mainRowViewSlots[i].attached();
            this.rightRowViewSlots[i].bind(context, {
                bindingContext: context,
                parentOverrideContext: parentOverrideContext
            });
            this.rightRowViewSlots[i].attached();
            this.groupRowViewSlots[i].bind(context, {
                bindingContext: context,
                parentOverrideContext: parentOverrideContext
            });
            this.groupRowViewSlots[i].attached();
        }
        this.leftHeaderViewSlot.bind(context, {
            bindingContext: context,
            parentOverrideContext: parentOverrideContext
        });
        this.leftHeaderViewSlot.attached();
        this.mainHeaderViewSlot.bind(context, {
            bindingContext: context,
            parentOverrideContext: parentOverrideContext
        });
        this.mainHeaderViewSlot.attached();
        this.rightHeaderViewSlot.bind(context, {
            bindingContext: context,
            parentOverrideContext: parentOverrideContext
        });
        this.rightHeaderViewSlot.attached();
    };
    ViewSlots.prototype.unbindAndDetachColumns = function () {
        for (var i = 0; i < this.groupRowViewSlots.length; i++) {
            this.leftRowViewSlots[i].unbind();
            this.leftRowViewSlots[i].detached();
            this.mainRowViewSlots[i].unbind();
            this.mainRowViewSlots[i].detached();
            this.rightRowViewSlots[i].unbind();
            this.rightRowViewSlots[i].detached();
            this.groupRowViewSlots[i].unbind();
            this.groupRowViewSlots[i].detached();
        }
        this.leftHeaderViewSlot.unbind();
        this.leftHeaderViewSlot.detached();
        this.mainHeaderViewSlot.unbind();
        this.mainHeaderViewSlot.detached();
        this.rightHeaderViewSlot.unbind();
        this.rightHeaderViewSlot.detached();
    };
    return ViewSlots;
}());
exports.ViewSlots = ViewSlots;

//# sourceMappingURL=viewSlots.js.map
