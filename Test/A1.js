function findUniqueElements(a, b) {
    var res = [];

    for (let i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) == -1) {
            res.push(a[i]);
        }
    }

    for (let i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) == -1) {
            res.push(b[i]);
        }
    }

    return res;
}

// test

var a = [1, 2, 'a'],
    b = [1, 3, 'b'];

console.log(findUniqueElements(a, b));