let State = {
  PENDING: "PENDING",
  FULLFILLED: "FULLFILLED",
  REJECTED: "REJECTED",
};

class MyPromise {
    constructor(callBack) {
        this.state = State.PENDING;
        this.handlers = [];
        this.value = undefined
        try {
            callBack(this._resolve, this._reject);
        } catch(err){

        }
    }
    _resolve = (val) => {
        this.updateResult(val, State.FULLFILLED)
    }
    _reject = (val) => {
        this.updateResult(val, State.REJECTED)
    }
    // Then returns again promise because it has promise chain
    then = (onSuccess, onFail) => {

    }
    catch = () => {

    }
    finally = () => {

    }
    updateResult = (val, state) => {
        setTimeout(() => {
          if (this.state !== State.PENDING) {
            return;
          }
          this.state = state;
          this.value = val;
        }, 0);
    }

}

let promise = new MyPromise((resole, reject) => {
})
