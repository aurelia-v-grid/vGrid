'use strict';

System.register(['data/dummyDataGenerator', 'highlight.js', 'highlight.js/styles/ir-black.css!'], function (_export, _context) {
  var dummyDataGenerator, hljs, _class, _temp, _initialiseProps, sample01;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dataDummyDataGenerator) {
      dummyDataGenerator = _dataDummyDataGenerator.dummyDataGenerator;
    }, function (_highlightJs) {
      hljs = _highlightJs.default;
    }, function (_highlightJsStylesIrBlackCss) {}],
    execute: function () {
      _export('sample01', sample01 = (_temp = _class = function () {
        function sample01(element, dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample01);

          _initialiseProps.call(this);

          this.element = element;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(100, function (data) {
            _this.myCollection = data;
          });
        }

        sample01.prototype.rowHeightBtn = function rowHeightBtn(x) {
          this.myGrid.ctx.setRowHeight(x);
        };

        sample01.prototype.headerHeightBtn = function headerHeightBtn(x) {
          this.myGrid.ctx.setHeaderHeight(x);
        };

        sample01.prototype.footerHeightBtn = function footerHeightBtn(x) {
          this.myGrid.ctx.setFooterHeight(x);
        };

        sample01.prototype.selectionBtn = function selectionBtn(x) {
          switch (x) {
            case 0:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.disableSelection(x);
              break;
            case 1:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.setSingleSelection(x);
              break;
            case 2:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.setMultiSelection(x);
              break;
          }
        };

        sample01.prototype.sortableBtn = function sortableBtn(x) {
          switch (x) {
            case 0:
              this.headerHeightBtn(50);
              this.myGrid.ctx.disableSortableColumns();
              break;
            case 1:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableSortableColumns();
              break;

          }
        };

        sample01.prototype.attached = function attached() {

          var html = '- This is really a test for me to test internal function you can access in in the grid-context, \n  this way I know that redraw etc works also\n- In the button  <row-height="25"> I call: this.myGrid.ctx.setRowHeight(50) etc etc\n- there will be a lot of weird stuff on this sample page\n\n<v-grid\n\n  style="position:absolute;top:25px;bottom:25px;right: 25px;left:25px"\n  config="current-entity.bind:myCurrentEntity; collection.bind:myCollection; grid-context.bind:myGrid">\n\n  <v-grid-row>\n    <v-grid-col attribute="index" header="Index"></v-grid-col>\n    <v-grid-col attribute="name" header="Name"></v-grid-col>\n    <v-grid-col attribute="country" header="Country"></v-grid-col>\n    <v-grid-col attribute="email" header="Email"></v-grid-col>\n    <v-grid-col attribute="phone" header="Phone"></v-grid-col>\n    <v-grid-col attribute="color" header="Color"></v-grid-col>\n  </v-grid-row>\n  \n</v-grid>\n';

          var txtArea = document.createElement("TEXTAREA");
          txtArea.innerHTML = html;

          var myCodeBlock = this.element.getElementsByTagName("PRE")[0];
          myCodeBlock.innerHTML = txtArea.innerHTML;
          hljs.highlightBlock(myCodeBlock);
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
      }, _temp));

      _export('sample01', sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
