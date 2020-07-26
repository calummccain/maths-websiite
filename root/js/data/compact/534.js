// order 4 dodecahedral (compact)

import { p } from "./constants.js";

const faceType = "pentagon";

const typeOfHoneycomb = "compact";

const vertices = [
    [[1, 1, 1, 1]],
    [[1, 1, 1, -1]],
    [[1, 1, -1, 1]],
    [[1, 1, -1, -1]],
    [[1, -1, 1, 1]],
    [[1, -1, 1, -1]],
    [[1, -1, -1, 1]],
    [[1, -1, -1, -1]],
    [[1, 0, p, 1 / p]],
    [[1, 0, p, -1 / p]],
    [[1, 0, -p, 1 / p]],
    [[1, 0, -p, -1 / p]],
    [[1, p, 1 / p, 0]],
    [[1, p, -1 / p, 0]],
    [[1, -p, 1 / p, 0]],
    [[1, -p, -1 / p, 0]],
    [[1, 1 / p, 0, p]],
    [[1, -1 / p, 0, p]],
    [[1, 1 / p, 0, -p]],
    [[1, -1 / p, 0, -p]]
];

//ADD FACES!!!
const faces = [[]];

//cev
const a = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, -1]
];

//cfe
const b = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, -1, 0],
    [0, 0, 0, 1]
];

// //cfv
// const c = [
//     [1, 0, 0, 0],
//     [0, 1 - 2 / (4 * p ** 2), 1 / 2, 1 / (2 * p)],
//     [0, 1 / 2, 1 - 2 * p ** 4 / (4 * p ** 2), -p / 2],
//     [0, 1 / (2 * p), -p / 2, 1 - 2 * p ** 2 / (4 * p ** 2)]
// ];

//cfv
const c = [
    [1, 0, 0, 0],
    [0, p / 2, 1 / 2, 1 / (2 * p)],
    [0, 1 / 2, -1 / (2 * p), -p / 2],
    [0, 1 / (2 * p), -p / 2, p / 2]
];

//fev
const d = [
    [p ** 2, -1, 0, -1 / p],
    [p ** 3, -p, 0, -p],
    [0, 0, 1, 0],
    [p ** 2, -p, 0, 0]
];

const e = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const f = [
    [p ** 2 / Math.sqrt(2), 0, 0, 0],
    [0, Math.sqrt(p / 2), 0, 0],
    [0, 0, Math.sqrt(p / 2), 0],
    [0, 0, 0, Math.sqrt(p / 2)]
];

const matrixDict = {
    'a': a,
    'b': b,
    'c': c,
    'd': d,
    'e': e,
    'f': f
};

export { typeOfHoneycomb, faceType, vertices, faces, a, b, c, d, e, f, matrixDict };