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

const shapeLinks = {
    "{4,3,4}": "./individual/434.html",
    "{4,3,5}": "./individual/435.html",
    "{4,3,6}": "./individual/436.html",
    "{3,5,3}": "./individual/353.html",
    "{3,3,6}": "./individual/336.html",
    "{3,4,4}": "./individual/344.html",
    "{5,3,4}": "./individual/534.html",
    "{5,3,5}": "./individual/535.html",
    "{5,3,6}": "./individual/536.html",
    "{6,3,3}": "./individual/633.html",
    "{6,3,4}": "./individual/634.html",
    "{6,3,5}": "./individual/635.html"
}


export { rotatePositions, shapeLinks };