interface Coords {
    x: number;
    y: number;
}

interface NumberAndIndex {
    value: string;
    coords: Coords;
}

enum direction {
    TOPLEFT,
    TOP,
    TOPRIGHT,
    RIGHT,
    BOTTOMRIGHT,
    BOTTOM,
    BOTTOMLEFT,
    LEFT
}

import fs from "fs";

const content = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});
const board = content.split("\n").map(elt => elt.split(""));
const numbersAndIndex: NumberAndIndex[] = [];

function getNumbersAndIndex() {
    let lineIndex = 0;
    for (let line of content.split("\n")) {
        var ptrn = /[0-9]+/mg;
    
        var match;
        while ((match = ptrn.exec(line)) != null) {
           numbersAndIndex.push({value: match.toString(), coords: {x: match.index, y: lineIndex}});
        }

        lineIndex++;
    }
}

function part1() { 
    function checkSymbolInPlace(coords: Coords): boolean {
        var ptrn = /[^0-9.]/mg;
        
        var match = ptrn.exec(board[coords.y][coords.x]);
        
        return match !== null;
    }
    
    function currentNumberNearSymbol(coords: Coords): boolean {
        let whereSearch: direction[] = [direction.TOPLEFT, direction.TOP, direction.TOPRIGHT, direction.RIGHT, direction.BOTTOMRIGHT, direction.BOTTOM, direction.BOTTOMLEFT, direction.LEFT];
        if (coords.x === 0) {
            if (whereSearch.includes(direction.LEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.LEFT), 1);
            }
            if (whereSearch.includes(direction.TOPLEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOPLEFT), 1);
            }
            if (whereSearch.includes(direction.BOTTOMLEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOMLEFT), 1);
            }
        }
        if (coords.y === 0) {
            if (whereSearch.includes(direction.TOP)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOP), 1);
            }
            if (whereSearch.includes(direction.TOPLEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOPLEFT), 1);
            }
            if (whereSearch.includes(direction.TOPRIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOPRIGHT), 1);
            }
        }
        if (coords.x === board[0].length - 1) {
            if (whereSearch.includes(direction.TOPRIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOPRIGHT), 1);
            }
            if (whereSearch.includes(direction.RIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.RIGHT), 1);
            }
            if (whereSearch.includes(direction.BOTTOMRIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOMRIGHT), 1);
            }
        }
        if (coords.y === board.length - 1) {
            if (whereSearch.includes(direction.BOTTOMLEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOMLEFT), 1);
            }
            if (whereSearch.includes(direction.BOTTOM)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOM), 1);
            }
            if (whereSearch.includes(direction.BOTTOMRIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOMRIGHT), 1);
            }
        }
        for (let dir of whereSearch) {
            switch(dir) {
                case direction.TOPLEFT:
                    if (checkSymbolInPlace({x: coords.x - 1, y: coords.y - 1})) {
                        return true;
                    }
                    break;
                    
                    case direction.TOP:
                    if (checkSymbolInPlace({x: coords.x, y: coords.y - 1})) {
                        return true;
                    }
                    break;
    
                case direction.TOPRIGHT:
                    if (checkSymbolInPlace({x: coords.x + 1, y: coords.y - 1})) {
                        return true;
                    }
                    break;
    
                case direction.RIGHT:
                    if (checkSymbolInPlace({x: coords.x + 1, y: coords.y})) {
                        return true;
                    }
                    break;
    
                case direction.BOTTOMRIGHT:
                    if (checkSymbolInPlace({x: coords.x + 1, y: coords.y + 1})) {
                        return true;
                    }
                    break;
    
                case direction.BOTTOM:
                    if (checkSymbolInPlace({x: coords.x, y: coords.y + 1})) {
                        return true;
                    }
                    break;
    
                case direction.BOTTOMLEFT:
                    if (checkSymbolInPlace({x: coords.x - 1, y: coords.y + 1})) {
                        return true;
                    }
                    break;
    
                case direction.LEFT:
                    if (checkSymbolInPlace({x: coords.x - 1, y: coords.y})) {
                        return true;
                    }
                    break;
            }
        }
    
        return false;
    }
    
    function eltIsPart(currentElt: NumberAndIndex, stack = 0): boolean {
        if (stack === currentElt.value.length) {
            return false;
        }
        if (currentNumberNearSymbol({x: currentElt.coords.x + stack, y: currentElt.coords.y})) {
            return true;
        }
    
        return eltIsPart(currentElt, ++stack);
    }

    let sum = 0;
    for (let elt of numbersAndIndex) {
        if (eltIsPart(elt)) {
            sum += Number(elt.value);
        }
    }
    return sum;
}

function part2() { 
    const gearTable: {
        [x: number]: {
            [y: number]: number[]
        }
    } = {};

    function checkSymbolInPlace(currentValue: number, coords: Coords): boolean {
        var ptrn = /[*]/mg;
        
        var match = ptrn.exec(board[coords.y][coords.x]);
        if (match !== null) {
            if (gearTable[coords.x] == undefined) {
                gearTable[coords.x] = {};
            }
            if (gearTable[coords.x][coords.y] == undefined) {
                gearTable[coords.x][coords.y] = [];
            }
            gearTable[coords.x][coords.y].push(currentValue);
        }
        return match !== null;
    }
    
    function currentNumberNearSymbol(currentElt: number, coords: Coords): boolean {
        let whereSearch: direction[] = [direction.TOPLEFT, direction.TOP, direction.TOPRIGHT, direction.RIGHT, direction.BOTTOMRIGHT, direction.BOTTOM, direction.BOTTOMLEFT, direction.LEFT];
        if (coords.x === 0) {
            if (whereSearch.includes(direction.LEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.LEFT), 1);
            }
            if (whereSearch.includes(direction.TOPLEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOPLEFT), 1);
            }
            if (whereSearch.includes(direction.BOTTOMLEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOMLEFT), 1);
            }
        }
        if (coords.y === 0) {
            if (whereSearch.includes(direction.TOP)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOP), 1);
            }
            if (whereSearch.includes(direction.TOPLEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOPLEFT), 1);
            }
            if (whereSearch.includes(direction.TOPRIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOPRIGHT), 1);
            }
        }
        if (coords.x === board[0].length - 1) {
            if (whereSearch.includes(direction.TOPRIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.TOPRIGHT), 1);
            }
            if (whereSearch.includes(direction.RIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.RIGHT), 1);
            }
            if (whereSearch.includes(direction.BOTTOMRIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOMRIGHT), 1);
            }
        }
        if (coords.y === board.length - 1) {
            if (whereSearch.includes(direction.BOTTOMLEFT)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOMLEFT), 1);
            }
            if (whereSearch.includes(direction.BOTTOM)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOM), 1);
            }
            if (whereSearch.includes(direction.BOTTOMRIGHT)) {
                whereSearch.splice(whereSearch.indexOf(direction.BOTTOMRIGHT), 1);
            }
        }
        for (let dir of whereSearch) {
            switch(dir) {
                case direction.TOPLEFT:
                    if (checkSymbolInPlace(currentElt, {x: coords.x - 1, y: coords.y - 1})) {
                        return true;
                    }
                    break;
                    
                    case direction.TOP:
                    if (checkSymbolInPlace(currentElt, {x: coords.x, y: coords.y - 1})) {
                        return true;
                    }
                    break;
    
                case direction.TOPRIGHT:
                    if (checkSymbolInPlace(currentElt, {x: coords.x + 1, y: coords.y - 1})) {
                        return true;
                    }
                    break;
    
                case direction.RIGHT:
                    if (checkSymbolInPlace(currentElt, {x: coords.x + 1, y: coords.y})) {
                        return true;
                    }
                    break;
    
                case direction.BOTTOMRIGHT:
                    if (checkSymbolInPlace(currentElt, {x: coords.x + 1, y: coords.y + 1})) {
                        return true;
                    }
                    break;
    
                case direction.BOTTOM:
                    if (checkSymbolInPlace(currentElt, {x: coords.x, y: coords.y + 1})) {
                        return true;
                    }
                    break;
    
                case direction.BOTTOMLEFT:
                    if (checkSymbolInPlace(currentElt, {x: coords.x - 1, y: coords.y + 1})) {
                        return true;
                    }
                    break;
    
                case direction.LEFT:
                    if (checkSymbolInPlace(currentElt, {x: coords.x - 1, y: coords.y})) {
                        return true;
                    }
                    break;
            }
        }
    
        return false;
    }
    
    function eltIsPart(currentElt: NumberAndIndex, stack = 0): boolean {
        if (stack === currentElt.value.length) {
            return false;
        }
        if (currentNumberNearSymbol(Number(currentElt.value), {x: currentElt.coords.x + stack, y: currentElt.coords.y})) {
            return true;
        }
    
        return eltIsPart(currentElt, ++stack);
    }

    let sum = 0;
    for (let elt of numbersAndIndex) {
        eltIsPart(elt)
    }
    for (let x in gearTable) {
        for (let y in gearTable[x]) {
            if (gearTable[x][y].length === 2) {
                sum += gearTable[x][y][0] * gearTable[x][y][1];
            }
        }
    }
    return sum;
}
getNumbersAndIndex();
console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2())