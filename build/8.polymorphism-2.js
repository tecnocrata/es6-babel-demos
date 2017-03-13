'use strict';

// This will be our common superclass
class Cache {
  get(key, defaultValue) {
    let value = this._doGet(key);
    if (value === undefined || value === null) {
      return defaultValue;
    }

    return value;
  }

  set(key, value) {
    if (key === undefined || key === null) {
      throw new Error('Invalid argument');
    }

    this._doSet(key, value);
  }

  // Must be overridden
  // _doGet()
  // _doSet()
}

// Subclasses define no new public methods
// The public interface is defined entirely in the superclass
class ArrayCache extends Cache {
  _doGet() {
    // ...
  }

  _doSet() {
    // ...
  }
}

class LocalStorageCache extends Cache {
  _doGet() {
    // ...
  }

  _doSet() {
    // ...
  }
}

// Functions can polymorphically operate on any cache by interacting through the superclass interface
function compute(cache) {
  let cached = cache.get('result');
  if (!cached) {
    let result = // ...
    cache.set('result', result);
  }

  // ...
}

compute(new ArrayCache()); // use array cache through superclass interface
compute(new LocalStorageCache()); // use local storage cache through superclass interface