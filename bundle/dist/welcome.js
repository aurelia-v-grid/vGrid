'use strict';

System.register(['data/dummyDataGenerator'], function (_export, _context) {
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
