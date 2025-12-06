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
    // Get slice - last column
    let lastColSlice = array.map(row => row[array[0].length-1])
    console.log(lastColSlice)
    // Find operator: 
    let operator;
    for (let i=0; i<lastColSlice.length; i++) {
        if (lastColSlice[i] != ' ') {
            operator = lastColSlice[i];
        }
    }
    console.log(operator)
    //
    
    if (operator==='*') {

    } else if (operator==='+') {

    }
}

function solvePart2(data) {
    atomisedData = atomise(data);
    let blocks = scanColwise(atomisedData)
    console.log(blocks)
    console.log(solveBlock(blocks[0]))
}


console.log(solvePart2(data))


// let a = atomise(data)
// for (let i = 0; i< a.length; i++) {
//     console.log(a[i].length)
// }
