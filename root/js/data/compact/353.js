// Order 5 icosahedral (compact)

import { p } from "../constants.js";

const faceType = "triangle";

const typeOfHoneycomb = "compact";

const vertices = [
    [[1, 1, p, 0]],
    [[1, 1, -p, 0]],
    [[1, -1, p, 0]],
    [[1, -1, -p, 0]],
    [[1, p, 0, 1]],
    [[1, -p, 0, 1]],
    [[1, p, 0, -1]],
    [[1, -p, 0, -1]],
    [[1, 0, 1, p]],
    [[1, 0, 1, -p]],
    [[1, 0, -1, p]],
    [[1, 0, -1, -p]]
];

const faces = [
    [0, 2, 8],
    [0, 9, 2],
    [0, 4, 6],
    [0, 8, 4],
    [0, 6, 9],
    [1, 10, 3],
    [1, 3, 11],
    [1, 6, 4],
    [1, 4, 10],
    [1, 11, 6],
    [2, 7, 5],
    [2, 5, 8],
    [2, 9, 7],
    [3, 5, 7],
    [3, 10, 5],
    [3, 7, 11],
    [4, 8, 10],
    [5, 10, 8],
    [6, 11, 9],
    [7, 9, 11]
];

const a = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, -1]
];

const b = [
    [1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const c = [
    [1, 0, 0, 0],
    [0, 1 / 2, 1 / (2 * p), -p / 2],
    [0, 1 / (2 * p), p / 2, 1 / 2],
    [0, -p / 2, 1 / 2, -1 / (2 * p)]
];

const d = [
    [((p ** 4) - 1) / 2, 0, -((p ** 4) - 3) / (2 * p), -((p ** 4) - 3) / (2 * (p ** 3))],
    [0, 1, 0, 0],
    [(p ** 5) / 2, 0, 1 - (p ** 4) / 2, -(p ** 2) / 2],
    [(p ** 3) / 2, 0, -(p ** 2) / 2, 1 / 2]
];

const e = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const f = [
    [(p ** 3) / 2, 0, 0, 0],
    [0, Math.sqrt(3 * p - 1) / 2, 0, 0],
    [0, 0, Math.sqrt(3 * p - 1) / 2, 0],
    [0, 0, 0, Math.sqrt(3 * p - 1) / 2]
];

const matrixDict = {
    'a': a,
    'b': b,
    'c': c,
    'd': d,
    'e': e,
    'f': f
};

const l = Math.acosh((p ** 6 - (-1 + p ** 2) * (3 * p - 1)) / 4);

const faceReflections = [
    '',
    'a',
    'ca',
    'aca', 'bca',
    'baca', 'caca',
    'cbaca', 'bcaca',
    'bcbaca',
    'abcbaca',
    'babcbaca', 'cabcbaca',
    'cbabcbaca', 'acabcbaca', 'bcabcbaca',
    'bcbabcbaca', 'bacabcbaca',
    'cbacabcbaca',
    'acbacabcbaca'
];

export { typeOfHoneycomb, faceType, vertices, faces, a, b, c, d, e, f, matrixDict, l, faceReflections };