/* */ 
var bootstrap = require('../bootstrap'),
    converter = new bootstrap.showdown.Converter({
      strikethrough: true,
      literalMidWordUnderscores: true,
      simplifiedAutoLink: true,
      tables: true,
      parseImgDimensions: true,
      tasklists: true
    }),
    assertion = bootstrap.assertion,
    testsuite = bootstrap.getTestSuite('test/ghost/');
describe('makeHtml() ghost testsuite', function() {
  'use strict';
  for (var i = 0; i < testsuite.length; ++i) {
    it(testsuite[i].name.replace(/-/g, ' '), assertion(testsuite[i], converter));
  }
});
