'use strict';

System.register(['bootstrap'], function (_export, _context) {
  return {
    setters: [function (_bootstrap) {}],
    execute: function () {
      function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().globalResources();

        aurelia.start().then(function (a) {
          return a.setRoot();
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR08sZUFBUyxTQUFULENBQW1CLE9BQW5CLEVBQTRCO0FBQ2pDLGdCQUFRLEdBQVIsQ0FDRyxxQkFESCxHQUVHLGtCQUZILEdBR0csZUFISCxHQURpQzs7QUFNakMsZ0JBQVEsS0FBUixHQUFnQixJQUFoQixDQUFxQjtpQkFBSyxFQUFFLE9BQUY7U0FBTCxDQUFyQixDQU5pQztPQUE1QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
