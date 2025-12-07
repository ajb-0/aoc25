const fs = require("fs")

const file = "test_data.txt"
const txt = fs.readFileSync(file, "utf8")

const data = txt.split("\n")

function atomise(data) {
    return data.map(row => row.split(""))
}

// Nice print
function printGrid(grid) {
    for (let i=0; i<grid.length; i++) {
        console.log(grid[i].join(""))
    }
}

function solvePart1(data) {
    let nSplitters = 0;
    // Init beam:
    let grid = atomise(data);

    for (let r=1; r<grid.length; r++) {
        for (let c=0; c<grid[0].length; c++) {
            if (grid[r-1][c] == "S") {
                grid[r][c] = "|"
            }
            if (grid[r-1][c] === "|" & grid[r][c] === ".") {
                grid[r][c] = "|"
            }
            if (grid[r][c]==="^" & grid[r-1][c]==="|") {
                nSplitters++;
                grid[r][c-1] = "|"
                grid[r][c+1] = "|"
            }
        }
    }
    printGrid(grid)
    console.log(`Number of splitters: ${nSplitters}`)
}

solvePart1(data)


// 1749 too high