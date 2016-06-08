/* */ 
(function(process) {
  var assert = require('assert');
  var Completion = require('./lib/completion');
  var Parser = require('./lib/parser');
  var path = require('path');
  var tokenizeArgString = require('./lib/tokenize-arg-string');
  var Usage = require('./lib/usage');
  var Validation = require('./lib/validation');
  var Y18n = require('y18n');
  Argv(process.argv.slice(2));
  var exports = module.exports = Argv;
  function Argv(processArgs, cwd) {
    processArgs = processArgs || [];
    var self = {};
    var completion = null;
    var usage = null;
    var validation = null;
    var y18n = Y18n({
      directory: path.resolve(__dirname, './locales'),
      updateFiles: false
    });
    if (!cwd)
      cwd = process.cwd();
    self.$0 = process.argv.slice(0, 2).map(function(x, i) {
      if (i === 0 && /\b(node|iojs)$/.test(x))
        return;
      var b = rebase(cwd, x);
      return x.match(/^\//) && b.length < x.length ? b : x;
    }).join(' ').trim();
    if (process.env._ !== undefined && process.argv[1] === process.env._) {
      self.$0 = process.env._.replace(path.dirname(process.execPath) + '/', '');
    }
    var options;
    self.resetOptions = self.reset = function() {
      options = {
        array: [],
        boolean: [],
        string: [],
        narg: {},
        key: {},
        alias: {},
        default: {},
        defaultDescription: {},
        choices: {},
        requiresArg: [],
        count: [],
        normalize: [],
        config: {},
        envPrefix: undefined
      };
      usage = Usage(self, y18n);
      validation = Validation(self, usage, y18n);
      completion = Completion(self, usage);
      demanded = {};
      groups = {};
      exitProcess = true;
      strict = false;
      helpOpt = null;
      versionOpt = null;
      commandHandlers = {};
      self.parsed = false;
      return self;
    };
    self.resetOptions();
    self.boolean = function(bools) {
      options.boolean.push.apply(options.boolean, [].concat(bools));
      return self;
    };
    self.array = function(arrays) {
      options.array.push.apply(options.array, [].concat(arrays));
      return self;
    };
    self.nargs = function(key, n) {
      if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
          self.nargs(k, key[k]);
        });
      } else {
        options.narg[key] = n;
      }
      return self;
    };
    self.choices = function(key, values) {
      if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
          self.choices(k, key[k]);
        });
      } else {
        options.choices[key] = (options.choices[key] || []).concat(values);
      }
      return self;
    };
    self.normalize = function(strings) {
      options.normalize.push.apply(options.normalize, [].concat(strings));
      return self;
    };
    self.config = function(key, msg, parseFn) {
      if (typeof msg === 'function') {
        parseFn = msg;
        msg = null;
      }
      self.describe(key, msg || usage.deferY18nLookup('Path to JSON config file'));
      ;
      (Array.isArray(key) ? key : [key]).forEach(function(k) {
        options.config[k] = parseFn || true;
      });
      return self;
    };
    self.example = function(cmd, description) {
      usage.example(cmd, description);
      return self;
    };
    self.command = function(cmd, description, fn) {
      if (description !== false) {
        usage.command(cmd, description);
      }
      if (fn)
        commandHandlers[cmd] = fn;
      return self;
    };
    var commandHandlers = {};
    self.getCommandHandlers = function() {
      return commandHandlers;
    };
    self.string = function(strings) {
      options.string.push.apply(options.string, [].concat(strings));
      return self;
    };
    self.default = function(key, value, defaultDescription) {
      if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
          self.default(k, key[k]);
        });
      } else {
        if (defaultDescription)
          options.defaultDescription[key] = defaultDescription;
        if (typeof value === 'function') {
          if (!options.defaultDescription[key])
            options.defaultDescription[key] = usage.functionDescription(value);
          value = value.call();
        }
        options.default[key] = value;
      }
      return self;
    };
    self.alias = function(x, y) {
      if (typeof x === 'object') {
        Object.keys(x).forEach(function(key) {
          self.alias(key, x[key]);
        });
      } else {
        var aliases = null;
        Object.keys(options.alias).forEach(function(key) {
          if (~options.alias[key].indexOf(x))
            aliases = options.alias[key];
        });
        if (aliases) {
          aliases.push(y);
        } else {
          options.alias[x] = (options.alias[x] || []).concat(y);
        }
        if (options.alias[y]) {
          Array.prototype.push.apply((options.alias[x] || aliases), options.alias[y]);
          delete options.alias[y];
        }
      }
      return self;
    };
    self.count = function(counts) {
      options.count.push.apply(options.count, [].concat(counts));
      return self;
    };
    var demanded = {};
    self.demand = self.required = self.require = function(keys, max, msg) {
      if (typeof max !== 'number') {
        msg = max;
        max = Infinity;
      }
      if (typeof keys === 'number') {
        if (!demanded._)
          demanded._ = {
            count: 0,
            msg: null,
            max: max
          };
        demanded._.count = keys;
        demanded._.msg = msg;
      } else if (Array.isArray(keys)) {
        keys.forEach(function(key) {
          self.demand(key, msg);
        });
      } else {
        if (typeof msg === 'string') {
          demanded[keys] = {msg: msg};
        } else if (msg === true || typeof msg === 'undefined') {
          demanded[keys] = {msg: undefined};
        }
      }
      return self;
    };
    self.getDemanded = function() {
      return demanded;
    };
    self.requiresArg = function(requiresArgs) {
      options.requiresArg.push.apply(options.requiresArg, [].concat(requiresArgs));
      return self;
    };
    self.implies = function(key, value) {
      validation.implies(key, value);
      return self;
    };
    self.usage = function(msg, opts) {
      if (!opts && typeof msg === 'object') {
        opts = msg;
        msg = null;
      }
      usage.usage(msg);
      if (opts)
        self.options(opts);
      return self;
    };
    self.epilogue = self.epilog = function(msg) {
      usage.epilog(msg);
      return self;
    };
    self.fail = function(f) {
      usage.failFn(f);
      return self;
    };
    self.check = function(f) {
      validation.check(f);
      return self;
    };
    self.defaults = self.default;
    self.describe = function(key, desc) {
      options.key[key] = true;
      usage.describe(key, desc);
      return self;
    };
    self.parse = function(args) {
      return parseArgs(args);
    };
    self.option = self.options = function(key, opt) {
      if (typeof key === 'object') {
        Object.keys(key).forEach(function(k) {
          self.options(k, key[k]);
        });
      } else {
        assert(typeof opt === 'object', 'second argument to option must be an object');
        options.key[key] = true;
        if (opt.alias)
          self.alias(key, opt.alias);
        var demand = opt.demand || opt.required || opt.require;
        if (demand) {
          self.demand(key, demand);
        }
        if ('config' in opt) {
          self.config(key, opt.configParser);
        }
        if ('default' in opt) {
          self.default(key, opt.default);
        }
        if ('nargs' in opt) {
          self.nargs(key, opt.nargs);
        }
        if ('choices' in opt) {
          self.choices(key, opt.choices);
        }
        if ('group' in opt) {
          self.group(key, opt.group);
        }
        if (opt.boolean || opt.type === 'boolean') {
          self.boolean(key);
          if (opt.alias)
            self.boolean(opt.alias);
        }
        if (opt.array || opt.type === 'array') {
          self.array(key);
          if (opt.alias)
            self.array(opt.alias);
        }
        if (opt.string || opt.type === 'string') {
          self.string(key);
          if (opt.alias)
            self.string(opt.alias);
        }
        if (opt.count || opt.type === 'count') {
          self.count(key);
        }
        if (opt.defaultDescription) {
          options.defaultDescription[key] = opt.defaultDescription;
        }
        var desc = opt.describe || opt.description || opt.desc;
        if (desc) {
          self.describe(key, desc);
        }
        if (opt.requiresArg) {
          self.requiresArg(key);
        }
      }
      return self;
    };
    self.getOptions = function() {
      return options;
    };
    var groups = {};
    self.group = function(opts, groupName) {
      var seen = {};
      groups[groupName] = (groups[groupName] || []).concat(opts).filter(function(key) {
        if (seen[key])
          return false;
        return (seen[key] = true);
      });
      return self;
    };
    self.getGroups = function() {
      return groups;
    };
    self.env = function(prefix) {
      if (prefix === false)
        options.envPrefix = undefined;
      else
        options.envPrefix = prefix || '';
      return self;
    };
    self.wrap = function(cols) {
      usage.wrap(cols);
      return self;
    };
    var strict = false;
    self.strict = function() {
      strict = true;
      return self;
    };
    self.getStrict = function() {
      return strict;
    };
    self.showHelp = function(level) {
      if (!self.parsed)
        parseArgs(processArgs);
      usage.showHelp(level);
      return self;
    };
    var versionOpt = null;
    self.version = function(ver, opt, msg) {
      versionOpt = opt || 'version';
      usage.version(ver);
      self.boolean(versionOpt);
      self.describe(versionOpt, msg || usage.deferY18nLookup('Show version number'));
      return self;
    };
    var helpOpt = null;
    self.addHelpOpt = function(opt, msg) {
      helpOpt = opt;
      self.boolean(opt);
      self.describe(opt, msg || usage.deferY18nLookup('Show help'));
      return self;
    };
    self.showHelpOnFail = function(enabled, message) {
      usage.showHelpOnFail(enabled, message);
      return self;
    };
    var exitProcess = true;
    self.exitProcess = function(enabled) {
      if (typeof enabled !== 'boolean') {
        enabled = true;
      }
      exitProcess = enabled;
      return self;
    };
    self.getExitProcess = function() {
      return exitProcess;
    };
    self.help = function() {
      if (arguments.length > 0)
        return self.addHelpOpt.apply(self, arguments);
      if (!self.parsed)
        parseArgs(processArgs);
      return usage.help();
    };
    var completionCommand = null;
    self.completion = function(cmd, desc, fn) {
      if (typeof desc === 'function') {
        fn = desc;
        desc = null;
      }
      completionCommand = cmd || 'completion';
      if (!desc && desc !== false) {
        desc = 'generate bash completion script';
      }
      self.command(completionCommand, desc);
      if (fn)
        completion.registerFunction(fn);
      return self;
    };
    self.showCompletionScript = function($0) {
      $0 = $0 || self.$0;
      console.log(completion.generateCompletionScript($0));
      return self;
    };
    self.locale = function(locale) {
      if (arguments.length === 0) {
        guessLocale();
        return y18n.getLocale();
      }
      detectLocale = false;
      y18n.setLocale(locale);
      return self;
    };
    self.updateStrings = self.updateLocale = function(obj) {
      detectLocale = false;
      y18n.updateLocale(obj);
      return self;
    };
    var detectLocale = true;
    self.detectLocale = function(detect) {
      detectLocale = detect;
      return self;
    };
    self.getDetectLocale = function() {
      return detectLocale;
    };
    self.getUsageInstance = function() {
      return usage;
    };
    self.getValidationInstance = function() {
      return validation;
    };
    self.terminalWidth = function() {
      return require('window-size').width;
    };
    Object.defineProperty(self, 'argv', {
      get: function() {
        var args = null;
        try {
          args = parseArgs(processArgs);
        } catch (err) {
          usage.fail(err.message);
        }
        return args;
      },
      enumerable: true
    });
    function parseArgs(args) {
      args = normalizeArgs(args);
      var parsed = Parser(args, options, y18n);
      var argv = parsed.argv;
      var aliases = parsed.aliases;
      argv.$0 = self.$0;
      self.parsed = parsed;
      guessLocale();
      if (completionCommand && (process.argv.join(' ')).indexOf(completion.completionKey) !== -1 && !argv[completion.completionKey]) {
        return argv;
      }
      var handlerKeys = Object.keys(self.getCommandHandlers());
      for (var i = 0,
          command; (command = handlerKeys[i]) !== undefined; i++) {
        if (~argv._.indexOf(command)) {
          runCommand(command, self, argv);
          return self.argv;
        }
      }
      if (completionCommand && ~argv._.indexOf(completionCommand) && !argv[completion.completionKey]) {
        self.showCompletionScript();
        if (exitProcess) {
          process.exit(0);
        }
      }
      if (completion.completionKey in argv) {
        completion.getCompletion(function(completions) {
          ;
          (completions || []).forEach(function(completion) {
            console.log(completion);
          });
          if (exitProcess) {
            process.exit(0);
          }
        });
        return;
      }
      var helpOrVersion = false;
      Object.keys(argv).forEach(function(key) {
        if (key === helpOpt && argv[key]) {
          helpOrVersion = true;
          self.showHelp('log');
          if (exitProcess) {
            process.exit(0);
          }
        } else if (key === versionOpt && argv[key]) {
          helpOrVersion = true;
          usage.showVersion();
          if (exitProcess) {
            process.exit(0);
          }
        }
      });
      if (!helpOrVersion) {
        if (parsed.error)
          throw parsed.error;
        if (!argv[completion.completionKey]) {
          validation.nonOptionCount(argv);
          validation.missingArgumentValue(argv);
          validation.requiredArguments(argv);
          if (strict)
            validation.unknownArguments(argv, aliases);
          validation.customChecks(argv, aliases);
          validation.limitedChoices(argv);
          validation.implications(argv);
        }
      }
      setPlaceholderKeys(argv);
      return argv;
    }
    function guessLocale() {
      if (!detectLocale)
        return;
      try {
        var osLocale = require('os-locale');
        self.locale(osLocale.sync({spawn: false}));
      } catch (err) {}
    }
    function runCommand(command, yargs, argv) {
      setPlaceholderKeys(argv);
      yargs.getCommandHandlers()[command](yargs.reset(), argv);
    }
    function setPlaceholderKeys(argv) {
      Object.keys(options.key).forEach(function(key) {
        if (~key.indexOf('.'))
          return;
        if (typeof argv[key] === 'undefined')
          argv[key] = undefined;
      });
    }
    function normalizeArgs(args) {
      if (typeof args === 'string') {
        return tokenizeArgString(args);
      }
      return args;
    }
    singletonify(self);
    return self;
  }
  exports.rebase = rebase;
  function rebase(base, dir) {
    return path.relative(base, dir);
  }
  function singletonify(inst) {
    Object.keys(inst).forEach(function(key) {
      if (key === 'argv') {
        Argv.__defineGetter__(key, inst.__lookupGetter__(key));
      } else {
        Argv[key] = typeof inst[key] === 'function' ? inst[key].bind(inst) : inst[key];
      }
    });
  }
})(require('process'));
