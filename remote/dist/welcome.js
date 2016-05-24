'use strict';

System.register(['data/dummyDataGenerator'], function (_export, _context) {
  "use strict";

  var dummyDataGenerator, _createClass, _class, _temp, _initialiseProps, Welcome, UpperValueConverter;

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

      _export('Welcome', Welcome = (_temp = _class = function () {
        Welcome.prototype.onRowDraw = function onRowDraw(data, collectionData) {
          if (data) {
            var MyDate = new Date(data.date);
            data.date = ('0' + MyDate.getDate()).slice(-2) + '.' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '.' + MyDate.getFullYear();
            data.number = Math.round(data.number).toFixed(2);
          }
        };

        Welcome.prototype.headerClick = function headerClick(row, attribute, evt) {
          if (row >= 0 && attribute === "date") {
            if (!window.myDatePickerDate) {
              window.myDatePickerDate = $(evt.target).pickadate({
                container: document.querySelector(".page-host"),
                format: "dd.mm.yyyy",
                labelMonthNext: 'Next month',
                labelMonthPrev: 'Previous month',
                labelMonthSelect: 'Select a month',
                labelYearSelect: 'Select a year',
                monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                weekdaysLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                today: 'Today',
                clear: 'Clear',
                close: 'Close'
              });
            }
          }

          evt.target.onchange = function (e) {
            this.onkeyup({ keyKode: 9 });
          };
        };

        Welcome.prototype.dblClick = function dblClick(row, attribute, evt) {
          if (row >= 0 && attribute === "date") {
            if (window.myDatePicker) {
              var x = document.getElementById(window.myDatePicker.context.id + "_root");
              x.parentNode.removeChild(x);
            }
            window.myDatePicker = $(evt.target).pickadate({
              container: document.querySelector(".page-host"),
              format: "dd.mm.yyyy",
              labelMonthNext: 'Next month',
              labelMonthPrev: 'Previous month',
              labelMonthSelect: 'Select a month',
              labelYearSelect: 'Select a year',
              monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              weekdaysLetter: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
              today: 'Today',
              clear: 'Clear',
              close: 'Close'
            });
          }
        };

        Welcome.prototype.myFormatHandler = function myFormatHandler(type, obj) {

          if (type === "afterEdit" && obj.attribute === "date") {
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

          if (type === "beforeEdit" && obj.attribute === "number") {
            obj.newValue = obj.oldValue;
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
          }

          return obj;
        };

        _createClass(Welcome, [{
          key: 'fullName',
          get: function get() {
            return this.firstName + ' ' + this.lastName;
          }
        }]);

        function Welcome(dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, Welcome);

          _initialiseProps.call(this);

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(100000, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

        Welcome.prototype.submit = function submit() {
          this.previousValue = this.fullName;
          alert('Welcome, ' + this.fullName + '!');
        };

        Welcome.prototype.canDeactivate = function canDeactivate() {
          if (this.fullName !== this.previousValue) {
            return confirm('Are you sure you want to leave?');
          }
        };

        return Welcome;
      }(), _class.inject = [dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.heading = 'Welcome to the Aurelia Navigation App!';
        this.firstName = 'John';
        this.lastName = 'Doe';
        this.previousValue = this.fullName;
        this.myCurrentEntity = {};
        this.gridContext = {};
        this.myCollection = [];
      }, _temp));

      _export('Welcome', Welcome);

      _export('UpperValueConverter', UpperValueConverter = function () {
        function UpperValueConverter() {
          _classCallCheck(this, UpperValueConverter);
        }

        UpperValueConverter.prototype.toView = function toView(value) {
          return value && value.toUpperCase();
        };

        return UpperValueConverter;
      }());

      _export('UpperValueConverter', UpperValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
