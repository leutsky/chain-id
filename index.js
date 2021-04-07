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

        var nextPath = (path ? path + separator : '') + key;
        target[key] = createProxy({}, nextPath);

        return target[key];
      }
    });
  }

  return createProxy({}, prefix);
}

module.exports = {
  createId,
};
