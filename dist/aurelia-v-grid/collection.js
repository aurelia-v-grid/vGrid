"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Collection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("Collection", Collection = function () {
        function Collection(datasource) {
          _classCallCheck(this, Collection);

          this.datasource = datasource;
          this.key = datasource.key;
          this.entities = [];
          this.keys = [];
          this.count = 0;
          this.length = 0;
          this.ungroupedArray = [];
        }

        Collection.prototype.setData = function setData(array, ungroupedArray) {
          var _this = this;

          this.entities = [];
          this.keys = [];

          this.ungroupedArray = ungroupedArray || array;

          this.length = array.length;

          array.forEach(function (rowData, i) {
            if (!rowData[_this.key]) {
              _this.count++;
              rowData[_this.key] = "key" + _this.count;
            }

            if (!rowData.__group) {
              _this.keys.push(rowData[_this.key]);
            } else {
              _this.keys.push(null);
            }
            _this.entities.push(rowData);
          });
        };

        Collection.prototype.getEntities = function getEntities() {
          return this.ungroupedArray;
        };

        Collection.prototype.getRowKey = function getRowKey(row) {
          return this.keys[row];
        };

        Collection.prototype.getRowFromKey = function getRowFromKey(key) {
          return this.keys.indexOf(key);
        };

        Collection.prototype.getRow = function getRow(row) {
          return this.entities[row];
        };

        Collection.prototype.getRowFromEntity = function getRowFromEntity(entity) {
          return this.entities.indexOf(entity);
        };

        return Collection;
      }());

      _export("Collection", Collection);
    }
  };
});
//# sourceMappingURL=collection.js.map
