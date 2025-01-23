Array.prototype.customReduce = function (cb, initialVal) {
    let acc = initialVal;
    for (let i = 0; i < this.length; i++) {
        acc = acc ? cb(acc, this[i], i, this) : this[i]
    }
    return acc
};

const arr = [1, 2, 3, 4, 5, 6];

const reduceArray = arr.customReduce((acc, curr, idx, arr) => {
  return acc+curr;
}, 0);
console.log(reduceArray);
