import * as VF from "./vector-functions.js";

//transforms the original cell to the transformed one 
// REMEMBER TO MULTIPLY THEM BY f !!!!!!!!!
function transformVertices(baseVertices, transformation) {

    var newVertices = [];

    for (var i = 0; i < baseVertices.length; i++) {
        newVertices[i] = VF.transpose(VF.matrixMultiplication(transformation, VF.transpose(baseVertices[i])));
    }

    return newVertices;
}

// turns the word representation of the transformation into the actual matrix representation
function wordToTransform(word, dictionary) {

    var t_matrix = dictionary['e'];

    for (var i = 0; i < word.length; i++) {
        var n_matrix = VF.matrixMultiplication(t_matrix, dictionary[word.charAt(i)]);
        t_matrix = n_matrix;
    }

    return t_matrix;
}

// stereographic projection from the hyperboloid model to the poincare model 
function hyperboloidToPoincare(point) {

    var scale = 1 + point[0];
    var newPoint = [point[1] / scale, point[2] / scale, point[3] / scale];

    return newPoint;
}

// stereographic projection from the hyperboloid model to the poincare model 
function hyperboloidToPoincareMod(point) {

    if (Math.abs(point[0] ** 2 - point[1] ** 2 - point[2] ** 2 - point[3] ** 2) < 0.01) {
        var scale = point[0];
        var newPoint = [point[1] / scale, point[2] / scale, point[3] / scale];
    } else {
        var scale = 1 + point[0];
        var newPoint = [point[1] / scale, point[2] / scale, point[3] / scale];
    }
    return newPoint;
}

// stereographic projection from the hyperboloid model to the klein model (use for ideal points too)
function hyperboloidToKlein(point) {

    var scale = point[0];
    var newPoint = [point[1] / scale, point[2] / scale, point[3] / scale];

    return newPoint;
}

// 'Cayley transform' from poincare to UHP
function poincareToUpperHalfPlane(point) {

    var x = point[0];
    var y = point[1];
    var z = point[2];
    var s = x ** 2 + y ** 2 + (1 - z) ** 2;
    var uhp = [2 * x / s, 2 * y / s, (1 - x ** 2 - y ** 2) / s];

    return uhp;
}

function kleinToPoincare(point) {

    var dist = Math.sqrt(point[0] ** 2 + point[1] ** 2 + point[2] ** 2);
    var hyperbolicDist;

    if (1 > dist ** 2) {

        hyperbolicDist = 1 / (1 + Math.sqrt(1 - dist ** 2));

    } else {

        hyperbolicDist = 1 / dist;

    }

    return VF.vectorScale(point, hyperbolicDist);

}

// hyperboloid inner product
function hyperboloidInnerProduct(x, y) {

    var innerProduct = x[0] * y[0] - x[1] * y[1] - x[2] * y[2] - x[3] * y[3];

    return innerProduct;
}

function hyperbolicNorm(x) {

    var norm = x[0] ** 2 - x[1] ** 2 - x[2] ** 2 - x[3] ** 2;

    return norm;
}


export { transformVertices, wordToTransform, hyperboloidInnerProduct, hyperboloidToPoincare, poincareToUpperHalfPlane, hyperboloidToKlein, hyperboloidToPoincareMod, hyperbolicNorm, scaledHyperbolicNorm, kleinToPoincare };