(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.CoreUI = global.CoreUI || {}, global.CoreUI.form = global.CoreUI.form || {}, global.CoreUI.form.fields = global.CoreUI.form.fields || {}, global.CoreUI.form.fields.select2 = factory(global.require$$0)));
})(this, (function (require$$0) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  var tpl = Object.create(null);
  tpl['select.html'] = '<% if (readonly) { %> <div class="coreui-form__field-readonly col-form-label"><%= selectOptions.join(\', \') %></div> <% } else { %> <select <%- attr %>> <% $.each(options, function(key, option) { %> <% if (option.type === \'group\') { %> <optgroup<%- option.attr %>/> <% $.each(option.options, function(key, groupOption) { %> <option <%- groupOption.attr %>/><%= groupOption.text %></option> <% }); %> </optgroup> <% } else { %> <option <%- option.attr %>/><%= option.text %></option> <% } %> <% }); %> </select> <% } %>';

  var utils = {
    /**
     * Объединение атрибутов
     * @param attr1
     * @param attr2
     * @returns {object}
     */
    mergeAttr: function mergeAttr(attr1, attr2) {
      var mergeAttr = Object.assign({}, attr1);
      if (_typeof(attr2) === 'object') {
        $.each(attr2, function (name, value) {
          if (mergeAttr.hasOwnProperty(name)) {
            if (name === 'class') {
              mergeAttr[name] += ' ' + value;
            } else if (name === 'style') {
              mergeAttr[name] += ';' + value;
            } else {
              mergeAttr[name] = value;
            }
          } else {
            mergeAttr[name] = value;
          }
        });
      }
      return mergeAttr;
    },
    /**
     * Проверка на объект
     * @param value
     */
    isObject: function isObject(value) {
      return _typeof(value) === 'object' && !Array.isArray(value) && value !== null;
    }
  };

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var select2$1 = {exports: {}};

  /*!
   * Select2 4.1.0-rc.0
   * https://select2.github.io
   *
   * Released under the MIT license
   * https://github.com/select2/select2/blob/master/LICENSE.md
   */
  select2$1.exports;
  (function (module) {
    (function (factory) {
      if (module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
          if (jQuery === undefined) {
            // require('jQuery') returns a factory that requires window to
            // build a jQuery instance, we normalize how we use modules
            // that require this pattern but the window provided is a noop
            // if it's defined (how jquery works)
            if (typeof window !== 'undefined') {
              jQuery = require$$0__default["default"];
            } else {
              jQuery = require$$0__default["default"](root);
            }
          }
          factory(jQuery);
          return jQuery;
        };
      } else {
        // Browser globals
        factory(jQuery);
      }
    })(function (jQuery) {
      // This is needed so we can catch the AMD loader configuration and use it
      // The inner file should be wrapped (by `banner.start.js`) in a function that
      // returns the AMD loader references.
      var S2 = function () {
        // Restore the Select2 AMD loader so it can be used
        // Needed mostly in the language files, where the loader is not inserted
        if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
          var S2 = jQuery.fn.select2.amd;
        }
        var S2;
        (function () {
          if (!S2 || !S2.requirejs) {
            if (!S2) {
              S2 = {};
            } else {
              require = S2;
            }
            /**
             * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
             * Released under MIT license, http://github.com/requirejs/almond/LICENSE
             */
            //Going sloppy to avoid 'use strict' string cost, but strict practices should
            //be followed.
            /*global setTimeout: false */

            var requirejs, require, define;
            (function (undef) {
              var main,
                req,
                makeMap,
                handlers,
                defined = {},
                waiting = {},
                config = {},
                defining = {},
                hasOwn = Object.prototype.hasOwnProperty,
                aps = [].slice,
                jsSuffixRegExp = /\.js$/;
              function hasProp(obj, prop) {
                return hasOwn.call(obj, prop);
              }

              /**
               * Given a relative module name, like ./something, normalize it to
               * a real name that can be mapped to a path.
               * @param {String} name the relative name
               * @param {String} baseName a real name that the name arg is relative
               * to.
               * @returns {String} normalized name
               */
              function normalize(name, baseName) {
                var nameParts,
                  nameSegment,
                  mapValue,
                  foundMap,
                  lastIndex,
                  foundI,
                  foundStarMap,
                  starI,
                  i,
                  j,
                  part,
                  normalizedBaseParts,
                  baseParts = baseName && baseName.split("/"),
                  map = config.map,
                  starMap = map && map['*'] || {};

                //Adjust any relative paths.
                if (name) {
                  name = name.split('/');
                  lastIndex = name.length - 1;

                  // If wanting node ID compatibility, strip .js from end
                  // of IDs. Have to do this here, and not in nameToUrl
                  // because node allows either .js or non .js to map
                  // to same file.
                  if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                  }

                  // Starts with a '.' so need the baseName
                  if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                  }

                  //start trimDots
                  for (i = 0; i < name.length; i++) {
                    part = name[i];
                    if (part === '.') {
                      name.splice(i, 1);
                      i -= 1;
                    } else if (part === '..') {
                      // If at the start, or previous value is still ..,
                      // keep them so that when converted to a path it may
                      // still work when converted to a path, even though
                      // as an ID it is less than ideal. In larger point
                      // releases, may be better to just kick out an error.
                      if (i === 0 || i === 1 && name[2] === '..' || name[i - 1] === '..') {
                        continue;
                      } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                      }
                    }
                  }
                  //end trimDots

                  name = name.join('/');
                }

                //Apply map config if available.
                if ((baseParts || starMap) && map) {
                  nameParts = name.split('/');
                  for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join("/");
                    if (baseParts) {
                      //Find the longest baseName segment match in the config.
                      //So, do joins on the biggest to smallest lengths of baseParts.
                      for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                          mapValue = mapValue[nameSegment];
                          if (mapValue) {
                            //Match, update name to the new value.
                            foundMap = mapValue;
                            foundI = i;
                            break;
                          }
                        }
                      }
                    }
                    if (foundMap) {
                      break;
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && starMap[nameSegment]) {
                      foundStarMap = starMap[nameSegment];
                      starI = i;
                    }
                  }
                  if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                  }
                  if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                  }
                }
                return name;
              }
              function makeRequire(relName, forceSync) {
                return function () {
                  //A version of a require function that passes a moduleName
                  //value for items that may need to
                  //look up paths relative to the moduleName
                  var args = aps.call(arguments, 0);

                  //If first arg is not require('string'), and there is only
                  //one arg, it is the array form without a callback. Insert
                  //a null so that the following concat is correct.
                  if (typeof args[0] !== 'string' && args.length === 1) {
                    args.push(null);
                  }
                  return req.apply(undef, args.concat([relName, forceSync]));
                };
              }
              function makeNormalize(relName) {
                return function (name) {
                  return normalize(name, relName);
                };
              }
              function makeLoad(depName) {
                return function (value) {
                  defined[depName] = value;
                };
              }
              function callDep(name) {
                if (hasProp(waiting, name)) {
                  var args = waiting[name];
                  delete waiting[name];
                  defining[name] = true;
                  main.apply(undef, args);
                }
                if (!hasProp(defined, name) && !hasProp(defining, name)) {
                  throw new Error('No ' + name);
                }
                return defined[name];
              }

              //Turns a plugin!resource to [plugin, resource]
              //with the plugin being undefined if the name
              //did not have a plugin prefix.
              function splitPrefix(name) {
                var prefix,
                  index = name ? name.indexOf('!') : -1;
                if (index > -1) {
                  prefix = name.substring(0, index);
                  name = name.substring(index + 1, name.length);
                }
                return [prefix, name];
              }

              //Creates a parts array for a relName where first part is plugin ID,
              //second part is resource ID. Assumes relName has already been normalized.
              function makeRelParts(relName) {
                return relName ? splitPrefix(relName) : [];
              }

              /**
               * Makes a name map, normalizing the name, and using a plugin
               * for normalization if necessary. Grabs a ref to plugin
               * too, as an optimization.
               */
              makeMap = function (name, relParts) {
                var plugin,
                  parts = splitPrefix(name),
                  prefix = parts[0],
                  relResourceName = relParts[1];
                name = parts[1];
                if (prefix) {
                  prefix = normalize(prefix, relResourceName);
                  plugin = callDep(prefix);
                }

                //Normalize according
                if (prefix) {
                  if (plugin && plugin.normalize) {
                    name = plugin.normalize(name, makeNormalize(relResourceName));
                  } else {
                    name = normalize(name, relResourceName);
                  }
                } else {
                  name = normalize(name, relResourceName);
                  parts = splitPrefix(name);
                  prefix = parts[0];
                  name = parts[1];
                  if (prefix) {
                    plugin = callDep(prefix);
                  }
                }

                //Using ridiculous property names for space reasons
                return {
                  f: prefix ? prefix + '!' + name : name,
                  //fullName
                  n: name,
                  pr: prefix,
                  p: plugin
                };
              };
              function makeConfig(name) {
                return function () {
                  return config && config.config && config.config[name] || {};
                };
              }
              handlers = {
                require: function (name) {
                  return makeRequire(name);
                },
                exports: function (name) {
                  var e = defined[name];
                  if (typeof e !== 'undefined') {
                    return e;
                  } else {
                    return defined[name] = {};
                  }
                },
                module: function (name) {
                  return {
                    id: name,
                    uri: '',
                    exports: defined[name],
                    config: makeConfig(name)
                  };
                }
              };
              main = function (name, deps, callback, relName) {
                var cjsModule,
                  depName,
                  ret,
                  map,
                  i,
                  relParts,
                  args = [],
                  callbackType = typeof callback,
                  usingExports;

                //Use name if no relName
                relName = relName || name;
                relParts = makeRelParts(relName);

                //Call the callback to define the module, if necessary.
                if (callbackType === 'undefined' || callbackType === 'function') {
                  //Pull out the defined dependencies and pass the ordered
                  //values to the callback.
                  //Default to [require, exports, module] if no deps
                  deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
                  for (i = 0; i < deps.length; i += 1) {
                    map = makeMap(deps[i], relParts);
                    depName = map.f;

                    //Fast path CommonJS standard dependencies.
                    if (depName === "require") {
                      args[i] = handlers.require(name);
                    } else if (depName === "exports") {
                      //CommonJS module spec 1.1
                      args[i] = handlers.exports(name);
                      usingExports = true;
                    } else if (depName === "module") {
                      //CommonJS module spec 1.1
                      cjsModule = args[i] = handlers.module(name);
                    } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
                      args[i] = callDep(depName);
                    } else if (map.p) {
                      map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                      args[i] = defined[depName];
                    } else {
                      throw new Error(name + ' missing ' + depName);
                    }
                  }
                  ret = callback ? callback.apply(defined[name], args) : undefined;
                  if (name) {
                    //If setting exports via "module" is in play,
                    //favor that over return value and exports. After that,
                    //favor a non-undefined return value over exports use.
                    if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                      defined[name] = cjsModule.exports;
                    } else if (ret !== undef || !usingExports) {
                      //Use the return value from the function.
                      defined[name] = ret;
                    }
                  }
                } else if (name) {
                  //May just be an object definition for the module. Only
                  //worry about defining if have a module name.
                  defined[name] = callback;
                }
              };
              requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
                if (typeof deps === "string") {
                  if (handlers[deps]) {
                    //callback in this case is really relName
                    return handlers[deps](callback);
                  }
                  //Just return the module wanted. In this scenario, the
                  //deps arg is the module name, and second arg (if passed)
                  //is just the relName.
                  //Normalize module name, if it contains . or ..
                  return callDep(makeMap(deps, makeRelParts(callback)).f);
                } else if (!deps.splice) {
                  //deps is a config object, not an array.
                  config = deps;
                  if (config.deps) {
                    req(config.deps, config.callback);
                  }
                  if (!callback) {
                    return;
                  }
                  if (callback.splice) {
                    //callback is an array, which means it is a dependency list.
                    //Adjust args if there are dependencies
                    deps = callback;
                    callback = relName;
                    relName = null;
                  } else {
                    deps = undef;
                  }
                }

                //Support require(['a'])
                callback = callback || function () {};

                //If relName is a function, it is an errback handler,
                //so remove it.
                if (typeof relName === 'function') {
                  relName = forceSync;
                  forceSync = alt;
                }

                //Simulate async callback;
                if (forceSync) {
                  main(undef, deps, callback, relName);
                } else {
                  //Using a non-zero value because of concern for what old browsers
                  //do, and latest browsers "upgrade" to 4 if lower value is used:
                  //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
                  //If want a value immediately, use require('id') instead -- something
                  //that works in almond on the global level, but not guaranteed and
                  //unlikely to work in other AMD implementations.
                  setTimeout(function () {
                    main(undef, deps, callback, relName);
                  }, 4);
                }
                return req;
              };

              /**
               * Just drops the config on the floor, but returns req in case
               * the config return value is used.
               */
              req.config = function (cfg) {
                return req(cfg);
              };

              /**
               * Expose module registry for debugging and tooling
               */
              requirejs._defined = defined;
              define = function (name, deps, callback) {
                if (typeof name !== 'string') {
                  throw new Error('See almond README: incorrect module build, no module name');
                }

                //This module may not have dependencies
                if (!deps.splice) {
                  //deps is not an array, so probably means
                  //an object literal or factory function for
                  //the value. Adjust args.
                  callback = deps;
                  deps = [];
                }
                if (!hasProp(defined, name) && !hasProp(waiting, name)) {
                  waiting[name] = [name, deps, callback];
                }
              };
              define.amd = {
                jQuery: true
              };
            })();
            S2.requirejs = requirejs;
            S2.require = require;
            S2.define = define;
          }
        })();
        S2.define("almond", function () {});

        /* global jQuery:false, $:false */
        S2.define('jquery', [], function () {
          var _$ = jQuery || $;
          if (_$ == null && console && console.error) {
            console.error('Select2: An instance of jQuery or a jQuery-compatible library was not ' + 'found. Make sure that you are including jQuery before Select2 on your ' + 'web page.');
          }
          return _$;
        });
        S2.define('select2/utils', ['jquery'], function ($) {
          var Utils = {};
          Utils.Extend = function (ChildClass, SuperClass) {
            var __hasProp = {}.hasOwnProperty;
            function BaseConstructor() {
              this.constructor = ChildClass;
            }
            for (var key in SuperClass) {
              if (__hasProp.call(SuperClass, key)) {
                ChildClass[key] = SuperClass[key];
              }
            }
            BaseConstructor.prototype = SuperClass.prototype;
            ChildClass.prototype = new BaseConstructor();
            ChildClass.__super__ = SuperClass.prototype;
            return ChildClass;
          };
          function getMethods(theClass) {
            var proto = theClass.prototype;
            var methods = [];
            for (var methodName in proto) {
              var m = proto[methodName];
              if (typeof m !== 'function') {
                continue;
              }
              if (methodName === 'constructor') {
                continue;
              }
              methods.push(methodName);
            }
            return methods;
          }
          Utils.Decorate = function (SuperClass, DecoratorClass) {
            var decoratedMethods = getMethods(DecoratorClass);
            var superMethods = getMethods(SuperClass);
            function DecoratedClass() {
              var unshift = Array.prototype.unshift;
              var argCount = DecoratorClass.prototype.constructor.length;
              var calledConstructor = SuperClass.prototype.constructor;
              if (argCount > 0) {
                unshift.call(arguments, SuperClass.prototype.constructor);
                calledConstructor = DecoratorClass.prototype.constructor;
              }
              calledConstructor.apply(this, arguments);
            }
            DecoratorClass.displayName = SuperClass.displayName;
            function ctr() {
              this.constructor = DecoratedClass;
            }
            DecoratedClass.prototype = new ctr();
            for (var m = 0; m < superMethods.length; m++) {
              var superMethod = superMethods[m];
              DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
            }
            var calledMethod = function (methodName) {
              // Stub out the original method if it's not decorating an actual method
              var originalMethod = function () {};
              if (methodName in DecoratedClass.prototype) {
                originalMethod = DecoratedClass.prototype[methodName];
              }
              var decoratedMethod = DecoratorClass.prototype[methodName];
              return function () {
                var unshift = Array.prototype.unshift;
                unshift.call(arguments, originalMethod);
                return decoratedMethod.apply(this, arguments);
              };
            };
            for (var d = 0; d < decoratedMethods.length; d++) {
              var decoratedMethod = decoratedMethods[d];
              DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
            }
            return DecoratedClass;
          };
          var Observable = function () {
            this.listeners = {};
          };
          Observable.prototype.on = function (event, callback) {
            this.listeners = this.listeners || {};
            if (event in this.listeners) {
              this.listeners[event].push(callback);
            } else {
              this.listeners[event] = [callback];
            }
          };
          Observable.prototype.trigger = function (event) {
            var slice = Array.prototype.slice;
            var params = slice.call(arguments, 1);
            this.listeners = this.listeners || {};

            // Params should always come in as an array
            if (params == null) {
              params = [];
            }

            // If there are no arguments to the event, use a temporary object
            if (params.length === 0) {
              params.push({});
            }

            // Set the `_type` of the first object to the event
            params[0]._type = event;
            if (event in this.listeners) {
              this.invoke(this.listeners[event], slice.call(arguments, 1));
            }
            if ('*' in this.listeners) {
              this.invoke(this.listeners['*'], arguments);
            }
          };
          Observable.prototype.invoke = function (listeners, params) {
            for (var i = 0, len = listeners.length; i < len; i++) {
              listeners[i].apply(this, params);
            }
          };
          Utils.Observable = Observable;
          Utils.generateChars = function (length) {
            var chars = '';
            for (var i = 0; i < length; i++) {
              var randomChar = Math.floor(Math.random() * 36);
              chars += randomChar.toString(36);
            }
            return chars;
          };
          Utils.bind = function (func, context) {
            return function () {
              func.apply(context, arguments);
            };
          };
          Utils._convertData = function (data) {
            for (var originalKey in data) {
              var keys = originalKey.split('-');
              var dataLevel = data;
              if (keys.length === 1) {
                continue;
              }
              for (var k = 0; k < keys.length; k++) {
                var key = keys[k];

                // Lowercase the first letter
                // By default, dash-separated becomes camelCase
                key = key.substring(0, 1).toLowerCase() + key.substring(1);
                if (!(key in dataLevel)) {
                  dataLevel[key] = {};
                }
                if (k == keys.length - 1) {
                  dataLevel[key] = data[originalKey];
                }
                dataLevel = dataLevel[key];
              }
              delete data[originalKey];
            }
            return data;
          };
          Utils.hasScroll = function (index, el) {
            // Adapted from the function created by @ShadowScripter
            // and adapted by @BillBarry on the Stack Exchange Code Review website.
            // The original code can be found at
            // http://codereview.stackexchange.com/q/13338
            // and was designed to be used with the Sizzle selector engine.

            var $el = $(el);
            var overflowX = el.style.overflowX;
            var overflowY = el.style.overflowY;

            //Check both x and y declarations
            if (overflowX === overflowY && (overflowY === 'hidden' || overflowY === 'visible')) {
              return false;
            }
            if (overflowX === 'scroll' || overflowY === 'scroll') {
              return true;
            }
            return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
          };
          Utils.escapeMarkup = function (markup) {
            var replaceMap = {
              '\\': '&#92;',
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              '\'': '&#39;',
              '/': '&#47;'
            };

            // Do not try to escape the markup if it's not a string
            if (typeof markup !== 'string') {
              return markup;
            }
            return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
              return replaceMap[match];
            });
          };

          // Cache objects in Utils.__cache instead of $.data (see #4346)
          Utils.__cache = {};
          var id = 0;
          Utils.GetUniqueElementId = function (element) {
            // Get a unique element Id. If element has no id,
            // creates a new unique number, stores it in the id
            // attribute and returns the new id with a prefix.
            // If an id already exists, it simply returns it with a prefix.

            var select2Id = element.getAttribute('data-select2-id');
            if (select2Id != null) {
              return select2Id;
            }

            // If element has id, use it.
            if (element.id) {
              select2Id = 'select2-data-' + element.id;
            } else {
              select2Id = 'select2-data-' + (++id).toString() + '-' + Utils.generateChars(4);
            }
            element.setAttribute('data-select2-id', select2Id);
            return select2Id;
          };
          Utils.StoreData = function (element, name, value) {
            // Stores an item in the cache for a specified element.
            // name is the cache key.
            var id = Utils.GetUniqueElementId(element);
            if (!Utils.__cache[id]) {
              Utils.__cache[id] = {};
            }
            Utils.__cache[id][name] = value;
          };
          Utils.GetData = function (element, name) {
            // Retrieves a value from the cache by its key (name)
            // name is optional. If no name specified, return
            // all cache items for the specified element.
            // and for a specified element.
            var id = Utils.GetUniqueElementId(element);
            if (name) {
              if (Utils.__cache[id]) {
                if (Utils.__cache[id][name] != null) {
                  return Utils.__cache[id][name];
                }
                return $(element).data(name); // Fallback to HTML5 data attribs.
              }
              return $(element).data(name); // Fallback to HTML5 data attribs.
            } else {
              return Utils.__cache[id];
            }
          };
          Utils.RemoveData = function (element) {
            // Removes all cached items for a specified element.
            var id = Utils.GetUniqueElementId(element);
            if (Utils.__cache[id] != null) {
              delete Utils.__cache[id];
            }
            element.removeAttribute('data-select2-id');
          };
          Utils.copyNonInternalCssClasses = function (dest, src) {
            var destinationClasses = dest.getAttribute('class').trim().split(/\s+/);
            destinationClasses = destinationClasses.filter(function (clazz) {
              // Save all Select2 classes
              return clazz.indexOf('select2-') === 0;
            });
            var sourceClasses = src.getAttribute('class').trim().split(/\s+/);
            sourceClasses = sourceClasses.filter(function (clazz) {
              // Only copy non-Select2 classes
              return clazz.indexOf('select2-') !== 0;
            });
            var replacements = destinationClasses.concat(sourceClasses);
            dest.setAttribute('class', replacements.join(' '));
          };
          return Utils;
        });
        S2.define('select2/results', ['jquery', './utils'], function ($, Utils) {
          function Results($element, options, dataAdapter) {
            this.$element = $element;
            this.data = dataAdapter;
            this.options = options;
            Results.__super__.constructor.call(this);
          }
          Utils.Extend(Results, Utils.Observable);
          Results.prototype.render = function () {
            var $results = $('<ul class="select2-results__options" role="listbox"></ul>');
            if (this.options.get('multiple')) {
              $results.attr('aria-multiselectable', 'true');
            }
            this.$results = $results;
            return $results;
          };
          Results.prototype.clear = function () {
            this.$results.empty();
          };
          Results.prototype.displayMessage = function (params) {
            var escapeMarkup = this.options.get('escapeMarkup');
            this.clear();
            this.hideLoading();
            var $message = $('<li role="alert" aria-live="assertive"' + ' class="select2-results__option"></li>');
            var message = this.options.get('translations').get(params.message);
            $message.append(escapeMarkup(message(params.args)));
            $message[0].className += ' select2-results__message';
            this.$results.append($message);
          };
          Results.prototype.hideMessages = function () {
            this.$results.find('.select2-results__message').remove();
          };
          Results.prototype.append = function (data) {
            this.hideLoading();
            var $options = [];
            if (data.results == null || data.results.length === 0) {
              if (this.$results.children().length === 0) {
                this.trigger('results:message', {
                  message: 'noResults'
                });
              }
              return;
            }
            data.results = this.sort(data.results);
            for (var d = 0; d < data.results.length; d++) {
              var item = data.results[d];
              var $option = this.option(item);
              $options.push($option);
            }
            this.$results.append($options);
          };
          Results.prototype.position = function ($results, $dropdown) {
            var $resultsContainer = $dropdown.find('.select2-results');
            $resultsContainer.append($results);
          };
          Results.prototype.sort = function (data) {
            var sorter = this.options.get('sorter');
            return sorter(data);
          };
          Results.prototype.highlightFirstItem = function () {
            var $options = this.$results.find('.select2-results__option--selectable');
            var $selected = $options.filter('.select2-results__option--selected');

            // Check if there are any selected options
            if ($selected.length > 0) {
              // If there are selected options, highlight the first
              $selected.first().trigger('mouseenter');
            } else {
              // If there are no selected options, highlight the first option
              // in the dropdown
              $options.first().trigger('mouseenter');
            }
            this.ensureHighlightVisible();
          };
          Results.prototype.setClasses = function () {
            var self = this;
            this.data.current(function (selected) {
              var selectedIds = selected.map(function (s) {
                return s.id.toString();
              });
              var $options = self.$results.find('.select2-results__option--selectable');
              $options.each(function () {
                var $option = $(this);
                var item = Utils.GetData(this, 'data');

                // id needs to be converted to a string when comparing
                var id = '' + item.id;
                if (item.element != null && item.element.selected || item.element == null && selectedIds.indexOf(id) > -1) {
                  this.classList.add('select2-results__option--selected');
                  $option.attr('aria-selected', 'true');
                } else {
                  this.classList.remove('select2-results__option--selected');
                  $option.attr('aria-selected', 'false');
                }
              });
            });
          };
          Results.prototype.showLoading = function (params) {
            this.hideLoading();
            var loadingMore = this.options.get('translations').get('searching');
            var loading = {
              disabled: true,
              loading: true,
              text: loadingMore(params)
            };
            var $loading = this.option(loading);
            $loading.className += ' loading-results';
            this.$results.prepend($loading);
          };
          Results.prototype.hideLoading = function () {
            this.$results.find('.loading-results').remove();
          };
          Results.prototype.option = function (data) {
            var option = document.createElement('li');
            option.classList.add('select2-results__option');
            option.classList.add('select2-results__option--selectable');
            var attrs = {
              'role': 'option'
            };
            var matches = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
            if (data.element != null && matches.call(data.element, ':disabled') || data.element == null && data.disabled) {
              attrs['aria-disabled'] = 'true';
              option.classList.remove('select2-results__option--selectable');
              option.classList.add('select2-results__option--disabled');
            }
            if (data.id == null) {
              option.classList.remove('select2-results__option--selectable');
            }
            if (data._resultId != null) {
              option.id = data._resultId;
            }
            if (data.title) {
              option.title = data.title;
            }
            if (data.children) {
              attrs.role = 'group';
              attrs['aria-label'] = data.text;
              option.classList.remove('select2-results__option--selectable');
              option.classList.add('select2-results__option--group');
            }
            for (var attr in attrs) {
              var val = attrs[attr];
              option.setAttribute(attr, val);
            }
            if (data.children) {
              var $option = $(option);
              var label = document.createElement('strong');
              label.className = 'select2-results__group';
              this.template(data, label);
              var $children = [];
              for (var c = 0; c < data.children.length; c++) {
                var child = data.children[c];
                var $child = this.option(child);
                $children.push($child);
              }
              var $childrenContainer = $('<ul></ul>', {
                'class': 'select2-results__options select2-results__options--nested',
                'role': 'none'
              });
              $childrenContainer.append($children);
              $option.append(label);
              $option.append($childrenContainer);
            } else {
              this.template(data, option);
            }
            Utils.StoreData(option, 'data', data);
            return option;
          };
          Results.prototype.bind = function (container, $container) {
            var self = this;
            var id = container.id + '-results';
            this.$results.attr('id', id);
            container.on('results:all', function (params) {
              self.clear();
              self.append(params.data);
              if (container.isOpen()) {
                self.setClasses();
                self.highlightFirstItem();
              }
            });
            container.on('results:append', function (params) {
              self.append(params.data);
              if (container.isOpen()) {
                self.setClasses();
              }
            });
            container.on('query', function (params) {
              self.hideMessages();
              self.showLoading(params);
            });
            container.on('select', function () {
              if (!container.isOpen()) {
                return;
              }
              self.setClasses();
              if (self.options.get('scrollAfterSelect')) {
                self.highlightFirstItem();
              }
            });
            container.on('unselect', function () {
              if (!container.isOpen()) {
                return;
              }
              self.setClasses();
              if (self.options.get('scrollAfterSelect')) {
                self.highlightFirstItem();
              }
            });
            container.on('open', function () {
              // When the dropdown is open, aria-expended="true"
              self.$results.attr('aria-expanded', 'true');
              self.$results.attr('aria-hidden', 'false');
              self.setClasses();
              self.ensureHighlightVisible();
            });
            container.on('close', function () {
              // When the dropdown is closed, aria-expended="false"
              self.$results.attr('aria-expanded', 'false');
              self.$results.attr('aria-hidden', 'true');
              self.$results.removeAttr('aria-activedescendant');
            });
            container.on('results:toggle', function () {
              var $highlighted = self.getHighlightedResults();
              if ($highlighted.length === 0) {
                return;
              }
              $highlighted.trigger('mouseup');
            });
            container.on('results:select', function () {
              var $highlighted = self.getHighlightedResults();
              if ($highlighted.length === 0) {
                return;
              }
              var data = Utils.GetData($highlighted[0], 'data');
              if ($highlighted.hasClass('select2-results__option--selected')) {
                self.trigger('close', {});
              } else {
                self.trigger('select', {
                  data: data
                });
              }
            });
            container.on('results:previous', function () {
              var $highlighted = self.getHighlightedResults();
              var $options = self.$results.find('.select2-results__option--selectable');
              var currentIndex = $options.index($highlighted);

              // If we are already at the top, don't move further
              // If no options, currentIndex will be -1
              if (currentIndex <= 0) {
                return;
              }
              var nextIndex = currentIndex - 1;

              // If none are highlighted, highlight the first
              if ($highlighted.length === 0) {
                nextIndex = 0;
              }
              var $next = $options.eq(nextIndex);
              $next.trigger('mouseenter');
              var currentOffset = self.$results.offset().top;
              var nextTop = $next.offset().top;
              var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);
              if (nextIndex === 0) {
                self.$results.scrollTop(0);
              } else if (nextTop - currentOffset < 0) {
                self.$results.scrollTop(nextOffset);
              }
            });
            container.on('results:next', function () {
              var $highlighted = self.getHighlightedResults();
              var $options = self.$results.find('.select2-results__option--selectable');
              var currentIndex = $options.index($highlighted);
              var nextIndex = currentIndex + 1;

              // If we are at the last option, stay there
              if (nextIndex >= $options.length) {
                return;
              }
              var $next = $options.eq(nextIndex);
              $next.trigger('mouseenter');
              var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
              var nextBottom = $next.offset().top + $next.outerHeight(false);
              var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;
              if (nextIndex === 0) {
                self.$results.scrollTop(0);
              } else if (nextBottom > currentOffset) {
                self.$results.scrollTop(nextOffset);
              }
            });
            container.on('results:focus', function (params) {
              params.element[0].classList.add('select2-results__option--highlighted');
              params.element[0].setAttribute('aria-selected', 'true');
            });
            container.on('results:message', function (params) {
              self.displayMessage(params);
            });
            if ($.fn.mousewheel) {
              this.$results.on('mousewheel', function (e) {
                var top = self.$results.scrollTop();
                var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;
                var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
                var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();
                if (isAtTop) {
                  self.$results.scrollTop(0);
                  e.preventDefault();
                  e.stopPropagation();
                } else if (isAtBottom) {
                  self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());
                  e.preventDefault();
                  e.stopPropagation();
                }
              });
            }
            this.$results.on('mouseup', '.select2-results__option--selectable', function (evt) {
              var $this = $(this);
              var data = Utils.GetData(this, 'data');
              if ($this.hasClass('select2-results__option--selected')) {
                if (self.options.get('multiple')) {
                  self.trigger('unselect', {
                    originalEvent: evt,
                    data: data
                  });
                } else {
                  self.trigger('close', {});
                }
                return;
              }
              self.trigger('select', {
                originalEvent: evt,
                data: data
              });
            });
            this.$results.on('mouseenter', '.select2-results__option--selectable', function (evt) {
              var data = Utils.GetData(this, 'data');
              self.getHighlightedResults().removeClass('select2-results__option--highlighted').attr('aria-selected', 'false');
              self.trigger('results:focus', {
                data: data,
                element: $(this)
              });
            });
          };
          Results.prototype.getHighlightedResults = function () {
            var $highlighted = this.$results.find('.select2-results__option--highlighted');
            return $highlighted;
          };
          Results.prototype.destroy = function () {
            this.$results.remove();
          };
          Results.prototype.ensureHighlightVisible = function () {
            var $highlighted = this.getHighlightedResults();
            if ($highlighted.length === 0) {
              return;
            }
            var $options = this.$results.find('.select2-results__option--selectable');
            var currentIndex = $options.index($highlighted);
            var currentOffset = this.$results.offset().top;
            var nextTop = $highlighted.offset().top;
            var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);
            var offsetDelta = nextTop - currentOffset;
            nextOffset -= $highlighted.outerHeight(false) * 2;
            if (currentIndex <= 2) {
              this.$results.scrollTop(0);
            } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
              this.$results.scrollTop(nextOffset);
            }
          };
          Results.prototype.template = function (result, container) {
            var template = this.options.get('templateResult');
            var escapeMarkup = this.options.get('escapeMarkup');
            var content = template(result, container);
            if (content == null) {
              container.style.display = 'none';
            } else if (typeof content === 'string') {
              container.innerHTML = escapeMarkup(content);
            } else {
              $(container).append(content);
            }
          };
          return Results;
        });
        S2.define('select2/keys', [], function () {
          var KEYS = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46
          };
          return KEYS;
        });
        S2.define('select2/selection/base', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
          function BaseSelection($element, options) {
            this.$element = $element;
            this.options = options;
            BaseSelection.__super__.constructor.call(this);
          }
          Utils.Extend(BaseSelection, Utils.Observable);
          BaseSelection.prototype.render = function () {
            var $selection = $('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + '</span>');
            this._tabindex = 0;
            if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
              this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
            } else if (this.$element.attr('tabindex') != null) {
              this._tabindex = this.$element.attr('tabindex');
            }
            $selection.attr('title', this.$element.attr('title'));
            $selection.attr('tabindex', this._tabindex);
            $selection.attr('aria-disabled', 'false');
            this.$selection = $selection;
            return $selection;
          };
          BaseSelection.prototype.bind = function (container, $container) {
            var self = this;
            var resultsId = container.id + '-results';
            this.container = container;
            this.$selection.on('focus', function (evt) {
              self.trigger('focus', evt);
            });
            this.$selection.on('blur', function (evt) {
              self._handleBlur(evt);
            });
            this.$selection.on('keydown', function (evt) {
              self.trigger('keypress', evt);
              if (evt.which === KEYS.SPACE) {
                evt.preventDefault();
              }
            });
            container.on('results:focus', function (params) {
              self.$selection.attr('aria-activedescendant', params.data._resultId);
            });
            container.on('selection:update', function (params) {
              self.update(params.data);
            });
            container.on('open', function () {
              // When the dropdown is open, aria-expanded="true"
              self.$selection.attr('aria-expanded', 'true');
              self.$selection.attr('aria-owns', resultsId);
              self._attachCloseHandler(container);
            });
            container.on('close', function () {
              // When the dropdown is closed, aria-expanded="false"
              self.$selection.attr('aria-expanded', 'false');
              self.$selection.removeAttr('aria-activedescendant');
              self.$selection.removeAttr('aria-owns');
              self.$selection.trigger('focus');
              self._detachCloseHandler(container);
            });
            container.on('enable', function () {
              self.$selection.attr('tabindex', self._tabindex);
              self.$selection.attr('aria-disabled', 'false');
            });
            container.on('disable', function () {
              self.$selection.attr('tabindex', '-1');
              self.$selection.attr('aria-disabled', 'true');
            });
          };
          BaseSelection.prototype._handleBlur = function (evt) {
            var self = this;

            // This needs to be delayed as the active element is the body when the tab
            // key is pressed, possibly along with others.
            window.setTimeout(function () {
              // Don't trigger `blur` if the focus is still in the selection
              if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
                return;
              }
              self.trigger('blur', evt);
            }, 1);
          };
          BaseSelection.prototype._attachCloseHandler = function (container) {
            $(document.body).on('mousedown.select2.' + container.id, function (e) {
              var $target = $(e.target);
              var $select = $target.closest('.select2');
              var $all = $('.select2.select2-container--open');
              $all.each(function () {
                if (this == $select[0]) {
                  return;
                }
                var $element = Utils.GetData(this, 'element');
                $element.select2('close');
              });
            });
          };
          BaseSelection.prototype._detachCloseHandler = function (container) {
            $(document.body).off('mousedown.select2.' + container.id);
          };
          BaseSelection.prototype.position = function ($selection, $container) {
            var $selectionContainer = $container.find('.selection');
            $selectionContainer.append($selection);
          };
          BaseSelection.prototype.destroy = function () {
            this._detachCloseHandler(this.container);
          };
          BaseSelection.prototype.update = function (data) {
            throw new Error('The `update` method must be defined in child classes.');
          };

          /**
           * Helper method to abstract the "enabled" (not "disabled") state of this
           * object.
           *
           * @return {true} if the instance is not disabled.
           * @return {false} if the instance is disabled.
           */
          BaseSelection.prototype.isEnabled = function () {
            return !this.isDisabled();
          };

          /**
           * Helper method to abstract the "disabled" state of this object.
           *
           * @return {true} if the disabled option is true.
           * @return {false} if the disabled option is false.
           */
          BaseSelection.prototype.isDisabled = function () {
            return this.options.get('disabled');
          };
          return BaseSelection;
        });
        S2.define('select2/selection/single', ['jquery', './base', '../utils', '../keys'], function ($, BaseSelection, Utils, KEYS) {
          function SingleSelection() {
            SingleSelection.__super__.constructor.apply(this, arguments);
          }
          Utils.Extend(SingleSelection, BaseSelection);
          SingleSelection.prototype.render = function () {
            var $selection = SingleSelection.__super__.render.call(this);
            $selection[0].classList.add('select2-selection--single');
            $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + '</span>');
            return $selection;
          };
          SingleSelection.prototype.bind = function (container, $container) {
            var self = this;
            SingleSelection.__super__.bind.apply(this, arguments);
            var id = container.id + '-container';
            this.$selection.find('.select2-selection__rendered').attr('id', id).attr('role', 'textbox').attr('aria-readonly', 'true');
            this.$selection.attr('aria-labelledby', id);
            this.$selection.attr('aria-controls', id);
            this.$selection.on('mousedown', function (evt) {
              // Only respond to left clicks
              if (evt.which !== 1) {
                return;
              }
              self.trigger('toggle', {
                originalEvent: evt
              });
            });
            this.$selection.on('focus', function (evt) {
              // User focuses on the container
            });
            this.$selection.on('blur', function (evt) {
              // User exits the container
            });
            container.on('focus', function (evt) {
              if (!container.isOpen()) {
                self.$selection.trigger('focus');
              }
            });
          };
          SingleSelection.prototype.clear = function () {
            var $rendered = this.$selection.find('.select2-selection__rendered');
            $rendered.empty();
            $rendered.removeAttr('title'); // clear tooltip on empty
          };
          SingleSelection.prototype.display = function (data, container) {
            var template = this.options.get('templateSelection');
            var escapeMarkup = this.options.get('escapeMarkup');
            return escapeMarkup(template(data, container));
          };
          SingleSelection.prototype.selectionContainer = function () {
            return $('<span></span>');
          };
          SingleSelection.prototype.update = function (data) {
            if (data.length === 0) {
              this.clear();
              return;
            }
            var selection = data[0];
            var $rendered = this.$selection.find('.select2-selection__rendered');
            var formatted = this.display(selection, $rendered);
            $rendered.empty().append(formatted);
            var title = selection.title || selection.text;
            if (title) {
              $rendered.attr('title', title);
            } else {
              $rendered.removeAttr('title');
            }
          };
          return SingleSelection;
        });
        S2.define('select2/selection/multiple', ['jquery', './base', '../utils'], function ($, BaseSelection, Utils) {
          function MultipleSelection($element, options) {
            MultipleSelection.__super__.constructor.apply(this, arguments);
          }
          Utils.Extend(MultipleSelection, BaseSelection);
          MultipleSelection.prototype.render = function () {
            var $selection = MultipleSelection.__super__.render.call(this);
            $selection[0].classList.add('select2-selection--multiple');
            $selection.html('<ul class="select2-selection__rendered"></ul>');
            return $selection;
          };
          MultipleSelection.prototype.bind = function (container, $container) {
            var self = this;
            MultipleSelection.__super__.bind.apply(this, arguments);
            var id = container.id + '-container';
            this.$selection.find('.select2-selection__rendered').attr('id', id);
            this.$selection.on('click', function (evt) {
              self.trigger('toggle', {
                originalEvent: evt
              });
            });
            this.$selection.on('click', '.select2-selection__choice__remove', function (evt) {
              // Ignore the event if it is disabled
              if (self.isDisabled()) {
                return;
              }
              var $remove = $(this);
              var $selection = $remove.parent();
              var data = Utils.GetData($selection[0], 'data');
              self.trigger('unselect', {
                originalEvent: evt,
                data: data
              });
            });
            this.$selection.on('keydown', '.select2-selection__choice__remove', function (evt) {
              // Ignore the event if it is disabled
              if (self.isDisabled()) {
                return;
              }
              evt.stopPropagation();
            });
          };
          MultipleSelection.prototype.clear = function () {
            var $rendered = this.$selection.find('.select2-selection__rendered');
            $rendered.empty();
            $rendered.removeAttr('title');
          };
          MultipleSelection.prototype.display = function (data, container) {
            var template = this.options.get('templateSelection');
            var escapeMarkup = this.options.get('escapeMarkup');
            return escapeMarkup(template(data, container));
          };
          MultipleSelection.prototype.selectionContainer = function () {
            var $container = $('<li class="select2-selection__choice">' + '<button type="button" class="select2-selection__choice__remove" ' + 'tabindex="-1">' + '<span aria-hidden="true">&times;</span>' + '</button>' + '<span class="select2-selection__choice__display"></span>' + '</li>');
            return $container;
          };
          MultipleSelection.prototype.update = function (data) {
            this.clear();
            if (data.length === 0) {
              return;
            }
            var $selections = [];
            var selectionIdPrefix = this.$selection.find('.select2-selection__rendered').attr('id') + '-choice-';
            for (var d = 0; d < data.length; d++) {
              var selection = data[d];
              var $selection = this.selectionContainer();
              var formatted = this.display(selection, $selection);
              var selectionId = selectionIdPrefix + Utils.generateChars(4) + '-';
              if (selection.id) {
                selectionId += selection.id;
              } else {
                selectionId += Utils.generateChars(4);
              }
              $selection.find('.select2-selection__choice__display').append(formatted).attr('id', selectionId);
              var title = selection.title || selection.text;
              if (title) {
                $selection.attr('title', title);
              }
              var removeItem = this.options.get('translations').get('removeItem');
              var $remove = $selection.find('.select2-selection__choice__remove');
              $remove.attr('title', removeItem());
              $remove.attr('aria-label', removeItem());
              $remove.attr('aria-describedby', selectionId);
              Utils.StoreData($selection[0], 'data', selection);
              $selections.push($selection);
            }
            var $rendered = this.$selection.find('.select2-selection__rendered');
            $rendered.append($selections);
          };
          return MultipleSelection;
        });
        S2.define('select2/selection/placeholder', [], function () {
          function Placeholder(decorated, $element, options) {
            this.placeholder = this.normalizePlaceholder(options.get('placeholder'));
            decorated.call(this, $element, options);
          }
          Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
            if (typeof placeholder === 'string') {
              placeholder = {
                id: '',
                text: placeholder
              };
            }
            return placeholder;
          };
          Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
            var $placeholder = this.selectionContainer();
            $placeholder.html(this.display(placeholder));
            $placeholder[0].classList.add('select2-selection__placeholder');
            $placeholder[0].classList.remove('select2-selection__choice');
            var placeholderTitle = placeholder.title || placeholder.text || $placeholder.text();
            this.$selection.find('.select2-selection__rendered').attr('title', placeholderTitle);
            return $placeholder;
          };
          Placeholder.prototype.update = function (decorated, data) {
            var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
            var multipleSelections = data.length > 1;
            if (multipleSelections || singlePlaceholder) {
              return decorated.call(this, data);
            }
            this.clear();
            var $placeholder = this.createPlaceholder(this.placeholder);
            this.$selection.find('.select2-selection__rendered').append($placeholder);
          };
          return Placeholder;
        });
        S2.define('select2/selection/allowClear', ['jquery', '../keys', '../utils'], function ($, KEYS, Utils) {
          function AllowClear() {}
          AllowClear.prototype.bind = function (decorated, container, $container) {
            var self = this;
            decorated.call(this, container, $container);
            if (this.placeholder == null) {
              if (this.options.get('debug') && window.console && console.error) {
                console.error('Select2: The `allowClear` option should be used in combination ' + 'with the `placeholder` option.');
              }
            }
            this.$selection.on('mousedown', '.select2-selection__clear', function (evt) {
              self._handleClear(evt);
            });
            container.on('keypress', function (evt) {
              self._handleKeyboardClear(evt, container);
            });
          };
          AllowClear.prototype._handleClear = function (_, evt) {
            // Ignore the event if it is disabled
            if (this.isDisabled()) {
              return;
            }
            var $clear = this.$selection.find('.select2-selection__clear');

            // Ignore the event if nothing has been selected
            if ($clear.length === 0) {
              return;
            }
            evt.stopPropagation();
            var data = Utils.GetData($clear[0], 'data');
            var previousVal = this.$element.val();
            this.$element.val(this.placeholder.id);
            var unselectData = {
              data: data
            };
            this.trigger('clear', unselectData);
            if (unselectData.prevented) {
              this.$element.val(previousVal);
              return;
            }
            for (var d = 0; d < data.length; d++) {
              unselectData = {
                data: data[d]
              };

              // Trigger the `unselect` event, so people can prevent it from being
              // cleared.
              this.trigger('unselect', unselectData);

              // If the event was prevented, don't clear it out.
              if (unselectData.prevented) {
                this.$element.val(previousVal);
                return;
              }
            }
            this.$element.trigger('input').trigger('change');
            this.trigger('toggle', {});
          };
          AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
            if (container.isOpen()) {
              return;
            }
            if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
              this._handleClear(evt);
            }
          };
          AllowClear.prototype.update = function (decorated, data) {
            decorated.call(this, data);
            this.$selection.find('.select2-selection__clear').remove();
            this.$selection[0].classList.remove('select2-selection--clearable');
            if (this.$selection.find('.select2-selection__placeholder').length > 0 || data.length === 0) {
              return;
            }
            var selectionId = this.$selection.find('.select2-selection__rendered').attr('id');
            var removeAll = this.options.get('translations').get('removeAllItems');
            var $remove = $('<button type="button" class="select2-selection__clear" tabindex="-1">' + '<span aria-hidden="true">&times;</span>' + '</button>');
            $remove.attr('title', removeAll());
            $remove.attr('aria-label', removeAll());
            $remove.attr('aria-describedby', selectionId);
            Utils.StoreData($remove[0], 'data', data);
            this.$selection.prepend($remove);
            this.$selection[0].classList.add('select2-selection--clearable');
          };
          return AllowClear;
        });
        S2.define('select2/selection/search', ['jquery', '../utils', '../keys'], function ($, Utils, KEYS) {
          function Search(decorated, $element, options) {
            decorated.call(this, $element, options);
          }
          Search.prototype.render = function (decorated) {
            var searchLabel = this.options.get('translations').get('search');
            var $search = $('<span class="select2-search select2-search--inline">' + '<textarea class="select2-search__field"' + ' type="search" tabindex="-1"' + ' autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="searchbox" aria-autocomplete="list" >' + '</textarea>' + '</span>');
            this.$searchContainer = $search;
            this.$search = $search.find('textarea');
            this.$search.prop('autocomplete', this.options.get('autocomplete'));
            this.$search.attr('aria-label', searchLabel());
            var $rendered = decorated.call(this);
            this._transferTabIndex();
            $rendered.append(this.$searchContainer);
            return $rendered;
          };
          Search.prototype.bind = function (decorated, container, $container) {
            var self = this;
            var resultsId = container.id + '-results';
            var selectionId = container.id + '-container';
            decorated.call(this, container, $container);
            self.$search.attr('aria-describedby', selectionId);
            container.on('open', function () {
              self.$search.attr('aria-controls', resultsId);
              self.$search.trigger('focus');
            });
            container.on('close', function () {
              self.$search.val('');
              self.resizeSearch();
              self.$search.removeAttr('aria-controls');
              self.$search.removeAttr('aria-activedescendant');
              self.$search.trigger('focus');
            });
            container.on('enable', function () {
              self.$search.prop('disabled', false);
              self._transferTabIndex();
            });
            container.on('disable', function () {
              self.$search.prop('disabled', true);
            });
            container.on('focus', function (evt) {
              self.$search.trigger('focus');
            });
            container.on('results:focus', function (params) {
              if (params.data._resultId) {
                self.$search.attr('aria-activedescendant', params.data._resultId);
              } else {
                self.$search.removeAttr('aria-activedescendant');
              }
            });
            this.$selection.on('focusin', '.select2-search--inline', function (evt) {
              self.trigger('focus', evt);
            });
            this.$selection.on('focusout', '.select2-search--inline', function (evt) {
              self._handleBlur(evt);
            });
            this.$selection.on('keydown', '.select2-search--inline', function (evt) {
              evt.stopPropagation();
              self.trigger('keypress', evt);
              self._keyUpPrevented = evt.isDefaultPrevented();
              var key = evt.which;
              if (key === KEYS.BACKSPACE && self.$search.val() === '') {
                var $previousChoice = self.$selection.find('.select2-selection__choice').last();
                if ($previousChoice.length > 0) {
                  var item = Utils.GetData($previousChoice[0], 'data');
                  self.searchRemoveChoice(item);
                  evt.preventDefault();
                }
              }
            });
            this.$selection.on('click', '.select2-search--inline', function (evt) {
              if (self.$search.val()) {
                evt.stopPropagation();
              }
            });

            // Try to detect the IE version should the `documentMode` property that
            // is stored on the document. This is only implemented in IE and is
            // slightly cleaner than doing a user agent check.
            // This property is not available in Edge, but Edge also doesn't have
            // this bug.
            var msie = document.documentMode;
            var disableInputEvents = msie && msie <= 11;

            // Workaround for browsers which do not support the `input` event
            // This will prevent double-triggering of events for browsers which support
            // both the `keyup` and `input` events.
            this.$selection.on('input.searchcheck', '.select2-search--inline', function (evt) {
              // IE will trigger the `input` event when a placeholder is used on a
              // search box. To get around this issue, we are forced to ignore all
              // `input` events in IE and keep using `keyup`.
              if (disableInputEvents) {
                self.$selection.off('input.search input.searchcheck');
                return;
              }

              // Unbind the duplicated `keyup` event
              self.$selection.off('keyup.search');
            });
            this.$selection.on('keyup.search input.search', '.select2-search--inline', function (evt) {
              // IE will trigger the `input` event when a placeholder is used on a
              // search box. To get around this issue, we are forced to ignore all
              // `input` events in IE and keep using `keyup`.
              if (disableInputEvents && evt.type === 'input') {
                self.$selection.off('input.search input.searchcheck');
                return;
              }
              var key = evt.which;

              // We can freely ignore events from modifier keys
              if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
                return;
              }

              // Tabbing will be handled during the `keydown` phase
              if (key == KEYS.TAB) {
                return;
              }
              self.handleSearch(evt);
            });
          };

          /**
           * This method will transfer the tabindex attribute from the rendered
           * selection to the search box. This allows for the search box to be used as
           * the primary focus instead of the selection container.
           *
           * @private
           */
          Search.prototype._transferTabIndex = function (decorated) {
            this.$search.attr('tabindex', this.$selection.attr('tabindex'));
            this.$selection.attr('tabindex', '-1');
          };
          Search.prototype.createPlaceholder = function (decorated, placeholder) {
            this.$search.attr('placeholder', placeholder.text);
          };
          Search.prototype.update = function (decorated, data) {
            var searchHadFocus = this.$search[0] == document.activeElement;
            this.$search.attr('placeholder', '');
            decorated.call(this, data);
            this.resizeSearch();
            if (searchHadFocus) {
              this.$search.trigger('focus');
            }
          };
          Search.prototype.handleSearch = function () {
            this.resizeSearch();
            if (!this._keyUpPrevented) {
              var input = this.$search.val();
              this.trigger('query', {
                term: input
              });
            }
            this._keyUpPrevented = false;
          };
          Search.prototype.searchRemoveChoice = function (decorated, item) {
            this.trigger('unselect', {
              data: item
            });
            this.$search.val(item.text);
            this.handleSearch();
          };
          Search.prototype.resizeSearch = function () {
            this.$search.css('width', '25px');
            var width = '100%';
            if (this.$search.attr('placeholder') === '') {
              var minimumWidth = this.$search.val().length + 1;
              width = minimumWidth * 0.75 + 'em';
            }
            this.$search.css('width', width);
          };
          return Search;
        });
        S2.define('select2/selection/selectionCss', ['../utils'], function (Utils) {
          function SelectionCSS() {}
          SelectionCSS.prototype.render = function (decorated) {
            var $selection = decorated.call(this);
            var selectionCssClass = this.options.get('selectionCssClass') || '';
            if (selectionCssClass.indexOf(':all:') !== -1) {
              selectionCssClass = selectionCssClass.replace(':all:', '');
              Utils.copyNonInternalCssClasses($selection[0], this.$element[0]);
            }
            $selection.addClass(selectionCssClass);
            return $selection;
          };
          return SelectionCSS;
        });
        S2.define('select2/selection/eventRelay', ['jquery'], function ($) {
          function EventRelay() {}
          EventRelay.prototype.bind = function (decorated, container, $container) {
            var self = this;
            var relayEvents = ['open', 'opening', 'close', 'closing', 'select', 'selecting', 'unselect', 'unselecting', 'clear', 'clearing'];
            var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting', 'clearing'];
            decorated.call(this, container, $container);
            container.on('*', function (name, params) {
              // Ignore events that should not be relayed
              if (relayEvents.indexOf(name) === -1) {
                return;
              }

              // The parameters should always be an object
              params = params || {};

              // Generate the jQuery event for the Select2 event
              var evt = $.Event('select2:' + name, {
                params: params
              });
              self.$element.trigger(evt);

              // Only handle preventable events if it was one
              if (preventableEvents.indexOf(name) === -1) {
                return;
              }
              params.prevented = evt.isDefaultPrevented();
            });
          };
          return EventRelay;
        });
        S2.define('select2/translation', ['jquery', 'require'], function ($, require) {
          function Translation(dict) {
            this.dict = dict || {};
          }
          Translation.prototype.all = function () {
            return this.dict;
          };
          Translation.prototype.get = function (key) {
            return this.dict[key];
          };
          Translation.prototype.extend = function (translation) {
            this.dict = $.extend({}, translation.all(), this.dict);
          };

          // Static functions

          Translation._cache = {};
          Translation.loadPath = function (path) {
            if (!(path in Translation._cache)) {
              var translations = require(path);
              Translation._cache[path] = translations;
            }
            return new Translation(Translation._cache[path]);
          };
          return Translation;
        });
        S2.define('select2/diacritics', [], function () {
          var diacritics = {
            '\u24B6': 'A',
            '\uFF21': 'A',
            '\u00C0': 'A',
            '\u00C1': 'A',
            '\u00C2': 'A',
            '\u1EA6': 'A',
            '\u1EA4': 'A',
            '\u1EAA': 'A',
            '\u1EA8': 'A',
            '\u00C3': 'A',
            '\u0100': 'A',
            '\u0102': 'A',
            '\u1EB0': 'A',
            '\u1EAE': 'A',
            '\u1EB4': 'A',
            '\u1EB2': 'A',
            '\u0226': 'A',
            '\u01E0': 'A',
            '\u00C4': 'A',
            '\u01DE': 'A',
            '\u1EA2': 'A',
            '\u00C5': 'A',
            '\u01FA': 'A',
            '\u01CD': 'A',
            '\u0200': 'A',
            '\u0202': 'A',
            '\u1EA0': 'A',
            '\u1EAC': 'A',
            '\u1EB6': 'A',
            '\u1E00': 'A',
            '\u0104': 'A',
            '\u023A': 'A',
            '\u2C6F': 'A',
            '\uA732': 'AA',
            '\u00C6': 'AE',
            '\u01FC': 'AE',
            '\u01E2': 'AE',
            '\uA734': 'AO',
            '\uA736': 'AU',
            '\uA738': 'AV',
            '\uA73A': 'AV',
            '\uA73C': 'AY',
            '\u24B7': 'B',
            '\uFF22': 'B',
            '\u1E02': 'B',
            '\u1E04': 'B',
            '\u1E06': 'B',
            '\u0243': 'B',
            '\u0182': 'B',
            '\u0181': 'B',
            '\u24B8': 'C',
            '\uFF23': 'C',
            '\u0106': 'C',
            '\u0108': 'C',
            '\u010A': 'C',
            '\u010C': 'C',
            '\u00C7': 'C',
            '\u1E08': 'C',
            '\u0187': 'C',
            '\u023B': 'C',
            '\uA73E': 'C',
            '\u24B9': 'D',
            '\uFF24': 'D',
            '\u1E0A': 'D',
            '\u010E': 'D',
            '\u1E0C': 'D',
            '\u1E10': 'D',
            '\u1E12': 'D',
            '\u1E0E': 'D',
            '\u0110': 'D',
            '\u018B': 'D',
            '\u018A': 'D',
            '\u0189': 'D',
            '\uA779': 'D',
            '\u01F1': 'DZ',
            '\u01C4': 'DZ',
            '\u01F2': 'Dz',
            '\u01C5': 'Dz',
            '\u24BA': 'E',
            '\uFF25': 'E',
            '\u00C8': 'E',
            '\u00C9': 'E',
            '\u00CA': 'E',
            '\u1EC0': 'E',
            '\u1EBE': 'E',
            '\u1EC4': 'E',
            '\u1EC2': 'E',
            '\u1EBC': 'E',
            '\u0112': 'E',
            '\u1E14': 'E',
            '\u1E16': 'E',
            '\u0114': 'E',
            '\u0116': 'E',
            '\u00CB': 'E',
            '\u1EBA': 'E',
            '\u011A': 'E',
            '\u0204': 'E',
            '\u0206': 'E',
            '\u1EB8': 'E',
            '\u1EC6': 'E',
            '\u0228': 'E',
            '\u1E1C': 'E',
            '\u0118': 'E',
            '\u1E18': 'E',
            '\u1E1A': 'E',
            '\u0190': 'E',
            '\u018E': 'E',
            '\u24BB': 'F',
            '\uFF26': 'F',
            '\u1E1E': 'F',
            '\u0191': 'F',
            '\uA77B': 'F',
            '\u24BC': 'G',
            '\uFF27': 'G',
            '\u01F4': 'G',
            '\u011C': 'G',
            '\u1E20': 'G',
            '\u011E': 'G',
            '\u0120': 'G',
            '\u01E6': 'G',
            '\u0122': 'G',
            '\u01E4': 'G',
            '\u0193': 'G',
            '\uA7A0': 'G',
            '\uA77D': 'G',
            '\uA77E': 'G',
            '\u24BD': 'H',
            '\uFF28': 'H',
            '\u0124': 'H',
            '\u1E22': 'H',
            '\u1E26': 'H',
            '\u021E': 'H',
            '\u1E24': 'H',
            '\u1E28': 'H',
            '\u1E2A': 'H',
            '\u0126': 'H',
            '\u2C67': 'H',
            '\u2C75': 'H',
            '\uA78D': 'H',
            '\u24BE': 'I',
            '\uFF29': 'I',
            '\u00CC': 'I',
            '\u00CD': 'I',
            '\u00CE': 'I',
            '\u0128': 'I',
            '\u012A': 'I',
            '\u012C': 'I',
            '\u0130': 'I',
            '\u00CF': 'I',
            '\u1E2E': 'I',
            '\u1EC8': 'I',
            '\u01CF': 'I',
            '\u0208': 'I',
            '\u020A': 'I',
            '\u1ECA': 'I',
            '\u012E': 'I',
            '\u1E2C': 'I',
            '\u0197': 'I',
            '\u24BF': 'J',
            '\uFF2A': 'J',
            '\u0134': 'J',
            '\u0248': 'J',
            '\u24C0': 'K',
            '\uFF2B': 'K',
            '\u1E30': 'K',
            '\u01E8': 'K',
            '\u1E32': 'K',
            '\u0136': 'K',
            '\u1E34': 'K',
            '\u0198': 'K',
            '\u2C69': 'K',
            '\uA740': 'K',
            '\uA742': 'K',
            '\uA744': 'K',
            '\uA7A2': 'K',
            '\u24C1': 'L',
            '\uFF2C': 'L',
            '\u013F': 'L',
            '\u0139': 'L',
            '\u013D': 'L',
            '\u1E36': 'L',
            '\u1E38': 'L',
            '\u013B': 'L',
            '\u1E3C': 'L',
            '\u1E3A': 'L',
            '\u0141': 'L',
            '\u023D': 'L',
            '\u2C62': 'L',
            '\u2C60': 'L',
            '\uA748': 'L',
            '\uA746': 'L',
            '\uA780': 'L',
            '\u01C7': 'LJ',
            '\u01C8': 'Lj',
            '\u24C2': 'M',
            '\uFF2D': 'M',
            '\u1E3E': 'M',
            '\u1E40': 'M',
            '\u1E42': 'M',
            '\u2C6E': 'M',
            '\u019C': 'M',
            '\u24C3': 'N',
            '\uFF2E': 'N',
            '\u01F8': 'N',
            '\u0143': 'N',
            '\u00D1': 'N',
            '\u1E44': 'N',
            '\u0147': 'N',
            '\u1E46': 'N',
            '\u0145': 'N',
            '\u1E4A': 'N',
            '\u1E48': 'N',
            '\u0220': 'N',
            '\u019D': 'N',
            '\uA790': 'N',
            '\uA7A4': 'N',
            '\u01CA': 'NJ',
            '\u01CB': 'Nj',
            '\u24C4': 'O',
            '\uFF2F': 'O',
            '\u00D2': 'O',
            '\u00D3': 'O',
            '\u00D4': 'O',
            '\u1ED2': 'O',
            '\u1ED0': 'O',
            '\u1ED6': 'O',
            '\u1ED4': 'O',
            '\u00D5': 'O',
            '\u1E4C': 'O',
            '\u022C': 'O',
            '\u1E4E': 'O',
            '\u014C': 'O',
            '\u1E50': 'O',
            '\u1E52': 'O',
            '\u014E': 'O',
            '\u022E': 'O',
            '\u0230': 'O',
            '\u00D6': 'O',
            '\u022A': 'O',
            '\u1ECE': 'O',
            '\u0150': 'O',
            '\u01D1': 'O',
            '\u020C': 'O',
            '\u020E': 'O',
            '\u01A0': 'O',
            '\u1EDC': 'O',
            '\u1EDA': 'O',
            '\u1EE0': 'O',
            '\u1EDE': 'O',
            '\u1EE2': 'O',
            '\u1ECC': 'O',
            '\u1ED8': 'O',
            '\u01EA': 'O',
            '\u01EC': 'O',
            '\u00D8': 'O',
            '\u01FE': 'O',
            '\u0186': 'O',
            '\u019F': 'O',
            '\uA74A': 'O',
            '\uA74C': 'O',
            '\u0152': 'OE',
            '\u01A2': 'OI',
            '\uA74E': 'OO',
            '\u0222': 'OU',
            '\u24C5': 'P',
            '\uFF30': 'P',
            '\u1E54': 'P',
            '\u1E56': 'P',
            '\u01A4': 'P',
            '\u2C63': 'P',
            '\uA750': 'P',
            '\uA752': 'P',
            '\uA754': 'P',
            '\u24C6': 'Q',
            '\uFF31': 'Q',
            '\uA756': 'Q',
            '\uA758': 'Q',
            '\u024A': 'Q',
            '\u24C7': 'R',
            '\uFF32': 'R',
            '\u0154': 'R',
            '\u1E58': 'R',
            '\u0158': 'R',
            '\u0210': 'R',
            '\u0212': 'R',
            '\u1E5A': 'R',
            '\u1E5C': 'R',
            '\u0156': 'R',
            '\u1E5E': 'R',
            '\u024C': 'R',
            '\u2C64': 'R',
            '\uA75A': 'R',
            '\uA7A6': 'R',
            '\uA782': 'R',
            '\u24C8': 'S',
            '\uFF33': 'S',
            '\u1E9E': 'S',
            '\u015A': 'S',
            '\u1E64': 'S',
            '\u015C': 'S',
            '\u1E60': 'S',
            '\u0160': 'S',
            '\u1E66': 'S',
            '\u1E62': 'S',
            '\u1E68': 'S',
            '\u0218': 'S',
            '\u015E': 'S',
            '\u2C7E': 'S',
            '\uA7A8': 'S',
            '\uA784': 'S',
            '\u24C9': 'T',
            '\uFF34': 'T',
            '\u1E6A': 'T',
            '\u0164': 'T',
            '\u1E6C': 'T',
            '\u021A': 'T',
            '\u0162': 'T',
            '\u1E70': 'T',
            '\u1E6E': 'T',
            '\u0166': 'T',
            '\u01AC': 'T',
            '\u01AE': 'T',
            '\u023E': 'T',
            '\uA786': 'T',
            '\uA728': 'TZ',
            '\u24CA': 'U',
            '\uFF35': 'U',
            '\u00D9': 'U',
            '\u00DA': 'U',
            '\u00DB': 'U',
            '\u0168': 'U',
            '\u1E78': 'U',
            '\u016A': 'U',
            '\u1E7A': 'U',
            '\u016C': 'U',
            '\u00DC': 'U',
            '\u01DB': 'U',
            '\u01D7': 'U',
            '\u01D5': 'U',
            '\u01D9': 'U',
            '\u1EE6': 'U',
            '\u016E': 'U',
            '\u0170': 'U',
            '\u01D3': 'U',
            '\u0214': 'U',
            '\u0216': 'U',
            '\u01AF': 'U',
            '\u1EEA': 'U',
            '\u1EE8': 'U',
            '\u1EEE': 'U',
            '\u1EEC': 'U',
            '\u1EF0': 'U',
            '\u1EE4': 'U',
            '\u1E72': 'U',
            '\u0172': 'U',
            '\u1E76': 'U',
            '\u1E74': 'U',
            '\u0244': 'U',
            '\u24CB': 'V',
            '\uFF36': 'V',
            '\u1E7C': 'V',
            '\u1E7E': 'V',
            '\u01B2': 'V',
            '\uA75E': 'V',
            '\u0245': 'V',
            '\uA760': 'VY',
            '\u24CC': 'W',
            '\uFF37': 'W',
            '\u1E80': 'W',
            '\u1E82': 'W',
            '\u0174': 'W',
            '\u1E86': 'W',
            '\u1E84': 'W',
            '\u1E88': 'W',
            '\u2C72': 'W',
            '\u24CD': 'X',
            '\uFF38': 'X',
            '\u1E8A': 'X',
            '\u1E8C': 'X',
            '\u24CE': 'Y',
            '\uFF39': 'Y',
            '\u1EF2': 'Y',
            '\u00DD': 'Y',
            '\u0176': 'Y',
            '\u1EF8': 'Y',
            '\u0232': 'Y',
            '\u1E8E': 'Y',
            '\u0178': 'Y',
            '\u1EF6': 'Y',
            '\u1EF4': 'Y',
            '\u01B3': 'Y',
            '\u024E': 'Y',
            '\u1EFE': 'Y',
            '\u24CF': 'Z',
            '\uFF3A': 'Z',
            '\u0179': 'Z',
            '\u1E90': 'Z',
            '\u017B': 'Z',
            '\u017D': 'Z',
            '\u1E92': 'Z',
            '\u1E94': 'Z',
            '\u01B5': 'Z',
            '\u0224': 'Z',
            '\u2C7F': 'Z',
            '\u2C6B': 'Z',
            '\uA762': 'Z',
            '\u24D0': 'a',
            '\uFF41': 'a',
            '\u1E9A': 'a',
            '\u00E0': 'a',
            '\u00E1': 'a',
            '\u00E2': 'a',
            '\u1EA7': 'a',
            '\u1EA5': 'a',
            '\u1EAB': 'a',
            '\u1EA9': 'a',
            '\u00E3': 'a',
            '\u0101': 'a',
            '\u0103': 'a',
            '\u1EB1': 'a',
            '\u1EAF': 'a',
            '\u1EB5': 'a',
            '\u1EB3': 'a',
            '\u0227': 'a',
            '\u01E1': 'a',
            '\u00E4': 'a',
            '\u01DF': 'a',
            '\u1EA3': 'a',
            '\u00E5': 'a',
            '\u01FB': 'a',
            '\u01CE': 'a',
            '\u0201': 'a',
            '\u0203': 'a',
            '\u1EA1': 'a',
            '\u1EAD': 'a',
            '\u1EB7': 'a',
            '\u1E01': 'a',
            '\u0105': 'a',
            '\u2C65': 'a',
            '\u0250': 'a',
            '\uA733': 'aa',
            '\u00E6': 'ae',
            '\u01FD': 'ae',
            '\u01E3': 'ae',
            '\uA735': 'ao',
            '\uA737': 'au',
            '\uA739': 'av',
            '\uA73B': 'av',
            '\uA73D': 'ay',
            '\u24D1': 'b',
            '\uFF42': 'b',
            '\u1E03': 'b',
            '\u1E05': 'b',
            '\u1E07': 'b',
            '\u0180': 'b',
            '\u0183': 'b',
            '\u0253': 'b',
            '\u24D2': 'c',
            '\uFF43': 'c',
            '\u0107': 'c',
            '\u0109': 'c',
            '\u010B': 'c',
            '\u010D': 'c',
            '\u00E7': 'c',
            '\u1E09': 'c',
            '\u0188': 'c',
            '\u023C': 'c',
            '\uA73F': 'c',
            '\u2184': 'c',
            '\u24D3': 'd',
            '\uFF44': 'd',
            '\u1E0B': 'd',
            '\u010F': 'd',
            '\u1E0D': 'd',
            '\u1E11': 'd',
            '\u1E13': 'd',
            '\u1E0F': 'd',
            '\u0111': 'd',
            '\u018C': 'd',
            '\u0256': 'd',
            '\u0257': 'd',
            '\uA77A': 'd',
            '\u01F3': 'dz',
            '\u01C6': 'dz',
            '\u24D4': 'e',
            '\uFF45': 'e',
            '\u00E8': 'e',
            '\u00E9': 'e',
            '\u00EA': 'e',
            '\u1EC1': 'e',
            '\u1EBF': 'e',
            '\u1EC5': 'e',
            '\u1EC3': 'e',
            '\u1EBD': 'e',
            '\u0113': 'e',
            '\u1E15': 'e',
            '\u1E17': 'e',
            '\u0115': 'e',
            '\u0117': 'e',
            '\u00EB': 'e',
            '\u1EBB': 'e',
            '\u011B': 'e',
            '\u0205': 'e',
            '\u0207': 'e',
            '\u1EB9': 'e',
            '\u1EC7': 'e',
            '\u0229': 'e',
            '\u1E1D': 'e',
            '\u0119': 'e',
            '\u1E19': 'e',
            '\u1E1B': 'e',
            '\u0247': 'e',
            '\u025B': 'e',
            '\u01DD': 'e',
            '\u24D5': 'f',
            '\uFF46': 'f',
            '\u1E1F': 'f',
            '\u0192': 'f',
            '\uA77C': 'f',
            '\u24D6': 'g',
            '\uFF47': 'g',
            '\u01F5': 'g',
            '\u011D': 'g',
            '\u1E21': 'g',
            '\u011F': 'g',
            '\u0121': 'g',
            '\u01E7': 'g',
            '\u0123': 'g',
            '\u01E5': 'g',
            '\u0260': 'g',
            '\uA7A1': 'g',
            '\u1D79': 'g',
            '\uA77F': 'g',
            '\u24D7': 'h',
            '\uFF48': 'h',
            '\u0125': 'h',
            '\u1E23': 'h',
            '\u1E27': 'h',
            '\u021F': 'h',
            '\u1E25': 'h',
            '\u1E29': 'h',
            '\u1E2B': 'h',
            '\u1E96': 'h',
            '\u0127': 'h',
            '\u2C68': 'h',
            '\u2C76': 'h',
            '\u0265': 'h',
            '\u0195': 'hv',
            '\u24D8': 'i',
            '\uFF49': 'i',
            '\u00EC': 'i',
            '\u00ED': 'i',
            '\u00EE': 'i',
            '\u0129': 'i',
            '\u012B': 'i',
            '\u012D': 'i',
            '\u00EF': 'i',
            '\u1E2F': 'i',
            '\u1EC9': 'i',
            '\u01D0': 'i',
            '\u0209': 'i',
            '\u020B': 'i',
            '\u1ECB': 'i',
            '\u012F': 'i',
            '\u1E2D': 'i',
            '\u0268': 'i',
            '\u0131': 'i',
            '\u24D9': 'j',
            '\uFF4A': 'j',
            '\u0135': 'j',
            '\u01F0': 'j',
            '\u0249': 'j',
            '\u24DA': 'k',
            '\uFF4B': 'k',
            '\u1E31': 'k',
            '\u01E9': 'k',
            '\u1E33': 'k',
            '\u0137': 'k',
            '\u1E35': 'k',
            '\u0199': 'k',
            '\u2C6A': 'k',
            '\uA741': 'k',
            '\uA743': 'k',
            '\uA745': 'k',
            '\uA7A3': 'k',
            '\u24DB': 'l',
            '\uFF4C': 'l',
            '\u0140': 'l',
            '\u013A': 'l',
            '\u013E': 'l',
            '\u1E37': 'l',
            '\u1E39': 'l',
            '\u013C': 'l',
            '\u1E3D': 'l',
            '\u1E3B': 'l',
            '\u017F': 'l',
            '\u0142': 'l',
            '\u019A': 'l',
            '\u026B': 'l',
            '\u2C61': 'l',
            '\uA749': 'l',
            '\uA781': 'l',
            '\uA747': 'l',
            '\u01C9': 'lj',
            '\u24DC': 'm',
            '\uFF4D': 'm',
            '\u1E3F': 'm',
            '\u1E41': 'm',
            '\u1E43': 'm',
            '\u0271': 'm',
            '\u026F': 'm',
            '\u24DD': 'n',
            '\uFF4E': 'n',
            '\u01F9': 'n',
            '\u0144': 'n',
            '\u00F1': 'n',
            '\u1E45': 'n',
            '\u0148': 'n',
            '\u1E47': 'n',
            '\u0146': 'n',
            '\u1E4B': 'n',
            '\u1E49': 'n',
            '\u019E': 'n',
            '\u0272': 'n',
            '\u0149': 'n',
            '\uA791': 'n',
            '\uA7A5': 'n',
            '\u01CC': 'nj',
            '\u24DE': 'o',
            '\uFF4F': 'o',
            '\u00F2': 'o',
            '\u00F3': 'o',
            '\u00F4': 'o',
            '\u1ED3': 'o',
            '\u1ED1': 'o',
            '\u1ED7': 'o',
            '\u1ED5': 'o',
            '\u00F5': 'o',
            '\u1E4D': 'o',
            '\u022D': 'o',
            '\u1E4F': 'o',
            '\u014D': 'o',
            '\u1E51': 'o',
            '\u1E53': 'o',
            '\u014F': 'o',
            '\u022F': 'o',
            '\u0231': 'o',
            '\u00F6': 'o',
            '\u022B': 'o',
            '\u1ECF': 'o',
            '\u0151': 'o',
            '\u01D2': 'o',
            '\u020D': 'o',
            '\u020F': 'o',
            '\u01A1': 'o',
            '\u1EDD': 'o',
            '\u1EDB': 'o',
            '\u1EE1': 'o',
            '\u1EDF': 'o',
            '\u1EE3': 'o',
            '\u1ECD': 'o',
            '\u1ED9': 'o',
            '\u01EB': 'o',
            '\u01ED': 'o',
            '\u00F8': 'o',
            '\u01FF': 'o',
            '\u0254': 'o',
            '\uA74B': 'o',
            '\uA74D': 'o',
            '\u0275': 'o',
            '\u0153': 'oe',
            '\u01A3': 'oi',
            '\u0223': 'ou',
            '\uA74F': 'oo',
            '\u24DF': 'p',
            '\uFF50': 'p',
            '\u1E55': 'p',
            '\u1E57': 'p',
            '\u01A5': 'p',
            '\u1D7D': 'p',
            '\uA751': 'p',
            '\uA753': 'p',
            '\uA755': 'p',
            '\u24E0': 'q',
            '\uFF51': 'q',
            '\u024B': 'q',
            '\uA757': 'q',
            '\uA759': 'q',
            '\u24E1': 'r',
            '\uFF52': 'r',
            '\u0155': 'r',
            '\u1E59': 'r',
            '\u0159': 'r',
            '\u0211': 'r',
            '\u0213': 'r',
            '\u1E5B': 'r',
            '\u1E5D': 'r',
            '\u0157': 'r',
            '\u1E5F': 'r',
            '\u024D': 'r',
            '\u027D': 'r',
            '\uA75B': 'r',
            '\uA7A7': 'r',
            '\uA783': 'r',
            '\u24E2': 's',
            '\uFF53': 's',
            '\u00DF': 's',
            '\u015B': 's',
            '\u1E65': 's',
            '\u015D': 's',
            '\u1E61': 's',
            '\u0161': 's',
            '\u1E67': 's',
            '\u1E63': 's',
            '\u1E69': 's',
            '\u0219': 's',
            '\u015F': 's',
            '\u023F': 's',
            '\uA7A9': 's',
            '\uA785': 's',
            '\u1E9B': 's',
            '\u24E3': 't',
            '\uFF54': 't',
            '\u1E6B': 't',
            '\u1E97': 't',
            '\u0165': 't',
            '\u1E6D': 't',
            '\u021B': 't',
            '\u0163': 't',
            '\u1E71': 't',
            '\u1E6F': 't',
            '\u0167': 't',
            '\u01AD': 't',
            '\u0288': 't',
            '\u2C66': 't',
            '\uA787': 't',
            '\uA729': 'tz',
            '\u24E4': 'u',
            '\uFF55': 'u',
            '\u00F9': 'u',
            '\u00FA': 'u',
            '\u00FB': 'u',
            '\u0169': 'u',
            '\u1E79': 'u',
            '\u016B': 'u',
            '\u1E7B': 'u',
            '\u016D': 'u',
            '\u00FC': 'u',
            '\u01DC': 'u',
            '\u01D8': 'u',
            '\u01D6': 'u',
            '\u01DA': 'u',
            '\u1EE7': 'u',
            '\u016F': 'u',
            '\u0171': 'u',
            '\u01D4': 'u',
            '\u0215': 'u',
            '\u0217': 'u',
            '\u01B0': 'u',
            '\u1EEB': 'u',
            '\u1EE9': 'u',
            '\u1EEF': 'u',
            '\u1EED': 'u',
            '\u1EF1': 'u',
            '\u1EE5': 'u',
            '\u1E73': 'u',
            '\u0173': 'u',
            '\u1E77': 'u',
            '\u1E75': 'u',
            '\u0289': 'u',
            '\u24E5': 'v',
            '\uFF56': 'v',
            '\u1E7D': 'v',
            '\u1E7F': 'v',
            '\u028B': 'v',
            '\uA75F': 'v',
            '\u028C': 'v',
            '\uA761': 'vy',
            '\u24E6': 'w',
            '\uFF57': 'w',
            '\u1E81': 'w',
            '\u1E83': 'w',
            '\u0175': 'w',
            '\u1E87': 'w',
            '\u1E85': 'w',
            '\u1E98': 'w',
            '\u1E89': 'w',
            '\u2C73': 'w',
            '\u24E7': 'x',
            '\uFF58': 'x',
            '\u1E8B': 'x',
            '\u1E8D': 'x',
            '\u24E8': 'y',
            '\uFF59': 'y',
            '\u1EF3': 'y',
            '\u00FD': 'y',
            '\u0177': 'y',
            '\u1EF9': 'y',
            '\u0233': 'y',
            '\u1E8F': 'y',
            '\u00FF': 'y',
            '\u1EF7': 'y',
            '\u1E99': 'y',
            '\u1EF5': 'y',
            '\u01B4': 'y',
            '\u024F': 'y',
            '\u1EFF': 'y',
            '\u24E9': 'z',
            '\uFF5A': 'z',
            '\u017A': 'z',
            '\u1E91': 'z',
            '\u017C': 'z',
            '\u017E': 'z',
            '\u1E93': 'z',
            '\u1E95': 'z',
            '\u01B6': 'z',
            '\u0225': 'z',
            '\u0240': 'z',
            '\u2C6C': 'z',
            '\uA763': 'z',
            '\u0386': '\u0391',
            '\u0388': '\u0395',
            '\u0389': '\u0397',
            '\u038A': '\u0399',
            '\u03AA': '\u0399',
            '\u038C': '\u039F',
            '\u038E': '\u03A5',
            '\u03AB': '\u03A5',
            '\u038F': '\u03A9',
            '\u03AC': '\u03B1',
            '\u03AD': '\u03B5',
            '\u03AE': '\u03B7',
            '\u03AF': '\u03B9',
            '\u03CA': '\u03B9',
            '\u0390': '\u03B9',
            '\u03CC': '\u03BF',
            '\u03CD': '\u03C5',
            '\u03CB': '\u03C5',
            '\u03B0': '\u03C5',
            '\u03CE': '\u03C9',
            '\u03C2': '\u03C3',
            '\u2019': '\''
          };
          return diacritics;
        });
        S2.define('select2/data/base', ['../utils'], function (Utils) {
          function BaseAdapter($element, options) {
            BaseAdapter.__super__.constructor.call(this);
          }
          Utils.Extend(BaseAdapter, Utils.Observable);
          BaseAdapter.prototype.current = function (callback) {
            throw new Error('The `current` method must be defined in child classes.');
          };
          BaseAdapter.prototype.query = function (params, callback) {
            throw new Error('The `query` method must be defined in child classes.');
          };
          BaseAdapter.prototype.bind = function (container, $container) {
            // Can be implemented in subclasses
          };
          BaseAdapter.prototype.destroy = function () {
            // Can be implemented in subclasses
          };
          BaseAdapter.prototype.generateResultId = function (container, data) {
            var id = container.id + '-result-';
            id += Utils.generateChars(4);
            if (data.id != null) {
              id += '-' + data.id.toString();
            } else {
              id += '-' + Utils.generateChars(4);
            }
            return id;
          };
          return BaseAdapter;
        });
        S2.define('select2/data/select', ['./base', '../utils', 'jquery'], function (BaseAdapter, Utils, $) {
          function SelectAdapter($element, options) {
            this.$element = $element;
            this.options = options;
            SelectAdapter.__super__.constructor.call(this);
          }
          Utils.Extend(SelectAdapter, BaseAdapter);
          SelectAdapter.prototype.current = function (callback) {
            var self = this;
            var data = Array.prototype.map.call(this.$element[0].querySelectorAll(':checked'), function (selectedElement) {
              return self.item($(selectedElement));
            });
            callback(data);
          };
          SelectAdapter.prototype.select = function (data) {
            var self = this;
            data.selected = true;

            // If data.element is a DOM node, use it instead
            if (data.element != null && data.element.tagName.toLowerCase() === 'option') {
              data.element.selected = true;
              this.$element.trigger('input').trigger('change');
              return;
            }
            if (this.$element.prop('multiple')) {
              this.current(function (currentData) {
                var val = [];
                data = [data];
                data.push.apply(data, currentData);
                for (var d = 0; d < data.length; d++) {
                  var id = data[d].id;
                  if (val.indexOf(id) === -1) {
                    val.push(id);
                  }
                }
                self.$element.val(val);
                self.$element.trigger('input').trigger('change');
              });
            } else {
              var val = data.id;
              this.$element.val(val);
              this.$element.trigger('input').trigger('change');
            }
          };
          SelectAdapter.prototype.unselect = function (data) {
            var self = this;
            if (!this.$element.prop('multiple')) {
              return;
            }
            data.selected = false;
            if (data.element != null && data.element.tagName.toLowerCase() === 'option') {
              data.element.selected = false;
              this.$element.trigger('input').trigger('change');
              return;
            }
            this.current(function (currentData) {
              var val = [];
              for (var d = 0; d < currentData.length; d++) {
                var id = currentData[d].id;
                if (id !== data.id && val.indexOf(id) === -1) {
                  val.push(id);
                }
              }
              self.$element.val(val);
              self.$element.trigger('input').trigger('change');
            });
          };
          SelectAdapter.prototype.bind = function (container, $container) {
            var self = this;
            this.container = container;
            container.on('select', function (params) {
              self.select(params.data);
            });
            container.on('unselect', function (params) {
              self.unselect(params.data);
            });
          };
          SelectAdapter.prototype.destroy = function () {
            // Remove anything added to child elements
            this.$element.find('*').each(function () {
              // Remove any custom data set by Select2
              Utils.RemoveData(this);
            });
          };
          SelectAdapter.prototype.query = function (params, callback) {
            var data = [];
            var self = this;
            var $options = this.$element.children();
            $options.each(function () {
              if (this.tagName.toLowerCase() !== 'option' && this.tagName.toLowerCase() !== 'optgroup') {
                return;
              }
              var $option = $(this);
              var option = self.item($option);
              var matches = self.matches(params, option);
              if (matches !== null) {
                data.push(matches);
              }
            });
            callback({
              results: data
            });
          };
          SelectAdapter.prototype.addOptions = function ($options) {
            this.$element.append($options);
          };
          SelectAdapter.prototype.option = function (data) {
            var option;
            if (data.children) {
              option = document.createElement('optgroup');
              option.label = data.text;
            } else {
              option = document.createElement('option');
              if (option.textContent !== undefined) {
                option.textContent = data.text;
              } else {
                option.innerText = data.text;
              }
            }
            if (data.id !== undefined) {
              option.value = data.id;
            }
            if (data.disabled) {
              option.disabled = true;
            }
            if (data.selected) {
              option.selected = true;
            }
            if (data.title) {
              option.title = data.title;
            }
            var normalizedData = this._normalizeItem(data);
            normalizedData.element = option;

            // Override the option's data with the combined data
            Utils.StoreData(option, 'data', normalizedData);
            return $(option);
          };
          SelectAdapter.prototype.item = function ($option) {
            var data = {};
            data = Utils.GetData($option[0], 'data');
            if (data != null) {
              return data;
            }
            var option = $option[0];
            if (option.tagName.toLowerCase() === 'option') {
              data = {
                id: $option.val(),
                text: $option.text(),
                disabled: $option.prop('disabled'),
                selected: $option.prop('selected'),
                title: $option.prop('title')
              };
            } else if (option.tagName.toLowerCase() === 'optgroup') {
              data = {
                text: $option.prop('label'),
                children: [],
                title: $option.prop('title')
              };
              var $children = $option.children('option');
              var children = [];
              for (var c = 0; c < $children.length; c++) {
                var $child = $($children[c]);
                var child = this.item($child);
                children.push(child);
              }
              data.children = children;
            }
            data = this._normalizeItem(data);
            data.element = $option[0];
            Utils.StoreData($option[0], 'data', data);
            return data;
          };
          SelectAdapter.prototype._normalizeItem = function (item) {
            if (item !== Object(item)) {
              item = {
                id: item,
                text: item
              };
            }
            item = $.extend({}, {
              text: ''
            }, item);
            var defaults = {
              selected: false,
              disabled: false
            };
            if (item.id != null) {
              item.id = item.id.toString();
            }
            if (item.text != null) {
              item.text = item.text.toString();
            }
            if (item._resultId == null && item.id && this.container != null) {
              item._resultId = this.generateResultId(this.container, item);
            }
            return $.extend({}, defaults, item);
          };
          SelectAdapter.prototype.matches = function (params, data) {
            var matcher = this.options.get('matcher');
            return matcher(params, data);
          };
          return SelectAdapter;
        });
        S2.define('select2/data/array', ['./select', '../utils', 'jquery'], function (SelectAdapter, Utils, $) {
          function ArrayAdapter($element, options) {
            this._dataToConvert = options.get('data') || [];
            ArrayAdapter.__super__.constructor.call(this, $element, options);
          }
          Utils.Extend(ArrayAdapter, SelectAdapter);
          ArrayAdapter.prototype.bind = function (container, $container) {
            ArrayAdapter.__super__.bind.call(this, container, $container);
            this.addOptions(this.convertToOptions(this._dataToConvert));
          };
          ArrayAdapter.prototype.select = function (data) {
            var $option = this.$element.find('option').filter(function (i, elm) {
              return elm.value == data.id.toString();
            });
            if ($option.length === 0) {
              $option = this.option(data);
              this.addOptions($option);
            }
            ArrayAdapter.__super__.select.call(this, data);
          };
          ArrayAdapter.prototype.convertToOptions = function (data) {
            var self = this;
            var $existing = this.$element.find('option');
            var existingIds = $existing.map(function () {
              return self.item($(this)).id;
            }).get();
            var $options = [];

            // Filter out all items except for the one passed in the argument
            function onlyItem(item) {
              return function () {
                return $(this).val() == item.id;
              };
            }
            for (var d = 0; d < data.length; d++) {
              var item = this._normalizeItem(data[d]);

              // Skip items which were pre-loaded, only merge the data
              if (existingIds.indexOf(item.id) >= 0) {
                var $existingOption = $existing.filter(onlyItem(item));
                var existingData = this.item($existingOption);
                var newData = $.extend(true, {}, item, existingData);
                var $newOption = this.option(newData);
                $existingOption.replaceWith($newOption);
                continue;
              }
              var $option = this.option(item);
              if (item.children) {
                var $children = this.convertToOptions(item.children);
                $option.append($children);
              }
              $options.push($option);
            }
            return $options;
          };
          return ArrayAdapter;
        });
        S2.define('select2/data/ajax', ['./array', '../utils', 'jquery'], function (ArrayAdapter, Utils, $) {
          function AjaxAdapter($element, options) {
            this.ajaxOptions = this._applyDefaults(options.get('ajax'));
            if (this.ajaxOptions.processResults != null) {
              this.processResults = this.ajaxOptions.processResults;
            }
            AjaxAdapter.__super__.constructor.call(this, $element, options);
          }
          Utils.Extend(AjaxAdapter, ArrayAdapter);
          AjaxAdapter.prototype._applyDefaults = function (options) {
            var defaults = {
              data: function (params) {
                return $.extend({}, params, {
                  q: params.term
                });
              },
              transport: function (params, success, failure) {
                var $request = $.ajax(params);
                $request.then(success);
                $request.fail(failure);
                return $request;
              }
            };
            return $.extend({}, defaults, options, true);
          };
          AjaxAdapter.prototype.processResults = function (results) {
            return results;
          };
          AjaxAdapter.prototype.query = function (params, callback) {
            var self = this;
            if (this._request != null) {
              // JSONP requests cannot always be aborted
              if (typeof this._request.abort === 'function') {
                this._request.abort();
              }
              this._request = null;
            }
            var options = $.extend({
              type: 'GET'
            }, this.ajaxOptions);
            if (typeof options.url === 'function') {
              options.url = options.url.call(this.$element, params);
            }
            if (typeof options.data === 'function') {
              options.data = options.data.call(this.$element, params);
            }
            function request() {
              var $request = options.transport(options, function (data) {
                var results = self.processResults(data, params);
                if (self.options.get('debug') && window.console && console.error) {
                  // Check to make sure that the response included a `results` key.
                  if (!results || !results.results || !Array.isArray(results.results)) {
                    console.error('Select2: The AJAX results did not return an array in the ' + '`results` key of the response.');
                  }
                }
                callback(results);
              }, function () {
                // Attempt to detect if a request was aborted
                // Only works if the transport exposes a status property
                if ('status' in $request && ($request.status === 0 || $request.status === '0')) {
                  return;
                }
                self.trigger('results:message', {
                  message: 'errorLoading'
                });
              });
              self._request = $request;
            }
            if (this.ajaxOptions.delay && params.term != null) {
              if (this._queryTimeout) {
                window.clearTimeout(this._queryTimeout);
              }
              this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
            } else {
              request();
            }
          };
          return AjaxAdapter;
        });
        S2.define('select2/data/tags', ['jquery'], function ($) {
          function Tags(decorated, $element, options) {
            var tags = options.get('tags');
            var createTag = options.get('createTag');
            if (createTag !== undefined) {
              this.createTag = createTag;
            }
            var insertTag = options.get('insertTag');
            if (insertTag !== undefined) {
              this.insertTag = insertTag;
            }
            decorated.call(this, $element, options);
            if (Array.isArray(tags)) {
              for (var t = 0; t < tags.length; t++) {
                var tag = tags[t];
                var item = this._normalizeItem(tag);
                var $option = this.option(item);
                this.$element.append($option);
              }
            }
          }
          Tags.prototype.query = function (decorated, params, callback) {
            var self = this;
            this._removeOldTags();
            if (params.term == null || params.page != null) {
              decorated.call(this, params, callback);
              return;
            }
            function wrapper(obj, child) {
              var data = obj.results;
              for (var i = 0; i < data.length; i++) {
                var option = data[i];
                var checkChildren = option.children != null && !wrapper({
                  results: option.children
                }, true);
                var optionText = (option.text || '').toUpperCase();
                var paramsTerm = (params.term || '').toUpperCase();
                var checkText = optionText === paramsTerm;
                if (checkText || checkChildren) {
                  if (child) {
                    return false;
                  }
                  obj.data = data;
                  callback(obj);
                  return;
                }
              }
              if (child) {
                return true;
              }
              var tag = self.createTag(params);
              if (tag != null) {
                var $option = self.option(tag);
                $option.attr('data-select2-tag', 'true');
                self.addOptions([$option]);
                self.insertTag(data, tag);
              }
              obj.results = data;
              callback(obj);
            }
            decorated.call(this, params, wrapper);
          };
          Tags.prototype.createTag = function (decorated, params) {
            if (params.term == null) {
              return null;
            }
            var term = params.term.trim();
            if (term === '') {
              return null;
            }
            return {
              id: term,
              text: term
            };
          };
          Tags.prototype.insertTag = function (_, data, tag) {
            data.unshift(tag);
          };
          Tags.prototype._removeOldTags = function (_) {
            var $options = this.$element.find('option[data-select2-tag]');
            $options.each(function () {
              if (this.selected) {
                return;
              }
              $(this).remove();
            });
          };
          return Tags;
        });
        S2.define('select2/data/tokenizer', ['jquery'], function ($) {
          function Tokenizer(decorated, $element, options) {
            var tokenizer = options.get('tokenizer');
            if (tokenizer !== undefined) {
              this.tokenizer = tokenizer;
            }
            decorated.call(this, $element, options);
          }
          Tokenizer.prototype.bind = function (decorated, container, $container) {
            decorated.call(this, container, $container);
            this.$search = container.dropdown.$search || container.selection.$search || $container.find('.select2-search__field');
          };
          Tokenizer.prototype.query = function (decorated, params, callback) {
            var self = this;
            function createAndSelect(data) {
              // Normalize the data object so we can use it for checks
              var item = self._normalizeItem(data);

              // Check if the data object already exists as a tag
              // Select it if it doesn't
              var $existingOptions = self.$element.find('option').filter(function () {
                return $(this).val() === item.id;
              });

              // If an existing option wasn't found for it, create the option
              if (!$existingOptions.length) {
                var $option = self.option(item);
                $option.attr('data-select2-tag', true);
                self._removeOldTags();
                self.addOptions([$option]);
              }

              // Select the item, now that we know there is an option for it
              select(item);
            }
            function select(data) {
              self.trigger('select', {
                data: data
              });
            }
            params.term = params.term || '';
            var tokenData = this.tokenizer(params, this.options, createAndSelect);
            if (tokenData.term !== params.term) {
              // Replace the search term if we have the search box
              if (this.$search.length) {
                this.$search.val(tokenData.term);
                this.$search.trigger('focus');
              }
              params.term = tokenData.term;
            }
            decorated.call(this, params, callback);
          };
          Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
            var separators = options.get('tokenSeparators') || [];
            var term = params.term;
            var i = 0;
            var createTag = this.createTag || function (params) {
              return {
                id: params.term,
                text: params.term
              };
            };
            while (i < term.length) {
              var termChar = term[i];
              if (separators.indexOf(termChar) === -1) {
                i++;
                continue;
              }
              var part = term.substr(0, i);
              var partParams = $.extend({}, params, {
                term: part
              });
              var data = createTag(partParams);
              if (data == null) {
                i++;
                continue;
              }
              callback(data);

              // Reset the term to not include the tokenized portion
              term = term.substr(i + 1) || '';
              i = 0;
            }
            return {
              term: term
            };
          };
          return Tokenizer;
        });
        S2.define('select2/data/minimumInputLength', [], function () {
          function MinimumInputLength(decorated, $e, options) {
            this.minimumInputLength = options.get('minimumInputLength');
            decorated.call(this, $e, options);
          }
          MinimumInputLength.prototype.query = function (decorated, params, callback) {
            params.term = params.term || '';
            if (params.term.length < this.minimumInputLength) {
              this.trigger('results:message', {
                message: 'inputTooShort',
                args: {
                  minimum: this.minimumInputLength,
                  input: params.term,
                  params: params
                }
              });
              return;
            }
            decorated.call(this, params, callback);
          };
          return MinimumInputLength;
        });
        S2.define('select2/data/maximumInputLength', [], function () {
          function MaximumInputLength(decorated, $e, options) {
            this.maximumInputLength = options.get('maximumInputLength');
            decorated.call(this, $e, options);
          }
          MaximumInputLength.prototype.query = function (decorated, params, callback) {
            params.term = params.term || '';
            if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
              this.trigger('results:message', {
                message: 'inputTooLong',
                args: {
                  maximum: this.maximumInputLength,
                  input: params.term,
                  params: params
                }
              });
              return;
            }
            decorated.call(this, params, callback);
          };
          return MaximumInputLength;
        });
        S2.define('select2/data/maximumSelectionLength', [], function () {
          function MaximumSelectionLength(decorated, $e, options) {
            this.maximumSelectionLength = options.get('maximumSelectionLength');
            decorated.call(this, $e, options);
          }
          MaximumSelectionLength.prototype.bind = function (decorated, container, $container) {
            var self = this;
            decorated.call(this, container, $container);
            container.on('select', function () {
              self._checkIfMaximumSelected();
            });
          };
          MaximumSelectionLength.prototype.query = function (decorated, params, callback) {
            var self = this;
            this._checkIfMaximumSelected(function () {
              decorated.call(self, params, callback);
            });
          };
          MaximumSelectionLength.prototype._checkIfMaximumSelected = function (_, successCallback) {
            var self = this;
            this.current(function (currentData) {
              var count = currentData != null ? currentData.length : 0;
              if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
                self.trigger('results:message', {
                  message: 'maximumSelected',
                  args: {
                    maximum: self.maximumSelectionLength
                  }
                });
                return;
              }
              if (successCallback) {
                successCallback();
              }
            });
          };
          return MaximumSelectionLength;
        });
        S2.define('select2/dropdown', ['jquery', './utils'], function ($, Utils) {
          function Dropdown($element, options) {
            this.$element = $element;
            this.options = options;
            Dropdown.__super__.constructor.call(this);
          }
          Utils.Extend(Dropdown, Utils.Observable);
          Dropdown.prototype.render = function () {
            var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + '</span>');
            $dropdown.attr('dir', this.options.get('dir'));
            this.$dropdown = $dropdown;
            return $dropdown;
          };
          Dropdown.prototype.bind = function () {
            // Should be implemented in subclasses
          };
          Dropdown.prototype.position = function ($dropdown, $container) {
            // Should be implemented in subclasses
          };
          Dropdown.prototype.destroy = function () {
            // Remove the dropdown from the DOM
            this.$dropdown.remove();
          };
          return Dropdown;
        });
        S2.define('select2/dropdown/search', ['jquery'], function ($) {
          function Search() {}
          Search.prototype.render = function (decorated) {
            var $rendered = decorated.call(this);
            var searchLabel = this.options.get('translations').get('search');
            var $search = $('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' + '</span>');
            this.$searchContainer = $search;
            this.$search = $search.find('input');
            this.$search.prop('autocomplete', this.options.get('autocomplete'));
            this.$search.attr('aria-label', searchLabel());
            $rendered.prepend($search);
            return $rendered;
          };
          Search.prototype.bind = function (decorated, container, $container) {
            var self = this;
            var resultsId = container.id + '-results';
            decorated.call(this, container, $container);
            this.$search.on('keydown', function (evt) {
              self.trigger('keypress', evt);
              self._keyUpPrevented = evt.isDefaultPrevented();
            });

            // Workaround for browsers which do not support the `input` event
            // This will prevent double-triggering of events for browsers which support
            // both the `keyup` and `input` events.
            this.$search.on('input', function (evt) {
              // Unbind the duplicated `keyup` event
              $(this).off('keyup');
            });
            this.$search.on('keyup input', function (evt) {
              self.handleSearch(evt);
            });
            container.on('open', function () {
              self.$search.attr('tabindex', 0);
              self.$search.attr('aria-controls', resultsId);
              self.$search.trigger('focus');
              window.setTimeout(function () {
                self.$search.trigger('focus');
              }, 0);
            });
            container.on('close', function () {
              self.$search.attr('tabindex', -1);
              self.$search.removeAttr('aria-controls');
              self.$search.removeAttr('aria-activedescendant');
              self.$search.val('');
              self.$search.trigger('blur');
            });
            container.on('focus', function () {
              if (!container.isOpen()) {
                self.$search.trigger('focus');
              }
            });
            container.on('results:all', function (params) {
              if (params.query.term == null || params.query.term === '') {
                var showSearch = self.showSearch(params);
                if (showSearch) {
                  self.$searchContainer[0].classList.remove('select2-search--hide');
                } else {
                  self.$searchContainer[0].classList.add('select2-search--hide');
                }
              }
            });
            container.on('results:focus', function (params) {
              if (params.data._resultId) {
                self.$search.attr('aria-activedescendant', params.data._resultId);
              } else {
                self.$search.removeAttr('aria-activedescendant');
              }
            });
          };
          Search.prototype.handleSearch = function (evt) {
            if (!this._keyUpPrevented) {
              var input = this.$search.val();
              this.trigger('query', {
                term: input
              });
            }
            this._keyUpPrevented = false;
          };
          Search.prototype.showSearch = function (_, params) {
            return true;
          };
          return Search;
        });
        S2.define('select2/dropdown/hidePlaceholder', [], function () {
          function HidePlaceholder(decorated, $element, options, dataAdapter) {
            this.placeholder = this.normalizePlaceholder(options.get('placeholder'));
            decorated.call(this, $element, options, dataAdapter);
          }
          HidePlaceholder.prototype.append = function (decorated, data) {
            data.results = this.removePlaceholder(data.results);
            decorated.call(this, data);
          };
          HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
            if (typeof placeholder === 'string') {
              placeholder = {
                id: '',
                text: placeholder
              };
            }
            return placeholder;
          };
          HidePlaceholder.prototype.removePlaceholder = function (_, data) {
            var modifiedData = data.slice(0);
            for (var d = data.length - 1; d >= 0; d--) {
              var item = data[d];
              if (this.placeholder.id === item.id) {
                modifiedData.splice(d, 1);
              }
            }
            return modifiedData;
          };
          return HidePlaceholder;
        });
        S2.define('select2/dropdown/infiniteScroll', ['jquery'], function ($) {
          function InfiniteScroll(decorated, $element, options, dataAdapter) {
            this.lastParams = {};
            decorated.call(this, $element, options, dataAdapter);
            this.$loadingMore = this.createLoadingMore();
            this.loading = false;
          }
          InfiniteScroll.prototype.append = function (decorated, data) {
            this.$loadingMore.remove();
            this.loading = false;
            decorated.call(this, data);
            if (this.showLoadingMore(data)) {
              this.$results.append(this.$loadingMore);
              this.loadMoreIfNeeded();
            }
          };
          InfiniteScroll.prototype.bind = function (decorated, container, $container) {
            var self = this;
            decorated.call(this, container, $container);
            container.on('query', function (params) {
              self.lastParams = params;
              self.loading = true;
            });
            container.on('query:append', function (params) {
              self.lastParams = params;
              self.loading = true;
            });
            this.$results.on('scroll', this.loadMoreIfNeeded.bind(this));
          };
          InfiniteScroll.prototype.loadMoreIfNeeded = function () {
            var isLoadMoreVisible = $.contains(document.documentElement, this.$loadingMore[0]);
            if (this.loading || !isLoadMoreVisible) {
              return;
            }
            var currentOffset = this.$results.offset().top + this.$results.outerHeight(false);
            var loadingMoreOffset = this.$loadingMore.offset().top + this.$loadingMore.outerHeight(false);
            if (currentOffset + 50 >= loadingMoreOffset) {
              this.loadMore();
            }
          };
          InfiniteScroll.prototype.loadMore = function () {
            this.loading = true;
            var params = $.extend({}, {
              page: 1
            }, this.lastParams);
            params.page++;
            this.trigger('query:append', params);
          };
          InfiniteScroll.prototype.showLoadingMore = function (_, data) {
            return data.pagination && data.pagination.more;
          };
          InfiniteScroll.prototype.createLoadingMore = function () {
            var $option = $('<li ' + 'class="select2-results__option select2-results__option--load-more"' + 'role="option" aria-disabled="true"></li>');
            var message = this.options.get('translations').get('loadingMore');
            $option.html(message(this.lastParams));
            return $option;
          };
          return InfiniteScroll;
        });
        S2.define('select2/dropdown/attachBody', ['jquery', '../utils'], function ($, Utils) {
          function AttachBody(decorated, $element, options) {
            this.$dropdownParent = $(options.get('dropdownParent') || document.body);
            decorated.call(this, $element, options);
          }
          AttachBody.prototype.bind = function (decorated, container, $container) {
            var self = this;
            decorated.call(this, container, $container);
            container.on('open', function () {
              self._showDropdown();
              self._attachPositioningHandler(container);

              // Must bind after the results handlers to ensure correct sizing
              self._bindContainerResultHandlers(container);
            });
            container.on('close', function () {
              self._hideDropdown();
              self._detachPositioningHandler(container);
            });
            this.$dropdownContainer.on('mousedown', function (evt) {
              evt.stopPropagation();
            });
          };
          AttachBody.prototype.destroy = function (decorated) {
            decorated.call(this);
            this.$dropdownContainer.remove();
          };
          AttachBody.prototype.position = function (decorated, $dropdown, $container) {
            // Clone all of the container classes
            $dropdown.attr('class', $container.attr('class'));
            $dropdown[0].classList.remove('select2');
            $dropdown[0].classList.add('select2-container--open');
            $dropdown.css({
              position: 'absolute',
              top: -999999
            });
            this.$container = $container;
          };
          AttachBody.prototype.render = function (decorated) {
            var $container = $('<span></span>');
            var $dropdown = decorated.call(this);
            $container.append($dropdown);
            this.$dropdownContainer = $container;
            return $container;
          };
          AttachBody.prototype._hideDropdown = function (decorated) {
            this.$dropdownContainer.detach();
          };
          AttachBody.prototype._bindContainerResultHandlers = function (decorated, container) {
            // These should only be bound once
            if (this._containerResultsHandlersBound) {
              return;
            }
            var self = this;
            container.on('results:all', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });
            container.on('results:append', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });
            container.on('results:message', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });
            container.on('select', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });
            container.on('unselect', function () {
              self._positionDropdown();
              self._resizeDropdown();
            });
            this._containerResultsHandlersBound = true;
          };
          AttachBody.prototype._attachPositioningHandler = function (decorated, container) {
            var self = this;
            var scrollEvent = 'scroll.select2.' + container.id;
            var resizeEvent = 'resize.select2.' + container.id;
            var orientationEvent = 'orientationchange.select2.' + container.id;
            var $watchers = this.$container.parents().filter(Utils.hasScroll);
            $watchers.each(function () {
              Utils.StoreData(this, 'select2-scroll-position', {
                x: $(this).scrollLeft(),
                y: $(this).scrollTop()
              });
            });
            $watchers.on(scrollEvent, function (ev) {
              var position = Utils.GetData(this, 'select2-scroll-position');
              $(this).scrollTop(position.y);
            });
            $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent, function (e) {
              self._positionDropdown();
              self._resizeDropdown();
            });
          };
          AttachBody.prototype._detachPositioningHandler = function (decorated, container) {
            var scrollEvent = 'scroll.select2.' + container.id;
            var resizeEvent = 'resize.select2.' + container.id;
            var orientationEvent = 'orientationchange.select2.' + container.id;
            var $watchers = this.$container.parents().filter(Utils.hasScroll);
            $watchers.off(scrollEvent);
            $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
          };
          AttachBody.prototype._positionDropdown = function () {
            var $window = $(window);
            var isCurrentlyAbove = this.$dropdown[0].classList.contains('select2-dropdown--above');
            var isCurrentlyBelow = this.$dropdown[0].classList.contains('select2-dropdown--below');
            var newDirection = null;
            var offset = this.$container.offset();
            offset.bottom = offset.top + this.$container.outerHeight(false);
            var container = {
              height: this.$container.outerHeight(false)
            };
            container.top = offset.top;
            container.bottom = offset.top + container.height;
            var dropdown = {
              height: this.$dropdown.outerHeight(false)
            };
            var viewport = {
              top: $window.scrollTop(),
              bottom: $window.scrollTop() + $window.height()
            };
            var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
            var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;
            var css = {
              left: offset.left,
              top: container.bottom
            };

            // Determine what the parent element is to use for calculating the offset
            var $offsetParent = this.$dropdownParent;

            // For statically positioned elements, we need to get the element
            // that is determining the offset
            if ($offsetParent.css('position') === 'static') {
              $offsetParent = $offsetParent.offsetParent();
            }
            var parentOffset = {
              top: 0,
              left: 0
            };
            if ($.contains(document.body, $offsetParent[0]) || $offsetParent[0].isConnected) {
              parentOffset = $offsetParent.offset();
            }
            css.top -= parentOffset.top;
            css.left -= parentOffset.left;
            if (!isCurrentlyAbove && !isCurrentlyBelow) {
              newDirection = 'below';
            }
            if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
              newDirection = 'above';
            } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
              newDirection = 'below';
            }
            if (newDirection == 'above' || isCurrentlyAbove && newDirection !== 'below') {
              css.top = container.top - parentOffset.top - dropdown.height;
            }
            if (newDirection != null) {
              this.$dropdown[0].classList.remove('select2-dropdown--below');
              this.$dropdown[0].classList.remove('select2-dropdown--above');
              this.$dropdown[0].classList.add('select2-dropdown--' + newDirection);
              this.$container[0].classList.remove('select2-container--below');
              this.$container[0].classList.remove('select2-container--above');
              this.$container[0].classList.add('select2-container--' + newDirection);
            }
            this.$dropdownContainer.css(css);
          };
          AttachBody.prototype._resizeDropdown = function () {
            var css = {
              width: this.$container.outerWidth(false) + 'px'
            };
            if (this.options.get('dropdownAutoWidth')) {
              css.minWidth = css.width;
              css.position = 'relative';
              css.width = 'auto';
            }
            this.$dropdown.css(css);
          };
          AttachBody.prototype._showDropdown = function (decorated) {
            this.$dropdownContainer.appendTo(this.$dropdownParent);
            this._positionDropdown();
            this._resizeDropdown();
          };
          return AttachBody;
        });
        S2.define('select2/dropdown/minimumResultsForSearch', [], function () {
          function countResults(data) {
            var count = 0;
            for (var d = 0; d < data.length; d++) {
              var item = data[d];
              if (item.children) {
                count += countResults(item.children);
              } else {
                count++;
              }
            }
            return count;
          }
          function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
            this.minimumResultsForSearch = options.get('minimumResultsForSearch');
            if (this.minimumResultsForSearch < 0) {
              this.minimumResultsForSearch = Infinity;
            }
            decorated.call(this, $element, options, dataAdapter);
          }
          MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
            if (countResults(params.data.results) < this.minimumResultsForSearch) {
              return false;
            }
            return decorated.call(this, params);
          };
          return MinimumResultsForSearch;
        });
        S2.define('select2/dropdown/selectOnClose', ['../utils'], function (Utils) {
          function SelectOnClose() {}
          SelectOnClose.prototype.bind = function (decorated, container, $container) {
            var self = this;
            decorated.call(this, container, $container);
            container.on('close', function (params) {
              self._handleSelectOnClose(params);
            });
          };
          SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
            if (params && params.originalSelect2Event != null) {
              var event = params.originalSelect2Event;

              // Don't select an item if the close event was triggered from a select or
              // unselect event
              if (event._type === 'select' || event._type === 'unselect') {
                return;
              }
            }
            var $highlightedResults = this.getHighlightedResults();

            // Only select highlighted results
            if ($highlightedResults.length < 1) {
              return;
            }
            var data = Utils.GetData($highlightedResults[0], 'data');

            // Don't re-select already selected resulte
            if (data.element != null && data.element.selected || data.element == null && data.selected) {
              return;
            }
            this.trigger('select', {
              data: data
            });
          };
          return SelectOnClose;
        });
        S2.define('select2/dropdown/closeOnSelect', [], function () {
          function CloseOnSelect() {}
          CloseOnSelect.prototype.bind = function (decorated, container, $container) {
            var self = this;
            decorated.call(this, container, $container);
            container.on('select', function (evt) {
              self._selectTriggered(evt);
            });
            container.on('unselect', function (evt) {
              self._selectTriggered(evt);
            });
          };
          CloseOnSelect.prototype._selectTriggered = function (_, evt) {
            var originalEvent = evt.originalEvent;

            // Don't close if the control key is being held
            if (originalEvent && (originalEvent.ctrlKey || originalEvent.metaKey)) {
              return;
            }
            this.trigger('close', {
              originalEvent: originalEvent,
              originalSelect2Event: evt
            });
          };
          return CloseOnSelect;
        });
        S2.define('select2/dropdown/dropdownCss', ['../utils'], function (Utils) {
          function DropdownCSS() {}
          DropdownCSS.prototype.render = function (decorated) {
            var $dropdown = decorated.call(this);
            var dropdownCssClass = this.options.get('dropdownCssClass') || '';
            if (dropdownCssClass.indexOf(':all:') !== -1) {
              dropdownCssClass = dropdownCssClass.replace(':all:', '');
              Utils.copyNonInternalCssClasses($dropdown[0], this.$element[0]);
            }
            $dropdown.addClass(dropdownCssClass);
            return $dropdown;
          };
          return DropdownCSS;
        });
        S2.define('select2/dropdown/tagsSearchHighlight', ['../utils'], function (Utils) {
          function TagsSearchHighlight() {}
          TagsSearchHighlight.prototype.highlightFirstItem = function (decorated) {
            var $options = this.$results.find('.select2-results__option--selectable' + ':not(.select2-results__option--selected)');
            if ($options.length > 0) {
              var $firstOption = $options.first();
              var data = Utils.GetData($firstOption[0], 'data');
              var firstElement = data.element;
              if (firstElement && firstElement.getAttribute) {
                if (firstElement.getAttribute('data-select2-tag') === 'true') {
                  $firstOption.trigger('mouseenter');
                  return;
                }
              }
            }
            decorated.call(this);
          };
          return TagsSearchHighlight;
        });
        S2.define('select2/i18n/en', [], function () {
          // English
          return {
            errorLoading: function () {
              return 'The results could not be loaded.';
            },
            inputTooLong: function (args) {
              var overChars = args.input.length - args.maximum;
              var message = 'Please delete ' + overChars + ' character';
              if (overChars != 1) {
                message += 's';
              }
              return message;
            },
            inputTooShort: function (args) {
              var remainingChars = args.minimum - args.input.length;
              var message = 'Please enter ' + remainingChars + ' or more characters';
              return message;
            },
            loadingMore: function () {
              return 'Loading more results…';
            },
            maximumSelected: function (args) {
              var message = 'You can only select ' + args.maximum + ' item';
              if (args.maximum != 1) {
                message += 's';
              }
              return message;
            },
            noResults: function () {
              return 'No results found';
            },
            searching: function () {
              return 'Searching…';
            },
            removeAllItems: function () {
              return 'Remove all items';
            },
            removeItem: function () {
              return 'Remove item';
            },
            search: function () {
              return 'Search';
            }
          };
        });
        S2.define('select2/defaults', ['jquery', './results', './selection/single', './selection/multiple', './selection/placeholder', './selection/allowClear', './selection/search', './selection/selectionCss', './selection/eventRelay', './utils', './translation', './diacritics', './data/select', './data/array', './data/ajax', './data/tags', './data/tokenizer', './data/minimumInputLength', './data/maximumInputLength', './data/maximumSelectionLength', './dropdown', './dropdown/search', './dropdown/hidePlaceholder', './dropdown/infiniteScroll', './dropdown/attachBody', './dropdown/minimumResultsForSearch', './dropdown/selectOnClose', './dropdown/closeOnSelect', './dropdown/dropdownCss', './dropdown/tagsSearchHighlight', './i18n/en'], function ($, ResultsList, SingleSelection, MultipleSelection, Placeholder, AllowClear, SelectionSearch, SelectionCSS, EventRelay, Utils, Translation, DIACRITICS, SelectData, ArrayData, AjaxData, Tags, Tokenizer, MinimumInputLength, MaximumInputLength, MaximumSelectionLength, Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll, AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect, DropdownCSS, TagsSearchHighlight, EnglishTranslation) {
          function Defaults() {
            this.reset();
          }
          Defaults.prototype.apply = function (options) {
            options = $.extend(true, {}, this.defaults, options);
            if (options.dataAdapter == null) {
              if (options.ajax != null) {
                options.dataAdapter = AjaxData;
              } else if (options.data != null) {
                options.dataAdapter = ArrayData;
              } else {
                options.dataAdapter = SelectData;
              }
              if (options.minimumInputLength > 0) {
                options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
              }
              if (options.maximumInputLength > 0) {
                options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
              }
              if (options.maximumSelectionLength > 0) {
                options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
              }
              if (options.tags) {
                options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
              }
              if (options.tokenSeparators != null || options.tokenizer != null) {
                options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
              }
            }
            if (options.resultsAdapter == null) {
              options.resultsAdapter = ResultsList;
              if (options.ajax != null) {
                options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
              }
              if (options.placeholder != null) {
                options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
              }
              if (options.selectOnClose) {
                options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
              }
              if (options.tags) {
                options.resultsAdapter = Utils.Decorate(options.resultsAdapter, TagsSearchHighlight);
              }
            }
            if (options.dropdownAdapter == null) {
              if (options.multiple) {
                options.dropdownAdapter = Dropdown;
              } else {
                var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);
                options.dropdownAdapter = SearchableDropdown;
              }
              if (options.minimumResultsForSearch !== 0) {
                options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
              }
              if (options.closeOnSelect) {
                options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
              }
              if (options.dropdownCssClass != null) {
                options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
              }
              options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
            }
            if (options.selectionAdapter == null) {
              if (options.multiple) {
                options.selectionAdapter = MultipleSelection;
              } else {
                options.selectionAdapter = SingleSelection;
              }

              // Add the placeholder mixin if a placeholder was specified
              if (options.placeholder != null) {
                options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
              }
              if (options.allowClear) {
                options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
              }
              if (options.multiple) {
                options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
              }
              if (options.selectionCssClass != null) {
                options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionCSS);
              }
              options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
            }

            // If the defaults were not previously applied from an element, it is
            // possible for the language option to have not been resolved
            options.language = this._resolveLanguage(options.language);

            // Always fall back to English since it will always be complete
            options.language.push('en');
            var uniqueLanguages = [];
            for (var l = 0; l < options.language.length; l++) {
              var language = options.language[l];
              if (uniqueLanguages.indexOf(language) === -1) {
                uniqueLanguages.push(language);
              }
            }
            options.language = uniqueLanguages;
            options.translations = this._processTranslations(options.language, options.debug);
            return options;
          };
          Defaults.prototype.reset = function () {
            function stripDiacritics(text) {
              // Used 'uni range + named function' from http://jsperf.com/diacritics/18
              function match(a) {
                return DIACRITICS[a] || a;
              }
              return text.replace(/[^\u0000-\u007E]/g, match);
            }
            function matcher(params, data) {
              // Always return the object if there is nothing to compare
              if (params.term == null || params.term.trim() === '') {
                return data;
              }

              // Do a recursive check for options with children
              if (data.children && data.children.length > 0) {
                // Clone the data object if there are children
                // This is required as we modify the object to remove any non-matches
                var match = $.extend(true, {}, data);

                // Check each child of the option
                for (var c = data.children.length - 1; c >= 0; c--) {
                  var child = data.children[c];
                  var matches = matcher(params, child);

                  // If there wasn't a match, remove the object in the array
                  if (matches == null) {
                    match.children.splice(c, 1);
                  }
                }

                // If any children matched, return the new object
                if (match.children.length > 0) {
                  return match;
                }

                // If there were no matching children, check just the plain object
                return matcher(params, match);
              }
              var original = stripDiacritics(data.text).toUpperCase();
              var term = stripDiacritics(params.term).toUpperCase();

              // Check if the text contains the term
              if (original.indexOf(term) > -1) {
                return data;
              }

              // If it doesn't contain the term, don't return anything
              return null;
            }
            this.defaults = {
              amdLanguageBase: './i18n/',
              autocomplete: 'off',
              closeOnSelect: true,
              debug: false,
              dropdownAutoWidth: false,
              escapeMarkup: Utils.escapeMarkup,
              language: {},
              matcher: matcher,
              minimumInputLength: 0,
              maximumInputLength: 0,
              maximumSelectionLength: 0,
              minimumResultsForSearch: 0,
              selectOnClose: false,
              scrollAfterSelect: false,
              sorter: function (data) {
                return data;
              },
              templateResult: function (result) {
                return result.text;
              },
              templateSelection: function (selection) {
                return selection.text;
              },
              theme: 'default',
              width: 'resolve'
            };
          };
          Defaults.prototype.applyFromElement = function (options, $element) {
            var optionLanguage = options.language;
            var defaultLanguage = this.defaults.language;
            var elementLanguage = $element.prop('lang');
            var parentLanguage = $element.closest('[lang]').prop('lang');
            var languages = Array.prototype.concat.call(this._resolveLanguage(elementLanguage), this._resolveLanguage(optionLanguage), this._resolveLanguage(defaultLanguage), this._resolveLanguage(parentLanguage));
            options.language = languages;
            return options;
          };
          Defaults.prototype._resolveLanguage = function (language) {
            if (!language) {
              return [];
            }
            if ($.isEmptyObject(language)) {
              return [];
            }
            if ($.isPlainObject(language)) {
              return [language];
            }
            var languages;
            if (!Array.isArray(language)) {
              languages = [language];
            } else {
              languages = language;
            }
            var resolvedLanguages = [];
            for (var l = 0; l < languages.length; l++) {
              resolvedLanguages.push(languages[l]);
              if (typeof languages[l] === 'string' && languages[l].indexOf('-') > 0) {
                // Extract the region information if it is included
                var languageParts = languages[l].split('-');
                var baseLanguage = languageParts[0];
                resolvedLanguages.push(baseLanguage);
              }
            }
            return resolvedLanguages;
          };
          Defaults.prototype._processTranslations = function (languages, debug) {
            var translations = new Translation();
            for (var l = 0; l < languages.length; l++) {
              var languageData = new Translation();
              var language = languages[l];
              if (typeof language === 'string') {
                try {
                  // Try to load it with the original name
                  languageData = Translation.loadPath(language);
                } catch (e) {
                  try {
                    // If we couldn't load it, check if it wasn't the full path
                    language = this.defaults.amdLanguageBase + language;
                    languageData = Translation.loadPath(language);
                  } catch (ex) {
                    // The translation could not be loaded at all. Sometimes this is
                    // because of a configuration problem, other times this can be
                    // because of how Select2 helps load all possible translation files
                    if (debug && window.console && console.warn) {
                      console.warn('Select2: The language file for "' + language + '" could ' + 'not be automatically loaded. A fallback will be used instead.');
                    }
                  }
                }
              } else if ($.isPlainObject(language)) {
                languageData = new Translation(language);
              } else {
                languageData = language;
              }
              translations.extend(languageData);
            }
            return translations;
          };
          Defaults.prototype.set = function (key, value) {
            var camelKey = $.camelCase(key);
            var data = {};
            data[camelKey] = value;
            var convertedData = Utils._convertData(data);
            $.extend(true, this.defaults, convertedData);
          };
          var defaults = new Defaults();
          return defaults;
        });
        S2.define('select2/options', ['jquery', './defaults', './utils'], function ($, Defaults, Utils) {
          function Options(options, $element) {
            this.options = options;
            if ($element != null) {
              this.fromElement($element);
            }
            if ($element != null) {
              this.options = Defaults.applyFromElement(this.options, $element);
            }
            this.options = Defaults.apply(this.options);
          }
          Options.prototype.fromElement = function ($e) {
            var excludedData = ['select2'];
            if (this.options.multiple == null) {
              this.options.multiple = $e.prop('multiple');
            }
            if (this.options.disabled == null) {
              this.options.disabled = $e.prop('disabled');
            }
            if (this.options.autocomplete == null && $e.prop('autocomplete')) {
              this.options.autocomplete = $e.prop('autocomplete');
            }
            if (this.options.dir == null) {
              if ($e.prop('dir')) {
                this.options.dir = $e.prop('dir');
              } else if ($e.closest('[dir]').prop('dir')) {
                this.options.dir = $e.closest('[dir]').prop('dir');
              } else {
                this.options.dir = 'ltr';
              }
            }
            $e.prop('disabled', this.options.disabled);
            $e.prop('multiple', this.options.multiple);
            if (Utils.GetData($e[0], 'select2Tags')) {
              if (this.options.debug && window.console && console.warn) {
                console.warn('Select2: The `data-select2-tags` attribute has been changed to ' + 'use the `data-data` and `data-tags="true"` attributes and will be ' + 'removed in future versions of Select2.');
              }
              Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
              Utils.StoreData($e[0], 'tags', true);
            }
            if (Utils.GetData($e[0], 'ajaxUrl')) {
              if (this.options.debug && window.console && console.warn) {
                console.warn('Select2: The `data-ajax-url` attribute has been changed to ' + '`data-ajax--url` and support for the old attribute will be removed' + ' in future versions of Select2.');
              }
              $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
              Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
            }
            var dataset = {};
            function upperCaseLetter(_, letter) {
              return letter.toUpperCase();
            }

            // Pre-load all of the attributes which are prefixed with `data-`
            for (var attr = 0; attr < $e[0].attributes.length; attr++) {
              var attributeName = $e[0].attributes[attr].name;
              var prefix = 'data-';
              if (attributeName.substr(0, prefix.length) == prefix) {
                // Get the contents of the attribute after `data-`
                var dataName = attributeName.substring(prefix.length);

                // Get the data contents from the consistent source
                // This is more than likely the jQuery data helper
                var dataValue = Utils.GetData($e[0], dataName);

                // camelCase the attribute name to match the spec
                var camelDataName = dataName.replace(/-([a-z])/g, upperCaseLetter);

                // Store the data attribute contents into the dataset since
                dataset[camelDataName] = dataValue;
              }
            }

            // Prefer the element's `dataset` attribute if it exists
            // jQuery 1.x does not correctly handle data attributes with multiple dashes
            if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
              dataset = $.extend(true, {}, $e[0].dataset, dataset);
            }

            // Prefer our internal data cache if it exists
            var data = $.extend(true, {}, Utils.GetData($e[0]), dataset);
            data = Utils._convertData(data);
            for (var key in data) {
              if (excludedData.indexOf(key) > -1) {
                continue;
              }
              if ($.isPlainObject(this.options[key])) {
                $.extend(this.options[key], data[key]);
              } else {
                this.options[key] = data[key];
              }
            }
            return this;
          };
          Options.prototype.get = function (key) {
            return this.options[key];
          };
          Options.prototype.set = function (key, val) {
            this.options[key] = val;
          };
          return Options;
        });
        S2.define('select2/core', ['jquery', './options', './utils', './keys'], function ($, Options, Utils, KEYS) {
          var Select2 = function ($element, options) {
            if (Utils.GetData($element[0], 'select2') != null) {
              Utils.GetData($element[0], 'select2').destroy();
            }
            this.$element = $element;
            this.id = this._generateId($element);
            options = options || {};
            this.options = new Options(options, $element);
            Select2.__super__.constructor.call(this);

            // Set up the tabindex

            var tabindex = $element.attr('tabindex') || 0;
            Utils.StoreData($element[0], 'old-tabindex', tabindex);
            $element.attr('tabindex', '-1');

            // Set up containers and adapters

            var DataAdapter = this.options.get('dataAdapter');
            this.dataAdapter = new DataAdapter($element, this.options);
            var $container = this.render();
            this._placeContainer($container);
            var SelectionAdapter = this.options.get('selectionAdapter');
            this.selection = new SelectionAdapter($element, this.options);
            this.$selection = this.selection.render();
            this.selection.position(this.$selection, $container);
            var DropdownAdapter = this.options.get('dropdownAdapter');
            this.dropdown = new DropdownAdapter($element, this.options);
            this.$dropdown = this.dropdown.render();
            this.dropdown.position(this.$dropdown, $container);
            var ResultsAdapter = this.options.get('resultsAdapter');
            this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
            this.$results = this.results.render();
            this.results.position(this.$results, this.$dropdown);

            // Bind events

            var self = this;

            // Bind the container to all of the adapters
            this._bindAdapters();

            // Register any DOM event handlers
            this._registerDomEvents();

            // Register any internal event handlers
            this._registerDataEvents();
            this._registerSelectionEvents();
            this._registerDropdownEvents();
            this._registerResultsEvents();
            this._registerEvents();

            // Set the initial state
            this.dataAdapter.current(function (initialData) {
              self.trigger('selection:update', {
                data: initialData
              });
            });

            // Hide the original select
            $element[0].classList.add('select2-hidden-accessible');
            $element.attr('aria-hidden', 'true');

            // Synchronize any monitored attributes
            this._syncAttributes();
            Utils.StoreData($element[0], 'select2', this);

            // Ensure backwards compatibility with $element.data('select2').
            $element.data('select2', this);
          };
          Utils.Extend(Select2, Utils.Observable);
          Select2.prototype._generateId = function ($element) {
            var id = '';
            if ($element.attr('id') != null) {
              id = $element.attr('id');
            } else if ($element.attr('name') != null) {
              id = $element.attr('name') + '-' + Utils.generateChars(2);
            } else {
              id = Utils.generateChars(4);
            }
            id = id.replace(/(:|\.|\[|\]|,)/g, '');
            id = 'select2-' + id;
            return id;
          };
          Select2.prototype._placeContainer = function ($container) {
            $container.insertAfter(this.$element);
            var width = this._resolveWidth(this.$element, this.options.get('width'));
            if (width != null) {
              $container.css('width', width);
            }
          };
          Select2.prototype._resolveWidth = function ($element, method) {
            var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
            if (method == 'resolve') {
              var styleWidth = this._resolveWidth($element, 'style');
              if (styleWidth != null) {
                return styleWidth;
              }
              return this._resolveWidth($element, 'element');
            }
            if (method == 'element') {
              var elementWidth = $element.outerWidth(false);
              if (elementWidth <= 0) {
                return 'auto';
              }
              return elementWidth + 'px';
            }
            if (method == 'style') {
              var style = $element.attr('style');
              if (typeof style !== 'string') {
                return null;
              }
              var attrs = style.split(';');
              for (var i = 0, l = attrs.length; i < l; i = i + 1) {
                var attr = attrs[i].replace(/\s/g, '');
                var matches = attr.match(WIDTH);
                if (matches !== null && matches.length >= 1) {
                  return matches[1];
                }
              }
              return null;
            }
            if (method == 'computedstyle') {
              var computedStyle = window.getComputedStyle($element[0]);
              return computedStyle.width;
            }
            return method;
          };
          Select2.prototype._bindAdapters = function () {
            this.dataAdapter.bind(this, this.$container);
            this.selection.bind(this, this.$container);
            this.dropdown.bind(this, this.$container);
            this.results.bind(this, this.$container);
          };
          Select2.prototype._registerDomEvents = function () {
            var self = this;
            this.$element.on('change.select2', function () {
              self.dataAdapter.current(function (data) {
                self.trigger('selection:update', {
                  data: data
                });
              });
            });
            this.$element.on('focus.select2', function (evt) {
              self.trigger('focus', evt);
            });
            this._syncA = Utils.bind(this._syncAttributes, this);
            this._syncS = Utils.bind(this._syncSubtree, this);
            this._observer = new window.MutationObserver(function (mutations) {
              self._syncA();
              self._syncS(mutations);
            });
            this._observer.observe(this.$element[0], {
              attributes: true,
              childList: true,
              subtree: false
            });
          };
          Select2.prototype._registerDataEvents = function () {
            var self = this;
            this.dataAdapter.on('*', function (name, params) {
              self.trigger(name, params);
            });
          };
          Select2.prototype._registerSelectionEvents = function () {
            var self = this;
            var nonRelayEvents = ['toggle', 'focus'];
            this.selection.on('toggle', function () {
              self.toggleDropdown();
            });
            this.selection.on('focus', function (params) {
              self.focus(params);
            });
            this.selection.on('*', function (name, params) {
              if (nonRelayEvents.indexOf(name) !== -1) {
                return;
              }
              self.trigger(name, params);
            });
          };
          Select2.prototype._registerDropdownEvents = function () {
            var self = this;
            this.dropdown.on('*', function (name, params) {
              self.trigger(name, params);
            });
          };
          Select2.prototype._registerResultsEvents = function () {
            var self = this;
            this.results.on('*', function (name, params) {
              self.trigger(name, params);
            });
          };
          Select2.prototype._registerEvents = function () {
            var self = this;
            this.on('open', function () {
              self.$container[0].classList.add('select2-container--open');
            });
            this.on('close', function () {
              self.$container[0].classList.remove('select2-container--open');
            });
            this.on('enable', function () {
              self.$container[0].classList.remove('select2-container--disabled');
            });
            this.on('disable', function () {
              self.$container[0].classList.add('select2-container--disabled');
            });
            this.on('blur', function () {
              self.$container[0].classList.remove('select2-container--focus');
            });
            this.on('query', function (params) {
              if (!self.isOpen()) {
                self.trigger('open', {});
              }
              this.dataAdapter.query(params, function (data) {
                self.trigger('results:all', {
                  data: data,
                  query: params
                });
              });
            });
            this.on('query:append', function (params) {
              this.dataAdapter.query(params, function (data) {
                self.trigger('results:append', {
                  data: data,
                  query: params
                });
              });
            });
            this.on('keypress', function (evt) {
              var key = evt.which;
              if (self.isOpen()) {
                if (key === KEYS.ESC || key === KEYS.UP && evt.altKey) {
                  self.close(evt);
                  evt.preventDefault();
                } else if (key === KEYS.ENTER || key === KEYS.TAB) {
                  self.trigger('results:select', {});
                  evt.preventDefault();
                } else if (key === KEYS.SPACE && evt.ctrlKey) {
                  self.trigger('results:toggle', {});
                  evt.preventDefault();
                } else if (key === KEYS.UP) {
                  self.trigger('results:previous', {});
                  evt.preventDefault();
                } else if (key === KEYS.DOWN) {
                  self.trigger('results:next', {});
                  evt.preventDefault();
                }
              } else {
                if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.DOWN && evt.altKey) {
                  self.open();
                  evt.preventDefault();
                }
              }
            });
          };
          Select2.prototype._syncAttributes = function () {
            this.options.set('disabled', this.$element.prop('disabled'));
            if (this.isDisabled()) {
              if (this.isOpen()) {
                this.close();
              }
              this.trigger('disable', {});
            } else {
              this.trigger('enable', {});
            }
          };
          Select2.prototype._isChangeMutation = function (mutations) {
            var self = this;
            if (mutations.addedNodes && mutations.addedNodes.length > 0) {
              for (var n = 0; n < mutations.addedNodes.length; n++) {
                var node = mutations.addedNodes[n];
                if (node.selected) {
                  return true;
                }
              }
            } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
              return true;
            } else if (Array.isArray(mutations)) {
              return mutations.some(function (mutation) {
                return self._isChangeMutation(mutation);
              });
            }
            return false;
          };
          Select2.prototype._syncSubtree = function (mutations) {
            var changed = this._isChangeMutation(mutations);
            var self = this;

            // Only re-pull the data if we think there is a change
            if (changed) {
              this.dataAdapter.current(function (currentData) {
                self.trigger('selection:update', {
                  data: currentData
                });
              });
            }
          };

          /**
           * Override the trigger method to automatically trigger pre-events when
           * there are events that can be prevented.
           */
          Select2.prototype.trigger = function (name, args) {
            var actualTrigger = Select2.__super__.trigger;
            var preTriggerMap = {
              'open': 'opening',
              'close': 'closing',
              'select': 'selecting',
              'unselect': 'unselecting',
              'clear': 'clearing'
            };
            if (args === undefined) {
              args = {};
            }
            if (name in preTriggerMap) {
              var preTriggerName = preTriggerMap[name];
              var preTriggerArgs = {
                prevented: false,
                name: name,
                args: args
              };
              actualTrigger.call(this, preTriggerName, preTriggerArgs);
              if (preTriggerArgs.prevented) {
                args.prevented = true;
                return;
              }
            }
            actualTrigger.call(this, name, args);
          };
          Select2.prototype.toggleDropdown = function () {
            if (this.isDisabled()) {
              return;
            }
            if (this.isOpen()) {
              this.close();
            } else {
              this.open();
            }
          };
          Select2.prototype.open = function () {
            if (this.isOpen()) {
              return;
            }
            if (this.isDisabled()) {
              return;
            }
            this.trigger('query', {});
          };
          Select2.prototype.close = function (evt) {
            if (!this.isOpen()) {
              return;
            }
            this.trigger('close', {
              originalEvent: evt
            });
          };

          /**
           * Helper method to abstract the "enabled" (not "disabled") state of this
           * object.
           *
           * @return {true} if the instance is not disabled.
           * @return {false} if the instance is disabled.
           */
          Select2.prototype.isEnabled = function () {
            return !this.isDisabled();
          };

          /**
           * Helper method to abstract the "disabled" state of this object.
           *
           * @return {true} if the disabled option is true.
           * @return {false} if the disabled option is false.
           */
          Select2.prototype.isDisabled = function () {
            return this.options.get('disabled');
          };
          Select2.prototype.isOpen = function () {
            return this.$container[0].classList.contains('select2-container--open');
          };
          Select2.prototype.hasFocus = function () {
            return this.$container[0].classList.contains('select2-container--focus');
          };
          Select2.prototype.focus = function (data) {
            // No need to re-trigger focus events if we are already focused
            if (this.hasFocus()) {
              return;
            }
            this.$container[0].classList.add('select2-container--focus');
            this.trigger('focus', {});
          };
          Select2.prototype.enable = function (args) {
            if (this.options.get('debug') && window.console && console.warn) {
              console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + ' instead.');
            }
            if (args == null || args.length === 0) {
              args = [true];
            }
            var disabled = !args[0];
            this.$element.prop('disabled', disabled);
          };
          Select2.prototype.data = function () {
            if (this.options.get('debug') && arguments.length > 0 && window.console && console.warn) {
              console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + 'should consider setting the value instead using `$element.val()`.');
            }
            var data = [];
            this.dataAdapter.current(function (currentData) {
              data = currentData;
            });
            return data;
          };
          Select2.prototype.val = function (args) {
            if (this.options.get('debug') && window.console && console.warn) {
              console.warn('Select2: The `select2("val")` method has been deprecated and will be' + ' removed in later Select2 versions. Use $element.val() instead.');
            }
            if (args == null || args.length === 0) {
              return this.$element.val();
            }
            var newVal = args[0];
            if (Array.isArray(newVal)) {
              newVal = newVal.map(function (obj) {
                return obj.toString();
              });
            }
            this.$element.val(newVal).trigger('input').trigger('change');
          };
          Select2.prototype.destroy = function () {
            Utils.RemoveData(this.$container[0]);
            this.$container.remove();
            this._observer.disconnect();
            this._observer = null;
            this._syncA = null;
            this._syncS = null;
            this.$element.off('.select2');
            this.$element.attr('tabindex', Utils.GetData(this.$element[0], 'old-tabindex'));
            this.$element[0].classList.remove('select2-hidden-accessible');
            this.$element.attr('aria-hidden', 'false');
            Utils.RemoveData(this.$element[0]);
            this.$element.removeData('select2');
            this.dataAdapter.destroy();
            this.selection.destroy();
            this.dropdown.destroy();
            this.results.destroy();
            this.dataAdapter = null;
            this.selection = null;
            this.dropdown = null;
            this.results = null;
          };
          Select2.prototype.render = function () {
            var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + '</span>');
            $container.attr('dir', this.options.get('dir'));
            this.$container = $container;
            this.$container[0].classList.add('select2-container--' + this.options.get('theme'));
            Utils.StoreData($container[0], 'element', this.$element);
            return $container;
          };
          return Select2;
        });
        S2.define('jquery-mousewheel', ['jquery'], function ($) {
          // Used to shim jQuery.mousewheel for non-full builds.
          return $;
        });
        S2.define('jquery.select2', ['jquery', 'jquery-mousewheel', './select2/core', './select2/defaults', './select2/utils'], function ($, _, Select2, Defaults, Utils) {
          if ($.fn.select2 == null) {
            // All methods that should return the element
            var thisMethods = ['open', 'close', 'destroy'];
            $.fn.select2 = function (options) {
              options = options || {};
              if (typeof options === 'object') {
                this.each(function () {
                  var instanceOptions = $.extend(true, {}, options);
                  new Select2($(this), instanceOptions);
                });
                return this;
              } else if (typeof options === 'string') {
                var ret;
                var args = Array.prototype.slice.call(arguments, 1);
                this.each(function () {
                  var instance = Utils.GetData(this, 'select2');
                  if (instance == null && window.console && console.error) {
                    console.error('The select2(\'' + options + '\') method was called on an ' + 'element that is not using Select2.');
                  }
                  ret = instance[options].apply(instance, args);
                });

                // Check if we should be returning `this`
                if (thisMethods.indexOf(options) > -1) {
                  return this;
                }
                return ret;
              } else {
                throw new Error('Invalid arguments for Select2: ' + options);
              }
            };
          }
          if ($.fn.select2.defaults == null) {
            $.fn.select2.defaults = Defaults;
          }
          return Select2;
        });

        // Return the AMD loader configuration so it can be used outside of this file
        return {
          define: S2.define,
          require: S2.require
        };
      }();

      // Autoload the jQuery bindings
      // We know that all of the modules exist above this, so we're safe
      var select2 = S2.require('jquery.select2');

      // Hold the AMD module references on the jQuery function that was just loaded
      // This allows Select2 to use the internal loader outside of this file, such
      // as in the language files.
      jQuery.fn.select2.amd = S2;

      // Return the Select2 instance for anyone who is importing it.
      return select2;
    });
  })(select2$1);
  var select2Exports = select2$1.exports;
  var select2 = /*@__PURE__*/getDefaultExportFromCjs(select2Exports);

  function commonjsRequire(path) {
  	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var ejs_min = {exports: {}};

  ejs_min.exports;
  (function (module, exports) {
    (function (f) {
      {
        module.exports = f();
      }
    })(function () {
      return function () {
        function r(e, n, t) {
          function o(i, f) {
            if (!n[i]) {
              if (!e[i]) {
                var c = "function" == typeof commonjsRequire && commonjsRequire;
                if (!f && c) return c(i, !0);
                if (u) return u(i, !0);
                var a = new Error("Cannot find module '" + i + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i] = {
                exports: {}
              };
              e[i][0].call(p.exports, function (r) {
                var n = e[i][1][r];
                return o(n || r);
              }, p, p.exports, r, e, n, t);
            }
            return n[i].exports;
          }
          for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++) o(t[i]);
          return o;
        }
        return r;
      }()({
        1: [function (require, module, exports) {

          var fs = require("fs");
          var path = require("path");
          var utils = require("./utils");
          var scopeOptionWarned = false;
          var _VERSION_STRING = require("../package.json").version;
          var _DEFAULT_OPEN_DELIMITER = "<";
          var _DEFAULT_CLOSE_DELIMITER = ">";
          var _DEFAULT_DELIMITER = "%";
          var _DEFAULT_LOCALS_NAME = "locals";
          var _NAME = "ejs";
          var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
          var _OPTS_PASSABLE_WITH_DATA = ["delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "rmWhitespace", "strict", "filename", "async"];
          var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
          var _BOM = /^\uFEFF/;
          var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
          exports.cache = utils.cache;
          exports.fileLoader = fs.readFileSync;
          exports.localsName = _DEFAULT_LOCALS_NAME;
          exports.promiseImpl = new Function("return this;")().Promise;
          exports.resolveInclude = function (name, filename, isDir) {
            var dirname = path.dirname;
            var extname = path.extname;
            var resolve = path.resolve;
            var includePath = resolve(isDir ? filename : dirname(filename), name);
            var ext = extname(name);
            if (!ext) {
              includePath += ".ejs";
            }
            return includePath;
          };
          function resolvePaths(name, paths) {
            var filePath;
            if (paths.some(function (v) {
              filePath = exports.resolveInclude(name, v, true);
              return fs.existsSync(filePath);
            })) {
              return filePath;
            }
          }
          function getIncludePath(path, options) {
            var includePath;
            var filePath;
            var views = options.views;
            var match = /^[A-Za-z]+:\\|^\//.exec(path);
            if (match && match.length) {
              path = path.replace(/^\/*/, "");
              if (Array.isArray(options.root)) {
                includePath = resolvePaths(path, options.root);
              } else {
                includePath = exports.resolveInclude(path, options.root || "/", true);
              }
            } else {
              if (options.filename) {
                filePath = exports.resolveInclude(path, options.filename);
                if (fs.existsSync(filePath)) {
                  includePath = filePath;
                }
              }
              if (!includePath && Array.isArray(views)) {
                includePath = resolvePaths(path, views);
              }
              if (!includePath && typeof options.includer !== "function") {
                throw new Error('Could not find the include file "' + options.escapeFunction(path) + '"');
              }
            }
            return includePath;
          }
          function handleCache(options, template) {
            var func;
            var filename = options.filename;
            var hasTemplate = arguments.length > 1;
            if (options.cache) {
              if (!filename) {
                throw new Error("cache option requires a filename");
              }
              func = exports.cache.get(filename);
              if (func) {
                return func;
              }
              if (!hasTemplate) {
                template = fileLoader(filename).toString().replace(_BOM, "");
              }
            } else if (!hasTemplate) {
              if (!filename) {
                throw new Error("Internal EJS error: no file name or template " + "provided");
              }
              template = fileLoader(filename).toString().replace(_BOM, "");
            }
            func = exports.compile(template, options);
            if (options.cache) {
              exports.cache.set(filename, func);
            }
            return func;
          }
          function tryHandleCache(options, data, cb) {
            var result;
            if (!cb) {
              if (typeof exports.promiseImpl == "function") {
                return new exports.promiseImpl(function (resolve, reject) {
                  try {
                    result = handleCache(options)(data);
                    resolve(result);
                  } catch (err) {
                    reject(err);
                  }
                });
              } else {
                throw new Error("Please provide a callback function");
              }
            } else {
              try {
                result = handleCache(options)(data);
              } catch (err) {
                return cb(err);
              }
              cb(null, result);
            }
          }
          function fileLoader(filePath) {
            return exports.fileLoader(filePath);
          }
          function includeFile(path, options) {
            var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
            opts.filename = getIncludePath(path, opts);
            if (typeof options.includer === "function") {
              var includerResult = options.includer(path, opts.filename);
              if (includerResult) {
                if (includerResult.filename) {
                  opts.filename = includerResult.filename;
                }
                if (includerResult.template) {
                  return handleCache(opts, includerResult.template);
                }
              }
            }
            return handleCache(opts);
          }
          function rethrow(err, str, flnm, lineno, esc) {
            var lines = str.split("\n");
            var start = Math.max(lineno - 3, 0);
            var end = Math.min(lines.length, lineno + 3);
            var filename = esc(flnm);
            var context = lines.slice(start, end).map(function (line, i) {
              var curr = i + start + 1;
              return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
            }).join("\n");
            err.path = filename;
            err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
            throw err;
          }
          function stripSemi(str) {
            return str.replace(/;(\s*$)/, "$1");
          }
          exports.compile = function compile(template, opts) {
            var templ;
            if (opts && opts.scope) {
              if (!scopeOptionWarned) {
                console.warn("`scope` option is deprecated and will be removed in EJS 3");
                scopeOptionWarned = true;
              }
              if (!opts.context) {
                opts.context = opts.scope;
              }
              delete opts.scope;
            }
            templ = new Template(template, opts);
            return templ.compile();
          };
          exports.render = function (template, d, o) {
            var data = d || utils.createNullProtoObjWherePossible();
            var opts = o || utils.createNullProtoObjWherePossible();
            if (arguments.length == 2) {
              utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
            }
            return handleCache(opts, template)(data);
          };
          exports.renderFile = function () {
            var args = Array.prototype.slice.call(arguments);
            var filename = args.shift();
            var cb;
            var opts = {
              filename: filename
            };
            var data;
            var viewOpts;
            if (typeof arguments[arguments.length - 1] == "function") {
              cb = args.pop();
            }
            if (args.length) {
              data = args.shift();
              if (args.length) {
                utils.shallowCopy(opts, args.pop());
              } else {
                if (data.settings) {
                  if (data.settings.views) {
                    opts.views = data.settings.views;
                  }
                  if (data.settings["view cache"]) {
                    opts.cache = true;
                  }
                  viewOpts = data.settings["view options"];
                  if (viewOpts) {
                    utils.shallowCopy(opts, viewOpts);
                  }
                }
                utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
              }
              opts.filename = filename;
            } else {
              data = utils.createNullProtoObjWherePossible();
            }
            return tryHandleCache(opts, data, cb);
          };
          exports.Template = Template;
          exports.clearCache = function () {
            exports.cache.reset();
          };
          function Template(text, optsParam) {
            var opts = utils.hasOwnOnlyObject(optsParam);
            var options = utils.createNullProtoObjWherePossible();
            this.templateText = text;
            this.mode = null;
            this.truncate = false;
            this.currentLine = 1;
            this.source = "";
            options.client = opts.client || false;
            options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
            options.compileDebug = opts.compileDebug !== false;
            options.debug = !!opts.debug;
            options.filename = opts.filename;
            options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
            options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
            options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
            options.strict = opts.strict || false;
            options.context = opts.context;
            options.cache = opts.cache || false;
            options.rmWhitespace = opts.rmWhitespace;
            options.root = opts.root;
            options.includer = opts.includer;
            options.outputFunctionName = opts.outputFunctionName;
            options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
            options.views = opts.views;
            options.async = opts.async;
            options.destructuredLocals = opts.destructuredLocals;
            options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
            if (options.strict) {
              options._with = false;
            } else {
              options._with = typeof opts._with != "undefined" ? opts._with : true;
            }
            this.opts = options;
            this.regex = this.createRegex();
          }
          Template.modes = {
            EVAL: "eval",
            ESCAPED: "escaped",
            RAW: "raw",
            COMMENT: "comment",
            LITERAL: "literal"
          };
          Template.prototype = {
            createRegex: function () {
              var str = _REGEX_STRING;
              var delim = utils.escapeRegExpChars(this.opts.delimiter);
              var open = utils.escapeRegExpChars(this.opts.openDelimiter);
              var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
              str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
              return new RegExp(str);
            },
            compile: function () {
              var src;
              var fn;
              var opts = this.opts;
              var prepended = "";
              var appended = "";
              var escapeFn = opts.escapeFunction;
              var ctor;
              var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
              if (!this.source) {
                this.generateSource();
                prepended += '  var __output = "";\n' + "  function __append(s) { if (s !== undefined && s !== null) __output += s }\n";
                if (opts.outputFunctionName) {
                  if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
                    throw new Error("outputFunctionName is not a valid JS identifier.");
                  }
                  prepended += "  var " + opts.outputFunctionName + " = __append;" + "\n";
                }
                if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
                  throw new Error("localsName is not a valid JS identifier.");
                }
                if (opts.destructuredLocals && opts.destructuredLocals.length) {
                  var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
                  for (var i = 0; i < opts.destructuredLocals.length; i++) {
                    var name = opts.destructuredLocals[i];
                    if (!_JS_IDENTIFIER.test(name)) {
                      throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
                    }
                    if (i > 0) {
                      destructuring += ",\n  ";
                    }
                    destructuring += name + " = __locals." + name;
                  }
                  prepended += destructuring + ";\n";
                }
                if (opts._with !== false) {
                  prepended += "  with (" + opts.localsName + " || {}) {" + "\n";
                  appended += "  }" + "\n";
                }
                appended += "  return __output;" + "\n";
                this.source = prepended + this.source + appended;
              }
              if (opts.compileDebug) {
                src = "var __line = 1" + "\n" + "  , __lines = " + JSON.stringify(this.templateText) + "\n" + "  , __filename = " + sanitizedFilename + ";" + "\n" + "try {" + "\n" + this.source + "} catch (e) {" + "\n" + "  rethrow(e, __lines, __filename, __line, escapeFn);" + "\n" + "}" + "\n";
              } else {
                src = this.source;
              }
              if (opts.client) {
                src = "escapeFn = escapeFn || " + escapeFn.toString() + ";" + "\n" + src;
                if (opts.compileDebug) {
                  src = "rethrow = rethrow || " + rethrow.toString() + ";" + "\n" + src;
                }
              }
              if (opts.strict) {
                src = '"use strict";\n' + src;
              }
              if (opts.debug) {
                console.log(src);
              }
              if (opts.compileDebug && opts.filename) {
                src = src + "\n" + "//# sourceURL=" + sanitizedFilename + "\n";
              }
              try {
                if (opts.async) {
                  try {
                    ctor = new Function("return (async function(){}).constructor;")();
                  } catch (e) {
                    if (e instanceof SyntaxError) {
                      throw new Error("This environment does not support async/await");
                    } else {
                      throw e;
                    }
                  }
                } else {
                  ctor = Function;
                }
                fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
              } catch (e) {
                if (e instanceof SyntaxError) {
                  if (opts.filename) {
                    e.message += " in " + opts.filename;
                  }
                  e.message += " while compiling ejs\n\n";
                  e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
                  e.message += "https://github.com/RyanZim/EJS-Lint";
                  if (!opts.async) {
                    e.message += "\n";
                    e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
                  }
                }
                throw e;
              }
              var returnedFn = opts.client ? fn : function anonymous(data) {
                var include = function (path, includeData) {
                  var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
                  if (includeData) {
                    d = utils.shallowCopy(d, includeData);
                  }
                  return includeFile(path, opts)(d);
                };
                return fn.apply(opts.context, [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
              };
              if (opts.filename && typeof Object.defineProperty === "function") {
                var filename = opts.filename;
                var basename = path.basename(filename, path.extname(filename));
                try {
                  Object.defineProperty(returnedFn, "name", {
                    value: basename,
                    writable: false,
                    enumerable: false,
                    configurable: true
                  });
                } catch (e) {}
              }
              return returnedFn;
            },
            generateSource: function () {
              var opts = this.opts;
              if (opts.rmWhitespace) {
                this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
              }
              this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
              var self = this;
              var matches = this.parseTemplateText();
              var d = this.opts.delimiter;
              var o = this.opts.openDelimiter;
              var c = this.opts.closeDelimiter;
              if (matches && matches.length) {
                matches.forEach(function (line, index) {
                  var closing;
                  if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
                    closing = matches[index + 2];
                    if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                      throw new Error('Could not find matching close tag for "' + line + '".');
                    }
                  }
                  self.scanLine(line);
                });
              }
            },
            parseTemplateText: function () {
              var str = this.templateText;
              var pat = this.regex;
              var result = pat.exec(str);
              var arr = [];
              var firstPos;
              while (result) {
                firstPos = result.index;
                if (firstPos !== 0) {
                  arr.push(str.substring(0, firstPos));
                  str = str.slice(firstPos);
                }
                arr.push(result[0]);
                str = str.slice(result[0].length);
                result = pat.exec(str);
              }
              if (str) {
                arr.push(str);
              }
              return arr;
            },
            _addOutput: function (line) {
              if (this.truncate) {
                line = line.replace(/^(?:\r\n|\r|\n)/, "");
                this.truncate = false;
              }
              if (!line) {
                return line;
              }
              line = line.replace(/\\/g, "\\\\");
              line = line.replace(/\n/g, "\\n");
              line = line.replace(/\r/g, "\\r");
              line = line.replace(/"/g, '\\"');
              this.source += '    ; __append("' + line + '")' + "\n";
            },
            scanLine: function (line) {
              var self = this;
              var d = this.opts.delimiter;
              var o = this.opts.openDelimiter;
              var c = this.opts.closeDelimiter;
              var newLineCount = 0;
              newLineCount = line.split("\n").length - 1;
              switch (line) {
                case o + d:
                case o + d + "_":
                  this.mode = Template.modes.EVAL;
                  break;
                case o + d + "=":
                  this.mode = Template.modes.ESCAPED;
                  break;
                case o + d + "-":
                  this.mode = Template.modes.RAW;
                  break;
                case o + d + "#":
                  this.mode = Template.modes.COMMENT;
                  break;
                case o + d + d:
                  this.mode = Template.modes.LITERAL;
                  this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")' + "\n";
                  break;
                case d + d + c:
                  this.mode = Template.modes.LITERAL;
                  this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")' + "\n";
                  break;
                case d + c:
                case "-" + d + c:
                case "_" + d + c:
                  if (this.mode == Template.modes.LITERAL) {
                    this._addOutput(line);
                  }
                  this.mode = null;
                  this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
                  break;
                default:
                  if (this.mode) {
                    switch (this.mode) {
                      case Template.modes.EVAL:
                      case Template.modes.ESCAPED:
                      case Template.modes.RAW:
                        if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                          line += "\n";
                        }
                    }
                    switch (this.mode) {
                      case Template.modes.EVAL:
                        this.source += "    ; " + line + "\n";
                        break;
                      case Template.modes.ESCAPED:
                        this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))" + "\n";
                        break;
                      case Template.modes.RAW:
                        this.source += "    ; __append(" + stripSemi(line) + ")" + "\n";
                        break;
                      case Template.modes.COMMENT:
                        break;
                      case Template.modes.LITERAL:
                        this._addOutput(line);
                        break;
                    }
                  } else {
                    this._addOutput(line);
                  }
              }
              if (self.opts.compileDebug && newLineCount) {
                this.currentLine += newLineCount;
                this.source += "    ; __line = " + this.currentLine + "\n";
              }
            }
          };
          exports.escapeXML = utils.escapeXML;
          exports.__express = exports.renderFile;
          exports.VERSION = _VERSION_STRING;
          exports.name = _NAME;
          if (typeof window != "undefined") {
            window.ejs = exports;
          }
        }, {
          "../package.json": 6,
          "./utils": 2,
          fs: 3,
          path: 4
        }],
        2: [function (require, module, exports) {

          var regExpChars = /[|\\{}()[\]^$+*?.]/g;
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var hasOwn = function (obj, key) {
            return hasOwnProperty.apply(obj, [key]);
          };
          exports.escapeRegExpChars = function (string) {
            if (!string) {
              return "";
            }
            return String(string).replace(regExpChars, "\\$&");
          };
          var _ENCODE_HTML_RULES = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&#34;",
            "'": "&#39;"
          };
          var _MATCH_HTML = /[&<>'"]/g;
          function encode_char(c) {
            return _ENCODE_HTML_RULES[c] || c;
          }
          var escapeFuncStr = "var _ENCODE_HTML_RULES = {\n" + '      "&": "&amp;"\n' + '    , "<": "&lt;"\n' + '    , ">": "&gt;"\n' + '    , \'"\': "&#34;"\n' + '    , "\'": "&#39;"\n' + "    }\n" + "  , _MATCH_HTML = /[&<>'\"]/g;\n" + "function encode_char(c) {\n" + "  return _ENCODE_HTML_RULES[c] || c;\n" + "};\n";
          exports.escapeXML = function (markup) {
            return markup == undefined ? "" : String(markup).replace(_MATCH_HTML, encode_char);
          };
          function escapeXMLToString() {
            return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
          }
          try {
            if (typeof Object.defineProperty === "function") {
              Object.defineProperty(exports.escapeXML, "toString", {
                value: escapeXMLToString
              });
            } else {
              exports.escapeXML.toString = escapeXMLToString;
            }
          } catch (err) {
            console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
          }
          exports.shallowCopy = function (to, from) {
            from = from || {};
            if (to !== null && to !== undefined) {
              for (var p in from) {
                if (!hasOwn(from, p)) {
                  continue;
                }
                if (p === "__proto__" || p === "constructor") {
                  continue;
                }
                to[p] = from[p];
              }
            }
            return to;
          };
          exports.shallowCopyFromList = function (to, from, list) {
            list = list || [];
            from = from || {};
            if (to !== null && to !== undefined) {
              for (var i = 0; i < list.length; i++) {
                var p = list[i];
                if (typeof from[p] != "undefined") {
                  if (!hasOwn(from, p)) {
                    continue;
                  }
                  if (p === "__proto__" || p === "constructor") {
                    continue;
                  }
                  to[p] = from[p];
                }
              }
            }
            return to;
          };
          exports.cache = {
            _data: {},
            set: function (key, val) {
              this._data[key] = val;
            },
            get: function (key) {
              return this._data[key];
            },
            remove: function (key) {
              delete this._data[key];
            },
            reset: function () {
              this._data = {};
            }
          };
          exports.hyphenToCamel = function (str) {
            return str.replace(/-[a-z]/g, function (match) {
              return match[1].toUpperCase();
            });
          };
          exports.createNullProtoObjWherePossible = function () {
            if (typeof Object.create == "function") {
              return function () {
                return Object.create(null);
              };
            }
            if (!({
              __proto__: null
            } instanceof Object)) {
              return function () {
                return {
                  __proto__: null
                };
              };
            }
            return function () {
              return {};
            };
          }();
          exports.hasOwnOnlyObject = function (obj) {
            var o = exports.createNullProtoObjWherePossible();
            for (var p in obj) {
              if (hasOwn(obj, p)) {
                o[p] = obj[p];
              }
            }
            return o;
          };
        }, {}],
        3: [function (require, module, exports) {}, {}],
        4: [function (require, module, exports) {
          (function (process) {
            function normalizeArray(parts, allowAboveRoot) {
              var up = 0;
              for (var i = parts.length - 1; i >= 0; i--) {
                var last = parts[i];
                if (last === ".") {
                  parts.splice(i, 1);
                } else if (last === "..") {
                  parts.splice(i, 1);
                  up++;
                } else if (up) {
                  parts.splice(i, 1);
                  up--;
                }
              }
              if (allowAboveRoot) {
                for (; up--; up) {
                  parts.unshift("..");
                }
              }
              return parts;
            }
            exports.resolve = function () {
              var resolvedPath = "",
                resolvedAbsolute = false;
              for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                var path = i >= 0 ? arguments[i] : process.cwd();
                if (typeof path !== "string") {
                  throw new TypeError("Arguments to path.resolve must be strings");
                } else if (!path) {
                  continue;
                }
                resolvedPath = path + "/" + resolvedPath;
                resolvedAbsolute = path.charAt(0) === "/";
              }
              resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function (p) {
                return !!p;
              }), !resolvedAbsolute).join("/");
              return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
            };
            exports.normalize = function (path) {
              var isAbsolute = exports.isAbsolute(path),
                trailingSlash = substr(path, -1) === "/";
              path = normalizeArray(filter(path.split("/"), function (p) {
                return !!p;
              }), !isAbsolute).join("/");
              if (!path && !isAbsolute) {
                path = ".";
              }
              if (path && trailingSlash) {
                path += "/";
              }
              return (isAbsolute ? "/" : "") + path;
            };
            exports.isAbsolute = function (path) {
              return path.charAt(0) === "/";
            };
            exports.join = function () {
              var paths = Array.prototype.slice.call(arguments, 0);
              return exports.normalize(filter(paths, function (p, index) {
                if (typeof p !== "string") {
                  throw new TypeError("Arguments to path.join must be strings");
                }
                return p;
              }).join("/"));
            };
            exports.relative = function (from, to) {
              from = exports.resolve(from).substr(1);
              to = exports.resolve(to).substr(1);
              function trim(arr) {
                var start = 0;
                for (; start < arr.length; start++) {
                  if (arr[start] !== "") break;
                }
                var end = arr.length - 1;
                for (; end >= 0; end--) {
                  if (arr[end] !== "") break;
                }
                if (start > end) return [];
                return arr.slice(start, end - start + 1);
              }
              var fromParts = trim(from.split("/"));
              var toParts = trim(to.split("/"));
              var length = Math.min(fromParts.length, toParts.length);
              var samePartsLength = length;
              for (var i = 0; i < length; i++) {
                if (fromParts[i] !== toParts[i]) {
                  samePartsLength = i;
                  break;
                }
              }
              var outputParts = [];
              for (var i = samePartsLength; i < fromParts.length; i++) {
                outputParts.push("..");
              }
              outputParts = outputParts.concat(toParts.slice(samePartsLength));
              return outputParts.join("/");
            };
            exports.sep = "/";
            exports.delimiter = ":";
            exports.dirname = function (path) {
              if (typeof path !== "string") path = path + "";
              if (path.length === 0) return ".";
              var code = path.charCodeAt(0);
              var hasRoot = code === 47;
              var end = -1;
              var matchedSlash = true;
              for (var i = path.length - 1; i >= 1; --i) {
                code = path.charCodeAt(i);
                if (code === 47) {
                  if (!matchedSlash) {
                    end = i;
                    break;
                  }
                } else {
                  matchedSlash = false;
                }
              }
              if (end === -1) return hasRoot ? "/" : ".";
              if (hasRoot && end === 1) {
                return "/";
              }
              return path.slice(0, end);
            };
            function basename(path) {
              if (typeof path !== "string") path = path + "";
              var start = 0;
              var end = -1;
              var matchedSlash = true;
              var i;
              for (i = path.length - 1; i >= 0; --i) {
                if (path.charCodeAt(i) === 47) {
                  if (!matchedSlash) {
                    start = i + 1;
                    break;
                  }
                } else if (end === -1) {
                  matchedSlash = false;
                  end = i + 1;
                }
              }
              if (end === -1) return "";
              return path.slice(start, end);
            }
            exports.basename = function (path, ext) {
              var f = basename(path);
              if (ext && f.substr(-1 * ext.length) === ext) {
                f = f.substr(0, f.length - ext.length);
              }
              return f;
            };
            exports.extname = function (path) {
              if (typeof path !== "string") path = path + "";
              var startDot = -1;
              var startPart = 0;
              var end = -1;
              var matchedSlash = true;
              var preDotState = 0;
              for (var i = path.length - 1; i >= 0; --i) {
                var code = path.charCodeAt(i);
                if (code === 47) {
                  if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                  }
                  continue;
                }
                if (end === -1) {
                  matchedSlash = false;
                  end = i + 1;
                }
                if (code === 46) {
                  if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
                } else if (startDot !== -1) {
                  preDotState = -1;
                }
              }
              if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
                return "";
              }
              return path.slice(startDot, end);
            };
            function filter(xs, f) {
              if (xs.filter) return xs.filter(f);
              var res = [];
              for (var i = 0; i < xs.length; i++) {
                if (f(xs[i], i, xs)) res.push(xs[i]);
              }
              return res;
            }
            var substr = "ab".substr(-1) === "b" ? function (str, start, len) {
              return str.substr(start, len);
            } : function (str, start, len) {
              if (start < 0) start = str.length + start;
              return str.substr(start, len);
            };
          }).call(this, require("_process"));
        }, {
          _process: 5
        }],
        5: [function (require, module, exports) {
          var process = module.exports = {};
          var cachedSetTimeout;
          var cachedClearTimeout;
          function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
          }
          function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
          }
          (function () {
            try {
              if (typeof setTimeout === "function") {
                cachedSetTimeout = setTimeout;
              } else {
                cachedSetTimeout = defaultSetTimout;
              }
            } catch (e) {
              cachedSetTimeout = defaultSetTimout;
            }
            try {
              if (typeof clearTimeout === "function") {
                cachedClearTimeout = clearTimeout;
              } else {
                cachedClearTimeout = defaultClearTimeout;
              }
            } catch (e) {
              cachedClearTimeout = defaultClearTimeout;
            }
          })();
          function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
              return setTimeout(fun, 0);
            }
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
              cachedSetTimeout = setTimeout;
              return setTimeout(fun, 0);
            }
            try {
              return cachedSetTimeout(fun, 0);
            } catch (e) {
              try {
                return cachedSetTimeout.call(null, fun, 0);
              } catch (e) {
                return cachedSetTimeout.call(this, fun, 0);
              }
            }
          }
          function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
              return clearTimeout(marker);
            }
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
              cachedClearTimeout = clearTimeout;
              return clearTimeout(marker);
            }
            try {
              return cachedClearTimeout(marker);
            } catch (e) {
              try {
                return cachedClearTimeout.call(null, marker);
              } catch (e) {
                return cachedClearTimeout.call(this, marker);
              }
            }
          }
          var queue = [];
          var draining = false;
          var currentQueue;
          var queueIndex = -1;
          function cleanUpNextTick() {
            if (!draining || !currentQueue) {
              return;
            }
            draining = false;
            if (currentQueue.length) {
              queue = currentQueue.concat(queue);
            } else {
              queueIndex = -1;
            }
            if (queue.length) {
              drainQueue();
            }
          }
          function drainQueue() {
            if (draining) {
              return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            while (len) {
              currentQueue = queue;
              queue = [];
              while (++queueIndex < len) {
                if (currentQueue) {
                  currentQueue[queueIndex].run();
                }
              }
              queueIndex = -1;
              len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
          }
          process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
              for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
              }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
              runTimeout(drainQueue);
            }
          };
          function Item(fun, array) {
            this.fun = fun;
            this.array = array;
          }
          Item.prototype.run = function () {
            this.fun.apply(null, this.array);
          };
          process.title = "browser";
          process.browser = true;
          process.env = {};
          process.argv = [];
          process.version = "";
          process.versions = {};
          function noop() {}
          process.on = noop;
          process.addListener = noop;
          process.once = noop;
          process.off = noop;
          process.removeListener = noop;
          process.removeAllListeners = noop;
          process.emit = noop;
          process.prependListener = noop;
          process.prependOnceListener = noop;
          process.listeners = function (name) {
            return [];
          };
          process.binding = function (name) {
            throw new Error("process.binding is not supported");
          };
          process.cwd = function () {
            return "/";
          };
          process.chdir = function (dir) {
            throw new Error("process.chdir is not supported");
          };
          process.umask = function () {
            return 0;
          };
        }, {}],
        6: [function (require, module, exports) {
          module.exports = {
            name: "ejs",
            description: "Embedded JavaScript templates",
            keywords: ["template", "engine", "ejs"],
            version: "3.1.9",
            author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
            license: "Apache-2.0",
            bin: {
              ejs: "./bin/cli.js"
            },
            main: "./lib/ejs.js",
            jsdelivr: "ejs.min.js",
            unpkg: "ejs.min.js",
            repository: {
              type: "git",
              url: "git://github.com/mde/ejs.git"
            },
            bugs: "https://github.com/mde/ejs/issues",
            homepage: "https://github.com/mde/ejs",
            dependencies: {
              jake: "^10.8.5"
            },
            devDependencies: {
              browserify: "^16.5.1",
              eslint: "^6.8.0",
              "git-directory-deploy": "^1.5.1",
              jsdoc: "^4.0.2",
              "lru-cache": "^4.0.1",
              mocha: "^10.2.0",
              "uglify-js": "^3.3.16"
            },
            engines: {
              node: ">=0.10.0"
            },
            scripts: {
              test: "npx jake test"
            }
          };
        }, {}]
      }, {}, [1])(1);
    });
  })(ejs_min, ejs_min.exports);
  ejs_min.exports;

  var fieldPrivate = {
    /**
     * Формирование контента
     * @param {FieldSelect2} field
     * @return {*}
     * @private
     */
    renderContent: function renderContent(field) {
      var that = this;
      var options = field.getOptions();
      var attributes = [];
      var selectOptions = [];
      if (!options.hasOwnProperty('attr') || _typeof(options.attr) !== 'object' || options.attr === null || Array.isArray(options.attr)) {
        options.attr = {};
      }
      if (options.name) {
        options.attr.name = field._options.name;
      }
      if (options.width) {
        options.attr = utils.mergeAttr({
          style: 'width:' + options.width
        }, options.attr);
      }
      if (options.required) {
        options.attr.required = 'required';
      }
      $.each(field._selectOptions, function (key, option) {
        if (typeof option === 'string' || typeof option === 'number') {
          selectOptions.push(that.renderOption(field._value, {
            type: 'option',
            value: key,
            text: option
          }));
        } else if (_typeof(option) === 'object') {
          var type = option.hasOwnProperty('type') && typeof option.type === 'string' ? option.type : 'option';
          if (type === 'group') {
            var renderAttr = [];
            var groupAttr = {};
            var groupOptions = [];
            if (option.hasOwnProperty('attr') && _typeof(option.attr) === 'object' && option.attr !== null && !Array.isArray(option.attr)) {
              groupAttr = option.attr;
            }
            if (option.hasOwnProperty('label') && ['string', 'number'].indexOf(_typeof(option.label)) >= 0) {
              groupAttr.label = option.label;
            }
            $.each(groupAttr, function (name, value) {
              renderAttr.push(name + '="' + value + '"');
            });
            if (Array.isArray(option.options)) {
              $.each(option.options, function (key, groupOption) {
                groupOptions.push(that.renderOption(field._value, groupOption));
              });
            }
            selectOptions.push({
              type: 'group',
              attr: renderAttr.length > 0 ? ' ' + renderAttr.join(' ') : '',
              options: groupOptions
            });
          } else {
            selectOptions.push(that.renderOption(field._value, option));
          }
        }
      });
      $.each(options.attr, function (name, value) {
        attributes.push(name + '="' + value + '"');
      });
      return ejs.render(tpl['select.html'], {
        readonly: false,
        options: selectOptions,
        attr: attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      });
    },
    /**
     * @param {FieldSelect2} field
     * @return {string}
     * @private
     */
    renderContentReadonly: function renderContentReadonly(field) {
      var that = field;
      var options = field.getOptions();
      var selectedOptions = [];
      if (options.hasOwnProperty('options') && _typeof(options.options) === 'object' && Array.isArray(options.options)) {
        $.each(options.options, function (key, option) {
          var type = option.hasOwnProperty('type') && typeof option.type === 'string' ? option.type : 'option';
          if (type === 'group') {
            if (Array.isArray(option.options)) {
              $.each(option.options, function (key, groupOption) {
                var optionText = groupOption.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(groupOption.text)) >= 0 ? groupOption.text : '';
                if (!optionText || optionText === '') {
                  return;
                }
                if (Array.isArray(that._value)) {
                  $.each(that._value, function (key, itemValue) {
                    if (itemValue == groupOption.value) {
                      selectedOptions.push(optionText);
                      return false;
                    }
                  });
                } else if (that._value == groupOption.value) {
                  selectedOptions.push(optionText);
                }
              });
            }
          } else {
            var optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(option.text)) >= 0 ? option.text : '';
            if (!optionText || optionText === '') {
              return;
            }
            if (Array.isArray(that._value)) {
              $.each(that._value, function (key, itemValue) {
                if (itemValue == option.value) {
                  selectedOptions.push(optionText);
                  return false;
                }
              });
            } else if (that._value == option.value) {
              selectedOptions.push(optionText);
            }
          }
        });
      }
      return ejs.render(tpl['select.html'], {
        readonly: true,
        selectedOptions: selectedOptions
      });
    },
    /**
     * Сборка опции
     * @param {string|Array} value
     * @param {object}       option
     * @return {object}
     * @private
     */
    renderOption: function renderOption(value, option) {
      var optionAttr = [];
      var optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(option.text)) >= 0 ? option.text : '';
      $.each(option, function (name, value) {
        if (name !== 'text') {
          optionAttr.push(name + '="' + value + '"');
        }
      });
      if (Array.isArray(value)) {
        $.each(value, function (key, itemValue) {
          if (itemValue == option.value) {
            optionAttr.push('selected="selected"');
            return false;
          }
        });
      } else if (value == option.value) {
        optionAttr.push('selected="selected"');
      }
      return {
        type: 'option',
        text: optionText,
        attr: optionAttr.length > 0 ? ' ' + optionAttr.join(' ') : ''
      };
    },
    /**
     * Инициализация событий
     * @param {FieldSelect2} field
     * @private
     */
    initEvents: function initEvents(field) {
      var options = field.getOptions();
      var select2Options = options.hasOwnProperty('select2') && utils.isObject(options.select2) ? options.select2 : {};
      if (!select2Options.hasOwnProperty('theme')) {
        select2Options.theme = "bootstrap-5";
      }
      if (!select2Options.hasOwnProperty('language')) {
        var formOptions = field._form.getOptions();
        if (typeof formOptions.lang === 'string') {
          select2Options.language = formOptions.lang;
        }
      }
      if (!select2Options.hasOwnProperty('closeOnSelect') && options.hasOwnProperty('attr') && utils.isObject(options.attr) && options.attr && options.attr.hasOwnProperty('multiple')) {
        select2Options.closeOnSelect = false;
      }
      select2(null, $);
      $('.content-' + field.getContentId() + ' select').select2(select2Options);
    }
  };

  /**
   *
   */
  var FieldSelect2 = /*#__PURE__*/function () {
    /**
     * Инициализация
     * @param {object} form
     * @param {object} options
     */
    function FieldSelect2(form, options) {
      _classCallCheck(this, FieldSelect2);
      _defineProperty(this, "_id", null);
      _defineProperty(this, "_form", null);
      _defineProperty(this, "_contentId", '');
      _defineProperty(this, "_readonly", null);
      _defineProperty(this, "_value", null);
      _defineProperty(this, "_selectOptions", []);
      _defineProperty(this, "_options", {
        type: 'select2',
        name: null,
        label: null,
        labelWidth: null,
        width: null,
        description: null,
        descriptionHelp: null,
        invalidText: null,
        validText: null,
        fields: null,
        attr: {
          "class": 'form-select d-inline-block'
        },
        required: null,
        readonly: null,
        show: true,
        position: null,
        noSend: null,
        options: [],
        select2: {}
      });
      if (options.hasOwnProperty('options') && _typeof(options.options) === 'object' && options.options !== null) {
        this._selectOptions = options.options;
        options.options = [];
      }
      this._form = form;
      this._id = options.hasOwnProperty('id') && typeof options.id === 'string' ? options.id : '';
      this._contentId = options.hasOwnProperty('contentId') && typeof options.contentId === 'string' ? options.contentId : '';
      this._readonly = options.hasOwnProperty('readonly') && typeof options.readonly === 'boolean' ? options.readonly : false;
      this._value = options.hasOwnProperty('value') && ['string', 'number', 'object'].indexOf(_typeof(options.value)) >= 0 ? options.value : null;
      this._options = $.extend(true, this._options, options);
      if (!this._readonly) {
        var that = this;
        form.on('show', function () {
          fieldPrivate.initEvents(that);
        });
      }
    }

    /**
     * Получение id поля
     * @return {string}
     */
    return _createClass(FieldSelect2, [{
      key: "getId",
      value: function getId() {
        return this._id;
      }

      /**
       * Получение id контентаполя
       * @return {string}
       */
    }, {
      key: "getContentId",
      value: function getContentId() {
        return this._contentId;
      }

      /**
       * Получение параметров
       * @returns {object}
       */
    }, {
      key: "getOptions",
      value: function getOptions() {
        return $.extend(true, {}, this._options);
      }

      /**
       * Показ поля
       * @param {int} duration
       */
    }, {
      key: "show",
      value: function show(duration) {
        $('#coreui-form-' + this.getId()).addClass('d-flex').removeClass('d-none').css('opacity', 0).animate({
          opacity: 1
        }, duration || 200, function () {
          $(this).css('opacity', '');
        });
      }

      /**
       * Скрытие поля
       * @param {int} duration
       */
    }, {
      key: "hide",
      value: function hide(duration) {
        $('#coreui-form-' + this.getId()).animate({
          opacity: 0
        }, duration || 200, function () {
          $(this).removeClass('d-flex').addClass('d-none').css('opacity', '');
        });
      }

      /**
       * Изменение режима поля только для чтения
       * @param {boolean} isReadonly
       */
    }, {
      key: "readonly",
      value: function readonly(isReadonly) {
        this._value = this.getValue();
        this._readonly = !!isReadonly;
        $('.content-' + this._contentId).html(this.renderContent());
        if (!isReadonly) {
          fieldPrivate.initEvents(this);
        }
      }

      /**
       * Получение значения из поля
       * @returns {array|string}
       */
    }, {
      key: "getValue",
      value: function getValue() {
        if (this._readonly) {
          return this._value;
        } else {
          if (this._options.hasOwnProperty('attr') && _typeof(this._options.attr) === 'object' && this._options.attr !== null && !Array.isArray(this._options.attr) && this._options.attr.hasOwnProperty('multiple')) {
            var values = [];
            $('.content-' + this.getContentId() + ' select option:selected').each(function () {
              values.push($(this).val());
            });
            return values;
          } else {
            return $('.content-' + this.getContentId() + ' select option:selected').val();
          }
        }
      }

      /**
       * Установка значения в поле
       * @param {string} value
       */
    }, {
      key: "setValue",
      value: function setValue(value) {
        if (['string', 'number', 'object'].indexOf(_typeof(value)) < 0) {
          return;
        }
        if (_typeof(value) === 'object') {
          if (value !== null && !Array.isArray(value)) {
            return;
          }
        } else {
          value = [value];
        }
        var that = this;
        var contentId = this.getContentId();
        this._value = [];
        if (this._readonly) {
          $('.content-' + contentId).empty();
          if (Array.isArray(this._selectOptions) && Array.isArray(value)) {
            var selectedItems = [];
            $.each(this._selectOptions, function (key, option) {
              if (option.hasOwnProperty('value')) {
                $.each(value, function (key, val) {
                  if (option.value == val) {
                    if (option.hasOwnProperty('text') && ['string', 'number'].indexOf(_typeof(option.text)) >= 0) {
                      selectedItems.push(option.text);
                    }
                    that._value.push(val);
                    return false;
                  }
                });
              }
            });
            $('.content-' + contentId).text(selectedItems.join(', '));
          }
        } else {
          $('.content-' + contentId + ' select > option').prop('selected', false);
          if (Array.isArray(value)) {
            $('.content-' + contentId + ' select > option').each(function (key, itemValue) {
              $.each(value, function (key, val) {
                if (val == $(itemValue).val()) {
                  $(itemValue).prop('selected', true);
                  that._value.push(val);
                  return false;
                }
              });
            });
          }
        }
      }

      /**
       * Установка валидности поля
       * @param {boolean|null} isValid
       * @param {string} text
       */
    }, {
      key: "validate",
      value: function validate(isValid, text) {
        if (this._readonly) {
          return;
        }
        var container = $('.content-' + this.getContentId());
        var select = $('select', container);
        container.find('.valid-feedback').remove();
        container.find('.invalid-feedback').remove();
        if (isValid === null) {
          select.removeClass('is-invalid');
          select.removeClass('is-valid');
        } else if (isValid) {
          select.removeClass('is-invalid');
          select.addClass('is-valid');
          if (typeof text === 'undefined' && typeof this._options.validText === 'string') {
            text = this._options.validText;
          }
          if (typeof text === 'string') {
            container.append('<div class="valid-feedback">' + text + '</div>');
          }
        } else {
          select.removeClass('is-valid');
          select.addClass('is-invalid');
          if (typeof text === 'undefined') {
            if (typeof this._options.invalidText === 'string') {
              text = this._options.invalidText;
            } else if (!text && this._options.required) {
              text = this._form.getLang().required_field;
            }
          }
          if (typeof text === 'string') {
            container.append('<div class="invalid-feedback">' + text + '</div>');
          }
        }
      }

      /**
       * Проверка валидности поля
       * @return {boolean|null}
       */
    }, {
      key: "isValid",
      value: function isValid() {
        var select = $('.content-' + this.getContentId() + ' select');
        if (this._options.required && select.val() === '') {
          return false;
        }
        if (select[0]) {
          return select.is(':valid');
        }
        return null;
      }

      /**
       * Проверка на то, что поле можно отправлять
       * @return {boolean}
       */
    }, {
      key: "isAlloySend",
      value: function isAlloySend() {
        return !this._options.noSend;
      }

      /**
       * Формирование контента поля
       * @return {*}
       */
    }, {
      key: "renderContent",
      value: function renderContent() {
        return this._readonly ? fieldPrivate.renderContentReadonly(this) : fieldPrivate.renderContent(this);
      }
    }]);
  }();

  return FieldSelect2;

}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL3RlbXBsYXRlcy5qcyIsInNyYy9qcy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY3QyL2Rpc3QvanMvc2VsZWN0Mi5qcyIsIm5vZGVfbW9kdWxlcy9lanMvZWpzLm1pbi5qcyIsInNyYy9qcy9maWVsZC5wcml2YXRlLmpzIiwic3JjL2pzL2ZpZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCB0cGwgPSBPYmplY3QuY3JlYXRlKG51bGwpXG50cGxbJ3NlbGVjdC5odG1sJ10gPSAnPCUgaWYgKHJlYWRvbmx5KSB7ICU+IDxkaXYgY2xhc3M9XCJjb3JldWktZm9ybV9fZmllbGQtcmVhZG9ubHkgY29sLWZvcm0tbGFiZWxcIj48JT0gc2VsZWN0T3B0aW9ucy5qb2luKFxcJywgXFwnKSAlPjwvZGl2PiA8JSB9IGVsc2UgeyAlPiA8c2VsZWN0IDwlLSBhdHRyICU+PiA8JSAkLmVhY2gob3B0aW9ucywgZnVuY3Rpb24oa2V5LCBvcHRpb24pIHsgJT4gPCUgaWYgKG9wdGlvbi50eXBlID09PSBcXCdncm91cFxcJykgeyAlPiA8b3B0Z3JvdXA8JS0gb3B0aW9uLmF0dHIgJT4vPiA8JSAkLmVhY2gob3B0aW9uLm9wdGlvbnMsIGZ1bmN0aW9uKGtleSwgZ3JvdXBPcHRpb24pIHsgJT4gPG9wdGlvbiA8JS0gZ3JvdXBPcHRpb24uYXR0ciAlPi8+PCU9IGdyb3VwT3B0aW9uLnRleHQgJT48L29wdGlvbj4gPCUgfSk7ICU+IDwvb3B0Z3JvdXA+IDwlIH0gZWxzZSB7ICU+IDxvcHRpb24gPCUtIG9wdGlvbi5hdHRyICU+Lz48JT0gb3B0aW9uLnRleHQgJT48L29wdGlvbj4gPCUgfSAlPiA8JSB9KTsgJT4gPC9zZWxlY3Q+IDwlIH0gJT4nO1xuZXhwb3J0IGRlZmF1bHQgdHBsOyIsIlxyXG5sZXQgdXRpbHMgPSB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J7QsdGK0LXQtNC40L3QtdC90LjQtSDQsNGC0YDQuNCx0YPRgtC+0LJcclxuICAgICAqIEBwYXJhbSBhdHRyMVxyXG4gICAgICogQHBhcmFtIGF0dHIyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBtZXJnZUF0dHI6IGZ1bmN0aW9uIChhdHRyMSwgYXR0cjIpIHtcclxuXHJcbiAgICAgICAgbGV0IG1lcmdlQXR0ciA9IE9iamVjdC5hc3NpZ24oe30sIGF0dHIxKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyMiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgJC5lYWNoKGF0dHIyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXJnZUF0dHIuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2NsYXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZUF0dHJbbmFtZV0gKz0gJyAnICsgdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3N0eWxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZUF0dHJbbmFtZV0gKz0gJzsnICsgdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlQXR0cltuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlQXR0cltuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXJnZUF0dHI7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0YDQvtCy0LXRgNC60LAg0L3QsCDQvtCx0YrQtdC60YJcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBpc09iamVjdDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgICEgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiZcclxuICAgICAgICAgICAgdmFsdWUgIT09IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHV0aWxzOyIsIi8qIVxuICogU2VsZWN0MiA0LjEuMC1yYy4wXG4gKiBodHRwczovL3NlbGVjdDIuZ2l0aHViLmlvXG4gKlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc2VsZWN0Mi9zZWxlY3QyL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuOyhmdW5jdGlvbiAoZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyb290LCBqUXVlcnkpIHtcbiAgICAgIGlmIChqUXVlcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyByZXF1aXJlKCdqUXVlcnknKSByZXR1cm5zIGEgZmFjdG9yeSB0aGF0IHJlcXVpcmVzIHdpbmRvdyB0b1xuICAgICAgICAvLyBidWlsZCBhIGpRdWVyeSBpbnN0YW5jZSwgd2Ugbm9ybWFsaXplIGhvdyB3ZSB1c2UgbW9kdWxlc1xuICAgICAgICAvLyB0aGF0IHJlcXVpcmUgdGhpcyBwYXR0ZXJuIGJ1dCB0aGUgd2luZG93IHByb3ZpZGVkIGlzIGEgbm9vcFxuICAgICAgICAvLyBpZiBpdCdzIGRlZmluZWQgKGhvdyBqcXVlcnkgd29ya3MpXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpKHJvb3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgICByZXR1cm4galF1ZXJ5O1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZmFjdG9yeShqUXVlcnkpO1xuICB9XG59IChmdW5jdGlvbiAoalF1ZXJ5KSB7XG4gIC8vIFRoaXMgaXMgbmVlZGVkIHNvIHdlIGNhbiBjYXRjaCB0aGUgQU1EIGxvYWRlciBjb25maWd1cmF0aW9uIGFuZCB1c2UgaXRcbiAgLy8gVGhlIGlubmVyIGZpbGUgc2hvdWxkIGJlIHdyYXBwZWQgKGJ5IGBiYW5uZXIuc3RhcnQuanNgKSBpbiBhIGZ1bmN0aW9uIHRoYXRcbiAgLy8gcmV0dXJucyB0aGUgQU1EIGxvYWRlciByZWZlcmVuY2VzLlxuICB2YXIgUzIgPShmdW5jdGlvbiAoKSB7XG4gIC8vIFJlc3RvcmUgdGhlIFNlbGVjdDIgQU1EIGxvYWRlciBzbyBpdCBjYW4gYmUgdXNlZFxuICAvLyBOZWVkZWQgbW9zdGx5IGluIHRoZSBsYW5ndWFnZSBmaWxlcywgd2hlcmUgdGhlIGxvYWRlciBpcyBub3QgaW5zZXJ0ZWRcbiAgaWYgKGpRdWVyeSAmJiBqUXVlcnkuZm4gJiYgalF1ZXJ5LmZuLnNlbGVjdDIgJiYgalF1ZXJ5LmZuLnNlbGVjdDIuYW1kKSB7XG4gICAgdmFyIFMyID0galF1ZXJ5LmZuLnNlbGVjdDIuYW1kO1xuICB9XG52YXIgUzI7KGZ1bmN0aW9uICgpIHsgaWYgKCFTMiB8fCAhUzIucmVxdWlyZWpzKSB7XG5pZiAoIVMyKSB7IFMyID0ge307IH0gZWxzZSB7IHJlcXVpcmUgPSBTMjsgfVxuLyoqXG4gKiBAbGljZW5zZSBhbG1vbmQgMC4zLjMgQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMuXG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSwgaHR0cDovL2dpdGh1Yi5jb20vcmVxdWlyZWpzL2FsbW9uZC9MSUNFTlNFXG4gKi9cbi8vR29pbmcgc2xvcHB5IHRvIGF2b2lkICd1c2Ugc3RyaWN0JyBzdHJpbmcgY29zdCwgYnV0IHN0cmljdCBwcmFjdGljZXMgc2hvdWxkXG4vL2JlIGZvbGxvd2VkLlxuLypnbG9iYWwgc2V0VGltZW91dDogZmFsc2UgKi9cblxudmFyIHJlcXVpcmVqcywgcmVxdWlyZSwgZGVmaW5lO1xuKGZ1bmN0aW9uICh1bmRlZikge1xuICAgIHZhciBtYWluLCByZXEsIG1ha2VNYXAsIGhhbmRsZXJzLFxuICAgICAgICBkZWZpbmVkID0ge30sXG4gICAgICAgIHdhaXRpbmcgPSB7fSxcbiAgICAgICAgY29uZmlnID0ge30sXG4gICAgICAgIGRlZmluaW5nID0ge30sXG4gICAgICAgIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICAgIGFwcyA9IFtdLnNsaWNlLFxuICAgICAgICBqc1N1ZmZpeFJlZ0V4cCA9IC9cXC5qcyQvO1xuXG4gICAgZnVuY3Rpb24gaGFzUHJvcChvYmosIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIGhhc093bi5jYWxsKG9iaiwgcHJvcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSByZWxhdGl2ZSBtb2R1bGUgbmFtZSwgbGlrZSAuL3NvbWV0aGluZywgbm9ybWFsaXplIGl0IHRvXG4gICAgICogYSByZWFsIG5hbWUgdGhhdCBjYW4gYmUgbWFwcGVkIHRvIGEgcGF0aC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGUgcmVsYXRpdmUgbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlTmFtZSBhIHJlYWwgbmFtZSB0aGF0IHRoZSBuYW1lIGFyZyBpcyByZWxhdGl2ZVxuICAgICAqIHRvLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IG5vcm1hbGl6ZWQgbmFtZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZShuYW1lLCBiYXNlTmFtZSkge1xuICAgICAgICB2YXIgbmFtZVBhcnRzLCBuYW1lU2VnbWVudCwgbWFwVmFsdWUsIGZvdW5kTWFwLCBsYXN0SW5kZXgsXG4gICAgICAgICAgICBmb3VuZEksIGZvdW5kU3Rhck1hcCwgc3RhckksIGksIGosIHBhcnQsIG5vcm1hbGl6ZWRCYXNlUGFydHMsXG4gICAgICAgICAgICBiYXNlUGFydHMgPSBiYXNlTmFtZSAmJiBiYXNlTmFtZS5zcGxpdChcIi9cIiksXG4gICAgICAgICAgICBtYXAgPSBjb25maWcubWFwLFxuICAgICAgICAgICAgc3Rhck1hcCA9IChtYXAgJiYgbWFwWycqJ10pIHx8IHt9O1xuXG4gICAgICAgIC8vQWRqdXN0IGFueSByZWxhdGl2ZSBwYXRocy5cbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBsYXN0SW5kZXggPSBuYW1lLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIC8vIElmIHdhbnRpbmcgbm9kZSBJRCBjb21wYXRpYmlsaXR5LCBzdHJpcCAuanMgZnJvbSBlbmRcbiAgICAgICAgICAgIC8vIG9mIElEcy4gSGF2ZSB0byBkbyB0aGlzIGhlcmUsIGFuZCBub3QgaW4gbmFtZVRvVXJsXG4gICAgICAgICAgICAvLyBiZWNhdXNlIG5vZGUgYWxsb3dzIGVpdGhlciAuanMgb3Igbm9uIC5qcyB0byBtYXBcbiAgICAgICAgICAgIC8vIHRvIHNhbWUgZmlsZS5cbiAgICAgICAgICAgIGlmIChjb25maWcubm9kZUlkQ29tcGF0ICYmIGpzU3VmZml4UmVnRXhwLnRlc3QobmFtZVtsYXN0SW5kZXhdKSkge1xuICAgICAgICAgICAgICAgIG5hbWVbbGFzdEluZGV4XSA9IG5hbWVbbGFzdEluZGV4XS5yZXBsYWNlKGpzU3VmZml4UmVnRXhwLCAnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0cyB3aXRoIGEgJy4nIHNvIG5lZWQgdGhlIGJhc2VOYW1lXG4gICAgICAgICAgICBpZiAobmFtZVswXS5jaGFyQXQoMCkgPT09ICcuJyAmJiBiYXNlUGFydHMpIHtcbiAgICAgICAgICAgICAgICAvL0NvbnZlcnQgYmFzZU5hbWUgdG8gYXJyYXksIGFuZCBsb3Agb2ZmIHRoZSBsYXN0IHBhcnQsXG4gICAgICAgICAgICAgICAgLy9zbyB0aGF0IC4gbWF0Y2hlcyB0aGF0ICdkaXJlY3RvcnknIGFuZCBub3QgbmFtZSBvZiB0aGUgYmFzZU5hbWUnc1xuICAgICAgICAgICAgICAgIC8vbW9kdWxlLiBGb3IgaW5zdGFuY2UsIGJhc2VOYW1lIG9mICdvbmUvdHdvL3RocmVlJywgbWFwcyB0b1xuICAgICAgICAgICAgICAgIC8vJ29uZS90d28vdGhyZWUuanMnLCBidXQgd2Ugd2FudCB0aGUgZGlyZWN0b3J5LCAnb25lL3R3bycgZm9yXG4gICAgICAgICAgICAgICAgLy90aGlzIG5vcm1hbGl6YXRpb24uXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZEJhc2VQYXJ0cyA9IGJhc2VQYXJ0cy5zbGljZSgwLCBiYXNlUGFydHMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5vcm1hbGl6ZWRCYXNlUGFydHMuY29uY2F0KG5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3N0YXJ0IHRyaW1Eb3RzXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmFtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhcnQgPSBuYW1lW2ldO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnQgPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYXQgdGhlIHN0YXJ0LCBvciBwcmV2aW91cyB2YWx1ZSBpcyBzdGlsbCAuLixcbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCB0aGVtIHNvIHRoYXQgd2hlbiBjb252ZXJ0ZWQgdG8gYSBwYXRoIGl0IG1heVxuICAgICAgICAgICAgICAgICAgICAvLyBzdGlsbCB3b3JrIHdoZW4gY29udmVydGVkIHRvIGEgcGF0aCwgZXZlbiB0aG91Z2hcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgYW4gSUQgaXQgaXMgbGVzcyB0aGFuIGlkZWFsLiBJbiBsYXJnZXIgcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVsZWFzZXMsIG1heSBiZSBiZXR0ZXIgdG8ganVzdCBraWNrIG91dCBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDAgfHwgKGkgPT09IDEgJiYgbmFtZVsyXSA9PT0gJy4uJykgfHwgbmFtZVtpIC0gMV0gPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLnNwbGljZShpIC0gMSwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2VuZCB0cmltRG90c1xuXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5qb2luKCcvJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FwcGx5IG1hcCBjb25maWcgaWYgYXZhaWxhYmxlLlxuICAgICAgICBpZiAoKGJhc2VQYXJ0cyB8fCBzdGFyTWFwKSAmJiBtYXApIHtcbiAgICAgICAgICAgIG5hbWVQYXJ0cyA9IG5hbWUuc3BsaXQoJy8nKTtcblxuICAgICAgICAgICAgZm9yIChpID0gbmFtZVBhcnRzLmxlbmd0aDsgaSA+IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgICAgIG5hbWVTZWdtZW50ID0gbmFtZVBhcnRzLnNsaWNlKDAsIGkpLmpvaW4oXCIvXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VQYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICAvL0ZpbmQgdGhlIGxvbmdlc3QgYmFzZU5hbWUgc2VnbWVudCBtYXRjaCBpbiB0aGUgY29uZmlnLlxuICAgICAgICAgICAgICAgICAgICAvL1NvLCBkbyBqb2lucyBvbiB0aGUgYmlnZ2VzdCB0byBzbWFsbGVzdCBsZW5ndGhzIG9mIGJhc2VQYXJ0cy5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gYmFzZVBhcnRzLmxlbmd0aDsgaiA+IDA7IGogLT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWUgPSBtYXBbYmFzZVBhcnRzLnNsaWNlKDAsIGopLmpvaW4oJy8nKV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYmFzZU5hbWUgc2VnbWVudCBoYXMgIGNvbmZpZywgZmluZCBpZiBpdCBoYXMgb25lIGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIG5hbWUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFwVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZSA9IG1hcFZhbHVlW25hbWVTZWdtZW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFwVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9NYXRjaCwgdXBkYXRlIG5hbWUgdG8gdGhlIG5ldyB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRNYXAgPSBtYXBWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kTWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgZm9yIGEgc3RhciBtYXAgbWF0Y2gsIGJ1dCBqdXN0IGhvbGQgb24gdG8gaXQsXG4gICAgICAgICAgICAgICAgLy9pZiB0aGVyZSBpcyBhIHNob3J0ZXIgc2VnbWVudCBtYXRjaCBsYXRlciBpbiBhIG1hdGNoaW5nXG4gICAgICAgICAgICAgICAgLy9jb25maWcsIHRoZW4gZmF2b3Igb3ZlciB0aGlzIHN0YXIgbWFwLlxuICAgICAgICAgICAgICAgIGlmICghZm91bmRTdGFyTWFwICYmIHN0YXJNYXAgJiYgc3Rhck1hcFtuYW1lU2VnbWVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRTdGFyTWFwID0gc3Rhck1hcFtuYW1lU2VnbWVudF07XG4gICAgICAgICAgICAgICAgICAgIHN0YXJJID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZm91bmRNYXAgJiYgZm91bmRTdGFyTWFwKSB7XG4gICAgICAgICAgICAgICAgZm91bmRNYXAgPSBmb3VuZFN0YXJNYXA7XG4gICAgICAgICAgICAgICAgZm91bmRJID0gc3Rhckk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmb3VuZE1hcCkge1xuICAgICAgICAgICAgICAgIG5hbWVQYXJ0cy5zcGxpY2UoMCwgZm91bmRJLCBmb3VuZE1hcCk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWVQYXJ0cy5qb2luKCcvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlUmVxdWlyZShyZWxOYW1lLCBmb3JjZVN5bmMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vQSB2ZXJzaW9uIG9mIGEgcmVxdWlyZSBmdW5jdGlvbiB0aGF0IHBhc3NlcyBhIG1vZHVsZU5hbWVcbiAgICAgICAgICAgIC8vdmFsdWUgZm9yIGl0ZW1zIHRoYXQgbWF5IG5lZWQgdG9cbiAgICAgICAgICAgIC8vbG9vayB1cCBwYXRocyByZWxhdGl2ZSB0byB0aGUgbW9kdWxlTmFtZVxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcHMuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgICAgICAvL0lmIGZpcnN0IGFyZyBpcyBub3QgcmVxdWlyZSgnc3RyaW5nJyksIGFuZCB0aGVyZSBpcyBvbmx5XG4gICAgICAgICAgICAvL29uZSBhcmcsIGl0IGlzIHRoZSBhcnJheSBmb3JtIHdpdGhvdXQgYSBjYWxsYmFjay4gSW5zZXJ0XG4gICAgICAgICAgICAvL2EgbnVsbCBzbyB0aGF0IHRoZSBmb2xsb3dpbmcgY29uY2F0IGlzIGNvcnJlY3QuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnICYmIGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcS5hcHBseSh1bmRlZiwgYXJncy5jb25jYXQoW3JlbE5hbWUsIGZvcmNlU3luY10pKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlTm9ybWFsaXplKHJlbE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplKG5hbWUsIHJlbE5hbWUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VMb2FkKGRlcE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgZGVmaW5lZFtkZXBOYW1lXSA9IHZhbHVlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGxEZXAobmFtZSkge1xuICAgICAgICBpZiAoaGFzUHJvcCh3YWl0aW5nLCBuYW1lKSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSB3YWl0aW5nW25hbWVdO1xuICAgICAgICAgICAgZGVsZXRlIHdhaXRpbmdbbmFtZV07XG4gICAgICAgICAgICBkZWZpbmluZ1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICBtYWluLmFwcGx5KHVuZGVmLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzUHJvcChkZWZpbmVkLCBuYW1lKSAmJiAhaGFzUHJvcChkZWZpbmluZywgbmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gJyArIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZpbmVkW25hbWVdO1xuICAgIH1cblxuICAgIC8vVHVybnMgYSBwbHVnaW4hcmVzb3VyY2UgdG8gW3BsdWdpbiwgcmVzb3VyY2VdXG4gICAgLy93aXRoIHRoZSBwbHVnaW4gYmVpbmcgdW5kZWZpbmVkIGlmIHRoZSBuYW1lXG4gICAgLy9kaWQgbm90IGhhdmUgYSBwbHVnaW4gcHJlZml4LlxuICAgIGZ1bmN0aW9uIHNwbGl0UHJlZml4KG5hbWUpIHtcbiAgICAgICAgdmFyIHByZWZpeCxcbiAgICAgICAgICAgIGluZGV4ID0gbmFtZSA/IG5hbWUuaW5kZXhPZignIScpIDogLTE7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBwcmVmaXggPSBuYW1lLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoaW5kZXggKyAxLCBuYW1lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtwcmVmaXgsIG5hbWVdO1xuICAgIH1cblxuICAgIC8vQ3JlYXRlcyBhIHBhcnRzIGFycmF5IGZvciBhIHJlbE5hbWUgd2hlcmUgZmlyc3QgcGFydCBpcyBwbHVnaW4gSUQsXG4gICAgLy9zZWNvbmQgcGFydCBpcyByZXNvdXJjZSBJRC4gQXNzdW1lcyByZWxOYW1lIGhhcyBhbHJlYWR5IGJlZW4gbm9ybWFsaXplZC5cbiAgICBmdW5jdGlvbiBtYWtlUmVsUGFydHMocmVsTmFtZSkge1xuICAgICAgICByZXR1cm4gcmVsTmFtZSA/IHNwbGl0UHJlZml4KHJlbE5hbWUpIDogW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBuYW1lIG1hcCwgbm9ybWFsaXppbmcgdGhlIG5hbWUsIGFuZCB1c2luZyBhIHBsdWdpblxuICAgICAqIGZvciBub3JtYWxpemF0aW9uIGlmIG5lY2Vzc2FyeS4gR3JhYnMgYSByZWYgdG8gcGx1Z2luXG4gICAgICogdG9vLCBhcyBhbiBvcHRpbWl6YXRpb24uXG4gICAgICovXG4gICAgbWFrZU1hcCA9IGZ1bmN0aW9uIChuYW1lLCByZWxQYXJ0cykge1xuICAgICAgICB2YXIgcGx1Z2luLFxuICAgICAgICAgICAgcGFydHMgPSBzcGxpdFByZWZpeChuYW1lKSxcbiAgICAgICAgICAgIHByZWZpeCA9IHBhcnRzWzBdLFxuICAgICAgICAgICAgcmVsUmVzb3VyY2VOYW1lID0gcmVsUGFydHNbMV07XG5cbiAgICAgICAgbmFtZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICAgIHByZWZpeCA9IG5vcm1hbGl6ZShwcmVmaXgsIHJlbFJlc291cmNlTmFtZSk7XG4gICAgICAgICAgICBwbHVnaW4gPSBjYWxsRGVwKHByZWZpeCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL05vcm1hbGl6ZSBhY2NvcmRpbmdcbiAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgICAgaWYgKHBsdWdpbiAmJiBwbHVnaW4ubm9ybWFsaXplKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IHBsdWdpbi5ub3JtYWxpemUobmFtZSwgbWFrZU5vcm1hbGl6ZShyZWxSZXNvdXJjZU5hbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5vcm1hbGl6ZShuYW1lLCByZWxSZXNvdXJjZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IG5vcm1hbGl6ZShuYW1lLCByZWxSZXNvdXJjZU5hbWUpO1xuICAgICAgICAgICAgcGFydHMgPSBzcGxpdFByZWZpeChuYW1lKTtcbiAgICAgICAgICAgIHByZWZpeCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgbmFtZSA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbiA9IGNhbGxEZXAocHJlZml4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vVXNpbmcgcmlkaWN1bG91cyBwcm9wZXJ0eSBuYW1lcyBmb3Igc3BhY2UgcmVhc29uc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZjogcHJlZml4ID8gcHJlZml4ICsgJyEnICsgbmFtZSA6IG5hbWUsIC8vZnVsbE5hbWVcbiAgICAgICAgICAgIG46IG5hbWUsXG4gICAgICAgICAgICBwcjogcHJlZml4LFxuICAgICAgICAgICAgcDogcGx1Z2luXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VDb25maWcobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChjb25maWcgJiYgY29uZmlnLmNvbmZpZyAmJiBjb25maWcuY29uZmlnW25hbWVdKSB8fCB7fTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVycyA9IHtcbiAgICAgICAgcmVxdWlyZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWtlUmVxdWlyZShuYW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhwb3J0czogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHZhciBlID0gZGVmaW5lZFtuYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkZWZpbmVkW25hbWVdID0ge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb2R1bGU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBuYW1lLFxuICAgICAgICAgICAgICAgIHVyaTogJycsXG4gICAgICAgICAgICAgICAgZXhwb3J0czogZGVmaW5lZFtuYW1lXSxcbiAgICAgICAgICAgICAgICBjb25maWc6IG1ha2VDb25maWcobmFtZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbWFpbiA9IGZ1bmN0aW9uIChuYW1lLCBkZXBzLCBjYWxsYmFjaywgcmVsTmFtZSkge1xuICAgICAgICB2YXIgY2pzTW9kdWxlLCBkZXBOYW1lLCByZXQsIG1hcCwgaSwgcmVsUGFydHMsXG4gICAgICAgICAgICBhcmdzID0gW10sXG4gICAgICAgICAgICBjYWxsYmFja1R5cGUgPSB0eXBlb2YgY2FsbGJhY2ssXG4gICAgICAgICAgICB1c2luZ0V4cG9ydHM7XG5cbiAgICAgICAgLy9Vc2UgbmFtZSBpZiBubyByZWxOYW1lXG4gICAgICAgIHJlbE5hbWUgPSByZWxOYW1lIHx8IG5hbWU7XG4gICAgICAgIHJlbFBhcnRzID0gbWFrZVJlbFBhcnRzKHJlbE5hbWUpO1xuXG4gICAgICAgIC8vQ2FsbCB0aGUgY2FsbGJhY2sgdG8gZGVmaW5lIHRoZSBtb2R1bGUsIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgaWYgKGNhbGxiYWNrVHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgY2FsbGJhY2tUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvL1B1bGwgb3V0IHRoZSBkZWZpbmVkIGRlcGVuZGVuY2llcyBhbmQgcGFzcyB0aGUgb3JkZXJlZFxuICAgICAgICAgICAgLy92YWx1ZXMgdG8gdGhlIGNhbGxiYWNrLlxuICAgICAgICAgICAgLy9EZWZhdWx0IHRvIFtyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGVdIGlmIG5vIGRlcHNcbiAgICAgICAgICAgIGRlcHMgPSAhZGVwcy5sZW5ndGggJiYgY2FsbGJhY2subGVuZ3RoID8gWydyZXF1aXJlJywgJ2V4cG9ydHMnLCAnbW9kdWxlJ10gOiBkZXBzO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBtYXAgPSBtYWtlTWFwKGRlcHNbaV0sIHJlbFBhcnRzKTtcbiAgICAgICAgICAgICAgICBkZXBOYW1lID0gbWFwLmY7XG5cbiAgICAgICAgICAgICAgICAvL0Zhc3QgcGF0aCBDb21tb25KUyBzdGFuZGFyZCBkZXBlbmRlbmNpZXMuXG4gICAgICAgICAgICAgICAgaWYgKGRlcE5hbWUgPT09IFwicmVxdWlyZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBoYW5kbGVycy5yZXF1aXJlKG5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVwTmFtZSA9PT0gXCJleHBvcnRzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9Db21tb25KUyBtb2R1bGUgc3BlYyAxLjFcbiAgICAgICAgICAgICAgICAgICAgYXJnc1tpXSA9IGhhbmRsZXJzLmV4cG9ydHMobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHVzaW5nRXhwb3J0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZXBOYW1lID09PSBcIm1vZHVsZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29tbW9uSlMgbW9kdWxlIHNwZWMgMS4xXG4gICAgICAgICAgICAgICAgICAgIGNqc01vZHVsZSA9IGFyZ3NbaV0gPSBoYW5kbGVycy5tb2R1bGUobmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNQcm9wKGRlZmluZWQsIGRlcE5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9wKHdhaXRpbmcsIGRlcE5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9wKGRlZmluaW5nLCBkZXBOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzW2ldID0gY2FsbERlcChkZXBOYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcC5wKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5wLmxvYWQobWFwLm4sIG1ha2VSZXF1aXJlKHJlbE5hbWUsIHRydWUpLCBtYWtlTG9hZChkZXBOYW1lKSwge30pO1xuICAgICAgICAgICAgICAgICAgICBhcmdzW2ldID0gZGVmaW5lZFtkZXBOYW1lXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobmFtZSArICcgbWlzc2luZyAnICsgZGVwTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXQgPSBjYWxsYmFjayA/IGNhbGxiYWNrLmFwcGx5KGRlZmluZWRbbmFtZV0sIGFyZ3MpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgICAgIC8vSWYgc2V0dGluZyBleHBvcnRzIHZpYSBcIm1vZHVsZVwiIGlzIGluIHBsYXksXG4gICAgICAgICAgICAgICAgLy9mYXZvciB0aGF0IG92ZXIgcmV0dXJuIHZhbHVlIGFuZCBleHBvcnRzLiBBZnRlciB0aGF0LFxuICAgICAgICAgICAgICAgIC8vZmF2b3IgYSBub24tdW5kZWZpbmVkIHJldHVybiB2YWx1ZSBvdmVyIGV4cG9ydHMgdXNlLlxuICAgICAgICAgICAgICAgIGlmIChjanNNb2R1bGUgJiYgY2pzTW9kdWxlLmV4cG9ydHMgIT09IHVuZGVmICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjanNNb2R1bGUuZXhwb3J0cyAhPT0gZGVmaW5lZFtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVkW25hbWVdID0gY2pzTW9kdWxlLmV4cG9ydHM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXQgIT09IHVuZGVmIHx8ICF1c2luZ0V4cG9ydHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9Vc2UgdGhlIHJldHVybiB2YWx1ZSBmcm9tIHRoZSBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lZFtuYW1lXSA9IHJldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSkge1xuICAgICAgICAgICAgLy9NYXkganVzdCBiZSBhbiBvYmplY3QgZGVmaW5pdGlvbiBmb3IgdGhlIG1vZHVsZS4gT25seVxuICAgICAgICAgICAgLy93b3JyeSBhYm91dCBkZWZpbmluZyBpZiBoYXZlIGEgbW9kdWxlIG5hbWUuXG4gICAgICAgICAgICBkZWZpbmVkW25hbWVdID0gY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVxdWlyZWpzID0gcmVxdWlyZSA9IHJlcSA9IGZ1bmN0aW9uIChkZXBzLCBjYWxsYmFjaywgcmVsTmFtZSwgZm9yY2VTeW5jLCBhbHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkZXBzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlcnNbZGVwc10pIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrIGluIHRoaXMgY2FzZSBpcyByZWFsbHkgcmVsTmFtZVxuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyc1tkZXBzXShjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0p1c3QgcmV0dXJuIHRoZSBtb2R1bGUgd2FudGVkLiBJbiB0aGlzIHNjZW5hcmlvLCB0aGVcbiAgICAgICAgICAgIC8vZGVwcyBhcmcgaXMgdGhlIG1vZHVsZSBuYW1lLCBhbmQgc2Vjb25kIGFyZyAoaWYgcGFzc2VkKVxuICAgICAgICAgICAgLy9pcyBqdXN0IHRoZSByZWxOYW1lLlxuICAgICAgICAgICAgLy9Ob3JtYWxpemUgbW9kdWxlIG5hbWUsIGlmIGl0IGNvbnRhaW5zIC4gb3IgLi5cbiAgICAgICAgICAgIHJldHVybiBjYWxsRGVwKG1ha2VNYXAoZGVwcywgbWFrZVJlbFBhcnRzKGNhbGxiYWNrKSkuZik7XG4gICAgICAgIH0gZWxzZSBpZiAoIWRlcHMuc3BsaWNlKSB7XG4gICAgICAgICAgICAvL2RlcHMgaXMgYSBjb25maWcgb2JqZWN0LCBub3QgYW4gYXJyYXkuXG4gICAgICAgICAgICBjb25maWcgPSBkZXBzO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5kZXBzKSB7XG4gICAgICAgICAgICAgICAgcmVxKGNvbmZpZy5kZXBzLCBjb25maWcuY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrLnNwbGljZSkge1xuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2sgaXMgYW4gYXJyYXksIHdoaWNoIG1lYW5zIGl0IGlzIGEgZGVwZW5kZW5jeSBsaXN0LlxuICAgICAgICAgICAgICAgIC8vQWRqdXN0IGFyZ3MgaWYgdGhlcmUgYXJlIGRlcGVuZGVuY2llc1xuICAgICAgICAgICAgICAgIGRlcHMgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHJlbE5hbWU7XG4gICAgICAgICAgICAgICAgcmVsTmFtZSA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlcHMgPSB1bmRlZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3VwcG9ydCByZXF1aXJlKFsnYSddKVxuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgICAgIC8vSWYgcmVsTmFtZSBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBhbiBlcnJiYWNrIGhhbmRsZXIsXG4gICAgICAgIC8vc28gcmVtb3ZlIGl0LlxuICAgICAgICBpZiAodHlwZW9mIHJlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJlbE5hbWUgPSBmb3JjZVN5bmM7XG4gICAgICAgICAgICBmb3JjZVN5bmMgPSBhbHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL1NpbXVsYXRlIGFzeW5jIGNhbGxiYWNrO1xuICAgICAgICBpZiAoZm9yY2VTeW5jKSB7XG4gICAgICAgICAgICBtYWluKHVuZGVmLCBkZXBzLCBjYWxsYmFjaywgcmVsTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL1VzaW5nIGEgbm9uLXplcm8gdmFsdWUgYmVjYXVzZSBvZiBjb25jZXJuIGZvciB3aGF0IG9sZCBicm93c2Vyc1xuICAgICAgICAgICAgLy9kbywgYW5kIGxhdGVzdCBicm93c2VycyBcInVwZ3JhZGVcIiB0byA0IGlmIGxvd2VyIHZhbHVlIGlzIHVzZWQ6XG4gICAgICAgICAgICAvL2h0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RpbWVycy5odG1sI2RvbS13aW5kb3d0aW1lcnMtc2V0dGltZW91dDpcbiAgICAgICAgICAgIC8vSWYgd2FudCBhIHZhbHVlIGltbWVkaWF0ZWx5LCB1c2UgcmVxdWlyZSgnaWQnKSBpbnN0ZWFkIC0tIHNvbWV0aGluZ1xuICAgICAgICAgICAgLy90aGF0IHdvcmtzIGluIGFsbW9uZCBvbiB0aGUgZ2xvYmFsIGxldmVsLCBidXQgbm90IGd1YXJhbnRlZWQgYW5kXG4gICAgICAgICAgICAvL3VubGlrZWx5IHRvIHdvcmsgaW4gb3RoZXIgQU1EIGltcGxlbWVudGF0aW9ucy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1haW4odW5kZWYsIGRlcHMsIGNhbGxiYWNrLCByZWxOYW1lKTtcbiAgICAgICAgICAgIH0sIDQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSnVzdCBkcm9wcyB0aGUgY29uZmlnIG9uIHRoZSBmbG9vciwgYnV0IHJldHVybnMgcmVxIGluIGNhc2VcbiAgICAgKiB0aGUgY29uZmlnIHJldHVybiB2YWx1ZSBpcyB1c2VkLlxuICAgICAqL1xuICAgIHJlcS5jb25maWcgPSBmdW5jdGlvbiAoY2ZnKSB7XG4gICAgICAgIHJldHVybiByZXEoY2ZnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRXhwb3NlIG1vZHVsZSByZWdpc3RyeSBmb3IgZGVidWdnaW5nIGFuZCB0b29saW5nXG4gICAgICovXG4gICAgcmVxdWlyZWpzLl9kZWZpbmVkID0gZGVmaW5lZDtcblxuICAgIGRlZmluZSA9IGZ1bmN0aW9uIChuYW1lLCBkZXBzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlZSBhbG1vbmQgUkVBRE1FOiBpbmNvcnJlY3QgbW9kdWxlIGJ1aWxkLCBubyBtb2R1bGUgbmFtZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UaGlzIG1vZHVsZSBtYXkgbm90IGhhdmUgZGVwZW5kZW5jaWVzXG4gICAgICAgIGlmICghZGVwcy5zcGxpY2UpIHtcbiAgICAgICAgICAgIC8vZGVwcyBpcyBub3QgYW4gYXJyYXksIHNvIHByb2JhYmx5IG1lYW5zXG4gICAgICAgICAgICAvL2FuIG9iamVjdCBsaXRlcmFsIG9yIGZhY3RvcnkgZnVuY3Rpb24gZm9yXG4gICAgICAgICAgICAvL3RoZSB2YWx1ZS4gQWRqdXN0IGFyZ3MuXG4gICAgICAgICAgICBjYWxsYmFjayA9IGRlcHM7XG4gICAgICAgICAgICBkZXBzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc1Byb3AoZGVmaW5lZCwgbmFtZSkgJiYgIWhhc1Byb3Aod2FpdGluZywgbmFtZSkpIHtcbiAgICAgICAgICAgIHdhaXRpbmdbbmFtZV0gPSBbbmFtZSwgZGVwcywgY2FsbGJhY2tdO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRlZmluZS5hbWQgPSB7XG4gICAgICAgIGpRdWVyeTogdHJ1ZVxuICAgIH07XG59KCkpO1xuXG5TMi5yZXF1aXJlanMgPSByZXF1aXJlanM7UzIucmVxdWlyZSA9IHJlcXVpcmU7UzIuZGVmaW5lID0gZGVmaW5lO1xufVxufSgpKTtcblMyLmRlZmluZShcImFsbW9uZFwiLCBmdW5jdGlvbigpe30pO1xuXG4vKiBnbG9iYWwgalF1ZXJ5OmZhbHNlLCAkOmZhbHNlICovXG5TMi5kZWZpbmUoJ2pxdWVyeScsW10sZnVuY3Rpb24gKCkge1xuICB2YXIgXyQgPSBqUXVlcnkgfHwgJDtcblxuICBpZiAoXyQgPT0gbnVsbCAmJiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgJ1NlbGVjdDI6IEFuIGluc3RhbmNlIG9mIGpRdWVyeSBvciBhIGpRdWVyeS1jb21wYXRpYmxlIGxpYnJhcnkgd2FzIG5vdCAnICtcbiAgICAgICdmb3VuZC4gTWFrZSBzdXJlIHRoYXQgeW91IGFyZSBpbmNsdWRpbmcgalF1ZXJ5IGJlZm9yZSBTZWxlY3QyIG9uIHlvdXIgJyArXG4gICAgICAnd2ViIHBhZ2UuJ1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gXyQ7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL3V0aWxzJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICB2YXIgVXRpbHMgPSB7fTtcblxuICBVdGlscy5FeHRlbmQgPSBmdW5jdGlvbiAoQ2hpbGRDbGFzcywgU3VwZXJDbGFzcykge1xuICAgIHZhciBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIGZ1bmN0aW9uIEJhc2VDb25zdHJ1Y3RvciAoKSB7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yID0gQ2hpbGRDbGFzcztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gU3VwZXJDbGFzcykge1xuICAgICAgaWYgKF9faGFzUHJvcC5jYWxsKFN1cGVyQ2xhc3MsIGtleSkpIHtcbiAgICAgICAgQ2hpbGRDbGFzc1trZXldID0gU3VwZXJDbGFzc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIEJhc2VDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBTdXBlckNsYXNzLnByb3RvdHlwZTtcbiAgICBDaGlsZENsYXNzLnByb3RvdHlwZSA9IG5ldyBCYXNlQ29uc3RydWN0b3IoKTtcbiAgICBDaGlsZENsYXNzLl9fc3VwZXJfXyA9IFN1cGVyQ2xhc3MucHJvdG90eXBlO1xuXG4gICAgcmV0dXJuIENoaWxkQ2xhc3M7XG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0TWV0aG9kcyAodGhlQ2xhc3MpIHtcbiAgICB2YXIgcHJvdG8gPSB0aGVDbGFzcy5wcm90b3R5cGU7XG5cbiAgICB2YXIgbWV0aG9kcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBwcm90bykge1xuICAgICAgdmFyIG0gPSBwcm90b1ttZXRob2ROYW1lXTtcblxuICAgICAgaWYgKHR5cGVvZiBtICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWV0aG9kTmFtZSA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbWV0aG9kcy5wdXNoKG1ldGhvZE5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2RzO1xuICB9XG5cbiAgVXRpbHMuRGVjb3JhdGUgPSBmdW5jdGlvbiAoU3VwZXJDbGFzcywgRGVjb3JhdG9yQ2xhc3MpIHtcbiAgICB2YXIgZGVjb3JhdGVkTWV0aG9kcyA9IGdldE1ldGhvZHMoRGVjb3JhdG9yQ2xhc3MpO1xuICAgIHZhciBzdXBlck1ldGhvZHMgPSBnZXRNZXRob2RzKFN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gRGVjb3JhdGVkQ2xhc3MgKCkge1xuICAgICAgdmFyIHVuc2hpZnQgPSBBcnJheS5wcm90b3R5cGUudW5zaGlmdDtcblxuICAgICAgdmFyIGFyZ0NvdW50ID0gRGVjb3JhdG9yQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yLmxlbmd0aDtcblxuICAgICAgdmFyIGNhbGxlZENvbnN0cnVjdG9yID0gU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cbiAgICAgIGlmIChhcmdDb3VudCA+IDApIHtcbiAgICAgICAgdW5zaGlmdC5jYWxsKGFyZ3VtZW50cywgU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXG4gICAgICAgIGNhbGxlZENvbnN0cnVjdG9yID0gRGVjb3JhdG9yQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuICAgICAgfVxuXG4gICAgICBjYWxsZWRDb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIERlY29yYXRvckNsYXNzLmRpc3BsYXlOYW1lID0gU3VwZXJDbGFzcy5kaXNwbGF5TmFtZTtcblxuICAgIGZ1bmN0aW9uIGN0ciAoKSB7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yID0gRGVjb3JhdGVkQ2xhc3M7XG4gICAgfVxuXG4gICAgRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlID0gbmV3IGN0cigpO1xuXG4gICAgZm9yICh2YXIgbSA9IDA7IG0gPCBzdXBlck1ldGhvZHMubGVuZ3RoOyBtKyspIHtcbiAgICAgIHZhciBzdXBlck1ldGhvZCA9IHN1cGVyTWV0aG9kc1ttXTtcblxuICAgICAgRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlW3N1cGVyTWV0aG9kXSA9XG4gICAgICAgIFN1cGVyQ2xhc3MucHJvdG90eXBlW3N1cGVyTWV0aG9kXTtcbiAgICB9XG5cbiAgICB2YXIgY2FsbGVkTWV0aG9kID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICAgIC8vIFN0dWIgb3V0IHRoZSBvcmlnaW5hbCBtZXRob2QgaWYgaXQncyBub3QgZGVjb3JhdGluZyBhbiBhY3R1YWwgbWV0aG9kXG4gICAgICB2YXIgb3JpZ2luYWxNZXRob2QgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgICAgaWYgKG1ldGhvZE5hbWUgaW4gRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlKSB7XG4gICAgICAgIG9yaWdpbmFsTWV0aG9kID0gRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlW21ldGhvZE5hbWVdO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGVjb3JhdGVkTWV0aG9kID0gRGVjb3JhdG9yQ2xhc3MucHJvdG90eXBlW21ldGhvZE5hbWVdO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdW5zaGlmdCA9IEFycmF5LnByb3RvdHlwZS51bnNoaWZ0O1xuXG4gICAgICAgIHVuc2hpZnQuY2FsbChhcmd1bWVudHMsIG9yaWdpbmFsTWV0aG9kKTtcblxuICAgICAgICByZXR1cm4gZGVjb3JhdGVkTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBmb3IgKHZhciBkID0gMDsgZCA8IGRlY29yYXRlZE1ldGhvZHMubGVuZ3RoOyBkKyspIHtcbiAgICAgIHZhciBkZWNvcmF0ZWRNZXRob2QgPSBkZWNvcmF0ZWRNZXRob2RzW2RdO1xuXG4gICAgICBEZWNvcmF0ZWRDbGFzcy5wcm90b3R5cGVbZGVjb3JhdGVkTWV0aG9kXSA9IGNhbGxlZE1ldGhvZChkZWNvcmF0ZWRNZXRob2QpO1xuICAgIH1cblxuICAgIHJldHVybiBEZWNvcmF0ZWRDbGFzcztcbiAgfTtcblxuICB2YXIgT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICB9O1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMgfHwge307XG5cbiAgICBpZiAoZXZlbnQgaW4gdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdID0gW2NhbGxiYWNrXTtcbiAgICB9XG4gIH07XG5cbiAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgcGFyYW1zID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycyB8fCB7fTtcblxuICAgIC8vIFBhcmFtcyBzaG91bGQgYWx3YXlzIGNvbWUgaW4gYXMgYW4gYXJyYXlcbiAgICBpZiAocGFyYW1zID09IG51bGwpIHtcbiAgICAgIHBhcmFtcyA9IFtdO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBhcmd1bWVudHMgdG8gdGhlIGV2ZW50LCB1c2UgYSB0ZW1wb3Jhcnkgb2JqZWN0XG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHBhcmFtcy5wdXNoKHt9KTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIGBfdHlwZWAgb2YgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgZXZlbnRcbiAgICBwYXJhbXNbMF0uX3R5cGUgPSBldmVudDtcblxuICAgIGlmIChldmVudCBpbiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgdGhpcy5pbnZva2UodGhpcy5saXN0ZW5lcnNbZXZlbnRdLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIH1cblxuICAgIGlmICgnKicgaW4gdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuaW52b2tlKHRoaXMubGlzdGVuZXJzWycqJ10sIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcnMsIHBhcmFtcykge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBwYXJhbXMpO1xuICAgIH1cbiAgfTtcblxuICBVdGlscy5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcblxuICBVdGlscy5nZW5lcmF0ZUNoYXJzID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgIHZhciBjaGFycyA9ICcnO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJhbmRvbUNoYXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzNik7XG4gICAgICBjaGFycyArPSByYW5kb21DaGFyLnRvU3RyaW5nKDM2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhcnM7XG4gIH07XG5cbiAgVXRpbHMuYmluZCA9IGZ1bmN0aW9uIChmdW5jLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIFV0aWxzLl9jb252ZXJ0RGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZm9yICh2YXIgb3JpZ2luYWxLZXkgaW4gZGF0YSkge1xuICAgICAgdmFyIGtleXMgPSBvcmlnaW5hbEtleS5zcGxpdCgnLScpO1xuXG4gICAgICB2YXIgZGF0YUxldmVsID0gZGF0YTtcblxuICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IGtleXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNba107XG5cbiAgICAgICAgLy8gTG93ZXJjYXNlIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgZGFzaC1zZXBhcmF0ZWQgYmVjb21lcyBjYW1lbENhc2VcbiAgICAgICAga2V5ID0ga2V5LnN1YnN0cmluZygwLCAxKS50b0xvd2VyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcblxuICAgICAgICBpZiAoIShrZXkgaW4gZGF0YUxldmVsKSkge1xuICAgICAgICAgIGRhdGFMZXZlbFtrZXldID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoayA9PSBrZXlzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBkYXRhTGV2ZWxba2V5XSA9IGRhdGFbb3JpZ2luYWxLZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YUxldmVsID0gZGF0YUxldmVsW2tleV07XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBkYXRhW29yaWdpbmFsS2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBVdGlscy5oYXNTY3JvbGwgPSBmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgLy8gQWRhcHRlZCBmcm9tIHRoZSBmdW5jdGlvbiBjcmVhdGVkIGJ5IEBTaGFkb3dTY3JpcHRlclxuICAgIC8vIGFuZCBhZGFwdGVkIGJ5IEBCaWxsQmFycnkgb24gdGhlIFN0YWNrIEV4Y2hhbmdlIENvZGUgUmV2aWV3IHdlYnNpdGUuXG4gICAgLy8gVGhlIG9yaWdpbmFsIGNvZGUgY2FuIGJlIGZvdW5kIGF0XG4gICAgLy8gaHR0cDovL2NvZGVyZXZpZXcuc3RhY2tleGNoYW5nZS5jb20vcS8xMzMzOFxuICAgIC8vIGFuZCB3YXMgZGVzaWduZWQgdG8gYmUgdXNlZCB3aXRoIHRoZSBTaXp6bGUgc2VsZWN0b3IgZW5naW5lLlxuXG4gICAgdmFyICRlbCA9ICQoZWwpO1xuICAgIHZhciBvdmVyZmxvd1ggPSBlbC5zdHlsZS5vdmVyZmxvd1g7XG4gICAgdmFyIG92ZXJmbG93WSA9IGVsLnN0eWxlLm92ZXJmbG93WTtcblxuICAgIC8vQ2hlY2sgYm90aCB4IGFuZCB5IGRlY2xhcmF0aW9uc1xuICAgIGlmIChvdmVyZmxvd1ggPT09IG92ZXJmbG93WSAmJlxuICAgICAgICAob3ZlcmZsb3dZID09PSAnaGlkZGVuJyB8fCBvdmVyZmxvd1kgPT09ICd2aXNpYmxlJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAob3ZlcmZsb3dYID09PSAnc2Nyb2xsJyB8fCBvdmVyZmxvd1kgPT09ICdzY3JvbGwnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCRlbC5pbm5lckhlaWdodCgpIDwgZWwuc2Nyb2xsSGVpZ2h0IHx8XG4gICAgICAkZWwuaW5uZXJXaWR0aCgpIDwgZWwuc2Nyb2xsV2lkdGgpO1xuICB9O1xuXG4gIFV0aWxzLmVzY2FwZU1hcmt1cCA9IGZ1bmN0aW9uIChtYXJrdXApIHtcbiAgICB2YXIgcmVwbGFjZU1hcCA9IHtcbiAgICAgICdcXFxcJzogJyYjOTI7JyxcbiAgICAgICcmJzogJyZhbXA7JyxcbiAgICAgICc8JzogJyZsdDsnLFxuICAgICAgJz4nOiAnJmd0OycsXG4gICAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAgICdcXCcnOiAnJiMzOTsnLFxuICAgICAgJy8nOiAnJiM0NzsnXG4gICAgfTtcblxuICAgIC8vIERvIG5vdCB0cnkgdG8gZXNjYXBlIHRoZSBtYXJrdXAgaWYgaXQncyBub3QgYSBzdHJpbmdcbiAgICBpZiAodHlwZW9mIG1hcmt1cCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtYXJrdXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZyhtYXJrdXApLnJlcGxhY2UoL1smPD5cIidcXC9cXFxcXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiByZXBsYWNlTWFwW21hdGNoXTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBDYWNoZSBvYmplY3RzIGluIFV0aWxzLl9fY2FjaGUgaW5zdGVhZCBvZiAkLmRhdGEgKHNlZSAjNDM0NilcbiAgVXRpbHMuX19jYWNoZSA9IHt9O1xuXG4gIHZhciBpZCA9IDA7XG4gIFV0aWxzLkdldFVuaXF1ZUVsZW1lbnRJZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8gR2V0IGEgdW5pcXVlIGVsZW1lbnQgSWQuIElmIGVsZW1lbnQgaGFzIG5vIGlkLFxuICAgIC8vIGNyZWF0ZXMgYSBuZXcgdW5pcXVlIG51bWJlciwgc3RvcmVzIGl0IGluIHRoZSBpZFxuICAgIC8vIGF0dHJpYnV0ZSBhbmQgcmV0dXJucyB0aGUgbmV3IGlkIHdpdGggYSBwcmVmaXguXG4gICAgLy8gSWYgYW4gaWQgYWxyZWFkeSBleGlzdHMsIGl0IHNpbXBseSByZXR1cm5zIGl0IHdpdGggYSBwcmVmaXguXG5cbiAgICB2YXIgc2VsZWN0MklkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0Mi1pZCcpO1xuXG4gICAgaWYgKHNlbGVjdDJJZCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gc2VsZWN0MklkO1xuICAgIH1cblxuICAgIC8vIElmIGVsZW1lbnQgaGFzIGlkLCB1c2UgaXQuXG4gICAgaWYgKGVsZW1lbnQuaWQpIHtcbiAgICAgIHNlbGVjdDJJZCA9ICdzZWxlY3QyLWRhdGEtJyArIGVsZW1lbnQuaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdDJJZCA9ICdzZWxlY3QyLWRhdGEtJyArICgrK2lkKS50b1N0cmluZygpICtcbiAgICAgICAgJy0nICsgVXRpbHMuZ2VuZXJhdGVDaGFycyg0KTtcbiAgICB9XG5cbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3QyLWlkJywgc2VsZWN0MklkKTtcblxuICAgIHJldHVybiBzZWxlY3QySWQ7XG4gIH07XG5cbiAgVXRpbHMuU3RvcmVEYXRhID0gZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gICAgLy8gU3RvcmVzIGFuIGl0ZW0gaW4gdGhlIGNhY2hlIGZvciBhIHNwZWNpZmllZCBlbGVtZW50LlxuICAgIC8vIG5hbWUgaXMgdGhlIGNhY2hlIGtleS5cbiAgICB2YXIgaWQgPSBVdGlscy5HZXRVbmlxdWVFbGVtZW50SWQoZWxlbWVudCk7XG4gICAgaWYgKCFVdGlscy5fX2NhY2hlW2lkXSkge1xuICAgICAgVXRpbHMuX19jYWNoZVtpZF0gPSB7fTtcbiAgICB9XG5cbiAgICBVdGlscy5fX2NhY2hlW2lkXVtuYW1lXSA9IHZhbHVlO1xuICB9O1xuXG4gIFV0aWxzLkdldERhdGEgPSBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSkge1xuICAgIC8vIFJldHJpZXZlcyBhIHZhbHVlIGZyb20gdGhlIGNhY2hlIGJ5IGl0cyBrZXkgKG5hbWUpXG4gICAgLy8gbmFtZSBpcyBvcHRpb25hbC4gSWYgbm8gbmFtZSBzcGVjaWZpZWQsIHJldHVyblxuICAgIC8vIGFsbCBjYWNoZSBpdGVtcyBmb3IgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgIC8vIGFuZCBmb3IgYSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICB2YXIgaWQgPSBVdGlscy5HZXRVbmlxdWVFbGVtZW50SWQoZWxlbWVudCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIGlmIChVdGlscy5fX2NhY2hlW2lkXSkge1xuICAgICAgICBpZiAoVXRpbHMuX19jYWNoZVtpZF1bbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBVdGlscy5fX2NhY2hlW2lkXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJChlbGVtZW50KS5kYXRhKG5hbWUpOyAvLyBGYWxsYmFjayB0byBIVE1MNSBkYXRhIGF0dHJpYnMuXG4gICAgICB9XG4gICAgICByZXR1cm4gJChlbGVtZW50KS5kYXRhKG5hbWUpOyAvLyBGYWxsYmFjayB0byBIVE1MNSBkYXRhIGF0dHJpYnMuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBVdGlscy5fX2NhY2hlW2lkXTtcbiAgICB9XG4gIH07XG5cbiAgVXRpbHMuUmVtb3ZlRGF0YSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8gUmVtb3ZlcyBhbGwgY2FjaGVkIGl0ZW1zIGZvciBhIHNwZWNpZmllZCBlbGVtZW50LlxuICAgIHZhciBpZCA9IFV0aWxzLkdldFVuaXF1ZUVsZW1lbnRJZChlbGVtZW50KTtcbiAgICBpZiAoVXRpbHMuX19jYWNoZVtpZF0gIT0gbnVsbCkge1xuICAgICAgZGVsZXRlIFV0aWxzLl9fY2FjaGVbaWRdO1xuICAgIH1cblxuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNlbGVjdDItaWQnKTtcbiAgfTtcblxuICBVdGlscy5jb3B5Tm9uSW50ZXJuYWxDc3NDbGFzc2VzID0gZnVuY3Rpb24gKGRlc3QsIHNyYykge1xuICAgIHZhciBjbGFzc2VzO1xuXG4gICAgdmFyIGRlc3RpbmF0aW9uQ2xhc3NlcyA9IGRlc3QuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuXG4gICAgZGVzdGluYXRpb25DbGFzc2VzID0gZGVzdGluYXRpb25DbGFzc2VzLmZpbHRlcihmdW5jdGlvbiAoY2xhenopIHtcbiAgICAgIC8vIFNhdmUgYWxsIFNlbGVjdDIgY2xhc3Nlc1xuICAgICAgcmV0dXJuIGNsYXp6LmluZGV4T2YoJ3NlbGVjdDItJykgPT09IDA7XG4gICAgfSk7XG5cbiAgICB2YXIgc291cmNlQ2xhc3NlcyA9IHNyYy5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG5cbiAgICBzb3VyY2VDbGFzc2VzID0gc291cmNlQ2xhc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKGNsYXp6KSB7XG4gICAgICAvLyBPbmx5IGNvcHkgbm9uLVNlbGVjdDIgY2xhc3Nlc1xuICAgICAgcmV0dXJuIGNsYXp6LmluZGV4T2YoJ3NlbGVjdDItJykgIT09IDA7XG4gICAgfSk7XG5cbiAgICB2YXIgcmVwbGFjZW1lbnRzID0gZGVzdGluYXRpb25DbGFzc2VzLmNvbmNhdChzb3VyY2VDbGFzc2VzKTtcblxuICAgIGRlc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIHJlcGxhY2VtZW50cy5qb2luKCcgJykpO1xuICB9O1xuXG4gIHJldHVybiBVdGlscztcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvcmVzdWx0cycsW1xuICAnanF1ZXJ5JyxcbiAgJy4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgVXRpbHMpIHtcbiAgZnVuY3Rpb24gUmVzdWx0cyAoJGVsZW1lbnQsIG9wdGlvbnMsIGRhdGFBZGFwdGVyKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGFBZGFwdGVyO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBSZXN1bHRzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB9XG5cbiAgVXRpbHMuRXh0ZW5kKFJlc3VsdHMsIFV0aWxzLk9ic2VydmFibGUpO1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHJlc3VsdHMgPSAkKFxuICAgICAgJzx1bCBjbGFzcz1cInNlbGVjdDItcmVzdWx0c19fb3B0aW9uc1wiIHJvbGU9XCJsaXN0Ym94XCI+PC91bD4nXG4gICAgKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZ2V0KCdtdWx0aXBsZScpKSB7XG4gICAgICAkcmVzdWx0cy5hdHRyKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsICd0cnVlJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kcmVzdWx0cyA9ICRyZXN1bHRzO1xuXG4gICAgcmV0dXJuICRyZXN1bHRzO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJlc3VsdHMuZW1wdHkoKTtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5kaXNwbGF5TWVzc2FnZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICB2YXIgZXNjYXBlTWFya3VwID0gdGhpcy5vcHRpb25zLmdldCgnZXNjYXBlTWFya3VwJyk7XG5cbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5oaWRlTG9hZGluZygpO1xuXG4gICAgdmFyICRtZXNzYWdlID0gJChcbiAgICAgICc8bGkgcm9sZT1cImFsZXJ0XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCInICtcbiAgICAgICcgY2xhc3M9XCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvblwiPjwvbGk+J1xuICAgICk7XG5cbiAgICB2YXIgbWVzc2FnZSA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldChwYXJhbXMubWVzc2FnZSk7XG5cbiAgICAkbWVzc2FnZS5hcHBlbmQoXG4gICAgICBlc2NhcGVNYXJrdXAoXG4gICAgICAgIG1lc3NhZ2UocGFyYW1zLmFyZ3MpXG4gICAgICApXG4gICAgKTtcblxuICAgICRtZXNzYWdlWzBdLmNsYXNzTmFtZSArPSAnIHNlbGVjdDItcmVzdWx0c19fbWVzc2FnZSc7XG5cbiAgICB0aGlzLiRyZXN1bHRzLmFwcGVuZCgkbWVzc2FnZSk7XG4gIH07XG5cbiAgUmVzdWx0cy5wcm90b3R5cGUuaGlkZU1lc3NhZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJlc3VsdHMuZmluZCgnLnNlbGVjdDItcmVzdWx0c19fbWVzc2FnZScpLnJlbW92ZSgpO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5oaWRlTG9hZGluZygpO1xuXG4gICAgdmFyICRvcHRpb25zID0gW107XG5cbiAgICBpZiAoZGF0YS5yZXN1bHRzID09IG51bGwgfHwgZGF0YS5yZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMuJHJlc3VsdHMuY2hpbGRyZW4oKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdyZXN1bHRzOm1lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ25vUmVzdWx0cydcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkYXRhLnJlc3VsdHMgPSB0aGlzLnNvcnQoZGF0YS5yZXN1bHRzKTtcblxuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YS5yZXN1bHRzLmxlbmd0aDsgZCsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGRhdGEucmVzdWx0c1tkXTtcblxuICAgICAgdmFyICRvcHRpb24gPSB0aGlzLm9wdGlvbihpdGVtKTtcblxuICAgICAgJG9wdGlvbnMucHVzaCgkb3B0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLiRyZXN1bHRzLmFwcGVuZCgkb3B0aW9ucyk7XG4gIH07XG5cbiAgUmVzdWx0cy5wcm90b3R5cGUucG9zaXRpb24gPSBmdW5jdGlvbiAoJHJlc3VsdHMsICRkcm9wZG93bikge1xuICAgIHZhciAkcmVzdWx0c0NvbnRhaW5lciA9ICRkcm9wZG93bi5maW5kKCcuc2VsZWN0Mi1yZXN1bHRzJyk7XG4gICAgJHJlc3VsdHNDb250YWluZXIuYXBwZW5kKCRyZXN1bHRzKTtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgc29ydGVyID0gdGhpcy5vcHRpb25zLmdldCgnc29ydGVyJyk7XG5cbiAgICByZXR1cm4gc29ydGVyKGRhdGEpO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmhpZ2hsaWdodEZpcnN0SXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJG9wdGlvbnMgPSB0aGlzLiRyZXN1bHRzXG4gICAgICAuZmluZCgnLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlJyk7XG5cbiAgICB2YXIgJHNlbGVjdGVkID0gJG9wdGlvbnMuZmlsdGVyKCcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkJyk7XG5cbiAgICAvLyBDaGVjayBpZiB0aGVyZSBhcmUgYW55IHNlbGVjdGVkIG9wdGlvbnNcbiAgICBpZiAoJHNlbGVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBzZWxlY3RlZCBvcHRpb25zLCBoaWdobGlnaHQgdGhlIGZpcnN0XG4gICAgICAkc2VsZWN0ZWQuZmlyc3QoKS50cmlnZ2VyKCdtb3VzZWVudGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBzZWxlY3RlZCBvcHRpb25zLCBoaWdobGlnaHQgdGhlIGZpcnN0IG9wdGlvblxuICAgICAgLy8gaW4gdGhlIGRyb3Bkb3duXG4gICAgICAkb3B0aW9ucy5maXJzdCgpLnRyaWdnZXIoJ21vdXNlZW50ZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLmVuc3VyZUhpZ2hsaWdodFZpc2libGUoKTtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5zZXRDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZGF0YS5jdXJyZW50KGZ1bmN0aW9uIChzZWxlY3RlZCkge1xuICAgICAgdmFyIHNlbGVjdGVkSWRzID0gc2VsZWN0ZWQubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldHVybiBzLmlkLnRvU3RyaW5nKCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyICRvcHRpb25zID0gc2VsZi4kcmVzdWx0c1xuICAgICAgICAuZmluZCgnLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlJyk7XG5cbiAgICAgICRvcHRpb25zLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG9wdGlvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIGl0ZW0gPSBVdGlscy5HZXREYXRhKHRoaXMsICdkYXRhJyk7XG5cbiAgICAgICAgLy8gaWQgbmVlZHMgdG8gYmUgY29udmVydGVkIHRvIGEgc3RyaW5nIHdoZW4gY29tcGFyaW5nXG4gICAgICAgIHZhciBpZCA9ICcnICsgaXRlbS5pZDtcblxuICAgICAgICBpZiAoKGl0ZW0uZWxlbWVudCAhPSBudWxsICYmIGl0ZW0uZWxlbWVudC5zZWxlY3RlZCkgfHxcbiAgICAgICAgICAgIChpdGVtLmVsZW1lbnQgPT0gbnVsbCAmJiBzZWxlY3RlZElkcy5pbmRleE9mKGlkKSA+IC0xKSkge1xuICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkJyk7XG4gICAgICAgICAgJG9wdGlvbi5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RlZCcpO1xuICAgICAgICAgICRvcHRpb24uYXR0cignYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLnNob3dMb2FkaW5nID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcblxuICAgIHZhciBsb2FkaW5nTW9yZSA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldCgnc2VhcmNoaW5nJyk7XG5cbiAgICB2YXIgbG9hZGluZyA9IHtcbiAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgIHRleHQ6IGxvYWRpbmdNb3JlKHBhcmFtcylcbiAgICB9O1xuICAgIHZhciAkbG9hZGluZyA9IHRoaXMub3B0aW9uKGxvYWRpbmcpO1xuICAgICRsb2FkaW5nLmNsYXNzTmFtZSArPSAnIGxvYWRpbmctcmVzdWx0cyc7XG5cbiAgICB0aGlzLiRyZXN1bHRzLnByZXBlbmQoJGxvYWRpbmcpO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmhpZGVMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJlc3VsdHMuZmluZCgnLmxvYWRpbmctcmVzdWx0cycpLnJlbW92ZSgpO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLm9wdGlvbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uJyk7XG4gICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlJyk7XG5cbiAgICB2YXIgYXR0cnMgPSB7XG4gICAgICAncm9sZSc6ICdvcHRpb24nXG4gICAgfTtcblxuICAgIHZhciBtYXRjaGVzID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHxcbiAgICAgIHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgd2luZG93LkVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcblxuICAgIGlmICgoZGF0YS5lbGVtZW50ICE9IG51bGwgJiYgbWF0Y2hlcy5jYWxsKGRhdGEuZWxlbWVudCwgJzpkaXNhYmxlZCcpKSB8fFxuICAgICAgICAoZGF0YS5lbGVtZW50ID09IG51bGwgJiYgZGF0YS5kaXNhYmxlZCkpIHtcbiAgICAgIGF0dHJzWydhcmlhLWRpc2FibGVkJ10gPSAndHJ1ZSc7XG5cbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZScpO1xuICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1kaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmlkID09IG51bGwpIHtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZScpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLl9yZXN1bHRJZCAhPSBudWxsKSB7XG4gICAgICBvcHRpb24uaWQgPSBkYXRhLl9yZXN1bHRJZDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS50aXRsZSkge1xuICAgICAgb3B0aW9uLnRpdGxlID0gZGF0YS50aXRsZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5jaGlsZHJlbikge1xuICAgICAgYXR0cnMucm9sZSA9ICdncm91cCc7XG4gICAgICBhdHRyc1snYXJpYS1sYWJlbCddID0gZGF0YS50ZXh0O1xuXG4gICAgICBvcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnKTtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tZ3JvdXAnKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBhdHRyIGluIGF0dHJzKSB7XG4gICAgICB2YXIgdmFsID0gYXR0cnNbYXR0cl07XG5cbiAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5jaGlsZHJlbikge1xuICAgICAgdmFyICRvcHRpb24gPSAkKG9wdGlvbik7XG5cbiAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0cm9uZycpO1xuICAgICAgbGFiZWwuY2xhc3NOYW1lID0gJ3NlbGVjdDItcmVzdWx0c19fZ3JvdXAnO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlKGRhdGEsIGxhYmVsKTtcblxuICAgICAgdmFyICRjaGlsZHJlbiA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGRhdGEuY2hpbGRyZW4ubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gZGF0YS5jaGlsZHJlbltjXTtcblxuICAgICAgICB2YXIgJGNoaWxkID0gdGhpcy5vcHRpb24oY2hpbGQpO1xuXG4gICAgICAgICRjaGlsZHJlbi5wdXNoKCRjaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIHZhciAkY2hpbGRyZW5Db250YWluZXIgPSAkKCc8dWw+PC91bD4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdzZWxlY3QyLXJlc3VsdHNfX29wdGlvbnMgc2VsZWN0Mi1yZXN1bHRzX19vcHRpb25zLS1uZXN0ZWQnLFxuICAgICAgICAncm9sZSc6ICdub25lJ1xuICAgICAgfSk7XG5cbiAgICAgICRjaGlsZHJlbkNvbnRhaW5lci5hcHBlbmQoJGNoaWxkcmVuKTtcblxuICAgICAgJG9wdGlvbi5hcHBlbmQobGFiZWwpO1xuICAgICAgJG9wdGlvbi5hcHBlbmQoJGNoaWxkcmVuQ29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZW1wbGF0ZShkYXRhLCBvcHRpb24pO1xuICAgIH1cblxuICAgIFV0aWxzLlN0b3JlRGF0YShvcHRpb24sICdkYXRhJywgZGF0YSk7XG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIGlkID0gY29udGFpbmVyLmlkICsgJy1yZXN1bHRzJztcblxuICAgIHRoaXMuJHJlc3VsdHMuYXR0cignaWQnLCBpZCk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6YWxsJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgc2VsZi5jbGVhcigpO1xuICAgICAgc2VsZi5hcHBlbmQocGFyYW1zLmRhdGEpO1xuXG4gICAgICBpZiAoY29udGFpbmVyLmlzT3BlbigpKSB7XG4gICAgICAgIHNlbGYuc2V0Q2xhc3NlcygpO1xuICAgICAgICBzZWxmLmhpZ2hsaWdodEZpcnN0SXRlbSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdyZXN1bHRzOmFwcGVuZCcsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHNlbGYuYXBwZW5kKHBhcmFtcy5kYXRhKTtcblxuICAgICAgaWYgKGNvbnRhaW5lci5pc09wZW4oKSkge1xuICAgICAgICBzZWxmLnNldENsYXNzZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncXVlcnknLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLmhpZGVNZXNzYWdlcygpO1xuICAgICAgc2VsZi5zaG93TG9hZGluZyhwYXJhbXMpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWNvbnRhaW5lci5pc09wZW4oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuc2V0Q2xhc3NlcygpO1xuXG4gICAgICBpZiAoc2VsZi5vcHRpb25zLmdldCgnc2Nyb2xsQWZ0ZXJTZWxlY3QnKSkge1xuICAgICAgICBzZWxmLmhpZ2hsaWdodEZpcnN0SXRlbSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCd1bnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghY29udGFpbmVyLmlzT3BlbigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5zZXRDbGFzc2VzKCk7XG5cbiAgICAgIGlmIChzZWxmLm9wdGlvbnMuZ2V0KCdzY3JvbGxBZnRlclNlbGVjdCcpKSB7XG4gICAgICAgIHNlbGYuaGlnaGxpZ2h0Rmlyc3RJdGVtKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBXaGVuIHRoZSBkcm9wZG93biBpcyBvcGVuLCBhcmlhLWV4cGVuZGVkPVwidHJ1ZVwiXG4gICAgICBzZWxmLiRyZXN1bHRzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgc2VsZi4kcmVzdWx0cy5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICBzZWxmLnNldENsYXNzZXMoKTtcbiAgICAgIHNlbGYuZW5zdXJlSGlnaGxpZ2h0VmlzaWJsZSgpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFdoZW4gdGhlIGRyb3Bkb3duIGlzIGNsb3NlZCwgYXJpYS1leHBlbmRlZD1cImZhbHNlXCJcbiAgICAgIHNlbGYuJHJlc3VsdHMuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgc2VsZi4kcmVzdWx0cy5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICBzZWxmLiRyZXN1bHRzLnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdyZXN1bHRzOnRvZ2dsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkaGlnaGxpZ2h0ZWQgPSBzZWxmLmdldEhpZ2hsaWdodGVkUmVzdWx0cygpO1xuXG4gICAgICBpZiAoJGhpZ2hsaWdodGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICRoaWdobGlnaHRlZC50cmlnZ2VyKCdtb3VzZXVwJyk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6c2VsZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRoaWdobGlnaHRlZCA9IHNlbGYuZ2V0SGlnaGxpZ2h0ZWRSZXN1bHRzKCk7XG5cbiAgICAgIGlmICgkaGlnaGxpZ2h0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdGEgPSBVdGlscy5HZXREYXRhKCRoaWdobGlnaHRlZFswXSwgJ2RhdGEnKTtcblxuICAgICAgaWYgKCRoaWdobGlnaHRlZC5oYXNDbGFzcygnc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkJykpIHtcbiAgICAgICAgc2VsZi50cmlnZ2VyKCdjbG9zZScsIHt9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0Jywge1xuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6cHJldmlvdXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJGhpZ2hsaWdodGVkID0gc2VsZi5nZXRIaWdobGlnaHRlZFJlc3VsdHMoKTtcblxuICAgICAgdmFyICRvcHRpb25zID0gc2VsZi4kcmVzdWx0cy5maW5kKCcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnKTtcblxuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9ICRvcHRpb25zLmluZGV4KCRoaWdobGlnaHRlZCk7XG5cbiAgICAgIC8vIElmIHdlIGFyZSBhbHJlYWR5IGF0IHRoZSB0b3AsIGRvbid0IG1vdmUgZnVydGhlclxuICAgICAgLy8gSWYgbm8gb3B0aW9ucywgY3VycmVudEluZGV4IHdpbGwgYmUgLTFcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPD0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuXG4gICAgICAvLyBJZiBub25lIGFyZSBoaWdobGlnaHRlZCwgaGlnaGxpZ2h0IHRoZSBmaXJzdFxuICAgICAgaWYgKCRoaWdobGlnaHRlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbmV4dEluZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgdmFyICRuZXh0ID0gJG9wdGlvbnMuZXEobmV4dEluZGV4KTtcblxuICAgICAgJG5leHQudHJpZ2dlcignbW91c2VlbnRlcicpO1xuXG4gICAgICB2YXIgY3VycmVudE9mZnNldCA9IHNlbGYuJHJlc3VsdHMub2Zmc2V0KCkudG9wO1xuICAgICAgdmFyIG5leHRUb3AgPSAkbmV4dC5vZmZzZXQoKS50b3A7XG4gICAgICB2YXIgbmV4dE9mZnNldCA9IHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKCkgKyAobmV4dFRvcCAtIGN1cnJlbnRPZmZzZXQpO1xuXG4gICAgICBpZiAobmV4dEluZGV4ID09PSAwKSB7XG4gICAgICAgIHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKDApO1xuICAgICAgfSBlbHNlIGlmIChuZXh0VG9wIC0gY3VycmVudE9mZnNldCA8IDApIHtcbiAgICAgICAgc2VsZi4kcmVzdWx0cy5zY3JvbGxUb3AobmV4dE9mZnNldCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6bmV4dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkaGlnaGxpZ2h0ZWQgPSBzZWxmLmdldEhpZ2hsaWdodGVkUmVzdWx0cygpO1xuXG4gICAgICB2YXIgJG9wdGlvbnMgPSBzZWxmLiRyZXN1bHRzLmZpbmQoJy5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZScpO1xuXG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gJG9wdGlvbnMuaW5kZXgoJGhpZ2hsaWdodGVkKTtcblxuICAgICAgdmFyIG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XG5cbiAgICAgIC8vIElmIHdlIGFyZSBhdCB0aGUgbGFzdCBvcHRpb24sIHN0YXkgdGhlcmVcbiAgICAgIGlmIChuZXh0SW5kZXggPj0gJG9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyICRuZXh0ID0gJG9wdGlvbnMuZXEobmV4dEluZGV4KTtcblxuICAgICAgJG5leHQudHJpZ2dlcignbW91c2VlbnRlcicpO1xuXG4gICAgICB2YXIgY3VycmVudE9mZnNldCA9IHNlbGYuJHJlc3VsdHMub2Zmc2V0KCkudG9wICtcbiAgICAgICAgc2VsZi4kcmVzdWx0cy5vdXRlckhlaWdodChmYWxzZSk7XG4gICAgICB2YXIgbmV4dEJvdHRvbSA9ICRuZXh0Lm9mZnNldCgpLnRvcCArICRuZXh0Lm91dGVySGVpZ2h0KGZhbHNlKTtcbiAgICAgIHZhciBuZXh0T2Zmc2V0ID0gc2VsZi4kcmVzdWx0cy5zY3JvbGxUb3AoKSArIG5leHRCb3R0b20gLSBjdXJyZW50T2Zmc2V0O1xuXG4gICAgICBpZiAobmV4dEluZGV4ID09PSAwKSB7XG4gICAgICAgIHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKDApO1xuICAgICAgfSBlbHNlIGlmIChuZXh0Qm90dG9tID4gY3VycmVudE9mZnNldCkge1xuICAgICAgICBzZWxmLiRyZXN1bHRzLnNjcm9sbFRvcChuZXh0T2Zmc2V0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncmVzdWx0czpmb2N1cycsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHBhcmFtcy5lbGVtZW50WzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1oaWdobGlnaHRlZCcpO1xuICAgICAgcGFyYW1zLmVsZW1lbnRbMF0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncmVzdWx0czptZXNzYWdlJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgc2VsZi5kaXNwbGF5TWVzc2FnZShwYXJhbXMpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQuZm4ubW91c2V3aGVlbCkge1xuICAgICAgdGhpcy4kcmVzdWx0cy5vbignbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciB0b3AgPSBzZWxmLiRyZXN1bHRzLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgIHZhciBib3R0b20gPSBzZWxmLiRyZXN1bHRzLmdldCgwKS5zY3JvbGxIZWlnaHQgLSB0b3AgKyBlLmRlbHRhWTtcblxuICAgICAgICB2YXIgaXNBdFRvcCA9IGUuZGVsdGFZID4gMCAmJiB0b3AgLSBlLmRlbHRhWSA8PSAwO1xuICAgICAgICB2YXIgaXNBdEJvdHRvbSA9IGUuZGVsdGFZIDwgMCAmJiBib3R0b20gPD0gc2VsZi4kcmVzdWx0cy5oZWlnaHQoKTtcblxuICAgICAgICBpZiAoaXNBdFRvcCkge1xuICAgICAgICAgIHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKDApO1xuXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBdEJvdHRvbSkge1xuICAgICAgICAgIHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKFxuICAgICAgICAgICAgc2VsZi4kcmVzdWx0cy5nZXQoMCkuc2Nyb2xsSGVpZ2h0IC0gc2VsZi4kcmVzdWx0cy5oZWlnaHQoKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy4kcmVzdWx0cy5vbignbW91c2V1cCcsICcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnLFxuICAgICAgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgdmFyIGRhdGEgPSBVdGlscy5HZXREYXRhKHRoaXMsICdkYXRhJyk7XG5cbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkJykpIHtcbiAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5nZXQoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3Vuc2VsZWN0Jywge1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0LFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcignY2xvc2UnLCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0Jywge1xuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnQsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kcmVzdWx0cy5vbignbW91c2VlbnRlcicsICcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnLFxuICAgICAgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgdmFyIGRhdGEgPSBVdGlscy5HZXREYXRhKHRoaXMsICdkYXRhJyk7XG5cbiAgICAgIHNlbGYuZ2V0SGlnaGxpZ2h0ZWRSZXN1bHRzKClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1oaWdobGlnaHRlZCcpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcblxuICAgICAgc2VsZi50cmlnZ2VyKCdyZXN1bHRzOmZvY3VzJywge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBlbGVtZW50OiAkKHRoaXMpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5nZXRIaWdobGlnaHRlZFJlc3VsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRoaWdobGlnaHRlZCA9IHRoaXMuJHJlc3VsdHNcbiAgICAuZmluZCgnLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1oaWdobGlnaHRlZCcpO1xuXG4gICAgcmV0dXJuICRoaWdobGlnaHRlZDtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJlc3VsdHMucmVtb3ZlKCk7XG4gIH07XG5cbiAgUmVzdWx0cy5wcm90b3R5cGUuZW5zdXJlSGlnaGxpZ2h0VmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGhpZ2hsaWdodGVkID0gdGhpcy5nZXRIaWdobGlnaHRlZFJlc3VsdHMoKTtcblxuICAgIGlmICgkaGlnaGxpZ2h0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyICRvcHRpb25zID0gdGhpcy4kcmVzdWx0cy5maW5kKCcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnKTtcblxuICAgIHZhciBjdXJyZW50SW5kZXggPSAkb3B0aW9ucy5pbmRleCgkaGlnaGxpZ2h0ZWQpO1xuXG4gICAgdmFyIGN1cnJlbnRPZmZzZXQgPSB0aGlzLiRyZXN1bHRzLm9mZnNldCgpLnRvcDtcbiAgICB2YXIgbmV4dFRvcCA9ICRoaWdobGlnaHRlZC5vZmZzZXQoKS50b3A7XG4gICAgdmFyIG5leHRPZmZzZXQgPSB0aGlzLiRyZXN1bHRzLnNjcm9sbFRvcCgpICsgKG5leHRUb3AgLSBjdXJyZW50T2Zmc2V0KTtcblxuICAgIHZhciBvZmZzZXREZWx0YSA9IG5leHRUb3AgLSBjdXJyZW50T2Zmc2V0O1xuICAgIG5leHRPZmZzZXQgLT0gJGhpZ2hsaWdodGVkLm91dGVySGVpZ2h0KGZhbHNlKSAqIDI7XG5cbiAgICBpZiAoY3VycmVudEluZGV4IDw9IDIpIHtcbiAgICAgIHRoaXMuJHJlc3VsdHMuc2Nyb2xsVG9wKDApO1xuICAgIH0gZWxzZSBpZiAob2Zmc2V0RGVsdGEgPiB0aGlzLiRyZXN1bHRzLm91dGVySGVpZ2h0KCkgfHwgb2Zmc2V0RGVsdGEgPCAwKSB7XG4gICAgICB0aGlzLiRyZXN1bHRzLnNjcm9sbFRvcChuZXh0T2Zmc2V0KTtcbiAgICB9XG4gIH07XG5cbiAgUmVzdWx0cy5wcm90b3R5cGUudGVtcGxhdGUgPSBmdW5jdGlvbiAocmVzdWx0LCBjb250YWluZXIpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMuZ2V0KCd0ZW1wbGF0ZVJlc3VsdCcpO1xuICAgIHZhciBlc2NhcGVNYXJrdXAgPSB0aGlzLm9wdGlvbnMuZ2V0KCdlc2NhcGVNYXJrdXAnKTtcblxuICAgIHZhciBjb250ZW50ID0gdGVtcGxhdGUocmVzdWx0LCBjb250YWluZXIpO1xuXG4gICAgaWYgKGNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBlc2NhcGVNYXJrdXAoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoY29udGVudCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBSZXN1bHRzO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9rZXlzJyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIEtFWVMgPSB7XG4gICAgQkFDS1NQQUNFOiA4LFxuICAgIFRBQjogOSxcbiAgICBFTlRFUjogMTMsXG4gICAgU0hJRlQ6IDE2LFxuICAgIENUUkw6IDE3LFxuICAgIEFMVDogMTgsXG4gICAgRVNDOiAyNyxcbiAgICBTUEFDRTogMzIsXG4gICAgUEFHRV9VUDogMzMsXG4gICAgUEFHRV9ET1dOOiAzNCxcbiAgICBFTkQ6IDM1LFxuICAgIEhPTUU6IDM2LFxuICAgIExFRlQ6IDM3LFxuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgRE9XTjogNDAsXG4gICAgREVMRVRFOiA0NlxuICB9O1xuXG4gIHJldHVybiBLRVlTO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vYmFzZScsW1xuICAnanF1ZXJ5JyxcbiAgJy4uL3V0aWxzJyxcbiAgJy4uL2tleXMnXG5dLCBmdW5jdGlvbiAoJCwgVXRpbHMsIEtFWVMpIHtcbiAgZnVuY3Rpb24gQmFzZVNlbGVjdGlvbiAoJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIEJhc2VTZWxlY3Rpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoQmFzZVNlbGVjdGlvbiwgVXRpbHMuT2JzZXJ2YWJsZSk7XG5cbiAgQmFzZVNlbGVjdGlvbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkc2VsZWN0aW9uID0gJChcbiAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uXCIgcm9sZT1cImNvbWJvYm94XCIgJyArXG4gICAgICAnIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+JyArXG4gICAgICAnPC9zcGFuPidcbiAgICApO1xuXG4gICAgdGhpcy5fdGFiaW5kZXggPSAwO1xuXG4gICAgaWYgKFV0aWxzLkdldERhdGEodGhpcy4kZWxlbWVudFswXSwgJ29sZC10YWJpbmRleCcpICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3RhYmluZGV4ID0gVXRpbHMuR2V0RGF0YSh0aGlzLiRlbGVtZW50WzBdLCAnb2xkLXRhYmluZGV4Jyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiRlbGVtZW50LmF0dHIoJ3RhYmluZGV4JykgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdGFiaW5kZXggPSB0aGlzLiRlbGVtZW50LmF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgfVxuXG4gICAgJHNlbGVjdGlvbi5hdHRyKCd0aXRsZScsIHRoaXMuJGVsZW1lbnQuYXR0cigndGl0bGUnKSk7XG4gICAgJHNlbGVjdGlvbi5hdHRyKCd0YWJpbmRleCcsIHRoaXMuX3RhYmluZGV4KTtcbiAgICAkc2VsZWN0aW9uLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbiA9ICRzZWxlY3Rpb247XG5cbiAgICByZXR1cm4gJHNlbGVjdGlvbjtcbiAgfTtcblxuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciByZXN1bHRzSWQgPSBjb250YWluZXIuaWQgKyAnLXJlc3VsdHMnO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2ZvY3VzJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdmb2N1cycsIGV2dCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2JsdXInLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBzZWxmLl9oYW5kbGVCbHVyKGV2dCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBzZWxmLnRyaWdnZXIoJ2tleXByZXNzJywgZXZ0KTtcblxuICAgICAgaWYgKGV2dC53aGljaCA9PT0gS0VZUy5TUEFDRSkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncmVzdWx0czpmb2N1cycsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHNlbGYuJHNlbGVjdGlvbi5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBwYXJhbXMuZGF0YS5fcmVzdWx0SWQpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdzZWxlY3Rpb246dXBkYXRlJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgc2VsZi51cGRhdGUocGFyYW1zLmRhdGEpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gV2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbiwgYXJpYS1leHBhbmRlZD1cInRydWVcIlxuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ2FyaWEtb3ducycsIHJlc3VsdHNJZCk7XG5cbiAgICAgIHNlbGYuX2F0dGFjaENsb3NlSGFuZGxlcihjb250YWluZXIpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFdoZW4gdGhlIGRyb3Bkb3duIGlzIGNsb3NlZCwgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgIHNlbGYuJHNlbGVjdGlvbi5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICBzZWxmLiRzZWxlY3Rpb24ucmVtb3ZlQXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICBzZWxmLiRzZWxlY3Rpb24ucmVtb3ZlQXR0cignYXJpYS1vd25zJyk7XG5cbiAgICAgIHNlbGYuJHNlbGVjdGlvbi50cmlnZ2VyKCdmb2N1cycpO1xuXG4gICAgICBzZWxmLl9kZXRhY2hDbG9zZUhhbmRsZXIoY29udGFpbmVyKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbignZW5hYmxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ3RhYmluZGV4Jywgc2VsZi5fdGFiaW5kZXgpO1xuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbignZGlzYWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuJHNlbGVjdGlvbi5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhc2VTZWxlY3Rpb24ucHJvdG90eXBlLl9oYW5kbGVCbHVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVsYXllZCBhcyB0aGUgYWN0aXZlIGVsZW1lbnQgaXMgdGhlIGJvZHkgd2hlbiB0aGUgdGFiXG4gICAgLy8ga2V5IGlzIHByZXNzZWQsIHBvc3NpYmx5IGFsb25nIHdpdGggb3RoZXJzLlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIERvbid0IHRyaWdnZXIgYGJsdXJgIGlmIHRoZSBmb2N1cyBpcyBzdGlsbCBpbiB0aGUgc2VsZWN0aW9uXG4gICAgICBpZiAoXG4gICAgICAgIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09IHNlbGYuJHNlbGVjdGlvblswXSkgfHxcbiAgICAgICAgKCQuY29udGFpbnMoc2VsZi4kc2VsZWN0aW9uWzBdLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJpZ2dlcignYmx1cicsIGV2dCk7XG4gICAgfSwgMSk7XG4gIH07XG5cbiAgQmFzZVNlbGVjdGlvbi5wcm90b3R5cGUuX2F0dGFjaENsb3NlSGFuZGxlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcblxuICAgICQoZG9jdW1lbnQuYm9keSkub24oJ21vdXNlZG93bi5zZWxlY3QyLicgKyBjb250YWluZXIuaWQsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXG4gICAgICB2YXIgJHNlbGVjdCA9ICR0YXJnZXQuY2xvc2VzdCgnLnNlbGVjdDInKTtcblxuICAgICAgdmFyICRhbGwgPSAkKCcuc2VsZWN0Mi5zZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpO1xuXG4gICAgICAkYWxsLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcyA9PSAkc2VsZWN0WzBdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyICRlbGVtZW50ID0gVXRpbHMuR2V0RGF0YSh0aGlzLCAnZWxlbWVudCcpO1xuXG4gICAgICAgICRlbGVtZW50LnNlbGVjdDIoJ2Nsb3NlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5fZGV0YWNoQ2xvc2VIYW5kbGVyID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICQoZG9jdW1lbnQuYm9keSkub2ZmKCdtb3VzZWRvd24uc2VsZWN0Mi4nICsgY29udGFpbmVyLmlkKTtcbiAgfTtcblxuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5wb3NpdGlvbiA9IGZ1bmN0aW9uICgkc2VsZWN0aW9uLCAkY29udGFpbmVyKSB7XG4gICAgdmFyICRzZWxlY3Rpb25Db250YWluZXIgPSAkY29udGFpbmVyLmZpbmQoJy5zZWxlY3Rpb24nKTtcbiAgICAkc2VsZWN0aW9uQ29udGFpbmVyLmFwcGVuZCgkc2VsZWN0aW9uKTtcbiAgfTtcblxuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2RldGFjaENsb3NlSGFuZGxlcih0aGlzLmNvbnRhaW5lcik7XG4gIH07XG5cbiAgQmFzZVNlbGVjdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgdXBkYXRlYCBtZXRob2QgbXVzdCBiZSBkZWZpbmVkIGluIGNoaWxkIGNsYXNzZXMuJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gYWJzdHJhY3QgdGhlIFwiZW5hYmxlZFwiIChub3QgXCJkaXNhYmxlZFwiKSBzdGF0ZSBvZiB0aGlzXG4gICAqIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybiB7dHJ1ZX0gaWYgdGhlIGluc3RhbmNlIGlzIG5vdCBkaXNhYmxlZC5cbiAgICogQHJldHVybiB7ZmFsc2V9IGlmIHRoZSBpbnN0YW5jZSBpcyBkaXNhYmxlZC5cbiAgICovXG4gIEJhc2VTZWxlY3Rpb24ucHJvdG90eXBlLmlzRW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNEaXNhYmxlZCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIZWxwZXIgbWV0aG9kIHRvIGFic3RyYWN0IHRoZSBcImRpc2FibGVkXCIgc3RhdGUgb2YgdGhpcyBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm4ge3RydWV9IGlmIHRoZSBkaXNhYmxlZCBvcHRpb24gaXMgdHJ1ZS5cbiAgICogQHJldHVybiB7ZmFsc2V9IGlmIHRoZSBkaXNhYmxlZCBvcHRpb24gaXMgZmFsc2UuXG4gICAqL1xuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5pc0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ2V0KCdkaXNhYmxlZCcpO1xuICB9O1xuXG4gIHJldHVybiBCYXNlU2VsZWN0aW9uO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vc2luZ2xlJyxbXG4gICdqcXVlcnknLFxuICAnLi9iYXNlJyxcbiAgJy4uL3V0aWxzJyxcbiAgJy4uL2tleXMnXG5dLCBmdW5jdGlvbiAoJCwgQmFzZVNlbGVjdGlvbiwgVXRpbHMsIEtFWVMpIHtcbiAgZnVuY3Rpb24gU2luZ2xlU2VsZWN0aW9uICgpIHtcbiAgICBTaW5nbGVTZWxlY3Rpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoU2luZ2xlU2VsZWN0aW9uLCBCYXNlU2VsZWN0aW9uKTtcblxuICBTaW5nbGVTZWxlY3Rpb24ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHNlbGVjdGlvbiA9IFNpbmdsZVNlbGVjdGlvbi5fX3N1cGVyX18ucmVuZGVyLmNhbGwodGhpcyk7XG5cbiAgICAkc2VsZWN0aW9uWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItc2VsZWN0aW9uLS1zaW5nbGUnKTtcblxuICAgICRzZWxlY3Rpb24uaHRtbChcbiAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZFwiPjwvc3Bhbj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uX19hcnJvd1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj4nICtcbiAgICAgICAgJzxiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48L2I+JyArXG4gICAgICAnPC9zcGFuPidcbiAgICApO1xuXG4gICAgcmV0dXJuICRzZWxlY3Rpb247XG4gIH07XG5cbiAgU2luZ2xlU2VsZWN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIFNpbmdsZVNlbGVjdGlvbi5fX3N1cGVyX18uYmluZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGlkID0gY29udGFpbmVyLmlkICsgJy1jb250YWluZXInO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWQnKVxuICAgICAgLmF0dHIoJ2lkJywgaWQpXG4gICAgICAuYXR0cigncm9sZScsICd0ZXh0Ym94JylcbiAgICAgIC5hdHRyKCdhcmlhLXJlYWRvbmx5JywgJ3RydWUnKTtcbiAgICB0aGlzLiRzZWxlY3Rpb24uYXR0cignYXJpYS1sYWJlbGxlZGJ5JywgaWQpO1xuICAgIHRoaXMuJHNlbGVjdGlvbi5hdHRyKCdhcmlhLWNvbnRyb2xzJywgaWQpO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAvLyBPbmx5IHJlc3BvbmQgdG8gbGVmdCBjbGlja3NcbiAgICAgIGlmIChldnQud2hpY2ggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnRyaWdnZXIoJ3RvZ2dsZScsIHtcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5vbignZm9jdXMnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAvLyBVc2VyIGZvY3VzZXMgb24gdGhlIGNvbnRhaW5lclxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdibHVyJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgLy8gVXNlciBleGl0cyB0aGUgY29udGFpbmVyXG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2ZvY3VzJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgaWYgKCFjb250YWluZXIuaXNPcGVuKCkpIHtcbiAgICAgICAgc2VsZi4kc2VsZWN0aW9uLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgU2luZ2xlU2VsZWN0aW9uLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHJlbmRlcmVkID0gdGhpcy4kc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWQnKTtcbiAgICAkcmVuZGVyZWQuZW1wdHkoKTtcbiAgICAkcmVuZGVyZWQucmVtb3ZlQXR0cigndGl0bGUnKTsgLy8gY2xlYXIgdG9vbHRpcCBvbiBlbXB0eVxuICB9O1xuXG4gIFNpbmdsZVNlbGVjdGlvbi5wcm90b3R5cGUuZGlzcGxheSA9IGZ1bmN0aW9uIChkYXRhLCBjb250YWluZXIpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMuZ2V0KCd0ZW1wbGF0ZVNlbGVjdGlvbicpO1xuICAgIHZhciBlc2NhcGVNYXJrdXAgPSB0aGlzLm9wdGlvbnMuZ2V0KCdlc2NhcGVNYXJrdXAnKTtcblxuICAgIHJldHVybiBlc2NhcGVNYXJrdXAodGVtcGxhdGUoZGF0YSwgY29udGFpbmVyKSk7XG4gIH07XG5cbiAgU2luZ2xlU2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3Rpb25Db250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgfTtcblxuICBTaW5nbGVTZWxlY3Rpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNlbGVjdGlvbiA9IGRhdGFbMF07XG5cbiAgICB2YXIgJHJlbmRlcmVkID0gdGhpcy4kc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWQnKTtcbiAgICB2YXIgZm9ybWF0dGVkID0gdGhpcy5kaXNwbGF5KHNlbGVjdGlvbiwgJHJlbmRlcmVkKTtcblxuICAgICRyZW5kZXJlZC5lbXB0eSgpLmFwcGVuZChmb3JtYXR0ZWQpO1xuXG4gICAgdmFyIHRpdGxlID0gc2VsZWN0aW9uLnRpdGxlIHx8IHNlbGVjdGlvbi50ZXh0O1xuXG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICAkcmVuZGVyZWQuYXR0cigndGl0bGUnLCB0aXRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRyZW5kZXJlZC5yZW1vdmVBdHRyKCd0aXRsZScpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU2luZ2xlU2VsZWN0aW9uO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vbXVsdGlwbGUnLFtcbiAgJ2pxdWVyeScsXG4gICcuL2Jhc2UnLFxuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgQmFzZVNlbGVjdGlvbiwgVXRpbHMpIHtcbiAgZnVuY3Rpb24gTXVsdGlwbGVTZWxlY3Rpb24gKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgTXVsdGlwbGVTZWxlY3Rpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoTXVsdGlwbGVTZWxlY3Rpb24sIEJhc2VTZWxlY3Rpb24pO1xuXG4gIE11bHRpcGxlU2VsZWN0aW9uLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRzZWxlY3Rpb24gPSBNdWx0aXBsZVNlbGVjdGlvbi5fX3N1cGVyX18ucmVuZGVyLmNhbGwodGhpcyk7XG5cbiAgICAkc2VsZWN0aW9uWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItc2VsZWN0aW9uLS1tdWx0aXBsZScpO1xuXG4gICAgJHNlbGVjdGlvbi5odG1sKFxuICAgICAgJzx1bCBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZFwiPjwvdWw+J1xuICAgICk7XG5cbiAgICByZXR1cm4gJHNlbGVjdGlvbjtcbiAgfTtcblxuICBNdWx0aXBsZVNlbGVjdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBNdWx0aXBsZVNlbGVjdGlvbi5fX3N1cGVyX18uYmluZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGlkID0gY29udGFpbmVyLmlkICsgJy1jb250YWluZXInO1xuICAgIHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJykuYXR0cignaWQnLCBpZCk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCd0b2dnbGUnLCB7XG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19yZW1vdmUnLFxuICAgICAgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGV2ZW50IGlmIGl0IGlzIGRpc2FibGVkXG4gICAgICAgIGlmIChzZWxmLmlzRGlzYWJsZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkcmVtb3ZlID0gJCh0aGlzKTtcbiAgICAgICAgdmFyICRzZWxlY3Rpb24gPSAkcmVtb3ZlLnBhcmVudCgpO1xuXG4gICAgICAgIHZhciBkYXRhID0gVXRpbHMuR2V0RGF0YSgkc2VsZWN0aW9uWzBdLCAnZGF0YScpO1xuXG4gICAgICAgIHNlbGYudHJpZ2dlcigndW5zZWxlY3QnLCB7XG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0LFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5vbihcbiAgICAgICdrZXlkb3duJyxcbiAgICAgICcuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZV9fcmVtb3ZlJyxcbiAgICAgIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBldmVudCBpZiBpdCBpcyBkaXNhYmxlZFxuICAgICAgICBpZiAoc2VsZi5pc0Rpc2FibGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfTtcblxuICBNdWx0aXBsZVNlbGVjdGlvbi5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRyZW5kZXJlZCA9IHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJyk7XG4gICAgJHJlbmRlcmVkLmVtcHR5KCk7XG4gICAgJHJlbmRlcmVkLnJlbW92ZUF0dHIoJ3RpdGxlJyk7XG4gIH07XG5cbiAgTXVsdGlwbGVTZWxlY3Rpb24ucHJvdG90eXBlLmRpc3BsYXkgPSBmdW5jdGlvbiAoZGF0YSwgY29udGFpbmVyKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gdGhpcy5vcHRpb25zLmdldCgndGVtcGxhdGVTZWxlY3Rpb24nKTtcbiAgICB2YXIgZXNjYXBlTWFya3VwID0gdGhpcy5vcHRpb25zLmdldCgnZXNjYXBlTWFya3VwJyk7XG5cbiAgICByZXR1cm4gZXNjYXBlTWFya3VwKHRlbXBsYXRlKGRhdGEsIGNvbnRhaW5lcikpO1xuICB9O1xuXG4gIE11bHRpcGxlU2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3Rpb25Db250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRjb250YWluZXIgPSAkKFxuICAgICAgJzxsaSBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uX19jaG9pY2VcIj4nICtcbiAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZV9fcmVtb3ZlXCIgJyArXG4gICAgICAgICd0YWJpbmRleD1cIi0xXCI+JyArXG4gICAgICAgICAgJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+JyArXG4gICAgICAgICc8L2J1dHRvbj4nICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZV9fZGlzcGxheVwiPjwvc3Bhbj4nICtcbiAgICAgICc8L2xpPidcbiAgICApO1xuXG4gICAgcmV0dXJuICRjb250YWluZXI7XG4gIH07XG5cbiAgTXVsdGlwbGVTZWxlY3Rpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyICRzZWxlY3Rpb25zID0gW107XG5cbiAgICB2YXIgc2VsZWN0aW9uSWRQcmVmaXggPSB0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZCcpXG4gICAgICAuYXR0cignaWQnKSArICctY2hvaWNlLSc7XG5cbiAgICBmb3IgKHZhciBkID0gMDsgZCA8IGRhdGEubGVuZ3RoOyBkKyspIHtcbiAgICAgIHZhciBzZWxlY3Rpb24gPSBkYXRhW2RdO1xuXG4gICAgICB2YXIgJHNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uQ29udGFpbmVyKCk7XG4gICAgICB2YXIgZm9ybWF0dGVkID0gdGhpcy5kaXNwbGF5KHNlbGVjdGlvbiwgJHNlbGVjdGlvbik7XG5cbiAgICAgIHZhciBzZWxlY3Rpb25JZCA9IHNlbGVjdGlvbklkUHJlZml4ICsgVXRpbHMuZ2VuZXJhdGVDaGFycyg0KSArICctJztcblxuICAgICAgaWYgKHNlbGVjdGlvbi5pZCkge1xuICAgICAgICBzZWxlY3Rpb25JZCArPSBzZWxlY3Rpb24uaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3Rpb25JZCArPSBVdGlscy5nZW5lcmF0ZUNoYXJzKDQpO1xuICAgICAgfVxuXG4gICAgICAkc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19kaXNwbGF5JylcbiAgICAgICAgLmFwcGVuZChmb3JtYXR0ZWQpXG4gICAgICAgIC5hdHRyKCdpZCcsIHNlbGVjdGlvbklkKTtcblxuICAgICAgdmFyIHRpdGxlID0gc2VsZWN0aW9uLnRpdGxlIHx8IHNlbGVjdGlvbi50ZXh0O1xuXG4gICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgJHNlbGVjdGlvbi5hdHRyKCd0aXRsZScsIHRpdGxlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbW92ZUl0ZW0gPSB0aGlzLm9wdGlvbnMuZ2V0KCd0cmFuc2xhdGlvbnMnKS5nZXQoJ3JlbW92ZUl0ZW0nKTtcblxuICAgICAgdmFyICRyZW1vdmUgPSAkc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19yZW1vdmUnKTtcblxuICAgICAgJHJlbW92ZS5hdHRyKCd0aXRsZScsIHJlbW92ZUl0ZW0oKSk7XG4gICAgICAkcmVtb3ZlLmF0dHIoJ2FyaWEtbGFiZWwnLCByZW1vdmVJdGVtKCkpO1xuICAgICAgJHJlbW92ZS5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5Jywgc2VsZWN0aW9uSWQpO1xuXG4gICAgICBVdGlscy5TdG9yZURhdGEoJHNlbGVjdGlvblswXSwgJ2RhdGEnLCBzZWxlY3Rpb24pO1xuXG4gICAgICAkc2VsZWN0aW9ucy5wdXNoKCRzZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIHZhciAkcmVuZGVyZWQgPSB0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZCcpO1xuXG4gICAgJHJlbmRlcmVkLmFwcGVuZCgkc2VsZWN0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIE11bHRpcGxlU2VsZWN0aW9uO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vcGxhY2Vob2xkZXInLFtcblxuXSwgZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQbGFjZWhvbGRlciAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLm5vcm1hbGl6ZVBsYWNlaG9sZGVyKG9wdGlvbnMuZ2V0KCdwbGFjZWhvbGRlcicpKTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIFBsYWNlaG9sZGVyLnByb3RvdHlwZS5ub3JtYWxpemVQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIChfLCBwbGFjZWhvbGRlcikge1xuICAgIGlmICh0eXBlb2YgcGxhY2Vob2xkZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwbGFjZWhvbGRlciA9IHtcbiAgICAgICAgaWQ6ICcnLFxuICAgICAgICB0ZXh0OiBwbGFjZWhvbGRlclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gIH07XG5cbiAgUGxhY2Vob2xkZXIucHJvdG90eXBlLmNyZWF0ZVBsYWNlaG9sZGVyID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgcGxhY2Vob2xkZXIpIHtcbiAgICB2YXIgJHBsYWNlaG9sZGVyID0gdGhpcy5zZWxlY3Rpb25Db250YWluZXIoKTtcblxuICAgICRwbGFjZWhvbGRlci5odG1sKHRoaXMuZGlzcGxheShwbGFjZWhvbGRlcikpO1xuICAgICRwbGFjZWhvbGRlclswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLXNlbGVjdGlvbl9fcGxhY2Vob2xkZXInKTtcbiAgICAkcGxhY2Vob2xkZXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZScpO1xuXG4gICAgdmFyIHBsYWNlaG9sZGVyVGl0bGUgPSBwbGFjZWhvbGRlci50aXRsZSB8fFxuICAgICAgcGxhY2Vob2xkZXIudGV4dCB8fFxuICAgICAgJHBsYWNlaG9sZGVyLnRleHQoKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJykuYXR0cihcbiAgICAgICd0aXRsZScsXG4gICAgICBwbGFjZWhvbGRlclRpdGxlXG4gICAgKTtcblxuICAgIHJldHVybiAkcGxhY2Vob2xkZXI7XG4gIH07XG5cbiAgUGxhY2Vob2xkZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGRhdGEpIHtcbiAgICB2YXIgc2luZ2xlUGxhY2Vob2xkZXIgPSAoXG4gICAgICBkYXRhLmxlbmd0aCA9PSAxICYmIGRhdGFbMF0uaWQgIT0gdGhpcy5wbGFjZWhvbGRlci5pZFxuICAgICk7XG4gICAgdmFyIG11bHRpcGxlU2VsZWN0aW9ucyA9IGRhdGEubGVuZ3RoID4gMTtcblxuICAgIGlmIChtdWx0aXBsZVNlbGVjdGlvbnMgfHwgc2luZ2xlUGxhY2Vob2xkZXIpIHtcbiAgICAgIHJldHVybiBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICB2YXIgJHBsYWNlaG9sZGVyID0gdGhpcy5jcmVhdGVQbGFjZWhvbGRlcih0aGlzLnBsYWNlaG9sZGVyKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJykuYXBwZW5kKCRwbGFjZWhvbGRlcik7XG4gIH07XG5cbiAgcmV0dXJuIFBsYWNlaG9sZGVyO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vYWxsb3dDbGVhcicsW1xuICAnanF1ZXJ5JyxcbiAgJy4uL2tleXMnLFxuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgS0VZUywgVXRpbHMpIHtcbiAgZnVuY3Rpb24gQWxsb3dDbGVhciAoKSB7IH1cblxuICBBbGxvd0NsZWFyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgY29udGFpbmVyLCAkY29udGFpbmVyKTtcblxuICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZ2V0KCdkZWJ1ZycpICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAnU2VsZWN0MjogVGhlIGBhbGxvd0NsZWFyYCBvcHRpb24gc2hvdWxkIGJlIHVzZWQgaW4gY29tYmluYXRpb24gJyArXG4gICAgICAgICAgJ3dpdGggdGhlIGBwbGFjZWhvbGRlcmAgb3B0aW9uLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ21vdXNlZG93bicsICcuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyJyxcbiAgICAgIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgc2VsZi5faGFuZGxlQ2xlYXIoZXZ0KTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBzZWxmLl9oYW5kbGVLZXlib2FyZENsZWFyKGV2dCwgY29udGFpbmVyKTtcbiAgICB9KTtcbiAgfTtcblxuICBBbGxvd0NsZWFyLnByb3RvdHlwZS5faGFuZGxlQ2xlYXIgPSBmdW5jdGlvbiAoXywgZXZ0KSB7XG4gICAgLy8gSWdub3JlIHRoZSBldmVudCBpZiBpdCBpcyBkaXNhYmxlZFxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciAkY2xlYXIgPSB0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpO1xuXG4gICAgLy8gSWdub3JlIHRoZSBldmVudCBpZiBub3RoaW5nIGhhcyBiZWVuIHNlbGVjdGVkXG4gICAgaWYgKCRjbGVhci5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB2YXIgZGF0YSA9IFV0aWxzLkdldERhdGEoJGNsZWFyWzBdLCAnZGF0YScpO1xuXG4gICAgdmFyIHByZXZpb3VzVmFsID0gdGhpcy4kZWxlbWVudC52YWwoKTtcbiAgICB0aGlzLiRlbGVtZW50LnZhbCh0aGlzLnBsYWNlaG9sZGVyLmlkKTtcblxuICAgIHZhciB1bnNlbGVjdERhdGEgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICB0aGlzLnRyaWdnZXIoJ2NsZWFyJywgdW5zZWxlY3REYXRhKTtcbiAgICBpZiAodW5zZWxlY3REYXRhLnByZXZlbnRlZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC52YWwocHJldmlvdXNWYWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YS5sZW5ndGg7IGQrKykge1xuICAgICAgdW5zZWxlY3REYXRhID0ge1xuICAgICAgICBkYXRhOiBkYXRhW2RdXG4gICAgICB9O1xuXG4gICAgICAvLyBUcmlnZ2VyIHRoZSBgdW5zZWxlY3RgIGV2ZW50LCBzbyBwZW9wbGUgY2FuIHByZXZlbnQgaXQgZnJvbSBiZWluZ1xuICAgICAgLy8gY2xlYXJlZC5cbiAgICAgIHRoaXMudHJpZ2dlcigndW5zZWxlY3QnLCB1bnNlbGVjdERhdGEpO1xuXG4gICAgICAvLyBJZiB0aGUgZXZlbnQgd2FzIHByZXZlbnRlZCwgZG9uJ3QgY2xlYXIgaXQgb3V0LlxuICAgICAgaWYgKHVuc2VsZWN0RGF0YS5wcmV2ZW50ZWQpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC52YWwocHJldmlvdXNWYWwpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgdGhpcy50cmlnZ2VyKCd0b2dnbGUnLCB7fSk7XG4gIH07XG5cbiAgQWxsb3dDbGVhci5wcm90b3R5cGUuX2hhbmRsZUtleWJvYXJkQ2xlYXIgPSBmdW5jdGlvbiAoXywgZXZ0LCBjb250YWluZXIpIHtcbiAgICBpZiAoY29udGFpbmVyLmlzT3BlbigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2dC53aGljaCA9PSBLRVlTLkRFTEVURSB8fCBldnQud2hpY2ggPT0gS0VZUy5CQUNLU1BBQ0UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZUNsZWFyKGV2dCk7XG4gICAgfVxuICB9O1xuXG4gIEFsbG93Q2xlYXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGRhdGEpIHtcbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBkYXRhKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyJykucmVtb3ZlKCk7XG4gICAgdGhpcy4kc2VsZWN0aW9uWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItc2VsZWN0aW9uLS1jbGVhcmFibGUnKTtcblxuICAgIGlmICh0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19wbGFjZWhvbGRlcicpLmxlbmd0aCA+IDAgfHxcbiAgICAgICAgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2VsZWN0aW9uSWQgPSB0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZCcpXG4gICAgICAuYXR0cignaWQnKTtcblxuICAgIHZhciByZW1vdmVBbGwgPSB0aGlzLm9wdGlvbnMuZ2V0KCd0cmFuc2xhdGlvbnMnKS5nZXQoJ3JlbW92ZUFsbEl0ZW1zJyk7XG5cbiAgICB2YXIgJHJlbW92ZSA9ICQoXG4gICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXJcIiB0YWJpbmRleD1cIi0xXCI+JyArXG4gICAgICAgICc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPicgK1xuICAgICAgJzwvYnV0dG9uPidcbiAgICApO1xuICAgICRyZW1vdmUuYXR0cigndGl0bGUnLCByZW1vdmVBbGwoKSk7XG4gICAgJHJlbW92ZS5hdHRyKCdhcmlhLWxhYmVsJywgcmVtb3ZlQWxsKCkpO1xuICAgICRyZW1vdmUuYXR0cignYXJpYS1kZXNjcmliZWRieScsIHNlbGVjdGlvbklkKTtcbiAgICBVdGlscy5TdG9yZURhdGEoJHJlbW92ZVswXSwgJ2RhdGEnLCBkYXRhKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5wcmVwZW5kKCRyZW1vdmUpO1xuICAgIHRoaXMuJHNlbGVjdGlvblswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLXNlbGVjdGlvbi0tY2xlYXJhYmxlJyk7XG4gIH07XG5cbiAgcmV0dXJuIEFsbG93Q2xlYXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL3NlbGVjdGlvbi9zZWFyY2gnLFtcbiAgJ2pxdWVyeScsXG4gICcuLi91dGlscycsXG4gICcuLi9rZXlzJ1xuXSwgZnVuY3Rpb24gKCQsIFV0aWxzLCBLRVlTKSB7XG4gIGZ1bmN0aW9uIFNlYXJjaCAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIFNlYXJjaC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGRlY29yYXRlZCkge1xuICAgIHZhciBzZWFyY2hMYWJlbCA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldCgnc2VhcmNoJyk7XG4gICAgdmFyICRzZWFyY2ggPSAkKFxuICAgICAgJzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2ggc2VsZWN0Mi1zZWFyY2gtLWlubGluZVwiPicgK1xuICAgICAgICAnPHRleHRhcmVhIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2hfX2ZpZWxkXCInK1xuICAgICAgICAnIHR5cGU9XCJzZWFyY2hcIiB0YWJpbmRleD1cIi0xXCInICtcbiAgICAgICAgJyBhdXRvY29ycmVjdD1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwibm9uZVwiJyArXG4gICAgICAgICcgc3BlbGxjaGVjaz1cImZhbHNlXCIgcm9sZT1cInNlYXJjaGJveFwiIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiID4nICtcbiAgICAgICAgJzwvdGV4dGFyZWE+JyArXG4gICAgICAnPC9zcGFuPidcbiAgICApO1xuXG4gICAgdGhpcy4kc2VhcmNoQ29udGFpbmVyID0gJHNlYXJjaDtcbiAgICB0aGlzLiRzZWFyY2ggPSAkc2VhcmNoLmZpbmQoJ3RleHRhcmVhJyk7XG5cbiAgICB0aGlzLiRzZWFyY2gucHJvcCgnYXV0b2NvbXBsZXRlJywgdGhpcy5vcHRpb25zLmdldCgnYXV0b2NvbXBsZXRlJykpO1xuICAgIHRoaXMuJHNlYXJjaC5hdHRyKCdhcmlhLWxhYmVsJywgc2VhcmNoTGFiZWwoKSk7XG5cbiAgICB2YXIgJHJlbmRlcmVkID0gZGVjb3JhdGVkLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLl90cmFuc2ZlclRhYkluZGV4KCk7XG4gICAgJHJlbmRlcmVkLmFwcGVuZCh0aGlzLiRzZWFyY2hDb250YWluZXIpO1xuXG4gICAgcmV0dXJuICRyZW5kZXJlZDtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcmVzdWx0c0lkID0gY29udGFpbmVyLmlkICsgJy1yZXN1bHRzJztcbiAgICB2YXIgc2VsZWN0aW9uSWQgPSBjb250YWluZXIuaWQgKyAnLWNvbnRhaW5lcic7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgc2VsZi4kc2VhcmNoLmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBzZWxlY3Rpb25JZCk7XG5cbiAgICBjb250YWluZXIub24oJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRzZWFyY2guYXR0cignYXJpYS1jb250cm9scycsIHJlc3VsdHNJZCk7XG4gICAgICBzZWxmLiRzZWFyY2gudHJpZ2dlcignZm9jdXMnKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRzZWFyY2gudmFsKCcnKTtcbiAgICAgIHNlbGYucmVzaXplU2VhcmNoKCk7XG4gICAgICBzZWxmLiRzZWFyY2gucmVtb3ZlQXR0cignYXJpYS1jb250cm9scycpO1xuICAgICAgc2VsZi4kc2VhcmNoLnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2VuYWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuJHNlYXJjaC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblxuICAgICAgc2VsZi5fdHJhbnNmZXJUYWJJbmRleCgpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdkaXNhYmxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi4kc2VhcmNoLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2ZvY3VzJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6Zm9jdXMnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBpZiAocGFyYW1zLmRhdGEuX3Jlc3VsdElkKSB7XG4gICAgICAgIHNlbGYuJHNlYXJjaC5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBwYXJhbXMuZGF0YS5fcmVzdWx0SWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi4kc2VhcmNoLnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdmb2N1c2luJywgJy5zZWxlY3QyLXNlYXJjaC0taW5saW5lJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdmb2N1cycsIGV2dCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2ZvY3Vzb3V0JywgJy5zZWxlY3QyLXNlYXJjaC0taW5saW5lJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi5faGFuZGxlQmx1cihldnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdrZXlkb3duJywgJy5zZWxlY3QyLXNlYXJjaC0taW5saW5lJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBzZWxmLnRyaWdnZXIoJ2tleXByZXNzJywgZXZ0KTtcblxuICAgICAgc2VsZi5fa2V5VXBQcmV2ZW50ZWQgPSBldnQuaXNEZWZhdWx0UHJldmVudGVkKCk7XG5cbiAgICAgIHZhciBrZXkgPSBldnQud2hpY2g7XG5cbiAgICAgIGlmIChrZXkgPT09IEtFWVMuQkFDS1NQQUNFICYmIHNlbGYuJHNlYXJjaC52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgdmFyICRwcmV2aW91c0Nob2ljZSA9IHNlbGYuJHNlbGVjdGlvblxuICAgICAgICAgIC5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZScpLmxhc3QoKTtcblxuICAgICAgICBpZiAoJHByZXZpb3VzQ2hvaWNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IFV0aWxzLkdldERhdGEoJHByZXZpb3VzQ2hvaWNlWzBdLCAnZGF0YScpO1xuXG4gICAgICAgICAgc2VsZi5zZWFyY2hSZW1vdmVDaG9pY2UoaXRlbSk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdjbGljaycsICcuc2VsZWN0Mi1zZWFyY2gtLWlubGluZScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGlmIChzZWxmLiRzZWFyY2gudmFsKCkpIHtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVHJ5IHRvIGRldGVjdCB0aGUgSUUgdmVyc2lvbiBzaG91bGQgdGhlIGBkb2N1bWVudE1vZGVgIHByb3BlcnR5IHRoYXRcbiAgICAvLyBpcyBzdG9yZWQgb24gdGhlIGRvY3VtZW50LiBUaGlzIGlzIG9ubHkgaW1wbGVtZW50ZWQgaW4gSUUgYW5kIGlzXG4gICAgLy8gc2xpZ2h0bHkgY2xlYW5lciB0aGFuIGRvaW5nIGEgdXNlciBhZ2VudCBjaGVjay5cbiAgICAvLyBUaGlzIHByb3BlcnR5IGlzIG5vdCBhdmFpbGFibGUgaW4gRWRnZSwgYnV0IEVkZ2UgYWxzbyBkb2Vzbid0IGhhdmVcbiAgICAvLyB0aGlzIGJ1Zy5cbiAgICB2YXIgbXNpZSA9IGRvY3VtZW50LmRvY3VtZW50TW9kZTtcbiAgICB2YXIgZGlzYWJsZUlucHV0RXZlbnRzID0gbXNpZSAmJiBtc2llIDw9IDExO1xuXG4gICAgLy8gV29ya2Fyb3VuZCBmb3IgYnJvd3NlcnMgd2hpY2ggZG8gbm90IHN1cHBvcnQgdGhlIGBpbnB1dGAgZXZlbnRcbiAgICAvLyBUaGlzIHdpbGwgcHJldmVudCBkb3VibGUtdHJpZ2dlcmluZyBvZiBldmVudHMgZm9yIGJyb3dzZXJzIHdoaWNoIHN1cHBvcnRcbiAgICAvLyBib3RoIHRoZSBga2V5dXBgIGFuZCBgaW5wdXRgIGV2ZW50cy5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oXG4gICAgICAnaW5wdXQuc2VhcmNoY2hlY2snLFxuICAgICAgJy5zZWxlY3QyLXNlYXJjaC0taW5saW5lJyxcbiAgICAgIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgLy8gSUUgd2lsbCB0cmlnZ2VyIHRoZSBgaW5wdXRgIGV2ZW50IHdoZW4gYSBwbGFjZWhvbGRlciBpcyB1c2VkIG9uIGFcbiAgICAgICAgLy8gc2VhcmNoIGJveC4gVG8gZ2V0IGFyb3VuZCB0aGlzIGlzc3VlLCB3ZSBhcmUgZm9yY2VkIHRvIGlnbm9yZSBhbGxcbiAgICAgICAgLy8gYGlucHV0YCBldmVudHMgaW4gSUUgYW5kIGtlZXAgdXNpbmcgYGtleXVwYC5cbiAgICAgICAgaWYgKGRpc2FibGVJbnB1dEV2ZW50cykge1xuICAgICAgICAgIHNlbGYuJHNlbGVjdGlvbi5vZmYoJ2lucHV0LnNlYXJjaCBpbnB1dC5zZWFyY2hjaGVjaycpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVuYmluZCB0aGUgZHVwbGljYXRlZCBga2V5dXBgIGV2ZW50XG4gICAgICAgIHNlbGYuJHNlbGVjdGlvbi5vZmYoJ2tleXVwLnNlYXJjaCcpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oXG4gICAgICAna2V5dXAuc2VhcmNoIGlucHV0LnNlYXJjaCcsXG4gICAgICAnLnNlbGVjdDItc2VhcmNoLS1pbmxpbmUnLFxuICAgICAgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAvLyBJRSB3aWxsIHRyaWdnZXIgdGhlIGBpbnB1dGAgZXZlbnQgd2hlbiBhIHBsYWNlaG9sZGVyIGlzIHVzZWQgb24gYVxuICAgICAgICAvLyBzZWFyY2ggYm94LiBUbyBnZXQgYXJvdW5kIHRoaXMgaXNzdWUsIHdlIGFyZSBmb3JjZWQgdG8gaWdub3JlIGFsbFxuICAgICAgICAvLyBgaW5wdXRgIGV2ZW50cyBpbiBJRSBhbmQga2VlcCB1c2luZyBga2V5dXBgLlxuICAgICAgICBpZiAoZGlzYWJsZUlucHV0RXZlbnRzICYmIGV2dC50eXBlID09PSAnaW5wdXQnKSB7XG4gICAgICAgICAgc2VsZi4kc2VsZWN0aW9uLm9mZignaW5wdXQuc2VhcmNoIGlucHV0LnNlYXJjaGNoZWNrJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleSA9IGV2dC53aGljaDtcblxuICAgICAgICAvLyBXZSBjYW4gZnJlZWx5IGlnbm9yZSBldmVudHMgZnJvbSBtb2RpZmllciBrZXlzXG4gICAgICAgIGlmIChrZXkgPT0gS0VZUy5TSElGVCB8fCBrZXkgPT0gS0VZUy5DVFJMIHx8IGtleSA9PSBLRVlTLkFMVCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRhYmJpbmcgd2lsbCBiZSBoYW5kbGVkIGR1cmluZyB0aGUgYGtleWRvd25gIHBoYXNlXG4gICAgICAgIGlmIChrZXkgPT0gS0VZUy5UQUIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLmhhbmRsZVNlYXJjaChldnQpO1xuICAgICAgfVxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgdHJhbnNmZXIgdGhlIHRhYmluZGV4IGF0dHJpYnV0ZSBmcm9tIHRoZSByZW5kZXJlZFxuICAgKiBzZWxlY3Rpb24gdG8gdGhlIHNlYXJjaCBib3guIFRoaXMgYWxsb3dzIGZvciB0aGUgc2VhcmNoIGJveCB0byBiZSB1c2VkIGFzXG4gICAqIHRoZSBwcmltYXJ5IGZvY3VzIGluc3RlYWQgb2YgdGhlIHNlbGVjdGlvbiBjb250YWluZXIuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBTZWFyY2gucHJvdG90eXBlLl90cmFuc2ZlclRhYkluZGV4ID0gZnVuY3Rpb24gKGRlY29yYXRlZCkge1xuICAgIHRoaXMuJHNlYXJjaC5hdHRyKCd0YWJpbmRleCcsIHRoaXMuJHNlbGVjdGlvbi5hdHRyKCd0YWJpbmRleCcpKTtcbiAgICB0aGlzLiRzZWxlY3Rpb24uYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLmNyZWF0ZVBsYWNlaG9sZGVyID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgcGxhY2Vob2xkZXIpIHtcbiAgICB0aGlzLiRzZWFyY2guYXR0cigncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlci50ZXh0KTtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGRhdGEpIHtcbiAgICB2YXIgc2VhcmNoSGFkRm9jdXMgPSB0aGlzLiRzZWFyY2hbMF0gPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuJHNlYXJjaC5hdHRyKCdwbGFjZWhvbGRlcicsICcnKTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy5yZXNpemVTZWFyY2goKTtcbiAgICBpZiAoc2VhcmNoSGFkRm9jdXMpIHtcbiAgICAgIHRoaXMuJHNlYXJjaC50cmlnZ2VyKCdmb2N1cycpO1xuICAgIH1cbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLmhhbmRsZVNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlc2l6ZVNlYXJjaCgpO1xuXG4gICAgaWYgKCF0aGlzLl9rZXlVcFByZXZlbnRlZCkge1xuICAgICAgdmFyIGlucHV0ID0gdGhpcy4kc2VhcmNoLnZhbCgpO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoJ3F1ZXJ5Jywge1xuICAgICAgICB0ZXJtOiBpbnB1dFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fa2V5VXBQcmV2ZW50ZWQgPSBmYWxzZTtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLnNlYXJjaFJlbW92ZUNob2ljZSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGl0ZW0pIHtcbiAgICB0aGlzLnRyaWdnZXIoJ3Vuc2VsZWN0Jywge1xuICAgICAgZGF0YTogaXRlbVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoLnZhbChpdGVtLnRleHQpO1xuICAgIHRoaXMuaGFuZGxlU2VhcmNoKCk7XG4gIH07XG5cbiAgU2VhcmNoLnByb3RvdHlwZS5yZXNpemVTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kc2VhcmNoLmNzcygnd2lkdGgnLCAnMjVweCcpO1xuXG4gICAgdmFyIHdpZHRoID0gJzEwMCUnO1xuXG4gICAgaWYgKHRoaXMuJHNlYXJjaC5hdHRyKCdwbGFjZWhvbGRlcicpID09PSAnJykge1xuICAgICAgdmFyIG1pbmltdW1XaWR0aCA9IHRoaXMuJHNlYXJjaC52YWwoKS5sZW5ndGggKyAxO1xuXG4gICAgICB3aWR0aCA9IChtaW5pbXVtV2lkdGggKiAwLjc1KSArICdlbSc7XG4gICAgfVxuXG4gICAgdGhpcy4kc2VhcmNoLmNzcygnd2lkdGgnLCB3aWR0aCk7XG4gIH07XG5cbiAgcmV0dXJuIFNlYXJjaDtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvc2VsZWN0aW9uL3NlbGVjdGlvbkNzcycsW1xuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoVXRpbHMpIHtcbiAgZnVuY3Rpb24gU2VsZWN0aW9uQ1NTICgpIHsgfVxuXG4gIFNlbGVjdGlvbkNTUy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGRlY29yYXRlZCkge1xuICAgIHZhciAkc2VsZWN0aW9uID0gZGVjb3JhdGVkLmNhbGwodGhpcyk7XG5cbiAgICB2YXIgc2VsZWN0aW9uQ3NzQ2xhc3MgPSB0aGlzLm9wdGlvbnMuZ2V0KCdzZWxlY3Rpb25Dc3NDbGFzcycpIHx8ICcnO1xuXG4gICAgaWYgKHNlbGVjdGlvbkNzc0NsYXNzLmluZGV4T2YoJzphbGw6JykgIT09IC0xKSB7XG4gICAgICBzZWxlY3Rpb25Dc3NDbGFzcyA9IHNlbGVjdGlvbkNzc0NsYXNzLnJlcGxhY2UoJzphbGw6JywgJycpO1xuXG4gICAgICBVdGlscy5jb3B5Tm9uSW50ZXJuYWxDc3NDbGFzc2VzKCRzZWxlY3Rpb25bMF0sIHRoaXMuJGVsZW1lbnRbMF0pO1xuICAgIH1cblxuICAgICRzZWxlY3Rpb24uYWRkQ2xhc3Moc2VsZWN0aW9uQ3NzQ2xhc3MpO1xuXG4gICAgcmV0dXJuICRzZWxlY3Rpb247XG4gIH07XG5cbiAgcmV0dXJuIFNlbGVjdGlvbkNTUztcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvc2VsZWN0aW9uL2V2ZW50UmVsYXknLFtcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uICgkKSB7XG4gIGZ1bmN0aW9uIEV2ZW50UmVsYXkgKCkgeyB9XG5cbiAgRXZlbnRSZWxheS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmVsYXlFdmVudHMgPSBbXG4gICAgICAnb3BlbicsICdvcGVuaW5nJyxcbiAgICAgICdjbG9zZScsICdjbG9zaW5nJyxcbiAgICAgICdzZWxlY3QnLCAnc2VsZWN0aW5nJyxcbiAgICAgICd1bnNlbGVjdCcsICd1bnNlbGVjdGluZycsXG4gICAgICAnY2xlYXInLCAnY2xlYXJpbmcnXG4gICAgXTtcblxuICAgIHZhciBwcmV2ZW50YWJsZUV2ZW50cyA9IFtcbiAgICAgICdvcGVuaW5nJywgJ2Nsb3NpbmcnLCAnc2VsZWN0aW5nJywgJ3Vuc2VsZWN0aW5nJywgJ2NsZWFyaW5nJ1xuICAgIF07XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgY29udGFpbmVyLm9uKCcqJywgZnVuY3Rpb24gKG5hbWUsIHBhcmFtcykge1xuICAgICAgLy8gSWdub3JlIGV2ZW50cyB0aGF0IHNob3VsZCBub3QgYmUgcmVsYXllZFxuICAgICAgaWYgKHJlbGF5RXZlbnRzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHBhcmFtZXRlcnMgc2hvdWxkIGFsd2F5cyBiZSBhbiBvYmplY3RcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgICAgLy8gR2VuZXJhdGUgdGhlIGpRdWVyeSBldmVudCBmb3IgdGhlIFNlbGVjdDIgZXZlbnRcbiAgICAgIHZhciBldnQgPSAkLkV2ZW50KCdzZWxlY3QyOicgKyBuYW1lLCB7XG4gICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICB9KTtcblxuICAgICAgc2VsZi4kZWxlbWVudC50cmlnZ2VyKGV2dCk7XG5cbiAgICAgIC8vIE9ubHkgaGFuZGxlIHByZXZlbnRhYmxlIGV2ZW50cyBpZiBpdCB3YXMgb25lXG4gICAgICBpZiAocHJldmVudGFibGVFdmVudHMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwYXJhbXMucHJldmVudGVkID0gZXZ0LmlzRGVmYXVsdFByZXZlbnRlZCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBFdmVudFJlbGF5O1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi90cmFuc2xhdGlvbicsW1xuICAnanF1ZXJ5JyxcbiAgJ3JlcXVpcmUnXG5dLCBmdW5jdGlvbiAoJCwgcmVxdWlyZSkge1xuICBmdW5jdGlvbiBUcmFuc2xhdGlvbiAoZGljdCkge1xuICAgIHRoaXMuZGljdCA9IGRpY3QgfHwge307XG4gIH1cblxuICBUcmFuc2xhdGlvbi5wcm90b3R5cGUuYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmRpY3Q7XG4gIH07XG5cbiAgVHJhbnNsYXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5kaWN0W2tleV07XG4gIH07XG5cbiAgVHJhbnNsYXRpb24ucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uICh0cmFuc2xhdGlvbikge1xuICAgIHRoaXMuZGljdCA9ICQuZXh0ZW5kKHt9LCB0cmFuc2xhdGlvbi5hbGwoKSwgdGhpcy5kaWN0KTtcbiAgfTtcblxuICAvLyBTdGF0aWMgZnVuY3Rpb25zXG5cbiAgVHJhbnNsYXRpb24uX2NhY2hlID0ge307XG5cbiAgVHJhbnNsYXRpb24ubG9hZFBhdGggPSBmdW5jdGlvbiAocGF0aCkge1xuICAgIGlmICghKHBhdGggaW4gVHJhbnNsYXRpb24uX2NhY2hlKSkge1xuICAgICAgdmFyIHRyYW5zbGF0aW9ucyA9IHJlcXVpcmUocGF0aCk7XG5cbiAgICAgIFRyYW5zbGF0aW9uLl9jYWNoZVtwYXRoXSA9IHRyYW5zbGF0aW9ucztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uLl9jYWNoZVtwYXRoXSk7XG4gIH07XG5cbiAgcmV0dXJuIFRyYW5zbGF0aW9uO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kaWFjcml0aWNzJyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRpYWNyaXRpY3MgPSB7XG4gICAgJ1xcdTI0QjYnOiAnQScsXG4gICAgJ1xcdUZGMjEnOiAnQScsXG4gICAgJ1xcdTAwQzAnOiAnQScsXG4gICAgJ1xcdTAwQzEnOiAnQScsXG4gICAgJ1xcdTAwQzInOiAnQScsXG4gICAgJ1xcdTFFQTYnOiAnQScsXG4gICAgJ1xcdTFFQTQnOiAnQScsXG4gICAgJ1xcdTFFQUEnOiAnQScsXG4gICAgJ1xcdTFFQTgnOiAnQScsXG4gICAgJ1xcdTAwQzMnOiAnQScsXG4gICAgJ1xcdTAxMDAnOiAnQScsXG4gICAgJ1xcdTAxMDInOiAnQScsXG4gICAgJ1xcdTFFQjAnOiAnQScsXG4gICAgJ1xcdTFFQUUnOiAnQScsXG4gICAgJ1xcdTFFQjQnOiAnQScsXG4gICAgJ1xcdTFFQjInOiAnQScsXG4gICAgJ1xcdTAyMjYnOiAnQScsXG4gICAgJ1xcdTAxRTAnOiAnQScsXG4gICAgJ1xcdTAwQzQnOiAnQScsXG4gICAgJ1xcdTAxREUnOiAnQScsXG4gICAgJ1xcdTFFQTInOiAnQScsXG4gICAgJ1xcdTAwQzUnOiAnQScsXG4gICAgJ1xcdTAxRkEnOiAnQScsXG4gICAgJ1xcdTAxQ0QnOiAnQScsXG4gICAgJ1xcdTAyMDAnOiAnQScsXG4gICAgJ1xcdTAyMDInOiAnQScsXG4gICAgJ1xcdTFFQTAnOiAnQScsXG4gICAgJ1xcdTFFQUMnOiAnQScsXG4gICAgJ1xcdTFFQjYnOiAnQScsXG4gICAgJ1xcdTFFMDAnOiAnQScsXG4gICAgJ1xcdTAxMDQnOiAnQScsXG4gICAgJ1xcdTAyM0EnOiAnQScsXG4gICAgJ1xcdTJDNkYnOiAnQScsXG4gICAgJ1xcdUE3MzInOiAnQUEnLFxuICAgICdcXHUwMEM2JzogJ0FFJyxcbiAgICAnXFx1MDFGQyc6ICdBRScsXG4gICAgJ1xcdTAxRTInOiAnQUUnLFxuICAgICdcXHVBNzM0JzogJ0FPJyxcbiAgICAnXFx1QTczNic6ICdBVScsXG4gICAgJ1xcdUE3MzgnOiAnQVYnLFxuICAgICdcXHVBNzNBJzogJ0FWJyxcbiAgICAnXFx1QTczQyc6ICdBWScsXG4gICAgJ1xcdTI0QjcnOiAnQicsXG4gICAgJ1xcdUZGMjInOiAnQicsXG4gICAgJ1xcdTFFMDInOiAnQicsXG4gICAgJ1xcdTFFMDQnOiAnQicsXG4gICAgJ1xcdTFFMDYnOiAnQicsXG4gICAgJ1xcdTAyNDMnOiAnQicsXG4gICAgJ1xcdTAxODInOiAnQicsXG4gICAgJ1xcdTAxODEnOiAnQicsXG4gICAgJ1xcdTI0QjgnOiAnQycsXG4gICAgJ1xcdUZGMjMnOiAnQycsXG4gICAgJ1xcdTAxMDYnOiAnQycsXG4gICAgJ1xcdTAxMDgnOiAnQycsXG4gICAgJ1xcdTAxMEEnOiAnQycsXG4gICAgJ1xcdTAxMEMnOiAnQycsXG4gICAgJ1xcdTAwQzcnOiAnQycsXG4gICAgJ1xcdTFFMDgnOiAnQycsXG4gICAgJ1xcdTAxODcnOiAnQycsXG4gICAgJ1xcdTAyM0InOiAnQycsXG4gICAgJ1xcdUE3M0UnOiAnQycsXG4gICAgJ1xcdTI0QjknOiAnRCcsXG4gICAgJ1xcdUZGMjQnOiAnRCcsXG4gICAgJ1xcdTFFMEEnOiAnRCcsXG4gICAgJ1xcdTAxMEUnOiAnRCcsXG4gICAgJ1xcdTFFMEMnOiAnRCcsXG4gICAgJ1xcdTFFMTAnOiAnRCcsXG4gICAgJ1xcdTFFMTInOiAnRCcsXG4gICAgJ1xcdTFFMEUnOiAnRCcsXG4gICAgJ1xcdTAxMTAnOiAnRCcsXG4gICAgJ1xcdTAxOEInOiAnRCcsXG4gICAgJ1xcdTAxOEEnOiAnRCcsXG4gICAgJ1xcdTAxODknOiAnRCcsXG4gICAgJ1xcdUE3NzknOiAnRCcsXG4gICAgJ1xcdTAxRjEnOiAnRFonLFxuICAgICdcXHUwMUM0JzogJ0RaJyxcbiAgICAnXFx1MDFGMic6ICdEeicsXG4gICAgJ1xcdTAxQzUnOiAnRHonLFxuICAgICdcXHUyNEJBJzogJ0UnLFxuICAgICdcXHVGRjI1JzogJ0UnLFxuICAgICdcXHUwMEM4JzogJ0UnLFxuICAgICdcXHUwMEM5JzogJ0UnLFxuICAgICdcXHUwMENBJzogJ0UnLFxuICAgICdcXHUxRUMwJzogJ0UnLFxuICAgICdcXHUxRUJFJzogJ0UnLFxuICAgICdcXHUxRUM0JzogJ0UnLFxuICAgICdcXHUxRUMyJzogJ0UnLFxuICAgICdcXHUxRUJDJzogJ0UnLFxuICAgICdcXHUwMTEyJzogJ0UnLFxuICAgICdcXHUxRTE0JzogJ0UnLFxuICAgICdcXHUxRTE2JzogJ0UnLFxuICAgICdcXHUwMTE0JzogJ0UnLFxuICAgICdcXHUwMTE2JzogJ0UnLFxuICAgICdcXHUwMENCJzogJ0UnLFxuICAgICdcXHUxRUJBJzogJ0UnLFxuICAgICdcXHUwMTFBJzogJ0UnLFxuICAgICdcXHUwMjA0JzogJ0UnLFxuICAgICdcXHUwMjA2JzogJ0UnLFxuICAgICdcXHUxRUI4JzogJ0UnLFxuICAgICdcXHUxRUM2JzogJ0UnLFxuICAgICdcXHUwMjI4JzogJ0UnLFxuICAgICdcXHUxRTFDJzogJ0UnLFxuICAgICdcXHUwMTE4JzogJ0UnLFxuICAgICdcXHUxRTE4JzogJ0UnLFxuICAgICdcXHUxRTFBJzogJ0UnLFxuICAgICdcXHUwMTkwJzogJ0UnLFxuICAgICdcXHUwMThFJzogJ0UnLFxuICAgICdcXHUyNEJCJzogJ0YnLFxuICAgICdcXHVGRjI2JzogJ0YnLFxuICAgICdcXHUxRTFFJzogJ0YnLFxuICAgICdcXHUwMTkxJzogJ0YnLFxuICAgICdcXHVBNzdCJzogJ0YnLFxuICAgICdcXHUyNEJDJzogJ0cnLFxuICAgICdcXHVGRjI3JzogJ0cnLFxuICAgICdcXHUwMUY0JzogJ0cnLFxuICAgICdcXHUwMTFDJzogJ0cnLFxuICAgICdcXHUxRTIwJzogJ0cnLFxuICAgICdcXHUwMTFFJzogJ0cnLFxuICAgICdcXHUwMTIwJzogJ0cnLFxuICAgICdcXHUwMUU2JzogJ0cnLFxuICAgICdcXHUwMTIyJzogJ0cnLFxuICAgICdcXHUwMUU0JzogJ0cnLFxuICAgICdcXHUwMTkzJzogJ0cnLFxuICAgICdcXHVBN0EwJzogJ0cnLFxuICAgICdcXHVBNzdEJzogJ0cnLFxuICAgICdcXHVBNzdFJzogJ0cnLFxuICAgICdcXHUyNEJEJzogJ0gnLFxuICAgICdcXHVGRjI4JzogJ0gnLFxuICAgICdcXHUwMTI0JzogJ0gnLFxuICAgICdcXHUxRTIyJzogJ0gnLFxuICAgICdcXHUxRTI2JzogJ0gnLFxuICAgICdcXHUwMjFFJzogJ0gnLFxuICAgICdcXHUxRTI0JzogJ0gnLFxuICAgICdcXHUxRTI4JzogJ0gnLFxuICAgICdcXHUxRTJBJzogJ0gnLFxuICAgICdcXHUwMTI2JzogJ0gnLFxuICAgICdcXHUyQzY3JzogJ0gnLFxuICAgICdcXHUyQzc1JzogJ0gnLFxuICAgICdcXHVBNzhEJzogJ0gnLFxuICAgICdcXHUyNEJFJzogJ0knLFxuICAgICdcXHVGRjI5JzogJ0knLFxuICAgICdcXHUwMENDJzogJ0knLFxuICAgICdcXHUwMENEJzogJ0knLFxuICAgICdcXHUwMENFJzogJ0knLFxuICAgICdcXHUwMTI4JzogJ0knLFxuICAgICdcXHUwMTJBJzogJ0knLFxuICAgICdcXHUwMTJDJzogJ0knLFxuICAgICdcXHUwMTMwJzogJ0knLFxuICAgICdcXHUwMENGJzogJ0knLFxuICAgICdcXHUxRTJFJzogJ0knLFxuICAgICdcXHUxRUM4JzogJ0knLFxuICAgICdcXHUwMUNGJzogJ0knLFxuICAgICdcXHUwMjA4JzogJ0knLFxuICAgICdcXHUwMjBBJzogJ0knLFxuICAgICdcXHUxRUNBJzogJ0knLFxuICAgICdcXHUwMTJFJzogJ0knLFxuICAgICdcXHUxRTJDJzogJ0knLFxuICAgICdcXHUwMTk3JzogJ0knLFxuICAgICdcXHUyNEJGJzogJ0onLFxuICAgICdcXHVGRjJBJzogJ0onLFxuICAgICdcXHUwMTM0JzogJ0onLFxuICAgICdcXHUwMjQ4JzogJ0onLFxuICAgICdcXHUyNEMwJzogJ0snLFxuICAgICdcXHVGRjJCJzogJ0snLFxuICAgICdcXHUxRTMwJzogJ0snLFxuICAgICdcXHUwMUU4JzogJ0snLFxuICAgICdcXHUxRTMyJzogJ0snLFxuICAgICdcXHUwMTM2JzogJ0snLFxuICAgICdcXHUxRTM0JzogJ0snLFxuICAgICdcXHUwMTk4JzogJ0snLFxuICAgICdcXHUyQzY5JzogJ0snLFxuICAgICdcXHVBNzQwJzogJ0snLFxuICAgICdcXHVBNzQyJzogJ0snLFxuICAgICdcXHVBNzQ0JzogJ0snLFxuICAgICdcXHVBN0EyJzogJ0snLFxuICAgICdcXHUyNEMxJzogJ0wnLFxuICAgICdcXHVGRjJDJzogJ0wnLFxuICAgICdcXHUwMTNGJzogJ0wnLFxuICAgICdcXHUwMTM5JzogJ0wnLFxuICAgICdcXHUwMTNEJzogJ0wnLFxuICAgICdcXHUxRTM2JzogJ0wnLFxuICAgICdcXHUxRTM4JzogJ0wnLFxuICAgICdcXHUwMTNCJzogJ0wnLFxuICAgICdcXHUxRTNDJzogJ0wnLFxuICAgICdcXHUxRTNBJzogJ0wnLFxuICAgICdcXHUwMTQxJzogJ0wnLFxuICAgICdcXHUwMjNEJzogJ0wnLFxuICAgICdcXHUyQzYyJzogJ0wnLFxuICAgICdcXHUyQzYwJzogJ0wnLFxuICAgICdcXHVBNzQ4JzogJ0wnLFxuICAgICdcXHVBNzQ2JzogJ0wnLFxuICAgICdcXHVBNzgwJzogJ0wnLFxuICAgICdcXHUwMUM3JzogJ0xKJyxcbiAgICAnXFx1MDFDOCc6ICdMaicsXG4gICAgJ1xcdTI0QzInOiAnTScsXG4gICAgJ1xcdUZGMkQnOiAnTScsXG4gICAgJ1xcdTFFM0UnOiAnTScsXG4gICAgJ1xcdTFFNDAnOiAnTScsXG4gICAgJ1xcdTFFNDInOiAnTScsXG4gICAgJ1xcdTJDNkUnOiAnTScsXG4gICAgJ1xcdTAxOUMnOiAnTScsXG4gICAgJ1xcdTI0QzMnOiAnTicsXG4gICAgJ1xcdUZGMkUnOiAnTicsXG4gICAgJ1xcdTAxRjgnOiAnTicsXG4gICAgJ1xcdTAxNDMnOiAnTicsXG4gICAgJ1xcdTAwRDEnOiAnTicsXG4gICAgJ1xcdTFFNDQnOiAnTicsXG4gICAgJ1xcdTAxNDcnOiAnTicsXG4gICAgJ1xcdTFFNDYnOiAnTicsXG4gICAgJ1xcdTAxNDUnOiAnTicsXG4gICAgJ1xcdTFFNEEnOiAnTicsXG4gICAgJ1xcdTFFNDgnOiAnTicsXG4gICAgJ1xcdTAyMjAnOiAnTicsXG4gICAgJ1xcdTAxOUQnOiAnTicsXG4gICAgJ1xcdUE3OTAnOiAnTicsXG4gICAgJ1xcdUE3QTQnOiAnTicsXG4gICAgJ1xcdTAxQ0EnOiAnTkonLFxuICAgICdcXHUwMUNCJzogJ05qJyxcbiAgICAnXFx1MjRDNCc6ICdPJyxcbiAgICAnXFx1RkYyRic6ICdPJyxcbiAgICAnXFx1MDBEMic6ICdPJyxcbiAgICAnXFx1MDBEMyc6ICdPJyxcbiAgICAnXFx1MDBENCc6ICdPJyxcbiAgICAnXFx1MUVEMic6ICdPJyxcbiAgICAnXFx1MUVEMCc6ICdPJyxcbiAgICAnXFx1MUVENic6ICdPJyxcbiAgICAnXFx1MUVENCc6ICdPJyxcbiAgICAnXFx1MDBENSc6ICdPJyxcbiAgICAnXFx1MUU0Qyc6ICdPJyxcbiAgICAnXFx1MDIyQyc6ICdPJyxcbiAgICAnXFx1MUU0RSc6ICdPJyxcbiAgICAnXFx1MDE0Qyc6ICdPJyxcbiAgICAnXFx1MUU1MCc6ICdPJyxcbiAgICAnXFx1MUU1Mic6ICdPJyxcbiAgICAnXFx1MDE0RSc6ICdPJyxcbiAgICAnXFx1MDIyRSc6ICdPJyxcbiAgICAnXFx1MDIzMCc6ICdPJyxcbiAgICAnXFx1MDBENic6ICdPJyxcbiAgICAnXFx1MDIyQSc6ICdPJyxcbiAgICAnXFx1MUVDRSc6ICdPJyxcbiAgICAnXFx1MDE1MCc6ICdPJyxcbiAgICAnXFx1MDFEMSc6ICdPJyxcbiAgICAnXFx1MDIwQyc6ICdPJyxcbiAgICAnXFx1MDIwRSc6ICdPJyxcbiAgICAnXFx1MDFBMCc6ICdPJyxcbiAgICAnXFx1MUVEQyc6ICdPJyxcbiAgICAnXFx1MUVEQSc6ICdPJyxcbiAgICAnXFx1MUVFMCc6ICdPJyxcbiAgICAnXFx1MUVERSc6ICdPJyxcbiAgICAnXFx1MUVFMic6ICdPJyxcbiAgICAnXFx1MUVDQyc6ICdPJyxcbiAgICAnXFx1MUVEOCc6ICdPJyxcbiAgICAnXFx1MDFFQSc6ICdPJyxcbiAgICAnXFx1MDFFQyc6ICdPJyxcbiAgICAnXFx1MDBEOCc6ICdPJyxcbiAgICAnXFx1MDFGRSc6ICdPJyxcbiAgICAnXFx1MDE4Nic6ICdPJyxcbiAgICAnXFx1MDE5Ric6ICdPJyxcbiAgICAnXFx1QTc0QSc6ICdPJyxcbiAgICAnXFx1QTc0Qyc6ICdPJyxcbiAgICAnXFx1MDE1Mic6ICdPRScsXG4gICAgJ1xcdTAxQTInOiAnT0knLFxuICAgICdcXHVBNzRFJzogJ09PJyxcbiAgICAnXFx1MDIyMic6ICdPVScsXG4gICAgJ1xcdTI0QzUnOiAnUCcsXG4gICAgJ1xcdUZGMzAnOiAnUCcsXG4gICAgJ1xcdTFFNTQnOiAnUCcsXG4gICAgJ1xcdTFFNTYnOiAnUCcsXG4gICAgJ1xcdTAxQTQnOiAnUCcsXG4gICAgJ1xcdTJDNjMnOiAnUCcsXG4gICAgJ1xcdUE3NTAnOiAnUCcsXG4gICAgJ1xcdUE3NTInOiAnUCcsXG4gICAgJ1xcdUE3NTQnOiAnUCcsXG4gICAgJ1xcdTI0QzYnOiAnUScsXG4gICAgJ1xcdUZGMzEnOiAnUScsXG4gICAgJ1xcdUE3NTYnOiAnUScsXG4gICAgJ1xcdUE3NTgnOiAnUScsXG4gICAgJ1xcdTAyNEEnOiAnUScsXG4gICAgJ1xcdTI0QzcnOiAnUicsXG4gICAgJ1xcdUZGMzInOiAnUicsXG4gICAgJ1xcdTAxNTQnOiAnUicsXG4gICAgJ1xcdTFFNTgnOiAnUicsXG4gICAgJ1xcdTAxNTgnOiAnUicsXG4gICAgJ1xcdTAyMTAnOiAnUicsXG4gICAgJ1xcdTAyMTInOiAnUicsXG4gICAgJ1xcdTFFNUEnOiAnUicsXG4gICAgJ1xcdTFFNUMnOiAnUicsXG4gICAgJ1xcdTAxNTYnOiAnUicsXG4gICAgJ1xcdTFFNUUnOiAnUicsXG4gICAgJ1xcdTAyNEMnOiAnUicsXG4gICAgJ1xcdTJDNjQnOiAnUicsXG4gICAgJ1xcdUE3NUEnOiAnUicsXG4gICAgJ1xcdUE3QTYnOiAnUicsXG4gICAgJ1xcdUE3ODInOiAnUicsXG4gICAgJ1xcdTI0QzgnOiAnUycsXG4gICAgJ1xcdUZGMzMnOiAnUycsXG4gICAgJ1xcdTFFOUUnOiAnUycsXG4gICAgJ1xcdTAxNUEnOiAnUycsXG4gICAgJ1xcdTFFNjQnOiAnUycsXG4gICAgJ1xcdTAxNUMnOiAnUycsXG4gICAgJ1xcdTFFNjAnOiAnUycsXG4gICAgJ1xcdTAxNjAnOiAnUycsXG4gICAgJ1xcdTFFNjYnOiAnUycsXG4gICAgJ1xcdTFFNjInOiAnUycsXG4gICAgJ1xcdTFFNjgnOiAnUycsXG4gICAgJ1xcdTAyMTgnOiAnUycsXG4gICAgJ1xcdTAxNUUnOiAnUycsXG4gICAgJ1xcdTJDN0UnOiAnUycsXG4gICAgJ1xcdUE3QTgnOiAnUycsXG4gICAgJ1xcdUE3ODQnOiAnUycsXG4gICAgJ1xcdTI0QzknOiAnVCcsXG4gICAgJ1xcdUZGMzQnOiAnVCcsXG4gICAgJ1xcdTFFNkEnOiAnVCcsXG4gICAgJ1xcdTAxNjQnOiAnVCcsXG4gICAgJ1xcdTFFNkMnOiAnVCcsXG4gICAgJ1xcdTAyMUEnOiAnVCcsXG4gICAgJ1xcdTAxNjInOiAnVCcsXG4gICAgJ1xcdTFFNzAnOiAnVCcsXG4gICAgJ1xcdTFFNkUnOiAnVCcsXG4gICAgJ1xcdTAxNjYnOiAnVCcsXG4gICAgJ1xcdTAxQUMnOiAnVCcsXG4gICAgJ1xcdTAxQUUnOiAnVCcsXG4gICAgJ1xcdTAyM0UnOiAnVCcsXG4gICAgJ1xcdUE3ODYnOiAnVCcsXG4gICAgJ1xcdUE3MjgnOiAnVFonLFxuICAgICdcXHUyNENBJzogJ1UnLFxuICAgICdcXHVGRjM1JzogJ1UnLFxuICAgICdcXHUwMEQ5JzogJ1UnLFxuICAgICdcXHUwMERBJzogJ1UnLFxuICAgICdcXHUwMERCJzogJ1UnLFxuICAgICdcXHUwMTY4JzogJ1UnLFxuICAgICdcXHUxRTc4JzogJ1UnLFxuICAgICdcXHUwMTZBJzogJ1UnLFxuICAgICdcXHUxRTdBJzogJ1UnLFxuICAgICdcXHUwMTZDJzogJ1UnLFxuICAgICdcXHUwMERDJzogJ1UnLFxuICAgICdcXHUwMURCJzogJ1UnLFxuICAgICdcXHUwMUQ3JzogJ1UnLFxuICAgICdcXHUwMUQ1JzogJ1UnLFxuICAgICdcXHUwMUQ5JzogJ1UnLFxuICAgICdcXHUxRUU2JzogJ1UnLFxuICAgICdcXHUwMTZFJzogJ1UnLFxuICAgICdcXHUwMTcwJzogJ1UnLFxuICAgICdcXHUwMUQzJzogJ1UnLFxuICAgICdcXHUwMjE0JzogJ1UnLFxuICAgICdcXHUwMjE2JzogJ1UnLFxuICAgICdcXHUwMUFGJzogJ1UnLFxuICAgICdcXHUxRUVBJzogJ1UnLFxuICAgICdcXHUxRUU4JzogJ1UnLFxuICAgICdcXHUxRUVFJzogJ1UnLFxuICAgICdcXHUxRUVDJzogJ1UnLFxuICAgICdcXHUxRUYwJzogJ1UnLFxuICAgICdcXHUxRUU0JzogJ1UnLFxuICAgICdcXHUxRTcyJzogJ1UnLFxuICAgICdcXHUwMTcyJzogJ1UnLFxuICAgICdcXHUxRTc2JzogJ1UnLFxuICAgICdcXHUxRTc0JzogJ1UnLFxuICAgICdcXHUwMjQ0JzogJ1UnLFxuICAgICdcXHUyNENCJzogJ1YnLFxuICAgICdcXHVGRjM2JzogJ1YnLFxuICAgICdcXHUxRTdDJzogJ1YnLFxuICAgICdcXHUxRTdFJzogJ1YnLFxuICAgICdcXHUwMUIyJzogJ1YnLFxuICAgICdcXHVBNzVFJzogJ1YnLFxuICAgICdcXHUwMjQ1JzogJ1YnLFxuICAgICdcXHVBNzYwJzogJ1ZZJyxcbiAgICAnXFx1MjRDQyc6ICdXJyxcbiAgICAnXFx1RkYzNyc6ICdXJyxcbiAgICAnXFx1MUU4MCc6ICdXJyxcbiAgICAnXFx1MUU4Mic6ICdXJyxcbiAgICAnXFx1MDE3NCc6ICdXJyxcbiAgICAnXFx1MUU4Nic6ICdXJyxcbiAgICAnXFx1MUU4NCc6ICdXJyxcbiAgICAnXFx1MUU4OCc6ICdXJyxcbiAgICAnXFx1MkM3Mic6ICdXJyxcbiAgICAnXFx1MjRDRCc6ICdYJyxcbiAgICAnXFx1RkYzOCc6ICdYJyxcbiAgICAnXFx1MUU4QSc6ICdYJyxcbiAgICAnXFx1MUU4Qyc6ICdYJyxcbiAgICAnXFx1MjRDRSc6ICdZJyxcbiAgICAnXFx1RkYzOSc6ICdZJyxcbiAgICAnXFx1MUVGMic6ICdZJyxcbiAgICAnXFx1MDBERCc6ICdZJyxcbiAgICAnXFx1MDE3Nic6ICdZJyxcbiAgICAnXFx1MUVGOCc6ICdZJyxcbiAgICAnXFx1MDIzMic6ICdZJyxcbiAgICAnXFx1MUU4RSc6ICdZJyxcbiAgICAnXFx1MDE3OCc6ICdZJyxcbiAgICAnXFx1MUVGNic6ICdZJyxcbiAgICAnXFx1MUVGNCc6ICdZJyxcbiAgICAnXFx1MDFCMyc6ICdZJyxcbiAgICAnXFx1MDI0RSc6ICdZJyxcbiAgICAnXFx1MUVGRSc6ICdZJyxcbiAgICAnXFx1MjRDRic6ICdaJyxcbiAgICAnXFx1RkYzQSc6ICdaJyxcbiAgICAnXFx1MDE3OSc6ICdaJyxcbiAgICAnXFx1MUU5MCc6ICdaJyxcbiAgICAnXFx1MDE3Qic6ICdaJyxcbiAgICAnXFx1MDE3RCc6ICdaJyxcbiAgICAnXFx1MUU5Mic6ICdaJyxcbiAgICAnXFx1MUU5NCc6ICdaJyxcbiAgICAnXFx1MDFCNSc6ICdaJyxcbiAgICAnXFx1MDIyNCc6ICdaJyxcbiAgICAnXFx1MkM3Ric6ICdaJyxcbiAgICAnXFx1MkM2Qic6ICdaJyxcbiAgICAnXFx1QTc2Mic6ICdaJyxcbiAgICAnXFx1MjREMCc6ICdhJyxcbiAgICAnXFx1RkY0MSc6ICdhJyxcbiAgICAnXFx1MUU5QSc6ICdhJyxcbiAgICAnXFx1MDBFMCc6ICdhJyxcbiAgICAnXFx1MDBFMSc6ICdhJyxcbiAgICAnXFx1MDBFMic6ICdhJyxcbiAgICAnXFx1MUVBNyc6ICdhJyxcbiAgICAnXFx1MUVBNSc6ICdhJyxcbiAgICAnXFx1MUVBQic6ICdhJyxcbiAgICAnXFx1MUVBOSc6ICdhJyxcbiAgICAnXFx1MDBFMyc6ICdhJyxcbiAgICAnXFx1MDEwMSc6ICdhJyxcbiAgICAnXFx1MDEwMyc6ICdhJyxcbiAgICAnXFx1MUVCMSc6ICdhJyxcbiAgICAnXFx1MUVBRic6ICdhJyxcbiAgICAnXFx1MUVCNSc6ICdhJyxcbiAgICAnXFx1MUVCMyc6ICdhJyxcbiAgICAnXFx1MDIyNyc6ICdhJyxcbiAgICAnXFx1MDFFMSc6ICdhJyxcbiAgICAnXFx1MDBFNCc6ICdhJyxcbiAgICAnXFx1MDFERic6ICdhJyxcbiAgICAnXFx1MUVBMyc6ICdhJyxcbiAgICAnXFx1MDBFNSc6ICdhJyxcbiAgICAnXFx1MDFGQic6ICdhJyxcbiAgICAnXFx1MDFDRSc6ICdhJyxcbiAgICAnXFx1MDIwMSc6ICdhJyxcbiAgICAnXFx1MDIwMyc6ICdhJyxcbiAgICAnXFx1MUVBMSc6ICdhJyxcbiAgICAnXFx1MUVBRCc6ICdhJyxcbiAgICAnXFx1MUVCNyc6ICdhJyxcbiAgICAnXFx1MUUwMSc6ICdhJyxcbiAgICAnXFx1MDEwNSc6ICdhJyxcbiAgICAnXFx1MkM2NSc6ICdhJyxcbiAgICAnXFx1MDI1MCc6ICdhJyxcbiAgICAnXFx1QTczMyc6ICdhYScsXG4gICAgJ1xcdTAwRTYnOiAnYWUnLFxuICAgICdcXHUwMUZEJzogJ2FlJyxcbiAgICAnXFx1MDFFMyc6ICdhZScsXG4gICAgJ1xcdUE3MzUnOiAnYW8nLFxuICAgICdcXHVBNzM3JzogJ2F1JyxcbiAgICAnXFx1QTczOSc6ICdhdicsXG4gICAgJ1xcdUE3M0InOiAnYXYnLFxuICAgICdcXHVBNzNEJzogJ2F5JyxcbiAgICAnXFx1MjREMSc6ICdiJyxcbiAgICAnXFx1RkY0Mic6ICdiJyxcbiAgICAnXFx1MUUwMyc6ICdiJyxcbiAgICAnXFx1MUUwNSc6ICdiJyxcbiAgICAnXFx1MUUwNyc6ICdiJyxcbiAgICAnXFx1MDE4MCc6ICdiJyxcbiAgICAnXFx1MDE4Myc6ICdiJyxcbiAgICAnXFx1MDI1Myc6ICdiJyxcbiAgICAnXFx1MjREMic6ICdjJyxcbiAgICAnXFx1RkY0Myc6ICdjJyxcbiAgICAnXFx1MDEwNyc6ICdjJyxcbiAgICAnXFx1MDEwOSc6ICdjJyxcbiAgICAnXFx1MDEwQic6ICdjJyxcbiAgICAnXFx1MDEwRCc6ICdjJyxcbiAgICAnXFx1MDBFNyc6ICdjJyxcbiAgICAnXFx1MUUwOSc6ICdjJyxcbiAgICAnXFx1MDE4OCc6ICdjJyxcbiAgICAnXFx1MDIzQyc6ICdjJyxcbiAgICAnXFx1QTczRic6ICdjJyxcbiAgICAnXFx1MjE4NCc6ICdjJyxcbiAgICAnXFx1MjREMyc6ICdkJyxcbiAgICAnXFx1RkY0NCc6ICdkJyxcbiAgICAnXFx1MUUwQic6ICdkJyxcbiAgICAnXFx1MDEwRic6ICdkJyxcbiAgICAnXFx1MUUwRCc6ICdkJyxcbiAgICAnXFx1MUUxMSc6ICdkJyxcbiAgICAnXFx1MUUxMyc6ICdkJyxcbiAgICAnXFx1MUUwRic6ICdkJyxcbiAgICAnXFx1MDExMSc6ICdkJyxcbiAgICAnXFx1MDE4Qyc6ICdkJyxcbiAgICAnXFx1MDI1Nic6ICdkJyxcbiAgICAnXFx1MDI1Nyc6ICdkJyxcbiAgICAnXFx1QTc3QSc6ICdkJyxcbiAgICAnXFx1MDFGMyc6ICdkeicsXG4gICAgJ1xcdTAxQzYnOiAnZHonLFxuICAgICdcXHUyNEQ0JzogJ2UnLFxuICAgICdcXHVGRjQ1JzogJ2UnLFxuICAgICdcXHUwMEU4JzogJ2UnLFxuICAgICdcXHUwMEU5JzogJ2UnLFxuICAgICdcXHUwMEVBJzogJ2UnLFxuICAgICdcXHUxRUMxJzogJ2UnLFxuICAgICdcXHUxRUJGJzogJ2UnLFxuICAgICdcXHUxRUM1JzogJ2UnLFxuICAgICdcXHUxRUMzJzogJ2UnLFxuICAgICdcXHUxRUJEJzogJ2UnLFxuICAgICdcXHUwMTEzJzogJ2UnLFxuICAgICdcXHUxRTE1JzogJ2UnLFxuICAgICdcXHUxRTE3JzogJ2UnLFxuICAgICdcXHUwMTE1JzogJ2UnLFxuICAgICdcXHUwMTE3JzogJ2UnLFxuICAgICdcXHUwMEVCJzogJ2UnLFxuICAgICdcXHUxRUJCJzogJ2UnLFxuICAgICdcXHUwMTFCJzogJ2UnLFxuICAgICdcXHUwMjA1JzogJ2UnLFxuICAgICdcXHUwMjA3JzogJ2UnLFxuICAgICdcXHUxRUI5JzogJ2UnLFxuICAgICdcXHUxRUM3JzogJ2UnLFxuICAgICdcXHUwMjI5JzogJ2UnLFxuICAgICdcXHUxRTFEJzogJ2UnLFxuICAgICdcXHUwMTE5JzogJ2UnLFxuICAgICdcXHUxRTE5JzogJ2UnLFxuICAgICdcXHUxRTFCJzogJ2UnLFxuICAgICdcXHUwMjQ3JzogJ2UnLFxuICAgICdcXHUwMjVCJzogJ2UnLFxuICAgICdcXHUwMUREJzogJ2UnLFxuICAgICdcXHUyNEQ1JzogJ2YnLFxuICAgICdcXHVGRjQ2JzogJ2YnLFxuICAgICdcXHUxRTFGJzogJ2YnLFxuICAgICdcXHUwMTkyJzogJ2YnLFxuICAgICdcXHVBNzdDJzogJ2YnLFxuICAgICdcXHUyNEQ2JzogJ2cnLFxuICAgICdcXHVGRjQ3JzogJ2cnLFxuICAgICdcXHUwMUY1JzogJ2cnLFxuICAgICdcXHUwMTFEJzogJ2cnLFxuICAgICdcXHUxRTIxJzogJ2cnLFxuICAgICdcXHUwMTFGJzogJ2cnLFxuICAgICdcXHUwMTIxJzogJ2cnLFxuICAgICdcXHUwMUU3JzogJ2cnLFxuICAgICdcXHUwMTIzJzogJ2cnLFxuICAgICdcXHUwMUU1JzogJ2cnLFxuICAgICdcXHUwMjYwJzogJ2cnLFxuICAgICdcXHVBN0ExJzogJ2cnLFxuICAgICdcXHUxRDc5JzogJ2cnLFxuICAgICdcXHVBNzdGJzogJ2cnLFxuICAgICdcXHUyNEQ3JzogJ2gnLFxuICAgICdcXHVGRjQ4JzogJ2gnLFxuICAgICdcXHUwMTI1JzogJ2gnLFxuICAgICdcXHUxRTIzJzogJ2gnLFxuICAgICdcXHUxRTI3JzogJ2gnLFxuICAgICdcXHUwMjFGJzogJ2gnLFxuICAgICdcXHUxRTI1JzogJ2gnLFxuICAgICdcXHUxRTI5JzogJ2gnLFxuICAgICdcXHUxRTJCJzogJ2gnLFxuICAgICdcXHUxRTk2JzogJ2gnLFxuICAgICdcXHUwMTI3JzogJ2gnLFxuICAgICdcXHUyQzY4JzogJ2gnLFxuICAgICdcXHUyQzc2JzogJ2gnLFxuICAgICdcXHUwMjY1JzogJ2gnLFxuICAgICdcXHUwMTk1JzogJ2h2JyxcbiAgICAnXFx1MjREOCc6ICdpJyxcbiAgICAnXFx1RkY0OSc6ICdpJyxcbiAgICAnXFx1MDBFQyc6ICdpJyxcbiAgICAnXFx1MDBFRCc6ICdpJyxcbiAgICAnXFx1MDBFRSc6ICdpJyxcbiAgICAnXFx1MDEyOSc6ICdpJyxcbiAgICAnXFx1MDEyQic6ICdpJyxcbiAgICAnXFx1MDEyRCc6ICdpJyxcbiAgICAnXFx1MDBFRic6ICdpJyxcbiAgICAnXFx1MUUyRic6ICdpJyxcbiAgICAnXFx1MUVDOSc6ICdpJyxcbiAgICAnXFx1MDFEMCc6ICdpJyxcbiAgICAnXFx1MDIwOSc6ICdpJyxcbiAgICAnXFx1MDIwQic6ICdpJyxcbiAgICAnXFx1MUVDQic6ICdpJyxcbiAgICAnXFx1MDEyRic6ICdpJyxcbiAgICAnXFx1MUUyRCc6ICdpJyxcbiAgICAnXFx1MDI2OCc6ICdpJyxcbiAgICAnXFx1MDEzMSc6ICdpJyxcbiAgICAnXFx1MjREOSc6ICdqJyxcbiAgICAnXFx1RkY0QSc6ICdqJyxcbiAgICAnXFx1MDEzNSc6ICdqJyxcbiAgICAnXFx1MDFGMCc6ICdqJyxcbiAgICAnXFx1MDI0OSc6ICdqJyxcbiAgICAnXFx1MjREQSc6ICdrJyxcbiAgICAnXFx1RkY0Qic6ICdrJyxcbiAgICAnXFx1MUUzMSc6ICdrJyxcbiAgICAnXFx1MDFFOSc6ICdrJyxcbiAgICAnXFx1MUUzMyc6ICdrJyxcbiAgICAnXFx1MDEzNyc6ICdrJyxcbiAgICAnXFx1MUUzNSc6ICdrJyxcbiAgICAnXFx1MDE5OSc6ICdrJyxcbiAgICAnXFx1MkM2QSc6ICdrJyxcbiAgICAnXFx1QTc0MSc6ICdrJyxcbiAgICAnXFx1QTc0Myc6ICdrJyxcbiAgICAnXFx1QTc0NSc6ICdrJyxcbiAgICAnXFx1QTdBMyc6ICdrJyxcbiAgICAnXFx1MjREQic6ICdsJyxcbiAgICAnXFx1RkY0Qyc6ICdsJyxcbiAgICAnXFx1MDE0MCc6ICdsJyxcbiAgICAnXFx1MDEzQSc6ICdsJyxcbiAgICAnXFx1MDEzRSc6ICdsJyxcbiAgICAnXFx1MUUzNyc6ICdsJyxcbiAgICAnXFx1MUUzOSc6ICdsJyxcbiAgICAnXFx1MDEzQyc6ICdsJyxcbiAgICAnXFx1MUUzRCc6ICdsJyxcbiAgICAnXFx1MUUzQic6ICdsJyxcbiAgICAnXFx1MDE3Ric6ICdsJyxcbiAgICAnXFx1MDE0Mic6ICdsJyxcbiAgICAnXFx1MDE5QSc6ICdsJyxcbiAgICAnXFx1MDI2Qic6ICdsJyxcbiAgICAnXFx1MkM2MSc6ICdsJyxcbiAgICAnXFx1QTc0OSc6ICdsJyxcbiAgICAnXFx1QTc4MSc6ICdsJyxcbiAgICAnXFx1QTc0Nyc6ICdsJyxcbiAgICAnXFx1MDFDOSc6ICdsaicsXG4gICAgJ1xcdTI0REMnOiAnbScsXG4gICAgJ1xcdUZGNEQnOiAnbScsXG4gICAgJ1xcdTFFM0YnOiAnbScsXG4gICAgJ1xcdTFFNDEnOiAnbScsXG4gICAgJ1xcdTFFNDMnOiAnbScsXG4gICAgJ1xcdTAyNzEnOiAnbScsXG4gICAgJ1xcdTAyNkYnOiAnbScsXG4gICAgJ1xcdTI0REQnOiAnbicsXG4gICAgJ1xcdUZGNEUnOiAnbicsXG4gICAgJ1xcdTAxRjknOiAnbicsXG4gICAgJ1xcdTAxNDQnOiAnbicsXG4gICAgJ1xcdTAwRjEnOiAnbicsXG4gICAgJ1xcdTFFNDUnOiAnbicsXG4gICAgJ1xcdTAxNDgnOiAnbicsXG4gICAgJ1xcdTFFNDcnOiAnbicsXG4gICAgJ1xcdTAxNDYnOiAnbicsXG4gICAgJ1xcdTFFNEInOiAnbicsXG4gICAgJ1xcdTFFNDknOiAnbicsXG4gICAgJ1xcdTAxOUUnOiAnbicsXG4gICAgJ1xcdTAyNzInOiAnbicsXG4gICAgJ1xcdTAxNDknOiAnbicsXG4gICAgJ1xcdUE3OTEnOiAnbicsXG4gICAgJ1xcdUE3QTUnOiAnbicsXG4gICAgJ1xcdTAxQ0MnOiAnbmonLFxuICAgICdcXHUyNERFJzogJ28nLFxuICAgICdcXHVGRjRGJzogJ28nLFxuICAgICdcXHUwMEYyJzogJ28nLFxuICAgICdcXHUwMEYzJzogJ28nLFxuICAgICdcXHUwMEY0JzogJ28nLFxuICAgICdcXHUxRUQzJzogJ28nLFxuICAgICdcXHUxRUQxJzogJ28nLFxuICAgICdcXHUxRUQ3JzogJ28nLFxuICAgICdcXHUxRUQ1JzogJ28nLFxuICAgICdcXHUwMEY1JzogJ28nLFxuICAgICdcXHUxRTREJzogJ28nLFxuICAgICdcXHUwMjJEJzogJ28nLFxuICAgICdcXHUxRTRGJzogJ28nLFxuICAgICdcXHUwMTREJzogJ28nLFxuICAgICdcXHUxRTUxJzogJ28nLFxuICAgICdcXHUxRTUzJzogJ28nLFxuICAgICdcXHUwMTRGJzogJ28nLFxuICAgICdcXHUwMjJGJzogJ28nLFxuICAgICdcXHUwMjMxJzogJ28nLFxuICAgICdcXHUwMEY2JzogJ28nLFxuICAgICdcXHUwMjJCJzogJ28nLFxuICAgICdcXHUxRUNGJzogJ28nLFxuICAgICdcXHUwMTUxJzogJ28nLFxuICAgICdcXHUwMUQyJzogJ28nLFxuICAgICdcXHUwMjBEJzogJ28nLFxuICAgICdcXHUwMjBGJzogJ28nLFxuICAgICdcXHUwMUExJzogJ28nLFxuICAgICdcXHUxRUREJzogJ28nLFxuICAgICdcXHUxRURCJzogJ28nLFxuICAgICdcXHUxRUUxJzogJ28nLFxuICAgICdcXHUxRURGJzogJ28nLFxuICAgICdcXHUxRUUzJzogJ28nLFxuICAgICdcXHUxRUNEJzogJ28nLFxuICAgICdcXHUxRUQ5JzogJ28nLFxuICAgICdcXHUwMUVCJzogJ28nLFxuICAgICdcXHUwMUVEJzogJ28nLFxuICAgICdcXHUwMEY4JzogJ28nLFxuICAgICdcXHUwMUZGJzogJ28nLFxuICAgICdcXHUwMjU0JzogJ28nLFxuICAgICdcXHVBNzRCJzogJ28nLFxuICAgICdcXHVBNzREJzogJ28nLFxuICAgICdcXHUwMjc1JzogJ28nLFxuICAgICdcXHUwMTUzJzogJ29lJyxcbiAgICAnXFx1MDFBMyc6ICdvaScsXG4gICAgJ1xcdTAyMjMnOiAnb3UnLFxuICAgICdcXHVBNzRGJzogJ29vJyxcbiAgICAnXFx1MjRERic6ICdwJyxcbiAgICAnXFx1RkY1MCc6ICdwJyxcbiAgICAnXFx1MUU1NSc6ICdwJyxcbiAgICAnXFx1MUU1Nyc6ICdwJyxcbiAgICAnXFx1MDFBNSc6ICdwJyxcbiAgICAnXFx1MUQ3RCc6ICdwJyxcbiAgICAnXFx1QTc1MSc6ICdwJyxcbiAgICAnXFx1QTc1Myc6ICdwJyxcbiAgICAnXFx1QTc1NSc6ICdwJyxcbiAgICAnXFx1MjRFMCc6ICdxJyxcbiAgICAnXFx1RkY1MSc6ICdxJyxcbiAgICAnXFx1MDI0Qic6ICdxJyxcbiAgICAnXFx1QTc1Nyc6ICdxJyxcbiAgICAnXFx1QTc1OSc6ICdxJyxcbiAgICAnXFx1MjRFMSc6ICdyJyxcbiAgICAnXFx1RkY1Mic6ICdyJyxcbiAgICAnXFx1MDE1NSc6ICdyJyxcbiAgICAnXFx1MUU1OSc6ICdyJyxcbiAgICAnXFx1MDE1OSc6ICdyJyxcbiAgICAnXFx1MDIxMSc6ICdyJyxcbiAgICAnXFx1MDIxMyc6ICdyJyxcbiAgICAnXFx1MUU1Qic6ICdyJyxcbiAgICAnXFx1MUU1RCc6ICdyJyxcbiAgICAnXFx1MDE1Nyc6ICdyJyxcbiAgICAnXFx1MUU1Ric6ICdyJyxcbiAgICAnXFx1MDI0RCc6ICdyJyxcbiAgICAnXFx1MDI3RCc6ICdyJyxcbiAgICAnXFx1QTc1Qic6ICdyJyxcbiAgICAnXFx1QTdBNyc6ICdyJyxcbiAgICAnXFx1QTc4Myc6ICdyJyxcbiAgICAnXFx1MjRFMic6ICdzJyxcbiAgICAnXFx1RkY1Myc6ICdzJyxcbiAgICAnXFx1MDBERic6ICdzJyxcbiAgICAnXFx1MDE1Qic6ICdzJyxcbiAgICAnXFx1MUU2NSc6ICdzJyxcbiAgICAnXFx1MDE1RCc6ICdzJyxcbiAgICAnXFx1MUU2MSc6ICdzJyxcbiAgICAnXFx1MDE2MSc6ICdzJyxcbiAgICAnXFx1MUU2Nyc6ICdzJyxcbiAgICAnXFx1MUU2Myc6ICdzJyxcbiAgICAnXFx1MUU2OSc6ICdzJyxcbiAgICAnXFx1MDIxOSc6ICdzJyxcbiAgICAnXFx1MDE1Ric6ICdzJyxcbiAgICAnXFx1MDIzRic6ICdzJyxcbiAgICAnXFx1QTdBOSc6ICdzJyxcbiAgICAnXFx1QTc4NSc6ICdzJyxcbiAgICAnXFx1MUU5Qic6ICdzJyxcbiAgICAnXFx1MjRFMyc6ICd0JyxcbiAgICAnXFx1RkY1NCc6ICd0JyxcbiAgICAnXFx1MUU2Qic6ICd0JyxcbiAgICAnXFx1MUU5Nyc6ICd0JyxcbiAgICAnXFx1MDE2NSc6ICd0JyxcbiAgICAnXFx1MUU2RCc6ICd0JyxcbiAgICAnXFx1MDIxQic6ICd0JyxcbiAgICAnXFx1MDE2Myc6ICd0JyxcbiAgICAnXFx1MUU3MSc6ICd0JyxcbiAgICAnXFx1MUU2Ric6ICd0JyxcbiAgICAnXFx1MDE2Nyc6ICd0JyxcbiAgICAnXFx1MDFBRCc6ICd0JyxcbiAgICAnXFx1MDI4OCc6ICd0JyxcbiAgICAnXFx1MkM2Nic6ICd0JyxcbiAgICAnXFx1QTc4Nyc6ICd0JyxcbiAgICAnXFx1QTcyOSc6ICd0eicsXG4gICAgJ1xcdTI0RTQnOiAndScsXG4gICAgJ1xcdUZGNTUnOiAndScsXG4gICAgJ1xcdTAwRjknOiAndScsXG4gICAgJ1xcdTAwRkEnOiAndScsXG4gICAgJ1xcdTAwRkInOiAndScsXG4gICAgJ1xcdTAxNjknOiAndScsXG4gICAgJ1xcdTFFNzknOiAndScsXG4gICAgJ1xcdTAxNkInOiAndScsXG4gICAgJ1xcdTFFN0InOiAndScsXG4gICAgJ1xcdTAxNkQnOiAndScsXG4gICAgJ1xcdTAwRkMnOiAndScsXG4gICAgJ1xcdTAxREMnOiAndScsXG4gICAgJ1xcdTAxRDgnOiAndScsXG4gICAgJ1xcdTAxRDYnOiAndScsXG4gICAgJ1xcdTAxREEnOiAndScsXG4gICAgJ1xcdTFFRTcnOiAndScsXG4gICAgJ1xcdTAxNkYnOiAndScsXG4gICAgJ1xcdTAxNzEnOiAndScsXG4gICAgJ1xcdTAxRDQnOiAndScsXG4gICAgJ1xcdTAyMTUnOiAndScsXG4gICAgJ1xcdTAyMTcnOiAndScsXG4gICAgJ1xcdTAxQjAnOiAndScsXG4gICAgJ1xcdTFFRUInOiAndScsXG4gICAgJ1xcdTFFRTknOiAndScsXG4gICAgJ1xcdTFFRUYnOiAndScsXG4gICAgJ1xcdTFFRUQnOiAndScsXG4gICAgJ1xcdTFFRjEnOiAndScsXG4gICAgJ1xcdTFFRTUnOiAndScsXG4gICAgJ1xcdTFFNzMnOiAndScsXG4gICAgJ1xcdTAxNzMnOiAndScsXG4gICAgJ1xcdTFFNzcnOiAndScsXG4gICAgJ1xcdTFFNzUnOiAndScsXG4gICAgJ1xcdTAyODknOiAndScsXG4gICAgJ1xcdTI0RTUnOiAndicsXG4gICAgJ1xcdUZGNTYnOiAndicsXG4gICAgJ1xcdTFFN0QnOiAndicsXG4gICAgJ1xcdTFFN0YnOiAndicsXG4gICAgJ1xcdTAyOEInOiAndicsXG4gICAgJ1xcdUE3NUYnOiAndicsXG4gICAgJ1xcdTAyOEMnOiAndicsXG4gICAgJ1xcdUE3NjEnOiAndnknLFxuICAgICdcXHUyNEU2JzogJ3cnLFxuICAgICdcXHVGRjU3JzogJ3cnLFxuICAgICdcXHUxRTgxJzogJ3cnLFxuICAgICdcXHUxRTgzJzogJ3cnLFxuICAgICdcXHUwMTc1JzogJ3cnLFxuICAgICdcXHUxRTg3JzogJ3cnLFxuICAgICdcXHUxRTg1JzogJ3cnLFxuICAgICdcXHUxRTk4JzogJ3cnLFxuICAgICdcXHUxRTg5JzogJ3cnLFxuICAgICdcXHUyQzczJzogJ3cnLFxuICAgICdcXHUyNEU3JzogJ3gnLFxuICAgICdcXHVGRjU4JzogJ3gnLFxuICAgICdcXHUxRThCJzogJ3gnLFxuICAgICdcXHUxRThEJzogJ3gnLFxuICAgICdcXHUyNEU4JzogJ3knLFxuICAgICdcXHVGRjU5JzogJ3knLFxuICAgICdcXHUxRUYzJzogJ3knLFxuICAgICdcXHUwMEZEJzogJ3knLFxuICAgICdcXHUwMTc3JzogJ3knLFxuICAgICdcXHUxRUY5JzogJ3knLFxuICAgICdcXHUwMjMzJzogJ3knLFxuICAgICdcXHUxRThGJzogJ3knLFxuICAgICdcXHUwMEZGJzogJ3knLFxuICAgICdcXHUxRUY3JzogJ3knLFxuICAgICdcXHUxRTk5JzogJ3knLFxuICAgICdcXHUxRUY1JzogJ3knLFxuICAgICdcXHUwMUI0JzogJ3knLFxuICAgICdcXHUwMjRGJzogJ3knLFxuICAgICdcXHUxRUZGJzogJ3knLFxuICAgICdcXHUyNEU5JzogJ3onLFxuICAgICdcXHVGRjVBJzogJ3onLFxuICAgICdcXHUwMTdBJzogJ3onLFxuICAgICdcXHUxRTkxJzogJ3onLFxuICAgICdcXHUwMTdDJzogJ3onLFxuICAgICdcXHUwMTdFJzogJ3onLFxuICAgICdcXHUxRTkzJzogJ3onLFxuICAgICdcXHUxRTk1JzogJ3onLFxuICAgICdcXHUwMUI2JzogJ3onLFxuICAgICdcXHUwMjI1JzogJ3onLFxuICAgICdcXHUwMjQwJzogJ3onLFxuICAgICdcXHUyQzZDJzogJ3onLFxuICAgICdcXHVBNzYzJzogJ3onLFxuICAgICdcXHUwMzg2JzogJ1xcdTAzOTEnLFxuICAgICdcXHUwMzg4JzogJ1xcdTAzOTUnLFxuICAgICdcXHUwMzg5JzogJ1xcdTAzOTcnLFxuICAgICdcXHUwMzhBJzogJ1xcdTAzOTknLFxuICAgICdcXHUwM0FBJzogJ1xcdTAzOTknLFxuICAgICdcXHUwMzhDJzogJ1xcdTAzOUYnLFxuICAgICdcXHUwMzhFJzogJ1xcdTAzQTUnLFxuICAgICdcXHUwM0FCJzogJ1xcdTAzQTUnLFxuICAgICdcXHUwMzhGJzogJ1xcdTAzQTknLFxuICAgICdcXHUwM0FDJzogJ1xcdTAzQjEnLFxuICAgICdcXHUwM0FEJzogJ1xcdTAzQjUnLFxuICAgICdcXHUwM0FFJzogJ1xcdTAzQjcnLFxuICAgICdcXHUwM0FGJzogJ1xcdTAzQjknLFxuICAgICdcXHUwM0NBJzogJ1xcdTAzQjknLFxuICAgICdcXHUwMzkwJzogJ1xcdTAzQjknLFxuICAgICdcXHUwM0NDJzogJ1xcdTAzQkYnLFxuICAgICdcXHUwM0NEJzogJ1xcdTAzQzUnLFxuICAgICdcXHUwM0NCJzogJ1xcdTAzQzUnLFxuICAgICdcXHUwM0IwJzogJ1xcdTAzQzUnLFxuICAgICdcXHUwM0NFJzogJ1xcdTAzQzknLFxuICAgICdcXHUwM0MyJzogJ1xcdTAzQzMnLFxuICAgICdcXHUyMDE5JzogJ1xcJydcbiAgfTtcblxuICByZXR1cm4gZGlhY3JpdGljcztcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZGF0YS9iYXNlJyxbXG4gICcuLi91dGlscydcbl0sIGZ1bmN0aW9uIChVdGlscykge1xuICBmdW5jdGlvbiBCYXNlQWRhcHRlciAoJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBCYXNlQWRhcHRlci5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIFV0aWxzLkV4dGVuZChCYXNlQWRhcHRlciwgVXRpbHMuT2JzZXJ2YWJsZSk7XG5cbiAgQmFzZUFkYXB0ZXIucHJvdG90eXBlLmN1cnJlbnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgY3VycmVudGAgbWV0aG9kIG11c3QgYmUgZGVmaW5lZCBpbiBjaGlsZCBjbGFzc2VzLicpO1xuICB9O1xuXG4gIEJhc2VBZGFwdGVyLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYHF1ZXJ5YCBtZXRob2QgbXVzdCBiZSBkZWZpbmVkIGluIGNoaWxkIGNsYXNzZXMuJyk7XG4gIH07XG5cbiAgQmFzZUFkYXB0ZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgLy8gQ2FuIGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgfTtcblxuICBCYXNlQWRhcHRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBDYW4gYmUgaW1wbGVtZW50ZWQgaW4gc3ViY2xhc3Nlc1xuICB9O1xuXG4gIEJhc2VBZGFwdGVyLnByb3RvdHlwZS5nZW5lcmF0ZVJlc3VsdElkID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGF0YSkge1xuICAgIHZhciBpZCA9IGNvbnRhaW5lci5pZCArICctcmVzdWx0LSc7XG5cbiAgICBpZCArPSBVdGlscy5nZW5lcmF0ZUNoYXJzKDQpO1xuXG4gICAgaWYgKGRhdGEuaWQgIT0gbnVsbCkge1xuICAgICAgaWQgKz0gJy0nICsgZGF0YS5pZC50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCArPSAnLScgKyBVdGlscy5nZW5lcmF0ZUNoYXJzKDQpO1xuICAgIH1cbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgcmV0dXJuIEJhc2VBZGFwdGVyO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kYXRhL3NlbGVjdCcsW1xuICAnLi9iYXNlJyxcbiAgJy4uL3V0aWxzJyxcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uIChCYXNlQWRhcHRlciwgVXRpbHMsICQpIHtcbiAgZnVuY3Rpb24gU2VsZWN0QWRhcHRlciAoJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIFNlbGVjdEFkYXB0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoU2VsZWN0QWRhcHRlciwgQmFzZUFkYXB0ZXIpO1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLmN1cnJlbnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgZGF0YSA9IEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChcbiAgICAgIHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSxcbiAgICAgIGZ1bmN0aW9uIChzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuaXRlbSgkKHNlbGVjdGVkRWxlbWVudCkpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjYWxsYmFjayhkYXRhKTtcbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGRhdGEuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgLy8gSWYgZGF0YS5lbGVtZW50IGlzIGEgRE9NIG5vZGUsIHVzZSBpdCBpbnN0ZWFkXG4gICAgaWYgKFxuICAgICAgZGF0YS5lbGVtZW50ICE9IG51bGwgJiYgZGF0YS5lbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ29wdGlvbidcbiAgICApIHtcbiAgICAgIGRhdGEuZWxlbWVudC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaW5wdXQnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRlbGVtZW50LnByb3AoJ211bHRpcGxlJykpIHtcbiAgICAgIHRoaXMuY3VycmVudChmdW5jdGlvbiAoY3VycmVudERhdGEpIHtcbiAgICAgICAgdmFyIHZhbCA9IFtdO1xuXG4gICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgIGRhdGEucHVzaC5hcHBseShkYXRhLCBjdXJyZW50RGF0YSk7XG5cbiAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCBkYXRhLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgdmFyIGlkID0gZGF0YVtkXS5pZDtcblxuICAgICAgICAgIGlmICh2YWwuaW5kZXhPZihpZCkgPT09IC0xKSB7XG4gICAgICAgICAgICB2YWwucHVzaChpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi4kZWxlbWVudC52YWwodmFsKTtcbiAgICAgICAgc2VsZi4kZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2YWwgPSBkYXRhLmlkO1xuXG4gICAgICB0aGlzLiRlbGVtZW50LnZhbCh2YWwpO1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH1cbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS51bnNlbGVjdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLiRlbGVtZW50LnByb3AoJ211bHRpcGxlJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkYXRhLnNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBpZiAoXG4gICAgICBkYXRhLmVsZW1lbnQgIT0gbnVsbCAmJlxuICAgICAgZGF0YS5lbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ29wdGlvbidcbiAgICApIHtcbiAgICAgIGRhdGEuZWxlbWVudC5zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2lucHV0JykudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnQoZnVuY3Rpb24gKGN1cnJlbnREYXRhKSB7XG4gICAgICB2YXIgdmFsID0gW107XG5cbiAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgY3VycmVudERhdGEubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgdmFyIGlkID0gY3VycmVudERhdGFbZF0uaWQ7XG5cbiAgICAgICAgaWYgKGlkICE9PSBkYXRhLmlkICYmIHZhbC5pbmRleE9mKGlkKSA9PT0gLTEpIHtcbiAgICAgICAgICB2YWwucHVzaChpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi4kZWxlbWVudC52YWwodmFsKTtcblxuICAgICAgc2VsZi4kZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICBjb250YWluZXIub24oJ3NlbGVjdCcsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHNlbGYuc2VsZWN0KHBhcmFtcy5kYXRhKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigndW5zZWxlY3QnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLnVuc2VsZWN0KHBhcmFtcy5kYXRhKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFJlbW92ZSBhbnl0aGluZyBhZGRlZCB0byBjaGlsZCBlbGVtZW50c1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnKicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgLy8gUmVtb3ZlIGFueSBjdXN0b20gZGF0YSBzZXQgYnkgU2VsZWN0MlxuICAgICAgVXRpbHMuUmVtb3ZlRGF0YSh0aGlzKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGRhdGEgPSBbXTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgJG9wdGlvbnMgPSB0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCk7XG5cbiAgICAkb3B0aW9ucy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdvcHRpb24nICYmXG4gICAgICAgIHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnb3B0Z3JvdXAnXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgJG9wdGlvbiA9ICQodGhpcyk7XG5cbiAgICAgIHZhciBvcHRpb24gPSBzZWxmLml0ZW0oJG9wdGlvbik7XG5cbiAgICAgIHZhciBtYXRjaGVzID0gc2VsZi5tYXRjaGVzKHBhcmFtcywgb3B0aW9uKTtcblxuICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgZGF0YS5wdXNoKG1hdGNoZXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2FsbGJhY2soe1xuICAgICAgcmVzdWx0czogZGF0YVxuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLmFkZE9wdGlvbnMgPSBmdW5jdGlvbiAoJG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50LmFwcGVuZCgkb3B0aW9ucyk7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUub3B0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgb3B0aW9uO1xuXG4gICAgaWYgKGRhdGEuY2hpbGRyZW4pIHtcbiAgICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJyk7XG4gICAgICBvcHRpb24ubGFiZWwgPSBkYXRhLnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXG4gICAgICBpZiAob3B0aW9uLnRleHRDb250ZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gZGF0YS50ZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGRhdGEudGV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YS5pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb24udmFsdWUgPSBkYXRhLmlkO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmRpc2FibGVkKSB7XG4gICAgICBvcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnNlbGVjdGVkKSB7XG4gICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnRpdGxlKSB7XG4gICAgICBvcHRpb24udGl0bGUgPSBkYXRhLnRpdGxlO1xuICAgIH1cblxuICAgIHZhciBub3JtYWxpemVkRGF0YSA9IHRoaXMuX25vcm1hbGl6ZUl0ZW0oZGF0YSk7XG4gICAgbm9ybWFsaXplZERhdGEuZWxlbWVudCA9IG9wdGlvbjtcblxuICAgIC8vIE92ZXJyaWRlIHRoZSBvcHRpb24ncyBkYXRhIHdpdGggdGhlIGNvbWJpbmVkIGRhdGFcbiAgICBVdGlscy5TdG9yZURhdGEob3B0aW9uLCAnZGF0YScsIG5vcm1hbGl6ZWREYXRhKTtcblxuICAgIHJldHVybiAkKG9wdGlvbik7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUuaXRlbSA9IGZ1bmN0aW9uICgkb3B0aW9uKSB7XG4gICAgdmFyIGRhdGEgPSB7fTtcblxuICAgIGRhdGEgPSBVdGlscy5HZXREYXRhKCRvcHRpb25bMF0sICdkYXRhJyk7XG5cbiAgICBpZiAoZGF0YSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9uID0gJG9wdGlvblswXTtcblxuICAgIGlmIChvcHRpb24udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnb3B0aW9uJykge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgaWQ6ICRvcHRpb24udmFsKCksXG4gICAgICAgIHRleHQ6ICRvcHRpb24udGV4dCgpLFxuICAgICAgICBkaXNhYmxlZDogJG9wdGlvbi5wcm9wKCdkaXNhYmxlZCcpLFxuICAgICAgICBzZWxlY3RlZDogJG9wdGlvbi5wcm9wKCdzZWxlY3RlZCcpLFxuICAgICAgICB0aXRsZTogJG9wdGlvbi5wcm9wKCd0aXRsZScpXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAob3B0aW9uLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ29wdGdyb3VwJykge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgdGV4dDogJG9wdGlvbi5wcm9wKCdsYWJlbCcpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHRpdGxlOiAkb3B0aW9uLnByb3AoJ3RpdGxlJylcbiAgICAgIH07XG5cbiAgICAgIHZhciAkY2hpbGRyZW4gPSAkb3B0aW9uLmNoaWxkcmVuKCdvcHRpb24nKTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8ICRjaGlsZHJlbi5sZW5ndGg7IGMrKykge1xuICAgICAgICB2YXIgJGNoaWxkID0gJCgkY2hpbGRyZW5bY10pO1xuXG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuaXRlbSgkY2hpbGQpO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuXG4gICAgICBkYXRhLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgZGF0YSA9IHRoaXMuX25vcm1hbGl6ZUl0ZW0oZGF0YSk7XG4gICAgZGF0YS5lbGVtZW50ID0gJG9wdGlvblswXTtcblxuICAgIFV0aWxzLlN0b3JlRGF0YSgkb3B0aW9uWzBdLCAnZGF0YScsIGRhdGEpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUuX25vcm1hbGl6ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIGlmIChpdGVtICE9PSBPYmplY3QoaXRlbSkpIHtcbiAgICAgIGl0ZW0gPSB7XG4gICAgICAgIGlkOiBpdGVtLFxuICAgICAgICB0ZXh0OiBpdGVtXG4gICAgICB9O1xuICAgIH1cblxuICAgIGl0ZW0gPSAkLmV4dGVuZCh7fSwge1xuICAgICAgdGV4dDogJydcbiAgICB9LCBpdGVtKTtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgIH07XG5cbiAgICBpZiAoaXRlbS5pZCAhPSBudWxsKSB7XG4gICAgICBpdGVtLmlkID0gaXRlbS5pZC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmIChpdGVtLnRleHQgIT0gbnVsbCkge1xuICAgICAgaXRlbS50ZXh0ID0gaXRlbS50ZXh0LnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW0uX3Jlc3VsdElkID09IG51bGwgJiYgaXRlbS5pZCAmJiB0aGlzLmNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICBpdGVtLl9yZXN1bHRJZCA9IHRoaXMuZ2VuZXJhdGVSZXN1bHRJZCh0aGlzLmNvbnRhaW5lciwgaXRlbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgaXRlbSk7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUubWF0Y2hlcyA9IGZ1bmN0aW9uIChwYXJhbXMsIGRhdGEpIHtcbiAgICB2YXIgbWF0Y2hlciA9IHRoaXMub3B0aW9ucy5nZXQoJ21hdGNoZXInKTtcblxuICAgIHJldHVybiBtYXRjaGVyKHBhcmFtcywgZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIFNlbGVjdEFkYXB0ZXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2RhdGEvYXJyYXknLFtcbiAgJy4vc2VsZWN0JyxcbiAgJy4uL3V0aWxzJyxcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uIChTZWxlY3RBZGFwdGVyLCBVdGlscywgJCkge1xuICBmdW5jdGlvbiBBcnJheUFkYXB0ZXIgKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5fZGF0YVRvQ29udmVydCA9IG9wdGlvbnMuZ2V0KCdkYXRhJykgfHwgW107XG5cbiAgICBBcnJheUFkYXB0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgJGVsZW1lbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgVXRpbHMuRXh0ZW5kKEFycmF5QWRhcHRlciwgU2VsZWN0QWRhcHRlcik7XG5cbiAgQXJyYXlBZGFwdGVyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIEFycmF5QWRhcHRlci5fX3N1cGVyX18uYmluZC5jYWxsKHRoaXMsIGNvbnRhaW5lciwgJGNvbnRhaW5lcik7XG5cbiAgICB0aGlzLmFkZE9wdGlvbnModGhpcy5jb252ZXJ0VG9PcHRpb25zKHRoaXMuX2RhdGFUb0NvbnZlcnQpKTtcbiAgfTtcblxuICBBcnJheUFkYXB0ZXIucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyICRvcHRpb24gPSB0aGlzLiRlbGVtZW50LmZpbmQoJ29wdGlvbicpLmZpbHRlcihmdW5jdGlvbiAoaSwgZWxtKSB7XG4gICAgICByZXR1cm4gZWxtLnZhbHVlID09IGRhdGEuaWQudG9TdHJpbmcoKTtcbiAgICB9KTtcblxuICAgIGlmICgkb3B0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgJG9wdGlvbiA9IHRoaXMub3B0aW9uKGRhdGEpO1xuXG4gICAgICB0aGlzLmFkZE9wdGlvbnMoJG9wdGlvbik7XG4gICAgfVxuXG4gICAgQXJyYXlBZGFwdGVyLl9fc3VwZXJfXy5zZWxlY3QuY2FsbCh0aGlzLCBkYXRhKTtcbiAgfTtcblxuICBBcnJheUFkYXB0ZXIucHJvdG90eXBlLmNvbnZlcnRUb09wdGlvbnMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciAkZXhpc3RpbmcgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ29wdGlvbicpO1xuICAgIHZhciBleGlzdGluZ0lkcyA9ICRleGlzdGluZy5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNlbGYuaXRlbSgkKHRoaXMpKS5pZDtcbiAgICB9KS5nZXQoKTtcblxuICAgIHZhciAkb3B0aW9ucyA9IFtdO1xuXG4gICAgLy8gRmlsdGVyIG91dCBhbGwgaXRlbXMgZXhjZXB0IGZvciB0aGUgb25lIHBhc3NlZCBpbiB0aGUgYXJndW1lbnRcbiAgICBmdW5jdGlvbiBvbmx5SXRlbSAoaXRlbSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQodGhpcykudmFsKCkgPT0gaXRlbS5pZDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgZCA9IDA7IGQgPCBkYXRhLmxlbmd0aDsgZCsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHRoaXMuX25vcm1hbGl6ZUl0ZW0oZGF0YVtkXSk7XG5cbiAgICAgIC8vIFNraXAgaXRlbXMgd2hpY2ggd2VyZSBwcmUtbG9hZGVkLCBvbmx5IG1lcmdlIHRoZSBkYXRhXG4gICAgICBpZiAoZXhpc3RpbmdJZHMuaW5kZXhPZihpdGVtLmlkKSA+PSAwKSB7XG4gICAgICAgIHZhciAkZXhpc3RpbmdPcHRpb24gPSAkZXhpc3RpbmcuZmlsdGVyKG9ubHlJdGVtKGl0ZW0pKTtcblxuICAgICAgICB2YXIgZXhpc3RpbmdEYXRhID0gdGhpcy5pdGVtKCRleGlzdGluZ09wdGlvbik7XG4gICAgICAgIHZhciBuZXdEYXRhID0gJC5leHRlbmQodHJ1ZSwge30sIGl0ZW0sIGV4aXN0aW5nRGF0YSk7XG5cbiAgICAgICAgdmFyICRuZXdPcHRpb24gPSB0aGlzLm9wdGlvbihuZXdEYXRhKTtcblxuICAgICAgICAkZXhpc3RpbmdPcHRpb24ucmVwbGFjZVdpdGgoJG5ld09wdGlvbik7XG5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhciAkb3B0aW9uID0gdGhpcy5vcHRpb24oaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgIHZhciAkY2hpbGRyZW4gPSB0aGlzLmNvbnZlcnRUb09wdGlvbnMoaXRlbS5jaGlsZHJlbik7XG5cbiAgICAgICAgJG9wdGlvbi5hcHBlbmQoJGNoaWxkcmVuKTtcbiAgICAgIH1cblxuICAgICAgJG9wdGlvbnMucHVzaCgkb3B0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG9wdGlvbnM7XG4gIH07XG5cbiAgcmV0dXJuIEFycmF5QWRhcHRlcjtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZGF0YS9hamF4JyxbXG4gICcuL2FycmF5JyxcbiAgJy4uL3V0aWxzJyxcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uIChBcnJheUFkYXB0ZXIsIFV0aWxzLCAkKSB7XG4gIGZ1bmN0aW9uIEFqYXhBZGFwdGVyICgkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuYWpheE9wdGlvbnMgPSB0aGlzLl9hcHBseURlZmF1bHRzKG9wdGlvbnMuZ2V0KCdhamF4JykpO1xuXG4gICAgaWYgKHRoaXMuYWpheE9wdGlvbnMucHJvY2Vzc1Jlc3VsdHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5wcm9jZXNzUmVzdWx0cyA9IHRoaXMuYWpheE9wdGlvbnMucHJvY2Vzc1Jlc3VsdHM7XG4gICAgfVxuXG4gICAgQWpheEFkYXB0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgJGVsZW1lbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgVXRpbHMuRXh0ZW5kKEFqYXhBZGFwdGVyLCBBcnJheUFkYXB0ZXIpO1xuXG4gIEFqYXhBZGFwdGVyLnByb3RvdHlwZS5fYXBwbHlEZWZhdWx0cyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgZGF0YTogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIHBhcmFtcywge1xuICAgICAgICAgIHE6IHBhcmFtcy50ZXJtXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRyYW5zcG9ydDogZnVuY3Rpb24gKHBhcmFtcywgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgICB2YXIgJHJlcXVlc3QgPSAkLmFqYXgocGFyYW1zKTtcblxuICAgICAgICAkcmVxdWVzdC50aGVuKHN1Y2Nlc3MpO1xuICAgICAgICAkcmVxdWVzdC5mYWlsKGZhaWx1cmUpO1xuXG4gICAgICAgIHJldHVybiAkcmVxdWVzdDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucywgdHJ1ZSk7XG4gIH07XG5cbiAgQWpheEFkYXB0ZXIucHJvdG90eXBlLnByb2Nlc3NSZXN1bHRzID0gZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICBBamF4QWRhcHRlci5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHZhciBtYXRjaGVzID0gW107XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuX3JlcXVlc3QgIT0gbnVsbCkge1xuICAgICAgLy8gSlNPTlAgcmVxdWVzdHMgY2Fubm90IGFsd2F5cyBiZSBhYm9ydGVkXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX3JlcXVlc3QuYWJvcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcbiAgICAgIHR5cGU6ICdHRVQnXG4gICAgfSwgdGhpcy5hamF4T3B0aW9ucyk7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudXJsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsLmNhbGwodGhpcy4kZWxlbWVudCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhLmNhbGwodGhpcy4kZWxlbWVudCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0ICgpIHtcbiAgICAgIHZhciAkcmVxdWVzdCA9IG9wdGlvbnMudHJhbnNwb3J0KG9wdGlvbnMsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gc2VsZi5wcm9jZXNzUmVzdWx0cyhkYXRhLCBwYXJhbXMpO1xuXG4gICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZ2V0KCdkZWJ1ZycpICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAvLyBDaGVjayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcmVzcG9uc2UgaW5jbHVkZWQgYSBgcmVzdWx0c2Aga2V5LlxuICAgICAgICAgIGlmICghcmVzdWx0cyB8fCAhcmVzdWx0cy5yZXN1bHRzIHx8ICFBcnJheS5pc0FycmF5KHJlc3VsdHMucmVzdWx0cykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICdTZWxlY3QyOiBUaGUgQUpBWCByZXN1bHRzIGRpZCBub3QgcmV0dXJuIGFuIGFycmF5IGluIHRoZSAnICtcbiAgICAgICAgICAgICAgJ2ByZXN1bHRzYCBrZXkgb2YgdGhlIHJlc3BvbnNlLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2socmVzdWx0cyk7XG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIEF0dGVtcHQgdG8gZGV0ZWN0IGlmIGEgcmVxdWVzdCB3YXMgYWJvcnRlZFxuICAgICAgICAvLyBPbmx5IHdvcmtzIGlmIHRoZSB0cmFuc3BvcnQgZXhwb3NlcyBhIHN0YXR1cyBwcm9wZXJ0eVxuICAgICAgICBpZiAoJ3N0YXR1cycgaW4gJHJlcXVlc3QgJiZcbiAgICAgICAgICAgICgkcmVxdWVzdC5zdGF0dXMgPT09IDAgfHwgJHJlcXVlc3Quc3RhdHVzID09PSAnMCcpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi50cmlnZ2VyKCdyZXN1bHRzOm1lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ2Vycm9yTG9hZGluZydcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgc2VsZi5fcmVxdWVzdCA9ICRyZXF1ZXN0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFqYXhPcHRpb25zLmRlbGF5ICYmIHBhcmFtcy50ZXJtICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9xdWVyeVRpbWVvdXQpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9xdWVyeVRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9xdWVyeVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChyZXF1ZXN0LCB0aGlzLmFqYXhPcHRpb25zLmRlbGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQWpheEFkYXB0ZXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2RhdGEvdGFncycsW1xuICAnanF1ZXJ5J1xuXSwgZnVuY3Rpb24gKCQpIHtcbiAgZnVuY3Rpb24gVGFncyAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciB0YWdzID0gb3B0aW9ucy5nZXQoJ3RhZ3MnKTtcblxuICAgIHZhciBjcmVhdGVUYWcgPSBvcHRpb25zLmdldCgnY3JlYXRlVGFnJyk7XG5cbiAgICBpZiAoY3JlYXRlVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY3JlYXRlVGFnID0gY3JlYXRlVGFnO1xuICAgIH1cblxuICAgIHZhciBpbnNlcnRUYWcgPSBvcHRpb25zLmdldCgnaW5zZXJ0VGFnJyk7XG5cbiAgICBpZiAoaW5zZXJ0VGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5pbnNlcnRUYWcgPSBpbnNlcnRUYWc7XG4gICAgfVxuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgJGVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFncykpIHtcbiAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGFncy5sZW5ndGg7IHQrKykge1xuICAgICAgICB2YXIgdGFnID0gdGFnc1t0XTtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9ub3JtYWxpemVJdGVtKHRhZyk7XG5cbiAgICAgICAgdmFyICRvcHRpb24gPSB0aGlzLm9wdGlvbihpdGVtKTtcblxuICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZCgkb3B0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBUYWdzLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLl9yZW1vdmVPbGRUYWdzKCk7XG5cbiAgICBpZiAocGFyYW1zLnRlcm0gPT0gbnVsbCB8fCBwYXJhbXMucGFnZSAhPSBudWxsKSB7XG4gICAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cmFwcGVyIChvYmosIGNoaWxkKSB7XG4gICAgICB2YXIgZGF0YSA9IG9iai5yZXN1bHRzO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG9wdGlvbiA9IGRhdGFbaV07XG5cbiAgICAgICAgdmFyIGNoZWNrQ2hpbGRyZW4gPSAoXG4gICAgICAgICAgb3B0aW9uLmNoaWxkcmVuICE9IG51bGwgJiZcbiAgICAgICAgICAhd3JhcHBlcih7XG4gICAgICAgICAgICByZXN1bHRzOiBvcHRpb24uY2hpbGRyZW5cbiAgICAgICAgICB9LCB0cnVlKVxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBvcHRpb25UZXh0ID0gKG9wdGlvbi50ZXh0IHx8ICcnKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB2YXIgcGFyYW1zVGVybSA9IChwYXJhbXMudGVybSB8fCAnJykudG9VcHBlckNhc2UoKTtcblxuICAgICAgICB2YXIgY2hlY2tUZXh0ID0gb3B0aW9uVGV4dCA9PT0gcGFyYW1zVGVybTtcblxuICAgICAgICBpZiAoY2hlY2tUZXh0IHx8IGNoZWNrQ2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvYmouZGF0YSA9IGRhdGE7XG4gICAgICAgICAgY2FsbGJhY2sob2JqKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciB0YWcgPSBzZWxmLmNyZWF0ZVRhZyhwYXJhbXMpO1xuXG4gICAgICBpZiAodGFnICE9IG51bGwpIHtcbiAgICAgICAgdmFyICRvcHRpb24gPSBzZWxmLm9wdGlvbih0YWcpO1xuICAgICAgICAkb3B0aW9uLmF0dHIoJ2RhdGEtc2VsZWN0Mi10YWcnLCAndHJ1ZScpO1xuXG4gICAgICAgIHNlbGYuYWRkT3B0aW9ucyhbJG9wdGlvbl0pO1xuXG4gICAgICAgIHNlbGYuaW5zZXJ0VGFnKGRhdGEsIHRhZyk7XG4gICAgICB9XG5cbiAgICAgIG9iai5yZXN1bHRzID0gZGF0YTtcblxuICAgICAgY2FsbGJhY2sob2JqKTtcbiAgICB9XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBwYXJhbXMsIHdyYXBwZXIpO1xuICB9O1xuXG4gIFRhZ3MucHJvdG90eXBlLmNyZWF0ZVRhZyA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcykge1xuICAgIGlmIChwYXJhbXMudGVybSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgdGVybSA9IHBhcmFtcy50ZXJtLnRyaW0oKTtcblxuICAgIGlmICh0ZXJtID09PSAnJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0ZXJtLFxuICAgICAgdGV4dDogdGVybVxuICAgIH07XG4gIH07XG5cbiAgVGFncy5wcm90b3R5cGUuaW5zZXJ0VGFnID0gZnVuY3Rpb24gKF8sIGRhdGEsIHRhZykge1xuICAgIGRhdGEudW5zaGlmdCh0YWcpO1xuICB9O1xuXG4gIFRhZ3MucHJvdG90eXBlLl9yZW1vdmVPbGRUYWdzID0gZnVuY3Rpb24gKF8pIHtcbiAgICB2YXIgJG9wdGlvbnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ29wdGlvbltkYXRhLXNlbGVjdDItdGFnXScpO1xuXG4gICAgJG9wdGlvbnMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFRhZ3M7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2RhdGEvdG9rZW5pemVyJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICBmdW5jdGlvbiBUb2tlbml6ZXIgKGRlY29yYXRlZCwgJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB2YXIgdG9rZW5pemVyID0gb3B0aW9ucy5nZXQoJ3Rva2VuaXplcicpO1xuXG4gICAgaWYgKHRva2VuaXplciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnRva2VuaXplciA9IHRva2VuaXplcjtcbiAgICB9XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCAkZWxlbWVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBUb2tlbml6ZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgdGhpcy4kc2VhcmNoID0gIGNvbnRhaW5lci5kcm9wZG93bi4kc2VhcmNoIHx8IGNvbnRhaW5lci5zZWxlY3Rpb24uJHNlYXJjaCB8fFxuICAgICAgJGNvbnRhaW5lci5maW5kKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJyk7XG4gIH07XG5cbiAgVG9rZW5pemVyLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVBbmRTZWxlY3QgKGRhdGEpIHtcbiAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgZGF0YSBvYmplY3Qgc28gd2UgY2FuIHVzZSBpdCBmb3IgY2hlY2tzXG4gICAgICB2YXIgaXRlbSA9IHNlbGYuX25vcm1hbGl6ZUl0ZW0oZGF0YSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSBkYXRhIG9iamVjdCBhbHJlYWR5IGV4aXN0cyBhcyBhIHRhZ1xuICAgICAgLy8gU2VsZWN0IGl0IGlmIGl0IGRvZXNuJ3RcbiAgICAgIHZhciAkZXhpc3RpbmdPcHRpb25zID0gc2VsZi4kZWxlbWVudC5maW5kKCdvcHRpb24nKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJCh0aGlzKS52YWwoKSA9PT0gaXRlbS5pZDtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBhbiBleGlzdGluZyBvcHRpb24gd2Fzbid0IGZvdW5kIGZvciBpdCwgY3JlYXRlIHRoZSBvcHRpb25cbiAgICAgIGlmICghJGV4aXN0aW5nT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgdmFyICRvcHRpb24gPSBzZWxmLm9wdGlvbihpdGVtKTtcbiAgICAgICAgJG9wdGlvbi5hdHRyKCdkYXRhLXNlbGVjdDItdGFnJywgdHJ1ZSk7XG5cbiAgICAgICAgc2VsZi5fcmVtb3ZlT2xkVGFncygpO1xuICAgICAgICBzZWxmLmFkZE9wdGlvbnMoWyRvcHRpb25dKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VsZWN0IHRoZSBpdGVtLCBub3cgdGhhdCB3ZSBrbm93IHRoZXJlIGlzIGFuIG9wdGlvbiBmb3IgaXRcbiAgICAgIHNlbGVjdChpdGVtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3QgKGRhdGEpIHtcbiAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0Jywge1xuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXJhbXMudGVybSA9IHBhcmFtcy50ZXJtIHx8ICcnO1xuXG4gICAgdmFyIHRva2VuRGF0YSA9IHRoaXMudG9rZW5pemVyKHBhcmFtcywgdGhpcy5vcHRpb25zLCBjcmVhdGVBbmRTZWxlY3QpO1xuXG4gICAgaWYgKHRva2VuRGF0YS50ZXJtICE9PSBwYXJhbXMudGVybSkge1xuICAgICAgLy8gUmVwbGFjZSB0aGUgc2VhcmNoIHRlcm0gaWYgd2UgaGF2ZSB0aGUgc2VhcmNoIGJveFxuICAgICAgaWYgKHRoaXMuJHNlYXJjaC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy4kc2VhcmNoLnZhbCh0b2tlbkRhdGEudGVybSk7XG4gICAgICAgIHRoaXMuJHNlYXJjaC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgfVxuXG4gICAgICBwYXJhbXMudGVybSA9IHRva2VuRGF0YS50ZXJtO1xuICAgIH1cblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsIHBhcmFtcywgY2FsbGJhY2spO1xuICB9O1xuXG4gIFRva2VuaXplci5wcm90b3R5cGUudG9rZW5pemVyID0gZnVuY3Rpb24gKF8sIHBhcmFtcywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VwYXJhdG9ycyA9IG9wdGlvbnMuZ2V0KCd0b2tlblNlcGFyYXRvcnMnKSB8fCBbXTtcbiAgICB2YXIgdGVybSA9IHBhcmFtcy50ZXJtO1xuICAgIHZhciBpID0gMDtcblxuICAgIHZhciBjcmVhdGVUYWcgPSB0aGlzLmNyZWF0ZVRhZyB8fCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogcGFyYW1zLnRlcm0sXG4gICAgICAgIHRleHQ6IHBhcmFtcy50ZXJtXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB3aGlsZSAoaSA8IHRlcm0ubGVuZ3RoKSB7XG4gICAgICB2YXIgdGVybUNoYXIgPSB0ZXJtW2ldO1xuXG4gICAgICBpZiAoc2VwYXJhdG9ycy5pbmRleE9mKHRlcm1DaGFyKSA9PT0gLTEpIHtcbiAgICAgICAgaSsrO1xuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGFydCA9IHRlcm0uc3Vic3RyKDAsIGkpO1xuICAgICAgdmFyIHBhcnRQYXJhbXMgPSAkLmV4dGVuZCh7fSwgcGFyYW1zLCB7XG4gICAgICAgIHRlcm06IHBhcnRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZGF0YSA9IGNyZWF0ZVRhZyhwYXJ0UGFyYW1zKTtcblxuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICBpKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayhkYXRhKTtcblxuICAgICAgLy8gUmVzZXQgdGhlIHRlcm0gdG8gbm90IGluY2x1ZGUgdGhlIHRva2VuaXplZCBwb3J0aW9uXG4gICAgICB0ZXJtID0gdGVybS5zdWJzdHIoaSArIDEpIHx8ICcnO1xuICAgICAgaSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRlcm06IHRlcm1cbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBUb2tlbml6ZXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2RhdGEvbWluaW11bUlucHV0TGVuZ3RoJyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWluaW11bUlucHV0TGVuZ3RoIChkZWNvcmF0ZWQsICRlLCBvcHRpb25zKSB7XG4gICAgdGhpcy5taW5pbXVtSW5wdXRMZW5ndGggPSBvcHRpb25zLmdldCgnbWluaW11bUlucHV0TGVuZ3RoJyk7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCAkZSwgb3B0aW9ucyk7XG4gIH1cblxuICBNaW5pbXVtSW5wdXRMZW5ndGgucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHBhcmFtcy50ZXJtID0gcGFyYW1zLnRlcm0gfHwgJyc7XG5cbiAgICBpZiAocGFyYW1zLnRlcm0ubGVuZ3RoIDwgdGhpcy5taW5pbXVtSW5wdXRMZW5ndGgpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigncmVzdWx0czptZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlOiAnaW5wdXRUb29TaG9ydCcsXG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICBtaW5pbXVtOiB0aGlzLm1pbmltdW1JbnB1dExlbmd0aCxcbiAgICAgICAgICBpbnB1dDogcGFyYW1zLnRlcm0sXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4gTWluaW11bUlucHV0TGVuZ3RoO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kYXRhL21heGltdW1JbnB1dExlbmd0aCcsW1xuXG5dLCBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1heGltdW1JbnB1dExlbmd0aCAoZGVjb3JhdGVkLCAkZSwgb3B0aW9ucykge1xuICAgIHRoaXMubWF4aW11bUlucHV0TGVuZ3RoID0gb3B0aW9ucy5nZXQoJ21heGltdW1JbnB1dExlbmd0aCcpO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgJGUsIG9wdGlvbnMpO1xuICB9XG5cbiAgTWF4aW11bUlucHV0TGVuZ3RoLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMudGVybSA9IHBhcmFtcy50ZXJtIHx8ICcnO1xuXG4gICAgaWYgKHRoaXMubWF4aW11bUlucHV0TGVuZ3RoID4gMCAmJlxuICAgICAgICBwYXJhbXMudGVybS5sZW5ndGggPiB0aGlzLm1heGltdW1JbnB1dExlbmd0aCkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdyZXN1bHRzOm1lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2U6ICdpbnB1dFRvb0xvbmcnLFxuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgbWF4aW11bTogdGhpcy5tYXhpbXVtSW5wdXRMZW5ndGgsXG4gICAgICAgICAgaW5wdXQ6IHBhcmFtcy50ZXJtLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgcGFyYW1zLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgcmV0dXJuIE1heGltdW1JbnB1dExlbmd0aDtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZGF0YS9tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoJyxbXG5cbl0sIGZ1bmN0aW9uICgpe1xuICBmdW5jdGlvbiBNYXhpbXVtU2VsZWN0aW9uTGVuZ3RoIChkZWNvcmF0ZWQsICRlLCBvcHRpb25zKSB7XG4gICAgdGhpcy5tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoID0gb3B0aW9ucy5nZXQoJ21heGltdW1TZWxlY3Rpb25MZW5ndGgnKTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlLCBvcHRpb25zKTtcbiAgfVxuXG4gIE1heGltdW1TZWxlY3Rpb25MZW5ndGgucHJvdG90eXBlLmJpbmQgPVxuICAgIGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgICBjb250YWluZXIub24oJ3NlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fY2hlY2tJZk1heGltdW1TZWxlY3RlZCgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgTWF4aW11bVNlbGVjdGlvbkxlbmd0aC5wcm90b3R5cGUucXVlcnkgPVxuICAgIGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5fY2hlY2tJZk1heGltdW1TZWxlY3RlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlY29yYXRlZC5jYWxsKHNlbGYsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gIH07XG5cbiAgTWF4aW11bVNlbGVjdGlvbkxlbmd0aC5wcm90b3R5cGUuX2NoZWNrSWZNYXhpbXVtU2VsZWN0ZWQgPVxuICAgIGZ1bmN0aW9uIChfLCBzdWNjZXNzQ2FsbGJhY2spIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5jdXJyZW50KGZ1bmN0aW9uIChjdXJyZW50RGF0YSkge1xuICAgICAgICB2YXIgY291bnQgPSBjdXJyZW50RGF0YSAhPSBudWxsID8gY3VycmVudERhdGEubGVuZ3RoIDogMDtcbiAgICAgICAgaWYgKHNlbGYubWF4aW11bVNlbGVjdGlvbkxlbmd0aCA+IDAgJiZcbiAgICAgICAgICBjb3VudCA+PSBzZWxmLm1heGltdW1TZWxlY3Rpb25MZW5ndGgpIHtcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3Jlc3VsdHM6bWVzc2FnZScsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdtYXhpbXVtU2VsZWN0ZWQnLFxuICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICBtYXhpbXVtOiBzZWxmLm1heGltdW1TZWxlY3Rpb25MZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VjY2Vzc0NhbGxiYWNrKSB7XG4gICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBNYXhpbXVtU2VsZWN0aW9uTGVuZ3RoO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bicsW1xuICAnanF1ZXJ5JyxcbiAgJy4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgVXRpbHMpIHtcbiAgZnVuY3Rpb24gRHJvcGRvd24gKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBEcm9wZG93bi5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIFV0aWxzLkV4dGVuZChEcm9wZG93biwgVXRpbHMuT2JzZXJ2YWJsZSk7XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGRyb3Bkb3duID0gJChcbiAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdDItZHJvcGRvd25cIj4nICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1yZXN1bHRzXCI+PC9zcGFuPicgK1xuICAgICAgJzwvc3Bhbj4nXG4gICAgKTtcblxuICAgICRkcm9wZG93bi5hdHRyKCdkaXInLCB0aGlzLm9wdGlvbnMuZ2V0KCdkaXInKSk7XG5cbiAgICB0aGlzLiRkcm9wZG93biA9ICRkcm9wZG93bjtcblxuICAgIHJldHVybiAkZHJvcGRvd247XG4gIH07XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gU2hvdWxkIGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgfTtcblxuICBEcm9wZG93bi5wcm90b3R5cGUucG9zaXRpb24gPSBmdW5jdGlvbiAoJGRyb3Bkb3duLCAkY29udGFpbmVyKSB7XG4gICAgLy8gU2hvdWxkIGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgfTtcblxuICBEcm9wZG93bi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZW1vdmUgdGhlIGRyb3Bkb3duIGZyb20gdGhlIERPTVxuICAgIHRoaXMuJGRyb3Bkb3duLnJlbW92ZSgpO1xuICB9O1xuXG4gIHJldHVybiBEcm9wZG93bjtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZHJvcGRvd24vc2VhcmNoJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICBmdW5jdGlvbiBTZWFyY2ggKCkgeyB9XG5cbiAgU2VhcmNoLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdmFyICRyZW5kZXJlZCA9IGRlY29yYXRlZC5jYWxsKHRoaXMpO1xuICAgIHZhciBzZWFyY2hMYWJlbCA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldCgnc2VhcmNoJyk7XG5cbiAgICB2YXIgJHNlYXJjaCA9ICQoXG4gICAgICAnPHNwYW4gY2xhc3M9XCJzZWxlY3QyLXNlYXJjaCBzZWxlY3QyLXNlYXJjaC0tZHJvcGRvd25cIj4nICtcbiAgICAgICAgJzxpbnB1dCBjbGFzcz1cInNlbGVjdDItc2VhcmNoX19maWVsZFwiIHR5cGU9XCJzZWFyY2hcIiB0YWJpbmRleD1cIi0xXCInICtcbiAgICAgICAgJyBhdXRvY29ycmVjdD1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwibm9uZVwiJyArXG4gICAgICAgICcgc3BlbGxjaGVjaz1cImZhbHNlXCIgcm9sZT1cInNlYXJjaGJveFwiIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiIC8+JyArXG4gICAgICAnPC9zcGFuPidcbiAgICApO1xuXG4gICAgdGhpcy4kc2VhcmNoQ29udGFpbmVyID0gJHNlYXJjaDtcbiAgICB0aGlzLiRzZWFyY2ggPSAkc2VhcmNoLmZpbmQoJ2lucHV0Jyk7XG5cbiAgICB0aGlzLiRzZWFyY2gucHJvcCgnYXV0b2NvbXBsZXRlJywgdGhpcy5vcHRpb25zLmdldCgnYXV0b2NvbXBsZXRlJykpO1xuICAgIHRoaXMuJHNlYXJjaC5hdHRyKCdhcmlhLWxhYmVsJywgc2VhcmNoTGFiZWwoKSk7XG5cbiAgICAkcmVuZGVyZWQucHJlcGVuZCgkc2VhcmNoKTtcblxuICAgIHJldHVybiAkcmVuZGVyZWQ7XG4gIH07XG5cbiAgU2VhcmNoLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHJlc3VsdHNJZCA9IGNvbnRhaW5lci5pZCArICctcmVzdWx0cyc7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdrZXlwcmVzcycsIGV2dCk7XG5cbiAgICAgIHNlbGYuX2tleVVwUHJldmVudGVkID0gZXZ0LmlzRGVmYXVsdFByZXZlbnRlZCgpO1xuICAgIH0pO1xuXG4gICAgLy8gV29ya2Fyb3VuZCBmb3IgYnJvd3NlcnMgd2hpY2ggZG8gbm90IHN1cHBvcnQgdGhlIGBpbnB1dGAgZXZlbnRcbiAgICAvLyBUaGlzIHdpbGwgcHJldmVudCBkb3VibGUtdHJpZ2dlcmluZyBvZiBldmVudHMgZm9yIGJyb3dzZXJzIHdoaWNoIHN1cHBvcnRcbiAgICAvLyBib3RoIHRoZSBga2V5dXBgIGFuZCBgaW5wdXRgIGV2ZW50cy5cbiAgICB0aGlzLiRzZWFyY2gub24oJ2lucHV0JywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgLy8gVW5iaW5kIHRoZSBkdXBsaWNhdGVkIGBrZXl1cGAgZXZlbnRcbiAgICAgICQodGhpcykub2ZmKCdrZXl1cCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoLm9uKCdrZXl1cCBpbnB1dCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIHNlbGYuaGFuZGxlU2VhcmNoKGV2dCk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRzZWFyY2guYXR0cigndGFiaW5kZXgnLCAwKTtcbiAgICAgIHNlbGYuJHNlYXJjaC5hdHRyKCdhcmlhLWNvbnRyb2xzJywgcmVzdWx0c0lkKTtcblxuICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICB9LCAwKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRzZWFyY2guYXR0cigndGFiaW5kZXgnLCAtMSk7XG4gICAgICBzZWxmLiRzZWFyY2gucmVtb3ZlQXR0cignYXJpYS1jb250cm9scycpO1xuICAgICAgc2VsZi4kc2VhcmNoLnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuXG4gICAgICBzZWxmLiRzZWFyY2gudmFsKCcnKTtcbiAgICAgIHNlbGYuJHNlYXJjaC50cmlnZ2VyKCdibHVyJyk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2ZvY3VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFjb250YWluZXIuaXNPcGVuKCkpIHtcbiAgICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6YWxsJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcy5xdWVyeS50ZXJtID09IG51bGwgfHwgcGFyYW1zLnF1ZXJ5LnRlcm0gPT09ICcnKSB7XG4gICAgICAgIHZhciBzaG93U2VhcmNoID0gc2VsZi5zaG93U2VhcmNoKHBhcmFtcyk7XG5cbiAgICAgICAgaWYgKHNob3dTZWFyY2gpIHtcbiAgICAgICAgICBzZWxmLiRzZWFyY2hDb250YWluZXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1zZWFyY2gtLWhpZGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLiRzZWFyY2hDb250YWluZXJbMF0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0Mi1zZWFyY2gtLWhpZGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdyZXN1bHRzOmZvY3VzJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcy5kYXRhLl9yZXN1bHRJZCkge1xuICAgICAgICBzZWxmLiRzZWFyY2guYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgcGFyYW1zLmRhdGEuX3Jlc3VsdElkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuJHNlYXJjaC5yZW1vdmVBdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLmhhbmRsZVNlYXJjaCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICBpZiAoIXRoaXMuX2tleVVwUHJldmVudGVkKSB7XG4gICAgICB2YXIgaW5wdXQgPSB0aGlzLiRzZWFyY2gudmFsKCk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcigncXVlcnknLCB7XG4gICAgICAgIHRlcm06IGlucHV0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9rZXlVcFByZXZlbnRlZCA9IGZhbHNlO1xuICB9O1xuXG4gIFNlYXJjaC5wcm90b3R5cGUuc2hvd1NlYXJjaCA9IGZ1bmN0aW9uIChfLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gU2VhcmNoO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bi9oaWRlUGxhY2Vob2xkZXInLFtcblxuXSwgZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBIaWRlUGxhY2Vob2xkZXIgKGRlY29yYXRlZCwgJGVsZW1lbnQsIG9wdGlvbnMsIGRhdGFBZGFwdGVyKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMubm9ybWFsaXplUGxhY2Vob2xkZXIob3B0aW9ucy5nZXQoJ3BsYWNlaG9sZGVyJykpO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgJGVsZW1lbnQsIG9wdGlvbnMsIGRhdGFBZGFwdGVyKTtcbiAgfVxuXG4gIEhpZGVQbGFjZWhvbGRlci5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgZGF0YSkge1xuICAgIGRhdGEucmVzdWx0cyA9IHRoaXMucmVtb3ZlUGxhY2Vob2xkZXIoZGF0YS5yZXN1bHRzKTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsIGRhdGEpO1xuICB9O1xuXG4gIEhpZGVQbGFjZWhvbGRlci5wcm90b3R5cGUubm9ybWFsaXplUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiAoXywgcGxhY2Vob2xkZXIpIHtcbiAgICBpZiAodHlwZW9mIHBsYWNlaG9sZGVyID09PSAnc3RyaW5nJykge1xuICAgICAgcGxhY2Vob2xkZXIgPSB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgdGV4dDogcGxhY2Vob2xkZXJcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICB9O1xuXG4gIEhpZGVQbGFjZWhvbGRlci5wcm90b3R5cGUucmVtb3ZlUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiAoXywgZGF0YSkge1xuICAgIHZhciBtb2RpZmllZERhdGEgPSBkYXRhLnNsaWNlKDApO1xuXG4gICAgZm9yICh2YXIgZCA9IGRhdGEubGVuZ3RoIC0gMTsgZCA+PSAwOyBkLS0pIHtcbiAgICAgIHZhciBpdGVtID0gZGF0YVtkXTtcblxuICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXIuaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgbW9kaWZpZWREYXRhLnNwbGljZShkLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbW9kaWZpZWREYXRhO1xuICB9O1xuXG4gIHJldHVybiBIaWRlUGxhY2Vob2xkZXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2Ryb3Bkb3duL2luZmluaXRlU2Nyb2xsJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICBmdW5jdGlvbiBJbmZpbml0ZVNjcm9sbCAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucywgZGF0YUFkYXB0ZXIpIHtcbiAgICB0aGlzLmxhc3RQYXJhbXMgPSB7fTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zLCBkYXRhQWRhcHRlcik7XG5cbiAgICB0aGlzLiRsb2FkaW5nTW9yZSA9IHRoaXMuY3JlYXRlTG9hZGluZ01vcmUoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBkYXRhKSB7XG4gICAgdGhpcy4kbG9hZGluZ01vcmUucmVtb3ZlKCk7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBkYXRhKTtcblxuICAgIGlmICh0aGlzLnNob3dMb2FkaW5nTW9yZShkYXRhKSkge1xuICAgICAgdGhpcy4kcmVzdWx0cy5hcHBlbmQodGhpcy4kbG9hZGluZ01vcmUpO1xuICAgICAgdGhpcy5sb2FkTW9yZUlmTmVlZGVkKCk7XG4gICAgfVxuICB9O1xuXG4gIEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgY29udGFpbmVyLCAkY29udGFpbmVyKTtcblxuICAgIGNvbnRhaW5lci5vbigncXVlcnknLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLmxhc3RQYXJhbXMgPSBwYXJhbXM7XG4gICAgICBzZWxmLmxvYWRpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdxdWVyeTphcHBlbmQnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLmxhc3RQYXJhbXMgPSBwYXJhbXM7XG4gICAgICBzZWxmLmxvYWRpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kcmVzdWx0cy5vbignc2Nyb2xsJywgdGhpcy5sb2FkTW9yZUlmTmVlZGVkLmJpbmQodGhpcykpO1xuICB9O1xuXG4gIEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZS5sb2FkTW9yZUlmTmVlZGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpc0xvYWRNb3JlVmlzaWJsZSA9ICQuY29udGFpbnMoXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICB0aGlzLiRsb2FkaW5nTW9yZVswXVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8ICFpc0xvYWRNb3JlVmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50T2Zmc2V0ID0gdGhpcy4kcmVzdWx0cy5vZmZzZXQoKS50b3AgK1xuICAgICAgdGhpcy4kcmVzdWx0cy5vdXRlckhlaWdodChmYWxzZSk7XG4gICAgdmFyIGxvYWRpbmdNb3JlT2Zmc2V0ID0gdGhpcy4kbG9hZGluZ01vcmUub2Zmc2V0KCkudG9wICtcbiAgICAgIHRoaXMuJGxvYWRpbmdNb3JlLm91dGVySGVpZ2h0KGZhbHNlKTtcblxuICAgIGlmIChjdXJyZW50T2Zmc2V0ICsgNTAgPj0gbG9hZGluZ01vcmVPZmZzZXQpIHtcbiAgICAgIHRoaXMubG9hZE1vcmUoKTtcbiAgICB9XG4gIH07XG5cbiAgSW5maW5pdGVTY3JvbGwucHJvdG90eXBlLmxvYWRNb3JlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICB2YXIgcGFyYW1zID0gJC5leHRlbmQoe30sIHtwYWdlOiAxfSwgdGhpcy5sYXN0UGFyYW1zKTtcblxuICAgIHBhcmFtcy5wYWdlKys7XG5cbiAgICB0aGlzLnRyaWdnZXIoJ3F1ZXJ5OmFwcGVuZCcsIHBhcmFtcyk7XG4gIH07XG5cbiAgSW5maW5pdGVTY3JvbGwucHJvdG90eXBlLnNob3dMb2FkaW5nTW9yZSA9IGZ1bmN0aW9uIChfLCBkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEucGFnaW5hdGlvbiAmJiBkYXRhLnBhZ2luYXRpb24ubW9yZTtcbiAgfTtcblxuICBJbmZpbml0ZVNjcm9sbC5wcm90b3R5cGUuY3JlYXRlTG9hZGluZ01vcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRvcHRpb24gPSAkKFxuICAgICAgJzxsaSAnICtcbiAgICAgICdjbGFzcz1cInNlbGVjdDItcmVzdWx0c19fb3B0aW9uIHNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1sb2FkLW1vcmVcIicgK1xuICAgICAgJ3JvbGU9XCJvcHRpb25cIiBhcmlhLWRpc2FibGVkPVwidHJ1ZVwiPjwvbGk+J1xuICAgICk7XG5cbiAgICB2YXIgbWVzc2FnZSA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldCgnbG9hZGluZ01vcmUnKTtcblxuICAgICRvcHRpb24uaHRtbChtZXNzYWdlKHRoaXMubGFzdFBhcmFtcykpO1xuXG4gICAgcmV0dXJuICRvcHRpb247XG4gIH07XG5cbiAgcmV0dXJuIEluZmluaXRlU2Nyb2xsO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bi9hdHRhY2hCb2R5JyxbXG4gICdqcXVlcnknLFxuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgVXRpbHMpIHtcbiAgZnVuY3Rpb24gQXR0YWNoQm9keSAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGRyb3Bkb3duUGFyZW50ID0gJChvcHRpb25zLmdldCgnZHJvcGRvd25QYXJlbnQnKSB8fCBkb2N1bWVudC5ib2R5KTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgY29udGFpbmVyLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5fc2hvd0Ryb3Bkb3duKCk7XG4gICAgICBzZWxmLl9hdHRhY2hQb3NpdGlvbmluZ0hhbmRsZXIoY29udGFpbmVyKTtcblxuICAgICAgLy8gTXVzdCBiaW5kIGFmdGVyIHRoZSByZXN1bHRzIGhhbmRsZXJzIHRvIGVuc3VyZSBjb3JyZWN0IHNpemluZ1xuICAgICAgc2VsZi5fYmluZENvbnRhaW5lclJlc3VsdEhhbmRsZXJzKGNvbnRhaW5lcik7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5faGlkZURyb3Bkb3duKCk7XG4gICAgICBzZWxmLl9kZXRhY2hQb3NpdGlvbmluZ0hhbmRsZXIoY29udGFpbmVyKTtcbiAgICB9KTtcblxuICAgIHRoaXMuJGRyb3Bkb3duQ29udGFpbmVyLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgQXR0YWNoQm9keS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQpIHtcbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuJGRyb3Bkb3duQ29udGFpbmVyLnJlbW92ZSgpO1xuICB9O1xuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLnBvc2l0aW9uID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgJGRyb3Bkb3duLCAkY29udGFpbmVyKSB7XG4gICAgLy8gQ2xvbmUgYWxsIG9mIHRoZSBjb250YWluZXIgY2xhc3Nlc1xuICAgICRkcm9wZG93bi5hdHRyKCdjbGFzcycsICRjb250YWluZXIuYXR0cignY2xhc3MnKSk7XG5cbiAgICAkZHJvcGRvd25bMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0MicpO1xuICAgICRkcm9wZG93blswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpO1xuXG4gICAgJGRyb3Bkb3duLmNzcyh7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogLTk5OTk5OVxuICAgIH0pO1xuXG4gICAgdGhpcy4kY29udGFpbmVyID0gJGNvbnRhaW5lcjtcbiAgfTtcblxuICBBdHRhY2hCb2R5LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdmFyICRjb250YWluZXIgPSAkKCc8c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICB2YXIgJGRyb3Bkb3duID0gZGVjb3JhdGVkLmNhbGwodGhpcyk7XG4gICAgJGNvbnRhaW5lci5hcHBlbmQoJGRyb3Bkb3duKTtcblxuICAgIHRoaXMuJGRyb3Bkb3duQ29udGFpbmVyID0gJGNvbnRhaW5lcjtcblxuICAgIHJldHVybiAkY29udGFpbmVyO1xuICB9O1xuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLl9oaWRlRHJvcGRvd24gPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdGhpcy4kZHJvcGRvd25Db250YWluZXIuZGV0YWNoKCk7XG4gIH07XG5cbiAgQXR0YWNoQm9keS5wcm90b3R5cGUuX2JpbmRDb250YWluZXJSZXN1bHRIYW5kbGVycyA9XG4gICAgICBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIpIHtcblxuICAgIC8vIFRoZXNlIHNob3VsZCBvbmx5IGJlIGJvdW5kIG9uY2VcbiAgICBpZiAodGhpcy5fY29udGFpbmVyUmVzdWx0c0hhbmRsZXJzQm91bmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6YWxsJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5fcG9zaXRpb25Ecm9wZG93bigpO1xuICAgICAgc2VsZi5fcmVzaXplRHJvcGRvd24oKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncmVzdWx0czphcHBlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9wb3NpdGlvbkRyb3Bkb3duKCk7XG4gICAgICBzZWxmLl9yZXNpemVEcm9wZG93bigpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdyZXN1bHRzOm1lc3NhZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9wb3NpdGlvbkRyb3Bkb3duKCk7XG4gICAgICBzZWxmLl9yZXNpemVEcm9wZG93bigpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9wb3NpdGlvbkRyb3Bkb3duKCk7XG4gICAgICBzZWxmLl9yZXNpemVEcm9wZG93bigpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCd1bnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuX3Bvc2l0aW9uRHJvcGRvd24oKTtcbiAgICAgIHNlbGYuX3Jlc2l6ZURyb3Bkb3duKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jb250YWluZXJSZXN1bHRzSGFuZGxlcnNCb3VuZCA9IHRydWU7XG4gIH07XG5cbiAgQXR0YWNoQm9keS5wcm90b3R5cGUuX2F0dGFjaFBvc2l0aW9uaW5nSGFuZGxlciA9XG4gICAgICBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgc2Nyb2xsRXZlbnQgPSAnc2Nyb2xsLnNlbGVjdDIuJyArIGNvbnRhaW5lci5pZDtcbiAgICB2YXIgcmVzaXplRXZlbnQgPSAncmVzaXplLnNlbGVjdDIuJyArIGNvbnRhaW5lci5pZDtcbiAgICB2YXIgb3JpZW50YXRpb25FdmVudCA9ICdvcmllbnRhdGlvbmNoYW5nZS5zZWxlY3QyLicgKyBjb250YWluZXIuaWQ7XG5cbiAgICB2YXIgJHdhdGNoZXJzID0gdGhpcy4kY29udGFpbmVyLnBhcmVudHMoKS5maWx0ZXIoVXRpbHMuaGFzU2Nyb2xsKTtcbiAgICAkd2F0Y2hlcnMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBVdGlscy5TdG9yZURhdGEodGhpcywgJ3NlbGVjdDItc2Nyb2xsLXBvc2l0aW9uJywge1xuICAgICAgICB4OiAkKHRoaXMpLnNjcm9sbExlZnQoKSxcbiAgICAgICAgeTogJCh0aGlzKS5zY3JvbGxUb3AoKVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkd2F0Y2hlcnMub24oc2Nyb2xsRXZlbnQsIGZ1bmN0aW9uIChldikge1xuICAgICAgdmFyIHBvc2l0aW9uID0gVXRpbHMuR2V0RGF0YSh0aGlzLCAnc2VsZWN0Mi1zY3JvbGwtcG9zaXRpb24nKTtcbiAgICAgICQodGhpcykuc2Nyb2xsVG9wKHBvc2l0aW9uLnkpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKHNjcm9sbEV2ZW50ICsgJyAnICsgcmVzaXplRXZlbnQgKyAnICcgKyBvcmllbnRhdGlvbkV2ZW50LFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYuX3Bvc2l0aW9uRHJvcGRvd24oKTtcbiAgICAgIHNlbGYuX3Jlc2l6ZURyb3Bkb3duKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgQXR0YWNoQm9keS5wcm90b3R5cGUuX2RldGFjaFBvc2l0aW9uaW5nSGFuZGxlciA9XG4gICAgICBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIpIHtcbiAgICB2YXIgc2Nyb2xsRXZlbnQgPSAnc2Nyb2xsLnNlbGVjdDIuJyArIGNvbnRhaW5lci5pZDtcbiAgICB2YXIgcmVzaXplRXZlbnQgPSAncmVzaXplLnNlbGVjdDIuJyArIGNvbnRhaW5lci5pZDtcbiAgICB2YXIgb3JpZW50YXRpb25FdmVudCA9ICdvcmllbnRhdGlvbmNoYW5nZS5zZWxlY3QyLicgKyBjb250YWluZXIuaWQ7XG5cbiAgICB2YXIgJHdhdGNoZXJzID0gdGhpcy4kY29udGFpbmVyLnBhcmVudHMoKS5maWx0ZXIoVXRpbHMuaGFzU2Nyb2xsKTtcbiAgICAkd2F0Y2hlcnMub2ZmKHNjcm9sbEV2ZW50KTtcblxuICAgICQod2luZG93KS5vZmYoc2Nyb2xsRXZlbnQgKyAnICcgKyByZXNpemVFdmVudCArICcgJyArIG9yaWVudGF0aW9uRXZlbnQpO1xuICB9O1xuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLl9wb3NpdGlvbkRyb3Bkb3duID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuXG4gICAgdmFyIGlzQ3VycmVudGx5QWJvdmUgPSB0aGlzLiRkcm9wZG93blswXS5jbGFzc0xpc3RcbiAgICAgIC5jb250YWlucygnc2VsZWN0Mi1kcm9wZG93bi0tYWJvdmUnKTtcbiAgICB2YXIgaXNDdXJyZW50bHlCZWxvdyA9IHRoaXMuJGRyb3Bkb3duWzBdLmNsYXNzTGlzdFxuICAgICAgLmNvbnRhaW5zKCdzZWxlY3QyLWRyb3Bkb3duLS1iZWxvdycpO1xuXG4gICAgdmFyIG5ld0RpcmVjdGlvbiA9IG51bGw7XG5cbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy4kY29udGFpbmVyLm9mZnNldCgpO1xuXG4gICAgb2Zmc2V0LmJvdHRvbSA9IG9mZnNldC50b3AgKyB0aGlzLiRjb250YWluZXIub3V0ZXJIZWlnaHQoZmFsc2UpO1xuXG4gICAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICAgIGhlaWdodDogdGhpcy4kY29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKVxuICAgIH07XG5cbiAgICBjb250YWluZXIudG9wID0gb2Zmc2V0LnRvcDtcbiAgICBjb250YWluZXIuYm90dG9tID0gb2Zmc2V0LnRvcCArIGNvbnRhaW5lci5oZWlnaHQ7XG5cbiAgICB2YXIgZHJvcGRvd24gPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMuJGRyb3Bkb3duLm91dGVySGVpZ2h0KGZhbHNlKVxuICAgIH07XG5cbiAgICB2YXIgdmlld3BvcnQgPSB7XG4gICAgICB0b3A6ICR3aW5kb3cuc2Nyb2xsVG9wKCksXG4gICAgICBib3R0b206ICR3aW5kb3cuc2Nyb2xsVG9wKCkgKyAkd2luZG93LmhlaWdodCgpXG4gICAgfTtcblxuICAgIHZhciBlbm91Z2hSb29tQWJvdmUgPSB2aWV3cG9ydC50b3AgPCAob2Zmc2V0LnRvcCAtIGRyb3Bkb3duLmhlaWdodCk7XG4gICAgdmFyIGVub3VnaFJvb21CZWxvdyA9IHZpZXdwb3J0LmJvdHRvbSA+IChvZmZzZXQuYm90dG9tICsgZHJvcGRvd24uaGVpZ2h0KTtcblxuICAgIHZhciBjc3MgPSB7XG4gICAgICBsZWZ0OiBvZmZzZXQubGVmdCxcbiAgICAgIHRvcDogY29udGFpbmVyLmJvdHRvbVxuICAgIH07XG5cbiAgICAvLyBEZXRlcm1pbmUgd2hhdCB0aGUgcGFyZW50IGVsZW1lbnQgaXMgdG8gdXNlIGZvciBjYWxjdWxhdGluZyB0aGUgb2Zmc2V0XG4gICAgdmFyICRvZmZzZXRQYXJlbnQgPSB0aGlzLiRkcm9wZG93blBhcmVudDtcblxuICAgIC8vIEZvciBzdGF0aWNhbGx5IHBvc2l0aW9uZWQgZWxlbWVudHMsIHdlIG5lZWQgdG8gZ2V0IHRoZSBlbGVtZW50XG4gICAgLy8gdGhhdCBpcyBkZXRlcm1pbmluZyB0aGUgb2Zmc2V0XG4gICAgaWYgKCRvZmZzZXRQYXJlbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgJG9mZnNldFBhcmVudCA9ICRvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50KCk7XG4gICAgfVxuXG4gICAgdmFyIHBhcmVudE9mZnNldCA9IHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDBcbiAgICB9O1xuXG4gICAgaWYgKFxuICAgICAgJC5jb250YWlucyhkb2N1bWVudC5ib2R5LCAkb2Zmc2V0UGFyZW50WzBdKSB8fFxuICAgICAgJG9mZnNldFBhcmVudFswXS5pc0Nvbm5lY3RlZFxuICAgICAgKSB7XG4gICAgICBwYXJlbnRPZmZzZXQgPSAkb2Zmc2V0UGFyZW50Lm9mZnNldCgpO1xuICAgIH1cblxuICAgIGNzcy50b3AgLT0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICBjc3MubGVmdCAtPSBwYXJlbnRPZmZzZXQubGVmdDtcblxuICAgIGlmICghaXNDdXJyZW50bHlBYm92ZSAmJiAhaXNDdXJyZW50bHlCZWxvdykge1xuICAgICAgbmV3RGlyZWN0aW9uID0gJ2JlbG93JztcbiAgICB9XG5cbiAgICBpZiAoIWVub3VnaFJvb21CZWxvdyAmJiBlbm91Z2hSb29tQWJvdmUgJiYgIWlzQ3VycmVudGx5QWJvdmUpIHtcbiAgICAgIG5ld0RpcmVjdGlvbiA9ICdhYm92ZSc7XG4gICAgfSBlbHNlIGlmICghZW5vdWdoUm9vbUFib3ZlICYmIGVub3VnaFJvb21CZWxvdyAmJiBpc0N1cnJlbnRseUFib3ZlKSB7XG4gICAgICBuZXdEaXJlY3Rpb24gPSAnYmVsb3cnO1xuICAgIH1cblxuICAgIGlmIChuZXdEaXJlY3Rpb24gPT0gJ2Fib3ZlJyB8fFxuICAgICAgKGlzQ3VycmVudGx5QWJvdmUgJiYgbmV3RGlyZWN0aW9uICE9PSAnYmVsb3cnKSkge1xuICAgICAgY3NzLnRvcCA9IGNvbnRhaW5lci50b3AgLSBwYXJlbnRPZmZzZXQudG9wIC0gZHJvcGRvd24uaGVpZ2h0O1xuICAgIH1cblxuICAgIGlmIChuZXdEaXJlY3Rpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy4kZHJvcGRvd25bMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1kcm9wZG93bi0tYmVsb3cnKTtcbiAgICAgIHRoaXMuJGRyb3Bkb3duWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItZHJvcGRvd24tLWFib3ZlJyk7XG4gICAgICB0aGlzLiRkcm9wZG93blswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWRyb3Bkb3duLS0nICsgbmV3RGlyZWN0aW9uKTtcblxuICAgICAgdGhpcy4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItY29udGFpbmVyLS1iZWxvdycpO1xuICAgICAgdGhpcy4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItY29udGFpbmVyLS1hYm92ZScpO1xuICAgICAgdGhpcy4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItY29udGFpbmVyLS0nICsgbmV3RGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLiRkcm9wZG93bkNvbnRhaW5lci5jc3MoY3NzKTtcbiAgfTtcblxuICBBdHRhY2hCb2R5LnByb3RvdHlwZS5fcmVzaXplRHJvcGRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNzcyA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLiRjb250YWluZXIub3V0ZXJXaWR0aChmYWxzZSkgKyAncHgnXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZ2V0KCdkcm9wZG93bkF1dG9XaWR0aCcpKSB7XG4gICAgICBjc3MubWluV2lkdGggPSBjc3Mud2lkdGg7XG4gICAgICBjc3MucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgY3NzLndpZHRoID0gJ2F1dG8nO1xuICAgIH1cblxuICAgIHRoaXMuJGRyb3Bkb3duLmNzcyhjc3MpO1xuICB9O1xuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLl9zaG93RHJvcGRvd24gPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdGhpcy4kZHJvcGRvd25Db250YWluZXIuYXBwZW5kVG8odGhpcy4kZHJvcGRvd25QYXJlbnQpO1xuXG4gICAgdGhpcy5fcG9zaXRpb25Ecm9wZG93bigpO1xuICAgIHRoaXMuX3Jlc2l6ZURyb3Bkb3duKCk7XG4gIH07XG5cbiAgcmV0dXJuIEF0dGFjaEJvZHk7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2Ryb3Bkb3duL21pbmltdW1SZXN1bHRzRm9yU2VhcmNoJyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gY291bnRSZXN1bHRzIChkYXRhKSB7XG4gICAgdmFyIGNvdW50ID0gMDtcblxuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YS5sZW5ndGg7IGQrKykge1xuICAgICAgdmFyIGl0ZW0gPSBkYXRhW2RdO1xuXG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICBjb3VudCArPSBjb3VudFJlc3VsdHMoaXRlbS5jaGlsZHJlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIE1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIChkZWNvcmF0ZWQsICRlbGVtZW50LCBvcHRpb25zLCBkYXRhQWRhcHRlcikge1xuICAgIHRoaXMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggPSBvcHRpb25zLmdldCgnbWluaW11bVJlc3VsdHNGb3JTZWFyY2gnKTtcblxuICAgIGlmICh0aGlzLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIDwgMCkge1xuICAgICAgdGhpcy5taW5pbXVtUmVzdWx0c0ZvclNlYXJjaCA9IEluZmluaXR5O1xuICAgIH1cblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zLCBkYXRhQWRhcHRlcik7XG4gIH1cblxuICBNaW5pbXVtUmVzdWx0c0ZvclNlYXJjaC5wcm90b3R5cGUuc2hvd1NlYXJjaCA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcykge1xuICAgIGlmIChjb3VudFJlc3VsdHMocGFyYW1zLmRhdGEucmVzdWx0cykgPCB0aGlzLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlY29yYXRlZC5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gIH07XG5cbiAgcmV0dXJuIE1pbmltdW1SZXN1bHRzRm9yU2VhcmNoO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bi9zZWxlY3RPbkNsb3NlJyxbXG4gICcuLi91dGlscydcbl0sIGZ1bmN0aW9uIChVdGlscykge1xuICBmdW5jdGlvbiBTZWxlY3RPbkNsb3NlICgpIHsgfVxuXG4gIFNlbGVjdE9uQ2xvc2UucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgY29udGFpbmVyLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHNlbGYuX2hhbmRsZVNlbGVjdE9uQ2xvc2UocGFyYW1zKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3RPbkNsb3NlLnByb3RvdHlwZS5faGFuZGxlU2VsZWN0T25DbG9zZSA9IGZ1bmN0aW9uIChfLCBwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5vcmlnaW5hbFNlbGVjdDJFdmVudCAhPSBudWxsKSB7XG4gICAgICB2YXIgZXZlbnQgPSBwYXJhbXMub3JpZ2luYWxTZWxlY3QyRXZlbnQ7XG5cbiAgICAgIC8vIERvbid0IHNlbGVjdCBhbiBpdGVtIGlmIHRoZSBjbG9zZSBldmVudCB3YXMgdHJpZ2dlcmVkIGZyb20gYSBzZWxlY3Qgb3JcbiAgICAgIC8vIHVuc2VsZWN0IGV2ZW50XG4gICAgICBpZiAoZXZlbnQuX3R5cGUgPT09ICdzZWxlY3QnIHx8IGV2ZW50Ll90eXBlID09PSAndW5zZWxlY3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgJGhpZ2hsaWdodGVkUmVzdWx0cyA9IHRoaXMuZ2V0SGlnaGxpZ2h0ZWRSZXN1bHRzKCk7XG5cbiAgICAvLyBPbmx5IHNlbGVjdCBoaWdobGlnaHRlZCByZXN1bHRzXG4gICAgaWYgKCRoaWdobGlnaHRlZFJlc3VsdHMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBkYXRhID0gVXRpbHMuR2V0RGF0YSgkaGlnaGxpZ2h0ZWRSZXN1bHRzWzBdLCAnZGF0YScpO1xuXG4gICAgLy8gRG9uJ3QgcmUtc2VsZWN0IGFscmVhZHkgc2VsZWN0ZWQgcmVzdWx0ZVxuICAgIGlmIChcbiAgICAgIChkYXRhLmVsZW1lbnQgIT0gbnVsbCAmJiBkYXRhLmVsZW1lbnQuc2VsZWN0ZWQpIHx8XG4gICAgICAoZGF0YS5lbGVtZW50ID09IG51bGwgJiYgZGF0YS5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoJ3NlbGVjdCcsIHtcbiAgICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBTZWxlY3RPbkNsb3NlO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bi9jbG9zZU9uU2VsZWN0JyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ2xvc2VPblNlbGVjdCAoKSB7IH1cblxuICBDbG9zZU9uU2VsZWN0LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgY29udGFpbmVyLCAkY29udGFpbmVyKTtcblxuICAgIGNvbnRhaW5lci5vbignc2VsZWN0JywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi5fc2VsZWN0VHJpZ2dlcmVkKGV2dCk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Vuc2VsZWN0JywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi5fc2VsZWN0VHJpZ2dlcmVkKGV2dCk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xvc2VPblNlbGVjdC5wcm90b3R5cGUuX3NlbGVjdFRyaWdnZXJlZCA9IGZ1bmN0aW9uIChfLCBldnQpIHtcbiAgICB2YXIgb3JpZ2luYWxFdmVudCA9IGV2dC5vcmlnaW5hbEV2ZW50O1xuXG4gICAgLy8gRG9uJ3QgY2xvc2UgaWYgdGhlIGNvbnRyb2wga2V5IGlzIGJlaW5nIGhlbGRcbiAgICBpZiAob3JpZ2luYWxFdmVudCAmJiAob3JpZ2luYWxFdmVudC5jdHJsS2V5IHx8IG9yaWdpbmFsRXZlbnQubWV0YUtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoJ2Nsb3NlJywge1xuICAgICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWxFdmVudCxcbiAgICAgIG9yaWdpbmFsU2VsZWN0MkV2ZW50OiBldnRcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xvc2VPblNlbGVjdDtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZHJvcGRvd24vZHJvcGRvd25Dc3MnLFtcbiAgJy4uL3V0aWxzJ1xuXSwgZnVuY3Rpb24gKFV0aWxzKSB7XG4gIGZ1bmN0aW9uIERyb3Bkb3duQ1NTICgpIHsgfVxuXG4gIERyb3Bkb3duQ1NTLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdmFyICRkcm9wZG93biA9IGRlY29yYXRlZC5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIGRyb3Bkb3duQ3NzQ2xhc3MgPSB0aGlzLm9wdGlvbnMuZ2V0KCdkcm9wZG93bkNzc0NsYXNzJykgfHwgJyc7XG5cbiAgICBpZiAoZHJvcGRvd25Dc3NDbGFzcy5pbmRleE9mKCc6YWxsOicpICE9PSAtMSkge1xuICAgICAgZHJvcGRvd25Dc3NDbGFzcyA9IGRyb3Bkb3duQ3NzQ2xhc3MucmVwbGFjZSgnOmFsbDonLCAnJyk7XG5cbiAgICAgIFV0aWxzLmNvcHlOb25JbnRlcm5hbENzc0NsYXNzZXMoJGRyb3Bkb3duWzBdLCB0aGlzLiRlbGVtZW50WzBdKTtcbiAgICB9XG5cbiAgICAkZHJvcGRvd24uYWRkQ2xhc3MoZHJvcGRvd25Dc3NDbGFzcyk7XG5cbiAgICByZXR1cm4gJGRyb3Bkb3duO1xuICB9O1xuXG4gIHJldHVybiBEcm9wZG93bkNTUztcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZHJvcGRvd24vdGFnc1NlYXJjaEhpZ2hsaWdodCcsW1xuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoVXRpbHMpIHtcbiAgZnVuY3Rpb24gVGFnc1NlYXJjaEhpZ2hsaWdodCAoKSB7IH1cblxuICBUYWdzU2VhcmNoSGlnaGxpZ2h0LnByb3RvdHlwZS5oaWdobGlnaHRGaXJzdEl0ZW0gPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdmFyICRvcHRpb25zID0gdGhpcy4kcmVzdWx0c1xuICAgIC5maW5kKFxuICAgICAgJy5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZScgK1xuICAgICAgJzpub3QoLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RlZCknXG4gICAgKTtcblxuICAgIGlmICgkb3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgJGZpcnN0T3B0aW9uID0gJG9wdGlvbnMuZmlyc3QoKTtcbiAgICAgIHZhciBkYXRhID0gVXRpbHMuR2V0RGF0YSgkZmlyc3RPcHRpb25bMF0sICdkYXRhJyk7XG4gICAgICB2YXIgZmlyc3RFbGVtZW50ID0gZGF0YS5lbGVtZW50O1xuXG4gICAgICBpZiAoZmlyc3RFbGVtZW50ICYmIGZpcnN0RWxlbWVudC5nZXRBdHRyaWJ1dGUpIHtcbiAgICAgICAgaWYgKGZpcnN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0Mi10YWcnKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgJGZpcnN0T3B0aW9uLnRyaWdnZXIoJ21vdXNlZW50ZXInKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIHJldHVybiBUYWdzU2VhcmNoSGlnaGxpZ2h0O1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9pMThuL2VuJyxbXSxmdW5jdGlvbiAoKSB7XG4gIC8vIEVuZ2xpc2hcbiAgcmV0dXJuIHtcbiAgICBlcnJvckxvYWRpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnVGhlIHJlc3VsdHMgY291bGQgbm90IGJlIGxvYWRlZC4nO1xuICAgIH0sXG4gICAgaW5wdXRUb29Mb25nOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgdmFyIG92ZXJDaGFycyA9IGFyZ3MuaW5wdXQubGVuZ3RoIC0gYXJncy5tYXhpbXVtO1xuXG4gICAgICB2YXIgbWVzc2FnZSA9ICdQbGVhc2UgZGVsZXRlICcgKyBvdmVyQ2hhcnMgKyAnIGNoYXJhY3Rlcic7XG5cbiAgICAgIGlmIChvdmVyQ2hhcnMgIT0gMSkge1xuICAgICAgICBtZXNzYWdlICs9ICdzJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSxcbiAgICBpbnB1dFRvb1Nob3J0OiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgdmFyIHJlbWFpbmluZ0NoYXJzID0gYXJncy5taW5pbXVtIC0gYXJncy5pbnB1dC5sZW5ndGg7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gJ1BsZWFzZSBlbnRlciAnICsgcmVtYWluaW5nQ2hhcnMgKyAnIG9yIG1vcmUgY2hhcmFjdGVycyc7XG5cbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0sXG4gICAgbG9hZGluZ01vcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnTG9hZGluZyBtb3JlIHJlc3VsdHPigKYnO1xuICAgIH0sXG4gICAgbWF4aW11bVNlbGVjdGVkOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnWW91IGNhbiBvbmx5IHNlbGVjdCAnICsgYXJncy5tYXhpbXVtICsgJyBpdGVtJztcblxuICAgICAgaWYgKGFyZ3MubWF4aW11bSAhPSAxKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gJ3MnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9LFxuICAgIG5vUmVzdWx0czogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICdObyByZXN1bHRzIGZvdW5kJztcbiAgICB9LFxuICAgIHNlYXJjaGluZzogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICdTZWFyY2hpbmfigKYnO1xuICAgIH0sXG4gICAgcmVtb3ZlQWxsSXRlbXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnUmVtb3ZlIGFsbCBpdGVtcyc7XG4gICAgfSxcbiAgICByZW1vdmVJdGVtOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJ1JlbW92ZSBpdGVtJztcbiAgICB9LFxuICAgIHNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJ1NlYXJjaCc7XG4gICAgfVxuICB9O1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kZWZhdWx0cycsW1xuICAnanF1ZXJ5JyxcblxuICAnLi9yZXN1bHRzJyxcblxuICAnLi9zZWxlY3Rpb24vc2luZ2xlJyxcbiAgJy4vc2VsZWN0aW9uL211bHRpcGxlJyxcbiAgJy4vc2VsZWN0aW9uL3BsYWNlaG9sZGVyJyxcbiAgJy4vc2VsZWN0aW9uL2FsbG93Q2xlYXInLFxuICAnLi9zZWxlY3Rpb24vc2VhcmNoJyxcbiAgJy4vc2VsZWN0aW9uL3NlbGVjdGlvbkNzcycsXG4gICcuL3NlbGVjdGlvbi9ldmVudFJlbGF5JyxcblxuICAnLi91dGlscycsXG4gICcuL3RyYW5zbGF0aW9uJyxcbiAgJy4vZGlhY3JpdGljcycsXG5cbiAgJy4vZGF0YS9zZWxlY3QnLFxuICAnLi9kYXRhL2FycmF5JyxcbiAgJy4vZGF0YS9hamF4JyxcbiAgJy4vZGF0YS90YWdzJyxcbiAgJy4vZGF0YS90b2tlbml6ZXInLFxuICAnLi9kYXRhL21pbmltdW1JbnB1dExlbmd0aCcsXG4gICcuL2RhdGEvbWF4aW11bUlucHV0TGVuZ3RoJyxcbiAgJy4vZGF0YS9tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoJyxcblxuICAnLi9kcm9wZG93bicsXG4gICcuL2Ryb3Bkb3duL3NlYXJjaCcsXG4gICcuL2Ryb3Bkb3duL2hpZGVQbGFjZWhvbGRlcicsXG4gICcuL2Ryb3Bkb3duL2luZmluaXRlU2Nyb2xsJyxcbiAgJy4vZHJvcGRvd24vYXR0YWNoQm9keScsXG4gICcuL2Ryb3Bkb3duL21pbmltdW1SZXN1bHRzRm9yU2VhcmNoJyxcbiAgJy4vZHJvcGRvd24vc2VsZWN0T25DbG9zZScsXG4gICcuL2Ryb3Bkb3duL2Nsb3NlT25TZWxlY3QnLFxuICAnLi9kcm9wZG93bi9kcm9wZG93bkNzcycsXG4gICcuL2Ryb3Bkb3duL3RhZ3NTZWFyY2hIaWdobGlnaHQnLFxuXG4gICcuL2kxOG4vZW4nXG5dLCBmdW5jdGlvbiAoJCxcblxuICAgICAgICAgICAgIFJlc3VsdHNMaXN0LFxuXG4gICAgICAgICAgICAgU2luZ2xlU2VsZWN0aW9uLCBNdWx0aXBsZVNlbGVjdGlvbiwgUGxhY2Vob2xkZXIsIEFsbG93Q2xlYXIsXG4gICAgICAgICAgICAgU2VsZWN0aW9uU2VhcmNoLCBTZWxlY3Rpb25DU1MsIEV2ZW50UmVsYXksXG5cbiAgICAgICAgICAgICBVdGlscywgVHJhbnNsYXRpb24sIERJQUNSSVRJQ1MsXG5cbiAgICAgICAgICAgICBTZWxlY3REYXRhLCBBcnJheURhdGEsIEFqYXhEYXRhLCBUYWdzLCBUb2tlbml6ZXIsXG4gICAgICAgICAgICAgTWluaW11bUlucHV0TGVuZ3RoLCBNYXhpbXVtSW5wdXRMZW5ndGgsIE1heGltdW1TZWxlY3Rpb25MZW5ndGgsXG5cbiAgICAgICAgICAgICBEcm9wZG93biwgRHJvcGRvd25TZWFyY2gsIEhpZGVQbGFjZWhvbGRlciwgSW5maW5pdGVTY3JvbGwsXG4gICAgICAgICAgICAgQXR0YWNoQm9keSwgTWluaW11bVJlc3VsdHNGb3JTZWFyY2gsIFNlbGVjdE9uQ2xvc2UsIENsb3NlT25TZWxlY3QsXG4gICAgICAgICAgICAgRHJvcGRvd25DU1MsIFRhZ3NTZWFyY2hIaWdobGlnaHQsXG5cbiAgICAgICAgICAgICBFbmdsaXNoVHJhbnNsYXRpb24pIHtcbiAgZnVuY3Rpb24gRGVmYXVsdHMgKCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG4gIERlZmF1bHRzLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLmRhdGFBZGFwdGVyID09IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLmFqYXggIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gQWpheERhdGE7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAhPSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMuZGF0YUFkYXB0ZXIgPSBBcnJheURhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gU2VsZWN0RGF0YTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubWluaW11bUlucHV0TGVuZ3RoID4gMCkge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5kYXRhQWRhcHRlcixcbiAgICAgICAgICBNaW5pbXVtSW5wdXRMZW5ndGhcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubWF4aW11bUlucHV0TGVuZ3RoID4gMCkge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5kYXRhQWRhcHRlcixcbiAgICAgICAgICBNYXhpbXVtSW5wdXRMZW5ndGhcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubWF4aW11bVNlbGVjdGlvbkxlbmd0aCA+IDApIHtcbiAgICAgICAgb3B0aW9ucy5kYXRhQWRhcHRlciA9IFV0aWxzLkRlY29yYXRlKFxuICAgICAgICAgIG9wdGlvbnMuZGF0YUFkYXB0ZXIsXG4gICAgICAgICAgTWF4aW11bVNlbGVjdGlvbkxlbmd0aFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy50YWdzKSB7XG4gICAgICAgIG9wdGlvbnMuZGF0YUFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShvcHRpb25zLmRhdGFBZGFwdGVyLCBUYWdzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMudG9rZW5TZXBhcmF0b3JzICE9IG51bGwgfHwgb3B0aW9ucy50b2tlbml6ZXIgIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5kYXRhQWRhcHRlcixcbiAgICAgICAgICBUb2tlbml6ZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5yZXN1bHRzQWRhcHRlciA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyID0gUmVzdWx0c0xpc3Q7XG5cbiAgICAgIGlmIChvcHRpb25zLmFqYXggIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5yZXN1bHRzQWRhcHRlcixcbiAgICAgICAgICBJbmZpbml0ZVNjcm9sbFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5wbGFjZWhvbGRlciAhPSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMucmVzdWx0c0FkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyLFxuICAgICAgICAgIEhpZGVQbGFjZWhvbGRlclxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5zZWxlY3RPbkNsb3NlKSB7XG4gICAgICAgIG9wdGlvbnMucmVzdWx0c0FkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyLFxuICAgICAgICAgIFNlbGVjdE9uQ2xvc2VcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMudGFncykge1xuICAgICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5yZXN1bHRzQWRhcHRlcixcbiAgICAgICAgICBUYWdzU2VhcmNoSGlnaGxpZ2h0XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID09IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLm11bHRpcGxlKSB7XG4gICAgICAgIG9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID0gRHJvcGRvd247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgU2VhcmNoYWJsZURyb3Bkb3duID0gVXRpbHMuRGVjb3JhdGUoRHJvcGRvd24sIERyb3Bkb3duU2VhcmNoKTtcblxuICAgICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlciA9IFNlYXJjaGFibGVEcm9wZG93bjtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggIT09IDApIHtcbiAgICAgICAgb3B0aW9ucy5kcm9wZG93bkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlcixcbiAgICAgICAgICBNaW5pbXVtUmVzdWx0c0ZvclNlYXJjaFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICAgIG9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5kcm9wZG93bkFkYXB0ZXIsXG4gICAgICAgICAgQ2xvc2VPblNlbGVjdFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzICE9IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5kcm9wZG93bkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlcixcbiAgICAgICAgICBEcm9wZG93bkNTU1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlciA9IFV0aWxzLkRlY29yYXRlKFxuICAgICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlcixcbiAgICAgICAgQXR0YWNoQm9keVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyID09IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLm11bHRpcGxlKSB7XG4gICAgICAgIG9wdGlvbnMuc2VsZWN0aW9uQWRhcHRlciA9IE11bHRpcGxlU2VsZWN0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyID0gU2luZ2xlU2VsZWN0aW9uO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdGhlIHBsYWNlaG9sZGVyIG1peGluIGlmIGEgcGxhY2Vob2xkZXIgd2FzIHNwZWNpZmllZFxuICAgICAgaWYgKG9wdGlvbnMucGxhY2Vob2xkZXIgIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIsXG4gICAgICAgICAgUGxhY2Vob2xkZXJcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuYWxsb3dDbGVhcikge1xuICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIsXG4gICAgICAgICAgQWxsb3dDbGVhclxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5tdWx0aXBsZSkge1xuICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIsXG4gICAgICAgICAgU2VsZWN0aW9uU2VhcmNoXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLnNlbGVjdGlvbkNzc0NsYXNzICE9IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyLFxuICAgICAgICAgIFNlbGVjdGlvbkNTU1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyLFxuICAgICAgICBFdmVudFJlbGF5XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBkZWZhdWx0cyB3ZXJlIG5vdCBwcmV2aW91c2x5IGFwcGxpZWQgZnJvbSBhbiBlbGVtZW50LCBpdCBpc1xuICAgIC8vIHBvc3NpYmxlIGZvciB0aGUgbGFuZ3VhZ2Ugb3B0aW9uIHRvIGhhdmUgbm90IGJlZW4gcmVzb2x2ZWRcbiAgICBvcHRpb25zLmxhbmd1YWdlID0gdGhpcy5fcmVzb2x2ZUxhbmd1YWdlKG9wdGlvbnMubGFuZ3VhZ2UpO1xuXG4gICAgLy8gQWx3YXlzIGZhbGwgYmFjayB0byBFbmdsaXNoIHNpbmNlIGl0IHdpbGwgYWx3YXlzIGJlIGNvbXBsZXRlXG4gICAgb3B0aW9ucy5sYW5ndWFnZS5wdXNoKCdlbicpO1xuXG4gICAgdmFyIHVuaXF1ZUxhbmd1YWdlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgbCA9IDA7IGwgPCBvcHRpb25zLmxhbmd1YWdlLmxlbmd0aDsgbCsrKSB7XG4gICAgICB2YXIgbGFuZ3VhZ2UgPSBvcHRpb25zLmxhbmd1YWdlW2xdO1xuXG4gICAgICBpZiAodW5pcXVlTGFuZ3VhZ2VzLmluZGV4T2YobGFuZ3VhZ2UpID09PSAtMSkge1xuICAgICAgICB1bmlxdWVMYW5ndWFnZXMucHVzaChsYW5ndWFnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0aW9ucy5sYW5ndWFnZSA9IHVuaXF1ZUxhbmd1YWdlcztcblxuICAgIG9wdGlvbnMudHJhbnNsYXRpb25zID0gdGhpcy5fcHJvY2Vzc1RyYW5zbGF0aW9ucyhcbiAgICAgIG9wdGlvbnMubGFuZ3VhZ2UsXG4gICAgICBvcHRpb25zLmRlYnVnXG4gICAgKTtcblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIERlZmF1bHRzLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBzdHJpcERpYWNyaXRpY3MgKHRleHQpIHtcbiAgICAgIC8vIFVzZWQgJ3VuaSByYW5nZSArIG5hbWVkIGZ1bmN0aW9uJyBmcm9tIGh0dHA6Ly9qc3BlcmYuY29tL2RpYWNyaXRpY3MvMThcbiAgICAgIGZ1bmN0aW9uIG1hdGNoKGEpIHtcbiAgICAgICAgcmV0dXJuIERJQUNSSVRJQ1NbYV0gfHwgYTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvW15cXHUwMDAwLVxcdTAwN0VdL2csIG1hdGNoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaGVyIChwYXJhbXMsIGRhdGEpIHtcbiAgICAgIC8vIEFsd2F5cyByZXR1cm4gdGhlIG9iamVjdCBpZiB0aGVyZSBpcyBub3RoaW5nIHRvIGNvbXBhcmVcbiAgICAgIGlmIChwYXJhbXMudGVybSA9PSBudWxsIHx8IHBhcmFtcy50ZXJtLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG5cbiAgICAgIC8vIERvIGEgcmVjdXJzaXZlIGNoZWNrIGZvciBvcHRpb25zIHdpdGggY2hpbGRyZW5cbiAgICAgIGlmIChkYXRhLmNoaWxkcmVuICYmIGRhdGEuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBDbG9uZSB0aGUgZGF0YSBvYmplY3QgaWYgdGhlcmUgYXJlIGNoaWxkcmVuXG4gICAgICAgIC8vIFRoaXMgaXMgcmVxdWlyZWQgYXMgd2UgbW9kaWZ5IHRoZSBvYmplY3QgdG8gcmVtb3ZlIGFueSBub24tbWF0Y2hlc1xuICAgICAgICB2YXIgbWF0Y2ggPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGF0YSk7XG5cbiAgICAgICAgLy8gQ2hlY2sgZWFjaCBjaGlsZCBvZiB0aGUgb3B0aW9uXG4gICAgICAgIGZvciAodmFyIGMgPSBkYXRhLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGMgPj0gMDsgYy0tKSB7XG4gICAgICAgICAgdmFyIGNoaWxkID0gZGF0YS5jaGlsZHJlbltjXTtcblxuICAgICAgICAgIHZhciBtYXRjaGVzID0gbWF0Y2hlcihwYXJhbXMsIGNoaWxkKTtcblxuICAgICAgICAgIC8vIElmIHRoZXJlIHdhc24ndCBhIG1hdGNoLCByZW1vdmUgdGhlIG9iamVjdCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICBpZiAobWF0Y2hlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBtYXRjaC5jaGlsZHJlbi5zcGxpY2UoYywgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYW55IGNoaWxkcmVuIG1hdGNoZWQsIHJldHVybiB0aGUgbmV3IG9iamVjdFxuICAgICAgICBpZiAobWF0Y2guY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIHdlcmUgbm8gbWF0Y2hpbmcgY2hpbGRyZW4sIGNoZWNrIGp1c3QgdGhlIHBsYWluIG9iamVjdFxuICAgICAgICByZXR1cm4gbWF0Y2hlcihwYXJhbXMsIG1hdGNoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9yaWdpbmFsID0gc3RyaXBEaWFjcml0aWNzKGRhdGEudGV4dCkudG9VcHBlckNhc2UoKTtcbiAgICAgIHZhciB0ZXJtID0gc3RyaXBEaWFjcml0aWNzKHBhcmFtcy50ZXJtKS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgdGV4dCBjb250YWlucyB0aGUgdGVybVxuICAgICAgaWYgKG9yaWdpbmFsLmluZGV4T2YodGVybSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQgZG9lc24ndCBjb250YWluIHRoZSB0ZXJtLCBkb24ndCByZXR1cm4gYW55dGhpbmdcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuZGVmYXVsdHMgPSB7XG4gICAgICBhbWRMYW5ndWFnZUJhc2U6ICcuL2kxOG4vJyxcbiAgICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gICAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgZHJvcGRvd25BdXRvV2lkdGg6IGZhbHNlLFxuICAgICAgZXNjYXBlTWFya3VwOiBVdGlscy5lc2NhcGVNYXJrdXAsXG4gICAgICBsYW5ndWFnZToge30sXG4gICAgICBtYXRjaGVyOiBtYXRjaGVyLFxuICAgICAgbWluaW11bUlucHV0TGVuZ3RoOiAwLFxuICAgICAgbWF4aW11bUlucHV0TGVuZ3RoOiAwLFxuICAgICAgbWF4aW11bVNlbGVjdGlvbkxlbmd0aDogMCxcbiAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAwLFxuICAgICAgc2VsZWN0T25DbG9zZTogZmFsc2UsXG4gICAgICBzY3JvbGxBZnRlclNlbGVjdDogZmFsc2UsXG4gICAgICBzb3J0ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlUmVzdWx0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQudGV4dDtcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uLnRleHQ7XG4gICAgICB9LFxuICAgICAgdGhlbWU6ICdkZWZhdWx0JyxcbiAgICAgIHdpZHRoOiAncmVzb2x2ZSdcbiAgICB9O1xuICB9O1xuXG4gIERlZmF1bHRzLnByb3RvdHlwZS5hcHBseUZyb21FbGVtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMsICRlbGVtZW50KSB7XG4gICAgdmFyIG9wdGlvbkxhbmd1YWdlID0gb3B0aW9ucy5sYW5ndWFnZTtcbiAgICB2YXIgZGVmYXVsdExhbmd1YWdlID0gdGhpcy5kZWZhdWx0cy5sYW5ndWFnZTtcbiAgICB2YXIgZWxlbWVudExhbmd1YWdlID0gJGVsZW1lbnQucHJvcCgnbGFuZycpO1xuICAgIHZhciBwYXJlbnRMYW5ndWFnZSA9ICRlbGVtZW50LmNsb3Nlc3QoJ1tsYW5nXScpLnByb3AoJ2xhbmcnKTtcblxuICAgIHZhciBsYW5ndWFnZXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmNhbGwoXG4gICAgICB0aGlzLl9yZXNvbHZlTGFuZ3VhZ2UoZWxlbWVudExhbmd1YWdlKSxcbiAgICAgIHRoaXMuX3Jlc29sdmVMYW5ndWFnZShvcHRpb25MYW5ndWFnZSksXG4gICAgICB0aGlzLl9yZXNvbHZlTGFuZ3VhZ2UoZGVmYXVsdExhbmd1YWdlKSxcbiAgICAgIHRoaXMuX3Jlc29sdmVMYW5ndWFnZShwYXJlbnRMYW5ndWFnZSlcbiAgICApO1xuXG4gICAgb3B0aW9ucy5sYW5ndWFnZSA9IGxhbmd1YWdlcztcblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIERlZmF1bHRzLnByb3RvdHlwZS5fcmVzb2x2ZUxhbmd1YWdlID0gZnVuY3Rpb24gKGxhbmd1YWdlKSB7XG4gICAgaWYgKCFsYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmICgkLmlzRW1wdHlPYmplY3QobGFuZ3VhZ2UpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKCQuaXNQbGFpbk9iamVjdChsYW5ndWFnZSkpIHtcbiAgICAgIHJldHVybiBbbGFuZ3VhZ2VdO1xuICAgIH1cblxuICAgIHZhciBsYW5ndWFnZXM7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobGFuZ3VhZ2UpKSB7XG4gICAgICBsYW5ndWFnZXMgPSBbbGFuZ3VhZ2VdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYW5ndWFnZXMgPSBsYW5ndWFnZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzb2x2ZWRMYW5ndWFnZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbGFuZ3VhZ2VzLmxlbmd0aDsgbCsrKSB7XG4gICAgICByZXNvbHZlZExhbmd1YWdlcy5wdXNoKGxhbmd1YWdlc1tsXSk7XG5cbiAgICAgIGlmICh0eXBlb2YgbGFuZ3VhZ2VzW2xdID09PSAnc3RyaW5nJyAmJiBsYW5ndWFnZXNbbF0uaW5kZXhPZignLScpID4gMCkge1xuICAgICAgICAvLyBFeHRyYWN0IHRoZSByZWdpb24gaW5mb3JtYXRpb24gaWYgaXQgaXMgaW5jbHVkZWRcbiAgICAgICAgdmFyIGxhbmd1YWdlUGFydHMgPSBsYW5ndWFnZXNbbF0uc3BsaXQoJy0nKTtcbiAgICAgICAgdmFyIGJhc2VMYW5ndWFnZSA9IGxhbmd1YWdlUGFydHNbMF07XG5cbiAgICAgICAgcmVzb2x2ZWRMYW5ndWFnZXMucHVzaChiYXNlTGFuZ3VhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXNvbHZlZExhbmd1YWdlcztcbiAgfTtcblxuICBEZWZhdWx0cy5wcm90b3R5cGUuX3Byb2Nlc3NUcmFuc2xhdGlvbnMgPSBmdW5jdGlvbiAobGFuZ3VhZ2VzLCBkZWJ1Zykge1xuICAgIHZhciB0cmFuc2xhdGlvbnMgPSBuZXcgVHJhbnNsYXRpb24oKTtcblxuICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbGFuZ3VhZ2VzLmxlbmd0aDsgbCsrKSB7XG4gICAgICB2YXIgbGFuZ3VhZ2VEYXRhID0gbmV3IFRyYW5zbGF0aW9uKCk7XG5cbiAgICAgIHZhciBsYW5ndWFnZSA9IGxhbmd1YWdlc1tsXTtcblxuICAgICAgaWYgKHR5cGVvZiBsYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUcnkgdG8gbG9hZCBpdCB3aXRoIHRoZSBvcmlnaW5hbCBuYW1lXG4gICAgICAgICAgbGFuZ3VhZ2VEYXRhID0gVHJhbnNsYXRpb24ubG9hZFBhdGgobGFuZ3VhZ2UpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIElmIHdlIGNvdWxkbid0IGxvYWQgaXQsIGNoZWNrIGlmIGl0IHdhc24ndCB0aGUgZnVsbCBwYXRoXG4gICAgICAgICAgICBsYW5ndWFnZSA9IHRoaXMuZGVmYXVsdHMuYW1kTGFuZ3VhZ2VCYXNlICsgbGFuZ3VhZ2U7XG4gICAgICAgICAgICBsYW5ndWFnZURhdGEgPSBUcmFuc2xhdGlvbi5sb2FkUGF0aChsYW5ndWFnZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIC8vIFRoZSB0cmFuc2xhdGlvbiBjb3VsZCBub3QgYmUgbG9hZGVkIGF0IGFsbC4gU29tZXRpbWVzIHRoaXMgaXNcbiAgICAgICAgICAgIC8vIGJlY2F1c2Ugb2YgYSBjb25maWd1cmF0aW9uIHByb2JsZW0sIG90aGVyIHRpbWVzIHRoaXMgY2FuIGJlXG4gICAgICAgICAgICAvLyBiZWNhdXNlIG9mIGhvdyBTZWxlY3QyIGhlbHBzIGxvYWQgYWxsIHBvc3NpYmxlIHRyYW5zbGF0aW9uIGZpbGVzXG4gICAgICAgICAgICBpZiAoZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAnU2VsZWN0MjogVGhlIGxhbmd1YWdlIGZpbGUgZm9yIFwiJyArIGxhbmd1YWdlICsgJ1wiIGNvdWxkICcgK1xuICAgICAgICAgICAgICAgICdub3QgYmUgYXV0b21hdGljYWxseSBsb2FkZWQuIEEgZmFsbGJhY2sgd2lsbCBiZSB1c2VkIGluc3RlYWQuJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgkLmlzUGxhaW5PYmplY3QobGFuZ3VhZ2UpKSB7XG4gICAgICAgIGxhbmd1YWdlRGF0YSA9IG5ldyBUcmFuc2xhdGlvbihsYW5ndWFnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYW5ndWFnZURhdGEgPSBsYW5ndWFnZTtcbiAgICAgIH1cblxuICAgICAgdHJhbnNsYXRpb25zLmV4dGVuZChsYW5ndWFnZURhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2xhdGlvbnM7XG4gIH07XG5cbiAgRGVmYXVsdHMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIGNhbWVsS2V5ID0gJC5jYW1lbENhc2Uoa2V5KTtcblxuICAgIHZhciBkYXRhID0ge307XG4gICAgZGF0YVtjYW1lbEtleV0gPSB2YWx1ZTtcblxuICAgIHZhciBjb252ZXJ0ZWREYXRhID0gVXRpbHMuX2NvbnZlcnREYXRhKGRhdGEpO1xuXG4gICAgJC5leHRlbmQodHJ1ZSwgdGhpcy5kZWZhdWx0cywgY29udmVydGVkRGF0YSk7XG4gIH07XG5cbiAgdmFyIGRlZmF1bHRzID0gbmV3IERlZmF1bHRzKCk7XG5cbiAgcmV0dXJuIGRlZmF1bHRzO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9vcHRpb25zJyxbXG4gICdqcXVlcnknLFxuICAnLi9kZWZhdWx0cycsXG4gICcuL3V0aWxzJ1xuXSwgZnVuY3Rpb24gKCQsIERlZmF1bHRzLCBVdGlscykge1xuICBmdW5jdGlvbiBPcHRpb25zIChvcHRpb25zLCAkZWxlbWVudCkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBpZiAoJGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5mcm9tRWxlbWVudCgkZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKCRlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IERlZmF1bHRzLmFwcGx5RnJvbUVsZW1lbnQodGhpcy5vcHRpb25zLCAkZWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gRGVmYXVsdHMuYXBwbHkodGhpcy5vcHRpb25zKTtcbiAgfVxuXG4gIE9wdGlvbnMucHJvdG90eXBlLmZyb21FbGVtZW50ID0gZnVuY3Rpb24gKCRlKSB7XG4gICAgdmFyIGV4Y2x1ZGVkRGF0YSA9IFsnc2VsZWN0MiddO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tdWx0aXBsZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubXVsdGlwbGUgPSAkZS5wcm9wKCdtdWx0aXBsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZWQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5vcHRpb25zLmRpc2FibGVkID0gJGUucHJvcCgnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9jb21wbGV0ZSA9PSBudWxsICYmICRlLnByb3AoJ2F1dG9jb21wbGV0ZScpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYXV0b2NvbXBsZXRlID0gJGUucHJvcCgnYXV0b2NvbXBsZXRlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXIgPT0gbnVsbCkge1xuICAgICAgaWYgKCRlLnByb3AoJ2RpcicpKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXIgPSAkZS5wcm9wKCdkaXInKTtcbiAgICAgIH0gZWxzZSBpZiAoJGUuY2xvc2VzdCgnW2Rpcl0nKS5wcm9wKCdkaXInKSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZGlyID0gJGUuY2xvc2VzdCgnW2Rpcl0nKS5wcm9wKCdkaXInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXIgPSAnbHRyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkZS5wcm9wKCdkaXNhYmxlZCcsIHRoaXMub3B0aW9ucy5kaXNhYmxlZCk7XG4gICAgJGUucHJvcCgnbXVsdGlwbGUnLCB0aGlzLm9wdGlvbnMubXVsdGlwbGUpO1xuXG4gICAgaWYgKFV0aWxzLkdldERhdGEoJGVbMF0sICdzZWxlY3QyVGFncycpKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgJ1NlbGVjdDI6IFRoZSBgZGF0YS1zZWxlY3QyLXRhZ3NgIGF0dHJpYnV0ZSBoYXMgYmVlbiBjaGFuZ2VkIHRvICcgK1xuICAgICAgICAgICd1c2UgdGhlIGBkYXRhLWRhdGFgIGFuZCBgZGF0YS10YWdzPVwidHJ1ZVwiYCBhdHRyaWJ1dGVzIGFuZCB3aWxsIGJlICcgK1xuICAgICAgICAgICdyZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9ucyBvZiBTZWxlY3QyLidcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgVXRpbHMuU3RvcmVEYXRhKCRlWzBdLCAnZGF0YScsIFV0aWxzLkdldERhdGEoJGVbMF0sICdzZWxlY3QyVGFncycpKTtcbiAgICAgIFV0aWxzLlN0b3JlRGF0YSgkZVswXSwgJ3RhZ3MnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoVXRpbHMuR2V0RGF0YSgkZVswXSwgJ2FqYXhVcmwnKSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdTZWxlY3QyOiBUaGUgYGRhdGEtYWpheC11cmxgIGF0dHJpYnV0ZSBoYXMgYmVlbiBjaGFuZ2VkIHRvICcgK1xuICAgICAgICAgICdgZGF0YS1hamF4LS11cmxgIGFuZCBzdXBwb3J0IGZvciB0aGUgb2xkIGF0dHJpYnV0ZSB3aWxsIGJlIHJlbW92ZWQnICtcbiAgICAgICAgICAnIGluIGZ1dHVyZSB2ZXJzaW9ucyBvZiBTZWxlY3QyLidcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgJGUuYXR0cignYWpheC0tdXJsJywgVXRpbHMuR2V0RGF0YSgkZVswXSwgJ2FqYXhVcmwnKSk7XG4gICAgICBVdGlscy5TdG9yZURhdGEoJGVbMF0sICdhamF4LVVybCcsIFV0aWxzLkdldERhdGEoJGVbMF0sICdhamF4VXJsJykpO1xuICAgIH1cblxuICAgIHZhciBkYXRhc2V0ID0ge307XG5cbiAgICBmdW5jdGlvbiB1cHBlckNhc2VMZXR0ZXIoXywgbGV0dGVyKSB7XG4gICAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLy8gUHJlLWxvYWQgYWxsIG9mIHRoZSBhdHRyaWJ1dGVzIHdoaWNoIGFyZSBwcmVmaXhlZCB3aXRoIGBkYXRhLWBcbiAgICBmb3IgKHZhciBhdHRyID0gMDsgYXR0ciA8ICRlWzBdLmF0dHJpYnV0ZXMubGVuZ3RoOyBhdHRyKyspIHtcbiAgICAgIHZhciBhdHRyaWJ1dGVOYW1lID0gJGVbMF0uYXR0cmlidXRlc1thdHRyXS5uYW1lO1xuICAgICAgdmFyIHByZWZpeCA9ICdkYXRhLSc7XG5cbiAgICAgIGlmIChhdHRyaWJ1dGVOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBjb250ZW50cyBvZiB0aGUgYXR0cmlidXRlIGFmdGVyIGBkYXRhLWBcbiAgICAgICAgdmFyIGRhdGFOYW1lID0gYXR0cmlidXRlTmFtZS5zdWJzdHJpbmcocHJlZml4Lmxlbmd0aCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBkYXRhIGNvbnRlbnRzIGZyb20gdGhlIGNvbnNpc3RlbnQgc291cmNlXG4gICAgICAgIC8vIFRoaXMgaXMgbW9yZSB0aGFuIGxpa2VseSB0aGUgalF1ZXJ5IGRhdGEgaGVscGVyXG4gICAgICAgIHZhciBkYXRhVmFsdWUgPSBVdGlscy5HZXREYXRhKCRlWzBdLCBkYXRhTmFtZSk7XG5cbiAgICAgICAgLy8gY2FtZWxDYXNlIHRoZSBhdHRyaWJ1dGUgbmFtZSB0byBtYXRjaCB0aGUgc3BlY1xuICAgICAgICB2YXIgY2FtZWxEYXRhTmFtZSA9IGRhdGFOYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIHVwcGVyQ2FzZUxldHRlcik7XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIGRhdGEgYXR0cmlidXRlIGNvbnRlbnRzIGludG8gdGhlIGRhdGFzZXQgc2luY2VcbiAgICAgICAgZGF0YXNldFtjYW1lbERhdGFOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcmVmZXIgdGhlIGVsZW1lbnQncyBgZGF0YXNldGAgYXR0cmlidXRlIGlmIGl0IGV4aXN0c1xuICAgIC8vIGpRdWVyeSAxLnggZG9lcyBub3QgY29ycmVjdGx5IGhhbmRsZSBkYXRhIGF0dHJpYnV0ZXMgd2l0aCBtdWx0aXBsZSBkYXNoZXNcbiAgICBpZiAoJC5mbi5qcXVlcnkgJiYgJC5mbi5qcXVlcnkuc3Vic3RyKDAsIDIpID09ICcxLicgJiYgJGVbMF0uZGF0YXNldCkge1xuICAgICAgZGF0YXNldCA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkZVswXS5kYXRhc2V0LCBkYXRhc2V0KTtcbiAgICB9XG5cbiAgICAvLyBQcmVmZXIgb3VyIGludGVybmFsIGRhdGEgY2FjaGUgaWYgaXQgZXhpc3RzXG4gICAgdmFyIGRhdGEgPSAkLmV4dGVuZCh0cnVlLCB7fSwgVXRpbHMuR2V0RGF0YSgkZVswXSksIGRhdGFzZXQpO1xuXG4gICAgZGF0YSA9IFV0aWxzLl9jb252ZXJ0RGF0YShkYXRhKTtcblxuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICBpZiAoZXhjbHVkZWREYXRhLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoJC5pc1BsYWluT2JqZWN0KHRoaXMub3B0aW9uc1trZXldKSkge1xuICAgICAgICAkLmV4dGVuZCh0aGlzLm9wdGlvbnNba2V5XSwgZGF0YVtrZXldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIE9wdGlvbnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zW2tleV07XG4gIH07XG5cbiAgT3B0aW9ucy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgdGhpcy5vcHRpb25zW2tleV0gPSB2YWw7XG4gIH07XG5cbiAgcmV0dXJuIE9wdGlvbnM7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2NvcmUnLFtcbiAgJ2pxdWVyeScsXG4gICcuL29wdGlvbnMnLFxuICAnLi91dGlscycsXG4gICcuL2tleXMnXG5dLCBmdW5jdGlvbiAoJCwgT3B0aW9ucywgVXRpbHMsIEtFWVMpIHtcbiAgdmFyIFNlbGVjdDIgPSBmdW5jdGlvbiAoJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBpZiAoVXRpbHMuR2V0RGF0YSgkZWxlbWVudFswXSwgJ3NlbGVjdDInKSAhPSBudWxsKSB7XG4gICAgICBVdGlscy5HZXREYXRhKCRlbGVtZW50WzBdLCAnc2VsZWN0MicpLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICB0aGlzLmlkID0gdGhpcy5fZ2VuZXJhdGVJZCgkZWxlbWVudCk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMub3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMsICRlbGVtZW50KTtcblxuICAgIFNlbGVjdDIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG5cbiAgICAvLyBTZXQgdXAgdGhlIHRhYmluZGV4XG5cbiAgICB2YXIgdGFiaW5kZXggPSAkZWxlbWVudC5hdHRyKCd0YWJpbmRleCcpIHx8IDA7XG4gICAgVXRpbHMuU3RvcmVEYXRhKCRlbGVtZW50WzBdLCAnb2xkLXRhYmluZGV4JywgdGFiaW5kZXgpO1xuICAgICRlbGVtZW50LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG5cbiAgICAvLyBTZXQgdXAgY29udGFpbmVycyBhbmQgYWRhcHRlcnNcblxuICAgIHZhciBEYXRhQWRhcHRlciA9IHRoaXMub3B0aW9ucy5nZXQoJ2RhdGFBZGFwdGVyJyk7XG4gICAgdGhpcy5kYXRhQWRhcHRlciA9IG5ldyBEYXRhQWRhcHRlcigkZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcblxuICAgIHZhciAkY29udGFpbmVyID0gdGhpcy5yZW5kZXIoKTtcblxuICAgIHRoaXMuX3BsYWNlQ29udGFpbmVyKCRjb250YWluZXIpO1xuXG4gICAgdmFyIFNlbGVjdGlvbkFkYXB0ZXIgPSB0aGlzLm9wdGlvbnMuZ2V0KCdzZWxlY3Rpb25BZGFwdGVyJyk7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uQWRhcHRlcigkZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLiRzZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZW5kZXIoKTtcblxuICAgIHRoaXMuc2VsZWN0aW9uLnBvc2l0aW9uKHRoaXMuJHNlbGVjdGlvbiwgJGNvbnRhaW5lcik7XG5cbiAgICB2YXIgRHJvcGRvd25BZGFwdGVyID0gdGhpcy5vcHRpb25zLmdldCgnZHJvcGRvd25BZGFwdGVyJyk7XG4gICAgdGhpcy5kcm9wZG93biA9IG5ldyBEcm9wZG93bkFkYXB0ZXIoJGVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy4kZHJvcGRvd24gPSB0aGlzLmRyb3Bkb3duLnJlbmRlcigpO1xuXG4gICAgdGhpcy5kcm9wZG93bi5wb3NpdGlvbih0aGlzLiRkcm9wZG93biwgJGNvbnRhaW5lcik7XG5cbiAgICB2YXIgUmVzdWx0c0FkYXB0ZXIgPSB0aGlzLm9wdGlvbnMuZ2V0KCdyZXN1bHRzQWRhcHRlcicpO1xuICAgIHRoaXMucmVzdWx0cyA9IG5ldyBSZXN1bHRzQWRhcHRlcigkZWxlbWVudCwgdGhpcy5vcHRpb25zLCB0aGlzLmRhdGFBZGFwdGVyKTtcbiAgICB0aGlzLiRyZXN1bHRzID0gdGhpcy5yZXN1bHRzLnJlbmRlcigpO1xuXG4gICAgdGhpcy5yZXN1bHRzLnBvc2l0aW9uKHRoaXMuJHJlc3VsdHMsIHRoaXMuJGRyb3Bkb3duKTtcblxuICAgIC8vIEJpbmQgZXZlbnRzXG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBCaW5kIHRoZSBjb250YWluZXIgdG8gYWxsIG9mIHRoZSBhZGFwdGVyc1xuICAgIHRoaXMuX2JpbmRBZGFwdGVycygpO1xuXG4gICAgLy8gUmVnaXN0ZXIgYW55IERPTSBldmVudCBoYW5kbGVyc1xuICAgIHRoaXMuX3JlZ2lzdGVyRG9tRXZlbnRzKCk7XG5cbiAgICAvLyBSZWdpc3RlciBhbnkgaW50ZXJuYWwgZXZlbnQgaGFuZGxlcnNcbiAgICB0aGlzLl9yZWdpc3RlckRhdGFFdmVudHMoKTtcbiAgICB0aGlzLl9yZWdpc3RlclNlbGVjdGlvbkV2ZW50cygpO1xuICAgIHRoaXMuX3JlZ2lzdGVyRHJvcGRvd25FdmVudHMoKTtcbiAgICB0aGlzLl9yZWdpc3RlclJlc3VsdHNFdmVudHMoKTtcbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50cygpO1xuXG4gICAgLy8gU2V0IHRoZSBpbml0aWFsIHN0YXRlXG4gICAgdGhpcy5kYXRhQWRhcHRlci5jdXJyZW50KGZ1bmN0aW9uIChpbml0aWFsRGF0YSkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdzZWxlY3Rpb246dXBkYXRlJywge1xuICAgICAgICBkYXRhOiBpbml0aWFsRGF0YVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBIaWRlIHRoZSBvcmlnaW5hbCBzZWxlY3RcbiAgICAkZWxlbWVudFswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlJyk7XG4gICAgJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgLy8gU3luY2hyb25pemUgYW55IG1vbml0b3JlZCBhdHRyaWJ1dGVzXG4gICAgdGhpcy5fc3luY0F0dHJpYnV0ZXMoKTtcblxuICAgIFV0aWxzLlN0b3JlRGF0YSgkZWxlbWVudFswXSwgJ3NlbGVjdDInLCB0aGlzKTtcblxuICAgIC8vIEVuc3VyZSBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoICRlbGVtZW50LmRhdGEoJ3NlbGVjdDInKS5cbiAgICAkZWxlbWVudC5kYXRhKCdzZWxlY3QyJywgdGhpcyk7XG4gIH07XG5cbiAgVXRpbHMuRXh0ZW5kKFNlbGVjdDIsIFV0aWxzLk9ic2VydmFibGUpO1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9nZW5lcmF0ZUlkID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgdmFyIGlkID0gJyc7XG5cbiAgICBpZiAoJGVsZW1lbnQuYXR0cignaWQnKSAhPSBudWxsKSB7XG4gICAgICBpZCA9ICRlbGVtZW50LmF0dHIoJ2lkJyk7XG4gICAgfSBlbHNlIGlmICgkZWxlbWVudC5hdHRyKCduYW1lJykgIT0gbnVsbCkge1xuICAgICAgaWQgPSAkZWxlbWVudC5hdHRyKCduYW1lJykgKyAnLScgKyBVdGlscy5nZW5lcmF0ZUNoYXJzKDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9IFV0aWxzLmdlbmVyYXRlQ2hhcnMoNCk7XG4gICAgfVxuXG4gICAgaWQgPSBpZC5yZXBsYWNlKC8oOnxcXC58XFxbfFxcXXwsKS9nLCAnJyk7XG4gICAgaWQgPSAnc2VsZWN0Mi0nICsgaWQ7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3BsYWNlQ29udGFpbmVyID0gZnVuY3Rpb24gKCRjb250YWluZXIpIHtcbiAgICAkY29udGFpbmVyLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpO1xuXG4gICAgdmFyIHdpZHRoID0gdGhpcy5fcmVzb2x2ZVdpZHRoKHRoaXMuJGVsZW1lbnQsIHRoaXMub3B0aW9ucy5nZXQoJ3dpZHRoJykpO1xuXG4gICAgaWYgKHdpZHRoICE9IG51bGwpIHtcbiAgICAgICRjb250YWluZXIuY3NzKCd3aWR0aCcsIHdpZHRoKTtcbiAgICB9XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3Jlc29sdmVXaWR0aCA9IGZ1bmN0aW9uICgkZWxlbWVudCwgbWV0aG9kKSB7XG4gICAgdmFyIFdJRFRIID0gL153aWR0aDooKFstK10/KFswLTldKlxcLik/WzAtOV0rKShweHxlbXxleHwlfGlufGNtfG1tfHB0fHBjKSkvaTtcblxuICAgIGlmIChtZXRob2QgPT0gJ3Jlc29sdmUnKSB7XG4gICAgICB2YXIgc3R5bGVXaWR0aCA9IHRoaXMuX3Jlc29sdmVXaWR0aCgkZWxlbWVudCwgJ3N0eWxlJyk7XG5cbiAgICAgIGlmIChzdHlsZVdpZHRoICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlV2lkdGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXNvbHZlV2lkdGgoJGVsZW1lbnQsICdlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKG1ldGhvZCA9PSAnZWxlbWVudCcpIHtcbiAgICAgIHZhciBlbGVtZW50V2lkdGggPSAkZWxlbWVudC5vdXRlcldpZHRoKGZhbHNlKTtcblxuICAgICAgaWYgKGVsZW1lbnRXaWR0aCA8PSAwKSB7XG4gICAgICAgIHJldHVybiAnYXV0byc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbGVtZW50V2lkdGggKyAncHgnO1xuICAgIH1cblxuICAgIGlmIChtZXRob2QgPT0gJ3N0eWxlJykge1xuICAgICAgdmFyIHN0eWxlID0gJGVsZW1lbnQuYXR0cignc3R5bGUnKTtcblxuICAgICAgaWYgKHR5cGVvZihzdHlsZSkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXR0cnMgPSBzdHlsZS5zcGxpdCgnOycpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF0dHJzLmxlbmd0aDsgaSA8IGw7IGkgPSBpICsgMSkge1xuICAgICAgICB2YXIgYXR0ciA9IGF0dHJzW2ldLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgIHZhciBtYXRjaGVzID0gYXR0ci5tYXRjaChXSURUSCk7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwgJiYgbWF0Y2hlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChtZXRob2QgPT0gJ2NvbXB1dGVkc3R5bGUnKSB7XG4gICAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCRlbGVtZW50WzBdKTtcblxuICAgICAgcmV0dXJuIGNvbXB1dGVkU3R5bGUud2lkdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZDtcbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS5fYmluZEFkYXB0ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGF0YUFkYXB0ZXIuYmluZCh0aGlzLCB0aGlzLiRjb250YWluZXIpO1xuICAgIHRoaXMuc2VsZWN0aW9uLmJpbmQodGhpcywgdGhpcy4kY29udGFpbmVyKTtcblxuICAgIHRoaXMuZHJvcGRvd24uYmluZCh0aGlzLCB0aGlzLiRjb250YWluZXIpO1xuICAgIHRoaXMucmVzdWx0cy5iaW5kKHRoaXMsIHRoaXMuJGNvbnRhaW5lcik7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3JlZ2lzdGVyRG9tRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NoYW5nZS5zZWxlY3QyJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5kYXRhQWRhcHRlci5jdXJyZW50KGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0aW9uOnVwZGF0ZScsIHtcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdmb2N1cy5zZWxlY3QyJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdmb2N1cycsIGV2dCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zeW5jQSA9IFV0aWxzLmJpbmQodGhpcy5fc3luY0F0dHJpYnV0ZXMsIHRoaXMpO1xuICAgIHRoaXMuX3N5bmNTID0gVXRpbHMuYmluZCh0aGlzLl9zeW5jU3VidHJlZSwgdGhpcyk7XG5cbiAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICBzZWxmLl9zeW5jQSgpO1xuICAgICAgc2VsZi5fc3luY1MobXV0YXRpb25zKTtcbiAgICB9KTtcbiAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMuJGVsZW1lbnRbMF0sIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiBmYWxzZVxuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9yZWdpc3RlckRhdGFFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5kYXRhQWRhcHRlci5vbignKicsIGZ1bmN0aW9uIChuYW1lLCBwYXJhbXMpIHtcbiAgICAgIHNlbGYudHJpZ2dlcihuYW1lLCBwYXJhbXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9yZWdpc3RlclNlbGVjdGlvbkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG5vblJlbGF5RXZlbnRzID0gWyd0b2dnbGUnLCAnZm9jdXMnXTtcblxuICAgIHRoaXMuc2VsZWN0aW9uLm9uKCd0b2dnbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdGlvbi5vbignZm9jdXMnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLmZvY3VzKHBhcmFtcyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdGlvbi5vbignKicsIGZ1bmN0aW9uIChuYW1lLCBwYXJhbXMpIHtcbiAgICAgIGlmIChub25SZWxheUV2ZW50cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJpZ2dlcihuYW1lLCBwYXJhbXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9yZWdpc3RlckRyb3Bkb3duRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZHJvcGRvd24ub24oJyonLCBmdW5jdGlvbiAobmFtZSwgcGFyYW1zKSB7XG4gICAgICBzZWxmLnRyaWdnZXIobmFtZSwgcGFyYW1zKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS5fcmVnaXN0ZXJSZXN1bHRzRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMucmVzdWx0cy5vbignKicsIGZ1bmN0aW9uIChuYW1lLCBwYXJhbXMpIHtcbiAgICAgIHNlbGYudHJpZ2dlcihuYW1lLCBwYXJhbXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9yZWdpc3RlckV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItY29udGFpbmVyLS1vcGVuJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuJGNvbnRhaW5lclswXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignZW5hYmxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItY29udGFpbmVyLS1kaXNhYmxlZCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignZGlzYWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuJGNvbnRhaW5lclswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWNvbnRhaW5lci0tZGlzYWJsZWQnKTtcbiAgICB9KTtcblxuICAgIHRoaXMub24oJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1jb250YWluZXItLWZvY3VzJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdxdWVyeScsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIGlmICghc2VsZi5pc09wZW4oKSkge1xuICAgICAgICBzZWxmLnRyaWdnZXIoJ29wZW4nLCB7fSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGF0YUFkYXB0ZXIucXVlcnkocGFyYW1zLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBzZWxmLnRyaWdnZXIoJ3Jlc3VsdHM6YWxsJywge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgcXVlcnk6IHBhcmFtc1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbigncXVlcnk6YXBwZW5kJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgdGhpcy5kYXRhQWRhcHRlci5xdWVyeShwYXJhbXMsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHNlbGYudHJpZ2dlcigncmVzdWx0czphcHBlbmQnLCB7XG4gICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICBxdWVyeTogcGFyYW1zXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIHZhciBrZXkgPSBldnQud2hpY2g7XG5cbiAgICAgIGlmIChzZWxmLmlzT3BlbigpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IEtFWVMuRVNDIHx8IChrZXkgPT09IEtFWVMuVVAgJiYgZXZ0LmFsdEtleSkpIHtcbiAgICAgICAgICBzZWxmLmNsb3NlKGV2dCk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IEtFWVMuRU5URVIgfHwga2V5ID09PSBLRVlTLlRBQikge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcigncmVzdWx0czpzZWxlY3QnLCB7fSk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICgoa2V5ID09PSBLRVlTLlNQQUNFICYmIGV2dC5jdHJsS2V5KSkge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcigncmVzdWx0czp0b2dnbGUnLCB7fSk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IEtFWVMuVVApIHtcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3Jlc3VsdHM6cHJldmlvdXMnLCB7fSk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IEtFWVMuRE9XTikge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcigncmVzdWx0czpuZXh0Jywge30pO1xuXG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChrZXkgPT09IEtFWVMuRU5URVIgfHwga2V5ID09PSBLRVlTLlNQQUNFIHx8XG4gICAgICAgICAgICAoa2V5ID09PSBLRVlTLkRPV04gJiYgZXZ0LmFsdEtleSkpIHtcbiAgICAgICAgICBzZWxmLm9wZW4oKTtcblxuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3N5bmNBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5zZXQoJ2Rpc2FibGVkJywgdGhpcy4kZWxlbWVudC5wcm9wKCdkaXNhYmxlZCcpKTtcblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRyaWdnZXIoJ2Rpc2FibGUnLCB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJpZ2dlcignZW5hYmxlJywge30pO1xuICAgIH1cbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS5faXNDaGFuZ2VNdXRhdGlvbiA9IGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAobXV0YXRpb25zLmFkZGVkTm9kZXMgJiYgbXV0YXRpb25zLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBtdXRhdGlvbnMuYWRkZWROb2Rlcy5sZW5ndGg7IG4rKykge1xuICAgICAgICB2YXIgbm9kZSA9IG11dGF0aW9ucy5hZGRlZE5vZGVzW25dO1xuXG4gICAgICAgIGlmIChub2RlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG11dGF0aW9ucy5yZW1vdmVkTm9kZXMgJiYgbXV0YXRpb25zLnJlbW92ZWROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobXV0YXRpb25zKSkge1xuICAgICAgcmV0dXJuIG11dGF0aW9ucy5zb21lKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZi5faXNDaGFuZ2VNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3N5bmNTdWJ0cmVlID0gZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgIHZhciBjaGFuZ2VkID0gdGhpcy5faXNDaGFuZ2VNdXRhdGlvbihtdXRhdGlvbnMpO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE9ubHkgcmUtcHVsbCB0aGUgZGF0YSBpZiB3ZSB0aGluayB0aGVyZSBpcyBhIGNoYW5nZVxuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICB0aGlzLmRhdGFBZGFwdGVyLmN1cnJlbnQoZnVuY3Rpb24gKGN1cnJlbnREYXRhKSB7XG4gICAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0aW9uOnVwZGF0ZScsIHtcbiAgICAgICAgICBkYXRhOiBjdXJyZW50RGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIHRyaWdnZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgdHJpZ2dlciBwcmUtZXZlbnRzIHdoZW5cbiAgICogdGhlcmUgYXJlIGV2ZW50cyB0aGF0IGNhbiBiZSBwcmV2ZW50ZWQuXG4gICAqL1xuICBTZWxlY3QyLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcbiAgICB2YXIgYWN0dWFsVHJpZ2dlciA9IFNlbGVjdDIuX19zdXBlcl9fLnRyaWdnZXI7XG4gICAgdmFyIHByZVRyaWdnZXJNYXAgPSB7XG4gICAgICAnb3Blbic6ICdvcGVuaW5nJyxcbiAgICAgICdjbG9zZSc6ICdjbG9zaW5nJyxcbiAgICAgICdzZWxlY3QnOiAnc2VsZWN0aW5nJyxcbiAgICAgICd1bnNlbGVjdCc6ICd1bnNlbGVjdGluZycsXG4gICAgICAnY2xlYXInOiAnY2xlYXJpbmcnXG4gICAgfTtcblxuICAgIGlmIChhcmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSBpbiBwcmVUcmlnZ2VyTWFwKSB7XG4gICAgICB2YXIgcHJlVHJpZ2dlck5hbWUgPSBwcmVUcmlnZ2VyTWFwW25hbWVdO1xuICAgICAgdmFyIHByZVRyaWdnZXJBcmdzID0ge1xuICAgICAgICBwcmV2ZW50ZWQ6IGZhbHNlLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9O1xuXG4gICAgICBhY3R1YWxUcmlnZ2VyLmNhbGwodGhpcywgcHJlVHJpZ2dlck5hbWUsIHByZVRyaWdnZXJBcmdzKTtcblxuICAgICAgaWYgKHByZVRyaWdnZXJBcmdzLnByZXZlbnRlZCkge1xuICAgICAgICBhcmdzLnByZXZlbnRlZCA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFjdHVhbFRyaWdnZXIuY2FsbCh0aGlzLCBuYW1lLCBhcmdzKTtcbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS50b2dnbGVEcm9wZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcigncXVlcnknLCB7fSk7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50cmlnZ2VyKCdjbG9zZScsIHsgb3JpZ2luYWxFdmVudCA6IGV2dCB9KTtcbiAgfTtcblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCB0byBhYnN0cmFjdCB0aGUgXCJlbmFibGVkXCIgKG5vdCBcImRpc2FibGVkXCIpIHN0YXRlIG9mIHRoaXNcbiAgICogb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJuIHt0cnVlfSBpZiB0aGUgaW5zdGFuY2UgaXMgbm90IGRpc2FibGVkLlxuICAgKiBAcmV0dXJuIHtmYWxzZX0gaWYgdGhlIGluc3RhbmNlIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgU2VsZWN0Mi5wcm90b3R5cGUuaXNFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0Rpc2FibGVkKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gYWJzdHJhY3QgdGhlIFwiZGlzYWJsZWRcIiBzdGF0ZSBvZiB0aGlzIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybiB7dHJ1ZX0gaWYgdGhlIGRpc2FibGVkIG9wdGlvbiBpcyB0cnVlLlxuICAgKiBAcmV0dXJuIHtmYWxzZX0gaWYgdGhlIGRpc2FibGVkIG9wdGlvbiBpcyBmYWxzZS5cbiAgICovXG4gIFNlbGVjdDIucHJvdG90eXBlLmlzRGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXQoJ2Rpc2FibGVkJyk7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuaXNPcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLmhhc0ZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QyLWNvbnRhaW5lci0tZm9jdXMnKTtcbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgLy8gTm8gbmVlZCB0byByZS10cmlnZ2VyIGZvY3VzIGV2ZW50cyBpZiB3ZSBhcmUgYWxyZWFkeSBmb2N1c2VkXG4gICAgaWYgKHRoaXMuaGFzRm9jdXMoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuJGNvbnRhaW5lclswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWNvbnRhaW5lci0tZm9jdXMnKTtcbiAgICB0aGlzLnRyaWdnZXIoJ2ZvY3VzJywge30pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5nZXQoJ2RlYnVnJykgJiYgd2luZG93LmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdTZWxlY3QyOiBUaGUgYHNlbGVjdDIoXCJlbmFibGVcIilgIG1ldGhvZCBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCB3aWxsJyArXG4gICAgICAgICcgYmUgcmVtb3ZlZCBpbiBsYXRlciBTZWxlY3QyIHZlcnNpb25zLiBVc2UgJGVsZW1lbnQucHJvcChcImRpc2FibGVkXCIpJyArXG4gICAgICAgICcgaW5zdGVhZC4nXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChhcmdzID09IG51bGwgfHwgYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIGFyZ3MgPSBbdHJ1ZV07XG4gICAgfVxuXG4gICAgdmFyIGRpc2FibGVkID0gIWFyZ3NbMF07XG5cbiAgICB0aGlzLiRlbGVtZW50LnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5nZXQoJ2RlYnVnJykgJiZcbiAgICAgICAgYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgd2luZG93LmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdTZWxlY3QyOiBEYXRhIGNhbiBubyBsb25nZXIgYmUgc2V0IHVzaW5nIGBzZWxlY3QyKFwiZGF0YVwiKWAuIFlvdSAnICtcbiAgICAgICAgJ3Nob3VsZCBjb25zaWRlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbnN0ZWFkIHVzaW5nIGAkZWxlbWVudC52YWwoKWAuJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgZGF0YSA9IFtdO1xuXG4gICAgdGhpcy5kYXRhQWRhcHRlci5jdXJyZW50KGZ1bmN0aW9uIChjdXJyZW50RGF0YSkge1xuICAgICAgZGF0YSA9IGN1cnJlbnREYXRhO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUudmFsID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmdldCgnZGVidWcnKSAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1NlbGVjdDI6IFRoZSBgc2VsZWN0MihcInZhbFwiKWAgbWV0aG9kIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUnICtcbiAgICAgICAgJyByZW1vdmVkIGluIGxhdGVyIFNlbGVjdDIgdmVyc2lvbnMuIFVzZSAkZWxlbWVudC52YWwoKSBpbnN0ZWFkLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3MgPT0gbnVsbCB8fCBhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQudmFsKCk7XG4gICAgfVxuXG4gICAgdmFyIG5ld1ZhbCA9IGFyZ3NbMF07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdWYWwpKSB7XG4gICAgICBuZXdWYWwgPSBuZXdWYWwubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC52YWwobmV3VmFsKS50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgVXRpbHMuUmVtb3ZlRGF0YSh0aGlzLiRjb250YWluZXJbMF0pO1xuICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmUoKTtcblxuICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLl9vYnNlcnZlciA9IG51bGw7XG5cbiAgICB0aGlzLl9zeW5jQSA9IG51bGw7XG4gICAgdGhpcy5fc3luY1MgPSBudWxsO1xuXG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy5zZWxlY3QyJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCd0YWJpbmRleCcsXG4gICAgVXRpbHMuR2V0RGF0YSh0aGlzLiRlbGVtZW50WzBdLCAnb2xkLXRhYmluZGV4JykpO1xuXG4gICAgdGhpcy4kZWxlbWVudFswXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgIFV0aWxzLlJlbW92ZURhdGEodGhpcy4kZWxlbWVudFswXSk7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdzZWxlY3QyJyk7XG5cbiAgICB0aGlzLmRhdGFBZGFwdGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnNlbGVjdGlvbi5kZXN0cm95KCk7XG4gICAgdGhpcy5kcm9wZG93bi5kZXN0cm95KCk7XG4gICAgdGhpcy5yZXN1bHRzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZGF0YUFkYXB0ZXIgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmRyb3Bkb3duID0gbnVsbDtcbiAgICB0aGlzLnJlc3VsdHMgPSBudWxsO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGNvbnRhaW5lciA9ICQoXG4gICAgICAnPHNwYW4gY2xhc3M9XCJzZWxlY3QyIHNlbGVjdDItY29udGFpbmVyXCI+JyArXG4gICAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdGlvblwiPjwvc3Bhbj4nICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiZHJvcGRvd24td3JhcHBlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4nICtcbiAgICAgICc8L3NwYW4+J1xuICAgICk7XG5cbiAgICAkY29udGFpbmVyLmF0dHIoJ2RpcicsIHRoaXMub3B0aW9ucy5nZXQoJ2RpcicpKTtcblxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICRjb250YWluZXI7XG5cbiAgICB0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0XG4gICAgICAuYWRkKCdzZWxlY3QyLWNvbnRhaW5lci0tJyArIHRoaXMub3B0aW9ucy5nZXQoJ3RoZW1lJykpO1xuXG4gICAgVXRpbHMuU3RvcmVEYXRhKCRjb250YWluZXJbMF0sICdlbGVtZW50JywgdGhpcy4kZWxlbWVudCk7XG5cbiAgICByZXR1cm4gJGNvbnRhaW5lcjtcbiAgfTtcblxuICByZXR1cm4gU2VsZWN0Mjtcbn0pO1xuXG5TMi5kZWZpbmUoJ2pxdWVyeS1tb3VzZXdoZWVsJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICAvLyBVc2VkIHRvIHNoaW0galF1ZXJ5Lm1vdXNld2hlZWwgZm9yIG5vbi1mdWxsIGJ1aWxkcy5cbiAgcmV0dXJuICQ7XG59KTtcblxuUzIuZGVmaW5lKCdqcXVlcnkuc2VsZWN0MicsW1xuICAnanF1ZXJ5JyxcbiAgJ2pxdWVyeS1tb3VzZXdoZWVsJyxcblxuICAnLi9zZWxlY3QyL2NvcmUnLFxuICAnLi9zZWxlY3QyL2RlZmF1bHRzJyxcbiAgJy4vc2VsZWN0Mi91dGlscydcbl0sIGZ1bmN0aW9uICgkLCBfLCBTZWxlY3QyLCBEZWZhdWx0cywgVXRpbHMpIHtcbiAgaWYgKCQuZm4uc2VsZWN0MiA9PSBudWxsKSB7XG4gICAgLy8gQWxsIG1ldGhvZHMgdGhhdCBzaG91bGQgcmV0dXJuIHRoZSBlbGVtZW50XG4gICAgdmFyIHRoaXNNZXRob2RzID0gWydvcGVuJywgJ2Nsb3NlJywgJ2Rlc3Ryb3knXTtcblxuICAgICQuZm4uc2VsZWN0MiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpbnN0YW5jZU9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb3B0aW9ucyk7XG5cbiAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgU2VsZWN0MigkKHRoaXMpLCBpbnN0YW5jZU9wdGlvbnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpbnN0YW5jZSA9IFV0aWxzLkdldERhdGEodGhpcywgJ3NlbGVjdDInKTtcblxuICAgICAgICAgIGlmIChpbnN0YW5jZSA9PSBudWxsICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICdUaGUgc2VsZWN0MihcXCcnICsgb3B0aW9ucyArICdcXCcpIG1ldGhvZCB3YXMgY2FsbGVkIG9uIGFuICcgK1xuICAgICAgICAgICAgICAnZWxlbWVudCB0aGF0IGlzIG5vdCB1c2luZyBTZWxlY3QyLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0ID0gaW5zdGFuY2Vbb3B0aW9uc10uYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBzaG91bGQgYmUgcmV0dXJuaW5nIGB0aGlzYFxuICAgICAgICBpZiAodGhpc01ldGhvZHMuaW5kZXhPZihvcHRpb25zKSA+IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyBmb3IgU2VsZWN0MjogJyArIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpZiAoJC5mbi5zZWxlY3QyLmRlZmF1bHRzID09IG51bGwpIHtcbiAgICAkLmZuLnNlbGVjdDIuZGVmYXVsdHMgPSBEZWZhdWx0cztcbiAgfVxuXG4gIHJldHVybiBTZWxlY3QyO1xufSk7XG5cbiAgLy8gUmV0dXJuIHRoZSBBTUQgbG9hZGVyIGNvbmZpZ3VyYXRpb24gc28gaXQgY2FuIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGlzIGZpbGVcbiAgcmV0dXJuIHtcbiAgICBkZWZpbmU6IFMyLmRlZmluZSxcbiAgICByZXF1aXJlOiBTMi5yZXF1aXJlXG4gIH07XG59KCkpO1xuXG4gIC8vIEF1dG9sb2FkIHRoZSBqUXVlcnkgYmluZGluZ3NcbiAgLy8gV2Uga25vdyB0aGF0IGFsbCBvZiB0aGUgbW9kdWxlcyBleGlzdCBhYm92ZSB0aGlzLCBzbyB3ZSdyZSBzYWZlXG4gIHZhciBzZWxlY3QyID0gUzIucmVxdWlyZSgnanF1ZXJ5LnNlbGVjdDInKTtcblxuICAvLyBIb2xkIHRoZSBBTUQgbW9kdWxlIHJlZmVyZW5jZXMgb24gdGhlIGpRdWVyeSBmdW5jdGlvbiB0aGF0IHdhcyBqdXN0IGxvYWRlZFxuICAvLyBUaGlzIGFsbG93cyBTZWxlY3QyIHRvIHVzZSB0aGUgaW50ZXJuYWwgbG9hZGVyIG91dHNpZGUgb2YgdGhpcyBmaWxlLCBzdWNoXG4gIC8vIGFzIGluIHRoZSBsYW5ndWFnZSBmaWxlcy5cbiAgalF1ZXJ5LmZuLnNlbGVjdDIuYW1kID0gUzI7XG5cbiAgLy8gUmV0dXJuIHRoZSBTZWxlY3QyIGluc3RhbmNlIGZvciBhbnlvbmUgd2hvIGlzIGltcG9ydGluZyBpdC5cbiAgcmV0dXJuIHNlbGVjdDI7XG59KSk7XG4iLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5lanM9ZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciBmcz1yZXF1aXJlKFwiZnNcIik7dmFyIHBhdGg9cmVxdWlyZShcInBhdGhcIik7dmFyIHV0aWxzPXJlcXVpcmUoXCIuL3V0aWxzXCIpO3ZhciBzY29wZU9wdGlvbldhcm5lZD1mYWxzZTt2YXIgX1ZFUlNJT05fU1RSSU5HPXJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIikudmVyc2lvbjt2YXIgX0RFRkFVTFRfT1BFTl9ERUxJTUlURVI9XCI8XCI7dmFyIF9ERUZBVUxUX0NMT1NFX0RFTElNSVRFUj1cIj5cIjt2YXIgX0RFRkFVTFRfREVMSU1JVEVSPVwiJVwiO3ZhciBfREVGQVVMVF9MT0NBTFNfTkFNRT1cImxvY2Fsc1wiO3ZhciBfTkFNRT1cImVqc1wiO3ZhciBfUkVHRVhfU1RSSU5HPVwiKDwlJXwlJT58PCU9fDwlLXw8JV98PCUjfDwlfCU+fC0lPnxfJT4pXCI7dmFyIF9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQT1bXCJkZWxpbWl0ZXJcIixcInNjb3BlXCIsXCJjb250ZXh0XCIsXCJkZWJ1Z1wiLFwiY29tcGlsZURlYnVnXCIsXCJjbGllbnRcIixcIl93aXRoXCIsXCJybVdoaXRlc3BhY2VcIixcInN0cmljdFwiLFwiZmlsZW5hbWVcIixcImFzeW5jXCJdO3ZhciBfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEFfRVhQUkVTUz1fT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEuY29uY2F0KFwiY2FjaGVcIik7dmFyIF9CT009L15cXHVGRUZGLzt2YXIgX0pTX0lERU5USUZJRVI9L15bYS16QS1aXyRdWzAtOWEtekEtWl8kXSokLztleHBvcnRzLmNhY2hlPXV0aWxzLmNhY2hlO2V4cG9ydHMuZmlsZUxvYWRlcj1mcy5yZWFkRmlsZVN5bmM7ZXhwb3J0cy5sb2NhbHNOYW1lPV9ERUZBVUxUX0xPQ0FMU19OQU1FO2V4cG9ydHMucHJvbWlzZUltcGw9bmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXM7XCIpKCkuUHJvbWlzZTtleHBvcnRzLnJlc29sdmVJbmNsdWRlPWZ1bmN0aW9uKG5hbWUsZmlsZW5hbWUsaXNEaXIpe3ZhciBkaXJuYW1lPXBhdGguZGlybmFtZTt2YXIgZXh0bmFtZT1wYXRoLmV4dG5hbWU7dmFyIHJlc29sdmU9cGF0aC5yZXNvbHZlO3ZhciBpbmNsdWRlUGF0aD1yZXNvbHZlKGlzRGlyP2ZpbGVuYW1lOmRpcm5hbWUoZmlsZW5hbWUpLG5hbWUpO3ZhciBleHQ9ZXh0bmFtZShuYW1lKTtpZighZXh0KXtpbmNsdWRlUGF0aCs9XCIuZWpzXCJ9cmV0dXJuIGluY2x1ZGVQYXRofTtmdW5jdGlvbiByZXNvbHZlUGF0aHMobmFtZSxwYXRocyl7dmFyIGZpbGVQYXRoO2lmKHBhdGhzLnNvbWUoZnVuY3Rpb24odil7ZmlsZVBhdGg9ZXhwb3J0cy5yZXNvbHZlSW5jbHVkZShuYW1lLHYsdHJ1ZSk7cmV0dXJuIGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpfSkpe3JldHVybiBmaWxlUGF0aH19ZnVuY3Rpb24gZ2V0SW5jbHVkZVBhdGgocGF0aCxvcHRpb25zKXt2YXIgaW5jbHVkZVBhdGg7dmFyIGZpbGVQYXRoO3ZhciB2aWV3cz1vcHRpb25zLnZpZXdzO3ZhciBtYXRjaD0vXltBLVphLXpdKzpcXFxcfF5cXC8vLmV4ZWMocGF0aCk7aWYobWF0Y2gmJm1hdGNoLmxlbmd0aCl7cGF0aD1wYXRoLnJlcGxhY2UoL15cXC8qLyxcIlwiKTtpZihBcnJheS5pc0FycmF5KG9wdGlvbnMucm9vdCkpe2luY2x1ZGVQYXRoPXJlc29sdmVQYXRocyhwYXRoLG9wdGlvbnMucm9vdCl9ZWxzZXtpbmNsdWRlUGF0aD1leHBvcnRzLnJlc29sdmVJbmNsdWRlKHBhdGgsb3B0aW9ucy5yb290fHxcIi9cIix0cnVlKX19ZWxzZXtpZihvcHRpb25zLmZpbGVuYW1lKXtmaWxlUGF0aD1leHBvcnRzLnJlc29sdmVJbmNsdWRlKHBhdGgsb3B0aW9ucy5maWxlbmFtZSk7aWYoZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpe2luY2x1ZGVQYXRoPWZpbGVQYXRofX1pZighaW5jbHVkZVBhdGgmJkFycmF5LmlzQXJyYXkodmlld3MpKXtpbmNsdWRlUGF0aD1yZXNvbHZlUGF0aHMocGF0aCx2aWV3cyl9aWYoIWluY2x1ZGVQYXRoJiZ0eXBlb2Ygb3B0aW9ucy5pbmNsdWRlciE9PVwiZnVuY3Rpb25cIil7dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0aGUgaW5jbHVkZSBmaWxlIFwiJytvcHRpb25zLmVzY2FwZUZ1bmN0aW9uKHBhdGgpKydcIicpfX1yZXR1cm4gaW5jbHVkZVBhdGh9ZnVuY3Rpb24gaGFuZGxlQ2FjaGUob3B0aW9ucyx0ZW1wbGF0ZSl7dmFyIGZ1bmM7dmFyIGZpbGVuYW1lPW9wdGlvbnMuZmlsZW5hbWU7dmFyIGhhc1RlbXBsYXRlPWFyZ3VtZW50cy5sZW5ndGg+MTtpZihvcHRpb25zLmNhY2hlKXtpZighZmlsZW5hbWUpe3Rocm93IG5ldyBFcnJvcihcImNhY2hlIG9wdGlvbiByZXF1aXJlcyBhIGZpbGVuYW1lXCIpfWZ1bmM9ZXhwb3J0cy5jYWNoZS5nZXQoZmlsZW5hbWUpO2lmKGZ1bmMpe3JldHVybiBmdW5jfWlmKCFoYXNUZW1wbGF0ZSl7dGVtcGxhdGU9ZmlsZUxvYWRlcihmaWxlbmFtZSkudG9TdHJpbmcoKS5yZXBsYWNlKF9CT00sXCJcIil9fWVsc2UgaWYoIWhhc1RlbXBsYXRlKXtpZighZmlsZW5hbWUpe3Rocm93IG5ldyBFcnJvcihcIkludGVybmFsIEVKUyBlcnJvcjogbm8gZmlsZSBuYW1lIG9yIHRlbXBsYXRlIFwiK1wicHJvdmlkZWRcIil9dGVtcGxhdGU9ZmlsZUxvYWRlcihmaWxlbmFtZSkudG9TdHJpbmcoKS5yZXBsYWNlKF9CT00sXCJcIil9ZnVuYz1leHBvcnRzLmNvbXBpbGUodGVtcGxhdGUsb3B0aW9ucyk7aWYob3B0aW9ucy5jYWNoZSl7ZXhwb3J0cy5jYWNoZS5zZXQoZmlsZW5hbWUsZnVuYyl9cmV0dXJuIGZ1bmN9ZnVuY3Rpb24gdHJ5SGFuZGxlQ2FjaGUob3B0aW9ucyxkYXRhLGNiKXt2YXIgcmVzdWx0O2lmKCFjYil7aWYodHlwZW9mIGV4cG9ydHMucHJvbWlzZUltcGw9PVwiZnVuY3Rpb25cIil7cmV0dXJuIG5ldyBleHBvcnRzLnByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXt0cnl7cmVzdWx0PWhhbmRsZUNhY2hlKG9wdGlvbnMpKGRhdGEpO3Jlc29sdmUocmVzdWx0KX1jYXRjaChlcnIpe3JlamVjdChlcnIpfX0pfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHByb3ZpZGUgYSBjYWxsYmFjayBmdW5jdGlvblwiKX19ZWxzZXt0cnl7cmVzdWx0PWhhbmRsZUNhY2hlKG9wdGlvbnMpKGRhdGEpfWNhdGNoKGVycil7cmV0dXJuIGNiKGVycil9Y2IobnVsbCxyZXN1bHQpfX1mdW5jdGlvbiBmaWxlTG9hZGVyKGZpbGVQYXRoKXtyZXR1cm4gZXhwb3J0cy5maWxlTG9hZGVyKGZpbGVQYXRoKX1mdW5jdGlvbiBpbmNsdWRlRmlsZShwYXRoLG9wdGlvbnMpe3ZhciBvcHRzPXV0aWxzLnNoYWxsb3dDb3B5KHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKSxvcHRpb25zKTtvcHRzLmZpbGVuYW1lPWdldEluY2x1ZGVQYXRoKHBhdGgsb3B0cyk7aWYodHlwZW9mIG9wdGlvbnMuaW5jbHVkZXI9PT1cImZ1bmN0aW9uXCIpe3ZhciBpbmNsdWRlclJlc3VsdD1vcHRpb25zLmluY2x1ZGVyKHBhdGgsb3B0cy5maWxlbmFtZSk7aWYoaW5jbHVkZXJSZXN1bHQpe2lmKGluY2x1ZGVyUmVzdWx0LmZpbGVuYW1lKXtvcHRzLmZpbGVuYW1lPWluY2x1ZGVyUmVzdWx0LmZpbGVuYW1lfWlmKGluY2x1ZGVyUmVzdWx0LnRlbXBsYXRlKXtyZXR1cm4gaGFuZGxlQ2FjaGUob3B0cyxpbmNsdWRlclJlc3VsdC50ZW1wbGF0ZSl9fX1yZXR1cm4gaGFuZGxlQ2FjaGUob3B0cyl9ZnVuY3Rpb24gcmV0aHJvdyhlcnIsc3RyLGZsbm0sbGluZW5vLGVzYyl7dmFyIGxpbmVzPXN0ci5zcGxpdChcIlxcblwiKTt2YXIgc3RhcnQ9TWF0aC5tYXgobGluZW5vLTMsMCk7dmFyIGVuZD1NYXRoLm1pbihsaW5lcy5sZW5ndGgsbGluZW5vKzMpO3ZhciBmaWxlbmFtZT1lc2MoZmxubSk7dmFyIGNvbnRleHQ9bGluZXMuc2xpY2Uoc3RhcnQsZW5kKS5tYXAoZnVuY3Rpb24obGluZSxpKXt2YXIgY3Vycj1pK3N0YXJ0KzE7cmV0dXJuKGN1cnI9PWxpbmVubz9cIiA+PiBcIjpcIiAgICBcIikrY3VycitcInwgXCIrbGluZX0pLmpvaW4oXCJcXG5cIik7ZXJyLnBhdGg9ZmlsZW5hbWU7ZXJyLm1lc3NhZ2U9KGZpbGVuYW1lfHxcImVqc1wiKStcIjpcIitsaW5lbm8rXCJcXG5cIitjb250ZXh0K1wiXFxuXFxuXCIrZXJyLm1lc3NhZ2U7dGhyb3cgZXJyfWZ1bmN0aW9uIHN0cmlwU2VtaShzdHIpe3JldHVybiBzdHIucmVwbGFjZSgvOyhcXHMqJCkvLFwiJDFcIil9ZXhwb3J0cy5jb21waWxlPWZ1bmN0aW9uIGNvbXBpbGUodGVtcGxhdGUsb3B0cyl7dmFyIHRlbXBsO2lmKG9wdHMmJm9wdHMuc2NvcGUpe2lmKCFzY29wZU9wdGlvbldhcm5lZCl7Y29uc29sZS53YXJuKFwiYHNjb3BlYCBvcHRpb24gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIEVKUyAzXCIpO3Njb3BlT3B0aW9uV2FybmVkPXRydWV9aWYoIW9wdHMuY29udGV4dCl7b3B0cy5jb250ZXh0PW9wdHMuc2NvcGV9ZGVsZXRlIG9wdHMuc2NvcGV9dGVtcGw9bmV3IFRlbXBsYXRlKHRlbXBsYXRlLG9wdHMpO3JldHVybiB0ZW1wbC5jb21waWxlKCl9O2V4cG9ydHMucmVuZGVyPWZ1bmN0aW9uKHRlbXBsYXRlLGQsbyl7dmFyIGRhdGE9ZHx8dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpO3ZhciBvcHRzPW98fHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKTtpZihhcmd1bWVudHMubGVuZ3RoPT0yKXt1dGlscy5zaGFsbG93Q29weUZyb21MaXN0KG9wdHMsZGF0YSxfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEpfXJldHVybiBoYW5kbGVDYWNoZShvcHRzLHRlbXBsYXRlKShkYXRhKX07ZXhwb3J0cy5yZW5kZXJGaWxlPWZ1bmN0aW9uKCl7dmFyIGFyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTt2YXIgZmlsZW5hbWU9YXJncy5zaGlmdCgpO3ZhciBjYjt2YXIgb3B0cz17ZmlsZW5hbWU6ZmlsZW5hbWV9O3ZhciBkYXRhO3ZhciB2aWV3T3B0cztpZih0eXBlb2YgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGgtMV09PVwiZnVuY3Rpb25cIil7Y2I9YXJncy5wb3AoKX1pZihhcmdzLmxlbmd0aCl7ZGF0YT1hcmdzLnNoaWZ0KCk7aWYoYXJncy5sZW5ndGgpe3V0aWxzLnNoYWxsb3dDb3B5KG9wdHMsYXJncy5wb3AoKSl9ZWxzZXtpZihkYXRhLnNldHRpbmdzKXtpZihkYXRhLnNldHRpbmdzLnZpZXdzKXtvcHRzLnZpZXdzPWRhdGEuc2V0dGluZ3Mudmlld3N9aWYoZGF0YS5zZXR0aW5nc1tcInZpZXcgY2FjaGVcIl0pe29wdHMuY2FjaGU9dHJ1ZX12aWV3T3B0cz1kYXRhLnNldHRpbmdzW1widmlldyBvcHRpb25zXCJdO2lmKHZpZXdPcHRzKXt1dGlscy5zaGFsbG93Q29weShvcHRzLHZpZXdPcHRzKX19dXRpbHMuc2hhbGxvd0NvcHlGcm9tTGlzdChvcHRzLGRhdGEsX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBX0VYUFJFU1MpfW9wdHMuZmlsZW5hbWU9ZmlsZW5hbWV9ZWxzZXtkYXRhPXV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKX1yZXR1cm4gdHJ5SGFuZGxlQ2FjaGUob3B0cyxkYXRhLGNiKX07ZXhwb3J0cy5UZW1wbGF0ZT1UZW1wbGF0ZTtleHBvcnRzLmNsZWFyQ2FjaGU9ZnVuY3Rpb24oKXtleHBvcnRzLmNhY2hlLnJlc2V0KCl9O2Z1bmN0aW9uIFRlbXBsYXRlKHRleHQsb3B0c1BhcmFtKXt2YXIgb3B0cz11dGlscy5oYXNPd25Pbmx5T2JqZWN0KG9wdHNQYXJhbSk7dmFyIG9wdGlvbnM9dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpO3RoaXMudGVtcGxhdGVUZXh0PXRleHQ7dGhpcy5tb2RlPW51bGw7dGhpcy50cnVuY2F0ZT1mYWxzZTt0aGlzLmN1cnJlbnRMaW5lPTE7dGhpcy5zb3VyY2U9XCJcIjtvcHRpb25zLmNsaWVudD1vcHRzLmNsaWVudHx8ZmFsc2U7b3B0aW9ucy5lc2NhcGVGdW5jdGlvbj1vcHRzLmVzY2FwZXx8b3B0cy5lc2NhcGVGdW5jdGlvbnx8dXRpbHMuZXNjYXBlWE1MO29wdGlvbnMuY29tcGlsZURlYnVnPW9wdHMuY29tcGlsZURlYnVnIT09ZmFsc2U7b3B0aW9ucy5kZWJ1Zz0hIW9wdHMuZGVidWc7b3B0aW9ucy5maWxlbmFtZT1vcHRzLmZpbGVuYW1lO29wdGlvbnMub3BlbkRlbGltaXRlcj1vcHRzLm9wZW5EZWxpbWl0ZXJ8fGV4cG9ydHMub3BlbkRlbGltaXRlcnx8X0RFRkFVTFRfT1BFTl9ERUxJTUlURVI7b3B0aW9ucy5jbG9zZURlbGltaXRlcj1vcHRzLmNsb3NlRGVsaW1pdGVyfHxleHBvcnRzLmNsb3NlRGVsaW1pdGVyfHxfREVGQVVMVF9DTE9TRV9ERUxJTUlURVI7b3B0aW9ucy5kZWxpbWl0ZXI9b3B0cy5kZWxpbWl0ZXJ8fGV4cG9ydHMuZGVsaW1pdGVyfHxfREVGQVVMVF9ERUxJTUlURVI7b3B0aW9ucy5zdHJpY3Q9b3B0cy5zdHJpY3R8fGZhbHNlO29wdGlvbnMuY29udGV4dD1vcHRzLmNvbnRleHQ7b3B0aW9ucy5jYWNoZT1vcHRzLmNhY2hlfHxmYWxzZTtvcHRpb25zLnJtV2hpdGVzcGFjZT1vcHRzLnJtV2hpdGVzcGFjZTtvcHRpb25zLnJvb3Q9b3B0cy5yb290O29wdGlvbnMuaW5jbHVkZXI9b3B0cy5pbmNsdWRlcjtvcHRpb25zLm91dHB1dEZ1bmN0aW9uTmFtZT1vcHRzLm91dHB1dEZ1bmN0aW9uTmFtZTtvcHRpb25zLmxvY2Fsc05hbWU9b3B0cy5sb2NhbHNOYW1lfHxleHBvcnRzLmxvY2Fsc05hbWV8fF9ERUZBVUxUX0xPQ0FMU19OQU1FO29wdGlvbnMudmlld3M9b3B0cy52aWV3cztvcHRpb25zLmFzeW5jPW9wdHMuYXN5bmM7b3B0aW9ucy5kZXN0cnVjdHVyZWRMb2NhbHM9b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHM7b3B0aW9ucy5sZWdhY3lJbmNsdWRlPXR5cGVvZiBvcHRzLmxlZ2FjeUluY2x1ZGUhPVwidW5kZWZpbmVkXCI/ISFvcHRzLmxlZ2FjeUluY2x1ZGU6dHJ1ZTtpZihvcHRpb25zLnN0cmljdCl7b3B0aW9ucy5fd2l0aD1mYWxzZX1lbHNle29wdGlvbnMuX3dpdGg9dHlwZW9mIG9wdHMuX3dpdGghPVwidW5kZWZpbmVkXCI/b3B0cy5fd2l0aDp0cnVlfXRoaXMub3B0cz1vcHRpb25zO3RoaXMucmVnZXg9dGhpcy5jcmVhdGVSZWdleCgpfVRlbXBsYXRlLm1vZGVzPXtFVkFMOlwiZXZhbFwiLEVTQ0FQRUQ6XCJlc2NhcGVkXCIsUkFXOlwicmF3XCIsQ09NTUVOVDpcImNvbW1lbnRcIixMSVRFUkFMOlwibGl0ZXJhbFwifTtUZW1wbGF0ZS5wcm90b3R5cGU9e2NyZWF0ZVJlZ2V4OmZ1bmN0aW9uKCl7dmFyIHN0cj1fUkVHRVhfU1RSSU5HO3ZhciBkZWxpbT11dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMuZGVsaW1pdGVyKTt2YXIgb3Blbj11dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMub3BlbkRlbGltaXRlcik7dmFyIGNsb3NlPXV0aWxzLmVzY2FwZVJlZ0V4cENoYXJzKHRoaXMub3B0cy5jbG9zZURlbGltaXRlcik7c3RyPXN0ci5yZXBsYWNlKC8lL2csZGVsaW0pLnJlcGxhY2UoLzwvZyxvcGVuKS5yZXBsYWNlKC8+L2csY2xvc2UpO3JldHVybiBuZXcgUmVnRXhwKHN0cil9LGNvbXBpbGU6ZnVuY3Rpb24oKXt2YXIgc3JjO3ZhciBmbjt2YXIgb3B0cz10aGlzLm9wdHM7dmFyIHByZXBlbmRlZD1cIlwiO3ZhciBhcHBlbmRlZD1cIlwiO3ZhciBlc2NhcGVGbj1vcHRzLmVzY2FwZUZ1bmN0aW9uO3ZhciBjdG9yO3ZhciBzYW5pdGl6ZWRGaWxlbmFtZT1vcHRzLmZpbGVuYW1lP0pTT04uc3RyaW5naWZ5KG9wdHMuZmlsZW5hbWUpOlwidW5kZWZpbmVkXCI7aWYoIXRoaXMuc291cmNlKXt0aGlzLmdlbmVyYXRlU291cmNlKCk7cHJlcGVuZGVkKz0nICB2YXIgX19vdXRwdXQgPSBcIlwiO1xcbicrXCIgIGZ1bmN0aW9uIF9fYXBwZW5kKHMpIHsgaWYgKHMgIT09IHVuZGVmaW5lZCAmJiBzICE9PSBudWxsKSBfX291dHB1dCArPSBzIH1cXG5cIjtpZihvcHRzLm91dHB1dEZ1bmN0aW9uTmFtZSl7aWYoIV9KU19JREVOVElGSUVSLnRlc3Qob3B0cy5vdXRwdXRGdW5jdGlvbk5hbWUpKXt0aHJvdyBuZXcgRXJyb3IoXCJvdXRwdXRGdW5jdGlvbk5hbWUgaXMgbm90IGEgdmFsaWQgSlMgaWRlbnRpZmllci5cIil9cHJlcGVuZGVkKz1cIiAgdmFyIFwiK29wdHMub3V0cHV0RnVuY3Rpb25OYW1lK1wiID0gX19hcHBlbmQ7XCIrXCJcXG5cIn1pZihvcHRzLmxvY2Fsc05hbWUmJiFfSlNfSURFTlRJRklFUi50ZXN0KG9wdHMubG9jYWxzTmFtZSkpe3Rocm93IG5ldyBFcnJvcihcImxvY2Fsc05hbWUgaXMgbm90IGEgdmFsaWQgSlMgaWRlbnRpZmllci5cIil9aWYob3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMmJm9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzLmxlbmd0aCl7dmFyIGRlc3RydWN0dXJpbmc9XCIgIHZhciBfX2xvY2FscyA9IChcIitvcHRzLmxvY2Fsc05hbWUrXCIgfHwge30pLFxcblwiO2Zvcih2YXIgaT0wO2k8b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMubGVuZ3RoO2krKyl7dmFyIG5hbWU9b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHNbaV07aWYoIV9KU19JREVOVElGSUVSLnRlc3QobmFtZSkpe3Rocm93IG5ldyBFcnJvcihcImRlc3RydWN0dXJlZExvY2Fsc1tcIitpK1wiXSBpcyBub3QgYSB2YWxpZCBKUyBpZGVudGlmaWVyLlwiKX1pZihpPjApe2Rlc3RydWN0dXJpbmcrPVwiLFxcbiAgXCJ9ZGVzdHJ1Y3R1cmluZys9bmFtZStcIiA9IF9fbG9jYWxzLlwiK25hbWV9cHJlcGVuZGVkKz1kZXN0cnVjdHVyaW5nK1wiO1xcblwifWlmKG9wdHMuX3dpdGghPT1mYWxzZSl7cHJlcGVuZGVkKz1cIiAgd2l0aCAoXCIrb3B0cy5sb2NhbHNOYW1lK1wiIHx8IHt9KSB7XCIrXCJcXG5cIjthcHBlbmRlZCs9XCIgIH1cIitcIlxcblwifWFwcGVuZGVkKz1cIiAgcmV0dXJuIF9fb3V0cHV0O1wiK1wiXFxuXCI7dGhpcy5zb3VyY2U9cHJlcGVuZGVkK3RoaXMuc291cmNlK2FwcGVuZGVkfWlmKG9wdHMuY29tcGlsZURlYnVnKXtzcmM9XCJ2YXIgX19saW5lID0gMVwiK1wiXFxuXCIrXCIgICwgX19saW5lcyA9IFwiK0pTT04uc3RyaW5naWZ5KHRoaXMudGVtcGxhdGVUZXh0KStcIlxcblwiK1wiICAsIF9fZmlsZW5hbWUgPSBcIitzYW5pdGl6ZWRGaWxlbmFtZStcIjtcIitcIlxcblwiK1widHJ5IHtcIitcIlxcblwiK3RoaXMuc291cmNlK1wifSBjYXRjaCAoZSkge1wiK1wiXFxuXCIrXCIgIHJldGhyb3coZSwgX19saW5lcywgX19maWxlbmFtZSwgX19saW5lLCBlc2NhcGVGbik7XCIrXCJcXG5cIitcIn1cIitcIlxcblwifWVsc2V7c3JjPXRoaXMuc291cmNlfWlmKG9wdHMuY2xpZW50KXtzcmM9XCJlc2NhcGVGbiA9IGVzY2FwZUZuIHx8IFwiK2VzY2FwZUZuLnRvU3RyaW5nKCkrXCI7XCIrXCJcXG5cIitzcmM7aWYob3B0cy5jb21waWxlRGVidWcpe3NyYz1cInJldGhyb3cgPSByZXRocm93IHx8IFwiK3JldGhyb3cudG9TdHJpbmcoKStcIjtcIitcIlxcblwiK3NyY319aWYob3B0cy5zdHJpY3Qpe3NyYz0nXCJ1c2Ugc3RyaWN0XCI7XFxuJytzcmN9aWYob3B0cy5kZWJ1Zyl7Y29uc29sZS5sb2coc3JjKX1pZihvcHRzLmNvbXBpbGVEZWJ1ZyYmb3B0cy5maWxlbmFtZSl7c3JjPXNyYytcIlxcblwiK1wiLy8jIHNvdXJjZVVSTD1cIitzYW5pdGl6ZWRGaWxlbmFtZStcIlxcblwifXRyeXtpZihvcHRzLmFzeW5jKXt0cnl7Y3Rvcj1uZXcgRnVuY3Rpb24oXCJyZXR1cm4gKGFzeW5jIGZ1bmN0aW9uKCl7fSkuY29uc3RydWN0b3I7XCIpKCl9Y2F0Y2goZSl7aWYoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKXt0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgYXN5bmMvYXdhaXRcIil9ZWxzZXt0aHJvdyBlfX19ZWxzZXtjdG9yPUZ1bmN0aW9ufWZuPW5ldyBjdG9yKG9wdHMubG9jYWxzTmFtZStcIiwgZXNjYXBlRm4sIGluY2x1ZGUsIHJldGhyb3dcIixzcmMpfWNhdGNoKGUpe2lmKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcil7aWYob3B0cy5maWxlbmFtZSl7ZS5tZXNzYWdlKz1cIiBpbiBcIitvcHRzLmZpbGVuYW1lfWUubWVzc2FnZSs9XCIgd2hpbGUgY29tcGlsaW5nIGVqc1xcblxcblwiO2UubWVzc2FnZSs9XCJJZiB0aGUgYWJvdmUgZXJyb3IgaXMgbm90IGhlbHBmdWwsIHlvdSBtYXkgd2FudCB0byB0cnkgRUpTLUxpbnQ6XFxuXCI7ZS5tZXNzYWdlKz1cImh0dHBzOi8vZ2l0aHViLmNvbS9SeWFuWmltL0VKUy1MaW50XCI7aWYoIW9wdHMuYXN5bmMpe2UubWVzc2FnZSs9XCJcXG5cIjtlLm1lc3NhZ2UrPVwiT3IsIGlmIHlvdSBtZWFudCB0byBjcmVhdGUgYW4gYXN5bmMgZnVuY3Rpb24sIHBhc3MgYGFzeW5jOiB0cnVlYCBhcyBhbiBvcHRpb24uXCJ9fXRocm93IGV9dmFyIHJldHVybmVkRm49b3B0cy5jbGllbnQ/Zm46ZnVuY3Rpb24gYW5vbnltb3VzKGRhdGEpe3ZhciBpbmNsdWRlPWZ1bmN0aW9uKHBhdGgsaW5jbHVkZURhdGEpe3ZhciBkPXV0aWxzLnNoYWxsb3dDb3B5KHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKSxkYXRhKTtpZihpbmNsdWRlRGF0YSl7ZD11dGlscy5zaGFsbG93Q29weShkLGluY2x1ZGVEYXRhKX1yZXR1cm4gaW5jbHVkZUZpbGUocGF0aCxvcHRzKShkKX07cmV0dXJuIGZuLmFwcGx5KG9wdHMuY29udGV4dCxbZGF0YXx8dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpLGVzY2FwZUZuLGluY2x1ZGUscmV0aHJvd10pfTtpZihvcHRzLmZpbGVuYW1lJiZ0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5PT09XCJmdW5jdGlvblwiKXt2YXIgZmlsZW5hbWU9b3B0cy5maWxlbmFtZTt2YXIgYmFzZW5hbWU9cGF0aC5iYXNlbmFtZShmaWxlbmFtZSxwYXRoLmV4dG5hbWUoZmlsZW5hbWUpKTt0cnl7T2JqZWN0LmRlZmluZVByb3BlcnR5KHJldHVybmVkRm4sXCJuYW1lXCIse3ZhbHVlOmJhc2VuYW1lLHdyaXRhYmxlOmZhbHNlLGVudW1lcmFibGU6ZmFsc2UsY29uZmlndXJhYmxlOnRydWV9KX1jYXRjaChlKXt9fXJldHVybiByZXR1cm5lZEZufSxnZW5lcmF0ZVNvdXJjZTpmdW5jdGlvbigpe3ZhciBvcHRzPXRoaXMub3B0cztpZihvcHRzLnJtV2hpdGVzcGFjZSl7dGhpcy50ZW1wbGF0ZVRleHQ9dGhpcy50ZW1wbGF0ZVRleHQucmVwbGFjZSgvW1xcclxcbl0rL2csXCJcXG5cIikucmVwbGFjZSgvXlxccyt8XFxzKyQvZ20sXCJcIil9dGhpcy50ZW1wbGF0ZVRleHQ9dGhpcy50ZW1wbGF0ZVRleHQucmVwbGFjZSgvWyBcXHRdKjwlXy9nbSxcIjwlX1wiKS5yZXBsYWNlKC9fJT5bIFxcdF0qL2dtLFwiXyU+XCIpO3ZhciBzZWxmPXRoaXM7dmFyIG1hdGNoZXM9dGhpcy5wYXJzZVRlbXBsYXRlVGV4dCgpO3ZhciBkPXRoaXMub3B0cy5kZWxpbWl0ZXI7dmFyIG89dGhpcy5vcHRzLm9wZW5EZWxpbWl0ZXI7dmFyIGM9dGhpcy5vcHRzLmNsb3NlRGVsaW1pdGVyO2lmKG1hdGNoZXMmJm1hdGNoZXMubGVuZ3RoKXttYXRjaGVzLmZvckVhY2goZnVuY3Rpb24obGluZSxpbmRleCl7dmFyIGNsb3Npbmc7aWYobGluZS5pbmRleE9mKG8rZCk9PT0wJiZsaW5lLmluZGV4T2YobytkK2QpIT09MCl7Y2xvc2luZz1tYXRjaGVzW2luZGV4KzJdO2lmKCEoY2xvc2luZz09ZCtjfHxjbG9zaW5nPT1cIi1cIitkK2N8fGNsb3Npbmc9PVwiX1wiK2QrYykpe3Rocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgbWF0Y2hpbmcgY2xvc2UgdGFnIGZvciBcIicrbGluZSsnXCIuJyl9fXNlbGYuc2NhbkxpbmUobGluZSl9KX19LHBhcnNlVGVtcGxhdGVUZXh0OmZ1bmN0aW9uKCl7dmFyIHN0cj10aGlzLnRlbXBsYXRlVGV4dDt2YXIgcGF0PXRoaXMucmVnZXg7dmFyIHJlc3VsdD1wYXQuZXhlYyhzdHIpO3ZhciBhcnI9W107dmFyIGZpcnN0UG9zO3doaWxlKHJlc3VsdCl7Zmlyc3RQb3M9cmVzdWx0LmluZGV4O2lmKGZpcnN0UG9zIT09MCl7YXJyLnB1c2goc3RyLnN1YnN0cmluZygwLGZpcnN0UG9zKSk7c3RyPXN0ci5zbGljZShmaXJzdFBvcyl9YXJyLnB1c2gocmVzdWx0WzBdKTtzdHI9c3RyLnNsaWNlKHJlc3VsdFswXS5sZW5ndGgpO3Jlc3VsdD1wYXQuZXhlYyhzdHIpfWlmKHN0cil7YXJyLnB1c2goc3RyKX1yZXR1cm4gYXJyfSxfYWRkT3V0cHV0OmZ1bmN0aW9uKGxpbmUpe2lmKHRoaXMudHJ1bmNhdGUpe2xpbmU9bGluZS5yZXBsYWNlKC9eKD86XFxyXFxufFxccnxcXG4pLyxcIlwiKTt0aGlzLnRydW5jYXRlPWZhbHNlfWlmKCFsaW5lKXtyZXR1cm4gbGluZX1saW5lPWxpbmUucmVwbGFjZSgvXFxcXC9nLFwiXFxcXFxcXFxcIik7bGluZT1saW5lLnJlcGxhY2UoL1xcbi9nLFwiXFxcXG5cIik7bGluZT1saW5lLnJlcGxhY2UoL1xcci9nLFwiXFxcXHJcIik7bGluZT1saW5lLnJlcGxhY2UoL1wiL2csJ1xcXFxcIicpO3RoaXMuc291cmNlKz0nICAgIDsgX19hcHBlbmQoXCInK2xpbmUrJ1wiKScrXCJcXG5cIn0sc2NhbkxpbmU6ZnVuY3Rpb24obGluZSl7dmFyIHNlbGY9dGhpczt2YXIgZD10aGlzLm9wdHMuZGVsaW1pdGVyO3ZhciBvPXRoaXMub3B0cy5vcGVuRGVsaW1pdGVyO3ZhciBjPXRoaXMub3B0cy5jbG9zZURlbGltaXRlcjt2YXIgbmV3TGluZUNvdW50PTA7bmV3TGluZUNvdW50PWxpbmUuc3BsaXQoXCJcXG5cIikubGVuZ3RoLTE7c3dpdGNoKGxpbmUpe2Nhc2UgbytkOmNhc2UgbytkK1wiX1wiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5FVkFMO2JyZWFrO2Nhc2UgbytkK1wiPVwiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEO2JyZWFrO2Nhc2UgbytkK1wiLVwiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5SQVc7YnJlYWs7Y2FzZSBvK2QrXCIjXCI6dGhpcy5tb2RlPVRlbXBsYXRlLm1vZGVzLkNPTU1FTlQ7YnJlYWs7Y2FzZSBvK2QrZDp0aGlzLm1vZGU9VGVtcGxhdGUubW9kZXMuTElURVJBTDt0aGlzLnNvdXJjZSs9JyAgICA7IF9fYXBwZW5kKFwiJytsaW5lLnJlcGxhY2UobytkK2QsbytkKSsnXCIpJytcIlxcblwiO2JyZWFrO2Nhc2UgZCtkK2M6dGhpcy5tb2RlPVRlbXBsYXRlLm1vZGVzLkxJVEVSQUw7dGhpcy5zb3VyY2UrPScgICAgOyBfX2FwcGVuZChcIicrbGluZS5yZXBsYWNlKGQrZCtjLGQrYykrJ1wiKScrXCJcXG5cIjticmVhaztjYXNlIGQrYzpjYXNlXCItXCIrZCtjOmNhc2VcIl9cIitkK2M6aWYodGhpcy5tb2RlPT1UZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMKXt0aGlzLl9hZGRPdXRwdXQobGluZSl9dGhpcy5tb2RlPW51bGw7dGhpcy50cnVuY2F0ZT1saW5lLmluZGV4T2YoXCItXCIpPT09MHx8bGluZS5pbmRleE9mKFwiX1wiKT09PTA7YnJlYWs7ZGVmYXVsdDppZih0aGlzLm1vZGUpe3N3aXRjaCh0aGlzLm1vZGUpe2Nhc2UgVGVtcGxhdGUubW9kZXMuRVZBTDpjYXNlIFRlbXBsYXRlLm1vZGVzLkVTQ0FQRUQ6Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5SQVc6aWYobGluZS5sYXN0SW5kZXhPZihcIi8vXCIpPmxpbmUubGFzdEluZGV4T2YoXCJcXG5cIikpe2xpbmUrPVwiXFxuXCJ9fXN3aXRjaCh0aGlzLm1vZGUpe2Nhc2UgVGVtcGxhdGUubW9kZXMuRVZBTDp0aGlzLnNvdXJjZSs9XCIgICAgOyBcIitsaW5lK1wiXFxuXCI7YnJlYWs7Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEOnRoaXMuc291cmNlKz1cIiAgICA7IF9fYXBwZW5kKGVzY2FwZUZuKFwiK3N0cmlwU2VtaShsaW5lKStcIikpXCIrXCJcXG5cIjticmVhaztjYXNlIFRlbXBsYXRlLm1vZGVzLlJBVzp0aGlzLnNvdXJjZSs9XCIgICAgOyBfX2FwcGVuZChcIitzdHJpcFNlbWkobGluZSkrXCIpXCIrXCJcXG5cIjticmVhaztjYXNlIFRlbXBsYXRlLm1vZGVzLkNPTU1FTlQ6YnJlYWs7Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMOnRoaXMuX2FkZE91dHB1dChsaW5lKTticmVha319ZWxzZXt0aGlzLl9hZGRPdXRwdXQobGluZSl9fWlmKHNlbGYub3B0cy5jb21waWxlRGVidWcmJm5ld0xpbmVDb3VudCl7dGhpcy5jdXJyZW50TGluZSs9bmV3TGluZUNvdW50O3RoaXMuc291cmNlKz1cIiAgICA7IF9fbGluZSA9IFwiK3RoaXMuY3VycmVudExpbmUrXCJcXG5cIn19fTtleHBvcnRzLmVzY2FwZVhNTD11dGlscy5lc2NhcGVYTUw7ZXhwb3J0cy5fX2V4cHJlc3M9ZXhwb3J0cy5yZW5kZXJGaWxlO2V4cG9ydHMuVkVSU0lPTj1fVkVSU0lPTl9TVFJJTkc7ZXhwb3J0cy5uYW1lPV9OQU1FO2lmKHR5cGVvZiB3aW5kb3chPVwidW5kZWZpbmVkXCIpe3dpbmRvdy5lanM9ZXhwb3J0c319LHtcIi4uL3BhY2thZ2UuanNvblwiOjYsXCIuL3V0aWxzXCI6MixmczozLHBhdGg6NH1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciByZWdFeHBDaGFycz0vW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7dmFyIGhhc093blByb3BlcnR5PU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7dmFyIGhhc093bj1mdW5jdGlvbihvYmosa2V5KXtyZXR1cm4gaGFzT3duUHJvcGVydHkuYXBwbHkob2JqLFtrZXldKX07ZXhwb3J0cy5lc2NhcGVSZWdFeHBDaGFycz1mdW5jdGlvbihzdHJpbmcpe2lmKCFzdHJpbmcpe3JldHVyblwiXCJ9cmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVnRXhwQ2hhcnMsXCJcXFxcJCZcIil9O3ZhciBfRU5DT0RFX0hUTUxfUlVMRVM9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJiMzNDtcIixcIidcIjpcIiYjMzk7XCJ9O3ZhciBfTUFUQ0hfSFRNTD0vWyY8PidcIl0vZztmdW5jdGlvbiBlbmNvZGVfY2hhcihjKXtyZXR1cm4gX0VOQ09ERV9IVE1MX1JVTEVTW2NdfHxjfXZhciBlc2NhcGVGdW5jU3RyPVwidmFyIF9FTkNPREVfSFRNTF9SVUxFUyA9IHtcXG5cIisnICAgICAgXCImXCI6IFwiJmFtcDtcIlxcbicrJyAgICAsIFwiPFwiOiBcIiZsdDtcIlxcbicrJyAgICAsIFwiPlwiOiBcIiZndDtcIlxcbicrJyAgICAsIFxcJ1wiXFwnOiBcIiYjMzQ7XCJcXG4nKycgICAgLCBcIlxcJ1wiOiBcIiYjMzk7XCJcXG4nK1wiICAgIH1cXG5cIitcIiAgLCBfTUFUQ0hfSFRNTCA9IC9bJjw+J1xcXCJdL2c7XFxuXCIrXCJmdW5jdGlvbiBlbmNvZGVfY2hhcihjKSB7XFxuXCIrXCIgIHJldHVybiBfRU5DT0RFX0hUTUxfUlVMRVNbY10gfHwgYztcXG5cIitcIn07XFxuXCI7ZXhwb3J0cy5lc2NhcGVYTUw9ZnVuY3Rpb24obWFya3VwKXtyZXR1cm4gbWFya3VwPT11bmRlZmluZWQ/XCJcIjpTdHJpbmcobWFya3VwKS5yZXBsYWNlKF9NQVRDSF9IVE1MLGVuY29kZV9jaGFyKX07ZnVuY3Rpb24gZXNjYXBlWE1MVG9TdHJpbmcoKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcykrXCI7XFxuXCIrZXNjYXBlRnVuY1N0cn10cnl7aWYodHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eT09PVwiZnVuY3Rpb25cIil7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMuZXNjYXBlWE1MLFwidG9TdHJpbmdcIix7dmFsdWU6ZXNjYXBlWE1MVG9TdHJpbmd9KX1lbHNle2V4cG9ydHMuZXNjYXBlWE1MLnRvU3RyaW5nPWVzY2FwZVhNTFRvU3RyaW5nfX1jYXRjaChlcnIpe2NvbnNvbGUud2FybihcIlVuYWJsZSB0byBzZXQgZXNjYXBlWE1MLnRvU3RyaW5nIChpcyB0aGUgRnVuY3Rpb24gcHJvdG90eXBlIGZyb3plbj8pXCIpfWV4cG9ydHMuc2hhbGxvd0NvcHk9ZnVuY3Rpb24odG8sZnJvbSl7ZnJvbT1mcm9tfHx7fTtpZih0byE9PW51bGwmJnRvIT09dW5kZWZpbmVkKXtmb3IodmFyIHAgaW4gZnJvbSl7aWYoIWhhc093bihmcm9tLHApKXtjb250aW51ZX1pZihwPT09XCJfX3Byb3RvX19cInx8cD09PVwiY29uc3RydWN0b3JcIil7Y29udGludWV9dG9bcF09ZnJvbVtwXX19cmV0dXJuIHRvfTtleHBvcnRzLnNoYWxsb3dDb3B5RnJvbUxpc3Q9ZnVuY3Rpb24odG8sZnJvbSxsaXN0KXtsaXN0PWxpc3R8fFtdO2Zyb209ZnJvbXx8e307aWYodG8hPT1udWxsJiZ0byE9PXVuZGVmaW5lZCl7Zm9yKHZhciBpPTA7aTxsaXN0Lmxlbmd0aDtpKyspe3ZhciBwPWxpc3RbaV07aWYodHlwZW9mIGZyb21bcF0hPVwidW5kZWZpbmVkXCIpe2lmKCFoYXNPd24oZnJvbSxwKSl7Y29udGludWV9aWYocD09PVwiX19wcm90b19fXCJ8fHA9PT1cImNvbnN0cnVjdG9yXCIpe2NvbnRpbnVlfXRvW3BdPWZyb21bcF19fX1yZXR1cm4gdG99O2V4cG9ydHMuY2FjaGU9e19kYXRhOnt9LHNldDpmdW5jdGlvbihrZXksdmFsKXt0aGlzLl9kYXRhW2tleV09dmFsfSxnZXQ6ZnVuY3Rpb24oa2V5KXtyZXR1cm4gdGhpcy5fZGF0YVtrZXldfSxyZW1vdmU6ZnVuY3Rpb24oa2V5KXtkZWxldGUgdGhpcy5fZGF0YVtrZXldfSxyZXNldDpmdW5jdGlvbigpe3RoaXMuX2RhdGE9e319fTtleHBvcnRzLmh5cGhlblRvQ2FtZWw9ZnVuY3Rpb24oc3RyKXtyZXR1cm4gc3RyLnJlcGxhY2UoLy1bYS16XS9nLGZ1bmN0aW9uKG1hdGNoKXtyZXR1cm4gbWF0Y2hbMV0udG9VcHBlckNhc2UoKX0pfTtleHBvcnRzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGU9ZnVuY3Rpb24oKXtpZih0eXBlb2YgT2JqZWN0LmNyZWF0ZT09XCJmdW5jdGlvblwiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKX19aWYoISh7X19wcm90b19fOm51bGx9aW5zdGFuY2VvZiBPYmplY3QpKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm57X19wcm90b19fOm51bGx9fX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm57fX19KCk7ZXhwb3J0cy5oYXNPd25Pbmx5T2JqZWN0PWZ1bmN0aW9uKG9iail7dmFyIG89ZXhwb3J0cy5jcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlKCk7Zm9yKHZhciBwIGluIG9iail7aWYoaGFzT3duKG9iaixwKSl7b1twXT1vYmpbcF19fXJldHVybiBvfX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe30se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihwcm9jZXNzKXtmdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cyxhbGxvd0Fib3ZlUm9vdCl7dmFyIHVwPTA7Zm9yKHZhciBpPXBhcnRzLmxlbmd0aC0xO2k+PTA7aS0tKXt2YXIgbGFzdD1wYXJ0c1tpXTtpZihsYXN0PT09XCIuXCIpe3BhcnRzLnNwbGljZShpLDEpfWVsc2UgaWYobGFzdD09PVwiLi5cIil7cGFydHMuc3BsaWNlKGksMSk7dXArK31lbHNlIGlmKHVwKXtwYXJ0cy5zcGxpY2UoaSwxKTt1cC0tfX1pZihhbGxvd0Fib3ZlUm9vdCl7Zm9yKDt1cC0tO3VwKXtwYXJ0cy51bnNoaWZ0KFwiLi5cIil9fXJldHVybiBwYXJ0c31leHBvcnRzLnJlc29sdmU9ZnVuY3Rpb24oKXt2YXIgcmVzb2x2ZWRQYXRoPVwiXCIscmVzb2x2ZWRBYnNvbHV0ZT1mYWxzZTtmb3IodmFyIGk9YXJndW1lbnRzLmxlbmd0aC0xO2k+PS0xJiYhcmVzb2x2ZWRBYnNvbHV0ZTtpLS0pe3ZhciBwYXRoPWk+PTA/YXJndW1lbnRzW2ldOnByb2Nlc3MuY3dkKCk7aWYodHlwZW9mIHBhdGghPT1cInN0cmluZ1wiKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3NcIil9ZWxzZSBpZighcGF0aCl7Y29udGludWV9cmVzb2x2ZWRQYXRoPXBhdGgrXCIvXCIrcmVzb2x2ZWRQYXRoO3Jlc29sdmVkQWJzb2x1dGU9cGF0aC5jaGFyQXQoMCk9PT1cIi9cIn1yZXNvbHZlZFBhdGg9bm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdChcIi9cIiksZnVuY3Rpb24ocCl7cmV0dXJuISFwfSksIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oXCIvXCIpO3JldHVybihyZXNvbHZlZEFic29sdXRlP1wiL1wiOlwiXCIpK3Jlc29sdmVkUGF0aHx8XCIuXCJ9O2V4cG9ydHMubm9ybWFsaXplPWZ1bmN0aW9uKHBhdGgpe3ZhciBpc0Fic29sdXRlPWV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSx0cmFpbGluZ1NsYXNoPXN1YnN0cihwYXRoLC0xKT09PVwiL1wiO3BhdGg9bm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoXCIvXCIpLGZ1bmN0aW9uKHApe3JldHVybiEhcH0pLCFpc0Fic29sdXRlKS5qb2luKFwiL1wiKTtpZighcGF0aCYmIWlzQWJzb2x1dGUpe3BhdGg9XCIuXCJ9aWYocGF0aCYmdHJhaWxpbmdTbGFzaCl7cGF0aCs9XCIvXCJ9cmV0dXJuKGlzQWJzb2x1dGU/XCIvXCI6XCJcIikrcGF0aH07ZXhwb3J0cy5pc0Fic29sdXRlPWZ1bmN0aW9uKHBhdGgpe3JldHVybiBwYXRoLmNoYXJBdCgwKT09PVwiL1wifTtleHBvcnRzLmpvaW49ZnVuY3Rpb24oKXt2YXIgcGF0aHM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApO3JldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsZnVuY3Rpb24ocCxpbmRleCl7aWYodHlwZW9mIHAhPT1cInN0cmluZ1wiKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3NcIil9cmV0dXJuIHB9KS5qb2luKFwiL1wiKSl9O2V4cG9ydHMucmVsYXRpdmU9ZnVuY3Rpb24oZnJvbSx0byl7ZnJvbT1leHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO3RvPWV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO2Z1bmN0aW9uIHRyaW0oYXJyKXt2YXIgc3RhcnQ9MDtmb3IoO3N0YXJ0PGFyci5sZW5ndGg7c3RhcnQrKyl7aWYoYXJyW3N0YXJ0XSE9PVwiXCIpYnJlYWt9dmFyIGVuZD1hcnIubGVuZ3RoLTE7Zm9yKDtlbmQ+PTA7ZW5kLS0pe2lmKGFycltlbmRdIT09XCJcIilicmVha31pZihzdGFydD5lbmQpcmV0dXJuW107cmV0dXJuIGFyci5zbGljZShzdGFydCxlbmQtc3RhcnQrMSl9dmFyIGZyb21QYXJ0cz10cmltKGZyb20uc3BsaXQoXCIvXCIpKTt2YXIgdG9QYXJ0cz10cmltKHRvLnNwbGl0KFwiL1wiKSk7dmFyIGxlbmd0aD1NYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLHRvUGFydHMubGVuZ3RoKTt2YXIgc2FtZVBhcnRzTGVuZ3RoPWxlbmd0aDtmb3IodmFyIGk9MDtpPGxlbmd0aDtpKyspe2lmKGZyb21QYXJ0c1tpXSE9PXRvUGFydHNbaV0pe3NhbWVQYXJ0c0xlbmd0aD1pO2JyZWFrfX12YXIgb3V0cHV0UGFydHM9W107Zm9yKHZhciBpPXNhbWVQYXJ0c0xlbmd0aDtpPGZyb21QYXJ0cy5sZW5ndGg7aSsrKXtvdXRwdXRQYXJ0cy5wdXNoKFwiLi5cIil9b3V0cHV0UGFydHM9b3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7cmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oXCIvXCIpfTtleHBvcnRzLnNlcD1cIi9cIjtleHBvcnRzLmRlbGltaXRlcj1cIjpcIjtleHBvcnRzLmRpcm5hbWU9ZnVuY3Rpb24ocGF0aCl7aWYodHlwZW9mIHBhdGghPT1cInN0cmluZ1wiKXBhdGg9cGF0aCtcIlwiO2lmKHBhdGgubGVuZ3RoPT09MClyZXR1cm5cIi5cIjt2YXIgY29kZT1wYXRoLmNoYXJDb2RlQXQoMCk7dmFyIGhhc1Jvb3Q9Y29kZT09PTQ3O3ZhciBlbmQ9LTE7dmFyIG1hdGNoZWRTbGFzaD10cnVlO2Zvcih2YXIgaT1wYXRoLmxlbmd0aC0xO2k+PTE7LS1pKXtjb2RlPXBhdGguY2hhckNvZGVBdChpKTtpZihjb2RlPT09NDcpe2lmKCFtYXRjaGVkU2xhc2gpe2VuZD1pO2JyZWFrfX1lbHNle21hdGNoZWRTbGFzaD1mYWxzZX19aWYoZW5kPT09LTEpcmV0dXJuIGhhc1Jvb3Q/XCIvXCI6XCIuXCI7aWYoaGFzUm9vdCYmZW5kPT09MSl7cmV0dXJuXCIvXCJ9cmV0dXJuIHBhdGguc2xpY2UoMCxlbmQpfTtmdW5jdGlvbiBiYXNlbmFtZShwYXRoKXtpZih0eXBlb2YgcGF0aCE9PVwic3RyaW5nXCIpcGF0aD1wYXRoK1wiXCI7dmFyIHN0YXJ0PTA7dmFyIGVuZD0tMTt2YXIgbWF0Y2hlZFNsYXNoPXRydWU7dmFyIGk7Zm9yKGk9cGF0aC5sZW5ndGgtMTtpPj0wOy0taSl7aWYocGF0aC5jaGFyQ29kZUF0KGkpPT09NDcpe2lmKCFtYXRjaGVkU2xhc2gpe3N0YXJ0PWkrMTticmVha319ZWxzZSBpZihlbmQ9PT0tMSl7bWF0Y2hlZFNsYXNoPWZhbHNlO2VuZD1pKzF9fWlmKGVuZD09PS0xKXJldHVyblwiXCI7cmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsZW5kKX1leHBvcnRzLmJhc2VuYW1lPWZ1bmN0aW9uKHBhdGgsZXh0KXt2YXIgZj1iYXNlbmFtZShwYXRoKTtpZihleHQmJmYuc3Vic3RyKC0xKmV4dC5sZW5ndGgpPT09ZXh0KXtmPWYuc3Vic3RyKDAsZi5sZW5ndGgtZXh0Lmxlbmd0aCl9cmV0dXJuIGZ9O2V4cG9ydHMuZXh0bmFtZT1mdW5jdGlvbihwYXRoKXtpZih0eXBlb2YgcGF0aCE9PVwic3RyaW5nXCIpcGF0aD1wYXRoK1wiXCI7dmFyIHN0YXJ0RG90PS0xO3ZhciBzdGFydFBhcnQ9MDt2YXIgZW5kPS0xO3ZhciBtYXRjaGVkU2xhc2g9dHJ1ZTt2YXIgcHJlRG90U3RhdGU9MDtmb3IodmFyIGk9cGF0aC5sZW5ndGgtMTtpPj0wOy0taSl7dmFyIGNvZGU9cGF0aC5jaGFyQ29kZUF0KGkpO2lmKGNvZGU9PT00Nyl7aWYoIW1hdGNoZWRTbGFzaCl7c3RhcnRQYXJ0PWkrMTticmVha31jb250aW51ZX1pZihlbmQ9PT0tMSl7bWF0Y2hlZFNsYXNoPWZhbHNlO2VuZD1pKzF9aWYoY29kZT09PTQ2KXtpZihzdGFydERvdD09PS0xKXN0YXJ0RG90PWk7ZWxzZSBpZihwcmVEb3RTdGF0ZSE9PTEpcHJlRG90U3RhdGU9MX1lbHNlIGlmKHN0YXJ0RG90IT09LTEpe3ByZURvdFN0YXRlPS0xfX1pZihzdGFydERvdD09PS0xfHxlbmQ9PT0tMXx8cHJlRG90U3RhdGU9PT0wfHxwcmVEb3RTdGF0ZT09PTEmJnN0YXJ0RG90PT09ZW5kLTEmJnN0YXJ0RG90PT09c3RhcnRQYXJ0KzEpe3JldHVyblwiXCJ9cmV0dXJuIHBhdGguc2xpY2Uoc3RhcnREb3QsZW5kKX07ZnVuY3Rpb24gZmlsdGVyKHhzLGYpe2lmKHhzLmZpbHRlcilyZXR1cm4geHMuZmlsdGVyKGYpO3ZhciByZXM9W107Zm9yKHZhciBpPTA7aTx4cy5sZW5ndGg7aSsrKXtpZihmKHhzW2ldLGkseHMpKXJlcy5wdXNoKHhzW2ldKX1yZXR1cm4gcmVzfXZhciBzdWJzdHI9XCJhYlwiLnN1YnN0cigtMSk9PT1cImJcIj9mdW5jdGlvbihzdHIsc3RhcnQsbGVuKXtyZXR1cm4gc3RyLnN1YnN0cihzdGFydCxsZW4pfTpmdW5jdGlvbihzdHIsc3RhcnQsbGVuKXtpZihzdGFydDwwKXN0YXJ0PXN0ci5sZW5ndGgrc3RhcnQ7cmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsbGVuKX19KS5jYWxsKHRoaXMscmVxdWlyZShcIl9wcm9jZXNzXCIpKX0se19wcm9jZXNzOjV9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt2YXIgcHJvY2Vzcz1tb2R1bGUuZXhwb3J0cz17fTt2YXIgY2FjaGVkU2V0VGltZW91dDt2YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O2Z1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKXt0aHJvdyBuZXcgRXJyb3IoXCJzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkXCIpfWZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQoKXt0aHJvdyBuZXcgRXJyb3IoXCJjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWRcIil9KGZ1bmN0aW9uKCl7dHJ5e2lmKHR5cGVvZiBzZXRUaW1lb3V0PT09XCJmdW5jdGlvblwiKXtjYWNoZWRTZXRUaW1lb3V0PXNldFRpbWVvdXR9ZWxzZXtjYWNoZWRTZXRUaW1lb3V0PWRlZmF1bHRTZXRUaW1vdXR9fWNhdGNoKGUpe2NhY2hlZFNldFRpbWVvdXQ9ZGVmYXVsdFNldFRpbW91dH10cnl7aWYodHlwZW9mIGNsZWFyVGltZW91dD09PVwiZnVuY3Rpb25cIil7Y2FjaGVkQ2xlYXJUaW1lb3V0PWNsZWFyVGltZW91dH1lbHNle2NhY2hlZENsZWFyVGltZW91dD1kZWZhdWx0Q2xlYXJUaW1lb3V0fX1jYXRjaChlKXtjYWNoZWRDbGVhclRpbWVvdXQ9ZGVmYXVsdENsZWFyVGltZW91dH19KSgpO2Z1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKXtpZihjYWNoZWRTZXRUaW1lb3V0PT09c2V0VGltZW91dCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuLDApfWlmKChjYWNoZWRTZXRUaW1lb3V0PT09ZGVmYXVsdFNldFRpbW91dHx8IWNhY2hlZFNldFRpbWVvdXQpJiZzZXRUaW1lb3V0KXtjYWNoZWRTZXRUaW1lb3V0PXNldFRpbWVvdXQ7cmV0dXJuIHNldFRpbWVvdXQoZnVuLDApfXRyeXtyZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sMCl9Y2F0Y2goZSl7dHJ5e3JldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCxmdW4sMCl9Y2F0Y2goZSl7cmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLGZ1biwwKX19fWZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpe2lmKGNhY2hlZENsZWFyVGltZW91dD09PWNsZWFyVGltZW91dCl7cmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpfWlmKChjYWNoZWRDbGVhclRpbWVvdXQ9PT1kZWZhdWx0Q2xlYXJUaW1lb3V0fHwhY2FjaGVkQ2xlYXJUaW1lb3V0KSYmY2xlYXJUaW1lb3V0KXtjYWNoZWRDbGVhclRpbWVvdXQ9Y2xlYXJUaW1lb3V0O3JldHVybiBjbGVhclRpbWVvdXQobWFya2VyKX10cnl7cmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpfWNhdGNoKGUpe3RyeXtyZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCxtYXJrZXIpfWNhdGNoKGUpe3JldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLG1hcmtlcil9fX12YXIgcXVldWU9W107dmFyIGRyYWluaW5nPWZhbHNlO3ZhciBjdXJyZW50UXVldWU7dmFyIHF1ZXVlSW5kZXg9LTE7ZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCl7aWYoIWRyYWluaW5nfHwhY3VycmVudFF1ZXVlKXtyZXR1cm59ZHJhaW5pbmc9ZmFsc2U7aWYoY3VycmVudFF1ZXVlLmxlbmd0aCl7cXVldWU9Y3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSl9ZWxzZXtxdWV1ZUluZGV4PS0xfWlmKHF1ZXVlLmxlbmd0aCl7ZHJhaW5RdWV1ZSgpfX1mdW5jdGlvbiBkcmFpblF1ZXVlKCl7aWYoZHJhaW5pbmcpe3JldHVybn12YXIgdGltZW91dD1ydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7ZHJhaW5pbmc9dHJ1ZTt2YXIgbGVuPXF1ZXVlLmxlbmd0aDt3aGlsZShsZW4pe2N1cnJlbnRRdWV1ZT1xdWV1ZTtxdWV1ZT1bXTt3aGlsZSgrK3F1ZXVlSW5kZXg8bGVuKXtpZihjdXJyZW50UXVldWUpe2N1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKX19cXVldWVJbmRleD0tMTtsZW49cXVldWUubGVuZ3RofWN1cnJlbnRRdWV1ZT1udWxsO2RyYWluaW5nPWZhbHNlO3J1bkNsZWFyVGltZW91dCh0aW1lb3V0KX1wcm9jZXNzLm5leHRUaWNrPWZ1bmN0aW9uKGZ1bil7dmFyIGFyZ3M9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMSk7aWYoYXJndW1lbnRzLmxlbmd0aD4xKXtmb3IodmFyIGk9MTtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKXthcmdzW2ktMV09YXJndW1lbnRzW2ldfX1xdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1bixhcmdzKSk7aWYocXVldWUubGVuZ3RoPT09MSYmIWRyYWluaW5nKXtydW5UaW1lb3V0KGRyYWluUXVldWUpfX07ZnVuY3Rpb24gSXRlbShmdW4sYXJyYXkpe3RoaXMuZnVuPWZ1bjt0aGlzLmFycmF5PWFycmF5fUl0ZW0ucHJvdG90eXBlLnJ1bj1mdW5jdGlvbigpe3RoaXMuZnVuLmFwcGx5KG51bGwsdGhpcy5hcnJheSl9O3Byb2Nlc3MudGl0bGU9XCJicm93c2VyXCI7cHJvY2Vzcy5icm93c2VyPXRydWU7cHJvY2Vzcy5lbnY9e307cHJvY2Vzcy5hcmd2PVtdO3Byb2Nlc3MudmVyc2lvbj1cIlwiO3Byb2Nlc3MudmVyc2lvbnM9e307ZnVuY3Rpb24gbm9vcCgpe31wcm9jZXNzLm9uPW5vb3A7cHJvY2Vzcy5hZGRMaXN0ZW5lcj1ub29wO3Byb2Nlc3Mub25jZT1ub29wO3Byb2Nlc3Mub2ZmPW5vb3A7cHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcj1ub29wO3Byb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzPW5vb3A7cHJvY2Vzcy5lbWl0PW5vb3A7cHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXI9bm9vcDtwcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXI9bm9vcDtwcm9jZXNzLmxpc3RlbmVycz1mdW5jdGlvbihuYW1lKXtyZXR1cm5bXX07cHJvY2Vzcy5iaW5kaW5nPWZ1bmN0aW9uKG5hbWUpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpfTtwcm9jZXNzLmN3ZD1mdW5jdGlvbigpe3JldHVyblwiL1wifTtwcm9jZXNzLmNoZGlyPWZ1bmN0aW9uKGRpcil7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkXCIpfTtwcm9jZXNzLnVtYXNrPWZ1bmN0aW9uKCl7cmV0dXJuIDB9fSx7fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHM9e25hbWU6XCJlanNcIixkZXNjcmlwdGlvbjpcIkVtYmVkZGVkIEphdmFTY3JpcHQgdGVtcGxhdGVzXCIsa2V5d29yZHM6W1widGVtcGxhdGVcIixcImVuZ2luZVwiLFwiZWpzXCJdLHZlcnNpb246XCIzLjEuOVwiLGF1dGhvcjpcIk1hdHRoZXcgRWVybmlzc2UgPG1kZUBmbGVlZ2l4Lm9yZz4gKGh0dHA6Ly9mbGVlZ2l4Lm9yZylcIixsaWNlbnNlOlwiQXBhY2hlLTIuMFwiLGJpbjp7ZWpzOlwiLi9iaW4vY2xpLmpzXCJ9LG1haW46XCIuL2xpYi9lanMuanNcIixqc2RlbGl2cjpcImVqcy5taW4uanNcIix1bnBrZzpcImVqcy5taW4uanNcIixyZXBvc2l0b3J5Ont0eXBlOlwiZ2l0XCIsdXJsOlwiZ2l0Oi8vZ2l0aHViLmNvbS9tZGUvZWpzLmdpdFwifSxidWdzOlwiaHR0cHM6Ly9naXRodWIuY29tL21kZS9lanMvaXNzdWVzXCIsaG9tZXBhZ2U6XCJodHRwczovL2dpdGh1Yi5jb20vbWRlL2Vqc1wiLGRlcGVuZGVuY2llczp7amFrZTpcIl4xMC44LjVcIn0sZGV2RGVwZW5kZW5jaWVzOnticm93c2VyaWZ5OlwiXjE2LjUuMVwiLGVzbGludDpcIl42LjguMFwiLFwiZ2l0LWRpcmVjdG9yeS1kZXBsb3lcIjpcIl4xLjUuMVwiLGpzZG9jOlwiXjQuMC4yXCIsXCJscnUtY2FjaGVcIjpcIl40LjAuMVwiLG1vY2hhOlwiXjEwLjIuMFwiLFwidWdsaWZ5LWpzXCI6XCJeMy4zLjE2XCJ9LGVuZ2luZXM6e25vZGU6XCI+PTAuMTAuMFwifSxzY3JpcHRzOnt0ZXN0OlwibnB4IGpha2UgdGVzdFwifX19LHt9XX0se30sWzFdKSgxKX0pO1xuIiwiaW1wb3J0IHRlbXBsYXRlcyBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IHV0aWxzICAgICBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgc2VsZWN0MiAgIGZyb20gJ3NlbGVjdDInO1xyXG5pbXBvcnQgJ2Vqcy9lanMubWluJztcclxuXHJcblxyXG5sZXQgZmllbGRQcml2YXRlID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEBwYXJhbSB7RmllbGRTZWxlY3QyfSBmaWVsZFxyXG4gICAgICogQHJldHVybiB7Kn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNvbnRlbnQ6IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgICAgICAgPSBmaWVsZC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZXMgICAgPSBbXTtcclxuICAgICAgICBsZXQgc2VsZWN0T3B0aW9ucyA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2F0dHInKSB8fFxyXG4gICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5hdHRyICE9PSAnb2JqZWN0JyB8fFxyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPT09IG51bGwgfHxcclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvcHRpb25zLmF0dHIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMubmFtZSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIubmFtZSA9IGZpZWxkLl9vcHRpb25zLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy53aWR0aCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPSB1dGlscy5tZXJnZUF0dHIoXHJcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiAnd2lkdGg6JyArIG9wdGlvbnMud2lkdGggfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXR0clxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyLnJlcXVpcmVkID0gJ3JlcXVpcmVkJztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAkLmVhY2goZmllbGQuX3NlbGVjdE9wdGlvbnMsIGZ1bmN0aW9uIChrZXksIG9wdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvcHRpb24gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLnB1c2godGhhdC5yZW5kZXJPcHRpb24oZmllbGQuX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29wdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBvcHRpb25cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0eXBlJykgJiYgdHlwZW9mIG9wdGlvbi50eXBlID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnR5cGVcclxuICAgICAgICAgICAgICAgICAgICA6ICdvcHRpb24nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnZ3JvdXAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlckF0dHIgICA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncm91cEF0dHIgICAgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXBPcHRpb25zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uaGFzT3duUHJvcGVydHkoJ2F0dHInKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb3B0aW9uLmF0dHIgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICEgQXJyYXkuaXNBcnJheShvcHRpb24uYXR0cilcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBdHRyID0gb3B0aW9uLmF0dHI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmhhc093blByb3BlcnR5KCdsYWJlbCcpICYmIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mKG9wdGlvbi5sYWJlbCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBdHRyLmxhYmVsID0gb3B0aW9uLmxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGdyb3VwQXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb24ub3B0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG9wdGlvbi5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBncm91cE9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBPcHRpb25zLnB1c2godGhhdC5yZW5kZXJPcHRpb24oZmllbGQuX3ZhbHVlLCBncm91cE9wdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdncm91cCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHI6IHJlbmRlckF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyByZW5kZXJBdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogZ3JvdXBPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucy5wdXNoKHRoYXQucmVuZGVyT3B0aW9uKGZpZWxkLl92YWx1ZSwgb3B0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIodGVtcGxhdGVzWydzZWxlY3QuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIHJlYWRvbmx5OiBmYWxzZSxcclxuICAgICAgICAgICAgb3B0aW9uczogc2VsZWN0T3B0aW9ucyxcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7RmllbGRTZWxlY3QyfSBmaWVsZFxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcmVuZGVyQ29udGVudFJlYWRvbmx5OiBmdW5jdGlvbiAoZmllbGQpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgICAgICAgICA9IGZpZWxkO1xyXG4gICAgICAgIGxldCBvcHRpb25zICAgICAgICAgPSBmaWVsZC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkT3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLm9wdGlvbnMgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkob3B0aW9ucy5vcHRpb25zKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkLmVhY2gob3B0aW9ucy5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBvcHRpb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0eXBlJykgJiYgdHlwZW9mIG9wdGlvbi50eXBlID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnR5cGVcclxuICAgICAgICAgICAgICAgICAgICA6ICdvcHRpb24nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnZ3JvdXAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uLm9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChvcHRpb24ub3B0aW9ucywgZnVuY3Rpb24gKGtleSwgZ3JvdXBPcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25UZXh0ID0gZ3JvdXBPcHRpb24uaGFzT3duUHJvcGVydHkoJ3RleHQnKSAmJiBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZihncm91cE9wdGlvbi50ZXh0KSkgPj0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZ3JvdXBPcHRpb24udGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhIG9wdGlvblRleHQgfHwgb3B0aW9uVGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhhdC5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHRoYXQuX3ZhbHVlLCBmdW5jdGlvbiAoa2V5LCBpdGVtVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1WYWx1ZSA9PSBncm91cE9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQuX3ZhbHVlID09IGdyb3VwT3B0aW9uLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25UZXh0ID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0ZXh0JykgJiYgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2Yob3B0aW9uLnRleHQpKSA+PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhIG9wdGlvblRleHQgfHwgb3B0aW9uVGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhhdC5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaCh0aGF0Ll92YWx1ZSwgZnVuY3Rpb24gKGtleSwgaXRlbVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVZhbHVlID09IG9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvblRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5fdmFsdWUgPT0gb3B0aW9uLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvblRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIodGVtcGxhdGVzWydzZWxlY3QuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnM6IHNlbGVjdGVkT3B0aW9ucyxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KHQsdC+0YDQutCwINC+0L/RhtC40LhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgIG9wdGlvblxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcmVuZGVyT3B0aW9uOiBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbikge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uQXR0ciA9IFtdO1xyXG4gICAgICAgIGxldCBvcHRpb25UZXh0ID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0ZXh0JykgJiYgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2Yob3B0aW9uLnRleHQpKSA+PSAwXHJcbiAgICAgICAgICAgID8gb3B0aW9uLnRleHRcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbiwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lICE9PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbkF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgJC5lYWNoKHZhbHVlLCBmdW5jdGlvbiAoa2V5LCBpdGVtVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtVmFsdWUgPT0gb3B0aW9uLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uQXR0ci5wdXNoKCdzZWxlY3RlZD1cInNlbGVjdGVkXCInKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09IG9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICBvcHRpb25BdHRyLnB1c2goJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ29wdGlvbicsXHJcbiAgICAgICAgICAgIHRleHQ6IG9wdGlvblRleHQsXHJcbiAgICAgICAgICAgIGF0dHI6IG9wdGlvbkF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyBvcHRpb25BdHRyLmpvaW4oJyAnKSkgOiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcGFyYW0ge0ZpZWxkU2VsZWN0Mn0gZmllbGRcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyAgICAgICAgPSBmaWVsZC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IHNlbGVjdDJPcHRpb25zID0gb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0MicpICYmIHV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuc2VsZWN0MilcclxuICAgICAgICAgICAgPyBvcHRpb25zLnNlbGVjdDJcclxuICAgICAgICAgICAgOiB7fTtcclxuXHJcbiAgICAgICAgaWYgKCAhIHNlbGVjdDJPcHRpb25zLmhhc093blByb3BlcnR5KCd0aGVtZScpKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdDJPcHRpb25zLnRoZW1lID0gXCJib290c3RyYXAtNVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhIHNlbGVjdDJPcHRpb25zLmhhc093blByb3BlcnR5KCdsYW5ndWFnZScpKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtT3B0aW9ucyA9IGZpZWxkLl9mb3JtLmdldE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybU9wdGlvbnMubGFuZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdDJPcHRpb25zLmxhbmd1YWdlID0gZm9ybU9wdGlvbnMubGFuZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhIHNlbGVjdDJPcHRpb25zLmhhc093blByb3BlcnR5KCdjbG9zZU9uU2VsZWN0JykgJiZcclxuICAgICAgICAgICAgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYXR0cicpICYmXHJcbiAgICAgICAgICAgIHV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuYXR0cikgJiZcclxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyICYmXHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnbXVsdGlwbGUnKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBzZWxlY3QyT3B0aW9ucy5jbG9zZU9uU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxlY3QyKG51bGwsICQpO1xyXG4gICAgICAgICQoJy5jb250ZW50LScgKyBmaWVsZC5nZXRDb250ZW50SWQoKSArICcgc2VsZWN0Jykuc2VsZWN0MihzZWxlY3QyT3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZpZWxkUHJpdmF0ZTsiLCJcclxuaW1wb3J0IGZpZWxkUHJpdmF0ZSBmcm9tICcuL2ZpZWxkLnByaXZhdGUnO1xyXG5cclxuXHJcbi8qKlxyXG4gKlxyXG4gKi9cclxuY2xhc3MgRmllbGRTZWxlY3QyIHtcclxuXHJcbiAgICBfaWQgICAgICAgICAgICA9IG51bGw7XHJcbiAgICBfZm9ybSAgICAgICAgICA9IG51bGw7XHJcbiAgICBfY29udGVudElkICAgICA9ICcnO1xyXG4gICAgX3JlYWRvbmx5ICAgICAgPSBudWxsO1xyXG4gICAgX3ZhbHVlICAgICAgICAgPSBudWxsO1xyXG4gICAgX3NlbGVjdE9wdGlvbnMgPSBbXTtcclxuXHJcbiAgICBfb3B0aW9ucyA9IHtcclxuICAgICAgICB0eXBlOiAnc2VsZWN0MicsXHJcbiAgICAgICAgbmFtZTogbnVsbCxcclxuICAgICAgICBsYWJlbDogbnVsbCxcclxuICAgICAgICBsYWJlbFdpZHRoOiBudWxsLFxyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uSGVscDogbnVsbCxcclxuICAgICAgICBpbnZhbGlkVGV4dDogbnVsbCxcclxuICAgICAgICB2YWxpZFRleHQ6IG51bGwsXHJcbiAgICAgICAgZmllbGRzOiBudWxsLFxyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCBkLWlubGluZS1ibG9jaydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcXVpcmVkOiBudWxsLFxyXG4gICAgICAgIHJlYWRvbmx5OiBudWxsLFxyXG4gICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgcG9zaXRpb246IG51bGwsXHJcbiAgICAgICAgbm9TZW5kOiBudWxsLFxyXG4gICAgICAgIG9wdGlvbnM6IFtdLFxyXG4gICAgICAgIHNlbGVjdDI6IHt9LFxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZvcm1cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGZvcm0sIG9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSAmJlxyXG4gICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5vcHRpb25zID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICBvcHRpb25zLm9wdGlvbnMgIT09IG51bGxcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0T3B0aW9ucyA9IG9wdGlvbnMub3B0aW9uc1xyXG4gICAgICAgICAgICBvcHRpb25zLm9wdGlvbnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9mb3JtICAgICAgPSBmb3JtO1xyXG4gICAgICAgIHRoaXMuX2lkICAgICAgICA9IG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2lkJykgJiYgdHlwZW9mIG9wdGlvbnMuaWQgPT09ICdzdHJpbmcnID8gb3B0aW9ucy5pZCA6ICcnO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnRJZCA9IG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2NvbnRlbnRJZCcpICYmIHR5cGVvZiBvcHRpb25zLmNvbnRlbnRJZCA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmNvbnRlbnRJZCA6ICcnO1xyXG4gICAgICAgIHRoaXMuX3JlYWRvbmx5ICA9IG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3JlYWRvbmx5JykgJiYgdHlwZW9mIG9wdGlvbnMucmVhZG9ubHkgPT09ICdib29sZWFuJyA/IG9wdGlvbnMucmVhZG9ubHkgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSAgICAgPSBvcHRpb25zLmhhc093blByb3BlcnR5KCd2YWx1ZScpICYmIFsnc3RyaW5nJywgJ251bWJlcicsICdvYmplY3QnXS5pbmRleE9mKHR5cGVvZiBvcHRpb25zLnZhbHVlKSA+PSAwID8gb3B0aW9ucy52YWx1ZSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyAgID0gJC5leHRlbmQodHJ1ZSwgdGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG5cclxuICAgICAgICBpZiAoICEgdGhpcy5fcmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgZm9ybS5vbignc2hvdycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkUHJpdmF0ZS5pbml0RXZlbnRzKHRoYXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IGlkINC/0L7Qu9GPXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUgaWQg0LrQvtC90YLQtdC90YLQsNC/0L7Qu9GPXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldENvbnRlbnRJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudElkO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgICogQHJldHVybnMge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0T3B0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuX29wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7QutCw0Lcg0L/QvtC70Y9cclxuICAgICAqIEBwYXJhbSB7aW50fSBkdXJhdGlvblxyXG4gICAgICovXHJcbiAgICBzaG93KGR1cmF0aW9uKSB7XHJcblxyXG4gICAgICAgICQoJyNjb3JldWktZm9ybS0nICsgdGhpcy5nZXRJZCgpKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2QtZmxleCcpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZC1ub25lJylcclxuICAgICAgICAgICAgLmNzcygnb3BhY2l0eScsIDApXHJcbiAgICAgICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uIHx8IDIwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ29wYWNpdHknLCAnJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCh0LrRgNGL0YLQuNC1INC/0L7Qu9GPXHJcbiAgICAgKiBAcGFyYW0ge2ludH0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgaGlkZShkdXJhdGlvbikge1xyXG5cclxuICAgICAgICAkKCcjY29yZXVpLWZvcm0tJyArIHRoaXMuZ2V0SWQoKSlcclxuICAgICAgICAgICAgLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgfSwgZHVyYXRpb24gfHwgMjAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkLWZsZXgnKS5hZGRDbGFzcygnZC1ub25lJykuY3NzKCdvcGFjaXR5JywgJycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQmNC30LzQtdC90LXQvdC40LUg0YDQtdC20LjQvNCwINC/0L7Qu9GPINGC0L7Qu9GM0LrQviDQtNC70Y8g0YfRgtC10L3QuNGPXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkoaXNSZWFkb25seSkge1xyXG5cclxuICAgICAgICB0aGlzLl92YWx1ZSAgICA9IHRoaXMuZ2V0VmFsdWUoKTtcclxuICAgICAgICB0aGlzLl9yZWFkb25seSA9ICEhIGlzUmVhZG9ubHk7XHJcblxyXG4gICAgICAgICQoJy5jb250ZW50LScgKyB0aGlzLl9jb250ZW50SWQpLmh0bWwoXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCAhIGlzUmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgZmllbGRQcml2YXRlLmluaXRFdmVudHModGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSDQt9C90LDRh9C10L3QuNGPINC40Lcg0L/QvtC70Y9cclxuICAgICAqIEByZXR1cm5zIHthcnJheXxzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYXR0cicpICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcy5fb3B0aW9ucy5hdHRyID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAhIEFycmF5LmlzQXJyYXkodGhpcy5fb3B0aW9ucy5hdHRyKSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5hdHRyLmhhc093blByb3BlcnR5KCdtdWx0aXBsZScpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5jb250ZW50LScgKyB0aGlzLmdldENvbnRlbnRJZCgpICsgJyBzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goJCh0aGlzKS52YWwoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkKCcuY29udGVudC0nICsgdGhpcy5nZXRDb250ZW50SWQoKSArICcgc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINC30L3QsNGH0LXQvdC40Y8g0LIg0L/QvtC70LVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xyXG5cclxuICAgICAgICBpZiAoWydzdHJpbmcnLCAnbnVtYmVyJywgJ29iamVjdCddLmluZGV4T2YodHlwZW9mIHZhbHVlKSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmICEgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFsgdmFsdWUgXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aGF0ICAgICAgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb250ZW50SWQgPSB0aGlzLmdldENvbnRlbnRJZCgpO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlICAgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3JlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgICQoJy5jb250ZW50LScgKyBjb250ZW50SWQpLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9zZWxlY3RPcHRpb25zKSAmJlxyXG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh2YWx1ZSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICQuZWFjaCh0aGlzLl9zZWxlY3RPcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBvcHRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2godmFsdWUsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWUgPT0gdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpICYmIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mKG9wdGlvbi50ZXh0KSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2gob3B0aW9uLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdmFsdWUucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoJy5jb250ZW50LScgKyBjb250ZW50SWQpLnRleHQoc2VsZWN0ZWRJdGVtcy5qb2luKCcsICcpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuY29udGVudC0nICsgY29udGVudElkICsgJyBzZWxlY3QgPiBvcHRpb24nKS5wcm9wKCdzZWxlY3RlZCcsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNvbnRlbnQtJyArIGNvbnRlbnRJZCArICcgc2VsZWN0ID4gb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoa2V5LCBpdGVtVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2godmFsdWUsIGZ1bmN0aW9uIChrZXksIHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09ICQoaXRlbVZhbHVlKS52YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChpdGVtVmFsdWUpLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll92YWx1ZS5wdXNoKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0LLQsNC70LjQtNC90L7RgdGC0Lgg0L/QvtC70Y9cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxudWxsfSBpc1ZhbGlkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZShpc1ZhbGlkLCB0ZXh0KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yZWFkb25seSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29udGFpbmVyID0gJCgnLmNvbnRlbnQtJyArIHRoaXMuZ2V0Q29udGVudElkKCkpO1xyXG4gICAgICAgIGxldCBzZWxlY3QgICAgPSAkKCdzZWxlY3QnLCBjb250YWluZXIpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuZmluZCgnLnZhbGlkLWZlZWRiYWNrJykucmVtb3ZlKCk7XHJcbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy5pbnZhbGlkLWZlZWRiYWNrJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIGlmIChpc1ZhbGlkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdC5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLXZhbGlkJyk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgc2VsZWN0LmFkZENsYXNzKCdpcy12YWxpZCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZXh0ID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5fb3B0aW9ucy52YWxpZFRleHQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGhpcy5fb3B0aW9ucy52YWxpZFRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ2YWxpZC1mZWVkYmFja1wiPicgKyB0ZXh0ICsgJzwvZGl2PicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy12YWxpZCcpO1xyXG4gICAgICAgICAgICBzZWxlY3QuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5pbnZhbGlkVGV4dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGhpcy5fb3B0aW9ucy5pbnZhbGlkVGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAhIHRleHQgJiYgdGhpcy5fb3B0aW9ucy5yZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0aGlzLl9mb3JtLmdldExhbmcoKS5yZXF1aXJlZF9maWVsZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cImludmFsaWQtZmVlZGJhY2tcIj4nICsgdGV4dCArICc8L2Rpdj4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9GA0L7QstC10YDQutCwINCy0LDQu9C40LTQvdC+0YHRgtC4INC/0L7Qu9GPXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufG51bGx9XHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWQoKSB7XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3QgPSAkKCcuY29udGVudC0nICsgdGhpcy5nZXRDb250ZW50SWQoKSArICcgc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnJlcXVpcmVkICYmIHNlbGVjdC52YWwoKSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdFswXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0LmlzKCc6dmFsaWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0YDQvtCy0LXRgNC60LAg0L3QsCDRgtC+LCDRh9GC0L4g0L/QvtC70LUg0LzQvtC20L3QviDQvtGC0L/RgNCw0LLQu9GP0YLRjFxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNBbGxveVNlbmQoKSB7XHJcbiAgICAgICAgcmV0dXJuICEgdGhpcy5fb3B0aW9ucy5ub1NlbmQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LAg0L/QvtC70Y9cclxuICAgICAqIEByZXR1cm4geyp9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNvbnRlbnQoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkb25seVxyXG4gICAgICAgICAgICA/IGZpZWxkUHJpdmF0ZS5yZW5kZXJDb250ZW50UmVhZG9ubHkodGhpcylcclxuICAgICAgICAgICAgOiBmaWVsZFByaXZhdGUucmVuZGVyQ29udGVudCh0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpZWxkU2VsZWN0MjsiXSwibmFtZXMiOlsidHBsIiwiT2JqZWN0IiwiY3JlYXRlIiwidXRpbHMiLCJtZXJnZUF0dHIiLCJhdHRyMSIsImF0dHIyIiwiYXNzaWduIiwiX3R5cGVvZiIsIiQiLCJlYWNoIiwibmFtZSIsInZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJpc09iamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicm9vdCIsImpRdWVyeSIsInVuZGVmaW5lZCIsIndpbmRvdyIsInJlcXVpcmUkJDAiLCJTMiIsImZuIiwic2VsZWN0MiIsImFtZCIsInJlcXVpcmVqcyIsInJlcXVpcmUiLCJkZWZpbmUiLCJ1bmRlZiIsIm1haW4iLCJyZXEiLCJtYWtlTWFwIiwiaGFuZGxlcnMiLCJkZWZpbmVkIiwid2FpdGluZyIsImNvbmZpZyIsImRlZmluaW5nIiwiaGFzT3duIiwicHJvdG90eXBlIiwiYXBzIiwic2xpY2UiLCJqc1N1ZmZpeFJlZ0V4cCIsImhhc1Byb3AiLCJvYmoiLCJwcm9wIiwiY2FsbCIsIm5vcm1hbGl6ZSIsImJhc2VOYW1lIiwibmFtZVBhcnRzIiwibmFtZVNlZ21lbnQiLCJtYXBWYWx1ZSIsImZvdW5kTWFwIiwibGFzdEluZGV4IiwiZm91bmRJIiwiZm91bmRTdGFyTWFwIiwic3RhckkiLCJpIiwiaiIsInBhcnQiLCJub3JtYWxpemVkQmFzZVBhcnRzIiwiYmFzZVBhcnRzIiwic3BsaXQiLCJtYXAiLCJzdGFyTWFwIiwibGVuZ3RoIiwibm9kZUlkQ29tcGF0IiwidGVzdCIsInJlcGxhY2UiLCJjaGFyQXQiLCJjb25jYXQiLCJzcGxpY2UiLCJqb2luIiwibWFrZVJlcXVpcmUiLCJyZWxOYW1lIiwiZm9yY2VTeW5jIiwiYXJncyIsImFyZ3VtZW50cyIsInB1c2giLCJhcHBseSIsIm1ha2VOb3JtYWxpemUiLCJtYWtlTG9hZCIsImRlcE5hbWUiLCJjYWxsRGVwIiwiRXJyb3IiLCJzcGxpdFByZWZpeCIsInByZWZpeCIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsIm1ha2VSZWxQYXJ0cyIsInJlbFBhcnRzIiwicGx1Z2luIiwicGFydHMiLCJyZWxSZXNvdXJjZU5hbWUiLCJmIiwibiIsInByIiwicCIsIm1ha2VDb25maWciLCJlIiwiaWQiLCJ1cmkiLCJkZXBzIiwiY2FsbGJhY2siLCJjanNNb2R1bGUiLCJyZXQiLCJjYWxsYmFja1R5cGUiLCJ1c2luZ0V4cG9ydHMiLCJsb2FkIiwiYWx0Iiwic2V0VGltZW91dCIsImNmZyIsIl9kZWZpbmVkIiwiXyQiLCJjb25zb2xlIiwiZXJyb3IiLCJVdGlscyIsIkV4dGVuZCIsIkNoaWxkQ2xhc3MiLCJTdXBlckNsYXNzIiwiX19oYXNQcm9wIiwiQmFzZUNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3IiLCJrZXkiLCJfX3N1cGVyX18iLCJnZXRNZXRob2RzIiwidGhlQ2xhc3MiLCJwcm90byIsIm1ldGhvZHMiLCJtZXRob2ROYW1lIiwibSIsIkRlY29yYXRlIiwiRGVjb3JhdG9yQ2xhc3MiLCJkZWNvcmF0ZWRNZXRob2RzIiwic3VwZXJNZXRob2RzIiwiRGVjb3JhdGVkQ2xhc3MiLCJ1bnNoaWZ0IiwiYXJnQ291bnQiLCJjYWxsZWRDb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiY3RyIiwic3VwZXJNZXRob2QiLCJjYWxsZWRNZXRob2QiLCJvcmlnaW5hbE1ldGhvZCIsImRlY29yYXRlZE1ldGhvZCIsImQiLCJPYnNlcnZhYmxlIiwibGlzdGVuZXJzIiwib24iLCJldmVudCIsInRyaWdnZXIiLCJwYXJhbXMiLCJfdHlwZSIsImludm9rZSIsImxlbiIsImdlbmVyYXRlQ2hhcnMiLCJjaGFycyIsInJhbmRvbUNoYXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJpbmQiLCJmdW5jIiwiY29udGV4dCIsIl9jb252ZXJ0RGF0YSIsImRhdGEiLCJvcmlnaW5hbEtleSIsImtleXMiLCJkYXRhTGV2ZWwiLCJrIiwidG9Mb3dlckNhc2UiLCJoYXNTY3JvbGwiLCJlbCIsIiRlbCIsIm92ZXJmbG93WCIsInN0eWxlIiwib3ZlcmZsb3dZIiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJpbm5lcldpZHRoIiwic2Nyb2xsV2lkdGgiLCJlc2NhcGVNYXJrdXAiLCJtYXJrdXAiLCJyZXBsYWNlTWFwIiwiU3RyaW5nIiwibWF0Y2giLCJfX2NhY2hlIiwiR2V0VW5pcXVlRWxlbWVudElkIiwiZWxlbWVudCIsInNlbGVjdDJJZCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIlN0b3JlRGF0YSIsIkdldERhdGEiLCJSZW1vdmVEYXRhIiwicmVtb3ZlQXR0cmlidXRlIiwiY29weU5vbkludGVybmFsQ3NzQ2xhc3NlcyIsImRlc3QiLCJzcmMiLCJkZXN0aW5hdGlvbkNsYXNzZXMiLCJ0cmltIiwiZmlsdGVyIiwiY2xhenoiLCJzb3VyY2VDbGFzc2VzIiwicmVwbGFjZW1lbnRzIiwiUmVzdWx0cyIsIiRlbGVtZW50Iiwib3B0aW9ucyIsImRhdGFBZGFwdGVyIiwicmVuZGVyIiwiJHJlc3VsdHMiLCJnZXQiLCJhdHRyIiwiY2xlYXIiLCJlbXB0eSIsImRpc3BsYXlNZXNzYWdlIiwiaGlkZUxvYWRpbmciLCIkbWVzc2FnZSIsIm1lc3NhZ2UiLCJhcHBlbmQiLCJjbGFzc05hbWUiLCJoaWRlTWVzc2FnZXMiLCJmaW5kIiwicmVtb3ZlIiwiJG9wdGlvbnMiLCJyZXN1bHRzIiwiY2hpbGRyZW4iLCJzb3J0IiwiaXRlbSIsIiRvcHRpb24iLCJvcHRpb24iLCJwb3NpdGlvbiIsIiRkcm9wZG93biIsIiRyZXN1bHRzQ29udGFpbmVyIiwic29ydGVyIiwiaGlnaGxpZ2h0Rmlyc3RJdGVtIiwiJHNlbGVjdGVkIiwiZmlyc3QiLCJlbnN1cmVIaWdobGlnaHRWaXNpYmxlIiwic2V0Q2xhc3NlcyIsInNlbGYiLCJjdXJyZW50Iiwic2VsZWN0ZWQiLCJzZWxlY3RlZElkcyIsInMiLCJjbGFzc0xpc3QiLCJhZGQiLCJzaG93TG9hZGluZyIsImxvYWRpbmdNb3JlIiwibG9hZGluZyIsImRpc2FibGVkIiwidGV4dCIsIiRsb2FkaW5nIiwicHJlcGVuZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImF0dHJzIiwibWF0Y2hlcyIsIkVsZW1lbnQiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIl9yZXN1bHRJZCIsInRpdGxlIiwicm9sZSIsInZhbCIsImxhYmVsIiwidGVtcGxhdGUiLCIkY2hpbGRyZW4iLCJjIiwiY2hpbGQiLCIkY2hpbGQiLCIkY2hpbGRyZW5Db250YWluZXIiLCJjb250YWluZXIiLCIkY29udGFpbmVyIiwiaXNPcGVuIiwicmVtb3ZlQXR0ciIsIiRoaWdobGlnaHRlZCIsImdldEhpZ2hsaWdodGVkUmVzdWx0cyIsImhhc0NsYXNzIiwiY3VycmVudEluZGV4IiwibmV4dEluZGV4IiwiJG5leHQiLCJlcSIsImN1cnJlbnRPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJuZXh0VG9wIiwibmV4dE9mZnNldCIsInNjcm9sbFRvcCIsIm91dGVySGVpZ2h0IiwibmV4dEJvdHRvbSIsIm1vdXNld2hlZWwiLCJib3R0b20iLCJkZWx0YVkiLCJpc0F0VG9wIiwiaXNBdEJvdHRvbSIsImhlaWdodCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZXZ0IiwiJHRoaXMiLCJvcmlnaW5hbEV2ZW50IiwicmVtb3ZlQ2xhc3MiLCJkZXN0cm95Iiwib2Zmc2V0RGVsdGEiLCJyZXN1bHQiLCJjb250ZW50IiwiZGlzcGxheSIsImlubmVySFRNTCIsIktFWVMiLCJCQUNLU1BBQ0UiLCJUQUIiLCJFTlRFUiIsIlNISUZUIiwiQ1RSTCIsIkFMVCIsIkVTQyIsIlNQQUNFIiwiUEFHRV9VUCIsIlBBR0VfRE9XTiIsIkVORCIsIkhPTUUiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkRPV04iLCJERUxFVEUiLCJCYXNlU2VsZWN0aW9uIiwiJHNlbGVjdGlvbiIsIl90YWJpbmRleCIsInJlc3VsdHNJZCIsIl9oYW5kbGVCbHVyIiwid2hpY2giLCJ1cGRhdGUiLCJfYXR0YWNoQ2xvc2VIYW5kbGVyIiwiX2RldGFjaENsb3NlSGFuZGxlciIsImFjdGl2ZUVsZW1lbnQiLCJjb250YWlucyIsImJvZHkiLCIkdGFyZ2V0IiwidGFyZ2V0IiwiJHNlbGVjdCIsImNsb3Nlc3QiLCIkYWxsIiwib2ZmIiwiJHNlbGVjdGlvbkNvbnRhaW5lciIsImlzRW5hYmxlZCIsImlzRGlzYWJsZWQiLCJTaW5nbGVTZWxlY3Rpb24iLCJodG1sIiwiJHJlbmRlcmVkIiwic2VsZWN0aW9uQ29udGFpbmVyIiwic2VsZWN0aW9uIiwiZm9ybWF0dGVkIiwiTXVsdGlwbGVTZWxlY3Rpb24iLCIkcmVtb3ZlIiwicGFyZW50IiwiJHNlbGVjdGlvbnMiLCJzZWxlY3Rpb25JZFByZWZpeCIsInNlbGVjdGlvbklkIiwicmVtb3ZlSXRlbSIsIlBsYWNlaG9sZGVyIiwiZGVjb3JhdGVkIiwicGxhY2Vob2xkZXIiLCJub3JtYWxpemVQbGFjZWhvbGRlciIsIl8iLCJjcmVhdGVQbGFjZWhvbGRlciIsIiRwbGFjZWhvbGRlciIsInBsYWNlaG9sZGVyVGl0bGUiLCJzaW5nbGVQbGFjZWhvbGRlciIsIm11bHRpcGxlU2VsZWN0aW9ucyIsIkFsbG93Q2xlYXIiLCJfaGFuZGxlQ2xlYXIiLCJfaGFuZGxlS2V5Ym9hcmRDbGVhciIsIiRjbGVhciIsInByZXZpb3VzVmFsIiwidW5zZWxlY3REYXRhIiwicHJldmVudGVkIiwicmVtb3ZlQWxsIiwiU2VhcmNoIiwic2VhcmNoTGFiZWwiLCIkc2VhcmNoIiwiJHNlYXJjaENvbnRhaW5lciIsIl90cmFuc2ZlclRhYkluZGV4IiwicmVzaXplU2VhcmNoIiwiX2tleVVwUHJldmVudGVkIiwiaXNEZWZhdWx0UHJldmVudGVkIiwiJHByZXZpb3VzQ2hvaWNlIiwibGFzdCIsInNlYXJjaFJlbW92ZUNob2ljZSIsIm1zaWUiLCJkb2N1bWVudE1vZGUiLCJkaXNhYmxlSW5wdXRFdmVudHMiLCJ0eXBlIiwiaGFuZGxlU2VhcmNoIiwic2VhcmNoSGFkRm9jdXMiLCJpbnB1dCIsInRlcm0iLCJjc3MiLCJ3aWR0aCIsIm1pbmltdW1XaWR0aCIsIlNlbGVjdGlvbkNTUyIsInNlbGVjdGlvbkNzc0NsYXNzIiwiYWRkQ2xhc3MiLCJFdmVudFJlbGF5IiwicmVsYXlFdmVudHMiLCJwcmV2ZW50YWJsZUV2ZW50cyIsIkV2ZW50IiwiVHJhbnNsYXRpb24iLCJkaWN0IiwiYWxsIiwiZXh0ZW5kIiwidHJhbnNsYXRpb24iLCJfY2FjaGUiLCJsb2FkUGF0aCIsInBhdGgiLCJ0cmFuc2xhdGlvbnMiLCJkaWFjcml0aWNzIiwiQmFzZUFkYXB0ZXIiLCJxdWVyeSIsImdlbmVyYXRlUmVzdWx0SWQiLCJTZWxlY3RBZGFwdGVyIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdGVkRWxlbWVudCIsInNlbGVjdCIsInRhZ05hbWUiLCJjdXJyZW50RGF0YSIsInVuc2VsZWN0IiwiYWRkT3B0aW9ucyIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0Iiwibm9ybWFsaXplZERhdGEiLCJfbm9ybWFsaXplSXRlbSIsImRlZmF1bHRzIiwibWF0Y2hlciIsIkFycmF5QWRhcHRlciIsIl9kYXRhVG9Db252ZXJ0IiwiY29udmVydFRvT3B0aW9ucyIsImVsbSIsIiRleGlzdGluZyIsImV4aXN0aW5nSWRzIiwib25seUl0ZW0iLCIkZXhpc3RpbmdPcHRpb24iLCJleGlzdGluZ0RhdGEiLCJuZXdEYXRhIiwiJG5ld09wdGlvbiIsInJlcGxhY2VXaXRoIiwiQWpheEFkYXB0ZXIiLCJhamF4T3B0aW9ucyIsIl9hcHBseURlZmF1bHRzIiwicHJvY2Vzc1Jlc3VsdHMiLCJxIiwidHJhbnNwb3J0Iiwic3VjY2VzcyIsImZhaWx1cmUiLCIkcmVxdWVzdCIsImFqYXgiLCJ0aGVuIiwiZmFpbCIsIl9yZXF1ZXN0IiwiYWJvcnQiLCJ1cmwiLCJyZXF1ZXN0Iiwic3RhdHVzIiwiZGVsYXkiLCJfcXVlcnlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiVGFncyIsInRhZ3MiLCJjcmVhdGVUYWciLCJpbnNlcnRUYWciLCJ0IiwidGFnIiwiX3JlbW92ZU9sZFRhZ3MiLCJwYWdlIiwid3JhcHBlciIsImNoZWNrQ2hpbGRyZW4iLCJvcHRpb25UZXh0IiwidG9VcHBlckNhc2UiLCJwYXJhbXNUZXJtIiwiY2hlY2tUZXh0IiwiVG9rZW5pemVyIiwidG9rZW5pemVyIiwiZHJvcGRvd24iLCJjcmVhdGVBbmRTZWxlY3QiLCIkZXhpc3RpbmdPcHRpb25zIiwidG9rZW5EYXRhIiwic2VwYXJhdG9ycyIsInRlcm1DaGFyIiwic3Vic3RyIiwicGFydFBhcmFtcyIsIk1pbmltdW1JbnB1dExlbmd0aCIsIiRlIiwibWluaW11bUlucHV0TGVuZ3RoIiwibWluaW11bSIsIk1heGltdW1JbnB1dExlbmd0aCIsIm1heGltdW1JbnB1dExlbmd0aCIsIm1heGltdW0iLCJNYXhpbXVtU2VsZWN0aW9uTGVuZ3RoIiwibWF4aW11bVNlbGVjdGlvbkxlbmd0aCIsIl9jaGVja0lmTWF4aW11bVNlbGVjdGVkIiwic3VjY2Vzc0NhbGxiYWNrIiwiY291bnQiLCJEcm9wZG93biIsInNob3dTZWFyY2giLCJIaWRlUGxhY2Vob2xkZXIiLCJyZW1vdmVQbGFjZWhvbGRlciIsIm1vZGlmaWVkRGF0YSIsIkluZmluaXRlU2Nyb2xsIiwibGFzdFBhcmFtcyIsIiRsb2FkaW5nTW9yZSIsImNyZWF0ZUxvYWRpbmdNb3JlIiwic2hvd0xvYWRpbmdNb3JlIiwibG9hZE1vcmVJZk5lZWRlZCIsImlzTG9hZE1vcmVWaXNpYmxlIiwiZG9jdW1lbnRFbGVtZW50IiwibG9hZGluZ01vcmVPZmZzZXQiLCJsb2FkTW9yZSIsInBhZ2luYXRpb24iLCJtb3JlIiwiQXR0YWNoQm9keSIsIiRkcm9wZG93blBhcmVudCIsIl9zaG93RHJvcGRvd24iLCJfYXR0YWNoUG9zaXRpb25pbmdIYW5kbGVyIiwiX2JpbmRDb250YWluZXJSZXN1bHRIYW5kbGVycyIsIl9oaWRlRHJvcGRvd24iLCJfZGV0YWNoUG9zaXRpb25pbmdIYW5kbGVyIiwiJGRyb3Bkb3duQ29udGFpbmVyIiwiZGV0YWNoIiwiX2NvbnRhaW5lclJlc3VsdHNIYW5kbGVyc0JvdW5kIiwiX3Bvc2l0aW9uRHJvcGRvd24iLCJfcmVzaXplRHJvcGRvd24iLCJzY3JvbGxFdmVudCIsInJlc2l6ZUV2ZW50Iiwib3JpZW50YXRpb25FdmVudCIsIiR3YXRjaGVycyIsInBhcmVudHMiLCJ4Iiwic2Nyb2xsTGVmdCIsInkiLCJldiIsIiR3aW5kb3ciLCJpc0N1cnJlbnRseUFib3ZlIiwiaXNDdXJyZW50bHlCZWxvdyIsIm5ld0RpcmVjdGlvbiIsInZpZXdwb3J0IiwiZW5vdWdoUm9vbUFib3ZlIiwiZW5vdWdoUm9vbUJlbG93IiwibGVmdCIsIiRvZmZzZXRQYXJlbnQiLCJvZmZzZXRQYXJlbnQiLCJwYXJlbnRPZmZzZXQiLCJpc0Nvbm5lY3RlZCIsIm91dGVyV2lkdGgiLCJtaW5XaWR0aCIsImFwcGVuZFRvIiwiY291bnRSZXN1bHRzIiwiTWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIkluZmluaXR5IiwiU2VsZWN0T25DbG9zZSIsIl9oYW5kbGVTZWxlY3RPbkNsb3NlIiwib3JpZ2luYWxTZWxlY3QyRXZlbnQiLCIkaGlnaGxpZ2h0ZWRSZXN1bHRzIiwiQ2xvc2VPblNlbGVjdCIsIl9zZWxlY3RUcmlnZ2VyZWQiLCJjdHJsS2V5IiwibWV0YUtleSIsIkRyb3Bkb3duQ1NTIiwiZHJvcGRvd25Dc3NDbGFzcyIsIlRhZ3NTZWFyY2hIaWdobGlnaHQiLCIkZmlyc3RPcHRpb24iLCJmaXJzdEVsZW1lbnQiLCJlcnJvckxvYWRpbmciLCJpbnB1dFRvb0xvbmciLCJvdmVyQ2hhcnMiLCJpbnB1dFRvb1Nob3J0IiwicmVtYWluaW5nQ2hhcnMiLCJtYXhpbXVtU2VsZWN0ZWQiLCJub1Jlc3VsdHMiLCJzZWFyY2hpbmciLCJyZW1vdmVBbGxJdGVtcyIsInNlYXJjaCIsIlJlc3VsdHNMaXN0IiwiU2VsZWN0aW9uU2VhcmNoIiwiRElBQ1JJVElDUyIsIlNlbGVjdERhdGEiLCJBcnJheURhdGEiLCJBamF4RGF0YSIsIkRyb3Bkb3duU2VhcmNoIiwiRW5nbGlzaFRyYW5zbGF0aW9uIiwiRGVmYXVsdHMiLCJyZXNldCIsInRva2VuU2VwYXJhdG9ycyIsInJlc3VsdHNBZGFwdGVyIiwic2VsZWN0T25DbG9zZSIsImRyb3Bkb3duQWRhcHRlciIsIm11bHRpcGxlIiwiU2VhcmNoYWJsZURyb3Bkb3duIiwiY2xvc2VPblNlbGVjdCIsInNlbGVjdGlvbkFkYXB0ZXIiLCJhbGxvd0NsZWFyIiwibGFuZ3VhZ2UiLCJfcmVzb2x2ZUxhbmd1YWdlIiwidW5pcXVlTGFuZ3VhZ2VzIiwibCIsIl9wcm9jZXNzVHJhbnNsYXRpb25zIiwiZGVidWciLCJzdHJpcERpYWNyaXRpY3MiLCJhIiwib3JpZ2luYWwiLCJhbWRMYW5ndWFnZUJhc2UiLCJhdXRvY29tcGxldGUiLCJkcm9wZG93bkF1dG9XaWR0aCIsInNjcm9sbEFmdGVyU2VsZWN0IiwidGVtcGxhdGVSZXN1bHQiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsInRoZW1lIiwiYXBwbHlGcm9tRWxlbWVudCIsIm9wdGlvbkxhbmd1YWdlIiwiZGVmYXVsdExhbmd1YWdlIiwiZWxlbWVudExhbmd1YWdlIiwicGFyZW50TGFuZ3VhZ2UiLCJsYW5ndWFnZXMiLCJpc0VtcHR5T2JqZWN0IiwiaXNQbGFpbk9iamVjdCIsInJlc29sdmVkTGFuZ3VhZ2VzIiwibGFuZ3VhZ2VQYXJ0cyIsImJhc2VMYW5ndWFnZSIsImxhbmd1YWdlRGF0YSIsImV4Iiwid2FybiIsInNldCIsImNhbWVsS2V5IiwiY2FtZWxDYXNlIiwiY29udmVydGVkRGF0YSIsIk9wdGlvbnMiLCJmcm9tRWxlbWVudCIsImV4Y2x1ZGVkRGF0YSIsImRpciIsImRhdGFzZXQiLCJ1cHBlckNhc2VMZXR0ZXIiLCJsZXR0ZXIiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlTmFtZSIsImRhdGFOYW1lIiwiZGF0YVZhbHVlIiwiY2FtZWxEYXRhTmFtZSIsImpxdWVyeSIsIlNlbGVjdDIiLCJfZ2VuZXJhdGVJZCIsInRhYmluZGV4IiwiRGF0YUFkYXB0ZXIiLCJfcGxhY2VDb250YWluZXIiLCJTZWxlY3Rpb25BZGFwdGVyIiwiRHJvcGRvd25BZGFwdGVyIiwiUmVzdWx0c0FkYXB0ZXIiLCJfYmluZEFkYXB0ZXJzIiwiX3JlZ2lzdGVyRG9tRXZlbnRzIiwiX3JlZ2lzdGVyRGF0YUV2ZW50cyIsIl9yZWdpc3RlclNlbGVjdGlvbkV2ZW50cyIsIl9yZWdpc3RlckRyb3Bkb3duRXZlbnRzIiwiX3JlZ2lzdGVyUmVzdWx0c0V2ZW50cyIsIl9yZWdpc3RlckV2ZW50cyIsImluaXRpYWxEYXRhIiwiX3N5bmNBdHRyaWJ1dGVzIiwiaW5zZXJ0QWZ0ZXIiLCJfcmVzb2x2ZVdpZHRoIiwibWV0aG9kIiwiV0lEVEgiLCJzdHlsZVdpZHRoIiwiZWxlbWVudFdpZHRoIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJfc3luY0EiLCJfc3luY1MiLCJfc3luY1N1YnRyZWUiLCJfb2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJub25SZWxheUV2ZW50cyIsInRvZ2dsZURyb3Bkb3duIiwiZm9jdXMiLCJhbHRLZXkiLCJjbG9zZSIsIm9wZW4iLCJfaXNDaGFuZ2VNdXRhdGlvbiIsImFkZGVkTm9kZXMiLCJub2RlIiwicmVtb3ZlZE5vZGVzIiwic29tZSIsIm11dGF0aW9uIiwiY2hhbmdlZCIsImFjdHVhbFRyaWdnZXIiLCJwcmVUcmlnZ2VyTWFwIiwicHJlVHJpZ2dlck5hbWUiLCJwcmVUcmlnZ2VyQXJncyIsImhhc0ZvY3VzIiwiZW5hYmxlIiwibmV3VmFsIiwiZGlzY29ubmVjdCIsInJlbW92ZURhdGEiLCJ0aGlzTWV0aG9kcyIsImluc3RhbmNlT3B0aW9ucyIsImluc3RhbmNlIiwiciIsIm8iLCJ1IiwiY29kZSIsImZzIiwic2NvcGVPcHRpb25XYXJuZWQiLCJfVkVSU0lPTl9TVFJJTkciLCJ2ZXJzaW9uIiwiX0RFRkFVTFRfT1BFTl9ERUxJTUlURVIiLCJfREVGQVVMVF9DTE9TRV9ERUxJTUlURVIiLCJfREVGQVVMVF9ERUxJTUlURVIiLCJfREVGQVVMVF9MT0NBTFNfTkFNRSIsIl9OQU1FIiwiX1JFR0VYX1NUUklORyIsIl9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQSIsIl9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQV9FWFBSRVNTIiwiX0JPTSIsIl9KU19JREVOVElGSUVSIiwiY2FjaGUiLCJmaWxlTG9hZGVyIiwicmVhZEZpbGVTeW5jIiwibG9jYWxzTmFtZSIsInByb21pc2VJbXBsIiwiRnVuY3Rpb24iLCJQcm9taXNlIiwicmVzb2x2ZUluY2x1ZGUiLCJmaWxlbmFtZSIsImlzRGlyIiwiZGlybmFtZSIsImV4dG5hbWUiLCJyZXNvbHZlIiwiaW5jbHVkZVBhdGgiLCJleHQiLCJyZXNvbHZlUGF0aHMiLCJwYXRocyIsImZpbGVQYXRoIiwidiIsImV4aXN0c1N5bmMiLCJnZXRJbmNsdWRlUGF0aCIsInZpZXdzIiwiZXhlYyIsImluY2x1ZGVyIiwiZXNjYXBlRnVuY3Rpb24iLCJoYW5kbGVDYWNoZSIsImhhc1RlbXBsYXRlIiwiY29tcGlsZSIsInRyeUhhbmRsZUNhY2hlIiwiY2IiLCJyZWplY3QiLCJlcnIiLCJpbmNsdWRlRmlsZSIsIm9wdHMiLCJzaGFsbG93Q29weSIsImNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUiLCJpbmNsdWRlclJlc3VsdCIsInJldGhyb3ciLCJzdHIiLCJmbG5tIiwibGluZW5vIiwiZXNjIiwibGluZXMiLCJzdGFydCIsIm1heCIsImVuZCIsIm1pbiIsImxpbmUiLCJjdXJyIiwic3RyaXBTZW1pIiwidGVtcGwiLCJzY29wZSIsIlRlbXBsYXRlIiwic2hhbGxvd0NvcHlGcm9tTGlzdCIsInJlbmRlckZpbGUiLCJzaGlmdCIsInZpZXdPcHRzIiwicG9wIiwic2V0dGluZ3MiLCJjbGVhckNhY2hlIiwib3B0c1BhcmFtIiwiaGFzT3duT25seU9iamVjdCIsInRlbXBsYXRlVGV4dCIsIm1vZGUiLCJ0cnVuY2F0ZSIsImN1cnJlbnRMaW5lIiwic291cmNlIiwiY2xpZW50IiwiZXNjYXBlIiwiZXNjYXBlWE1MIiwiY29tcGlsZURlYnVnIiwib3BlbkRlbGltaXRlciIsImNsb3NlRGVsaW1pdGVyIiwiZGVsaW1pdGVyIiwic3RyaWN0Iiwicm1XaGl0ZXNwYWNlIiwib3V0cHV0RnVuY3Rpb25OYW1lIiwiYXN5bmMiLCJkZXN0cnVjdHVyZWRMb2NhbHMiLCJsZWdhY3lJbmNsdWRlIiwiX3dpdGgiLCJyZWdleCIsImNyZWF0ZVJlZ2V4IiwibW9kZXMiLCJFVkFMIiwiRVNDQVBFRCIsIlJBVyIsIkNPTU1FTlQiLCJMSVRFUkFMIiwiZGVsaW0iLCJlc2NhcGVSZWdFeHBDaGFycyIsIlJlZ0V4cCIsInByZXBlbmRlZCIsImFwcGVuZGVkIiwiZXNjYXBlRm4iLCJjdG9yIiwic2FuaXRpemVkRmlsZW5hbWUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2VuZXJhdGVTb3VyY2UiLCJkZXN0cnVjdHVyaW5nIiwibG9nIiwiU3ludGF4RXJyb3IiLCJyZXR1cm5lZEZuIiwiYW5vbnltb3VzIiwiaW5jbHVkZSIsImluY2x1ZGVEYXRhIiwiZGVmaW5lUHJvcGVydHkiLCJiYXNlbmFtZSIsIndyaXRhYmxlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInBhcnNlVGVtcGxhdGVUZXh0IiwiZm9yRWFjaCIsImNsb3NpbmciLCJzY2FuTGluZSIsInBhdCIsImFyciIsImZpcnN0UG9zIiwiX2FkZE91dHB1dCIsIm5ld0xpbmVDb3VudCIsImxhc3RJbmRleE9mIiwiX19leHByZXNzIiwiVkVSU0lPTiIsImVqcyIsInJlZ0V4cENoYXJzIiwic3RyaW5nIiwiX0VOQ09ERV9IVE1MX1JVTEVTIiwiX01BVENIX0hUTUwiLCJlbmNvZGVfY2hhciIsImVzY2FwZUZ1bmNTdHIiLCJlc2NhcGVYTUxUb1N0cmluZyIsInRvIiwiZnJvbSIsImxpc3QiLCJfZGF0YSIsImh5cGhlblRvQ2FtZWwiLCJfX3Byb3RvX18iLCJwcm9jZXNzIiwibm9ybWFsaXplQXJyYXkiLCJhbGxvd0Fib3ZlUm9vdCIsInVwIiwicmVzb2x2ZWRQYXRoIiwicmVzb2x2ZWRBYnNvbHV0ZSIsImN3ZCIsIlR5cGVFcnJvciIsImlzQWJzb2x1dGUiLCJ0cmFpbGluZ1NsYXNoIiwicmVsYXRpdmUiLCJmcm9tUGFydHMiLCJ0b1BhcnRzIiwic2FtZVBhcnRzTGVuZ3RoIiwib3V0cHV0UGFydHMiLCJzZXAiLCJjaGFyQ29kZUF0IiwiaGFzUm9vdCIsIm1hdGNoZWRTbGFzaCIsInN0YXJ0RG90Iiwic3RhcnRQYXJ0IiwicHJlRG90U3RhdGUiLCJ4cyIsInJlcyIsIl9wcm9jZXNzIiwiY2FjaGVkU2V0VGltZW91dCIsImNhY2hlZENsZWFyVGltZW91dCIsImRlZmF1bHRTZXRUaW1vdXQiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0IiwicnVuVGltZW91dCIsImZ1biIsInJ1bkNsZWFyVGltZW91dCIsIm1hcmtlciIsInF1ZXVlIiwiZHJhaW5pbmciLCJjdXJyZW50UXVldWUiLCJxdWV1ZUluZGV4IiwiY2xlYW5VcE5leHRUaWNrIiwiZHJhaW5RdWV1ZSIsInRpbWVvdXQiLCJydW4iLCJuZXh0VGljayIsIkl0ZW0iLCJhcnJheSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2IiwidmVyc2lvbnMiLCJub29wIiwiYWRkTGlzdGVuZXIiLCJvbmNlIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJlbWl0IiwicHJlcGVuZExpc3RlbmVyIiwicHJlcGVuZE9uY2VMaXN0ZW5lciIsImJpbmRpbmciLCJjaGRpciIsInVtYXNrIiwiZGVzY3JpcHRpb24iLCJrZXl3b3JkcyIsImF1dGhvciIsImxpY2Vuc2UiLCJiaW4iLCJqc2RlbGl2ciIsInVucGtnIiwicmVwb3NpdG9yeSIsImJ1Z3MiLCJob21lcGFnZSIsImRlcGVuZGVuY2llcyIsImpha2UiLCJkZXZEZXBlbmRlbmNpZXMiLCJicm93c2VyaWZ5IiwiZXNsaW50IiwianNkb2MiLCJtb2NoYSIsImVuZ2luZXMiLCJzY3JpcHRzIiwiZmllbGRQcml2YXRlIiwicmVuZGVyQ29udGVudCIsImZpZWxkIiwidGhhdCIsImdldE9wdGlvbnMiLCJzZWxlY3RPcHRpb25zIiwiX29wdGlvbnMiLCJyZXF1aXJlZCIsIl9zZWxlY3RPcHRpb25zIiwicmVuZGVyT3B0aW9uIiwiX3ZhbHVlIiwicmVuZGVyQXR0ciIsImdyb3VwQXR0ciIsImdyb3VwT3B0aW9ucyIsImdyb3VwT3B0aW9uIiwidGVtcGxhdGVzIiwicmVhZG9ubHkiLCJyZW5kZXJDb250ZW50UmVhZG9ubHkiLCJzZWxlY3RlZE9wdGlvbnMiLCJpdGVtVmFsdWUiLCJvcHRpb25BdHRyIiwiaW5pdEV2ZW50cyIsInNlbGVjdDJPcHRpb25zIiwiZm9ybU9wdGlvbnMiLCJfZm9ybSIsImxhbmciLCJnZXRDb250ZW50SWQiLCJGaWVsZFNlbGVjdDIiLCJmb3JtIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwibGFiZWxXaWR0aCIsImRlc2NyaXB0aW9uSGVscCIsImludmFsaWRUZXh0IiwidmFsaWRUZXh0IiwiZmllbGRzIiwic2hvdyIsIm5vU2VuZCIsIl9pZCIsIl9jb250ZW50SWQiLCJjb250ZW50SWQiLCJfcmVhZG9ubHkiLCJfY3JlYXRlQ2xhc3MiLCJnZXRJZCIsImR1cmF0aW9uIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJoaWRlIiwiaXNSZWFkb25seSIsImdldFZhbHVlIiwidmFsdWVzIiwic2V0VmFsdWUiLCJzZWxlY3RlZEl0ZW1zIiwidmFsaWRhdGUiLCJpc1ZhbGlkIiwiZ2V0TGFuZyIsInJlcXVpcmVkX2ZpZWxkIiwiaXMiLCJpc0FsbG95U2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixVQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsVUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFVBQUEsUUFBUSxFQUFFLFFBQVE7RUFDbEIsVUFBQSxR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