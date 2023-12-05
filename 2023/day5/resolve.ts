
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

function parseFile() {
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
            for (let seed of line.split(": ")[1].trim().split(" ")) {
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

function part1() {
    parseFile("part1");

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
    parseFile();
    let seeds = content.split("\n")[0].split(": ")[1].split(" ");
    let seedsWithRange: number[][] = [];
    let currentSeedWithRange = [];
    for (let i = 0 ; i < seeds.length ; i++) {
        currentSeedWithRange.push(Number(seeds[i]));
        if (i % 2 === 1) {
            seedsWithRange.push(currentSeedWithRange);
            currentSeedWithRange = [];
        }
    }
    let seedsWithRangeMaxReady = seedsWithRange.map(elt => elt[0] + elt[1] - 1);
    let seedsWithRangeMinReady = seedsWithRange.map(elt => elt[0]);
    let maxValue = Math.max(...(seedsWithRangeMaxReady));
    let minValue = Math.min(...(seedsWithRangeMinReady));

    for (let key in correspondances) {
        for (let range of correspondances[key as keyof Correspondance]) {
            if (range.destinationBase + range.range - 1 > maxValue) {
                maxValue = range.destinationBase + range.range - 1;
            }
            if (range.destinationBase < minValue) {
                minValue = range.destinationBase;
            }
        }
    }

    function getNumberFor(key: keyof Seed, currentNumber: number): number {
        let currentValue: number = currentNumber;
        let returnValue = currentValue;
        for (let correspondance of correspondances[key as SeedCarac]) {
            if (currentValue < correspondance.destinationBase || currentValue >= correspondance.destinationBase + correspondance.range) {
                continue;
            }
            return correspondance.sourceBase + (currentValue - correspondance.destinationBase);
        }
        return returnValue;
    }

    function getSeedValue(valueToAnalyze: number) {
        let currentValue: number = valueToAnalyze;
        let returnValue = currentValue;
        for (let key of Object.keys(correspondances).reverse().slice(1)) {
            returnValue = getNumberFor(key as keyof Seed, returnValue);
        }
        return returnValue;
    }

    function checkSeedExisting(seed: number) {
        for (let range of seedsWithRange) {
            if (seed >= range[0] && seed < range[0] + range[1]) {
                return true;
            }
        }
        return false;
    }

    function getMinLocalisation(minValue: number, maxValue: number) {
        for (let i = minValue ; i < maxValue ; i++) {
            let currentSeed = getSeedValue(i);
            if (checkSeedExisting(currentSeed)) {
                return i;
            }
        }
        return -1;
    }
    
    let minLocalisation = getMinLocalisation(minValue, maxValue);

    return minLocalisation;
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());