import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1(nbMax = 2) {
    const banks = content.split("\n");
    let total = 0;
    for (let bank of banks) {
      const digits = [];
      let maxIdx = 0;
      for (let max = 0 ; max < nbMax ; max++) {
        let currentMaxDigit = 0;
        for (let i = maxIdx; i < bank.length - nbMax + max + 1 ; i++) {
          if (parseInt(bank[i]) > currentMaxDigit) {
            currentMaxDigit = parseInt(bank[i]);
            maxIdx = i + 1;
          }
        }
        digits.push(currentMaxDigit);
      }
      
      total += parseInt(digits.join(""));
    }
    return total;
}

function part2() {
    return part1(12);
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());