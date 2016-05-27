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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1mb290ZXItcGFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTVEsWSxxQkFBQSxNO0FBQVEsbUIscUJBQUEsYTtBQUFlLGMscUJBQUEsUTs7O2tDQVNsQixnQixXQUZaLGNBQWMsY0FBZCxDLFVBQ0EsT0FBTyxPQUFQLEM7Ozs7ZUFHQyxJLEdBQU8sRTs7O21DQUdQLEksaUJBQUssTSxFQUFRO0FBQ1gsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGVBQUssS0FBTCxHQUFhLE9BQU8sS0FBcEI7QUFDQSxlQUFLLFdBQUwsR0FBbUIsT0FBTyxLQUFQLENBQWEsV0FBaEM7QUFDQSxlQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXdCLElBQXhCO0FBRUQsUzs7bUNBTUQsUSx1QkFBVztBQUNULGVBQUssZ0JBQUwsR0FBd0IsS0FBeEI7QUFDQSxlQUFLLGdCQUFMLEdBQXdCLEtBQXhCO0FBQ0EsZUFBSyxpQkFBTCxHQUF5QixLQUF6QjtBQUNBLGVBQUssZ0JBQUwsR0FBd0IsS0FBeEI7QUFFRCxTOzttQ0FFRCxXLHdCQUFZLEksRUFBSztBQUNkLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxNQUE3QjtBQUNBLGVBQUssS0FBTCxHQUFhLEtBQUssS0FBbEI7QUFDQSxlQUFLLE1BQUwsR0FBYyxLQUFLLE1BQW5CO0FBQ0QsZUFBSyxJQUFMLEdBQVksS0FBSyxNQUFMLEdBQWMsS0FBSyxJQUFMLENBQVUsS0FBSyxNQUFMLEdBQVksS0FBSyxLQUEzQixJQUFrQyxDQUFoRCxHQUFrRCxDQUE5RDtBQUNBLGNBQUcsS0FBSyxJQUFMLEtBQWMsQ0FBakIsRUFBbUI7QUFDakIsaUJBQUssaUJBQUwsR0FBeUIsS0FBekI7QUFDQSxpQkFBSyxnQkFBTCxHQUF3QixLQUF4QjtBQUNELFdBSEQsTUFHTztBQUNMLGlCQUFLLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0EsaUJBQUssZ0JBQUwsR0FBd0IsSUFBeEI7QUFDRDs7QUFFRCxjQUFHLEtBQUssTUFBTCxJQUFlLEtBQUssZ0JBQUwsR0FBc0IsS0FBSyxLQUE3QyxFQUFtRDtBQUNqRCxpQkFBSyxnQkFBTCxHQUF3QixLQUF4QjtBQUNBLGlCQUFLLGdCQUFMLEdBQXdCLEtBQXhCO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsaUJBQUssZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxpQkFBSyxnQkFBTCxHQUF3QixJQUF4QjtBQUNEOztBQUVELGVBQUssSUFBTCxhQUFvQixLQUFLLElBQXpCLFlBQW9DLEtBQUssSUFBTCxDQUFVLEtBQUssZ0JBQUwsR0FBc0IsS0FBSyxLQUFyQyxDQUFwQyx5QkFBbUcsS0FBSyxnQkFBeEcsb0JBQXVJLEtBQUssS0FBNUk7QUFFRCxTOzttQ0FHRCxRLHVCQUFVO0FBQ1IsZUFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixJQUFyQjtBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxDQUFoQztBQUNBLGVBQUssV0FBTCxDQUFpQixVQUFqQjtBQUNELFM7O21DQUlELE8sc0JBQVM7QUFDUCxlQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLElBQXJCO0FBQ0EsZUFBSyxXQUFMLENBQWlCLFlBQWpCLEdBQWdDLEtBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLFdBQUwsQ0FBaUIsV0FBakY7QUFDQSxlQUFLLFdBQUwsQ0FBaUIsVUFBakI7QUFDRCxTOzttQ0FJRCxPLHNCQUFTO0FBQ1AsZUFBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixJQUFyQjtBQUNBLGVBQUssV0FBTCxDQUFpQixZQUFqQixHQUFnQyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsS0FBSyxXQUFMLENBQWlCLFdBQWpGO0FBQ0EsZUFBSyxXQUFMLENBQWlCLFVBQWpCO0FBQ0QsUzs7bUNBSUQsTyxzQkFBUztBQUNQLGVBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsSUFBckI7QUFDQSxlQUFLLFdBQUwsQ0FBaUIsWUFBakIsR0FBZ0MsS0FBSyxXQUFMLENBQWlCLFlBQWpCLEdBQThCLEtBQUssV0FBTCxDQUFpQixXQUEvRTtBQUNBLGVBQUssV0FBTCxDQUFpQixVQUFqQjtBQUNELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWZvb3Rlci1wYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
