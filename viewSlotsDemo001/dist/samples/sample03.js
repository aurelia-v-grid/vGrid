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
//# sourceMappingURL=data:application/json;base64,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
