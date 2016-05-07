'use strict';

System.register(['aurelia-framework', 'aurelia-fetch-client', 'fetch'], function (_export, _context) {
  var inject, HttpClient, _dec, _class, Users;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_fetch) {}],
    execute: function () {
      _export('Users', Users = (_dec = inject(HttpClient), _dec(_class = function () {
        function Users(http) {
          _classCallCheck(this, Users);

          this.heading = 'Github Users';
          this.users = [];

          http.configure(function (config) {
            config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
          });

          this.http = http;
        }

        Users.prototype.activate = function activate() {
          var _this = this;

          return this.http.fetch('users').then(function (response) {
            return response.json();
          }).then(function (users) {
            return _this.users = users;
          });
        };

        return Users;
      }()) || _class));

      _export('Users', Users);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUSxZLHFCQUFBLE07O0FBQ0EsZ0IsdUJBQUEsVTs7O3VCQUlLLEssV0FEWixPQUFPLFVBQVAsQztBQUtDLHVCQUFZLElBQVosRUFBa0I7QUFBQTs7QUFBQSxlQUhsQixPQUdrQixHQUhSLGNBR1E7QUFBQSxlQUZsQixLQUVrQixHQUZWLEVBRVU7O0FBQ2hCLGVBQUssU0FBTCxDQUFlLGtCQUFVO0FBQ3ZCLG1CQUNHLHdCQURILEdBRUcsV0FGSCxDQUVlLHlCQUZmO0FBR0QsV0FKRDs7QUFNQSxlQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0Q7O3dCQUVELFEsdUJBQVc7QUFBQTs7QUFDVCxpQkFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLE9BQWhCLEVBQ0osSUFESSxDQUNDO0FBQUEsbUJBQVksU0FBUyxJQUFULEVBQVo7QUFBQSxXQURELEVBRUosSUFGSSxDQUVDO0FBQUEsbUJBQVMsTUFBSyxLQUFMLEdBQWEsS0FBdEI7QUFBQSxXQUZELENBQVA7QUFHRCxTIiwiZmlsZSI6InVzZXJzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
