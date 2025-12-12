const fs = require("fs");
const { cloneElement } = require("react");

const file = "test_data.txt"
const txt = fs.readFileSync(file, "utf8")

const data = txt
    .split("\n")
    .map(r => r.split(",").map(Number))
    
function calcEuclidean(a, b) {
    let x_a = a[0];
    let y_a = a[1];
    let z_a = a[2];
    let x_b = b[0];
    let y_b = b[1];
    let z_b = b[2];
    return Math.sqrt(
        Math.pow((x_b - x_a), 2) +
        Math.pow((y_b - y_a), 2) +
        Math.pow((z_b - z_a), 2)
    )
}

// Make 10 shortest connections
function shortestConnection(idx, data) {
    let shortest = 0;
    let retIdx = 0;
    for (let i=0; i<data.length; i++) {
        if (i===idx) {
            continue
        }
        let dist = calcEuclidean(data[idx], data[i]);
        if (shortest === 0) {
            shortest = dist;
        } else if (dist < shortest) {
            shortest = dist;
            retIdx = i;
        }
        // console.log(`${data[idx]} | ${i} | ${data[i]} | dist: ${dist} | shortest: ${shortest} | retIdx: ${retIdx}`)
    }
    return [shortest, idx, retIdx];
}

// console.log(shortestConnection(0, data))

function getAllDistances(data) {
    let out = []
    for (let i=0; i<data.length; i++) {
        out.push(shortestConnection(i, data))
    }
    return out;
}
let distanceData = getAllDistances(data);

function sortByFirstCol(a, b) {
    if (a[0] === b[0]) {
        return 0;
    } else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function sortDistances(data) {
    data.sort(sortByFirstCol)
}
sortDistances(distanceData)
console.log(distanceData)

function removeDupes(data) {
  const seen = new Set();
  const out = [];

  for (const [dist, a, b] of data) {
    const key1 = `${a}-${b}`;
    const key2 = `${b}-${a}`;

    if (!seen.has(key1) && !seen.has(key2)) {
      seen.add(key1);
      out.push([dist, a, b]);
    }
  }

  return out;
}
let dupesRemoved = removeDupes(distanceData);

function getTen(dataDupesRemoved) {
    return dataDupesRemoved.slice(0, 10);
}

let firstTen = getTen(dupesRemoved);
console.log(firstTen);
