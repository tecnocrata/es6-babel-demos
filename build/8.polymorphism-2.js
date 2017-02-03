'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// This will be our common superclass
var Cache = function () {
  function Cache() {
    _classCallCheck(this, Cache);
  }

  _createClass(Cache, [{
    key: 'get',
    value: function get(key, defaultValue) {
      var value = this._doGet(key);
      if (value === undefined || value === null) {
        return defaultValue;
      }

      return value;
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      if (key === undefined || key === null) {
        throw new Error('Invalid argument');
      }

      this._doSet(key, value);
    }

    // Must be overridden
    // _doGet()
    // _doSet()

  }]);

  return Cache;
}();

// Subclasses define no new public methods
// The public interface is defined entirely in the superclass


var ArrayCache = function (_Cache) {
  _inherits(ArrayCache, _Cache);

  function ArrayCache() {
    _classCallCheck(this, ArrayCache);

    return _possibleConstructorReturn(this, (ArrayCache.__proto__ || Object.getPrototypeOf(ArrayCache)).apply(this, arguments));
  }

  _createClass(ArrayCache, [{
    key: '_doGet',
    value: function _doGet() {
      // ...
    }
  }, {
    key: '_doSet',
    value: function _doSet() {
      // ...
    }
  }]);

  return ArrayCache;
}(Cache);

var LocalStorageCache = function (_Cache2) {
  _inherits(LocalStorageCache, _Cache2);

  function LocalStorageCache() {
    _classCallCheck(this, LocalStorageCache);

    return _possibleConstructorReturn(this, (LocalStorageCache.__proto__ || Object.getPrototypeOf(LocalStorageCache)).apply(this, arguments));
  }

  _createClass(LocalStorageCache, [{
    key: '_doGet',
    value: function _doGet() {
      // ...
    }
  }, {
    key: '_doSet',
    value: function _doSet() {
      // ...
    }
  }]);

  return LocalStorageCache;
}(Cache);

// Functions can polymorphically operate on any cache by interacting through the superclass interface


function compute(cache) {
  var cached = cache.get('result');
  if (!cached) {
    var result = // ...
    cache.set('result', result);
  }

  // ...
}

compute(new ArrayCache()); // use array cache through superclass interface
compute(new LocalStorageCache()); // use local storage cache through superclass interface