
const file = Bun.file(import.meta.dir + '/input.txt'); // BunFile
const content = (await file.text()).replaceAll("\r", "");

function getNbVictoryNumber(line: string): number {
    const victoryNumbers = line.split("|")[0].split(":")[1].trim().replaceAll("  ", " ").split(" ");
    const myNumbers = line.split("|")[1].trim().replaceAll("  ", " ").split(" ");
    const nbVictoryNumbers = myNumbers.map(numb => victoryNumbers.indexOf(numb) >= 0).filter(elt => elt).length;
    return nbVictoryNumbers;
}

function part1() {
    let sum = 0;
    for (let line of content.split("\n")) {
        const nbVictoryNumbers = getNbVictoryNumber(line);
        if (nbVictoryNumbers !== 0) {
            sum += Math.pow(2, (nbVictoryNumbers - 1));
        }
    }
    return sum;
}

function part2() {
    type CardsOcc = number[];
    function incrementOcc(cards: CardsOcc, victory: number, id: number): CardsOcc {
        let cardNumber = 0;
        for (let i = 0 ; i < victory ; i++) {
            cards[id + cardNumber++] += cards[id - 1];
        }
        return cards;
    }

    let cards: CardsOcc = [];
    content.split("\n").forEach((elt) => { cards.push(1); });
    for (let line of content.split("\n")) {
        const nbVictoryNumbers = getNbVictoryNumber(line);

        let cardNumber = Number(line.split(":")[0].replace("Card ", ""));
        cards = incrementOcc(cards, nbVictoryNumbers, cardNumber);
    }
    return cards.reduce((a, b) => a + b);
}

console.log("Part 1 : " + part1());
console.log("Part 2 : " + part2());