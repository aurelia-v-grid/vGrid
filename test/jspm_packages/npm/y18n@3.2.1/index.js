/* */ 
var fs = require('fs');
var path = require('path');
var util = require('util');
function Y18N(opts) {
  opts = opts || {};
  this.directory = opts.directory || './locales';
  this.updateFiles = typeof opts.updateFiles === 'boolean' ? opts.updateFiles : true;
  this.locale = opts.locale || 'en';
  this.fallbackToLanguage = typeof opts.fallbackToLanguage === 'boolean' ? opts.fallbackToLanguage : true;
  this.cache = {};
  this.writeQueue = [];
}
Y18N.prototype.__ = function() {
  var args = Array.prototype.slice.call(arguments);
  var str = args.shift();
  var cb = function() {};
  if (typeof args[args.length - 1] === 'function')
    cb = args.pop();
  cb = cb || function() {};
  if (!this.cache[this.locale])
    this._readLocaleFile();
  if (!this.cache[this.locale][str] && this.updateFiles) {
    this.cache[this.locale][str] = str;
    this._enqueueWrite([this.directory, this.locale, cb]);
  } else {
    cb();
  }
  return util.format.apply(util, [this.cache[this.locale][str] || str].concat(args));
};
Y18N.prototype._enqueueWrite = function(work) {
  this.writeQueue.push(work);
  if (this.writeQueue.length === 1)
    this._processWriteQueue();
};
Y18N.prototype._processWriteQueue = function() {
  var _this = this;
  var work = this.writeQueue[0];
  var directory = work[0];
  var locale = work[1];
  var cb = work[2];
  var languageFile = this._resolveLocaleFile(directory, locale);
  var serializedLocale = JSON.stringify(this.cache[locale], null, 2);
  fs.writeFile(languageFile, serializedLocale, 'utf-8', function(err) {
    _this.writeQueue.shift();
    if (_this.writeQueue.length > 0)
      _this._processWriteQueue();
    cb(err);
  });
};
Y18N.prototype._readLocaleFile = function() {
  var localeLookup = {};
  var languageFile = this._resolveLocaleFile(this.directory, this.locale);
  try {
    localeLookup = JSON.parse(fs.readFileSync(languageFile, 'utf-8'));
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.message = 'syntax error in ' + languageFile;
    }
    if (err.code === 'ENOENT')
      localeLookup = {};
    else
      throw err;
  }
  this.cache[this.locale] = localeLookup;
};
Y18N.prototype._resolveLocaleFile = function(directory, locale) {
  var file = path.resolve(directory, './', locale + '.json');
  if (this.fallbackToLanguage && !this._fileExistsSync(file) && ~locale.lastIndexOf('_')) {
    var languageFile = path.resolve(directory, './', locale.split('_')[0] + '.json');
    if (this._fileExistsSync(languageFile))
      file = languageFile;
  }
  return file;
};
Y18N.prototype._fileExistsSync = function(file) {
  try {
    return fs.statSync(file).isFile();
  } catch (err) {
    return false;
  }
};
Y18N.prototype.__n = function() {
  var args = Array.prototype.slice.call(arguments);
  var singular = args.shift();
  var plural = args.shift();
  var quantity = args.shift();
  var cb = function() {};
  if (typeof args[args.length - 1] === 'function')
    cb = args.pop();
  if (!this.cache[this.locale])
    this._readLocaleFile();
  var str = quantity === 1 ? singular : plural;
  if (this.cache[this.locale][singular]) {
    str = this.cache[this.locale][singular][quantity === 1 ? 'one' : 'other'];
  }
  if (!this.cache[this.locale][singular] && this.updateFiles) {
    this.cache[this.locale][singular] = {
      one: singular,
      other: plural
    };
    this._enqueueWrite([this.directory, this.locale, cb]);
  } else {
    cb();
  }
  var values = [str];
  if (~str.indexOf('%d'))
    values.push(quantity);
  return util.format.apply(util, values.concat(args));
};
Y18N.prototype.setLocale = function(locale) {
  this.locale = locale;
};
Y18N.prototype.getLocale = function() {
  return this.locale;
};
Y18N.prototype.updateLocale = function(obj) {
  if (!this.cache[this.locale])
    this._readLocaleFile();
  for (var key in obj) {
    this.cache[this.locale][key] = obj[key];
  }
};
module.exports = function(opts) {
  var y18n = new Y18N(opts);
  for (var key in y18n) {
    if (typeof y18n[key] === 'function') {
      y18n[key] = y18n[key].bind(y18n);
    }
  }
  return y18n;
};
