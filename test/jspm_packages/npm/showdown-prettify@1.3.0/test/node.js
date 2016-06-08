/* */ 
(function() {
  'use strict';
  require('chai').should();
  var showdown = require('showdown');
  require('../src/showdown-prettify');
  var fs = require('fs'),
      converter = new showdown.Converter({extensions: ['prettify']}),
      cases = fs.readdirSync('test/cases/').filter(filter()).map(map('test/cases/')),
      issues = fs.readdirSync('test/issues/').filter(filter()).map(map('test/issues/'));
  describe('Prettify Extension simple testcases', function() {
    for (var i = 0; i < cases.length; ++i) {
      it(cases[i].name, assertion(cases[i]));
    }
  });
  describe('Prettify Extension issues testcase', function() {
    for (var i = 0; i < issues.length; ++i) {
      it(issues[i].name, assertion(issues[i]));
    }
  });
  function filter() {
    return function(file) {
      var ext = file.slice(-3);
      return (ext === '.md');
    };
  }
  function map(dir) {
    return function(file) {
      var name = file.replace('.md', ''),
          htmlPath = dir + name + '.html',
          html = fs.readFileSync(htmlPath, 'utf8'),
          mdPath = dir + name + '.md',
          md = fs.readFileSync(mdPath, 'utf8');
      return {
        name: name,
        input: md,
        expected: html
      };
    };
  }
  function normalize(testCase) {
    testCase.expected = testCase.expected.replace(/\r/g, '');
    testCase.actual = testCase.actual.replace(/\r/g, '');
    testCase.expected = testCase.expected.split('\n').map(function(x) {
      return x.trim();
    }).join('\n');
    testCase.actual = testCase.actual.split('\n').map(function(x) {
      return x.trim();
    }).join('\n');
    testCase.expected = testCase.expected.trim();
    testCase.expected = testCase.expected.replace(/ /g, '·');
    testCase.expected = testCase.expected.replace(/\n/g, '•\n');
    testCase.actual = testCase.actual.replace(/ /g, '·');
    testCase.actual = testCase.actual.replace(/\n/g, '•\n');
    return testCase;
  }
  function assertion(testCase) {
    return function() {
      testCase.actual = converter.makeHtml(testCase.input);
      testCase = normalize(testCase);
      testCase.actual.should.equal(testCase.expected);
    };
  }
})();
