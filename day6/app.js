const fs = require("fs")

const file = "data.txt"
const txt = fs.readFileSync(file, "utf8")
// Parse data
function f(s) {
    return s.split(" ").filter((a) => a != '')
}
let data = txt.split("\n").map(r => f(r))

// Part 1
function solvePart1(data) {
    let revData = data.reverse();
    console.log(revData);    

    let n_row = revData.length;
    let n_col = revData[0].length;

    let res = 0;
    for (let c=0; c<n_col; c++) {
        console.log(`c: ${c}`)
        console.log(`${revData[0][c]}`)
        if (revData[0][c]==='*') {
            let acc = 1;
            for (r=1; r<n_row; r++) {
                acc *= Number(revData[r][c]);
            }
            res += acc;

        } else if (revData[0][c]==='+') {
            let acc = 0;
            for (r=1; r<n_row; r++) {
                acc += Number(revData[r][c]);
            }
            res += acc;
        }
    }
    return res
}
console.log(solvePart1(data))