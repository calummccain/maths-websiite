// Order n cubic

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

const faceType = 'triangle';

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
function d(n) {

    var cos = Math.cos(Math.PI / n) ** 2;
    var sin = Math.sin(Math.PI / n) ** 2;

    var matrix = [
        [2 - 3 * sin, 3 * sin - 1, 3 * sin - 1, 1 - 3 * sin],
        [cos, sin, -cos, cos],
        [cos, -cos, sin, cos],
        [-cos, cos, cos, sin]
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
    var cot = 1 / (Math.tan(Math.PI / n) ** 2);

    if (n < 6) {

        matrix = [
            [Math.sqrt(cot / (2 * (3 - cot))), 0, 0, 0],
            [0, Math.sqrt((cot - 2) / (2 * (3 - cot))), 0, 0],
            [0, 0, Math.sqrt((cot - 2) / (2 * (3 - cot))), 0],
            [0, 0, 0, Math.sqrt((cot - 2) / (2 * (3 - cot)))]
        ];

    } else if (n == 6) {

        matrix = [
            [Math.sqrt(3), 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]

    } else {

        matrix = [
            [Math.sqrt(Math.abs(cot / (2 * (3 - cot)))), 0, 0, 0],
            [0, Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot)))), 0, 0],
            [0, 0, Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot)))), 0],
            [0, 0, 0, Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot))))]
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

const faceReflections = ['', 'cab', 'ab', 'b'];

function center(n) {

    var cot = 1 / (Math.tan(Math.PI / n) ** 2);

    return [1 / Math.sqrt(Math.abs(cot / (2 * (3 - cot)))), 0, 0, 0]
}

export { typeOfHoneycomb, faceType, vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };