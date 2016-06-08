/* */ 
(function(process) {
  showdown.subParser('encodeAmpsAndAngles', function(text) {
    'use strict';
    text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');
    text = text.replace(/<(?![a-z\/?\$!])/gi, '&lt;');
    return text;
  });
})(require('process'));
