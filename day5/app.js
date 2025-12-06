const fs = require("fs")

const file = "test_data.txt"
const txt = fs.readFileSync(file, "utf8")

const idRangesTxt = txt.split("\n\n")[0]
const ingredientTxt = txt.split("\n\n")[1]

const idRanges = idRangesTxt
    .split("\n")
    .map(r => {
        lower = r.split("-")[0]
        upper = r.split("-")[1]
        return [BigInt(lower), BigInt(upper)]
    })
// console.log(idRanges)

const ingredients = ingredientTxt
    .split("\n")
    .map(r => {
        return BigInt(r)
    })
// console.log(ingredients)

function isFresh(id, idRanges) {
    for (let i=0; i<idRanges.length; i++) {
        if (id>=idRanges[i][0] & id<=idRanges[i][1]) {
            return true
        }
    }
    return false
}

function solvePart1(ingredients, idRanges) {
    let count = 0;
    for (let i=0; i<ingredients.length; i++) {
        if (isFresh(ingredients[i], idRanges)) {
            count++;
        }
    }
    return count
}
console.log(solvePart1(ingredients, idRanges))

// Part 2:
function solvePart2(idRanges) {
    let res = BigInt(0)
    let sortedRanges = idRanges.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] < b[0] ? -1 : 1;
        if (a[1] !== b[1]) return a[1] < b[1] ? -1 : 1;
        return 0;
    });
    // Initial range: 
    res += (sortedRanges[0][1] - sortedRanges[0][0]) + BigInt(1)
    console.log(sortedRanges[0])
    console.log(`0 | res: ${res}`)
    let prevMax = sortedRanges[0][1];
    for (let i=1; i<sortedRanges.length; i++) {
        console.log(sortedRanges[i])
        if (sortedRanges[i][0]>prevMax) { // No overlap
            res += (sortedRanges[i][1] - sortedRanges[i][0]) + BigInt(1);
            console.log(`${i} | res: ${res} | no overlap`)
            prevMax = sortedRanges[i][1];
        } else if (sortedRanges[i][1] <= prevMax) { // Complete overlap
            console.log(`${i} | res: ${res} | complete overlap`)
            continue;
        } else if (sortedRanges[i][0]<=prevMax & sortedRanges[i][1]>prevMax) { // partial overlap
            res += (sortedRanges[i][1] - prevMax) 
            prevMax = sortedRanges[i][1]
            console.log(`${i} | res: ${res} | partial overlap`)
        }
    }
    return res
}
console.log(solvePart2(idRanges))
