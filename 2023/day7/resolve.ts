import fs from "fs";

const content = (await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
})).replaceAll("\r", "");

type Card = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A";

type Hand = {
    cards: Card[],
    bid: number,
    power: number
}

const power = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

function getHandTypePower(hand: Hand, isPart2: boolean = false): number {
    let cardOcc: {
        [x: string]: number
    } = {};
    for (let card of hand.cards) {
        if (cardOcc[card] == undefined) {
            cardOcc[card] = 0;
        }
        cardOcc[card]++;
    }

    if (isPart2) {
        let numberOfJ = cardOcc["J"];
        if (numberOfJ !== 5 && numberOfJ > 0) {
            delete cardOcc["J"];
            cardOcc[Object.keys(cardOcc).reduce(function(a, b){ return cardOcc[a] > cardOcc[b] ? a : b })] += numberOfJ;
        }
    }

    let listOcc = Object.keys(cardOcc).map(elt => cardOcc[elt]);
    if (listOcc.indexOf(5) >= 0) {
        return 7;
    } else if (listOcc.indexOf(4) >= 0) {
        return 6;
    } else if (listOcc.indexOf(3) >= 0) {
        if (listOcc.indexOf(2) >= 0) {
            return 5;
        }
        return 4;
        
    } else if (listOcc.indexOf(2) >= 0) {
        if (listOcc.indexOf(2) !== listOcc.lastIndexOf(2)) {
            return 3;
        }
        return 2;
    } else {
        return 1;
    }
}

function compareCards(cardsA: Card[], cardsB: Card[]): number {
    for (let i = 0 ; i < cardsA.length ; i++) {
        if (power[cardsA[i]] > power[cardsB[i]]) {
            return 1
        } else if (power[cardsA[i]] < power[cardsB[i]]) {
            return -1;
        }
    }

    return 0;
}

function part1(isPart2: boolean = false) {
    let hands: Hand[] = [];
    for (let line of content.split("\n")) {
        let currentHand: Hand = {
            cards: (line.split(" ")[0].split("") as Card[]),
            bid: Number(line.split(" ")[1]),
            power: -1
        }
        hands.push(currentHand);
    }
    for (let hand of hands) {
        hand.power = getHandTypePower(hand, isPart2);
    }

    hands.sort((a, b) => {
        if (a.power == b.power) {
            return compareCards(a.cards, b.cards);
        } else if (a.power > b.power) {
            return 1;
        } else if (a.power < b.power) {
            return -1;
        }
        return 0;
    })
    let sum = 0;
    for (let i in hands) {
        sum += (Number(i) + 1) * hands[i].bid;
    }

    return sum;
}

function part2() {
    power["J"] = 1;
    return part1(true);
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());

