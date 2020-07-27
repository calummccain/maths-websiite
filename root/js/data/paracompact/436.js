// Order 6 cubic

const faceType = "square";

const typeOfHoneycomb = "paracompact";

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
    [2, -1, 0, 0],
    [3, -2, 0, 0],
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
    [Math.sqrt(3), 0, 0, 0],
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

const faceReflections = ['', 'c', 'bc', 'abc', 'babc', 'cbabc'];

const center = [[1 / Math.sqrt(3), 0, 0, 0]];

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };