// Order n dodecahedral

import * as ORDER4 from '../compact/534.js';
import * as ORDER5 from '../compact/535.js';
import * as ORDER6 from '../compact/536.js';

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
function d(n, v) {

    var newVector = [];

    switch (n) {

        case 4:

            newVector = ORDER4.d(v);
            break;

        case 5:

            newVector = ORDER5.d(v);
            break;

        case 6:

            newVector = ORDER6.d(v);
            break;

        default:
            //recalculate
            var cos = Math.cos(2 * Math.PI / n);

            var newVector = [
                [1 + 2 * cos, -2 * cos, 0, 0],
                [2 * cos + 2, -1 - 2 * cos, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];

    }

    return newVector;

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

function f(n, v) {

    var newVector = [];

    switch (n) {

        case 4:

            newVector = ORDER4.f(v);
            break;

        case 5:

            newVector = ORDER5.f(v);
            break;

        case 6:

            newVector = ORDER6.f(v);
            break;

        default:

            var cot = 1 / (Math.tan(Math.PI / n) ** 2);

            var newVector = [
                (p ** 2) * Math.sqrt(Math.abs(cot / (3 - cot))) * v[0],
                Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (3 - cot))) * v[1],
                Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (3 - cot))) * v[2],
                Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (3 - cot))) * v[3]
            ];

    }

    return newVector;

}


// var cot = 1 / (Math.tan(Math.PI / n) ** 2);

// matrix = [
//     [(p ** 2) * Math.sqrt(Math.abs(cot / (3 - cot))), 0, 0, 0],
//     [0, Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (3 - cot))), 0, 0],
//     [0, 0, Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (3 - cot))), 0],
//     [0, 0, 0, Math.sqrt(Math.abs(((p ** 2) * cot - 1) / (3 - cot)))]
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

const faceReflections = ['', 'a', 'ca', 'babacbca', 'abacbca', 'acbca', 'cbacbca', 'acbcbacbca', 'cbcbacbca', 'bca', 'bacbca', 'bcbacbca'];

function center(n) {

    var cot = 1 / (Math.tan(Math.PI / n) ** 2);
    return [1 / ((p ** 2) * Math.sqrt(Math.abs(cot / (3 - cot)))), 0, 0, 0];

}

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };