'use strict';

System.register(['data/dummyDataGenerator', 'aurelia-framework', 'jquery', 'jquery-ui'], function (_export, _context) {
  var dummyDataGenerator, inject, noView, ViewCompiler, ViewSlot, Container, ViewResources, datepicker, _dec, _class, sample01;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dataDummyDataGenerator) {
      dummyDataGenerator = _dataDummyDataGenerator.dummyDataGenerator;
    }, function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
      ViewCompiler = _aureliaFramework.ViewCompiler;
      ViewSlot = _aureliaFramework.ViewSlot;
      Container = _aureliaFramework.Container;
      ViewResources = _aureliaFramework.ViewResources;
    }, function (_jquery) {}, function (_jqueryUi) {
      datepicker = _jqueryUi.datepicker;
    }],
    execute: function () {
      _export('sample01', sample01 = (_dec = inject(Element, dummyDataGenerator, ViewCompiler, Container, ViewResources), _dec(_class = function () {
        sample01.prototype.onRowDraw = function onRowDraw(data, collectionData) {
          if (data) {
            if (data.country === "Angola") {
              data.myCustomColor = "rgba(150,72,230, 0.3)";
            }
            data.date = this.formatDate(data.date);
            data.number = Math.round(data.number);
          }
        };

        sample01.prototype.onCellDraw = function onCellDraw(data) {
          if (data) {
            if (data.attributeName === "date") {}
          }
        };

        sample01.prototype.onDblClick = function onDblClick(row) {
          console.log("dblclick row:" + row);
        };

        sample01.prototype.formatDate = function formatDate(date) {
          var lengthCheck = function lengthCheck(x) {
            if (x.toString().length === 1) {
              return "0" + x;
            } else {
              return x;
            }
          };

          var dateObj = new Date(date);
          var newDate = [];
          newDate[0] = lengthCheck(dateObj.getDate());
          newDate[1] = lengthCheck(dateObj.getMonth() + 1);
          newDate[2] = lengthCheck(dateObj.getFullYear());
          return newDate.join(".");
        };

        sample01.prototype.myFormatHandler = function myFormatHandler(type, obj) {
          if (type === "afterEdit") {
            console.log("afterEdit");
            if (obj.attribute === "date") {
              var date = new Date(obj.oldValue);
              if (obj.value.length === 10) {
                var newdate = obj.value.split(".");
                date.setDate(newdate[0]);
                date.setMonth(newdate[1] - 1);
                date.setYear(newdate[2]);
                try {
                  obj.value = date.toISOString();
                } catch (e) {
                  obj.value = obj.oldValue;
                }
              } else {
                obj.value = obj.oldValue;
              }
            }

            return obj;
          }

          if (type === "onFilter") {

            obj.forEach(function (x) {
              if (x.attribute === "date") {
                if (x.value.length === 10) {
                  var tempdate = new Date();
                  var newdate = x.value.split(".");
                  tempdate.setDate(newdate[0]);
                  tempdate.setMonth(newdate[1] - 1);
                  tempdate.setYear(newdate[2]);
                  tempdate.setHours(0);
                  tempdate.setMinutes(0);
                  tempdate.setSeconds(0);
                  tempdate.setMilliseconds(0);
                  x.value = tempdate.toISOString();
                } else {
                  x.value = "";
                }
              }
            });

            return obj;
          }

          if (type === "beforeEdit") {
            console.log("beforeEdit");
            if (obj.attribute === "number") {
              obj.newValue = obj.oldValue;
            }

            if (obj.attribute === "date") {
              obj.element.disabled = false;
              obj.element.style.position = "relative";
              obj.element.style["z-index"] = "9000";
              $(obj.element).datepicker();
              $(obj.element).datepicker("show");
            }
            return obj;
          }
        };

        function sample01(element, dummyDataGenerator, vc, vs, container, resources) {
          var _this = this;

          _classCallCheck(this, sample01);

          this.myCollection = [];
          this.myCurrentEntity = {};
          this.myGrid = {};
          this.selectedDate = new Date();
          this.collectionLength = 0;
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

          this.element = element;
          this.viewCompiler = vc;
          this.viewSlot = vs;
          this.container = container;
          this.resources = resources;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(100, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

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

        return sample01;
      }()) || _class));

      _export('sample01', sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QVosR0FBc0IsRUFBdEIsQ0FGZTtBQUdmLGVBQUssTUFBTCxDQUFZLE9BQVosR0FBc0IsRUFBdEIsQ0FIZTtBQUlmLGtCQUFPLENBQVA7QUFDRSxpQkFBSyxDQUFMO0FBQ0UsbUJBQUssZUFBTCxDQUFxQixFQUFyQixFQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsbUJBQWhCLEdBRkY7QUFHRSxtQkFBSyxNQUFMLENBQVksT0FBWixHQUFzQixXQUF0QixDQUhGO0FBSUUsb0JBSkY7QUFERixpQkFNTyxDQUFMO0FBQ0UsbUJBQUssZUFBTCxDQUFxQixFQUFyQixFQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0Isa0JBQWhCLEdBRkY7QUFHRSxtQkFBSyxNQUFMLENBQVksT0FBWixHQUFzQixXQUF0QixDQUhGO0FBSUUsb0JBSkY7QUFORixXQUplOzs7QUF6YkosMkJBMGNYLHlDQUFlLEdBQUU7O0FBRWYsZUFBSyxNQUFMLENBQVksU0FBWixHQUF3QixFQUF4QixDQUZlO0FBR2YsZUFBSyxNQUFMLENBQVksU0FBWixHQUF3QixFQUF4QixDQUhlO0FBSWYsa0JBQU8sQ0FBUDtBQUNFLGlCQUFLLENBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQix1QkFBaEIsR0FERjtBQUVFLG1CQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXdCLFdBQXhCLENBRkY7QUFHRSxvQkFIRjtBQURGLGlCQUtPLENBQUw7QUFDRSxtQkFBSyxNQUFMLENBQVksR0FBWixDQUFnQixvQkFBaEIsR0FERjtBQUVFLG1CQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXdCLFdBQXhCLENBRkY7QUFHRSxvQkFIRjtBQUxGLFdBSmU7OztBQTFjTiwyQkEwZFgsaUNBQVcsR0FBRTs7QUFFWCxlQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLEVBQXBCLENBRlc7QUFHWCxlQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLEVBQXBCLENBSFc7QUFJWCxrQkFBTyxDQUFQO0FBQ0UsaUJBQUssQ0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGlCQUFoQixHQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsV0FBcEIsQ0FGRjtBQUdFLG9CQUhGO0FBREYsaUJBS08sQ0FBTDtBQUNFLG1CQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLGdCQUFoQixHQURGO0FBRUUsbUJBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsV0FBcEIsQ0FGRjtBQUdFLG9CQUhGO0FBTEYsV0FKVzs7O2VBMWRGIiwiZmlsZSI6InNhbXBsZXMvc2FtcGxlMDEuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
