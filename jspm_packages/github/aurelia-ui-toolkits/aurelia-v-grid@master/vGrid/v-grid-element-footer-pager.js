/* */ 
define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VGridElementFooterPager = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var VGridElementFooterPager = exports.VGridElementFooterPager = (_dec = (0, _aureliaFramework.customElement)('v-grid-pager'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = function () {
    function VGridElementFooterPager(element) {
      _classCallCheck(this, VGridElementFooterPager);

      this.info = "";

      this.element = element;
    }

    VGridElementFooterPager.prototype.bind = function bind(parent) {
      this.parent = parent;
      this.vGrid = parent.vGrid;
      this.vGridConfig = parent.vGrid.vGridConfig;
      this.vGrid.vGridPager = this;
    };

    VGridElementFooterPager.prototype.attached = function attached() {
      this.statusNextButton = false;
      this.statusLastButton = false;
      this.statusFirstButton = false;
      this.statusPrevButton = false;
    };

    VGridElementFooterPager.prototype.updatePager = function updatePager(data) {
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

    VGridElementFooterPager.prototype.firstBtn = function firstBtn() {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = 0;
      this.vGridConfig.remoteCall();
    };

    VGridElementFooterPager.prototype.nextBtn = function nextBtn() {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset + this.vGridConfig.remoteLimit;
      this.vGridConfig.remoteCall();
    };

    VGridElementFooterPager.prototype.prevBtn = function prevBtn() {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset - this.vGridConfig.remoteLimit;
      this.vGridConfig.remoteCall();
    };

    VGridElementFooterPager.prototype.lastBtn = function lastBtn() {
      this.vGrid.loading = true;
      this.vGridConfig.remoteOffset = this.vGridConfig.remoteLength - this.vGridConfig.remoteLimit;
      this.vGridConfig.remoteCall();
    };

    return VGridElementFooterPager;
  }()) || _class) || _class);
});