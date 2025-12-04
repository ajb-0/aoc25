const fs = require("fs")

const file = "test_data.txt"
const txt = fs.readFileSync(file, "utf8")

const floorPlan = txt
    .split("\n")
    .map(r => r.split(""))

function checkValidCoordinate(floorPlan, rowIdx, colIdx) {
    if (rowIdx<0) {
        return false
    }
    if (rowIdx>floorPlan.length-1) { 
        return false
    }
    if (colIdx<0) {
        return false
    }
    if (colIdx>floorPlan[0].length-1) { 
        return false
    }
    return true
}

function countSurrounding(floorPlan, rowIdx, colIdx) {
    let count = 0;
    let m = {
        "n": [-1, 0], 
        "ne": [-1, 1],
        "e": [0, 1], 
        "se": [1, 1], 
        "s": [1, 0], 
        "sw": [1, -1],
        "w": [0, -1], 
        "nw": [-1, -1]
    };
    for (let k in m) {
        if (checkValidCoordinate(floorPlan, rowIdx+m[k][0], colIdx+m[k][1])) {
            if (floorPlan[rowIdx+m[k][0]][colIdx+m[k][1]]==="@") { 
                count++
            }
        }
    }
    return count
}

function solvePart1(floorPlan) {
    let count = 0;
    for (r=0; r<floorPlan.length; r++) {
        for (c=0; c<floorPlan[0].length; c++) {
            if (floorPlan[r][c]==="@") {
                nSurroundingRools = countSurrounding(floorPlan, r, c)
                if (nSurroundingRools < 4) {
                    count++
                }
            }
        }
    }
    return count;
}
console.log(solvePart1(floorPlan))

// Part 2: 
let mutableFloorPlan = structuredClone(floorPlan);

function findRemovable(floorPlan) {
    // Pass over floorPlan, returning array of coordinates for rolls that can be removed
    let removable = []
    for (r=0; r<floorPlan.length; r++) {
        for (c=0; c<floorPlan[0].length; c++) {
            if (floorPlan[r][c]==="@") {
                nSurroundingRools = countSurrounding(floorPlan, r, c)
                if (nSurroundingRools < 4) {
                    removable.push([r, c])
                }
            }
        }
    }
    return removable
}

function removeRolls(floorPlan, removable) {
    for (let i=0; i<removable.length; i++) {
        floorPlan[removable[i][0]][removable[i][1]] = "."
    }
}

function solvePart2(floorPlan) {
    let count = 0;
    let a = true;
    while (a) {
        let removable = findRemovable(floorPlan)
        if (removable.length === 0) {
            a = false;
            continue
        }
        count += removable.length
        removeRolls(floorPlan, removable)
    }
    return count;
}
console.log(solvePart2(mutableFloorPlan))
