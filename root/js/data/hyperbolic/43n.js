// Order n cubic

const faceType = 'square';

function typeOfHoneycomb(n) {
    var t = '';
    if (n < 6) {
        t = 'compact';
    } else if (n == 6) {
        t = 'paracompact';
    } else {
        t = 'noncompact';
    }
    return t;
}

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
// function d(n) {

//     var cos = Math.cos(2 * Math.PI / n);

//     var matrix = [
//         [1 + 2 * cos, -2 * cos, 0, 0],
//         [2 * cos + 2, -1 - 2 * cos, 0, 0],
//         [0, 0, 1, 0],
//         [0, 0, 0, 1]
//     ];

//     return matrix;

// }

function d(n, v) {

    var cos = Math.cos(2 * Math.PI / n);

    return [(1 + 2 * cos) * v[0] - 2 * cos * v[1], 2 * (1 + cos) * v[0] - (1 + 2 * cos) * v[1], v[2], v[3]];

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

function f(n, v) {

    var cot = 1 / (Math.tan(Math.PI / n) ** 2);

    var a = Math.sqrt(Math.abs(2 * cot / (3 - cot)));
    var b = Math.sqrt(Math.abs((cot - 1) / (3 - cot)));

    // matrix = [
    //     [Math.sqrt(Math.abs(2 * cot / (3 - cot))), 0, 0, 0],
    //     [0, Math.sqrt(Math.abs((cot - 1) / (3 - cot))), 0, 0],
    //     [0, 0, Math.sqrt(Math.abs((cot - 1) / (3 - cot))), 0],
    //     [0, 0, 0, Math.sqrt(Math.abs((cot - 1) / (3 - cot)))]
    // ];

    return [a * v[0], b * v[1], b * v[2], b * v[3]];

}

function matrixDict(letter, vector, n) {
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
            newVector = d(n, vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(n, vector);
            break;
    }
    return newVector;
};


// function matrixDict(n) {

//     var dict = {
//         'a': a,
//         'b': b,
//         'c': c,
//         'd': d(n),
//         'e': e,
//         'f': f(n)
//     }

//     return dict;
// }

const faceReflections = ['bc', 'c', 'cbabc', 'abc', '', 'babc'];

function center(n) {

    var cot = 1 / (Math.tan(Math.PI / n) ** 2);

    return [1 / Math.sqrt(Math.abs(2 * cot / (3 - cot))), 0, 0, 0]
}

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };