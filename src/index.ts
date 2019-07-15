// Check utils
const isInteger = (n?: number) => typeof n === 'number' && Number.isInteger(n);
const isFunction = (f: Function) => typeof f === 'function';

// Parsing functions
const parseDelay = (delay: number) => {
  if (!isInteger(delay)) throw new TypeError('delay must be a valid Integer');
  return { delay: Number(delay) };
};

const parseAction = (action: Function) => {
  if (!isFunction(action)) throw new TypeError('action must be a valid function');
  return { action };
};

const parseCallback = (callback: Function) => {
  if (!isFunction(callback)) throw new TypeError('callback must be a valid function');
  return { callback };
};

const parseLimit = (limit?: number) => {
  if (!isInteger(limit) && (limit !== undefined)) throw new TypeError('limit must be a valid positive integer');
  return { limit: limit === undefined ? undefined : limit };
};

// Helpers
function timeout(delay: number) {
  return new Promise((resolve) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      resolve();
    }, delay);
  });
}

const calcLimits = (limit?: number) => (limit ? {
  newLimit: limit - 1,
  stopByLimit: (limit - 1) <= 0,
} : {
  newLimit: undefined,
  stopByLimit: false,
});

// Config
const generateConfig = (delay: number, action: Function, callback: Function, limit?: number) => ({
  ...parseDelay(delay),
  ...parseAction(action),
  ...parseCallback(callback),
  ...parseLimit(limit),
});


const periodicPromise = function periodicPromise(
  delay: number,
  action: Function,
  callback: Function,
  limit?: number,
) {
  try {
    const config = generateConfig(delay, action, callback, limit);

    const actionHandler = () => new Promise(async (resolve, reject) => {
      resolve(await action());
      reject(TypeError);
    });

    return new Promise(async (resolve, reject) => {
      const actionResult = await actionHandler();
      const stopByCallback = !callback(actionResult);
      const { stopByLimit, newLimit } = calcLimits(config.limit);

      if (stopByCallback || stopByLimit) {
        resolve(actionResult);
        reject(TypeError);
      } else {
        await timeout(config.delay);
        resolve(await periodicPromise(
          config.delay,
          config.action,
          config.callback,
          newLimit,
        ));
      }
    });
  } catch (e) {
    return new Promise((resolve, reject) => reject(e));
  }
};

export default periodicPromise;
