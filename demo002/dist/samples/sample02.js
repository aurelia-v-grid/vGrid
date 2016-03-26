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

        sample01.prototype.replaceBtn = function replaceBtn(x) {
          var _this2 = this;

          this.dummyDataGenerator.generateData(x, function (data) {
            _this2.myCollection = data;
          });
        };

        sample01.prototype.addBtn = function addBtn(x) {
          var _this3 = this;

          this.dummyDataGenerator.generateData(x, function (data) {
            data.forEach(function (x) {
              _this3.myCollection.push(x);
            });
          });
        };

        sample01.prototype.removeFirstBtn = function removeFirstBtn() {
          this.myCollection.splice(0, 1);
        };

        sample01.prototype.removeLastBtn = function removeLastBtn() {
          this.myCollection.pop();
        };

        sample01.prototype.removeFirst100Btn = function removeFirst100Btn() {
          this.myCollection.splice(0, 100);
        };

        sample01.prototype.removeLast100Btn = function removeLast100Btn() {
          this.myCollection.splice(this.myCollection.length - 100, 100);
        };

        sample01.prototype.attached = function attached() {

          var javascript = '\nmyCollection = [];\nmyCurrentEntity = {};\nmyGrid = {\n  onRowDraw:function(data){\n    if(data){\n      if(data.country === "Angola"){\n          data.myCustomColor = "rgba(150,72,230, 0.3)"\n      }\n    }\n  }\n};\n    ';

          var html = '\n<v-grid\n  style="position:absolute;top:50px;bottom:0px;right: 25px;left:25px"\n  row-height="25"\n  header-height="50"\n  resizable-headers="true"\n  sortable-headers="true"\n  sort-on-header-click="true"\n  header-filter="true"\n  header-filter-onkeydown="true"\n  header-filter-not-to="phone"\n  header-filter-top="true"\n  multi-select="true"\n  locked-columns="1"\n  config="current-entity.bind:myCurrentEntity; collection.bind:myCollection ">\n  <v-grid-row>\n    <v-grid-col col-width="160" attribute="index"   header="Index"    default-filter=">=" read-only="true"                                    ></v-grid-col>\n    <v-grid-col col-width="150" attribute="name"    header="Name"     default-filter="*="                  col-css="color: {{myCustomColor}}" ></v-grid-col>\n    <v-grid-col col-width="160" attribute="country" header="Country"  default-filter="="                                                      ></v-grid-col>\n    <v-grid-col col-width="180" attribute="email"   header="Email"    default-filter="*"                                                      ></v-grid-col>\n    <v-grid-col col-width="160" attribute="color"   header="Color"    default-filter="=*"                  col-css="color: {{color}}"         ></v-grid-col>\n  </v-grid-row>\n</v-grid>\n';

          var txtArea = document.createElement("TEXTAREA");
          txtArea.innerHTML = html;

          var myCodeBlock = this.element.getElementsByTagName("PRE")[0];
          myCodeBlock.innerHTML = txtArea.innerHTML;
          hljs.highlightBlock(myCodeBlock);

          txtArea.innerHTML = javascript;

          var myCodeBlock = this.element.getElementsByTagName("PRE")[1];
          myCodeBlock.innerHTML = txtArea.innerHTML;
          hljs.highlightBlock(myCodeBlock);
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {
          onRowDraw: function onRowDraw(data) {
            if (data) {
              if (data.country === "Angola") {
                data.myCustomColor = "rgba(150,72,230, 0.3)";
              }
            }
          }
        };
      }, _temp));

      _export('sample01', sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
