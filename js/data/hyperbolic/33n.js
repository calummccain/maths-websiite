// Order n tetrahedral

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


function a(v) {

    return [v[0], v[2], v[1], v[3]];

}


function b(v) {

    return [v[0], v[1], v[3], v[2]];

}


function c(v) {

    return [v[0], v[1], -v[3], -v[2]];

}


function d(n, v) {

    if (n == 6) {

        return [
            (5 * v[0] - v[1] - v[2] + v[3]) / 4,
            (3 * v[0] + v[1] - 3 * v[2] + 3 * v[3]) / 4,
            (3 * v[0] - 3 * v[1] + v[2] + 3 * v[3]) / 4,
            (-3 * v[0] + 3 * v[1] + 3 * v[2] + v[3]) / 4
        ];


    } else {

        var cos = Math.cos(Math.PI / n) ** 2;
        var sin = Math.sin(Math.PI / n) ** 2;

        return [
            (2 - 3 * sin) * v[0] + (3 * sin - 1) * v[1] + (3 * sin - 1) * v[2] + (1 - 3 * sin) * v[3],
            cos * v[0] + sin * v[1] - cos * v[2] + cos * v[3],
            cos * v[0] - cos * v[1] + sin * v[2] + cos * v[3],
            -cos * v[0] + cos * v[1] + cos * v[2] + sin * v[3]
        ];

    }

}


function e(v) {

    return [v[0], v[1], v[2], v[3]];

}


function f(n, v) {

    if (n == 6) {

        return [Math.sqrt(3) * v[0], v[1], v[2], v[3]];

    } else {

        var cot = 1 / (Math.tan(Math.PI / n) ** 2);

        return [
            Math.sqrt(Math.abs(cot / (2 * (3 - cot)))) * v[0],
            Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot)))) * v[1],
            Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot)))) * v[2],
            Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot)))) * v[3]
        ];

    }

}


function matrixDict(n, letter, vector) {

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

}


const faceReflections = ['', 'cab', 'ab', 'b'];


function center(n) {

    if (n == 6) {

        return [1 / Math.sqrt(3), 0, 0, 0];

    } else {

        var cot = 1 / (Math.tan(Math.PI / n) ** 2);

        return [1 / Math.sqrt(Math.abs(cot / (2 * (3 - cot)))), 0, 0, 0];
    }

}


export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };