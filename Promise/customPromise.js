const STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

class CustomPromise {
  constructor(callback) {
    this.state = STATE.PENDING;
    this.handlers = [];
    this.value = undefined;

    try {
      callback(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve = (value) => {
    this.updateResult(value, STATE.FULFILLED);
  };

  _reject = (value) => {
    this.updateResult(value, STATE.REJECTED);
  };

  then(onSuccess, onFail) {
    return new CustomPromise((res, rej) => {
      this.addHandler({
        onSuccess: function (value) {
          if (!onSuccess) {
            return res(value);
          }
          try {
            return res(onSuccess(value));
          } catch (err) {
            return rej(err);
          }
        },
        onFail: function (value) {
          if (!onFail) {
            return rej(value);
          }
          try {
            return res(onFail(value));
          } catch (err) {
            return rej(err);
          }
        },
      });
    });
  }

  catch(onFail) {
    return this.then(null, onFail);
  }

  updateResult(value, state) {
    setTimeout(() => {
      if (this.state !== STATE.PENDING) return;

      this.value = value;
      this.state = state;

      this.executeHandlers();
    }, 0);
  }

  addHandler(handler) {
    this.handlers.push(handler);
    this.executeHandlers();
  }

  executeHandlers() {
    if (this.state === STATE.PENDING) return;

    this.handlers.forEach((handler) => {
      if (this.state === STATE.FULFILLED) {
        return handler.onSuccess(this.value);
      }
      return handler.onFail(this.value);
    });
    this.handlers = [];
  }

  static all(promises) {
    return new CustomPromise((resolve, reject) => {
      let resolvedCount = 0;
      const results = [];

      promises.forEach((promise, index) => {
        CustomPromise.resolve(promise).then(
          (value) => {
            resolvedCount++;
            results[index] = value;
            if (resolvedCount === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static allSettled(promises) {
    return new CustomPromise((resolve) => {
      let settledCount = 0;
      const results = [];

      promises.forEach((promise, index) => {
        CustomPromise.resolve(promise).then(
          (value) => {
            results[index] = { status: "fulfilled", value };
            settledCount++;
            if (settledCount === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            results[index] = { status: "rejected", reason };
            settledCount++;
            if (settledCount === promises.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  static race(promises) {
    return new CustomPromise((resolve, reject) => {
      promises.forEach((promise) => {
        CustomPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  static any(promises) {
    return new CustomPromise((resolve, reject) => {
      let rejectedCount = 0;
      const errors = [];

      promises.forEach((promise, index) => {
        CustomPromise.resolve(promise).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            rejectedCount++;
            errors[index] = reason;
            if (rejectedCount === promises.length) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          }
        );
      });
    });
  }

  static resolve(value) {
    if (value instanceof CustomPromise) {
      return value;
    }
    return new CustomPromise((resolve) => resolve(value));
  }
}


const promise1 = new CustomPromise((resolve) =>
  setTimeout(() => resolve("Promise 1"), 1000)
);
const promise2 = new CustomPromise((resolve, reject) =>
  setTimeout(() => reject("Promise 2"), 2000)
);
const promise3 = new CustomPromise((resolve) =>
  setTimeout(() => resolve("Promise 3"), 3000)
);

// Using CustomPromise.all
//Resolves: When all promises in the array resolve, Promise.all resolves with an array of the resolved values.
//Rejects: If any promise in the array rejects, Promise.all rejects with the reason of the first promise that rejects.

CustomPromise.all([promise1, promise2, promise3]).then(
  (values) => {
    console.log("All:", values);
  },
  (error) => {
    console.error("All Error:", error);
  }
);

// Using CustomPromise.allSettled
//Resolves: When all promises in the array have settled (either fulfilled or rejected).
CustomPromise.allSettled([promise1, promise2, promise3]).then((results) => {
  console.log("AllSettled:", results);
});

// Using CustomPromise.race
//Promise.race returns a promise that resolves or rejects as soon as one of the promises in the array resolves or rejects
CustomPromise.race([promise1, promise2, promise3]).then(
  (value) => {
    console.log("Race:", value);
  },
  (error) => {
    console.error("Race Error:", error);
  }
);

// Using CustomPromise.any
// CustomPromise.any returns a promise that resolves as soon as one of the promises in the array resolves successfully . If all of the promises reject, it returns a promise that rejects with an AggregateError
CustomPromise.any([promise1, promise2, promise3]).then(
  (value) => {
    console.log("Any:", value);
  },
  (error) => {
    console.error("Any Error:", error);
  }
);
