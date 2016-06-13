/* */ 
define(['exports', 'aurelia-framework', './v-grid'], function (exports, _aureliaFramework, _vGrid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.vGridAttributesKeyMove = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var vGridAttributesKeyMove = exports.vGridAttributesKeyMove = (_dec = (0, _aureliaFramework.customAttribute)('v-key-move'), _dec2 = (0, _aureliaFramework.inject)(Element, _vGrid.VGrid), _dec(_class = _dec2(_class = function () {
    function vGridAttributesKeyMove(element, vGrid) {
      _classCallCheck(this, vGridAttributesKeyMove);

      this.vGrid = vGrid;
      this.element = element;
      this.classname = "v-grid-key-move";
    }

    vGridAttributesKeyMove.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
    };

    vGridAttributesKeyMove.prototype.attached = function attached() {
      var _this = this;

      this.element.classList.add(this.classname);
      this.addGridKeyListner();

      this.element.addEventListener('tabbing', function (e) {
        _this.element.focus();

        var ev = document.createEvent('Event');
        ev.initEvent("click", true, true);
        _this.element.offsetParent.dispatchEvent(ev);
      });

      this.element.addEventListener('focus', function (e) {

        if (_this.vGrid.vGridCurrentEntityRef === null) {
          var ev = document.createEvent('Event');
          ev.initEvent("click", true, true);
          _this.element.offsetParent.dispatchEvent(ev);
        }
      });
    };

    vGridAttributesKeyMove.prototype.dispatchCellClick = function dispatchCellClick(index) {
      var e = document.createEvent('Event');
      e.initEvent("tabbing", true, true);

      if (this.cells[index]) {
        this.cells[index].dispatchEvent(e);
      }
    };

    vGridAttributesKeyMove.prototype.setCellsFromElement = function setCellsFromElement(node, direction) {
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
        } catch (err) {}
      }
      if (element) {
        this.cells = element.querySelectorAll("." + this.classname);
      }
      return thisTop;
    };

    vGridAttributesKeyMove.prototype.setCellsFromTopValue = function setCellsFromTopValue(top) {
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

    vGridAttributesKeyMove.prototype.keyDownDelay = function keyDownDelay(callback) {
      var _this2 = this;

      if (!this.timer) {
        this.timer = setTimeout(function () {
          _this2.timer = null;
          callback();
        }, 150);
      }
    };

    vGridAttributesKeyMove.prototype.getIndex = function getIndex() {
      for (var i = 0; i < this.cells.length; i++) {
        if (this.element === this.cells[i]) {
          this.index = i;
          if (i === 0) {
            this.first = true;
          } else {
            this.first = false;
          }
          if (i === this.cells.length - 1) {
            this.last = true;
          } else {
            this.last = false;
          }
        }
      }
    };

    vGridAttributesKeyMove.prototype.addGridKeyListner = function addGridKeyListner() {
      var _this3 = this;

      this.element.onkeydown = function (e) {

        _this3.setCellsFromElement(_this3.element, 0);
        _this3.getIndex();

        if (e.keyCode === 33) {
          e.preventDefault();
          _this3.keyDownDelay(function () {
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
          _this3.keyDownDelay(function () {
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
          _this3.keyDownDelay(function () {
            if (_this3.vGrid.vGridScrollEvents.lastScrollType === "up") {
              _this3.vGrid.vGridScrollEvents.onSmallScroll(true);
            }
            _this3.top = _this3.setCellsFromElement(_this3.element, +1);
            _this3.dispatchCellClick(_this3.index);
          });
        }

        if (e.keyCode === 38) {
          e.preventDefault();
          _this3.keyDownDelay(function () {
            if (_this3.vGrid.vGridScrollEvents.lastScrollType === "down") {
              _this3.vGrid.vGridScrollEvents.onSmallScroll(false);
            }
            _this3.top = _this3.setCellsFromElement(_this3.element, -1);
            _this3.dispatchCellClick(_this3.index);
          });
        }

        if (e.keyCode === 9 && e.shiftKey === true) {
          if (_this3.row !== 0 && _this3.first) {
            e.preventDefault();
            _this3.keyDownDelay(function () {
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
          _this3.keyDownDelay(function () {
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
      };
    };

    return vGridAttributesKeyMove;
  }()) || _class) || _class);
});