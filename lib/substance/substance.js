(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.substance = global.substance || {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

function interopDefault(ex) {
	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var isObject = createCommonjsModule(function (module) {
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;
});

var isObject$1 = interopDefault(isObject);


var require$$2 = Object.freeze({
	default: isObject$1
});

var isFunction = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$2);

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;
});

var isFunction$1 = interopDefault(isFunction);


var require$$2$1 = Object.freeze({
	default: isFunction$1
});

/**
 * Helpers for oo programming.
 *
 * @module
 */
var oo = {};

/**
  Initialize a class.

  An initialized class has an `extend` function which can be used to derive subclasses.

  @param {Constructor} clazz

  @example

  ```
  function MyClass() {
    ...
  }
  oo.initClass(MyClass);
  ```

  #### Extending a class

  The preferred way is to extend a subclass this way:

  ```
  function Foo() {
    Foo.super.apply(this, arguments);
  }
  MyClass.extend(Foo);
  ```

  In ES6 this would be equivalent too

  ```
  class Foo extends MyClass {}
  ```
  #### Mix-ins

  Mixins must be plain objects. They get merged into the created prototype.

  ```
  var MyMixin = {
    foo: "foo";
  };
  function Foo() {
    Foo.super.apply(this, arguments);
  }
  MyClass.extend(Foo, MyMixin);
  ```

  Mixins never override existing prototype functions, or already other mixed in members.

*/
oo.initClass = function(clazz) {
  _initClass(clazz);
  _makeExtensible(clazz);
};

/**
 * Inherit from a parent class.
 *
 * @param {Constructor} clazz class constructor
 * @param {Constructor} parentClazz parent constructor
 *
 * @example
 *
 * ```js
 * import oo from 'substance/basics/oo'
 * var Parent = function() {};
 * Parent.Prototype = function() {
 *   this.foo = function() { return 'foo'; }
 * }
 * var Child = function() {
 *   Parent.apply(this, arguments);
 * }
 * oo.inherit(Child, Parent);
 * ```
 */
oo.inherit = function(clazz, parentClazz) {
  if (!clazz.__is_initialized__) {
    oo.initClass(clazz);
  }
  _inherit(clazz, parentClazz);
  _afterClassInitHook(clazz);
};

oo.inherits = oo.inherit;

/*
 * @param clazz {Constructor} class constructor
 * @param mixinClazz {Constructor} parent constructor
 */
oo.mixin = function(Clazz, mixin) {
  if (!Clazz.__is_initialized__) {
    oo.initClass(Clazz);
  }
  _mixin(Clazz, mixin);
};

// ### Internal implementations

function _initClass(clazz) {
  if (clazz.__is_initialized__) return;
  if (clazz.Prototype && !(clazz.prototype instanceof clazz.Prototype)) {
    clazz.prototype = new clazz.Prototype();
    clazz.prototype.constructor = clazz;
  }
  // legacy: formerly we had a static scope on each
  // class which has been removed
  // Now, static properties are copied, as they were final static
  Object.defineProperties(clazz.prototype, {
    'static': {
      enumerable: false,
      configurable: true,
      get: function() { return clazz; }
    }
  });
  _makeExtensible(clazz);
  clazz.__is_initialized__ = true;
}

function _inherit(ChildClass, ParentClass) {
  if (ChildClass.prototype instanceof ParentClass) {
    throw new Error('Target already inherits from origin');
  }
  // Customization: supporting a prototype constructor function
  // defined as a static member 'Prototype' of the target function.
  var PrototypeCtor = ChildClass.Prototype;
  // Provide a shortcut to the parent constructor
  ChildClass.super = ParentClass;
  if (PrototypeCtor) {
    PrototypeCtor.prototype = Object.create(ParentClass.prototype, {
      // Restore constructor property of clazz
      constructor: {
        value: PrototypeCtor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    ChildClass.prototype = new PrototypeCtor();
    ChildClass.prototype.constructor = ChildClass;
  } else {
    ChildClass.prototype = Object.create(ParentClass.prototype, {
      // Restore constructor property of clazz
      constructor: {
        value: ChildClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }
  // provide a shortcut to the parent class
  // ChildClass.prototype.super = ParentClass;
  // Extend static properties - always initialize both sides
  _copyStaticProperties(ChildClass, ParentClass);
  _makeExtensible(ChildClass);
  ChildClass.__is_initialized__ = true;
}

function _copyStaticProperties(ChildClass, ParentClass) {
  // console.log('_copyStaticProperties', ChildClass, ParentClass);
  for (var prop in ParentClass) {
    if (!ParentClass.hasOwnProperty(prop)) continue;
    if (prop === 'Prototype' ||
        prop === 'super' ||
        prop === 'extend' ||
        prop === 'name' ||
        prop === '__is_initialized__') continue;
    // console.log('.. copying property "%s"', prop);
    ChildClass[prop] = ParentClass[prop];
  }
}

function _afterClassInitHook() {
  // obsolete
}

/*
  extend() -> lazy inheritance without a proto
  extend({...}) -> lazy inheritance with a proto
  extend(Function) -> inheritance without a proto
  extend(Function, {}) -> inherit with a proto
  extend(Function, Function) -> inheritance with prototype function
*/
function _extendClass() {
  var ParentClass = this; // eslint-disable-line
  // this ctor is used when extend is not provided with a constructor function.
  function AnonymousClass() {
    ParentClass.apply(this, arguments);
    if (this.initialize) {
      this.initialize();
    }
  }
  var args = arguments;
  //var childOrProto = args[args.length-1];
  var ChildClass;
  var mixins = [];
  // the first argument must be a Class constructor, otherwise we will use an anonymous ctor.
  var idx = 0;
  if (isFunction$1(args[0])) {
    ChildClass = args[0];
    idx++;
  } else {
    ChildClass = AnonymousClass;
  }
  // the remaining arguments should be Objects used as a mixin for the created prototype
  // the last argument may be a prototype constructor function.
  for (; idx < args.length; idx++) {
    if (isFunction$1(args[idx])) {
      if (idx !== args.length-1) {
        throw new Error('Illegal use of Class.extend(): Prototype function must be last argument.');
      }
      if (ChildClass.hasOwnProperty('Prototype')) {
        throw new Error('Class ' + ChildClass.name + ' has defined ' + ChildClass.name +
         '.Prototype which would be overwritten by Class.extend().\n' +
         'You provided a prototype function when calling Class.extend().');
      } else {
        ChildClass.Prototype = args[idx];
      }
      break;
    } else if (isObject$1(args[idx])) {
      mixins.push(args[idx]);
    } else {
      throw new Error('Illegal use of Class.extend');
    }
  }
  _inherit(ChildClass, ParentClass);

  // from right to left copy all mixins into the prototype
  // but never overwrite
  // like with lodash/extend, the mixin later in the args list 'wins'
  for (var i = mixins.length - 1; i >= 0; i--) {
    _mixin(ChildClass, mixins[i]);
  }

  return ChildClass;
}

function _mixin(Clazz, mixin) {
  var proto = Clazz.prototype;
  for(var key in mixin) {
    if (mixin.hasOwnProperty(key)) {
      if (!proto.hasOwnProperty(key)) {
        proto[key] = mixin[key];
      }
    }
  }
}

function _createExtend(clazz) {
  return function() {
    return _extendClass.apply(clazz, arguments);
  };
}

function _makeExtensible(clazz) {
  // console.log('Adding extend to ', clazz);
  clazz.extend = _createExtend(clazz);
}

oo.makeExtensible = _makeExtensible;

/**
  Custom error object for all Substance related errors

  @example

  ```js
  import Err from 'substance/util/SubstanceError'
  throw new Err('Document.SelectionUpdateError', {message: 'Could not update selection.'});
  ```

  For better inspection allows you to pass a cause (the error that caused the error).
  That way we can attach context information on each level and we can also ensure
  security, by not passing the cause-chain to the client.

  Resources:
    http://www.bennadel.com/blog/2828-creating-custom-error-objects-in-node-js-with-error-capturestacktrace.htm
    https://gist.github.com/justmoon/15511f92e5216fa2624b
    https://github.com/davepacheco/node-verror/blob/master/lib/verror.js
*/
function SubstanceError(name, options) {
  this.name = name;
  this.message = options.message;
  this.info = options.info;
  this.errorCode = options.errorCode;
  this.cause = options.cause;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, (SubstanceError));
  }
}

SubstanceError.Prototype = function() {
  this.inspect = function() {
    var parts = [];

    // This gives us a full node.js error including error name + message + stack trace
    parts.push(this.stack);

    // We just print additional info here
    if (this.info) {
      parts.push(this.info + '. ');
    }

    // We also print the cause in the same way
    if (this.cause) {
      parts.push('\nCaused by: ');

      if (this.cause.inspect) {
        // If cause is again a Substance error
        parts.push(this.cause.inspect());
      } else {
        // If not we just use Error.toString
        parts.push(this.cause.toString());
      }
    }
    return parts.join('');
  };
};

oo.initClass(Error);

Error.extend(SubstanceError);

SubstanceError.fromJSON = function(err) {
  if (!err) return null;
  var error = new SubstanceError(err.name, {
    message: err.message,
    info: err.info,
    errorCode: err.errorCode,
    cause: SubstanceError.fromJSON(err.cause)
  });
  return error;
};

/*
  Implements Substance ChangeStore API. This is just a dumb store.
  No integrity checks are made, as this is the task of DocumentEngine
*/
function ChangeStore(config) {
  this.config = config;
}

ChangeStore.Prototype = function() {

  /*
    Gets changes for a given document

    @param {String} args.documentId document id
    @param {Number} args.sinceVersion since which change
  */
  this.getChanges = function(args, cb) {
    var changes = this._getChanges(args.documentId);

    // sinceVersion is optional
    if (!args.sinceVersion) {
      args.sinceVersion = 0;
    }

    if(args.sinceVersion < 0) {
      return cb(new SubstanceError('ChangeStore.ReadError', {
        message: 'Illegal argument "sinceVersion":' +args.sinceVersion
      }));
    }

    if(args.toVersion < 0) {
      return cb(new SubstanceError('ChangeStore.ReadError', {
        message: 'Illegal argument "toVersion":' +args.toVersion
      }));
    }

    if(args.sinceVersion >= args.toVersion) {
      return cb(new SubstanceError('ChangeStore.ReadError', {
        message: 'Illegal version arguments "sinceVersion":' +args.sinceVersion+ ', toVersion":' +args.toVersion
      }));
    }

    var version = this._getVersion(args.documentId);

    var res;

    if (args.sinceVersion === 0) {
      res = {
        version: version,
        changes: changes.slice(0, args.toVersion)
      };
      cb(null, res);
    } else if (args.sinceVersion > 0) {
      res = {
        version: version,
        changes: changes.slice(args.sinceVersion, args.toVersion)
      };
      cb(null, res);
    }
  };

  /*
    Add a change object to the database
  */
  this.addChange = function(args, cb) {
    if (!args.documentId) {
      return cb(new SubstanceError('ChangeStore.CreateError', {
        message: 'No documentId provided'
      }));
    }

    if (!args.change) {
      return cb(new SubstanceError('ChangeStore.CreateError', {
        message: 'No change provided'
      }));
    }

    this._addChange(args.documentId, args.change);
    var newVersion = this._getVersion(args.documentId);
    cb(null, newVersion);
  };

  /*
    Delete changes for a given documentId
  */
  this.deleteChanges = function(documentId, cb) {
    var deletedChanges = this._deleteChanges(documentId);
    cb(null, deletedChanges.length);
  };

  /*
    Gets the version number for a document
  */
  this.getVersion = function(id, cb) {
    cb(null, this._getVersion(id));
  };

  /*
    Seeds the database with given changes
  */
  this.seed = function(changes, cb) {
    this._changes = changes;
    if (cb) { cb(null); }
    return this;
  };

  // Handy synchronous helpers
  // -------------------------

  this._deleteChanges = function(documentId) {
    var changes = this._getChanges(documentId);
    delete this._changes[documentId];
    return changes;
  };

  this._getVersion = function(documentId) {
    var changes = this._changes[documentId];
    return changes ? changes.length : 0;
  };

  this._getChanges = function(documentId) {
    return this._changes[documentId] || [];
  };

  this._addChange = function(documentId, change) {
    if (!this._changes[documentId]) {
      this._changes[documentId] = [];
    }
    this._changes[documentId].push(change);
  };
};

oo.initClass(ChangeStore);

var _arrayEach = createCommonjsModule(function (module) {
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;
});

var _arrayEach$1 = interopDefault(_arrayEach);


var require$$15 = Object.freeze({
	default: _arrayEach$1
});

var _createBaseFor = createCommonjsModule(function (module) {
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;
});

var _createBaseFor$1 = interopDefault(_createBaseFor);


var require$$0$2 = Object.freeze({
	default: _createBaseFor$1
});

var _baseFor = createCommonjsModule(function (module) {
var createBaseFor = interopDefault(require$$0$2);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;
});

var _baseFor$1 = interopDefault(_baseFor);


var require$$1$1 = Object.freeze({
	default: _baseFor$1
});

var _getPrototype = createCommonjsModule(function (module) {
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf;

/**
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
function getPrototype(value) {
  return nativeGetPrototype(Object(value));
}

module.exports = getPrototype;
});

var _getPrototype$1 = interopDefault(_getPrototype);


var require$$1$2 = Object.freeze({
	default: _getPrototype$1
});

var _baseHas = createCommonjsModule(function (module) {
var getPrototype = interopDefault(require$$1$2);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return object != null &&
    (hasOwnProperty.call(object, key) ||
      (typeof object == 'object' && key in object && getPrototype(object) === null));
}

module.exports = baseHas;
});

var _baseHas$1 = interopDefault(_baseHas);


var require$$5 = Object.freeze({
	default: _baseHas$1
});

var _baseKeys = createCommonjsModule(function (module) {
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

module.exports = baseKeys;
});

var _baseKeys$1 = interopDefault(_baseKeys);


var require$$4 = Object.freeze({
	default: _baseKeys$1
});

var _baseTimes = createCommonjsModule(function (module) {
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;
});

var _baseTimes$1 = interopDefault(_baseTimes);


var require$$4$1 = Object.freeze({
	default: _baseTimes$1
});

var _baseProperty = createCommonjsModule(function (module) {
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;
});

var _baseProperty$1 = interopDefault(_baseProperty);


var require$$3$1 = Object.freeze({
	default: _baseProperty$1
});

var _getLength = createCommonjsModule(function (module) {
var baseProperty = interopDefault(require$$3$1);

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a
 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
 * Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;
});

var _getLength$1 = interopDefault(_getLength);


var require$$2$3 = Object.freeze({
	default: _getLength$1
});

var isLength = createCommonjsModule(function (module) {
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;
});

var isLength$1 = interopDefault(isLength);


var require$$2$4 = Object.freeze({
	default: isLength$1
});

var isArrayLike = createCommonjsModule(function (module) {
var getLength = interopDefault(require$$2$3),
    isFunction = interopDefault(require$$2$1),
    isLength = interopDefault(require$$2$4);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

module.exports = isArrayLike;
});

var isArrayLike$1 = interopDefault(isArrayLike);


var require$$3 = Object.freeze({
	default: isArrayLike$1
});

var isObjectLike = createCommonjsModule(function (module) {
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;
});

var isObjectLike$1 = interopDefault(isObjectLike);


var require$$0$4 = Object.freeze({
	default: isObjectLike$1
});

var isArrayLikeObject = createCommonjsModule(function (module) {
var isArrayLike = interopDefault(require$$3),
    isObjectLike = interopDefault(require$$0$4);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;
});

var isArrayLikeObject$1 = interopDefault(isArrayLikeObject);


var require$$1$4 = Object.freeze({
	default: isArrayLikeObject$1
});

var isArguments = createCommonjsModule(function (module) {
var isArrayLikeObject = interopDefault(require$$1$4);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;
});

var isArguments$1 = interopDefault(isArguments);


var require$$1$3 = Object.freeze({
	default: isArguments$1
});

var isArray = createCommonjsModule(function (module) {
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;
});

var isArray$1 = interopDefault(isArray);


var require$$0$5 = Object.freeze({
	default: isArray$1
});

var isString = createCommonjsModule(function (module) {
var isArray = interopDefault(require$$0$5),
    isObjectLike = interopDefault(require$$0$4);

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;
});

var isString$1 = interopDefault(isString);


var require$$2$5 = Object.freeze({
	default: isString$1
});

var _indexKeys = createCommonjsModule(function (module) {
var baseTimes = interopDefault(require$$4$1),
    isArguments = interopDefault(require$$1$3),
    isArray = interopDefault(require$$0$5),
    isLength = interopDefault(require$$2$4),
    isString = interopDefault(require$$2$5);

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

module.exports = indexKeys;
});

var _indexKeys$1 = interopDefault(_indexKeys);


var require$$2$2 = Object.freeze({
	default: _indexKeys$1
});

var _isIndex = createCommonjsModule(function (module) {
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;
});

var _isIndex$1 = interopDefault(_isIndex);


var require$$3$2 = Object.freeze({
	default: _isIndex$1
});

var _isPrototype = createCommonjsModule(function (module) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;
});

var _isPrototype$1 = interopDefault(_isPrototype);


var require$$0$6 = Object.freeze({
	default: _isPrototype$1
});

var keys = createCommonjsModule(function (module) {
var baseHas = interopDefault(require$$5),
    baseKeys = interopDefault(require$$4),
    indexKeys = interopDefault(require$$2$2),
    isArrayLike = interopDefault(require$$3),
    isIndex = interopDefault(require$$3$2),
    isPrototype = interopDefault(require$$0$6);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;
});

var keys$1 = interopDefault(keys);


var require$$0$3 = Object.freeze({
	default: keys$1
});

var _baseForOwn = createCommonjsModule(function (module) {
var baseFor = interopDefault(require$$1$1),
    keys = interopDefault(require$$0$3);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;
});

var _baseForOwn$1 = interopDefault(_baseForOwn);


var require$$1 = Object.freeze({
	default: _baseForOwn$1
});

var _createBaseEach = createCommonjsModule(function (module) {
var isArrayLike = interopDefault(require$$3);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;
});

var _createBaseEach$1 = interopDefault(_createBaseEach);


var require$$0$7 = Object.freeze({
	default: _createBaseEach$1
});

var _baseEach = createCommonjsModule(function (module) {
var baseForOwn = interopDefault(require$$1),
    createBaseEach = interopDefault(require$$0$7);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;
});

var _baseEach$1 = interopDefault(_baseEach);


var require$$0$1 = Object.freeze({
	default: _baseEach$1
});

var _listCacheClear = createCommonjsModule(function (module) {
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

module.exports = listCacheClear;
});

var _listCacheClear$1 = interopDefault(_listCacheClear);


var require$$4$3 = Object.freeze({
	default: _listCacheClear$1
});

var eq = createCommonjsModule(function (module) {
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;
});

var eq$1 = interopDefault(eq);


var require$$3$4 = Object.freeze({
	default: eq$1
});

var _assocIndexOf = createCommonjsModule(function (module) {
var eq = interopDefault(require$$3$4);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;
});

var _assocIndexOf$1 = interopDefault(_assocIndexOf);


var require$$0$8 = Object.freeze({
	default: _assocIndexOf$1
});

var _listCacheDelete = createCommonjsModule(function (module) {
var assocIndexOf = interopDefault(require$$0$8);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

module.exports = listCacheDelete;
});

var _listCacheDelete$1 = interopDefault(_listCacheDelete);


var require$$3$3 = Object.freeze({
	default: _listCacheDelete$1
});

var _listCacheGet = createCommonjsModule(function (module) {
var assocIndexOf = interopDefault(require$$0$8);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;
});

var _listCacheGet$1 = interopDefault(_listCacheGet);


var require$$2$7 = Object.freeze({
	default: _listCacheGet$1
});

var _listCacheHas = createCommonjsModule(function (module) {
var assocIndexOf = interopDefault(require$$0$8);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;
});

var _listCacheHas$1 = interopDefault(_listCacheHas);


var require$$1$7 = Object.freeze({
	default: _listCacheHas$1
});

var _listCacheSet = createCommonjsModule(function (module) {
var assocIndexOf = interopDefault(require$$0$8);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;
});

var _listCacheSet$1 = interopDefault(_listCacheSet);


var require$$0$9 = Object.freeze({
	default: _listCacheSet$1
});

var _ListCache = createCommonjsModule(function (module) {
var listCacheClear = interopDefault(require$$4$3),
    listCacheDelete = interopDefault(require$$3$3),
    listCacheGet = interopDefault(require$$2$7),
    listCacheHas = interopDefault(require$$1$7),
    listCacheSet = interopDefault(require$$0$9);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;
});

var _ListCache$1 = interopDefault(_ListCache);


var require$$1$6 = Object.freeze({
	default: _ListCache$1
});

var _stackClear = createCommonjsModule(function (module) {
var ListCache = interopDefault(require$$1$6);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

module.exports = stackClear;
});

var _stackClear$1 = interopDefault(_stackClear);


var require$$4$4 = Object.freeze({
	default: _stackClear$1
});

var _stackDelete = createCommonjsModule(function (module) {
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

module.exports = stackDelete;
});

var _stackDelete$1 = interopDefault(_stackDelete);


var require$$3$5 = Object.freeze({
	default: _stackDelete$1
});

var _stackGet = createCommonjsModule(function (module) {
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;
});

var _stackGet$1 = interopDefault(_stackGet);


var require$$2$8 = Object.freeze({
	default: _stackGet$1
});

var _stackHas = createCommonjsModule(function (module) {
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;
});

var _stackHas$1 = interopDefault(_stackHas);


var require$$1$8 = Object.freeze({
	default: _stackHas$1
});

var _isHostObject = createCommonjsModule(function (module) {
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;
});

var _isHostObject$1 = interopDefault(_isHostObject);


var require$$1$11 = Object.freeze({
	default: _isHostObject$1
});

var _checkGlobal = createCommonjsModule(function (module) {
/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = checkGlobal;
});

var _checkGlobal$1 = interopDefault(_checkGlobal);


var require$$0$14 = Object.freeze({
	default: _checkGlobal$1
});

var _root = createCommonjsModule(function (module) {
var checkGlobal = interopDefault(require$$0$14);

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(typeof commonjsGlobal == 'object' && commonjsGlobal);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(typeof self == 'object' && self);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(typeof commonjsGlobal == 'object' && commonjsGlobal);

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

module.exports = root;
});

var _root$1 = interopDefault(_root);


var require$$1$12 = Object.freeze({
	default: _root$1
});

var _coreJsData = createCommonjsModule(function (module) {
var root = interopDefault(require$$1$12);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;
});

var _coreJsData$1 = interopDefault(_coreJsData);


var require$$0$13 = Object.freeze({
	default: _coreJsData$1
});

var _isMasked = createCommonjsModule(function (module) {
var coreJsData = interopDefault(require$$0$13);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;
});

var _isMasked$1 = interopDefault(_isMasked);


var require$$2$10 = Object.freeze({
	default: _isMasked$1
});

var _toSource = createCommonjsModule(function (module) {
/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;
});

var _toSource$1 = interopDefault(_toSource);


var require$$0$15 = Object.freeze({
	default: _toSource$1
});

var _baseIsNative = createCommonjsModule(function (module) {
var isFunction = interopDefault(require$$2$1),
    isHostObject = interopDefault(require$$1$11),
    isMasked = interopDefault(require$$2$10),
    isObject = interopDefault(require$$2),
    toSource = interopDefault(require$$0$15);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;
});

var _baseIsNative$1 = interopDefault(_baseIsNative);


var require$$1$10 = Object.freeze({
	default: _baseIsNative$1
});

var _getValue = createCommonjsModule(function (module) {
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;
});

var _getValue$1 = interopDefault(_getValue);


var require$$0$16 = Object.freeze({
	default: _getValue$1
});

var _getNative = createCommonjsModule(function (module) {
var baseIsNative = interopDefault(require$$1$10),
    getValue = interopDefault(require$$0$16);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;
});

var _getNative$1 = interopDefault(_getNative);


var require$$1$9 = Object.freeze({
	default: _getNative$1
});

var _nativeCreate = createCommonjsModule(function (module) {
var getNative = interopDefault(require$$1$9);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;
});

var _nativeCreate$1 = interopDefault(_nativeCreate);


var require$$0$12 = Object.freeze({
	default: _nativeCreate$1
});

var _hashClear = createCommonjsModule(function (module) {
var nativeCreate = interopDefault(require$$0$12);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

module.exports = hashClear;
});

var _hashClear$1 = interopDefault(_hashClear);


var require$$4$6 = Object.freeze({
	default: _hashClear$1
});

var _hashDelete = createCommonjsModule(function (module) {
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

module.exports = hashDelete;
});

var _hashDelete$1 = interopDefault(_hashDelete);


var require$$3$6 = Object.freeze({
	default: _hashDelete$1
});

var _hashGet = createCommonjsModule(function (module) {
var nativeCreate = interopDefault(require$$0$12);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;
});

var _hashGet$1 = interopDefault(_hashGet);


var require$$2$11 = Object.freeze({
	default: _hashGet$1
});

var _hashHas = createCommonjsModule(function (module) {
var nativeCreate = interopDefault(require$$0$12);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;
});

var _hashHas$1 = interopDefault(_hashHas);


var require$$1$13 = Object.freeze({
	default: _hashHas$1
});

var _hashSet = createCommonjsModule(function (module) {
var nativeCreate = interopDefault(require$$0$12);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;
});

var _hashSet$1 = interopDefault(_hashSet);


var require$$0$17 = Object.freeze({
	default: _hashSet$1
});

var _Hash = createCommonjsModule(function (module) {
var hashClear = interopDefault(require$$4$6),
    hashDelete = interopDefault(require$$3$6),
    hashGet = interopDefault(require$$2$11),
    hashHas = interopDefault(require$$1$13),
    hashSet = interopDefault(require$$0$17);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;
});

var _Hash$1 = interopDefault(_Hash);


var require$$2$9 = Object.freeze({
	default: _Hash$1
});

var _Map = createCommonjsModule(function (module) {
var getNative = interopDefault(require$$1$9),
    root = interopDefault(require$$1$12);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;
});

var _Map$1 = interopDefault(_Map);


var require$$4$7 = Object.freeze({
	default: _Map$1
});

var _mapCacheClear = createCommonjsModule(function (module) {
var Hash = interopDefault(require$$2$9),
    ListCache = interopDefault(require$$1$6),
    Map = interopDefault(require$$4$7);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;
});

var _mapCacheClear$1 = interopDefault(_mapCacheClear);


var require$$4$5 = Object.freeze({
	default: _mapCacheClear$1
});

var _isKeyable = createCommonjsModule(function (module) {
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;
});

var _isKeyable$1 = interopDefault(_isKeyable);


var require$$0$19 = Object.freeze({
	default: _isKeyable$1
});

var _getMapData = createCommonjsModule(function (module) {
var isKeyable = interopDefault(require$$0$19);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;
});

var _getMapData$1 = interopDefault(_getMapData);


var require$$0$18 = Object.freeze({
	default: _getMapData$1
});

var _mapCacheDelete = createCommonjsModule(function (module) {
var getMapData = interopDefault(require$$0$18);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

module.exports = mapCacheDelete;
});

var _mapCacheDelete$1 = interopDefault(_mapCacheDelete);


var require$$3$7 = Object.freeze({
	default: _mapCacheDelete$1
});

var _mapCacheGet = createCommonjsModule(function (module) {
var getMapData = interopDefault(require$$0$18);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;
});

var _mapCacheGet$1 = interopDefault(_mapCacheGet);


var require$$2$12 = Object.freeze({
	default: _mapCacheGet$1
});

var _mapCacheHas = createCommonjsModule(function (module) {
var getMapData = interopDefault(require$$0$18);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;
});

var _mapCacheHas$1 = interopDefault(_mapCacheHas);


var require$$1$14 = Object.freeze({
	default: _mapCacheHas$1
});

var _mapCacheSet = createCommonjsModule(function (module) {
var getMapData = interopDefault(require$$0$18);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

module.exports = mapCacheSet;
});

var _mapCacheSet$1 = interopDefault(_mapCacheSet);


var require$$0$20 = Object.freeze({
	default: _mapCacheSet$1
});

var _MapCache = createCommonjsModule(function (module) {
var mapCacheClear = interopDefault(require$$4$5),
    mapCacheDelete = interopDefault(require$$3$7),
    mapCacheGet = interopDefault(require$$2$12),
    mapCacheHas = interopDefault(require$$1$14),
    mapCacheSet = interopDefault(require$$0$20);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;
});

var _MapCache$1 = interopDefault(_MapCache);


var require$$0$11 = Object.freeze({
	default: _MapCache$1
});

var _stackSet = createCommonjsModule(function (module) {
var ListCache = interopDefault(require$$1$6),
    MapCache = interopDefault(require$$0$11);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
    cache = this.__data__ = new MapCache(cache.__data__);
  }
  cache.set(key, value);
  return this;
}

module.exports = stackSet;
});

var _stackSet$1 = interopDefault(_stackSet);


var require$$0$10 = Object.freeze({
	default: _stackSet$1
});

var _Stack = createCommonjsModule(function (module) {
var ListCache = interopDefault(require$$1$6),
    stackClear = interopDefault(require$$4$4),
    stackDelete = interopDefault(require$$3$5),
    stackGet = interopDefault(require$$2$8),
    stackHas = interopDefault(require$$1$8),
    stackSet = interopDefault(require$$0$10);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;
});

var _Stack$1 = interopDefault(_Stack);


var require$$16 = Object.freeze({
	default: _Stack$1
});

var _setCacheAdd = createCommonjsModule(function (module) {
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;
});

var _setCacheAdd$1 = interopDefault(_setCacheAdd);


var require$$1$15 = Object.freeze({
	default: _setCacheAdd$1
});

var _setCacheHas = createCommonjsModule(function (module) {
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;
});

var _setCacheHas$1 = interopDefault(_setCacheHas);


var require$$0$22 = Object.freeze({
	default: _setCacheHas$1
});

var _SetCache = createCommonjsModule(function (module) {
var MapCache = interopDefault(require$$0$11),
    setCacheAdd = interopDefault(require$$1$15),
    setCacheHas = interopDefault(require$$0$22);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;
});

var _SetCache$1 = interopDefault(_SetCache);


var require$$5$1 = Object.freeze({
	default: _SetCache$1
});

var _arraySome = createCommonjsModule(function (module) {
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;
});

var _arraySome$1 = interopDefault(_arraySome);


var require$$0$23 = Object.freeze({
	default: _arraySome$1
});

var _equalArrays = createCommonjsModule(function (module) {
var SetCache = interopDefault(require$$5$1),
    arraySome = interopDefault(require$$0$23);

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  return result;
}

module.exports = equalArrays;
});

var _equalArrays$1 = interopDefault(_equalArrays);


var require$$2$14 = Object.freeze({
	default: _equalArrays$1
});

var _Symbol = createCommonjsModule(function (module) {
var root = interopDefault(require$$1$12);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;
});

var _Symbol$1 = interopDefault(_Symbol);


var require$$0$24 = Object.freeze({
	default: _Symbol$1
});

var _Uint8Array = createCommonjsModule(function (module) {
var root = interopDefault(require$$1$12);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;
});

var _Uint8Array$1 = interopDefault(_Uint8Array);


var require$$0$25 = Object.freeze({
	default: _Uint8Array$1
});

var _mapToArray = createCommonjsModule(function (module) {
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;
});

var _mapToArray$1 = interopDefault(_mapToArray);


var require$$0$26 = Object.freeze({
	default: _mapToArray$1
});

var _setToArray = createCommonjsModule(function (module) {
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;
});

var _setToArray$1 = interopDefault(_setToArray);


var require$$0$27 = Object.freeze({
	default: _setToArray$1
});

var _equalByTag = createCommonjsModule(function (module) {
var Symbol = interopDefault(require$$0$24),
    Uint8Array = interopDefault(require$$0$25),
    equalArrays = interopDefault(require$$2$14),
    mapToArray = interopDefault(require$$0$26),
    setToArray = interopDefault(require$$0$27);

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and
      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
      // not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object) ? other != +other : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;
      stack.set(object, other);

      // Recursively compare objects (susceptible to call stack limits).
      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;
});

var _equalByTag$1 = interopDefault(_equalByTag);


var require$$5$2 = Object.freeze({
	default: _equalByTag$1
});

var _equalObjects = createCommonjsModule(function (module) {
var baseHas = interopDefault(require$$5),
    keys = interopDefault(require$$0$3);

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : baseHas(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  return result;
}

module.exports = equalObjects;
});

var _equalObjects$1 = interopDefault(_equalObjects);


var require$$4$8 = Object.freeze({
	default: _equalObjects$1
});

var _DataView = createCommonjsModule(function (module) {
var getNative = interopDefault(require$$1$9),
    root = interopDefault(require$$1$12);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;
});

var _DataView$1 = interopDefault(_DataView);


var require$$5$3 = Object.freeze({
	default: _DataView$1
});

var _Promise = createCommonjsModule(function (module) {
var getNative = interopDefault(require$$1$9),
    root = interopDefault(require$$1$12);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;
});

var _Promise$1 = interopDefault(_Promise);


var require$$3$8 = Object.freeze({
	default: _Promise$1
});

var _Set = createCommonjsModule(function (module) {
var getNative = interopDefault(require$$1$9),
    root = interopDefault(require$$1$12);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;
});

var _Set$1 = interopDefault(_Set);


var require$$2$15 = Object.freeze({
	default: _Set$1
});

var _WeakMap = createCommonjsModule(function (module) {
var getNative = interopDefault(require$$1$9),
    root = interopDefault(require$$1$12);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;
});

var _WeakMap$1 = interopDefault(_WeakMap);


var require$$1$16 = Object.freeze({
	default: _WeakMap$1
});

var _getTag = createCommonjsModule(function (module) {
var DataView = interopDefault(require$$5$3),
    Map = interopDefault(require$$4$7),
    Promise = interopDefault(require$$3$8),
    Set = interopDefault(require$$2$15),
    WeakMap = interopDefault(require$$1$16),
    toSource = interopDefault(require$$0$15);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  return objectToString.call(value);
}

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;
});

var _getTag$1 = interopDefault(_getTag);


var require$$8 = Object.freeze({
	default: _getTag$1
});

var isTypedArray = createCommonjsModule(function (module) {
var isLength = interopDefault(require$$2$4),
    isObjectLike = interopDefault(require$$0$4);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = isTypedArray;
});

var isTypedArray$1 = interopDefault(isTypedArray);


var require$$0$28 = Object.freeze({
	default: isTypedArray$1
});

var _baseIsEqualDeep = createCommonjsModule(function (module) {
var Stack = interopDefault(require$$16),
    equalArrays = interopDefault(require$$2$14),
    equalByTag = interopDefault(require$$5$2),
    equalObjects = interopDefault(require$$4$8),
    getTag = interopDefault(require$$8),
    isArray = interopDefault(require$$0$5),
    isHostObject = interopDefault(require$$1$11),
    isTypedArray = interopDefault(require$$0$28);

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

module.exports = baseIsEqualDeep;
});

var _baseIsEqualDeep$1 = interopDefault(_baseIsEqualDeep);


var require$$2$13 = Object.freeze({
	default: _baseIsEqualDeep$1
});

var _baseIsEqual = createCommonjsModule(function (module) {
var baseIsEqualDeep = interopDefault(require$$2$13),
    isObject = interopDefault(require$$2),
    isObjectLike = interopDefault(require$$0$4);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

module.exports = baseIsEqual;
});

var _baseIsEqual$1 = interopDefault(_baseIsEqual);


var require$$0$21 = Object.freeze({
	default: _baseIsEqual$1
});

var _baseIsMatch = createCommonjsModule(function (module) {
var Stack = interopDefault(require$$16),
    baseIsEqual = interopDefault(require$$0$21);

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;
});

var _baseIsMatch$1 = interopDefault(_baseIsMatch);


var require$$1$5 = Object.freeze({
	default: _baseIsMatch$1
});

var _isStrictComparable = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$2);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;
});

var _isStrictComparable$1 = interopDefault(_isStrictComparable);


var require$$2$16 = Object.freeze({
	default: _isStrictComparable$1
});

var _getMatchData = createCommonjsModule(function (module) {
var isStrictComparable = interopDefault(require$$2$16),
    keys = interopDefault(require$$0$3);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;
});

var _getMatchData$1 = interopDefault(_getMatchData);


var require$$0$29 = Object.freeze({
	default: _getMatchData$1
});

var _matchesStrictComparable = createCommonjsModule(function (module) {
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;
});

var _matchesStrictComparable$1 = interopDefault(_matchesStrictComparable);


var require$$1$17 = Object.freeze({
	default: _matchesStrictComparable$1
});

var _baseMatches = createCommonjsModule(function (module) {
var baseIsMatch = interopDefault(require$$1$5),
    getMatchData = interopDefault(require$$0$29),
    matchesStrictComparable = interopDefault(require$$1$17);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;
});

var _baseMatches$1 = interopDefault(_baseMatches);


var require$$4$2 = Object.freeze({
	default: _baseMatches$1
});

var memoize = createCommonjsModule(function (module) {
var MapCache = interopDefault(require$$0$11);

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

module.exports = memoize;
});

var memoize$1 = interopDefault(memoize);


var require$$1$19 = Object.freeze({
	default: memoize$1
});

var isSymbol = createCommonjsModule(function (module) {
var isObjectLike = interopDefault(require$$0$4);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;
});

var isSymbol$1 = interopDefault(isSymbol);


var require$$0$32 = Object.freeze({
	default: isSymbol$1
});

var _baseToString = createCommonjsModule(function (module) {
var Symbol = interopDefault(require$$0$24),
    isSymbol = interopDefault(require$$0$32);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;
});

var _baseToString$1 = interopDefault(_baseToString);


var require$$2$17 = Object.freeze({
	default: _baseToString$1
});

var toString = createCommonjsModule(function (module) {
var baseToString = interopDefault(require$$2$17);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;
});

var toString$1 = interopDefault(toString);


var require$$0$31 = Object.freeze({
	default: toString$1
});

var _stringToPath = createCommonjsModule(function (module) {
var memoize = interopDefault(require$$1$19),
    toString = interopDefault(require$$0$31);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  var result = [];
  toString(string).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;
});

var _stringToPath$1 = interopDefault(_stringToPath);


var require$$0$30 = Object.freeze({
	default: _stringToPath$1
});

var _castPath = createCommonjsModule(function (module) {
var isArray = interopDefault(require$$0$5),
    stringToPath = interopDefault(require$$0$30);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

module.exports = castPath;
});

var _castPath$1 = interopDefault(_castPath);


var require$$4$9 = Object.freeze({
	default: _castPath$1
});

var _isKey = createCommonjsModule(function (module) {
var isArray = interopDefault(require$$0$5),
    isSymbol = interopDefault(require$$0$32);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;
});

var _isKey$1 = interopDefault(_isKey);


var require$$3$10 = Object.freeze({
	default: _isKey$1
});

var _toKey = createCommonjsModule(function (module) {
var isSymbol = interopDefault(require$$0$32);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;
});

var _toKey$1 = interopDefault(_toKey);


var require$$0$33 = Object.freeze({
	default: _toKey$1
});

var _baseGet = createCommonjsModule(function (module) {
var castPath = interopDefault(require$$4$9),
    isKey = interopDefault(require$$3$10),
    toKey = interopDefault(require$$0$33);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;
});

var _baseGet$1 = interopDefault(_baseGet);


var require$$1$18 = Object.freeze({
	default: _baseGet$1
});

var get = createCommonjsModule(function (module) {
var baseGet = interopDefault(require$$1$18);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;
});

var get$1 = interopDefault(get);


var require$$5$4 = Object.freeze({
	default: get$1
});

var _baseHasIn = createCommonjsModule(function (module) {
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;
});

var _baseHasIn$1 = interopDefault(_baseHasIn);


var require$$1$20 = Object.freeze({
	default: _baseHasIn$1
});

var _hasPath = createCommonjsModule(function (module) {
var castPath = interopDefault(require$$4$9),
    isArguments = interopDefault(require$$1$3),
    isArray = interopDefault(require$$0$5),
    isIndex = interopDefault(require$$3$2),
    isKey = interopDefault(require$$3$10),
    isLength = interopDefault(require$$2$4),
    isString = interopDefault(require$$2$5),
    toKey = interopDefault(require$$0$33);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isString(object) || isArguments(object));
}

module.exports = hasPath;
});

var _hasPath$1 = interopDefault(_hasPath);


var require$$0$34 = Object.freeze({
	default: _hasPath$1
});

var hasIn = createCommonjsModule(function (module) {
var baseHasIn = interopDefault(require$$1$20),
    hasPath = interopDefault(require$$0$34);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;
});

var hasIn$1 = interopDefault(hasIn);


var require$$4$10 = Object.freeze({
	default: hasIn$1
});

var _baseMatchesProperty = createCommonjsModule(function (module) {
var baseIsEqual = interopDefault(require$$0$21),
    get = interopDefault(require$$5$4),
    hasIn = interopDefault(require$$4$10),
    isKey = interopDefault(require$$3$10),
    isStrictComparable = interopDefault(require$$2$16),
    matchesStrictComparable = interopDefault(require$$1$17),
    toKey = interopDefault(require$$0$33);

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

module.exports = baseMatchesProperty;
});

var _baseMatchesProperty$1 = interopDefault(_baseMatchesProperty);


var require$$3$9 = Object.freeze({
	default: _baseMatchesProperty$1
});

var identity = createCommonjsModule(function (module) {
/**
 * This method returns the first argument given to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;
});

var identity$1 = interopDefault(identity);


var require$$2$18 = Object.freeze({
	default: identity$1
});

var _basePropertyDeep = createCommonjsModule(function (module) {
var baseGet = interopDefault(require$$1$18);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;
});

var _basePropertyDeep$1 = interopDefault(_basePropertyDeep);


var require$$2$19 = Object.freeze({
	default: _basePropertyDeep$1
});

var property = createCommonjsModule(function (module) {
var baseProperty = interopDefault(require$$3$1),
    basePropertyDeep = interopDefault(require$$2$19),
    isKey = interopDefault(require$$3$10),
    toKey = interopDefault(require$$0$33);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;
});

var property$1 = interopDefault(property);


var require$$0$35 = Object.freeze({
	default: property$1
});

var _baseIteratee = createCommonjsModule(function (module) {
var baseMatches = interopDefault(require$$4$2),
    baseMatchesProperty = interopDefault(require$$3$9),
    identity = interopDefault(require$$2$18),
    isArray = interopDefault(require$$0$5),
    property = interopDefault(require$$0$35);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;
});

var _baseIteratee$1 = interopDefault(_baseIteratee);


var require$$2$6 = Object.freeze({
	default: _baseIteratee$1
});

var forEach = createCommonjsModule(function (module) {
var arrayEach = interopDefault(require$$15),
    baseEach = interopDefault(require$$0$1),
    baseIteratee = interopDefault(require$$2$6),
    isArray = interopDefault(require$$0$5);

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = forEach;
});

var forEach$1 = interopDefault(forEach);


var require$$0 = Object.freeze({
	default: forEach$1
});

/**
  Event support.

  @class
  @private
*/
function EventEmitter() {
  this.__events__ = {};
}

EventEmitter.Prototype = function() {

  /**
   * Emit an event.
   *
   * @param {String} event
   * @param ...arguments
   * @return true if a listener was notified, false otherwise.
   */
  this.emit = function (event) {
    if (event in this.__events__) {
      // console.log("Emitting event %s (%d listeners) on", event, this.__events__[event].length, this);
      // Clone the list of bindings so that handlers can remove or add handlers during the call.
      var bindings = this.__events__[event].slice();
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, len = bindings.length; i < len; i++) {
        var binding = bindings[i];
        // console.log("- triggering %s", binding.context.constructor.type);
        binding.method.apply(binding.context, args);
      }
      return true;
    }
    return false;
  };

  // sort descending as a listener with higher priority should be
  // called earlier
  function byPriorityDescending(a, b) {
    return b.priority - a.priority;
  }

  /**
   * Connect a listener to a set of events.
   *
   * Optionally, a `priority` can be provided to control the order
   * of all bindings. The default priority is 0. All listeners with the
   * same priority remain in order of registration.
   * A lower priority will make the listener be called later, a higher
   * priority earlier.
   *
   * @param {Object} listener
   * @param {Object} hash with event as keys, and handler functions as values.
   * @param {Number} hash with `priority` as ordering hint (default is 0).
   * @chainable
   */
  this.connect = function (obj, methods, options) { // eslint-disable-line no-unused-vars
    console.warn('DEPRECATED: Use EventEmitter.on(event, method, context) instead.');
    return _connect.apply(this, arguments);
  };

  /**
   * Disconnect a listener (all bindings).
   *
   * @method disconnect
   * @param {Object} listener
   * @chainable
   */
  this.disconnect = function(listener) {
    console.warn('DEPRECATED: Use EventEmitter.off(listener) instead.');
    return _disconnect.call(this, listener);
  };

  /**
   * Subscribe a listener to an event.
   *
   * @param {String} event
   * @param {Function} method
   * @param {Object} context
   * @param {Object} options
   */
  this.on = function(event, method, context, options) {
    var priority = 0;
    if (arguments.length === 4) {
      priority = options.priority || priority;
    }
    _on.call(this, event, method, context, priority);
    this.__events__[event].sort(byPriorityDescending);
  };

  /**
   * Unsubscrive a listener from an event.
   *
   * @param {String} event
   * @param {Function} method
   * @param {Object} context
   * @param {Object} options
   */
  this.off = function(event, method, context) { // eslint-disable-line no-unused-vars
    if (arguments.length === 1 && isObject$1(arguments[0])) {
      _disconnect.call(this, arguments[0]);
    } else {
      _off.apply(this, arguments);
    }
  };

  function validateMethod(method, context) {
    // Validate method and context
    if (typeof method === 'string') {
      // Validate method
      if (context === undefined || context === null) {
        throw new Error( 'Method name "' + method + '" has no context.' );
      }
      if (!(method in context)) {
        // Technically the method does not need to exist yet: it could be
        // added before call time. But this probably signals a typo.
        throw new Error( 'Method not found: "' + method + '"' );
      }
      if (typeof context[method] !== 'function') {
        // Technically the property could be replaced by a function before
        // call time. But this probably signals a typo.
        throw new Error( 'Property "' + method + '" is not a function' );
      }
    } else if (typeof method !== 'function') {
      throw new Error( 'Invalid callback. Function or method name expected.' );
    }
  }

  /**
   * Internal implementation for registering a listener.
   *
   * @param {String} event
   * @param {Function} method
   * @param {Object} context
   * @private
   */
  function _on(event, method, context, priority) {
    /* eslint-disable no-invalid-this */
    var bindings;
    validateMethod( method, context );
    if (this.__events__.hasOwnProperty(event)) {
      bindings = this.__events__[event];
    } else {
      // Auto-initialize bindings list
      bindings = this.__events__[event] = [];
    }
    // Add binding
    bindings.push({
      method: method,
      context: context || null,
      priority: priority
    });
    return this;
    /*eslint-enable no-invalid-this */
  }

  /**
   * Remove a listener.
   *
   * @param {String} event
   * @param {Function} method
   * @param {Object} context
   * @private
   */
  function _off(event, method, context) {
    /* eslint-disable no-invalid-this */
    var i, bindings;
    if ( arguments.length === 1 ) {
      // Remove all bindings for event
      delete this.__events__[event];
      return this;
    }
    validateMethod( method, context );
    if ( !( event in this.__events__ ) || !this.__events__[event].length ) {
      // No matching bindings
      return this;
    }
    // Default to null context
    if ( arguments.length < 3 ) {
      context = null;
    }
    // Remove matching handlers
    bindings = this.__events__[event];
    i = bindings.length;
    while ( i-- ) {
      if ( bindings[i].method === method && bindings[i].context === context ) {
        bindings.splice( i, 1 );
      }
    }
    // Cleanup if now empty
    if ( bindings.length === 0 ) {
      delete this.__events__[event];
    }
    return this;
    /* eslint-enable no-invalid-this */
  }

  /**
   * Internal implementation of connect.
   *
   * @private
   */
  function _connect(obj, methods, options) {
    /* eslint-disable no-invalid-this */
    var priority = 0;
    if (arguments.length === 3) {
      priority = options.priority || priority;
    }
    forEach$1(methods, function(method, event) {
      _on.call(this, event, method, obj, priority);
      this.__events__[event].sort(byPriorityDescending);
    }.bind(this));
    return this;
    /* eslint-enable no-invalid-this */
  }

  /**
   * Internal implementation of disconnect.
   *
   * @private
   */
  function _disconnect(context) {
    /* eslint-disable no-invalid-this */
    // Remove all connections to the context
    forEach$1(this.__events__, function(bindings, event) {
      for (var i = bindings.length-1; i>=0; i--) {
        // bindings[i] may have been removed by the previous steps
        // so check it still exists
        if (bindings[i] && bindings[i].context === context) {
          _off.call(this, event, bindings[i].method, context);
        }
      }
    }.bind(this));
    return this;
    /* eslint-enable no-invalid-this */
  }

  this._debugEvents = function() {
    /* eslint-disable no-console */
    console.log('### EventEmitter: ', this);
    forEach$1(this.__events__, function(handlers, name) {
      console.log("- %s listeners for %s: ", handlers.length, name, handlers);
    });
    /* eslint-enable no-console */
  };
};

oo.initClass(EventEmitter);

let __id__ = 0

/**
  ClientConnection abstraction. Uses websockets internally
*/
class ClientConnection extends EventEmitter { 
  constructor(config) {
    super()

    this.__id__ = __id__++
    this.config = config
    this._onMessage = this._onMessage.bind(this)
    this._onConnectionOpen = this._onConnectionOpen.bind(this)
    this._onConnectionClose = this._onConnectionClose.bind(this)

    // Establish websocket connection
    this._connect()
  }

  _createWebSocket() {
    throw SubstanceError('AbstractMethodError')
  }

  /*
    Initializes a new websocket connection
  */
  _connect() {
    this.ws = this._createWebSocket()
    this.ws.addEventListener('open', this._onConnectionOpen)
    this.ws.addEventListener('close', this._onConnectionClose)
    this.ws.addEventListener('message', this._onMessage)
  }

  /*
    Disposes the current websocket connection
  */
  _disconnect() {
    this.ws.removeEventListener('message', this._onMessage)
    this.ws.removeEventListener('open', this._onConnectionOpen)
    this.ws.removeEventListener('close', this._onConnectionClose)
    this.ws = null
  }

  /*
    Emits open event when connection has been established
  */
  _onConnectionOpen() {
    this.emit('open')
  }

  /*
    Trigger reconnect on connection close
  */
  _onConnectionClose() {
    this._disconnect()
    this.emit('close')
    console.info('websocket connection closed. Attempting to reconnect in 5s.')
    setTimeout(function() {
      this._connect()
    }.bind(this), 5000)
  }

  /*
    Delegate incoming websocket messages
  */
  _onMessage(msg) {
    msg = this.deserializeMessage(msg.data)
    this.emit('message', msg)
  }

  /*
    Send message via websocket channel
  */
  send(msg) {
    if (!this.isOpen()) {
      console.warn('Message could not be sent. Connection is not open.', msg)
      return
    }
    this.ws.send(this.serializeMessage(msg))
  }

  /*
    Returns true if websocket connection is open
  */
  isOpen() {
    return this.ws && this.ws.readyState === 1
  }

  serializeMessage(msg) {
    return JSON.stringify(msg)
  }

  deserializeMessage(msg) {
    return JSON.parse(msg)
  }

}

let __id__$1 = 0

/**
  Client for CollabServer API

  Communicates via websocket for real-time operations
*/
class CollabClient extends EventEmitter {
  constructor(config) {
    super()

    this.__id__ = __id__$1++
    this.config = config
    this.connection = config.connection

    // Hard-coded for now
    this.scope = 'substance/collab'

    // Bind handlers
    this._onMessage = this._onMessage.bind(this)
    this._onConnectionOpen = this._onConnectionOpen.bind(this)
    this._onConnectionClose = this._onConnectionClose.bind(this)

    // Connect handlers
    this.connection.on('open', this._onConnectionOpen)
    this.connection.on('close', this._onConnectionClose)
    this.connection.on('message', this._onMessage)
  }

  _onConnectionClose() {
    this.emit('disconnected')
  }

  _onConnectionOpen() {
    this.emit('connected')
  }

  /*
    Delegate incoming messages from the connection
  */
  _onMessage(msg) {
    if (msg.scope === this.scope) {
      this.emit('message', msg)
    } else {
      console.info('Message ignored. Not sent in hub scope', msg)
    }
  }

  /*
    Send message via websocket channel
  */
  send(msg) {
    if (!this.connection.isOpen()) {
      console.warn('Message could not be sent. Connection not open.', msg)
      return
    }

    msg.scope = this.scope;
    if (this.config.enhanceMessage) {
      msg = this.config.enhanceMessage(msg)
    }
    this.connection.send(msg)
  }

  /*
    Returns true if websocket connection is open
  */
  isConnected() {
    return this.connection.isOpen()
  }

  dispose() {
    this.connection.off(this)
  }
}

var _arrayMap = createCommonjsModule(function (module) {
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;
});

var _arrayMap$1 = interopDefault(_arrayMap);


var require$$0$36 = Object.freeze({
	default: _arrayMap$1
});

var _baseMap = createCommonjsModule(function (module) {
var baseEach = interopDefault(require$$0$1),
    isArrayLike = interopDefault(require$$3);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;
});

var _baseMap$1 = interopDefault(_baseMap);


var require$$1$21 = Object.freeze({
	default: _baseMap$1
});

var map = createCommonjsModule(function (module) {
var arrayMap = interopDefault(require$$0$36),
    baseIteratee = interopDefault(require$$2$6),
    baseMap = interopDefault(require$$1$21),
    isArray = interopDefault(require$$0$5);

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array|Function|Object|string} [iteratee=_.identity]
 *  The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;
});

var map$1 = interopDefault(map);

var _assignValue = createCommonjsModule(function (module) {
var eq = interopDefault(require$$3$4);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

module.exports = assignValue;
});

var _assignValue$1 = interopDefault(_assignValue);


var require$$5$5 = Object.freeze({
	default: _assignValue$1
});

var _copyObject = createCommonjsModule(function (module) {
var assignValue = interopDefault(require$$5$5);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : source[key];

    assignValue(object, key, newValue);
  }
  return object;
}

module.exports = copyObject;
});

var _copyObject$1 = interopDefault(_copyObject);


var require$$1$22 = Object.freeze({
	default: _copyObject$1
});

var _isIterateeCall = createCommonjsModule(function (module) {
var eq = interopDefault(require$$3$4),
    isArrayLike = interopDefault(require$$3),
    isIndex = interopDefault(require$$3$2),
    isObject = interopDefault(require$$2);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;
});

var _isIterateeCall$1 = interopDefault(_isIterateeCall);


var require$$1$23 = Object.freeze({
	default: _isIterateeCall$1
});

var _apply = createCommonjsModule(function (module) {
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;
});

var _apply$1 = interopDefault(_apply);


var require$$1$24 = Object.freeze({
	default: _apply$1
});

var toNumber = createCommonjsModule(function (module) {
var isFunction = interopDefault(require$$2$1),
    isObject = interopDefault(require$$2),
    isSymbol = interopDefault(require$$0$32);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;
});

var toNumber$1 = interopDefault(toNumber);


var require$$0$40 = Object.freeze({
	default: toNumber$1
});

var toFinite = createCommonjsModule(function (module) {
var toNumber = interopDefault(require$$0$40);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;
});

var toFinite$1 = interopDefault(toFinite);


var require$$0$39 = Object.freeze({
	default: toFinite$1
});

var toInteger = createCommonjsModule(function (module) {
var toFinite = interopDefault(require$$0$39);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;
});

var toInteger$1 = interopDefault(toInteger);


var require$$1$25 = Object.freeze({
	default: toInteger$1
});

var rest = createCommonjsModule(function (module) {
var apply = interopDefault(require$$1$24),
    toInteger = interopDefault(require$$1$25);

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as
 * an array.
 *
 * **Note:** This method is based on the
 * [rest parameter](https://mdn.io/rest_parameters).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.rest(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, array);
      case 1: return func.call(this, args[0], array);
      case 2: return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

module.exports = rest;
});

var rest$1 = interopDefault(rest);


var require$$0$38 = Object.freeze({
	default: rest$1
});

var _createAssigner = createCommonjsModule(function (module) {
var isIterateeCall = interopDefault(require$$1$23),
    rest = interopDefault(require$$0$38);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return rest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;
});

var _createAssigner$1 = interopDefault(_createAssigner);


var require$$3$11 = Object.freeze({
	default: _createAssigner$1
});

var _Reflect = createCommonjsModule(function (module) {
var root = interopDefault(require$$1$12);

/** Built-in value references. */
var Reflect = root.Reflect;

module.exports = Reflect;
});

var _Reflect$1 = interopDefault(_Reflect);


var require$$1$26 = Object.freeze({
	default: _Reflect$1
});

var _iteratorToArray = createCommonjsModule(function (module) {
/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

module.exports = iteratorToArray;
});

var _iteratorToArray$1 = interopDefault(_iteratorToArray);


var require$$0$42 = Object.freeze({
	default: _iteratorToArray$1
});

var _baseKeysIn = createCommonjsModule(function (module) {
var Reflect = interopDefault(require$$1$26),
    iteratorToArray = interopDefault(require$$0$42);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var enumerate = Reflect ? Reflect.enumerate : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * The base implementation of `_.keysIn` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  object = object == null ? object : Object(object);

  var result = [];
  for (var key in object) {
    result.push(key);
  }
  return result;
}

// Fallback for IE < 9 with es6-shim.
if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
  baseKeysIn = function(object) {
    return iteratorToArray(enumerate(object));
  };
}

module.exports = baseKeysIn;
});

var _baseKeysIn$1 = interopDefault(_baseKeysIn);


var require$$3$12 = Object.freeze({
	default: _baseKeysIn$1
});

var keysIn = createCommonjsModule(function (module) {
var baseKeysIn = interopDefault(require$$3$12),
    indexKeys = interopDefault(require$$2$2),
    isIndex = interopDefault(require$$3$2),
    isPrototype = interopDefault(require$$0$6);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  var index = -1,
      isProto = isPrototype(object),
      props = baseKeysIn(object),
      propsLength = props.length,
      indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  while (++index < propsLength) {
    var key = props[index];
    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;
});

var keysIn$1 = interopDefault(keysIn);


var require$$0$41 = Object.freeze({
	default: keysIn$1
});

var assignIn = createCommonjsModule(function (module) {
var assignValue = interopDefault(require$$5$5),
    copyObject = interopDefault(require$$1$22),
    createAssigner = interopDefault(require$$3$11),
    isArrayLike = interopDefault(require$$3),
    isPrototype = interopDefault(require$$0$6),
    keysIn = interopDefault(require$$0$41);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * function Bar() {
 *   this.d = 4;
 * }
 *
 * Foo.prototype.c = 3;
 * Bar.prototype.e = 5;
 *
 * _.assignIn({ 'a': 1 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
 */
var assignIn = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keysIn(source), object);
    return;
  }
  for (var key in source) {
    assignValue(object, key, source[key]);
  }
});

module.exports = assignIn;
});

var assignIn$1 = interopDefault(assignIn);


var require$$0$37 = Object.freeze({
	default: assignIn$1
});

var extend = createCommonjsModule(function (module) {
module.exports = interopDefault(require$$0$37);
});

var extend$1 = interopDefault(extend);

var isEqual = createCommonjsModule(function (module) {
var baseIsEqual = interopDefault(require$$0$21);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are **not** supported.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent,
 *  else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;
});

var isEqual$1 = interopDefault(isEqual);

var _baseAssign = createCommonjsModule(function (module) {
var copyObject = interopDefault(require$$1$22),
    keys = interopDefault(require$$0$3);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;
});

var _baseAssign$1 = interopDefault(_baseAssign);


var require$$13 = Object.freeze({
	default: _baseAssign$1
});

var _cloneBuffer = createCommonjsModule(function (module) {
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

var _cloneBuffer$1 = interopDefault(_cloneBuffer);


var require$$12 = Object.freeze({
	default: _cloneBuffer$1
});

var _copyArray = createCommonjsModule(function (module) {
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;
});

var _copyArray$1 = interopDefault(_copyArray);


var require$$11 = Object.freeze({
	default: _copyArray$1
});

var stubArray = createCommonjsModule(function (module) {
/**
 * A method that returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;
});

var stubArray$1 = interopDefault(stubArray);


var require$$0$45 = Object.freeze({
	default: stubArray$1
});

var _getSymbols = createCommonjsModule(function (module) {
var stubArray = interopDefault(require$$0$45);

/** Built-in value references. */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
function getSymbols(object) {
  // Coerce `object` to an object to avoid non-object errors in V8.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=3443 for more details.
  return getOwnPropertySymbols(Object(object));
}

// Fallback for IE < 11.
if (!getOwnPropertySymbols) {
  getSymbols = stubArray;
}

module.exports = getSymbols;
});

var _getSymbols$1 = interopDefault(_getSymbols);


var require$$0$44 = Object.freeze({
	default: _getSymbols$1
});

var _copySymbols = createCommonjsModule(function (module) {
var copyObject = interopDefault(require$$1$22),
    getSymbols = interopDefault(require$$0$44);

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;
});

var _copySymbols$1 = interopDefault(_copySymbols);


var require$$10 = Object.freeze({
	default: _copySymbols$1
});

var _arrayPush = createCommonjsModule(function (module) {
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;
});

var _arrayPush$1 = interopDefault(_arrayPush);


var require$$2$21 = Object.freeze({
	default: _arrayPush$1
});

var _baseGetAllKeys = createCommonjsModule(function (module) {
var arrayPush = interopDefault(require$$2$21),
    isArray = interopDefault(require$$0$5);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;
});

var _baseGetAllKeys$1 = interopDefault(_baseGetAllKeys);


var require$$2$20 = Object.freeze({
	default: _baseGetAllKeys$1
});

var _getAllKeys = createCommonjsModule(function (module) {
var baseGetAllKeys = interopDefault(require$$2$20),
    getSymbols = interopDefault(require$$0$44),
    keys = interopDefault(require$$0$3);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;
});

var _getAllKeys$1 = interopDefault(_getAllKeys);


var require$$9 = Object.freeze({
	default: _getAllKeys$1
});

var _initCloneArray = createCommonjsModule(function (module) {
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;
});

var _initCloneArray$1 = interopDefault(_initCloneArray);


var require$$7 = Object.freeze({
	default: _initCloneArray$1
});

var _cloneArrayBuffer = createCommonjsModule(function (module) {
var Uint8Array = interopDefault(require$$0$25);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;
});

var _cloneArrayBuffer$1 = interopDefault(_cloneArrayBuffer);


var require$$0$46 = Object.freeze({
	default: _cloneArrayBuffer$1
});

var _cloneDataView = createCommonjsModule(function (module) {
var cloneArrayBuffer = interopDefault(require$$0$46);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;
});

var _cloneDataView$1 = interopDefault(_cloneDataView);


var require$$5$6 = Object.freeze({
	default: _cloneDataView$1
});

var _addMapEntry = createCommonjsModule(function (module) {
/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `Map#set` because it doesn't return the map instance in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;
});

var _addMapEntry$1 = interopDefault(_addMapEntry);


var require$$2$22 = Object.freeze({
	default: _addMapEntry$1
});

var _arrayReduce = createCommonjsModule(function (module) {
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;
});

var _arrayReduce$1 = interopDefault(_arrayReduce);


var require$$0$47 = Object.freeze({
	default: _arrayReduce$1
});

var _cloneMap = createCommonjsModule(function (module) {
var addMapEntry = interopDefault(require$$2$22),
    arrayReduce = interopDefault(require$$0$47),
    mapToArray = interopDefault(require$$0$26);

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;
});

var _cloneMap$1 = interopDefault(_cloneMap);


var require$$4$11 = Object.freeze({
	default: _cloneMap$1
});

var _cloneRegExp = createCommonjsModule(function (module) {
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;
});

var _cloneRegExp$1 = interopDefault(_cloneRegExp);


var require$$3$13 = Object.freeze({
	default: _cloneRegExp$1
});

var _addSetEntry = createCommonjsModule(function (module) {
/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  set.add(value);
  return set;
}

module.exports = addSetEntry;
});

var _addSetEntry$1 = interopDefault(_addSetEntry);


var require$$2$24 = Object.freeze({
	default: _addSetEntry$1
});

var _cloneSet = createCommonjsModule(function (module) {
var addSetEntry = interopDefault(require$$2$24),
    arrayReduce = interopDefault(require$$0$47),
    setToArray = interopDefault(require$$0$27);

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;
});

var _cloneSet$1 = interopDefault(_cloneSet);


var require$$2$23 = Object.freeze({
	default: _cloneSet$1
});

var _cloneSymbol = createCommonjsModule(function (module) {
var Symbol = interopDefault(require$$0$24);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;
});

var _cloneSymbol$1 = interopDefault(_cloneSymbol);


var require$$1$27 = Object.freeze({
	default: _cloneSymbol$1
});

var _cloneTypedArray = createCommonjsModule(function (module) {
var cloneArrayBuffer = interopDefault(require$$0$46);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;
});

var _cloneTypedArray$1 = interopDefault(_cloneTypedArray);


var require$$0$48 = Object.freeze({
	default: _cloneTypedArray$1
});

var _initCloneByTag = createCommonjsModule(function (module) {
var cloneArrayBuffer = interopDefault(require$$0$46),
    cloneDataView = interopDefault(require$$5$6),
    cloneMap = interopDefault(require$$4$11),
    cloneRegExp = interopDefault(require$$3$13),
    cloneSet = interopDefault(require$$2$23),
    cloneSymbol = interopDefault(require$$1$27),
    cloneTypedArray = interopDefault(require$$0$48);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;
});

var _initCloneByTag$1 = interopDefault(_initCloneByTag);


var require$$6 = Object.freeze({
	default: _initCloneByTag$1
});

var _baseCreate = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$2);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

module.exports = baseCreate;
});

var _baseCreate$1 = interopDefault(_baseCreate);


var require$$2$25 = Object.freeze({
	default: _baseCreate$1
});

var _initCloneObject = createCommonjsModule(function (module) {
var baseCreate = interopDefault(require$$2$25),
    getPrototype = interopDefault(require$$1$2),
    isPrototype = interopDefault(require$$0$6);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;
});

var _initCloneObject$1 = interopDefault(_initCloneObject);


var require$$5$7 = Object.freeze({
	default: _initCloneObject$1
});

var stubFalse = createCommonjsModule(function (module) {
/**
 * A method that returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;
});

var stubFalse$1 = interopDefault(stubFalse);


var require$$0$49 = Object.freeze({
	default: stubFalse$1
});

var isBuffer = createCommonjsModule(function (module, exports) {
var root = interopDefault(require$$1$12),
    stubFalse = interopDefault(require$$0$49);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = !Buffer ? stubFalse : function(value) {
  return value instanceof Buffer;
};

module.exports = isBuffer;
});

var isBuffer$1 = interopDefault(isBuffer);


var require$$3$14 = Object.freeze({
	default: isBuffer$1
});

var _baseClone = createCommonjsModule(function (module) {
var Stack = interopDefault(require$$16),
    arrayEach = interopDefault(require$$15),
    assignValue = interopDefault(require$$5$5),
    baseAssign = interopDefault(require$$13),
    cloneBuffer = interopDefault(require$$12),
    copyArray = interopDefault(require$$11),
    copySymbols = interopDefault(require$$10),
    getAllKeys = interopDefault(require$$9),
    getTag = interopDefault(require$$8),
    initCloneArray = interopDefault(require$$7),
    initCloneByTag = interopDefault(require$$6),
    initCloneObject = interopDefault(require$$5$7),
    isArray = interopDefault(require$$0$5),
    isBuffer = interopDefault(require$$3$14),
    isHostObject = interopDefault(require$$1$11),
    isObject = interopDefault(require$$2),
    keys = interopDefault(require$$0$3);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  // Recursively populate clone (susceptible to call stack limits).
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;
});

var _baseClone$1 = interopDefault(_baseClone);


var require$$0$43 = Object.freeze({
	default: _baseClone$1
});

var clone = createCommonjsModule(function (module) {
var baseClone = interopDefault(require$$0$43);

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, false, true);
}

module.exports = clone;
});

var clone$1 = interopDefault(clone);

var cloneDeep = createCommonjsModule(function (module) {
var baseClone = interopDefault(require$$0$43);

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

module.exports = cloneDeep;
});

var cloneDeep$1 = interopDefault(cloneDeep);

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/**
 * Generates a unique id.
 *
 * @param {String} [prefix] if provided the UUID will be prefixed.
 * @param {Number} [len] if provided a UUID with given length will be created.
 * @return A generated uuid.
 */
function uuid$1(prefix, len) {
  if (prefix && prefix[prefix.length-1] !== "-") {
    prefix = prefix.concat("-");
  }
  var chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  var radix = 16;
  var idx;
  len = len || 32;
  if (len) {
    // Compact form
    for (idx = 0; idx < len; idx++) uuid[idx] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (idx = 0; idx < 36; idx++) {
      if (!uuid[idx]) {
        r = 0 | Math.random()*16;
        uuid[idx] = chars[(idx === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return (prefix ? prefix : "") + uuid.join('');
}

var isNumber = createCommonjsModule(function (module) {
var isObjectLike = interopDefault(require$$0$4);

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && objectToString.call(value) == numberTag);
}

module.exports = isNumber;
});

var isNumber$1 = interopDefault(isNumber);

var _baseSet = createCommonjsModule(function (module) {
var assignValue = interopDefault(require$$5$5),
    castPath = interopDefault(require$$4$9),
    isIndex = interopDefault(require$$3$2),
    isKey = interopDefault(require$$3$10),
    isObject = interopDefault(require$$2),
    toKey = interopDefault(require$$0$33);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]);
    if (isObject(nested)) {
      var newValue = value;
      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = objValue == null
            ? (isIndex(path[index + 1]) ? [] : {})
            : objValue;
        }
      }
      assignValue(nested, key, newValue);
    }
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;
});

var _baseSet$1 = interopDefault(_baseSet);


var require$$0$50 = Object.freeze({
	default: _baseSet$1
});

var setWith = createCommonjsModule(function (module) {
var baseSet = interopDefault(require$$0$50);

/**
 * This method is like `_.set` except that it accepts `customizer` which is
 * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
 * path creation is handled by the method instead. The `customizer` is invoked
 * with three arguments: (nsValue, key, nsObject).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {};
 *
 * _.setWith(object, '[0][1]', 'a', Object);
 * // => { '0': { '1': 'a' } }
 */
function setWith(object, path, value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return object == null ? object : baseSet(object, path, value, customizer);
}

module.exports = setWith;
});

var setWith$1 = interopDefault(setWith);

var last = createCommonjsModule(function (module) {
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;
});

var last$1 = interopDefault(last);


var require$$2$26 = Object.freeze({
	default: last$1
});

var _baseSlice = createCommonjsModule(function (module) {
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;
});

var _baseSlice$1 = interopDefault(_baseSlice);


var require$$0$52 = Object.freeze({
	default: _baseSlice$1
});

var _parent = createCommonjsModule(function (module) {
var baseGet = interopDefault(require$$1$18),
    baseSlice = interopDefault(require$$0$52);

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;
});

var _parent$1 = interopDefault(_parent);


var require$$1$28 = Object.freeze({
	default: _parent$1
});

var _baseUnset = createCommonjsModule(function (module) {
var baseHas = interopDefault(require$$5),
    castPath = interopDefault(require$$4$9),
    isKey = interopDefault(require$$3$10),
    last = interopDefault(require$$2$26),
    parent = interopDefault(require$$1$28),
    toKey = interopDefault(require$$0$33);

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  object = parent(object, path);

  var key = toKey(last(path));
  return !(object != null && baseHas(object, key)) || delete object[key];
}

module.exports = baseUnset;
});

var _baseUnset$1 = interopDefault(_baseUnset);


var require$$0$51 = Object.freeze({
	default: _baseUnset$1
});

var unset = createCommonjsModule(function (module) {
var baseUnset = interopDefault(require$$0$51);

/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 7 } }] };
 * _.unset(object, 'a[0].b.c');
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 *
 * _.unset(object, ['a', '0', 'b', 'c']);
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 */
function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}

module.exports = unset;
});

var unset$1 = interopDefault(unset);

/*
  An object that can be access via path API.

  @class
  @param {object} [obj] An object to operate on
  @example

  var obj = new DataObject({a: "aVal", b: {b1: 'b1Val', b2: 'b2Val'}});
*/

function DataObject(root) {
  if (root) {
    this.__root__ = root;
  }
}

DataObject.Prototype = function() {

  this._isDataObject = true;

  this.getRoot = function() {
    if (this.__root__) {
      return this.__root__;
    } else {
      return this;
    }
  };

  /**
    Get value at path

    @return {object} The value stored for a given path

    @example

    obj.get(['b', 'b1']);
    => b1Val
  */
  this.get = function(path) {
    if (!path) {
      return undefined;
    }
    if (isString$1(path)) {
      return this.getRoot()[path];
    }
    if (arguments.length > 1) {
      path = Array.prototype.slice(arguments, 0);
    }
    if (!isArray$1(path)) {
      throw new Error('Illegal argument for DataObject.get()');
    }
    return get$1(this.getRoot(), path);
  };

  this.set = function(path, value) {
    if (!path) {
      throw new Error('Illegal argument: DataObject.set(>path<, value) - path is mandatory.');
    }
    if (isString$1(path)) {
      this.getRoot()[path] = value;
    } else {
      setWith$1(this.getRoot(), path, value);
    }
  };

  this.delete = function(path) {
    if (isString$1(path)) {
      delete this.getRoot()[path];
    } else if (path.length === 1) {
      delete this.getRoot()[path[0]];
    } else {
      var success = unset$1(this.getRoot(), path);
      if (!success) {
        throw new Error('Could not delete property at path' + path);
      }
    }
  };

  this.clear = function() {
    var root = this.getRoot();
    for (var key in root) {
      if (root.hasOwnProperty(key)) {
        delete root[key];
      }
    }
  };

};

oo.initClass(DataObject);

/*
  @class
*/
function Operation() {}

Operation.Prototype = function() {
  this.isOperation = true;
};

oo.initClass(Operation);

function Conflict(a, b) {
  Error.call(this, "Conflict: " + JSON.stringify(a) +" vs " + JSON.stringify(b));
  this.a = a;
  this.b = b;
}
Conflict.prototype = Error.prototype;

var INSERT = "insert";
var DELETE$1 = "delete";

var hasConflict$1;

/*
  @class
  @extends Operation
*/
function TextOperation(data) {
  Operation.call(this);
  if (!data || data.type === undefined || data.pos === undefined || data.str === undefined) {
    throw new Error("Illegal argument: insufficient data.");
  }
  // 'insert' or 'delete'
  this.type = data.type;
  // the position where to apply the operation
  this.pos = data.pos;
  // the string to delete or insert
  this.str = data.str;
  // sanity checks
  if(!this.isInsert() && !this.isDelete()) {
    throw new Error("Illegal type.");
  }
  if (!isString$1(this.str)) {
    throw new Error("Illegal argument: expecting string.");
  }
  if (!isNumber$1(this.pos) || this.pos < 0) {
    throw new Error("Illegal argument: expecting positive number as pos.");
  }
}

TextOperation.fromJSON = function(data) {
  return new TextOperation(data);
};

TextOperation.Prototype = function() {

  this._isTextOperation = true;

  this.apply = function(str) {
    if (this.isEmpty()) return str;
    if (this.type === INSERT) {
      if (str.length < this.pos) {
        throw new Error("Provided string is too short.");
      }
      if (str.splice) {
        return str.splice(this.pos, 0, this.str);
      } else {
        return str.slice(0, this.pos).concat(this.str).concat(str.slice(this.pos));
      }
    }
    else /* if (this.type === DELETE) */ {
      if (str.length < this.pos + this.str.length) {
        throw new Error("Provided string is too short.");
      }
      if (str.splice) {
        return str.splice(this.pos, this.str.length);
      } else {
        return str.slice(0, this.pos).concat(str.slice(this.pos + this.str.length));
      }
    }
  };

  this.clone = function() {
    return new TextOperation(this);
  };

  this.isNOP = function() {
    return this.type === "NOP" || this.str.length === 0;
  };

  this.isInsert = function() {
    return this.type === INSERT;
  };

  this.isDelete = function() {
    return this.type === DELETE$1;
  };

  this.getLength = function() {
    return this.str.length;
  };

  this.invert = function() {
    var data = {
      type: this.isInsert() ? DELETE$1 : INSERT,
      pos: this.pos,
      str: this.str
    };
    return new TextOperation(data);
  };

  this.hasConflict = function(other) {
    return hasConflict$1(this, other);
  };

  this.isEmpty = function() {
    return this.str.length === 0;
  };

  this.toJSON = function() {
    return {
      type: this.type,
      pos: this.pos,
      str: this.str
    };
  };

  this.toString = function() {
    return ["(", (this.isInsert() ? INSERT : DELETE$1), ",", this.pos, ",'", this.str, "')"].join('');
  };
};

Operation.extend(TextOperation);

hasConflict$1 = function(a, b) {
  // Insert vs Insert:
  //
  // Insertions are conflicting iff their insert position is the same.
  if (a.type === INSERT && b.type === INSERT) return (a.pos === b.pos);
  // Delete vs Delete:
  //
  // Deletions are conflicting if their ranges overlap.
  if (a.type === DELETE$1 && b.type === DELETE$1) {
    // to have no conflict, either `a` should be after `b` or `b` after `a`, otherwise.
    return !(a.pos >= b.pos + b.str.length || b.pos >= a.pos + a.str.length);
  }
  // Delete vs Insert:
  //
  // A deletion and an insertion are conflicting if the insert position is within the deleted range.
  var del, ins;
  if (a.type === DELETE$1) {
    del = a; ins = b;
  } else {
    del = b; ins = a;
  }
  return (ins.pos >= del.pos && ins.pos < del.pos + del.str.length);
};

// Transforms two Insertions
// --------

function transform_insert_insert(a, b) {
  if (a.pos === b.pos) {
    b.pos += a.str.length;
  }
  else if (a.pos < b.pos) {
    b.pos += a.str.length;
  }
  else {
    a.pos += b.str.length;
  }
}

// Transform two Deletions
// --------
//

function transform_delete_delete$1(a, b, first) {
  // reduce to a normalized case
  if (a.pos > b.pos) {
    return transform_delete_delete$1(b, a, !first);
  }
  if (a.pos === b.pos && a.str.length > b.str.length) {
    return transform_delete_delete$1(b, a, !first);
  }
  // take out overlapping parts
  if (b.pos < a.pos + a.str.length) {
    var s = b.pos - a.pos;
    var s1 = a.str.length - s;
    var s2 = s + b.str.length;
    a.str = a.str.slice(0, s) + a.str.slice(s2);
    b.str = b.str.slice(s1);
    b.pos -= s;
  } else {
    b.pos -= a.str.length;
  }
}

// Transform Insert and Deletion
// --------
//

function transform_insert_delete(a, b) {
  if (a.type === DELETE$1) {
    return transform_insert_delete(b, a);
  }
  // we can assume, that a is an insertion and b is a deletion
  // a is before b
  if (a.pos <= b.pos) {
    b.pos += a.str.length;
  }
  // a is after b
  else if (a.pos >= b.pos + b.str.length) {
    a.pos -= b.str.length;
  }
  // Note: this is a conflict case the user should be noticed about
  // If applied still, the deletion takes precedence
  // a.pos > b.pos && <= b.pos + b.length
  else {
    var s = a.pos - b.pos;
    b.str = b.str.slice(0, s) + a.str + b.str.slice(s);
    a.str = "";
  }
}

var transform$1 = function(a, b, options) {
  options = options || {};
  if (options["no-conflict"] && hasConflict$1(a, b)) {
    throw new Conflict(a, b);
  }
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.type === INSERT && b.type === INSERT) {
    transform_insert_insert(a, b);
  }
  else if (a.type === DELETE$1 && b.type === DELETE$1) {
    transform_delete_delete$1(a, b, true);
  }
  else {
    transform_insert_delete(a,b);
  }
  return [a, b];
};

TextOperation.transform = function() {
  return transform$1.apply(null, arguments);
};

/* Factories */

TextOperation.Insert = function(pos, str) {
  return new TextOperation({ type: INSERT, pos: pos, str: str });
};

TextOperation.Delete = function(pos, str) {
  return new TextOperation({ type: DELETE$1, pos: pos, str: str });
};

TextOperation.INSERT = INSERT;
TextOperation.DELETE = DELETE$1;

var NOP$1 = "NOP";
var DELETE$2 = "delete";
var INSERT$1 = "insert";

/*
  @class
  @extends Operation
*/
function ArrayOperation(data) {
  Operation.call(this);

  if (!data || !data.type) {
    throw new Error("Illegal argument: insufficient data.");
  }
  this.type = data.type;
  if (this.type === NOP$1) return;

  if (this.type !== INSERT$1 && this.type !== DELETE$2) {
    throw new Error("Illegal type.");
  }
  // the position where to apply the operation
  this.pos = data.pos;
  // the value to insert or delete
  this.val = data.val;
  if (!isNumber$1(this.pos) || this.pos < 0) {
    throw new Error("Illegal argument: expecting positive number as pos.");
  }
}

ArrayOperation.fromJSON = function(data) {
  return new ArrayOperation(data);
};

ArrayOperation.Prototype = function() {

  this._isArrayOperation = true;

  this.apply = function(array) {
    if (this.type === NOP$1) {
      return array;
    }
    if (this.type === INSERT$1) {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.");
      }
      array.splice(this.pos, 0, this.val);
      return array;
    }
    // Delete
    else /* if (this.type === DELETE) */ {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.");
      }
      if (!isEqual$1(array[this.pos], this.val)) {
        throw Error("Unexpected value at position " + this.pos + ". Expected " + this.val + ", found " + array[this.pos]);
      }
      array.splice(this.pos, 1);
      return array;
    }
  };

  this.clone = function() {
    var data = {
      type: this.type,
      pos: this.pos,
      val: cloneDeep$1(this.val)
    };
    return new ArrayOperation(data);
  };

  this.invert = function() {
    var data = this.toJSON();
    if (this.type === NOP$1) data.type = NOP$1;
    else if (this.type === INSERT$1) data.type = DELETE$2;
    else /* if (this.type === DELETE) */ data.type = INSERT$1;
    return new ArrayOperation(data);
  };

  this.hasConflict = function(other) {
    return ArrayOperation.hasConflict(this, other);
  };

  this.toJSON = function() {
    var result = {
      type: this.type,
    };
    if (this.type === NOP$1) return result;
    result.pos = this.pos;
    result.val = cloneDeep$1(this.val);
    return result;
  };

  this.isInsert = function() {
    return this.type === INSERT$1;
  };

  this.isDelete = function() {
    return this.type === DELETE$2;
  };

  this.getOffset = function() {
    return this.pos;
  };

  this.getValue = function() {
    return this.val;
  };

  this.isNOP = function() {
    return this.type === NOP$1;
  };

  this.toString = function() {
    return ["(", (this.isInsert() ? INSERT$1 : DELETE$2), ",", this.getOffset(), ",'", this.getValue(), "')"].join('');
  };
};

Operation.extend(ArrayOperation);

var hasConflict$2 = function(a, b) {
  if (a.type === NOP$1 || b.type === NOP$1) return false;
  if (a.type === INSERT$1 && b.type === INSERT$1) {
    return a.pos === b.pos;
  } else {
    return false;
  }
};

function transform_insert_insert$1(a, b) {
  if (a.pos === b.pos) {
    b.pos += 1;
  }
  // a before b
  else if (a.pos < b.pos) {
    b.pos += 1;
  }
  // a after b
  else {
    a.pos += 1;
  }
}

function transform_delete_delete$2(a, b) {
  // turn the second of two concurrent deletes into a NOP
  if (a.pos === b.pos) {
    b.type = NOP$1;
    a.type = NOP$1;
    return;
  }
  if (a.pos < b.pos) {
    b.pos -= 1;
  } else {
    a.pos -= 1;
  }
}

function transform_insert_delete$1(a, b) {
  // reduce to a normalized case
  if (a.type === DELETE$2) {
    var tmp = a;
    a = b;
    b = tmp;
  }
  if (a.pos <= b.pos) {
    b.pos += 1;
  } else {
    a.pos -= 1;
  }
}

var transform$2 = function(a, b, options) {
  options = options || {};
  // enable conflicts when you want to notify the user of potential problems
  // Note that even in these cases, there is a defined result.
  if (options['no-conflict'] && hasConflict$2(a, b)) {
    throw new Conflict(a, b);
  }
  // this is used internally only as optimization, e.g., when rebasing an operation
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.type === NOP$1 || b.type === NOP$1) {
    // nothing to transform
  }
  else if (a.type === INSERT$1 && b.type === INSERT$1) {
    transform_insert_insert$1(a, b);
  }
  else if (a.type === DELETE$2 && b.type === DELETE$2) {
    transform_delete_delete$2(a, b);
  }
  else {
    transform_insert_delete$1(a, b);
  }
  return [a, b];
};

ArrayOperation.transform = transform$2;
ArrayOperation.hasConflict = hasConflict$2;

/* Factories */

ArrayOperation.Insert = function(pos, val) {
  return new ArrayOperation({type:INSERT$1, pos: pos, val: val});
};

ArrayOperation.Delete = function(pos, val) {
  return new ArrayOperation({ type:DELETE$2, pos: pos, val: val });
};

ArrayOperation.NOP = NOP$1;
ArrayOperation.DELETE = DELETE$2;
ArrayOperation.INSERT = INSERT$1;

var NOP = "NOP";
var CREATE = "create";
var DELETE = 'delete';
var UPDATE = 'update';
var SET = 'set';

/*
  @class
  @extends Operation
*/
function ObjectOperation(data) {
  Operation.call(this);
  if (!data) {
    throw new Error('Data of ObjectOperation is missing.');
  }
  if (!data.type) {
    throw new Error('Invalid data: type is mandatory.');
  }
  this.type = data.type;
  if (data.type === NOP) {
    return;
  }
  this.path = data.path;
  if (!data.path) {
    throw new Error('Invalid data: path is mandatory.');
  }
  if (this.type === CREATE || this.type === DELETE) {
    if (!data.val) {
      throw new Error('Invalid data: value is missing.');
    }
    this.val = data.val;
  }
  else if (this.type === UPDATE) {
    if (data.diff) {
      this.diff = data.diff;
      if (data.diff._isTextOperation) {
        this.propertyType = 'string';
      } else if (data.diff._isArrayOperation) {
        this.propertyType = 'array';
      } else {
        throw new Error('Invalid data: diff must be a TextOperation or an ArrayOperation.');
      }
    } else {
      throw new Error("Invalid data: diff is mandatory for update operation.");
    }
  }
  else if (this.type === SET) {
    this.val = data.val;
    this.original = data.original;
  } else {
    throw new Error('Invalid type: '+ data.type);
  }
}

ObjectOperation.fromJSON = function(data) {
  data = cloneDeep$1(data);
  if (data.type === "update") {
    switch (data.propertyType) {
      case "string":
        data.diff = TextOperation.fromJSON(data.diff);
        break;
      case "array":
        data.diff = ArrayOperation.fromJSON(data.diff);
        break;
      default:
        throw new Error("Unsupported update diff:" + JSON.stringify(data.diff));
    }
  }
  var op = new ObjectOperation(data);
  return op;
};

ObjectOperation.Prototype = function() {

  this._isObjectOperation = true;

  this.apply = function(obj) {
    if (this.type === NOP) return obj;
    var adapter;
    if (obj._isDataObject) {
      adapter = obj;
    } else {
      adapter = new DataObject(obj);
    }
    if (this.type === CREATE) {
      adapter.set(this.path, cloneDeep$1(this.val));
      return obj;
    }
    if (this.type === DELETE) {
      adapter.delete(this.path, "strict");
    }
    else if (this.type === UPDATE) {
      var diff = this.diff;
      var oldVal = adapter.get(this.path);
      var newVal;
      if (diff._isArrayOperation) {
        newVal = diff.apply(oldVal);
      } else {
        newVal = diff.apply(oldVal);
      }
      adapter.set(this.path, newVal);
    }
    else /* if (this.type === SET) */ {
      // clone here as the operations value must not be changed
      adapter.set(this.path, cloneDeep$1(this.val));
    }
    return obj;
  };

  this.clone = function() {
    var data = {
      type: this.type,
      path: this.path,
    };
    if (this.val) {
      data.val = cloneDeep$1(this.val);
    }
    if (this.diff) {
      data.diff = this.diff.clone();
    }
    return new ObjectOperation(data);
  };

  this.isNOP = function() {
    if (this.type === NOP) return true;
    else if (this.type === UPDATE) return this.diff.isNOP();
  };

  this.isCreate = function() {
    return this.type === CREATE;
  };

  this.isDelete = function() {
    return this.type === DELETE;
  };

  this.isUpdate = function(propertyType) {
    if (propertyType) {
      return (this.type === UPDATE && this.propertyType === propertyType);
    } else {
      return this.type === UPDATE;
    }
  };

  this.isSet = function() {
    return this.type === SET;
  };

  this.invert = function() {
    if (this.type === NOP) {
      return new ObjectOperation({ type: NOP });
    }
    var result = new ObjectOperation(this);
    if (this.type === CREATE) {
      result.type = DELETE;
    }
    else if (this.type === DELETE) {
      result.type = CREATE;
    }
    else if (this.type === UPDATE) {
      var invertedDiff;
      if (this.diff._isTextOperation) {
        invertedDiff = TextOperation.fromJSON(this.diff.toJSON()).invert();
      } else {
        invertedDiff = ArrayOperation.fromJSON(this.diff.toJSON()).invert();
      }
      result.diff = invertedDiff;
    }
    else /* if (this.type === SET) */ {
      result.val = this.original;
      result.original = this.val;
    }
    return result;
  };

  this.hasConflict = function(other) {
    return ObjectOperation.hasConflict(this, other);
  };

  this.toJSON = function() {
    if (this.type === NOP) {
      return { type: NOP };
    }
    var data = {
      type: this.type,
      path: this.path,
    };
    if (this.type === CREATE || this.type === DELETE) {
      data.val = this.val;
    }
    else if (this.type === UPDATE) {
      if (this.diff._isArrayOperation) {
        data.propertyType = "array";
      } else /* if (this.diff._isTextOperation) */ {
        data.propertyType = "string";
      }
      data.diff = this.diff.toJSON();
    }
    else /* if (this.type === SET) */ {
      data.val = this.val;
      data.original = this.original;
    }
    return data;
  };

  this.getType = function() {
    return this.type;
  };

  this.getPath = function() {
    return this.path;
  };

  this.getValue = function() {
    return this.val;
  };

  this.getOldValue = function() {
    return this.original;
  };

  this.getValueOp = function() {
    return this.diff;
  };

  this.toString = function() {
    switch (this.type) {
      case CREATE:
        return ["(+,", JSON.stringify(this.path), JSON.stringify(this.val), ")"].join('');
      case DELETE:
        return ["(-,", JSON.stringify(this.path), JSON.stringify(this.val), ")"].join('');
      case UPDATE:
        return ["(>>,", JSON.stringify(this.path), this.propertyType, this.diff.toString(), ")"].join('');
      case SET:
        return ["(=,", JSON.stringify(this.path), this.val, this.original, ")"].join('');
      case NOP:
        return "NOP";
      default:
        throw new Error('Invalid type');
    }
  };
};

Operation.extend(ObjectOperation);

/* Low level implementation */

var hasConflict = function(a, b) {
  if (a.type === NOP || b.type === NOP) return false;
  return isEqual$1(a.path, b.path);
};

var transform_delete_delete = function(a, b) {
  // both operations have the same effect.
  // the transformed operations are turned into NOPs
  a.type = NOP;
  b.type = NOP;
};

var transform_create_create = function() {
  throw new Error("Can not transform two concurring creates of the same property");
};

var transform_delete_create = function() {
  throw new Error('Illegal state: can not create and delete a value at the same time.');
};

var transform_delete_update = function(a, b, flipped) {
  if (a.type !== DELETE) {
    return transform_delete_update(b, a, true);
  }
  var op;
  if (b.propertyType === 'string') {
    op = TextOperation.fromJSON(b.diff);
  } else /* if (b.propertyType === 'array') */ {
    op = ArrayOperation.fromJSON(b.diff);
  }
  // (DELETE, UPDATE) is transformed into (DELETE, CREATE)
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.val = op.apply(a.val);
  }
  // (UPDATE, DELETE): the delete is updated to delete the updated value
  else {
    a.val = op.apply(a.val);
    b.type = NOP;
  }
};

var transform_create_update = function() {
  // it is not possible to reasonably transform this.
  throw new Error("Can not transform a concurring create and update of the same property");
};

var transform_update_update = function(a, b) {
  // Note: this is a conflict the user should know about
  var op_a, op_b, t;
  if (b.propertyType === 'string') {
    op_a = TextOperation.fromJSON(a.diff);
    op_b = TextOperation.fromJSON(b.diff);
    t = TextOperation.transform(op_a, op_b, {inplace: true});
  } else /* if (b.propertyType === 'array') */ {
    op_a = ArrayOperation.fromJSON(a.diff);
    op_b = ArrayOperation.fromJSON(b.diff);
    t = ArrayOperation.transform(op_a, op_b, {inplace: true});
  }
  a.diff = t[0];
  b.diff = t[1];
};

var transform_create_set = function() {
  throw new Error('Illegal state: can not create and set a value at the same time.');
};

var transform_delete_set = function(a, b, flipped) {
  if (a.type !== DELETE) return transform_delete_set(b, a, true);
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.original = undefined;
  } else {
    a.val = b.val;
    b.type = NOP;
  }
};

var transform_update_set = function() {
  throw new Error("Unresolvable conflict: update + set.");
};

var transform_set_set = function(a, b) {
  a.type = NOP;
  b.original = a.val;
};

var _NOP = 0;
var _CREATE = 1;
var _DELETE = 2;
var _UPDATE = 4;
var _SET = 8;

var CODE = {};
CODE[NOP] =_NOP;
CODE[CREATE] = _CREATE;
CODE[DELETE] = _DELETE;
CODE[UPDATE] = _UPDATE;
CODE[SET] = _SET;

/* eslint-disable no-multi-spaces */
var __transform__ = [];
__transform__[_DELETE | _DELETE] = transform_delete_delete;
__transform__[_DELETE | _CREATE] = transform_delete_create;
__transform__[_DELETE | _UPDATE] = transform_delete_update;
__transform__[_CREATE | _CREATE] = transform_create_create;
__transform__[_CREATE | _UPDATE] = transform_create_update;
__transform__[_UPDATE | _UPDATE] = transform_update_update;
__transform__[_CREATE | _SET   ] = transform_create_set;
__transform__[_DELETE | _SET   ] = transform_delete_set;
__transform__[_UPDATE | _SET   ] = transform_update_set;
__transform__[_SET    | _SET   ] = transform_set_set;
/* eslint-enable no-multi-spaces */

var transform = function(a, b, options) {
  options = options || {};
  if (options['no-conflict'] && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.isNOP() || b.isNOP()) {
    return [a, b];
  }
  var sameProp = isEqual$1(a.path, b.path);
  // without conflict: a' = a, b' = b
  if (sameProp) {
    __transform__[CODE[a.type] | CODE[b.type]](a,b);
  }
  return [a, b];
};

ObjectOperation.transform = transform;
ObjectOperation.hasConflict = hasConflict;

/* Factories */

ObjectOperation.Create = function(idOrPath, val) {
  var path;
  if (isString$1(idOrPath)) {
    path = [idOrPath];
  } else {
    path = idOrPath;
  }
  return new ObjectOperation({type: CREATE, path: path, val: val});
};

ObjectOperation.Delete = function(idOrPath, val) {
  var path;
  if (isString$1(idOrPath)) {
    path = [idOrPath];
  } else {
    path = idOrPath;
  }
  return new ObjectOperation({type: DELETE, path: path, val: val});
};

ObjectOperation.Update = function(path, op) {
  return new ObjectOperation({
    type: UPDATE,
    path: path,
    diff: op
  });
};

ObjectOperation.Set = function(path, oldVal, newVal) {
  return new ObjectOperation({
    type: SET,
    path: path,
    val: cloneDeep$1(newVal),
    original: cloneDeep$1(oldVal)
  });
};

ObjectOperation.NOP = NOP;
ObjectOperation.CREATE = CREATE;
ObjectOperation.DELETE = DELETE;
ObjectOperation.UPDATE = UPDATE;
ObjectOperation.SET = SET;

/*
  Specification:

  - create:
    ```
    'c <JSON.stringify(data)>'
    'c { id: "1123", type: "paragraph", content: ""}'
    ```
  - delete:
    ```
    'd <JSON.stringify(data)>'
    'd { id: "1123", type: "paragraph", content: ""}'
    ```
  - set a property
    ```
    's <property path> <value> <old value>'
    's p1.content foo'
    ```
  - update a property
    ```
    'u <property path> <primitive op>'
    'u p1.content t+ 4 foo'
    ```

Primitive type operations:

  - insert text
    ```
    't+ <pos> <string>'
    't+ 4 foo'
    ```
  - delete text
    ```
    't- <pos> <string>'
    't- 4 foo'
    ```
  - insert value into array
    ```
    'a+ <pos> <value>'
    'a+ 0 p1'
    ```
  - delete value from array
    ```
    'a- <pos> <value>'
    'a- 0 p1'
    ```
*/

function OperationSerializer() {
  this.SEPARATOR = '\t';
}

OperationSerializer.Prototype = function() {

  this.serialize = function(op) {
    var out = [];
    switch (op.type) {
      case 'create':
        out.push('c');
        out.push(op.val.id);
        out.push(op.val);
        break;
      case 'delete':
        out.push('d');
        out.push(op.val.id);
        out.push(op.val);
        break;
      case 'set':
        out.push('s');
        out.push(op.path.join('.'));
        out.push(op.val);
        out.push(op.original);
        break;
      case 'update':
        out.push('u');
        out.push(op.path.join('.'));
        Array.prototype.push.apply(out, this.serializePrimitiveOp(op.diff));
        break;
      default:
        throw new Error('Unsupported operation type.');
    }
    return out;
  };

  this.serializePrimitiveOp = function(op) {
    var out = [];
    if (op._isTextOperation) {
      if (op.isInsert()) {
        out.push('t+');
      } else if (op.isDelete()) {
        out.push('t-');
      }
      out.push(op.pos);
      out.push(op.str);
    } else if (op._isArrayOperation) {
      if (op.isInsert()) {
        out.push('a+');
      } else if (op.isDelete()) {
        out.push('a-');
      }
      out.push(op.pos);
      out.push(op.val);
    } else {
      throw new Error('Unsupported operation type.');
    }
    return out;
  };

  this.deserialize = function(str, tokenizer) {
    if (!tokenizer) {
      tokenizer = new Tokenizer(str, this.SEPARATOR);
    }
    var type = tokenizer.getString();
    var op, path, val, oldVal, diff;
    switch (type) {
      case 'c':
        path = tokenizer.getPath();
        val = tokenizer.getObject();
        op = ObjectOperation.Create(path, val);
        break;
      case 'd':
        path = tokenizer.getPath();
        val = tokenizer.getObject();
        op = ObjectOperation.Delete(path, val);
        break;
      case 's':
        path = tokenizer.getPath();
        val = tokenizer.getAny();
        oldVal = tokenizer.getAny();
        op = ObjectOperation.Set(path, oldVal, val);
        break;
      case 'u':
        path = tokenizer.getPath();
        diff = this.deserializePrimitiveOp(str, tokenizer);
        op = ObjectOperation.Update(path, diff);
        break;
      default:
        throw new Error('Illegal type for ObjectOperation: '+ type);
    }
    return op;
  };

  this.deserializePrimitiveOp = function(str, tokenizer) {
    if (!tokenizer) {
      tokenizer = new Tokenizer(str, this.SEPARATOR);
    }
    var type = tokenizer.getString();
    var op, pos, val;
    switch (type) {
      case 't+':
        pos = tokenizer.getNumber();
        val = tokenizer.getString();
        op = TextOperation.Insert(pos, val);
        break;
      case 't-':
        pos = tokenizer.getNumber();
        val = tokenizer.getString();
        op = TextOperation.Delete(pos, val);
        break;
      case 'a+':
        pos = tokenizer.getNumber();
        val = tokenizer.getAny();
        op = ArrayOperation.Insert(pos, val);
        break;
      case 'a-':
        pos = tokenizer.getNumber();
        val = tokenizer.getAny();
        op = ArrayOperation.Delete(pos, val);
        break;
      default:
        throw new Error('Unsupported operation type: ' + type);
    }
    return op;
  };
};

oo.initClass(OperationSerializer);

function Tokenizer(str, sep) {
  if (isArray$1(arguments[0])) {
    this.tokens = arguments[0];
  } else {
    this.tokens = str.split(sep);
  }
  this.pos = -1;
}

Tokenizer.Prototype = function() {

  this.error = function(msg) {
    throw new Error('Parsing error: ' + msg + '\n' + this.tokens[this.pos]);
  };

  this.getString = function() {
    this.pos++;
    var str = this.tokens[this.pos];
    if (str[0] === '"') {
      str = str.slice(1, -1);
    }
    return str;
  };

  this.getNumber = function() {
    this.pos++;
    var number;
    var token = this.tokens[this.pos];
    try {
      if (isNumber$1(token)) {
        number = token;
      } else {
        number = parseInt(this.tokens[this.pos], 10);
      }
      return number;
    } catch (err) {
      this.error('expected number');
    }
  };

  this.getObject = function() {
    this.pos++;
    var obj;
    var token = this.tokens[this.pos];
    try {
      if (isObject$1(token)) {
        obj = token;
      } else {
        obj = JSON.parse(this.tokens[this.pos]);
      }
      return obj;
    } catch (err) {
      this.error('expected object');
    }
  };

  this.getAny = function() {
    this.pos++;
    var token = this.tokens[this.pos];
    return token;
  };

  this.getPath = function() {
    var str = this.getString();
    return str.split('.');
  };
};

oo.initClass(Tokenizer);

OperationSerializer.Tokenizer = Tokenizer;

// path: the address of a property, such as ['text_1', 'content']
// offset: the position in the property
// after: an internal flag indicating if the address should be associated to the left or right side
//   Note: at boundaries of annotations there are two possible positions with the same address
//       foo <strong>bar</strong> ...
//     With offset=7 normally we associate this position:
//       foo <strong>bar|</strong> ...
//     With after=true we can describe this position:
//       foo <strong>bar</strong>| ...
function Coordinate(path, offset, after) {
  this.path = path;
  this.offset = offset;
  this.after = after;
  if (!isArray$1(path)) {
    throw new Error('Invalid arguments: path should be an array.');
  }
  if (!isNumber$1(offset) || offset < 0) {
    throw new Error('Invalid arguments: offset must be a positive number.');
  }
  // make sure that path can't be changed afterwards
  if (!Object.isFrozen(path)) {
    Object.freeze(path);
  }
}

Coordinate.Prototype = function() {

  this._isCoordinate = true;

  this.equals = function(other) {
    return (other === this ||
      (isEqual$1(other.path, this.path) && other.offset === this.offset) );
  };

  this.withCharPos = function(offset) {
    return new Coordinate(this.path, offset);
  };

  this.getNodeId = function() {
    return this.path[0];
  };

  this.getPath = function() {
    return this.path;
  };

  this.getOffset = function() {
    return this.offset;
  };

  this.toJSON = function() {
    return {
      path: this.path,
      offset: this.offset,
      after: this.after
    };
  };

  this.toString = function() {
    return "(" + this.path.join('.') + ", " + this.offset + ")";
  };

  this.isPropertyCoordinate = function() {
    return this.path.length > 1;
  };

  this.isNodeCoordinate = function() {
    return this.path.length === 1;
  };

};

oo.initClass(Coordinate);

/*
  Anchors are special annotations which have a zero width.

  Examples are the start and end anchors of ContainerAnnotations, or a Cursor.

  TODO: in future we will need to introduce a built-in type
  for this so that annotation updates can be compared with
  text operations.

  Sub-Classes: model/ContainerAnnotation.Anchor, model/Selection.Cursor

  @class
  @abstract
*/
function Anchor() {
  Anchor.super.apply(this, arguments);
}

Anchor.Prototype = function() {

  this.isAnchor = function() {
    return true;
  };

};

Coordinate.extend(Anchor);

/**
  A document selection. Refers to a Substance document model, not to the DOM.

  Implemented by {@link model/PropertySelection} and {@link model/ContainerSelection}

  @class
  @abstract
*/

class Selection$1 {

  constructor() {
    // Internal stuff
    var _internal = {};
    Object.defineProperty(this, "_internal", {
      enumerable: false,
      value: _internal
    });
      // set when attached to document
    _internal.doc = null;
  }

  // for duck-typed instanceof
  get _isSelection() { return true; }

  clone() {
    var newSel = this._clone();
    if (this._internal.doc) {
      newSel.attach(this._internal.doc);
    }
    return newSel;
  }

  /**
    @returns {Document} The attached document instance
  */
  getDocument() {
    var doc = this._internal.doc;
    if (!doc) {
      throw new Error('Selection is not attached to a document.');
    }
    return doc;
  }

  isAttached() {
    return Boolean(this._internal.doc);
  }

  /**
    Attach document to the selection.

    @private
    @param {Document} doc document to attach
    @returns {this}
  */
  attach(doc) {
    this._internal.doc = doc;
    return this;
  }

  /**
    @returns {Boolean} true when selection is null.
  */
  isNull() { return false; }

  /**
    @returns {Boolean} true for property selections
  */
  isPropertySelection() { return false; }

  /**
    @returns {Boolean} true if selection is a {@link model/ContainerSelection}
  */
  isContainerSelection() { return false; }

  /**
    @returns {Boolean} true if selection is a {@link model/NodeSelection}
  */
  isNodeSelection() { return false; }

  isCustomSelection() { return false; }

  /**
    @returns {Boolean} true when selection is collapsed
  */
  isCollapsed() { return true; }

  /**
    @returns {Boolean} true if startOffset < endOffset
  */
  isReverse() { return false; }

  getType() {
    throw new Error('Selection.getType() is abstract.');
  }

  /**
    @returns {Boolean} true if selection equals `other` selection
  */
  equals(other) {
    if (this === other) {
      return true ;
    } else if (!other) {
      return false;
    } else if (this.isNull() !== other.isNull()) {
      return false;
    } else if (this.getType() !== other.getType()) {
      return false;
    } else {
      // Note: returning true here, so that sub-classes
      // can call this as a predicate in their expression
      return true;
    }
  }

  /**
    @returns {String} This selection as human readable string.
  */
  toString() {
    return "null";
  }

  /**
    Convert container selection to JSON.

    @abstract
    @returns {Object}
  */
  toJSON() {
    throw new Error('This method is abstract.');
  }

  /**
    Get selection fragments for this selection.

    A selection fragment is bound to a single property.
    @returns {Selection.Fragment[]}
  */
  getFragments() {
    return [];
  }
}

/**
  Class to represent null selections.

  @private
  @class
*/

class NullSelection extends Selection$1 {

  isNull() {
    return true;
  }

  getType() {
    return 'null';
  }

  toJSON() {
    return null;
  }

  clone() {
    return this;
  }
}

/**
  We use a singleton to represent NullSelections.

  @type {model/Selection}
*/

Selection$1.nullSelection = Object.freeze(new NullSelection());

/**
  A selection fragment. Used when we split a {@link model/ContainerSelection}
  into their fragments, each corresponding to a property selection.

  @private
  @class
*/

Selection$1.Fragment = function(path, startOffset, endOffset, full) {
  EventEmitter.call(this);

  this.type = "selection-fragment";
  this.path = path;
  this.startOffset = startOffset;
  this.endOffset = endOffset || startOffset;
  this.full = Boolean(full);
};

Selection$1.Fragment.Prototype = function() {

  this.isAnchor = function() {
    return false;
  };

  this.isInline = function() {
    return false;
  };

  this.isPropertyFragment = function() {
    return true;
  };

  this.isNodeFragment = function() {
    return false;
  };

  this.isFull = function() {
    return this.full;
  };

  this.isPartial = function() {
    return !this.full;
  };

  this.getNodeId = function() {
    return this.path[0];
  };

};

EventEmitter.extend(Selection$1.Fragment);


Selection$1.NodeFragment = function(nodeId) {
  EventEmitter.call(this);

  this.type = "node-fragment";
  this.nodeId = nodeId;
  this.path = [nodeId];
};

Selection$1.NodeFragment.Prototype = function() {

  this.isAnchor = function() {
    return false;
  };

  this.isInline = function() {
    return false;
  };

  this.isPropertyFragment = function() {
    return false;
  };

  this.isNodeFragment = function() {
    return true;
  };

  this.isFull = function() {
    return true;
  };

  this.isPartial = function() {
    return false;
  };

  this.getNodeId = function() {
    return this.nodeId;
  };
};

EventEmitter.extend(Selection$1.NodeFragment);


/**
  Describe the cursor when creating selection fragments.
  This is used for rendering selections.

  @private
  @class
  @extends Anchor
*/
Selection$1.Cursor = function(path, offset) {
  Anchor.call(this, path, offset);
  this.type = "cursor";
};

Selection$1.Cursor.Prototype = function() {

  this.isPropertyFragment = function() {
    return false;
  };

  this.isNodeFragment = function() {
    return false;
  };

};

Anchor.extend(Selection$1.Cursor);

function Range(start, end, reverse, containerId) {
  this.start = start;
  this.end = end;
  this.reverse = Boolean(reverse);
  this.containerId = containerId;
}

Range.Prototype = function() {

  this._isRange = true;

  this.isCollapsed = function() {
    return this.start.equals(this.end);
  };

  this.equals = function(other) {
    if (this === other) return true;
    else {
      return (
        this.containerId === other.containerId &&
        this.start.equals(other.start) &&
        this.end.equals(other.end)
      );
    }
  };

  this.isReverse = function() {
    return this.reverse;
  };

  this.toString = function() {
    var str = [this.start.toString(), '->', this.end.toString()];
    if (this.isReverse()) {
      str.push('(reverse)');
    }
    return str.join('');
  };

};

oo.initClass(Range);

/**
  A selection which is bound to a property. Implements {@link model/Selection}.

  @class
  @extends model/Selection

  @example

  ```js
  var propSel = doc.createSelection({
    type: 'property',
    path: ['p1', 'content'],
    startOffset: 3,
    endOffset: 6
  });
*/
class PropertySelection extends Selection$1 {

  constructor(path, startOffset, endOffset, reverse, containerId, surfaceId) {
    super()

    /**
      The path to the selected property.
      @type {String[]}
    */
    this.path = path;

    /**
      Start character position.
      @type {Number}
    */
    this.startOffset = startOffset;

    /**
      End character position.
      @type {Number}
    */
    this.endOffset = endOffset;

    /**
      Selection direction.
      @type {Boolean}
    */
    this.reverse = Boolean(reverse);

    this.containerId = containerId;

    /**
      Identifier of the surface this selection should be active in.
      @type {String}
    */
    this.surfaceId = surfaceId;

    if (!path || !isNumber$1(startOffset)) {
      throw new Error('Invalid arguments: `path` and `startOffset` are mandatory');
    }

    // dynamic adapters for Coordinate oriented implementations
    this._internal.start = new CoordinateAdapter(this, 'path', 'startOffset');
    this._internal.end = new CoordinateAdapter(this, 'path', 'endOffset');
    this._internal.range = new RangeAdapter(this);
  }

  /**
    Convert container selection to JSON.

    @returns {Object}
  */
  toJSON() {
    return {
      type: 'property',
      path: this.path,
      startOffset: this.startOffset,
      endOffset: this.endOffset,
      reverse: this.reverse,
      containerId: this.containerId,
      surfaceId: this.surfaceId
    };
  }

  isPropertySelection() {
    return true;
  }

  getType() {
    return 'property';
  }

  isNull() {
    return false;
  }

  isCollapsed() {
    return this.startOffset === this.endOffset;
  }

  isReverse() {
    return this.reverse;
  }

  equals(other) {
    return (
      Selection$1.prototype.equals.call(this, other) &&
      (this.start.equals(other.start) && this.end.equals(other.end))
    );
  }

  toString() {
    /* istanbul ignore next */
    return [
      "PropertySelection(", JSON.stringify(this.path), ", ",
      this.startOffset, " -> ", this.endOffset,
      (this.reverse?", reverse":""),
      (this.surfaceId?(", "+this.surfaceId):""),
      ")"
    ].join('');
  }

  /**
    Collapse a selection to chosen direction.

    @param {String} direction either left of right
    @returns {PropertySelection}
  */
  collapse(direction) {
    var offset;
    if (direction === 'left') {
      offset = this.startOffset;
    } else {
      offset = this.endOffset;
    }
    return this.createWithNewRange(offset, offset);
  }

  // Helper Methods
  // ----------------------

  getRange() {
    return this.range;
  }

  /**
    Get path of a selection, e.g. target property where selected data is stored.

    @returns {String[]} path
  */
  getPath() {
    return this.path;
  }

  getNodeId() {
    return this.path[0];
  }

  /**
    Get start character position.

    @returns {Number} offset
  */
  getStartOffset() {
    return this.startOffset;
  }

  /**
    Get end character position.

    @returns {Number} offset
  */
  getEndOffset() {
    return this.endOffset;
  }

  /**
    Checks if this selection is inside another one.

    @param {Selection} other
    @param {Boolean} [strict] true if should check that it is strictly inside the other
    @returns {Boolean}
  */
  isInsideOf(other, strict) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      return other.contains(this, strict);
    }
    if (strict) {
      return (isEqual$1(this.path, other.path) &&
        this.startOffset > other.startOffset &&
        this.endOffset < other.endOffset);
    } else {
      return (isEqual$1(this.path, other.path) &&
        this.startOffset >= other.startOffset &&
        this.endOffset <= other.endOffset);
    }
  }

  /**
    Checks if this selection contains another one.

    @param {Selection} other
    @param {Boolean} [strict] true if should check that it is strictly contains the other
    @returns {Boolean}
  */
  contains(other, strict) {
    if (other.isNull()) return false;
    return other.isInsideOf(this, strict);
  }

  /**
    Checks if this selection overlaps another one.

    @param {Selection} other
    @param {Boolean} [strict] true if should check that it is strictly overlaps the other
    @returns {Boolean}
  */
  overlaps(other, strict) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.overlaps: delegating to ContainerSelection.overlaps...');
      return other.overlaps(this);
    }
    if (!isEqual$1(this.path, other.path)) return false;
    if (strict) {
      return (! (this.startOffset>=other.endOffset||this.endOffset<=other.startOffset) );
    } else {
      return (! (this.startOffset>other.endOffset||this.endOffset<other.startOffset) );
    }
  }

  /**
    Checks if this selection has the right boundary in common with another one.

    @param {Selection} other
    @returns {Boolean}
  */
  isRightAlignedWith(other) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.isRightAlignedWith: delegating to ContainerSelection.isRightAlignedWith...');
      return other.isRightAlignedWith(this);
    }
    return (isEqual$1(this.path, other.path) &&
      this.endOffset === other.endOffset);
  }

  /**
    Checks if this selection has the left boundary in common with another one.

    @param {Selection} other
    @returns {Boolean}
  */
  isLeftAlignedWith(other) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.isLeftAlignedWith: delegating to ContainerSelection.isLeftAlignedWith...');
      return other.isLeftAlignedWith(this);
    }
    return (isEqual$1(this.path, other.path) &&
      this.startOffset === other.startOffset);
  }

  /**
    Expands selection to include another selection.

    @param {Selection} other
    @returns {Selection} a new selection
  */
  expand(other) {
    if (other.isNull()) return this;

    // if the other is a ContainerSelection
    // we delegate to that implementation as it is more complex
    // and can deal with PropertySelections, too
    if (other.isContainerSelection()) {
      return other.expand(this);
    }
    if (!isEqual$1(this.path, other.path)) {
      throw new Error('Can not expand PropertySelection to a different property.');
    }
    var newStartOffset = Math.min(this.startOffset, other.startOffset);
    var newEndOffset = Math.max(this.endOffset, other.endOffset);
    return this.createWithNewRange(newStartOffset, newEndOffset);
  }

  /**
    Creates a new selection by truncating this one by another selection.

    @param {Selection} other
    @returns {Selection} a new selection
  */
  truncateWith(other) {
    if (other.isNull()) return this;
    if (other.isInsideOf(this, 'strict')) {
      // the other selection should overlap only on one side
      throw new Error('Can not truncate with a contained selections');
    }
    if (!this.overlaps(other)) {
      return this;
    }
    var otherStartOffset, otherEndOffset;
    if (other.isPropertySelection()) {
      otherStartOffset = other.startOffset;
      otherEndOffset = other.endOffset;
    } else if (other.isContainerSelection()) {
      // either the startPath or the endPath must be the same
      if (isEqual$1(other.startPath, this.path)) {
        otherStartOffset = other.startOffset;
      } else {
        otherStartOffset = this.startOffset;
      }
      if (isEqual$1(other.endPath, this.path)) {
        otherEndOffset = other.endOffset;
      } else {
        otherEndOffset = this.endOffset;
      }
    } else {
      return this;
    }

    var newStartOffset;
    var newEndOffset;
    if (this.startOffset > otherStartOffset && this.endOffset > otherEndOffset) {
      newStartOffset = otherEndOffset;
      newEndOffset = this.endOffset;
    } else if (this.startOffset < otherStartOffset && this.endOffset < otherEndOffset) {
      newStartOffset = this.startOffset;
      newEndOffset = otherStartOffset;
    } else if (this.startOffset === otherStartOffset) {
      if (this.endOffset <= otherEndOffset) {
        return Selection$1.nullSelection;
      } else {
        newStartOffset = otherEndOffset;
        newEndOffset = this.endOffset;
      }
    } else if (this.endOffset === otherEndOffset) {
      if (this.startOffset >= otherStartOffset) {
        return Selection$1.nullSelection;
      } else {
        newStartOffset = this.startOffset;
        newEndOffset = otherStartOffset;
      }
    } else if (other.contains(this)) {
      return Selection$1.nullSelection;
    } else {
      // FIXME: if this happens, we have a bug somewhere above
      throw new Error('Illegal state.');
    }
    return this.createWithNewRange(newStartOffset, newEndOffset);
  }

  /**
    Creates a new selection with given range and same path.

    @param {Number} startOffset
    @param {Number} endOffset
    @returns {Selection} a new selection
  */
  createWithNewRange(startOffset, endOffset) {
    var sel = new PropertySelection(this.path, startOffset, endOffset, false, this.containerId, this.surfaceId);
    var doc = this._internal.doc;
    if (doc) {
      sel.attach(doc);
    }
    return sel;
  }

  /**
    Return fragments for a given selection.

    @returns {Selection.Fragment[]}
  */
  getFragments() {
    if(this._internal.fragments) {
      return this._internal.fragments;
    }

    var fragments;

    if (this.isCollapsed()) {
      fragments = [new Selection$1.Cursor(this.path, this.startOffset)];
    } else {
      fragments = [new Selection$1.Fragment(this.path, this.startOffset, this.endOffset)];
    }

    this._internal.fragments = fragments;
    return fragments;
  }

  _clone() {
    return new PropertySelection(this.path, this.startOffset, this.endOffset, this.reverse, this.containerId, this.surfaceId);
  }

}

Object.defineProperties(PropertySelection.prototype, {
  /**
    @property {Coordinate} PropertySelection.start
  */
  start: {
    get: function() {
      return this._internal.start;
    },
    set: function() { throw new Error('PropertySelection.prototype.start is read-only.'); },
    enumerable: false
  },
  /**
    @property {Coordinate} PropertySelection.end
  */
  end: {
    get: function() {
      return this._internal.end;
    },
    set: function() { throw new Error('PropertySelection.prototype.end is read-only.'); },
    enumerable: false
  },
  range: {
    get: function() {
      return this._internal.range;
    },
    set: function() { throw new Error('PropertySelection.prototype.range is read-only.'); },
    enumerable: false
  },

  // making this similar to ContainerSelection
  startPath: {
    get: function() {
      return this.path;
    },
    set: function() { throw new Error('immutable.'); },
    enumerable: false
  },
  endPath: {
    get: function() {
      return this.path;
    },
    set: function() { throw new Error('immutable.'); },
    enumerable: false
  },
});

PropertySelection.fromJSON = function(json) {
  var path = json.path;
  var startOffset = json.startOffset;
  var endOffset = json.hasOwnProperty('endOffset') ? json.endOffset : json.startOffset;
  var reverse = json.reverse;
  var containerId = json.containerId;
  var surfaceId = json.surfaceId;
  return new PropertySelection(path, startOffset, endOffset, reverse, containerId, surfaceId);
}

/*
  Adapter for Coordinate oriented implementations.
  E.g. Coordinate transforms can be applied to update selections
  using OT.
*/
function CoordinateAdapter(propertySelection, pathProperty, offsetProperty) {
  this._sel = propertySelection;
  this._pathProp = pathProperty;
  this._offsetProp = offsetProperty;
  Object.freeze(this);
}

Coordinate.extend(CoordinateAdapter);

Object.defineProperties(CoordinateAdapter.prototype, {
  path: {
    get: function() {
      return this._sel[this._pathProp];
    },
    set: function(path) {
      this._sel[this._pathProp] = path;
    }
  },
  offset: {
    get: function() {
      return this._sel[this._offsetProp];
    },
    set: function(offset) {
      this._sel[this._offsetProp] = offset;
    }
  }
});

PropertySelection.CoordinateAdapter = CoordinateAdapter;

function RangeAdapter(sel) {
  this._sel = sel;
  this.start = sel.start;
  this.end = sel.end;
  Object.freeze(this);
}

Range.extend(RangeAdapter);

Object.defineProperties(RangeAdapter.prototype, {
  reverse: {
    get: function() {
      return this._sel.reverse;
    },
    set: function(reverse) {
      this._sel.reverse = reverse;
    }
  },
  containerId: {
    get: function() {
      return this._sel.containerId;
    },
    set: function(containerId) {
      this._sel.containerId = containerId;
    }
  },
  surfaceId: {
    get: function() {
      return this._sel.surfaceId;
    },
    set: function(surfaceId) {
      this._sel.surfaceId = surfaceId;
    }
  },
});

PropertySelection.RangeAdapter = RangeAdapter;

const CoordinateAdapter$1 = PropertySelection.CoordinateAdapter
const RangeAdapter$1 = PropertySelection.RangeAdapter

/**
  A selection spanning multiple nodes.

  @class
  @extends PropertySelection

  @example

  ```js
  var containerSel = doc.createSelection({
    type: 'container',
    containerId: 'body',
    startPath: ['p1', 'content'],
    startOffset: 5,
    endPath: ['p3', 'content'],
    endOffset: 4,
  });
  ```
*/
class ContainerSelection extends Selection$1 {

  constructor(containerId, startPath, startOffset, endPath, endOffset, reverse, surfaceId) {
    super()

    /**
      @type {String}
    */
    this.containerId = containerId;

    /**
      The path of the property where this annotations starts.
      @type {String[]}
    */
    this.startPath = startPath;

    /**
      The character position where this annotations starts.
      @type {Number}
    */
    this.startOffset = startOffset;

    /**
      The path of the property where this annotations ends.
      @type {String[]}
    */
    this.endPath = endPath;

    /**
      The character position where this annotations ends.
      @type {Number}
    */
    this.endOffset = endOffset;


    this.reverse = Boolean(reverse);

    this.surfaceId = surfaceId;

    if (!this.containerId || !this.startPath || !isNumber$1(this.startOffset) ||
     !this.endPath || !isNumber$1(this.endOffset) ) {
      throw new Error('Invalid arguments: `containerId`, `startPath`, `startOffset`, `endPath`, and `endOffset` are mandatory');
    }

    // dynamic adapters for Coordinate oriented implementations
    this._internal.start = new CoordinateAdapter$1(this, 'startPath', 'startOffset');
    this._internal.end = new CoordinateAdapter$1(this, 'endPath', 'endOffset');
    this._internal.range = new RangeAdapter$1(this);
  }

  // for duck-typed instanceof
  get _isContainerSelection() { return true }

  toJSON() {
    return {
      type: 'container',
      containerId: this.containerId,
      startPath: this.startPath,
      startOffset: this.startOffset,
      endPath: this.endPath,
      endOffset: this.endOffset,
      reverse: this.reverse,
      surfaceId: this.surfaceId
    };
  }


  isContainerSelection() {
    return true;
  }

  getType() {
    return 'container';
  }

  isNull() {
    return false;
  }

  isCollapsed() {
    return this.start.equals(this.end);
  }

  isReverse() {
    return this.reverse;
  }

  equals(other) {
    return (
      Selection$1.prototype.equals.call(this, other) &&
      this.containerId === other.containerId &&
      (this.start.equals(other.start) && this.end.equals(other.end))
    );
  }

  toString() {
    /* istanbul ignore next */
    return [
      "ContainerSelection(",
      this.containerId, ", ",
      JSON.stringify(this.startPath), ", ", this.startOffset,
      " -> ",
      JSON.stringify(this.startPath), ", ", this.endOffset,
      (this.reverse?", reverse":""),
      (this.surfaceId?(", "+this.surfaceId):""),
      ")"
    ].join('');
  }

  /**
    @return {model/Container} The container node instance for this selection.
  */
  getContainer() {
    if (!this._internal.container) {
      this._internal.container = this.getDocument().get(this.containerId);
    }
    return this._internal.container;
  }

  isInsideOf(other, strict) {
    // Note: this gets called from PropertySelection.contains()
    // because this implementation can deal with mixed selection types.
    if (other.isNull()) return false;
    strict = Boolean(strict);
    var r1 = this._range(this);
    var r2 = this._range(other);
    return (r2.start.isBefore(r1.start, strict) &&
      r1.end.isBefore(r2.end, strict));
  }

  contains(other, strict) {
    // Note: this gets called from PropertySelection.isInsideOf()
    // because this implementation can deal with mixed selection types.
    if (other.isNull()) return false;
    strict = Boolean(strict);
    var r1 = this._range(this);
    var r2 = this._range(other);
    return (r1.start.isBefore(r2.start, strict) &&
      r2.end.isBefore(r1.end, strict));
  }

  containsNodeFragment(nodeId, strict) {
    var container = this.getContainer();
    var coor = new Coordinate([nodeId], 0);
    var address = container.getAddress(coor);
    var r = this._range(this);
    // console.log('ContainerSelection.containsNodeFragment', address, 'is within', r.start, '->', r.end, '?');
    var contained = r.start.isBefore(address, strict);
    if (contained) {
      address.offset = 1;
      contained = r.end.isAfter(address, strict);
    }
    return contained;
  }

  overlaps(other) {
    var r1 = this._range(this);
    var r2 = this._range(other);
    // it overlaps if they are not disjunct
    return !(r1.end.isBefore(r2.start, false) ||
      r2.end.isBefore(r1.start, false));
  }

  isLeftAlignedWith(other) {
    var r1 = this._range(this);
    var r2 = this._range(other);
    return r1.start.isEqual(r2.start);
  }

  isRightAlignedWith(other) {
    var r1 = this._range(this);
    var r2 = this._range(other);
    return r1.end.isEqual(r2.end);
  }

  containsNode(nodeId) {
    var container = this.getContainer();
    var startPos = container.getPosition(this.startPath[0]);
    var endPos = container.getPosition(this.endPath[0]);
    var pos = container.getPosition(nodeId);
    if ((startPos>pos || endPos<pos) ||
        (startPos === pos && this.startPath.length === 1 && this.startOffset > 0) ||
        (endPos === pos && this.endPath.length === 1 && this.endOffset < 1)) {
      return false;
    }
    return true;
  }

  /**
    Collapse a selection to chosen direction.

    @param {String} direction either left of right
    @returns {PropertySelection}
  */
  collapse(direction) {
    var coor;
    if (direction === 'left') {
      coor = this.start;
    } else {
      coor = this.end;
    }
    return _createNewSelection(this, coor, coor);
  }

  expand(other) {
    var r1 = this._range(this);
    var r2 = this._range(other);
    var start;
    var end;

    if (r1.start.isEqual(r2.start)) {
      start = new Coordinate(this.start.path, Math.min(this.start.offset, other.start.offset));
    } else if (r1.start.isAfter(r2.start)) {
      start = new Coordinate(other.start.path, other.start.offset);
    } else {
      start = this.start;
    }
    if (r1.end.isEqual(r2.end)) {
      end = new Coordinate(this.end.path, Math.max(this.end.offset, other.end.offset));
    } else if (r1.end.isBefore(r2.end, false)) {
      end = new Coordinate(other.end.path, other.end.offset);
    } else {
      end = this.end;
    }

    return _createNewSelection(this, start, end);
  }

  truncateWith(other) {
    if (other.isInsideOf(this, 'strict')) {
      // the other selection should overlap only on one side
      throw new Error('Can not truncate with a contained selections');
    }
    if (!this.overlaps(other)) {
      return this;
    }
    var r1 = this._range(this);
    var r2 = this._range(other);
    var start, end;
    if (r2.start.isBefore(r1.start, 'strict') && r2.end.isBefore(r1.end, 'strict')) {
      start = other.end;
      end = this.end;
    } else if (r1.start.isBefore(r2.start, 'strict') && r1.end.isBefore(r2.end, 'strict')) {
      start = this.start;
      end = other.start;
    } else if (r1.start.isEqual(r2.start)) {
      if (r2.end.isBefore(r1.end, 'strict')) {
        start = other.end;
        end = this.end;
      } else {
        // the other selection is larger which eliminates this one
        return Selection$1.nullSelection;
      }
    } else if (r1.end.isEqual(r2.end)) {
      if (r1.start.isBefore(r2.start, 'strict')) {
        start = this.start;
        end = other.start;
      } else {
        // the other selection is larger which eliminates this one
        return Selection$1.nullSelection;
      }
    } else if (this.isInsideOf(other)) {
      return Selection$1.nullSelection;
    } else {
      throw new Error('Could not determine coordinates for truncate. Check input');
    }
    return _createNewSelection(this, start, end);
  }

  /**
    Helper to create selection fragments for this ContainerSelection.

    Used for selection rendering, for instance.

    @returns {Selection.Fragment[]} Fragments resulting from splitting this into property selections.
  */
  getFragments() {
    if(this._internal.fragments) {
      return this._internal.fragments;
    }

    /*
      NOTE:
        This implementation is a bit more complicated
        to simplify implementations at other places.
        A ContainerSelections can be seen as a list of property and node
        fragments.
        The following implementation is covering all cases in a canonical
        way, considering all combinations of start end end coordinates
        either given as ([nodeId, propertyName], offset) or
        ([nodeId], 0|1).
    */


    var fragments = [];

    var doc = this.getDocument();
    var container = this.getContainer();
    var startPos = container.getPosition(this.startPath[0]);
    var endPos = container.getPosition(this.endPath[0]);

    var coor, node, nodeId, fragment, path, offset, text;
    if (startPos !== endPos) {

      // First fragment can either be a property fragment (fully or partial) or a node fragment
      coor = this.start;
      path = coor.path;
      offset = coor.offset;
      nodeId = path[0];
      node = doc.get(nodeId);
      if (!node) {
        throw new Error('Node does not exist:' + nodeId);
      }
      // coordinate is a property coordinate
      if (coor.isPropertyCoordinate()) {
        text = doc.get(path);
        fragment = new Selection$1.Fragment(path, offset, text.length, (offset === 0));
        fragments.push(fragment);
      }
      // coordinate is a node coordinate (before)
      else if (coor.isNodeCoordinate() && offset === 0) {
        fragments.push(
          new Selection$1.NodeFragment(node.id)
        );
      }

      // fragments in-between are either full property fragments or node fragments
      for (var pos= startPos+1; pos < endPos; pos++) {
        node = container.getChildAt(pos);
        if (node.isText()) {
          path = [node.id, 'content'];
          text = doc.get(path);
          fragments.push(
            new Selection$1.Fragment(path, 0, text.length, true)
          );
        } else {
          fragments.push(
            new Selection$1.NodeFragment(container.nodes[pos])
          );
        }
      }

      // last fragment is again either a property fragment (fully or partial) or a node fragment
      coor = this.end;
      path = coor.path;
      offset = coor.offset;
      nodeId = path[0];
      node = doc.get(nodeId);
      if (!node) {
        throw new Error('Node does not exist:' + nodeId);
      }
      // coordinate is a property coordinate
      if (coor.isPropertyCoordinate()) {
        text = doc.get(path);
        fragment = new Selection$1.Fragment(path, 0, offset, (offset === text.length));
        fragments.push(fragment);
      }
      // coordinate is a node coordinate (after)
      else if (coor.isNodeCoordinate() && offset > 0) {
        fragments.push(
          new Selection$1.NodeFragment(node.id)
        );
      }
    } else {
      // startPos === endPos
      path = this.start.path;
      nodeId = path[0];
      node = doc.get(nodeId);
      var startIsNodeCoordinate = this.start.isNodeCoordinate();
      var endIsNodeCoordinate = this.end.isNodeCoordinate();
      if (!node.isText()) {
        fragments.push(
          new Selection$1.NodeFragment(nodeId)
        );
      } else if (startIsNodeCoordinate && endIsNodeCoordinate && this.startOffset < this.endOffset) {
        fragments.push(
          new Selection$1.NodeFragment(nodeId)
        );
      } else if (!startIsNodeCoordinate && endIsNodeCoordinate && this.endOffset > 0) {
        text = doc.get(this.startPath);
        fragments.push(
          new Selection$1.Fragment(path, this.startOffset, text.length, (this.startOffset === 0))
        );
      } else if (startIsNodeCoordinate && !endIsNodeCoordinate && this.startOffset === 0) {
        text = doc.get(this.endPath);
        fragments.push(
          new Selection$1.Fragment(path, 0, this.endOffset, (this.endOffset === text.length))
        );
      } else if (!startIsNodeCoordinate && !endIsNodeCoordinate) {
        text = doc.get(this.startPath);
        fragments.push(
          new Selection$1.Fragment(path, this.startOffset, this.endOffset, (this.startOffset === 0 && this.endOffset === text.length))
        );
      }
    }

    this._internal.fragments = fragments;

    return fragments;
  }

  /**
    Splits a container selection into property selections.

    @returns {PropertySelection[]}
  */
  splitIntoPropertySelections() {
    var sels = [];
    var fragments = this.getFragments();
    fragments.forEach(function(fragment) {
      if (fragment instanceof Selection$1.Fragment) {
        sels.push(
          new PropertySelection(fragment.path, fragment.startOffset,
            fragment.endOffset, false, this.containerId, this.surfaceId)
        );
      }
    }.bind(this));
    return sels;
  }

  _clone() {
    return new ContainerSelection(this.containerId, this.startPath, this.startOffset, this.endPath, this.endOffset, this.reverse, this.surfaceId);
  }

  _range(sel) {
    // EXPERIMENTAL: caching the internal address based range
    // as we use it very often.
    // However, this is dangerous as this data can get invalid by a change
    if (sel._internal.addressRange) {
      return sel._internal.addressRange;
    }

    var container = this.getContainer();
    var startAddress = container.getAddress(sel.start);
    var endAddress;
    if (sel.isCollapsed()) {
      endAddress = startAddress;
    } else {
      endAddress = container.getAddress(sel.end);
    }
    var addressRange = {
      start: startAddress,
      end: endAddress
    };
    if (sel._isContainerSelection) {
      sel._internal.addressRange = addressRange;
    }
    return addressRange;
  }
}

function _createNewSelection(containerSel, start, end) {
  var newSel = new ContainerSelection(containerSel.containerId,
    start.path, start.offset, end.path, end.offset, false, containerSel.surfaceId);
  // we need to attach the new selection
  var doc = containerSel._internal.doc;
  if (doc) {
    newSel.attach(doc);
  }
  return newSel;
}

Object.defineProperties(ContainerSelection.prototype, {
  path: {
    get: function() {
      throw new Error('ContainerSelection has no path property. Use startPath and endPath instead');
    },
    set: function() {
      throw new Error('ContainerSelection has no path property. Use startPath and endPath instead.');
    }
  },
  /**
    @property {Coordinate} ContainerSelection.start
  */
  start: {
    get: function() {
      return this._internal.start;
    },
    set: function() { throw new Error('ContainerSelection.prototype.start is read-only.'); }
  },
  /**
    @property {Coordinate} ContainerSelection.end
  */
  end: {
    get: function() {
      return this._internal.end;
    },
    set: function() { throw new Error('ContainerSelection.prototype.end is read-only.'); }
  },

  range: {
    get: function() {
      return this._internal.range;
    },
    set: function() { throw new Error('ContainerSelection.prototype.range is read-only.'); }
  },

});

ContainerSelection.fromJSON = function(properties) {
  // Note: not calling the super ctor as it freezes the instance
  var containerId = properties.containerId;
  var startPath = properties.startPath;
  var endPath = properties.endPath || properties.startPath;
  var startOffset = properties.startOffset;
  var endOffset = properties.endOffset;
  var reverse = Boolean(properties.reverse);
  // Note: to be able to associate selections with surfaces we decided
  // to introduce this optional property
  var surfaceId = properties.surfaceId;
  var sel = new ContainerSelection(containerId, startPath, startOffset, endPath, endOffset, reverse, surfaceId);
  return sel;
}

class NodeSelection extends Selection$1 {

  constructor(containerId, nodeId, mode, reverse, surfaceId) {
    super()

    if (!isString$1(containerId)) {
      throw new Error("'containerId' is mandatory.");
    }
    if (!isString$1(nodeId)) {
      throw new Error("'nodeId' is mandatory.");
    }
    if (['full', 'before', 'after'].indexOf(mode) < 0) {
      throw new Error("'mode' is mandatory.");
    }

    this.containerId = containerId;
    this.nodeId = nodeId;
    this.mode = mode;
    this.reverse = Boolean(reverse);
    this.surfaceId = surfaceId;
  }

  // for duck-typed instanceof
  get _isNodeSelection() { return true }


  equals(other) {
    return (
      super.equals(other) &&
      this.nodeId === other.nodeId &&
      this.mode === other.mode
    )
  }

  isNodeSelection() {
    return true;
  }

  getType() {
    return 'node';
  }

  getNodeId() {
    return this.nodeId;
  }

  isFull() {
    return this.mode === 'full';
  }

  isBefore() {
    return this.mode === 'before';
  }

  isAfter() {
    return this.mode === 'after';
  }

  isCollapsed() {
    return this.mode !== 'full';
  }

  toJSON() {
    return {
      containerId: this.containerId,
      nodeId: this.nodeId,
      mode: this.mode,
      reverse: this.reverse,
      surfaceId: this.surfaceId
    };
  }

  toString() {
    /* istanbul ignore next */
    return [
      "NodeSelection(",
      this.containerId, ".", this.nodeId, ", ",
      this.mode, ", ",
      (this.reverse?", reverse":""),
      (this.surfaceId?(", "+this.surfaceId):""),
      ")"
    ].join('');
  }

  collapse(direction) {
    if (direction === 'left') {
      if (this.isBefore()) {
        return this;
      } else {
        return new NodeSelection(this.containerId, this.nodeId, 'before', this.reverse, this.surfaceId);
      }
    } else if (direction === 'right') {
      if (this.isAfter()) {
        return this;
      } else {
        return new NodeSelection(this.containerId, this.nodeId, 'after', this.reverse, this.surfaceId);
      }
    } else {
      throw new Error("'direction' must be either 'left' or 'right'");
    }
  }

  _getCoordinate() {
    if (this.mode === 'before') {
      return new Coordinate([this.nodeId], 0);
    } else if (this.mode === 'after') {
      return new Coordinate([this.nodeId], 1);
    }
  }

}

NodeSelection.fromJSON = function(json) {
  return new NodeSelection(json.containerId, json.nodeId, json.mode, json.reverse);
}

NodeSelection._createFromRange = function(range) {
  var containerId = range.containerId;
  var nodeId = range.start.getNodeId();
  var startOffset = range.start.offset;
  var endOffset = range.end.offset;
  var reverse = range.reverse;
  var mode;
  if (startOffset === endOffset) {
    mode = startOffset === 0 ? 'before' : 'after';
  } else {
    mode = 'full';
  }
  return new NodeSelection(containerId, nodeId, mode, reverse);
};

NodeSelection._createFromCoordinate = function(coor) {
  var containerId = coor.containerId;
  var nodeId = coor.getNodeId();
  var mode = coor.offset === 0 ? 'before' : 'after';
  return new NodeSelection(containerId, nodeId, mode, false);
};

class CustomSelection extends Selection$1 {
  constructor(customType, data, surfaceId) {
    super()

    this.customType = customType;
    this.data = data;

    this.surfaceId = surfaceId;
  }

  isCustomSelection() {
    return true;
  }

  getType() {
    return 'custom';
  }

  getCustomType() {
    return this.customType;
  }

  toJSON() {
    return {
      type: 'custom',
      customType: this.customType,
      data: cloneDeep$1(this.data),
      surfaceId: this.surfaceId
    };
  }

  toString() {
    /* istanbul ignore next */
    return [
      'CustomSelection(',
      this.customType,', ',
      JSON.stringify(this.data),
      ")"
    ].join('');
  }

  equals(other) {
    return (
      Selection$1.prototype.equals.call(this, other) &&
      other.isCustomSelection() &&
      isEqual$1(this.data, other.data)
    );
  }

  _clone() {
    return new CustomSelection(this.customType, this.data, this.surfaceId)
  }
}

CustomSelection.fromJSON = function(json) {
  return new CustomSelection(json.customType, json.data || {}, json.surfaceId);
}

function fromJSON(json) {
  if (!json) return Selection.nullSelection;
  var type = json.type;
  switch(type) {
    case 'property':
      return PropertySelection.fromJSON(json);
    case 'container':
      return ContainerSelection.fromJSON(json);
    case 'node':
      return NodeSelection.fromJSON(json);
    case 'custom':
      return CustomSelection.fromJSON(json);
    default:
      // console.error('Selection.fromJSON(): unsupported selection data', json);
      return Selection.nullSelection;
  }
}

/*

  States:

  - Provisional:

    Change has been applied to the document already. Subsequent changes might be merged
    into it, to achieve a more natural representation.

  - Final:

    Change has been finalized.

  - Pending:

    Change has been committed to the collaboration hub.

  - Acknowledged:

    Change has been applied and acknowledged by the server.
*/
function DocumentChange(ops, before, after) {
  if (arguments.length === 1 && isObject$1(arguments[0])) {
    var data = arguments[0];
    // a unique id for the change
    this.sha = data.sha;
    // when the change has been applied
    this.timestamp = data.timestamp;
    // application state before the change was applied
    this.before = data.before;
    // array of operations
    this.ops = data.ops;
    this.info = data.info; // custom change info
    // application state after the change was applied
    this.after = data.after;
  } else if (arguments.length === 3) {
    this.sha = uuid$1();
    this.info = {};
    this.timestamp = Date.now();
    this.ops = ops.slice(0);
    this.before = before;
    this.after = after;
  } else {
    throw new Error('Illegal arguments.');
  }
  // a hash with all updated properties
  this.updated = null;
  // a hash with all created nodes
  this.created = null;
  // a hash with all deleted nodes
  this.deleted = null;
}

DocumentChange.Prototype = function() {

  /*
    Extract aggregated information about which nodes and properties have been affected.
    This gets called by Document after applying the change.
  */
  this._extractInformation = function(doc) {
    var ops = this.ops;
    var created = {};
    var deleted = {};
    var updated = {};
    var affectedContainerAnnos = [];

    // TODO: we will introduce a special operation type for coordinates
    function _checkAnnotation(op) {
      var node = op.val;
      var path, propName;
      switch (op.type) {
        case "create":
        case "delete":
          // HACK: detecting annotation changes in an opportunistic way
          if (node.hasOwnProperty('startOffset')) {
            path = node.path || node.startPath;
            updated[path] = true;
          }
          if (node.hasOwnProperty('endPath')) {
            path = node.endPath;
            updated[path] = true;
          }
          break;
        case "update":
        case "set":
          // HACK: detecting annotation changes in an opportunistic way
          node = doc.get(op.path[0]);
          if (node) {
            propName = op.path[1];
            if (node.isPropertyAnnotation()) {
              if ((propName === 'path' || propName === 'startOffset' ||
                   propName === 'endOffset') && !deleted[node.path[0]]) {
                updated[node.path] = true;
              }
            } else if (node.isContainerAnnotation()) {
              if (propName === 'startPath' || propName === 'startOffset' ||
                  propName === 'endPath' || propName === 'endOffset') {
                affectedContainerAnnos.push(node);
              }
            }
          }
          break;
        default:
          throw new Error('Illegal state');
      }
    }

    for (var i = 0; i < ops.length; i++) {
      var op = ops[i];
      if (op.type === "create") {
        created[op.val.id] = op.val;
        delete deleted[op.val.id];
      }
      if (op.type === "delete") {
        delete created[op.val.id];
        deleted[op.val.id] = op.val;
      }
      if (op.type === "set" || op.type === "update") {
        // The old as well the new one is affected
        updated[op.path] = true;
      }
      _checkAnnotation(op);
    }

    affectedContainerAnnos.forEach(function(anno) {
      var container = doc.get(anno.containerId, 'strict');
      var startPos = container.getPosition(anno.startPath[0]);
      var endPos = container.getPosition(anno.endPath[0]);
      for (var pos = startPos; pos <= endPos; pos++) {
        var node = container.getChildAt(pos);
        var path;
        if (node.isText()) {
          path = [node.id, 'content'];
        } else {
          path = [node.id];
        }
        if (!deleted[node.id]) {
          updated[path] = true;
        }
      }
    });

    // remove all deleted nodes from updated
    if(Object.keys(deleted).length > 0) {
      forEach$1(updated, function(_, key) {
        var nodeId = key.split(',')[0];
        if (deleted[nodeId]) {
          delete updated[key];
        }
      });
    }

    this.created = created;
    this.deleted = deleted;
    this.updated = updated;
  };

  this.invert = function() {
    // shallow cloning this
    var copy = this.toJSON();
    copy.ops = [];
    // swapping before and after
    var tmp = copy.before;
    copy.before = copy.after;
    copy.after = tmp;
    var inverted = DocumentChange.fromJSON(copy);
    var ops = [];
    for (var i = this.ops.length - 1; i >= 0; i--) {
      ops.push(this.ops[i].invert());
    }
    inverted.ops = ops;
    return inverted;
  };

  // Inspection API used by DocumentChange listeners
  // ===============================================

  this.isAffected = function(path) {
    return this.updated[path];
  };

  this.isUpdated = this.isAffected;

  /*
    TODO serializers and deserializers should allow
    for application data in 'after' and 'before'
  */

  this.serialize = function() {
    var opSerializer = new OperationSerializer();
    var data = this.toJSON();
    data.ops = this.ops.map(function(op) {
      return opSerializer.serialize(op);
    });
    return JSON.stringify(data);
  };

  this.clone = function() {
    return DocumentChange.fromJSON(this.toJSON());
  };

  this.toJSON = function() {
    var data = {
      // to identify this change
      sha: this.sha,
      // before state
      before: clone$1(this.before),
      ops: map$1(this.ops, function(op) {
        return op.toJSON();
      }),
      info: this.info,
      // after state
      after: clone$1(this.after),
    };

    // Just to make sure rich selection objects don't end up
    // in the JSON result
    data.after.selection = undefined;
    data.before.selection = undefined;

    var sel = this.before.selection;
    if (sel && sel._isSelection) {
      data.before.selection = sel.toJSON();
    }
    sel = this.after.selection;
    if (sel && sel._isSelection) {
      data.after.selection = sel.toJSON();
    }
    return data;
  };
};

oo.initClass(DocumentChange);

DocumentChange.deserialize = function(str) {
  var opSerializer = new OperationSerializer();
  var data = JSON.parse(str);
  data.ops = data.ops.map(function(opData) {
    return opSerializer.deserialize(opData);
  });
  if (data.before.selection) {
    data.before.selection = fromJSON(data.before.selection);
  }
  if (data.after.selection) {
    data.after.selection = fromJSON(data.after.selection);
  }
  return new DocumentChange(data);
};

DocumentChange.fromJSON = function(data) {
  // Don't write to original object on deserialization
  var change = cloneDeep$1(data);
  change.ops = data.ops.map(function(opData) {
    return ObjectOperation.fromJSON(opData);
  });
  change.before.selection = fromJSON(data.before.selection);
  change.after.selection = fromJSON(data.after.selection);
  return new DocumentChange(change);
};

/*
  Transforms change A with B, as if A was done before B.
  A' and B' can be used to update two clients to get to the
  same document content.

     / A - B' \
  v_n          v_n+1
     \ B - A' /
*/
DocumentChange.transformInplace = function(A, B) {
  _transformInplaceBatch(A, B);
};

function _transformInplaceSingle(a, b) {
  for (var i = 0; i < a.ops.length; i++) {
    var a_op = a.ops[i];
    for (var j = 0; j < b.ops.length; j++) {
      var b_op = b.ops[j];
      // ATTENTION: order of arguments is important.
      // First argument is the dominant one, i.e. it is treated as if it was applied before
      ObjectOperation.transform(a_op, b_op, {inplace: true});
    }
  }
  if (a.before) {
    _transformSelectionInplace(a.before.selection, b);
  }
  if (a.after) {
    _transformSelectionInplace(a.after.selection, b);
  }
  if (b.before) {
    _transformSelectionInplace(b.before.selection, a);
  }
  if (b.after) {
    _transformSelectionInplace(b.after.selection, a);
  }
}

function _transformInplaceBatch(A, B) {
  if (!isArray$1(A)) {
    A = [A];
  }
  if (!isArray$1(B)) {
    B = [B];
  }
  for (var i = 0; i < A.length; i++) {
    var a = A[i];
    for (var j = 0; j < B.length; j++) {
      var b = B[j];
      _transformInplaceSingle(a,b);
    }
  }
}

function _transformSelectionInplace(sel, a) {
  if (!sel || (!sel.isPropertySelection() && !sel.isContainerSelection()) ) {
    return false;
  }
  var ops = a.ops;
  var hasChanged = false;
  var isCollapsed = sel.isCollapsed();
  for(var i=0; i<ops.length; i++) {
    var op = ops[i];
    hasChanged |= _transformCoordinateInplace(sel.start, op);
    if (!isCollapsed) {
      hasChanged |= _transformCoordinateInplace(sel.end, op);
    } else {
      if (sel.isContainerSelection()) {
        sel.endPath = sel.startPath;
      }
      sel.endOffset = sel.startOffset;
    }
  }
  return hasChanged;
}

DocumentChange.transformSelection = function(sel, a) {
  var newSel = sel.clone();
  var hasChanged = _transformSelectionInplace(newSel, a);
  if (hasChanged) {
    return newSel;
  } else {
    return sel;
  }
};

function _transformCoordinateInplace(coor, op) {
  if (!isEqual$1(op.path, coor.path)) return false;
  var hasChanged = false;
  if (op.type === 'update' && op.propertyType === 'string') {
    var diff = op.diff;
    var newOffset;
    if (diff.isInsert() && diff.pos <= coor.offset) {
      newOffset = coor.offset + diff.str.length;
      // console.log('Transforming coordinate after inserting %s chars:', diff.str.length, coor.toString(), '->', newOffset);
      coor.offset = newOffset;
      hasChanged = true;
    } else if (diff.isDelete() && diff.pos <= coor.offset) {
      newOffset = Math.max(diff.pos, coor.offset - diff.str.length);
      // console.log('Transforming coordinate after deleting %s chars:', diff.str.length, coor.toString(), '->', newOffset);
      coor.offset = newOffset;
      hasChanged = true;
    }
  }
  return hasChanged;
}

/*
  Engine for realizing collaborative editing. Implements the server-methods of
  the real time editing as a reusable library.
*/
class CollabEngine extends EventEmitter {
  constructor(documentEngine) {
    super()

    this.documentEngine = documentEngine

    // Active collaborators
    this._collaborators = {}
  }

  /*
    Register collaborator for a given documentId
  */
  _register(collaboratorId, documentId, selection, collaboratorInfo) {
    let collaborator = this._collaborators[collaboratorId]

    if (!collaborator) {
      collaborator = this._collaborators[collaboratorId] = {
        collaboratorId: collaboratorId,
        documents: {}
      }
    }

    // Extend with collaboratorInfo if available
    collaborator.info = collaboratorInfo

    // Register document
    collaborator.documents[documentId] = {
      selection: selection
    }
  }

  /*
    Unregister collaborator id from document
  */
  _unregister(collaboratorId, documentId) {
    let collaborator = this._collaborators[collaboratorId]
    delete collaborator.documents[documentId]
    let docCount = Object.keys(collaborator.documents).length
    // If there is no doc left, we can remove the entire collaborator entry
    if (docCount === 0) {
      delete this._collaborators[collaboratorId]
    }
  }

  _updateSelection(collaboratorId, documentId, sel) {
    let docEntry = this._collaborators[collaboratorId].documents[documentId]
    docEntry.selection = sel
  }

  /*
    Get list of active documents for a given collaboratorId
  */
  getDocumentIds(collaboratorId) {
    let collaborator = this._collaborators[collaboratorId]
    if (!collaborator) {
      // console.log('CollabEngine.getDocumentIds', collaboratorId, 'not found');
      // console.log('CollabEngine._collaborators', this._collaborators);
      return []
    }
    return Object.keys(collaborator.documents)
  }

  /*
    Get collaborators for a specific document
  */
  getCollaborators(documentId, collaboratorId) {
    let collaborators = {}
    forEach$1(this._collaborators, function(collab) {
      let doc = collab.documents[documentId]
      if (doc && collab.collaboratorId !== collaboratorId) {
        let entry = {
          selection: doc.selection,
          collaboratorId: collab.collaboratorId
        }
        entry = extend$1({}, collab.info, entry)
        collaborators[collab.collaboratorId] = entry
      }
    })
    return collaborators
  }

  /*
    Get only collaborator ids for a specific document
  */
  getCollaboratorIds(documentId, collaboratorId) {
    let collaborators = this.getCollaborators(documentId, collaboratorId)
    return map$1(collaborators, function(c) {
      return c.collaboratorId
    })
  };

  /*
    Client starts a sync

    @param args.documentId
    @param args.version The client's document version (0 if client starts with an empty doc)
    @param args.change pending client change

    Note: a client can reconnect having a pending change
    which is similar to the commit case
  */
  sync(args, cb) {
    // We now always get a change since the selection should be considered
    this._sync(args, function(err, result) {
      if (err) return cb(err)
      // Registers the collaborator If not already registered for that document
      this._register(args.collaboratorId, args.documentId, result.change.after.selection, args.collaboratorInfo)
      cb(null, result)
    }.bind(this))
  }

  /*
    Internal implementation of sync

    @param {String} args.collaboratorId collaboratorId
    @param {String} args.documentId document id
    @param {Number} args.version client version
    @param {Number} args.change new change

    OUT: version, changes, version
  */
  _sync(args, cb) {
    // Get latest doc version
    this.documentEngine.getVersion(args.documentId, function(err, serverVersion) {
      if (serverVersion === args.version) { // Fast forward update
        this._syncFF(args, cb)
      } else if (serverVersion > args.version) { // Client changes need to be rebased to latest serverVersion
        this._syncRB(args, cb)
      } else {
        cb(new SubstanceError('InvalidVersionError', {
          message: 'Client version greater than server version'
        }))
      }
    }.bind(this))
  }

  /*
    Update all collaborators selections of a document according to a given change

    WARNING: This has not been tested quite well
  */
  _updateCollaboratorSelections(documentId, change) {
    // By not providing the 2nd argument to getCollaborators the change
    // creator is also included.
    let collaborators = this.getCollaborators(documentId)

    forEach$1(collaborators, function(collaborator) {
      if (collaborator.selection) {
        let sel = Selection$1.fromJSON(collaborator.selection)
        change = this.deserializeChange(change)
        sel = DocumentChange.transformSelection(sel, change)
        // Write back the transformed selection to the server state
        this._updateSelection(collaborator.collaboratorId, documentId, sel.toJSON())
      }
    }.bind(this))
  }

  /*
    Fast forward sync (client version = server version)
  */
  _syncFF(args, cb) {
    this._updateCollaboratorSelections(args.documentId, args.change)

    // HACK: On connect we may receive a nop that only has selection data.
    // We don't want to store such changes.
    // TODO: it would be nice if we could handle this in a different
    // branch of connect, so we don't spoil the commit implementation
    if (args.change.ops.length === 0) {
      return cb(null, {
        change: args.change,
        // changes: [],
        serverChange: null,
        version: args.version
      })
    }

    // Store the commit
    this.documentEngine.addChange({
      documentId: args.documentId,
      change: args.change,
      documentInfo: args.documentInfo
    }, function(err, serverVersion) {
      if (err) return cb(err);
      cb(null, {
        change: args.change, // collaborators must be notified
        serverChange: null,
        // changes: [], // no changes missed in fast-forward scenario
        version: serverVersion
      })
    })
  }

  /*
    Rebased sync (client version < server version)
  */
  _syncRB(args, cb) {
    this._rebaseChange({
      documentId: args.documentId,
      change: args.change,
      version: args.version
    }, function(err, rebased) {
      // result has change, changes, version (serverversion)
      if (err) return cb(err)

      this._updateCollaboratorSelections(args.documentId, rebased.change)

      // HACK: On connect we may receive a nop that only has selection data.
      // We don't want to store such changes.
      // TODO: it would be nice if we could handle this in a different
      // branch of connect, so we don't spoil the commit implementation
      if (args.change.ops.length === 0) {
        return cb(null, {
          change: rebased.change,
          serverChange: rebased.serverChange,
          version: rebased.version
        })
      }

      // Store the rebased commit
      this.documentEngine.addChange({
        documentId: args.documentId,
        change: rebased.change, // rebased change
        documentInfo: args.documentInfo
      }, function(err, serverVersion) {
        if (err) return cb(err)
        cb(null, {
          change: rebased.change,
          serverChange: rebased.serverChange, // collaborators must be notified
          version: serverVersion
        })
      })
    }.bind(this))
  }

  /*
    Rebase change

    IN: documentId, change, version (change version)
    OUT: change, changes (server changes), version (server version)
  */
  _rebaseChange(args, cb) {
    this.documentEngine.getChanges({
      documentId: args.documentId,
      sinceVersion: args.version
    }, function(err, result) {
      let B = result.changes.map(this.deserializeChange)
      let a = this.deserializeChange(args.change)
      // transform changes
      DocumentChange.transformInplace(a, B)
      let ops = B.reduce(function(ops, change) {
        return ops.concat(change.ops)
      }, [])
      let serverChange = new DocumentChange(ops, {}, {})

      cb(null, {
        change: this.serializeChange(a),
        serverChange: this.serializeChange(serverChange),
        version: result.version
      })
    }.bind(this))
  }

  /*
    Collaborator leaves a document editing session

    NOTE: This method is synchronous
  */
  disconnect(args) {
    this._unregister(args.collaboratorId, args.documentId)
  }

  /*
    To JSON
  */
  serializeChange(change) {
    return change.toJSON()
  }

  /*
    From JSON
  */
  deserializeChange(serializedChange) {
    let ch = DocumentChange.fromJSON(serializedChange)
    return ch
  }

}

/* global WeakMap */

/**
  Server

  Implements a generic layered architecture
*/
class Server extends EventEmitter {
  constructor(config) {
    super()

    this.config = config
    this._onConnection = this._onConnection.bind(this)
  }

  bind(wss) {
    if (this.wss) {
      throw new Error('Server is already bound to a websocket')
    }
    this.wss = wss
    this._connections = new WeakMap()
    this._collaborators = {}
    this.wss.on('connection', this._onConnection)

    let interval = this.config.heartbeat
    if (interval) {
      this._heartbeat = setInterval(this._sendHeartbeat.bind(this), interval)
    }
    this._bound = true
  }

  /*
    NOTE: This method is yet untested
  */
  unbind() {
    if (this._bound) {
      this.wss.off('connection', this._onConnection)
    } else {
      throw new Error('Server is not yet bound to a websocket.')
    }
  }

  /*
    Hook called when a collaborator connects
  */
  onConnection(/*collaboratorId*/) {
    // noop
  }

  /*
    Hook called when a collaborator disconnects
  */
  onDisconnect(/*collaboratorId*/) {
    // noop
  }

  /*
    Stub implementation for authenticate middleware.

    Implement your own as a hook
  */
  authenticate(req, res) {
    req.setAuthenticated()
    this.next(req, res)
  }

  /*
    Stub implementation for authorize middleware

    Implement your own as a hook
  */
  authorize(req, res) {
    req.setAuthorized()
    this.next(req, res)
  }


  /*
    Ability to enrich the request data
  */
  enhanceRequest(req, res) {
    req.setEnhanced()
    this.next(req, res)
  }

  /*
    Executes the API according to the message type

    Implement your own as a hook
  */
  execute(/*req, res*/) {
    throw new Error('This method needs to be specified')
  }

  /*
    Ability to enrich the response data
  */
  enhanceResponse(req, res) {
    res.setEnhanced()
    this.next(req, res)
  }

  /*
    When a new collaborator connects we generate a unique id for them
  */
  _onConnection(ws) {
    let collaboratorId = uuid$1()
    let connection = {
      collaboratorId: collaboratorId
    }
    this._connections.set(ws, connection)

    // Mapping to find connection for collaboratorId
    this._collaborators[collaboratorId] = {
      connection: ws
    }

    ws.on('message', this._onMessage.bind(this, ws))
    ws.on('close', this._onClose.bind(this, ws))
  }

  /*
    When websocket connection closes
  */
  _onClose(ws) {
    let conn = this._connections.get(ws)
    let collaboratorId = conn.collaboratorId

    this.onDisconnect(collaboratorId)

    // Remove the connection records
    delete this._collaborators[collaboratorId]
    this._connections.delete(ws)
  }

  /*
    Implements state machine for handling the request response cycle

    __initial -        > authenticated      -> __authenticated, __error
    __authenticated   -> authorize          -> __authorized, __error
    __authorized      -> enhanceRequest     -> __requestEnhanced, __error
    __requestEnhanced -> execute            -> __executed, __error
    __executed        -> enhanceResponse    -> __enhanced, __error
    __enhanced        -> sendResponse       -> __done, __error
    __error           -> sendError          -> __done
    __done // end state
  */
  __initial(req, res) {
    return !req.isAuthenticated && !req.isAuthorized && !res.isReady
  }

  __authenticated(req, res) {
    return req.isAuthenticated && !req.isAuthorized && !res.isReady
  }

  __authorized(req, res) {
    return req.isAuthenticated && req.isAuthorized && !req.isEnhanced && !res.isReady
  }

  __requestEnhanced(req, res) {
    return req.isAuthenticated && req.isAuthorized && req.isEnhanced && !res.isReady
  }

  __executed(req, res) {
    // excecute must call res.send() so res.data is set
    return req.isAuthenticated && req.isAuthorized && res.isReady && res.data && !res.isEnhanced
  }

  __enhanced(req, res) {
    return res.isReady && res.isEnhanced && !res.isSent
  }

  __error(req, res) {
    return res.err && !res.isSent
  }

  __done(req, res) {
    return res.isSent
  }

  next(req, res) {
    if (this.__initial(req, res)) {
      this.authenticate(req, res)
    } else if (this.__authenticated(req, res)) {
      this.authorize(req, res)
    } else if (this.__authorized(req, res)) {
      this.enhanceRequest(req, res)
    } else if (this.__requestEnhanced(req, res)) {
      this.execute(req, res)
    } else if (this.__executed(req, res)) {
      this.enhanceResponse(req, res)
    } else if (this.__enhanced(req, res)) {
      this.sendResponse(req, res)
    } else if (this.__error(req, res)) {
      this.sendError(req, res)
    } else if (this.__done(req,res)) {
      // console.log('We are done with processing the request.');
    }
  }

  /*
    Send error response
  */
  sendError(req, res) {
    let collaboratorId = req.message.collaboratorId
    let msg = res.err
    this.send(collaboratorId, msg)
    res.setSent()
    this.next(req, res)
  }

  /*
    Sends a heartbeat message to all connected collaborators
  */
  _sendHeartbeat() {
    Object.keys(this._collaborators).forEach(function(collaboratorId) {
      this.send(collaboratorId, {
        type: 'highfive',
        scope: '_internal'
      });
    }.bind(this))
  }

  /*
    Send response
  */
  sendResponse(req, res) {
    let collaboratorId = req.message.collaboratorId
    this.send(collaboratorId, res.data)
    res.setSent()
    this.next(req, res)
  }

  _isWebsocketOpen(ws) {
    return ws && ws.readyState === 1
  }

  /*
    Send message to collaborator
  */
  send(collaboratorId, message) {
    if (!message.scope && this.config.scope) {
      message.scope = this.config.scope
    }

    let ws = this._collaborators[collaboratorId].connection
    if (this._isWebsocketOpen(ws)) {
      ws.send(this.serializeMessage(message))
    } else {
      console.error('Server#send: Websocket for collaborator', collaboratorId, 'is no longer open', message)
    }
  }

  /*
    Send message to collaborator
  */
  broadCast(collaborators, message) {
    collaborators.forEach(function(collaboratorId) {
      this.send(collaboratorId, message)
    }.bind(this))
  }

  // Takes a request object
  _processRequest(req) {
    let res = new ServerResponse()
    this.next(req, res)
  }

  /*
    Handling of client messages.

    Message comes in in the following format:

    We turn this into a method call internally:

    this.open(ws, 'doc13')

    The first argument is always the websocket so we can respond to messages
    after some operations have been performed.
  */
  _onMessage(ws, msg) {
    // Retrieve the connection data
    let conn = this._connections.get(ws)
    msg = this.deserializeMessage(msg)

    if (msg.scope === this.scope) {
      // We attach a unique collaborator id to each message
      msg.collaboratorId = conn.collaboratorId
      let req = new ServerRequest(msg, ws)
      this._processRequest(req)
    }
  }

  serializeMessage(msg) {
    return JSON.stringify(msg)
  }

  deserializeMessage(msg) {
    return JSON.parse(msg)
  }

}

/*
  ServerRequest
*/

class ServerRequest {
  constructor(message, ws) {
    this.message = message
    this.ws = ws
    this.isAuthenticated = false
    this.isAuhorized = false
  }

  /*
    Marks a request as authenticated
  */
  setAuthenticated(session) {
    this.isAuthenticated = true
    this.session = session
  }

  /*
    Marks a request as authorized (authorizationData is optional)
  */
  setAuthorized(authorizationData) {
    this.isAuthorized = true
    this.authorizationData = authorizationData
  }

  /*
    Sets the isEnhanced flag
  */
  setEnhanced() {
    this.isEnhanced = true
  }
}

oo.initClass(ServerRequest)

/*
  ServerResponse
*/
class ServerResponse {
  constructor() {
    this.isReady = false // once the response has been set using send
    this.isEnhanced = false // after response has been enhanced by enhancer
    this.isSent = false // after response has been sent
    this.err = null
    this.data = null
  }

  /*
    Sends an error response

    @example

    ```js
    res.error({
      type: 'syncError',
      errorName: 'AuthenticationError',
      documentId: 'doc-1'
    });
    ```
  */
  error(err) {
    this.err = err
    this.isReady = true
  }

  /*
    Send response data
  */
  send(data) {
    this.data = data
    this.isReady = true
  }

  /*
    Sets the isEnhanced flag
  */
  setEnhanced() {
    this.isEnhanced = true
  }

  setSent() {
    this.isSent = true
  }
}

oo.initClass(ServerResponse)

/*
  Implements Substance CollabServer API.
*/
class CollabServer extends Server {
  constructor(config) {
    super(config)

    this.scope = 'substance/collab'
    this.documentEngine = config.documentEngine
    this.collabEngine = new CollabEngine(this.documentEngine)
  }

  /*
    Send an error
  */
  _error(req, res, err) {
    res.error({
      type: 'error',
      error: {
        name: req.message.type+'Error',
        cause: {
          name: err.name
        }
      },
      // errorName: err.name,
      documentId: req.message.documentId
    })
    this.next(req, res)
  }

  /*
    Configurable authenticate method
  */
  authenticate(req, res) {
    if (this.config.authenticate) {
      this.config.authenticate(req, function(err, session) {
        if (err) {
          console.error(err)
          // Send the response with some delay
          this._error(req, res, new SubstanceError('AuthenticationError', {cause: err}))
          return
        }
        req.setAuthenticated(session)
        this.next(req, res)
      }.bind(this))
    } else {
      super.authenticate.apply(this, arguments);
    }
  }

  /*
    Configureable enhanceRequest method
  */
  enhanceRequest(req, res) {
    if (this.config.enhanceRequest) {
      this.config.enhanceRequest(req, function(err) {
        if (err) {
          console.error('enhanceRequest returned an error', err)
          this._error(req, res, err)
          return
        }
        req.setEnhanced()
        this.next(req, res)
      }.bind(this))
    } else {
      super.enhanceRequest.apply(this, arguments)
    }
  }

  /*
    Called when a collaborator disconnects
  */
  onDisconnect(collaboratorId) {
    // console.log('CollabServer.onDisconnect ', collaboratorId);
    // All documents collaborator is currently collaborating to
    let documentIds = this.collabEngine.getDocumentIds(collaboratorId)
    documentIds.forEach(function(documentId) {
      this._disconnectDocument(collaboratorId, documentId)
    }.bind(this))
  }

  /*
    Execute CollabServer API method based on msg.type
  */
  execute(req, res) {
    let msg = req.message
    let method = this[msg.type]

    if (method) {
      method.call(this, req, res)
    } else {
      console.error('Method', msg.type, 'not implemented for CollabServer')
    }
  }

  /*
    Client initiates a sync
  */
  sync(req, res) {
    let args = req.message

    // console.log('CollabServer.connect', args.collaboratorId);

    // Takes an optional argument collaboratorInfo
    this.collabEngine.sync(args, function(err, result) {
      // result: changes, version, change
      if (err) {
        this._error(req, res, err)
        return
      }

      // Get enhance collaborators (e.g. including some app-specific user-info)
      let collaborators = this.collabEngine.getCollaborators(args.documentId, args.collaboratorId)

      // Send the response
      res.send({
        scope: this.scope,
        type: 'syncDone',
        documentId: args.documentId,
        version: result.version,
        serverChange: result.serverChange,
        collaborators: collaborators
      })

      // We need to broadcast a new change if there is one
      // console.log('CollabServer.connect: update is broadcasted to collaborators', Object.keys(collaborators));
      forEach$1(collaborators, function(collaborator) {
        this.send(collaborator.collaboratorId, {
          scope: this.scope,
          type: 'update',
          documentId: args.documentId,
          version: result.version,
          change: result.change,
          // collaboratorId: args.collaboratorId,
          // All except of receiver record
          collaborators: this.collabEngine.getCollaborators(args.documentId, collaborator.collaboratorId)
        })
      }.bind(this))
      this.next(req, res)
    }.bind(this))
  }

  /*
    Expcicit disconnect. User wants to exit a collab session.
  */
  disconnect(req, res) {
    let args = req.message
    let collaboratorId = args.collaboratorId
    let documentId = args.documentId
    this._disconnectDocument(collaboratorId, documentId)
    // Notify client that disconnect has completed successfully
    res.send({
      scope: this.scope,
      type: 'disconnectDone',
      documentId: args.documentId
    })
    this.next(req, res)
  }

  _disconnectDocument(collaboratorId, documentId) {
    let collaboratorIds = this.collabEngine.getCollaboratorIds(documentId, collaboratorId)

    let collaborators = {}
    collaborators[collaboratorId] = null

    this.broadCast(collaboratorIds, {
      scope: this.scope,
      type: 'update',
      documentId: documentId,
      // Removes the entry
      collaborators: collaborators
    })
    // Exit from each document session
    this.collabEngine.disconnect({
      documentId: documentId,
      collaboratorId: collaboratorId
    })
  }

}

var now = createCommonjsModule(function (module) {
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
function now() {
  return Date.now();
}

module.exports = now;
});

var now$1 = interopDefault(now);


var require$$1$29 = Object.freeze({
	default: now$1
});

var debounce = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$2),
    now = interopDefault(require$$1$29),
    toNumber = interopDefault(require$$0$40);

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide an options object to indicate whether `func` should be invoked on
 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent calls
 * to the debounced function return the result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;
});

var debounce$1 = interopDefault(debounce);

var isPlainObject = createCommonjsModule(function (module) {
var getPrototype = interopDefault(require$$1$2),
    isHostObject = interopDefault(require$$1$11),
    isObjectLike = interopDefault(require$$0$4);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object,
 *  else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;
});

var isPlainObject$1 = interopDefault(isPlainObject);

var each = createCommonjsModule(function (module) {
module.exports = interopDefault(require$$0);
});

var each$1 = interopDefault(each);

function deleteFromArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      array.splice(i, 1);
      i--;
    }
  }
}

function TreeNode() {}

/*
 * A tree-structure for indexes.
 *
 * @class TreeIndex
 * @param {object} [obj] An object to operate on
 * @memberof module:Basics
 * @example
 *
 * var index = new TreeIndex({a: "aVal", b: {b1: 'b1Val', b2: 'b2Val'}});
 */

function TreeIndex() {}

TreeIndex.Prototype = function() {

  /**
   * Get value at path.
   *
   * @return {object} The value stored for a given path
   *
   * @example
   *
   * obj.get(['b', 'b1']);
   * => b1Val
   */
  this.get = function(path) {
    if (arguments.length > 1) {
      path = Array.prototype.slice(arguments, 0);
    }
    if (isString$1(path)) {
      path = [path];
    }
    return get$1(this, path);
  };

  this.getAll = function(path) {
    if (arguments.length > 1) {
      path = Array.prototype.slice(arguments, 0);
    }
    if (isString$1(path)) {
      path = [path];
    }
    if (!isArray$1(path)) {
      throw new Error('Illegal argument for TreeIndex.get()');
    }
    var node = get$1(this, path);
    return this._collectValues(node);
  };

  this.set = function(path, value) {
    if (isString$1(path)) {
      path = [path];
    }
    setWith$1(this, path, value, function(val) {
      if (!val) return new TreeNode();
    });
  };

  this.delete = function(path) {
    if (isString$1(path)) {
      delete this[path];
    } else if(path.length === 1) {
      delete this[path[0]];
    } else {
      var key = path[path.length-1];
      path = path.slice(0, -1);
      var parent = get$1(this, path);
      if (parent) {
        delete parent[key];
      }
    }
  };

  this.clear = function() {
    var root = this;
    for (var key in root) {
      if (root.hasOwnProperty(key)) {
        delete root[key];
      }
    }
  };

  this.traverse = function(fn) {
    this._traverse(this, [], fn);
  };

  this.forEach = this.traverse;

  this._traverse = function(root, path, fn) {
    var id;
    for (id in root) {
      if (!root.hasOwnProperty(id)) continue;
      var child = root[id];
      var childPath = path.concat([id]);
      if (child instanceof TreeNode) {
        this._traverse(child, childPath, fn);
      } else {
        fn(child, childPath);
      }
    }
  };

  this._collectValues = function(root) {
    // TODO: don't know if this is the best solution
    // We use this only for indexes, e.g., to get all annotation on one node
    var vals = {};
    this._traverse(root, [], function(val, path) {
      var key = path[path.length-1];
      vals[key] = val;
    });
    return vals;
  };
};

oo.initClass(TreeIndex);

TreeIndex.Arrays = function() {};

TreeIndex.Arrays.Prototype = function() {

  var _super = Object.getPrototypeOf(this);

  this.get = function(path) {
    var val = _super.get.call(this, path);
    if (val instanceof TreeNode) {
      val = val.__values__ || [];
    }
    return val;
  };

  this.set = function() {
    throw new Error('TreeIndex.set() is not supported for array type.');
  };

  this.add = function(path, value) {
    if (isString$1(path)) {
      path = [path];
    }
    if (!isArray$1(path)) {
      throw new Error('Illegal arguments.');
    }
    var arr;

    // We are using setWith, as it allows us to create nodes on the way down
    // setWith can be controlled via a hook called for each key in the path
    // If val is not defined, a new node must be created and returned.
    // If val is defined, then we must return undefined to keep the original tree node
    // __dummy__ is necessary as setWith is used to set a value, but we want
    // to append to the array
    setWith$1(this, path.concat(['__values__','__dummy__']), undefined, function(val, key) {
      if (key === '__values__') {
        if (!val) val = [];
        arr = val;
      } else if (!val) {
        val = new TreeNode();
      }
      return val;
    });
    delete arr.__dummy__;
    arr.push(value);
  };

  this.remove = function(path, value) {
    var arr = get$1(this, path);
    if (arr instanceof TreeNode) {
      deleteFromArray(arr.__values__, value);
    }
  };

  this._collectValues = function(root) {
    var vals = [];
    this._traverse(root, [], function(val) {
      vals.push(val);
    });
    vals = Array.prototype.concat.apply([], vals);
    return vals;
  };

};

TreeIndex.extend(TreeIndex.Arrays);

/**
  Index for Nodes.

  Node indexes are first-class citizens in {@link model/data/Data}.
  I.e., they are updated after each operation, and before any other listener is notified.

  @class
  @abstract
 */
function NodeIndex() {
  /**
   * Internal storage.
   *
   * @property {TreeIndex} index
   * @private
   */
  this.index = new TreeIndex();
}

NodeIndex.Prototype = function() {

  /**
   * Get all indexed nodes for a given path.
   *
   * @param {Array<String>} path
   * @returns A node or an object with ids and nodes as values.
   */
  this.get = function(path) {
    return this.index.get(path) || {};
  };

  /**
   * Collects nodes recursively.
   *
   * @returns An object with ids as keys and nodes as values.
   */
  this.getAll = function(path) {
    return this.index.getAll(path);
  };

  /**
   * The property used for indexing.
   *
   * @private
   * @type {String}
   */
  this.property = "id";

  /**
   * Check if a node should be indexed.
   *
   * Used internally only. Override this in subclasses to achieve a custom behavior.
   *
   * @private
   * @param {model/data/Node}
   * @returns {Boolean} true if the given node should be added to the index.
   */
  this.select = function(node) {
    if(!this.type) {
      return true;
    } else {
      return node.isInstanceOf(this.type);
    }
  };

  /**
   * Called when a node has been created.
   *
   * Override this in subclasses for customization.
   *
   * @private
   * @param {model/data/Node} node
   */
  this.create = function(node) {
    var values = node[this.property];
    if (!isArray$1(values)) {
      values = [values];
    }
    each$1(values, function(value) {
      this.index.set([value, node.id], node);
    }.bind(this));
  };

  /**
   * Called when a node has been deleted.
   *
   * Override this in subclasses for customization.
   *
   * @private
   * @param {model/data/Node} node
   */
  this.delete = function(node) {
    var values = node[this.property];
    if (!isArray$1(values)) {
      values = [values];
    }
    each$1(values, function(value) {
      this.index.delete([value, node.id]);
    }.bind(this));
  };

  /**
   * Called when a property has been updated.
   *
   * Override this in subclasses for customization.
   *
   * @private
   * @param {model/data/Node} node
   */
  this.update = function(node, path, newValue, oldValue) {
    if (!this.select(node) || path[1] !== this.property) return;
    var values = oldValue;
    if (!isArray$1(values)) {
      values = [values];
    }
    each$1(values, function(value) {
      this.index.delete([value, node.id]);
    }.bind(this));
    values = newValue;
    if (!isArray$1(values)) {
      values = [values];
    }
    each$1(values, function(value) {
      this.index.set([value, node.id], node);
    }.bind(this));
  };

  this.set = function(node, path, newValue, oldValue) {
    this.update(node, path, newValue, oldValue);
  };

  /**
   * Reset the index using a Data instance.
   *
   * @private
   */
  this.reset = function(data) {
    this.index.clear();
    this._initialize(data);
  };

  /**
   * Clone this index.
   *
   * @return A cloned NodeIndex.
   */
  this.clone = function() {
    var NodeIndexClass = this.constructor;
    var clone = new NodeIndexClass();
    return clone;
  };

  this._initialize = function(data) {
    each$1(data.getNodes(), function(node) {
      if (this.select(node)) {
        this.create(node);
      }
    }.bind(this));
  };

};

oo.initClass( NodeIndex );

/**
 * Create a new NodeIndex using the given prototype as mixin.
 *
 * @param {Object} prototype
 * @static
 * @returns {model/data/NodeIndex} A customized NodeIndex.
 */
NodeIndex.create = function(prototype) {
  var index = extend$1(new NodeIndex(), prototype);
  index.clone = function() {
    return NodeIndex.create(prototype);
  };
  return index;
};

NodeIndex.filterByType = function(type) {
  return function(node) {
    return node.isInstanceOf(type);
  };
};

function DocumentIndex() {}

NodeIndex.extend(DocumentIndex);

DocumentIndex.filterByType = NodeIndex.filterByType;

var _arrayFilter = createCommonjsModule(function (module) {
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array ? array.length : 0,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;
});

var _arrayFilter$1 = interopDefault(_arrayFilter);


var require$$3$15 = Object.freeze({
	default: _arrayFilter$1
});

var _baseFilter = createCommonjsModule(function (module) {
var baseEach = interopDefault(require$$0$1);

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;
});

var _baseFilter$1 = interopDefault(_baseFilter);


var require$$2$27 = Object.freeze({
	default: _baseFilter$1
});

var filter = createCommonjsModule(function (module) {
var arrayFilter = interopDefault(require$$3$15),
    baseFilter = interopDefault(require$$2$27),
    baseIteratee = interopDefault(require$$2$6),
    isArray = interopDefault(require$$0$5);

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array|Function|Object|string} [predicate=_.identity]
 *  The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;
});

var filter$1 = interopDefault(filter);

// PropertyAnnotation Index
// ----------------
//
// Lets us look up existing annotations by path and type
//
// To get all annotations for the content of a text node
//
//    var aIndex = doc.annotationIndex;
//    aIndex.get(["text_1", "content"]);
//
// You can also scope for a specific range
//
//    aIndex.get(["text_1", "content"], 23, 45);

function AnnotationIndex() {
  this.byPath = new TreeIndex();
  this.byType = new TreeIndex();
}

AnnotationIndex.Prototype = function() {

  this.property = "path";

  this.select = function(node) {
    return Boolean(node._isPropertyAnnotation);
  };

  this.reset = function(data) {
    this.byPath.clear();
    this.byType.clear();
    this._initialize(data);
  };

  // TODO: use object interface? so we can combine filters (path and type)
  this.get = function(path, start, end, type) {
    var annotations;
    if (isString$1(path) || path.length === 1) {
      annotations = this.byPath.getAll(path) || {};
    } else {
      annotations = this.byPath.get(path);
    }
    annotations = map$1(annotations);
    if (isNumber$1(start)) {
      annotations = filter$1(annotations, AnnotationIndex.filterByRange(start, end));
    }
    if (type) {
      annotations = filter$1(annotations, NodeIndex.filterByType(type));
    }
    return annotations;
  };

  this.create = function(anno) {
    this.byType.set([anno.type, anno.id], anno);
    this.byPath.set(anno.path.concat([anno.id]), anno);
  };

  this.delete = function(anno) {
    this.byType.delete([anno.type, anno.id]);
    this.byPath.delete(anno.path.concat([anno.id]));
  };

  this.update = function(node, path, newValue, oldValue) {
    if (this.select(node) && path[1] === this.property) {
      this.delete({ id: node.id, type: node.type, path: oldValue });
      this.create(node);
    }
  };

};

NodeIndex.extend(AnnotationIndex);

AnnotationIndex.filterByRange = function(start, end) {
  return function(anno) {
    var aStart = anno.startOffset;
    var aEnd = anno.endOffset;
    var overlap = (aEnd >= start);
    // Note: it is allowed to omit the end part
    if (isNumber$1(end)) {
      overlap = overlap && (aStart <= end);
    }
    return overlap;
  };
};

function ContainerAnnotationIndex() {
  this.byId = new TreeIndex();
}

ContainerAnnotationIndex.Prototype = function() {

  this.select = function(node) {
    return Boolean(node._isContainerAnnotation);
  };

  this.reset = function(data) {
    this.byId.clear();
    this._initialize(data);
  };

  this.get = function(containerId, type) {
    var annotations = map$1(this.byId.get(containerId));
    if (isString$1(type)) {
      annotations = filter$1(annotations, NodeIndex.filterByType);
    }
    return annotations;
  };

  this.create = function(anno) {
    this.byId.set([anno.containerId, anno.id], anno);
  };

  this.delete = function(anno) {
    this.byId.delete([anno.containerId, anno.id]);
  };

  this.update = function(node, path, newValue, oldValue) { // eslint-disable-line
    // TODO should we support moving a container anno from one container to another?
  };

};

NodeIndex.extend(ContainerAnnotationIndex);

function AnchorIndex(doc) {
  this.doc = doc;
  this.byPath = new TreeIndex.Arrays();
  this.byId = {};
}

AnchorIndex.Prototype = function() {

  this.select = function(node) {
    return (node._isContainerAnnotation);
  };

  this.reset = function(data) {
    this.byPath.clear();
    this.byId = {};
    this._initialize(data);
  };

  this.get = function(path, containerName) {
    var anchors = this.byPath.getAll(path);
    if (containerName) {
      return filter$1(anchors, function(anchor) {
        return (anchor.containerId === containerName);
      });
    } else {
      // return a copy of the array
      return anchors.slice(0);
    }
  };

  this.create = function(containerAnno) {
    var startAnchor = containerAnno.getStartAnchor();
    var endAnchor = containerAnno.getEndAnchor();
    this.byPath.add(startAnchor.path, startAnchor);
    this.byPath.add(endAnchor.path, endAnchor);
    this.byId[containerAnno.id] = containerAnno;
  };

  this.delete = function(containerAnno) {
    var startAnchor = containerAnno.getStartAnchor();
    var endAnchor = containerAnno.getEndAnchor();
    this.byPath.remove(startAnchor.path, startAnchor);
    this.byPath.remove(endAnchor.path, endAnchor);
    delete this.byId[containerAnno.id];
  };

  this.update = function(node, path, newValue, oldValue) {
    if (this.select(node)) {
      var anchor = null;
      if (path[1] === 'startPath') {
        anchor = node.getStartAnchor();
      } else if (path[1] === 'endPath') {
        anchor = node.getEndAnchor();
      } else {
        return;
      }
      this.byPath.remove(oldValue, anchor);
      this.byPath.add(anchor.path, anchor);
    }
  };

};

NodeIndex.extend(AnchorIndex);

function PathEventProxy(doc) {
  this.listeners = new TreeIndex.Arrays();
  this._list = [];
  this.doc = doc;
}

PathEventProxy.Prototype = function() {

  this.on = function(path, method, context) {
    this._add(context, path, method);
  };

  // proxy.off(this)
  // proxy.off(this, path)
  // proxy.off(this, path, this.onPropertyUpdate)
  this.off = function(context, path, method) {
    this._remove(context, path, method);
  };

  this.connect = function(listener, path, method) {
    console.warn('DEPRECATED: use proxy.on(path, this.onPropertyChange, this) instead');
    this.on(path, method, listener);
  };

  this.disconnect = function(listener) {
    console.warn('DEPRECATED: use proxy.off(this) instead');
    this.off(listener);
  };

  this.onDocumentChanged = function(change, info, doc) {
    // stop if no listeners registered
    if (this._list.length === 0) {
      return;
    }
    var listeners = this.listeners;
    forEach$1(change.updated, function(_, pathStr) {
      var scopedListeners = listeners.get(pathStr.split(','));
      if (isArray$1(scopedListeners)) scopedListeners = scopedListeners.slice(0);
      forEach$1(scopedListeners, function(entry) {
        entry.method.call(entry.listener, change, info, doc);
      });
    });
  };

  this._add = function(listener, path, method) {
    if (!method) {
      throw new Error('Invalid argument: expected function but got ' + method);
    }
    var entry = { listener: listener, path: path, method: method };
    this.listeners.add(path, entry);
    this._list.push(entry);
  };

  this._remove = function(listener, path, method) {
    for (var i = 0; i < this._list.length; i++) {
      var item = this._list[i];
      var match = (
        (!path || isEqual$1(item.path, path)) &&
        (!listener || item.listener === listener) &&
        (!method || item.method !== method)
      );
      if (match) {
        var entry = this._list[i];
        this._list.splice(i, 1);
        this.listeners.remove(entry.path, entry);
      }
    }
  };

};

oo.initClass(PathEventProxy);

function NodeFactory(nodeRegistry) {
  this.nodeRegistry = nodeRegistry;
}

NodeFactory.Prototype = function() {

  this.create = function(nodeType, nodeData) {
    var NodeClass = this.nodeRegistry.get(nodeType);
    if (!NodeClass) {
      throw new Error('No Node registered by that name: ' + nodeType);
    }
    return new NodeClass(nodeData);
  };

};

oo.initClass(NodeFactory);

/**
  A data storage implemention that supports data defined via a {@link model/data/Schema},
  and incremental updates which are backed by a OT library.

  It forms the underlying implementation for {@link model/Document}.

  @private
  @class Data
  @extends util/EventEmitter
 */

/**
  @constructor
  @param {Schema} schema
  @param {Object} [options]
*/
function Data(schema, options) {
  EventEmitter.call(this);

  options = options || {};

  this.schema = schema;
  this.nodes = new DataObject();
  this.indexes = {};
  this.options = options || {};

  this.nodeFactory = options.nodeFactory || new NodeFactory(schema.nodeRegistry);

  // Sometimes necessary to resolve issues with updating indexes in presence
  // of cyclic dependencies
  this.__QUEUE_INDEXING__ = false;
  this.queue = [];
}

Data.Prototype = function() {

  /**
    Check if this storage contains a node with given id.

    @returns {Boolean} `true` if a node with id exists, `false` otherwise.
   */
  this.contains = function(id) {
    return Boolean(this.nodes[id]);
  };

  /**
    Get a node or value via path.

    @param {String|String[]} path node id or path to property.
    @returns {Node|Object|Primitive|undefined} a Node instance, a value or undefined if not found.
   */
  this.get = function(path, strict) {
    if (!path) {
      throw new Error('Path or id required');
    }
    var result = this.nodes.get(path);
    if (strict && result === undefined) {
      if (isString$1(path)) {
        throw new Error("Could not find node with id '"+path+"'.");
      } else {
        throw new Error("Property for path '"+path+"' us undefined.");
      }
    }
    return result;
  };

  /**
    Get the internal storage for nodes.

    @return The internal node storage.
   */
  this.getNodes = function() {
    return this.nodes;
  };

  /**
    Create a node from the given data.

    @return {Node} The created node.
   */
  this.create = function(nodeData) {
    var node = this.nodeFactory.create(nodeData.type, nodeData);
    if (!node) {
      throw new Error('Illegal argument: could not create node for data:', nodeData);
    }
    if (this.contains(node.id)) {
      throw new Error("Node already exists: " + node.id);
    }
    if (!node.id || !node.type) {
      throw new Error("Node id and type are mandatory.");
    }
    this.nodes[node.id] = node;

    var change = {
      type: 'create',
      node: node
    };

    if (this.__QUEUE_INDEXING__) {
      this.queue.push(change);
    } else {
      this._updateIndexes(change);
    }

    return node;
  };

  /**
    Delete the node with given id.

    @param {String} nodeId
    @returns {Node} The deleted node.
   */
  this.delete = function(nodeId) {
    var node = this.nodes[nodeId];
    node.dispose();
    delete this.nodes[nodeId];

    var change = {
      type: 'delete',
      node: node,
    };

    if (this.__QUEUE_INDEXING__) {
      this.queue.push(change);
    } else {
      this._updateIndexes(change);
    }

    return node;
  };

  /**
    Set a property to a new value.

    @param {Array} property path
    @param {Object} newValue
    @returns {Node} The deleted node.
   */
  this.set = function(path, newValue) {
    var node = this.get(path[0]);
    var oldValue = this.nodes.get(path);
    this.nodes.set(path, newValue);

    var change = {
      type: 'set',
      node: node,
      path: path,
      newValue: newValue,
      oldValue: oldValue
    };

    if (this.__QUEUE_INDEXING__) {
      this.queue.push(change);
    } else {
      this._updateIndexes(change);
    }

    return oldValue;
  };

  /**
    Update a property incrementally.

    DEPRECATED: this will be replaced in Beta 3 with a more intuitive API.

    @param {Array} property path
    @param {Object} diff
    @returns {any} The value before applying the update.

    @deprecated

  */
  this.update = function(path, diff) {
    // TODO: do we really want this incremental implementation here?
    var oldValue = this.nodes.get(path);
    var newValue;
    if (diff.isOperation) {
      newValue = diff.apply(oldValue);
    } else {
      var start, end, pos, val;
      if (isString$1(oldValue)) {
        if (diff['delete']) {
          // { delete: [2, 5] }
          start = diff['delete'].start;
          end = diff['delete'].end;
          newValue = oldValue.split('').splice(start, end-start).join('');
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          newValue = [oldValue.substring(0, pos), val, oldValue.substring(pos)].join('');
        } else {
          throw new Error('Diff is not supported:', JSON.stringify(diff));
        }
      } else if (isArray$1(oldValue)) {
        newValue = oldValue.slice(0);
        if (diff['delete']) {
          // { delete: 2 }
          pos = diff['delete'].offset;
          newValue.splice(pos, 1);
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          newValue.splice(pos, 0, val);
        } else {
          throw new Error('Diff is not supported:', JSON.stringify(diff));
        }
      } else {
        throw new Error('Diff is not supported:', JSON.stringify(diff));
      }
    }
    this.nodes.set(path, newValue);
    var node = this.get(path[0]);

    var change = {
      type: 'update',
      node: node,
      path: path,
      newValue: newValue,
      oldValue: oldValue
    };

    if (this.__QUEUE_INDEXING__) {
      this.queue.push(change);
    } else {
      this._updateIndexes(change);
    }

    return oldValue;
  };

  /**
    Convert to JSON.

    DEPRECATED: We moved away from having JSON as first-class exchange format.
    We will remove this soon.

    @private
    @returns {Object} Plain content.
    @deprecated
   */
  this.toJSON = function() {
    return {
      schema: [this.schema.id, this.schema.version],
      nodes: cloneDeep$1(this.nodes)
    };
  };

  /**
    Clear nodes.

    @private
   */
  this.reset = function() {
    this.nodes.clear();
  };

  /**
    Add a node index.

    @param {String} name
    @param {NodeIndex} index
   */
  this.addIndex = function(name, index) {
    if (this.indexes[name]) {
      console.error('Index with name %s already exists.', name);
    }
    index.reset(this);
    this.indexes[name] = index;
    return index;
  };

  /**
    Get the node index with given name.

    @param {String} name
    @returns {NodeIndex} The node index.
   */
  this.getIndex = function(name) {
    return this.indexes[name];
  };

  /**
    Update a node index by providing of change object.

    @param {Object} change
   */
  this._updateIndexes = function(change) {
    if (!change || this.__QUEUE_INDEXING__) return;
    each$1(this.indexes, function(index) {
      if (index.select(change.node)) {
        if (!index[change.type]) {
          console.error('Contract: every NodeIndex must implement ' + change.type);
        }
        index[change.type](change.node, change.path, change.newValue, change.oldValue);
      }
    });
  };

  /**
    Stops indexing process, all changes will be collected in indexing queue.
  */
  this._stopIndexing = function() {
    this.__QUEUE_INDEXING__ = true;
  };

  /**
    Update all index changes from indexing queue.
  */
  this._startIndexing = function() {
    this.__QUEUE_INDEXING__ = false;
    while(this.queue.length >0) {
      var change = this.queue.shift();
      this._updateIndexes(change);
    }
  };

};

EventEmitter.extend(Data);

/**
  Incremental data storage implemention.

  @class IncrementalData
  @extends model/data/Data
  @private
 */

/**
  @constructor
  @param {Schema} schema
  @param {Object} [options]
*/
function IncrementalData(schema, options) {
  IncrementalData.super.call(this, schema, options);
}

IncrementalData.Prototype = function() {

  var _super = IncrementalData.super.prototype;

  /**
    Create a new node.

    @param {Object} nodeData
    @returns {ObjectOperation} The applied operation.
   */
  this.create = function(nodeData) {
    var op = ObjectOperation.Create([nodeData.id], nodeData);
    this.apply(op);
    return op;
  };

  /**
    Delete a node.

    @param {String} nodeId
    @returns {ObjectOperation} The applied operation.
   */
  this.delete = function(nodeId) {
    var op = null;
    var node = this.get(nodeId);
    if (node) {
      var nodeData = node.toJSON();
      op = ObjectOperation.Delete([nodeId], nodeData);
      this.apply(op);
    }
    return op;
  };

  /**
    Update a property incrementally.

    The diff can be of the following forms (depending on the updated property type):
      - String:
        - `{ insert: { offset: Number, value: Object } }`
        - `{ delete: { start: Number, end: Number } }`
      - Array:
        - `{ insert: { offset: Number, value: Object } }`
        - `{ delete: { offset: Number } }`

    @param {Array} path
    @param {Object} diff
    @returns {ObjectOperation} The applied operation.
  */
  this.update = function(path, diff) {
    var diffOp = this._getDiffOp(path, diff);
    var op = ObjectOperation.Update(path, diffOp);
    this.apply(op);
    return op;
  };

  /**
    Set a property to a new value

    @param {Array} path
    @param {Object} newValue
    @returns {ObjectOperation} The applied operation.
   */
  this.set = function(path, newValue) {
    var oldValue = this.get(path);
    var op = ObjectOperation.Set(path, oldValue, newValue);
    this.apply(op);
    return op;
  };

  /**
    Apply a given operation.

    @param {ObjectOperation} op
   */
  this.apply = function(op) {
    if (op.type === ObjectOperation.NOP) return;
    else if (op.type === ObjectOperation.CREATE) {
      // clone here as the operations value must not be changed
      _super.create.call(this, cloneDeep$1(op.val));
    } else if (op.type === ObjectOperation.DELETE) {
      _super.delete.call(this, op.val.id);
    } else if (op.type === ObjectOperation.UPDATE) {
      var oldVal = this.get(op.path);
      var diff = op.diff;
      if (op.propertyType === 'array') {
        if (! (diff._isArrayOperation) ) {
          diff = ArrayOperation.fromJSON(diff);
        }
        // array ops work inplace
        diff.apply(oldVal);
      } else if (op.propertyType === 'string') {
        if (! (diff._isTextOperation) ) {
          diff = TextOperation.fromJSON(diff);
        }
        var newVal = diff.apply(oldVal);
        _super.set.call(this, op.path, newVal);
      } else {
        throw new Error("Unsupported type for operational update.");
      }
    } else if (op.type === ObjectOperation.SET) {
      _super.set.call(this, op.path, op.val);
    } else {
      throw new Error("Illegal state.");
    }
    this.emit('operation:applied', op, this);
  };

  /**
    Creates proper operation based on provided node path and diff.

    @param {Array} path
    @param {Object} diff
    @returns {ObjectOperation} operation.

    @private
  */
  this._getDiffOp = function(path, diff) {
    var diffOp = null;
    if (diff.isOperation) {
      diffOp = diff;
    } else {
      var value = this.get(path);
      var start, end, pos, val;
      if (value === null || value === undefined) {
        throw new Error('Property has not been initialized: ' + JSON.stringify(path));
      } else if (isString$1(value)) {
        if (diff['delete']) {
          // { delete: [2, 5] }
          start = diff['delete'].start;
          end = diff['delete'].end;
          diffOp = TextOperation.Delete(start, value.substring(start, end));
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          diffOp = TextOperation.Insert(pos, val);
        }
      } else if (isArray$1(value)) {
        if (diff['delete']) {
          // { delete: 2 }
          pos = diff['delete'].offset;
          diffOp = ArrayOperation.Delete(pos, value[pos]);
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          diffOp = ArrayOperation.Insert(pos, val);
        }
      }
    }
    if (!diffOp) {
      throw new Error('Unsupported diff: ' + JSON.stringify(diff));
    }
    return diffOp;
  };

};

Data.extend(IncrementalData);

function DocumentNodeFactory(doc) {
  this.doc = doc;
}

DocumentNodeFactory.Prototype = function() {

  this.create = function(nodeType, nodeData) {
    var NodeClass = this.doc.schema.getNodeClass(nodeType);
    if (!NodeClass) {
      throw new Error('No node registered by that name: ' + nodeType);
    }
    return new NodeClass(this.doc, nodeData);
  };

};

oo.initClass(DocumentNodeFactory);

/**
  @module
  @example

  ```js
  import documentHelpers from 'substance/model/documentHelpers'
  documentHelpers.isContainerAnnotation(doc, 'comment')
  ```
*/
var documentHelpers = {};

/**
  @param {model/Document} doc
  @param {String} type
  @return {Boolean} `true` if given type is a {@link model/ContainerAnnotation}
*/
documentHelpers.isContainerAnnotation = function(doc, type) {
  var schema = doc.getSchema();
  return schema.isInstanceOf(type, 'container-annotation');
};

/**
  For a given selection get all property annotations

  @param {model/Document} doc
  @param {model/Selection} sel
  @return {model/PropertyAnnotation[]} An array of property annotations.
          Returns an empty array when selection is a container selection.
*/
documentHelpers.getPropertyAnnotationsForSelection = function(doc, sel, options) {
  options = options || {};
  if (!sel.isPropertySelection()) {
    return [];
  }
  var annotations = doc.getIndex('annotations').get(sel.path, sel.startOffset, sel.endOffset);
  if (options.type) {
    annotations = filter$1(annotations, NodeIndex.filterByType(options.type));
  }
  return annotations;
};

/**
  For a given selection get all container annotations

  @param {model/Document} doc
  @param {model/Selection} sel
  @param {String} containerId
  @param {String} options.type provides only annotations of that type
  @return {Array} An array of container annotations
*/
documentHelpers.getContainerAnnotationsForSelection = function(doc, sel, containerId, options) {
  // ATTENTION: looking for container annotations is not as efficient as property
  // selections, as we do not have an index that has notion of the spatial extend
  // of an annotation. Opposed to that, common annotations are bound
  // to properties which make it easy to lookup.
  if (!containerId) {
    throw new Error("'containerId' is required.");
  }
  options = options || {};
  var index = doc.getIndex('container-annotations');
  var annotations = index.get(containerId, options.type);
  annotations = filter$1(annotations, function(anno) {
    return sel.overlaps(anno.getSelection());
  });
  return annotations;
};

/**
  For a given selection, get annotations of a certain type

  @param {Document} doc
  @param {Document.Selection} sel
  @param {String} annotationType
  @param {String} containerId (only needed when type is a container annotation)
  @return {Array} all matching annotations
*/
documentHelpers.getAnnotationsForSelection = function(doc, sel, annotationType, containerId) {
  var annos;
  var isContainerAnno = documentHelpers.isContainerAnnotation(doc, annotationType);

  if (isContainerAnno) {
    var container = doc.get(containerId, 'strict');
    annos = documentHelpers.getContainerAnnotationsForSelection(doc, sel, container, {
      type: annotationType
    });
  } else {
    annos = documentHelpers.getPropertyAnnotationsForSelection(doc, sel, { type: annotationType });
  }
  return annos;
};

/**
  For a given selection, get the corresponding text string

  @param {Document} doc
  @param {model/Selection} sel
  @return {String} text enclosed by the annotation
*/

documentHelpers.getTextForSelection = function(doc, sel) {
  var text;
  if (!sel || sel.isNull()) {
    return "";
  } else if (sel.isPropertySelection()) {
    text = doc.get(sel.start.path);
    return text.substring(sel.start.offset, sel.end.offset);
  } else if (sel.isContainerSelection()) {
    var result = [];
    var fragments = sel.getFragments();
    fragments.forEach(function(fragment) {
      if (fragment instanceof Selection$1.Fragment) {
        var text = doc.get(fragment.path);
        if (isString$1(text)) {
          result.push(
            text.substring(fragment.startOffset, fragment.endOffset)
          );
        }
      }
    });
    return result.join('\n');
  }
};

function JSONConverter() {}

JSONConverter.Prototype = function() {

  this.importDocument = function(doc, json) {
    if (!json.schema || !isArray$1(json.nodes)) {
      throw new Error('Invalid JSON format.');
    }
    var schema = doc.getSchema();
    if (schema.name !== json.schema.name) {
      throw new Error('Incompatible schema.');
    }
    if (schema.version !== json.schema.version) {
      console.error('Different schema version. Conversion might be problematic.');
    }
    // the json should just be an array of nodes
    var nodes = json.nodes;
    // import data in a block with deactivated indexers and listeners
    // as the data contains cyclic references which
    // cause problems.
    doc.import(function(tx) {
      each$1(nodes, function(node) {
        // overwrite existing nodes
        if (tx.get(node.id)) {
          tx.delete(node.id);
        }
        tx.create(node);
      });
    });
    return doc;
  };

  this.exportDocument = function(doc) {
    var schema = doc.getSchema();
    var json = {
      schema: {
        name: schema.name,
        version: schema.version
      },
      nodes: []
    };
    each$1(doc.getNodes(), function(node) {
      if (node._isDocumentNode) {
        json.nodes.push(node.toJSON());
      }
    });
    return json;
  };
};

oo.initClass(JSONConverter);

var converter = new JSONConverter();

var __id__$4 = 0;

/**
  Abstract class used for deriving a custom article implementation.
  Requires a {@link model/DocumentSchema} to be provided on construction.

  @class Document
  @abstract
  @extends model/AbstractDocument
  @example

  ```js
  import Document from 'substance/model/Document'
  import articleSchema from './myArticleSchema'
  var Article = function() {
    Article.super.call(articleSchema);

    // We set up a container that holds references to
    // block nodes (e.g. paragraphs and figures)
    this.create({
      type: "container",
      id: "body",
      nodes: []
    });
  };

  Document.extend(Article);
  ```
*/

/**
  @constructor Document
  @param {DocumentSchema} schema The document schema.
*/

function Document(schema) {
  Document.super.apply(this);

  this.__id__ = __id__$4++;
  if (!schema) {
    throw new Error('A document needs a schema for reflection.');
  }

  this.schema = schema;
  this.nodeFactory = new DocumentNodeFactory(this);
  this.data = new IncrementalData(schema, {
    nodeFactory: this.nodeFactory
  });

  // all by type
  this.addIndex('type', NodeIndex.create({
    property: "type"
  }));

  // special index for (property-scoped) annotations
  this.addIndex('annotations', new AnnotationIndex());

  // TODO: these are only necessary if there is a container annotation
  // in the schema
  // special index for (container-scoped) annotations
  this.addIndex('container-annotations', new ContainerAnnotationIndex());
  this.addIndex('container-annotation-anchors', new AnchorIndex());

  // change event proxies are triggered after a document change has been applied
  // before the regular document:changed event is fired.
  // They serve the purpose of making the event notification more efficient
  // In earlier days all observers such as node views where listening on the same event 'operation:applied'.
  // This did not scale with increasing number of nodes, as on every operation all listeners where notified.
  // The proxies filter the document change by interest and then only notify a small set of observers.
  // Example: NotifyByPath notifies only observers which are interested in changes to a certain path.
  this.eventProxies = {
    'path': new PathEventProxy(this),
  };

  // Note: using the general event queue (as opposed to calling _updateEventProxies from within _notifyChangeListeners)
  // so that handler priorities are considered correctly
  this.on('document:changed', this._updateEventProxies, this);
}

Document.Prototype = function() {

  this._isDocument = true;

  this.addIndex = function(name, index) {
    return this.data.addIndex(name, index);
  };

  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  this.getNodes = function() {
    return this.data.nodes;
  };

  /**
    @returns {model/DocumentSchema} the document's schema.
  */
  this.getSchema = function() {
    return this.schema;
  };

  /**
    Check if this storage contains a node with given id.

    @returns {Boolean} `true` if a node with id exists, `false` otherwise.
  */
  this.contains = function(id) {
    this.data.contains(id);
  };

  /**
    Get a node or value via path.

    @param {String|String[]} path node id or path to property.
    @returns {DocumentNode|any|undefined} a Node instance, a value or undefined if not found.
  */
  this.get = function(path, strict) {
    return this.data.get(path, strict);
  };

  /**
    @return {Object} A hash of {@link model/DocumentNode} instances.
  */
  this.getNodes = function() {
    return this.data.getNodes();
  };

  /**
    Creates a context like a transaction for importing nodes.
    This is important in presence of cyclic dependencies.
    Indexes will not be updated during the import but will afterwards
    when all nodes are have been created.

    @private
    @param {Function} importer a `function(doc)`, where with `doc` is a `model/AbstractDocument`

    @example

    Consider the following example from our documentation generator:
    We want to have a member index, which keeps track of members of namespaces, modules, and classes.
    grouped by type, and in the case of classes, also grouped by 'instance' and 'class'.

    ```
    ui
      - class
        - ui/Component
    ui/Component
      - class
        - method
          - mount
      - instance
        - method
          - render
    ```

    To decide which grouping to apply, the parent type of a member needs to be considered.
    Using an incremental approach, this leads to the problem, that the parent must exist
    before the child. At the same time, e.g. when deserializing, the parent has already
    a field with all children ids. This cyclic dependency is best address, by turning
    off all listeners (such as indexes) until the data is consistent.

  */
  this.import = function(importer) {
    try {
      this.data._stopIndexing();
      importer(this);
      this.data._startIndexing();
    } finally {
      this.data.queue = [];
      this.data._startIndexing();
    }
  };

  /**
    Create a node from the given data.

    @param {Object} plain node data.
    @return {DocumentNode} The created node.

    @example

    ```js
    doc.transaction(function(tx) {
      tx.create({
        id: 'p1',
        type: 'paragraph',
        content: 'Hi I am a Substance paragraph.'
      });
    });
    ```
  */
  this.create = function(nodeData) {
    if (!nodeData.id) {
      nodeData.id = uuid$1(nodeData.type);
    }
    var op = this._create(nodeData);
    var change = new DocumentChange([op], {}, {});
    change._extractInformation(this);
    this._notifyChangeListeners(change);
    return this.data.get(nodeData.id);
  };

  /**
    Delete the node with given id.

    @param {String} nodeId
    @returns {DocumentNode} The deleted node.

    @example

    ```js
    doc.transaction(function(tx) {
      tx.delete('p1');
    });
    ```
  */
  this.delete = function(nodeId) {
    var node = this.get(nodeId);
    var op = this._delete(nodeId);
    var change = new DocumentChange([op], {}, {});
    change._extractInformation(this);
    this._notifyChangeListeners(change);
    return node;
  };

  /**
    Set a property to a new value.

    @param {String[]} property path
    @param {any} newValue
    @returns {DocumentNode} The deleted node.

    @example

    ```js
    doc.transaction(function(tx) {
      tx.set(['p1', 'content'], "Hello there! I'm a new paragraph.");
    });
    ```
  */
  this.set = function(path, value) {
    var oldValue = this.get(path);
    var op = this._set(path, value);
    var change = new DocumentChange([op], {}, {});
    change._extractInformation(this);
    this._notifyChangeListeners(change);
    return oldValue;
  };

  /**
    Update a property incrementally.

    @param {Array} property path
    @param {Object} diff
    @returns {any} The value before applying the update.

    @example


    Inserting text into a string property:
    ```
    doc.update(['p1', 'content'], { insert: {offset: 3, value: "fee"} });
    ```
    would turn "Foobar" into "Foofeebar".

    Deleting text from a string property:
    ```
    doc.update(['p1', 'content'], { delete: {start: 0, end: 3} });
    ```
    would turn "Foobar" into "bar".

    Inserting into an array:
    ```
    doc.update(['p1', 'content'], { insert: {offset: 2, value: 0} });
    ```
    would turn `[1,2,3,4]` into `[1,2,0,3,4]`.

    Deleting from an array:
    ```
    doc.update(['body', 'nodes'], { delete: 2 });
    ```
    would turn `[1,2,3,4]` into `[1,2,4]`.
  */
  this.update = function(path, diff) {
    var op = this._update(path, diff);
    var change = new DocumentChange([op], {}, {});
    change._extractInformation(this);
    this._notifyChangeListeners(change);
    return op;
  };

  /**
    Add a document index.

    @param {String} name
    @param {DocumentIndex} index
  */
  this.addIndex = function(name, index) {
    return this.data.addIndex(name, index);
  };

  /**
    @param {String} name
    @returns {DocumentIndex} the node index with given name.
  */
  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  /**
    Creates a selection which is attached to this document.
    Every selection implementation provides its own
    parameter format which is basically a JSON representation.

    @param {model/Selection} sel An object describing the selection.

    @example

    Creating a PropertySelection:

    ```js
    doc.createSelection([ 'text1', 'content'], 10, 20);
    ```

    Creating a ContainerSelection:

    ```js
    doc.createSelection('main', [ 'p1', 'content'], 10, [ 'p2', 'content'], 20)
    ```

    Creating a NullSelection:

    ```js
    doc.createSelection(null);
    ```

    You can also call this method with JSON data

    ```js
    doc.createSelection({
      type: 'property',
      path: [ 'p1', 'content'],
      startOffset: 10,
      endOffset: 20
    });
    ```
  */
  this.createSelection = function() {
    var sel = _createSelection.apply(this, arguments);
    if (!sel.isNull()) {
      sel.attach(this);
    }
    return sel;
  };


  function _createSelection() {
    var doc = this; // eslint-disable-line
    var coor, range, path, startOffset, endOffset;
    if (arguments.length === 1 && arguments[0] === null) {
      return Selection$1.nullSelection;
    }
    if (arguments[0] instanceof Coordinate) {
      coor = arguments[0];
      if (coor.isNodeCoordinate()) {
        return NodeSelection._createFromCoordinate(coor);
      } else {
        return new PropertySelection(coor.path, coor.offset, coor.offset);
      }
    }
    else if (arguments[0] instanceof Range) {
      range = arguments[0];
      var inOneNode = isEqual$1(range.start.path, range.end.path);
      if (inOneNode) {
        if (range.start.isNodeCoordinate()) {
          return NodeSelection._createFromRange(range);
        } else {
          return new PropertySelection(range.start.path, range.start.offset, range.end.offset, range.reverse, range.containerId);
        }
      } else {
        return new ContainerSelection(range.containerId, range.start.path, range.start.offset, range.end.path, range.end.offset, range.reverse);
      }
    }
    else if (arguments.length === 1 && isObject$1(arguments[0])) {
      return _createSelectionFromData(doc, arguments[0]);
    }
    // createSelection(startPath, startOffset)
    else if (arguments.length === 2 && isArray$1(arguments[0])) {
      path = arguments[0];
      startOffset = arguments[1];
      return new PropertySelection(path, startOffset, startOffset);
    }
    // createSelection(startPath, startOffset, endOffset)
    else if (arguments.length === 3 && isArray$1(arguments[0])) {
      path = arguments[0];
      startOffset = arguments[1];
      endOffset = arguments[2];
      return new PropertySelection(path, startOffset, endOffset, startOffset>endOffset);
    }
    // createSelection(containerId, startPath, startOffset, endPath, endOffset)
    else if (arguments.length === 5 && isString$1(arguments[0])) {
      return _createSelectionFromData(doc, {
        type: 'container',
        containerId: arguments[0],
        startPath: arguments[1],
        startOffset: arguments[2],
        endPath: arguments[3],
        endOffset: arguments[4]
      });
    } else {
      console.error('Illegal arguments for Selection.create().', arguments);
      return Selection$1.nullSelection;
    }
  }

  function _createSelectionFromData(doc, selData) {
    var tmp;
    if (selData.type === 'property') {
      if (selData.endOffset === null || selData.endOffset === undefined) {
        selData.endOffset = selData.startOffset;
      }
      if (!selData.hasOwnProperty('reverse')) {
        if (selData.startOffset>selData.endOffset) {
          tmp = selData.startOffset;
          selData.startOffset = selData.endOffset;
          selData.endOffset = tmp;
          selData.reverse = true;
        } else {
          selData.reverse = false;
        }
      }
      return new PropertySelection(selData.path, selData.startOffset, selData.endOffset, selData.reverse, selData.containerId, selData.surfaceId);
    } else if (selData.type === 'container') {
      var container = doc.get(selData.containerId, 'strict');
      var start = new Coordinate(selData.startPath, selData.startOffset);
      var end = new Coordinate(selData.endPath, selData.endOffset);
      var startAddress = container.getAddress(start);
      var endAddress = container.getAddress(end);
      var isReverse = selData.reverse;
      if (!startAddress) {
        throw new Error('Invalid arguments for ContainerSelection: ', start.toString());
      }
      if (!endAddress) {
        throw new Error('Invalid arguments for ContainerSelection: ', end.toString());
      }
      if (!selData.hasOwnProperty('reverse')) {
        isReverse = endAddress.isBefore(startAddress, 'strict');
        if (isReverse) {
          tmp = start;
          start = end;
          end = tmp;
        }
      }

      // ATTENTION: since Beta4 we are not supporting partial
      // selections of nodes other than text nodes
      // Thus we are turning other property coordinates into node coordinates
      _allignCoordinate(doc, start, true);
      _allignCoordinate(doc, end, false);

      return new ContainerSelection(container.id, start.path, start.offset, end.path, end.offset, isReverse, selData.surfaceId);
    }
    else if (selData.type === 'node') {
      return NodeSelection.fromJSON(selData);
    } else if (selData.type === 'custom') {
      return CustomSelection.fromJSON(selData);
    } else {
      throw new Error('Illegal selection type', selData);
    }
  }

  function _allignCoordinate(doc, coor, isStart) {
    if (!coor.isNodeCoordinate()) {
      var nodeId = coor.getNodeId();
      var node = doc.get(nodeId);
      if (!node.isText()) {
        console.warn('Selecting a non-textish node partially is not supported. Select the full node.');
        coor.path = [nodeId];
        coor.offset = isStart ? 0 : 1;
      }
    }
  }

  this.getEventProxy = function(name) {
    return this.eventProxies[name];
  };

  this.newInstance = function() {
    var DocumentClass = this.constructor;
    return new DocumentClass(this.schema);
  };

  // useful in combination with paste transformation
  this.createSnippet = function() {
    var snippet = this.newInstance();
    var snippetContainer = snippet.create({
      type: 'container',
      id: Document.SNIPPET_ID
    });
    snippet.getContainer = function() {
      return snippetContainer;
    };
    snippet.show = function() {
      snippetContainer.show.apply(snippetContainer, arguments);
    };
    return snippet;
  };

  this.fromSnapshot = function(data) {
    var doc = this.newInstance();
    doc.loadSeed(data);
    return doc;
  };

  this.getDocumentMeta = function() {
    return this.get('document');
  };

  this._apply = function(documentChange) {
    each$1(documentChange.ops, function(op) {
      this.data.apply(op);
      this.emit('operation:applied', op);
    }.bind(this));
    // extract aggregated information, such as which property has been affected etc.
    documentChange._extractInformation(this);
  };

  this._notifyChangeListeners = function(change, info) {
    info = info || {};
    this.emit('document:changed', change, info, this);
  };

  this._updateEventProxies = function(change, info) {
    each$1(this.eventProxies, function(proxy) {
      proxy.onDocumentChanged(change, info, this);
    }.bind(this));
  };

  /**
   * DEPRECATED: We will drop support as this should be done in a more
   *             controlled fashion using an importer.
   * @skip
   */
  this.loadSeed = function(seed) {
    // clear all existing nodes (as they should be there in the seed)
    each$1(this.data.nodes, function(node) {
      this.delete(node.id);
    }.bind(this));
    // create nodes
    each$1(seed.nodes, function(nodeData) {
      this.create(nodeData);
    }.bind(this));
  };

  /**
    Convert to JSON.

    @returns {Object} Plain content.
  */
  this.toJSON = function() {
    return converter.exportDocument(this);
  };

  this.getTextForSelection = function(sel) {
    console.warn('DEPRECATED: use docHelpers.getTextForSelection() instead.');
    return documentHelpers.getTextForSelection(this, sel);
  };

  this.setText = function(path, text, annotations) {
    // TODO: this should go into document helpers.
    var idx;
    var oldAnnos = this.getIndex('annotations').get(path);
    // TODO: what to do with container annotations
    for (idx = 0; idx < oldAnnos.length; idx++) {
      this.delete(oldAnnos[idx].id);
    }
    this.set(path, text);
    for (idx = 0; idx < annotations.length; idx++) {
      this.create(annotations[idx]);
    }
  };

  this._create = function(nodeData) {
    var op = this.data.create(nodeData);
    return op;
  };

  this._delete = function(nodeId) {
    var op = this.data.delete(nodeId);
    return op;
  };

  this._update = function(path, diff) {
    var op = this.data.update(path, diff);
    return op;
  };

  this._set = function(path, value) {
    var op = this.data.set(path, value);
    return op;
  };

};

EventEmitter.extend(Document);

// used by transforms copy, paste
// and by ClipboardImporter/Exporter
Document.SNIPPET_ID = "snippet";
Document.TEXT_SNIPPET_ID = "text-snippet";

var __id__$3 = 0;

/**
  A {@link model/Document} instance that is used during transaction.

  During editing a TransactionDocument is kept up-to-date with the real one.
  Whenever a transaction is started on the document, a TransactionDocument is used to
  record changes, which are applied en-bloc when the transaction is saved.

  @class
  @extends model/AbstractDocument
  @example

  @param {model/Document} document a document instance

  To start a transaction run

  ```
  doc.transaction(function(tx) {
    // use tx to record changes
  });
  ```
*/
function TransactionDocument(document, session) {
  this.__id__ = "TX_"+__id__$3++;

  this.schema = document.schema;
  this.nodeFactory = new DocumentNodeFactory(this);
  this.data = new IncrementalData(this.schema, {
    nodeFactory: this.nodeFactory
  });

  this.document = document;
  this.session = session;

  // ops recorded since transaction start
  this.ops = [];
  // app information state information used to recover the state before the transaction
  // when calling undo
  this.before = {};
  // HACK: copying all indexes
  each$1(document.data.indexes, function(index, name) {
    this.data.addIndex(name, index.clone());
  }.bind(this));

  this.loadSeed(document.toJSON());
}

TransactionDocument.Prototype = function() {

  this.reset = function() {
    this.ops = [];
    this.before = {};
  };

  this.create = function(nodeData) {
    if (!nodeData.id) {
      nodeData.id = uuid$1(nodeData.type);
    }
    if (!nodeData.type) {
      throw new Error('No node type provided');
    }
    var op = this.data.create(nodeData);
    if (!op) return;
    this.ops.push(op);
    // TODO: incremental graph returns op not the node,
    // so probably here we should too?
    return this.data.get(nodeData.id);
  };

  this.delete = function(nodeId) {
    var op = this.data.delete(nodeId);
    if (!op) return;
    this.ops.push(op);
    return op;
  };

  this.set = function(path, value) {
    var op = this.data.set(path, value);
    if (!op) return;
    this.ops.push(op);
    return op;
  };

  this.update = function(path, diffOp) {
    var op = this.data.update(path, diffOp);
    if (!op) return;
    this.ops.push(op);
    return op;
  };

  /**
    Cancels the current transaction, discarding all changes recorded so far.
  */
  this.cancel = function() {
    this._cancelTransaction();
  };

  this.getOperations = function() {
    return this.ops;
  };

  this._apply = function(documentChange) {
    documentChange.ops.forEach(function(op) {
      this.data.apply(op);
    }.bind(this));
  };

  this._transaction = function(transformation) {
    if (!isFunction$1(transformation)) {
      throw new Error('Document.transaction() requires a transformation function.');
    }
    // var time = Date.now();
    // HACK: ATM we can't deep clone as we do not have a deserialization
    // for selections.
    this._startTransaction();
    // console.log('Starting the transaction took', Date.now() - time);
    try {
      // time = Date.now();
      transformation(this, {});
      // console.log('Executing the transformation took', Date.now() - time);
      // save automatically if not canceled
      if (!this._isCancelled) {
        return this._saveTransaction();
      }
    } finally {
      if (!this._isSaved) {
        this.cancel();
      }
      // HACK: making sure that the state is reset when an exception has occurred
      this.session.isTransacting = false;
    }
  };

  this._startTransaction = function() {
    this.before = {};
    this.after = {};
    this.info = {};
    this._isCancelled = false;
    this._isSaved = false;
    // TODO: we should use a callback and not an event
    // Note: this is used to initialize
    this.document.emit('transaction:started', this);
  };

  this._saveTransaction = function() {
    if (this._isCancelled) {
      return;
    }
    var beforeState = this.before;
    var afterState = extend$1({}, beforeState, this.after);
    var ops = this.ops;
    var change;
    if (ops.length > 0) {
      change = new DocumentChange(ops, beforeState, afterState);
    }
    this._isSaved = true;
    this.reset();
    return change;
  };

  this._cancelTransaction = function() {
    // revert all recorded changes
    for (var i = this.ops.length - 1; i >= 0; i--) {
      this.data.apply(this.ops[i].invert());
    }
    // update state
    this._isCancelled = true;
    this.reset();
  };

  this.newInstance = function() {
    return this.document.newInstance();
  };

  this.isTransactionDocument = true;

};

Document.extend(TransactionDocument);

/* eslint-disable no-unused-vars */

function DefaultChangeCompressor() {
}

DefaultChangeCompressor.Prototype = function() {

  this.shouldMerge = function(lastChange, newChange) {
    return false;
    // var now = Date.now();
    // // var shouldMerge = (now - lastChange.timestamp < MAXIMUM_CHANGE_DURATION);
    // var shouldMerge = true;
    // if (shouldMerge) {
    //   // we are only interested in compressing subsequent operations while typing
    //   // TODO: we could make our lifes easier by just tagging these changes
    //   var firstOp = lastChange.ops[0];
    //   var secondOp = newChange.ops[0];
    //   var firstDiff = firstOp.diff;
    //   var secondDiff = secondOp.diff;
    //   // HACK: this check is pretty optimistic. We should tag changes, so that
    //   // we can compress only changes related to typing here.
    //   shouldMerge = (
    //     firstOp.isUpdate('string') &&
    //     secondOp.isUpdate('string') &&
    //     secondDiff.getLength() === 1 &&
    //     firstDiff.type === secondDiff.type &&
    //     isEqual(firstOp.path, secondOp.path)
    //   );
    // }

    // return shouldMerge;
  };

  /*
    This compresser tries to merge subsequent text operation
    to create more natural changes for persisting.

    @param {DocumentChange} first
    @param {DocumentChange} second
    @returns {boolean} `true` if the second could be merged into the first, `false` otherwise
  */
  this.merge = function(first, second) {
    // we are only interested in compressing subsequent operations while typing
    // TODO: we could make our lifes easier by just tagging these changes
    var firstOp = first.ops[0];
    var secondOp = second.ops[0];
    var firstDiff = firstOp.diff;
    var secondDiff = secondOp.diff;
    var mergedOp = false;
    if (firstDiff.isInsert()) {
      if (firstDiff.pos+firstDiff.getLength() === secondDiff.pos) {
        mergedOp = firstOp.toJSON();
        mergedOp.diff.str += secondDiff.str;
      }
    }
    else if (firstDiff.isDelete()) {
      // TODO: here is one case not covered
      // "012345": del(3, '3') del(3, '4') -> del(3, '34')
      if (firstDiff.pos === secondDiff.pos) {
        mergedOp = firstOp.toJSON();
        mergedOp.diff.str += secondDiff.str;
      } else if (secondDiff.pos+secondDiff.getLength() === firstDiff.pos) {
        mergedOp = firstOp.toJSON();
        mergedOp.diff = secondDiff;
        mergedOp.diff.str += firstDiff.str;
      }
    }
    if (mergedOp) {
      first.ops[0] = ObjectOperation.fromJSON(mergedOp);
      if (first.ops.length > 1) {
        // just concatenating the other ops
        // TODO: we could compress the other ops as well, e.g., updates of annotation
        // ranges as they follow the same principle as the originating text operation.
        first.ops = first.ops.concat(second.ops.slice(1));
        first.after = second.after;
      }
      return true;
    }
    return false;
  };

};

oo.initClass(DefaultChangeCompressor);

function SelectionState(doc) {
  this.document = doc;

  this.selection = Selection$1.nullSelection;
  this._state = {};
  this._resetState();
}

SelectionState.Prototype = function() {

  this.setSelection = function(sel) {
    if (!sel) {
      sel = Selection$1.nullSelection;
    } else {
      sel.attach(this.document);
    }
    // TODO: selection state is selection plus derived state,
    // thus we need to return false only if both did not change
    this._deriveState(sel);
    this.selection = sel;
    return true;
  };

  this.getSelection = function() {
    return this.selection;
  };

  this.getAnnotationsForType = function(type) {
    var state = this._state;
    if (state.annosByType) {
      return state.annosByType.get(type) || [];
    }
    return [];
  };

  this.isInlineNodeSelection = function() {
    return this._state.isInlineNodeSelection;
  };

  this._deriveState = function(sel) {
    var doc = this.document;

    this._resetState();
    var state = this._state;

    // create a mapping by type for the currently selected annotations
    var annosByType = new TreeIndex.Arrays();
    var propAnnos = documentHelpers.getPropertyAnnotationsForSelection(doc, sel);
    propAnnos.forEach(function(anno) {
      annosByType.add(anno.type, anno);
    });

    if (propAnnos.length === 1 && propAnnos[0].isInline()) {
      state.isInlineNodeSelection = propAnnos[0].getSelection().equals(sel);
    }

    var containerId = sel.containerId;
    if (containerId) {
      var containerAnnos = documentHelpers.getContainerAnnotationsForSelection(doc, sel, containerId);
      containerAnnos.forEach(function(anno) {
        annosByType.add(anno.type, anno);
      });
    }
    state.annosByType = annosByType;
  };

  this._resetState = function() {
    this._state = {
      // all annotations under the current selection
      annosByType: null,
      // flags to make node selection (IsolatedNodes) stuff more convenient
      isNodeSelection: false,
      nodeId: null,
      nodeSelectionMode: '', // full, before, after
      // flags for inline nodes
      isInlineNodeSelection: false
    };
    return this._state;
  };

};

oo.initClass(SelectionState);

var __id__$2 = 0;

function DocumentSession(doc, options) {
  DocumentSession.super.apply(this);

  this.__id__ = __id__$2++;

  options = options || {};
  this.doc = doc;
  this.selectionState = new SelectionState(doc);

  // the stage is a essentially a clone of this document
  // used to apply a sequence of document operations
  // without touching this document
  this.stage = new TransactionDocument(this.doc, this);
  this.isTransacting = false;

  this.doneChanges = [];
  this.undoneChanges = [];
  this._lastChange = null;

  this.compressor = options.compressor || new DefaultChangeCompressor();
  this.saveHandler = options.saveHandler;

  // Note: registering twice:
  // to do internal transformations in case changes are coming
  // in from another session -- this must be done as early as possible
  this.doc.on('document:changed', this.onDocumentChange, this, {priority: 1000});
}

DocumentSession.Prototype = function() {

  this.getDocument = function() {
    return this.doc;
  };

  this.getSelection = function() {
    return this.selectionState.getSelection();
  };

  this.setSelection = function(sel) {
    if (sel && isPlainObject$1(sel)) {
      sel = this.doc.createSelection(sel);
    }
    var selectionHasChanged = this._setSelection(sel);
    if(selectionHasChanged) {
      this._triggerUpdateEvent({
        selection: sel
      });
    }
  };

  this.createSelection = function() {
    return this.doc.createSelection.apply(this.doc, arguments);
  };

  this.getSelectionState = function() {
    return this.selectionState;
  };

  /*
    Set saveHandler via API

    E.g. if saveHandler not available at construction
  */
  this.setSaveHandler = function(saveHandler) {
    this.saveHandler = saveHandler;
  };

  this.getCollaborators = function() {
    return null;
  };

  this.canUndo = function() {
    return this.doneChanges.length > 0;
  };

  this.canRedo = function() {
    return this.undoneChanges.length > 0;
  };

  this.undo = function() {
    this._undoRedo('undo');
  };

  this.redo = function() {
    this._undoRedo('redo');
  };


  this._undoRedo = function(which) {
    var from, to;
    if (which === 'redo') {
      from = this.undoneChanges;
      to = this.doneChanges;
    } else {
      from = this.doneChanges;
      to = this.undoneChanges;
    }
    var change = from.pop();
    if (change) {
      this.stage._apply(change);
      this.doc._apply(change);
      var sel = change.after.selection;
      if (sel) {
        sel.attach(this.doc);
      }
      var selectionHasChanged = this._setSelection(sel);
      to.push(change.invert());
      var update = {
        change: change
      };
      if (selectionHasChanged) update.selection = sel;
      this._triggerUpdateEvent(update, { replay: true });
    } else {
      console.warn('No change can be %s.', (which === 'undo'? 'undone':'redone'));
    }
  };

  /**
    Start a transaction to manipulate the document

    @param {function} transformation a function(tx) that performs actions on the transaction document tx

    @example

    ```js
    doc.transaction(function(tx, args) {
      tx.update(...);
      ...
      return {
        selection: newSelection
      };
    })
    ```
  */
  this.transaction = function(transformation, info) {
    if (this.isTransacting) {
      throw new Error('Nested transactions are not supported.');
    }
    this.isTransacting = true;
    this.stage.reset();
    var sel = this.getSelection();
    info = info || {};
    var surfaceId = sel.surfaceId;
    var change = this.stage._transaction(function(tx) {
      tx.before.selection = sel;
      var args = { selection: sel };
      var result = transformation(tx, args) || {};
      sel = result.selection || sel;
      if (sel._isSelection && !sel.isNull() && !sel.surfaceId) {
        sel.surfaceId = surfaceId;
      }
      tx.after.selection = sel;
      extend$1(info, tx.info);
    });
    if (change) {
      this.isTransacting = false;
      this._commit(change, info);
      return change;
    } else {
      this.isTransacting = false;
    }
  };

  this.onDocumentChange = function(change, info) {
    // ATTENTION: this is used if you have two independent DocumentSessions
    // in one client.
    if (info && info.session !== this) {
      this.stage._apply(change);
      this._transformLocalChangeHistory(change, info);
      var update = {
        change: change
      };
      var newSelection = this._transformSelection(change, info);
      var selectionHasChanged = this._setSelection(newSelection);
      if (selectionHasChanged) update.selection = newSelection;
      // this._triggerUpdateEvent(update, info);
    }
  };

  this._setSelection = function(sel) {
    return this.selectionState.setSelection(sel);
  };

  this._transformLocalChangeHistory = function(externalChange) {
    // Transform the change history
    // Note: using a clone as the transform is done inplace
    // which is ok for the changes in the undo history, but not
    // for the external change
    var clone = {
      ops: externalChange.ops.map(function(op) { return op.clone(); })
    };
    DocumentChange.transformInplace(clone, this.doneChanges);
    DocumentChange.transformInplace(clone, this.undoneChanges);
  };

  this._transformSelection = function(change) {
    var oldSelection = this.getSelection();
    var newSelection = DocumentChange.transformSelection(oldSelection, change);
    // console.log('Transformed selection', change, oldSelection.toString(), newSelection.toString());
    return newSelection;
  };

  this._commit = function(change, info) {
    var selectionHasChanged = this._commitChange(change);
    var update = {
      change: change
    };
    if (selectionHasChanged) update.selection = this.getSelection();
    this._triggerUpdateEvent(update, info);
  };

  this._commitChange = function(change) {
    change.timestamp = Date.now();
    // update document model
    this.doc._apply(change);

    var currentChange = this._currentChange;
    // try to merge this change with the last to get more natural changes
    // e.g. not every keystroke, but typed words or such.
    var merged = false;
    if (currentChange) {
      if (this.compressor.shouldMerge(currentChange, change)) {
        merged = this.compressor.merge(currentChange, change);
      }
    }
    if (!merged) {
      // push to undo queue and wipe the redo queue
      this._currentChange = change;
      this.doneChanges.push(change.invert());
    }
    // discard old redo history
    this.undoneChanges = [];

    var newSelection = change.after.selection || Selection$1.nullSelection;
    var selectionHasChanged = this._setSelection(newSelection);
    // HACK injecting the surfaceId here...
    // TODO: we should find out where the best place is to do this
    if (!newSelection.isNull()) {
      newSelection.surfaceId = change.after.surfaceId;
    }
    return selectionHasChanged;
  };

  /*
    Are there unsaved changes?
  */
  this.isDirty = function() {
    return this._dirty;
  };

  /*
    Save session / document
  */
  this.save = function() {
    var doc = this.getDocument();
    var saveHandler = this.saveHandler;

    if (this._dirty && !this._isSaving) {
      this._isSaving = true;
      // Pass saving logic to the user defined callback if available
      if (saveHandler) {
        // TODO: calculate changes since last save
        var changes = [];
        saveHandler.saveDocument(doc, changes, function(err) {

          this._isSaving = false;
          if (err) {
            console.error('Error during save');
          } else {
            this._dirty = false;
            this._triggerUpdateEvent({}, {force: true});
          }
        }.bind(this));

      } else {
        console.error('Document saving is not handled at the moment. Make sure saveHandler instance provided to documentSession');
      }
    }
  };

  this._triggerUpdateEvent = function(update, info) {
    info = info || {};
    info.session = this;
    if (update.change && update.change.ops.length > 0) {
      // TODO: I would like to wrap this with a try catch.
      // however, debugging gets inconvenient as caught exceptions don't trigger a breakpoint
      // by default, and other libraries such as jquery throw noisily.
      this.doc._notifyChangeListeners(update.change, info);
      this._dirty = true;
    } else {
      // HACK: removing this from the update when it is NOP
      // this way, we only need to do this check here
      delete update.change;
    }
    if (Object.keys(update).length > 0 || info.force) {
      // slots to have more control about when things get
      // updated, and things have been rendered/updated
      this.emit('update', update, info);
      this.emit('didUpdate', update, info);
    }
  };
};

oo.inherit(DocumentSession, EventEmitter);

/*
  Session that is connected to a Substance Hub allowing
  collaboration in real-time.

  Requires a connected and authenticated collabClient.
*/
class CollabSession extends DocumentSession {
  constructor(doc, config) {
    super(doc, config)

    config = config || {}
    this.config = config
    this.collabClient = config.collabClient

    if (config.docVersion) {
      console.warn('config.docVersion is deprecated: Use config.version instead')
    }

    if (config.docVersion) {
      console.warn('config.docId is deprecated: Use config.documentId instead')
    }

    this.version = config.version
    this.documentId = config.documentId || config.docId

    if (config.autoSync !== undefined) {
      this.autoSync = config.autoSync
    } else {
      this.autoSync = true
    }

    if (!this.documentId) {
      throw new SubstanceError('InvalidArgumentsError', {message: 'documentId is mandatory'})
    }

    if (typeof this.version === undefined) {
      throw new SubstanceError('InvalidArgumentsError', {message: 'version is mandatory'})
    }

    // Internal state
    this._connected = false // gets flipped to true in syncDone
    this._nextChange = null // next change to be sent over the wire
    this._pendingChange = null // change that is currently being synced
    this._error = null

    // Note: registering a second document:changed handler where we trigger sync requests
    this.doc.on('document:changed', this.afterDocumentChange, this, {priority: -10})

    // Bind handlers
    this._broadCastSelectionUpdateDebounced = debounce$1(this._broadCastSelectionUpdate, 250)

    // Keep track of collaborators in a session
    this.collaborators = {}

    // This happens on a reconnect
    this.collabClient.on('connected', this.onCollabClientConnected, this)
    this.collabClient.on('disconnected', this.onCollabClientDisconnected, this)

    // Constraints used for computing color indexes
    this.__maxColors = 5
    this.__nextColorIndex = 0
    this.collabClient.on('message', this._onMessage.bind(this))

    // Attempt to open a document immediately, but only if the collabClient is
    // already connected. If not the _onConnected handler will take care of it
    // once websocket connection is ready.
    if (this.collabClient.isConnected() && this.autoSync) {
      this.sync()
    }
  }

  /*
    Unregister event handlers. Call this before throw away
    a CollabSession reference. Otherwise you will leak memory
  */
  dispose() {
    this.disconnect()
    this.collabClient.off(this)
  }

  /*
    Explicit disconnect initiated by user
  */
  disconnect() {
    // Let the server know we no longer want to edit this document
    let msg = {
      type: 'disconnect',
      documentId: this.documentId
    }

    // We abort pening syncs
    this._abortSync()
    this._send(msg)
  }

  /*
    Synchronize with collab server
  */
  sync() {

    // If there is something to sync and there is no running sync
    if (this.__canSync()) {
      let nextChange = this._getNextChange()
      let msg = {
        type: 'sync',
        documentId: this.documentId,
        version: this.version,
        change: this.serializeChange(nextChange)
      }

      this._send(msg)
      this._pendingChange = nextChange
      // Can be used to reset errors that arised from previous syncs.
      // When a new sync is started, users can use this event to unset the error
      this.emit('sync')
      this._nextChange = null
      this._error = null
    } else {
      console.error('Can not sync. Either collabClient is not connected or we are already syncing')
    }
  }

  /*
    When selection is changed explicitly by the user we broadcast
    that update to other collaborators
  */
  setSelection(sel) {
    // We just remember beforeSel on the CollabSession (need for connect use-case)
    let beforeSel = this.selection
    super.setSelection.call(this, sel)
    this._broadCastSelectionUpdateDebounced(beforeSel, sel)
  }

  getCollaborators() {
    return this.collaborators
  }

  isConnected() {
    return this._connected
  }

  serializeChange(change) {
    return change.toJSON()
  }

  deserializeChange(serializedChange) {
    return DocumentChange.fromJSON(serializedChange)
  }

  /* Message handlers
     ================ */

  /*
    Dispatching of remote messages.
  */
  _onMessage(msg) {
    // Skip if message is not addressing this document
    if (msg.documentId !== this.documentId) {
      return false
    }
    // clone the msg to make sure that the original does not get altered
    msg = cloneDeep$1(msg)
    switch (msg.type) {
      case 'syncDone':
        this.syncDone(msg)
        break
      case 'syncError':
        this.syncError(msg)
        break
      case 'update':
        this.update(msg)
        break
      case 'disconnectDone':
        this.disconnectDone(msg)
        break
      case 'error':
        this.error(msg)
        break
      default:
        console.error('CollabSession: unsupported message', msg.type, msg)
        return false
    }
    return true
  }

  /*
    Send message

    Returns true if sent, false if not sent (e.g. when not connected)
  */
  _send(msg) {
    if (this.collabClient.isConnected()) {
      this.collabClient.send(msg)
      return true
    } else {
      console.warn('Try not to call _send when disconnected. Skipping message', msg)
      return false
    }
  }

  /*
    Apply remote update

    We receive an update from the server. We only apply the remote change if
    there's no pending commit. applyRemoteUpdate is also called for selection
    updates.

    If we are currently in the middle of a sync or have local changes we just
    ignore the update. We will receive all server updates on the next syncDone.
  */
  update(args) {
    // console.log('CollabSession.update(): received remote update', args);
    let serverChange = args.change
    let collaborators = args.collaborators
    let serverVersion = args.version

    if (!this._nextChange && !this._pendingChange) {
      let oldSelection = this.selection
      if (serverChange) {
        serverChange = this.deserializeChange(serverChange)
        this._applyRemoteChange(serverChange)
      }
      let newSelection = this.selection
      if (serverVersion) {
        this.version = serverVersion
      }
      let update = {
        change: serverChange
      }
      if (newSelection !== oldSelection) {
        update.selection = newSelection
      }
      // collaboratorsChange only contains information about
      // changed collaborators
      let collaboratorsChange = this._updateCollaborators(collaborators)
      if (collaboratorsChange) {
        update.collaborators = collaboratorsChange
        this.emit('collaborators:changed')
      }
      this._triggerUpdateEvent(update, { remote: true })
    } else {
      // console.log('skipped remote update. Pending sync or local changes.');
    }
  }

  /*
    Sync has completed

    We apply server changes that happened in the meanwhile and we update
    the collaborators (=selections etc.)
  */
  syncDone(args) {
    let serverChange = args.serverChange
    let collaborators = args.collaborators
    let serverVersion = args.version

    if (serverChange) {
      serverChange = this.deserializeChange(serverChange)
      this._applyRemoteChange(serverChange)
    }
    this.version = serverVersion

    // Only apply updated collaborators if there are no local changes
    // Otherwise they will not be accurate. We can safely skip this
    // here as we know the next sync will be triggered soon. And if
    // followed by an idle phase (_nextChange = null) will give us
    // the latest collaborator records
    let collaboratorsChange = this._updateCollaborators(collaborators)
    if (this._nextChange) {
      this._transformCollaboratorSelections(this._nextChange)
    }

    // Important: after sync is done we need to reset _pendingChange and _error
    // In this state we can safely listen to
    this._pendingChange = null
    this._error = null

    // Each time the sync worked we consider the system connected
    this._connected = true

    let update = {
      change: serverChange
    }
    if (collaboratorsChange) {
      update.collaborators = collaboratorsChange
    }
    this._triggerUpdateEvent(update, { remote: true })

    this.emit('connected')
    // Attempt to sync again (maybe we have new local changes)
    this._requestSync()
  }

  /*
    Handle sync error
  */
  syncError(error) {
    error('Sync error:', error)
    this._abortSync()
  }

  disconnectDone() {
    // console.log('disconnect done');
    // Let the server know we no longer want to edit this document
    this._afterDisconnected()
  }

  /*
    Handle errors. This gets called if any request produced
    an error on the server.
  */

  error(message) {
    let error = message.error
    let errorFn = this[error.name]
    let err = SubstanceError.fromJSON(error)

    if (!errorFn) {
      error('CollabSession: unsupported error', error.name)
      return false
    }

    this.emit('error', err)
    errorFn = errorFn.bind(this)
    errorFn(err)
  }


  /* Event handlers
     ============== */

  afterDocumentChange(change, info) {
    // Record local changes into nextCommit
    if (!info.remote) {
      this._recordChange(change)
    }
  }

  /*
    A new authenticated collabClient connection is available.

    This happens in a reconnect scenario.
  */
  onCollabClientConnected() {
    // console.log('CollabClient connected');
    if (this.autoSync) {
      this.sync()
    }
  }

  /*
    Implicit disconnect (server connection drop out)
  */
  onCollabClientDisconnected() {
    // console.log('CollabClient disconnected');
    this._abortSync()
    if (this._connected) {
      this._afterDisconnected()
    }
  }

  /* Internal methods
     ================ */

  _commit(change, info) {
    let selectionHasChanged = this._commitChange(change)

    let collaboratorsChange = null
    forEach$1(this.getCollaborators(), function(collaborator) {
      // transform local version of collaborator selection
      let id = collaborator.collaboratorId
      let oldSelection = collaborator.selection
      let newSelection = DocumentChange.transformSelection(oldSelection, change)
      if (oldSelection !== newSelection) {
        collaboratorsChange = collaboratorsChange || {}
        collaborator = clone$1(collaborator)
        collaborator.selection = newSelection
        collaboratorsChange[id] = collaborator
      }
    })

    let update = {
      change: change
    }
    if (selectionHasChanged) {
      update.selection = this.getSelection()
    }
    if (collaboratorsChange) {
      update.collaborators = collaboratorsChange
    }
    this._triggerUpdateEvent(update, info)
  }

  /*
    Apply a change to the document
  */
  _applyRemoteChange(change) {
    // console.log('CollabSession: applying remote change');
    if (change.ops.length > 0) {
      this.stage._apply(change)
      this.doc._apply(change)
      // Only undo+redo history is updated according to the new change
      this._transformLocalChangeHistory(change)
      this.selection = this._transformSelection(change)
    }
  }

  /*
    We record all local changes into a single change (aka commit) that
  */
  _recordChange(change) {
    if (!this._nextChange) {
      this._nextChange = change
    } else {
      // Merge new change into nextCommit
      this._nextChange.ops = this._nextChange.ops.concat(change.ops)
      this._nextChange.after = change.after
    }
    this._requestSync()
  }

  /*
    Get next change for sync.

    If there are no local changes we create a change that only
    holds the current selection.
  */
  _getNextChange() {
    var nextChange = this._nextChange
    if (!nextChange) {
      // Change only holds the current selection
      nextChange = this._getChangeForSelection(this.selection, this.selection)
    }
    return nextChange
  }

  /*
    Send selection update to other collaborators
  */
  _broadCastSelectionUpdate(beforeSel, afterSel) {
    if (this._nextChange) {
      this._nextChange.after.selection = afterSel
    } else {
      this._nextChange = this._getChangeForSelection(beforeSel, afterSel)
    }
    this._requestSync()
  }

  __canSync() {
    return this.collabClient.isConnected() && !this._pendingChange
  }

  /*
    Triggers a new sync if there is a new change and no pending sync
  */
  _requestSync() {
    if (this._nextChange && this.__canSync()) {
      this.sync()
    }
  }

  /*
    Abots the currently running sync.

    This is called _onDisconnect and could be called after a sync request
    times out (not yet implemented)
  */
  _abortSync() {
    let newNextChange = this._nextChange

    if (this._pendingChange) {
      newNextChange = this._pendingChange
      // If we have local changes also, we append them to the new nextChange
      if (this._nextChange) {
        newNextChange.ops = newNextChange.ops.concat(this._nextChange.ops)
        newNextChange.after = this._nextChange.after
      }
      this._pendingChange = null
    }
    this._error = null
    this._nextChange = newNextChange
  }

  _transformCollaboratorSelections(change) {
    // console.log('Transforming selection...', this.__id__);
    // Transform the selection
    let collaborators = this.getCollaborators()
    if (collaborators) {
      forEach$1(collaborators, function(collaborator) {
        DocumentChange.transformSelection(collaborator.selection, change)
      })
    }
  }

  _updateCollaborators(collaborators) {
    let collaboratorsChange = {}

    forEach$1(collaborators, function(collaborator, collaboratorId) {
      if (collaborator) {
        let oldSelection
        let old = this.collaborators[collaboratorId]
        if (old) {
          oldSelection = old.selection
        }
        let newSelection = Selection$1.fromJSON(collaborator.selection)
        newSelection.attach(this.doc)

        // Assign colorIndex (try to restore from old record)
        collaborator.colorIndex = old ? old.colorIndex : this._getNextColorIndex()
        collaborator.selection = newSelection
        this.collaborators[collaboratorId] = collaborator
        if (!newSelection.equals(oldSelection)) {
          collaboratorsChange[collaboratorId] = collaborator
        }
      } else {
        collaboratorsChange[collaboratorId] = null
        delete this.collaborators[collaboratorId]
      }
    }.bind(this))

    if (Object.keys(collaboratorsChange).length>0) {
      return collaboratorsChange
    }
  }

  /*
    Sets the correct state after a collab session has been disconnected
    either explicitly or triggered by a connection drop out.
  */
  _afterDisconnected() {
    let oldCollaborators = this.collaborators
    this.collaborators = {}
    let collaboratorIds = Object.keys(oldCollaborators)
    if (collaboratorIds.length > 0) {
      let collaboratorsChange = {}
      // when this user disconnects we will need to remove all rendered collaborator infos (such as selection)
      collaboratorIds.forEach(function(collaboratorId) {
        collaboratorsChange[collaboratorId] = null
      })
      this._triggerUpdateEvent({
        collaborators: collaboratorsChange
      })
    }
    this._connected = false
    this.emit('disconnected')
  }

  /*
    Takes beforeSel + afterSel and wraps it in a no-op DocumentChange
  */
  _getChangeForSelection(beforeSel, afterSel) {
    let change = new DocumentChange([], {
      selection: beforeSel
    }, {
      selection: afterSel
    })
    return change
  }

  /*
    Returns true if there are local changes
  */
  _hasLocalChanges() {
    return this._nextChange && this._nextChange.ops.length > 0
  }

  /*
    Get color index for rendering cursors and selections in round robin style.
    Note: This implementation considers a configured maxColors value. The
    first color will be reused as more then maxColors collaborators arrive.
  */
  _getNextColorIndex() {
    let colorIndex = this.__nextColorIndex
    this.__nextColorIndex = (this.__nextColorIndex + 1) % this.__maxColors
    return colorIndex + 1 // so we can 1..5 instead of 0..4
  }

}

/**
  Performs an asynchronous HTTP request.

  @param {String} method HTTP method to use for the request
  @param {String} url url to which the request is sent
  @param {Object} data json to be sent to the server
  @param {Function} cb callback that takes error and response data

  @example

  ```js
  request('GET', './data.json', null, function(err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
  ```
*/

function request(method, url, data, cb) {
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var res = request.responseText;
      if(isJson(res)) res = JSON.parse(res);
      cb(null, res);
    } else {
      return cb(new Error('Request failed. Returned status: ' + request.status));
    }
  };

  if (data) {
    request.send(JSON.stringify(data));
  } else {
    request.send();
  }
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/*
  HTTP client for talking with DocumentServer
*/
class DocumentClient {
  constructor(config) {
    this.config = config
  }

  /*
    Create a new document on the server

    ```js
    @example
    ```

    documentClient.createDocument({
      schemaName: 'prose-article',
      info: {
        userId: 'userx'
      }
    });
  */
  createDocument(newDocument, cb) {
    request('POST', this.config.httpUrl, newDocument, cb)
  }

  /*
    Get a document from the server

    @example

    ```js
    documentClient.getDocument('mydoc-id');
    ```
  */

  getDocument(documentId, cb) {
    request('GET', this.config.httpUrl+documentId, null, cb)
  }

  /*
    Remove a document from the server

    @example

    ```js
    documentClient.deleteDocument('mydoc-id');
    ```
  */

  deleteDocument(documentId, cb) {
    request('DELETE', this.config.httpUrl+documentId, null, cb)
  }

}

oo.initClass(DocumentClient)

let converter$1 = new JSONConverter()
/**
  API for creating and retrieving snapshots of documents
*/
class SnapshotEngine {
  constructor(config) {
    this.configurator = config.configurator
    this.changeStore = config.changeStore
    this.documentStore = config.documentStore

    // Optional
    this.snapshotStore = config.snapshotStore
    // Snapshot creation frequency,
    // e.g. if it's equals 15 then every
    // 15th version will be saved as snapshot
    this.frequency = config.frequency || 1
  }

  /*
    Returns a snapshot for a given documentId and version
  */
  getSnapshot(args, cb) {
    if (!args || !args.documentId) {
      return cb(new SubstanceError('InvalidArgumentsError', {
        message: 'args requires a documentId'
      }))
    }
    this._computeSnapshot(args, cb)
  }

  /*
    Called by DocumentEngine.addChange.

    Here the implementer decides whether a snapshot should be created or not.
    It may be a good strategy to only create a snaphot for every 10th version.
    However for now we will just snapshot each change to keep things simple.

    TODO: this could potentially live in DocumentEngine
  */
  requestSnapshot(documentId, version, cb) {
    if (this.snapshotStore && version % this.frequency === 0) {
      this.createSnapshot({
        documentId: documentId
      }, cb)
    } else {
      cb(null) // do nothing
    }
  }

  /*
    Creates a snapshot
  */
  createSnapshot(args, cb) {
    if (!this.snapshotStore) {
      throw new SubstanceError('SnapshotStoreRequiredError', {
        message: 'You must provide a snapshot store to be able to create snapshots'
      })
    }
    this._computeSnapshot(args, function(err, snapshot) {
      if (err) return cb(err)
      this.snapshotStore.saveSnapshot(snapshot, cb)
    }.bind(this))
  }

  /*
    Compute a snapshot based on the documentId and version (optional)

    If no version is provided a snaphot for the latest version is created.
  */
  _computeSnapshot(args, cb) {
    this.documentStore.getDocument(args.documentId, function(err, docRecord) {
      if (err) return cb(err)

      if (args.version === undefined) {
        args.version = docRecord.version // set version to the latest version
      }

      // We add the docRecord to the args object
      args.docRecord = docRecord

      if (this.snapshotStore && args.version !== 0) {
        this._computeSnapshotSmart(args, cb)
      } else {
        this._computeSnapshotDumb(args, cb)
      }
    }.bind(this))
  }

  /*
    Used when a snapshot store is present. This way gives a huge performance
    benefit.

    Example: Let's assume we want to request a snapshot for a new version 20.
    Now getLatestSnapshot will give us version 15. This requires us to fetch
    the changes since version 16 and apply those, plus the very new change.
  */
  _computeSnapshotSmart(args, cb) {
    let documentId = args.documentId
    let version = args.version
    let docRecord = args.docRecord
    let doc

    // snaphot = null if no snapshot has been found
    this.snapshotStore.getSnapshot({
      documentId: documentId,
      version: version,
      findClosest: true
    }, function(err, snapshot) {
      if (err) return cb(err)

      if (snapshot && version === snapshot.version) {
        // we alread have a snapshot for this version
        return cb(null, snapshot)
      }

      let knownVersion
      if (snapshot) {
        knownVersion = snapshot.version
      } else {
        knownVersion = 0 // we need to fetch all changes
      }

      doc = this._createDocumentInstance(docRecord.schemaName)
      if (snapshot) {
        doc = converter$1.importDocument(doc, snapshot.data)
      }

      // Now we get the remaining changes after the known version
      this.changeStore.getChanges({
        documentId: documentId,
        sinceVersion: knownVersion, // 1
        toVersion: version // 2
      }, function(err, result) {
        if (err) cb(err)
        // Apply remaining changes to the doc
        this._applyChanges(doc, result.changes)
        // doc here should be already restored
        let snapshot = {
          documentId: documentId,
          version: version,
          data: converter$1.exportDocument(doc)
        }
        cb(null, snapshot)
      }.bind(this))
    }.bind(this))
  }

  /*
    Compute a snapshot in a dumb way by applying the full change history
  */
  _computeSnapshotDumb(args, cb) {
    let documentId = args.documentId
    let version = args.version
    let docRecord = args.docRecord
    let doc

    // Get all changes for a document
    this.changeStore.getChanges({
      documentId: documentId,
      sinceVersion: 0
    }, function(err, result) {
      if (err) cb(err);
      doc = this._createDocumentInstance(docRecord.schemaName)
      // Apply remaining changes to the doc
      this._applyChanges(doc, result.changes)
      // doc here should be already restored
      let snapshot = {
        documentId: documentId,
        version: version,
        data: converter$1.exportDocument(doc)
      }
      cb(null, snapshot)
    }.bind(this))
  }

  /*
    Based on a given schema create a document instance based
    on given schema configuration
  */
  _createDocumentInstance(schemaName) {
    let schema = this.configurator.getSchema()

    if (schema.name !== schemaName) {
      throw new SubstanceError('SnapshotEngine.SchemaNotFoundError', {
        message:'Schema ' + schemaName + ' not found'
      })
    }
    let doc = this.configurator.createArticle()
    return doc
  }

  /*
    Takes a document and applies the given changes
  */
  _applyChanges(doc, changes) {
    each$1(changes, function(change) {
      each$1(change.ops, function(op) {
        doc.data.apply(op)
      })
    })
  }

}

oo.initClass(SnapshotEngine)

/*
  DocumentEngine
*/
class DocumentEngine extends EventEmitter {
  constructor(config) {
    super()

    this.configurator = config.configurator
    // Where changes are stored
    this.documentStore = config.documentStore
    this.changeStore = config.changeStore

    // SnapshotEngine instance is required
    this.snapshotEngine = config.snapshotEngine || new SnapshotEngine({
      configurator: this.configurator,
      documentStore: this.documentStore,
      changeStore: this.changeStore
    })
  }

  /*
    Creates a new empty or prefilled document

    Writes the initial change into the database.
    Returns the JSON serialized version, as a starting point
  */
  createDocument(args, cb) {
    let schema = this.configurator.getSchema()
    if (!schema) {
      return cb(new SubstanceError('SchemaNotFoundError', {
        message: 'Schema not found for ' + args.schemaName
      }))
    }

    let doc = this.configurator.createArticle()

    // TODO: I have the feeling that this is the wrong approach.
    // While in our tests we have seeds I don't think that this is a general pattern.
    // A vanilla document should be just empty, or just have what its constructor
    // is creating.
    // To create some initial content, we should use the editor,
    // e.g. an automated script running after creating the document.

    // HACK: we use the info object for the change as well, however
    // we should be able to control this separately.

    this.documentStore.createDocument({
      schemaName: schema.name,
      schemaVersion: schema.version,
      documentId: args.documentId,
      version: 0, // we start with version 0 and waiting for the initial seed change from client
      info: args.info
    }, function(err, docRecord) {
      if (err) {
        return cb(new SubstanceError('CreateError', {
          cause: err
        }))
      }

      let converter = new JSONConverter();
      cb(null, {
        documentId: docRecord.documentId,
        data: converter.exportDocument(doc),
        version: 0
      })
    }.bind(this)) //eslint-disable-line
  }

  /*
    Get a document snapshot.

    @param args.documentId
    @param args.version
  */
  getDocument(args, cb) {
    this.snapshotEngine.getSnapshot(args, cb)
  }

  /*
    Delete document by documentId
  */
  deleteDocument(documentId, cb) {
    this.changeStore.deleteChanges(documentId, function(err) {
      if (err) {
        return cb(new SubstanceError('DeleteError', {
          cause: err
        }))
      }
      this.documentStore.deleteDocument(documentId, function(err, doc) {
        if (err) {
          return cb(new SubstanceError('DeleteError', {
            cause: err
          }))
        }
        cb(null, doc)
      });
    }.bind(this))
  }

  /*
    Check if a given document exists
  */
  documentExists(documentId, cb) {
    this.documentStore.documentExists(documentId, cb)
  }

  /*
    Get changes based on documentId, sinceVersion
  */
  getChanges(args, cb) {
    this.documentExists(args.documentId, function(err, exists) {
      if (err || !exists) {
        return cb(new SubstanceError('ReadError', {
          message: !exists ? 'Document does not exist' : null,
          cause: err
        }))
      }
      this.changeStore.getChanges(args, cb)
    }.bind(this))
  }

  /*
    Get version for given documentId
  */
  getVersion(documentId, cb) {
    this.documentExists(documentId, function(err, exists) {
      if (err || !exists) {
        return cb(new SubstanceError('ReadError', {
          message: !exists ? 'Document does not exist' : null,
          cause: err
        }))
      }
      this.changeStore.getVersion(documentId, cb)
    }.bind(this))
  }

  /*
    Add change to a given documentId

    args: documentId, change [, documentInfo]
  */
  addChange(args, cb) {
    this.documentExists(args.documentId, function(err, exists) {
      if (err || !exists) {
        return cb(new SubstanceError('ReadError', {
          message: !exists ? 'Document does not exist' : null,
          cause: err
        }))
      }
      this.changeStore.addChange(args, function(err, newVersion) {
        if (err) return cb(err);
        // We write the new version to the document store.
        this.documentStore.updateDocument(args.documentId, {
          version: newVersion,
          // Store custom documentInfo
          info: args.documentInfo
        }, function(err) {
          if (err) return cb(err)
          this.snapshotEngine.requestSnapshot(args.documentId, newVersion, function() {
            // no matter if errored or not we will complete the addChange
            // successfully
            cb(null, newVersion)
          })
        }.bind(this))
      }.bind(this))
    }.bind(this))
  }

}

/*
  DocumentServer module. Can be bound to an express instance
*/
class DocumentServer {
  constructor(config) {
    this.engine = config.documentEngine
    this.path = config.path
  }

  /*
    Attach this server to an express instance
  */
  bind(app) {
    app.post(this.path, this._createDocument.bind(this))
    app.get(this.path + '/:id', this._getDocument.bind(this))
    app.delete(this.path + '/:id', this._deleteDocument.bind(this))
  }

  /*
    Create a new document, given a schemaName and schemaVersion
  */
  _createDocument(req, res, next) {
    let args = req.body
    let newDoc = {
      schemaName: args.schemaName, // e.g. prose-article
      info: args.info // optional
    }

    this.engine.createDocument(newDoc, function(err, result) {
      if (err) return next(err)
      res.json(result)
    })
  }

  /*
    Get a document with given document id
  */
  _getDocument(req, res, next) {
    let documentId = req.params.id
    this.engine.getDocument({
      documentId: documentId
    }, function(err, result) {
      if (err) return next(err)
      res.json(result)
    })
  }

  /*
    Remove a document with given document id
  */
  _deleteDocument(req, res, next) {
    let documentId = req.params.id
    this.engine.deleteDocument(documentId, function(err, result) {
      if (err) return next(err)
      res.json(result)
    })
  }
}

oo.initClass(DocumentServer)

/*
  Implements Substance DocumentStore API. This is just a dumb store.
  No integrity checks are made, as this is the task of DocumentEngine
*/
class DocumentStore {
  constructor(config) {
    this.config = config
  }

  /*
    Create a new document record

    @return {Object} document record
  */
  createDocument(props, cb) {

    if (!props.documentId) {
      // We generate a documentId ourselves
      props.documentId = uuid$1()
    }

    let exists = this._documentExists(props.documentId);
    if (exists) {
      return cb(new SubstanceError('DocumentStore.CreateError', {
        message: 'Could not create because document already exists.'
      }))
    }
    this._createDocument(props)
  }

  /*
    Get document by documentId
  */
  getDocument(documentId, cb) {
    let doc = this._getDocument(documentId)
    if (!doc) {
      return cb(new SubstanceError('DocumentStore.ReadError', {
        message: 'Document could not be found.'
      }))
    }
    cb(null, doc)
  }

  /*
    Update document record
  */
  updateDocument(documentId, newProps, cb) {
    let exists = this._documentExists(documentId)
    if (!exists) {
      return cb(new SubstanceError('DocumentStore.UpdateError', {
        message: 'Document does not exist.'
      }))
    }
    this._updateDocument(documentId, newProps)
    cb(null, this._getDocument(documentId))
  }

  /*
    Delete document
  */
  deleteDocument(documentId, cb) {
    let doc = this._getDocument(documentId)
    if (!doc) {
      return cb(new SubstanceError('DocumentStore.DeleteError', {
        message: 'Document does not exist.'
      }))
    }
    this._deleteDocument(documentId)
    cb(null, doc)
  }

  /*
    Returns true if changeset exists
  */
  documentExists(documentId, cb) {
    cb(null, this._documentExists(documentId))
  }

  /*
    Seeds the database
  */
  seed(documents, cb) {
    this._documents = documents
    if (cb) { cb(null) }
    return this
  }

  // Handy synchronous helpers
  // -------------------------

  _createDocument(props) {
    this._documents[props.documentId] = props
  }

  _deleteDocument(documentId) {
    delete this._documents[documentId]
  }

  // Get document record
  _getDocument(documentId) {
    return this._documents[documentId]
  }

  _updateDocument(documentId, props) {
    let doc = this._documents[documentId]
    extend$1(doc, props)
  }

  _documentExists(documentId) {
    return Boolean(this._documents[documentId])
  }
}

oo.initClass(DocumentStore)

/*
  Implements Substance SnapshotStore API. This is just a dumb store.
  No integrity checks are made, as this is the task of SnapshotEngine
*/
class SnapshotStore {
  constructor(config) {
    this.config = config

    // Snapshots will stored here
    this._snapshots = {}
  }

  /*
    Get Snapshot by documentId and version. If no version is provided
    the highest version available is returned

    @return {Object} snapshot record
  */
  getSnapshot(args, cb) {
    if (!args || !args.documentId) {
      return cb(new SubstanceError('InvalidArgumentsError', {
        message: 'args require a documentId'
      }))
    }
    let documentId = args.documentId
    let version = args.version
    let docEntry = this._snapshots[documentId]
    let result

    if (!docEntry) return cb(null, undefined)

    let availableVersions = Object.keys(docEntry)

    // Exit if no versions are available
    if (availableVersions.length === 0) return cb(null, undefined)

    // If no version is given we return the latest version available
    if (!version) {
      let latestVersion = Math.max.apply(null, availableVersions)
      result = docEntry[latestVersion]
    } else {
      // Attemt to get the version
      result = docEntry[version]
      if (!result && args.findClosest) {
        // We don't have a snaphot for that requested version
        let smallerVersions = availableVersions.filter(function(v) {
          return parseInt(v, 10) < version
        })

        // Take the closest version if there is any
        let clostestVersion = Math.max.apply(null, smallerVersions)
        result = docEntry[clostestVersion]
      }
    }

    cb(null, result)
  }

  /*
    Stores a snapshot for a given documentId and version.

    Please not that an existing snapshot will be overwritten.
  */
  saveSnapshot(args, cb) {
    let documentId = args.documentId
    let version = args.version
    let data = args.data
    let docEntry = this._snapshots[documentId]
    if (!docEntry) {
      docEntry = this._snapshots[documentId] = {}
    }
    docEntry[version] = {
      documentId: documentId,
      version: version,
      data: data
    }
    cb(null, docEntry[version])
  }

  /*
    Removes a snapshot for a given documentId + version
  */
  deleteSnaphot(documentId, version, cb) {
    let docEntry = this._snapshots[documentId]
    if (!docEntry || !docEntry[version]) {
      return cb(new SubstanceError('DeleteError', {
        message: 'Snapshot could not be found'
      }))
    }
    let snapshot = this._snapshots[documentId][version]
    delete this._snapshots[documentId][version]
    cb(null, snapshot)
  }

  /*
    Deletes all snapshots for a given documentId
  */
  deleteSnapshotsForDocument(documentId, cb) {
    let docEntry = this._snapshots[documentId]
    let deleteCount = 0
    if (docEntry) deleteCount = Object.keys(docEntry).length
    delete this._snapshots[documentId]
    cb(null, deleteCount)
  }

  /*
    Returns true if a snapshot exists for a certain version
  */
  snapshotExists(documentId, version, cb) {
    let exists = false
    let docRecord = this._snapshots[documentId]

    if (docRecord) {
      exists = docRecord[version]
    }
    cb(null, exists)
  }

  /*
    Seeds the database
  */
  seed(snapshots, cb) {
    this._snapshots = snapshots
    if (cb) { cb(null) }
    return this
  }

}

oo.initClass(SnapshotStore)

/**
  Browser WebSocket abstraction. Handles reconnects etc.
*/
class WebSocketConnection extends ClientConnection {
  _createWebSocket() {
    return new window.WebSocket(this.config.wsUrl);
  }
}

var _indexOfNaN = createCommonjsModule(function (module) {
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;
});

var _indexOfNaN$1 = interopDefault(_indexOfNaN);


var require$$0$54 = Object.freeze({
	default: _indexOfNaN$1
});

var _baseIndexOf = createCommonjsModule(function (module) {
var indexOfNaN = interopDefault(require$$0$54);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;
});

var _baseIndexOf$1 = interopDefault(_baseIndexOf);


var require$$4$13 = Object.freeze({
	default: _baseIndexOf$1
});

var _arrayIncludes = createCommonjsModule(function (module) {
var baseIndexOf = interopDefault(require$$4$13);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to search.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;
});

var _arrayIncludes$1 = interopDefault(_arrayIncludes);


var require$$4$12 = Object.freeze({
	default: _arrayIncludes$1
});

var _arrayIncludesWith = createCommonjsModule(function (module) {
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to search.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;
});

var _arrayIncludesWith$1 = interopDefault(_arrayIncludesWith);


var require$$3$16 = Object.freeze({
	default: _arrayIncludesWith$1
});

var _cacheHas = createCommonjsModule(function (module) {
/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;
});

var _cacheHas$1 = interopDefault(_cacheHas);


var require$$0$55 = Object.freeze({
	default: _cacheHas$1
});

var noop = createCommonjsModule(function (module) {
/**
 * A method that returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;
});

var noop$1 = interopDefault(noop);


var require$$1$31 = Object.freeze({
	default: noop$1
});

var _createSet = createCommonjsModule(function (module) {
var Set = interopDefault(require$$2$15),
    noop = interopDefault(require$$1$31),
    setToArray = interopDefault(require$$0$27);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;
});

var _createSet$1 = interopDefault(_createSet);


var require$$1$30 = Object.freeze({
	default: _createSet$1
});

var _baseUniq = createCommonjsModule(function (module) {
var SetCache = interopDefault(require$$5$1),
    arrayIncludes = interopDefault(require$$4$12),
    arrayIncludesWith = interopDefault(require$$3$16),
    cacheHas = interopDefault(require$$0$55),
    createSet = interopDefault(require$$1$30),
    setToArray = interopDefault(require$$0$27);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;
});

var _baseUniq$1 = interopDefault(_baseUniq);


var require$$0$53 = Object.freeze({
	default: _baseUniq$1
});

var uniq = createCommonjsModule(function (module) {
var baseUniq = interopDefault(require$$0$53);

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each
 * element is kept.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length)
    ? baseUniq(array)
    : [];
}

module.exports = uniq;
});

var uniq$1 = interopDefault(uniq);

// TODO: this should be implemented as transformations

// A collection of methods to update annotations
// --------
//
// As we treat annotations as overlay of plain text we need to keep them up-to-date during editing.

function insertedText(doc, coordinate, length) {
  if (!length) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(coordinate.path);
  forEach$1(annotations, function(anno) {
    var pos = coordinate.offset;
    var start = anno.startOffset;
    var end = anno.endOffset;
    var newStart = start;
    var newEnd = end;
    if ( (pos < start) ||
         (pos === start) ) {
      newStart += length;
    }
    // inline nodes do not expand automatically
    if ( (pos < end) ||
         (pos === end && !anno.isInline()) ) {
      newEnd += length;
    }
    if (newStart !== start) {
      doc.set([anno.id, 'startOffset'], newStart);
    }
    if (newEnd !== end) {
      doc.set([anno.id, 'endOffset'], newEnd);
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotation-anchors');
  var anchors = index.get(coordinate.path);
  forEach$1(anchors, function(anchor) {
    var pos = coordinate.offset;
    var start = anchor.offset;
    var changed = false;
    if ( (pos < start) ||
         (pos === start && !coordinate.after) ) {
      start += length;
      changed = true;
    }
    if (changed) {
      var property = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, property], start);
    }
  });
}

// TODO: clean up replaceText support hackz
function deletedText(doc, path, startOffset, endOffset) {
  if (startOffset === endOffset) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(path);
  var length = endOffset - startOffset;
  forEach$1(annotations, function(anno) {
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anno.startOffset;
    var end = anno.endOffset;
    var newStart = start;
    var newEnd = end;
    if (pos2 <= start) {
      newStart -= length;
      newEnd -= length;
      doc.set([anno.id, 'startOffset'], newStart);
      doc.set([anno.id, 'endOffset'], newEnd);
    } else {
      if (pos1 <= start) {
        newStart = start - Math.min(pos2-pos1, start-pos1);
      }
      if (pos1 <= end) {
        newEnd = end - Math.min(pos2-pos1, end-pos1);
      }
      // delete the annotation if it has collapsed by this delete
      if (start !== end && newStart === newEnd) {
        doc.delete(anno.id);
      } else {
        if (start !== newStart) {
          doc.set([anno.id, 'startOffset'], newStart);
        }
        if (end !== newEnd) {
          doc.set([anno.id, 'endOffset'], newEnd);
        }
      }
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotation-anchors');
  var anchors = index.get(path);
  var containerAnnoIds = [];
  forEach$1(anchors, function(anchor) {
    containerAnnoIds.push(anchor.id);
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anchor.offset;
    var changed = false;
    if (pos2 <= start) {
      start -= length;
      changed = true;
    } else {
      if (pos1 <= start) {
        var newStart = start - Math.min(pos2-pos1, start-pos1);
        if (start !== newStart) {
          start = newStart;
          changed = true;
        }
      }
    }
    if (changed) {
      var property = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, property], start);
    }
  });
  // check all anchors after that if they have collapsed and remove the annotation in that case
  forEach$1(uniq$1(containerAnnoIds), function(id) {
    var anno = doc.get(id);
    var annoSel = anno.getSelection();
    if(annoSel.isCollapsed()) {
      // console.log("...deleting container annotation because it has collapsed" + id);
      doc.delete(id);
    }
  });
}

// used when breaking a node to transfer annotations to the new property
function transferAnnotations(doc, path, offset, newPath, newOffset) {
  var index = doc.getIndex('annotations');
  var annotations = index.get(path, offset);
  forEach$1(annotations, function(a) {
    var isInside = (offset > a.startOffset && offset < a.endOffset);
    var start = a.startOffset;
    var end = a.endOffset;
    var newStart, newEnd;
    // 1. if the cursor is inside an annotation it gets either split or truncated
    if (isInside) {
      // create a new annotation if the annotation is splittable
      if (a.canSplit()) {
        var newAnno = a.toJSON();
        newAnno.id = uuid$1(a.type + "_");
        newAnno.startOffset = newOffset;
        newAnno.endOffset = newOffset + a.endOffset - offset;
        newAnno.path = newPath;
        doc.create(newAnno);
      }
      // in either cases truncate the first part
      newStart = a.startOffset;
      newEnd = offset;
      // if after truncate the anno is empty, delete it
      if (newEnd === newStart) {
        doc.delete(a.id);
      }
      // ... otherwise update the range
      else {
        if (newStart !== start) {
          doc.set([a.id, "startOffset"], newStart);
        }
        if (newEnd !== end) {
          doc.set([a.id, "endOffset"], newEnd);
        }
      }
    }
    // 2. if the cursor is before an annotation then simply transfer the annotation to the new node
    else if (a.startOffset >= offset) {
      // Note: we are preserving the annotation so that anything which is connected to the annotation
      // remains valid.
      newStart = newOffset + a.startOffset - offset;
      newEnd = newOffset + a.endOffset - offset;
      doc.set([a.id, "path"], newPath);
      doc.set([a.id, "startOffset"], newStart);
      doc.set([a.id, "endOffset"], newEnd);
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotation-anchors');
  var anchors = index.get(path);
  var containerAnnoIds = [];
  forEach$1(anchors, function(anchor) {
    containerAnnoIds.push(anchor.id);
    var start = anchor.offset;
    if (offset <= start) {
      var pathProperty = (anchor.isStart?'startPath':'endPath');
      var offsetProperty = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, pathProperty], newPath);
      doc.set([anchor.id, offsetProperty], newOffset + anchor.offset - offset);
    }
  });
  // check all anchors after that if they have collapsed and remove the annotation in that case
  forEach$1(uniq$1(containerAnnoIds), function(id) {
    var anno = doc.get(id);
    var annoSel = anno.getSelection();
    if(annoSel.isCollapsed()) {
      // console.log("...deleting container annotation because it has collapsed" + id);
      doc.delete(id);
    }
  });
}

var annotationHelpers = {
  insertedText: insertedText,
  deletedText: deletedText,
  transferAnnotations: transferAnnotations
}

var isBoolean = createCommonjsModule(function (module) {
var isObjectLike = interopDefault(require$$0$4);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && objectToString.call(value) == boolTag);
}

module.exports = isBoolean;
});

var isBoolean$1 = interopDefault(isBoolean);

/**
  Base node implementation.

  @private
  @class Node
  @node
  @extends EventEmitter
  @param {Object} properties

  @prop {String} id an id that is unique within this data
 */
function Node(props) {
  EventEmitter.call(this);

  var NodeClass = this.constructor;

  var schema = NodeClass.schema;
  for (var name in schema) {
    if (!schema.hasOwnProperty(name)) continue;
    var prop = schema[name];
    // check integrity of provided props, such as type correctness,
    // and mandatory properties
    var propIsGiven = (props[name] !== undefined);
    var hasDefault = prop.hasOwnProperty('default');
    var isOptional = prop.optional;
    if ( (!isOptional && !hasDefault) && !propIsGiven) {
      throw new Error('Property ' + name + ' is mandatory for node type ' + this.type);
    }
    if (propIsGiven) {
      this[name] = _checked(prop, props[name]);
    } else if (hasDefault) {
      this[name] = cloneDeep$1(_checked(prop, prop.default));
    } else {
      // property is optional
    }
  }
}

Node.Prototype = function() {

  this._isNode = true;


  this.dispose = function() {};

  /**
    Check if the node is of a given type.

    @param {String} typeName
    @returns {Boolean} true if the node has a parent with given type, false otherwise.
  */
  this.isInstanceOf = function(typeName) {
    return Node.isInstanceOf(this.constructor, typeName);
  };

  /**
    Get a the list of all polymorphic types.

    @returns {String[]} An array of type names.
   */
  this.getTypeNames = function() {
    var typeNames = [];
    var NodeClass = this.constructor;
    while (NodeClass.type !== "node") {
      typeNames.push(NodeClass.type);
      NodeClass = Object.getPrototypeOf(NodeClass);
    }
    return typeNames;
  };

  /**
   * Get the type of a property.
   *
   * @param {String} propertyName
   * @returns The property's type.
   */
  this.getPropertyType = function(propertyName) {
    var schema = this.constructor.schema;
    return schema[propertyName].type;
  };

  /**
    Convert node to JSON.

    @returns {Object} JSON representation of node.
   */
  this.toJSON = function() {
    var data = {
      type: this.type
    };
    each$1(this.constructor.schema, function(prop, name) {
      data[prop.name] = this[name];
    }.bind(this));
    return data;
  };

};

EventEmitter.extend(Node);

Node.define = Node.defineSchema = function(schema) {
  _defineSchema(this, schema);
};

Node.define({
  type: "node",
  id: 'string'
});

Object.defineProperty(Node.prototype, 'type', {
  configurable: false,
  get: function() {
    return this.constructor.type;
  },
  set: function() {
    throw new Error('read-only');
  }
});

/**
  Internal implementation of Node.prototype.isInstanceOf.

  @static
  @private
  @returns {Boolean}
 */
Node.isInstanceOf = function(NodeClass, typeName) {
  var type = NodeClass.type;
  while (type !== "node") {
    if (type === typeName) return true;
    if (NodeClass.super) {
      NodeClass = NodeClass.super;
      type = NodeClass.type;
    } else {
      break;
    }
  }
  return false;
};

// ### Internal implementation

function _defineSchema(NodeClass, schema) {
  if (schema.type) {
    NodeClass.type = schema.type;
  }
  var compiledSchema = _compileSchema(schema);
  // collects a full schema considering the schemas of parent class
  // we will use the unfolded schema, check integrity of the given props (mandatory, readonly)
  // or fill in default values for undefined properties.
  NodeClass.schema = _unfoldedSchema(NodeClass, compiledSchema);
  // computes the set of default properties only once
  NodeClass.defaultProps = _extractDefaultProps(NodeClass);
}

function _compileSchema(schema) {
  var compiledSchema = {};
  each$1(schema, function(definition, name) {
    // skip 'type'
    if (name === 'type') {
      return;
    }
    if (isString$1(definition) || isArray$1(definition)) {
      definition = { type: definition };
    }
    definition = _compileDefintion(definition);
    definition.name = name;
    compiledSchema[name] = definition;
  });
  return compiledSchema;
}

function _compileDefintion(definition) {
  var result = definition;
  if (isArray$1(definition.type) && definition[0] !== "array") {
    definition.type = [ "array", definition.type[0] ];
  } else if (definition.type === 'text') {
    result = {
      type: "string",
      default: ''
    };
  }
  return result;
}

function _unfoldedSchema(NodeClass, compiledSchema) {
  var schemas = [compiledSchema];
  var clazz = NodeClass;
  while(clazz) {
    var parentProto = Object.getPrototypeOf(clazz.prototype);
    if (!parentProto) {
      break;
    }
    clazz = parentProto.constructor;
    if (clazz && clazz.schema) {
      schemas.unshift(clazz.schema);
    }
  }
  schemas.unshift({});
  return Object.assign.apply(null, schemas);
}

function _extractDefaultProps(NodeClass) {
  var unfoldedSchema = NodeClass.unfoldedSchema;
  var defaultProps = {};
  each$1(unfoldedSchema, function(prop, name) {
    if (prop.hasOwnProperty('default')) {
      defaultProps[name] = prop['default'];
    }
  });
  return defaultProps;
}

function _checked(prop, value) {
  var type;
  if (isArray$1(prop.type)) {
    type = "array";
  } else {
    type = prop.type;
  }
  if (value === null) {
    if (prop.notNull) {
      throw new Error('Value for property ' + prop.name + ' is null.');
    } else {
      return value;
    }
  }
  if (value === undefined) {
    throw new Error('Value for property ' + prop.name + ' is undefined.');
  }
  if (type === "string" && !isString$1(value) ||
      type === "boolean" && !isBoolean$1(value) ||
      type === "number" && !isNumber$1(value) ||
      type === "array" && !isArray$1(value) ||
      type === "id" && !isString$1(value) ||
      type === "object" && !isObject$1(value)) {
    throw new Error('Illegal value type for property ' + prop.name + ': expected ' + type + ', was ' + (typeof value));
  }
  return value;
}

/**
  Base node type for document nodes.

  @class
  @abstract

  @param {model/Document} doc A document instance
  @param {object} node properties
  @example

  The following example shows how a new node type is defined.


  ```js
  function Todo() {
    Todo.super.apply(this, arguments);
  }
  TextBlock.extend(Todo);
  Todo.define({
    type: 'todo',
    content: 'text',
    done: { type: 'bool', default: false }
  });
  ```

  The following
    data types are supported:

      - `string` bare metal string data type
      - `text` a string that carries annotations
      - `number` numeric values
      - `bool` boolean values
      - 'id' a node id referencing another node in the document
*/

function DocumentNode(doc, props) {
  Node.call(this, props);
  // being less strict here allows us to create a detached node
  // which can be useful for testing
  // if (!doc) throw new Error('Document instance is mandatory.');
  this.document = doc;
}

DocumentNode.Prototype = function() {

  this._isDocumentNode = true;

  var _super = DocumentNode.super.prototype;

  /**
    Get the Document instance.

    @returns {Document}
  */
  this.getDocument = function() {
    return this.document;
  };

  /**
    Whether this node has a parent.

    `parent` is a built-in property for implementing nested nodes.

    @returns {Boolean}
  */
  this.hasParent = function() {
    return Boolean(this.parent);
  };

  /**
    @returns {DocumentNode} the parent node
  */
  this.getParent = function() {
    return this.document.get(this.parent);
  };

  /**
    Checks whether this node has children.

    @returns {Boolean} default: false
  */
  this.hasChildren = function() {
    return false;
  };

  /**
    Get the index of a given child.

    @returns {Number} default: -1
  */
  this.getChildIndex = function(child) { // eslint-disable-line
    return -1;
  };

  /**
    Get a child node at a given position.

    @returns {DocumentNode} default: null
  */
  this.getChildAt = function(idx) { // eslint-disable-line
    return null;
  };

  /**
    Get the number of children nodes.

    @returns {Number} default: 0
  */
  this.getChildCount = function() {
    return 0;
  };

  /**
    Get the root node.

    The root node is the last ancestor returned
    by a sequence of `getParent()` calls.

    @returns {DocumentNode}
  */
  this.getRoot = function() {
    var node = this;
    while (node.hasParent()) {
      node = node.getParent();
    }
    return node;
  };

  // TODO: should this really be here?
  // volatile property necessary to render highlighted node differently
  // TODO: We should get this out here
  this.setHighlighted = function(highlighted, scope) {
    if (this.highlighted !== highlighted) {
      this.highlightedScope = scope;
      this.highlighted = highlighted;
      this.emit('highlighted', highlighted);
    }
  };

  function _matchPropertyEvent(eventName) {
    return /([a-zA-Z_0-9]+):changed/.exec(eventName);
  }

  this.on = function(eventName, handler, ctx) {
    var match = _matchPropertyEvent(eventName);
    if (match) {
      var propertyName = match[1];
      if (this.constructor.schema[propertyName]) {
        var doc = this.getDocument();
        doc.getEventProxy('path')
          .on([this.id, propertyName], handler, ctx);
      }
    }
    _super.on.apply(this, arguments);
  };

  this.off = function(ctx, eventName, handler) {
    var doc = this.getDocument();
    var match = false;
    if (!eventName) {
      doc.getEventProxy('path').off(ctx);
    } else {
      match = _matchPropertyEvent(eventName);
    }
    if (match) {
      var propertyName = match[1];
      doc.getEventProxy('path')
        .off(ctx, [this.id, propertyName], handler);
    }
    _super.off.apply(this, arguments);
  };

  // Experimental: we are working on a simpler API replacing the
  // rather inconvenient EventProxy API.
  this.connect = function(ctx, handlers) {
    console.warn('DEPRECATED: use Node.on() instead');
    each$1(handlers, function(func, name) {
      this.on(name, func, ctx);
    }.bind(this));
  };

  this.disconnect = function(ctx) {
    console.warn('DEPRECATED: use Node.off() instead');
    this.off(ctx);
  };

  this._onPropertyChange = function(propertyName) {
    var args = [propertyName + ':changed']
      .concat(Array.prototype.slice.call(arguments, 1));
    this.emit.apply(this, args);
  };

  // Node categories
  // --------------------

  /**
    @returns {Boolean} true if node is a block node (e.g. Paragraph, Figure, List, Table)
  */
  this.isBlock = function() {
    return this.constructor.isBlock;
  };

  /**
    @returns {Boolean} true if node is a text node (e.g. Paragraph, Codebock)
  */
  this.isText = function() {
    return this.constructor.isText;
  };

  /**
    @returns {Boolean} true if node is an annotation node (e.g. Strong)
  */
  this.isPropertyAnnotation = function() {
    return this.constructor.isPropertyAnnotation;
  };

  /**
    @returns {Boolean} true if node is an inline node (e.g. Citation)
  */
  this.isInline = function() {
    return this.constructor.isInline;
  };

  /**
    @returns {Boolean} true if node is a container annotation (e.g. multiparagraph comment)
  */
  this.isContainerAnnotation = function() {
    return this.constructor.isContainerAnnotation;
  };

};

Node.extend(DocumentNode);

/**
  Declares a node to be treated as block-type node.

  BlockNodes are considers the direct descendant of `Container` nodes.
  @type {Boolean} default: false
*/
DocumentNode.isBlock = false;

/**
  Declares a node to be treated as text-ish node.

  @type {Boolean} default: false
*/
DocumentNode.isText = false;

/**
  Declares a node to be treated as {@link model/PropertyAnnotation}.

  @type {Boolean} default: false
*/
DocumentNode.isPropertyAnnotation = false;

/**
  Declares a node to be treated as {@link model/ContainerAnnotation}.

  @type {Boolean} default: false
*/
DocumentNode.isContainerAnnotation = false;

/**
  Declares a node to be treated as {@link model/InlineNode}.

  @type {Boolean} default: false
*/
DocumentNode.isInline = false;

/**
  A property annotation can be used to overlay text and give it a special meaning.
  PropertyAnnotations only work on text properties. If you want to annotate multiple
  nodes you have to use a {@link model/ContainerAnnotation}.

  @class
  @abstract

  @prop {String[]} path Identifies a text property in the document (e.g. `['text_1', 'content']`)
  @prop {Number} startOffset the character where the annoation starts
  @prop {Number} endOffset: the character where the annoation starts

  @example

  Here's how a **strong** annotation is created. In Substance annotations are stored
  separately from the text. Annotations are just regular nodes in the document.
  They refer to a certain range (`startOffset, endOffset`) in a text property (`path`).

  ```js
  doc.transaction(function(tx) {
    tx.create({
      id: 's1',
      type: 'strong',
      path: ['p1', 'content'],
      "startOffset": 10,
      "endOffset": 19
    });
  });
  ```
**/

function PropertyAnnotation() {
  PropertyAnnotation.super.apply(this, arguments);
}

PropertyAnnotation.Prototype = function() {

  this._isAnnotation = true;
  this._isPropertyAnnotation = true;

  /**
    Get the plain text spanned by this annotation.

    @returns {String}
  */
  this.getText = function() {
    var doc = this.getDocument();
    if (!doc) {
      console.warn('Trying to use an PropertyAnnotation which is not attached to the document.');
      return "";
    }
    var text = doc.get(this.path);
    return text.substring(this.startOffset, this.endOffset);
  };

  /**
    Determines if an annotation can be split e.g., when breaking a node.

    In these cases, a new annotation will be created attached to the created node.

    For certain annotation types,you may want to the annotation truncated
    rather than split, where you need to override this method returning `false`.
  */
  this.canSplit = function() {
    return true;
  };

  /**
    If this annotation is a an Anchor.

    Anchors are annotations with a zero width.
    For instance, ContainerAnnotation have a start and an end anchor,
    or rendered cursors are modeled as anchors.

    @returns {Boolean}
  */
  this.isAnchor = function() {
    return false;
  };

  // TODO: maybe this should go into documentHelpers
  this.getSelection = function() {
    return this.getDocument().createSelection({
      type: 'property',
      path: this.path,
      startOffset: this.startOffset,
      endOffset: this.endOffset
    });
  };

  this.updateRange = function(tx, sel) {
    if (!sel.isPropertySelection()) {
      throw new Error('Cannot change to ContainerAnnotation.');
    }
    if (!isEqual$1(this.startPath, sel.start.path)) {
      tx.set([this.id, 'path'], sel.start.path);
    }
    if (this.startOffset !== sel.start.offset) {
      tx.set([this.id, 'startOffset'], sel.start.offset);
    }
    if (this.endOffset !== sel.end.offset) {
      tx.set([this.id, 'endOffset'], sel.end.offset);
    }
  };

};

DocumentNode.extend(PropertyAnnotation);

PropertyAnnotation.define({
  type: "annotation",
  path: ["string"],
  startOffset: "number",
  endOffset: "number",
  // this is only used when an annotation is used 'stand-alone'
  // i.e. not attached to a property
  _content: { type: "string", optional: true}
});

PropertyAnnotation.isPropertyAnnotation = true;

// these properties making PropertyAnnotation compatible with ContainerAnnotations
Object.defineProperties(PropertyAnnotation.prototype, {
  startPath: {
    get: function() {
      return this.path;
    }
  },
  endPath: {
    get: function() {
      return this.path;
    }
  }
});

function BlockNode() {
  BlockNode.super.apply(this, arguments);
}

DocumentNode.extend(BlockNode);

BlockNode.isBlock = true;

/**
  Mix-in for parent nodes.

  ParentNodes are nodes which have children nodes,
  such as List, Table, TableSection, TableRow.

  @mixin
*/
var ParentNodeMixin = {

  hasChildren: function() {
    return true;
  },

  getChildrenProperty: function() {
    throw new Error('ParentNodeMixin.getChildrenProperty is abstract and must be implemented in ' + this.type + '.');
  },

  getChildIndex: function(child) {
    return this[this.getChildrenProperty()].indexOf(child.id);
  },

  getChildren: function() {
    var doc = this.getDocument();
    var childrenIds = this[this.getChildrenProperty()];
    return childrenIds.map(function(id) {
      return doc.get(id);
    });
  },

  getChildAt: function(idx) {
    var children = this[this.getChildrenProperty()];
    if (idx < 0 || idx >= children.length) {
      throw new Error('Array index out of bounds: ' + idx + ", " + children.length);
    }
    return this.getDocument().get(children[idx]);
  },

  getChildCount: function() {
    return this[this.getChildrenProperty()].length;
  },

  getAddressablePropertyNames: function() {
    return [this.getChildrenProperty()];
  },

};

function ContainerAddress(pos, offset) {
  this.pos = pos;
  this.offset = offset;
}

ContainerAddress.Prototype = function() {

  this.isBefore = function(other, strict) {
    strict = Boolean(strict);
    if (this.pos < other.pos) {
      return true;
    } else if (this.pos > other.pos) {
      return false;
    } else if (this.offset < other.offset) {
      return true;
    } else if (this.offset > other.offset) {
      return false;
    }
    if (strict) {
      return false;
    } else {
      return true;
    }
  };

  this.isAfter = function(other, strict) {
    return other.isBefore(this, strict);
  };

  this.isEqual = function(other) {
    return (this.pos === other.pos && this.offset === other.offset);
  };

  this.toString = function() {
    return [this.pos,'.',this.offset].join('');
  };
};

oo.initClass(ContainerAddress);

/**
  A Container represents a list of nodes.

  While most editing occurs on a property level (such as editing text),
  other things happen on a node level, e.g., breaking or mergin nodes,
  or spanning annotations or so called ContainerAnnotations.

  @prop {String[]} nodes

  @example
*/
function Container() {
  Container.super.apply(this, arguments);

  // HACK: we invalidate cached positions on every change
  // NOTE, that in trans action docs we don't do caching
  if (this.document && !this.document.isTransactionDocument) {
    this.document.on('document:changed', this._onChange, this);
  }
}

Container.Prototype = function() {

  this._isContainer = true;

  extend$1(this, ParentNodeMixin);

  this.dispose = function() {
    this.document.off(this);
  };

  this.getPosition = function(nodeId) {
    // HACK: ATM we are caching only in the real Document
    // i.e., which is connected to the UI etc.
    if (this.document && this.document.isTransactionDocument) {
      return this.nodes.indexOf(nodeId);
    } else {
      var positions = this._getCachedPositions();
      var pos = positions[nodeId];
      if (pos === undefined) {
        pos = -1;
      }
      return pos;
    }
  };

  this.getNodes = function() {
    var doc = this.getDocument();
    var nodes = [];
    this.nodes.forEach(function(nodeId){
      var node = doc.get(nodeId);
      if (!node) {
        console.error('Node does not exist: ', nodeId);
      } else {
        nodes.push(node);
      }
    });
    return nodes;
  };

  this.getNodeAt = function(pos) {
    return this.getDocument().get(this.nodes[pos]);
  };

  this.show = function(nodeId, pos) {
    var doc = this.getDocument();
    var arg1 = arguments[0];
    if (!isString$1(arg1)) {
      if (arg1._isNode) {
        nodeId = arg1.id;
      }
    }
    if (!isNumber$1(pos)) {
      pos = this.nodes.length;
    }
    doc.update(this.getContentPath(), { insert: { offset: pos, value: nodeId } });
  };

  this.hide = function(nodeId) {
    var doc = this.getDocument();
    var pos = this.nodes.indexOf(nodeId);
    if (pos >= 0) {
      doc.update(this.getContentPath(), { delete: { offset: pos } });
    }
  };

  this.getAddress = function(coor) {
    if (!coor._isCoordinate) {
      // we have broken with an earlier version of this API
      throw new Error('Illegal argument: Container.getAddress(coor) expects a Coordinate instance.');
    }
    var nodeId = coor.path[0];
    var nodePos = this.getPosition(nodeId);
    var offset;
    if (coor.isNodeCoordinate()) {
      if (coor.offset > 0) {
        offset = Number.MAX_VALUE;
      } else {
        offset = 0;
      }
    } else {
      offset = coor.offset;
    }
    return new ContainerAddress(nodePos, offset);
  };

  this.getChildrenProperty = function() {
    return 'nodes';
  };

  this.getLength = function() {
    return this.nodes.length;
  };

  this._onChange = function(change) {
    if (change.isUpdated(this.getContentPath())) {
      this.positions = null;
    }
  };

  this._getCachedPositions = function() {
    if (!this.positions) {
      var positions = {};
      this.nodes.forEach(function(id, pos) {
        positions[id] = pos;
      });
      this.positions = positions;
    }
    return this.positions;
  };

  this.getContentPath = function() {
    return [this.id, 'nodes'];
  };

};

DocumentNode.extend(Container);

Container.define({
  type: "container",
  nodes: { type: ['id'], default: [] }
});

Object.defineProperty(Container.prototype, 'length', {
  get: function() {
    console.warn('DEPRECATED: want to get rid of unnecessary properties. Use this.getLength() instead.');
    return this.nodes.length;
  }
});

/**
  Describes an annotation sticking on a container that can span over multiple
  nodes.

  @class

  @example

  ```js
  {
    "id": "subject_reference_1",
    "type": "subject_reference",
    "containerId": "content",
    "startPath": ["text_2", "content"],
    "startOffset": 100,
    "endPath": ["text_4", "content"],
    "endOffset": 40
  }
  ```
 */

function ContainerAnnotation() {
  ContainerAnnotation.super.apply(this, arguments);
}

ContainerAnnotation.Prototype = function() {

  this._isAnnotation = true;
  this._isContainerAnnotation = true;

  /**
    Get the plain text spanned by this annotation.

    @return {String}
  */
  this.getText = function() {
    var doc = this.getDocument();
    if (!doc) {
      console.warn('Trying to use a ContainerAnnotation which is not attached to the document.');
      return "";
    }
    return documentHelpers.getTextForSelection(doc, this.getSelection());
  };

  /**
    Provides a selection which has the same range as this annotation.

    @return {model/ContainerSelection}
  */
  this.getSelection = function() {
    var doc = this.getDocument();
    // Guard: when this is called while this node has been detached already.
    if (!doc) {
      console.warn('Trying to use a ContainerAnnotation which is not attached to the document.');
      return Selection$1.nullSelection();
    }
    return doc.createSelection({
      type: "container",
      containerId: this.containerId,
      startPath: this.startPath,
      startOffset: this.startOffset,
      endPath: this.endPath,
      endOffset: this.endOffset
    });
  };

  this.setHighlighted = function(highlighted, scope) {
    if (this.highlighted !== highlighted) {
      this.highlighted = highlighted;
      this.highlightedScope = scope;
      this.emit('highlighted', highlighted, scope);

      each$1(this.fragments, function(frag) {
        frag.emit('highlighted', highlighted, scope);
      });
    }
  };

  this.updateRange = function(tx, sel) {
    if (!sel.isContainerSelection()) {
      throw new Error('Cannot change to ContainerAnnotation.');
    }
    if (!isEqual$1(this.startPath, sel.start.path)) {
      tx.set([this.id, 'startPath'], sel.start.path);
    }
    if (this.startOffset !== sel.start.offset) {
      tx.set([this.id, 'startOffset'], sel.start.offset);
    }
    if (!isEqual$1(this.endPath, sel.end.path)) {
      tx.set([this.id, 'endPath'], sel.end.path);
    }
    if (this.endOffset !== sel.end.offset) {
      tx.set([this.id, 'endOffset'], sel.end.offset);
    }
  };

  this.getFragments = function() {
    var fragments = [];
    var doc = this.getDocument();
    var container = doc.get(this.containerId);
    var paths = container.getPathRange(this.startPath, this.endPath);
    if (paths.length === 1) {
      fragments.push(new ContainerAnnotation.Fragment(this, paths[0], "property"));
    } else if (paths.length > 1) {
      fragments.push(new ContainerAnnotation.Fragment(this, paths[0], "start"));
      fragments.push(new ContainerAnnotation.Fragment(this, last$1(paths), "end"));
      for (var i = 1; i < paths.length-1; i++) {
        fragments.push(new ContainerAnnotation.Fragment(this, paths[i], "inner"));
      }
    }
    return fragments;
  };

  this.getStartAnchor = function() {
    if (!this._startAnchor) {
      this._startAnchor = new ContainerAnnotation.Anchor(this, 'isStart');
    }
    return this._startAnchor;
  };

  this.getEndAnchor = function() {
    if (!this._endAnchor) {
      this._endAnchor = new ContainerAnnotation.Anchor(this);
    }
    return this._endAnchor;
  };
};

DocumentNode.extend(ContainerAnnotation);

ContainerAnnotation.define({
  type: "container-annotation",
  containerId: "string",
  startPath: ["string"],
  startOffset: "number",
  endPath: ["string"],
  endOffset: "number"
});

ContainerAnnotation.isContainerAnnotation = true;

/**
  @class
  @private
*/
ContainerAnnotation.Anchor = function(anno, isStart) {
  // Note: we are not calling Anchor() as it is not useful for us
  // as we need to delegate to the annos value dynamically
  // Anchor.call(this, path, offset)

  // initializing mixin
  EventEmitter.call(this);

  this.type = "container-annotation-anchor";
  this.anno = anno;
  // TODO: remove this.node in favor of this.anno
  this.node = anno;
  this.id = anno.id;
  this.containerId = anno.containerId;
  this.isStart = Boolean(isStart);
  Object.freeze(this);
};

ContainerAnnotation.Anchor.Prototype = function() {

  this.getTypeNames = function() {
    return [this.type];
  };

  this.getPath = function() {
    return (this.isStart ? this.node.startPath : this.node.endPath);
  };

  this.getOffset = function() {
    return (this.isStart ? this.node.startOffset : this.node.endOffset);
  };

};

Anchor.extend(ContainerAnnotation.Anchor, EventEmitter.prototype);

Object.defineProperties(ContainerAnnotation.Anchor.prototype, {
  path: {
    get: function() { return this.getPath(); }
  },
  offset: {
    get: function() { return this.getOffset(); }
  }
});

/**
  @class
  @private
*/
ContainerAnnotation.Fragment = function(anno, path, mode) {
  EventEmitter.call(this);

  this.type = "container-annotation-fragment";
  this.anno = anno;
  // HACK: id is necessary for Fragmenter
  this.id = anno.id;
  this.path = path;
  this.mode = mode;
};

ContainerAnnotation.Fragment.Prototype = function() {
  this.getTypeNames = function() {
    return [this.type];
  };

  this.getStartOffset = function() {
    return ( (this.mode === "start" || this.mode === "property") ? this.anno.startOffset : 0);
  };

  this.getEndOffset = function() {
    var doc = this.anno.getDocument();
    var textProp = doc.get(this.path);
    var length = textProp.length;
    return ( (this.mode === "end" || this.mode === "property") ? this.anno.endOffset : length);
  };
};

EventEmitter.extend(ContainerAnnotation.Fragment);

ContainerAnnotation.Fragment.fragmentation = Number.MAX_VALUE;

Object.defineProperties(ContainerAnnotation.Fragment.prototype, {
  startOffset: {
    get: function() { return this.getStartOffset(); },
    set: function() { throw new Error('ContainerAnnotation.Fragment.startOffset is read-only.'); }
  },
  endOffset: {
    get: function() { return this.getEndOffset(); },
    set: function() { throw new Error('ContainerAnnotation.Fragment.endOffset is read-only.'); }
  },
  highlighted: {
    get: function() {
      return this.anno.highlighted;
    },
    set: function() { throw new Error('ContainerAnnotation.Fragment.highlighted is read-only.'); }
  }
});

// just as a reference to detect name collisions
// with native Object properties
var _obj = {};

/*
 * Simple registry implementation.
 *
 * @class Registry
 * @private
 */
function Registry(entries, validator) {
  this.entries = {};
  this.names = [];
  this.validator = validator;

  if (entries) {
    forEach$1(entries, function(entry, name) {
      this.add(name, entry);
    }.bind(this));
  }
}

Registry.Prototype = function() {

  this._isRegistry = true;

  /**
   * Check if an entry is registered for a given name.
   *
   * @param {String} name
   * @method contains
   * @memberof module:Basics.Registry.prototype
   */
  this.contains = function(name) {
    return this.entries.hasOwnProperty(name);
  };

  /**
   * Add an entry to the registry.
   *
   * @param {String} name
   * @param {Object} entry
   * @method add
   * @memberof module:Basics.Registry.prototype
   */
  this.add = function(name, entry) {
    if (this.validator) {
      this.validator(entry);
    }
    if (_obj[name]) {
      throw new Error('Illegal key: "'+name+'" is a property of Object which is thus not allowed as a key.');
    }
    if (this.contains(name)) {
      this.remove(name);
    }
    this.entries[name] = entry;
    this.names.push(name);
  };

  /**
   * Remove an entry from the registry.
   *
   * @param {String} name
   * @method remove
   * @memberof module:Basics.Registry.prototype
   */
  this.remove = function(name) {
    var pos = this.names.indexOf(name);
    if (pos >= 0) {
      this.names.splice(pos, 1);
    }
    delete this.entries[name];
  };

  /**
   * @method clear
   * @memberof module:Basics.Registry.prototype
   */
  this.clear = function() {
    this.names = [];
    this.entries = {};
  };

  /**
   * Get the entry registered for a given name.
   *
   * @param {String} name
   * @return The registered entry
   * @method get
   * @memberof module:Basics.Registry.prototype
   */
  this.get = function(name) {
    return this.entries[name];
  };

  /*
   * Iterate all registered entries in the order they were registered.
   *
   * @param {Function} callback with signature function(entry, name)
   * @param {Object} execution context
   */
  this.each = function(callback, ctx) {
    console.warn('DEPRECATED: use Registry.forEach(cb) instead');
    return this.forEach(callback.bind(ctx));
  };

  this.forEach = function(callback) {
    for (var i = 0; i < this.names.length; i++) {
      var name = this.names[i];
      var _continue = callback(this.entries[name], name);
      if (_continue === false) {
        break;
      }
    }
  };

  this.map = function(callback) {
    var result = [];
    this.forEach(function(entry, name) {
      result.push(callback(entry, name));
    });
    return result;
  };

  this.filter = function(callback) {
    var result = [];
    this.forEach(function(entry, name) {
      if (callback(entry, name)) {
        result.push(entry);
      }
    });
    return result;
  };

};

oo.initClass(Registry);

var ENTER = 1;
var EXIT = -1;
var ANCHOR = -2;

// Fragmenter
// --------
//
// An algorithm that is used to fragment overlapping structure elements
// following a priority rule set.
// E.g., we use this for creating DOM elements for annotations. The annotations
// can partially be overlapping. However this is not allowed in general for DOM elements
// or other hierarchical structures.
//
// Example: For the annotation use case consider a 'comment' spanning partially
// over an 'emphasis' annotation.
// 'The <comment>quick brown <bold>fox</comment> jumps over</bold> the lazy dog.'
// We want to be able to create a valid XML structure:
// 'The <comment>quick brown <bold>fox</bold></comment><bold> jumps over</bold> the lazy dog.'
//
// For that one would choose
//
//     {
//        'comment': 0,
//        'bold': 1
//     }
//
// as priority levels.
// In case of structural violations as in the example, elements with a higher level
// would be fragmented and those with lower levels would be preserved as one piece.
//
// TODO: If a violation for nodes of the same level occurs an Error should be thrown.
// Currently, in such cases the first element that is opened earlier is preserved.

function Fragmenter(options) {
  extend$1(this, options);
}

Fragmenter.Prototype = function() {

  this.start = function(rootContext, text, annotations) {
    if (!isString$1(text)) {
      throw new Error("Illegal argument: 'text' must be a String, but was " + text);
    }
    this._start(rootContext, text, annotations);
  };

  this.onText = function(context, text, entry) { // eslint-disable-line
  };

  // should return the created user context
  this.onEnter = function(entry, parentContext) { // eslint-disable-line
    return null;
  };

  this.onExit = function(entry, context, parentContext) { // eslint-disable-line
  };

  // This is a sweep algorithm wich uses a set of ENTER/EXIT entries
  // to manage a stack of active elements.
  // Whenever a new element is entered it will be appended to its parent element.
  // The stack is ordered by the annotation types.
  //
  // Examples:
  //
  // - simple case:
  //
  //       [top] -> ENTER(idea1) -> [top, idea1]
  //
  //   Creates a new 'idea' element and appends it to 'top'
  //
  // - stacked ENTER:
  //
  //       [top, idea1] -> ENTER(bold1) -> [top, idea1, bold1]
  //
  //   Creates a new 'bold' element and appends it to 'idea1'
  //
  // - simple EXIT:
  //
  //       [top, idea1] -> EXIT(idea1) -> [top]
  //
  //   Removes 'idea1' from stack.
  //
  // - reordering ENTER:
  //
  //       [top, bold1] -> ENTER(idea1) -> [top, idea1, bold1]
  //
  //   Inserts 'idea1' at 2nd position, creates a new 'bold1', and appends itself to 'top'
  //
  // - reordering EXIT
  //
  //       [top, idea1, bold1] -> EXIT(idea1)) -> [top, bold1]
  //
  //   Removes 'idea1' from stack and creates a new 'bold1'
  //

  function _extractEntries(annotations) {
    var openers = [];
    var closers = [];
    each$1(annotations, function(a) {
      var isAnchor = (a.isAnchor ? a.isAnchor() : false);
      // special treatment for zero-width annos such as ContainerAnnotation.Anchors
      if (isAnchor) {
        openers.push({
          mode: ANCHOR,
          pos: a.offset,
          id: a.id,
          level: Fragmenter.ALWAYS_ON_TOP,
          type: 'anchor',
          node: a,
          counter: -1,
          length: 0
        });
      } else {
        // TODO better naming, `Node.level` does not say enough
        // Better would be `Node.fragmentation = Fragmenter.SHOULD_NOT_SPLIT;`
        // meaning, that the fragmenter should try to render the fragment as one single
        // element, and not splitting it up on different stack levels.
        // E.g. When bold an link are overlapping
        // the fragmenter should not split the link element such as A<b>B<a>CD</a></b><a>EF</a>GH
        // but should instead A<b>B</b><a><b>CD</b><a>EF</a>GH

        // use a weak default level when not given
        var l = Fragmenter.NORMAL;
        var isInline = (a.isInline ? a.isInline() : false);
        if (isInline) {
          l = Number.MAX_VALUE;
        } else if (a.constructor.hasOwnProperty('fragmentation')) {
          l = a.constructor.fragmentation;
        } else if (a.hasOwnProperty('fragmentationHint')) {
          l = a.fragmentationHint;
        }
        var startOffset = Math.min(a.startOffset, a.endOffset);
        var endOffset = Math.max(a.startOffset, a.endOffset);
        var opener = {
          pos: startOffset,
          mode: ENTER,
          level: l,
          id: a.id,
          type: a.type,
          node: a,
          length: 0,
          counter: -1,
        };
        openers.push(opener);
        closers.push({
          pos: endOffset,
          mode: EXIT,
          level: l,
          id: a.id,
          type: a.type,
          node: a,
          opener: opener
        });
      }
    });

    // sort the openers
    openers.sort(_compareOpeners);
    // store indexes for openers
    for (var i = openers.length - 1; i >= 0; i--) {
      openers[i].idx = i;
    }
    closers.sort(_compareClosers);
    // merge openers and closers, sorted by pos
    var entries = new Array(openers.length+closers.length);
    var idx = 0;
    var idx1 = 0;
    var idx2 = 0;
    var opener = openers[idx1];
    var closer = closers[idx2];
    while(opener || closer) {
      if (opener && closer) {
        // close before open
        if (closer.pos <= opener.pos && closer.opener !== opener) {
          entries[idx] = closer;
          idx2++;
        } else {
          entries[idx] = opener;
          idx1++;
        }
      } else if (opener) {
        entries[idx] = opener;
        idx1++;
      } else if (closer) {
        entries[idx] = closer;
        idx2++;
      }
      opener = openers[idx1];
      closer = closers[idx2];
      idx++;
    }
    return entries;
  }

  function _compareOpeners(a, b) {
    if (a.pos < b.pos) return -1;
    if (a.pos > b.pos) return 1;
    if (a.mode < b.mode) return -1;
    if (a.mode > b.mode) return 1;
    if (a.mode === b.mode) {
      if (a.level < b.level) return -1;
      if (a.level > b.level) return 1;
    }
    return 0;
  }

  // sort in inverse order of openers
  function _compareClosers(a, b) {
    if (a.pos < b.pos) return -1;
    if (a.pos > b.pos) return 1;
    // this makes closer be sorted in inverse order of openers
    // to reduce stack sice
    // HACK: a bit trial error. When we have to collapsed annotations
    // at the same position then we want the closers in the same order
    // as the openers.
    if (a.pos === a.opener.pos && b.pos === b.opener.pos) {
      if (a.opener.idx < b.opener.idx) {
        return -1;
      } else {
        return 1;
      }
    }
    if (a.opener.idx > b.opener.idx) return -1;
    if (a.opener.idx < b.opener.idx) return 1;
    return 0;
  }

  this._enter = function(entry, parentContext) {
    entry.counter++;
    return this.onEnter(entry, parentContext);
  };

  this._exit = function(entry, context, parentContext) {
    this.onExit(entry, context, parentContext);
  };

  this._createText = function(context, text, entry) {
    this.onText(context, text, entry);
  };

  this._start = function(rootContext, text, annotations) {
    var entries = _extractEntries.call(this, annotations);
    var stack = [{context: rootContext, entry: null}];

    var pos = 0;
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      var textFragment = text.substring(pos, entry.pos);
      if (textFragment) {
        // add the last text to the current element
        this._createText(stack[stack.length-1].context, textFragment, entry);
      }

      pos = entry.pos;
      var stackLevel, idx, _entry;
      if (entry.mode === ENTER || entry.mode === ANCHOR) {
        // find the correct position and insert an entry
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (entry.level < stack[stackLevel].entry.level) {
            break;
          }
        }
        // create elements which are open, and are now stacked ontop of the
        // entered entry
        for (idx = stack.length-1; idx >= stackLevel; idx--) {
          _entry = stack[idx].entry;
          // compute number of characters since last 'enter'
          _entry.length = pos - _entry.pos;
          this._exit(_entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 0, {entry: entry});
        // create new elements for all lower entries
        for (idx = stackLevel; idx < stack.length; idx++) {
          _entry = stack[idx].entry;
          // bump 'enter' pos
          _entry.pos = pos;
          stack[idx].context = this._enter(_entry, stack[idx-1].context);
        }
      }
      if (entry.mode === EXIT || entry.mode === ANCHOR) {
        // find the according entry and remove it from the stack
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (stack[stackLevel].entry.node === entry.node) {
            break;
          }
        }
        for (idx = stack.length-1; idx >= stackLevel; idx--) {
          _entry = stack[idx].entry;
          // compute number of characters since last 'enter'
          _entry.length = pos - _entry.pos;
          this._exit(_entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 1);
        // create new elements for all lower entries
        for (idx = stackLevel; idx < stack.length; idx++) {
          _entry = stack[idx].entry;
          // bump 'enter' pos
          _entry.pos = pos;
          stack[idx].context = this._enter(_entry, stack[idx-1].context);
        }
      }
    }

    // Finally append a trailing text node
    var trailingText = text.substring(pos);
    if (trailingText) {
      this._createText(rootContext, trailingText);
    }
  };

};

oo.initClass(Fragmenter);

Fragmenter.SHOULD_NOT_SPLIT = 0;
Fragmenter.NORMAL = 10;
Fragmenter.ANY = 100;
Fragmenter.ALWAYS_ON_TOP = Number.MAX_VALUE;

/*
  Escape XML Entities

  HACK: this is just a cheap implementation to escape XML entities
*/
function encodeXMLEntities(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function DOMExporter(config) {
  if (!config.converters) {
    throw new Error('config.converters is mandatory');
  }
  if (!config.converters._isRegistry) {
    this.converters = new Registry();
    config.converters.forEach(function(Converter) {
      var converter;
      if (typeof Converter === 'function') {
        converter = new Converter();
      } else {
        converter = Converter;
      }
      if (!converter.type) {
        console.error('Converter must provide the type of the associated node.', converter);
        return;
      }
      this.converters.add(converter.type, converter);
    }.bind(this));
  } else {
    this.converters = config.converters;
  }

  this.state = {
    doc: null
  };
  this.config = extend$1({idAttribute: 'id'}, config);

  // NOTE: Subclasses (HTMLExporter and XMLExporter) must initialize this
  // with a proper DOMElement instance which is used to create new elements.
  this._el = null;
  this.$$ = this.createElement.bind(this);
}

DOMExporter.Prototype = function() {

  this.exportDocument = function(doc) {
    // TODO: this is no left without much functionality
    // still, it would be good to have a consistent top-level API
    // i.e. converter.importDocument(el) and converter.exportDocument(doc)
    // On the other side, the 'internal' API methods are named this.convert*.
    return this.convertDocument(doc);
  };

  /**
    @param {Document}
    @returns {DOMElement|DOMElement[]} The exported document as DOM or an array of elements
             if exported as partial, which depends on the actual implementation
             of `this.convertDocument()`.

    @abstract
    @example

    this.convertDocument = function(doc) {
      var elements = this.convertContainer(doc, this.state.containerId);
      var out = elements.map(function(el) {
        return el.outerHTML;
      });
      return out.join('');
    };
  */
  this.convertDocument = function(doc) { // eslint-disable-line
    throw new Error('This method is abstract');
  };

  this.convertContainer = function(container) {
    if (!container) {
      throw new Error('Illegal arguments: container is mandatory.');
    }
    var doc = container.getDocument();
    this.state.doc = doc;
    var elements = [];
    container.nodes.forEach(function(id) {
      var node = doc.get(id);
      var nodeEl = this.convertNode(node);
      elements.push(nodeEl);
    }.bind(this));
    return elements;
  };

  this.convertNode = function(node) {
    if (isString$1(node)) {
      // Assuming this.state.doc has been set by convertDocument
      node = this.state.doc.get(node);
    } else {
      this.state.doc = node.getDocument();
    }
    var converter = this.getNodeConverter(node);
    // special treatment for annotations, i.e. if someone calls
    // `exporter.convertNode(anno)`
    if (node.isPropertyAnnotation() && (!converter || !converter.export)) {
      return this._convertPropertyAnnotation(node);
    }
    if (!converter) {
      converter = this.getDefaultBlockConverter();
    }
    var el;
    if (converter.tagName) {
      el = this.$$(converter.tagName);
    } else {
      el = this.$$('div');
    }
    el.attr(this.config.idAttribute, node.id);
    if (converter.export) {
      el = converter.export(node, el, this) || el;
    } else {
      el = this.getDefaultBlockConverter().export(node, el, this) || el;
    }
    return el;
  };

  this.convertProperty = function(doc, path, options) {
    this.initialize(doc, options);
    var wrapper = this.$$('div')
      .append(this.annotatedText(path));
    return wrapper.innerHTML;
  };

  this.annotatedText = function(path) {
    var doc = this.state.doc;
    var text = doc.get(path);
    var annotations = doc.getIndex('annotations').get(path);
    return this._annotatedText(text, annotations);
  };

  this.getNodeConverter = function(node) {
    return this.converters.get(node.type);
  };

  this.getDefaultBlockConverter = function() {
    throw new Error('This method is abstract.');
  };

  this.getDefaultPropertyAnnotationConverter = function() {
    throw new Error('This method is abstract.');
  };

  this.getDocument = function() {
    return this.state.doc;
  };

  this.createElement = function(str) {
    return this._el.createElement(str);
  };

  this._annotatedText = function(text, annotations) {
    var self = this;

    var annotator = new Fragmenter();
    annotator.onText = function(context, text) {
      context.children.push(encodeXMLEntities(text));
    };
    annotator.onEnter = function(fragment) {
      var anno = fragment.node;
      return {
        annotation: anno,
        children: []
      };
    };
    annotator.onExit = function(fragment, context, parentContext) {
      var anno = context.annotation;
      var converter = self.getNodeConverter(anno);
      if (!converter) {
        converter = self.getDefaultPropertyAnnotationConverter();
      }
      var el;
      if (converter.tagName) {
        el = this.$$(converter.tagName);
      } else {
        el = this.$$('span');
      }
      el.attr(this.config.idAttribute, anno.id);
      el.append(context.children);
      if (converter.export) {
        el = converter.export(anno, el, self) || el;
      }
      parentContext.children.push(el);
    }.bind(this);
    var wrapper = { children: [] };
    annotator.start(wrapper, text, annotations);
    return wrapper.children;
  };

  /*
    This is used when someone calls `exporter.convertNode(anno)`
    Usually, annotations are converted by calling exporter.annotatedText(path).
    Still it makes sense to be able to export just a fragment containing just
    the annotation element.
  */
  this._convertPropertyAnnotation = function(anno) {
    // take only the annotations within the range of the anno
    var wrapper = this.$$('div').append(this.annotatedText(anno.path));
    var el = wrapper.find('['+this.config.idAttribute+'="'+anno.id+'"]');
    return el;
  };

};

oo.initClass(DOMExporter);

function createCountingIdGenerator() {
  var counters = {};
  return function uuid(prefix) {
    if (!counters.hasOwnProperty(prefix)) {
      counters[prefix] = 1;
    }
    var result = [prefix, '-', counters[prefix]++].join('');
    return result;
  };
}

/*
  An iterator for arrays.
  @class
  @param {Array} arr
 */
function ArrayIterator(arr) {
  this.arr = arr;
  this.pos = -1;
}

ArrayIterator.Prototype = function() {

  this._isArrayIterator = true;

  /**
    @returns {Boolean} true if there is another child node left.
   */
  this.hasNext = function() {
    return this.pos < this.arr.length - 1;
  };

  /**
    Increments the iterator providing the next child node.

    @returns {HTMLElement} The next child node.
   */
  this.next = function() {
    this.pos += 1;
    var next = this.arr[this.pos];
    return next;
  };

  /**
    Decrements the iterator.
   */
  this.back = function() {
    if (this.pos >= 0) {
      this.pos -= 1;
    }
    return this;
  };

};

oo.initClass(ArrayIterator);

// import uuid from '../util/uuid'
/**
  A generic base implementation for XML/HTML importers.

  @class
  @param {Object} config
 */
function DOMImporter(config) {
  if (!config.converters) {
    throw new Error('config.converters is mandatory');
  }
  this.config = extend$1({ idAttribute: 'id' }, config);
  this.schema = config.schema;
  this.state = null;

  this._defaultBlockConverter = null;
  this._allConverters = [];
  this._blockConverters = [];
  this._propertyAnnotationConverters = [];

  var schema = this.schema;
  var defaultTextType = schema.getDefaultTextType();

  config.converters.forEach(function(Converter) {
    var converter;
    if (typeof Converter === 'function') {
      // console.log('installing converter', Converter);
      converter = new Converter();
    } else {
      converter = Converter;
    }
    if (!converter.type) {
      console.error('Converter must provide the type of the associated node.', converter);
      return;
    }
    if (!converter.matchElement && !converter.tagName) {
      console.error('Converter must provide a matchElement function or a tagName property.', converter);
      return;
    }
    if (!converter.matchElement) {
      converter.matchElement = this._defaultElementMatcher.bind(converter);
    }
    var NodeClass = schema.getNodeClass(converter.type);
    if (!NodeClass) {
      console.error('No node type defined for converter', converter.type);
      return;
    }
    if (!this._defaultBlockConverter && defaultTextType === converter.type) {
      this._defaultBlockConverter = converter;
    }

    this._allConverters.push(converter);
    // Defaults to _blockConverters
    if (NodeClass.isPropertyAnnotation) {
      this._propertyAnnotationConverters.push(converter);
    } else {
      this._blockConverters.push(converter);
    }

  }.bind(this));

  this.state = new DOMImporter.State();
}

DOMImporter.Prototype = function DOMImporterPrototype() {

  this.reset = function() {
    this.state.reset();
  };

  this.createDocument = function() {
    this.state.doc = this._createDocument(this.config.schema);
    return this.state.doc;
  };

  // Note: this is e.g. shared by ClipboardImporter which has a different
  // implementation of this.createDocument()
  this._createDocument = function(schema) {
    // create an empty document and initialize the container if not present
    var doc = new this.config.DocumentClass(schema);
    return doc;
  };

  // should be called at the end to finish conversion
  // For instance, the creation of annotation is deferred
  // to make sure that the nodes they are attached to are created first
  // TODO: we might want to rethink this in future
  // as it makes this a bit more complicated
  this.generateDocument = function() {
    if (!this.state.doc) {
      this.state.doc = this.createDocument();
    }
    var doc = this.state.doc;
    this._createNodes();
    return doc;
  };

  this._createNodes = function() {
    var state = this.state;
    var doc = state.doc;
    // creating all nodes
    state.nodes.forEach(function(node) {
      // delete if the node exists already
      if (doc.get(node.id)) {
        doc.delete(node.id);
      }
      doc.create(node);
    });
    this._createInlineNodes();
  };

  this._createInlineNodes = function() {
    var state = this.state;
    var doc = state.doc;
    // creating annotations afterwards so that the targeted nodes exist for sure
    state.inlineNodes.forEach(function(node) {
      if (doc.get(node.id)) {
        doc.delete(node.id);
      }
      doc.create(node);
    });
  };

  /**
    Converts and shows all children of a given element.

    @param {ui/DOMElement[]} elements All elements that should be converted into the container.
    @param {String} containerId The id of the target container node.
    @returns {Object} the preliminary container node
   */
  this.convertContainer = function(elements, containerId) {
    var state = this.state;
    state.container = [];
    state.containerId = containerId;
    var iterator = new ArrayIterator(elements);
    while(iterator.hasNext()) {
      var el = iterator.next();
      var blockTypeConverter = this._getConverterForElement(el, 'block');
      var node;
      if (blockTypeConverter) {
        node = this._nodeData(el, blockTypeConverter.type);
        state.pushContext(el.tagName, blockTypeConverter);
        node = blockTypeConverter.import(el, node, this) || node;
        state.popContext();
        this._createAndShow(node);
      } else {
        if (el.isCommentNode()) {
          // skip HTML comment nodes on block level
        } else if (el.isTextNode()) {
          var text = el.textContent;
          if (/^\s*$/.exec(text)) continue;
          // If we find text nodes on the block level we wrap
          // it into a paragraph element (or what is configured as default block level element)
          iterator.back();
          this._wrapInlineElementsIntoBlockElement(iterator);
        } else if (el.isElementNode()) {
          // NOTE: hard to tell if unsupported nodes on this level
          // should be treated as inline or not.
          // ATM: we apply a catch-all to handle cases where inline content
          // is found on top level
          iterator.back();
          this._wrapInlineElementsIntoBlockElement(iterator);
        }
      }
    }
    var container = {
      type: 'container',
      id: containerId,
      nodes: this.state.container.slice(0)
    };
    this.createNode(container);
    return container;
  };

  /**
    Converts a single HTML element and creates a node in the current document.

    @param {ui/DOMElement} el the HTML element
    @returns {object} the created node as JSON
   */
  this.convertElement = function(el) {
    var doc = this.state.doc;
    var nodeData = this._convertElement(el);
    var node;
    if (doc) {
      node = doc.create(nodeData);
    } else {
      var NodeClass = this.schema.getNodeClass(nodeData.type);
      node = new NodeClass(doc, nodeData);
    }
    return node;
  };

  this._convertElement = function(el, mode) {
    var node;
    var converter = this._getConverterForElement(el, mode);
    if (converter) {
      node = this._nodeData(el, converter.type);
      var NodeClass = this.schema.getNodeClass(node.type);
      this.state.pushContext(el.tagName, converter);
      // Note: special treatment for property annotations and inline nodes
      // i.e. if someone calls `importer.convertElement(annoEl)`
      // usually, annotations are imported in the course of `importer.annotatedText(..)`
      // The peculiarity here is that in such a case, it is not
      // not clear, which property the annotation is attached to
      if (NodeClass.isInline) {
        this._convertInlineNode(el, node, converter);
      }
      else if (NodeClass.isPropertyAnnotation) {
        this._convertPropertyAnnotation(el, node);
      } else {
        node = converter.import(el, node, this) || node;
      }
      this.state.popContext();
      this.createNode(node);
    } else {
      throw new Error('No converter found for '+el.tagName);
    }
    return node;
  };

  this._convertPropertyAnnotation = function(el, node) {
    // if there is no context, this is called stand-alone
    // i.e., user tries to convert an annotation element
    // directly, not part of a block element, such as a paragraph
    node.path = [node.id, '_content'];
    node._content = this.annotatedText(el, node.path);
    node.startOffset = 0;
    node.endOffset = node._content.length;
  };

  this._convertInlineNode = function(el, node, converter) {
    node.path = [node.id, 'content'];
    node._content = '$';
    node.startOffset = 0;
    node.endOffset = 1;
    node = converter.import(el, node, this);
    return node;
  };

  this.createNode = function(node) {
    if (this.state.ids[node.id]) {
      throw new Error('Node with id alread exists:' + node.id);
    }
    this.state.ids[node.id] = true;
    this.state.nodes.push(node);
    return node;
  };

  this.show = function(node) {
    this.state.container.push(node.id);
  };

  this._createAndShow = function(node) {
    this.createNode(node);
    this.show(node);
  };

  this._nodeData = function(el, type) {
    var nodeData = {
      type: type,
      id: this.getIdForElement(el, type)
    };
    var NodeClass = this.schema.getNodeClass(type);
    forEach$1(NodeClass.schema, function(prop, name) {
      // check integrity of provided props, such as type correctness,
      // and mandatory properties
      var hasDefault = prop.hasOwnProperty('default');
      if (hasDefault) {
        nodeData[name] = clone$1(prop.default);
      }
    });
    return nodeData;
  };

  // /**
  //   Converts an html element into a text property of the document.

  //   @private
  //   @param {Array<String>} path Path of the property to be written
  //   @param {String} html HTML to be converter
  //  */
  // this.convertProperty = function(path, html) {
  //   // TODO: while this method may be useful if html is updated
  //   // piecewise, from an API point of view it is not intuitive.
  //   // We should see if we really need this.
  //   // And we should give it a better naming.
  //   var doc = this.getDocument();
  //   var el = $$('div').setInnerHtml(html);
  //   var text = this.annotatedText(el, path);
  //   doc.setText(path, text, this.state.inlineNodes);
  // };

  /**
    Convert annotated text. You should call this method only for elements
    containing rich-text.

    @param {ui/DOMElement} el
    @param {String[]} path The target property where the extracted text (plus annotations) should be stored.
    @param {Object} options
    @param {Boolean} options.preserveWhitespace when true will preserve whitespace. Default: false.
    @returns {String} The converted text as plain-text
   */
  this.annotatedText = function(el, path, options) {
    var state = this.state;
    if (path) {
      // if (state.stack.length>0) {
      //   throw new Error('Contract: it is not allowed to bind a new call annotatedText to a path while the previous has not been completed.', el.outerHTML);
      // }
      if (options && options.preserveWhitespace) {
        state.preserveWhitespace = true;
      }
      state.stack.push({ path: path, offset: 0, text: ""});
    } else {
      if (state.stack.length===0) {
        throw new Error("Contract: DOMImporter.annotatedText() requires 'path' for non-reentrant call.", el.outerHTML);
      }
    }
    // IMO we should reset the last char, as it is only relevant within one
    // annotated text property. This feature is mainly used to eat up
    // whitespace in XML/HTML at tag boundaries, produced by pretty-printed XML/HTML.
    this.state.lastChar = '';
    var text;
    var iterator = el.getChildNodeIterator();
    text = this._annotatedText(iterator);
    if (path) {
      state.stack.pop();
      state.preserveWhitespace = false;
    }
    return text;
  };

  /**
    Converts the given element as plain-text.

    @param {ui/DOMElement} el
    @returns {String} The plain text
   */
  this.plainText = function(el) {
    var state = this.state;
    var text = el.textContent;
    if (state.stack.length > 0) {
      var context = last$1(state.stack);
      context.offset += text.length;
      context.text += context.text.concat(text);
    }
    return text;
  };

  /**
    Tells the converter to insert a virutal custom text.

    This is useful when during conversion a generated label needs to be inserted instead
    of real text.

    @param {String}
   */
  this.customText = function(text) {
    var state = this.state;
    if (state.stack.length > 0) {
      var context = last$1(state.stack);
      context.offset += text.length;
      context.text += context.text.concat(text);
    }
    return text;
  };

  /**
    Generates an id. The generated id is unique with respect to all ids generated so far.

    @param {String} a prefix
    @return {String} the generated id
   */
  this.nextId = function(prefix) {
    // TODO: we could create more beautiful ids?
    // however we would need to be careful as there might be another
    // element in the HTML coming with that id
    // For now we use shas
    return this.state.uuid(prefix);
  };

  this.getIdForElement = function(el, type) {
    var id = el.getAttribute(this.config.idAttribute);
    if (id && !this.state.ids[id]) return id;

    var root = el.getRoot();
    id = this.nextId(type);
    while (this.state.ids[id] || root.find('#'+id)) {
      id = this.nextId(type);
    }
    return id;
  };

  this.defaultConverter = function(el, converter) {
    if (!this.IGNORE_DEFAULT_WARNINGS) {
      console.warn('This element is not handled by the converters you provided. This is the default implementation which just skips conversion. Override DOMImporter.defaultConverter(el, converter) to change this behavior.', el.outerHTML);
    }
    var defaultTextType = this.schema.getDefaultTextType();
    var defaultConverter = this._defaultBlockConverter;
    if (!defaultConverter) {
      throw new Error('Could not find converter for default type ', defaultTextType);
    }
    var node = this._nodeData(el, defaultTextType);
    this.state.pushContext(el.tagName, converter);
    node = defaultConverter.import(el, node, converter) || node;
    this.state.popContext();
    return node;
  };

  this._defaultElementMatcher = function(el) {
    return el.is(this.tagName);
  };

  // Internal function for parsing annotated text
  // --------------------------------------------
  //
  this._annotatedText = function(iterator) {
    var state = this.state;
    var context = last$1(state.stack);
    if (!context) {
      throw new Error('Illegal state: context is null.');
    }
    while(iterator.hasNext()) {
      var el = iterator.next();
      var text = "";
      // Plain text nodes...
      if (el.isTextNode()) {
        text = this._prepareText(state, el.textContent);
        if (text.length) {
          // Note: text is not merged into the reentrant state
          // so that we are able to return for this reentrant call
          context.text = context.text.concat(text);
          context.offset += text.length;
        }
      } else if (el.isCommentNode()) {
        // skip comment nodes
        continue;
      } else if (el.isElementNode()) {
        var inlineTypeConverter = this._getConverterForElement(el, 'inline');
        // if no inline converter is found we just traverse deeper
        if (!inlineTypeConverter) {
          if (!this.IGNORE_DEFAULT_WARNINGS) {
            console.warn('Unsupported inline element. We will not create an annotation for it, but process its children to extract annotated text.', el.outerHTML);
          }
          // Note: this will store the result into the current context
          this.annotatedText(el);
          continue;
        }
        // reentrant: we delegate the conversion to the inline node class
        // it will either call us back (this.annotatedText) or give us a finished
        // node instantly (self-managed)
        var startOffset = context.offset;
        var inlineType = inlineTypeConverter.type;
        var inlineNode = this._nodeData(el, inlineType);
        if (inlineTypeConverter.import) {
          // push a new context so we can deal with reentrant calls
          state.stack.push({ path: context.path, offset: startOffset, text: ""});
          state.pushContext(el.tagName, inlineTypeConverter);
          inlineNode = inlineTypeConverter.import(el, inlineNode, this) || inlineNode;
          state.popContext();

          var NodeClass = this.schema.getNodeClass(inlineType);
          // inline nodes are attached to an invisible character
          if (NodeClass.isInline) {
            this.customText("\u200B");
          } else {
            // We call this to descent into the element
            // which could be 'forgotten' otherwise.
            // TODO: what if the converter has processed the element already?
            this.annotatedText(el);
          }
          // ... and transfer the result into the current context
          var result = state.stack.pop();
          context.offset = result.offset;
          context.text = context.text.concat(result.text);
        } else {
          this.annotatedText(el);
        }
        // in the mean time the offset will probably have changed to reentrant calls
        var endOffset = context.offset;
        inlineNode.startOffset = startOffset;
        inlineNode.endOffset = endOffset;
        inlineNode.path = context.path.slice(0);
        state.inlineNodes.push(inlineNode);
      } else {
        console.warn('Unknown element type. Taking plain text.', el.outerHTML);
        text = this._prepareText(state, el.textContent);
        context.text = context.text.concat(text);
        context.offset += text.length;
      }
    }
    // return the plain text collected during this reentrant call
    return context.text;
  };

  this._getConverterForElement = function(el, mode) {
    var converters;
    if (mode === "block") {
      if (!el.tagName) return null;
      converters = this._blockConverters;
    } else if (mode === "inline") {
      converters = this._propertyAnnotationConverters;
    } else {
      converters = this._allConverters;
    }
    var converter = null;
    for (var i = 0; i < converters.length; i++) {
      if (this._converterCanBeApplied(converters[i], el)) {
        converter = converters[i];
        break;
      }
    }
    return converter;
  };

  this._converterCanBeApplied = function(converter, el) {
    return converter.matchElement(el, converter);
  };

  this._createElement = function(tagName) {
    return this._el.createElement(tagName);
  };

  /**
    Wraps the remaining (inline) elements of a node iterator into a default
    block node.

    @private
    @param {model/DOMImporter.ChildIterator} childIterator
    @returns {model/DocumentNode}
   */
  this._wrapInlineElementsIntoBlockElement = function(childIterator) {
    var wrapper = this._createElement('div');
    while(childIterator.hasNext()) {
      var el = childIterator.next();
      // if there is a block node we finish this wrapper
      var blockTypeConverter = this._getConverterForElement(el, 'block');
      if (blockTypeConverter) {
        childIterator.back();
        break;
      }
      wrapper.append(el.clone());
    }
    var node = this.defaultConverter(wrapper, this);
    if (node) {
      if (!node.type) {
        throw new Error('Contract: DOMImporter.defaultConverter() must return a node with type.');
      }
      this._createAndShow(node);
    }
    return node;
  };

  /**
    Converts an element into a default block level node.

    @private
    @param {ui/DOMElement} el
    @returns {model/DocumentNode}
   */
  this._createDefaultBlockElement = function(el) {
    var node = this.defaultConverter(el, this);
    if (node) {
      if (!node.type) {
        throw new Error('Contract: Html.defaultConverter() must return a node with type.', el.outerHTML);
      }
      node.id = node.id || this.defaultId(el, node.type);
      this._createAndShow(node);
    }
  };

  var WS_LEFT = /^\s+/g;
  var WS_LEFT_ALL = /^\s*/g;
  var WS_RIGHT = /\s+$/g;
  var WS_ALL = /\s+/g;
  // var ALL_WS_NOTSPACE_LEFT = /^[\t\n]+/g;
  // var ALL_WS_NOTSPACE_RIGHT = /[\t\n]+$/g;
  var SPACE = " ";
  var TABS_OR_NL = /[\t\n\r]+/g;

  // TODO: this needs to be tested and documented
  this._prepareText = function(state, text) {
    if (state.preserveWhitespace) {
      return text;
    }
    var repl = SPACE;
    // replace multiple tabs and new-lines by one space
    text = text.replace(TABS_OR_NL, '');
    // TODO: the last char handling is only necessary for for nested calls
    // i.e., when processing the content of an annotation, for instance
    // we need to work out how we could control this with an inner state
    if (state.lastChar === SPACE) {
      text = text.replace(WS_LEFT_ALL, repl);
    } else {
      text = text.replace(WS_LEFT, repl);
    }
    text = text.replace(WS_RIGHT, repl);
    // EXPERIMENTAL: also remove white-space within
    // this happens if somebody treats the text more like it would be done in Markdown
    // i.e. introducing line-breaks
    if (this.config.REMOVE_INNER_WS || state.removeInnerWhitespace) {
      text = text.replace(WS_ALL, SPACE);
    }
    state.lastChar = text[text.length-1] || state.lastChar;
    return text;
  };

  /**
    Removes any leading and trailing whitespaces from the content
    within the given element.
    Attention: this is not yet implemented fully. Atm, trimming is only done
    on the first and last text node (if they exist).

    @private
    @param {util/jQuery} $el
    @returns {util/jQuery} an element with trimmed text
   */
  this._trimTextContent = function(el) {
    var nodes = el.getChildNodes();
    var firstNode = nodes[0];
    var lastNode = last$1(nodes);
    var text, trimmed;
      // trim the first and last text
    if (firstNode && firstNode.isTextNode()) {
      text = firstNode.textContent;
      trimmed = this._trimLeft(text);
      firstNode.textContent = trimmed;
    }
    if (lastNode && lastNode.isTextNode()) {
      text = lastNode.textContent;
      trimmed = this._trimRight(text);
      lastNode.textContent = trimmed;
    }
    return el;
  };

  this._trimLeft = function(text) {
    return text.replace(WS_LEFT, "");
  };

  this._trimRight = function(text) {
    return text.replace(WS_RIGHT, "");
  };

};
oo.initClass(DOMImporter);

DOMImporter.State = function() {
  this.reset();
};

DOMImporter.State.Prototype = function() {

  this.reset = function() {
    this.preserveWhitespace = false;
    this.nodes = [];
    this.inlineNodes = [];
    this.containerId = null;
    this.container = [];
    this.ids = {};
    // stack for reentrant calls into _convertElement()
    this.contexts = [];
    // stack for reentrant calls into _annotatedText()
    this.stack = [];
    this.lastChar = "";
    this.skipTypes = {};
    this.ignoreAnnotations = false;

    // experimental: trying to generate simpler ids during import
    // this.uuid = uuid;
    this.uuid = createCountingIdGenerator();
  };

  this.pushContext = function(tagName, converter) {
    this.contexts.push({ tagName: tagName, converter: converter});
  };

  this.popContext = function() {
    return this.contexts.pop();
  };

  this.getCurrentContext = function() {
    return last$1(this.contexts);
  };

};

oo.initClass(DOMImporter.State);

// Note: in iron-node window is defined - but it has window.process
// which is not there in a real browser env
var inBrowser = ( typeof window !== 'undefined');

var _baseFindIndex = createCommonjsModule(function (module) {
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;
});

var _baseFindIndex$1 = interopDefault(_baseFindIndex);


var require$$2$28 = Object.freeze({
	default: _baseFindIndex$1
});

var findIndex = createCommonjsModule(function (module) {
var baseFindIndex = interopDefault(require$$2$28),
    baseIteratee = interopDefault(require$$2$6),
    toInteger = interopDefault(require$$1$25);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to search.
 * @param {Array|Function|Object|string} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;
});

var findIndex$1 = interopDefault(findIndex);


var require$$0$56 = Object.freeze({
	default: findIndex$1
});

/* eslint-disable no-unused-vars */

/**
  A unified interface for DOM elements used by Substance.

  There are three different implementations of this interface:
  - {@link ui/DefaultDOMElement}
  - {@link ui/VirtualDOMElement}
  - {@link ui/Component}

  Methods which rely on a CSS selector implementation are only available for {@link ui/DefaultDOMElement} instance, which is used during DOM import.
  I.e., don't use the following methods in Component renderers:
  - {@link ui/DOMElement#is}
  - {@link ui/DOMElement#find}
  - {@link ui/DOMElement#findAll}

  @class
  @abstract
  @interface
*/
function DOMElement() {

  /**
    The element's id.
    @property {String} ui/DOMElement#id
  */

  /**
    The element's tag name in lower case.
    @property {String} ui/DOMElement#tagName
  */

  /**
    @property {String} ui/DOMElement#textContent
   */

  /**
    The inner HTML string.

    @property {String} ui/DOMElement#innerHTML
   */

  /**
    The outer HTML string.

    @property {String} ui/DOMElement#outerHTML
   */

  /**
    An array of child nodes, including nodes such as TextNodes.

    @property {Array<ui/DOMElement>} ui/DOMElement#childNodes
   */

  /**
    An array of child elements.

    @property {Array<ui/DOMElement>} ui/DOMElement#children children
   */

  /**
    The computed height.

    @property {Array<ui/DOMElement>} ui/DOMElement#height
   */

  /**
    The computed width.

    @property {Array<ui/DOMElement>} ui/DOMElement#width
   */

}

DOMElement.Prototype = function() {

  this._isDOMElement = true;

  var NOT_IMPLEMENTED = 'This method is not implemented.';

  this.getNativeElement = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Checks if a CSS class is set.

    @abstract
    @param {String} className
    @returns {Boolean} true if the CSS class is set
  */
  this.hasClass = function(className) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Adds a CSS class.

    @abstract
    @param {String} classString A space-separated string with CSS classes
    @returns {this}
  */
  this.addClass = function(classString) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Removes a CSS class.

    @abstract
    @param {String} classString A space-separated string with CSS classes
    @returns {this}
  */
  this.removeClass = function(classString) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    jQuery style getter and setter for attributes.

    @abstract
    @param {String} name
    @param {String} [value] if present the attribute will be set
    @returns {String|this} if used as getter the attribute value, otherwise this element for chaining
   */
  this.attr = function() {
    if (arguments.length === 1) {
      if (isString$1(arguments[0])) {
        return this.getAttribute(arguments[0]);
      } else if (isObject$1(arguments[0])) {
        forEach$1(arguments[0], function(value, name) {
          this.setAttribute(name, value);
        }.bind(this));
      }
    } else if (arguments.length === 2) {
      this.setAttribute(arguments[0], arguments[1]);
    }
    return this;
  };

  /**
    Removes an attribute.

    @abstract
    @param {String} name
    @returns {this}
  */
  this.removeAttr = function(name) {
    var names = name.split(/\s+/);
    if (names.length === 1) {
      this.removeAttribute(name);
    } else {
      names.forEach(function(name) {
        this.removeAttribute(name);
      }.bind(this));
    }
    return this;
  };

  /**
    Get the attribute with a given name.

    @abstract
    @returns {String} the attribute's value.
  */
  this.getAttribute = function(name) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Set the attribute with a given name.

    @abstract
    @param {String} the attribute's value.
    @returns {this}
  */
  this.setAttribute = function(name, value) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.removeAttribute = function(name) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.getAttributes = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    jQuery style getter and setter for HTML element properties.

    @abstract
    @param {String} name
    @param {String} [value] if present the property will be set
    @returns {String|this} if used as getter the property value, otherwise this element for chaining
   */
  this.htmlProp = function() {
    if (arguments.length === 1) {
      if (isString$1(arguments[0])) {
        return this.getProperty(arguments[0]);
      } else if (isObject$1(arguments[0])) {
        forEach$1(arguments[0], function(value, name) {
          this.setProperty(name, value);
        }.bind(this));
      }
    } else if (arguments.length === 2) {
      this.setProperty(arguments[0], arguments[1]);
    }
    return this;
  };

  this.getProperty = function(name) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.setProperty = function(name, value) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.removeProperty = function(name) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Get the tagName of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {ui/DOMElement.prototype.tagName}
    @returns {String} the tag name in lower-case.
   */
  this.getTagName = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Set the tagName of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {ui/DOMElement.prototype.tagName}
    @param {String} tagName the new tag name
    @returns {this}
  */
  this.setTagName = function(tagName) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Get the id of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {ui/DOMElement.prototype.id}
    @returns {String} the id.
   */
  this.getId = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Set the id of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {ui/DOMElement.prototype.id}
    @param {String} id the new id
    @returns {this}
  */
  this.setId = function(id) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    jQuery style getter and setter for the *value* of an element.

    @abstract
    @param {String} [value] The value to set.
    @returns {String|this} the value if used as a getter, `this` otherwise
  */
  this.val = function(value) {
    if (arguments.length === 0) {
      return this.getValue();
    } else {
      this.setValue(value);
      return this;
    }
  };

  this.getValue = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.setValue = function(value) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    jQuery style method to set or get inline CSS styles.

    @param {String} name the style name
    @param {String} [value] the style value
    @returns {String|this} the style value or this if used as a setter
  */
  this.css = function() {
    if (arguments.length === 1) {
      if (isString$1(arguments[0])) {
        return this.getStyle(arguments[0]);
      } else if (isObject$1(arguments[0])) {
        forEach$1(arguments[0], function(value, name) {
          this.setStyle(name, value);
        }.bind(this));
      } else {
        throw new Error('Illegal arguments.');
      }
    } else if (arguments.length === 2) {
      this.setStyle(arguments[0], arguments[1]);
    } else {
      throw new Error('Illegal arguments.');
    }
    return this;
  };

  this.getStyle = function(name) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.setStyle = function(name, value) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Gets or sets the text content of an element.

    @abstract
    @param {String} [text] The text content to set.
    @returns {String|this} The text content if used as a getter, `this` otherwise
  */
  this.text = function(text) {
    if (arguments.length === 0) {
      return this.getTextContent();
    } else {
      this.setTextContent(text);
    }
    return this;
  };

  /**
    Get the textContent of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {ui/DOMElement.prototype.innerHTML}
    @returns {String}
  */
  this.getTextContent = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Set the textContent of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {ui/DOMElement.prototype.innerHTML}
    @param {String} text the new text content
    @returns {this}
  */
  this.setTextContent = function(text) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    jQuery style getter and setter for the innerHTML of an element.

    @abstract
    @param {String} [html] The html to set.
    @returns {String|this} the inner html if used as a getter, `this` otherwise
   */
  this.html = function(html) {
    if (arguments.length === 0) {
      return this.getInnerHTML();
    } else {
      this.setInnerHTML(html);
    }
    return this;
  };

  /**
    Get the innerHTML of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {@link ui/DOMElement.prototype.innerHTML}
    @returns {String}
  */
  this.getInnerHTML = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Set the innerHTML of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {@link ui/DOMElement.prototype.innerHTML}
    @param {String} text the new text content
    @returns {this}
  */
  this.setInnerHTML = function(html) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Get the outerHTML of this element.

    @abstract
    @private
    @note Considered as private API, in favor of the property {@link ui/DOMElement.prototype.outerHTML}
    @returns {String}
  */
  this.getOuterHTML = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Registers an Element event handler.

    @param {String} event The event name.
    @param {Function} handler The handler function.
    @param {Object} [context] context where the function should be bound to
    @param {Object} [options]
    @param {Object} [options.selector] for event delegation
    @param {Object} [options.capture] to register the event in the event's capture phase (bubbling top-down)
    @returns {this}
  */
  this.on = function(eventName, handler, context, options) {
    if (!isString$1(eventName)) {
      throw new Error('Illegal argument: "event" must be a String.');
    }
    options = options || {};
    if (context) {
      options.context = context;
    }
    if (options.selector && !isString$1(options.selector)) {
      throw new Error('Illegal argument: selector must be a string.');
    }
    if (!handler || !isFunction$1(handler)) {
      throw new Error('Illegal argument: invalid handler function for event ' + eventName);
    }
    this.addEventListener(eventName, handler, options);
    return this;
  };

  /**
    Unregisters the handler of a given event.

    @param {String} event The event name.
    @returns {this}
  */
  this.off = function(eventName, handler) {
    // el.off(this): disconnect all listeners bound to the given context
    if (arguments.length === 1 && !isString$1(eventName)) {
      var context = arguments[0];
      var listeners = this.getEventListeners().filter(function(l) {
        return l.context === context;
      }).forEach(function(l) {
        this.removeEventListener(l);
      }.bind(this));
    } else {
      this.removeEventListener(eventName, handler);
    }
    return this;
  };

  this.addEventListener = function(eventName, handler, options) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.removeEventListener = function(eventName, handler) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.getEventListeners = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Gets the type of this element in lower-case.

    @private
    @note Considered as private API, in favor of the property {@link ui/DOMElement.prototype.nodeType}
    @returns {String}
  */
  this.getNodeType = function() {
    if (this.isTextNode()) {
      return "text";
    } else if (this.isCommentNode()) {
      return "comment";
    } else if (this.isElementNode()) {
      return "element";
    } else if (this.isDocumentNode()) {
      return "document";
    } else {
      throw new Error("Unsupported node type");
    }
  };

  this.getChildCount = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Get child nodes of this element.

    This method provides a new array with wrapped native elements.
    Better use getChildAt().

    @abstract
    @private Considered as private API, in favor of the property {ui/DOMElement.prototype.childNodes}
    @returns {Array<ui/DOMElement>}
   */
  this.getChildNodes = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Get child elements of this element.

    This method provides a new array with wrapped native elements.
    Better use getChildAt().

    @abstract
    @private Considered as private API, in favor of the property {ui/DOMElement.prototype.children}
    @returns {Array<ui/DOMElement>}
   */
  this.getChildren = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.getChildAt = function(pos) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.getChildIndex = function(child) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.getChildNodeIterator = function() {
    return new ArrayIterator(this.getChildNodes());
  };

  this.getLastChild = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.getFirstChild = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.getNextSibling = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.getPreviousSibling = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Checks if the element is a TextNode.

    @abstract
    @returns {Boolean} true if the element is of type `Node.TEXT_NODE`
   */
  this.isTextNode = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Checks if the element is actually an element as opposed to a node.

    @abstract
    @returns {Boolean} true if the element is of type `Node.ELEMENT_NODE`
   */
  this.isElementNode = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Checks if the element is a CommentNode.

    @abstract
    @returns {Boolean} true if the element is of type `Node.COMMENT_NODE`
   */
  this.isCommentNode = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Checks if the element is a DocumentNode.

    @abstract
    @returns {Boolean} true if the element is of type `Node.DOCUMENT_NODE`
   */
  this.isDocumentNode = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Creates a clone of the current element.

    @abstract
    @returns {ui/DOMElement} A clone of this element.
  */
  this.clone = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Creates a DOMElement.

    @param {String} str a tag name or an HTML element as string.
    @returns {ui/DOMElement}
  */
  this.createElement = function(str) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.createTextNode = function(text) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Checks if a given CSS selector matches for this element.

    **Attention**
    This method is currently not implemented for {ui/VirtualElement}.
    This means you should use it only in importer implementations.

    @abstract
    @param {String} cssSelector
    @returns {Boolean}
   */
  this.is = function(cssSelector) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Get the parent element of this element.

    @abstract
    @returns {ui/DOMElement} the parent element
   */
  this.getParent = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Get the root ancestor element of this element.

    In the browser this is the `window.document`.

    @abstract
    @returns {ui/DOMElement} the root element
   */
  this.getRoot = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Find the first descendant element matching the given CSS selector.
    Note this differs from jQuery.find() that it returns only one element.

    **Attention**
    This method is currently not implemented for {ui/VirtualElement}.
    This means you can use it only in importer implementations, but not in render or exporter implementations.

    @abstract
    @param {String} cssSelector
    @returns {ui/DOMElement} found element
   */
  this.find = function(cssSelector) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Find all descendant elements matching the given CSS selector.

    **Attention**
    This method is currently not implemented for {ui/VirtualElement}.
    This means you can use it only in importer implementations, but not in render or exporter implementations.

    @abstract
    @param {String} cssSelector
    @returns {Array<ui/DOMElement>} found elements
   */
  this.findAll = function(cssSelector) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Append a child element.

    @abstract
    @param {ui/DOMElement|String} child An element or text to append
    @returns {this}
   */
  this.append = function(child) {
    var children;
    if (arguments.length === 1) {
      if (isArray$1(child)) {
        children = child;
      } else {
        this.appendChild(child);
        return this;
      }
    } else {
      children = arguments;
    }
    if (children) {
      Array.prototype.forEach.call(children, this.appendChild.bind(this));
    }
    return this;
  };

  this.appendChild = function(child) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Insert a child element at a given position.

    @abstract
    @param {Number} pos insert position
    @param {ui/DOMElement|String} child The child element or text to insert.
    @returns {this}
  */
  this.insertAt = function(pos, child) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.insertBefore = function(newChild, before) {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Remove the child at a given position.

    @abstract
    @param {Number} pos
    @returns {this}
  */
  this.removeAt = function(pos) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.removeChild = function(child) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.replaceChild = function(oldChild, newChild) {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.remove = function() {
    var parent = this.getParent();
    if (parent) {
      parent.removeChild(this);
    }
  };

  /**
    Removes all child nodes from this element.

    @abstract
    @returns {this}
  */
  this.empty = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  /**
    Removes this element from its parent.

    @abstract
    @returns {this}
  */
  this.remove = function() {
    throw new Error(NOT_IMPLEMENTED);
  };

  this.serialize = function() {
    return this.outerHTML;
  };

  this.isInDocument = function() {
    return false;
  };

  /**
    Focusses this element.

    **Attention: this makes only sense for elements which are rendered in the browser**

  */
  this.focus = function() {
    return this;
  };

  /**
    Blur this element.
  */
  this.blur = function() {
    return this;
  };

  /**
    Trigger a click event on this element.
  */
  this.click = function() {
    return this;
  };

  /* API to retrieve layout information */

  this.getWidth = function() {
    return 0;
  };

  this.getHeight = function() {
    return 0;
  };

  /**
    Outer height as provided by $.outerHeight(withMargin)
  */
  this.getOuterHeight = function(withMargin) {
    return 0;
  };

  /**
    Offset values as provided by $.offset()
  */
  this.getOffset = function() {
    return { top: 0, left: 0 };
  };

  /**
    Position values as provided by $.position()
  */
  this.getPosition = function() {
    return { top: 0, left: 0 };
  };

  /**
    Get element factory conveniently

    @example

    var $$ = el.getElementFactory();
    $$('div').append('bla')
  */
  this.getElementFactory = function() {
    return this.createElement.bind(this);
  };

};

oo.initClass(DOMElement);


var _propertyDefinitions = {
  'id': {
    configurable: true,
    get: function() {
      return this.getId();
    },
    set: function(id) {
      this.setId(id);
    }
  },
  'tagName': {
    configurable: true,
    get: function() {
      return this.getTagName();
    },
    set: function(tagName) {
      this.setTagName(tagName);
    }
  },
  'nodeName': {
    configurable: true,
    get: function() {
      return this.getTagName();
    }
  },
  'nodeType': {
    configurable: true,
    get: function() {
      return this.getNodeType();
    },
    set: function() {
      throw new Error('ui/DOMElement#nodeType is readonly.');
    }
  },
  'textContent': {
    configurable: true,
    get: function() {
      return this.getTextContent();
    },
    set: function(text) {
      this.setTextContent(text);
    }
  },
  'innerHTML': {
    configurable: true,
    get: function() {
      return this.getInnerHTML();
    },
    set: function(html) {
      this.setInnerHTML(html);
    }
  },
  'outerHTML': {
    configurable: true,
    get: function() {
      return this.getOuterHTML();
    },
    set: function() {
      throw new Error('ui/DOMElement#outerHTML is readonly.');
    }
  },
  'childNodes': {
    configurable: true,
    get: function() {
      return this.getChildNodes();
    },
    set: function() {
      throw new Error('ui/DOMElement#childNodes is readonly.');
    }
  },
  'children': {
    configurable: true,
    get: function() {
      return this.getChildren();
    },
    set: function() {
      throw new Error('ui/DOMElement#children is readonly.');
    }
  },
  'parentNode': {
    configurable: true,
    get: function() {
      return this.getParent();
    },
    set: function() {
      throw new Error('ui/DOMElement#parentNode is readonly.');
    }
  },
  'height': {
    configurable: true,
    get: function() {
      return this.getHeight();
    },
  },
  'width': {
    configurable: true,
    get: function() {
      return this.getWidth();
    },
  },
};

DOMElement._propertyNames = Object.keys(_propertyDefinitions);

DOMElement._defineProperties = function(DOMElementClass, propertyNames) {
  propertyNames = propertyNames || DOMElement._propertyNames;
  propertyNames.forEach(function(name) {
    var def = _propertyDefinitions[name];
    if (def) {
      Object.defineProperty(DOMElementClass.prototype, name, def);
    }
  });
};

function DOMElementDelegator() {
  this.el = null;
}

DOMElementDelegator.Prototype = function() {

  var _delegators = {
    'getNativeElement': null,
    'hasClass': false,
    'getAttribute': null,
    'getAttributes': {},
    'getProperty': null,
    'getTagName': 'throw',
    'getId': 'throw',
    'getValue': null,
    'getStyle': null,
    'getTextContent': '',
    'getInnerHTML': '',
    'getOuterHTML': '',
    'getChildCount': 0,
    'getChildNodes': [],
    'getChildren': [],
    'getChildAt': null,
    'getParent': null,
    'getRoot': null,
    'getEventListeners': [],
    'find': null,
    'findAll': [],
    'is': false,
    'isTextNode': false,
    'isElementNode': false,
    'isCommentNode': false,
    'isDocumentNode': false,
    'isInDocument': false,
    'position': null
  };

  forEach$1(_delegators, function(defaultValue, method) {
    this[method] = function() {
      if (!this.el) {
        if (defaultValue === 'throw') {
          throw new Error('This component has not been rendered yet.');
        } else {
          return defaultValue;
        }
      }
      return this.el[method].apply(this.el, arguments);
    };
  }.bind(this));

  // Delegators implementing the DOMElement interface
  // these are chainable
  [
    'addClass', 'removeClass',
    'setAttribute', 'removeAttribute',
    'setProperty', 'removeProperty',
    'setTagName', 'setId', 'setValue', 'setStyle',
    'setTextContent', 'setInnerHTML',
    'addEventListener', 'removeEventListener',
    'appendChild', 'insertAt', 'insertBefore',
    'remove', 'removeAt', 'removeChild', 'replaceChild', 'empty',
    'focus', 'blur', 'click'
  ].forEach(function(method) {
    this[method] = function() {
      if (!this.el) {
        throw new Error('This component has not been rendered yet.');
      }
      this.el[method].apply(this.el, arguments);
      return this;
    };
  }.bind(this));
};

DOMElement.extend(DOMElementDelegator);
DOMElement.Delegator = DOMElementDelegator;

function DOMEventListener(eventName, handler, options) {
  if (!isString$1(eventName) || !isFunction$1(handler)) {
    throw new Error("Illegal arguments: 'eventName' must be a String, and 'handler' must be a Function.");
  }
  options = options || {};
  var origHandler = handler;
  var context = options.context;
  var capture = Boolean(options.capture);

  if (context) {
    handler = handler.bind(context);
  }
  if (options.once === true) {
    handler = _once(this, handler);
  }

  this.eventName = eventName;
  this.originalHandler = origHandler;
  this.handler = handler;
  this.capture = capture;
  this.context = context;
  this.options = options;
  // set when this gets attached to a DOM element
  this._el = null;
}

DOMEventListener.prototype._isDOMEventListener = true;

DOMEventListener.matches = function(l1, l2) {
  return l1.eventName === l2.eventName && l1.originalHandler === l2.originalHandler;
};

function _once(listener, handler) {
  return function(event) {
    handler(event);
    listener._el.removeEventListener(listener);
  };
}

DOMElement.EventListener = DOMEventListener;

DOMElement._findEventListenerIndex = function(eventListeners, eventName, handler) {
  var idx = -1;
  if (arguments[1]._isDOMEventListener) {
    idx = eventListeners.indexOf(arguments[1]);
  } else {
    idx = findIndex$1(eventListeners,
      DOMEventListener.matches.bind(null, {
        eventName: eventName,
        originalHandler: handler
      })
    );
  }
  return idx;
};

function TextNode$1() {}

TextNode$1.Prototype = function() {
  this._isDOMElement = true;

  this.isTextNode = function() {
    return true;
  };

  this.getNodeType = function() {
    return 'text';
  };

  this.isElementNode =
  this.isDocumentNode =
  this.isCommentNode = function() {
    return false;
  };

  [
    'getParent', 'getNextSibling', 'getPreviousSibling',
    'text', 'getTextContent', 'setTextContent',
    'clone'
  ].forEach(function(name) {
    this[name] = DOMElement.prototype[name];
  }.bind(this));

};

oo.initClass(TextNode$1);

DOMElement.TextNode = TextNode$1;

/*
  A wrapper for native DOM events when using event delegation via
  `DOMElement.on(eventName, selector, handler)`.

  @param [Component] owner
  @param [Element] selectedTarget native DOM element
  @param [Event] originalEvent native DOM event
*/
function DelegatedEvent(owner, selectedTarget, originalEvent) {
  this.owner = owner
  this.target = selectedTarget
  this.originalEvent = originalEvent
}

class BrowserDOMElement extends DOMElement {
  constructor(el) {
    super()
    console.assert(el instanceof window.Node, "Expecting native DOM node.")
    this.el = el
    el._wrapper = this
    this.eventListeners = []
    this.htmlProps = {}
  }

  get _isBrowserDOMElement() {
    return true 
  }

  getNativeElement() {
    return this.el
  }

  hasClass(className) {
    return this.el.classList.contains(className)
  }

  addClass(className) {
    this.el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.el.classList.remove(className)
    return this
  }

  getClasses() {
    return this.el.className
  }

  setClasses(classString) {
    this.el.className = classString
    return this
  }

  getAttribute(name) {
    return this.el.getAttribute(name)
  }

  setAttribute(name, value) {
    this.el.setAttribute(name, value)
    return this
  }

  removeAttribute(name) {
    this.el.removeAttribute(name)
    return this
  }

  getAttributes() {
    let result = {}
    let attributes = this.el.attributes
    let l = attributes.length
    for(let i=0; i < l; i++) {
      let attr = attributes.item(i)
      result[attr.name] = attr.value
    }
    return result
  }

  getProperty(name) {
    return this.el[name]
  }

  setProperty(name, value) {
    this.htmlProps[name] = value
    this.el[name] = value
    return this
  }

  removeProperty(name) {
    delete this.htmlProps[name]
    delete this.el[name]
    return this
  }

  getTagName() {
    if (this.el.tagName) {
      return this.el.tagName.toLowerCase()
    }
  }

  setTagName(tagName) {
    let newEl = BrowserDOMElement.createElement(tagName)
    let attributes = this.el.attributes
    let l = attributes.length
    let i
    for(i = 0; i < l; i++) {
      let attr = attributes.item(i)
      newEl.setAttribute(attr.name, attr.value)
    }
    for (let key in this.htmlProps) {
      if (this.htmlProps.hasOwnProperty(key)) {
        newEl[key] = this.htmlProps[key]
      }
    }
    this.eventListeners.forEach(function(listener) {
      newEl.addEventListener(listener.eventName, listener.handler, listener.capture)
    })

    newEl.append(this.getChildNodes())

    this._replaceNativeEl(newEl.getNativeElement())
    return this
  }

  getId() {
    return this.el.id
  }

  setId(id) {
    this.el.id = id
    return this
  }

  getValue() {
    return this.el.value
  }

  setValue(value) {
    this.el.value = value
    return this
  }

  getStyle(name) {
    // NOTE: important to provide computed style, otherwise we don't get inherited styles
    let style = this.getComputedStyle()
    return style[name] || this.el.style[name]
  }

  getComputedStyle() {
    return window.getComputedStyle(this.el)
  }

  setStyle(name, value) {
    let _pxStyles = {
      top: true,
      bottom: true,
      left: true,
      right: true,
      height: true,
      width: true
    }

    if (_pxStyles[name] && isNumber$1(value)) {
      value = value + "px"
    }
    this.el.style[name] = value
    return this
  }

  getTextContent() {
    return this.el.textContent
  }

  setTextContent(text) {
    this.el.textContent = text
    return this
  }

  getInnerHTML() {
    let innerHTML = this.el.innerHTML
    if (!isString$1(innerHTML)) {
      let frag = this.el.ownerDocument.createDocumentFragment()
      for (let c = this.el.firstChild; c; c = c.nextSibling) {
        frag.appendChild(c.cloneNode(true))
      }
      let xs = new window.XMLSerializer()
      innerHTML = xs.serializeToString(frag)
    }
    return innerHTML
  }

  setInnerHTML(html) {
    this.el.innerHTML = html
    return this
  }

  getOuterHTML() {
    let outerHTML = this.el.outerHTML
    if (!isString$1(outerHTML)) {
      let xs = new window.XMLSerializer()
      outerHTML = xs.serializeToString(this.el)
    }
    return outerHTML
  }

  addEventListener(eventName, handler, options) {
    let listener
    if (arguments.length === 1 && arguments[0]) {
      listener = arguments[0]
    } else {
      listener = new DOMElement.EventListener(eventName, handler, options)
    }
    if (listener.options.selector && !listener.__hasEventDelegation__) {
      listener.handler = this._delegatedHandler(listener)
      listener.__hasEventDelegation__ = true
    }
    this.el.addEventListener(listener.eventName, listener.handler, listener.capture)
    listener._el = this
    this.eventListeners.push(listener)
    return this
  }

  _delegatedHandler(listener) {
    let handler = listener.handler
    let context = listener.context
    let selector = listener.options.selector
    let nativeTop = this.getNativeElement()
    return function(event) {
      let nativeEl = event.target
      while(nativeEl) {
        if (matches(nativeEl, selector)) {
          handler(new DelegatedEvent(context, event.target, event))
          break
        }
        if (nativeEl === nativeTop) {
          break
        }
        nativeEl = nativeEl.parentNode;
      }
    }
  }

  removeEventListener(eventName, handler) {
    // console.log('removing event listener', eventName, handler);
    let listener = null, idx = -1
    idx = DOMElement._findEventListenerIndex(this.eventListeners, eventName, handler)
    listener = this.eventListeners[idx]
    if (idx > -1) {
      this.eventListeners.splice(idx, 1)
      // console.log('BrowserDOMElement.removeEventListener:', eventName, this.eventListeners.length);
      listener._el = null
      this.el.removeEventListener(listener.eventName, listener.handler)
    }
    return this
  }

  removeAllEventListeners() {
    for (let i = 0; i < this.eventListeners.length; i++) {
      let listener = this.eventListeners[i]
      // console.log('BrowserDOMElement.removeEventListener:', eventName, this.eventListeners.length);
      listener._el = null
      this.el.removeEventListener(listener.eventName, listener.handler)
    }
    this.eventListeners = []
  }

  getEventListeners() {
    return this.eventListeners
  }

  getChildCount() {
    return this.el.childNodes.length
  }

  getChildNodes() {
    let childNodes = []
    for (let node = this.el.firstChild; node; node = node.nextSibling) {
      childNodes.push(BrowserDOMElement.wrapNativeElement(node))
    }
    return childNodes
  }

  getChildren() {
    let children = [];
    for (let node = this.el.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        children.push(BrowserDOMElement.wrapNativeElement(node))
      }
    }
    return children
  }

  getChildAt(pos) {
    return BrowserDOMElement.wrapNativeElement(this.el.childNodes[pos])
  }

  getChildIndex(child) {
    if (!child._isBrowserDOMElement) {
      throw new Error('Expecting a BrowserDOMElement instance.')
    }
    return Array.prototype.indexOf.call(this.el.childNodes, child.el)
  }

  getFirstChild() {
    let firstChild = this.el.firstChild
    if (firstChild) {
      return BrowserDOMElement.wrapNativeElement(firstChild)
    } else {
      return null
    }
  }

  getLastChild() {
    var lastChild = this.el.lastChild
    if (lastChild) {
      return BrowserDOMElement.wrapNativeElement(lastChild)
    } else {
      return null
    }
  }

  getNextSibling() {
    let next = this.el.nextSibling
    if (next) {
      return BrowserDOMElement.wrapNativeElement(next)
    } else {
      return null
    }
  }

  getPreviousSibling() {
    let previous = this.el.previousSibling
    if (previous) {
      return BrowserDOMElement.wrapNativeElement(previous)
    } else {
      return null
    }
  }

  isTextNode() {
    return (this.el.nodeType === window.Node.TEXT_NODE)
  }

  isElementNode() {
    return (this.el.nodeType === window.Node.ELEMENT_NODE)
  }

  isCommentNode() {
    return (this.el.nodeType === window.Node.COMMENT_NODE)
  }

  isDocumentNode() {
    return (this.el.nodeType === window.Node.DOCUMENT_NODE)
  }

  clone() {
    let clone = this.el.cloneNode(true)
    return BrowserDOMElement.wrapNativeElement(clone)
  }

  createElement(tagName) {
    let el = this.el.ownerDocument.createElement(tagName)
    return BrowserDOMElement.wrapNativeElement(el)
  }

  createTextNode(text) {
    var el = this.el.ownerDocument.createTextNode(text)
    return BrowserDOMElement.wrapNativeElement(el)
  }

  is(cssSelector) {
    // ATTENTION: looking at https://developer.mozilla.org/en/docs/Web/API/Element/matches
    // Element.matches might not be supported by some mobile browsers
    let el = this.el
    if (this.isElementNode()) {
      return matches(el, cssSelector)
    } else {
      return false
    }
  }

  getParent() {
    let parent = this.el.parentNode
    if (parent) {
      return BrowserDOMElement.wrapNativeElement(parent)
    } else {
      return null
    }
  }

  getRoot() {
    let el = this.el
    let parent = el
    while (parent) {
      el = parent;
      parent = el.parentNode
    }
    return BrowserDOMElement.wrapNativeElement(el)
  }

  find(cssSelector) {
    let result = null
    if (this.el.querySelector) {
      result = this.el.querySelector(cssSelector)
    }
    if (result) {
      return BrowserDOMElement.wrapNativeElement(result)
    } else {
      return null
    }
  }

  findAll(cssSelector) {
    let result = []
    if (this.el.querySelectorAll) {
      result = this.el.querySelectorAll(cssSelector)
    }
    return Array.prototype.map.call(result, function(el) {
      return BrowserDOMElement.wrapNativeElement(el)
    })
  }

  _normalizeChild(child) {
    if (child instanceof window.Node) {
      if (!child._wrapper) {
        child = BrowserDOMElement.wrapNativeElement(child)
      } else {
        return child
      }
    }
    if (isString$1(child)) {
      child = this.createTextNode(child)
    }
    if (!child || !child._isBrowserDOMElement) {
      throw new Error('Illegal child type.')
    }
    // HACK: I thought it isn't possible to create
    // a BrowserDOMElement instance without having this
    // done already
    if (!child.el._wrapper) {
      child.el._wrapper = child
    }
    console.assert(child.el._wrapper === child, "The backlink to the wrapper should be consistent")
    return child.getNativeElement()
  }

  appendChild(child) {
    let nativeChild = this._normalizeChild(child)
    this.el.appendChild(nativeChild)
    return this
  }

  insertAt(pos, child) {
    let nativeChild = this._normalizeChild(child)
    let childNodes = this.el.childNodes
    if (pos >= childNodes.length) {
      this.el.appendChild(nativeChild)
    } else {
      this.el.insertBefore(nativeChild, childNodes[pos])
    }
    return this
  }

  insertBefore(child, before) {
    if (!before || !before._isBrowserDOMElement) {
      throw new Error('insertBefore(): Illegal arguments. "before" must be a BrowserDOMElement instance.')
    }
    var nativeChild = this._normalizeChild(child)
    this.el.insertBefore(nativeChild, before.el)
    return this
  }

  removeAt(pos) {
    this.el.removeChild(this.el.childNodes[pos])
    return this;
  }

  removeChild(child) {
    if (!child || !child._isBrowserDOMElement) {
      throw new Error('removeChild(): Illegal arguments. Expecting a BrowserDOMElement instance.')
    }
    this.el.removeChild(child.el)
    return this
  }

  replaceChild(oldChild, newChild) {
    if (!newChild || !oldChild ||
        !newChild._isBrowserDOMElement || !oldChild._isBrowserDOMElement) {
      throw new Error('replaceChild(): Illegal arguments. Expecting BrowserDOMElement instances.')
    }
    // Attention: Node.replaceChild has weird semantics
    this.el.replaceChild(newChild.el, oldChild.el)
    return this
  }

  empty() {
    // http://jsperf.com/empty-an-element/4 suggests that this is the fastest way to
    // clear an element
    let el = this.el
    while (el.lastChild) {
      el.removeChild(el.lastChild)
    }
    return this
  }

  remove() {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el)
    }
    return this
  }

  serialize() {
    let outerHTML = this.el.outerHTML
    if (isString$1(outerHTML)) {
      return outerHTML
    } else {
      let xs = new window.XMLSerializer()
      return xs.serializeToString(this.el)
    }
  }

  isInDocument() {
    let el = this.el
    while(el) {
      if (el.nodeType === window.Node.DOCUMENT_NODE) {
        return true
      }
      el = el.parentNode
    }
  }

  _replaceNativeEl(newEl) {
    console.assert(newEl instanceof window.Node, "Expecting a native element.")
    let oldEl = this.el
    let parentNode = oldEl.parentNode
    if (parentNode) {
      parentNode.replaceChild(newEl, oldEl)
    }
    this.el = newEl
    // HACK: we need the correct backlink
    this.el._wrapper = this
  }

  _getChildNodeCount() {
    return this.el.childNodes.length
  }

  focus() {
    this.el.focus()
    return this
  }

  blur() {
    this.el.focus()
    return this
  }

  click() {
    this.el.click()
    return this
  }

  getWidth() {
    let rect = this.el.getClientRects()[0]
    if (rect) {
      return rect.width
    } else {
      return 0
    }
  }

  getHeight() {
    let rect = this.el.getClientRects()[0]
    if (rect) {
      return rect.height
    } else {
      return 0
    }
  }

  getOffset() {
    let rect = this.el.getBoundingClientRect()
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  }

  getPosition() {
    return {left: this.el.offsetLeft, top: this.el.offsetTop}
  }

  getOuterHeight(withMargin) {
    let outerHeight = this.el.offsetHeight
    if (withMargin) {
      let style = this.getComputedStyle()
      outerHeight += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
    }
    return outerHeight
  }

}

DOMElement._defineProperties(BrowserDOMElement, DOMElement._propertyNames)

BrowserDOMElement.createTextNode = function(text) {
  return BrowserDOMElement.wrapNativeElement(
    window.document.createTextNode(text)
  )
}

BrowserDOMElement.createElement = function(tagName) {
  return BrowserDOMElement.wrapNativeElement(
    window.document.createElement(tagName)
  )
}

BrowserDOMElement.parseMarkup = function(str, format, isFullDoc) {
  let nativeEls = []
  let doc
  if (!str) {
    // Create an empty XML document
    if (format === 'xml') {
      doc = (new window.DOMParser()).parseFromString('<dummy/>', 'text/xml')
    } else {
      doc = (new window.DOMParser()).parseFromString('<html></html>', 'text/html')
    }
    return new BrowserDOMElement(doc)
  } else {
    let parser = new window.DOMParser()
    if (format === 'html') {
      isFullDoc = (str.search(/<\s*html/i)>=0)
      doc = parser.parseFromString(str, 'text/html')
    } else if (format === 'xml') {
      doc = parser.parseFromString(str, 'text/xml')
    }
    if (doc) {
      let parserError = doc.querySelector('parsererror')
      if (parserError) {
        throw new Error("ParserError: could not parse " + str)
      }
      if (format === 'html') {
        if (isFullDoc) {
          nativeEls = [doc.querySelector('html')]
        } else {
          // if the provided html is just a partial
          // then DOMParser still creates a full document
          // thus we pick the body and provide its content
          let body = doc.querySelector('body')
          nativeEls = body.childNodes
        }
      } else if (format === 'xml') {
        if (isFullDoc) {
          nativeEls = [doc]
        } else {
          nativeEls = doc.childNodes
        }
      }
    } else {
      throw new Error('Could not parse DOM string.')
    }
  }
  let elements = Array.prototype.map.call(nativeEls, function(el) {
    return new BrowserDOMElement(el)
  })
  if (elements.length === 1) {
    return elements[0]
  } else {
    return elements
  }
}

class TextNode extends DOMElement.TextNode {
  constructor(nativeEl) {
    super()
    console.assert(nativeEl instanceof window.Node && nativeEl.nodeType === 3, "Expecting native TextNode.")
    this.el = nativeEl
    nativeEl._wrapper = this

    let methods = [
      'getParent', 'getNextSibling', 'getPreviousSibling',
      'getTextContent', 'setTextContent',
      'getInnerHTML', 'setInnerHTML', 'getOuterHTML',
      'getNativeElement', 'clone'
    ]

    methods.forEach(function(name) {
      this[name] = BrowserDOMElement.prototype[name]
    }.bind(this))
  }
  
  get _isBrowserDOMElement() {
    return true 
  }
}

DOMElement._defineProperties(TextNode, ['nodeType', 'textContent', 'innerHTML', 'outerHTML', 'parentNode'])

BrowserDOMElement.TextNode = TextNode

BrowserDOMElement.wrapNativeElement = function(el) {
  if (el) {
    if (el._wrapper) {
      return el._wrapper
    } else if (el instanceof window.Node) {
      if (el.nodeType === 3) {
        return new TextNode(el)
      } else {
        return new BrowserDOMElement(el)
      }
    } else if (el === window) {
      return BrowserDOMElement.getBrowserWindow()
    }
  } else {
    return null
  }
}

/*
  Wrapper for the window element only exposing the eventlistener API.
*/
class BrowserWindow {
  constructor() {
    this.el = window
    window.__BrowserDOMElementWrapper__ = this
    this.eventListeners = []
    this.getEventListeners = BrowserDOMElement.prototype.getEventListeners
  }

  on() {
    return BrowserDOMElement.prototype.on.apply(this, arguments)
  }

  off() {
    return BrowserDOMElement.prototype.off.apply(this, arguments)
  }

  addEventListener() {
    return BrowserDOMElement.prototype.addEventListener.apply(this, arguments)
  }

  removeEventListener() {
    return BrowserDOMElement.prototype.removeEventListener.apply(this, arguments)
  }
}

oo.initClass(BrowserWindow)

BrowserDOMElement.getBrowserWindow = function() {
  if (window.__BrowserDOMElementWrapper__) return window.__BrowserDOMElementWrapper__
  return new BrowserWindow(window)
}

let _r1
let _r2

BrowserDOMElement.isReverse = function(anchorNode, anchorOffset, focusNode, focusOffset) {
  // the selection is reversed when the focus propertyEl is before
  // the anchor el or the computed charPos is in reverse order
  if (focusNode && anchorNode) {
    if (!_r1) {
      _r1 = window.document.createRange()
      _r2 = window.document.createRange()
    }
    _r1.setStart(anchorNode.getNativeElement(), anchorOffset)
    _r2.setStart(focusNode.getNativeElement(), focusOffset)
    let cmp = _r1.compareBoundaryPoints(window.Range.START_TO_START, _r2)
    if (cmp === 1) {
      return true
    }
  }
  return false
}

BrowserDOMElement.getWindowSelection = function() {
  let nativeSel = window.getSelection()
  let result = {
    anchorNode: BrowserDOMElement.wrapNativeElement(nativeSel.anchorNode),
    anchorOffset: nativeSel.anchorOffset,
    focusNode: BrowserDOMElement.wrapNativeElement(nativeSel.focusNode),
    focusOffset: nativeSel.focusOffset
  }
  return result
}

function matches(el, selector) {
  let elProto = window.Element.prototype
  let _matches = (
    elProto.matches || elProto.matchesSelector ||
    elProto.msMatchesSelector || elProto.webkitMatchesSelector
  )
  return _matches.call(el, selector)
}

var $ = {}

class CheerioDOMElement extends DOMElement {
  constructor(el) {
    super()
    EventEmitter.call(this)

    this.el = el
    this.$el = $(el)
    el._wrapper = this
    this.htmlProps = {}
  }

  get _isCheerioDOMElement() {
    return true 
  }

  getNativeElement() {
    return this.el
  }

  _wrapNativeElement(el) {
    if (el._wrapper) {
      return el._wrapper
    } else {
      return new CheerioDOMElement(el)
    }
  }

  hasClass(className) {
    return this.$el.hasClass(className)
  }

  addClass(className) {
    this.$el.addClass(className)
    return this
  }

  removeClass(className) {
    this.$el.removeClass(className)
    return this
  }

  getClasses() {
    return this.$el.attr('class')
  }

  setClasses(classString) {
    this.$el.attr('class', classString)
    return this
  }

  getAttribute(name) {
    return this.$el.attr(name)
  }

  setAttribute(name, value) {
    this.$el.attr(name, value)
    return this
  }

  removeAttribute(name) {
    this.$el.removeAttr(name)
    return this
  }

  getAttributes() {
    let attributes = clone$1(this.el.attribs)
    return attributes
  }

  getProperty(name) {
    return this.$el.prop(name)
  }

  setProperty(name, value) {
    this.htmlProps[name] = value
    this.$el.prop(name, value)
    return this
  }

  // TODO: verify that this.el[name] is correct
  removeProperty(name) {
    delete this.htmlProps[name]
    delete this.el[name]
    return this
  }

  getTagName() {
    if (this.el.type !== 'tag') {
      return ""
    } else {
      return this.el.name.toLowerCase()
    }
  }

  setTagName(tagName) {
    let newEl = $._createElement(tagName, this.el.root)
    let $newEl = $(newEl)
    $newEl.html(this.$el.html())
    newEl.attribs = extend$1({}, this.el.attribs)
    this._replaceNativeEl(newEl)
    return this
  }

  getId() {
    return this.$el.attr('id')
  }

  setId(id) {
    this.$el.attr('id', id)
    return this
  }

  getTextContent() {
    return this.$el.text()
  }

  setTextContent(text) {
    this.$el.text(text)
    return this
  }

  getInnerHTML() {
    return this.$el.html()
  }

  setInnerHTML(html) {
    this.$el.html(html)
    return this
  }

  getOuterHTML() {
    // TODO: this is not really jquery
    return $._serialize(this.el)
  }

  getValue() {
    return this.$el.val()
  }

  setValue(value) {
    this.$el.val(value)
    return this
  }

  getStyle(name) {
    return this.$el.css(name)
  }

  setStyle(name, value) {
    this.$el.css(name, value)
    return this
  }

  addEventListener() {
    return this
  }

  removeEventListener() {
    return this
  }

  removeAllEventListeners() {
    return this
  }

  getEventListeners() {
    return []
  }

  getChildCount() {
    return this.el.children.length
  }

  getChildNodes() {
    let childNodes = this.el.children
    childNodes = childNodes.map(function(node) {
      return this._wrapNativeElement(node)
    }.bind(this))
    return childNodes
  }

  getChildren() {
    let children = this.el.children
    children = children.filter(function(node) {
      return node.type === "tag"
    })
    children = children.map(function(node) {
      return this._wrapNativeElement(node)
    }.bind(this))
    return children
  }

  getChildAt(pos) {
    return this._wrapNativeElement(this.el.children[pos])
  }

  getChildIndex(child) {
    if (!child._isCheerioDOMElement) {
      throw new Error('Expecting a CheerioDOMElement instance.')
    }
    return this.el.children.indexOf(child.el)
  }

  getFirstChild() {
    let firstChild = this.el.children[0]
    if (firstChild) {
      return CheerioDOMElement.wrapNativeElement(firstChild)
    } else {
      return null
    }
  }

  getLastChild() {
    let lastChild = last$1(this.el.children)
    if (lastChild) {
      return CheerioDOMElement.wrapNativeElement(lastChild)
    } else {
      return null
    }
  }

  getNextSibling() {
    var next = this.el.next;
    if (next) {
      return CheerioDOMElement.wrapNativeElement(next)
    } else {
      return null
    }
  }

  getPreviousSibling() {
    let previous = this.el.previous
    if (previous) {
      return CheerioDOMElement.wrapNativeElement(previous)
    } else {
      return null
    }
  }

  isTextNode() {
    // cheerio specific
    return this.el.type === "text"
  }

  isElementNode() {
    // cheerio specific
    return this.el.type === "tag"
  }

  isCommentNode() {
    // cheerio specific
    return this.el.type === "comment"
  }

  isDocumentNode() {
    return this.el === this.el.root
  }

  clone() {
    let clone = this.$el.clone()[0]
    return this._wrapNativeElement(clone)
  }

  createElement(tagName) {
    let el = $._createElement(tagName, this.el.root)
    return this._wrapNativeElement(el)
  }

  createTextNode(text) {
    let el = $._createTextNode(text)
    return this._wrapNativeElement(el)
  }

  is(cssSelector) {
    // Note: unfortunately there is no cross-browser supported selectr matcher
    // Element.matches is not supported by all (mobile) browsers
    return this.$el.is(cssSelector)
  }

  getParent() {
    let parent = this.el.parent
    if (parent) {
      return this._wrapNativeElement(parent)
    } else {
      return null
    }
  }

  getRoot() {
    let el = this.el
    let parent = el
    while (parent) {
      el = parent
      parent = el.parent
    }
    return this._wrapNativeElement(el)
  }

  find(cssSelector) {
    let result = this.$el.find(cssSelector)
    if (result.length > 0) {
      return this._wrapNativeElement(result[0])
    } else {
      return null
    }
  }

  findAll(cssSelector) {
    let result = this.$el.find(cssSelector)
    if (result.length > 0) {
      return map$1(result, function(el) {
        return this._wrapNativeElement(el)
      }.bind(this))
    } else {
      return []
    }
  }

  _normalizeChild(child) {
    if (isString$1(child)) {
      child = this.createTextNode(child)
    }
    if (child._wrapper) {
      child = child._wrapper
    }
    if (!child || !child._isCheerioDOMElement) {
      throw new Error('Illegal argument: only String and CheerioDOMElement instances are valid.')
    }
    console.assert(child.el._wrapper === child, "Expecting a backlink between native element and CheerioDOMElement")
    return child.getNativeElement()
  }

  appendChild(child) {
    child = this._normalizeChild(child)
    this.el.children.push(child)
    child.parent = this.el
    return this
  }

  insertAt(pos, child) {
    child = this._normalizeChild(child)
    let children = this.el.children
    // NOTE: manipulating cheerio's internal children array
    // as otherwise cheerio clones the element loosing our custom data
    if (pos >= children.length) {
      children.push(child)
    } else {
      children.splice(pos, 0, child)
    }
    child.parent = this.el
    return this
  }

  insertBefore(child, before) {
    let pos = this.el.children.indexOf(before.el)
    if (pos > -1) {
      return this.insertAt(pos, child)
    } else {
      throw new Error('insertBefore(): reference node is not a child of this element.')
    }
  }

  removeAt(pos) {
    if (pos < 0 || pos >= this.el.children.length) {
      throw new Error('removeAt(): Index out of bounds.')
    }
    // NOTE: again manipulating cheerio's internal children array --
    // it works.
    let child = this.el.children[pos]
    child.parent = null
    this.el.children.splice(pos, 1)
    return this
  }

  removeChild(child) {
    if (!child || !child._isCheerioDOMElement) {
      throw new Error('removeChild(): Illegal arguments. Expecting a CheerioDOMElement instance.')
    }
    let idx = this.el.children.indexOf(child.el)
    if (idx < 0) {
      throw new Error('removeChild(): element is not a child.')
    }
    this.removeAt(idx)
    return this
  }

  replaceChild(oldChild, newChild) {
    if (!newChild || !oldChild ||
        !newChild._isCheerioDOMElement || !oldChild._isCheerioDOMElement) {
      throw new Error('replaceChild(): Illegal arguments. Expecting BrowserDOMElement instances.')
    }
    let idx = this.el.children.indexOf(oldChild.el)
    if (idx > -1) {
      this.removeAt(idx)
      this.insertAt(idx, newChild.el)
    }
    return this
  }

  empty() {
    this.$el.empty()
    return this
  }

  remove() {
    this.$el.remove()
    return this
  }

  _replaceNativeEl(newEl) {
    let $newEl = $(newEl)
    this.$el.replaceWith($newEl)
    this.el = newEl
    this.$el = $newEl
    // HACK: we need the correct backlink
    this.el._wrapper = this
  }

  isInDocument() {
    let el = this.el
    while (el) {
      if (el === el.root) {
        return true
      }
      el = el.parent
    }
    return false
  }

  click() {
    this.emit('click')
  }

}

extend$1(CheerioDOMElement.prototype, EventEmitter.prototype)

DOMElement._defineProperties(CheerioDOMElement, DOMElement._propertyNames);

CheerioDOMElement.createTextNode = function(text) {
  return CheerioDOMElement.wrapNativeElement(
    $._createTextNode(text)
  )
}

CheerioDOMElement.createElement = function(tagName) {
  return CheerioDOMElement.wrapNativeElement(
    $('<' + tagName + '>')[0]
  )
}

CheerioDOMElement.parseMarkup = function(str, format) {
  let nativeEls = []
  let doc;

  if (!str) {
    // Create an empty XML document
    if (format === 'xml') {
      doc = $.parseXML('')
    } else {
      doc = $.parseHTML('')
    }
    return new CheerioDOMElement(doc)
  } else {
    nativeEls = $.parseXML(str)
  }
  let elements = nativeEls.map(function(el) {
    return new CheerioDOMElement(el)
  });
  if (elements.length === 1) {
    return elements[0]
  } else {
    return elements
  }
}

CheerioDOMElement.wrapNativeElement = function(el) {
  if (el._wrapper) {
    return el._wrapper
  } else {
    return new CheerioDOMElement(el)
  }
}

let DOMElementImpl

if (inBrowser) {
  DOMElementImpl = BrowserDOMElement
} else {
  DOMElementImpl = CheerioDOMElement
}

let DefaultDOMElement = {}

DefaultDOMElement.createTextNode = function(text) {
  return DOMElementImpl.createTextNode(text)
}

DefaultDOMElement.createElement = function(tagName) {
  return DOMElementImpl.createElement(tagName)
}

DefaultDOMElement._create = function(el) {
  return new DOMElementImpl(el)
}

/*
  A wrapper for Browser's `window` providing
  the DOMElement's eventlistener API.
*/
DefaultDOMElement.getBrowserWindow = function() {
  if (inBrowser) {
    return DOMElementImpl.getBrowserWindow()
  } else {
    // just a stub if not in browser
    return DefaultDOMElement.createElement('div')
  }
}

/*
  @param {String} html
  @returns {DOMElement|DOMElement[]}
*/
DefaultDOMElement.parseHTML = function(html) {
  return DOMElementImpl.parseMarkup(html, 'html')
}

/*
  @param {String} xml
  @returns {DOMElement|DOMElement[]}
*/
DefaultDOMElement.parseXML = function(xml, fullDoc) {
  return DOMElementImpl.parseMarkup(xml, 'xml', fullDoc)
}

DefaultDOMElement.wrapNativeElement = function(el) {
  if (el) {
    if (inBrowser && (el instanceof window.Node || el === window) ) {
      return BrowserDOMElement.wrapNativeElement(el)
    } else if (el.root && el.root.type === "root" ) {
      return CheerioDOMElement.wrapNativeElement(el)
    }
  } else {
    return null
  }
}

DefaultDOMElement.isReverse = function(anchorNode, anchorOffset, focusNode, focusOffset) {
  if (inBrowser ) {
    return BrowserDOMElement.isReverse(anchorNode, anchorOffset, focusNode, focusOffset)
  } else {
    throw new Error('Not implemented.')
  }
}

/**
  @class
  @abstract

  Base class for custom HTML exporters. If you want to use XML as your
  exchange format see {@link model/XMLExporter}.

*/

function HTMLExporter(config) {
  config = extend$1({ idAttribute: 'data-id' }, config);
  DOMExporter.call(this, config);

  // used internally for creating elements
  this._el = DefaultDOMElement.parseHTML('<html></html>');
}

HTMLExporter.Prototype = function() {

  this.exportDocument = function(doc) {
    var htmlEl = DefaultDOMElement.parseHTML('<html><head></head><body></body></html>');
    return this.convertDocument(doc, htmlEl);
  };

  var defaultAnnotationConverter = {
    tagName: 'span',
    export: function(node, el) {
      el.tagName = 'span';
      el.attr('data-type', node.type);
      var properties = node.toJSON();
      each$1(properties, function(value, name) {
        if (name === 'id' || name === 'type') return;
        if (isString$1(value) || isNumber$1(value) || isBoolean$1(value)) {
          el.attr('data-'+name, value);
        }
      });
    }
  };

  var defaultBlockConverter = {
    export: function(node, el, converter) {
      el.attr('data-type', node.type);
      var properties = node.toJSON();
      each$1(properties, function(value, name) {
        if (name === 'id' || name === 'type') {
          return;
        }
        var prop = converter.$$('div').attr('property', name);
        if (node.getPropertyType(name) === 'string' && value) {
          prop.append(converter.annotatedText([node.id, name]));
        } else {
          prop.text(value);
        }
        el.append(prop);
      });
    }
  };

  this.getDefaultBlockConverter = function() {
    return defaultBlockConverter;
  };

  this.getDefaultPropertyAnnotationConverter = function() {
    return defaultAnnotationConverter;
  };

};

DOMExporter.extend(HTMLExporter);

/**
  @class
  @abstract

  Base class for custom HTML importers. If you want to use XML as your
  exchange format see {@link model/XMLImporter}.
*/

function HTMLImporter(config) {
  config = extend$1({ idAttribute: 'data-id' }, config);
  DOMImporter.call(this, config);

  // only used internally for creating wrapper elements
  this._el = DefaultDOMElement.parseHTML('<html></html>');
}

HTMLImporter.Prototype = function() {

  this.importDocument = function(html) {
    this.reset();
    var parsed = DefaultDOMElement.parseHTML(html);
    // creating all nodes
    this.convertDocument(parsed);
    this.generateDocument();
    return this.state.doc;
  };

  /**
    Orchestrates conversion of a whole document.

    This method should be overridden by custom importers to reflect the
    structure of a custom HTML document or fragment, and to control where
    things go to within the document.

    @abstract
    @param {ui/DOMElement} documentEl the document element.

    @example

    When a fragment `<h1>Foo</h1><p></Bar</p>` is imported the implementation
    looks like this.

    ```js
      this.convertDocument = function(els) {
        this.convertContainer(els, 'body');
      };
    ```

    If a full document `<html><body><p>A</p><p>B</p></body></html>` is imported
    you get the `<html>` element instead of a node array.

    ```js
      this.convertDocument = function(htmlEl) {
        var bodyEl = htmlEl.find('body');
        this.convertContainer(bodyEl.children, 'body');
      };
    ```
  */
  this.convertDocument = function(documentEl) { // eslint-disable-line
    throw new Error('This method is abstract');
  };

};

DOMImporter.extend(HTMLImporter);

function InlineNode() {
  InlineNode.super.apply(this, arguments);
}

PropertyAnnotation.extend(InlineNode);

InlineNode.isInline = true;

/**
  A base class for all text-ish nodes, such as Paragraphs, Headings,
  Prerendered, etc.

  @class
  @abstract
*/

function TextNode$2() {
  TextNode$2.super.apply(this, arguments);
}

TextNode$2.Prototype = function() {

  this.getTextPath = function() {
    return [this.id, 'content'];
  };

  this.getText = function() {
    return this.content;
  };

  this.isEmpty = function() {
    return !this.content;
  };

};

DocumentNode.extend(TextNode$2);

TextNode$2.isText = true;

TextNode$2.define({
  type: "text",
  content: 'text'
});

function TextBlock() {
  TextNode$2.apply(this, arguments);
}

TextNode$2.extend(TextBlock);

TextBlock.isBlock = true;

/**
  @class
  @abstract

  Base class for custom XML exporters. If you want to use HTML as your
  exchange format see {@link model/HTMLExporter}.
*/

function XMLExporter(config) {
  config = extend$1({ idAttribute: 'id' }, config);
  DOMExporter.call(this, config);

  // used internally for creating elements
  this._el = DefaultDOMElement.parseXML('<dummy></dummy>');
}

XMLExporter.Prototype = function() {

  var defaultAnnotationConverter = {
    tagName: 'annotation',
    export: function(node, el) {
      el.attr('type', node.type);
      var properties = node.toJSON();
      each$1(properties, function(value, name) {
        if (name === 'id' || name === 'type') return;
        if (isString$1(value) || isNumber$1(value) || isBoolean$1(value)) {
          el.attr(name, value);
        }
      });
    }
  };

  var defaultBlockConverter = {
    tagName: 'block',
    export: function(node, el, converter) {
      el.attr('type', node.type);
      var properties = node.toJSON();
      each$1(properties, function(value, name) {
        if (name === 'id' || name === 'type') {
          return;
        }
        var prop = converter.$$(name);
        if (node.getPropertyType(name) === 'string') {
          prop.append(converter.annotatedText([node.id, name]));
        } else {
          prop.text(value);
        }
        el.append(prop);
      });
    }
  };

  this.getDefaultBlockConverter = function() {
    return defaultBlockConverter;
  };

  this.getDefaultPropertyAnnotationConverter = function() {
    return defaultAnnotationConverter;
  };

};

DOMExporter.extend(XMLExporter);

/**
  @class
  @abstract

  Base class for custom XML importers. If you want to use HTML as your
  exchange format see {@link model/HTMLImporter}.

  @example

  Below is a full example taken from [Lens](https://github.com/substance/lens/blob/master/model/LensArticleImporter.js).

  ```js
  import XMLImporter from 'substance/model/XMLImporter'
  import articleSchema from './articleSchema'
  import LensArticle from './LensArticle'

  var converters = [
    require('substance/packages/paragraph/ParagraphHTMLConverter'),
    require('substance/packages/blockquote/BlockquoteHTMLConverter'),
    require('substance/packages/codeblock/CodeblockHTMLConverter'),
    require('substance/packages/heading/HeadingHTMLConverter'),
    require('substance/packages/image/ImageXMLConverter'),
    require('substance/packages/strong/StrongHTMLConverter'),
    require('substance/packages/emphasis/EmphasisHTMLConverter'),
    require('substance/packages/link/LinkHTMLConverter'),

    // Lens-specific converters
    require('../packages/metadata/MetadataXMLConverter'),
    require('../packages/bibliography/BibItemXMLConverter'),
    require('../packages/figures/ImageFigureXMLConverter'),

    require('../packages/figures/ImageFigureCitationXMLConverter'),
    require('../packages/bibliography/BibItemCitationXMLConverter'),
  ];

  function LensArticleImporter() {
    XMLImporter.call(this, {
      schema: articleSchema,
      converters: converters,
      DocumentClass: LensArticle
    });
  }

  LensArticleImporter.Prototype = function() {

    // XML import
    // <article>
    //   <meta>...</meta>
    //   <resources>...</resources>
    //   <body>...</body>
    // </article>
    this.convertDocument = function(articleElement) {
      // Import meta node
      var metaElement = articleElement.find('meta');
      this.convertElement(metaElement);

      // Import resources
      var resources = articleElement.find('resources');
      resources.children.forEach(function(resource) {
        this.convertElement(resource);
      }.bind(this));

      // Import main container
      var bodyNodes = articleElement.find('body').children;
      this.convertContainer(bodyNodes, 'main');
    };
  };

  // Expose converters so we can reuse them in NoteHtmlExporter
  LensArticleImporter.converters = converters;

  XMLImporter.extend(LensArticleImporter);
  ```
*/

function XMLImporter(config) {
  config = extend$1({ idAttribute: 'id' }, config);
  DOMImporter.call(this, config);

  // only used internally for creating wrapper elements
  this._el = DefaultDOMElement.parseXML('<dummy></dummy>');
}

XMLImporter.Prototype = function() {

  this.importDocument = function(xml) {
    // initialization
    this.reset();
    // converting to JSON first
    var articleElement = DefaultDOMElement.parseXML(xml);
    this.convertDocument(articleElement);
    var doc = this.generateDocument();
    return doc;
  };

};

DOMImporter.extend(XMLImporter);

// import each from 'lodash/each'

/*
 * Delete a node and all annotations attached to it,
 * and removes the node from all containers.
 *
 * @param args object with fields: `nodeId`.
 */
function deleteNode(tx, args) {
  let nodeId = args.nodeId
  if (!nodeId) {
    throw new Error('Parameter `nodeId` is mandatory.')
  }
  let node = tx.get(nodeId)
  if (!node) {
    throw new Error("Invalid 'nodeId'. Node does not exist.")
  }
  // optional: containerId - will hide the node before removing it
  let containerId = args.containerId
  let container

  // remove all associated annotations
  let annos = tx.getIndex('annotations').get(nodeId)
  let i
  for (i = 0; i < annos.length; i++) {
    tx.delete(annos[i].id);
  }
  // transfer anchors of ContainerAnnotations to previous or next node:
  //  - start anchors go to the next node
  //  - end anchors go to the previous node
  let anchors = tx.getIndex('container-annotation-anchors').get(nodeId)
  for (i = 0; i < anchors.length; i++) {
    let anchor = anchors[i]
    container = tx.get(anchor.containerId)
    // Note: during the course of this loop we might have deleted the node already
    // so, don't do it again
    if (!tx.get(anchor.id)) continue
    let pos = container.getPosition(anchor.path[0])
    let path, offset
    if (anchor.isStart) {
      if (pos < container.getLength()-1) {
        let nextNode = container.getChildAt(pos+1)
        if (nextNode.isText()) {
          path = [nextNode.id, 'content']
        } else {
          path = [nextNode.id]
        }
        tx.set([anchor.id, 'startPath'], path)
        tx.set([anchor.id, 'startOffset'], 0)
      } else {
        tx.delete(anchor.id)
      }
    } else {
      if (pos > 0) {
        let previousNode = container.getChildAt(pos-1)
        if (previousNode.isText()) {
          path = [previousNode.id, 'content']
          offset = tx.get(path).length
        } else {
          path = [previousNode.id]
          offset = 1
        }
        tx.set([anchor.id, 'endPath'], path)
        tx.set([anchor.id, 'endOffset'], offset)
      } else {
        tx.delete(anchor.id)
      }
    }
  }
  if (containerId) {
    // hide the node from the one container if provided
    container = tx.get(containerId)
    container.hide(nodeId)
  }
  // hiding automatically is causing troubles with nested containers
  //  else {
  //   // or hide it from all containers
  //   each(tx.getIndex('type').get('container'), function(container) {
  //     container.hide(nodeId);
  //   });
  // }

  // delete nested nodes
  if (node.hasChildren()) {
    node.getChildren().forEach(function(child) {
      deleteNode(tx, { nodeId: child.id })
    })
  }
  // finally delete the node itself
  tx.delete(nodeId)
  return args
}

let merge = function(tx, args) {
  let containerId = args.containerId
  let path = args.path
  let direction = args.direction
  if (!containerId || !path || !direction) {
    throw new Error('Insufficient arguments! mandatory fields: `containerId`, `path`, `direction`')
  }
  let container = tx.get(containerId)
  let nodeId = path[0]
  let node = tx.get(nodeId)
  let nodePos = container.getPosition(nodeId)
  let l = container.getLength()
  let tmp
  if (direction === 'right' && nodePos < l-1) {
    let nextNodeId = container.nodes[nodePos+1]
    let nextNode = tx.get(nextNodeId)
    if (node.isText() && node.getText().length === 0) {
      deleteNode(tx, {
        nodeId: nodeId,
        containerId: containerId
      })
      if (nextNode.isText()) {
        args.selection = tx.createSelection(nextNodeId, 0)
      } else {
        args.selection = tx.createSelection({
          type: 'node',
          nodeId: nextNodeId,
          containerId: containerId,
          mode: 'full'
        })
      }
    } else {
      tmp = _mergeNodes(tx, extend$1({}, args, {
        containerId: containerId,
        firstNodeId: nodeId,
        secondNodeId: nextNodeId
      }))
      args.selection = tmp.selection
    }
  } else if (direction === 'left' && nodePos > 0) {
    let previousNodeId = container.nodes[nodePos-1]
    let previousNode = tx.get(previousNodeId)
    if (node.isText() && node.getText().length === 0) {
      deleteNode(tx, {
        nodeId: nodeId,
        containerId: containerId
      })
      if (previousNode.isText()) {
        args.selection = tx.createSelection(previousNode.getTextPath(), previousNode.getText().length)
      } else {
        args.selection = tx.createSelection({
          type: 'node',
          nodeId: previousNodeId,
          containerId: containerId,
          mode: 'full'
        })
      }
    } else {
      tmp = _mergeNodes(tx, extend$1({}, args, {
        containerId: containerId,
        firstNodeId: previousNodeId,
        secondNodeId: nodeId
      }))
      args.selection = tmp.selection
    }
  }
  return args
}

function _mergeNodes(tx, args) {
  let firstNodeId = args.firstNodeId
  let secondNodeId = args.secondNodeId
  let firstNode = tx.get(firstNodeId)
  let secondNode = tx.get(secondNodeId)
  // most often a merge happens between two different nodes (e.g., 2 paragraphs)
  let mergeTrafo = _getNodeMerger(args.editingBehavior, firstNode, secondNode)
  if (mergeTrafo) {
    return mergeTrafo(tx, extend$1({}, args, {
      containerId: args.containerId,
      first: firstNode,
      second: secondNode
    }))
  }
  return args
}

function _getNodeMerger(behavior, node, otherNode) {
  if (behavior) {
    if (behavior.canMerge(node.type, otherNode.type)) {
      return behavior.getMerger(node.type, otherNode.type)
    }
    // Behaviors with text nodes involved
    //
    // 1. first textish, second custom
    // Example:
    //  <p>abc<p>
    //  <ul>
    //    <li>def</li>
    //    <li>ghi</li>
    //  </ul>
    //
    // could be transformed into
    //
    //  <p>abcdef<p>
    //  <ul>
    //    <li>ghi</li>
    //  </ul>
    else if (node.isInstanceOf('text') &&
      behavior.canMerge('textish', otherNode.type)) {
      return behavior.getMerger('textish', otherNode.type)
    }
    // 2. first custom, second textish
    // Example:
    //  <figure>
    //     ...
    //     <figcaption>abc</figcaption>
    //  </figure>
    //  <p>def</p>
    //
    //  could be transformed into
    //
    //  <figure>
    //     ...
    //     <figcaption>abcdef</figcaption>
    //  </figure>
    //
    else if (otherNode.isInstanceOf('text') &&
      behavior.canMerge(node.type, 'textish')) {
      return behavior.getMerger(node.type, 'textish')
    }
  }
  // Built-in behavior for textish nodes
  if (node.isInstanceOf('text') && otherNode.isInstanceOf('text')) {
    return _mergeTextNodes
  }
  console.info("No merge behavior defined for %s <- %s", node.type, otherNode.type)
  return null
}

function _mergeTextNodes(tx, args) {
  let containerId = args.containerId
  let first = args.first
  let second = args.second
  let container = tx.get(containerId)
  let firstPath = first.getTextPath()
  let firstText = first.getText()
  let firstLength = firstText.length
  let secondPath = second.getTextPath()
  let secondText = second.getText()
  let selection
  if (firstLength === 0) {
    // hide the second node
    container.hide(firstPath[0])
    // delete the second node
    tx.delete(firstPath[0])
    // set the selection to the end of the first component
    selection = tx.createSelection({
      type: 'property',
      path: secondPath,
      startOffset: 0
    })
  } else {
    // append the second text
    tx.update(firstPath, { insert: { offset: firstLength, value: secondText } })
    // transfer annotations
    annotationHelpers.transferAnnotations(tx, secondPath, 0, firstPath, firstLength)
    // hide the second node
    container.hide(secondPath[0])
    // delete the second node
    tx.delete(secondPath[0])
    // set the selection to the end of the first component
    selection = tx.createSelection({
      type: 'property',
      path: firstPath,
      startOffset: firstLength
    })
  }
  args.selection = selection
  return args
}

function updateAnnotations(tx, args) {
  let op = args.op
  if (op.isUpdate()) {
    let diff = op.diff
    if (diff.isInsert()) {
      return _upateAfterInsert(tx, args)
    } else if (diff.isDelete()) {
      return _updateAfterDelete(tx, args)
    }
  } else {
    throw new Error('Only text updates are supported.')
  }
  return args
}

function _upateAfterInsert(tx, args) {
  let op = args.op
  let diff = op.diff
  annotationHelpers.insertedText(tx, new Coordinate(op.path, diff.pos), diff.getLength(), args.ignoredAnnotations)
  return args
}

function _updateAfterDelete(tx, args) {
  let op = args.op
  let diff = op.diff
  annotationHelpers.deletedText(tx, op.path, diff.pos, diff.pos + diff.getLength(), args.replaceTextSupport)
  return args
}

/**
  Deletes a given selection.

  @param {Object} args object with `selection`
  @return {Object} with updated `selection`

  @example

  ```js
  deleteSelection(tx, {
    selection: bodyEditor.getSelection(),
  });
  ```
*/

function deleteSelection(tx, args) {
  let selection = args.selection
  if (selection.isCollapsed()) {
    // nothing
  } else if (selection.isPropertySelection()) {
    args = _deletePropertySelection(tx, args)
  } else if (selection.isContainerSelection()) {
    args = _deleteContainerSelection(tx, args)
  } else if (selection.isNodeSelection()) {
    args = _deleteNodeSelection(tx, args)
  }
  return args
}

function _deletePropertySelection(tx, args) {
  let sel = args.selection
  let path = sel.path
  let startOffset = sel.startOffset
  let endOffset = sel.endOffset
  let op = tx.update(path, { delete: { start: startOffset, end: endOffset } })
  updateAnnotations(tx, {op: op})
  args.selection = tx.createSelection(path, startOffset)
  return args
}

function _deleteContainerSelection(tx, args) {
  let sel = args.selection
  let containerId = sel.containerId
  let container = tx.get(containerId)

  let startPos = container.getPosition(sel.start.path[0])
  // var endPos = container.getPosition(sel.end.path[0]);
  let fragments = sel.getFragments()
  if (fragments.length === 0) {
    return args
  }

  let remainingCoor = null
  let node, type

  for (let i = 0; i < fragments.length; i++) {
    let fragment = fragments[i]

    if (fragment.isPropertyFragment()) {
      if (fragment.isPartial()) {
        if (!remainingCoor) {
          remainingCoor = {
            path: fragment.path,
            offset: fragment.startOffset
          }
        }
        _deletePropertySelection(tx, {
          selection: fragment
        })
      } else {
        let nodeId = fragment.path[0]
        deleteNode(tx, extend$1({}, args, {
          nodeId: nodeId,
          containerId: container.id
        }))
      }
    } else if (fragment.isNodeFragment()) {
      deleteNode(tx, extend$1({}, args, {
        nodeId: fragment.nodeId,
        containerId: container.id
      }))
    }
  }

  // update the selection; take the first component which is not fully deleted
  if (remainingCoor) {
    args.selection = tx.createSelection(remainingCoor.path, remainingCoor.offset)
  } else {
    // if all nodes have been deleted insert a text node
    // TODO: in some cases this is not the desired behavior.
    // it is ok in cases such as:
    //  - when inserting text
    //  - pressing delete or backspace
    // this should not be done when
    //  - pasting a container (as opposed to property)
    //  - inserting a node
    // i.e. only before property operations
    type = tx.getSchema().getDefaultTextType()
    node = {
      type: type,
      id: uuid$1(type),
      content: ""
    }
    tx.create(node)
    container.show(node.id, startPos)
    args.selection = tx.createSelection([node.id, 'content'], 0)
  }

  // try to merge the first and last remaining nodes
  // NOTE: ATM only merges text nodes
  if (fragments.length > 1 &&
      fragments[0].isPartial() &&
      last$1(fragments).isPartial()) {
    merge(tx, extend$1({}, args, {
      selection: args.selection,
      containerId: containerId,
      path: sel.endPath,
      direction: 'left'
    }))
  }

  // If the container is empty insert an empty text node
  if (container.nodes.length === 0) {
    type = tx.getSchema().getDefaultTextType();
    node = {
      type: type,
      id: uuid$1(type),
      content: ""
    }
    tx.create(node)
    container.show(node.id, 0)
    args.selection = tx.createSelection([node.id, 'content'], 0)
  }

  return args
}

function _deleteNodeSelection(tx, args) {
  let sel = args.selection
  if (!sel || !sel.isNodeSelection()) {
    throw new Error("'sel' must be a NodeSelection")
  }
  if (!sel.isFull()) {
    return args
  }
  let nodeId = sel.getNodeId()
  let containerId = sel.containerId
  let container = tx.get(containerId)
  let pos = container.getPosition(nodeId)
  deleteNode(tx, {
    nodeId: nodeId,
    containerId: containerId
  })
  let newNode = tx.create({
    type: tx.getSchema().getDefaultTextType(),
    content: ""
  })
  container.show(newNode.id, pos)
  return {
    selection: tx.createSelection([newNode.id, 'content'], 0)
  }
}

/**
  A transformation that breaks a node at the current position,
  e.g. used when you hit ENTER inside a paragraph.

  @function

  @param {model/TransactionDocument} tx the document instance
  @param {Object} args object with fields `selection`, `containerId`
*/
function breakNode(tx, args) {
  if (!args.selection) {
    throw new Error("Argument 'selection' is mandatory.")
  }
  if (!args.containerId) {
    throw new Error("Argument 'containerId' is mandatory.")
  }
  if (!args.selection.isCollapsed()) {
    args = deleteSelection(tx, args)
  }
  let sel = args.selection

  // default breaking behavior for node selections
  if (sel.isNodeSelection()) {
    if (!sel.isFull()) {
      return breakWholeNode(tx, args)
    } else {
      return args
    }
  }

  let node = tx.get(sel.start.path[0])
  let behavior = args.editingBehavior

  if (behavior && behavior.canBreak(node.type)) {
    let breaker = behavior.getBreaker(node.type)
    return breaker.call(breaker, tx, args)
  } else if (node.isText()) {
    return breakTextNode(tx, args)
  } else {
    console.info("Breaking is not supported for node type %s.", node.type)
    return args
  }
}

function breakTextNode(tx, args) {
  let sel = args.selection
  let containerId = args.containerId
  if (!sel.isPropertySelection()) {
    throw new Error('Expected property selection.')
  }
  let path = sel.path
  let offset = sel.startOffset
  let node = tx.get(path[0])

  // split the text property and create a new paragraph node with trailing text and annotations transferred
  let text = node.getText()
  let container = tx.get(containerId)
  let nodePos = container.getPosition(node.id)
  let id = uuid$1(node.type)
  let newPath = [id, 'content']
  let newNode
  // when breaking at the first position, a new node of the same
  // type will be inserted.
  if (offset === 0) {
    newNode = tx.create({
      id: id,
      type: node.type,
      content: ""
    })
    // show the new node
    container.show(id, nodePos)
    sel = tx.createSelection(path, 0)
  }
  // otherwise break the node
  else {
    newNode = node.toJSON()
    newNode.id = id
    newNode.content = text.substring(offset)
    // if at the end
    if (offset === text.length) {
      newNode.type = tx.getSchema().getDefaultTextType()
    }
    tx.create(newNode)
    // create a new node
    if (offset < text.length) {
      // transfer annotations which are after offset to the new node
      annotationHelpers.transferAnnotations(tx, path, offset, [id, 'content'], 0)
      // truncate the original property
      tx.update(path, {
        delete: { start: offset, end: text.length }
      })
    }
    // show the new node
    container.show(id, nodePos+1)
    // update the selection
    sel = tx.createSelection(newPath, 0)
  }
  args.selection = sel
  args.node = newNode
  return args
}

function breakWholeNode(tx, args) {
  let sel = args.selection
  let containerId = args.containerId
  if (!sel) {
    throw new Error('Illegal argument: selection is mandatory.')
  }
  if (!containerId) {
    throw new Error('Illegal argument: containerId is mandatory.')
  }
  if (!sel.isNodeSelection()) {
    throw new Error('Illegal argument: selection should be a NodeSelection')
  }
  let container = tx.get(containerId)
  let nodeId = sel.getNodeId()
  let nodePos = container.getPosition(nodeId)
  let type = tx.getSchema().getDefaultTextType()
  let newNode = tx.create({
    type: type,
    content: ""
  })
  let newSel;
  if (sel.isBefore()) {
    container.show(newNode.id, nodePos)
    // in this case the selection does not change
    newSel = sel
  } else {
    container.show(newNode.id, nodePos+1)
    newSel = tx.createSelection([newNode.id, 'content'], 0)
  }
  args.selection = newSel
  args.node = newNode
  return args
}

/**
  Creates a new document instance containing only the selected content

  @param {Object} args object with `selection`
  @return {Object} with a `doc` property that has a fresh doc with the copied content
*/

function copySelection(doc, args) {
  let selection = args.selection
  if (!selection || !selection._isSelection) {
    throw new Error("'selection' is mandatory.")
  }
  if (selection.isNull() || selection.isCollapsed()) {
    args.doc = null
  }

  // return a simplified version if only a piece of text is selected
  else if (selection.isPropertySelection()) {
    args.doc = _copyPropertySelection(doc, selection)
  }
  else if (selection.isContainerSelection()) {
    args.doc = _copyContainerSelection(doc, selection)
  }
  else if (selection.isNodeSelection()) {
    args.doc = _copyNodeSelection(doc, selection)
  }
  else {
    console.error('Copy is not yet supported for selection type.')
    args.doc = null
  }
  return args
}

function _copyPropertySelection(doc, selection) {
  let path = selection.start.path
  let offset = selection.start.offset
  let endOffset = selection.end.offset
  let text = doc.get(path)
  let snippet = doc.createSnippet()
  let containerNode = snippet.getContainer()
  snippet.create({
    type: doc.schema.getDefaultTextType(),
    id: Document.TEXT_SNIPPET_ID,
    content: text.substring(offset, endOffset)
  })
  containerNode.show(Document.TEXT_SNIPPET_ID)
  let annotations = doc.getIndex('annotations').get(path, offset, endOffset)
  each$1(annotations, function(anno) {
    let data = cloneDeep$1(anno.toJSON())
    data.path = [Document.TEXT_SNIPPET_ID, 'content']
    data.startOffset = Math.max(offset, anno.startOffset)-offset
    data.endOffset = Math.min(endOffset, anno.endOffset)-offset
    snippet.create(data)
  })
  return snippet
}

// TODO: copying nested nodes is not straight-forward,
// as it is not clear if the node is valid to be created just partially
// Basically this needs to be implemented for each nested node.
// The default implementation ignores partially selected nested nodes.
function _copyContainerSelection(doc, selection) {
  let container = doc.get(selection.containerId)
  let snippet = doc.createSnippet()
  let containerNode = snippet.getContainer()

  let fragments = selection.getFragments()
  if (fragments.length === 0) return snippet
  let created = {}
  // copy nodes and annotations.
  for (let i = 0; i < fragments.length; i++) {
    let fragment = fragments[i]
    let nodeId = fragment.getNodeId()
    let node = doc.get(nodeId)
    // skip created nodes
    if (!created[nodeId]) {
      _copyNode(snippet, node, container, created)
      containerNode.show(nodeId)
    }
  }

  let firstFragment = fragments[0]
  let lastFragment = last$1(fragments)
  let path, offset, text

  // if first is a text node, remove part before the selection
  if (firstFragment.isPropertyFragment()) {
    path = firstFragment.path
    offset = firstFragment.startOffset
    text = doc.get(path)
    snippet.update(path, {
      delete: { start: 0, end: offset }
    })
    annotationHelpers.deletedText(snippet, path, 0, offset)
  }

  // if last is a is a text node, remove part before the selection
  if (lastFragment.isPropertyFragment()) {
    path = lastFragment.path
    offset = lastFragment.endOffset
    text = doc.get(path)
    snippet.update(path, {
      delete: { start: offset, end: text.length }
    })
    annotationHelpers.deletedText(snippet, path, offset, text.length)
  }

  return snippet
}

function _copyNodeSelection(doc, selection) {
  let container = doc.get(selection.containerId)
  let snippet = doc.createSnippet()
  let containerNode = snippet.getContainer()
  let nodeId = selection.getNodeId()
  let node = doc.get(nodeId)
  _copyNode(snippet, node, container, {})
  containerNode.show(node.id)
  return snippet
}

function _copyNode(doc, node, container, created) {
  // nested nodes should provide a custom implementation
  if (node.hasChildren()) {
    // TODO: call a customized implementation for nested nodes
    // and continue, to skip the default implementation
    let children = node.getChildren()
    children.forEach(function(child) {
      _copyNode(doc, child, container, created)
    })
  }
  created[node.id] = doc.create(node.toJSON())

  let annotationIndex = doc.getIndex('annotations')
  let annotations = annotationIndex.get([node.id])
  each$1(annotations, function(anno) {
    doc.create(cloneDeep$1(anno.toJSON()))
  })
}

/**
  For a given container selection create property selections of a given type

  @param {model/TransactionDocument} tx the document instance
  @param {model/Selection} args.selection A document selection
  @param {String} args.containerId a valid container id
  @param {Object} args.node data describing the annotation node

  @example

  ```js
  createAnnotation(tx, {
    selection: bodyEditor.getSelection(),
    node: {
      type: 'link',
      url: 'http://example.com'
    }
  });
  ```
*/

function createAnnotation(tx, args) {
  let sel = args.selection
  if (!sel) throw new Error('selection is required.')
  let annoType = args.annotationType
  let annoData = args.annotationData
  let anno = args.node
  if (!anno && annoType) {
    console.warn('DEPRECATED: Use node: {type: "strong"} instead of annotationType: "strong"')
    anno = { type: annoType }
    extend$1(anno, annoData)
  }
  if (!anno) throw new Error('node is required')

  if (!sel.isPropertySelection() && !sel.isContainerSelection() || sel.isCollapsed()) {
    // the selection must be expanded and of type Property- or ContainerSelection
    throw new Error("Invalid selection for createAnnotation")
  }
  // Special case: We split the current container selection into
  // multiple property annotations
  if (sel.isContainerSelection() && args.splitContainerSelections) {
    return _createPropertyAnnotations(tx, args)
  }
  if (documentHelpers.isContainerAnnotation(tx, anno.type)) {
    anno.startPath = sel.startPath
    anno.endPath = sel.endPath
    anno.containerId = sel.containerId
  } else if (sel.isPropertySelection()) {
    anno.path = sel.path
  } else {
    throw new Error('Illegal state: can not apply ContainerSelection')
  }
  anno.startOffset = sel.startOffset
  anno.endOffset = sel.endOffset
  args.result = tx.create(anno)
  return args
}

function _createPropertyAnnotations(tx, args) {
  let sel = args.selection
  let node = args.node
  let sels
  if (sel.isPropertySelection()) {
    sels = []; // we just do nothing in the property selection case? why?
  } else if (sel.isContainerSelection()) {
    sels = sel.splitIntoPropertySelections()
  }

  for (let i = 0; i < sels.length; i++) {
    let anno = {
      id: uuid$1(node.type)
    }
    extend$1(anno, node)
    anno.path = sels[i].getPath()
    anno.startOffset = sels[i].startOffset
    anno.endOffset = sels[i].endOffset
    tx.create(anno)
  }
}

/*
  The behavior when you press delete or backspace.
  I.e., it starts with a collapsed PropertySelection and deletes the character before
  or after the caret.
  If the caret is at the begin or end it will call `mergeNodes`.
*/
let deleteCharacter = function(tx, args) {
  let sel = args.selection
  if (!sel) {
    throw new Error("'selection' is mandatory.")
  }
  if (!sel.isCollapsed()) {
    throw new Error('selection must be collapsed for transformation "deleteCharacter"')
  }
  if (sel.isPropertySelection()) {
    return _deleteCharacterInProperty(tx, args)
  } else if (sel.isNodeSelection()) {
    return _deleteCharacterWithNodeSelection(tx, args)
  }
  console.warn("'deleteChar' can not be used with the given selection", sel.toString())
  return args
}

function _deleteCharacterInProperty(tx, args) {
  let sel = args.selection
  if (!sel.isPropertySelection()) {
    throw new Error('Expecting a property selection.')
  }
  let direction = args.direction
  let containerId = args.containerId
  let startChar, endChar
  let path = sel.path
  let text = tx.get(path)
  if ((sel.startOffset === 0 && direction === 'left') ||
      (sel.startOffset === text.length && direction === 'right')) {
    // only try to merge if a containerId is given
    if (containerId) {
      let tmp = merge(tx, extend$1({}, args, {
        selection: sel,
        containerId: containerId,
        path: sel.path,
        direction: direction
      }))
      args.selection = tmp.selection
    }
  } else {
    // simple delete one character
    startChar = (direction === 'left') ? sel.startOffset-1 : sel.startOffset
    endChar = startChar+1
    let op = tx.update(sel.path, { delete: { start: startChar, end: endChar } })
    updateAnnotations(tx, { op: op })
    args.selection = tx.createSelection(sel.path, startChar)
  }
  return args
}

function _deleteCharacterWithNodeSelection(tx, args) {
  let sel = args.selection
  if (!sel.isNodeSelection()) {
    throw new Error('Expecting a node selection.')
  }
  let direction = args.direction
  let containerId = args.containerId
  let nodeId = sel.getNodeId()
  let container = tx.get(containerId)
  let pos, text
  if (sel.isFull() || ( sel.isBefore() && direction === 'right') || (sel.isAfter() && direction === 'left')) {
    return deleteNode(tx, {
      nodeId: nodeId,
      containerId: containerId
    })
  } else if (sel.isBefore() && direction === 'left') {
    pos = container.getPosition(nodeId)
    if (pos > 0) {
      let previous = container.getNodeAt(pos-1)
      if (previous.isText()) {
        text = previous.getText()
        if (text.length === 0) {
          // don't return the selection returned by deleteNode
          deleteNode(tx, {
            nodeId: previous.id,
            containerId: containerId
          })
        } else {
          // just update the selection
          sel = tx.createSelection(previous.getTextPath(), text.length)
        }
      }
    }
  } else if (sel.isAfter() && direction === 'right') {
    pos = container.getPosition(nodeId)
    if (pos < container.getLength()-1) {
      let next = container.getNodeAt(pos+1)
      if (next.isText() && next.isEmpty()) {
        // don't return the selection returned by deleteNode
        deleteNode(tx, {
          nodeId: next.id,
          containerId: containerId
        })
      }
    }
  }
  return {
    selection: sel
  }
}

/*
 @param {model/Document} tx
 @param {model/Annotation} args.anno annotation which should be expanded
 @param {model/Selection}  args.selection selection to which to expand
*/
function expandAnnotation(tx, args) {
  let sel = args.selection
  let anno = args.anno
  if (!sel || !sel._isSelection) throw new Error('Argument "selection" is required.')
  if (!anno || !anno._isAnnotation) throw new Error('Argument "anno" is required.')

  let annoSel = anno.getSelection()
  let newAnnoSel = annoSel.expand(sel)
  anno.updateRange(tx, newAnnoSel)
  args.result = anno
  return args
}

/*
 @param {model/Document} tx
 @param {model/Annotation[]} args.annos annotations which should be fused
*/
function fuseAnnotation(tx, args) {
  let annos = args.annos
  if (!isArray$1(annos) || annos.length < 2) {
    throw new Error('fuseAnnotation(): at least two annotations are necessary.')
  }
  let sel, annoType
  annos.forEach(function(anno, idx) {
    if (idx === 0) {
      sel = anno.getSelection()
      annoType = anno.type
    } else {
      if (anno.type !== annoType) {
        throw new Error('fuseAnnotation(): all annotations must be of the same type.')
      }
      sel = sel.expand(anno.getSelection())
    }
  })
  each$1(annos, function(anno) {
    tx.delete(anno.id)
  })
  // The expanded selection
  args.selection = sel
  args.node = {type: annoType}

  // Sets args.result to new annotation
  return createAnnotation(tx, args)
}

/*
 * TODO: there is a use-case where this implementation does not suffice:
 * When the text of an annotation is selected fully, instead of deleting
 * the text and the annotation, the annotation should be preserved and adapted
 * to the range of the new text.
 */
function replaceText(tx, args) {
  return _defaultReplace(tx, args)
}

function _defaultReplace(tx, args) {
  let out = deleteSelection(tx, extend$1({}, args, {
    direction: 'right'
  }))
  let sel = out.selection
  if (!sel.isPropertySelection()) {
    // Should not happen if deleteSelection works correctly
    throw new Error('Invalid state.')
  }
  let text = args.text
  let op = tx.update(sel.path, { insert: { offset: sel.startOffset, value: text } } )
  updateAnnotations(tx, { op: op })
  args.selection = tx.createSelection(sel.path, sel.startOffset + text.length)
  return args
}

/**
  Inserts text at the given selection.

  @param {Object} args object with `selection`, `text`
  @return {Object} object with updated `selection`

  @example


  ```js
  insertText(tx, {
    selection: bodyEditor.getSelection(),
    text: 'Guten Tag'
  });
  ```
*/

let insertText = function(tx, args) {
  let sel = args.selection
  let text = args.text
  if (!sel) {
    throw new Error('Argument `selection` is mandatory for transformation `insertText`.')
  }
  if (!text) {
    throw new Error('Argument `text` is mandatory for transformation `insertText`.')
  }
  if (!(sel.isPropertySelection() || sel.isContainerSelection())) {
    console.error("Selection must be a Property- or ContainerSelection.")
    return args
  }
  // Extra transformation for replacing text, as there are edge cases
  if (!sel.isCollapsed()) {
    return replaceText(tx, args)
  }
  // HACK(?): if the string property is not initialized yet we do it here
  // for convenience.
  if (tx.get(sel.startPath) === undefined) {
    tx.set(sel.startPath, "")
  }
  let op = tx.update(sel.startPath, { insert: { offset: sel.startOffset, value: text } } )
  updateAnnotations(tx, {op: op})
  args.selection = tx.createSelection(sel.startPath, sel.startOffset + text.length)
  return args
};

/**
  Inserts a new inline node at the given selection/cursor.

  @param {Object} args object with `selection`, `containerId` and `node` that has the node data

  @return {Object} object with updated selection

  @example

  ```js
  insertInlineNode(tx, {
    selection: bodyEditor.getSelection(),
    node: {
      type: 'citation'
    }
  });
  ```
*/

function insertInlineNode(tx, args) {
  // 1. Insert fake character the inline node will stick
  let tmp = insertText(tx, {
    selection: args.selection,
    text: "\uFEFF"
  })

  let inlineNodeSel = tx.createSelection({
    type: 'property',
    path: tmp.selection.path,
    startOffset: tmp.selection.startOffset-1,
    endOffset: tmp.selection.endOffset
  })

  // 2. Create citation annotation
  args.node = args.node
  args.selection = inlineNodeSel
  args = createAnnotation(tx, args)
  return args
}

/**
  Inserts a new node at the given selection/cursor.

  @param {Object} args object with `selection`, `containerId` and `node` that has the node data

  @return {Object} object with updated selection

  @example

  ```js
  insertNode(tx, {
    selection: bodyEditor.getSelection(),
    containerId: bodyEditor.getContainerId(),
    node: {
      id: 'nodeId',
      type: 'paragraph',
      content: 'hello'
    }
  });
  ```
*/

function insertNode(tx, args) {
  let selection = args.selection
  let node = args.node
  if (!args.containerId) {
    throw new Error("containerId is mandatory")
  }
  if (!args.selection) {
    throw new Error("selection is mandatory")
  }
  if (!args.node) {
    throw new Error("node is mandatory")
  }
  let containerId = args.containerId
  let container = tx.get(containerId)
  let tmp
  if (!selection.isCollapsed()) {
    tmp = deleteSelection(tx, args)
    selection = tmp.selection
  }
  tmp = breakNode(tx, args)
  selection = tmp.selection
  // create the node if it does not exist yet
  // notice, that it is also allowed to insert an existing node
  if (!node.id) {
    node.id = uuid$1(node.type)
  }
  if (!tx.get(node.id)) {
    node = tx.create(node)
  }
  // make sure we have the real node, not just its data
  node = tx.get(node.id)
  // insert the new node after the node where the cursor was
  let nodePos = container.getPosition(selection.start.getNodeId())
  container.show(node.id, nodePos)

  // if the new node is a text node we can set the cursor to the
  // first character position
  if (node.isText()) {
    args.selection = tx.createSelection({
      type: 'property',
      path: [node.id, 'content'],
      startOffset: 0
    })
  }
  // otherwise we select the whole new node
  else {
    args.selection = tx.createSelection({
      type: 'container',
      containerId: containerId,
      startPath: [node.id],
      startOffset: 0,
      endPath: [node.id],
      endOffset: 1
    })
  }

  return args
}

/**
  Pastes clipboard content at the current selection

  @param {Object} args object with `selection` and `doc` for Substance content or
  `text` for external HTML content
  @return {Object} with updated `selection`
*/

let paste = function(tx, args) {
  args.text = args.text || ''
  let sel = args.selection
  if (!sel || sel.isNull()) {
    // TODO: we should throw
    console.error("Can not paste, without selection.")
    return args
  }
  // TODO: is there a better way to detect that this paste is happening within a
  // container?
  let inContainer = Boolean(args.containerId)
  let pasteDoc = args.doc

  // when we are in a container, we interpret line-breaks
  // and create a document with multiple paragraphs
  // in a PropertyEditor we paste the text as is
  if (!pasteDoc) {
    if (inContainer) {
      args.doc = pasteDoc = _convertPlainTextToDocument(tx, args)
    } else {
      return insertText(tx, args)
    }
  }
  if (!sel.isCollapsed()) {
    let tmp = deleteSelection(tx, args)
    args.selection = tmp.selection
  }
  let nodes = pasteDoc.get(Document.SNIPPET_ID).nodes
  let schema = tx.getSchema()

  if (nodes.length > 0) {
    let first = pasteDoc.get(nodes[0])

    if (schema.isInstanceOf(first.type, 'text')) {
      args = _pasteAnnotatedText(tx, args)
      // HACK: this changes the container's nodes array.
      // We do this, to be able to call _pasteDocument inserting the remaining nodes
      nodes.shift()
    }
    // if still nodes left > 0
    if (nodes.length > 0) {
      args = _pasteDocument(tx, args)
    }
  }
  return args
}

/*
  Splits plain text by lines and puts them into paragraphs.
*/
function _convertPlainTextToDocument(tx, args) {
  let defaultTextType = tx.getSchema().getDefaultTextType()
  let lines = args.text.split(/\s*\n\s*\n/)
  let pasteDoc = tx.newInstance()
  let container = pasteDoc.create({
    type: 'container',
    id: Document.SNIPPET_ID,
    nodes: []
  })
  let node
  if (lines.length === 1) {
    node = pasteDoc.create({
      id: Document.TEXT_SNIPPET_ID,
      type: defaultTextType,
      content: lines[0]
    })
    container.show(node.id)
  } else {
    for (let i = 0; i < lines.length; i++) {
      node = pasteDoc.create({
        id: uuid$1(defaultTextType),
        type: defaultTextType,
        content: lines[i]
      })
      container.show(node.id);
    }
  }
  return pasteDoc
}

function _pasteAnnotatedText(tx, args) {
  let copy = args.doc
  let sel = args.selection

  let nodes = copy.get(Document.SNIPPET_ID).nodes
  let textPath = [nodes[0], 'content']
  let text = copy.get(textPath)
  let annotations = copy.getIndex('annotations').get(textPath)
  // insert plain text
  let path = sel.start.path
  let offset = sel.start.offset
  tx.update(path, { insert: { offset: offset, value: text } } )
  annotationHelpers.insertedText(tx, sel.start, text.length)
  sel = tx.createSelection({
    type: 'property',
    path: sel.start.path,
    startOffset: sel.start.offset+text.length
  })
  // copy annotations
  each$1(annotations, function(anno) {
    let data = anno.toJSON()
    data.path = path.slice(0)
    data.startOffset += offset
    data.endOffset += offset
    if (tx.get(data.id)) {
      data.id = uuid$1(data.type)
    }
    tx.create(data)
  })
  args.selection = sel
  return args
}

function _pasteDocument(tx, args) {
  let pasteDoc = args.doc
  let containerId = args.containerId
  let sel = args.selection
  let container = tx.get(containerId)

  let startPath = sel.start.path
  let startPos = container.getPosition(sel.start.getNodeId())
  let text = tx.get(startPath)
  let insertPos
  // Break, unless we are at the last character of a node,
  // then we can simply insert after the node
  if ( text.length === sel.start.offset ) {
    insertPos = startPos + 1
  } else {
    let result = breakNode(tx, args)
    sel = result.selection
    insertPos = startPos + 1
  }
  // TODO how should this check be useful?
  if (insertPos < 0) {
    console.error('Could not find insertion position in ContainerNode.')
  }
  // transfer nodes from content document
  let nodeIds = pasteDoc.get(Document.SNIPPET_ID).nodes
  let annoIndex = pasteDoc.getIndex('annotations')
  let insertedNodes = []
  for (let i = 0; i < nodeIds.length; i++) {
    let nodeId = nodeIds[i]
    let node = _copyNode$1(tx, pasteDoc.get(nodeId))
    container.show(node.id, insertPos++)
    insertedNodes.push(node)

    // transfer annotations
    // what if we have changed the id of nodes that are referenced by annotations?
    let annos = annoIndex.get(nodeId)
    for (let j = 0; j < annos.length; j++) {
      let data = annos[j].toJSON()
      if (node.id !== nodeId) {
        data.path[0] = node.id
      }
      if (tx.get(data.id)) {
        data.id = uuid$1(data.type)
      }
      tx.create(data)
    }
  }

  if (insertedNodes.length === 0) return args

  // select the whole pasted block
  let firstNode = insertedNodes[0]
  let lastNode = last$1(insertedNodes)
  args.selection = tx.createSelection({
    type: 'container',
    containerId: containerId,
    startPath: [firstNode.id],
    startOffset: 0,
    endPath: [lastNode.id],
    endOffset: 1,
  })
  return args
}

function _copyNode$1(tx, pasteNode) {
  let nodeId = pasteNode.id
  let data = pasteNode.toJSON()
  // create a new id if the node exists already
  if (tx.get(nodeId)) {
    data.id = uuid$1(pasteNode.type)
  }
  if (pasteNode.hasChildren()) {
    let children = pasteNode.getChildren()
    let childrenIds = data[pasteNode.getChildrenProperty()]
    for (let i = 0; i < children.length; i++) {
      let childNode = _copyNode$1(tx, children[i])
      childrenIds[i] = childNode.id
    }
  }
  return tx.create(data)
}

/**
  Switch text type for a given node. E.g. from `paragraph` to `heading`.

  @param {Object} args object with `selection`, `containerId` and `data` with new node data
  @return {Object} object with updated `selection`

  @example

  ```js
  switchTextType(tx, {
    selection: bodyEditor.getSelection(),
    containerId: bodyEditor.getContainerId(),
    data: {
      type: 'heading',
      level: 2
    }
  });
  ```
*/

function switchTextType(tx, args) {
  let sel = args.selection
  if (!sel.isPropertySelection()) {
    console.error("Selection must be a PropertySelection.")
    return args
  }
  let path = sel.path
  let nodeId = path[0]
  let data = args.data
  let node = tx.get(nodeId)
  if (!(node.isInstanceOf('text'))) {
    console.warn('Trying to use switchTextType on a non text node. Skipping.')
    return args
  }
  // create a new node and transfer annotations
  let newNode = extend$1({
    id: uuid$1(data.type),
    type: data.type,
    content: node.content
  }, data)
  let newPath = [newNode.id, 'content']
  newNode = tx.create(newNode)
  annotationHelpers.transferAnnotations(tx, path, 0, newPath, 0)

  // hide the old one, show the new node
  let container = tx.get(args.containerId)
  let pos = container.getPosition(nodeId)
  if (pos >= 0) {
    container.hide(nodeId)
    container.show(newNode.id, pos)
  }
  // remove the old one from the document
  deleteNode(tx, { nodeId: node.id })

  args.selection = tx.createSelection(newPath, sel.startOffset, sel.endOffset)
  args.node = newNode

  return args
}

/*
 @param {model/Document} tx
 @param {model/Annotation} args.anno annotation which should be expanded
 @param {model/Selection}  args.selection selection to which to expand
*/
function truncateAnnotation(tx, args) {
  let sel = args.selection
  let anno = args.anno
  if (!sel || !sel._isSelection) throw new Error('Argument "selection" is required.')
  if (!anno || !anno._isAnnotation) throw new Error('Argument "anno" is required.')

  let annoSel = anno.getSelection()
  let newAnnoSel = annoSel.truncateWith(sel)
  anno.updateRange(tx, newAnnoSel)
  args.result = anno
  return args
}

/**
 Abstract interface for commands.

 @class
*/

class Command {
  constructor(params) {
    this.params = params || {}
    this.name = this.params.name
    if (!this.name) {
      throw new Error("'name' is required");
    }
  }

  get _isCommand() {
    return true 
  }

  getName() {
    return this.name
  }

  getCommandState(props, context) { // eslint-disable-line
    throw new Error('Command.getCommandState() is abstract.')
  }

  /**
    Execute command

    @abstract
    @return {Object} info object with execution details
  */
  execute(props, context) { // eslint-disable-line
    throw new Error('Command.execute() is abstract.')
  }

  _getDocumentSession(props, context) {
    let docSession = props.documentSession || context.documentSession
    if (!docSession) {
      throw new Error("'documentSession' is required.")
    }
    return docSession
  }

  _getSelection(props) {
    let sel = props.selection || props.selectionState.getSelection()
    if (!sel) {
      throw new Error("'selection' is required.")
    }
    return sel
  }

}

// TODO: move it somewhere else
//Command.prototype._isCommand = true

oo.initClass(Command)

var isMatch = createCommonjsModule(function (module) {
var baseIsMatch = interopDefault(require$$1$5),
    getMatchData = interopDefault(require$$0$29);

/**
 * Performs a partial deep comparison between `object` and `source` to
 * determine if `object` contains equivalent property values. This method is
 * equivalent to a `_.matches` function when `source` is partially applied.
 *
 * **Note:** This method supports comparing the same values as `_.isEqual`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.isMatch(object, { 'age': 40 });
 * // => true
 *
 * _.isMatch(object, { 'age': 36 });
 * // => false
 */
function isMatch(object, source) {
  return object === source || baseIsMatch(object, source, getMatchData(source));
}

module.exports = isMatch;
});

var _isMatch = interopDefault(isMatch);

var _createFind = createCommonjsModule(function (module) {
var baseIteratee = interopDefault(require$$2$6),
    isArrayLike = interopDefault(require$$3),
    keys = interopDefault(require$$0$3);

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    predicate = baseIteratee(predicate, 3);
    if (!isArrayLike(collection)) {
      var props = keys(collection);
    }
    var index = findIndexFunc(props || collection, function(value, key) {
      if (props) {
        key = value;
        value = iterable[key];
      }
      return predicate(value, key, iterable);
    }, fromIndex);
    return index > -1 ? collection[props ? props[index] : index] : undefined;
  };
}

module.exports = createFind;
});

var _createFind$1 = interopDefault(_createFind);


var require$$1$32 = Object.freeze({
	default: _createFind$1
});

var find = createCommonjsModule(function (module) {
var createFind = interopDefault(require$$1$32),
    findIndex = interopDefault(require$$0$56);

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to search.
 * @param {Array|Function|Object|string} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;
});

var _find = interopDefault(find);

class SwitchTextTypeCommand extends Command {

  // Available text types on the surface
  getTextTypes(context) {
    let surface = context.surfaceManager.getFocusedSurface()
    if (surface && surface.isContainerEditor()) {
      return surface.getTextTypes()
    } else {
      return []
    }
  }

  getTextType(context, textTypeName) {
    let textTypes = this.getTextTypes(context)
    return _find(textTypes, function(t) {
      return t.name === textTypeName
    })
  }

  // Search which textType matches the current node
  // E.g. {type: 'heading', level: 1} => heading1
  getCurrentTextType(context, node) {
    let textTypes = this.getTextTypes(context)
    let currentTextType
    textTypes.forEach(function(textType) {
      let nodeProps = clone$1(textType.data)
      delete nodeProps.type
      if (_isMatch(node, nodeProps) && node.type === textType.data.type) {
        currentTextType = textType
      }
    })
    return currentTextType
  }

  getCommandState(props, context) {
    let doc = context.documentSession.getDocument()
    let sel = context.documentSession.getSelection()
    let surface = context.surfaceManager.getFocusedSurface()
    let node
    let newState = {
      disabled: false,
      textTypes: this.getTextTypes(context)
    }
    // Set disabled when not a property selection
    if (!surface || !surface.isEnabled() || sel.isNull()) {
      newState.disabled = true
    } else if (sel.isContainerSelection()) {
      newState.disabled = true
      newState.currentTextType = {name: 'container-selection'}
    } else if (sel.isPropertySelection()) {
      let path = sel.getPath()
      node = doc.get(path[0])
      // There are cases where path points to an already deleted node,
      // so we need to guard node
      if (node) {
        if (node.isText() && node.isBlock()) {
          newState.currentTextType = this.getCurrentTextType(context, node)
        }
        if (!newState.currentTextType) {
          // We 'abuse' the currentTextType field by providing a property
          // identifier that is translated into a name using an default label set.
          // E.g. this.getLabel('figure.caption') -> Figure Caption
          newState.currentTextType = {name: [node.type, path[1]].join('.')}
          newState.disabled = true
        }
      }
    } else if (sel.isNodeSelection()) {
      node = doc.get(sel.getNodeId())
      newState.currentTextType = {name: node.type}
      newState.disabled = true
    } else if (sel.isCustomSelection()) {
      newState.currentTextType = {name: 'custom'}
      newState.disabled = true
    }
    return newState
  }

  /**
    Trigger a switchTextType transaction

    @param {String} textTypeName identifier (e.g. heading1)
  */
  execute(props, context) {
    let textType = this.getTextType(context, props.textType)
    let nodeData = textType.data
    let surface = context.surfaceManager.getFocusedSurface()
    if (!surface) {
      console.warn('No focused surface. Stopping command execution.')
      return
    }
    surface.transaction(function(tx, args) {
      args.data = nodeData
      return surface.switchType(tx, args)
    })
    return nodeData
  }
}

var _castSlice = createCommonjsModule(function (module) {
var baseSlice = interopDefault(require$$0$52);

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;
});

var _castSlice$1 = interopDefault(_castSlice);


var require$$3$17 = Object.freeze({
	default: _castSlice$1
});

var _reHasComplexSymbol = createCommonjsModule(function (module) {
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasComplexSymbol = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

module.exports = reHasComplexSymbol;
});

var _reHasComplexSymbol$1 = interopDefault(_reHasComplexSymbol);


var require$$2$29 = Object.freeze({
	default: _reHasComplexSymbol$1
});

var _stringToArray = createCommonjsModule(function (module) {
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return string.match(reComplexSymbol);
}

module.exports = stringToArray;
});

var _stringToArray$1 = interopDefault(_stringToArray);


var require$$1$33 = Object.freeze({
	default: _stringToArray$1
});

var _createCaseFirst = createCommonjsModule(function (module) {
var castSlice = interopDefault(require$$3$17),
    reHasComplexSymbol = interopDefault(require$$2$29),
    stringToArray = interopDefault(require$$1$33),
    toString = interopDefault(require$$0$31);

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = reHasComplexSymbol.test(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

module.exports = createCaseFirst;
});

var _createCaseFirst$1 = interopDefault(_createCaseFirst);


var require$$0$58 = Object.freeze({
	default: _createCaseFirst$1
});

var upperFirst = createCommonjsModule(function (module) {
var createCaseFirst = interopDefault(require$$0$58);

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;
});

var upperFirst$1 = interopDefault(upperFirst);


var require$$0$57 = Object.freeze({
	default: upperFirst$1
});

var capitalize = createCommonjsModule(function (module) {
var toString = interopDefault(require$$0$31),
    upperFirst = interopDefault(require$$0$57);

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;
});

var capitalize$1 = interopDefault(capitalize);

/**
  A place to store global variables.
*/
var substanceGlobals = {};

var _global = (typeof global !== 'undefined') ? global : window

if (_global.hasOwnProperty('Substance')) {
  console.warn('global.Substance is already defined.');
  substanceGlobals = _global.Substance;
} else {
  _global.Substance = substanceGlobals;
}

var substanceGlobals$1 = substanceGlobals;

var _isFlattenable = createCommonjsModule(function (module) {
var isArguments = interopDefault(require$$1$3),
    isArray = interopDefault(require$$0$5);

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value);
}

module.exports = isFlattenable;
});

var _isFlattenable$1 = interopDefault(_isFlattenable);


var require$$0$59 = Object.freeze({
	default: _isFlattenable$1
});

var _baseFlatten = createCommonjsModule(function (module) {
var arrayPush = interopDefault(require$$2$21),
    isFlattenable = interopDefault(require$$0$59);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;
});

var _baseFlatten$1 = interopDefault(_baseFlatten);


var require$$4$14 = Object.freeze({
	default: _baseFlatten$1
});

var flattenDeep = createCommonjsModule(function (module) {
var baseFlatten = interopDefault(require$$4$14);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Recursively flattens `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(array) {
  var length = array ? array.length : 0;
  return length ? baseFlatten(array, INFINITY) : [];
}

module.exports = flattenDeep;
});

var flattenDeep$1 = interopDefault(flattenDeep);

var isNil = createCommonjsModule(function (module) {
/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

module.exports = isNil;
});

var isNil$1 = interopDefault(isNil);

var _baseUnary = createCommonjsModule(function (module) {
/**
 * The base implementation of `_.unary` without support for storing wrapper metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;
});

var _baseUnary$1 = interopDefault(_baseUnary);


var require$$1$34 = Object.freeze({
	default: _baseUnary$1
});

var _baseDifference = createCommonjsModule(function (module) {
var SetCache = interopDefault(require$$5$1),
    arrayIncludes = interopDefault(require$$4$12),
    arrayIncludesWith = interopDefault(require$$3$16),
    arrayMap = interopDefault(require$$0$36),
    baseUnary = interopDefault(require$$1$34),
    cacheHas = interopDefault(require$$0$55);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;
});

var _baseDifference$1 = interopDefault(_baseDifference);


var require$$2$30 = Object.freeze({
	default: _baseDifference$1
});

var _basePick = createCommonjsModule(function (module) {
var arrayReduce = interopDefault(require$$0$47);

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return arrayReduce(props, function(result, key) {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {});
}

module.exports = basePick;
});

var _basePick$1 = interopDefault(_basePick);


var require$$3$18 = Object.freeze({
	default: _basePick$1
});

var _getSymbolsIn = createCommonjsModule(function (module) {
var arrayPush = interopDefault(require$$2$21),
    getPrototype = interopDefault(require$$1$2),
    getSymbols = interopDefault(require$$0$44);

/** Built-in value references. */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbol properties
 * of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !getOwnPropertySymbols ? getSymbols : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;
});

var _getSymbolsIn$1 = interopDefault(_getSymbolsIn);


var require$$1$35 = Object.freeze({
	default: _getSymbolsIn$1
});

var _getAllKeysIn = createCommonjsModule(function (module) {
var baseGetAllKeys = interopDefault(require$$2$20),
    getSymbolsIn = interopDefault(require$$1$35),
    keysIn = interopDefault(require$$0$41);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;
});

var _getAllKeysIn$1 = interopDefault(_getAllKeysIn);


var require$$2$31 = Object.freeze({
	default: _getAllKeysIn$1
});

var omit = createCommonjsModule(function (module) {
var arrayMap = interopDefault(require$$0$36),
    baseDifference = interopDefault(require$$2$30),
    baseFlatten = interopDefault(require$$4$14),
    basePick = interopDefault(require$$3$18),
    getAllKeysIn = interopDefault(require$$2$31),
    rest = interopDefault(require$$0$38),
    toKey = interopDefault(require$$0$33);

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable string keyed properties of `object` that are
 * not omitted.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = rest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), toKey);
  return basePick(object, baseDifference(getAllKeysIn(object), props));
});

module.exports = omit;
});

var omit$1 = interopDefault(omit);

var without = createCommonjsModule(function (module) {
var baseDifference = interopDefault(require$$2$30),
    isArrayLikeObject = interopDefault(require$$1$4),
    rest = interopDefault(require$$0$38);

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = rest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;
});

var without$1 = interopDefault(without);

/**
  A virtual {@link ui/DOMElement} which is used by the {@link ui/Component} API.

  A VirtualElement is just a description of a DOM structure. It represents a virtual
  DOM mixed with Components. This virtual structure needs to be compiled to a {@link ui/Component}
  to actually create a real DOM element.

  @class
*/
function VirtualElement(owner) {
  // set when this gets inserted into another virtual element
  this.parent = null;
  // set when created by RenderingContext
  this._owner = owner;
  // set when ref'd
  this._ref = null;
}

VirtualElement.Prototype = function() {

  /*
    For instance of like checks.
  */
  this._isVirtualElement = true;

  this.getParent = function() {
    return this.parent;
  };

  /**
    Associates a reference identifier with this element.

    When rendered the corresponding component is stored in the owner using the given key.
    In addition to that, components with a reference are preserved when its parent is rerendered.

    @param {String} ref id for the compiled Component
  */
  this.ref = function(ref) {
    if (!ref) {
      throw new Error('Illegal argument');
    }
    this._ref = ref;
    if (this._context) {
      this._context.refs[ref] = this;
    }
    return this;
  };

};

DOMElement.extend(VirtualElement);

DOMElement._defineProperties(VirtualElement, without$1(DOMElement._propertyNames, 'children'));

/*
  A virtual HTML element.

  @private
  @class VirtualElement.VirtualHTMLElement
  @extends ui/VirtualElement
*/
function VirtualHTMLElement(tagName) {
  VirtualHTMLElement.super.call(this);

  this._tagName = tagName;
  this.classNames = null;
  this.attributes = null;
  this.htmlProps = null;
  this.style = null;
  this.eventListeners = null;

  this.children = [];

}

VirtualHTMLElement.Prototype = function() {

  this._isVirtualHTMLElement = true;

  this.getTagName = function() {
    return this._tagName;
  };

  this.setTagName = function(tagName) {
    this._tagName = tagName;
    return this;
  };

  this.hasClass = function(className) {
    if (this.classNames) {
      return this.classNames.indexOf(className) > -1;
    }
    return false;
  };

  this.addClass = function(className) {
    if (!this.classNames) {
      this.classNames = [];
    }
    this.classNames.push(className);
    return this;
  };

  this.removeClass = function(className) {
    if (this.classNames) {
      this.classNames = without$1(this.classNames, className);
    }
    return this;
  };

  this.removeAttr = function(attr) {
    if (this.attributes) {
      if (isString$1(attr)) {
        delete this.attributes[attr];
      } else {
        this.attributes = omit$1(this.attributes, attr);
      }
    }
    return this;
  };

  this.getAttribute = function(name) {
    if (this.attributes) {
      return this.attributes[name];
    }
  };

  this.setAttribute = function(name, value) {
    if (!this.attributes) {
      this.attributes = {};
    }
    this.attributes[name] = value;
    return this;
  };

  this.getAttributes = function() {
    // we are having separated storages for differet
    // kind of attributes which we now pull together
    // in the same way as a native DOM element has it
    var attributes = {};
    if (this.attributes) {
      extend$1(attributes, this.attributes);
    }
    if (this.classNames) {
      attributes.class = this.classNames.join(' ');
    }
    if (this.style) {
      attributes.style = map$1(this.style, function(val, key) {
        return key + ":" + val;
      }).join(';');
    }
    return attributes;
  };

  this.getId = function() {
    return this.getAttribute('id');
  };

  this.setId = function(id) {
    this.setAttribute('id', id);
    return this;
  };

  this.setTextContent = function(text) {
    text = text || '';
    this.empty();
    this.appendChild(text);
    return this;
  };

  this.setInnerHTML = function(html) {
    html = html || '';
    this.empty();
    this._innerHTMLString = html;
    return this;
  };

  this.getInnerHTML = function() {
    if (!this.hasOwnProperty('_innerHTMLString')) {
      throw new Error('Not supported.');
    } else {
      return this._innerHTMLString;
    }
  };

  this.getValue = function() {
    return this.htmlProp('value');
  };

  this.setValue = function(value) {
    this.htmlProp('value', value);
    return this;
  };

  this.getChildNodes = function() {
    return this.children;
  };

  this.getChildren = function() {
    return this.children.filter(function(child) {
      return child.getNodeType() !== "text";
    });
  };

  this.isTextNode = function() {
    return false;
  };

  this.isElementNode = function() {
    return true;
  };

  this.isCommentNode = function() {
    return false;
  };

  this.isDocumentNode = function() {
    return false;
  };

  this.append = function() {
    if (this._innerHTMLString) {
      throw Error('It is not possible to mix $$.html() with $$.append(). You can call $$.empty() to reset this virtual element.');
    }
    this._append(this.children, arguments);
    return this;
  };

  this.appendChild = function(child) {
    if (this._innerHTMLString) {
      throw Error('It is not possible to mix $$.html() with $$.append(). You can call $$.empty() to reset this virtual element.');
    }
    this._appendChild(this.children, child);
    return this;
  };

  this.insertAt = function(pos, child) {
    child = this._normalizeChild(child);
    if (!child) {
      throw new Error('Illegal child: ' + child);
    }
    if (!child._isVirtualElement) {
      throw new Error('Illegal argument for $$.insertAt():' + child);
    }
    if (pos < 0 || pos > this.children.length) {
      throw new Error('insertAt(): index out of bounds.');
    }
    this._insertAt(this.children, pos, child);
    return this;
  };

  this.insertBefore = function(child, before) {
    var pos = this.children.indexOf(before);
    if (pos > -1) {
      this.insertAt(pos, child);
    } else {
      throw new Error('insertBefore(): reference node is not a child of this element.');
    }
    return this;
  };

  this.removeAt = function(pos) {
    if (pos < 0 || pos >= this.children.length) {
      throw new Error('removeAt(): Index out of bounds.');
    }
    this._removeAt(pos);
    return this;
  };

  this.removeChild = function(child) {
    if (!child || !child._isVirtualElement) {
      throw new Error('removeChild(): Illegal arguments. Expecting a CheerioDOMElement instance.');
    }
    var idx = this.children.indexOf(child);
    if (idx < 0) {
      throw new Error('removeChild(): element is not a child.');
    }
    this.removeAt(idx);
    return this;
  };

  this.replaceChild = function(oldChild, newChild) {
    if (!newChild || !oldChild ||
        !newChild._isVirtualElement || !oldChild._isVirtualElement) {
      throw new Error('replaceChild(): Illegal arguments. Expecting BrowserDOMElement instances.');
    }
    var idx = this.children.indexOf(oldChild);
    if (idx < 0) {
      throw new Error('replaceChild(): element is not a child.');
    }
    this.removeAt(idx);
    this.insertAt(idx, newChild);
    return this;
  };

  this.empty = function() {
    var children = this.children;
    while (children.length) {
      var child = children.pop();
      child.parent = null;
    }
    delete this._innerHTMLString;
    return this;
  };

  this.getProperty = function(name) {
    if (this.htmlProps) {
      return this.htmlProps[name];
    }
  };

  this.setProperty = function(name, value) {
    if (!this.htmlProps) {
      this.htmlProps = {};
    }
    this.htmlProps[name] = value;
    return this;
  };

  this.removeProperty = function(name) {
    if (this.htmlProps) {
      delete this.htmlProps[name];
    }
    return this;
  };

  this.getStyle = function(name) {
    if (this.style) {
      return this.style[name];
    }
  };

  this.setStyle = function(name, value) {
    if (!this.style) {
      this.style = {};
    }
    this.style[name] = value;
    return this;
  };

  this.addEventListener = function(eventName, handler, options) {
    var listener;
    if (arguments.length === 1 && arguments[0]._isDOMEventListener) {
      listener = arguments[0];
    } else {
      options = options || {};
      options.context = options.context || this._owner._comp;
      listener = new DOMElement.EventListener(eventName, handler, options);
    }
    if (!this.eventListeners) {
      this.eventListeners = [];
    }
    this.eventListeners.push(listener);
    return this;
  };

  this.removeEventListener = function(eventName, handler) {
    if (this.eventListeners) {
      DOMElement._findEventListenerIndex(this.eventListeners, eventName, handler);
    }
    return this;
  };

  this.getEventListeners = function() {
    return this.eventListeners;
  };

  this.getNodeType = function() {
    return "element";
  };

  this.hasInnerHTML = function() {
    return Boolean(this._innerHTMLString);
  };

  this._normalizeChild = function(child) {
    if (isString$1(child)) {
      child = new VirtualTextNode(child);
    }
    return child;
  };

  this._append = function(outlet, args) {
    if (args.length === 1 && !isArray$1(args[0])) {
      this._appendChild(outlet, args[0]);
      return;
    }
    var children;
    if (isArray$1(args[0])) {
      children = args[0];
    } else if (arguments.length > 1) {
      children = Array.prototype.slice.call(args,0);
    } else {
      return;
    }
    children.forEach(this._appendChild.bind(this, outlet));
  };

  this._appendChild = function(outlet, child) {
    child = this._normalizeChild(child);
    // TODO: discuss. Having a bad feeling about this,
    // because it could obscure an implementation error
    if (!child) return;
    outlet.push(child);
    this._attach(child);
    return child;
  };

  this._insertAt = function(outlet, pos, child) {
    if (!child) return;
    outlet.splice(pos, 0, child);
    this._attach(child);
  };

  this._removeAt = function(outlet, pos) {
    var child = outlet[pos];
    outlet.splice(pos, 1);
    this._detach(child);
  };

  this._attach = function(child) {
    child.parent = this;
    if (this._context && child._owner !== this._owner && child._ref) {
      this._context.foreignRefs[child._ref] = child;
    }
  };

  this._detach = function(child) {
    child.parent = null;
    if (this._context && child._owner !== this._owner && child._ref) {
      delete this.context.foreignRefs[child._ref];
    }
  };

  this._mergeHTMLConfig = function(other) {
    if (other.classNames) {
      if (!this.classNames) {
        this.classNames = [];
      }
      this.classNames = this.classNames.concat(other.classNames);
    }
    if (other.attributes) {
      if (!this.attributes) {
        this.attributes = {};
      }
      extend$1(this.attributes, other.attributes);
    }
    if (other.htmlProps) {
      if (!this.htmlProps) {
        this.htmlProps = {};
      }
      extend$1(this.htmlProps, other.htmlProps);
    }
    if (other.style) {
      if (!this.style) {
        this.style = {};
      }
      extend$1(this.style, other.style);
    }
    if (other.eventListeners) {
      if (!this.eventListeners) {
        this.eventListeners = [];
      }
      this.eventListeners = this.eventListeners.concat(other.eventListeners);
    }
  };
};

VirtualElement.extend(VirtualHTMLElement);

/*
  A virtual element which gets rendered by a custom component.

  @private
  @class VirtualElement.VirtualComponent
  @extends ui/VirtualElement
*/
function VirtualComponent(ComponentClass, props) {
  VirtualComponent.super.call(this);

  props = props || {};

  this.ComponentClass = ComponentClass;
  this.props = props;
  if (!props.children) {
    props.children = [];
  }
  this.children = props.children;
}

VirtualComponent.Prototype = function() {

  this._isVirtualComponent = true;

  this.getComponent = function() {
    return this._comp;
  };

  // Note: for VirtualComponentElement we put children into props
  // so that the render method of ComponentClass can place it.
  this.getChildren = function() {
    return this.props.children;
  };

  this.getNodeType = function() {
    return 'component';
  };

  this.outlet = function(name) {
    return new Outlet(this, name);
  };

  this._attach = function(child) {
    child._preliminaryParent = this;
  };

  this._detach = function(child) {
    child._preliminaryParent = null;
  };

  this._copyHTMLConfig = function() {
    return {
      classNames: clone$1(this.classNames),
      attributes: clone$1(this.attributes),
      htmlProps: clone$1(this.htmlProps),
      style: clone$1(this.style),
      eventListeners: clone$1(this.eventListeners)
    };
  };

  function Outlet(virtualEl, name) {
    this.virtualEl = virtualEl;
    this.name = name;
    Object.freeze(this);
  }

  Outlet.prototype._getOutlet = function() {
    var outlet = this.virtualEl.props[this.name];
    if (!outlet) {
      outlet = [];
      this.virtualEl.props[this.name] = outlet;
    }
    return outlet;
  };

  Outlet.prototype.append = function() {
    var outlet = this._getOutlet();
    this.virtualEl._append(outlet, arguments);
    return this;
  };

  Outlet.prototype.empty = function() {
    var arr = this.virtualEl.props[this.name];
    arr.forEach(function(el) {
      this._detach(el);
    }.bind(this));
    arr.splice(0, arr.length);
    return this;
  };

};

VirtualHTMLElement.extend(VirtualComponent);

function VirtualTextNode(text) {
  this.text = text;
}

VirtualTextNode.Prototype = function() {
  this._isVirtualTextNode = true;
};

VirtualElement.extend(VirtualTextNode);

VirtualElement.Component = VirtualComponent;
VirtualElement.TextNode = VirtualTextNode;

/**
  Create a virtual DOM representation which is used by Component
  for differential/reactive rendering.

  @param elementType HTML tag name or Component class
  @param [props] a properties object for Component classes
  @return {VirtualElement} a virtual DOM node

  @example

  Create a virtual DOM Element

  ```
  $$('a').attr({href: './foo'}).addClass('se-nav-item')
  ```

  Create a virtual Component

  ```
  $$(HelloMessage, {name: 'John'})
  ```
*/
VirtualElement.createElement = function() {
  var content;
  var _first = arguments[0];
  var _second = arguments[1];
  var type;
  if (isString$1(_first)) {
    type = "element";
  } else if (isFunction$1(_first) && _first.prototype._isComponent) {
    type = "component";
  } else if (isNil$1(_first)) {
    throw new Error('$$(null): provided argument was null or undefined.');
  } else {
    throw new Error('Illegal usage of $$()');
  }
  // some props are mapped to built-ins
  var props = {};
  var classNames, ref;
  var eventHandlers = [];
  for(var key in _second) {
    if (!_second.hasOwnProperty(key)) continue;
    var val = _second[key];
    switch(key) {
      case 'class':
        classNames = val;
        break;
      case 'ref':
        ref = val;
        break;
      default:
        if (key.slice(0,2) === 'on') {
          eventHandlers.push({ name: key.slice(2), handler: val });
        } else {
          props[key] = val;
        }
    }
  }
  if (type === 'element') {
    content = new VirtualHTMLElement(_first);
    // remaining props are attributes
    // TODO: should we make sure that these are only string values?
    content.attr(props);
  } else {
    content = new VirtualComponent(_first, props);
  }
  // HACK: this is set to the current context by RenderingEngine
  // otherwise this will provide rubbish
  content._owner = this.owner;
  if (classNames) {
    content.addClass(classNames);
  }
  if (ref) {
    content.ref(ref);
  }
  eventHandlers.forEach(function(h) {
    if (isFunction$1(h.handler)) {
      content.on(h.name, h.handler);
    } else if (isPlainObject$1(h.handler)) {
      var params = h.handler;
      content.on(h.name, params.handler, params.context, params);
    } else {
      throw new Error('Illegal arguments for $$(_,{ on'+h.name+'})');
    }
  });
  // allow a notation similar to React.createElement
  // $$(MyComponent, {}, ...children)
  if (arguments.length > 2) {
    content.append(flattenDeep$1(Array.prototype.slice.call(arguments, 2)));
  }
  return content;
};

function RenderingEngine() {}

RenderingEngine.Prototype = function() {

  this._render = function(comp, oldProps, oldState) {
    // var t0 = Date.now();
    var vel = _createWrappingVirtualComponent(comp);
    var state = new RenderingEngine.State();
    if (oldProps) {
      state.setOldProps(vel, oldProps);
    }
    if (oldState) {
      state.setOldState(vel, oldState);
    }
    try {
      _capture(state, vel, 'forceCapture');
      if (vel._isVirtualComponent) {
        _render(state, vel._content);
      } else {
        _render(state, vel);
      }
      _triggerUpdate(state, vel);
    } finally {
      state.dispose();
    }
    // console.log("RenderingEngine: finished rendering in %s ms", Date.now()-t0);
  };

  // this is used together with the incremental Component API
  this._renderChild = function(comp, vel) {
    // HACK: to make this work with the rest of the implementation
    // we ingest a fake parent
    var state = new RenderingEngine.State();
    vel.parent = { _comp: comp };
    try {
      _capture(state, vel);
      _render(state, vel);
      return vel._comp;
    } finally {
      state.dispose();
    }
  };

  function _create(state, vel) {
    var comp = vel._comp;
    console.assert(!comp, "Component instance should not exist when this method is used.");
    var parent = vel.parent._comp;
    // making sure the parent components have been instantiated
    if (!parent) {
      parent = _create(state, vel.parent);
    }
    if (vel._isVirtualComponent) {
      console.assert(parent, "A Component should have a parent.");
      comp = new vel.ComponentClass(parent, vel.props);
      comp.__htmlConfig__ = vel._copyHTMLConfig();
    } else if (vel._isVirtualHTMLElement) {
      comp = new Component.Element(parent, vel);
    } else if (vel._isVirtualTextNode) {
      comp = new Component.TextNode(parent, vel);
    }
    if (vel._ref) {
      comp._ref = vel._ref;
    }
    if (vel._owner) {
      comp._owner = vel._owner._comp;
    }
    vel._comp = comp;
    return comp;
  }

  function _capture(state, vel, forceCapture) {
    if (state.isCaptured(vel)) {
      return vel;
    }
    // a captured VirtualElement has a component instance attached
    var comp = vel._comp;
    if (!comp) {
      comp = _create(state, vel);
      state.setNew(vel);
    }
    if (vel._isVirtualComponent) {
      var needRerender;
      // NOTE: forceCapture is used for the first entrance
      // from this.render(comp) where we want to fource capturing
      // as it has already been cleared that a rerender is necessary
      if (forceCapture) {
        needRerender = true;
      } else {
        // NOTE: don't ask shouldRerender if no element is there yet
        needRerender = !comp.el || comp.shouldRerender(vel.props);
        comp.__htmlConfig__ = vel._copyHTMLConfig();
        state.setOldProps(vel, comp.props);
        state.setOldState(vel, comp.state);
        // updates prop triggering willReceiveProps
        comp._setProps(vel.props);
        if (!state.isNew(vel)) {
          state.setUpdated(vel);
        }
      }
      if (needRerender) {
        var context = new CaptureContext(vel);
        var content = comp.render(context.$$);
        if (!content || !content._isVirtualHTMLElement) {
          throw new Error("Component.render must return VirtualHTMLElement");
        }

        if (comp.__htmlConfig__) {
          content._mergeHTMLConfig(comp.__htmlConfig__);
        }
        content._comp = comp;
        vel._content = content;
        if (!state.isNew(vel) && comp.isMounted()) {
          state.setUpdated(vel);
        }
        // Mapping: map virtual elements to existing components based on refs
        _prepareVirtualComponent(state, comp, content);
        // Descending
        // TODO: only do this in DEBUG mode
        if (substanceGlobals$1.DEBUG_RENDERING) {
          // in this case we use the render() function as iterating function, where
          // $$ is a function which creates components and renders them recursively.
          // first we can create all element components that can be reached
          // without recursion
          var stack = content.children.slice(0);
          while (stack.length) {
            var child = stack.shift();
            if (state.isCaptured(child) || child._isVirtualComponent) {
              continue;
            }
            if (!child._comp) {
              _create(state, child);
            }
            if (child._isVirtualHTMLElement && child.children.length > 0) {
              stack = stack.concat(child.children);
            }
            state.setCaptured(child);
          }
          state.setCaptured(content);
          // then we run comp.render($$) with a special $$ that captures VirtualComponent's
          // recursively
          var descendingContext = new DescendingContext(state, context);
          while (descendingContext.hasPendingCaptures()) {
            descendingContext.reset();
            comp.render(descendingContext.$$);
          }
        } else {
          // a VirtualComponent has its content as a VirtualHTMLElement
          // which needs to be captured recursively
          _capture(state, vel._content);
        }
      } else {
        state.setSkipped(vel);
      }
    } else if (vel._isVirtualHTMLElement) {
      for (var i = 0; i < vel.children.length; i++) {
        _capture(state, vel.children[i]);
      }
    }
    state.setCaptured(vel);
    return vel;
  }

  function _render(state, vel) {
    if (state.isSkipped(vel)) return;

    // before changes can be applied, a VirtualElement must have been captured
    console.assert(state.isCaptured(vel), 'VirtualElement must be captured before rendering');

    var comp = vel._comp;
    console.assert(comp && comp._isComponent, "A captured VirtualElement must have a component instance attached.");

    // VirtualComponents apply changes to its content element
    if (vel._isVirtualComponent) {
      _render(state, vel._content);
      return;
    }
    // render the element
    if (!comp.el) {
      comp.el = _createElement(vel);
      comp.el._comp = comp;
    }
    _updateElement(comp, vel);

    // structural updates are necessary only for HTML elements (without innerHTML set)
    if (vel._isVirtualHTMLElement && !vel.hasInnerHTML()) {
      var newChildren = vel.children;
      var oldComp, virtualComp, newComp;
      var pos1 = 0; var pos2 = 0;

      // HACK: removing all childNodes that are not owned by a component
      // this happened in Edge every 1s. Don't know why.
      // With this implementation all external DOM mutations will be eliminated
      var oldChildren = [];
      comp.el.getChildNodes().forEach(function(node) {
        var childComp = node._comp;
        // remove orphaned nodes and relocated components
        if (!childComp || state.isRelocated(childComp)) {
          comp.el.removeChild(node);
        } else {
          oldChildren.push(childComp);
        }
      });

      while(pos1 < oldChildren.length || pos2 < newChildren.length) {
        // skip detached components
        // Note: components get detached when preserved nodes
        // are found in a swapped order. Then the only way is
        // to detach one of them from the DOM, and reinsert it later at the new position
        do {
          oldComp = oldChildren[pos1++];
        } while (oldComp && (state.isDetached(oldComp)));

        virtualComp = newChildren[pos2++];
        // remove remaining old ones if no new one is left
        if (oldComp && !virtualComp) {
          while (oldComp) {
            _removeChild(state, comp, oldComp);
            oldComp = oldChildren[pos1++];
          }
          break;
        }

        // Try to reuse TextNodes to avoid unnecesary DOM manipulations
        if (oldComp && oldComp.el.isTextNode() &&
            virtualComp && virtualComp._isVirtualTextNode &&
            oldComp.el.textContent === virtualComp.text ) {
          continue;
        }

        if (!state.isRendered(virtualComp)) {
          _render(state, virtualComp);
        }

        newComp = virtualComp._comp;

        // ATTENTION: relocating a component does not update its context
        if (state.isRelocated(newComp)) {
          newComp._setParent(comp);
        }

        console.assert(newComp, 'Component instance should now be available.');
        // append remaining new ones if no old one is left
        if (virtualComp && !oldComp) {
          _appendChild(state, comp, newComp);
          continue;
        }
        // Differential update
        else if (state.isMapped(virtualComp)) {
          // identity
          if (newComp === oldComp) {
            // no structural change
          } else {
            // the order of elements with ref has changed
            state.setDetached(oldComp);
            _removeChild(state, comp, oldComp);
            pos2--;
          }
        }
        else if (state.isMapped(oldComp)) {
          _insertChildBefore(state, comp, newComp, oldComp);
          pos1--;
        } else {
          // both elements are not mapped
          // TODO: we could try to reuse components if they are of same type
          // However, this needs a better mapping strategy, not only
          // based on refs.
          _replaceChild(state, comp, oldComp, newComp);
        }
      }
    }

    // HACK: a temporary solution to handle refs owned by an ancestor
    // is to store them here as well, so that we can map virtual components
    // efficiently
    var refs = {};
    var foreignRefs = {};
    if (vel._context) {
      each$1(vel._context.refs, function(vel, ref) {
        refs[ref] = vel._comp;
      });
      each$1(vel._context.foreignRefs, function(vel, ref) {
        foreignRefs[ref] = vel._comp;
      });
    }
    comp.refs = refs;
    comp.__foreignRefs__ = foreignRefs;

    state.setRendered(vel);
  }

  function _triggerUpdate(state, vel) {
    if (vel._isVirtualComponent) {
      if (!state.isSkipped(vel)) {
        vel._content.children.forEach(_triggerUpdate.bind(null, state));
      }
      if (state.isUpdated(vel)) {
        vel._comp.didUpdate(state.getOldProps(vel), state.getOldState(vel));
      }
    } else if (vel._isVirtualHTMLElement) {
      vel.children.forEach(_triggerUpdate.bind(null, state));
    }
  }

  function _appendChild(state, parent, child) {
    parent.el.appendChild(child.el);
    _triggerDidMount(state, parent, child);
  }

  function _replaceChild(state, parent, oldChild, newChild) {
    parent.el.replaceChild(oldChild.el, newChild.el);
    if (!state.isDetached(oldChild)) {
      oldChild.triggerDispose();
    }
    _triggerDidMount(state, parent, newChild);
  }

  function _insertChildBefore(state, parent, child, before) {
    parent.el.insertBefore(child.el, before.el);
    _triggerDidMount(state, parent, child);
  }

  function _removeChild(state, parent, child) {
    parent.el.removeChild(child.el);
    if (!state.isDetached(child)) {
      child.triggerDispose();
    }
  }

  function _triggerDidMount(state, parent, child) {
    if (!state.isDetached(child) &&
        parent.isMounted() && !child.isMounted()) {
      child.triggerDidMount(true);
    }
  }

  /*
    Prepares a new virtual component by comparing it with
    the old version.

    It sets the _comp references in the new version where its ancestors
    can be mapped to corresponding virtual components in the old version.
  */
  function _prepareVirtualComponent(state, comp, vc) {
    var newRefs = {};
    var foreignRefs = {};
    // TODO: iron this out. refs are stored on the context
    // though, it would be cleaner if they were on the VirtualComponent
    // Where vc._owner would need to be a VirtualComponent and not a
    // component.
    if (vc._context) {
      newRefs = vc._context.refs;
      foreignRefs = vc._context.foreignRefs;
    }
    var oldRefs = comp.refs;
    var oldForeignRefs = comp.__foreignRefs__;
    // map virtual components to existing ones
    each$1(newRefs, function(vc, ref) {
      var comp = oldRefs[ref];
      if (comp) _mapComponents(state, comp, vc);
    });
    each$1(foreignRefs, function(vc, ref) {
      var comp = oldForeignRefs[ref];
      if (comp) _mapComponents(state, comp, vc);
    });
  }

  /*
    This tries to map the virtual component to existing component instances
    by looking at the old and new refs, making sure that the element type is
    compatible.
    This is then applied to the ancestors leading to an implicit
    mapping of parent elements, which makes
  */

  function _mapComponents(state, comp, vc) {
    if (!comp && !vc) return true;
    if (!comp || !vc) return false;
    // Stop if one them has been mapped already
    // or the virtual element has its own component already
    // or if virtual element and component do not match semantically
    // Note: the owner component is mapped at very first, so this
    // recursion will stop at the owner at the latest.
    if (state.isMapped(vc) || state.isMapped(comp)) {
      return vc._comp === comp;
    }
    if (vc._comp) {
      if (vc._comp === comp) {
        state.setMapped(vc);
        state.setMapped(comp);
        return true;
      } else {
        return false;
      }
    }
    if (!_isOfSameType(comp, vc)) {
      return false;
    }

    vc._comp = comp;
    state.setMapped(vc);
    state.setMapped(comp);

    var canMapParent;
    var parent = comp.getParent();
    if (vc.parent) {
      canMapParent = _mapComponents(state, parent, vc.parent);
    }
    // to be able to support implicit retaining of elements
    // we need to propagate mapping through the 'preliminary' parent chain
    // i.e. not taking the real parents as rendered, but the Components into which
    // we have passed children (via vel.append() or vel.outlet().append())
    else if (vc._preliminaryParent) {
      while (parent && parent._isElementComponent) {
        parent = parent.getParent();
      }
      canMapParent = _mapComponents(state, parent, vc._preliminaryParent);
    }
    if (!canMapParent) {
      state.setRelocated(vc);
      state.setRelocated(comp);
    }
    return canMapParent;
  }

  function _isOfSameType(comp, vc) {
    return (
      (comp._isElementComponent && vc._isVirtualHTMLElement) ||
      (comp._isComponent && vc._isVirtualComponent && comp.constructor === vc.ComponentClass) ||
      (comp._isTextNodeComponent && vc._isVirtualTextNode)
    );
  }

  function _createElement(vel) {
    var el;
    // TODO: we need a element factory here
    // this is fine as long we have only one DOMElement implementation per platform
    if (vel._isVirtualTextNode) {
      el = DefaultDOMElement.createTextNode(vel.text);
    } else {
      el = DefaultDOMElement.createElement(vel.tagName);
    }
    return el;
  }

  function _updateElement(comp, vel) {
    if (comp._isTextNodeComponent) {
      comp.setTextContent(vel.text);
      return;
    }
    var el = comp.el;
    console.assert(el, "Component's element should exist at this point.");
    var tagName = el.getTagName();
    if (vel.tagName.toLowerCase() !== tagName) {
      el.setTagName(vel.tagName);
    }
    _updateHash({
      oldHash: el.getAttributes(),
      newHash: vel.getAttributes(),
      update: function(key, val) {
        el.setAttribute(key, val);
      },
      remove: function(key) {
        el.removeAttribute(key);
      }
    });
    _updateHash({
      oldHash: el.htmlProps,
      newHash: vel.htmlProps,
      update: function(key, val) {
        el.setProperty(key, val);
      },
      remove: function(key) {
        el.removeProperty(key);
      }
    });
    _updateListeners({
      el: el,
      oldListeners: el.getEventListeners(),
      newListeners: vel.getEventListeners()
    });

    // special treatment of HTML elements having custom innerHTML
    if (vel.hasInnerHTML()) {
      if (!el._hasInnerHTML) {
        el.empty();
        el.setInnerHTML(vel.getInnerHTML());
      } else {
        var oldInnerHTML = el.getInnerHTML();
        var newInnerHTML = vel.getInnerHTML();
        if (oldInnerHTML !== newInnerHTML) {
          el.setInnerHTML(newInnerHTML);
        }
      }
      el._hasInnerHTML = true;
    }
  }

  function _updateHash(args) {
    var newHash = args.newHash;
    var oldHash = args.oldHash || {};
    var updatedKeys = {};
    var update = args.update;
    var remove = args.remove;
    var key;
    for (key in newHash) {
      if (newHash.hasOwnProperty(key)) {
        var oldVal = oldHash[key];
        var newVal = newHash[key];
        updatedKeys[key] = true;
        if (oldVal !== newVal) {
          update(key, newVal);
        }
      }
    }
    for (key in oldHash) {
      if (oldHash.hasOwnProperty(key) && !updatedKeys[key]) {
        remove(key);
      }
    }
  }

  function _updateListeners(args) {
    var el = args.el;
    // NOTE: considering the low number of listeners
    // it is quicker to just remove all
    // and add again instead of computing the minimal update
    var newListeners = args.newListeners || [];
    el.removeAllEventListeners();
    for (var i=0; i<newListeners.length;i++) {
      el.addEventListener(newListeners[i]);
    }
  }

  function DescendingContext(state, captureContext) {
    this.state = state;
    this.owner = captureContext.owner;
    this.refs = {};
    this.foreignRefs = {};
    this.elements = captureContext.elements;
    this.pos = 0;
    this.updates = captureContext.components.length;
    this.remaining = this.updates;

    this.$$ = this._createComponent.bind(this);
  }
  DescendingContext.Prototype = function() {

    this._createComponent = function() {
      var state = this.state;
      var vel = this.elements[this.pos++];
      // only capture VirtualComponent's with a captured parent
      // all others have been captured at this point already
      // or will either be captured by a different owner
      if (!state.isCaptured(vel) && vel._isVirtualComponent &&
           vel.parent && state.isCaptured(vel.parent)) {
        _capture(state, vel);
        this.updates++;
        this.remaining--;
      }
      // Note: we return a new VirtualElement so that the render method does work
      // as expected.
      // TODO: instead of creating a new VirtualElement each time, we could return
      // an immutable wrapper for the already recorded element.
      vel = VirtualElement.createElement.apply(this, arguments);
      // these variables need to be set make the 'ref()' API work
      vel._context = this;
      vel._owner = this.owner;
      // Note: important to deactivate these methods as otherwise the captured
      // element will be damaged when calling el.append()
      vel._attach = function() {};
      vel._detach = function() {};
      return vel;
    };
    this.hasPendingCaptures = function() {
      return this.updates > 0 && this.remaining > 0;
    };
    this.reset = function() {
      this.pos = 0;
      this.updates = 0;
    };
    this._ancestorsReady = function(vel) {
      while (vel) {
        if (this.state.isCaptured(vel) ||
            // TODO: iron this out
            vel === this.owner || vel === this.owner._content) {
          return true;
        }
        vel = vel.parent;
      }
      return false;
    };
  };
  oo.initClass(DescendingContext);

  RenderingEngine._internal = {
    _capture: _capture,
    _wrap: _createWrappingVirtualComponent,
  };

};

oo.initClass(RenderingEngine);

function CaptureContext(owner) {
  this.owner = owner;
  this.refs = {};
  this.foreignRefs = {};
  this.elements = [];
  this.components = [];
  this.$$ = this._createComponent.bind(this);
  this.$$.capturing = true;
}

CaptureContext.prototype._createComponent = function() {
  var vel = VirtualElement.createElement.apply(this, arguments);
  vel._context = this;
  vel._owner = this.owner;
  if (vel._isVirtualComponent) {
    // virtual components need to be captured recursively
    this.components.push(vel);
  }
  this.elements.push(vel);
  return vel;
};

function _createWrappingVirtualComponent(comp) {
  var vel = new VirtualElement.Component(comp.constructor);
  vel._comp = comp;
  if (comp.__htmlConfig__) {
    vel._mergeHTMLConfig(comp.__htmlConfig__);
  }
  return vel;
}

RenderingEngine.createContext = function(comp) {
  var vel = _createWrappingVirtualComponent(comp);
  return new CaptureContext(vel);
};

function State() {
  this.poluted = [];
  this.id = "__"+uuid$1();
}

State.Prototype = function() {

  this.dispose = function() {
    var id = this.id;
    this.poluted.forEach(function(obj) {
      delete obj[id];
    });
  };

  this.set = function(obj, key, val) {
    var info = obj[this.id];
    if (!info) {
      info = {};
      obj[this.id] = info;
      this.poluted.push(obj);
    }
    info[key] = val;
  };

  this.get = function(obj, key) {
    var info = obj[this.id];
    if (info) {
      return info[key];
    }
  };

  this.setMapped = function(c) {
    this.set(c, 'mapped', true);
  };


  this.isMapped = function(c) {
    return Boolean(this.get(c, 'mapped'));
  };

  this.setRelocated = function(c) {
    this.set(c, 'relocated', true);
  };

  this.isRelocated = function(c) {
    return Boolean(this.get(c, 'relocated'));
  };

  this.setDetached = function(c) {
    this.set(c, 'detached', true);
  };

  this.isDetached = function(c) {
    return Boolean(this.get(c, 'detached'));
  };

  this.setCaptured = function(vc) {
    this.set(vc, 'captured', true);
  };

  this.isCaptured = function(vc) {
    return Boolean(this.get(vc, 'captured'));
  };

  this.setNew = function(vc) {
    this.set(vc, 'created', true);
  };

  this.isNew = function(vc) {
    return Boolean(this.get(vc, 'created'));
  };

  this.setUpdated = function(vc) {
    this.set(vc, 'updated', true);
  };

  this.isUpdated = function(vc) {
    return Boolean(this.get(vc, 'updated'));
  };

  this.setSkipped = function(vc) {
    this.set(vc, 'skipped', true);
  };

  this.isSkipped = function(vc) {
    return Boolean(this.get(vc, 'skipped'));
  };

  this.setRendered = function(vc) {
    this.set(vc, 'rendered', true);
  };

  this.isRendered = function(vc) {
    return Boolean(this.get(vc, 'rendered'));
  };

  this.setOldProps = function(vc, oldProps) {
    this.set(vc, 'oldProps', oldProps);
  };

  this.getOldProps = function(vc) {
    return this.get(vc, 'oldProps');
  };

  this.setOldState = function(vc, oldState) {
    this.set(vc, 'oldState', oldState);
  };

  this.getOldState = function(vc) {
    return this.get(vc, 'oldState');
  };

};

oo.initClass(State);

RenderingEngine.State = State;

var __id__$5 = 0;

/**
  A light-weight component implementation inspired by React and Ember. In contrast to the
  large frameworks it does much less things automagically in favour of synchronous
  rendering and a minimalistic life-cycle. It also provides *up-tree*
  communication and *dependency injection*.

  Concepts:

  - `props` are provided by a parent component.  An initial set of properties is provided
  via constructor. After that, the parent component can call `setProps` or `extendProps`
  to update these properties which triggers rerendering if the properties change.

  - `state` is a set of flags and values which are used to control how the component
  gets rendered given the current props. Using `setState` the component can change
  its internal state, which leads to a rerendering if the state changes.

  - A child component with a `ref` id will be reused on rerender. All others will be
  wiped and rerender from scratch. If you want to preserve a grand-child (or lower), then
  make sure that all anchestors have a ref id. After rendering the child will be
  accessible via `this.refs[ref]`.

  - A component can send actions via `send` which are bubbled up through all parent
  components until one handles it.

  @class
  @abstract
  @extends ui/DOMElement
  @implements util/EventEmitter

  @example

  Define a component:

  ```
  var HelloMessage = Component.extend({
    render: function() {
      return $$('div').append(
        'Hello ',
        this.props.name
      );
    }
  });
  ```

  And mount it to a DOM Element:

  ```
    HelloMessage.mount({name: 'John'}, document.body);
  ```
*/
function Component(parent, props) {
  EventEmitter.call(this);
  this.__id__ = __id__$5++;

  this.parent = parent;
  this.el = null;
  this.refs = {};

  // HACK: a temporary solution to handle refs owned by an ancestor
  // is to store them here as well, so that we can map virtual components
  // efficiently
  this.__foreignRefs__ = {};
  this._actionHandlers = {};

  // context from parent (dependency injection)
  this.context = this._getContext() || {};
  Object.freeze(this.context);
  // setting props without triggering willReceiveProps
  this.props = props || {};
  Object.freeze(this.props);
  this.state = this.getInitialState() || {};
  Object.freeze(this.state);
}

Component.Prototype = function() {

  extend$1(this, EventEmitter.prototype);

  this._isComponent = true;

  /**
    Provides the context which is delivered to every child component. Override if you want to
    provide your own child context.

    @return object the child context
  */
  this.getChildContext = function() {
    return this.childContext || {};
  };

  /**
    Provide the initial component state.

    @return object the initial state
  */
  this.getInitialState = function() {
    return {};
  };

  /**
    Provides the parent of this component.

    @return object the parent component or null if this component does not have a parent.
  */
  this.getParent = function() {
    return this.parent;
  };

  this.getRoot = function() {
    var comp = this;
    var parent = comp;
    while (parent) {
      comp = parent;
      parent = comp.getParent();
    }
    return comp;
  };

  this.getNativeElement = function() {
    return this.el.getNativeElement();
  };

  /*
    Short hand for using labelProvider API
  */
  this.getLabel = function(name) {
    var labelProvider = this.context.labelProvider;
    if (!labelProvider) throw new Error('Missing labelProvider.');
    return labelProvider.getLabel(name);
  };

  this.getComponent = function(name) {
    var componentRegistry = this.context.componentRegistry;
    if (!componentRegistry) throw new Error('Missing componentRegistry.');
    return componentRegistry.get(name);
  };


  /**
    Render the component.

    ATTENTION: this does not create a DOM presentation but
    a virtual representation which is compiled into a DOM element later.

    Every Component should override this method.

    @param {Function} $$ method to create components
    @return {VirtualNode} VirtualNode created using $$
   */
  this.render = function($$) {
    /* istanbul ignore next */
    return $$('div');
  };

  this.mount = function(el) {
    if (!el) {
      throw new Error('Element is required.');
    }
    if (!this.el) {
      this._render();
    }
    if (!el._isDOMElement) {
      el = DefaultDOMElement.wrapNativeElement(el);
    }
    el.appendChild(this.el);
    if (el.isInDocument()) {
      this.triggerDidMount(true);
    }
    return this;
  };

  /**
   * Determines if Component.rerender() should be run after
   * changing props or state.
   *
   * The default implementation performs a deep equal check.
   *
   * @return a boolean indicating whether rerender() should be run.
   */
  this.shouldRerender = function(newProps) { // eslint-disable-line
    return true;
  };

  /**
   * Rerenders the component.
   *
   * Call this to manually trigger a rerender.
   */
  this.rerender = function() {
    this._rerender(this.props, this.state);
  };

  this._rerender = function(oldProps, oldState) {
    this._render(oldProps, oldState);
    // when this component is not mounted still trigger didUpdate()
    if (!this.isMounted()) {
      this.didUpdate(oldProps, oldState);
    }
  };

  this._render = function(oldProps, oldState) {
    if (this.__isRendering__) {
      throw new Error('Component is rendering already.');
    }
    this.__isRendering__ = true;
    try {
      var engine = new RenderingEngine();
      engine._render(this, oldProps, oldState);
    } finally {
      delete this.__isRendering__;
    }
  };

  /**
   * Triggers didMount handlers recursively.
   *
   * Gets called when using `component.mount(el)` on an element being
   * in the DOM already. Typically this is done for a root component.
   *
   * If this is not possible because you want to do things differently, make sure
   * you call 'component.triggerDidMount()' on root components.
   *
   * @param isMounted an optional param for optimization, it's used mainly internally
   * @private
   * @example
   *
   * ```
   * var frag = document.createDocumentFragment();
   * var comp = MyComponent.mount(frag);
   * ...
   * $('body').append(frag);
   * comp.triggerDidMount();
   * ```
   */
  this.triggerDidMount = function() {
    // Trigger didMount for the children first
    this.getChildren().forEach(function(child) {
      // We pass isMounted=true to save costly calls to Component.isMounted
      // for each child / grandchild
      child.triggerDidMount(true);
    });
    // To prevent from multiple calls to didMount, which can happen under
    // specific circumstances we use a guard.
    if (!this.__isMounted__) {
      this.__isMounted__ = true;
      this.didMount();
    }
  };

  /**
   * Called when the element is inserted into the DOM.
   *
   * Node: make sure that you call `component.mount(el)` using an element
   * which is already in the DOM.
   *
   * @example
   *
   * ```
   * var component = new MyComponent();
   * component.mount($('body')[0])
   * ```
   */
  this.didMount = function() {};


  /**
    Hook which is called after each rerender.
  */
  this.didUpdate = function() {};

  /**
    @return a boolean indicating if this component has been mounted
   */
  this.isMounted = function() {
    return this.__isMounted__;
  };

  /**
   * Triggers dispose handlers recursively.
   *
   * @private
   */
  this.triggerDispose = function() {
    this.getChildren().forEach(function(child) {
      child.triggerDispose();
    });
    this.dispose();
    this.__isMounted__ = false;
  };

  /**
    A hook which is called when the component is unmounted, i.e. removed from DOM, hence disposed
   */
  this.dispose = function() {};

  /*
    Attention: this is used when a preserved component is relocated.
    E.g., rendered with a new parent.
  */
  this._setParent = function(newParent) {
    this.parent = newParent;
    this.context = this._getContext() || {};
    Object.freeze(this.context);
  };

  /**
    Send an action request to the parent component, bubbling up the component
    hierarchy until an action handler is found.

    @param action the name of the action
    @param ... arbitrary number of arguments
    @returns {Boolean} true if the action was handled, false otherwise
    @example
  */
  this.send = function(action) {
    var comp = this;
    while(comp) {
      if (comp._actionHandlers && comp._actionHandlers[action]) {
        comp._actionHandlers[action].apply(comp, Array.prototype.slice.call(arguments, 1));
        return true;
      }
      comp = comp.getParent();
    }
    console.warn('Action', action, 'was not handled.');
    return false;
  };

  /**
    Define action handlers. Call this during construction/initialization of a component.

    @example

    ```
    function MyComponent() {
      Component.apply(this, arguments);
      ...
      this.handleActions({
       'openPrompt': this.openPrompt,
       'closePrompt': this.closePrompt
      });
    }
    ```
  */
  this.handleActions = function(actionHandlers) {
    each$1(actionHandlers, function(method, actionName) {
      this.handleAction(actionName, method);
    }.bind(this));
    return this;
  };

  /**
    Define an action handler. Call this during construction/initialization of a component.

    @param {String} action name
    @param {Functon} a function of this component.
  */
  this.handleAction = function(name, handler) {
    if (!name || !handler || !isFunction$1(handler)) {
      throw new Error('Illegal arguments.');
    }
    handler = handler.bind(this);
    this._actionHandlers[name] = handler;
  };

  /**
    Get the current component state

    @return {Object} the current state
  */
  this.getState = function() {
    return this.state;
  };

  /**
    Sets the state of this component, potentially leading to a rerender.

    Usually this is used by the component itself.
  */
  this.setState = function(newState) {
    var oldProps = this.props;
    var oldState = this.state;
    // Note: while setting props it is allowed to call this.setState()
    // which will not lead to an extra rerender
    var needRerender = !this.__isSettingProps__ &&
      this.shouldRerender(this.getProps(), newState);
    // triggering this to provide a possibility to look at old before it is changed
    this.willUpdateState(newState);
    this.state = newState || {};
    Object.freeze(this.state);
    if (needRerender) {
      this._rerender(oldProps, oldState);
    } else if (!this.__isSettingProps__) {
      this.didUpdate(oldProps, oldState);
    }
  };

  /**
    This is similar to `setState()` but extends the existing state instead of replacing it.
    @param {object} newState an object with a partial update.
  */
  this.extendState = function(newState) {
    newState = extend$1({}, this.state, newState);
    this.setState(newState);
  };

  /**
    Called before state is changed.
  */
  this.willUpdateState = function(newState) { // eslint-disable-line
  };

  /**
    Get the current properties

    @return {Object} the current state
  */
  this.getProps = function() {
    return this.props;
  };

  /**
    Sets the properties of this component, potentially leading to a rerender.

    @param {object} an object with properties
  */
  this.setProps = function(newProps) {
    var oldProps = this.props;
    var oldState = this.state;
    var needRerender = this.shouldRerender(newProps, this.state);
    this._setProps(newProps);
    if (needRerender) {
      this._rerender(oldProps, oldState);
    } else {
      this.didUpdate(oldProps, oldState);
    }
  };

  this._setProps = function(newProps) {
    newProps = newProps || {};
    // set a flag so that this.setState() can omit triggering render
    this.__isSettingProps__ = true;
    try {
      this.willReceiveProps(newProps);
      this.props = newProps || {};
      Object.freeze(newProps);
    } finally {
      delete this.__isSettingProps__;
    }
  };

  /**
    Extends the properties of the component, without reppotentially leading to a rerender.

    @param {object} an object with properties
  */
  this.extendProps = function(updatedProps) {
    var newProps = extend$1({}, this.props, updatedProps);
    this.setProps(newProps);
  };

  /**
    Hook which is called before properties are updated. Use this to dispose objects which will be replaced when properties change.

    For example you can use this to derive state from props.
    @param {object} newProps
  */
  this.willReceiveProps = function(newProps) { // eslint-disable-line
  };

  this.getChildNodes = function() {
    if (!this.el) return [];
    var childNodes = this.el.getChildNodes();
    childNodes = childNodes.map(_unwrapComp).filter(notNull);
    return childNodes;
  };

  this.getChildren = function() {
    if (!this.el) return [];
    var children = this.el.getChildren();
    children = children.map(_unwrapComp).filter(notNull);
    return children;
  };

  this.getChildAt = function(pos) {
    var node = this.el.getChildAt(pos);
    return _unwrapCompStrict(node);
  };

  this.find = function(cssSelector) {
    var el = this.el.find(cssSelector);
    return _unwrapComp(el);
  };

  this.findAll = function(cssSelector) {
    var els = this.el.findAll(cssSelector);
    return els.map(_unwrapComp).filter(notNull);
  };

  this.appendChild = function(child) {
    this.insertAt(this.getChildCount(), child);
  };

  this.insertAt = function(pos, childEl) {
    if (isString$1(childEl)) {
      childEl = new VirtualElement.TextNode(childEl);
    }
    if (!childEl._isVirtualElement) {
      throw new Error('Invalid argument: "child" must be a VirtualElement.');
    }
    var child = new RenderingEngine()._renderChild(this, childEl);
    this.el.insertAt(pos, child.el);
    _mountChild(this, child);
  };

  this.removeAt = function(pos) {
    var childEl = this.el.getChildAt(pos);
    if (childEl) {
      var child = _unwrapCompStrict(childEl);
      _disposeChild(child);
      this.el.removeAt(pos);
    }
  };

  this.removeChild = function(child) {
    if (!child || !child._isComponent) {
      throw new Error('removeChild(): Illegal arguments. Expecting a Component instance.');
    }
    // TODO: remove ref from owner
    _disposeChild(child);
    this.el.removeChild(child.el);
  };

  this.replaceChild = function(oldChild, newChild) {
    if (!newChild || !oldChild ||
        !newChild._isComponent || !oldChild._isComponent) {
      throw new Error('replaceChild(): Illegal arguments. Expecting BrowserDOMElement instances.');
    }
    // Attention: Node.replaceChild has weird semantics
    _disposeChild(oldChild);
    this.el.replaceChild(newChild.el, oldChild.el);
    if (this.isMounted()) {
      newChild.triggerDidMount(true);
    }
  };

  function _disposeChild(child) {
    child.triggerDispose();
    if (child._owner && child._ref) {
      console.assert(child._owner.refs[child._ref] === child, "Owner's ref should point to this child instance.");
      delete child._owner.refs[child._ref];
    }
  }

  function _mountChild(parent, child) {
    if (parent.isMounted()) {
      child.triggerDidMount(true);
    }
    if (child._owner && child._ref) {
      child._owner.refs[child._ref] = child;
    }
  }

  this.empty = function() {
    if (this.el) {
      this.getChildNodes().forEach(function(child) {
        _disposeChild(child);
      });
      this.el.empty();
    }
    return this;
  };

  this.remove = function() {
    _disposeChild(this);
    this.el.remove();
  };

  this._getContext = function() {
    var context = {};
    var parent = this.getParent();
    if (parent) {
      context = extend$1(context, parent.context);
      if (parent.getChildContext) {
        return extend$1(context, parent.getChildContext());
      }
    }
    return context;
  };

  this.addEventListener = function() {
    throw new Error("Not supported.");
  };

  this.removeEventListener = function() {
    throw new Error("Not supported.");
  };

  this.insertBefore = function() {
    throw new Error("Not supported.");
  };

};

DOMElement.Delegator.extend(Component);

DOMElement._defineProperties(Component, DOMElement._propertyNames);

function _unwrapComp(el) {
  if (el) return el._comp;
}

function _unwrapCompStrict(el) {
  console.assert(el._comp, "Expecting a back-link to the component instance.");
  return _unwrapComp(el);
}

function notNull(n) { return n; }

Component.unwrap = _unwrapComp;

Component.render = function(props) {
  props = props || {};
  var ComponentClass = this;
  var comp = new ComponentClass(null, props);
  comp._render();
  return comp;
};

Component.mount = function(props, el) {
  if (arguments.length === 1) {
    props = {};
    el = arguments[0];
  }
  if (!el) throw new Error("'el' is required.");
  if (isString$1(el)) {
    var selector = el;
    if (inBrowser) {
      el = window.document.querySelector(selector);
    } else {
      throw new Error("This selector is not supported on server side.");
    }
  }
  if (!el._isDOMElement) {
    el = new DefaultDOMElement.wrapNativeElement(el);
  }
  var ComponentClass = this;
  var comp = new ComponentClass(null, props);
  comp.mount(el);
  return comp;
};

function ElementComponent(parent, virtualComp) {
  if (!parent._isComponent) {
    throw new Error("Illegal argument: 'parent' must be a Component.");
  }
  if (!virtualComp._isVirtualHTMLElement) {
    throw new Error("Illegal argument: 'virtualComp' must be a VirtualHTMLElement.");
  }
  this.parent = parent;
  this.context = this._getContext() || {};
  Object.freeze(this.context);
}

ElementComponent.Prototype = function() {
  this._isElementComponent = true;
};

Component.extend(ElementComponent);
Component.Element = ElementComponent;

function TextNodeComponent(parent, virtualComp) {
  if (!parent._isComponent) {
    throw new Error("Illegal argument: 'parent' must be a Component.");
  }
  if (!virtualComp._isVirtualTextNode) {
    throw new Error("Illegal argument: 'virtualComp' must be a VirtualTextNode.");
  }
  this.parent = parent;
}

TextNodeComponent.Prototype = function() {
  this._isTextNodeComponent = true;

  this.setTextContent = function(text) {
    if (!this.el) {
      throw new Error('Component must be rendered first.');
    }
    if (this.el.textContent !== text) {
      var newEl = this.el.createTextNode(text);
      this.el._replaceNativeEl(newEl.getNativeElement());
    }
  };

  this.getChildNodes = function() {
    return [];
  };

  this.getChildren = function() {
    return [];
  };

};

Component.extend(TextNodeComponent);
Component.TextNode = TextNodeComponent;

Object.defineProperty(Component, '$$', {
  get: function() {
    throw new Error([
      "With Substance Beta 4 we introduced a breaking change.",
      "We needed to turn the former static Component.$$ into a contextualized implementation, which is now served via Component.render($$).",
      "FIX: change your signature of 'this.render()' in all your Components to 'this.render($$)"
    ].join("\n"));
  }
});

Component.unwrapDOMElement = function(el) {
  return _unwrapComp(el);
};

Component.getComponentFromNativeElement = function(nativeEl) {
  // while it sounds strange to wrap a native element
  // first, it makes sense after all, as DefaultDOMElement.wrapNativeElement()
  // provides the DOMElement instance of a previously wrapped native element.
  return _unwrapComp(DefaultDOMElement.wrapNativeElement(nativeEl));
};

/*
  @example

  ```js
  $$(Button, {
    name: 'add-ref' // used to resolve icon and label
    label: 'Add reference' // optional if you want to set the label string explicity
    hint: 'CTRL+5' // optional if you want to set the hint string explicitly
  })
  ```
*/
class Button extends Component {
  render($$) {
    let el = $$('button')
      .addClass('sc-button')

    if (this.props.icon) {
      el.append(this.renderIcon($$))
    }
    if (this.props.label) {
      el.append(this.renderLabel($$))
    }
    if (this.props.hint) {
      el.append(this.renderHint($$))
    }
    if (this.props.active) {
      el.addClass('sm-active')
    }
    if (!this.props.style) {
      el.addClass('sm-style-outline')
    } else {
      el.addClass('sm-style-'+this.props.style)
    }

    if (this.props.disabled) {
      // make button inaccessible
      el.attr('tabindex', -1)
        .attr('disabled', true)
    } else {
      // make button accessible for tab-navigation
      el.attr('tabindex', 1)
    }

    // Ability to inject additional elements
    // Should be avoided
    el.append(this.props.children)
    return el
  }

  renderIcon($$) {
    let iconEl = this.context.iconProvider.renderIcon($$, this.props.icon)
    return iconEl
  }

  renderLabel($$) {
    return $$('div').addClass('se-label').append(
      this.getLabel(this.props.label)
    )
  }

  renderHint($$) {
    return $$('div').addClass('se-hint').append(
      this.getLabel(this.props.hint)
    )
  }

  getLabel(name) {
    let labelProvider = this.context.labelProvider
    return labelProvider.getLabel(name)
  }
}

/**
  Default Tool implementation

  A tool must be associated with a Command, which holds all the logic, while the tool
  is just the visual representation of the command state.

  @class
  @component
*/
class Tool extends Component {

  get _isTool() {
    return true
  }

  /**
    Default tool rendering. You can override this method to provide your custom markup
  */
  render($$) {
    let el = $$('div')
      .addClass('se-tool')

    let customClassNames = this.getClassNames()
    if (customClassNames) {
      el.addClass(customClassNames)
    }

    let title = this.getTitle()
    if (title) {
      el.attr('title', title)
      el.attr('aria-label', title)
    }

    // Add button
    el.append(
      this.renderButton($$)
    )
    return el
  };

  renderButton($$) {
    let btn = $$(Button, {
      icon: this.props.icon,
      label: this.props.label,
      hint: this.props.hint,
      active: this.props.active,
      disabled: this.props.disabled,
      style: this.props.style
    }).on('click', this.onClick)
    return btn
  }

  getClassNames() {
    return ''
  }

  getTitle() {
    let labelProvider = this.context.labelProvider
    let title = this.props.title || labelProvider.getLabel(this.getName())
    // Used only by annotation tool so far
    if (this.props.mode) {
      title = [capitalize$1(this.props.mode), title].join(' ')
    }
    return title
  }

  /*
    For now always same as tool name
  */
  getCommandName() {
    return this.getName()
  }

  getName() {
    return this.props.name
  }

  onClick(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!this.props.disabled) this.performAction()
  }

  /**
    Executes the associated command
  */
  performAction(props) {
    this.context.commandManager.executeCommand(this.getCommandName(), extend$1({
      mode: this.props.mode
    }, props))
  }
}

/* eslint-disable strict */
var keys$2 = {
  UNDEFINED: 0,
  BACKSPACE: 8,
  DELETE: 46,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  END: 35,
  HOME: 36,
  TAB: 9,
  PAGEUP: 33,
  PAGEDOWN: 34,
  ESCAPE: 27,
  SHIFT: 16,
  SPACE: 32
};

/**
  SwitchTextTypeTool. Implements the SurfaceTool API.

  @class
  @component
*/
class SwitchTextTypeTool extends Tool {
  constructor(...args) {
    super(...args)

    // cursor for keyboard navigation
    this._navIdx = -1
  }

  // UI Specific parts
  // ----------------

  didMount(...args) {
    super.didMount(...args)

    this._focusToggle()
  }

  render($$) {
    let labelProvider = this.context.labelProvider
    let textTypeName = 'No selection'

    if (this.props.currentTextType) {
      textTypeName = this.props.currentTextType.name
    }
    let el = $$('div').addClass('sc-switch-text-type')

    let toggleButton = $$('button').ref('toggle')
      .addClass('se-toggle')
      .attr('title', labelProvider.getLabel('switch_text'))
      .append(labelProvider.getLabel(textTypeName))
      .on('click', this.toggleAvailableTextTypes)

    if (this.props.disabled || !this.props.currentTextType) {
      el.addClass('sm-disabled');
      toggleButton.attr('tabindex', -1)
    } else {
      toggleButton.attr('tabindex', 1)
    }

    el.append(toggleButton)

    if (this.state.open) {
      el.addClass('sm-open')

      // dropdown options
      let options = $$('div').addClass("se-options").ref('options')
      each$1(this.props.textTypes, function(textType) {
        let button = $$('button')
            .addClass('se-option sm-'+textType.name)
            .attr('data-type', textType.name)
            .append(labelProvider.getLabel(textType.name))
            .on('click', this.handleClick)
        options.append(button)
      }.bind(this))
      el.append(options)
      el.on('keydown', this.onKeydown)
    }

    return el
  }

  didUpdate() {
    this._focusToggle()
  }

  _focusToggle() {
    if (this.state.open) {
      this.refs.toggle.focus()
    }
  }

  executeCommand(textType) {
    this.context.commandManager.executeCommand(this.getCommandName(), {
      textType: textType
    })
  }

  getTextCommands() {
    let surface = this.getSurface()
    if (!this.textCommands && surface) {
      this.textCommands = surface.getTextCommands()
    }
    return this.textCommands || {}
  }

  handleClick(e) {
    e.preventDefault()
    // Modifies the tool's state so that state.open is undefined, which is nice
    // because it means the dropdown will be closed automatically
    this.executeCommand(e.currentTarget.dataset.type)
  }

  onKeydown(event) {
    let handled = false
    switch (event.keyCode) {
      case keys$2.UP:
        this._nav(-1)
        handled = true
        break
      case keys$2.DOWN:
        this._nav(1)
        handled = true
        break
      case keys$2.ESCAPE:
        this.toggleDropdown()
        handled = true
        break
      default:
        // nothing
    }
    if (handled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  toggleAvailableTextTypes(e) {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.disabled) return

    // HACK: This only updates the view state state.open is not set on the tool itself
    // That way the dropdown automatically closes when the selection changes
    this.toggleDropdown()
  }

  toggleDropdown() {
    // reset index for keyboard navigation
    this._navIdx = -1
    this.extendState({
      open: !this.state.open
    })
  }

  _nav(step) {
    this._navIdx += step
    this._navIdx = Math.max(0, this._navIdx)
    this._navIdx = Math.min(this._getOptionsCount()-1, this._navIdx)

    if (this._navIdx >= 0) {
      let option = this.refs.options.children[this._navIdx]
      option.focus()
    }
  }

  _getOptionsCount() {
    return this.refs.options.children.length
  }

}

SwitchTextTypeTool.command = 'switch-text-type'

class Undo extends Command {

  getCommandState(props, context) {
    let docSession = context.documentSession
    return {
      disabled: !docSession.canUndo(),
      active: false
    }
  }

  execute(props, context) {
    let docSession = context.documentSession
    if (docSession.canUndo()) {
      docSession.undo()
      return true
    }
    return false
  }

}

class Redo extends Command {

  getCommandState(props, context) {
    let docSession = context.documentSession
    return {
      disabled: !docSession.canRedo(),
      active: false
    }
  }

  execute(props, context) {
    let docSession = context.documentSession
    if (docSession.canRedo()) {
      docSession.redo()
      return true
    } else {
      return false
    }
  }

}

class ToolGroup extends Component {
  render($$) {
    let tools = this.props.tools
    let commandStates = this.props.commandStates
    let el = $$('div').addClass('sc-tool-group')
    el.addClass('sm-target-'+this.props.name)

    tools.forEach(function(tool, name) {
      let toolProps = Object.assign({}, commandStates[name])
      toolProps.name = name
      toolProps.icon = name
      toolProps.style = 'outline' // outline button style will be used
      el.append(
        $$(tool.Class, toolProps)
      )
    })
    return el
  }
}

/**
  @module

  Platform utilities such as browser detection etc.

  @example

  ```js
  import platform from 'substance/util/platform'
  ```
*/
var platform = {

  inBrowser: inBrowser,

  /**
    True if user agent is Internet Explorer or Microsoft Edge.
  */
  isIE: false,
  /**
    True if user agent is Firefox
  */

  isFF: false,

  isWebkit: false,

  /*
    Major version

    ATTENTION: at the moment only extracted for IE
  */
  version: -1,

  // TODO: make sure that this is implemented correctly

  isWindows: (inBrowser && window.navigator !== undefined && window.navigator.appVersion && window.navigator.appVersion.indexOf("Win") !== -1),

};

if (typeof window !== 'undefined') {
  // Detect Internet Explorer / Edge
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  var trident = ua.indexOf('Trident/');
  var edge = ua.indexOf('Edge/');

  if (msie > 0) {
    // IE 10 or older => return version number
    platform.isIE = true;
    platform.version = 10;
    // TODO: if we need someday, this would be the exact version number
    // parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  } else if (trident > 0) {
    // IE 11 => return version number
    platform.isIE = true;
    platform.version = 11;
    platform.isTrident = true;
    // TODO: if we need someday, this would be the exact version number
    // var rv = ua.indexOf('rv:');
    // parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  } else if (edge > 0) {
    // IE 12 => return version number
    platform.isIE = true;
    platform.isEdge = true;
    platform.version = 12;
    // TODO: if we need someday, this would be the exact version number
    parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // Detect Firefox
  platform.isFF = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  // TODO: explicit detection of Webkit&/Blink
  platform.isWebkit = !platform.isFF && !platform.isIE;
}

/*
  Calculate a bounding rectangle for a set of rectangles.

  Note: Here, `bounds.right` and `bounds.bottom` are relative to
  the left top of the viewport.
*/
function _getBoundingRect(rects) {
  var bounds = {
    left: Number.POSITIVE_INFINITY,
    top: Number.POSITIVE_INFINITY,
    right: Number.NEGATIVE_INFINITY,
    bottom: Number.NEGATIVE_INFINITY,
    width: Number.NaN,
    height: Number.NaN
  };

  forEach$1(rects, function(rect) {
    if (rect.left < bounds.left) {
      bounds.left = rect.left;
    }
    if (rect.top < bounds.top) {
      bounds.top = rect.top;
    }
    if (rect.left + rect.width > bounds.right) {
      bounds.right = rect.left + rect.width;
    }
    if (rect.top + rect.height > bounds.bottom) {
      bounds.bottom = rect.top + rect.height;
    }
  });
  bounds.width = bounds.right - bounds.left;
  bounds.height = bounds.bottom - bounds.top;
  return bounds;
}

/*
  Calculate the bounding rect of a single element relative to a parent.

  The rectangle dimensions are calculated as the union of the given elements
  clientRects. A selection fragment, for example, may appear as a multi-line span
  element that consists of a single client rect per line of text in variable widths.
*/
function _getBoundingOffsetsRect(el, relativeParentEl) {
  var relativeParentElRect = relativeParentEl.getBoundingClientRect();
  var elRect = _getBoundingRect(el.getClientRects());

  var left = elRect.left - relativeParentElRect.left;
  var top = elRect.top - relativeParentElRect.top;
  return {
    left: left,
    top: top,
    right: relativeParentElRect.width - left - elRect.width,
    bottom: relativeParentElRect.height - top - elRect.height,
    width: elRect.width,
    height: elRect.height
  };
}

/**
  Get bounding rectangle relative to a given parent element. Allows multiple
  elements being passed (we need this for selections that consist of multiple
  selection fragments). Takes a relative parent element that is used as a
  reference point, instead of the browser's viewport.

  @param {Array} els elements to compute the bounding rectangle for
  @param {DOMElement} containerEl relative parent used as a reference point
  @return {object} rectangle description with left, top, right, bottom, width and height
*/
function getRelativeBoundingRect(els, containerEl) {
  if (els.length === undefined) {
    els = [els];
  }
  var elRects = map$1(els, function(el) {
    return _getBoundingOffsetsRect(el, containerEl);
  });

  var elsRect = _getBoundingRect(elRects);
  var containerElRect = containerEl.getBoundingClientRect();
  return {
    left: elsRect.left,
    top: elsRect.top,
    right: containerElRect.width - elsRect.left - elsRect.width,
    bottom: containerElRect.height - elsRect.top - elsRect.height,
    width: elsRect.width,
    height: elsRect.height
  };
}

/**
  A rich scrollbar implementation that supports highlights.   Usually
  instantiated by {@link ScrollPane}, so you will likely not create it
  yourself.

  @class Scrollbar
  @component
  @private

  @prop {ui/ScrollPane} scrollPane scroll pane the scrollbar operates on
  @prop {object} highlights hightlights grouped by scope

  @example

  ```js
  $$(Scrollbar, {
    scrollPane: this,
    highlights: {
      'bib-items': ['bib-item-citation-1', 'bib-item-citation-2']
    }
  }).ref('scrollbar')
  ```
*/

class Scrollbar extends Component {

  didMount() {
    // do a full rerender when window gets resized
    DefaultDOMElement.getBrowserWindow().on('resize', this.onResize, this)
    // update the scroll handler on scroll
    this.props.scrollPane.on('scroll', this.onScroll, this)
    // TODO: why is this necessary here?
    setTimeout(function() {
      this.updatePositions()
    }.bind(this))
  }

  dispose() {
    DefaultDOMElement.getBrowserWindow().off(this)
    this.props.scrollPane.off(this)
  }

  didUpdate() {
    this.updatePositions()
  }

  render($$) {
    let el = $$('div')
      .addClass('sc-scrollbar')
      .on('mousedown', this.onMouseDown)

    if (this.props.highlights) {
      let highlightEls = []

      each$1(this.props.highlights, function(highlights, scope) {
        each$1(highlights, function(h) {
          highlightEls.push(
            $$('div').ref(h).addClass('se-highlight sm-'+scope)
          )
        })
      })

      el.append(
        $$('div').ref('highlights')
          .addClass('se-highlights')
          .append(highlightEls)
      )
    }
    el.append($$('div').ref('thumb').addClass('se-thumb'))
    return el
  }

  updatePositions() {
    let scrollPane = this.props.scrollPane
    let scrollableEl = scrollPane.getScrollableElement()
    let contentHeight = scrollPane.getContentHeight()
    let scrollPaneHeight = scrollPane.getHeight()
    let scrollTop = scrollPane.getScrollPosition()
    let contentEl = scrollPane.getContentElement()

    // Needed for scrollbar interaction
    this.factor = (contentHeight / scrollPaneHeight)

    // Update thumb
    this.refs.thumb.css({
      top: scrollTop / this.factor,
      height: scrollPaneHeight / this.factor
    })

    // If we have highlights, update them as well
    if (this.props.highlights) {
      // Compute highlights
      each$1(this.props.highlights,function(highlights) {
        each$1(highlights, function(nodeId) {
          let nodeEl = scrollableEl.find('*[data-id="'+nodeId+'"]')

          if (!nodeEl) return

          // Compute bounding rect relative to scroll pane content element
          let rect = getRelativeBoundingRect(nodeEl.getNativeElement(), contentEl.getNativeElement())
          let top = rect.top / this.factor
          let height = rect.height / this.factor

          // Use specified minHeight for highlights
          if (height < Scrollbar.overlayMinHeight) {
            height = Scrollbar.overlayMinHeight
          }

          let highlightEl = this.refs[nodeId]
          if (highlightEl) {
            this.refs[nodeId].css({
              top: top,
              height: height
            })
          } else {
            console.warn('no ref found for highlight', nodeId)
          }
        }.bind(this))
      }.bind(this))
    }
  }

  getScrollableElement() {
    return this.props.scrollPane.getScrollableElement()
  }

  onResize() {
    this.rerender()
  }

  onScroll() {
    this.updatePositions()
  }

  onMouseDown(e) {
    e.stopPropagation()
    e.preventDefault()
    this._mouseDown = true

    // temporarily, we bind to events on window level
    // because could leave the this element's area while dragging
    let _window = DefaultDOMElement.getBrowserWindow()
    _window.on('mousemove', this.onMouseMove, this)
    _window.on('mouseup', this.onMouseUp, this)

    let scrollBarOffset = this.el.getOffset().top
    let y = e.pageY - scrollBarOffset
    let thumbEl = this.refs.thumb.el
    if (e.target !== thumbEl.getNativeElement()) {
      // Jump to mousedown position
      this.offset = thumbEl.height / 2
      this.onMouseMove(e)
    } else {
      this.offset = y - thumbEl.getPosition().top
    }
  }

  // Handle Mouse Up
  onMouseUp() {
    this._mouseDown = false
    let _window = DefaultDOMElement.getBrowserWindow()
    _window.off('mousemove', this.onMouseMove, this)
    _window.off('mouseup', this.onMouseUp, this)
  }

  onMouseMove(e) {
    if (this._mouseDown) {
      let scrollPane = this.props.scrollPane
      let scrollableEl = scrollPane.getScrollableElement()
      let scrollBarOffset = this.el.getOffset().top
      let y = e.pageY - scrollBarOffset

      // find offset to visible-area.top
      let scroll = (y-this.offset)*this.factor
      scrollableEl.setProperty('scrollTop', scroll)
    }
  }

}

Scrollbar.overlayMinHeight = 2

/**
  OverlayContainer component

  Used internally by surface to place overlay relative to selection/cursor

  @class
  @component
*/
class OverlayContainer extends Component {
  constructor(...args) {
    super(...args)

    this.commandStates = this._getCommandStates()
  }

  render($$) {
    let el = $$('div').addClass('sc-overlay-container sm-hidden')
    let commandStates = this.context.commandManager.getCommandStates()
    let ComponentClass = this.props.overlay
    el.append($$(ComponentClass, {
      commandStates: commandStates
    }).ref('overlayContent'))
    return el
  }

  didMount() {
    // rerender the overlay content after anything else has been updated
    this.context.documentSession.on('didUpdate', this._onSessionDidUpdate, this)
  }

  dispose() {
    this.context.documentSession.off(this)
  }

  position(hints) {
    let content = this.refs.overlayContent
    if (content.isVisible()) {
      this._position(hints);
      this.el.removeClass('sm-hidden')
    }
  }

  _onSessionDidUpdate() {
    if (this.shouldRerender()) {
      this.rerender()
    }
  }

  _getCommandStates() {
    return this.context.commandManager.getCommandStates()
  }

  _position(hints) {
    if (hints) {
      let contentWidth = this.el.htmlProp('offsetWidth')
      let selectionMaxWidth = hints.rectangle.width

      // By default, Overlays are aligned center/bottom to the selection
      this.el.css('top', hints.rectangle.top + hints.rectangle.height)
      let leftPos = hints.rectangle.left + selectionMaxWidth/2 - contentWidth/2
      // Must not exceed left bound
      leftPos = Math.max(leftPos, 0)
      // Must not exceed right bound
      let maxLeftPos = hints.rectangle.left + selectionMaxWidth + hints.rectangle.right - contentWidth
      leftPos = Math.min(leftPos, maxLeftPos)
      this.el.css('left', leftPos)
    }
  }
}

/**
  Wraps content in a scroll pane.

  @class ScrollPane
  @component

  @prop {String} scrollbarType 'native' or 'substance' for a more advanced visual scrollbar. Defaults to 'native'
  @prop {String} [scrollbarPosition] 'left' or 'right' only relevant when scrollBarType: 'substance'. Defaults to 'right'
  @prop {ui/Highlights} [highlights] object that maintains highlights and can be manipulated from different sources
  @prop {ui/TOCProvider} [tocProvider] object that maintains table of content entries

  @example

  ```js
  $$(ScrollPane, {
    scrollbarType: 'substance', // defaults to native
    scrollbarPosition: 'left', // defaults to right
    onScroll: this.onScroll.bind(this),
    highlights: this.contentHighlights,
    tocProvider: this.tocProvider
  })
  ```
 */
class ScrollPane extends Component {

  /*
    Expose scrollPane as a child context
  */
  getChildContext() {
    return {
      scrollPane: this
    }
  }

  didMount() {
    if (this.refs.scrollbar && this.props.highlights) {
      this.props.highlights.on('highlights:updated', this.onHighlightsUpdated, this)
    }
    // HACK: Scrollbar should use DOMMutationObserver instead
    if (this.refs.scrollbar) {
      this.context.doc.on('document:changed', this.onDocumentChange, this, { priority: -1 })
    }

    this.handleActions({
      'updateOverlayHints': this._updateOverlayHints
    })
  }

  dispose() {
    if (this.props.highlights) {
      this.props.highlights.off(this)
    }
    this.context.doc.off(this)
  }

  render($$) {
    let el = $$('div')
      .addClass('sc-scroll-pane')
    let overlay

    if (platform.isFF) {
      el.addClass('sm-firefox')
    }

    // Initialize Substance scrollbar (if enabled)
    if (this.props.scrollbarType === 'substance') {
      el.addClass('sm-substance-scrollbar')
      el.addClass('sm-scrollbar-position-'+this.props.scrollbarPosition)

      el.append(
        // TODO: is there a way to pass scrollbar highlights already
        // via props? Currently the are initialized with a delay
        $$(Scrollbar, {
          scrollPane: this
        }).ref('scrollbar')
          .attr('id', 'content-scrollbar')
      )

      // Scanline is debugging purposes, display: none by default.
      el.append(
        $$('div').ref("scanline").addClass('se-scanline')
      )
    }

    if (this.props.overlay) {
      let componentRegistry = this.context.componentRegistry
      // TODO: rework this. ATM we have a component `ui/Overlay`
      // which does the positioning and gets a prop `overlay` being
      // the actual, custom component to render the content.
      // Hard-wiring the internal class for now, as all current implementations
      // use the same impl.
      overlay = $$(OverlayContainer, {
        overlay: this.props.overlay
      }).ref('overlay')
    }

    el.append(
      $$('div').ref('scrollable').addClass('se-scrollable').append(
        $$('div').ref('content').addClass('se-content')
          .append(overlay)
          .append(
            this.props.children
          )
      ).on('scroll', this.onScroll)
    )
    return el
  }

  _updateOverlayHints(overlayHints) {
    // Remember overlay hints for next update
    let overlay = this.refs.overlay
    if (overlay) {
      overlay.position(overlayHints)
    }
  }

  // HACK: Scrollbar should use DOMMutationObserver instead
  onDocumentChange() {
    this.refs.scrollbar.updatePositions()
  }

  onHighlightsUpdated(highlights) {
    this.refs.scrollbar.extendProps({
      highlights: highlights
    })
  }

  onScroll() {
    let scrollPos = this.getScrollPosition()
    let scrollable = this.refs.scrollable
    if (this.props.onScroll) {
      this.props.onScroll(scrollPos, scrollable)
    }
    // Update TOCProvider given
    if (this.props.tocProvider) {
      this.props.tocProvider.markActiveEntry(this)
    }
    this.emit('scroll', scrollPos, scrollable)
  }

  /**
    Returns the height of scrollPane (inner content overflows)
  */
  getHeight() {
    let scrollableEl = this.getScrollableElement()
    return scrollableEl.height
  }

  /**
    Returns the cumulated height of a panel's content
  */
  getContentHeight() {
    let contentHeight = 0
    let contentEl = this.refs.content.el
    contentEl.childNodes.forEach(function(el) {
      contentHeight += el.getOuterHeight()
    })
    return contentHeight
  }

  /**
    Get the `.se-content` element
  */
  getContentElement() {
    return this.refs.content.el
  }

  /**
    Get the `.se-scrollable` element
  */
  getScrollableElement() {
    return this.refs.scrollable.el
  }

  /**
    Get current scroll position (scrollTop) of `.se-scrollable` element
  */
  getScrollPosition() {
    let scrollableEl = this.getScrollableElement()
    return Math.floor(scrollableEl.getProperty('scrollTop') + 1)
  }

  /**
    Get offset relative to `.se-content`.

    @param {DOMNode} el DOM node that lives inside the
  */
  getPanelOffsetForElement(el) {
    let nativeEl = el.el
    let contentContainerEl = this.refs.content.el.el
    let rect = getRelativeBoundingRect(nativeEl, contentContainerEl)
    return rect.top
  }

  /**
    Scroll to a given sub component.

    @param {String} componentId component id, must be present in data-id attribute
  */
  scrollTo(componentId) {
    let scrollableEl = this.getScrollableElement()
    let targetNode = scrollableEl.find('*[data-id="'+componentId+'"]')
    if (targetNode) {
      let offset = this.getPanelOffsetForElement(targetNode)
      scrollableEl.setProperty('scrollTop', offset)
    } else {
      console.warn(componentId, 'not found in scrollable container')
    }
  }
}

var ScrollPanePackage = {
  name: 'scroll-pane',
  configure: function(config) {
    config.addComponent('scroll-pane', ScrollPane)
  }
}

/**
  A split view layout component. Takes properties for configuration and 2 children via append.

  @class SplitPane
  @component

  @prop {String} splitType either 'vertical' (default) or 'horizontal'.
  @prop {String} sizeA size of the first pane (A). '40%' or '100px' or 'inherit' are valid values.
  @prop {String} sizeB size of second pane. sizeA and sizeB can not be combined.

  @example

  ```js
  $$(SplitPane, {
    sizeA: '30%',
    splitType: 'horizontal'
  }).append(
    $$('div').append('Pane A'),
    $$('div').append('Pane B')
  )
  ```
*/

class SplitPane extends Component {

  render($$) {
    if (this.props.children.length !== 2) {
      throw new Error('SplitPane only works with exactly two child elements')
    }

    let el = $$('div').addClass('sc-split-pane')
    if (this.props.splitType === 'horizontal') {
      el.addClass('sm-horizontal')
    } else {
      el.addClass('sm-vertical')
    }

    let paneA = this.props.children[0]
    let paneB = this.props.children[1]

    // Apply configured size either to pane A or B.
    if (this.props.sizeB) {
      paneB.addClass('se-pane sm-sized')
      paneB.css(this.getSizedStyle(this.props.sizeB))
      paneA.addClass('se-pane sm-auto-fill')
    } else {
      paneA.addClass('se-pane sm-sized')
      paneA.css(this.getSizedStyle(this.props.sizeA))
      paneB.addClass('se-pane sm-auto-fill')
    }

    el.append(
      paneA,
      paneB
    )
    return el
  }

  // Accepts % and px units for size property
  getSizedStyle(size) {
    if (!size || size === 'inherit') return {}
    if (this.props.splitType === 'horizontal') {
      return {'height': size}
    } else {
      return {'width': size}
    }
  }

}

var SplitPanePackage = {
  name: 'split-pane',
  configure: function(config) {
    config.addComponent('split-pane', SplitPane)
  }
}

/**
  A tabbed pane layout component. The actual content is specified via append.

  @class TabbedPane
  @component

  @prop {Object[]} tabs an array of objects with id and name properties
  @prop {String} activeTab id of currently active tab

  @example

  ```js
  $$(TabbedPane, {
    tabs: [
      {id: 'tabA', 'A'},
      {id: 'tabB', 'B'},
    ],
    activeTab: 'tabA'
  }).ref('tabbedPane').append(
    tabAContent
  )
  ```
*/

class TabbedPane extends Component {

  render($$) {
    let el = $$('div').addClass('sc-tabbed-pane')
    let tabsEl = $$('div').addClass('se-tabs')
    each$1(this.props.tabs, function(tab) {
      let tabEl = $$('a')
        .addClass("se-tab")
        .attr({
          href: "#",
          "data-id": tab.id,
        })
        .on('click', this.onTabClicked)
      if (tab.id === this.props.activeTab) {
        tabEl.addClass("sm-active")
      }
      tabEl.append(
        $$('span').addClass('label').append(tab.name)
      )
      tabsEl.append(tabEl)
    }.bind(this))

    el.append(tabsEl)
    // Active content
    el.append(
      $$('div').addClass('se-tab-content').ref('tabContent').append(
        this.props.children
      )
    )
    return el
  }

  onTabClicked(e) {
    e.preventDefault()
    let tabId = e.currentTarget.dataset.id
    this.send('switchTab', tabId)
  }
}

var TabbedPanePackage = {
  name: 'tabbed-pane',
  configure: function(config) {
    config.addComponent('tabbed-pane', TabbedPane)
  }
}

var ScrollbarPackage = {
  name: 'scrollbar',
  configure: function(config) {
    config.addComponent('scrollbar', Scrollbar)
  }
}

/*
  Simple component for realizing grid layouts
*/
class Grid extends Component {
  render($$) {
    let el = $$('div').addClass('sc-grid')
    if (this.props.mobile) {
      el.addClass('sm-mobile')
    }
    el.append(this.props.children)
    return el
  }
}

/*
  A grid row
*/
class Row extends Component {
  render($$) {
    let el = $$('div').addClass('se-row')
    el.append(this.props.children)
    return el
  }
}

/*
  A grid cell
*/
class Cell extends Component {
  render($$) {
    let el = $$('div').addClass('se-cell')
    el.addClass('sm-column-'+this.props.columns)
    el.append(this.props.children)
    return el
  }
}

Grid.Row = Row
Grid.Cell = Cell

var GridPackage = {
  name: 'grid',
  configure: function(config) {
    config.addComponent('grid', Grid)
  }
}

/**
  Modal dialog component

  @class
  @component

  @prop {String} width 'small', 'medium', 'large' and 'full'

  @example

  ```js
  var form = $$(Modal, {
    width: 'medium',
    textAlign: 'center'
  });
  ```
*/
class Modal extends Component {

  render($$) {
    let el = $$('div').addClass('sc-modal')

    // TODO: don't think that this is good enough. Right the modal is closed by any unhandled click.
    // Need to be discussed.
    el.on('click', this._closeModal)

    if (this.props.width) {
      el.addClass('sm-width-'+this.props.width)
    }

    el.append(
      $$('div').addClass('se-body').append(
        this.props.children
      )
    )
    return el
  }

  _closeModal(e) {
    let closeSurfaceClick = e.target.classList.contains('sc-modal')
    if (closeSurfaceClick) {
      this.send('closeModal')
    }
  }

}

var ModalPackage = {
  name: 'modal',
  configure: function(config) {
    config.addComponent('modal', Modal)
  }
}

class Input extends Component {

  _onChange() {
    let documentSession = this.context.documentSession
    let path = this.props.path
    let newVal = this.el.val()

    documentSession.transaction(function(tx) {
      tx.set(path, newVal)
    })
  }

  render($$) {
    let val

    if (this.props.path) {
      let documentSession = this.context.documentSession
      let doc = documentSession.getDocument()
      val = doc.get(this.props.path)
    } else {
      val = this.props.value
    }

    let el = $$('input').attr({
      value: val,
      type: this.props.type,
      placeholder: this.props.placeholder
    })
    .addClass('sc-input')

    if (this.props.path) {
      el.on('change', this._onChange)
    }

    if (this.props.centered) {
      el.addClass('sm-centered')
    }

    return el
  }
}

var InputPackage = {
  name: 'input',
  configure: function(config) {
    config.addComponent('input', Input)
  }
}

var ButtonPackage = {
  name: 'button',
  configure: function(config) {
    config.addComponent('button', Button)
  }
}

var BasePackage = {
  name: 'base',
  configure: function(config) {
    config.import(ScrollPanePackage)
    config.import(SplitPanePackage)
    config.import(TabbedPanePackage)
    config.import(ScrollbarPackage)
    config.import(GridPackage)
    config.import(ModalPackage)
    config.import(InputPackage)
    config.import(ButtonPackage)

    // Register class to handle the text tool target
    config.addComponent('tool-target-text', ToolGroup)
    config.addComponent('tool-target-document', ToolGroup)

    // Commands
    config.addCommand('undo', Undo)
    config.addCommand('redo', Redo)
    config.addCommand('switch-text-type', SwitchTextTypeCommand)
    // Tools
    config.addTool('undo', Tool, {target: 'document'})
    config.addTool('redo', Tool, {target: 'document'})
    config.addTool('switch-text-type', SwitchTextTypeTool, {target: 'text'})

    // Icons
    config.addIcon('undo', { 'fontawesome': 'fa-undo' })
    config.addIcon('redo', { 'fontawesome': 'fa-repeat' })
    config.addIcon('edit', { 'fontawesome': 'fa-cog' })
    config.addIcon('delete', { 'fontawesome': 'fa-times' })
    config.addIcon('expand', { 'fontawesome': 'fa-arrows-h' })
    config.addIcon('truncate', { 'fontawesome': 'fa-arrows-h' })
    // Labels
    config.addLabel('undo', {
      en: 'Undo',
      de: 'Rückgängig'
    })
    config.addLabel('redo', {
      en: 'Redo',
      de: 'Wiederherstellen'
    })
    config.addLabel('container-selection', {
      en: 'Container',
      de: 'Container'
    })
    config.addLabel('container', {
      en: 'Container',
      de: 'Container'
    })
    config.addLabel('insert-container', {
      en: 'Insert Container',
      de: 'Container einfügen'
    })
  }
}

class Blockquote extends TextBlock {}

Blockquote.type = "blockquote"

class NodeComponent extends Component {

  render($$) {
    let tagName = this.getTagName()
    let el = $$(tagName)
      .attr('data-id', this.props.node.id)
      .addClass(this.getClassNames())
    return el
  }

  getTagName() {
    return 'div'
  }

  getClassNames() {
    return ''
  }

}

/**
  Renders an annotation. Used internally by different components (e.g. ui/AnnotatedTextComponent)

  @class
  @component
  @extends ui/Component

  @prop {Object} doc document
  @prop {Object} node node which describes annotation

  @example

  ```js
  $$(AnnotationComponent, {
    doc: doc,
    node: node
  })
  ```
*/

class AnnotationComponent extends Component {

  // TODO: we should avoid to have a didMount hook on an abstract base class
  didMount() {
    let node = this.props.node
    node.on('highlighted', this.onHighlightedChanged, this)
  }

  // TODO: we should avoid to have a didMount hook on an abstract base class
  dispose() {
    let node = this.props.node
    node.off(this)
  }

  render($$) {
    let el = $$('span')
      .attr("data-id", this.props.node.id)
      .addClass(this.getClassNames())
    if (this.props.node.highlighted) {
      el.addClass('sm-highlighted')
    }
    el.append(this.props.children)
    return el
  }

  getClassNames() {
    return 'sc-'+this.props.node.type
  }

  onHighlightedChanged() {
    if (this.props.node.highlighted) {
      this.el.addClass('sm-highlighted')
    } else {
      this.el.removeClass('sm-highlighted')
    }
  }

}

var _baseClamp = createCommonjsModule(function (module) {
/**
 * The base implementation of `_.clamp` which doesn't coerce arguments to numbers.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

module.exports = baseClamp;
});

var _baseClamp$1 = interopDefault(_baseClamp);


var require$$3$19 = Object.freeze({
	default: _baseClamp$1
});

var startsWith = createCommonjsModule(function (module) {
var baseClamp = interopDefault(require$$3$19),
    baseToString = interopDefault(require$$2$17),
    toInteger = interopDefault(require$$1$25),
    toString = interopDefault(require$$0$31);

/**
 * Checks if `string` starts with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to search.
 * @param {string} [target] The string to search for.
 * @param {number} [position=0] The position to search from.
 * @returns {boolean} Returns `true` if `string` starts with `target`,
 *  else `false`.
 * @example
 *
 * _.startsWith('abc', 'a');
 * // => true
 *
 * _.startsWith('abc', 'b');
 * // => false
 *
 * _.startsWith('abc', 'b', 1);
 * // => true
 */
function startsWith(string, target, position) {
  string = toString(string);
  position = baseClamp(toInteger(position), 0, string.length);
  return string.lastIndexOf(baseToString(target), position) == position;
}

module.exports = startsWith;
});

var startsWith$1 = interopDefault(startsWith);

function createSurfaceId(surface) {
  var surfaceParent = surface._getSurfaceParent();
  if (surfaceParent) {
    return surfaceParent.getId() + '/' + surface.name;
  } else {
    return surface.name;
  }
}

class IsolatedNodeComponent extends Component {
  constructor(...args) {
    super(...args)

    this.name = this.props.node.id
    this._id = createSurfaceId(this)
    this._state = {
      selectionFragment: null
    }

    this.handleAction('escape', this._escape)
    this.ContentClass = this._getContentClass(this.props.node) || Component
  }

  get _isIsolatedNodeComponent() {
    return true
  }

  get __elementTag() {
    return 'div'
  }

  get __slugChar() {
    return "|"
  }

  getChildContext() {
    return {
      surfaceParent: this
    }
  }

  getInitialState() {
    let selState = this.context.documentSession.getSelectionState()
    return this._deriveStateFromSelectionState(selState)
  }

  didMount() {
    super.didMount.call(this);

    let docSession = this.context.documentSession
    docSession.on('update', this.onSessionUpdate, this)
  }

  dispose() {
    super.dispose.call(this)

    let docSession = this.context.documentSession
    docSession.off(this)
  }

  getClassNames() {
    return 'sc-isolated-node'
  }

  render($$) {
    let node = this.props.node
    let ContentClass = this.ContentClass
    // console.log('##### IsolatedNodeComponent.render()', $$.capturing);
    let el = super.render.apply(this, arguments)
    el.tagName = this.__elementTag
    el.addClass(this.getClassNames())
      .addClass('sm-'+this.props.node.type)
      .attr("data-id", node.id)

    let disabled = this.isDisabled()

    if (this.state.mode) {
      el.addClass('sm-'+this.state.mode)
    } else {
      el.addClass('sm-not-selected')
    }

    if (!ContentClass.noStyle) {
      el.addClass('sm-default-style')
    }

    // shadowing handlers of the parent surface
    // TODO: extract this into a helper so that we can reuse it anywhere where we want
    // to prevent propagation to the parent surface
    el.on('keydown', this.onKeydown)
      .on('mousedown', this._stopPropagation)
      .on('keypress', this._stopPropagation)
      .on('keyup', this._stopPropagation)
      .on('compositionstart', this._stopPropagation)
      .on('textInput', this._stopPropagation)

    el.append(
      $$(this.__elementTag).addClass('se-slug').addClass('sm-before').ref('before')
        // NOTE: better use a regular character otherwise Edge has problems
        .append(this.__slugChar)
    )

    let level = this._getLevel()

    let container = $$(this.__elementTag).addClass('se-container')
      .attr('contenteditable', false)
      .css({ 'z-index': 2*level })

    if (ContentClass.fullWidth) {
      container.addClass('sm-full-width')
    }

    if (this.state.mode === 'cursor' && this.state.position === 'before') {
      container.append(
        $$(this.__elementTag).addClass('se-cursor').addClass('sm-before').attr('contenteditable', false)
      )
    }
    container.append(this.renderContent($$, node))

    if (disabled) {
      container.addClass('sm-disabled')
      if (this.shouldRenderBlocker()) {
        // NOTE: there are some content implementations which work better without a blocker
        let blocker = $$(this.__elementTag).addClass('se-blocker')
          .css({ 'z-index': 2*level+1 })
        container.append(blocker)
      }
      if (this.shouldSelectOnClick()) {
        // select the node on click
        el.on('click', this.onClick)
      }
    }

    if (this.context.dragManager &&
        this.state.mode !== 'focused' &&
        this.state.mode !== 'co-focused') {
      el.attr("draggable", true);
      el.on('dragstart', this.onDragStart)
        .on('dragenter', this.onDragEnter)
        .on('dragover', this.onDragOver)
        .on('drop', this.onDrop)
    }

    if (this.state.mode === 'cursor' && this.state.position === 'after') {
      container.append(
        $$(this.__elementTag).addClass('se-cursor').addClass('sm-after').attr('contenteditable', false)
      );
    }

    el.append(container)
    el.append(
      $$(this.__elementTag).addClass('se-slug').addClass('sm-after').ref('after')
        // NOTE: better use a regular character otherwise Edge has problems
        .append(this.__slugChar)
    )
    return el
  }

  renderContent($$, node) {
    let ComponentClass = this.ContentClass
    if (!ComponentClass) {
      console.error('Could not resolve a component for type: ' + node.type)
      return $$(this.__elementTag)
    } else {
      let props = {
        node: node,
        disabled: this.isDisabled(),
        isolatedNodeState: this.state.mode
      }
      if (this.state.mode === 'focused') {
        props.focused = true;
      }
      return $$(ComponentClass, props).ref('content')
    }
  }

  shouldRenderBlocker() {
    return true
  }

  shouldSelectOnClick() {
    return this.state.mode !== 'focused' && this.state.mpde !== 'co-focused'
  }

  getId() {
    return this._id
  }

  getMode() {
    return this.state.mode
  }

  isNotSelected() {
    return !this.state.mode
  }

  isSelected() {
    return this.state.mode === 'selected'
  }

  isCoSelected() {
    return this.state.mode === 'co-selected'
  }

  isFocused() {
    return this.state.mode === 'focused'
  }

  isCoFocused() {
    return this.state.mode === 'co-focused'
  }

  _getContentClass(node) {
    let componentRegistry = this.context.componentRegistry
    let ComponentClass = componentRegistry.get(node.type)
    return ComponentClass
  }

  isDisabled() {
    return !this.state.mode || ['co-selected', 'cursor'].indexOf(this.state.mode) > -1;
  }

  _getSurfaceParent() {
    return this.context.surface
  }

  _getLevel() {
    let level = 1;
    let parent = this._getSurfaceParent()
    while (parent) {
      level++
      parent = parent._getSurfaceParent()
    }
    return level
  }

  onSessionUpdate(update) {
    if (update.selection) {
      let documentSession = this.context.documentSession
      let newState = this._deriveStateFromSelectionState(documentSession.getSelectionState())
      if (!newState && this.state.mode) {
        this.extendState({ mode: null })
      } else if (newState && newState.mode !== this.state.mode) {
        this.extendState(newState)
      }
    }
  }

  _deriveStateFromSelectionState(selState) {
    let sel = selState.getSelection()
    let surfaceId = sel.surfaceId
    if (!surfaceId) return
    let id = this.getId()
    let nodeId = this.props.node.id
    let parentId = this._getSurfaceParent().getId()
    let inParentSurface = (surfaceId === parentId)
    // detect cases where this node is selected or co-selected by inspecting the selection
    if (inParentSurface) {
      if (sel.isNodeSelection() && sel.getNodeId() === nodeId) {
        if (sel.isFull()) {
          return { mode: 'selected' }
        } else if (sel.isBefore()) {
          return { mode: 'cursor', position: 'before' }
        } else if (sel.isAfter()) {
          return { mode: 'cursor', position: 'after' }
        }
      }
      if (sel.isContainerSelection() && sel.containsNodeFragment(nodeId)) {
        return { mode: 'co-selected' }
      }
      return
    }
    if (sel.isCustomSelection() && id === surfaceId) {
      return { mode: 'focused' }
    }
    // HACK: a looks a bit hacky. Fine for now.
    // TODO: we should think about switching to surfacePath, instead of surfaceId
    else if (startsWith$1(surfaceId, id)) {
      let path1 = id.split('/')
      let path2 = surfaceId.split('/')
      let len1 = path1.length
      let len2 = path2.length
      if (len2 > len1 && path1[len1-1] === path2[len1-1]) {
        if (len2 === len1 + 1) {
          return { mode: 'focused' }
        } else {
          return { mode: 'co-focused' }
        }
      } else {
        return null
      }
    }
  }

  onMousedown(event) {
    // console.log('IsolatedNodeComponent.onMousedown', this.getId());
    event.stopPropagation()
  }

  onClick(event) {
    event.preventDefault()
    this._selectNode()
  }

  onKeydown(event) {
    event.stopPropagation()
    // console.log('####', event.keyCode, event.metaKey, event.ctrlKey, event.shiftKey);
    // TODO: while this works when we have an isolated node with input or CE,
    // there is no built-in way of receiving key events in other cases
    // We need a global event listener for keyboard events which dispatches to the current isolated node
    if (event.keyCode === keys$2.ESCAPE && this.state.mode === 'focused') {
      event.preventDefault()
      this._escape()
    }
  }

  onDragStart(event) {
    // console.log('Received drop on IsolatedNode', this.getId());
    this.context.dragManager.onDragStart(event, this)
  }

  onDragEnter(event) {
    event.preventDefault()
  }

  onDragOver(event) {
    event.preventDefault()
  }

  onDrop(event) {
    // console.log('Received drop on IsolatedNode', this.getId());
    this.context.dragManager.onDrop(event, this)
  }

  _escape() {
    this._selectNode()
  }

  _stopPropagation(event) {
    event.stopPropagation()
  }

  _selectNode() {
    // console.log('IsolatedNodeComponent: selecting node.');
    let surface = this.context.surface
    let doc = surface.getDocument()
    let nodeId = this.props.node.id
    surface.setSelection(doc.createSelection({
      type: 'node',
      containerId: surface.getContainerId(),
      nodeId: nodeId,
      mode: 'full'
    }))
  }

}

IsolatedNodeComponent.prototype._isDisabled = IsolatedNodeComponent.prototype.isDisabled

IsolatedNodeComponent.getCoordinate = function(surfaceEl, node) {
  // special treatment for block-level isolated-nodes
  let parent = node.getParent()
  if (node.isTextNode() && parent.is('.se-slug')) {
    let boundary = parent
    let isolatedNodeEl = boundary.getParent()
    let nodeId = isolatedNodeEl.getAttribute('data-id')
    if (nodeId) {
      var charPos = boundary.is('sm-after') ? 1 : 0
      return new Coordinate([nodeId], charPos)
    } else {
      console.error('FIXME: expecting a data-id attribute on IsolatedNodeComponent')
    }
  }
  return null
}

IsolatedNodeComponent.getDOMCoordinate = function(comp, coor) {
  let domCoor
  if (coor.offset === 0) {
    domCoor = {
      container: comp.refs.before.getNativeElement(),
      offset: 0
    }
  } else {
    domCoor = {
      container: comp.refs.after.getNativeElement(),
      offset: 1
    }
  }
  return domCoor
}

IsolatedNodeComponent.getDOMCoordinates = function(comp) {
  return {
    start: {
      container: comp.refs.before.getNativeElement(),
      offset: 0
    },
    end: {
      container: comp.refs.after.getNativeElement(),
      offset: 1
    }
  }
}

class InlineNodeComponent extends IsolatedNodeComponent {

  get _isInlineNodeComponent() {
    return true
  }

  // use spans everywhere
  get __elementTag() {
    return 'span'
  }

  get __slugChar() {
    return "\uFEFF"
  }

  getClassNames() {
    return 'sc-inline-node'
  }

  render($$) { // eslint-disable-line
    let el = super.render($$)
    el.attr('data-inline', '1')
    return el
  }

  // TODO: this is almost the same as the super method. Try to consolidate.
  _deriveStateFromSelectionState(selState) {
    let sel = selState.getSelection()
    let surfaceId = sel.surfaceId
    if (!surfaceId) return
    let id = this.getId()
    let node = this.props.node
    let parentId = this._getSurfaceParent().getId()
    let inParentSurface = (surfaceId === parentId)
    // detect cases where this node is selected or co-selected by inspecting the selection
    if (inParentSurface) {
      if (sel.isPropertySelection() && !sel.isCollapsed() && isEqual$1(sel.path, node.path)) {
        let nodeSel = node.getSelection()
        if(nodeSel.equals(sel)) {
          return { mode: 'selected' }
        }
        if (sel.contains(nodeSel)) {
          return { mode: 'co-selected' }
        }
      }
      return
    }
    // for all other cases (focused / co-focused) the surface id prefix must match
    if (!startsWith$1(surfaceId, id)) return
    // Note: trying to distinguisd focused
    // surfaceIds are a sequence of names joined with '/'
    // a surface inside this node will have a path with length+1.
    // a custom selection might just use the id of this IsolatedNode
    let p1 = id.split('/')
    let p2 = surfaceId.split('/')
    if (p2.length >= p1.length && p2.length <= p1.length+1) {
      return { mode: 'focused' }
    } else {
      return { mode: 'co-focused' }
    }
  }

  _selectNode() {
    // console.log('IsolatedNodeComponent: selecting node.');
    let surface = this.context.surface
    let doc = surface.getDocument()
    let node = this.props.node
    surface.setSelection(doc.createSelection({
      type: 'property',
      path: node.path,
      startOffset: node.startOffset,
      endOffset: node.endOffset
    }))
  }

}

InlineNodeComponent.getCoordinate = function(el) {
  // special treatment for block-level isolated-nodes
  let parent = el.getParent()
  if (el.isTextNode() && parent.is('.se-slug')) {
    let slug = parent
    let nodeEl = slug.getParent()
    if (nodeEl.is('.sc-inline-node')) {
      let startOffset = Number(nodeEl.getAttribute('data-offset'))
      let len = Number(nodeEl.getAttribute('data-length'))
      let charPos = startOffset
      if (slug.is('sm-after')) charPos += len
      let path
      while ( (nodeEl = nodeEl.getParent()) ) {
        let pathStr = nodeEl.getAttribute('data-path')
        if (pathStr) {
          path = pathStr.split('.')
          let coor = new Coordinate(path, charPos)
          coor.__inInlineNode__ = true
          coor.__startOffset__ = startOffset
          coor.__endOffset__ = startOffset+len
          return coor
        }
      }
    }
  }
  return null
}

/**
  Renders an anotated text. Used internally by {@link ui/TextPropertyComponent}.

  @class
  @component
  @extends ui/Component

  @prop {String[]} path The property to be rendered.
*/

class AnnotatedTextComponent extends Component {

  // TODO: this component should listen on changes to the property
  // Otherwise will not be updated.
  // Note that in contrast, TextPropertyComponents get updated by Surface.

  /**
    Node render implementation. Use model/Fragmenter for rendering of annotations.

    @return {VirtualNode} VirtualNode created using ui/Component
   */
  render($$) {
    let el = this._renderContent($$)
      .addClass('sc-annotated-text')
      .css({
        whiteSpace: "pre-wrap"
      })

    return el
  }

  getText() {
    return this.getDocument().get(this.props.path) || ''
  }

  getAnnotations() {
    return this.getDocument().getIndex('annotations').get(this.props.path)
  }

  _renderContent($$) {
    let text = this.getText();
    let annotations = this.getAnnotations()
    let el = $$(this.props.tagName || 'span')
    if (annotations && annotations.length > 0) {
      let fragmenter = new Fragmenter({
        onText: this._renderTextNode.bind(this),
        onEnter: this._renderFragment.bind(this, $$),
        onExit: this._finishFragment.bind(this)
      });
      fragmenter.start(el, text, annotations)
    } else {
      el.append(text)
    }
    return el
  }

  _renderTextNode(context, text) {
    if (text && text.length > 0) {
      context.append(text)
    }
  }

  _renderFragment($$, fragment) {
    let doc = this.getDocument()
    let componentRegistry = this.getComponentRegistry()
    let node = fragment.node
    if (node.type === "container-annotation-fragment") {
      return $$(AnnotationComponent, { doc: doc, node: node })
        .addClass("se-annotation-fragment")
        .addClass(node.anno.getTypeNames().join(' ').replace(/_/g, "-"));
    } else if (node.type === "container-annotation-anchor") {
      return $$(AnnotationComponent, { doc: doc, node: node })
        .addClass("se-anchor")
        .addClass(node.anno.getTypeNames().join(' ').replace(/_/g, "-"))
        .addClass(node.isStart?"start-anchor":"end-anchor")
    }
    let ComponentClass = componentRegistry.get(node.type) || AnnotationComponent
    if (node.constructor.isInline &&
        // opt-out for custom implementations
        !ComponentClass.isCustom &&
        // also no extra wrapping if the node is already an inline node
        !ComponentClass.prototype._isInlineNodeComponent) {
      ComponentClass = InlineNodeComponent
    }
    let el = $$(ComponentClass, { doc: doc, node: node })
    return el
  }

  _finishFragment(fragment, context, parentContext) {
    parentContext.append(context)
  }

  /**
    Gets document instance.

    @return {Document} The document instance
   */
  getDocument() {
    return this.props.doc || this.context.doc
  }

  getComponentRegistry() {
    return this.props.componentRegistry || this.context.componentRegistry
  }

}

class CursorComponent extends Component {

  render($$) {
    // TODO: we should rename se-cursor to sc-cursor
    let el = $$('span').addClass('se-cursor')
    // Add zero-width character. Since we have a non-empty element, the
    // outline style set on the cursor would not be visible in certain
    // scenarios (e.g. when cursor is at the very beginning of a text.
    el.append("\uFEFF")
    el.append($$('div').addClass('se-cursor-inner'))

    if (this.props.collaborator) {
      let collaboratorIndex = this.props.collaborator.colorIndex
      el.addClass('sm-collaborator-'+collaboratorIndex)
    } else {
      el.addClass('sm-local-user')
    }

    return el
  }

}

class SelectionFragmentComponent extends Component {

  render($$) {
    // TODO: we should rename se-cursor to sc-cursor
    let el = $$('span').addClass('se-selection-fragment')
    if (this.props.collaborator) {
      let collaboratorIndex = this.props.collaborator.colorIndex
      el.addClass('sm-collaborator-'+collaboratorIndex)
    } else {
      el.addClass('sm-local-user')
    }
    el.append(this.props.children)
    return el
  }

}

/**
  Renders a text property. Used internally by different components to render
  editable text.

  @class
  @component
  @extends ui/AnnotatedTextComponent

  @prop {String[]} path path to a text property
  @prop {String} [tagName] specifies which tag should be used - defaults to `div`

  @example

  ```js
  $$(TextProperty, {
    path: [ 'paragraph-1', 'content']
  })
  ```
*/

class TextPropertyComponent extends AnnotatedTextComponent {

  get _isTextPropertyComponent() {
    return true 
  }

  didMount() {
    super.didMount.call(this)
    // TODO: instead of letting Surface manage TextProperties
    // we should instead use the Flow in future
    let surface = this.getSurface()
    if (surface) {
      surface._registerTextProperty(this)
    }
  }

  dispose() {
    super.dispose.call(this);
    let surface = this.getSurface()
    if (surface) {
      surface._unregisterTextProperty(this)
    }
  }

  render($$) {
    let path = this.getPath()

    let el = this._renderContent($$)
      .addClass('sc-text-property')
      .attr({
        'data-path': path.join('.'),
        spellCheck: false,
      })
      .css({
        'white-space': 'pre-wrap'
      })

    if (this.context.dragManager) {
      el.on('dragenter', this.onDragEnter)
        .on('dragover', this.onDragOver)
        .on('drop', this.onDrop)
    }

    if (!this.props.withoutBreak) {
      el.append($$('br'))
    }
    return el
  }

  _renderFragment($$, fragment) {
    let node = fragment.node
    let id = node.id
    let el
    if (node.type === 'cursor') {
      el = $$(CursorComponent, { collaborator: node.collaborator })
    } else if (node.type === 'selection-fragment') {
      el = $$(SelectionFragmentComponent, { collaborator: node.collaborator })
    } else {
      el = super._renderFragment.apply(this, arguments)
      if (node.constructor.isInline) {
        el.ref(id)
      }
      // Adding refs here, enables preservative rerendering
      // TODO: while this solves problems with rerendering inline nodes
      // with external content, it decreases the overall performance too much.
      // We should optimize the component first before we can enable this.
      else if (this.context.config && this.context.config.preservativeTextPropertyRendering) {
        el.ref(id + '@' + fragment.counter)
      }
    }
    el.attr('data-offset', fragment.pos)
    return el
  }

  onDragEnter(event) {
    event.preventDefault()
  }

  onDragOver(event) {
    event.preventDefault()
  }

  onDrop(event) {
    // console.log('Received drop on TextProperty', this.getPath());
    this.context.dragManager.onDrop(event, this)
  }

  getPath() {
    return this.props.path
  }

  getText() {
    return this.getDocument().get(this.getPath())
  }

  getAnnotations() {
    let path = this.getPath()
    let annotations = this.getDocument().getIndex('annotations').get(path)
    let fragments = this.props.fragments
    if (fragments) {
      annotations = annotations.concat(fragments)
    }
    return annotations
  }

  getDocument() {
    return this.props.doc ||this.context.doc
  }

  getController() {
    return this.props.controller || this.context.controller
  }

  getSurface() {
    return this.props.surface ||this.context.surface
  }

  isEditable() {
    return this.getSurface().isEditable()
  }

  isReadonly() {
    return this.getSurface().isReadonly()
  }

  getDOMCoordinate(charPos) {
    return this._getDOMCoordinate(this.el, charPos)
  }

  _finishFragment(fragment, context, parentContext) {
    context.attr('data-length', fragment.length)
    parentContext.append(context)
  }

  _getDOMCoordinate(el, charPos) {
    let l
    let idx = 0
    if (charPos === 0) {
      return {
        container: el.getNativeElement(),
        offset: 0
      }
    }
    for (let child = el.getFirstChild(); child; child = child.getNextSibling(), idx++) {
      if (child.isTextNode()) {
        l = child.textContent.length
        if (l >= charPos) {
          return {
            container: child.getNativeElement(),
            offset: charPos
          }
        } else {
          charPos -= l;
        }
      } else if (child.isElementNode()) {
        let length = child.getAttribute('data-length')
        if (length) {
          l = parseInt(length, 10)
          if (l >= charPos) {
            // special handling for InlineNodes
            if (child.attr('data-inline')) {
              let nextSibling = child.getNextSibling()
              if (nextSibling && nextSibling.isTextNode()) {
                return {
                  container: nextSibling.getNativeElement(),
                  offset: 0
                }
              } else {
                return {
                  container: el.getNativeElement(),
                  offset: el.getChildIndex(child) + 1
                }
              }
            }
            return this._getDOMCoordinate(child, charPos, idx)
          } else {
            charPos -= l
          }
        } else {
          console.error('FIXME: Can not map to DOM coordinates.')
          return null
        }
      }
    }
  }
}

// Helpers for DOM selection mapping

TextPropertyComponent.getCoordinate = function(root, node, offset) {
  let context = _getPropertyContext(root, node, offset)
  if (!context) {
    return null
  }
  // in some cases we need to normalize the DOM coordinate
  // before we can use it for retrieving charPos
  // E.g. observed with #273
  node = context.node
  offset = context.offset
  var charPos = _getCharPos(context.node, context.offset)
  if (isNumber$1(charPos)) {
    return new Coordinate(context.path, charPos)
  }
  return null
}

function _getPropertyContext(root, node, offset) {
  let result = {
    el: null,
    path: null,
    node: node,
    offset: offset
  }
  while (node && node !== root) {
    if (node.isElementNode()) {
      let path = node.getAttribute('data-path')
      if (path) {
        result.el = node;
        result.path = path.split('.')
        return result;
      }
      if (node.getAttribute('data-inline')) {
        // we need to normalize situations where the DOM coordinate
        // is inside an inline node, which we have observed
        // can actually happen.
        result.node = node
        if (offset > 0) {
          result.offset = 1
        }
      }
    }
    node = node.getParent()
  }
  return null
}

function _getCharPos(node, offset) {
  let charPos = offset
  let parent, childIdx

  /*
    In the following implementation we are exploiting two facts
    for optimization:
    - an element with data-path is assumed to be the text property element
    - an element with data-offset is assumed to be an annotation element

    Particularly, the data-offset property is helpful to get the character position
    in just one iteration.
  */

  parent = node.getParent()
  if (node.isTextNode()) {
    // TextNode is first child
    if (node === parent.firstChild) {
      // ... we can stop if parent is text property
      let parentPath = parent.getAttribute('data-path')
      let parentOffset = parent.getAttribute('data-offset')
      if (parentPath) {
        charPos = offset
      }
      // ... and we can stop if parent has an offset hint
      else if (parentOffset) {
        charPos = parseInt(parentOffset, 10) + offset
      }
      // ... otherwise we count the charPos by recursing up-tree
      else {
        charPos = _getCharPos(parent, 0) + offset
      }
    } else {
      // the node has a predecessor so we can apply recurse using the child index
      childIdx = parent.getChildIndex(node)
      charPos = _getCharPos(parent, childIdx) + offset
    }
  } else if (node.isElementNode()) {
    let pathStr = node.getAttribute('data-path')
    let offsetStr = node.getAttribute('data-offset')
    // if node is the element of a text property, then offset is a child index
    // up to which we need to sum up all lengths
    if (pathStr) {
      charPos = _countCharacters(node, offset)
    }
    // similar if node is the element of an annotation, and we can use the
    // element's offset
    else if (offsetStr) {
      childIdx = parent.getChildIndex(node)
      charPos = parseInt(offsetStr, 10) + _countCharacters(node, offset)
    }
    // for other elements we need to count characters in the child tree
    // adding the offset of this element which needs to be computed by recursing up-tree
    else {
      childIdx = parent.getChildIndex(node)
      charPos = _getCharPos(parent, childIdx) + _countCharacters(node, offset)
    }
  } else {
    // Unsupported case
    return null
  }
  return charPos;
}

function _countCharacters(el, maxIdx) {
  let charPos = 0
  // inline elements have a length of 1
  if (el.getAttribute('data-inline')) {
    return maxIdx === 0 ? 0 : 1;
  }
  let l = el.getChildCount()
  if (arguments.length === 1) {
    maxIdx = l;
  }
  maxIdx = Math.min(l, maxIdx)
  for (let i=0, child = el.getFirstChild(); i < maxIdx; child = child.getNextSibling(), i++) {
    if (child.isTextNode()) {
      charPos += child.getTextContent().length
    } else if (child.isElementNode()) {
      let length = child.getAttribute('data-length')
      if (child.getAttribute('data-inline')) {
        charPos += 1
      } else if (length) {
        charPos += parseInt(length, 10)
      } else {
        charPos += _countCharacters(child)
      }
    }
  }
  return charPos
}

class TextBlockComponent extends NodeComponent {

  render($$) {
    let el = super.render.call(this, $$);
    el.append($$(TextPropertyComponent, {
      path: [ this.props.node.id, "content"]
    }))
    return el
  }

}

class BlockquoteComponent extends TextBlockComponent {
  render($$) {
    let el = super.render.call(this, $$)
    return el.addClass('sc-blockquote')
  }
}

/*
 * HTML converter for Blockquote.
 */
var BlockquoteHTMLConverter = {

  type: 'blockquote',
  tagName: 'blockquote',

  import: function(el, node, converter) {
    node.content = converter.annotatedText(el, [node.id, 'content'])
  },

  export: function(node, el, converter) {
    el.append(
      converter.annotatedText([node.id, 'content'])
    )
  }

}

var BlockquotePackage = {
  name: 'blockquote',
  configure: function(config) {
    config.addNode(Blockquote);
    config.addComponent(Blockquote.type, BlockquoteComponent)
    config.addConverter('html', BlockquoteHTMLConverter)
    config.addConverter('xml', BlockquoteHTMLConverter)
    config.addTextType({
      name: 'blockquote',
      data: {type: 'blockquote'}
    })
    config.addLabel('blockquote', {
      en: 'Blockquote',
      de: 'Blockzitat'
    })
  },
  Blockquote: Blockquote,
  BlockquoteComponent: BlockquoteComponent,
  BlockquoteHTMLConverter: BlockquoteHTMLConverter
}

class Code extends PropertyAnnotation {}

Code.type = 'code'

/*
 * HTML converter for Code.
 */
var CodeHTMLConverter = {
  type: 'code',
  tagName: 'code'
}

/**
  A class for commands intended to be executed on the annotations.
  See the example below to learn how to define a custom `AnnotationCommand`.

  @class
  @extends ui/Command

  @example

  ```js
  import AnnotationCommand from 'substance/ui/AnnotationCommand'

  class SmallCapsCommand extends AnnotationCommand {}
  SmallCapsCommand.nodeType = 'smallcaps'
  ```
*/

class AnnotationCommand extends Command {
  
  constructor(...args) {
    super(...args)
    
    this.nodeType = this.params.nodeType

    if (!this.nodeType) {
      throw new Error("'nodeType' is required")
    }
  }

  /**
    Get the type of an annotation.

    @returns {String} The annotation's type.
   */
  getAnnotationType() {
    return this.nodeType
  }

  /**
    Get the annotation's data.

    @returns {Object} The annotation's data.
   */
  getAnnotationData() {
    return {}
  }

  /**
    Checks if command couldn't be executed with current selection.

    @param {Array} annos annotations
    @param {Object} sel selection

    @returns {Boolean} Whether or not command could be executed.
   */
  isDisabled(sel) {
    // TODO: Container selections should be valid if the annotation type
    // is a container annotation. Currently we only allow property selections.
    if (!sel || sel.isNull() || !sel.isAttached() || sel.isCustomSelection()||
        sel.isNodeSelection() || sel.isContainerSelection()) {
      return true
    }
    return false
  }

  // Not implemented by default
  canEdit(annos, sel) { // eslint-disable-line
    return false
  }

  /**
    Checks if new annotations could be created.
    There should be no annotation overlapping, selection must be not collapsed.

    @param {Array} annos annotations
    @param {Object} sel selection

    @returns {Boolean} Whether or not annotation could be created.
   */
  // When there's no existing annotation overlapping, we create a new one.
  canCreate(annos, sel) {
    return (annos.length === 0 && !sel.isCollapsed())
  }

  /**
    Checks if annotations could be fused.
    There should be more than one annotation overlaped by current selection.

    @param {Array} annos annotations
    @param {Object} sel selection

    @returns {Boolean} Whether or not annotations could be fused.
   */
  // When more than one annotation overlaps with the current selection
  canFuse(annos, sel) {
    return (annos.length >= 2 && !sel.isCollapsed())
  }

  /**
    Checks if annotation could be deleted.
    Cursor or selection must be inside an existing annotation.

    @param {Array} annos annotations
    @param {Object} sel selection

    @returns {Boolean} Whether or not annotation could be deleted.
   */
  // When the cursor or selection is inside an existing annotation
  canDelete(annos, sel) {
    if (annos.length !== 1) return false
    let annoSel = annos[0].getSelection()
    return sel.isInsideOf(annoSel)
  }

  /**
    Checks if annotation could be expanded.
    There should be overlap with only a single annotation,
    selection should be also outside of this annotation.

    @param {Array} annos annotations
    @param {Object} sel selection

    @returns {Boolean} Whether or not annotation could be expanded.
   */
  // When there's some overlap with only a single annotation we do an expand
  canExpand(annos, sel) {
    if (annos.length !== 1) return false
    let annoSel = annos[0].getSelection()
    return sel.overlaps(annoSel) && !sel.isInsideOf(annoSel)
  }

  /**
    Checks if annotation could be truncated.
    There should be overlap with only a single annotation,
    selection should also have boundary in common with this annotation.

    @param {Array} annos annotations
    @param {Object} sel selection

    @returns {Boolean} Whether or not annotation could be truncated.
   */
  canTruncate(annos, sel) {
    if (annos.length !== 1) return false
    let annoSel = annos[0].getSelection()

    return (sel.isLeftAlignedWith(annoSel) || sel.isRightAlignedWith(annoSel)) &&
           !sel.contains(annoSel) &&
           !sel.isCollapsed()
  }

  /**
    Gets command state object.

    @param {Object} state.selection the current selection
    @returns {Object} info object with command details.
  */
  getCommandState(props, context) { // eslint-disable-line
    context = context || {}
    let sel = this._getSelection(props)
    // We can skip all checking if a disabled condition is met
    // E.g. we don't allow toggling of property annotations when current
    // selection is a container selection
    if (this.isDisabled(sel)) {
      return {
        disabled: true
      }
    }
    let annos = this._getAnnotationsForSelection(props, context)
    let newState = {
      disabled: false,
      active: false,
      mode: null
    }
    if (this.canCreate(annos, sel)) {
      newState.mode = "create"
    } else if (this.canFuse(annos, sel)) {
      newState.mode = "fusion"
    } else if (this.canTruncate(annos, sel)) {
      newState.active = true
      newState.mode = "truncate"
    } else if (this.canExpand(annos, sel)) {
      newState.mode = "expand"
    } else if (this.canEdit(annos, sel)) {
      newState.mode = "edit"
      newState.node = annos[0]
      newState.active = true
    } else if (this.canDelete(annos, sel)) {
      newState.active = true
      newState.mode = "delete"
    } else {
      newState.disabled = true
    }
    return newState
  }

  /**
    Execute command and trigger transformation.

    @returns {Object} info object with execution details.
  */
  // Execute command and trigger transformations
  execute(props, context) {
    props = props || {}
    props.selection = this._getSelection(props)
    if (props.disabled) return false
    let mode = props.mode
    switch(mode) {
      case 'create':
        return this.executeCreate(props, context)
      case 'fuse':
        return this.executeFuse(props, context)
      case 'truncate':
        return this.executeTruncate(props, context)
      case 'expand':
        return this.executeExpand(props, context)
      case 'edit':
        return this.executeEdit(props, context)
      case 'delete':
        return this.executeDelete(props, context)
      default:
        console.warn('Command.execute(): unknown mode', mode)
        return false
    }
  }

  executeCreate(props, context) {
    let annos = this._getAnnotationsForSelection(props, context)
    this._checkPrecondition(props, context, annos, this.canCreate)
    let newAnno = this._applyTransform(props, context, function(tx) {
      props.node = this.getAnnotationData()
      props.node.type = this.getAnnotationType()
      return createAnnotation(tx, props)
    }.bind(this))
    return {
      mode: 'create',
      anno: newAnno
    }
  }

  executeFuse(props, context) {
    let annos = this._getAnnotationsForSelection(props, context);
    this._checkPrecondition(props, context, annos, this.canFuse);
    let fusedAnno = this._applyTransform(props, context, function(tx) {
      let result = fuseAnnotation(tx, {
        annos: annos
      })
      return {
        result: result.node
      }
    })
    return {
      mode: 'fuse',
      anno: fusedAnno
    }
  }

  executeTruncate(props, context) {
    let annos = this._getAnnotationsForSelection(props, context)
    let anno = annos[0]
    this._checkPrecondition(props, context, annos, this.canTruncate)
    this._applyTransform(props, context, function(tx) {
      return truncateAnnotation(tx, {
        selection: props.selection,
        anno: anno
      })
    })
    return {
      mode: 'truncate',
      anno: anno
    }
  }

  executeExpand(props, context) {
    let annos = this._getAnnotationsForSelection(props, context)
    let anno = annos[0]
    this._checkPrecondition(props, context, annos, this.canExpand)
    this._applyTransform(props, context, function(tx) {
      expandAnnotation(tx, {
        selection: props.selection,
        anno: anno
      })
    })
    return {
      mode: 'expand',
      anno: anno
    }
  }

  // TODO: do we still need this?
  executeEdit(props, context) { // eslint-disable-line
    let annos = this._getAnnotationsForSelection(props, context)
    this._checkPrecondition(props, context, annos, this.canEdit)
    return {
      mode: "edit",
      anno: annos[0],
      readyOnly: true
    }
  }

  executeDelete(props, context) {
    let annos = this._getAnnotationsForSelection(props, context)
    let anno = annos[0]
    this._checkPrecondition(props, context, annos, this.canDelete)
    this._applyTransform(props, context, function(tx) {
      return tx.delete(anno.id)
    })
    return {
      mode: 'delete',
      annoId: anno.id
    }
  }

  _checkPrecondition(props, context, annos, checker) {
    let sel = this._getSelection(props)
    if (!checker.call(this, annos, sel)) {
      throw new Error("AnnotationCommand: can't execute command for selection " + sel.toString())
    }
  }

  _getAnnotationsForSelection(props) {
    return props.selectionState.getAnnotationsForType(this.getAnnotationType())
  }

  /**
    Apply an annotation transformation.

    @returns {Object} transformed annotations.
   */
  // Helper to trigger an annotation transformation
  _applyTransform(props, context, transformFn) {
    // HACK: this looks a bit too flexible. Maybe we want to go for
    let sel = this._getSelection(props)
    let documentSession = this._getDocumentSession(props, context)
    let surface = props.surface
    props.selection = sel

    let result; // to store transform result
    if (sel.isNull()) return
    documentSession.transaction(function(tx) {
      tx.before.selection = sel
      if (surface) {
        tx.before.surfaceId = surface.getId()
      }
      let out = transformFn(tx, props)
      if (out) {
        result = out.result
      }
      return out
    })
    return result
  }

}

/*
 * Abstract class for annotation tools like StrongTool, EmphasisTool, LinkTool.
 *
 * @component
 */

class AnnotationTool extends Tool {

  render($$) {
    let el = super.render.call(this, $$)
    el.addClass('sm-annotation-tool')
    return el
  }

  renderButton($$) {
    let el = super.renderButton.call(this, $$)
    el.append(this.renderMode($$))
    return el
  }

  /*
    Renders a small hint for the mode (expand, truncate, edit, etc)
  */
  renderMode($$) {
    let mode = this.props.mode
    let el = $$('div').addClass('se-mode')

    let iconEl = this.context.iconProvider.renderIcon($$, mode)
    if (iconEl) {
      el.append(iconEl)
    }
    return el
  }
}

var CodePackage = {
  name: 'code',
  configure: function(config) {
    config.addNode(Code);
    config.addConverter('html', CodeHTMLConverter)
    config.addConverter('xml', CodeHTMLConverter)
    config.addComponent('code', AnnotationComponent)
    config.addCommand('code', AnnotationCommand, { nodeType: Code.type })
    config.addTool('code', AnnotationTool, {target: 'annotations'})
    config.addIcon('code', { 'fontawesome': 'fa-code' })
    config.addLabel('code', {
      en: 'Code',
      de: 'Code'
    })
  },
  Code: Code,
  CodeHTMLConverter: CodeHTMLConverter
}

class Emphasis extends PropertyAnnotation {}

Emphasis.type = "emphasis"

// hint for rendering in presence of overlapping annotations
Emphasis.fragmentation = Fragmenter.ANY

/*
 * HTML converter for Blockquote.
 */
var EmphasisHTMLConverter = {

  type: 'emphasis',
  tagName: 'em',

  matchElement: function(el) {
    return el.is('em, i')
  }

}

var EmphasisPackage = {
  name: 'emphasis',
  configure: function(config, options) {
    config.addNode(Emphasis)
    config.addConverter('html', EmphasisHTMLConverter)
    config.addConverter('xml', EmphasisHTMLConverter)
    config.addComponent('emphasis', AnnotationComponent)
    config.addCommand('emphasis', AnnotationCommand, { nodeType: Emphasis.type })
    config.addTool('emphasis', AnnotationTool, {
      target: options.toolTarget || 'annotations'
    })
    config.addIcon('emphasis', { 'fontawesome': 'fa-italic' });
    config.addLabel('emphasis', {
      en: 'Emphasis',
      de: 'Betonung'
    })
  },
  Emphasis: Emphasis,
  EmphasisHTMLConverter: EmphasisHTMLConverter
}

class Heading extends TextBlock {}

Heading.define({
  type: "heading",
  level: { type: "number", default: 1 }
})

class HeadingComponent extends TextBlockComponent {
  render($$) {
    let el = super.render.call(this, $$)
    return el.addClass("sc-heading sm-level-"+this.props.node.level)
  }
}

/*
 * HTML converter for Paragraphs.
 */
var HeadingHTMLConverter = {

  type: "heading",

  matchElement: function(el) {
    return /^h\d$/.exec(el.tagName)
  },

  import: function(el, node, converter) {
    node.level = Number(el.tagName[1])
    node.content = converter.annotatedText(el, [node.id, 'content'])
  },

  export: function(node, el, converter) {
    el.tagName = 'h'+node.level
    el.append(
      converter.annotatedText([node.id, 'content'])
    )
  }

}

var HeadingPackage = {
  name: 'heading',
  configure: function(config) {
    config.addNode(Heading)
    config.addComponent(Heading.type, HeadingComponent)
    config.addConverter('html', HeadingHTMLConverter)
    config.addConverter('xml', HeadingHTMLConverter)
    config.addTextType({
      name: 'heading1',
      data: {type: 'heading', level: 1}
    })
    config.addTextType({
      name: 'heading2',
      data: {type: 'heading', level: 2}
    })
    config.addTextType({
      name: 'heading3',
      data: {type: 'heading', level: 3}
    })
    config.addLabel('heading1', {
      en: 'Heading 1',
      de: 'Überschrift 1'
    })
    config.addLabel('heading2', {
      en: 'Heading 2',
      de: 'Überschrift 2'
    })
    config.addLabel('heading3', {
      en: 'Heading 3',
      de: 'Überschrift 3'
    })
  },
  Heading: Heading,
  HeadingComponent: HeadingComponent,
  HeadingHTMLConverter: HeadingHTMLConverter
}

class Image extends DocumentNode {}

Image.define({
  type: "image",
  src: { type: "string", default: "http://" },
  previewSrc: { type: "string", optional: true }
})

function percentage(ratio) {
  return String(Math.floor(ratio*100*100)/100) + ' %';
}

class ImageComponent extends NodeComponent {

  didMount() {
    super.didMount.call(this)
    let node = this.props.node
    node.on('src:changed', this.rerender, this)
    // TODO: we should try to factor this out for reuse
    node.on('upload:started', this.onUploadStarted, this)
    node.on('upload:progress', this.onUploadProgress, this)
    node.on('upload:finished', this.onUploadFinished, this)
  }

  dispose() {
    super.dispose.call(this)

    this.props.node.off(this)
  }

  render($$) {
    let el = super.render.call(this, $$)
    el.addClass('sc-image')

    el.append(
      $$('img').attr({
        src: this.props.node.src,
      }).ref('image')
    )

    if (this.state.uploading) {
      let progressBar = $$('div')
        .addClass('se-progress-bar')
        .ref('progressBar')
        .append('Uploading: ' + percentage(this.state.progress));
      el.append(progressBar)
    }

    return el
  }

  onUploadStarted() {
    this.setState({ uploading: true, progress: 0 })
  }

  onUploadProgress(progress) {
    this.setState({ uploading: true, progress: progress })
  }

  onUploadFinished() {
    this.setState({})
  }

}

/*
 * HTML converter for Paragraphs.
 */
var ImageHTMLConverter = {

  type: 'image',
  tagName: 'img',

  import: function(el, node) {
    node.src = el.attr('src');
    node.previewSrc = el.attr('data-preview-src');
  },

  export: function(node, el) {
    el.attr('src', node.src)
      .attr('data-preview-src', node.previewSrc);
  }
}

/*
 * XML converter for Images.
 */
var ImageXMLConverter = {

  type: 'image',
  tagName: 'image',

  import: function(el, node) {
    node.src = el.attr('src')
    node.previewSrc = el.attr('preview-src')
  },

  export: function(node, el) {
    el.attr('src', node.src)
      .attr('preview-src', node.previewSrc)
  }
}

class ImageCommand extends Command {
  constructor() {
    super({ name: 'insert-image' })
  }

  getCommandState(props, context) {
    let documentSession = context.documentSession
    let sel = props.selection || documentSession.getSelection()
    let surface = props.surface || context.surfaceManager.getFocusedSurface()
    let newState = {
      disabled: true,
      active: false
    }
    if (sel && !sel.isNull() && !sel.isCustomSelection() &&
        surface && surface.isContainerEditor()) {
      newState.disabled = false
    }
    return newState
  }

  /**
    Inserts (stub) images and triggers a fileupload.
    After upload has completed, the image URLs get updated.
  */
  execute(props, context) {
    let state = this.getCommandState(props, context)
    // Return if command is disabled
    if (state.disabled) return

    let documentSession = context.documentSession
    let sel = props.selection || documentSession.getSelection()
    let surface = props.surface || context.surfaceManager.getFocusedSurface()
    let fileClient = context.fileClient
    let files = props.files

    // can drop images only into container editors
    if (!surface.isContainerEditor()) return

    // creating a small doc where we add the images
    // and then we use the paste transformation to get this snippet
    // into the real doc
    let doc = surface.getDocument()
    let snippet = doc.createSnippet()

    // as file upload takes longer we will insert stub images
    let items = files.map(function(file) {
      let node = snippet.create({ type: 'image' })
      snippet.show(node)
      return {
        file: file,
        nodeId: node.id
      }
    })

    surface.transaction(function(tx) {
      tx.before.selection = sel
      return paste(tx, {
        selection: sel,
        containerId: surface.getContainerId(),
        doc: snippet
      })
    })

    // start uploading
    items.forEach(function(item) {
      let nodeId = item.nodeId
      let file = item.file
      let node = doc.get(nodeId)
      node.emit('upload:started')
      let channel = fileClient.uploadFile(file, function(err, url) {
        if (err) {
          url = "error"
        }
        // get the node again to make sure it still exists
        let node = doc.get(nodeId)
        if (node) {
          node.emit('upload:finished');
          documentSession.transaction(function(tx) {
            tx.set([nodeId, 'src'], url)
          })
        }
      })
      channel.on('progress', function(progress) {
        // console.log('Progress', progress);
        node.emit('upload:progress', progress)
      })
    })

    return {
      status: 'file-upload-process-started'
    }
  }

}

class InsertImageTool extends Tool {

  getClassNames() {
    return 'sc-insert-image-tool'
  }

  renderButton($$) {
    let button = super.renderButton($$)
    let input = $$('input').attr('type', 'file').ref('input')
      .on('change', this.onFileSelect)
    return [button, input]
  }

  onClick() {
    this.refs.input.click()
  }

  onFileSelect(e) {
    let files = e.currentTarget.files
    this.performAction({
      files: Array.prototype.slice.call(files)
    })
  }

}

class DragAndDropHandler {

  get _isDragAndDropHandler() {
    return true 
  }

  dragStart(params, context) { // eslint-disable-line
    // nothing
  }

  drop(params, context) { // eslint-disable-line
    // nothing
  }

  dragEnd(params, context) { // eslint-disable-line
    // nothing
  }

}

oo.initClass(DragAndDropHandler)

class DropImage extends DragAndDropHandler {

  drop(params, context) {
    let target = params.target
    // precondition: we need a surface and a selection
    // and act only if there are image files
    let surface = target.surface
    let selection = target.selection
    let files = params.data.files
    if (!surface || !selection || !files || files.length === 0) return
    // pick only the images
    files = files.filter(function(file) {
      return startsWith$1(file.type, 'image')
    })
    if (files.length === 0) return
    context.commandManager.executeCommand(ImageCommand.type, {
      surface: surface,
      selection: selection,
      files: files
    })
    // this lets DropManager know that drop was handled
    return true
  }

}

var ImagePackage = {
  name: 'image',
  configure: function(config) {
    config.addNode(Image);
    config.addComponent('image', ImageComponent)
    config.addConverter('html', ImageHTMLConverter)
    config.addConverter('xml', ImageXMLConverter)
    config.addCommand('insert-image', ImageCommand)
    config.addTool('insert-image', InsertImageTool)
    config.addIcon('insert-image', { 'fontawesome': 'fa-image' })
    config.addLabel('image', {
      en: 'Image',
      de: 'Bild'
    })
    config.addLabel('insert-image', {
      en: 'Insert image',
      de: 'Bild einfügen'
    })
    config.addDragAndDrop(DropImage)
  },
  ImageNode: Image,
  ImageComponent: ImageComponent,
  ImageHTMLConverter: ImageHTMLConverter,
  InsertImageCommand: ImageCommand,
  InsertImageTool: InsertImageTool,
  DropImage: DropImage
}

class InlineWrapper extends InlineNode {
  getWrappedNode() {
    return this.getDocument().get(this.wrappedNode)
  }
}

InlineWrapper.define({
  type: 'inline-wrapper',
  wrappedNode: 'id'
})

class InlineWrapperComponent extends InlineNodeComponent {

  getClassNames() {
    // ATTENTION: ATM it is necessary to add .sc-inline-node
    return 'sc-inline-wrapper sc-inline-node'
  }

  renderContent($$) {
    let node = this.props.node
    let doc = node.getDocument()

    let wrappedNode = doc.get(node.wrappedNode)
    let el;
    if (wrappedNode) {
      let componentRegistry = this.context.componentRegistry
      let ComponentClass = componentRegistry.get(wrappedNode.type)
      if (ComponentClass) {
        el = $$(ComponentClass, {
          disabled: this.isDisabled(),
          node: wrappedNode,
        }).ref('wrappedNode')
      } else {
        console.error('No component registered for node type' + wrappedNode.type)
      }
    } else {
      console.error('Could not find wrapped node: ' + node.wrappedNode)
    }
    return el
  }
}

var InlineWrapperConverter = {
  type: 'inline-wrapper',

  matchElement: function(el, converter) {
    var blockConverter = converter._getConverterForElement(el, 'block')
    return Boolean(blockConverter)
  },

  import: function(el, node, converter) {
    // HACK monkey patching the context
    node.id = converter.nextId('inline-wrapper')
    var state = converter.state
    state.popElementContext()
    state.pushElementContext(state.getCurrentElementContext().tagName)
    node.wrappedNode = converter.convertElement(el).id
  },

  export: function(node, el, converter) {
    return converter.convertNode(node.wrappedNode)
  }
}

/*
  This package adds a node to the model which can be used
  to use a block-level node within an inline context.

    The quick brown fox jumps over the lazy <fig><img src='./dog.jpg'/></fig>.

  To register the converter you must provide `config.converters` which is
  an array of names of the converters you want this to be registered in.
*/
var InlineWrapperPackage = {
  name: 'inline-wrapper',
  configure: function(config, options) {
    config.addNode(InlineWrapper)
    config.addComponent(InlineWrapper.type, InlineWrapperComponent)
    if (options.converters) {
      options.converters.forEach(function(name) {
        config.addConverter(name, InlineWrapperConverter)
      })
    }
  },
  InlineWrapper: InlineWrapper,
  InlineWrapperComponent: InlineWrapperComponent,
  InlineWrapperConverter: InlineWrapperConverter
}

class ListItem extends TextBlock {}

ListItem.type = 'list-item'

ListItem.define({
  listType: { type: 'string', default: 'unordered' },
  level: { type: 'number', default: 1 }
})

class ListItemComponent extends Component {

  render($$) {
    let node = this.props.node
    let el = $$('div')
      .addClass('sc-list-item')
      .addClass('sm-' + node.listType)
      .attr('data-id', this.props.node.id)
      .append($$(TextPropertyComponent, {
        path: [ this.props.node.id, 'content']
      })
    )
    return el
  }

}

var breakList = function(tx, args) {
  let sel = args.selection
  let containerId = args.containerId
  if (!sel.isPropertySelection()) {
    throw new Error('Expected property selection.')
  }
  let path = sel.path
  let offset = sel.startOffset
  let node = tx.get(path[0])
  // split the text property and create a new paragraph node with trailing text and annotations transferred
  let text = node.getText()
  let container = tx.get(containerId)
  let nodePos = container.getPosition(node.id)
  let newNode, nodeData, selNodeId
  let insertPos = nodePos+1
  // when breaking at the first position, a new node of the same
  // type will be inserted.
  if (text.length === 0) {
    let type = tx.getSchema().getDefaultTextType()
    nodeData = {
      type: type,
      content:''
    }
    newNode = tx.create(nodeData)
    container.hide(node.id)
    tx.delete(node.id)
    container.show(newNode.id, nodePos)
    selNodeId = newNode.id
  } else {
    nodeData = node.toJSON()
    nodeData.id = uuid$1(node.type)
    if (offset === 0) {
      nodeData.content = ''
    } else {
      nodeData.content = text.substring(offset)
    }
    newNode = tx.create(nodeData)
    selNodeId = newNode.id
    if (offset === 0) {
      // if selection is at the begin of line
      // we insert a new empty node above
      // and leave the cursor in the old node
      insertPos = nodePos
      selNodeId = node.id
    } else if (offset < text.length) {
      // transfer annotations which are after offset to the new node
      annotationHelpers.transferAnnotations(tx, path, offset, [newNode.id, 'content'], 0)
      // truncate the original property
      tx.update(path, {
        delete: { start: offset, end: text.length }
      })
    }
    container.show(newNode.id, insertPos)
  }
  sel = tx.createSelection([selNodeId, 'content'], 0)
  return {
    selection: sel,
    node: newNode
  }
}

var ListEditing = {

  register: function(behavior) {
    behavior
      .defineBreak('list-item', breakList)
  }

}

let ListMacro = {

  appliesTo: ['paragraph'],

  execute: function(props, context) {
    if (this.appliesTo.indexOf(props.node.type) === -1) {
      return false;
    }
    let match = /^\*\s/.exec(props.text)

    if (match) {
      let surface = context.surfaceManager.getSurface(props.selection.surfaceId)
      surface.transaction(function(tx, args) {
        let deleteSel = tx.createSelection(props.path, 0, match[0].length)
        deleteSelection(tx, {
          selection: deleteSel
        })
        let switchTextResult = switchTextType(tx, {
          selection: props.selection,
          containerId: args.containerId,
          data: {
            type: 'list-item'
          }
        })
        if (props.action === 'type') {
          return {
            selection: tx.createSelection(switchTextResult.node.getTextPath(), 0)
          }
        }
      })
      return true
    }
  }

}

var ListPackage = {
  name: 'list-item',
  configure: function(config, options) {
    config.addNode(ListItem)
    config.addComponent(ListItem.type, ListItemComponent)
    config.addTextType({
      name: 'list-item',
      data: { type: 'list-item' }
    })
    config.addEditingBehavior(ListEditing)
    if (options.enableMacro) {
      config.addMacro(ListMacro)
    }
    config.addLabel('list', {
      en: 'List',
      de: 'Liste'
    })
    config.addLabel('list-item', {
      en: 'List',
      de: 'Liste'
    })
  },
  ListItem: ListItem,
  ListItemComponent: ListItemComponent,
  ListEditing: ListEditing,
  ListMacro: ListMacro
}

class Paragraph extends TextBlock {}

Paragraph.type = "paragraph"

class ParagraphComponent extends TextBlockComponent {
  render($$) {
    let el = super.render.call(this, $$)
    return el.addClass('sc-paragraph')
  }
}

/*
 * HTML converter for Paragraph.
 */
var ParagraphHTMLConverter = {

  type: 'paragraph',
  tagName: 'p',

  import: function(el, node, converter) {
    node.content = converter.annotatedText(el, [node.id, 'content']);
  },

  export: function(node, el, converter) {
    el.append(converter.annotatedText([node.id, 'content']));
  }

}

var ParagraphPackage = {
  name: 'paragraph',
  configure: function(config) {
    config.addNode(Paragraph)
    config.addComponent(Paragraph.type, ParagraphComponent)
    config.addConverter('html', ParagraphHTMLConverter)
    config.addConverter('xml', ParagraphHTMLConverter)
    config.addTextType({
      name: 'paragraph',
      data: {type: 'paragraph'}
    })
    config.addLabel('paragraph', {
      en: 'Paragraph',
      de: 'Paragraph'
    })
    config.addLabel('paragraph.content', {
      en: 'Paragraph',
      de: 'Paragraph'
    })
  },
  Paragraph: Paragraph,
  ParagraphComponent: ParagraphComponent,
  ParagraphHTMLConverter: ParagraphHTMLConverter
}

class SaveCommand extends Command {
  constructor() {
    super({ name: 'save' })
  }

  getCommandState(props, context) {
    let dirty = context.documentSession.isDirty()
    return {
      disabled: !dirty,
      active: false
    }
  }

  execute(props, context) {
    let documentSession = context.documentSession
    documentSession.save()
    return {
      status: 'saving-process-started'
    }
  }
}

var PersistencePackage = {
  name: 'persistence',
  configure: function(config) {
    config.addCommand('save', SaveCommand)
    config.addTool('save', Tool, {target: 'document'})
    config.addIcon('save', { 'fontawesome': 'fa-save' })
    config.addLabel('save', {
      en: 'Save',
      de: 'Speichern'
    })
  },
  SaveCommand: SaveCommand
}

class Strong extends PropertyAnnotation {}

Strong.type = "strong"

// a hint that makes in case of overlapping annotations that this
// annotation gets fragmented more often
Strong.fragmentation = Fragmenter.ANY

/*
 * HTML converter for Strong.
 */
var StrongHTMLConverter = {

  type: "strong",
  tagName: "strong",

  matchElement: function(el) {
    return el.is("strong, b")
  }

}

var StrongPackage = {
  name: 'strong',
  configure: function(config, options) {
    options = options || {}
    config.addNode(Strong)
    config.addConverter('html', StrongHTMLConverter)
    config.addConverter('xml', StrongHTMLConverter)
    config.addComponent('strong', AnnotationComponent)
    config.addCommand('strong', AnnotationCommand, { nodeType: 'strong' })
    config.addTool('strong', AnnotationTool, {
      target: options.toolTarget || 'annotations'
    })
    config.addIcon('strong', { 'fontawesome': 'fa-bold' })
    config.addLabel('strong', {
      en: 'Strong emphasis',
      de: 'Starke Betonung'
    })
  },
  Strong: Strong,
  StrongHTMLConverter: StrongHTMLConverter
}

class Subscript extends PropertyAnnotation {}

Subscript.type = 'subscript'

// hint for rendering in presence of overlapping annotations
Subscript.fragmentation = Fragmenter.ANY

/*
   HTML converter for Subscript.
*/
var SubscriptHTMLConverter = {
  type: 'subscript',
  tagName: 'sub'
}

var SubscriptPackage = {
  name: 'subscript',
  configure: function(config) {
    config.addNode(Subscript)
    config.addConverter('html', SubscriptHTMLConverter)
    config.addConverter('xml', SubscriptHTMLConverter)
    config.addComponent('subscript', AnnotationComponent)
    config.addCommand('subscript', AnnotationCommand, { nodeType: 'subscript' })
    config.addTool('subscript', AnnotationTool, {target: 'annotations'})
    config.addIcon('subscript', { 'fontawesome': 'fa-subscript' })
    config.addLabel('subscript', {
      en: 'Subscript',
      de: 'Tiefgestellt'
    })
  },
  Subscript: Subscript,
  SubscriptHTMLConverter: SubscriptHTMLConverter
}

class Superscript extends PropertyAnnotation {}

Superscript.type = 'superscript'

// hint for rendering in presence of overlapping annotations
Superscript.fragmentation = Fragmenter.ANY

/*
 * HTML converter for Superscript.
 */
var SuperscriptHTMLConverter = {
  type: 'superscript',
  tagName: 'sup'
}

var SuperscriptPackage = {
  name: 'superscript',
  configure: function(config) {
    config.addNode(Superscript)
    config.addConverter('html', SuperscriptHTMLConverter)
    config.addConverter('xml', SuperscriptHTMLConverter)
    config.addComponent('superscript', AnnotationComponent)
    config.addCommand('superscript', AnnotationCommand, { nodeType: 'superscript' })
    config.addTool('superscript', AnnotationTool, {target: 'annotations'})
    config.addIcon('superscript', { 'fontawesome': 'fa-superscript' })
    config.addLabel('superscript', {
      en: 'Superscript',
      de: 'Hochgestellt'
    })
  },
  Superscript: Superscript,
  SuperscriptHTMLConverter: SuperscriptHTMLConverter
}

class TableNode extends BlockNode {

  getRowCount() {
    return this.cells.length
  }

  getColCount() {
    if (this.cells.length > 0) {
      return this.cells[0].length
    } else {
      return 0
    }
  }

}

TableNode.type = "table"

TableNode.define({
  // HACK: very low-levelish schema, where the objects will be entries
  // like `{ content: 'p1'}` plus maybe some more meta such as `cellType`
  // TODO: refine when we know exactly what we need
  "cells": { type: ['array', 'array', 'id'], default: [] }
})

let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function getColumnName(col) {
  if (!isNumber$1(col)) {
    throw new Error('Illegal argument.')
  }
  let name = ""
  while(col >= 0) {
    let mod = col % ALPHABET.length
    col = Math.floor(col/ALPHABET.length)
    name = ALPHABET[mod] + name
    if (col > 0) col--
    else break
  }
  return name
}

function getRowName(idx) {
  return String(idx+1)
}

function getColumnIndex(colStr) {
  let index = 0
  let rank = 1
  for (let i = 0; i < colStr.length; i++) {
    let letter = colStr[i]
    index += rank * ALPHABET.indexOf(letter)
    rank++
  }
  return index
}

function getCellId(row,col) {
  return getColumnName(col)+(row+1)
}

function getRowColFromId(id) {
  let match = /^([A-Z]+)([1-9][0-9]*)$/.exec(id)
  return [
    parseInt(match[2], 10)-1,
    getColumnIndex(match[1])
  ]
}

var tableHelpers = {
  getColumnName: getColumnName,
  getRowName: getRowName,
  getColumnIndex: getColumnIndex,
  getCellId: getCellId,
  getRowColFromId: getRowColFromId
}

var isUndefined = createCommonjsModule(function (module) {
/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;
});

var isUndefined$1 = interopDefault(isUndefined);

/**
  Import HTML from clipboard. Used for inter-application copy'n'paste.
*/

class ClipboardImporter extends HTMLImporter {
  
  constructor(config) {
    ClipboardImporter._addConverters(config)

    if (!config.schema) {
      throw new Error('Missing argument: config.schema is required.')
    }

    super(config)
    // disabling warnings about default importers
    this.IGNORE_DEFAULT_WARNINGS = true

    extend$1(config, {
      trimWhitespaces: true,
      REMOVE_INNER_WS: true
    })

    // ATTENTION: this is only here so we can enfore windows conversion
    // mode from within tests
    this._isWindows = platform.isWindows

    this._emptyDoc = this._createDocument(this.schema)
  }

  /**
    Parses HTML and applies some sanitization/normalization.
  */
  importDocument(html) {
    let body, el

    if (this._isWindows) {
      // Under windows we can exploit <!--StartFragment--> and <!--EndFragment-->
      // to have an easier life
      let match = /<!--StartFragment\-->(.*)<!--EndFragment-->/.exec(html)
      if (match) {
        html = match[1]
      }
    }

    // when copying from a substance editor we store JSON in a meta tag
    // Then we parse the
    // If the import fails e.g. because the schema is incompatible
    // we fall back to plain HTML import
    if (html.search(/meta name=.substance./)>=0) {
      el = DefaultDOMElement.parseHTML(html)
      let substanceData = el.find('meta[name="substance"]')
      if (substanceData) {
        let jsonStr = atob(substanceData.attr('content'))
        jsonStr = decodeURIComponent(jsonStr)
        try {
          return this.importFromJSON(jsonStr)
        } catch(err) {
          console.error(err)
        }
      }
    }

    el = DefaultDOMElement.parseHTML(html)
    if (isArray$1(el)) {
      body = this._createElement('body')
      body.append(el)
    } else {
      body = el.find('body')
    }
    if (!body) {
      body = this._createElement('body')
      body.append(el)
    }
    body = this._fixupGoogleDocsBody(body)
    if (!body) {
      console.warn('Invalid HTML.')
      return null
    }

    this.reset()
    this.convertBody(body)
    let doc = this.generateDocument()
    return doc
  }

  _fixupGoogleDocsBody(body) {
    if (!body) return
    // Google Docs has a strange convention to use a bold tag as
    // container for the copied elements
    // HACK: we exploit the fact that this element has an id with a
    // specific format, e.g., id="docs-internal-guid-5bea85da-43dc-fb06-e327-00c1c6576cf7"
    let bold = body.find('b')
    if (bold && /^docs-internal/.exec(bold.id)) {
      return bold
    }
    return body
  }

  importFromJSON(jsonStr) {
    let doc = this.createDocument()
    let jsonData = JSON.parse(jsonStr)
    let converter = new JSONConverter()
    converter.importDocument(doc, jsonData)
    return doc
  }

  /**
    Converts all children of a given body element.

    @param {String} body body element of given HTML document
  */
  convertBody(body) {
    this.convertContainer(body.childNodes, Document.SNIPPET_ID)
  }

  _wrapInlineElementsIntoBlockElement(childIterator) {
    let wrapper = this._createElement('p')
    while(childIterator.hasNext()) {
      let el = childIterator.next()
      // if there is a block node we finish this wrapper
      let blockTypeConverter = this._getConverterForElement(el, 'block')
      if (blockTypeConverter) {
        childIterator.back()
        break
      }
      wrapper.append(el.clone())
    }
    // HACK: usually when we run into this case, then there is inline data only
    // Instead of detecting this case up-front we just set the proper id
    // and hope that all goes well.
    // Note: when this is called a second time, the id will be overridden.
    wrapper.attr('data-id', Document.TEXT_SNIPPET_ID)
    let node = this.defaultConverter(wrapper, this)
    if (node) {
      if (!node.type) {
        throw new Error('Contract: Html.defaultConverter() must return a node with type.')
      }
      this._createAndShow(node)
    }
    return node
  }

  /**
    Creates substance document to paste.

    @return {Document} the document instance
  */
  createDocument() {
    return this._emptyDoc.createSnippet()
  }

  _getUnsupportedNodeConverter() {
    // nothing
  }

}

let _converters = {
  'catch-all-block': {
    type: 'paragraph',
    matchElement: function(el) { return el.is('div') },
    import: function(el, node, converter) {
      node.content = converter.annotatedText(el, [node.id, 'content'])
    }
  }
}

ClipboardImporter._addConverters = function(config) {
  if (config.converters) {
    let registry = new Registry()
    config.converters.forEach(function(conv, name) {
      registry.add(name, conv)
    });
    forEach$1(_converters, function(converter, name) {
      registry.add(name, converter)
    });
    config.converters = registry
  }
}

/**
  Export HTML from clipboard. Used for inter-application copy'n'paste.
*/
class ClipboardExporter extends HTMLExporter {

  /**
    Exports document in html format.

    @param {Document} doc document to export

    @return {String} html representation of given document
  */
  exportDocument(doc) {
    this.state.doc = doc
    let html
    let elements = this.convertDocument(doc);
    // special treatment for a text snippet
    if (elements.length === 1 && elements[0].attr('data-id') === Document.TEXT_SNIPPET_ID) {
      html = elements[0].innerHTML
    } else {
      html = elements.map(function(el) {
        return el.outerHTML
      }).join('')
    }
    let jsonConverter = new JSONConverter()
    let jsonStr = JSON.stringify(jsonConverter.exportDocument(doc))
    let meta = [
      "<meta name='substance' content='",
      btoa(jsonStr),
      "'>"
    ].join('')
    return '<html><head>' +meta+ '</head><body>' + html + '</body></html>'
  }

  /**
    Coverts document to set of DOM elements.

    @param {Document} doc document to convert

    @return {Array} array of DOM elements each represented single node
  */
  convertDocument(doc) {
    let content = doc.get(Document.SNIPPET_ID)
    if (!content) {
      throw new Error('Illegal clipboard document: could not find container "' + Document.SNIPPET_ID + '"')
    }
    return this.convertContainer(content)
  }

}

/**
  The Clipboard is a Component which should be rendered as a sibling component
  of one or multiple Surfaces.

  It uses the JSONImporter and JSONExporter for internal copy'n'pasting,
  i.e., within one window or between two instances with the same DocumentSchema.

  For inter-application copy'n'paste, the ClipboardImporter and ClipboardExporter is used.

  @class Clipboard
*/
class Clipboard {
  constructor(surface, config) {
    this.surface = surface
    let doc = surface.getDocument()
    let schema = doc.getSchema()

    let htmlConverters = []
    if (config.converterRegistry) {
      htmlConverters = config.converterRegistry.get('html') || []
    }
    let _config = {
      schema: schema,
      DocumentClass: doc.constructor,
      converters: htmlConverters
    }

    this.htmlImporter = new ClipboardImporter(_config)
    this.htmlExporter = new ClipboardExporter(_config)
  }

  getSurface() {
    return this.surface
  }

  /*
    Called by to enable clipboard handling on a given root element.
  */
  attach(el) {
    el.on('copy', this.onCopy, this)
    el.on('cut', this.onCut, this)
    if (platform.isIE && !platform.isEdge) {
      el.on('beforepaste', this.onBeforePasteShim, this)
    } else {
      el.on('paste', this.onPaste, this)
    }
  }

  /*
    Called by to disable clipboard handling.
  */
  detach(el) {
    el.off(this)
  }

  /*
    Called when copy event fired.

    @param {Event} event
  */
  onCopy(event) {
    // console.log("Clipboard.onCopy", arguments);
    let clipboardData = this._copy();
    // in the case that browser doesn't provide event.clipboardData
    // we keep the copied data for internal use.
    // Then we have copy'n'paste at least within one app
    Clipboard.clipboardData = clipboardData
    // FOR DEBUGGING
    substanceGlobals$1.clipboardData = clipboardData
    substanceGlobals$1._clipboardData = event.clipboardData
    if (event.clipboardData && clipboardData.doc) {
      event.preventDefault()
      // store as plain text and html
      event.clipboardData.setData('text/plain', clipboardData.text)
      // WORKAROUND: under IE and Edge it is not permitted to set 'text/html'
      if (!platform.isIE && !platform.isEdge) {
        event.clipboardData.setData('text/html', clipboardData.html)
      }
    }
  }

  /*
    Called when cut event fired.

    @param {Event} event
  */
  onCut(event) {
    // preventing default behavior to avoid that contenteditable
    // destroys our DOM
    event.preventDefault()
    // console.log("Clipboard.onCut", arguments);
    this.onCopy(event)
    let surface = this.getSurface()
    if (!surface) return
    surface.transaction(function(tx, args) {
      return surface.delete(tx, args)
    })
  }

  /*
    Called when paste event fired.

    @param {Event} event
  */
  // Works on Safari/Chrome/FF
  onPaste(event) {
    let clipboardData = event.clipboardData

    let types = {}
    for (let i = 0; i < clipboardData.types.length; i++) {
      types[clipboardData.types[i]] = true
    }
    // console.log('onPaste(): received content types', types);

    event.preventDefault()
    event.stopPropagation()

    let plainText
    let html
    if (types['text/plain']) {
      plainText = clipboardData.getData('text/plain')
    }
    if (types['text/html']) {
      html = clipboardData.getData('text/html')
    }

    // HACK: to allow at least in app copy and paste under Edge (which blocks HTML)
    // we guess by comparing the old and new plain text
    if (platform.isEdge &&
        substanceGlobals$1.clipboardData &&
        substanceGlobals$1.clipboardData.text === plainText) {
      html = substanceGlobals$1.clipboardData.html
    } else {
      substanceGlobals$1.clipboardData = {
        text: plainText,
        html: html
      }
    }

    // console.log('onPaste(): html = ', html);

    // WORKAROUND: FF does not provide HTML coming in from other applications
    // so fall back to pasting plain text
    if (platform.isFF && !html) {
      this._pastePlainText(plainText)
      return
    }

    // if we have content given as HTML we let the importer assess the quality first
    // and fallback to plain text import if it's bad
    if (html) {
      if (Clipboard.NO_CATCH) {
        this._pasteHtml(html, plainText)
      } else {
        try {
          this._pasteHtml(html, plainText)
        } catch (err) {
          this._pastePlainText(plainText)
        }
      }
    } else {
      this._pastePlainText(plainText)
    }
  }

  /*
    Pastes a given plain text into the surface.

    @param {String} plainText plain text
  */
  _pastePlainText(plainText) {
    let surface = this.getSurface()
    surface.transaction(function(tx, args) {
      args.text = plainText
      return surface.paste(tx, args)
    })
  };

  onBeforePasteShim() {
    let surface = this.getSurface()
    if (!surface) return
    // console.log("Clipboard.onBeforePasteShim...");
    // HACK: need to work on the native element here
    let pasteEl = this._createPasteBin()
    let el = pasteEl.getNativeElement()
    el.focus()
    let range = window.document.createRange()
    range.setStart(el.firstChild, 0)
    range.setEnd(el.firstChild, 1)
    let wsel = window.getSelection()
    wsel.removeAllRanges()
    wsel.addRange(range)
  }

  // creates a contenteditable element which is used
  // to redirect a native paste into
  _createPasteBin() {
    let el = this.surface.el.createElement('div')
      .attr('contenteditable', true)
      .attr('tabindex', -1)
      .css({
        position: 'fixed',
        opacity: '0.0',
        bottom: '-1000px',
        // width: '0px'
      })
      .append(" ")
      .on('beforepaste', function(event) {
        event.stopPropagation()
      })
      .on('paste', function(event) {
        this.onPasteShim(el)
        event.stopPropagation()
      }.bind(this))
    this.surface.el.appendChild(el)
    return el
  }

  onPasteShim(pasteEl) {
    // NOTE: this delay is necessary to let the browser paste into the paste bin
    window.setTimeout(function() {
      // console.log('Clipboard.onPasteShim()...');
      let html = pasteEl.innerHTML
      let text = pasteEl.textContent
      // console.log('### ... text: %s, html: %s', text, html);
      pasteEl.remove()
      // FOR DEBUGGING
      substanceGlobals$1.clipboardData = {
        text: text,
        html: html
      }
      if (Clipboard.NO_CATCH) {
        this._pasteHtml(html, text)
      } else {
        try {
          this._pasteHtml(html, text)
        } catch (err) {
          this._pastePlainText(text)
        }
      }
    }.bind(this))
  }

  /*
    Copies data from surface to clipboard.
  */
  _copy() {
    let surface = this.getSurface()
    let sel = surface.getSelection()
    let doc = surface.getDocument()
    let clipboardDoc = null
    let clipboardText = ""
    let clipboardHtml = ""
    if (!sel.isCollapsed()) {
      clipboardText = documentHelpers.getTextForSelection(doc, sel) || ""
      clipboardDoc = surface.copy(doc, sel)
      clipboardHtml = this.htmlExporter.exportDocument(clipboardDoc)
    }
    return {
      doc: clipboardDoc,
      html: clipboardHtml,
      text: clipboardText
    }
  }

  /*
    Pastes a given parsed html document into the surface.

    @param {ui/DOMElement} docElement
    @param {String} text plain text representation used as a fallback
  */
  _pasteHtml(html, text) {
    let surface = this.getSurface()
    if (!surface) return
    // TODO: the clipboard importer should make sure
    // that the container exists
    let content = this.htmlImporter.importDocument(html)
    if (content) {
      surface.transaction(function(tx, args) {
        args.text = text
        args.doc = content
        return surface.paste(tx, args)
      });
      return true
    }
  }

}

oo.initClass(Clipboard);

/*
  A shim for browsers with an unsupported native clipboard.
*/
Clipboard.clipboardData = {
  doc: null,
  html: "",
  text: ""
}

/*
 * A class that maps DOM selections to model selections.
 *
 * There are some difficulties with mapping model selections:
 * 1. DOM selections can not model discontinuous selections.
 * 2. Not all positions reachable via ContentEditable can be mapped to model selections. For instance,
 *    there are extra positions before and after non-editable child elements.
 * 3. Some native cursor behaviors need to be overidden.
 *
 * @class DOMSelection
 * @constructor
 * @param {Element} rootElement
 */
class DOMSelection {
  constructor(surface) {
    this.surface = surface
    this._wrange = window.document.createRange()
  }

  /**
    Create a model selection by mapping the current DOM selection
    to model coordinates.

    @param {object} options
      - `direction`: `left` or `right`; a hint for disambiguations, used by Surface during cursor navigation.
    @returns {model/Selection}
  */
  getSelection(options) {
    let range = this.mapDOMSelection(options)
    let doc = this.surface.getDocument()
    return doc.createSelection(range)
  }

  getSelectionForDOMRange(wrange) {
    let range = this.mapDOMRange(wrange)
    let doc = this.surface.getDocument()
    return doc.createSelection(range)
  }

  // function _printStacktrace() {
  //   try {
  //     throw new Error();
  //   } catch (err) {
  //     console.log(err.stack);
  //   }
  // }

  /**
    Transfer a given model selection into the DOM.

    @param {model/Selection} sel
  */
  setSelection(sel) {
    // console.log('### DOMSelection: setting selection', sel.toString());
    let wSel = window.getSelection()
    if (sel.isNull() || sel.isCustomSelection()) {
      this.clear()
      return
    }
    let start, end
    if (sel.isPropertySelection() || sel.isContainerSelection()) {
      start = this._getDOMCoordinate(sel.start)
      if (!start) {
        console.warn('FIXME: selection seems to be invalid.')
        this.clear()
        return
      }
      if (sel.isCollapsed()) {
        end = start
      } else {
        end = this._getDOMCoordinate(sel.end)
        if (!end) {
          console.warn('FIXME: selection seems to be invalid.')
          this.clear()
          return
        }
      }
    } else if (sel.isNodeSelection()) {
      let comp = this.surface.find('*[data-id="'+sel.getNodeId()+'"]')
      if (!comp) {
        console.error('Could not find component with id', sel.getNodeId())
        this.clear()
        return
      }
      if (comp._isIsolatedNodeComponent) {
        let coors = IsolatedNodeComponent.getDOMCoordinates(comp)
        if (sel.isFull()) {
          start = coors.start
          end = coors.end
        } else if (sel.isBefore()) {
          start = end = coors.start
        } else {
          start = end = coors.end
        }
      } else {
        let _nodeEl = comp.el
        start = {
          container: _nodeEl.getNativeElement(),
          offset: 0
        }
        end = {
          container: _nodeEl.getNativeElement(),
          offset: _nodeEl.getChildCount()
        }
        if (sel.isBefore()) {
          end = start
        } else if (sel.isAfter()) {
          start = end
        }
      }
    }
    // console.log('Model->DOMSelection: mapped to DOM coordinates', start.container, start.offset, end.container, end.offset, 'isReverse?', sel.isReverse());

    // if there is a range then set replace the window selection accordingly
    let wRange
    if (wSel.rangeCount > 0) {
      wRange = wSel.getRangeAt(0)
    } else {
      wRange = this._wrange
    }
    wSel.removeAllRanges()
    if (sel.isCollapsed()) {
      wRange.setStart(start.container, start.offset)
      wRange.setEnd(start.container, start.offset)
      wSel.addRange(wRange)
    } else {
      if (sel.isReverse()) {
        // console.log('DOMSelection: rendering a reverse selection.');
        let tmp = start
        start = end
        end = tmp
        // HACK: using wRange setEnd does not work reliably
        // so we set just the start anchor
        // and then use window.Selection.extend()
        // unfortunately we are not able to test this behavior as it needs
        // triggering native keyboard events
        wRange.setStart(start.container, start.offset)
        wRange.setEnd(start.container, start.offset)
        wSel.addRange(wRange)
        wSel.extend(end.container, end.offset)
      } else {
        wRange.setStart(start.container, start.offset)
        wRange.setEnd(end.container, end.offset)
        wSel.addRange(wRange)
      }
    }
    // console.log('Model->DOMSelection: mapped selection to DOM', 'anchorNode:', wSel.anchorNode, 'anchorOffset:', wSel.anchorOffset, 'focusNode:', wSel.focusNode, 'focusOffset:', wSel.focusOffset, 'collapsed:', wSel.collapsed);
  }

  _getDOMCoordinate(coor) {
    let comp, domCoor = null
    if (coor.isNodeCoordinate()) {
      comp = this.surface.find('*[data-id="'+coor.getNodeId()+'"]')
      if (comp) {
        if (comp._isIsolatedNodeComponent) {
          domCoor = IsolatedNodeComponent.getDOMCoordinate(comp, coor)
        } else {
          domCoor = {
            container: comp.getNativeElement(),
            offset: coor.offset
          }
        }
      }
    } else {
      comp = this.surface._getTextPropertyComponent(coor.path)
      if (comp) {
        domCoor = comp.getDOMCoordinate(coor.offset)
      }
    }
    return domCoor
  }

  /*
    Map a DOM range to a model range.

    @param {Range} range
    @returns {model/Range}
  */
  mapDOMRange(wRange) {
    return this._getRange(
      DefaultDOMElement.wrapNativeElement(wRange.startContainer),
      wRange.startOffset,
      DefaultDOMElement.wrapNativeElement(wRange.endContainer),
      wRange.endOffset)
  }

  /*
    Maps the current DOM selection to a model range.

    @param {object} [options]
      - `direction`: `left` or `right`; a hint for disambiguations, used by Surface during cursor navigation.
    @returns {model/Range}
  */
  mapDOMSelection(options) {
    let range
    let wSel = window.getSelection()
    // Use this log whenever the mapping goes wrong to analyze what
    // is actually being provided by the browser
    // console.log('DOMSelection->Model: anchorNode:', wSel.anchorNode, 'anchorOffset:', wSel.anchorOffset, 'focusNode:', wSel.focusNode, 'focusOffset:', wSel.focusOffset, 'collapsed:', wSel.collapsed);
    if (wSel.rangeCount === 0) {
      return null;
    }
    let anchorNode = DefaultDOMElement.wrapNativeElement(wSel.anchorNode)
    if (wSel.isCollapsed) {
      let coor = this._getCoordinate(anchorNode, wSel.anchorOffset, options)
      if (!coor) return null
      // EXPERIMENTAL: when the cursor is in an IsolatedNode
      // we return a selection for the whole node
      if (coor.__inIsolatedBlockNode__) {
        range = _createRangeForIsolatedBlockNode(coor.path[0], this.getContainerId())
      } else if (coor.__inInlineNode__) {
        // HACK: relying on hints left by InlineNodeComponent.getCoordinate()
        range = _createRange(
          new Coordinate(coor.path, coor.__startOffset__),
          new Coordinate(coor.path, coor.__endOffset__),
          false, this.getContainerId()
        )
      } else {
        range = _createRange(coor, coor, false, this.getContainerId())
      }
    }
    // HACK: special treatment for edge cases as addressed by #354.
    // Sometimes anchorNode and focusNodes are the surface
    else {
      if (anchorNode.isElementNode() && anchorNode.is('.sc-surface')) {
        range = this._getEnclosingRange(wSel.getRangeAt(0))
      } else {
        let focusNode = DefaultDOMElement.wrapNativeElement(wSel.focusNode)
        range = this._getRange(anchorNode, wSel.anchorOffset, focusNode, wSel.focusOffset)
      }
    }
    // console.log('DOMSelection->Model: extracted range', range.toString());
    return range
  }

  /*
    Clear the DOM selection.
  */
  clear() {
    window.getSelection().removeAllRanges()
  }

  collapse(dir) {
    let wSel = window.getSelection()
    let wRange
    if (wSel.rangeCount > 0) {
      wRange = wSel.getRangeAt(0)
      wRange.collapse(dir === 'left')
      wSel.removeAllRanges()
      wSel.addRange(wRange)
    }
  }

  getContainerId() {
    if (this.surface.isContainerEditor()) {
      return this.surface.getContainerId();
    } else {
      return null;
    }
  }

  /*
    Extract a model range from given DOM elements.

    @param {Node} anchorNode
    @param {number} anchorOffset
    @param {Node} focusNode
    @param {number} focusOffset
    @returns {model/Range}
  */
  _getRange(anchorNode, anchorOffset, focusNode, focusOffset) {
    let start = this._getCoordinate(anchorNode, anchorOffset)
    let end
    if (anchorNode === focusNode && anchorOffset === focusOffset) {
      end = start
    } else {
      end = this._getCoordinate(focusNode, focusOffset)
    }
    let isReverse = DefaultDOMElement.isReverse(anchorNode, anchorOffset, focusNode, focusOffset)
    if (start && end) {
      return _createRange(start, end, isReverse, this.getContainerId())
    } else {
      return null
    }
  }

  /*
    Map a DOM coordinate to a model coordinate.

    @param {Node} node
    @param {number} offset
    @param {object} options
    @param {object} [options]
      - `direction`: `left` or `right`; a hint for disambiguation.
    @returns {model/Coordinate}

    @info

    `options.direction` can be used to control the result when this function is called
    after cursor navigation. The root problem is that we are using ContentEditable on
    Container level (as opposed to TextProperty level). The native ContentEditable allows
    cursor positions which do not make sense in the model sense.

    For example,

    ```
    <div contenteditable=true>
      <p data-path="p1.content">foo</p>
      <img>
      <p data-path="p1.content">bar</p>
    </div>
    ```
    would allow to set the cursor directly before or after the image, which
    we want to prevent, as it is not a valid insert position for text.
    Instead, if we find the DOM selection in such a situation, then we map it to the
    closest valid model address. And this depends on the direction of movement.
    Moving `left` would provide the previous address, `right` would provide the next address.
    The default direction is `right`.
  */
  _getCoordinate(nodeEl, offset, options) {
    // Trying to apply the most common situation first
    // and after that covering known edge cases
    let surfaceEl = this.surface.el
    let coor = null
    if (!coor) {
      coor = InlineNodeComponent.getCoordinate(nodeEl, offset)
      if (coor) {
        coor.__inInlineNode__ = true
      }
    }
    // as this is the most often case, try to map the coordinate within
    // a TextPropertyComponent
    if (!coor) {
      coor = TextPropertyComponent.getCoordinate(surfaceEl, nodeEl, offset)
    }
    // special treatment for isolated nodes
    if (!coor) {
      coor = IsolatedNodeComponent.getCoordinate(surfaceEl, nodeEl, offset)
      if (coor) {
        coor.__inIsolatedBlockNode__ = true
      }
    }
    // finally fall back to a brute-force search
    if (!coor) {
      coor = this._searchForCoordinate(nodeEl, offset, options)
    }
    return coor
  }

  /*
    Map a DOM coordinate to a model coordinate via a brute-force search
    on all properties.

    This is used as a backup strategy for delicate DOM selections.

    @param {Node} node
    @param {number} offset
    @param {object} options
    @param {'left'|'right'} options.direction
    @returns {model/Coordinate} the coordinate
  */
  _searchForCoordinate(node, offset, options) {
    // NOTE: assuming that most situations are covered by
    // TextPropertyComponent.getCoordinate already, we are trying just to
    // solve the remaining scenarios, in an opportunistic way
    options = options || {}
    options.direction = options.direction || 'right'
    let dir = options.direction
    if (node.isElementNode()) {
      let childCount = node.getChildCount()
      offset = Math.max(0, Math.min(childCount, offset))
      let el = node.getChildAt(offset)
      while (el) {
        let textPropertyEl
        if (dir === 'right') {
          if (el.isElementNode()) {
            if (el.getAttribute('data-path')) {
              textPropertyEl = el
            } else {
              textPropertyEl = el.find('*[data-path]')
            }
            if (textPropertyEl) {
              return new Coordinate(_getPath(textPropertyEl), 0)
            }
          }
          el = el.getNextSibling()
        } else {
          if (el.isElementNode()) {
            if (el.getAttribute('data-path')) {
              textPropertyEl = el
            } else {
              let textPropertyEls = el.findAll('*[data-path]')
              textPropertyEl = last$1(textPropertyEls)
            }
            if (textPropertyEl) {
              let path = _getPath(textPropertyEl)
              let doc = this.surface.getDocument()
              let text = doc.get(path)
              return new Coordinate(path, text.length)
            }
          }
          el = el.getPreviousSibling()
        }
      }
    }
    // if we land here then we could not find an addressable element on this level.
    // try to find it one level higher
    if (node !== this.surface.el) {
      let parent = node.getParent()
      let nodeIdx = parent.getChildIndex(node)
      if (dir === 'right') {
        nodeIdx++
      }
      return this._searchForCoordinate(parent, nodeIdx, options)
    }

    return null
  }

  /*
    Computes a model range that encloses all properties
    spanned by a given DOM range.

    This is used in edge cases, where DOM selection anchors are not
    within TextProperties.

    @param {Range} range
    @returns {model/Range}
  */
  _getEnclosingRange(wRange) {
    let frag = wRange.cloneContents()
    let props = frag.querySelectorAll('*[data-path]')
    if (props.length === 0) {
      return null
    } else {
      let doc = this.surface.getDocument()
      let first = props[0]
      let last = props[props.length-1]
      let startPath = _getPath(first)
      let text
      if (first === last) {
        text = doc.get(startPath)
        return new Range(
          new Coordinate(startPath, 0),
          new Coordinate(startPath, text.length),
          false
        )
      } else {
        let endPath = _getPath(last)
        text = doc.get(endPath)
        return new Range(
          new Coordinate(startPath, 0),
          new Coordinate(endPath, text.length),
          false
        )
      }
    }
  }
}

function _getPath(el) {
  if (!el._isDOMElement) {
    el = DefaultDOMElement.wrapNativeElement(el)
  }
  if (el.isElementNode()) {
    let pathStr = el.getAttribute('data-path')
    return pathStr.split('.')
  }
  throw new Error("Can't get path from element:" + el.outerHTML)
}

/*
 Helper for creating a model range correctly
 as for model/Range start should be before end.

 In contrast to that, DOM selections are described with anchor and focus coordinates,
 i.e. bearing the information of direction implicitly.
 To simplify the implementation we treat anchor and focus equally
 and only at the end exploit the fact deriving an isReverse flag
 and bringing start and end in the correct order.
*/
function _createRange(start, end, isReverse, containerId) {
  if (isReverse) {
    let tmp = start
    start = end
    end = tmp
  }
  return new Range(start, end, isReverse, containerId)
}

function _createRangeForIsolatedBlockNode(nodeId, containerId) {
  return new Range(new Coordinate([nodeId], 0), new Coordinate([nodeId], 1), false, containerId)
}

oo.initClass(DOMSelection)

class UnsupportedNodeComponent extends Component {

  render($$) {
    return $$('pre')
      .addClass('content-node unsupported')
      .attr({
        'data-id': this.props.node.id,
        contentEditable: false
      })
      .append(
        JSON.stringify(this.props.node.properties, null, 2)
      )
  }
}

/**
   Abstract interface for editing components.
   Dances with contenteditable, so you don't have to.

   @class
   @component
   @abstract
*/
class Surface extends Component {
  constructor(...args) {
    super(...args)

    // DocumentSession instance must be provided either as a prop
    // or via dependency-injection
    this.documentSession = this.props.documentSession || this.context.documentSession
    if (!this.documentSession) {
      throw new Error('No DocumentSession provided')
    }
    this.name = this.props.name
    if (!this.name) {
      throw new Error('Surface must have a name.')
    }
    if (this.name.indexOf('/') > -1) {
      // because we are using '/' to deal with nested surfaces (isolated nodes)
      throw new Error("Surface.name must not contain '/'")
    }
    // this path is an identifier unique for this surface
    // considering nesting in IsolatedNodes
    this._surfaceId = createSurfaceId(this)

    this.clipboard = new Clipboard(this, {
      converterRegistry: this.context.converterRegistry
    })

    this.domSelection = null
    this.domObserver = null

    // HACK: we need to listen to mousup on document
    // to catch events outside the surface
    if (inBrowser) {
      this.documentEl = DefaultDOMElement.wrapNativeElement(window.document)
    }

    // set when editing is enabled
    this.undoEnabled = true
    this.textTypes = this.props.textTypes

    // a registry for TextProperties which allows us to dispatch changes
    this._textProperties = {}

    this._state = {
      // true if the document session's selection is addressing this surface
      skipNextFocusEvent: false,
      skipNextObservation: false,
      // used to avoid multiple rerenderings (e.g. simultanous update of text and fragments)
      isDirty: false,
      dirtyProperties: {},
      // while fragments are provided as a hash of (type -> [Fragment])
      // we derive a hash of (prop-key -> [Fragment]); in other words, Fragments grouped by property
      fragments: {},
      // we want to show the cursor fragment only when blurred, so we keep it separated from the other fragments
      cursorFragment: null
    }

    Surface.prototype._deriveInternalState.call(this, this.props)
  }

  get _isSurface() {
    return true 
  }

  getChildContext() {
    return {
      surface: this,
      surfaceParent: this,
      doc: this.getDocument()
    }
  }

  didMount() {
    if (this.context.surfaceManager) {
      this.context.surfaceManager.registerSurface(this)
    }
    if (!this.isReadonly() && inBrowser) {
      this.domSelection = new DOMSelection(this)
      // this.domObserver = new window.MutationObserver(this.onDomMutations.bind(this));
      // this.domObserver.observe(this.el.getNativeElement(), { subtree: true, characterData: true, characterDataOldValue: true });
    }
    this.documentSession.on('update', this._onSessionUpdate, this)
  }


  dispose() {
    this.documentSession.off(this)
    this.domSelection = null
    if (this.domObserver) {
      this.domObserver.disconnect()
    }
    if (this.context.surfaceManager) {
      this.context.surfaceManager.unregisterSurface(this)
    }
  }

  willReceiveProps(nextProps) {
    Surface.prototype._deriveInternalState.call(this, nextProps)
  }

  didUpdate(oldProps, oldState) {
    this._update(oldProps, oldState)
  }

  render($$) {
    let tagName = this.props.tagName || 'div'
    let el = $$(tagName)
      .addClass('sc-surface')
      .attr('spellCheck', false)
      .attr('tabindex', 2)

    if (!this.isDisabled()) {
      if (this.isEditable()) {
        // Keyboard Events
        el.on('keydown', this.onKeyDown)
        // OSX specific handling of dead-keys
        if (!platform.isIE) {
          el.on('compositionstart', this.onCompositionStart)
        }
        // Note: TextEvent in Chrome/Webkit is the easiest for us
        // as it contains the actual inserted string.
        // Though, it is not available in FF and not working properly in IE
        // where we fall back to a ContentEditable backed implementation.
        if (inBrowser && window.TextEvent && !platform.isIE) {
          el.on('textInput', this.onTextInput)
        } else {
          el.on('keypress', this.onTextInputShim)
        }
      }
      if (!this.isReadonly()) {
        // Mouse Events
        el.on('mousedown', this.onMouseDown)
        // disable drag'n'drop
        // we will react on this to render a custom selection
        el.on('focus', this.onNativeFocus)
        el.on('blur', this.onNativeBlur)
        // activate the clipboard
        this.clipboard.attach(el)
      }

      if (this.context.dragManager) {
        el.on('drop', this.onDrop)
      }

    }
    return el
  }

  renderNode($$, node) {
    let doc = this.getDocument()
    let componentRegistry = this.getComponentRegistry()
    let ComponentClass = componentRegistry.get(node.type)
    if (!ComponentClass) {
      console.error('Could not resolve a component for type: ' + node.type)
      ComponentClass = UnsupportedNodeComponent
    }
    return $$(ComponentClass, {
      doc: doc,
      node: node
    }).ref(node.id)
  }

  getComponentRegistry() {
    return this.context.componentRegistry || this.props.componentRegistry
  }

  getName() {
    return this.name
  }

  getId() {
    return this._surfaceId
  }

  isDisabled() {
    return this.props.disabled
  }

  isEditable() {
    return (this.props.editing === "full" || this.props.editing === undefined)
  }

  isSelectable() {
    return (this.props.editing === "selection" || this.props.editing === "full")
  }

  isReadonly() {
    return this.props.editing === "readonly"
  }

  getElement() {
    return this.el
  }

  getController() {
    return this.context.controller
  }

  getDocument() {
    return this.documentSession.getDocument()
  }

  getDocumentSession() {
    return this.documentSession
  }

  isEnabled() {
    return !this.state.disabled
  }

  isContainerEditor() {
    return false
  }

  getContainerId() {
    return null
  }

  /**
    Run a transformation as a transaction properly configured for this surface.

    @param transformation a transformation function(tx, args) which receives
                          the selection the transaction was started with, and should return
                          output arguments containing a selection, as well.

    @example

    Returning a new selection:
    ```js
    surface.transaction(function(tx, args) {
      var selection = args.selection;
      ...
      selection = tx.createSelection(...);
      return {
        selection: selection
      };
    });
    ```

    Adding event information to the transaction:

    ```js
    surface.transaction(function(tx, args) {
      tx.info.foo = 'bar';
      ...
    });
    ```
   */
  transaction(transformation, info) {
    // TODO: we would like to get rid of this method, and only have
    // documentSession.transaction()
    // The problem is, that we need to get surfaceId into the change,
    // to be able to set the selection into the right surface.
    // ATM we put this into the selection, which is hacky, and makes it
    // unnecessarily inconvient to create selections.
    // Maybe documentSession should provide a means to augment the before/after
    // state of a change.
    let documentSession = this.documentSession
    let surfaceId = this.getId()
    return documentSession.transaction(function(tx, args) {
      tx.before.surfaceId = surfaceId
      return transformation(tx, args)
    }, info)
  }

  getSelection() {
    return this.documentSession.getSelection()
  }

  /**
   * Set the model selection and update the DOM selection accordingly
   */
  setSelection(sel) {
    // console.log('Surface.setSelection()', this.name, sel);
    // storing the surface id so that we can associate
    // the selection with this surface later
    if (sel && !sel.isNull()) {
      sel.surfaceId = this.getId()
      sel.containerId = sel.containerId || this.getContainerId()
    }
    this._setSelection(sel)
  }

  blur() {
    if (this.el) {
      this.el.blur()
    }
  }

  focus() {
    if (this.isDisabled()) return
    // console.log('Focusing surface %s explicitly with Surface.focus()', this.getId());
    // NOTE: FF is causing problems with dynamically activated contenteditables
    // and focusing
    if (platform.isFF) {
      this.domSelection.clear()
      this.el.getNativeElement().blur()
    }
    this._focus()
  }

  rerenderDOMSelection() {
    if (this.isDisabled()) return
    if (inBrowser) {
      // console.log('Surface.rerenderDOMSelection', this.__id__);
      let sel = this.getSelection()
      if (sel.surfaceId === this.getId()) {
        this.domSelection.setSelection(sel)
      }
    }
  }

  getDomNodeForId(nodeId) {
    return this.el.getNativeElement().querySelector('*[data-id="'+nodeId+'"]')
  }

  /* Editing behavior */

  /* Note: In a regular Surface all text properties are treated independently
     like in a form */

  /**
    Selects all text
  */
  selectAll() {
    let doc = this.getDocument()
    let sel = this.getSelection()
    if (sel.isPropertySelection()) {
      let path = sel.path
      let text = doc.get(path)
      sel = doc.createSelection({
        type: 'property',
        path: path,
        startOffset: 0,
        endOffset: text.length
      })
      this.setSelection(sel)
    }
  }

  /**
    Performs an {@link model/transform/insertText} transformation
  */
  insertText(tx, args) {
    let sel = args.selection
    if (sel.isPropertySelection() || sel.isContainerSelection()) {
      return insertText(tx, args)
    }
  }

  /**
    Performs a {@link model/transform/deleteSelection} transformation
  */
  delete(tx, args) {
    let sel = args.selection
    if (!sel.isCollapsed()) {
      return deleteSelection(tx, args)
    }
    else if (sel.isPropertySelection() || sel.isNodeSelection()) {
      return deleteCharacter(tx, args)
    }
  }

  // No breaking in properties, insert softbreak instead
  break(tx, args) {
    return this.softBreak(tx, args)
  }

  /**
    Inserts a soft break
  */
  softBreak(tx, args) {
    args.text = "\n"
    return this.insertText(tx, args)
  }

  /**
    Copy the current selection. Performs a {@link model/transform/copySelection}
    transformation.
  */
  copy(doc, selection) {
    let result = copySelection(doc, { selection: selection })
    return result.doc
  }

  /**
    Performs a {@link model/transform/paste} transformation
  */
  paste(tx, args) {
    // TODO: for now only plain text is inserted
    // We could do some stitching however, preserving the annotations
    // received in the document
    if (args.text) {
      return this.insertText(tx, args)
    }
  }

  /* Event handlers */

  /*
   * Handle document key down events.
   */
  onKeyDown(event) {
    // console.log('Surface.onKeyDown()', this.getId());

    let commandManager = this.context.commandManager
    if ( event.which === 229 ) {
      // ignore fake IME events (emitted in IE and Chromium)
      return
    }
    switch ( event.keyCode ) {
      case keys$2.LEFT:
      case keys$2.RIGHT:
        return this._handleLeftOrRightArrowKey(event)
      case keys$2.UP:
      case keys$2.DOWN:
        return this._handleUpOrDownArrowKey(event)
      case keys$2.ENTER:
        return this._handleEnterKey(event)
      case keys$2.SPACE:
        return this._handleSpaceKey(event)
      case keys$2.BACKSPACE:
      case keys$2.DELETE:
        return this._handleDeleteKey(event)
      case keys$2.HOME:
      case keys$2.END:
        return this._handleHomeOrEndKey(event)
      case keys$2.PAGEUP:
      case keys$2.PAGEDOWN:
        return this._handlePageUpOrDownKey(event)
      default:
        break
    }

    // Note: when adding a new handler you might want to enable this log to see keyCodes etc.
    // console.log('####', event.keyCode, event.metaKey, event.ctrlKey, event.shiftKey);

    // Built-in key combos
    // Ctrl+A: select all
    let handled = false
    if ( (event.ctrlKey||event.metaKey) && event.keyCode === 65) {
      this.selectAll()
      handled = true
    }
    // Undo/Redo: cmd+z, cmd+shift+z
    else if (this.undoEnabled && event.keyCode === 90 && (event.metaKey||event.ctrlKey)) {
      if (event.shiftKey) {
        commandManager.executeCommand('redo')
      } else {
        commandManager.executeCommand('undo')
      }
      handled = true
    }
    // Toggle strong: cmd+b ctrl+b
    else if (event.keyCode === 66 && (event.metaKey||event.ctrlKey)) {
      commandManager.executeCommand('strong')
      handled = true
    }
    // Toggle emphasis: cmd+i ctrl+i
    else if (event.keyCode === 73 && (event.metaKey||event.ctrlKey)) {
      commandManager.executeCommand('emphasis')
      handled = true
    }
    // Toggle link: cmd+k ctrl+k
    else if (event.keyCode === 75 && (event.metaKey||event.ctrlKey)) {
      commandManager.executeCommand('link')
      handled = true
    }

    if (handled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  onTextInput(event) {
    // console.log("TextInput:", event);
    event.preventDefault()
    event.stopPropagation()
    if (!event.data) return
    // necessary for handling dead keys properly
    this._state.skipNextObservation=true
    this.transaction(function(tx, args) {
      if (this.domSelection) {
        // trying to remove the DOM selection to reduce flickering
        this.domSelection.clear()
      }
      args.text = event.data
      return this.insertText(tx, args)
    }.bind(this), { action: 'type' })
  }

  // Handling Dead-keys under OSX
  onCompositionStart() {
    // just tell DOM observer that we have everything under control
    this._state.skipNextObservation = true
  }

  onTextInputShim(event) {
    // Filter out non-character keys
    if (
      // Catches most keys that don't produce output (charCode === 0, thus no character)
      event.which === 0 || event.charCode === 0 ||
      // Opera 12 doesn't always adhere to that convention
      event.keyCode === keys$2.TAB || event.keyCode === keys$2.ESCAPE ||
      // prevent combinations with meta keys, but not alt-graph which is represented as ctrl+alt
      Boolean(event.metaKey) || (Boolean(event.ctrlKey)^Boolean(event.altKey))
    ) {
      return
    }
    let character = String.fromCharCode(event.which)
    this._state.skipNextObservation=true
    if (!event.shiftKey) {
      character = character.toLowerCase()
    }
    if (character.length>0) {
      this.transaction(function(tx, args) {
        if (this.domSelection) {
          // trying to remove the DOM selection to reduce flickering
          this.domSelection.clear()
        }
        args.text = character;
        return this.insertText(tx, args)
      }.bind(this), { action: 'type' })
      event.preventDefault()
      event.stopPropagation()
      return
    } else {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  // TODO: the whole mouse event based selection mechanism needs
  // to be redesigned. The current implementation works basically
  // though, there are some things which do not work well cross-browser
  // particularly, double- and triple clicks.
  // also it turned out to be problematic to react on mouse down instantly
  onMouseDown(event) {
    // console.log('mousedown on', this.getId());
    // event.stopPropagation();

    // special treatment for triple clicks
    if (!(platform.isIE && platform.version<12) && event.detail >= 3) {
      let sel = this.getSelection()
      if (sel.isPropertySelection()) {
        this._selectProperty(sel.path)
        event.preventDefault()
        event.stopPropagation()
        return
      } else if (sel.isContainerSelection()) {
        this._selectProperty(sel.startPath)
        event.preventDefault()
        event.stopPropagation()
        return
      }
    }
    // TODO: what is this exactly?
    if ( event.which !== 1 ) {
      return
    }
    // 'mouseDown' is triggered before 'focus' so we tell
    // our focus handler that we are already dealing with it
    // The opposite situation, when the surface gets focused e.g. using keyboard
    // then the handler needs to kick in and recover a persisted selection or such
    this._state.skipNextFocusEvent = true

    // UX-wise, the proper way is to apply the selection on mousedown, and if a drag is started (range selection)
    // we could maybe map the selection during the drag, but finally once after mouse is released.
    // TODO: this needs to be solved properly; be aware of browser incompatibilities
    // HACK: not working in IE which then does not allow a range selection anymore
    // if (!platform.isIE) {
    //   // HACK: clearing the DOM selection, otherwise we have troubles with the old selection being in the way for the next selection
    //   this.domSelection.clear();
    //   setTimeout(function() {
    //     if (this.domSelection) {
    //       var sel = this.domSelection.getSelection();
    //       this.setSelection(sel);
    //     }
    //   }.bind(this));
    // }

    // Bind mouseup to the whole document in case of dragging out of the surface
    if (this.documentEl) {
      // TODO: we should handle mouse up only if we started a drag (and the selection has really changed)
      this.documentEl.on('mouseup', this.onMouseUp, this, { once: true })
    }
  }

  onMouseUp() {
    // console.log('mouseup on', this.getId());
    // ATTENTION: this delay is necessary for cases the user clicks
    // into an existing selection. In this case the window selection still
    // holds the old value, and is set to the correct selection after this
    // being called.
    setTimeout(function() {
      if (this.domSelection) {
        let sel = this.domSelection.getSelection()
        this.setSelection(sel)
      }
    }.bind(this))
  }

  onDomMutations(e) {
    if (this._state.skipNextObservation) {
      this._state.skipNextObservation = false
      return
    }
    // Known use-cases:
    //  - Context-menu:
    //      - Delete
    //      - Note: copy, cut, paste work just fine
    //  - dragging selected text
    //  - spell correction
    console.info("We want to enable a DOM MutationObserver which catches all changes made by native interfaces (such as spell corrections, etc). Lookout for this message and try to set Surface.skipNextObservation=true when you know that you will mutate the DOM.", e)
  }

  onDrop(event) {
    // console.log('Received drop on Surface', this.getId(), event);
    this.context.dragManager.onDrop(event, this)
  }

  onNativeBlur() {
    // console.log('Native blur on surface', this.getId());
    let _state = this._state
    _state.hasNativeFocus = false
  }

  onNativeFocus() {
    // console.log('Native focus on surface', this.getId());
    let _state = this._state
    _state.hasNativeFocus = true
  };

  // Internal implementations

  // called whenever we receive props
  // used to compute fragments that get dispatched to TextProperties
  _deriveInternalState(nextProps) {
    let _state = this._state
    let oldFragments = _state.fragments
    if (oldFragments) {
      forEach$1(oldFragments, function(frag, key) {
        if (this._getComponentForKey(key)) {
          this._markAsDirty(_state, key)
        }
      }.bind(this));
    }
    let nextFragments = nextProps.fragments
    if (nextFragments) {
      this._deriveFragments(nextFragments)
    }
  }

  // fragments are all dynamic informations that we are displaying
  // like annotations (such as selections)
  _deriveFragments(newFragments) {
    // console.log('deriving fragments', newFragments, this.getId());
    let _state = this._state
    _state.cursorFragment = null
    // group fragments by property
    let fragments = {}
    this._forEachFragment(newFragments, function(frag, owner) {
      let key = frag.path.toString()
      frag.key = key
      // skip frags which are not rendered here
      if (!this._getComponentForKey(key)) return
      // extract the cursor fragment for special treatment (not shown when focused)
      if (frag.type === 'cursor' && owner === 'local-user') {
        _state.cursorFragment = frag
        return
      }
      let propertyFrags = fragments[key]
      if (!propertyFrags) {
        propertyFrags = []
        fragments[key] = propertyFrags
      }
      propertyFrags.push(frag)
      this._markAsDirty(_state, key)
    }.bind(this))
    _state.fragments = fragments
    // console.log('derived fragments', fragments, window.clientId);
  }

  _forEachFragment(fragments, fn) {
    forEach$1(fragments, function(frags, owner) {
      frags.forEach(function(frag) {
        fn(frag, owner)
      })
    })
  }

  // called by SurfaceManager to know which text properties need to be
  // updated because of model changes
  _checkForUpdates(change) {
    let _state = this._state
    Object.keys(change.updated).forEach(function(key) {
      if (this._getComponentForKey(key)) {
        this._markAsDirty(_state, key)
      }
    }.bind(this))
    return _state.isDirty
  }

  _update(oldProps, oldState) {
    this._updateContentEditableState(oldState)
    this._updateProperties()
  }

  _updateContentEditableState(oldState) {
    // ContentEditable management
    // Note: to be able to isolate nodes, we need to control
    // how contenteditable is used in a hieriarchy of surfaces.
    if (oldState.mode === 'co-focused') {
      this.el.off('mousedown', this._enableContentEditable, this)
    }
    if (!this.isEditable()) {
      this.el.setAttribute('contenteditable', false)
    } else if (this.state.mode !== oldState.mode) {
      switch(this.state.mode) {
        case 'co-focused':
          this.el.setAttribute('contenteditable', false)
          this.el.on('mousedown', this._enableContentEditable, this)
          break
        default:
          this.el.setAttribute('contenteditable', true)
      }
    }
  }

  _enableContentEditable() {
    this.el.setAttribute('contenteditable', true)
  }

  _updateProperties() {
    let _state = this._state
    let dirtyProperties = Object.keys(_state.dirtyProperties)
    for (let i = 0; i < dirtyProperties.length; i++) {
      this._updateProperty(dirtyProperties[i])
    }
    _state.isDirty = false
    _state.dirtyProperties = {}
  }

  _markAsDirty(_state, key) {
    _state.isDirty = true
    _state.dirtyProperties[key] = true
  }

  _updateProperty(key) {
    let _state = this._state
    // hide the cursor fragment when focused
    let cursorFragment = this._hasNativeFocus() ? null : _state.cursorFragment
    let frags = _state.fragments[key] || []
    if (cursorFragment && cursorFragment.key === key) {
      frags = frags.concat([cursorFragment])
    }
    let comp = this._getComponentForKey(key)
    if (comp) {
      comp.extendProps({
        fragments: frags
      })
    }
  }

  _onSessionUpdate(update) {
    if (update.selection) {
      let newMode = this._deriveModeFromSelection(update.selection)
      if (this.state.mode !== newMode) {
        this.extendState({
          mode: newMode
        })
      }
    }
  }

  // helper to manage surface mode which is derived from the current selection
  _deriveModeFromSelection(sel) {
    let surfaceId = sel.surfaceId
    let id = this.getId()
    let mode
    if (startsWith$1(surfaceId, id)) {
      if (surfaceId.length === id.length) {
        mode = 'focused'
      } else {
        mode = 'co-focused'
      }
    }
    return mode
  }

  // surface parent is either a Surface or IsolatedNode
  _getSurfaceParent() {
    return this.context.surfaceParent
  }

  _getComponentForKey(key) {
    return this._textProperties[key]
  }

  _focus() {
    this._state.hasNativeFocus = true
    // HACK: we must not focus explicitly in Chrome/Safari
    // as otherwise we get a crazy auto-scroll
    // Still, this is ok, as everything is working fine
    // there, without that (as opposed to FF/Edge)
    if (this.el && !platform.isWebkit) {
      this._state.skipNextFocusEvent = true
      // ATTENTION: unfortunately, focusing the contenteditable does lead to auto-scrolling
      // in some browsers
      this.el.focus();
      this._state.skipNextFocusEvent = false
    }
  }

  _handleLeftOrRightArrowKey(event) {
    event.stopPropagation()

    let direction = (event.keyCode === keys$2.LEFT) ? 'left' : 'right'
    let selState = this.getDocumentSession().getSelectionState()
    let sel = selState.getSelection()
    // Note: collapsing the selection and let ContentEditable still continue doing a cursor move
    if (selState.isInlineNodeSelection() && !event.shiftKey) {
      event.preventDefault()
      this.setSelection(sel.collapse(direction))
      return
    }

    // Note: we need this timeout so that CE updates the DOM selection first
    // before we map it to the model
    window.setTimeout(function() {
      if (!this.isMounted()) return
      let options = {
        direction: (event.keyCode === keys$2.LEFT) ? 'left' : 'right'
      }
      this._updateModelSelection(options)
    }.bind(this))
  }

  _handleUpOrDownArrowKey(event) {
    event.stopPropagation()
    // Note: we need this timeout so that CE updates the DOM selection first
    // before we map it to the model
    window.setTimeout(function() {
      if (!this.isMounted()) return
      let options = {
        direction: (event.keyCode === keys$2.UP) ? 'left' : 'right'
      }
      this._updateModelSelection(options)
    }.bind(this));
  }

  _handleHomeOrEndKey(event) {
    event.stopPropagation()
    // Note: we need this timeout so that CE updates the DOM selection first
    // before we map it to the model
    window.setTimeout(function() {
      if (!this.isMounted()) return
      let options = {
        direction: (event.keyCode === keys$2.HOME) ? 'left' : 'right'
      }
      this._updateModelSelection(options)
    }.bind(this))
  }

  _handlePageUpOrDownKey(event) {
    event.stopPropagation()
    // Note: we need this timeout so that CE updates the DOM selection first
    // before we map it to the model
    window.setTimeout(function() {
      if (!this.isMounted()) return
      let options = {
        direction: (event.keyCode === keys$2.PAGEUP) ? 'left' : 'right'
      }
      this._updateModelSelection(options)
    }.bind(this))
  }

  _handleSpaceKey(event) {
    event.preventDefault()
    event.stopPropagation()
    this.transaction(function(tx, args) {
      // trying to remove the DOM selection to reduce flickering
      this.domSelection.clear()
      args.text = " "
      return this.insertText(tx, args)
    }.bind(this), { action: 'type' })
  }

  _handleEnterKey(event) {
    event.preventDefault()
    event.stopPropagation()
    if (event.shiftKey) {
      this.transaction(function(tx, args) {
        return this.softBreak(tx, args)
      }.bind(this), { action: 'break' })
    } else {
      this.transaction(function(tx, args) {
        return this.break(tx, args)
      }.bind(this), { action: 'break' })
    }
  }

  _handleDeleteKey(event) {
    event.preventDefault()
    event.stopPropagation()
    let direction = (event.keyCode === keys$2.BACKSPACE) ? 'left' : 'right'
    this.transaction(function(tx, args) {
      args.direction = direction
      return this.delete(tx, args)
    }.bind(this), { action: 'delete' })
  }

  _hasNativeFocus() {
    return Boolean(this._state.hasNativeFocus)
  }

  _setSelection(sel) {
    // Since we allow the surface be blurred natively when clicking
    // on tools we now need to make sure that the element is focused natively
    // when we set the selection
    // This is actually only a problem on FF, other browsers set the focus implicitly
    // when a new DOM selection is set.
    // ATTENTION: in FF 44 this was causing troubles, making the CE unselectable
    // until the next native blur.
    // Should not be necessary anymore as this should be covered by this._focus()
    // which will eventually be called at the end of the update flow
    if (!sel.isNull() && sel.surfaceId === this.getId() && platform.isFF) {
      this._focus()
    }
    this.documentSession.setSelection(sel)
  }

  _updateModelSelection(options) {
    let sel = this.domSelection.getSelection(options)
    // console.log('Surface: updating model selection', sel.toString());
    // NOTE: this will also lead to a rerendering of the selection
    // via session.on('update')
    this.setSelection(sel)
  }

  _selectProperty(path) {
    let doc = this.getDocument()
    let text = doc.get(path)
    this.setSelection(doc.createSelection(path, 0, text.length))
  }

  // internal API for TextProperties to enable dispatching
  // TextProperty components are registered via path
  _registerTextProperty(textPropertyComponent) {
    let path = textPropertyComponent.getPath()
    this._textProperties[path] = textPropertyComponent
  }

  _unregisterTextProperty(textPropertyComponent) {
    let path = textPropertyComponent.getPath()
    if (this._textProperties[path] === textPropertyComponent) {
      delete this._textProperties[path]
    }
  }

  _getTextPropertyComponent(path) {
    return this._textProperties[path]
  }

  // TODO: we could integrate container node rendering into this helper
  // TODO: this helper should be available also in non surface context
  _renderNode($$, nodeId) {
    let doc = this.getDocument()
    let node = doc.get(nodeId)
    let componentRegistry = this.context.componentRegistry || this.props.componentRegistry
    let ComponentClass = componentRegistry.get(node.type)
    if (!ComponentClass) {
      console.error('Could not resolve a component for type: ' + node.type)
      ComponentClass = UnsupportedNodeComponent
    }
    return $$(ComponentClass, {
      doc: doc,
      node: node
    })
  }

  /*
    Called when starting a transaction to populate the transaction
    arguments.
    ATM used only by ContainerEditor.
  */
  _prepareArgs(args) { // eslint-disable-line
  }

  // Experimental: used by DragManager
  getSelectionFromEvent(event) {
    if (this.domSelection) {
      let domRange = Surface.getDOMRangeFromEvent(event)
      let sel = this.domSelection.getSelectionForDOMRange(domRange)
      sel.surfaceId = this.getId()
      return sel;
    }
  }

  setSelectionFromEvent(event) {
    let sel = this.getSelectionFromEvent(event)
    if (sel) {
      this._state.skipNextFocusEvent = true
      this.setSelection(sel)
    } else {
      console.error('Could not create a selection from event.');
    }
  }

  // EXPERIMENTAL: get bounding box for current selection
  getBoundingRectangleForSelection() {
    let sel = this.getSelection()
    if (this.isDisabled() ||
        !sel || sel.isNull() ||
        sel.isNodeSelection() || sel.isCustomSelection()) return {}

    // TODO: selection rectangle should be calculated
    // relative to scrolling container, which either is
    // the parent scrollPane, or the body element
    let containerEl
    if (this.context.scrollPane) {
      containerEl = this.context.scrollPane.refs.content.el.el
    } else {
      containerEl = document.body
    }

    let wsel = window.getSelection()
    let wrange
    if (wsel.rangeCount > 0) {
      wrange = wsel.getRangeAt(0)
    }

    // having a DOM selection?
    if (wrange && wrange.collapsed) {
      // unfortunately, collapsed selections do not have a boundary rectangle
      // thus we need to insert a span temporarily and take its rectangle
      // if (wrange.collapsed) {
      let span = document.createElement('span')
      // Ensure span has dimensions and position by
      // adding a zero-width space character
      this._state.skipNextObservation = true
      span.appendChild(window.document.createTextNode("\u200b"))
      wrange.insertNode(span)
      let rect = getRelativeBoundingRect(span, containerEl)
      let spanParent = span.parentNode
      this._state.skipNextObservation = true
      spanParent.removeChild(span)
      // Glue any broken text nodes back together
      spanParent.normalize()
      // HACK: in FF the DOM selection gets corrupted
      // by the span-insertion above
      if (platform.isFF) {
        this.rerenderDOMSelection()
      }
      return rect;
    } else {
      let nativeEl = this.el.el
      if (sel.isCollapsed()) {
        let cursorEl = nativeEl.querySelector('.se-cursor')
        if (cursorEl) {
          return getRelativeBoundingRect(cursorEl, containerEl)
        } else {
          // TODO: in the most cases we actually do not have a
          // cursor element.
          // console.warn('FIXME: there should be a rendered cursor element.');
          return {}
        }
      } else {
        let selFragments = nativeEl.querySelectorAll('.se-selection-fragment')
        if (selFragments.length > 0) {
          return getRelativeBoundingRect(selFragments, containerEl)
        } else {
          console.warn('FIXME: there should be a rendered selection fragments element.')
          return {}
        }
      }
    }
  }

  _sendOverlayHints() {
    // TODO: we need to rethink this.
    // The overlay is owned by the ScrollPane.
    // So the current solution is to send up hints
    // which are dispatched to the overlay instance.
    let selectionRect = this.getBoundingRectangleForSelection()
    this.send('updateOverlayHints', {
      rectangle: selectionRect
    })
  }

}

Surface.getDOMRangeFromEvent = function(evt) {
  let range, x = evt.clientX, y = evt.clientY

  // Try the simple IE way first
  if (document.body.createTextRange) {
    range = document.body.createTextRange()
    range.moveToPoint(x, y)
  }

  else if (!isUndefined$1(document.createRange)) {
    // Try Mozilla's rangeOffset and rangeParent properties,
    // which are exactly what we want
    if (!isUndefined$1(evt.rangeParent)) {
      range = document.createRange()
      range.setStart(evt.rangeParent, evt.rangeOffset)
      range.collapse(true)
    }

    // Try the standards-based way next
    else if (document.caretPositionFromPoint) {
      let pos = document.caretPositionFromPoint(x, y)
      range = document.createRange()
      range.setStart(pos.offsetNode, pos.offset)
      range.collapse(true)
    }

    // Next, the WebKit way
    else if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(x, y)
    }
  }

  return range
}

/**
  Editor for a text property (annotated string). Needs to be
  instantiated inside a {@link ui/Controller} context.

  @class
  @component
  @extends ui/Surface

  @prop {String} name unique editor name
  @prop {String[]} path path to a text property
  @prop {ui/SurfaceCommand[]} commands array of command classes to be available

  @example

  Create a `TextPropertyEditor` for the `name` property of an author object. Allow emphasis annotations.

  ```js
  $$(TextPropertyEditor, {
    name: 'authorNameEditor',
    path: ['author_1', 'name'],
    commands: [EmphasisCommand]
  })
  ```
*/

class TextPropertyEditor extends Surface {
  constructor(parent, props) {
    // making props.name optional
    props.name = props.name || props.path.join('.')
    super(parent, props)

    if (!props.path) {
      throw new Error("Property 'path' is mandatory.")
    }
  }

  render($$) {
    let el = super.render.apply(this, arguments)
    el.addClass("sc-text-property-editor")

    if (!this.props.disabled) {
      el.addClass('sm-enabled')
      el.setAttribute('contenteditable', true)
    }

    el.append(
      $$(TextPropertyComponent, {
        tagName: this.props.tagName || "div",
        path: this.props.path,
        withoutBreak: this.props.withoutBreak
      })
    )

    return el
  }

  /**
    Selects all text
  */
  selectAll() {
    let doc = this.getDocument()
    let path = this.props.path
    let text = doc.get(path)
    let sel = doc.createSelection({
      type: 'property',
      path: path,
      startOffset: 0,
      endOffset: text.length
    })
    this.setSelection(sel)
  }

}

class TextCellContent extends Component {

  render($$) {
    let el = $$('div').addClass('sc-text-cell')

    let path
    if (this.props.node) {
      path = this.props.node.getTextPath()
    } else {
      path = this.props.path
    }

    el.append($$(TextPropertyEditor, {
      path: path,
      disabled: this.props.disabled
    }).ref('editor'))

    return el
  }

}

class TableComponent extends Component {
  constructor(...args) {
    super(...args)

    if (this.context.surfaceParent) {
      this.surfaceId = this.context.surfaceParent.getId()
    } else {
      this.surfaceId = this.props.node.id
    }

    this._selectedCells = {}
  }

  didMount() {
    let documentSession = this.getDocumentSession()
    documentSession.on('didUpdate', this.onSessionDidUpdate, this)

    let globalEventHandler = this.context.globalEventHandler
    if (globalEventHandler) {
      globalEventHandler.on('keydown', this.onKeydown, this, { id: this.surfaceId })
    }
  }

  dispose() {
    let documentSession = this.getDocumentSession()
    documentSession.off(this)

    let globalEventHandler = this.context.globalEventHandler
    if (globalEventHandler) {
      globalEventHandler.off(this)
    }
  }

  render($$) {
    let node = this.props.node

    let el = $$('div').addClass('sc-table')

    let tableEl = $$('table')
    let cellEntries = node.cells

    let nrows = node.getRowCount()
    let ncols = node.getColCount()
    let i,j

    let thead = $$('thead').addClass('se-head')
    let colControls = $$('tr').addClass('se-column-controls')
    colControls.append($$('td').addClass('se-corner-tl'))
    colControls.append($$('td').addClass('se-hspace'))
    for (j = 0; j < ncols; j++) {
      colControls.append(
        $$('td').addClass('se-column-handle').attr('data-col', j).ref('col-handle'+j)
          .on('mousedown', this._onColumnHandle)
          .append(tableHelpers.getColumnName(j))
      )
    }
    colControls.append($$('td').addClass('se-hspace'))
    thead.append(colControls)
    thead.append($$('tr').addClass('se-vspace'))

    let tbody = $$('tbody').addClass('se-body').ref('body')
    for (i = 0; i < nrows; i++) {
      let row = cellEntries[i]
      let rowEl = $$('tr').addClass('se-row').attr('data-row', i)

      rowEl.append(
        $$('td').addClass('se-row-handle').attr('data-row', i).ref('row-handle'+i)
          .on('mousedown', this._onRowHandle)
          .append(tableHelpers.getRowName(i))
      );
      rowEl.append($$('td').addClass('se-hspace'))

      console.assert(row.length === ncols, 'row should be complete.')
      for (j = 0; j < ncols; j++) {
        let cellId = row[j]
        let cellEl = this.renderCell($$, cellId)
        cellEl.attr('data-col', j)
          .on('mousedown', this._onCell)
        rowEl.append(cellEl)
      }
      rowEl.append($$('td').addClass('se-hspace'))

      tbody.append(rowEl)
    }

    var tfoot = $$('tfoot').addClass('se-foot')
    tfoot.append($$('tr').addClass('se-vspace'))
    colControls = $$('tr').addClass('se-column-controls')
    colControls.append($$('td').addClass('se-corner-bl'))
    colControls.append($$('td').addClass('se-hspace'))
    for (j = 0; j < ncols; j++) {
      colControls.append($$('td').addClass('se-hspace'))
    }
    colControls.append($$('td').addClass('se-hspace'))
    tfoot.append(colControls)

    tableEl.append(thead)
    tableEl.append(tbody)
    tableEl.append(tfoot)

    el.append(tableEl)

    // selection as an overlay
    el.append(
      $$('div').addClass('se-selection').ref('selection')
        .on('mousedown', this._whenClickingOnSelection)
    )

    return el
  }

  renderCell($$, cellId) {
    let cellEl = $$('td').addClass('se-cell')
    let doc = this.props.node.getDocument()
    let cellContent = doc.get(cellId)
    if (cellContent) {
      // TODO: we need to derive disabled state
      // 1. if table is disabled all cells are disabled
      // 2. if sel is TableSelection then cell is disabled if not in table selection range
      // 3. else cell is disabled if not focused/co-focused
      cellEl.append(
        $$(TextCellContent, {
          disabled: !this._selectedCells[cellId],
          node: cellContent,
        }).ref(cellId)
      )
    }

    return cellEl
  }

  getId() {
    return this.surfaceId
  }

  getDocumentSession() {
    return this.context.documentSession
  }

  getSelection() {
    let documentSession = this.getDocumentSession()
    let sel = documentSession.getSelection()
    if (sel && sel.isCustomSelection() && sel.getCustomType() === 'table' && sel.surfaceId === this.getId()) {
      return sel
    } else {
      return null
    }
  }

  _setSelection(startRow, startCol, endRow, endCol) {
    let documentSession = this.getDocumentSession()
    documentSession.setSelection(new CustomSelection('table', {
      startRow: startRow, startCol: startCol,
      endRow: endRow, endCol: endCol
    }, this.getId()))
  }

  onSessionDidUpdate(update) {
    if (update.selection) {
      let sel = this.getSelection()
      this._selectedCells = {}
      if (sel) {
        let rect = this._getRectangle(sel)
        for(let i=rect.minRow; i<=rect.maxRow; i++) {
          for(let j=rect.minCol; j<=rect.maxCol; j++) {
            let cellId = this.props.node.cells[i][j]
            this._selectedCells[cellId] = true
          }
        }
        this._renderSelection(sel)
      }
    }
  }

  onKeydown(e) {
    let handled = false;
    switch (e.keyCode) {
      case keys$2.LEFT:
        this._changeSelection(0, -1, e.shiftKey)
        handled = true
        break
      case keys$2.RIGHT:
        this._changeSelection(0, 1, e.shiftKey)
        handled = true
        break
      case keys$2.DOWN:
        this._changeSelection(1, 0, e.shiftKey)
        handled = true
        break
      case keys$2.UP:
        this._changeSelection(-1, 0, e.shiftKey)
        handled = true
        break
      default:
        // nothing
    }
    if (handled) {
      e.preventDefault()
    }
  }

  _onColumnHandle(e) {
    e.stopPropagation()
    e.preventDefault()
    let el = DefaultDOMElement.wrapNativeElement(e.currentTarget)
    let col = parseInt(el.attr('data-col'), 10)
    let rowCount = this.props.node.getRowCount()
    this._setSelection(0, col, rowCount-1, col)
  }

  _onRowHandle(e) {
    e.stopPropagation()
    e.preventDefault()
    let el = DefaultDOMElement.wrapNativeElement(e.currentTarget)
    let row = parseInt(el.attr('data-row'), 10)
    let colCount = this.props.node.getColCount()
    this._setSelection(row, 0, row, colCount-1)
  }

  _onCell(e) {
    e.stopPropagation()
    e.preventDefault()

    let el = DefaultDOMElement.wrapNativeElement(e.currentTarget)
    let col = parseInt(el.attr('data-col'), 10)
    let row = parseInt(el.parentNode.attr('data-row'), 10)

    this._setSelection(row, col, row, col)
  }

  _changeSelection(rowInc, colInc, expand) {
    let sel = this.getSelection()
    if (sel) {
      let maxRow = this.props.node.getRowCount()-1
      let maxCol = this.props.node.getColCount()-1
      if (expand) {
        let endRow = Math.max(0, Math.min(sel.data.endRow + rowInc, maxRow))
        let endCol = Math.max(0, Math.min(sel.data.endCol + colInc, maxCol))
        this._setSelection(sel.data.startRow, sel.data.startCol, endRow, endCol)
      } else {
        let row = Math.max(0, Math.min(sel.data.endRow + rowInc, maxRow))
        let col = Math.max(0, Math.min(sel.data.endCol + colInc, maxCol))
        this._setSelection(row, col, row, col)
      }
    }
  }

  _getRectangle(sel) {
    return {
      minRow: Math.min(sel.data.startRow, sel.data.endRow),
      maxRow: Math.max(sel.data.startRow, sel.data.endRow),
      minCol: Math.min(sel.data.startCol, sel.data.endCol),
      maxCol: Math.max(sel.data.startCol, sel.data.endCol)
    }
  }

  _renderSelection() {
    let sel = this.getSelection()
    if (!sel) return

    let rect = this._getRectangle(sel)

    let startCell = this._getCell(rect.minRow, rect.minCol)
    let endCell = this._getCell(rect.maxRow, rect.maxCol)

    let startEl = startCell.getNativeElement()
    let endEl = endCell.getNativeElement()
    let tableEl = this.el.el
    // Get the  bounding rect for startEl, endEl relative to tableEl
    let selRect = getRelativeBoundingRect([startEl, endEl], tableEl)
    this.refs.selection.css(selRect).addClass('sm-visible')
    this._enableCells()
  }

  _enableCells() {
    let node = this.props.node
    for(let i=0; i<node.cells.length; i++) {
      let row = node.cells[i]
      for(let j=0; j<row.length; j++) {
        let cellId = row[j]
        let cell = this._getCell(i, j).getChildAt(0)
        if (this._selectedCells[cellId]) {
          cell.extendProps({ disabled: false })
        } else {
          cell.extendProps({ disabled: true })
        }
      }
    }
  }

  _getCell(row, col) {
    let rowEl = this.refs.body.getChildAt(row)
    // +2 because we have a row handle plus a spacer cell
    let cellEl = rowEl.getChildAt(col + 2)
    return cellEl
  }

  _whenClickingOnSelection(e) { //eslint-disable-line
    // HACK: invalidating the selection so that we can click the selection overlay away
    this.context.documentSession.setSelection(new CustomSelection('null', {}, this.getId()))
    this.refs.selection.css({
      height: '0px', width: '0px'
    }).removeClass('sm-visible')
  }
}

class InsertNodeCommand extends Command {

  getCommandState(props, context) {
    let sel = context.documentSession.getSelection();
    let newState = {
      disabled: true,
      active: false
    }
    if (sel && !sel.isNull() && sel.isPropertySelection()) {
      newState.disabled = false
    }
    return newState
  }

  execute(props, context) {
    var state = this.getCommandState(props, context)
    if (state.disabled) return
    var surface = context.surface ||context.surfaceManager.getFocusedSurface()
    if (surface) {
      surface.transaction(function(tx, args) {
        return this.insertNode(tx, args)
      }.bind(this))
    }
    return true
  }

  insertNode(tx, args) {
    args.node = this.createNodeData(tx, args)
    return insertNode(tx, args)
  }

  createNodeData(tx, args) { // eslint-disable-line
    throw new Error('InsertNodeCommand.createNodeData() is abstract.')
  }
}

class InsertTableCommand extends InsertNodeCommand {
  constructor() {
    super({ name: 'insert-table' })
  }

  createNodeData(tx, args) { // eslint-disable-line
    // TODO: make this configurable, e.g. via args
    let nrows = 5
    let ncols = 6
    let cells = []

    for (let i = 0; i < nrows; i++) {
      let cols = []
      for (let j = 0; j < ncols; j++) {
        let node = tx.create({id: uuid$1(), type: 'paragraph', content: ''})
        cols.push({content: node.id})
      }


      cells.push(cols)
    }

    return {
      type: 'table',
      cells: cells
    }
  }

}

var TablePackage = {
  name: 'table',
  configure: function(config) {
    config.addNode(TableNode)
    config.addComponent('table', TableComponent)
    config.addCommand('insert-table', InsertTableCommand)
    config.addTool('insert-table', Tool)
    config.addIcon('insert-table', { 'fontawesome': 'fa-table' })
    config.addLabel('table', {
      en: 'Table',
      de: 'Tabelle'
    })
  },
  Table: TableNode,
  TableComponent: TableComponent,
  InsertTableCommand: InsertTableCommand
}

class Codeblock extends TextBlock {}

Codeblock.type = "codeblock"

class CodeblockComponent extends TextBlockComponent {
  render($$) {
    let el = super.render.call(this, $$)
    return el.addClass('sc-codeblock')
  }
}

/*
 * HTML converter for Codeblock.
 */
var CodeblockHTMLConverter = {

  type: 'codeblock',
  tagName: 'pre',

  import: function(el, node, converter) {
    let codeEl = el.find('code')
    if (codeEl) {
      node.content = converter.annotatedText(codeEl, [node.id, 'content'], { preserveWhitespace: true })
    }
  },

  export: function(node, el, converter) {
    let $$ = converter.$$;
    el.append(
      $$('code').append(
        converter.annotatedText([node.id, 'content'])
      )
    )
  }

}

var CodeblockPackage = {
  name: 'codeblock',
  configure: function(config) {
    config.addNode(Codeblock);
    config.addComponent('codeblock', CodeblockComponent)
    config.addConverter('html', CodeblockHTMLConverter)
    config.addConverter('xml', CodeblockHTMLConverter)
    config.addTextType({
      name: 'codeblock',
      data: {type: 'codeblock'}
    })
    config.addLabel('codeblock', {
      en: 'Codeblock',
      de: 'Codeblock'
    })
  },
  Codeblock: Codeblock,
  CodeblockComponent: CodeblockComponent,
  CodeblockHTMLConverter: CodeblockHTMLConverter
}

class Link extends PropertyAnnotation {}

Link.define({
  type: "link",
  title: { type: 'string', optional: true },
  url: { type: 'string', 'default': 'http://'}
})

// in presence of overlapping annotations will try to render this as one element
Link.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

class LinkComponent extends AnnotationComponent {

  didMount(...args) {
    super.didMount(...args)

    let node = this.props.node
    node.on('properties:changed', this.rerender, this)
  }

  dispose(...args) {
    super.dispose(...args)

    let node = this.props.node
    node.off(this)
  }

  render($$) { // eslint-disable-line
    let el = super.render($$)

    el.tagName = 'a'
    el.attr('href', this.props.node.url)

    let titleComps = [this.props.node.url]
    if (this.props.node.title) {
      titleComps.push(this.props.node.title)
    }

    return el.attr("title", titleComps.join(' | '))
  }

}

class LinkCommand extends AnnotationCommand {

  getAnnotationData() {
    return {
      url: ""
    }
  }

  canFuse() {
    return false
  }

  canDelete(annos, sel) { // eslint-disable-line
    return false
  }

}

class EditLinkCommand extends AnnotationCommand {

  getAnnotationData() {
    return {
      url: ""
    }
  }

  canCreate() {
    return false
  }

  canTruncate() {
    return false
  }

  canDelete(annos, sel) { // eslint-disable-line
    return false
  }

  canFuse() {
    return false
  }

  canExpand() {
    return false
  }

  // When there's some overlap with only a single annotation we do an expand
  canEdit(annos, sel) { // eslint-disable-line
    return annos.length === 1
  }

}

/*
 * HTML converter for Paragraphs.
 */
var LinkXMLConverter = {

  type: "link",
  tagName: 'a',

  import: function(el, node) {
    node.url = el.attr('href')
    node.title = el.attr('title')
  },

  export: function(link, el) {
    el.attr({
      href: link.url,
      title: link.title
    })
  }

}

/**
  Tool to edit an existing link.

  Designed so that it can be used either in a toolbar, or within
  an overlay on the Surface.
*/
class EditLinkTool extends Tool {

  getUrlPath() {
    let propPath = this.constructor.urlPropertyPath
    return [this.props.node.id].concat(propPath)
  }

  _openLink() {
    let doc = this.context.documentSession.getDocument()
    window.open(doc.get(this.getUrlPath()), '_blank')
  }

  render($$) {
    let Input = this.getComponent('input')
    let Button = this.getComponent('button')
    let el = $$('div').addClass('sc-edit-link-tool')
    let urlPath = this.getUrlPath()

    el.append(
      $$(Input, {
        type: 'url',
        path: urlPath,
        placeholder: 'Paste or type a link url'
      }),
      $$(Button, {
        icon: 'open-link',
        style: this.props.style
      }).attr('title', this.getLabel('open-link'))
        .on('click', this._openLink),

      $$(Button, {
        icon: 'delete',
        style: this.props.style
      }).attr('title', this.getLabel('delete-link'))
        .on('click', this.onDelete)
    )
    return el
  }

  onDelete(e) {
    e.preventDefault();
    let node = this.props.node
    let sm = this.context.surfaceManager
    let surface = sm.getFocusedSurface()
    surface.transaction(function(tx, args) {
      tx.delete(node.id)
      return args
    })
  }
}

EditLinkTool.urlPropertyPath = ['url']

var LinkPackage = {
  name: 'link',
  configure: function(config, options) {
    config.addNode(Link)
    config.addComponent('link', LinkComponent)
    config.addConverter('html', LinkXMLConverter)
    config.addConverter('xml', LinkXMLConverter)
    config.addCommand('link', LinkCommand, {nodeType: 'link'})
    config.addCommand('edit-link', EditLinkCommand, {nodeType: 'link'})
    config.addTool('link', AnnotationTool, {target: options.toolTarget || 'annotations'})
    config.addTool('edit-link', EditLinkTool, { target: 'overlay' })
    config.addIcon('link', { 'fontawesome': 'fa-link'})
    config.addIcon('open-link', { 'fontawesome': 'fa-external-link' })
    config.addLabel('link', {
      en: 'Link',
      de: 'Link'
    })
    config.addLabel('open-link', {
      en: 'Open Link',
      de: 'Link öffnen'
    })
    config.addLabel('delete-link', {
      en: 'Remove Link',
      de: 'Link löschen'
    })
  },
  Link: Link,
  LinkComponent: LinkComponent,
  LinkCommand: LinkCommand,
  EditLinkTool: EditLinkTool,
}

class ProseArticle extends Document {
  constructor(schema) {
    super(schema)
    this._initialize()
  }

  _initialize() {
    this.create({
      type: 'container',
      id: 'body',
      nodes: []
    })
  }

}

/*
  Listens to changes on the document and selection and updates registered tools accordingly.

  @class
*/
class CommandManager {
  constructor(context, commands) {
    if (!context.documentSession) {
      throw new Error('DocumentSession required.')
    }
    this.documentSession = context.documentSession
    this.context = extend$1({}, context, {
      // for convenienve we provide access to the doc directly
      doc: this.documentSession.getDocument()
    })

    // Set up command registry
    this.commandRegistry = new Registry()
    forEach$1(commands, function(command) {
      if(!command._isCommand) {
        throw new Error("Expecting instances of ui/Command.")
      }
      this.commandRegistry.add(command.name, command)
    }.bind(this))

    this.documentSession.on('update', this.updateCommandStates, this)

    this.updateCommandStates()
  }

  dispose() {
    this.documentSession.off(this)
  }

  getCommandContext() {
    return this.context
  }

  /*
    Compute new command states object
  */
  updateCommandStates() {
    let commandStates = {}
    let commandContext = this.getCommandContext()
    let props = this._getCommandProps()
    this.commandRegistry.forEach(function(cmd) {
      commandStates[cmd.getName()] = cmd.getCommandState(props, commandContext)
    })
    // poor-man's immutable style
    if (!isEqual$1(this.commandStates, commandStates)) {
      this.commandStates = commandStates
    }
  }

  /*
    Exposes the current commandStates object
  */
  getCommandStates() {
    return this.commandStates
  }

  /*
    Execute a command, given a context and arguments
  */
  executeCommand(commandName, props) {
    let cmd = this.commandRegistry.get(commandName)
    if (!cmd) {
      console.warn('command', commandName, 'not registered')
      return
    }
    let commandState = this.commandStates[commandName]
    props = extend$1(this._getCommandProps(), commandState, props)
    let info = cmd.execute(props, this.getCommandContext())
    // TODO: why do we required commands to return a result?
    if (info === undefined) {
      console.warn('command ', commandName, 'must return either an info object or true when handled or false when not handled')
    }
    return info
  }

  // TODO: while we need it here this should go into the flow thingie later
  _getCommandProps() {
    let documentSession = this.context.documentSession
    let selectionState = documentSession.getSelectionState()
    let sel = selectionState.getSelection()
    let surface = this.context.surfaceManager.getFocusedSurface()
    return {
      documentSession: documentSession,
      selectionState: selectionState,
      surface: surface,
      selection: sel
    }
  }

}

oo.initClass(CommandManager)

class SurfaceManager {
  constructor(documentSession) {
    this.documentSession = documentSession

    this.surfaces = {}

    this._state = {
      focusedSurfaceId: null,
      // grouped by surfaceId and the by fragment type ('selection' | collaboratorId)
      fragments: {},
      selection: null,
      collaborators: {}
    }

    this.documentSession.on('update', this.onSessionUpdate, this)
    // HACK: trying to make rerendering the DOM selection the very last
    // TODO: we want to introduce a FlowManager, which will hopefully
    // make this prio hack obsolete
    this.documentSession.on('didUpdate', this.onSessionDidUpdate, this, {
      priority: -1000000
    })
  }

  dispose() {
    this.documentSession.off(this)
  }

  /**
   * Get Surface instance
   *
   * @param {String} name Name under which the surface is registered
   * @return {ui/Surface} The surface instance
   */
  getSurface(name) {
    if (name) {
      return this.surfaces[name]
    }
  }

  /**
   * Get the currently focused Surface.
   *
   * @return {ui/Surface} Surface instance
   */
  getFocusedSurface() {
    if (this._state.focusedSurfaceId) {
      return this.getSurface(this._state.focusedSurfaceId)
    }
  }

  /**
   * Register a surface
   *
   * @param surface {ui/Surface} A new surface instance to register
   */
  registerSurface(surface) {
    this.surfaces[surface.getId()] = surface
  }

  /**
   * Unregister a surface
   *
   * @param surface {ui/Surface} A surface instance to unregister
   */
  unregisterSurface(surface) {
    surface.off(this)
    let surfaceId = surface.getId()
    let registeredSurface = this.surfaces[surfaceId]
    if (registeredSurface === surface) {
      let focusedSurface = this.getFocusedSurface()
      delete this.surfaces[surfaceId]
      if (surface && focusedSurface === surface) {
        this._state.focusedSurfaceId = null
      }
    }
  }

  // keeps track of selection fragments and collaborator fragments
  onSessionUpdate(update) {
    let _state = this._state

    let updatedSurfaces = {}
    if (update.selection) {
      let focusedSurface = this.surfaces[update.selection.surfaceId]
      _state.focusedSurfaceId = update.selection.surfaceId
      if (focusedSurface && !focusedSurface.isDisabled()) {
        focusedSurface._focus()
      } else if (update.selection.isCustomSelection() && inBrowser) {
        // HACK: removing DOM selection *and* blurring when having a CustomSelection
        // otherwise we will receive events on the wrong surface
        // instead of bubbling up to GlobalEventManager
        window.getSelection().removeAllRanges()
        window.document.activeElement.blur()
      }
    }

    if (update.change) {
      forEach$1(this.surfaces, function(surface, surfaceId) {
        if (surface._checkForUpdates(update.change)) {
          updatedSurfaces[surfaceId] = true
        }
      })
    }

    let fragments = _state.fragments || {}

    // get fragments for surface with id or create a new hash
    function _fragmentsForSurface(surfaceId) {
      // surfaceFrags is a hash, where fragments are stored grouped by owner
      let surfaceFrags = fragments[surfaceId]
      if (!surfaceFrags) {
        surfaceFrags = {}
        fragments[surfaceId] = surfaceFrags
      }
      return surfaceFrags
    }

    // gets selection fragments with collaborator attached to each fragment
    // as used by TextPropertyComponent
    function _getFragmentsForSelection(sel, collaborator) {
      let frags = sel.getFragments()
      if (collaborator) {
        frags = frags.map(function(frag) {
          frag.collaborator = collaborator
          return frag
        });
      }
      return frags
    }

    function _updateSelectionFragments(oldSel, newSel, collaborator) {
      // console.log('SurfaceManager: updating selection fragments', oldSel, newSel, collaborator);
      let oldSurfaceId = oldSel ? oldSel.surfaceId : null
      let newSurfaceId = newSel ? newSel.surfaceId : null
      let owner = 'local-user'
      if (collaborator) {
        owner = collaborator.collaboratorId
      }
      // clear old fragments
      if (oldSurfaceId && oldSurfaceId !== newSurfaceId) {
        _fragmentsForSurface(oldSurfaceId)[owner] = []
        updatedSurfaces[oldSurfaceId] = true
      }
      if (newSurfaceId) {
        _fragmentsForSurface(newSurfaceId)[owner] = _getFragmentsForSelection(newSel, collaborator)
        updatedSurfaces[newSurfaceId] = true
      }
    }

    if (update.selection) {
      _updateSelectionFragments(_state.selection, update.selection)
      _state.selection = update.selection
    }

    if (update.collaborators) {
      forEach$1(update.collaborators, function(collaborator, collaboratorId) {
        let oldCollaborator = _state.collaborators[collaboratorId]
        let oldSel, newSel
        if (oldCollaborator) {
          oldSel = oldCollaborator.selection
        }
        if (collaborator) {
          newSel = collaborator.selection
        }
        if (!oldSel || !oldSel.equals(newSel)) {
          _updateSelectionFragments(oldSel, newSel, collaborator)
        }
        _state.collaborators[collaboratorId] = {
          collaboratorId: collaboratorId,
          selection: newSel
        }
      })
    }

    updatedSurfaces = Object.keys(updatedSurfaces)
    // console.log('SurfaceManager: updating surfaces', updatedSurfaces);

    updatedSurfaces.forEach(function(surfaceId) {
      var surface = this.surfaces[surfaceId]
      if (surface) {
        var newFragments = fragments[surfaceId]
        // console.log('SurfaceManager: providing surface %s with new fragments', surfaceId, newFragments);
        surface.extendProps({
          fragments: clone$1(newFragments)
        })
      }
    }.bind(this))
  }

  onSessionDidUpdate(update, info) {
    if (info.skipSelection) {
      // console.log('Skipping selection update.');
      return
    }
    // at the end of the update flow, make sure the surface is focused
    // and displays the right DOM selection.
    let focusedSurface = this.getFocusedSurface()
    if (focusedSurface && !focusedSurface.isDisabled()) {
      // console.log('Rendering selection on surface', focusedSurface.getId(), this.documentSession.getSelection().toString());
      focusedSurface.focus()
      focusedSurface.rerenderDOMSelection()
      focusedSurface._sendOverlayHints()
    }
  }

}

oo.initClass(SurfaceManager)

class MacroManager {
  constructor(context, macros) {
    this.context = context
    this.macros = macros
    this.context.documentSession.on('update', this.onUpdate, this)
  }

  onUpdate(update, info) {
    if (update.change) {
      this.executeMacros(update, info)
    }
  }

  executeMacros(update, info) {
    let change = update.change
    if (!change) {
      return
    }
    let doc = this.context.documentSession.getDocument()
    let nodeId, node, text
    let path
    if (info.action === 'type') {
      // HACK: we know that there is only one op when we type something
      let op = change.ops[0]
      path = op.path
      nodeId = path[0]
      node = doc.get(nodeId)
      text = doc.get(path)
    } else {
      return
    }

    let props = {
      action: info.action,
      node: node,
      path: path,
      text: text,
      selection: this.context.documentSession.getSelection()
    }
    for (let i = 0; i < this.macros.length; i++) {
      let macro = this.macros[i]
      let executed = macro.execute(props, this.context)

      if (executed) {
        break
      }
    }
  }
}

oo.initClass(MacroManager)

/*
  Experimental

  We are seeking for a solution providing access to global DOM events
  while considering the current app state ~ document session state.

  This implementation is just a prototype and might change with the next releases.
*/

/*
  TODO: to be 100% safe we would need to introduce a hidden contenteditable
  where we put the selection in case of non-surface situations
  so that we are still able to receive events such as 'copy' -- actually only Edge is not dispatching
  to window.document.
*/

const events = [ 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseup' , 'copy']

class GlobalEventHandler {
  constructor(documentSession, surfaceManager) {
    this.documentSession = documentSession
    this.surfaceManager = surfaceManager
    this.listeners = []
    this.initialize()
  }

  initialize() {
    if (inBrowser) {
      let document = DefaultDOMElement.wrapNativeElement(window.document)
      events.forEach(function(name) {
        document.on(name, this._dispatch.bind(this, name), this)
      }.bind(this))
    }
  }

  dispose() {
    if (inBrowser) {
      let document = DefaultDOMElement.wrapNativeElement(window.document)
      document.off(this)
    }
  }

  addEventListener(eventName, handler, options) {
    if (!options.id) {
      throw new Error("GlobalEventHandler can only be used with option 'id'")
    }
    let listener = new DOMElement.EventListener(eventName, handler, options)
    this.listeners.push(listener)
  }

  removeEventListener(listener) {
    let idx = this.listeners.indexOf(listener);
    if (idx > -1) {
      this.listeners.splice(idx, 1)
    }
  }

  getEventListeners() {
    return this.listeners
  }

  _getActiveListener(eventName) {
    let documentSession = this.documentSession
    let sel = documentSession.getSelection()
    if (sel) {
      let surfaceId = sel.surfaceId
      for (let i = 0; i < this.listeners.length; i++) {
        let listener = this.listeners[i]
        if (listener.eventName === eventName && listener.options.id === surfaceId) {
          return listener
        }
      }
    }
  }

  _dispatch(eventName, e) {
    let listener = this._getActiveListener(eventName)
    if (listener) {
      listener.handler(e)
    }
  }
}

GlobalEventHandler.prototype.on = DOMElement.prototype.on
GlobalEventHandler.prototype.off = DOMElement.prototype.off

oo.initClass(GlobalEventHandler)

class DragManager {
  constructor(dndHandlers, context) {
    this.context = context
    this.dndHandlers = dndHandlers

    this._source = null
  }

  dispose() {
    let documentEl = DefaultDOMElement.wrapNativeElement(window.document)
    documentEl.off(this)
  }

  onDragStart(event, component) { // eslint-disable-line
    // dito: trigger listeners to expose drop targets
    // console.log('DragManager.onDragStart');
    event.dataTransfer.effectAllowed = 'all'
    event.dataTransfer.setData('text/html', event.target.outerHTML)
    event.stopPropagation()

    this._source = {
      component: component
    }

    for (let i = 0; i < this.dndHandlers.length; i++) {
      let handler = this.dndHandlers[i]
      handler.dragStart(this._source, this.context)
    }
  }

  onDragEnter(event, component) { // eslint-disable-line
    // we could emit an event, so that listeners could expose drop targets
    // console.log('DragManager.onDragEnter', event);
    event.stopPropagation()
  }

  onDragOver(event, component) { // eslint-disable-line
    // prevent default to allow drop
    event.preventDefault()
    event.stopPropagation()
  }

  onDrop(event, component) {
    event.preventDefault()
    event.stopPropagation()
    // console.log('DragManager.onDragEnter', event);
    let params = {
      source: this._source,
      target: _getTargetInfo(event, component),
      data: _getData(event)
    }
    let i, handler;
    for (i = 0; i < this.dndHandlers.length; i++) {
      handler = this.dndHandlers[i]
      let _break = handler.drop(params, this.context)
      if (_break) break
    }
    for (i = 0; i < this.dndHandlers.length; i++) {
      handler = this.dndHandlers[i]
      handler.dragEnd(params, this.context)
    }
  }

  _getData(event) {
    let dataTransfer = event.dataTransfer
    if (dataTransfer) {
      return {
        types: dataTransfer.types,
        items: Array.prototype.slice.call(dataTransfer.items),
        files: Array.prototype.slice.call(dataTransfer.files)
      }
    }
  }

}

function _getData(event) {
  let dataTransfer = event.dataTransfer
  if (dataTransfer) {
    return {
      types: dataTransfer.types,
      items: Array.prototype.slice.call(dataTransfer.items),
      files: Array.prototype.slice.call(dataTransfer.files)
    }
  }
}

function _getTargetInfo(event) {
  let target = {
    element: DefaultDOMElement.wrapNativeElement(event.target)
  }
  // try to get information about the component
  let comp = Component.getComponentFromNativeElement(event.target)
  comp = _getComponent(comp)
  if (comp) {
    target.comp = comp
    if (target._isSurface) {
      target.surface = comp
    } else if (comp.context.surface) {
      target.surface = comp.context.surface
    }
    if (target.surface) {
      let sel = target.surface.getSelectionFromEvent(event)
      if (sel) target.selection = sel
    }
    let node = comp.props.node
    if (node) target.node = node
    if (comp._isTextPropertyComponent) {
      target.path = comp.props.path
    }
  }
  return target
}

function _getComponent(comp) {
  if (comp._isTextNodeComponent || comp._isElementComponent) {
    return _getComponent(comp.getParent())
  }
  return comp;
}

oo.initClass(DragManager)

class AbstractEditor extends Component {

  constructor(...args) {
    super(...args)
    this._initialize(this.props)
  }

  didMount() {
    this.documentSession.on('didUpdate', this.documentSessionUpdated, this)
  }

  willReceiveProps(nextProps) {
    let newSession = nextProps.documentSession
    let shouldDispose = newSession && newSession !== this.documentSession
    if (shouldDispose) {
      this._dispose()
      this._initialize(nextProps)
    }
  }

  dispose() {
    this._dispose()
  }

  _dispose() {
    this.surfaceManager.dispose()
    this.commandManager.dispose()
    this.globalEventHandler.dispose()
    this.dragManager.dispose()
    this.documentSession.off(this)
    // Note: we need to clear everything, as the childContext
    // changes which is immutable
    this.empty()
  }

  getChildContext() {
    return {
      controller: this,
      iconProvider: this.iconProvider,
      documentSession: this.documentSession,
      doc: this.doc, // TODO: remove in favor of documentSession
      componentRegistry: this.componentRegistry,
      surfaceManager: this.surfaceManager,
      commandManager: this.commandManager,
      tools: this.tools,
      labelProvider: this.labelProvider,
      converterRegistry: this.converterRegistry,
      globalEventHandler: this.globalEventHandler,
      editingBehavior: this.editingBehavior,
      dragManager: this.dragManager,
    }
  }

  _initialize(props) {
    let configurator = props.configurator
    let commands = configurator.getCommands()
    if (!props.documentSession) {
      throw new Error('DocumentSession instance required');
    }
    this.documentSession = props.documentSession
    this.doc = this.documentSession.getDocument()
    this.saveHandler = configurator.getSaveHandler()
    this.documentSession.setSaveHandler(this.saveHandler)
    this.componentRegistry = configurator.getComponentRegistry()
    this.tools = configurator.getTools()
    this.surfaceManager = new SurfaceManager(this.documentSession)
    this.fileClient = configurator.getFileClient()
    this.commandManager = new CommandManager(this.getCommandContext(), commands)
    this.dragManager = new DragManager(configurator.createDragHandlers(), {
      documentSession: this.documentSession,
      surfaceManager: this.surfaceManager,
      commandManager: this.commandManager,
    });
    this.macroManager = new MacroManager(this.getMacroContext(), configurator.getMacros())
    this.iconProvider = configurator.getIconProvider()
    this.converterRegistry = configurator.getConverterRegistry()
    this.globalEventHandler = new GlobalEventHandler(this.documentSession, this.surfaceManager)
    this.editingBehavior = configurator.getEditingBehavior()
    this.labelProvider = configurator.getLabelProvider()
  }

  getCommandContext() {
    return {
      documentSession: this.documentSession,
      surfaceManager: this.surfaceManager,
      fileClient: this.fileClient,
      saveHandler: this.saveHandler,
      converterRegistry: this.converterRegistry
    }
  }

  getMacroContext() {
    return {
      documentSession: this.documentSession,
      surfaceManager: this.surfaceManager
    }
  }

  documentSessionUpdated() {
    throw new Error('This method is abstract')
  }
}

function EditingBehavior() {
  this._merge = {};
  this._mergeComponents = {};
  this._break = {};
}

EditingBehavior.Prototype = function() {

  this.defineMerge = function(firstType, secondType, impl) {
    if (!this._merge[firstType]) {
      this._merge[firstType] = {};
    }
    this._merge[firstType][secondType] = impl;
    return this;
  };

  this.canMerge = function(firstType, secondType) {
    return (this._merge[firstType] && this._merge[firstType][secondType]);
  };

  this.getMerger = function(firstType, secondType) {
    return this._merge[firstType][secondType];
  };

  this.defineComponentMerge = function(nodeType, impl) {
    this._mergeComponents[nodeType] = impl;
  };

  this.canMergeComponents = function(nodeType) {
    return this._mergeComponents[nodeType];
  };

  this.getComponentMerger = function(nodeType) {
    return this._mergeComponents[nodeType];
  };

  this.defineBreak = function(nodeType, impl) {
    this._break[nodeType] = impl;
    return this;
  };

  this.canBreak = function(nodeType) {
    return this._break[nodeType];
  };

  this.getBreaker = function(nodeType) {
    return this._break[nodeType];
  };

};

oo.initClass(EditingBehavior);

/**
  Represents a flow editor that manages a sequence of nodes in a container. Needs to be
  instantiated inside a {@link ui/Controller} context.

  @class ContainerEditor
  @component
  @extends ui/Surface

  @prop {String} name unique editor name
  @prop {String} containerId container id
  @prop {Object[]} textTypes array of textType definition objects
  @prop {ui/SurfaceCommand[]} commands array of command classes to be available

  @example

  Create a full-fledged `ContainerEditor` for the `body` container of a document.
  Allow Strong and Emphasis annotations and to switch text types between paragraph
  and heading at level 1.

  ```js
  $$(ContainerEditor, {
    name: 'bodyEditor',
    containerId: 'body',
    textTypes: [
      {name: 'paragraph', data: {type: 'paragraph'}},
      {name: 'heading1',  data: {type: 'heading', level: 1}}
    ],
    commands: [StrongCommand, EmphasisCommand, SwitchTextTypeCommand],
  })
  ```
 */

class ContainerEditor extends Surface {
  constructor(parent, props) {
    // default props derived from the given props
    props.containerId = props.containerId || props.node.id
    props.name = props.name || props.containerId || props.node.id

    super(parent, props)

    this.containerId = this.props.containerId
    if (!isString$1(this.containerId)) {
      throw new Error("Property 'containerId' is mandatory.")
    }
    let doc = this.getDocument()
    this.container = doc.get(this.containerId)
    if (!this.container) {
      throw new Error('Container with id ' + this.containerId + ' does not exist.')
    }

    this.editingBehavior = this.context.editingBehavior || new EditingBehavior()

    // derive internal state variables
    ContainerEditor.prototype._deriveInternalState.call(this, this.props)
  }

  get _isContainerEditor() {
    return true
  }

  // Note: this component is self managed
  shouldRerender(newProps) {
    if (newProps.disabled !== this.props.disabled) return true
    // TODO: we should still detect when the document has changed,
    // see https://github.com/substance/substance/issues/543
    return false
  }

  willReceiveProps(newProps) {
    super.willReceiveProps.apply(this, arguments)
    ContainerEditor.prototype._deriveInternalState.call(this, newProps)
  }

  didMount() {
    super.didMount.apply(this, arguments)
    // var doc = this.getDocument();
    // to do incremental updates
    this.container.on('nodes:changed', this.onContainerChange, this)
  }

  dispose() {
    super.dispose.apply(this, arguments)
    // var doc = this.getDocument();
    // doc.off(this);
    this.container.off(this)
  }

  render($$) {
    let el = super.render.call(this, $$)

    let doc = this.getDocument()
    let containerId = this.getContainerId()
    let containerNode = doc.get(containerId)
    if (!containerNode) {
      console.warn('No container node found for ', containerId)
    }
    el.addClass('sc-container-editor container-node ' + containerId)
      .attr({
        spellCheck: false,
        "data-id": containerId
      })

    if (this.isEmpty()) {
      el.append(
        $$('a').attr('href', '#').append('Start writing').on('click', this.onCreateText)
      )
    } else {
      containerNode.getNodes().forEach(function(node) {
        el.append(this._renderNode($$, node).ref(node.id))
      }.bind(this))
    }

    if (!this.props.disabled) {
      el.addClass('sm-enabled')
      el.setAttribute('contenteditable', true)
    }

    return el
  }

  _renderNode($$, node) {
    if (!node) throw new Error('Illegal argument')
    if (node.isText()) {
      return super.renderNode.call(this, $$, node)
    } else {
      let componentRegistry = this.context.componentRegistry
      let ComponentClass = componentRegistry.get(node.type)
      if (ComponentClass.prototype._isIsolatedNodeComponent) {
        return $$(ComponentClass, { node: node }).ref(node.id)
      } else {
        return $$(IsolatedNodeComponent, { node: node }).ref(node.id)
      }
    }
  }

  _deriveInternalState(props) {
    let _state = this._state
    if (!props.hasOwnProperty('enabled') || props.enabled) {
      _state.enabled = true
    } else {
      _state.enabled = false
    }
  }

  _handleUpOrDownArrowKey(event) {
    event.stopPropagation()
    let direction = (event.keyCode === keys$2.UP) ? 'left' : 'right'
    let selState = this.getDocumentSession().getSelectionState()
    let sel = selState.getSelection()

    // Note: this collapses the selection, just to let ContentEditable continue doing a cursor move
    if (sel.isNodeSelection() && sel.isFull() && !event.shiftKey) {
      this.domSelection.collapse(direction)
    }
    // HACK: ATM we have a cursor behavior in Chrome and FF when collapsing a selection
    // e.g. have a selection from up-to-down and the press up, seems to move the focus
    else if (!platform.isIE && !sel.isCollapsed() && !event.shiftKey) {
      let doc = this.getDocument()
      if (direction === 'left') {
        this.setSelection(doc.createSelection(sel.start.path, sel.start.offset))
      } else {
        this.setSelection(doc.createSelection(sel.end.path, sel.end.offset))
      }
    }
    // Note: we need this timeout so that CE updates the DOM selection first
    // before we try to map it to the model
    window.setTimeout(function() {
      if (!this.isMounted()) return
      this._updateModelSelection({ direction: direction })
    }.bind(this))
  }

  _handleLeftOrRightArrowKey(event) {
    event.stopPropagation()
    let direction = (event.keyCode === keys$2.LEFT) ? 'left' : 'right'
    let selState = this.getDocumentSession().getSelectionState()
    let sel = selState.getSelection()
    // Note: collapsing the selection and let ContentEditable still continue doing a cursor move
    if (sel.isNodeSelection() && sel.isFull() && !event.shiftKey) {
      event.preventDefault()
      this.setSelection(sel.collapse(direction))
      return
    } else {
      super._handleLeftOrRightArrowKey.call(this, event)
    }
  }

  _handleEnterKey(event) {
    let sel = this.getDocumentSession().getSelection()
    if (sel.isNodeSelection() && sel.isFull()) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      super._handleEnterKey.apply(this, arguments)
    }
  }

  // Used by Clipboard
  isContainerEditor() {
    return true
  }

  /**
    Returns the containerId the editor is bound to
  */
  getContainerId() {
    return this.containerId
  }

  // TODO: do we really need this in addition to getContainerId?
  getContainer() {
    return this.getDocument().get(this.getContainerId())
  }

  isEmpty() {
    let containerNode = this.getContainer()
    return (containerNode && containerNode.nodes.length === 0)
  }

  isEditable() {
    return super.isEditable.call(this) && !this.isEmpty()
  }

  /*
    Register custom editor behavior using this method
  */
  extendBehavior(extension) {
    extension.register(this.editingBehavior)
  }

  getTextTypes() {
    return this.textTypes || []
  }

  // Used by SwitchTextTypeTool
  // TODO: Filter by enabled commands for this Surface
  getTextCommands() {
    var textCommands = {}
    this.commandRegistry.each(function(cmd) {
      if (cmd.constructor.textTypeName) {
        textCommands[cmd.getName()] = cmd
      }
    });
    return textCommands
  }

  /* Editing behavior */

  /**
    Performs a {@link model/transform/breakNode} transformation
  */
  break(tx, args) {
    return breakNode(tx, args)
  }

  /**
    Performs an {@link model/transform/insertNode} transformation
  */
  insertNode(tx, args) {
    if (args.selection.isPropertySelection() || args.selection.isContainerSelection()) {
      return insertNode(tx, args)
    }
  }

  /**
   * Performs a {@link model/transform/switchTextType} transformation
   */
  switchType(tx, args) {
    if (args.selection.isPropertySelection()) {
      return switchTextType(tx, args)
    }
  }

  /**
    Selects all content in the container
  */
  selectAll() {
    let doc = this.getDocument()
    let container = doc.get(this.getContainerId())
    if (container.nodes.length === 0) {
      return
    }
    let firstNodeId = container.nodes[0]
    let lastNodeId = last$1(container.nodes)
    let sel = doc.createSelection({
      type: 'container',
      containerId: container.id,
      startPath: [firstNodeId],
      startOffset: 0,
      endPath: [lastNodeId],
      endOffset: 1
    })
    this.setSelection(sel)
  }

  selectFirst() {
    let doc = this.getDocument()
    let nodes = this.getContainer().nodes
    if (nodes.length === 0) {
      console.warn('ContainerEditor.selectFirst(): Container is empty.')
      return
    }
    let node = doc.get(nodes[0])
    let sel
    if (node.isText()) {
      sel = doc.createSelection(node.getTextPath(), 0)
    } else {
      sel = doc.createSelection(this.getContainerId(), [node.id], 0, [node.id], 1)
    }
    this.setSelection(sel)
  }

  /**
    Performs a {@link model/transform/paste} transformation
  */
  paste(tx, args) {
    if (args.selection.isPropertySelection() || args.selection.isContainerSelection()) {
      return paste(tx, args)
    }
  }

  onContainerChange(change) {
    let doc = this.getDocument()
    // first update the container
    let renderContext = RenderingEngine.createContext(this)
    let $$ = renderContext.$$
    let container = this.getContainer()
    let path = container.getContentPath()
    for (let i = 0; i < change.ops.length; i++) {
      let op = change.ops[i]
      if (op.type === "update" && op.path[0] === path[0]) {
        let diff = op.diff
        if (diff.type === "insert") {
          let nodeId = diff.getValue()
          let node = doc.get(nodeId)
          let nodeEl
          if (node) {
            nodeEl = this._renderNode($$, node)
          } else {
            // node does not exist anymore
            // so we insert a stub element, so that the number of child
            // elements is consistent
            nodeEl = $$('div')
          }
          this.insertAt(diff.getOffset(), nodeEl)
        } else if (diff.type === "delete") {
          this.removeAt(diff.getOffset())
        }
      }
    }
  }

  // Create a first text element
  onCreateText(e) {
    e.preventDefault()

    let newSel;
    this.transaction(function(tx) {
      let container = tx.get(this.props.containerId)
      let textType = tx.getSchema().getDefaultTextType()
      let node = tx.create({
        id: uuid$1(textType),
        type: textType,
        content: ''
      })
      container.show(node.id)

      newSel = tx.createSelection({
        type: 'property',
        path: [ node.id, 'content'],
        startOffset: 0,
        endOffset: 0
      })
    }.bind(this))
    this.rerender()
    this.setSelection(newSel)
  }

  transaction(transformation, info) {
    let documentSession = this.documentSession
    let surfaceId = this.getId()
    let containerId = this.getContainerId()
    return documentSession.transaction(function(tx, args) {
      let sel = tx.before.selection
      if (sel && !sel.isNull()) {
        sel.containerId = sel.containerId || containerId
      }
      tx.before.surfaceId = surfaceId
      args.containerId = this.getContainerId()
      args.editingBehavior = this.editingBehavior
      let result = transformation(tx, args)
      if (result) {
        sel = result.selection
        if (sel && !sel.isNull()) {
          sel.containerId = containerId
        }
        return result
      }
    }.bind(this), info)
  }

}


ContainerEditor.isContainerEditor = true

/*
  A default implementation to render the content for the overlay (aka popup) tools.
*/
class ProseEditorOverlayTools extends Component {

  /*
    NOTE: overlay gets only shown when el.childNodes.length > 0
    See OverlayContainer
  */
  render($$) {
    let el = $$('div').addClass(this.getClassNames())
    let activeTools = this.getActiveTools()

    if (activeTools.length > 0) {
      let toolsEl = $$('div').addClass('se-active-tools')
      activeTools.forEach(tool => {
        toolsEl.append(
          $$(tool.Class, tool.toolProps).ref(tool.toolProps.name)
        )
      })
      el.append(toolsEl)
    }
    return el
  }

  getActiveTools() {
    let commandStates = this.props.commandStates
    let tools = this.context.tools
    let overlayTools = tools.get('overlay')
    let activeTools = []

    overlayTools.forEach((tool, toolName) => {
      let toolProps = Object.assign({}, commandStates[toolName], {
        name: toolName,
        // rendering hints only interprerted by generic Tool class
        // (= outlined button)
        icon: toolName,
        style: this.getStyle()
      })

      if (!toolProps.disabled) {
        activeTools.push({
          Class: tool.Class,
          toolProps: toolProps
        })
      }
    })
    return activeTools
  }

  isVisible() {
    return this.getActiveTools().length > 0
  }

  getStyle() {
    return 'outline-dark'
  }

  getClassNames() {
    return 'sc-prose-editor-overlay-tools'
  }

}

class ProseEditor extends AbstractEditor {

  willUpdateState(newState) {
    this.handleStateUpdate(newState)
  }

  render($$) {
    let SplitPane = this.componentRegistry.get('split-pane')
    let el = $$('div').addClass('sc-prose-editor')
    let toolbar = this._renderToolbar($$)
    let editor = this._renderEditor($$)
    let ScrollPane = this.componentRegistry.get('scroll-pane')

    let contentPanel = $$(ScrollPane, {
      scrollbarType: 'substance',
      scrollbarPosition: 'right',
      overlay: ProseEditorOverlayTools,
    }).append(
      editor
    ).ref('contentPanel')

    el.append(
      $$(SplitPane, {splitType: 'horizontal'}).append(
        toolbar,
        contentPanel
      )
    )
    return el
  }

  _renderToolbar($$) {
    let configurator = this.props.configurator
    let ToolbarClass = configurator.getToolbarClass()
    let commandStates = this.commandManager.getCommandStates()
    return $$(ToolbarClass, {
      commandStates: commandStates
    }).ref('toolbar')
  }

  _renderEditor($$) {
    let configurator = this.props.configurator
    return $$(ContainerEditor, {
      disabled: this.props.disabled,
      documentSession: this.documentSession,
      node: this.doc.get('body'),
      commands: configurator.getSurfaceCommandNames(),
      textTypes: configurator.getTextTypes()
    }).ref('body')
  }

  getToolbar() {
    return this.refs.toolbar
  }

  documentSessionUpdated() {
    let toolbar = this.getToolbar()
    if (toolbar) {
      let commandStates = this.commandManager.getCommandStates()
      toolbar.setProps({
        commandStates: commandStates
      })
    }
  }
}

/**
  Registry for Nodes.

  @class NodeRegistry
  @extends util/Registry
 */
function NodeRegistry() {
  Registry.call(this);
}

NodeRegistry.Prototype = function() {

  /**
    Register a Node class.

    @param {Class} nodeClass
   */
  this.register = function (nodeClazz) {
    var type = nodeClazz.prototype.type;
    if ( typeof type !== 'string' || type === '' ) {
      console.error('#### nodeClazz', nodeClazz);
      throw new Error( 'Node names must be strings and must not be empty');
    }
    if ( !( nodeClazz.prototype._isNode) ) {
      throw new Error( 'Nodes must be subclasses of Substance.Data.Node' );
    }
    if (this.contains(type)) {
      throw new Error('Node class is already registered: ' + type);
    }
    this.add(type, nodeClazz);
  };

};

Registry.extend(NodeRegistry);

/**
  Schema for Data Objects.

  @class Schema
  @private
 */

/**
  @constructor Schema
  @param {String} name
  @param {String} version
*/
function Schema(name, version) {
  /**
    @type {String}
  */
  this.name = name;
  /**
    @type {String}
  */
  this.version = version;
  /**
    @type {NodeRegistry}
    @private
  */
  this.nodeRegistry = new NodeRegistry();
  /**
    @type {Array} all Node classes which have `Node.tocType = true`
    @private
  */
  this.tocTypes = [];

  // add built-in node classes
  this.addNodes(this.getBuiltIns());
}

Schema.Prototype = function() {

  /**
    Add nodes to the schema.

    @param {Array} nodes Array of Node classes
  */
  this.addNodes = function(nodes) {
    if (!nodes) return;
    each$1(nodes, function(NodeClass) {
      if (!NodeClass.prototype._isNode) {
        console.error('Illegal node class: ', NodeClass);
      } else {
        this.addNode(NodeClass);
      }
    }.bind(this));
  };

  this.addNode = function(NodeClass) {
    this.nodeRegistry.register(NodeClass);
    if (NodeClass.tocType) {
      this.tocTypes.push(NodeClass.type);
    }
  };

  /**
    Get the node class for a type name.

    @param {String} name
    @returns {Class}
  */
  this.getNodeClass = function(name) {
    return this.nodeRegistry.get(name);
  };

  /**
    Provide all built-in node classes.

    @private
    @returns {Node[]} An array of Node classes.
  */
  this.getBuiltIns = function() {
    return [];
  };

  /**
    Checks if a given type is of given parent type.

    @param {String} type
    @param {String} parentType
    @returns {Boolean} true if type is and instance of parentType.
  */
  this.isInstanceOf = function(type, parentType) {
    var NodeClass = this.getNodeClass(type);
    if (NodeClass) {
      return Node.isInstanceOf(NodeClass, parentType);
    }
    return false;
  };

  /**
    Iterate over all registered node classes.

    See {@link util/Registry#each}

    @param {Function} callback
    @param {Object} context
  */
  this.each = function() {
    this.nodeRegistry.each.apply(this.nodeRegistry, arguments);
  };

  /**
    @returns {Node[]} list of types that should appear in a TOC
  */
  this.getTocTypes = function() {
    return this.tocTypes;
  };

  /**
    @returns {String} the name of the default textish node (e.g. 'paragraph')
  */
  this.getDefaultTextType = function() {
    throw new Error('Schmema.prototype.getDefaultTextType() must be overridden.');
  };

  this.getNodeSchema = function(type) {
    var NodeClass = this.getNodeClass(type);
    if (!NodeClass) {
      console.error('Unknown node type ', type);
      return null;
    }
    return NodeClass.schema;
  };
};

oo.initClass(Schema);

/**
  Used to define custom article formats. Predefined node types can be combined with custom ones.

  @class
  @param {String} name schema identifier
  @param {String} schema schema version

  @example

  ```js
  import Paragraph from 'substance/packages/paragraph/Paragraph'
  import Emphasis from 'substance/packages/emphasis/Emphasis'
  import Strong from 'substance/packages/emphasis/Strong'
  import PropertyAnnotation from 'substance/ui/PropertyAnnotation'

  var Comment = PropertyAnnotation.extend({
    name: 'comment',
    properties: {
      content: 'string'
    }
  });

  var schema = new Document.Schema('my-article', '1.0.0');
  schema.getDefaultTextType = function() {
    return 'paragraph';
  };
  schema.addNodes([Paragraph, Emphasis, Strong, Comment]);
  ```
*/

function DocumentSchema(name, version) {
  DocumentSchema.super.call(this, name, version);
}

DocumentSchema.Prototype = function() {

  /**
    Returns default text type. E.g. used when hitting ENTER in a text node, which
    produces a new node of the type returned here. Abstract method, which must be implemented.

    @abstract
    @returns {String} default text type (e.g. 'paragraph')
  */

  this.getDefaultTextType = function() {
    throw new Error('DocumentSchema.getDefaultTextType() is abstract and must be overridden.');
  };

  this.isAnnotationType = function(type) {
    var nodeClass = this.getNodeClass(type);
    return (nodeClass && nodeClass.prototype._isPropertyAnnotation);
  };

  this.getBuiltIns = function() {
    return [DocumentNode, PropertyAnnotation, Container, ContainerAnnotation];
  };

};

Schema.extend(DocumentSchema);

class ComponentRegistry extends Registry {
  constructor(entries) {
    super(entries, function(ComponentClass) {
      if (!ComponentClass.prototype._isComponent) {
        throw new Error('Component registry: wrong type. Expected a ComponentClass. Was: ' + String(ComponentClass))
      }
    })
  }
}

/**
 * Abstract Configurator for Substance editors.
 *
 * @module
 */
class AbstractConfigurator {
  constructor() {
    this.config = {
      schema: {},
      nodes: {},
      components: {},
      converters: {},
      importers: {},
      exporters: {},
      commands: {},
      tools: new Map(),
      textTypes: [],
      editingBehaviors: [],
      macros: [],
      dndHandlers: [],
      icons: {},
      labels: {}
    }
  }

  // Record phase API
  // ------------------------

  defineSchema(schema) {
    this.config.schema = schema
  }

  /**
   * @param {String} NodeClass node class name.
   */
  addNode(NodeClass) {
    var type = NodeClass.type
    if (!type) {
      throw new Error('A NodeClass must have a type.')
    }
    if (this.config.nodes[type]) {
      throw new Error('NodeClass with this type name is already registered: ' + name)
    }
    this.config.nodes[type] = NodeClass
  }

  addConverter(type, converter) {
    var converters = this.config.converters[type]
    if (!converters) {
      converters = {}
      this.config.converters[type] = converters
    }
    if (!converter.type) {
      throw new Error('A converter needs an associated type.')
    }
    converters[converter.type] = converter
  }

  addImporter(type, ImporterClass) {
    this.config.importers[type] = ImporterClass
  }

  addExporter(type, ExporterClass) {
    this.config.exporters[type] = ExporterClass
  }

  addComponent(name, ComponentClass) {
    if (this.config.components[name]) {
      throw new Error(name+' already registered')
    }
    if (!ComponentClass || !ComponentClass.prototype._isComponent) {
      throw new Error('ComponentClass must be a subclass of ui/Component.')
    }
    this.config.components[name] = ComponentClass
  }

  addCommand(name, CommandClass, options) {
    if (!isString$1(name)) {
      throw new Error("Expecting 'name' to be a String")
    }
    if (!CommandClass.prototype._isCommand) {
      throw new Error("Expecting 'CommandClass' to be of type ui/Command.")
    }
    this.config.commands[name] = {
      name: name,
      CommandClass: CommandClass,
      options: options || {}
    }
  }

  addTool(name, ToolClass, options) {
    options = options || {};
    if (!isString$1(name)) {
      throw new Error("Expecting 'name' to be a String")
    }
    if (!ToolClass.prototype._isTool) {
      throw new Error("Expecting 'ToolClass' to be of type ui/Tool.")
    }
    var toolTarget = options.target
    if (!toolTarget && options.overlay) {
      toolTarget = 'overlay'
    } else if (!toolTarget) {
      toolTarget = 'default'
    }
    if (!this.config.tools.has(toolTarget)) {
      this.config.tools.set(toolTarget, new Map());
    }
    this.config.tools.get(toolTarget).set(name, {
      name: name,
      Class: ToolClass,
      options: options || {}
    })
  }

  addIcon(iconName, options) {
    var iconConfig = this.config.icons[iconName]
    if (!iconConfig) {
      iconConfig = {}
      this.config.icons[iconName] = iconConfig
    }
    Object.assign(iconConfig, options)
  }

  /**
    @param {String} labelName name of label.
    @param {String} label label.

    Define a new label
    Label is either a string or a hash with translations.
    If string is provided 'en' is used as the language.
  */
  addLabel(labelName, label) {
    if (isString$1(label)) {
      if(!this.config.labels['en']) {
        this.config.labels['en'] = {}
      }
      this.config.labels['en'][labelName] = label
    } else {
      forEach$1(label, function(label, lang) {
        if (!this.config.labels[lang]) {
          this.config.labels[lang] = {}
        }
        this.config.labels[lang][labelName] = label
      }.bind(this))
    }
  }

  /**
    @param seed Seed function.

    Define a seed function
    Seed function is a transaction function.

    @example

    ```js
    var seedFn = function(tx) {
      var body = tx.get('body');

      tx.create({
        id: 'p1',
        type: 'paragraph',
        content: 'This is your new paragraph!'
      });
      body.show('p1');
    };

    config.addSeed(seedFn);
    ```
  */

  addSeed(seed) {
    this.config.seed = seed
  }

  addTextType(textType, options) {
    this.config.textTypes.push({
      spec: textType,
      options: options || {}
    })
  }

  addEditingBehavior(editingBehavior) {
    this.config.editingBehaviors.push(editingBehavior)
  }

  addMacro(macro) {
    this.config.macros.push(macro)
  }

  addDragAndDrop(DragAndDropHandlerClass) {
    if (!DragAndDropHandlerClass.prototype._isDragAndDropHandler) {
      throw new Error('Only instances of DragAndDropHandler are allowed.')
    }
    this.config.dndHandlers.push(DragAndDropHandlerClass)
  }

  import(pkg, options) {
    pkg.configure(this, options || {})
    return this
  }

  // Config Interpreter APIs
  // ------------------------

  getConfig() {
    return this.config;
  }

  getStyles() {
    return this.config.styles
  }

  getSchema() {
    var schemaConfig = this.config.schema;
    // TODO: We may want to remove passing a schema version as
    // the version is defined by the repository / npm package version
    var schema = new DocumentSchema(schemaConfig.name, '1.0.0')
    schema.getDefaultTextType = function() {
      return schemaConfig.defaultTextType
    }
    schema.addNodes(this.config.nodes)
    return schema
  }

  createArticle(seed) {
    var schemaConfig = this.config.schema;
    var schema = this.getSchema()
    var doc = new schemaConfig.ArticleClass(schema)
    if (seed) {
      seed(doc)
    }
    return doc
  }

  createImporter(type) {
    var ImporterClass = this.config.importers[type]
    var config = {
      schema: this.getSchema(),
      converters: this.getConverterRegistry().get(type),
      DocumentClass: this.config.schema.ArticleClass
    }
    return new ImporterClass(config)
  }

  createExporter(type) {
    var ExporterClass = this.config.exporters[type]
    var config = {
      schema: this.getSchema(),
      converters: this.getConverterRegistry().get(type)
    }
    return new ExporterClass(config)
  }

  getTools() {
    return this.config.tools;
  }

  getComponentRegistry() {
    var componentRegistry = new ComponentRegistry()
    forEach$1(this.config.components, function(ComponentClass, name) {
      componentRegistry.add(name, ComponentClass)
    })
    return componentRegistry
  }

  getCommands() {
    return map$1(this.config.commands, function(item, name) {
      return new item.CommandClass(Object.assign({name: name}, item.options))
    })
  }

  getSurfaceCommandNames() {
    var commands = this.getCommands()
    var commandNames = commands.map(function(C) {
      return C.type
    })
    return commandNames
  }

  /*
    A converter registry is a registry by file type and then by node type

    `configurator.getConverterRegistry().get('html').get('paragraph')` provides
    a HTML converter for Paragraphs.
  */
  getConverterRegistry() {
    if (!this.converterRegistry) {
      var converterRegistry = new Registry()
      forEach$1(this.config.converters, function(converters, name) {
        converterRegistry.add(name, new Registry(converters))
      })
      this.converterRegistry = converterRegistry
    }
    return this.converterRegistry
  }

  getIconProvider() {
    throw new Error('This method is abstract')
  }

  getSeed() {
    return this.config.seed
  }

  getTextTypes() {
    return this.config.textTypes.map(function(t) {
      return t.spec
    })
  }

  getLabelProvider() {
    throw new Error('This method is abstract.')
  }

  getEditingBehavior() {
    var editingBehavior = new EditingBehavior()
    this.config.editingBehaviors.forEach(function(behavior) {
      behavior.register(editingBehavior)
    })
    return editingBehavior
  }

  getMacros() {
    return this.config.macros
  }

  createDragHandlers() {
    return this.config.dndHandlers.map(function(DragAndDropHandlerClass) {
      return new DragAndDropHandlerClass()
    })
  }
}

class FontAwesomeIcon extends Component {
  constructor(...args) {
    super(...args)
  }

  render($$) {
    return $$('i').addClass('fa ' + this.props.icon)
  }

}

class FontAwesomeIconProvider {
  constructor(icons) {
    this.map = {}
    forEach$1(icons, function(config, name) {
      let faClass = config['fontawesome']
      if (faClass) {
        this.addIcon(name, faClass)
      }
    }.bind(this))
  }

  renderIcon($$, name) {
    let iconClass = this.map[name]
    if (iconClass) {
      return $$(FontAwesomeIcon, {icon:iconClass})
    }
  }

  addIcon(name, faClass) {
    this.map[name] = faClass
  }
}

oo.initClass(FontAwesomeIconProvider)

/**
 Default label provider implementation
*/

class LabelProvider {
  constructor(labels, lang) {
    this.lang = lang || 'en'
    this.labels = labels
  }

  getLabel(name) {
    let labels = this.labels[this.lang]
    if (!labels) return name
    return labels[name] || name
  }
}

oo.initClass(LabelProvider)

// Setup default label provider
/*
  Default Configurator for most Substance apps

  If you need app-specific API's just extend
  and configure your custom configurator.
*/
class Configurator extends AbstractConfigurator {

  getIconProvider() {
    return new FontAwesomeIconProvider(this.config.icons)
  }

  getLabelProvider() {
    return new LabelProvider(this.config.labels)
  }
}

class FileClientStub {

  uploadFile(file, cb) {
    let delay = 50
    let steps = (file.size / 500000) * (1000 / delay)
    let i = 0
    let channel = new EventEmitter()
    let _step = function() {
      if (i++ < steps) {
        channel.emit('progress', (i-1)/(steps))
        window.setTimeout(_step, delay)
      } else {
        // Default file upload implementation
        // We just return a temporary objectUrl
        let fileUrl = window.URL.createObjectURL(file)
        cb(null, fileUrl)
      }
    }
    _step()
    return channel
  }
}

oo.initClass(FileClientStub)

class SaveHandlerStub {

  saveDocument(doc, changes, cb) {
    console.warn('No SaveHandler provided. Using Stub.')
    cb(null)
  }
}

oo.initClass(SaveHandlerStub)

class Toolbar extends Component {
  render($$) {
    let el = $$("div").addClass(this.getClassNames())
    let commandStates = this.props.commandStates
    let componentRegistry = this.context.componentRegistry
    let toolTargets = this.context.tools
    let toolEls = []

    toolTargets.forEach(function(tools, target) {
      if (target === 'overlay') return; // skip overlay target

      let ToolTargetClass = componentRegistry.get('tool-target-'+target)
      if (!ToolTargetClass) {
        ToolTargetClass = ToolGroup
      }
      let toolTargetEl = $$(ToolTargetClass, {
        name: target,
        tools: tools,
        commandStates: commandStates
      })
      el.append(toolTargetEl)
    })
    return el
  }

  getClassNames() {
    return 'sc-toolbar';
  }
}

/*
  This works well for single-column apps (such as ProseEditor).
  Write your own Configurator for apps that require more complex
  configuration (e.g. when there are multiple surfaces involved
  each coming with different textTypes, enabled commands etc.)
*/
class ProseEditorConfigurator extends Configurator {
  constructor(...args) {
    super(...args)
    // Extend configuration
    this.config.saveHandler = new SaveHandlerStub()
    this.config.fileClient = new FileClientStub()
    this.config.ToolbarClass = Toolbar
  }

  setSaveHandler(saveHandler) {
    this.config.saveHandler = saveHandler
  }

  setToolbarClass(ToolbarClass) {
    this.config.ToolbarClass = ToolbarClass
  }

  setFileClient(fileClient) {
    this.config.fileClient = fileClient
  }

  getFileClient() {
    return this.config.fileClient
  }

  getSaveHandler() {
    return this.config.saveHandler
  }

  getToolbarClass() {
    return this.config.ToolbarClass
  }
}

// Base packages
var ProseEditorPackage = {
  name: 'prose-editor',
  configure: function(config, options) {
    config.defineSchema({
      name: 'prose-article',
      ArticleClass: ProseArticle,
      defaultTextType: 'paragraph'
    })
    // Now import base packages
    config.import(BasePackage, {
      noBaseStyles: options.noBaseStyles
    })

    config.import(ParagraphPackage)
    config.import(HeadingPackage)
    config.import(CodeblockPackage)
    config.import(BlockquotePackage)
    config.import(ListPackage)
    config.import(EmphasisPackage)
    config.import(StrongPackage)
    config.import(SubscriptPackage)
    config.import(SuperscriptPackage)
    config.import(CodePackage)
    config.import(LinkPackage)
  },
  ProseEditor: ProseEditor,
  Configurator: ProseEditorConfigurator,
  Toolbar: Toolbar
}

class InsertInlineNodeCommand extends Command {
  constructor(...args) {
    super(...args)

    if (!this.params.nodeType) {
      throw new Error('Every AnnotationCommand must have a nodeType')
    }
  }

  getCommandState(props, context) {
    let sel = context.documentSession.getSelection()
    let newState = {
      disabled: !sel.isPropertySelection(),
      active: false
    }
    return newState
  }

  execute(props, context) {
    let state = this.getCommandState(props, context)
    if (state.disabled) return
    let surface = context.surface || context.surfaceManager.getFocusedSurface()
    if (surface) {
      surface.transaction(function(tx, args) {
        return this.insertInlineNode(tx, args)
      }.bind(this))
    }
    return true
  }

  insertInlineNode(tx, args) {
    args.node = this.createNodeData(tx, args)
    return insertInlineNode(tx, args)
  }

  createNodeData(tx, args) { // eslint-disable-line
    return {
      type: this.params.nodeType
    }
  }

  _getAnnotationsForSelection(props) {
    return props.selectionState.getAnnotationsForType(this.params.nodeType)
  }

}

class EditInlineNodeCommand extends Command {
  constructor(...args) {
    super(...args)
    if (!this.params.nodeType) {
      throw new Error('Every AnnotationCommand must have a nodeType')
    }
  }

  getCommandState(props, context) {
    let sel = context.documentSession.getSelection()
    let newState = {
      disabled: true,
      active: false
    }
    let annos = this._getAnnotationsForSelection(props, context)
    if (annos.length === 1 && annos[0].getSelection().equals(sel)) {
      newState.disabled = false
      newState.node = annos[0]
    }
    return newState
  }

  execute(props, context) { // eslint-disable-line

  }

  _getAnnotationsForSelection(props) {
    return props.selectionState.getAnnotationsForType(this.params.nodeType)
  }

}

/**
  Layout component for simple layout tasks, without having to write CSS

  @class
  @component

  @prop {String} width 'small', 'medium', 'large' and 'full'
  @prop {String} [textAlign] 'center', 'left' or 'right'
  @prop {String} [noPadding] No padding around layout, will fill the whole space

  @example

  ```js
  var form = $$(Layout, {
    width: 'large',
    textAlign: 'center'
  });
  ```
*/
class Layout extends Component {

  render($$) {
    let el = $$('div').addClass('sc-layout')
    el.addClass('sm-width-'+this.props.width)
    if (this.props.textAlign) {
      el.addClass('sm-text-align-'+this.props.textAlign)
    }

    if (this.props.noPadding) {
      el.addClass('sm-no-padding')
    }

    el.append(this.props.children)
    return el
  }
}

var LayoutPackage = {
  name: 'layout',
  configure: function(config) {
    config.addComponent('layout', Layout)
  }
}

class ResponsiveApplication extends Component {
  constructor(...args) {
    super(...args)

    this.pages = {}

    this.handleActions({
      'navigate': this.navigate
    })
  }

  getInitialState() {
    return {
      route: undefined,
      mobile: this._isMobile()
    }
  }

  didMount() {
    if (inBrowser) {
      let _window = DefaultDOMElement.getBrowserWindow()
      _window.on('resize', this._onResize, this)
    }
    this.router = this.getRouter()
    this.router.on('route:changed', this._onRouteChanged, this)
    let route = this.router.readRoute()
    // Replaces the current entry without creating new history entry
    // or triggering hashchange
    this.navigate(route, {replace: true})
  }

  dispose() {
    this.router.off(this)
    this.router.dispose()
  }

  /*
    Used to navigate the app based on given route.

    Example route: {documentId: 'example.xml'}
    On app level, never use setState/extendState directly as this may
    lead to invalid states.
  */
  navigate(route, opts) {
    this.extendState({
      route: route
    })
    this.router.writeRoute(route, opts)
  }

  _onRouteChanged(route) {
    // console.log('NotesApp._onRouteChanged', route);
    this.navigate(route, {replace: true})
  }

  _isMobile() {
    if (inBrowser) {
      return window.innerWidth < 700
    }
  }

  _onResize() {
    if (this._isMobile()) {
      // switch to mobile
      if (!this.state.mobile) {
        this.extendState({
          mobile: true
        })
      }
    } else {
      if (this.state.mobile) {
        this.extendState({
          mobile: false
        })
      }
    }
  }

  _getPage() {
    return this.state.route.page || this.getDefaultPage()
  }

  _getPageClass() {
    let page = this._getPage()
    return this.pages[page]
  }

  _getPageProps() {
    let props = cloneDeep$1(this.state.route)
    delete props.page
    props.mobile = this.state.mobile
    return props
  }

  addPage(pageName, PageClass) {
    this.pages[pageName] = PageClass
  }

  renderPage($$) {
    let PageClass = this._getPageClass()
    let pageName = this._getPage()
    return $$(PageClass, this._getPageProps()).ref(pageName)
  }

  render($$) {
    let el = $$('div').addClass('sc-responsive-application')

    if (this.state.route === undefined) {
      // Not yet initialized by router
      return el
    }

    el.append(
      this.renderPage($$)
    )

    return el
  }

}

class ToolDropdown extends Component {
  render($$) {
    let tools = this.props.tools
    let commandStates = this.props.commandStates
    let el = $$('div').addClass('sc-tool-dropdown')
    el.addClass('sm-target-'+this.props.name)
    el.append(
      this.renderButton($$)
    )
    if (this.state.open) {
      let optionEls = []
      tools.forEach(function(tool, name) {
        let toolProps = Object.assign({}, commandStates[name])
        toolProps.name = name
        toolProps.label = name
        toolProps.hint = 'CTRL+4'
        toolProps.style = 'plain-dark' // plain button style on dark bg will be used
        optionEls.push($$(tool.Class, toolProps))
      })
      el.append(
        $$('div').addClass('se-options').append(
          $$('div').addClass('se-arrow'),
          $$('div').addClass('se-content').append(
            optionEls
          )
        )
      )
    }
    return el
  }

  renderButton($$) {
    let btn = $$(Button, {
      label: this.props.name,
      active: this.state.open,
      disabled: this.props.disabled,
      style: this.props.style
    }).on('click', this.onClick)
    return btn
  }

  onClick() {
    let open = !this.state.open
    this.setState({
      open: open
    })
  }
}

class Router extends EventEmitter {
  constructor(...args) {
    super(...args)
    this.__isStarted__ = false
  }

  /*
    Starts listening for hash-changes
  */
  start() {
    let window = DefaultDOMElement.getBrowserWindow()
    window.on('hashchange', this._onHashChange, this)
    this.__isStarted__ = true
  }

  /*
    Reads out the current route
  */
  readRoute() {
    if (!this.__isStarted__) this.start()
    return this.parseRoute(this.getRouteString())
  }

  /*
    Writes out a given route as a string url
  */
  writeRoute(route, opts) {
    opts = opts || {}
    let routeString = this.stringifyRoute(route)
    if (!routeString) {
      this.clearRoute(opts);
    } else {
      this._writeRoute(routeString, opts);
    }
  }

  dispose() {
    let window = DefaultDOMElement.getBrowserWindow()
    window.off(this)
  }

  /*
    Maps a route URL to a route object

    @abstract
    @param String route content of the URL's hash fragment
  */
  parseRoute(routeString) {
    return Router.routeStringToObject(routeString)
  }

  /*
    Maps a route object to a route URL

    This can be overriden by an application specific router.

    @abstract
  */
  stringifyRoute(route) {
    return Router.objectToRouteString(route)
  }

  getRouteString() {
    return window.location.hash.slice(1)
  }

  _writeRoute(route, opts) {
    this.__isSaving__ = true
    try {
      if (opts.replace) {
        window.history.replaceState({} , '', '#'+route)
      } else {
        window.history.pushState({} , '', '#'+route)
      }
    } finally {
      this.__isSaving__ = false
    }
  }

  clearRoute(opts) {
    this._writeRoute('', opts)
  }

  _onHashChange() {
    // console.log('_onHashChange');
    if (this.__isSaving__) {
      return
    }
    if (this.__isLoading__) {
      console.error('FIXME: router is currently applying a route.')
      return
    }
    this.__isLoading__ = true;
    try {
      let routeString = this.getRouteString()
      let route = this.parseRoute(routeString)
      this.emit('route:changed', route)
    } finally {
      this.__isLoading__ = false
    }
  }

}

Router.objectToRouteString = function(obj) {
  let route = []
  each$1(obj, function(val, key) {
    route.push(key+'='+val)
  })
  return route.join(',')
}

Router.routeStringToObject = function(routeStr) {
  let obj = {};
  // Empty route maps to empty route object
  if (!routeStr) return obj
  let params = routeStr.split(',')
  params.forEach(function(param) {
    let tuple = param.split('=')
    if (tuple.length !== 2) {
      throw new Error('Illegal route.')
    }
    obj[tuple[0].trim()] = tuple[1].trim()
  })
  return obj
}

class TOC extends Component {

  didMount() {
    let tocProvider = this.context.tocProvider
    tocProvider.on('toc:updated', this.onTOCUpdated, this)
  }

  dispose() {
    let tocProvider = this.context.tocProvider
    tocProvider.off(this)
  }

  render($$) {
    let tocProvider = this.context.tocProvider
    let activeEntry = tocProvider.activeEntry
    let ScrollPane = this.getComponent('scroll-pane')

    let tocEntries = $$("div")
      .addClass("se-toc-entries")
      .ref('tocEntries');

    let entries = tocProvider.getEntries()
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i]
      let level = entry.level

      let tocEntryEl = $$('a')
        .addClass('se-toc-entry')
        .addClass('sm-level-'+level)
        .attr({
          href: "#",
          "data-id": entry.id,
        })
        .ref(entry.id)
        .on('click', this.handleClick)
        .append(
          $$(FontAwesomeIcon, {icon: 'fa-caret-right'}),
          entry.name
        );
      if (activeEntry === entry.id) {
        tocEntryEl.addClass("sm-active")
      }
      tocEntries.append(tocEntryEl)
    }

    let el = $$('div').addClass('sc-toc-panel').append(
      $$(ScrollPane).ref('panelEl').append(
        tocEntries
      )
    );
    return el
  }

  getDocument() {
    return this.context.doc
  }

  onTOCUpdated() {
    this.rerender()
  }

  handleClick(e) {
    let nodeId = e.currentTarget.dataset.id
    e.preventDefault()
    this.send('tocEntrySelected', nodeId)
  }

}

var _baseValues = createCommonjsModule(function (module) {
var arrayMap = interopDefault(require$$0$36);

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;
});

var _baseValues$1 = interopDefault(_baseValues);


var require$$1$36 = Object.freeze({
	default: _baseValues$1
});

var values = createCommonjsModule(function (module) {
var baseValues = interopDefault(require$$1$36),
    keys = interopDefault(require$$0$3);

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = values;
});

var values$1 = interopDefault(values);


var require$$0$60 = Object.freeze({
	default: values$1
});

var includes = createCommonjsModule(function (module) {
var baseIndexOf = interopDefault(require$$4$13),
    isArrayLike = interopDefault(require$$3),
    isString = interopDefault(require$$2$5),
    toInteger = interopDefault(require$$1$25),
    values = interopDefault(require$$0$60);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.includes('pebbles', 'eb');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

module.exports = includes;
});

var includes$1 = interopDefault(includes);

/**
  Manages a table of content for a container. Default implementation considers
  all headings as TOC entries. You can extend this implementation and override
  `computeEntries`. Instantiate this class on controller level and pass it to relevant components
  (such as {@link ui/TOCPanel} and {@link ui/ScrollPane}).

  @class TOCProvider
  @component

  @prop {Controller}
 */

class TOCProvider extends EventEmitter {
  constructor(document, config) {
    super(document, config)
    this.document = document
    this.config = config

    this.entries = this.computeEntries()
    if (this.entries.length > 0) {
      this.activeEntry = this.entries[0].id
    } else {
      this.activeEntry = null
    }

    this.document.on('document:changed', this.handleDocumentChange, this)
  }

  dispose() {
    let doc = this.getDocument()
    doc.disconnect(this)
  }

  // Inspects a document change and recomputes the
  // entries if necessary
  handleDocumentChange(change) {
    let doc = this.getDocument()
    let needsUpdate = false
    let tocTypes = this.constructor.tocTypes

    // HACK: this is not totally correct but works.
    // Actually, the TOC should be updated if tocType nodes
    // get inserted or removed from the container, plus any property changes
    // This implementation just checks for changes of the node type
    // not the container, but as we usually create and show in
    // a single transaction this works.
    for (let i = 0; i < change.ops.length; i++) {
      let op = change.ops[i]
      let nodeType
      if (op.isCreate() || op.isDelete()) {
        let nodeData = op.getValue()
        nodeType = nodeData.type
        if (includes$1(tocTypes, nodeType)) {
          needsUpdate = true
          break
        }
      } else {
        let id = op.path[0]
        let node = doc.get(id)
        if (node && includes$1(tocTypes, node.type)) {
          needsUpdate = true
          break
        }
      }
    }
    if (needsUpdate) {
      this.entries = this.computeEntries()
      this.emit('toc:updated')
    }
  }

  computeEntries() {
    let doc = this.getDocument()
    let config = this.config
    let entries = []
    let contentNodes = doc.get(config.containerId).nodes
    each$1(contentNodes, function(nodeId) {
      let node = doc.get(nodeId)
      if (node.type === 'heading') {
        entries.push({
          id: node.id,
          name: node.content,
          level: node.level,
          node: node
        })
      }
    })
    return entries
  }

  getEntries() {
    return this.entries
  }

  getDocument() {
    return this.document
  }

  markActiveEntry(scrollPane) {
    let panelContent = scrollPane.getContentElement()
    let contentHeight = scrollPane.getContentHeight()
    let scrollPaneHeight = scrollPane.getHeight()
    let scrollPos = scrollPane.getScrollPosition()

    let scrollBottom = scrollPos + scrollPaneHeight
    let regularScanline = scrollPos
    let smartScanline = 2 * scrollBottom - contentHeight
    let scanline = Math.max(regularScanline, smartScanline)

    let tocNodes = this.computeEntries()
    if (tocNodes.length === 0) return

    // Use first toc node as default
    let activeEntry = tocNodes[0].id
    for (let i = tocNodes.length - 1; i >= 0; i--) {
      let tocNode = tocNodes[i]
      let nodeEl = panelContent.find('[data-id="'+tocNode.id+'"]')
      if (!nodeEl) {
        console.warn('Not found in Content panel', tocNode.id)
        return
      }
      let panelOffset = scrollPane.getPanelOffsetForElement(nodeEl)
      if (scanline >= panelOffset) {
        activeEntry = tocNode.id
        break
      }
    }

    if (this.activeEntry !== activeEntry) {
      this.activeEntry = activeEntry
      this.emit('toc:updated')
    }
  }
}

TOCProvider.tocTypes = ['heading']

/**
  Manages highlights. Used by {@link ui/ScrollPane}.

  @class

  @param {model/Document} doc document instance

  @example

  ```
  var contentHighlights = new Highlights(doc);
  ```
*/

class Highlights extends EventEmitter {
  constructor(doc) {
    super()

    this.doc = doc
    this._highlights = {}
  }

  /**
    Get currently active highlights.

    @return {Object} Returns current highlights as a scoped object.
  */
  get() {
    return this._highlights
  }

  /**
    Set highlights.

    @param {Object} scoped object describing highlights

    @example

    ```js
      highlights.set({
        'figures': ['figure-1', 'figure-3']
        'citations': ['citation-1', 'citation-5']
      });
    ```
  */
  set(highlights) {
    let oldHighlights = this._highlights
    let doc = this.doc
    // Iterate over scopes of provided highlights
    forEach$1(highlights, function(newScopedHighlights, scope) {
      let oldScopedHighlights = oldHighlights[scope] || []

      // old [1,2,3]  -> new [2,4,5]
      // toBeDeleted: [1,3]
      // toBeAdded:   [4,5]
      let toBeDeleted = without$1(oldScopedHighlights, newScopedHighlights)
      let toBeAdded = without$1(newScopedHighlights, oldScopedHighlights)

      // if (scopedHighlights) {
      forEach$1(toBeDeleted, function(nodeId) {
        let node = doc.get(nodeId)
        // Node could have been deleted in the meanwhile
        if (node) {
          node.setHighlighted(false, scope)
        }
      });

      forEach$1(toBeAdded, function(nodeId) {
        let node = doc.get(nodeId)
        node.setHighlighted(true, scope)
      })
    })

    this._highlights = highlights

    /**
      Emitted when highlights have been updated

      @event ui/Highlights@highlights:updated
    */
    this.emit('highlights:updated', highlights)
  }
}

/*
 * Simple factory implementation.
 *
 * @class Factory
 * @extends Registry
 * @memberof module:util
 */
function Factory() {
  Factory.super.call(this);
}

Factory.Prototype = function() {

  /**
   * Create an instance of the clazz with a given name.
   *
   * @param {String} name
   * @return A new instance.
   * @method create
   * @memberof module:Basics.Factory.prototype
   */
  this.create = function ( name ) {
    var clazz = this.get(name);
    if ( !clazz ) {
      throw new Error( 'No class registered by that name: ' + name );
    }
    // call the clazz providing the remaining arguments
    var args = Array.prototype.slice.call( arguments, 1 );
    var obj = Object.create( clazz.prototype );
    clazz.apply( obj, args );
    return obj;
  };

};

Registry.extend(Factory);

function makeMap(keys) {
  return keys.reduce(function(obj, key) {
    obj[key] = true;
    return obj;
  }, {});
}

// collab

exports.ChangeStore = ChangeStore;
exports.ClientConnection = ClientConnection;
exports.CollabClient = CollabClient;
exports.CollabEngine = CollabEngine;
exports.CollabServer = CollabServer;
exports.CollabSession = CollabSession;
exports.DocumentClient = DocumentClient;
exports.DocumentEngine = DocumentEngine;
exports.DocumentServer = DocumentServer;
exports.DocumentStore = DocumentStore;
exports.SnapshotEngine = SnapshotEngine;
exports.SnapshotStore = SnapshotStore;
exports.WebSocketConnection = WebSocketConnection;
exports.annotationHelpers = annotationHelpers;
exports.Annotation = PropertyAnnotation;
exports.BlockNode = BlockNode;
exports.Container = Container;
exports.ContainerAnnotation = ContainerAnnotation;
exports.Document = Document;
exports.documentHelpers = documentHelpers;
exports.DocumentIndex = NodeIndex;
exports.DocumentNode = DocumentNode;
exports.DocumentSession = DocumentSession;
exports.DOMExporter = DOMExporter;
exports.DOMImporter = DOMImporter;
exports.Fragmenter = Fragmenter;
exports.HTMLExporter = HTMLExporter;
exports.HTMLImporter = HTMLImporter;
exports.InlineNode = InlineNode;
exports.JSONConverter = JSONConverter;
exports.TextBlock = TextBlock;
exports.TextNode = TextNode$2;
exports.Selection = Selection$1;
exports.XMLExporter = XMLExporter;
exports.XMLImporter = XMLImporter;
exports.breakNode = breakNode;
exports.copySelection = copySelection;
exports.createAnnotation = createAnnotation;
exports.deleteCharacter = deleteCharacter;
exports.deleteNode = deleteNode;
exports.deleteSelection = deleteSelection;
exports.expandAnnotation = expandAnnotation;
exports.fuseAnnotation = fuseAnnotation;
exports.insertInlineNode = insertInlineNode;
exports.insertNode = insertNode;
exports.insertText = insertText;
exports.mergeNodes = merge;
exports.pasteContent = paste;
exports.replaceText = replaceText;
exports.switchTextType = switchTextType;
exports.truncateAnnotation = truncateAnnotation;
exports.updateAnnotations = updateAnnotations;
exports.BasePackage = BasePackage;
exports.BlockquotePackage = BlockquotePackage;
exports.CodePackage = CodePackage;
exports.EmphasisPackage = EmphasisPackage;
exports.HeadingPackage = HeadingPackage;
exports.ImagePackage = ImagePackage;
exports.InlineWrapperPackage = InlineWrapperPackage;
exports.ListPackage = ListPackage;
exports.ParagraphPackage = ParagraphPackage;
exports.PersistencePackage = PersistencePackage;
exports.StrongPackage = StrongPackage;
exports.SubscriptPackage = SubscriptPackage;
exports.SuperscriptPackage = SuperscriptPackage;
exports.TablePackage = TablePackage;
exports.SwitchTextTypeTool = SwitchTextTypeTool;
exports.SwitchTextTypeCommand = SwitchTextTypeCommand;
exports.ProseEditorPackage = ProseEditorPackage;
exports.ProseEditor = ProseEditor;
exports.ProseArticle = ProseArticle;
exports.ProseEditorConfigurator = ProseEditorConfigurator;
exports.ProseEditorOverlayTools = ProseEditorOverlayTools;
exports.LinkPackage = LinkPackage;
exports.EditLinkTool = EditLinkTool;
exports.Link = Link;
exports.LinkCommand = LinkCommand;
exports.EditLinkCommand = EditLinkCommand;
exports.LinkComponent = LinkComponent;
exports.InsertInlineNodeCommand = InsertInlineNodeCommand;
exports.EditInlineNodeCommand = EditInlineNodeCommand;
exports.Button = Button;
exports.ScrollPanePackage = ScrollPanePackage;
exports.ScrollPane = ScrollPane;
exports.SplitPanePackage = SplitPanePackage;
exports.SplitPane = SplitPane;
exports.ScrollbarPackage = ScrollbarPackage;
exports.Scrollbar = Scrollbar;
exports.LayoutPackage = LayoutPackage;
exports.Layout = Layout;
exports.GridPackage = GridPackage;
exports.Grid = Grid;
exports.TabbedPanePackage = TabbedPanePackage;
exports.TabbedPane = TabbedPane;
exports.ModalPackage = ModalPackage;
exports.Modal = Modal;
exports.InputPackage = InputPackage;
exports.Input = Input;
exports.ResponsiveApplication = ResponsiveApplication;
exports.ToolDropdown = ToolDropdown;
exports.Tool = Tool;
exports.Toolbar = Toolbar;
exports.ToolGroup = ToolGroup;
exports.AbstractEditor = AbstractEditor;
exports.AnnotationCommand = AnnotationCommand;
exports.AnnotationComponent = AnnotationComponent;
exports.AnnotationTool = AnnotationTool;
exports.Command = Command;
exports.Component = Component;
exports.ContainerEditor = ContainerEditor;
exports.DefaultDOMElement = DefaultDOMElement;
exports.FontAwesomeIcon = FontAwesomeIcon;
exports.RenderingEngine = RenderingEngine;
exports.Router = Router;
exports.TextBlockComponent = TextBlockComponent;
exports.TextPropertyComponent = TextPropertyComponent;
exports.TextPropertyEditor = TextPropertyEditor;
exports.TOC = TOC;
exports.TOCProvider = TOCProvider;
exports.Highlights = Highlights;
exports.ArrayIterator = ArrayIterator;
exports.Configurator = AbstractConfigurator;
exports.EventEmitter = EventEmitter;
exports.Factory = Factory;
exports.inBrowser = inBrowser;
exports.makeMap = makeMap;
exports.keys = keys$2;
exports.oo = oo;
exports.platform = platform;
exports.Registry = Registry;
exports.request = request;
exports.SubstanceError = SubstanceError;
exports.substanceGlobals = substanceGlobals$1;
exports.uuid = uuid$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=./substance.js.map