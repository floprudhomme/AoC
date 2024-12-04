import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function toArray(content: string): string[][] {
    return content.split("\n").map(x => x.split(""));
}


function part1() {
    function isWordPresent(grid: string[][], i: number, j: number, wordToFind: string, direction: "left"|"right"|"top"|"bottom"|"topleft"|"topright"|"bottomleft"|"bottomright"|"all"): number {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[i].length) {
            return 0;
        }
        if (grid[i][j] !== wordToFind[0]) {
            return 0;
        }
        if (wordToFind.length === 1) {
            return 1;
        }
        let count = 0;
        if (direction === "left" || direction === "all") {
            count += isWordPresent(grid, i, j - 1, wordToFind.slice(1), "left");
        }
        if (direction === "right" || direction === "all") {
            count += isWordPresent(grid, i, j + 1, wordToFind.slice(1), "right");
        }
        if (direction === "top" || direction === "all") {
            count += isWordPresent(grid, i - 1, j, wordToFind.slice(1), "top");
        }
        if (direction === "bottom" || direction === "all") {
            count += isWordPresent(grid, i + 1, j, wordToFind.slice(1), "bottom");
        }
        if (direction === "topleft" || direction === "all") {
            count += isWordPresent(grid, i - 1, j - 1, wordToFind.slice(1), "topleft");
        }
        if (direction === "topright" || direction === "all") {
            count += isWordPresent(grid, i - 1, j + 1, wordToFind.slice(1), "topright");
        }
        if (direction === "bottomleft" || direction === "all") {
            count += isWordPresent(grid, i + 1, j - 1, wordToFind.slice(1), "bottomleft");
        }
        if (direction === "bottomright" || direction === "all") {
            count += isWordPresent(grid, i + 1, j + 1, wordToFind.slice(1), "bottomright");
        }
        return count;
    }

    let grid = toArray(content);
    let wordToFind = "XMAS";
    let nbWord = 0;
    for (let i = 0 ; i < grid.length ; i++) {
        for (let j = 0 ; j < grid[i].length ; j++) {
            nbWord += isWordPresent(grid, i, j, wordToFind, "all");
        }
    }
    return nbWord;
}

function part2() {
    function isCrossPresent(grid: string[][], i: number, j: number): number {
        if (i <= 0 || j <= 0 || i >= grid.length - 1 || j >= grid[i].length - 1) {
            return 0;
        }
        if (grid[i][j] !== "A") {
            return 0;
        }
        if (["MAS","SAM"].includes(grid[i - 1][j-1] + grid[i][j] + grid[i + 1][j + 1]) && ["MAS","SAM"].includes(grid[i - 1][j + 1] + grid[i][j] + grid[i + 1][j - 1])) {
            return 1;
        }
        return 0;
    }

    let grid = toArray(content);
    let nbWord = 0;
    for (let i = 0 ; i < grid.length ; i++) {
        for (let j = 0 ; j < grid[i].length ; j++) {
            nbWord += isCrossPresent(grid, i, j);
        }
    }
    return nbWord;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());