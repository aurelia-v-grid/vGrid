'use strict';

System.register(['bootstrap', 'moment'], function (_export, _context) {
  "use strict";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDTyxZOzs7QUFDUCxhQUFPLE1BQVAsR0FBZ0IsTUFBaEI7O0FBR08sZUFBUyxTQUFULENBQW1CLE9BQW5CLEVBQTRCO0FBQ2pDLGdCQUFRLEdBQVIsQ0FDRyxxQkFESCxHQUVHLGtCQUZILEdBR0csTUFISCxDQUdVLGNBSFY7O0FBT0EsZ0JBQVEsS0FBUixHQUFnQixJQUFoQixDQUFxQjtBQUFBLGlCQUFLLEVBQUUsT0FBRixFQUFMO0FBQUEsU0FBckI7QUFDRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
