import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function part1() {
    function findGuardPosition() {
        for (let x = 0 ; x < map.length ; x++) {
            for (let y = 0 ; y < map[x].length ; y++) {
                if ("^>v<".includes(map[x][y])) {
                    return [x, y];
                }
            }
        }
        return [-1, -1];
    }

    function rotateGuard() {
        let direction = "^>v<";
        let guard = map[guardX][guardY];
        let index = direction.indexOf(guard);
        let nextDirection = direction[(index + 1) % direction.length];
        map[guardX][guardY] = nextDirection;
    }

    function moveGuard() {
        let guard = map[guardX][guardY];

        let nextX = guardX;
        let nextY = guardY;
        
        if (guard === "^") {
            nextX--;
        } else if (guard === ">") {
            nextY++;
        } else if (guard === "v") {
            nextX++;
        } else if (guard === "<") {
            nextY--;
        }

        if (nextX < 0 || nextX >= map.length || nextY < 0 || nextY >= map[nextX].length) {
            map[guardX][guardY] = "X";
            return;
        }
        
        if (map[nextX][nextY] === "#") {
            rotateGuard();
            moveGuard();
            return;
        }
        map[guardX][guardY] = "X";
        map[nextX][nextY] = guard;
        guardX = nextX;
        guardY = nextY;
        moveGuard();
        return;
    }

    let map = content.split("\n").map((line) => line.split(""));
    let [guardX, guardY] = findGuardPosition();
    moveGuard();
    let count = 0;
    for (let i = 0 ; i < map.length ; i++) {
        for (let j = 0 ; j < map[i].length ; j++) {
            if (map[i][j] === "X") {
                count++;;
            }
        }
    }
    return count;
}

function part2() {
    return 0;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());