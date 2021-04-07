function createId1() {
  function createProxy(target = {}, path) {
    return new Proxy(target, {
      get(target, p, receiver) {
        if (p === 'toString' || p === Symbol.toPrimitive) {
          return () => path.join('.');
        }

        const nextPath = [...path, p];

        return createProxy(target, nextPath);
      }
    });
  }

  return createProxy({}, []);
}

function createId1p() {
  function createProxy(target = {}, path) {
    return new Proxy(target, {
      get(target, p, receiver) {
        if (p === 'toString' || p === Symbol.toPrimitive) {
          return () => 'asd';
        }

        return createProxy(target, path);
      }
    });
  }

  return createProxy({}, []);
}

function createId2() {
  let queue = [];
  const simpleObject = {};
  const slaveProxy = new Proxy(simpleObject, {
    get(target, p, receiver) {
      if (p === 'toString' || p === Symbol.toPrimitive) {
        return (hint) => {
          return queue.join('.');
        };
      }

      queue.push(p);
      return slaveProxy;
    },
  });

  return new Proxy(simpleObject, {
    get(target, p, receiver) {
      queue = [p];
      return slaveProxy;
    }
  });
}

function createId2p() {
  const simpleObject = {};
  const slaveProxy = new Proxy(simpleObject, {
    get(target, p, receiver) {
      if (p === 'toString' || p === Symbol.toPrimitive) {
        return (hint) => {
          return 'str';
        };
      }

      return slaveProxy;
    },
  });

  return new Proxy(simpleObject, {
    get(target, p, receiver) {
      return slaveProxy;
    }
  });
}

function createId3() {
  function createProxy(target = {}, path) {
    return new Proxy(target, {
      get(target, p, receiver) {
        if (p === 'toString' || p === Symbol.toPrimitive) {
          return () => path;
        }

        const nextPath = `${path}.${p}`;

        return createProxy(target, nextPath);
      }
    });
  }

  return createProxy({}, '');
}

function createId4() {
  function createProxy(target = {}, path) {
    return new Proxy(target, {
      get(target, p, receiver) {
        if (p === 'toString' || p === Symbol.toPrimitive) {
          return () => path;
        }

        if (p in target) {
          return target[p];
        }

        const nextPath = `${path}.${p}`;
        target[p] = createProxy({}, nextPath);

        return target[p];
      }
    });
  }

  return createProxy({}, '');
}

let id1 = createId1();
let id1p = createId1p();
let id2 = createId2();
let id2p = createId2p();
let id3 = createId3();
let id4 = createId4();

function runTest(name, fn, n = 1e5) {
  const startTime = performance.now();
  for (let i = 0; i < n; i++) {
    fn();
  }
  console.log(name, n * 1000 / (performance.now() - startTime));
}

function runTests() {
  // runTest('id1 ', () => `${id1.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id1p', () => `${id1p.asd.asd.asd.asd.asd}`, 1e6);
  //
  // runTest('id2 ', () => `${id2.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id2a', () => `${id2.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id2b', () => `${id2.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id2c', () => {
  //   const a = id2.asd.asd.asd.asd.asd;
  //   const r1 = `${a.asd.asd.asd.asd.asd}`;
  //   const r2 = `${a.asd.asd.asd.asd.asd}`;
  // }, 1e6);
  // runTest('id2p', () => `${id2p.asd.asd.asd.asd.asd}`, 1e6);

  // runTest('id3 ', () => `${id3.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id3a', () => `${id3.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id3b', () => `${id3.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id3c', () => {
  //   const a = id3.asd.asd.asd.asd.asd;
  //   const r1 = `${a.asd.asd.asd.asd.asd}`;
  //   const r2 = `${a.asd.asd.asd.asd.asd}`;
  // }, 1e6);
  runTest('id3-1', () => `${id3.asd}`, 1e6);
  runTest('id3-2', () => `${id3.asd.asd}`, 1e6);
  runTest('id3-3', () => `${id3.asd.asd.asd}`, 1e6);
  runTest('id3-4', () => `${id3.asd.asd.asd.asd}`, 1e6);
  runTest('id3-5', () => `${id3.asd.asd.asd.asd.asd}`, 1e6);

  // runTest('id4 ', () => `${id4.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id4a', () => `${id4.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id4b', () => `${id4.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd.asd}`, 1e6);
  // runTest('id4c', () => {
  //   const a = id4.asd.asd.asd.asd.asd;
  //   const r1 = `${a.asd.asd.asd.asd.asd}`;
  //   const r2 = `${a.asd.asd.asd.asd.asd}`;
  // }, 1e6);
  runTest('id4-1', () => `${id4.asd}`, 1e6);
  runTest('id4-2', () => `${id4.asd.asd}`, 1e6);
  runTest('id4-3', () => `${id4.asd.asd.asd}`, 1e6);
  runTest('id4-4', () => `${id4.asd.asd.asd.asd}`, 1e6);
  runTest('id4-5', () => `${id4.asd.asd.asd.asd.asd}`, 1e6);


  // let i = 0;
  //
  // runTest('id3a', () => {
  //   i++;
  //   return id3[i][i][i][i][i][i];
  // });
  // i = 0;
  // runTest('id3a', () => {
  //   i++;
  //   return id3[i][i][i][i][i][i];
  // });
  //
  // i = 0;
  // runTest('id4', () => {
  //   i++;
  //   return id4[i][i][i][i][i][i];
  // });
  // i = 0;
  // runTest('id4a', () => {
  //   i++;
  //   return id4[i][i][i][i][i][i];
  // });
}