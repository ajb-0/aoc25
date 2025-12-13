const fs = require("fs");
const { connect } = require("http2");
const { register } = require("module");
const { connected } = require("process");

const file = "test_data.txt"
const txt = fs.readFileSync(file, "utf8")

const data = txt
    .split("\n")
    .map(r => r.split(",").map(Number))
    
function calcEuclidean(a, b) {
    let x_a = a[0]; let y_a = a[1]; let z_a = a[2];
    let x_b = b[0]; let y_b = b[1]; let z_b = b[2];
    return Math.sqrt(
        Math.pow((x_b - x_a), 2) +
        Math.pow((y_b - y_a), 2) +
        Math.pow((z_b - z_a), 2)
    )
}

function calcAllDistances(data) {
    out = []
    console.log(data)
    for (let i=0; i<data.length; i++) {
        let a = data[i]
        for (let j=0; j<data.length; j++) {
            if (i === j) {
                continue
            }
            let b = data[j];
            out.push([a, b, calcEuclidean(a, b)])
        }
    }
    return out;
}

function sortThirdCol(a, b) {
    if (a[2] === b[2]) {
        return 0
    }
    if (a[2] < b[2]) {
        return -1
    }
    if (a[2] > b[2]) {
        return 1
    }
}

// function makeConnections(distances, n) {
//     let n_connections = 0;
//     let connections = []
//     for (let i=0; i<distances.length; i++) {
//         let a = distances[i][0];
//         let b = distances[i][1];
//         if (i===0) {
//             connections.push([distances[i][0], distances[i][1]]);
//             continue
//         }
//         for (let j=0; j<connections.length; j++) {
//             if (connections[j].some())

//         }
//         n_connections++;
//         console.log(n_connections)
//         if (n_connections === n) {
//             return connections;
//         }
//     }
// }


// function solvePart1(data) {
//     let distances = calcAllDistances(data);
//     distances.sort(sortThirdCol);
//     console.log(distances)
// }







console.log(solvePart1(data))


let d = [
  [ [ 162, 817, 812 ], [ 425, 690, 689 ], 316.90219311326956 ],
  [ [ 425, 690, 689 ], [ 162, 817, 812 ], 316.90219311326956 ],
  [ [ 162, 817, 812 ], [ 431, 825, 988 ], 321.560258738545 ],
  [ [ 431, 825, 988 ], [ 162, 817, 812 ], 321.560258738545 ],
  [ [ 906, 360, 560 ], [ 805, 96, 715 ], 322.36935338211043 ],
  [ [ 805, 96, 715 ], [ 906, 360, 560 ], 322.36935338211043 ],
  [ [ 431, 825, 988 ], [ 425, 690, 689 ], 328.11888089532425 ],
  [ [ 425, 690, 689 ], [ 431, 825, 988 ], 328.11888089532425 ],
  [ [ 862, 61, 35 ], [ 984, 92, 344 ], 333.6555109690233 ],
  [ [ 984, 92, 344 ], [ 862, 61, 35 ], 333.6555109690233 ],
  [ [ 52, 470, 668 ], [ 117, 168, 530 ], 338.33858780813046 ],
  [ [ 117, 168, 530 ], [ 52, 470, 668 ], 338.33858780813046 ],
  [ [ 819, 987, 18 ], [ 941, 993, 340 ], 344.3893145845266 ]
]

let c = makeConnections(d, 3)
console.log(c)