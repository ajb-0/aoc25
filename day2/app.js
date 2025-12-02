const fs = require("fs");

const file = "data.txt";
const txt = fs.readFileSync(file, "utf8");
const spl = txt.split(",");

// Create array of 'ranges', eg '11-12'
let ranges = [];
for (let i=0; i<spl.length; i++) {
    ranges.push(spl[i]);
}

// Create array of productIds
let product_ids = [];
for (let i=0; i<ranges.length; i++) {
    let splitRange = ranges[i].split("-");
    let start = Number(splitRange[0]);
    let stop = Number(splitRange[1]);
    console.log(start);
    console.log(stop);
    console.log("\n")
    for (let j=start; j<=stop; j++) {
        product_ids.push(j);
    }
}
console.log(`Length of product_ids array: ${product_ids.length}`)

// Part 1 //
// Iterate over product_ids
let res = 0;
for (let i=0; i<product_ids.length; i++) {
    let e = product_ids[i].toString();
    let e_len = e.length;
    if (e_len % 2 == 0) {
        let first_half = e.substring(0, e_len/2);
        let second_half = e.substring(e_len/2);
        if (first_half == second_half) {
            // console.log(`Invalid ID found: ${e}`)
            res += Number(e);
        }
    }
}
console.log(res);

// Part 2 //
function has_repeatable_substring(s) {
    for (let i=0; i<s.length; i++) {
        // Take increasingly large substring and try repeating it until it
        let subs = s.substring(0, i);
        for (let j=0; j<=s.length; j++) {
            let r = subs.repeat(j);
            // console.log(r);
            if (subs.repeat(j) == s) {
                // console.log(`Substring: ${subs}`)
                return true;
            }
        }
    }
    return false;
}
// Iterate over product_ids: 
let res2 = 0;
for (let i=0; i<product_ids.length; i++) {
    if (has_repeatable_substring(product_ids[i].toString())) {
        res2 += product_ids[i];
    }
}
console.log(res2);
