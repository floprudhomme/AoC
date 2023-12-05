
const file = Bun.file(import.meta.dir + '/input.txt'); // BunFile
const content = (await file.text()).replaceAll("\r", "");

type Seed = {
    seed: number;
    soil: number;
    fertilizer: number;
    water: number;
    light: number;
    temperature: number;
    humidity: number;
    location: number;
}

type SeedCarac = "soil" | "fertilizer" | "water" | "light" | "temperature" | "humidity" | "location";

type Correspondance = {
    [x in SeedCarac]: {
        destinationBase: number;
        sourceBase: number;
        range: number;
    }[];
};

let mySeeds: Seed[] = [];
let correspondances: Correspondance = {
    soil: [],
    fertilizer: [],
    water: [],
    light: [],
    temperature: [],
    humidity: [],
    location: []
};

function parseFile(part: string) {
    correspondances = {
        soil: [],
        fertilizer: [],
        water: [],
        light: [],
        temperature: [],
        humidity: [],
        location: []
    };

    mySeeds = [];

    let currentMap = "";
    for (let line of content.split("\n")) {
        if (line.indexOf("seeds") >= 0) {
            let i = 0;
            let baseSeed = -1;
            for (let seed of line.split(": ")[1].trim().split(" ")) {
                if (part === "part1") {
                    let currentSeed: Seed = {
                        seed: Number(seed),
                        soil: -1,
                        fertilizer: -1,
                        water: -1,
                        light: -1,
                        temperature: -1,
                        humidity: -1,
                        location: -1
                    }
                    mySeeds.push(currentSeed);
                } else {
                    if ((i++ % 2) === 0) {
                        baseSeed = Number(seed);
                    } else {
                        for (let j = 0 ; j < Number(seed) ; j++) {
                            let currentSeed: Seed = {
                                seed: Number(baseSeed + j),
                                soil: -1,
                                fertilizer: -1,
                                water: -1,
                                light: -1,
                                temperature: -1,
                                humidity: -1,
                                location: -1
                            }
                            mySeeds.push(currentSeed);
                        }
                    }
                }
            }
        } else if (line.indexOf("-to-soil") >= 0) {
            currentMap = "soil";
        } else if (line.indexOf("-to-fertilizer") >= 0) {
            currentMap = "fertilizer";
        } else if (line.indexOf("-to-water") >= 0) {
            currentMap = "water";
        } else if (line.indexOf("-to-light") >= 0) {
            currentMap = "light";
        } else if (line.indexOf("-to-temperature") >= 0) {
            currentMap = "temperature";
        } else if (line.indexOf("-to-humidity") >= 0) {
            currentMap = "humidity";
        } else if (line.indexOf("-to-location") >= 0) {
            currentMap = "location";
        } else if(line.length === 0) {
          continue;
        } else {
            let values = line.split(" ");
            let currentCorrespondance = {
                destinationBase: Number(values[0]),
                sourceBase: Number(values[1]),
                range: Number(values[2])
            }
            correspondances[currentMap as SeedCarac].push(currentCorrespondance);
        }
    }
}

function getNumberFor(key: keyof Seed, oldKey: keyof Seed, currentSeed: Seed): number {
    let currentValue: number = currentSeed[oldKey];
    let returnValue = currentValue;
    for (let correspondance of correspondances[key as SeedCarac]) {
        if (currentValue < correspondance.sourceBase || currentValue >= correspondance.sourceBase + correspondance.range) {
            continue;
        }
        return correspondance.destinationBase + (currentValue - correspondance.sourceBase);
    }
    return returnValue;
}

function part1() {
    for (let seed of mySeeds) {
        let oldKey: keyof Seed = "seed";
        for (let key in seed) {
            let typedKey = key as keyof Seed;
            if (typedKey !== "seed") {
                seed[typedKey] = getNumberFor(typedKey, oldKey, seed);
            }
            oldKey = typedKey;
        }
    }

    return mySeeds.map(elt => elt.location).sort((a, b) => b - a).reverse()[0];
}

function part2() {
    return part1();
}

parseFile("part1");
console.log("Part 1 : " + part1());
// parseFile("part2");
// console.log("Part 2 : " + part2());