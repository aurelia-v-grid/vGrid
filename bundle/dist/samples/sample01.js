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
          var oldIndex = oldState.attributeArray.indexOf("name");
          var newIndex = oldState.attributeArray.indexOf("color");

          oldState.attributeArray[oldIndex] = "color";
          oldState.attributeArray[newIndex] = "name";

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
