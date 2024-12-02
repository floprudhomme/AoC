import fs, { cpSync } from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function checkIsBadLevel(levels: number[], isPart2: boolean, stack: boolean = false): boolean {
  let tendancy: "inc" | "dec" | null = null;
  for (let levelIdx = 0; levelIdx < levels.length - 1; levelIdx++) {
    let level = levels[levelIdx];
    let nextLevel = levels[levelIdx + 1];
    if (
      (nextLevel > level && tendancy === "dec") ||
      (nextLevel < level && tendancy === "inc")
    ) {
        let isBadIdxMinusOne = levelIdx >= 1 ? checkIsBadLevel(levels.toSpliced(levelIdx - 1, 1), true, true) : false;
        let isBadIdx = checkIsBadLevel(levels.toSpliced(levelIdx, 1), true, true);
        let isBadIdxPlusOne = checkIsBadLevel(levels.toSpliced(levelIdx + 1, 1), true, true);
        return isPart2 && !stack ? (isBadIdxMinusOne || isBadIdx || isBadIdxPlusOne) : false;    }
    if (tendancy === null) {
      if (nextLevel > level) {
        tendancy = "inc";
      } else if (nextLevel < level) {
        tendancy = "dec";
      }
    }
    if (Math.abs(nextLevel - level) > 3 || Math.abs(nextLevel - level) < 1) {
        let isBadIdxMinusOne = levelIdx >= 1 ? checkIsBadLevel(levels.toSpliced(levelIdx - 1, 1), true, true) : false;
        let isBadIdx = checkIsBadLevel(levels.toSpliced(levelIdx, 1), true, true);
        let isBadIdxPlusOne = checkIsBadLevel(levels.toSpliced(levelIdx + 1, 1), true, true);
        return isPart2 && !stack ? (isBadIdxMinusOne || isBadIdx || isBadIdxPlusOne) : false;
    }
  }
  return true;
}

function part1(isPart2: boolean = false) {
  let nbSafe = 0;
  let levelsList = content.split("\n").map(elt => elt.split(" ").map((level) => parseInt(level)));
  for (let levels of levelsList) {
    if (checkIsBadLevel(levels, isPart2)) {
      nbSafe++;
    } else {
    }
  }
  return nbSafe;
}

function part2() {
  return part1(true);
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
