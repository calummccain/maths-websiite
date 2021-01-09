//returns sum of two vectors
function vectorSum(x, y) {

    var vSum = [];

    for (var i = 0; i < x.length; i++) {

        vSum[i] = x[i] + y[i];

    }

    return vSum;

}

function vectorDiff(x, y) {

    var vDiff = [];

    for (var i = 0; i < x.length; i++) {

        vDiff[i] = x[i] - y[i];

    }

    return vDiff;

}

// scales a vector by 's'
function vectorScale(x, s) {

    var vScale = [];

    for (var i = 0; i < x.length; i++) {

        vScale[i] = x[i] * s;

    }

    return vScale;

}

function vectorCross(a, b) {

    var norm = [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];

    return norm;

}

function vectorDot(a, b) {

    var dot = 0;

    for (var i = 0; i < a.length; i++) {

        dot += a[i] * b[i];

    }

    return dot;

}

function lineSphereIntersection(a, b) {

    var ab = vectorDiff(a, b);

    var A = vectorDot(ab, ab);
    var B = 2 * vectorDot(b, ab);
    var C = vectorDot(b, b) - 1;

    var l1 = (-B + Math.sqrt(B ** 2 - 4 * A * C)) / (2 * A);
    var l2 = (-B - Math.sqrt(B ** 2 - 4 * A * C)) / (2 * A);

    var l = Math.min(l1, l2);
    var intersection = vectorSum(vectorScale(a, l), vectorScale(b, 1 - l));

    return intersection;

}

// midpoint of a line
function midpoint(a, b, c, compact) {

    var newVector;

    if ((norm(a) > 0.99999) && (norm(b) > 0.9999) && (compact === "uncompact")) {

        //var halfDist = Math.sqrt((vectorDot(a, b) + 1) / 2);
        var shiftedA = vectorDiff(a, c);
        var shiftedB = vectorDiff(b, c);
        var rad = norm(shiftedA);
        //console.log(c, norm(c), rad, norm(shiftedB));
        var unnormalisedSum = vectorScale(vectorSum(shiftedA, shiftedB), 1 / 2);
        newVector = vectorSum(c, vectorScale(unnormalisedSum, rad / norm(unnormalisedSum)));

    } else {

        newVector = vectorScale(vectorSum(a, b), 1 / 2);

    }

    newVector = vectorScale(vectorSum(a, b), 0.5);

    return newVector;

}

function norm(x) {

    return Math.sqrt(x[0] ** 2 + x[1] ** 2 + x[2] ** 2);

}

// function lineSphereIntersection(a, b) {

//     var a_b = vectorDiff(a, b);

//     var delta = Math.sqrt(vectorDot(b, a_b) ** 2 - (norm(a_b) ** 2) * (norm(b) ** 2 - 1));

//     var t1 = (-vectorDot(b, a_b) + delta) / norm(a_b) ** 2;
//     var t2 = (-vectorDot(b, a_b) - delta) / norm(a_b) ** 2;

//     var x1 = vectorSum(vectorScale(a, t1), vectorScale(b, 1 - t1));
//     var x2 = vectorSum(vectorScale(a, t2), vectorScale(b, 1 - t2));

//     return [x1, x2];

// }

function circumradius(a, b, c) {

    return (a * b * c) / Math.sqrt(Math.abs((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)));

}

function determinant(m) {

    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

}

function circumcenter(u, v, w) {

    const a = determinant([[u[0], u[1], 1], [v[0], v[1], 1], [w[0], w[1], 1]]);
    const ru = u[0] ** 2 + u[1] ** 2;
    const rv = v[0] ** 2 + v[1] ** 2;
    const rw = w[0] ** 2 + w[1] ** 2;
    const bx = -determinant([[ru, u[1], 1], [rv, v[1], 1], [rw, w[1], 1]]);
    const by = determinant([[ru, u[0], 1], [rv, v[0], 1], [rw, w[0], 1]]);

    return [-bx / (2 * a), -by / (2 * a)]

}

export {
    vectorScale,
    vectorSum,
    vectorDiff,
    vectorCross,
    vectorDot,
    midpoint,
    norm,
    lineSphereIntersection,
    circumradius,
    circumcenter,
    determinant
}