// Order n dodecahedral

import { p } from "../constants.js";

import * as ORDER4 from '../hyperbolic/534.js';
import * as ORDER5 from '../hyperbolic/535.js';
import * as ORDER6 from '../hyperbolic/536.js';

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

function a(v) {

    return [v[0], v[1], v[2], -v[3]];

}

function b(v) {

    return [v[0], v[1], -v[2], v[3]];

}

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

        // case 5:

        //     newVector = ORDER5.d(v);
        //     break;

        case 6:

            newVector = ORDER6.d(v);
            break;

        default:

            var cos = Math.cos(Math.PI / n) ** 2;
            var rt = Math.sqrt(5);

            var newVector = [
                (2 * p * rt * cos - 1) * v[0] - (2 * rt * cos - 2 / p) * v[1] - (2 * rt * cos / p - 2 / (p ** 2)) * v[3],
                2 * (p ** 3) * cos * v[0] + (1 - 2 * (p ** 2) * cos) * v[1] - 2 * p * cos * v[3],
                v[2],
                2 * (p ** 2) * cos * v[0] - 2 * p * cos * v[1] + (1 - 2 * cos) * v[3]
            ];

    }

    return newVector;

}

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
                (p ** 2) * Math.sqrt(cot / (cot - 3)) * v[0],
                Math.sqrt(((p ** 2) * cot - 1) / (cot - 3)) * v[1],
                Math.sqrt(((p ** 2) * cot - 1) / (cot - 3)) * v[2],
                Math.sqrt(((p ** 2) * cot - 1) / (cot - 3)) * v[3]
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

    var newCenter = [];

    switch (n) {

        case 4:

            newCenter = ORDER4.center;
            break;

        case 5:

            newCenter = ORDER5.center;
            break;

        case 6:

            newCenter = ORDER6.center;
            break;

        default:

            var cot = 1 / (Math.tan(Math.PI / n) ** 2);
            newCenter = [1 / ((p ** 2) * Math.sqrt(Math.abs(cot / (3 - cot)))), 0, 0, 0];;

    }

    return newCenter;

}

export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };