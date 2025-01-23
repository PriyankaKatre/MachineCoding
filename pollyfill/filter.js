Array.prototype.customFilter = function (cb) {
    let tempArr = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            tempArr.push(this[i]);
        }
    }
    return tempArr;
}


const arr = [1, 2, 3, 4, 5, 6]

const filtredArray = arr.customFilter((val) => {
    return val > 3
})

