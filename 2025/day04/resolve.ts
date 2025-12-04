import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

let map = content.split("\n").map((line) => line.split(""));
function part1(replace = false): number {
  let total = 0;
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      if (map[x][y] !== "@") {
        continue;
      }
      let nbRolls = 0;
      if (map[x - 1]) {
        if (map[x - 1][y] === "@") {
          nbRolls++;
        }
        if (map[x - 1][y-1] === "@") {
          nbRolls++;
        }
        if (map[x - 1][y+1] === "@") {
          nbRolls++;
        }
      }
      if (map[x + 1]) {
        if (map[x + 1][y] === "@") {
          nbRolls++;
        }
        if (map[x+1][y+1] === "@") {
          nbRolls++;
        }
        if (map[x+1][y-1] === "@") {
          nbRolls++;
        }
      }
      if (map[x][y - 1] === "@") {
        nbRolls++;
      }
      if (map[x][y + 1] === "@") {
        nbRolls++;
      }

      
      if (nbRolls < 4) {
        if (replace) {
          map[x][y] = ".";
        }
        total++;
      }
    }
  }
  if (replace && total > 0) {
    return total + part1(true);
  }
  return total;
}

function part2() {
    return part1(true);
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());