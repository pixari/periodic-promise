import periodicPromise from '../index';

const aFunction = () => {};
const aCallback = (c: any) => c;

describe('periodicPromise', () => {
  describe('arguments', () => {
    it('throws an error if the argument "delay" is not an integer', async () => {
      await expect(periodicPromise('foo', aFunction, aCallback, 10)).rejects.toThrow(TypeError);
    });
    it('throws an error if the second argument is not a valid function', async () => {
      await expect(periodicPromise(100, '', aCallback)).rejects.toThrow(TypeError);
    });

    it('throws an error if the third argument is not a valid callback', async () => {
      await expect(periodicPromise(100, aFunction, '')).rejects.toThrow(TypeError);
    });
  });

  describe('return', () => {
    it('returns a Promise', async () => {
      expect(periodicPromise(10, aFunction, aCallback)).toBeInstanceOf(Promise);
    });
  });
  describe('logic', () => {
    it('has been stopped by the callback after 5 executions', async (done) => {
      const fnCallback = jest.fn();
      const fnAction = jest.fn();
      let executions = 0;

      const action = () => {
        fnAction();
        executions += 1;
        return executions;
      };

      const callback = (v: any) => {
        fnCallback();
        return v < 5;
      };

      periodicPromise(1, action, callback).then(() => {
        expect(fnCallback).toHaveBeenCalledTimes(5);
        expect(fnAction).toHaveBeenCalledTimes(5);
        done();
      });
    });

    it('executes 3 times and then stopped by the execution limit', async (done) => {
      const fnCallback = jest.fn();
      const fnAction = jest.fn();
      const executionTimes = 3;
      const action = () => {
        fnAction();
        return true;
      };

      const callback = () => {
        fnCallback();
        return true;
      };

      periodicPromise(1, action, callback, executionTimes).then(() => {
        expect(fnCallback).toHaveBeenCalledTimes(executionTimes);
        expect(fnAction).toHaveBeenCalledTimes(executionTimes);
        done();
      });
    });

    it('calls set timeout twice with 10ms when provided a 10ms delay', (done) => {
      expect.assertions(3);

      const callback = jest.fn().mockName('callback').mockReturnValue(true);
      const action = jest.fn().mockName('action').mockReturnValue(true);
      const setTimeoutfn = jest.spyOn(global, 'setTimeout');

      const executionTimes = 3;

      periodicPromise(10, action, callback, executionTimes).then(() => {
        expect(callback).toBeCalledTimes(3);
        expect(setTimeoutfn).toHaveBeenNthCalledWith(1, expect.any(Function), 10);
        expect(setTimeoutfn).toHaveBeenNthCalledWith(2, expect.any(Function), 10);
        done();
      });
    });
  });
});
