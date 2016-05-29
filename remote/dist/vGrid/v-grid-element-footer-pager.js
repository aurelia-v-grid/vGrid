'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, customElement, bindable, _dec, _dec2, _class, VGridFooterPager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('VGridFooterPager', VGridFooterPager = (_dec = customElement('v-grid-pager'), _dec2 = inject(Element), _dec(_class = _dec2(_class = function () {
        function VGridFooterPager() {
          _classCallCheck(this, VGridFooterPager);

          this.info = "";
        }

        VGridFooterPager.prototype.bind = function bind(parent) {
          this.parent = parent;
          this.vGrid = parent.vGrid;
          this.vGridConfig = parent.vGrid.vGridConfig;
          this.vGrid.vGridPager = this;
        };

        VGridFooterPager.prototype.attached = function attached() {
          this.statusNextButton = false;
          this.statusLastButton = false;
          this.statusFirstButton = false;
          this.statusPrevButton = false;
        };

        VGridFooterPager.prototype.updatePager = function updatePager(data) {
          this.collectionLength = data.length;
          this.limit = data.limit;
          this.offset = data.offset;
          this.page = this.offset ? Math.ceil(this.offset / this.limit) + 1 : 1;
          if (this.page === 1) {
            this.statusFirstButton = false;
            this.statusPrevButton = false;
          } else {
            this.statusFirstButton = true;
            this.statusPrevButton = true;
          }

          if (this.offset >= this.collectionLength - this.limit) {
            this.statusNextButton = false;
            this.statusLastButton = false;
          } else {
            this.statusNextButton = true;
            this.statusLastButton = true;
          }

          this.info = 'Page ' + this.page + ' of ' + Math.ceil(this.collectionLength / this.limit) + ', Total entities:' + this.collectionLength + ', page size ' + this.limit;
        };

        VGridFooterPager.prototype.firstBtn = function firstBtn() {
          this.vGrid.loading = true;
          this.vGridConfig.remoteOffset = 0;
          this.vGridConfig.remoteCall();
        };

        VGridFooterPager.prototype.nextBtn = function nextBtn() {
          this.vGrid.loading = true;
          this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset + this.vGridConfig.remoteLimit;
          this.vGridConfig.remoteCall();
        };

        VGridFooterPager.prototype.prevBtn = function prevBtn() {
          this.vGrid.loading = true;
          this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset - this.vGridConfig.remoteLimit;
          this.vGridConfig.remoteCall();
        };

        VGridFooterPager.prototype.lastBtn = function lastBtn() {
          this.vGrid.loading = true;
          this.vGridConfig.remoteOffset = this.vGridConfig.remoteLength - this.vGridConfig.remoteLimit;
          this.vGridConfig.remoteCall();
        };

        return VGridFooterPager;
      }()) || _class) || _class));

      _export('VGridFooterPager', VGridFooterPager);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1lbGVtZW50LWZvb3Rlci1wYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNUSxZLHFCQUFBLE07QUFBUSxtQixxQkFBQSxhO0FBQWUsYyxxQkFBQSxROzs7a0NBU2xCLGdCLFdBRlosY0FBYyxjQUFkLEMsVUFDQSxPQUFPLE9BQVAsQzs7OztlQUdDLEksR0FBTyxFOzs7bUNBR1AsSSxpQkFBSyxNLEVBQVE7QUFDWCxlQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsZUFBSyxLQUFMLEdBQWEsT0FBTyxLQUFwQjtBQUNBLGVBQUssV0FBTCxHQUFtQixPQUFPLEtBQVAsQ0FBYSxXQUFoQztBQUNBLGVBQUssS0FBTCxDQUFXLFVBQVgsR0FBd0IsSUFBeEI7QUFFRCxTOzttQ0FNRCxRLHVCQUFXO0FBQ1QsZUFBSyxnQkFBTCxHQUF3QixLQUF4QjtBQUNBLGVBQUssZ0JBQUwsR0FBd0IsS0FBeEI7QUFDQSxlQUFLLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0EsZUFBSyxnQkFBTCxHQUF3QixLQUF4QjtBQUVELFM7O21DQUVELFcsd0JBQVksSSxFQUFLO0FBQ2QsZUFBSyxnQkFBTCxHQUF3QixLQUFLLE1BQTdCO0FBQ0EsZUFBSyxLQUFMLEdBQWEsS0FBSyxLQUFsQjtBQUNBLGVBQUssTUFBTCxHQUFjLEtBQUssTUFBbkI7QUFDRCxlQUFLLElBQUwsR0FBWSxLQUFLLE1BQUwsR0FBYyxLQUFLLElBQUwsQ0FBVSxLQUFLLE1BQUwsR0FBWSxLQUFLLEtBQTNCLElBQWtDLENBQWhELEdBQWtELENBQTlEO0FBQ0EsY0FBRyxLQUFLLElBQUwsS0FBYyxDQUFqQixFQUFtQjtBQUNqQixpQkFBSyxpQkFBTCxHQUF5QixLQUF6QjtBQUNBLGlCQUFLLGdCQUFMLEdBQXdCLEtBQXhCO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsaUJBQUssaUJBQUwsR0FBeUIsSUFBekI7QUFDQSxpQkFBSyxnQkFBTCxHQUF3QixJQUF4QjtBQUNEOztBQUVELGNBQUcsS0FBSyxNQUFMLElBQWUsS0FBSyxnQkFBTCxHQUFzQixLQUFLLEtBQTdDLEVBQW1EO0FBQ2pELGlCQUFLLGdCQUFMLEdBQXdCLEtBQXhCO0FBQ0EsaUJBQUssZ0JBQUwsR0FBd0IsS0FBeEI7QUFDRCxXQUhELE1BR087QUFDTCxpQkFBSyxnQkFBTCxHQUF3QixJQUF4QjtBQUNBLGlCQUFLLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0Q7O0FBRUQsZUFBSyxJQUFMLGFBQW9CLEtBQUssSUFBekIsWUFBb0MsS0FBSyxJQUFMLENBQVUsS0FBSyxnQkFBTCxHQUFzQixLQUFLLEtBQXJDLENBQXBDLHlCQUFtRyxLQUFLLGdCQUF4RyxvQkFBdUksS0FBSyxLQUE1STtBQUVELFM7O21DQUdELFEsdUJBQVU7QUFDUixlQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLElBQXJCO0FBQ0EsZUFBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLENBQWhDO0FBQ0EsZUFBSyxXQUFMLENBQWlCLFVBQWpCO0FBQ0QsUzs7bUNBSUQsTyxzQkFBUztBQUNQLGVBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsSUFBckI7QUFDQSxlQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLEtBQUssV0FBTCxDQUFpQixXQUFqRjtBQUNBLGVBQUssV0FBTCxDQUFpQixVQUFqQjtBQUNELFM7O21DQUlELE8sc0JBQVM7QUFDUCxlQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLElBQXJCO0FBQ0EsZUFBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLFdBQUwsQ0FBaUIsV0FBakY7QUFDQSxlQUFLLFdBQUwsQ0FBaUIsVUFBakI7QUFDRCxTOzttQ0FJRCxPLHNCQUFTO0FBQ1AsZUFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixJQUFyQjtBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBOEIsS0FBSyxXQUFMLENBQWlCLFdBQS9FO0FBQ0EsZUFBSyxXQUFMLENBQWlCLFVBQWpCO0FBQ0QsUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtZWxlbWVudC1mb290ZXItcGFnZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
