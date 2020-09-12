// order 6 dodecahedral (paracompact)

import { p } from "../constants.js";

//fev
// const d = [
//     [1 + p ** 4 / 2, -(p ** 3) / 2, 0, -(p ** 2) / 2],
//     [3 * p ** 3 / 2, 1 - 3 * p ** 2 / 2, 0, -3 * p / 2],
//     [0, 0, 1, 0],
//     [3 * p ** 2 / 2, -3 * p / 2, 0, -1 / 2]
// ];

function d(v) {
    return [
        ((2 + p ** 4) * v[0] - p ** 3 * v[1] - p ** 2 * v[3]) / 2,
        (3 * p ** 3 * v[0] + (2 - 3 * p ** 2) * v[1] - 3 * p * v[3]) / 2,
        v[2],
        (3 * p ** 2 * v[0] - 3 * p * v[1] - v[3]) / 2
    ];
}

// const f = [
//     [Math.sqrt(3), 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function f(v) {
    return [Math.sqrt(3) * v[0], v[1], v[2], v[3]];
}

const center = [1 / Math.sqrt(3), 0, 0, 0];

export { d, f, center };