//returns sum of two vectors
function vectorSum(x, y) {
    var vSum = [];
    for (var i = 0; i < x.length; i++) {
        vSum[i] = x[i] + y[i];
    }
    return vSum;
}

// scales a vector by 's'
function vectorScale(x, s) {
    var vScale = [];
    for (var i = 0; i < x.length; i++) {
        vScale[i] = x[i] * s;
    }
    return vScale;
}

// midpoint of a line
function midpoint(a, b) {
    return vectorScale(vectorSum(a, b), 0.5);
}

function norm(x) {

    return Math.sqrt(x[0] ** 2 + x[1] ** 2 + x[2] ** 2);

}

export { vectorScale, vectorSum, midpoint, norm }