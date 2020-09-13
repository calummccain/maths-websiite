// Order n cubic

import * as ORDER5 from "./435.js";
import * as ORDER6 from "./436.js";

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

const faces = [
    [0, 1, 2, 3],
    [4, 0, 3, 7],
    [7, 3, 2, 6],
    [7, 6, 5, 4],
    [0, 4, 5, 1],
    [1, 5, 6, 2]
];

function a(v) {

    return [v[0], v[1], v[2], -v[3]];

}

function b(v) {

    return [v[0], v[1], v[3], v[2]];

}

function c(v) {

    return [v[0], v[2], v[1], v[3]];

}

//fev
// function d(n) {

//     var cos = Math.cos(2 * Math.PI / n);

//     var matrix = [
//         [1 + 2 * cos, -2 * cos, 0, 0],
//         [2 * cos + 2, -1 - 2 * cos, 0, 0],
//         [0, 0, 1, 0],
//         [0, 0, 0, 1]
//     ];

//     return matrix;

// }

function d(n, v) {

    var newVector = [];

    switch (n) {

        case 5:

            newVector = ORDER5.d(v);
            break;

        case 6:

            newVector = ORDER6.d(v);
            break;

        default:

            var cos = Math.cos(2 * Math.PI / n);
            newVector = [(1 + 2 * cos) * v[0] - 2 * cos * v[1], 2 * (1 + cos) * v[0] - (1 + 2 * cos) * v[1], v[2], v[3]];

    }

    return newVector;

}

function e(v) {

    return [v[0], v[1], v[2], v[3]];

}

function f(n, v) {

    var newVector = [];

    switch (n) {

        case 5:

            newVector = ORDER5.f(v);
            break;

        case 6:

            newVector = ORDER6.f(v);
            break;

        default:

            var cot = 1 / (Math.tan(Math.PI / n) ** 2);

            var a = Math.sqrt(Math.abs(2 * cot / (3 - cot)));
            var b = Math.sqrt(Math.abs((cot - 1) / (3 - cot)));

            // matrix = [
            //     [Math.sqrt(Math.abs(2 * cot / (3 - cot))), 0, 0, 0],
            //     [0, Math.sqrt(Math.abs((cot - 1) / (3 - cot))), 0, 0],
            //     [0, 0, Math.sqrt(Math.abs((cot - 1) / (3 - cot))), 0],
            //     [0, 0, 0, Math.sqrt(Math.abs((cot - 1) / (3 - cot)))]
            // ];

            newVector = [a * v[0], b * v[1], b * v[2], b * v[3]];
    }

    return newVector;
}

function matrixDict(letter, vector, n) {
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

const faceReflections = ['bc', 'c', 'cbabc', 'abc', '', 'babc'];

function center(n) {

    var newCenter = [];

    switch (n) {
        case 5:

            newCenter = ORDER5.center;
            break;

        case 6:

            newCenter = ORDER6.center;
            break;

        default:

            var cot = 1 / (Math.tan(Math.PI / n) ** 2);
            newCenter = [1 / Math.sqrt(Math.abs(2 * cot / (3 - cot))), 0, 0, 0]

    }

    return newCenter;

}

export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };