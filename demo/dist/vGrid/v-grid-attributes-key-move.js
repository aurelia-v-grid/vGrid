'use strict';

System.register(['aurelia-framework', './v-grid'], function (_export, _context) {
  "use strict";

  var inject, customAttribute, VGrid, _dec, _dec2, _class, vGridAttributesSort;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }, function (_vGrid) {
      VGrid = _vGrid.VGrid;
    }],
    execute: function () {
      _export('vGridAttributesSort', vGridAttributesSort = (_dec = customAttribute('v-key-move'), _dec2 = inject(Element, VGrid), _dec(_class = _dec2(_class = function () {
        function vGridAttributesSort(element, vGrid) {
          _classCallCheck(this, vGridAttributesSort);

          this.vGrid = vGrid;
          this.element = element;
          this.classname = "v-grid-key-move";
        }

        vGridAttributesSort.prototype.bind = function bind(bindingContext, overrideContext) {
          this.bindingContext = bindingContext;
          this.overrideContext = overrideContext;
        };

        vGridAttributesSort.prototype.attached = function attached() {
          var _this = this;

          this.element.classList.add(this.classname);
          this.addGridKeyListner();

          this.element.addEventListener('tabbing', function (e) {
            _this.element.focus();
          });
        };

        vGridAttributesSort.prototype.dispatchCellClick = function dispatchCellClick(index) {
          var e = document.createEvent('Event');
          e.initEvent("tabbing", true, true);

          if (this.cells[index]) {
            this.cells[index].dispatchEvent(e);
          }

          var e = document.createEvent('Event');
          e.initEvent("click", true, true);

          if (this.cells[index]) {
            this.cells[index].offsetParent.dispatchEvent(e);
          }
        };

        vGridAttributesSort.prototype.setCellsFromElement = function setCellsFromElement(node, direction) {
          var thisTop;
          var element;
          for (var i = 0; i < 10; i++) {
            try {
              if (node.classList.contains(this.vGrid.vGridConfig.css.row)) {
                var row = parseInt(node.getAttribute("row"));
                for (var y = 0; y < this.vGrid.vGridGenerator.rowElementArray.length; y++) {
                  if (row === parseInt(this.vGrid.vGridGenerator.rowElementArray[y].top / this.vGrid.vGridConfig.attRowHeight)) {
                    this.row = row;
                    thisTop = this.vGrid.vGridGenerator.rowElementArray[y + direction].top;
                    element = this.vGrid.vGridGenerator.rowElementArray[y + direction].div;
                  }
                }
              }
              node = node.parentNode;
            } catch (err) {
              console.warn("tabbing failure");
            }
          }
          if (element) {
            this.cells = element.querySelectorAll("." + this.classname);
          }
          return thisTop;
        };

        vGridAttributesSort.prototype.setCellsFromTopValue = function setCellsFromTopValue(top) {
          var element = 0;
          for (var i = 0; i < this.vGrid.vGridGenerator.rowElementArray.length; i++) {
            if (this.vGrid.vGridGenerator.rowElementArray[i].top === top) {
              element = this.vGrid.vGridGenerator.rowElementArray[i].div;
            }
          }
          if (element) {
            this.cells = element.querySelectorAll("." + this.classname);
          }
        };

        vGridAttributesSort.prototype.keyDownDelay = function keyDownDelay(callback) {
          var _this2 = this;

          if (!this.timer) {
            this.timer = setTimeout(function () {
              _this2.timer = null;
              callback();
            }, 150);
          }
        };

        vGridAttributesSort.prototype.getIndex = function getIndex() {
          for (var i = 0; i < this.cells.length; i++) {
            if (this.element === this.cells[i]) {
              this.index = i;
              if (i === 0) {
                this.first = true;
                this.last = false;
              }
              if (i === this.cells.length - 1) {
                this.first = false;
                this.last = true;
              }
            }
          }
        };

        vGridAttributesSort.prototype.addGridKeyListner = function addGridKeyListner() {

          this.element.onkeydown = function (e) {
            var _this3 = this;

            this.setCellsFromElement(this.element, 0);
            this.getIndex();

            if (e.keyCode === 33) {
              e.preventDefault();
              this.keyDownDelay(function () {
                var currentscrolltop = _this3.vGrid.vGridClientCtx.getScrollTop();

                var rowHeight = _this3.vGrid.vGridConfig.attRowHeight;
                var containerHeight = _this3.vGrid.vGridGenerator.contentElement.clientHeight;
                var containerRows = parseInt(containerHeight / rowHeight, 10);
                _this3.top = _this3.setCellsFromElement(_this3.element, 0);

                var newTop = _this3.top - containerRows * rowHeight;
                if (newTop / rowHeight <= 0) {
                  newTop = 0;
                }

                if (_this3.vGrid.vGridScrollEvents.lastScrollType === "down") {
                  _this3.vGrid.vGridScrollEvents.onSmallScroll(false);
                }

                _this3.setCellsFromTopValue(newTop);
                _this3.dispatchCellClick(_this3.index);

                var setTop = newTop - parseInt(containerRows * rowHeight / 2);
                _this3.vGrid.vGridClientCtx.setScrollTop(setTop);
              });
            }

            if (e.keyCode === 34) {
              e.preventDefault();
              this.keyDownDelay(function () {
                var currentscrolltop = _this3.vGrid.vGridClientCtx.getScrollTop();

                var rowHeight = _this3.vGrid.vGridConfig.attRowHeight;
                var containerHeight = _this3.vGrid.vGridGenerator.contentElement.clientHeight;
                var containerRows = parseInt(containerHeight / rowHeight, 10);
                _this3.top = _this3.setCellsFromElement(_this3.element, 0);

                var newTop = _this3.top + containerRows * rowHeight;
                if (newTop / rowHeight >= _this3.vGrid.vGridConfig.getCollectionLength()) {
                  newTop = _this3.vGrid.vGridConfig.getCollectionLength() * rowHeight;
                  newTop = newTop - rowHeight;
                }

                if (_this3.vGrid.vGridScrollEvents.lastScrollType === "up") {
                  _this3.vGrid.vGridScrollEvents.onSmallScroll(true);
                }

                _this3.setCellsFromTopValue(newTop);
                _this3.dispatchCellClick(_this3.index);

                var setTop = newTop - parseInt(containerRows * rowHeight / 2);
                _this3.vGrid.vGridClientCtx.setScrollTop(setTop);
              });
            }

            if (e.keyCode === 40) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this3.vGrid.vGridScrollEvents.lastScrollType === "up") {
                  _this3.vGrid.vGridScrollEvents.onSmallScroll(true);
                }
                _this3.top = _this3.setCellsFromElement(_this3.element, +1);
                _this3.dispatchCellClick(_this3.index);
              });
            }

            if (e.keyCode === 38) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this3.vGrid.vGridScrollEvents.lastScrollType === "down") {
                  _this3.vGrid.vGridScrollEvents.onSmallScroll(false);
                }
                _this3.top = _this3.setCellsFromElement(_this3.element, -1);
                _this3.dispatchCellClick(_this3.index);
              });
            }

            if (e.keyCode === 9 && e.shiftKey === true) {
              if (this.row !== 0 && this.first) {
                e.preventDefault();
                this.keyDownDelay(function () {
                  _this3.index = _this3.index - 1;
                  if (_this3.first) {
                    if (_this3.vGrid.vGridScrollEvents.lastScrollType === "down") {
                      _this3.vGrid.vGridScrollEvents.onSmallScroll(false);
                    }
                    _this3.index = _this3.cells.length - 1;
                    _this3.top = _this3.setCellsFromElement(_this3.element, -1);
                  }
                  _this3.dispatchCellClick(_this3.index);
                });
              }
            }

            if (e.keyCode === 9 && e.shiftKey === false) {
              e.preventDefault();
              this.keyDownDelay(function () {
                _this3.index = _this3.index + 1;
                if (_this3.last) {
                  if (_this3.vGrid.vGridScrollEvents.lastScrollType === "up") {
                    _this3.vGrid.vGridScrollEvents.onSmallScroll(true);
                  }
                  _this3.index = 0;
                  _this3.top = _this3.setCellsFromElement(_this3.element, 1);
                }
                _this3.dispatchCellClick(_this3.index);
              });
            }
          }.bind(this);
        };

        return vGridAttributesSort;
      }()) || _class) || _class));

      _export('vGridAttributesSort', vGridAttributesSort);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1hdHRyaWJ1dGVzLWtleS1tb3ZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUtRLFkscUJBQUEsTTtBQUFRLHFCLHFCQUFBLGU7O0FBQ1IsVyxVQUFBLEs7OztxQ0FLSyxtQixXQUZaLGdCQUFnQixZQUFoQixDLFVBQ0EsT0FBTyxPQUFQLEVBQWdCLEtBQWhCLEM7QUFJQyxxQ0FBWSxPQUFaLEVBQXFCLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsZUFBSyxTQUFMLEdBQWlCLGlCQUFqQjtBQUNEOztzQ0FHRCxJLGlCQUFLLGMsRUFBZ0IsZSxFQUFpQjtBQUNwQyxlQUFLLGNBQUwsR0FBc0IsY0FBdEI7QUFDQSxlQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFFRCxTOztzQ0FHRCxRLHVCQUFXO0FBQUE7O0FBQ1QsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixHQUF2QixDQUEyQixLQUFLLFNBQWhDO0FBQ0EsZUFBSyxpQkFBTDs7QUFFQSxlQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixTQUE5QixFQUF5QyxVQUFDLENBQUQsRUFBTTtBQUM3QyxrQkFBSyxPQUFMLENBQWEsS0FBYjtBQUNELFdBRkQ7QUFJRCxTOztzQ0FNRCxpQiw4QkFBa0IsSyxFQUFPO0FBQ3ZCLGNBQUksSUFBSSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsQ0FBUjtBQUNBLFlBQUUsU0FBRixDQUFZLFNBQVosRUFBdUIsSUFBdkIsRUFBNkIsSUFBN0I7O0FBRUEsY0FBSSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQUosRUFBdUI7QUFDckIsaUJBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0IsYUFBbEIsQ0FBZ0MsQ0FBaEM7QUFDRDs7QUFFRCxjQUFJLElBQUksU0FBUyxXQUFULENBQXFCLE9BQXJCLENBQVI7QUFDQSxZQUFFLFNBQUYsQ0FBWSxPQUFaLEVBQXFCLElBQXJCLEVBQTJCLElBQTNCOztBQUVBLGNBQUksS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFKLEVBQXVCO0FBQ3JCLGlCQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWtCLFlBQWxCLENBQStCLGFBQS9CLENBQTZDLENBQTdDO0FBQ0Q7QUFFRixTOztzQ0FNRCxtQixnQ0FBb0IsSSxFQUFNLFMsRUFBVztBQUNuQyxjQUFJLE9BQUo7QUFDQSxjQUFJLE9BQUo7QUFDQSxlQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksRUFBcEIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDM0IsZ0JBQUk7QUFDRixrQkFBSSxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsR0FBbkQsQ0FBSixFQUE2RDtBQUMzRCxvQkFBSSxNQUFNLFNBQVMsS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQsQ0FBVjtBQUNBLHFCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixlQUExQixDQUEwQyxNQUE5RCxFQUFzRSxHQUF0RSxFQUEyRTtBQUN6RSxzQkFBSSxRQUFRLFNBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixlQUExQixDQUEwQyxDQUExQyxFQUE2QyxHQUE3QyxHQUFtRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFlBQXBGLENBQVosRUFBZ0g7QUFDOUcseUJBQUssR0FBTCxHQUFXLEdBQVg7QUFDQSw4QkFBVSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGVBQTFCLENBQTBDLElBQUksU0FBOUMsRUFBeUQsR0FBbkU7QUFDQSw4QkFBVSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGVBQTFCLENBQTBDLElBQUksU0FBOUMsRUFBeUQsR0FBbkU7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxxQkFBTyxLQUFLLFVBQVo7QUFDRCxhQVpELENBWUUsT0FBTyxHQUFQLEVBQVk7QUFDWixzQkFBUSxJQUFSLENBQWEsaUJBQWI7QUFDRDtBQUNGO0FBQ0QsY0FBSSxPQUFKLEVBQWE7QUFDWCxpQkFBSyxLQUFMLEdBQWEsUUFBUSxnQkFBUixDQUF5QixNQUFNLEtBQUssU0FBcEMsQ0FBYjtBQUNEO0FBQ0QsaUJBQU8sT0FBUDtBQUNELFM7O3NDQU1ELG9CLGlDQUFxQixHLEVBQUs7QUFDeEIsY0FBSSxVQUFVLENBQWQ7QUFDQSxlQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixlQUExQixDQUEwQyxNQUE5RCxFQUFzRSxHQUF0RSxFQUEyRTtBQUN6RSxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLGVBQTFCLENBQTBDLENBQTFDLEVBQTZDLEdBQTdDLEtBQXFELEdBQXpELEVBQThEO0FBQzVELHdCQUFVLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsZUFBMUIsQ0FBMEMsQ0FBMUMsRUFBNkMsR0FBdkQ7QUFDRDtBQUNGO0FBQ0QsY0FBSSxPQUFKLEVBQWE7QUFDWCxpQkFBSyxLQUFMLEdBQWEsUUFBUSxnQkFBUixDQUF5QixNQUFNLEtBQUssU0FBcEMsQ0FBYjtBQUNEO0FBRUYsUzs7c0NBTUQsWSx5QkFBYSxRLEVBQVU7QUFBQTs7QUFDckIsY0FBSSxDQUFDLEtBQUssS0FBVixFQUFpQjtBQUNmLGlCQUFLLEtBQUwsR0FBYSxXQUFXLFlBQUs7QUFDM0IscUJBQUssS0FBTCxHQUFhLElBQWI7QUFDQTtBQUNELGFBSFksRUFHVixHQUhVLENBQWI7QUFJRDtBQUNGLFM7O3NDQU1ELFEsdUJBQVc7QUFDVCxlQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxLQUFMLENBQVcsTUFBL0IsRUFBdUMsR0FBdkMsRUFBNEM7QUFDMUMsZ0JBQUksS0FBSyxPQUFMLEtBQWlCLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBckIsRUFBb0M7QUFDbEMsbUJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSxrQkFBSSxNQUFNLENBQVYsRUFBYTtBQUNYLHFCQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EscUJBQUssSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNELGtCQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixDQUE5QixFQUFpQztBQUMvQixxQkFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLHFCQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsUzs7c0NBTUQsaUIsZ0NBQW9COztBQUdsQixlQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLFVBQVUsQ0FBVixFQUFhO0FBQUE7O0FBRXBDLGlCQUFLLG1CQUFMLENBQXlCLEtBQUssT0FBOUIsRUFBdUMsQ0FBdkM7QUFDQSxpQkFBSyxRQUFMOztBQUdBLGdCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLGdCQUFFLGNBQUY7QUFDQSxtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFJdEIsb0JBQUksbUJBQW1CLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsWUFBMUIsRUFBdkI7O0FBR0Esb0JBQUksWUFBWSxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFlBQXZDO0FBQ0Esb0JBQUksa0JBQWtCLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsY0FBMUIsQ0FBeUMsWUFBL0Q7QUFDQSxvQkFBSSxnQkFBZ0IsU0FBUyxrQkFBa0IsU0FBM0IsRUFBc0MsRUFBdEMsQ0FBcEI7QUFDQSx1QkFBSyxHQUFMLEdBQVcsT0FBSyxtQkFBTCxDQUF5QixPQUFLLE9BQTlCLEVBQXVDLENBQXZDLENBQVg7O0FBRUEsb0JBQUksU0FBUyxPQUFLLEdBQUwsR0FBWSxnQkFBZ0IsU0FBekM7QUFDQSxvQkFBSyxTQUFTLFNBQVYsSUFBd0IsQ0FBNUIsRUFBK0I7QUFDN0IsMkJBQVMsQ0FBVDtBQUNEOztBQUlELG9CQUFJLE9BQUssS0FBTCxDQUFXLGlCQUFYLENBQTZCLGNBQTdCLEtBQWdELE1BQXBELEVBQTREO0FBQzFELHlCQUFLLEtBQUwsQ0FBVyxpQkFBWCxDQUE2QixhQUE3QixDQUEyQyxLQUEzQztBQUNEOztBQUVELHVCQUFLLG9CQUFMLENBQTBCLE1BQTFCO0FBQ0EsdUJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUE1Qjs7QUFFQSxvQkFBSSxTQUFTLFNBQVMsU0FBVSxnQkFBZ0IsU0FBakIsR0FBOEIsQ0FBdkMsQ0FBdEI7QUFDQSx1QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixZQUExQixDQUF1QyxNQUF2QztBQUdELGVBOUJEO0FBK0JEOztBQUlELGdCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLGdCQUFFLGNBQUY7QUFDQSxtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFJdEIsb0JBQUksbUJBQW1CLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsWUFBMUIsRUFBdkI7O0FBR0Esb0JBQUksWUFBWSxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFlBQXZDO0FBQ0Esb0JBQUksa0JBQWtCLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsY0FBMUIsQ0FBeUMsWUFBL0Q7QUFDQSxvQkFBSSxnQkFBZ0IsU0FBUyxrQkFBa0IsU0FBM0IsRUFBc0MsRUFBdEMsQ0FBcEI7QUFDQSx1QkFBSyxHQUFMLEdBQVcsT0FBSyxtQkFBTCxDQUF5QixPQUFLLE9BQTlCLEVBQXVDLENBQXZDLENBQVg7O0FBRUEsb0JBQUksU0FBUyxPQUFLLEdBQUwsR0FBWSxnQkFBZ0IsU0FBekM7QUFDQSxvQkFBSyxTQUFTLFNBQVYsSUFBd0IsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixtQkFBdkIsRUFBNUIsRUFBMEU7QUFDeEUsMkJBQVMsT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixtQkFBdkIsS0FBK0MsU0FBeEQ7QUFDQSwyQkFBUyxTQUFTLFNBQWxCO0FBQ0Q7O0FBR0Qsb0JBQUksT0FBSyxLQUFMLENBQVcsaUJBQVgsQ0FBNkIsY0FBN0IsS0FBZ0QsSUFBcEQsRUFBMEQ7QUFDeEQseUJBQUssS0FBTCxDQUFXLGlCQUFYLENBQTZCLGFBQTdCLENBQTJDLElBQTNDO0FBQ0Q7O0FBRUQsdUJBQUssb0JBQUwsQ0FBMEIsTUFBMUI7QUFDQSx1QkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQTVCOztBQUVBLG9CQUFJLFNBQVMsU0FBUyxTQUFVLGdCQUFnQixTQUFqQixHQUE4QixDQUF2QyxDQUF0QjtBQUNBLHVCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFlBQTFCLENBQXVDLE1BQXZDO0FBQ0QsZUE1QkQ7QUE2QkQ7O0FBR0QsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsZ0JBQUUsY0FBRjtBQUNBLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLEtBQUwsQ0FBVyxpQkFBWCxDQUE2QixjQUE3QixLQUFnRCxJQUFwRCxFQUEwRDtBQUN4RCx5QkFBSyxLQUFMLENBQVcsaUJBQVgsQ0FBNkIsYUFBN0IsQ0FBMkMsSUFBM0M7QUFDRDtBQUNELHVCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssT0FBOUIsRUFBdUMsQ0FBQyxDQUF4QyxDQUFYO0FBQ0EsdUJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUE1QjtBQUNELGVBTkQ7QUFPRDs7QUFJRCxnQkFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUNwQixnQkFBRSxjQUFGO0FBQ0EsbUJBQUssWUFBTCxDQUFrQixZQUFNO0FBQ3RCLG9CQUFJLE9BQUssS0FBTCxDQUFXLGlCQUFYLENBQTZCLGNBQTdCLEtBQWdELE1BQXBELEVBQTREO0FBQzFELHlCQUFLLEtBQUwsQ0FBVyxpQkFBWCxDQUE2QixhQUE3QixDQUEyQyxLQUEzQztBQUNEO0FBQ0QsdUJBQUssR0FBTCxHQUFXLE9BQUssbUJBQUwsQ0FBeUIsT0FBSyxPQUE5QixFQUF1QyxDQUFDLENBQXhDLENBQVg7QUFDQSx1QkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQTVCO0FBQ0QsZUFORDtBQU9EOztBQUlELGdCQUFJLEVBQUUsT0FBRixLQUFjLENBQWQsSUFBbUIsRUFBRSxRQUFGLEtBQWUsSUFBdEMsRUFBNEM7QUFDMUMsa0JBQUksS0FBSyxHQUFMLEtBQWEsQ0FBYixJQUFrQixLQUFLLEtBQTNCLEVBQWtDO0FBQ2hDLGtCQUFFLGNBQUY7QUFDQSxxQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIseUJBQUssS0FBTCxHQUFhLE9BQUssS0FBTCxHQUFhLENBQTFCO0FBQ0Esc0JBQUksT0FBSyxLQUFULEVBQWdCO0FBQ2Qsd0JBQUksT0FBSyxLQUFMLENBQVcsaUJBQVgsQ0FBNkIsY0FBN0IsS0FBZ0QsTUFBcEQsRUFBNEQ7QUFDMUQsNkJBQUssS0FBTCxDQUFXLGlCQUFYLENBQTZCLGFBQTdCLENBQTJDLEtBQTNDO0FBQ0Q7QUFDRCwyQkFBSyxLQUFMLEdBQWEsT0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixDQUFqQztBQUNBLDJCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssT0FBOUIsRUFBdUMsQ0FBQyxDQUF4QyxDQUFYO0FBQ0Q7QUFDRCx5QkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQTVCO0FBRUQsaUJBWEQ7QUFZRDtBQUNGOztBQUlELGdCQUFJLEVBQUUsT0FBRixLQUFjLENBQWQsSUFBbUIsRUFBRSxRQUFGLEtBQWUsS0FBdEMsRUFBNkM7QUFDM0MsZ0JBQUUsY0FBRjtBQUNBLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0Qix1QkFBSyxLQUFMLEdBQWEsT0FBSyxLQUFMLEdBQWEsQ0FBMUI7QUFDQSxvQkFBSSxPQUFLLElBQVQsRUFBZTtBQUNiLHNCQUFJLE9BQUssS0FBTCxDQUFXLGlCQUFYLENBQTZCLGNBQTdCLEtBQWdELElBQXBELEVBQTBEO0FBQ3hELDJCQUFLLEtBQUwsQ0FBVyxpQkFBWCxDQUE2QixhQUE3QixDQUEyQyxJQUEzQztBQUNEO0FBQ0QseUJBQUssS0FBTCxHQUFhLENBQWI7QUFDQSx5QkFBSyxHQUFMLEdBQVcsT0FBSyxtQkFBTCxDQUF5QixPQUFLLE9BQTlCLEVBQXVDLENBQXZDLENBQVg7QUFDRDtBQUNELHVCQUFLLGlCQUFMLENBQXVCLE9BQUssS0FBNUI7QUFDRCxlQVZEO0FBWUQ7QUFFRixXQTNJd0IsQ0EySXZCLElBM0l1QixDQTJJbEIsSUEzSWtCLENBQXpCO0FBNElELFMiLCJmaWxlIjoidkdyaWQvdi1ncmlkLWF0dHJpYnV0ZXMta2V5LW1vdmUuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
