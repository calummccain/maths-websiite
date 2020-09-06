// Order 3 hexagonal (paracompact)

const faceType = "hexagon";

const typeOfHoneycomb = "paracompact";

const vertices = [
    [4, 0, 0, 0],
    [5, 1, 1, -1],
    [5, -1, 1, 1],
    [7, 1, 3, -1],
    [7, -1, 3, 1],
    [8, 0, 4, 0]];

const faces = [[0, 1, 3, 5, 4, 2]];

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
//     [5, -1, -1, 1],
//     [3 1, -3, 3],
//     [3, -3, 1, 3],
//     [-3, 3, 3, 1]
// ];

function d(v) {
    return [
        (5 * v[0] - 3 * v[1] - 3 * v[2] + 3 * v[3]) / 4,
        (v[0] + v[1] - 3 * v[2] + 3 * v[3]) / 4,
        (v[0] - 3 * v[1] + v[2] + 3 * v[3]) / 4,
        (-v[0] + 3 * v[1] + 3 * v[2] + v[3]) / 4
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
    return [v[0] / 4, Math.sqrt(3) * v[1] / 4, Math.sqrt(3) * v[2] / 4, Math.sqrt(3) * v[3] / 4];
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

// const faceReflections = [
//     '',
//     'a',
//     'ab',
//     'dab',
//     'bdab',
//     'abdab',
//     'dabdab',
//     'adabdab',
//     'bdabdab',
//     'badabdab',
//     'abdabdab',
//     'abadabdab',
// ];

// const faceReflections = [
//     '',
//     'b', 'a',
//     'db',
//     'bdb',
//     'abdb',
//     'dabdb',
//     'adabdb', 'bdabdb',
//     'badabdb', 'abdabdb',
//     'abadabdb', 'dabdabdb',
//     'adabdabdb', 'bdabdabdb',
//     'badabdabdb', 'abdabdabdb',
//     'abadabdabdb', 'dbadabdabdb', 'dabdabdabdb'
// ];

const faceReflections = [
    '', 'a', 'b',
    'db', 'bdb', 'abdb',
    'dbdb', 'adbdb', 'bdbdb', 'abdbdb', 'babdbdb', 'ababdbdb',
    'dbadbdb', 'adbadbdb', 'bdbadbdb', 'badbadbdb', 'abdbadbdb', 'babdbadbdb',
    'dbdbadbdb', 'adbdbadbdb', 'badbdbadbdb',
    'dbadbadbdb','adbadbadbdb','bdbadbadbdb','abdbadbadbdb','badbadbadbdb','abadbadbadbdb',
    'dbadbadbadbdb', 'adbadbadbadbdb', 'bdbadbadbadbdb', 'abdbadbadbadbdb', 'badbadbadbadbdb', 'abadbadbadbadbdb',
    'dbdbadbadbadbdb', 'adbdbadbadbadbdb', 'bdbdbadbadbadbdb', 'badbdbadbadbadbdb', 'abdbdbadbadbadbdb', 'abadbdbadbadbadbdb',
    'dbadbadbadbadbdb', 'adbadbadbadbadbdb', 'bdbadbadbadbadbdb', 'abdbadbadbadbadbdb', 'badbadbadbadbadbdb', 'abadbadbadbadbadbdb'
];

const center = [3, 1, 1, 1];

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };

// var faceCenter = [
//     [3, 1, 0, 0],
//     [3, 0, 1, 0],
//     [3, 0, 0, 1],
//     [9, 3, 3, -1],
//     [9, 3, -1, 3],
//     [9, -1, 3, 3]
//     [6, 1, 3, 0],
//     [6, 0, 3, 1],
//     [6, 1, 0, 3],
//     [6, 1, 3, 0],
//     [6, 3, 0, 1],
//     [6, 3, 1, 0]
// ];

//console.log(a(d(a(b(d(b(a(faceCenter[0]))))))))