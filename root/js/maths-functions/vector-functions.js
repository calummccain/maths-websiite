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

function vectorDot(a, b) {
    var dot = 0;
    for (var i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
    }
    return dot;
}

// midpoint of a line
function midpoint(a, b) {
    return vectorScale(vectorSum(a, b), 0.5);
}

function norm(x) {

    return Math.sqrt(x[0] ** 2 + x[1] ** 2 + x[2] ** 2);

}

function lineSphereIntersection(a, b) {

    var a_b = vectorDiff(a, b);
    var delta = Math.sqrt(vectorDot(b, a_b) ** 2 - (norm(a_b) ** 2) * (norm(b) ** 2 - 1));
    var t1 = (-vectorDot(b, a_b) + delta) / norm(a_b) ** 2;
    var t2 = (-vectorDot(b, a_b) - delta) / norm(a_b) ** 2;

    var x1 = vectorSum(vectorScale(a, t1), vectorScale(b, 1 - t1));
    var x2 = vectorSum(vectorScale(a, t2), vectorScale(b, 1 - t2));

    return [x1, x2];
}

export { vectorScale, vectorSum, midpoint, norm, lineSphereIntersection }