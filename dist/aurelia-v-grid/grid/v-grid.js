'use strict';

System.register(['aurelia-framework', './mainMarkup', './mainScrollEvents', './rowMarkup', './rowScrollEvents', './columnMarkup', './htmlCache', './htmlHeightWidth', './viewSlots', './columnBindingContext', './rowDataBinder', './rowClickHandler', './groupingElements', './controller', './loadingScreen', './contextMenu'], function (_export, _context) {
    "use strict";

    var bindable, ViewCompiler, Container, ViewResources, TaskQueue, MainMarkup, MainScrollEvents, RowMarkup, RowScrollEvents, ColumnMarkup, HtmlCache, HtmlHeightWidth, ViewSlots, ColumnBindingContext, RowDataBinder, RowClickHandler, GroupingElements, Controller, LoadingScreen, ContextMenu, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _class2, _temp, VGrid;

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
            ViewCompiler = _aureliaFramework.ViewCompiler;
            Container = _aureliaFramework.Container;
            ViewResources = _aureliaFramework.ViewResources;
            TaskQueue = _aureliaFramework.TaskQueue;
        }, function (_mainMarkup) {
            MainMarkup = _mainMarkup.MainMarkup;
        }, function (_mainScrollEvents) {
            MainScrollEvents = _mainScrollEvents.MainScrollEvents;
        }, function (_rowMarkup) {
            RowMarkup = _rowMarkup.RowMarkup;
        }, function (_rowScrollEvents) {
            RowScrollEvents = _rowScrollEvents.RowScrollEvents;
        }, function (_columnMarkup) {
            ColumnMarkup = _columnMarkup.ColumnMarkup;
        }, function (_htmlCache) {
            HtmlCache = _htmlCache.HtmlCache;
        }, function (_htmlHeightWidth) {
            HtmlHeightWidth = _htmlHeightWidth.HtmlHeightWidth;
        }, function (_viewSlots) {
            ViewSlots = _viewSlots.ViewSlots;
        }, function (_columnBindingContext) {
            ColumnBindingContext = _columnBindingContext.ColumnBindingContext;
        }, function (_rowDataBinder) {
            RowDataBinder = _rowDataBinder.RowDataBinder;
        }, function (_rowClickHandler) {
            RowClickHandler = _rowClickHandler.RowClickHandler;
        }, function (_groupingElements) {
            GroupingElements = _groupingElements.GroupingElements;
        }, function (_controller) {
            Controller = _controller.Controller;
        }, function (_loadingScreen) {
            LoadingScreen = _loadingScreen.LoadingScreen;
        }, function (_contextMenu) {
            ContextMenu = _contextMenu.ContextMenu;
        }],
        execute: function () {
            _export('VGrid', VGrid = (_dec = bindable({ attribute: "v-row-height" }), _dec2 = bindable({ attribute: "v-header-height" }), _dec3 = bindable({ attribute: "v-footer-height" }), _dec4 = bindable({ attribute: "v-panel-height" }), _dec5 = bindable({ attribute: "v-grid-connector" }), _dec6 = bindable({ attribute: "v-multi-select" }), _dec7 = bindable({ attribute: "v-manual-sel" }), _dec8 = bindable({ attribute: "v-theme" }), _dec9 = bindable({ attribute: "v-manual-sel" }), (_class = (_temp = _class2 = function () {
                function VGrid(element, viewCompiler, container, viewResources, taskQueue) {
                    _classCallCheck(this, VGrid);

                    _initDefineProp(this, 'attRowHeight', _descriptor, this);

                    _initDefineProp(this, 'attHeaderHeight', _descriptor2, this);

                    _initDefineProp(this, 'attFooterHeight', _descriptor3, this);

                    _initDefineProp(this, 'attPanelHeight', _descriptor4, this);

                    _initDefineProp(this, 'attGridConnector', _descriptor5, this);

                    _initDefineProp(this, 'attMultiSelect', _descriptor6, this);

                    _initDefineProp(this, 'attManualSelection', _descriptor7, this);

                    _initDefineProp(this, 'attTheme', _descriptor8, this);

                    _initDefineProp(this, 'attManualSelection', _descriptor9, this);

                    this.element = element;
                    this.viewCompiler = viewCompiler;
                    this.container = container;
                    this.viewResources = viewResources;
                    this.taskQueue = taskQueue;

                    this.dragDropAttributeSharedContext = {};
                    this.resizeAttributeSharedContext = {};

                    this.colConfig = [];
                    this.newGrid = true;

                    this.controller = new Controller(this);
                    this.htmlCache = new HtmlCache(element);

                    this.htmlHeightWidth = new HtmlHeightWidth(element);
                    this.viewSlots = new ViewSlots(element);
                    this.columnBindingContext = new ColumnBindingContext(this.controller);
                    this.rowDataBinder = new RowDataBinder(element, this.controller);
                    this.mainMarkup = new MainMarkup(element, viewCompiler, container, viewResources, this.htmlHeightWidth, this.viewSlots);
                    this.mainScrollEvents = new MainScrollEvents(element, this.htmlCache);
                    this.rowMarkup = new RowMarkup(element, this.htmlCache);
                    this.rowScrollEvents = new RowScrollEvents(element, this.htmlCache);
                    this.rowClickHandler = new RowClickHandler(element, this.htmlCache);
                    this.columnMarkup = new ColumnMarkup(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
                    this.groupingElements = new GroupingElements(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
                    this.loadingScreen = new LoadingScreen(element, viewCompiler, container, viewResources, this.viewSlots);
                    this.contextMenu = new ContextMenu(viewCompiler, container, viewResources, this.viewSlots);
                }

                VGrid.prototype.bind = function bind(bindingContext, overrideContext) {
                    this.bindingContext = bindingContext;
                    this.overrideContext = overrideContext;

                    this.attRowHeight = this.attRowHeight ? this.attRowHeight * 1 : 25;
                    this.attHeaderHeight = this.attHeaderHeight ? this.attHeaderHeight * 1 : 25;
                    this.attFooterHeight = this.attFooterHeight ? this.attFooterHeight * 1 : 25;
                    this.attPanelHeight = this.attPanelHeight ? this.attPanelHeight * 1 : 25;
                    this.attMultiSelect = this.attMultiSelect ? this.attMultiSelect === "true" ? true : false : null;
                    this.attManualSelection = this.attManualSelection ? this.attManualSelection === "true" ? true : false : null;
                    this.attGridConnector.vGrid = this;
                    this.attTheme = this.attTheme || "avg-default";

                    this.element.classList.add(this.attTheme);
                };

                VGrid.prototype.unbind = function unbind() {
                    this.newGrid = false;

                    this.viewSlots.unbindAndDetachColumns();
                };

                VGrid.prototype.attached = function attached() {
                    if (this.newGrid) {
                        this.controller.getContext();
                        this.controller.createGrid();
                        this.controller.addEventListeners();
                    }

                    this.viewSlots.bindAndAttachColumns(this.overrideContext, this.columnBindingContext);

                    this.attGridConnector.gridCreated(this.controller);
                };

                return VGrid;
            }(), _class2.inject = [Element, ViewCompiler, Container, ViewResources, TaskQueue], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'attRowHeight', [_dec], {
                enumerable: true,
                initializer: null
            }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'attHeaderHeight', [_dec2], {
                enumerable: true,
                initializer: null
            }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'attFooterHeight', [_dec3], {
                enumerable: true,
                initializer: null
            }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'attPanelHeight', [_dec4], {
                enumerable: true,
                initializer: null
            }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'attGridConnector', [_dec5], {
                enumerable: true,
                initializer: null
            }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'attMultiSelect', [_dec6], {
                enumerable: true,
                initializer: null
            }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'attManualSelection', [_dec7], {
                enumerable: true,
                initializer: null
            }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'attTheme', [_dec8], {
                enumerable: true,
                initializer: null
            }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'attManualSelection', [_dec9], {
                enumerable: true,
                initializer: null
            })), _class)));

            _export('VGrid', VGrid);
        }
    };
});
//# sourceMappingURL=v-grid.js.map
