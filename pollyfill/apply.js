Function.prototype.customApply = function (context = {} , args =[]) {
    if (typeof this !== 'function') {
        throw new Error(`${this} is not callable`);
    }
    if (!Array.isArray(args)) {
        throw new TypeError('CreateListFronArrayLike called on non-object')
    }
    context.fn = this;
    context.fn(...args)
    delete context.fn
}

let obj ={
    firstName: 'Leela',
    lastName: 'Sharma'
}

const fullName = function (age, salary) {
    console.log( `My name is ${this.firstName} ${this.lastName} and I am ${age} year's old my salary is ${salary}`)
}

fullName.customApply(obj, [10, 4000]);
