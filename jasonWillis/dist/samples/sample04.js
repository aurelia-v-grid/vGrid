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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7bUJBQ2E7Ozs7ZUFDWCxRQUFNO2VBQ04sY0FBYztlQUVkLE9BQUssQ0FDSCxFQUFDLFdBQVUsT0FBVixFQUFrQixVQUFTLFFBQVQsRUFBa0IsVUFBUyxLQUFULEVBQWUsV0FBVSxFQUFWLEVBRGpELEVBRUgsRUFBQyxXQUFVLElBQVYsRUFBZSxVQUFTLFFBQVQsRUFBa0IsVUFBUyxLQUFULEVBQWUsV0FBVSxFQUFWLEVBRjlDLEVBR0gsRUFBQyxXQUFVLElBQVYsRUFBZSxVQUFTLFFBQVQsRUFBa0IsVUFBUyxLQUFULEVBQWUsV0FBVSxFQUFWLEVBSDlDLEVBSUgsRUFBQyxXQUFVLElBQVYsRUFBZSxVQUFTLFFBQVQsRUFBa0IsVUFBUyxLQUFULEVBQWUsV0FBVSxFQUFWLEVBSjlDOzs7QUFKTSxvQkFVWCwrQkFBVSxHQUFFLEdBQUU7QUFFWixrQkFBTyxFQUFFLE1BQUYsQ0FBUyxLQUFUO0FBQ0wsaUJBQUssR0FBTDtBQUVFLG1CQUFLLFdBQUwsR0FBbUIsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFuQixDQUZGO0FBR0Usb0JBSEY7QUFERixpQkFLTyxHQUFMO0FBRUUsbUJBQUssV0FBTCxHQUFtQixLQUFLLElBQUwsQ0FBVSxDQUFWLENBQW5CLENBRkY7QUFHRSxvQkFIRjtBQUxGO0FBVUksb0JBREY7QUFURixXQUZZOzs7QUFWSCxvQkEyQlgsdUNBQWMsR0FBRTtBQUNkLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsR0FBdEMsRUFBMkM7QUFDekMsZ0JBQUcsS0FBSyxJQUFMLENBQVUsQ0FBVixFQUFhLFFBQWIsSUFBeUIsS0FBekIsRUFBK0I7QUFDaEMsbUJBQUssSUFBTCxDQUFVLENBQVYsRUFBYSxRQUFiLEdBQXdCLElBQXhCLENBRGdDO2FBQWxDLE1BRUs7QUFDSCxtQkFBSyxJQUFMLENBQVUsQ0FBVixFQUFhLFFBQWIsR0FBd0IsS0FBeEIsQ0FERzthQUZMO1dBREYsQ0FEYzs7O2VBM0JMIiwiZmlsZSI6InNhbXBsZXMvc2FtcGxlMDQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
