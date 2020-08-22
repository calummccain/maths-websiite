// Order 6 tetrahedral (paracompact)

const faceType = "triangle";

const typeOfHoneycomb = "paracompact";

const vertices = [
    [1, 1, 1, 1],
    [1, 1, -1, -1],
    [1, -1, 1, -1],
    [1, -1, -1, 1]
];

const faces = [
    [0, 2, 1],
    [1, 2, 3],
    [2, 0, 3],
    [3, 0, 1]
];

//cfv
// const a = [
//     [1, 0, 0, 0],
//     [0, 0, 1, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1]
// ];

function a(v) {
    return [v[0], v[2], v[1], v[3]];
}

//cev
// const b = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1],
//     [0, 0, 1, 0]
// ];

function b(v) {
    return [v[0], v[1], v[3], v[2]];
}

//cfe
// const c = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, -1],
//     [0, 0, -1, 0]
// ];

function c(v) {
    return [v[0], v[1], -v[3], -v[2]];
}

//fev
// const d = [
//     [5 / 4, -1 / 4, -1 / 4, 1 / 4],
//     [3 / 4, 1 / 4, -3 / 4, 3 / 4],
//     [3 / 4, -3 / 4, 1 / 4, 3 / 4],
//     [-3 / 4, 3 / 4, 3 / 4, 1 / 4]
// ];

function d(v) {
    return [
        (5 * v[0] - v[1] - v[2] + v[3]) / 4,
        (3 * v[0] + v[1] - 3 * v[2] + 3 * v[3]) / 4,
        (3 * v[0] - 3 * v[1] + v[2] + 3 * v[3]) / 4,
        (-3 * v[0] + 3 * v[1] + 3 * v[2] + v[3]) / 4
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
//     [Math.sqrt(3), 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function f(v) {
    return [Math.sqrt(3) * v[0], v[1], v[2], v[3]];
}

function matrixDict(letter, vector) {
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
            newVector = d(vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(vector);
            break;
    }
    return newVector;
};

const faceReflections = ['', 'b', 'ab', 'cab'];

const center = [1 / Math.sqrt(3), 0, 0, 0];

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };
