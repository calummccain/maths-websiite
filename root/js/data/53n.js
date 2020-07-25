// Order n dodecahedral

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
    [[1, 1, 1, 1]],
    [[1, 1, 1, -1]],
    [[1, 1, -1, 1]],
    [[1, 1, -1, -1]],
    [[1, -1, 1, 1]],
    [[1, -1, 1, -1]],
    [[1, -1, -1, 1]],
    [[1, -1, -1, -1]],
    [[1, 0, p, 1 / p]],
    [[1, 0, p, -1 / p]],
    [[1, 0, -p, 1 / p]],
    [[1, 0, -p, -1 / p]],
    [[1, p, 1 / p, 0]],
    [[1, p, -1 / p, 0]],
    [[1, -p, 1 / p, 0]],
    [[1, -p, -1 / p, 0]],
    [[1, 1 / p, 0, p]],
    [[1, -1 / p, 0, p]],
    [[1, 1 / p, 0, -p]],
    [[1, -1 / p, 0, -p]]
];

//ADD FACES!!!
const faces = [[]];

//cev
const a = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, -1]
];

//cfe
const b = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, -1, 0],
    [0, 0, 0, 1]
];

// //cfv
// const c = [
//     [1, 0, 0, 0],
//     [0, 1 - 2 / (4 * p ** 2), 1 / 2, 1 / (2 * p)],
//     [0, 1 / 2, 1 - 2 * p ** 4 / (4 * p ** 2), -p / 2],
//     [0, 1 / (2 * p), -p / 2, 1 - 2 * p ** 2 / (4 * p ** 2)]
// ];

//cfv
const c = [
    [1, 0, 0, 0],
    [0, p / 2, 1 / 2, 1 / (2 * p)],
    [0, 1 / 2, -1 / (2 * p), -p / 2],
    [0, 1 / (2 * p), -p / 2, p / 2]
];

//fev
function d(n) {
    var cos = Math.cos(2 * Math.pi / n);
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
        var cot = 1 / (Math.tan(Math.pi / n) ** 2);
        matrix = [
            [(p ** 2) * Math.sqrt(cot / (3 - cot)), 0, 0, 0],
            [0, Math.sqrt(((p ** 2) * cot - 1) / (3 - cot)), 0, 0],
            [0, 0, Math.sqrt(((p ** 2) * cot - 1) / (3 - cot)), 0],
            [0, 0, 0, Math.sqrt(((p ** 2) * cot - 1) / (3 - cot))]
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

export { typeOfHoneycomb, vertices, faces, a, b, c, d, e, f, matrixDict };