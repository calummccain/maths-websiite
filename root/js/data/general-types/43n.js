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
function d(n) {

    var cos = Math.cos(2 * Math.PI / n);

    var matrix = [
        [1 + 2 * cos, -2 * cos, 0, 0],
        [2 * cos + 2, -1 - 2 * cos, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
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

    if (n == 6) {

        matrix = [
            [Math.sqrt(3), 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]

    } else {

        var cot = 1 / (Math.tan(Math.PI / n) ** 2);

        matrix = [
            [Math.sqrt(Math.abs(2 * cot / (3 - cot))), 0, 0, 0],
            [0, Math.sqrt(Math.abs((cot - 1) / (3 - cot))), 0, 0],
            [0, 0, Math.sqrt(Math.abs((cot - 1) / (3 - cot))), 0],
            [0, 0, 0, Math.sqrt(Math.abs((cot - 1) / (3 - cot)))]
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

const faceReflections = ['bc', 'c', 'cbabc', 'abc', '', 'babc'];

function center(n) {

    var cot = 1 / (Math.tan(Math.PI / n) ** 2);

    return [[1 / Math.sqrt(Math.abs(2 * cot / (3 - cot))), 0, 0, 0]]
}

export { faceType, typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };