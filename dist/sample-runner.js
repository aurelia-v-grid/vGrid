'use strict';

System.register(['aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator'], function (_export, _context) {
  "use strict";

  var inject, activationStrategy, EventAggregator, TaskQueue, _dec, _class, SampleRunner;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      TaskQueue = _aureliaFramework.TaskQueue;
    }, function (_aureliaRouter) {
      activationStrategy = _aureliaRouter.activationStrategy;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      _export('SampleRunner', SampleRunner = (_dec = inject(EventAggregator, TaskQueue), _dec(_class = function () {
        function SampleRunner(ea, taskQueue) {
          _classCallCheck(this, SampleRunner);

          this.taskQueue = taskQueue;
          this.ea = ea;
        }

        SampleRunner.prototype.activate = function activate(params, route) {
          var sample = route.navModel.config.sample;

          if (!sample) throw new Error('Route does not contain a \'sample\' property');

          this.sample = sample;
        };

        SampleRunner.prototype.restart = function restart() {
          var _this = this;

          var old = this.sample;
          this.sample = undefined;
          this.taskQueue.queueTask(function () {
            _this.sample = old;
          });
        };

        SampleRunner.prototype.determineActivationStrategy = function determineActivationStrategy() {
          return activationStrategy.replace;
        };

        return SampleRunner;
      }()) || _class));

      _export('SampleRunner', SampleRunner);
    }
  };
});
//# sourceMappingURL=sample-runner.js.map
