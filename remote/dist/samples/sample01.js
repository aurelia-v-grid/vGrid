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
        sample01.prototype.onRowDraw = function onRowDraw(data, collectionData) {
          if (data) {
            if (data.number > 100) {
              data.numberColor = "green";
              data.numberFont = "normal";
            } else {
              data.numberColor = "red";
              data.numberFont = "bold";
            }
          }
        };

        sample01.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample01.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        sample01.prototype.myBtn = function myBtn() {
          var _this = this;

          this.myGrid.ctx.setSorting({ attribute: "name", asc: true }, true);
          this.myGrid.ctx.setSorting({ attribute: "index", asc: true }, true);

          var simpleFilter = function simpleFilter(attribute, value, operator) {
            var _this$myGrid$ctx$vGri;

            _this.myGrid.ctx.vGridFilter.queryStrings = (_this$myGrid$ctx$vGri = {}, _this$myGrid$ctx$vGri[attribute] = value, _this$myGrid$ctx$vGri);
            _this.myGrid.ctx.rebuildColumns();
            _this.myGrid.ctx.runFilter([{ attribute: attribute, value: value, operator: operator }]);
          };
          simpleFilter("name", "ge", "*");
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
          var _this2 = this;

          _classCallCheck(this, sample01);

          _initialiseProps.call(this);

          this.element = element;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(10000, function (data) {
            _this2.myCollection = data;
            _this2.collectionLength = _this2.myCollection.length;
          });
        }

        sample01.prototype.attached = function attached() {
          this.getMaxRows = this.myGrid.ctx.getMaxRows();
        };

        sample01.prototype.editMode = function editMode() {

          if (this.lockStatus === "locked") {
            this.lockStatus = "unlocked";
            this.lockColor = "green";
            this.myGrid.ctx.setEditMode(true);
          } else {
            this.lockStatus = "locked";
            this.lockColor = "red";
            this.myGrid.ctx.setEditMode(false);
          }
        };

        sample01.prototype.replaceBtn = function replaceBtn(x) {
          var _this3 = this;

          this.dummyDataGenerator.reset();
          this.dummyDataGenerator.generateData(x, function (data) {
            _this3.myCollection = data;
            _this3.collectionLength = _this3.myCollection.length;
          });
        };

        sample01.prototype.addBtn = function addBtn(x, scrollBottom) {
          var _this4 = this;

          this.dummyDataGenerator.generateData(x, function (data) {
            data.forEach(function (x) {
              _this4.myCollection.push(x);
            });
            if (scrollBottom) {
              _this4.myGrid.ctx.scrollBottomNext();
            }

            _this4.collectionLength = _this4.myCollection.length;
          });
        };

        sample01.prototype.insertOneBtn = function insertOneBtn() {
          var _this5 = this;

          try {
            this.dummyDataGenerator.generateData(1, function (data) {
              _this5.myCollection.splice(2, 0, data[0]);
            });
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.insertFiveBtn = function insertFiveBtn() {
          var _this6 = this;

          try {
            for (var i = 0; i < 5; i++) {
              this.dummyDataGenerator.generateData(1, function (data) {
                _this6.myCollection.splice(2, 0, data[0]);
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
          var _this7 = this;

          this.myCollection.pop();

          this.myCollection.splice(2, 2);

          this.myCollection.splice(4, 2);

          this.dummyDataGenerator.generateData(2, function (data) {
            _this7.myCollection.push(data[0]);
            _this7.myCollection.push(data[1]);
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

        sample01.prototype.switchNameBtn = function switchNameBtn() {
          var oldState = this.myGrid.ctx.getColumns(this.oldState);
          var oldIndex = oldState.colAttrArray.indexOf("name");
          var newIndex = oldState.colAttrArray.indexOf("color");

          oldState.colAttrArray[oldIndex] = "color";
          oldState.colAttrArray[newIndex] = "name";

          oldState.colHeaderArray[oldIndex] = "Color";
          oldState.colHeaderArray[newIndex] = "Name";

          this.myGrid.ctx.setColumns(oldState);
          this.myGrid.ctx.rebuildColumns();
        };

        sample01.prototype.report = function report() {
          this.myGrid.ctx.createReport();
        };

        sample01.prototype.redraw = function redraw() {
          this.myGrid.ctx.redrawGrid();
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.wow = "cool";
        this.myGrid = {};
        this.collectionLength = 0;
        this.lockStatus = "locked";
        this.lockColor = "red";
        this.oldState = null;
      }, _temp));

      _export("sample01", sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsd0IsMkJBQUEsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHSyxROzJCQXlCWCxTLHNCQUFXLEksRUFBTSxjLEVBQWdCO0FBQy9CLGNBQUksSUFBSixFQUFVO0FBQ1IsZ0JBQUcsS0FBSyxNQUFMLEdBQVksR0FBZixFQUFtQjtBQUNqQixtQkFBSyxXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsbUJBQUssVUFBTCxHQUFrQixRQUFsQjtBQUNELGFBSEQsTUFHTztBQUNMLG1CQUFLLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxtQkFBSyxVQUFMLEdBQWtCLE1BQWxCO0FBQ0Q7QUFDRjtBQUVGLFM7OzJCQUdELFcsd0JBQVksQyxFQUFFO0FBQ1osa0JBQVEsR0FBUixDQUFZLE9BQVo7QUFDRCxTOzsyQkFHRCxjLDJCQUFlLEMsRUFBRTtBQUNmLGtCQUFRLEdBQVIsQ0FBWSxVQUFaO0FBQ0QsUzs7MkJBRUQsSyxvQkFBTztBQUFBOztBQUdMLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkIsRUFBQyxXQUFVLE1BQVgsRUFBbUIsS0FBSSxJQUF2QixFQUEzQixFQUF5RCxJQUF6RDtBQUNBLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkIsRUFBQyxXQUFVLE9BQVgsRUFBb0IsS0FBSSxJQUF4QixFQUEzQixFQUEwRCxJQUExRDs7QUFFQSxjQUFJLGVBQWUsU0FBZixZQUFlLENBQUMsU0FBRCxFQUFZLEtBQVosRUFBbUIsUUFBbkIsRUFBOEI7QUFBQTs7QUFDL0Msa0JBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsV0FBaEIsQ0FBNEIsWUFBNUIsc0RBQTRDLFNBQTVDLElBQXVELEtBQXZEO0FBQ0Esa0JBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsY0FBaEI7QUFDQSxrQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixTQUFo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QUNoRCxtQkFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLEtBQUssQ0FBTCxDQUF2QjtBQUNBLG1CQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsS0FBSyxDQUFMLENBQXZCO0FBQ0QsV0FIRDtBQUtELFM7OzJCQVFELFksMkJBQWM7QUFDWixlQUFLLFFBQUwsR0FBZ0IsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQixDQUEyQixLQUFLLFFBQWhDLENBQWhCO0FBQ0QsUzs7MkJBRUQsWSwyQkFBYztBQUNaLGNBQUcsS0FBSyxRQUFSLEVBQWlCO0FBQ2YsaUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkIsS0FBSyxRQUFoQztBQUNBLGlCQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGNBQWhCO0FBQ0Q7QUFFRixTOzsyQkFFRCxhLDRCQUFlO0FBQ2IsY0FBSSxXQUFXLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkIsS0FBSyxRQUFoQyxDQUFmO0FBQ0EsY0FBSSxXQUFVLFNBQVMsWUFBVCxDQUFzQixPQUF0QixDQUE4QixNQUE5QixDQUFkO0FBQ0EsY0FBSSxXQUFVLFNBQVMsWUFBVCxDQUFzQixPQUF0QixDQUE4QixPQUE5QixDQUFkOztBQUdBLG1CQUFTLFlBQVQsQ0FBc0IsUUFBdEIsSUFBa0MsT0FBbEM7QUFDQSxtQkFBUyxZQUFULENBQXNCLFFBQXRCLElBQWtDLE1BQWxDOztBQUVBLG1CQUFTLGNBQVQsQ0FBd0IsUUFBeEIsSUFBb0MsT0FBcEM7QUFDQSxtQkFBUyxjQUFULENBQXdCLFFBQXhCLElBQW9DLE1BQXBDOztBQUdBLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkIsUUFBM0I7QUFDQSxlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGNBQWhCO0FBRUQsUzs7MkJBRUQsTSxxQkFBUTtBQUNOLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsWUFBaEI7QUFDRCxTOzsyQkFFRCxNLHFCQUFRO0FBQ04sZUFBSyxNQUFMLENBQVksR0FBWixDQUFnQixVQUFoQjtBQUNELFM7OztrQkEzT00sTSxHQUFTLENBQUMsT0FBRCxFQUFVLGtCQUFWLEM7YUFNaEIsWSxHQUFlLEU7YUFDZixlLEdBQWtCLEU7YUFFbEIsRyxHQUFNLE07YUFFTixNLEdBQVMsRTthQW1EVCxnQixHQUFrQixDO2FBdUJsQixVLEdBQWEsUTthQUNiLFMsR0FBWSxLO2FBK0daLFEsR0FBVSxJIiwiZmlsZSI6InNhbXBsZXMvc2FtcGxlMDEuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
