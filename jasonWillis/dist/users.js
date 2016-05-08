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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBUTs7QUFDQTs7O3VCQUlLLGdCQURaLE9BQU8sVUFBUDtBQUtDLGlCQUpXLEtBSVgsQ0FBWSxJQUFaLEVBQWtCO2dDQUpQLE9BSU87O2VBSGxCLFVBQVUsZUFHUTtlQUZsQixRQUFRLEdBRVU7O0FBQ2hCLGVBQUssU0FBTCxDQUFlLGtCQUFVO0FBQ3ZCLG1CQUNHLHdCQURILEdBRUcsV0FGSCxDQUVlLHlCQUZmLEVBRHVCO1dBQVYsQ0FBZixDQURnQjs7QUFPaEIsZUFBSyxJQUFMLEdBQVksSUFBWixDQVBnQjtTQUFsQjs7QUFKVyx3QkFjWCwrQkFBVzs7O0FBQ1QsaUJBQU8sS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixPQUFoQixFQUNKLElBREksQ0FDQzttQkFBWSxTQUFTLElBQVQ7V0FBWixDQURELENBRUosSUFGSSxDQUVDO21CQUFTLE1BQUssS0FBTCxHQUFhLEtBQWI7V0FBVCxDQUZSLENBRFM7OztlQWRBIiwiZmlsZSI6InVzZXJzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
