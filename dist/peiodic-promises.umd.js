(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['periodc-promises'] = factory());
}(this, function () { 'use strict';

  // Utils
  const isInteger = n => typeof n === 'number' && Number.isInteger(n);
  const isFunction = f => typeof f === 'function';

  const parseDelay = function parseDelay(delay) {
    if (!isInteger(delay)) throw new TypeError('delay must be a valid Integer');
    return { delay: Number(delay) };
  };

  const parseAction = function parseAction(action) {
    if (!isFunction(action)) throw new TypeError('action must be a valid function');
    return { action };
  };

  const parseCallback = function parseCallback(callback) {
    if (!isFunction(callback)) throw new TypeError('callback must be a valid function');
    return { callback };
  };

  const parseLimit = function parseLimit(limit) {
    if (!isInteger(limit) && (limit !== null)) throw new TypeError('casdasd');
    let limitValue = limit;
    if (limit === null) {
      limitValue = false;
    }
    return { limit: limitValue };
  };

  const timeout = function timeout(delay) {
    return new Promise((resolve) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        resolve();
      }, delay);
    });
  };

  const periodicPromise = function periodicPromise(delay, action, callback, limit = null) {
    let config = {};

    try {
      config = {
        ...parseDelay(delay),
        ...parseAction(action),
        ...parseCallback(callback),
        ...parseLimit(limit),
      };

      const handler = function handler() {
        return new Promise(async (resolve, reject) => {
          resolve(await action());
          reject(TypeError);
        });
      };

      return new Promise(async (resolve, reject) => {
        const actionResult = await handler();
        const stopByCallback = !callback(actionResult);

        let stopByLimit;
        let newLimit;
        if (config.limit) {
          newLimit = config.limit - 1;
          stopByLimit = newLimit <= 0;
        } else {
          stopByLimit = false;
          newLimit = null;
        }

        if (stopByCallback || stopByLimit) {
          resolve(actionResult);
          reject(TypeError);
        } else {
          await timeout(config.delay);
          resolve(await periodicPromise(config.delay, config.action, config.callback, newLimit));
        }
      });
    } catch (e) {
      return new Promise((resolve, reject) => reject(e));
    }
  };

  return periodicPromise;

}));
