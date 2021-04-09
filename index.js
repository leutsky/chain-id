function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

function isStringOrNumber(target) {
  return typeof target === 'string' || typeof target === 'number';
}

function makePath(path, key, separator) {
  return (path ? path + separator : '') + key;
}

function createId(options) {
  options = options || {};
  var prefix = options.prefix || '';
  var separator = options.separator || '-';

  function createProxy(obj, path) {
    return new Proxy(obj, {
      get(target, key) {
        if (key === Symbol.toPrimitive || key === 'toString') {
          return function () {
            return path;
          }
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
    toString: {
      value: getPath,
      writable: false,
      enumerable: false,
      configurable: false
    },
    [Symbol.toPrimitive]: {
      value: getPath,
      writable: false,
      enumerable: false,
      configurable: false
    }
  });
}

function enrich(target, options) {
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
        pathPart = isStringOrNumber(scheme[key]) ? key + separator + String(scheme[key]) : key;
        nextPath = makePath(path, pathPart, separator);
        result[key] = {};
      }

      attachPath(result[key], nextPath);
    }

    return result;
  }

  return prepare({}, target, prefix);
}

module.exports = {
  createId,
  enrich
};
