/* */ 
define(['exports', 'aurelia-templating', 'aurelia-pal'], function (exports, _aureliaTemplating, _aureliaPal) {
  'use strict';

  exports.__esModule = true;
  exports.configure = configure;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var CssAnimator = (function () {
    function CssAnimator() {
      _classCallCheck(this, CssAnimator);

      this.useAnimationDoneClasses = false;
      this.animationEnteredClass = 'au-entered';
      this.animationLeftClass = 'au-left';
      this.isAnimating = false;

      this.verifyKeyframesExist = true;
    }

    CssAnimator.prototype._addMultipleEventListener = function _addMultipleEventListener(el, s, fn) {
      var evts = s.split(' ');
      for (var i = 0, ii = evts.length; i < ii; ++i) {
        el.addEventListener(evts[i], fn, false);
      }
    };

    CssAnimator.prototype._getElementAnimationDelay = function _getElementAnimationDelay(element) {
      var styl = _aureliaPal.DOM.getComputedStyle(element);
      var prop = undefined;
      var delay = undefined;

      if (styl.getPropertyValue('animation-delay')) {
        prop = 'animation-delay';
      } else if (styl.getPropertyValue('-webkit-animation-delay')) {
        prop = '-webkit-animation-delay';
      } else if (styl.getPropertyValue('-moz-animation-delay')) {
        prop = '-moz-animation-delay';
      } else {
        return 0;
      }

      delay = styl.getPropertyValue(prop);
      delay = Number(delay.replace(/[^\d\.]/g, ''));

      return delay * 1000;
    };

    CssAnimator.prototype._getElementAnimationNames = function _getElementAnimationNames(element) {
      var styl = _aureliaPal.DOM.getComputedStyle(element);
      var prefix = undefined;

      if (styl.getPropertyValue('animation-name')) {
        prefix = '';
      } else if (styl.getPropertyValue('-webkit-animation-name')) {
        prefix = '-webkit-';
      } else if (styl.getPropertyValue('-moz-animation-name')) {
        prefix = '-moz-';
      } else {
        return [];
      }

      var animationNames = styl.getPropertyValue(prefix + 'animation-name');
      return animationNames ? animationNames.split(' ') : [];
    };

    CssAnimator.prototype._performSingleAnimate = function _performSingleAnimate(element, className) {
      var _this = this;

      this._triggerDOMEvent(_aureliaTemplating.animationEvent.animateBegin, element);

      return this.addClass(element, className, true).then(function (result) {
        _this._triggerDOMEvent(_aureliaTemplating.animationEvent.animateActive, element);

        if (result !== false) {
          return _this.removeClass(element, className, true).then(function () {
            _this._triggerDOMEvent(_aureliaTemplating.animationEvent.animateDone, element);
          });
        }

        return false;
      })['catch'](function () {
        _this._triggerDOMEvent(_aureliaTemplating.animationEvent.animateTimeout, element);
      });
    };

    CssAnimator.prototype._triggerDOMEvent = function _triggerDOMEvent(eventType, element) {
      var evt = _aureliaPal.DOM.createCustomEvent(eventType, { bubbles: true, cancelable: true, detail: element });
      _aureliaPal.DOM.dispatchEvent(evt);
    };

    CssAnimator.prototype._animationChangeWithValidKeyframe = function _animationChangeWithValidKeyframe(animationNames, prevAnimationNames) {
      var newAnimationNames = animationNames.filter(function (name) {
        return prevAnimationNames.indexOf(name) === -1;
      });

      if (newAnimationNames.length === 0) {
        return false;
      }

      if (!this.verifyKeyframesExist) {
        return true;
      }

      var keyframesRuleType = window.CSSRule.KEYFRAMES_RULE || window.CSSRule.MOZ_KEYFRAMES_RULE || window.CSSRule.WEBKIT_KEYFRAMES_RULE;

      var styleSheets = document.styleSheets;
      for (var i = 0; i < styleSheets.length; ++i) {
        var cssRules = styleSheets[i].cssRules;

        if (!cssRules) {
          continue;
        }

        for (var j = 0; j < cssRules.length; ++j) {
          var cssRule = cssRules[j];

          if (cssRule.type === keyframesRuleType) {
            if (newAnimationNames.indexOf(cssRule.name) !== -1) {
              return true;
            }
          }
        }
      }

      return false;
    };

    CssAnimator.prototype.animate = function animate(element, className) {
      var _this2 = this;

      if (Array.isArray(element)) {
        return Promise.all(element.map(function (el) {
          return _this2._performSingleAnimate(el, className);
        }));
      }

      return this._performSingleAnimate(element, className);
    };

    CssAnimator.prototype.runSequence = function runSequence(animations) {
      var _this3 = this;

      this._triggerDOMEvent(_aureliaTemplating.animationEvent.sequenceBegin, null);

      return animations.reduce(function (p, anim) {
        return p.then(function () {
          return _this3.animate(anim.element, anim.className);
        });
      }, Promise.resolve(true)).then(function () {
        _this3._triggerDOMEvent(_aureliaTemplating.animationEvent.sequenceDone, null);
      });
    };

    CssAnimator.prototype.enter = function enter(element) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var classList = element.classList;

        _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.enterBegin, element);

        if (_this4.useAnimationDoneClasses) {
          classList.remove(_this4.animationEnteredClass);
          classList.remove(_this4.animationLeftClass);
        }

        classList.add('au-enter');
        var prevAnimationNames = _this4._getElementAnimationNames(element);

        var animStart = undefined;
        var animHasStarted = false;
        _this4._addMultipleEventListener(element, 'webkitAnimationStart animationstart', animStart = function (evAnimStart) {
          animHasStarted = true;
          _this4.isAnimating = true;

          _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.enterActive, element);

          evAnimStart.stopPropagation();

          evAnimStart.target.removeEventListener(evAnimStart.type, animStart);
        }, false);

        var animEnd = undefined;
        _this4._addMultipleEventListener(element, 'webkitAnimationEnd animationend', animEnd = function (evAnimEnd) {
          if (!animHasStarted) {
            return;
          }

          evAnimEnd.stopPropagation();

          classList.remove('au-enter-active');
          classList.remove('au-enter');

          evAnimEnd.target.removeEventListener(evAnimEnd.type, animEnd);

          if (_this4.useAnimationDoneClasses && _this4.animationEnteredClass !== undefined && _this4.animationEnteredClass !== null) {
            classList.add(_this4.animationEnteredClass);
          }

          _this4.isAnimating = false;
          _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.enterDone, element);

          resolve(true);
        }, false);

        var parent = element.parentElement;
        var delay = 0;

        var cleanupAnimation = function cleanupAnimation() {
          var animationNames = _this4._getElementAnimationNames(element);
          if (!_this4._animationChangeWithValidKeyframe(animationNames, prevAnimationNames)) {
            classList.remove('au-enter-active');
            classList.remove('au-enter');
            _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.enterTimeout, element);
            resolve(false);
          }
        };

        if (parent !== null && parent !== undefined && (parent.classList.contains('au-stagger') || parent.classList.contains('au-stagger-enter'))) {
          var elemPos = Array.prototype.indexOf.call(parent.children, element);
          delay = _this4._getElementAnimationDelay(parent) * elemPos;

          _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.staggerNext, element);

          setTimeout(function () {
            classList.add('au-enter-active');
            cleanupAnimation();
          }, delay);
        } else {
          classList.add('au-enter-active');
          cleanupAnimation();
        }
      });
    };

    CssAnimator.prototype.leave = function leave(element) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        var classList = element.classList;

        _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.leaveBegin, element);

        if (_this5.useAnimationDoneClasses) {
          classList.remove(_this5.animationEnteredClass);
          classList.remove(_this5.animationLeftClass);
        }

        classList.add('au-leave');
        var prevAnimationNames = _this5._getElementAnimationNames(element);

        var animStart = undefined;
        var animHasStarted = false;
        _this5._addMultipleEventListener(element, 'webkitAnimationStart animationstart', animStart = function (evAnimStart) {
          animHasStarted = true;
          _this5.isAnimating = true;

          _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.leaveActive, element);

          evAnimStart.stopPropagation();

          evAnimStart.target.removeEventListener(evAnimStart.type, animStart);
        }, false);

        var animEnd = undefined;
        _this5._addMultipleEventListener(element, 'webkitAnimationEnd animationend', animEnd = function (evAnimEnd) {
          if (!animHasStarted) {
            return;
          }

          evAnimEnd.stopPropagation();

          classList.remove('au-leave-active');
          classList.remove('au-leave');

          evAnimEnd.target.removeEventListener(evAnimEnd.type, animEnd);

          if (_this5.useAnimationDoneClasses && _this5.animationLeftClass !== undefined && _this5.animationLeftClass !== null) {
            classList.add(_this5.animationLeftClass);
          }

          _this5.isAnimating = false;
          _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.leaveDone, element);

          resolve(true);
        }, false);

        var parent = element.parentElement;
        var delay = 0;

        var cleanupAnimation = function cleanupAnimation() {
          var animationNames = _this5._getElementAnimationNames(element);
          if (!_this5._animationChangeWithValidKeyframe(animationNames, prevAnimationNames)) {
            classList.remove('au-leave-active');
            classList.remove('au-leave');
            _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.leaveTimeout, element);
            resolve(false);
          }
        };

        if (parent !== null && parent !== undefined && (parent.classList.contains('au-stagger') || parent.classList.contains('au-stagger-leave'))) {
          var elemPos = Array.prototype.indexOf.call(parent.children, element);
          delay = _this5._getElementAnimationDelay(parent) * elemPos;

          _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.staggerNext, element);

          setTimeout(function () {
            classList.add('au-leave-active');
            cleanupAnimation();
          }, delay);
        } else {
          classList.add('au-leave-active');
          cleanupAnimation();
        }
      });
    };

    CssAnimator.prototype.removeClass = function removeClass(element, className) {
      var _this6 = this;

      var suppressEvents = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      return new Promise(function (resolve, reject) {
        var classList = element.classList;

        if (!classList.contains(className) && !classList.contains(className + '-add')) {
          resolve(false);
          return;
        }

        if (suppressEvents !== true) {
          _this6._triggerDOMEvent(_aureliaTemplating.animationEvent.removeClassBegin, element);
        }

        classList.remove(className);
        var prevAnimationNames = _this6._getElementAnimationNames(element);

        var animStart = undefined;
        var animHasStarted = false;
        _this6._addMultipleEventListener(element, 'webkitAnimationStart animationstart', animStart = function (evAnimStart) {
          animHasStarted = true;
          _this6.isAnimating = true;

          if (suppressEvents !== true) {
            _this6._triggerDOMEvent(_aureliaTemplating.animationEvent.removeClassActive, element);
          }

          evAnimStart.stopPropagation();

          evAnimStart.target.removeEventListener(evAnimStart.type, animStart);
        }, false);

        var animEnd = undefined;
        _this6._addMultipleEventListener(element, 'webkitAnimationEnd animationend', animEnd = function (evAnimEnd) {
          if (!animHasStarted) {
            return;
          }

          evAnimEnd.stopPropagation();

          classList.remove(className + '-remove');

          evAnimEnd.target.removeEventListener(evAnimEnd.type, animEnd);

          _this6.isAnimating = false;

          if (suppressEvents !== true) {
            _this6._triggerDOMEvent(_aureliaTemplating.animationEvent.removeClassDone, element);
          }

          resolve(true);
        }, false);

        classList.add(className + '-remove');

        var animationNames = _this6._getElementAnimationNames(element);
        if (!_this6._animationChangeWithValidKeyframe(animationNames, prevAnimationNames)) {
          classList.remove(className + '-remove');
          classList.remove(className);

          if (suppressEvents !== true) {
            _this6._triggerDOMEvent(_aureliaTemplating.animationEvent.removeClassTimeout, element);
          }

          resolve(false);
        }
      });
    };

    CssAnimator.prototype.addClass = function addClass(element, className) {
      var _this7 = this;

      var suppressEvents = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      return new Promise(function (resolve, reject) {
        var classList = element.classList;

        if (suppressEvents !== true) {
          _this7._triggerDOMEvent(_aureliaTemplating.animationEvent.addClassBegin, element);
        }

        var animStart = undefined;
        var animHasStarted = false;
        _this7._addMultipleEventListener(element, 'webkitAnimationStart animationstart', animStart = function (evAnimStart) {
          animHasStarted = true;
          _this7.isAnimating = true;

          if (suppressEvents !== true) {
            _this7._triggerDOMEvent(_aureliaTemplating.animationEvent.addClassActive, element);
          }

          evAnimStart.stopPropagation();

          evAnimStart.target.removeEventListener(evAnimStart.type, animStart);
        }, false);

        var animEnd = undefined;
        _this7._addMultipleEventListener(element, 'webkitAnimationEnd animationend', animEnd = function (evAnimEnd) {
          if (!animHasStarted) {
            return;
          }

          evAnimEnd.stopPropagation();

          classList.add(className);

          classList.remove(className + '-add');

          evAnimEnd.target.removeEventListener(evAnimEnd.type, animEnd);

          _this7.isAnimating = false;

          if (suppressEvents !== true) {
            _this7._triggerDOMEvent(_aureliaTemplating.animationEvent.addClassDone, element);
          }

          resolve(true);
        }, false);

        var prevAnimationNames = _this7._getElementAnimationNames(element);

        classList.add(className + '-add');

        var animationNames = _this7._getElementAnimationNames(element);
        if (!_this7._animationChangeWithValidKeyframe(animationNames, prevAnimationNames)) {
          classList.remove(className + '-add');
          classList.add(className);

          if (suppressEvents !== true) {
            _this7._triggerDOMEvent(_aureliaTemplating.animationEvent.addClassTimeout, element);
          }

          resolve(false);
        }
      });
    };

    return CssAnimator;
  })();

  exports.CssAnimator = CssAnimator;

  function configure(config, callback) {
    var animator = config.container.get(CssAnimator);
    config.container.get(_aureliaTemplating.TemplatingEngine).configureAnimator(animator);
    if (typeof callback === 'function') {
      callback(animator);
    }
  }
});