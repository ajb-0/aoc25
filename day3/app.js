const fs = require("fs");

const file = "data.txt";
const txt = fs.readFileSync(file, "utf8");
const data = txt.split("\n")

// Part 1
function findIndexLargest(arr, start_idx, stop_idx) {
    // Return index of largest number between start_idx and stop_idx.
    let max = arr[start_idx];
    let idx = start_idx;
    for (let i=start_idx; i<=stop_idx; i++) {
        // console.log(`idx: ${idx} | max: ${max} | arr[i]: ${arr[i]}`)
        if (arr[i]>max) {
            max = arr[i];
            idx = i;
        }
    }
    return idx;
}

function getMaxJoltage(s) {
    let ns = s // s to array of numbers/digits
        .split("")
        .map(x => Number(x))
    a = findIndexLargest(ns, 0, ns.length-2)
    b = findIndexLargest(ns, a+1, ns.length-1)
    // console.log(`a: ${a} | b: ${b}`)
    return Number(s[a])*10 + Number(s[b])
}

function solvePart1(data) {
    let res = 0;
    data.map(r => {res += getMaxJoltage(r)});
    return res
}
console.log(solvePart1(data))

// Part 2
function calculateStopIndex(digit_idx, n_banks, n_required) {
    // Given an array of length n_banks, find the index that 
    // we must stop at when searching for the a'th digit in
    // order to be able to form a number of length n_required.
    return n_banks - n_required + digit_idx;
}

function getMaxJoltageN(s, n) {
    // s: string like "987654321111111"
    // n: number of digits required
    let ns = s // s to array of numbers/digits
        .split("")
        .map(x => Number(x))
    let arr = [];
    start_idx = 0;
    for (let i=0; i<n; i++) {
        stop_idx = calculateStopIndex(i, s.length, n);
        idx = findIndexLargest(ns, start_idx, stop_idx);
        arr.push(s[idx]);
        start_idx = idx+1;
    }
    return Number(arr.join(""));
}

function solvePart2(data) {
    let res = 0;
    data.map(r => {res += getMaxJoltageN(r, 12)});
    return res
}
console.log(solvePart2(data))