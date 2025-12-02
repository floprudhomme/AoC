import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    const plages = content.split(",");
    let total = 0;
    for (let plage of plages) {
      let [start, end] = plage.split("-");
      for (let i = parseInt(start); i <= parseInt(end); i++) {
        const strI = "" + i;
        if (strI.length % 2 === 0)  {
          const firstHalf = strI.slice(0, strI.length / 2);
          const secondHalf = strI.slice(strI.length / 2);
          if (firstHalf === secondHalf) {
            total += i;
          }
        }
      }
    }
    return total;
}

function part2() {
    const plages = content.split(",");
    let total = 0;
    for (let plage of plages) {
      let [start, end] = plage.split("-");
      for (let i = parseInt(start); i <= parseInt(end); i++) {
        const strI = "" + i;
        
        const maxPatternLength = Math.floor(strI.length / 2);
        for (let i = 1 ; i <= maxPatternLength; i++) {
          const pattern = strI.slice(0, i);
          const repeated = pattern.repeat(Math.floor(strI.length / i)).slice(0, strI.length);
          if (repeated === strI) {
            total += parseInt(strI);
            break;
          }
        }
      }
    }
    return total;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());