Function.prototype.cunstonBind = function (context = {}, ...args) {
    if (typeof this !== "function") {
      throw new Error(`${this} is not callable`);
    }
    context.fn = this;
    return function (...innerArgs) {
        return context.fn(...args, ...innerArgs);
    }
}


let obj = {
  firstName: "Leela",
  lastName: "Sharma",
};

const fullName = function (age, salary) {
  return (
    `My name is ${this.firstName} ${this.lastName} and I am ${age} year's old my salary is ${salary}`
  );
};

const bindResult = fullName.cunstonBind(obj, 25);
console.log(bindResult(7000));
