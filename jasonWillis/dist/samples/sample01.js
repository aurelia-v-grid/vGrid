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
        sample01.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample01.prototype.onRowDraw = function onRowDraw(data, collectionData, datePicker) {
          if (data) {
            if (data.number > 100) {
              data.customColor = "green";
              data.customFont = "normal";
            } else {
              data.customColor = "red";
              data.customFont = "bold";
            }
          }
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

          oldState.headerArray[oldIndex] = "Color";
          oldState.headerArray[newIndex] = "Name";

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
        this.myGrid = {
          configRowHeight: 50,
          configHeaderHeight: 60

        };
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
//# sourceMappingURL=data:application/json;base64,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
