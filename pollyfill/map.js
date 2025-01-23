Array.prototype.customMap = function (cb) {
    let temparr = [];
    for (let i = 0; i < this.length; i++) {
        temparr.push(cb(this[i], i, this))
    }
    return temparr
}

let arr = [1, 2, 3, 4, 5, 6]

const newArr = arr.customMap((val, idx, arr) => {
    return val*2
})

console.log(newArr);
