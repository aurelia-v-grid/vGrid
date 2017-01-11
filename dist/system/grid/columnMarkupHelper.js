System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var ColumnMarkupHelper;
    return {
        setters: [],
        execute: function () {
            ColumnMarkupHelper = (function () {
                function ColumnMarkupHelper() {
                }
                ColumnMarkupHelper.prototype.generate = function (colConfig) {
                    var type = null;
                    if (colConfig && colConfig.length > 0) {
                        type = 'typeHtml';
                    }
                    if (!type) {
                        throw new Error('column setup missing');
                    }
                    this.processColumns(colConfig);
                };
                ColumnMarkupHelper.prototype.processColumns = function (array) {
                    var _this = this;
                    array.forEach(function (col, index) {
                        if (!col.colField && !col.colRowTemplate) {
                            if (col.colType !== 'selection') {
                                throw new Error('colField is not set on column' + index);
                            }
                        }
                        col.colType = col.colType || 'text';
                        col.colFilterTop = col.colFilterTop || false;
                        col.colHeaderName = col.colHeaderName || _this.getAttribute(col.colField, true);
                        col.colWidth = col.colWidth || 100;
                        col.colCss = col.colCss || '';
                        col.colField = _this.checkAttribute(col.colField);
                        _this.createHeaderTemplate(col);
                        _this.createRowTemplate(col);
                        if (col.colRowTemplate) {
                            col.__colRowTemplateGenerated = col.colRowTemplate;
                        }
                        if (col.colHeaderTemplate) {
                            col.__colHeaderTemplateGenerated = col.colHeaderTemplate;
                        }
                    });
                };
                ColumnMarkupHelper.prototype.createHeaderTemplate = function (col) {
                    if (!col.colHeaderTemplate) {
                        var inputHeader = void 0;
                        var labelHeader = void 0;
                        switch (col.colType) {
                            case 'selection':
                                labelHeader = '';
                                inputHeader = "<input \n            class=\"avg-row-checkbox-100\" \n            v-selection=\"type:header;selected.bind:selected\" \n            type=\"checkbox\">";
                                break;
                            case 'image':
                                inputHeader = '<p class="avg-label-top"></p>';
                                if (!col.colFilterTop) {
                                    col.colFilter = 'x';
                                }
                                labelHeader = this.createLabelMarkup(col);
                                break;
                            default:
                                inputHeader = this.createInputHeaderMarkup(col);
                                labelHeader = this.createLabelMarkup(col);
                                break;
                        }
                        if (col.colFilterTop) {
                            col.__colHeaderTemplateGenerated = inputHeader + labelHeader;
                        }
                        else {
                            col.__colHeaderTemplateGenerated = labelHeader + inputHeader;
                        }
                    }
                };
                ColumnMarkupHelper.prototype.createRowTemplate = function (col) {
                    if (!col.colRowTemplate) {
                        switch (col.colType) {
                            case 'selection':
                                col.colRowTemplate = "<input \n            v-key-move \n            class=\"avg-row-checkbox-100\"  \n            v-selection=\"type:row;selected.bind:selected\" \n            type=\"checkbox\" >";
                                break;
                            case 'image':
                                this.createImageRowMarkup(col);
                                break;
                            default:
                                this.createInputRowMarkup(col);
                                break;
                        }
                    }
                };
                ColumnMarkupHelper.prototype.getAttribute = function (value, capitalize) {
                    var returnValue = value || 'missing!';
                    if (value) {
                        value = value.replace('rowRef.', '');
                        value = value.replace('tempRef.', '');
                        var newValue = '';
                        var done = false;
                        for (var x = 0; x < value.length; x++) {
                            var letter = value.charAt(x);
                            if (!done && letter !== ' ' && letter !== '&' && letter !== '|' && letter !== ':') {
                                newValue = newValue + letter;
                            }
                            else {
                                done = true;
                            }
                        }
                        if (capitalize) {
                            returnValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
                        }
                        else {
                            returnValue = newValue;
                        }
                    }
                    return returnValue;
                };
                ;
                ColumnMarkupHelper.prototype.checkAttribute = function (attribute) {
                    var value = attribute;
                    if (attribute) {
                        if (attribute.indexOf('rowRef') === -1 && attribute.indexOf('tempRef') === -1) {
                            value = 'rowRef.' + attribute;
                        }
                    }
                    return value;
                };
                ColumnMarkupHelper.prototype.createImageRowMarkup = function (col) {
                    var classNames = 'class="avg-image-round"';
                    var attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
                    var css = col.colCss ? "css=\"" + col.colCss + "\"" : '';
                    var imageFix = "v-image-fix.bind=\"" + col.colField + "\"";
                    col.__colRowTemplateGenerated = "<image " + css + " " + classNames + " " + imageFix + " " + attributeRow + ">";
                };
                ColumnMarkupHelper.prototype.createInputRowMarkup = function (col) {
                    var colClass = "class=\"" + (col.colType === 'checkbox' ? 'avg-row-checkbox-100' : 'avg-row-input') + "\"";
                    var colType = "type=\"" + col.colType + "\"";
                    var colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';
                    var colRowMenu = col.colRowMenu ? "v-menu=\"" + col.colRowMenu + "\"" : '';
                    var colCss = col.colCss ? "css=\"" + col.colCss + "\"" : '';
                    if (col.colType === 'checkbox') {
                        col.__colRowTemplateGenerated = "<input \n        " + colCss + " \n        " + colClass + " \n        " + colType + " \n        " + colAddRowAttributes + " \n        " + colRowMenu + "  \n        checked.bind=\"" + col.colField + "\">";
                    }
                    else {
                        col.__colRowTemplateGenerated = "<input \n        " + colCss + " \n        " + colClass + " \n        " + colType + " \n        " + colRowMenu + "  \n        " + colAddRowAttributes + "  \n        value.bind=\"" + col.colField + "\">";
                    }
                };
                ColumnMarkupHelper.prototype.createInputHeaderMarkup = function (col) {
                    var markup;
                    if (col.colFilter) {
                        var type = "type=\"" + col.colType + "\"";
                        var filter = col.colFilter ? "v-filter=\"" + col.colFilter + "\"" : '';
                        var colAddFilterAttributes = col.colAddFilterAttributes ? col.colAddFilterAttributes : '';
                        var classNames = '';
                        if (col.colType === 'checkbox') {
                            classNames = "class=\"" + (col.colFilterTop ? 'avg-row-checkbox-50' : 'avg-row-checkbox-50') + "\"";
                        }
                        else {
                            classNames = "class=\"" + (col.colFilterTop ? 'avg-header-input-top' : 'avg-header-input-bottom') + "\"";
                        }
                        var colRowMenu = col.colFilterMenu ? "v-menu=\"" + col.colFilterMenu + "\"" : '';
                        markup = "<input " + colRowMenu + " " + classNames + " " + colAddFilterAttributes + " " + type + " " + filter + "\">";
                    }
                    else {
                        markup = '';
                    }
                    return markup;
                };
                ColumnMarkupHelper.prototype.createLabelMarkup = function (col) {
                    var filterClass = col.colFilter ? "" + (col.colFilterTop ? 'avg-label-bottom' : 'avg-label-top') : 'avg-label-full';
                    var dragDropClass = col.colDragDrop ? 'avg-vGridDragHandle' : '';
                    var classname = "class=\"" + dragDropClass + " " + filterClass + "\"";
                    var colAddLabelAttributes = col.colAddLabelAttributes ? col.colAddLabelAttributes : '';
                    var sort = col.colSort ? "v-sort=\"" + col.colSort + "\"" : '';
                    var colLabelMenu = col.colLabelMenu ? "v-menu=\"" + col.colLabelMenu + "\"" : '';
                    var colDragDrop = col.colDragDrop !== 'false' ? "v-drag-drop-col=\"" + col.colDragDrop + "\"" : '';
                    var colResizeable = col.colResizeable !== 'false' ? "v-resize-col" : '';
                    var extraAttributes = colDragDrop + " " + colResizeable + " " + colLabelMenu;
                    return "<p \n      " + extraAttributes + " \n      " + classname + " \n      " + sort + " \n      " + colAddLabelAttributes + ">\n      " + col.colHeaderName + "\n      </p>";
                };
                return ColumnMarkupHelper;
            }());
            exports_1("ColumnMarkupHelper", ColumnMarkupHelper);
        }
    };
});

//# sourceMappingURL=columnMarkupHelper.js.map
