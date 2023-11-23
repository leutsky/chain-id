var PATH_PROPERTY = '$$id';

function prepareIgnoreKeysOption(ignoreKeys) {
  return (Array.isArray(ignoreKeys) ? ignoreKeys : []).reduce((result, key) => {
    result[key] = true;
    return result;
  }, {});
}

function makePath(path, key, separator) {
  return (path ? path + separator : '') + key;
}

function createId(options) {
  options = options || {};
  var prefix = options.prefix || '';
  var separator = options.separator || '-';
  var ignoredKeys = prepareIgnoreKeysOption(options.ignoreKeys);

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

        if (key in ignoredKeys) {
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

module.exports = {
  createId
};
