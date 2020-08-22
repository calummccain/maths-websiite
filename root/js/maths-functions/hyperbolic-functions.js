import * as VF from "./vector-functions.js";

//transforms the original cell to the transformed one 
// REMEMBER TO MULTIPLY THEM BY f !!!!!!!!!
function transformVertices(baseVertices, transformation, dictionary) {

    var newVertices = [];
    var e1 = [1, 0, 0, 0], e2 = [0, 1, 0, 0], e3 = [0, 0, 1, 0], e4 = [0, 0, 0, 1];

    if (transformation !== '') {
        for (var i = transformation.length - 1; i > -1; i--) {
            e1 = dictionary(transformation[i], e1);
            e2 = dictionary(transformation[i], e2);
            e3 = dictionary(transformation[i], e3);
            e4 = dictionary(transformation[i], e4);
        }
    }


    for (var j = 0; j < baseVertices.length; j++) {
        var oldVertex = baseVertices[j];
        var newVertex = VF.vectorSum(
            VF.vectorSum(
                VF.vectorScale(e1, oldVertex[0]),
                VF.vectorScale(e2, oldVertex[1])
            ),
            VF.vectorSum(
                VF.vectorScale(e3, oldVertex[2]),
                VF.vectorScale(e4, oldVertex[3])
            )
        );
        newVertices.push(newVertex);
    }

    return newVertices;
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


export { transformVertices, hyperboloidInnerProduct, hyperboloidToPoincare, poincareToUpperHalfPlane, hyperboloidToKlein, hyperboloidToPoincareMod, hyperbolicNorm, kleinToPoincare };