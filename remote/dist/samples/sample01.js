"use strict";

System.register(["data/dummyDataGenerator"], function (_export, _context) {
  "use strict";

  var dummyDataGenerator, _createClass, _class, _temp, _initialiseProps, sample01;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dataDummyDataGenerator) {
      dummyDataGenerator = _dataDummyDataGenerator.dummyDataGenerator;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("sample01", sample01 = (_temp = _class = function () {
        sample01.prototype.onRowDraw = function onRowDraw(data) {
          if (data) {
            if (data.tempRef) {
              if (data.tempRef.number > 100) {
                data.tempRef.numberColor = "green";
                data.tempRef.numberFont = "normal";
              } else {
                data.tempRef.numberColor = "red";
                data.tempRef.numberFont = "bold";
              }
            }
          }
        };

        sample01.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample01.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        _createClass(sample01, [{
          key: "filteredRows",
          get: function get() {
            if (this.myGrid.ctx) {
              return this.myGrid.ctx.vGridCollectionFiltered.length;
            } else {
              return 0;
            }
          }
        }]);

        function sample01(element, dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample01);

          _initialiseProps.call(this);

          this.element = element;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(10000, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

        sample01.prototype.attached = function attached() {
          this.getMaxRows = this.myGrid.ctx.getMaxRows();
        };

        sample01.prototype.replaceBtn = function replaceBtn(x) {
          var _this2 = this;

          this.dummyDataGenerator.reset();
          this.dummyDataGenerator.generateData(x, function (data) {
            _this2.myCollection = data;
            _this2.collectionLength = _this2.myCollection.length;
          });
        };

        sample01.prototype.addBtn = function addBtn(x, scrollBottom) {
          var _this3 = this;

          this.dummyDataGenerator.generateData(x, function (data) {
            data.forEach(function (x) {
              _this3.myCollection.push(x);
            });
            if (scrollBottom) {
              _this3.myGrid.ctx.scrollBottomNext();
            }

            _this3.collectionLength = _this3.myCollection.length;
          });
        };

        sample01.prototype.insertOneBtn = function insertOneBtn() {
          var _this4 = this;

          try {
            this.dummyDataGenerator.generateData(1, function (data) {
              _this4.myCollection.splice(2, 0, data[0]);
            });
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.insertFiveBtn = function insertFiveBtn() {
          var _this5 = this;

          try {
            for (var i = 0; i < 5; i++) {
              this.dummyDataGenerator.generateData(1, function (data) {
                _this5.myCollection.splice(2, 0, data[0]);
              });
            }
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.removeFirstBtn = function removeFirstBtn() {
          this.myCollection.splice(0, 1);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeLastBtn = function removeLastBtn() {
          this.myCollection.pop();
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeFirstxBtn = function removeFirstxBtn(x) {
          this.myCollection.splice(0, x);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeLastxBtn = function removeLastxBtn(x) {
          this.myCollection.splice(this.myCollection.length - x, x);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.miscBtn = function miscBtn() {
          var _this6 = this;

          this.myCollection.pop();

          this.myCollection.splice(2, 2);

          this.myCollection.splice(4, 2);

          this.dummyDataGenerator.generateData(2, function (data) {
            _this6.myCollection.push(data[0]);
            _this6.myCollection.push(data[1]);
          });
        };

        sample01.prototype.saveStateBtn = function saveStateBtn() {
          this.oldState = this.myGrid.ctx.getColumns(this.oldState);
        };

        sample01.prototype.loadStateBtn = function loadStateBtn() {
          if (this.oldState) {
            this.myGrid.ctx.setColumns(this.oldState);
            this.myGrid.ctx.rebuildColumns();
          }
        };

        sample01.prototype.redrawGrid = function redrawGrid() {
          var t0 = performance.now();
          this.myGrid.ctx.redrawGrid();
          var t1 = performance.now();
          console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
        };

        sample01.prototype.report = function report() {
          this.myGrid.ctx.createReport();
        };

        sample01.prototype.redraw = function redraw() {
          this.myGrid.ctx.redrawGrid();
        };

        sample01.prototype.runFilterByCode = function runFilterByCode() {
          var _this7 = this;

          this.myGrid.ctx.setSorting({ attribute: "name", asc: true }, true);
          this.myGrid.ctx.setSorting({ attribute: "index", asc: true }, true);

          var simpleFilter = function simpleFilter(attribute, value, operator) {
            var _this7$myGrid$ctx$vGr;

            _this7.myGrid.ctx.vGridFilter.queryStrings = (_this7$myGrid$ctx$vGr = {}, _this7$myGrid$ctx$vGr[attribute] = value, _this7$myGrid$ctx$vGr);
            _this7.myGrid.ctx.rebuildColumns();
            _this7.myGrid.ctx.runFilter([{ attribute: attribute, value: value, operator: operator }]);
          };
          simpleFilter("name", "ge", "*");
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
        this.collectionLength = 0;
        this.oldState = null;
      }, _temp));

      _export("sample01", sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsd0IsMkJBQUEsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHSyxROzJCQW9CWCxTLHNCQUFVLEksRUFBTTtBQUNkLGNBQUksSUFBSixFQUFVO0FBQ1IsZ0JBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2hCLGtCQUFJLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsR0FBMUIsRUFBK0I7QUFDN0IscUJBQUssT0FBTCxDQUFhLFdBQWIsR0FBMkIsT0FBM0I7QUFDQSxxQkFBSyxPQUFMLENBQWEsVUFBYixHQUEwQixRQUExQjtBQUNELGVBSEQsTUFHTztBQUNMLHFCQUFLLE9BQUwsQ0FBYSxXQUFiLEdBQTJCLEtBQTNCO0FBQ0EscUJBQUssT0FBTCxDQUFhLFVBQWIsR0FBMEIsTUFBMUI7QUFDRDtBQUNGO0FBQ0Y7QUFFRixTOzsyQkFHRCxXLHdCQUFZLEMsRUFBRztBQUNiLGtCQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0QsUzs7MkJBR0QsYywyQkFBZSxDLEVBQUc7QUFDaEIsa0JBQVEsR0FBUixDQUFZLFVBQVo7QUFDRCxTOzs7OzhCQWhDa0I7QUFDakIsZ0JBQUksS0FBSyxNQUFMLENBQVksR0FBaEIsRUFBcUI7QUFDbkIscUJBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQix1QkFBaEIsQ0FBd0MsTUFBL0M7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxDQUFQO0FBQ0Q7QUFDRjs7O0FBa0NELDBCQUFZLE9BQVosRUFBcUIsa0JBQXJCLEVBQXlDO0FBQUE7O0FBQUE7O0FBQUE7O0FBRXZDLGVBQUssT0FBTCxHQUFlLE9BQWY7O0FBR0EsZUFBSyxrQkFBTCxHQUEwQixrQkFBMUI7QUFDQSxlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLEVBQTRDLFVBQUMsSUFBRCxFQUFVO0FBQ3BELGtCQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxrQkFBSyxnQkFBTCxHQUF3QixNQUFLLFlBQUwsQ0FBa0IsTUFBMUM7QUFDRCxXQUhEO0FBS0Q7OzJCQUVELFEsdUJBQVc7QUFDVCxlQUFLLFVBQUwsR0FBa0IsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixFQUFsQjtBQUVELFM7OzJCQU9ELFUsdUJBQVcsQyxFQUFHO0FBQUE7O0FBRVosZUFBSyxrQkFBTCxDQUF3QixLQUF4QjtBQUNBLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsQ0FBckMsRUFBd0MsVUFBQyxJQUFELEVBQVU7QUFDaEQsbUJBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNBLG1CQUFLLGdCQUFMLEdBQXdCLE9BQUssWUFBTCxDQUFrQixNQUExQztBQUNELFdBSEQ7QUFJRCxTOzsyQkFFRCxNLG1CQUFPLEMsRUFBRyxZLEVBQWM7QUFBQTs7QUFFdEIsZUFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFDLElBQUQsRUFBVTtBQUNoRCxpQkFBSyxPQUFMLENBQWEsVUFBQyxDQUFELEVBQU87QUFDbEIscUJBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixDQUF2QjtBQUNELGFBRkQ7QUFHQSxnQkFBSSxZQUFKLEVBQWtCO0FBQ2hCLHFCQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGdCQUFoQjtBQUNEOztBQUVELG1CQUFLLGdCQUFMLEdBQXdCLE9BQUssWUFBTCxDQUFrQixNQUExQztBQUNELFdBVEQ7QUFVRCxTOzsyQkFHRCxZLDJCQUFlO0FBQUE7O0FBQ2IsY0FBSTtBQUNGLGlCQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELHFCQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsS0FBSyxDQUFMLENBQS9CO0FBQ0QsYUFGRDtBQUdELFdBSkQsQ0FJRSxPQUFPLENBQVAsRUFBVTtBQUNWLG9CQUFRLEdBQVIsQ0FBWSxDQUFaO0FBQ0Q7QUFDRixTOzsyQkFFRCxhLDRCQUFnQjtBQUFBOztBQUNkLGNBQUk7QUFDRixpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLENBQXBCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQzFCLG1CQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELHVCQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsS0FBSyxDQUFMLENBQS9CO0FBQ0QsZUFGRDtBQUdEO0FBQ0YsV0FORCxDQU1FLE9BQU8sQ0FBUCxFQUFVO0FBQ1Ysb0JBQVEsR0FBUixDQUFZLENBQVo7QUFDRDtBQUNGLFM7OzJCQUdELGMsNkJBQWlCO0FBQ2YsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCO0FBQ0EsZUFBSyxnQkFBTCxHQUF3QixLQUFLLFlBQUwsQ0FBa0IsTUFBMUM7QUFDRCxTOzsyQkFFRCxhLDRCQUFnQjtBQUNkLGVBQUssWUFBTCxDQUFrQixHQUFsQjtBQUNBLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxZQUFMLENBQWtCLE1BQTFDO0FBQ0QsUzs7MkJBRUQsZSw0QkFBZ0IsQyxFQUFHO0FBQ2pCLGVBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixDQUF6QixFQUE0QixDQUE1QjtBQUNBLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxZQUFMLENBQWtCLE1BQTFDO0FBRUQsUzs7MkJBR0QsYywyQkFBZSxDLEVBQUc7QUFDaEIsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLEtBQUssWUFBTCxDQUFrQixNQUFsQixHQUEyQixDQUFwRCxFQUF1RCxDQUF2RDtBQUNBLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxZQUFMLENBQWtCLE1BQTFDO0FBRUQsUzs7MkJBRUQsTyxzQkFBVTtBQUFBOztBQUNSLGVBQUssWUFBTCxDQUFrQixHQUFsQjs7QUFFQSxlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUI7O0FBRUEsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCOztBQUVBLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsQ0FBckMsRUFBd0MsVUFBQyxJQUFELEVBQVU7QUFDaEQsbUJBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixLQUFLLENBQUwsQ0FBdkI7QUFDQSxtQkFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLEtBQUssQ0FBTCxDQUF2QjtBQUNELFdBSEQ7QUFLRCxTOzsyQkFRRCxZLDJCQUFlO0FBQ2IsZUFBSyxRQUFMLEdBQWdCLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkIsS0FBSyxRQUFoQyxDQUFoQjtBQUNELFM7OzJCQUVELFksMkJBQWU7QUFDYixjQUFJLEtBQUssUUFBVCxFQUFtQjtBQUNqQixpQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixDQUEyQixLQUFLLFFBQWhDO0FBQ0EsaUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsY0FBaEI7QUFDRDtBQUVGLFM7OzJCQUVELFUseUJBQWE7QUFDWCxjQUFJLEtBQUssWUFBWSxHQUFaLEVBQVQ7QUFDQSxlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCO0FBQ0EsY0FBSSxLQUFLLFlBQVksR0FBWixFQUFUO0FBQ0Esa0JBQVEsR0FBUixDQUFZLCtCQUErQixLQUFLLEVBQXBDLElBQTBDLGdCQUF0RDtBQUNELFM7OzJCQUVELE0scUJBQVM7QUFDUCxlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFlBQWhCO0FBQ0QsUzs7MkJBRUQsTSxxQkFBUztBQUNQLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEI7QUFDRCxTOzsyQkFFRCxlLDhCQUFrQjtBQUFBOztBQUdoQixlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLENBQTJCLEVBQUMsV0FBVyxNQUFaLEVBQW9CLEtBQUssSUFBekIsRUFBM0IsRUFBMkQsSUFBM0Q7QUFDQSxlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLENBQTJCLEVBQUMsV0FBVyxPQUFaLEVBQXFCLEtBQUssSUFBMUIsRUFBM0IsRUFBNEQsSUFBNUQ7O0FBRUEsY0FBSSxlQUFlLFNBQWYsWUFBZSxDQUFDLFNBQUQsRUFBWSxLQUFaLEVBQW1CLFFBQW5CLEVBQStCO0FBQUE7O0FBQ2hELG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFdBQWhCLENBQTRCLFlBQTVCLHNEQUE2QyxTQUE3QyxJQUF5RCxLQUF6RDtBQUNBLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGNBQWhCO0FBQ0EsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FBQyxFQUFDLFdBQVcsU0FBWixFQUF1QixPQUFPLEtBQTlCLEVBQXFDLFVBQVUsUUFBL0MsRUFBRCxDQUExQjtBQUNELFdBSkQ7QUFLQSx1QkFBYSxNQUFiLEVBQXFCLElBQXJCLEVBQTJCLEdBQTNCO0FBQ0QsUzs7O2tCQTFNTSxNLEdBQVMsQ0FBQyxPQUFELEVBQVUsa0JBQVYsQzthQU1oQixZLEdBQWUsRTthQUNmLGUsR0FBa0IsRTthQUNsQixNLEdBQVMsRTthQXFDVCxnQixHQUFtQixDO2FBb0huQixRLEdBQVcsSSIsImZpbGUiOiJzYW1wbGVzL3NhbXBsZTAxLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
