"use strict";

System.register(["data/dummyDataGenerator"], function (_export, _context) {
  var dummyDataGenerator, _class, _temp, _initialiseProps, sample01;

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
      _export("sample01", sample01 = (_temp = _class = function () {
        sample01.prototype.editClickBtn = function editClickBtn(e) {
          e.editable = true;
        };

        sample01.prototype.saveClickBtn = function saveClickBtn(e) {
          e.editable = false;
          e.currentEntityRef.name = e.name;
          e.currentEntityRef.country = e.country;
        };

        sample01.prototype.cancelClickBtn = function cancelClickBtn(e) {
          e.editable = false;
          e.name = e.currentEntityRef.name;
          e.country = e.currentEntityRef.country;
        };

        sample01.prototype.onRowDraw = function onRowDraw(data, collectionData) {
          if (data) {
            if (data.number > 100) {
              data.numberColor = "green";
              data.numberFont = "normal";
            } else {
              data.numberColor = "lightgrey";
              data.numberFont = "bold";
            }
          }
          data = collectionData;
        };

        sample01.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample01.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        sample01.prototype.onDatePickerCreate = function onDatePickerCreate(element, that) {
          var picker = new pikaday({
            field: element,
            onSelect: function onSelect(date) {
              that.setValue(date);
              that.setCss();
            },
            onOpen: function onOpen() {
              if (!that.editMode()) {
                this.hide();
              }
            }
          });
        };

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

        sample01.prototype.rowHeightBtn = function rowHeightBtn(x) {

          this.myGrid.ctx.setRowHeight(x);
          this.status.row25 = "";
          this.status.row50 = "";
          this.status.row75 = "";
          this.status.row100 = "";

          switch (x) {
            case 25:
              this.status.row25 = "lightgrey";
              break;
            case 50:
              this.status.row50 = "lightgrey";
              break;
            case 75:
              this.status.row75 = "lightgrey";
              break;
            case 100:
              this.status.row100 = "lightgrey";
              break;
          }
        };

        sample01.prototype.headerHeightBtn = function headerHeightBtn(x) {
          this.myGrid.ctx.setHeaderHeight(x);
          this.status.header0 = "";
          this.status.header25 = "";
          this.status.header50 = "";
          this.status.header75 = "";

          switch (x) {
            case 0:
              this.status.header0 = "lightgrey";
              break;
            case 25:
              this.status.header25 = "lightgrey";
              break;
            case 50:
              this.status.header50 = "lightgrey";
              break;
            case 75:
              this.status.header75 = "lightgrey";
              break;
          }
        };

        sample01.prototype.footerHeightBtn = function footerHeightBtn(x) {
          this.myGrid.ctx.setFooterHeight(x);
          this.status.footer0 = "";
          this.status.footer25 = "";
          this.status.footer50 = "";
          this.status.footer75 = "";

          switch (x) {
            case 0:
              this.status.footer0 = "lightgrey";
              break;
            case 25:
              this.status.footer25 = "lightgrey";
              break;
            case 50:
              this.status.footer50 = "lightgrey";
              break;
            case 75:
              this.status.footer75 = "lightgrey";
              break;
          }
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

        sample01.prototype.selectionBtn = function selectionBtn(x) {

          this.status.noSelect = "";
          this.status.singleSelect = "";
          this.status.multiSelect = "";

          switch (x) {
            case 0:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.disableSelection();
              this.status.noSelect = "lightgrey";
              break;
            case 1:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.setSingleSelection();
              this.status.singleSelect = "lightgrey";
              break;
            case 2:
              this.myGrid.ctx.selection.reset();
              this.myGrid.ctx.setMultiSelection();
              this.status.multiSelect = "lightgrey";
              break;
          }
        };

        sample01.prototype.sortableBtn = function sortableBtn(x) {

          this.status.sortable0 = "";
          this.status.sortable1 = "";
          switch (x) {
            case 0:
              this.headerHeightBtn(50);
              this.myGrid.ctx.disableSortableColumns();
              this.status.sortable0 = "lightgrey";
              break;
            case 1:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableSortableColumns();
              this.status.sortable1 = "lightgrey";
              break;

          }
        };

        sample01.prototype.resizeBtn = function resizeBtn(x) {
          this.status.resize0 = "";
          this.status.resize1 = "";
          this.status.resize2 = "";
          switch (x) {
            case 0:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableResizableColumns();
              this.status.resize0 = "lightgrey";
              break;
            case 1:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableResizableColumns(true);
              this.status.resize1 = "lightgrey";
              break;
            case 2:
              this.headerHeightBtn(50);
              this.myGrid.ctx.disableResizableColumns();
              this.status.resize2 = "lightgrey";
              break;

          }
        };

        sample01.prototype.lockedBtn = function lockedBtn(x) {
          this.status.locked0 = "";
          this.status.locked1 = "";
          this.status.locked2 = "";
          this.status.locked3 = "";
          switch (x) {
            case 0:
              this.myGrid.ctx.setLockedColumns(0);
              this.status.locked0 = "lightgrey";
              break;
            case 1:
              this.myGrid.ctx.setLockedColumns(1);
              this.status.locked1 = "lightgrey";
              break;
            case 2:
              this.myGrid.ctx.setLockedColumns(2);
              this.status.locked2 = "lightgrey";
              break;
            case 3:
              this.myGrid.ctx.setLockedColumns(3);
              this.status.locked3 = "lightgrey";
              break;

          }
        };

        sample01.prototype.setFilterBtn = function setFilterBtn(x) {

          this.status.filter0 = "";
          this.status.filter1 = "";
          switch (x) {
            case 0:
              this.headerHeightBtn(50);
              this.myGrid.ctx.disableHeaderFilter();
              this.status.filter0 = "lightgrey";
              break;
            case 1:
              this.headerHeightBtn(50);
              this.myGrid.ctx.enableHeaderFilter();
              this.status.filter1 = "lightgrey";
              break;
          }
        };

        sample01.prototype.setFilterAtBtn = function setFilterAtBtn(x) {

          this.status.filterAt0 = "";
          this.status.filterAt1 = "";
          switch (x) {
            case 0:
              this.myGrid.ctx.setHeaderFilterAtBottom();
              this.status.filterAt0 = "lightgrey";
              break;
            case 1:
              this.myGrid.ctx.setHeaderFilterAtTop();
              this.status.filterAt1 = "lightgrey";
              break;
          }
        };

        sample01.prototype.setSortBtn = function setSortBtn(x) {

          this.status.sort0 = "";
          this.status.sort1 = "";
          switch (x) {
            case 0:
              this.myGrid.ctx.disableHeaderSort();
              this.status.sort0 = "lightgrey";
              break;
            case 1:
              this.myGrid.ctx.enableHeaderSort();
              this.status.sort1 = "lightgrey";
              break;
          }
        };

        sample01.prototype.report = function report() {
          this.myGrid.ctx.createReport();
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
        this.collectionLength = 0;
        this.lockStatus = "locked";
        this.lockColor = "red";
        this.status = {
          header50: "lightgrey",
          row50: "lightgrey",
          footer0: "lightgrey",
          sortable1: "lightgrey",
          resize1: "lightgrey",
          multiSelect: "lightgrey",
          locked0: "lightgrey",
          filter1: "lightgrey",
          filterAt1: "lightgrey",
          sort1: "lightgrey"

        };
        this.oldState = null;
      }, _temp));

      _export("sample01", sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFROzs7MEJBR0s7MkJBY1gscUNBQWEsR0FBRTtBQUNiLFlBQUUsUUFBRixHQUFhLElBQWIsQ0FEYTs7O0FBZEosMkJBa0JYLHFDQUFhLEdBQUU7QUFDYixZQUFFLFFBQUYsR0FBYSxLQUFiLENBRGE7QUFFYixZQUFFLGdCQUFGLENBQW1CLElBQW5CLEdBQTBCLEVBQUUsSUFBRixDQUZiO0FBR2IsWUFBRSxnQkFBRixDQUFtQixPQUFuQixHQUE2QixFQUFFLE9BQUYsQ0FIaEI7OztBQWxCSiwyQkF3QlgseUNBQWUsR0FBRTtBQUNmLFlBQUUsUUFBRixHQUFhLEtBQWIsQ0FEZTtBQUVmLFlBQUUsSUFBRixHQUFTLEVBQUUsZ0JBQUYsQ0FBbUIsSUFBbkIsQ0FGTTtBQUdmLFlBQUUsT0FBRixHQUFZLEVBQUUsZ0JBQUYsQ0FBbUIsT0FBbkIsQ0FIRzs7O0FBeEJOLDJCQWdDWCwrQkFBVyxNQUFNLGdCQUFnQjtBQUMvQixjQUFJLElBQUosRUFBVTtBQUNSLGdCQUFHLEtBQUssTUFBTCxHQUFZLEdBQVosRUFBZ0I7QUFDakIsbUJBQUssV0FBTCxHQUFtQixPQUFuQixDQURpQjtBQUVqQixtQkFBSyxVQUFMLEdBQWtCLFFBQWxCLENBRmlCO2FBQW5CLE1BR087QUFDTCxtQkFBSyxXQUFMLEdBQW1CLFdBQW5CLENBREs7QUFFTCxtQkFBSyxVQUFMLEdBQWtCLE1BQWxCLENBRks7YUFIUDtXQURGO0FBU0EsaUJBQU8sY0FBUCxDQVYrQjs7O0FBaEN0QiwyQkE2Q1gsbUNBQVksR0FBRTtBQUNaLGtCQUFRLEdBQVIsQ0FBWSxPQUFaLEVBRFk7OztBQTdDSCwyQkFpRFgseUNBQWUsR0FBRTtBQUNmLGtCQUFRLEdBQVIsQ0FBWSxVQUFaLEVBRGU7OztBQWpETiwyQkFvRFgsaURBQW1CLFNBQVMsTUFBSztBQUMvQixjQUFJLFNBQVMsSUFBSSxPQUFKLENBQVk7QUFDdkIsbUJBQU8sT0FBUDtBQUNBLHNCQUFVLGtCQUFTLElBQVQsRUFBZTtBQUN2QixtQkFBSyxRQUFMLENBQWMsSUFBZCxFQUR1QjtBQUV2QixtQkFBSyxNQUFMLEdBRnVCO2FBQWY7QUFJVixzQ0FBUTtBQUNOLGtCQUFHLENBQUMsS0FBSyxRQUFMLEVBQUQsRUFBaUI7QUFDbEIscUJBQUssSUFBTCxHQURrQjtlQUFwQjthQVBxQjtXQUFaLENBQVQsQ0FEMkI7OztBQXNCakMsaUJBMUVXLFFBMEVYLENBQVksT0FBWixFQUFxQixrQkFBckIsRUFBeUM7OztnQ0ExRTlCLFVBMEU4Qjs7OztBQUV2QyxlQUFLLE9BQUwsR0FBZSxPQUFmLENBRnVDOztBQUt2QyxlQUFLLGtCQUFMLEdBQTBCLGtCQUExQixDQUx1QztBQU12QyxlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLEVBQTRDLFVBQUMsSUFBRCxFQUFVO0FBQ3BELGtCQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FEb0Q7QUFFcEQsa0JBQUssZ0JBQUwsR0FBd0IsTUFBSyxZQUFMLENBQWtCLE1BQWxCLENBRjRCO1dBQVYsQ0FBNUMsQ0FOdUM7U0FBekM7O0FBMUVXLDJCQTBGWCwrQkFBVTs7QUFFUixjQUFHLEtBQUssVUFBTCxLQUFtQixRQUFuQixFQUE2QjtBQUM5QixpQkFBSyxVQUFMLEdBQWtCLFVBQWxCLENBRDhCO0FBRTlCLGlCQUFLLFNBQUwsR0FBaUIsT0FBakIsQ0FGOEI7QUFHOUIsaUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsV0FBaEIsQ0FBNEIsSUFBNUIsRUFIOEI7V0FBaEMsTUFJTTtBQUNKLGlCQUFLLFVBQUwsR0FBa0IsUUFBbEIsQ0FESTtBQUVKLGlCQUFLLFNBQUwsR0FBaUIsS0FBakIsQ0FGSTtBQUdKLGlCQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFdBQWhCLENBQTRCLEtBQTVCLEVBSEk7V0FKTjs7O0FBNUZTLDJCQThHWCxpQ0FBVyxHQUFHOzs7QUFFWixlQUFLLGtCQUFMLENBQXdCLEtBQXhCLEdBRlk7QUFHWixlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELG1CQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FEZ0Q7QUFFaEQsbUJBQUssZ0JBQUwsR0FBd0IsT0FBSyxZQUFMLENBQWtCLE1BQWxCLENBRndCO1dBQVYsQ0FBeEMsQ0FIWTs7O0FBOUdILDJCQXVIWCx5QkFBTyxHQUFHLGNBQWM7OztBQUV0QixlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELGlCQUFLLE9BQUwsQ0FBYSxVQUFDLENBQUQsRUFBTztBQUNsQixxQkFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLENBQXZCLEVBRGtCO2FBQVAsQ0FBYixDQURnRDtBQUloRCxnQkFBRyxZQUFILEVBQWdCO0FBQ2QscUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsZ0JBQWhCLEdBRGM7YUFBaEI7O0FBSUEsbUJBQUssZ0JBQUwsR0FBd0IsT0FBSyxZQUFMLENBQWtCLE1BQWxCLENBUndCO1dBQVYsQ0FBeEMsQ0FGc0I7OztBQXZIYiwyQkFzSVgsdUNBQWM7OztBQUNaLGNBQUk7QUFDRixpQkFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFDLElBQUQsRUFBVTtBQUNoRCxxQkFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEtBQUssQ0FBTCxDQUEvQixFQURnRDthQUFWLENBQXhDLENBREU7V0FBSixDQUlFLE9BQU8sQ0FBUCxFQUFTO0FBQ1Qsb0JBQVEsR0FBUixDQUFZLENBQVosRUFEUztXQUFUOzs7QUEzSU8sMkJBZ0pYLHlDQUFlOzs7QUFDYixjQUFJO0FBQ0YsaUJBQUksSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF0QixFQUEwQjtBQUN4QixtQkFBSyxrQkFBTCxDQUF3QixZQUF4QixDQUFxQyxDQUFyQyxFQUF3QyxVQUFDLElBQUQsRUFBVTtBQUNoRCx1QkFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLEtBQUssQ0FBTCxDQUEvQixFQURnRDtlQUFWLENBQXhDLENBRHdCO2FBQTFCO1dBREYsQ0FNRSxPQUFPLENBQVAsRUFBUztBQUNULG9CQUFRLEdBQVIsQ0FBWSxDQUFaLEVBRFM7V0FBVDs7O0FBdkpPLDJCQTZKWCwyQ0FBaUI7QUFDZixlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFEZTtBQUVmLGVBQUssZ0JBQUwsR0FBd0IsS0FBSyxZQUFMLENBQWtCLE1BQWxCLENBRlQ7OztBQTdKTiwyQkFrS1gseUNBQWdCO0FBQ2QsZUFBSyxZQUFMLENBQWtCLEdBQWxCLEdBRGM7QUFFZCxlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZWOzs7QUFsS0wsMkJBdUtYLDJDQUFnQixHQUFHO0FBQ2pCLGVBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixFQURpQjtBQUVqQixlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZQOzs7QUF2S1IsMkJBOEtYLHlDQUFlLEdBQUc7QUFDaEIsZUFBSyxZQUFMLENBQWtCLE1BQWxCLENBQXlCLEtBQUssWUFBTCxDQUFrQixNQUFsQixHQUEyQixDQUEzQixFQUE4QixDQUF2RCxFQURnQjtBQUVoQixlQUFLLGdCQUFMLEdBQXdCLEtBQUssWUFBTCxDQUFrQixNQUFsQixDQUZSOzs7QUE5S1AsMkJBb0xYLDZCQUFTOzs7QUFDUCxlQUFLLFlBQUwsQ0FBa0IsR0FBbEIsR0FETzs7QUFHUCxlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFITzs7QUFLUCxlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFMTzs7QUFPUCxlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLENBQXJDLEVBQXdDLFVBQUMsSUFBRCxFQUFVO0FBQ2hELG1CQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsS0FBSyxDQUFMLENBQXZCLEVBRGdEO0FBRWhELG1CQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsS0FBSyxDQUFMLENBQXZCLEVBRmdEO1dBQVYsQ0FBeEMsQ0FQTzs7O0FBcExFLDJCQXVOWCxxQ0FBYSxHQUFHOztBQUVkLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsWUFBaEIsQ0FBNkIsQ0FBN0IsRUFGYztBQUdkLGVBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsRUFBcEIsQ0FIYztBQUlkLGVBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsRUFBcEIsQ0FKYztBQUtkLGVBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsRUFBcEIsQ0FMYztBQU1kLGVBQUssTUFBTCxDQUFZLE1BQVosR0FBcUIsRUFBckIsQ0FOYzs7QUFRZCxrQkFBTyxDQUFQO0FBQ0UsaUJBQUssRUFBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLFdBQXBCLENBREY7QUFFRSxvQkFGRjtBQURGLGlCQUlPLEVBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksS0FBWixHQUFvQixXQUFwQixDQURGO0FBRUUsb0JBRkY7QUFKRixpQkFPTyxFQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsV0FBcEIsQ0FERjtBQUVFLG9CQUZGO0FBUEYsaUJBVU8sR0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQXFCLFdBQXJCLENBREY7QUFFRSxvQkFGRjtBQVZGLFdBUmM7OztBQXZOTCwyQkFpUFgsMkNBQWdCLEdBQUc7QUFDakIsZUFBSyxNQUFMLENBQVksR0FBWixDQUFnQixlQUFoQixDQUFnQyxDQUFoQyxFQURpQjtBQUVqQixlQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLEVBQXRCLENBRmlCO0FBR2pCLGVBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsRUFBdkIsQ0FIaUI7QUFJakIsZUFBSyxNQUFMLENBQVksUUFBWixHQUF1QixFQUF2QixDQUppQjtBQUtqQixlQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLEVBQXZCLENBTGlCOztBQU9qQixrQkFBTyxDQUFQO0FBQ0UsaUJBQUssQ0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLFdBQXRCLENBREY7QUFFRSxvQkFGRjtBQURGLGlCQUlPLEVBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksUUFBWixHQUF1QixXQUF2QixDQURGO0FBRUUsb0JBRkY7QUFKRixpQkFPTyxFQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsV0FBdkIsQ0FERjtBQUVFLG9CQUZGO0FBUEYsaUJBVU8sRUFBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLFdBQXZCLENBREY7QUFFRSxvQkFGRjtBQVZGLFdBUGlCOzs7QUFqUFIsMkJBMFFYLDJDQUFnQixHQUFHO0FBQ2pCLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsZUFBaEIsQ0FBZ0MsQ0FBaEMsRUFEaUI7QUFFakIsZUFBSyxNQUFMLENBQVksT0FBWixHQUFzQixFQUF0QixDQUZpQjtBQUdqQixlQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLEVBQXZCLENBSGlCO0FBSWpCLGVBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsRUFBdkIsQ0FKaUI7QUFLakIsZUFBSyxNQUFMLENBQVksUUFBWixHQUF1QixFQUF2QixDQUxpQjs7QUFPakIsa0JBQU8sQ0FBUDtBQUNFLGlCQUFLLENBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksT0FBWixHQUFzQixXQUF0QixDQURGO0FBRUUsb0JBRkY7QUFERixpQkFJTyxFQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsV0FBdkIsQ0FERjtBQUVFLG9CQUZGO0FBSkYsaUJBT08sRUFBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLFdBQXZCLENBREY7QUFFRSxvQkFGRjtBQVBGLGlCQVVPLEVBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksUUFBWixHQUF1QixXQUF2QixDQURGO0FBRUUsb0JBRkY7QUFWRixXQVBpQjs7O0FBMVFSLDJCQW1TWCx1Q0FBYztBQUNaLGVBQUssUUFBTCxHQUFnQixLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLENBQTJCLEtBQUssUUFBTCxDQUEzQyxDQURZOzs7QUFuU0gsMkJBdVNYLHVDQUFjO0FBQ1osY0FBRyxLQUFLLFFBQUwsRUFBYztBQUNmLGlCQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLENBQTJCLEtBQUssUUFBTCxDQUEzQixDQURlO0FBRWYsaUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsY0FBaEIsR0FGZTtXQUFqQjs7O0FBeFNTLDJCQStTWCx5Q0FBZTtBQUNiLGNBQUksV0FBVyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFVBQWhCLENBQTJCLEtBQUssUUFBTCxDQUF0QyxDQURTO0FBRWIsY0FBSSxXQUFVLFNBQVMsWUFBVCxDQUFzQixPQUF0QixDQUE4QixNQUE5QixDQUFWLENBRlM7QUFHYixjQUFJLFdBQVUsU0FBUyxZQUFULENBQXNCLE9BQXRCLENBQThCLE9BQTlCLENBQVYsQ0FIUzs7QUFNYixtQkFBUyxZQUFULENBQXNCLFFBQXRCLElBQWtDLE9BQWxDLENBTmE7QUFPYixtQkFBUyxZQUFULENBQXNCLFFBQXRCLElBQWtDLE1BQWxDLENBUGE7O0FBU2IsbUJBQVMsY0FBVCxDQUF3QixRQUF4QixJQUFvQyxPQUFwQyxDQVRhO0FBVWIsbUJBQVMsY0FBVCxDQUF3QixRQUF4QixJQUFvQyxNQUFwQyxDQVZhOztBQWFiLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBMkIsUUFBM0IsRUFiYTtBQWNiLGVBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsY0FBaEIsR0FkYTs7O0FBL1NKLDJCQWtVWCxxQ0FBYSxHQUFFOztBQUViLGVBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsRUFBdkIsQ0FGYTtBQUdiLGVBQUssTUFBTCxDQUFZLFlBQVosR0FBMkIsRUFBM0IsQ0FIYTtBQUliLGVBQUssTUFBTCxDQUFZLFdBQVosR0FBMEIsRUFBMUIsQ0FKYTs7QUFNYixrQkFBTyxDQUFQO0FBQ0UsaUJBQUssQ0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFNBQWhCLENBQTBCLEtBQTFCLEdBREY7QUFFRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixnQkFBaEIsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLFdBQXZCLENBSEY7QUFJRSxvQkFKRjtBQURGLGlCQU1PLENBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixTQUFoQixDQUEwQixLQUExQixHQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0Isa0JBQWhCLEdBRkY7QUFHRSxtQkFBSyxNQUFMLENBQVksWUFBWixHQUEyQixXQUEzQixDQUhGO0FBSUUsb0JBSkY7QUFORixpQkFXTyxDQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBMEIsS0FBMUIsR0FERjtBQUVFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGlCQUFoQixHQUZGO0FBR0UsbUJBQUssTUFBTCxDQUFZLFdBQVosR0FBMEIsV0FBMUIsQ0FIRjtBQUlFLG9CQUpGO0FBWEYsV0FOYTs7O0FBbFVKLDJCQTJWWCxtQ0FBWSxHQUFFOztBQUVaLGVBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsRUFBeEIsQ0FGWTtBQUdaLGVBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsRUFBeEIsQ0FIWTtBQUlaLGtCQUFPLENBQVA7QUFDRSxpQkFBSyxDQUFMO0FBQ0UsbUJBQUssZUFBTCxDQUFxQixFQUFyQixFQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0Isc0JBQWhCLEdBRkY7QUFHRSxtQkFBSyxNQUFMLENBQVksU0FBWixHQUF3QixXQUF4QixDQUhGO0FBSUUsb0JBSkY7QUFERixpQkFNTyxDQUFMO0FBQ0UsbUJBQUssZUFBTCxDQUFxQixFQUFyQixFQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IscUJBQWhCLEdBRkY7QUFHRSxtQkFBSyxNQUFMLENBQVksU0FBWixHQUF3QixXQUF4QixDQUhGO0FBSUUsb0JBSkY7O0FBTkYsV0FKWTs7O0FBM1ZILDJCQThXWCwrQkFBVSxHQUFFO0FBQ1YsZUFBSyxNQUFMLENBQVksT0FBWixHQUFzQixFQUF0QixDQURVO0FBRVYsZUFBSyxNQUFMLENBQVksT0FBWixHQUFzQixFQUF0QixDQUZVO0FBR1YsZUFBSyxNQUFMLENBQVksT0FBWixHQUFzQixFQUF0QixDQUhVO0FBSVYsa0JBQU8sQ0FBUDtBQUNFLGlCQUFLLENBQUw7QUFDRSxtQkFBSyxlQUFMLENBQXFCLEVBQXJCLEVBREY7QUFFRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixzQkFBaEIsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLFdBQXRCLENBSEY7QUFJRSxvQkFKRjtBQURGLGlCQU1PLENBQUw7QUFDRSxtQkFBSyxlQUFMLENBQXFCLEVBQXJCLEVBREY7QUFFRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixzQkFBaEIsQ0FBdUMsSUFBdkMsRUFGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLFdBQXRCLENBSEY7QUFJRSxvQkFKRjtBQU5GLGlCQVdPLENBQUw7QUFDRSxtQkFBSyxlQUFMLENBQXFCLEVBQXJCLEVBREY7QUFFRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQix1QkFBaEIsR0FGRjtBQUdFLG1CQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLFdBQXRCLENBSEY7QUFJRSxvQkFKRjs7QUFYRixXQUpVOzs7QUE5V0QsMkJBc1lYLCtCQUFVLEdBQUU7QUFDVixlQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLEVBQXRCLENBRFU7QUFFVixlQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLEVBQXRCLENBRlU7QUFHVixlQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLEVBQXRCLENBSFU7QUFJVixlQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLEVBQXRCLENBSlU7QUFLVixrQkFBTyxDQUFQO0FBQ0UsaUJBQUssQ0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGdCQUFoQixDQUFpQyxDQUFqQyxFQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsV0FBdEIsQ0FGRjtBQUdFLG9CQUhGO0FBREYsaUJBS08sQ0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGdCQUFoQixDQUFpQyxDQUFqQyxFQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsV0FBdEIsQ0FGRjtBQUdFLG9CQUhGO0FBTEYsaUJBU08sQ0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGdCQUFoQixDQUFpQyxDQUFqQyxFQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsV0FBdEIsQ0FGRjtBQUdFLG9CQUhGO0FBVEYsaUJBYU8sQ0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGdCQUFoQixDQUFpQyxDQUFqQyxFQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsV0FBdEIsQ0FGRjtBQUdFLG9CQUhGOztBQWJGLFdBTFU7OztBQXRZRCwyQkFnYVgscUNBQWEsR0FBRTs7QUFFYixlQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLEVBQXRCLENBRmE7QUFHYixlQUFLLE1BQUwsQ0FBWSxPQUFaLEdBQXNCLEVBQXRCLENBSGE7QUFJYixrQkFBTyxDQUFQO0FBQ0UsaUJBQUssQ0FBTDtBQUNFLG1CQUFLLGVBQUwsQ0FBcUIsRUFBckIsRUFERjtBQUVFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLG1CQUFoQixHQUZGO0FBR0UsbUJBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsV0FBdEIsQ0FIRjtBQUlFLG9CQUpGO0FBREYsaUJBTU8sQ0FBTDtBQUNFLG1CQUFLLGVBQUwsQ0FBcUIsRUFBckIsRUFERjtBQUVFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGtCQUFoQixHQUZGO0FBR0UsbUJBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsV0FBdEIsQ0FIRjtBQUlFLG9CQUpGO0FBTkYsV0FKYTs7O0FBaGFKLDJCQWliWCx5Q0FBZSxHQUFFOztBQUVmLGVBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsRUFBeEIsQ0FGZTtBQUdmLGVBQUssTUFBTCxDQUFZLFNBQVosR0FBd0IsRUFBeEIsQ0FIZTtBQUlmLGtCQUFPLENBQVA7QUFDRSxpQkFBSyxDQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsdUJBQWhCLEdBREY7QUFFRSxtQkFBSyxNQUFMLENBQVksU0FBWixHQUF3QixXQUF4QixDQUZGO0FBR0Usb0JBSEY7QUFERixpQkFLTyxDQUFMO0FBQ0UsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0Isb0JBQWhCLEdBREY7QUFFRSxtQkFBSyxNQUFMLENBQVksU0FBWixHQUF3QixXQUF4QixDQUZGO0FBR0Usb0JBSEY7QUFMRixXQUplOzs7QUFqYk4sMkJBaWNYLGlDQUFXLEdBQUU7O0FBRVgsZUFBSyxNQUFMLENBQVksS0FBWixHQUFvQixFQUFwQixDQUZXO0FBR1gsZUFBSyxNQUFMLENBQVksS0FBWixHQUFvQixFQUFwQixDQUhXO0FBSVgsa0JBQU8sQ0FBUDtBQUNFLGlCQUFLLENBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixpQkFBaEIsR0FERjtBQUVFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLFdBQXBCLENBRkY7QUFHRSxvQkFIRjtBQURGLGlCQUtPLENBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixnQkFBaEIsR0FERjtBQUVFLG1CQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLFdBQXBCLENBRkY7QUFHRSxvQkFIRjtBQUxGLFdBSlc7OztBQWpjRiwyQkFpZFgsMkJBQVE7QUFDTixlQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLFlBQWhCLEdBRE07OztlQWpkRztrQkFDSixTQUFTLENBQUMsT0FBRCxFQUFVLGtCQUFWO2FBSWhCLGVBQWU7YUFDZixrQkFBa0I7YUFDbEIsU0FBUzthQThEVCxtQkFBa0I7YUFrQmxCLGFBQWE7YUFDYixZQUFZO2FBK0daLFNBQVM7QUFDUCxvQkFBVSxXQUFWO0FBQ0EsaUJBQU8sV0FBUDtBQUNBLG1CQUFRLFdBQVI7QUFDQSxxQkFBVSxXQUFWO0FBQ0EsbUJBQVUsV0FBVjtBQUNBLHVCQUFhLFdBQWI7QUFDQSxtQkFBUyxXQUFUO0FBQ0EsbUJBQVMsV0FBVDtBQUNBLHFCQUFXLFdBQVg7QUFDQSxpQkFBTSxXQUFOOzs7YUFnRkYsV0FBVSIsImZpbGUiOiJzYW1wbGVzL3NhbXBsZTAyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
