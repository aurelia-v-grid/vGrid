'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Registry;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Registry', Registry = function () {
        function Registry() {
          _classCallCheck(this, Registry);
        }

        Registry.prototype.load = function load(config, control) {
          var _this = this;

          return System.import('samples/' + control + '/registry.json!json').then(function (registry) {
            config.title = registry.title;

            var map = [];

            var _loop = function _loop() {
              if (_isArray) {
                if (_i >= _iterator.length) return 'break';
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) return 'break';
                _ref = _i.value;
              }

              var _sample = _ref;

              var sample = registry.samples[_sample];

              sample.path = 'samples/' + control + '/' + _sample;
              sample.route = sample.route || _sample;
              sample.title = sample.title || _this.getTitleFromRoute(_sample);
              sample.moduleId = sample.moduleId || 'sample-runner';
              sample.nav = sample.nav || true;
              sample.files = sample.files || ['html', 'js'];
              sample.files.forEach(function (extension) {
                sample[extension] = sample.path + '.' + extension;
              });

              if (sample.default === true) {
                map.push({
                  title: sample.title,
                  redirect: sample.route,
                  route: '',
                  sample: sample
                });
              }

              map.push({
                title: sample.title,
                nav: sample.nav,
                moduleId: sample.moduleId,
                route: sample.route,
                sample: sample
              });
            };

            for (var _iterator = Object.keys(registry.samples), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              var _ret = _loop();

              if (_ret === 'break') break;
            }

            config.map(map);
          });
        };

        Registry.prototype.getTitleFromRoute = function getTitleFromRoute(route) {
          route = route.replace(/-/g, ' ');
          route = route.charAt(0).toUpperCase() + route.slice(1);
          return route;
        };

        return Registry;
      }());

      _export('Registry', Registry);
    }
  };
});
//# sourceMappingURL=registry.js.map
