// Order 6 tetrahedral (paracompact)

const faceType = "triangle";

const typeOfHoneycomb = "paracompact";

const vertices = [
    [[1, 1, 1, 1]],
    [[1, 1, -1, -1]],
    [[1, -1, 1, -1]],
    [[1, -1, -1, 1]]
];

const faces = [
    [0, 2, 1],
    [1, 2, 3],
    [2, 0, 3],
    [3, 0, 1]
];

//cfv
const a = [
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1]
];

//cev
const b = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0]
];

//cfe
const c = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, -1],
    [0, 0, -1, 0]
];

//fev
const d = [
    [5 / 4, -1 / 4, -1 / 4, 1 / 4],
    [3 / 4, 1 / 4, -3 / 4, 3 / 4],
    [3 / 4, -3 / 4, 1 / 4, 3 / 4],
    [-3 / 4, 3 / 4, 3 / 4, 1 / 4]
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

const faceReflections = ['', 'b', 'ab', 'cab'];

const center = [[1 / Math.sqrt(3), 0, 0, 0]];

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };
