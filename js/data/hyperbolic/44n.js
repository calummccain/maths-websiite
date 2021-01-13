// Order n square

const vertices = [];

const faces = [];

// cfe
function a(v) {

    return [v[0], v[1], v[3], v[2]];

}

//cfv
function b(v) {

    return [v[0], v[1], v[2], -v[3]];

}

//fev
function c(v) {

    return [v[0], -v[1], v[2], v[3]];

}

//cev
function d(n, v) {

    const c = Math.cos(Math.PI / n) ** 2;
    return [
        (1 + 2 * c) * v[0] - 2 * (c ** 4) * v[1] - 2 * c * v[2] - 2 * c * v[3],
        2 * v[0] + (1 - 2 * c) * v[1] - 2 * v[2] - 2 * v[3],
        v[0] - c * v[1] - v[3],
        v[0] - c * v[1] - v[2]
    ];

}

function e(v) {

    return [v[0], v[1], v[2], v[3]];

}

function f(n, v) {

    const c = Math.cos(Math.PI / n) ** 2;
    const den = Math.sqrt(1 - 2 * c);

    if (n == 4) {
        return [
            v[0],
            c * v[1],
            Math.sqrt(2 * c) * v[2],
            Math.sqrt(2 * c) * v[3]
        ];
    } else {
        const den = Math.sqrt(1 - 2 * c);
        return [
            v[0] / den,
            c * v[1] / den,
            Math.sqrt(2 * c) * v[2] / den,
            Math.sqrt(2 * c) * v[3] / den
        ];
    }

}

function matrixDict(order, letter, vector) {

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
            newVector = d(order, vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(order, vector);
            break;
    }

    return newVector;

};

function face(n) {

    if (n == 4) {

        return [1, 0, 0, 0];

    } else {

        var c = Math.cos(Math.PI / n) ** 2;
        return [Math.sqrt(1 - 2 * c), 0, 0, 0];


    }
    return

};

const faceReflections = [];

const center = [1, 1, 0, 0];

//export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };


function generatePoints(n) {

    if (n == 4) {

        var c = 0.5;

    } else {

        var c = Math.cos(Math.PI / n) ** 2;

    }

    const numOfPoints = 15;
    var vertices = [];

    for (var i = -numOfPoints; i <= numOfPoints; i++) {

        for (var j = -numOfPoints; j <= numOfPoints; j++) {

            if (i % 2 != j % 2) {

                const x = i ** 2 + j ** 2 - 1;
                vertices.push([1 + c * x, x, i, j]);

            }

        }

    }

    return vertices;

}

console.log(generatePoints(3));
