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
//# sourceMappingURL=data:application/json;base64,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QWQsQ0FBVixDQUhtQjtBQUl2QiwyQkFBUyxPQUFULENBQWlCLFFBQVEsQ0FBUixDQUFqQixFQUp1QjtBQUt2QiwyQkFBUyxRQUFULENBQWtCLFFBQVEsQ0FBUixJQUFXLENBQVgsQ0FBbEIsQ0FMdUI7QUFNdkIsMkJBQVMsT0FBVCxDQUFpQixRQUFRLENBQVIsQ0FBakIsRUFOdUI7QUFPdkIsMkJBQVMsUUFBVCxDQUFrQixDQUFsQixFQVB1QjtBQVF2QiwyQkFBUyxVQUFULENBQW9CLENBQXBCLEVBUnVCO0FBU3ZCLDJCQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFUdUI7QUFVdkIsMkJBQVMsZUFBVCxDQUF5QixDQUF6QixFQVZ1QjtBQVd2QixvQkFBRSxLQUFGLEdBQVUsU0FBUyxXQUFULEVBQVYsQ0FYdUI7aUJBQXpCLE1BWU87QUFDTCxvQkFBRSxLQUFGLEdBQVMsRUFBVCxDQURLO2lCQVpQO2VBRkY7YUFEVSxDQUFaLENBRHFCO1dBQXZCOztBQXdCRCxpQkFBTyxHQUFQLENBakR3Qjs7O3FCQS9FYjs7OEJBd0lJO0FBQ2IsbUJBQVUsS0FBSyxTQUFMLFNBQWtCLEtBQUssUUFBTCxDQURmOzs7O0FBR2YsaUJBM0lXLE9BMklYLENBQVksa0JBQVosRUFBZ0M7OztnQ0EzSXJCLFNBMklxQjs7OztBQUc5QixlQUFLLGtCQUFMLEdBQTBCLGtCQUExQixDQUg4QjtBQUk5QixlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLE1BQXJDLEVBQTZDLFVBQUMsSUFBRCxFQUFVO0FBQ3JELGtCQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FEcUQ7QUFFckQsa0JBQUssZ0JBQUwsR0FBd0IsTUFBSyxZQUFMLENBQWtCLE1BQWxCLENBRjZCO1dBQVYsQ0FBN0MsQ0FKOEI7U0FBaEM7O0FBM0lXLDBCQXNKWCwyQkFBUztBQUNQLGVBQUssYUFBTCxHQUFxQixLQUFLLFFBQUwsQ0FEZDtBQUVQLDhCQUFrQixLQUFLLFFBQUwsTUFBbEIsRUFGTzs7O0FBdEpFLDBCQTJKWCx5Q0FBZ0I7QUFDZCxjQUFJLEtBQUssUUFBTCxLQUFrQixLQUFLLGFBQUwsRUFBb0I7QUFDeEMsbUJBQU8sUUFBUSxpQ0FBUixDQUFQLENBRHdDO1dBQTFDOzs7ZUE1SlM7a0JBQ0osU0FBUyxDQUFDLGtCQUFEO2FBQ2hCLFVBQVU7YUFDVixZQUFZO2FBQ1osV0FBVzthQUNYLGdCQUFnQixLQUFLLFFBQUw7YUFDaEIsa0JBQWtCO2FBQ2xCLGNBQWM7YUFDZCxlQUFlOzs7OztxQ0EwSko7Ozs7O3NDQUNYLHlCQUFPLE9BQU87QUFDWixpQkFBTyxTQUFTLE1BQU0sV0FBTixFQUFULENBREs7OztlQURIIiwiZmlsZSI6IndlbGNvbWUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
