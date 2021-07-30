var PATH_PROPERTY = '$$id';

function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

function prepareKeysBlacklistOption(blacklist) {
  var blacklist = Array.isArray(blacklist) ? blacklist : [];
  return blacklist.reduce((result, key) => {
    result[key] = true;
    return result;
  }, {});
}

function canConcatLeafValue(target) {
  return (typeof target === 'string' && target !== '') || typeof target === 'number';
}

function makePath(path, key, separator) {
  return (path ? path + separator : '') + key;
}

function createId(options) {
  options = options || {};
  var prefix = options.prefix || '';
  var separator = options.separator || '-';
  var keysBlacklist = prepareKeysBlacklistOption(options.keysBlacklist);

  function createProxy(obj, path) {
    Object.defineProperty(obj, PATH_PROPERTY, {
      value: path,
      writable: false,
      enumerable: true,
    });

    return new Proxy(obj, {
      get(target, key) {
        if (key === Symbol.toPrimitive || key === 'toString') {
          return function () {
            return path;
          }
        }

        if (typeof key === 'symbol') {
          return undefined;
        }

        if (key in keysBlacklist) {
          return undefined;
        }

        if (key in target) {
          return target[key];
        }

        var nextPath = makePath(path, key, separator);
        target[key] = createProxy({}, nextPath);

        return target[key];
      }
    });
  }

  return createProxy({}, prefix);
}

function attachPath(target, path) {
  var getPath = function () {
    return path;
  };

  Object.defineProperties(target, {
    [PATH_PROPERTY]: {
      value: path,
      writable: false,
      enumerable: true,
    },
    toString: {
      value: getPath,
      writable: false,
      enumerable: false,
    },
    [Symbol.toPrimitive]: {
      value: getPath,
      writable: false,
      enumerable: false,
    }
  });
}

function createIdFromScheme(sourceScheme, options) {
  options = options || {};
  var prefix = options.prefix || '';
  var separator = options.separator || '-';

  function prepare(result, scheme, path) {
    for (const key in scheme) {
      var nextPath, pathPart;
      if (isObject(scheme[key])) {
        nextPath = makePath(path, key, separator);
        result[key] = prepare({}, scheme[key], nextPath);
      } else {
        pathPart = canConcatLeafValue(scheme[key]) ? key + separator + String(scheme[key]) : key;
        nextPath = makePath(path, pathPart, separator);
        result[key] = {};
      }

      attachPath(result[key], nextPath);
    }

    return result;
  }

  return prepare({}, sourceScheme, prefix);
}

var REACT_KEYS_BLACKLIST = ['$$typeof'];

module.exports = {
  REACT_KEYS_BLACKLIST,
  createId,
  createIdFromScheme
};
