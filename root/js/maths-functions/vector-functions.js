// simple implementation of matrix multiplication
function matrixMultiplication(matrix1, matrix2) {
    var matrix3 = [];
    for (var i = 0; i < matrix1.length; i++) {
        var newRow = [];
        for (var j = 0; j < matrix2[0].length; j++) {
            var newValue = 0;
            for (var k = 0; k < matrix1[0].length; k++) {
                newValue += matrix1[i][k] * matrix2[k][j];
            }
            newRow.push(newValue);
        }
        matrix3.push(newRow);
    }
    return matrix3;
}

// transposes a 4d vector/array
function transpose(point) {
    var newPoint = [];
    if (point.length == 4) {
        var tPoint = [point[0][0], point[1][0], point[2][0], point[3][0]];
        newPoint.push(tPoint);
    } else {
        newPoint.push([point[0][0]], [point[0][1]], [point[0][2]], [point[0][3]]);
    }
    return newPoint;
}

//returns sum of two vectors
function vectorSum(x, y) {
    var vSum = [[]];
    for (var i = 0; i < x[0].length; i++) {
        vSum[0][i] = x[0][i] + y[0][i];
    }
    return vSum;
}

// scales a vector by 's'
function vectorScale(x, s) {
    var vScale = [[]];
    for (var i = 0; i < x[0].length; i++) {
        vScale[0][i] = x[0][i] * s;
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

export { matrixMultiplication, transpose, vectorScale, vectorSum, midpoint, norm }