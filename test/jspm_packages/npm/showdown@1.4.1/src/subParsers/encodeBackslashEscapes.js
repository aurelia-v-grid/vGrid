/* */ 
(function(process) {
  showdown.subParser('encodeBackslashEscapes', function(text) {
    'use strict';
    text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
    text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, showdown.helper.escapeCharactersCallback);
    return text;
  });
})(require('process'));
