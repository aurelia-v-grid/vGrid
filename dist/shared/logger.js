'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _typeof, Logger;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function getRGB(color) {
    var result = void 0;

    if (color && color.constructor === Array && color.length === 3) {
      return color;
    }

    result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color);
    if (result) {
      return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
    }

    result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color);
    if (result) {
      return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
    }

    return jQuery.trim(color).toLowerCase();
  }

  function getColor(elem, attr) {
    var color = void 0;

    do {
      color = jQuery.css(elem, attr);

      if (color && color !== 'transparent' || jQuery.nodeName(elem, 'body')) {
        break;
      }

      attr = 'backgroundColor';

      elem = elem.parentNode;
    } while (elem);

    return getRGB(color);
  }
  return {
    setters: [],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('Logger', Logger = function () {
        function Logger() {
          _classCallCheck(this, Logger);
        }

        Logger.prototype.attached = function attached() {
          this.overrideStyles();
        };

        Logger.prototype.log = function log(message, isError, container) {
          var lastContainer = $('.console div:first', container);
          var counter = lastContainer.find('.count').detach();
          var lastMessage = lastContainer.text();
          var count = 1 * (counter.text() || 1);

          lastContainer.append(counter);

          if (!lastContainer.length || message !== lastMessage) {
            $('<div' + (isError ? ' class=\'error\'' : '') + '/>').css({
              marginTop: -24,
              backgroundColor: isError ? '#ffbbbb' : '#b2ebf2'
            }).html(message).prependTo($('.console', container)).animate({ marginTop: 0 }, 300).animate({ backgroundColor: isError ? '#ffdddd' : '#ffffff' }, 800);
          } else {
            count++;

            if (counter.length) {
              counter.html(count);
            } else {
              lastContainer.html(lastMessage).append('<span class=\'count\'>' + count + '</span>');
            }
          }
        };

        Logger.prototype.error = function error(message) {
          this.log(message, true);
        };

        Logger.prototype.overrideStyles = function overrideStyles() {
          jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function (i, attr) {
            jQuery.fx.step[attr] = function (fx) {
              if (!fx.state || _typeof(fx.end) === _typeof('')) {
                fx.start = getColor(fx.elem, attr);
                fx.end = getRGB(fx.end);
              }

              fx.elem.style[attr] = ['rgb(', [Math.max(Math.min(parseInt(fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0], 10), 255), 0), Math.max(Math.min(parseInt(fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1], 10), 255), 0), Math.max(Math.min(parseInt(fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2], 10), 255), 0)].join(','), ')'].join('');
            };
          });
        };

        return Logger;
      }());

      _export('Logger', Logger);
    }
  };
});
//# sourceMappingURL=logger.js.map
