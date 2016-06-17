'use strict';

System.register(['shared/dummyDataGenerator'], function (_export, _context) {
  "use strict";

  var dummyDataGenerator, _class, _temp, _initialiseProps, BasicUse, SelectedValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_sharedDummyDataGenerator) {
      dummyDataGenerator = _sharedDummyDataGenerator.dummyDataGenerator;
    }],
    execute: function () {
      _export('BasicUse', BasicUse = (_temp = _class = function BasicUse(dummyDataGenerator) {
        _classCallCheck(this, BasicUse);

        _initialiseProps.call(this);

        for (var i = 0; i < 1000; i++) {
          this.myCollection.push({ id: i, title: 'item ' + (i + 1), isSelected: false });
        }

        this.context = this;
        this.showOnlySelected = false;
      }, _class.inject = [dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myGrid = {};
        this.myCurrentEntity = {};
        this.myCollection = [];
      }, _temp));

      _export('BasicUse', BasicUse);

      _export('SelectedValueConverter', SelectedValueConverter = function () {
        function SelectedValueConverter() {
          _classCallCheck(this, SelectedValueConverter);
        }

        SelectedValueConverter.prototype.toView = function toView(array, selectedProperty, isActive) {
          if (array) {
            if (isActive) {
              return array.filter(function (item) {
                return item.isSelected;
              });
            } else {
              return array;
            }
          }
        };

        return SelectedValueConverter;
      }());

      _export('SelectedValueConverter', SelectedValueConverter);
    }
  };
});
//# sourceMappingURL=all.js.map
