import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
    encoding: "utf-8",
})).replaceAll("\r", "");

function part1() {

    function findSymetry(bloc: string[][]): number {
        let j = 0;
        for (let i = 0 ; i < bloc[0].length - 1 ; i++) {
            if (bloc[j][i] === bloc[j][i + 1]) {
                // console.log("line ", j, " :  column ", i, " is equal to column ", i + 1 , " (", bloc[j][i],bloc[j][i + 1],")");
                let isSymetric = true;
                while (j < bloc.length) {
                    if (bloc[j][i] !== bloc[j][i + 1]) {
                        isSymetric = false;
                    }
                    j++;
                }
                if (isSymetric) {
                    for (let y = 0 ; y < bloc.length ; y++) {
                        for (let left = i, right = i + 1 ; left >= 0 && right < bloc[y].length ; left--, right++) {
                            if (bloc[y][left] !== bloc[y][right]) {
                                isSymetric = false;
                            }
                        }
                    }
                    if (isSymetric) {
                        return i + 1;
                    }
                }
                j = 0;
            }
        }
        return 0;
    }
    let sum = 0;
    let blocs = content.split("\n\n").map(elt => elt.split("\n").map(elt2 => elt2.split("")));

    for (let currentBloc of blocs) {
        sum += findSymetry(currentBloc);
        sum += findSymetry(currentBloc[0].map((_, colIndex) => currentBloc.map(row => row[colIndex]))) * 100;
    }
    return sum;
}

console.log("Part 1 : " + part1());

