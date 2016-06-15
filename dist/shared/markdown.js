'use strict';

System.register(['aurelia-framework', 'showdown', 'google/code-prettify/loader/run_prettify', 'showdown-prettify'], function (_export, _context) {
  "use strict";

  var bindable, noView, inject, customElement, Loader, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, AuMarkdown;

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
      noView = _aureliaFramework.noView;
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      Loader = _aureliaFramework.Loader;
    }, function (_showdown) {}, function (_googleCodePrettifyLoaderRun_prettify) {}, function (_showdownPrettify) {}],
    execute: function () {
      _export('AuMarkdown', AuMarkdown = (_dec = customElement('au-markdown'), _dec2 = inject(Element, Loader), _dec(_class = noView(_class = _dec2(_class = (_class2 = function () {
        function AuMarkdown(element, loader) {
          _classCallCheck(this, AuMarkdown);

          _initDefineProp(this, 'url', _descriptor, this);

          this.element = element;
          this.loader = loader;
          this.converter = new showdown.Converter({ extensions: ['prettify'] });
        }

        AuMarkdown.prototype.urlChanged = function urlChanged() {
          var _this = this;

          if (this.url) {
            this.loader.loadText(this.url).then(function (text) {
              _this.element.innerHTML = _this.converter.makeHtml(text);
              PR.prettyPrint();
            }).then(function () {
              var event = new CustomEvent('loaded', {
                bubbles: true
              });
              _this.element.dispatchEvent(event);
            });
          } else {
            this.element.innerHTML = '';
          }
        };

        return AuMarkdown;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'url', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class));

      _export('AuMarkdown', AuMarkdown);
    }
  };
});
//# sourceMappingURL=markdown.js.map
