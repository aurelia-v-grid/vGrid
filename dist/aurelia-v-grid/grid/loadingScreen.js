'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var ViewSlot, LoadingScreen;

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
      _export('LoadingScreen', LoadingScreen = function () {
        function LoadingScreen(element, viewCompiler, container, viewResources, viewSlots, overrideContext) {
          _classCallCheck(this, LoadingScreen);

          this.element = element;
          this.viewSlots = viewSlots;
          this.viewCompiler = viewCompiler;
          this.container = container;
          this.overrideContext = overrideContext;
          this.viewResources = viewResources;
          this.loading = false;
          this.loadingMessage = "Loading";
        }

        LoadingScreen.prototype.init = function init() {

          var loadingScreentHtml = ['<div class="avg-overlay" if.bind="loading">', '</div>', '<div if.two-way="loading" class="avg-progress-indicator">', '<div class="avg-progress-bar" role="progressbar" style="width:100%">', '<span>${ loadingMessage }</span>', '</div>', '</div>'];

          var viewFactory = this.viewCompiler.compile('<template>' + loadingScreentHtml.join("") + '</template>', this.viewResources);
          var view = viewFactory.create(this.container);
          var loadingScreenViewSlot = new ViewSlot(this.element, true);
          loadingScreenViewSlot.add(view);

          loadingScreenViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.overrideContext
          });
          loadingScreenViewSlot.attached();

          this.viewSlots.loadingScreenViewSlot = loadingScreenViewSlot;
        };

        LoadingScreen.prototype.enable = function enable(msg, collectionLength) {
          var _this = this;

          return new Promise(function (resolve, reject) {
            _this.loading = collectionLength ? collectionLength > 10000 ? true : false : false;
            _this.loadingMessage = msg || "Loading";
            setTimeout(function () {
              resolve();
            });
          });
        };

        LoadingScreen.prototype.disable = function disable() {
          var _this2 = this;

          return new Promise(function (resolve, reject) {
            _this2.loading = false;
            setTimeout(function () {
              resolve();
            });
          });
        };

        return LoadingScreen;
      }());

      _export('LoadingScreen', LoadingScreen);
    }
  };
});
//# sourceMappingURL=loadingScreen.js.map
