const fs = require("fs")

const file = "test_data.txt"
const data = fs.readFileSync(file, "utf8")

function atomise(txt) {
    let out = [];
    let inner = []
    for (i=0; i<txt.length; i++) {
        if (txt[i]=="\n") {
            out.push(inner);
            inner = []
            continue
        }
        inner.push(txt[i])
    }
    return out
}

function allEmpty(array) {
    for (let i=0; i<array.length; i++) {
        if (array[i] != ' ') {
            return false;
        }
    }
    return true;
} 

function scanColwise(array) {
    let out = []
    let collect = []
    for (j=0; j<array[0].length; j++) {
        console.log(j);
        console.log(array.map(row => row[j]));
        let colSlice = array.map(row => row[j]);
        if (allEmpty(colSlice)) {
            out.push(collect)
            collect = []
        }
        collect.push(colSlice)
    }
    return out
}

function solveBlock(array) {
    console.log(array)
    // Get slice - last column
    let lastColSlice = array.map(row => row[array[0].length-1])
    // Find operator: 
    let operator;
    for (let i=0; i<lastColSlice.length; i++) {
        if (lastColSlice[i] != ' ') {
            operator = lastColSlice[i];
        }
    }
    // Do the math
    if (operator==='*') {
        let res = 1;
        for (let i=0; i<array.length; i++) {
            if (allEmpty(array[i])) {
                res *= 1
                continue
            }
            let n = Number(array[i].join("").replace("*", ""))
            console.log(`n: ${n}`)
            res *= n;
        }
        return res;

    } else if (operator==='+') {
        let res = 0;
        for (let i=0; i<array.length; i++) {
            let n = Number(array[i].join("").replace("+", ""))
            console.log(`n: ${n}`)
            res += n
        }
        return res;
    }
}

function solvePart2(data) {
    atomisedData = atomise(data);
    let blocks = scanColwise(atomisedData)
    console.log(blocks)
    let res = 0;
    for (let i=0; i<blocks.length; i++) {
        let blockRes = solveBlock(blocks[i]);
        console.log(`block: ${i} | ${blockRes}`);
        res += blockRes;
    }
    return res
}
console.log(solvePart2(data))
