// Order 5 cubic (compact)

import { p } from "./constants.js";

const faceType = "square";

const typeOfHoneycomb = "compact";

const vertices = [
    [[1, 1, 1, 1]],
    [[1, 1, -1, 1]],
    [[1, -1, -1, 1]],
    [[1, -1, 1, 1]],
    [[1, 1, 1, -1]],
    [[1, 1, -1, -1]],
    [[1, -1, -1, -1]],
    [[1, -1, 1, -1]]
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
const a = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, -1]
];

//cfv
const b = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0]
];

//cev
const c = [
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
];

//fev
const d = [
    [p, 1 - p, 0, 0],
    [1 + p, -p, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const e = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const f = [
    [(p ** 2) / Math.sqrt(2), 0, 0, 0],
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

const l = Math.acosh(p ** 2);

const faceReflections = ['', 'c', 'bc', 'abc', 'babc', 'cbabc'];

export { typeOfHoneycomb, faceType, vertices, faces, a, b, c, d, e, f, matrixDict, l, faceReflections };