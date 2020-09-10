// Order 3 hexagonal (paracompact)

const faceType = "hexagon";

const typeOfHoneycomb = "paracompact";

const vertices = [
    [4, 0, 0, 0],
    [5, 1, 1, -1],
    [5, 1, -1, 1],
    [7, 3, 1, -1],
    [7, 3, -1, 1],
    [8, 4, 0, 0]];

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
//     [3, 1, -3, 3],
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
//     '', 'a', 'b',

//     'db', 'bdb', 'abdb',

//     'dbdb', 'dabdb', 'bdbdb', 'bdabdb', 'abdbdb', 'abdabdb',

//     'dbdabdb', 'dabdabdb', 'bdbdabdb', 'bdabdabdb', 'abdbdabdb', 'abdabdabdb',

//     'dbdbdabdb', 'adbdbdabdb', 'badbdbdabdb', 'dbdabdabdb', 'adbdabdabdb', 'bdbdabdabdb',
//     'abdbdabdabdb', 'badbdabdabdb', 'abadbdabdabdb',

//     'dbadbdbdabdb', 'bdbadbdbdabdb', 'abdbadbdbdabdb',
//     'dbadbdabdabdb', 'adbadbdabdabdb', 'bdbadbdabdabdb',
//     'abdbadbdabdabdb', 'badbadbdabdabdb', 'abadbadbdabdabdb',

//     'dbdbadbdbdabdb', 'adbdbadbdbdabdb', 'bdbdbadbdbdabdb',
//     'abdbdbadbdbdabdb', 'badbdbadbdbdabdb', 'abadbdbadbdbdabdb',
//     'dbadbadbdabdabdb', 'adbadbadbdabdabdb', 'bdbadbadbdabdabdb',
//     'abdbadbadbdabdabdb', 'badbadbadbdabdabdb', 'abadbadbadbdabdabdb',

//     'dbadbdbadbdbdabdb', 'adbadbdbadbdbdabdb', 'bdbadbdbadbdbdabdb',
//     'abdbadbdbadbdbdabdb', 'badbadbdbadbdbdabdb', 'abadbadbdbadbdbdabdb',
//     'dbadbadbadbdabdabdb', 'adbadbadbadbdabdabdb', 'bdbadbadbadbdabdabdb',
//     'abdbadbadbadbdabdabdb', 'badbadbadbadbdabdabdb', 'abadbadbadbadbdabdabdb',

//     'dbdbadbdbadbdbdabdb','adbdbadbdbadbdbdabdb','badbdbadbdbadbdbdabdb',
//     'dbadbadbdbadbdbdabdb', 'adbadbadbdbadbdbdabdb', 'bdbadbadbdbadbdbdabdb', 
//     'abdbadbadbdbadbdbdabdb', 'badbadbadbdbadbdbdabdb', 'abadbadbadbdbadbdbdabdb', 
//     'dbadbadbadbadbdabdabdb', 'adbadbadbadbadbdabdabdb', 'bdbadbadbadbadbdabdabdb', 
//     'abdbadbadbadbadbdabdabdb', 'badbadbadbadbadbdabdabdb', 'abadbadbadbadbadbdabdabdb',

//     'dbadbdbadbdbadbdbdabdb','bdbadbdbadbdbadbdbdabdb','abdbadbdbadbdbadbdbdabdb',
//     'dbadbadbadbdbadbdbdabdb', 'adbadbadbadbdbadbdbdabdb','bdbadbadbadbdbadbdbdabdb',
//     'abdbadbadbadbdbadbdbdabdb','badbadbadbadbdbadbdbdabdb','abadbadbadbadbdbadbdbdabdb',
//     'dbadbadbadbadbadbdabdabdb', 'adbadbadbadbadbadbdabdabdb', 'bdbadbadbadbadbadbdabdabdb', 
//     'abdbadbadbadbadbadbdabdabdb', 'badbadbadbadbadbadbdabdabdb', 'abadbadbadbadbadbadbdabdabdb'

// ];

const faceReflections = [
    '', 'a', 'ba', 'dba', 'bdba', 'abdba', 'dbdba', 'dabdba', 'bdbdba', 'abdbdba', 'badbdba', 'abadbdba', 'dbadbdba', 'dabadbdba',
    'bdbadbdba', 'abdbadbdba', 'badbadbdba', 'abadbadbdba', 'dbdbadbdba', 'dabdbadbdba', 'dbadbadbdba', 'dabadbadbdba', 'badbdbadbdba',
    'bdbadbadbdba', 'abdbadbadbdba', 'badbadbadbdba', 'abadbadbadbdba', 'dbadbdbadbdba', 'dbadbadbadbdba', 'dabadbadbadbdba', 'bdbadbdbadbdba',
    'abdbadbdbadbdba', 'bdbadbadbadbdba', 'abdbadbadbadbdba', 'badbadbadbadbdba', 'abadbadbadbadbdba', 'dbdbadbdbadbdba', 'dabdbadbdbadbdba',
    'dbdbadbadbadbdba', 'dabdbadbadbadbdba', 'dbadbadbadbadbdba', 'dabadbadbadbadbdba', 'badbdbadbdbadbdba', 'abadbdbadbdbadbdba', 'bdbadbadbadbadbdba',
    'abdbadbadbadbadbdba', 'badbadbadbadbadbdba', 'abadbadbadbadbadbdba', 'dbadbdbadbdbadbdba', 'dabadbdbadbdbadbdba', 'dbadbadbadbadbadbdba',
    'dabadbadbadbadbadbdba', 'bdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdba', 'badbadbdbadbdbadbdba', 'abadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbdba',
    'abdbadbadbadbadbadbdba', 'badbadbadbadbadbadbdba', 'abadbadbadbadbadbadbdba', 'dbdbadbdbadbdbadbdba', 'dabdbadbdbadbdbadbdba', 'dbadbadbdbadbdbadbdba',
    'dabadbadbdbadbdbadbdba', 'dbdbadbadbadbadbadbdba', 'dabdbadbadbadbadbadbdba', 'dbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbdba', 'badbdbadbdbadbdbadbdba',
    'badbadbadbdbadbdbadbdba', 'abadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbdba', 'badbadbadbadbadbadbadbdba',
    'abadbadbadbadbadbadbadbdba', 'dbadbdbadbdbadbdbadbdba', 'dbadbadbadbdbadbdbadbdba', 'dabadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbdba',
    'dabadbadbadbadbadbadbadbdba', 'bdbadbdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdbadbdba', 'bdbadbadbadbdbadbdbadbdba', 'abdbadbadbadbdbadbdbadbdba',
    'badbadbadbadbdbadbdbadbdba', 'abadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbdba', 'badbadbadbadbadbadbadbadbdba',
    'abadbadbadbadbadbadbadbadbdba', 'dbdbadbdbadbdbadbdbadbdba', 'dabdbadbdbadbdbadbdbadbdba', 'dbdbadbadbadbdbadbdbadbdba', 'dabdbadbadbadbdbadbdbadbdba',
    'dbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbdbadbdbadbdba', 'dbdbadbadbadbadbadbadbadbdba', 'dabdbadbadbadbadbadbadbadbdba',
    'dbadbadbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbadbadbdba', 'badbdbadbdbadbdbadbdbadbdba', 'abadbdbadbdbadbdbadbdbadbdba',
    'badbadbadbadbadbdbadbdbadbdba', 'abadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbdba', 'dbadbdbadbdbadbdbadbdbadbdba', 'dabadbdbadbdbadbdbadbdbadbdba',
    'dbadbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbadbadbadbdba',
    'bdbadbdbadbdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdbadbdbadbdba', 'badbadbdbadbdbadbdbadbdbadbdba', 'abadbadbdbadbdbadbdbadbdbadbdba',
    'bdbadbadbadbadbadbdbadbdbadbdba', 'abdbadbadbadbadbadbdbadbdbadbdba', 'badbadbadbadbadbadbdbadbdbadbdba', 'abadbadbadbadbadbadbdbadbdbadbdba',
    'bdbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbdba', 'badbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbdba',
    'dbdbadbdbadbdbadbdbadbdbadbdba', 'dabdbadbdbadbdbadbdbadbdbadbdba', 'dbadbadbdbadbdbadbdbadbdbadbdba', 'dabadbadbdbadbdbadbdbadbdbadbdba',
    'dbdbadbadbadbadbadbdbadbdbadbdba', 'dabdbadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbadbadbdbadbdbadbdba',
    'dbdbadbadbadbadbadbadbadbadbadbdba', 'dabdbadbadbadbadbadbadbadbadbadbdba', 'dbadbadbadbadbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbadbadbadbadbdba',
    'badbdbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbdbadbdbadbdbadbdbadbdba', 'abadbadbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbadbadbadbadbdbadbdbadbdba',
    'abadbadbadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbadbdba', 'dbadbdbadbdbadbdbadbdbadbdbadbdba',
    'dbadbadbadbdbadbdbadbdbadbdbadbdba', 'dabadbadbadbdbadbdbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbdbadbdbadbdba',
    'dabadbadbadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbadbadbadbadbadbdba',
    'bdbadbdbadbdbadbdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdbadbdbadbdbadbdba', 'bdbadbadbadbdbadbdbadbdbadbdbadbdba',
    'abdbadbadbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbadbdbadbdbadbdbadbdbadbdba', 'abadbadbadbadbdbadbdbadbdbadbdbadbdba',
    'bdbadbadbadbadbadbadbadbdbadbdbadbdba', 'abdbadbadbadbadbadbadbadbdbadbdbadbdba', 'badbadbadbadbadbadbadbadbdbadbdbadbdba',
    'abadbadbadbadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbadbadbdba', 'dbdbadbdbadbdbadbdbadbdbadbdbadbdba',
    'dabdbadbdbadbdbadbdbadbdbadbdbadbdba', 'dbdbadbadbadbdbadbdbadbdbadbdbadbdba', 'dabdbadbadbadbdbadbdbadbdbadbdbadbdba',
    'dbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'dabadbadbadbadbdbadbdbadbdbadbdbadbdba', 'dbdbadbadbadbadbadbadbadbdbadbdbadbdba',
    'dabdbadbadbadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbadbadbadbadbdbadbdbadbdba',
    'dbdbadbadbadbadbadbadbadbadbadbadbadbdba', 'dabdbadbadbadbadbadbadbadbadbadbadbadbdba', 'dbadbadbadbadbadbadbadbadbadbadbadbadbdba',
    'dabadbadbadbadbadbadbadbadbadbadbadbadbdba', 'badbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'abadbdbadbdbadbdbadbdbadbdbadbdbadbdba',
    'badbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'abadbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbadbadbadbadbadbadbdbadbdbadbdba',
    'abadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'dbadbdbadbdbadbdbadbdbadbdbadbdbadbdba',
    'dabadbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'dbadbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'dabadbadbadbadbadbdbadbdbadbdbadbdbadbdba',
    'dbadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbadbadbadbadbadbadbdba',
    'dabadbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'bdbadbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdbadbdbadbdbadbdbadbdba',
    'badbadbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'abadbadbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'bdbadbadbadbadbadbdbadbdbadbdbadbdbadbdba',
    'abdbadbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'abadbadbadbadbadbadbdbadbdbadbdbadbdbadbdba',
    'bdbadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'abdbadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'badbadbadbadbadbadbadbadbadbadbdbadbdbadbdba',
    'abadbadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbadbadbadbadbdba'];



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