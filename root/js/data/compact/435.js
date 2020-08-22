// Order 5 cubic (compact)

import { p } from "../constants.js";

const faceType = "square";

const typeOfHoneycomb = "compact";

const vertices = [
    [1, 1, 1, 1],
    [1, 1, -1, 1],
    [1, -1, -1, 1],
    [1, -1, 1, 1],
    [1, 1, 1, -1],
    [1, 1, -1, -1],
    [1, -1, -1, -1],
    [1, -1, 1, -1]
];

const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [7, 6],
    [6, 5],
    [5, 4],
    [4, 7],
    [4, 0],
    [5, 1],
    [6, 2],
    [7, 3]
];

const faces = [
    [0, 1, 2, 3],
    [4, 0, 3, 7],
    [7, 3, 2, 6],
    [7, 6, 5, 4],
    [0, 4, 5, 1],
    [1, 5, 6, 2]
];

//cfe
// const a = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, -1]
// ];

function a(v) {
    return [v[0], v[1], v[2], -v[3]];
}

//cfv
// const b = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1],
//     [0, 0, 1, 0]
// ];

function b(v) {
    return [v[0], v[1], v[3], v[2]];
}

//cev
// const c = [
//     [1, 0, 0, 0],
//     [0, 0, 1, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1]
// ];

function c(v) {
    return [v[0], v[2], v[1], v[3]];
}

//fev
// const d = [
//     [p, 1 - p, 0, 0],
//     [1 + p, -p, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function d(v) {
    return [p * v[0] - v[1] / p, p ** 2 * v[0] - p * v[1], v[2], v[3]];
}

// const e = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function e(v) {
    return [v[0], v[1], v[2], v[3]];
}

// const f = [
//     [(p ** 2) / Math.sqrt(2), 0, 0, 0],
//     [0, Math.sqrt(p / 2), 0, 0],
//     [0, 0, Math.sqrt(p / 2), 0],
//     [0, 0, 0, Math.sqrt(p / 2)]
// ];

function f(v) {
    return [(p ** 2) / Math.sqrt(2) * v[0], Math.sqrt(p / 2) * v[1], Math.sqrt(p / 2) * v[2], Math.sqrt(p / 2) * v[3]];
}

function matrixDict(letter, vector) {
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
            newVector = d(vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(vector);
            break;
    }
    return newVector;
};

const l = Math.acosh(p ** 2);

const faceReflections = ['', 'c', 'bc', 'abc', 'babc', 'cbabc'];

const center = [Math.sqrt(2) / (p ** 2), 0, 0, 0];

export { typeOfHoneycomb, faceType, vertices, lines, faces, a, b, c, d, e, f, matrixDict, l, faceReflections, center };