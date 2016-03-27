/* */ 
"format cjs";
(function(process) {
  (function(factory) {
    var globalObject = typeof window == 'object' && window || typeof self == 'object' && self;
    if (typeof exports !== 'undefined') {
      factory(exports);
    } else if (globalObject) {
      globalObject.hljs = factory({});
      if (typeof define === 'function' && define.amd) {
        define([], function() {
          return globalObject.hljs;
        });
      }
    }
  }(function(hljs) {
    function escape(value) {
      return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
    }
    function tag(node) {
      return node.nodeName.toLowerCase();
    }
    function testRe(re, lexeme) {
      var match = re && re.exec(lexeme);
      return match && match.index == 0;
    }
    function isNotHighlighted(language) {
      return (/^(no-?highlight|plain|text)$/i).test(language);
    }
    function blockLanguage(block) {
      var i,
          match,
          length,
          classes = block.className + ' ';
      classes += block.parentNode ? block.parentNode.className : '';
      match = (/\blang(?:uage)?-([\w-]+)\b/i).exec(classes);
      if (match) {
        return getLanguage(match[1]) ? match[1] : 'no-highlight';
      }
      classes = classes.split(/\s+/);
      for (i = 0, length = classes.length; i < length; i++) {
        if (getLanguage(classes[i]) || isNotHighlighted(classes[i])) {
          return classes[i];
        }
      }
    }
    function inherit(parent, obj) {
      var result = {},
          key;
      for (key in parent)
        result[key] = parent[key];
      if (obj)
        for (key in obj)
          result[key] = obj[key];
      return result;
    }
    function nodeStream(node) {
      var result = [];
      (function _nodeStream(node, offset) {
        for (var child = node.firstChild; child; child = child.nextSibling) {
          if (child.nodeType == 3)
            offset += child.nodeValue.length;
          else if (child.nodeType == 1) {
            result.push({
              event: 'start',
              offset: offset,
              node: child
            });
            offset = _nodeStream(child, offset);
            if (!tag(child).match(/br|hr|img|input/)) {
              result.push({
                event: 'stop',
                offset: offset,
                node: child
              });
            }
          }
        }
        return offset;
      })(node, 0);
      return result;
    }
    function mergeStreams(original, highlighted, value) {
      var processed = 0;
      var result = '';
      var nodeStack = [];
      function selectStream() {
        if (!original.length || !highlighted.length) {
          return original.length ? original : highlighted;
        }
        if (original[0].offset != highlighted[0].offset) {
          return (original[0].offset < highlighted[0].offset) ? original : highlighted;
        }
        return highlighted[0].event == 'start' ? original : highlighted;
      }
      function open(node) {
        function attr_str(a) {
          return ' ' + a.nodeName + '="' + escape(a.value) + '"';
        }
        result += '<' + tag(node) + Array.prototype.map.call(node.attributes, attr_str).join('') + '>';
      }
      function close(node) {
        result += '</' + tag(node) + '>';
      }
      function render(event) {
        (event.event == 'start' ? open : close)(event.node);
      }
      while (original.length || highlighted.length) {
        var stream = selectStream();
        result += escape(value.substr(processed, stream[0].offset - processed));
        processed = stream[0].offset;
        if (stream == original) {
          nodeStack.reverse().forEach(close);
          do {
            render(stream.splice(0, 1)[0]);
            stream = selectStream();
          } while (stream == original && stream.length && stream[0].offset == processed);
          nodeStack.reverse().forEach(open);
        } else {
          if (stream[0].event == 'start') {
            nodeStack.push(stream[0].node);
          } else {
            nodeStack.pop();
          }
          render(stream.splice(0, 1)[0]);
        }
      }
      return result + escape(value.substr(processed));
    }
    function compileLanguage(language) {
      function reStr(re) {
        return (re && re.source) || re;
      }
      function langRe(value, global) {
        return new RegExp(reStr(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
      }
      function compileMode(mode, parent) {
        if (mode.compiled)
          return;
        mode.compiled = true;
        mode.keywords = mode.keywords || mode.beginKeywords;
        if (mode.keywords) {
          var compiled_keywords = {};
          var flatten = function(className, str) {
            if (language.case_insensitive) {
              str = str.toLowerCase();
            }
            str.split(' ').forEach(function(kw) {
              var pair = kw.split('|');
              compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
            });
          };
          if (typeof mode.keywords == 'string') {
            flatten('keyword', mode.keywords);
          } else {
            Object.keys(mode.keywords).forEach(function(className) {
              flatten(className, mode.keywords[className]);
            });
          }
          mode.keywords = compiled_keywords;
        }
        mode.lexemesRe = langRe(mode.lexemes || /\b\w+\b/, true);
        if (parent) {
          if (mode.beginKeywords) {
            mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
          }
          if (!mode.begin)
            mode.begin = /\B|\b/;
          mode.beginRe = langRe(mode.begin);
          if (!mode.end && !mode.endsWithParent)
            mode.end = /\B|\b/;
          if (mode.end)
            mode.endRe = langRe(mode.end);
          mode.terminator_end = reStr(mode.end) || '';
          if (mode.endsWithParent && parent.terminator_end)
            mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
        }
        if (mode.illegal)
          mode.illegalRe = langRe(mode.illegal);
        if (mode.relevance === undefined)
          mode.relevance = 1;
        if (!mode.contains) {
          mode.contains = [];
        }
        var expanded_contains = [];
        mode.contains.forEach(function(c) {
          if (c.variants) {
            c.variants.forEach(function(v) {
              expanded_contains.push(inherit(c, v));
            });
          } else {
            expanded_contains.push(c == 'self' ? mode : c);
          }
        });
        mode.contains = expanded_contains;
        mode.contains.forEach(function(c) {
          compileMode(c, mode);
        });
        if (mode.starts) {
          compileMode(mode.starts, parent);
        }
        var terminators = mode.contains.map(function(c) {
          return c.beginKeywords ? '\\.?(' + c.begin + ')\\.?' : c.begin;
        }).concat([mode.terminator_end, mode.illegal]).map(reStr).filter(Boolean);
        mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : {exec: function() {
            return null;
          }};
      }
      compileMode(language);
    }
    function highlight(name, value, ignore_illegals, continuation) {
      function subMode(lexeme, mode) {
        for (var i = 0; i < mode.contains.length; i++) {
          if (testRe(mode.contains[i].beginRe, lexeme)) {
            return mode.contains[i];
          }
        }
      }
      function endOfMode(mode, lexeme) {
        if (testRe(mode.endRe, lexeme)) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
        if (mode.endsWithParent) {
          return endOfMode(mode.parent, lexeme);
        }
      }
      function isIllegal(lexeme, mode) {
        return !ignore_illegals && testRe(mode.illegalRe, lexeme);
      }
      function keywordMatch(mode, match) {
        var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
        return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
      }
      function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
        var classPrefix = noPrefix ? '' : options.classPrefix,
            openSpan = '<span class="' + classPrefix,
            closeSpan = leaveOpen ? '' : '</span>';
        openSpan += classname + '">';
        return openSpan + insideSpan + closeSpan;
      }
      function processKeywords() {
        if (!top.keywords)
          return escape(mode_buffer);
        var result = '';
        var last_index = 0;
        top.lexemesRe.lastIndex = 0;
        var match = top.lexemesRe.exec(mode_buffer);
        while (match) {
          result += escape(mode_buffer.substr(last_index, match.index - last_index));
          var keyword_match = keywordMatch(top, match);
          if (keyword_match) {
            relevance += keyword_match[1];
            result += buildSpan(keyword_match[0], escape(match[0]));
          } else {
            result += escape(match[0]);
          }
          last_index = top.lexemesRe.lastIndex;
          match = top.lexemesRe.exec(mode_buffer);
        }
        return result + escape(mode_buffer.substr(last_index));
      }
      function processSubLanguage() {
        var explicit = typeof top.subLanguage == 'string';
        if (explicit && !languages[top.subLanguage]) {
          return escape(mode_buffer);
        }
        var result = explicit ? highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) : highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);
        if (top.relevance > 0) {
          relevance += result.relevance;
        }
        if (explicit) {
          continuations[top.subLanguage] = result.top;
        }
        return buildSpan(result.language, result.value, false, true);
      }
      function processBuffer() {
        result += (top.subLanguage !== undefined ? processSubLanguage() : processKeywords());
        mode_buffer = '';
      }
      function startNewMode(mode, lexeme) {
        result += mode.className ? buildSpan(mode.className, '', true) : '';
        top = Object.create(mode, {parent: {value: top}});
      }
      function processLexeme(buffer, lexeme) {
        mode_buffer += buffer;
        if (lexeme === undefined) {
          processBuffer();
          return 0;
        }
        var new_mode = subMode(lexeme, top);
        if (new_mode) {
          if (new_mode.skip) {
            mode_buffer += lexeme;
          } else {
            if (new_mode.excludeBegin) {
              mode_buffer += lexeme;
            }
            processBuffer();
            if (!new_mode.returnBegin && !new_mode.excludeBegin) {
              mode_buffer = lexeme;
            }
          }
          startNewMode(new_mode, lexeme);
          return new_mode.returnBegin ? 0 : lexeme.length;
        }
        var end_mode = endOfMode(top, lexeme);
        if (end_mode) {
          var origin = top;
          if (origin.skip) {
            mode_buffer += lexeme;
          } else {
            if (!(origin.returnEnd || origin.excludeEnd)) {
              mode_buffer += lexeme;
            }
            processBuffer();
            if (origin.excludeEnd) {
              mode_buffer = lexeme;
            }
          }
          do {
            if (top.className) {
              result += '</span>';
            }
            if (!top.skip) {
              relevance += top.relevance;
            }
            top = top.parent;
          } while (top != end_mode.parent);
          if (end_mode.starts) {
            startNewMode(end_mode.starts, '');
          }
          return origin.returnEnd ? 0 : lexeme.length;
        }
        if (isIllegal(lexeme, top))
          throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
        mode_buffer += lexeme;
        return lexeme.length || 1;
      }
      var language = getLanguage(name);
      if (!language) {
        throw new Error('Unknown language: "' + name + '"');
      }
      compileLanguage(language);
      var top = continuation || language;
      var continuations = {};
      var result = '',
          current;
      for (current = top; current != language; current = current.parent) {
        if (current.className) {
          result = buildSpan(current.className, '', true) + result;
        }
      }
      var mode_buffer = '';
      var relevance = 0;
      try {
        var match,
            count,
            index = 0;
        while (true) {
          top.terminators.lastIndex = index;
          match = top.terminators.exec(value);
          if (!match)
            break;
          count = processLexeme(value.substr(index, match.index - index), match[0]);
          index = match.index + count;
        }
        processLexeme(value.substr(index));
        for (current = top; current.parent; current = current.parent) {
          if (current.className) {
            result += '</span>';
          }
        }
        return {
          relevance: relevance,
          value: result,
          language: name,
          top: top
        };
      } catch (e) {
        if (e.message.indexOf('Illegal') != -1) {
          return {
            relevance: 0,
            value: escape(value)
          };
        } else {
          throw e;
        }
      }
    }
    function highlightAuto(text, languageSubset) {
      languageSubset = languageSubset || options.languages || Object.keys(languages);
      var result = {
        relevance: 0,
        value: escape(text)
      };
      var second_best = result;
      languageSubset.forEach(function(name) {
        if (!getLanguage(name)) {
          return;
        }
        var current = highlight(name, text, false);
        current.language = name;
        if (current.relevance > second_best.relevance) {
          second_best = current;
        }
        if (current.relevance > result.relevance) {
          second_best = result;
          result = current;
        }
      });
      if (second_best.language) {
        result.second_best = second_best;
      }
      return result;
    }
    function fixMarkup(value) {
      if (options.tabReplace) {
        value = value.replace(/^((<[^>]+>|\t)+)/gm, function(match, p1) {
          return p1.replace(/\t/g, options.tabReplace);
        });
      }
      if (options.useBR) {
        value = value.replace(/\n/g, '<br>');
      }
      return value;
    }
    function buildClassName(prevClassName, currentLang, resultLang) {
      var language = currentLang ? aliases[currentLang] : resultLang,
          result = [prevClassName.trim()];
      if (!prevClassName.match(/\bhljs\b/)) {
        result.push('hljs');
      }
      if (prevClassName.indexOf(language) === -1) {
        result.push(language);
      }
      return result.join(' ').trim();
    }
    function highlightBlock(block) {
      var language = blockLanguage(block);
      if (isNotHighlighted(language))
        return;
      var node;
      if (options.useBR) {
        node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
      } else {
        node = block;
      }
      var text = node.textContent;
      var result = language ? highlight(language, text, true) : highlightAuto(text);
      var originalStream = nodeStream(node);
      if (originalStream.length) {
        var resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        resultNode.innerHTML = result.value;
        result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
      }
      result.value = fixMarkup(result.value);
      block.innerHTML = result.value;
      block.className = buildClassName(block.className, language, result.language);
      block.result = {
        language: result.language,
        re: result.relevance
      };
      if (result.second_best) {
        block.second_best = {
          language: result.second_best.language,
          re: result.second_best.relevance
        };
      }
    }
    var options = {
      classPrefix: 'hljs-',
      tabReplace: null,
      useBR: false,
      languages: undefined
    };
    function configure(user_options) {
      options = inherit(options, user_options);
    }
    function initHighlighting() {
      if (initHighlighting.called)
        return;
      initHighlighting.called = true;
      var blocks = document.querySelectorAll('pre code');
      Array.prototype.forEach.call(blocks, highlightBlock);
    }
    function initHighlightingOnLoad() {
      addEventListener('DOMContentLoaded', initHighlighting, false);
      addEventListener('load', initHighlighting, false);
    }
    var languages = {};
    var aliases = {};
    function registerLanguage(name, language) {
      var lang = languages[name] = language(hljs);
      if (lang.aliases) {
        lang.aliases.forEach(function(alias) {
          aliases[alias] = name;
        });
      }
    }
    function listLanguages() {
      return Object.keys(languages);
    }
    function getLanguage(name) {
      name = (name || '').toLowerCase();
      return languages[name] || languages[aliases[name]];
    }
    hljs.highlight = highlight;
    hljs.highlightAuto = highlightAuto;
    hljs.fixMarkup = fixMarkup;
    hljs.highlightBlock = highlightBlock;
    hljs.configure = configure;
    hljs.initHighlighting = initHighlighting;
    hljs.initHighlightingOnLoad = initHighlightingOnLoad;
    hljs.registerLanguage = registerLanguage;
    hljs.listLanguages = listLanguages;
    hljs.getLanguage = getLanguage;
    hljs.inherit = inherit;
    hljs.IDENT_RE = '[a-zA-Z]\\w*';
    hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
    hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
    hljs.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)';
    hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)';
    hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';
    hljs.BACKSLASH_ESCAPE = {
      begin: '\\\\[\\s\\S]',
      relevance: 0
    };
    hljs.APOS_STRING_MODE = {
      className: 'string',
      begin: '\'',
      end: '\'',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE]
    };
    hljs.QUOTE_STRING_MODE = {
      className: 'string',
      begin: '"',
      end: '"',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE]
    };
    hljs.PHRASAL_WORDS_MODE = {begin: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/};
    hljs.COMMENT = function(begin, end, inherits) {
      var mode = hljs.inherit({
        className: 'comment',
        begin: begin,
        end: end,
        contains: []
      }, inherits || {});
      mode.contains.push(hljs.PHRASAL_WORDS_MODE);
      mode.contains.push({
        className: 'doctag',
        begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
        relevance: 0
      });
      return mode;
    };
    hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
    hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
    hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
    hljs.NUMBER_MODE = {
      className: 'number',
      begin: hljs.NUMBER_RE,
      relevance: 0
    };
    hljs.C_NUMBER_MODE = {
      className: 'number',
      begin: hljs.C_NUMBER_RE,
      relevance: 0
    };
    hljs.BINARY_NUMBER_MODE = {
      className: 'number',
      begin: hljs.BINARY_NUMBER_RE,
      relevance: 0
    };
    hljs.CSS_NUMBER_MODE = {
      className: 'number',
      begin: hljs.NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
      relevance: 0
    };
    hljs.REGEXP_MODE = {
      className: 'regexp',
      begin: /\//,
      end: /\/[gimuy]*/,
      illegal: /\n/,
      contains: [hljs.BACKSLASH_ESCAPE, {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [hljs.BACKSLASH_ESCAPE]
      }]
    };
    hljs.TITLE_MODE = {
      className: 'title',
      begin: hljs.IDENT_RE,
      relevance: 0
    };
    hljs.UNDERSCORE_TITLE_MODE = {
      className: 'title',
      begin: hljs.UNDERSCORE_IDENT_RE,
      relevance: 0
    };
    hljs.METHOD_GUARD = {
      begin: '\\.\\s*' + hljs.UNDERSCORE_IDENT_RE,
      relevance: 0
    };
    return hljs;
  }));
})(require('process'));
