import * as VF from "./vector-functions.js";

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
// (w, x, y, z) ===>(x / (1 + w), y / (1 + w), z / (1 + w))
function hyperboloidToPoincare(point) {

    var scale = 1 + point[0];
    var newPoint = [point[1] / scale, point[2] / scale, point[3] / scale];

    return newPoint;

}

// stereographic projection from the hyperboloid model to the poincare model 
//                 (w, x, y, z) ===> (x / (1 + w), y / (1 + w), z / (1 + w))
// if on lightcone (w, x, y, z) ===> (x / w, y / w, z / w)
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
// (w, x, y, z) ===> (x / w, y / w, z / w)
function hyperboloidToKlein(point) {

    var scale = point[0];
    var newPoint = [point[1] / scale, point[2] / scale, point[3] / scale];

    return newPoint;

}

// 'Cayley transform' from poincare to UHP
// (x, y, z) ===> (2 * x / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//                 2 * y / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//                 (1 - x ** 2 - y ** 2 - z ** 2) / (x ** 2 + y ** 2 + (1 - z) ** 2))
function poincareToUpperHalfPlane(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = x ** 2 + y ** 2 + (1 - z) ** 2;
    var uhp = [2 * x / s, 2 * y / s, (1 - x ** 2 - y ** 2 - z ** 2) / s];

    return uhp;

}

function upperHalfPlaneToPoincare(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = x ** 2 + y ** 2 + (1 + z) ** 2;
    var uhp = [2 * x / s, 2 * y / s, (x ** 2 + y ** 2 + z ** 2 - 1) / s];

    return uhp;

}

function poincareToHyperboloid(point) {

    const r = point[0] ** 2 + point[1] ** 2 + point[2] ** 2;

    return [(1 + r) / (1 - r), 2 * point[0] / (1 - r), 2 * point[1] / (1 - r), 2 * point[2] / (1 - r)]

}

// 'Cayley transform' from poincare to UHP
// (w, x, y, z) ===> (x / (w - z), 
//                    y / (w - z), 
//                    (z ** 2) / (2 * w * (w - z)))
function lightConeToUpperHalfPlane(point) {

    var w = point[0];
    var x = point[1];
    var y = point[2];
    var z = point[3];
    var s = x ** 2 + y ** 2 + (w - z) ** 2;
    var uhp = [2 * x / s, 2 * y / s, (1 - x ** 2 - y ** 2) / s];

    return uhp;

}

function kleinToPoincare(point) {

    const dist = Math.sqrt(point[0] ** 2 + point[1] ** 2 + point[2] ** 2);
    var hyperbolicDist = 1 / (1 + Math.sqrt(Math.abs(1 - dist ** 2)));

    return VF.vectorScale(point, hyperbolicDist);

}

function kleinToUpperHalfPlane(point) {

    var poin = kleinToPoincare(point);
    var uhp = poincareToUpperHalfPlane(poin);

    return uhp;

}

function upperHalfPlaneToKlein(point) {

    var poin = upperHalfPlaneToPoincare(point);
    var klein = poincareToKlein(poin);

    return klein;

}

function poincareToKlein(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = 1 + x ** 2 + y ** 2 + z ** 2;
    var uhp = [2 * x / s, 2 * y / s, 2 * z / s];

    return uhp;

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


export {
    transformVertices,
    hyperboloidInnerProduct,
    hyperboloidToPoincare,
    poincareToUpperHalfPlane,
    hyperboloidToKlein,
    hyperboloidToPoincareMod,
    hyperbolicNorm,
    kleinToPoincare,
    kleinToUpperHalfPlane,
    upperHalfPlaneToPoincare,
    upperHalfPlaneToKlein
};