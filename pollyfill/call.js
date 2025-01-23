Function.prototype.customCall = function (context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new Error(`${this} is not callable`)
    }
    context.fn = this;
    context.fn(...args)
}


let obj ={
    firstName: 'Leela',
    lastName: 'Sharma'
}

const fullName = function (age, salary) {
    console.log( `My name is ${this.firstName} ${this.lastName} and I am ${age} year's old my salary is ${salary}`)
}

fullName.customCall(obj, 20, 5000);


