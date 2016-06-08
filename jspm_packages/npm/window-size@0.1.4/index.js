/* */ 
(function(process) {
  'use strict';
  var tty = require('tty');
  module.exports = (function() {
    var width;
    var height;
    if (tty.isatty(1) && tty.isatty(2)) {
      if (process.stdout.getWindowSize) {
        width = process.stdout.getWindowSize(1)[0];
        height = process.stdout.getWindowSize(1)[1];
      } else if (tty.getWindowSize) {
        width = tty.getWindowSize()[1];
        height = tty.getWindowSize()[0];
      } else if (process.stdout.columns && process.stdout.rows) {
        height = process.stdout.columns;
        width = process.stdout.rows;
      }
    } else {
      Error('window-size could not get size with tty or process.stdout.');
    }
    return {
      height: height,
      width: width
    };
  })();
})(require('process'));
