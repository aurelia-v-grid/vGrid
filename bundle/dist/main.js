'use strict';

System.register(['bootstrap', 'moment', 'bluebird'], function (_export, _context) {
  var moment, Promise, P;
  return {
    setters: [function (_bootstrap) {}, function (_moment) {
      moment = _moment.default;
    }, function (_bluebird) {
      Promise = _bluebird.Promise;
      P = _bluebird.P;
    }],
    execute: function () {
      window.moment = moment;
      function configure(aurelia) {

        window.Promise = Promise;
        window.P = P;

        aurelia.use.standardConfiguration().developmentLogging().globalResources("datepicker").plugin("vGrid/plugin");

        aurelia.start().then(function (a) {
          return a.setRoot();
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ08sWTs7QUFFQyxhLGFBQUEsTztBQUFTLE8sYUFBQSxDOzs7QUFEakIsYUFBTyxNQUFQLEdBQWdCLE1BQWhCO0FBR08sZUFBUyxTQUFULENBQW1CLE9BQW5CLEVBQTRCOztBQUVqQyxlQUFPLE9BQVAsR0FBaUIsT0FBakI7QUFDQSxlQUFPLENBQVAsR0FBVyxDQUFYOztBQUVBLGdCQUFRLEdBQVIsQ0FDRyxxQkFESCxHQUVHLGtCQUZILEdBR0csZUFISCxDQUdtQixZQUhuQixFQUlHLE1BSkgsQ0FJVSxjQUpWOztBQU9BLGdCQUFRLEtBQVIsR0FBZ0IsSUFBaEIsQ0FBcUI7QUFBQSxpQkFBSyxFQUFFLE9BQUYsRUFBTDtBQUFBLFNBQXJCO0FBQ0QiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
