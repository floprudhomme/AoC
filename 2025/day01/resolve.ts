import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
  const lines = content.split("\n");
  let current = 50;
  let total = 0;
  for (const line of lines) {
    const direction = line[0];
    const change = parseInt(line.slice(1));
    if (direction === "L") {
      current -= change;
    } else if (direction === "R") {
      current += change;
    }
    current = current % 100;
    if (current === 0) {
      total++;
    }
  }
  return total;
}

function part2() {
  let current = 50;
  let total = 0;

  for (const line of content.split("\n")) {
    if (line.startsWith("L")) {
      const change = parseInt(line.slice(1), 10);
      const newPos = current - change;

      let delta = current % 100;
      if (delta === 0) {
        delta = 100;
      }
      if (change >= delta) {
        total += 1 + Math.floor((change - delta) / 100);
      }

      current = sanitize(newPos);
    } else if (line.startsWith("R")) {
      const change = parseInt(line.slice(1), 10);
      const newPos = current + change;

      total += Math.floor((current + change) / 100);

      current = sanitize(newPos);
    }
  }

  return total;

  function sanitize(dial: number): number {
    if (dial < 0) {
      return sanitize(100 + dial);
    } else if (dial > 99) {
      return sanitize(dial - 100);
    }
    return dial;
  }
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());
