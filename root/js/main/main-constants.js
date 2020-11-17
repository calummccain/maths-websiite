function rotatePositions(s) {
    var posDict = {
        "{4,3,4}": [0, -s, 0],
        "{4,3,5}": [0, 0, 0],
        "{4,3,6}": [0, s, 0],
        "{3,5,3}": [s, 0, 0],
        "{3,3,6}": [2 * s, 0, 0],
        "{3,4,4}": [3 * s, 0, 0],
        "{5,3,4}": [4 * s, 0, 0],
        "{5,3,5}": [4 * s, s, 0],
        "{5,3,6}": [4 * s, 2 * s, 0],
        "{6,3,3}": [5 * s, 0, 0],
        "{6,3,4}": [5 * s, s, 0],
        "{6,3,5}": [5 * s, 2 * s, 0]
    };
    return posDict;
}

function translatePositions() {
    var k = 40;
    var posDict = {
        "{4,3,4}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{4,3,5}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{4,3,6}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{3,5,3}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{3,3,6}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{3,4,4}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{5,3,4}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{5,3,5}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{5,3,6}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{6,3,3}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{6,3,4}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)],
        "{6,3,5}": [k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1), k * (Math.random() + 1) * (2 * Math.round(Math.random()) - 1)]
    };
    return posDict;
}

export { rotatePositions, translatePositions };