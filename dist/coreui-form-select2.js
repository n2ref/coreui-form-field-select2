(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.CoreUI = global.CoreUI || {}, global.CoreUI.form = global.CoreUI.form || {}, global.CoreUI.form.fields = global.CoreUI.form.fields || {}, global.CoreUI.form.fields.select2 = factory()));
})(this, (function () { 'use strict';

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

  /*!
   * Select2 4.1.0-rc.0
   * https://select2.github.io
   *
   * Released under the MIT license
   * https://github.com/select2/select2/blob/master/LICENSE.md
   */
  (function (factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
      // Node/CommonJS
      module.exports = function (root, jQuery) {
        if (jQuery === undefined) {
          // require('jQuery') returns a factory that requires window to
          // build a jQuery instance, we normalize how we use modules
          // that require this pattern but the window provided is a noop
          // if it's defined (how jquery works)
          if (typeof window !== 'undefined') {
            jQuery = require('jquery');
          } else {
            jQuery = require('jquery')(root);
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

  (function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;
      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }
      g.ejs = f();
    }
  })(function () {
    return function () {
      function r(e, n, t) {
        function o(i, f) {
          if (!n[i]) {
            if (!e[i]) {
              var c = "function" == typeof require && require;
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
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL3RlbXBsYXRlcy5qcyIsInNyYy9qcy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9zZWxlY3QyL2Rpc3QvanMvc2VsZWN0Mi5qcyIsIm5vZGVfbW9kdWxlcy9lanMvZWpzLm1pbi5qcyIsInNyYy9qcy9maWVsZC5wcml2YXRlLmpzIiwic3JjL2pzL2ZpZWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCB0cGwgPSBPYmplY3QuY3JlYXRlKG51bGwpXG50cGxbJ3NlbGVjdC5odG1sJ10gPSAnPCUgaWYgKHJlYWRvbmx5KSB7ICU+IDxkaXYgY2xhc3M9XCJjb3JldWktZm9ybV9fZmllbGQtcmVhZG9ubHkgY29sLWZvcm0tbGFiZWxcIj48JT0gc2VsZWN0T3B0aW9ucy5qb2luKFxcJywgXFwnKSAlPjwvZGl2PiA8JSB9IGVsc2UgeyAlPiA8c2VsZWN0IDwlLSBhdHRyICU+PiA8JSAkLmVhY2gob3B0aW9ucywgZnVuY3Rpb24oa2V5LCBvcHRpb24pIHsgJT4gPCUgaWYgKG9wdGlvbi50eXBlID09PSBcXCdncm91cFxcJykgeyAlPiA8b3B0Z3JvdXA8JS0gb3B0aW9uLmF0dHIgJT4vPiA8JSAkLmVhY2gob3B0aW9uLm9wdGlvbnMsIGZ1bmN0aW9uKGtleSwgZ3JvdXBPcHRpb24pIHsgJT4gPG9wdGlvbiA8JS0gZ3JvdXBPcHRpb24uYXR0ciAlPi8+PCU9IGdyb3VwT3B0aW9uLnRleHQgJT48L29wdGlvbj4gPCUgfSk7ICU+IDwvb3B0Z3JvdXA+IDwlIH0gZWxzZSB7ICU+IDxvcHRpb24gPCUtIG9wdGlvbi5hdHRyICU+Lz48JT0gb3B0aW9uLnRleHQgJT48L29wdGlvbj4gPCUgfSAlPiA8JSB9KTsgJT4gPC9zZWxlY3Q+IDwlIH0gJT4nO1xuZXhwb3J0IGRlZmF1bHQgdHBsOyIsIlxyXG5sZXQgdXRpbHMgPSB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J7QsdGK0LXQtNC40L3QtdC90LjQtSDQsNGC0YDQuNCx0YPRgtC+0LJcclxuICAgICAqIEBwYXJhbSBhdHRyMVxyXG4gICAgICogQHBhcmFtIGF0dHIyXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBtZXJnZUF0dHI6IGZ1bmN0aW9uIChhdHRyMSwgYXR0cjIpIHtcclxuXHJcbiAgICAgICAgbGV0IG1lcmdlQXR0ciA9IE9iamVjdC5hc3NpZ24oe30sIGF0dHIxKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyMiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgJC5lYWNoKGF0dHIyLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXJnZUF0dHIuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2NsYXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZUF0dHJbbmFtZV0gKz0gJyAnICsgdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3N0eWxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZUF0dHJbbmFtZV0gKz0gJzsnICsgdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlQXR0cltuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lcmdlQXR0cltuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXJnZUF0dHI7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0YDQvtCy0LXRgNC60LAg0L3QsCDQvtCx0YrQtdC60YJcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBpc09iamVjdDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgICEgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiZcclxuICAgICAgICAgICAgdmFsdWUgIT09IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHV0aWxzOyIsIi8qIVxuICogU2VsZWN0MiA0LjEuMC1yYy4wXG4gKiBodHRwczovL3NlbGVjdDIuZ2l0aHViLmlvXG4gKlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc2VsZWN0Mi9zZWxlY3QyL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuOyhmdW5jdGlvbiAoZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyb290LCBqUXVlcnkpIHtcbiAgICAgIGlmIChqUXVlcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyByZXF1aXJlKCdqUXVlcnknKSByZXR1cm5zIGEgZmFjdG9yeSB0aGF0IHJlcXVpcmVzIHdpbmRvdyB0b1xuICAgICAgICAvLyBidWlsZCBhIGpRdWVyeSBpbnN0YW5jZSwgd2Ugbm9ybWFsaXplIGhvdyB3ZSB1c2UgbW9kdWxlc1xuICAgICAgICAvLyB0aGF0IHJlcXVpcmUgdGhpcyBwYXR0ZXJuIGJ1dCB0aGUgd2luZG93IHByb3ZpZGVkIGlzIGEgbm9vcFxuICAgICAgICAvLyBpZiBpdCdzIGRlZmluZWQgKGhvdyBqcXVlcnkgd29ya3MpXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpKHJvb3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgICByZXR1cm4galF1ZXJ5O1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZmFjdG9yeShqUXVlcnkpO1xuICB9XG59IChmdW5jdGlvbiAoalF1ZXJ5KSB7XG4gIC8vIFRoaXMgaXMgbmVlZGVkIHNvIHdlIGNhbiBjYXRjaCB0aGUgQU1EIGxvYWRlciBjb25maWd1cmF0aW9uIGFuZCB1c2UgaXRcbiAgLy8gVGhlIGlubmVyIGZpbGUgc2hvdWxkIGJlIHdyYXBwZWQgKGJ5IGBiYW5uZXIuc3RhcnQuanNgKSBpbiBhIGZ1bmN0aW9uIHRoYXRcbiAgLy8gcmV0dXJucyB0aGUgQU1EIGxvYWRlciByZWZlcmVuY2VzLlxuICB2YXIgUzIgPShmdW5jdGlvbiAoKSB7XG4gIC8vIFJlc3RvcmUgdGhlIFNlbGVjdDIgQU1EIGxvYWRlciBzbyBpdCBjYW4gYmUgdXNlZFxuICAvLyBOZWVkZWQgbW9zdGx5IGluIHRoZSBsYW5ndWFnZSBmaWxlcywgd2hlcmUgdGhlIGxvYWRlciBpcyBub3QgaW5zZXJ0ZWRcbiAgaWYgKGpRdWVyeSAmJiBqUXVlcnkuZm4gJiYgalF1ZXJ5LmZuLnNlbGVjdDIgJiYgalF1ZXJ5LmZuLnNlbGVjdDIuYW1kKSB7XG4gICAgdmFyIFMyID0galF1ZXJ5LmZuLnNlbGVjdDIuYW1kO1xuICB9XG52YXIgUzI7KGZ1bmN0aW9uICgpIHsgaWYgKCFTMiB8fCAhUzIucmVxdWlyZWpzKSB7XG5pZiAoIVMyKSB7IFMyID0ge307IH0gZWxzZSB7IHJlcXVpcmUgPSBTMjsgfVxuLyoqXG4gKiBAbGljZW5zZSBhbG1vbmQgMC4zLjMgQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMuXG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSwgaHR0cDovL2dpdGh1Yi5jb20vcmVxdWlyZWpzL2FsbW9uZC9MSUNFTlNFXG4gKi9cbi8vR29pbmcgc2xvcHB5IHRvIGF2b2lkICd1c2Ugc3RyaWN0JyBzdHJpbmcgY29zdCwgYnV0IHN0cmljdCBwcmFjdGljZXMgc2hvdWxkXG4vL2JlIGZvbGxvd2VkLlxuLypnbG9iYWwgc2V0VGltZW91dDogZmFsc2UgKi9cblxudmFyIHJlcXVpcmVqcywgcmVxdWlyZSwgZGVmaW5lO1xuKGZ1bmN0aW9uICh1bmRlZikge1xuICAgIHZhciBtYWluLCByZXEsIG1ha2VNYXAsIGhhbmRsZXJzLFxuICAgICAgICBkZWZpbmVkID0ge30sXG4gICAgICAgIHdhaXRpbmcgPSB7fSxcbiAgICAgICAgY29uZmlnID0ge30sXG4gICAgICAgIGRlZmluaW5nID0ge30sXG4gICAgICAgIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICAgIGFwcyA9IFtdLnNsaWNlLFxuICAgICAgICBqc1N1ZmZpeFJlZ0V4cCA9IC9cXC5qcyQvO1xuXG4gICAgZnVuY3Rpb24gaGFzUHJvcChvYmosIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIGhhc093bi5jYWxsKG9iaiwgcHJvcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSByZWxhdGl2ZSBtb2R1bGUgbmFtZSwgbGlrZSAuL3NvbWV0aGluZywgbm9ybWFsaXplIGl0IHRvXG4gICAgICogYSByZWFsIG5hbWUgdGhhdCBjYW4gYmUgbWFwcGVkIHRvIGEgcGF0aC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGUgcmVsYXRpdmUgbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlTmFtZSBhIHJlYWwgbmFtZSB0aGF0IHRoZSBuYW1lIGFyZyBpcyByZWxhdGl2ZVxuICAgICAqIHRvLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IG5vcm1hbGl6ZWQgbmFtZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZShuYW1lLCBiYXNlTmFtZSkge1xuICAgICAgICB2YXIgbmFtZVBhcnRzLCBuYW1lU2VnbWVudCwgbWFwVmFsdWUsIGZvdW5kTWFwLCBsYXN0SW5kZXgsXG4gICAgICAgICAgICBmb3VuZEksIGZvdW5kU3Rhck1hcCwgc3RhckksIGksIGosIHBhcnQsIG5vcm1hbGl6ZWRCYXNlUGFydHMsXG4gICAgICAgICAgICBiYXNlUGFydHMgPSBiYXNlTmFtZSAmJiBiYXNlTmFtZS5zcGxpdChcIi9cIiksXG4gICAgICAgICAgICBtYXAgPSBjb25maWcubWFwLFxuICAgICAgICAgICAgc3Rhck1hcCA9IChtYXAgJiYgbWFwWycqJ10pIHx8IHt9O1xuXG4gICAgICAgIC8vQWRqdXN0IGFueSByZWxhdGl2ZSBwYXRocy5cbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBsYXN0SW5kZXggPSBuYW1lLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIC8vIElmIHdhbnRpbmcgbm9kZSBJRCBjb21wYXRpYmlsaXR5LCBzdHJpcCAuanMgZnJvbSBlbmRcbiAgICAgICAgICAgIC8vIG9mIElEcy4gSGF2ZSB0byBkbyB0aGlzIGhlcmUsIGFuZCBub3QgaW4gbmFtZVRvVXJsXG4gICAgICAgICAgICAvLyBiZWNhdXNlIG5vZGUgYWxsb3dzIGVpdGhlciAuanMgb3Igbm9uIC5qcyB0byBtYXBcbiAgICAgICAgICAgIC8vIHRvIHNhbWUgZmlsZS5cbiAgICAgICAgICAgIGlmIChjb25maWcubm9kZUlkQ29tcGF0ICYmIGpzU3VmZml4UmVnRXhwLnRlc3QobmFtZVtsYXN0SW5kZXhdKSkge1xuICAgICAgICAgICAgICAgIG5hbWVbbGFzdEluZGV4XSA9IG5hbWVbbGFzdEluZGV4XS5yZXBsYWNlKGpzU3VmZml4UmVnRXhwLCAnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0cyB3aXRoIGEgJy4nIHNvIG5lZWQgdGhlIGJhc2VOYW1lXG4gICAgICAgICAgICBpZiAobmFtZVswXS5jaGFyQXQoMCkgPT09ICcuJyAmJiBiYXNlUGFydHMpIHtcbiAgICAgICAgICAgICAgICAvL0NvbnZlcnQgYmFzZU5hbWUgdG8gYXJyYXksIGFuZCBsb3Agb2ZmIHRoZSBsYXN0IHBhcnQsXG4gICAgICAgICAgICAgICAgLy9zbyB0aGF0IC4gbWF0Y2hlcyB0aGF0ICdkaXJlY3RvcnknIGFuZCBub3QgbmFtZSBvZiB0aGUgYmFzZU5hbWUnc1xuICAgICAgICAgICAgICAgIC8vbW9kdWxlLiBGb3IgaW5zdGFuY2UsIGJhc2VOYW1lIG9mICdvbmUvdHdvL3RocmVlJywgbWFwcyB0b1xuICAgICAgICAgICAgICAgIC8vJ29uZS90d28vdGhyZWUuanMnLCBidXQgd2Ugd2FudCB0aGUgZGlyZWN0b3J5LCAnb25lL3R3bycgZm9yXG4gICAgICAgICAgICAgICAgLy90aGlzIG5vcm1hbGl6YXRpb24uXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplZEJhc2VQYXJ0cyA9IGJhc2VQYXJ0cy5zbGljZSgwLCBiYXNlUGFydHMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5vcm1hbGl6ZWRCYXNlUGFydHMuY29uY2F0KG5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3N0YXJ0IHRyaW1Eb3RzXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmFtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhcnQgPSBuYW1lW2ldO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0ID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnQgPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYXQgdGhlIHN0YXJ0LCBvciBwcmV2aW91cyB2YWx1ZSBpcyBzdGlsbCAuLixcbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCB0aGVtIHNvIHRoYXQgd2hlbiBjb252ZXJ0ZWQgdG8gYSBwYXRoIGl0IG1heVxuICAgICAgICAgICAgICAgICAgICAvLyBzdGlsbCB3b3JrIHdoZW4gY29udmVydGVkIHRvIGEgcGF0aCwgZXZlbiB0aG91Z2hcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgYW4gSUQgaXQgaXMgbGVzcyB0aGFuIGlkZWFsLiBJbiBsYXJnZXIgcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVsZWFzZXMsIG1heSBiZSBiZXR0ZXIgdG8ganVzdCBraWNrIG91dCBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDAgfHwgKGkgPT09IDEgJiYgbmFtZVsyXSA9PT0gJy4uJykgfHwgbmFtZVtpIC0gMV0gPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLnNwbGljZShpIC0gMSwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpIC09IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2VuZCB0cmltRG90c1xuXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5qb2luKCcvJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FwcGx5IG1hcCBjb25maWcgaWYgYXZhaWxhYmxlLlxuICAgICAgICBpZiAoKGJhc2VQYXJ0cyB8fCBzdGFyTWFwKSAmJiBtYXApIHtcbiAgICAgICAgICAgIG5hbWVQYXJ0cyA9IG5hbWUuc3BsaXQoJy8nKTtcblxuICAgICAgICAgICAgZm9yIChpID0gbmFtZVBhcnRzLmxlbmd0aDsgaSA+IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgICAgIG5hbWVTZWdtZW50ID0gbmFtZVBhcnRzLnNsaWNlKDAsIGkpLmpvaW4oXCIvXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VQYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICAvL0ZpbmQgdGhlIGxvbmdlc3QgYmFzZU5hbWUgc2VnbWVudCBtYXRjaCBpbiB0aGUgY29uZmlnLlxuICAgICAgICAgICAgICAgICAgICAvL1NvLCBkbyBqb2lucyBvbiB0aGUgYmlnZ2VzdCB0byBzbWFsbGVzdCBsZW5ndGhzIG9mIGJhc2VQYXJ0cy5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gYmFzZVBhcnRzLmxlbmd0aDsgaiA+IDA7IGogLT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWUgPSBtYXBbYmFzZVBhcnRzLnNsaWNlKDAsIGopLmpvaW4oJy8nKV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYmFzZU5hbWUgc2VnbWVudCBoYXMgIGNvbmZpZywgZmluZCBpZiBpdCBoYXMgb25lIGZvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIG5hbWUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFwVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZSA9IG1hcFZhbHVlW25hbWVTZWdtZW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFwVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9NYXRjaCwgdXBkYXRlIG5hbWUgdG8gdGhlIG5ldyB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRNYXAgPSBtYXBWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kTWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vQ2hlY2sgZm9yIGEgc3RhciBtYXAgbWF0Y2gsIGJ1dCBqdXN0IGhvbGQgb24gdG8gaXQsXG4gICAgICAgICAgICAgICAgLy9pZiB0aGVyZSBpcyBhIHNob3J0ZXIgc2VnbWVudCBtYXRjaCBsYXRlciBpbiBhIG1hdGNoaW5nXG4gICAgICAgICAgICAgICAgLy9jb25maWcsIHRoZW4gZmF2b3Igb3ZlciB0aGlzIHN0YXIgbWFwLlxuICAgICAgICAgICAgICAgIGlmICghZm91bmRTdGFyTWFwICYmIHN0YXJNYXAgJiYgc3Rhck1hcFtuYW1lU2VnbWVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRTdGFyTWFwID0gc3Rhck1hcFtuYW1lU2VnbWVudF07XG4gICAgICAgICAgICAgICAgICAgIHN0YXJJID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZm91bmRNYXAgJiYgZm91bmRTdGFyTWFwKSB7XG4gICAgICAgICAgICAgICAgZm91bmRNYXAgPSBmb3VuZFN0YXJNYXA7XG4gICAgICAgICAgICAgICAgZm91bmRJID0gc3Rhckk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmb3VuZE1hcCkge1xuICAgICAgICAgICAgICAgIG5hbWVQYXJ0cy5zcGxpY2UoMCwgZm91bmRJLCBmb3VuZE1hcCk7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWVQYXJ0cy5qb2luKCcvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlUmVxdWlyZShyZWxOYW1lLCBmb3JjZVN5bmMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vQSB2ZXJzaW9uIG9mIGEgcmVxdWlyZSBmdW5jdGlvbiB0aGF0IHBhc3NlcyBhIG1vZHVsZU5hbWVcbiAgICAgICAgICAgIC8vdmFsdWUgZm9yIGl0ZW1zIHRoYXQgbWF5IG5lZWQgdG9cbiAgICAgICAgICAgIC8vbG9vayB1cCBwYXRocyByZWxhdGl2ZSB0byB0aGUgbW9kdWxlTmFtZVxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcHMuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgICAgICAvL0lmIGZpcnN0IGFyZyBpcyBub3QgcmVxdWlyZSgnc3RyaW5nJyksIGFuZCB0aGVyZSBpcyBvbmx5XG4gICAgICAgICAgICAvL29uZSBhcmcsIGl0IGlzIHRoZSBhcnJheSBmb3JtIHdpdGhvdXQgYSBjYWxsYmFjay4gSW5zZXJ0XG4gICAgICAgICAgICAvL2EgbnVsbCBzbyB0aGF0IHRoZSBmb2xsb3dpbmcgY29uY2F0IGlzIGNvcnJlY3QuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnICYmIGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcS5hcHBseSh1bmRlZiwgYXJncy5jb25jYXQoW3JlbE5hbWUsIGZvcmNlU3luY10pKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlTm9ybWFsaXplKHJlbE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplKG5hbWUsIHJlbE5hbWUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VMb2FkKGRlcE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgZGVmaW5lZFtkZXBOYW1lXSA9IHZhbHVlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGxEZXAobmFtZSkge1xuICAgICAgICBpZiAoaGFzUHJvcCh3YWl0aW5nLCBuYW1lKSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSB3YWl0aW5nW25hbWVdO1xuICAgICAgICAgICAgZGVsZXRlIHdhaXRpbmdbbmFtZV07XG4gICAgICAgICAgICBkZWZpbmluZ1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICBtYWluLmFwcGx5KHVuZGVmLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzUHJvcChkZWZpbmVkLCBuYW1lKSAmJiAhaGFzUHJvcChkZWZpbmluZywgbmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gJyArIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWZpbmVkW25hbWVdO1xuICAgIH1cblxuICAgIC8vVHVybnMgYSBwbHVnaW4hcmVzb3VyY2UgdG8gW3BsdWdpbiwgcmVzb3VyY2VdXG4gICAgLy93aXRoIHRoZSBwbHVnaW4gYmVpbmcgdW5kZWZpbmVkIGlmIHRoZSBuYW1lXG4gICAgLy9kaWQgbm90IGhhdmUgYSBwbHVnaW4gcHJlZml4LlxuICAgIGZ1bmN0aW9uIHNwbGl0UHJlZml4KG5hbWUpIHtcbiAgICAgICAgdmFyIHByZWZpeCxcbiAgICAgICAgICAgIGluZGV4ID0gbmFtZSA/IG5hbWUuaW5kZXhPZignIScpIDogLTE7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBwcmVmaXggPSBuYW1lLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoaW5kZXggKyAxLCBuYW1lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtwcmVmaXgsIG5hbWVdO1xuICAgIH1cblxuICAgIC8vQ3JlYXRlcyBhIHBhcnRzIGFycmF5IGZvciBhIHJlbE5hbWUgd2hlcmUgZmlyc3QgcGFydCBpcyBwbHVnaW4gSUQsXG4gICAgLy9zZWNvbmQgcGFydCBpcyByZXNvdXJjZSBJRC4gQXNzdW1lcyByZWxOYW1lIGhhcyBhbHJlYWR5IGJlZW4gbm9ybWFsaXplZC5cbiAgICBmdW5jdGlvbiBtYWtlUmVsUGFydHMocmVsTmFtZSkge1xuICAgICAgICByZXR1cm4gcmVsTmFtZSA/IHNwbGl0UHJlZml4KHJlbE5hbWUpIDogW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBuYW1lIG1hcCwgbm9ybWFsaXppbmcgdGhlIG5hbWUsIGFuZCB1c2luZyBhIHBsdWdpblxuICAgICAqIGZvciBub3JtYWxpemF0aW9uIGlmIG5lY2Vzc2FyeS4gR3JhYnMgYSByZWYgdG8gcGx1Z2luXG4gICAgICogdG9vLCBhcyBhbiBvcHRpbWl6YXRpb24uXG4gICAgICovXG4gICAgbWFrZU1hcCA9IGZ1bmN0aW9uIChuYW1lLCByZWxQYXJ0cykge1xuICAgICAgICB2YXIgcGx1Z2luLFxuICAgICAgICAgICAgcGFydHMgPSBzcGxpdFByZWZpeChuYW1lKSxcbiAgICAgICAgICAgIHByZWZpeCA9IHBhcnRzWzBdLFxuICAgICAgICAgICAgcmVsUmVzb3VyY2VOYW1lID0gcmVsUGFydHNbMV07XG5cbiAgICAgICAgbmFtZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICAgIHByZWZpeCA9IG5vcm1hbGl6ZShwcmVmaXgsIHJlbFJlc291cmNlTmFtZSk7XG4gICAgICAgICAgICBwbHVnaW4gPSBjYWxsRGVwKHByZWZpeCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL05vcm1hbGl6ZSBhY2NvcmRpbmdcbiAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgICAgaWYgKHBsdWdpbiAmJiBwbHVnaW4ubm9ybWFsaXplKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IHBsdWdpbi5ub3JtYWxpemUobmFtZSwgbWFrZU5vcm1hbGl6ZShyZWxSZXNvdXJjZU5hbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5vcm1hbGl6ZShuYW1lLCByZWxSZXNvdXJjZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IG5vcm1hbGl6ZShuYW1lLCByZWxSZXNvdXJjZU5hbWUpO1xuICAgICAgICAgICAgcGFydHMgPSBzcGxpdFByZWZpeChuYW1lKTtcbiAgICAgICAgICAgIHByZWZpeCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgbmFtZSA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbiA9IGNhbGxEZXAocHJlZml4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vVXNpbmcgcmlkaWN1bG91cyBwcm9wZXJ0eSBuYW1lcyBmb3Igc3BhY2UgcmVhc29uc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZjogcHJlZml4ID8gcHJlZml4ICsgJyEnICsgbmFtZSA6IG5hbWUsIC8vZnVsbE5hbWVcbiAgICAgICAgICAgIG46IG5hbWUsXG4gICAgICAgICAgICBwcjogcHJlZml4LFxuICAgICAgICAgICAgcDogcGx1Z2luXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VDb25maWcobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChjb25maWcgJiYgY29uZmlnLmNvbmZpZyAmJiBjb25maWcuY29uZmlnW25hbWVdKSB8fCB7fTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBoYW5kbGVycyA9IHtcbiAgICAgICAgcmVxdWlyZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWtlUmVxdWlyZShuYW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhwb3J0czogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHZhciBlID0gZGVmaW5lZFtuYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkZWZpbmVkW25hbWVdID0ge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb2R1bGU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBuYW1lLFxuICAgICAgICAgICAgICAgIHVyaTogJycsXG4gICAgICAgICAgICAgICAgZXhwb3J0czogZGVmaW5lZFtuYW1lXSxcbiAgICAgICAgICAgICAgICBjb25maWc6IG1ha2VDb25maWcobmFtZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbWFpbiA9IGZ1bmN0aW9uIChuYW1lLCBkZXBzLCBjYWxsYmFjaywgcmVsTmFtZSkge1xuICAgICAgICB2YXIgY2pzTW9kdWxlLCBkZXBOYW1lLCByZXQsIG1hcCwgaSwgcmVsUGFydHMsXG4gICAgICAgICAgICBhcmdzID0gW10sXG4gICAgICAgICAgICBjYWxsYmFja1R5cGUgPSB0eXBlb2YgY2FsbGJhY2ssXG4gICAgICAgICAgICB1c2luZ0V4cG9ydHM7XG5cbiAgICAgICAgLy9Vc2UgbmFtZSBpZiBubyByZWxOYW1lXG4gICAgICAgIHJlbE5hbWUgPSByZWxOYW1lIHx8IG5hbWU7XG4gICAgICAgIHJlbFBhcnRzID0gbWFrZVJlbFBhcnRzKHJlbE5hbWUpO1xuXG4gICAgICAgIC8vQ2FsbCB0aGUgY2FsbGJhY2sgdG8gZGVmaW5lIHRoZSBtb2R1bGUsIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgaWYgKGNhbGxiYWNrVHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgY2FsbGJhY2tUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvL1B1bGwgb3V0IHRoZSBkZWZpbmVkIGRlcGVuZGVuY2llcyBhbmQgcGFzcyB0aGUgb3JkZXJlZFxuICAgICAgICAgICAgLy92YWx1ZXMgdG8gdGhlIGNhbGxiYWNrLlxuICAgICAgICAgICAgLy9EZWZhdWx0IHRvIFtyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGVdIGlmIG5vIGRlcHNcbiAgICAgICAgICAgIGRlcHMgPSAhZGVwcy5sZW5ndGggJiYgY2FsbGJhY2subGVuZ3RoID8gWydyZXF1aXJlJywgJ2V4cG9ydHMnLCAnbW9kdWxlJ10gOiBkZXBzO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBtYXAgPSBtYWtlTWFwKGRlcHNbaV0sIHJlbFBhcnRzKTtcbiAgICAgICAgICAgICAgICBkZXBOYW1lID0gbWFwLmY7XG5cbiAgICAgICAgICAgICAgICAvL0Zhc3QgcGF0aCBDb21tb25KUyBzdGFuZGFyZCBkZXBlbmRlbmNpZXMuXG4gICAgICAgICAgICAgICAgaWYgKGRlcE5hbWUgPT09IFwicmVxdWlyZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBoYW5kbGVycy5yZXF1aXJlKG5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVwTmFtZSA9PT0gXCJleHBvcnRzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9Db21tb25KUyBtb2R1bGUgc3BlYyAxLjFcbiAgICAgICAgICAgICAgICAgICAgYXJnc1tpXSA9IGhhbmRsZXJzLmV4cG9ydHMobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHVzaW5nRXhwb3J0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZXBOYW1lID09PSBcIm1vZHVsZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQ29tbW9uSlMgbW9kdWxlIHNwZWMgMS4xXG4gICAgICAgICAgICAgICAgICAgIGNqc01vZHVsZSA9IGFyZ3NbaV0gPSBoYW5kbGVycy5tb2R1bGUobmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNQcm9wKGRlZmluZWQsIGRlcE5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9wKHdhaXRpbmcsIGRlcE5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQcm9wKGRlZmluaW5nLCBkZXBOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdzW2ldID0gY2FsbERlcChkZXBOYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hcC5wKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5wLmxvYWQobWFwLm4sIG1ha2VSZXF1aXJlKHJlbE5hbWUsIHRydWUpLCBtYWtlTG9hZChkZXBOYW1lKSwge30pO1xuICAgICAgICAgICAgICAgICAgICBhcmdzW2ldID0gZGVmaW5lZFtkZXBOYW1lXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobmFtZSArICcgbWlzc2luZyAnICsgZGVwTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXQgPSBjYWxsYmFjayA/IGNhbGxiYWNrLmFwcGx5KGRlZmluZWRbbmFtZV0sIGFyZ3MpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgICAgIC8vSWYgc2V0dGluZyBleHBvcnRzIHZpYSBcIm1vZHVsZVwiIGlzIGluIHBsYXksXG4gICAgICAgICAgICAgICAgLy9mYXZvciB0aGF0IG92ZXIgcmV0dXJuIHZhbHVlIGFuZCBleHBvcnRzLiBBZnRlciB0aGF0LFxuICAgICAgICAgICAgICAgIC8vZmF2b3IgYSBub24tdW5kZWZpbmVkIHJldHVybiB2YWx1ZSBvdmVyIGV4cG9ydHMgdXNlLlxuICAgICAgICAgICAgICAgIGlmIChjanNNb2R1bGUgJiYgY2pzTW9kdWxlLmV4cG9ydHMgIT09IHVuZGVmICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjanNNb2R1bGUuZXhwb3J0cyAhPT0gZGVmaW5lZFtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVkW25hbWVdID0gY2pzTW9kdWxlLmV4cG9ydHM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXQgIT09IHVuZGVmIHx8ICF1c2luZ0V4cG9ydHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9Vc2UgdGhlIHJldHVybiB2YWx1ZSBmcm9tIHRoZSBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lZFtuYW1lXSA9IHJldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSkge1xuICAgICAgICAgICAgLy9NYXkganVzdCBiZSBhbiBvYmplY3QgZGVmaW5pdGlvbiBmb3IgdGhlIG1vZHVsZS4gT25seVxuICAgICAgICAgICAgLy93b3JyeSBhYm91dCBkZWZpbmluZyBpZiBoYXZlIGEgbW9kdWxlIG5hbWUuXG4gICAgICAgICAgICBkZWZpbmVkW25hbWVdID0gY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVxdWlyZWpzID0gcmVxdWlyZSA9IHJlcSA9IGZ1bmN0aW9uIChkZXBzLCBjYWxsYmFjaywgcmVsTmFtZSwgZm9yY2VTeW5jLCBhbHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkZXBzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlcnNbZGVwc10pIHtcbiAgICAgICAgICAgICAgICAvL2NhbGxiYWNrIGluIHRoaXMgY2FzZSBpcyByZWFsbHkgcmVsTmFtZVxuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyc1tkZXBzXShjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0p1c3QgcmV0dXJuIHRoZSBtb2R1bGUgd2FudGVkLiBJbiB0aGlzIHNjZW5hcmlvLCB0aGVcbiAgICAgICAgICAgIC8vZGVwcyBhcmcgaXMgdGhlIG1vZHVsZSBuYW1lLCBhbmQgc2Vjb25kIGFyZyAoaWYgcGFzc2VkKVxuICAgICAgICAgICAgLy9pcyBqdXN0IHRoZSByZWxOYW1lLlxuICAgICAgICAgICAgLy9Ob3JtYWxpemUgbW9kdWxlIG5hbWUsIGlmIGl0IGNvbnRhaW5zIC4gb3IgLi5cbiAgICAgICAgICAgIHJldHVybiBjYWxsRGVwKG1ha2VNYXAoZGVwcywgbWFrZVJlbFBhcnRzKGNhbGxiYWNrKSkuZik7XG4gICAgICAgIH0gZWxzZSBpZiAoIWRlcHMuc3BsaWNlKSB7XG4gICAgICAgICAgICAvL2RlcHMgaXMgYSBjb25maWcgb2JqZWN0LCBub3QgYW4gYXJyYXkuXG4gICAgICAgICAgICBjb25maWcgPSBkZXBzO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5kZXBzKSB7XG4gICAgICAgICAgICAgICAgcmVxKGNvbmZpZy5kZXBzLCBjb25maWcuY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrLnNwbGljZSkge1xuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2sgaXMgYW4gYXJyYXksIHdoaWNoIG1lYW5zIGl0IGlzIGEgZGVwZW5kZW5jeSBsaXN0LlxuICAgICAgICAgICAgICAgIC8vQWRqdXN0IGFyZ3MgaWYgdGhlcmUgYXJlIGRlcGVuZGVuY2llc1xuICAgICAgICAgICAgICAgIGRlcHMgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IHJlbE5hbWU7XG4gICAgICAgICAgICAgICAgcmVsTmFtZSA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlcHMgPSB1bmRlZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vU3VwcG9ydCByZXF1aXJlKFsnYSddKVxuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgICAgIC8vSWYgcmVsTmFtZSBpcyBhIGZ1bmN0aW9uLCBpdCBpcyBhbiBlcnJiYWNrIGhhbmRsZXIsXG4gICAgICAgIC8vc28gcmVtb3ZlIGl0LlxuICAgICAgICBpZiAodHlwZW9mIHJlbE5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJlbE5hbWUgPSBmb3JjZVN5bmM7XG4gICAgICAgICAgICBmb3JjZVN5bmMgPSBhbHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL1NpbXVsYXRlIGFzeW5jIGNhbGxiYWNrO1xuICAgICAgICBpZiAoZm9yY2VTeW5jKSB7XG4gICAgICAgICAgICBtYWluKHVuZGVmLCBkZXBzLCBjYWxsYmFjaywgcmVsTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL1VzaW5nIGEgbm9uLXplcm8gdmFsdWUgYmVjYXVzZSBvZiBjb25jZXJuIGZvciB3aGF0IG9sZCBicm93c2Vyc1xuICAgICAgICAgICAgLy9kbywgYW5kIGxhdGVzdCBicm93c2VycyBcInVwZ3JhZGVcIiB0byA0IGlmIGxvd2VyIHZhbHVlIGlzIHVzZWQ6XG4gICAgICAgICAgICAvL2h0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RpbWVycy5odG1sI2RvbS13aW5kb3d0aW1lcnMtc2V0dGltZW91dDpcbiAgICAgICAgICAgIC8vSWYgd2FudCBhIHZhbHVlIGltbWVkaWF0ZWx5LCB1c2UgcmVxdWlyZSgnaWQnKSBpbnN0ZWFkIC0tIHNvbWV0aGluZ1xuICAgICAgICAgICAgLy90aGF0IHdvcmtzIGluIGFsbW9uZCBvbiB0aGUgZ2xvYmFsIGxldmVsLCBidXQgbm90IGd1YXJhbnRlZWQgYW5kXG4gICAgICAgICAgICAvL3VubGlrZWx5IHRvIHdvcmsgaW4gb3RoZXIgQU1EIGltcGxlbWVudGF0aW9ucy5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1haW4odW5kZWYsIGRlcHMsIGNhbGxiYWNrLCByZWxOYW1lKTtcbiAgICAgICAgICAgIH0sIDQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSnVzdCBkcm9wcyB0aGUgY29uZmlnIG9uIHRoZSBmbG9vciwgYnV0IHJldHVybnMgcmVxIGluIGNhc2VcbiAgICAgKiB0aGUgY29uZmlnIHJldHVybiB2YWx1ZSBpcyB1c2VkLlxuICAgICAqL1xuICAgIHJlcS5jb25maWcgPSBmdW5jdGlvbiAoY2ZnKSB7XG4gICAgICAgIHJldHVybiByZXEoY2ZnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRXhwb3NlIG1vZHVsZSByZWdpc3RyeSBmb3IgZGVidWdnaW5nIGFuZCB0b29saW5nXG4gICAgICovXG4gICAgcmVxdWlyZWpzLl9kZWZpbmVkID0gZGVmaW5lZDtcblxuICAgIGRlZmluZSA9IGZ1bmN0aW9uIChuYW1lLCBkZXBzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlZSBhbG1vbmQgUkVBRE1FOiBpbmNvcnJlY3QgbW9kdWxlIGJ1aWxkLCBubyBtb2R1bGUgbmFtZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UaGlzIG1vZHVsZSBtYXkgbm90IGhhdmUgZGVwZW5kZW5jaWVzXG4gICAgICAgIGlmICghZGVwcy5zcGxpY2UpIHtcbiAgICAgICAgICAgIC8vZGVwcyBpcyBub3QgYW4gYXJyYXksIHNvIHByb2JhYmx5IG1lYW5zXG4gICAgICAgICAgICAvL2FuIG9iamVjdCBsaXRlcmFsIG9yIGZhY3RvcnkgZnVuY3Rpb24gZm9yXG4gICAgICAgICAgICAvL3RoZSB2YWx1ZS4gQWRqdXN0IGFyZ3MuXG4gICAgICAgICAgICBjYWxsYmFjayA9IGRlcHM7XG4gICAgICAgICAgICBkZXBzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc1Byb3AoZGVmaW5lZCwgbmFtZSkgJiYgIWhhc1Byb3Aod2FpdGluZywgbmFtZSkpIHtcbiAgICAgICAgICAgIHdhaXRpbmdbbmFtZV0gPSBbbmFtZSwgZGVwcywgY2FsbGJhY2tdO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRlZmluZS5hbWQgPSB7XG4gICAgICAgIGpRdWVyeTogdHJ1ZVxuICAgIH07XG59KCkpO1xuXG5TMi5yZXF1aXJlanMgPSByZXF1aXJlanM7UzIucmVxdWlyZSA9IHJlcXVpcmU7UzIuZGVmaW5lID0gZGVmaW5lO1xufVxufSgpKTtcblMyLmRlZmluZShcImFsbW9uZFwiLCBmdW5jdGlvbigpe30pO1xuXG4vKiBnbG9iYWwgalF1ZXJ5OmZhbHNlLCAkOmZhbHNlICovXG5TMi5kZWZpbmUoJ2pxdWVyeScsW10sZnVuY3Rpb24gKCkge1xuICB2YXIgXyQgPSBqUXVlcnkgfHwgJDtcblxuICBpZiAoXyQgPT0gbnVsbCAmJiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgJ1NlbGVjdDI6IEFuIGluc3RhbmNlIG9mIGpRdWVyeSBvciBhIGpRdWVyeS1jb21wYXRpYmxlIGxpYnJhcnkgd2FzIG5vdCAnICtcbiAgICAgICdmb3VuZC4gTWFrZSBzdXJlIHRoYXQgeW91IGFyZSBpbmNsdWRpbmcgalF1ZXJ5IGJlZm9yZSBTZWxlY3QyIG9uIHlvdXIgJyArXG4gICAgICAnd2ViIHBhZ2UuJ1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gXyQ7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL3V0aWxzJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICB2YXIgVXRpbHMgPSB7fTtcblxuICBVdGlscy5FeHRlbmQgPSBmdW5jdGlvbiAoQ2hpbGRDbGFzcywgU3VwZXJDbGFzcykge1xuICAgIHZhciBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICAgIGZ1bmN0aW9uIEJhc2VDb25zdHJ1Y3RvciAoKSB7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yID0gQ2hpbGRDbGFzcztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gU3VwZXJDbGFzcykge1xuICAgICAgaWYgKF9faGFzUHJvcC5jYWxsKFN1cGVyQ2xhc3MsIGtleSkpIHtcbiAgICAgICAgQ2hpbGRDbGFzc1trZXldID0gU3VwZXJDbGFzc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIEJhc2VDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBTdXBlckNsYXNzLnByb3RvdHlwZTtcbiAgICBDaGlsZENsYXNzLnByb3RvdHlwZSA9IG5ldyBCYXNlQ29uc3RydWN0b3IoKTtcbiAgICBDaGlsZENsYXNzLl9fc3VwZXJfXyA9IFN1cGVyQ2xhc3MucHJvdG90eXBlO1xuXG4gICAgcmV0dXJuIENoaWxkQ2xhc3M7XG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0TWV0aG9kcyAodGhlQ2xhc3MpIHtcbiAgICB2YXIgcHJvdG8gPSB0aGVDbGFzcy5wcm90b3R5cGU7XG5cbiAgICB2YXIgbWV0aG9kcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBwcm90bykge1xuICAgICAgdmFyIG0gPSBwcm90b1ttZXRob2ROYW1lXTtcblxuICAgICAgaWYgKHR5cGVvZiBtICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWV0aG9kTmFtZSA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbWV0aG9kcy5wdXNoKG1ldGhvZE5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2RzO1xuICB9XG5cbiAgVXRpbHMuRGVjb3JhdGUgPSBmdW5jdGlvbiAoU3VwZXJDbGFzcywgRGVjb3JhdG9yQ2xhc3MpIHtcbiAgICB2YXIgZGVjb3JhdGVkTWV0aG9kcyA9IGdldE1ldGhvZHMoRGVjb3JhdG9yQ2xhc3MpO1xuICAgIHZhciBzdXBlck1ldGhvZHMgPSBnZXRNZXRob2RzKFN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gRGVjb3JhdGVkQ2xhc3MgKCkge1xuICAgICAgdmFyIHVuc2hpZnQgPSBBcnJheS5wcm90b3R5cGUudW5zaGlmdDtcblxuICAgICAgdmFyIGFyZ0NvdW50ID0gRGVjb3JhdG9yQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yLmxlbmd0aDtcblxuICAgICAgdmFyIGNhbGxlZENvbnN0cnVjdG9yID0gU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3I7XG5cbiAgICAgIGlmIChhcmdDb3VudCA+IDApIHtcbiAgICAgICAgdW5zaGlmdC5jYWxsKGFyZ3VtZW50cywgU3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXG4gICAgICAgIGNhbGxlZENvbnN0cnVjdG9yID0gRGVjb3JhdG9yQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuICAgICAgfVxuXG4gICAgICBjYWxsZWRDb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIERlY29yYXRvckNsYXNzLmRpc3BsYXlOYW1lID0gU3VwZXJDbGFzcy5kaXNwbGF5TmFtZTtcblxuICAgIGZ1bmN0aW9uIGN0ciAoKSB7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yID0gRGVjb3JhdGVkQ2xhc3M7XG4gICAgfVxuXG4gICAgRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlID0gbmV3IGN0cigpO1xuXG4gICAgZm9yICh2YXIgbSA9IDA7IG0gPCBzdXBlck1ldGhvZHMubGVuZ3RoOyBtKyspIHtcbiAgICAgIHZhciBzdXBlck1ldGhvZCA9IHN1cGVyTWV0aG9kc1ttXTtcblxuICAgICAgRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlW3N1cGVyTWV0aG9kXSA9XG4gICAgICAgIFN1cGVyQ2xhc3MucHJvdG90eXBlW3N1cGVyTWV0aG9kXTtcbiAgICB9XG5cbiAgICB2YXIgY2FsbGVkTWV0aG9kID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICAgIC8vIFN0dWIgb3V0IHRoZSBvcmlnaW5hbCBtZXRob2QgaWYgaXQncyBub3QgZGVjb3JhdGluZyBhbiBhY3R1YWwgbWV0aG9kXG4gICAgICB2YXIgb3JpZ2luYWxNZXRob2QgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgICAgaWYgKG1ldGhvZE5hbWUgaW4gRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlKSB7XG4gICAgICAgIG9yaWdpbmFsTWV0aG9kID0gRGVjb3JhdGVkQ2xhc3MucHJvdG90eXBlW21ldGhvZE5hbWVdO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGVjb3JhdGVkTWV0aG9kID0gRGVjb3JhdG9yQ2xhc3MucHJvdG90eXBlW21ldGhvZE5hbWVdO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdW5zaGlmdCA9IEFycmF5LnByb3RvdHlwZS51bnNoaWZ0O1xuXG4gICAgICAgIHVuc2hpZnQuY2FsbChhcmd1bWVudHMsIG9yaWdpbmFsTWV0aG9kKTtcblxuICAgICAgICByZXR1cm4gZGVjb3JhdGVkTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBmb3IgKHZhciBkID0gMDsgZCA8IGRlY29yYXRlZE1ldGhvZHMubGVuZ3RoOyBkKyspIHtcbiAgICAgIHZhciBkZWNvcmF0ZWRNZXRob2QgPSBkZWNvcmF0ZWRNZXRob2RzW2RdO1xuXG4gICAgICBEZWNvcmF0ZWRDbGFzcy5wcm90b3R5cGVbZGVjb3JhdGVkTWV0aG9kXSA9IGNhbGxlZE1ldGhvZChkZWNvcmF0ZWRNZXRob2QpO1xuICAgIH1cblxuICAgIHJldHVybiBEZWNvcmF0ZWRDbGFzcztcbiAgfTtcblxuICB2YXIgT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICB9O1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMgfHwge307XG5cbiAgICBpZiAoZXZlbnQgaW4gdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdID0gW2NhbGxiYWNrXTtcbiAgICB9XG4gIH07XG5cbiAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgcGFyYW1zID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycyB8fCB7fTtcblxuICAgIC8vIFBhcmFtcyBzaG91bGQgYWx3YXlzIGNvbWUgaW4gYXMgYW4gYXJyYXlcbiAgICBpZiAocGFyYW1zID09IG51bGwpIHtcbiAgICAgIHBhcmFtcyA9IFtdO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBhcmd1bWVudHMgdG8gdGhlIGV2ZW50LCB1c2UgYSB0ZW1wb3Jhcnkgb2JqZWN0XG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHBhcmFtcy5wdXNoKHt9KTtcbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIGBfdHlwZWAgb2YgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgZXZlbnRcbiAgICBwYXJhbXNbMF0uX3R5cGUgPSBldmVudDtcblxuICAgIGlmIChldmVudCBpbiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgdGhpcy5pbnZva2UodGhpcy5saXN0ZW5lcnNbZXZlbnRdLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIH1cblxuICAgIGlmICgnKicgaW4gdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuaW52b2tlKHRoaXMubGlzdGVuZXJzWycqJ10sIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChsaXN0ZW5lcnMsIHBhcmFtcykge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBwYXJhbXMpO1xuICAgIH1cbiAgfTtcblxuICBVdGlscy5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcblxuICBVdGlscy5nZW5lcmF0ZUNoYXJzID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgIHZhciBjaGFycyA9ICcnO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJhbmRvbUNoYXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzNik7XG4gICAgICBjaGFycyArPSByYW5kb21DaGFyLnRvU3RyaW5nKDM2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhcnM7XG4gIH07XG5cbiAgVXRpbHMuYmluZCA9IGZ1bmN0aW9uIChmdW5jLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIFV0aWxzLl9jb252ZXJ0RGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZm9yICh2YXIgb3JpZ2luYWxLZXkgaW4gZGF0YSkge1xuICAgICAgdmFyIGtleXMgPSBvcmlnaW5hbEtleS5zcGxpdCgnLScpO1xuXG4gICAgICB2YXIgZGF0YUxldmVsID0gZGF0YTtcblxuICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IGtleXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNba107XG5cbiAgICAgICAgLy8gTG93ZXJjYXNlIHRoZSBmaXJzdCBsZXR0ZXJcbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgZGFzaC1zZXBhcmF0ZWQgYmVjb21lcyBjYW1lbENhc2VcbiAgICAgICAga2V5ID0ga2V5LnN1YnN0cmluZygwLCAxKS50b0xvd2VyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcblxuICAgICAgICBpZiAoIShrZXkgaW4gZGF0YUxldmVsKSkge1xuICAgICAgICAgIGRhdGFMZXZlbFtrZXldID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoayA9PSBrZXlzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBkYXRhTGV2ZWxba2V5XSA9IGRhdGFbb3JpZ2luYWxLZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YUxldmVsID0gZGF0YUxldmVsW2tleV07XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBkYXRhW29yaWdpbmFsS2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBVdGlscy5oYXNTY3JvbGwgPSBmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgLy8gQWRhcHRlZCBmcm9tIHRoZSBmdW5jdGlvbiBjcmVhdGVkIGJ5IEBTaGFkb3dTY3JpcHRlclxuICAgIC8vIGFuZCBhZGFwdGVkIGJ5IEBCaWxsQmFycnkgb24gdGhlIFN0YWNrIEV4Y2hhbmdlIENvZGUgUmV2aWV3IHdlYnNpdGUuXG4gICAgLy8gVGhlIG9yaWdpbmFsIGNvZGUgY2FuIGJlIGZvdW5kIGF0XG4gICAgLy8gaHR0cDovL2NvZGVyZXZpZXcuc3RhY2tleGNoYW5nZS5jb20vcS8xMzMzOFxuICAgIC8vIGFuZCB3YXMgZGVzaWduZWQgdG8gYmUgdXNlZCB3aXRoIHRoZSBTaXp6bGUgc2VsZWN0b3IgZW5naW5lLlxuXG4gICAgdmFyICRlbCA9ICQoZWwpO1xuICAgIHZhciBvdmVyZmxvd1ggPSBlbC5zdHlsZS5vdmVyZmxvd1g7XG4gICAgdmFyIG92ZXJmbG93WSA9IGVsLnN0eWxlLm92ZXJmbG93WTtcblxuICAgIC8vQ2hlY2sgYm90aCB4IGFuZCB5IGRlY2xhcmF0aW9uc1xuICAgIGlmIChvdmVyZmxvd1ggPT09IG92ZXJmbG93WSAmJlxuICAgICAgICAob3ZlcmZsb3dZID09PSAnaGlkZGVuJyB8fCBvdmVyZmxvd1kgPT09ICd2aXNpYmxlJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAob3ZlcmZsb3dYID09PSAnc2Nyb2xsJyB8fCBvdmVyZmxvd1kgPT09ICdzY3JvbGwnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCRlbC5pbm5lckhlaWdodCgpIDwgZWwuc2Nyb2xsSGVpZ2h0IHx8XG4gICAgICAkZWwuaW5uZXJXaWR0aCgpIDwgZWwuc2Nyb2xsV2lkdGgpO1xuICB9O1xuXG4gIFV0aWxzLmVzY2FwZU1hcmt1cCA9IGZ1bmN0aW9uIChtYXJrdXApIHtcbiAgICB2YXIgcmVwbGFjZU1hcCA9IHtcbiAgICAgICdcXFxcJzogJyYjOTI7JyxcbiAgICAgICcmJzogJyZhbXA7JyxcbiAgICAgICc8JzogJyZsdDsnLFxuICAgICAgJz4nOiAnJmd0OycsXG4gICAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAgICdcXCcnOiAnJiMzOTsnLFxuICAgICAgJy8nOiAnJiM0NzsnXG4gICAgfTtcblxuICAgIC8vIERvIG5vdCB0cnkgdG8gZXNjYXBlIHRoZSBtYXJrdXAgaWYgaXQncyBub3QgYSBzdHJpbmdcbiAgICBpZiAodHlwZW9mIG1hcmt1cCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtYXJrdXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZyhtYXJrdXApLnJlcGxhY2UoL1smPD5cIidcXC9cXFxcXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiByZXBsYWNlTWFwW21hdGNoXTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBDYWNoZSBvYmplY3RzIGluIFV0aWxzLl9fY2FjaGUgaW5zdGVhZCBvZiAkLmRhdGEgKHNlZSAjNDM0NilcbiAgVXRpbHMuX19jYWNoZSA9IHt9O1xuXG4gIHZhciBpZCA9IDA7XG4gIFV0aWxzLkdldFVuaXF1ZUVsZW1lbnRJZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8gR2V0IGEgdW5pcXVlIGVsZW1lbnQgSWQuIElmIGVsZW1lbnQgaGFzIG5vIGlkLFxuICAgIC8vIGNyZWF0ZXMgYSBuZXcgdW5pcXVlIG51bWJlciwgc3RvcmVzIGl0IGluIHRoZSBpZFxuICAgIC8vIGF0dHJpYnV0ZSBhbmQgcmV0dXJucyB0aGUgbmV3IGlkIHdpdGggYSBwcmVmaXguXG4gICAgLy8gSWYgYW4gaWQgYWxyZWFkeSBleGlzdHMsIGl0IHNpbXBseSByZXR1cm5zIGl0IHdpdGggYSBwcmVmaXguXG5cbiAgICB2YXIgc2VsZWN0MklkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0Mi1pZCcpO1xuXG4gICAgaWYgKHNlbGVjdDJJZCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gc2VsZWN0MklkO1xuICAgIH1cblxuICAgIC8vIElmIGVsZW1lbnQgaGFzIGlkLCB1c2UgaXQuXG4gICAgaWYgKGVsZW1lbnQuaWQpIHtcbiAgICAgIHNlbGVjdDJJZCA9ICdzZWxlY3QyLWRhdGEtJyArIGVsZW1lbnQuaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdDJJZCA9ICdzZWxlY3QyLWRhdGEtJyArICgrK2lkKS50b1N0cmluZygpICtcbiAgICAgICAgJy0nICsgVXRpbHMuZ2VuZXJhdGVDaGFycyg0KTtcbiAgICB9XG5cbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3QyLWlkJywgc2VsZWN0MklkKTtcblxuICAgIHJldHVybiBzZWxlY3QySWQ7XG4gIH07XG5cbiAgVXRpbHMuU3RvcmVEYXRhID0gZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gICAgLy8gU3RvcmVzIGFuIGl0ZW0gaW4gdGhlIGNhY2hlIGZvciBhIHNwZWNpZmllZCBlbGVtZW50LlxuICAgIC8vIG5hbWUgaXMgdGhlIGNhY2hlIGtleS5cbiAgICB2YXIgaWQgPSBVdGlscy5HZXRVbmlxdWVFbGVtZW50SWQoZWxlbWVudCk7XG4gICAgaWYgKCFVdGlscy5fX2NhY2hlW2lkXSkge1xuICAgICAgVXRpbHMuX19jYWNoZVtpZF0gPSB7fTtcbiAgICB9XG5cbiAgICBVdGlscy5fX2NhY2hlW2lkXVtuYW1lXSA9IHZhbHVlO1xuICB9O1xuXG4gIFV0aWxzLkdldERhdGEgPSBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSkge1xuICAgIC8vIFJldHJpZXZlcyBhIHZhbHVlIGZyb20gdGhlIGNhY2hlIGJ5IGl0cyBrZXkgKG5hbWUpXG4gICAgLy8gbmFtZSBpcyBvcHRpb25hbC4gSWYgbm8gbmFtZSBzcGVjaWZpZWQsIHJldHVyblxuICAgIC8vIGFsbCBjYWNoZSBpdGVtcyBmb3IgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgIC8vIGFuZCBmb3IgYSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICB2YXIgaWQgPSBVdGlscy5HZXRVbmlxdWVFbGVtZW50SWQoZWxlbWVudCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIGlmIChVdGlscy5fX2NhY2hlW2lkXSkge1xuICAgICAgICBpZiAoVXRpbHMuX19jYWNoZVtpZF1bbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBVdGlscy5fX2NhY2hlW2lkXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJChlbGVtZW50KS5kYXRhKG5hbWUpOyAvLyBGYWxsYmFjayB0byBIVE1MNSBkYXRhIGF0dHJpYnMuXG4gICAgICB9XG4gICAgICByZXR1cm4gJChlbGVtZW50KS5kYXRhKG5hbWUpOyAvLyBGYWxsYmFjayB0byBIVE1MNSBkYXRhIGF0dHJpYnMuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBVdGlscy5fX2NhY2hlW2lkXTtcbiAgICB9XG4gIH07XG5cbiAgVXRpbHMuUmVtb3ZlRGF0YSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8gUmVtb3ZlcyBhbGwgY2FjaGVkIGl0ZW1zIGZvciBhIHNwZWNpZmllZCBlbGVtZW50LlxuICAgIHZhciBpZCA9IFV0aWxzLkdldFVuaXF1ZUVsZW1lbnRJZChlbGVtZW50KTtcbiAgICBpZiAoVXRpbHMuX19jYWNoZVtpZF0gIT0gbnVsbCkge1xuICAgICAgZGVsZXRlIFV0aWxzLl9fY2FjaGVbaWRdO1xuICAgIH1cblxuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNlbGVjdDItaWQnKTtcbiAgfTtcblxuICBVdGlscy5jb3B5Tm9uSW50ZXJuYWxDc3NDbGFzc2VzID0gZnVuY3Rpb24gKGRlc3QsIHNyYykge1xuICAgIHZhciBjbGFzc2VzO1xuXG4gICAgdmFyIGRlc3RpbmF0aW9uQ2xhc3NlcyA9IGRlc3QuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuXG4gICAgZGVzdGluYXRpb25DbGFzc2VzID0gZGVzdGluYXRpb25DbGFzc2VzLmZpbHRlcihmdW5jdGlvbiAoY2xhenopIHtcbiAgICAgIC8vIFNhdmUgYWxsIFNlbGVjdDIgY2xhc3Nlc1xuICAgICAgcmV0dXJuIGNsYXp6LmluZGV4T2YoJ3NlbGVjdDItJykgPT09IDA7XG4gICAgfSk7XG5cbiAgICB2YXIgc291cmNlQ2xhc3NlcyA9IHNyYy5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG5cbiAgICBzb3VyY2VDbGFzc2VzID0gc291cmNlQ2xhc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKGNsYXp6KSB7XG4gICAgICAvLyBPbmx5IGNvcHkgbm9uLVNlbGVjdDIgY2xhc3Nlc1xuICAgICAgcmV0dXJuIGNsYXp6LmluZGV4T2YoJ3NlbGVjdDItJykgIT09IDA7XG4gICAgfSk7XG5cbiAgICB2YXIgcmVwbGFjZW1lbnRzID0gZGVzdGluYXRpb25DbGFzc2VzLmNvbmNhdChzb3VyY2VDbGFzc2VzKTtcblxuICAgIGRlc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIHJlcGxhY2VtZW50cy5qb2luKCcgJykpO1xuICB9O1xuXG4gIHJldHVybiBVdGlscztcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvcmVzdWx0cycsW1xuICAnanF1ZXJ5JyxcbiAgJy4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgVXRpbHMpIHtcbiAgZnVuY3Rpb24gUmVzdWx0cyAoJGVsZW1lbnQsIG9wdGlvbnMsIGRhdGFBZGFwdGVyKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGFBZGFwdGVyO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBSZXN1bHRzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB9XG5cbiAgVXRpbHMuRXh0ZW5kKFJlc3VsdHMsIFV0aWxzLk9ic2VydmFibGUpO1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHJlc3VsdHMgPSAkKFxuICAgICAgJzx1bCBjbGFzcz1cInNlbGVjdDItcmVzdWx0c19fb3B0aW9uc1wiIHJvbGU9XCJsaXN0Ym94XCI+PC91bD4nXG4gICAgKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZ2V0KCdtdWx0aXBsZScpKSB7XG4gICAgICAkcmVzdWx0cy5hdHRyKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsICd0cnVlJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kcmVzdWx0cyA9ICRyZXN1bHRzO1xuXG4gICAgcmV0dXJuICRyZXN1bHRzO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJlc3VsdHMuZW1wdHkoKTtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5kaXNwbGF5TWVzc2FnZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICB2YXIgZXNjYXBlTWFya3VwID0gdGhpcy5vcHRpb25zLmdldCgnZXNjYXBlTWFya3VwJyk7XG5cbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5oaWRlTG9hZGluZygpO1xuXG4gICAgdmFyICRtZXNzYWdlID0gJChcbiAgICAgICc8bGkgcm9sZT1cImFsZXJ0XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCInICtcbiAgICAgICcgY2xhc3M9XCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvblwiPjwvbGk+J1xuICAgICk7XG5cbiAgICB2YXIgbWVzc2FnZSA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldChwYXJhbXMubWVzc2FnZSk7XG5cbiAgICAkbWVzc2FnZS5hcHBlbmQoXG4gICAgICBlc2NhcGVNYXJrdXAoXG4gICAgICAgIG1lc3NhZ2UocGFyYW1zLmFyZ3MpXG4gICAgICApXG4gICAgKTtcblxuICAgICRtZXNzYWdlWzBdLmNsYXNzTmFtZSArPSAnIHNlbGVjdDItcmVzdWx0c19fbWVzc2FnZSc7XG5cbiAgICB0aGlzLiRyZXN1bHRzLmFwcGVuZCgkbWVzc2FnZSk7XG4gIH07XG5cbiAgUmVzdWx0cy5wcm90b3R5cGUuaGlkZU1lc3NhZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJlc3VsdHMuZmluZCgnLnNlbGVjdDItcmVzdWx0c19fbWVzc2FnZScpLnJlbW92ZSgpO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5oaWRlTG9hZGluZygpO1xuXG4gICAgdmFyICRvcHRpb25zID0gW107XG5cbiAgICBpZiAoZGF0YS5yZXN1bHRzID09IG51bGwgfHwgZGF0YS5yZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHRoaXMuJHJlc3VsdHMuY2hpbGRyZW4oKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdyZXN1bHRzOm1lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ25vUmVzdWx0cydcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkYXRhLnJlc3VsdHMgPSB0aGlzLnNvcnQoZGF0YS5yZXN1bHRzKTtcblxuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YS5yZXN1bHRzLmxlbmd0aDsgZCsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGRhdGEucmVzdWx0c1tkXTtcblxuICAgICAgdmFyICRvcHRpb24gPSB0aGlzLm9wdGlvbihpdGVtKTtcblxuICAgICAgJG9wdGlvbnMucHVzaCgkb3B0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLiRyZXN1bHRzLmFwcGVuZCgkb3B0aW9ucyk7XG4gIH07XG5cbiAgUmVzdWx0cy5wcm90b3R5cGUucG9zaXRpb24gPSBmdW5jdGlvbiAoJHJlc3VsdHMsICRkcm9wZG93bikge1xuICAgIHZhciAkcmVzdWx0c0NvbnRhaW5lciA9ICRkcm9wZG93bi5maW5kKCcuc2VsZWN0Mi1yZXN1bHRzJyk7XG4gICAgJHJlc3VsdHNDb250YWluZXIuYXBwZW5kKCRyZXN1bHRzKTtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5zb3J0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgc29ydGVyID0gdGhpcy5vcHRpb25zLmdldCgnc29ydGVyJyk7XG5cbiAgICByZXR1cm4gc29ydGVyKGRhdGEpO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmhpZ2hsaWdodEZpcnN0SXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJG9wdGlvbnMgPSB0aGlzLiRyZXN1bHRzXG4gICAgICAuZmluZCgnLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlJyk7XG5cbiAgICB2YXIgJHNlbGVjdGVkID0gJG9wdGlvbnMuZmlsdGVyKCcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkJyk7XG5cbiAgICAvLyBDaGVjayBpZiB0aGVyZSBhcmUgYW55IHNlbGVjdGVkIG9wdGlvbnNcbiAgICBpZiAoJHNlbGVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBzZWxlY3RlZCBvcHRpb25zLCBoaWdobGlnaHQgdGhlIGZpcnN0XG4gICAgICAkc2VsZWN0ZWQuZmlyc3QoKS50cmlnZ2VyKCdtb3VzZWVudGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBzZWxlY3RlZCBvcHRpb25zLCBoaWdobGlnaHQgdGhlIGZpcnN0IG9wdGlvblxuICAgICAgLy8gaW4gdGhlIGRyb3Bkb3duXG4gICAgICAkb3B0aW9ucy5maXJzdCgpLnRyaWdnZXIoJ21vdXNlZW50ZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLmVuc3VyZUhpZ2hsaWdodFZpc2libGUoKTtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5zZXRDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZGF0YS5jdXJyZW50KGZ1bmN0aW9uIChzZWxlY3RlZCkge1xuICAgICAgdmFyIHNlbGVjdGVkSWRzID0gc2VsZWN0ZWQubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldHVybiBzLmlkLnRvU3RyaW5nKCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyICRvcHRpb25zID0gc2VsZi4kcmVzdWx0c1xuICAgICAgICAuZmluZCgnLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlJyk7XG5cbiAgICAgICRvcHRpb25zLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG9wdGlvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgdmFyIGl0ZW0gPSBVdGlscy5HZXREYXRhKHRoaXMsICdkYXRhJyk7XG5cbiAgICAgICAgLy8gaWQgbmVlZHMgdG8gYmUgY29udmVydGVkIHRvIGEgc3RyaW5nIHdoZW4gY29tcGFyaW5nXG4gICAgICAgIHZhciBpZCA9ICcnICsgaXRlbS5pZDtcblxuICAgICAgICBpZiAoKGl0ZW0uZWxlbWVudCAhPSBudWxsICYmIGl0ZW0uZWxlbWVudC5zZWxlY3RlZCkgfHxcbiAgICAgICAgICAgIChpdGVtLmVsZW1lbnQgPT0gbnVsbCAmJiBzZWxlY3RlZElkcy5pbmRleE9mKGlkKSA+IC0xKSkge1xuICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkJyk7XG4gICAgICAgICAgJG9wdGlvbi5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RlZCcpO1xuICAgICAgICAgICRvcHRpb24uYXR0cignYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLnNob3dMb2FkaW5nID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcblxuICAgIHZhciBsb2FkaW5nTW9yZSA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldCgnc2VhcmNoaW5nJyk7XG5cbiAgICB2YXIgbG9hZGluZyA9IHtcbiAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgIHRleHQ6IGxvYWRpbmdNb3JlKHBhcmFtcylcbiAgICB9O1xuICAgIHZhciAkbG9hZGluZyA9IHRoaXMub3B0aW9uKGxvYWRpbmcpO1xuICAgICRsb2FkaW5nLmNsYXNzTmFtZSArPSAnIGxvYWRpbmctcmVzdWx0cyc7XG5cbiAgICB0aGlzLiRyZXN1bHRzLnByZXBlbmQoJGxvYWRpbmcpO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmhpZGVMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJlc3VsdHMuZmluZCgnLmxvYWRpbmctcmVzdWx0cycpLnJlbW92ZSgpO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLm9wdGlvbiA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uJyk7XG4gICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlJyk7XG5cbiAgICB2YXIgYXR0cnMgPSB7XG4gICAgICAncm9sZSc6ICdvcHRpb24nXG4gICAgfTtcblxuICAgIHZhciBtYXRjaGVzID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHxcbiAgICAgIHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgd2luZG93LkVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcblxuICAgIGlmICgoZGF0YS5lbGVtZW50ICE9IG51bGwgJiYgbWF0Y2hlcy5jYWxsKGRhdGEuZWxlbWVudCwgJzpkaXNhYmxlZCcpKSB8fFxuICAgICAgICAoZGF0YS5lbGVtZW50ID09IG51bGwgJiYgZGF0YS5kaXNhYmxlZCkpIHtcbiAgICAgIGF0dHJzWydhcmlhLWRpc2FibGVkJ10gPSAndHJ1ZSc7XG5cbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZScpO1xuICAgICAgb3B0aW9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1kaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmlkID09IG51bGwpIHtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZScpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLl9yZXN1bHRJZCAhPSBudWxsKSB7XG4gICAgICBvcHRpb24uaWQgPSBkYXRhLl9yZXN1bHRJZDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS50aXRsZSkge1xuICAgICAgb3B0aW9uLnRpdGxlID0gZGF0YS50aXRsZTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5jaGlsZHJlbikge1xuICAgICAgYXR0cnMucm9sZSA9ICdncm91cCc7XG4gICAgICBhdHRyc1snYXJpYS1sYWJlbCddID0gZGF0YS50ZXh0O1xuXG4gICAgICBvcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnKTtcbiAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tZ3JvdXAnKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBhdHRyIGluIGF0dHJzKSB7XG4gICAgICB2YXIgdmFsID0gYXR0cnNbYXR0cl07XG5cbiAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5jaGlsZHJlbikge1xuICAgICAgdmFyICRvcHRpb24gPSAkKG9wdGlvbik7XG5cbiAgICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0cm9uZycpO1xuICAgICAgbGFiZWwuY2xhc3NOYW1lID0gJ3NlbGVjdDItcmVzdWx0c19fZ3JvdXAnO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlKGRhdGEsIGxhYmVsKTtcblxuICAgICAgdmFyICRjaGlsZHJlbiA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGRhdGEuY2hpbGRyZW4ubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gZGF0YS5jaGlsZHJlbltjXTtcblxuICAgICAgICB2YXIgJGNoaWxkID0gdGhpcy5vcHRpb24oY2hpbGQpO1xuXG4gICAgICAgICRjaGlsZHJlbi5wdXNoKCRjaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIHZhciAkY2hpbGRyZW5Db250YWluZXIgPSAkKCc8dWw+PC91bD4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdzZWxlY3QyLXJlc3VsdHNfX29wdGlvbnMgc2VsZWN0Mi1yZXN1bHRzX19vcHRpb25zLS1uZXN0ZWQnLFxuICAgICAgICAncm9sZSc6ICdub25lJ1xuICAgICAgfSk7XG5cbiAgICAgICRjaGlsZHJlbkNvbnRhaW5lci5hcHBlbmQoJGNoaWxkcmVuKTtcblxuICAgICAgJG9wdGlvbi5hcHBlbmQobGFiZWwpO1xuICAgICAgJG9wdGlvbi5hcHBlbmQoJGNoaWxkcmVuQ29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZW1wbGF0ZShkYXRhLCBvcHRpb24pO1xuICAgIH1cblxuICAgIFV0aWxzLlN0b3JlRGF0YShvcHRpb24sICdkYXRhJywgZGF0YSk7XG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9O1xuXG4gIFJlc3VsdHMucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIGlkID0gY29udGFpbmVyLmlkICsgJy1yZXN1bHRzJztcblxuICAgIHRoaXMuJHJlc3VsdHMuYXR0cignaWQnLCBpZCk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6YWxsJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgc2VsZi5jbGVhcigpO1xuICAgICAgc2VsZi5hcHBlbmQocGFyYW1zLmRhdGEpO1xuXG4gICAgICBpZiAoY29udGFpbmVyLmlzT3BlbigpKSB7XG4gICAgICAgIHNlbGYuc2V0Q2xhc3NlcygpO1xuICAgICAgICBzZWxmLmhpZ2hsaWdodEZpcnN0SXRlbSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdyZXN1bHRzOmFwcGVuZCcsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHNlbGYuYXBwZW5kKHBhcmFtcy5kYXRhKTtcblxuICAgICAgaWYgKGNvbnRhaW5lci5pc09wZW4oKSkge1xuICAgICAgICBzZWxmLnNldENsYXNzZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncXVlcnknLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLmhpZGVNZXNzYWdlcygpO1xuICAgICAgc2VsZi5zaG93TG9hZGluZyhwYXJhbXMpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWNvbnRhaW5lci5pc09wZW4oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuc2V0Q2xhc3NlcygpO1xuXG4gICAgICBpZiAoc2VsZi5vcHRpb25zLmdldCgnc2Nyb2xsQWZ0ZXJTZWxlY3QnKSkge1xuICAgICAgICBzZWxmLmhpZ2hsaWdodEZpcnN0SXRlbSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCd1bnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghY29udGFpbmVyLmlzT3BlbigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5zZXRDbGFzc2VzKCk7XG5cbiAgICAgIGlmIChzZWxmLm9wdGlvbnMuZ2V0KCdzY3JvbGxBZnRlclNlbGVjdCcpKSB7XG4gICAgICAgIHNlbGYuaGlnaGxpZ2h0Rmlyc3RJdGVtKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBXaGVuIHRoZSBkcm9wZG93biBpcyBvcGVuLCBhcmlhLWV4cGVuZGVkPVwidHJ1ZVwiXG4gICAgICBzZWxmLiRyZXN1bHRzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgc2VsZi4kcmVzdWx0cy5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICBzZWxmLnNldENsYXNzZXMoKTtcbiAgICAgIHNlbGYuZW5zdXJlSGlnaGxpZ2h0VmlzaWJsZSgpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFdoZW4gdGhlIGRyb3Bkb3duIGlzIGNsb3NlZCwgYXJpYS1leHBlbmRlZD1cImZhbHNlXCJcbiAgICAgIHNlbGYuJHJlc3VsdHMuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgc2VsZi4kcmVzdWx0cy5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICBzZWxmLiRyZXN1bHRzLnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdyZXN1bHRzOnRvZ2dsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkaGlnaGxpZ2h0ZWQgPSBzZWxmLmdldEhpZ2hsaWdodGVkUmVzdWx0cygpO1xuXG4gICAgICBpZiAoJGhpZ2hsaWdodGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICRoaWdobGlnaHRlZC50cmlnZ2VyKCdtb3VzZXVwJyk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6c2VsZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRoaWdobGlnaHRlZCA9IHNlbGYuZ2V0SGlnaGxpZ2h0ZWRSZXN1bHRzKCk7XG5cbiAgICAgIGlmICgkaGlnaGxpZ2h0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdGEgPSBVdGlscy5HZXREYXRhKCRoaWdobGlnaHRlZFswXSwgJ2RhdGEnKTtcblxuICAgICAgaWYgKCRoaWdobGlnaHRlZC5oYXNDbGFzcygnc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkJykpIHtcbiAgICAgICAgc2VsZi50cmlnZ2VyKCdjbG9zZScsIHt9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0Jywge1xuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6cHJldmlvdXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJGhpZ2hsaWdodGVkID0gc2VsZi5nZXRIaWdobGlnaHRlZFJlc3VsdHMoKTtcblxuICAgICAgdmFyICRvcHRpb25zID0gc2VsZi4kcmVzdWx0cy5maW5kKCcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnKTtcblxuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9ICRvcHRpb25zLmluZGV4KCRoaWdobGlnaHRlZCk7XG5cbiAgICAgIC8vIElmIHdlIGFyZSBhbHJlYWR5IGF0IHRoZSB0b3AsIGRvbid0IG1vdmUgZnVydGhlclxuICAgICAgLy8gSWYgbm8gb3B0aW9ucywgY3VycmVudEluZGV4IHdpbGwgYmUgLTFcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPD0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuXG4gICAgICAvLyBJZiBub25lIGFyZSBoaWdobGlnaHRlZCwgaGlnaGxpZ2h0IHRoZSBmaXJzdFxuICAgICAgaWYgKCRoaWdobGlnaHRlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbmV4dEluZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgdmFyICRuZXh0ID0gJG9wdGlvbnMuZXEobmV4dEluZGV4KTtcblxuICAgICAgJG5leHQudHJpZ2dlcignbW91c2VlbnRlcicpO1xuXG4gICAgICB2YXIgY3VycmVudE9mZnNldCA9IHNlbGYuJHJlc3VsdHMub2Zmc2V0KCkudG9wO1xuICAgICAgdmFyIG5leHRUb3AgPSAkbmV4dC5vZmZzZXQoKS50b3A7XG4gICAgICB2YXIgbmV4dE9mZnNldCA9IHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKCkgKyAobmV4dFRvcCAtIGN1cnJlbnRPZmZzZXQpO1xuXG4gICAgICBpZiAobmV4dEluZGV4ID09PSAwKSB7XG4gICAgICAgIHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKDApO1xuICAgICAgfSBlbHNlIGlmIChuZXh0VG9wIC0gY3VycmVudE9mZnNldCA8IDApIHtcbiAgICAgICAgc2VsZi4kcmVzdWx0cy5zY3JvbGxUb3AobmV4dE9mZnNldCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6bmV4dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkaGlnaGxpZ2h0ZWQgPSBzZWxmLmdldEhpZ2hsaWdodGVkUmVzdWx0cygpO1xuXG4gICAgICB2YXIgJG9wdGlvbnMgPSBzZWxmLiRyZXN1bHRzLmZpbmQoJy5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZScpO1xuXG4gICAgICB2YXIgY3VycmVudEluZGV4ID0gJG9wdGlvbnMuaW5kZXgoJGhpZ2hsaWdodGVkKTtcblxuICAgICAgdmFyIG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XG5cbiAgICAgIC8vIElmIHdlIGFyZSBhdCB0aGUgbGFzdCBvcHRpb24sIHN0YXkgdGhlcmVcbiAgICAgIGlmIChuZXh0SW5kZXggPj0gJG9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyICRuZXh0ID0gJG9wdGlvbnMuZXEobmV4dEluZGV4KTtcblxuICAgICAgJG5leHQudHJpZ2dlcignbW91c2VlbnRlcicpO1xuXG4gICAgICB2YXIgY3VycmVudE9mZnNldCA9IHNlbGYuJHJlc3VsdHMub2Zmc2V0KCkudG9wICtcbiAgICAgICAgc2VsZi4kcmVzdWx0cy5vdXRlckhlaWdodChmYWxzZSk7XG4gICAgICB2YXIgbmV4dEJvdHRvbSA9ICRuZXh0Lm9mZnNldCgpLnRvcCArICRuZXh0Lm91dGVySGVpZ2h0KGZhbHNlKTtcbiAgICAgIHZhciBuZXh0T2Zmc2V0ID0gc2VsZi4kcmVzdWx0cy5zY3JvbGxUb3AoKSArIG5leHRCb3R0b20gLSBjdXJyZW50T2Zmc2V0O1xuXG4gICAgICBpZiAobmV4dEluZGV4ID09PSAwKSB7XG4gICAgICAgIHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKDApO1xuICAgICAgfSBlbHNlIGlmIChuZXh0Qm90dG9tID4gY3VycmVudE9mZnNldCkge1xuICAgICAgICBzZWxmLiRyZXN1bHRzLnNjcm9sbFRvcChuZXh0T2Zmc2V0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncmVzdWx0czpmb2N1cycsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHBhcmFtcy5lbGVtZW50WzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1oaWdobGlnaHRlZCcpO1xuICAgICAgcGFyYW1zLmVsZW1lbnRbMF0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncmVzdWx0czptZXNzYWdlJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgc2VsZi5kaXNwbGF5TWVzc2FnZShwYXJhbXMpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQuZm4ubW91c2V3aGVlbCkge1xuICAgICAgdGhpcy4kcmVzdWx0cy5vbignbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciB0b3AgPSBzZWxmLiRyZXN1bHRzLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgIHZhciBib3R0b20gPSBzZWxmLiRyZXN1bHRzLmdldCgwKS5zY3JvbGxIZWlnaHQgLSB0b3AgKyBlLmRlbHRhWTtcblxuICAgICAgICB2YXIgaXNBdFRvcCA9IGUuZGVsdGFZID4gMCAmJiB0b3AgLSBlLmRlbHRhWSA8PSAwO1xuICAgICAgICB2YXIgaXNBdEJvdHRvbSA9IGUuZGVsdGFZIDwgMCAmJiBib3R0b20gPD0gc2VsZi4kcmVzdWx0cy5oZWlnaHQoKTtcblxuICAgICAgICBpZiAoaXNBdFRvcCkge1xuICAgICAgICAgIHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKDApO1xuXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBdEJvdHRvbSkge1xuICAgICAgICAgIHNlbGYuJHJlc3VsdHMuc2Nyb2xsVG9wKFxuICAgICAgICAgICAgc2VsZi4kcmVzdWx0cy5nZXQoMCkuc2Nyb2xsSGVpZ2h0IC0gc2VsZi4kcmVzdWx0cy5oZWlnaHQoKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy4kcmVzdWx0cy5vbignbW91c2V1cCcsICcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnLFxuICAgICAgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgdmFyIGRhdGEgPSBVdGlscy5HZXREYXRhKHRoaXMsICdkYXRhJyk7XG5cbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkJykpIHtcbiAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5nZXQoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3Vuc2VsZWN0Jywge1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0LFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcignY2xvc2UnLCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0Jywge1xuICAgICAgICBvcmlnaW5hbEV2ZW50OiBldnQsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kcmVzdWx0cy5vbignbW91c2VlbnRlcicsICcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnLFxuICAgICAgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgdmFyIGRhdGEgPSBVdGlscy5HZXREYXRhKHRoaXMsICdkYXRhJyk7XG5cbiAgICAgIHNlbGYuZ2V0SGlnaGxpZ2h0ZWRSZXN1bHRzKClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1oaWdobGlnaHRlZCcpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcblxuICAgICAgc2VsZi50cmlnZ2VyKCdyZXN1bHRzOmZvY3VzJywge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBlbGVtZW50OiAkKHRoaXMpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5nZXRIaWdobGlnaHRlZFJlc3VsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRoaWdobGlnaHRlZCA9IHRoaXMuJHJlc3VsdHNcbiAgICAuZmluZCgnLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1oaWdobGlnaHRlZCcpO1xuXG4gICAgcmV0dXJuICRoaWdobGlnaHRlZDtcbiAgfTtcblxuICBSZXN1bHRzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJlc3VsdHMucmVtb3ZlKCk7XG4gIH07XG5cbiAgUmVzdWx0cy5wcm90b3R5cGUuZW5zdXJlSGlnaGxpZ2h0VmlzaWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGhpZ2hsaWdodGVkID0gdGhpcy5nZXRIaWdobGlnaHRlZFJlc3VsdHMoKTtcblxuICAgIGlmICgkaGlnaGxpZ2h0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyICRvcHRpb25zID0gdGhpcy4kcmVzdWx0cy5maW5kKCcuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGUnKTtcblxuICAgIHZhciBjdXJyZW50SW5kZXggPSAkb3B0aW9ucy5pbmRleCgkaGlnaGxpZ2h0ZWQpO1xuXG4gICAgdmFyIGN1cnJlbnRPZmZzZXQgPSB0aGlzLiRyZXN1bHRzLm9mZnNldCgpLnRvcDtcbiAgICB2YXIgbmV4dFRvcCA9ICRoaWdobGlnaHRlZC5vZmZzZXQoKS50b3A7XG4gICAgdmFyIG5leHRPZmZzZXQgPSB0aGlzLiRyZXN1bHRzLnNjcm9sbFRvcCgpICsgKG5leHRUb3AgLSBjdXJyZW50T2Zmc2V0KTtcblxuICAgIHZhciBvZmZzZXREZWx0YSA9IG5leHRUb3AgLSBjdXJyZW50T2Zmc2V0O1xuICAgIG5leHRPZmZzZXQgLT0gJGhpZ2hsaWdodGVkLm91dGVySGVpZ2h0KGZhbHNlKSAqIDI7XG5cbiAgICBpZiAoY3VycmVudEluZGV4IDw9IDIpIHtcbiAgICAgIHRoaXMuJHJlc3VsdHMuc2Nyb2xsVG9wKDApO1xuICAgIH0gZWxzZSBpZiAob2Zmc2V0RGVsdGEgPiB0aGlzLiRyZXN1bHRzLm91dGVySGVpZ2h0KCkgfHwgb2Zmc2V0RGVsdGEgPCAwKSB7XG4gICAgICB0aGlzLiRyZXN1bHRzLnNjcm9sbFRvcChuZXh0T2Zmc2V0KTtcbiAgICB9XG4gIH07XG5cbiAgUmVzdWx0cy5wcm90b3R5cGUudGVtcGxhdGUgPSBmdW5jdGlvbiAocmVzdWx0LCBjb250YWluZXIpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMuZ2V0KCd0ZW1wbGF0ZVJlc3VsdCcpO1xuICAgIHZhciBlc2NhcGVNYXJrdXAgPSB0aGlzLm9wdGlvbnMuZ2V0KCdlc2NhcGVNYXJrdXAnKTtcblxuICAgIHZhciBjb250ZW50ID0gdGVtcGxhdGUocmVzdWx0LCBjb250YWluZXIpO1xuXG4gICAgaWYgKGNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBlc2NhcGVNYXJrdXAoY29udGVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoY29udGFpbmVyKS5hcHBlbmQoY29udGVudCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBSZXN1bHRzO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9rZXlzJyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIEtFWVMgPSB7XG4gICAgQkFDS1NQQUNFOiA4LFxuICAgIFRBQjogOSxcbiAgICBFTlRFUjogMTMsXG4gICAgU0hJRlQ6IDE2LFxuICAgIENUUkw6IDE3LFxuICAgIEFMVDogMTgsXG4gICAgRVNDOiAyNyxcbiAgICBTUEFDRTogMzIsXG4gICAgUEFHRV9VUDogMzMsXG4gICAgUEFHRV9ET1dOOiAzNCxcbiAgICBFTkQ6IDM1LFxuICAgIEhPTUU6IDM2LFxuICAgIExFRlQ6IDM3LFxuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgRE9XTjogNDAsXG4gICAgREVMRVRFOiA0NlxuICB9O1xuXG4gIHJldHVybiBLRVlTO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vYmFzZScsW1xuICAnanF1ZXJ5JyxcbiAgJy4uL3V0aWxzJyxcbiAgJy4uL2tleXMnXG5dLCBmdW5jdGlvbiAoJCwgVXRpbHMsIEtFWVMpIHtcbiAgZnVuY3Rpb24gQmFzZVNlbGVjdGlvbiAoJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIEJhc2VTZWxlY3Rpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoQmFzZVNlbGVjdGlvbiwgVXRpbHMuT2JzZXJ2YWJsZSk7XG5cbiAgQmFzZVNlbGVjdGlvbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkc2VsZWN0aW9uID0gJChcbiAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uXCIgcm9sZT1cImNvbWJvYm94XCIgJyArXG4gICAgICAnIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+JyArXG4gICAgICAnPC9zcGFuPidcbiAgICApO1xuXG4gICAgdGhpcy5fdGFiaW5kZXggPSAwO1xuXG4gICAgaWYgKFV0aWxzLkdldERhdGEodGhpcy4kZWxlbWVudFswXSwgJ29sZC10YWJpbmRleCcpICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3RhYmluZGV4ID0gVXRpbHMuR2V0RGF0YSh0aGlzLiRlbGVtZW50WzBdLCAnb2xkLXRhYmluZGV4Jyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiRlbGVtZW50LmF0dHIoJ3RhYmluZGV4JykgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdGFiaW5kZXggPSB0aGlzLiRlbGVtZW50LmF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgfVxuXG4gICAgJHNlbGVjdGlvbi5hdHRyKCd0aXRsZScsIHRoaXMuJGVsZW1lbnQuYXR0cigndGl0bGUnKSk7XG4gICAgJHNlbGVjdGlvbi5hdHRyKCd0YWJpbmRleCcsIHRoaXMuX3RhYmluZGV4KTtcbiAgICAkc2VsZWN0aW9uLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbiA9ICRzZWxlY3Rpb247XG5cbiAgICByZXR1cm4gJHNlbGVjdGlvbjtcbiAgfTtcblxuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciByZXN1bHRzSWQgPSBjb250YWluZXIuaWQgKyAnLXJlc3VsdHMnO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2ZvY3VzJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdmb2N1cycsIGV2dCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2JsdXInLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBzZWxmLl9oYW5kbGVCbHVyKGV2dCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBzZWxmLnRyaWdnZXIoJ2tleXByZXNzJywgZXZ0KTtcblxuICAgICAgaWYgKGV2dC53aGljaCA9PT0gS0VZUy5TUEFDRSkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncmVzdWx0czpmb2N1cycsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHNlbGYuJHNlbGVjdGlvbi5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBwYXJhbXMuZGF0YS5fcmVzdWx0SWQpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdzZWxlY3Rpb246dXBkYXRlJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgc2VsZi51cGRhdGUocGFyYW1zLmRhdGEpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gV2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbiwgYXJpYS1leHBhbmRlZD1cInRydWVcIlxuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ2FyaWEtb3ducycsIHJlc3VsdHNJZCk7XG5cbiAgICAgIHNlbGYuX2F0dGFjaENsb3NlSGFuZGxlcihjb250YWluZXIpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFdoZW4gdGhlIGRyb3Bkb3duIGlzIGNsb3NlZCwgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgIHNlbGYuJHNlbGVjdGlvbi5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICBzZWxmLiRzZWxlY3Rpb24ucmVtb3ZlQXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICBzZWxmLiRzZWxlY3Rpb24ucmVtb3ZlQXR0cignYXJpYS1vd25zJyk7XG5cbiAgICAgIHNlbGYuJHNlbGVjdGlvbi50cmlnZ2VyKCdmb2N1cycpO1xuXG4gICAgICBzZWxmLl9kZXRhY2hDbG9zZUhhbmRsZXIoY29udGFpbmVyKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbignZW5hYmxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ3RhYmluZGV4Jywgc2VsZi5fdGFiaW5kZXgpO1xuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbignZGlzYWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuJHNlbGVjdGlvbi5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgc2VsZi4kc2VsZWN0aW9uLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhc2VTZWxlY3Rpb24ucHJvdG90eXBlLl9oYW5kbGVCbHVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVsYXllZCBhcyB0aGUgYWN0aXZlIGVsZW1lbnQgaXMgdGhlIGJvZHkgd2hlbiB0aGUgdGFiXG4gICAgLy8ga2V5IGlzIHByZXNzZWQsIHBvc3NpYmx5IGFsb25nIHdpdGggb3RoZXJzLlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIERvbid0IHRyaWdnZXIgYGJsdXJgIGlmIHRoZSBmb2N1cyBpcyBzdGlsbCBpbiB0aGUgc2VsZWN0aW9uXG4gICAgICBpZiAoXG4gICAgICAgIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09IHNlbGYuJHNlbGVjdGlvblswXSkgfHxcbiAgICAgICAgKCQuY29udGFpbnMoc2VsZi4kc2VsZWN0aW9uWzBdLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJpZ2dlcignYmx1cicsIGV2dCk7XG4gICAgfSwgMSk7XG4gIH07XG5cbiAgQmFzZVNlbGVjdGlvbi5wcm90b3R5cGUuX2F0dGFjaENsb3NlSGFuZGxlciA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcblxuICAgICQoZG9jdW1lbnQuYm9keSkub24oJ21vdXNlZG93bi5zZWxlY3QyLicgKyBjb250YWluZXIuaWQsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXG4gICAgICB2YXIgJHNlbGVjdCA9ICR0YXJnZXQuY2xvc2VzdCgnLnNlbGVjdDInKTtcblxuICAgICAgdmFyICRhbGwgPSAkKCcuc2VsZWN0Mi5zZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpO1xuXG4gICAgICAkYWxsLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcyA9PSAkc2VsZWN0WzBdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyICRlbGVtZW50ID0gVXRpbHMuR2V0RGF0YSh0aGlzLCAnZWxlbWVudCcpO1xuXG4gICAgICAgICRlbGVtZW50LnNlbGVjdDIoJ2Nsb3NlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5fZGV0YWNoQ2xvc2VIYW5kbGVyID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICQoZG9jdW1lbnQuYm9keSkub2ZmKCdtb3VzZWRvd24uc2VsZWN0Mi4nICsgY29udGFpbmVyLmlkKTtcbiAgfTtcblxuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5wb3NpdGlvbiA9IGZ1bmN0aW9uICgkc2VsZWN0aW9uLCAkY29udGFpbmVyKSB7XG4gICAgdmFyICRzZWxlY3Rpb25Db250YWluZXIgPSAkY29udGFpbmVyLmZpbmQoJy5zZWxlY3Rpb24nKTtcbiAgICAkc2VsZWN0aW9uQ29udGFpbmVyLmFwcGVuZCgkc2VsZWN0aW9uKTtcbiAgfTtcblxuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2RldGFjaENsb3NlSGFuZGxlcih0aGlzLmNvbnRhaW5lcik7XG4gIH07XG5cbiAgQmFzZVNlbGVjdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgdXBkYXRlYCBtZXRob2QgbXVzdCBiZSBkZWZpbmVkIGluIGNoaWxkIGNsYXNzZXMuJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gYWJzdHJhY3QgdGhlIFwiZW5hYmxlZFwiIChub3QgXCJkaXNhYmxlZFwiKSBzdGF0ZSBvZiB0aGlzXG4gICAqIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybiB7dHJ1ZX0gaWYgdGhlIGluc3RhbmNlIGlzIG5vdCBkaXNhYmxlZC5cbiAgICogQHJldHVybiB7ZmFsc2V9IGlmIHRoZSBpbnN0YW5jZSBpcyBkaXNhYmxlZC5cbiAgICovXG4gIEJhc2VTZWxlY3Rpb24ucHJvdG90eXBlLmlzRW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNEaXNhYmxlZCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIZWxwZXIgbWV0aG9kIHRvIGFic3RyYWN0IHRoZSBcImRpc2FibGVkXCIgc3RhdGUgb2YgdGhpcyBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm4ge3RydWV9IGlmIHRoZSBkaXNhYmxlZCBvcHRpb24gaXMgdHJ1ZS5cbiAgICogQHJldHVybiB7ZmFsc2V9IGlmIHRoZSBkaXNhYmxlZCBvcHRpb24gaXMgZmFsc2UuXG4gICAqL1xuICBCYXNlU2VsZWN0aW9uLnByb3RvdHlwZS5pc0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ2V0KCdkaXNhYmxlZCcpO1xuICB9O1xuXG4gIHJldHVybiBCYXNlU2VsZWN0aW9uO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vc2luZ2xlJyxbXG4gICdqcXVlcnknLFxuICAnLi9iYXNlJyxcbiAgJy4uL3V0aWxzJyxcbiAgJy4uL2tleXMnXG5dLCBmdW5jdGlvbiAoJCwgQmFzZVNlbGVjdGlvbiwgVXRpbHMsIEtFWVMpIHtcbiAgZnVuY3Rpb24gU2luZ2xlU2VsZWN0aW9uICgpIHtcbiAgICBTaW5nbGVTZWxlY3Rpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoU2luZ2xlU2VsZWN0aW9uLCBCYXNlU2VsZWN0aW9uKTtcblxuICBTaW5nbGVTZWxlY3Rpb24ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHNlbGVjdGlvbiA9IFNpbmdsZVNlbGVjdGlvbi5fX3N1cGVyX18ucmVuZGVyLmNhbGwodGhpcyk7XG5cbiAgICAkc2VsZWN0aW9uWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItc2VsZWN0aW9uLS1zaW5nbGUnKTtcblxuICAgICRzZWxlY3Rpb24uaHRtbChcbiAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZFwiPjwvc3Bhbj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uX19hcnJvd1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj4nICtcbiAgICAgICAgJzxiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48L2I+JyArXG4gICAgICAnPC9zcGFuPidcbiAgICApO1xuXG4gICAgcmV0dXJuICRzZWxlY3Rpb247XG4gIH07XG5cbiAgU2luZ2xlU2VsZWN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIFNpbmdsZVNlbGVjdGlvbi5fX3N1cGVyX18uYmluZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGlkID0gY29udGFpbmVyLmlkICsgJy1jb250YWluZXInO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWQnKVxuICAgICAgLmF0dHIoJ2lkJywgaWQpXG4gICAgICAuYXR0cigncm9sZScsICd0ZXh0Ym94JylcbiAgICAgIC5hdHRyKCdhcmlhLXJlYWRvbmx5JywgJ3RydWUnKTtcbiAgICB0aGlzLiRzZWxlY3Rpb24uYXR0cignYXJpYS1sYWJlbGxlZGJ5JywgaWQpO1xuICAgIHRoaXMuJHNlbGVjdGlvbi5hdHRyKCdhcmlhLWNvbnRyb2xzJywgaWQpO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAvLyBPbmx5IHJlc3BvbmQgdG8gbGVmdCBjbGlja3NcbiAgICAgIGlmIChldnQud2hpY2ggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnRyaWdnZXIoJ3RvZ2dsZScsIHtcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5vbignZm9jdXMnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAvLyBVc2VyIGZvY3VzZXMgb24gdGhlIGNvbnRhaW5lclxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdibHVyJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgLy8gVXNlciBleGl0cyB0aGUgY29udGFpbmVyXG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2ZvY3VzJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgaWYgKCFjb250YWluZXIuaXNPcGVuKCkpIHtcbiAgICAgICAgc2VsZi4kc2VsZWN0aW9uLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgU2luZ2xlU2VsZWN0aW9uLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHJlbmRlcmVkID0gdGhpcy4kc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWQnKTtcbiAgICAkcmVuZGVyZWQuZW1wdHkoKTtcbiAgICAkcmVuZGVyZWQucmVtb3ZlQXR0cigndGl0bGUnKTsgLy8gY2xlYXIgdG9vbHRpcCBvbiBlbXB0eVxuICB9O1xuXG4gIFNpbmdsZVNlbGVjdGlvbi5wcm90b3R5cGUuZGlzcGxheSA9IGZ1bmN0aW9uIChkYXRhLCBjb250YWluZXIpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMuZ2V0KCd0ZW1wbGF0ZVNlbGVjdGlvbicpO1xuICAgIHZhciBlc2NhcGVNYXJrdXAgPSB0aGlzLm9wdGlvbnMuZ2V0KCdlc2NhcGVNYXJrdXAnKTtcblxuICAgIHJldHVybiBlc2NhcGVNYXJrdXAodGVtcGxhdGUoZGF0YSwgY29udGFpbmVyKSk7XG4gIH07XG5cbiAgU2luZ2xlU2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3Rpb25Db250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQoJzxzcGFuPjwvc3Bhbj4nKTtcbiAgfTtcblxuICBTaW5nbGVTZWxlY3Rpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNlbGVjdGlvbiA9IGRhdGFbMF07XG5cbiAgICB2YXIgJHJlbmRlcmVkID0gdGhpcy4kc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWQnKTtcbiAgICB2YXIgZm9ybWF0dGVkID0gdGhpcy5kaXNwbGF5KHNlbGVjdGlvbiwgJHJlbmRlcmVkKTtcblxuICAgICRyZW5kZXJlZC5lbXB0eSgpLmFwcGVuZChmb3JtYXR0ZWQpO1xuXG4gICAgdmFyIHRpdGxlID0gc2VsZWN0aW9uLnRpdGxlIHx8IHNlbGVjdGlvbi50ZXh0O1xuXG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICAkcmVuZGVyZWQuYXR0cigndGl0bGUnLCB0aXRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRyZW5kZXJlZC5yZW1vdmVBdHRyKCd0aXRsZScpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU2luZ2xlU2VsZWN0aW9uO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vbXVsdGlwbGUnLFtcbiAgJ2pxdWVyeScsXG4gICcuL2Jhc2UnLFxuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgQmFzZVNlbGVjdGlvbiwgVXRpbHMpIHtcbiAgZnVuY3Rpb24gTXVsdGlwbGVTZWxlY3Rpb24gKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgTXVsdGlwbGVTZWxlY3Rpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoTXVsdGlwbGVTZWxlY3Rpb24sIEJhc2VTZWxlY3Rpb24pO1xuXG4gIE11bHRpcGxlU2VsZWN0aW9uLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRzZWxlY3Rpb24gPSBNdWx0aXBsZVNlbGVjdGlvbi5fX3N1cGVyX18ucmVuZGVyLmNhbGwodGhpcyk7XG5cbiAgICAkc2VsZWN0aW9uWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItc2VsZWN0aW9uLS1tdWx0aXBsZScpO1xuXG4gICAgJHNlbGVjdGlvbi5odG1sKFxuICAgICAgJzx1bCBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZFwiPjwvdWw+J1xuICAgICk7XG5cbiAgICByZXR1cm4gJHNlbGVjdGlvbjtcbiAgfTtcblxuICBNdWx0aXBsZVNlbGVjdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBNdWx0aXBsZVNlbGVjdGlvbi5fX3N1cGVyX18uYmluZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGlkID0gY29udGFpbmVyLmlkICsgJy1jb250YWluZXInO1xuICAgIHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJykuYXR0cignaWQnLCBpZCk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCd0b2dnbGUnLCB7XG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2dFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19yZW1vdmUnLFxuICAgICAgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGV2ZW50IGlmIGl0IGlzIGRpc2FibGVkXG4gICAgICAgIGlmIChzZWxmLmlzRGlzYWJsZWQoKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkcmVtb3ZlID0gJCh0aGlzKTtcbiAgICAgICAgdmFyICRzZWxlY3Rpb24gPSAkcmVtb3ZlLnBhcmVudCgpO1xuXG4gICAgICAgIHZhciBkYXRhID0gVXRpbHMuR2V0RGF0YSgkc2VsZWN0aW9uWzBdLCAnZGF0YScpO1xuXG4gICAgICAgIHNlbGYudHJpZ2dlcigndW5zZWxlY3QnLCB7XG4gICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0LFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5vbihcbiAgICAgICdrZXlkb3duJyxcbiAgICAgICcuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZV9fcmVtb3ZlJyxcbiAgICAgIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBldmVudCBpZiBpdCBpcyBkaXNhYmxlZFxuICAgICAgICBpZiAoc2VsZi5pc0Rpc2FibGVkKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfTtcblxuICBNdWx0aXBsZVNlbGVjdGlvbi5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRyZW5kZXJlZCA9IHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJyk7XG4gICAgJHJlbmRlcmVkLmVtcHR5KCk7XG4gICAgJHJlbmRlcmVkLnJlbW92ZUF0dHIoJ3RpdGxlJyk7XG4gIH07XG5cbiAgTXVsdGlwbGVTZWxlY3Rpb24ucHJvdG90eXBlLmRpc3BsYXkgPSBmdW5jdGlvbiAoZGF0YSwgY29udGFpbmVyKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gdGhpcy5vcHRpb25zLmdldCgndGVtcGxhdGVTZWxlY3Rpb24nKTtcbiAgICB2YXIgZXNjYXBlTWFya3VwID0gdGhpcy5vcHRpb25zLmdldCgnZXNjYXBlTWFya3VwJyk7XG5cbiAgICByZXR1cm4gZXNjYXBlTWFya3VwKHRlbXBsYXRlKGRhdGEsIGNvbnRhaW5lcikpO1xuICB9O1xuXG4gIE11bHRpcGxlU2VsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3Rpb25Db250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRjb250YWluZXIgPSAkKFxuICAgICAgJzxsaSBjbGFzcz1cInNlbGVjdDItc2VsZWN0aW9uX19jaG9pY2VcIj4nICtcbiAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZV9fcmVtb3ZlXCIgJyArXG4gICAgICAgICd0YWJpbmRleD1cIi0xXCI+JyArXG4gICAgICAgICAgJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+JyArXG4gICAgICAgICc8L2J1dHRvbj4nICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZV9fZGlzcGxheVwiPjwvc3Bhbj4nICtcbiAgICAgICc8L2xpPidcbiAgICApO1xuXG4gICAgcmV0dXJuICRjb250YWluZXI7XG4gIH07XG5cbiAgTXVsdGlwbGVTZWxlY3Rpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyICRzZWxlY3Rpb25zID0gW107XG5cbiAgICB2YXIgc2VsZWN0aW9uSWRQcmVmaXggPSB0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZCcpXG4gICAgICAuYXR0cignaWQnKSArICctY2hvaWNlLSc7XG5cbiAgICBmb3IgKHZhciBkID0gMDsgZCA8IGRhdGEubGVuZ3RoOyBkKyspIHtcbiAgICAgIHZhciBzZWxlY3Rpb24gPSBkYXRhW2RdO1xuXG4gICAgICB2YXIgJHNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uQ29udGFpbmVyKCk7XG4gICAgICB2YXIgZm9ybWF0dGVkID0gdGhpcy5kaXNwbGF5KHNlbGVjdGlvbiwgJHNlbGVjdGlvbik7XG5cbiAgICAgIHZhciBzZWxlY3Rpb25JZCA9IHNlbGVjdGlvbklkUHJlZml4ICsgVXRpbHMuZ2VuZXJhdGVDaGFycyg0KSArICctJztcblxuICAgICAgaWYgKHNlbGVjdGlvbi5pZCkge1xuICAgICAgICBzZWxlY3Rpb25JZCArPSBzZWxlY3Rpb24uaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3Rpb25JZCArPSBVdGlscy5nZW5lcmF0ZUNoYXJzKDQpO1xuICAgICAgfVxuXG4gICAgICAkc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19kaXNwbGF5JylcbiAgICAgICAgLmFwcGVuZChmb3JtYXR0ZWQpXG4gICAgICAgIC5hdHRyKCdpZCcsIHNlbGVjdGlvbklkKTtcblxuICAgICAgdmFyIHRpdGxlID0gc2VsZWN0aW9uLnRpdGxlIHx8IHNlbGVjdGlvbi50ZXh0O1xuXG4gICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgJHNlbGVjdGlvbi5hdHRyKCd0aXRsZScsIHRpdGxlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbW92ZUl0ZW0gPSB0aGlzLm9wdGlvbnMuZ2V0KCd0cmFuc2xhdGlvbnMnKS5nZXQoJ3JlbW92ZUl0ZW0nKTtcblxuICAgICAgdmFyICRyZW1vdmUgPSAkc2VsZWN0aW9uLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19yZW1vdmUnKTtcblxuICAgICAgJHJlbW92ZS5hdHRyKCd0aXRsZScsIHJlbW92ZUl0ZW0oKSk7XG4gICAgICAkcmVtb3ZlLmF0dHIoJ2FyaWEtbGFiZWwnLCByZW1vdmVJdGVtKCkpO1xuICAgICAgJHJlbW92ZS5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5Jywgc2VsZWN0aW9uSWQpO1xuXG4gICAgICBVdGlscy5TdG9yZURhdGEoJHNlbGVjdGlvblswXSwgJ2RhdGEnLCBzZWxlY3Rpb24pO1xuXG4gICAgICAkc2VsZWN0aW9ucy5wdXNoKCRzZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIHZhciAkcmVuZGVyZWQgPSB0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZCcpO1xuXG4gICAgJHJlbmRlcmVkLmFwcGVuZCgkc2VsZWN0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIE11bHRpcGxlU2VsZWN0aW9uO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vcGxhY2Vob2xkZXInLFtcblxuXSwgZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQbGFjZWhvbGRlciAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLm5vcm1hbGl6ZVBsYWNlaG9sZGVyKG9wdGlvbnMuZ2V0KCdwbGFjZWhvbGRlcicpKTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIFBsYWNlaG9sZGVyLnByb3RvdHlwZS5ub3JtYWxpemVQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIChfLCBwbGFjZWhvbGRlcikge1xuICAgIGlmICh0eXBlb2YgcGxhY2Vob2xkZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwbGFjZWhvbGRlciA9IHtcbiAgICAgICAgaWQ6ICcnLFxuICAgICAgICB0ZXh0OiBwbGFjZWhvbGRlclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gIH07XG5cbiAgUGxhY2Vob2xkZXIucHJvdG90eXBlLmNyZWF0ZVBsYWNlaG9sZGVyID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgcGxhY2Vob2xkZXIpIHtcbiAgICB2YXIgJHBsYWNlaG9sZGVyID0gdGhpcy5zZWxlY3Rpb25Db250YWluZXIoKTtcblxuICAgICRwbGFjZWhvbGRlci5odG1sKHRoaXMuZGlzcGxheShwbGFjZWhvbGRlcikpO1xuICAgICRwbGFjZWhvbGRlclswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLXNlbGVjdGlvbl9fcGxhY2Vob2xkZXInKTtcbiAgICAkcGxhY2Vob2xkZXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZScpO1xuXG4gICAgdmFyIHBsYWNlaG9sZGVyVGl0bGUgPSBwbGFjZWhvbGRlci50aXRsZSB8fFxuICAgICAgcGxhY2Vob2xkZXIudGV4dCB8fFxuICAgICAgJHBsYWNlaG9sZGVyLnRleHQoKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJykuYXR0cihcbiAgICAgICd0aXRsZScsXG4gICAgICBwbGFjZWhvbGRlclRpdGxlXG4gICAgKTtcblxuICAgIHJldHVybiAkcGxhY2Vob2xkZXI7XG4gIH07XG5cbiAgUGxhY2Vob2xkZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGRhdGEpIHtcbiAgICB2YXIgc2luZ2xlUGxhY2Vob2xkZXIgPSAoXG4gICAgICBkYXRhLmxlbmd0aCA9PSAxICYmIGRhdGFbMF0uaWQgIT0gdGhpcy5wbGFjZWhvbGRlci5pZFxuICAgICk7XG4gICAgdmFyIG11bHRpcGxlU2VsZWN0aW9ucyA9IGRhdGEubGVuZ3RoID4gMTtcblxuICAgIGlmIChtdWx0aXBsZVNlbGVjdGlvbnMgfHwgc2luZ2xlUGxhY2Vob2xkZXIpIHtcbiAgICAgIHJldHVybiBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICB2YXIgJHBsYWNlaG9sZGVyID0gdGhpcy5jcmVhdGVQbGFjZWhvbGRlcih0aGlzLnBsYWNlaG9sZGVyKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJykuYXBwZW5kKCRwbGFjZWhvbGRlcik7XG4gIH07XG5cbiAgcmV0dXJuIFBsYWNlaG9sZGVyO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9zZWxlY3Rpb24vYWxsb3dDbGVhcicsW1xuICAnanF1ZXJ5JyxcbiAgJy4uL2tleXMnLFxuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgS0VZUywgVXRpbHMpIHtcbiAgZnVuY3Rpb24gQWxsb3dDbGVhciAoKSB7IH1cblxuICBBbGxvd0NsZWFyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgY29udGFpbmVyLCAkY29udGFpbmVyKTtcblxuICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZ2V0KCdkZWJ1ZycpICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAnU2VsZWN0MjogVGhlIGBhbGxvd0NsZWFyYCBvcHRpb24gc2hvdWxkIGJlIHVzZWQgaW4gY29tYmluYXRpb24gJyArXG4gICAgICAgICAgJ3dpdGggdGhlIGBwbGFjZWhvbGRlcmAgb3B0aW9uLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ21vdXNlZG93bicsICcuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyJyxcbiAgICAgIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgc2VsZi5faGFuZGxlQ2xlYXIoZXZ0KTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigna2V5cHJlc3MnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBzZWxmLl9oYW5kbGVLZXlib2FyZENsZWFyKGV2dCwgY29udGFpbmVyKTtcbiAgICB9KTtcbiAgfTtcblxuICBBbGxvd0NsZWFyLnByb3RvdHlwZS5faGFuZGxlQ2xlYXIgPSBmdW5jdGlvbiAoXywgZXZ0KSB7XG4gICAgLy8gSWdub3JlIHRoZSBldmVudCBpZiBpdCBpcyBkaXNhYmxlZFxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciAkY2xlYXIgPSB0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpO1xuXG4gICAgLy8gSWdub3JlIHRoZSBldmVudCBpZiBub3RoaW5nIGhhcyBiZWVuIHNlbGVjdGVkXG4gICAgaWYgKCRjbGVhci5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB2YXIgZGF0YSA9IFV0aWxzLkdldERhdGEoJGNsZWFyWzBdLCAnZGF0YScpO1xuXG4gICAgdmFyIHByZXZpb3VzVmFsID0gdGhpcy4kZWxlbWVudC52YWwoKTtcbiAgICB0aGlzLiRlbGVtZW50LnZhbCh0aGlzLnBsYWNlaG9sZGVyLmlkKTtcblxuICAgIHZhciB1bnNlbGVjdERhdGEgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICB0aGlzLnRyaWdnZXIoJ2NsZWFyJywgdW5zZWxlY3REYXRhKTtcbiAgICBpZiAodW5zZWxlY3REYXRhLnByZXZlbnRlZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC52YWwocHJldmlvdXNWYWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YS5sZW5ndGg7IGQrKykge1xuICAgICAgdW5zZWxlY3REYXRhID0ge1xuICAgICAgICBkYXRhOiBkYXRhW2RdXG4gICAgICB9O1xuXG4gICAgICAvLyBUcmlnZ2VyIHRoZSBgdW5zZWxlY3RgIGV2ZW50LCBzbyBwZW9wbGUgY2FuIHByZXZlbnQgaXQgZnJvbSBiZWluZ1xuICAgICAgLy8gY2xlYXJlZC5cbiAgICAgIHRoaXMudHJpZ2dlcigndW5zZWxlY3QnLCB1bnNlbGVjdERhdGEpO1xuXG4gICAgICAvLyBJZiB0aGUgZXZlbnQgd2FzIHByZXZlbnRlZCwgZG9uJ3QgY2xlYXIgaXQgb3V0LlxuICAgICAgaWYgKHVuc2VsZWN0RGF0YS5wcmV2ZW50ZWQpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC52YWwocHJldmlvdXNWYWwpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgdGhpcy50cmlnZ2VyKCd0b2dnbGUnLCB7fSk7XG4gIH07XG5cbiAgQWxsb3dDbGVhci5wcm90b3R5cGUuX2hhbmRsZUtleWJvYXJkQ2xlYXIgPSBmdW5jdGlvbiAoXywgZXZ0LCBjb250YWluZXIpIHtcbiAgICBpZiAoY29udGFpbmVyLmlzT3BlbigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2dC53aGljaCA9PSBLRVlTLkRFTEVURSB8fCBldnQud2hpY2ggPT0gS0VZUy5CQUNLU1BBQ0UpIHtcbiAgICAgIHRoaXMuX2hhbmRsZUNsZWFyKGV2dCk7XG4gICAgfVxuICB9O1xuXG4gIEFsbG93Q2xlYXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGRhdGEpIHtcbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBkYXRhKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyJykucmVtb3ZlKCk7XG4gICAgdGhpcy4kc2VsZWN0aW9uWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItc2VsZWN0aW9uLS1jbGVhcmFibGUnKTtcblxuICAgIGlmICh0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19wbGFjZWhvbGRlcicpLmxlbmd0aCA+IDAgfHxcbiAgICAgICAgZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2VsZWN0aW9uSWQgPSB0aGlzLiRzZWxlY3Rpb24uZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZCcpXG4gICAgICAuYXR0cignaWQnKTtcblxuICAgIHZhciByZW1vdmVBbGwgPSB0aGlzLm9wdGlvbnMuZ2V0KCd0cmFuc2xhdGlvbnMnKS5nZXQoJ3JlbW92ZUFsbEl0ZW1zJyk7XG5cbiAgICB2YXIgJHJlbW92ZSA9ICQoXG4gICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJzZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXJcIiB0YWJpbmRleD1cIi0xXCI+JyArXG4gICAgICAgICc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPicgK1xuICAgICAgJzwvYnV0dG9uPidcbiAgICApO1xuICAgICRyZW1vdmUuYXR0cigndGl0bGUnLCByZW1vdmVBbGwoKSk7XG4gICAgJHJlbW92ZS5hdHRyKCdhcmlhLWxhYmVsJywgcmVtb3ZlQWxsKCkpO1xuICAgICRyZW1vdmUuYXR0cignYXJpYS1kZXNjcmliZWRieScsIHNlbGVjdGlvbklkKTtcbiAgICBVdGlscy5TdG9yZURhdGEoJHJlbW92ZVswXSwgJ2RhdGEnLCBkYXRhKTtcblxuICAgIHRoaXMuJHNlbGVjdGlvbi5wcmVwZW5kKCRyZW1vdmUpO1xuICAgIHRoaXMuJHNlbGVjdGlvblswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLXNlbGVjdGlvbi0tY2xlYXJhYmxlJyk7XG4gIH07XG5cbiAgcmV0dXJuIEFsbG93Q2xlYXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL3NlbGVjdGlvbi9zZWFyY2gnLFtcbiAgJ2pxdWVyeScsXG4gICcuLi91dGlscycsXG4gICcuLi9rZXlzJ1xuXSwgZnVuY3Rpb24gKCQsIFV0aWxzLCBLRVlTKSB7XG4gIGZ1bmN0aW9uIFNlYXJjaCAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIFNlYXJjaC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGRlY29yYXRlZCkge1xuICAgIHZhciBzZWFyY2hMYWJlbCA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldCgnc2VhcmNoJyk7XG4gICAgdmFyICRzZWFyY2ggPSAkKFxuICAgICAgJzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2ggc2VsZWN0Mi1zZWFyY2gtLWlubGluZVwiPicgK1xuICAgICAgICAnPHRleHRhcmVhIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2hfX2ZpZWxkXCInK1xuICAgICAgICAnIHR5cGU9XCJzZWFyY2hcIiB0YWJpbmRleD1cIi0xXCInICtcbiAgICAgICAgJyBhdXRvY29ycmVjdD1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwibm9uZVwiJyArXG4gICAgICAgICcgc3BlbGxjaGVjaz1cImZhbHNlXCIgcm9sZT1cInNlYXJjaGJveFwiIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiID4nICtcbiAgICAgICAgJzwvdGV4dGFyZWE+JyArXG4gICAgICAnPC9zcGFuPidcbiAgICApO1xuXG4gICAgdGhpcy4kc2VhcmNoQ29udGFpbmVyID0gJHNlYXJjaDtcbiAgICB0aGlzLiRzZWFyY2ggPSAkc2VhcmNoLmZpbmQoJ3RleHRhcmVhJyk7XG5cbiAgICB0aGlzLiRzZWFyY2gucHJvcCgnYXV0b2NvbXBsZXRlJywgdGhpcy5vcHRpb25zLmdldCgnYXV0b2NvbXBsZXRlJykpO1xuICAgIHRoaXMuJHNlYXJjaC5hdHRyKCdhcmlhLWxhYmVsJywgc2VhcmNoTGFiZWwoKSk7XG5cbiAgICB2YXIgJHJlbmRlcmVkID0gZGVjb3JhdGVkLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLl90cmFuc2ZlclRhYkluZGV4KCk7XG4gICAgJHJlbmRlcmVkLmFwcGVuZCh0aGlzLiRzZWFyY2hDb250YWluZXIpO1xuXG4gICAgcmV0dXJuICRyZW5kZXJlZDtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcmVzdWx0c0lkID0gY29udGFpbmVyLmlkICsgJy1yZXN1bHRzJztcbiAgICB2YXIgc2VsZWN0aW9uSWQgPSBjb250YWluZXIuaWQgKyAnLWNvbnRhaW5lcic7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgc2VsZi4kc2VhcmNoLmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBzZWxlY3Rpb25JZCk7XG5cbiAgICBjb250YWluZXIub24oJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRzZWFyY2guYXR0cignYXJpYS1jb250cm9scycsIHJlc3VsdHNJZCk7XG4gICAgICBzZWxmLiRzZWFyY2gudHJpZ2dlcignZm9jdXMnKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRzZWFyY2gudmFsKCcnKTtcbiAgICAgIHNlbGYucmVzaXplU2VhcmNoKCk7XG4gICAgICBzZWxmLiRzZWFyY2gucmVtb3ZlQXR0cignYXJpYS1jb250cm9scycpO1xuICAgICAgc2VsZi4kc2VhcmNoLnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2VuYWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuJHNlYXJjaC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblxuICAgICAgc2VsZi5fdHJhbnNmZXJUYWJJbmRleCgpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdkaXNhYmxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi4kc2VhcmNoLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2ZvY3VzJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6Zm9jdXMnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBpZiAocGFyYW1zLmRhdGEuX3Jlc3VsdElkKSB7XG4gICAgICAgIHNlbGYuJHNlYXJjaC5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBwYXJhbXMuZGF0YS5fcmVzdWx0SWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi4kc2VhcmNoLnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdmb2N1c2luJywgJy5zZWxlY3QyLXNlYXJjaC0taW5saW5lJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdmb2N1cycsIGV2dCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oJ2ZvY3Vzb3V0JywgJy5zZWxlY3QyLXNlYXJjaC0taW5saW5lJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi5faGFuZGxlQmx1cihldnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdrZXlkb3duJywgJy5zZWxlY3QyLXNlYXJjaC0taW5saW5lJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBzZWxmLnRyaWdnZXIoJ2tleXByZXNzJywgZXZ0KTtcblxuICAgICAgc2VsZi5fa2V5VXBQcmV2ZW50ZWQgPSBldnQuaXNEZWZhdWx0UHJldmVudGVkKCk7XG5cbiAgICAgIHZhciBrZXkgPSBldnQud2hpY2g7XG5cbiAgICAgIGlmIChrZXkgPT09IEtFWVMuQkFDS1NQQUNFICYmIHNlbGYuJHNlYXJjaC52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgdmFyICRwcmV2aW91c0Nob2ljZSA9IHNlbGYuJHNlbGVjdGlvblxuICAgICAgICAgIC5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZScpLmxhc3QoKTtcblxuICAgICAgICBpZiAoJHByZXZpb3VzQ2hvaWNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IFV0aWxzLkdldERhdGEoJHByZXZpb3VzQ2hvaWNlWzBdLCAnZGF0YScpO1xuXG4gICAgICAgICAgc2VsZi5zZWFyY2hSZW1vdmVDaG9pY2UoaXRlbSk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VsZWN0aW9uLm9uKCdjbGljaycsICcuc2VsZWN0Mi1zZWFyY2gtLWlubGluZScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGlmIChzZWxmLiRzZWFyY2gudmFsKCkpIHtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVHJ5IHRvIGRldGVjdCB0aGUgSUUgdmVyc2lvbiBzaG91bGQgdGhlIGBkb2N1bWVudE1vZGVgIHByb3BlcnR5IHRoYXRcbiAgICAvLyBpcyBzdG9yZWQgb24gdGhlIGRvY3VtZW50LiBUaGlzIGlzIG9ubHkgaW1wbGVtZW50ZWQgaW4gSUUgYW5kIGlzXG4gICAgLy8gc2xpZ2h0bHkgY2xlYW5lciB0aGFuIGRvaW5nIGEgdXNlciBhZ2VudCBjaGVjay5cbiAgICAvLyBUaGlzIHByb3BlcnR5IGlzIG5vdCBhdmFpbGFibGUgaW4gRWRnZSwgYnV0IEVkZ2UgYWxzbyBkb2Vzbid0IGhhdmVcbiAgICAvLyB0aGlzIGJ1Zy5cbiAgICB2YXIgbXNpZSA9IGRvY3VtZW50LmRvY3VtZW50TW9kZTtcbiAgICB2YXIgZGlzYWJsZUlucHV0RXZlbnRzID0gbXNpZSAmJiBtc2llIDw9IDExO1xuXG4gICAgLy8gV29ya2Fyb3VuZCBmb3IgYnJvd3NlcnMgd2hpY2ggZG8gbm90IHN1cHBvcnQgdGhlIGBpbnB1dGAgZXZlbnRcbiAgICAvLyBUaGlzIHdpbGwgcHJldmVudCBkb3VibGUtdHJpZ2dlcmluZyBvZiBldmVudHMgZm9yIGJyb3dzZXJzIHdoaWNoIHN1cHBvcnRcbiAgICAvLyBib3RoIHRoZSBga2V5dXBgIGFuZCBgaW5wdXRgIGV2ZW50cy5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oXG4gICAgICAnaW5wdXQuc2VhcmNoY2hlY2snLFxuICAgICAgJy5zZWxlY3QyLXNlYXJjaC0taW5saW5lJyxcbiAgICAgIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgLy8gSUUgd2lsbCB0cmlnZ2VyIHRoZSBgaW5wdXRgIGV2ZW50IHdoZW4gYSBwbGFjZWhvbGRlciBpcyB1c2VkIG9uIGFcbiAgICAgICAgLy8gc2VhcmNoIGJveC4gVG8gZ2V0IGFyb3VuZCB0aGlzIGlzc3VlLCB3ZSBhcmUgZm9yY2VkIHRvIGlnbm9yZSBhbGxcbiAgICAgICAgLy8gYGlucHV0YCBldmVudHMgaW4gSUUgYW5kIGtlZXAgdXNpbmcgYGtleXVwYC5cbiAgICAgICAgaWYgKGRpc2FibGVJbnB1dEV2ZW50cykge1xuICAgICAgICAgIHNlbGYuJHNlbGVjdGlvbi5vZmYoJ2lucHV0LnNlYXJjaCBpbnB1dC5zZWFyY2hjaGVjaycpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVuYmluZCB0aGUgZHVwbGljYXRlZCBga2V5dXBgIGV2ZW50XG4gICAgICAgIHNlbGYuJHNlbGVjdGlvbi5vZmYoJ2tleXVwLnNlYXJjaCcpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLiRzZWxlY3Rpb24ub24oXG4gICAgICAna2V5dXAuc2VhcmNoIGlucHV0LnNlYXJjaCcsXG4gICAgICAnLnNlbGVjdDItc2VhcmNoLS1pbmxpbmUnLFxuICAgICAgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAvLyBJRSB3aWxsIHRyaWdnZXIgdGhlIGBpbnB1dGAgZXZlbnQgd2hlbiBhIHBsYWNlaG9sZGVyIGlzIHVzZWQgb24gYVxuICAgICAgICAvLyBzZWFyY2ggYm94LiBUbyBnZXQgYXJvdW5kIHRoaXMgaXNzdWUsIHdlIGFyZSBmb3JjZWQgdG8gaWdub3JlIGFsbFxuICAgICAgICAvLyBgaW5wdXRgIGV2ZW50cyBpbiBJRSBhbmQga2VlcCB1c2luZyBga2V5dXBgLlxuICAgICAgICBpZiAoZGlzYWJsZUlucHV0RXZlbnRzICYmIGV2dC50eXBlID09PSAnaW5wdXQnKSB7XG4gICAgICAgICAgc2VsZi4kc2VsZWN0aW9uLm9mZignaW5wdXQuc2VhcmNoIGlucHV0LnNlYXJjaGNoZWNrJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleSA9IGV2dC53aGljaDtcblxuICAgICAgICAvLyBXZSBjYW4gZnJlZWx5IGlnbm9yZSBldmVudHMgZnJvbSBtb2RpZmllciBrZXlzXG4gICAgICAgIGlmIChrZXkgPT0gS0VZUy5TSElGVCB8fCBrZXkgPT0gS0VZUy5DVFJMIHx8IGtleSA9PSBLRVlTLkFMVCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRhYmJpbmcgd2lsbCBiZSBoYW5kbGVkIGR1cmluZyB0aGUgYGtleWRvd25gIHBoYXNlXG4gICAgICAgIGlmIChrZXkgPT0gS0VZUy5UQUIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLmhhbmRsZVNlYXJjaChldnQpO1xuICAgICAgfVxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgdHJhbnNmZXIgdGhlIHRhYmluZGV4IGF0dHJpYnV0ZSBmcm9tIHRoZSByZW5kZXJlZFxuICAgKiBzZWxlY3Rpb24gdG8gdGhlIHNlYXJjaCBib3guIFRoaXMgYWxsb3dzIGZvciB0aGUgc2VhcmNoIGJveCB0byBiZSB1c2VkIGFzXG4gICAqIHRoZSBwcmltYXJ5IGZvY3VzIGluc3RlYWQgb2YgdGhlIHNlbGVjdGlvbiBjb250YWluZXIuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBTZWFyY2gucHJvdG90eXBlLl90cmFuc2ZlclRhYkluZGV4ID0gZnVuY3Rpb24gKGRlY29yYXRlZCkge1xuICAgIHRoaXMuJHNlYXJjaC5hdHRyKCd0YWJpbmRleCcsIHRoaXMuJHNlbGVjdGlvbi5hdHRyKCd0YWJpbmRleCcpKTtcbiAgICB0aGlzLiRzZWxlY3Rpb24uYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLmNyZWF0ZVBsYWNlaG9sZGVyID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgcGxhY2Vob2xkZXIpIHtcbiAgICB0aGlzLiRzZWFyY2guYXR0cigncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlci50ZXh0KTtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGRhdGEpIHtcbiAgICB2YXIgc2VhcmNoSGFkRm9jdXMgPSB0aGlzLiRzZWFyY2hbMF0gPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuJHNlYXJjaC5hdHRyKCdwbGFjZWhvbGRlcicsICcnKTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy5yZXNpemVTZWFyY2goKTtcbiAgICBpZiAoc2VhcmNoSGFkRm9jdXMpIHtcbiAgICAgIHRoaXMuJHNlYXJjaC50cmlnZ2VyKCdmb2N1cycpO1xuICAgIH1cbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLmhhbmRsZVNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlc2l6ZVNlYXJjaCgpO1xuXG4gICAgaWYgKCF0aGlzLl9rZXlVcFByZXZlbnRlZCkge1xuICAgICAgdmFyIGlucHV0ID0gdGhpcy4kc2VhcmNoLnZhbCgpO1xuXG4gICAgICB0aGlzLnRyaWdnZXIoJ3F1ZXJ5Jywge1xuICAgICAgICB0ZXJtOiBpbnB1dFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fa2V5VXBQcmV2ZW50ZWQgPSBmYWxzZTtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLnNlYXJjaFJlbW92ZUNob2ljZSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGl0ZW0pIHtcbiAgICB0aGlzLnRyaWdnZXIoJ3Vuc2VsZWN0Jywge1xuICAgICAgZGF0YTogaXRlbVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoLnZhbChpdGVtLnRleHQpO1xuICAgIHRoaXMuaGFuZGxlU2VhcmNoKCk7XG4gIH07XG5cbiAgU2VhcmNoLnByb3RvdHlwZS5yZXNpemVTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kc2VhcmNoLmNzcygnd2lkdGgnLCAnMjVweCcpO1xuXG4gICAgdmFyIHdpZHRoID0gJzEwMCUnO1xuXG4gICAgaWYgKHRoaXMuJHNlYXJjaC5hdHRyKCdwbGFjZWhvbGRlcicpID09PSAnJykge1xuICAgICAgdmFyIG1pbmltdW1XaWR0aCA9IHRoaXMuJHNlYXJjaC52YWwoKS5sZW5ndGggKyAxO1xuXG4gICAgICB3aWR0aCA9IChtaW5pbXVtV2lkdGggKiAwLjc1KSArICdlbSc7XG4gICAgfVxuXG4gICAgdGhpcy4kc2VhcmNoLmNzcygnd2lkdGgnLCB3aWR0aCk7XG4gIH07XG5cbiAgcmV0dXJuIFNlYXJjaDtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvc2VsZWN0aW9uL3NlbGVjdGlvbkNzcycsW1xuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoVXRpbHMpIHtcbiAgZnVuY3Rpb24gU2VsZWN0aW9uQ1NTICgpIHsgfVxuXG4gIFNlbGVjdGlvbkNTUy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGRlY29yYXRlZCkge1xuICAgIHZhciAkc2VsZWN0aW9uID0gZGVjb3JhdGVkLmNhbGwodGhpcyk7XG5cbiAgICB2YXIgc2VsZWN0aW9uQ3NzQ2xhc3MgPSB0aGlzLm9wdGlvbnMuZ2V0KCdzZWxlY3Rpb25Dc3NDbGFzcycpIHx8ICcnO1xuXG4gICAgaWYgKHNlbGVjdGlvbkNzc0NsYXNzLmluZGV4T2YoJzphbGw6JykgIT09IC0xKSB7XG4gICAgICBzZWxlY3Rpb25Dc3NDbGFzcyA9IHNlbGVjdGlvbkNzc0NsYXNzLnJlcGxhY2UoJzphbGw6JywgJycpO1xuXG4gICAgICBVdGlscy5jb3B5Tm9uSW50ZXJuYWxDc3NDbGFzc2VzKCRzZWxlY3Rpb25bMF0sIHRoaXMuJGVsZW1lbnRbMF0pO1xuICAgIH1cblxuICAgICRzZWxlY3Rpb24uYWRkQ2xhc3Moc2VsZWN0aW9uQ3NzQ2xhc3MpO1xuXG4gICAgcmV0dXJuICRzZWxlY3Rpb247XG4gIH07XG5cbiAgcmV0dXJuIFNlbGVjdGlvbkNTUztcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvc2VsZWN0aW9uL2V2ZW50UmVsYXknLFtcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uICgkKSB7XG4gIGZ1bmN0aW9uIEV2ZW50UmVsYXkgKCkgeyB9XG5cbiAgRXZlbnRSZWxheS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcmVsYXlFdmVudHMgPSBbXG4gICAgICAnb3BlbicsICdvcGVuaW5nJyxcbiAgICAgICdjbG9zZScsICdjbG9zaW5nJyxcbiAgICAgICdzZWxlY3QnLCAnc2VsZWN0aW5nJyxcbiAgICAgICd1bnNlbGVjdCcsICd1bnNlbGVjdGluZycsXG4gICAgICAnY2xlYXInLCAnY2xlYXJpbmcnXG4gICAgXTtcblxuICAgIHZhciBwcmV2ZW50YWJsZUV2ZW50cyA9IFtcbiAgICAgICdvcGVuaW5nJywgJ2Nsb3NpbmcnLCAnc2VsZWN0aW5nJywgJ3Vuc2VsZWN0aW5nJywgJ2NsZWFyaW5nJ1xuICAgIF07XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgY29udGFpbmVyLm9uKCcqJywgZnVuY3Rpb24gKG5hbWUsIHBhcmFtcykge1xuICAgICAgLy8gSWdub3JlIGV2ZW50cyB0aGF0IHNob3VsZCBub3QgYmUgcmVsYXllZFxuICAgICAgaWYgKHJlbGF5RXZlbnRzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHBhcmFtZXRlcnMgc2hvdWxkIGFsd2F5cyBiZSBhbiBvYmplY3RcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgICAgLy8gR2VuZXJhdGUgdGhlIGpRdWVyeSBldmVudCBmb3IgdGhlIFNlbGVjdDIgZXZlbnRcbiAgICAgIHZhciBldnQgPSAkLkV2ZW50KCdzZWxlY3QyOicgKyBuYW1lLCB7XG4gICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICB9KTtcblxuICAgICAgc2VsZi4kZWxlbWVudC50cmlnZ2VyKGV2dCk7XG5cbiAgICAgIC8vIE9ubHkgaGFuZGxlIHByZXZlbnRhYmxlIGV2ZW50cyBpZiBpdCB3YXMgb25lXG4gICAgICBpZiAocHJldmVudGFibGVFdmVudHMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwYXJhbXMucHJldmVudGVkID0gZXZ0LmlzRGVmYXVsdFByZXZlbnRlZCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBFdmVudFJlbGF5O1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi90cmFuc2xhdGlvbicsW1xuICAnanF1ZXJ5JyxcbiAgJ3JlcXVpcmUnXG5dLCBmdW5jdGlvbiAoJCwgcmVxdWlyZSkge1xuICBmdW5jdGlvbiBUcmFuc2xhdGlvbiAoZGljdCkge1xuICAgIHRoaXMuZGljdCA9IGRpY3QgfHwge307XG4gIH1cblxuICBUcmFuc2xhdGlvbi5wcm90b3R5cGUuYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmRpY3Q7XG4gIH07XG5cbiAgVHJhbnNsYXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5kaWN0W2tleV07XG4gIH07XG5cbiAgVHJhbnNsYXRpb24ucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uICh0cmFuc2xhdGlvbikge1xuICAgIHRoaXMuZGljdCA9ICQuZXh0ZW5kKHt9LCB0cmFuc2xhdGlvbi5hbGwoKSwgdGhpcy5kaWN0KTtcbiAgfTtcblxuICAvLyBTdGF0aWMgZnVuY3Rpb25zXG5cbiAgVHJhbnNsYXRpb24uX2NhY2hlID0ge307XG5cbiAgVHJhbnNsYXRpb24ubG9hZFBhdGggPSBmdW5jdGlvbiAocGF0aCkge1xuICAgIGlmICghKHBhdGggaW4gVHJhbnNsYXRpb24uX2NhY2hlKSkge1xuICAgICAgdmFyIHRyYW5zbGF0aW9ucyA9IHJlcXVpcmUocGF0aCk7XG5cbiAgICAgIFRyYW5zbGF0aW9uLl9jYWNoZVtwYXRoXSA9IHRyYW5zbGF0aW9ucztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uLl9jYWNoZVtwYXRoXSk7XG4gIH07XG5cbiAgcmV0dXJuIFRyYW5zbGF0aW9uO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kaWFjcml0aWNzJyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRpYWNyaXRpY3MgPSB7XG4gICAgJ1xcdTI0QjYnOiAnQScsXG4gICAgJ1xcdUZGMjEnOiAnQScsXG4gICAgJ1xcdTAwQzAnOiAnQScsXG4gICAgJ1xcdTAwQzEnOiAnQScsXG4gICAgJ1xcdTAwQzInOiAnQScsXG4gICAgJ1xcdTFFQTYnOiAnQScsXG4gICAgJ1xcdTFFQTQnOiAnQScsXG4gICAgJ1xcdTFFQUEnOiAnQScsXG4gICAgJ1xcdTFFQTgnOiAnQScsXG4gICAgJ1xcdTAwQzMnOiAnQScsXG4gICAgJ1xcdTAxMDAnOiAnQScsXG4gICAgJ1xcdTAxMDInOiAnQScsXG4gICAgJ1xcdTFFQjAnOiAnQScsXG4gICAgJ1xcdTFFQUUnOiAnQScsXG4gICAgJ1xcdTFFQjQnOiAnQScsXG4gICAgJ1xcdTFFQjInOiAnQScsXG4gICAgJ1xcdTAyMjYnOiAnQScsXG4gICAgJ1xcdTAxRTAnOiAnQScsXG4gICAgJ1xcdTAwQzQnOiAnQScsXG4gICAgJ1xcdTAxREUnOiAnQScsXG4gICAgJ1xcdTFFQTInOiAnQScsXG4gICAgJ1xcdTAwQzUnOiAnQScsXG4gICAgJ1xcdTAxRkEnOiAnQScsXG4gICAgJ1xcdTAxQ0QnOiAnQScsXG4gICAgJ1xcdTAyMDAnOiAnQScsXG4gICAgJ1xcdTAyMDInOiAnQScsXG4gICAgJ1xcdTFFQTAnOiAnQScsXG4gICAgJ1xcdTFFQUMnOiAnQScsXG4gICAgJ1xcdTFFQjYnOiAnQScsXG4gICAgJ1xcdTFFMDAnOiAnQScsXG4gICAgJ1xcdTAxMDQnOiAnQScsXG4gICAgJ1xcdTAyM0EnOiAnQScsXG4gICAgJ1xcdTJDNkYnOiAnQScsXG4gICAgJ1xcdUE3MzInOiAnQUEnLFxuICAgICdcXHUwMEM2JzogJ0FFJyxcbiAgICAnXFx1MDFGQyc6ICdBRScsXG4gICAgJ1xcdTAxRTInOiAnQUUnLFxuICAgICdcXHVBNzM0JzogJ0FPJyxcbiAgICAnXFx1QTczNic6ICdBVScsXG4gICAgJ1xcdUE3MzgnOiAnQVYnLFxuICAgICdcXHVBNzNBJzogJ0FWJyxcbiAgICAnXFx1QTczQyc6ICdBWScsXG4gICAgJ1xcdTI0QjcnOiAnQicsXG4gICAgJ1xcdUZGMjInOiAnQicsXG4gICAgJ1xcdTFFMDInOiAnQicsXG4gICAgJ1xcdTFFMDQnOiAnQicsXG4gICAgJ1xcdTFFMDYnOiAnQicsXG4gICAgJ1xcdTAyNDMnOiAnQicsXG4gICAgJ1xcdTAxODInOiAnQicsXG4gICAgJ1xcdTAxODEnOiAnQicsXG4gICAgJ1xcdTI0QjgnOiAnQycsXG4gICAgJ1xcdUZGMjMnOiAnQycsXG4gICAgJ1xcdTAxMDYnOiAnQycsXG4gICAgJ1xcdTAxMDgnOiAnQycsXG4gICAgJ1xcdTAxMEEnOiAnQycsXG4gICAgJ1xcdTAxMEMnOiAnQycsXG4gICAgJ1xcdTAwQzcnOiAnQycsXG4gICAgJ1xcdTFFMDgnOiAnQycsXG4gICAgJ1xcdTAxODcnOiAnQycsXG4gICAgJ1xcdTAyM0InOiAnQycsXG4gICAgJ1xcdUE3M0UnOiAnQycsXG4gICAgJ1xcdTI0QjknOiAnRCcsXG4gICAgJ1xcdUZGMjQnOiAnRCcsXG4gICAgJ1xcdTFFMEEnOiAnRCcsXG4gICAgJ1xcdTAxMEUnOiAnRCcsXG4gICAgJ1xcdTFFMEMnOiAnRCcsXG4gICAgJ1xcdTFFMTAnOiAnRCcsXG4gICAgJ1xcdTFFMTInOiAnRCcsXG4gICAgJ1xcdTFFMEUnOiAnRCcsXG4gICAgJ1xcdTAxMTAnOiAnRCcsXG4gICAgJ1xcdTAxOEInOiAnRCcsXG4gICAgJ1xcdTAxOEEnOiAnRCcsXG4gICAgJ1xcdTAxODknOiAnRCcsXG4gICAgJ1xcdUE3NzknOiAnRCcsXG4gICAgJ1xcdTAxRjEnOiAnRFonLFxuICAgICdcXHUwMUM0JzogJ0RaJyxcbiAgICAnXFx1MDFGMic6ICdEeicsXG4gICAgJ1xcdTAxQzUnOiAnRHonLFxuICAgICdcXHUyNEJBJzogJ0UnLFxuICAgICdcXHVGRjI1JzogJ0UnLFxuICAgICdcXHUwMEM4JzogJ0UnLFxuICAgICdcXHUwMEM5JzogJ0UnLFxuICAgICdcXHUwMENBJzogJ0UnLFxuICAgICdcXHUxRUMwJzogJ0UnLFxuICAgICdcXHUxRUJFJzogJ0UnLFxuICAgICdcXHUxRUM0JzogJ0UnLFxuICAgICdcXHUxRUMyJzogJ0UnLFxuICAgICdcXHUxRUJDJzogJ0UnLFxuICAgICdcXHUwMTEyJzogJ0UnLFxuICAgICdcXHUxRTE0JzogJ0UnLFxuICAgICdcXHUxRTE2JzogJ0UnLFxuICAgICdcXHUwMTE0JzogJ0UnLFxuICAgICdcXHUwMTE2JzogJ0UnLFxuICAgICdcXHUwMENCJzogJ0UnLFxuICAgICdcXHUxRUJBJzogJ0UnLFxuICAgICdcXHUwMTFBJzogJ0UnLFxuICAgICdcXHUwMjA0JzogJ0UnLFxuICAgICdcXHUwMjA2JzogJ0UnLFxuICAgICdcXHUxRUI4JzogJ0UnLFxuICAgICdcXHUxRUM2JzogJ0UnLFxuICAgICdcXHUwMjI4JzogJ0UnLFxuICAgICdcXHUxRTFDJzogJ0UnLFxuICAgICdcXHUwMTE4JzogJ0UnLFxuICAgICdcXHUxRTE4JzogJ0UnLFxuICAgICdcXHUxRTFBJzogJ0UnLFxuICAgICdcXHUwMTkwJzogJ0UnLFxuICAgICdcXHUwMThFJzogJ0UnLFxuICAgICdcXHUyNEJCJzogJ0YnLFxuICAgICdcXHVGRjI2JzogJ0YnLFxuICAgICdcXHUxRTFFJzogJ0YnLFxuICAgICdcXHUwMTkxJzogJ0YnLFxuICAgICdcXHVBNzdCJzogJ0YnLFxuICAgICdcXHUyNEJDJzogJ0cnLFxuICAgICdcXHVGRjI3JzogJ0cnLFxuICAgICdcXHUwMUY0JzogJ0cnLFxuICAgICdcXHUwMTFDJzogJ0cnLFxuICAgICdcXHUxRTIwJzogJ0cnLFxuICAgICdcXHUwMTFFJzogJ0cnLFxuICAgICdcXHUwMTIwJzogJ0cnLFxuICAgICdcXHUwMUU2JzogJ0cnLFxuICAgICdcXHUwMTIyJzogJ0cnLFxuICAgICdcXHUwMUU0JzogJ0cnLFxuICAgICdcXHUwMTkzJzogJ0cnLFxuICAgICdcXHVBN0EwJzogJ0cnLFxuICAgICdcXHVBNzdEJzogJ0cnLFxuICAgICdcXHVBNzdFJzogJ0cnLFxuICAgICdcXHUyNEJEJzogJ0gnLFxuICAgICdcXHVGRjI4JzogJ0gnLFxuICAgICdcXHUwMTI0JzogJ0gnLFxuICAgICdcXHUxRTIyJzogJ0gnLFxuICAgICdcXHUxRTI2JzogJ0gnLFxuICAgICdcXHUwMjFFJzogJ0gnLFxuICAgICdcXHUxRTI0JzogJ0gnLFxuICAgICdcXHUxRTI4JzogJ0gnLFxuICAgICdcXHUxRTJBJzogJ0gnLFxuICAgICdcXHUwMTI2JzogJ0gnLFxuICAgICdcXHUyQzY3JzogJ0gnLFxuICAgICdcXHUyQzc1JzogJ0gnLFxuICAgICdcXHVBNzhEJzogJ0gnLFxuICAgICdcXHUyNEJFJzogJ0knLFxuICAgICdcXHVGRjI5JzogJ0knLFxuICAgICdcXHUwMENDJzogJ0knLFxuICAgICdcXHUwMENEJzogJ0knLFxuICAgICdcXHUwMENFJzogJ0knLFxuICAgICdcXHUwMTI4JzogJ0knLFxuICAgICdcXHUwMTJBJzogJ0knLFxuICAgICdcXHUwMTJDJzogJ0knLFxuICAgICdcXHUwMTMwJzogJ0knLFxuICAgICdcXHUwMENGJzogJ0knLFxuICAgICdcXHUxRTJFJzogJ0knLFxuICAgICdcXHUxRUM4JzogJ0knLFxuICAgICdcXHUwMUNGJzogJ0knLFxuICAgICdcXHUwMjA4JzogJ0knLFxuICAgICdcXHUwMjBBJzogJ0knLFxuICAgICdcXHUxRUNBJzogJ0knLFxuICAgICdcXHUwMTJFJzogJ0knLFxuICAgICdcXHUxRTJDJzogJ0knLFxuICAgICdcXHUwMTk3JzogJ0knLFxuICAgICdcXHUyNEJGJzogJ0onLFxuICAgICdcXHVGRjJBJzogJ0onLFxuICAgICdcXHUwMTM0JzogJ0onLFxuICAgICdcXHUwMjQ4JzogJ0onLFxuICAgICdcXHUyNEMwJzogJ0snLFxuICAgICdcXHVGRjJCJzogJ0snLFxuICAgICdcXHUxRTMwJzogJ0snLFxuICAgICdcXHUwMUU4JzogJ0snLFxuICAgICdcXHUxRTMyJzogJ0snLFxuICAgICdcXHUwMTM2JzogJ0snLFxuICAgICdcXHUxRTM0JzogJ0snLFxuICAgICdcXHUwMTk4JzogJ0snLFxuICAgICdcXHUyQzY5JzogJ0snLFxuICAgICdcXHVBNzQwJzogJ0snLFxuICAgICdcXHVBNzQyJzogJ0snLFxuICAgICdcXHVBNzQ0JzogJ0snLFxuICAgICdcXHVBN0EyJzogJ0snLFxuICAgICdcXHUyNEMxJzogJ0wnLFxuICAgICdcXHVGRjJDJzogJ0wnLFxuICAgICdcXHUwMTNGJzogJ0wnLFxuICAgICdcXHUwMTM5JzogJ0wnLFxuICAgICdcXHUwMTNEJzogJ0wnLFxuICAgICdcXHUxRTM2JzogJ0wnLFxuICAgICdcXHUxRTM4JzogJ0wnLFxuICAgICdcXHUwMTNCJzogJ0wnLFxuICAgICdcXHUxRTNDJzogJ0wnLFxuICAgICdcXHUxRTNBJzogJ0wnLFxuICAgICdcXHUwMTQxJzogJ0wnLFxuICAgICdcXHUwMjNEJzogJ0wnLFxuICAgICdcXHUyQzYyJzogJ0wnLFxuICAgICdcXHUyQzYwJzogJ0wnLFxuICAgICdcXHVBNzQ4JzogJ0wnLFxuICAgICdcXHVBNzQ2JzogJ0wnLFxuICAgICdcXHVBNzgwJzogJ0wnLFxuICAgICdcXHUwMUM3JzogJ0xKJyxcbiAgICAnXFx1MDFDOCc6ICdMaicsXG4gICAgJ1xcdTI0QzInOiAnTScsXG4gICAgJ1xcdUZGMkQnOiAnTScsXG4gICAgJ1xcdTFFM0UnOiAnTScsXG4gICAgJ1xcdTFFNDAnOiAnTScsXG4gICAgJ1xcdTFFNDInOiAnTScsXG4gICAgJ1xcdTJDNkUnOiAnTScsXG4gICAgJ1xcdTAxOUMnOiAnTScsXG4gICAgJ1xcdTI0QzMnOiAnTicsXG4gICAgJ1xcdUZGMkUnOiAnTicsXG4gICAgJ1xcdTAxRjgnOiAnTicsXG4gICAgJ1xcdTAxNDMnOiAnTicsXG4gICAgJ1xcdTAwRDEnOiAnTicsXG4gICAgJ1xcdTFFNDQnOiAnTicsXG4gICAgJ1xcdTAxNDcnOiAnTicsXG4gICAgJ1xcdTFFNDYnOiAnTicsXG4gICAgJ1xcdTAxNDUnOiAnTicsXG4gICAgJ1xcdTFFNEEnOiAnTicsXG4gICAgJ1xcdTFFNDgnOiAnTicsXG4gICAgJ1xcdTAyMjAnOiAnTicsXG4gICAgJ1xcdTAxOUQnOiAnTicsXG4gICAgJ1xcdUE3OTAnOiAnTicsXG4gICAgJ1xcdUE3QTQnOiAnTicsXG4gICAgJ1xcdTAxQ0EnOiAnTkonLFxuICAgICdcXHUwMUNCJzogJ05qJyxcbiAgICAnXFx1MjRDNCc6ICdPJyxcbiAgICAnXFx1RkYyRic6ICdPJyxcbiAgICAnXFx1MDBEMic6ICdPJyxcbiAgICAnXFx1MDBEMyc6ICdPJyxcbiAgICAnXFx1MDBENCc6ICdPJyxcbiAgICAnXFx1MUVEMic6ICdPJyxcbiAgICAnXFx1MUVEMCc6ICdPJyxcbiAgICAnXFx1MUVENic6ICdPJyxcbiAgICAnXFx1MUVENCc6ICdPJyxcbiAgICAnXFx1MDBENSc6ICdPJyxcbiAgICAnXFx1MUU0Qyc6ICdPJyxcbiAgICAnXFx1MDIyQyc6ICdPJyxcbiAgICAnXFx1MUU0RSc6ICdPJyxcbiAgICAnXFx1MDE0Qyc6ICdPJyxcbiAgICAnXFx1MUU1MCc6ICdPJyxcbiAgICAnXFx1MUU1Mic6ICdPJyxcbiAgICAnXFx1MDE0RSc6ICdPJyxcbiAgICAnXFx1MDIyRSc6ICdPJyxcbiAgICAnXFx1MDIzMCc6ICdPJyxcbiAgICAnXFx1MDBENic6ICdPJyxcbiAgICAnXFx1MDIyQSc6ICdPJyxcbiAgICAnXFx1MUVDRSc6ICdPJyxcbiAgICAnXFx1MDE1MCc6ICdPJyxcbiAgICAnXFx1MDFEMSc6ICdPJyxcbiAgICAnXFx1MDIwQyc6ICdPJyxcbiAgICAnXFx1MDIwRSc6ICdPJyxcbiAgICAnXFx1MDFBMCc6ICdPJyxcbiAgICAnXFx1MUVEQyc6ICdPJyxcbiAgICAnXFx1MUVEQSc6ICdPJyxcbiAgICAnXFx1MUVFMCc6ICdPJyxcbiAgICAnXFx1MUVERSc6ICdPJyxcbiAgICAnXFx1MUVFMic6ICdPJyxcbiAgICAnXFx1MUVDQyc6ICdPJyxcbiAgICAnXFx1MUVEOCc6ICdPJyxcbiAgICAnXFx1MDFFQSc6ICdPJyxcbiAgICAnXFx1MDFFQyc6ICdPJyxcbiAgICAnXFx1MDBEOCc6ICdPJyxcbiAgICAnXFx1MDFGRSc6ICdPJyxcbiAgICAnXFx1MDE4Nic6ICdPJyxcbiAgICAnXFx1MDE5Ric6ICdPJyxcbiAgICAnXFx1QTc0QSc6ICdPJyxcbiAgICAnXFx1QTc0Qyc6ICdPJyxcbiAgICAnXFx1MDE1Mic6ICdPRScsXG4gICAgJ1xcdTAxQTInOiAnT0knLFxuICAgICdcXHVBNzRFJzogJ09PJyxcbiAgICAnXFx1MDIyMic6ICdPVScsXG4gICAgJ1xcdTI0QzUnOiAnUCcsXG4gICAgJ1xcdUZGMzAnOiAnUCcsXG4gICAgJ1xcdTFFNTQnOiAnUCcsXG4gICAgJ1xcdTFFNTYnOiAnUCcsXG4gICAgJ1xcdTAxQTQnOiAnUCcsXG4gICAgJ1xcdTJDNjMnOiAnUCcsXG4gICAgJ1xcdUE3NTAnOiAnUCcsXG4gICAgJ1xcdUE3NTInOiAnUCcsXG4gICAgJ1xcdUE3NTQnOiAnUCcsXG4gICAgJ1xcdTI0QzYnOiAnUScsXG4gICAgJ1xcdUZGMzEnOiAnUScsXG4gICAgJ1xcdUE3NTYnOiAnUScsXG4gICAgJ1xcdUE3NTgnOiAnUScsXG4gICAgJ1xcdTAyNEEnOiAnUScsXG4gICAgJ1xcdTI0QzcnOiAnUicsXG4gICAgJ1xcdUZGMzInOiAnUicsXG4gICAgJ1xcdTAxNTQnOiAnUicsXG4gICAgJ1xcdTFFNTgnOiAnUicsXG4gICAgJ1xcdTAxNTgnOiAnUicsXG4gICAgJ1xcdTAyMTAnOiAnUicsXG4gICAgJ1xcdTAyMTInOiAnUicsXG4gICAgJ1xcdTFFNUEnOiAnUicsXG4gICAgJ1xcdTFFNUMnOiAnUicsXG4gICAgJ1xcdTAxNTYnOiAnUicsXG4gICAgJ1xcdTFFNUUnOiAnUicsXG4gICAgJ1xcdTAyNEMnOiAnUicsXG4gICAgJ1xcdTJDNjQnOiAnUicsXG4gICAgJ1xcdUE3NUEnOiAnUicsXG4gICAgJ1xcdUE3QTYnOiAnUicsXG4gICAgJ1xcdUE3ODInOiAnUicsXG4gICAgJ1xcdTI0QzgnOiAnUycsXG4gICAgJ1xcdUZGMzMnOiAnUycsXG4gICAgJ1xcdTFFOUUnOiAnUycsXG4gICAgJ1xcdTAxNUEnOiAnUycsXG4gICAgJ1xcdTFFNjQnOiAnUycsXG4gICAgJ1xcdTAxNUMnOiAnUycsXG4gICAgJ1xcdTFFNjAnOiAnUycsXG4gICAgJ1xcdTAxNjAnOiAnUycsXG4gICAgJ1xcdTFFNjYnOiAnUycsXG4gICAgJ1xcdTFFNjInOiAnUycsXG4gICAgJ1xcdTFFNjgnOiAnUycsXG4gICAgJ1xcdTAyMTgnOiAnUycsXG4gICAgJ1xcdTAxNUUnOiAnUycsXG4gICAgJ1xcdTJDN0UnOiAnUycsXG4gICAgJ1xcdUE3QTgnOiAnUycsXG4gICAgJ1xcdUE3ODQnOiAnUycsXG4gICAgJ1xcdTI0QzknOiAnVCcsXG4gICAgJ1xcdUZGMzQnOiAnVCcsXG4gICAgJ1xcdTFFNkEnOiAnVCcsXG4gICAgJ1xcdTAxNjQnOiAnVCcsXG4gICAgJ1xcdTFFNkMnOiAnVCcsXG4gICAgJ1xcdTAyMUEnOiAnVCcsXG4gICAgJ1xcdTAxNjInOiAnVCcsXG4gICAgJ1xcdTFFNzAnOiAnVCcsXG4gICAgJ1xcdTFFNkUnOiAnVCcsXG4gICAgJ1xcdTAxNjYnOiAnVCcsXG4gICAgJ1xcdTAxQUMnOiAnVCcsXG4gICAgJ1xcdTAxQUUnOiAnVCcsXG4gICAgJ1xcdTAyM0UnOiAnVCcsXG4gICAgJ1xcdUE3ODYnOiAnVCcsXG4gICAgJ1xcdUE3MjgnOiAnVFonLFxuICAgICdcXHUyNENBJzogJ1UnLFxuICAgICdcXHVGRjM1JzogJ1UnLFxuICAgICdcXHUwMEQ5JzogJ1UnLFxuICAgICdcXHUwMERBJzogJ1UnLFxuICAgICdcXHUwMERCJzogJ1UnLFxuICAgICdcXHUwMTY4JzogJ1UnLFxuICAgICdcXHUxRTc4JzogJ1UnLFxuICAgICdcXHUwMTZBJzogJ1UnLFxuICAgICdcXHUxRTdBJzogJ1UnLFxuICAgICdcXHUwMTZDJzogJ1UnLFxuICAgICdcXHUwMERDJzogJ1UnLFxuICAgICdcXHUwMURCJzogJ1UnLFxuICAgICdcXHUwMUQ3JzogJ1UnLFxuICAgICdcXHUwMUQ1JzogJ1UnLFxuICAgICdcXHUwMUQ5JzogJ1UnLFxuICAgICdcXHUxRUU2JzogJ1UnLFxuICAgICdcXHUwMTZFJzogJ1UnLFxuICAgICdcXHUwMTcwJzogJ1UnLFxuICAgICdcXHUwMUQzJzogJ1UnLFxuICAgICdcXHUwMjE0JzogJ1UnLFxuICAgICdcXHUwMjE2JzogJ1UnLFxuICAgICdcXHUwMUFGJzogJ1UnLFxuICAgICdcXHUxRUVBJzogJ1UnLFxuICAgICdcXHUxRUU4JzogJ1UnLFxuICAgICdcXHUxRUVFJzogJ1UnLFxuICAgICdcXHUxRUVDJzogJ1UnLFxuICAgICdcXHUxRUYwJzogJ1UnLFxuICAgICdcXHUxRUU0JzogJ1UnLFxuICAgICdcXHUxRTcyJzogJ1UnLFxuICAgICdcXHUwMTcyJzogJ1UnLFxuICAgICdcXHUxRTc2JzogJ1UnLFxuICAgICdcXHUxRTc0JzogJ1UnLFxuICAgICdcXHUwMjQ0JzogJ1UnLFxuICAgICdcXHUyNENCJzogJ1YnLFxuICAgICdcXHVGRjM2JzogJ1YnLFxuICAgICdcXHUxRTdDJzogJ1YnLFxuICAgICdcXHUxRTdFJzogJ1YnLFxuICAgICdcXHUwMUIyJzogJ1YnLFxuICAgICdcXHVBNzVFJzogJ1YnLFxuICAgICdcXHUwMjQ1JzogJ1YnLFxuICAgICdcXHVBNzYwJzogJ1ZZJyxcbiAgICAnXFx1MjRDQyc6ICdXJyxcbiAgICAnXFx1RkYzNyc6ICdXJyxcbiAgICAnXFx1MUU4MCc6ICdXJyxcbiAgICAnXFx1MUU4Mic6ICdXJyxcbiAgICAnXFx1MDE3NCc6ICdXJyxcbiAgICAnXFx1MUU4Nic6ICdXJyxcbiAgICAnXFx1MUU4NCc6ICdXJyxcbiAgICAnXFx1MUU4OCc6ICdXJyxcbiAgICAnXFx1MkM3Mic6ICdXJyxcbiAgICAnXFx1MjRDRCc6ICdYJyxcbiAgICAnXFx1RkYzOCc6ICdYJyxcbiAgICAnXFx1MUU4QSc6ICdYJyxcbiAgICAnXFx1MUU4Qyc6ICdYJyxcbiAgICAnXFx1MjRDRSc6ICdZJyxcbiAgICAnXFx1RkYzOSc6ICdZJyxcbiAgICAnXFx1MUVGMic6ICdZJyxcbiAgICAnXFx1MDBERCc6ICdZJyxcbiAgICAnXFx1MDE3Nic6ICdZJyxcbiAgICAnXFx1MUVGOCc6ICdZJyxcbiAgICAnXFx1MDIzMic6ICdZJyxcbiAgICAnXFx1MUU4RSc6ICdZJyxcbiAgICAnXFx1MDE3OCc6ICdZJyxcbiAgICAnXFx1MUVGNic6ICdZJyxcbiAgICAnXFx1MUVGNCc6ICdZJyxcbiAgICAnXFx1MDFCMyc6ICdZJyxcbiAgICAnXFx1MDI0RSc6ICdZJyxcbiAgICAnXFx1MUVGRSc6ICdZJyxcbiAgICAnXFx1MjRDRic6ICdaJyxcbiAgICAnXFx1RkYzQSc6ICdaJyxcbiAgICAnXFx1MDE3OSc6ICdaJyxcbiAgICAnXFx1MUU5MCc6ICdaJyxcbiAgICAnXFx1MDE3Qic6ICdaJyxcbiAgICAnXFx1MDE3RCc6ICdaJyxcbiAgICAnXFx1MUU5Mic6ICdaJyxcbiAgICAnXFx1MUU5NCc6ICdaJyxcbiAgICAnXFx1MDFCNSc6ICdaJyxcbiAgICAnXFx1MDIyNCc6ICdaJyxcbiAgICAnXFx1MkM3Ric6ICdaJyxcbiAgICAnXFx1MkM2Qic6ICdaJyxcbiAgICAnXFx1QTc2Mic6ICdaJyxcbiAgICAnXFx1MjREMCc6ICdhJyxcbiAgICAnXFx1RkY0MSc6ICdhJyxcbiAgICAnXFx1MUU5QSc6ICdhJyxcbiAgICAnXFx1MDBFMCc6ICdhJyxcbiAgICAnXFx1MDBFMSc6ICdhJyxcbiAgICAnXFx1MDBFMic6ICdhJyxcbiAgICAnXFx1MUVBNyc6ICdhJyxcbiAgICAnXFx1MUVBNSc6ICdhJyxcbiAgICAnXFx1MUVBQic6ICdhJyxcbiAgICAnXFx1MUVBOSc6ICdhJyxcbiAgICAnXFx1MDBFMyc6ICdhJyxcbiAgICAnXFx1MDEwMSc6ICdhJyxcbiAgICAnXFx1MDEwMyc6ICdhJyxcbiAgICAnXFx1MUVCMSc6ICdhJyxcbiAgICAnXFx1MUVBRic6ICdhJyxcbiAgICAnXFx1MUVCNSc6ICdhJyxcbiAgICAnXFx1MUVCMyc6ICdhJyxcbiAgICAnXFx1MDIyNyc6ICdhJyxcbiAgICAnXFx1MDFFMSc6ICdhJyxcbiAgICAnXFx1MDBFNCc6ICdhJyxcbiAgICAnXFx1MDFERic6ICdhJyxcbiAgICAnXFx1MUVBMyc6ICdhJyxcbiAgICAnXFx1MDBFNSc6ICdhJyxcbiAgICAnXFx1MDFGQic6ICdhJyxcbiAgICAnXFx1MDFDRSc6ICdhJyxcbiAgICAnXFx1MDIwMSc6ICdhJyxcbiAgICAnXFx1MDIwMyc6ICdhJyxcbiAgICAnXFx1MUVBMSc6ICdhJyxcbiAgICAnXFx1MUVBRCc6ICdhJyxcbiAgICAnXFx1MUVCNyc6ICdhJyxcbiAgICAnXFx1MUUwMSc6ICdhJyxcbiAgICAnXFx1MDEwNSc6ICdhJyxcbiAgICAnXFx1MkM2NSc6ICdhJyxcbiAgICAnXFx1MDI1MCc6ICdhJyxcbiAgICAnXFx1QTczMyc6ICdhYScsXG4gICAgJ1xcdTAwRTYnOiAnYWUnLFxuICAgICdcXHUwMUZEJzogJ2FlJyxcbiAgICAnXFx1MDFFMyc6ICdhZScsXG4gICAgJ1xcdUE3MzUnOiAnYW8nLFxuICAgICdcXHVBNzM3JzogJ2F1JyxcbiAgICAnXFx1QTczOSc6ICdhdicsXG4gICAgJ1xcdUE3M0InOiAnYXYnLFxuICAgICdcXHVBNzNEJzogJ2F5JyxcbiAgICAnXFx1MjREMSc6ICdiJyxcbiAgICAnXFx1RkY0Mic6ICdiJyxcbiAgICAnXFx1MUUwMyc6ICdiJyxcbiAgICAnXFx1MUUwNSc6ICdiJyxcbiAgICAnXFx1MUUwNyc6ICdiJyxcbiAgICAnXFx1MDE4MCc6ICdiJyxcbiAgICAnXFx1MDE4Myc6ICdiJyxcbiAgICAnXFx1MDI1Myc6ICdiJyxcbiAgICAnXFx1MjREMic6ICdjJyxcbiAgICAnXFx1RkY0Myc6ICdjJyxcbiAgICAnXFx1MDEwNyc6ICdjJyxcbiAgICAnXFx1MDEwOSc6ICdjJyxcbiAgICAnXFx1MDEwQic6ICdjJyxcbiAgICAnXFx1MDEwRCc6ICdjJyxcbiAgICAnXFx1MDBFNyc6ICdjJyxcbiAgICAnXFx1MUUwOSc6ICdjJyxcbiAgICAnXFx1MDE4OCc6ICdjJyxcbiAgICAnXFx1MDIzQyc6ICdjJyxcbiAgICAnXFx1QTczRic6ICdjJyxcbiAgICAnXFx1MjE4NCc6ICdjJyxcbiAgICAnXFx1MjREMyc6ICdkJyxcbiAgICAnXFx1RkY0NCc6ICdkJyxcbiAgICAnXFx1MUUwQic6ICdkJyxcbiAgICAnXFx1MDEwRic6ICdkJyxcbiAgICAnXFx1MUUwRCc6ICdkJyxcbiAgICAnXFx1MUUxMSc6ICdkJyxcbiAgICAnXFx1MUUxMyc6ICdkJyxcbiAgICAnXFx1MUUwRic6ICdkJyxcbiAgICAnXFx1MDExMSc6ICdkJyxcbiAgICAnXFx1MDE4Qyc6ICdkJyxcbiAgICAnXFx1MDI1Nic6ICdkJyxcbiAgICAnXFx1MDI1Nyc6ICdkJyxcbiAgICAnXFx1QTc3QSc6ICdkJyxcbiAgICAnXFx1MDFGMyc6ICdkeicsXG4gICAgJ1xcdTAxQzYnOiAnZHonLFxuICAgICdcXHUyNEQ0JzogJ2UnLFxuICAgICdcXHVGRjQ1JzogJ2UnLFxuICAgICdcXHUwMEU4JzogJ2UnLFxuICAgICdcXHUwMEU5JzogJ2UnLFxuICAgICdcXHUwMEVBJzogJ2UnLFxuICAgICdcXHUxRUMxJzogJ2UnLFxuICAgICdcXHUxRUJGJzogJ2UnLFxuICAgICdcXHUxRUM1JzogJ2UnLFxuICAgICdcXHUxRUMzJzogJ2UnLFxuICAgICdcXHUxRUJEJzogJ2UnLFxuICAgICdcXHUwMTEzJzogJ2UnLFxuICAgICdcXHUxRTE1JzogJ2UnLFxuICAgICdcXHUxRTE3JzogJ2UnLFxuICAgICdcXHUwMTE1JzogJ2UnLFxuICAgICdcXHUwMTE3JzogJ2UnLFxuICAgICdcXHUwMEVCJzogJ2UnLFxuICAgICdcXHUxRUJCJzogJ2UnLFxuICAgICdcXHUwMTFCJzogJ2UnLFxuICAgICdcXHUwMjA1JzogJ2UnLFxuICAgICdcXHUwMjA3JzogJ2UnLFxuICAgICdcXHUxRUI5JzogJ2UnLFxuICAgICdcXHUxRUM3JzogJ2UnLFxuICAgICdcXHUwMjI5JzogJ2UnLFxuICAgICdcXHUxRTFEJzogJ2UnLFxuICAgICdcXHUwMTE5JzogJ2UnLFxuICAgICdcXHUxRTE5JzogJ2UnLFxuICAgICdcXHUxRTFCJzogJ2UnLFxuICAgICdcXHUwMjQ3JzogJ2UnLFxuICAgICdcXHUwMjVCJzogJ2UnLFxuICAgICdcXHUwMUREJzogJ2UnLFxuICAgICdcXHUyNEQ1JzogJ2YnLFxuICAgICdcXHVGRjQ2JzogJ2YnLFxuICAgICdcXHUxRTFGJzogJ2YnLFxuICAgICdcXHUwMTkyJzogJ2YnLFxuICAgICdcXHVBNzdDJzogJ2YnLFxuICAgICdcXHUyNEQ2JzogJ2cnLFxuICAgICdcXHVGRjQ3JzogJ2cnLFxuICAgICdcXHUwMUY1JzogJ2cnLFxuICAgICdcXHUwMTFEJzogJ2cnLFxuICAgICdcXHUxRTIxJzogJ2cnLFxuICAgICdcXHUwMTFGJzogJ2cnLFxuICAgICdcXHUwMTIxJzogJ2cnLFxuICAgICdcXHUwMUU3JzogJ2cnLFxuICAgICdcXHUwMTIzJzogJ2cnLFxuICAgICdcXHUwMUU1JzogJ2cnLFxuICAgICdcXHUwMjYwJzogJ2cnLFxuICAgICdcXHVBN0ExJzogJ2cnLFxuICAgICdcXHUxRDc5JzogJ2cnLFxuICAgICdcXHVBNzdGJzogJ2cnLFxuICAgICdcXHUyNEQ3JzogJ2gnLFxuICAgICdcXHVGRjQ4JzogJ2gnLFxuICAgICdcXHUwMTI1JzogJ2gnLFxuICAgICdcXHUxRTIzJzogJ2gnLFxuICAgICdcXHUxRTI3JzogJ2gnLFxuICAgICdcXHUwMjFGJzogJ2gnLFxuICAgICdcXHUxRTI1JzogJ2gnLFxuICAgICdcXHUxRTI5JzogJ2gnLFxuICAgICdcXHUxRTJCJzogJ2gnLFxuICAgICdcXHUxRTk2JzogJ2gnLFxuICAgICdcXHUwMTI3JzogJ2gnLFxuICAgICdcXHUyQzY4JzogJ2gnLFxuICAgICdcXHUyQzc2JzogJ2gnLFxuICAgICdcXHUwMjY1JzogJ2gnLFxuICAgICdcXHUwMTk1JzogJ2h2JyxcbiAgICAnXFx1MjREOCc6ICdpJyxcbiAgICAnXFx1RkY0OSc6ICdpJyxcbiAgICAnXFx1MDBFQyc6ICdpJyxcbiAgICAnXFx1MDBFRCc6ICdpJyxcbiAgICAnXFx1MDBFRSc6ICdpJyxcbiAgICAnXFx1MDEyOSc6ICdpJyxcbiAgICAnXFx1MDEyQic6ICdpJyxcbiAgICAnXFx1MDEyRCc6ICdpJyxcbiAgICAnXFx1MDBFRic6ICdpJyxcbiAgICAnXFx1MUUyRic6ICdpJyxcbiAgICAnXFx1MUVDOSc6ICdpJyxcbiAgICAnXFx1MDFEMCc6ICdpJyxcbiAgICAnXFx1MDIwOSc6ICdpJyxcbiAgICAnXFx1MDIwQic6ICdpJyxcbiAgICAnXFx1MUVDQic6ICdpJyxcbiAgICAnXFx1MDEyRic6ICdpJyxcbiAgICAnXFx1MUUyRCc6ICdpJyxcbiAgICAnXFx1MDI2OCc6ICdpJyxcbiAgICAnXFx1MDEzMSc6ICdpJyxcbiAgICAnXFx1MjREOSc6ICdqJyxcbiAgICAnXFx1RkY0QSc6ICdqJyxcbiAgICAnXFx1MDEzNSc6ICdqJyxcbiAgICAnXFx1MDFGMCc6ICdqJyxcbiAgICAnXFx1MDI0OSc6ICdqJyxcbiAgICAnXFx1MjREQSc6ICdrJyxcbiAgICAnXFx1RkY0Qic6ICdrJyxcbiAgICAnXFx1MUUzMSc6ICdrJyxcbiAgICAnXFx1MDFFOSc6ICdrJyxcbiAgICAnXFx1MUUzMyc6ICdrJyxcbiAgICAnXFx1MDEzNyc6ICdrJyxcbiAgICAnXFx1MUUzNSc6ICdrJyxcbiAgICAnXFx1MDE5OSc6ICdrJyxcbiAgICAnXFx1MkM2QSc6ICdrJyxcbiAgICAnXFx1QTc0MSc6ICdrJyxcbiAgICAnXFx1QTc0Myc6ICdrJyxcbiAgICAnXFx1QTc0NSc6ICdrJyxcbiAgICAnXFx1QTdBMyc6ICdrJyxcbiAgICAnXFx1MjREQic6ICdsJyxcbiAgICAnXFx1RkY0Qyc6ICdsJyxcbiAgICAnXFx1MDE0MCc6ICdsJyxcbiAgICAnXFx1MDEzQSc6ICdsJyxcbiAgICAnXFx1MDEzRSc6ICdsJyxcbiAgICAnXFx1MUUzNyc6ICdsJyxcbiAgICAnXFx1MUUzOSc6ICdsJyxcbiAgICAnXFx1MDEzQyc6ICdsJyxcbiAgICAnXFx1MUUzRCc6ICdsJyxcbiAgICAnXFx1MUUzQic6ICdsJyxcbiAgICAnXFx1MDE3Ric6ICdsJyxcbiAgICAnXFx1MDE0Mic6ICdsJyxcbiAgICAnXFx1MDE5QSc6ICdsJyxcbiAgICAnXFx1MDI2Qic6ICdsJyxcbiAgICAnXFx1MkM2MSc6ICdsJyxcbiAgICAnXFx1QTc0OSc6ICdsJyxcbiAgICAnXFx1QTc4MSc6ICdsJyxcbiAgICAnXFx1QTc0Nyc6ICdsJyxcbiAgICAnXFx1MDFDOSc6ICdsaicsXG4gICAgJ1xcdTI0REMnOiAnbScsXG4gICAgJ1xcdUZGNEQnOiAnbScsXG4gICAgJ1xcdTFFM0YnOiAnbScsXG4gICAgJ1xcdTFFNDEnOiAnbScsXG4gICAgJ1xcdTFFNDMnOiAnbScsXG4gICAgJ1xcdTAyNzEnOiAnbScsXG4gICAgJ1xcdTAyNkYnOiAnbScsXG4gICAgJ1xcdTI0REQnOiAnbicsXG4gICAgJ1xcdUZGNEUnOiAnbicsXG4gICAgJ1xcdTAxRjknOiAnbicsXG4gICAgJ1xcdTAxNDQnOiAnbicsXG4gICAgJ1xcdTAwRjEnOiAnbicsXG4gICAgJ1xcdTFFNDUnOiAnbicsXG4gICAgJ1xcdTAxNDgnOiAnbicsXG4gICAgJ1xcdTFFNDcnOiAnbicsXG4gICAgJ1xcdTAxNDYnOiAnbicsXG4gICAgJ1xcdTFFNEInOiAnbicsXG4gICAgJ1xcdTFFNDknOiAnbicsXG4gICAgJ1xcdTAxOUUnOiAnbicsXG4gICAgJ1xcdTAyNzInOiAnbicsXG4gICAgJ1xcdTAxNDknOiAnbicsXG4gICAgJ1xcdUE3OTEnOiAnbicsXG4gICAgJ1xcdUE3QTUnOiAnbicsXG4gICAgJ1xcdTAxQ0MnOiAnbmonLFxuICAgICdcXHUyNERFJzogJ28nLFxuICAgICdcXHVGRjRGJzogJ28nLFxuICAgICdcXHUwMEYyJzogJ28nLFxuICAgICdcXHUwMEYzJzogJ28nLFxuICAgICdcXHUwMEY0JzogJ28nLFxuICAgICdcXHUxRUQzJzogJ28nLFxuICAgICdcXHUxRUQxJzogJ28nLFxuICAgICdcXHUxRUQ3JzogJ28nLFxuICAgICdcXHUxRUQ1JzogJ28nLFxuICAgICdcXHUwMEY1JzogJ28nLFxuICAgICdcXHUxRTREJzogJ28nLFxuICAgICdcXHUwMjJEJzogJ28nLFxuICAgICdcXHUxRTRGJzogJ28nLFxuICAgICdcXHUwMTREJzogJ28nLFxuICAgICdcXHUxRTUxJzogJ28nLFxuICAgICdcXHUxRTUzJzogJ28nLFxuICAgICdcXHUwMTRGJzogJ28nLFxuICAgICdcXHUwMjJGJzogJ28nLFxuICAgICdcXHUwMjMxJzogJ28nLFxuICAgICdcXHUwMEY2JzogJ28nLFxuICAgICdcXHUwMjJCJzogJ28nLFxuICAgICdcXHUxRUNGJzogJ28nLFxuICAgICdcXHUwMTUxJzogJ28nLFxuICAgICdcXHUwMUQyJzogJ28nLFxuICAgICdcXHUwMjBEJzogJ28nLFxuICAgICdcXHUwMjBGJzogJ28nLFxuICAgICdcXHUwMUExJzogJ28nLFxuICAgICdcXHUxRUREJzogJ28nLFxuICAgICdcXHUxRURCJzogJ28nLFxuICAgICdcXHUxRUUxJzogJ28nLFxuICAgICdcXHUxRURGJzogJ28nLFxuICAgICdcXHUxRUUzJzogJ28nLFxuICAgICdcXHUxRUNEJzogJ28nLFxuICAgICdcXHUxRUQ5JzogJ28nLFxuICAgICdcXHUwMUVCJzogJ28nLFxuICAgICdcXHUwMUVEJzogJ28nLFxuICAgICdcXHUwMEY4JzogJ28nLFxuICAgICdcXHUwMUZGJzogJ28nLFxuICAgICdcXHUwMjU0JzogJ28nLFxuICAgICdcXHVBNzRCJzogJ28nLFxuICAgICdcXHVBNzREJzogJ28nLFxuICAgICdcXHUwMjc1JzogJ28nLFxuICAgICdcXHUwMTUzJzogJ29lJyxcbiAgICAnXFx1MDFBMyc6ICdvaScsXG4gICAgJ1xcdTAyMjMnOiAnb3UnLFxuICAgICdcXHVBNzRGJzogJ29vJyxcbiAgICAnXFx1MjRERic6ICdwJyxcbiAgICAnXFx1RkY1MCc6ICdwJyxcbiAgICAnXFx1MUU1NSc6ICdwJyxcbiAgICAnXFx1MUU1Nyc6ICdwJyxcbiAgICAnXFx1MDFBNSc6ICdwJyxcbiAgICAnXFx1MUQ3RCc6ICdwJyxcbiAgICAnXFx1QTc1MSc6ICdwJyxcbiAgICAnXFx1QTc1Myc6ICdwJyxcbiAgICAnXFx1QTc1NSc6ICdwJyxcbiAgICAnXFx1MjRFMCc6ICdxJyxcbiAgICAnXFx1RkY1MSc6ICdxJyxcbiAgICAnXFx1MDI0Qic6ICdxJyxcbiAgICAnXFx1QTc1Nyc6ICdxJyxcbiAgICAnXFx1QTc1OSc6ICdxJyxcbiAgICAnXFx1MjRFMSc6ICdyJyxcbiAgICAnXFx1RkY1Mic6ICdyJyxcbiAgICAnXFx1MDE1NSc6ICdyJyxcbiAgICAnXFx1MUU1OSc6ICdyJyxcbiAgICAnXFx1MDE1OSc6ICdyJyxcbiAgICAnXFx1MDIxMSc6ICdyJyxcbiAgICAnXFx1MDIxMyc6ICdyJyxcbiAgICAnXFx1MUU1Qic6ICdyJyxcbiAgICAnXFx1MUU1RCc6ICdyJyxcbiAgICAnXFx1MDE1Nyc6ICdyJyxcbiAgICAnXFx1MUU1Ric6ICdyJyxcbiAgICAnXFx1MDI0RCc6ICdyJyxcbiAgICAnXFx1MDI3RCc6ICdyJyxcbiAgICAnXFx1QTc1Qic6ICdyJyxcbiAgICAnXFx1QTdBNyc6ICdyJyxcbiAgICAnXFx1QTc4Myc6ICdyJyxcbiAgICAnXFx1MjRFMic6ICdzJyxcbiAgICAnXFx1RkY1Myc6ICdzJyxcbiAgICAnXFx1MDBERic6ICdzJyxcbiAgICAnXFx1MDE1Qic6ICdzJyxcbiAgICAnXFx1MUU2NSc6ICdzJyxcbiAgICAnXFx1MDE1RCc6ICdzJyxcbiAgICAnXFx1MUU2MSc6ICdzJyxcbiAgICAnXFx1MDE2MSc6ICdzJyxcbiAgICAnXFx1MUU2Nyc6ICdzJyxcbiAgICAnXFx1MUU2Myc6ICdzJyxcbiAgICAnXFx1MUU2OSc6ICdzJyxcbiAgICAnXFx1MDIxOSc6ICdzJyxcbiAgICAnXFx1MDE1Ric6ICdzJyxcbiAgICAnXFx1MDIzRic6ICdzJyxcbiAgICAnXFx1QTdBOSc6ICdzJyxcbiAgICAnXFx1QTc4NSc6ICdzJyxcbiAgICAnXFx1MUU5Qic6ICdzJyxcbiAgICAnXFx1MjRFMyc6ICd0JyxcbiAgICAnXFx1RkY1NCc6ICd0JyxcbiAgICAnXFx1MUU2Qic6ICd0JyxcbiAgICAnXFx1MUU5Nyc6ICd0JyxcbiAgICAnXFx1MDE2NSc6ICd0JyxcbiAgICAnXFx1MUU2RCc6ICd0JyxcbiAgICAnXFx1MDIxQic6ICd0JyxcbiAgICAnXFx1MDE2Myc6ICd0JyxcbiAgICAnXFx1MUU3MSc6ICd0JyxcbiAgICAnXFx1MUU2Ric6ICd0JyxcbiAgICAnXFx1MDE2Nyc6ICd0JyxcbiAgICAnXFx1MDFBRCc6ICd0JyxcbiAgICAnXFx1MDI4OCc6ICd0JyxcbiAgICAnXFx1MkM2Nic6ICd0JyxcbiAgICAnXFx1QTc4Nyc6ICd0JyxcbiAgICAnXFx1QTcyOSc6ICd0eicsXG4gICAgJ1xcdTI0RTQnOiAndScsXG4gICAgJ1xcdUZGNTUnOiAndScsXG4gICAgJ1xcdTAwRjknOiAndScsXG4gICAgJ1xcdTAwRkEnOiAndScsXG4gICAgJ1xcdTAwRkInOiAndScsXG4gICAgJ1xcdTAxNjknOiAndScsXG4gICAgJ1xcdTFFNzknOiAndScsXG4gICAgJ1xcdTAxNkInOiAndScsXG4gICAgJ1xcdTFFN0InOiAndScsXG4gICAgJ1xcdTAxNkQnOiAndScsXG4gICAgJ1xcdTAwRkMnOiAndScsXG4gICAgJ1xcdTAxREMnOiAndScsXG4gICAgJ1xcdTAxRDgnOiAndScsXG4gICAgJ1xcdTAxRDYnOiAndScsXG4gICAgJ1xcdTAxREEnOiAndScsXG4gICAgJ1xcdTFFRTcnOiAndScsXG4gICAgJ1xcdTAxNkYnOiAndScsXG4gICAgJ1xcdTAxNzEnOiAndScsXG4gICAgJ1xcdTAxRDQnOiAndScsXG4gICAgJ1xcdTAyMTUnOiAndScsXG4gICAgJ1xcdTAyMTcnOiAndScsXG4gICAgJ1xcdTAxQjAnOiAndScsXG4gICAgJ1xcdTFFRUInOiAndScsXG4gICAgJ1xcdTFFRTknOiAndScsXG4gICAgJ1xcdTFFRUYnOiAndScsXG4gICAgJ1xcdTFFRUQnOiAndScsXG4gICAgJ1xcdTFFRjEnOiAndScsXG4gICAgJ1xcdTFFRTUnOiAndScsXG4gICAgJ1xcdTFFNzMnOiAndScsXG4gICAgJ1xcdTAxNzMnOiAndScsXG4gICAgJ1xcdTFFNzcnOiAndScsXG4gICAgJ1xcdTFFNzUnOiAndScsXG4gICAgJ1xcdTAyODknOiAndScsXG4gICAgJ1xcdTI0RTUnOiAndicsXG4gICAgJ1xcdUZGNTYnOiAndicsXG4gICAgJ1xcdTFFN0QnOiAndicsXG4gICAgJ1xcdTFFN0YnOiAndicsXG4gICAgJ1xcdTAyOEInOiAndicsXG4gICAgJ1xcdUE3NUYnOiAndicsXG4gICAgJ1xcdTAyOEMnOiAndicsXG4gICAgJ1xcdUE3NjEnOiAndnknLFxuICAgICdcXHUyNEU2JzogJ3cnLFxuICAgICdcXHVGRjU3JzogJ3cnLFxuICAgICdcXHUxRTgxJzogJ3cnLFxuICAgICdcXHUxRTgzJzogJ3cnLFxuICAgICdcXHUwMTc1JzogJ3cnLFxuICAgICdcXHUxRTg3JzogJ3cnLFxuICAgICdcXHUxRTg1JzogJ3cnLFxuICAgICdcXHUxRTk4JzogJ3cnLFxuICAgICdcXHUxRTg5JzogJ3cnLFxuICAgICdcXHUyQzczJzogJ3cnLFxuICAgICdcXHUyNEU3JzogJ3gnLFxuICAgICdcXHVGRjU4JzogJ3gnLFxuICAgICdcXHUxRThCJzogJ3gnLFxuICAgICdcXHUxRThEJzogJ3gnLFxuICAgICdcXHUyNEU4JzogJ3knLFxuICAgICdcXHVGRjU5JzogJ3knLFxuICAgICdcXHUxRUYzJzogJ3knLFxuICAgICdcXHUwMEZEJzogJ3knLFxuICAgICdcXHUwMTc3JzogJ3knLFxuICAgICdcXHUxRUY5JzogJ3knLFxuICAgICdcXHUwMjMzJzogJ3knLFxuICAgICdcXHUxRThGJzogJ3knLFxuICAgICdcXHUwMEZGJzogJ3knLFxuICAgICdcXHUxRUY3JzogJ3knLFxuICAgICdcXHUxRTk5JzogJ3knLFxuICAgICdcXHUxRUY1JzogJ3knLFxuICAgICdcXHUwMUI0JzogJ3knLFxuICAgICdcXHUwMjRGJzogJ3knLFxuICAgICdcXHUxRUZGJzogJ3knLFxuICAgICdcXHUyNEU5JzogJ3onLFxuICAgICdcXHVGRjVBJzogJ3onLFxuICAgICdcXHUwMTdBJzogJ3onLFxuICAgICdcXHUxRTkxJzogJ3onLFxuICAgICdcXHUwMTdDJzogJ3onLFxuICAgICdcXHUwMTdFJzogJ3onLFxuICAgICdcXHUxRTkzJzogJ3onLFxuICAgICdcXHUxRTk1JzogJ3onLFxuICAgICdcXHUwMUI2JzogJ3onLFxuICAgICdcXHUwMjI1JzogJ3onLFxuICAgICdcXHUwMjQwJzogJ3onLFxuICAgICdcXHUyQzZDJzogJ3onLFxuICAgICdcXHVBNzYzJzogJ3onLFxuICAgICdcXHUwMzg2JzogJ1xcdTAzOTEnLFxuICAgICdcXHUwMzg4JzogJ1xcdTAzOTUnLFxuICAgICdcXHUwMzg5JzogJ1xcdTAzOTcnLFxuICAgICdcXHUwMzhBJzogJ1xcdTAzOTknLFxuICAgICdcXHUwM0FBJzogJ1xcdTAzOTknLFxuICAgICdcXHUwMzhDJzogJ1xcdTAzOUYnLFxuICAgICdcXHUwMzhFJzogJ1xcdTAzQTUnLFxuICAgICdcXHUwM0FCJzogJ1xcdTAzQTUnLFxuICAgICdcXHUwMzhGJzogJ1xcdTAzQTknLFxuICAgICdcXHUwM0FDJzogJ1xcdTAzQjEnLFxuICAgICdcXHUwM0FEJzogJ1xcdTAzQjUnLFxuICAgICdcXHUwM0FFJzogJ1xcdTAzQjcnLFxuICAgICdcXHUwM0FGJzogJ1xcdTAzQjknLFxuICAgICdcXHUwM0NBJzogJ1xcdTAzQjknLFxuICAgICdcXHUwMzkwJzogJ1xcdTAzQjknLFxuICAgICdcXHUwM0NDJzogJ1xcdTAzQkYnLFxuICAgICdcXHUwM0NEJzogJ1xcdTAzQzUnLFxuICAgICdcXHUwM0NCJzogJ1xcdTAzQzUnLFxuICAgICdcXHUwM0IwJzogJ1xcdTAzQzUnLFxuICAgICdcXHUwM0NFJzogJ1xcdTAzQzknLFxuICAgICdcXHUwM0MyJzogJ1xcdTAzQzMnLFxuICAgICdcXHUyMDE5JzogJ1xcJydcbiAgfTtcblxuICByZXR1cm4gZGlhY3JpdGljcztcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZGF0YS9iYXNlJyxbXG4gICcuLi91dGlscydcbl0sIGZ1bmN0aW9uIChVdGlscykge1xuICBmdW5jdGlvbiBCYXNlQWRhcHRlciAoJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBCYXNlQWRhcHRlci5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIFV0aWxzLkV4dGVuZChCYXNlQWRhcHRlciwgVXRpbHMuT2JzZXJ2YWJsZSk7XG5cbiAgQmFzZUFkYXB0ZXIucHJvdG90eXBlLmN1cnJlbnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgY3VycmVudGAgbWV0aG9kIG11c3QgYmUgZGVmaW5lZCBpbiBjaGlsZCBjbGFzc2VzLicpO1xuICB9O1xuXG4gIEJhc2VBZGFwdGVyLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYHF1ZXJ5YCBtZXRob2QgbXVzdCBiZSBkZWZpbmVkIGluIGNoaWxkIGNsYXNzZXMuJyk7XG4gIH07XG5cbiAgQmFzZUFkYXB0ZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgLy8gQ2FuIGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgfTtcblxuICBCYXNlQWRhcHRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBDYW4gYmUgaW1wbGVtZW50ZWQgaW4gc3ViY2xhc3Nlc1xuICB9O1xuXG4gIEJhc2VBZGFwdGVyLnByb3RvdHlwZS5nZW5lcmF0ZVJlc3VsdElkID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGF0YSkge1xuICAgIHZhciBpZCA9IGNvbnRhaW5lci5pZCArICctcmVzdWx0LSc7XG5cbiAgICBpZCArPSBVdGlscy5nZW5lcmF0ZUNoYXJzKDQpO1xuXG4gICAgaWYgKGRhdGEuaWQgIT0gbnVsbCkge1xuICAgICAgaWQgKz0gJy0nICsgZGF0YS5pZC50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCArPSAnLScgKyBVdGlscy5nZW5lcmF0ZUNoYXJzKDQpO1xuICAgIH1cbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgcmV0dXJuIEJhc2VBZGFwdGVyO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kYXRhL3NlbGVjdCcsW1xuICAnLi9iYXNlJyxcbiAgJy4uL3V0aWxzJyxcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uIChCYXNlQWRhcHRlciwgVXRpbHMsICQpIHtcbiAgZnVuY3Rpb24gU2VsZWN0QWRhcHRlciAoJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIFNlbGVjdEFkYXB0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gIH1cblxuICBVdGlscy5FeHRlbmQoU2VsZWN0QWRhcHRlciwgQmFzZUFkYXB0ZXIpO1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLmN1cnJlbnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgZGF0YSA9IEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChcbiAgICAgIHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSxcbiAgICAgIGZ1bmN0aW9uIChzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuaXRlbSgkKHNlbGVjdGVkRWxlbWVudCkpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjYWxsYmFjayhkYXRhKTtcbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGRhdGEuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgLy8gSWYgZGF0YS5lbGVtZW50IGlzIGEgRE9NIG5vZGUsIHVzZSBpdCBpbnN0ZWFkXG4gICAgaWYgKFxuICAgICAgZGF0YS5lbGVtZW50ICE9IG51bGwgJiYgZGF0YS5lbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ29wdGlvbidcbiAgICApIHtcbiAgICAgIGRhdGEuZWxlbWVudC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaW5wdXQnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRlbGVtZW50LnByb3AoJ211bHRpcGxlJykpIHtcbiAgICAgIHRoaXMuY3VycmVudChmdW5jdGlvbiAoY3VycmVudERhdGEpIHtcbiAgICAgICAgdmFyIHZhbCA9IFtdO1xuXG4gICAgICAgIGRhdGEgPSBbZGF0YV07XG4gICAgICAgIGRhdGEucHVzaC5hcHBseShkYXRhLCBjdXJyZW50RGF0YSk7XG5cbiAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCBkYXRhLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgdmFyIGlkID0gZGF0YVtkXS5pZDtcblxuICAgICAgICAgIGlmICh2YWwuaW5kZXhPZihpZCkgPT09IC0xKSB7XG4gICAgICAgICAgICB2YWwucHVzaChpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi4kZWxlbWVudC52YWwodmFsKTtcbiAgICAgICAgc2VsZi4kZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2YWwgPSBkYXRhLmlkO1xuXG4gICAgICB0aGlzLiRlbGVtZW50LnZhbCh2YWwpO1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH1cbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS51bnNlbGVjdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLiRlbGVtZW50LnByb3AoJ211bHRpcGxlJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkYXRhLnNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICBpZiAoXG4gICAgICBkYXRhLmVsZW1lbnQgIT0gbnVsbCAmJlxuICAgICAgZGF0YS5lbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ29wdGlvbidcbiAgICApIHtcbiAgICAgIGRhdGEuZWxlbWVudC5zZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2lucHV0JykudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnQoZnVuY3Rpb24gKGN1cnJlbnREYXRhKSB7XG4gICAgICB2YXIgdmFsID0gW107XG5cbiAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgY3VycmVudERhdGEubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgdmFyIGlkID0gY3VycmVudERhdGFbZF0uaWQ7XG5cbiAgICAgICAgaWYgKGlkICE9PSBkYXRhLmlkICYmIHZhbC5pbmRleE9mKGlkKSA9PT0gLTEpIHtcbiAgICAgICAgICB2YWwucHVzaChpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi4kZWxlbWVudC52YWwodmFsKTtcblxuICAgICAgc2VsZi4kZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICBjb250YWluZXIub24oJ3NlbGVjdCcsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHNlbGYuc2VsZWN0KHBhcmFtcy5kYXRhKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigndW5zZWxlY3QnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLnVuc2VsZWN0KHBhcmFtcy5kYXRhKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFJlbW92ZSBhbnl0aGluZyBhZGRlZCB0byBjaGlsZCBlbGVtZW50c1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnKicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgLy8gUmVtb3ZlIGFueSBjdXN0b20gZGF0YSBzZXQgYnkgU2VsZWN0MlxuICAgICAgVXRpbHMuUmVtb3ZlRGF0YSh0aGlzKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3RBZGFwdGVyLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGRhdGEgPSBbXTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgJG9wdGlvbnMgPSB0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCk7XG5cbiAgICAkb3B0aW9ucy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdvcHRpb24nICYmXG4gICAgICAgIHRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnb3B0Z3JvdXAnXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgJG9wdGlvbiA9ICQodGhpcyk7XG5cbiAgICAgIHZhciBvcHRpb24gPSBzZWxmLml0ZW0oJG9wdGlvbik7XG5cbiAgICAgIHZhciBtYXRjaGVzID0gc2VsZi5tYXRjaGVzKHBhcmFtcywgb3B0aW9uKTtcblxuICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgZGF0YS5wdXNoKG1hdGNoZXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2FsbGJhY2soe1xuICAgICAgcmVzdWx0czogZGF0YVxuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdEFkYXB0ZXIucHJvdG90eXBlLmFkZE9wdGlvbnMgPSBmdW5jdGlvbiAoJG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50LmFwcGVuZCgkb3B0aW9ucyk7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUub3B0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgb3B0aW9uO1xuXG4gICAgaWYgKGRhdGEuY2hpbGRyZW4pIHtcbiAgICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJyk7XG4gICAgICBvcHRpb24ubGFiZWwgPSBkYXRhLnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXG4gICAgICBpZiAob3B0aW9uLnRleHRDb250ZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gZGF0YS50ZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9IGRhdGEudGV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YS5pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRpb24udmFsdWUgPSBkYXRhLmlkO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmRpc2FibGVkKSB7XG4gICAgICBvcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnNlbGVjdGVkKSB7XG4gICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnRpdGxlKSB7XG4gICAgICBvcHRpb24udGl0bGUgPSBkYXRhLnRpdGxlO1xuICAgIH1cblxuICAgIHZhciBub3JtYWxpemVkRGF0YSA9IHRoaXMuX25vcm1hbGl6ZUl0ZW0oZGF0YSk7XG4gICAgbm9ybWFsaXplZERhdGEuZWxlbWVudCA9IG9wdGlvbjtcblxuICAgIC8vIE92ZXJyaWRlIHRoZSBvcHRpb24ncyBkYXRhIHdpdGggdGhlIGNvbWJpbmVkIGRhdGFcbiAgICBVdGlscy5TdG9yZURhdGEob3B0aW9uLCAnZGF0YScsIG5vcm1hbGl6ZWREYXRhKTtcblxuICAgIHJldHVybiAkKG9wdGlvbik7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUuaXRlbSA9IGZ1bmN0aW9uICgkb3B0aW9uKSB7XG4gICAgdmFyIGRhdGEgPSB7fTtcblxuICAgIGRhdGEgPSBVdGlscy5HZXREYXRhKCRvcHRpb25bMF0sICdkYXRhJyk7XG5cbiAgICBpZiAoZGF0YSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9uID0gJG9wdGlvblswXTtcblxuICAgIGlmIChvcHRpb24udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnb3B0aW9uJykge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgaWQ6ICRvcHRpb24udmFsKCksXG4gICAgICAgIHRleHQ6ICRvcHRpb24udGV4dCgpLFxuICAgICAgICBkaXNhYmxlZDogJG9wdGlvbi5wcm9wKCdkaXNhYmxlZCcpLFxuICAgICAgICBzZWxlY3RlZDogJG9wdGlvbi5wcm9wKCdzZWxlY3RlZCcpLFxuICAgICAgICB0aXRsZTogJG9wdGlvbi5wcm9wKCd0aXRsZScpXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAob3B0aW9uLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ29wdGdyb3VwJykge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgdGV4dDogJG9wdGlvbi5wcm9wKCdsYWJlbCcpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHRpdGxlOiAkb3B0aW9uLnByb3AoJ3RpdGxlJylcbiAgICAgIH07XG5cbiAgICAgIHZhciAkY2hpbGRyZW4gPSAkb3B0aW9uLmNoaWxkcmVuKCdvcHRpb24nKTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8ICRjaGlsZHJlbi5sZW5ndGg7IGMrKykge1xuICAgICAgICB2YXIgJGNoaWxkID0gJCgkY2hpbGRyZW5bY10pO1xuXG4gICAgICAgIHZhciBjaGlsZCA9IHRoaXMuaXRlbSgkY2hpbGQpO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuXG4gICAgICBkYXRhLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgZGF0YSA9IHRoaXMuX25vcm1hbGl6ZUl0ZW0oZGF0YSk7XG4gICAgZGF0YS5lbGVtZW50ID0gJG9wdGlvblswXTtcblxuICAgIFV0aWxzLlN0b3JlRGF0YSgkb3B0aW9uWzBdLCAnZGF0YScsIGRhdGEpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUuX25vcm1hbGl6ZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIGlmIChpdGVtICE9PSBPYmplY3QoaXRlbSkpIHtcbiAgICAgIGl0ZW0gPSB7XG4gICAgICAgIGlkOiBpdGVtLFxuICAgICAgICB0ZXh0OiBpdGVtXG4gICAgICB9O1xuICAgIH1cblxuICAgIGl0ZW0gPSAkLmV4dGVuZCh7fSwge1xuICAgICAgdGV4dDogJydcbiAgICB9LCBpdGVtKTtcblxuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgIH07XG5cbiAgICBpZiAoaXRlbS5pZCAhPSBudWxsKSB7XG4gICAgICBpdGVtLmlkID0gaXRlbS5pZC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmIChpdGVtLnRleHQgIT0gbnVsbCkge1xuICAgICAgaXRlbS50ZXh0ID0gaXRlbS50ZXh0LnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW0uX3Jlc3VsdElkID09IG51bGwgJiYgaXRlbS5pZCAmJiB0aGlzLmNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgICBpdGVtLl9yZXN1bHRJZCA9IHRoaXMuZ2VuZXJhdGVSZXN1bHRJZCh0aGlzLmNvbnRhaW5lciwgaXRlbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgaXRlbSk7XG4gIH07XG5cbiAgU2VsZWN0QWRhcHRlci5wcm90b3R5cGUubWF0Y2hlcyA9IGZ1bmN0aW9uIChwYXJhbXMsIGRhdGEpIHtcbiAgICB2YXIgbWF0Y2hlciA9IHRoaXMub3B0aW9ucy5nZXQoJ21hdGNoZXInKTtcblxuICAgIHJldHVybiBtYXRjaGVyKHBhcmFtcywgZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIFNlbGVjdEFkYXB0ZXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2RhdGEvYXJyYXknLFtcbiAgJy4vc2VsZWN0JyxcbiAgJy4uL3V0aWxzJyxcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uIChTZWxlY3RBZGFwdGVyLCBVdGlscywgJCkge1xuICBmdW5jdGlvbiBBcnJheUFkYXB0ZXIgKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5fZGF0YVRvQ29udmVydCA9IG9wdGlvbnMuZ2V0KCdkYXRhJykgfHwgW107XG5cbiAgICBBcnJheUFkYXB0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgJGVsZW1lbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgVXRpbHMuRXh0ZW5kKEFycmF5QWRhcHRlciwgU2VsZWN0QWRhcHRlcik7XG5cbiAgQXJyYXlBZGFwdGVyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgIEFycmF5QWRhcHRlci5fX3N1cGVyX18uYmluZC5jYWxsKHRoaXMsIGNvbnRhaW5lciwgJGNvbnRhaW5lcik7XG5cbiAgICB0aGlzLmFkZE9wdGlvbnModGhpcy5jb252ZXJ0VG9PcHRpb25zKHRoaXMuX2RhdGFUb0NvbnZlcnQpKTtcbiAgfTtcblxuICBBcnJheUFkYXB0ZXIucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyICRvcHRpb24gPSB0aGlzLiRlbGVtZW50LmZpbmQoJ29wdGlvbicpLmZpbHRlcihmdW5jdGlvbiAoaSwgZWxtKSB7XG4gICAgICByZXR1cm4gZWxtLnZhbHVlID09IGRhdGEuaWQudG9TdHJpbmcoKTtcbiAgICB9KTtcblxuICAgIGlmICgkb3B0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgJG9wdGlvbiA9IHRoaXMub3B0aW9uKGRhdGEpO1xuXG4gICAgICB0aGlzLmFkZE9wdGlvbnMoJG9wdGlvbik7XG4gICAgfVxuXG4gICAgQXJyYXlBZGFwdGVyLl9fc3VwZXJfXy5zZWxlY3QuY2FsbCh0aGlzLCBkYXRhKTtcbiAgfTtcblxuICBBcnJheUFkYXB0ZXIucHJvdG90eXBlLmNvbnZlcnRUb09wdGlvbnMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciAkZXhpc3RpbmcgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ29wdGlvbicpO1xuICAgIHZhciBleGlzdGluZ0lkcyA9ICRleGlzdGluZy5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNlbGYuaXRlbSgkKHRoaXMpKS5pZDtcbiAgICB9KS5nZXQoKTtcblxuICAgIHZhciAkb3B0aW9ucyA9IFtdO1xuXG4gICAgLy8gRmlsdGVyIG91dCBhbGwgaXRlbXMgZXhjZXB0IGZvciB0aGUgb25lIHBhc3NlZCBpbiB0aGUgYXJndW1lbnRcbiAgICBmdW5jdGlvbiBvbmx5SXRlbSAoaXRlbSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQodGhpcykudmFsKCkgPT0gaXRlbS5pZDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgZCA9IDA7IGQgPCBkYXRhLmxlbmd0aDsgZCsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHRoaXMuX25vcm1hbGl6ZUl0ZW0oZGF0YVtkXSk7XG5cbiAgICAgIC8vIFNraXAgaXRlbXMgd2hpY2ggd2VyZSBwcmUtbG9hZGVkLCBvbmx5IG1lcmdlIHRoZSBkYXRhXG4gICAgICBpZiAoZXhpc3RpbmdJZHMuaW5kZXhPZihpdGVtLmlkKSA+PSAwKSB7XG4gICAgICAgIHZhciAkZXhpc3RpbmdPcHRpb24gPSAkZXhpc3RpbmcuZmlsdGVyKG9ubHlJdGVtKGl0ZW0pKTtcblxuICAgICAgICB2YXIgZXhpc3RpbmdEYXRhID0gdGhpcy5pdGVtKCRleGlzdGluZ09wdGlvbik7XG4gICAgICAgIHZhciBuZXdEYXRhID0gJC5leHRlbmQodHJ1ZSwge30sIGl0ZW0sIGV4aXN0aW5nRGF0YSk7XG5cbiAgICAgICAgdmFyICRuZXdPcHRpb24gPSB0aGlzLm9wdGlvbihuZXdEYXRhKTtcblxuICAgICAgICAkZXhpc3RpbmdPcHRpb24ucmVwbGFjZVdpdGgoJG5ld09wdGlvbik7XG5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhciAkb3B0aW9uID0gdGhpcy5vcHRpb24oaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgIHZhciAkY2hpbGRyZW4gPSB0aGlzLmNvbnZlcnRUb09wdGlvbnMoaXRlbS5jaGlsZHJlbik7XG5cbiAgICAgICAgJG9wdGlvbi5hcHBlbmQoJGNoaWxkcmVuKTtcbiAgICAgIH1cblxuICAgICAgJG9wdGlvbnMucHVzaCgkb3B0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG9wdGlvbnM7XG4gIH07XG5cbiAgcmV0dXJuIEFycmF5QWRhcHRlcjtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZGF0YS9hamF4JyxbXG4gICcuL2FycmF5JyxcbiAgJy4uL3V0aWxzJyxcbiAgJ2pxdWVyeSdcbl0sIGZ1bmN0aW9uIChBcnJheUFkYXB0ZXIsIFV0aWxzLCAkKSB7XG4gIGZ1bmN0aW9uIEFqYXhBZGFwdGVyICgkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuYWpheE9wdGlvbnMgPSB0aGlzLl9hcHBseURlZmF1bHRzKG9wdGlvbnMuZ2V0KCdhamF4JykpO1xuXG4gICAgaWYgKHRoaXMuYWpheE9wdGlvbnMucHJvY2Vzc1Jlc3VsdHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5wcm9jZXNzUmVzdWx0cyA9IHRoaXMuYWpheE9wdGlvbnMucHJvY2Vzc1Jlc3VsdHM7XG4gICAgfVxuXG4gICAgQWpheEFkYXB0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgJGVsZW1lbnQsIG9wdGlvbnMpO1xuICB9XG5cbiAgVXRpbHMuRXh0ZW5kKEFqYXhBZGFwdGVyLCBBcnJheUFkYXB0ZXIpO1xuXG4gIEFqYXhBZGFwdGVyLnByb3RvdHlwZS5fYXBwbHlEZWZhdWx0cyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgZGF0YTogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIHBhcmFtcywge1xuICAgICAgICAgIHE6IHBhcmFtcy50ZXJtXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHRyYW5zcG9ydDogZnVuY3Rpb24gKHBhcmFtcywgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgICAgICB2YXIgJHJlcXVlc3QgPSAkLmFqYXgocGFyYW1zKTtcblxuICAgICAgICAkcmVxdWVzdC50aGVuKHN1Y2Nlc3MpO1xuICAgICAgICAkcmVxdWVzdC5mYWlsKGZhaWx1cmUpO1xuXG4gICAgICAgIHJldHVybiAkcmVxdWVzdDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucywgdHJ1ZSk7XG4gIH07XG5cbiAgQWpheEFkYXB0ZXIucHJvdG90eXBlLnByb2Nlc3NSZXN1bHRzID0gZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICBBamF4QWRhcHRlci5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHZhciBtYXRjaGVzID0gW107XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuX3JlcXVlc3QgIT0gbnVsbCkge1xuICAgICAgLy8gSlNPTlAgcmVxdWVzdHMgY2Fubm90IGFsd2F5cyBiZSBhYm9ydGVkXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX3JlcXVlc3QuYWJvcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcbiAgICAgIHR5cGU6ICdHRVQnXG4gICAgfSwgdGhpcy5hamF4T3B0aW9ucyk7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMudXJsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25zLnVybCA9IG9wdGlvbnMudXJsLmNhbGwodGhpcy4kZWxlbWVudCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhLmNhbGwodGhpcy4kZWxlbWVudCwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0ICgpIHtcbiAgICAgIHZhciAkcmVxdWVzdCA9IG9wdGlvbnMudHJhbnNwb3J0KG9wdGlvbnMsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gc2VsZi5wcm9jZXNzUmVzdWx0cyhkYXRhLCBwYXJhbXMpO1xuXG4gICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZ2V0KCdkZWJ1ZycpICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAvLyBDaGVjayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcmVzcG9uc2UgaW5jbHVkZWQgYSBgcmVzdWx0c2Aga2V5LlxuICAgICAgICAgIGlmICghcmVzdWx0cyB8fCAhcmVzdWx0cy5yZXN1bHRzIHx8ICFBcnJheS5pc0FycmF5KHJlc3VsdHMucmVzdWx0cykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICdTZWxlY3QyOiBUaGUgQUpBWCByZXN1bHRzIGRpZCBub3QgcmV0dXJuIGFuIGFycmF5IGluIHRoZSAnICtcbiAgICAgICAgICAgICAgJ2ByZXN1bHRzYCBrZXkgb2YgdGhlIHJlc3BvbnNlLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2socmVzdWx0cyk7XG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIEF0dGVtcHQgdG8gZGV0ZWN0IGlmIGEgcmVxdWVzdCB3YXMgYWJvcnRlZFxuICAgICAgICAvLyBPbmx5IHdvcmtzIGlmIHRoZSB0cmFuc3BvcnQgZXhwb3NlcyBhIHN0YXR1cyBwcm9wZXJ0eVxuICAgICAgICBpZiAoJ3N0YXR1cycgaW4gJHJlcXVlc3QgJiZcbiAgICAgICAgICAgICgkcmVxdWVzdC5zdGF0dXMgPT09IDAgfHwgJHJlcXVlc3Quc3RhdHVzID09PSAnMCcpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi50cmlnZ2VyKCdyZXN1bHRzOm1lc3NhZ2UnLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ2Vycm9yTG9hZGluZydcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgc2VsZi5fcmVxdWVzdCA9ICRyZXF1ZXN0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFqYXhPcHRpb25zLmRlbGF5ICYmIHBhcmFtcy50ZXJtICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLl9xdWVyeVRpbWVvdXQpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9xdWVyeVRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9xdWVyeVRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChyZXF1ZXN0LCB0aGlzLmFqYXhPcHRpb25zLmRlbGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQWpheEFkYXB0ZXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2RhdGEvdGFncycsW1xuICAnanF1ZXJ5J1xuXSwgZnVuY3Rpb24gKCQpIHtcbiAgZnVuY3Rpb24gVGFncyAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciB0YWdzID0gb3B0aW9ucy5nZXQoJ3RhZ3MnKTtcblxuICAgIHZhciBjcmVhdGVUYWcgPSBvcHRpb25zLmdldCgnY3JlYXRlVGFnJyk7XG5cbiAgICBpZiAoY3JlYXRlVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY3JlYXRlVGFnID0gY3JlYXRlVGFnO1xuICAgIH1cblxuICAgIHZhciBpbnNlcnRUYWcgPSBvcHRpb25zLmdldCgnaW5zZXJ0VGFnJyk7XG5cbiAgICBpZiAoaW5zZXJ0VGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5pbnNlcnRUYWcgPSBpbnNlcnRUYWc7XG4gICAgfVxuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgJGVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFncykpIHtcbiAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGFncy5sZW5ndGg7IHQrKykge1xuICAgICAgICB2YXIgdGFnID0gdGFnc1t0XTtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9ub3JtYWxpemVJdGVtKHRhZyk7XG5cbiAgICAgICAgdmFyICRvcHRpb24gPSB0aGlzLm9wdGlvbihpdGVtKTtcblxuICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZCgkb3B0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBUYWdzLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLl9yZW1vdmVPbGRUYWdzKCk7XG5cbiAgICBpZiAocGFyYW1zLnRlcm0gPT0gbnVsbCB8fCBwYXJhbXMucGFnZSAhPSBudWxsKSB7XG4gICAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3cmFwcGVyIChvYmosIGNoaWxkKSB7XG4gICAgICB2YXIgZGF0YSA9IG9iai5yZXN1bHRzO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG9wdGlvbiA9IGRhdGFbaV07XG5cbiAgICAgICAgdmFyIGNoZWNrQ2hpbGRyZW4gPSAoXG4gICAgICAgICAgb3B0aW9uLmNoaWxkcmVuICE9IG51bGwgJiZcbiAgICAgICAgICAhd3JhcHBlcih7XG4gICAgICAgICAgICByZXN1bHRzOiBvcHRpb24uY2hpbGRyZW5cbiAgICAgICAgICB9LCB0cnVlKVxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBvcHRpb25UZXh0ID0gKG9wdGlvbi50ZXh0IHx8ICcnKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB2YXIgcGFyYW1zVGVybSA9IChwYXJhbXMudGVybSB8fCAnJykudG9VcHBlckNhc2UoKTtcblxuICAgICAgICB2YXIgY2hlY2tUZXh0ID0gb3B0aW9uVGV4dCA9PT0gcGFyYW1zVGVybTtcblxuICAgICAgICBpZiAoY2hlY2tUZXh0IHx8IGNoZWNrQ2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvYmouZGF0YSA9IGRhdGE7XG4gICAgICAgICAgY2FsbGJhY2sob2JqKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciB0YWcgPSBzZWxmLmNyZWF0ZVRhZyhwYXJhbXMpO1xuXG4gICAgICBpZiAodGFnICE9IG51bGwpIHtcbiAgICAgICAgdmFyICRvcHRpb24gPSBzZWxmLm9wdGlvbih0YWcpO1xuICAgICAgICAkb3B0aW9uLmF0dHIoJ2RhdGEtc2VsZWN0Mi10YWcnLCAndHJ1ZScpO1xuXG4gICAgICAgIHNlbGYuYWRkT3B0aW9ucyhbJG9wdGlvbl0pO1xuXG4gICAgICAgIHNlbGYuaW5zZXJ0VGFnKGRhdGEsIHRhZyk7XG4gICAgICB9XG5cbiAgICAgIG9iai5yZXN1bHRzID0gZGF0YTtcblxuICAgICAgY2FsbGJhY2sob2JqKTtcbiAgICB9XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBwYXJhbXMsIHdyYXBwZXIpO1xuICB9O1xuXG4gIFRhZ3MucHJvdG90eXBlLmNyZWF0ZVRhZyA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcykge1xuICAgIGlmIChwYXJhbXMudGVybSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgdGVybSA9IHBhcmFtcy50ZXJtLnRyaW0oKTtcblxuICAgIGlmICh0ZXJtID09PSAnJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0ZXJtLFxuICAgICAgdGV4dDogdGVybVxuICAgIH07XG4gIH07XG5cbiAgVGFncy5wcm90b3R5cGUuaW5zZXJ0VGFnID0gZnVuY3Rpb24gKF8sIGRhdGEsIHRhZykge1xuICAgIGRhdGEudW5zaGlmdCh0YWcpO1xuICB9O1xuXG4gIFRhZ3MucHJvdG90eXBlLl9yZW1vdmVPbGRUYWdzID0gZnVuY3Rpb24gKF8pIHtcbiAgICB2YXIgJG9wdGlvbnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ29wdGlvbltkYXRhLXNlbGVjdDItdGFnXScpO1xuXG4gICAgJG9wdGlvbnMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFRhZ3M7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2RhdGEvdG9rZW5pemVyJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICBmdW5jdGlvbiBUb2tlbml6ZXIgKGRlY29yYXRlZCwgJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB2YXIgdG9rZW5pemVyID0gb3B0aW9ucy5nZXQoJ3Rva2VuaXplcicpO1xuXG4gICAgaWYgKHRva2VuaXplciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnRva2VuaXplciA9IHRva2VuaXplcjtcbiAgICB9XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCAkZWxlbWVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBUb2tlbml6ZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgdGhpcy4kc2VhcmNoID0gIGNvbnRhaW5lci5kcm9wZG93bi4kc2VhcmNoIHx8IGNvbnRhaW5lci5zZWxlY3Rpb24uJHNlYXJjaCB8fFxuICAgICAgJGNvbnRhaW5lci5maW5kKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJyk7XG4gIH07XG5cbiAgVG9rZW5pemVyLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVBbmRTZWxlY3QgKGRhdGEpIHtcbiAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgZGF0YSBvYmplY3Qgc28gd2UgY2FuIHVzZSBpdCBmb3IgY2hlY2tzXG4gICAgICB2YXIgaXRlbSA9IHNlbGYuX25vcm1hbGl6ZUl0ZW0oZGF0YSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSBkYXRhIG9iamVjdCBhbHJlYWR5IGV4aXN0cyBhcyBhIHRhZ1xuICAgICAgLy8gU2VsZWN0IGl0IGlmIGl0IGRvZXNuJ3RcbiAgICAgIHZhciAkZXhpc3RpbmdPcHRpb25zID0gc2VsZi4kZWxlbWVudC5maW5kKCdvcHRpb24nKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJCh0aGlzKS52YWwoKSA9PT0gaXRlbS5pZDtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBJZiBhbiBleGlzdGluZyBvcHRpb24gd2Fzbid0IGZvdW5kIGZvciBpdCwgY3JlYXRlIHRoZSBvcHRpb25cbiAgICAgIGlmICghJGV4aXN0aW5nT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgdmFyICRvcHRpb24gPSBzZWxmLm9wdGlvbihpdGVtKTtcbiAgICAgICAgJG9wdGlvbi5hdHRyKCdkYXRhLXNlbGVjdDItdGFnJywgdHJ1ZSk7XG5cbiAgICAgICAgc2VsZi5fcmVtb3ZlT2xkVGFncygpO1xuICAgICAgICBzZWxmLmFkZE9wdGlvbnMoWyRvcHRpb25dKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VsZWN0IHRoZSBpdGVtLCBub3cgdGhhdCB3ZSBrbm93IHRoZXJlIGlzIGFuIG9wdGlvbiBmb3IgaXRcbiAgICAgIHNlbGVjdChpdGVtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3QgKGRhdGEpIHtcbiAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0Jywge1xuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXJhbXMudGVybSA9IHBhcmFtcy50ZXJtIHx8ICcnO1xuXG4gICAgdmFyIHRva2VuRGF0YSA9IHRoaXMudG9rZW5pemVyKHBhcmFtcywgdGhpcy5vcHRpb25zLCBjcmVhdGVBbmRTZWxlY3QpO1xuXG4gICAgaWYgKHRva2VuRGF0YS50ZXJtICE9PSBwYXJhbXMudGVybSkge1xuICAgICAgLy8gUmVwbGFjZSB0aGUgc2VhcmNoIHRlcm0gaWYgd2UgaGF2ZSB0aGUgc2VhcmNoIGJveFxuICAgICAgaWYgKHRoaXMuJHNlYXJjaC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy4kc2VhcmNoLnZhbCh0b2tlbkRhdGEudGVybSk7XG4gICAgICAgIHRoaXMuJHNlYXJjaC50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgfVxuXG4gICAgICBwYXJhbXMudGVybSA9IHRva2VuRGF0YS50ZXJtO1xuICAgIH1cblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsIHBhcmFtcywgY2FsbGJhY2spO1xuICB9O1xuXG4gIFRva2VuaXplci5wcm90b3R5cGUudG9rZW5pemVyID0gZnVuY3Rpb24gKF8sIHBhcmFtcywgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VwYXJhdG9ycyA9IG9wdGlvbnMuZ2V0KCd0b2tlblNlcGFyYXRvcnMnKSB8fCBbXTtcbiAgICB2YXIgdGVybSA9IHBhcmFtcy50ZXJtO1xuICAgIHZhciBpID0gMDtcblxuICAgIHZhciBjcmVhdGVUYWcgPSB0aGlzLmNyZWF0ZVRhZyB8fCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogcGFyYW1zLnRlcm0sXG4gICAgICAgIHRleHQ6IHBhcmFtcy50ZXJtXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB3aGlsZSAoaSA8IHRlcm0ubGVuZ3RoKSB7XG4gICAgICB2YXIgdGVybUNoYXIgPSB0ZXJtW2ldO1xuXG4gICAgICBpZiAoc2VwYXJhdG9ycy5pbmRleE9mKHRlcm1DaGFyKSA9PT0gLTEpIHtcbiAgICAgICAgaSsrO1xuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGFydCA9IHRlcm0uc3Vic3RyKDAsIGkpO1xuICAgICAgdmFyIHBhcnRQYXJhbXMgPSAkLmV4dGVuZCh7fSwgcGFyYW1zLCB7XG4gICAgICAgIHRlcm06IHBhcnRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZGF0YSA9IGNyZWF0ZVRhZyhwYXJ0UGFyYW1zKTtcblxuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICBpKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayhkYXRhKTtcblxuICAgICAgLy8gUmVzZXQgdGhlIHRlcm0gdG8gbm90IGluY2x1ZGUgdGhlIHRva2VuaXplZCBwb3J0aW9uXG4gICAgICB0ZXJtID0gdGVybS5zdWJzdHIoaSArIDEpIHx8ICcnO1xuICAgICAgaSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRlcm06IHRlcm1cbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBUb2tlbml6ZXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2RhdGEvbWluaW11bUlucHV0TGVuZ3RoJyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWluaW11bUlucHV0TGVuZ3RoIChkZWNvcmF0ZWQsICRlLCBvcHRpb25zKSB7XG4gICAgdGhpcy5taW5pbXVtSW5wdXRMZW5ndGggPSBvcHRpb25zLmdldCgnbWluaW11bUlucHV0TGVuZ3RoJyk7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCAkZSwgb3B0aW9ucyk7XG4gIH1cblxuICBNaW5pbXVtSW5wdXRMZW5ndGgucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgcGFyYW1zLCBjYWxsYmFjaykge1xuICAgIHBhcmFtcy50ZXJtID0gcGFyYW1zLnRlcm0gfHwgJyc7XG5cbiAgICBpZiAocGFyYW1zLnRlcm0ubGVuZ3RoIDwgdGhpcy5taW5pbXVtSW5wdXRMZW5ndGgpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigncmVzdWx0czptZXNzYWdlJywge1xuICAgICAgICBtZXNzYWdlOiAnaW5wdXRUb29TaG9ydCcsXG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICBtaW5pbXVtOiB0aGlzLm1pbmltdW1JbnB1dExlbmd0aCxcbiAgICAgICAgICBpbnB1dDogcGFyYW1zLnRlcm0sXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgfTtcblxuICByZXR1cm4gTWluaW11bUlucHV0TGVuZ3RoO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kYXRhL21heGltdW1JbnB1dExlbmd0aCcsW1xuXG5dLCBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1heGltdW1JbnB1dExlbmd0aCAoZGVjb3JhdGVkLCAkZSwgb3B0aW9ucykge1xuICAgIHRoaXMubWF4aW11bUlucHV0TGVuZ3RoID0gb3B0aW9ucy5nZXQoJ21heGltdW1JbnB1dExlbmd0aCcpO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgJGUsIG9wdGlvbnMpO1xuICB9XG5cbiAgTWF4aW11bUlucHV0TGVuZ3RoLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICBwYXJhbXMudGVybSA9IHBhcmFtcy50ZXJtIHx8ICcnO1xuXG4gICAgaWYgKHRoaXMubWF4aW11bUlucHV0TGVuZ3RoID4gMCAmJlxuICAgICAgICBwYXJhbXMudGVybS5sZW5ndGggPiB0aGlzLm1heGltdW1JbnB1dExlbmd0aCkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdyZXN1bHRzOm1lc3NhZ2UnLCB7XG4gICAgICAgIG1lc3NhZ2U6ICdpbnB1dFRvb0xvbmcnLFxuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgbWF4aW11bTogdGhpcy5tYXhpbXVtSW5wdXRMZW5ndGgsXG4gICAgICAgICAgaW5wdXQ6IHBhcmFtcy50ZXJtLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgcGFyYW1zLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgcmV0dXJuIE1heGltdW1JbnB1dExlbmd0aDtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZGF0YS9tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoJyxbXG5cbl0sIGZ1bmN0aW9uICgpe1xuICBmdW5jdGlvbiBNYXhpbXVtU2VsZWN0aW9uTGVuZ3RoIChkZWNvcmF0ZWQsICRlLCBvcHRpb25zKSB7XG4gICAgdGhpcy5tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoID0gb3B0aW9ucy5nZXQoJ21heGltdW1TZWxlY3Rpb25MZW5ndGgnKTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlLCBvcHRpb25zKTtcbiAgfVxuXG4gIE1heGltdW1TZWxlY3Rpb25MZW5ndGgucHJvdG90eXBlLmJpbmQgPVxuICAgIGZ1bmN0aW9uIChkZWNvcmF0ZWQsIGNvbnRhaW5lciwgJGNvbnRhaW5lcikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgICBjb250YWluZXIub24oJ3NlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fY2hlY2tJZk1heGltdW1TZWxlY3RlZCgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgTWF4aW11bVNlbGVjdGlvbkxlbmd0aC5wcm90b3R5cGUucXVlcnkgPVxuICAgIGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5fY2hlY2tJZk1heGltdW1TZWxlY3RlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlY29yYXRlZC5jYWxsKHNlbGYsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gIH07XG5cbiAgTWF4aW11bVNlbGVjdGlvbkxlbmd0aC5wcm90b3R5cGUuX2NoZWNrSWZNYXhpbXVtU2VsZWN0ZWQgPVxuICAgIGZ1bmN0aW9uIChfLCBzdWNjZXNzQ2FsbGJhY2spIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5jdXJyZW50KGZ1bmN0aW9uIChjdXJyZW50RGF0YSkge1xuICAgICAgICB2YXIgY291bnQgPSBjdXJyZW50RGF0YSAhPSBudWxsID8gY3VycmVudERhdGEubGVuZ3RoIDogMDtcbiAgICAgICAgaWYgKHNlbGYubWF4aW11bVNlbGVjdGlvbkxlbmd0aCA+IDAgJiZcbiAgICAgICAgICBjb3VudCA+PSBzZWxmLm1heGltdW1TZWxlY3Rpb25MZW5ndGgpIHtcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3Jlc3VsdHM6bWVzc2FnZScsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdtYXhpbXVtU2VsZWN0ZWQnLFxuICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICBtYXhpbXVtOiBzZWxmLm1heGltdW1TZWxlY3Rpb25MZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3VjY2Vzc0NhbGxiYWNrKSB7XG4gICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBNYXhpbXVtU2VsZWN0aW9uTGVuZ3RoO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bicsW1xuICAnanF1ZXJ5JyxcbiAgJy4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgVXRpbHMpIHtcbiAgZnVuY3Rpb24gRHJvcGRvd24gKCRlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBEcm9wZG93bi5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIFV0aWxzLkV4dGVuZChEcm9wZG93biwgVXRpbHMuT2JzZXJ2YWJsZSk7XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGRyb3Bkb3duID0gJChcbiAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdDItZHJvcGRvd25cIj4nICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1yZXN1bHRzXCI+PC9zcGFuPicgK1xuICAgICAgJzwvc3Bhbj4nXG4gICAgKTtcblxuICAgICRkcm9wZG93bi5hdHRyKCdkaXInLCB0aGlzLm9wdGlvbnMuZ2V0KCdkaXInKSk7XG5cbiAgICB0aGlzLiRkcm9wZG93biA9ICRkcm9wZG93bjtcblxuICAgIHJldHVybiAkZHJvcGRvd247XG4gIH07XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gU2hvdWxkIGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgfTtcblxuICBEcm9wZG93bi5wcm90b3R5cGUucG9zaXRpb24gPSBmdW5jdGlvbiAoJGRyb3Bkb3duLCAkY29udGFpbmVyKSB7XG4gICAgLy8gU2hvdWxkIGJlIGltcGxlbWVudGVkIGluIHN1YmNsYXNzZXNcbiAgfTtcblxuICBEcm9wZG93bi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZW1vdmUgdGhlIGRyb3Bkb3duIGZyb20gdGhlIERPTVxuICAgIHRoaXMuJGRyb3Bkb3duLnJlbW92ZSgpO1xuICB9O1xuXG4gIHJldHVybiBEcm9wZG93bjtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZHJvcGRvd24vc2VhcmNoJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICBmdW5jdGlvbiBTZWFyY2ggKCkgeyB9XG5cbiAgU2VhcmNoLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdmFyICRyZW5kZXJlZCA9IGRlY29yYXRlZC5jYWxsKHRoaXMpO1xuICAgIHZhciBzZWFyY2hMYWJlbCA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldCgnc2VhcmNoJyk7XG5cbiAgICB2YXIgJHNlYXJjaCA9ICQoXG4gICAgICAnPHNwYW4gY2xhc3M9XCJzZWxlY3QyLXNlYXJjaCBzZWxlY3QyLXNlYXJjaC0tZHJvcGRvd25cIj4nICtcbiAgICAgICAgJzxpbnB1dCBjbGFzcz1cInNlbGVjdDItc2VhcmNoX19maWVsZFwiIHR5cGU9XCJzZWFyY2hcIiB0YWJpbmRleD1cIi0xXCInICtcbiAgICAgICAgJyBhdXRvY29ycmVjdD1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwibm9uZVwiJyArXG4gICAgICAgICcgc3BlbGxjaGVjaz1cImZhbHNlXCIgcm9sZT1cInNlYXJjaGJveFwiIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiIC8+JyArXG4gICAgICAnPC9zcGFuPidcbiAgICApO1xuXG4gICAgdGhpcy4kc2VhcmNoQ29udGFpbmVyID0gJHNlYXJjaDtcbiAgICB0aGlzLiRzZWFyY2ggPSAkc2VhcmNoLmZpbmQoJ2lucHV0Jyk7XG5cbiAgICB0aGlzLiRzZWFyY2gucHJvcCgnYXV0b2NvbXBsZXRlJywgdGhpcy5vcHRpb25zLmdldCgnYXV0b2NvbXBsZXRlJykpO1xuICAgIHRoaXMuJHNlYXJjaC5hdHRyKCdhcmlhLWxhYmVsJywgc2VhcmNoTGFiZWwoKSk7XG5cbiAgICAkcmVuZGVyZWQucHJlcGVuZCgkc2VhcmNoKTtcblxuICAgIHJldHVybiAkcmVuZGVyZWQ7XG4gIH07XG5cbiAgU2VhcmNoLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHJlc3VsdHNJZCA9IGNvbnRhaW5lci5pZCArICctcmVzdWx0cyc7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdrZXlwcmVzcycsIGV2dCk7XG5cbiAgICAgIHNlbGYuX2tleVVwUHJldmVudGVkID0gZXZ0LmlzRGVmYXVsdFByZXZlbnRlZCgpO1xuICAgIH0pO1xuXG4gICAgLy8gV29ya2Fyb3VuZCBmb3IgYnJvd3NlcnMgd2hpY2ggZG8gbm90IHN1cHBvcnQgdGhlIGBpbnB1dGAgZXZlbnRcbiAgICAvLyBUaGlzIHdpbGwgcHJldmVudCBkb3VibGUtdHJpZ2dlcmluZyBvZiBldmVudHMgZm9yIGJyb3dzZXJzIHdoaWNoIHN1cHBvcnRcbiAgICAvLyBib3RoIHRoZSBga2V5dXBgIGFuZCBgaW5wdXRgIGV2ZW50cy5cbiAgICB0aGlzLiRzZWFyY2gub24oJ2lucHV0JywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgLy8gVW5iaW5kIHRoZSBkdXBsaWNhdGVkIGBrZXl1cGAgZXZlbnRcbiAgICAgICQodGhpcykub2ZmKCdrZXl1cCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoLm9uKCdrZXl1cCBpbnB1dCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIHNlbGYuaGFuZGxlU2VhcmNoKGV2dCk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRzZWFyY2guYXR0cigndGFiaW5kZXgnLCAwKTtcbiAgICAgIHNlbGYuJHNlYXJjaC5hdHRyKCdhcmlhLWNvbnRyb2xzJywgcmVzdWx0c0lkKTtcblxuICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICB9LCAwKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRzZWFyY2guYXR0cigndGFiaW5kZXgnLCAtMSk7XG4gICAgICBzZWxmLiRzZWFyY2gucmVtb3ZlQXR0cignYXJpYS1jb250cm9scycpO1xuICAgICAgc2VsZi4kc2VhcmNoLnJlbW92ZUF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuXG4gICAgICBzZWxmLiRzZWFyY2gudmFsKCcnKTtcbiAgICAgIHNlbGYuJHNlYXJjaC50cmlnZ2VyKCdibHVyJyk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2ZvY3VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFjb250YWluZXIuaXNPcGVuKCkpIHtcbiAgICAgICAgc2VsZi4kc2VhcmNoLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6YWxsJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcy5xdWVyeS50ZXJtID09IG51bGwgfHwgcGFyYW1zLnF1ZXJ5LnRlcm0gPT09ICcnKSB7XG4gICAgICAgIHZhciBzaG93U2VhcmNoID0gc2VsZi5zaG93U2VhcmNoKHBhcmFtcyk7XG5cbiAgICAgICAgaWYgKHNob3dTZWFyY2gpIHtcbiAgICAgICAgICBzZWxmLiRzZWFyY2hDb250YWluZXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1zZWFyY2gtLWhpZGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLiRzZWFyY2hDb250YWluZXJbMF0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0Mi1zZWFyY2gtLWhpZGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdyZXN1bHRzOmZvY3VzJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcy5kYXRhLl9yZXN1bHRJZCkge1xuICAgICAgICBzZWxmLiRzZWFyY2guYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgcGFyYW1zLmRhdGEuX3Jlc3VsdElkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuJHNlYXJjaC5yZW1vdmVBdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBTZWFyY2gucHJvdG90eXBlLmhhbmRsZVNlYXJjaCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICBpZiAoIXRoaXMuX2tleVVwUHJldmVudGVkKSB7XG4gICAgICB2YXIgaW5wdXQgPSB0aGlzLiRzZWFyY2gudmFsKCk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcigncXVlcnknLCB7XG4gICAgICAgIHRlcm06IGlucHV0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9rZXlVcFByZXZlbnRlZCA9IGZhbHNlO1xuICB9O1xuXG4gIFNlYXJjaC5wcm90b3R5cGUuc2hvd1NlYXJjaCA9IGZ1bmN0aW9uIChfLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gU2VhcmNoO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bi9oaWRlUGxhY2Vob2xkZXInLFtcblxuXSwgZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBIaWRlUGxhY2Vob2xkZXIgKGRlY29yYXRlZCwgJGVsZW1lbnQsIG9wdGlvbnMsIGRhdGFBZGFwdGVyKSB7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMubm9ybWFsaXplUGxhY2Vob2xkZXIob3B0aW9ucy5nZXQoJ3BsYWNlaG9sZGVyJykpO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgJGVsZW1lbnQsIG9wdGlvbnMsIGRhdGFBZGFwdGVyKTtcbiAgfVxuXG4gIEhpZGVQbGFjZWhvbGRlci5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgZGF0YSkge1xuICAgIGRhdGEucmVzdWx0cyA9IHRoaXMucmVtb3ZlUGxhY2Vob2xkZXIoZGF0YS5yZXN1bHRzKTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsIGRhdGEpO1xuICB9O1xuXG4gIEhpZGVQbGFjZWhvbGRlci5wcm90b3R5cGUubm9ybWFsaXplUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiAoXywgcGxhY2Vob2xkZXIpIHtcbiAgICBpZiAodHlwZW9mIHBsYWNlaG9sZGVyID09PSAnc3RyaW5nJykge1xuICAgICAgcGxhY2Vob2xkZXIgPSB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgdGV4dDogcGxhY2Vob2xkZXJcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICB9O1xuXG4gIEhpZGVQbGFjZWhvbGRlci5wcm90b3R5cGUucmVtb3ZlUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiAoXywgZGF0YSkge1xuICAgIHZhciBtb2RpZmllZERhdGEgPSBkYXRhLnNsaWNlKDApO1xuXG4gICAgZm9yICh2YXIgZCA9IGRhdGEubGVuZ3RoIC0gMTsgZCA+PSAwOyBkLS0pIHtcbiAgICAgIHZhciBpdGVtID0gZGF0YVtkXTtcblxuICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXIuaWQgPT09IGl0ZW0uaWQpIHtcbiAgICAgICAgbW9kaWZpZWREYXRhLnNwbGljZShkLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbW9kaWZpZWREYXRhO1xuICB9O1xuXG4gIHJldHVybiBIaWRlUGxhY2Vob2xkZXI7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2Ryb3Bkb3duL2luZmluaXRlU2Nyb2xsJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICBmdW5jdGlvbiBJbmZpbml0ZVNjcm9sbCAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucywgZGF0YUFkYXB0ZXIpIHtcbiAgICB0aGlzLmxhc3RQYXJhbXMgPSB7fTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zLCBkYXRhQWRhcHRlcik7XG5cbiAgICB0aGlzLiRsb2FkaW5nTW9yZSA9IHRoaXMuY3JlYXRlTG9hZGluZ01vcmUoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBkYXRhKSB7XG4gICAgdGhpcy4kbG9hZGluZ01vcmUucmVtb3ZlKCk7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBkYXRhKTtcblxuICAgIGlmICh0aGlzLnNob3dMb2FkaW5nTW9yZShkYXRhKSkge1xuICAgICAgdGhpcy4kcmVzdWx0cy5hcHBlbmQodGhpcy4kbG9hZGluZ01vcmUpO1xuICAgICAgdGhpcy5sb2FkTW9yZUlmTmVlZGVkKCk7XG4gICAgfVxuICB9O1xuXG4gIEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgY29udGFpbmVyLCAkY29udGFpbmVyKTtcblxuICAgIGNvbnRhaW5lci5vbigncXVlcnknLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLmxhc3RQYXJhbXMgPSBwYXJhbXM7XG4gICAgICBzZWxmLmxvYWRpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdxdWVyeTphcHBlbmQnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLmxhc3RQYXJhbXMgPSBwYXJhbXM7XG4gICAgICBzZWxmLmxvYWRpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kcmVzdWx0cy5vbignc2Nyb2xsJywgdGhpcy5sb2FkTW9yZUlmTmVlZGVkLmJpbmQodGhpcykpO1xuICB9O1xuXG4gIEluZmluaXRlU2Nyb2xsLnByb3RvdHlwZS5sb2FkTW9yZUlmTmVlZGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpc0xvYWRNb3JlVmlzaWJsZSA9ICQuY29udGFpbnMoXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICB0aGlzLiRsb2FkaW5nTW9yZVswXVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5sb2FkaW5nIHx8ICFpc0xvYWRNb3JlVmlzaWJsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50T2Zmc2V0ID0gdGhpcy4kcmVzdWx0cy5vZmZzZXQoKS50b3AgK1xuICAgICAgdGhpcy4kcmVzdWx0cy5vdXRlckhlaWdodChmYWxzZSk7XG4gICAgdmFyIGxvYWRpbmdNb3JlT2Zmc2V0ID0gdGhpcy4kbG9hZGluZ01vcmUub2Zmc2V0KCkudG9wICtcbiAgICAgIHRoaXMuJGxvYWRpbmdNb3JlLm91dGVySGVpZ2h0KGZhbHNlKTtcblxuICAgIGlmIChjdXJyZW50T2Zmc2V0ICsgNTAgPj0gbG9hZGluZ01vcmVPZmZzZXQpIHtcbiAgICAgIHRoaXMubG9hZE1vcmUoKTtcbiAgICB9XG4gIH07XG5cbiAgSW5maW5pdGVTY3JvbGwucHJvdG90eXBlLmxvYWRNb3JlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICB2YXIgcGFyYW1zID0gJC5leHRlbmQoe30sIHtwYWdlOiAxfSwgdGhpcy5sYXN0UGFyYW1zKTtcblxuICAgIHBhcmFtcy5wYWdlKys7XG5cbiAgICB0aGlzLnRyaWdnZXIoJ3F1ZXJ5OmFwcGVuZCcsIHBhcmFtcyk7XG4gIH07XG5cbiAgSW5maW5pdGVTY3JvbGwucHJvdG90eXBlLnNob3dMb2FkaW5nTW9yZSA9IGZ1bmN0aW9uIChfLCBkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEucGFnaW5hdGlvbiAmJiBkYXRhLnBhZ2luYXRpb24ubW9yZTtcbiAgfTtcblxuICBJbmZpbml0ZVNjcm9sbC5wcm90b3R5cGUuY3JlYXRlTG9hZGluZ01vcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRvcHRpb24gPSAkKFxuICAgICAgJzxsaSAnICtcbiAgICAgICdjbGFzcz1cInNlbGVjdDItcmVzdWx0c19fb3B0aW9uIHNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1sb2FkLW1vcmVcIicgK1xuICAgICAgJ3JvbGU9XCJvcHRpb25cIiBhcmlhLWRpc2FibGVkPVwidHJ1ZVwiPjwvbGk+J1xuICAgICk7XG5cbiAgICB2YXIgbWVzc2FnZSA9IHRoaXMub3B0aW9ucy5nZXQoJ3RyYW5zbGF0aW9ucycpLmdldCgnbG9hZGluZ01vcmUnKTtcblxuICAgICRvcHRpb24uaHRtbChtZXNzYWdlKHRoaXMubGFzdFBhcmFtcykpO1xuXG4gICAgcmV0dXJuICRvcHRpb247XG4gIH07XG5cbiAgcmV0dXJuIEluZmluaXRlU2Nyb2xsO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bi9hdHRhY2hCb2R5JyxbXG4gICdqcXVlcnknLFxuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoJCwgVXRpbHMpIHtcbiAgZnVuY3Rpb24gQXR0YWNoQm9keSAoZGVjb3JhdGVkLCAkZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGRyb3Bkb3duUGFyZW50ID0gJChvcHRpb25zLmdldCgnZHJvcGRvd25QYXJlbnQnKSB8fCBkb2N1bWVudC5ib2R5KTtcblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zKTtcbiAgfVxuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgY29udGFpbmVyLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5fc2hvd0Ryb3Bkb3duKCk7XG4gICAgICBzZWxmLl9hdHRhY2hQb3NpdGlvbmluZ0hhbmRsZXIoY29udGFpbmVyKTtcblxuICAgICAgLy8gTXVzdCBiaW5kIGFmdGVyIHRoZSByZXN1bHRzIGhhbmRsZXJzIHRvIGVuc3VyZSBjb3JyZWN0IHNpemluZ1xuICAgICAgc2VsZi5fYmluZENvbnRhaW5lclJlc3VsdEhhbmRsZXJzKGNvbnRhaW5lcik7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5faGlkZURyb3Bkb3duKCk7XG4gICAgICBzZWxmLl9kZXRhY2hQb3NpdGlvbmluZ0hhbmRsZXIoY29udGFpbmVyKTtcbiAgICB9KTtcblxuICAgIHRoaXMuJGRyb3Bkb3duQ29udGFpbmVyLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgQXR0YWNoQm9keS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQpIHtcbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuJGRyb3Bkb3duQ29udGFpbmVyLnJlbW92ZSgpO1xuICB9O1xuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLnBvc2l0aW9uID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgJGRyb3Bkb3duLCAkY29udGFpbmVyKSB7XG4gICAgLy8gQ2xvbmUgYWxsIG9mIHRoZSBjb250YWluZXIgY2xhc3Nlc1xuICAgICRkcm9wZG93bi5hdHRyKCdjbGFzcycsICRjb250YWluZXIuYXR0cignY2xhc3MnKSk7XG5cbiAgICAkZHJvcGRvd25bMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0MicpO1xuICAgICRkcm9wZG93blswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpO1xuXG4gICAgJGRyb3Bkb3duLmNzcyh7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHRvcDogLTk5OTk5OVxuICAgIH0pO1xuXG4gICAgdGhpcy4kY29udGFpbmVyID0gJGNvbnRhaW5lcjtcbiAgfTtcblxuICBBdHRhY2hCb2R5LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdmFyICRjb250YWluZXIgPSAkKCc8c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICB2YXIgJGRyb3Bkb3duID0gZGVjb3JhdGVkLmNhbGwodGhpcyk7XG4gICAgJGNvbnRhaW5lci5hcHBlbmQoJGRyb3Bkb3duKTtcblxuICAgIHRoaXMuJGRyb3Bkb3duQ29udGFpbmVyID0gJGNvbnRhaW5lcjtcblxuICAgIHJldHVybiAkY29udGFpbmVyO1xuICB9O1xuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLl9oaWRlRHJvcGRvd24gPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdGhpcy4kZHJvcGRvd25Db250YWluZXIuZGV0YWNoKCk7XG4gIH07XG5cbiAgQXR0YWNoQm9keS5wcm90b3R5cGUuX2JpbmRDb250YWluZXJSZXN1bHRIYW5kbGVycyA9XG4gICAgICBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIpIHtcblxuICAgIC8vIFRoZXNlIHNob3VsZCBvbmx5IGJlIGJvdW5kIG9uY2VcbiAgICBpZiAodGhpcy5fY29udGFpbmVyUmVzdWx0c0hhbmRsZXJzQm91bmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBjb250YWluZXIub24oJ3Jlc3VsdHM6YWxsJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5fcG9zaXRpb25Ecm9wZG93bigpO1xuICAgICAgc2VsZi5fcmVzaXplRHJvcGRvd24oKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5vbigncmVzdWx0czphcHBlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9wb3NpdGlvbkRyb3Bkb3duKCk7XG4gICAgICBzZWxmLl9yZXNpemVEcm9wZG93bigpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdyZXN1bHRzOm1lc3NhZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9wb3NpdGlvbkRyb3Bkb3duKCk7XG4gICAgICBzZWxmLl9yZXNpemVEcm9wZG93bigpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9wb3NpdGlvbkRyb3Bkb3duKCk7XG4gICAgICBzZWxmLl9yZXNpemVEcm9wZG93bigpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLm9uKCd1bnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuX3Bvc2l0aW9uRHJvcGRvd24oKTtcbiAgICAgIHNlbGYuX3Jlc2l6ZURyb3Bkb3duKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jb250YWluZXJSZXN1bHRzSGFuZGxlcnNCb3VuZCA9IHRydWU7XG4gIH07XG5cbiAgQXR0YWNoQm9keS5wcm90b3R5cGUuX2F0dGFjaFBvc2l0aW9uaW5nSGFuZGxlciA9XG4gICAgICBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgc2Nyb2xsRXZlbnQgPSAnc2Nyb2xsLnNlbGVjdDIuJyArIGNvbnRhaW5lci5pZDtcbiAgICB2YXIgcmVzaXplRXZlbnQgPSAncmVzaXplLnNlbGVjdDIuJyArIGNvbnRhaW5lci5pZDtcbiAgICB2YXIgb3JpZW50YXRpb25FdmVudCA9ICdvcmllbnRhdGlvbmNoYW5nZS5zZWxlY3QyLicgKyBjb250YWluZXIuaWQ7XG5cbiAgICB2YXIgJHdhdGNoZXJzID0gdGhpcy4kY29udGFpbmVyLnBhcmVudHMoKS5maWx0ZXIoVXRpbHMuaGFzU2Nyb2xsKTtcbiAgICAkd2F0Y2hlcnMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBVdGlscy5TdG9yZURhdGEodGhpcywgJ3NlbGVjdDItc2Nyb2xsLXBvc2l0aW9uJywge1xuICAgICAgICB4OiAkKHRoaXMpLnNjcm9sbExlZnQoKSxcbiAgICAgICAgeTogJCh0aGlzKS5zY3JvbGxUb3AoKVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkd2F0Y2hlcnMub24oc2Nyb2xsRXZlbnQsIGZ1bmN0aW9uIChldikge1xuICAgICAgdmFyIHBvc2l0aW9uID0gVXRpbHMuR2V0RGF0YSh0aGlzLCAnc2VsZWN0Mi1zY3JvbGwtcG9zaXRpb24nKTtcbiAgICAgICQodGhpcykuc2Nyb2xsVG9wKHBvc2l0aW9uLnkpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKHNjcm9sbEV2ZW50ICsgJyAnICsgcmVzaXplRXZlbnQgKyAnICcgKyBvcmllbnRhdGlvbkV2ZW50LFxuICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYuX3Bvc2l0aW9uRHJvcGRvd24oKTtcbiAgICAgIHNlbGYuX3Jlc2l6ZURyb3Bkb3duKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgQXR0YWNoQm9keS5wcm90b3R5cGUuX2RldGFjaFBvc2l0aW9uaW5nSGFuZGxlciA9XG4gICAgICBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIpIHtcbiAgICB2YXIgc2Nyb2xsRXZlbnQgPSAnc2Nyb2xsLnNlbGVjdDIuJyArIGNvbnRhaW5lci5pZDtcbiAgICB2YXIgcmVzaXplRXZlbnQgPSAncmVzaXplLnNlbGVjdDIuJyArIGNvbnRhaW5lci5pZDtcbiAgICB2YXIgb3JpZW50YXRpb25FdmVudCA9ICdvcmllbnRhdGlvbmNoYW5nZS5zZWxlY3QyLicgKyBjb250YWluZXIuaWQ7XG5cbiAgICB2YXIgJHdhdGNoZXJzID0gdGhpcy4kY29udGFpbmVyLnBhcmVudHMoKS5maWx0ZXIoVXRpbHMuaGFzU2Nyb2xsKTtcbiAgICAkd2F0Y2hlcnMub2ZmKHNjcm9sbEV2ZW50KTtcblxuICAgICQod2luZG93KS5vZmYoc2Nyb2xsRXZlbnQgKyAnICcgKyByZXNpemVFdmVudCArICcgJyArIG9yaWVudGF0aW9uRXZlbnQpO1xuICB9O1xuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLl9wb3NpdGlvbkRyb3Bkb3duID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuXG4gICAgdmFyIGlzQ3VycmVudGx5QWJvdmUgPSB0aGlzLiRkcm9wZG93blswXS5jbGFzc0xpc3RcbiAgICAgIC5jb250YWlucygnc2VsZWN0Mi1kcm9wZG93bi0tYWJvdmUnKTtcbiAgICB2YXIgaXNDdXJyZW50bHlCZWxvdyA9IHRoaXMuJGRyb3Bkb3duWzBdLmNsYXNzTGlzdFxuICAgICAgLmNvbnRhaW5zKCdzZWxlY3QyLWRyb3Bkb3duLS1iZWxvdycpO1xuXG4gICAgdmFyIG5ld0RpcmVjdGlvbiA9IG51bGw7XG5cbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy4kY29udGFpbmVyLm9mZnNldCgpO1xuXG4gICAgb2Zmc2V0LmJvdHRvbSA9IG9mZnNldC50b3AgKyB0aGlzLiRjb250YWluZXIub3V0ZXJIZWlnaHQoZmFsc2UpO1xuXG4gICAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICAgIGhlaWdodDogdGhpcy4kY29udGFpbmVyLm91dGVySGVpZ2h0KGZhbHNlKVxuICAgIH07XG5cbiAgICBjb250YWluZXIudG9wID0gb2Zmc2V0LnRvcDtcbiAgICBjb250YWluZXIuYm90dG9tID0gb2Zmc2V0LnRvcCArIGNvbnRhaW5lci5oZWlnaHQ7XG5cbiAgICB2YXIgZHJvcGRvd24gPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMuJGRyb3Bkb3duLm91dGVySGVpZ2h0KGZhbHNlKVxuICAgIH07XG5cbiAgICB2YXIgdmlld3BvcnQgPSB7XG4gICAgICB0b3A6ICR3aW5kb3cuc2Nyb2xsVG9wKCksXG4gICAgICBib3R0b206ICR3aW5kb3cuc2Nyb2xsVG9wKCkgKyAkd2luZG93LmhlaWdodCgpXG4gICAgfTtcblxuICAgIHZhciBlbm91Z2hSb29tQWJvdmUgPSB2aWV3cG9ydC50b3AgPCAob2Zmc2V0LnRvcCAtIGRyb3Bkb3duLmhlaWdodCk7XG4gICAgdmFyIGVub3VnaFJvb21CZWxvdyA9IHZpZXdwb3J0LmJvdHRvbSA+IChvZmZzZXQuYm90dG9tICsgZHJvcGRvd24uaGVpZ2h0KTtcblxuICAgIHZhciBjc3MgPSB7XG4gICAgICBsZWZ0OiBvZmZzZXQubGVmdCxcbiAgICAgIHRvcDogY29udGFpbmVyLmJvdHRvbVxuICAgIH07XG5cbiAgICAvLyBEZXRlcm1pbmUgd2hhdCB0aGUgcGFyZW50IGVsZW1lbnQgaXMgdG8gdXNlIGZvciBjYWxjdWxhdGluZyB0aGUgb2Zmc2V0XG4gICAgdmFyICRvZmZzZXRQYXJlbnQgPSB0aGlzLiRkcm9wZG93blBhcmVudDtcblxuICAgIC8vIEZvciBzdGF0aWNhbGx5IHBvc2l0aW9uZWQgZWxlbWVudHMsIHdlIG5lZWQgdG8gZ2V0IHRoZSBlbGVtZW50XG4gICAgLy8gdGhhdCBpcyBkZXRlcm1pbmluZyB0aGUgb2Zmc2V0XG4gICAgaWYgKCRvZmZzZXRQYXJlbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgJG9mZnNldFBhcmVudCA9ICRvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50KCk7XG4gICAgfVxuXG4gICAgdmFyIHBhcmVudE9mZnNldCA9IHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDBcbiAgICB9O1xuXG4gICAgaWYgKFxuICAgICAgJC5jb250YWlucyhkb2N1bWVudC5ib2R5LCAkb2Zmc2V0UGFyZW50WzBdKSB8fFxuICAgICAgJG9mZnNldFBhcmVudFswXS5pc0Nvbm5lY3RlZFxuICAgICAgKSB7XG4gICAgICBwYXJlbnRPZmZzZXQgPSAkb2Zmc2V0UGFyZW50Lm9mZnNldCgpO1xuICAgIH1cblxuICAgIGNzcy50b3AgLT0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICBjc3MubGVmdCAtPSBwYXJlbnRPZmZzZXQubGVmdDtcblxuICAgIGlmICghaXNDdXJyZW50bHlBYm92ZSAmJiAhaXNDdXJyZW50bHlCZWxvdykge1xuICAgICAgbmV3RGlyZWN0aW9uID0gJ2JlbG93JztcbiAgICB9XG5cbiAgICBpZiAoIWVub3VnaFJvb21CZWxvdyAmJiBlbm91Z2hSb29tQWJvdmUgJiYgIWlzQ3VycmVudGx5QWJvdmUpIHtcbiAgICAgIG5ld0RpcmVjdGlvbiA9ICdhYm92ZSc7XG4gICAgfSBlbHNlIGlmICghZW5vdWdoUm9vbUFib3ZlICYmIGVub3VnaFJvb21CZWxvdyAmJiBpc0N1cnJlbnRseUFib3ZlKSB7XG4gICAgICBuZXdEaXJlY3Rpb24gPSAnYmVsb3cnO1xuICAgIH1cblxuICAgIGlmIChuZXdEaXJlY3Rpb24gPT0gJ2Fib3ZlJyB8fFxuICAgICAgKGlzQ3VycmVudGx5QWJvdmUgJiYgbmV3RGlyZWN0aW9uICE9PSAnYmVsb3cnKSkge1xuICAgICAgY3NzLnRvcCA9IGNvbnRhaW5lci50b3AgLSBwYXJlbnRPZmZzZXQudG9wIC0gZHJvcGRvd24uaGVpZ2h0O1xuICAgIH1cblxuICAgIGlmIChuZXdEaXJlY3Rpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy4kZHJvcGRvd25bMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1kcm9wZG93bi0tYmVsb3cnKTtcbiAgICAgIHRoaXMuJGRyb3Bkb3duWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItZHJvcGRvd24tLWFib3ZlJyk7XG4gICAgICB0aGlzLiRkcm9wZG93blswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWRyb3Bkb3duLS0nICsgbmV3RGlyZWN0aW9uKTtcblxuICAgICAgdGhpcy4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItY29udGFpbmVyLS1iZWxvdycpO1xuICAgICAgdGhpcy4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItY29udGFpbmVyLS1hYm92ZScpO1xuICAgICAgdGhpcy4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItY29udGFpbmVyLS0nICsgbmV3RGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLiRkcm9wZG93bkNvbnRhaW5lci5jc3MoY3NzKTtcbiAgfTtcblxuICBBdHRhY2hCb2R5LnByb3RvdHlwZS5fcmVzaXplRHJvcGRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNzcyA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLiRjb250YWluZXIub3V0ZXJXaWR0aChmYWxzZSkgKyAncHgnXG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZ2V0KCdkcm9wZG93bkF1dG9XaWR0aCcpKSB7XG4gICAgICBjc3MubWluV2lkdGggPSBjc3Mud2lkdGg7XG4gICAgICBjc3MucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgY3NzLndpZHRoID0gJ2F1dG8nO1xuICAgIH1cblxuICAgIHRoaXMuJGRyb3Bkb3duLmNzcyhjc3MpO1xuICB9O1xuXG4gIEF0dGFjaEJvZHkucHJvdG90eXBlLl9zaG93RHJvcGRvd24gPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdGhpcy4kZHJvcGRvd25Db250YWluZXIuYXBwZW5kVG8odGhpcy4kZHJvcGRvd25QYXJlbnQpO1xuXG4gICAgdGhpcy5fcG9zaXRpb25Ecm9wZG93bigpO1xuICAgIHRoaXMuX3Jlc2l6ZURyb3Bkb3duKCk7XG4gIH07XG5cbiAgcmV0dXJuIEF0dGFjaEJvZHk7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2Ryb3Bkb3duL21pbmltdW1SZXN1bHRzRm9yU2VhcmNoJyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gY291bnRSZXN1bHRzIChkYXRhKSB7XG4gICAgdmFyIGNvdW50ID0gMDtcblxuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgZGF0YS5sZW5ndGg7IGQrKykge1xuICAgICAgdmFyIGl0ZW0gPSBkYXRhW2RdO1xuXG4gICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICBjb3VudCArPSBjb3VudFJlc3VsdHMoaXRlbS5jaGlsZHJlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIE1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIChkZWNvcmF0ZWQsICRlbGVtZW50LCBvcHRpb25zLCBkYXRhQWRhcHRlcikge1xuICAgIHRoaXMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggPSBvcHRpb25zLmdldCgnbWluaW11bVJlc3VsdHNGb3JTZWFyY2gnKTtcblxuICAgIGlmICh0aGlzLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIDwgMCkge1xuICAgICAgdGhpcy5taW5pbXVtUmVzdWx0c0ZvclNlYXJjaCA9IEluZmluaXR5O1xuICAgIH1cblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMsICRlbGVtZW50LCBvcHRpb25zLCBkYXRhQWRhcHRlcik7XG4gIH1cblxuICBNaW5pbXVtUmVzdWx0c0ZvclNlYXJjaC5wcm90b3R5cGUuc2hvd1NlYXJjaCA9IGZ1bmN0aW9uIChkZWNvcmF0ZWQsIHBhcmFtcykge1xuICAgIGlmIChjb3VudFJlc3VsdHMocGFyYW1zLmRhdGEucmVzdWx0cykgPCB0aGlzLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlY29yYXRlZC5jYWxsKHRoaXMsIHBhcmFtcyk7XG4gIH07XG5cbiAgcmV0dXJuIE1pbmltdW1SZXN1bHRzRm9yU2VhcmNoO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bi9zZWxlY3RPbkNsb3NlJyxbXG4gICcuLi91dGlscydcbl0sIGZ1bmN0aW9uIChVdGlscykge1xuICBmdW5jdGlvbiBTZWxlY3RPbkNsb3NlICgpIHsgfVxuXG4gIFNlbGVjdE9uQ2xvc2UucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZGVjb3JhdGVkLCBjb250YWluZXIsICRjb250YWluZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBkZWNvcmF0ZWQuY2FsbCh0aGlzLCBjb250YWluZXIsICRjb250YWluZXIpO1xuXG4gICAgY29udGFpbmVyLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHNlbGYuX2hhbmRsZVNlbGVjdE9uQ2xvc2UocGFyYW1zKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3RPbkNsb3NlLnByb3RvdHlwZS5faGFuZGxlU2VsZWN0T25DbG9zZSA9IGZ1bmN0aW9uIChfLCBwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5vcmlnaW5hbFNlbGVjdDJFdmVudCAhPSBudWxsKSB7XG4gICAgICB2YXIgZXZlbnQgPSBwYXJhbXMub3JpZ2luYWxTZWxlY3QyRXZlbnQ7XG5cbiAgICAgIC8vIERvbid0IHNlbGVjdCBhbiBpdGVtIGlmIHRoZSBjbG9zZSBldmVudCB3YXMgdHJpZ2dlcmVkIGZyb20gYSBzZWxlY3Qgb3JcbiAgICAgIC8vIHVuc2VsZWN0IGV2ZW50XG4gICAgICBpZiAoZXZlbnQuX3R5cGUgPT09ICdzZWxlY3QnIHx8IGV2ZW50Ll90eXBlID09PSAndW5zZWxlY3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgJGhpZ2hsaWdodGVkUmVzdWx0cyA9IHRoaXMuZ2V0SGlnaGxpZ2h0ZWRSZXN1bHRzKCk7XG5cbiAgICAvLyBPbmx5IHNlbGVjdCBoaWdobGlnaHRlZCByZXN1bHRzXG4gICAgaWYgKCRoaWdobGlnaHRlZFJlc3VsdHMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBkYXRhID0gVXRpbHMuR2V0RGF0YSgkaGlnaGxpZ2h0ZWRSZXN1bHRzWzBdLCAnZGF0YScpO1xuXG4gICAgLy8gRG9uJ3QgcmUtc2VsZWN0IGFscmVhZHkgc2VsZWN0ZWQgcmVzdWx0ZVxuICAgIGlmIChcbiAgICAgIChkYXRhLmVsZW1lbnQgIT0gbnVsbCAmJiBkYXRhLmVsZW1lbnQuc2VsZWN0ZWQpIHx8XG4gICAgICAoZGF0YS5lbGVtZW50ID09IG51bGwgJiYgZGF0YS5zZWxlY3RlZClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoJ3NlbGVjdCcsIHtcbiAgICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBTZWxlY3RPbkNsb3NlO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kcm9wZG93bi9jbG9zZU9uU2VsZWN0JyxbXG5cbl0sIGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ2xvc2VPblNlbGVjdCAoKSB7IH1cblxuICBDbG9zZU9uU2VsZWN0LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGRlY29yYXRlZCwgY29udGFpbmVyLCAkY29udGFpbmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZGVjb3JhdGVkLmNhbGwodGhpcywgY29udGFpbmVyLCAkY29udGFpbmVyKTtcblxuICAgIGNvbnRhaW5lci5vbignc2VsZWN0JywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi5fc2VsZWN0VHJpZ2dlcmVkKGV2dCk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIub24oJ3Vuc2VsZWN0JywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi5fc2VsZWN0VHJpZ2dlcmVkKGV2dCk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xvc2VPblNlbGVjdC5wcm90b3R5cGUuX3NlbGVjdFRyaWdnZXJlZCA9IGZ1bmN0aW9uIChfLCBldnQpIHtcbiAgICB2YXIgb3JpZ2luYWxFdmVudCA9IGV2dC5vcmlnaW5hbEV2ZW50O1xuXG4gICAgLy8gRG9uJ3QgY2xvc2UgaWYgdGhlIGNvbnRyb2wga2V5IGlzIGJlaW5nIGhlbGRcbiAgICBpZiAob3JpZ2luYWxFdmVudCAmJiAob3JpZ2luYWxFdmVudC5jdHJsS2V5IHx8IG9yaWdpbmFsRXZlbnQubWV0YUtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRyaWdnZXIoJ2Nsb3NlJywge1xuICAgICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWxFdmVudCxcbiAgICAgIG9yaWdpbmFsU2VsZWN0MkV2ZW50OiBldnRcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xvc2VPblNlbGVjdDtcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZHJvcGRvd24vZHJvcGRvd25Dc3MnLFtcbiAgJy4uL3V0aWxzJ1xuXSwgZnVuY3Rpb24gKFV0aWxzKSB7XG4gIGZ1bmN0aW9uIERyb3Bkb3duQ1NTICgpIHsgfVxuXG4gIERyb3Bkb3duQ1NTLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdmFyICRkcm9wZG93biA9IGRlY29yYXRlZC5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIGRyb3Bkb3duQ3NzQ2xhc3MgPSB0aGlzLm9wdGlvbnMuZ2V0KCdkcm9wZG93bkNzc0NsYXNzJykgfHwgJyc7XG5cbiAgICBpZiAoZHJvcGRvd25Dc3NDbGFzcy5pbmRleE9mKCc6YWxsOicpICE9PSAtMSkge1xuICAgICAgZHJvcGRvd25Dc3NDbGFzcyA9IGRyb3Bkb3duQ3NzQ2xhc3MucmVwbGFjZSgnOmFsbDonLCAnJyk7XG5cbiAgICAgIFV0aWxzLmNvcHlOb25JbnRlcm5hbENzc0NsYXNzZXMoJGRyb3Bkb3duWzBdLCB0aGlzLiRlbGVtZW50WzBdKTtcbiAgICB9XG5cbiAgICAkZHJvcGRvd24uYWRkQ2xhc3MoZHJvcGRvd25Dc3NDbGFzcyk7XG5cbiAgICByZXR1cm4gJGRyb3Bkb3duO1xuICB9O1xuXG4gIHJldHVybiBEcm9wZG93bkNTUztcbn0pO1xuXG5TMi5kZWZpbmUoJ3NlbGVjdDIvZHJvcGRvd24vdGFnc1NlYXJjaEhpZ2hsaWdodCcsW1xuICAnLi4vdXRpbHMnXG5dLCBmdW5jdGlvbiAoVXRpbHMpIHtcbiAgZnVuY3Rpb24gVGFnc1NlYXJjaEhpZ2hsaWdodCAoKSB7IH1cblxuICBUYWdzU2VhcmNoSGlnaGxpZ2h0LnByb3RvdHlwZS5oaWdobGlnaHRGaXJzdEl0ZW0gPSBmdW5jdGlvbiAoZGVjb3JhdGVkKSB7XG4gICAgdmFyICRvcHRpb25zID0gdGhpcy4kcmVzdWx0c1xuICAgIC5maW5kKFxuICAgICAgJy5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZScgK1xuICAgICAgJzpub3QoLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RlZCknXG4gICAgKTtcblxuICAgIGlmICgkb3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgJGZpcnN0T3B0aW9uID0gJG9wdGlvbnMuZmlyc3QoKTtcbiAgICAgIHZhciBkYXRhID0gVXRpbHMuR2V0RGF0YSgkZmlyc3RPcHRpb25bMF0sICdkYXRhJyk7XG4gICAgICB2YXIgZmlyc3RFbGVtZW50ID0gZGF0YS5lbGVtZW50O1xuXG4gICAgICBpZiAoZmlyc3RFbGVtZW50ICYmIGZpcnN0RWxlbWVudC5nZXRBdHRyaWJ1dGUpIHtcbiAgICAgICAgaWYgKGZpcnN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0Mi10YWcnKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgJGZpcnN0T3B0aW9uLnRyaWdnZXIoJ21vdXNlZW50ZXInKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlY29yYXRlZC5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIHJldHVybiBUYWdzU2VhcmNoSGlnaGxpZ2h0O1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9pMThuL2VuJyxbXSxmdW5jdGlvbiAoKSB7XG4gIC8vIEVuZ2xpc2hcbiAgcmV0dXJuIHtcbiAgICBlcnJvckxvYWRpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnVGhlIHJlc3VsdHMgY291bGQgbm90IGJlIGxvYWRlZC4nO1xuICAgIH0sXG4gICAgaW5wdXRUb29Mb25nOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgdmFyIG92ZXJDaGFycyA9IGFyZ3MuaW5wdXQubGVuZ3RoIC0gYXJncy5tYXhpbXVtO1xuXG4gICAgICB2YXIgbWVzc2FnZSA9ICdQbGVhc2UgZGVsZXRlICcgKyBvdmVyQ2hhcnMgKyAnIGNoYXJhY3Rlcic7XG5cbiAgICAgIGlmIChvdmVyQ2hhcnMgIT0gMSkge1xuICAgICAgICBtZXNzYWdlICs9ICdzJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSxcbiAgICBpbnB1dFRvb1Nob3J0OiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgdmFyIHJlbWFpbmluZ0NoYXJzID0gYXJncy5taW5pbXVtIC0gYXJncy5pbnB1dC5sZW5ndGg7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gJ1BsZWFzZSBlbnRlciAnICsgcmVtYWluaW5nQ2hhcnMgKyAnIG9yIG1vcmUgY2hhcmFjdGVycyc7XG5cbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0sXG4gICAgbG9hZGluZ01vcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnTG9hZGluZyBtb3JlIHJlc3VsdHPigKYnO1xuICAgIH0sXG4gICAgbWF4aW11bVNlbGVjdGVkOiBmdW5jdGlvbiAoYXJncykge1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnWW91IGNhbiBvbmx5IHNlbGVjdCAnICsgYXJncy5tYXhpbXVtICsgJyBpdGVtJztcblxuICAgICAgaWYgKGFyZ3MubWF4aW11bSAhPSAxKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gJ3MnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9LFxuICAgIG5vUmVzdWx0czogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICdObyByZXN1bHRzIGZvdW5kJztcbiAgICB9LFxuICAgIHNlYXJjaGluZzogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICdTZWFyY2hpbmfigKYnO1xuICAgIH0sXG4gICAgcmVtb3ZlQWxsSXRlbXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnUmVtb3ZlIGFsbCBpdGVtcyc7XG4gICAgfSxcbiAgICByZW1vdmVJdGVtOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJ1JlbW92ZSBpdGVtJztcbiAgICB9LFxuICAgIHNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJ1NlYXJjaCc7XG4gICAgfVxuICB9O1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9kZWZhdWx0cycsW1xuICAnanF1ZXJ5JyxcblxuICAnLi9yZXN1bHRzJyxcblxuICAnLi9zZWxlY3Rpb24vc2luZ2xlJyxcbiAgJy4vc2VsZWN0aW9uL211bHRpcGxlJyxcbiAgJy4vc2VsZWN0aW9uL3BsYWNlaG9sZGVyJyxcbiAgJy4vc2VsZWN0aW9uL2FsbG93Q2xlYXInLFxuICAnLi9zZWxlY3Rpb24vc2VhcmNoJyxcbiAgJy4vc2VsZWN0aW9uL3NlbGVjdGlvbkNzcycsXG4gICcuL3NlbGVjdGlvbi9ldmVudFJlbGF5JyxcblxuICAnLi91dGlscycsXG4gICcuL3RyYW5zbGF0aW9uJyxcbiAgJy4vZGlhY3JpdGljcycsXG5cbiAgJy4vZGF0YS9zZWxlY3QnLFxuICAnLi9kYXRhL2FycmF5JyxcbiAgJy4vZGF0YS9hamF4JyxcbiAgJy4vZGF0YS90YWdzJyxcbiAgJy4vZGF0YS90b2tlbml6ZXInLFxuICAnLi9kYXRhL21pbmltdW1JbnB1dExlbmd0aCcsXG4gICcuL2RhdGEvbWF4aW11bUlucHV0TGVuZ3RoJyxcbiAgJy4vZGF0YS9tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoJyxcblxuICAnLi9kcm9wZG93bicsXG4gICcuL2Ryb3Bkb3duL3NlYXJjaCcsXG4gICcuL2Ryb3Bkb3duL2hpZGVQbGFjZWhvbGRlcicsXG4gICcuL2Ryb3Bkb3duL2luZmluaXRlU2Nyb2xsJyxcbiAgJy4vZHJvcGRvd24vYXR0YWNoQm9keScsXG4gICcuL2Ryb3Bkb3duL21pbmltdW1SZXN1bHRzRm9yU2VhcmNoJyxcbiAgJy4vZHJvcGRvd24vc2VsZWN0T25DbG9zZScsXG4gICcuL2Ryb3Bkb3duL2Nsb3NlT25TZWxlY3QnLFxuICAnLi9kcm9wZG93bi9kcm9wZG93bkNzcycsXG4gICcuL2Ryb3Bkb3duL3RhZ3NTZWFyY2hIaWdobGlnaHQnLFxuXG4gICcuL2kxOG4vZW4nXG5dLCBmdW5jdGlvbiAoJCxcblxuICAgICAgICAgICAgIFJlc3VsdHNMaXN0LFxuXG4gICAgICAgICAgICAgU2luZ2xlU2VsZWN0aW9uLCBNdWx0aXBsZVNlbGVjdGlvbiwgUGxhY2Vob2xkZXIsIEFsbG93Q2xlYXIsXG4gICAgICAgICAgICAgU2VsZWN0aW9uU2VhcmNoLCBTZWxlY3Rpb25DU1MsIEV2ZW50UmVsYXksXG5cbiAgICAgICAgICAgICBVdGlscywgVHJhbnNsYXRpb24sIERJQUNSSVRJQ1MsXG5cbiAgICAgICAgICAgICBTZWxlY3REYXRhLCBBcnJheURhdGEsIEFqYXhEYXRhLCBUYWdzLCBUb2tlbml6ZXIsXG4gICAgICAgICAgICAgTWluaW11bUlucHV0TGVuZ3RoLCBNYXhpbXVtSW5wdXRMZW5ndGgsIE1heGltdW1TZWxlY3Rpb25MZW5ndGgsXG5cbiAgICAgICAgICAgICBEcm9wZG93biwgRHJvcGRvd25TZWFyY2gsIEhpZGVQbGFjZWhvbGRlciwgSW5maW5pdGVTY3JvbGwsXG4gICAgICAgICAgICAgQXR0YWNoQm9keSwgTWluaW11bVJlc3VsdHNGb3JTZWFyY2gsIFNlbGVjdE9uQ2xvc2UsIENsb3NlT25TZWxlY3QsXG4gICAgICAgICAgICAgRHJvcGRvd25DU1MsIFRhZ3NTZWFyY2hIaWdobGlnaHQsXG5cbiAgICAgICAgICAgICBFbmdsaXNoVHJhbnNsYXRpb24pIHtcbiAgZnVuY3Rpb24gRGVmYXVsdHMgKCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG4gIERlZmF1bHRzLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLmRhdGFBZGFwdGVyID09IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLmFqYXggIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gQWpheERhdGE7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAhPSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMuZGF0YUFkYXB0ZXIgPSBBcnJheURhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gU2VsZWN0RGF0YTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubWluaW11bUlucHV0TGVuZ3RoID4gMCkge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5kYXRhQWRhcHRlcixcbiAgICAgICAgICBNaW5pbXVtSW5wdXRMZW5ndGhcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubWF4aW11bUlucHV0TGVuZ3RoID4gMCkge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5kYXRhQWRhcHRlcixcbiAgICAgICAgICBNYXhpbXVtSW5wdXRMZW5ndGhcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubWF4aW11bVNlbGVjdGlvbkxlbmd0aCA+IDApIHtcbiAgICAgICAgb3B0aW9ucy5kYXRhQWRhcHRlciA9IFV0aWxzLkRlY29yYXRlKFxuICAgICAgICAgIG9wdGlvbnMuZGF0YUFkYXB0ZXIsXG4gICAgICAgICAgTWF4aW11bVNlbGVjdGlvbkxlbmd0aFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy50YWdzKSB7XG4gICAgICAgIG9wdGlvbnMuZGF0YUFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShvcHRpb25zLmRhdGFBZGFwdGVyLCBUYWdzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMudG9rZW5TZXBhcmF0b3JzICE9IG51bGwgfHwgb3B0aW9ucy50b2tlbml6ZXIgIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLmRhdGFBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5kYXRhQWRhcHRlcixcbiAgICAgICAgICBUb2tlbml6ZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5yZXN1bHRzQWRhcHRlciA9PSBudWxsKSB7XG4gICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyID0gUmVzdWx0c0xpc3Q7XG5cbiAgICAgIGlmIChvcHRpb25zLmFqYXggIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5yZXN1bHRzQWRhcHRlcixcbiAgICAgICAgICBJbmZpbml0ZVNjcm9sbFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5wbGFjZWhvbGRlciAhPSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMucmVzdWx0c0FkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyLFxuICAgICAgICAgIEhpZGVQbGFjZWhvbGRlclxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5zZWxlY3RPbkNsb3NlKSB7XG4gICAgICAgIG9wdGlvbnMucmVzdWx0c0FkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyLFxuICAgICAgICAgIFNlbGVjdE9uQ2xvc2VcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMudGFncykge1xuICAgICAgICBvcHRpb25zLnJlc3VsdHNBZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5yZXN1bHRzQWRhcHRlcixcbiAgICAgICAgICBUYWdzU2VhcmNoSGlnaGxpZ2h0XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID09IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLm11bHRpcGxlKSB7XG4gICAgICAgIG9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID0gRHJvcGRvd247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgU2VhcmNoYWJsZURyb3Bkb3duID0gVXRpbHMuRGVjb3JhdGUoRHJvcGRvd24sIERyb3Bkb3duU2VhcmNoKTtcblxuICAgICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlciA9IFNlYXJjaGFibGVEcm9wZG93bjtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggIT09IDApIHtcbiAgICAgICAgb3B0aW9ucy5kcm9wZG93bkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlcixcbiAgICAgICAgICBNaW5pbXVtUmVzdWx0c0ZvclNlYXJjaFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICAgIG9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5kcm9wZG93bkFkYXB0ZXIsXG4gICAgICAgICAgQ2xvc2VPblNlbGVjdFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzICE9IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5kcm9wZG93bkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlcixcbiAgICAgICAgICBEcm9wZG93bkNTU1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlciA9IFV0aWxzLkRlY29yYXRlKFxuICAgICAgICBvcHRpb25zLmRyb3Bkb3duQWRhcHRlcixcbiAgICAgICAgQXR0YWNoQm9keVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyID09IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLm11bHRpcGxlKSB7XG4gICAgICAgIG9wdGlvbnMuc2VsZWN0aW9uQWRhcHRlciA9IE11bHRpcGxlU2VsZWN0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyID0gU2luZ2xlU2VsZWN0aW9uO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdGhlIHBsYWNlaG9sZGVyIG1peGluIGlmIGEgcGxhY2Vob2xkZXIgd2FzIHNwZWNpZmllZFxuICAgICAgaWYgKG9wdGlvbnMucGxhY2Vob2xkZXIgIT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIsXG4gICAgICAgICAgUGxhY2Vob2xkZXJcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuYWxsb3dDbGVhcikge1xuICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIsXG4gICAgICAgICAgQWxsb3dDbGVhclxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5tdWx0aXBsZSkge1xuICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIsXG4gICAgICAgICAgU2VsZWN0aW9uU2VhcmNoXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLnNlbGVjdGlvbkNzc0NsYXNzICE9IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoXG4gICAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyLFxuICAgICAgICAgIFNlbGVjdGlvbkNTU1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBvcHRpb25zLnNlbGVjdGlvbkFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShcbiAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25BZGFwdGVyLFxuICAgICAgICBFdmVudFJlbGF5XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBkZWZhdWx0cyB3ZXJlIG5vdCBwcmV2aW91c2x5IGFwcGxpZWQgZnJvbSBhbiBlbGVtZW50LCBpdCBpc1xuICAgIC8vIHBvc3NpYmxlIGZvciB0aGUgbGFuZ3VhZ2Ugb3B0aW9uIHRvIGhhdmUgbm90IGJlZW4gcmVzb2x2ZWRcbiAgICBvcHRpb25zLmxhbmd1YWdlID0gdGhpcy5fcmVzb2x2ZUxhbmd1YWdlKG9wdGlvbnMubGFuZ3VhZ2UpO1xuXG4gICAgLy8gQWx3YXlzIGZhbGwgYmFjayB0byBFbmdsaXNoIHNpbmNlIGl0IHdpbGwgYWx3YXlzIGJlIGNvbXBsZXRlXG4gICAgb3B0aW9ucy5sYW5ndWFnZS5wdXNoKCdlbicpO1xuXG4gICAgdmFyIHVuaXF1ZUxhbmd1YWdlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgbCA9IDA7IGwgPCBvcHRpb25zLmxhbmd1YWdlLmxlbmd0aDsgbCsrKSB7XG4gICAgICB2YXIgbGFuZ3VhZ2UgPSBvcHRpb25zLmxhbmd1YWdlW2xdO1xuXG4gICAgICBpZiAodW5pcXVlTGFuZ3VhZ2VzLmluZGV4T2YobGFuZ3VhZ2UpID09PSAtMSkge1xuICAgICAgICB1bmlxdWVMYW5ndWFnZXMucHVzaChsYW5ndWFnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0aW9ucy5sYW5ndWFnZSA9IHVuaXF1ZUxhbmd1YWdlcztcblxuICAgIG9wdGlvbnMudHJhbnNsYXRpb25zID0gdGhpcy5fcHJvY2Vzc1RyYW5zbGF0aW9ucyhcbiAgICAgIG9wdGlvbnMubGFuZ3VhZ2UsXG4gICAgICBvcHRpb25zLmRlYnVnXG4gICAgKTtcblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIERlZmF1bHRzLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBzdHJpcERpYWNyaXRpY3MgKHRleHQpIHtcbiAgICAgIC8vIFVzZWQgJ3VuaSByYW5nZSArIG5hbWVkIGZ1bmN0aW9uJyBmcm9tIGh0dHA6Ly9qc3BlcmYuY29tL2RpYWNyaXRpY3MvMThcbiAgICAgIGZ1bmN0aW9uIG1hdGNoKGEpIHtcbiAgICAgICAgcmV0dXJuIERJQUNSSVRJQ1NbYV0gfHwgYTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSgvW15cXHUwMDAwLVxcdTAwN0VdL2csIG1hdGNoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXRjaGVyIChwYXJhbXMsIGRhdGEpIHtcbiAgICAgIC8vIEFsd2F5cyByZXR1cm4gdGhlIG9iamVjdCBpZiB0aGVyZSBpcyBub3RoaW5nIHRvIGNvbXBhcmVcbiAgICAgIGlmIChwYXJhbXMudGVybSA9PSBudWxsIHx8IHBhcmFtcy50ZXJtLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG5cbiAgICAgIC8vIERvIGEgcmVjdXJzaXZlIGNoZWNrIGZvciBvcHRpb25zIHdpdGggY2hpbGRyZW5cbiAgICAgIGlmIChkYXRhLmNoaWxkcmVuICYmIGRhdGEuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBDbG9uZSB0aGUgZGF0YSBvYmplY3QgaWYgdGhlcmUgYXJlIGNoaWxkcmVuXG4gICAgICAgIC8vIFRoaXMgaXMgcmVxdWlyZWQgYXMgd2UgbW9kaWZ5IHRoZSBvYmplY3QgdG8gcmVtb3ZlIGFueSBub24tbWF0Y2hlc1xuICAgICAgICB2YXIgbWF0Y2ggPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGF0YSk7XG5cbiAgICAgICAgLy8gQ2hlY2sgZWFjaCBjaGlsZCBvZiB0aGUgb3B0aW9uXG4gICAgICAgIGZvciAodmFyIGMgPSBkYXRhLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGMgPj0gMDsgYy0tKSB7XG4gICAgICAgICAgdmFyIGNoaWxkID0gZGF0YS5jaGlsZHJlbltjXTtcblxuICAgICAgICAgIHZhciBtYXRjaGVzID0gbWF0Y2hlcihwYXJhbXMsIGNoaWxkKTtcblxuICAgICAgICAgIC8vIElmIHRoZXJlIHdhc24ndCBhIG1hdGNoLCByZW1vdmUgdGhlIG9iamVjdCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICBpZiAobWF0Y2hlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBtYXRjaC5jaGlsZHJlbi5zcGxpY2UoYywgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYW55IGNoaWxkcmVuIG1hdGNoZWQsIHJldHVybiB0aGUgbmV3IG9iamVjdFxuICAgICAgICBpZiAobWF0Y2guY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIHdlcmUgbm8gbWF0Y2hpbmcgY2hpbGRyZW4sIGNoZWNrIGp1c3QgdGhlIHBsYWluIG9iamVjdFxuICAgICAgICByZXR1cm4gbWF0Y2hlcihwYXJhbXMsIG1hdGNoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG9yaWdpbmFsID0gc3RyaXBEaWFjcml0aWNzKGRhdGEudGV4dCkudG9VcHBlckNhc2UoKTtcbiAgICAgIHZhciB0ZXJtID0gc3RyaXBEaWFjcml0aWNzKHBhcmFtcy50ZXJtKS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgdGV4dCBjb250YWlucyB0aGUgdGVybVxuICAgICAgaWYgKG9yaWdpbmFsLmluZGV4T2YodGVybSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQgZG9lc24ndCBjb250YWluIHRoZSB0ZXJtLCBkb24ndCByZXR1cm4gYW55dGhpbmdcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuZGVmYXVsdHMgPSB7XG4gICAgICBhbWRMYW5ndWFnZUJhc2U6ICcuL2kxOG4vJyxcbiAgICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gICAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgZHJvcGRvd25BdXRvV2lkdGg6IGZhbHNlLFxuICAgICAgZXNjYXBlTWFya3VwOiBVdGlscy5lc2NhcGVNYXJrdXAsXG4gICAgICBsYW5ndWFnZToge30sXG4gICAgICBtYXRjaGVyOiBtYXRjaGVyLFxuICAgICAgbWluaW11bUlucHV0TGVuZ3RoOiAwLFxuICAgICAgbWF4aW11bUlucHV0TGVuZ3RoOiAwLFxuICAgICAgbWF4aW11bVNlbGVjdGlvbkxlbmd0aDogMCxcbiAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAwLFxuICAgICAgc2VsZWN0T25DbG9zZTogZmFsc2UsXG4gICAgICBzY3JvbGxBZnRlclNlbGVjdDogZmFsc2UsXG4gICAgICBzb3J0ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlUmVzdWx0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQudGV4dDtcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uLnRleHQ7XG4gICAgICB9LFxuICAgICAgdGhlbWU6ICdkZWZhdWx0JyxcbiAgICAgIHdpZHRoOiAncmVzb2x2ZSdcbiAgICB9O1xuICB9O1xuXG4gIERlZmF1bHRzLnByb3RvdHlwZS5hcHBseUZyb21FbGVtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMsICRlbGVtZW50KSB7XG4gICAgdmFyIG9wdGlvbkxhbmd1YWdlID0gb3B0aW9ucy5sYW5ndWFnZTtcbiAgICB2YXIgZGVmYXVsdExhbmd1YWdlID0gdGhpcy5kZWZhdWx0cy5sYW5ndWFnZTtcbiAgICB2YXIgZWxlbWVudExhbmd1YWdlID0gJGVsZW1lbnQucHJvcCgnbGFuZycpO1xuICAgIHZhciBwYXJlbnRMYW5ndWFnZSA9ICRlbGVtZW50LmNsb3Nlc3QoJ1tsYW5nXScpLnByb3AoJ2xhbmcnKTtcblxuICAgIHZhciBsYW5ndWFnZXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmNhbGwoXG4gICAgICB0aGlzLl9yZXNvbHZlTGFuZ3VhZ2UoZWxlbWVudExhbmd1YWdlKSxcbiAgICAgIHRoaXMuX3Jlc29sdmVMYW5ndWFnZShvcHRpb25MYW5ndWFnZSksXG4gICAgICB0aGlzLl9yZXNvbHZlTGFuZ3VhZ2UoZGVmYXVsdExhbmd1YWdlKSxcbiAgICAgIHRoaXMuX3Jlc29sdmVMYW5ndWFnZShwYXJlbnRMYW5ndWFnZSlcbiAgICApO1xuXG4gICAgb3B0aW9ucy5sYW5ndWFnZSA9IGxhbmd1YWdlcztcblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIERlZmF1bHRzLnByb3RvdHlwZS5fcmVzb2x2ZUxhbmd1YWdlID0gZnVuY3Rpb24gKGxhbmd1YWdlKSB7XG4gICAgaWYgKCFsYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmICgkLmlzRW1wdHlPYmplY3QobGFuZ3VhZ2UpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKCQuaXNQbGFpbk9iamVjdChsYW5ndWFnZSkpIHtcbiAgICAgIHJldHVybiBbbGFuZ3VhZ2VdO1xuICAgIH1cblxuICAgIHZhciBsYW5ndWFnZXM7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobGFuZ3VhZ2UpKSB7XG4gICAgICBsYW5ndWFnZXMgPSBbbGFuZ3VhZ2VdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYW5ndWFnZXMgPSBsYW5ndWFnZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzb2x2ZWRMYW5ndWFnZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbGFuZ3VhZ2VzLmxlbmd0aDsgbCsrKSB7XG4gICAgICByZXNvbHZlZExhbmd1YWdlcy5wdXNoKGxhbmd1YWdlc1tsXSk7XG5cbiAgICAgIGlmICh0eXBlb2YgbGFuZ3VhZ2VzW2xdID09PSAnc3RyaW5nJyAmJiBsYW5ndWFnZXNbbF0uaW5kZXhPZignLScpID4gMCkge1xuICAgICAgICAvLyBFeHRyYWN0IHRoZSByZWdpb24gaW5mb3JtYXRpb24gaWYgaXQgaXMgaW5jbHVkZWRcbiAgICAgICAgdmFyIGxhbmd1YWdlUGFydHMgPSBsYW5ndWFnZXNbbF0uc3BsaXQoJy0nKTtcbiAgICAgICAgdmFyIGJhc2VMYW5ndWFnZSA9IGxhbmd1YWdlUGFydHNbMF07XG5cbiAgICAgICAgcmVzb2x2ZWRMYW5ndWFnZXMucHVzaChiYXNlTGFuZ3VhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXNvbHZlZExhbmd1YWdlcztcbiAgfTtcblxuICBEZWZhdWx0cy5wcm90b3R5cGUuX3Byb2Nlc3NUcmFuc2xhdGlvbnMgPSBmdW5jdGlvbiAobGFuZ3VhZ2VzLCBkZWJ1Zykge1xuICAgIHZhciB0cmFuc2xhdGlvbnMgPSBuZXcgVHJhbnNsYXRpb24oKTtcblxuICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbGFuZ3VhZ2VzLmxlbmd0aDsgbCsrKSB7XG4gICAgICB2YXIgbGFuZ3VhZ2VEYXRhID0gbmV3IFRyYW5zbGF0aW9uKCk7XG5cbiAgICAgIHZhciBsYW5ndWFnZSA9IGxhbmd1YWdlc1tsXTtcblxuICAgICAgaWYgKHR5cGVvZiBsYW5ndWFnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUcnkgdG8gbG9hZCBpdCB3aXRoIHRoZSBvcmlnaW5hbCBuYW1lXG4gICAgICAgICAgbGFuZ3VhZ2VEYXRhID0gVHJhbnNsYXRpb24ubG9hZFBhdGgobGFuZ3VhZ2UpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIElmIHdlIGNvdWxkbid0IGxvYWQgaXQsIGNoZWNrIGlmIGl0IHdhc24ndCB0aGUgZnVsbCBwYXRoXG4gICAgICAgICAgICBsYW5ndWFnZSA9IHRoaXMuZGVmYXVsdHMuYW1kTGFuZ3VhZ2VCYXNlICsgbGFuZ3VhZ2U7XG4gICAgICAgICAgICBsYW5ndWFnZURhdGEgPSBUcmFuc2xhdGlvbi5sb2FkUGF0aChsYW5ndWFnZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIC8vIFRoZSB0cmFuc2xhdGlvbiBjb3VsZCBub3QgYmUgbG9hZGVkIGF0IGFsbC4gU29tZXRpbWVzIHRoaXMgaXNcbiAgICAgICAgICAgIC8vIGJlY2F1c2Ugb2YgYSBjb25maWd1cmF0aW9uIHByb2JsZW0sIG90aGVyIHRpbWVzIHRoaXMgY2FuIGJlXG4gICAgICAgICAgICAvLyBiZWNhdXNlIG9mIGhvdyBTZWxlY3QyIGhlbHBzIGxvYWQgYWxsIHBvc3NpYmxlIHRyYW5zbGF0aW9uIGZpbGVzXG4gICAgICAgICAgICBpZiAoZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAnU2VsZWN0MjogVGhlIGxhbmd1YWdlIGZpbGUgZm9yIFwiJyArIGxhbmd1YWdlICsgJ1wiIGNvdWxkICcgK1xuICAgICAgICAgICAgICAgICdub3QgYmUgYXV0b21hdGljYWxseSBsb2FkZWQuIEEgZmFsbGJhY2sgd2lsbCBiZSB1c2VkIGluc3RlYWQuJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgkLmlzUGxhaW5PYmplY3QobGFuZ3VhZ2UpKSB7XG4gICAgICAgIGxhbmd1YWdlRGF0YSA9IG5ldyBUcmFuc2xhdGlvbihsYW5ndWFnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYW5ndWFnZURhdGEgPSBsYW5ndWFnZTtcbiAgICAgIH1cblxuICAgICAgdHJhbnNsYXRpb25zLmV4dGVuZChsYW5ndWFnZURhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2xhdGlvbnM7XG4gIH07XG5cbiAgRGVmYXVsdHMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgdmFyIGNhbWVsS2V5ID0gJC5jYW1lbENhc2Uoa2V5KTtcblxuICAgIHZhciBkYXRhID0ge307XG4gICAgZGF0YVtjYW1lbEtleV0gPSB2YWx1ZTtcblxuICAgIHZhciBjb252ZXJ0ZWREYXRhID0gVXRpbHMuX2NvbnZlcnREYXRhKGRhdGEpO1xuXG4gICAgJC5leHRlbmQodHJ1ZSwgdGhpcy5kZWZhdWx0cywgY29udmVydGVkRGF0YSk7XG4gIH07XG5cbiAgdmFyIGRlZmF1bHRzID0gbmV3IERlZmF1bHRzKCk7XG5cbiAgcmV0dXJuIGRlZmF1bHRzO1xufSk7XG5cblMyLmRlZmluZSgnc2VsZWN0Mi9vcHRpb25zJyxbXG4gICdqcXVlcnknLFxuICAnLi9kZWZhdWx0cycsXG4gICcuL3V0aWxzJ1xuXSwgZnVuY3Rpb24gKCQsIERlZmF1bHRzLCBVdGlscykge1xuICBmdW5jdGlvbiBPcHRpb25zIChvcHRpb25zLCAkZWxlbWVudCkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBpZiAoJGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5mcm9tRWxlbWVudCgkZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKCRlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IERlZmF1bHRzLmFwcGx5RnJvbUVsZW1lbnQodGhpcy5vcHRpb25zLCAkZWxlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gRGVmYXVsdHMuYXBwbHkodGhpcy5vcHRpb25zKTtcbiAgfVxuXG4gIE9wdGlvbnMucHJvdG90eXBlLmZyb21FbGVtZW50ID0gZnVuY3Rpb24gKCRlKSB7XG4gICAgdmFyIGV4Y2x1ZGVkRGF0YSA9IFsnc2VsZWN0MiddO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tdWx0aXBsZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm9wdGlvbnMubXVsdGlwbGUgPSAkZS5wcm9wKCdtdWx0aXBsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZWQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5vcHRpb25zLmRpc2FibGVkID0gJGUucHJvcCgnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9jb21wbGV0ZSA9PSBudWxsICYmICRlLnByb3AoJ2F1dG9jb21wbGV0ZScpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYXV0b2NvbXBsZXRlID0gJGUucHJvcCgnYXV0b2NvbXBsZXRlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXIgPT0gbnVsbCkge1xuICAgICAgaWYgKCRlLnByb3AoJ2RpcicpKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXIgPSAkZS5wcm9wKCdkaXInKTtcbiAgICAgIH0gZWxzZSBpZiAoJGUuY2xvc2VzdCgnW2Rpcl0nKS5wcm9wKCdkaXInKSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZGlyID0gJGUuY2xvc2VzdCgnW2Rpcl0nKS5wcm9wKCdkaXInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXIgPSAnbHRyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkZS5wcm9wKCdkaXNhYmxlZCcsIHRoaXMub3B0aW9ucy5kaXNhYmxlZCk7XG4gICAgJGUucHJvcCgnbXVsdGlwbGUnLCB0aGlzLm9wdGlvbnMubXVsdGlwbGUpO1xuXG4gICAgaWYgKFV0aWxzLkdldERhdGEoJGVbMF0sICdzZWxlY3QyVGFncycpKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgJ1NlbGVjdDI6IFRoZSBgZGF0YS1zZWxlY3QyLXRhZ3NgIGF0dHJpYnV0ZSBoYXMgYmVlbiBjaGFuZ2VkIHRvICcgK1xuICAgICAgICAgICd1c2UgdGhlIGBkYXRhLWRhdGFgIGFuZCBgZGF0YS10YWdzPVwidHJ1ZVwiYCBhdHRyaWJ1dGVzIGFuZCB3aWxsIGJlICcgK1xuICAgICAgICAgICdyZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9ucyBvZiBTZWxlY3QyLidcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgVXRpbHMuU3RvcmVEYXRhKCRlWzBdLCAnZGF0YScsIFV0aWxzLkdldERhdGEoJGVbMF0sICdzZWxlY3QyVGFncycpKTtcbiAgICAgIFV0aWxzLlN0b3JlRGF0YSgkZVswXSwgJ3RhZ3MnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoVXRpbHMuR2V0RGF0YSgkZVswXSwgJ2FqYXhVcmwnKSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdTZWxlY3QyOiBUaGUgYGRhdGEtYWpheC11cmxgIGF0dHJpYnV0ZSBoYXMgYmVlbiBjaGFuZ2VkIHRvICcgK1xuICAgICAgICAgICdgZGF0YS1hamF4LS11cmxgIGFuZCBzdXBwb3J0IGZvciB0aGUgb2xkIGF0dHJpYnV0ZSB3aWxsIGJlIHJlbW92ZWQnICtcbiAgICAgICAgICAnIGluIGZ1dHVyZSB2ZXJzaW9ucyBvZiBTZWxlY3QyLidcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgJGUuYXR0cignYWpheC0tdXJsJywgVXRpbHMuR2V0RGF0YSgkZVswXSwgJ2FqYXhVcmwnKSk7XG4gICAgICBVdGlscy5TdG9yZURhdGEoJGVbMF0sICdhamF4LVVybCcsIFV0aWxzLkdldERhdGEoJGVbMF0sICdhamF4VXJsJykpO1xuICAgIH1cblxuICAgIHZhciBkYXRhc2V0ID0ge307XG5cbiAgICBmdW5jdGlvbiB1cHBlckNhc2VMZXR0ZXIoXywgbGV0dGVyKSB7XG4gICAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLy8gUHJlLWxvYWQgYWxsIG9mIHRoZSBhdHRyaWJ1dGVzIHdoaWNoIGFyZSBwcmVmaXhlZCB3aXRoIGBkYXRhLWBcbiAgICBmb3IgKHZhciBhdHRyID0gMDsgYXR0ciA8ICRlWzBdLmF0dHJpYnV0ZXMubGVuZ3RoOyBhdHRyKyspIHtcbiAgICAgIHZhciBhdHRyaWJ1dGVOYW1lID0gJGVbMF0uYXR0cmlidXRlc1thdHRyXS5uYW1lO1xuICAgICAgdmFyIHByZWZpeCA9ICdkYXRhLSc7XG5cbiAgICAgIGlmIChhdHRyaWJ1dGVOYW1lLnN1YnN0cigwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBjb250ZW50cyBvZiB0aGUgYXR0cmlidXRlIGFmdGVyIGBkYXRhLWBcbiAgICAgICAgdmFyIGRhdGFOYW1lID0gYXR0cmlidXRlTmFtZS5zdWJzdHJpbmcocHJlZml4Lmxlbmd0aCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBkYXRhIGNvbnRlbnRzIGZyb20gdGhlIGNvbnNpc3RlbnQgc291cmNlXG4gICAgICAgIC8vIFRoaXMgaXMgbW9yZSB0aGFuIGxpa2VseSB0aGUgalF1ZXJ5IGRhdGEgaGVscGVyXG4gICAgICAgIHZhciBkYXRhVmFsdWUgPSBVdGlscy5HZXREYXRhKCRlWzBdLCBkYXRhTmFtZSk7XG5cbiAgICAgICAgLy8gY2FtZWxDYXNlIHRoZSBhdHRyaWJ1dGUgbmFtZSB0byBtYXRjaCB0aGUgc3BlY1xuICAgICAgICB2YXIgY2FtZWxEYXRhTmFtZSA9IGRhdGFOYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIHVwcGVyQ2FzZUxldHRlcik7XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIGRhdGEgYXR0cmlidXRlIGNvbnRlbnRzIGludG8gdGhlIGRhdGFzZXQgc2luY2VcbiAgICAgICAgZGF0YXNldFtjYW1lbERhdGFOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcmVmZXIgdGhlIGVsZW1lbnQncyBgZGF0YXNldGAgYXR0cmlidXRlIGlmIGl0IGV4aXN0c1xuICAgIC8vIGpRdWVyeSAxLnggZG9lcyBub3QgY29ycmVjdGx5IGhhbmRsZSBkYXRhIGF0dHJpYnV0ZXMgd2l0aCBtdWx0aXBsZSBkYXNoZXNcbiAgICBpZiAoJC5mbi5qcXVlcnkgJiYgJC5mbi5qcXVlcnkuc3Vic3RyKDAsIDIpID09ICcxLicgJiYgJGVbMF0uZGF0YXNldCkge1xuICAgICAgZGF0YXNldCA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkZVswXS5kYXRhc2V0LCBkYXRhc2V0KTtcbiAgICB9XG5cbiAgICAvLyBQcmVmZXIgb3VyIGludGVybmFsIGRhdGEgY2FjaGUgaWYgaXQgZXhpc3RzXG4gICAgdmFyIGRhdGEgPSAkLmV4dGVuZCh0cnVlLCB7fSwgVXRpbHMuR2V0RGF0YSgkZVswXSksIGRhdGFzZXQpO1xuXG4gICAgZGF0YSA9IFV0aWxzLl9jb252ZXJ0RGF0YShkYXRhKTtcblxuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICBpZiAoZXhjbHVkZWREYXRhLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoJC5pc1BsYWluT2JqZWN0KHRoaXMub3B0aW9uc1trZXldKSkge1xuICAgICAgICAkLmV4dGVuZCh0aGlzLm9wdGlvbnNba2V5XSwgZGF0YVtrZXldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIE9wdGlvbnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zW2tleV07XG4gIH07XG5cbiAgT3B0aW9ucy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgdGhpcy5vcHRpb25zW2tleV0gPSB2YWw7XG4gIH07XG5cbiAgcmV0dXJuIE9wdGlvbnM7XG59KTtcblxuUzIuZGVmaW5lKCdzZWxlY3QyL2NvcmUnLFtcbiAgJ2pxdWVyeScsXG4gICcuL29wdGlvbnMnLFxuICAnLi91dGlscycsXG4gICcuL2tleXMnXG5dLCBmdW5jdGlvbiAoJCwgT3B0aW9ucywgVXRpbHMsIEtFWVMpIHtcbiAgdmFyIFNlbGVjdDIgPSBmdW5jdGlvbiAoJGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBpZiAoVXRpbHMuR2V0RGF0YSgkZWxlbWVudFswXSwgJ3NlbGVjdDInKSAhPSBudWxsKSB7XG4gICAgICBVdGlscy5HZXREYXRhKCRlbGVtZW50WzBdLCAnc2VsZWN0MicpLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICB0aGlzLmlkID0gdGhpcy5fZ2VuZXJhdGVJZCgkZWxlbWVudCk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMub3B0aW9ucyA9IG5ldyBPcHRpb25zKG9wdGlvbnMsICRlbGVtZW50KTtcblxuICAgIFNlbGVjdDIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG5cbiAgICAvLyBTZXQgdXAgdGhlIHRhYmluZGV4XG5cbiAgICB2YXIgdGFiaW5kZXggPSAkZWxlbWVudC5hdHRyKCd0YWJpbmRleCcpIHx8IDA7XG4gICAgVXRpbHMuU3RvcmVEYXRhKCRlbGVtZW50WzBdLCAnb2xkLXRhYmluZGV4JywgdGFiaW5kZXgpO1xuICAgICRlbGVtZW50LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG5cbiAgICAvLyBTZXQgdXAgY29udGFpbmVycyBhbmQgYWRhcHRlcnNcblxuICAgIHZhciBEYXRhQWRhcHRlciA9IHRoaXMub3B0aW9ucy5nZXQoJ2RhdGFBZGFwdGVyJyk7XG4gICAgdGhpcy5kYXRhQWRhcHRlciA9IG5ldyBEYXRhQWRhcHRlcigkZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcblxuICAgIHZhciAkY29udGFpbmVyID0gdGhpcy5yZW5kZXIoKTtcblxuICAgIHRoaXMuX3BsYWNlQ29udGFpbmVyKCRjb250YWluZXIpO1xuXG4gICAgdmFyIFNlbGVjdGlvbkFkYXB0ZXIgPSB0aGlzLm9wdGlvbnMuZ2V0KCdzZWxlY3Rpb25BZGFwdGVyJyk7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uQWRhcHRlcigkZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLiRzZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5yZW5kZXIoKTtcblxuICAgIHRoaXMuc2VsZWN0aW9uLnBvc2l0aW9uKHRoaXMuJHNlbGVjdGlvbiwgJGNvbnRhaW5lcik7XG5cbiAgICB2YXIgRHJvcGRvd25BZGFwdGVyID0gdGhpcy5vcHRpb25zLmdldCgnZHJvcGRvd25BZGFwdGVyJyk7XG4gICAgdGhpcy5kcm9wZG93biA9IG5ldyBEcm9wZG93bkFkYXB0ZXIoJGVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy4kZHJvcGRvd24gPSB0aGlzLmRyb3Bkb3duLnJlbmRlcigpO1xuXG4gICAgdGhpcy5kcm9wZG93bi5wb3NpdGlvbih0aGlzLiRkcm9wZG93biwgJGNvbnRhaW5lcik7XG5cbiAgICB2YXIgUmVzdWx0c0FkYXB0ZXIgPSB0aGlzLm9wdGlvbnMuZ2V0KCdyZXN1bHRzQWRhcHRlcicpO1xuICAgIHRoaXMucmVzdWx0cyA9IG5ldyBSZXN1bHRzQWRhcHRlcigkZWxlbWVudCwgdGhpcy5vcHRpb25zLCB0aGlzLmRhdGFBZGFwdGVyKTtcbiAgICB0aGlzLiRyZXN1bHRzID0gdGhpcy5yZXN1bHRzLnJlbmRlcigpO1xuXG4gICAgdGhpcy5yZXN1bHRzLnBvc2l0aW9uKHRoaXMuJHJlc3VsdHMsIHRoaXMuJGRyb3Bkb3duKTtcblxuICAgIC8vIEJpbmQgZXZlbnRzXG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBCaW5kIHRoZSBjb250YWluZXIgdG8gYWxsIG9mIHRoZSBhZGFwdGVyc1xuICAgIHRoaXMuX2JpbmRBZGFwdGVycygpO1xuXG4gICAgLy8gUmVnaXN0ZXIgYW55IERPTSBldmVudCBoYW5kbGVyc1xuICAgIHRoaXMuX3JlZ2lzdGVyRG9tRXZlbnRzKCk7XG5cbiAgICAvLyBSZWdpc3RlciBhbnkgaW50ZXJuYWwgZXZlbnQgaGFuZGxlcnNcbiAgICB0aGlzLl9yZWdpc3RlckRhdGFFdmVudHMoKTtcbiAgICB0aGlzLl9yZWdpc3RlclNlbGVjdGlvbkV2ZW50cygpO1xuICAgIHRoaXMuX3JlZ2lzdGVyRHJvcGRvd25FdmVudHMoKTtcbiAgICB0aGlzLl9yZWdpc3RlclJlc3VsdHNFdmVudHMoKTtcbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50cygpO1xuXG4gICAgLy8gU2V0IHRoZSBpbml0aWFsIHN0YXRlXG4gICAgdGhpcy5kYXRhQWRhcHRlci5jdXJyZW50KGZ1bmN0aW9uIChpbml0aWFsRGF0YSkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdzZWxlY3Rpb246dXBkYXRlJywge1xuICAgICAgICBkYXRhOiBpbml0aWFsRGF0YVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBIaWRlIHRoZSBvcmlnaW5hbCBzZWxlY3RcbiAgICAkZWxlbWVudFswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlJyk7XG4gICAgJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgLy8gU3luY2hyb25pemUgYW55IG1vbml0b3JlZCBhdHRyaWJ1dGVzXG4gICAgdGhpcy5fc3luY0F0dHJpYnV0ZXMoKTtcblxuICAgIFV0aWxzLlN0b3JlRGF0YSgkZWxlbWVudFswXSwgJ3NlbGVjdDInLCB0aGlzKTtcblxuICAgIC8vIEVuc3VyZSBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoICRlbGVtZW50LmRhdGEoJ3NlbGVjdDInKS5cbiAgICAkZWxlbWVudC5kYXRhKCdzZWxlY3QyJywgdGhpcyk7XG4gIH07XG5cbiAgVXRpbHMuRXh0ZW5kKFNlbGVjdDIsIFV0aWxzLk9ic2VydmFibGUpO1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9nZW5lcmF0ZUlkID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgdmFyIGlkID0gJyc7XG5cbiAgICBpZiAoJGVsZW1lbnQuYXR0cignaWQnKSAhPSBudWxsKSB7XG4gICAgICBpZCA9ICRlbGVtZW50LmF0dHIoJ2lkJyk7XG4gICAgfSBlbHNlIGlmICgkZWxlbWVudC5hdHRyKCduYW1lJykgIT0gbnVsbCkge1xuICAgICAgaWQgPSAkZWxlbWVudC5hdHRyKCduYW1lJykgKyAnLScgKyBVdGlscy5nZW5lcmF0ZUNoYXJzKDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9IFV0aWxzLmdlbmVyYXRlQ2hhcnMoNCk7XG4gICAgfVxuXG4gICAgaWQgPSBpZC5yZXBsYWNlKC8oOnxcXC58XFxbfFxcXXwsKS9nLCAnJyk7XG4gICAgaWQgPSAnc2VsZWN0Mi0nICsgaWQ7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3BsYWNlQ29udGFpbmVyID0gZnVuY3Rpb24gKCRjb250YWluZXIpIHtcbiAgICAkY29udGFpbmVyLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpO1xuXG4gICAgdmFyIHdpZHRoID0gdGhpcy5fcmVzb2x2ZVdpZHRoKHRoaXMuJGVsZW1lbnQsIHRoaXMub3B0aW9ucy5nZXQoJ3dpZHRoJykpO1xuXG4gICAgaWYgKHdpZHRoICE9IG51bGwpIHtcbiAgICAgICRjb250YWluZXIuY3NzKCd3aWR0aCcsIHdpZHRoKTtcbiAgICB9XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3Jlc29sdmVXaWR0aCA9IGZ1bmN0aW9uICgkZWxlbWVudCwgbWV0aG9kKSB7XG4gICAgdmFyIFdJRFRIID0gL153aWR0aDooKFstK10/KFswLTldKlxcLik/WzAtOV0rKShweHxlbXxleHwlfGlufGNtfG1tfHB0fHBjKSkvaTtcblxuICAgIGlmIChtZXRob2QgPT0gJ3Jlc29sdmUnKSB7XG4gICAgICB2YXIgc3R5bGVXaWR0aCA9IHRoaXMuX3Jlc29sdmVXaWR0aCgkZWxlbWVudCwgJ3N0eWxlJyk7XG5cbiAgICAgIGlmIChzdHlsZVdpZHRoICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlV2lkdGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9yZXNvbHZlV2lkdGgoJGVsZW1lbnQsICdlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKG1ldGhvZCA9PSAnZWxlbWVudCcpIHtcbiAgICAgIHZhciBlbGVtZW50V2lkdGggPSAkZWxlbWVudC5vdXRlcldpZHRoKGZhbHNlKTtcblxuICAgICAgaWYgKGVsZW1lbnRXaWR0aCA8PSAwKSB7XG4gICAgICAgIHJldHVybiAnYXV0byc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbGVtZW50V2lkdGggKyAncHgnO1xuICAgIH1cblxuICAgIGlmIChtZXRob2QgPT0gJ3N0eWxlJykge1xuICAgICAgdmFyIHN0eWxlID0gJGVsZW1lbnQuYXR0cignc3R5bGUnKTtcblxuICAgICAgaWYgKHR5cGVvZihzdHlsZSkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXR0cnMgPSBzdHlsZS5zcGxpdCgnOycpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF0dHJzLmxlbmd0aDsgaSA8IGw7IGkgPSBpICsgMSkge1xuICAgICAgICB2YXIgYXR0ciA9IGF0dHJzW2ldLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgIHZhciBtYXRjaGVzID0gYXR0ci5tYXRjaChXSURUSCk7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwgJiYgbWF0Y2hlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChtZXRob2QgPT0gJ2NvbXB1dGVkc3R5bGUnKSB7XG4gICAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCRlbGVtZW50WzBdKTtcblxuICAgICAgcmV0dXJuIGNvbXB1dGVkU3R5bGUud2lkdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGhvZDtcbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS5fYmluZEFkYXB0ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGF0YUFkYXB0ZXIuYmluZCh0aGlzLCB0aGlzLiRjb250YWluZXIpO1xuICAgIHRoaXMuc2VsZWN0aW9uLmJpbmQodGhpcywgdGhpcy4kY29udGFpbmVyKTtcblxuICAgIHRoaXMuZHJvcGRvd24uYmluZCh0aGlzLCB0aGlzLiRjb250YWluZXIpO1xuICAgIHRoaXMucmVzdWx0cy5iaW5kKHRoaXMsIHRoaXMuJGNvbnRhaW5lcik7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3JlZ2lzdGVyRG9tRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NoYW5nZS5zZWxlY3QyJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5kYXRhQWRhcHRlci5jdXJyZW50KGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0aW9uOnVwZGF0ZScsIHtcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdmb2N1cy5zZWxlY3QyJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgc2VsZi50cmlnZ2VyKCdmb2N1cycsIGV2dCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zeW5jQSA9IFV0aWxzLmJpbmQodGhpcy5fc3luY0F0dHJpYnV0ZXMsIHRoaXMpO1xuICAgIHRoaXMuX3N5bmNTID0gVXRpbHMuYmluZCh0aGlzLl9zeW5jU3VidHJlZSwgdGhpcyk7XG5cbiAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICBzZWxmLl9zeW5jQSgpO1xuICAgICAgc2VsZi5fc3luY1MobXV0YXRpb25zKTtcbiAgICB9KTtcbiAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMuJGVsZW1lbnRbMF0sIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiBmYWxzZVxuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9yZWdpc3RlckRhdGFFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5kYXRhQWRhcHRlci5vbignKicsIGZ1bmN0aW9uIChuYW1lLCBwYXJhbXMpIHtcbiAgICAgIHNlbGYudHJpZ2dlcihuYW1lLCBwYXJhbXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9yZWdpc3RlclNlbGVjdGlvbkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG5vblJlbGF5RXZlbnRzID0gWyd0b2dnbGUnLCAnZm9jdXMnXTtcblxuICAgIHRoaXMuc2VsZWN0aW9uLm9uKCd0b2dnbGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnRvZ2dsZURyb3Bkb3duKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdGlvbi5vbignZm9jdXMnLCBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBzZWxmLmZvY3VzKHBhcmFtcyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdGlvbi5vbignKicsIGZ1bmN0aW9uIChuYW1lLCBwYXJhbXMpIHtcbiAgICAgIGlmIChub25SZWxheUV2ZW50cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJpZ2dlcihuYW1lLCBwYXJhbXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9yZWdpc3RlckRyb3Bkb3duRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZHJvcGRvd24ub24oJyonLCBmdW5jdGlvbiAobmFtZSwgcGFyYW1zKSB7XG4gICAgICBzZWxmLnRyaWdnZXIobmFtZSwgcGFyYW1zKTtcbiAgICB9KTtcbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS5fcmVnaXN0ZXJSZXN1bHRzRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMucmVzdWx0cy5vbignKicsIGZ1bmN0aW9uIChuYW1lLCBwYXJhbXMpIHtcbiAgICAgIHNlbGYudHJpZ2dlcihuYW1lLCBwYXJhbXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLl9yZWdpc3RlckV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdDItY29udGFpbmVyLS1vcGVuJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuJGNvbnRhaW5lclswXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignZW5hYmxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdDItY29udGFpbmVyLS1kaXNhYmxlZCcpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbignZGlzYWJsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuJGNvbnRhaW5lclswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWNvbnRhaW5lci0tZGlzYWJsZWQnKTtcbiAgICB9KTtcblxuICAgIHRoaXMub24oJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Mi1jb250YWluZXItLWZvY3VzJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdxdWVyeScsIGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIGlmICghc2VsZi5pc09wZW4oKSkge1xuICAgICAgICBzZWxmLnRyaWdnZXIoJ29wZW4nLCB7fSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGF0YUFkYXB0ZXIucXVlcnkocGFyYW1zLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBzZWxmLnRyaWdnZXIoJ3Jlc3VsdHM6YWxsJywge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgcXVlcnk6IHBhcmFtc1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbigncXVlcnk6YXBwZW5kJywgZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgdGhpcy5kYXRhQWRhcHRlci5xdWVyeShwYXJhbXMsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHNlbGYudHJpZ2dlcigncmVzdWx0czphcHBlbmQnLCB7XG4gICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICBxdWVyeTogcGFyYW1zXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIHZhciBrZXkgPSBldnQud2hpY2g7XG5cbiAgICAgIGlmIChzZWxmLmlzT3BlbigpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IEtFWVMuRVNDIHx8IChrZXkgPT09IEtFWVMuVVAgJiYgZXZ0LmFsdEtleSkpIHtcbiAgICAgICAgICBzZWxmLmNsb3NlKGV2dCk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IEtFWVMuRU5URVIgfHwga2V5ID09PSBLRVlTLlRBQikge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcigncmVzdWx0czpzZWxlY3QnLCB7fSk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICgoa2V5ID09PSBLRVlTLlNQQUNFICYmIGV2dC5jdHJsS2V5KSkge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcigncmVzdWx0czp0b2dnbGUnLCB7fSk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IEtFWVMuVVApIHtcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3Jlc3VsdHM6cHJldmlvdXMnLCB7fSk7XG5cbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IEtFWVMuRE9XTikge1xuICAgICAgICAgIHNlbGYudHJpZ2dlcigncmVzdWx0czpuZXh0Jywge30pO1xuXG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChrZXkgPT09IEtFWVMuRU5URVIgfHwga2V5ID09PSBLRVlTLlNQQUNFIHx8XG4gICAgICAgICAgICAoa2V5ID09PSBLRVlTLkRPV04gJiYgZXZ0LmFsdEtleSkpIHtcbiAgICAgICAgICBzZWxmLm9wZW4oKTtcblxuICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3N5bmNBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3B0aW9ucy5zZXQoJ2Rpc2FibGVkJywgdGhpcy4kZWxlbWVudC5wcm9wKCdkaXNhYmxlZCcpKTtcblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRyaWdnZXIoJ2Rpc2FibGUnLCB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJpZ2dlcignZW5hYmxlJywge30pO1xuICAgIH1cbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS5faXNDaGFuZ2VNdXRhdGlvbiA9IGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAobXV0YXRpb25zLmFkZGVkTm9kZXMgJiYgbXV0YXRpb25zLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBtdXRhdGlvbnMuYWRkZWROb2Rlcy5sZW5ndGg7IG4rKykge1xuICAgICAgICB2YXIgbm9kZSA9IG11dGF0aW9ucy5hZGRlZE5vZGVzW25dO1xuXG4gICAgICAgIGlmIChub2RlLnNlbGVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG11dGF0aW9ucy5yZW1vdmVkTm9kZXMgJiYgbXV0YXRpb25zLnJlbW92ZWROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobXV0YXRpb25zKSkge1xuICAgICAgcmV0dXJuIG11dGF0aW9ucy5zb21lKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZi5faXNDaGFuZ2VNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuX3N5bmNTdWJ0cmVlID0gZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgIHZhciBjaGFuZ2VkID0gdGhpcy5faXNDaGFuZ2VNdXRhdGlvbihtdXRhdGlvbnMpO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE9ubHkgcmUtcHVsbCB0aGUgZGF0YSBpZiB3ZSB0aGluayB0aGVyZSBpcyBhIGNoYW5nZVxuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICB0aGlzLmRhdGFBZGFwdGVyLmN1cnJlbnQoZnVuY3Rpb24gKGN1cnJlbnREYXRhKSB7XG4gICAgICAgIHNlbGYudHJpZ2dlcignc2VsZWN0aW9uOnVwZGF0ZScsIHtcbiAgICAgICAgICBkYXRhOiBjdXJyZW50RGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIHRyaWdnZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgdHJpZ2dlciBwcmUtZXZlbnRzIHdoZW5cbiAgICogdGhlcmUgYXJlIGV2ZW50cyB0aGF0IGNhbiBiZSBwcmV2ZW50ZWQuXG4gICAqL1xuICBTZWxlY3QyLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcbiAgICB2YXIgYWN0dWFsVHJpZ2dlciA9IFNlbGVjdDIuX19zdXBlcl9fLnRyaWdnZXI7XG4gICAgdmFyIHByZVRyaWdnZXJNYXAgPSB7XG4gICAgICAnb3Blbic6ICdvcGVuaW5nJyxcbiAgICAgICdjbG9zZSc6ICdjbG9zaW5nJyxcbiAgICAgICdzZWxlY3QnOiAnc2VsZWN0aW5nJyxcbiAgICAgICd1bnNlbGVjdCc6ICd1bnNlbGVjdGluZycsXG4gICAgICAnY2xlYXInOiAnY2xlYXJpbmcnXG4gICAgfTtcblxuICAgIGlmIChhcmdzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSBpbiBwcmVUcmlnZ2VyTWFwKSB7XG4gICAgICB2YXIgcHJlVHJpZ2dlck5hbWUgPSBwcmVUcmlnZ2VyTWFwW25hbWVdO1xuICAgICAgdmFyIHByZVRyaWdnZXJBcmdzID0ge1xuICAgICAgICBwcmV2ZW50ZWQ6IGZhbHNlLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9O1xuXG4gICAgICBhY3R1YWxUcmlnZ2VyLmNhbGwodGhpcywgcHJlVHJpZ2dlck5hbWUsIHByZVRyaWdnZXJBcmdzKTtcblxuICAgICAgaWYgKHByZVRyaWdnZXJBcmdzLnByZXZlbnRlZCkge1xuICAgICAgICBhcmdzLnByZXZlbnRlZCA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFjdHVhbFRyaWdnZXIuY2FsbCh0aGlzLCBuYW1lLCBhcmdzKTtcbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS50b2dnbGVEcm9wZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcigncXVlcnknLCB7fSk7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50cmlnZ2VyKCdjbG9zZScsIHsgb3JpZ2luYWxFdmVudCA6IGV2dCB9KTtcbiAgfTtcblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCB0byBhYnN0cmFjdCB0aGUgXCJlbmFibGVkXCIgKG5vdCBcImRpc2FibGVkXCIpIHN0YXRlIG9mIHRoaXNcbiAgICogb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJuIHt0cnVlfSBpZiB0aGUgaW5zdGFuY2UgaXMgbm90IGRpc2FibGVkLlxuICAgKiBAcmV0dXJuIHtmYWxzZX0gaWYgdGhlIGluc3RhbmNlIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgU2VsZWN0Mi5wcm90b3R5cGUuaXNFbmFibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0Rpc2FibGVkKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gYWJzdHJhY3QgdGhlIFwiZGlzYWJsZWRcIiBzdGF0ZSBvZiB0aGlzIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybiB7dHJ1ZX0gaWYgdGhlIGRpc2FibGVkIG9wdGlvbiBpcyB0cnVlLlxuICAgKiBAcmV0dXJuIHtmYWxzZX0gaWYgdGhlIGRpc2FibGVkIG9wdGlvbiBpcyBmYWxzZS5cbiAgICovXG4gIFNlbGVjdDIucHJvdG90eXBlLmlzRGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5nZXQoJ2Rpc2FibGVkJyk7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUuaXNPcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLmhhc0ZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QyLWNvbnRhaW5lci0tZm9jdXMnKTtcbiAgfTtcblxuICBTZWxlY3QyLnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgLy8gTm8gbmVlZCB0byByZS10cmlnZ2VyIGZvY3VzIGV2ZW50cyBpZiB3ZSBhcmUgYWxyZWFkeSBmb2N1c2VkXG4gICAgaWYgKHRoaXMuaGFzRm9jdXMoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuJGNvbnRhaW5lclswXS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QyLWNvbnRhaW5lci0tZm9jdXMnKTtcbiAgICB0aGlzLnRyaWdnZXIoJ2ZvY3VzJywge30pO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5nZXQoJ2RlYnVnJykgJiYgd2luZG93LmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdTZWxlY3QyOiBUaGUgYHNlbGVjdDIoXCJlbmFibGVcIilgIG1ldGhvZCBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCB3aWxsJyArXG4gICAgICAgICcgYmUgcmVtb3ZlZCBpbiBsYXRlciBTZWxlY3QyIHZlcnNpb25zLiBVc2UgJGVsZW1lbnQucHJvcChcImRpc2FibGVkXCIpJyArXG4gICAgICAgICcgaW5zdGVhZC4nXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChhcmdzID09IG51bGwgfHwgYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIGFyZ3MgPSBbdHJ1ZV07XG4gICAgfVxuXG4gICAgdmFyIGRpc2FibGVkID0gIWFyZ3NbMF07XG5cbiAgICB0aGlzLiRlbGVtZW50LnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5nZXQoJ2RlYnVnJykgJiZcbiAgICAgICAgYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgd2luZG93LmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdTZWxlY3QyOiBEYXRhIGNhbiBubyBsb25nZXIgYmUgc2V0IHVzaW5nIGBzZWxlY3QyKFwiZGF0YVwiKWAuIFlvdSAnICtcbiAgICAgICAgJ3Nob3VsZCBjb25zaWRlciBzZXR0aW5nIHRoZSB2YWx1ZSBpbnN0ZWFkIHVzaW5nIGAkZWxlbWVudC52YWwoKWAuJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgZGF0YSA9IFtdO1xuXG4gICAgdGhpcy5kYXRhQWRhcHRlci5jdXJyZW50KGZ1bmN0aW9uIChjdXJyZW50RGF0YSkge1xuICAgICAgZGF0YSA9IGN1cnJlbnREYXRhO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgU2VsZWN0Mi5wcm90b3R5cGUudmFsID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmdldCgnZGVidWcnKSAmJiB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1NlbGVjdDI6IFRoZSBgc2VsZWN0MihcInZhbFwiKWAgbWV0aG9kIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUnICtcbiAgICAgICAgJyByZW1vdmVkIGluIGxhdGVyIFNlbGVjdDIgdmVyc2lvbnMuIFVzZSAkZWxlbWVudC52YWwoKSBpbnN0ZWFkLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3MgPT0gbnVsbCB8fCBhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQudmFsKCk7XG4gICAgfVxuXG4gICAgdmFyIG5ld1ZhbCA9IGFyZ3NbMF07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdWYWwpKSB7XG4gICAgICBuZXdWYWwgPSBuZXdWYWwubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC52YWwobmV3VmFsKS50cmlnZ2VyKCdpbnB1dCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgVXRpbHMuUmVtb3ZlRGF0YSh0aGlzLiRjb250YWluZXJbMF0pO1xuICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmUoKTtcblxuICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLl9vYnNlcnZlciA9IG51bGw7XG5cbiAgICB0aGlzLl9zeW5jQSA9IG51bGw7XG4gICAgdGhpcy5fc3luY1MgPSBudWxsO1xuXG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy5zZWxlY3QyJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCd0YWJpbmRleCcsXG4gICAgVXRpbHMuR2V0RGF0YSh0aGlzLiRlbGVtZW50WzBdLCAnb2xkLXRhYmluZGV4JykpO1xuXG4gICAgdGhpcy4kZWxlbWVudFswXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgIFV0aWxzLlJlbW92ZURhdGEodGhpcy4kZWxlbWVudFswXSk7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdzZWxlY3QyJyk7XG5cbiAgICB0aGlzLmRhdGFBZGFwdGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnNlbGVjdGlvbi5kZXN0cm95KCk7XG4gICAgdGhpcy5kcm9wZG93bi5kZXN0cm95KCk7XG4gICAgdGhpcy5yZXN1bHRzLmRlc3Ryb3koKTtcblxuICAgIHRoaXMuZGF0YUFkYXB0ZXIgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmRyb3Bkb3duID0gbnVsbDtcbiAgICB0aGlzLnJlc3VsdHMgPSBudWxsO1xuICB9O1xuXG4gIFNlbGVjdDIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGNvbnRhaW5lciA9ICQoXG4gICAgICAnPHNwYW4gY2xhc3M9XCJzZWxlY3QyIHNlbGVjdDItY29udGFpbmVyXCI+JyArXG4gICAgICAgICc8c3BhbiBjbGFzcz1cInNlbGVjdGlvblwiPjwvc3Bhbj4nICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiZHJvcGRvd24td3JhcHBlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4nICtcbiAgICAgICc8L3NwYW4+J1xuICAgICk7XG5cbiAgICAkY29udGFpbmVyLmF0dHIoJ2RpcicsIHRoaXMub3B0aW9ucy5nZXQoJ2RpcicpKTtcblxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICRjb250YWluZXI7XG5cbiAgICB0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0XG4gICAgICAuYWRkKCdzZWxlY3QyLWNvbnRhaW5lci0tJyArIHRoaXMub3B0aW9ucy5nZXQoJ3RoZW1lJykpO1xuXG4gICAgVXRpbHMuU3RvcmVEYXRhKCRjb250YWluZXJbMF0sICdlbGVtZW50JywgdGhpcy4kZWxlbWVudCk7XG5cbiAgICByZXR1cm4gJGNvbnRhaW5lcjtcbiAgfTtcblxuICByZXR1cm4gU2VsZWN0Mjtcbn0pO1xuXG5TMi5kZWZpbmUoJ2pxdWVyeS1tb3VzZXdoZWVsJyxbXG4gICdqcXVlcnknXG5dLCBmdW5jdGlvbiAoJCkge1xuICAvLyBVc2VkIHRvIHNoaW0galF1ZXJ5Lm1vdXNld2hlZWwgZm9yIG5vbi1mdWxsIGJ1aWxkcy5cbiAgcmV0dXJuICQ7XG59KTtcblxuUzIuZGVmaW5lKCdqcXVlcnkuc2VsZWN0MicsW1xuICAnanF1ZXJ5JyxcbiAgJ2pxdWVyeS1tb3VzZXdoZWVsJyxcblxuICAnLi9zZWxlY3QyL2NvcmUnLFxuICAnLi9zZWxlY3QyL2RlZmF1bHRzJyxcbiAgJy4vc2VsZWN0Mi91dGlscydcbl0sIGZ1bmN0aW9uICgkLCBfLCBTZWxlY3QyLCBEZWZhdWx0cywgVXRpbHMpIHtcbiAgaWYgKCQuZm4uc2VsZWN0MiA9PSBudWxsKSB7XG4gICAgLy8gQWxsIG1ldGhvZHMgdGhhdCBzaG91bGQgcmV0dXJuIHRoZSBlbGVtZW50XG4gICAgdmFyIHRoaXNNZXRob2RzID0gWydvcGVuJywgJ2Nsb3NlJywgJ2Rlc3Ryb3knXTtcblxuICAgICQuZm4uc2VsZWN0MiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpbnN0YW5jZU9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb3B0aW9ucyk7XG5cbiAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgU2VsZWN0MigkKHRoaXMpLCBpbnN0YW5jZU9wdGlvbnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpbnN0YW5jZSA9IFV0aWxzLkdldERhdGEodGhpcywgJ3NlbGVjdDInKTtcblxuICAgICAgICAgIGlmIChpbnN0YW5jZSA9PSBudWxsICYmIHdpbmRvdy5jb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICdUaGUgc2VsZWN0MihcXCcnICsgb3B0aW9ucyArICdcXCcpIG1ldGhvZCB3YXMgY2FsbGVkIG9uIGFuICcgK1xuICAgICAgICAgICAgICAnZWxlbWVudCB0aGF0IGlzIG5vdCB1c2luZyBTZWxlY3QyLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0ID0gaW5zdGFuY2Vbb3B0aW9uc10uYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBzaG91bGQgYmUgcmV0dXJuaW5nIGB0aGlzYFxuICAgICAgICBpZiAodGhpc01ldGhvZHMuaW5kZXhPZihvcHRpb25zKSA+IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyBmb3IgU2VsZWN0MjogJyArIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBpZiAoJC5mbi5zZWxlY3QyLmRlZmF1bHRzID09IG51bGwpIHtcbiAgICAkLmZuLnNlbGVjdDIuZGVmYXVsdHMgPSBEZWZhdWx0cztcbiAgfVxuXG4gIHJldHVybiBTZWxlY3QyO1xufSk7XG5cbiAgLy8gUmV0dXJuIHRoZSBBTUQgbG9hZGVyIGNvbmZpZ3VyYXRpb24gc28gaXQgY2FuIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGlzIGZpbGVcbiAgcmV0dXJuIHtcbiAgICBkZWZpbmU6IFMyLmRlZmluZSxcbiAgICByZXF1aXJlOiBTMi5yZXF1aXJlXG4gIH07XG59KCkpO1xuXG4gIC8vIEF1dG9sb2FkIHRoZSBqUXVlcnkgYmluZGluZ3NcbiAgLy8gV2Uga25vdyB0aGF0IGFsbCBvZiB0aGUgbW9kdWxlcyBleGlzdCBhYm92ZSB0aGlzLCBzbyB3ZSdyZSBzYWZlXG4gIHZhciBzZWxlY3QyID0gUzIucmVxdWlyZSgnanF1ZXJ5LnNlbGVjdDInKTtcblxuICAvLyBIb2xkIHRoZSBBTUQgbW9kdWxlIHJlZmVyZW5jZXMgb24gdGhlIGpRdWVyeSBmdW5jdGlvbiB0aGF0IHdhcyBqdXN0IGxvYWRlZFxuICAvLyBUaGlzIGFsbG93cyBTZWxlY3QyIHRvIHVzZSB0aGUgaW50ZXJuYWwgbG9hZGVyIG91dHNpZGUgb2YgdGhpcyBmaWxlLCBzdWNoXG4gIC8vIGFzIGluIHRoZSBsYW5ndWFnZSBmaWxlcy5cbiAgalF1ZXJ5LmZuLnNlbGVjdDIuYW1kID0gUzI7XG5cbiAgLy8gUmV0dXJuIHRoZSBTZWxlY3QyIGluc3RhbmNlIGZvciBhbnlvbmUgd2hvIGlzIGltcG9ydGluZyBpdC5cbiAgcmV0dXJuIHNlbGVjdDI7XG59KSk7XG4iLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5lanM9ZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciBmcz1yZXF1aXJlKFwiZnNcIik7dmFyIHBhdGg9cmVxdWlyZShcInBhdGhcIik7dmFyIHV0aWxzPXJlcXVpcmUoXCIuL3V0aWxzXCIpO3ZhciBzY29wZU9wdGlvbldhcm5lZD1mYWxzZTt2YXIgX1ZFUlNJT05fU1RSSU5HPXJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIikudmVyc2lvbjt2YXIgX0RFRkFVTFRfT1BFTl9ERUxJTUlURVI9XCI8XCI7dmFyIF9ERUZBVUxUX0NMT1NFX0RFTElNSVRFUj1cIj5cIjt2YXIgX0RFRkFVTFRfREVMSU1JVEVSPVwiJVwiO3ZhciBfREVGQVVMVF9MT0NBTFNfTkFNRT1cImxvY2Fsc1wiO3ZhciBfTkFNRT1cImVqc1wiO3ZhciBfUkVHRVhfU1RSSU5HPVwiKDwlJXwlJT58PCU9fDwlLXw8JV98PCUjfDwlfCU+fC0lPnxfJT4pXCI7dmFyIF9PUFRTX1BBU1NBQkxFX1dJVEhfREFUQT1bXCJkZWxpbWl0ZXJcIixcInNjb3BlXCIsXCJjb250ZXh0XCIsXCJkZWJ1Z1wiLFwiY29tcGlsZURlYnVnXCIsXCJjbGllbnRcIixcIl93aXRoXCIsXCJybVdoaXRlc3BhY2VcIixcInN0cmljdFwiLFwiZmlsZW5hbWVcIixcImFzeW5jXCJdO3ZhciBfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEFfRVhQUkVTUz1fT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEuY29uY2F0KFwiY2FjaGVcIik7dmFyIF9CT009L15cXHVGRUZGLzt2YXIgX0pTX0lERU5USUZJRVI9L15bYS16QS1aXyRdWzAtOWEtekEtWl8kXSokLztleHBvcnRzLmNhY2hlPXV0aWxzLmNhY2hlO2V4cG9ydHMuZmlsZUxvYWRlcj1mcy5yZWFkRmlsZVN5bmM7ZXhwb3J0cy5sb2NhbHNOYW1lPV9ERUZBVUxUX0xPQ0FMU19OQU1FO2V4cG9ydHMucHJvbWlzZUltcGw9bmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXM7XCIpKCkuUHJvbWlzZTtleHBvcnRzLnJlc29sdmVJbmNsdWRlPWZ1bmN0aW9uKG5hbWUsZmlsZW5hbWUsaXNEaXIpe3ZhciBkaXJuYW1lPXBhdGguZGlybmFtZTt2YXIgZXh0bmFtZT1wYXRoLmV4dG5hbWU7dmFyIHJlc29sdmU9cGF0aC5yZXNvbHZlO3ZhciBpbmNsdWRlUGF0aD1yZXNvbHZlKGlzRGlyP2ZpbGVuYW1lOmRpcm5hbWUoZmlsZW5hbWUpLG5hbWUpO3ZhciBleHQ9ZXh0bmFtZShuYW1lKTtpZighZXh0KXtpbmNsdWRlUGF0aCs9XCIuZWpzXCJ9cmV0dXJuIGluY2x1ZGVQYXRofTtmdW5jdGlvbiByZXNvbHZlUGF0aHMobmFtZSxwYXRocyl7dmFyIGZpbGVQYXRoO2lmKHBhdGhzLnNvbWUoZnVuY3Rpb24odil7ZmlsZVBhdGg9ZXhwb3J0cy5yZXNvbHZlSW5jbHVkZShuYW1lLHYsdHJ1ZSk7cmV0dXJuIGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpfSkpe3JldHVybiBmaWxlUGF0aH19ZnVuY3Rpb24gZ2V0SW5jbHVkZVBhdGgocGF0aCxvcHRpb25zKXt2YXIgaW5jbHVkZVBhdGg7dmFyIGZpbGVQYXRoO3ZhciB2aWV3cz1vcHRpb25zLnZpZXdzO3ZhciBtYXRjaD0vXltBLVphLXpdKzpcXFxcfF5cXC8vLmV4ZWMocGF0aCk7aWYobWF0Y2gmJm1hdGNoLmxlbmd0aCl7cGF0aD1wYXRoLnJlcGxhY2UoL15cXC8qLyxcIlwiKTtpZihBcnJheS5pc0FycmF5KG9wdGlvbnMucm9vdCkpe2luY2x1ZGVQYXRoPXJlc29sdmVQYXRocyhwYXRoLG9wdGlvbnMucm9vdCl9ZWxzZXtpbmNsdWRlUGF0aD1leHBvcnRzLnJlc29sdmVJbmNsdWRlKHBhdGgsb3B0aW9ucy5yb290fHxcIi9cIix0cnVlKX19ZWxzZXtpZihvcHRpb25zLmZpbGVuYW1lKXtmaWxlUGF0aD1leHBvcnRzLnJlc29sdmVJbmNsdWRlKHBhdGgsb3B0aW9ucy5maWxlbmFtZSk7aWYoZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpe2luY2x1ZGVQYXRoPWZpbGVQYXRofX1pZighaW5jbHVkZVBhdGgmJkFycmF5LmlzQXJyYXkodmlld3MpKXtpbmNsdWRlUGF0aD1yZXNvbHZlUGF0aHMocGF0aCx2aWV3cyl9aWYoIWluY2x1ZGVQYXRoJiZ0eXBlb2Ygb3B0aW9ucy5pbmNsdWRlciE9PVwiZnVuY3Rpb25cIil7dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0aGUgaW5jbHVkZSBmaWxlIFwiJytvcHRpb25zLmVzY2FwZUZ1bmN0aW9uKHBhdGgpKydcIicpfX1yZXR1cm4gaW5jbHVkZVBhdGh9ZnVuY3Rpb24gaGFuZGxlQ2FjaGUob3B0aW9ucyx0ZW1wbGF0ZSl7dmFyIGZ1bmM7dmFyIGZpbGVuYW1lPW9wdGlvbnMuZmlsZW5hbWU7dmFyIGhhc1RlbXBsYXRlPWFyZ3VtZW50cy5sZW5ndGg+MTtpZihvcHRpb25zLmNhY2hlKXtpZighZmlsZW5hbWUpe3Rocm93IG5ldyBFcnJvcihcImNhY2hlIG9wdGlvbiByZXF1aXJlcyBhIGZpbGVuYW1lXCIpfWZ1bmM9ZXhwb3J0cy5jYWNoZS5nZXQoZmlsZW5hbWUpO2lmKGZ1bmMpe3JldHVybiBmdW5jfWlmKCFoYXNUZW1wbGF0ZSl7dGVtcGxhdGU9ZmlsZUxvYWRlcihmaWxlbmFtZSkudG9TdHJpbmcoKS5yZXBsYWNlKF9CT00sXCJcIil9fWVsc2UgaWYoIWhhc1RlbXBsYXRlKXtpZighZmlsZW5hbWUpe3Rocm93IG5ldyBFcnJvcihcIkludGVybmFsIEVKUyBlcnJvcjogbm8gZmlsZSBuYW1lIG9yIHRlbXBsYXRlIFwiK1wicHJvdmlkZWRcIil9dGVtcGxhdGU9ZmlsZUxvYWRlcihmaWxlbmFtZSkudG9TdHJpbmcoKS5yZXBsYWNlKF9CT00sXCJcIil9ZnVuYz1leHBvcnRzLmNvbXBpbGUodGVtcGxhdGUsb3B0aW9ucyk7aWYob3B0aW9ucy5jYWNoZSl7ZXhwb3J0cy5jYWNoZS5zZXQoZmlsZW5hbWUsZnVuYyl9cmV0dXJuIGZ1bmN9ZnVuY3Rpb24gdHJ5SGFuZGxlQ2FjaGUob3B0aW9ucyxkYXRhLGNiKXt2YXIgcmVzdWx0O2lmKCFjYil7aWYodHlwZW9mIGV4cG9ydHMucHJvbWlzZUltcGw9PVwiZnVuY3Rpb25cIil7cmV0dXJuIG5ldyBleHBvcnRzLnByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXt0cnl7cmVzdWx0PWhhbmRsZUNhY2hlKG9wdGlvbnMpKGRhdGEpO3Jlc29sdmUocmVzdWx0KX1jYXRjaChlcnIpe3JlamVjdChlcnIpfX0pfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHByb3ZpZGUgYSBjYWxsYmFjayBmdW5jdGlvblwiKX19ZWxzZXt0cnl7cmVzdWx0PWhhbmRsZUNhY2hlKG9wdGlvbnMpKGRhdGEpfWNhdGNoKGVycil7cmV0dXJuIGNiKGVycil9Y2IobnVsbCxyZXN1bHQpfX1mdW5jdGlvbiBmaWxlTG9hZGVyKGZpbGVQYXRoKXtyZXR1cm4gZXhwb3J0cy5maWxlTG9hZGVyKGZpbGVQYXRoKX1mdW5jdGlvbiBpbmNsdWRlRmlsZShwYXRoLG9wdGlvbnMpe3ZhciBvcHRzPXV0aWxzLnNoYWxsb3dDb3B5KHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKSxvcHRpb25zKTtvcHRzLmZpbGVuYW1lPWdldEluY2x1ZGVQYXRoKHBhdGgsb3B0cyk7aWYodHlwZW9mIG9wdGlvbnMuaW5jbHVkZXI9PT1cImZ1bmN0aW9uXCIpe3ZhciBpbmNsdWRlclJlc3VsdD1vcHRpb25zLmluY2x1ZGVyKHBhdGgsb3B0cy5maWxlbmFtZSk7aWYoaW5jbHVkZXJSZXN1bHQpe2lmKGluY2x1ZGVyUmVzdWx0LmZpbGVuYW1lKXtvcHRzLmZpbGVuYW1lPWluY2x1ZGVyUmVzdWx0LmZpbGVuYW1lfWlmKGluY2x1ZGVyUmVzdWx0LnRlbXBsYXRlKXtyZXR1cm4gaGFuZGxlQ2FjaGUob3B0cyxpbmNsdWRlclJlc3VsdC50ZW1wbGF0ZSl9fX1yZXR1cm4gaGFuZGxlQ2FjaGUob3B0cyl9ZnVuY3Rpb24gcmV0aHJvdyhlcnIsc3RyLGZsbm0sbGluZW5vLGVzYyl7dmFyIGxpbmVzPXN0ci5zcGxpdChcIlxcblwiKTt2YXIgc3RhcnQ9TWF0aC5tYXgobGluZW5vLTMsMCk7dmFyIGVuZD1NYXRoLm1pbihsaW5lcy5sZW5ndGgsbGluZW5vKzMpO3ZhciBmaWxlbmFtZT1lc2MoZmxubSk7dmFyIGNvbnRleHQ9bGluZXMuc2xpY2Uoc3RhcnQsZW5kKS5tYXAoZnVuY3Rpb24obGluZSxpKXt2YXIgY3Vycj1pK3N0YXJ0KzE7cmV0dXJuKGN1cnI9PWxpbmVubz9cIiA+PiBcIjpcIiAgICBcIikrY3VycitcInwgXCIrbGluZX0pLmpvaW4oXCJcXG5cIik7ZXJyLnBhdGg9ZmlsZW5hbWU7ZXJyLm1lc3NhZ2U9KGZpbGVuYW1lfHxcImVqc1wiKStcIjpcIitsaW5lbm8rXCJcXG5cIitjb250ZXh0K1wiXFxuXFxuXCIrZXJyLm1lc3NhZ2U7dGhyb3cgZXJyfWZ1bmN0aW9uIHN0cmlwU2VtaShzdHIpe3JldHVybiBzdHIucmVwbGFjZSgvOyhcXHMqJCkvLFwiJDFcIil9ZXhwb3J0cy5jb21waWxlPWZ1bmN0aW9uIGNvbXBpbGUodGVtcGxhdGUsb3B0cyl7dmFyIHRlbXBsO2lmKG9wdHMmJm9wdHMuc2NvcGUpe2lmKCFzY29wZU9wdGlvbldhcm5lZCl7Y29uc29sZS53YXJuKFwiYHNjb3BlYCBvcHRpb24gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIEVKUyAzXCIpO3Njb3BlT3B0aW9uV2FybmVkPXRydWV9aWYoIW9wdHMuY29udGV4dCl7b3B0cy5jb250ZXh0PW9wdHMuc2NvcGV9ZGVsZXRlIG9wdHMuc2NvcGV9dGVtcGw9bmV3IFRlbXBsYXRlKHRlbXBsYXRlLG9wdHMpO3JldHVybiB0ZW1wbC5jb21waWxlKCl9O2V4cG9ydHMucmVuZGVyPWZ1bmN0aW9uKHRlbXBsYXRlLGQsbyl7dmFyIGRhdGE9ZHx8dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpO3ZhciBvcHRzPW98fHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKTtpZihhcmd1bWVudHMubGVuZ3RoPT0yKXt1dGlscy5zaGFsbG93Q29weUZyb21MaXN0KG9wdHMsZGF0YSxfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEpfXJldHVybiBoYW5kbGVDYWNoZShvcHRzLHRlbXBsYXRlKShkYXRhKX07ZXhwb3J0cy5yZW5kZXJGaWxlPWZ1bmN0aW9uKCl7dmFyIGFyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTt2YXIgZmlsZW5hbWU9YXJncy5zaGlmdCgpO3ZhciBjYjt2YXIgb3B0cz17ZmlsZW5hbWU6ZmlsZW5hbWV9O3ZhciBkYXRhO3ZhciB2aWV3T3B0cztpZih0eXBlb2YgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGgtMV09PVwiZnVuY3Rpb25cIil7Y2I9YXJncy5wb3AoKX1pZihhcmdzLmxlbmd0aCl7ZGF0YT1hcmdzLnNoaWZ0KCk7aWYoYXJncy5sZW5ndGgpe3V0aWxzLnNoYWxsb3dDb3B5KG9wdHMsYXJncy5wb3AoKSl9ZWxzZXtpZihkYXRhLnNldHRpbmdzKXtpZihkYXRhLnNldHRpbmdzLnZpZXdzKXtvcHRzLnZpZXdzPWRhdGEuc2V0dGluZ3Mudmlld3N9aWYoZGF0YS5zZXR0aW5nc1tcInZpZXcgY2FjaGVcIl0pe29wdHMuY2FjaGU9dHJ1ZX12aWV3T3B0cz1kYXRhLnNldHRpbmdzW1widmlldyBvcHRpb25zXCJdO2lmKHZpZXdPcHRzKXt1dGlscy5zaGFsbG93Q29weShvcHRzLHZpZXdPcHRzKX19dXRpbHMuc2hhbGxvd0NvcHlGcm9tTGlzdChvcHRzLGRhdGEsX09QVFNfUEFTU0FCTEVfV0lUSF9EQVRBX0VYUFJFU1MpfW9wdHMuZmlsZW5hbWU9ZmlsZW5hbWV9ZWxzZXtkYXRhPXV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKX1yZXR1cm4gdHJ5SGFuZGxlQ2FjaGUob3B0cyxkYXRhLGNiKX07ZXhwb3J0cy5UZW1wbGF0ZT1UZW1wbGF0ZTtleHBvcnRzLmNsZWFyQ2FjaGU9ZnVuY3Rpb24oKXtleHBvcnRzLmNhY2hlLnJlc2V0KCl9O2Z1bmN0aW9uIFRlbXBsYXRlKHRleHQsb3B0c1BhcmFtKXt2YXIgb3B0cz11dGlscy5oYXNPd25Pbmx5T2JqZWN0KG9wdHNQYXJhbSk7dmFyIG9wdGlvbnM9dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpO3RoaXMudGVtcGxhdGVUZXh0PXRleHQ7dGhpcy5tb2RlPW51bGw7dGhpcy50cnVuY2F0ZT1mYWxzZTt0aGlzLmN1cnJlbnRMaW5lPTE7dGhpcy5zb3VyY2U9XCJcIjtvcHRpb25zLmNsaWVudD1vcHRzLmNsaWVudHx8ZmFsc2U7b3B0aW9ucy5lc2NhcGVGdW5jdGlvbj1vcHRzLmVzY2FwZXx8b3B0cy5lc2NhcGVGdW5jdGlvbnx8dXRpbHMuZXNjYXBlWE1MO29wdGlvbnMuY29tcGlsZURlYnVnPW9wdHMuY29tcGlsZURlYnVnIT09ZmFsc2U7b3B0aW9ucy5kZWJ1Zz0hIW9wdHMuZGVidWc7b3B0aW9ucy5maWxlbmFtZT1vcHRzLmZpbGVuYW1lO29wdGlvbnMub3BlbkRlbGltaXRlcj1vcHRzLm9wZW5EZWxpbWl0ZXJ8fGV4cG9ydHMub3BlbkRlbGltaXRlcnx8X0RFRkFVTFRfT1BFTl9ERUxJTUlURVI7b3B0aW9ucy5jbG9zZURlbGltaXRlcj1vcHRzLmNsb3NlRGVsaW1pdGVyfHxleHBvcnRzLmNsb3NlRGVsaW1pdGVyfHxfREVGQVVMVF9DTE9TRV9ERUxJTUlURVI7b3B0aW9ucy5kZWxpbWl0ZXI9b3B0cy5kZWxpbWl0ZXJ8fGV4cG9ydHMuZGVsaW1pdGVyfHxfREVGQVVMVF9ERUxJTUlURVI7b3B0aW9ucy5zdHJpY3Q9b3B0cy5zdHJpY3R8fGZhbHNlO29wdGlvbnMuY29udGV4dD1vcHRzLmNvbnRleHQ7b3B0aW9ucy5jYWNoZT1vcHRzLmNhY2hlfHxmYWxzZTtvcHRpb25zLnJtV2hpdGVzcGFjZT1vcHRzLnJtV2hpdGVzcGFjZTtvcHRpb25zLnJvb3Q9b3B0cy5yb290O29wdGlvbnMuaW5jbHVkZXI9b3B0cy5pbmNsdWRlcjtvcHRpb25zLm91dHB1dEZ1bmN0aW9uTmFtZT1vcHRzLm91dHB1dEZ1bmN0aW9uTmFtZTtvcHRpb25zLmxvY2Fsc05hbWU9b3B0cy5sb2NhbHNOYW1lfHxleHBvcnRzLmxvY2Fsc05hbWV8fF9ERUZBVUxUX0xPQ0FMU19OQU1FO29wdGlvbnMudmlld3M9b3B0cy52aWV3cztvcHRpb25zLmFzeW5jPW9wdHMuYXN5bmM7b3B0aW9ucy5kZXN0cnVjdHVyZWRMb2NhbHM9b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHM7b3B0aW9ucy5sZWdhY3lJbmNsdWRlPXR5cGVvZiBvcHRzLmxlZ2FjeUluY2x1ZGUhPVwidW5kZWZpbmVkXCI/ISFvcHRzLmxlZ2FjeUluY2x1ZGU6dHJ1ZTtpZihvcHRpb25zLnN0cmljdCl7b3B0aW9ucy5fd2l0aD1mYWxzZX1lbHNle29wdGlvbnMuX3dpdGg9dHlwZW9mIG9wdHMuX3dpdGghPVwidW5kZWZpbmVkXCI/b3B0cy5fd2l0aDp0cnVlfXRoaXMub3B0cz1vcHRpb25zO3RoaXMucmVnZXg9dGhpcy5jcmVhdGVSZWdleCgpfVRlbXBsYXRlLm1vZGVzPXtFVkFMOlwiZXZhbFwiLEVTQ0FQRUQ6XCJlc2NhcGVkXCIsUkFXOlwicmF3XCIsQ09NTUVOVDpcImNvbW1lbnRcIixMSVRFUkFMOlwibGl0ZXJhbFwifTtUZW1wbGF0ZS5wcm90b3R5cGU9e2NyZWF0ZVJlZ2V4OmZ1bmN0aW9uKCl7dmFyIHN0cj1fUkVHRVhfU1RSSU5HO3ZhciBkZWxpbT11dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMuZGVsaW1pdGVyKTt2YXIgb3Blbj11dGlscy5lc2NhcGVSZWdFeHBDaGFycyh0aGlzLm9wdHMub3BlbkRlbGltaXRlcik7dmFyIGNsb3NlPXV0aWxzLmVzY2FwZVJlZ0V4cENoYXJzKHRoaXMub3B0cy5jbG9zZURlbGltaXRlcik7c3RyPXN0ci5yZXBsYWNlKC8lL2csZGVsaW0pLnJlcGxhY2UoLzwvZyxvcGVuKS5yZXBsYWNlKC8+L2csY2xvc2UpO3JldHVybiBuZXcgUmVnRXhwKHN0cil9LGNvbXBpbGU6ZnVuY3Rpb24oKXt2YXIgc3JjO3ZhciBmbjt2YXIgb3B0cz10aGlzLm9wdHM7dmFyIHByZXBlbmRlZD1cIlwiO3ZhciBhcHBlbmRlZD1cIlwiO3ZhciBlc2NhcGVGbj1vcHRzLmVzY2FwZUZ1bmN0aW9uO3ZhciBjdG9yO3ZhciBzYW5pdGl6ZWRGaWxlbmFtZT1vcHRzLmZpbGVuYW1lP0pTT04uc3RyaW5naWZ5KG9wdHMuZmlsZW5hbWUpOlwidW5kZWZpbmVkXCI7aWYoIXRoaXMuc291cmNlKXt0aGlzLmdlbmVyYXRlU291cmNlKCk7cHJlcGVuZGVkKz0nICB2YXIgX19vdXRwdXQgPSBcIlwiO1xcbicrXCIgIGZ1bmN0aW9uIF9fYXBwZW5kKHMpIHsgaWYgKHMgIT09IHVuZGVmaW5lZCAmJiBzICE9PSBudWxsKSBfX291dHB1dCArPSBzIH1cXG5cIjtpZihvcHRzLm91dHB1dEZ1bmN0aW9uTmFtZSl7aWYoIV9KU19JREVOVElGSUVSLnRlc3Qob3B0cy5vdXRwdXRGdW5jdGlvbk5hbWUpKXt0aHJvdyBuZXcgRXJyb3IoXCJvdXRwdXRGdW5jdGlvbk5hbWUgaXMgbm90IGEgdmFsaWQgSlMgaWRlbnRpZmllci5cIil9cHJlcGVuZGVkKz1cIiAgdmFyIFwiK29wdHMub3V0cHV0RnVuY3Rpb25OYW1lK1wiID0gX19hcHBlbmQ7XCIrXCJcXG5cIn1pZihvcHRzLmxvY2Fsc05hbWUmJiFfSlNfSURFTlRJRklFUi50ZXN0KG9wdHMubG9jYWxzTmFtZSkpe3Rocm93IG5ldyBFcnJvcihcImxvY2Fsc05hbWUgaXMgbm90IGEgdmFsaWQgSlMgaWRlbnRpZmllci5cIil9aWYob3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMmJm9wdHMuZGVzdHJ1Y3R1cmVkTG9jYWxzLmxlbmd0aCl7dmFyIGRlc3RydWN0dXJpbmc9XCIgIHZhciBfX2xvY2FscyA9IChcIitvcHRzLmxvY2Fsc05hbWUrXCIgfHwge30pLFxcblwiO2Zvcih2YXIgaT0wO2k8b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHMubGVuZ3RoO2krKyl7dmFyIG5hbWU9b3B0cy5kZXN0cnVjdHVyZWRMb2NhbHNbaV07aWYoIV9KU19JREVOVElGSUVSLnRlc3QobmFtZSkpe3Rocm93IG5ldyBFcnJvcihcImRlc3RydWN0dXJlZExvY2Fsc1tcIitpK1wiXSBpcyBub3QgYSB2YWxpZCBKUyBpZGVudGlmaWVyLlwiKX1pZihpPjApe2Rlc3RydWN0dXJpbmcrPVwiLFxcbiAgXCJ9ZGVzdHJ1Y3R1cmluZys9bmFtZStcIiA9IF9fbG9jYWxzLlwiK25hbWV9cHJlcGVuZGVkKz1kZXN0cnVjdHVyaW5nK1wiO1xcblwifWlmKG9wdHMuX3dpdGghPT1mYWxzZSl7cHJlcGVuZGVkKz1cIiAgd2l0aCAoXCIrb3B0cy5sb2NhbHNOYW1lK1wiIHx8IHt9KSB7XCIrXCJcXG5cIjthcHBlbmRlZCs9XCIgIH1cIitcIlxcblwifWFwcGVuZGVkKz1cIiAgcmV0dXJuIF9fb3V0cHV0O1wiK1wiXFxuXCI7dGhpcy5zb3VyY2U9cHJlcGVuZGVkK3RoaXMuc291cmNlK2FwcGVuZGVkfWlmKG9wdHMuY29tcGlsZURlYnVnKXtzcmM9XCJ2YXIgX19saW5lID0gMVwiK1wiXFxuXCIrXCIgICwgX19saW5lcyA9IFwiK0pTT04uc3RyaW5naWZ5KHRoaXMudGVtcGxhdGVUZXh0KStcIlxcblwiK1wiICAsIF9fZmlsZW5hbWUgPSBcIitzYW5pdGl6ZWRGaWxlbmFtZStcIjtcIitcIlxcblwiK1widHJ5IHtcIitcIlxcblwiK3RoaXMuc291cmNlK1wifSBjYXRjaCAoZSkge1wiK1wiXFxuXCIrXCIgIHJldGhyb3coZSwgX19saW5lcywgX19maWxlbmFtZSwgX19saW5lLCBlc2NhcGVGbik7XCIrXCJcXG5cIitcIn1cIitcIlxcblwifWVsc2V7c3JjPXRoaXMuc291cmNlfWlmKG9wdHMuY2xpZW50KXtzcmM9XCJlc2NhcGVGbiA9IGVzY2FwZUZuIHx8IFwiK2VzY2FwZUZuLnRvU3RyaW5nKCkrXCI7XCIrXCJcXG5cIitzcmM7aWYob3B0cy5jb21waWxlRGVidWcpe3NyYz1cInJldGhyb3cgPSByZXRocm93IHx8IFwiK3JldGhyb3cudG9TdHJpbmcoKStcIjtcIitcIlxcblwiK3NyY319aWYob3B0cy5zdHJpY3Qpe3NyYz0nXCJ1c2Ugc3RyaWN0XCI7XFxuJytzcmN9aWYob3B0cy5kZWJ1Zyl7Y29uc29sZS5sb2coc3JjKX1pZihvcHRzLmNvbXBpbGVEZWJ1ZyYmb3B0cy5maWxlbmFtZSl7c3JjPXNyYytcIlxcblwiK1wiLy8jIHNvdXJjZVVSTD1cIitzYW5pdGl6ZWRGaWxlbmFtZStcIlxcblwifXRyeXtpZihvcHRzLmFzeW5jKXt0cnl7Y3Rvcj1uZXcgRnVuY3Rpb24oXCJyZXR1cm4gKGFzeW5jIGZ1bmN0aW9uKCl7fSkuY29uc3RydWN0b3I7XCIpKCl9Y2F0Y2goZSl7aWYoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKXt0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgYXN5bmMvYXdhaXRcIil9ZWxzZXt0aHJvdyBlfX19ZWxzZXtjdG9yPUZ1bmN0aW9ufWZuPW5ldyBjdG9yKG9wdHMubG9jYWxzTmFtZStcIiwgZXNjYXBlRm4sIGluY2x1ZGUsIHJldGhyb3dcIixzcmMpfWNhdGNoKGUpe2lmKGUgaW5zdGFuY2VvZiBTeW50YXhFcnJvcil7aWYob3B0cy5maWxlbmFtZSl7ZS5tZXNzYWdlKz1cIiBpbiBcIitvcHRzLmZpbGVuYW1lfWUubWVzc2FnZSs9XCIgd2hpbGUgY29tcGlsaW5nIGVqc1xcblxcblwiO2UubWVzc2FnZSs9XCJJZiB0aGUgYWJvdmUgZXJyb3IgaXMgbm90IGhlbHBmdWwsIHlvdSBtYXkgd2FudCB0byB0cnkgRUpTLUxpbnQ6XFxuXCI7ZS5tZXNzYWdlKz1cImh0dHBzOi8vZ2l0aHViLmNvbS9SeWFuWmltL0VKUy1MaW50XCI7aWYoIW9wdHMuYXN5bmMpe2UubWVzc2FnZSs9XCJcXG5cIjtlLm1lc3NhZ2UrPVwiT3IsIGlmIHlvdSBtZWFudCB0byBjcmVhdGUgYW4gYXN5bmMgZnVuY3Rpb24sIHBhc3MgYGFzeW5jOiB0cnVlYCBhcyBhbiBvcHRpb24uXCJ9fXRocm93IGV9dmFyIHJldHVybmVkRm49b3B0cy5jbGllbnQ/Zm46ZnVuY3Rpb24gYW5vbnltb3VzKGRhdGEpe3ZhciBpbmNsdWRlPWZ1bmN0aW9uKHBhdGgsaW5jbHVkZURhdGEpe3ZhciBkPXV0aWxzLnNoYWxsb3dDb3B5KHV0aWxzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGUoKSxkYXRhKTtpZihpbmNsdWRlRGF0YSl7ZD11dGlscy5zaGFsbG93Q29weShkLGluY2x1ZGVEYXRhKX1yZXR1cm4gaW5jbHVkZUZpbGUocGF0aCxvcHRzKShkKX07cmV0dXJuIGZuLmFwcGx5KG9wdHMuY29udGV4dCxbZGF0YXx8dXRpbHMuY3JlYXRlTnVsbFByb3RvT2JqV2hlcmVQb3NzaWJsZSgpLGVzY2FwZUZuLGluY2x1ZGUscmV0aHJvd10pfTtpZihvcHRzLmZpbGVuYW1lJiZ0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5PT09XCJmdW5jdGlvblwiKXt2YXIgZmlsZW5hbWU9b3B0cy5maWxlbmFtZTt2YXIgYmFzZW5hbWU9cGF0aC5iYXNlbmFtZShmaWxlbmFtZSxwYXRoLmV4dG5hbWUoZmlsZW5hbWUpKTt0cnl7T2JqZWN0LmRlZmluZVByb3BlcnR5KHJldHVybmVkRm4sXCJuYW1lXCIse3ZhbHVlOmJhc2VuYW1lLHdyaXRhYmxlOmZhbHNlLGVudW1lcmFibGU6ZmFsc2UsY29uZmlndXJhYmxlOnRydWV9KX1jYXRjaChlKXt9fXJldHVybiByZXR1cm5lZEZufSxnZW5lcmF0ZVNvdXJjZTpmdW5jdGlvbigpe3ZhciBvcHRzPXRoaXMub3B0cztpZihvcHRzLnJtV2hpdGVzcGFjZSl7dGhpcy50ZW1wbGF0ZVRleHQ9dGhpcy50ZW1wbGF0ZVRleHQucmVwbGFjZSgvW1xcclxcbl0rL2csXCJcXG5cIikucmVwbGFjZSgvXlxccyt8XFxzKyQvZ20sXCJcIil9dGhpcy50ZW1wbGF0ZVRleHQ9dGhpcy50ZW1wbGF0ZVRleHQucmVwbGFjZSgvWyBcXHRdKjwlXy9nbSxcIjwlX1wiKS5yZXBsYWNlKC9fJT5bIFxcdF0qL2dtLFwiXyU+XCIpO3ZhciBzZWxmPXRoaXM7dmFyIG1hdGNoZXM9dGhpcy5wYXJzZVRlbXBsYXRlVGV4dCgpO3ZhciBkPXRoaXMub3B0cy5kZWxpbWl0ZXI7dmFyIG89dGhpcy5vcHRzLm9wZW5EZWxpbWl0ZXI7dmFyIGM9dGhpcy5vcHRzLmNsb3NlRGVsaW1pdGVyO2lmKG1hdGNoZXMmJm1hdGNoZXMubGVuZ3RoKXttYXRjaGVzLmZvckVhY2goZnVuY3Rpb24obGluZSxpbmRleCl7dmFyIGNsb3Npbmc7aWYobGluZS5pbmRleE9mKG8rZCk9PT0wJiZsaW5lLmluZGV4T2YobytkK2QpIT09MCl7Y2xvc2luZz1tYXRjaGVzW2luZGV4KzJdO2lmKCEoY2xvc2luZz09ZCtjfHxjbG9zaW5nPT1cIi1cIitkK2N8fGNsb3Npbmc9PVwiX1wiK2QrYykpe3Rocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgbWF0Y2hpbmcgY2xvc2UgdGFnIGZvciBcIicrbGluZSsnXCIuJyl9fXNlbGYuc2NhbkxpbmUobGluZSl9KX19LHBhcnNlVGVtcGxhdGVUZXh0OmZ1bmN0aW9uKCl7dmFyIHN0cj10aGlzLnRlbXBsYXRlVGV4dDt2YXIgcGF0PXRoaXMucmVnZXg7dmFyIHJlc3VsdD1wYXQuZXhlYyhzdHIpO3ZhciBhcnI9W107dmFyIGZpcnN0UG9zO3doaWxlKHJlc3VsdCl7Zmlyc3RQb3M9cmVzdWx0LmluZGV4O2lmKGZpcnN0UG9zIT09MCl7YXJyLnB1c2goc3RyLnN1YnN0cmluZygwLGZpcnN0UG9zKSk7c3RyPXN0ci5zbGljZShmaXJzdFBvcyl9YXJyLnB1c2gocmVzdWx0WzBdKTtzdHI9c3RyLnNsaWNlKHJlc3VsdFswXS5sZW5ndGgpO3Jlc3VsdD1wYXQuZXhlYyhzdHIpfWlmKHN0cil7YXJyLnB1c2goc3RyKX1yZXR1cm4gYXJyfSxfYWRkT3V0cHV0OmZ1bmN0aW9uKGxpbmUpe2lmKHRoaXMudHJ1bmNhdGUpe2xpbmU9bGluZS5yZXBsYWNlKC9eKD86XFxyXFxufFxccnxcXG4pLyxcIlwiKTt0aGlzLnRydW5jYXRlPWZhbHNlfWlmKCFsaW5lKXtyZXR1cm4gbGluZX1saW5lPWxpbmUucmVwbGFjZSgvXFxcXC9nLFwiXFxcXFxcXFxcIik7bGluZT1saW5lLnJlcGxhY2UoL1xcbi9nLFwiXFxcXG5cIik7bGluZT1saW5lLnJlcGxhY2UoL1xcci9nLFwiXFxcXHJcIik7bGluZT1saW5lLnJlcGxhY2UoL1wiL2csJ1xcXFxcIicpO3RoaXMuc291cmNlKz0nICAgIDsgX19hcHBlbmQoXCInK2xpbmUrJ1wiKScrXCJcXG5cIn0sc2NhbkxpbmU6ZnVuY3Rpb24obGluZSl7dmFyIHNlbGY9dGhpczt2YXIgZD10aGlzLm9wdHMuZGVsaW1pdGVyO3ZhciBvPXRoaXMub3B0cy5vcGVuRGVsaW1pdGVyO3ZhciBjPXRoaXMub3B0cy5jbG9zZURlbGltaXRlcjt2YXIgbmV3TGluZUNvdW50PTA7bmV3TGluZUNvdW50PWxpbmUuc3BsaXQoXCJcXG5cIikubGVuZ3RoLTE7c3dpdGNoKGxpbmUpe2Nhc2UgbytkOmNhc2UgbytkK1wiX1wiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5FVkFMO2JyZWFrO2Nhc2UgbytkK1wiPVwiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEO2JyZWFrO2Nhc2UgbytkK1wiLVwiOnRoaXMubW9kZT1UZW1wbGF0ZS5tb2Rlcy5SQVc7YnJlYWs7Y2FzZSBvK2QrXCIjXCI6dGhpcy5tb2RlPVRlbXBsYXRlLm1vZGVzLkNPTU1FTlQ7YnJlYWs7Y2FzZSBvK2QrZDp0aGlzLm1vZGU9VGVtcGxhdGUubW9kZXMuTElURVJBTDt0aGlzLnNvdXJjZSs9JyAgICA7IF9fYXBwZW5kKFwiJytsaW5lLnJlcGxhY2UobytkK2QsbytkKSsnXCIpJytcIlxcblwiO2JyZWFrO2Nhc2UgZCtkK2M6dGhpcy5tb2RlPVRlbXBsYXRlLm1vZGVzLkxJVEVSQUw7dGhpcy5zb3VyY2UrPScgICAgOyBfX2FwcGVuZChcIicrbGluZS5yZXBsYWNlKGQrZCtjLGQrYykrJ1wiKScrXCJcXG5cIjticmVhaztjYXNlIGQrYzpjYXNlXCItXCIrZCtjOmNhc2VcIl9cIitkK2M6aWYodGhpcy5tb2RlPT1UZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMKXt0aGlzLl9hZGRPdXRwdXQobGluZSl9dGhpcy5tb2RlPW51bGw7dGhpcy50cnVuY2F0ZT1saW5lLmluZGV4T2YoXCItXCIpPT09MHx8bGluZS5pbmRleE9mKFwiX1wiKT09PTA7YnJlYWs7ZGVmYXVsdDppZih0aGlzLm1vZGUpe3N3aXRjaCh0aGlzLm1vZGUpe2Nhc2UgVGVtcGxhdGUubW9kZXMuRVZBTDpjYXNlIFRlbXBsYXRlLm1vZGVzLkVTQ0FQRUQ6Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5SQVc6aWYobGluZS5sYXN0SW5kZXhPZihcIi8vXCIpPmxpbmUubGFzdEluZGV4T2YoXCJcXG5cIikpe2xpbmUrPVwiXFxuXCJ9fXN3aXRjaCh0aGlzLm1vZGUpe2Nhc2UgVGVtcGxhdGUubW9kZXMuRVZBTDp0aGlzLnNvdXJjZSs9XCIgICAgOyBcIitsaW5lK1wiXFxuXCI7YnJlYWs7Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5FU0NBUEVEOnRoaXMuc291cmNlKz1cIiAgICA7IF9fYXBwZW5kKGVzY2FwZUZuKFwiK3N0cmlwU2VtaShsaW5lKStcIikpXCIrXCJcXG5cIjticmVhaztjYXNlIFRlbXBsYXRlLm1vZGVzLlJBVzp0aGlzLnNvdXJjZSs9XCIgICAgOyBfX2FwcGVuZChcIitzdHJpcFNlbWkobGluZSkrXCIpXCIrXCJcXG5cIjticmVhaztjYXNlIFRlbXBsYXRlLm1vZGVzLkNPTU1FTlQ6YnJlYWs7Y2FzZSBUZW1wbGF0ZS5tb2Rlcy5MSVRFUkFMOnRoaXMuX2FkZE91dHB1dChsaW5lKTticmVha319ZWxzZXt0aGlzLl9hZGRPdXRwdXQobGluZSl9fWlmKHNlbGYub3B0cy5jb21waWxlRGVidWcmJm5ld0xpbmVDb3VudCl7dGhpcy5jdXJyZW50TGluZSs9bmV3TGluZUNvdW50O3RoaXMuc291cmNlKz1cIiAgICA7IF9fbGluZSA9IFwiK3RoaXMuY3VycmVudExpbmUrXCJcXG5cIn19fTtleHBvcnRzLmVzY2FwZVhNTD11dGlscy5lc2NhcGVYTUw7ZXhwb3J0cy5fX2V4cHJlc3M9ZXhwb3J0cy5yZW5kZXJGaWxlO2V4cG9ydHMuVkVSU0lPTj1fVkVSU0lPTl9TVFJJTkc7ZXhwb3J0cy5uYW1lPV9OQU1FO2lmKHR5cGVvZiB3aW5kb3chPVwidW5kZWZpbmVkXCIpe3dpbmRvdy5lanM9ZXhwb3J0c319LHtcIi4uL3BhY2thZ2UuanNvblwiOjYsXCIuL3V0aWxzXCI6MixmczozLHBhdGg6NH1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciByZWdFeHBDaGFycz0vW3xcXFxce30oKVtcXF1eJCsqPy5dL2c7dmFyIGhhc093blByb3BlcnR5PU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7dmFyIGhhc093bj1mdW5jdGlvbihvYmosa2V5KXtyZXR1cm4gaGFzT3duUHJvcGVydHkuYXBwbHkob2JqLFtrZXldKX07ZXhwb3J0cy5lc2NhcGVSZWdFeHBDaGFycz1mdW5jdGlvbihzdHJpbmcpe2lmKCFzdHJpbmcpe3JldHVyblwiXCJ9cmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVnRXhwQ2hhcnMsXCJcXFxcJCZcIil9O3ZhciBfRU5DT0RFX0hUTUxfUlVMRVM9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJiMzNDtcIixcIidcIjpcIiYjMzk7XCJ9O3ZhciBfTUFUQ0hfSFRNTD0vWyY8PidcIl0vZztmdW5jdGlvbiBlbmNvZGVfY2hhcihjKXtyZXR1cm4gX0VOQ09ERV9IVE1MX1JVTEVTW2NdfHxjfXZhciBlc2NhcGVGdW5jU3RyPVwidmFyIF9FTkNPREVfSFRNTF9SVUxFUyA9IHtcXG5cIisnICAgICAgXCImXCI6IFwiJmFtcDtcIlxcbicrJyAgICAsIFwiPFwiOiBcIiZsdDtcIlxcbicrJyAgICAsIFwiPlwiOiBcIiZndDtcIlxcbicrJyAgICAsIFxcJ1wiXFwnOiBcIiYjMzQ7XCJcXG4nKycgICAgLCBcIlxcJ1wiOiBcIiYjMzk7XCJcXG4nK1wiICAgIH1cXG5cIitcIiAgLCBfTUFUQ0hfSFRNTCA9IC9bJjw+J1xcXCJdL2c7XFxuXCIrXCJmdW5jdGlvbiBlbmNvZGVfY2hhcihjKSB7XFxuXCIrXCIgIHJldHVybiBfRU5DT0RFX0hUTUxfUlVMRVNbY10gfHwgYztcXG5cIitcIn07XFxuXCI7ZXhwb3J0cy5lc2NhcGVYTUw9ZnVuY3Rpb24obWFya3VwKXtyZXR1cm4gbWFya3VwPT11bmRlZmluZWQ/XCJcIjpTdHJpbmcobWFya3VwKS5yZXBsYWNlKF9NQVRDSF9IVE1MLGVuY29kZV9jaGFyKX07ZnVuY3Rpb24gZXNjYXBlWE1MVG9TdHJpbmcoKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcykrXCI7XFxuXCIrZXNjYXBlRnVuY1N0cn10cnl7aWYodHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eT09PVwiZnVuY3Rpb25cIil7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMuZXNjYXBlWE1MLFwidG9TdHJpbmdcIix7dmFsdWU6ZXNjYXBlWE1MVG9TdHJpbmd9KX1lbHNle2V4cG9ydHMuZXNjYXBlWE1MLnRvU3RyaW5nPWVzY2FwZVhNTFRvU3RyaW5nfX1jYXRjaChlcnIpe2NvbnNvbGUud2FybihcIlVuYWJsZSB0byBzZXQgZXNjYXBlWE1MLnRvU3RyaW5nIChpcyB0aGUgRnVuY3Rpb24gcHJvdG90eXBlIGZyb3plbj8pXCIpfWV4cG9ydHMuc2hhbGxvd0NvcHk9ZnVuY3Rpb24odG8sZnJvbSl7ZnJvbT1mcm9tfHx7fTtpZih0byE9PW51bGwmJnRvIT09dW5kZWZpbmVkKXtmb3IodmFyIHAgaW4gZnJvbSl7aWYoIWhhc093bihmcm9tLHApKXtjb250aW51ZX1pZihwPT09XCJfX3Byb3RvX19cInx8cD09PVwiY29uc3RydWN0b3JcIil7Y29udGludWV9dG9bcF09ZnJvbVtwXX19cmV0dXJuIHRvfTtleHBvcnRzLnNoYWxsb3dDb3B5RnJvbUxpc3Q9ZnVuY3Rpb24odG8sZnJvbSxsaXN0KXtsaXN0PWxpc3R8fFtdO2Zyb209ZnJvbXx8e307aWYodG8hPT1udWxsJiZ0byE9PXVuZGVmaW5lZCl7Zm9yKHZhciBpPTA7aTxsaXN0Lmxlbmd0aDtpKyspe3ZhciBwPWxpc3RbaV07aWYodHlwZW9mIGZyb21bcF0hPVwidW5kZWZpbmVkXCIpe2lmKCFoYXNPd24oZnJvbSxwKSl7Y29udGludWV9aWYocD09PVwiX19wcm90b19fXCJ8fHA9PT1cImNvbnN0cnVjdG9yXCIpe2NvbnRpbnVlfXRvW3BdPWZyb21bcF19fX1yZXR1cm4gdG99O2V4cG9ydHMuY2FjaGU9e19kYXRhOnt9LHNldDpmdW5jdGlvbihrZXksdmFsKXt0aGlzLl9kYXRhW2tleV09dmFsfSxnZXQ6ZnVuY3Rpb24oa2V5KXtyZXR1cm4gdGhpcy5fZGF0YVtrZXldfSxyZW1vdmU6ZnVuY3Rpb24oa2V5KXtkZWxldGUgdGhpcy5fZGF0YVtrZXldfSxyZXNldDpmdW5jdGlvbigpe3RoaXMuX2RhdGE9e319fTtleHBvcnRzLmh5cGhlblRvQ2FtZWw9ZnVuY3Rpb24oc3RyKXtyZXR1cm4gc3RyLnJlcGxhY2UoLy1bYS16XS9nLGZ1bmN0aW9uKG1hdGNoKXtyZXR1cm4gbWF0Y2hbMV0udG9VcHBlckNhc2UoKX0pfTtleHBvcnRzLmNyZWF0ZU51bGxQcm90b09ialdoZXJlUG9zc2libGU9ZnVuY3Rpb24oKXtpZih0eXBlb2YgT2JqZWN0LmNyZWF0ZT09XCJmdW5jdGlvblwiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKX19aWYoISh7X19wcm90b19fOm51bGx9aW5zdGFuY2VvZiBPYmplY3QpKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm57X19wcm90b19fOm51bGx9fX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm57fX19KCk7ZXhwb3J0cy5oYXNPd25Pbmx5T2JqZWN0PWZ1bmN0aW9uKG9iail7dmFyIG89ZXhwb3J0cy5jcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlKCk7Zm9yKHZhciBwIGluIG9iail7aWYoaGFzT3duKG9iaixwKSl7b1twXT1vYmpbcF19fXJldHVybiBvfX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe30se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihwcm9jZXNzKXtmdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cyxhbGxvd0Fib3ZlUm9vdCl7dmFyIHVwPTA7Zm9yKHZhciBpPXBhcnRzLmxlbmd0aC0xO2k+PTA7aS0tKXt2YXIgbGFzdD1wYXJ0c1tpXTtpZihsYXN0PT09XCIuXCIpe3BhcnRzLnNwbGljZShpLDEpfWVsc2UgaWYobGFzdD09PVwiLi5cIil7cGFydHMuc3BsaWNlKGksMSk7dXArK31lbHNlIGlmKHVwKXtwYXJ0cy5zcGxpY2UoaSwxKTt1cC0tfX1pZihhbGxvd0Fib3ZlUm9vdCl7Zm9yKDt1cC0tO3VwKXtwYXJ0cy51bnNoaWZ0KFwiLi5cIil9fXJldHVybiBwYXJ0c31leHBvcnRzLnJlc29sdmU9ZnVuY3Rpb24oKXt2YXIgcmVzb2x2ZWRQYXRoPVwiXCIscmVzb2x2ZWRBYnNvbHV0ZT1mYWxzZTtmb3IodmFyIGk9YXJndW1lbnRzLmxlbmd0aC0xO2k+PS0xJiYhcmVzb2x2ZWRBYnNvbHV0ZTtpLS0pe3ZhciBwYXRoPWk+PTA/YXJndW1lbnRzW2ldOnByb2Nlc3MuY3dkKCk7aWYodHlwZW9mIHBhdGghPT1cInN0cmluZ1wiKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3NcIil9ZWxzZSBpZighcGF0aCl7Y29udGludWV9cmVzb2x2ZWRQYXRoPXBhdGgrXCIvXCIrcmVzb2x2ZWRQYXRoO3Jlc29sdmVkQWJzb2x1dGU9cGF0aC5jaGFyQXQoMCk9PT1cIi9cIn1yZXNvbHZlZFBhdGg9bm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdChcIi9cIiksZnVuY3Rpb24ocCl7cmV0dXJuISFwfSksIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oXCIvXCIpO3JldHVybihyZXNvbHZlZEFic29sdXRlP1wiL1wiOlwiXCIpK3Jlc29sdmVkUGF0aHx8XCIuXCJ9O2V4cG9ydHMubm9ybWFsaXplPWZ1bmN0aW9uKHBhdGgpe3ZhciBpc0Fic29sdXRlPWV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSx0cmFpbGluZ1NsYXNoPXN1YnN0cihwYXRoLC0xKT09PVwiL1wiO3BhdGg9bm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoXCIvXCIpLGZ1bmN0aW9uKHApe3JldHVybiEhcH0pLCFpc0Fic29sdXRlKS5qb2luKFwiL1wiKTtpZighcGF0aCYmIWlzQWJzb2x1dGUpe3BhdGg9XCIuXCJ9aWYocGF0aCYmdHJhaWxpbmdTbGFzaCl7cGF0aCs9XCIvXCJ9cmV0dXJuKGlzQWJzb2x1dGU/XCIvXCI6XCJcIikrcGF0aH07ZXhwb3J0cy5pc0Fic29sdXRlPWZ1bmN0aW9uKHBhdGgpe3JldHVybiBwYXRoLmNoYXJBdCgwKT09PVwiL1wifTtleHBvcnRzLmpvaW49ZnVuY3Rpb24oKXt2YXIgcGF0aHM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApO3JldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsZnVuY3Rpb24ocCxpbmRleCl7aWYodHlwZW9mIHAhPT1cInN0cmluZ1wiKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3NcIil9cmV0dXJuIHB9KS5qb2luKFwiL1wiKSl9O2V4cG9ydHMucmVsYXRpdmU9ZnVuY3Rpb24oZnJvbSx0byl7ZnJvbT1leHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO3RvPWV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO2Z1bmN0aW9uIHRyaW0oYXJyKXt2YXIgc3RhcnQ9MDtmb3IoO3N0YXJ0PGFyci5sZW5ndGg7c3RhcnQrKyl7aWYoYXJyW3N0YXJ0XSE9PVwiXCIpYnJlYWt9dmFyIGVuZD1hcnIubGVuZ3RoLTE7Zm9yKDtlbmQ+PTA7ZW5kLS0pe2lmKGFycltlbmRdIT09XCJcIilicmVha31pZihzdGFydD5lbmQpcmV0dXJuW107cmV0dXJuIGFyci5zbGljZShzdGFydCxlbmQtc3RhcnQrMSl9dmFyIGZyb21QYXJ0cz10cmltKGZyb20uc3BsaXQoXCIvXCIpKTt2YXIgdG9QYXJ0cz10cmltKHRvLnNwbGl0KFwiL1wiKSk7dmFyIGxlbmd0aD1NYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLHRvUGFydHMubGVuZ3RoKTt2YXIgc2FtZVBhcnRzTGVuZ3RoPWxlbmd0aDtmb3IodmFyIGk9MDtpPGxlbmd0aDtpKyspe2lmKGZyb21QYXJ0c1tpXSE9PXRvUGFydHNbaV0pe3NhbWVQYXJ0c0xlbmd0aD1pO2JyZWFrfX12YXIgb3V0cHV0UGFydHM9W107Zm9yKHZhciBpPXNhbWVQYXJ0c0xlbmd0aDtpPGZyb21QYXJ0cy5sZW5ndGg7aSsrKXtvdXRwdXRQYXJ0cy5wdXNoKFwiLi5cIil9b3V0cHV0UGFydHM9b3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7cmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oXCIvXCIpfTtleHBvcnRzLnNlcD1cIi9cIjtleHBvcnRzLmRlbGltaXRlcj1cIjpcIjtleHBvcnRzLmRpcm5hbWU9ZnVuY3Rpb24ocGF0aCl7aWYodHlwZW9mIHBhdGghPT1cInN0cmluZ1wiKXBhdGg9cGF0aCtcIlwiO2lmKHBhdGgubGVuZ3RoPT09MClyZXR1cm5cIi5cIjt2YXIgY29kZT1wYXRoLmNoYXJDb2RlQXQoMCk7dmFyIGhhc1Jvb3Q9Y29kZT09PTQ3O3ZhciBlbmQ9LTE7dmFyIG1hdGNoZWRTbGFzaD10cnVlO2Zvcih2YXIgaT1wYXRoLmxlbmd0aC0xO2k+PTE7LS1pKXtjb2RlPXBhdGguY2hhckNvZGVBdChpKTtpZihjb2RlPT09NDcpe2lmKCFtYXRjaGVkU2xhc2gpe2VuZD1pO2JyZWFrfX1lbHNle21hdGNoZWRTbGFzaD1mYWxzZX19aWYoZW5kPT09LTEpcmV0dXJuIGhhc1Jvb3Q/XCIvXCI6XCIuXCI7aWYoaGFzUm9vdCYmZW5kPT09MSl7cmV0dXJuXCIvXCJ9cmV0dXJuIHBhdGguc2xpY2UoMCxlbmQpfTtmdW5jdGlvbiBiYXNlbmFtZShwYXRoKXtpZih0eXBlb2YgcGF0aCE9PVwic3RyaW5nXCIpcGF0aD1wYXRoK1wiXCI7dmFyIHN0YXJ0PTA7dmFyIGVuZD0tMTt2YXIgbWF0Y2hlZFNsYXNoPXRydWU7dmFyIGk7Zm9yKGk9cGF0aC5sZW5ndGgtMTtpPj0wOy0taSl7aWYocGF0aC5jaGFyQ29kZUF0KGkpPT09NDcpe2lmKCFtYXRjaGVkU2xhc2gpe3N0YXJ0PWkrMTticmVha319ZWxzZSBpZihlbmQ9PT0tMSl7bWF0Y2hlZFNsYXNoPWZhbHNlO2VuZD1pKzF9fWlmKGVuZD09PS0xKXJldHVyblwiXCI7cmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsZW5kKX1leHBvcnRzLmJhc2VuYW1lPWZ1bmN0aW9uKHBhdGgsZXh0KXt2YXIgZj1iYXNlbmFtZShwYXRoKTtpZihleHQmJmYuc3Vic3RyKC0xKmV4dC5sZW5ndGgpPT09ZXh0KXtmPWYuc3Vic3RyKDAsZi5sZW5ndGgtZXh0Lmxlbmd0aCl9cmV0dXJuIGZ9O2V4cG9ydHMuZXh0bmFtZT1mdW5jdGlvbihwYXRoKXtpZih0eXBlb2YgcGF0aCE9PVwic3RyaW5nXCIpcGF0aD1wYXRoK1wiXCI7dmFyIHN0YXJ0RG90PS0xO3ZhciBzdGFydFBhcnQ9MDt2YXIgZW5kPS0xO3ZhciBtYXRjaGVkU2xhc2g9dHJ1ZTt2YXIgcHJlRG90U3RhdGU9MDtmb3IodmFyIGk9cGF0aC5sZW5ndGgtMTtpPj0wOy0taSl7dmFyIGNvZGU9cGF0aC5jaGFyQ29kZUF0KGkpO2lmKGNvZGU9PT00Nyl7aWYoIW1hdGNoZWRTbGFzaCl7c3RhcnRQYXJ0PWkrMTticmVha31jb250aW51ZX1pZihlbmQ9PT0tMSl7bWF0Y2hlZFNsYXNoPWZhbHNlO2VuZD1pKzF9aWYoY29kZT09PTQ2KXtpZihzdGFydERvdD09PS0xKXN0YXJ0RG90PWk7ZWxzZSBpZihwcmVEb3RTdGF0ZSE9PTEpcHJlRG90U3RhdGU9MX1lbHNlIGlmKHN0YXJ0RG90IT09LTEpe3ByZURvdFN0YXRlPS0xfX1pZihzdGFydERvdD09PS0xfHxlbmQ9PT0tMXx8cHJlRG90U3RhdGU9PT0wfHxwcmVEb3RTdGF0ZT09PTEmJnN0YXJ0RG90PT09ZW5kLTEmJnN0YXJ0RG90PT09c3RhcnRQYXJ0KzEpe3JldHVyblwiXCJ9cmV0dXJuIHBhdGguc2xpY2Uoc3RhcnREb3QsZW5kKX07ZnVuY3Rpb24gZmlsdGVyKHhzLGYpe2lmKHhzLmZpbHRlcilyZXR1cm4geHMuZmlsdGVyKGYpO3ZhciByZXM9W107Zm9yKHZhciBpPTA7aTx4cy5sZW5ndGg7aSsrKXtpZihmKHhzW2ldLGkseHMpKXJlcy5wdXNoKHhzW2ldKX1yZXR1cm4gcmVzfXZhciBzdWJzdHI9XCJhYlwiLnN1YnN0cigtMSk9PT1cImJcIj9mdW5jdGlvbihzdHIsc3RhcnQsbGVuKXtyZXR1cm4gc3RyLnN1YnN0cihzdGFydCxsZW4pfTpmdW5jdGlvbihzdHIsc3RhcnQsbGVuKXtpZihzdGFydDwwKXN0YXJ0PXN0ci5sZW5ndGgrc3RhcnQ7cmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsbGVuKX19KS5jYWxsKHRoaXMscmVxdWlyZShcIl9wcm9jZXNzXCIpKX0se19wcm9jZXNzOjV9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXt2YXIgcHJvY2Vzcz1tb2R1bGUuZXhwb3J0cz17fTt2YXIgY2FjaGVkU2V0VGltZW91dDt2YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O2Z1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKXt0aHJvdyBuZXcgRXJyb3IoXCJzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkXCIpfWZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQoKXt0aHJvdyBuZXcgRXJyb3IoXCJjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWRcIil9KGZ1bmN0aW9uKCl7dHJ5e2lmKHR5cGVvZiBzZXRUaW1lb3V0PT09XCJmdW5jdGlvblwiKXtjYWNoZWRTZXRUaW1lb3V0PXNldFRpbWVvdXR9ZWxzZXtjYWNoZWRTZXRUaW1lb3V0PWRlZmF1bHRTZXRUaW1vdXR9fWNhdGNoKGUpe2NhY2hlZFNldFRpbWVvdXQ9ZGVmYXVsdFNldFRpbW91dH10cnl7aWYodHlwZW9mIGNsZWFyVGltZW91dD09PVwiZnVuY3Rpb25cIil7Y2FjaGVkQ2xlYXJUaW1lb3V0PWNsZWFyVGltZW91dH1lbHNle2NhY2hlZENsZWFyVGltZW91dD1kZWZhdWx0Q2xlYXJUaW1lb3V0fX1jYXRjaChlKXtjYWNoZWRDbGVhclRpbWVvdXQ9ZGVmYXVsdENsZWFyVGltZW91dH19KSgpO2Z1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKXtpZihjYWNoZWRTZXRUaW1lb3V0PT09c2V0VGltZW91dCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuLDApfWlmKChjYWNoZWRTZXRUaW1lb3V0PT09ZGVmYXVsdFNldFRpbW91dHx8IWNhY2hlZFNldFRpbWVvdXQpJiZzZXRUaW1lb3V0KXtjYWNoZWRTZXRUaW1lb3V0PXNldFRpbWVvdXQ7cmV0dXJuIHNldFRpbWVvdXQoZnVuLDApfXRyeXtyZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sMCl9Y2F0Y2goZSl7dHJ5e3JldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCxmdW4sMCl9Y2F0Y2goZSl7cmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLGZ1biwwKX19fWZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpe2lmKGNhY2hlZENsZWFyVGltZW91dD09PWNsZWFyVGltZW91dCl7cmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpfWlmKChjYWNoZWRDbGVhclRpbWVvdXQ9PT1kZWZhdWx0Q2xlYXJUaW1lb3V0fHwhY2FjaGVkQ2xlYXJUaW1lb3V0KSYmY2xlYXJUaW1lb3V0KXtjYWNoZWRDbGVhclRpbWVvdXQ9Y2xlYXJUaW1lb3V0O3JldHVybiBjbGVhclRpbWVvdXQobWFya2VyKX10cnl7cmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpfWNhdGNoKGUpe3RyeXtyZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCxtYXJrZXIpfWNhdGNoKGUpe3JldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLG1hcmtlcil9fX12YXIgcXVldWU9W107dmFyIGRyYWluaW5nPWZhbHNlO3ZhciBjdXJyZW50UXVldWU7dmFyIHF1ZXVlSW5kZXg9LTE7ZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCl7aWYoIWRyYWluaW5nfHwhY3VycmVudFF1ZXVlKXtyZXR1cm59ZHJhaW5pbmc9ZmFsc2U7aWYoY3VycmVudFF1ZXVlLmxlbmd0aCl7cXVldWU9Y3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSl9ZWxzZXtxdWV1ZUluZGV4PS0xfWlmKHF1ZXVlLmxlbmd0aCl7ZHJhaW5RdWV1ZSgpfX1mdW5jdGlvbiBkcmFpblF1ZXVlKCl7aWYoZHJhaW5pbmcpe3JldHVybn12YXIgdGltZW91dD1ydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7ZHJhaW5pbmc9dHJ1ZTt2YXIgbGVuPXF1ZXVlLmxlbmd0aDt3aGlsZShsZW4pe2N1cnJlbnRRdWV1ZT1xdWV1ZTtxdWV1ZT1bXTt3aGlsZSgrK3F1ZXVlSW5kZXg8bGVuKXtpZihjdXJyZW50UXVldWUpe2N1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKX19cXVldWVJbmRleD0tMTtsZW49cXVldWUubGVuZ3RofWN1cnJlbnRRdWV1ZT1udWxsO2RyYWluaW5nPWZhbHNlO3J1bkNsZWFyVGltZW91dCh0aW1lb3V0KX1wcm9jZXNzLm5leHRUaWNrPWZ1bmN0aW9uKGZ1bil7dmFyIGFyZ3M9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMSk7aWYoYXJndW1lbnRzLmxlbmd0aD4xKXtmb3IodmFyIGk9MTtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKXthcmdzW2ktMV09YXJndW1lbnRzW2ldfX1xdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1bixhcmdzKSk7aWYocXVldWUubGVuZ3RoPT09MSYmIWRyYWluaW5nKXtydW5UaW1lb3V0KGRyYWluUXVldWUpfX07ZnVuY3Rpb24gSXRlbShmdW4sYXJyYXkpe3RoaXMuZnVuPWZ1bjt0aGlzLmFycmF5PWFycmF5fUl0ZW0ucHJvdG90eXBlLnJ1bj1mdW5jdGlvbigpe3RoaXMuZnVuLmFwcGx5KG51bGwsdGhpcy5hcnJheSl9O3Byb2Nlc3MudGl0bGU9XCJicm93c2VyXCI7cHJvY2Vzcy5icm93c2VyPXRydWU7cHJvY2Vzcy5lbnY9e307cHJvY2Vzcy5hcmd2PVtdO3Byb2Nlc3MudmVyc2lvbj1cIlwiO3Byb2Nlc3MudmVyc2lvbnM9e307ZnVuY3Rpb24gbm9vcCgpe31wcm9jZXNzLm9uPW5vb3A7cHJvY2Vzcy5hZGRMaXN0ZW5lcj1ub29wO3Byb2Nlc3Mub25jZT1ub29wO3Byb2Nlc3Mub2ZmPW5vb3A7cHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcj1ub29wO3Byb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzPW5vb3A7cHJvY2Vzcy5lbWl0PW5vb3A7cHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXI9bm9vcDtwcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXI9bm9vcDtwcm9jZXNzLmxpc3RlbmVycz1mdW5jdGlvbihuYW1lKXtyZXR1cm5bXX07cHJvY2Vzcy5iaW5kaW5nPWZ1bmN0aW9uKG5hbWUpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpfTtwcm9jZXNzLmN3ZD1mdW5jdGlvbigpe3JldHVyblwiL1wifTtwcm9jZXNzLmNoZGlyPWZ1bmN0aW9uKGRpcil7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkXCIpfTtwcm9jZXNzLnVtYXNrPWZ1bmN0aW9uKCl7cmV0dXJuIDB9fSx7fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHM9e25hbWU6XCJlanNcIixkZXNjcmlwdGlvbjpcIkVtYmVkZGVkIEphdmFTY3JpcHQgdGVtcGxhdGVzXCIsa2V5d29yZHM6W1widGVtcGxhdGVcIixcImVuZ2luZVwiLFwiZWpzXCJdLHZlcnNpb246XCIzLjEuOVwiLGF1dGhvcjpcIk1hdHRoZXcgRWVybmlzc2UgPG1kZUBmbGVlZ2l4Lm9yZz4gKGh0dHA6Ly9mbGVlZ2l4Lm9yZylcIixsaWNlbnNlOlwiQXBhY2hlLTIuMFwiLGJpbjp7ZWpzOlwiLi9iaW4vY2xpLmpzXCJ9LG1haW46XCIuL2xpYi9lanMuanNcIixqc2RlbGl2cjpcImVqcy5taW4uanNcIix1bnBrZzpcImVqcy5taW4uanNcIixyZXBvc2l0b3J5Ont0eXBlOlwiZ2l0XCIsdXJsOlwiZ2l0Oi8vZ2l0aHViLmNvbS9tZGUvZWpzLmdpdFwifSxidWdzOlwiaHR0cHM6Ly9naXRodWIuY29tL21kZS9lanMvaXNzdWVzXCIsaG9tZXBhZ2U6XCJodHRwczovL2dpdGh1Yi5jb20vbWRlL2Vqc1wiLGRlcGVuZGVuY2llczp7amFrZTpcIl4xMC44LjVcIn0sZGV2RGVwZW5kZW5jaWVzOnticm93c2VyaWZ5OlwiXjE2LjUuMVwiLGVzbGludDpcIl42LjguMFwiLFwiZ2l0LWRpcmVjdG9yeS1kZXBsb3lcIjpcIl4xLjUuMVwiLGpzZG9jOlwiXjQuMC4yXCIsXCJscnUtY2FjaGVcIjpcIl40LjAuMVwiLG1vY2hhOlwiXjEwLjIuMFwiLFwidWdsaWZ5LWpzXCI6XCJeMy4zLjE2XCJ9LGVuZ2luZXM6e25vZGU6XCI+PTAuMTAuMFwifSxzY3JpcHRzOnt0ZXN0OlwibnB4IGpha2UgdGVzdFwifX19LHt9XX0se30sWzFdKSgxKX0pO1xuIiwiaW1wb3J0IHRlbXBsYXRlcyBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IHV0aWxzICAgICBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgJ3NlbGVjdDInO1xyXG5pbXBvcnQgJ2Vqcy9lanMubWluJztcclxuXHJcblxyXG5sZXQgZmllbGRQcml2YXRlID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC60L7QvdGC0LXQvdGC0LBcclxuICAgICAqIEBwYXJhbSB7RmllbGRTZWxlY3QyfSBmaWVsZFxyXG4gICAgICogQHJldHVybiB7Kn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNvbnRlbnQ6IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICAgICAgICA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgICAgICAgPSBmaWVsZC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZXMgICAgPSBbXTtcclxuICAgICAgICBsZXQgc2VsZWN0T3B0aW9ucyA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2F0dHInKSB8fFxyXG4gICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucy5hdHRyICE9PSAnb2JqZWN0JyB8fFxyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPT09IG51bGwgfHxcclxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvcHRpb25zLmF0dHIpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMubmFtZSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIubmFtZSA9IGZpZWxkLl9vcHRpb25zLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy53aWR0aCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmF0dHIgPSB1dGlscy5tZXJnZUF0dHIoXHJcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiAnd2lkdGg6JyArIG9wdGlvbnMud2lkdGggfSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXR0clxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyLnJlcXVpcmVkID0gJ3JlcXVpcmVkJztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAkLmVhY2goZmllbGQuX3NlbGVjdE9wdGlvbnMsIGZ1bmN0aW9uIChrZXksIG9wdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvcHRpb24gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zLnB1c2godGhhdC5yZW5kZXJPcHRpb24oZmllbGQuX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29wdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGtleSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBvcHRpb25cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0eXBlJykgJiYgdHlwZW9mIG9wdGlvbi50eXBlID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnR5cGVcclxuICAgICAgICAgICAgICAgICAgICA6ICdvcHRpb24nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnZ3JvdXAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlckF0dHIgICA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncm91cEF0dHIgICAgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JvdXBPcHRpb25zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uaGFzT3duUHJvcGVydHkoJ2F0dHInKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb3B0aW9uLmF0dHIgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICEgQXJyYXkuaXNBcnJheShvcHRpb24uYXR0cilcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBdHRyID0gb3B0aW9uLmF0dHI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmhhc093blByb3BlcnR5KCdsYWJlbCcpICYmIFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mKG9wdGlvbi5sYWJlbCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBdHRyLmxhYmVsID0gb3B0aW9uLmxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGdyb3VwQXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb24ub3B0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG9wdGlvbi5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBncm91cE9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBPcHRpb25zLnB1c2godGhhdC5yZW5kZXJPcHRpb24oZmllbGQuX3ZhbHVlLCBncm91cE9wdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdncm91cCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHI6IHJlbmRlckF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyByZW5kZXJBdHRyLmpvaW4oJyAnKSkgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogZ3JvdXBPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9ucy5wdXNoKHRoYXQucmVuZGVyT3B0aW9uKGZpZWxkLl92YWx1ZSwgb3B0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbnMuYXR0ciwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIodGVtcGxhdGVzWydzZWxlY3QuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIHJlYWRvbmx5OiBmYWxzZSxcclxuICAgICAgICAgICAgb3B0aW9uczogc2VsZWN0T3B0aW9ucyxcclxuICAgICAgICAgICAgYXR0cjogYXR0cmlidXRlcy5sZW5ndGggPiAwID8gKCcgJyArIGF0dHJpYnV0ZXMuam9pbignICcpKSA6ICcnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7RmllbGRTZWxlY3QyfSBmaWVsZFxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcmVuZGVyQ29udGVudFJlYWRvbmx5OiBmdW5jdGlvbiAoZmllbGQpIHtcclxuXHJcbiAgICAgICAgbGV0IHRoYXQgICAgICAgICAgICA9IGZpZWxkO1xyXG4gICAgICAgIGxldCBvcHRpb25zICAgICAgICAgPSBmaWVsZC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkT3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBvcHRpb25zLm9wdGlvbnMgPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkob3B0aW9ucy5vcHRpb25zKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAkLmVhY2gob3B0aW9ucy5vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCBvcHRpb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0eXBlJykgJiYgdHlwZW9mIG9wdGlvbi50eXBlID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnR5cGVcclxuICAgICAgICAgICAgICAgICAgICA6ICdvcHRpb24nO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnZ3JvdXAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uLm9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChvcHRpb24ub3B0aW9ucywgZnVuY3Rpb24gKGtleSwgZ3JvdXBPcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25UZXh0ID0gZ3JvdXBPcHRpb24uaGFzT3duUHJvcGVydHkoJ3RleHQnKSAmJiBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZihncm91cE9wdGlvbi50ZXh0KSkgPj0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZ3JvdXBPcHRpb24udGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhIG9wdGlvblRleHQgfHwgb3B0aW9uVGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhhdC5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHRoYXQuX3ZhbHVlLCBmdW5jdGlvbiAoa2V5LCBpdGVtVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1WYWx1ZSA9PSBncm91cE9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQuX3ZhbHVlID09IGdyb3VwT3B0aW9uLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25UZXh0ID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0ZXh0JykgJiYgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2Yob3B0aW9uLnRleHQpKSA+PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uLnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhIG9wdGlvblRleHQgfHwgb3B0aW9uVGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhhdC5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaCh0aGF0Ll92YWx1ZSwgZnVuY3Rpb24gKGtleSwgaXRlbVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVZhbHVlID09IG9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvblRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5fdmFsdWUgPT0gb3B0aW9uLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdGlvblRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIodGVtcGxhdGVzWydzZWxlY3QuaHRtbCddLCB7XHJcbiAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZE9wdGlvbnM6IHNlbGVjdGVkT3B0aW9ucyxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KHQsdC+0YDQutCwINC+0L/RhtC40LhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICAgICAgIG9wdGlvblxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcmVuZGVyT3B0aW9uOiBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbikge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uQXR0ciA9IFtdO1xyXG4gICAgICAgIGxldCBvcHRpb25UZXh0ID0gb3B0aW9uLmhhc093blByb3BlcnR5KCd0ZXh0JykgJiYgWydzdHJpbmcnLCAnbnVtYmVyJ10uaW5kZXhPZih0eXBlb2Yob3B0aW9uLnRleHQpKSA+PSAwXHJcbiAgICAgICAgICAgID8gb3B0aW9uLnRleHRcclxuICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgJC5lYWNoKG9wdGlvbiwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lICE9PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbkF0dHIucHVzaChuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgJC5lYWNoKHZhbHVlLCBmdW5jdGlvbiAoa2V5LCBpdGVtVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtVmFsdWUgPT0gb3B0aW9uLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uQXR0ci5wdXNoKCdzZWxlY3RlZD1cInNlbGVjdGVkXCInKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09IG9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICBvcHRpb25BdHRyLnB1c2goJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ29wdGlvbicsXHJcbiAgICAgICAgICAgIHRleHQ6IG9wdGlvblRleHQsXHJcbiAgICAgICAgICAgIGF0dHI6IG9wdGlvbkF0dHIubGVuZ3RoID4gMCA/ICgnICcgKyBvcHRpb25BdHRyLmpvaW4oJyAnKSkgOiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5XHJcbiAgICAgKiBAcGFyYW0ge0ZpZWxkU2VsZWN0Mn0gZmllbGRcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGluaXRFdmVudHM6IGZ1bmN0aW9uIChmaWVsZCkge1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyAgICAgICAgPSBmaWVsZC5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgbGV0IHNlbGVjdDJPcHRpb25zID0gb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0MicpICYmIHV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuc2VsZWN0MilcclxuICAgICAgICAgICAgPyBvcHRpb25zLnNlbGVjdDJcclxuICAgICAgICAgICAgOiB7fTtcclxuXHJcbiAgICAgICAgaWYgKCAhIHNlbGVjdDJPcHRpb25zLmhhc093blByb3BlcnR5KCd0aGVtZScpKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdDJPcHRpb25zLnRoZW1lID0gXCJib290c3RyYXAtNVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhIHNlbGVjdDJPcHRpb25zLmhhc093blByb3BlcnR5KCdsYW5ndWFnZScpKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtT3B0aW9ucyA9IGZpZWxkLl9mb3JtLmdldE9wdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybU9wdGlvbnMubGFuZyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdDJPcHRpb25zLmxhbmd1YWdlID0gZm9ybU9wdGlvbnMubGFuZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhIHNlbGVjdDJPcHRpb25zLmhhc093blByb3BlcnR5KCdjbG9zZU9uU2VsZWN0JykgJiZcclxuICAgICAgICAgICAgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnYXR0cicpICYmXHJcbiAgICAgICAgICAgIHV0aWxzLmlzT2JqZWN0KG9wdGlvbnMuYXR0cikgJiZcclxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyICYmXHJcbiAgICAgICAgICAgIG9wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnbXVsdGlwbGUnKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBzZWxlY3QyT3B0aW9ucy5jbG9zZU9uU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuY29udGVudC0nICsgZmllbGQuZ2V0Q29udGVudElkKCkgKyAnIHNlbGVjdCcpLnNlbGVjdDIoc2VsZWN0Mk9wdGlvbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWVsZFByaXZhdGU7IiwiXHJcbmltcG9ydCBmaWVsZFByaXZhdGUgZnJvbSAnLi9maWVsZC5wcml2YXRlJztcclxuXHJcblxyXG4vKipcclxuICpcclxuICovXHJcbmNsYXNzIEZpZWxkU2VsZWN0MiB7XHJcblxyXG4gICAgX2lkICAgICAgICAgICAgPSBudWxsO1xyXG4gICAgX2Zvcm0gICAgICAgICAgPSBudWxsO1xyXG4gICAgX2NvbnRlbnRJZCAgICAgPSAnJztcclxuICAgIF9yZWFkb25seSAgICAgID0gbnVsbDtcclxuICAgIF92YWx1ZSAgICAgICAgID0gbnVsbDtcclxuICAgIF9zZWxlY3RPcHRpb25zID0gW107XHJcblxyXG4gICAgX29wdGlvbnMgPSB7XHJcbiAgICAgICAgdHlwZTogJ3NlbGVjdDInLFxyXG4gICAgICAgIG5hbWU6IG51bGwsXHJcbiAgICAgICAgbGFiZWw6IG51bGwsXHJcbiAgICAgICAgbGFiZWxXaWR0aDogbnVsbCxcclxuICAgICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgICBkZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgICBkZXNjcmlwdGlvbkhlbHA6IG51bGwsXHJcbiAgICAgICAgaW52YWxpZFRleHQ6IG51bGwsXHJcbiAgICAgICAgdmFsaWRUZXh0OiBudWxsLFxyXG4gICAgICAgIGZpZWxkczogbnVsbCxcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QgZC1pbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXF1aXJlZDogbnVsbCxcclxuICAgICAgICByZWFkb25seTogbnVsbCxcclxuICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxyXG4gICAgICAgIG5vU2VuZDogbnVsbCxcclxuICAgICAgICBvcHRpb25zOiBbXSxcclxuICAgICAgICBzZWxlY3QyOiB7fSxcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y9cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmb3JtXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihmb3JtLCBvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdvcHRpb25zJykgJiZcclxuICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnMub3B0aW9ucyA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgb3B0aW9ucy5vcHRpb25zICE9PSBudWxsXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnNcclxuICAgICAgICAgICAgb3B0aW9ucy5vcHRpb25zID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fZm9ybSAgICAgID0gZm9ybTtcclxuICAgICAgICB0aGlzLl9pZCAgICAgICAgPSBvcHRpb25zLmhhc093blByb3BlcnR5KCdpZCcpICYmIHR5cGVvZiBvcHRpb25zLmlkID09PSAnc3RyaW5nJyA/IG9wdGlvbnMuaWQgOiAnJztcclxuICAgICAgICB0aGlzLl9jb250ZW50SWQgPSBvcHRpb25zLmhhc093blByb3BlcnR5KCdjb250ZW50SWQnKSAmJiB0eXBlb2Ygb3B0aW9ucy5jb250ZW50SWQgPT09ICdzdHJpbmcnID8gb3B0aW9ucy5jb250ZW50SWQgOiAnJztcclxuICAgICAgICB0aGlzLl9yZWFkb25seSAgPSBvcHRpb25zLmhhc093blByb3BlcnR5KCdyZWFkb25seScpICYmIHR5cGVvZiBvcHRpb25zLnJlYWRvbmx5ID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnJlYWRvbmx5IDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgICAgID0gb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSAmJiBbJ3N0cmluZycsICdudW1iZXInLCAnb2JqZWN0J10uaW5kZXhPZih0eXBlb2Ygb3B0aW9ucy52YWx1ZSkgPj0gMCA/IG9wdGlvbnMudmFsdWUgOiBudWxsO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgICA9ICQuZXh0ZW5kKHRydWUsIHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCAhIHRoaXMuX3JlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGZvcm0ub24oJ3Nob3cnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFByaXZhdGUuaW5pdEV2ZW50cyh0aGF0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCf0L7Qu9GD0YfQtdC90LjQtSBpZCDQv9C+0LvRj1xyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/QvtC70YPRh9C10L3QuNC1IGlkINC60L7QvdGC0LXQvdGC0LDQv9C+0LvRj1xyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRDb250ZW50SWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRJZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldE9wdGlvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9vcHRpb25zKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LrQsNC3INC/0L7Qu9GPXHJcbiAgICAgKiBAcGFyYW0ge2ludH0gZHVyYXRpb25cclxuICAgICAqL1xyXG4gICAgc2hvdyhkdXJhdGlvbikge1xyXG5cclxuICAgICAgICAkKCcjY29yZXVpLWZvcm0tJyArIHRoaXMuZ2V0SWQoKSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdkLWZsZXgnKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICAgICAgIC5jc3MoJ29wYWNpdHknLCAwKVxyXG4gICAgICAgICAgICAuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbiB8fCAyMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdvcGFjaXR5JywgJycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQodC60YDRi9GC0LjQtSDQv9C+0LvRj1xyXG4gICAgICogQHBhcmFtIHtpbnR9IGR1cmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGhpZGUoZHVyYXRpb24pIHtcclxuXHJcbiAgICAgICAgJCgnI2NvcmV1aS1mb3JtLScgKyB0aGlzLmdldElkKCkpXHJcbiAgICAgICAgICAgIC5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uIHx8IDIwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZC1mbGV4JykuYWRkQ2xhc3MoJ2Qtbm9uZScpLmNzcygnb3BhY2l0eScsICcnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0JjQt9C80LXQvdC10L3QuNC1INGA0LXQttC40LzQsCDQv9C+0LvRjyDRgtC+0LvRjNC60L4g0LTQu9GPINGH0YLQtdC90LjRj1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1JlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5KGlzUmVhZG9ubHkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWUgICAgPSB0aGlzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5fcmVhZG9ubHkgPSAhISBpc1JlYWRvbmx5O1xyXG5cclxuICAgICAgICAkKCcuY29udGVudC0nICsgdGhpcy5fY29udGVudElkKS5odG1sKFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICggISBpc1JlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIGZpZWxkUHJpdmF0ZS5pbml0RXZlbnRzKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9C+0LvRg9GH0LXQvdC40LUg0LfQvdCw0YfQtdC90LjRjyDQuNC3INC/0L7Qu9GPXHJcbiAgICAgKiBAcmV0dXJucyB7YXJyYXl8c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3JlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2F0dHInKSAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHRoaXMuX29wdGlvbnMuYXR0ciA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXR0ciAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgISBBcnJheS5pc0FycmF5KHRoaXMuX29wdGlvbnMuYXR0cikgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXR0ci5oYXNPd25Qcm9wZXJ0eSgnbXVsdGlwbGUnKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuY29udGVudC0nICsgdGhpcy5nZXRDb250ZW50SWQoKSArICcgc2VsZWN0IG9wdGlvbjpzZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKCQodGhpcykudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgnLmNvbnRlbnQtJyArIHRoaXMuZ2V0Q29udGVudElkKCkgKyAnIHNlbGVjdCBvcHRpb246c2VsZWN0ZWQnKS52YWwoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQt9C90LDRh9C10L3QuNGPINCyINC/0L7Qu9C1XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VmFsdWUodmFsdWUpIHtcclxuXHJcbiAgICAgICAgaWYgKFsnc3RyaW5nJywgJ251bWJlcicsICdvYmplY3QnXS5pbmRleE9mKHR5cGVvZiB2YWx1ZSkgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiAhIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBbIHZhbHVlIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGhhdCAgICAgID0gdGhpcztcclxuICAgICAgICBsZXQgY29udGVudElkID0gdGhpcy5nZXRDb250ZW50SWQoKTtcclxuICAgICAgICB0aGlzLl92YWx1ZSAgID0gW107XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yZWFkb25seSkge1xyXG4gICAgICAgICAgICAkKCcuY29udGVudC0nICsgY29udGVudElkKS5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fc2VsZWN0T3B0aW9ucykgJiZcclxuICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAkLmVhY2godGhpcy5fc2VsZWN0T3B0aW9ucywgZnVuY3Rpb24gKGtleSwgb3B0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHZhbHVlLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnZhbHVlID09IHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uaGFzT3duUHJvcGVydHkoJ3RleHQnKSAmJiBbJ3N0cmluZycsICdudW1iZXInXS5pbmRleE9mKHR5cGVvZihvcHRpb24udGV4dCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5wdXNoKG9wdGlvbi50ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX3ZhbHVlLnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuY29udGVudC0nICsgY29udGVudElkKS50ZXh0KHNlbGVjdGVkSXRlbXMuam9pbignLCAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmNvbnRlbnQtJyArIGNvbnRlbnRJZCArICcgc2VsZWN0ID4gb3B0aW9uJykucHJvcCgnc2VsZWN0ZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jb250ZW50LScgKyBjb250ZW50SWQgKyAnIHNlbGVjdCA+IG9wdGlvbicpLmVhY2goZnVuY3Rpb24gKGtleSwgaXRlbVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHZhbHVlLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSAkKGl0ZW1WYWx1ZSkudmFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoaXRlbVZhbHVlKS5wcm9wKCdzZWxlY3RlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fdmFsdWUucHVzaCh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINCy0LDQu9C40LTQvdC+0YHRgtC4INC/0L7Qu9GPXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58bnVsbH0gaXNWYWxpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGUoaXNWYWxpZCwgdGV4dCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9ICQoJy5jb250ZW50LScgKyB0aGlzLmdldENvbnRlbnRJZCgpKTtcclxuICAgICAgICBsZXQgc2VsZWN0ICAgID0gJCgnc2VsZWN0JywgY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy52YWxpZC1mZWVkYmFjaycpLnJlbW92ZSgpO1xyXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcuaW52YWxpZC1mZWVkYmFjaycpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBpZiAoaXNWYWxpZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy12YWxpZCcpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIHNlbGVjdC5hZGRDbGFzcygnaXMtdmFsaWQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuX29wdGlvbnMudmFsaWRUZXh0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IHRoaXMuX29wdGlvbnMudmFsaWRUZXh0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwidmFsaWQtZmVlZGJhY2tcIj4nICsgdGV4dCArICc8L2Rpdj4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGVjdC5yZW1vdmVDbGFzcygnaXMtdmFsaWQnKTtcclxuICAgICAgICAgICAgc2VsZWN0LmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMuaW52YWxpZFRleHQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRoaXMuX29wdGlvbnMuaW52YWxpZFRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggISB0ZXh0ICYmIHRoaXMuX29wdGlvbnMucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGhpcy5fZm9ybS5nZXRMYW5nKCkucmVxdWlyZWRfZmllbGQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJpbnZhbGlkLWZlZWRiYWNrXCI+JyArIHRleHQgKyAnPC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J/RgNC+0LLQtdGA0LrQsCDQstCw0LvQuNC00L3QvtGB0YLQuCDQv9C+0LvRj1xyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbnxudWxsfVxyXG4gICAgICovXHJcbiAgICBpc1ZhbGlkKCkge1xyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ID0gJCgnLmNvbnRlbnQtJyArIHRoaXMuZ2V0Q29udGVudElkKCkgKyAnIHNlbGVjdCcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5yZXF1aXJlZCAmJiBzZWxlY3QudmFsKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RbMF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdC5pcygnOnZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQn9GA0L7QstC10YDQutCwINC90LAg0YLQviwg0YfRgtC+INC/0L7Qu9C1INC80L7QttC90L4g0L7RgtC/0YDQsNCy0LvRj9GC0YxcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzQWxsb3lTZW5kKCkge1xyXG4gICAgICAgIHJldHVybiAhIHRoaXMuX29wdGlvbnMubm9TZW5kO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqINCk0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQutC+0L3RgtC10L3RgtCwINC/0L7Qu9GPXHJcbiAgICAgKiBAcmV0dXJuIHsqfVxyXG4gICAgICovXHJcbiAgICByZW5kZXJDb250ZW50KCkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHlcclxuICAgICAgICAgICAgPyBmaWVsZFByaXZhdGUucmVuZGVyQ29udGVudFJlYWRvbmx5KHRoaXMpXHJcbiAgICAgICAgICAgIDogZmllbGRQcml2YXRlLnJlbmRlckNvbnRlbnQodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWVsZFNlbGVjdDI7Il0sIm5hbWVzIjpbInRwbCIsIk9iamVjdCIsImNyZWF0ZSIsInV0aWxzIiwibWVyZ2VBdHRyIiwiYXR0cjEiLCJhdHRyMiIsImFzc2lnbiIsIl90eXBlb2YiLCIkIiwiZWFjaCIsIm5hbWUiLCJ2YWx1ZSIsImhhc093blByb3BlcnR5IiwiaXNPYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlIiwiZXhwb3J0cyIsInJvb3QiLCJqUXVlcnkiLCJ1bmRlZmluZWQiLCJ3aW5kb3ciLCJyZXF1aXJlIiwiUzIiLCJmbiIsInNlbGVjdDIiLCJyZXF1aXJlanMiLCJ1bmRlZiIsIm1haW4iLCJyZXEiLCJtYWtlTWFwIiwiaGFuZGxlcnMiLCJkZWZpbmVkIiwid2FpdGluZyIsImNvbmZpZyIsImRlZmluaW5nIiwiaGFzT3duIiwicHJvdG90eXBlIiwiYXBzIiwic2xpY2UiLCJqc1N1ZmZpeFJlZ0V4cCIsImhhc1Byb3AiLCJvYmoiLCJwcm9wIiwiY2FsbCIsIm5vcm1hbGl6ZSIsImJhc2VOYW1lIiwibmFtZVBhcnRzIiwibmFtZVNlZ21lbnQiLCJtYXBWYWx1ZSIsImZvdW5kTWFwIiwibGFzdEluZGV4IiwiZm91bmRJIiwiZm91bmRTdGFyTWFwIiwic3RhckkiLCJpIiwiaiIsInBhcnQiLCJub3JtYWxpemVkQmFzZVBhcnRzIiwiYmFzZVBhcnRzIiwic3BsaXQiLCJtYXAiLCJzdGFyTWFwIiwibGVuZ3RoIiwibm9kZUlkQ29tcGF0IiwidGVzdCIsInJlcGxhY2UiLCJjaGFyQXQiLCJjb25jYXQiLCJzcGxpY2UiLCJqb2luIiwibWFrZVJlcXVpcmUiLCJyZWxOYW1lIiwiZm9yY2VTeW5jIiwiYXJncyIsImFyZ3VtZW50cyIsInB1c2giLCJhcHBseSIsIm1ha2VOb3JtYWxpemUiLCJtYWtlTG9hZCIsImRlcE5hbWUiLCJjYWxsRGVwIiwiRXJyb3IiLCJzcGxpdFByZWZpeCIsInByZWZpeCIsImluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsIm1ha2VSZWxQYXJ0cyIsInJlbFBhcnRzIiwicGx1Z2luIiwicGFydHMiLCJyZWxSZXNvdXJjZU5hbWUiLCJmIiwibiIsInByIiwicCIsIm1ha2VDb25maWciLCJlIiwiaWQiLCJ1cmkiLCJkZXBzIiwiY2FsbGJhY2siLCJjanNNb2R1bGUiLCJyZXQiLCJjYWxsYmFja1R5cGUiLCJ1c2luZ0V4cG9ydHMiLCJsb2FkIiwiYWx0Iiwic2V0VGltZW91dCIsImNmZyIsIl9kZWZpbmVkIiwiXyQiLCJjb25zb2xlIiwiZXJyb3IiLCJVdGlscyIsIkV4dGVuZCIsIkNoaWxkQ2xhc3MiLCJTdXBlckNsYXNzIiwiX19oYXNQcm9wIiwiQmFzZUNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3IiLCJrZXkiLCJfX3N1cGVyX18iLCJnZXRNZXRob2RzIiwidGhlQ2xhc3MiLCJwcm90byIsIm1ldGhvZHMiLCJtZXRob2ROYW1lIiwibSIsIkRlY29yYXRlIiwiRGVjb3JhdG9yQ2xhc3MiLCJkZWNvcmF0ZWRNZXRob2RzIiwic3VwZXJNZXRob2RzIiwiRGVjb3JhdGVkQ2xhc3MiLCJ1bnNoaWZ0IiwiYXJnQ291bnQiLCJjYWxsZWRDb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiY3RyIiwic3VwZXJNZXRob2QiLCJjYWxsZWRNZXRob2QiLCJvcmlnaW5hbE1ldGhvZCIsImRlY29yYXRlZE1ldGhvZCIsImQiLCJPYnNlcnZhYmxlIiwibGlzdGVuZXJzIiwib24iLCJldmVudCIsInRyaWdnZXIiLCJwYXJhbXMiLCJfdHlwZSIsImludm9rZSIsImxlbiIsImdlbmVyYXRlQ2hhcnMiLCJjaGFycyIsInJhbmRvbUNoYXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJpbmQiLCJmdW5jIiwiY29udGV4dCIsIl9jb252ZXJ0RGF0YSIsImRhdGEiLCJvcmlnaW5hbEtleSIsImtleXMiLCJkYXRhTGV2ZWwiLCJrIiwidG9Mb3dlckNhc2UiLCJoYXNTY3JvbGwiLCJlbCIsIiRlbCIsIm92ZXJmbG93WCIsInN0eWxlIiwib3ZlcmZsb3dZIiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJpbm5lcldpZHRoIiwic2Nyb2xsV2lkdGgiLCJlc2NhcGVNYXJrdXAiLCJtYXJrdXAiLCJyZXBsYWNlTWFwIiwiU3RyaW5nIiwibWF0Y2giLCJfX2NhY2hlIiwiR2V0VW5pcXVlRWxlbWVudElkIiwiZWxlbWVudCIsInNlbGVjdDJJZCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIlN0b3JlRGF0YSIsIkdldERhdGEiLCJSZW1vdmVEYXRhIiwicmVtb3ZlQXR0cmlidXRlIiwiY29weU5vbkludGVybmFsQ3NzQ2xhc3NlcyIsImRlc3QiLCJzcmMiLCJkZXN0aW5hdGlvbkNsYXNzZXMiLCJ0cmltIiwiZmlsdGVyIiwiY2xhenoiLCJzb3VyY2VDbGFzc2VzIiwicmVwbGFjZW1lbnRzIiwiUmVzdWx0cyIsIiRlbGVtZW50Iiwib3B0aW9ucyIsImRhdGFBZGFwdGVyIiwicmVuZGVyIiwiJHJlc3VsdHMiLCJnZXQiLCJhdHRyIiwiY2xlYXIiLCJlbXB0eSIsImRpc3BsYXlNZXNzYWdlIiwiaGlkZUxvYWRpbmciLCIkbWVzc2FnZSIsIm1lc3NhZ2UiLCJhcHBlbmQiLCJjbGFzc05hbWUiLCJoaWRlTWVzc2FnZXMiLCJmaW5kIiwicmVtb3ZlIiwiJG9wdGlvbnMiLCJyZXN1bHRzIiwiY2hpbGRyZW4iLCJzb3J0IiwiaXRlbSIsIiRvcHRpb24iLCJvcHRpb24iLCJwb3NpdGlvbiIsIiRkcm9wZG93biIsIiRyZXN1bHRzQ29udGFpbmVyIiwic29ydGVyIiwiaGlnaGxpZ2h0Rmlyc3RJdGVtIiwiJHNlbGVjdGVkIiwiZmlyc3QiLCJlbnN1cmVIaWdobGlnaHRWaXNpYmxlIiwic2V0Q2xhc3NlcyIsInNlbGYiLCJjdXJyZW50Iiwic2VsZWN0ZWQiLCJzZWxlY3RlZElkcyIsInMiLCJjbGFzc0xpc3QiLCJhZGQiLCJzaG93TG9hZGluZyIsImxvYWRpbmdNb3JlIiwibG9hZGluZyIsImRpc2FibGVkIiwidGV4dCIsIiRsb2FkaW5nIiwicHJlcGVuZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImF0dHJzIiwibWF0Y2hlcyIsIkVsZW1lbnQiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIl9yZXN1bHRJZCIsInRpdGxlIiwicm9sZSIsInZhbCIsImxhYmVsIiwidGVtcGxhdGUiLCIkY2hpbGRyZW4iLCJjIiwiY2hpbGQiLCIkY2hpbGQiLCIkY2hpbGRyZW5Db250YWluZXIiLCJjb250YWluZXIiLCIkY29udGFpbmVyIiwiaXNPcGVuIiwicmVtb3ZlQXR0ciIsIiRoaWdobGlnaHRlZCIsImdldEhpZ2hsaWdodGVkUmVzdWx0cyIsImhhc0NsYXNzIiwiY3VycmVudEluZGV4IiwibmV4dEluZGV4IiwiJG5leHQiLCJlcSIsImN1cnJlbnRPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJuZXh0VG9wIiwibmV4dE9mZnNldCIsInNjcm9sbFRvcCIsIm91dGVySGVpZ2h0IiwibmV4dEJvdHRvbSIsIm1vdXNld2hlZWwiLCJib3R0b20iLCJkZWx0YVkiLCJpc0F0VG9wIiwiaXNBdEJvdHRvbSIsImhlaWdodCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZXZ0IiwiJHRoaXMiLCJvcmlnaW5hbEV2ZW50IiwicmVtb3ZlQ2xhc3MiLCJkZXN0cm95Iiwib2Zmc2V0RGVsdGEiLCJyZXN1bHQiLCJjb250ZW50IiwiZGlzcGxheSIsImlubmVySFRNTCIsIktFWVMiLCJCQUNLU1BBQ0UiLCJUQUIiLCJFTlRFUiIsIlNISUZUIiwiQ1RSTCIsIkFMVCIsIkVTQyIsIlNQQUNFIiwiUEFHRV9VUCIsIlBBR0VfRE9XTiIsIkVORCIsIkhPTUUiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkRPV04iLCJERUxFVEUiLCJCYXNlU2VsZWN0aW9uIiwiJHNlbGVjdGlvbiIsIl90YWJpbmRleCIsInJlc3VsdHNJZCIsIl9oYW5kbGVCbHVyIiwid2hpY2giLCJ1cGRhdGUiLCJfYXR0YWNoQ2xvc2VIYW5kbGVyIiwiX2RldGFjaENsb3NlSGFuZGxlciIsImFjdGl2ZUVsZW1lbnQiLCJjb250YWlucyIsImJvZHkiLCIkdGFyZ2V0IiwidGFyZ2V0IiwiJHNlbGVjdCIsImNsb3Nlc3QiLCIkYWxsIiwib2ZmIiwiJHNlbGVjdGlvbkNvbnRhaW5lciIsImlzRW5hYmxlZCIsImlzRGlzYWJsZWQiLCJTaW5nbGVTZWxlY3Rpb24iLCJodG1sIiwiJHJlbmRlcmVkIiwic2VsZWN0aW9uQ29udGFpbmVyIiwic2VsZWN0aW9uIiwiZm9ybWF0dGVkIiwiTXVsdGlwbGVTZWxlY3Rpb24iLCIkcmVtb3ZlIiwicGFyZW50IiwiJHNlbGVjdGlvbnMiLCJzZWxlY3Rpb25JZFByZWZpeCIsInNlbGVjdGlvbklkIiwicmVtb3ZlSXRlbSIsIlBsYWNlaG9sZGVyIiwiZGVjb3JhdGVkIiwicGxhY2Vob2xkZXIiLCJub3JtYWxpemVQbGFjZWhvbGRlciIsIl8iLCJjcmVhdGVQbGFjZWhvbGRlciIsIiRwbGFjZWhvbGRlciIsInBsYWNlaG9sZGVyVGl0bGUiLCJzaW5nbGVQbGFjZWhvbGRlciIsIm11bHRpcGxlU2VsZWN0aW9ucyIsIkFsbG93Q2xlYXIiLCJfaGFuZGxlQ2xlYXIiLCJfaGFuZGxlS2V5Ym9hcmRDbGVhciIsIiRjbGVhciIsInByZXZpb3VzVmFsIiwidW5zZWxlY3REYXRhIiwicHJldmVudGVkIiwicmVtb3ZlQWxsIiwiU2VhcmNoIiwic2VhcmNoTGFiZWwiLCIkc2VhcmNoIiwiJHNlYXJjaENvbnRhaW5lciIsIl90cmFuc2ZlclRhYkluZGV4IiwicmVzaXplU2VhcmNoIiwiX2tleVVwUHJldmVudGVkIiwiaXNEZWZhdWx0UHJldmVudGVkIiwiJHByZXZpb3VzQ2hvaWNlIiwibGFzdCIsInNlYXJjaFJlbW92ZUNob2ljZSIsIm1zaWUiLCJkb2N1bWVudE1vZGUiLCJkaXNhYmxlSW5wdXRFdmVudHMiLCJ0eXBlIiwiaGFuZGxlU2VhcmNoIiwic2VhcmNoSGFkRm9jdXMiLCJpbnB1dCIsInRlcm0iLCJjc3MiLCJ3aWR0aCIsIm1pbmltdW1XaWR0aCIsIlNlbGVjdGlvbkNTUyIsInNlbGVjdGlvbkNzc0NsYXNzIiwiYWRkQ2xhc3MiLCJFdmVudFJlbGF5IiwicmVsYXlFdmVudHMiLCJwcmV2ZW50YWJsZUV2ZW50cyIsIkV2ZW50IiwiVHJhbnNsYXRpb24iLCJkaWN0IiwiYWxsIiwiZXh0ZW5kIiwidHJhbnNsYXRpb24iLCJfY2FjaGUiLCJsb2FkUGF0aCIsInBhdGgiLCJ0cmFuc2xhdGlvbnMiLCJkaWFjcml0aWNzIiwiQmFzZUFkYXB0ZXIiLCJxdWVyeSIsImdlbmVyYXRlUmVzdWx0SWQiLCJTZWxlY3RBZGFwdGVyIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdGVkRWxlbWVudCIsInNlbGVjdCIsInRhZ05hbWUiLCJjdXJyZW50RGF0YSIsInVuc2VsZWN0IiwiYWRkT3B0aW9ucyIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0Iiwibm9ybWFsaXplZERhdGEiLCJfbm9ybWFsaXplSXRlbSIsImRlZmF1bHRzIiwibWF0Y2hlciIsIkFycmF5QWRhcHRlciIsIl9kYXRhVG9Db252ZXJ0IiwiY29udmVydFRvT3B0aW9ucyIsImVsbSIsIiRleGlzdGluZyIsImV4aXN0aW5nSWRzIiwib25seUl0ZW0iLCIkZXhpc3RpbmdPcHRpb24iLCJleGlzdGluZ0RhdGEiLCJuZXdEYXRhIiwiJG5ld09wdGlvbiIsInJlcGxhY2VXaXRoIiwiQWpheEFkYXB0ZXIiLCJhamF4T3B0aW9ucyIsIl9hcHBseURlZmF1bHRzIiwicHJvY2Vzc1Jlc3VsdHMiLCJxIiwidHJhbnNwb3J0Iiwic3VjY2VzcyIsImZhaWx1cmUiLCIkcmVxdWVzdCIsImFqYXgiLCJ0aGVuIiwiZmFpbCIsIl9yZXF1ZXN0IiwiYWJvcnQiLCJ1cmwiLCJyZXF1ZXN0Iiwic3RhdHVzIiwiZGVsYXkiLCJfcXVlcnlUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiVGFncyIsInRhZ3MiLCJjcmVhdGVUYWciLCJpbnNlcnRUYWciLCJ0IiwidGFnIiwiX3JlbW92ZU9sZFRhZ3MiLCJwYWdlIiwid3JhcHBlciIsImNoZWNrQ2hpbGRyZW4iLCJvcHRpb25UZXh0IiwidG9VcHBlckNhc2UiLCJwYXJhbXNUZXJtIiwiY2hlY2tUZXh0IiwiVG9rZW5pemVyIiwidG9rZW5pemVyIiwiZHJvcGRvd24iLCJjcmVhdGVBbmRTZWxlY3QiLCIkZXhpc3RpbmdPcHRpb25zIiwidG9rZW5EYXRhIiwic2VwYXJhdG9ycyIsInRlcm1DaGFyIiwic3Vic3RyIiwicGFydFBhcmFtcyIsIk1pbmltdW1JbnB1dExlbmd0aCIsIiRlIiwibWluaW11bUlucHV0TGVuZ3RoIiwibWluaW11bSIsIk1heGltdW1JbnB1dExlbmd0aCIsIm1heGltdW1JbnB1dExlbmd0aCIsIm1heGltdW0iLCJNYXhpbXVtU2VsZWN0aW9uTGVuZ3RoIiwibWF4aW11bVNlbGVjdGlvbkxlbmd0aCIsIl9jaGVja0lmTWF4aW11bVNlbGVjdGVkIiwic3VjY2Vzc0NhbGxiYWNrIiwiY291bnQiLCJEcm9wZG93biIsInNob3dTZWFyY2giLCJIaWRlUGxhY2Vob2xkZXIiLCJyZW1vdmVQbGFjZWhvbGRlciIsIm1vZGlmaWVkRGF0YSIsIkluZmluaXRlU2Nyb2xsIiwibGFzdFBhcmFtcyIsIiRsb2FkaW5nTW9yZSIsImNyZWF0ZUxvYWRpbmdNb3JlIiwic2hvd0xvYWRpbmdNb3JlIiwibG9hZE1vcmVJZk5lZWRlZCIsImlzTG9hZE1vcmVWaXNpYmxlIiwiZG9jdW1lbnRFbGVtZW50IiwibG9hZGluZ01vcmVPZmZzZXQiLCJsb2FkTW9yZSIsInBhZ2luYXRpb24iLCJtb3JlIiwiQXR0YWNoQm9keSIsIiRkcm9wZG93blBhcmVudCIsIl9zaG93RHJvcGRvd24iLCJfYXR0YWNoUG9zaXRpb25pbmdIYW5kbGVyIiwiX2JpbmRDb250YWluZXJSZXN1bHRIYW5kbGVycyIsIl9oaWRlRHJvcGRvd24iLCJfZGV0YWNoUG9zaXRpb25pbmdIYW5kbGVyIiwiJGRyb3Bkb3duQ29udGFpbmVyIiwiZGV0YWNoIiwiX2NvbnRhaW5lclJlc3VsdHNIYW5kbGVyc0JvdW5kIiwiX3Bvc2l0aW9uRHJvcGRvd24iLCJfcmVzaXplRHJvcGRvd24iLCJzY3JvbGxFdmVudCIsInJlc2l6ZUV2ZW50Iiwib3JpZW50YXRpb25FdmVudCIsIiR3YXRjaGVycyIsInBhcmVudHMiLCJ4Iiwic2Nyb2xsTGVmdCIsInkiLCJldiIsIiR3aW5kb3ciLCJpc0N1cnJlbnRseUFib3ZlIiwiaXNDdXJyZW50bHlCZWxvdyIsIm5ld0RpcmVjdGlvbiIsInZpZXdwb3J0IiwiZW5vdWdoUm9vbUFib3ZlIiwiZW5vdWdoUm9vbUJlbG93IiwibGVmdCIsIiRvZmZzZXRQYXJlbnQiLCJvZmZzZXRQYXJlbnQiLCJwYXJlbnRPZmZzZXQiLCJpc0Nvbm5lY3RlZCIsIm91dGVyV2lkdGgiLCJtaW5XaWR0aCIsImFwcGVuZFRvIiwiY291bnRSZXN1bHRzIiwiTWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIkluZmluaXR5IiwiU2VsZWN0T25DbG9zZSIsIl9oYW5kbGVTZWxlY3RPbkNsb3NlIiwib3JpZ2luYWxTZWxlY3QyRXZlbnQiLCIkaGlnaGxpZ2h0ZWRSZXN1bHRzIiwiQ2xvc2VPblNlbGVjdCIsIl9zZWxlY3RUcmlnZ2VyZWQiLCJjdHJsS2V5IiwibWV0YUtleSIsIkRyb3Bkb3duQ1NTIiwiZHJvcGRvd25Dc3NDbGFzcyIsIlRhZ3NTZWFyY2hIaWdobGlnaHQiLCIkZmlyc3RPcHRpb24iLCJmaXJzdEVsZW1lbnQiLCJlcnJvckxvYWRpbmciLCJpbnB1dFRvb0xvbmciLCJvdmVyQ2hhcnMiLCJpbnB1dFRvb1Nob3J0IiwicmVtYWluaW5nQ2hhcnMiLCJtYXhpbXVtU2VsZWN0ZWQiLCJub1Jlc3VsdHMiLCJzZWFyY2hpbmciLCJyZW1vdmVBbGxJdGVtcyIsInNlYXJjaCIsIlJlc3VsdHNMaXN0IiwiU2VsZWN0aW9uU2VhcmNoIiwiRElBQ1JJVElDUyIsIlNlbGVjdERhdGEiLCJBcnJheURhdGEiLCJBamF4RGF0YSIsIkRyb3Bkb3duU2VhcmNoIiwiRW5nbGlzaFRyYW5zbGF0aW9uIiwiRGVmYXVsdHMiLCJyZXNldCIsInRva2VuU2VwYXJhdG9ycyIsInJlc3VsdHNBZGFwdGVyIiwic2VsZWN0T25DbG9zZSIsImRyb3Bkb3duQWRhcHRlciIsIm11bHRpcGxlIiwiU2VhcmNoYWJsZURyb3Bkb3duIiwiY2xvc2VPblNlbGVjdCIsInNlbGVjdGlvbkFkYXB0ZXIiLCJhbGxvd0NsZWFyIiwibGFuZ3VhZ2UiLCJfcmVzb2x2ZUxhbmd1YWdlIiwidW5pcXVlTGFuZ3VhZ2VzIiwibCIsIl9wcm9jZXNzVHJhbnNsYXRpb25zIiwiZGVidWciLCJzdHJpcERpYWNyaXRpY3MiLCJhIiwib3JpZ2luYWwiLCJhbWRMYW5ndWFnZUJhc2UiLCJhdXRvY29tcGxldGUiLCJkcm9wZG93bkF1dG9XaWR0aCIsInNjcm9sbEFmdGVyU2VsZWN0IiwidGVtcGxhdGVSZXN1bHQiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsInRoZW1lIiwiYXBwbHlGcm9tRWxlbWVudCIsIm9wdGlvbkxhbmd1YWdlIiwiZGVmYXVsdExhbmd1YWdlIiwiZWxlbWVudExhbmd1YWdlIiwicGFyZW50TGFuZ3VhZ2UiLCJsYW5ndWFnZXMiLCJpc0VtcHR5T2JqZWN0IiwiaXNQbGFpbk9iamVjdCIsInJlc29sdmVkTGFuZ3VhZ2VzIiwibGFuZ3VhZ2VQYXJ0cyIsImJhc2VMYW5ndWFnZSIsImxhbmd1YWdlRGF0YSIsImV4Iiwid2FybiIsInNldCIsImNhbWVsS2V5IiwiY2FtZWxDYXNlIiwiY29udmVydGVkRGF0YSIsIk9wdGlvbnMiLCJmcm9tRWxlbWVudCIsImV4Y2x1ZGVkRGF0YSIsImRpciIsImRhdGFzZXQiLCJ1cHBlckNhc2VMZXR0ZXIiLCJsZXR0ZXIiLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlTmFtZSIsImRhdGFOYW1lIiwiZGF0YVZhbHVlIiwiY2FtZWxEYXRhTmFtZSIsImpxdWVyeSIsIlNlbGVjdDIiLCJfZ2VuZXJhdGVJZCIsInRhYmluZGV4IiwiRGF0YUFkYXB0ZXIiLCJfcGxhY2VDb250YWluZXIiLCJTZWxlY3Rpb25BZGFwdGVyIiwiRHJvcGRvd25BZGFwdGVyIiwiUmVzdWx0c0FkYXB0ZXIiLCJfYmluZEFkYXB0ZXJzIiwiX3JlZ2lzdGVyRG9tRXZlbnRzIiwiX3JlZ2lzdGVyRGF0YUV2ZW50cyIsIl9yZWdpc3RlclNlbGVjdGlvbkV2ZW50cyIsIl9yZWdpc3RlckRyb3Bkb3duRXZlbnRzIiwiX3JlZ2lzdGVyUmVzdWx0c0V2ZW50cyIsIl9yZWdpc3RlckV2ZW50cyIsImluaXRpYWxEYXRhIiwiX3N5bmNBdHRyaWJ1dGVzIiwiaW5zZXJ0QWZ0ZXIiLCJfcmVzb2x2ZVdpZHRoIiwibWV0aG9kIiwiV0lEVEgiLCJzdHlsZVdpZHRoIiwiZWxlbWVudFdpZHRoIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJfc3luY0EiLCJfc3luY1MiLCJfc3luY1N1YnRyZWUiLCJfb2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJub25SZWxheUV2ZW50cyIsInRvZ2dsZURyb3Bkb3duIiwiZm9jdXMiLCJhbHRLZXkiLCJjbG9zZSIsIm9wZW4iLCJfaXNDaGFuZ2VNdXRhdGlvbiIsImFkZGVkTm9kZXMiLCJub2RlIiwicmVtb3ZlZE5vZGVzIiwic29tZSIsIm11dGF0aW9uIiwiY2hhbmdlZCIsImFjdHVhbFRyaWdnZXIiLCJwcmVUcmlnZ2VyTWFwIiwicHJlVHJpZ2dlck5hbWUiLCJwcmVUcmlnZ2VyQXJncyIsImhhc0ZvY3VzIiwiZW5hYmxlIiwibmV3VmFsIiwiZGlzY29ubmVjdCIsInJlbW92ZURhdGEiLCJ0aGlzTWV0aG9kcyIsImluc3RhbmNlT3B0aW9ucyIsImluc3RhbmNlIiwiZyIsImdsb2JhbCIsImVqcyIsInIiLCJvIiwidSIsImNvZGUiLCJmcyIsInNjb3BlT3B0aW9uV2FybmVkIiwiX1ZFUlNJT05fU1RSSU5HIiwidmVyc2lvbiIsIl9ERUZBVUxUX09QRU5fREVMSU1JVEVSIiwiX0RFRkFVTFRfQ0xPU0VfREVMSU1JVEVSIiwiX0RFRkFVTFRfREVMSU1JVEVSIiwiX0RFRkFVTFRfTE9DQUxTX05BTUUiLCJfTkFNRSIsIl9SRUdFWF9TVFJJTkciLCJfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEEiLCJfT1BUU19QQVNTQUJMRV9XSVRIX0RBVEFfRVhQUkVTUyIsIl9CT00iLCJfSlNfSURFTlRJRklFUiIsImNhY2hlIiwiZmlsZUxvYWRlciIsInJlYWRGaWxlU3luYyIsImxvY2Fsc05hbWUiLCJwcm9taXNlSW1wbCIsIkZ1bmN0aW9uIiwiUHJvbWlzZSIsInJlc29sdmVJbmNsdWRlIiwiZmlsZW5hbWUiLCJpc0RpciIsImRpcm5hbWUiLCJleHRuYW1lIiwicmVzb2x2ZSIsImluY2x1ZGVQYXRoIiwiZXh0IiwicmVzb2x2ZVBhdGhzIiwicGF0aHMiLCJmaWxlUGF0aCIsInYiLCJleGlzdHNTeW5jIiwiZ2V0SW5jbHVkZVBhdGgiLCJ2aWV3cyIsImV4ZWMiLCJpbmNsdWRlciIsImVzY2FwZUZ1bmN0aW9uIiwiaGFuZGxlQ2FjaGUiLCJoYXNUZW1wbGF0ZSIsImNvbXBpbGUiLCJ0cnlIYW5kbGVDYWNoZSIsImNiIiwicmVqZWN0IiwiZXJyIiwiaW5jbHVkZUZpbGUiLCJvcHRzIiwic2hhbGxvd0NvcHkiLCJjcmVhdGVOdWxsUHJvdG9PYmpXaGVyZVBvc3NpYmxlIiwiaW5jbHVkZXJSZXN1bHQiLCJyZXRocm93Iiwic3RyIiwiZmxubSIsImxpbmVubyIsImVzYyIsImxpbmVzIiwic3RhcnQiLCJtYXgiLCJlbmQiLCJtaW4iLCJsaW5lIiwiY3VyciIsInN0cmlwU2VtaSIsInRlbXBsIiwic2NvcGUiLCJUZW1wbGF0ZSIsInNoYWxsb3dDb3B5RnJvbUxpc3QiLCJyZW5kZXJGaWxlIiwic2hpZnQiLCJ2aWV3T3B0cyIsInBvcCIsInNldHRpbmdzIiwiY2xlYXJDYWNoZSIsIm9wdHNQYXJhbSIsImhhc093bk9ubHlPYmplY3QiLCJ0ZW1wbGF0ZVRleHQiLCJtb2RlIiwidHJ1bmNhdGUiLCJjdXJyZW50TGluZSIsInNvdXJjZSIsImNsaWVudCIsImVzY2FwZSIsImVzY2FwZVhNTCIsImNvbXBpbGVEZWJ1ZyIsIm9wZW5EZWxpbWl0ZXIiLCJjbG9zZURlbGltaXRlciIsImRlbGltaXRlciIsInN0cmljdCIsInJtV2hpdGVzcGFjZSIsIm91dHB1dEZ1bmN0aW9uTmFtZSIsImFzeW5jIiwiZGVzdHJ1Y3R1cmVkTG9jYWxzIiwibGVnYWN5SW5jbHVkZSIsIl93aXRoIiwicmVnZXgiLCJjcmVhdGVSZWdleCIsIm1vZGVzIiwiRVZBTCIsIkVTQ0FQRUQiLCJSQVciLCJDT01NRU5UIiwiTElURVJBTCIsImRlbGltIiwiZXNjYXBlUmVnRXhwQ2hhcnMiLCJSZWdFeHAiLCJwcmVwZW5kZWQiLCJhcHBlbmRlZCIsImVzY2FwZUZuIiwiY3RvciIsInNhbml0aXplZEZpbGVuYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsImdlbmVyYXRlU291cmNlIiwiZGVzdHJ1Y3R1cmluZyIsImxvZyIsIlN5bnRheEVycm9yIiwicmV0dXJuZWRGbiIsImFub255bW91cyIsImluY2x1ZGUiLCJpbmNsdWRlRGF0YSIsImRlZmluZVByb3BlcnR5IiwiYmFzZW5hbWUiLCJ3cml0YWJsZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJwYXJzZVRlbXBsYXRlVGV4dCIsImZvckVhY2giLCJjbG9zaW5nIiwic2NhbkxpbmUiLCJwYXQiLCJhcnIiLCJmaXJzdFBvcyIsIl9hZGRPdXRwdXQiLCJuZXdMaW5lQ291bnQiLCJsYXN0SW5kZXhPZiIsIl9fZXhwcmVzcyIsIlZFUlNJT04iLCJyZWdFeHBDaGFycyIsInN0cmluZyIsIl9FTkNPREVfSFRNTF9SVUxFUyIsIl9NQVRDSF9IVE1MIiwiZW5jb2RlX2NoYXIiLCJlc2NhcGVGdW5jU3RyIiwiZXNjYXBlWE1MVG9TdHJpbmciLCJ0byIsImZyb20iLCJsaXN0IiwiX2RhdGEiLCJoeXBoZW5Ub0NhbWVsIiwiX19wcm90b19fIiwicHJvY2VzcyIsIm5vcm1hbGl6ZUFycmF5IiwiYWxsb3dBYm92ZVJvb3QiLCJ1cCIsInJlc29sdmVkUGF0aCIsInJlc29sdmVkQWJzb2x1dGUiLCJjd2QiLCJUeXBlRXJyb3IiLCJpc0Fic29sdXRlIiwidHJhaWxpbmdTbGFzaCIsInJlbGF0aXZlIiwiZnJvbVBhcnRzIiwidG9QYXJ0cyIsInNhbWVQYXJ0c0xlbmd0aCIsIm91dHB1dFBhcnRzIiwic2VwIiwiY2hhckNvZGVBdCIsImhhc1Jvb3QiLCJtYXRjaGVkU2xhc2giLCJzdGFydERvdCIsInN0YXJ0UGFydCIsInByZURvdFN0YXRlIiwieHMiLCJyZXMiLCJfcHJvY2VzcyIsImNhY2hlZFNldFRpbWVvdXQiLCJjYWNoZWRDbGVhclRpbWVvdXQiLCJkZWZhdWx0U2V0VGltb3V0IiwiZGVmYXVsdENsZWFyVGltZW91dCIsInJ1blRpbWVvdXQiLCJmdW4iLCJydW5DbGVhclRpbWVvdXQiLCJtYXJrZXIiLCJxdWV1ZSIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImRyYWluUXVldWUiLCJ0aW1lb3V0IiwicnVuIiwibmV4dFRpY2siLCJJdGVtIiwiYXJyYXkiLCJicm93c2VyIiwiZW52IiwiYXJndiIsInZlcnNpb25zIiwibm9vcCIsImFkZExpc3RlbmVyIiwib25jZSIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiZW1pdCIsInByZXBlbmRMaXN0ZW5lciIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJiaW5kaW5nIiwiY2hkaXIiLCJ1bWFzayIsImRlc2NyaXB0aW9uIiwia2V5d29yZHMiLCJhdXRob3IiLCJsaWNlbnNlIiwiYmluIiwianNkZWxpdnIiLCJ1bnBrZyIsInJlcG9zaXRvcnkiLCJidWdzIiwiaG9tZXBhZ2UiLCJkZXBlbmRlbmNpZXMiLCJqYWtlIiwiZGV2RGVwZW5kZW5jaWVzIiwiYnJvd3NlcmlmeSIsImVzbGludCIsImpzZG9jIiwibW9jaGEiLCJlbmdpbmVzIiwic2NyaXB0cyIsImZpZWxkUHJpdmF0ZSIsInJlbmRlckNvbnRlbnQiLCJmaWVsZCIsInRoYXQiLCJnZXRPcHRpb25zIiwic2VsZWN0T3B0aW9ucyIsIl9vcHRpb25zIiwicmVxdWlyZWQiLCJfc2VsZWN0T3B0aW9ucyIsInJlbmRlck9wdGlvbiIsIl92YWx1ZSIsInJlbmRlckF0dHIiLCJncm91cEF0dHIiLCJncm91cE9wdGlvbnMiLCJncm91cE9wdGlvbiIsInRlbXBsYXRlcyIsInJlYWRvbmx5IiwicmVuZGVyQ29udGVudFJlYWRvbmx5Iiwic2VsZWN0ZWRPcHRpb25zIiwiaXRlbVZhbHVlIiwib3B0aW9uQXR0ciIsImluaXRFdmVudHMiLCJzZWxlY3QyT3B0aW9ucyIsImZvcm1PcHRpb25zIiwiX2Zvcm0iLCJsYW5nIiwiZ2V0Q29udGVudElkIiwiRmllbGRTZWxlY3QyIiwiZm9ybSIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsImxhYmVsV2lkdGgiLCJkZXNjcmlwdGlvbkhlbHAiLCJpbnZhbGlkVGV4dCIsInZhbGlkVGV4dCIsImZpZWxkcyIsInNob3ciLCJub1NlbmQiLCJfaWQiLCJfY29udGVudElkIiwiY29udGVudElkIiwiX3JlYWRvbmx5IiwiX2NyZWF0ZUNsYXNzIiwiZ2V0SWQiLCJkdXJhdGlvbiIsImFuaW1hdGUiLCJvcGFjaXR5IiwiaGlkZSIsImlzUmVhZG9ubHkiLCJnZXRWYWx1ZSIsInZhbHVlcyIsInNldFZhbHVlIiwic2VsZWN0ZWRJdGVtcyIsInZhbGlkYXRlIiwiaXNWYWxpZCIsImdldExhbmciLCJyZXF1aXJlZF9maWVsZCIsImlzIiwiaXNBbGxveVNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxJQUFJQSxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQzdCRixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsMmdCQUEyZ0I7O0VDQWhpQixJQUFJRyxLQUFLLEdBQUc7RUFHUjtFQUNKO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDSUMsRUFBQUEsU0FBUyxFQUFFLFNBQUFBLFNBQUFBLENBQVVDLEtBQUssRUFBRUMsS0FBSyxFQUFFO01BRS9CLElBQUlGLFNBQVMsR0FBR0gsTUFBTSxDQUFDTSxNQUFNLENBQUMsRUFBRSxFQUFFRixLQUFLLENBQUMsQ0FBQTtFQUV4QyxJQUFBLElBQUlHLE9BQUEsQ0FBT0YsS0FBSyxDQUFBLEtBQUssUUFBUSxFQUFFO1FBQzNCRyxDQUFDLENBQUNDLElBQUksQ0FBQ0osS0FBSyxFQUFFLFVBQVVLLElBQUksRUFBRUMsS0FBSyxFQUFFO0VBQ2pDLFFBQUEsSUFBSVIsU0FBUyxDQUFDUyxjQUFjLENBQUNGLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUlBLElBQUksS0FBSyxPQUFPLEVBQUU7RUFDbEJQLFlBQUFBLFNBQVMsQ0FBQ08sSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHQyxLQUFLLENBQUE7RUFFbEMsV0FBQyxNQUFNLElBQUlELElBQUksS0FBSyxPQUFPLEVBQUU7RUFDekJQLFlBQUFBLFNBQVMsQ0FBQ08sSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHQyxLQUFLLENBQUE7RUFFbEMsV0FBQyxNQUFNO0VBQ0hSLFlBQUFBLFNBQVMsQ0FBQ08sSUFBSSxDQUFDLEdBQUdDLEtBQUssQ0FBQTtFQUMzQixXQUFBO0VBRUosU0FBQyxNQUFNO0VBQ0hSLFVBQUFBLFNBQVMsQ0FBQ08sSUFBSSxDQUFDLEdBQUdDLEtBQUssQ0FBQTtFQUMzQixTQUFBO0VBQ0osT0FBQyxDQUFDLENBQUE7RUFDTixLQUFBO0VBRUEsSUFBQSxPQUFPUixTQUFTLENBQUE7S0FDbkI7RUFHRDtFQUNKO0VBQ0E7RUFDQTtFQUNJVSxFQUFBQSxRQUFRLEVBQUUsU0FBQUEsUUFBVUYsQ0FBQUEsS0FBSyxFQUFFO0VBRXZCLElBQUEsT0FBT0osT0FBQSxDQUFPSSxLQUFLLENBQUssS0FBQSxRQUFRLElBQzVCLENBQUVHLEtBQUssQ0FBQ0MsT0FBTyxDQUFDSixLQUFLLENBQUMsSUFDdEJBLEtBQUssS0FBSyxJQUFJLENBQUE7RUFDdEIsR0FBQTtFQUNKLENBQUM7O0VDL0NEO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0UsQ0FBQSxVQUFVSyxPQUFPLEVBQUU7SUFDbkIsSUFBSSxPQUFPQyxNQUFNLEtBQUssVUFBVSxJQUFJQSxNQUFNLENBQUNDLEdBQUcsRUFBRTtFQUM5QztFQUNBRCxJQUFBQSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRUQsT0FBTyxDQUFDLENBQUE7S0FDNUIsTUFBTSxJQUFJLE9BQU9HLE1BQU0sS0FBSyxRQUFRLElBQUlBLE1BQU0sQ0FBQ0MsT0FBTyxFQUFFO0VBQ3ZEO0VBQ0FELElBQUFBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHLFVBQVVDLElBQUksRUFBRUMsTUFBTSxFQUFFO1FBQ3ZDLElBQUlBLE1BQU0sS0FBS0MsU0FBUyxFQUFFO0VBQ3hCO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsUUFBQSxJQUFJLE9BQU9DLE1BQU0sS0FBSyxXQUFXLEVBQUU7RUFDakNGLFVBQUFBLE1BQU0sR0FBR0csT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQzVCLFNBQUMsTUFDSTtFQUNISCxVQUFBQSxNQUFNLEdBQUdHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQ0osSUFBSSxDQUFDLENBQUE7RUFDbEMsU0FBQTtFQUNGLE9BQUE7UUFDQUwsT0FBTyxDQUFDTSxNQUFNLENBQUMsQ0FBQTtFQUNmLE1BQUEsT0FBT0EsTUFBTSxDQUFBO09BQ2QsQ0FBQTtFQUNILEdBQUMsTUFBTTtFQUNMO01BQ0FOLE9BQU8sQ0FBQ00sTUFBTSxDQUFDLENBQUE7RUFDakIsR0FBQTtFQUNGLENBQUMsRUFBRSxVQUFVQSxNQUFNLEVBQUU7RUFDbkI7RUFDQTtFQUNBO0lBQ0EsSUFBSUksRUFBRSxHQUFHLFlBQVk7RUFDckI7RUFDQTtFQUNBLElBQUEsSUFBSUosTUFBTSxJQUFJQSxNQUFNLENBQUNLLEVBQUUsSUFBSUwsTUFBTSxDQUFDSyxFQUFFLENBQUNDLE9BQU8sSUFBSU4sTUFBTSxDQUFDSyxFQUFFLENBQUNDLE9BQU8sQ0FBQ1YsR0FBRyxFQUFFO1FBQ3JFLElBQUlRLEVBQUUsR0FBR0osTUFBTSxDQUFDSyxFQUFFLENBQUNDLE9BQU8sQ0FBQ1YsR0FBRyxDQUFBO0VBQ2hDLEtBQUE7RUFDRixJQUFBLElBQUlRLEVBQUUsQ0FBQTtNQUFFLENBQVksWUFBQTtFQUFFLE1BQUEsSUFBSSxDQUFDQSxFQUFFLElBQUksQ0FBQ0EsRUFBRSxDQUFDRyxTQUFTLEVBQUU7VUFDaEQsSUFBSSxDQUFDSCxFQUFFLEVBQUU7WUFBRUEsRUFBRSxHQUFHLEVBQUUsQ0FBQTtFQUFFLFNBQUMsTUFBTTtFQUFFRCxVQUFBQSxPQUFPLEdBQUdDLEVBQUUsQ0FBQTtFQUFFLFNBQUE7RUFDM0M7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUEsUUFBQSxJQUFJRyxTQUFTLEVBQUVKLE9BQU8sRUFBRVIsTUFBTSxDQUFBO0VBQzdCLFFBQUEsQ0FBQSxVQUFVYSxLQUFLLEVBQUU7RUFDZCxVQUFBLElBQUlDLElBQUk7Y0FBRUMsR0FBRztjQUFFQyxPQUFPO2NBQUVDLFFBQVE7Y0FDNUJDLE9BQU8sR0FBRyxFQUFFO2NBQ1pDLE9BQU8sR0FBRyxFQUFFO2NBQ1pDLE1BQU0sR0FBRyxFQUFFO2NBQ1hDLFFBQVEsR0FBRyxFQUFFO0VBQ2JDLFlBQUFBLE1BQU0sR0FBR3ZDLE1BQU0sQ0FBQ3dDLFNBQVMsQ0FBQzVCLGNBQWM7Y0FDeEM2QixHQUFHLEdBQUcsRUFBRSxDQUFDQyxLQUFLO0VBQ2RDLFlBQUFBLGNBQWMsR0FBRyxPQUFPLENBQUE7RUFFNUIsVUFBQSxTQUFTQyxPQUFPQSxDQUFDQyxHQUFHLEVBQUVDLElBQUksRUFBRTtFQUN4QixZQUFBLE9BQU9QLE1BQU0sQ0FBQ1EsSUFBSSxDQUFDRixHQUFHLEVBQUVDLElBQUksQ0FBQyxDQUFBO0VBQ2pDLFdBQUE7O0VBRUE7RUFDSjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNJLFVBQUEsU0FBU0UsU0FBU0EsQ0FBQ3RDLElBQUksRUFBRXVDLFFBQVEsRUFBRTtFQUMvQixZQUFBLElBQUlDLFNBQVM7Z0JBQUVDLFdBQVc7Z0JBQUVDLFFBQVE7Z0JBQUVDLFFBQVE7Z0JBQUVDLFNBQVM7Z0JBQ3JEQyxNQUFNO2dCQUFFQyxZQUFZO2dCQUFFQyxLQUFLO2dCQUFFQyxDQUFDO2dCQUFFQyxDQUFDO2dCQUFFQyxJQUFJO2dCQUFFQyxtQkFBbUI7Z0JBQzVEQyxTQUFTLEdBQUdiLFFBQVEsSUFBSUEsUUFBUSxDQUFDYyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUMzQ0MsR0FBRyxHQUFHM0IsTUFBTSxDQUFDMkIsR0FBRztnQkFDaEJDLE9BQU8sR0FBSUQsR0FBRyxJQUFJQSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUssRUFBRSxDQUFBOztFQUVyQztFQUNBLFlBQUEsSUFBSXRELElBQUksRUFBRTtFQUNOQSxjQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQ3FELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtFQUN0QlQsY0FBQUEsU0FBUyxHQUFHNUMsSUFBSSxDQUFDd0QsTUFBTSxHQUFHLENBQUMsQ0FBQTs7RUFFM0I7RUFDQTtFQUNBO0VBQ0E7RUFDQSxjQUFBLElBQUk3QixNQUFNLENBQUM4QixZQUFZLElBQUl4QixjQUFjLENBQUN5QixJQUFJLENBQUMxRCxJQUFJLENBQUM0QyxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQzdENUMsZ0JBQUFBLElBQUksQ0FBQzRDLFNBQVMsQ0FBQyxHQUFHNUMsSUFBSSxDQUFDNEMsU0FBUyxDQUFDLENBQUNlLE9BQU8sQ0FBQzFCLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQTtFQUNqRSxlQUFBOztFQUVBO0VBQ0EsY0FBQSxJQUFJakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDNEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSVIsU0FBUyxFQUFFO0VBQ3hDO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQUQsZ0JBQUFBLG1CQUFtQixHQUFHQyxTQUFTLENBQUNwQixLQUFLLENBQUMsQ0FBQyxFQUFFb0IsU0FBUyxDQUFDSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7RUFDOUR4RCxnQkFBQUEsSUFBSSxHQUFHbUQsbUJBQW1CLENBQUNVLE1BQU0sQ0FBQzdELElBQUksQ0FBQyxDQUFBO0VBQzNDLGVBQUE7O0VBRUE7RUFDQSxjQUFBLEtBQUtnRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdoRCxJQUFJLENBQUN3RCxNQUFNLEVBQUVSLENBQUMsRUFBRSxFQUFFO0VBQzlCRSxnQkFBQUEsSUFBSSxHQUFHbEQsSUFBSSxDQUFDZ0QsQ0FBQyxDQUFDLENBQUE7a0JBQ2QsSUFBSUUsSUFBSSxLQUFLLEdBQUcsRUFBRTtFQUNkbEQsa0JBQUFBLElBQUksQ0FBQzhELE1BQU0sQ0FBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0VBQ2pCQSxrQkFBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUNWLGlCQUFDLE1BQU0sSUFBSUUsSUFBSSxLQUFLLElBQUksRUFBRTtFQUN0QjtFQUNBO0VBQ0E7RUFDQTtFQUNBO29CQUNBLElBQUlGLENBQUMsS0FBSyxDQUFDLElBQUtBLENBQUMsS0FBSyxDQUFDLElBQUloRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSyxJQUFJQSxJQUFJLENBQUNnRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO0VBQ2xFLG9CQUFBLFNBQUE7RUFDSixtQkFBQyxNQUFNLElBQUlBLENBQUMsR0FBRyxDQUFDLEVBQUU7c0JBQ2RoRCxJQUFJLENBQUM4RCxNQUFNLENBQUNkLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDckJBLG9CQUFBQSxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQ1YsbUJBQUE7RUFDSixpQkFBQTtFQUNKLGVBQUE7RUFDQTs7RUFFQWhELGNBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDK0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0VBQ3pCLGFBQUE7O0VBRUE7RUFDQSxZQUFBLElBQUksQ0FBQ1gsU0FBUyxJQUFJRyxPQUFPLEtBQUtELEdBQUcsRUFBRTtFQUMvQmQsY0FBQUEsU0FBUyxHQUFHeEMsSUFBSSxDQUFDcUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0VBRTNCLGNBQUEsS0FBS0wsQ0FBQyxHQUFHUixTQUFTLENBQUNnQixNQUFNLEVBQUVSLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDdENQLGdCQUFBQSxXQUFXLEdBQUdELFNBQVMsQ0FBQ1IsS0FBSyxDQUFDLENBQUMsRUFBRWdCLENBQUMsQ0FBQyxDQUFDZSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7RUFFN0MsZ0JBQUEsSUFBSVgsU0FBUyxFQUFFO0VBQ1g7RUFDQTtFQUNBLGtCQUFBLEtBQUtILENBQUMsR0FBR0csU0FBUyxDQUFDSSxNQUFNLEVBQUVQLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDdENQLG9CQUFBQSxRQUFRLEdBQUdZLEdBQUcsQ0FBQ0YsU0FBUyxDQUFDcEIsS0FBSyxDQUFDLENBQUMsRUFBRWlCLENBQUMsQ0FBQyxDQUFDYyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTs7RUFFL0M7RUFDQTtFQUNBLG9CQUFBLElBQUlyQixRQUFRLEVBQUU7RUFDVkEsc0JBQUFBLFFBQVEsR0FBR0EsUUFBUSxDQUFDRCxXQUFXLENBQUMsQ0FBQTtFQUNoQyxzQkFBQSxJQUFJQyxRQUFRLEVBQUU7RUFDVjtFQUNBQyx3QkFBQUEsUUFBUSxHQUFHRCxRQUFRLENBQUE7RUFDbkJHLHdCQUFBQSxNQUFNLEdBQUdHLENBQUMsQ0FBQTtFQUNWLHdCQUFBLE1BQUE7RUFDSix1QkFBQTtFQUNKLHFCQUFBO0VBQ0osbUJBQUE7RUFDSixpQkFBQTtFQUVBLGdCQUFBLElBQUlMLFFBQVEsRUFBRTtFQUNWLGtCQUFBLE1BQUE7RUFDSixpQkFBQTs7RUFFQTtFQUNBO0VBQ0E7a0JBQ0EsSUFBSSxDQUFDRyxZQUFZLElBQUlTLE9BQU8sSUFBSUEsT0FBTyxDQUFDZCxXQUFXLENBQUMsRUFBRTtFQUNsREssa0JBQUFBLFlBQVksR0FBR1MsT0FBTyxDQUFDZCxXQUFXLENBQUMsQ0FBQTtFQUNuQ00sa0JBQUFBLEtBQUssR0FBR0MsQ0FBQyxDQUFBO0VBQ2IsaUJBQUE7RUFDSixlQUFBO0VBRUEsY0FBQSxJQUFJLENBQUNMLFFBQVEsSUFBSUcsWUFBWSxFQUFFO0VBQzNCSCxnQkFBQUEsUUFBUSxHQUFHRyxZQUFZLENBQUE7RUFDdkJELGdCQUFBQSxNQUFNLEdBQUdFLEtBQUssQ0FBQTtFQUNsQixlQUFBO0VBRUEsY0FBQSxJQUFJSixRQUFRLEVBQUU7a0JBQ1ZILFNBQVMsQ0FBQ3NCLE1BQU0sQ0FBQyxDQUFDLEVBQUVqQixNQUFNLEVBQUVGLFFBQVEsQ0FBQyxDQUFBO0VBQ3JDM0MsZ0JBQUFBLElBQUksR0FBR3dDLFNBQVMsQ0FBQ3VCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtFQUM5QixlQUFBO0VBQ0osYUFBQTtFQUVBLFlBQUEsT0FBTy9ELElBQUksQ0FBQTtFQUNmLFdBQUE7RUFFQSxVQUFBLFNBQVNnRSxXQUFXQSxDQUFDQyxPQUFPLEVBQUVDLFNBQVMsRUFBRTtFQUNyQyxZQUFBLE9BQU8sWUFBWTtFQUNmO0VBQ0E7RUFDQTtnQkFDQSxJQUFJQyxJQUFJLEdBQUdwQyxHQUFHLENBQUNNLElBQUksQ0FBQytCLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTs7RUFFakM7RUFDQTtFQUNBO0VBQ0EsY0FBQSxJQUFJLE9BQU9ELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUlBLElBQUksQ0FBQ1gsTUFBTSxLQUFLLENBQUMsRUFBRTtFQUNsRFcsZ0JBQUFBLElBQUksQ0FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQ25CLGVBQUE7RUFDQSxjQUFBLE9BQU8vQyxHQUFHLENBQUNnRCxLQUFLLENBQUNsRCxLQUFLLEVBQUUrQyxJQUFJLENBQUNOLE1BQU0sQ0FBQyxDQUFDSSxPQUFPLEVBQUVDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtlQUM3RCxDQUFBO0VBQ0wsV0FBQTtZQUVBLFNBQVNLLGFBQWFBLENBQUNOLE9BQU8sRUFBRTtjQUM1QixPQUFPLFVBQVVqRSxJQUFJLEVBQUU7RUFDbkIsY0FBQSxPQUFPc0MsU0FBUyxDQUFDdEMsSUFBSSxFQUFFaUUsT0FBTyxDQUFDLENBQUE7ZUFDbEMsQ0FBQTtFQUNMLFdBQUE7WUFFQSxTQUFTTyxRQUFRQSxDQUFDQyxPQUFPLEVBQUU7Y0FDdkIsT0FBTyxVQUFVeEUsS0FBSyxFQUFFO0VBQ3BCd0IsY0FBQUEsT0FBTyxDQUFDZ0QsT0FBTyxDQUFDLEdBQUd4RSxLQUFLLENBQUE7ZUFDM0IsQ0FBQTtFQUNMLFdBQUE7WUFFQSxTQUFTeUUsT0FBT0EsQ0FBQzFFLElBQUksRUFBRTtFQUNuQixZQUFBLElBQUlrQyxPQUFPLENBQUNSLE9BQU8sRUFBRTFCLElBQUksQ0FBQyxFQUFFO0VBQ3hCLGNBQUEsSUFBSW1FLElBQUksR0FBR3pDLE9BQU8sQ0FBQzFCLElBQUksQ0FBQyxDQUFBO2dCQUN4QixPQUFPMEIsT0FBTyxDQUFDMUIsSUFBSSxDQUFDLENBQUE7RUFDcEI0QixjQUFBQSxRQUFRLENBQUM1QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUE7RUFDckJxQixjQUFBQSxJQUFJLENBQUNpRCxLQUFLLENBQUNsRCxLQUFLLEVBQUUrQyxJQUFJLENBQUMsQ0FBQTtFQUMzQixhQUFBO0VBRUEsWUFBQSxJQUFJLENBQUNqQyxPQUFPLENBQUNULE9BQU8sRUFBRXpCLElBQUksQ0FBQyxJQUFJLENBQUNrQyxPQUFPLENBQUNOLFFBQVEsRUFBRTVCLElBQUksQ0FBQyxFQUFFO0VBQ3JELGNBQUEsTUFBTSxJQUFJMkUsS0FBSyxDQUFDLEtBQUssR0FBRzNFLElBQUksQ0FBQyxDQUFBO0VBQ2pDLGFBQUE7Y0FDQSxPQUFPeUIsT0FBTyxDQUFDekIsSUFBSSxDQUFDLENBQUE7RUFDeEIsV0FBQTs7RUFFQTtFQUNBO0VBQ0E7WUFDQSxTQUFTNEUsV0FBV0EsQ0FBQzVFLElBQUksRUFBRTtFQUN2QixZQUFBLElBQUk2RSxNQUFNO2dCQUNOQyxLQUFLLEdBQUc5RSxJQUFJLEdBQUdBLElBQUksQ0FBQytFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtFQUN6QyxZQUFBLElBQUlELEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDWkQsTUFBTSxHQUFHN0UsSUFBSSxDQUFDZ0YsU0FBUyxDQUFDLENBQUMsRUFBRUYsS0FBSyxDQUFDLENBQUE7RUFDakM5RSxjQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQ2dGLFNBQVMsQ0FBQ0YsS0FBSyxHQUFHLENBQUMsRUFBRTlFLElBQUksQ0FBQ3dELE1BQU0sQ0FBQyxDQUFBO0VBQ2pELGFBQUE7RUFDQSxZQUFBLE9BQU8sQ0FBQ3FCLE1BQU0sRUFBRTdFLElBQUksQ0FBQyxDQUFBO0VBQ3pCLFdBQUE7O0VBRUE7RUFDQTtZQUNBLFNBQVNpRixZQUFZQSxDQUFDaEIsT0FBTyxFQUFFO0VBQzNCLFlBQUEsT0FBT0EsT0FBTyxHQUFHVyxXQUFXLENBQUNYLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtFQUM5QyxXQUFBOztFQUVBO0VBQ0o7RUFDQTtFQUNBO0VBQ0E7RUFDSTFDLFVBQUFBLE9BQU8sR0FBRyxVQUFVdkIsSUFBSSxFQUFFa0YsUUFBUSxFQUFFO0VBQ2hDLFlBQUEsSUFBSUMsTUFBTTtFQUNOQyxjQUFBQSxLQUFLLEdBQUdSLFdBQVcsQ0FBQzVFLElBQUksQ0FBQztFQUN6QjZFLGNBQUFBLE1BQU0sR0FBR08sS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNqQkMsY0FBQUEsZUFBZSxHQUFHSCxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFFakNsRixZQUFBQSxJQUFJLEdBQUdvRixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFFZixZQUFBLElBQUlQLE1BQU0sRUFBRTtFQUNSQSxjQUFBQSxNQUFNLEdBQUd2QyxTQUFTLENBQUN1QyxNQUFNLEVBQUVRLGVBQWUsQ0FBQyxDQUFBO0VBQzNDRixjQUFBQSxNQUFNLEdBQUdULE9BQU8sQ0FBQ0csTUFBTSxDQUFDLENBQUE7RUFDNUIsYUFBQTs7RUFFQTtFQUNBLFlBQUEsSUFBSUEsTUFBTSxFQUFFO0VBQ1IsY0FBQSxJQUFJTSxNQUFNLElBQUlBLE1BQU0sQ0FBQzdDLFNBQVMsRUFBRTtrQkFDNUJ0QyxJQUFJLEdBQUdtRixNQUFNLENBQUM3QyxTQUFTLENBQUN0QyxJQUFJLEVBQUV1RSxhQUFhLENBQUNjLGVBQWUsQ0FBQyxDQUFDLENBQUE7RUFDakUsZUFBQyxNQUFNO0VBQ0hyRixnQkFBQUEsSUFBSSxHQUFHc0MsU0FBUyxDQUFDdEMsSUFBSSxFQUFFcUYsZUFBZSxDQUFDLENBQUE7RUFDM0MsZUFBQTtFQUNKLGFBQUMsTUFBTTtFQUNIckYsY0FBQUEsSUFBSSxHQUFHc0MsU0FBUyxDQUFDdEMsSUFBSSxFQUFFcUYsZUFBZSxDQUFDLENBQUE7RUFDdkNELGNBQUFBLEtBQUssR0FBR1IsV0FBVyxDQUFDNUUsSUFBSSxDQUFDLENBQUE7RUFDekI2RSxjQUFBQSxNQUFNLEdBQUdPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNqQnBGLGNBQUFBLElBQUksR0FBR29GLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNmLGNBQUEsSUFBSVAsTUFBTSxFQUFFO0VBQ1JNLGdCQUFBQSxNQUFNLEdBQUdULE9BQU8sQ0FBQ0csTUFBTSxDQUFDLENBQUE7RUFDNUIsZUFBQTtFQUNKLGFBQUE7O0VBRUE7Y0FDQSxPQUFPO2dCQUNIUyxDQUFDLEVBQUVULE1BQU0sR0FBR0EsTUFBTSxHQUFHLEdBQUcsR0FBRzdFLElBQUksR0FBR0EsSUFBSTtFQUFFO0VBQ3hDdUYsY0FBQUEsQ0FBQyxFQUFFdkYsSUFBSTtFQUNQd0YsY0FBQUEsRUFBRSxFQUFFWCxNQUFNO0VBQ1ZZLGNBQUFBLENBQUMsRUFBRU4sTUFBQUE7ZUFDTixDQUFBO2FBQ0osQ0FBQTtZQUVELFNBQVNPLFVBQVVBLENBQUMxRixJQUFJLEVBQUU7RUFDdEIsWUFBQSxPQUFPLFlBQVk7RUFDZixjQUFBLE9BQVEyQixNQUFNLElBQUlBLE1BQU0sQ0FBQ0EsTUFBTSxJQUFJQSxNQUFNLENBQUNBLE1BQU0sQ0FBQzNCLElBQUksQ0FBQyxJQUFLLEVBQUUsQ0FBQTtlQUNoRSxDQUFBO0VBQ0wsV0FBQTtFQUVBd0IsVUFBQUEsUUFBUSxHQUFHO0VBQ1BULFlBQUFBLE9BQU8sRUFBRSxVQUFVZixJQUFJLEVBQUU7Z0JBQ3JCLE9BQU9nRSxXQUFXLENBQUNoRSxJQUFJLENBQUMsQ0FBQTtlQUMzQjtFQUNEVSxZQUFBQSxPQUFPLEVBQUUsVUFBVVYsSUFBSSxFQUFFO0VBQ3JCLGNBQUEsSUFBSTJGLENBQUMsR0FBR2xFLE9BQU8sQ0FBQ3pCLElBQUksQ0FBQyxDQUFBO0VBQ3JCLGNBQUEsSUFBSSxPQUFPMkYsQ0FBQyxLQUFLLFdBQVcsRUFBRTtFQUMxQixnQkFBQSxPQUFPQSxDQUFDLENBQUE7RUFDWixlQUFDLE1BQU07RUFDSCxnQkFBQSxPQUFRbEUsT0FBTyxDQUFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0VBQzlCLGVBQUE7ZUFDSDtFQUNEUyxZQUFBQSxNQUFNLEVBQUUsVUFBVVQsSUFBSSxFQUFFO2dCQUNwQixPQUFPO0VBQ0g0RixnQkFBQUEsRUFBRSxFQUFFNUYsSUFBSTtFQUNSNkYsZ0JBQUFBLEdBQUcsRUFBRSxFQUFFO0VBQ1BuRixnQkFBQUEsT0FBTyxFQUFFZSxPQUFPLENBQUN6QixJQUFJLENBQUM7a0JBQ3RCMkIsTUFBTSxFQUFFK0QsVUFBVSxDQUFDMUYsSUFBSSxDQUFBO2lCQUMxQixDQUFBO0VBQ0wsYUFBQTthQUNILENBQUE7WUFFRHFCLElBQUksR0FBRyxVQUFVckIsSUFBSSxFQUFFOEYsSUFBSSxFQUFFQyxRQUFRLEVBQUU5QixPQUFPLEVBQUU7RUFDNUMsWUFBQSxJQUFJK0IsU0FBUztnQkFBRXZCLE9BQU87Z0JBQUV3QixHQUFHO2dCQUFFM0MsR0FBRztnQkFBRU4sQ0FBQztnQkFBRWtDLFFBQVE7RUFDekNmLGNBQUFBLElBQUksR0FBRyxFQUFFO2dCQUNUK0IsWUFBWSxHQUFHLE9BQU9ILFFBQVE7Z0JBQzlCSSxZQUFZLENBQUE7O0VBRWhCO2NBQ0FsQyxPQUFPLEdBQUdBLE9BQU8sSUFBSWpFLElBQUksQ0FBQTtFQUN6QmtGLFlBQUFBLFFBQVEsR0FBR0QsWUFBWSxDQUFDaEIsT0FBTyxDQUFDLENBQUE7O0VBRWhDO0VBQ0EsWUFBQSxJQUFJaUMsWUFBWSxLQUFLLFdBQVcsSUFBSUEsWUFBWSxLQUFLLFVBQVUsRUFBRTtFQUM3RDtFQUNBO0VBQ0E7RUFDQUosY0FBQUEsSUFBSSxHQUFHLENBQUNBLElBQUksQ0FBQ3RDLE1BQU0sSUFBSXVDLFFBQVEsQ0FBQ3ZDLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEdBQUdzQyxJQUFJLENBQUE7RUFDaEYsY0FBQSxLQUFLOUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHOEMsSUFBSSxDQUFDdEMsTUFBTSxFQUFFUixDQUFDLElBQUksQ0FBQyxFQUFFO2tCQUNqQ00sR0FBRyxHQUFHL0IsT0FBTyxDQUFDdUUsSUFBSSxDQUFDOUMsQ0FBQyxDQUFDLEVBQUVrQyxRQUFRLENBQUMsQ0FBQTtrQkFDaENULE9BQU8sR0FBR25CLEdBQUcsQ0FBQ2dDLENBQUMsQ0FBQTs7RUFFZjtrQkFDQSxJQUFJYixPQUFPLEtBQUssU0FBUyxFQUFFO29CQUN2Qk4sSUFBSSxDQUFDbkIsQ0FBQyxDQUFDLEdBQUd4QixRQUFRLENBQUNULE9BQU8sQ0FBQ2YsSUFBSSxDQUFDLENBQUE7RUFDcEMsaUJBQUMsTUFBTSxJQUFJeUUsT0FBTyxLQUFLLFNBQVMsRUFBRTtFQUM5QjtvQkFDQU4sSUFBSSxDQUFDbkIsQ0FBQyxDQUFDLEdBQUd4QixRQUFRLENBQUNkLE9BQU8sQ0FBQ1YsSUFBSSxDQUFDLENBQUE7RUFDaENtRyxrQkFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQTtFQUN2QixpQkFBQyxNQUFNLElBQUkxQixPQUFPLEtBQUssUUFBUSxFQUFFO0VBQzdCO29CQUNBdUIsU0FBUyxHQUFHN0IsSUFBSSxDQUFDbkIsQ0FBQyxDQUFDLEdBQUd4QixRQUFRLENBQUNmLE1BQU0sQ0FBQ1QsSUFBSSxDQUFDLENBQUE7bUJBQzlDLE1BQU0sSUFBSWtDLE9BQU8sQ0FBQ1QsT0FBTyxFQUFFZ0QsT0FBTyxDQUFDLElBQ3pCdkMsT0FBTyxDQUFDUixPQUFPLEVBQUUrQyxPQUFPLENBQUMsSUFDekJ2QyxPQUFPLENBQUNOLFFBQVEsRUFBRTZDLE9BQU8sQ0FBQyxFQUFFO0VBQ25DTixrQkFBQUEsSUFBSSxDQUFDbkIsQ0FBQyxDQUFDLEdBQUcwQixPQUFPLENBQUNELE9BQU8sQ0FBQyxDQUFBO0VBQzlCLGlCQUFDLE1BQU0sSUFBSW5CLEdBQUcsQ0FBQ21DLENBQUMsRUFBRTtvQkFDZG5DLEdBQUcsQ0FBQ21DLENBQUMsQ0FBQ1csSUFBSSxDQUFDOUMsR0FBRyxDQUFDaUMsQ0FBQyxFQUFFdkIsV0FBVyxDQUFDQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUVPLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7RUFDcEVOLGtCQUFBQSxJQUFJLENBQUNuQixDQUFDLENBQUMsR0FBR3ZCLE9BQU8sQ0FBQ2dELE9BQU8sQ0FBQyxDQUFBO0VBQzlCLGlCQUFDLE1BQU07b0JBQ0gsTUFBTSxJQUFJRSxLQUFLLENBQUMzRSxJQUFJLEdBQUcsV0FBVyxHQUFHeUUsT0FBTyxDQUFDLENBQUE7RUFDakQsaUJBQUE7RUFDSixlQUFBO0VBRUF3QixjQUFBQSxHQUFHLEdBQUdGLFFBQVEsR0FBR0EsUUFBUSxDQUFDekIsS0FBSyxDQUFDN0MsT0FBTyxDQUFDekIsSUFBSSxDQUFDLEVBQUVtRSxJQUFJLENBQUMsR0FBR3RELFNBQVMsQ0FBQTtFQUVoRSxjQUFBLElBQUliLElBQUksRUFBRTtFQUNOO0VBQ0E7RUFDQTtFQUNBLGdCQUFBLElBQUlnRyxTQUFTLElBQUlBLFNBQVMsQ0FBQ3RGLE9BQU8sS0FBS1UsS0FBSyxJQUNwQzRFLFNBQVMsQ0FBQ3RGLE9BQU8sS0FBS2UsT0FBTyxDQUFDekIsSUFBSSxDQUFDLEVBQUU7RUFDekN5QixrQkFBQUEsT0FBTyxDQUFDekIsSUFBSSxDQUFDLEdBQUdnRyxTQUFTLENBQUN0RixPQUFPLENBQUE7bUJBQ3BDLE1BQU0sSUFBSXVGLEdBQUcsS0FBSzdFLEtBQUssSUFBSSxDQUFDK0UsWUFBWSxFQUFFO0VBQ3ZDO0VBQ0ExRSxrQkFBQUEsT0FBTyxDQUFDekIsSUFBSSxDQUFDLEdBQUdpRyxHQUFHLENBQUE7RUFDdkIsaUJBQUE7RUFDSixlQUFBO2VBQ0gsTUFBTSxJQUFJakcsSUFBSSxFQUFFO0VBQ2I7RUFDQTtFQUNBeUIsY0FBQUEsT0FBTyxDQUFDekIsSUFBSSxDQUFDLEdBQUcrRixRQUFRLENBQUE7RUFDNUIsYUFBQTthQUNILENBQUE7RUFFRDVFLFVBQUFBLFNBQVMsR0FBR0osT0FBTyxHQUFHTyxHQUFHLEdBQUcsVUFBVXdFLElBQUksRUFBRUMsUUFBUSxFQUFFOUIsT0FBTyxFQUFFQyxTQUFTLEVBQUVtQyxHQUFHLEVBQUU7RUFDM0UsWUFBQSxJQUFJLE9BQU9QLElBQUksS0FBSyxRQUFRLEVBQUU7RUFDMUIsY0FBQSxJQUFJdEUsUUFBUSxDQUFDc0UsSUFBSSxDQUFDLEVBQUU7RUFDaEI7RUFDQSxnQkFBQSxPQUFPdEUsUUFBUSxDQUFDc0UsSUFBSSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFBO0VBQ25DLGVBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLGNBQUEsT0FBT3JCLE9BQU8sQ0FBQ25ELE9BQU8sQ0FBQ3VFLElBQUksRUFBRWIsWUFBWSxDQUFDYyxRQUFRLENBQUMsQ0FBQyxDQUFDVCxDQUFDLENBQUMsQ0FBQTtFQUMzRCxhQUFDLE1BQU0sSUFBSSxDQUFDUSxJQUFJLENBQUNoQyxNQUFNLEVBQUU7RUFDckI7RUFDQW5DLGNBQUFBLE1BQU0sR0FBR21FLElBQUksQ0FBQTtnQkFDYixJQUFJbkUsTUFBTSxDQUFDbUUsSUFBSSxFQUFFO2tCQUNieEUsR0FBRyxDQUFDSyxNQUFNLENBQUNtRSxJQUFJLEVBQUVuRSxNQUFNLENBQUNvRSxRQUFRLENBQUMsQ0FBQTtFQUNyQyxlQUFBO2dCQUNBLElBQUksQ0FBQ0EsUUFBUSxFQUFFO0VBQ1gsZ0JBQUEsT0FBQTtFQUNKLGVBQUE7Z0JBRUEsSUFBSUEsUUFBUSxDQUFDakMsTUFBTSxFQUFFO0VBQ2pCO0VBQ0E7RUFDQWdDLGdCQUFBQSxJQUFJLEdBQUdDLFFBQVEsQ0FBQTtFQUNmQSxnQkFBQUEsUUFBUSxHQUFHOUIsT0FBTyxDQUFBO0VBQ2xCQSxnQkFBQUEsT0FBTyxHQUFHLElBQUksQ0FBQTtFQUNsQixlQUFDLE1BQU07RUFDSDZCLGdCQUFBQSxJQUFJLEdBQUcxRSxLQUFLLENBQUE7RUFDaEIsZUFBQTtFQUNKLGFBQUE7O0VBRUE7RUFDQTJFLFlBQUFBLFFBQVEsR0FBR0EsUUFBUSxJQUFJLFlBQVksRUFBRSxDQUFBOztFQUVyQztFQUNBO0VBQ0EsWUFBQSxJQUFJLE9BQU85QixPQUFPLEtBQUssVUFBVSxFQUFFO0VBQy9CQSxjQUFBQSxPQUFPLEdBQUdDLFNBQVMsQ0FBQTtFQUNuQkEsY0FBQUEsU0FBUyxHQUFHbUMsR0FBRyxDQUFBO0VBQ25CLGFBQUE7O0VBRUE7RUFDQSxZQUFBLElBQUluQyxTQUFTLEVBQUU7Z0JBQ1g3QyxJQUFJLENBQUNELEtBQUssRUFBRTBFLElBQUksRUFBRUMsUUFBUSxFQUFFOUIsT0FBTyxDQUFDLENBQUE7RUFDeEMsYUFBQyxNQUFNO0VBQ0g7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0FxQyxjQUFBQSxVQUFVLENBQUMsWUFBWTtrQkFDbkJqRixJQUFJLENBQUNELEtBQUssRUFBRTBFLElBQUksRUFBRUMsUUFBUSxFQUFFOUIsT0FBTyxDQUFDLENBQUE7aUJBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDVCxhQUFBO0VBRUEsWUFBQSxPQUFPM0MsR0FBRyxDQUFBO2FBQ2IsQ0FBQTs7RUFFRDtFQUNKO0VBQ0E7RUFDQTtFQUNJQSxVQUFBQSxHQUFHLENBQUNLLE1BQU0sR0FBRyxVQUFVNEUsR0FBRyxFQUFFO2NBQ3hCLE9BQU9qRixHQUFHLENBQUNpRixHQUFHLENBQUMsQ0FBQTthQUNsQixDQUFBOztFQUVEO0VBQ0o7RUFDQTtZQUNJcEYsU0FBUyxDQUFDcUYsUUFBUSxHQUFHL0UsT0FBTyxDQUFBO1lBRTVCbEIsTUFBTSxHQUFHLFVBQVVQLElBQUksRUFBRThGLElBQUksRUFBRUMsUUFBUSxFQUFFO0VBQ3JDLFlBQUEsSUFBSSxPQUFPL0YsSUFBSSxLQUFLLFFBQVEsRUFBRTtFQUMxQixjQUFBLE1BQU0sSUFBSTJFLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFBO0VBQ2hGLGFBQUE7O0VBRUE7RUFDQSxZQUFBLElBQUksQ0FBQ21CLElBQUksQ0FBQ2hDLE1BQU0sRUFBRTtFQUNkO0VBQ0E7RUFDQTtFQUNBaUMsY0FBQUEsUUFBUSxHQUFHRCxJQUFJLENBQUE7RUFDZkEsY0FBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQTtFQUNiLGFBQUE7RUFFQSxZQUFBLElBQUksQ0FBQzVELE9BQU8sQ0FBQ1QsT0FBTyxFQUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQ2tDLE9BQU8sQ0FBQ1IsT0FBTyxFQUFFMUIsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BEMEIsT0FBTyxDQUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQ0EsSUFBSSxFQUFFOEYsSUFBSSxFQUFFQyxRQUFRLENBQUMsQ0FBQTtFQUMxQyxhQUFBO2FBQ0gsQ0FBQTtZQUVEeEYsTUFBTSxDQUFDQyxHQUFHLEdBQUc7RUFDVEksWUFBQUEsTUFBTSxFQUFFLElBQUE7YUFDWCxDQUFBO0VBQ0wsU0FBQyxHQUFFLENBQUE7VUFFSEksRUFBRSxDQUFDRyxTQUFTLEdBQUdBLFNBQVMsQ0FBQTtVQUFDSCxFQUFFLENBQUNELE9BQU8sR0FBR0EsT0FBTyxDQUFBO1VBQUNDLEVBQUUsQ0FBQ1QsTUFBTSxHQUFHQSxNQUFNLENBQUE7RUFDaEUsT0FBQTtFQUNBLEtBQUMsR0FBRSxDQUFBO01BQ0hTLEVBQUUsQ0FBQ1QsTUFBTSxDQUFDLFFBQVEsRUFBRSxZQUFVLEVBQUUsQ0FBQyxDQUFBOztFQUVqQztFQUNBUyxJQUFBQSxFQUFFLENBQUNULE1BQU0sQ0FBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFlBQVk7RUFDaEMsTUFBQSxJQUFJa0csRUFBRSxHQUFHN0YsTUFBTSxJQUFJZCxDQUFDLENBQUE7UUFFcEIsSUFBSTJHLEVBQUUsSUFBSSxJQUFJLElBQUlDLE9BQU8sSUFBSUEsT0FBTyxDQUFDQyxLQUFLLEVBQUU7VUFDMUNELE9BQU8sQ0FBQ0MsS0FBSyxDQUNYLHdFQUF3RSxHQUN4RSx3RUFBd0UsR0FDeEUsV0FDRixDQUFDLENBQUE7RUFDSCxPQUFBO0VBRUEsTUFBQSxPQUFPRixFQUFFLENBQUE7RUFDWCxLQUFDLENBQUMsQ0FBQTtNQUVGekYsRUFBRSxDQUFDVCxNQUFNLENBQUMsZUFBZSxFQUFDLENBQ3hCLFFBQVEsQ0FDVCxFQUFFLFVBQVVULENBQUMsRUFBRTtRQUNkLElBQUk4RyxLQUFLLEdBQUcsRUFBRSxDQUFBO0VBRWRBLE1BQUFBLEtBQUssQ0FBQ0MsTUFBTSxHQUFHLFVBQVVDLFVBQVUsRUFBRUMsVUFBVSxFQUFFO0VBQy9DLFFBQUEsSUFBSUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzlHLGNBQWMsQ0FBQTtVQUVqQyxTQUFTK0csZUFBZUEsR0FBSTtZQUMxQixJQUFJLENBQUNDLFdBQVcsR0FBR0osVUFBVSxDQUFBO0VBQy9CLFNBQUE7RUFFQSxRQUFBLEtBQUssSUFBSUssR0FBRyxJQUFJSixVQUFVLEVBQUU7WUFDMUIsSUFBSUMsU0FBUyxDQUFDM0UsSUFBSSxDQUFDMEUsVUFBVSxFQUFFSSxHQUFHLENBQUMsRUFBRTtFQUNuQ0wsWUFBQUEsVUFBVSxDQUFDSyxHQUFHLENBQUMsR0FBR0osVUFBVSxDQUFDSSxHQUFHLENBQUMsQ0FBQTtFQUNuQyxXQUFBO0VBQ0YsU0FBQTtFQUVBRixRQUFBQSxlQUFlLENBQUNuRixTQUFTLEdBQUdpRixVQUFVLENBQUNqRixTQUFTLENBQUE7RUFDaERnRixRQUFBQSxVQUFVLENBQUNoRixTQUFTLEdBQUcsSUFBSW1GLGVBQWUsRUFBRSxDQUFBO0VBQzVDSCxRQUFBQSxVQUFVLENBQUNNLFNBQVMsR0FBR0wsVUFBVSxDQUFDakYsU0FBUyxDQUFBO0VBRTNDLFFBQUEsT0FBT2dGLFVBQVUsQ0FBQTtTQUNsQixDQUFBO1FBRUQsU0FBU08sVUFBVUEsQ0FBRUMsUUFBUSxFQUFFO0VBQzdCLFFBQUEsSUFBSUMsS0FBSyxHQUFHRCxRQUFRLENBQUN4RixTQUFTLENBQUE7VUFFOUIsSUFBSTBGLE9BQU8sR0FBRyxFQUFFLENBQUE7RUFFaEIsUUFBQSxLQUFLLElBQUlDLFVBQVUsSUFBSUYsS0FBSyxFQUFFO0VBQzVCLFVBQUEsSUFBSUcsQ0FBQyxHQUFHSCxLQUFLLENBQUNFLFVBQVUsQ0FBQyxDQUFBO0VBRXpCLFVBQUEsSUFBSSxPQUFPQyxDQUFDLEtBQUssVUFBVSxFQUFFO0VBQzNCLFlBQUEsU0FBQTtFQUNGLFdBQUE7WUFFQSxJQUFJRCxVQUFVLEtBQUssYUFBYSxFQUFFO0VBQ2hDLFlBQUEsU0FBQTtFQUNGLFdBQUE7RUFFQUQsVUFBQUEsT0FBTyxDQUFDbkQsSUFBSSxDQUFDb0QsVUFBVSxDQUFDLENBQUE7RUFDMUIsU0FBQTtFQUVBLFFBQUEsT0FBT0QsT0FBTyxDQUFBO0VBQ2hCLE9BQUE7RUFFQVosTUFBQUEsS0FBSyxDQUFDZSxRQUFRLEdBQUcsVUFBVVosVUFBVSxFQUFFYSxjQUFjLEVBQUU7RUFDckQsUUFBQSxJQUFJQyxnQkFBZ0IsR0FBR1IsVUFBVSxDQUFDTyxjQUFjLENBQUMsQ0FBQTtFQUNqRCxRQUFBLElBQUlFLFlBQVksR0FBR1QsVUFBVSxDQUFDTixVQUFVLENBQUMsQ0FBQTtVQUV6QyxTQUFTZ0IsY0FBY0EsR0FBSTtFQUN6QixVQUFBLElBQUlDLE9BQU8sR0FBRzVILEtBQUssQ0FBQzBCLFNBQVMsQ0FBQ2tHLE9BQU8sQ0FBQTtZQUVyQyxJQUFJQyxRQUFRLEdBQUdMLGNBQWMsQ0FBQzlGLFNBQVMsQ0FBQ29GLFdBQVcsQ0FBQzFELE1BQU0sQ0FBQTtFQUUxRCxVQUFBLElBQUkwRSxpQkFBaUIsR0FBR25CLFVBQVUsQ0FBQ2pGLFNBQVMsQ0FBQ29GLFdBQVcsQ0FBQTtZQUV4RCxJQUFJZSxRQUFRLEdBQUcsQ0FBQyxFQUFFO2NBQ2hCRCxPQUFPLENBQUMzRixJQUFJLENBQUMrQixTQUFTLEVBQUUyQyxVQUFVLENBQUNqRixTQUFTLENBQUNvRixXQUFXLENBQUMsQ0FBQTtFQUV6RGdCLFlBQUFBLGlCQUFpQixHQUFHTixjQUFjLENBQUM5RixTQUFTLENBQUNvRixXQUFXLENBQUE7RUFDMUQsV0FBQTtFQUVBZ0IsVUFBQUEsaUJBQWlCLENBQUM1RCxLQUFLLENBQUMsSUFBSSxFQUFFRixTQUFTLENBQUMsQ0FBQTtFQUMxQyxTQUFBO0VBRUF3RCxRQUFBQSxjQUFjLENBQUNPLFdBQVcsR0FBR3BCLFVBQVUsQ0FBQ29CLFdBQVcsQ0FBQTtVQUVuRCxTQUFTQyxHQUFHQSxHQUFJO1lBQ2QsSUFBSSxDQUFDbEIsV0FBVyxHQUFHYSxjQUFjLENBQUE7RUFDbkMsU0FBQTtFQUVBQSxRQUFBQSxjQUFjLENBQUNqRyxTQUFTLEdBQUcsSUFBSXNHLEdBQUcsRUFBRSxDQUFBO0VBRXBDLFFBQUEsS0FBSyxJQUFJVixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdJLFlBQVksQ0FBQ3RFLE1BQU0sRUFBRWtFLENBQUMsRUFBRSxFQUFFO0VBQzVDLFVBQUEsSUFBSVcsV0FBVyxHQUFHUCxZQUFZLENBQUNKLENBQUMsQ0FBQyxDQUFBO1lBRWpDSyxjQUFjLENBQUNqRyxTQUFTLENBQUN1RyxXQUFXLENBQUMsR0FDbkN0QixVQUFVLENBQUNqRixTQUFTLENBQUN1RyxXQUFXLENBQUMsQ0FBQTtFQUNyQyxTQUFBO0VBRUEsUUFBQSxJQUFJQyxZQUFZLEdBQUcsVUFBVWIsVUFBVSxFQUFFO0VBQ3ZDO0VBQ0EsVUFBQSxJQUFJYyxjQUFjLEdBQUcsWUFBWSxFQUFFLENBQUE7RUFFbkMsVUFBQSxJQUFJZCxVQUFVLElBQUlNLGNBQWMsQ0FBQ2pHLFNBQVMsRUFBRTtFQUMxQ3lHLFlBQUFBLGNBQWMsR0FBR1IsY0FBYyxDQUFDakcsU0FBUyxDQUFDMkYsVUFBVSxDQUFDLENBQUE7RUFDdkQsV0FBQTtFQUVBLFVBQUEsSUFBSWUsZUFBZSxHQUFHWixjQUFjLENBQUM5RixTQUFTLENBQUMyRixVQUFVLENBQUMsQ0FBQTtFQUUxRCxVQUFBLE9BQU8sWUFBWTtFQUNqQixZQUFBLElBQUlPLE9BQU8sR0FBRzVILEtBQUssQ0FBQzBCLFNBQVMsQ0FBQ2tHLE9BQU8sQ0FBQTtFQUVyQ0EsWUFBQUEsT0FBTyxDQUFDM0YsSUFBSSxDQUFDK0IsU0FBUyxFQUFFbUUsY0FBYyxDQUFDLENBQUE7RUFFdkMsWUFBQSxPQUFPQyxlQUFlLENBQUNsRSxLQUFLLENBQUMsSUFBSSxFQUFFRixTQUFTLENBQUMsQ0FBQTthQUM5QyxDQUFBO1dBQ0YsQ0FBQTtFQUVELFFBQUEsS0FBSyxJQUFJcUUsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHWixnQkFBZ0IsQ0FBQ3JFLE1BQU0sRUFBRWlGLENBQUMsRUFBRSxFQUFFO0VBQ2hELFVBQUEsSUFBSUQsZUFBZSxHQUFHWCxnQkFBZ0IsQ0FBQ1ksQ0FBQyxDQUFDLENBQUE7WUFFekNWLGNBQWMsQ0FBQ2pHLFNBQVMsQ0FBQzBHLGVBQWUsQ0FBQyxHQUFHRixZQUFZLENBQUNFLGVBQWUsQ0FBQyxDQUFBO0VBQzNFLFNBQUE7RUFFQSxRQUFBLE9BQU9ULGNBQWMsQ0FBQTtTQUN0QixDQUFBO0VBRUQsTUFBQSxJQUFJVyxVQUFVLEdBQUcsWUFBWTtFQUMzQixRQUFBLElBQUksQ0FBQ0MsU0FBUyxHQUFHLEVBQUUsQ0FBQTtTQUNwQixDQUFBO1FBRURELFVBQVUsQ0FBQzVHLFNBQVMsQ0FBQzhHLEVBQUUsR0FBRyxVQUFVQyxLQUFLLEVBQUU5QyxRQUFRLEVBQUU7VUFDbkQsSUFBSSxDQUFDNEMsU0FBUyxHQUFHLElBQUksQ0FBQ0EsU0FBUyxJQUFJLEVBQUUsQ0FBQTtFQUVyQyxRQUFBLElBQUlFLEtBQUssSUFBSSxJQUFJLENBQUNGLFNBQVMsRUFBRTtZQUMzQixJQUFJLENBQUNBLFNBQVMsQ0FBQ0UsS0FBSyxDQUFDLENBQUN4RSxJQUFJLENBQUMwQixRQUFRLENBQUMsQ0FBQTtFQUN0QyxTQUFDLE1BQU07WUFDTCxJQUFJLENBQUM0QyxTQUFTLENBQUNFLEtBQUssQ0FBQyxHQUFHLENBQUM5QyxRQUFRLENBQUMsQ0FBQTtFQUNwQyxTQUFBO1NBQ0QsQ0FBQTtFQUVEMkMsTUFBQUEsVUFBVSxDQUFDNUcsU0FBUyxDQUFDZ0gsT0FBTyxHQUFHLFVBQVVELEtBQUssRUFBRTtFQUM5QyxRQUFBLElBQUk3RyxLQUFLLEdBQUc1QixLQUFLLENBQUMwQixTQUFTLENBQUNFLEtBQUssQ0FBQTtVQUNqQyxJQUFJK0csTUFBTSxHQUFHL0csS0FBSyxDQUFDSyxJQUFJLENBQUMrQixTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7VUFFckMsSUFBSSxDQUFDdUUsU0FBUyxHQUFHLElBQUksQ0FBQ0EsU0FBUyxJQUFJLEVBQUUsQ0FBQTs7RUFFckM7VUFDQSxJQUFJSSxNQUFNLElBQUksSUFBSSxFQUFFO0VBQ2xCQSxVQUFBQSxNQUFNLEdBQUcsRUFBRSxDQUFBO0VBQ2IsU0FBQTs7RUFFQTtFQUNBLFFBQUEsSUFBSUEsTUFBTSxDQUFDdkYsTUFBTSxLQUFLLENBQUMsRUFBRTtFQUN2QnVGLFVBQUFBLE1BQU0sQ0FBQzFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtFQUNqQixTQUFBOztFQUVBO0VBQ0EwRSxRQUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNDLEtBQUssR0FBR0gsS0FBSyxDQUFBO0VBRXZCLFFBQUEsSUFBSUEsS0FBSyxJQUFJLElBQUksQ0FBQ0YsU0FBUyxFQUFFO0VBQzNCLFVBQUEsSUFBSSxDQUFDTSxNQUFNLENBQUMsSUFBSSxDQUFDTixTQUFTLENBQUNFLEtBQUssQ0FBQyxFQUFFN0csS0FBSyxDQUFDSyxJQUFJLENBQUMrQixTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUM5RCxTQUFBO0VBRUEsUUFBQSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUN1RSxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDTSxNQUFNLENBQUMsSUFBSSxDQUFDTixTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUV2RSxTQUFTLENBQUMsQ0FBQTtFQUM3QyxTQUFBO1NBQ0QsQ0FBQTtRQUVEc0UsVUFBVSxDQUFDNUcsU0FBUyxDQUFDbUgsTUFBTSxHQUFHLFVBQVVOLFNBQVMsRUFBRUksTUFBTSxFQUFFO0VBQ3pELFFBQUEsS0FBSyxJQUFJL0YsQ0FBQyxHQUFHLENBQUMsRUFBRWtHLEdBQUcsR0FBR1AsU0FBUyxDQUFDbkYsTUFBTSxFQUFFUixDQUFDLEdBQUdrRyxHQUFHLEVBQUVsRyxDQUFDLEVBQUUsRUFBRTtZQUNwRDJGLFNBQVMsQ0FBQzNGLENBQUMsQ0FBQyxDQUFDc0IsS0FBSyxDQUFDLElBQUksRUFBRXlFLE1BQU0sQ0FBQyxDQUFBO0VBQ2xDLFNBQUE7U0FDRCxDQUFBO1FBRURuQyxLQUFLLENBQUM4QixVQUFVLEdBQUdBLFVBQVUsQ0FBQTtFQUU3QjlCLE1BQUFBLEtBQUssQ0FBQ3VDLGFBQWEsR0FBRyxVQUFVM0YsTUFBTSxFQUFFO1VBQ3RDLElBQUk0RixLQUFLLEdBQUcsRUFBRSxDQUFBO1VBRWQsS0FBSyxJQUFJcEcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHUSxNQUFNLEVBQUVSLENBQUMsRUFBRSxFQUFFO0VBQy9CLFVBQUEsSUFBSXFHLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7RUFDL0NKLFVBQUFBLEtBQUssSUFBSUMsVUFBVSxDQUFDSSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7RUFDbEMsU0FBQTtFQUVBLFFBQUEsT0FBT0wsS0FBSyxDQUFBO1NBQ2IsQ0FBQTtFQUVEeEMsTUFBQUEsS0FBSyxDQUFDOEMsSUFBSSxHQUFHLFVBQVVDLElBQUksRUFBRUMsT0FBTyxFQUFFO0VBQ3BDLFFBQUEsT0FBTyxZQUFZO0VBQ2pCRCxVQUFBQSxJQUFJLENBQUNyRixLQUFLLENBQUNzRixPQUFPLEVBQUV4RixTQUFTLENBQUMsQ0FBQTtXQUMvQixDQUFBO1NBQ0YsQ0FBQTtFQUVEd0MsTUFBQUEsS0FBSyxDQUFDaUQsWUFBWSxHQUFHLFVBQVVDLElBQUksRUFBRTtFQUNuQyxRQUFBLEtBQUssSUFBSUMsV0FBVyxJQUFJRCxJQUFJLEVBQUU7RUFDNUIsVUFBQSxJQUFJRSxJQUFJLEdBQUdELFdBQVcsQ0FBQzFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUVqQyxJQUFJNEcsU0FBUyxHQUFHSCxJQUFJLENBQUE7RUFFcEIsVUFBQSxJQUFJRSxJQUFJLENBQUN4RyxNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQ3JCLFlBQUEsU0FBQTtFQUNGLFdBQUE7RUFFQSxVQUFBLEtBQUssSUFBSTBHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0YsSUFBSSxDQUFDeEcsTUFBTSxFQUFFMEcsQ0FBQyxFQUFFLEVBQUU7RUFDcEMsWUFBQSxJQUFJL0MsR0FBRyxHQUFHNkMsSUFBSSxDQUFDRSxDQUFDLENBQUMsQ0FBQTs7RUFFakI7RUFDQTtFQUNBL0MsWUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNuQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDbUYsV0FBVyxFQUFFLEdBQUdoRCxHQUFHLENBQUNuQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFFMUQsWUFBQSxJQUFJLEVBQUVtQyxHQUFHLElBQUk4QyxTQUFTLENBQUMsRUFBRTtFQUN2QkEsY0FBQUEsU0FBUyxDQUFDOUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO0VBQ3JCLGFBQUE7RUFFQSxZQUFBLElBQUkrQyxDQUFDLElBQUlGLElBQUksQ0FBQ3hHLE1BQU0sR0FBRyxDQUFDLEVBQUU7RUFDeEJ5RyxjQUFBQSxTQUFTLENBQUM5QyxHQUFHLENBQUMsR0FBRzJDLElBQUksQ0FBQ0MsV0FBVyxDQUFDLENBQUE7RUFDcEMsYUFBQTtFQUVBRSxZQUFBQSxTQUFTLEdBQUdBLFNBQVMsQ0FBQzlDLEdBQUcsQ0FBQyxDQUFBO0VBQzVCLFdBQUE7WUFFQSxPQUFPMkMsSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQTtFQUMxQixTQUFBO0VBRUEsUUFBQSxPQUFPRCxJQUFJLENBQUE7U0FDWixDQUFBO0VBRURsRCxNQUFBQSxLQUFLLENBQUN3RCxTQUFTLEdBQUcsVUFBVXRGLEtBQUssRUFBRXVGLEVBQUUsRUFBRTtFQUNyQztFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBLFFBQUEsSUFBSUMsR0FBRyxHQUFHeEssQ0FBQyxDQUFDdUssRUFBRSxDQUFDLENBQUE7RUFDZixRQUFBLElBQUlFLFNBQVMsR0FBR0YsRUFBRSxDQUFDRyxLQUFLLENBQUNELFNBQVMsQ0FBQTtFQUNsQyxRQUFBLElBQUlFLFNBQVMsR0FBR0osRUFBRSxDQUFDRyxLQUFLLENBQUNDLFNBQVMsQ0FBQTs7RUFFbEM7RUFDQSxRQUFBLElBQUlGLFNBQVMsS0FBS0UsU0FBUyxLQUN0QkEsU0FBUyxLQUFLLFFBQVEsSUFBSUEsU0FBUyxLQUFLLFNBQVMsQ0FBQyxFQUFFO0VBQ3ZELFVBQUEsT0FBTyxLQUFLLENBQUE7RUFDZCxTQUFBO0VBRUEsUUFBQSxJQUFJRixTQUFTLEtBQUssUUFBUSxJQUFJRSxTQUFTLEtBQUssUUFBUSxFQUFFO0VBQ3BELFVBQUEsT0FBTyxJQUFJLENBQUE7RUFDYixTQUFBO0VBRUEsUUFBQSxPQUFRSCxHQUFHLENBQUNJLFdBQVcsRUFBRSxHQUFHTCxFQUFFLENBQUNNLFlBQVksSUFDekNMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLEdBQUdQLEVBQUUsQ0FBQ1EsV0FBVyxDQUFBO1NBQ3BDLENBQUE7RUFFRGpFLE1BQUFBLEtBQUssQ0FBQ2tFLFlBQVksR0FBRyxVQUFVQyxNQUFNLEVBQUU7RUFDckMsUUFBQSxJQUFJQyxVQUFVLEdBQUc7RUFDZixVQUFBLElBQUksRUFBRSxPQUFPO0VBQ2IsVUFBQSxHQUFHLEVBQUUsT0FBTztFQUNaLFVBQUEsR0FBRyxFQUFFLE1BQU07RUFDWCxVQUFBLEdBQUcsRUFBRSxNQUFNO0VBQ1gsVUFBQSxHQUFHLEVBQUUsUUFBUTtFQUNiLFVBQUEsSUFBSSxFQUFFLE9BQU87RUFDYixVQUFBLEdBQUcsRUFBRSxPQUFBO1dBQ04sQ0FBQTs7RUFFRDtFQUNBLFFBQUEsSUFBSSxPQUFPRCxNQUFNLEtBQUssUUFBUSxFQUFFO0VBQzlCLFVBQUEsT0FBT0EsTUFBTSxDQUFBO0VBQ2YsU0FBQTtVQUVBLE9BQU9FLE1BQU0sQ0FBQ0YsTUFBTSxDQUFDLENBQUNwSCxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVV1SCxLQUFLLEVBQUU7WUFDN0QsT0FBT0YsVUFBVSxDQUFDRSxLQUFLLENBQUMsQ0FBQTtFQUMxQixTQUFDLENBQUMsQ0FBQTtTQUNILENBQUE7O0VBRUQ7RUFDQXRFLE1BQUFBLEtBQUssQ0FBQ3VFLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFFbEIsSUFBSXZGLEVBQUUsR0FBRyxDQUFDLENBQUE7RUFDVmdCLE1BQUFBLEtBQUssQ0FBQ3dFLGtCQUFrQixHQUFHLFVBQVVDLE9BQU8sRUFBRTtFQUM1QztFQUNBO0VBQ0E7RUFDQTs7RUFFQSxRQUFBLElBQUlDLFNBQVMsR0FBR0QsT0FBTyxDQUFDRSxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtVQUV2RCxJQUFJRCxTQUFTLElBQUksSUFBSSxFQUFFO0VBQ3JCLFVBQUEsT0FBT0EsU0FBUyxDQUFBO0VBQ2xCLFNBQUE7O0VBRUE7VUFDQSxJQUFJRCxPQUFPLENBQUN6RixFQUFFLEVBQUU7RUFDZDBGLFVBQUFBLFNBQVMsR0FBRyxlQUFlLEdBQUdELE9BQU8sQ0FBQ3pGLEVBQUUsQ0FBQTtFQUMxQyxTQUFDLE1BQU07RUFDTDBGLFVBQUFBLFNBQVMsR0FBRyxlQUFlLEdBQUcsQ0FBQyxFQUFFMUYsRUFBRSxFQUFFNkQsUUFBUSxFQUFFLEdBQzdDLEdBQUcsR0FBRzdDLEtBQUssQ0FBQ3VDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUNoQyxTQUFBO0VBRUFrQyxRQUFBQSxPQUFPLENBQUNHLFlBQVksQ0FBQyxpQkFBaUIsRUFBRUYsU0FBUyxDQUFDLENBQUE7RUFFbEQsUUFBQSxPQUFPQSxTQUFTLENBQUE7U0FDakIsQ0FBQTtRQUVEMUUsS0FBSyxDQUFDNkUsU0FBUyxHQUFHLFVBQVVKLE9BQU8sRUFBRXJMLElBQUksRUFBRUMsS0FBSyxFQUFFO0VBQ2hEO0VBQ0E7RUFDQSxRQUFBLElBQUkyRixFQUFFLEdBQUdnQixLQUFLLENBQUN3RSxrQkFBa0IsQ0FBQ0MsT0FBTyxDQUFDLENBQUE7RUFDMUMsUUFBQSxJQUFJLENBQUN6RSxLQUFLLENBQUN1RSxPQUFPLENBQUN2RixFQUFFLENBQUMsRUFBRTtFQUN0QmdCLFVBQUFBLEtBQUssQ0FBQ3VFLE9BQU8sQ0FBQ3ZGLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtFQUN4QixTQUFBO1VBRUFnQixLQUFLLENBQUN1RSxPQUFPLENBQUN2RixFQUFFLENBQUMsQ0FBQzVGLElBQUksQ0FBQyxHQUFHQyxLQUFLLENBQUE7U0FDaEMsQ0FBQTtFQUVEMkcsTUFBQUEsS0FBSyxDQUFDOEUsT0FBTyxHQUFHLFVBQVVMLE9BQU8sRUFBRXJMLElBQUksRUFBRTtFQUN2QztFQUNBO0VBQ0E7RUFDQTtFQUNBLFFBQUEsSUFBSTRGLEVBQUUsR0FBR2dCLEtBQUssQ0FBQ3dFLGtCQUFrQixDQUFDQyxPQUFPLENBQUMsQ0FBQTtFQUMxQyxRQUFBLElBQUlyTCxJQUFJLEVBQUU7RUFDUixVQUFBLElBQUk0RyxLQUFLLENBQUN1RSxPQUFPLENBQUN2RixFQUFFLENBQUMsRUFBRTtjQUNyQixJQUFJZ0IsS0FBSyxDQUFDdUUsT0FBTyxDQUFDdkYsRUFBRSxDQUFDLENBQUM1RixJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ25DLE9BQU80RyxLQUFLLENBQUN1RSxPQUFPLENBQUN2RixFQUFFLENBQUMsQ0FBQzVGLElBQUksQ0FBQyxDQUFBO0VBQ2hDLGFBQUE7Y0FDQSxPQUFPRixDQUFDLENBQUN1TCxPQUFPLENBQUMsQ0FBQ3ZCLElBQUksQ0FBQzlKLElBQUksQ0FBQyxDQUFDO0VBQy9CLFdBQUE7WUFDQSxPQUFPRixDQUFDLENBQUN1TCxPQUFPLENBQUMsQ0FBQ3ZCLElBQUksQ0FBQzlKLElBQUksQ0FBQyxDQUFDO0VBQy9CLFNBQUMsTUFBTTtFQUNMLFVBQUEsT0FBTzRHLEtBQUssQ0FBQ3VFLE9BQU8sQ0FBQ3ZGLEVBQUUsQ0FBQyxDQUFBO0VBQzFCLFNBQUE7U0FDRCxDQUFBO0VBRURnQixNQUFBQSxLQUFLLENBQUMrRSxVQUFVLEdBQUcsVUFBVU4sT0FBTyxFQUFFO0VBQ3BDO0VBQ0EsUUFBQSxJQUFJekYsRUFBRSxHQUFHZ0IsS0FBSyxDQUFDd0Usa0JBQWtCLENBQUNDLE9BQU8sQ0FBQyxDQUFBO1VBQzFDLElBQUl6RSxLQUFLLENBQUN1RSxPQUFPLENBQUN2RixFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUU7RUFDN0IsVUFBQSxPQUFPZ0IsS0FBSyxDQUFDdUUsT0FBTyxDQUFDdkYsRUFBRSxDQUFDLENBQUE7RUFDMUIsU0FBQTtFQUVBeUYsUUFBQUEsT0FBTyxDQUFDTyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtTQUMzQyxDQUFBO0VBRURoRixNQUFBQSxLQUFLLENBQUNpRix5QkFBeUIsR0FBRyxVQUFVQyxJQUFJLEVBQUVDLEdBQUcsRUFBRTtFQUdyRCxRQUFBLElBQUlDLGtCQUFrQixHQUFHRixJQUFJLENBQUNQLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQ1UsSUFBSSxFQUFFLENBQUM1SSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7RUFFdkUySSxRQUFBQSxrQkFBa0IsR0FBR0Esa0JBQWtCLENBQUNFLE1BQU0sQ0FBQyxVQUFVQyxLQUFLLEVBQUU7RUFDOUQ7RUFDQSxVQUFBLE9BQU9BLEtBQUssQ0FBQ3BILE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7RUFDeEMsU0FBQyxDQUFDLENBQUE7RUFFRixRQUFBLElBQUlxSCxhQUFhLEdBQUdMLEdBQUcsQ0FBQ1IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDVSxJQUFJLEVBQUUsQ0FBQzVJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUVqRStJLFFBQUFBLGFBQWEsR0FBR0EsYUFBYSxDQUFDRixNQUFNLENBQUMsVUFBVUMsS0FBSyxFQUFFO0VBQ3BEO0VBQ0EsVUFBQSxPQUFPQSxLQUFLLENBQUNwSCxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ3hDLFNBQUMsQ0FBQyxDQUFBO0VBRUYsUUFBQSxJQUFJc0gsWUFBWSxHQUFHTCxrQkFBa0IsQ0FBQ25JLE1BQU0sQ0FBQ3VJLGFBQWEsQ0FBQyxDQUFBO1VBRTNETixJQUFJLENBQUNOLFlBQVksQ0FBQyxPQUFPLEVBQUVhLFlBQVksQ0FBQ3RJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ25ELENBQUE7RUFFRCxNQUFBLE9BQU82QyxLQUFLLENBQUE7RUFDZCxLQUFDLENBQUMsQ0FBQTtFQUVGNUYsSUFBQUEsRUFBRSxDQUFDVCxNQUFNLENBQUMsaUJBQWlCLEVBQUMsQ0FDMUIsUUFBUSxFQUNSLFNBQVMsQ0FDVixFQUFFLFVBQVVULENBQUMsRUFBRThHLEtBQUssRUFBRTtFQUNyQixNQUFBLFNBQVMwRixPQUFPQSxDQUFFQyxRQUFRLEVBQUVDLE9BQU8sRUFBRUMsV0FBVyxFQUFFO1VBQ2hELElBQUksQ0FBQ0YsUUFBUSxHQUFHQSxRQUFRLENBQUE7VUFDeEIsSUFBSSxDQUFDekMsSUFBSSxHQUFHMkMsV0FBVyxDQUFBO1VBQ3ZCLElBQUksQ0FBQ0QsT0FBTyxHQUFHQSxPQUFPLENBQUE7VUFFdEJGLE9BQU8sQ0FBQ2xGLFNBQVMsQ0FBQ0YsV0FBVyxDQUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQzFDLE9BQUE7UUFFQXVFLEtBQUssQ0FBQ0MsTUFBTSxDQUFDeUYsT0FBTyxFQUFFMUYsS0FBSyxDQUFDOEIsVUFBVSxDQUFDLENBQUE7RUFFdkM0RCxNQUFBQSxPQUFPLENBQUN4SyxTQUFTLENBQUM0SyxNQUFNLEdBQUcsWUFBWTtFQUNyQyxRQUFBLElBQUlDLFFBQVEsR0FBRzdNLENBQUMsQ0FDZCwyREFDRixDQUFDLENBQUE7VUFFRCxJQUFJLElBQUksQ0FBQzBNLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0VBQ2hDRCxVQUFBQSxRQUFRLENBQUNFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUMvQyxTQUFBO1VBRUEsSUFBSSxDQUFDRixRQUFRLEdBQUdBLFFBQVEsQ0FBQTtFQUV4QixRQUFBLE9BQU9BLFFBQVEsQ0FBQTtTQUNoQixDQUFBO0VBRURMLE1BQUFBLE9BQU8sQ0FBQ3hLLFNBQVMsQ0FBQ2dMLEtBQUssR0FBRyxZQUFZO0VBQ3BDLFFBQUEsSUFBSSxDQUFDSCxRQUFRLENBQUNJLEtBQUssRUFBRSxDQUFBO1NBQ3RCLENBQUE7RUFFRFQsTUFBQUEsT0FBTyxDQUFDeEssU0FBUyxDQUFDa0wsY0FBYyxHQUFHLFVBQVVqRSxNQUFNLEVBQUU7VUFDbkQsSUFBSStCLFlBQVksR0FBRyxJQUFJLENBQUMwQixPQUFPLENBQUNJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtVQUVuRCxJQUFJLENBQUNFLEtBQUssRUFBRSxDQUFBO1VBQ1osSUFBSSxDQUFDRyxXQUFXLEVBQUUsQ0FBQTtFQUVsQixRQUFBLElBQUlDLFFBQVEsR0FBR3BOLENBQUMsQ0FDZCx3Q0FBd0MsR0FDeEMsd0NBQ0YsQ0FBQyxDQUFBO0VBRUQsUUFBQSxJQUFJcU4sT0FBTyxHQUFHLElBQUksQ0FBQ1gsT0FBTyxDQUFDSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUNBLEdBQUcsQ0FBQzdELE1BQU0sQ0FBQ29FLE9BQU8sQ0FBQyxDQUFBO0VBRWxFRCxRQUFBQSxRQUFRLENBQUNFLE1BQU0sQ0FDYnRDLFlBQVksQ0FDVnFDLE9BQU8sQ0FBQ3BFLE1BQU0sQ0FBQzVFLElBQUksQ0FDckIsQ0FDRixDQUFDLENBQUE7RUFFRCtJLFFBQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ0csU0FBUyxJQUFJLDJCQUEyQixDQUFBO0VBRXBELFFBQUEsSUFBSSxDQUFDVixRQUFRLENBQUNTLE1BQU0sQ0FBQ0YsUUFBUSxDQUFDLENBQUE7U0FDL0IsQ0FBQTtFQUVEWixNQUFBQSxPQUFPLENBQUN4SyxTQUFTLENBQUN3TCxZQUFZLEdBQUcsWUFBWTtVQUMzQyxJQUFJLENBQUNYLFFBQVEsQ0FBQ1ksSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUNDLE1BQU0sRUFBRSxDQUFBO1NBQ3pELENBQUE7RUFFRGxCLE1BQUFBLE9BQU8sQ0FBQ3hLLFNBQVMsQ0FBQ3NMLE1BQU0sR0FBRyxVQUFVdEQsSUFBSSxFQUFFO1VBQ3pDLElBQUksQ0FBQ21ELFdBQVcsRUFBRSxDQUFBO1VBRWxCLElBQUlRLFFBQVEsR0FBRyxFQUFFLENBQUE7RUFFakIsUUFBQSxJQUFJM0QsSUFBSSxDQUFDNEQsT0FBTyxJQUFJLElBQUksSUFBSTVELElBQUksQ0FBQzRELE9BQU8sQ0FBQ2xLLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUNtSixRQUFRLENBQUNnQixRQUFRLEVBQUUsQ0FBQ25LLE1BQU0sS0FBSyxDQUFDLEVBQUU7RUFDekMsWUFBQSxJQUFJLENBQUNzRixPQUFPLENBQUMsaUJBQWlCLEVBQUU7RUFDOUJxRSxjQUFBQSxPQUFPLEVBQUUsV0FBQTtFQUNYLGFBQUMsQ0FBQyxDQUFBO0VBQ0osV0FBQTtFQUVBLFVBQUEsT0FBQTtFQUNGLFNBQUE7VUFFQXJELElBQUksQ0FBQzRELE9BQU8sR0FBRyxJQUFJLENBQUNFLElBQUksQ0FBQzlELElBQUksQ0FBQzRELE9BQU8sQ0FBQyxDQUFBO0VBRXRDLFFBQUEsS0FBSyxJQUFJakYsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHcUIsSUFBSSxDQUFDNEQsT0FBTyxDQUFDbEssTUFBTSxFQUFFaUYsQ0FBQyxFQUFFLEVBQUU7RUFDNUMsVUFBQSxJQUFJb0YsSUFBSSxHQUFHL0QsSUFBSSxDQUFDNEQsT0FBTyxDQUFDakYsQ0FBQyxDQUFDLENBQUE7RUFFMUIsVUFBQSxJQUFJcUYsT0FBTyxHQUFHLElBQUksQ0FBQ0MsTUFBTSxDQUFDRixJQUFJLENBQUMsQ0FBQTtFQUUvQkosVUFBQUEsUUFBUSxDQUFDcEosSUFBSSxDQUFDeUosT0FBTyxDQUFDLENBQUE7RUFDeEIsU0FBQTtFQUVBLFFBQUEsSUFBSSxDQUFDbkIsUUFBUSxDQUFDUyxNQUFNLENBQUNLLFFBQVEsQ0FBQyxDQUFBO1NBQy9CLENBQUE7UUFFRG5CLE9BQU8sQ0FBQ3hLLFNBQVMsQ0FBQ2tNLFFBQVEsR0FBRyxVQUFVckIsUUFBUSxFQUFFc0IsU0FBUyxFQUFFO0VBQzFELFFBQUEsSUFBSUMsaUJBQWlCLEdBQUdELFNBQVMsQ0FBQ1YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7RUFDMURXLFFBQUFBLGlCQUFpQixDQUFDZCxNQUFNLENBQUNULFFBQVEsQ0FBQyxDQUFBO1NBQ25DLENBQUE7RUFFREwsTUFBQUEsT0FBTyxDQUFDeEssU0FBUyxDQUFDOEwsSUFBSSxHQUFHLFVBQVU5RCxJQUFJLEVBQUU7VUFDdkMsSUFBSXFFLE1BQU0sR0FBRyxJQUFJLENBQUMzQixPQUFPLENBQUNJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtVQUV2QyxPQUFPdUIsTUFBTSxDQUFDckUsSUFBSSxDQUFDLENBQUE7U0FDcEIsQ0FBQTtFQUVEd0MsTUFBQUEsT0FBTyxDQUFDeEssU0FBUyxDQUFDc00sa0JBQWtCLEdBQUcsWUFBWTtVQUNqRCxJQUFJWCxRQUFRLEdBQUcsSUFBSSxDQUFDZCxRQUFRLENBQ3pCWSxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtFQUUvQyxRQUFBLElBQUljLFNBQVMsR0FBR1osUUFBUSxDQUFDdkIsTUFBTSxDQUFDLG9DQUFvQyxDQUFDLENBQUE7O0VBRXJFO0VBQ0EsUUFBQSxJQUFJbUMsU0FBUyxDQUFDN0ssTUFBTSxHQUFHLENBQUMsRUFBRTtFQUN4QjtZQUNBNkssU0FBUyxDQUFDQyxLQUFLLEVBQUUsQ0FBQ3hGLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtFQUN6QyxTQUFDLE1BQU07RUFDTDtFQUNBO1lBQ0EyRSxRQUFRLENBQUNhLEtBQUssRUFBRSxDQUFDeEYsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0VBQ3hDLFNBQUE7VUFFQSxJQUFJLENBQUN5RixzQkFBc0IsRUFBRSxDQUFBO1NBQzlCLENBQUE7RUFFRGpDLE1BQUFBLE9BQU8sQ0FBQ3hLLFNBQVMsQ0FBQzBNLFVBQVUsR0FBRyxZQUFZO1VBQ3pDLElBQUlDLElBQUksR0FBRyxJQUFJLENBQUE7RUFFZixRQUFBLElBQUksQ0FBQzNFLElBQUksQ0FBQzRFLE9BQU8sQ0FBQyxVQUFVQyxRQUFRLEVBQUU7WUFDcEMsSUFBSUMsV0FBVyxHQUFHRCxRQUFRLENBQUNyTCxHQUFHLENBQUMsVUFBVXVMLENBQUMsRUFBRTtFQUMxQyxZQUFBLE9BQU9BLENBQUMsQ0FBQ2pKLEVBQUUsQ0FBQzZELFFBQVEsRUFBRSxDQUFBO0VBQ3hCLFdBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBSWdFLFFBQVEsR0FBR2dCLElBQUksQ0FBQzlCLFFBQVEsQ0FDekJZLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO1lBRS9DRSxRQUFRLENBQUMxTixJQUFJLENBQUMsWUFBWTtFQUN4QixZQUFBLElBQUkrTixPQUFPLEdBQUdoTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7Y0FFckIsSUFBSStOLElBQUksR0FBR2pILEtBQUssQ0FBQzhFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7O0VBRXRDO0VBQ0EsWUFBQSxJQUFJOUYsRUFBRSxHQUFHLEVBQUUsR0FBR2lJLElBQUksQ0FBQ2pJLEVBQUUsQ0FBQTtjQUVyQixJQUFLaUksSUFBSSxDQUFDeEMsT0FBTyxJQUFJLElBQUksSUFBSXdDLElBQUksQ0FBQ3hDLE9BQU8sQ0FBQ3NELFFBQVEsSUFDN0NkLElBQUksQ0FBQ3hDLE9BQU8sSUFBSSxJQUFJLElBQUl1RCxXQUFXLENBQUM3SixPQUFPLENBQUNhLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBRSxFQUFFO0VBQzFELGNBQUEsSUFBSSxDQUFDa0osU0FBUyxDQUFDQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtFQUN2RGpCLGNBQUFBLE9BQU8sQ0FBQ2pCLElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUE7RUFDdkMsYUFBQyxNQUFNO0VBQ0wsY0FBQSxJQUFJLENBQUNpQyxTQUFTLENBQUN0QixNQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtFQUMxRE0sY0FBQUEsT0FBTyxDQUFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQTtFQUN4QyxhQUFBO0VBQ0YsV0FBQyxDQUFDLENBQUE7RUFFSixTQUFDLENBQUMsQ0FBQTtTQUNILENBQUE7RUFFRFAsTUFBQUEsT0FBTyxDQUFDeEssU0FBUyxDQUFDa04sV0FBVyxHQUFHLFVBQVVqRyxNQUFNLEVBQUU7VUFDaEQsSUFBSSxDQUFDa0UsV0FBVyxFQUFFLENBQUE7RUFFbEIsUUFBQSxJQUFJZ0MsV0FBVyxHQUFHLElBQUksQ0FBQ3pDLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDQSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7RUFFbkUsUUFBQSxJQUFJc0MsT0FBTyxHQUFHO0VBQ1pDLFVBQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2RELFVBQUFBLE9BQU8sRUFBRSxJQUFJO1lBQ2JFLElBQUksRUFBRUgsV0FBVyxDQUFDbEcsTUFBTSxDQUFBO1dBQ3pCLENBQUE7RUFDRCxRQUFBLElBQUlzRyxRQUFRLEdBQUcsSUFBSSxDQUFDdEIsTUFBTSxDQUFDbUIsT0FBTyxDQUFDLENBQUE7VUFDbkNHLFFBQVEsQ0FBQ2hDLFNBQVMsSUFBSSxrQkFBa0IsQ0FBQTtFQUV4QyxRQUFBLElBQUksQ0FBQ1YsUUFBUSxDQUFDMkMsT0FBTyxDQUFDRCxRQUFRLENBQUMsQ0FBQTtTQUNoQyxDQUFBO0VBRUQvQyxNQUFBQSxPQUFPLENBQUN4SyxTQUFTLENBQUNtTCxXQUFXLEdBQUcsWUFBWTtVQUMxQyxJQUFJLENBQUNOLFFBQVEsQ0FBQ1ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUNDLE1BQU0sRUFBRSxDQUFBO1NBQ2hELENBQUE7RUFFRGxCLE1BQUFBLE9BQU8sQ0FBQ3hLLFNBQVMsQ0FBQ2lNLE1BQU0sR0FBRyxVQUFVakUsSUFBSSxFQUFFO0VBQ3pDLFFBQUEsSUFBSWlFLE1BQU0sR0FBR3dCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQ3pDekIsUUFBQUEsTUFBTSxDQUFDZSxTQUFTLENBQUNDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0VBQy9DaEIsUUFBQUEsTUFBTSxDQUFDZSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO0VBRTNELFFBQUEsSUFBSVUsS0FBSyxHQUFHO0VBQ1YsVUFBQSxNQUFNLEVBQUUsUUFBQTtXQUNULENBQUE7VUFFRCxJQUFJQyxPQUFPLEdBQUc1TyxNQUFNLENBQUM2TyxPQUFPLENBQUM3TixTQUFTLENBQUM0TixPQUFPLElBQzVDNU8sTUFBTSxDQUFDNk8sT0FBTyxDQUFDN04sU0FBUyxDQUFDOE4saUJBQWlCLElBQzFDOU8sTUFBTSxDQUFDNk8sT0FBTyxDQUFDN04sU0FBUyxDQUFDK04scUJBQXFCLENBQUE7VUFFaEQsSUFBSy9GLElBQUksQ0FBQ3VCLE9BQU8sSUFBSSxJQUFJLElBQUlxRSxPQUFPLENBQUNyTixJQUFJLENBQUN5SCxJQUFJLENBQUN1QixPQUFPLEVBQUUsV0FBVyxDQUFDLElBQy9EdkIsSUFBSSxDQUFDdUIsT0FBTyxJQUFJLElBQUksSUFBSXZCLElBQUksQ0FBQ3FGLFFBQVMsRUFBRTtFQUMzQ00sVUFBQUEsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtFQUUvQjFCLFVBQUFBLE1BQU0sQ0FBQ2UsU0FBUyxDQUFDdEIsTUFBTSxDQUFDLHFDQUFxQyxDQUFDLENBQUE7RUFDOURPLFVBQUFBLE1BQU0sQ0FBQ2UsU0FBUyxDQUFDQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtFQUMzRCxTQUFBO0VBRUEsUUFBQSxJQUFJakYsSUFBSSxDQUFDbEUsRUFBRSxJQUFJLElBQUksRUFBRTtFQUNuQm1JLFVBQUFBLE1BQU0sQ0FBQ2UsU0FBUyxDQUFDdEIsTUFBTSxDQUFDLHFDQUFxQyxDQUFDLENBQUE7RUFDaEUsU0FBQTtFQUVBLFFBQUEsSUFBSTFELElBQUksQ0FBQ2dHLFNBQVMsSUFBSSxJQUFJLEVBQUU7RUFDMUIvQixVQUFBQSxNQUFNLENBQUNuSSxFQUFFLEdBQUdrRSxJQUFJLENBQUNnRyxTQUFTLENBQUE7RUFDNUIsU0FBQTtVQUVBLElBQUloRyxJQUFJLENBQUNpRyxLQUFLLEVBQUU7RUFDZGhDLFVBQUFBLE1BQU0sQ0FBQ2dDLEtBQUssR0FBR2pHLElBQUksQ0FBQ2lHLEtBQUssQ0FBQTtFQUMzQixTQUFBO1VBRUEsSUFBSWpHLElBQUksQ0FBQzZELFFBQVEsRUFBRTtZQUNqQjhCLEtBQUssQ0FBQ08sSUFBSSxHQUFHLE9BQU8sQ0FBQTtFQUNwQlAsVUFBQUEsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHM0YsSUFBSSxDQUFDc0YsSUFBSSxDQUFBO0VBRS9CckIsVUFBQUEsTUFBTSxDQUFDZSxTQUFTLENBQUN0QixNQUFNLENBQUMscUNBQXFDLENBQUMsQ0FBQTtFQUM5RE8sVUFBQUEsTUFBTSxDQUFDZSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO0VBQ3hELFNBQUE7RUFFQSxRQUFBLEtBQUssSUFBSWxDLElBQUksSUFBSTRDLEtBQUssRUFBRTtFQUN0QixVQUFBLElBQUlRLEdBQUcsR0FBR1IsS0FBSyxDQUFDNUMsSUFBSSxDQUFDLENBQUE7RUFFckJrQixVQUFBQSxNQUFNLENBQUN2QyxZQUFZLENBQUNxQixJQUFJLEVBQUVvRCxHQUFHLENBQUMsQ0FBQTtFQUNoQyxTQUFBO1VBRUEsSUFBSW5HLElBQUksQ0FBQzZELFFBQVEsRUFBRTtFQUNqQixVQUFBLElBQUlHLE9BQU8sR0FBR2hPLENBQUMsQ0FBQ2lPLE1BQU0sQ0FBQyxDQUFBO0VBRXZCLFVBQUEsSUFBSW1DLEtBQUssR0FBR1gsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDNUNVLEtBQUssQ0FBQzdDLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQTtFQUUxQyxVQUFBLElBQUksQ0FBQzhDLFFBQVEsQ0FBQ3JHLElBQUksRUFBRW9HLEtBQUssQ0FBQyxDQUFBO1lBRTFCLElBQUlFLFNBQVMsR0FBRyxFQUFFLENBQUE7RUFFbEIsVUFBQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3ZHLElBQUksQ0FBQzZELFFBQVEsQ0FBQ25LLE1BQU0sRUFBRTZNLENBQUMsRUFBRSxFQUFFO0VBQzdDLFlBQUEsSUFBSUMsS0FBSyxHQUFHeEcsSUFBSSxDQUFDNkQsUUFBUSxDQUFDMEMsQ0FBQyxDQUFDLENBQUE7RUFFNUIsWUFBQSxJQUFJRSxNQUFNLEdBQUcsSUFBSSxDQUFDeEMsTUFBTSxDQUFDdUMsS0FBSyxDQUFDLENBQUE7RUFFL0JGLFlBQUFBLFNBQVMsQ0FBQy9MLElBQUksQ0FBQ2tNLE1BQU0sQ0FBQyxDQUFBO0VBQ3hCLFdBQUE7RUFFQSxVQUFBLElBQUlDLGtCQUFrQixHQUFHMVEsQ0FBQyxDQUFDLFdBQVcsRUFBRTtFQUN0QyxZQUFBLE9BQU8sRUFBRSwyREFBMkQ7RUFDcEUsWUFBQSxNQUFNLEVBQUUsTUFBQTtFQUNWLFdBQUMsQ0FBQyxDQUFBO0VBRUYwUSxVQUFBQSxrQkFBa0IsQ0FBQ3BELE1BQU0sQ0FBQ2dELFNBQVMsQ0FBQyxDQUFBO0VBRXBDdEMsVUFBQUEsT0FBTyxDQUFDVixNQUFNLENBQUM4QyxLQUFLLENBQUMsQ0FBQTtFQUNyQnBDLFVBQUFBLE9BQU8sQ0FBQ1YsTUFBTSxDQUFDb0Qsa0JBQWtCLENBQUMsQ0FBQTtFQUNwQyxTQUFDLE1BQU07RUFDTCxVQUFBLElBQUksQ0FBQ0wsUUFBUSxDQUFDckcsSUFBSSxFQUFFaUUsTUFBTSxDQUFDLENBQUE7RUFDN0IsU0FBQTtVQUVBbkgsS0FBSyxDQUFDNkUsU0FBUyxDQUFDc0MsTUFBTSxFQUFFLE1BQU0sRUFBRWpFLElBQUksQ0FBQyxDQUFBO0VBRXJDLFFBQUEsT0FBT2lFLE1BQU0sQ0FBQTtTQUNkLENBQUE7UUFFRHpCLE9BQU8sQ0FBQ3hLLFNBQVMsQ0FBQzRILElBQUksR0FBRyxVQUFVK0csU0FBUyxFQUFFQyxVQUFVLEVBQUU7VUFDeEQsSUFBSWpDLElBQUksR0FBRyxJQUFJLENBQUE7RUFFZixRQUFBLElBQUk3SSxFQUFFLEdBQUc2SyxTQUFTLENBQUM3SyxFQUFFLEdBQUcsVUFBVSxDQUFBO1VBRWxDLElBQUksQ0FBQytHLFFBQVEsQ0FBQ0UsSUFBSSxDQUFDLElBQUksRUFBRWpILEVBQUUsQ0FBQyxDQUFBO0VBRTVCNkssUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVRyxNQUFNLEVBQUU7WUFDNUMwRixJQUFJLENBQUMzQixLQUFLLEVBQUUsQ0FBQTtFQUNaMkIsVUFBQUEsSUFBSSxDQUFDckIsTUFBTSxDQUFDckUsTUFBTSxDQUFDZSxJQUFJLENBQUMsQ0FBQTtFQUV4QixVQUFBLElBQUkyRyxTQUFTLENBQUNFLE1BQU0sRUFBRSxFQUFFO2NBQ3RCbEMsSUFBSSxDQUFDRCxVQUFVLEVBQUUsQ0FBQTtjQUNqQkMsSUFBSSxDQUFDTCxrQkFBa0IsRUFBRSxDQUFBO0VBQzNCLFdBQUE7RUFDRixTQUFDLENBQUMsQ0FBQTtFQUVGcUMsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFVBQVVHLE1BQU0sRUFBRTtFQUMvQzBGLFVBQUFBLElBQUksQ0FBQ3JCLE1BQU0sQ0FBQ3JFLE1BQU0sQ0FBQ2UsSUFBSSxDQUFDLENBQUE7RUFFeEIsVUFBQSxJQUFJMkcsU0FBUyxDQUFDRSxNQUFNLEVBQUUsRUFBRTtjQUN0QmxDLElBQUksQ0FBQ0QsVUFBVSxFQUFFLENBQUE7RUFDbkIsV0FBQTtFQUNGLFNBQUMsQ0FBQyxDQUFBO0VBRUZpQyxRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVVHLE1BQU0sRUFBRTtZQUN0QzBGLElBQUksQ0FBQ25CLFlBQVksRUFBRSxDQUFBO0VBQ25CbUIsVUFBQUEsSUFBSSxDQUFDTyxXQUFXLENBQUNqRyxNQUFNLENBQUMsQ0FBQTtFQUMxQixTQUFDLENBQUMsQ0FBQTtFQUVGMEgsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZO0VBQ2pDLFVBQUEsSUFBSSxDQUFDNkgsU0FBUyxDQUFDRSxNQUFNLEVBQUUsRUFBRTtFQUN2QixZQUFBLE9BQUE7RUFDRixXQUFBO1lBRUFsQyxJQUFJLENBQUNELFVBQVUsRUFBRSxDQUFBO1lBRWpCLElBQUlDLElBQUksQ0FBQ2pDLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7Y0FDekM2QixJQUFJLENBQUNMLGtCQUFrQixFQUFFLENBQUE7RUFDM0IsV0FBQTtFQUNGLFNBQUMsQ0FBQyxDQUFBO0VBRUZxQyxRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVk7RUFDbkMsVUFBQSxJQUFJLENBQUM2SCxTQUFTLENBQUNFLE1BQU0sRUFBRSxFQUFFO0VBQ3ZCLFlBQUEsT0FBQTtFQUNGLFdBQUE7WUFFQWxDLElBQUksQ0FBQ0QsVUFBVSxFQUFFLENBQUE7WUFFakIsSUFBSUMsSUFBSSxDQUFDakMsT0FBTyxDQUFDSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFBRTtjQUN6QzZCLElBQUksQ0FBQ0wsa0JBQWtCLEVBQUUsQ0FBQTtFQUMzQixXQUFBO0VBQ0YsU0FBQyxDQUFDLENBQUE7RUFFRnFDLFFBQUFBLFNBQVMsQ0FBQzdILEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWTtFQUMvQjtZQUNBNkYsSUFBSSxDQUFDOUIsUUFBUSxDQUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQzNDNEIsSUFBSSxDQUFDOUIsUUFBUSxDQUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBRTFDNEIsSUFBSSxDQUFDRCxVQUFVLEVBQUUsQ0FBQTtZQUNqQkMsSUFBSSxDQUFDRixzQkFBc0IsRUFBRSxDQUFBO0VBQy9CLFNBQUMsQ0FBQyxDQUFBO0VBRUZrQyxRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7RUFDaEM7WUFDQTZGLElBQUksQ0FBQzlCLFFBQVEsQ0FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUM1QzRCLElBQUksQ0FBQzlCLFFBQVEsQ0FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUN6QzRCLFVBQUFBLElBQUksQ0FBQzlCLFFBQVEsQ0FBQ2lFLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0VBQ25ELFNBQUMsQ0FBQyxDQUFBO0VBRUZILFFBQUFBLFNBQVMsQ0FBQzdILEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZO0VBQ3pDLFVBQUEsSUFBSWlJLFlBQVksR0FBR3BDLElBQUksQ0FBQ3FDLHFCQUFxQixFQUFFLENBQUE7RUFFL0MsVUFBQSxJQUFJRCxZQUFZLENBQUNyTixNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQzdCLFlBQUEsT0FBQTtFQUNGLFdBQUE7RUFFQXFOLFVBQUFBLFlBQVksQ0FBQy9ILE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtFQUNqQyxTQUFDLENBQUMsQ0FBQTtFQUVGMkgsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFlBQVk7RUFDekMsVUFBQSxJQUFJaUksWUFBWSxHQUFHcEMsSUFBSSxDQUFDcUMscUJBQXFCLEVBQUUsQ0FBQTtFQUUvQyxVQUFBLElBQUlELFlBQVksQ0FBQ3JOLE1BQU0sS0FBSyxDQUFDLEVBQUU7RUFDN0IsWUFBQSxPQUFBO0VBQ0YsV0FBQTtFQUVBLFVBQUEsSUFBSXNHLElBQUksR0FBR2xELEtBQUssQ0FBQzhFLE9BQU8sQ0FBQ21GLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUVqRCxVQUFBLElBQUlBLFlBQVksQ0FBQ0UsUUFBUSxDQUFDLG1DQUFtQyxDQUFDLEVBQUU7RUFDOUR0QyxZQUFBQSxJQUFJLENBQUMzRixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0VBQzNCLFdBQUMsTUFBTTtFQUNMMkYsWUFBQUEsSUFBSSxDQUFDM0YsT0FBTyxDQUFDLFFBQVEsRUFBRTtFQUNyQmdCLGNBQUFBLElBQUksRUFBRUEsSUFBQUE7RUFDUixhQUFDLENBQUMsQ0FBQTtFQUNKLFdBQUE7RUFDRixTQUFDLENBQUMsQ0FBQTtFQUVGMkcsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFlBQVk7RUFDM0MsVUFBQSxJQUFJaUksWUFBWSxHQUFHcEMsSUFBSSxDQUFDcUMscUJBQXFCLEVBQUUsQ0FBQTtZQUUvQyxJQUFJckQsUUFBUSxHQUFHZ0IsSUFBSSxDQUFDOUIsUUFBUSxDQUFDWSxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtFQUV6RSxVQUFBLElBQUl5RCxZQUFZLEdBQUd2RCxRQUFRLENBQUMzSSxLQUFLLENBQUMrTCxZQUFZLENBQUMsQ0FBQTs7RUFFL0M7RUFDQTtZQUNBLElBQUlHLFlBQVksSUFBSSxDQUFDLEVBQUU7RUFDckIsWUFBQSxPQUFBO0VBQ0YsV0FBQTtFQUVBLFVBQUEsSUFBSUMsU0FBUyxHQUFHRCxZQUFZLEdBQUcsQ0FBQyxDQUFBOztFQUVoQztFQUNBLFVBQUEsSUFBSUgsWUFBWSxDQUFDck4sTUFBTSxLQUFLLENBQUMsRUFBRTtFQUM3QnlOLFlBQUFBLFNBQVMsR0FBRyxDQUFDLENBQUE7RUFDZixXQUFBO0VBRUEsVUFBQSxJQUFJQyxLQUFLLEdBQUd6RCxRQUFRLENBQUMwRCxFQUFFLENBQUNGLFNBQVMsQ0FBQyxDQUFBO0VBRWxDQyxVQUFBQSxLQUFLLENBQUNwSSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7WUFFM0IsSUFBSXNJLGFBQWEsR0FBRzNDLElBQUksQ0FBQzlCLFFBQVEsQ0FBQzBFLE1BQU0sRUFBRSxDQUFDQyxHQUFHLENBQUE7WUFDOUMsSUFBSUMsT0FBTyxHQUFHTCxLQUFLLENBQUNHLE1BQU0sRUFBRSxDQUFDQyxHQUFHLENBQUE7RUFDaEMsVUFBQSxJQUFJRSxVQUFVLEdBQUcvQyxJQUFJLENBQUM5QixRQUFRLENBQUM4RSxTQUFTLEVBQUUsSUFBSUYsT0FBTyxHQUFHSCxhQUFhLENBQUMsQ0FBQTtZQUV0RSxJQUFJSCxTQUFTLEtBQUssQ0FBQyxFQUFFO0VBQ25CeEMsWUFBQUEsSUFBSSxDQUFDOUIsUUFBUSxDQUFDOEUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQzVCLFdBQUMsTUFBTSxJQUFJRixPQUFPLEdBQUdILGFBQWEsR0FBRyxDQUFDLEVBQUU7RUFDdEMzQyxZQUFBQSxJQUFJLENBQUM5QixRQUFRLENBQUM4RSxTQUFTLENBQUNELFVBQVUsQ0FBQyxDQUFBO0VBQ3JDLFdBQUE7RUFDRixTQUFDLENBQUMsQ0FBQTtFQUVGZixRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsY0FBYyxFQUFFLFlBQVk7RUFDdkMsVUFBQSxJQUFJaUksWUFBWSxHQUFHcEMsSUFBSSxDQUFDcUMscUJBQXFCLEVBQUUsQ0FBQTtZQUUvQyxJQUFJckQsUUFBUSxHQUFHZ0IsSUFBSSxDQUFDOUIsUUFBUSxDQUFDWSxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtFQUV6RSxVQUFBLElBQUl5RCxZQUFZLEdBQUd2RCxRQUFRLENBQUMzSSxLQUFLLENBQUMrTCxZQUFZLENBQUMsQ0FBQTtFQUUvQyxVQUFBLElBQUlJLFNBQVMsR0FBR0QsWUFBWSxHQUFHLENBQUMsQ0FBQTs7RUFFaEM7RUFDQSxVQUFBLElBQUlDLFNBQVMsSUFBSXhELFFBQVEsQ0FBQ2pLLE1BQU0sRUFBRTtFQUNoQyxZQUFBLE9BQUE7RUFDRixXQUFBO0VBRUEsVUFBQSxJQUFJME4sS0FBSyxHQUFHekQsUUFBUSxDQUFDMEQsRUFBRSxDQUFDRixTQUFTLENBQUMsQ0FBQTtFQUVsQ0MsVUFBQUEsS0FBSyxDQUFDcEksT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO0VBRTNCLFVBQUEsSUFBSXNJLGFBQWEsR0FBRzNDLElBQUksQ0FBQzlCLFFBQVEsQ0FBQzBFLE1BQU0sRUFBRSxDQUFDQyxHQUFHLEdBQzVDN0MsSUFBSSxDQUFDOUIsUUFBUSxDQUFDK0UsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQ2xDLFVBQUEsSUFBSUMsVUFBVSxHQUFHVCxLQUFLLENBQUNHLE1BQU0sRUFBRSxDQUFDQyxHQUFHLEdBQUdKLEtBQUssQ0FBQ1EsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0VBQzlELFVBQUEsSUFBSUYsVUFBVSxHQUFHL0MsSUFBSSxDQUFDOUIsUUFBUSxDQUFDOEUsU0FBUyxFQUFFLEdBQUdFLFVBQVUsR0FBR1AsYUFBYSxDQUFBO1lBRXZFLElBQUlILFNBQVMsS0FBSyxDQUFDLEVBQUU7RUFDbkJ4QyxZQUFBQSxJQUFJLENBQUM5QixRQUFRLENBQUM4RSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7RUFDNUIsV0FBQyxNQUFNLElBQUlFLFVBQVUsR0FBR1AsYUFBYSxFQUFFO0VBQ3JDM0MsWUFBQUEsSUFBSSxDQUFDOUIsUUFBUSxDQUFDOEUsU0FBUyxDQUFDRCxVQUFVLENBQUMsQ0FBQTtFQUNyQyxXQUFBO0VBQ0YsU0FBQyxDQUFDLENBQUE7RUFFRmYsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFVRyxNQUFNLEVBQUU7WUFDOUNBLE1BQU0sQ0FBQ3NDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ3lELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUE7WUFDdkVoRyxNQUFNLENBQUNzQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUNHLFlBQVksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUE7RUFDekQsU0FBQyxDQUFDLENBQUE7RUFFRmlGLFFBQUFBLFNBQVMsQ0FBQzdILEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVRyxNQUFNLEVBQUU7RUFDaEQwRixVQUFBQSxJQUFJLENBQUN6QixjQUFjLENBQUNqRSxNQUFNLENBQUMsQ0FBQTtFQUM3QixTQUFDLENBQUMsQ0FBQTtFQUVGLFFBQUEsSUFBSWpKLENBQUMsQ0FBQ21CLEVBQUUsQ0FBQzJRLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUNqRixRQUFRLENBQUMvRCxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVVqRCxDQUFDLEVBQUU7Y0FDMUMsSUFBSTJMLEdBQUcsR0FBRzdDLElBQUksQ0FBQzlCLFFBQVEsQ0FBQzhFLFNBQVMsRUFBRSxDQUFBO0VBRW5DLFlBQUEsSUFBSUksTUFBTSxHQUFHcEQsSUFBSSxDQUFDOUIsUUFBUSxDQUFDQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNqQyxZQUFZLEdBQUcyRyxHQUFHLEdBQUczTCxDQUFDLENBQUNtTSxNQUFNLENBQUE7RUFFL0QsWUFBQSxJQUFJQyxPQUFPLEdBQUdwTSxDQUFDLENBQUNtTSxNQUFNLEdBQUcsQ0FBQyxJQUFJUixHQUFHLEdBQUczTCxDQUFDLENBQUNtTSxNQUFNLElBQUksQ0FBQyxDQUFBO0VBQ2pELFlBQUEsSUFBSUUsVUFBVSxHQUFHck0sQ0FBQyxDQUFDbU0sTUFBTSxHQUFHLENBQUMsSUFBSUQsTUFBTSxJQUFJcEQsSUFBSSxDQUFDOUIsUUFBUSxDQUFDc0YsTUFBTSxFQUFFLENBQUE7RUFFakUsWUFBQSxJQUFJRixPQUFPLEVBQUU7RUFDWHRELGNBQUFBLElBQUksQ0FBQzlCLFFBQVEsQ0FBQzhFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFFMUI5TCxDQUFDLENBQUN1TSxjQUFjLEVBQUUsQ0FBQTtnQkFDbEJ2TSxDQUFDLENBQUN3TSxlQUFlLEVBQUUsQ0FBQTtlQUNwQixNQUFNLElBQUlILFVBQVUsRUFBRTtnQkFDckJ2RCxJQUFJLENBQUM5QixRQUFRLENBQUM4RSxTQUFTLENBQ3JCaEQsSUFBSSxDQUFDOUIsUUFBUSxDQUFDQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNqQyxZQUFZLEdBQUc4RCxJQUFJLENBQUM5QixRQUFRLENBQUNzRixNQUFNLEVBQzFELENBQUMsQ0FBQTtnQkFFRHRNLENBQUMsQ0FBQ3VNLGNBQWMsRUFBRSxDQUFBO2dCQUNsQnZNLENBQUMsQ0FBQ3dNLGVBQWUsRUFBRSxDQUFBO0VBQ3JCLGFBQUE7RUFDRixXQUFDLENBQUMsQ0FBQTtFQUNKLFNBQUE7VUFFQSxJQUFJLENBQUN4RixRQUFRLENBQUMvRCxFQUFFLENBQUMsU0FBUyxFQUFFLHNDQUFzQyxFQUNoRSxVQUFVd0osR0FBRyxFQUFFO0VBQ2YsVUFBQSxJQUFJQyxLQUFLLEdBQUd2UyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFbkIsSUFBSWdLLElBQUksR0FBR2xELEtBQUssQ0FBQzhFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7RUFFdEMsVUFBQSxJQUFJMkcsS0FBSyxDQUFDdEIsUUFBUSxDQUFDLG1DQUFtQyxDQUFDLEVBQUU7Y0FDdkQsSUFBSXRDLElBQUksQ0FBQ2pDLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0VBQ2hDNkIsY0FBQUEsSUFBSSxDQUFDM0YsT0FBTyxDQUFDLFVBQVUsRUFBRTtFQUN2QndKLGdCQUFBQSxhQUFhLEVBQUVGLEdBQUc7RUFDbEJ0SSxnQkFBQUEsSUFBSSxFQUFFQSxJQUFBQTtFQUNSLGVBQUMsQ0FBQyxDQUFBO0VBQ0osYUFBQyxNQUFNO0VBQ0wyRSxjQUFBQSxJQUFJLENBQUMzRixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0VBQzNCLGFBQUE7RUFFQSxZQUFBLE9BQUE7RUFDRixXQUFBO0VBRUEyRixVQUFBQSxJQUFJLENBQUMzRixPQUFPLENBQUMsUUFBUSxFQUFFO0VBQ3JCd0osWUFBQUEsYUFBYSxFQUFFRixHQUFHO0VBQ2xCdEksWUFBQUEsSUFBSSxFQUFFQSxJQUFBQTtFQUNSLFdBQUMsQ0FBQyxDQUFBO0VBQ0osU0FBQyxDQUFDLENBQUE7VUFFRixJQUFJLENBQUM2QyxRQUFRLENBQUMvRCxFQUFFLENBQUMsWUFBWSxFQUFFLHNDQUFzQyxFQUNuRSxVQUFVd0osR0FBRyxFQUFFO1lBQ2YsSUFBSXRJLElBQUksR0FBR2xELEtBQUssQ0FBQzhFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7RUFFdEMrQyxVQUFBQSxJQUFJLENBQUNxQyxxQkFBcUIsRUFBRSxDQUN2QnlCLFdBQVcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUNuRDFGLElBQUksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUE7RUFFbkM0QixVQUFBQSxJQUFJLENBQUMzRixPQUFPLENBQUMsZUFBZSxFQUFFO0VBQzVCZ0IsWUFBQUEsSUFBSSxFQUFFQSxJQUFJO2NBQ1Z1QixPQUFPLEVBQUV2TCxDQUFDLENBQUMsSUFBSSxDQUFBO0VBQ2pCLFdBQUMsQ0FBQyxDQUFBO0VBQ0osU0FBQyxDQUFDLENBQUE7U0FDSCxDQUFBO0VBRUR3TSxNQUFBQSxPQUFPLENBQUN4SyxTQUFTLENBQUNnUCxxQkFBcUIsR0FBRyxZQUFZO1VBQ3BELElBQUlELFlBQVksR0FBRyxJQUFJLENBQUNsRSxRQUFRLENBQy9CWSxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtFQUU5QyxRQUFBLE9BQU9zRCxZQUFZLENBQUE7U0FDcEIsQ0FBQTtFQUVEdkUsTUFBQUEsT0FBTyxDQUFDeEssU0FBUyxDQUFDMFEsT0FBTyxHQUFHLFlBQVk7RUFDdEMsUUFBQSxJQUFJLENBQUM3RixRQUFRLENBQUNhLE1BQU0sRUFBRSxDQUFBO1NBQ3ZCLENBQUE7RUFFRGxCLE1BQUFBLE9BQU8sQ0FBQ3hLLFNBQVMsQ0FBQ3lNLHNCQUFzQixHQUFHLFlBQVk7RUFDckQsUUFBQSxJQUFJc0MsWUFBWSxHQUFHLElBQUksQ0FBQ0MscUJBQXFCLEVBQUUsQ0FBQTtFQUUvQyxRQUFBLElBQUlELFlBQVksQ0FBQ3JOLE1BQU0sS0FBSyxDQUFDLEVBQUU7RUFDN0IsVUFBQSxPQUFBO0VBQ0YsU0FBQTtVQUVBLElBQUlpSyxRQUFRLEdBQUcsSUFBSSxDQUFDZCxRQUFRLENBQUNZLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO0VBRXpFLFFBQUEsSUFBSXlELFlBQVksR0FBR3ZELFFBQVEsQ0FBQzNJLEtBQUssQ0FBQytMLFlBQVksQ0FBQyxDQUFBO1VBRS9DLElBQUlPLGFBQWEsR0FBRyxJQUFJLENBQUN6RSxRQUFRLENBQUMwRSxNQUFNLEVBQUUsQ0FBQ0MsR0FBRyxDQUFBO1VBQzlDLElBQUlDLE9BQU8sR0FBR1YsWUFBWSxDQUFDUSxNQUFNLEVBQUUsQ0FBQ0MsR0FBRyxDQUFBO0VBQ3ZDLFFBQUEsSUFBSUUsVUFBVSxHQUFHLElBQUksQ0FBQzdFLFFBQVEsQ0FBQzhFLFNBQVMsRUFBRSxJQUFJRixPQUFPLEdBQUdILGFBQWEsQ0FBQyxDQUFBO0VBRXRFLFFBQUEsSUFBSXFCLFdBQVcsR0FBR2xCLE9BQU8sR0FBR0gsYUFBYSxDQUFBO1VBQ3pDSSxVQUFVLElBQUlYLFlBQVksQ0FBQ2EsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtVQUVqRCxJQUFJVixZQUFZLElBQUksQ0FBQyxFQUFFO0VBQ3JCLFVBQUEsSUFBSSxDQUFDckUsUUFBUSxDQUFDOEUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQzVCLFNBQUMsTUFBTSxJQUFJZ0IsV0FBVyxHQUFHLElBQUksQ0FBQzlGLFFBQVEsQ0FBQytFLFdBQVcsRUFBRSxJQUFJZSxXQUFXLEdBQUcsQ0FBQyxFQUFFO0VBQ3ZFLFVBQUEsSUFBSSxDQUFDOUYsUUFBUSxDQUFDOEUsU0FBUyxDQUFDRCxVQUFVLENBQUMsQ0FBQTtFQUNyQyxTQUFBO1NBQ0QsQ0FBQTtRQUVEbEYsT0FBTyxDQUFDeEssU0FBUyxDQUFDcU8sUUFBUSxHQUFHLFVBQVV1QyxNQUFNLEVBQUVqQyxTQUFTLEVBQUU7VUFDeEQsSUFBSU4sUUFBUSxHQUFHLElBQUksQ0FBQzNELE9BQU8sQ0FBQ0ksR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7VUFDakQsSUFBSTlCLFlBQVksR0FBRyxJQUFJLENBQUMwQixPQUFPLENBQUNJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtFQUVuRCxRQUFBLElBQUkrRixPQUFPLEdBQUd4QyxRQUFRLENBQUN1QyxNQUFNLEVBQUVqQyxTQUFTLENBQUMsQ0FBQTtVQUV6QyxJQUFJa0MsT0FBTyxJQUFJLElBQUksRUFBRTtFQUNuQmxDLFVBQUFBLFNBQVMsQ0FBQ2pHLEtBQUssQ0FBQ29JLE9BQU8sR0FBRyxNQUFNLENBQUE7RUFDbEMsU0FBQyxNQUFNLElBQUksT0FBT0QsT0FBTyxLQUFLLFFBQVEsRUFBRTtFQUN0Q2xDLFVBQUFBLFNBQVMsQ0FBQ29DLFNBQVMsR0FBRy9ILFlBQVksQ0FBQzZILE9BQU8sQ0FBQyxDQUFBO0VBQzdDLFNBQUMsTUFBTTtFQUNMN1MsVUFBQUEsQ0FBQyxDQUFDMlEsU0FBUyxDQUFDLENBQUNyRCxNQUFNLENBQUN1RixPQUFPLENBQUMsQ0FBQTtFQUM5QixTQUFBO1NBQ0QsQ0FBQTtFQUVELE1BQUEsT0FBT3JHLE9BQU8sQ0FBQTtFQUNoQixLQUFDLENBQUMsQ0FBQTtFQUVGdEwsSUFBQUEsRUFBRSxDQUFDVCxNQUFNLENBQUMsY0FBYyxFQUFDLEVBRXhCLEVBQUUsWUFBWTtFQUNiLE1BQUEsSUFBSXVTLElBQUksR0FBRztFQUNUQyxRQUFBQSxTQUFTLEVBQUUsQ0FBQztFQUNaQyxRQUFBQSxHQUFHLEVBQUUsQ0FBQztFQUNOQyxRQUFBQSxLQUFLLEVBQUUsRUFBRTtFQUNUQyxRQUFBQSxLQUFLLEVBQUUsRUFBRTtFQUNUQyxRQUFBQSxJQUFJLEVBQUUsRUFBRTtFQUNSQyxRQUFBQSxHQUFHLEVBQUUsRUFBRTtFQUNQQyxRQUFBQSxHQUFHLEVBQUUsRUFBRTtFQUNQQyxRQUFBQSxLQUFLLEVBQUUsRUFBRTtFQUNUQyxRQUFBQSxPQUFPLEVBQUUsRUFBRTtFQUNYQyxRQUFBQSxTQUFTLEVBQUUsRUFBRTtFQUNiQyxRQUFBQSxHQUFHLEVBQUUsRUFBRTtFQUNQQyxRQUFBQSxJQUFJLEVBQUUsRUFBRTtFQUNSQyxRQUFBQSxJQUFJLEVBQUUsRUFBRTtFQUNSQyxRQUFBQSxFQUFFLEVBQUUsRUFBRTtFQUNOQyxRQUFBQSxLQUFLLEVBQUUsRUFBRTtFQUNUQyxRQUFBQSxJQUFJLEVBQUUsRUFBRTtFQUNSQyxRQUFBQSxNQUFNLEVBQUUsRUFBQTtTQUNULENBQUE7RUFFRCxNQUFBLE9BQU9qQixJQUFJLENBQUE7RUFDYixLQUFDLENBQUMsQ0FBQTtFQUVGOVIsSUFBQUEsRUFBRSxDQUFDVCxNQUFNLENBQUMsd0JBQXdCLEVBQUMsQ0FDakMsUUFBUSxFQUNSLFVBQVUsRUFDVixTQUFTLENBQ1YsRUFBRSxVQUFVVCxDQUFDLEVBQUU4RyxLQUFLLEVBQUVrTSxJQUFJLEVBQUU7RUFDM0IsTUFBQSxTQUFTa0IsYUFBYUEsQ0FBRXpILFFBQVEsRUFBRUMsT0FBTyxFQUFFO1VBQ3pDLElBQUksQ0FBQ0QsUUFBUSxHQUFHQSxRQUFRLENBQUE7VUFDeEIsSUFBSSxDQUFDQyxPQUFPLEdBQUdBLE9BQU8sQ0FBQTtVQUV0QndILGFBQWEsQ0FBQzVNLFNBQVMsQ0FBQ0YsV0FBVyxDQUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQ2hELE9BQUE7UUFFQXVFLEtBQUssQ0FBQ0MsTUFBTSxDQUFDbU4sYUFBYSxFQUFFcE4sS0FBSyxDQUFDOEIsVUFBVSxDQUFDLENBQUE7RUFFN0NzTCxNQUFBQSxhQUFhLENBQUNsUyxTQUFTLENBQUM0SyxNQUFNLEdBQUcsWUFBWTtVQUMzQyxJQUFJdUgsVUFBVSxHQUFHblUsQ0FBQyxDQUNoQixrREFBa0QsR0FDbEQsOENBQThDLEdBQzlDLFNBQ0YsQ0FBQyxDQUFBO1VBRUQsSUFBSSxDQUFDb1UsU0FBUyxHQUFHLENBQUMsQ0FBQTtFQUVsQixRQUFBLElBQUl0TixLQUFLLENBQUM4RSxPQUFPLENBQUMsSUFBSSxDQUFDYSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFO0VBQzNELFVBQUEsSUFBSSxDQUFDMkgsU0FBUyxHQUFHdE4sS0FBSyxDQUFDOEUsT0FBTyxDQUFDLElBQUksQ0FBQ2EsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFBO0VBQ2xFLFNBQUMsTUFBTSxJQUFJLElBQUksQ0FBQ0EsUUFBUSxDQUFDTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ2pELElBQUksQ0FBQ3FILFNBQVMsR0FBRyxJQUFJLENBQUMzSCxRQUFRLENBQUNNLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtFQUNqRCxTQUFBO0VBRUFvSCxRQUFBQSxVQUFVLENBQUNwSCxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQ04sUUFBUSxDQUFDTSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtVQUNyRG9ILFVBQVUsQ0FBQ3BILElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDcUgsU0FBUyxDQUFDLENBQUE7RUFDM0NELFFBQUFBLFVBQVUsQ0FBQ3BILElBQUksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUE7VUFFekMsSUFBSSxDQUFDb0gsVUFBVSxHQUFHQSxVQUFVLENBQUE7RUFFNUIsUUFBQSxPQUFPQSxVQUFVLENBQUE7U0FDbEIsQ0FBQTtRQUVERCxhQUFhLENBQUNsUyxTQUFTLENBQUM0SCxJQUFJLEdBQUcsVUFBVStHLFNBQVMsRUFBRUMsVUFBVSxFQUFFO1VBQzlELElBQUlqQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0VBRWYsUUFBQSxJQUFJMEYsU0FBUyxHQUFHMUQsU0FBUyxDQUFDN0ssRUFBRSxHQUFHLFVBQVUsQ0FBQTtVQUV6QyxJQUFJLENBQUM2SyxTQUFTLEdBQUdBLFNBQVMsQ0FBQTtVQUUxQixJQUFJLENBQUN3RCxVQUFVLENBQUNyTCxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVV3SixHQUFHLEVBQUU7RUFDekMzRCxVQUFBQSxJQUFJLENBQUMzRixPQUFPLENBQUMsT0FBTyxFQUFFc0osR0FBRyxDQUFDLENBQUE7RUFDNUIsU0FBQyxDQUFDLENBQUE7VUFFRixJQUFJLENBQUM2QixVQUFVLENBQUNyTCxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVV3SixHQUFHLEVBQUU7RUFDeEMzRCxVQUFBQSxJQUFJLENBQUMyRixXQUFXLENBQUNoQyxHQUFHLENBQUMsQ0FBQTtFQUN2QixTQUFDLENBQUMsQ0FBQTtVQUVGLElBQUksQ0FBQzZCLFVBQVUsQ0FBQ3JMLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVXdKLEdBQUcsRUFBRTtFQUMzQzNELFVBQUFBLElBQUksQ0FBQzNGLE9BQU8sQ0FBQyxVQUFVLEVBQUVzSixHQUFHLENBQUMsQ0FBQTtFQUU3QixVQUFBLElBQUlBLEdBQUcsQ0FBQ2lDLEtBQUssS0FBS3ZCLElBQUksQ0FBQ1EsS0FBSyxFQUFFO2NBQzVCbEIsR0FBRyxDQUFDRixjQUFjLEVBQUUsQ0FBQTtFQUN0QixXQUFBO0VBQ0YsU0FBQyxDQUFDLENBQUE7RUFFRnpCLFFBQUFBLFNBQVMsQ0FBQzdILEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBVUcsTUFBTSxFQUFFO0VBQzlDMEYsVUFBQUEsSUFBSSxDQUFDd0YsVUFBVSxDQUFDcEgsSUFBSSxDQUFDLHVCQUF1QixFQUFFOUQsTUFBTSxDQUFDZSxJQUFJLENBQUNnRyxTQUFTLENBQUMsQ0FBQTtFQUN0RSxTQUFDLENBQUMsQ0FBQTtFQUVGVyxRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBVUcsTUFBTSxFQUFFO0VBQ2pEMEYsVUFBQUEsSUFBSSxDQUFDNkYsTUFBTSxDQUFDdkwsTUFBTSxDQUFDZSxJQUFJLENBQUMsQ0FBQTtFQUMxQixTQUFDLENBQUMsQ0FBQTtFQUVGMkcsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZO0VBQy9CO1lBQ0E2RixJQUFJLENBQUN3RixVQUFVLENBQUNwSCxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQzdDNEIsSUFBSSxDQUFDd0YsVUFBVSxDQUFDcEgsSUFBSSxDQUFDLFdBQVcsRUFBRXNILFNBQVMsQ0FBQyxDQUFBO0VBRTVDMUYsVUFBQUEsSUFBSSxDQUFDOEYsbUJBQW1CLENBQUM5RCxTQUFTLENBQUMsQ0FBQTtFQUNyQyxTQUFDLENBQUMsQ0FBQTtFQUVGQSxRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7RUFDaEM7WUFDQTZGLElBQUksQ0FBQ3dGLFVBQVUsQ0FBQ3BILElBQUksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUE7RUFDOUM0QixVQUFBQSxJQUFJLENBQUN3RixVQUFVLENBQUNyRCxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtFQUNuRG5DLFVBQUFBLElBQUksQ0FBQ3dGLFVBQVUsQ0FBQ3JELFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtFQUV2Q25DLFVBQUFBLElBQUksQ0FBQ3dGLFVBQVUsQ0FBQ25MLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtFQUVoQzJGLFVBQUFBLElBQUksQ0FBQytGLG1CQUFtQixDQUFDL0QsU0FBUyxDQUFDLENBQUE7RUFDckMsU0FBQyxDQUFDLENBQUE7RUFFRkEsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZO1lBQ2pDNkYsSUFBSSxDQUFDd0YsVUFBVSxDQUFDcEgsSUFBSSxDQUFDLFVBQVUsRUFBRTRCLElBQUksQ0FBQ3lGLFNBQVMsQ0FBQyxDQUFBO1lBQ2hEekYsSUFBSSxDQUFDd0YsVUFBVSxDQUFDcEgsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQTtFQUNoRCxTQUFDLENBQUMsQ0FBQTtFQUVGNEQsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZO1lBQ2xDNkYsSUFBSSxDQUFDd0YsVUFBVSxDQUFDcEgsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN0QzRCLElBQUksQ0FBQ3dGLFVBQVUsQ0FBQ3BILElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUE7RUFDL0MsU0FBQyxDQUFDLENBQUE7U0FDSCxDQUFBO0VBRURtSCxNQUFBQSxhQUFhLENBQUNsUyxTQUFTLENBQUNzUyxXQUFXLEdBQUcsVUFBVWhDLEdBQUcsRUFBRTtVQUNuRCxJQUFJM0QsSUFBSSxHQUFHLElBQUksQ0FBQTs7RUFFZjtFQUNBO1VBQ0EzTixNQUFNLENBQUN3RixVQUFVLENBQUMsWUFBWTtFQUM1QjtZQUNBLElBQ0dpSixRQUFRLENBQUNrRixhQUFhLElBQUloRyxJQUFJLENBQUN3RixVQUFVLENBQUMsQ0FBQyxDQUFDLElBQzVDblUsQ0FBQyxDQUFDNFUsUUFBUSxDQUFDakcsSUFBSSxDQUFDd0YsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFMUUsUUFBUSxDQUFDa0YsYUFBYSxDQUFFLEVBQ3hEO0VBQ0EsWUFBQSxPQUFBO0VBQ0YsV0FBQTtFQUVBaEcsVUFBQUEsSUFBSSxDQUFDM0YsT0FBTyxDQUFDLE1BQU0sRUFBRXNKLEdBQUcsQ0FBQyxDQUFBO1dBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDTixDQUFBO0VBRUQ0QixNQUFBQSxhQUFhLENBQUNsUyxTQUFTLENBQUN5UyxtQkFBbUIsR0FBRyxVQUFVOUQsU0FBUyxFQUFFO0VBRWpFM1EsUUFBQUEsQ0FBQyxDQUFDeVAsUUFBUSxDQUFDb0YsSUFBSSxDQUFDLENBQUMvTCxFQUFFLENBQUMsb0JBQW9CLEdBQUc2SCxTQUFTLENBQUM3SyxFQUFFLEVBQUUsVUFBVUQsQ0FBQyxFQUFFO0VBQ3BFLFVBQUEsSUFBSWlQLE9BQU8sR0FBRzlVLENBQUMsQ0FBQzZGLENBQUMsQ0FBQ2tQLE1BQU0sQ0FBQyxDQUFBO0VBRXpCLFVBQUEsSUFBSUMsT0FBTyxHQUFHRixPQUFPLENBQUNHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtFQUV6QyxVQUFBLElBQUlDLElBQUksR0FBR2xWLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO1lBRWhEa1YsSUFBSSxDQUFDalYsSUFBSSxDQUFDLFlBQVk7RUFDcEIsWUFBQSxJQUFJLElBQUksSUFBSStVLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtFQUN0QixjQUFBLE9BQUE7RUFDRixhQUFBO2NBRUEsSUFBSXZJLFFBQVEsR0FBRzNGLEtBQUssQ0FBQzhFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7RUFFN0NhLFlBQUFBLFFBQVEsQ0FBQ3JMLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtFQUMzQixXQUFDLENBQUMsQ0FBQTtFQUNKLFNBQUMsQ0FBQyxDQUFBO1NBQ0gsQ0FBQTtFQUVEOFMsTUFBQUEsYUFBYSxDQUFDbFMsU0FBUyxDQUFDMFMsbUJBQW1CLEdBQUcsVUFBVS9ELFNBQVMsRUFBRTtFQUNqRTNRLFFBQUFBLENBQUMsQ0FBQ3lQLFFBQVEsQ0FBQ29GLElBQUksQ0FBQyxDQUFDTSxHQUFHLENBQUMsb0JBQW9CLEdBQUd4RSxTQUFTLENBQUM3SyxFQUFFLENBQUMsQ0FBQTtTQUMxRCxDQUFBO1FBRURvTyxhQUFhLENBQUNsUyxTQUFTLENBQUNrTSxRQUFRLEdBQUcsVUFBVWlHLFVBQVUsRUFBRXZELFVBQVUsRUFBRTtFQUNuRSxRQUFBLElBQUl3RSxtQkFBbUIsR0FBR3hFLFVBQVUsQ0FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtFQUN2RDJILFFBQUFBLG1CQUFtQixDQUFDOUgsTUFBTSxDQUFDNkcsVUFBVSxDQUFDLENBQUE7U0FDdkMsQ0FBQTtFQUVERCxNQUFBQSxhQUFhLENBQUNsUyxTQUFTLENBQUMwUSxPQUFPLEdBQUcsWUFBWTtFQUM1QyxRQUFBLElBQUksQ0FBQ2dDLG1CQUFtQixDQUFDLElBQUksQ0FBQy9ELFNBQVMsQ0FBQyxDQUFBO1NBQ3pDLENBQUE7RUFFRHVELE1BQUFBLGFBQWEsQ0FBQ2xTLFNBQVMsQ0FBQ3dTLE1BQU0sR0FBRyxVQUFVeEssSUFBSSxFQUFFO0VBQy9DLFFBQUEsTUFBTSxJQUFJbkYsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUE7U0FDekUsQ0FBQTs7RUFFRDtFQUNGO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFcVAsTUFBQUEsYUFBYSxDQUFDbFMsU0FBUyxDQUFDcVQsU0FBUyxHQUFHLFlBQVk7RUFDOUMsUUFBQSxPQUFPLENBQUMsSUFBSSxDQUFDQyxVQUFVLEVBQUUsQ0FBQTtTQUMxQixDQUFBOztFQUVEO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNFcEIsTUFBQUEsYUFBYSxDQUFDbFMsU0FBUyxDQUFDc1QsVUFBVSxHQUFHLFlBQVk7RUFDL0MsUUFBQSxPQUFPLElBQUksQ0FBQzVJLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1NBQ3BDLENBQUE7RUFFRCxNQUFBLE9BQU9vSCxhQUFhLENBQUE7RUFDdEIsS0FBQyxDQUFDLENBQUE7TUFFRmhULEVBQUUsQ0FBQ1QsTUFBTSxDQUFDLDBCQUEwQixFQUFDLENBQ25DLFFBQVEsRUFDUixRQUFRLEVBQ1IsVUFBVSxFQUNWLFNBQVMsQ0FDVixFQUFFLFVBQVVULENBQUMsRUFBRWtVLGFBQWEsRUFBRXBOLEtBQUssRUFBRWtNLElBQUksRUFBRTtRQUMxQyxTQUFTdUMsZUFBZUEsR0FBSTtVQUMxQkEsZUFBZSxDQUFDak8sU0FBUyxDQUFDRixXQUFXLENBQUM1QyxLQUFLLENBQUMsSUFBSSxFQUFFRixTQUFTLENBQUMsQ0FBQTtFQUM5RCxPQUFBO0VBRUF3QyxNQUFBQSxLQUFLLENBQUNDLE1BQU0sQ0FBQ3dPLGVBQWUsRUFBRXJCLGFBQWEsQ0FBQyxDQUFBO0VBRTVDcUIsTUFBQUEsZUFBZSxDQUFDdlQsU0FBUyxDQUFDNEssTUFBTSxHQUFHLFlBQVk7VUFDN0MsSUFBSXVILFVBQVUsR0FBR29CLGVBQWUsQ0FBQ2pPLFNBQVMsQ0FBQ3NGLE1BQU0sQ0FBQ3JLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtVQUU1RDRSLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQ25GLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUE7VUFFeERrRixVQUFVLENBQUNxQixJQUFJLENBQ2IsbURBQW1ELEdBQ25ELDZEQUE2RCxHQUMzRCw2QkFBNkIsR0FDL0IsU0FDRixDQUFDLENBQUE7RUFFRCxRQUFBLE9BQU9yQixVQUFVLENBQUE7U0FDbEIsQ0FBQTtRQUVEb0IsZUFBZSxDQUFDdlQsU0FBUyxDQUFDNEgsSUFBSSxHQUFHLFVBQVUrRyxTQUFTLEVBQUVDLFVBQVUsRUFBRTtVQUNoRSxJQUFJakMsSUFBSSxHQUFHLElBQUksQ0FBQTtVQUVmNEcsZUFBZSxDQUFDak8sU0FBUyxDQUFDc0MsSUFBSSxDQUFDcEYsS0FBSyxDQUFDLElBQUksRUFBRUYsU0FBUyxDQUFDLENBQUE7RUFFckQsUUFBQSxJQUFJd0IsRUFBRSxHQUFHNkssU0FBUyxDQUFDN0ssRUFBRSxHQUFHLFlBQVksQ0FBQTtVQUVwQyxJQUFJLENBQUNxTyxVQUFVLENBQUMxRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FDakRWLElBQUksQ0FBQyxJQUFJLEVBQUVqSCxFQUFFLENBQUMsQ0FDZGlILElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQ3ZCQSxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1VBQ2hDLElBQUksQ0FBQ29ILFVBQVUsQ0FBQ3BILElBQUksQ0FBQyxpQkFBaUIsRUFBRWpILEVBQUUsQ0FBQyxDQUFBO1VBQzNDLElBQUksQ0FBQ3FPLFVBQVUsQ0FBQ3BILElBQUksQ0FBQyxlQUFlLEVBQUVqSCxFQUFFLENBQUMsQ0FBQTtVQUV6QyxJQUFJLENBQUNxTyxVQUFVLENBQUNyTCxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVV3SixHQUFHLEVBQUU7RUFDN0M7RUFDQSxVQUFBLElBQUlBLEdBQUcsQ0FBQ2lDLEtBQUssS0FBSyxDQUFDLEVBQUU7RUFDbkIsWUFBQSxPQUFBO0VBQ0YsV0FBQTtFQUVBNUYsVUFBQUEsSUFBSSxDQUFDM0YsT0FBTyxDQUFDLFFBQVEsRUFBRTtFQUNyQndKLFlBQUFBLGFBQWEsRUFBRUYsR0FBQUE7RUFDakIsV0FBQyxDQUFDLENBQUE7RUFDSixTQUFDLENBQUMsQ0FBQTtVQUVGLElBQUksQ0FBQzZCLFVBQVUsQ0FBQ3JMLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVXdKLEdBQUcsRUFBRTtFQUN6QztFQUFBLFNBQ0QsQ0FBQyxDQUFBO1VBRUYsSUFBSSxDQUFDNkIsVUFBVSxDQUFDckwsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVd0osR0FBRyxFQUFFO0VBQ3hDO0VBQUEsU0FDRCxDQUFDLENBQUE7RUFFRjNCLFFBQUFBLFNBQVMsQ0FBQzdILEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVXdKLEdBQUcsRUFBRTtFQUNuQyxVQUFBLElBQUksQ0FBQzNCLFNBQVMsQ0FBQ0UsTUFBTSxFQUFFLEVBQUU7RUFDdkJsQyxZQUFBQSxJQUFJLENBQUN3RixVQUFVLENBQUNuTCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7RUFDbEMsV0FBQTtFQUNGLFNBQUMsQ0FBQyxDQUFBO1NBQ0gsQ0FBQTtFQUVEdU0sTUFBQUEsZUFBZSxDQUFDdlQsU0FBUyxDQUFDZ0wsS0FBSyxHQUFHLFlBQVk7VUFDNUMsSUFBSXlJLFNBQVMsR0FBRyxJQUFJLENBQUN0QixVQUFVLENBQUMxRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtVQUNwRWdJLFNBQVMsQ0FBQ3hJLEtBQUssRUFBRSxDQUFBO0VBQ2pCd0ksUUFBQUEsU0FBUyxDQUFDM0UsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9CLENBQUE7UUFFRHlFLGVBQWUsQ0FBQ3ZULFNBQVMsQ0FBQzhRLE9BQU8sR0FBRyxVQUFVOUksSUFBSSxFQUFFMkcsU0FBUyxFQUFFO1VBQzdELElBQUlOLFFBQVEsR0FBRyxJQUFJLENBQUMzRCxPQUFPLENBQUNJLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1VBQ3BELElBQUk5QixZQUFZLEdBQUcsSUFBSSxDQUFDMEIsT0FBTyxDQUFDSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7VUFFbkQsT0FBTzlCLFlBQVksQ0FBQ3FGLFFBQVEsQ0FBQ3JHLElBQUksRUFBRTJHLFNBQVMsQ0FBQyxDQUFDLENBQUE7U0FDL0MsQ0FBQTtFQUVENEUsTUFBQUEsZUFBZSxDQUFDdlQsU0FBUyxDQUFDMFQsa0JBQWtCLEdBQUcsWUFBWTtVQUN6RCxPQUFPMVYsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1NBQzFCLENBQUE7RUFFRHVWLE1BQUFBLGVBQWUsQ0FBQ3ZULFNBQVMsQ0FBQ3dTLE1BQU0sR0FBRyxVQUFVeEssSUFBSSxFQUFFO0VBQ2pELFFBQUEsSUFBSUEsSUFBSSxDQUFDdEcsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUNzSixLQUFLLEVBQUUsQ0FBQTtFQUNaLFVBQUEsT0FBQTtFQUNGLFNBQUE7RUFFQSxRQUFBLElBQUkySSxTQUFTLEdBQUczTCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7VUFFdkIsSUFBSXlMLFNBQVMsR0FBRyxJQUFJLENBQUN0QixVQUFVLENBQUMxRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtVQUNwRSxJQUFJbUksU0FBUyxHQUFHLElBQUksQ0FBQzlDLE9BQU8sQ0FBQzZDLFNBQVMsRUFBRUYsU0FBUyxDQUFDLENBQUE7VUFFbERBLFNBQVMsQ0FBQ3hJLEtBQUssRUFBRSxDQUFDSyxNQUFNLENBQUNzSSxTQUFTLENBQUMsQ0FBQTtVQUVuQyxJQUFJM0YsS0FBSyxHQUFHMEYsU0FBUyxDQUFDMUYsS0FBSyxJQUFJMEYsU0FBUyxDQUFDckcsSUFBSSxDQUFBO0VBRTdDLFFBQUEsSUFBSVcsS0FBSyxFQUFFO0VBQ1R3RixVQUFBQSxTQUFTLENBQUMxSSxJQUFJLENBQUMsT0FBTyxFQUFFa0QsS0FBSyxDQUFDLENBQUE7RUFDaEMsU0FBQyxNQUFNO0VBQ0x3RixVQUFBQSxTQUFTLENBQUMzRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7RUFDL0IsU0FBQTtTQUNELENBQUE7RUFFRCxNQUFBLE9BQU95RSxlQUFlLENBQUE7RUFDeEIsS0FBQyxDQUFDLENBQUE7RUFFRnJVLElBQUFBLEVBQUUsQ0FBQ1QsTUFBTSxDQUFDLDRCQUE0QixFQUFDLENBQ3JDLFFBQVEsRUFDUixRQUFRLEVBQ1IsVUFBVSxDQUNYLEVBQUUsVUFBVVQsQ0FBQyxFQUFFa1UsYUFBYSxFQUFFcE4sS0FBSyxFQUFFO0VBQ3BDLE1BQUEsU0FBUytPLGlCQUFpQkEsQ0FBRXBKLFFBQVEsRUFBRUMsT0FBTyxFQUFFO1VBQzdDbUosaUJBQWlCLENBQUN2TyxTQUFTLENBQUNGLFdBQVcsQ0FBQzVDLEtBQUssQ0FBQyxJQUFJLEVBQUVGLFNBQVMsQ0FBQyxDQUFBO0VBQ2hFLE9BQUE7RUFFQXdDLE1BQUFBLEtBQUssQ0FBQ0MsTUFBTSxDQUFDOE8saUJBQWlCLEVBQUUzQixhQUFhLENBQUMsQ0FBQTtFQUU5QzJCLE1BQUFBLGlCQUFpQixDQUFDN1QsU0FBUyxDQUFDNEssTUFBTSxHQUFHLFlBQVk7VUFDL0MsSUFBSXVILFVBQVUsR0FBRzBCLGlCQUFpQixDQUFDdk8sU0FBUyxDQUFDc0YsTUFBTSxDQUFDckssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1VBRTlENFIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDbkYsU0FBUyxDQUFDQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtFQUUxRGtGLFFBQUFBLFVBQVUsQ0FBQ3FCLElBQUksQ0FDYiwrQ0FDRixDQUFDLENBQUE7RUFFRCxRQUFBLE9BQU9yQixVQUFVLENBQUE7U0FDbEIsQ0FBQTtRQUVEMEIsaUJBQWlCLENBQUM3VCxTQUFTLENBQUM0SCxJQUFJLEdBQUcsVUFBVStHLFNBQVMsRUFBRUMsVUFBVSxFQUFFO1VBQ2xFLElBQUlqQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1VBRWZrSCxpQkFBaUIsQ0FBQ3ZPLFNBQVMsQ0FBQ3NDLElBQUksQ0FBQ3BGLEtBQUssQ0FBQyxJQUFJLEVBQUVGLFNBQVMsQ0FBQyxDQUFBO0VBRXZELFFBQUEsSUFBSXdCLEVBQUUsR0FBRzZLLFNBQVMsQ0FBQzdLLEVBQUUsR0FBRyxZQUFZLENBQUE7RUFDcEMsUUFBQSxJQUFJLENBQUNxTyxVQUFVLENBQUMxRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQ1YsSUFBSSxDQUFDLElBQUksRUFBRWpILEVBQUUsQ0FBQyxDQUFBO1VBRW5FLElBQUksQ0FBQ3FPLFVBQVUsQ0FBQ3JMLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVXdKLEdBQUcsRUFBRTtFQUN6QzNELFVBQUFBLElBQUksQ0FBQzNGLE9BQU8sQ0FBQyxRQUFRLEVBQUU7RUFDckJ3SixZQUFBQSxhQUFhLEVBQUVGLEdBQUFBO0VBQ2pCLFdBQUMsQ0FBQyxDQUFBO0VBQ0osU0FBQyxDQUFDLENBQUE7VUFFRixJQUFJLENBQUM2QixVQUFVLENBQUNyTCxFQUFFLENBQ2hCLE9BQU8sRUFDUCxvQ0FBb0MsRUFDcEMsVUFBVXdKLEdBQUcsRUFBRTtFQUNiO0VBQ0EsVUFBQSxJQUFJM0QsSUFBSSxDQUFDMkcsVUFBVSxFQUFFLEVBQUU7RUFDckIsWUFBQSxPQUFBO0VBQ0YsV0FBQTtFQUVBLFVBQUEsSUFBSVEsT0FBTyxHQUFHOVYsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0VBQ3JCLFVBQUEsSUFBSW1VLFVBQVUsR0FBRzJCLE9BQU8sQ0FBQ0MsTUFBTSxFQUFFLENBQUE7RUFFakMsVUFBQSxJQUFJL0wsSUFBSSxHQUFHbEQsS0FBSyxDQUFDOEUsT0FBTyxDQUFDdUksVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0VBRS9DeEYsVUFBQUEsSUFBSSxDQUFDM0YsT0FBTyxDQUFDLFVBQVUsRUFBRTtFQUN2QndKLFlBQUFBLGFBQWEsRUFBRUYsR0FBRztFQUNsQnRJLFlBQUFBLElBQUksRUFBRUEsSUFBQUE7RUFDUixXQUFDLENBQUMsQ0FBQTtFQUNKLFNBQ0YsQ0FBQyxDQUFBO1VBRUQsSUFBSSxDQUFDbUssVUFBVSxDQUFDckwsRUFBRSxDQUNoQixTQUFTLEVBQ1Qsb0NBQW9DLEVBQ3BDLFVBQVV3SixHQUFHLEVBQUU7RUFDYjtFQUNBLFVBQUEsSUFBSTNELElBQUksQ0FBQzJHLFVBQVUsRUFBRSxFQUFFO0VBQ3JCLFlBQUEsT0FBQTtFQUNGLFdBQUE7WUFFQWhELEdBQUcsQ0FBQ0QsZUFBZSxFQUFFLENBQUE7RUFDdkIsU0FDRixDQUFDLENBQUE7U0FDRixDQUFBO0VBRUR3RCxNQUFBQSxpQkFBaUIsQ0FBQzdULFNBQVMsQ0FBQ2dMLEtBQUssR0FBRyxZQUFZO1VBQzlDLElBQUl5SSxTQUFTLEdBQUcsSUFBSSxDQUFDdEIsVUFBVSxDQUFDMUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUE7VUFDcEVnSSxTQUFTLENBQUN4SSxLQUFLLEVBQUUsQ0FBQTtFQUNqQndJLFFBQUFBLFNBQVMsQ0FBQzNFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUM5QixDQUFBO1FBRUQrRSxpQkFBaUIsQ0FBQzdULFNBQVMsQ0FBQzhRLE9BQU8sR0FBRyxVQUFVOUksSUFBSSxFQUFFMkcsU0FBUyxFQUFFO1VBQy9ELElBQUlOLFFBQVEsR0FBRyxJQUFJLENBQUMzRCxPQUFPLENBQUNJLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1VBQ3BELElBQUk5QixZQUFZLEdBQUcsSUFBSSxDQUFDMEIsT0FBTyxDQUFDSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7VUFFbkQsT0FBTzlCLFlBQVksQ0FBQ3FGLFFBQVEsQ0FBQ3JHLElBQUksRUFBRTJHLFNBQVMsQ0FBQyxDQUFDLENBQUE7U0FDL0MsQ0FBQTtFQUVEa0YsTUFBQUEsaUJBQWlCLENBQUM3VCxTQUFTLENBQUMwVCxrQkFBa0IsR0FBRyxZQUFZO0VBQzNELFFBQUEsSUFBSTlFLFVBQVUsR0FBRzVRLENBQUMsQ0FDaEIsd0NBQXdDLEdBQ3RDLGtFQUFrRSxHQUNsRSxnQkFBZ0IsR0FDZCx5Q0FBeUMsR0FDM0MsV0FBVyxHQUNYLDBEQUEwRCxHQUM1RCxPQUNGLENBQUMsQ0FBQTtFQUVELFFBQUEsT0FBTzRRLFVBQVUsQ0FBQTtTQUNsQixDQUFBO0VBRURpRixNQUFBQSxpQkFBaUIsQ0FBQzdULFNBQVMsQ0FBQ3dTLE1BQU0sR0FBRyxVQUFVeEssSUFBSSxFQUFFO1VBQ25ELElBQUksQ0FBQ2dELEtBQUssRUFBRSxDQUFBO0VBRVosUUFBQSxJQUFJaEQsSUFBSSxDQUFDdEcsTUFBTSxLQUFLLENBQUMsRUFBRTtFQUNyQixVQUFBLE9BQUE7RUFDRixTQUFBO1VBRUEsSUFBSXNTLFdBQVcsR0FBRyxFQUFFLENBQUE7RUFFcEIsUUFBQSxJQUFJQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM5QixVQUFVLENBQUMxRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FDekVWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUE7RUFFMUIsUUFBQSxLQUFLLElBQUlwRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdxQixJQUFJLENBQUN0RyxNQUFNLEVBQUVpRixDQUFDLEVBQUUsRUFBRTtFQUNwQyxVQUFBLElBQUlnTixTQUFTLEdBQUczTCxJQUFJLENBQUNyQixDQUFDLENBQUMsQ0FBQTtFQUV2QixVQUFBLElBQUl3TCxVQUFVLEdBQUcsSUFBSSxDQUFDdUIsa0JBQWtCLEVBQUUsQ0FBQTtZQUMxQyxJQUFJRSxTQUFTLEdBQUcsSUFBSSxDQUFDOUMsT0FBTyxDQUFDNkMsU0FBUyxFQUFFeEIsVUFBVSxDQUFDLENBQUE7WUFFbkQsSUFBSStCLFdBQVcsR0FBR0QsaUJBQWlCLEdBQUduUCxLQUFLLENBQUN1QyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO1lBRWxFLElBQUlzTSxTQUFTLENBQUM3UCxFQUFFLEVBQUU7Y0FDaEJvUSxXQUFXLElBQUlQLFNBQVMsQ0FBQzdQLEVBQUUsQ0FBQTtFQUM3QixXQUFDLE1BQU07RUFDTG9RLFlBQUFBLFdBQVcsSUFBSXBQLEtBQUssQ0FBQ3VDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtFQUN2QyxXQUFBO0VBRUE4SyxVQUFBQSxVQUFVLENBQUMxRyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FDbkRILE1BQU0sQ0FBQ3NJLFNBQVMsQ0FBQyxDQUNqQjdJLElBQUksQ0FBQyxJQUFJLEVBQUVtSixXQUFXLENBQUMsQ0FBQTtZQUUxQixJQUFJakcsS0FBSyxHQUFHMEYsU0FBUyxDQUFDMUYsS0FBSyxJQUFJMEYsU0FBUyxDQUFDckcsSUFBSSxDQUFBO0VBRTdDLFVBQUEsSUFBSVcsS0FBSyxFQUFFO0VBQ1RrRSxZQUFBQSxVQUFVLENBQUNwSCxJQUFJLENBQUMsT0FBTyxFQUFFa0QsS0FBSyxDQUFDLENBQUE7RUFDakMsV0FBQTtFQUVBLFVBQUEsSUFBSWtHLFVBQVUsR0FBRyxJQUFJLENBQUN6SixPQUFPLENBQUNJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQ0EsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0VBRW5FLFVBQUEsSUFBSWdKLE9BQU8sR0FBRzNCLFVBQVUsQ0FBQzFHLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO1lBRW5FcUksT0FBTyxDQUFDL0ksSUFBSSxDQUFDLE9BQU8sRUFBRW9KLFVBQVUsRUFBRSxDQUFDLENBQUE7WUFDbkNMLE9BQU8sQ0FBQy9JLElBQUksQ0FBQyxZQUFZLEVBQUVvSixVQUFVLEVBQUUsQ0FBQyxDQUFBO0VBQ3hDTCxVQUFBQSxPQUFPLENBQUMvSSxJQUFJLENBQUMsa0JBQWtCLEVBQUVtSixXQUFXLENBQUMsQ0FBQTtZQUU3Q3BQLEtBQUssQ0FBQzZFLFNBQVMsQ0FBQ3dJLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUV3QixTQUFTLENBQUMsQ0FBQTtFQUVqREssVUFBQUEsV0FBVyxDQUFDelIsSUFBSSxDQUFDNFAsVUFBVSxDQUFDLENBQUE7RUFDOUIsU0FBQTtVQUVBLElBQUlzQixTQUFTLEdBQUcsSUFBSSxDQUFDdEIsVUFBVSxDQUFDMUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUE7RUFFcEVnSSxRQUFBQSxTQUFTLENBQUNuSSxNQUFNLENBQUMwSSxXQUFXLENBQUMsQ0FBQTtTQUM5QixDQUFBO0VBRUQsTUFBQSxPQUFPSCxpQkFBaUIsQ0FBQTtFQUMxQixLQUFDLENBQUMsQ0FBQTtFQUVGM1UsSUFBQUEsRUFBRSxDQUFDVCxNQUFNLENBQUMsK0JBQStCLEVBQUMsRUFFekMsRUFBRSxZQUFZO0VBQ2IsTUFBQSxTQUFTMlYsV0FBV0EsQ0FBRUMsU0FBUyxFQUFFNUosUUFBUSxFQUFFQyxPQUFPLEVBQUU7RUFDbEQsUUFBQSxJQUFJLENBQUM0SixXQUFXLEdBQUcsSUFBSSxDQUFDQyxvQkFBb0IsQ0FBQzdKLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7VUFFeEV1SixTQUFTLENBQUM5VCxJQUFJLENBQUMsSUFBSSxFQUFFa0ssUUFBUSxFQUFFQyxPQUFPLENBQUMsQ0FBQTtFQUN6QyxPQUFBO1FBRUEwSixXQUFXLENBQUNwVSxTQUFTLENBQUN1VSxvQkFBb0IsR0FBRyxVQUFVQyxDQUFDLEVBQUVGLFdBQVcsRUFBRTtFQUNyRSxRQUFBLElBQUksT0FBT0EsV0FBVyxLQUFLLFFBQVEsRUFBRTtFQUNuQ0EsVUFBQUEsV0FBVyxHQUFHO0VBQ1p4USxZQUFBQSxFQUFFLEVBQUUsRUFBRTtFQUNOd0osWUFBQUEsSUFBSSxFQUFFZ0gsV0FBQUE7YUFDUCxDQUFBO0VBQ0gsU0FBQTtFQUVBLFFBQUEsT0FBT0EsV0FBVyxDQUFBO1NBQ25CLENBQUE7UUFFREYsV0FBVyxDQUFDcFUsU0FBUyxDQUFDeVUsaUJBQWlCLEdBQUcsVUFBVUosU0FBUyxFQUFFQyxXQUFXLEVBQUU7RUFDMUUsUUFBQSxJQUFJSSxZQUFZLEdBQUcsSUFBSSxDQUFDaEIsa0JBQWtCLEVBQUUsQ0FBQTtVQUU1Q2dCLFlBQVksQ0FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMxQyxPQUFPLENBQUN3RCxXQUFXLENBQUMsQ0FBQyxDQUFBO1VBQzVDSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMxSCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1VBQy9EeUgsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDMUgsU0FBUyxDQUFDdEIsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUE7RUFFN0QsUUFBQSxJQUFJaUosZ0JBQWdCLEdBQUdMLFdBQVcsQ0FBQ3JHLEtBQUssSUFDdENxRyxXQUFXLENBQUNoSCxJQUFJLElBQ2hCb0gsWUFBWSxDQUFDcEgsSUFBSSxFQUFFLENBQUE7RUFFckIsUUFBQSxJQUFJLENBQUM2RSxVQUFVLENBQUMxRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQ1YsSUFBSSxDQUN2RCxPQUFPLEVBQ1A0SixnQkFDRixDQUFDLENBQUE7RUFFRCxRQUFBLE9BQU9ELFlBQVksQ0FBQTtTQUNwQixDQUFBO1FBRUROLFdBQVcsQ0FBQ3BVLFNBQVMsQ0FBQ3dTLE1BQU0sR0FBRyxVQUFVNkIsU0FBUyxFQUFFck0sSUFBSSxFQUFFO0VBQ3hELFFBQUEsSUFBSTRNLGlCQUFpQixHQUNuQjVNLElBQUksQ0FBQ3RHLE1BQU0sSUFBSSxDQUFDLElBQUlzRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNsRSxFQUFFLElBQUksSUFBSSxDQUFDd1EsV0FBVyxDQUFDeFEsRUFDcEQsQ0FBQTtFQUNELFFBQUEsSUFBSStRLGtCQUFrQixHQUFHN00sSUFBSSxDQUFDdEcsTUFBTSxHQUFHLENBQUMsQ0FBQTtVQUV4QyxJQUFJbVQsa0JBQWtCLElBQUlELGlCQUFpQixFQUFFO0VBQzNDLFVBQUEsT0FBT1AsU0FBUyxDQUFDOVQsSUFBSSxDQUFDLElBQUksRUFBRXlILElBQUksQ0FBQyxDQUFBO0VBQ25DLFNBQUE7VUFFQSxJQUFJLENBQUNnRCxLQUFLLEVBQUUsQ0FBQTtVQUVaLElBQUkwSixZQUFZLEdBQUcsSUFBSSxDQUFDRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUNILFdBQVcsQ0FBQyxDQUFBO1VBRTNELElBQUksQ0FBQ25DLFVBQVUsQ0FBQzFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDSCxNQUFNLENBQUNvSixZQUFZLENBQUMsQ0FBQTtTQUMxRSxDQUFBO0VBRUQsTUFBQSxPQUFPTixXQUFXLENBQUE7RUFDcEIsS0FBQyxDQUFDLENBQUE7RUFFRmxWLElBQUFBLEVBQUUsQ0FBQ1QsTUFBTSxDQUFDLDhCQUE4QixFQUFDLENBQ3ZDLFFBQVEsRUFDUixTQUFTLEVBQ1QsVUFBVSxDQUNYLEVBQUUsVUFBVVQsQ0FBQyxFQUFFZ1QsSUFBSSxFQUFFbE0sS0FBSyxFQUFFO1FBQzNCLFNBQVNnUSxVQUFVQSxHQUFJLEVBQUU7UUFFekJBLFVBQVUsQ0FBQzlVLFNBQVMsQ0FBQzRILElBQUksR0FBRyxVQUFVeU0sU0FBUyxFQUFFMUYsU0FBUyxFQUFFQyxVQUFVLEVBQUU7VUFDdEUsSUFBSWpDLElBQUksR0FBRyxJQUFJLENBQUE7VUFFZjBILFNBQVMsQ0FBQzlULElBQUksQ0FBQyxJQUFJLEVBQUVvTyxTQUFTLEVBQUVDLFVBQVUsQ0FBQyxDQUFBO0VBRTNDLFFBQUEsSUFBSSxJQUFJLENBQUMwRixXQUFXLElBQUksSUFBSSxFQUFFO0VBQzVCLFVBQUEsSUFBSSxJQUFJLENBQUM1SixPQUFPLENBQUNJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSTlMLE1BQU0sQ0FBQzRGLE9BQU8sSUFBSUEsT0FBTyxDQUFDQyxLQUFLLEVBQUU7RUFDaEVELFlBQUFBLE9BQU8sQ0FBQ0MsS0FBSyxDQUNYLGlFQUFpRSxHQUNqRSxnQ0FDRixDQUFDLENBQUE7RUFDSCxXQUFBO0VBQ0YsU0FBQTtVQUVBLElBQUksQ0FBQ3NOLFVBQVUsQ0FBQ3JMLEVBQUUsQ0FBQyxXQUFXLEVBQUUsMkJBQTJCLEVBQ3pELFVBQVV3SixHQUFHLEVBQUU7RUFDYjNELFVBQUFBLElBQUksQ0FBQ29JLFlBQVksQ0FBQ3pFLEdBQUcsQ0FBQyxDQUFBO0VBQzFCLFNBQUMsQ0FBQyxDQUFBO0VBRUYzQixRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVV3SixHQUFHLEVBQUU7RUFDdEMzRCxVQUFBQSxJQUFJLENBQUNxSSxvQkFBb0IsQ0FBQzFFLEdBQUcsRUFBRTNCLFNBQVMsQ0FBQyxDQUFBO0VBQzNDLFNBQUMsQ0FBQyxDQUFBO1NBQ0gsQ0FBQTtRQUVEbUcsVUFBVSxDQUFDOVUsU0FBUyxDQUFDK1UsWUFBWSxHQUFHLFVBQVVQLENBQUMsRUFBRWxFLEdBQUcsRUFBRTtFQUNwRDtFQUNBLFFBQUEsSUFBSSxJQUFJLENBQUNnRCxVQUFVLEVBQUUsRUFBRTtFQUNyQixVQUFBLE9BQUE7RUFDRixTQUFBO1VBRUEsSUFBSTJCLE1BQU0sR0FBRyxJQUFJLENBQUM5QyxVQUFVLENBQUMxRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQTs7RUFFOUQ7RUFDQSxRQUFBLElBQUl3SixNQUFNLENBQUN2VCxNQUFNLEtBQUssQ0FBQyxFQUFFO0VBQ3ZCLFVBQUEsT0FBQTtFQUNGLFNBQUE7VUFFQTRPLEdBQUcsQ0FBQ0QsZUFBZSxFQUFFLENBQUE7RUFFckIsUUFBQSxJQUFJckksSUFBSSxHQUFHbEQsS0FBSyxDQUFDOEUsT0FBTyxDQUFDcUwsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1VBRTNDLElBQUlDLFdBQVcsR0FBRyxJQUFJLENBQUN6SyxRQUFRLENBQUMwRCxHQUFHLEVBQUUsQ0FBQTtVQUNyQyxJQUFJLENBQUMxRCxRQUFRLENBQUMwRCxHQUFHLENBQUMsSUFBSSxDQUFDbUcsV0FBVyxDQUFDeFEsRUFBRSxDQUFDLENBQUE7RUFFdEMsUUFBQSxJQUFJcVIsWUFBWSxHQUFHO0VBQ2pCbk4sVUFBQUEsSUFBSSxFQUFFQSxJQUFBQTtXQUNQLENBQUE7RUFDRCxRQUFBLElBQUksQ0FBQ2hCLE9BQU8sQ0FBQyxPQUFPLEVBQUVtTyxZQUFZLENBQUMsQ0FBQTtVQUNuQyxJQUFJQSxZQUFZLENBQUNDLFNBQVMsRUFBRTtFQUMxQixVQUFBLElBQUksQ0FBQzNLLFFBQVEsQ0FBQzBELEdBQUcsQ0FBQytHLFdBQVcsQ0FBQyxDQUFBO0VBQzlCLFVBQUEsT0FBQTtFQUNGLFNBQUE7RUFFQSxRQUFBLEtBQUssSUFBSXZPLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3FCLElBQUksQ0FBQ3RHLE1BQU0sRUFBRWlGLENBQUMsRUFBRSxFQUFFO0VBQ3BDd08sVUFBQUEsWUFBWSxHQUFHO2NBQ2JuTixJQUFJLEVBQUVBLElBQUksQ0FBQ3JCLENBQUMsQ0FBQTthQUNiLENBQUE7O0VBRUQ7RUFDQTtFQUNBLFVBQUEsSUFBSSxDQUFDSyxPQUFPLENBQUMsVUFBVSxFQUFFbU8sWUFBWSxDQUFDLENBQUE7O0VBRXRDO1lBQ0EsSUFBSUEsWUFBWSxDQUFDQyxTQUFTLEVBQUU7RUFDMUIsWUFBQSxJQUFJLENBQUMzSyxRQUFRLENBQUMwRCxHQUFHLENBQUMrRyxXQUFXLENBQUMsQ0FBQTtFQUM5QixZQUFBLE9BQUE7RUFDRixXQUFBO0VBQ0YsU0FBQTtVQUVBLElBQUksQ0FBQ3pLLFFBQVEsQ0FBQ3pELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQ0EsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBRWhELFFBQUEsSUFBSSxDQUFDQSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1NBQzNCLENBQUE7UUFFRDhOLFVBQVUsQ0FBQzlVLFNBQVMsQ0FBQ2dWLG9CQUFvQixHQUFHLFVBQVVSLENBQUMsRUFBRWxFLEdBQUcsRUFBRTNCLFNBQVMsRUFBRTtFQUN2RSxRQUFBLElBQUlBLFNBQVMsQ0FBQ0UsTUFBTSxFQUFFLEVBQUU7RUFDdEIsVUFBQSxPQUFBO0VBQ0YsU0FBQTtFQUVBLFFBQUEsSUFBSXlCLEdBQUcsQ0FBQ2lDLEtBQUssSUFBSXZCLElBQUksQ0FBQ2lCLE1BQU0sSUFBSTNCLEdBQUcsQ0FBQ2lDLEtBQUssSUFBSXZCLElBQUksQ0FBQ0MsU0FBUyxFQUFFO0VBQzNELFVBQUEsSUFBSSxDQUFDOEQsWUFBWSxDQUFDekUsR0FBRyxDQUFDLENBQUE7RUFDeEIsU0FBQTtTQUNELENBQUE7UUFFRHdFLFVBQVUsQ0FBQzlVLFNBQVMsQ0FBQ3dTLE1BQU0sR0FBRyxVQUFVNkIsU0FBUyxFQUFFck0sSUFBSSxFQUFFO0VBQ3ZEcU0sUUFBQUEsU0FBUyxDQUFDOVQsSUFBSSxDQUFDLElBQUksRUFBRXlILElBQUksQ0FBQyxDQUFBO1VBRTFCLElBQUksQ0FBQ21LLFVBQVUsQ0FBQzFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDQyxNQUFNLEVBQUUsQ0FBQTtVQUMxRCxJQUFJLENBQUN5RyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUNuRixTQUFTLENBQUN0QixNQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtFQUVuRSxRQUFBLElBQUksSUFBSSxDQUFDeUcsVUFBVSxDQUFDMUcsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUMvSixNQUFNLEdBQUcsQ0FBQyxJQUNsRXNHLElBQUksQ0FBQ3RHLE1BQU0sS0FBSyxDQUFDLEVBQUU7RUFDckIsVUFBQSxPQUFBO0VBQ0YsU0FBQTtFQUVBLFFBQUEsSUFBSXdTLFdBQVcsR0FBRyxJQUFJLENBQUMvQixVQUFVLENBQUMxRyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FDbkVWLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtFQUViLFFBQUEsSUFBSXNLLFNBQVMsR0FBRyxJQUFJLENBQUMzSyxPQUFPLENBQUNJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQ0EsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7VUFFdEUsSUFBSWdKLE9BQU8sR0FBRzlWLENBQUMsQ0FDYix1RUFBdUUsR0FDckUseUNBQXlDLEdBQzNDLFdBQ0YsQ0FBQyxDQUFBO1VBQ0Q4VixPQUFPLENBQUMvSSxJQUFJLENBQUMsT0FBTyxFQUFFc0ssU0FBUyxFQUFFLENBQUMsQ0FBQTtVQUNsQ3ZCLE9BQU8sQ0FBQy9JLElBQUksQ0FBQyxZQUFZLEVBQUVzSyxTQUFTLEVBQUUsQ0FBQyxDQUFBO0VBQ3ZDdkIsUUFBQUEsT0FBTyxDQUFDL0ksSUFBSSxDQUFDLGtCQUFrQixFQUFFbUosV0FBVyxDQUFDLENBQUE7VUFDN0NwUCxLQUFLLENBQUM2RSxTQUFTLENBQUNtSyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFOUwsSUFBSSxDQUFDLENBQUE7RUFFekMsUUFBQSxJQUFJLENBQUNtSyxVQUFVLENBQUMzRSxPQUFPLENBQUNzRyxPQUFPLENBQUMsQ0FBQTtVQUNoQyxJQUFJLENBQUMzQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUNuRixTQUFTLENBQUNDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1NBQ2pFLENBQUE7RUFFRCxNQUFBLE9BQU82SCxVQUFVLENBQUE7RUFDbkIsS0FBQyxDQUFDLENBQUE7RUFFRjVWLElBQUFBLEVBQUUsQ0FBQ1QsTUFBTSxDQUFDLDBCQUEwQixFQUFDLENBQ25DLFFBQVEsRUFDUixVQUFVLEVBQ1YsU0FBUyxDQUNWLEVBQUUsVUFBVVQsQ0FBQyxFQUFFOEcsS0FBSyxFQUFFa00sSUFBSSxFQUFFO0VBQzNCLE1BQUEsU0FBU3NFLE1BQU1BLENBQUVqQixTQUFTLEVBQUU1SixRQUFRLEVBQUVDLE9BQU8sRUFBRTtVQUM3QzJKLFNBQVMsQ0FBQzlULElBQUksQ0FBQyxJQUFJLEVBQUVrSyxRQUFRLEVBQUVDLE9BQU8sQ0FBQyxDQUFBO0VBQ3pDLE9BQUE7RUFFQTRLLE1BQUFBLE1BQU0sQ0FBQ3RWLFNBQVMsQ0FBQzRLLE1BQU0sR0FBRyxVQUFVeUosU0FBUyxFQUFFO0VBQzdDLFFBQUEsSUFBSWtCLFdBQVcsR0FBRyxJQUFJLENBQUM3SyxPQUFPLENBQUNJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQ0EsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0VBQ2hFLFFBQUEsSUFBSTBLLE9BQU8sR0FBR3hYLENBQUMsQ0FDYixzREFBc0QsR0FDcEQseUNBQXlDLEdBQ3pDLDhCQUE4QixHQUM5QiwwQ0FBMEMsR0FDMUMsaUVBQWlFLEdBQ2pFLGFBQWEsR0FDZixTQUNGLENBQUMsQ0FBQTtVQUVELElBQUksQ0FBQ3lYLGdCQUFnQixHQUFHRCxPQUFPLENBQUE7VUFDL0IsSUFBSSxDQUFDQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQy9KLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtFQUV2QyxRQUFBLElBQUksQ0FBQytKLE9BQU8sQ0FBQ2xWLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDb0ssT0FBTyxDQUFDSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtVQUNuRSxJQUFJLENBQUMwSyxPQUFPLENBQUN6SyxJQUFJLENBQUMsWUFBWSxFQUFFd0ssV0FBVyxFQUFFLENBQUMsQ0FBQTtFQUU5QyxRQUFBLElBQUk5QixTQUFTLEdBQUdZLFNBQVMsQ0FBQzlULElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtVQUVwQyxJQUFJLENBQUNtVixpQkFBaUIsRUFBRSxDQUFBO0VBQ3hCakMsUUFBQUEsU0FBUyxDQUFDbkksTUFBTSxDQUFDLElBQUksQ0FBQ21LLGdCQUFnQixDQUFDLENBQUE7RUFFdkMsUUFBQSxPQUFPaEMsU0FBUyxDQUFBO1NBQ2pCLENBQUE7UUFFRDZCLE1BQU0sQ0FBQ3RWLFNBQVMsQ0FBQzRILElBQUksR0FBRyxVQUFVeU0sU0FBUyxFQUFFMUYsU0FBUyxFQUFFQyxVQUFVLEVBQUU7VUFDbEUsSUFBSWpDLElBQUksR0FBRyxJQUFJLENBQUE7RUFFZixRQUFBLElBQUkwRixTQUFTLEdBQUcxRCxTQUFTLENBQUM3SyxFQUFFLEdBQUcsVUFBVSxDQUFBO0VBQ3pDLFFBQUEsSUFBSW9RLFdBQVcsR0FBR3ZGLFNBQVMsQ0FBQzdLLEVBQUUsR0FBRyxZQUFZLENBQUE7VUFFN0N1USxTQUFTLENBQUM5VCxJQUFJLENBQUMsSUFBSSxFQUFFb08sU0FBUyxFQUFFQyxVQUFVLENBQUMsQ0FBQTtVQUUzQ2pDLElBQUksQ0FBQzZJLE9BQU8sQ0FBQ3pLLElBQUksQ0FBQyxrQkFBa0IsRUFBRW1KLFdBQVcsQ0FBQyxDQUFBO0VBRWxEdkYsUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZO1lBQy9CNkYsSUFBSSxDQUFDNkksT0FBTyxDQUFDekssSUFBSSxDQUFDLGVBQWUsRUFBRXNILFNBQVMsQ0FBQyxDQUFBO0VBQzdDMUYsVUFBQUEsSUFBSSxDQUFDNkksT0FBTyxDQUFDeE8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0VBQy9CLFNBQUMsQ0FBQyxDQUFBO0VBRUYySCxRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7RUFDaEM2RixVQUFBQSxJQUFJLENBQUM2SSxPQUFPLENBQUNySCxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDcEJ4QixJQUFJLENBQUNnSixZQUFZLEVBQUUsQ0FBQTtFQUNuQmhKLFVBQUFBLElBQUksQ0FBQzZJLE9BQU8sQ0FBQzFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQTtFQUN4Q25DLFVBQUFBLElBQUksQ0FBQzZJLE9BQU8sQ0FBQzFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0VBQ2hEbkMsVUFBQUEsSUFBSSxDQUFDNkksT0FBTyxDQUFDeE8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0VBQy9CLFNBQUMsQ0FBQyxDQUFBO0VBRUYySCxRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7WUFDakM2RixJQUFJLENBQUM2SSxPQUFPLENBQUNsVixJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBRXBDcU0sSUFBSSxDQUFDK0ksaUJBQWlCLEVBQUUsQ0FBQTtFQUMxQixTQUFDLENBQUMsQ0FBQTtFQUVGL0csUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZO1lBQ2xDNkYsSUFBSSxDQUFDNkksT0FBTyxDQUFDbFYsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtFQUNyQyxTQUFDLENBQUMsQ0FBQTtFQUVGcU8sUUFBQUEsU0FBUyxDQUFDN0gsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVd0osR0FBRyxFQUFFO0VBQ25DM0QsVUFBQUEsSUFBSSxDQUFDNkksT0FBTyxDQUFDeE8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0VBQy9CLFNBQUMsQ0FBQyxDQUFBO0VBRUYySCxRQUFBQSxTQUFTLENBQUM3SCxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQVVHLE1BQU0sRUFBRTtFQUM5QyxVQUFBLElBQUlBLE1BQU0sQ0FBQ2UsSUFBSSxDQUFDZ0csU0FBUyxFQUFFO0VBQ3pCckIsWUFBQUEsSUFBSSxDQUFDNkksT0FBTyxDQUFDekssSUFBSSxDQUFDLHVCQUF1QixFQUFFOUQsTUFBTSxDQUFDZSxJQUFJLENBQUNnRyxTQUFTLENBQUMsQ0FBQTtFQUNuRSxXQUFDLE1BQU07RUFDTHJCLFlBQUFBLElBQUksQ0FBQzZJLE9BQU8sQ0FBQzFHLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0VBQ2xELFdBQUE7RUFDRixTQUFDLENBQUMsQ0FBQTtVQUVGLElBQUksQ0FBQ3FELFVBQVUsQ0FBQ3JMLEVBQUUsQ0FBQyxTQUFTLEVBQUUseUJBQXlCLEVBQUUsVUFBVXdKLEdBQUcsRUFBRTtFQUN0RTNELFVBQUFBLElBQUksQ0FBQzNGLE9BQU8sQ0FBQyxPQUFPLEVBQUVzSixHQUFHLENBQUMsQ0FBQTtFQUM1QixTQUFDLENBQUMsQ0FBQTtVQUVGLElBQUksQ0FBQzZCLFVBQVUsQ0FBQ3JMLEVBQUUsQ0FBQyxVQUFVLEVBQUUseUJBQXlCLEVBQUUsVUFBVXdKLEdBQUcsRUFBRTtFQUN2RTNELFVBQUFBLElBQUksQ0FBQzJGLFdBQVcsQ0FBQ2hDLEdBQUcsQ0FBQyxDQUFBO0VBQ3ZCLFNBQUMsQ0FBQyxDQUFBO1VBRUYsSUFBSSxDQUFDNkIsVUFBVSxDQUFDckwsRUFBRSxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxVQUFVd0osR0FBRyxFQUFFO1lBQ3RFQSxHQUFHLENBQUNELGVBQWUsRUFBRSxDQUFBO0VBRXJCMUQsVUFBQUEsSUFBSSxDQUFDM0YsT0FBTyxDQUFDLFVBQVUsRUFBRXNKLEdBQUcsQ0FBQyxDQUFBO0VBRTdCM0QsVUFBQUEsSUFBSSxDQUFDaUosZUFBZSxHQUFHdEYsR0FBRyxDQUFDdUYsa0JBQWtCLEVBQUUsQ0FBQTtFQUUvQyxVQUFBLElBQUl4USxHQUFHLEdBQUdpTCxHQUFHLENBQUNpQyxLQUFLLENBQUE7RUFFbkIsVUFBQSxJQUFJbE4sR0FBRyxLQUFLMkwsSUFBSSxDQUFDQyxTQUFTLElBQUl0RSxJQUFJLENBQUM2SSxPQUFPLENBQUNySCxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7RUFDdkQsWUFBQSxJQUFJMkgsZUFBZSxHQUFHbkosSUFBSSxDQUFDd0YsVUFBVSxDQUNsQzFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDc0ssSUFBSSxFQUFFLENBQUE7RUFFNUMsWUFBQSxJQUFJRCxlQUFlLENBQUNwVSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0VBQzlCLGNBQUEsSUFBSXFLLElBQUksR0FBR2pILEtBQUssQ0FBQzhFLE9BQU8sQ0FBQ2tNLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtFQUVwRG5KLGNBQUFBLElBQUksQ0FBQ3FKLGtCQUFrQixDQUFDakssSUFBSSxDQUFDLENBQUE7Z0JBRTdCdUUsR0FBRyxDQUFDRixjQUFjLEVBQUUsQ0FBQTtFQUN0QixhQUFBO0VBQ0YsV0FBQTtFQUNGLFNBQUMsQ0FBQyxDQUFBO1VBRUYsSUFBSSxDQUFDK0IsVUFBVSxDQUFDckwsRUFBRSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVd0osR0FBRyxFQUFFO0VBQ3BFLFVBQUEsSUFBSTNELElBQUksQ0FBQzZJLE9BQU8sQ0FBQ3JILEdBQUcsRUFBRSxFQUFFO2NBQ3RCbUMsR0FBRyxDQUFDRCxlQUFlLEVBQUUsQ0FBQTtFQUN2QixXQUFBO0VBQ0YsU0FBQyxDQUFDLENBQUE7O0VBRUY7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLFFBQUEsSUFBSTRGLElBQUksR0FBR3hJLFFBQVEsQ0FBQ3lJLFlBQVksQ0FBQTtFQUNoQyxRQUFBLElBQUlDLGtCQUFrQixHQUFHRixJQUFJLElBQUlBLElBQUksSUFBSSxFQUFFLENBQUE7O0VBRTNDO0VBQ0E7RUFDQTtVQUNBLElBQUksQ0FBQzlELFVBQVUsQ0FBQ3JMLEVBQUUsQ0FDaEIsbUJBQW1CLEVBQ25CLHlCQUF5QixFQUN6QixVQUFVd0osR0FBRyxFQUFFO0VBQ2I7RUFDQTtFQUNBO0VBQ0EsVUFBQSxJQUFJNkYsa0JBQWtCLEVBQUU7RUFDdEJ4SixZQUFBQSxJQUFJLENBQUN3RixVQUFVLENBQUNnQixHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtFQUNyRCxZQUFBLE9BQUE7RUFDRixXQUFBOztFQUVBO0VBQ0F4RyxVQUFBQSxJQUFJLENBQUN3RixVQUFVLENBQUNnQixHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7RUFDckMsU0FDRixDQUFDLENBQUE7VUFFRCxJQUFJLENBQUNoQixVQUFVLENBQUNyTCxFQUFFLENBQ2hCLDJCQUEyQixFQUMzQix5QkFBeUIsRUFDekIsVUFBVXdKLEdBQUcsRUFBRTtFQUNiO0VBQ0E7RUFDQTtFQUNBLFVBQUEsSUFBSTZGLGtCQUFrQixJQUFJN0YsR0FBRyxDQUFDOEYsSUFBSSxLQUFLLE9BQU8sRUFBRTtFQUM5Q3pKLFlBQUFBLElBQUksQ0FBQ3dGLFVBQVUsQ0FBQ2dCLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO0VBQ3JELFlBQUEsT0FBQTtFQUNGLFdBQUE7RUFFQSxVQUFBLElBQUk5TixHQUFHLEdBQUdpTCxHQUFHLENBQUNpQyxLQUFLLENBQUE7O0VBRW5CO0VBQ0EsVUFBQSxJQUFJbE4sR0FBRyxJQUFJMkwsSUFBSSxDQUFDSSxLQUFLLElBQUkvTCxHQUFHLElBQUkyTCxJQUFJLENBQUNLLElBQUksSUFBSWhNLEdBQUcsSUFBSTJMLElBQUksQ0FBQ00sR0FBRyxFQUFFO0VBQzVELFlBQUEsT0FBQTtFQUNGLFdBQUE7O0VBRUE7RUFDQSxVQUFBLElBQUlqTSxHQUFHLElBQUkyTCxJQUFJLENBQUNFLEdBQUcsRUFBRTtFQUNuQixZQUFBLE9BQUE7RUFDRixXQUFBO0VBRUF2RSxVQUFBQSxJQUFJLENBQUMwSixZQUFZLENBQUMvRixHQUFHLENBQUMsQ0FBQTtFQUN4QixTQUNGLENBQUMsQ0FBQTtTQUNGLENBQUE7O0VBRUQ7RUFDRjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDRWdGLE1BQUFBLE1BQU0sQ0FBQ3RWLFNBQVMsQ0FBQzBWLGlCQUFpQixHQUFHLFVBQVVyQixTQUFTLEVBQUU7RUFDeEQsUUFBQSxJQUFJLENBQUNtQixPQUFPLENBQUN6SyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQ29ILFVBQVUsQ0FBQ3BILElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO1VBQy9ELElBQUksQ0FBQ29ILFVBQVUsQ0FBQ3BILElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDdkMsQ0FBQTtRQUVEdUssTUFBTSxDQUFDdFYsU0FBUyxDQUFDeVUsaUJBQWlCLEdBQUcsVUFBVUosU0FBUyxFQUFFQyxXQUFXLEVBQUU7VUFDckUsSUFBSSxDQUFDa0IsT0FBTyxDQUFDekssSUFBSSxDQUFDLGFBQWEsRUFBRXVKLFdBQVcsQ0FBQ2hILElBQUksQ0FBQyxDQUFBO1NBQ25ELENBQUE7UUFFRGdJLE1BQU0sQ0FBQ3RWLFNBQVMsQ0FBQ3dTLE1BQU0sR0FBRyxVQUFVNkIsU0FBUyxFQUFFck0sSUFBSSxFQUFFO1VBQ25ELElBQUlzTyxjQUFjLEdBQUcsSUFBSSxDQUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUkvSCxRQUFRLENBQUNrRixhQUFhLENBQUE7VUFFOUQsSUFBSSxDQUFDNkMsT0FBTyxDQUFDekssSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQTtFQUVwQ3NKLFFBQUFBLFNBQVMsQ0FBQzlULElBQUksQ0FBQyxJQUFJLEVBQUV5SCxJQUFJLENBQUMsQ0FBQTtVQUUxQixJQUFJLENBQUMyTixZQUFZLEVBQUUsQ0FBQTtFQUNuQixRQUFBLElBQUlXLGNBQWMsRUFBRTtFQUNsQixVQUFBLElBQUksQ0FBQ2QsT0FBTyxDQUFDeE8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0VBQy9CLFNBQUE7U0FDRCxDQUFBO0VBRURzTyxNQUFBQSxNQUFNLENBQUN0VixTQUFTLENBQUNxVyxZQUFZLEdBQUcsWUFBWTtVQUMxQyxJQUFJLENBQUNWLFlBQVksRUFBRSxDQUFBO0VBRW5CLFFBQUEsSUFBSSxDQUFDLElBQUksQ0FBQ0MsZUFBZSxFQUFFO1lBQ3pCLElBQUlXLEtBQUssR0FBRyxJQUFJLENBQUNmLE9BQU8sQ0FBQ3JILEdBQUcsRUFBRSxDQUFBO0VBRTlCLFVBQUEsSUFBSSxDQUFDbkgsT0FBTyxDQUFDLE9BQU8sRUFBRTtFQUNwQndQLFlBQUFBLElBQUksRUFBRUQsS0FBQUE7RUFDUixXQUFDLENBQUMsQ0FBQTtFQUNKLFNBQUE7VUFFQSxJQUFJLENBQUNYLGVBQWUsR0FBRyxLQUFLLENBQUE7U0FDN0IsQ0FBQTtRQUVETixNQUFNLENBQUN0VixTQUFTLENBQUNnVyxrQkFBa0IsR0FBRyxVQUFVM0IsU0FBUyxFQUFFdEksSUFBSSxFQUFFO0VBQy9ELFFBQUEsSUFBSSxDQUFDL0UsT0FBTyxDQUFDLFVBQVUsRUFBRTtFQUN2QmdCLFVBQUFBLElBQUksRUFBRStELElBQUFBO0VBQ1IsU0FBQyxDQUFDLENBQUE7VUFFRixJQUFJLENBQUN5SixPQUFPLENBQUNySCxHQUFHLENBQUNwQyxJQUFJLENBQUN1QixJQUFJLENBQUMsQ0FBQTtVQUMzQixJQUFJLENBQUMrSSxZQUFZLEVBQUUsQ0FBQTtTQUNwQixDQUFBO0VBRURmLE1BQUFBLE1BQU0sQ0FBQ3RWLFNBQVMsQ0FBQzJWLFlBQVksR0FBRyxZQUFZO1VBQzFDLElBQUksQ0FBQ0gsT0FBTyxDQUFDaUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtVQUVqQyxJQUFJQyxLQUFLLEdBQUcsTUFBTSxDQUFBO1VBRWxCLElBQUksSUFBSSxDQUFDbEIsT0FBTyxDQUFDekssSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtFQUMzQyxVQUFBLElBQUk0TCxZQUFZLEdBQUcsSUFBSSxDQUFDbkIsT0FBTyxDQUFDckgsR0FBRyxFQUFFLENBQUN6TSxNQUFNLEdBQUcsQ0FBQyxDQUFBO0VBRWhEZ1YsVUFBQUEsS0FBSyxHQUFJQyxZQUFZLEdBQUcsSUFBSSxHQUFJLElBQUksQ0FBQTtFQUN0QyxTQUFBO1VBRUEsSUFBSSxDQUFDbkIsT0FBTyxDQUFDaUIsR0FBRyxDQUFDLE9BQU8sRUFBRUMsS0FBSyxDQUFDLENBQUE7U0FDakMsQ0FBQTtFQUVELE1BQUEsT0FBT3BCLE1BQU0sQ0FBQTtFQUNmLEtBQUMsQ0FBQyxDQUFBO01BRUZwVyxFQUFFLENBQUNULE1BQU0sQ0FBQyxnQ0FBZ0MsRUFBQyxDQUN6QyxVQUFVLENBQ1gsRUFBRSxVQUFVcUcsS0FBSyxFQUFFO1FBQ2xCLFNBQVM4UixZQUFZQSxHQUFJLEVBQUU7RUFFM0JBLE1BQUFBLFlBQVksQ0FBQzVXLFNBQVMsQ0FBQzRLLE1BQU0sR0FBRyxVQUFVeUosU0FBUyxFQUFFO0VBQ25ELFFBQUEsSUFBSWxDLFVBQVUsR0FBR2tDLFNBQVMsQ0FBQzlULElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtVQUVyQyxJQUFJc1csaUJBQWlCLEdBQUcsSUFBSSxDQUFDbk0sT0FBTyxDQUFDSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUE7VUFFbkUsSUFBSStMLGlCQUFpQixDQUFDNVQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzdDNFQsaUJBQWlCLEdBQUdBLGlCQUFpQixDQUFDaFYsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQTtFQUUxRGlELFVBQUFBLEtBQUssQ0FBQ2lGLHlCQUF5QixDQUFDb0ksVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQzFILFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0VBQ2xFLFNBQUE7RUFFQTBILFFBQUFBLFVBQVUsQ0FBQzJFLFFBQVEsQ0FBQ0QsaUJBQWlCLENBQUMsQ0FBQTtFQUV0QyxRQUFBLE9BQU8xRSxVQUFVLENBQUE7U0FDbEIsQ0FBQTtFQUVELE1BQUEsT0FBT3lFLFlBQVksQ0FBQTtFQUNyQixLQUFDLENBQUMsQ0FBQTtNQUVGMVgsRUFBRSxDQUFDVCxNQUFNLENBQUMsOEJBQThCLEVBQUMsQ0FDdkMsUUFBUSxDQUNULEVBQUUsVUFBVVQsQ0FBQyxFQUFFO1FBQ2QsU0FBUytZLFVBQVVBLEdBQUksRUFBRTtRQUV6QkEsVUFBVSxDQUFDL1csU0FBUyxDQUFDNEgsSUFBSSxHQUFHLFVBQVV5TSxTQUFTLEVBQUUxRixTQUFTLEVBQUVDLFVBQVUsRUFBRTtVQUN0RSxJQUFJakMsSUFBSSxHQUFHLElBQUksQ0FBQTtVQUNmLElBQUlxSyxXQUFXLEdBQUcsQ0FDaEIsTUFBTSxFQUFFLFNBQVMsRUFDakIsT0FBTyxFQUFFLFNBQVMsRUFDbEIsUUFBUSxFQUFFLFdBQVcsRUFDckIsVUFBVSxFQUFFLGFBQWEsRUFDekIsT0FBTyxFQUFFLFVBQVUsQ0FDcEIsQ0FBQTtFQUVELFFBQUEsSUFBSUMsaUJBQWlCLEdBQUcsQ0FDdEIsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FDN0QsQ0FBQTtVQUVENUMsU0FBUyxDQUFDOVQsSUFBSSxDQUFDLElBQUksRUFBRW9PLFNBQVMsRUFBRUMsVUFBVSxDQUFDLENBQUE7VUFFM0NELFNBQVMsQ0FBQzdILEVBQUUsQ0FBQyxHQUFHLEVBQUUsVUFBVTVJLElBQUksRUFBRStJLE1BQU0sRUFBRTtFQUN4QztZQUNBLElBQUkrUCxXQUFXLENBQUMvVCxPQUFPLENBQUMvRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNwQyxZQUFBLE9BQUE7RUFDRixXQUFBOztFQUVBO0VBQ0ErSSxVQUFBQSxNQUFNLEdBQUdBLE1BQU0sSUFBSSxFQUFFLENBQUE7O0VBRXJCO1lBQ0EsSUFBSXFKLEdBQUcsR0FBR3RTLENBQUMsQ0FBQ2taLEtBQUssQ0FBQyxVQUFVLEdBQUdoWixJQUFJLEVBQUU7RUFDbkMrSSxZQUFBQSxNQUFNLEVBQUVBLE1BQUFBO0VBQ1YsV0FBQyxDQUFDLENBQUE7RUFFRjBGLFVBQUFBLElBQUksQ0FBQ2xDLFFBQVEsQ0FBQ3pELE9BQU8sQ0FBQ3NKLEdBQUcsQ0FBQyxDQUFBOztFQUUxQjtZQUNBLElBQUkyRyxpQkFBaUIsQ0FBQ2hVLE9BQU8sQ0FBQy9FLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0VBQzFDLFlBQUEsT0FBQTtFQUNGLFdBQUE7RUFFQStJLFVBQUFBLE1BQU0sQ0FBQ21PLFNBQVMsR0FBRzlFLEdBQUcsQ0FBQ3VGLGtCQUFrQixFQUFFLENBQUE7RUFDN0MsU0FBQyxDQUFDLENBQUE7U0FDSCxDQUFBO0VBRUQsTUFBQSxPQUFPa0IsVUFBVSxDQUFBO0VBQ25CLEtBQUMsQ0FBQyxDQUFBO0VBRUY3WCxJQUFBQSxFQUFFLENBQUNULE1BQU0sQ0FBQyxxQkFBcUIsRUFBQyxDQUM5QixRQUFRLEVBQ1IsU0FBUyxDQUNWLEVBQUUsVUFBVVQsQ0FBQyxFQUFFaUIsT0FBTyxFQUFFO1FBQ3ZCLFNBQVNrWSxXQUFXQSxDQUFFQyxJQUFJLEVBQUU7RUFDMUIsUUFBQSxJQUFJLENBQUNBLElBQUksR0FBR0EsSUFBSSxJQUFJLEVBQUUsQ0FBQTtFQUN4QixPQUFBO0VBRUFELE1BQUFBLFdBQVcsQ0FBQ25YLFNBQVMsQ0FBQ3FYLEdBQUcsR0FBRyxZQUFZO1VBQ3RDLE9BQU8sSUFBSSxDQUFDRCxJQUFJLENBQUE7U0FDakIsQ0FBQTtFQUVERCxNQUFBQSxXQUFXLENBQUNuWCxTQUFTLENBQUM4SyxHQUFHLEdBQUcsVUFBVXpGLEdBQUcsRUFBRTtFQUN6QyxRQUFBLE9BQU8sSUFBSSxDQUFDK1IsSUFBSSxDQUFDL1IsR0FBRyxDQUFDLENBQUE7U0FDdEIsQ0FBQTtFQUVEOFIsTUFBQUEsV0FBVyxDQUFDblgsU0FBUyxDQUFDc1gsTUFBTSxHQUFHLFVBQVVDLFdBQVcsRUFBRTtFQUNwRCxRQUFBLElBQUksQ0FBQ0gsSUFBSSxHQUFHcFosQ0FBQyxDQUFDc1osTUFBTSxDQUFDLEVBQUUsRUFBRUMsV0FBVyxDQUFDRixHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUNELElBQUksQ0FBQyxDQUFBO1NBQ3ZELENBQUE7O0VBRUQ7O0VBRUFELE1BQUFBLFdBQVcsQ0FBQ0ssTUFBTSxHQUFHLEVBQUUsQ0FBQTtFQUV2QkwsTUFBQUEsV0FBVyxDQUFDTSxRQUFRLEdBQUcsVUFBVUMsSUFBSSxFQUFFO0VBQ3JDLFFBQUEsSUFBSSxFQUFFQSxJQUFJLElBQUlQLFdBQVcsQ0FBQ0ssTUFBTSxDQUFDLEVBQUU7RUFDakMsVUFBQSxJQUFJRyxZQUFZLEdBQUcxWSxPQUFPLENBQUN5WSxJQUFJLENBQUMsQ0FBQTtFQUVoQ1AsVUFBQUEsV0FBVyxDQUFDSyxNQUFNLENBQUNFLElBQUksQ0FBQyxHQUFHQyxZQUFZLENBQUE7RUFDekMsU0FBQTtVQUVBLE9BQU8sSUFBSVIsV0FBVyxDQUFDQSxXQUFXLENBQUNLLE1BQU0sQ0FBQ0UsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUNqRCxDQUFBO0VBRUQsTUFBQSxPQUFPUCxXQUFXLENBQUE7RUFDcEIsS0FBQyxDQUFDLENBQUE7RUFFRmpZLElBQUFBLEVBQUUsQ0FBQ1QsTUFBTSxDQUFDLG9CQUFvQixFQUFDLEVBRTlCLEVBQUUsWUFBWTtFQUNiLE1BQUEsSUFBSW1aLFVBQVUsR0FBRztFQUNmLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxJQUFJO0VBQ2QsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZCxRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxHQUFHO0VBQ2IsUUFBQSxRQUFRLEVBQUUsR0FBRztFQUNiLFFBQUEsUUFBUSxFQUFFLEdBQUc7RUFDYixRQUFBLFFBQVEsRUFBRSxRQUFRO0VBQ2xCLFFBQUEsUUFBUSxFQUFFLFFBQVE7RUFDbEIsUUFBQSxRQUFR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