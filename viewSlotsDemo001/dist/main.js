'use strict';

System.register(['bootstrap', 'moment'], function (_export, _context) {
  var moment;
  return {
    setters: [function (_bootstrap) {}, function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      window.moment = moment;

      function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().plugin("vGrid/plugin");

        aurelia.start().then(function (a) {
          return a.setRoot();
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ087OztBQUNQLGFBQU8sTUFBUCxHQUFnQixNQUFoQjs7QUFHTyxlQUFTLFNBQVQsQ0FBbUIsT0FBbkIsRUFBNEI7QUFDakMsZ0JBQVEsR0FBUixDQUNHLHFCQURILEdBRUcsa0JBRkgsR0FHRyxNQUhILENBR1UsY0FIVixFQURpQzs7QUFPakMsZ0JBQVEsS0FBUixHQUFnQixJQUFoQixDQUFxQjtpQkFBSyxFQUFFLE9BQUY7U0FBTCxDQUFyQixDQVBpQztPQUE1QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
