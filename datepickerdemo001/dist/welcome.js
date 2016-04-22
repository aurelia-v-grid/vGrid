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
          this.dummyDataGenerator.generateData(1000, function (data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlbGNvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBRUs7MEJBV2IsK0JBQVcsTUFBTSxnQkFBZ0I7QUFDN0IsY0FBSSxJQUFKLEVBQVU7QUFDUixnQkFBSSxTQUFTLElBQUksSUFBSixDQUFTLEtBQUssSUFBTCxDQUFsQixDQURJO0FBRVIsaUJBQUssSUFBTCxHQUFZLENBQUMsTUFBTSxPQUFPLE9BQVAsRUFBTixDQUFELENBQXlCLEtBQXpCLENBQStCLENBQUMsQ0FBRCxDQUEvQixHQUFxQyxHQUFyQyxHQUEyQyxDQUFDLE9BQU8sT0FBTyxRQUFQLEtBQWtCLENBQWxCLENBQVAsQ0FBRCxDQUE4QixLQUE5QixDQUFvQyxDQUFDLENBQUQsQ0FBL0UsR0FBcUYsR0FBckYsR0FBMkYsT0FBTyxXQUFQLEVBQTNGLENBRko7V0FBVjs7O0FBWlMsMEJBbUJYLG1DQUFZLEtBQUssV0FBVyxLQUFJO0FBQzlCLGNBQUcsT0FBTyxDQUFQLElBQVksY0FBWSxNQUFaLEVBQW9CO0FBQ2pDLGdCQUFJLENBQUMsT0FBTyxnQkFBUCxFQUF5QjtBQUM1QixxQkFBTyxnQkFBUCxHQUEwQixFQUFFLElBQUksTUFBSixDQUFGLENBQWMsU0FBZCxDQUF3QjtBQUNoRCwyQkFBVyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBWDtBQUNBLHdCQUFRLFlBQVI7QUFDQSxnQ0FBZ0IsWUFBaEI7QUFDQSxnQ0FBZ0IsZ0JBQWhCO0FBQ0Esa0NBQWtCLGdCQUFsQjtBQUNBLGlDQUFpQixlQUFqQjtBQUNBLDRCQUFZLENBQUMsU0FBRCxFQUFZLFVBQVosRUFBd0IsT0FBeEIsRUFBaUMsT0FBakMsRUFBMEMsS0FBMUMsRUFBaUQsTUFBakQsRUFBeUQsTUFBekQsRUFBaUUsUUFBakUsRUFBMkUsV0FBM0UsRUFBd0YsU0FBeEYsRUFBbUcsVUFBbkcsRUFBK0csVUFBL0csQ0FBWjtBQUNBLDZCQUFhLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELEtBQWxELEVBQXlELEtBQXpELEVBQWdFLEtBQWhFLEVBQXVFLEtBQXZFLEVBQThFLEtBQTlFLENBQWI7QUFDQSw4QkFBYyxDQUFDLFFBQUQsRUFBVyxRQUFYLEVBQXFCLFNBQXJCLEVBQWdDLFdBQWhDLEVBQTZDLFVBQTdDLEVBQXlELFFBQXpELEVBQW1FLFVBQW5FLENBQWQ7QUFDQSwrQkFBZSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxDQUFmO0FBQ0EsZ0NBQWdCLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENBQWhCO0FBQ0EsdUJBQU8sT0FBUDtBQUNBLHVCQUFPLE9BQVA7QUFDQSx1QkFBTyxPQUFQO2VBZHdCLENBQTFCLENBRDRCO2FBQTlCO1dBREY7O0FBcUJBLGNBQUksTUFBSixDQUFXLFFBQVgsR0FBcUIsVUFBUyxDQUFULEVBQVc7QUFDOUIsaUJBQUssT0FBTCxDQUFhLEVBQUMsU0FBUSxDQUFSLEVBQWQsRUFEOEI7V0FBWCxDQXRCUzs7O0FBbkJyQiwwQkErQ1gsNkJBQVMsS0FBSyxXQUFXLEtBQUk7QUFDM0IsY0FBRyxPQUFPLENBQVAsSUFBWSxjQUFZLE1BQVosRUFBbUI7QUFDaEMsZ0JBQUcsT0FBTyxZQUFQLEVBQXFCO0FBQ3RCLGtCQUFJLElBQUksU0FBUyxjQUFULENBQXdCLE9BQU8sWUFBUCxDQUFvQixPQUFwQixDQUE0QixFQUE1QixHQUErQixPQUEvQixDQUE1QixDQURrQjtBQUV0QixnQkFBRSxVQUFGLENBQWEsV0FBYixDQUF5QixDQUF6QixFQUZzQjthQUF4QjtBQUtBLG1CQUFPLFlBQVAsR0FBc0IsRUFBRSxJQUFJLE1BQUosQ0FBRixDQUFjLFNBQWQsQ0FBd0I7QUFDNUMseUJBQVUsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQVY7QUFDQSxzQkFBTyxZQUFQO0FBQ0EsOEJBQWdCLFlBQWhCO0FBQ0EsOEJBQWdCLGdCQUFoQjtBQUNBLGdDQUFrQixnQkFBbEI7QUFDQSwrQkFBaUIsZUFBakI7QUFDQSwwQkFBWSxDQUFFLFNBQUYsRUFBYSxVQUFiLEVBQXlCLE9BQXpCLEVBQWtDLE9BQWxDLEVBQTJDLEtBQTNDLEVBQWtELE1BQWxELEVBQTBELE1BQTFELEVBQWtFLFFBQWxFLEVBQTRFLFdBQTVFLEVBQXlGLFNBQXpGLEVBQW9HLFVBQXBHLEVBQWdILFVBQWhILENBQVo7QUFDQSwyQkFBYSxDQUFFLEtBQUYsRUFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCLEtBQXZCLEVBQThCLEtBQTlCLEVBQXFDLEtBQXJDLEVBQTRDLEtBQTVDLEVBQW1ELEtBQW5ELEVBQTBELEtBQTFELEVBQWlFLEtBQWpFLEVBQXdFLEtBQXhFLEVBQStFLEtBQS9FLENBQWI7QUFDQSw0QkFBYyxDQUFFLFFBQUYsRUFBWSxRQUFaLEVBQXNCLFNBQXRCLEVBQWlDLFdBQWpDLEVBQThDLFVBQTlDLEVBQTBELFFBQTFELEVBQW9FLFVBQXBFLENBQWQ7QUFDQSw2QkFBZSxDQUFFLEtBQUYsRUFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCLEtBQXZCLEVBQThCLEtBQTlCLEVBQXFDLEtBQXJDLEVBQTRDLEtBQTVDLENBQWY7QUFDQSw4QkFBZ0IsQ0FBRSxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsQ0FBaEI7QUFDQSxxQkFBTyxPQUFQO0FBQ0EscUJBQU8sT0FBUDtBQUNBLHFCQUFPLE9BQVA7YUFkb0IsQ0FBdEIsQ0FOZ0M7V0FBbEM7OztBQWhEUywwQkEwRWIsMkNBQWdCLE1BQU0sS0FBSTs7QUFHdkIsY0FBRyxTQUFTLFdBQVQsSUFBd0IsSUFBSSxTQUFKLEtBQWtCLE1BQWxCLEVBQXlCO0FBQ2pELGdCQUFJLE9BQU8sSUFBSSxJQUFKLENBQVMsSUFBSSxRQUFKLENBQWhCLENBRDZDO0FBRWhELGdCQUFHLElBQUksS0FBSixDQUFVLE1BQVYsS0FBcUIsRUFBckIsRUFBd0I7QUFDekIsa0JBQUksVUFBVSxJQUFJLEtBQUosQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQVYsQ0FEcUI7QUFFekIsbUJBQUssT0FBTCxDQUFhLFFBQVEsQ0FBUixDQUFiLEVBRnlCO0FBR3pCLG1CQUFLLFFBQUwsQ0FBYyxRQUFRLENBQVIsSUFBVyxDQUFYLENBQWQsQ0FIeUI7QUFJekIsbUJBQUssT0FBTCxDQUFhLFFBQVEsQ0FBUixDQUFiLEVBSnlCO0FBS3pCLGtCQUFHO0FBQ0Qsb0JBQUksS0FBSixHQUFZLEtBQUssV0FBTCxFQUFaLENBREM7ZUFBSCxDQUVFLE9BQU0sQ0FBTixFQUFRO0FBQ1Isb0JBQUksS0FBSixHQUFZLElBQUksUUFBSixDQURKO2VBQVI7YUFQSixNQVVPO0FBQ0wsa0JBQUksS0FBSixHQUFZLElBQUksUUFBSixDQURQO2FBVlA7V0FGSjs7QUFrQkEsY0FBRyxTQUFTLFVBQVQsRUFBb0I7QUFDckIsZ0JBQUksT0FBSixDQUFZLFVBQUMsQ0FBRCxFQUFPO0FBQ2pCLGtCQUFHLEVBQUUsU0FBRixLQUFnQixNQUFoQixFQUF1QjtBQUV4QixvQkFBRyxFQUFFLEtBQUYsQ0FBUSxNQUFSLEtBQW1CLEVBQW5CLEVBQXNCO0FBRXZCLHNCQUFJLFdBQVcsSUFBSSxJQUFKLEVBQVgsQ0FGbUI7QUFHdkIsc0JBQUksVUFBVSxFQUFFLEtBQUYsQ0FBUSxLQUFSLENBQWMsR0FBZCxDQUFWLENBSG1CO0FBSXZCLDJCQUFTLE9BQVQsQ0FBaUIsUUFBUSxDQUFSLENBQWpCLEVBSnVCO0FBS3ZCLDJCQUFTLFFBQVQsQ0FBa0IsUUFBUSxDQUFSLElBQVcsQ0FBWCxDQUFsQixDQUx1QjtBQU12QiwyQkFBUyxPQUFULENBQWlCLFFBQVEsQ0FBUixDQUFqQixFQU51QjtBQU92QiwyQkFBUyxRQUFULENBQWtCLENBQWxCLEVBUHVCO0FBUXZCLDJCQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFSdUI7QUFTdkIsMkJBQVMsVUFBVCxDQUFvQixDQUFwQixFQVR1QjtBQVV2QiwyQkFBUyxlQUFULENBQXlCLENBQXpCLEVBVnVCO0FBV3ZCLG9CQUFFLEtBQUYsR0FBVSxTQUFTLFdBQVQsRUFBVixDQVh1QjtpQkFBekIsTUFZTztBQUNMLG9CQUFFLEtBQUYsR0FBUyxFQUFULENBREs7aUJBWlA7ZUFGRjthQURVLENBQVosQ0FEcUI7V0FBdkI7O0FBd0JELGlCQUFPLEdBQVAsQ0E3Q3dCOzs7cUJBMUViOzs4QkErSEk7QUFDYixtQkFBVSxLQUFLLFNBQUwsU0FBa0IsS0FBSyxRQUFMLENBRGY7Ozs7QUFHZixpQkFsSVcsT0FrSVgsQ0FBWSxrQkFBWixFQUFnQzs7O2dDQWxJckIsU0FrSXFCOzs7O0FBRzlCLGVBQUssa0JBQUwsR0FBMEIsa0JBQTFCLENBSDhCO0FBSTlCLGVBQUssa0JBQUwsQ0FBd0IsWUFBeEIsQ0FBcUMsSUFBckMsRUFBMkMsVUFBQyxJQUFELEVBQVU7QUFDbkQsa0JBQUssWUFBTCxHQUFvQixJQUFwQixDQURtRDtBQUVuRCxrQkFBSyxnQkFBTCxHQUF3QixNQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FGMkI7V0FBVixDQUEzQyxDQUo4QjtTQUFoQzs7QUFsSVcsMEJBNklYLDJCQUFTO0FBQ1AsZUFBSyxhQUFMLEdBQXFCLEtBQUssUUFBTCxDQURkO0FBRVAsOEJBQWtCLEtBQUssUUFBTCxNQUFsQixFQUZPOzs7QUE3SUUsMEJBa0pYLHlDQUFnQjtBQUNkLGNBQUksS0FBSyxRQUFMLEtBQWtCLEtBQUssYUFBTCxFQUFvQjtBQUN4QyxtQkFBTyxRQUFRLGlDQUFSLENBQVAsQ0FEd0M7V0FBMUM7OztlQW5KUztrQkFDSixTQUFTLENBQUMsa0JBQUQ7YUFDaEIsVUFBVTthQUNWLFlBQVk7YUFDWixXQUFXO2FBQ1gsZ0JBQWdCLEtBQUssUUFBTDthQUNoQixrQkFBa0I7YUFDbEIsY0FBYzthQUNkLGVBQWU7Ozs7O3FDQWlKSjs7Ozs7c0NBQ1gseUJBQU8sT0FBTztBQUNaLGlCQUFPLFNBQVMsTUFBTSxXQUFOLEVBQVQsQ0FESzs7O2VBREgiLCJmaWxlIjoid2VsY29tZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
