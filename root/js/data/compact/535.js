// order 5 dodecahedral (compact)

import { p } from "../constants.js";

const faceType = "pentagon";

const typeOfHoneycomb = "compact";

const vertices = [
    [1, 1, 1, 1],
    [1, 1, 1, -1],
    [1, 1, -1, 1],
    [1, 1, -1, -1],
    [1, -1, 1, 1],
    [1, -1, 1, -1],
    [1, -1, -1, 1],
    [1, -1, -1, -1],
    [1, 0, p, 1 / p],
    [1, 0, p, -1 / p],
    [1, 0, -p, 1 / p],
    [1, 0, -p, -1 / p],
    [1, p, 1 / p, 0],
    [1, p, -1 / p, 0],
    [1, -p, 1 / p, 0],
    [1, -p, -1 / p, 0],
    [1, 1 / p, 0, p],
    [1, -1 / p, 0, p],
    [1, 1 / p, 0, -p],
    [1, -1 / p, 0, -p]
];

const faces = [
    [0, 16, 2, 13, 12],
    [1, 12, 13, 3, 18],
    [0, 12, 1, 9, 8],
    [0, 8, 4, 17, 16],
    [2, 16, 17, 6, 10],
    [1, 18, 19, 5, 9],
    [4, 8, 9, 5, 14],
    [5, 19, 7, 15, 14],
    [6, 17, 4, 14, 15],
    [3, 13, 2, 10, 11],
    [3, 11, 7, 19, 18],
    [11, 10, 6, 15, 7]
];

//cev
// const a = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, -1]
// ];

function a(v) {
    return [v[0], v[1], v[2], -v[3]];
}

//cfe
// const b = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, -1, 0],
//     [0, 0, 0, 1]
// ];

function b(v) {
    return [v[0], v[1], -v[2], v[3]];
}

//cfv
// const c = [
//     [1, 0, 0, 0],
//     [0, p / 2, 1 / 2, 1 / (2 * p)],
//     [0, 1 / 2, -1 / (2 * p), -p / 2],
//     [0, 1 / (2 * p), -p / 2, 1 / 2]
// ];

function c(v) {
    return [v[0], (p * v[1] + v[2] + v[3] / p) / 2, (v[1] - v[2] / p - p * v[3]) / 2, (v[1] / p - p * v[2] + v[3]) / 2];
}

//fev
// const d = [
//     [(4 * p + 1) / 2, -(4 * p - 1) / (2 * p), 0, -(4 * p - 1) / (2 * (p ** 2))],
//     [(p ** 5) / 2, 1 - (p ** 4) / 2, 0, -(p ** 3) / 2],
//     [0, 0, 1, 0],
//     [p ** 4 / 2, -(p ** 3) / 2, 0, 1 - ((p ** 2) / 2)]
// ];

function d(v) {
    return [
        ((p ** 4 + 1) * v[0] - (p ** 4 - 1) / p * v[1] - (p ** 4 - 1) / p ** 2 * v[3]) / 2,
        (p ** 5 * v[0] + (1 - (p ** 4) / 2) * v[1] - p ** 3 * v[3]) / 2,
        v[2],
        (p ** 4 * v[0] - p ** 3 * v[1] - v[3] / p) / 2
    ];
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
//     [p ** 4 / 2, 0, 0, 0],
//     [0, p * Math.sqrt(4 * p - 1) / 2, 0, 0],
//     [0, 0, p * Math.sqrt(4 * p - 1) / 2, 0],
//     [0, 0, 0, p * Math.sqrt(4 * p - 1) / 2]
// ];

function f(v) {
    return [p ** 4 / 2 * v[0], p * Math.sqrt(4 * p - 1) / 2 * v[1], p * Math.sqrt(4 * p - 1) / 2 * v[2], p * Math.sqrt(4 * p - 1) / 2 * v[3]];
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

const l = 0;

const faceReflections = ['', 'a', 'ca', 'bca', 'acbca', 'bacbca', 'cbacbca', 'abacbca', 'bcbacbca', 'babacbca', 'cbcbacbca', 'acbcbacbca'];

const center = [2 / (p ** 4), 0, 0, 0];

export { typeOfHoneycomb, faceType, vertices, faces, a, b, c, d, e, f, matrixDict, l, faceReflections, center };