// Order 6 cubic

const faceType = "square";

const typeOfHoneycomb = "paracompact";

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

const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [7, 6],
    [6, 5],
    [5, 4],
    [4, 7],
    [4, 0],
    [5, 1],
    [6, 2],
    [7, 3]
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
// const a = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, -1]
// ];

function a(v) {
    return [v[0], v[1], v[2], -v[3]];
}

//cfv
// const b = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1],
//     [0, 0, 1, 0]
// ];

function b(v) {
    return [v[0], v[1], v[3], v[2]];
}

//cev
// const c = [
//     [1, 0, 0, 0],
//     [0, 0, 1, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1]
// ];

function c(v) {
    return [v[0], v[2], v[1], v[3]];
}

//fev
// const d = [
//     [2, -1, 0, 0],
//     [3, -2, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function d(v) {
    return [2 * v[0] - v[1], 3 * v[0] - 2 * v[1], v[2], v[3]];
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

// const f = [
//     [Math.sqrt(3), 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function f(v) {
    return [Math.sqrt(3) * v[0], v[1], v[2], v[3]];
}

const matrixDict = {
    'a': a,
    'b': b,
    'c': c,
    'd': d,
    'e': e,
    'f': f
};

const faceReflections = ['', 'c', 'bc', 'abc', 'babc', 'cbabc'];

const center = [1 / Math.sqrt(3), 0, 0, 0];

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };