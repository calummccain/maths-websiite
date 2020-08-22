// Order n octahedral

const faceType = "triangle";

function typeOfHoneycomb(n) {
    var t = '';
    if (n <= 3) {
        t = 'spherical';
    } else if (n == 4) {
        t = 'paracompact';
    } else {
        t = 'noncompact';
    }
    return t;
}

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
function d(n) {

    var cos = Math.cos(Math.PI / n) ** 2;

    var matrix = [
        [6 * cos - 1, 2 - 6 * cos, 2 - 6 * cos, 2 - 6 * cos],
        [2 * cos, 1 - 2 * cos, -2 * cos, -2 * cos],
        [2 * cos, -2 * cos, 1 - 2 * cos, -2 * cos],
        [2 * cos, -2 * cos, -2 * cos, 1 - 2 * cos]
    ];

    return matrix;

}

const e = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

function f(n) {

    var matrix;

    if (n == 4) {

        matrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]

    } else {

        var cot = 1 / (Math.tan(Math.PI / n) ** 2);
        matrix = [
            [Math.sqrt(Math.abs(cot / (1 - cot))), 0, 0, 0],
            [0, Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot))), 0, 0],
            [0, 0, Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot))), 0],
            [0, 0, 0, Math.sqrt(Math.abs((2 * cot - 1) / (1 - cot)))]
        ];

    }

    return matrix;

}

function matrixDict(n) {

    var dict = {
        'a': a,
        'b': b,
        'c': c,
        'd': d(n),
        'e': e,
        'f': f(n)
    }

    return dict;
}

const faceReflections = ['', 'c', 'bc', 'abc', 'cbc', 'cabc', 'bcabc', 'cbcab'];

function center(n) {

    var cot = 1 / (Math.tan(Math.PI / n) ** 2);

    return [[1 / Math.sqrt(Math.abs(cot / (1 - cot))), 0, 0, 0]]
}

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };