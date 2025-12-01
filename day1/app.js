const { dir } = require("console");
const fs = require("fs");

const file = "data.txt";
const txt = fs.readFileSync(file, "utf8");
lines = txt.split("\n");

let dial = 50;

// 'Real' modulo...
mod = (a, n) => (a % n + n) % n;

function get_direction(s) {
    return s.substring(0, 1)
}

function spin(curr_loc, s) {
    // Take the current dial location, spin it according to s.
    // Return new location
    direction = get_direction(s)
    magnitude = Number(s.substring(1))
    if (direction=="R") {
        console.log(`Moving ${magnitude} right`)
        return mod(curr_loc + magnitude, 100)
    } else {
        console.log(`Moving ${magnitude} left`)
        return mod(curr_loc - magnitude, 100)
    }
}

// Part 1
let counter_part1 = 0;
for (let i=0; i<lines.length; i++) {
    dial = spin(dial, lines[i])
    console.log(dial)
    if (dial==0) {
        counter_part1++
    }
}
console.log(`Result: ${counter_part1}`)
console.log("\n")

// Part 2
function count_clicks_pt2(curr_loc, s) {
    start_loc = curr_loc
    console.log(s)
    direction = get_direction(s)
    magnitude = Number(s.substring(1))
    let new_loc;
    if (direction=="R") {
        new_loc = mod((curr_loc+magnitude), 100)
    }
    if (direction=="L") {
        new_loc = mod((curr_loc-magnitude), 100)
    }
    // Brute force:
    let n_clicks = 0;
    if (direction=="R") {
        for (let i=0; i<magnitude; i++) {
            if (mod(curr_loc+i, 100) == 0) {
                n_clicks++
            }
        }
    } else {
        for (let i=0; i<magnitude; i++) {
            if (mod(curr_loc-i, 100) == 0) {
                n_clicks++
            }
        }
    }
    return [n_clicks, new_loc]
}

// Part 2:
dial = 50;
console.log(`Dial reset to ${dial}`)
let counter_part2 = 0;
for (let i=0; i<lines.length; i++) {
    r = count_clicks_pt2(dial, lines[i])
    counter_part2 += r[0] 
    dial = r[1]
    console.log(`Dial now at ${r[1]} | Clicked ${r[0]} times`)
}
console.log(`Result: ${counter_part2}`)
