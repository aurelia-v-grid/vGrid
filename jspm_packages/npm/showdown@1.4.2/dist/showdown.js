/* */ 
"format cjs";
(function(process) {
  ;
  (function() {
    function getDefaultOpts(simple) {
      'use strict';
      var defaultOptions = {
        omitExtraWLInCodeBlocks: {
          default: false,
          describe: 'Omit the default extra whiteline added to code blocks',
          type: 'boolean'
        },
        noHeaderId: {
          default: false,
          describe: 'Turn on/off generated header id',
          type: 'boolean'
        },
        prefixHeaderId: {
          default: false,
          describe: 'Specify a prefix to generated header ids',
          type: 'string'
        },
        headerLevelStart: {
          default: false,
          describe: 'The header blocks level start',
          type: 'integer'
        },
        parseImgDimensions: {
          default: false,
          describe: 'Turn on/off image dimension parsing',
          type: 'boolean'
        },
        simplifiedAutoLink: {
          default: false,
          describe: 'Turn on/off GFM autolink style',
          type: 'boolean'
        },
        literalMidWordUnderscores: {
          default: false,
          describe: 'Parse midword underscores as literal underscores',
          type: 'boolean'
        },
        strikethrough: {
          default: false,
          describe: 'Turn on/off strikethrough support',
          type: 'boolean'
        },
        tables: {
          default: false,
          describe: 'Turn on/off tables support',
          type: 'boolean'
        },
        tablesHeaderId: {
          default: false,
          describe: 'Add an id to table headers',
          type: 'boolean'
        },
        ghCodeBlocks: {
          default: true,
          describe: 'Turn on/off GFM fenced code blocks support',
          type: 'boolean'
        },
        tasklists: {
          default: false,
          describe: 'Turn on/off GFM tasklist support',
          type: 'boolean'
        },
        smoothLivePreview: {
          default: false,
          describe: 'Prevents weird effects in live previews due to incomplete input',
          type: 'boolean'
        },
        smartIndentationFix: {
          default: false,
          description: 'Tries to smartly fix identation in es6 strings',
          type: 'boolean'
        }
      };
      if (simple === false) {
        return JSON.parse(JSON.stringify(defaultOptions));
      }
      var ret = {};
      for (var opt in defaultOptions) {
        if (defaultOptions.hasOwnProperty(opt)) {
          ret[opt] = defaultOptions[opt].default;
        }
      }
      return ret;
    }
    var showdown = {},
        parsers = {},
        extensions = {},
        globalOptions = getDefaultOpts(true),
        flavor = {
          github: {
            omitExtraWLInCodeBlocks: true,
            prefixHeaderId: 'user-content-',
            simplifiedAutoLink: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true
          },
          vanilla: getDefaultOpts(true)
        };
    showdown.helper = {};
    showdown.extensions = {};
    showdown.setOption = function(key, value) {
      'use strict';
      globalOptions[key] = value;
      return this;
    };
    showdown.getOption = function(key) {
      'use strict';
      return globalOptions[key];
    };
    showdown.getOptions = function() {
      'use strict';
      return globalOptions;
    };
    showdown.resetOptions = function() {
      'use strict';
      globalOptions = getDefaultOpts(true);
    };
    showdown.setFlavor = function(name) {
      'use strict';
      if (flavor.hasOwnProperty(name)) {
        var preset = flavor[name];
        for (var option in preset) {
          if (preset.hasOwnProperty(option)) {
            globalOptions[option] = preset[option];
          }
        }
      }
    };
    showdown.getDefaultOptions = function(simple) {
      'use strict';
      return getDefaultOpts(simple);
    };
    showdown.subParser = function(name, func) {
      'use strict';
      if (showdown.helper.isString(name)) {
        if (typeof func !== 'undefined') {
          parsers[name] = func;
        } else {
          if (parsers.hasOwnProperty(name)) {
            return parsers[name];
          } else {
            throw Error('SubParser named ' + name + ' not registered!');
          }
        }
      }
    };
    showdown.extension = function(name, ext) {
      'use strict';
      if (!showdown.helper.isString(name)) {
        throw Error('Extension \'name\' must be a string');
      }
      name = showdown.helper.stdExtName(name);
      if (showdown.helper.isUndefined(ext)) {
        if (!extensions.hasOwnProperty(name)) {
          throw Error('Extension named ' + name + ' is not registered!');
        }
        return extensions[name];
      } else {
        if (typeof ext === 'function') {
          ext = ext();
        }
        if (!showdown.helper.isArray(ext)) {
          ext = [ext];
        }
        var validExtension = validate(ext, name);
        if (validExtension.valid) {
          extensions[name] = ext;
        } else {
          throw Error(validExtension.error);
        }
      }
    };
    showdown.getAllExtensions = function() {
      'use strict';
      return extensions;
    };
    showdown.removeExtension = function(name) {
      'use strict';
      delete extensions[name];
    };
    showdown.resetExtensions = function() {
      'use strict';
      extensions = {};
    };
    function validate(extension, name) {
      'use strict';
      var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
          ret = {
            valid: true,
            error: ''
          };
      if (!showdown.helper.isArray(extension)) {
        extension = [extension];
      }
      for (var i = 0; i < extension.length; ++i) {
        var baseMsg = errMsg + ' sub-extension ' + i + ': ',
            ext = extension[i];
        if (typeof ext !== 'object') {
          ret.valid = false;
          ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
          return ret;
        }
        if (!showdown.helper.isString(ext.type)) {
          ret.valid = false;
          ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
          return ret;
        }
        var type = ext.type = ext.type.toLowerCase();
        if (type === 'language') {
          type = ext.type = 'lang';
        }
        if (type === 'html') {
          type = ext.type = 'output';
        }
        if (type !== 'lang' && type !== 'output' && type !== 'listener') {
          ret.valid = false;
          ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
          return ret;
        }
        if (type === 'listener') {
          if (showdown.helper.isUndefined(ext.listeners)) {
            ret.valid = false;
            ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
            return ret;
          }
        } else {
          if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
            ret.valid = false;
            ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
            return ret;
          }
        }
        if (ext.listeners) {
          if (typeof ext.listeners !== 'object') {
            ret.valid = false;
            ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
            return ret;
          }
          for (var ln in ext.listeners) {
            if (ext.listeners.hasOwnProperty(ln)) {
              if (typeof ext.listeners[ln] !== 'function') {
                ret.valid = false;
                ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + ' must be a function but ' + typeof ext.listeners[ln] + ' given';
                return ret;
              }
            }
          }
        }
        if (ext.filter) {
          if (typeof ext.filter !== 'function') {
            ret.valid = false;
            ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
            return ret;
          }
        } else if (ext.regex) {
          if (showdown.helper.isString(ext.regex)) {
            ext.regex = new RegExp(ext.regex, 'g');
          }
          if (!ext.regex instanceof RegExp) {
            ret.valid = false;
            ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
            return ret;
          }
          if (showdown.helper.isUndefined(ext.replace)) {
            ret.valid = false;
            ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
            return ret;
          }
        }
      }
      return ret;
    }
    showdown.validateExtension = function(ext) {
      'use strict';
      var validateExtension = validate(ext, null);
      if (!validateExtension.valid) {
        console.warn(validateExtension.error);
        return false;
      }
      return true;
    };
    if (!showdown.hasOwnProperty('helper')) {
      showdown.helper = {};
    }
    showdown.helper.isString = function isString(a) {
      'use strict';
      return (typeof a === 'string' || a instanceof String);
    };
    showdown.helper.isFunction = function isFunction(a) {
      'use strict';
      var getType = {};
      return a && getType.toString.call(a) === '[object Function]';
    };
    showdown.helper.forEach = function forEach(obj, callback) {
      'use strict';
      if (typeof obj.forEach === 'function') {
        obj.forEach(callback);
      } else {
        for (var i = 0; i < obj.length; i++) {
          callback(obj[i], i, obj);
        }
      }
    };
    showdown.helper.isArray = function isArray(a) {
      'use strict';
      return a.constructor === Array;
    };
    showdown.helper.isUndefined = function isUndefined(value) {
      'use strict';
      return typeof value === 'undefined';
    };
    showdown.helper.stdExtName = function(s) {
      'use strict';
      return s.replace(/[_-]||\s/g, '').toLowerCase();
    };
    function escapeCharactersCallback(wholeMatch, m1) {
      'use strict';
      var charCodeToEscape = m1.charCodeAt(0);
      return '~E' + charCodeToEscape + 'E';
    }
    showdown.helper.escapeCharactersCallback = escapeCharactersCallback;
    showdown.helper.escapeCharacters = function escapeCharacters(text, charsToEscape, afterBackslash) {
      'use strict';
      var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';
      if (afterBackslash) {
        regexString = '\\\\' + regexString;
      }
      var regex = new RegExp(regexString, 'g');
      text = text.replace(regex, escapeCharactersCallback);
      return text;
    };
    var rgxFindMatchPos = function(str, left, right, flags) {
      'use strict';
      var f = flags || '',
          g = f.indexOf('g') > -1,
          x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
          l = new RegExp(left, f.replace(/g/g, '')),
          pos = [],
          t,
          s,
          m,
          start,
          end;
      do {
        t = 0;
        while ((m = x.exec(str))) {
          if (l.test(m[0])) {
            if (!(t++)) {
              s = x.lastIndex;
              start = s - m[0].length;
            }
          } else if (t) {
            if (!--t) {
              end = m.index + m[0].length;
              var obj = {
                left: {
                  start: start,
                  end: s
                },
                match: {
                  start: s,
                  end: m.index
                },
                right: {
                  start: m.index,
                  end: end
                },
                wholeMatch: {
                  start: start,
                  end: end
                }
              };
              pos.push(obj);
              if (!g) {
                return pos;
              }
            }
          }
        }
      } while (t && (x.lastIndex = s));
      return pos;
    };
    showdown.helper.matchRecursiveRegExp = function(str, left, right, flags) {
      'use strict';
      var matchPos = rgxFindMatchPos(str, left, right, flags),
          results = [];
      for (var i = 0; i < matchPos.length; ++i) {
        results.push([str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)]);
      }
      return results;
    };
    showdown.helper.replaceRecursiveRegExp = function(str, replacement, left, right, flags) {
      'use strict';
      if (!showdown.helper.isFunction(replacement)) {
        var repStr = replacement;
        replacement = function() {
          return repStr;
        };
      }
      var matchPos = rgxFindMatchPos(str, left, right, flags),
          finalStr = str,
          lng = matchPos.length;
      if (lng > 0) {
        var bits = [];
        if (matchPos[0].wholeMatch.start !== 0) {
          bits.push(str.slice(0, matchPos[0].wholeMatch.start));
        }
        for (var i = 0; i < lng; ++i) {
          bits.push(replacement(str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)));
          if (i < lng - 1) {
            bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
          }
        }
        if (matchPos[lng - 1].wholeMatch.end < str.length) {
          bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
        }
        finalStr = bits.join('');
      }
      return finalStr;
    };
    if (showdown.helper.isUndefined(console)) {
      console = {
        warn: function(msg) {
          'use strict';
          alert(msg);
        },
        log: function(msg) {
          'use strict';
          alert(msg);
        },
        error: function(msg) {
          'use strict';
          throw msg;
        }
      };
    }
    showdown.Converter = function(converterOptions) {
      'use strict';
      var options = {},
          langExtensions = [],
          outputModifiers = [],
          listeners = {};
      _constructor();
      function _constructor() {
        converterOptions = converterOptions || {};
        for (var gOpt in globalOptions) {
          if (globalOptions.hasOwnProperty(gOpt)) {
            options[gOpt] = globalOptions[gOpt];
          }
        }
        if (typeof converterOptions === 'object') {
          for (var opt in converterOptions) {
            if (converterOptions.hasOwnProperty(opt)) {
              options[opt] = converterOptions[opt];
            }
          }
        } else {
          throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions + ' was passed instead.');
        }
        if (options.extensions) {
          showdown.helper.forEach(options.extensions, _parseExtension);
        }
      }
      function _parseExtension(ext, name) {
        name = name || null;
        if (showdown.helper.isString(ext)) {
          ext = showdown.helper.stdExtName(ext);
          name = ext;
          if (showdown.extensions[ext]) {
            console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' + 'Please inform the developer that the extension should be updated!');
            legacyExtensionLoading(showdown.extensions[ext], ext);
            return;
          } else if (!showdown.helper.isUndefined(extensions[ext])) {
            ext = extensions[ext];
          } else {
            throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
          }
        }
        if (typeof ext === 'function') {
          ext = ext();
        }
        if (!showdown.helper.isArray(ext)) {
          ext = [ext];
        }
        var validExt = validate(ext, name);
        if (!validExt.valid) {
          throw Error(validExt.error);
        }
        for (var i = 0; i < ext.length; ++i) {
          switch (ext[i].type) {
            case 'lang':
              langExtensions.push(ext[i]);
              break;
            case 'output':
              outputModifiers.push(ext[i]);
              break;
          }
          if (ext[i].hasOwnProperty(listeners)) {
            for (var ln in ext[i].listeners) {
              if (ext[i].listeners.hasOwnProperty(ln)) {
                listen(ln, ext[i].listeners[ln]);
              }
            }
          }
        }
      }
      function legacyExtensionLoading(ext, name) {
        if (typeof ext === 'function') {
          ext = ext(new showdown.Converter());
        }
        if (!showdown.helper.isArray(ext)) {
          ext = [ext];
        }
        var valid = validate(ext, name);
        if (!valid.valid) {
          throw Error(valid.error);
        }
        for (var i = 0; i < ext.length; ++i) {
          switch (ext[i].type) {
            case 'lang':
              langExtensions.push(ext[i]);
              break;
            case 'output':
              outputModifiers.push(ext[i]);
              break;
            default:
              throw Error('Extension loader error: Type unrecognized!!!');
          }
        }
      }
      function listen(name, callback) {
        if (!showdown.helper.isString(name)) {
          throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
        }
        if (typeof callback !== 'function') {
          throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
        }
        if (!listeners.hasOwnProperty(name)) {
          listeners[name] = [];
        }
        listeners[name].push(callback);
      }
      function rTrimInputText(text) {
        var rsp = text.match(/^\s*/)[0].length,
            rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
        return text.replace(rgx, '');
      }
      this._dispatch = function dispatch(evtName, text, options, globals) {
        if (listeners.hasOwnProperty(evtName)) {
          for (var ei = 0; ei < listeners[evtName].length; ++ei) {
            var nText = listeners[evtName][ei](evtName, text, this, options, globals);
            if (nText && typeof nText !== 'undefined') {
              text = nText;
            }
          }
        }
        return text;
      };
      this.listen = function(name, callback) {
        listen(name, callback);
        return this;
      };
      this.makeHtml = function(text) {
        if (!text) {
          return text;
        }
        var globals = {
          gHtmlBlocks: [],
          gHtmlMdBlocks: [],
          gHtmlSpans: [],
          gUrls: {},
          gTitles: {},
          gDimensions: {},
          gListLevel: 0,
          hashLinkCounts: {},
          langExtensions: langExtensions,
          outputModifiers: outputModifiers,
          converter: this,
          ghCodeBlocks: []
        };
        text = text.replace(/~/g, '~T');
        text = text.replace(/\$/g, '~D');
        text = text.replace(/\r\n/g, '\n');
        text = text.replace(/\r/g, '\n');
        if (options.smartIndentationFix) {
          text = rTrimInputText(text);
        }
        text = '\n\n' + text + '\n\n';
        text = showdown.subParser('detab')(text, options, globals);
        text = showdown.subParser('stripBlankLines')(text, options, globals);
        showdown.helper.forEach(langExtensions, function(ext) {
          text = showdown.subParser('runExtension')(ext, text, options, globals);
        });
        text = showdown.subParser('hashPreCodeTags')(text, options, globals);
        text = showdown.subParser('githubCodeBlocks')(text, options, globals);
        text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
        text = showdown.subParser('hashHTMLSpans')(text, options, globals);
        text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
        text = showdown.subParser('blockGamut')(text, options, globals);
        text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
        text = showdown.subParser('unescapeSpecialChars')(text, options, globals);
        text = text.replace(/~D/g, '$$');
        text = text.replace(/~T/g, '~');
        showdown.helper.forEach(outputModifiers, function(ext) {
          text = showdown.subParser('runExtension')(ext, text, options, globals);
        });
        return text;
      };
      this.setOption = function(key, value) {
        options[key] = value;
      };
      this.getOption = function(key) {
        return options[key];
      };
      this.getOptions = function() {
        return options;
      };
      this.addExtension = function(extension, name) {
        name = name || null;
        _parseExtension(extension, name);
      };
      this.useExtension = function(extensionName) {
        _parseExtension(extensionName);
      };
      this.setFlavor = function(name) {
        if (flavor.hasOwnProperty(name)) {
          var preset = flavor[name];
          for (var option in preset) {
            if (preset.hasOwnProperty(option)) {
              options[option] = preset[option];
            }
          }
        }
      };
      this.removeExtension = function(extension) {
        if (!showdown.helper.isArray(extension)) {
          extension = [extension];
        }
        for (var a = 0; a < extension.length; ++a) {
          var ext = extension[a];
          for (var i = 0; i < langExtensions.length; ++i) {
            if (langExtensions[i] === ext) {
              langExtensions[i].splice(i, 1);
            }
          }
          for (var ii = 0; ii < outputModifiers.length; ++i) {
            if (outputModifiers[ii] === ext) {
              outputModifiers[ii].splice(i, 1);
            }
          }
        }
      };
      this.getAllExtensions = function() {
        return {
          language: langExtensions,
          output: outputModifiers
        };
      };
    };
    showdown.subParser('anchors', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('anchors.before', text, options, globals);
      var writeAnchorTag = function(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
        if (showdown.helper.isUndefined(m7)) {
          m7 = '';
        }
        wholeMatch = m1;
        var linkText = m2,
            linkId = m3.toLowerCase(),
            url = m4,
            title = m7;
        if (!url) {
          if (!linkId) {
            linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
          }
          url = '#' + linkId;
          if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
            url = globals.gUrls[linkId];
            if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
              title = globals.gTitles[linkId];
            }
          } else {
            if (wholeMatch.search(/\(\s*\)$/m) > -1) {
              url = '';
            } else {
              return wholeMatch;
            }
          }
        }
        url = showdown.helper.escapeCharacters(url, '*_', false);
        var result = '<a href="' + url + '"';
        if (title !== '' && title !== null) {
          title = title.replace(/"/g, '&quot;');
          title = showdown.helper.escapeCharacters(title, '*_', false);
          result += ' title="' + title + '"';
        }
        result += '>' + linkText + '</a>';
        return result;
      };
      text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, writeAnchorTag);
      text = text.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeAnchorTag);
      text = text.replace(/(\[([^\[\]]+)])()()()()()/g, writeAnchorTag);
      text = globals.converter._dispatch('anchors.after', text, options, globals);
      return text;
    });
    showdown.subParser('autoLinks', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('autoLinks.before', text, options, globals);
      var simpleURLRegex = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi,
          delimUrlRegex = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,
          simpleMailRegex = /(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi,
          delimMailRegex = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;
      text = text.replace(delimUrlRegex, '<a href=\"$1\">$1</a>');
      text = text.replace(delimMailRegex, replaceMail);
      if (options.simplifiedAutoLink) {
        text = text.replace(simpleURLRegex, '<a href=\"$1\">$1</a>');
        text = text.replace(simpleMailRegex, replaceMail);
      }
      function replaceMail(wholeMatch, m1) {
        var unescapedStr = showdown.subParser('unescapeSpecialChars')(m1);
        return showdown.subParser('encodeEmailAddress')(unescapedStr);
      }
      text = globals.converter._dispatch('autoLinks.after', text, options, globals);
      return text;
    });
    showdown.subParser('blockGamut', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('blockGamut.before', text, options, globals);
      text = showdown.subParser('blockQuotes')(text, options, globals);
      text = showdown.subParser('headers')(text, options, globals);
      var key = showdown.subParser('hashBlock')('<hr />', options, globals);
      text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, key);
      text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, key);
      text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, key);
      text = showdown.subParser('lists')(text, options, globals);
      text = showdown.subParser('codeBlocks')(text, options, globals);
      text = showdown.subParser('tables')(text, options, globals);
      text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
      text = showdown.subParser('paragraphs')(text, options, globals);
      text = globals.converter._dispatch('blockGamut.after', text, options, globals);
      return text;
    });
    showdown.subParser('blockQuotes', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('blockQuotes.before', text, options, globals);
      text = text.replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(wholeMatch, m1) {
        var bq = m1;
        bq = bq.replace(/^[ \t]*>[ \t]?/gm, '~0');
        bq = bq.replace(/~0/g, '');
        bq = bq.replace(/^[ \t]+$/gm, '');
        bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
        bq = showdown.subParser('blockGamut')(bq, options, globals);
        bq = bq.replace(/(^|\n)/g, '$1  ');
        bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
          var pre = m1;
          pre = pre.replace(/^  /mg, '~0');
          pre = pre.replace(/~0/g, '');
          return pre;
        });
        return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
      });
      text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
      return text;
    });
    showdown.subParser('codeBlocks', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('codeBlocks.before', text, options, globals);
      text += '~0';
      var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;
      text = text.replace(pattern, function(wholeMatch, m1, m2) {
        var codeblock = m1,
            nextChar = m2,
            end = '\n';
        codeblock = showdown.subParser('outdent')(codeblock);
        codeblock = showdown.subParser('encodeCode')(codeblock);
        codeblock = showdown.subParser('detab')(codeblock);
        codeblock = codeblock.replace(/^\n+/g, '');
        codeblock = codeblock.replace(/\n+$/g, '');
        if (options.omitExtraWLInCodeBlocks) {
          end = '';
        }
        codeblock = '<pre><code>' + codeblock + end + '</code></pre>';
        return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
      });
      text = text.replace(/~0/, '');
      text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
      return text;
    });
    showdown.subParser('codeSpans', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('codeSpans.before', text, options, globals);
      if (typeof(text) === 'undefined') {
        text = '';
      }
      text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(wholeMatch, m1, m2, m3) {
        var c = m3;
        c = c.replace(/^([ \t]*)/g, '');
        c = c.replace(/[ \t]*$/g, '');
        c = showdown.subParser('encodeCode')(c);
        return m1 + '<code>' + c + '</code>';
      });
      text = globals.converter._dispatch('codeSpans.after', text, options, globals);
      return text;
    });
    showdown.subParser('detab', function(text) {
      'use strict';
      text = text.replace(/\t(?=\t)/g, '    ');
      text = text.replace(/\t/g, '~A~B');
      text = text.replace(/~B(.+?)~A/g, function(wholeMatch, m1) {
        var leadingText = m1,
            numSpaces = 4 - leadingText.length % 4;
        for (var i = 0; i < numSpaces; i++) {
          leadingText += ' ';
        }
        return leadingText;
      });
      text = text.replace(/~A/g, '    ');
      text = text.replace(/~B/g, '');
      return text;
    });
    showdown.subParser('encodeAmpsAndAngles', function(text) {
      'use strict';
      text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');
      text = text.replace(/<(?![a-z\/?\$!])/gi, '&lt;');
      return text;
    });
    showdown.subParser('encodeBackslashEscapes', function(text) {
      'use strict';
      text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
      text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, showdown.helper.escapeCharactersCallback);
      return text;
    });
    showdown.subParser('encodeCode', function(text) {
      'use strict';
      text = text.replace(/&/g, '&amp;');
      text = text.replace(/</g, '&lt;');
      text = text.replace(/>/g, '&gt;');
      text = showdown.helper.escapeCharacters(text, '*_{}[]\\', false);
      return text;
    });
    showdown.subParser('encodeEmailAddress', function(addr) {
      'use strict';
      var encode = [function(ch) {
        return '&#' + ch.charCodeAt(0) + ';';
      }, function(ch) {
        return '&#x' + ch.charCodeAt(0).toString(16) + ';';
      }, function(ch) {
        return ch;
      }];
      addr = 'mailto:' + addr;
      addr = addr.replace(/./g, function(ch) {
        if (ch === '@') {
          ch = encode[Math.floor(Math.random() * 2)](ch);
        } else if (ch !== ':') {
          var r = Math.random();
          ch = (r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch));
        }
        return ch;
      });
      addr = '<a href="' + addr + '">' + addr + '</a>';
      addr = addr.replace(/">.+:/g, '">');
      return addr;
    });
    showdown.subParser('escapeSpecialCharsWithinTagAttributes', function(text) {
      'use strict';
      var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
      text = text.replace(regex, function(wholeMatch) {
        var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, '$1`');
        tag = showdown.helper.escapeCharacters(tag, '\\`*_', false);
        return tag;
      });
      return text;
    });
    showdown.subParser('githubCodeBlocks', function(text, options, globals) {
      'use strict';
      if (!options.ghCodeBlocks) {
        return text;
      }
      text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);
      text += '~0';
      text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(wholeMatch, language, codeblock) {
        var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';
        codeblock = showdown.subParser('encodeCode')(codeblock);
        codeblock = showdown.subParser('detab')(codeblock);
        codeblock = codeblock.replace(/^\n+/g, '');
        codeblock = codeblock.replace(/\n+$/g, '');
        codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';
        codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);
        return '\n\n~G' + (globals.ghCodeBlocks.push({
          text: wholeMatch,
          codeblock: codeblock
        }) - 1) + 'G\n\n';
      });
      text = text.replace(/~0/, '');
      return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
    });
    showdown.subParser('hashBlock', function(text, options, globals) {
      'use strict';
      text = text.replace(/(^\n+|\n+$)/g, '');
      return '\n\n~K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
    });
    showdown.subParser('hashElement', function(text, options, globals) {
      'use strict';
      return function(wholeMatch, m1) {
        var blockText = m1;
        blockText = blockText.replace(/\n\n/g, '\n');
        blockText = blockText.replace(/^\n/, '');
        blockText = blockText.replace(/\n+$/g, '');
        blockText = '\n\n~K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';
        return blockText;
      };
    });
    showdown.subParser('hashHTMLBlocks', function(text, options, globals) {
      'use strict';
      var blockTags = ['pre', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'table', 'dl', 'ol', 'ul', 'script', 'noscript', 'form', 'fieldset', 'iframe', 'math', 'style', 'section', 'header', 'footer', 'nav', 'article', 'aside', 'address', 'audio', 'canvas', 'figure', 'hgroup', 'output', 'video', 'p'],
          repFunc = function(wholeMatch, match, left, right) {
            var txt = wholeMatch;
            if (left.search(/\bmarkdown\b/) !== -1) {
              txt = left + globals.converter.makeHtml(match) + right;
            }
            return '\n\n~K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
          };
      for (var i = 0; i < blockTags.length; ++i) {
        text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^(?: |\\t){0,3}<' + blockTags[i] + '\\b[^>]*>', '</' + blockTags[i] + '>', 'gim');
      }
      text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals));
      text = text.replace(/(<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals));
      text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals));
      return text;
    });
    showdown.subParser('hashHTMLSpans', function(text, config, globals) {
      'use strict';
      var matches = showdown.helper.matchRecursiveRegExp(text, '<code\\b[^>]*>', '</code>', 'gi');
      for (var i = 0; i < matches.length; ++i) {
        text = text.replace(matches[i][0], '~L' + (globals.gHtmlSpans.push(matches[i][0]) - 1) + 'L');
      }
      return text;
    });
    showdown.subParser('unhashHTMLSpans', function(text, config, globals) {
      'use strict';
      for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
        text = text.replace('~L' + i + 'L', globals.gHtmlSpans[i]);
      }
      return text;
    });
    showdown.subParser('hashPreCodeTags', function(text, config, globals) {
      'use strict';
      var repFunc = function(wholeMatch, match, left, right) {
        var codeblock = left + showdown.subParser('encodeCode')(match) + right;
        return '\n\n~G' + (globals.ghCodeBlocks.push({
          text: wholeMatch,
          codeblock: codeblock
        }) - 1) + 'G\n\n';
      };
      text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^(?: |\\t){0,3}</code>\\s*</pre>', 'gim');
      return text;
    });
    showdown.subParser('headers', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('headers.before', text, options, globals);
      var prefixHeader = options.prefixHeaderId,
          headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),
          setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
          setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      text = text.replace(setextRegexH1, function(wholeMatch, m1) {
        var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
            hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
            hLevel = headerLevelStart,
            hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
        return showdown.subParser('hashBlock')(hashBlock, options, globals);
      });
      text = text.replace(setextRegexH2, function(matchFound, m1) {
        var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
            hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
            hLevel = headerLevelStart + 1,
            hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
        return showdown.subParser('hashBlock')(hashBlock, options, globals);
      });
      text = text.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function(wholeMatch, m1, m2) {
        var span = showdown.subParser('spanGamut')(m2, options, globals),
            hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
            hLevel = headerLevelStart - 1 + m1.length,
            header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';
        return showdown.subParser('hashBlock')(header, options, globals);
      });
      function headerId(m) {
        var title,
            escapedId = m.replace(/[^\w]/g, '').toLowerCase();
        if (globals.hashLinkCounts[escapedId]) {
          title = escapedId + '-' + (globals.hashLinkCounts[escapedId]++);
        } else {
          title = escapedId;
          globals.hashLinkCounts[escapedId] = 1;
        }
        if (prefixHeader === true) {
          prefixHeader = 'section';
        }
        if (showdown.helper.isString(prefixHeader)) {
          return prefixHeader + title;
        }
        return title;
      }
      text = globals.converter._dispatch('headers.after', text, options, globals);
      return text;
    });
    showdown.subParser('images', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('images.before', text, options, globals);
      var inlineRegExp = /!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,
          referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;
      function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
        var gUrls = globals.gUrls,
            gTitles = globals.gTitles,
            gDims = globals.gDimensions;
        linkId = linkId.toLowerCase();
        if (!title) {
          title = '';
        }
        if (url === '' || url === null) {
          if (linkId === '' || linkId === null) {
            linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
          }
          url = '#' + linkId;
          if (!showdown.helper.isUndefined(gUrls[linkId])) {
            url = gUrls[linkId];
            if (!showdown.helper.isUndefined(gTitles[linkId])) {
              title = gTitles[linkId];
            }
            if (!showdown.helper.isUndefined(gDims[linkId])) {
              width = gDims[linkId].width;
              height = gDims[linkId].height;
            }
          } else {
            return wholeMatch;
          }
        }
        altText = altText.replace(/"/g, '&quot;');
        altText = showdown.helper.escapeCharacters(altText, '*_', false);
        url = showdown.helper.escapeCharacters(url, '*_', false);
        var result = '<img src="' + url + '" alt="' + altText + '"';
        if (title) {
          title = title.replace(/"/g, '&quot;');
          title = showdown.helper.escapeCharacters(title, '*_', false);
          result += ' title="' + title + '"';
        }
        if (width && height) {
          width = (width === '*') ? 'auto' : width;
          height = (height === '*') ? 'auto' : height;
          result += ' width="' + width + '"';
          result += ' height="' + height + '"';
        }
        result += ' />';
        return result;
      }
      text = text.replace(referenceRegExp, writeImageTag);
      text = text.replace(inlineRegExp, writeImageTag);
      text = globals.converter._dispatch('images.after', text, options, globals);
      return text;
    });
    showdown.subParser('italicsAndBold', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);
      if (options.literalMidWordUnderscores) {
        text = text.replace(/(^|\s|>|\b)__(?=\S)([^]+?)__(?=\b|<|\s|$)/gm, '$1<strong>$2</strong>');
        text = text.replace(/(^|\s|>|\b)_(?=\S)([^]+?)_(?=\b|<|\s|$)/gm, '$1<em>$2</em>');
        text = text.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, '<strong>$2</strong>');
        text = text.replace(/(\*)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
      } else {
        text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, '<strong>$2</strong>');
        text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
      }
      text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
      return text;
    });
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
    showdown.subParser('outdent', function(text) {
      'use strict';
      text = text.replace(/^(\t|[ ]{1,4})/gm, '~0');
      text = text.replace(/~0/g, '');
      return text;
    });
    showdown.subParser('paragraphs', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('paragraphs.before', text, options, globals);
      text = text.replace(/^\n+/g, '');
      text = text.replace(/\n+$/g, '');
      var grafs = text.split(/\n{2,}/g),
          grafsOut = [],
          end = grafs.length;
      for (var i = 0; i < end; i++) {
        var str = grafs[i];
        if (str.search(/~(K|G)(\d+)\1/g) >= 0) {
          grafsOut.push(str);
        } else {
          str = showdown.subParser('spanGamut')(str, options, globals);
          str = str.replace(/^([ \t]*)/g, '<p>');
          str += '</p>';
          grafsOut.push(str);
        }
      }
      end = grafsOut.length;
      for (i = 0; i < end; i++) {
        var blockText = '',
            grafsOutIt = grafsOut[i],
            codeFlag = false;
        while (grafsOutIt.search(/~(K|G)(\d+)\1/) >= 0) {
          var delim = RegExp.$1,
              num = RegExp.$2;
          if (delim === 'K') {
            blockText = globals.gHtmlBlocks[num];
          } else {
            if (codeFlag) {
              blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text);
            } else {
              blockText = globals.ghCodeBlocks[num].codeblock;
            }
          }
          blockText = blockText.replace(/\$/g, '$$$$');
          grafsOutIt = grafsOutIt.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, blockText);
          if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
            codeFlag = true;
          }
        }
        grafsOut[i] = grafsOutIt;
      }
      text = grafsOut.join('\n\n');
      text = text.replace(/^\n+/g, '');
      text = text.replace(/\n+$/g, '');
      return globals.converter._dispatch('paragraphs.after', text, options, globals);
    });
    showdown.subParser('runExtension', function(ext, text, options, globals) {
      'use strict';
      if (ext.filter) {
        text = ext.filter(text, globals.converter, options);
      } else if (ext.regex) {
        var re = ext.regex;
        if (!re instanceof RegExp) {
          re = new RegExp(re, 'g');
        }
        text = text.replace(re, ext.replace);
      }
      return text;
    });
    showdown.subParser('spanGamut', function(text, options, globals) {
      'use strict';
      text = globals.converter._dispatch('spanGamut.before', text, options, globals);
      text = showdown.subParser('codeSpans')(text, options, globals);
      text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
      text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);
      text = showdown.subParser('images')(text, options, globals);
      text = showdown.subParser('anchors')(text, options, globals);
      text = showdown.subParser('autoLinks')(text, options, globals);
      text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);
      text = showdown.subParser('italicsAndBold')(text, options, globals);
      text = showdown.subParser('strikethrough')(text, options, globals);
      text = text.replace(/  +\n/g, ' <br />\n');
      text = globals.converter._dispatch('spanGamut.after', text, options, globals);
      return text;
    });
    showdown.subParser('strikethrough', function(text, options, globals) {
      'use strict';
      if (options.strikethrough) {
        text = globals.converter._dispatch('strikethrough.before', text, options, globals);
        text = text.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, '<del>$1</del>');
        text = globals.converter._dispatch('strikethrough.after', text, options, globals);
      }
      return text;
    });
    showdown.subParser('stripBlankLines', function(text) {
      'use strict';
      return text.replace(/^[ \t]+$/mg, '');
    });
    showdown.subParser('stripLinkDefinitions', function(text, options, globals) {
      'use strict';
      var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;
      text += '~0';
      text = text.replace(regex, function(wholeMatch, linkId, url, width, height, blankLines, title) {
        linkId = linkId.toLowerCase();
        globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url);
        if (blankLines) {
          return blankLines + title;
        } else {
          if (title) {
            globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
          }
          if (options.parseImgDimensions && width && height) {
            globals.gDimensions[linkId] = {
              width: width,
              height: height
            };
          }
        }
        return '';
      });
      text = text.replace(/~0/, '');
      return text;
    });
    showdown.subParser('tables', function(text, options, globals) {
      'use strict';
      if (!options.tables) {
        return text;
      }
      var tableRgx = /^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[^]+?(?:\n\n|~0)/gm;
      function parseStyles(sLine) {
        if (/^:[ \t]*--*$/.test(sLine)) {
          return ' style="text-align:left;"';
        } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
          return ' style="text-align:right;"';
        } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
          return ' style="text-align:center;"';
        } else {
          return '';
        }
      }
      function parseHeaders(header, style) {
        var id = '';
        header = header.trim();
        if (options.tableHeaderId) {
          id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
        }
        header = showdown.subParser('spanGamut')(header, options, globals);
        return '<th' + id + style + '>' + header + '</th>\n';
      }
      function parseCells(cell, style) {
        var subText = showdown.subParser('spanGamut')(cell, options, globals);
        return '<td' + style + '>' + subText + '</td>\n';
      }
      function buildTable(headers, cells) {
        var tb = '<table>\n<thead>\n<tr>\n',
            tblLgn = headers.length;
        for (var i = 0; i < tblLgn; ++i) {
          tb += headers[i];
        }
        tb += '</tr>\n</thead>\n<tbody>\n';
        for (i = 0; i < cells.length; ++i) {
          tb += '<tr>\n';
          for (var ii = 0; ii < tblLgn; ++ii) {
            tb += cells[i][ii];
          }
          tb += '</tr>\n';
        }
        tb += '</tbody>\n</table>\n';
        return tb;
      }
      text = globals.converter._dispatch('tables.before', text, options, globals);
      text = text.replace(tableRgx, function(rawTable) {
        var i,
            tableLines = rawTable.split('\n');
        for (i = 0; i < tableLines.length; ++i) {
          if (/^[ \t]{0,3}\|/.test(tableLines[i])) {
            tableLines[i] = tableLines[i].replace(/^[ \t]{0,3}\|/, '');
          }
          if (/\|[ \t]*$/.test(tableLines[i])) {
            tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
          }
        }
        var rawHeaders = tableLines[0].split('|').map(function(s) {
          return s.trim();
        }),
            rawStyles = tableLines[1].split('|').map(function(s) {
              return s.trim();
            }),
            rawCells = [],
            headers = [],
            styles = [],
            cells = [];
        tableLines.shift();
        tableLines.shift();
        for (i = 0; i < tableLines.length; ++i) {
          if (tableLines[i].trim() === '') {
            continue;
          }
          rawCells.push(tableLines[i].split('|').map(function(s) {
            return s.trim();
          }));
        }
        if (rawHeaders.length < rawStyles.length) {
          return rawTable;
        }
        for (i = 0; i < rawStyles.length; ++i) {
          styles.push(parseStyles(rawStyles[i]));
        }
        for (i = 0; i < rawHeaders.length; ++i) {
          if (showdown.helper.isUndefined(styles[i])) {
            styles[i] = '';
          }
          headers.push(parseHeaders(rawHeaders[i], styles[i]));
        }
        for (i = 0; i < rawCells.length; ++i) {
          var row = [];
          for (var ii = 0; ii < headers.length; ++ii) {
            if (showdown.helper.isUndefined(rawCells[i][ii])) {}
            row.push(parseCells(rawCells[i][ii], styles[ii]));
          }
          cells.push(row);
        }
        return buildTable(headers, cells);
      });
      text = globals.converter._dispatch('tables.after', text, options, globals);
      return text;
    });
    showdown.subParser('unescapeSpecialChars', function(text) {
      'use strict';
      text = text.replace(/~E(\d+)E/g, function(wholeMatch, m1) {
        var charCodeToReplace = parseInt(m1);
        return String.fromCharCode(charCodeToReplace);
      });
      return text;
    });
    var root = this;
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = showdown;
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        'use strict';
        return showdown;
      });
    } else {
      root.showdown = showdown;
    }
  }).call(this);
})(require('process'));
