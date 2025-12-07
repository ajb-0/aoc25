const fs = require("fs")

const file = "test_data.txt"
const txt = fs.readFileSync(file, "utf8")

const data = txt.split("\n")

// Nice print
for (let i=0; i<data.length; i++) {
    console.log(data[i])
}

function findStartCol(array) {
    let topRow = array[0];
    for (let i=0; i<topRow.length; i++) {
        if (topRow[i] === "S") {
            return i;
        }
    }
}
console.log(findStartCol(data))





// 1749 too high