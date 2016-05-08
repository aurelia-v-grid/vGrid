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
        aurelia.use.standardConfiguration().developmentLogging().globalResources("datepicker").plugin("vGrid/plugin");

        aurelia.start().then(function (a) {
          return a.setRoot();
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ087OztBQUNQLGFBQU8sTUFBUCxHQUFnQixNQUFoQjs7QUFHTyxlQUFTLFNBQVQsQ0FBbUIsT0FBbkIsRUFBNEI7QUFDakMsZ0JBQVEsR0FBUixDQUNHLHFCQURILEdBRUcsa0JBRkgsR0FHRyxlQUhILENBR21CLFlBSG5CLEVBSUcsTUFKSCxDQUlVLGNBSlYsRUFEaUM7O0FBUWpDLGdCQUFRLEtBQVIsR0FBZ0IsSUFBaEIsQ0FBcUI7aUJBQUssRUFBRSxPQUFGO1NBQUwsQ0FBckIsQ0FSaUM7T0FBNUIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
