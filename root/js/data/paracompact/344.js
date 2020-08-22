// Order 4 octahedral

const faceType = "triangle";

const typeOfHoneycomb = "paracompact";

const vertices = [
    [1, 1, 0, 0],
    [1, -1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, -1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, -1]
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
// const a = [
//     [1, 0, 0, 0],
//     [0, 0, 1, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1]
// ];

function a(v) {
    return [v[0], v[2], v[1], v[3]];
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
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, -1]
// ];

function c(v) {
    return [v[0], v[1], v[2], -v[3]];
}

//fev
const d = [
    [2, -1, -1, -1],
    [1, 0, -1, -1],
    [1, -1, 0, -1],
    [1, -1, -1, 0]
];

function d(v) {
    return [
        2 * v[0] - v[1] - v[2] - v[3],
        v[0] - v[2] - v[3],
        v[0] - v[1] - v[3],
        v[0] - v[1] - v[2]
    ];
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
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function f(v) {
    return [v[0], v[1], v[2], v[3]];
}

const matrixDict = {
    'a': a,
    'b': b,
    'c': c,
    'd': d,
    'e': e,
    'f': f
};

const faceReflections = ['', 'c', 'bc', 'abc', 'cbc', 'cabc', 'bcabc', 'cbcabc'];

const center = [1, 0, 0, 0];

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };