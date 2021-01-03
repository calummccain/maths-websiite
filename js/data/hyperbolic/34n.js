// Order n octahedral

import * as ORDER4 from "./344.js";

const vertices = [
    [1, 1, 0, 0],
    [1, -1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, -1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, -1]
];

const faces = [
    [0, 2, 4],
    [0, 5, 2],
    [0, 4, 3],
    [0, 3, 5],
    [1, 4, 2],
    [1, 2, 5],
    [1, 3, 4],
    [1, 5, 3]
];

function a(v) {

    return [v[0], v[2], v[1], v[3]];

}

function b(v) {

    return [v[0], v[1], v[3], v[2]];

}

function c(v) {

    return [v[0], v[1], v[2], -v[3]];

}

//fev
function d(n, v) {

    var newVector = [];

    if (n == 4) {

        newVector = ORDER4.d(v);

    } else {

        var cos = Math.cos(Math.PI / n) ** 2;

        newVector = [
            (6 * cos - 1) * v[0] + (2 - 6 * cos) * v[1] + (2 - 6 * cos) * v[2] + (2 - 6 * cos) * v[3],
            2 * cos * v[0] + (1 - 2 * cos) * v[1] - 2 * cos * v[2] - 2 * cos * v[3],
            2 * cos * v[0] - 2 * cos * v[1] + (1 - 2 * cos) * v[2] - 2 * cos * v[3],
            2 * cos * v[0] - 2 * cos * v[1] - 2 * cos * v[2] + (1 - 2 * cos) * v[3]
        ];

    }

    return newVector;

}

// var matrix = [
//     [6 * cos - 1, 2 - 6 * cos, 2 - 6 * cos, 2 - 6 * cos],
//     [2 * cos, 1 - 2 * cos, -2 * cos, -2 * cos],
//     [2 * cos, -2 * cos, 1 - 2 * cos, -2 * cos],
//     [2 * cos, -2 * cos, -2 * cos, 1 - 2 * cos]
// ];

// const e = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function e(v) {

    return [v[0], v[1], v[2], v[3]];

}

function f(n, v) {

    var newVector = [];

    if (n == 4) {

        newVector = v;

    } else {

        var cot = 1 / (Math.tan(Math.PI / n) ** 2);

        newVector = [
            Math.sqrt(Math.abs(cot / (1 - cot))) * v[0],
            Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot))) * v[1],
            Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot))) * v[2],
            Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot))) * v[3]
        ];

    }

    return newVector;

}

// matrix = [
//     [Math.sqrt(Math.abs(cot / (1 - cot))), 0, 0, 0],
//     [0, Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot))), 0, 0],
//     [0, 0, Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot))), 0],
//     [0, 0, 0, Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot)))]
// ];

function matrixDict(n, letter, vector) {
    var newVector;
    switch (letter) {
        case 'a':
            newVector = a(vector);
            break;
        case 'b':
            newVector = b(vector);
            break;
        case 'c':
            newVector = c(vector);
            break;
        case 'd':
            newVector = d(n, vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(n, vector);
            break;
    }
    return newVector;
};

const faceReflections = ['', 'c', 'bc', 'cbc', 'abc', 'cabc', 'bcabc', 'cbcabc'];

function center(n) {

    var newCenter = [];

    if (n == 4) {

        newCenter = ORDER4.center;

    } else {

        var cot = 1 / (Math.tan(Math.PI / n) ** 2);

        newCenter = [1 / Math.sqrt(Math.abs(cot / (1 - cot))), 0, 0, 0]
    }

    return newCenter;

}

export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };