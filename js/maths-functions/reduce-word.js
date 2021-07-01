// ========================================================
// Reduces a word given the coxeter group's presentation
//
// Inputs: word, p, q, r
// Output: reduced word
//
// Change history:
//     30/06/21 Initial commit
//=========================================================

function reduceWord(word, p, q, r) {

    var done = false;
    var w1 = word;
    var w2 = word;

    var reduced = [
        ["aa", ""],
        ["bb", ""],
        ["cc", ""],
        ["dd", ""],
        ["aca", "c"],
        ["cac", "a"],
        ["ada", "d"],
        ["dad", "a"],
        ["bdb", "d"],
        ["dbd", "b"],
        ["ab".repeat(Math.ceil(p / 2)) + ((p % 2 == 1) ? "" : "a"), "ba".repeat(Math.ceil(p / 2) - 1) + ((p % 2 == 1) ? "" : "b")],
        ["ba".repeat(Math.ceil(p / 2)) + ((p % 2 == 1) ? "" : "b"), "ab".repeat(Math.ceil(p / 2) - 1) + ((p % 2 == 1) ? "" : "a")],
        ["bc".repeat(Math.ceil(q / 2)) + ((q % 2 == 1) ? "" : "b"), "cb".repeat(Math.ceil(q / 2) - 1) + ((q % 2 == 1) ? "" : "c")],
        ["cb".repeat(Math.ceil(q / 2)) + ((q % 2 == 1) ? "" : "c"), "bc".repeat(Math.ceil(q / 2) - 1) + ((q % 2 == 1) ? "" : "b")],
        ["cd".repeat(Math.ceil(r / 2)) + ((r % 2 == 1) ? "" : "c"), "dc".repeat(Math.ceil(r / 2) - 1) + ((r % 2 == 1) ? "" : "d")],
        ["dc".repeat(Math.ceil(r / 2)) + ((r % 2 == 1) ? "" : "d"), "cd".repeat(Math.ceil(r / 2) - 1) + ((r % 2 == 1) ? "" : "c")]
    ];

    while (!done) {

        w2 = partialReduce(w1, reduced);

        if (w1 === w2) {

            done = true;

        }

        w1 = w2;
        continue;

    }

    return w1;

}

function partialReduce(newWord, reduced) {

    for (var i = 0; i < 16; i++) {

        if (newWord.includes(reduced[i][0])) {

            newWord = newWord.replace(reduced[i][0], reduced[i][1]);

        }

    }

    return newWord;

}

export { reduceWord };