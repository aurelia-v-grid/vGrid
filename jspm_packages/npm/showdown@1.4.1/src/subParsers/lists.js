/* */ 
(function(process) {
  showdown.subParser('lists', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('lists.before', text, options, globals);
    function processListItems(listStr, trimTrailing) {
      globals.gListLevel++;
      listStr = listStr.replace(/\n{2,}$/, '\n');
      listStr += '~0';
      var rgx = /(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
          isParagraphed = (/\n[ \t]*\n(?!~0)/.test(listStr));
      listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
        checked = (checked && checked.trim() !== '');
        var item = showdown.subParser('outdent')(m4, options, globals),
            bulletStyle = '';
        if (taskbtn && options.tasklists) {
          bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
          item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
            var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
            if (checked) {
              otp += ' checked';
            }
            otp += '>';
            return otp;
          });
        }
        if (m1 || (item.search(/\n{2,}/) > -1)) {
          item = showdown.subParser('githubCodeBlocks')(item, options, globals);
          item = showdown.subParser('blockGamut')(item, options, globals);
        } else {
          item = showdown.subParser('lists')(item, options, globals);
          item = item.replace(/\n$/, '');
          if (isParagraphed) {
            item = showdown.subParser('paragraphs')(item, options, globals);
          } else {
            item = showdown.subParser('spanGamut')(item, options, globals);
          }
        }
        item = '\n<li' + bulletStyle + '>' + item + '</li>\n';
        return item;
      });
      listStr = listStr.replace(/~0/g, '');
      globals.gListLevel--;
      if (trimTrailing) {
        listStr = listStr.replace(/\s+$/, '');
      }
      return listStr;
    }
    function parseConsecutiveLists(list, listType, trimTrailing) {
      var counterRxg = (listType === 'ul') ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm,
          subLists = [],
          result = '';
      if (list.search(counterRxg) !== -1) {
        (function parseCL(txt) {
          var pos = txt.search(counterRxg);
          if (pos !== -1) {
            result += '\n\n<' + listType + '>' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n\n';
            listType = (listType === 'ul') ? 'ol' : 'ul';
            counterRxg = (listType === 'ul') ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm;
            parseCL(txt.slice(pos));
          } else {
            result += '\n\n<' + listType + '>' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n\n';
          }
        })(list);
        for (var i = 0; i < subLists.length; ++i) {}
      } else {
        result = '\n\n<' + listType + '>' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n\n';
      }
      return result;
    }
    text += '~0';
    var wholeList = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    if (globals.gListLevel) {
      text = text.replace(wholeList, function(wholeMatch, list, m2) {
        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, true);
      });
    } else {
      wholeList = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
      text = text.replace(wholeList, function(wholeMatch, m1, list, m3) {
        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType);
      });
    }
    text = text.replace(/~0/, '');
    text = globals.converter._dispatch('lists.after', text, options, globals);
    return text;
  });
})(require('process'));
