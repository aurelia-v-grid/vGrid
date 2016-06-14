'use strict';

System.register(['aurelia-framework', 'prism', 'prism/themes/prism.css!'], function (_export, _context) {
  "use strict";

  var inject, bindable, noView, customElement, processContent, TargetInstruction, prism, Loader, _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, AuCode;

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

  function parseCode(element, resources, instruction) {
    instruction.html = dedent(decodeHtml(element.innerHTML));
  }

  function decodeHtml(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  function dedent(str) {
    var match = str.match(/^[ \t]*(?=\S)/gm);
    if (!match) return str;

    var indent = Math.min.apply(Math, match.map(function (el) {
      return el.length;
    }));

    var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return indent > 0 ? str.replace(re, '') : str;
  }
  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
      noView = _aureliaFramework.noView;
      customElement = _aureliaFramework.customElement;
      processContent = _aureliaFramework.processContent;
      TargetInstruction = _aureliaFramework.TargetInstruction;
      Loader = _aureliaFramework.Loader;
    }, function (_prism) {
      prism = _prism.default;
    }, function (_prismThemesPrismCss) {}],
    execute: function () {
      _export('AuCode', AuCode = (_dec = processContent(function (compiler, resources, element, instruction) {
        parseCode(element, resources, instruction);
        return true;
      }), _dec2 = customElement('au-code'), _dec3 = inject(Element, TargetInstruction, Loader), _dec(_class = _dec2(_class = noView(_class = _dec3(_class = (_class2 = function () {
        function AuCode(element, targetInstruction, loader) {
          _classCallCheck(this, AuCode);

          _initDefineProp(this, 'language', _descriptor, this);

          _initDefineProp(this, 'url', _descriptor2, this);

          this.element = element;
          this.loader = loader;
          this.html = targetInstruction.behaviorInstructions[0].html;
        }

        AuCode.prototype.urlChanged = function urlChanged() {
          var _this = this;

          if (this.url) {
            this.loader.loadText('copy/' + this.url).then(function (text) {
              _this.html = text;
              _this.render();
            });
          } else {
            this.html = '';
            this.render();
          }
        };

        AuCode.prototype.attached = function attached() {
          this.render();
        };

        AuCode.prototype.render = function render() {
          jQuery('pre', this.element).remove();
          var pre = document.createElement('pre');
          this.element.appendChild(pre);
          pre.innerHTML = prism.highlight(this.html, Prism.languages[this.language]);
        };

        return AuCode;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'language', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'url', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class) || _class) || _class));

      _export('AuCode', AuCode);
    }
  };
});
//# sourceMappingURL=au-code.js.map
