'use strict';

System.register([], function (_export, _context) {
  var G;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('G', G = function () {
        function G() {
          _classCallCheck(this, G);

          this.title = 'G';
          this.selectedRow = {};
          this.data = [{ namefirst: 'Jason', namelast: 'Willis', selected: false, rowaction: '' }, { namefirst: 'X.', namelast: 'Willis', selected: false, rowaction: '' }, { namefirst: 'A.', namelast: 'Willis', selected: false, rowaction: '' }, { namefirst: 'J.', namelast: 'Willis', selected: false, rowaction: '' }];
        }

        G.prototype.selectRow = function selectRow(e, i) {
          switch (e.target.value) {
            case 'e':
              this.selectedRow = this.data[i];
              break;
            case 'c':
              this.selectedRow = this.data[i];
              break;
            default:
              break;
          }
        };

        G.prototype.selectAllRows = function selectAllRows(e) {
          for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].selected == false) {
              this.data[i].selected = true;
            } else {
              this.data[i].selected = false;
            }
          };
        };

        return G;
      }());

      _export('G', G);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7bUJBQ2EsQzs7OztlQUNYLEssR0FBTSxHO2VBQ04sVyxHQUFjLEU7ZUFFZCxJLEdBQUssQ0FDSCxFQUFDLFdBQVUsT0FBWCxFQUFtQixVQUFTLFFBQTVCLEVBQXFDLFVBQVMsS0FBOUMsRUFBb0QsV0FBVSxFQUE5RCxFQURHLEVBRUgsRUFBQyxXQUFVLElBQVgsRUFBZ0IsVUFBUyxRQUF6QixFQUFrQyxVQUFTLEtBQTNDLEVBQWlELFdBQVUsRUFBM0QsRUFGRyxFQUdILEVBQUMsV0FBVSxJQUFYLEVBQWdCLFVBQVMsUUFBekIsRUFBa0MsVUFBUyxLQUEzQyxFQUFpRCxXQUFVLEVBQTNELEVBSEcsRUFJSCxFQUFDLFdBQVUsSUFBWCxFQUFnQixVQUFTLFFBQXpCLEVBQWtDLFVBQVMsS0FBM0MsRUFBaUQsV0FBVSxFQUEzRCxFQUpHLEM7OztvQkFNTCxTLHNCQUFVLEMsRUFBRSxDLEVBQUU7QUFFWixrQkFBTyxFQUFFLE1BQUYsQ0FBUyxLQUFoQjtBQUNFLGlCQUFLLEdBQUw7QUFFRSxtQkFBSyxXQUFMLEdBQW1CLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBbkI7QUFDQTtBQUNGLGlCQUFLLEdBQUw7QUFFRSxtQkFBSyxXQUFMLEdBQW1CLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBbkI7QUFDQTtBQUNGO0FBQ0U7QUFWSjtBQWNELFM7O29CQUNELGEsMEJBQWMsQyxFQUFFO0FBQ2QsZUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssSUFBTCxDQUFVLE1BQTlCLEVBQXNDLEdBQXRDLEVBQTJDO0FBQ3pDLGdCQUFHLEtBQUssSUFBTCxDQUFVLENBQVYsRUFBYSxRQUFiLElBQXlCLEtBQTVCLEVBQWtDO0FBQ2hDLG1CQUFLLElBQUwsQ0FBVSxDQUFWLEVBQWEsUUFBYixHQUF3QixJQUF4QjtBQUNELGFBRkQsTUFFSztBQUNILG1CQUFLLElBQUwsQ0FBVSxDQUFWLEVBQWEsUUFBYixHQUF3QixLQUF4QjtBQUNEO0FBRUY7QUFDRixTIiwiZmlsZSI6InNhbXBsZXMvc2FtcGxlMDQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
