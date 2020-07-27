// Order 4 octahedral

const faceType = "triangle";

const typeOfHoneycomb = "paracompact";

const vertices = [
    [[1, 1, 0, 0]],
    [[1, -1, 0, 0]],
    [[1, 0, 1, 0]],
    [[1, 0, -1, 0]],
    [[1, 0, 0, 1]],
    [[1, 0, 0, -1]]
];

const faces = [
    [0, 4, 2],
    [0, 2, 5],
    [0, 3, 4],
    [0, 5, 3],
    [1, 2, 4],
    [1, 5, 2],
    [1, 4, 3],
    [1, 3, 5]
];

//cfe
const a = [
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
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
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, -1]
];

//fev
const d = [
    [2, -1, -1, -1],
    [1, 0, -1, -1],
    [1, -1, 0, -1],
    [1, -1, -1, 0]
];

const e = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const f = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const matrixDict = {
    'a': a,
    'b': b,
    'c': c,
    'd': d,
    'e': e,
    'f': f
};

const faceReflections = ['', 'c', 'bc', 'abc', 'cbc', 'cabc', 'bcabc', 'cbcab'];

const center = [[1, 0, 0, 0]];

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };